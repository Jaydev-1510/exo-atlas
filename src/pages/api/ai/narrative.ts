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
    .select("narrative")
    .eq("planet_id", planetId)
    .single();

  if (cached?.narrative) {
    return new Response(JSON.stringify({ narrative: cached.narrative }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  const { data: planet } = await supabaseAdmin
    .from("planets")
    .select(
      "name, planet_type, radius_earth, mass_earth, orbital_period, eq_temperature, distance_ly, habitability_pct, host_star, stellar_type",
    )
    .eq("id", planetId)
    .single();

  if (!planet) {
    return new Response(JSON.stringify({ error: "Planet not found" }), {
      status: 404,
    });
  }

  const gravityRatio =
    planet.mass_earth && planet.radius_earth
      ? (planet.mass_earth / planet.radius_earth ** 2).toFixed(2)
      : null;

  const yearLength = planet.orbital_period
    ? planet.orbital_period < 1
      ? `${(planet.orbital_period * 24).toFixed(1)} hours`
      : planet.orbital_period > 365
        ? `${(planet.orbital_period / 365.25).toFixed(1)} Earth years`
        : `${planet.orbital_period.toFixed(0)} Earth days`
    : "unknown";

  const system = `You are a science writer crafting vivid, scientifically grounded short narratives about life on other worlds. Write in second person ("you"). Be imaginative but physically accurate. No markdown. 4-5 sentences max.`;

  const user = `Write a short narrative about what it would feel like to stand on ${planet.name}.
Key facts:
- Surface gravity: ${gravityRatio ? `${gravityRatio}× Earth's gravity` : "unknown"}
- Temperature: ${planet.eq_temperature ? `${planet.eq_temperature} K (${(planet.eq_temperature - 273.15).toFixed(0)}°C)` : "unknown"}
- One year lasts: ${yearLength}
- Planet type: ${planet.planet_type}
- Host star: ${planet.host_star} (${planet.stellar_type ?? "unknown type"})
- Habitability score: ${planet.habitability_pct ?? "unknown"}%
Be vivid about the sky color, star appearance, gravity feel, and atmosphere.`;

  try {
    const narrative = await groqChat(system, user, 250);

    await supabaseAdmin
      .from("planet_ai_cache")
      .upsert({ planet_id: planetId, narrative }, { onConflict: "planet_id" });

    return new Response(JSON.stringify({ narrative }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
};
