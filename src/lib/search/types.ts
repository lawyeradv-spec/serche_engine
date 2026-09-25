export type Category =
  | "page"
  | "practice"
  | "project"
  | "article"
  | "tool"
  | "faq";

export const CATEGORY_ORDER: Category[] = [
  "practice",
  "project",
  "article",
  "tool",
  "faq",
  "page",
];

export const CATEGORY_LABELS: Record<Category, string> = {
  page: "דפים",
  practice: "תחומי התמחות",
  project: "פרויקטים",
  article: "מאמרים",
  tool: "מחשבונים",
  faq: "שאלות נפוצות",
};

export type SearchDoc = {
  id: string;
  title: string;
  subtitle?: string;
  body: string;
  category: Category;
  tags: string[];
  url: string;
  city?: string;
};

export type SearchHit = {
  doc: SearchDoc;
  score: number;
  snippet: string;
  titleHighlights: string;
};
