export default function feedLinks() {
  const feedLinks = document.querySelectorAll("[data-is-feed-link]");
  feedLinks.forEach((feedLink) => {
    feedLink?.addEventListener("click", () => {
      localStorage.setItem("cameFromFeed", "true");
    });
  });
}
