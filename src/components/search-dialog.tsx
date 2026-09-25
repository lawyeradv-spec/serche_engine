import type { ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { CATALOG } from "@/lib/search/docs";
import { POPULAR_QUERIES, searchDocs } from "@/lib/search/engine";
import { pushRecent, readRecent } from "@/lib/search/recent";
import { ResultCard } from "@/components/result-card";
import { SearchField } from "@/components/search-field";
import { cn } from "@/lib/utils";

export function SearchDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [recent, setRecent] = useState<string[]>([]);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) setRecent(readRecent());
  }, [open]);

  const hits = useMemo(
    () => (query.trim() ? searchDocs(CATALOG, query).slice(0, 8) : []),
    [query],
  );

  useEffect(() => {
    setActive(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onOpenChange(false);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((i) => Math.min(i + 1, Math.max(hits.length - 1, 0)));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && hits[active]) {
        e.preventDefault();
        goToResults();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, hits, active]);

  function goToResults(q = query) {
    const next = q.trim();
    if (!next) return;
    setRecent(pushRecent(next));
    onOpenChange(false);
    void navigate({ to: "/search", search: { q: next, cat: "all" } });
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center px-3 pt-[12vh] sm:px-6">
      <button
        type="button"
        aria-label="סגור חיפוש"
        className="absolute inset-0 bg-navy/55"
        onClick={() => onOpenChange(false)}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="חיפוש באתר"
        className="relative z-10 w-full max-w-2xl overflow-hidden rounded-xl border border-navy/10 bg-cream shadow-[0_24px_80px_rgba(12,26,50,0.35)]"
      >
        <div className="border-b border-border p-3 sm:p-4">
          <SearchField
            value={query}
            onChange={setQuery}
            onSubmit={() => goToResults()}
            autoFocus
            size="md"
            placeholder="חפשו דפים, פרויקטים, מאמרים…"
          />
        </div>
        <div ref={listRef} className="max-h-[min(60vh,480px)] overflow-y-auto p-3 sm:p-4">
          {query.trim() ? (
            hits.length ? (
              <div className="flex flex-col gap-2">
                {hits.map((hit, i) => (
                  <ResultCard
                    key={hit.doc.id}
                    hit={hit}
                    query={query}
                    compact
                    active={i === active}
                    onPick={() => {
                      setRecent(pushRecent(query));
                      onOpenChange(false);
                    }}
                  />
                ))}
                <button
                  type="button"
                  onClick={() => goToResults()}
                  className="mt-1 flex h-11 items-center justify-center gap-2 rounded-md text-sm text-navy hover:bg-surface-2"
                >
                  <Search className="size-4" />
                  כל התוצאות עבור «{query}»
                </button>
              </div>
            ) : (
              <Empty query={query} />
            )
          ) : (
            <Idle
              recent={recent}
              onPick={(q) => {
                setQuery(q);
                goToResults(q);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function Idle({
  recent,
  onPick,
}: {
  recent: string[];
  onPick: (q: string) => void;
}) {
  return (
    <div className="space-y-5">
      {recent.length ? (
        <Section title="חיפושים אחרונים">
          {recent.map((q) => (
            <Chip key={q} onClick={() => onPick(q)}>
              {q}
            </Chip>
          ))}
        </Section>
      ) : null}
      <Section title="חיפושים נפוצים">
        {POPULAR_QUERIES.map((q) => (
          <Chip key={q} onClick={() => onPick(q)}>
            {q}
          </Chip>
        ))}
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-xs font-medium tracking-wide text-subtle">{title}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-9 rounded-full border border-border bg-paper px-3.5 text-sm text-ink hover:border-brass hover:text-navy"
    >
      {children}
    </button>
  );
}

function Empty({ query }: { query: string }) {
  return (
    <div className="px-2 py-10 text-center">
      <p className="font-display text-xl text-navy">לא נמצאו תוצאות</p>
      <p className="mt-2 text-sm text-muted">
        לא מצאנו התאמה ל«{query}». נסו ניסוח אחר, או חיפוש לפי עיר או תחום.
      </p>
    </div>
  );
}

export function useSearchHotkey(onOpen: () => void) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const meta = e.metaKey || e.ctrlKey;
      if (meta && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpen();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onOpen]);
}

export function ShortcutHint({ className }: { className?: string }) {
  return (
    <kbd
      className={cn(
        "hidden items-center gap-0.5 rounded-sm border border-navy-soft bg-navy-mid px-1.5 py-0.5 font-sans text-[11px] text-cream/80 sm:inline-flex",
        className,
      )}
    >
      ⌘K
    </kbd>
  );
}
