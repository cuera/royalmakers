"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Search } from "lucide-react"
import { useState } from "react"

const faqData = {
  "Program Details": [
    {
      question: "What age groups can participate in the MakerCamp?",
      answer:
        "Our programs are designed for students aged 8-16 years. We have age-appropriate activities and group students by skill level to ensure everyone gets the most out of their experience.",
    },
    {
      question: "What will my child learn during the camp?",
      answer:
        "Students will learn robotics, programming (Python/Arduino), 3D design, electronics, and problem-solving. They'll build actual robots, create mobile apps, and work on real-world projects.",
    },
    {
      question: "Do you provide certificates?",
      answer:
        "Yes! All participants receive a certificate of completion, and we also provide a digital portfolio showcasing their projects and achievements during the camp.",
    },
  ],
  "Technical Requirements": [
    {
      question: "Do students need prior programming experience?",
      answer:
        "No prior experience is required! Our curriculum is designed to accommodate complete beginners while also challenging students with some background knowledge.",
    },
    {
      question: "What equipment is provided?",
      answer:
        "We provide all necessary equipment including laptops, robotics kits, 3D printers, electronic components, and tools. Students also receive take-home kits based on their program tier.",
    },
    {
      question: "Can students bring their own devices?",
      answer:
        "While we provide all necessary equipment, students are welcome to bring their own laptops if they prefer. We'll help them set up the required software.",
    },
  ],
  Logistics: [
    {
      question: "What are the camp timings?",
      answer:
        "Daily sessions run from 9:00 AM to 5:00 PM with breaks for meals and activities. We also have extended care options available from 8:00 AM to 6:00 PM.",
    },
    {
      question: "Are meals included?",
      answer:
        "Meal inclusion depends on your program tier. Innovator and Pioneer programs include full meals and snacks, while Explorer includes light refreshments.",
    },
    {
      question: "What safety measures are in place?",
      answer:
        "We maintain strict safety protocols with trained supervisors, first aid facilities, and age-appropriate tools. All activities are designed with safety as the top priority.",
    },
  ],
  Registration: [
    {
      question: "How do I register my child?",
      answer:
        "You can register online through our website or contact us directly. We require a registration form, emergency contacts, and program fee payment to secure your spot.",
    },
    {
      question: "What is your cancellation policy?",
      answer:
        "We offer full refunds for cancellations made 7 days before the program start date. Cancellations within 7 days are eligible for 50% refund or program credit.",
    },
    {
      question: "Are there any discounts available?",
      answer:
        "Yes! We offer sibling discounts (10% off second child), early bird pricing (15% off if registered 30 days in advance), and group discounts for schools.",
    },
  ],
}

export function Section8FAQ() {
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null)

  // Filter FAQs based on search term
  const filteredFAQs = Object.entries(faqData).reduce(
    (acc, [category, questions]) => {
      const filteredQuestions = questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      if (filteredQuestions.length > 0) {
        acc[category] = filteredQuestions
      }
      return acc
    },
    {} as typeof faqData,
  )

  return (
    <section className="bg-black text-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-300">Find answers to common questions about our STEM programs</p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mb-12"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors"
          />
        </motion.div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {Object.entries(filteredFAQs).map(([category, questions], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="bg-gray-900/30 backdrop-blur-sm rounded-xl border border-gray-800"
            >
              {/* Category Header */}
              <button
                onClick={() => setExpandedCategory(expandedCategory === category ? null : category)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-800/50 transition-colors rounded-xl"
              >
                <h3 className="text-xl font-bold text-cyan-400">{category}</h3>
                <motion.div
                  animate={{ rotate: expandedCategory === category ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-6 h-6" />
                </motion.div>
              </button>

              {/* Questions */}
              <AnimatePresence>
                {expandedCategory === category && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 space-y-4">
                      {questions.map((faq, index) => (
                        <div key={index} className="border-l-2 border-gray-700 pl-4">
                          <button
                            onClick={() => {
                              const questionId = `${category}-${index}`
                              setExpandedQuestion(expandedQuestion === questionId ? null : questionId)
                            }}
                            className="w-full text-left mb-2 hover:text-cyan-400 transition-colors"
                          >
                            <h4 className="font-semibold">{faq.question}</h4>
                          </button>

                          <AnimatePresence>
                            {expandedQuestion === `${category}-${index}` && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {Object.keys(filteredFAQs).length === 0 && searchTerm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <p className="text-gray-400 text-lg">No FAQs found matching "{searchTerm}"</p>
            <button
              onClick={() => setSearchTerm("")}
              className="mt-4 text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Clear search
            </button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
