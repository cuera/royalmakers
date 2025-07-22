import { useCallback } from "react"

interface UseClickEffectProps {
  enabled?: boolean
  color?: string
}

export function useClickEffect({ enabled = true, color = "rgba(132,0,255,0.4)" }: UseClickEffectProps = {}) {
  const handleCardClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!enabled) return
    
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const maxDistance = Math.max(
      Math.hypot(x, y),
      Math.hypot(x - rect.width, y),
      Math.hypot(x, y - rect.height),
      Math.hypot(x - rect.width, y - rect.height)
    )
    
    const ripple = document.createElement('div')
    ripple.style.cssText = `
      position: absolute;
      width: ${maxDistance * 2}px;
      height: ${maxDistance * 2}px;
      border-radius: 50%;
      background: radial-gradient(circle, ${color} 0%, ${color.replace('0.4', '0.2')} 30%, transparent 70%);
      left: ${x - maxDistance}px;
      top: ${y - maxDistance}px;
      pointer-events: none;
      z-index: 1000;
    `
    
    card.appendChild(ripple)
    
    // Animate ripple
    ripple.animate([
      { scale: 0, opacity: 1 },
      { scale: 1, opacity: 0 }
    ], {
      duration: 800,
      easing: 'ease-out'
    }).onfinish = () => ripple.remove()
  }, [enabled, color])

  return { handleCardClick }
} 