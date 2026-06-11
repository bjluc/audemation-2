import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How audemation handles your data. Short, plain English, no dark patterns.",
};

/* Shared building blocks for legal prose. Kept local: see the note in
   the terms page; each legal page stays a single self-contained file. */
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

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-hero-gradient">
        <div className="container-x pt-16 md:pt-24 pb-10 md:pb-14">
          <h1 className="text-3xl md:text-5xl font-bold text-fg tracking-tight text-balance">
            Privacy policy
          </h1>
          <p className="mt-4 text-lg text-fg-muted max-w-2xl text-pretty">
            Short and in plain English, because there&rsquo;s genuinely not
            much to disclose: this site collects almost nothing.
          </p>
          <p className="mt-3 text-sm text-fg-muted">Last updated: 11 June 2026</p>
        </div>
      </section>

      <div className="container-x max-w-3xl pb-20 md:pb-28">
        <LegalSection title="1. Who is responsible for your data">
          <p>
            audemation, a sole-trader web development service based in London,
            United Kingdom, is the data controller for anything you submit
            through this site. You can reach me through the{" "}
            <Link href="/contact" className="text-brand font-medium hover:underline">
              contact page
            </Link>
            .
          </p>
        </LegalSection>

        <LegalSection title="2. What I collect, and why">
          <p>
            The only personal data this site collects is what you type into
            the contact form: your business name, your email address, an
            optional website address, and your message. I use it to reply to
            you and, if you&rsquo;ve asked for one, to prepare your mockup.
            That&rsquo;s it: no marketing lists, no follow-up sequences, and
            your details are never sold or shared for advertising.
          </p>
          <p>
            The legal basis for this under UK GDPR is legitimate interest:
            you contacted me, so I reply.
          </p>
        </LegalSection>

        <LegalSection title="3. Where it goes">
          <p>
            Contact-form submissions are delivered straight to my inbox as
            email via Google&rsquo;s Gmail service; the website itself keeps
            no database of submissions. The site is hosted on Vercel, which
            keeps standard server logs (including IP addresses) for security
            and operations. Google and Vercel act as data processors with
            their own published safeguards.
          </p>
        </LegalSection>

        <LegalSection title="4. Cookies and analytics">
          <p>
            This site sets no advertising cookies and currently runs no
            analytics. The only thing stored in your browser is a single
            <code className="mx-1 px-1.5 py-0.5 rounded bg-bg-alt border border-line text-fg text-sm">theme</code>
            preference (light or dark mode), which is saved in local storage
            on your device and is never transmitted anywhere. If I add
            analytics later, it will be a privacy-first tool with no
            cross-site tracking, and this page will be updated first.
          </p>
        </LegalSection>

        <LegalSection title="5. How long I keep it">
          <p>
            Enquiry emails are kept while they&rsquo;re relevant, during an
            ongoing conversation or project, and for a reasonable period
            afterwards for accounting and reference. If you&rsquo;d like your
            enquiry deleted sooner, just ask and it&rsquo;s gone.
          </p>
        </LegalSection>

        <LegalSection title="6. Your rights">
          <p>
            Under UK GDPR you can ask me for a copy of the personal data I
            hold about you, ask for it to be corrected or deleted, restrict or
            object to how it&rsquo;s used, and ask for it in a portable
            format. Email me via the contact page and I&rsquo;ll sort it.
            There&rsquo;s no form to fill in.
          </p>
          <p>
            If you&rsquo;re unhappy with how I&rsquo;ve handled your data, you
            have the right to complain to the Information Commissioner&rsquo;s
            Office at{" "}
            <a
              href="https://ico.org.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand font-medium hover:underline"
            >
              ico.org.uk
            </a>
            .
          </p>
        </LegalSection>

        <LegalSection title="7. Changes">
          <p>
            If how this site handles data changes, this page changes with it,
            along with the date at the top.
          </p>
        </LegalSection>
      </div>
    </>
  );
}
