import type { APIRoute } from "astro";
import { supabase } from "@/lib/supabase";

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  const params = url.searchParams;

  const search = params.get("q") || undefined;
  const type = params.get("type") || undefined;
  const method = params.get("method") || undefined;
  const habitable =
    params.get("habitable") === "true"
      ? true
      : params.get("habitable") === "false"
        ? false
        : undefined;
  const yearFrom = params.get("year_from")
    ? Number(params.get("year_from"))
    : undefined;
  const yearTo = params.get("year_to")
    ? Number(params.get("year_to"))
    : undefined;
  const radiusMin = params.get("radius_min")
    ? Number(params.get("radius_min"))
    : undefined;
  const radiusMax = params.get("radius_max")
    ? Number(params.get("radius_max"))
    : undefined;
  const sort = params.get("sort") || "habitability_pct";
  const order = params.get("order") || "desc";
  const limit = Math.min(Number(params.get("limit") || 24), 100);
  const offset = Number(params.get("offset") || 0);

  const { data, error } = await supabase.rpc("get_planets", {
    p_search: search,
    p_type: type,
    p_method: method,
    p_habitable: habitable,
    p_year_from: yearFrom,
    p_year_to: yearTo,
    p_radius_min: radiusMin,
    p_radius_max: radiusMax,
    p_sort: sort,
    p_order: order,
    p_limit: limit,
    p_offset: offset,
  });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const total = data?.[0]?.total_count ?? 0;

  return new Response(
    JSON.stringify({
      data,
      meta: {
        total: Number(total),
        limit,
        offset,
        hasMore: offset + limit < Number(total),
      },
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    },
  );
};
