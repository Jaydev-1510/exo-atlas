# Exoplanet Atlas

**A passport for every world beyond our solar system.**

Browse 6,000+ confirmed exoplanets from the NASA Exoplanet Archive with full-text search, interactive science tools, AI-powered summaries, and real astrophysics visualizations.

**[live demo](https://exo-atlas.vercel.app)** • Built with Astro JS + Supabase + Vercel

> Explore beyond out solar system!

![exo-atlas banner](./public/banner.png)

---

## Table of contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Architecture](#architecture)
- [Data schema](#data-schema)
- [Pages](#pages)
- [Science tools](#science-tools)
- [AI features](#ai-features)
- [Local development](#local-development)
- [Environment variables](#environment-variables)
- [Database setup](#database-setup)
- [Data ingestion](#data-ingestion)
- [API reference](#api-reference)
- [CI-CD](#ci-cd)

---

## Features

### Data

- **6.2k+ confirmed exoplanets** — live data from NASA Exoplanet Archive, synced nightly via Vercel cron
- **Full-text search** — Supabase `tsvector` FTS with `websearch_to_tsquery` across name, host star, stellar type, discovery method
- **Computed scores** — Earth Similarity Index (ESI) and habitability percentage calculated via database trigger on every insert/update
- **Public REST API** — `/api/planets` with full query parameters, pagination, and sorting

### Atlas

- Filter by planet type, habitability, discovery method
- Sort by ESI score, habitability, distance, discovery year
- Infinite scroll with load more
- URL-synced filter state — shareable URLs

### Passport page (per planet)

- Planet canvas visualization with atmosphere haze ring
- Transit light curve simulation — animated brightness dip driven by real radius and period
- Orbital period animator — planet vs Earth speed comparison in real ratio
- 3D orbital viewer — Three.js scene with draggable camera, rings for gas giants, atmosphere for rocky worlds
- Habitable zone visualizer — Kopparapu (2013) HZ bounds, planet position, AU ruler, pulsing animation
- Atmosphere type estimator — classification, composition breakdown, pressure estimate, breathability
- Stellar classification renderer — spectral type -> color -> rendered star disc with corona glow
- Sky map locator — RA/Dec coordinates mapped to canvas starfield with crosshair
- Size comparison — planet vs Earth vs Neptune vs Jupiter at real radius ratios
- "Could I live here?" gravity calculator — surface gravity from M⊕/R⊕², year length, weight on surface
- "Planets like this" recommendations — Supabase RPC finding similar planets by type, radius, temp
- AI overview — Groq-generated 3-sentence scientific description
- AI narrative — "What if I lived there?" short story driven by real planetary data
- Shareable PNG card — canvas-rendered download card for social sharing
- Dynamic OG image — Satori-generated `/og/[slug].png` for Twitter/Discord previews
- Local bookmarks — save to `localStorage`, manage at `/collections`

### Science pages

- **Discovery timeline** — bar chart from 1992 to present, filter by method, click any year to see its planets
- **Stellar systems** — canvas force graph of host stars + planets within 2,000 ly, hover for tooltips, click to navigate
- **Science plots** — mass-radius diagram with composition lines, Hertzsprung-Russell diagram with spectral bands, Fulton gap histogram

### Compare

- Side-by-side comparison of any two planets
- Live planet search with instant results for both selectors
- Stat diff indicators — green/red arrows showing which planet wins each metric
- AI comparison paragraph via Groq

### Other

- **Planet of the day** — deterministic daily featured planet, seeded from `current_date`
- **Random explore** — `/explore` page with reveal animation, press `R` for another
- **Keyboard navigation** — `/` search, `R` random, `B` bookmark, `S` share, `G` go-to, `?` shortcut panel, arrow keys on grid

---

## Tech stack

| Layer     | Technology                                                    |
| --------- | ------------------------------------------------------------- |
| Framework | Astro 6 (SSG + SSR + ISR via Vercel adapter)                  |
| Database  | Supabase PostgreSQL                                           |
| Search    | Supabase FTS (`tsvector` + GIN index, `websearch_to_tsquery`) |
| Styling   | Tailwind CSS 4 + Geist design system (`@theme` tokens)        |
| Fonts     | Geist Sans + Geist Mono via `astro:assets` Font component     |
| AI        | Groq API — `llama-3.1-8b-instant` (free tier)                 |
| 3D        | Three.js (CDN, lazy-loaded via IntersectionObserver)          |
| OG images | Satori + `@resvg/resvg-js`                                    |
| Runtime   | Bun                                                           |
| Deploy    | Vercel (ISR, Edge cron for nightly sync)                      |
| CI        | GitHub Actions (typecheck + lint + build)                     |

---

## Architecture

```
NASA Exoplanet Archive (TAP/ADQL)
         │
         ├─ scripts/ingest.ts          <- manual seed (bun run ingest)
         └─ src/pages/api/sync.ts      <- nightly cron at 00:00 UTC
                   │
                   v
         Supabase PostgreSQL
         ├── planets                   <- 6,111 rows
         │   ├── fts tsvector          <- trigger: sync_planet_computed()
         │   ├── esi_score             <- trigger: computed from radius + temp
         │   ├── habitability_pct      <- trigger: 0–100 score
         │   └── planet_type enum      <- classified on ingest
         ├── planet_ai_cache           <- Groq responses cached per planet
         └── RPCs
             ├── get_planets()         <- atlas grid + public API
             ├── get_planet_by_slug()  <- passport page
             ├── get_random_planet()   <- explore page
             ├── get_similar_planets() <- passport recommendations
             └── get_planet_of_the_day() <- homepage EPOD
                   │
                   v
         Astro SSR (Vercel)
         ├── /                         -> homepage + EPOD (SSR)
         ├── /atlas                    -> grid + filters (SSR + client JS)
         ├── /planet/[slug]            -> passport (SSR)
         ├── /compare                  -> comparison tool (SSR)
         ├── /explore                  -> random planet (SSG + client)
         ├── /timeline                 -> discovery chart (SSG)
         ├── /systems                  -> force graph (SSG)
         ├── /science                  -> H-R + mass-radius + Fulton (SSG)
         ├── /collections              -> local bookmarks (client-only)
         ├── /api/planets              -> public REST API
         ├── /api/ai/summary           -> Groq planet summary
         ├── /api/ai/narrative         -> Groq "what if I lived there"
         ├── /api/ai/compare           -> Groq planet comparison
         ├── /api/sync                 -> nightly NASA sync (cron protected)
         └── /og/[slug].png            -> dynamic OG image (Satori)
```

---

## Data schema

```sql
-- enums
planet_type:      rocky | super-earth | sub-neptune | neptune-like | ocean-world | hot-jupiter | gas-giant | unknown
discovery_method: transit | radial-velocity | direct-imaging | microlensing | astrometry | timing | other

-- main table
planets (
  id               uuid         PRIMARY KEY
  name             text         UNIQUE NOT NULL
  host_star        text         NOT NULL
  ra               numeric                        -- right ascension (degrees)
  dec              numeric                        -- declination (degrees)
  distance_ly      numeric                        -- light-years from Earth

  radius_earth     numeric                        -- R⊕
  mass_earth       numeric                        -- M⊕
  orbital_period   numeric                        -- days
  eq_temperature   numeric                        -- Kelvin (equilibrium)
  surface_gravity  numeric                        -- density proxy

  stellar_type     text                           -- e.g. G2V, K5, M8
  stellar_temp     numeric                        -- Kelvin
  stellar_radius   numeric                        -- solar radii

  discovery_year   integer
  discovery_method discovery_method
  planet_type      planet_type

  esi_score        numeric                        -- computed by trigger
  habitability_pct integer                        -- 0–100, computed by trigger
  fts              tsvector                       -- computed by trigger

  nasa_id          text         UNIQUE            -- NASA pl_name
  created_at       timestamptz
  updated_at       timestamptz
)

-- indexes
planets_fts_idx   GIN on fts
planets_type_idx  on planet_type
planets_hab_idx   on habitability_pct DESC
planets_esi_idx   on esi_score DESC
planets_year_idx  on discovery_year

-- AI response cache
planet_ai_cache (
  planet_id    uuid  PRIMARY KEY  REFERENCES planets(id)
  summary      text               -- 3-sentence Groq summary
  narrative    text               -- "what if I lived there" story
  generated_at timestamptz
)
```

---

## Pages

| Route            | Description                                             | Rendering    |
| ---------------- | ------------------------------------------------------- | ------------ |
| `/`              | Homepage, planet of the day, featured planets           | SSG          |
| `/atlas`         | Searchable, filterable planet grid with infinite scroll | SSG          |
| `/planet/[slug]` | Full passport page with all science tools               | SSR          |
| `/compare`       | Side-by-side planet comparison with AI analysis         | SSG + Client |
| `/explore`       | Random planet with reveal animation                     | SSG          |
| `/timeline`      | Discovery history bar chart 1992–present                | SSG          |
| `/systems`       | Force graph of stellar systems within 2,000 ly          | SSG          |
| `/science`       | Mass-radius diagram, H-R diagram, Fulton gap            | SSG          |
| `/collections`   | Locally saved planets (localStorage)                    | Client       |
| `/og/[slug].png` | Dynamic OG image for social sharing                     | SSR          |

---

## Science tools

### Habitable zone (Kopparapu et al. 2013)

Stellar luminosity computed from `L = 4πR²σT⁴`. Conservative HZ bounds derived from runaway greenhouse (inner) and maximum greenhouse (outer) flux limits. Planet's orbital distance estimated via Kepler's third law: `a³ = M★ × P²`. Classification: too hot / inner edge / habitable / outer edge / too cold.

### Atmosphere estimator

Classification from mass, radius, and equilibrium temperature:

- Rocky + low retention score -> no atmosphere or thin rocky
- 200–340 K + high gravity -> Earth-like (N₂/O₂)
- > 340 K rocky -> CO₂ dominated / runaway greenhouse
- Sub-Neptune radius -> hydrogen envelope
- Ocean-world + high temp -> steam atmosphere
- Gas giant -> thick H₂/He

### Earth Similarity Index (ESI)

```
raw = 1 - (0.57 * |ln(R)| + 0.25 * |ln(T/255)|)
esi_score = round(raw, 3)
habitability_pct = clamp(round(raw × 100), 0, 100)
```

### Transit light curve

Brightness dip depth = `(R_planet / R_star)²`. Animated dot traverses the curve, planet position above star rendered in sync.

### Stellar classification

Spectral type string parsed to temperature range -> CSS color. HR diagram plots all host stars by `stellar_temp` (x, reversed) vs `stellar_radius` (y, log scale). Spectral class bands O/B/A/F/G/K/M rendered as background fills.

---

## AI features

All AI features use **Groq** (`llama-3.1-8b-instant`) — free tier, ~800 tokens/sec.

| Endpoint                | Input                    | Output                                         | Cached |
| ----------------------- | ------------------------ | ---------------------------------------------- | ------ |
| `GET /api/ai/summary`   | `?id=<planet_id>`        | 3-sentence scientific description              | Yes    |
| `GET /api/ai/narrative` | `?id=<planet_id>`        | "What if I lived there?" story (4-5 sentences) | Yes    |
| `POST /api/ai/compare`  | `{planetIdA, planetIdB}` | 4-sentence comparison paragraph                | No     |

Summaries and narratives are cached in `planet_ai_cache` — first visit generates, subsequent visits are instant.

---

## Local development

```bash
# 1. clone
git clone https://github.com/jaydev-1510/exo-atlas
cd exo-atlas

# 2. install
bun install

# 3. environment
cp .env.example .env
# fill in your values (see Environment variables below)

# 4. database setup*
# run the SQL in docs/schema.sql (WIP) in your Supabase SQL editor

# 5. seed database
bun run ingest

# 6. generate TypeScript types
bunx supabase gen types typescript --project-id YOUR_PROJECT_ID --schema public > src/lib/database.types.ts

# 7. start dev server
bun dev
```

\* **Databse SQL commands WIP**

---

## Environment variables

```env
# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_PUBLIC_KEY=your-public-key
SUPABASE_ADMIN_KEY=your-secret-key

# Groq (free at console.groq.com)
GROQ_API_KEY=your-groq-api-key

# Nightly sync cron protection
CRON_SECRET=your-random-secret
```

Add all five to Vercel: Project -> Settings -> Environment Variables.

---

## Database setup

sql codes will be available soon, stay tuned!

---

## Data ingestion

```bash
bun ingest
```

The script:

1. Fetches all confirmed planets via TAP/ADQL from `exoplanetarchive.ipac.caltech.edu`
2. Deduplicates by `pl_name`
3. Classifies `planet_type` from radius, period, temperature
4. Classifies `discovery_method` from NASA method string
5. Converts `sy_dist` (parsecs) -> `distance_ly` (light-years)
6. Upserts in batches of 500 on conflict `nasa_id`

The trigger fires on each upsert and computes `esi_score`, `habitability_pct`, and `fts`.

Nightly sync runs automatically via Vercel cron at 00:00 UTC hitting `GET /api/sync` with `Authorization: Bearer $CRON_SECRET`.

---

## API reference

See **[API.md](.docs/API.md)** for full documentation.

Quick reference:

```
GET /api/planets
  ?q=           full-text search
  ?type=        rocky | super-earth | sub-neptune | neptune-like | ocean-world | hot-jupiter | gas-giant
  ?method=      transit | radial-velocity | direct-imaging | microlensing | astrometry | timing | other
  ?habitable=   true | false
  ?year_from=   integer
  ?year_to=     integer
  ?radius_min=  number (R⊕)
  ?radius_max=  number (R⊕)
  ?sort=        habitability_pct | esi_score | distance_ly | discovery_year
  ?order=       asc | desc
  ?limit=       integer (max 100, default 24)
  ?offset=      integer (default 0)
```

---

## CI-CD

Push to `main` -> GitHub Actions runs:

1. `bun run astro check` — TypeScript type check
2. `bun run lint` — `tsc --noEmit`
3. `bun run build` — full Astro build

On success > Vercel deploys automatically.

Nightly at 00:00 UTC > Vercel cron > `GET /api/sync` > NASA TAP > Supabase upsert.

- `SUPABASE_URL`
- `SUPABASE_PUBLIC_KEY`
- `SUPABASE_ADMIN_KEY`
- `CRON_SECRET`
- `GROQ_API_KEY`

---

## Contributing

Open to all kinds of contributions and suggestions!

---

## License

[MIT License - 2026](/LICENSE)

---

_Data sourced from the [NASA Exoplanet Archive](https://exoplanetarchive.ipac.caltech.edu). Habitable zone calculations based on [Kopparapu et al. (2013)](https://arxiv.org/abs/1301.6674)._

> Made with 💖 by Jaydev.
