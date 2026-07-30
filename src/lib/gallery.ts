import { getCollection } from "astro:content";
import type { CarouselPhoto } from "../components/PhotoCarousel.astro";

/**
 * Load photographs for a carousel.
 *
 * The consent gate is enforced here rather than in the template, so every
 * carousel on the site inherits it and no future page can accidentally opt out.
 * A photograph without recorded consent fails the build with a message naming
 * the file — the same behaviour as a library record, for the same reason: a
 * rushed publish is exactly the case an honour-system checkbox does not catch.
 *
 * See docs/PHOTO-CONSENT.md.
 */
export async function galleryFor(
  surface: "home" | "for-schools",
): Promise<CarouselPhoto[]> {
  const entries = await getCollection("gallery", ({ data }) => !data.draft);

  for (const entry of entries) {
    if (!entry.data.photoConsentOnFile) {
      throw new Error(
        `Refusing to publish gallery photograph "${entry.id}": photoConsentOnFile is not true.\n` +
          `Written photo consent must be on file before an image of a school or its pupils goes live.\n` +
          `See docs/PHOTO-CONSENT.md. Once consent is recorded, set photoConsentOnFile: true in\n` +
          `src/content/gallery/${entry.id}.md`,
      );
    }
  }

  return entries
    .filter((entry) => entry.data.shownOn.includes(surface))
    .sort((a, b) => a.data.order - b.data.order || a.id.localeCompare(b.id))
    .map((entry) => ({
      src: entry.data.image,
      alt: entry.data.alt,
      caption: entry.data.caption,
      credit: entry.data.credit,
    }));
}
