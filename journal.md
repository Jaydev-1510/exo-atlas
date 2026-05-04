# Started the project!

Started with the new project - exoplanet collection. It will be a webpage with the collection and information about various exoplanets. I have kept the tech stack simple and fast = Astro JS + Bun + Tailwind + Supabase. Started with creation of the project, then added typescript and tailwindcss. Afterwards, setup database in supabse, added supabase libraries, and created a re-usable supabase client (both public and admin). Then wrote a custom script for ingesting exoplanet data from the NASA exo-planet archive to the newly built supabase database, in which I found a typo in the database schema and fixed that. Also created a custom github workfow for remote access.

Tasks completed today -

- [x] Initialize astro JS project [(5c997a1)](https://github.com/Jaydev-1510/exo-atlas/commit/5c997a13f5abad8655fab0963048be10f546c328)
- [x] Add typescript + tailwindcss [(0bdb92c)](https://github.com/Jaydev-1510/exo-atlas/commit/0bdb92c3fcf59c9f3d14fbaa3ed91146f9536869)
- [x] Create supabase table and schema && Add supabase && Create supabase client [(6bd9824)](https://github.com/Jaydev-1510/exo-atlas/commit/6bd9824830d83757137e412cf757181d78295c0f) [(613ec3a)](https://github.com/Jaydev-1510/exo-atlas/commit/613ec3a125365296bf2f2f61ab5f5736c617496d)
- [x] Create custom script for ingesting exoplanet data to supabase database [(a8ce25f)](https://github.com/Jaydev-1510/exo-atlas/commit/a8ce25f4f0ff09fb3b9a95b24a701a3e1f2f5d2b)
- [x] Create a manual database ingestion workflow trigger on github actions [(a516557)](https://github.com/Jaydev-1510/exo-atlas/commit/a516557767bcb5399b15670251d7680feac90916)

---

# Designed the logo banner and UI design system

I designed the logo/favicon for the website and the banner/og image in figma. Also worked on the UI design system putrely inspired by Vercel and my another project [astroDaily](https://flavortown.hackclub.com/projects/13888). It consists of the same fonts as verecl - the Geist font and has the same color system as of vercel. Here is the newly UI design system.

Tasks completed -

- [x] Designed the logo/favicon and banner/og image [(27d4bbc)](https://github.com/Jaydev-1510/exo-atlas/commit/27d4bbc8793b75f5377ccb0f0e95ad8cb8d8d9e5)
- [x] Decided the UI system and color palette

---

# Add theme, assets, and layout

Today I configured the tailwindcss configuration file for the custom theme and also added the color, and font varaibles to the global css file. Also, added the Geist fonts - regular, monospace, and pixel using the new Astro v6 fonts API! All the font files are in the [`src/assets/fonts`](https://github.com/jaydev-1510/exo-atlas/tree/main/src/assets/fonts). And also added the Geist icon set along with that. All tge icon files are stored under the [`src/assets/icons`](https://github.com/jaydev-1510/exo-atlas/tree/main/src/assets/icons) directory, and created a custom astro components for using that icons. And also created the base astro layout.

Tasks completed -

- [x] Add tailwind config and custom tailwind theme [(d3e619c)](https://github.com/Jaydev-1510/exo-atlas/commit/d3e619c8df95449de731045644dea1103d8db1be)
- [x] Add geist fonts [(d3e619c)](https://github.com/Jaydev-1510/exo-atlas/commit/d3e619c8df95449de731045644dea1103d8db1be)
- [x] Add geist icons and its astro component [(bf105d6)](https://github.com/Jaydev-1510/exo-atlas/commit/bf105d68a2cd93f17fd53057ef34faa2181df00d)
- [x] Add astro base layout [(e41c8b2)](https://github.com/Jaydev-1510/exo-atlas/commit/e41c8b2b0343c55a1457a14891d58230d27fc185)

---

# Created supabase functions

I have much time today to work on the project, and I have started by creating 3 new supabase/sql functions - `get_planet_by_slug`, `get_planets`, and `get_random_planet`. Then I created a new API endpoint to search for the planets by using these supabase functions. And then I moved on to UI, work in progress and will be updating it soon! Found 1 typo inside astro config-`astro.config.mjs` and also updated the dependencies and upgraded to latest bun version.

Tasks completed -

- [x] Create supabase functions [(5464df5)](https://github.com/Jaydev-1510/exo-atlas/commit/5464df557a82cd38839e1725dfc97a5465ee7e26)
- [x] Add search planets API [(28cc457)](https://github.com/Jaydev-1510/exo-atlas/commit/28cc4570b020127bbe7f19056729ff7210c44052)
- [x] Update dependencies && upgrade bun [(b352585)](https://github.com/Jaydev-1510/exo-atlas/commit/b352585218e79c09d2f7c9f5ba265827597218d4)
- [x] Fix typo inside astro config file [(229c205)](https://github.com/Jaydev-1510/exo-atlas/commit/229c2052f2e176f67bdc6ef11b985761fe6b94ee)

---

# Started with the UI!

I have started with main page page of the website, the index page. And I think looks cool. I am completly inspired by the vercel's Geist design system and I think the page also looks cool. For now it consists of hero section with two buttons and another section consisting of three top planets (they are preview cards just like the preview APOD cards from my astroDaily project) as same as earth. And also, designed the navbar completely inspired from astroDaily project. Working on the atlas page now!

Tasks completed -

- [x] Add vercel typography to css [(c6c2ca2)](https://github.com/Jaydev-1510/exo-atlas/commit/c6c2ca267d13b9fd6dafe39090659cbddbbb69eb)
- [x] Design the navbar [(de41a1c)](https://github.com/Jaydev-1510/exo-atlas/commit/de41a1c9cf908b5b438cc69442bd98a31e75d12a)
- [x] Added navbar and props for title and description to base layout [(79797e5)](https://github.com/Jaydev-1510/exo-atlas/commit/79797e58c814cd8c25b2ae0410a2c537b089a64f)
- [x] Design the index page and hero section [(fb9bbba)](https://github.com/Jaydev-1510/exo-atlas/commit/fb9bbba23b83699ae01262f08a8b5d224e3dbcfa)
- [x] Design the planet card [(f2de0ac)](https://github.com/Jaydev-1510/exo-atlas/commit/f2de0acfe8b6180a93dc632b77cdd8a7ce2b09d8)

---

# Worked on Atlas!

Working on the atlas page showed me, where I stand. Got tired working on the Atlas page, moreover the search wasnt working on the atlas page, and I thought that I did something wrong. I tried to figure out the cause why was the atlas page not working. And after checking supabase, API, I got no clue. Therefore, I asked claude and I came to know that my API was static thats why it wasnt picking up the params from the URL. And thus, the search page also malfunctioned. However, I also came to know that there was some error on the ESI score due to which even unknown planets were shown with 100% scores. Thus fixed that so that only planets with known types get a proper ESI score.

Tasks completed -

- [x] Fix API; add SSR to the planets API [(f74b6f0)](https://github.com/Jaydev-1510/exo-atlas/commit/f74b6f03d54df79d98423cea6f0ffb938eae049c)
- [x] Design the Atlas page [(a492e71)](https://github.com/Jaydev-1510/exo-atlas/commit/a492e71ed021fdfb629170816a6ace688573e0dc)
- [x] Changed planet type to any with highest habitability % [(9cb9c4f)](https://github.com/Jaydev-1510/exo-atlas/commit/9cb9c4f75a2d7fd52e543097a98507f2f32e7057)

---

# Designed the planet page!

Designed the planet page or the main page that will caontain all the details about the planet! I have added everything I could think of. It contains habitability, mass, distance, radius, ESI Score, and discovery year. It also has the size comparision between earth, neptune, jupiter and the exo-planet itself. And also, a light transit curve animations is there! And the bonus includes your weight calculator on the planet. The gravity is calculated from the mass and radius of the exo-planet and if not there it shows estimation. Also fixed the planet card, habitability percent width showing full and changed rocky plant type color. Take a look at the page -

Tasks completed -

- [x] Change rocky planet type color && Fix habitability % width [(b349ca7)](https://github.com/Jaydev-1510/exo-atlas/commit/b349ca7356fc7956b9bc9925357ae88c0c59883b)
- [x] Design the planet page [(ae190d6)](https://github.com/Jaydev-1510/exo-atlas/commit/ae190d6f8582ee7d6ea7df8eb06beed49e3c64ab)

---

# Added orbit period comparision!

Added another section in the planet page, where you can see how much time 1 orbit takes, its speed compared to earth, and your age there, along with a canvas which shows comparision between the ornits of the earth and the planet by plotting them inside an orbit around the star. Also, deployed the website on vercel and fixed the padding on the base layout page. Worked on the a new section but it has errors, so showing only the working section. Will soon update about the another section in the next devlog.

Tasks completed -

- [x] Deploy to vercel [(c1a2d82)](https://github.com/Jaydev-1510/exo-atlas/commit/c1a2d82f2d9095d7d835d5ee3360d18242cfdae3)
- [x] Fix padding on base layout [(5d686a0)](https://github.com/Jaydev-1510/exo-atlas/commit/5d686a0d10321d9d62c63c5405ec42c671e5e907)
- [x] Add orbit section to planet page [(7ba5746)](https://github.com/Jaydev-1510/exo-atlas/commit/7ba5746ac4db0302564248f0c4146ea6b43ca704)

---

# Added host star section!

Well completed the host star section but still there are bugs that need to be resolved. However UI is completed and here its is. It has the canvas which shows the host star with a different color with respect to its temperature! And also, it has information like spectral type, temperature, radius and name ofcourse. Also fixed some styling on the page! There are a lot of features in my mind that I just feel to add everthing together, but it will become a big devlog. Nvm, will devlog after every new feature!

Task completed -

- [x] Add host star section && Change css to tailwind [(dceee05)](https://github.com/Jaydev-1510/exo-atlas/commit/dceee05758bc7f98bb3c07f3f956ba0358d9233b)

---

# Added planet location map!

This is definitely the biggest devlog... Worked on a big thing not that big actually. Added the planet location section where you can see the planet's location on the canvas like a map with co-ordinates. No words, just take a look at it. Also, updated the icons so that it can be color dynamic or change the color depending on the parent element and fixed the icon component where the icon path was not resolved. And added the icons to the index page and the atlas page!

Task completed -

- [x] Updated icons with fill as current color [(3fde803)](https://github.com/Jaydev-1510/exo-atlas/commit/3fde803dfc681edc62dff419d1db3fb9733a039e)
- [x] Fix icon path in the `icons.astro` component [(99cb0d1)](https://github.com/Jaydev-1510/exo-atlas/commit/99cb0d10f3dcfd6e0d335e41907f7700a508b7c1)
- [x] Added icons to the index and planet page [(e3974b7)](https://github.com/Jaydev-1510/exo-atlas/commit/e3974b7a8638723c45fcdd8301262128e4bd1dc4)
- [x] Designed the sky map section for the planet page [(0d34a67)](https://github.com/Jaydev-1510/exo-atlas/commit/0d34a6757408cb9427027e843be4de67f14968ea)

---

# Designed the timeline page!

Yet another big devlog! Worked on the new timeline page and it has got some cool look! It consists of 2 sections - discoveries per year, where you can filter it by discovery method and view the year-wise discovery graph. Also, you can click any column to list the planets discovered in that particular year. Another section consists of planets disovered per discovery method shown in a bar chart. Take a look at newly added things -

Task completed -

- [x] Updated project dependencies [(a67ce01)](https://github.com/Jaydev-1510/exo-atlas/commit/a67ce01b672c40a86bdfa7717349ee6c045b5dd4)
- [x] Fixed tailwind css on several pages/components [(51a7d93)](https://github.com/Jaydev-1510/exo-atlas/commit/51a7d93d79b023b9d4f918421b8a2cac90c76368)
- [x] Added the new timeline page [(36036b8)](https://github.com/Jaydev-1510/exo-atlas/commit/36036b86984f7b3b873be5e51b39e320cca2a78e)

---

# Designed another page "systems"!

Worked on another page 'systems' which basically contains a network of exoplanet systems show beautifully on canvas - planets as nodes connected with their respective stars! And all those together create a network of systems. It was really tough and could have been possible to made without claude's assistance. It took too much time just for a canvas! But the result is extremely good. There are three other boxes which show the no. of systems shown, planets shown and the nearest planet system. There are buttons to filter the planets based on their distance but I have to figure it out its working. The default distance is set to 2000 ly and 1000 planets are shown (supabse max rows returned limit).

Task completed -

- [x] Design the systems page [(2a5092d)](https://github.com/Jaydev-1510/exo-atlas/commit/2a5092dfb8906e317485017b337795a7c4cde8a8)

---

# Added the similar planets section!

I worked on the planets similarity by factors such as planet type and habitibily percentage - and created a custom supabase function. And then created a section in planet passport page frontend by calling the similar planets in frontmatter and then mapping it inside HTML. Working on other features! Nothing much to day about. Take a look -

Tasks completd -

- [x] Added `get_similar_planets` function [(0660029)](https://github.com/Jaydev-1510/exo-atlas/commit/066002992c211c6306a3e08d81377127e94bc2cf)
- [x] Added similar planets section [(a38ea53)](https://github.com/Jaydev-1510/exo-atlas/commit/a38ea5353dc7f28b6db79fa7fed90816e2c25def)

---

# Added footer and bookmarks!

Found out the favicon was from project astroDaily, therefore updates it to that of this project. Also designed the footer (similar to that from project astroDaily) and added the footer to base layout. I just love that footer, thus added to this project also! And fixed some HTML errors from previous commits and prettified it too. Worked on another feature - bookmarks! Now you can bookmark you favorite planet and comeback to collections page to see them! Designed a collections page and added it to navbar. Take a look at the new collections page and bookmarks -

Tasks completed -

- [x] Updated favicon [(35a16f5)](https://github.com/Jaydev-1510/exo-atlas/commit/35a16f520d4c58d8660e8a6cb8f7d99221cbb37b)
- [x] Designed the footer [(2b58e79)](https://github.com/Jaydev-1510/exo-atlas/commit/2b58e791843d2efc6fd0e851c9267aedfd195e8b)
- [x] Added footer to base layout [(2b58e79)](https://github.com/Jaydev-1510/exo-atlas/commit/2b58e791843d2efc6fd0e851c9267aedfd195e8b)
- [x] Fixed HTML and prettify code [(fe3f7ec)](https://github.com/Jaydev-1510/exo-atlas/commit/fe3f7ece6fa7b3145e937d8eb5910528c5dd69dd)
- [x] Added bookmarks to lib [(265ae60)](https://github.com/Jaydev-1510/exo-atlas/commit/265ae60c204d96404b28a5dca9fd98f490af4fc1)
- [x] Designed the bookmarks (collection) page && Added bookmark button to planet page and collections page link to navbar[(e22e9d3)](https://github.com/Jaydev-1510/exo-atlas/commit/e22e9d35e78ee0265775b7cce7c1b98bea4b7bdb)

---

# Created a vercel cron job and ISR!

Added two things - first, added Vercel ISR to all the pages and a prerender states to all of the pages. The second things is, created a custom API for vercel cron job and added its config with the cron job! This cron job will check for new planets available and sync the database.

Tasks completed -

- [x] Added prerender states to all pages [(801041c)](https://github.com/Jaydev-1510/exo-atlas/commit/801041c842f8c5a8318ac06fd8c13ea55841f98c)
- [x] Added ISR to pages [(86362de)](https://github.com/Jaydev-1510/exo-atlas/commit/86362de49238832a224f7eda2256bbabd4463c14)
- [x] Created a custom vercel cron job API [(d520f25)](https://github.com/Jaydev-1510/exo-atlas/commit/d520f2519e46572bfc20e08a66fa9b3f14e6298f)
- [x] Added `vercel.json` config file with cron job [(d52403e)](https://github.com/Jaydev-1510/exo-atlas/commit/d52403e1dcb1aab2958e3ceb42960af5d5cf553c)

---

# Added AI overview!

Yeah, AI is here too! I dont like AI everywhere though I added it here to add some text to the planet pages. I have used groq AI for this. I created two APIs - narrative AI (What if you lived on the planet) and summary (AI overview). These two sections are added in the planet passport page. And yes it took much time! but the result is not bad. Also created another supabase table which is just a cache of these ai responses generated on every visit. This is just to prevent my groq AI credits. And also to prevent that attacks, I have used the planet id instead of planet name to generate those AI responses. Also, removed ISR from APIs, updates dependencies, simplified HTML in some components.

Tasks completed -

- [x] Updates deps && Added astro check [(256daf3)](https://github.com/Jaydev-1510/exo-atlas/commit/256daf31c8442af551acdb62eab6c33e1e468d71)
- [x] Removed ISR from APIs [(cc09e6c)](https://github.com/Jaydev-1510/exo-atlas/commit/cc09e6ca562b4ac8c48121f3efb483d7e9229558)
- [x] Simplified HTML structure for SEO [(ad37fc7)](https://github.com/Jaydev-1510/exo-atlas/commit/ad37fc7d146034a4aead81a6228542f9e9c0ce53)
- [x] Created groq client [(5316c32)](https://github.com/Jaydev-1510/exo-atlas/commit/5316c32f48424ab1c0bca25e5ddcf4990b1396ac)
- [x] Create AI response cache table in supabase [(31cc645)](https://github.com/Jaydev-1510/exo-atlas/commit/31cc645998ca6e4d5b6d6994e5ad45fdbce148b2)
- [x] Create AI summary and narrative APIs [(ee814a3)](https://github.com/Jaydev-1510/exo-atlas/commit/ee814a355863191b80870036600abbade3fd9f28)
- [x] Added AI overview and "What if I lived there?" section to planet page [(b67af1d)](https://github.com/Jaydev-1510/exo-atlas/commit/b67af1d2f62560506846e8737f9644b8e4cf5b28)
- [x] Updates CSS with keyframes [(80af626)](https://github.com/Jaydev-1510/exo-atlas/commit/80af62681b336961941e6bbd72d21b3f1dcd263e)

---

# Added another page!

Yes! this page is not an ordinary one, its for real scientists and physists. LOL, jk, it is just a page having more scientific knowledge and comparision graphs. I have worked on one of its section that is mass radius graph presentend on a logarithmic scale. I will continue with two another graphs tmr. The mass-radius graph shows all the exo-planets with known mass and radius, along with that, there are three lines - the water-world line and the earth like conditioned line, and pure iron line to give idea about the planets density. All the planets are represented in the form of dots of theit respective type colors. You can hover the planet to see its name and click it to view its passport just like the `systems` page. Also fixed the fonts issue on chromium based browser due default font weight was missing.

## Tasks completed -

- [x] Fixed typo in footer [(c2b097b)](https://github.com/Jaydev-1510/exo-atlas/commit/c2b097b10f31953e405f076ee61302998515b2c8)
- [x] Added font default weight to astro config [(f55dc5b)](https://github.com/Jaydev-1510/exo-atlas/commit/f55dc5b008baa3f96e861a129909b73232691977)
- [x] Fixed type errors in collections page [(f55dc5b)](https://github.com/Jaydev-1510/exo-atlas/commit/f55dc5b008baa3f96e861a129909b73232691977)
- [x] Design the mass vs radius graph (log scale) section in new science page [(784b52d)](https://github.com/Jaydev-1510/exo-atlas/commit/784b52df855d226900a3084e6f717b2f11a12967)
- [x] Fixed pixel font for chromium based browsers [(784b52d)](https://github.com/Jaydev-1510/exo-atlas/commit/784b52df855d226900a3084e6f717b2f11a12967)

---

# Added Hertzsprung - Russell diagram!

Basically, this again a graph this time, radius (solar radii, log scale) vs temperature (kelvin). And the stars are plotted on the graph. It has bands (O, B, A, F, G, K and M) based on the temperature range. The stars are plotted with colors depending on these bands. And again this time you can hover to see the planets of the respective hovered star. Nothing much really, though I am doing math from 2 days. Working on another chart diagram! Take a look at this -

## Tasks completed -

- [x] Added Hertzsprung - Russell graph [(b9b4ffa)](https://github.com/Jaydev-1510/exo-atlas/commit/b9b4ffac527508e2dd4c9d4aaa16850a7ed4211b)

---

# Added planet radius gap (Fulton gap) diagram!

Added the the third section to science plot page - planet radius gap (Fulton gap). From the Kepler data it can be inferred that the exoplanets barely have radii between 1.5-2 Earth radii (1.5x - 2x times of earth radius). I have created another graph (number of planets vs radii (earth radii)), which helps us to visualize that gap. Though the gap in not very clear on the graph, it is a real discovery from Kepler data. Also, enlarged font for descriptions as it wasnt that very visible.

## Tasks completed -

- [x] Add Fulton gap diagram [(736420a)](https://github.com/Jaydev-1510/exo-atlas/commit/736420ab0ad9bec39baa33ad143585d6ce6c0e06)

---

# Added planet orbit visualization (again, but now 3D)

Added planet's orbital view again, but this time its in 3D. I have used THREE.js for this because i feel it a lot easier to use. Its again canvas based on the planet / passport page. You can drag the canvas move the perspective and click on the canvas to pause the simulation. It consists of 3 components - star / sun, the planet, and the orbit. Also, there are stars in the background. Take a look at it here. Also, performed astro check and removed unwanted variables and imports, and simplifies ingest script, and added a custom github actions CI workflow, where it performs `bun astro check` and `bun run lint` (`bun tsc --noEmit` under the hood).

## Tasks completed

- [x] Added 3D planet orbit visualization [(d3f9bf1)](https://github.com/Jaydev-1510/exo-atlas/commit/d3f9bf158e35937bbe1df25f09b2e314dd66c69f)
- [x] Simplify Ingest script [(99af6fb)](https://github.com/Jaydev-1510/exo-atlas/commit/99af6fbd7e2f81b6073b34e8f06a5edb7d93b7f9)
- [x] Created custom GH actions CI workflow && Fixed it (thrice) [(6019b2e)](https://github.com/Jaydev-1510/exo-atlas/commit/6019b2e09e57afe381fca9905247ec09217bbc57)[(5f889eb)](https://github.com/Jaydev-1510/exo-atlas/commit/5f889eb6b560482bd8715cf0be1dcad7178792e1)[(1f80f63)](https://github.com/Jaydev-1510/exo-atlas/commit/1f80f633aeafcc9e08251ccb848a0915e5ce2194)[(322921b)](https://github.com/Jaydev-1510/exo-atlas/commit/322921baed1c23bf91c795aebf03aa7456a7e5b4)
- [x] Fixes after `bun astro check` [(13c96d6)](https://github.com/Jaydev-1510/exo-atlas/commit/13c96d6ec2e502f80f9b1f9ff9014775d15f3d0d)[(b4135cc)](https://github.com/Jaydev-1510/exo-atlas/commit/b4135cc2d7b9f18ca4c287d99032850ad6860b59)

---

# Updated the index page!

Added a new section - EPOD (exoplanet of the day) just like APOD from the project astroDaily. Its like a introductory card of passport of the planet page containing information like habitability, host star, radius, mass, period, temperature, ESI, Distance, and AI summary. It uses a custom supabase function to get planet of the day by asscoiating random dates to random IDs and shuffling that data. Also updated the heading styles on the index page and updated styling. Also, added the new pages link to the footer.

## Tasks completed -

- [x] Create supabase function to get the planet of the day [(4936d47)](https://github.com/Jaydev-1510/exo-atlas/commit/4936d4765650ee0a38366e84faa58d4b2c07d7c7)
- [x] Add planet of the day section (EPOD) [(390a335)](https://github.com/Jaydev-1510/exo-atlas/commit/390a335be16e61e27d7fd370163119a281b94a82)
- [x] Add more links to the footer [(390a335)](https://github.com/Jaydev-1510/exo-atlas/commit/390a335be16e61e27d7fd370163119a281b94a82)
- [x] Update styles and heading style [(f121ee7)](https://github.com/Jaydev-1510/exo-atlas/commit/f121ee782cbb41c0411e84f4dac95ad1456170d4) [(4c8924b)](https://github.com/Jaydev-1510/exo-atlas/commit/4c8924bc04a9e3c828a7c13391e22dcffcd54e83)

---

# Added another page!

I feel better and better when I add new pages. Added another page the "explore" page which is like shorts / reels kind of thing where you get the snapshots of random planets with brief information and AI Summary. You can either press the next planet button or use keyboard key "r" to go to the next planet, which is basically refresh of SSR page. Also, you can bookmark the planet directly from the explore page! Updated index page canvas size issue, due to which it wasn't centered and added THREE.js in built with section of footer.

## Tasks completed -

- [x] Added THREE.js under built with in footer [(62402cf)](https://github.com/Jaydev-1510/exo-atlas/commit/62402cfd965659eef0edbe94ac9f77c827a6f392)
- [x] Designed the explore page && Added it to the navbar [(389e647)](https://github.com/Jaydev-1510/exo-atlas/commit/389e647a18626090c8ce180b53b764cb34548f62)
- [x] Fix canvas size on index page [(c091760)](https://github.com/Jaydev-1510/exo-atlas/commit/c091760511ffc8fc1626b19922c323f2439634f2)

---

# Added dynamic OG images!

Yes now when you share the exoplanet passorport pages you get a unique OG image for each planet. Well, it took long time to complete that but I still feel it to be unpolished and the images are not that good ig. I have created an API endpoint for that at `/og/[slug].png` and it uses satori and resvg for the image to render. Also, in order to use the geist font on the image I have hosted the geist.ttf geistMono.ttf on the web. I think it doesnt have support for woff2 files which are already present in the assets directory. And then added the props to base layout for OG stuff and added it to meta. Take a look at it. Ik the image seems small but it was my first time designing such an complex image. I had to play around with layouts and styles.

## Tasks completed -

- [x] Updated deps && added satori and resvg [(020672e)](https://github.com/Jaydev-1510/exo-atlas/commit/020672e8a4e8e7f0f5a1029e8d500bfe592be28b)
- [x] Hosted geist fonts [(d4d1ae4)](https://github.com/Jaydev-1510/exo-atlas/commit/d4d1ae40962e99e01eeaf4b76b013633b761917e)
- [x] Created dynamic OG image endpoint [(3012cf2)](https://github.com/Jaydev-1510/exo-atlas/commit/3012cf2c384af39ecd6a4462646a29fbc662befb)
- [x] Added OG meta tags and its props to the layout [(4e10640)](https://github.com/Jaydev-1510/exo-atlas/commit/4e10640e146529f27a5e9b24222e0f4939899909)
- [x] Passed the planet details to layout for OG meta [(d994ff9)](https://github.com/Jaydev-1510/exo-atlas/commit/d994ff953752cbda39f7925921e82c6e9d4678bb)

---

# Added keyboard navigation!

Yes now you can finally navigate through your keyboard without leaving it! I have added a couple of shortcuts to navigate the website. And the hints for those shortcuts can be viewed by pressing `?` button in the nav bar or typing `?` on your keyboard. Keyboard shortcuts include travelling to different page by pressing `G` + initial of the targetted page, shortcuts also include focusing to search by pressing `/`, `R` for random page, `enter` to open focused planet, `arrow keys` to navigate atlas, `esc` to go back to atlas, `s` to share the page, and `b` to book mark the planet. Also added a section on the index page which include the link to other pages. Updated deps.

## Tasks completed

- [x] Updated deps [(1eb34d3)](https://github.com/Jaydev-1510/exo-atlas/commit/1eb34d37c4ff92fc24a8b84b0af34106eb55a2cc)
- [x] Added links to other pages on index page [(d8ad0f7)](https://github.com/Jaydev-1510/exo-atlas/commit/d8ad0f71b6f29629dc038ab361bbfa975882fff8)
- [x] Added keyboard navigation [(762f31d)](https://github.com/Jaydev-1510/exo-atlas/commit/762f31d964f2632ecae9f3c30e0b2eb8ab01482d)

---

# Added habitable zone visualizer!

Created a new section on the planet page to visualize the habitable zone range. It was possible with the help of claude and resources like https://arxiv.org/abs/1301.6674 and habitable zone calculations based on Kopparapu et al. (2013). I have more features to add! working on them. Till then take a look at this new section.

## Tasks completed -

- [x] Added react to solve error [(54a98e4)](https://github.com/Jaydev-1510/exo-atlas/commit/54a98e4eecfa1bce11c1dfb09250d2c7b989c34b)
- [x] Added habitable zone visualizer to planet page [(297610c)](https://github.com/Jaydev-1510/exo-atlas/commit/297610cbb42ae2c1bdfd61a5bdc4c84dd1bc8cf3)

---

# Added atmosphere visualization!

Added atmosphere section in the planet page where you can view the planets atmosphere composition (estimated), its breathability, and surface atmospheric pressure. All the atmosphere types and information are just an estimation and pre-loaded. The data is based on chatGPT and google search results. All the information is based on planet type and some other data like - radius, mass, temperature. Also, added atmosphere visuals over the planet. Take a look at it now!

## Tasks completed -

- [x] Added atmosphere visual to the planet canvas && Added its composition to planet page [(0195962)](https://github.com/Jaydev-1510/exo-atlas/commit/0195962ee423755291d1b46ca907c7e21c31448e)

---

# Added comparision page!

Now you can compare planets on the `/compare` page or compare a planet with another planet from the planet page from compare with button. It compares the planets on basis of basic metrics and adds a buff or nerf style arrows. The compare page also shows an AI analysis, for that I have created on POST API endpoint which takes the IDs of the both planets. It currently doesnt have caching because it was hard to figure out caching with two planets, and I also might not add it because flavortown is ending soon. Idk, whats the error but the compare page only works on the local dev, not when deployed, sharing images of locally hosted stie. And I think I will need to ship this project by tmr itself. Till then check the compare page -

Tasks completed -

- [x] Create POST API for AI comparision [(0d506bf)](https://github.com/Jaydev-1510/exo-atlas/commit/0d506bf54a5adf382dd6e895f758408f64a438ef)
- [x] Designed the planets comparision page and added it to navbar [(f907249)](https://github.com/Jaydev-1510/exo-atlas/commit/f9072497a6ba6e2da6ac80308f4c325b164e56e3)
- [x] Added compare with button on the planet passport page [(821e274)](https://github.com/Jaydev-1510/exo-atlas/commit/821e274475dc626df776dd0b6c0f3d378d167fa8)
- [x] Updated the CSS on a few pages [(5cc3b64)](https://github.com/Jaydev-1510/exo-atlas/commit/5cc3b64ecb84910971ca7e0400bfb995aba3c802)

---

## Added README and fixed the error!

Figured out what was wrong earlier with compare page, it was due to ISR. I have now excluded the compare page from the ISR and also the atlas page which also has search params. Also added README - polished by claude to the project which I should I have changed a lot earlier! The readme has actually become a lot long. The attached images are now from hosted website as the planet compare page is working fine. Also, crossed 100 commits for this project. Working on the API docs now and then we are ready for the ship!!! Take a look at it now -

## Tasks completed

- [x] Updated deps [(f7c9593)](https://github.com/Jaydev-1510/exo-atlas/commit/f7c95933bdd1ba8e70e1dd54f09f61782489345d)
- [x] Fix compare page and atlas page by excluding them from ISR [(87e678c)](https://github.com/Jaydev-1510/exo-atlas/commit/87e678c674132338e17c54728c20c57f4f072a94)
- [x] Change icon for the compare with button on planet page [(36b452d)](https://github.com/Jaydev-1510/exo-atlas/commit/36b452d33bda4dc40788b28fc67b5bb90457d9cf)
- [x] Add MIT License to the project [(4b3fd95)](https://github.com/Jaydev-1510/exo-atlas/commit/4b3fd953613d8d3501a140b699e80c52cc285a3e)
- [x] Added README to the project [(f03a68c)](https://github.com/Jaydev-1510/exo-atlas/commit/f03a68c51149f55d62ddde374662f34f42dca3ec)

---

# Added API docs!

The last devlog of this project on FT... After 100 hrs of code, these words are the last words before the final ship. Wrote docs for the API at `exo-atlas/docs/API.md` in a single file. It consists of regular docs and examples with python and JS examples too! Updates the project dependencies for the last time before shipping the project.

## Tasks completed -

- [x] Wrote API Docs [(a149b9e)](https://github.com/Jaydev-1510/exo-atlas/commit/a149b9ea2fbb44e0ce4a32336eded040ac26622a)
- [x] Updated deps [(a499615)](https://github.com/Jaydev-1510/exo-atlas/commit/a4996157c5e5c756314d5b456a30847f7d244889)

---
