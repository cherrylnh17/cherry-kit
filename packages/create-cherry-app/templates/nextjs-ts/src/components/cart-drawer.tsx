"use client";

import { X, Plus, Minus, Trash2, MessageCircle } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { formatCurrency } from "@/lib/utils";
import { buildWhatsappCheckoutUrl } from "@/lib/whatsapp";

export function CartDrawer() {
  const { items, isOpen, closeCart, increment, decrement, removeItem, clear } =
    useCart();
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
        onClick={closeCart}
      />

      {/* Drawer */}
      <aside className="animate-slide-in-right fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        {/* Header */}
        <div
          className="flex items-center justify-between border-b px-6 py-4"
          style={{ borderColor: "var(--border)" }}
        >
          <h2 className="text-lg font-bold">Shopping Cart</h2>
          <button
            onClick={closeCart}
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-stone-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
              <p className="text-sm" style={{ color: "var(--muted)" }}>
                Your cart is empty.
              </p>
            </div>
          ) : (
            <ul className="space-y-5">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-4 rounded-2xl border p-3"
                  style={{ borderColor: "var(--border)" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-20 w-20 rounded-xl object-cover"
                  />
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <p className="text-sm font-semibold leading-tight">
                        {item.name}
                      </p>
                      <p
                        className="mt-0.5 text-xs"
                        style={{ color: "var(--muted)" }}
                      >
                        {formatCurrency(item.price)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decrement(item.id)}
                        className="flex h-7 w-7 items-center justify-center rounded-lg border hover:bg-stone-100"
                        style={{ borderColor: "var(--border)" }}
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-6 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increment(item.id)}
                        className="flex h-7 w-7 items-center justify-center rounded-lg border hover:bg-stone-100"
                        style={{ borderColor: "var(--border)" }}
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-auto flex h-7 w-7 items-center justify-center rounded-lg text-red-500 hover:bg-red-50"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div
            className="border-t px-6 py-5 space-y-4"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium" style={{ color: "var(--muted)" }}>
                Total
              </span>
              <span className="text-lg font-bold">{formatCurrency(total)}</span>
            </div>

            <a
              href={buildWhatsappCheckoutUrl(items)}
              target="_blank"
              rel="noreferrer"
              onClick={() => {
                clear();
                closeCart();
              }}
              className="flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold text-white transition hover:opacity-90"
              style={{ background: "#25D366" }}
            >
              <MessageCircle className="h-4 w-4" />
              Checkout via WhatsApp
            </a>

            <button
              onClick={clear}
              className="w-full text-center text-xs font-medium transition hover:opacity-70"
              style={{ color: "var(--muted)" }}
            >
              Clear cart
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
