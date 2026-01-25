// @ts-check
import { defineConfig, sharpImageService } from "astro/config";
import UnoCSS from "unocss/astro";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { loadEnv } from "vite";

const { SITE } = loadEnv(process?.env?.NODE_ENV || "", process.cwd(), "");

// https://astro.build/config
export default defineConfig({
  integrations: [UnoCSS(), mdx(), sitemap()],
  prefetch: {
    prefetchAll: true,
  },
  site: SITE,
  image: { service: sharpImageService() },
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
