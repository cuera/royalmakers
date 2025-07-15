"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

interface Testimonial {
  id: number
  name: string
  role: string
  photo: string
  rating: number
  quote: string
}

interface SlidingTestimonialsProps {
  testimonials: Testimonial[]
  autoRotate?: boolean
  rotateInterval?: number
  showNavArrows?: boolean
  transition?: any
  cardClassName?: string
  photoClassName?: string
  ratingColor?: string
  textClassName?: string
}

export function SlidingTestimonials({
  testimonials,
  autoRotate = true,
  rotateInterval = 5000,
  showNavArrows = true,
  transition = { type: "spring", stiffness: 120, damping: 20 },
  cardClassName = "bg-gray-900 border border-gray-700 rounded-xl p-6 shadow-lg",
  photoClassName = "w-16 h-16 rounded-full border-2 border-white",
  ratingColor = "#0ff",
  textClassName = "text-lg leading-relaxed",
}: SlidingTestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Auto-rotate functionality
  useEffect(() => {
    if (!autoRotate || isPaused || testimonials.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, rotateInterval)

    return () => clearInterval(interval)
  }, [autoRotate, isPaused, rotateInterval, testimonials.length])

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  if (!testimonials.length) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-400">No testimonials available</p>
      </div>
    )
  }

  return (
    <div className="relative" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      {/* Main testimonial display */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={transition}
            className={`${cardClassName} hover:scale-[1.02] hover:border-cyan-400 hover:shadow-[0_0_8px_rgba(0,255,255,0.6)] transition-all duration-300`}
          >
            <div className="flex flex-col items-center text-center space-y-4">
              {/* Profile photo */}
              <Image
                src={testimonials[currentIndex].photo || "/placeholder.svg"}
                alt={testimonials[currentIndex].name}
                width={64}
                height={64}
                className={photoClassName}
              />

              {/* Rating stars */}
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < testimonials[currentIndex].rating ? "fill-current text-cyan-400" : "text-gray-600"
                    }`}
                    style={{ color: i < testimonials[currentIndex].rating ? ratingColor : undefined }}
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className={`${textClassName} text-white max-w-2xl`}>
                "{testimonials[currentIndex].quote}"
              </blockquote>

              {/* Name and role */}
              <div className="space-y-1">
                <p className="font-semibold text-white text-xl">{testimonials[currentIndex].name}</p>
                <p className="text-gray-400">{testimonials[currentIndex].role}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation arrows */}
      {showNavArrows && testimonials.length > 1 && (
        <>
          <button
            onClick={goToPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </>
      )}

      {/* Dot navigation */}
      {testimonials.length > 1 && (
        <div className="flex justify-center space-x-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? "bg-cyan-400" : "bg-gray-600 hover:bg-gray-500"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
