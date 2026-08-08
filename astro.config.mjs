// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { SITE } from "./src/data/site.ts";

export default defineConfig({
  site: SITE.url,
  trailingSlash: "ignore",
  integrations: [
    sitemap({
      /* /admin is the content editor and /thank-you is a form destination.
         Neither belongs in search results; robots.txt blocks them too. */
      filter: (page) => !page.includes("/thank-you") && !page.includes("/admin"),

      /* Weight the pages a school or a funder actually needs above the legal
         boilerplate. Priority is a hint rather than an instruction, but it
         costs nothing to be accurate about which pages matter. */
      serialize(item) {
        const path = new URL(item.url).pathname;
        if (path === "/") {
          item.priority = 1.0;
          item.changefreq = "weekly";
        } else if (["/for-schools/", "/get-involved/", "/our-work/"].includes(path)) {
          item.priority = 0.9;
          item.changefreq = "monthly";
        } else if (path.startsWith("/our-work/") || path.startsWith("/news/")) {
          item.priority = 0.8;
          item.changefreq = "monthly";
        } else if (["/privacy/", "/terms/"].includes(path)) {
          item.priority = 0.2;
          item.changefreq = "yearly";
        } else {
          item.priority = 0.7;
          item.changefreq = "monthly";
        }
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  build: {
    // Hash asset filenames so we can cache them for a year at the CDN.
    assets: "_assets",
  },
  image: {
    // Every photo AVID supplies gets resized to these widths and served as AVIF/WebP.
    responsiveStyles: true,
    layout: "constrained",
  },
});
