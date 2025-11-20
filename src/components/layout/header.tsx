"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#featured", label: "Featured" },
  { href: "#projects", label: "Projects" },
  { href: "#education", label: "Education" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [activeSection, setActiveSection] = React.useState("home");

  React.useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => {
        const href = link.href;
        // For the home link, we want to check for the top of the page
        if (href === '#home') {
          return document.getElementById('home');
        }
        return document.getElementById(href.substring(1));
      });
      
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      // Special case for home
      if (scrollPosition < windowHeight / 2) {
        setActiveSection("home");
        return;
      }

      for (const section of sections) {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          if (scrollPosition + windowHeight / 2 >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(section.id);
            return;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="fixed top-0 right-0 z-50 flex h-screen items-center p-4 md:p-6"
    >
      <nav className="flex flex-col items-center gap-4">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group relative flex items-center"
            onClick={(e) => {
              e.preventDefault();
              const targetId = link.href.substring(1);
              const targetElement = document.getElementById(targetId);
              if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
              } else if (link.href === '#home') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <span className={cn(
                "absolute right-full mr-3 hidden rounded-md bg-primary px-2 py-1 text-xs font-bold uppercase text-primary-foreground opacity-0 transition-all duration-300 group-hover:opacity-100 md:block",
                activeSection === link.href.substring(1) && "opacity-100"
            )}>
              {link.label}
            </span>
            <div className={cn(
              "h-2.5 w-2.5 rounded-full bg-foreground/30 transition-all duration-300 group-hover:scale-125 group-hover:bg-primary",
              activeSection === link.href.substring(1) ? "scale-150 bg-primary" : ""
            )}></div>
          </Link>
        ))}
      </nav>
    </header>
  );
}
