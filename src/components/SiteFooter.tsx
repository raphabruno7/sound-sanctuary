export function SiteFooter() {
  return (
    <footer className="border-t border-neutral-200">
      <div className="max-w-5xl mx-auto px-8 md:px-10 py-10 text-sm text-neutral-600">
        <p>© {new Date().getFullYear()} Sound Sanctuary</p>
      </div>
    </footer>
  );
}

