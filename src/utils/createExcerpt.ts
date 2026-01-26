function createExcerpt(body: string): string {
  let text = body;

  // Remove frontmatter
  text = text.replace(/^---[\s\S]*?---\n*/m, "");

  // Remove HTML/JSX tags (including details, summary, etc.)
  text = text.replace(/<[^>]*>/g, "");

  // Remove code blocks (fenced and indented)
  text = text.replace(/```[\s\S]*?```/g, "");
  text = text.replace(/~~~[\s\S]*?~~~/g, "");
  text = text.replace(/`[^`]+`/g, "");

  // Remove images: ![alt](url) - keep nothing (handle URLs with parentheses)
  text = text.replace(/!\[([^\]]*)\]\((?:[^()]*\([^()]*\)[^()]*|[^)]*)\)/g, "");

  // Remove links but keep text: [text](url) (handle URLs with parentheses)
  text = text.replace(
    /\[([^\]]+)\]\((?:[^()]*\([^()]*\)[^()]*|[^)]*)\)/g,
    "$1",
  );

  // Remove reference-style links
  text = text.replace(/\[([^\]]+)\]\[[^\]]*\]/g, "$1");
  text = text.replace(/^\[[^\]]+\]:\s*.+$/gm, "");

  // Remove headings: # ## ### etc.
  text = text.replace(/^#{1,6}\s+/gm, "");

  // Remove GitHub-style heading IDs: {#id}
  text = text.replace(/\s*\{#[^\}]+\}/g, "");

  // Remove bold: **text** or __text__
  text = text.replace(/(\*\*|__)(.*?)\1/g, "$2");

  // Remove italic: *text* or _text_
  text = text.replace(/(\*|_)(.*?)\1/g, "$2");

  // Remove strikethrough: ~~text~~
  text = text.replace(/~~(.*?)~~/g, "$1");

  // Remove GitHub alerts: > [!NOTE], etc. (do this before general blockquotes)
  text = text.replace(/^>\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/gim, "");

  // Remove blockquotes: > or >> etc., but keep the text content
  text = text.replace(/^>+\s*/gm, "");

  // Remove horizontal rules
  text = text.replace(/^(-{3,}|_{3,}|\*{3,})$/gm, "");

  // Remove task lists: - [ ] or - [x]
  text = text.replace(/^[\s]*-\s+\[[x\s]\]\s+/gim, "");

  // Remove list markers: - * + 1. 2. etc.
  text = text.replace(/^[\s]*[-*+]\s+/gm, "");
  text = text.replace(/^[\s]*\d+\.\s+/gm, "");

  // Remove table formatting
  text = text.replace(/\|/g, " ");
  text = text.replace(/^[-:|\s]+$/gm, "");

  // Remove footnotes: [^1] and [^1]: text
  text = text.replace(/\[\^[^\]]+\]/g, "");
  text = text.replace(/^\[\^[^\]]+\]:\s*.+$/gm, "");

  // Remove emoji shortcodes: :emoji:
  text = text.replace(/:[a-z0-9_+-]+:/gi, "");

  // Remove extra whitespace
  text = text.replace(/\n{3,}/g, "\n\n");
  text = text.replace(/[ \t]{2,}/g, " ");

  // Trim
  text = text.trim();

  return text;
}

export default createExcerpt;
