import type { CartItem } from "@/lib/cart-store";
import { formatCurrency } from "@/lib/utils";

export function buildWhatsappCheckoutUrl(items: CartItem[]) {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

  const lines = items.map(
    (item) =>
      `• ${item.name} x${item.quantity} — ${formatCurrency(
        item.price * item.quantity
      )}`
  );

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const message = [
    "Hi! I'd like to order the following items:",
    "",
    ...lines,
    "",
    `Total: ${formatCurrency(total)}`,
  ].join("\n");

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
