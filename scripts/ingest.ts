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
  const method = raw.toLowerCase();
  if (method.includes("transit")) return "transit";
  if (method.includes("radial")) return "radial-velocity";
  if (method.includes("imaging")) return "direct-imaging";
  if (method.includes("microlensing")) return "microlensing";
  if (method.includes("astrometry")) return "astrometry";
  if (method.includes("timing")) return "timing";
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
  const response = await fetch(`${NASA_TAP_URL}?${params}`);
  if (!response.ok)
    throw new Error(
      `NASA API error: ${response.status} ${response.statusText}`,
    );

  const data = await response.json();
  console.log(`Fetched ${data.length} planets`);
  return data;
}

async function ingest() {
  const rows = await fetchFromNASA();

  const planetMap = new Map<string, (typeof rows)[0]>();
  for (const row of rows) {
    if (!planetMap.has(row.pl_name)) {
      planetMap.set(row.pl_name, row);
    }
  }
  const uniquePlanetMap = Array.from(planetMap.values());
  console.log(
    `Unique planets after dedup: ${uniquePlanetMap.length} (removed ${rows.length - uniquePlanetMap.length} duplicates)`,
  );

  const planets = uniquePlanetMap.map((row) => ({
    name: row.pl_name,
    host_star: row.hostname,
    ra: row.ra,
    dec: row.dec,
    distance_ly: row.sy_dist
      ? Math.round(row.sy_dist * 3.26156 * 100) / 100
      : null,
    radius_earth: row.pl_rade,
    mass_earth: row.pl_bmasse,
    orbital_period: row.pl_orbper,
    eq_temperature: row.pl_eqt,
    surface_gravity: row.pl_dens,
    stellar_type: row.st_spectype,
    stellar_temp: row.st_teff,
    stellar_radius: row.st_rad,
    discovery_year: row.disc_year,
    discovery_method: classifyMethod(row.discoverymethod) as any,
    planet_type: classifyPlanet(row.pl_rade, row.pl_orbper, row.pl_eqt) as any,
    nasa_id: row.pl_name,
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
