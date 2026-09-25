import { CATEGORY_LABELS, CATEGORY_ORDER, type Category } from "@/lib/search/types";
import { cn } from "@/lib/utils";

export function CategoryPills({
  value,
  onChange,
  counts,
}: {
  value: Category | "all";
  onChange: (next: Category | "all") => void;
  counts?: Partial<Record<Category | "all", number>>;
}) {
  const items: Array<Category | "all"> = ["all", ...CATEGORY_ORDER];
  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="סינון לפי סוג">
      {items.map((key) => {
        const label = key === "all" ? "הכל" : CATEGORY_LABELS[key];
        const count = counts?.[key];
        const selected = value === key;
        return (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(key)}
            className={cn(
              "h-9 rounded-full border px-3.5 text-sm transition-colors duration-(--motion-quick)",
              selected
                ? "border-navy bg-navy text-cream"
                : "border-border bg-paper text-muted hover:border-navy/40 hover:text-ink",
            )}
            data-cat={key}
          >
            {label}
            {typeof count === "number" ? (
              <span className="ms-1.5 tabular-nums opacity-70">{count}</span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
