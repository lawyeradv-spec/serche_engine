import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function SiteShell({
  children,
  embed = false,
}: {
  children: ReactNode;
  embed?: boolean;
}) {
  return (
    <div className="flex min-h-dvh flex-col bg-cream text-ink">
      <SiteHeader embed={embed} />
      <main className="flex-1">{children}</main>
      <SiteFooter embed={embed} />
    </div>
  );
}
