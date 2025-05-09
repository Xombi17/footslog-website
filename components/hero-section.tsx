"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useEffect, useState, useCallback, useRef } from "react"
import { FaChevronDown, FaMapMarkerAlt, FaCalendarAlt, FaUsers } from "react-icons/fa"
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
    const preloaderDuration = 3000
    const timer = setTimeout(() => {
      setPreloaderFinished(true)
    }, preloaderDuration)
    
    return () => clearTimeout(timer)
  }, [])

  // Initialize animations only after preloader finishes
  useEffect(() => {
    if (!preloaderFinished || !contentRef.current) return
    
    if (heroSectionRef.current) {
      gsap.fromTo(
        heroSectionRef.current,
        { opacity: 0 },
        { 
          opacity: 1, 
          duration: 1,
          ease: "power2.out",
          onComplete: () => {
            startHeroAnimations()
          }
        }
      )
    }
  }, [preloaderFinished])

  // Animations for internal elements
  const startHeroAnimations = () => {
    const tl = gsap.timeline({
      defaults: { ease: "power2.out" }
    })
    
    // Enhanced glow effect
    tl.to(".hero-glow", { 
      opacity: 1, 
      duration: 1.5,
      scale: 1.2,
      repeat: -1,
      yoyo: true
    }, 0)
    
    // Improved title character animations
    titleChars.forEach((_, i) => {
      const direction = i % 2 === 0 ? -100 : 100
      const delay = 0.1 * i
      
      tl.fromTo(`.hero-title-char-${i}`, 
        { 
          x: direction, 
          y: 0, 
          opacity: 0,
          textShadow: "0 0 0px rgba(243, 185, 57, 0)"
        },
        { 
          x: 0, 
          opacity: 1, 
          duration: 0.8,
          textShadow: "0 0 20px rgba(243, 185, 57, 0.6)"
        },
        delay
      )
      
      // Enhanced pulsing effect
      tl.to(`.hero-title-char-${i}`, {
        textShadow: "0 0 30px rgba(243, 185, 57, 0.8)",
        repeat: -1,
        yoyo: true,
        duration: 2 + (i * 0.1),
        ease: "sine.inOut"
      }, 0.8 + delay)
    })
    
    // Enhanced subtitle animation
    tl.fromTo(".hero-subtitle", 
      { x: 100, opacity: 0, scale: 0.9 },
      { x: 0, opacity: 1, scale: 1, duration: 1 },
      0.8
    )
    
    // Enhanced CTA button animation
    tl.fromTo(".hero-cta", 
      { x: -100, opacity: 0, scale: 0.9 },
      { x: 0, opacity: 1, scale: 1, duration: 1 },
      1.0
    )
    
    // Enhanced scroll indicator animation
    tl.fromTo(".scroll-indicator", 
      { y: 50, opacity: 0, scale: 0.8 },
      { y: 0, opacity: 1, scale: 1, duration: 1.2 },
      1.4
    )
    
    // Enhanced parallax elements
    gsap.utils.toArray('.parallax-element').forEach((element: any) => {
      const direction = element.getAttribute('data-direction')
      let initialX = 0
      let initialY = 0
      
      switch(direction) {
        case 'left': initialX = -100; break
        case 'right': initialX = 100; break
        case 'up': initialY = 100; break
        case 'down': initialY = -100; break
      }
      
      gsap.fromTo(element, 
        { opacity: 0, x: initialX, y: initialY, scale: 0.9 },
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: 1.5,
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
        {/* Enhanced Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/jungle-book-bg.png"
            alt="Jungle background" 
            fill
            priority
            sizes="(max-width: 768px) 100vw, 100vw"
            className="object-cover object-center md:object-center opacity-60 transition-all duration-1000 hover:opacity-70"
            style={{ objectPosition: 'center 35%' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F1A0A]/40 via-[#0F1A0A]/70 to-[#0F1A0A] z-10"></div>
        </div>

        {/* Enhanced Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0F1A0A] to-transparent z-20"></div>
        
        {/* Particles Background */}
        {initialized && (
          <Particles
            id="tsparticles"
            options={particlesOptions}
            className="absolute inset-0 z-10"
          />
        )}

        {/* Main Content */}
        <div className="relative z-30 flex w-full flex-col items-center justify-center px-6 text-center">
          {/* Enhanced Title */}
          <div className="flex items-center justify-center mb-6 md:mb-8 relative">
            <motion.div 
              className="absolute w-[130%] h-[150%] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#F3B939]/5 blur-[60px] rounded-[100%] opacity-0 hero-glow"
              animate={{ 
                opacity: [0.4, 0.7, 0.4],
                scale: [0.9, 1.1, 0.9],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
            
            {titleChars.map((char, i) => (
              <motion.span
                key={i}
                className={`hero-title-char-${i} inline-block font-display text-5xl sm:text-7xl md:text-9xl font-bold tracking-wider text-[#F3B939] opacity-0`}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                {char}
              </motion.span>
            ))}
          </div>

          {/* Enhanced Subtitle */}
          <div className="hero-subtitle mb-8 md:mb-10 max-w-lg opacity-0 px-4">
            <h2 className="font-body text-xl sm:text-2xl md:text-3xl text-white font-medium drop-shadow-lg mb-4 text-shadow-sm">
              The Jungle Awaits Your Adventure...
            </h2>
            <p className="text-light-300 bg-black/40 px-6 py-3 md:px-8 md:py-4 rounded-md backdrop-blur-sm text-base sm:text-lg md:text-xl font-medium inline-block shadow-lg hover:shadow-xl hover:shadow-[#F3B939]/20 transition-all duration-300">
              Rotaract Club FRCRCE&apos;s Annual Trek
            </p>
          </div>

          {/* Enhanced CTA */}
          <div className="hero-cta opacity-0">
            <Link
              href="/register"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border-2 border-[#D4A72C] bg-[#113907] px-10 py-4 font-bold text-white transition-all duration-300 ease-out hover:scale-105 hover:bg-gradient-to-r hover:from-[#215812] hover:to-[#113907] hover:shadow-lg hover:shadow-green-500/20"
            >
              <span className="relative z-10 flex items-center text-lg md:text-xl font-medium tracking-wider">
                JOIN THE ADVENTURE
                <span className="ml-3">
                  <FaChevronDown className="animate-bounce text-sm" />
                </span>
              </span>
            </Link>
          </div>

          {/* Event Details */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto opacity-0 animate-fade-in">
            <div className="flex items-center justify-center space-x-3 text-white/90">
              <FaMapMarkerAlt className="text-[#F3B939] text-xl" />
              <span className="text-sm md:text-base">Sandhan Valley</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-white/90">
              <FaCalendarAlt className="text-[#F3B939] text-xl" />
              <span className="text-sm md:text-base">March 2024</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-white/90">
              <FaUsers className="text-[#F3B939] text-xl" />
              <span className="text-sm md:text-base">Limited Spots</span>
            </div>
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <div className="scroll-indicator absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 transform z-40 opacity-0">
          <div className="flex flex-col items-center">
            <span className="mb-2 sm:mb-3 text-sm sm:text-base font-light text-white/70">
              Scroll to explore
            </span>
            <div className="h-8 w-6 sm:h-10 sm:w-8 rounded-full border-2 border-white/30 p-2 hover:border-[#F3B939] transition-colors duration-300">
              <div className="h-1 w-1 animate-scrollDown rounded-full bg-white"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
