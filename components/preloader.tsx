"use client"

import React, { useEffect } from "react"

interface PreloaderProps {
  isVisible: boolean
  onComplete?: () => void
}

export function Preloader({ isVisible, onComplete }: PreloaderProps) {
  // Allow escape key to skip preloader for accessibility
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && onComplete) {
        onComplete()
      }
    }

    if (isVisible) {
      document.addEventListener('keydown', handleKeyDown)
      // Prevent body scroll when preloader is visible
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isVisible, onComplete])
  if (!isVisible) return null

  return (
    <div 
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
      role="progressbar"
      aria-label="Loading Maker application"
      aria-live="polite"
    >
      {/* Brand Text */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-wide">
          maker
        </h1>
      </div>

      {/* Bouncing Ball Animation */}
      <div className="mb-3 md:mb-4">
        <svg 
          width="40" 
          height="40" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
          className="preloader-animation w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
          aria-hidden="true"
        >
          <ellipse cx="12" cy="5" rx="4" ry="4" fill="#FFFFFF">
            <animate 
              id="spinner_jbYs" 
              begin="0;spinner_JZdr.end" 
              attributeName="cy" 
              calcMode="spline" 
              dur="0.375s" 
              values="5;20" 
              keySplines=".33,0,.66,.33" 
              fill="freeze"
            />
            <animate 
              begin="spinner_jbYs.end" 
              attributeName="rx" 
              calcMode="spline" 
              dur="0.05s" 
              values="4;4.8;4" 
              keySplines=".33,0,.66,.33;.33,.66,.66,1"
            />
            <animate 
              begin="spinner_jbYs.end" 
              attributeName="ry" 
              calcMode="spline" 
              dur="0.05s" 
              values="4;3;4" 
              keySplines=".33,0,.66,.33;.33,.66,.66,1"
            />
            <animate 
              id="spinner_ADF4" 
              begin="spinner_jbYs.end" 
              attributeName="cy" 
              calcMode="spline" 
              dur="0.025s" 
              values="20;20.5" 
              keySplines=".33,0,.66,.33"
            />
            <animate 
              id="spinner_JZdr" 
              begin="spinner_ADF4.end" 
              attributeName="cy" 
              calcMode="spline" 
              dur="0.4s" 
              values="20.5;5" 
              keySplines=".33,.66,.66,1"
            />
          </ellipse>
        </svg>
      </div>

      {/* Loading Text */}
      <p className="text-white text-sm md:text-base font-medium">
        Loading...
      </p>

      {/* Reduced Motion Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @media (prefers-reduced-motion: reduce) {
            .preloader-animation ellipse animate {
              animation-duration: 0s !important;
            }
          }
        `
      }} />
    </div>
  )
} 