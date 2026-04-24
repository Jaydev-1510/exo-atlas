import type { APIRoute } from "astro";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { supabase } from "@/lib/supabase";
import fs from "fs";
import path from "path";
import type { ReactNode } from "react";

export const prerender = false;

const PLANET_COLORS: Record<string, string> = {
  rocky: "#8a7040",
  "super-earth": "#3a9e75",
  "sub-neptune": "#4a8ed4",
  "neptune-like": "#3a7ed4",
  "ocean-world": "#3a7ed4",
  "hot-jupiter": "#E87C1E",
  "gas-giant": "#8a5bc4",
  unknown: "#505050",
};

const TYPE_LABELS: Record<string, string> = {
  rocky: "Rocky",
  "super-earth": "Super-earth",
  "sub-neptune": "Sub-neptune",
  "neptune-like": "Neptune-like",
  "ocean-world": "Ocean world",
  "hot-jupiter": "Hot Jupiter",
  "gas-giant": "Gas giant",
  unknown: "Unknown",
};

export const GET: APIRoute = async (context) => {
  const slug = context.params.slug as string;

  const { data: planet } = await supabase
    .rpc("get_planet_by_slug", { p_name: slug })
    .single();

  if (!planet) {
    return new Response("Not found", { status: 404 });
  }

  const fmt = (v: number | null, d = 2) =>
    v != null ? Number(v).toFixed(d) : "—";
  const planetType = planet.planet_type ?? "unknown";
  const planetColor = PLANET_COLORS[planetType] ?? "#505050";

  const habPct = planet.habitability_pct ?? 0;
  const habColor =
    habPct >= 70 ? "#22c55e" : habPct >= 40 ? "#f59e0b" : "#ef4444";

  const fontPath = path.join(process.cwd(), "public", "fonts", "geistMono.ttf");
  const fontSansPath = path.join(process.cwd(), "public", "fonts", "geist.ttf");

  let fontData: Buffer | null = null;
  let fontSansData: Buffer | null = null;

  try {
    fontData = fs.readFileSync(fontPath);
    fontSansData = fs.readFileSync(fontSansPath);
  } catch {}

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          display: "flex",
          flexDirection: "column",
          width: "1200px",
          height: "630px",
          background: "#0a0a0a",
          padding: "60px",
          fontFamily: "Geist, sans-serif",
          position: "relative",
          overflow: "hidden",
        },
        children: [
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                position: "absolute",
                top: "-120px",
                right: "-120px",
                width: "500px",
                height: "500px",
                borderRadius: "50%",
                background: `radial-gradient(circle, ${planetColor}18 0%, transparent 70%)`,
              },
            },
          },

          {
            type: "div",
            props: {
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "48px",
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      display: "flex",
                      fontSize: "18px",
                      color: "#fff",
                      fontFamily: "GeistMono, monospace",
                      letterSpacing: "0.06em",
                    },
                    children: "EXO·ATLAS",
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      display: "flex",
                      fontSize: "11px",
                      color: "#fff",
                      fontFamily: "GeistMono, monospace",
                      background: "#1a1a1a",
                      padding: "6px 14px",
                      borderRadius: "999px",
                      letterSpacing: "0.08em",
                    },
                    children: "NASA EXOPLANET ARCHIVE",
                  },
                },
              ],
            },
          },

          {
            type: "div",
            props: {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "64px",
                flex: "1",
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      display: "flex",
                      width: "180px",
                      height: "180px",
                      borderRadius: "50%",
                      background: `radial-gradient(circle at 35% 35%, ${planetColor}, ${planetColor})`,
                      flexShrink: "0",
                      boxShadow: `0 0 60px ${planetColor}`,
                    },
                  },
                },

                {
                  type: "div",
                  props: {
                    style: {
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                      flex: "1",
                    },
                    children: [
                      {
                        type: "div",
                        props: {
                          style: {
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                          },
                          children: [
                            {
                              type: "div",
                              props: {
                                style: {
                                  display: "flex",
                                  fontSize: "52px",
                                  fontWeight: "500",
                                  color: "#ededed",
                                  lineHeight: "1",
                                },
                                children: planet.name,
                              },
                            },
                            {
                              type: "div",
                              props: {
                                style: {
                                  display: "flex",
                                  fontSize: "13px",
                                  color: planetColor,
                                  background: planetColor + "18",
                                  padding: "6px 14px",
                                  borderRadius: "999px",
                                  border: `1px solid ${planetColor}44`,
                                  fontFamily: "GeistMono, monospace",
                                },
                                children: TYPE_LABELS[planetType] ?? "Unknown",
                              },
                            },
                          ],
                        },
                      },

                      {
                        type: "div",
                        props: {
                          style: {
                            display: "flex",
                            fontSize: "22px",
                            color: "#666",
                            fontFamily: "GeistMono, monospace",
                          },
                          children: `${planet.host_star}${planet.distance_ly ? ` · ${Number(planet.distance_ly).toFixed(1)} ly` : ""}`,
                        },
                      },

                      {
                        type: "div",
                        props: {
                          style: {
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                            marginTop: "4px",
                          },
                          children: [
                            {
                              type: "div",
                              props: {
                                style: {
                                  display: "flex",
                                  fontSize: "13px",
                                  color: "#555",
                                  fontFamily: "GeistMono, monospace",
                                },
                                children: "HABITABILITY",
                              },
                            },
                            {
                              type: "div",
                              props: {
                                style: {
                                  display: "flex",
                                  flex: "1",
                                  height: "6px",
                                  background: "#222",
                                  borderRadius: "3px",
                                  overflow: "hidden",
                                },
                                children: [
                                  {
                                    type: "div",
                                    props: {
                                      style: {
                                        display: "flex",
                                        width: `${habPct}%`,
                                        height: "100%",
                                        background: habColor,
                                        borderRadius: "3px",
                                      },
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              type: "div",
                              props: {
                                style: {
                                  display: "flex",
                                  fontSize: "18px",
                                  color: habColor,
                                  fontFamily: "GeistMono, monospace",
                                  minWidth: "48px",
                                },
                                children: `${habPct}%`,
                              },
                            },
                          ],
                        },
                      },

                      {
                        type: "div",
                        props: {
                          style: {
                            display: "flex",
                            gap: "24px",
                            marginTop: "8px",
                          },
                          children: [
                            {
                              label: "RADIUS",
                              value: `${fmt(planet.radius_earth)} R`,
                            },
                            {
                              label: "MASS",
                              value: `${fmt(planet.mass_earth)} M`,
                            },
                            {
                              label: "TEMP",
                              value: `${fmt(planet.eq_temperature, 0)} K`,
                            },
                            { label: "ESI", value: fmt(planet.esi_score, 3) },
                          ].map((measure) => ({
                            type: "div",
                            props: {
                              style: {
                                display: "flex",
                                flexDirection: "column",
                                gap: "4px",
                              },
                              children: [
                                {
                                  type: "div",
                                  props: {
                                    style: {
                                      display: "flex",
                                      fontSize: "11px",
                                      color: "#444",
                                      fontFamily: "GeistMono, monospace",
                                      letterSpacing: "0.08em",
                                    },
                                    children: measure.label,
                                  },
                                },
                                {
                                  type: "div",
                                  props: {
                                    style: {
                                      display: "flex",
                                      fontSize: "18px",
                                      color: "#aaa",
                                      fontFamily: "GeistMono, monospace",
                                    },
                                    children: measure.value,
                                  },
                                },
                              ],
                            },
                          })),
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    } as unknown as ReactNode,
    {
      width: 1200,
      height: 630,
      fonts: [
        ...(fontSansData
          ? [{ name: "Geist", data: fontSansData, weight: 400 as const }]
          : []),
        ...(fontData
          ? [{ name: "GeistMono", data: fontData, weight: 400 as const }]
          : []),
      ],
    },
  );
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width" as const, value: 1200 },
  });

  const png = resvg.render().asPng();

  return new Response(new Uint8Array(png), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
};
