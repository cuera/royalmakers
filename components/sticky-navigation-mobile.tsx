"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Activities", href: "#gallery" },
  { label: "Skills", href: "#skills" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function StickyNavigationMobile() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <nav className="flex items-center justify-between w-full px-4 py-2" style={{ background: "rgba(0,0,0,0)" }}>
        {/* Logo on left */}
        <Link href="/" className="flex items-center">
          <Image src="/logo_192x192.png" alt="Logo" width={40} height={40} className="rounded-full" />
        </Link>

        {/* Hamburger on right */}
        <button
          className="p-2"
          aria-label="Open menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="w-8 h-8" style={{ color: "#42d98a" }} />
        </button>
      </nav>

      {/* Mobile Navigation Menu - Floating below main nav */}
      {isMenuOpen && (
        <div className="absolute top-14 right-4 bg-black/90 rounded-xl shadow-xl p-4 border border-neon-green-light" style={{ minWidth: 180 }}>
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white hover:text-neon-green-light text-base font-medium px-3 py-2 rounded-lg transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
