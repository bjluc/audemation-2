import { ComingSoon, comingSoonMetadata } from "@/components/layout/coming-soon";

export const metadata = comingSoonMetadata(
  "Get a free mockup",
  "Send me your business name, current website, and a short note. I come back with a free mockup in 2–3 days. Email only — no phone, I'm solo."
);

export default function ContactPage() {
  return (
    <ComingSoon
      title="Get a free mockup"
      description="Send me your business name, current website, and a short note. I come back with a free mockup in 2–3 days. Email only — no phone, I'm solo."
      teasers={[
        "Form: business name, current website URL, contact email, brief description",
        "What happens next: a 2–3 day turnaround on your mockup",
        "Email-only contact (no phone) — solo founder, protect the time",
        "Form backend wired up in Phase 2 (currently placeholder)",
      ]}
    />
  );
}
