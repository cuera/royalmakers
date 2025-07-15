"use client"

import { motion } from "framer-motion"

interface SplitTextProps {
  children: string
  className?: string
  delay?: number
}

export function SplitText({ children, className = "", delay = 0 }: SplitTextProps) {
  const words = children.split(" ")

  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.1,
            ease: "easeOut",
          }}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}
