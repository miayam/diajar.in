import Fuse from "fuse.js";

let fuse = null;

addEventListener("message", async (event) => {
  if (event.data.type === "init") {
    const endpoint =
      event.data.searchType === "articles"
        ? "/search/articles.json"
        : "/search/threads.json";
    const keys =
      event.data.searchType === "articles"
        ? ["title", "content"]
        : ["title", "content", "article.content"];

    const response = await fetch(endpoint);
    const data = await response.json();

    fuse = new Fuse(data, {
      keys,
      includeScore: true,
      includeMatches: true,
      distance: 1000000,
      threshold: 0.3,
      minMatchCharLength: 3,
    });

    postMessage({ data, type: "init-success" });
  }

  if (event.data.type === "search") {
    const results = fuse.search(event.data.query);
    postMessage({ data: results, type: "search-success" });
  }
});
