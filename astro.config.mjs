// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { unlistedSections } from "./src/site";

export default defineConfig({
  site: "https://emil.ge",

  integrations: [
    sitemap({
      filter: (page) =>
        !unlistedSections.some((section) => new URL(page).pathname.startsWith(`/${section}`)),
    }),
  ],

  prefetch: true,

  vite: {
    plugins: [tailwindcss()],
  },

  fonts: [
    {
      provider: fontProviders.google(),
      name: "Fraunces",
      cssVariable: "--ff-display",
      weights: ["400", "500", "600"],
      styles: ["normal", "italic"],
      subsets: ["latin"],
    },
    {
      provider: fontProviders.google(),
      name: "Inter",
      cssVariable: "--ff-body",
      weights: ["400", "500", "600"],
      subsets: ["latin"],
    },
    {
      provider: fontProviders.google(),
      name: "Space Mono",
      cssVariable: "--ff-mono",
      weights: ["400", "700"],
      subsets: ["latin"],
    },
  ],
});
