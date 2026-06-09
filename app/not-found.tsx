import Link from "next/link"

export default function NotFound() {
  return (
    <main className="mx-auto max-w-[1200px] px-4 py-12">
      <h1 className="text-3xl font-semibold text-ink mt-12">Page not found</h1>
      <p className="text-muted mt-4">
        That page does not exist.{" "}
        <Link href="/" className="text-accent hover:text-accent-hover underline">
          Go back home
        </Link>
        .
      </p>
    </main>
  )
}
