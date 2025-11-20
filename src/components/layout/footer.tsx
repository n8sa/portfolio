import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";
import { VisitorCounter } from "@/components/visitor-counter";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container py-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="text-center sm:text-left">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Farah Nisa. All rights reserved.
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
                Designed with care.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <VisitorCounter />
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="#" target="_blank" rel="noopener noreferrer">
                        <Github className="h-5 w-5" />
                        <span className="sr-only">GitHub</span>
                    </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                    <Link href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-5 w-5" />
                        <span className="sr-only">LinkedIn</span>
                    </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                    <Link href="#" target="_blank" rel="noopener noreferrer">
                        <Twitter className="h-5 w-5" />
                        <span className="sr-only">Twitter</span>
                    </Link>
                </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
