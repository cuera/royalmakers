"use client"

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"

interface GalleryGridMobileProps {
  images: string[]
  className?: string
}

export default function GalleryGridMobile({ images, className = "" }: GalleryGridMobileProps) {
  // Show first 6 images in mobile-optimized layout
  const displayImages = images.slice(0, 6)

  return (
    <div className={`max-w-sm mx-auto ${className}`}>
      {/* Single column stack for mobile */}
      <div className="space-y-3">
        {displayImages.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="relative h-48 rounded-lg overflow-hidden border border-gray-700 hover:border-blue-400 transition-colors duration-300"
          >
            <Image
              src={src || "/placeholder.svg"}
              alt={`Gallery image ${i + 1}`}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20 hover:bg-black/40 transition-colors duration-200 flex items-center justify-center opacity-0 hover:opacity-100">
              <span className="text-white font-semibold text-sm">Activity {i + 1}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}