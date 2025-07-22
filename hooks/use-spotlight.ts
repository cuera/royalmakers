import { useRef, useEffect } from "react"

interface UseSpotlightProps {
  spotlightRadius?: number
  enabled?: boolean
}

export function useSpotlight({ spotlightRadius = 300, enabled = true }: UseSpotlightProps = {}) {
  const gridRef = useRef<HTMLDivElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!enabled) return

    const grid = gridRef.current
    const spotlight = spotlightRef.current
    if (!grid || !spotlight) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = grid.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      spotlight.style.left = `${x}px`
      spotlight.style.top = `${y}px`
      spotlight.style.opacity = '1'
    }

    const handleMouseLeave = () => {
      if (spotlight) spotlight.style.opacity = '0'
    }

    grid.addEventListener('mousemove', handleMouseMove)
    grid.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      grid.removeEventListener('mousemove', handleMouseMove)
      grid.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [spotlightRadius, enabled])

  return { gridRef, spotlightRef, spotlightRadius }
} 