import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-5xl px-6 py-10 text-muted-foreground sm:px-8 md:px-10">
        <div className="ds-glass rounded-2xl p-6 flex flex-wrap items-center justify-between gap-5">
          <p className="max-w-2xl">Two paths, same intention: rhythm, regulation, integration.</p>
          <div className="btn-row !mb-0">
            <Link className="btn btn-primary" href="/contact">
              Book 1:1
            </Link>
            <Link className="btn btn-secondary" href="/newsletter">
              Join Live
            </Link>
          </div>
        </div>
        <p className="mt-6">© {new Date().getFullYear()} Sound Sanctuary</p>
        <div className="mt-3 flex gap-4 text-xs">
          <Link href="/privacy" className="transition-colors hover:text-foreground">
            Privacy
          </Link>
          <Link href="/newsletter" className="transition-colors hover:text-foreground">
            Newsletter
          </Link>
        </div>
      </div>
    </footer>
  );
}
