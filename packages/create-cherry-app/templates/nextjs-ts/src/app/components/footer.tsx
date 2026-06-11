import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer id="about" className="bg-white py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold text-slate-950">{siteConfig.name}</p>
          <p className="mt-1 text-sm text-slate-500">
            Generated with create-cherry-app.
          </p>
        </div>

        <div className="flex items-center gap-4 text-sm text-slate-500">
          <Link href="#features" className="transition hover:text-slate-950">
            Features
          </Link>
          <Link href="#get-started" className="transition hover:text-slate-950">
            Get Started
          </Link>
        </div>
      </div>
    </footer>
  );
}