"use client"

import React from "react"
import { motion } from "framer-motion"
import DayCircularGalleryMobile from "./day-circular-gallery-mobile"
import { generateAllDaysImages } from "../utils/image-generator"

const DAY_TITLES = [
  {
    title: "Day 1 — Foundation Building",
    subtitle: "Discovery & Exploration"
  },
  {
    title: "Day 2 — Advanced Projects", 
    subtitle: "Creation & Development"
  },
  {
    title: "Day 3 — Final Showcase",
    subtitle: "Presentation & Celebration"
  }
]

export default function GalleryMobile() {
  // Auto-generate all days data
  const allDaysData = generateAllDaysImages()
  return (
    <section className="bg-black text-white py-10">
      <div className="max-w-lg mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-bold mb-4 text-neon-green">
            3-Day Innovation Journey
          </h1>
          <p className="text-base text-subtitle-gray max-w-xs mx-auto">
            Experience the transformation as young minds explore, create, and innovate through our comprehensive STEM program.
          </p>
        </motion.div>

        {/* Auto-generated Days */}
        {allDaysData.map((dayData, index) => (
          <motion.div
            key={`day-${dayData.day}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="mb-16 last:mb-0"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">
                {DAY_TITLES[index]?.title || `Day ${dayData.day}`}
              </h2>
              <h3 className="text-base text-subtitle-gray">
                {DAY_TITLES[index]?.subtitle || "Learning Experience"}
              </h3>
            </div>
            <DayCircularGalleryMobile dayNumber={dayData.day} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
