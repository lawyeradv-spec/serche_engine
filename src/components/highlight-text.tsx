import { highlight } from "@/lib/search/engine";

export function HighlightText({
  text,
  query,
  className,
}: {
  text: string;
  query: string;
  className?: string;
}) {
  const marked = highlight(text, query);
  const parts = marked.split(/(«[^»]+»)/g);
  return (
    <span className={className}>
      {parts.map((part, i) => {
        if (part.startsWith("«") && part.endsWith("»")) {
          return (
            <mark key={i} className="mark-hit">
              {part.slice(1, -1)}
            </mark>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
}
