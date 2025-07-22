"use client"

import React from "react"

import { motion } from "framer-motion"
import { useState } from "react"
import { Mail, MapPin, Phone, Facebook, Instagram, Twitter, Linkedin } from "lucide-react"
import Image from "next/image"

function GradientWave() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -bottom-1/2 -left-1/4 w-full h-full opacity-10"
        animate={{
          background: [
            "radial-gradient(ellipse, rgba(0,255,255,0.3) 0%, transparent 70%)",
            "radial-gradient(ellipse, rgba(132,0,255,0.3) 0%, transparent 70%)",
            "radial-gradient(ellipse, rgba(255,0,132,0.3) 0%, transparent 70%)",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
    </div>
  )
}

export function Section10Footer() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  const quickLinks = [
    { name: "About Us", href: "#about" },
    { name: "Programs", href: "#programs" },
    { name: "Gallery", href: "#gallery" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" },
  ]

  const socialLinks = [
    { icon: Facebook, href: "#", name: "Facebook" },
    { icon: Instagram, href: "#", name: "Instagram" },
    { icon: Twitter, href: "#", name: "Twitter" },
    { icon: Linkedin, href: "#", name: "LinkedIn" },
  ]

  return (
    <footer className="bg-black text-white py-12 relative overflow-hidden">
      <GradientWave />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Quick Links */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h3 className="text-xl font-bold mb-6 text-neon-green">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <a href={link.href} className="text-subtitle-gray hover:text-cyan-400 transition-colors duration-200">
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-xl font-bold mb-6 text-neon-green">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-neon-green mt-1 flex-shrink-0" />
                <div className="text-subtitle-gray text-sm">
                  Royal Global School
                  <br />
                  Guwahati, Assam 781001
                  <br />
                  India
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-neon-green flex-shrink-0" />
                <span className="text-subtitle-gray text-sm">+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-neon-green flex-shrink-0" />
                <span className="text-subtitle-gray text-sm">info@royalmakercamp.com</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6">
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-cyan-400 hover:text-black transition-all duration-200"
                    title={social.name}
                  >
                    <social.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-6 text-neon-green">Legal</h3>
            <ul className="space-y-3">
              {["Privacy Policy", "Terms of Service", "Cookie Policy", "Refund Policy"].map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <a href="#" className="text-subtitle-gray hover:text-cyan-400 transition-colors duration-200 text-sm">
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Partnership & Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-xl font-bold mb-6 text-neon-green">Partnership</h3>
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="relative w-10 h-10 overflow-hidden rounded-full">
                <Image
                    src="/Sparkbee.webp"
                  alt="Sparkbee Logo"
                    fill
                    className="object-cover"
                />
                </div>
                <div>
                  <p className="font-semibold text-sm">Powered by Sparkbee</p>
                  <p className="text-subtitle-gray text-xs">Technical Excellence Partner</p>
                </div>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div>
              <h4 className="font-semibold mb-3">Stay Updated</h4>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors text-sm"
                  required
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-neon-green-light to-neon-green text-black py-2 rounded-lg font-semibold hover:shadow-[0_0_15px_rgba(66,217,138,0.35)] transition-all text-sm"
                >
                  Subscribe
                </motion.button>
              </form>

              {/* Subscription Confirmation */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: isSubscribed ? 1 : 0,
                  scale: isSubscribed ? 1 : 0.8,
                }}
                className="mt-3 text-green-400 text-sm text-center"
              >
                ✓ Successfully subscribed!
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-gradient-to-r from-neon-green-light to-neon-green rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-black rounded-full"></div>
            </div>
            <p className="text-subtitle-gray text-sm">© 2025 Royal MakerCamp. All rights reserved.</p>
          </div>

          <div className="text-subtitle-gray text-sm">Made with ❤️ for future innovators</div>
        </motion.div>
      </div>
    </footer>
  )
}
