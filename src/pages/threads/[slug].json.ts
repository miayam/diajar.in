// src/pages/threads/[slug].json.ts
import { getCollection } from "astro:content";
import type { APIRoute, GetStaticPaths } from "astro";

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

  const allArticles = await getCollection("articles", (entry) => {
    return entry.data.draft !== true;
  });

  // Get articles for this thread (same logic as your page)
  const threadArticles = allArticles
    .filter((article) => article.data.threads.some((t) => t.id === thread.id))
    .sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf())
    .map((article) => ({
      id: article.id,
      title: article.data.title,
      publishDate: article.data.publishDate.toISOString(),
      excerpt: article.data.excerpt,
      readingTime: article.data.readingTime,
      tags: article.data.tags.map((tag) => tag.id),
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
