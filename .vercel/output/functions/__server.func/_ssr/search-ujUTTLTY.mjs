import { i as __toESM } from "../_runtime.mjs";
import { n as CATEGORY_ORDER, t as CATEGORY_LABELS } from "./types-BrC8nsK-.mjs";
import { b as require_jsx_runtime, v as useNavigate, z as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Route } from "./router-COVAT01d.mjs";
import { a as SiteShell, c as searchDocs, i as SearchField, n as POPULAR_QUERIES, o as cn, r as ResultCard, s as pushRecent, t as CATALOG } from "./site-shell-aoALjqXh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/search-ujUTTLTY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CategoryPills({ value, onChange, counts }) {
	const items = ["all", ...CATEGORY_ORDER];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-wrap gap-2",
		role: "tablist",
		"aria-label": "סינון לפי סוג",
		children: items.map((key) => {
			const label = key === "all" ? "הכל" : CATEGORY_LABELS[key];
			const count = counts?.[key];
			const selected = value === key;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				role: "tab",
				"aria-selected": selected,
				onClick: () => onChange(key),
				className: cn("h-9 rounded-full border px-3.5 text-sm transition-colors duration-(--motion-quick)", selected ? "border-navy bg-navy text-cream" : "border-border bg-paper text-muted hover:border-navy/40 hover:text-ink"),
				children: [label, typeof count === "number" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ms-1.5 tabular-nums opacity-70",
					children: count
				}) : null]
			}, key);
		})
	});
}
function SearchPage() {
	const { q, cat } = Route.useSearch();
	const navigate = useNavigate({ from: "/search" });
	const hits = (0, import_react.useMemo)(() => q.trim() ? searchDocs(CATALOG, q, cat) : [], [q, cat]);
	const allHits = (0, import_react.useMemo)(() => q.trim() ? searchDocs(CATALOG, q, "all") : [], [q]);
	const counts = (0, import_react.useMemo)(() => {
		const next = { all: allHits.length };
		for (const h of allHits) next[h.doc.category] = (next[h.doc.category] ?? 0) + 1;
		return next;
	}, [allHits]);
	function setQuery(next) {
		navigate({
			search: (prev) => ({
				...prev,
				q: next
			}),
			replace: true
		});
	}
	function submit() {
		if (q.trim()) pushRecent(q);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SiteShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "border-b border-border bg-paper",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-3 text-xs tracking-[0.16em] text-brass-deep",
					children: "תוצאות חיפוש"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchField, {
					value: q,
					onChange: setQuery,
					onSubmit: submit
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryPills, {
						value: cat,
						counts,
						onChange: (next) => void navigate({ search: (prev) => ({
							...prev,
							cat: next
						}) })
					})
				})
			]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-3xl px-4 py-8 sm:px-6",
		children: q.trim() ? hits.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mb-4 text-sm text-muted",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "tabular-nums font-medium text-navy",
					children: hits.length
				}),
				" תוצאות עבור «",
				q,
				"»"
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-col gap-3",
			children: hits.map((hit) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultCard, {
				hit,
				query: q
			}, hit.doc.id))
		})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
			q,
			onPick: (next) => setQuery(next)
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Idle, { onPick: (next) => setQuery(next) })
	})] });
}
function Idle({ onPick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl text-navy",
			children: "מה תרצו למצוא?"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-muted",
			children: "הקלידו בשורת החיפוש או בחרו נושא נפוץ."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5 flex flex-wrap gap-2",
			children: POPULAR_QUERIES.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => onPick(q),
				className: "h-9 rounded-full border border-border bg-paper px-3.5 text-sm hover:border-brass",
				children: q
			}, q))
		})
	] });
}
function Empty({ q, onPick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "py-8 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "font-display text-3xl text-navy",
				children: [
					"אין תוצאות ל«",
					q,
					"»"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mx-auto mt-3 max-w-md text-muted",
				children: "נסו מילה כללית יותר — למשל «תמ״א 38», «פינוי בינוי» או שם עיר."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 flex flex-wrap justify-center gap-2",
				children: POPULAR_QUERIES.slice(0, 5).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => onPick(item),
					className: "h-9 rounded-full border border-border px-3.5 text-sm hover:border-brass",
					children: item
				}, item))
			})
		]
	});
}
//#endregion
export { SearchPage as component };
