"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface GalleryGridProps {
  images: string[]
  className?: string
}

export default function GalleryGrid({ images, className = "" }: GalleryGridProps) {
  // Only show first 6 images for the asymmetric layout
  const displayImages = images.slice(0, 6)

  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[200px]">
        {displayImages.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className={`
              border border-gray-700 rounded-lg overflow-hidden
              hover:border-blue-400 hover:shadow-[0_0_8px_rgba(0,255,255,0.6)]
              transition-all duration-300
              ${i === 2 ? "lg:row-span-2" : ""}
              ${i === 3 ? "lg:col-span-2" : ""}
            `}
          >
            <div className="relative w-full h-full">
              <Image
                src={src || "/placeholder.svg"}
                alt={`Gallery image ${i + 1}`}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
              />

              {/* Overlay with activity label */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                <span className="text-white font-semibold text-lg">Activity {i + 1}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
