"use client"

import { motion } from "framer-motion"

interface HeroProps {
  onSplineLoad?: () => void
}

const ctaTransition = {
  duration: 0.6,
  type: "spring" as const,
  stiffness: 200,
}

export function Hero({ onSplineLoad }: HeroProps) {
  return (
  <section className="h-screen bg-black relative overflow-hidden flex flex-col items-center justify-center px-4 max-w-full sm:max-w-none">
      <div className="absolute inset-0 w-full h-full">
    <iframe
      src="https://my.spline.design/nexbotrobotcharacterconcept-Rq2GNSjbsa4Lto0np1CbTlik/"
      className="w-full h-full rounded-xl shadow-2xl"
      loading="lazy"
      title="AI Assistant Robot"
          sandbox="allow-scripts allow-same-origin"
          onLoad={onSplineLoad}
        />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
        <h1 className="text-white font-bold tracking-tight text-4xl md:text-5xl lg:text-6xl text-center mb-6 pointer-events-auto">
          Where <span className="text-neon-green">Young Minds</span> Create Tomorrow's Innovations
        </h1>

        <div className="text-center max-w-2xl mx-auto pointer-events-auto">
          <span className="text-subtitle-gray text-base md:text-lg lg:text-xl leading-relaxed block">
            Join India's premier hands-on STEM program where students master robotics, AI, coding, and aeromodelling through immersive, project-based learning at Royal Global School, Guwahati
          </span>
        </div>
      </div>

      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex flex-col sm:flex-row gap-4 z-30">
        <motion.a
          href="#contact"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ ...ctaTransition, delay: 1.2 }}
          whileHover={{
            boxShadow: "0 0 20px rgba(37, 163, 96, 0.5)",
            scale: 1.05,
          }}
          whileTap={{ scale: 0.95 }}
          className="rounded-full border border-neon-green px-6 py-3 text-white backdrop-blur-sm hover:bg-neon-green/10 transition-colors font-semibold text-center"
        >
          Enroll Now
        </motion.a>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none z-10" />
    </section>
  )
}
