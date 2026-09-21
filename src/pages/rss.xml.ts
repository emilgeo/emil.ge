import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { site, published } from "@/site";
import { getWriting } from "@/lib/content";

export const GET: APIRoute = async (context) => {
  const posts = published.writing ? await getWriting() : [];
  return rss({
    title: `${site.name}: writing`,
    description: site.description,
    site: context.site ?? `https://${site.domain}`,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/writing/${post.id}/`,
    })),
  });
};
