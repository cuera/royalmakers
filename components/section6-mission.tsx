"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useEffect, useState } from "react"

const missionText =
  "At Royal MakerCamp, we believe every child has the potential to become tomorrow's innovator. Our mission is to ignite curiosity, foster creativity, and build confidence through hands-on STEM education in collaboration with Sparkbee."

function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    // Calculate interval so the whole text appears in exactly 6 seconds (excluding initial delay)
    const totalDuration = 6000; // ms
    const interval = text.length > 0 ? totalDuration / text.length : 30;
    const timer = setTimeout(
      () => {
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1))
          setCurrentIndex(currentIndex + 1)
        }
      },
      currentIndex === 0 ? delay : interval,
    );

    return () => clearTimeout(timer);
  }, [currentIndex, text, delay]);

  return <span>{displayText}</span>
}

function GradientBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -top-1/2 -left-1/2 w-full h-full"
        animate={{
          background: [
            "radial-gradient(circle, rgba(132,0,255,0.1) 0%, transparent 50%)",
            "radial-gradient(circle, rgba(0,255,255,0.1) 0%, transparent 50%)",
            "radial-gradient(circle, rgba(255,0,132,0.1) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
    </div>
  )
}

const leaders = [
  {
    name: "Arup Mukhopadhyay",
    title: "Director, RGS",
    description: "Educational vision and school leadership",
    photo: "/arup (2).webp?height=120&width=120",
  },
  {
    name: "Nabojyoti Gupta",
    title: "Coordinator, RGS",
    description: "Program management and student engagement",
    photo: "/nabo.webp?height=120&width=120",
  },
  {
    name: "Sparkbee Partnership",
    title: "Technical Partner",
    description: "Technical expertise and industry connection",
    photo: "/dip.webp?height=120&width=120",
  },
]

export function Section6Mission() {
  return (
    <section className="bg-black text-white py-20 relative overflow-hidden">
      <GradientBackground />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Our Mission</h2>
          <div className="text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto text-subtitle-gray">
            <TypewriterText text={missionText} delay={500} />
          </div>
        </motion.div>

        {/* Leadership Profiles */}
        <div className="grid md:grid-cols-3 gap-8">
          {leaders.map((leader, index) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(66, 217, 138, 0.2)",
              }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 hover:border-neon-green-light transition-all duration-300 text-center"
            >
              <div className="relative mb-6">
                <Image
                  src={leader.photo || "/placeholder.svg"}
                  alt={leader.name}
                  width={120}
                  height={120}
                  className="rounded-full mx-auto border-4 border-neon-green"
                />
                <motion.div
                  className="absolute inset-0 rounded-full bg-neon-green/20"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
              </div>
              <h3 className="text-xl font-bold mb-2">{leader.name}</h3>
              <p className="text-neon-green-light font-medium mb-3">{leader.title}</p>
              <p className="text-subtitle-gray text-sm">{leader.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
