"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import Image from "next/image"

interface MagicBentoProps {
  items: string[]
  textAutoHide?: boolean
  enableStars?: boolean
  enableSpotlight?: boolean
  enableBorderGlow?: boolean
  enableTilt?: boolean
  enableMagnetism?: boolean
  clickEffect?: boolean
  spotlightRadius?: number
  particleCount?: number
  glowColor?: string
  className?: string
}

export default function MagicBento({
  items,
  textAutoHide = true,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  enableTilt = true,
  enableMagnetism = true,
  clickEffect = true,
  spotlightRadius = 300,
  particleCount = 12,
  glowColor = "132, 0, 255",
  className = "",
}: MagicBentoProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])

  // Initialize particles
  useEffect(() => {
    if (enableStars) {
      const newParticles = Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2,
      }))
      setParticles(newParticles)
    }
  }, [enableStars, particleCount])

  // Mouse tracking for spotlight
  useEffect(() => {
    if (!enableSpotlight) return

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("mousemove", handleMouseMove)
      return () => container.removeEventListener("mousemove", handleMouseMove)
    }
  }, [enableSpotlight])

  // Specific 3x3 bento grid layout for 6 cards
  const getGridClass = (index: number) => {
    const layouts = [
      "col-span-1 row-span-1", // Card 1: Regular (top-left)
      "col-span-2 row-span-1", // Card 2: Wide span (top-middle, spans 2 cols)
      "col-span-1 row-span-2", // Card 3: Tall span (right side, spans 2 rows)
      "col-span-1 row-span-1", // Card 4: Regular (middle-left)
      "col-span-1 row-span-1", // Card 5: Regular (bottom-left)
      "col-span-1 row-span-1", // Card 6: Regular (bottom-middle)
    ]
    return layouts[index] || "col-span-1 row-span-1"
  }

  // Click effect handler
  const handleClick = (e: React.MouseEvent, index: number) => {
    if (!clickEffect) return

    const target = e.currentTarget as HTMLElement
    const rect = target.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Create ripple effect
    const ripple = document.createElement("div")
    ripple.className = "absolute rounded-full bg-white/30 pointer-events-none"
    ripple.style.left = `${x}px`
    ripple.style.top = `${y}px`
    ripple.style.transform = "translate(-50%, -50%)"
    target.appendChild(ripple)

    gsap.fromTo(
      ripple,
      {
        width: 0,
        height: 0,
        opacity: 1,
      },
      {
        width: 200,
        height: 200,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => ripple.remove(),
      },
    )
  }

  // Magnetism effect
  const handleMouseEnter = (e: React.MouseEvent) => {
    if (!enableMagnetism) return
    const target = e.currentTarget as HTMLElement
    gsap.to(target, {
      scale: 1.02,
      duration: 0.3,
      ease: "power2.out",
    })
  }

  const handleMouseLeave = (e: React.MouseEvent) => {
    if (!enableMagnetism) return
    const target = e.currentTarget as HTMLElement
    gsap.to(target, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    })
  }

  // Tilt effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!enableTilt) return
    const target = e.currentTarget as HTMLElement
    const rect = target.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 15
    const rotateY = (centerX - x) / 15

    gsap.to(target, {
      rotationX: rotateX,
      rotationY: rotateY,
      duration: 0.3,
      ease: "power2.out",
      transformPerspective: 1000,
    })
  }

  const handleTiltLeave = (e: React.MouseEvent) => {
    if (!enableTilt) return
    const target = e.currentTarget as HTMLElement
    gsap.to(target, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.3,
      ease: "power2.out",
    })
  }

  // Only show first 6 items for the 3x3 grid
  const displayItems = items.slice(0, 6)

  return (
    <div ref={containerRef} className={`relative overflow-hidden bento-section ${className}`}>
      {/* Spotlight effect */}
      {enableSpotlight && (
        <div
          className="absolute pointer-events-none z-10 rounded-full opacity-20"
          style={{
            background: `radial-gradient(circle at center, rgba(${glowColor}, 0.3) 0%, transparent 70%)`,
            width: spotlightRadius * 2,
            height: spotlightRadius * 2,
            left: mousePosition.x - spotlightRadius,
            top: mousePosition.y - spotlightRadius,
            transition: "all 0.1s ease-out",
          }}
        />
      )}

      {/* Particle stars */}
      {enableStars && (
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute w-1 h-1 bg-white rounded-full opacity-60"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                animation: `twinkle 2s infinite ${particle.delay}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* 3x3 Bento Grid with enhanced styling */}
      <div className="grid grid-cols-3 auto-rows-[200px] relative z-20 card-responsive max-w-4xl mx-auto">
        {displayItems.map((item, index) => (
          <div
            key={index}
            className={`card relative overflow-hidden cursor-pointer group ${getGridClass(index)}`}
            onClick={(e) => handleClick(e, index)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleTiltLeave}
          >
            {/* Image */}
            <Image
              src={item || "/placeholder.svg"}
              alt={`Activity ${index + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Overlay with text */}
            <div
              className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-200 ${
                textAutoHide ? "opacity-0 group-hover:opacity-100" : "opacity-100"
              }`}
            >
              <span className="text-white font-semibold text-lg">Activity {index + 1}</span>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        /* Enhanced Gallery Overrides */
        .bento-section.card-responsive {
          display: grid !important;
          grid-template-columns: repeat(3, 1fr);
          grid-auto-rows: auto;
          gap: 1rem;          /* 1rem between cards */
          padding: 0 !important;
        }
        
        .bento-section.card-responsive .card {
          border: 1px solid #444;    /* thin gray border */
          border-radius: 0.75rem;     /* round corners */
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        
        .bento-section.card-responsive .card:hover {
          border-color: #0ff;         /* neon blue on hover */
          box-shadow: 0 0 8px rgba(0,255,255,0.6);
        }
        
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
      `}</style>
    </div>
  )
}
