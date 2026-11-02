import type { MetadataRoute } from "next";

/**
 * The site is private: nothing on it may be indexed. Search engines are
 * allowed to fetch pages only so they can read the noindex on every response
 * (a page blocked here never has its noindex seen, and its bare URL can still
 * be listed). AI and training crawlers are refused outright.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "OAI-SearchBot",
          "ClaudeBot",
          "Claude-Web",
          "anthropic-ai",
          "CCBot",
          "Google-Extended",
          "Applebot-Extended",
          "PerplexityBot",
          "Bytespider",
          "meta-externalagent",
          "Amazonbot",
          "cohere-ai",
        ],
        disallow: "/",
      },
      { userAgent: "*", allow: "/" },
    ],
  };
}
