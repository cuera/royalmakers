"use client"

import Link from "next/link"
import Image from "next/image"

export default function DashboardSnapshotSection() {
  return (
    <section className="py-12 bg-black flex flex-col items-center">
      <h2 className="text-white text-3xl mb-6">Live Dashboard Preview</h2>

      <Link
        href="https://royal-maker-achieve-e7s7rnhz3-queralearning-gmailcoms-projects.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="relative overflow-hidden rounded-xl max-w-4xl w-full border-4 border-neon-green-light shadow-[0_0_20px_rgba(66,217,138,0.4)] transition-transform duration-300 ease-out hover:scale-105 hover:shadow-[0_0_30px_rgba(66,217,138,0.6)]"
      >
        <Image
          src="/snapshot.webp"
          alt="Dashboard Preview"
          width={960}
          height={540}
          className="w-full h-auto"
          priority
        />
      </Link>
    </section>
  )
} 