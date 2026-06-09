import { ComingSoon, comingSoonMetadata } from "@/components/layout/coming-soon";

export const metadata = comingSoonMetadata(
  "Terms of service",
  "Plain-English terms covering the free mockup, paid website work, and monthly automations."
);

export default function TermsPage() {
  return (
    <ComingSoon
      title="Terms of service"
      description="Plain-English terms covering the free mockup, paid website work, and monthly automations."
      teasers={[
        "The free mockup: what you can do with it, and what you can't",
        "Paid website work: 50% deposit, 50% on delivery, 7-day terms",
        "Monthly automations: scope, billing, cancellation",
        "First-client special: 20% off in exchange for a testimonial",
      ]}
    />
  );
}
