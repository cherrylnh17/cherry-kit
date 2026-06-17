import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer
      className="border-t py-12"
      style={{ borderColor: "var(--border)", background: "var(--card)" }}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold" style={{ color: "var(--foreground)" }}>
            {siteConfig.name}
          </p>
          <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
            Handcrafted furniture for modern living.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-5 text-sm" style={{ color: "var(--muted)" }}>
          {siteConfig.footerLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:opacity-70"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl px-6">
        <p className="text-xs" style={{ color: "var(--muted)" }}>
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
