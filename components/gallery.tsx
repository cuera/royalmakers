"use client"

import React from "react"
import { motion } from "framer-motion"
import DayCircularGallery from "./DayCircularGallery"

// Types for better organization
interface DayMosaicCard {
  title: string
  subtitle: string
  image: string
}

interface DayActivity {
  id: string
  title: string
  subtitle: string
  cards: DayMosaicCard[]
}

// Centralized activity data with real image paths
const ACTIVITY_DAYS: DayActivity[] = [
  {
    id: "day-1",
    title: "Day 1 — Foundation Building",
    subtitle: "Discovery & Exploration",
    cards: [
      {
        title: "Analytics",
        subtitle: "Track user behavior and engagement",
        image: "/bento/day1-analytics.webp"
      },
      {
        title: "Dashboard",
        subtitle: "Centralized data visualization",
        image: "/bento/day1-dashboard.webp"
      },
      {
        title: "Collaboration",
        subtitle: "Work together seamlessly on projects",
        image: "/bento/day1-collaboration.webp"
      },
      {
        title: "Automation",
        subtitle: "Streamline workflows and processes",
        image: "/bento/day1-automation.webp"
      },
      {
        title: "Integration",
        subtitle: "Connect and sync favorite tools",
        image: "/bento/day1-integration.webp"
      },
      {
        title: "Security",
        subtitle: "Enterprise-grade data protection",
        image: "/bento/day1-security.webp"
      }
    ]
  },
  {
    id: "day-2",
    title: "Day 2 — Advanced Projects",
    subtitle: "Creation & Development",
    cards: [
      {
        title: "Prototyping",
        subtitle: "Rapid iteration and design thinking",
        image: "/bento/day2-prototyping.webp"
      },
      {
        title: "Coding",
        subtitle: "Build real applications and systems",
        image: "/bento/day2-coding.webp"
      },
      {
        title: "Quality Assurance",
        subtitle: "Ensure robust and reliable solutions",
        image: "/bento/day2-testing.webp"
      },
      {
        title: "CI/CD Pipeline",
        subtitle: "Automate releases and deployments",
        image: "/bento/day2-deployment.webp"
      },
      {
        title: "Observability",
        subtitle: "Track performance and health metrics",
        image: "/bento/day2-monitoring.webp"
      },
      {
        title: "Help Desk",
        subtitle: "Provide user assistance and support",
        image: "/bento/day2-support.webp"
      }
    ]
  },
  {
    id: "day-3",
    title: "Day 3 — Final Showcase",
    subtitle: "Presentation & Celebration",
    cards: [
      {
        title: "Demo Day",
        subtitle: "Present projects to peers and mentors",
        image: "/bento/day3-demo.webp"
      },
      {
        title: "Peer Review",
        subtitle: "Receive constructive insights and feedback",
        image: "/bento/day3-review.webp"
      },
      {
        title: "Awards Ceremony",
        subtitle: "Celebrate outstanding achievements",
        image: "/bento/day3-awards.webp"
      },
      {
        title: "Retrospective",
        subtitle: "Learn from experiences and improve",
        image: "/bento/day3-reflection.webp"
      },
      {
        title: "Roadmap Planning",
        subtitle: "Plan next steps and future projects",
        image: "/bento/day3-roadmap.webp"
      },
      {
        title: "Networking",
        subtitle: "Build lasting connections and mentorships",
        image: "/bento/day3-networking.webp"
      }
    ]
  }
]

// Animation variants
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1] as any
    }
  }
}

const titleVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as any
    }
  }
}

// Day Activity Section Component
interface DayActivitySectionProps {
  activity: DayActivity
  index: number
}

function DayActivitySection({ activity, index }: DayActivitySectionProps) {
  return (
      <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
      className="mb-20 last:mb-0"
    >
      <div className="text-center mb-12">
        <motion.h2
          variants={titleVariants}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          {activity.title}
        </motion.h2>
        <motion.h3
          variants={titleVariants}
          className="text-2xl md:text-3xl font-medium text-subtitle-gray mb-6"
        >
          {activity.subtitle}
        </motion.h3>
      </div>
      
      <DayCircularGallery 
        cards={activity.cards}
        dayNumber={index + 1}
          />
        </motion.div>
  )
}

// Main Gallery Component
const Gallery = React.memo(function Gallery() {
  return (
    <section className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
          className="text-center mb-20"
        >
            <motion.h1
            variants={titleVariants}
            className="text-5xl md:text-7xl font-bold mb-8 text-neon-green"
            >
              3-Day Innovation Journey
            </motion.h1>
            <motion.p
            variants={titleVariants}
            className="text-2xl text-subtitle-gray max-w-4xl mx-auto leading-relaxed"
          >
            Experience the transformation as young minds explore, create, and innovate through our comprehensive STEM program
            </motion.p>
        </motion.div>

        {/* Activity Days */}
        {ACTIVITY_DAYS.map((activity, index) => (
          <DayActivitySection
            key={activity.id}
            activity={activity}
            index={index}
          />
        ))}
        </div>
      </section>
  )
})

export default Gallery
