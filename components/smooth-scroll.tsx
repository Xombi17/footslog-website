"use client"

import { ReactNode, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

interface SmoothScrollProps {
  children: ReactNode
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Register plugins
    gsap.registerPlugin(ScrollTrigger)

    // Set up scroll-based animations for content elements
    const sections = document.querySelectorAll("section")
    
    sections.forEach(section => {
      // Fade in effect for sections
      gsap.fromTo(
        section.querySelectorAll('.animate-on-scroll'),
        { 
          opacity: 0,
          y: 50 
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )
    })

    return () => {
      // Clean up ScrollTrigger
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div ref={contentRef}>
      {children}
    </div>
  )
} 