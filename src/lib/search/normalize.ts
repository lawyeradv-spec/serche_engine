const SYNONYMS: Record<string, string[]> = {
  תמא: ["תמא", "תמ א", "tama", "tama38"],
  "38": ["38", "תמא", "tama"],
  פינוי: ["פינוי", "פינויבינוי", "pinui", "pinuibinui"],
  בינוי: ["בינוי", "פינויבינוי", "binui", "pinuibinui"],
  שבח: ["שבח", "מסשבח", "capitalgains"],
  היטל: ["היטל", "היטלהשבחה", "betterment"],
  סרבן: ["סרבן", "דיירסרבן", "מתנגד"],
  שקד: ["שקד", "חלופתשקד", "תיקון139", "139"],
  קומבינציה: ["קומבינציה", "combination"],
  רעננה: ["רעננה", "raanana"],
  "תל אביב": ["תלאביב", "תל אביב", "telaviv"],
  מחשבון: ["מחשבון", "calculator", "בדיקה", "זכאות"],
  ליווי: ["ליווי", "ייצוג", "עורךדין"],
  דיירים: ["דיירים", "בעלידירות", "נציגות"],
};

export function normalize(input: string): string {
  return input
    .toLowerCase()
    .replace(/[\u05f3\u05f4'"׳״`]/g, "")
    .replace(/[־–—−]/g, " ")
    .replace(/[^\u0590-\u05ffa-z0-9\s]/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function compact(input: string): string {
  return normalize(input).replace(/\s+/g, "");
}

export function tokens(input: string): string[] {
  const n = normalize(input);
  if (!n) return [];
  return n.split(" ").filter((t) => t.length >= 1);
}

export function expandToken(token: string): string[] {
  const set = new Set<string>([token, compact(token)]);
  for (const [key, values] of Object.entries(SYNONYMS)) {
    if (token === key || values.includes(token) || compact(token) === compact(key)) {
      for (const v of [key, ...values]) {
        set.add(normalize(v));
        set.add(compact(v));
      }
    }
  }
  return [...set].filter(Boolean);
}
