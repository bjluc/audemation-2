import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of service",
  description:
    "Plain-English terms covering the free mockup, paid website work, and monthly automations.",
};

/* Shared building blocks for legal prose. Kept local: the only other
   consumer would be the privacy page, which has its own copy so each
   page stays a single self-contained file. */
function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="text-xl md:text-2xl font-bold text-fg tracking-tight">
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-base text-fg-muted leading-relaxed">
        {children}
      </div>
    </section>
  );
}

export default function TermsPage() {
  return (
    <>
      <section className="bg-hero-gradient">
        <div className="container-x pt-16 md:pt-24 pb-10 md:pb-14">
          <h1 className="text-3xl md:text-5xl font-bold text-fg tracking-tight text-balance">
            Terms of service
          </h1>
          <p className="mt-4 text-lg text-fg-muted max-w-2xl text-pretty">
            Plain English, no surprises. These terms cover the free mockup,
            paid website work, and monthly automations.
          </p>
          <p className="mt-3 text-sm text-fg-muted">Last updated: 11 June 2026</p>
        </div>
      </section>

      <div className="container-x max-w-3xl pb-20 md:pb-28">
        <LegalSection title="1. Who you're dealing with">
          <p>
            audemation is a sole-trader web development service based in
            London, United Kingdom (&ldquo;I&rdquo;, &ldquo;me&rdquo;). These
            terms apply to the free mockup offer, paid website builds, and
            monthly automation services. By requesting a mockup or
            commissioning work, you agree to them.
          </p>
        </LegalSection>

        <LegalSection title="2. The free mockup">
          <p>
            The mockup is genuinely free: no payment details, no obligation,
            and no follow-up chasing. A few ground rules so the offer stays
            sustainable:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              The mockup (its design, code, and assets) remains my property
              until you commission the real build. You may share it within
              your business to make a decision.
            </li>
            <li>
              You may not copy the mockup&rsquo;s design or code, hand it to
              another developer to implement, or use it commercially without
              commissioning the build.
            </li>
            <li>
              I may show mockups I&rsquo;ve made in my own portfolio. If
              you&rsquo;d rather yours didn&rsquo;t appear, tell me and
              I&rsquo;ll remove it.
            </li>
            <li>
              Anything you send me to build the mockup (logos, text, photos)
              stays yours, and you confirm you have the right to share it.
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="3. Paid website work">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Scope, price, and timeline are agreed in writing (email is fine)
              before any paid work starts. The quote you accept is the price
              you pay; changes to scope are quoted separately before
              they&rsquo;re built.
            </li>
            <li>
              Payment is 50% deposit to begin and 50% on delivery. Invoices
              are due within 7 days.
            </li>
            <li>
              Ownership of the finished site transfers to you on receipt of
              the final payment: design, code, and content produced for you
              are all included. Until then it remains mine.
            </li>
            <li>
              Third-party costs (domain names, hosting, paid services your
              site depends on) are yours and are billed by those providers
              directly unless we agree otherwise.
            </li>
            <li>
              Reasonable revisions within the agreed scope are included.
              &ldquo;Reasonable&rdquo; means refining what we agreed, not
              redesigning it.
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="4. Monthly automations">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Each automation&rsquo;s scope is agreed in writing before it
              goes live, including what it does and what it costs per month.
            </li>
            <li>Billing is monthly in advance.</li>
            <li>
              You can cancel any time with 30 days&rsquo; notice. No long-term
              contracts, no exit fees. On cancellation I&rsquo;ll hand over or
              shut down the automation cleanly, whichever you prefer.
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="5. First-client special">
          <p>
            The advertised 20% discount for early clients is offered in
            exchange for a genuine public testimonial and permission to use
            the project as a named case study. If you later want the case
            study taken down, I&rsquo;ll remove it, and the discount stays yours.
          </p>
        </LegalSection>

        <LegalSection title="6. What I need from you">
          <p>
            Projects run on time when content, feedback, and approvals arrive
            promptly. If a project stalls for more than 30 days waiting on
            your input, I may pause it and resume when you&rsquo;re ready;
            deposits aren&rsquo;t refundable for stalled projects, but
            they&rsquo;re never forfeited: the work resumes where it stopped.
          </p>
        </LegalSection>

        <LegalSection title="7. What I promise, and what I can't">
          <p>
            I build every site with professional care and skill, test it
            before delivery, and fix defects in the agreed scope at no charge.
            What I can&rsquo;t promise is specific business outcomes: search
            rankings, traffic, or revenue depend on factors outside the build.
          </p>
          <p>
            My total liability for any claim arising from the work is capped
            at the fees you actually paid for that work. Nothing in these
            terms excludes liability that cannot be excluded under English law
            (for example, for fraud).
          </p>
        </LegalSection>

        <LegalSection title="8. Changes and governing law">
          <p>
            I may update these terms from time to time; the version on this
            page applies, and material changes won&rsquo;t apply retroactively
            to work already agreed. These terms are governed by the law of
            England and Wales.
          </p>
          <p>
            Questions? <Link href="/contact" className="text-brand font-medium hover:underline">Get in touch</Link>. You&rsquo;ll be talking to the person who wrote them.
          </p>
        </LegalSection>
      </div>
    </>
  );
}
