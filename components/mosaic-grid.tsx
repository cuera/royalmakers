"use client"

import React from "react"
import Image from "next/image"

export default function MosaicGrid() {
  return (
    <div className="grid grid-cols-4 grid-rows-5 gap-4 p-4 bg-transparent max-w-4xl mx-auto">
      {/* 1. Big green square - Robotics */}
      <div className="bg-green-400/80 rounded-lg col-span-2 row-span-2 flex items-center justify-center relative overflow-hidden">
        <Image
          src="/robot.webp"
          alt="Robotics Lab"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-white font-bold text-sm md:text-base">Robotics Lab</h3>
            <p className="text-white/90 text-xs md:text-sm mt-1">Build & Program</p>
          </div>
        </div>
      </div>

      {/* 2. Blue bar - Manual Robot Football */}
      <div className="bg-blue-400/80 rounded-lg col-start-3 col-span-2 flex items-center justify-center relative overflow-hidden">
        <Image
          src="/mrf.webp"
          alt="Manual Robot Football"
          fill
          className="object-cover"
          style={{ objectPosition: 'center 75%' }}
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-white font-bold text-sm md:text-base">Manual Robot Football</h3>
            <p className="text-white/90 text-xs md:text-sm mt-1">Physical Interfacing</p>
          </div>
        </div>
      </div>

      {/* 3. Yellow tall - App Development */}
      <div className="bg-yellow-400/80 rounded-lg col-start-3 row-start-2 row-span-2 flex items-center justify-center relative overflow-hidden">
        <Image
          src="/app.webp"
          alt="App Development"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-white font-bold text-sm md:text-base">App Development</h3>
            <p className="text-white/90 text-xs md:text-sm mt-1">Coding</p>
          </div>
        </div>
      </div>

      {/* 4. Brown square - Engineering */}
      <div className="bg-amber-700/80 rounded-lg col-start-4 row-start-2 flex items-center justify-center relative overflow-hidden">
        <Image
          src="/eng2 (1).webp"
          alt="Engineering"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-white font-bold text-sm md:text-base">Engineering</h3>
            <p className="text-white/90 text-xs md:text-sm mt-1">Integrated Physics Maths</p>
          </div>
        </div>
      </div>

      {/* 5. Orange square - Arduino Automation */}
      <div className="bg-orange-400/80 rounded-lg col-start-1 col-span-2 row-start-3 row-span-2 flex items-center justify-center relative overflow-hidden">
        <Image
          src="/pc2.webp"
          alt="Arduino Automation"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-white font-bold text-sm md:text-base">Arduino Automation</h3>
            <p className="text-white/90 text-xs md:text-sm mt-1">Physical Computing</p>
          </div>
        </div>
      </div>

      {/* 6. Red square - Line Follower */}
      <div className="bg-red-400/80 rounded-lg col-start-3 row-start-4 flex items-center justify-center relative overflow-hidden">
        <Image
          src="/lf.webp"
          alt="Line Follower"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-white font-bold text-sm md:text-base">Line Follower</h3>
            <p className="text-white/90 text-xs md:text-sm mt-1">Automated Systems</p>
          </div>
        </div>
      </div>

      {/* 7. Purple tall - AI Agents */}
      <div className="bg-indigo-600/80 rounded-lg col-start-4 row-start-3 row-span-2 flex items-center justify-center relative overflow-hidden">
        <Image
          src="/ai.webp"
          alt="AI Agents"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-white font-bold text-sm md:text-base">AI Agents</h3>
            <p className="text-white/90 text-xs md:text-sm mt-1">Computing</p>
          </div>
        </div>
      </div>

      {/* 8. Bottom blue bar - Engineering */}
      <div className="bg-blue-300/80 rounded-lg col-span-4 row-start-5 flex items-center justify-center h-[184px] relative overflow-hidden">
        <Image
          src="/meet (1).webp"
          alt="Engineering"
          fill
          className="object-cover"
          style={{ 
            animation: 'panImage 24s ease-in-out infinite',
          }}
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
            <h3 className="text-white font-bold text-sm md:text-base">Innovators</h3>
            <p className="text-white/90 text-xs md:text-sm mt-1">Are Always Curious</p>
          </div>
        </div>
      </div>
    </div>
  )
} 