import type { SearchDoc } from "../types";
import { pages } from "./pages";
import { practices } from "./practices";
import { projects } from "./projects";
import { tools } from "./tools";
import { faqs } from "./faqs";
import { articles } from "./articles";

export const CATALOG: SearchDoc[] = [
  ...practices,
  ...tools,
  ...faqs,
  ...projects,
  ...pages,
  ...articles,
];

export function getDocById(id: string): SearchDoc | undefined {
  return CATALOG.find((d) => d.id === id);
}
