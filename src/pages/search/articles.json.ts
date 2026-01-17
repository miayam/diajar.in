import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import createExcerpt from "@/utils/createExcerpt";

export const GET: APIRoute = async () => {
  const articles = await getCollection("articles", (entry) => {
    return entry.data.draft !== true;
  });

  const articlesIndex = articles.map((article) => ({
    id: article.id,
    content: createExcerpt(article.body || ""),
    title: article.data.title,
    tags: article.data.tags.map((tag: any) => tag.id),
  }));

  return new Response(JSON.stringify(articlesIndex, null, 2), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
