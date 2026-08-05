import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * Content collections. Each one is a folder of markdown files that AVID can
 * add to — through the editor at /admin, or by editing files directly.
 *
 * The `schema` below is a safety net: if a required field is missing or the
 * wrong shape, the build fails with a plain-English message naming the file
 * and the field, rather than publishing a broken page.
 */

/** The transparency wall. One file per school library. */
const libraries = defineCollection({
  loader: glob({ base: "./src/content/libraries", pattern: "**/*.md" }),
  schema: ({ image }) =>
    z.object({
      /** The school's name, exactly as the school writes it. */
      school: z.string(),
      /** e.g. "Surulere, Lagos" */
      location: z.string(),
      status: z.enum(["complete", "in-progress", "committed"]),
      /** Year–month the work finished or is due to. e.g. "2026-09" */
      date: z.string().regex(/^\d{4}-\d{2}$/, {
        error: "Use YYYY-MM, for example 2026-09",
      }),
      pupils: z.number().int().positive(),
      booksPlaced: z.number().int().nonnegative().default(0),
      /** The one-line result. This is the sentence that earns trust — be specific. */
      result: z.string().max(200, {
        error: "Keep the result to one line — 200 characters at most.",
      }),
      /** Which of the five components this project included. */
      components: z
        .array(z.enum(["space", "furniture", "collection", "systems", "people"]))
        .default(["space", "furniture", "collection", "systems", "people"]),
      /** Sponsor credit, if the donor wants to be named. */
      sponsor: z.string().optional(),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      gallery: z
        .array(z.object({ src: image(), alt: z.string() }))
        .default([]),
      /**
       * Written photo consent is on file for the images in this entry.
       * Entries with photos of children must have this set to true — the
       * build refuses to publish them otherwise. See docs/PHOTO-CONSENT.md.
       */
      photoConsentOnFile: z.boolean().default(false),
      featured: z.boolean().default(false),
    }),
});

/** News and stories. A light blog: library openings, visits, updates. */
const stories = defineCollection({
  loader: glob({ base: "./src/content/stories", pattern: "**/*.md" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** One or two sentences. Shown in listings and as the meta description. */
      summary: z.string().max(300),
      date: z.coerce.date(),
      author: z.string().default("The AVID Foundation"),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      tags: z.array(z.string()).default([]),
      /** Set to true to hide from the site without deleting the file. */
      draft: z.boolean().default(false),
    }),
});

/** Board, directors and key volunteers. Funders read this closely. */
const team = defineCollection({
  loader: glob({ base: "./src/content/team", pattern: "**/*.md" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      role: z.string(),
      /** Lower numbers appear first. Founder is 1. */
      order: z.number().int().default(50),
      photo: image().optional(),
      /** A short pull-quote or the line that makes this person memorable. */
      highlight: z.string().optional(),
      linkedin: z.string().optional(),
    }),
});

/**
 * Photographs for the carousels on the home page and For Schools.
 *
 * A collection rather than a data file, so AVID can add and reorder photographs
 * from /admin without a developer — which is the whole point of the CMS.
 *
 * `photoConsentOnFile` carries the same weight here as it does on a library
 * record: a photograph in a carousel is just as published as one on a project
 * page, and the build refuses to ship it without consent recorded.
 */
const gallery = defineCollection({
  loader: glob({ base: "./src/content/gallery", pattern: "**/*.md" }),
  schema: ({ image }) =>
    z.object({
      image: image(),
      /** What is in the photograph. Required — this is content, not decoration. */
      alt: z.string().min(8),
      /** Optional visible caption. */
      caption: z.string().max(200).optional(),
      /** School or place credit, e.g. "St Mary's Primary, Surulere". */
      credit: z.string().max(120).optional(),
      /** Lower numbers appear first. */
      order: z.number().int().default(50),
      /**
       * A photograph of a real place and real people, or a drawing?
       *
       * This decides whether the consent gate applies. An illustration depicts
       * nobody, so there is nobody to obtain consent from; a photograph cannot
       * publish without it. Defaulting to "photo" means a mistake fails safe.
       */
      kind: z.enum(["photo", "illustration"]).default("photo"),
      /**
       * Which carousels this photograph appears in. A photograph of a finished
       * library belongs on For Schools; a portrait of pupils reading belongs on
       * the home page. Most belong in both.
       */
      shownOn: z.array(z.enum(["home", "for-schools"])).default(["home"]),
      /**
       * MUST be true before the photograph will publish. See
       * docs/PHOTO-CONSENT.md. Not overridable from the CMS.
       */
      photoConsentOnFile: z.boolean().default(false),
      /** Set true to hide without deleting. */
      draft: z.boolean().default(false),
    }),
});

/* The reading list lives in src/data/books.ts rather than as one file per
   title: it is a list, not a set of pages, and a single file is far easier for
   a person to scan and edit than thirty-five folders. */

export const collections = { libraries, stories, team, gallery };
