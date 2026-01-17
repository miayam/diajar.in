// @ts-check
import { defineConfig } from "astro/config";
import UnoCSS from "unocss/astro";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [UnoCSS(), mdx()],
  prefetch: {
    prefetchAll: true,
  },
  redirects: {
    "/1": "/",
    "/threads/[...slug]/1": "/threads/[...slug]/",
    "/tags/[...slug]/1": "/tags/[...slug]/",
  },
  site: "https://diajar.in",
  markdown: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          headingProperties: {
            className: ["anchor"],
          },
          properties: {
            className: ["anchor-link"],
          },
        },
      ],
      [
        rehypeExternalLinks,
        {
          rel: ["nofollow"],
          target: "_blank",
        },
      ],
    ],
  },
});
