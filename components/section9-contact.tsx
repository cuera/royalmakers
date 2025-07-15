"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { ChevronLeft, ChevronRight, MapPin, Phone, Mail, Facebook, Instagram, Twitter } from "lucide-react"

interface FormData {
  studentName: string
  age: string
  grade: string
  school: string
  parentName: string
  email: string
  phone: string
  emergencyContact: string
  program: string
  dietary: string
  accessibility: string
}

const initialFormData: FormData = {
  studentName: "",
  age: "",
  grade: "",
  school: "",
  parentName: "",
  email: "",
  phone: "",
  emergencyContact: "",
  program: "",
  dietary: "",
  accessibility: "",
}

function ConfettiBurst() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-cyan-400 rounded-full"
          initial={{
            x: "50vw",
            y: "50vh",
            scale: 0,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            delay: i * 0.02,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  )
}

export function Section9Contact() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const steps = [
    { title: "Student Info", fields: ["studentName", "age", "grade", "school"] },
    { title: "Parent/Guardian", fields: ["parentName", "email", "phone", "emergencyContact"] },
    { title: "Program Selection", fields: ["program"] },
    { title: "Additional Info", fields: ["dietary", "accessibility"] },
  ]

  const validateStep = (stepIndex: number) => {
    const stepFields = steps[stepIndex].fields
    const stepErrors: Partial<FormData> = {}

    stepFields.forEach((field) => {
      if (!formData[field as keyof FormData] && field !== "dietary" && field !== "accessibility") {
        stepErrors[field as keyof FormData] = "This field is required"
      }
    })

    setErrors(stepErrors)
    return Object.keys(stepErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(Math.min(currentStep + 1, steps.length - 1))
    }
  }

  const prevStep = () => {
    setCurrentStep(Math.max(currentStep - 1, 0))
  }

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      setIsSubmitted(true)
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3000)
    }
  }

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  if (isSubmitted) {
    return (
      <section className="bg-black text-white py-20">
        {showConfetti && <ConfettiBurst />}
        <div className="max-w-2xl mx-auto px-4 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}>
            <div className="text-6xl mb-6">🎉</div>
            <h2 className="text-4xl font-bold mb-4">Thank You!</h2>
            <p className="text-xl text-gray-300 mb-8">
              We've received your registration for {formData.studentName}. We'll be in touch within 24 hours to confirm
              your spot!
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false)
                setCurrentStep(0)
                setFormData(initialFormData)
              }}
              className="bg-cyan-400 text-black px-8 py-3 rounded-lg font-semibold hover:bg-cyan-300 transition-colors"
            >
              Register Another Student
            </button>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-black text-white py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Registration Form */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <h2 className="text-4xl font-bold mb-4">Register Now</h2>
              <p className="text-gray-300">Secure your child's spot in our innovative STEM program</p>
            </motion.div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                {steps.map((step, index) => (
                  <span key={index} className={`text-sm ${index <= currentStep ? "text-cyan-400" : "text-gray-500"}`}>
                    {step.title}
                  </span>
                ))}
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Form Steps */}
            <div className="bg-gray-900/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-800">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-bold mb-6">{steps[currentStep].title}</h3>

                  {/* Step 0: Student Info */}
                  {currentStep === 0 && (
                    <div className="space-y-4">
                      <div>
                        <input
                          type="text"
                          placeholder="Student Name *"
                          value={formData.studentName}
                          onChange={(e) => updateFormData("studentName", e.target.value)}
                          className={`w-full p-4 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none transition-colors ${
                            errors.studentName ? "border-red-500" : "border-gray-700 focus:border-cyan-400"
                          }`}
                        />
                        {errors.studentName && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-red-400 text-sm mt-1"
                          >
                            {errors.studentName}
                          </motion.p>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <input
                            type="number"
                            placeholder="Age *"
                            value={formData.age}
                            onChange={(e) => updateFormData("age", e.target.value)}
                            className={`w-full p-4 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none transition-colors ${
                              errors.age ? "border-red-500" : "border-gray-700 focus:border-cyan-400"
                            }`}
                          />
                          {errors.age && (
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-red-400 text-sm mt-1"
                            >
                              {errors.age}
                            </motion.p>
                          )}
                        </div>
                        <div>
                          <input
                            type="text"
                            placeholder="Grade *"
                            value={formData.grade}
                            onChange={(e) => updateFormData("grade", e.target.value)}
                            className={`w-full p-4 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none transition-colors ${
                              errors.grade ? "border-red-500" : "border-gray-700 focus:border-cyan-400"
                            }`}
                          />
                          {errors.grade && (
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-red-400 text-sm mt-1"
                            >
                              {errors.grade}
                            </motion.p>
                          )}
                        </div>
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="School Name *"
                          value={formData.school}
                          onChange={(e) => updateFormData("school", e.target.value)}
                          className={`w-full p-4 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none transition-colors ${
                            errors.school ? "border-red-500" : "border-gray-700 focus:border-cyan-400"
                          }`}
                        />
                        {errors.school && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-red-400 text-sm mt-1"
                          >
                            {errors.school}
                          </motion.p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Step 1: Parent Info */}
                  {currentStep === 1 && (
                    <div className="space-y-4">
                      <div>
                        <input
                          type="text"
                          placeholder="Parent/Guardian Name *"
                          value={formData.parentName}
                          onChange={(e) => updateFormData("parentName", e.target.value)}
                          className={`w-full p-4 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none transition-colors ${
                            errors.parentName ? "border-red-500" : "border-gray-700 focus:border-cyan-400"
                          }`}
                        />
                        {errors.parentName && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-red-400 text-sm mt-1"
                          >
                            {errors.parentName}
                          </motion.p>
                        )}
                      </div>
                      <div>
                        <input
                          type="email"
                          placeholder="Email Address *"
                          value={formData.email}
                          onChange={(e) => updateFormData("email", e.target.value)}
                          className={`w-full p-4 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none transition-colors ${
                            errors.email ? "border-red-500" : "border-gray-700 focus:border-cyan-400"
                          }`}
                        />
                        {errors.email && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-red-400 text-sm mt-1"
                          >
                            {errors.email}
                          </motion.p>
                        )}
                      </div>
                      <div>
                        <input
                          type="tel"
                          placeholder="Phone Number *"
                          value={formData.phone}
                          onChange={(e) => updateFormData("phone", e.target.value)}
                          className={`w-full p-4 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none transition-colors ${
                            errors.phone ? "border-red-500" : "border-gray-700 focus:border-cyan-400"
                          }`}
                        />
                        {errors.phone && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-red-400 text-sm mt-1"
                          >
                            {errors.phone}
                          </motion.p>
                        )}
                      </div>
                      <div>
                        <input
                          type="tel"
                          placeholder="Emergency Contact *"
                          value={formData.emergencyContact}
                          onChange={(e) => updateFormData("emergencyContact", e.target.value)}
                          className={`w-full p-4 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none transition-colors ${
                            errors.emergencyContact ? "border-red-500" : "border-gray-700 focus:border-cyan-400"
                          }`}
                        />
                        {errors.emergencyContact && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-red-400 text-sm mt-1"
                          >
                            {errors.emergencyContact}
                          </motion.p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Step 2: Program Selection */}
                  {currentStep === 2 && (
                    <div className="space-y-4">
                      {["Explorer (₹2,999)", "Innovator (₹7,999)", "Pioneer (₹12,999)"].map((program) => (
                        <label
                          key={program}
                          className={`block p-4 border rounded-lg cursor-pointer transition-colors ${
                            formData.program === program
                              ? "border-cyan-400 bg-cyan-400/10"
                              : "border-gray-700 hover:border-gray-600"
                          }`}
                        >
                          <input
                            type="radio"
                            name="program"
                            value={program}
                            checked={formData.program === program}
                            onChange={(e) => updateFormData("program", e.target.value)}
                            className="sr-only"
                          />
                          <span className="text-white font-medium">{program}</span>
                        </label>
                      ))}
                      {errors.program && (
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-sm">
                          {errors.program}
                        </motion.p>
                      )}
                    </div>
                  )}

                  {/* Step 3: Additional Info */}
                  {currentStep === 3 && (
                    <div className="space-y-4">
                      <div>
                        <textarea
                          placeholder="Dietary restrictions or allergies (optional)"
                          value={formData.dietary}
                          onChange={(e) => updateFormData("dietary", e.target.value)}
                          rows={3}
                          className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <textarea
                          placeholder="Accessibility needs or special accommodations (optional)"
                          value={formData.accessibility}
                          onChange={(e) => updateFormData("accessibility", e.target.value)}
                          rows={3}
                          className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>

                {currentStep < steps.length - 1 ? (
                  <button
                    onClick={nextStep}
                    className="flex items-center gap-2 px-6 py-3 bg-cyan-400 text-black rounded-lg hover:bg-cyan-300 transition-colors font-semibold"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    className="px-8 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-black rounded-lg hover:shadow-[0_0_20px_rgba(0,255,255,0.5)] transition-all font-semibold"
                  >
                    Submit Registration
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-3xl font-bold mb-8">Get in Touch</h3>

              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-cyan-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Address</h4>
                    <p className="text-gray-300">
                      Royal Global School
                      <br />
                      Guwahati, Assam 781001
                      <br />
                      India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-cyan-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Phone</h4>
                    <p className="text-gray-300">+91 98765 43210</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-cyan-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <p className="text-gray-300">info@royalmakercamp.com</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mb-8">
                <h4 className="font-semibold mb-4">Follow Us</h4>
                <div className="flex gap-4">
                  {[
                    { icon: Facebook, href: "#" },
                    { icon: Instagram, href: "#" },
                    { icon: Twitter, href: "#" },
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-cyan-400 hover:text-black transition-colors"
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Map */}
              <div className="bg-gray-800 rounded-xl p-4 h-64 flex items-center justify-center">
                <p className="text-gray-400">Interactive Map Coming Soon</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
