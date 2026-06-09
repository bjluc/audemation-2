import { ComingSoon, comingSoonMetadata } from "@/components/layout/coming-soon";

export const metadata = comingSoonMetadata(
  "Automations",
  "Once your site is live, here's what we can bolt on. These run while you sleep — and they pay for the site within a few months."
);

export default function AutomationsPage() {
  return (
    <ComingSoon
      title="Automations"
      description="Once your site is live, here's what we can bolt on. These run while you sleep — and they pay for the site within a few months."
      teasers={[
        "AI enquiry handler — replies to common questions 24/7",
        "Lead → CRM pipeline — every form submission lands ready",
        "Booking capture — straight from your site to your calendar",
        "Review request sequence — asks happy customers on a delay",
        "More as we discover what fits your specific workflow",
      ]}
    />
  );
}
