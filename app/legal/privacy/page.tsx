import { ComingSoon, comingSoonMetadata } from "@/components/layout/coming-soon";

export const metadata = comingSoonMetadata(
  "Privacy policy",
  "How audemation handles your data. Short, plain English, no dark patterns."
);

export default function PrivacyPage() {
  return (
    <ComingSoon
      title="Privacy policy"
      description="How audemation handles your data. Short, plain English, no dark patterns."
      teasers={[
        "What data we collect and why (just what's needed)",
        "How long we keep it (and how to ask us to delete it)",
        "Cookies and analytics (Plausible — privacy-first, no fingerprinting)",
        "Your rights under UK GDPR",
      ]}
    />
  );
}
