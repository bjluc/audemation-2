import { ComingSoon, comingSoonMetadata } from "@/components/layout/coming-soon";

export const metadata = comingSoonMetadata(
  "How it works",
  "The full six-step system — from spotting a tired site to delivering the real thing. Plain English, no agency overhead."
);

export default function HowItWorksPage() {
  return (
    <ComingSoon
      title="How it works"
      description="The full six-step system — from spotting a tired site to delivering the real thing. Plain English, no agency overhead."
      teasers={[
        "The 6-step system in detail, with realistic timeframes",
        "What you get: a clean modern site, plus optional automations",
        "What you don't get: agency fees, retainers, or jargon",
        "A 5–6 question FAQ covering the awkward edge cases",
      ]}
    />
  );
}
