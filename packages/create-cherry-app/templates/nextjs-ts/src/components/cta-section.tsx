import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="py-28" style={{ background: "var(--foreground)" }}>
      <div className="mx-auto max-w-7xl px-6">
        <div
          className="rounded-[2rem] border border-white/10 bg-white/5 p-10 text-center shadow-sm md:p-16"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Transform your space today.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-stone-400">
            Every piece in our collection is ready to ship. Browse, add to cart,
            and complete your order via WhatsApp — we&apos;ll handle the rest.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="#collection"
              className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold transition hover:opacity-90"
              style={{ background: "var(--accent)", color: "#fff" }}
            >
              Shop Now
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/faq"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
