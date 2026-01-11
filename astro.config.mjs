// @ts-check
import { defineConfig } from "astro/config";
import UnoCSS from "unocss/astro";
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
});
