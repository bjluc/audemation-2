import { ComingSoon, comingSoonMetadata } from "@/components/layout/coming-soon";

export const metadata = comingSoonMetadata(
  "Mockups",
  "A gallery of real before-and-after mockups. Featured entry: the previous version of this very site."
);

export default function MockupsPage() {
  return (
    <ComingSoon
      title="Mockups"
      description="A gallery of real before-and-after mockups. Featured entry: the previous version of this very site."
      teasers={[
        "Featured entry: the previous audemation.com, with screenshot and live link",
        "3–6 anonymised before-and-after mockups from real prospect sites",
        "One-line 'what changed' for each — plain English, not marketing fluff",
        "Click into a detail view for the full before/after pair",
      ]}
    />
  );
}
