import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `FAQ - ${siteConfig.name}`,
  description: "Frequently asked questions.",
};

const faqs = [
  {
    question: "What is this template?",
    answer:
      "A clean Next.js starter with TypeScript and Tailwind CSS, generated with create-cherry-app. It includes a landing page, product showcase, and legal pages.",
  },
  {
    question: "How do I edit the products shown on the landing page?",
    answer:
      "Update the products array in src/config/site.ts. Each item supports a name, description, price, and an optional badge.",
  },
  {
    question: "How do I change the navigation and footer links?",
    answer:
      "Edit navItems and footerLinks in src/config/site.ts. The navbar and footer render these automatically.",
  },
  {
    question: "Can I add more pages?",
    answer:
      "Yes. Create a new folder under src/app with a page.tsx file. You can reuse the PageShell component for a consistent layout.",
  },
  {
    question: "How do I deploy?",
    answer:
      "You can deploy to any platform that supports Next.js, such as Vercel. Run the build command and follow your provider's instructions.",
  },
];

export default function FaqPage() {
  return (
    <PageShell
      title="Frequently Asked Questions"
      description="Answers to common questions about this template."
    >
      <div className="space-y-8">
        {faqs.map((faq) => (
          <div key={faq.question} className="border-b border-slate-200 pb-6">
            <h2 className="text-lg font-semibold text-slate-950">
              {faq.question}
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-600">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
