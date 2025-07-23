"use client"

import React, { useEffect, useRef, useState, ComponentType } from "react"

interface LazyClientProps {
  importFn: () => Promise<{ default: ComponentType<any> }>
  placeholder?: React.ReactNode
  rootMargin?: string
  className?: string
}

export function LazyClient({
  importFn,
  placeholder = null,
  rootMargin = "200px",
  className,
}: LazyClientProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [Component, setComponent] = useState<ComponentType<any> | null>(null)

  // Intersection observer to detect when in viewport
  useEffect(() => {
    if (!ref.current || Component) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            importFn().then((mod) => setComponent(() => mod.default))
            observer.disconnect()
          }
        })
      },
      { rootMargin },
    )

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [importFn, rootMargin, Component])

  return <div ref={ref} className={className}>{Component ? <Component /> : placeholder}</div>
} 