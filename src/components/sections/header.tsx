"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type SectionId = 'home' | 'about' | 'projects' | 'contact';

const navLinks: { href: SectionId, label: string }[] = [
  { href: "home", label: "Home" },
  { href: "about", label: "About" },
  { href: "projects", label: "Projects" },
  { href: "contact", label: "Contact" },
];

type HeaderProps = {
  activeSection: SectionId;
  setActiveSection: (section: SectionId) => void;
};

export function Header({ activeSection, setActiveSection }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false); // Can be repurposed if needed

  // Effect to check scroll (might be useful for other background effects)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, section: SectionId) => {
    e.preventDefault();
    setActiveSection(section);
    setIsOpen(false);
  };

  const isProjectPage = typeof window !== 'undefined' && window.location.pathname.startsWith('/projects');
  let currentActiveLink = isProjectPage ? 'projects' : activeSection;


  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isOpen || activeSection !== 'home' || isProjectPage ? "bg-background/80 backdrop-blur-sm" : "bg-transparent"}`}>
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="#" onClick={(e) => handleLinkClick(e, 'home')} className="font-headline text-2xl font-bold text-primary">
          FN
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={`#${link.href}`}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={`text-sm font-medium transition-colors ${currentActiveLink === link.href ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Nav Trigger */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Nav Panel */}
        {isOpen && (
            <div className="absolute top-20 left-0 right-0 md:hidden">
                 <div className="container mx-auto">
                    <nav className="flex flex-col items-center gap-6 rounded-lg bg-card p-6 shadow-lg">
                    {navLinks.map((link) => (
                        <Link
                        key={link.href}
                        href={`#${link.href}`}
                        onClick={(e) => handleLinkClick(e, link.href)}
                        className={`w-full text-center text-lg font-medium transition-colors ${currentActiveLink === link.href ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
                        >
                        {link.label}
                        </Link>
                    ))}
                    </nav>
                 </div>
            </div>
        )}
      </div>
    </header>
  );
}
