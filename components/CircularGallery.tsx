"use client"

import { useEffect, useRef } from "react"
import type { GalleryItem } from "@/lib/circular-gallery-ogl"
import { App as CircularGalleryApp } from "@/lib/circular-gallery-ogl"

export interface CircularGalleryProps {
  items?: GalleryItem[]
  bend?: number
  textColor?: string
  borderRadius?: number
  font?: string
  scrollSpeed?: number
  scrollEase?: number
}

export default function CircularGallery({
  items,
  bend = 3,
  textColor = "#ffffff",
  borderRadius = 0.05,
  font = "bold 30px Satoshi",
  scrollSpeed = 2,
  scrollEase = 0.05,
}: CircularGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const app = new CircularGalleryApp(containerRef.current, {
      items,
      bend,
      textColor,
      borderRadius,
      font,
      scrollSpeed,
      scrollEase,
    })
    return () => app.destroy()
  }, [items, bend, textColor, borderRadius, font, scrollSpeed, scrollEase])

  return (
    <div
      ref={containerRef}
      className="w-full h-full overflow-hidden cursor-grab active:cursor-grabbing"
    />
  )
} 