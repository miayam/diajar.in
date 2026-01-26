// src/pages/threads/[slug].json.ts
import { getCollection } from "astro:content";
import type { APIRoute, GetStaticPaths } from "astro";
import createExcerpt from "@/utils/createExcerpt";

export const getStaticPaths = (async () => {
  const threads = await getCollection("threads");

  return threads.map((thread) => ({
    params: { slug: thread.id },
  }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ params }) => {
  const { slug } = params;

  const threads = await getCollection("threads");
  const thread = threads.find((t) => t.id === slug);

  if (!thread) {
    return new Response(JSON.stringify({ error: "Thread not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  const articles = await getCollection("articles", (entry) => {
    return entry.data.draft !== true;
  });

  // Get articles for this thread (same logic as your page)
  const threadArticles = articles
    .filter((article) => article.data.threads.some((t) => t.id === thread.id))
    .sort((a, b) => a.data.publishDate.valueOf() - b.data.publishDate.valueOf())
    .map((article) => ({
      id: article.id,
      title: article.data.title,
    }));

  return new Response(
    JSON.stringify(
      {
        thread: {
          id: thread.id,
          name: thread.data.name,
          label: thread.data.label,
        },
        articles: threadArticles,
      },
      null,
      2,
    ),
    {
      headers: { "Content-Type": "application/json" },
    },
  );
};
