"use client"

import React from "react"
import { useSpotlight } from "../hooks/use-spotlight"
import { useMagnetism } from "../hooks/use-magnetism"
import { useClickEffect } from "../hooks/use-click-effect"
import CircularGallery from "./CircularGallery"

interface DayMosaicCard {
  title: string
  subtitle: string
  image: string
  isPlaceholder?: boolean
}

interface DayCircularGalleryProps {
  cards: DayMosaicCard[]
  dayNumber: number
  enableSpotlight?: boolean
  enableMagnetism?: boolean
  enableClickEffect?: boolean
}

export default function DayCircularGallery({ 
  cards, 
  dayNumber, 
  enableSpotlight = true, 
  enableMagnetism = true, 
  enableClickEffect = true 
}: DayCircularGalleryProps) {
  const displayCards = [...cards]
  
  while (displayCards.length < 8) {
    const placeholderIndex = displayCards.length - 6;
    if (placeholderIndex >= 0) {
      const placeholderData = getPlaceholderData(dayNumber, placeholderIndex);
      if (placeholderData) {
        displayCards.push(placeholderData);
      } else {
        break;
      }
    } else {
      break;
    }
  }

  const { gridRef, spotlightRef, spotlightRadius } = useSpotlight({ 
    spotlightRadius: 350, 
    enabled: enableSpotlight 
  })
  const { handleCardMouseMove, handleCardMouseLeave } = useMagnetism({ 
    enabled: enableMagnetism 
  })
  const { handleCardClick } = useClickEffect({ 
    enabled: enableClickEffect 
  })

  const galleryItems = displayCards.map(card => ({
    image: card.image,
    text: card.title
  }));

  return (
    <div 
      className="relative max-w-full mx-auto h-[600px]" 
      ref={gridRef}
      onMouseMove={handleCardMouseMove}
      onMouseLeave={handleCardMouseLeave}
      onClick={handleCardClick}
    >
      {enableSpotlight && (
        <div
          ref={spotlightRef}
          style={{
            position: 'absolute',
            pointerEvents: 'none',
            width: spotlightRadius * 2,
            height: spotlightRadius * 2,
            left: 0,
            top: 0,
            opacity: 0,
            borderRadius: '50%',
            background: `radial-gradient(circle, rgba(66, 217, 138, 0.18) 0%, rgba(37, 163, 96, 0.10) 60%, transparent 100%)`,
            transform: 'translate(-50%, -50%)',
            zIndex: 1,
            transition: 'opacity 0.3s',
          }}
        />
      )}
      <div style={{ height: '600px', position: 'relative', zIndex: 2 }}>
        <CircularGallery 
          items={galleryItems}
          bend={0} 
          textColor="#ffffff" 
          borderRadius={0.02} 
          scrollEase={0.02}
          scrollSpeed={1.4}
          font="bold 30px Satoshi"
        />
      </div>
    </div>
  )
}

function getPlaceholderData(dayNumber: number, placeholderIndex: number): DayMosaicCard | undefined {
  const placeholders = {
    1: [
      { title: "Team Building", subtitle: "Collaborative Skills", image: "/bento/day1-collaboration.webp" },
      { title: "Problem Solving", subtitle: "Critical Thinking", image: "/bento/day1-analytics.webp" },
    ],
    2: [
      { title: "Debugging", subtitle: "Error Resolution", image: "/bento/day2-testing.webp" },
      { title: "System Design", subtitle: "Architecture Planning", image: "/bento/day2-prototyping.webp" },
    ],
    3: [
      { title: "Mentorship", subtitle: "Guidance & Support", image: "/bento/day3-networking.webp" },
      { title: "Presentation Skills", subtitle: "Public Speaking", image: "/bento/day3-demo.webp" },
    ]
  };

  const dayPlaceholders = placeholders[dayNumber as keyof typeof placeholders];
  if (dayPlaceholders && placeholderIndex < dayPlaceholders.length) {
    return {
      ...dayPlaceholders[placeholderIndex],
      isPlaceholder: true
    };
  }
  return undefined;
} 