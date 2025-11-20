"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Section = 'home' | 'about' | 'projects' | 'contact';

const navLinks: { id: Section; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

interface HeaderProps {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
}

export function Header({ activeSection, setActiveSection }: HeaderProps) {
  return (
    <header
      className="fixed top-0 right-0 z-50 flex h-screen items-center p-4 md:p-6"
    >
      <nav className="flex flex-col items-center gap-4">
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => setActiveSection(link.id)}
            className="group relative flex items-center"
          >
            <span className={cn(
                "absolute right-full mr-3 hidden rounded-md bg-primary px-2 py-1 text-xs font-bold uppercase text-primary-foreground opacity-0 transition-all duration-300 group-hover:opacity-100 md:block",
                activeSection === link.id && "opacity-100"
            )}>
              {link.label}
            </span>
            <div className={cn(
              "h-2.5 w-2.5 rounded-full bg-foreground/30 transition-all duration-300 group-hover:scale-125 group-hover:bg-primary",
              activeSection === link.id ? "scale-150 bg-primary" : ""
            )}></div>
          </button>
        ))}
      </nav>
    </header>
  );
}
