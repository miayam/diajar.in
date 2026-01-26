import { getImage } from "astro:assets";
import type { CollectionEntry } from "astro:content";

export const menuItems = [
  { label: "Semua", href: "/" },
  { label: "Gagasan", href: "/tags/gagasan" },
  { label: "Pustaka", href: "/tags/pustaka" },
  { label: "Rupa & Rasa", href: "/tags/rupa-rasa" },
  { label: "Kiat", href: "/tags/kiat" },
  { label: "Perkakas", href: "/tags/perkakas" },
];

interface Slide {
  text: string;
}

export const slides: Slide[] = [
  {
    text: "Bersihkan hati dan luruskan niat",
  },
  {
    text: "Kurangi distraksi dan berikan fokus penuh",
  },
  {
    text: "Jangan bangga dengan apa yang dipelajari",
  },
  {
    text: "Hindari perdebatan yang tidak perlu",
  },
  {
    text: "Belajarlah secara menyeluruh",
  },
  {
    text: "Prioritaskan pada ilmu yang bermuara pada kebijaksanaan hakiki",
  },
  {
    text: "Hiasi ilmu dengan akhlak terpuji",
  },
];

export const getOptimizedImageSrc = async (
  image: ImageMetadata | undefined,
) => {
  if (!image) return undefined;

  const optimizedImage = await getImage({ src: image });
  return optimizedImage.src;
};

export const enrichThreadWithMetadata = async (
  thread: CollectionEntry<"threads">,
  articles: CollectionEntry<"articles">[],
  authors: CollectionEntry<"authors">[],
) => {
  const articleCount = articles.filter((article) =>
    article.data.threads.some((t) => t.id === thread.id),
  ).length;

  const author = authors.find((item) => item.id === thread.data.author.id);

  if (!author) {
    throw new Error(`Author not found for thread: ${thread.id}`);
  }

  const imageSrc = await getOptimizedImageSrc(thread.data.featuredImage);

  const enrichedThread: CollectionEntry<"threads"> = {
    ...JSON.parse(JSON.stringify(thread)),
    data: {
      ...thread.data,
      featuredImage: imageSrc
        ? {
            ...thread.data.featuredImage!,
            src: imageSrc,
          }
        : undefined,
    },
  };

  return {
    thread: enrichedThread,
    author,
    articleCount,
  };
};

export const enrichArticleWithMetadata = async (
  article: CollectionEntry<"articles">,
  authors: CollectionEntry<"authors">[],
) => {
  const author = authors.find((item) => item.id === article.data.author.id);

  if (!author) {
    throw new Error(`Author not found for article: ${article.id}`);
  }

  const imageSrc = await getOptimizedImageSrc(article.data.featuredImage);

  const enrichedArticle: CollectionEntry<"articles"> = {
    ...JSON.parse(JSON.stringify(article)),
    data: {
      ...article.data,
      featuredImage: imageSrc
        ? {
            ...article.data.featuredImage!,
            src: imageSrc,
          }
        : undefined,
    },
  };

  return {
    article: enrichedArticle,
    author,
  };
};
