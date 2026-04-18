import type { APIRoute } from "astro";
import { supabaseAdmin } from "@/lib/supabase";
import https from "https";

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const auth = request.headers.get("authorization");
  if (auth !== `Bearer ${import.meta.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const NASA_TAP_URL = "https://exoplanetarchive.ipac.caltech.edu/TAP/sync";
  const QUERY = `
    SELECT pl_name, hostname, ra, dec, sy_dist,
           pl_rade, pl_bmasse, pl_orbper, pl_eqt, pl_dens,
           st_spectype, st_teff, st_rad, disc_year, discoverymethod
    FROM ps WHERE pl_controv_flag = 0
    ORDER BY disc_year DESC
  `;

  const params = new URLSearchParams({
    QUERY,
    FORMAT: "json",
    REQUEST: "doQuery",
    LANG: "ADQL",
  });

  const rows = await new Promise<any[]>((resolve, reject) => {
    https
      .get(
        `${NASA_TAP_URL}?${params}`,
        { rejectUnauthorized: false },
        (res) => {
          let raw = "";
          res.on("data", (c) => (raw += c));
          res.on("end", () => {
            try {
              resolve(JSON.parse(raw));
            } catch (e) {
              reject(e);
            }
          });
        },
      )
      .on("error", reject);
  });

  const seen = new Set<string>();
  const unique = rows.filter((row) => {
    if (seen.has(row.pl_name)) return false;
    seen.add(row.pl_name);
    return true;
  });

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

  const planets = unique.map((row) => ({
    name: row.pl_name,
    host_star: row.hostname,
    ra: row.ra,
    dec: row.dec,
    distance_ly: row.sy_dist ? Math.round(row.sy_dist * 3.26156 * 100) / 100 : null,
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

  const BATCH = 500;
  let inserted = 0;
  let failed = 0;

  for (let i = 0; i < planets.length; i += BATCH) {
    const batch = planets.slice(i, i + BATCH);
    const { error } = await supabaseAdmin
      .from("planets")
      .upsert(batch, { onConflict: "nasa_id", ignoreDuplicates: false });
    if (error) {
      failed += batch.length;
    } else {
      inserted += batch.length;
    }
  }

  return new Response(
    JSON.stringify({
      ok: true,
      inserted,
      failed,
      total: planets.length,
    }),
    { headers: { "Content-Type": "application/json" } },
  );
};
