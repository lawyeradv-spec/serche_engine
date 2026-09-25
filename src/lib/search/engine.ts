import { CATEGORY_ORDER, type Category, type SearchDoc, type SearchHit } from "./types";
import { compact, expandToken, normalize, tokens } from "./normalize";

type IndexedDoc = SearchDoc & {
  titleN: string;
  titleC: string;
  bodyN: string;
  bodyC: string;
  tagsN: string;
  hayN: string;
  hayC: string;
};

let cache: IndexedDoc[] | null = null;

function indexDocs(docs: SearchDoc[]): IndexedDoc[] {
  return docs.map((doc) => {
    const titleN = normalize(doc.title);
    const bodyN = normalize(`${doc.subtitle ?? ""} ${doc.body}`);
    const tagsN = normalize(doc.tags.join(" "));
    const hayN = `${titleN} ${bodyN} ${tagsN} ${normalize(doc.city ?? "")}`;
    return {
      ...doc,
      titleN,
      titleC: compact(doc.title),
      bodyN,
      bodyC: compact(`${doc.subtitle ?? ""} ${doc.body}`),
      tagsN,
      hayN,
      hayC: compact(hayN),
    };
  });
}

function snippetAround(text: string, query: string, radius = 86): string {
  const n = text;
  const q = query.trim();
  if (!q) return n.slice(0, radius * 2);
  const idx = n.toLowerCase().indexOf(q.toLowerCase());
  if (idx < 0) {
    const first = q.split(" ")[0] ?? q;
    const i2 = n.toLowerCase().indexOf(first.toLowerCase());
    if (i2 < 0) return n.slice(0, radius * 2);
    const start = Math.max(0, i2 - radius);
    const end = Math.min(n.length, i2 + first.length + radius);
    return `${start > 0 ? "…" : ""}${n.slice(start, end)}${end < n.length ? "…" : ""}`;
  }
  const start = Math.max(0, idx - radius);
  const end = Math.min(n.length, idx + q.length + radius);
  return `${start > 0 ? "…" : ""}${n.slice(start, end)}${end < n.length ? "…" : ""}`;
}

export function highlight(text: string, query: string): string {
  const toks = tokens(query).filter((t) => t.length >= 2);
  if (!toks.length) return text;
  const pattern = toks
    .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");
  try {
    const re = new RegExp(`(${pattern})`, "gi");
    return text.replace(re, "«$1»");
  } catch {
    return text;
  }
}

function tokenScore(doc: IndexedDoc, token: string): number {
  const expanded = expandToken(token);
  let best = 0;
  for (const t of expanded) {
    if (!t) continue;
    if (doc.titleN === t || doc.titleC === t) best = Math.max(best, 120);
    else if (doc.titleN.startsWith(t) || doc.titleC.startsWith(t)) best = Math.max(best, 90);
    else if (doc.titleN.includes(t) || doc.titleC.includes(t)) best = Math.max(best, 70);
    else if (doc.tagsN.includes(t)) best = Math.max(best, 48);
    else if (doc.bodyN.includes(t) || doc.bodyC.includes(t)) best = Math.max(best, 22);
    else if (doc.hayN.includes(t) || doc.hayC.includes(t)) best = Math.max(best, 12);
  }
  return best;
}

export function searchDocs(
  docs: SearchDoc[],
  query: string,
  category: Category | "all" = "all",
): SearchHit[] {
  if (!cache || cache.length !== docs.length) cache = indexDocs(docs);
  const q = normalize(query);
  if (!q) return [];
  const toks = tokens(query);
  if (!toks.length) return [];

  const pool =
    category === "all" ? cache : cache.filter((d) => d.category === category);

  const hits: SearchHit[] = [];
  for (const doc of pool) {
    let score = 0;
    let matched = 0;
    for (const t of toks) {
      const s = tokenScore(doc, t);
      if (s > 0) {
        matched += 1;
        score += s;
      }
    }
    if (matched === 0) continue;
    if (matched < toks.length) score *= 0.35;
    if (doc.titleN.includes(q)) score += 40;
    if (doc.titleC.includes(q.replace(/\s+/g, ""))) score += 55;
    if (doc.hayC.includes(q.replace(/\s+/g, ""))) score += 18;
    score += (CATEGORY_ORDER.length - CATEGORY_ORDER.indexOf(doc.category)) * 0.4;
    const snippetSource = doc.subtitle ? `${doc.subtitle}. ${doc.body}` : doc.body;
    hits.push({
      doc,
      score,
      snippet: snippetAround(snippetSource, toks[0] ?? q),
      titleHighlights: highlight(doc.title, query),
    });
  }

  hits.sort((a, b) => b.score - a.score || a.doc.title.localeCompare(b.doc.title, "he"));
  return hits;
}

export const POPULAR_QUERIES = [
  "תמ״א 38",
  "פינוי בינוי",
  "מס שבח",
  "דייר סרבן",
  "היטל השבחה",
  "חלופת שקד",
  "רעננה",
  "הסכם משולש",
  "מחשבון זכאות",
  "עורך דין דיירים",
];
