"use client"

import React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Cpu, Zap, Code, Palette, Rocket, Brain, ChevronDown, ChevronUp } from "lucide-react"

const iconMap = {
  Cpu,
  Zap,
  Code,
  Palette,
  Rocket,
  Brain,
}

const features = [
  {
    id: 1,
    icon: "Cpu",
    title: "Robotics Mastery",
    description: "Remote-controlled robots, line-following bots",
    example:
      "Built 3 Rover bots that navigate mazes autonomously using advanced sensor arrays and AI pathfinding algorithms",
    progress: 85,
  },
  {
    id: 2,
    icon: "Zap",
    title: "Electronics Innovation",
    description: "Circuit design, traffic signals, logic gates",
    example:
      "Created an automated traffic system demo with smart sensors, LED displays, and real-time traffic flow optimization",
    progress: 78,
  },
  {
    id: 3,
    icon: "Code",
    title: "Programming Excellence",
    description: "Python, Arduino, AI algorithms",
    example: "Developed machine learning models for image recognition and built IoT systems with cloud connectivity",
    progress: 92,
  },
  {
    id: 4,
    icon: "Palette",
    title: "3D Design & Printing",
    description: "CAD modeling, prototyping, manufacturing",
    example:
      "Designed and printed custom drone frames, robotic parts, and architectural models using advanced CAD software",
    progress: 73,
  },
  {
    id: 5,
    icon: "Rocket",
    title: "Aeromodelling",
    description: "Aircraft design, flight dynamics, control systems",
    example: "Built remote-controlled aircraft with GPS navigation, camera systems, and autonomous flight capabilities",
    progress: 81,
  },
  {
    id: 6,
    icon: "Brain",
    title: "AI & Machine Learning",
    description: "Neural networks, computer vision, data analysis",
    example: "Implemented facial recognition systems, chatbots, and predictive models for real-world applications",
    progress: 76,
  },
]

interface FeatureCardProps {
  feature: (typeof features)[0]
  index: number
}

function FeatureCard({ feature, index }: FeatureCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const IconComponent = iconMap[feature.icon as keyof typeof iconMap]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-neon-green-light transition-all duration-300"
      whileHover={{
        scale: 1.03,
        boxShadow: "0 10px 30px rgba(37, 163, 96, 0.25)",
      }}
    >
      {/* Icon and Header */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-neon-green-light via-neon-green to-neon-green-dark rounded-lg flex items-center justify-center">
          <IconComponent className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">{feature.title}</h3>
          <p className="text-subtitle-gray text-sm">{feature.description}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-subtitle-gray">Mastery Level</span>
          <span className="text-sm font-semibold text-neon-green-light">{feature.progress}%</span>
        </div>
        <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-neon-green-light via-neon-green to-neon-green-dark rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: `${feature.progress}%` }}
            transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
          />
        </div>
      </div>

      {/* Learn More Toggle */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-neon-green hover:text-neon-green-light transition-colors text-sm font-medium"
      >
        Learn More
        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {/* Expandable Content */}
      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? "auto" : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="pt-4 border-t border-gray-800 mt-4">
          <p className="text-subtitle-gray text-sm leading-relaxed">{feature.example}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

const SkillsGrid = React.memo(function SkillsGrid() {
  return (
    <section className="bg-black text-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Skills & Innovation Areas</h2>
          <p className="text-xl text-subtitle-gray max-w-3xl mx-auto">
            Discover the cutting-edge technologies and skills our students master through hands-on projects and
            real-world applications
          </p>
        </motion.div>

        {/* Unified Grid Layout */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={feature.id} feature={feature} index={index} />
              ))}
            </div>
          </motion.div>
      </div>
    </section>
  )
})
export default SkillsGrid
