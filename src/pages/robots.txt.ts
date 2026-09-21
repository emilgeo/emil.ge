import type { APIRoute } from "astro";
import { site, published } from "@/site";

// Unlisted sections are kept out of crawlers until their flag flips in src/site.ts.
const disallowed = (
  [
    ["writing", published.writing],
    ["projects", published.projects],
    ["travel", published.travel],
  ] as const
).filter(([, isPublished]) => !isPublished);

export const GET: APIRoute = () => {
  const lines = [
    "User-agent: *",
    ...disallowed.map(([path]) => `Disallow: /${path}/`),
    "Allow: /",
    "",
    `Sitemap: https://${site.domain}/sitemap-index.xml`,
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain" } });
};
