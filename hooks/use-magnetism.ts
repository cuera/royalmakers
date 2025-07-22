import { useCallback } from "react"

interface UseMagnetismProps {
  enabled?: boolean
  strength?: number
}

export function useMagnetism({ enabled = true, strength = 0.05 }: UseMagnetismProps = {}) {
  const handleCardMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!enabled) return
    
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const magnetX = (x - centerX) * strength
    const magnetY = (y - centerY) * strength
    
    card.style.transform = `translate(${magnetX}px, ${magnetY}px)`
  }, [enabled, strength])

  const handleCardMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!enabled) return
    
    const card = e.currentTarget
    card.style.transform = 'translate(0px, 0px)'
  }, [enabled])

  return { handleCardMouseMove, handleCardMouseLeave }
} 