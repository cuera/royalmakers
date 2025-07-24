"use client"

import { StickyNavigation } from "@/components/sticky-navigation"
import { Hero } from "@/components/hero"
import { Card, CardContent } from "@/components/ui/card"
import { Check } from "lucide-react"
import DashboardSnapshotSection from "@/components/dashboard-snapshot-section"
import MosaicResponsive from "@/components/mosaic-responsive"
import { LazyClient } from "@/components/lazy-client"

// No eager dynamic imports; components will be loaded via LazyClient when scrolled into view

export default function Home() {
  // Preloader removed for faster initial render

  const handleSplineLoad = () => {}

  return (
    <>
      {/* Preloader removed */}
      
    <main className="min-h-screen bg-white">
      {/* Sticky pill navbar */}
      <StickyNavigation />

      {/* Enhanced Hero with 3D robot */}
        <Hero onSplineLoad={handleSplineLoad} />

      {/* New Gallery Grid Section */}
      <section id="gallery" className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Quick Preview</h2>
            <p className="text-xl text-subtitle-gray max-w-3xl mx-auto">
              A glimpse into our hands-on STEM activities and student projects
            </p>
          </div>
          <MosaicResponsive />
        </div>
      </section>

      {/* 3-Day Activities Gallery */}
      <LazyClient importFn={() => import("@/components/gallery")} placeholder={<div className="h-[800px]" />} />

      {/* Skills & Features Grid */}
      <section id="skills">
        <LazyClient importFn={() => import("@/components/skills-grid")} placeholder={<div className="h-[600px]" />} />
      </section>

      {/* Everything you need */}
      <section className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Everything you need</h2>
            <p className="text-xl text-subtitle-gray max-w-3xl mx-auto">Skill Matrix dashboard is a powerful tool designed to help you optimize your learning journey. It provides a comprehensive and interactive overview of your skill development, enabling you to track progress, identify strengths, and pinpoint areas for improvement. With more data this will improve</p>
          {/* Live Dashboard snapshot */}
          <DashboardSnapshotSection />
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section id="testimonials">
        <LazyClient importFn={() => import("@/components/testimonials").then(mod => ({ default: mod.Testimonials }))} placeholder={<div className="h-[600px]" />} />
      </section>

      {/* Mission Statement & Leadership */}
      <section id="mission">
        <LazyClient importFn={() => import("@/components/section6-mission").then(mod => ({ default: mod.Section6Mission }))} placeholder={<div className="h-[700px]" />} />
      </section>

      {/* Pricing & Programs */}
      <section id="pricing">
        <LazyClient importFn={() => import("@/components/section7-pricing").then(mod => ({ default: mod.Section7Pricing }))} placeholder={<div className="h-[700px]" />} />
      </section>

      {/* FAQ */}
      <section id="faq">
        <LazyClient importFn={() => import("@/components/section8-faq").then(mod => ({ default: mod.Section8FAQ }))} placeholder={<div className="h-[600px]" />} />
      </section>

      {/* Contact & Registration */}
      <section id="contact">
        <LazyClient importFn={() => import("@/components/section9-contact").then(mod => ({ default: mod.Section9Contact }))} placeholder={<div className="h-[800px]" />} />
      </section>

      {/* Footer */}
      <LazyClient importFn={() => import("@/components/section10-footer").then(mod => ({ default: mod.Section10Footer }))} placeholder={null} />
    </main>
    </>
  )
}
