"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { SplitText } from "@/components/ui/split-text"
import { ShinyText } from "@/components/ui/shiny-text"
import { FloatingElements } from "@/components/ui/floating-elements"
import { Cpu, Zap, Cog } from "lucide-react"

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const scale = useTransform(scrollYProgress, [0, 0.5], [1.2, 1.3])
  const rotateY = useTransform(scrollYProgress, [0, 0.5], [0, 15])

  const floatingItems = [
    {
      icon: <Cpu className="w-8 h-8 text-purple-400" />,
      x: "10%",
      y: "20%",
      delay: 0,
      duration: 4,
    },
    {
      icon: <Zap className="w-6 h-6 text-blue-400" />,
      x: "80%",
      y: "30%",
      delay: 1,
      duration: 3.5,
    },
    {
      icon: <Cog className="w-7 h-7 text-green-400" />,
      x: "15%",
      y: "70%",
      delay: 2,
      duration: 4.5,
    },
  ]

  return (
    <section
      ref={ref}
      className="h-screen bg-black relative overflow-hidden flex flex-col items-center justify-center px-4"
    >
      {/* Floating Background Accents */}
      <FloatingElements items={floatingItems} className="absolute inset-0 md:hidden" />

      {/* Spline Robot - Centered & Zoomed */}
      <motion.div
        style={{ scale, rotateY }}
        className="
          absolute inset-0
          z-0
          w-[150%]
          max-w-none
          h-[90vh] md:h-[100vh]
          m-auto
          perspective-600
          transform-gpu
          origin-center
        "
      >
        <iframe
          src="https://my.spline.design/nexbotrobotcharacterconcept-Rq2GNSjbsa4Lto0np1CbTlik/"
          frameBorder="0"
          width="100%"
          height="100%"
          className="w-full h-full rounded-xl shadow-2xl"
          loading="eager"
          title="AI Assistant Robot"
        />
      </motion.div>

      {/* Overlay Headline & Subtitle - Positioned over robot */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
        {/* Animated Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-white font-bold tracking-tight text-4xl md:text-5xl lg:text-6xl text-center mb-6 pointer-events-auto"
        >
          <SplitText>Where Young Minds Create Tomorrow's Innovations</SplitText>
        </motion.h1>

        {/* Split Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto pointer-events-auto"
        >
          <motion.p className="text-gray-200 text-base md:text-lg lg:text-xl leading-relaxed">
            Join <ShinyText text="India's premier hands-on STEM program" speed={4} className="inline" /> where students
            master robotics, AI, coding, and aeromodelling through immersive, project-based learning at Royal Global
            School, Guwahati
          </motion.p>
        </motion.div>
      </div>

      {/* CTAs */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex flex-col sm:flex-row gap-4 z-30">
        <motion.a
          href="#enroll"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.6,
            delay: 1,
            type: "spring",
            stiffness: 200,
          }}
          whileHover={{
            boxShadow: "0 0 30px rgba(147, 51, 234, 0.5)",
            scale: 1.05,
          }}
          whileTap={{ scale: 0.95 }}
          className="rounded-full bg-purple-600 px-6 py-3 text-white shadow-lg hover:bg-purple-700 transition-colors font-semibold text-center"
        >
          Enroll Your Innovator
        </motion.a>

        <motion.a
          href="#watch"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.6,
            delay: 1.2,
            type: "spring",
            stiffness: 200,
          }}
          whileHover={{
            boxShadow: "0 0 20px rgba(255, 255, 255, 0.2)",
            scale: 1.05,
          }}
          whileTap={{ scale: 0.95 }}
          className="rounded-full border border-white/50 px-6 py-3 text-white backdrop-blur-sm hover:bg-white/10 transition-colors font-semibold text-center"
        >
          Watch Our Camp
        </motion.a>
      </div>

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none z-10" />
    </section>
  )
}
