"use client"

import { motion } from "framer-motion"
import { Check, Star } from "lucide-react"
import { useState } from "react"

const pricingTiers = [
  {
    name: "Explorer",
    price: "₹2,999",
    duration: "1-day workshop",
    description: "Perfect for first-time makers",
    features: [
      "Basic robotics activities",
      "Introduction to coding",
      "Certificate of completion",
      "Light refreshments",
      "Take-home kit (basic)",
    ],
    popular: false,
  },
  {
    name: "Innovator",
    price: "₹7,999",
    duration: "3-day program",
    description: "Our most comprehensive experience",
    features: [
      "Complete robotics projects",
      "Advanced programming",
      "3D design & printing",
      "All materials included",
      "Daily meals & snacks",
      "Premium take-home kit",
      "Certificate & portfolio",
      "Photo & video memories",
    ],
    popular: true,
  },
  {
    name: "Pioneer",
    price: "₹12,999",
    duration: "5-day advanced",
    description: "For serious young innovators",
    features: [
      "Everything in Innovator",
      "Personal mentoring sessions",
      "Advanced AI & ML projects",
      "Drone building workshop",
      "Industry expert talks",
      "Premium maker kit",
      "Internship opportunities",
      "Alumni network access",
    ],
    popular: false,
  },
]

const comparisonFeatures = [
  { feature: "Duration", explorer: "1 day", innovator: "3 days", pioneer: "5 days" },
  { feature: "Robotics Projects", explorer: "Basic", innovator: "Advanced", pioneer: "Expert" },
  { feature: "Programming", explorer: "Intro", innovator: "Intermediate", pioneer: "Advanced" },
  { feature: "3D Design", explorer: "❌", innovator: "✅", pioneer: "✅" },
  { feature: "Meals Included", explorer: "Snacks", innovator: "Full meals", pioneer: "Premium meals" },
  { feature: "Take-home Kit", explorer: "Basic", innovator: "Premium", pioneer: "Deluxe" },
  { feature: "Mentoring", explorer: "❌", innovator: "Group", pioneer: "Personal" },
  { feature: "Certificate", explorer: "✅", innovator: "✅", pioneer: "✅" },
]

export function Section7Pricing() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null)

  return (
    <section className="bg-black text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Choose Your Adventure</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Select the perfect program to launch your child's journey into STEM innovation
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{
                scale: 1.02,
                boxShadow: tier.popular ? "0 25px 50px rgba(0,255,255,0.3)" : "0 25px 50px rgba(132,0,255,0.2)",
              }}
              className={`relative bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border transition-all duration-300 ${
                tier.popular
                  ? "border-cyan-400 shadow-[0_0_30px_rgba(0,255,255,0.2)]"
                  : "border-gray-800 hover:border-purple-400"
              }`}
              onClick={() => setExpandedCard(expandedCard === index ? null : index)}
            >
              {/* Popular Badge */}
              {tier.popular && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-400 to-blue-500 text-black px-6 py-2 rounded-full font-bold text-sm flex items-center gap-2"
                >
                  <Star className="w-4 h-4 fill-current" />
                  MOST POPULAR
                </motion.div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <div className="text-4xl font-bold mb-2">{tier.price}</div>
                <p className="text-cyan-400 font-medium mb-2">{tier.duration}</p>
                <p className="text-gray-400">{tier.description}</p>
              </div>

              <motion.div
                initial={false}
                animate={{ height: expandedCard === index ? "auto" : "200px" }}
                className="overflow-hidden"
              >
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                  tier.popular
                    ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-black hover:shadow-[0_0_20px_rgba(0,255,255,0.5)]"
                    : "bg-purple-600 hover:bg-purple-700 text-white"
                }`}
              >
                Register Now
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gray-900/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-800"
        >
          <h3 className="text-2xl font-bold text-center mb-8">Program Comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-4 px-4">Feature</th>
                  <th className="text-center py-4 px-4">Explorer</th>
                  <th className="text-center py-4 px-4">Innovator</th>
                  <th className="text-center py-4 px-4">Pioneer</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((row, index) => (
                  <motion.tr
                    key={row.feature}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b border-gray-800 hover:bg-gray-800/50"
                  >
                    <td className="py-4 px-4 font-medium">{row.feature}</td>
                    <td className="py-4 px-4 text-center text-gray-300">{row.explorer}</td>
                    <td className="py-4 px-4 text-center text-gray-300">{row.innovator}</td>
                    <td className="py-4 px-4 text-center text-gray-300">{row.pioneer}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
