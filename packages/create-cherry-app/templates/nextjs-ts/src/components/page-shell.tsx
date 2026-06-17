import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CartDrawer } from "@/components/cart-drawer";

export function PageShell({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <section
        className="border-b py-16"
        style={{ borderColor: "var(--border)", background: "var(--card)" }}
      >
        <div className="mx-auto max-w-3xl px-6">
          <h1
            className="text-3xl font-bold tracking-tight sm:text-4xl"
            style={{ color: "var(--foreground)" }}
          >
            {title}
          </h1>
          {description && (
            <p
              className="mt-4 text-base leading-7"
              style={{ color: "var(--muted)" }}
            >
              {description}
            </p>
          )}
        </div>
      </section>

      <div
        className="mx-auto max-w-3xl px-6 py-16"
        style={{ background: "var(--background)" }}
      >
        {children}
      </div>

      <Footer />
      <CartDrawer />
    </>
  );
}