import { i as __toESM } from "../_runtime.mjs";
import { b as require_jsx_runtime, v as useNavigate, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as Landmark, d as Calculator, f as Building2, i as Scale, p as ArrowUpLeft } from "../_libs/lucide-react.mjs";
import { a as SiteShell, c as searchDocs, i as SearchField, n as POPULAR_QUERIES, r as ResultCard, s as pushRecent, t as CATALOG } from "./site-shell-aoALjqXh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-kfYAzT8V.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const navigate = useNavigate();
	const [query, setQuery] = (0, import_react.useState)("");
	const preview = (0, import_react.useMemo)(() => query.trim().length >= 2 ? searchDocs(CATALOG, query).slice(0, 5) : [], [query]);
	function go(q = query) {
		const next = q.trim();
		if (!next) return;
		pushRecent(next);
		navigate({
			to: "/search",
			search: {
				q: next,
				cat: "all"
			}
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative overflow-hidden bg-navy text-cream",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 opacity-40 [background:radial-gradient(720px_circle_at_80%_-10%,#c4a35a22,transparent_55%)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-6 flex items-center gap-2 text-brass",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scale, {
							className: "size-4",
							strokeWidth: 1.75
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs tracking-[0.18em]",
							children: "ZIV COHEN LAW"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl leading-tight sm:text-5xl",
						children: "חיפוש באתר המשרד"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-xl text-base leading-relaxed text-cream/75 sm:text-lg",
						children: "מצאו במהירות פרויקטים, מאמרים, מחשבונים ותחומי התמחות — תמ״א 38, פינוי-בינוי, מיסוי מקרקעין וליווי בעלי דירות."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchField, {
							value: query,
							onChange: setQuery,
							onSubmit: () => go(),
							autoFocus: true
						})
					}),
					preview.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-col gap-2",
						children: [preview.map((hit) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultCard, {
							hit,
							query,
							compact: true
						}, hit.doc.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => go(),
							className: "h-11 text-sm text-brass hover:text-cream",
							children: "הצגת כל התוצאות"
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5 flex flex-wrap gap-2",
						children: POPULAR_QUERIES.slice(0, 7).map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => go(q),
							className: "h-9 rounded-full border border-navy-soft bg-navy-mid px-3.5 text-sm text-cream/85 hover:border-brass/50 hover:text-cream",
							children: q
						}, q))
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto grid max-w-6xl gap-4 px-4 py-12 sm:grid-cols-3 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickCard, {
					icon: Landmark,
					title: "תחומי התמחות",
					body: "תמ״א 38, פינוי-בינוי, נדל״ן, מיסוי מקרקעין וליטיגציה.",
					href: "https://www.zivcohenlaw.com/תחומי-התמחות"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickCard, {
					icon: Building2,
					title: "פרויקטים נבחרים",
					body: "עשרות פרויקטים בתל אביב, רעננה, כפר סבא, גבעתיים ועוד.",
					href: "https://www.zivcohenlaw.com/items"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickCard, {
					icon: Calculator,
					title: "מחשבונים חינמיים",
					body: "בדיקת זכאות להתחדשות עירונית ופטור ממס שבח — בלי התחייבות.",
					href: "https://www.zivcohenlaw.com/general-9"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-6xl px-4 pb-16 sm:px-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-paper p-6 sm:p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tracking-[0.16em] text-brass-deep",
						children: "לא חותמים בלי עורך דין"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-3xl text-navy",
						children: "פגישת ייעוץ ראשונית"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-2xl text-muted",
						children: "המשרד ברעננה מלווה בעלי דירות ונציגויות מההתארגנות הראשונה ועד רישום הבית המשותף. מומלץ על ידי מינהלות התחדשות עירונית ברמת גן, פתח תקווה ולוד."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "tel:035664244",
							className: "inline-flex h-11 items-center rounded-md bg-navy px-5 text-sm text-cream hover:bg-navy-mid",
							children: "03-5664244"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "https://wa.me/972503682996",
							target: "_blank",
							rel: "noopener noreferrer",
							className: "inline-flex h-11 items-center rounded-md border border-border px-5 text-sm text-navy hover:border-brass",
							children: "וואטסאפ"
						})]
					})
				]
			})
		})
	] });
}
function QuickCard({ icon: Icon, title, body, href }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
		href,
		target: "_blank",
		rel: "noopener noreferrer",
		className: "group rounded-xl border border-border bg-paper p-5 transition-colors hover:border-brass/50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex size-10 items-center justify-center rounded-md bg-navy text-brass",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					className: "size-4",
					strokeWidth: 1.75
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl text-navy",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpLeft, { className: "size-4 text-subtle group-hover:text-brass-deep" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-relaxed text-muted",
				children: body
			})
		]
	});
}
//#endregion
export { Home as component };
