import { StickyNavigation } from "@/components/sticky-navigation"
import { Hero } from "@/components/hero"
import { Card, CardContent } from "@/components/ui/card"
import { Check, Zap, Shield, BarChart3, FileText } from "lucide-react"
import { Gallery } from "@/components/gallery"
import { SkillsGrid } from "@/components/skills-grid"
import { Testimonials } from "@/components/testimonials"
import { Section6Mission } from "@/components/section6-mission"
import { Section7Pricing } from "@/components/section7-pricing"
import { Section8FAQ } from "@/components/section8-faq"
import { Section9Contact } from "@/components/section9-contact"
import { Section10Footer } from "@/components/section10-footer"
import GalleryGrid from "@/components/gallery-grid"

// Sample images for the gallery grid
const allImages = [
  "/placeholder.svg?height=400&width=600",
  "/placeholder.svg?height=400&width=600",
  "/placeholder.svg?height=400&width=600",
  "/placeholder.svg?height=400&width=600",
  "/placeholder.svg?height=400&width=600",
  "/placeholder.svg?height=400&width=600",
  "/placeholder.svg?height=400&width=600",
  "/placeholder.svg?height=400&width=600",
  "/placeholder.svg?height=400&width=600",
  "/placeholder.svg?height=400&width=600",
  "/placeholder.svg?height=400&width=600",
  "/placeholder.svg?height=400&width=600",
  "/placeholder.svg?height=400&width=600",
  "/placeholder.svg?height=400&width=600",
  "/placeholder.svg?height=400&width=600",
  "/placeholder.svg?height=400&width=600",
  "/placeholder.svg?height=400&width=600",
  "/placeholder.svg?height=400&width=600",
]

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Sticky pill navbar */}
      <StickyNavigation />

      {/* Enhanced Hero with 3D robot */}
      <Hero />

      {/* New Gallery Grid Section */}
      <section id="gallery-preview" className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Quick Preview</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A glimpse into our hands-on STEM activities and student projects
            </p>
          </div>
          <GalleryGrid images={allImages} />
        </div>
      </section>

      {/* 3-Day Activities Gallery */}
      <Gallery />

      {/* Skills & Features Grid */}
      <SkillsGrid />

      {/* Testimonials Carousel */}
      <Testimonials />

      {/* Mission Statement & Leadership */}
      <Section6Mission />

      {/* Pricing & Programs */}
      <Section7Pricing />

      {/* FAQ */}
      <Section8FAQ />

      {/* Contact & Registration */}
      <Section9Contact />

      {/* Footer */}
      <Section10Footer />

      {/* Everything you need */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-16">Everything you need</h2>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="bg-black rounded-2xl p-8 relative overflow-hidden">
              <div className="bg-white rounded-lg p-6 transform rotate-3 shadow-2xl">
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Financial overview</h3>
              <p className="text-gray-600 mb-6">
                Get a complete picture of your business finances with real-time insights and automated reporting.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Real-time financial dashboard</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Automated expense tracking</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Custom financial reports</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Tax preparation assistance</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Zap, title: "Time tracking", description: "Track time across projects with precision" },
              { icon: FileText, title: "Invoicing", description: "Create and send professional invoices" },
              { icon: Shield, title: "Banking", description: "Secure financial data management" },
              { icon: BarChart3, title: "Inbox", description: "Centralized communication hub" },
            ].map((feature, i) => (
              <Card key={i} className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <feature.icon className="w-8 h-8 text-blue-600 mb-4" />
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
