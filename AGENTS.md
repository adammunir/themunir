# Project: Rebuild & Expand Adam Munir’s UI/UX Portfolio (themunir.com)

## Goal
Create a world-class, FAANG-ready portfolio that showcases end-to-end product thinking, elegant systems/UI, and measurable impact. The site should feel premium, fast, and recruiter-friendly, highlighting a small set of exceptional case studies with rigorous storytelling and artifacts.

## Audience
- FAANG/MAG-10 design managers, Staff+ ICs, design recruiters
- Hiring loops that value systems thinking, complex enterprise UX, and shipping impact

## North-Star Success Criteria
- 3–5 flagship case studies, each readable in <7 minutes with optional deep dives
- Clear personal role, constraints, decisions, and measurable outcomes per project
- MSFT/Apple-level polish: tight typography, motion, spacing, and narrative pacing
- Lighthouse 95+ (perf/accessibility/SEO)
- Clear contact-to-interview conversion metrics

## Current State
- Live: https://themunir.com/
- Repo: forked locally; we’ll iteratively add projects and refine IA + visuals
- Tech stack: Next.js, React, MDX, Tailwind, Framer Motion

## Featured Projects
1. **Lynx Drive (Smart Irrigation Platform – Desktop)**
2. **Lynx Mobile & iCentral**
3. **Oasis (Residential contractor platform)**
4. **Opto 22 Lab Modernization**
5. **DIHAC Legal GPT**
6. **Etsy Digital Products**

## Information Architecture
Home • Work • Case Study • About • Contact

## Writing & Design Tone
Plain, confident, specific. No fluff.  
Show tradeoffs, metrics, and reasoning.  
Design tone = calm, modern, high-trust, Apple/MSFT-level precision.

## Tasks for Codex
- Scaffold MDX case study template
- Generate reusable React components (Hero, ProofBar, StepCard, Figure, MetricCallout)
- Add analytics + accessibility improvements
- Audit for SEO and Lighthouse compliance

# Repository Guidelines

## Project Structure & Module Organization
- Root holds static HTML case-study pages (e.g., `index.html`, `hyperjar.html`); edit copy or layouts directly there.
- `styles/` contains page-level CSS plus shared `styles/styles.css`; clone an existing file when adding a new story to keep selectors aligned.
- `js/` stores per-page scripts (`index.js`, `lynx-highlights.js`) and vendor files like `jquery.js`; scope new functions to the relevant page to avoid global clashes.
- `img/` houses optimized assets—keep names lowercase-kebab-case and compress before committing. `logs/` stores deployment artifacts and should remain read-only for most contributors.

## Build, Test, and Development Commands
- `python3 -m http.server 8080` — Serve the site from the repo root for quick local preview.
- `open http://localhost:8080/index.html` — Load the landing page; swap the filename to review other case studies.
- `npx live-server --no-browser .` (optional) — Auto-reload HTML/CSS/JS while editing; no bundler or build step is required.

## Coding Style & Naming Conventions
- HTML uses two-space indentation with attributes on separate lines for readability. Keep analytics snippets intact and rely on external script tags instead of inline JS.
- CSS is largely minified; when expanding sections, follow the existing order of declarations and only add brief comments where absolutely necessary.
- Match CSS/JS filenames to their page counterparts (e.g., `lynxdrive.html`, `styles/lynxdrive.css`, `js/lynx-highlights.js`) to simplify linking.

## Testing Guidelines
- No automated suite exists; manually verify in at least Chrome and Safari while the local server runs. Confirm there are no console errors or layout regressions at key breakpoints.
- For interactive pages, click through carousels, accordions, and forms to ensure event handlers in `js/*.js` still fire.
- Optional linting: `npx htmlhint **/*.html` and `npx stylelint styles/*.css` if you have those tools installed locally. Resolve warnings before opening a PR.
- Document your manual QA steps (pages touched, devices tested) inside the pull request description.

## Commit & Pull Request Guidelines
- Follow the existing short, Title-Case commit subjects (see `git log`, e.g., “Lynx Mobile Copy Changes”). Use the body to explain scope when multiple pages change.
- Each PR should describe what changed, reference related issues or briefs, and include before/after screenshots for visual adjustments.
- Request review only after manual QA passes and note any known follow-ups so reviewers can reproduce remaining gaps.

## Security & Configuration Tips
- Never commit credentials or API secrets. The public GA/GTM IDs already embedded in HTML should remain untouched unless ops requests an update.
- Traffic logs under `logs/` may contain sensitive data; avoid modifying or syncing them unless coordinating with the deployment owner.


# Repository Guidelines

## Project Structure & Module Organization
- Root holds static HTML case-study pages (e.g., `index.html`, `hyperjar.html`); edit copy or layouts directly there.
- `styles/` contains page-level CSS plus shared `styles/styles.css`; clone an existing file when adding a new story to keep selectors aligned.
- `js/` stores per-page scripts (`index.js`, `lynx-highlights.js`) and vendor files like `jquery.js`; scope new functions to the relevant page to avoid global clashes.
- `img/` houses optimized assets—keep names lowercase-kebab-case and compress before committing. `logs/` stores deployment artifacts and should remain read-only for most contributors.

## Build, Test, and Development Commands
- `python3 -m http.server 8080` — Serve the site from the repo root for quick local preview.
- `open http://localhost:8080/index.html` — Load the landing page; swap the filename to review other case studies.
- `npx live-server --no-browser .` (optional) — Auto-reload HTML/CSS/JS while editing; no bundler or build step is required.

## Coding Style & Naming Conventions
- HTML uses two-space indentation with attributes on separate lines for readability. Keep analytics snippets intact and rely on external script tags instead of inline JS.
- CSS is largely minified; when expanding sections, follow the existing order of declarations and only add brief comments where absolutely necessary.
- Match CSS/JS filenames to their page counterparts (e.g., `lynxdrive.html`, `styles/lynxdrive.css`, `js/lynx-highlights.js`) to simplify linking.

## Testing Guidelines
- No automated suite exists; manually verify in at least Chrome and Safari while the local server runs. Confirm there are no console errors or layout regressions at key breakpoints.
- For interactive pages, click through carousels, accordions, and forms to ensure event handlers in `js/*.js` still fire.
- Optional linting: `npx htmlhint **/*.html` and `npx stylelint styles/*.css` if you have those tools installed locally. Resolve warnings before opening a PR.
- Document your manual QA steps (pages touched, devices tested) inside the pull request description.

## Commit & Pull Request Guidelines
- Follow the existing short, Title-Case commit subjects (see `git log`, e.g., “Lynx Mobile Copy Changes”). Use the body to explain scope when multiple pages change.
- Each PR should describe what changed, reference related issues or briefs, and include before/after screenshots for visual adjustments.
- Request review only after manual QA passes and note any known follow-ups so reviewers can reproduce remaining gaps.

## Security & Configuration Tips
- Never commit credentials or API secrets. The public GA/GTM IDs already embedded in HTML should remain untouched unless ops requests an update.
- Traffic logs under `logs/` may contain sensitive data; avoid modifying or syncing them unless coordinating with the deployment owner.
