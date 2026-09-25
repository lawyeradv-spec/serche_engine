import { Link } from "@tanstack/react-router";
import { Menu, Phone, Search, X } from "lucide-react";
import { useState } from "react";
import { SearchDialog, ShortcutHint, useSearchHotkey } from "@/components/search-dialog";
import { cn } from "@/lib/utils";

const NAV: Array<{ to: "/"; label: string } | { to: "/search"; label: string; search: { q: string; cat: "all" } }> = [
  { to: "/", label: "חיפוש" },
  { to: "/search", label: "כל התוצאות", search: { q: "", cat: "all" } },
];

export function SiteHeader({ embed = false }: { embed?: boolean }) {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  useSearchHotkey(() => setOpen(true));

  if (embed) return <SearchDialog open={open} onOpenChange={setOpen} />;

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-navy-soft/40 bg-navy text-cream">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:h-[4.5rem] sm:px-6">
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <img
              src="/brand/logo-lg.jpg"
              alt="עו״ד אברהם זיו כהן"
              width={44}
              height={44}
              className="size-10 rounded-full border border-brass/40 object-cover sm:size-11"
            />
            <span className="min-w-0">
              <span className="block truncate font-display text-base leading-tight sm:text-lg">
                עו״ד אברהם זיו כהן
              </span>
              <span className="hidden text-[11px] tracking-wide text-brass sm:block">
                חיפוש באתר · התחדשות עירונית
              </span>
            </span>
          </Link>

          <div className="ms-auto flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="flex h-11 items-center gap-2 rounded-md border border-navy-soft bg-navy-mid px-3 text-sm text-cream/90 hover:border-brass/50 hover:text-cream"
            >
              <Search className="size-4" />
              <span className="hidden sm:inline">חיפוש</span>
              <ShortcutHint />
            </button>
            <a
              href="tel:035664244"
              className="flex size-11 items-center justify-center rounded-md text-brass hover:bg-navy-mid"
              aria-label="התקשרו למשרד"
            >
              <Phone className="size-4" />
            </a>
            <button
              type="button"
              className="flex size-11 items-center justify-center rounded-md hover:bg-navy-mid sm:hidden"
              aria-label={menu ? "סגור תפריט" : "פתח תפריט"}
              onClick={() => setMenu((v) => !v)}
            >
              {menu ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        <nav className="mx-auto hidden max-w-6xl items-center gap-6 px-6 pb-3 text-sm text-cream/80 sm:flex">
              {NAV.map((item) =>
                item.to === "/search" ? (
                  <Link
                    key={item.label}
                    to="/search"
                    search={item.search}
                    className="hover:text-brass"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <Link key={item.label} to="/" className="hover:text-brass">
                    {item.label}
                  </Link>
                ),
              )}
          <a href="https://www.zivcohenlaw.com/" className="hover:text-brass">
            האתר המלא
          </a>
          <a href="https://www.zivcohenlaw.com/items" className="hover:text-brass">
            פרויקטים
          </a>
          <a href="https://www.zivcohenlaw.com/בלוג" className="hover:text-brass">
            בלוג
          </a>
          <a href="https://www.zivcohenlaw.com/צור-קשר" className="hover:text-brass">
            צור קשר
          </a>
        </nav>
        {menu ? (
          <div className="border-t border-navy-soft px-4 py-3 sm:hidden">
            <div className="flex flex-col gap-1">
              {NAV.map((item) =>
                item.to === "/search" ? (
                  <Link
                    key={item.label}
                    to="/search"
                    search={item.search}
                    className="flex h-11 items-center rounded-md px-2 hover:bg-navy-mid"
                    onClick={() => setMenu(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <Link
                    key={item.label}
                    to="/"
                    className="flex h-11 items-center rounded-md px-2 hover:bg-navy-mid"
                    onClick={() => setMenu(false)}
                  >
                    {item.label}
                  </Link>
                ),
              )}
              <a
                href="https://www.zivcohenlaw.com/"
                className="flex h-11 items-center rounded-md px-2 hover:bg-navy-mid"
              >
                האתר המלא
              </a>
            </div>
          </div>
        ) : null}
      </header>
      <SearchDialog open={open} onOpenChange={setOpen} />
    </>
  );
}

export function HeaderSpacer({ className }: { className?: string }) {
  return <div className={cn("h-16 sm:h-[4.5rem]", className)} />;
}
