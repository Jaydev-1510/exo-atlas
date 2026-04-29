import type { APIRoute } from "astro";
import { groqChat } from "@/lib/groq";
import { supabaseAdmin } from "@/lib/supabase";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const { planetIdA, planetIdB } = await request.json();
  if (!planetIdA || !planetIdB) {
    return new Response(
      JSON.stringify({ error: "Missing planetIdA or planetIdB" }),
      {
        status: 400,
      },
    );
  }

  const [{ data: planetA }, { data: planetB }] = await Promise.all([
    supabaseAdmin
      .from("planets")
      .select(
        "name, planet_type, radius_earth, mass_earth, orbital_period, eq_temperature, distance_ly, esi_score, habitability_pct, host_star, stellar_type, discovery_year",
      )
      .eq("id", planetIdA)
      .single(),
    supabaseAdmin
      .from("planets")
      .select(
        "name, planet_type, radius_earth, mass_earth, orbital_period, eq_temperature, distance_ly, esi_score, habitability_pct, host_star, stellar_type, discovery_year",
      )
      .eq("id", planetIdB)
      .single(),
  ]);

  if (!planetA || !planetB) {
    return new Response(JSON.stringify({ error: "Planet not found" }), {
      status: 404,
    });
  }

  const fmt = (v: number | null, d = 2) =>
    v != null ? Number(v).toFixed(d) : "unknown";

  const system = `You are an astrophysicist comparing two exoplanets. Write a concise, scientifically accurate comparison. No markdown. 4-5 sentences. Focus on the most interesting differences and similarities. End with which planet is more likely to be habitable and why.`;

  const user = `
    Compare these two exoplanets:

    Planet A: ${planetA.name}
    - Type: ${planetA.planet_type}, Host: ${planetA.host_star} (${planetA.stellar_type ?? "unknown"})
    - Radius: ${fmt(planetA.radius_earth)} R⊕, Mass: ${fmt(planetA.mass_earth)} M⊕
    - Temperature: ${fmt(planetA.eq_temperature, 0)} K, Period: ${fmt(planetA.orbital_period, 1)} days
    - Distance: ${fmt(planetA.distance_ly, 1)} ly, ESI: ${fmt(planetA.esi_score, 3)}, Habitability: ${planetA.habitability_pct ?? 0}%
    - Discovered: ${planetA.discovery_year ?? "unknown"}

    Planet B: ${planetB.name}
    - Type: ${planetB.planet_type}, Host: ${planetB.host_star} (${planetB.stellar_type ?? "unknown"})
    - Radius: ${fmt(planetB.radius_earth)} R⊕, Mass: ${fmt(planetB.mass_earth)} M⊕
    - Temperature: ${fmt(planetB.eq_temperature, 0)} K, Period: ${fmt(planetB.orbital_period, 1)} days
    - Distance: ${fmt(planetB.distance_ly, 1)} ly, ESI: ${fmt(planetB.esi_score, 3)}, Habitability: ${planetB.habitability_pct ?? 0}%
    - Discovered: ${planetB.discovery_year ?? "unknown"}
  `;

  try {
    const comparison = await groqChat(system, user, 300);
    return new Response(JSON.stringify({ comparison }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
};
