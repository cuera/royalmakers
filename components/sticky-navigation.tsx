"use client";

import React from "react";
import Link from "next/link";
import StickyNavigationMobile from "./sticky-navigation-mobile";

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Activities", href: "#gallery" },
  { label: "Skills", href: "#skills" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function StickyNavigation() {
  return (
    <>
      {/* Desktop Nav */}
      <header className="hidden md:block fixed top-4 left-1/2 z-50 w-full -translate-x-1/2 px-4">
        <nav className="mx-auto max-w-fit bg-black/80 backdrop-blur-lg shadow-lg rounded-full px-6 py-3 flex items-center gap-8 border border-gray-800">
          {/* Logo */}
          <Link href="/" className="inline-flex items-center">
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
          </Link>

          {/* Nav Links */}
          <ul className="flex items-center space-x-8">
            {navItems.map((item) => (
              <li key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className="text-white hover:text-gray-200 text-sm font-medium transition-colors duration-200"
                >
                  {item.label}
                </Link>
                <div className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Mobile Nav */}
      <div className="md:hidden">
        <StickyNavigationMobile />
      </div>
    </>
  );
}
