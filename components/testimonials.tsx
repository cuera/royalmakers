"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { SlidingTestimonials } from "./sliding-testimonials"

interface Testimonial {
  id: number
  name: string
  role: string
  photo: string
  rating: number
  quote: string
}

const testimonials = {
  students: [
    {
      id: 1,
      name: "Mihika Das",
      role: "Camper",
      photo: "/Mihika Das.webp?height=64&width=64",
      rating: 5,
      quote: "I loved building my first robot—why is it only 3 days? 😄",
    },
    {
      id: 2,
      name: "Arjun Sharma",
      role: "Student Participant",
      photo: "/Arjun Sharma.webp?height=64&width=64",
      rating: 5,
      quote: "The coding challenges were amazing! I learned Python and made my robot dance.",
    },
    {
      id: 3,
      name: "Priya Patel",
      role: "Young Innovator",
      photo: "/Priyal Patel.webp?height=64&width=64",
      rating: 5,
      quote: "Building circuits and seeing LEDs light up was magical. I want to be an engineer now!",
    },
  ],
  parents: [
    {
      id: 4,
      name: "Priyanka Garg",
      role: "Parent of Aarjav",
      photo: "/priya.jpeg?height=64&width=64",
      rating: 5,
      quote: "I would like to thank entire Summer Camp team for conducting this knowledgeable camp for the kids. Aarjav had great fun and is already looking forward for the next year",
    },
    {
      id: 5,
      name: "Mrs. Suruchi",
      role: "Parent",
      photo: "/Suruchi.jpeg?height=64&width=64",
      rating: 5,
      quote:
        "Thank you Nabojyoti and team for organising such a wonderful MakerCamp.Amaya had a very new and a great learning experience at the workshop.",
    },
    {
      id: 6,
      name: "Payal Agarwal",
      role: "Mother of Darsh",
      photo: "/payal.jpeg?height=64&width=64",
      rating: 5,
      quote:
        "Thank you Sir, for the wonderful robot-making camp! Darsh really enjoyed it a lot,.",
    },
    {
      id: 7,
      name: "Dr.Singh",
      role: "Parent",
      photo: "/parent.jpg?height=64&width=64",
      rating: 5,
      quote:
        "Exceptional program! The hands-on approach and expert guidance transformed my daughter's interest in STEM.",
    },
  ],
  educators: [
    {
      id: 8,
      name: "Arup Mukhopadhyay",
      role: "Director, RGS",
      photo: "/Arup Kr. Mukhopdhyay.webp?height=64&width=64",
      rating: 5,
      quote: "Seeing young minds design and build real robots in just 3 days was truly inspiring.",
    },
    {
      id: 9,
      name: "Nabojyoti Gupta",
      role: "Coordinator, RGS",
      photo: "/Nabojyoti Gupta.webp?height=64&width=64",
      rating: 5,
      quote: "The level of engagement and practical learning exceeded all expectations.",
    },
    {
      id: 10,
      name: "Explorer Dip",
      role: "STEM Education Specialist",
      photo: "/Sparkbee.webp?height=64&width=64",
      rating: 5,
      quote:
        "This program sets the gold standard for hands-on STEM education. Remarkable results in such a short time.",
    },
  ],
  sparkbee: [
    {
      id: 11,
      name: "Sparkbee Team",
      role: "Industry Partner",
      photo: "/logo.webp?height=128&width=128",
      rating: 5,
      quote: "Collaborating on this camp was seamless—our students gained real-world skills in robotics and coding.",
    },
    {
      id: 12,
      name: "Tech Innovation Hub",
      role: "Corporate",
      photo: "/112.webp?height=32&width=32",
      rating: 5,
      quote:
        "Supporting this initiative aligns perfectly with our mission to nurture the next generation of innovators.",
    },
  ],
}

type TabKey = keyof typeof testimonials

export function Testimonials() {
  const [activeTab, setActiveTab] = useState<TabKey>("students")

  const tabs = [
    { key: "students" as TabKey, label: "Student Feedback" },
    { key: "parents" as TabKey, label: "Parent Testimonials" },
    { key: "educators" as TabKey, label: "Educator Endorsements" },
    { key: "sparkbee" as TabKey, label: "Sparkbee Partnership" },
  ]

  return (
    <section className="bg-black text-white py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">What People Say</h2>
          <p className="text-xl text-subtitle-gray max-w-3xl mx-auto">
            Hear from students, parents, educators, and partners about their transformative experience with our STEM
            program
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === tab.key
                  ? "bg-neon-green text-black shadow-[0_0_20px_rgba(66,217,138,0.4)]"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white border border-gray-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Testimonials Carousel */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="min-h-[400px]"
        >
          <SlidingTestimonials
            testimonials={testimonials[activeTab]}
            autoRotate
            rotateInterval={5000}
            showNavArrows
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            cardClassName="bg-gray-900 border border-gray-700 rounded-xl p-8 shadow-lg"
            photoClassName="w-16 h-16 rounded-full border-2 border-white object-cover"
            ratingColor="#25a360"
            textClassName="text-lg leading-relaxed"
            dotColor="#1E441E"
            activeDotColor="#25a360"
          />
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-gray-800"
        >
          {[
            { number: "500+", label: "Students Trained" },
            { number: "98%", label: "Satisfaction Rate" },
            { number: "50+", label: "Projects Built" },
            { number: "3", label: "Days to Transform" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-neon-green mb-2">{stat.number}</div>
              <div className="text-subtitle-gray">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
