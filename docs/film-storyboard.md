# Storyboard — "A little curious. Always building."

A 70-second portfolio film for **Farah Nisa Syahindah**, built in the browser at [`film.html`](../film.html).
It uses no narration, only visuals, short captions and lo-fi music. Core idea: *one idea leads to another, and somehow they become real things.*

| | |
|---|---|
| **Length** | 1:10 (70 s), 9 scenes |
| **Format** | 16:9 stage, scales from phone to 1920×1080 |
| **Music** | Lo-fi generated in the browser (electric-piano chords, soft drums, warm bass, vinyl crackle), no vocals. Fades in over 1.5 s and out over the last 3 s. |
| **Sound cues** | Keyboard clicks, paper, soft pops, notification pings and a closing chime, all quiet. |
| **Palette** | Cream #FFF9F7 · blush #F7DCE6 · dusty rose #E9A9C1 · lavender #C8B7E8 · sage #B8D4C5 · soft blue #CFE0F0 · warm charcoal #292631 |
| **Type** | Manrope (captions), Inter (body), JetBrains Mono (labels/terminal), Caveat (handwritten notes) |
| **Recurring device** | The **idea bubble**: a small lightbulb in a thought bubble. It appears in scene 1 and returns in scene 9 as a sparkle. |

---

## Scene by scene

Times are film time. In `film.html`, each element's cue is the `data-in` value, in seconds from the start of its scene.

### 1 · probably building something again — 0:00–0:07
- **Visual:** cozy desk in morning light (sun streaks), laptop, iced coffee, pink headphones, notebook with sticky notes. Slow push-in and drift.
- **On screen:** the laptop types **"hi, i'm farah."** (1.2 s), then **"probably building something again..."** (3.4 s). The cursor blinks.
- **Device:** the idea bubble pops up over the laptop (5 s).
- **Sound:** the beat starts; keyboard clicks under the typing.

### 2 · too many ideas — 0:07–0:14
- **Visual:** ruled notebook paper. Handwritten notes appear: **"what if...?"**, **"could this be easier?"**, **"maybe i should build it."**
- **Transform:** at 3.2 s the notes turn into small browser windows: **Kira Zikir**, **Waktu Solat**, **Kumpul Doa** (name and real URL only) and **Teringat** (real screenshot).
- **On screen:** **"my brain has 27 tabs open."**, then the smaller line *"at least some of them are useful."*
- **Sound:** paper rustle, then four soft pops as the windows appear.

### 3 · real work, real websites — 0:14–0:23
- **Visual:** polished browser windows on a lavender wash. **JIWA SME** (real screenshots, scrolling) and **Dunia Belanjawan 2027** (real screenshot), each with a "● live · astro awani" chip.
- **On screen:** **"but i don't just collect ideas."**, then **"i build things that go live."** A sticker reads *"real projects. real users."*
- **Message:** real-world delivery of public websites.

### 4 · behind the screen — 0:23–0:31
- **Visual:** dark charcoal. The pretty browser slides aside to reveal a terminal:
  `$ whoami` → `farah · started in enterprise IT`
  `$ history | grep fujitsu` → `azure · powershell · sql server` / `automation · system support`
- **Diagram:** scripts → automation → reliable systems.
- **On screen:** **"before the pretty interfaces..."**, then **"i learned what happens behind them."** A mono line reads *"enterprise IT → web development"*.
- **Note:** the terminal is a visual motif, not a recording of real systems, and makes no claim of infrastructure ownership.

### 5 · technology should feel good — 0:31–0:39
- **Visual:** dotted design grid. Three grey wireframe cards turn into styled cards in blush, lavender and sage. Palette swatches pop in, and a phone shows the real **Kalkulator Manfaat** quiz screenshot.
- **On screen:** **"function matters."**, then **"but so does the feeling."** A handwritten note reads *"simple, visual, fun to use ↗"*.
- **Message:** design and UX care, making complicated information simpler.

### 6 · AI that actually helps — 0:39–0:48
Four cards appear one by one, each grounded in real work:
1. **AWANI CMS AI · live:** article lines, then the real AI summary & FAQ screenshot slides in.
2. **Berita Swipe · prototype:** a real news card swipes away to reveal the editorial dashboard.
3. **Teringat · working prototype:** a WhatsApp-style message "amek org esok 3pm" flies up, then the real dashboard showing that reminder.
4. **Hermes · live:** a note card, "⏱ cron · every morning → 5 trending Shopee picks under RM30 + a Threads caption for each" (from Farah's real chat screenshot). It's text only, with no mock interface.
- **On screen:** **"AI is cool."**, then **"AI that actually helps? even better."** A handwritten note reads *"less repetitive work. more room to create."*
- **Sound:** a notification ping for each card.

### 7 · I learn by building — 0:48–0:56
- **Visual:** scrapbook polaroids linked by dashed arrows: **enterprise systems → frontend development → AI & automation**. The middle and last use real screenshots; the first shows a small terminal card.
- **Stamps** (verified records from `data/certifications.json`): Microsoft · Azure Fundamentals · 2022; Meta · Front-End Development · 2024; Anthropic · Claude Code 101 · 2026; Google · AI Fundamentals · 2026.
- **On screen:** **"new tools. new challenges."**, then the handwritten *"i'll figure it out."*

### 8 · the human behind the code — 0:56–1:03
- **Visual:** slower pace and warm dusk light. Kindle, coffee, a chess knight, a travel polaroid ("somewhere new ✈"), headphones, and a sticky note reading "read · travel · chess".
- **On screen:** **"curious beyond the screen."**, then *"always finding something new to learn."*

### 9 · still building — 1:03–1:10
- **Visual:** eight real project screenshots fly in from the edges and settle into an editorial collage.
- **On screen:** **"still learning." / "still creating." / "always building."**
- **Device:** the idea bubble returns (2 s) and turns into a sparkle (2.9 s).
- **End card (3.8 s):**
  **FARAH NISA SYAHINDAH**
  Software Developer
  Web Development · AI Integration · Automation
  *a little curious. a little creative. always building something.*
  **explore my work ↗** (links to the portfolio)
- **Sound:** a soft chime; the music fades out over the last 3 s.

---

## The six messages, told through the story

| Message | Where it lands |
|---|---|
| Real-world delivery | Scene 3: JIWA SME and Dunia Belanjawan 2027, live |
| Enterprise foundations | Scene 4: Azure, PowerShell, SQL Server, automation, system support |
| Practical AI integration | Scene 6: AWANI CMS AI, Berita Swipe, Teringat, Hermes |
| Concept to deployment | Scenes 2→3: notes become deployed apps and live sites |
| Automation mindset | Scene 6: "less repetitive work. more room to create.", Hermes cron |
| Continuous learning | Scene 7: career path and verified learning stamps |

---

## Teaser (homepage hero)

`film.html?teaser` is a ~14.5 s silent loop. It stitches three moments together: live sites (0:14–0:19), AI that helps (0:39–0:45) and closing words (1:03–1:07). It plays muted with no controls, so you can embed it in an `<iframe>`. With reduced motion it shows a still end card instead.

## Exporting a real MP4

1. Open `film.html?record` in a desktop browser at a 1920×1080 window (or full-screen).
2. Start a screen recording at 30 fps (QuickTime, OBS or the macOS screenshot toolbar).
3. Click **play with lo-fi sound**. The controls stay hidden in record mode.
4. Stop at 1:10 and trim the start. Export as H.264 MP4.

## Assets: real vs placeholder

| Asset | Status |
|---|---|
| JIWA SME, Dunia Belanjawan 2027, Kalkulator Manfaat, Belanjawan 2026, Berita Swipe, AWANI CMS AI, Teringat, VTC Holistics | **Real screenshots** |
| Kira Zikir, Waktu Solat, Kumpul Doa | **Placeholder:** name + real URL only. Send screenshots to replace. |
| Hermes | **Text card** based on the real chat screenshot. Send an image file to show the real chat. |
| Illustrated character sticker of Farah (scene 8) | **Not included:** needs a reference image. |
| Music | Generated in the browser (original, so no licence needed). To use a licensed track instead, swap it in `assets/js/film.js`. |
| Everything else (desk, props, notes, stamps) | Original CSS/SVG illustration |

## Files

- [`film.html`](../film.html): scenes and captions (edit wording here)
- [`assets/css/film.css`](../assets/css/film.css): look, layout and motion
- [`assets/js/film.js`](../assets/js/film.js): timeline, sound cues, controls, teaser and record modes
