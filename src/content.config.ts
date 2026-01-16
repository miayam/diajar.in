import { defineCollection, z } from "astro:content";

import { glob } from "astro/loaders";
import { reference } from "astro:content";

const authors = defineCollection({
  loader: glob({ pattern: "**/*.(md|mdx|json)", base: "./src/data/authors" }),
  schema: z.object({
    name: z.string(),
    email: z.string().email(),
    bio: z.string().optional(),
    picture: z.string().optional(),
  }),
});

const articles = defineCollection({
  loader: glob({ pattern: "**/*.(md|mdx|json)", base: "./src/data/articles" }),
  schema: z.object({
    title: z.string(),
    publishDate: z.coerce.date(),
    updateDate: z.coerce.date().optional(),
    author: reference("authors"),
    tags: z.array(reference("tags")),
    threads: z.array(reference("threads")),
    featuredImage: z.string().optional(),
    caption: z.string().optional(),
    draft: z.boolean(),
    excerpt: z.string().optional(),
  }),
});

const threads = defineCollection({
  loader: glob({ pattern: "**/*.(md|mdx|json)", base: "./src/data/threads" }),
  schema: z.object({
    name: z.string(),
    label: z.string(),
    image: z.string().optional(),
  }),
});

const tags = defineCollection({
  loader: glob({ pattern: "**/*.(md|mdx|json)", base: "./src/data/tags" }),
  schema: z.object({
    name: z.string(),
    label: z.string(),
    image: z.string().optional(),
  }),
});

export const collections = {
  authors,
  articles,
  threads,
  tags,
};
