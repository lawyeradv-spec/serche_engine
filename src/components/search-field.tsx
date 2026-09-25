import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function SearchField({
  value,
  onChange,
  onSubmit,
  autoFocus,
  size = "lg",
  placeholder = "חיפוש באתר — תמ״א 38, פינוי בינוי, מס שבח…",
  id,
}: {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  autoFocus?: boolean;
  size?: "lg" | "md";
  placeholder?: string;
  id?: string;
}) {
  const large = size === "lg";
  return (
    <form
      className="relative w-full"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
      }}
    >
      <Search
        className={cn(
          "pointer-events-none absolute top-1/2 -translate-y-1/2 text-subtle start-4",
          large ? "size-5" : "size-4",
        )}
        strokeWidth={1.75}
      />
      <input
        id={id}
        type="text"
        inputMode="search"
        dir="rtl"
        value={value}
        autoFocus={autoFocus}
        autoComplete="off"
        spellCheck={false}
        enterKeyHint="search"
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full appearance-none border bg-paper text-ink shadow-sm outline-none transition-[border-color,box-shadow] duration-(--motion-fast) ease-(--ease-out) placeholder:text-subtle",
          "focus:border-brass focus:ring-2 focus:ring-brass/30",
          large
            ? "h-16 rounded-xl ps-12 pe-12 text-lg"
            : "h-12 rounded-lg ps-11 pe-11 text-base",
        )}
      />
      {value ? (
        <button
          type="button"
          aria-label="נקה חיפוש"
          onClick={() => onChange("")}
          className={cn(
            "absolute top-1/2 flex -translate-y-1/2 items-center justify-center rounded-sm text-subtle hover:text-ink end-2",
            large ? "size-10" : "size-8",
          )}
        >
          <X className="size-4" />
        </button>
      ) : null}
    </form>
  );
}
