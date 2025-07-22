"use client"

import { useState, useEffect, useRef } from "react"

interface UseAppLoadingOptions {
  minimumDisplayTime?: number // Minimum time to show preloader (ms)
  maximumDisplayTime?: number // Maximum time before force hide (ms)
  developmentMode?: boolean    // Skip Spline waiting for development
}

interface AppLoadingState {
  isLoading: boolean
  isSplineLoaded: boolean
  setSplineLoaded: (loaded: boolean) => void
}

export function useAppLoading(options: UseAppLoadingOptions = {}): AppLoadingState {
  const {
    minimumDisplayTime = 600,  // 0.6 seconds minimum (ultra-fast default)
    maximumDisplayTime = 2500, // 2.5 seconds maximum timeout
    developmentMode = false,   // Skip Spline waiting for development
  } = options

  const [isLoading, setIsLoading] = useState(true)
  const [isSplineLoaded, setIsSplineLoaded] = useState(false)
  const [minimumTimeElapsed, setMinimumTimeElapsed] = useState(false)
  
  const startTimeRef = useRef<number>(Date.now())

  // Set minimum display time
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinimumTimeElapsed(true)
    }, minimumDisplayTime)

    return () => clearTimeout(timer)
  }, [minimumDisplayTime])

  // Set maximum timeout fallback
  useEffect(() => {
    const maxTimer = setTimeout(() => {
      console.warn('Preloader timeout reached, forcing hide')
      setIsLoading(false)
    }, maximumDisplayTime)

    return () => clearTimeout(maxTimer)
  }, [maximumDisplayTime])

  // Hide preloader when conditions are met
  useEffect(() => {
    if (developmentMode) {
      // In development mode, just wait for minimum time
      if (minimumTimeElapsed) {
        setIsLoading(false)
      }
    } else {
      // In production mode, wait for both minimum time AND Spline load, then add 1s delay
      if (minimumTimeElapsed && isSplineLoaded) {
        const delayTimer = setTimeout(() => {
          setIsLoading(false)
        }, 1000) // 1 second delay after Spline loads

        return () => clearTimeout(delayTimer)
      }
    }
  }, [minimumTimeElapsed, isSplineLoaded, developmentMode])

  const setSplineLoaded = (loaded: boolean) => {
    setIsSplineLoaded(loaded)
    if (loaded) {
      const loadTime = Date.now() - startTimeRef.current
      console.log(`Spline loaded in ${loadTime}ms`)
    }
  }

  return {
    isLoading,
    isSplineLoaded,
    setSplineLoaded,
  }
} 