"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { siteConfig } from "@/config/site";

const HeroScene = dynamic(
  () => import("@/components/hero-scene").then((m) => m.HeroScene),
  { ssr: false }
);

export function HeroSection() {
  return (
    <section className="relative overflow-hidden" style={{ background: "var(--background)" }}>
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-8 px-6 py-20 lg:grid-cols-2">
        <div className="animate-fade-in z-10">
          <p
            className="mb-4 text-sm font-semibold uppercase tracking-widest"
            style={{ color: "var(--accent)" }}
          >
            {siteConfig.tagline}
          </p>

          <h1
            className="max-w-xl text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
            style={{ color: "var(--foreground)" }}
          >
            Timeless design,{" "}
            <span style={{ color: "var(--accent)" }}>modern craft.</span>
          </h1>

          <p
            className="mt-6 max-w-lg text-lg leading-relaxed"
            style={{ color: "var(--muted)" }}
          >
            {siteConfig.description}
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="#collection"
              className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition hover:opacity-90"
              style={{ background: "var(--foreground)" }}
            >
              Explore Collection
              <ArrowDown className="h-4 w-4" />
            </Link>

            <Link
              href="#about"
              className="inline-flex items-center justify-center rounded-full border px-7 py-3.5 text-sm font-semibold transition hover:bg-stone-50"
              style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
            >
              Our Story
            </Link>
          </div>
        </div>

        <div className="relative h-[420px] w-full animate-fade-in delay-200 lg:h-[520px]">
          <HeroScene />
        </div>
      </div>
    </section>
  );
}
