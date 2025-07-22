"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function StickyNavigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Activities", href: "#gallery" },
    { label: "Skills", href: "#skills" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ]

  return (
    <>
      {/* Floating Pill Navigation */}
      <header className="fixed top-4 left-1/2 z-50 w-full -translate-x-1/2 px-4">
        <nav
          className={`
            mx-auto
            max-w-fit
            transition-all duration-300
            ${isScrolled ? "bg-black/[.77] backdrop-blur-lg shadow-lg" : "bg-transparent backdrop-blur-none shadow-none"}
            rounded-full
            px-6 py-3
            flex items-center gap-8
            border ${isScrolled ? "border-white/10" : "border-white/50"}
          `}
        >
          {/* Logo */}
          <Link href="/" className="inline-flex items-center">
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center space-x-8">
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

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </nav>
      </header>

      {/* Mobile Navigation Menu - Floating below main nav */}
      {isMobileMenuOpen && (
        <div className="fixed top-20 left-1/2 z-40 w-full -translate-x-1/2 px-4 md:hidden">
          <div className="mx-auto max-w-sm bg-black/95 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-4">
            <nav className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-white hover:text-gray-200 hover:bg-white/10 text-sm font-medium px-3 py-2 rounded-lg transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Backdrop overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}
