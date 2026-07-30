import type { CollectionEntry } from "astro:content";

/**
 * Order for the transparency wall.
 *
 * Open libraries first, then work in progress, then what is committed — and
 * newest first within each group. The reasoning is about what the wall is for:
 * a funder scanning it wants the evidence before the promises. Sorting purely
 * by date would put a school we have not started on above one we finished.
 */
const STATUS_RANK: Record<CollectionEntry<"libraries">["data"]["status"], number> = {
  complete: 0,
  "in-progress": 1,
  committed: 2,
};

export function sortLibraries(
  entries: CollectionEntry<"libraries">[],
): CollectionEntry<"libraries">[] {
  return [...entries].sort((a, b) => {
    const rank = STATUS_RANK[a.data.status] - STATUS_RANK[b.data.status];
    if (rank !== 0) return rank;
    return b.data.date.localeCompare(a.data.date);
  });
}

/** Libraries that are finished and in use. Used for the honest impact figures. */
export function completedLibraries(
  entries: CollectionEntry<"libraries">[],
): CollectionEntry<"libraries">[] {
  return entries.filter((e) => e.data.status === "complete");
}
