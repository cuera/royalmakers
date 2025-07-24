"use client"

import React from "react"
import Image from "next/image"

function MosaicGridMobile() {
  return (
    <div className="space-y-4 p-4 bg-transparent max-w-lg mx-auto">
      {/* Hero Card - Robotics */}
      <div className="bg-green-400/80 rounded-xl h-48 flex items-center justify-center relative overflow-hidden">
        <Image src="/robot.webp" alt="Robotics Lab" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-white font-bold text-lg">Robotics Lab</h3>
            <p className="text-white/90 text-sm mt-1">Build & Program</p>
          </div>
        </div>
      </div>

      {/* Two-column compact grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-blue-400/80 rounded-xl h-32 flex items-center justify-center relative overflow-hidden">
          <Image src="/mrf.webp" alt="Manual Robot Football" fill className="object-cover" style={{ objectPosition: 'center 75%' }} />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-2">
              <h3 className="text-white font-bold text-sm">Robot Football</h3>
              <p className="text-white/90 text-xs mt-1">Physical Interface</p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-400/80 rounded-xl h-32 flex items-center justify-center relative overflow-hidden">
          <Image src="/app.webp" alt="App Development" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-2">
              <h3 className="text-white font-bold text-sm">App Development</h3>
              <p className="text-white/90 text-xs mt-1">Coding</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Card - Arduino */}
      <div className="bg-orange-400/80 rounded-xl h-48 flex items-center justify-center relative overflow-hidden">
        <Image src="/pc2.webp" alt="Arduino Automation" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-white font-bold text-lg">Arduino Automation</h3>
            <p className="text-white/90 text-sm mt-1">Physical Computing</p>
          </div>
        </div>
      </div>

      {/* Another two-column grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-red-400/80 rounded-xl h-32 flex items-center justify-center relative overflow-hidden">
          <Image src="/lf.webp" alt="Line Follower" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-2">
              <h3 className="text-white font-bold text-sm">Line Follower</h3>
              <p className="text-white/90 text-xs mt-1">Automated Systems</p>
            </div>
          </div>
        </div>

        <div className="bg-indigo-600/80 rounded-xl h-32 flex items-center justify-center relative overflow-hidden">
          <Image src="/ai.webp" alt="AI Agents" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-2">
              <h3 className="text-white font-bold text-sm">AI Agents</h3>
              <p className="text-white/90 text-xs mt-1">Computing</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom inspirational card */}
      <div className="bg-blue-300/80 rounded-xl h-40 flex items-center justify-center relative overflow-hidden">
        <Image 
          src="/meet (1).webp" 
          alt="Innovators" 
          fill 
          className="object-cover"
          style={{ animation: 'panImage 24s ease-in-out infinite' }}
        />
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes panImage {
              0%, 100% { object-position: center 20%; }
              50% { object-position: center 80%; }
            }
          `
        }} />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-white font-bold text-lg">Innovators</h3>
            <p className="text-white/90 text-sm mt-1">Are Always Curious</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MosaicGridMobile