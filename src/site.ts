export const site = {
  name: "Emil George",
  domain: "emil.ge",
  role: "Software engineer",
  tagline: "I build software, and write about the parts worth remembering.",
  status: "Software engineer in Dublin · building web applications",
  email: "hi@emil.ge",
  description:
    "Emil George: software engineer in Dublin. Notes on building software, money and things I am figuring out.",
  locale: "en",
  social: [
    { label: "GitHub", href: "https://github.com/emilgeo" },
    { label: "LinkedIn", href: "https://ie.linkedin.com/in/emilgeo" },
  ],
} as const;

/**
 * Sections set to false still build at their URL but are kept unlisted: no nav
 * entry, no homepage block, no sitemap or RSS entry, and noindex on the page.
 */
export const published = {
  now: true,
  about: true,
  uses: true,
  writing: false,
  projects: false,
  travel: false,
} as const;

export const navLinks = [
  { label: "Writing", href: "/writing", section: "writing" },
  { label: "Projects", href: "/projects", section: "projects" },
  { label: "Now", href: "/now", section: "now" },
  { label: "Uses", href: "/uses", section: "uses" },
  { label: "Travel", href: "/travel", section: "travel" },
  { label: "About", href: "/about", section: "about" },
] as const;

export const visibleNavLinks = navLinks.filter((link) => published[link.section]);

/** Sections that build but stay out of nav, sitemap, RSS and search results. */
export const unlistedSections = (["writing", "projects", "travel"] as const).filter(
  (section) => !published[section],
);
