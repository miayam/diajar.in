import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import stripMarkdown from "@/utils/stripMarkdown";

export const GET: APIRoute = async () => {
  const articles = await getCollection("articles", (entry) => {
    return entry.data.draft !== true;
  });

  const threads = await getCollection("threads");

  const threadsIndex: any[] = [];

  for (const thread of threads) {
    const threadArticles = articles.filter((article) =>
      article.data.threads.some((t: any) => t.id === thread.id),
    );

    for (const article of threadArticles) {
      threadsIndex.push({
        id: `${thread.id}_${article.id}`,
        threadId: thread.id,
        title: thread.data.name,
        content: stripMarkdown(thread.body || ""),
        article: {
          id: article.id,
          title: article.data.title,
          content: stripMarkdown(article.body || ""),
        },
      });
    }
  }

  return new Response(JSON.stringify(threadsIndex, null, 2), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
