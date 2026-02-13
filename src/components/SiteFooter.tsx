export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-5xl px-6 py-10 text-muted-foreground sm:px-8 md:px-10">
        <p>© {new Date().getFullYear()} Sound Sanctuary</p>
      </div>
    </footer>
  );
}
