import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-12 px-4 py-20 lg:grid-cols-2">
        <div>
          <div className="mb-6 inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700">
            Generated with create-cherry-app
          </div>

          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Build your next web app faster with {siteConfig.name}.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            A clean Next.js starter with TypeScript, Tailwind CSS, reusable
            components, and a simple landing page structure ready to customize.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#get-started"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Start Building
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="#features"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              View Features
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-slate-300" />
                <span className="h-3 w-3 rounded-full bg-slate-300" />
                <span className="h-3 w-3 rounded-full bg-slate-300" />
              </div>

              <div className="space-y-4">
                <div className="h-8 w-3/4 rounded-lg bg-slate-200" />
                <div className="h-4 w-full rounded-lg bg-slate-100" />
                <div className="h-4 w-5/6 rounded-lg bg-slate-100" />
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="h-28 rounded-2xl bg-slate-100" />
                  <div className="h-28 rounded-2xl bg-slate-100" />
                </div>
                <div className="h-36 rounded-2xl bg-slate-100" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}