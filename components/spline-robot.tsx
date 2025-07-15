"use client"

import { Suspense } from "react"

interface SplineRobotProps {
  className?: string
}

export function SplineRobot({ className = "" }: SplineRobotProps) {
  return (
    <div className={`relative ${className}`}>
      <Suspense
        fallback={
          <div className="w-full h-full bg-gray-100 rounded-2xl flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        }
      >
        <iframe
          src="https://my.spline.design/nexbotrobotcharacterconcept-Rq2GNSjbsa4Lto0np1CbTlik/"
          frameBorder="0"
          width="100%"
          height="100%"
          className="rounded-2xl"
          loading="lazy"
          title="3D Robot Character"
        />
      </Suspense>
    </div>
  )
}
