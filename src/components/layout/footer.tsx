
export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full border-t border-border/40 bg-transparent">
      <div className="container py-4">
        <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Farah Nisa. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Visitors: 1,234
          </p>
        </div>
      </div>
    </footer>
  );
}
