"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useCart } from "@/lib/cart-store";

export function Navbar() {
  const items = useCart((s) => s.items);
  const openCart = useCart((s) => s.openCart);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <header className="sticky top-0 z-50 border-b bg-white/70 backdrop-blur-xl"
      style={{ borderColor: "var(--border)" }}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight"
          style={{ color: "var(--foreground)" }}
        >
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {siteConfig.navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium transition-colors hover:opacity-70"
              style={{ color: "var(--muted)" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={openCart}
          className="relative flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-stone-100"
          aria-label="Open cart"
        >
          <ShoppingBag className="h-5 w-5" style={{ color: "var(--foreground)" }} />
          {count > 0 && (
            <span
              className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white"
              style={{ background: "var(--accent)" }}
            >
              {count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
