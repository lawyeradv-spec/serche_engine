import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { SiteShell } from "@/components/site-shell";
import { SearchField } from "@/components/search-field";
import { CategoryPills } from "@/components/category-pills";
import { ResultCard } from "@/components/result-card";
import { CATALOG } from "@/lib/search/docs";
import { POPULAR_QUERIES, searchDocs } from "@/lib/search/engine";
import { pushRecent } from "@/lib/search/recent";
import { CATEGORY_ORDER, type Category } from "@/lib/search/types";

type SearchParams = {
  q: string;
  cat: Category | "all";
};

function parseCat(value: unknown): Category | "all" {
  if (value === "all") return "all";
  if (typeof value === "string" && (CATEGORY_ORDER as string[]).includes(value)) {
    return value as Category;
  }
  return "all";
}

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    q: typeof search.q === "string" ? search.q : "",
    cat: parseCat(search.cat),
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q, cat } = Route.useSearch();
  const navigate = useNavigate({ from: "/search" });

  const hits = useMemo(() => (q.trim() ? searchDocs(CATALOG, q, cat) : []), [q, cat]);
  const allHits = useMemo(() => (q.trim() ? searchDocs(CATALOG, q, "all") : []), [q]);

  const counts = useMemo(() => {
    const next: Partial<Record<Category | "all", number>> = { all: allHits.length };
    for (const h of allHits) {
      next[h.doc.category] = (next[h.doc.category] ?? 0) + 1;
    }
    return next;
  }, [allHits]);

  function setQuery(next: string) {
    void navigate({
      search: (prev) => ({ ...prev, q: next }),
      replace: true,
    });
  }

  function submit() {
    if (q.trim()) pushRecent(q);
  }

  return (
    <SiteShell>
      <div className="border-b border-border bg-paper">
        <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
          <p className="mb-3 text-xs tracking-[0.16em] text-brass-deep">תוצאות חיפוש</p>
          <SearchField id="site-search" value={q} onChange={setQuery} onSubmit={submit} />
          <div className="mt-4">
            <CategoryPills
              value={cat}
              counts={counts}
              onChange={(next) =>
                void navigate({ search: (prev) => ({ ...prev, cat: next }) })
              }
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        {q.trim() ? (
          hits.length ? (
            <>
              <p className="mb-4 text-sm text-muted">
                <span className="tabular-nums font-medium text-navy">{hits.length}</span> תוצאות
                עבור «{q}»
              </p>
              <div className="flex flex-col gap-3">
                {hits.map((hit) => (
                  <ResultCard key={hit.doc.id} hit={hit} query={q} />
                ))}
              </div>
            </>
          ) : (
            <Empty q={q} onPick={(next) => setQuery(next)} />
          )
        ) : (
          <Idle onPick={(next) => setQuery(next)} />
        )}
      </div>
    </SiteShell>
  );
}

function Idle({ onPick }: { onPick: (q: string) => void }) {
  return (
    <div>
      <h1 className="font-display text-3xl text-navy">מה תרצו למצוא?</h1>
      <p className="mt-2 text-muted">הקלידו בשורת החיפוש או בחרו נושא נפוץ.</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {POPULAR_QUERIES.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => onPick(q)}
            className="h-9 rounded-full border border-border bg-paper px-3.5 text-sm hover:border-brass"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}

function Empty({ q, onPick }: { q: string; onPick: (q: string) => void }) {
  return (
    <div className="py-8 text-center">
      <h1 className="font-display text-3xl text-navy">אין תוצאות ל«{q}»</h1>
      <p className="mx-auto mt-3 max-w-md text-muted">
        נסו מילה כללית יותר — למשל «תמ״א 38», «פינוי בינוי» או שם עיר.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {POPULAR_QUERIES.slice(0, 5).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => onPick(item)}
            className="h-9 rounded-full border border-border px-3.5 text-sm hover:border-brass"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
