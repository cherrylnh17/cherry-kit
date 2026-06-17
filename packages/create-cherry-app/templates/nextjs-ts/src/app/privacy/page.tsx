import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Privacy Policy - ${siteConfig.name}`,
  description: "How we collect, use, and protect your information.",
};

const sections = [
  {
    title: "1. Information We Collect",
    body: "We may collect information you provide directly to us, such as your name and email address, as well as usage data collected automatically when you interact with our services.",
  },
  {
    title: "2. How We Use Your Information",
    body: "We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to comply with legal obligations.",
  },
  {
    title: "3. Sharing of Information",
    body: "We do not sell your personal information. We may share information with service providers who process data on our behalf, or when required by law.",
  },
  {
    title: "4. Data Security",
    body: "We take reasonable measures to protect your information from unauthorized access, loss, misuse, or alteration.",
  },
  {
    title: "5. Your Rights",
    body: "You may request access to, correction of, or deletion of your personal information by contacting us.",
  },
  {
    title: "6. Changes to This Policy",
    body: "We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.",
  },
];

export default function PrivacyPage() {
  return (
    <PageShell
      title="Privacy Policy"
      description="This is a sample policy. Replace it with your own terms before going live."
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
