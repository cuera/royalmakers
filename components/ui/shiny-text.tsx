"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface ShinyTextProps {
  text: string
  speed?: number
  className?: string
}

export function ShinyText({ text, speed = 3, className = "" }: ShinyTextProps) {
  const [shimmerPosition, setShimmerPosition] = useState(-100)

  useEffect(() => {
    const interval = setInterval(() => {
      setShimmerPosition((prev) => (prev >= 100 ? -100 : prev + speed))
    }, 50)

    return () => clearInterval(interval)
  }, [speed])

  return (
    <span className={`relative inline-block overflow-hidden ${className}`}>
      <span className="relative z-10">{text}</span>
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        style={{
          transform: `translateX(${shimmerPosition}%)`,
          width: "30%",
        }}
        animate={{
          x: ["-100%", "300%"],
        }}
        transition={{
          duration: speed,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
    </span>
  )
}
