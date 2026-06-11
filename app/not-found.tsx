import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="bg-hero-gradient min-h-[70vh] flex items-center">
      <div className="container-x py-20">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-line text-sm font-medium text-fg-muted shadow-soft">
            <span className="w-1.5 h-1.5 rounded-full bg-brand" />
            404
          </span>
          <h1 className="mt-6 text-4xl md:text-6xl font-bold text-fg leading-[1.05] tracking-tight">
            That page doesn&apos;t exist.
          </h1>
          <p className="mt-5 text-lg text-fg-muted leading-relaxed">
            The link may be old, or you might have mistyped it. Either way,
            you&apos;re not far from home.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link href="/" className="btn-brand group">
              <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              Back to home
            </Link>
            <Link href="/contact" className="btn-outline">
              Get in touch
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
