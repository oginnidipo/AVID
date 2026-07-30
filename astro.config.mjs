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
      filter: (page) => !page.includes("/thank-you"),
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
