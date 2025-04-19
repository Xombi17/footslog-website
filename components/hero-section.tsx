"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

// Event date - November 18, 2023 (Example date from the event timeline)
const EVENT_DATE = new Date("November 18, 2023 08:00:00").getTime()

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  // Simple parallax effect
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.8], [0, 100])
  
  // Audio elements for interactive sounds
  const [audioReady, setAudioReady] = useState(false)
  const jungleSoundRef = useRef<HTMLAudioElement | null>(null)
  
  // Removed audio initialization to fix 404 error
  
  // Play ambient sound on user interaction - function kept but doesn't do anything
  const playAmbientSound = () => {
    // Audio functionality removed
  }
  
  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  
  const [isEventPast, setIsEventPast] = useState(false)
  
  // Update countdown timer
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const difference = EVENT_DATE - now
      
      if (difference <= 0) {
        setIsEventPast(true)
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        }
      }
      
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      }
    }
    
    // Initial calculation
    setTimeLeft(calculateTimeLeft())
    
    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)
    
    // Clear interval on unmount
    return () => clearInterval(timer)
  }, [])

  // Fix for hydration mismatch - Create particles only on client side
  const [dots, setDots] = useState<Array<{x: number, y: number, size: number, opacity: number, color: string}>>([])
  
  // Generate dots only on client side after first render
  useEffect(() => {
    setDots(Array.from({ length: 20 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 5 + 2,
      opacity: Math.random() * 0.4 + 0.2,
      color: "#D4A72C",
    })))
  }, [])

  // Simpler dot animation with less frequent updates
  useEffect(() => {
    if (dots.length === 0) return;
    
    const interval = setInterval(() => {
      setDots(prevDots => 
        prevDots.map(dot => ({
          ...dot,
          y: (dot.y + 0.2) % 100, // Simple downward movement
          opacity: Math.max(0.2, Math.min(0.6, dot.opacity + (Math.random() * 0.1 - 0.05))),
        }))
      )
    }, 100) // Slower updates to reduce CPU usage
    
    return () => clearInterval(interval)
  }, [dots.length])

  // Animated text for title
  const titleChars = "FOOTSLOG".split("")

  return (
    <section 
      ref={sectionRef} 
      id="hero" 
      className="relative h-screen w-full overflow-hidden"
      onClick={playAmbientSound}
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="relative h-full w-full overflow-hidden">
          {/* Main background */}
          <Image
            src="/images/jungle-book-bg.png"
            alt="Jungle Book Background"
            fill
            priority
            className="object-cover object-center"
          />
          
          {/* Simple overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
        </div>
      </div>

      {/* Simplified particle effect - only rendered client-side */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        {dots.map((dot, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${dot.x}%`,
              top: `${dot.y}%`,
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              backgroundColor: dot.color,
              opacity: dot.opacity,
              boxShadow: `0 0 ${dot.size * 2}px rgba(212, 167, 44, 0.4)`,
            }}
          />
        ))}
      </div>

      {/* Simple vines decoration */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div
          className="absolute top-0 left-0 w-full h-full bg-[url('/images/jungle-vines-left.svg')] bg-no-repeat bg-left-top"
          style={{
            backgroundSize: "30%",
            opacity: 0.8,
          }}
        />
        <div
          className="absolute top-0 right-0 w-full h-full bg-[url('/images/jungle-vines-right.svg')] bg-no-repeat bg-right-top"
          style={{
            backgroundSize: "30%",
            opacity: 0.8,
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-20 flex h-full flex-col items-center justify-center px-4 text-center"
        style={{ 
          opacity, 
          y,
        }}
      >
        {/* Title */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <div className="relative">
            {/* Main title */}
            <div className="flex justify-center overflow-hidden">
              {titleChars.map((char, i) => (
                <motion.span
                  key={i}
                  className="inline-block font-display text-6xl font-bold tracking-wider text-[#F3B939] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] md:text-8xl lg:text-9xl"
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.3 + i * 0.1,
                    ease: [0.215, 0.61, 0.355, 1],
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </div>
            
            {/* Paw print */}
            <div
              className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-36 h-36 md:w-48 md:h-48 bg-[url('/images/jungle-book-paw.svg')] bg-contain bg-no-repeat opacity-25"
              style={{
                filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.3))",
              }}
            />
          </div>
          
          {/* Subtitle */}
          <motion.p 
            className="mt-6 text-2xl text-[#E5E1D6] md:text-3xl max-w-2xl mx-auto font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <span className="italic font-display bg-gradient-to-r from-[#E5E1D6] to-[#D4A72C] bg-clip-text text-transparent block mb-2">
              "The Jungle Awaits Your Adventure..."
            </span>
            <span className="bg-black/50 px-4 py-2 rounded-full backdrop-blur-md inline-block">
              Rotaract Club FRCRCE's Annual Trek
            </span>
          </motion.p>
        </motion.div>
        
        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="my-8"
        >
          {isEventPast ? (
            <div className="rounded-xl bg-[#243420]/90 backdrop-blur-md px-8 py-5 border-2 border-[#D4A72C]">
              <p className="text-[#F3B939] text-2xl font-semibold">The adventure has begun!</p>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-3 md:gap-6 p-5 bg-black/30 backdrop-blur-md rounded-2xl border border-[#D4A72C]/40">
              {[
                { value: timeLeft.days, label: "Days" },
                { value: timeLeft.hours, label: "Hours" },
                { value: timeLeft.minutes, label: "Minutes" },
                { value: timeLeft.seconds, label: "Seconds" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="relative h-16 w-20 md:h-24 md:w-28 bg-[#243420]/90 backdrop-blur-md rounded-2xl flex items-center justify-center border border-[#4A6D33]/30 overflow-hidden">
                    <span className="font-display text-3xl md:text-4xl font-bold text-[#F3B939]">
                      {item.value}
                    </span>
                  </div>
                  <span className="mt-2 text-[#E5E1D6] text-sm md:text-base font-medium">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-8"
        >
          <Link href="#register">
            <Button className="group relative overflow-hidden bg-gradient-to-r from-[#D4A72C] to-[#F3B939] px-10 py-7 text-xl font-bold text-[#0F1A0A] hover:bg-[#F3B939] rounded-xl transition-all duration-300">
              <span className="relative z-10">
                JOIN THE ADVENTURE
              </span>
              
              {/* Simple hover effect */}
              <span className="absolute inset-0 z-0 bg-[url('/images/vine-pattern.svg')] bg-cover opacity-0 transition-opacity duration-300 group-hover:opacity-30"></span>
            </Button>
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center">
          <div className="flex flex-col items-center text-[#E5E1D6]">
            <p className="mb-2 text-sm bg-black/40 px-4 py-1.5 rounded-full backdrop-blur-md">
              Explore The Wild
            </p>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 5V19M12 19L5 12M12 19L19 12"
                stroke="#F3B939"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
