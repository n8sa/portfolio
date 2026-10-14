# My Digital Workspace — Farah Nisa

Personal portfolio for Farah Nisa Syahindah: web developer, AI automation, creative technologist.

It's a static site written in plain HTML, CSS and JavaScript, with an optional Three.js "miniature desk" that you can explore. There's no framework, no build step and no backend.

Requirements and content rules live in [`.agent/skills/my-digital-workspace/SKILL.md`](.agent/skills/my-digital-workspace/SKILL.md) and [`MASTER_PROMPT.md`](MASTER_PROMPT.md).

## Run locally

The page loads `data/projects.json` with `fetch`, so it must be served over HTTP. Opening `file://` won't work.

```bash
python3 -m http.server 8000
# or: npx serve .
```

Then open http://localhost:8000.

## Deploy

Every file is static, so you can host it as-is.

- **Vercel:** import the repo, set Framework Preset = *Other*, leave Build Command empty, and set Output Directory = `.`.
- **Cloudflare Pages:** leave Build command empty and set Build output directory = `/`.

## File tree

```
index.html                     Page markup, nav, sections, drawer, icon sprite
assets/
  css/styles.css               All styles (mobile-first, design tokens in :root)
  js/main.js                   Data loading, cards, filters, drawer, nav, lazy 3D loader
  js/workspace3d.js            Three.js desk scene (progressive enhancement)
  images/projects/*.jpg        Real project screenshots (compressed from the old site)
  favicon.svg
data/projects.json             Project catalogue — edit this to change projects
.agent/skills/my-digital-workspace/SKILL.md
MASTER_PROMPT.md
```

## Editing projects

Every card, filter result and case study comes from `data/projects.json`. The required fields are `id`, `title`, `category` (`professional`, `client`, `ai-automation`, `experiments` or `concept`), `status`, `url` (or `null`) and `featured`.

Optional fields fill in the case-study template whenever they're present:

| Field | Shape |
|---|---|
| `client`, `year`, `summary`, `overview` | string |
| `problem`, `role`, `approach`, `implementation`, `challenges`, `outcomes` | string or array of strings |
| `features`, `stack` | array of strings |
| `images` | `[{ "src": "assets/images/projects/x.jpg", "alt": "…" }]` |
| `links` | `[{ "label": "…", "url": "https://…" }]` |
| `confidential` | string (shown as a note) |

If a case-study field is missing, the page lists it under "Still being written up" and doesn't make anything up. A project with no images gets a labelled "Screenshots coming soon" placeholder. Status pills are colour-grouped: Live/Deployed, in progress (Prototype, Testing, Staging, Developed, Integrated), and Planning/Design.

You can link straight to a case study with `?project=<id>`, for example `/?project=jiwa-sme`.

## Editing certifications

`data/certifications.json` has four parts:

- **`certifications`:** one record per item, with `id`, `title`, `issuer`, `issuedMonth` (1–12), `issuedYear`, `category`, `skills`, `credentialId`, `credentialUrl` (`null` unless verified), `featured` (plus `featuredRank` for order) and `credentialType`.
- **`categories`:** the filter labels.
- **`types`:** honest labels: `certification` (passed exam), `certificate`, `course`, `learning-path`, `participation`.
- **`issuers`:** a monogram and tone per issuer, plus a `logo` path. Set `logo` (e.g. `"assets/images/issuers/microsoft.svg"`) to show a real logo instead of the monogram.

The page sorts newest first, counts records itself and skips duplicates (with a console warning). By default it shows the five featured items, then the latest six that aren't featured, plus "View all".

## How the 3D works

- The first screen is a full-screen cutaway studio room, drawn with Three.js primitives and canvas textures. It has no outside 3D assets.
- Eight objects are clickable: **computer** (websites), **robot** (AI & automation), **notebook** (about), **console on the pouf** (experiments), **pinboard** (all projects), **poster** (why hire me), **framed certificate with rosette** (certifications) and **mail tray** (contact).
- Labels are placed in code: each stays near its object, on screen and below the top bar, and moves aside to avoid overlapping another label. The monitor and the pinboard polaroids show real screenshots, taken from `images` in `projects.json`.
- The floating labels are real `<button>`s, so keyboard and screen-reader users can reach every object. They follow the objects as the camera moves. Without WebGL they become a plain list of buttons next to a static SVG drawing of the room.
- Click an object (or its label) and the camera moves toward it while a panel opens: from the right on desktop, from the bottom on mobile. In that panel a project shows as an album you page with ← →, a swipe, or the buttons.
- You can drag to look around. On touch screens the drag only turns sideways, so scrolling up and down still moves the page.
- Idle motion (the robot, the rotating monitor screenshots) runs on desktop only, and never with `prefers-reduced-motion`. The pixel ratio is capped, rendering pauses off-screen and in hidden tabs, and resources are disposed on `pagehide`. The room loads only when WebGL is available and Data Saver is off. There's no loading screen.

## Portfolio film

`film.html` is a 70-second film, "a little curious. always building.", built with HTML/CSS/JS from real project screenshots, with lo-fi music and no narration. The storyboard is in [`docs/film-storyboard.md`](docs/film-storyboard.md).

- `film.html`: full film with controls (play/pause, scrubber with scene chapters, sound, restart, a text transcript). Keyboard: Space plays/pauses, ← → seek 5 s, M toggles sound.
- `film.html?teaser`: ~14 s silent loop for embedding in a hero `<iframe>`.
- `film.html?record`: no UI, for screen-recording a 1920×1080 MP4.
- Edit captions in `film.html`. Scene timing comes from `data-start`/`data-end` on each scene, and element timing from `data-in`/`data-out`, in seconds from the start of the scene.

## Light & night mode

The sun/moon button in the nav pill switches themes.

- **Default:** follows the visitor's system setting until they choose, then remembers it (`localStorage` key `theme`). A tiny script in `<head>` applies it before first paint, so there's no flash.
- **Colours:** theme colours are CSS variables in `:root` (light) and `:root[data-theme="dark"]` (night) at the top of `styles.css`.
- **3D room:** the room listens for the `themechange` event. Night mode gives it moonlight, a starry window with a crescent moon, and a warm desk lamp.

## Lo-fi mode

The pill at the bottom right turns on optional background music. It's off by default, and nothing loads until a visitor clicks it.

- **Behaviour:** default volume 12%, adjustable from the slider; 1.5 s fade-in, 1 s fade-out. On/off and volume are remembered in `localStorage`. A remembered "on" waits for the visitor's first click, tap or key press, because browsers block sound before that. Music pauses in background tabs and resumes on return.
- **Interface sounds:** a soft click when opening a project, a gentle transition for nav jumps, and a chime when "Copy email" succeeds. They play only while lo-fi mode is on, and are rate-limited.
- **Audio file:** see [`assets/audio/README.md`](assets/audio/README.md). With no file set, `assets/js/sound.js` generates a lo-fi loop with Web Audio (keys, soft drums, vinyl crackle), so there's no licence to worry about.
- **How it plays:** everything goes through one `AudioContext`, so volume and fades also work on iOS Safari, where `audio.volume` is read-only.

## Change log

**2026-10 — v3.9**
- Added the portfolio film (`film.html`, `assets/css/film.css`, `assets/js/film.js`) and its storyboard (`docs/film-storyboard.md`). "Why hire me" links to it.
- Project panels show only real content. The "Still being written up", "No public link yet", "Case study coming soon" and empty-screenshot placeholders are gone.

**2026-10 — v3.8**
- Removed the three concept projects (MyVaultLife, Wedding Digital Memory, Teacher Result Automation) and the Concepts filter. Added a VTC Holistics screenshot.

**2026-10 — v3.7 (Soft Pink Tech Studio)**
- Soft pink refinement: warm cream (#FFF9F7), warm charcoal (#292631), and blush, rose and lavender accents (tokens `--blush`, `--rose`, `--rose-deep`, `--rose-glow`). They're used for hover rings, active nav, filter underlines, section labels, card hover borders, text selection and the lo-fi waveform.
- New "a little more about me." section (`#beyond`) with four inline-SVG cards: Kindle, travel, chess and building. Each animates on hover, or once when scrolled into view on touch screens; with reduced motion they stay still.
- Small personal touches: a hero sticky note, a Kindle sticker by About, a knight sticker by Why hire me, floating music notes while lo-fi plays, and a dusty-rose chair and blush books in the 3D room.

**2026-10 — v3.6**
- Added a framed certificate to the 3D room. It opens featured certifications and links to the full section.
- AWANI CMS AI is now Live.

**2026-10 — v3.5**
- Added light/night mode, including a night version of the 3D studio.

**2026-10 — v3.4**
- Replaced the simple certificates list with "Certifications & Continuous Learning": 38 records, 5 featured, search plus combinable category and year filters, a latest-6 default view with "View all", and type labels.
- Rewrote "Why hire me" with Farah's copy (six points).

**2026-10 — v3.3**
- "Why hire me" has two new points (05 productive laziness, 06 fast learner). Added a Licenses & certifications section driven by `data/certifications.json`.

**2026-10 — v3.2**
- Added optional lo-fi mode: a floating control, background music and quiet interface sounds.

**2026-10 — v3.1**
- Added a "Why hire me" section. Every point links to a project as proof, and the wall poster in the room opens the same points.
- Removed Ramadan 1447H. VTC Holistics is now Live with a link. Added Teringat details and screenshot. Hermes is now Live with a description.

**2026-10 — v3 (studio redesign)**
- Redesigned around the exploration idea of siennachen.com, with an original look: the whole first screen is now a 3D studio room (not a desert) with real screenshots on its objects.
- Replaced the card grids, services cards and timeline with a quiet editorial "Index" (Featured / All / category filters, with a screenshot that follows the cursor on hover), an About fact list and a large email link.
- The project panel now opens as an album you page with ← →, swipe or buttons. Added a mono typeface (JetBrains Mono) for labels.

**2026-10 — v2**
- Replaced the Next.js/React/Tailwind app with a dependency-free static site, per `SKILL.md`. The old app is still in git history (commit `54127ce`).
- Added `SKILL.md`, `MASTER_PROMPT.md` and a data-driven `data/projects.json` (12 projects, 5 featured).
- New light editorial design in the ivory/lavender/ink/sage/peach palette with Plus Jakarta Sans and Inter.
- Built the interactive 3D desk with four hotspots, plus fallback buttons and an SVG fallback.
- Added featured case studies, an all-projects grid with category and status filters, and an accessible drawer built on native `<dialog>` that works as a right-hand panel on desktop and a bottom sheet on mobile. It supports Escape to close, focus restore, scroll lock and a Back button.
- Added Toolkit, About/timeline, Services and Contact (email, copy-to-clipboard, LinkedIn) sections.
- Re-encoded screenshots from PNG to JPEG (about 4.5 MB down to 1.5 MB).

## Facts and assets still needed

- **Resume PDF.** Add one to enable a "Download Resume" button; until then the site offers "Request my resume" by email.
- **Belanjawan 2026 URL.** `projects.json` has `url: null`, but the old site linked `https://pulse.astroawani.com/kuiz-belanjawan-2026`. Confirm it and add it if it's still live.
- **Your role** on each project (lead dev, solo, team member…). None are filled in yet.
- **Descriptions and screenshots** for Hermes and the four Vercel experiments.
- **Years** for each project, plus your **job titles and dates** at Fujitsu, Parkson, Petronas Digital and Astro AWANI.
- **Certification credential URLs and issuer logos.** Add a verified `credentialUrl` per record and a `logo` per issuer in `data/certifications.json`.
- **Outcomes/metrics**, but only ones you can source.
- **OG share image** (1200×630) and the **production domain**, for canonical URLs and a sitemap.
