"use client"

import { StickyNavigation } from "@/components/sticky-navigation"
import { Hero } from "@/components/hero"
import { Preloader } from "@/components/preloader"
import { useAppLoading } from "@/hooks/use-app-loading"
import { Card, CardContent } from "@/components/ui/card"
import { Check } from "lucide-react"
import DashboardSnapshotSection from "@/components/dashboard-snapshot-section"
import dynamic from "next/dynamic"
import MosaicGrid from "@/components/mosaic-grid"



const Gallery = dynamic(() => import("@/components/gallery"), { ssr: false })
const SkillsGrid = dynamic(() => import("@/components/skills-grid"), { ssr: false })
const Testimonials = dynamic(() => import("@/components/testimonials").then(mod => ({ default: mod.Testimonials })), { ssr: false })
const Section6Mission = dynamic(() => import("@/components/section6-mission").then(mod => ({ default: mod.Section6Mission })), { ssr: false })
const Section7Pricing = dynamic(() => import("@/components/section7-pricing").then(mod => ({ default: mod.Section7Pricing })), { ssr: false })
const Section8FAQ = dynamic(() => import("@/components/section8-faq").then(mod => ({ default: mod.Section8FAQ })), { ssr: false })
const Section9Contact = dynamic(() => import("@/components/section9-contact").then(mod => ({ default: mod.Section9Contact })), { ssr: false })
const Section10Footer = dynamic(() => import("@/components/section10-footer").then(mod => ({ default: mod.Section10Footer })), { ssr: false })

export default function Home() {
  const { isLoading, setSplineLoaded } = useAppLoading({
    minimumDisplayTime: 300,  // 0.3 seconds minimum
    maximumDisplayTime: 2000, // 2 seconds maximum
    developmentMode: false,   // Wait for Spline to load
  })

  const handleSplineLoad = () => {
    setSplineLoaded(true)
  }

  return (
    <>
      {/* Preloader */}
      <Preloader isVisible={isLoading} />
      
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
          <MosaicGrid />
        </div>
      </section>

      {/* 3-Day Activities Gallery */}
      <Gallery />

      {/* Skills & Features Grid */}
      <section id="skills">
      <SkillsGrid />
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
      <Testimonials />
      </section>

      {/* Mission Statement & Leadership */}
      <section id="mission">
      <Section6Mission />
      </section>

      {/* Pricing & Programs */}
      <section id="pricing">
      <Section7Pricing />
      </section>

      {/* FAQ */}
      <section id="faq">
      <Section8FAQ />
      </section>

      {/* Contact & Registration */}
      <section id="contact">
      <Section9Contact />
      </section>

      {/* Footer */}
      <Section10Footer />
    </main>
    </>
  )
}
