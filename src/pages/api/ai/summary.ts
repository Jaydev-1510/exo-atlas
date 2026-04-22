import type { APIRoute } from "astro";
import { groqChat } from "@/lib/groq";
import { supabaseAdmin } from "@/lib/supabase";

export const prerender = false;

export const GET: APIRoute = async (context) => {
  const planetId = context.url.searchParams.get("id");
  if (!planetId) {
    return new Response(JSON.stringify({ error: "Missing id" }), {
      status: 400,
    });
  }

  const { data: cached } = await supabaseAdmin
    .from("planet_ai_cache")
    .select("summary")
    .eq("planet_id", planetId)
    .single();

  if (cached?.summary) {
    return new Response(JSON.stringify({ summary: cached.summary }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  const { data: planet } = await supabaseAdmin
    .from("planets")
    .select(
      "name, host_star, planet_type, radius_earth, mass_earth, orbital_period, eq_temperature, distance_ly, esi_score, habitability_pct, stellar_type, discovery_year, discovery_method",
    )
    .eq("id", planetId)
    .single();

  if (!planet) {
    return new Response(JSON.stringify({ error: "Planet not found" }), {
      status: 404,
    });
  }

  const system = `You are an astrophysicist writing concise, accurate, and engaging descriptions of exoplanets for a science education website. Write in plain English. Never use markdown. Be precise with numbers. Keep it to exactly 3 sentences.`;

  const user = `Write a 3-sentence scientific description of this exoplanet:
Name: ${planet.name}
Host star: ${planet.host_star} (${planet.stellar_type ?? "unknown spectral type"})
Type: ${planet.planet_type}
Radius: ${planet.radius_earth ?? "unknown"} Earth radii
Mass: ${planet.mass_earth ?? "unknown"} Earth masses
Orbital period: ${planet.orbital_period ?? "unknown"} days
Equilibrium temperature: ${planet.eq_temperature ?? "unknown"} K
Distance from Earth: ${planet.distance_ly ?? "unknown"} light-years
ESI score: ${planet.esi_score ?? "unknown"}
Habitability: ${planet.habitability_pct ?? "unknown"}%
Discovery year: ${planet.discovery_year ?? "unknown"} via ${planet.discovery_method ?? "unknown"}`;

  try {
    const summary = await groqChat(system, user, 200);

    await supabaseAdmin
      .from("planet_ai_cache")
      .upsert({ planet_id: planetId, summary }, { onConflict: "planet_id" });

    return new Response(JSON.stringify({ summary }), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=86400",
      },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
};
