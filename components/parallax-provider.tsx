"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

interface ParallaxContextType {
  scrollY: number
  scrollDirection: "up" | "down" | null
}

const ParallaxContext = createContext<ParallaxContextType>({
  scrollY: 0,
  scrollDirection: null,
})

export const useParallax = () => useContext(ParallaxContext)

export function ParallaxProvider({ children }: { children: React.ReactNode }) {
  const [scrollY, setScrollY] = useState(0)
  const [prevScrollY, setPrevScrollY] = useState(0)
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollDirection(currentScrollY > prevScrollY ? "down" : "up")
      setPrevScrollY(currentScrollY)
      setScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [prevScrollY])

  return <ParallaxContext.Provider value={{ scrollY, scrollDirection }}>{children}</ParallaxContext.Provider>
}
