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
            max-w-4xl
            transition-all duration-300
            ${isScrolled ? "bg-white/90 backdrop-blur-lg shadow-lg" : "bg-white/80 backdrop-blur-md shadow-md"}
            rounded-full
            px-6 py-3
            flex items-center justify-between
            border border-gray-200/50
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
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors duration-200"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Sign In Button */}
          <Button
            variant="outline"
            size="sm"
            className="hidden md:inline-flex bg-transparent border-gray-300 hover:bg-gray-50"
          >
            Sign in
          </Button>

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
          <div className="mx-auto max-w-sm bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200/50 p-4">
            <nav className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-gray-700 hover:text-gray-900 hover:bg-gray-50 text-sm font-medium px-3 py-2 rounded-lg transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <Button
                variant="outline"
                size="sm"
                className="w-full bg-transparent border-gray-300 hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign in
              </Button>
            </div>
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
