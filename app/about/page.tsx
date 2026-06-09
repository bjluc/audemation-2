import { ComingSoon, comingSoonMetadata } from "@/components/layout/coming-soon";

export const metadata = comingSoonMetadata(
  "About",
  "Twenty-plus years running real businesses, full-stack engineer who's shipped three production systems, and a chef on the side. Plain English, no agency."
);

export default function AboutPage() {
  return (
    <ComingSoon
      title="About"
      description="Twenty-plus years running real businesses, full-stack engineer who's shipped three production systems, and a chef on the side. Plain English, no agency."
      teasers={[
        "The story: 20+ years running businesses, full-stack engineer, AI depth",
        "Tech stack as a credibility signal — what I actually use day-to-day",
        "Personal: chef background, Topstay.uk, London-based",
        "Why I work solo, and what that means for you",
      ]}
    />
  );
}
