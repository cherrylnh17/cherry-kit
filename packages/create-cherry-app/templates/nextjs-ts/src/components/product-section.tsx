"use client";

import { ShoppingBag } from "lucide-react";
import { products } from "@/config/site";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/lib/cart-store";

export function ProductSection() {
  const addItem = useCart((s) => s.addItem);

  return (
    <section id="collection" className="py-28" style={{ background: "var(--background)" }}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl animate-fade-in">
          <p
            className="text-sm font-semibold uppercase tracking-widest"
            style={{ color: "var(--accent)" }}
          >
            Collection
          </p>
          <h2
            className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl"
            style={{ color: "var(--foreground)" }}
          >
            Handpicked pieces for every room.
          </h2>
          <p className="mt-4 text-base leading-7" style={{ color: "var(--muted)" }}>
            Browse our curated selection of furniture — each piece thoughtfully
            designed and built to last.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative flex flex-col overflow-hidden rounded-3xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={{ borderColor: "var(--border)", background: "var(--card)" }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {product.badge && (
                  <span
                    className="absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold text-white"
                    style={{ background: "var(--accent)" }}
                  >
                    {product.badge}
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col p-5">
                <p
                  className="text-xs font-medium uppercase tracking-wide"
                  style={{ color: "var(--accent)" }}
                >
                  {product.category}
                </p>
                <h3 className="mt-1 text-base font-semibold" style={{ color: "var(--foreground)" }}>
                  {product.name}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                  {product.description}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-bold" style={{ color: "var(--foreground)" }}>
                    {formatCurrency(product.price)}
                  </span>
                  <button
                    onClick={() => addItem(product)}
                    className="flex h-10 w-10 items-center justify-center rounded-full text-white transition hover:opacity-90"
                    style={{ background: "var(--foreground)" }}
                    aria-label={`Add ${product.name} to cart`}
                  >
                    <ShoppingBag className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
