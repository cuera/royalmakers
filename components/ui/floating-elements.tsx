"use client"

import type React from "react"

import { motion } from "framer-motion"

interface FloatingItem {
  icon: React.ReactNode
  x: string
  y: string
  delay: number
  duration: number
}

interface FloatingElementsProps {
  items: FloatingItem[]
  className?: string
}

export function FloatingElements({ items, className = "" }: FloatingElementsProps) {
  return (
    <div className={className}>
      {items.map((item, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: item.x, top: item.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 1, 0],
            y: [0, -20, -40, -60],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          {item.icon}
        </motion.div>
      ))}
    </div>
  )
}
