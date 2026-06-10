"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Send, Mail, CheckCircle2, ArrowRight } from "lucide-react";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/motion/fade-in";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormValues = {
  businessName: string;
  websiteUrl: string;
  email: string;
  description: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.businessName.trim()) errors.businessName = "Please enter your business name.";
  if (values.email.trim() === "") {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_RE.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (!values.description.trim()) errors.description = "Please add a brief description.";
  return errors;
}

const steps = [
  {
    step: "01",
    title: "I read your message",
    blurb: "I read every enquiry myself, same day. No automated filters, no assistants.",
  },
  {
    step: "02",
    title: "I build a free mockup",
    blurb: "Within 2–3 working days you get a real, modern sample of your site, built in your brand, with your content.",
  },
  {
    step: "03",
    title: "We talk, or you keep it",
    blurb: "If you'd like to take it further, we talk. If not, you keep the mockup anyway. No hard sell.",
  },
];

export default function ContactPage() {
  const [values, setValues] = useState<FormValues>({
    businessName: "",
    websiteUrl: "",
    email: "",
    description: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const businessNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormValues]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  // TODO: replace this stub with a real POST to /api/contact (Phase 2)
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newErrors = validate(values);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      if (newErrors.businessName) businessNameRef.current?.focus();
      else if (newErrors.email) emailRef.current?.focus();
      else if (newErrors.description) descriptionRef.current?.focus();
      return;
    }
    setStatus("submitting");
    setTimeout(() => setStatus("success"), 200);
  }

  return (
    <>
      {/* ========== HERO ========== */}
      <section className="relative overflow-hidden bg-hero-gradient">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -right-40 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, #818cf8 0%, transparent 70%)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #c084fc 0%, transparent 70%)" }}
        />
        <div className="container-x relative pt-20 md:pt-32 pb-16 md:pb-24">
          <FadeIn className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-line text-sm font-medium text-fg-muted shadow-soft">
              <span className="w-1.5 h-1.5 rounded-full bg-brand" />
              Free mockup. No credit card. No catch.
            </span>
            <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-bold text-fg leading-[1.05] tracking-tight text-balance">
              Get a free mockup.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-fg-muted max-w-2xl leading-relaxed text-pretty">
              Fill in the form below and I&apos;ll come back within 2–3 working
              days with a free, modern mockup of your site. No obligation, no
              pitch.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ========== FORM ========== */}
      <section className="section bg-bg">
        <div className="container-x">
          <div className="max-w-2xl mx-auto">
            <FadeIn>
              {status === "success" ? (
                <div className="card-lift text-center py-12">
                  <CheckCircle2
                    className="mx-auto w-12 h-12 text-brand mb-6"
                    strokeWidth={1.5}
                  />
                  <h2 className="text-2xl font-bold text-fg">
                    Thanks. Message sent.
                  </h2>
                  <p className="mt-4 text-fg-muted text-pretty max-w-sm mx-auto leading-relaxed">
                    I&apos;ll be in touch within 1 working day, usually faster.
                    If you don&apos;t hear back, check your spam folder or email{" "}
                    <a
                      href="mailto:hello@audemation.com"
                      className="text-brand font-medium hover:underline"
                    >
                      hello@audemation.com
                    </a>{" "}
                    directly.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="card-lift space-y-7"
                >
                  {/* Business name */}
                  <div>
                    <label
                      htmlFor="businessName"
                      className="block text-sm font-medium text-fg mb-1.5"
                    >
                      Business name{" "}
                      <span className="text-fg-muted font-normal">(required)</span>
                    </label>
                    <input
                      ref={businessNameRef}
                      id="businessName"
                      name="businessName"
                      type="text"
                      required
                      autoComplete="organization"
                      value={values.businessName}
                      onChange={handleChange}
                      placeholder="e.g. Northfield Plumbing"
                      aria-invalid={!!errors.businessName}
                      aria-describedby={
                        errors.businessName ? "businessName-error" : undefined
                      }
                      className={[
                        "w-full h-11 rounded-xl border px-4 text-base text-fg placeholder:text-fg-muted bg-white",
                        "focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors",
                        errors.businessName
                          ? "border-red-400 bg-red-50"
                          : "border-line",
                      ].join(" ")}
                    />
                    {errors.businessName && (
                      <p
                        id="businessName-error"
                        role="alert"
                        className="mt-1.5 text-sm text-red-600"
                      >
                        {errors.businessName}
                      </p>
                    )}
                  </div>

                  {/* Current website URL */}
                  <div>
                    <label
                      htmlFor="websiteUrl"
                      className="block text-sm font-medium text-fg mb-1.5"
                    >
                      Current website URL{" "}
                      <span className="text-fg-muted font-normal">(optional)</span>
                    </label>
                    <input
                      id="websiteUrl"
                      name="websiteUrl"
                      type="url"
                      autoComplete="url"
                      value={values.websiteUrl}
                      onChange={handleChange}
                      placeholder="https:// (leave blank if you don't have one)"
                      className={[
                        "w-full h-11 rounded-xl border px-4 text-base text-fg placeholder:text-fg-muted bg-white",
                        "focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors border-line",
                      ].join(" ")}
                    />
                  </div>

                  {/* Contact email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-fg mb-1.5"
                    >
                      Contact email{" "}
                      <span className="text-fg-muted font-normal">(required)</span>
                    </label>
                    <input
                      ref={emailRef}
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={values.email}
                      onChange={handleChange}
                      placeholder="you@yourcompany.co.uk"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      className={[
                        "w-full h-11 rounded-xl border px-4 text-base text-fg placeholder:text-fg-muted bg-white",
                        "focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors",
                        errors.email ? "border-red-400 bg-red-50" : "border-line",
                      ].join(" ")}
                    />
                    {errors.email && (
                      <p
                        id="email-error"
                        role="alert"
                        className="mt-1.5 text-sm text-red-600"
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Brief description */}
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-fg mb-1.5"
                    >
                      Brief description{" "}
                      <span className="text-fg-muted font-normal">(required)</span>
                    </label>
                    <textarea
                      ref={descriptionRef}
                      id="description"
                      name="description"
                      required
                      rows={5}
                      value={values.description}
                      onChange={handleChange}
                      placeholder="A line or two on what you do and what you'd like the site to say for you."
                      aria-invalid={!!errors.description}
                      aria-describedby={
                        errors.description ? "description-error" : undefined
                      }
                      className={[
                        "w-full rounded-xl border px-4 py-3 text-base text-fg placeholder:text-fg-muted bg-white resize-none",
                        "focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-colors",
                        errors.description
                          ? "border-red-400 bg-red-50"
                          : "border-line",
                      ].join(" ")}
                    />
                    {errors.description && (
                      <p
                        id="description-error"
                        role="alert"
                        className="mt-1.5 text-sm text-red-600"
                      >
                        {errors.description}
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <div>
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="btn-brand w-full sm:w-auto group disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {status === "submitting" ? (
                        "Sending…"
                      ) : (
                        <>
                          Send it over
                          <Send className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </>
                      )}
                    </button>
                    <p className="mt-3 text-xs text-fg-muted">
                      I reply to every message within 1 working day. Usually faster.
                    </p>
                  </div>
                </form>
              )}
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ========== WHAT HAPPENS NEXT ========== */}
      <section className="section bg-bg-alt">
        <div className="container-x">
          <FadeIn className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-fg tracking-tight text-balance">
              What happens next
            </h2>
            <p className="mt-4 text-lg text-fg-muted text-pretty">
              Three steps from your message to a finished mockup in your inbox.
            </p>
          </FadeIn>

          <FadeInStagger className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((s) => (
              <FadeInItem key={s.step}>
                <div className="card-lift h-full">
                  <span className="inline-block text-xs font-bold tracking-widest text-brand mb-4">
                    {s.step}
                  </span>
                  <h3 className="text-lg font-semibold text-fg leading-snug">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm text-fg-muted leading-relaxed">
                    {s.blurb}
                  </p>
                </div>
              </FadeInItem>
            ))}
          </FadeInStagger>
        </div>
      </section>

      {/* ========== EMAIL ONLY NOTE ========== */}
      <section className="section-tight bg-bg">
        <div className="container-x">
          <FadeIn>
            <div className="max-w-2xl mx-auto rounded-2xl bg-bg-alt border border-line px-6 py-5 flex gap-4 items-start">
              <span className="mt-0.5 flex-shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-lg bg-brand-soft text-brand">
                <Mail className="w-4 h-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-fg mb-1">
                  There&apos;s no phone number on this site.
                </p>
                <p className="text-sm text-fg-muted leading-relaxed">
                  I&apos;m a solo founder. Email is the only way I can keep up
                  properly and give every enquiry the attention it deserves. I
                  reply to every message myself.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section className="section bg-dark-gradient text-fg-on-dark">
        <div className="container-x">
          <FadeIn className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-balance">
              Or have a look around first.
            </h2>
            <p className="mt-5 text-lg text-fg-muted-on-dark text-pretty">
              See how the whole thing works, or browse examples of mockups
              I&apos;ve built for other businesses.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/how-it-works"
                className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl bg-white text-fg font-semibold text-base hover:bg-bg-tint transition-colors group"
              >
                See how it works
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/mockups"
                className="inline-flex items-center justify-center h-12 px-6 rounded-xl border border-line-on-dark text-fg-on-dark font-semibold text-base hover:bg-white/5 transition-colors"
              >
                See examples
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
