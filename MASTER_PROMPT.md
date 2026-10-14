# Master Build Prompt — My Digital Workspace

Act as a senior creative frontend engineer, UI/UX designer, accessibility specialist and technical portfolio strategist.

Build my developer portfolio named **My Digital Workspace**. The target audiences are recruiters hiring web/software developers and clients seeking freelance web/automation services.

FIRST: Read `.agent/skills/my-digital-workspace/SKILL.md` and `data/projects.json` fully. Treat these as authoritative requirements. Do not invent information missing from the JSON.

## Product vision
Create a premium, highly polished, mobile-first portfolio inspired by the *exploration experience* of siennachen.com, but with an original visual identity: an isometric miniature digital studio/desk. The scene contains four clickable objects: a computer for production web work, a friendly robot for AI/automation, a notebook for about/experience, and a mini game console for experiments. Visitors must be able to navigate normally without interacting with 3D.

## Core technology
Use semantic HTML, modern CSS, vanilla JavaScript, and Three.js only for optional 3D. No React, Vue, Tailwind, framework or database. Use a simple static JSON project catalog. Hostable on Vercel or Cloudflare Pages.

## Copy and tone
Brand: Farah Nisa.
Eyebrow: WEB DEVELOPER · AI AUTOMATION · CREATIVE TECHNOLOGIST
Headline: I turn ideas into digital experiences.
Subtitle: I build websites, interactive products and AI-powered tools — from concept to working prototype and production.
Primary CTA: Explore My Workspace.
Secondary CTA: View Projects.
Keep language human, clear and professional, not exaggerated.

## Build these sections
1. Sticky nav and polished hero.
2. Accessible miniature workspace scene with four interactive hotspots and fallback category buttons.
3. Featured projects using the six entries with `featured:true` from JSON.
4. All-project grid with filters, real status labels and only real URLs.
5. Case-study detail template with honest placeholders where facts/screenshots are missing.
6. Tech/toolkit section with verified skills only.
7. About and experience section; request resume if needed.
8. Services for freelance clients.
9. Contact section with editable email/social placeholders, not fake links.
10. Responsive footer.

## Visual specification
Colors: #F8F6F2, #B8A4E3, #26243A, #B8D4C5, #F2C7AE. Large editorial headings, restrained use of gradients, elegant rounded panels, soft shadows and spacious layouts. Premium and adult-friendly, with subtle cute 3D details. Prioritize accessibility and mobile performance.

## UX details
Desktop: scene responds gently to pointer movement, objects hover/highlight, clicking opens a right-side project drawer. Mobile: simplified static or low-cost 3D scene, touch-friendly category controls, project drawer becomes bottom sheet or full-screen overlay. Escape closes overlay; focus returns to trigger. Provide direct "Skip to projects" access. Honor reduced-motion preference. No loading gate, no audio, no scroll hijacking.

## Working process
1. Show the proposed file structure and brief implementation plan.
2. Implement a COMPLETE functional Phase 1 first (layout, content, cards, filters, responsive navigation, accessible drawers).
3. Add original 3D scene in Phase 2 as progressive enhancement.
4. Polish and QA in Phase 3.
5. Run checks, fix issues and summarize changed files. Include instructions for running locally and deploying.

## Strict constraints
Do not invent results, testimonials, job history, project screenshots, client logos or URLs. Do not claim unfinished projects are live. Keep secrets and private communications out of the site. No database is necessary. Do not reproduce the reference site's assets or source code. The experience should feel like an engineer's interactive portfolio, not a game that hides the work.

Start by implementing Phase 1. Do not stop after only giving me a plan or static mockup.
