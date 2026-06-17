import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Terms of Service - ${siteConfig.name}`,
  description: "The terms and conditions for using our services.",
};

const sections = [
  {
    title: "1. Acceptance of Terms",
    body: "By accessing or using our services, you agree to be bound by these Terms of Service. If you do not agree, please do not use the services.",
  },
  {
    title: "2. Use of Services",
    body: "You agree to use the services only for lawful purposes and in accordance with these terms. You are responsible for any activity that occurs under your account.",
  },
  {
    title: "3. Intellectual Property",
    body: "All content, trademarks, and materials provided through the services are owned by us or our licensors and are protected by applicable laws.",
  },
  {
    title: "4. Payments and Refunds",
    body: "If you purchase a paid plan, you agree to pay all applicable fees. Refund eligibility is described at the point of purchase.",
  },
  {
    title: "5. Limitation of Liability",
    body: "The services are provided on an \"as is\" basis. To the maximum extent permitted by law, we are not liable for any indirect or consequential damages.",
  },
  {
    title: "6. Changes to These Terms",
    body: "We may revise these Terms of Service at any time. Continued use of the services after changes constitutes acceptance of the updated terms.",
  },
];

export default function TermsPage() {
  return (
    <PageShell
      title="Terms of Service"
      description="These are sample terms. Replace them with your own before going live."
    >
      <div className="space-y-8">
        {sections.map((section) => (
          <div key={section.title}>
            <h2 className="text-lg font-semibold text-slate-950">
              {section.title}
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-600">
              {section.body}
            </p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
