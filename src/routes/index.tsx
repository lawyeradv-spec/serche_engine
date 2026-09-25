import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowUpLeft,
  Building2,
  Calculator,
  Landmark,
  Scale,
} from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import { SearchField } from "@/components/search-field";
import { ResultCard } from "@/components/result-card";
import { CATALOG } from "@/lib/search/docs";
import { POPULAR_QUERIES, searchDocs } from "@/lib/search/engine";
import { pushRecent } from "@/lib/search/recent";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const preview = useMemo(
    () => (query.trim().length >= 2 ? searchDocs(CATALOG, query).slice(0, 5) : []),
    [query],
  );

  function go(q = query) {
    const next = q.trim();
    if (!next) return;
    pushRecent(next);
    void navigate({ to: "/search", search: { q: next, cat: "all" } });
  }

  return (
    <SiteShell>
      <section className="relative overflow-hidden bg-navy text-cream">
        <div className="pointer-events-none absolute inset-0 opacity-40 [background:radial-gradient(720px_circle_at_80%_-10%,#c4a35a22,transparent_55%)]" />
        <div className="relative mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="mb-6 flex items-center gap-2 text-brass">
            <Scale className="size-4" strokeWidth={1.75} />
            <span className="text-xs tracking-[0.18em]">ZIV COHEN LAW</span>
          </div>
          <h1 className="font-display text-4xl leading-tight sm:text-5xl">
            חיפוש באתר המשרד
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-cream/75 sm:text-lg">
            מצאו במהירות פרויקטים, מאמרים, מחשבונים ותחומי התמחות —
            תמ״א 38, פינוי-בינוי, מיסוי מקרקעין וליווי בעלי דירות.
          </p>
          <div className="mt-8">
            <SearchField
              id="site-search"
              value={query}
              onChange={setQuery}
              onSubmit={() => go()}
              autoFocus
            />
          </div>
          {preview.length ? (
            <div className="mt-4 flex flex-col gap-2">
              {preview.map((hit) => (
                <ResultCard key={hit.doc.id} hit={hit} query={query} compact />
              ))}
              <button
                type="button"
                onClick={() => go()}
                className="h-11 text-sm text-brass hover:text-cream"
              >
                הצגת כל התוצאות
              </button>
            </div>
          ) : (
            <div className="mt-5 flex flex-wrap gap-2">
              {POPULAR_QUERIES.slice(0, 7).map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => go(q)}
                  className="h-9 rounded-full border border-navy-soft bg-navy-mid px-3.5 text-sm text-cream/85 hover:border-brass/50 hover:text-cream"
                >
                  {q}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-4 py-12 sm:grid-cols-3 sm:px-6">
        <QuickCard
          icon={Landmark}
          title="תחומי התמחות"
          body="תמ״א 38, פינוי-בינוי, נדל״ן, מיסוי מקרקעין וליטיגציה."
          href="https://www.zivcohenlaw.com/תחומי-התמחות"
        />
        <QuickCard
          icon={Building2}
          title="פרויקטים נבחרים"
          body="עשרות פרויקטים בתל אביב, רעננה, כפר סבא, גבעתיים ועוד."
          href="https://www.zivcohenlaw.com/items"
        />
        <QuickCard
          icon={Calculator}
          title="מחשבונים חינמיים"
          body="בדיקת זכאות להתחדשות עירונית ופטור ממס שבח — בלי התחייבות."
          href="https://www.zivcohenlaw.com/general-9"
        />
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="rounded-xl border border-border bg-paper p-6 sm:p-8">
          <p className="text-xs tracking-[0.16em] text-brass-deep">לא חותמים בלי עורך דין</p>
          <h2 className="mt-2 font-display text-3xl text-navy">פגישת ייעוץ ראשונית</h2>
          <p className="mt-3 max-w-2xl text-muted">
            המשרד ברעננה מלווה בעלי דירות ונציגויות מההתארגנות הראשונה ועד רישום הבית
            המשותף. מומלץ על ידי מינהלות התחדשות עירונית ברמת גן, פתח תקווה ולוד.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="tel:035664244"
              className="inline-flex h-11 items-center rounded-md bg-navy px-5 text-sm text-cream hover:bg-navy-mid"
            >
              03-5664244
            </a>
            <a
              href="https://wa.me/972503682996"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center rounded-md border border-border px-5 text-sm text-navy hover:border-brass"
            >
              וואטסאפ
            </a>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

function QuickCard({
  icon: Icon,
  title,
  body,
  href,
}: {
  icon: typeof Landmark;
  title: string;
  body: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group rounded-xl border border-border bg-paper p-5 transition-colors hover:border-brass/50"
    >
      <div className="flex size-10 items-center justify-center rounded-md bg-navy text-brass">
        <Icon className="size-4" strokeWidth={1.75} />
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <h2 className="font-display text-xl text-navy">{title}</h2>
        <ArrowUpLeft className="size-4 text-subtle group-hover:text-brass-deep" />
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
    </a>
  );
}
