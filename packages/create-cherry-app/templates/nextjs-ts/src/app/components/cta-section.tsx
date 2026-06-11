import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section id="get-started" className="bg-slate-950 py-24 text-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-sm md:p-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to customize your app?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-300">
            Edit the components, update the site config, and start building
            your product from a clean foundation.
          </p>

          <div className="mt-8">
            <Link
              href="https://nextjs.org/docs"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
            >
              Read Next.js Docs
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}