export type Vitals = {
  /** Lighthouse category scores, 0 to 100. */
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
  /** Largest Contentful Paint, seconds. */
  lcp: number;
  /** Cumulative Layout Shift, unitless. */
  cls: number;
  /** Total Blocking Time, milliseconds. */
  tbt: number;
  /** Total transfer size, KB (1024 bytes). */
  transferKb: number;
};

export type PageQuality = { path: string; name: string; mobile: Vitals; desktop: Vitals };

/**
 * Measured, not targeted. Every number below is copied from the Lighthouse JSON
 * reports and the `next build` output of the run on `measuredOn`; re-measure
 * and replace the whole object rather than editing single values.
 */
export const quality = {
  measuredOn: "2026-11-01",
  conditions: [
    ["Build", "Local production build (next build, next start) on localhost, no CDN"],
    ["Tool", "Lighthouse 13.6.0, headless Chrome 156"],
    ["Mobile", "Default preset: simulated throttling, 4x CPU slowdown, 150 ms RTT, 1.6 Mbps"],
    ["Desktop", "--preset=desktop: no CPU slowdown, 40 ms RTT, 10 Mbps"],
  ],
  pages: [
    { path: "/", name: "Home", mobile: { performance: 74, accessibility: 100, bestPractices: 100, seo: 66, lcp: 8.72, cls: 0, tbt: 21, transferKb: 1653 }, desktop: { performance: 96, accessibility: 100, bestPractices: 100, seo: 66, lcp: 1.35, cls: 0, tbt: 0, transferKb: 1242 } },
    { path: "/work/lynx", name: "Lynx", mobile: { performance: 100, accessibility: 97, bestPractices: 100, seo: 66, lcp: 0.9, cls: 0, tbt: 6, transferKb: 694 }, desktop: { performance: 100, accessibility: 97, bestPractices: 100, seo: 66, lcp: 0.24, cls: 0, tbt: 0, transferKb: 957 } },
    { path: "/work/icentral", name: "iCentral", mobile: { performance: 100, accessibility: 97, bestPractices: 100, seo: 66, lcp: 0.9, cls: 0, tbt: 6, transferKb: 6162 }, desktop: { performance: 97, accessibility: 97, bestPractices: 100, seo: 66, lcp: 1.28, cls: 0, tbt: 0, transferKb: 6363 } },
    { path: "/inventions", name: "Inventions", mobile: { performance: 100, accessibility: 100, bestPractices: 100, seo: 66, lcp: 0.75, cls: 0, tbt: 2, transferKb: 451 }, desktop: { performance: 100, accessibility: 100, bestPractices: 100, seo: 66, lcp: 0.2, cls: 0, tbt: 0, transferKb: 519 } },
    { path: "/about", name: "About", mobile: { performance: 90, accessibility: 100, bestPractices: 100, seo: 63, lcp: 3.6, cls: 0, tbt: 0, transferKb: 443 }, desktop: { performance: 100, accessibility: 100, bestPractices: 100, seo: 63, lcp: 0.81, cls: 0, tbt: 0, transferKb: 462 } },
    { path: "/resume", name: "Résumé", mobile: { performance: 100, accessibility: 100, bestPractices: 100, seo: 66, lcp: 0.9, cls: 0, tbt: 2, transferKb: 623 }, desktop: { performance: 100, accessibility: 100, bestPractices: 100, seo: 66, lcp: 0.7, cls: 0, tbt: 0, transferKb: 644 } },
    { path: "/evidence", name: "Evidence", mobile: { performance: 100, accessibility: 100, bestPractices: 100, seo: 63, lcp: 0.75, cls: 0, tbt: 2, transferKb: 449 }, desktop: { performance: 100, accessibility: 100, bestPractices: 100, seo: 63, lcp: 0.2, cls: 0, tbt: 0, transferKb: 472 } },
    { path: "/colophon", name: "Colophon", mobile: { performance: 100, accessibility: 100, bestPractices: 100, seo: 63, lcp: 0.75, cls: 0, tbt: 4, transferKb: 445 }, desktop: { performance: 100, accessibility: 100, bestPractices: 100, seo: 63, lcp: 0.2, cls: 0, tbt: 0, transferKb: 469 } },
  ] satisfies PageQuality[],
  /** Sum of the gzipped script chunks each route's HTML loads, before any lazy import. */
  firstLoadJs: [
    { route: "/", gzipKb: 305, rawKb: 946 },
    { route: "/work/[slug]", gzipKb: 308, rawKb: 959 },
    { route: "/inventions", gzipKb: 298, rawKb: 922 },
    { route: "/about, /resume, /evidence, /colophon", gzipKb: 282, rawKb: 882 },
  ],
  firstLoadJsNote:
    "Next 16 no longer prints first-load JS, so this sums the gzipped script chunks in each route's HTML. The three.js hero chunk (181 KB gzipped) loads separately, after idle, on the home page only.",
  seoNote:
    "SEO sits at 63 to 66 by design. The only failing audit is is-crawlable: this site is private, so every page sends noindex in a robots meta tag and an X-Robots-Tag header.",
  notes: [
    "Accessibility is 97 on the case studies, and 100 everywhere else. The one open audit is contrast on the statement words that fade in as you scroll: they start at 14% opacity on purpose. Screen readers get the full sentence. Accessibility scores were re-measured after the last fixes.",
    "Mobile LCP is Lighthouse's simulated figure, which runs well above what the trace observed: Home 8.7 s simulated against 2.2 s observed, About 3.6 s against 0.1 s. The Home hero text fades in on a delay, so it sets the LCP.",
  ],
};
