"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useEffect, useState, useCallback, useRef } from "react"
import { FaChevronDown } from "react-icons/fa"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"
import Image from "next/image"
import { Engine } from '@tsparticles/engine'
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const titleChars = "FOOTSLOG".split("")

export default function HeroSection() {
  const [initialized, setInitialized] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [preloaderFinished, setPreloaderFinished] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const heroSectionRef = useRef<HTMLDivElement>(null)
  
  // Register GSAP plugins
  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger)
    }
  }, [])

  // Detect preloader completion
  useEffect(() => {
    // Set a timeout that matches the preloader duration (2s) plus fade-out time (1s)
    const preloaderDuration = 3000 // 3 seconds total
    
    const timer = setTimeout(() => {
      setPreloaderFinished(true)
    }, preloaderDuration)
    
    return () => clearTimeout(timer)
  }, [])

  // Initialize animations only after preloader finishes
  useEffect(() => {
    if (!preloaderFinished || !contentRef.current) return
    
    // Fade in whole hero section
    if (heroSectionRef.current) {
      gsap.fromTo(
        heroSectionRef.current,
        { opacity: 0 },
        { 
          opacity: 1, 
          duration: 1,
          ease: "power2.out",
          onComplete: () => {
            // Start internal animations after the main fade-in
            startHeroAnimations()
          }
        }
      )
    }
  }, [preloaderFinished])

  // Animations for internal elements
  const startHeroAnimations = () => {
    // Animate hero elements
    const tl = gsap.timeline({
      defaults: { ease: "power2.out" }
    })
    
    // Add staggered animations for title chars - alternating left/right entry
    titleChars.forEach((_, i) => {
      const direction = i % 2 === 0 ? -100 : 100
      
      tl.fromTo(`.hero-title-char-${i}`, 
        { x: direction, y: 0, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8 },
        0.1 * i
      )
    })
    
    // Subtitle glides in from the right
    tl.fromTo(".hero-subtitle", 
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.9 },
      0.8
    )
    
    // CTA button glides in from the left
    tl.fromTo(".hero-cta", 
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.9 },
      1.0
    )
    
    // Scroll indicator fades in from bottom
    tl.fromTo(".scroll-indicator", 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      1.4
    )
    
    // Create scroll animations for parallax elements
    gsap.utils.toArray('.parallax-element').forEach((element: any) => {
      const direction = element.getAttribute('data-direction')
      let initialX = 0
      let initialY = 0
      
      // Set initial position based on direction
      switch(direction) {
        case 'left':
          initialX = -100
          break
        case 'right':
          initialX = 100
          break
        case 'up':
          initialY = 100
          break
        case 'down':
          initialY = -100
          break
      }
      
      gsap.fromTo(element, 
        { opacity: 0, x: initialX, y: initialY },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 1.2,
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            toggleActions: "play none none reverse"
          }
        }
      )
    })
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const initParticlesEngine = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
    setInitialized(true)
  }, [])

  // Set loaded state after a short delay to allow for animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const particlesOptions = {
    background: {
      color: {
        value: "#000000",
      },
    },
    fpsLimit: 120,
    particles: {
      color: {
        value: "#ffffff",
      },
      links: {
        color: "#ffffff",
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1,
      },
      move: {
        direction: "none" as const,
        enable: true,
        outModes: {
          default: "bounce" as const,
        },
        random: false,
        speed: 2,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 40,
      },
      opacity: {
        value: 0.3,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 3 },
      },
    },
  }

  return (
    <div ref={contentRef} className="scroll-content">
      <section 
        ref={heroSectionRef}
        className="relative flex h-screen flex-col items-center justify-center overflow-hidden bg-[#0F1A0A] opacity-0"
      >
        {/* Jungle Book Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/jungle-book-bg.png" 
            alt="Jungle background" 
            fill 
            priority
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F1A0A]/40 to-[#0F1A0A]/90 z-10"></div>
        </div>
        
        {/* Particles Background */}
        {initialized && (
          <Particles
            id="tsparticles"
            options={particlesOptions}
            className="absolute inset-0 z-10"
          />
        )}

        {/* Jungle Decorations */}
        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
          {/* Top left corner plant */}
          <div
            className="parallax-element absolute top-0 left-0 w-[30vw] max-w-[300px] opacity-0"
            data-speed="0.8"
            data-direction="left"
          >
            <Image
              src="/images/jungle-corner-left.png"
              alt="Jungle decoration"
              width={300}
              height={400}
              className="object-contain"
            />
          </div>

          {/* Top right corner plant */}
          <div
            className="parallax-element absolute top-0 right-0 w-[30vw] max-w-[300px] opacity-0"
            data-speed="0.8"
            data-direction="right"
          >
            <Image
              src="/images/jungle-corner-right.png"
              alt="Jungle decoration"
              width={300}
              height={400}
              className="object-contain"
            />
          </div>

          {/* Left side plant */}
          <div
            className="parallax-element absolute left-0 top-1/4 h-[50vh] w-[15vw] max-w-[150px] opacity-0"
            data-speed="1.1"
            data-direction="left"
          >
            <Image
              src="/images/palm-leaf-left.png"
              alt="Palm leaf"
              fill
              className="object-contain object-left"
            />
          </div>

          {/* Right side plant */}
          <div
            className="parallax-element absolute right-0 top-1/4 h-[50vh] w-[15vw] max-w-[150px] opacity-0"
            data-speed="1.1"
            data-direction="right"
          >
            <Image
              src="/images/palm-leaf-right.png"
              alt="Palm leaf"
              fill
              className="object-contain object-right"
            />
          </div>
          
          {/* Bottom decorative elements */}
          <div
            className="parallax-element absolute bottom-0 left-0 right-0 h-[20vh] max-h-[150px] opacity-0"
            data-speed="1.05"
            data-direction="up"
          >
            <Image
              src="/images/jungle-grass.png"
              alt="Jungle grass"
              fill
              className="object-cover object-bottom"
            />
          </div>
        </div>

        {/* Main Content - Positioned to match preloader */}
        <div className="relative z-30 flex w-full flex-col items-center justify-center px-6 text-center">
          {/* FOOTSLOG Title with letter animation similar to preloader */}
          <div className="flex items-center justify-center overflow-hidden mb-6">
            {titleChars.map((char, i) => (
              <span
                key={i}
                className={`hero-title-char-${i} inline-block font-display text-7xl md:text-9xl font-bold tracking-wider text-[#F3B939] opacity-0`}
                style={{ 
                  display: 'inline-block',
                  textShadow: '0 0 20px rgba(243, 185, 57, 0.6)' 
                }}
              >
                {char}
              </span>
            ))}
          </div>

          <div
            className="hero-subtitle mb-8 max-w-lg opacity-0"
          >
            <h2 className="font-body text-xl md:text-2xl text-white font-medium drop-shadow-lg mb-3 text-shadow-sm">
              The Jungle Awaits Your Adventure...
            </h2>
            <p className="text-light-300 bg-black/40 px-5 py-3 rounded-md backdrop-blur-sm text-md md:text-lg font-medium inline-block shadow-lg">
              Rotaract Club FRCRCE&apos;s Annual Trek
            </p>
          </div>

          <div
            className="hero-cta opacity-0"
          >
            <Link
              href="#about"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border-2 border-[#D4A72C] bg-[#113907] px-8 py-3 font-bold text-white transition-all duration-300 ease-out hover:scale-105 hover:bg-gradient-to-r hover:from-[#215812] hover:to-[#113907] hover:shadow-lg hover:shadow-green-500/20"
            >
              <span className="relative z-10 flex items-center text-lg font-medium tracking-wider">
                JOIN THE ADVENTURE
                <span className="ml-2">
                  <FaChevronDown className="animate-bounce text-sm" />
                </span>
              </span>
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 transform z-40 opacity-0"
        >
          <div className="flex flex-col items-center">
            <span className="mb-2 text-sm font-light text-white/70">
              Scroll to explore
            </span>
            <div className="h-8 w-5 rounded-full border-2 border-white/30 p-1">
              <div className="h-1 w-1 animate-scrollDown rounded-full bg-white"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
