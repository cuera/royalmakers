"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Cpu, Zap, Code, Palette, Rocket, Brain, ChevronDown, ChevronUp } from "lucide-react"
import Stack from "./stack"

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
      className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-purple-500/50 transition-all duration-300"
      whileHover={{
        scale: 1.03,
        boxShadow: "0 10px 30px rgba(132, 0, 255, 0.2)",
      }}
    >
      {/* Icon and Header */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
          <IconComponent className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">{feature.title}</h3>
          <p className="text-gray-400 text-sm">{feature.description}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-400">Mastery Level</span>
          <span className="text-sm font-semibold text-purple-400">{feature.progress}%</span>
        </div>
        <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: `${feature.progress}%` }}
            transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
          />
        </div>
      </div>

      {/* Learn More Toggle */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors text-sm font-medium"
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
          <p className="text-gray-300 text-sm leading-relaxed">{feature.example}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

function StackedCards() {
  const stackData = features.map((f) => ({ id: f.id, img: f.icon }))

  return (
    <div className="flex flex-col items-center">
      <Stack
        randomRotation
        sensitivity={180}
        sendToBackOnClick={false}
        cardDimensions={{ width: 280, height: 280 }}
        cardsData={stackData}
      >
        {features.map((feature, index) => {
          const IconComponent = iconMap[feature.icon as keyof typeof iconMap]
          return (
            <div
              key={feature.id}
              className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-xl border border-gray-700 flex flex-col items-center justify-center p-6 text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center mb-4">
                <IconComponent className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{feature.description}</p>
              <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"
                  style={{ width: `${feature.progress}%` }}
                />
              </div>
              <span className="text-purple-400 text-sm font-semibold mt-2">{feature.progress}% Mastery</span>
            </div>
          )
        })}
      </Stack>
    </div>
  )
}

export function SkillsGrid() {
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
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover the cutting-edge technologies and skills our students master through hands-on projects and
            real-world applications
          </p>
        </motion.div>

        {/* Desktop: Stacked Cards */}
        <div className="hidden lg:block mb-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <StackedCards />
          </motion.div>
        </div>

        {/* Mobile & Tablet: Grid Layout */}
        <div className="lg:hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={feature.id} feature={feature} index={index} />
            ))}
          </div>
        </div>

        {/* Desktop: Feature Details Grid */}
        <div className="hidden lg:block">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-center mb-12">Detailed Skill Breakdown</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <FeatureCard key={`detail-${feature.id}`} feature={feature} index={index} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
