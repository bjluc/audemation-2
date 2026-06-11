import type { Metadata } from "next";
import Link from "next/link";
import {
  MessageSquare,
  Bot,
  CalendarCheck,
  Star,
  Mail,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/motion/fade-in";
import { HeroGrid } from "@/components/hero/hero-grid";

export const metadata: Metadata = {
  title: "Automations",
  description:
    "Once your site is live, here's what we can bolt on: AI enquiry handling, CRM pipelines, booking capture, review requests, and quote follow-ups.",
};

const automations = [
  {
    icon: MessageSquare,
    title: "AI enquiry handler",
    problem:
      "You can't be at your desk at 10pm when someone visits your site and has a question.",
    howItWorks:
      "A trained assistant answers the questions your customers ask most: opening times, what you offer, how to book. It's connected to your site and replies in seconds. You get a daily summary of every conversation, so nothing slips through.",
    price: "From £200/mo",
  },
  {
    icon: Bot,
    title: "Lead → CRM pipeline",
    problem:
      "Contact form submissions sit in your inbox until you get round to them. Then half get forgotten.",
    howItWorks:
      "Every form submission is automatically sent to your CRM (HubSpot, Pipedrive, Notion, or whichever you use), tagged by source, and flagged for follow-up. No copy-pasting, no missed leads.",
    price: "From £200/mo",
  },
  {
    icon: CalendarCheck,
    title: "Booking capture",
    problem:
      "Booking via email means two or three messages back and forth before anything is confirmed.",
    howItWorks:
      "Customers pick a time from your live calendar, fill in a short form, and receive a confirmation automatically. It syncs to Google Calendar and sends reminders to both sides before the appointment.",
    price: "From £200/mo",
  },
  {
    icon: Star,
    title: "Review requests",
    problem:
      "Happy customers mean to leave you a review but never quite get round to it.",
    howItWorks:
      "A day or two after a job is marked complete, the customer gets a short, friendly message with a direct link to your Google Business profile. The timing and wording can be adjusted. One short message at the right moment.",
    price: "From £200/mo",
  },
  {
    icon: Mail,
    title: "Quote follow-ups",
    problem:
      "You send a quote and then wait, with no idea if they've read it or just gone quiet.",
    howItWorks:
      "When a quote goes unanswered, the system sends a short, polite follow-up at 3, 7, and 14 days. Each message is to the point and easy to reply to. Once the client responds (or books), the sequence stops automatically.",
    price: "From £200/mo",
  },
];

const benefits = [
  "Replies within seconds, not hours",
  "No more missed enquiries at 11pm",
  "Plays nicely with tools you already use (Google Calendar, HubSpot, Xero, Mailchimp, and more)",
  "You get a weekly summary of what happened. No dashboards to learn.",
];

export default function AutomationsPage() {
  return (
    <>
      {/* ========== HERO ========== */}
      <section className="relative overflow-hidden bg-hero-gradient">
        {/* Subtle line grid — site-wide identity motif */}
        <HeroGrid variant="subtle" />

        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -right-40 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl"
          style={{
            background: "radial-gradient(circle, #818cf8 0%, transparent 70%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
          style={{
            background: "radial-gradient(circle, #c084fc 0%, transparent 70%)",
          }}
        />

        <div className="container-x relative pt-20 md:pt-32 pb-20 md:pb-28">
          <FadeIn className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-line text-sm font-medium text-fg-muted shadow-soft">
              <span className="w-1.5 h-1.5 rounded-full bg-brand" />
              Bolt-on automations for live sites
            </span>
            <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-bold text-fg leading-[1.05] tracking-tight text-balance">
              Once your site is live, here&apos;s what we can bolt on.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-fg-muted max-w-2xl leading-relaxed text-pretty">
              Each automation connects to your site and runs in the background.
              They handle the repetitive stuff so you can focus on the work you
              actually enjoy.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className="btn-brand group">
                Ask me about automations
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link href="/how-it-works" className="btn-outline group">
                See how the site works
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ========== AUTOMATION CARDS ========== */}
      <section className="section bg-bg">
        <div className="container-x">
          <FadeIn className="max-w-2xl">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-surface border border-line text-sm font-medium text-fg-muted">
              What&apos;s available
            </span>
            <h2 className="mt-4 text-3xl md:text-5xl font-bold text-fg tracking-tight text-balance">
              Five automations, each solving a real problem.
            </h2>
            <p className="mt-4 text-lg text-fg-muted text-pretty">
              Each one is set up once, tested on your actual site, and left
              running. You don&apos;t need to manage them day-to-day.
            </p>
          </FadeIn>

          <FadeInStagger className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {automations.map((automation) => {
              const Icon = automation.icon;
              return (
                <FadeInItem key={automation.title}>
                  <div className="card-lift h-full flex flex-col gap-4">
                    <div className="flex items-start justify-between gap-4">
                      <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-warm-soft text-warm-hover flex-shrink-0">
                        <Icon className="w-5 h-5" />
                      </span>
                      <span className="text-xs font-medium text-fg-muted bg-bg-tint px-2.5 py-1 rounded-full flex-shrink-0">
                        {automation.price}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-fg">
                        {automation.title}
                      </h3>
                      <p className="mt-2 text-sm font-medium text-warm-hover">
                        The problem:{" "}
                        <span className="text-fg-muted font-normal">
                          {automation.problem}
                        </span>
                      </p>
                    </div>
                    <div className="mt-auto pt-3 border-t border-line">
                      <p className="text-xs font-semibold text-fg-muted uppercase tracking-wide mb-1.5">
                        How it works
                      </p>
                      <p className="text-sm text-fg-muted leading-relaxed">
                        {automation.howItWorks}
                      </p>
                    </div>
                  </div>
                </FadeInItem>
              );
            })}
          </FadeInStagger>

          <FadeIn delay={0.1} className="mt-8">
            <p className="text-sm text-fg-muted">
              Need all five? Add them as a bundle for{" "}
              <span className="font-semibold text-fg">£400/mo</span>, the same
              price as two individually.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ========== VALUE SECTION ========== */}
      <section className="section bg-bg-alt">
        <div className="container-x">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-surface border border-line text-sm font-medium text-fg-muted">
                Why automations
              </span>
              <h2 className="mt-4 text-3xl md:text-5xl font-bold text-fg tracking-tight text-balance">
                These run while you sleep.
              </h2>
              <p className="mt-4 text-lg text-fg-muted text-pretty">
                You set them up once. After that, they handle the
                back-and-forth that currently lands in your inbox at all
                hours.
              </p>
            </FadeIn>

            <FadeInStagger className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((benefit) => (
                <FadeInItem key={benefit}>
                  <div className="flex items-start gap-3 bg-surface rounded-2xl border border-line p-5 shadow-soft">
                    <CheckCircle2 className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" />
                    <p className="text-fg-muted leading-relaxed text-sm">
                      {benefit}
                    </p>
                  </div>
                </FadeInItem>
              ))}
            </FadeInStagger>
          </div>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section className="section bg-dark-gradient text-fg-on-dark">
        <div className="container-x">
          <FadeIn className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-balance">
              Ask me about automations for your business.
            </h2>
            <p className="mt-5 text-lg text-fg-muted-on-dark text-pretty">
              Every business is different. Tell me what&apos;s taking up your
              time and I&apos;ll tell you whether an automation can help, and
              what it would cost.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center h-12 px-6 rounded-xl whitespace-nowrap bg-white text-slate-900 font-semibold text-base hover:bg-indigo-50 transition-colors"
              >
                Get in touch
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center justify-center h-12 px-6 rounded-xl whitespace-nowrap border border-line-on-dark text-fg-on-dark font-semibold text-base hover:bg-white/5 transition-colors"
              >
                See the website service
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
