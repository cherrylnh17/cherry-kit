import { Truck, Shield, Leaf } from "lucide-react";

const features = [
  {
    title: "Free Delivery",
    description: "Complimentary white-glove delivery on every order, nationwide.",
    icon: Truck,
  },
  {
    title: "5-Year Warranty",
    description: "Each piece is backed by our quality promise — built to endure daily life.",
    icon: Shield,
  },
  {
    title: "Sustainable Materials",
    description: "Responsibly sourced wood and eco-friendly finishes in every product.",
    icon: Leaf,
  },
];

export function FeatureSection() {
  return (
    <section
      id="about"
      className="border-y py-28"
      style={{ borderColor: "var(--border)", background: "var(--card)" }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <p
            className="text-sm font-semibold uppercase tracking-widest"
            style={{ color: "var(--accent)" }}
          >
            Why Choose Us
          </p>
          <h2
            className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl"
            style={{ color: "var(--foreground)" }}
          >
            Craftsmanship you can feel.
          </h2>
          <p className="mt-4 text-base leading-7" style={{ color: "var(--muted)" }}>
            We believe great furniture combines beauty, durability, and
            responsibility.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="rounded-3xl border p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                style={{ borderColor: "var(--border)", background: "var(--background)" }}
              >
                <div
                  className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl text-white"
                  style={{ background: "var(--accent)" }}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold" style={{ color: "var(--foreground)" }}>
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
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
