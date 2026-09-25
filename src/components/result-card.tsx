import { ArrowUpLeft, Building2, Calculator, FileText, HelpCircle, Landmark, Newspaper } from "lucide-react";
import type { SearchHit } from "@/lib/search/types";
import { CATEGORY_LABELS } from "@/lib/search/types";
import { Badge } from "@/components/ui/badge";
import { HighlightText } from "@/components/highlight-text";
import { cn } from "@/lib/utils";

const ICONS = {
  practice: Landmark,
  project: Building2,
  article: Newspaper,
  tool: Calculator,
  faq: HelpCircle,
  page: FileText,
} as const;

export function ResultCard({
  hit,
  query,
  compact = false,
  active = false,
  onPick,
}: {
  hit: SearchHit;
  query: string;
  compact?: boolean;
  active?: boolean;
  onPick?: () => void;
}) {
  const Icon = ICONS[hit.doc.category];

  return (
    <a
      href={hit.doc.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onPick}
      className={cn(
        "group flex gap-3 rounded-lg border bg-card p-4 text-right transition-colors duration-(--motion-fast) ease-(--ease-out)",
        compact ? "p-3" : "p-4",
        active
          ? "border-brass bg-brass/8"
          : "border-border hover:border-brass/50 hover:bg-surface",
      )}
    >
      <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-md bg-navy text-brass">
        <Icon className="size-4" strokeWidth={1.75} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <Badge variant="brass">{CATEGORY_LABELS[hit.doc.category]}</Badge>
          {hit.doc.city ? (
            <span className="text-xs text-subtle">{hit.doc.city}</span>
          ) : null}
        </div>
        <h3 className={cn("font-display font-medium text-navy", compact ? "text-base" : "text-lg")}>
          <HighlightText text={hit.doc.title} query={query} />
        </h3>
        {hit.doc.subtitle && !compact ? (
          <p className="mt-0.5 text-sm text-muted">{hit.doc.subtitle}</p>
        ) : null}
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted">
          <HighlightText text={hit.snippet} query={query} />
        </p>
      </div>
      <ArrowUpLeft className="mt-1 size-4 shrink-0 text-subtle transition-colors group-hover:text-brass-deep" />
    </a>
  );
}
