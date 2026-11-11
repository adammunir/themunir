# Showcase — Design Spec

## Thesis

One continuous line runs from the first pixel to the last: **the pipeline**.
Every project is a station on it. Scroll pulls the reader along the line; at
each station the page opens into an editorial case study. The metaphor is the
work itself — research flows into design, design into engineering, engineering
into measured outcomes.

Audience: decision makers and hiring managers, internal (Toro) and external.
They skim first and read second, so every surface has two depths:

- **60-second read** — headline outcome, the problem, what I did, the result.
- **Deep read** — research, insight, design decisions, architecture, trade-offs, reflection.

## Voice

High conviction, plain words. First person, active verbs, no hedging. Lead each
section with the claim and then the evidence. Every number has a source; if we
can't source it, we don't print it.

## Information architecture

```
/                      Home
  Hero                 name, one-line thesis, live shader field
  Proof bar            4 sourced numbers across the body of work
  The Pipeline         selected work — stations on a scroll-drawn spine
  Process              Research → Design → Engineer → Measure (pinned scroll)
  Conviction           5 principles, kinetic type
  Index                every other project, compact table with hover preview
  Contact
/work/[slug]           Case study
  Hero                 title, headline outcome, meta (role, team, time, stack)
  TL;DR                the 60-second card for decision makers
  01 Context           the world before
  02 Research          methods, artifacts, findings
  03 Insight           the one reframing sentence, set huge
  04 Design            decisions with before/after and rationale
  05 Engineering       animated architecture diagram, hard problems, trade-offs
  06 Outcome           sourced metrics, counters
  07 Reflection        what I'd do differently
  Next station         shared-element hand-off to the next project
/about                 story, career line, how I lead
/colophon              how this site is built, performance budget
⌘K                     command palette everywhere
```

## Visual system

| Token          | Value                    | Use                                   |
|----------------|--------------------------|---------------------------------------|
| `ink`          | `#0A0A0B`                | page                                  |
| `ink-2`        | `#121214`                | raised surface                        |
| `line`         | `rgba(237,234,228,.10)`  | hairlines                             |
| `paper`        | `#EDEAE4`                | primary text                          |
| `paper-dim`    | `#8C8A85`                | secondary text                        |
| `signal`       | `#FF4D2E`                | the pipeline, live state, one accent  |
| per-project    | `accent` in content      | tints each station and case study     |

Type: **Instrument Serif** (display, italic for emphasis), **Geist** (UI and
body), **Geist Mono** (labels, numbers, metadata). The display scale is fluid,
`clamp()` from 56px to 200px. Body is 18/30. Labels are mono 11px, +0.08em
tracking, uppercase.

Grid: 12 columns, 24px gutters, 1440px max, with full-bleed allowed for media.

## Motion system

One easing family, three durations. Motion explains; it never decorates.

| Token        | Value                              | Use                     |
|--------------|------------------------------------|-------------------------|
| `ease-out`   | `cubic-bezier(.16, 1, .3, 1)`      | entrances, reveals      |
| `ease-io`    | `cubic-bezier(.65, 0, .35, 1)`     | morphs, pinned scenes   |
| `spring`     | stiffness 220, damping 28          | hover, magnetic, cursor |
| `t-fast`     | 180ms                              | hover, focus            |
| `t-base`     | 600ms                              | reveals                 |
| `t-slow`     | 1100ms                             | hero, route morphs      |

Signature moves:

1. **Spine draw.** The pipeline SVG path's `stroke-dashoffset` is bound to
   scroll. Station nodes ignite (signal glow) as the line reaches them.
2. **Line reveal.** Headlines split into lines; each line rises from a mask with a
   60ms stagger.
3. **Station morph.** The project media on home morphs into the case-study hero
   (React `<ViewTransition name>`), so the reader sees one object travel.
4. **Architecture flow.** Diagram nodes appear in order; a packet of signal travels
   the edges as the reader scrolls through the engineering chapter.
5. **Counters.** Metrics tick up once on entering the viewport, in tabular mono.
6. **Shader field.** In the hero, a slow flow-field of points (irrigation /
   terrain nod) bends gently toward the cursor.

Rules: `prefers-reduced-motion` turns off all transforms and keeps opacity
fades only. No scroll-jacking beyond Lenis smoothing. Content is readable with
JS off.

## Engineering bar

- Next.js 16 App Router, fully static, React Server Components by default.
- Lighthouse 100/100/100/100 on home and case studies. LCP < 1.2s, CLS 0.
- The JS budget is 150KB gz on case study routes; three.js is lazy and hero-only.
- Playwright smoke and a11y checks in CI.
- All content is typed in `src/content`, with no CMS. Every metric carries a `source`.

## Confidentiality

Public by default, so we redact customer and course names, internal URLs,
unreleased features, and internal-only metrics. Use relative figures when
absolutes are sensitive. Each case study carries an `nda` note when details
were withheld.
