import { Code2, LayoutDashboard, Rocket } from "lucide-react";

const features = [
  {
    title: "Next.js App Router",
    description:
      "Built with the modern App Router structure, ready for scalable pages and layouts.",
    icon: LayoutDashboard,
  },
  {
    title: "TypeScript Ready",
    description:
      "Configured with TypeScript and path aliases so your codebase stays clean.",
    icon: Code2,
  },
  {
    title: "Fast to Customize",
    description:
      "Simple landing page components that are easy to edit, extend, or replace.",
    icon: Rocket,
  },
];

export function FeatureSection() {
  return (
    <section id="features" className="border-b border-slate-200 bg-white py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Features
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Everything you need to start clean.
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600">
            This starter keeps the structure simple, readable, and ready for
            real projects.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="text-lg font-semibold text-slate-950">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}