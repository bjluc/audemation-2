import type { Metadata } from "next";

/* The contact page is a client component (form state), so it can't
   export metadata itself — this layout carries it instead. */
export const metadata: Metadata = {
  title: "Contact",
  description:
    "Send your business name and current site, and get a free modern mockup back in 2–3 days. No obligation, no pitch.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
