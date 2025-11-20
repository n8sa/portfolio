"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, Mountain } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" : ""
      }`}
    >
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-headline text-lg font-bold">
          <Mountain className="h-6 w-6 text-primary" />
          <span>Farah Nisa</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
            <Button asChild className="hidden md:inline-flex">
                <Link href="#contact">Get In Touch</Link>
            </Button>
            <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="right">
                <div className="flex flex-col gap-6 p-6">
                <Link href="/" className="flex items-center gap-2 font-headline text-lg font-bold">
                    <Mountain className="h-6 w-6 text-primary" />
                    <span>Farah Nisa</span>
                </Link>
                <nav className="flex flex-col gap-4">
                    {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="text-base font-medium text-foreground/80 transition-colors hover:text-foreground"
                    >
                        {link.label}
                    </Link>
                    ))}
                </nav>
                <Button asChild>
                    <Link href="#contact">Get In Touch</Link>
                </Button>
                </div>
            </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  );
}
