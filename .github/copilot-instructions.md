# Copilot Instructions for themunir Codebase

## Overview
This is a static portfolio and project showcase site. The codebase consists mainly of HTML files, custom JavaScript, and CSS for each project or page. There is no build system, backend, or package manager. All assets are loaded directly from the filesystem.

## Directory Structure
- **HTML files**: Each project/page has a dedicated HTML file at the root (e.g., `lynxmobile.html`, `hyperjar.html`).
- **js/**: Custom JavaScript for each page (e.g., `lynx-highlights.js`, `index.js`).
- **styles/**: CSS files for each page and shared styles (e.g., `lynxmobile.css`, `styles.css`).
- **img/**: All images and SVGs used across the site.
- **logs/**: Contains log files, not relevant for site functionality.

## Key Patterns
- **Page-specific assets**: Each HTML file typically links to its own JS and CSS in `/js/` and `/styles/`.
- **No frameworks**: Pure HTML, CSS, and vanilla JS. No React, Vue, or build tools.
- **jQuery**: A custom `jquery.js` is present; some scripts may use jQuery-like patterns but do not rely on npm or CDN.
- **Navigation**: No SPA routing; navigation is via standard anchor tags between HTML files.
- **Images**: Use relative paths to `/img/` for all images and SVGs.

## Developer Workflow
- **Edit HTML, JS, CSS directly**. No build step required.
- **Preview**: Open HTML files in browser to view changes.
- **Debug**: Use browser dev tools for JS/CSS debugging.
- **No tests**: There are no automated tests or test runners.
- **No deployment scripts**: Deployment is manual (e.g., FTP, static hosting).

## Conventions
- **File naming**: Use lowercase and hyphens for HTML, JS, and CSS files.
- **Page structure**: Each HTML file is self-contained, with its own `<head>`, asset links, and content.
- **JS/CSS linking**: Scripts and styles are linked via relative paths, e.g., `<script src="js/lynx-highlights.js"></script>`.
- **No global state**: Each page's JS runs independently.

## Integration Points
- **No external APIs**: All content and assets are local.
- **No server-side code**: This is a purely static site.

## Example: Adding a New Project Page
1. Create `projectname.html` in root.
2. Add `projectname.js` in `js/` and `projectname.css` in `styles/`.
3. Link JS/CSS in the new HTML file.
4. Add images/SVGs to `img/` as needed.

## Key Files
- `index.html`: Main landing page.
- `js/index.js`: Main page JS.
- `styles/styles.css`: Shared styles.
- `img/`: All visual assets.

---
For questions or unclear patterns, ask for clarification or examples from existing files.
