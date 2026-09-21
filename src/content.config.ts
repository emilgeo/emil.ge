import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const writing = defineCollection({
  loader: glob({ base: "./src/content/writing", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ base: "./src/content/projects", pattern: "**/*.md" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    status: z.enum(["Ongoing", "In progress", "Planning", "Shipped", "Archived"]),
    year: z.string().optional(),
    stack: z.array(z.string()).default([]),
    links: z.array(z.object({ label: z.string(), href: z.string() })).default([]),
    featured: z.boolean().default(false),
    order: z.number().default(100),
    draft: z.boolean().default(false),
  }),
});

const travel = defineCollection({
  loader: glob({ base: "./src/content/travel", pattern: "**/*.md" }),
  schema: z.object({
    country: z.string(),
    flag: z.string(),
    year: z.string(),
    summary: z.string(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { writing, projects, travel };
