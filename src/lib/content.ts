import { getCollection, type CollectionEntry } from "astro:content";

type Draftable = { draft: boolean };

// Drafts render in `astro dev` for preview but never reach a build.
const visible = <T extends { data: Draftable }>(entry: T) => import.meta.env.DEV || !entry.data.draft;

export async function getWriting(): Promise<CollectionEntry<"writing">[]> {
  const entries = await getCollection("writing", visible);
  return entries.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getProjects(): Promise<CollectionEntry<"projects">[]> {
  const entries = await getCollection("projects", visible);
  return entries.sort((a, b) => a.data.order - b.data.order);
}

export async function getTravel(): Promise<CollectionEntry<"travel">[]> {
  const entries = await getCollection("travel", visible);
  return entries.sort((a, b) => a.data.country.localeCompare(b.data.country));
}

/** Newest first. The first entry is the live /now page; the rest are the archive. */
export async function getNowEntries(): Promise<CollectionEntry<"now">[]> {
  const entries = await getCollection("now", visible);
  return entries.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function formatMonth(date: Date): string {
  return date.toLocaleDateString("en-IE", { year: "numeric", month: "long" });
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-IE", { year: "numeric", month: "long", day: "numeric" });
}

export function groupByYear<T extends { data: { date: Date } }>(entries: T[]): [string, T[]][] {
  const groups = new Map<string, T[]>();
  for (const entry of entries) {
    const year = String(entry.data.date.getFullYear());
    groups.set(year, [...(groups.get(year) ?? []), entry]);
  }
  return [...groups.entries()].sort((a, b) => Number(b[0]) - Number(a[0]));
}
