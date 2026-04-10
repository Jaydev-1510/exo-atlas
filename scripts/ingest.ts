import { supabaseAdmin } from "../src/lib/supabase";

const NASA_TAP_URL = "https://exoplanetarchive.ipac.caltech.edu/TAP/sync";
const QUERY = `
  SELECT
    pl_name, hostname, ra, dec, sy_dist,
    pl_rade, pl_bmasse, pl_orbper, pl_eqt, pl_dens,
    st_spectype, st_teff, st_rad,
    disc_year, discoverymethod
  FROM ps
  WHERE pl_controv_flag = 0
  ORDER BY disc_year DESC
`;

type NASARow = {
  pl_name: string;
  hostname: string;
  ra: number | null;
  dec: number | null;
  sy_dist: number | null;
  pl_rade: number | null;
  pl_bmasse: number | null;
  pl_orbper: number | null;
  pl_eqt: number | null;
  pl_dens: number | null;
  st_spectype: string | null;
  st_teff: number | null;
  st_rad: number | null;
  disc_year: number | null;
  discoverymethod: string | null;
};

function classifyPlanet(
  radius: number | null,
  period: number | null,
  temp: number | null,
) {
  if (!radius) return "unknown";
  if (radius < 1.25) return "rocky";
  if (radius < 2.0) return "super-earth";
  if (radius < 4.0) return "sub-neptune";
  if (radius < 6.0) return "neptune-like";
  if (temp && temp > 1000 && period && period < 10) return "hot-jupiter";
  if (radius < 15) return "gas-giant";
  return "gas-giant";
}

function classifyMethod(raw: string | null) {
  if (!raw) return "other";
  const m = raw.toLowerCase();
  if (m.includes("transit")) return "transit";
  if (m.includes("radial")) return "radial-velocity";
  if (m.includes("imaging")) return "direct-imaging";
  if (m.includes("microlensing")) return "microlensing";
  if (m.includes("astrometry")) return "astrometry";
  if (m.includes("timing")) return "timing";
  return "other";
}

async function fetchFromNASA(): Promise<NASARow[]> {
  const params = new URLSearchParams({
    QUERY,
    FORMAT: "json",
    REQUEST: "doQuery",
    LANG: "ADQL",
  });

  console.log("Fetching from NASA Exoplanet Archive...");
  const res = await fetch(`${NASA_TAP_URL}?${params}`);
  if (!res.ok)
    throw new Error(`NASA API error: ${res.status} ${res.statusText}`);

  const data = await res.json();
  console.log(`Fetched ${data.length} planets`);
  return data;
}

async function ingest() {
  const rows = await fetchFromNASA();

  const planetMap = new Map<string, (typeof rows)[0]>();
  for (const r of rows) {
    if (!planetMap.has(r.pl_name)) {
      planetMap.set(r.pl_name, r);
    }
  }
  const unique = Array.from(planetMap.values());
  console.log(
    `Unique planets after dedup: ${unique.length} (removed ${rows.length - unique.length} duplicates)`,
  );

  const planets = unique.map((r) => ({
    name: r.pl_name,
    host_star: r.hostname,
    ra: r.ra,
    dec: r.dec,
    distance_ly: r.sy_dist ? Math.round(r.sy_dist * 3.26156 * 100) / 100 : null,
    radius_earth: r.pl_rade,
    mass_earth: r.pl_bmasse,
    orbital_period: r.pl_orbper,
    eq_temperature: r.pl_eqt,
    surface_gravity: r.pl_dens,
    stellar_type: r.st_spectype,
    stellar_temp: r.st_teff,
    stellar_radius: r.st_rad,
    discovery_year: r.disc_year,
    discovery_method: classifyMethod(r.discoverymethod) as any,
    planet_type: classifyPlanet(r.pl_rade, r.pl_orbper, r.pl_eqt) as any,
    nasa_id: r.pl_name,
  }));

  console.log("Upserting to Supabase...");

  let inserted = 0;
  let failed = 0;

  for (let i = 0; i < planets.length; i += 500) {
    const batch = planets.slice(i, i + 500);
    const { error } = await supabaseAdmin
      .from("planets")
      .upsert(batch, { onConflict: "nasa_id", ignoreDuplicates: false });

    if (error) {
      console.error(`Batch ${i / 500 + 1} error:`, error.message);
      failed += batch.length;
    } else {
      inserted += batch.length;
      console.log(`Upserted ${inserted} / ${planets.length}`);
    }
  }
  console.log(`Done. ${inserted} inserted, ${failed} failed.`);
}

ingest().catch(console.error);
