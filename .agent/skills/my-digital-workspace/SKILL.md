---
name: my-digital-workspace
description: Build and maintain Farah's premium, mobile-first interactive developer portfolio using HTML, CSS, JavaScript, Three.js and data-driven projects.
---
# My Digital Workspace — Master Skill

## Mission
Build a professional developer portfolio that appeals to both hiring managers and freelance clients. The concept is an interactive miniature digital studio inspired by the *exploration idea* of siennachen.com, not a clone of its visual design, code, assets or content.

## Non-negotiable constraints
- HTML, CSS and vanilla JavaScript. No React, Vue, Tailwind, build system or backend unless explicitly approved.
- Three.js may be loaded as an ES module for the optional 3D workspace. Provide a graceful HTML/CSS fallback when WebGL is unavailable.
- Mobile-first, accessible, fast, SEO-friendly, keyboard-operable and reduced-motion aware.
- All core information must remain accessible without 3D, JavaScript animation or a mouse.
- Do not invent client results, conversion figures, employment details, technology stacks, URLs or project completion states.
- Never expose credentials, private WhatsApp messages, API keys or confidential client information.
- Preserve project status distinctions: Live, Deployed, Prototype, Staging, Developed, Planning, System Design.
- Keep content editable in data/projects.json; do not hardcode project cards in HTML.
- No autoplay audio, no scroll hijacking, no forced splash/loading screen.

## Audience and positioning
Primary audiences: software/web developer recruiters and prospective freelance clients.
Positioning: Web Developer · AI Automation · Creative Technologist.
Hero headline: "I turn ideas into digital experiences."
Supporting copy: "I build websites, interactive products and AI-powered tools — from concept to working prototype and production."
Calls to action: "Explore My Workspace", "View Projects", "Download Resume" (only if a resume file exists), "Start a Project".

## Visual design
Premium editorial layout with a cute but adult-friendly miniature 3D workspace.
Palette: ivory #F8F6F2, lavender #B8A4E3, ink #26243A, sage #B8D4C5, peach #F2C7AE.
Use Plus Jakarta Sans or Manrope for headings and Inter for body text with local/system fallbacks.
Rounded cards (16–20px), subtle borders/shadows, generous spacing, restrained motion, legible contrast.
Avoid childish fonts, excessive gradients, oversized emoji or toy-store styling.

## Information architecture
1. Sticky accessible navigation: Home, Work, About, Services, Contact.
2. Hero: positioning, concise description, primary/secondary CTA and 3D workspace.
3. Workspace: four interactive hotspots — Computer (production websites), Robot (AI/automation), Notebook (about/experience), Mini Console (personal experiments).
4. Featured Work: 6 curated case studies with clear status, role, stack when verified, and actions.
5. All Projects: filter by Professional / AI & Automation / Experiments / Concepts; status filter optional.
6. Toolkit: only technologies actually used and verified.
7. About & Experience: concise professional story and truthful resume link.
8. Services: websites, prototypes, interactive experiences, automation; no unverified prices.
9. Contact: email and social links when provided; no fake contact details.

## 3D interaction specification
- A miniature desk with computer, small AI robot, notebook and game console.
- Desktop: gentle idle animation, hover highlight, click opens accessible project drawer.
- Mobile: static or lightweight scene with large touch targets; always provide category buttons directly below.
- The 3D scene is progressive enhancement; never make it the only navigation.
- Pause/reduce animation on prefers-reduced-motion; cap pixel ratio and dispose WebGL resources.
- Provide text labels, focus outlines, Escape to close, focus restoration and scroll-lock for drawers.

## Content rules
Read data/projects.json. URLs in it are user-provided, not independently verified by this skill. Never invent missing URLs. Use safe placeholders such as "Case study coming soon" for unavailable details. Use actual screenshots only when supplied; otherwise labeled placeholders, not fake screenshots.

## Case-study template
Title; status; year (if known); overview; problem; user role (verified); approach; implementation; technical challenges; outcomes with sourced metrics only; gallery; live link if supplied; confidentiality note if needed.

## Implementation order
Phase 1: semantic responsive layout, navigation, project data and filters, case-study shell, contact, accessibility.
Phase 2: Three.js workspace scene and accessible project drawer.
Phase 3: polished animation, performance, metadata, OG image (if supplied), analytics only after consent/configuration, QA.

## QA checklist
- Works at 320px, 375px, 768px, 1024px and desktop.
- No horizontal overflow; buttons and project links work.
- Keyboard-only navigation and focus trapping/restoration for modal/drawer.
- Images have alt text; decorative imagery is marked appropriately.
- WCAG AA-oriented color contrast and readable type.
- Works without WebGL; honors reduced motion.
- No missing images, dead links, invented achievements or console errors.
- Validate project statuses and links against data/projects.json.

## Output requirements for coding agent
Provide working files, a README with local-run instructions, a file tree, a concise change log and a list of facts or assets still needed. Never claim a page is deployed until it is actually deployed.
