# Exoplanet Atlas — API Reference

Base URL: `https://exo-atlas.vercel.app`

All endpoints return JSON. All endpoints are public and require no authentication. Rate limiting is not currently enforced but please be reasonable — the data is cached at the CDN layer for 5 minutes.

---

## Table of contents

- [GET /api/planets](#get-apiplanets)
- [GET /api/ai/summary](#get-apiaisummary)
- [GET /api/ai/narrative](#get-apiainarrative)
- [POST /api/ai/compare](#post-apiacompare)
- [GET /api/sync](#get-apisync)
- [GET /og/[slug].png](#get-ogslugpng)
- [Data types](#data-types)
- [Error responses](#error-responses)
- [Examples](#examples)

---

## GET /api/planets

Returns a paginated, filtered list of confirmed exoplanets.

### Query parameters

| Parameter    | Type    | Default            | Description                                                                                                                                                              |
| ------------ | ------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `q`          | string  | —                  | Full-text search across planet name, host star, stellar type, and discovery method. Uses PostgreSQL `websearch_to_tsquery` — supports quoted phrases and `-` exclusions. |
| `type`       | string  | —                  | Filter by planet type. See [Planet types](#planet-types).                                                                                                                |
| `method`     | string  | —                  | Filter by discovery method. See [Discovery methods](#discovery-methods).                                                                                                 |
| `habitable`  | boolean | —                  | `true` returns only planets with `habitability_pct >= 60`. `false` returns planets below that threshold. Omit to return all.                                             |
| `year_from`  | integer | —                  | Filter to planets discovered from this year onwards (inclusive).                                                                                                         |
| `year_to`    | integer | —                  | Filter to planets discovered up to and including this year.                                                                                                              |
| `radius_min` | number  | —                  | Minimum planet radius in Earth radii (R⊕).                                                                                                                               |
| `radius_max` | number  | —                  | Maximum planet radius in Earth radii (R⊕).                                                                                                                               |
| `sort`       | string  | `habitability_pct` | Sort field. One of: `habitability_pct`, `esi_score`, `distance_ly`, `discovery_year`.                                                                                    |
| `order`      | string  | `desc`             | Sort direction. `asc` or `desc`.                                                                                                                                         |
| `limit`      | integer | `24`               | Number of results per page. Maximum `100`.                                                                                                                               |
| `offset`     | integer | `0`                | Pagination offset. Use `meta.hasMore` and increment by `limit` to paginate.                                                                                              |

### Response

```json
{
  "data": [
    {
      "id": "979b6e4e-4649-4c33-8804-8092c4371dc4",
      "name": "Kepler-296 e",
      "host_star": "Kepler-296",
      "distance_ly": null,
      "radius_earth": 1.08,
      "mass_earth": null,
      "orbital_period": 34.14189,
      "eq_temperature": 244,
      "planet_type": "rocky",
      "discovery_method": "transit",
      "discovery_year": 2014,
      "esi_score": 0.945,
      "habitability_pct": 95,
      "stellar_type": null,
      "total_count": 6227
    }
  ],
  "meta": {
    "total": 6227,
    "limit": 24,
    "offset": 0,
    "hasMore": true
  }
}
```

### Response fields

| Field              | Type            | Description                                                      |
| ------------------ | --------------- | ---------------------------------------------------------------- |
| `id`               | string (UUID)   | Unique planet identifier                                         |
| `name`             | string          | Planet name (e.g. `Kepler-442b`)                                 |
| `host_star`        | string          | Host star name                                                   |
| `distance_ly`      | number \| null  | Distance from Earth in light-years                               |
| `radius_earth`     | number \| null  | Radius in Earth radii (R⊕)                                       |
| `mass_earth`       | number \| null  | Mass in Earth masses (M⊕)                                        |
| `orbital_period`   | number \| null  | Orbital period in days                                           |
| `eq_temperature`   | number \| null  | Equilibrium temperature in Kelvin                                |
| `planet_type`      | string \| null  | Classified planet type enum                                      |
| `discovery_method` | string \| null  | How the planet was detected                                      |
| `discovery_year`   | integer \| null | Year of confirmed discovery                                      |
| `esi_score`        | number \| null  | Earth Similarity Index (0–1). Null if radius or temp unknown.    |
| `habitability_pct` | integer \| null | Habitability percentage (0–100). Null if ESI cannot be computed. |
| `stellar_type`     | string \| null  | Host star spectral classification (e.g. `G2V`, `K5`, `M8`)       |
| `total_count`      | integer         | Total matching planets across all pages (for pagination)         |

### Planet types

| Value          | Description                                                 |
| -------------- | ----------------------------------------------------------- |
| `rocky`        | Radius < 1.25 R⊕                                            |
| `super-earth`  | 1.25–2.0 R⊕                                                 |
| `sub-neptune`  | 2.0–4.0 R⊕                                                  |
| `neptune-like` | 4.0–6.0 R⊕                                                  |
| `ocean-world`  | Sub-Neptune radius with temperature suggesting liquid water |
| `hot-jupiter`  | Large radius + short period + high temperature              |
| `gas-giant`    | Radius > 6 R⊕                                               |
| `unknown`      | Insufficient data to classify                               |

### Discovery methods

| Value             | Description                              |
| ----------------- | ---------------------------------------- |
| `transit`         | Brightness dip as planet crosses star    |
| `radial-velocity` | Stellar wobble from gravitational pull   |
| `direct-imaging`  | Planet directly imaged                   |
| `microlensing`    | Gravitational lensing of background star |
| `astrometry`      | Stellar position shift                   |
| `timing`          | Variations in pulsar or transit timing   |
| `other`           | Other or unclassified method             |

### Caching

Responses are cached at the CDN layer: `Cache-Control: public, s-maxage=300, stale-while-revalidate=600`.

---

## GET /api/ai/summary

Returns a 3-sentence AI-generated scientific description of a planet. Responses are cached in the database after first generation — subsequent requests for the same planet are served from cache instantly.

### Query parameters

| Parameter | Type   | Required | Description                              |
| --------- | ------ | -------- | ---------------------------------------- |
| `id`      | string | Yes      | Planet UUID from `/api/planets` response |

### Response

```json
{
  "summary": "Kepler-442b is a super-Earth orbiting a K-type star approximately 1,206 light-years away, with a radius 1.34 times that of Earth and an equilibrium temperature of 233 K. Its high Earth Similarity Index of 0.84 makes it one of the most Earth-like worlds known, situated comfortably within its star's conservative habitable zone. Discovered by the Kepler space telescope in 2015, it completes one orbit every 112 days and may host liquid water on its surface."
}
```

### Caching

Cached in `planet_ai_cache.summary`. First request ~1–2 seconds (Groq). Next requests are instant.

---

## GET /api/ai/narrative

Returns a 4–5 sentence narrative describing what it would feel like to stand on the planet. Written in second person, grounded in real physical data. Cached after first generation.

### Query parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| `id`      | string | Yes      | Planet UUID |

### Response

```json
{
  "narrative": "You step onto the surface of Kepler-442b and immediately notice the sky — a deep amber hue cast by the warm orange glow of its K-type host star, which appears slightly larger than our Sun but dimmer. Your body feels almost normal here, gravity pulling at about 0.84g, light enough to feel springy with each step. A year passes in just 112 Earth days, meaning seasons change rapidly and you'd celebrate four birthdays before a single Earth year is done. The temperature hovers around -40°C at the equator, cold enough to require insulated gear but potentially warm enough at lower latitudes for liquid water — if an atmosphere exists to trap heat."
}
```

---

## POST /api/ai/compare

Generates a 4–5 sentence AI comparison of two planets. Not cached.

### Request body

```json
{
  "idA": "uuid-of-planet-a",
  "idB": "uuid-of-planet-b"
}
```

### Response

```json
{
  "comparison": "TRAPPIST-1e and Kepler-442b represent two of the most promising habitable-zone candidates known, yet they orbit strikingly different stars — TRAPPIST-1e circles an ultra-cool red dwarf just 40 light-years away, while Kepler-442b orbits a more Sun-like K-type star over 1,200 light-years distant. TRAPPIST-1e is smaller (0.92 R⊕) and potentially tidally locked, meaning one hemisphere faces its star permanently, creating extreme temperature gradients. Kepler-442b's slightly larger size and more conventional orbital geometry make it arguably the more Earth-like of the two by ESI score (0.84 vs 0.85). Both sit within their star's conservative habitable zone, but Kepler-442b's greater distance from Earth means we know far less about it — TRAPPIST-1e has been studied extensively by Webb and remains our best nearby candidate for atmospheric characterisation."
}
```

---

## GET /api/sync

Triggers a fresh data pull from the NASA Exoplanet Archive and upserts all planets into Supabase. Protected by a bearer token.

This endpoint is called automatically by Vercel cron at 00:00 UTC daily. You can also trigger it manually.

### Authentication

```
Authorization: Bearer <CRON_SECRET>
```

### Response

```json
{
  "ok": true,
  "inserted": 6227,
  "failed": 0,
  "total": 6227
}
```

---

## GET /og/[slug].png

Returns a dynamically generated 1200×630 PNG Open Graph image for a planet. Used automatically by Twitter, Discord, Slack, and other platforms when a passport page URL is shared.

### Path parameters

| Parameter | Description                                                                                           |
| --------- | ----------------------------------------------------------------------------------------------------- |
| `slug`    | Planet name lowercased with spaces replaced by hyphens. E.g. `kepler-442b`, `trappist-1e`, `51-peg-b` |

### Response

PNG image (1200×630). Cached for 24 hours: `Cache-Control: public, max-age=86400, s-maxage=86400`.

### Image contents

- Planet type badge
- Planet name (large)
- Host star + distance
- Habitability bar
- Key stats: radius, mass, temperature, ESI score
- Exoplanet Atlas branding

---

## Data types

### Planet type enum

```ts
type PlanetType =
  | "rocky"
  | "super-earth"
  | "sub-neptune"
  | "neptune-like"
  | "ocean-world"
  | "hot-jupiter"
  | "gas-giant"
  | "unknown";
```

### Discovery method enum

```ts
type DiscoveryMethod =
  | "transit"
  | "radial-velocity"
  | "direct-imaging"
  | "microlensing"
  | "astrometry"
  | "timing"
  | "other";
```

### Planet object

```ts
type Planet = {
  id: string; // UUID
  name: string;
  host_star: string;
  distance_ly: number | null; // light-years
  radius_earth: number | null; // R⊕
  mass_earth: number | null; // M⊕
  orbital_period: number | null; // days
  eq_temperature: number | null; // Kelvin
  planet_type: PlanetType | null;
  discovery_method: DiscoveryMethod | null;
  discovery_year: number | null;
  esi_score: number | null; // 0–1
  habitability_pct: number | null; // 0–100
  stellar_type: string | null; // e.g. "G2V"
  total_count: number; // total matching (pagination)
};
```

---

## Error responses

All errors follow this shape:

```json
{
  "error": "Human-readable error message"
}
```

| Status | Meaning                                          |
| ------ | ------------------------------------------------ |
| `400`  | Missing or invalid parameter                     |
| `401`  | Unauthorized (sync endpoint only)                |
| `404`  | Planet not found                                 |
| `500`  | Internal server error (Supabase or Groq failure) |

---

## Examples

### Fetch the 10 most Earth-like rocky planets

```bash
curl "https://exo-atlas.vercel.app/api/planets?type=rocky&habitable=true&sort=esi_score&order=desc&limit=10"
```

### Search for planets in Kepler data from the 2010s

```bash
curl "https://exo-atlas.vercel.app/api/planets?q=kepler&year_from=2010&year_to=2019&sort=esi_score&limit=20"
```

### Get all hot Jupiters sorted by discovery year ascending

```bash
curl "https://exo-atlas.vercel.app/api/planets?type=hot-jupiter&sort=discovery_year&order=asc&limit=50"
```

### Paginate through all planets

```bash
# page 1
curl "https://exo-atlas.vercel.app/api/planets?limit=100&offset=0"

# page 2
curl "https://exo-atlas.vercel.app/api/planets?limit=100&offset=100"

# page 3
curl "https://exo-atlas.vercel.app/api/planets?limit=100&offset=200"
```

### Get AI summary for a specific planet

```bash
# first get the planet id
curl "https://exo-atlas.vercel.app/api/planets?q=trappist-1e&limit=1"

# then fetch summary
curl "https://exo-atlas.vercel.app/api/ai/summary?id=<planet_id>"
```

### JavaScript fetch example

```js
const response = await fetch(
  "https://exo-atlas.vercel.app/api/planets?" +
    new URLSearchParams({
      type: "super-earth",
      habitable: "true",
      sort: "esi_score",
      order: "desc",
      limit: "10",
    }),
);
const { data, meta } = await response.json();
console.log(`Found ${meta.total} planets, showing ${data.length}`);
data.forEach((planet) =>
  console.log(`${planet.name} — ESI: ${planet.esi_score}`),
);
```

### Python requests example

```python
import requests

response = requests.get(
    'https://exo-atlas.vercel.app/api/planets',
    params={
        'type':     'rocky',
        'habitable': 'true',
        'sort':     'distance_ly',
        'order':    'asc',
        'limit':    20,
    }
)
data = response.json()
for planet in data['data']:
    print(f"{planet['name']} — {planet['distance_ly']} ly — {planet['habitability_pct']}%")
```

---

## Notes

- All numeric fields can be `null` — the NASA dataset has many planets with partial data.
- `total_count` in the response is the count of matching planets across all pages, not just the current page. It comes from a `count(*) over()` window function in the Supabase RPC.
- The `esi_score` and `habitability_pct` fields are `null` when both `radius_earth` and `eq_temperature` are not available — the ESI formula requires both inputs.
- Slug generation: `planet.name.toLowerCase().replace(/\s+/g, '-')`. Most planet names are URL-safe after this transformation.
- Data source: [NASA Exoplanet Archive](https://exoplanetarchive.ipac.caltech.edu) — Planetary Systems (`ps`) table, non-controversial planets only (`pl_controv_flag = 0`).
