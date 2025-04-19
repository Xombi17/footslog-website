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
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.8], [0, 100])
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 1.1])
  
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

  // Dots for interactive jungle particle effect
  const [dots, setDots] = useState(() => 
    Array.from({ length: 40 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 5 + 2,
      opacity: Math.random() * 0.5 + 0.2,
      speed: Math.random() * 1 + 0.5,
    }))
  )

  // Animate dots
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prevDots => 
        prevDots.map(dot => ({
          ...dot,
          y: (dot.y + dot.speed * 0.1) % 100,
          opacity: Math.sin(Date.now() / 1000 * dot.speed) * 0.3 + 0.3,
        }))
      )
    }, 50)
    
    return () => clearInterval(interval)
  }, [])

  // Animated text reveal
  const titleChars = "FOOTSLOG".split("")

  return (
    <section ref={sectionRef} id="hero" className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div className="absolute inset-0 z-0" style={{ scale }}>
        <Image
          src="/images/jungle-book-bg.png"
          alt="Jungle Book Background"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
      </motion.div>

      {/* Particle effect */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        {dots.map((dot, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#D4A72C]"
            style={{
              left: `${dot.x}%`,
              top: `${dot.y}%`,
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              opacity: dot.opacity,
              boxShadow: `0 0 ${dot.size * 2}px ${dot.size/2}px rgba(212, 167, 44, 0.6)`,
            }}
            animate={{
              opacity: [dot.opacity, dot.opacity * 1.5, dot.opacity],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2 + dot.speed,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Animated vines with enhanced animation */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-[url('/images/jungle-vines-left.svg')] bg-no-repeat bg-left-top"
          style={{
            backgroundSize: "25%",
            y: useTransform(scrollYProgress, [0, 1], [0, -100]),
            opacity: useTransform(scrollYProgress, [0, 0.5], [1, 0.3]),
          }}
          animate={{
            filter: ["brightness(1)", "brightness(1.1)", "brightness(1)"],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-0 right-0 w-full h-full bg-[url('/images/jungle-vines-right.svg')] bg-no-repeat bg-right-top"
          style={{
            backgroundSize: "25%",
            y: useTransform(scrollYProgress, [0, 1], [0, -150]),
            opacity: useTransform(scrollYProgress, [0, 0.5], [1, 0.3]),
          }}
          animate={{
            filter: ["brightness(1)", "brightness(1.1)", "brightness(1)"],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-20 flex h-full flex-col items-center justify-center px-4 text-center"
        style={{ opacity, y }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-6"
        >
          <div className="relative">
            <div className="flex justify-center overflow-hidden">
              {titleChars.map((char, i) => (
                <motion.span
                  key={i}
                  className="inline-block font-display text-5xl font-bold tracking-wider text-[#D4A72C] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] md:text-7xl lg:text-8xl"
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.3 + i * 0.1,
                    ease: [0.215, 0.61, 0.355, 1]
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </div>
            <motion.div
              className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-32 h-32 md:w-40 md:h-40 bg-[url('/images/jungle-book-paw.svg')] bg-contain bg-no-repeat opacity-20"
              animate={{
                rotate: [0, 5, 0, -5, 0],
                scale: [1, 1.05, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
          <motion.p 
            className="mt-6 text-xl text-[#E5E1D6] md:text-2xl max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <span className="italic font-display bg-gradient-to-r from-[#E5E1D6] to-[#D4A72C] bg-clip-text text-transparent">"The Jungle Awaits..."</span> <br className="md:hidden" />
            <span className="bg-black/40 px-2 py-1 rounded backdrop-blur-sm">Rotaract Club FRCRCE's Annual Trek</span>
          </motion.p>
        </motion.div>
        
        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="my-6"
        >
          {isEventPast ? (
            <motion.div 
              className="rounded-xl bg-[#243420]/80 backdrop-blur-sm px-6 py-3 border border-[#D4A72C]"
              animate={{ 
                boxShadow: ['0 0 10px rgba(212, 167, 44, 0.3)', '0 0 20px rgba(212, 167, 44, 0.5)', '0 0 10px rgba(212, 167, 44, 0.3)'],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <p className="text-[#D4A72C] text-xl font-semibold">The event has already started!</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-4 gap-4">
              {[
                { value: timeLeft.days, label: "Days" },
                { value: timeLeft.hours, label: "Hours" },
                { value: timeLeft.minutes, label: "Minutes" },
                { value: timeLeft.seconds, label: "Seconds" }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 1 + i * 0.1 }}
                >
                  <motion.div 
                    className="h-16 w-16 md:h-20 md:w-20 bg-[#243420]/80 backdrop-blur-sm rounded-xl flex items-center justify-center border border-[#4A6D33]/30"
                    animate={{ 
                      boxShadow: item.label === "Seconds" 
                        ? ['0 0 10px rgba(212, 167, 44, 0.2)', '0 0 15px rgba(212, 167, 44, 0.4)', '0 0 10px rgba(212, 167, 44, 0.2)']
                        : undefined,
                    }}
                    transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={item.value}
                        className="font-display text-2xl md:text-3xl font-bold text-[#D4A72C]"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 20, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {item.value}
                      </motion.span>
                    </AnimatePresence>
                  </motion.div>
                  <span className="mt-2 text-[#E5E1D6] text-sm font-medium">{item.label}</span>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="mt-8"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="#register">
            <Button className="group relative overflow-hidden bg-[#D4A72C] px-10 py-7 text-lg font-bold text-[#0F1A0A] hover:bg-[#C69A28] rounded-xl transition-all duration-300 shadow-[0_5px_15px_rgba(212,167,44,0.3)]">
              <motion.span 
                className="relative z-10"
                animate={{
                  textShadow: ['0 0 0px rgba(0,0,0,0)', '0 0 10px rgba(0,0,0,0.3)', '0 0 0px rgba(0,0,0,0)']
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                JOIN THE TREK
              </motion.span>
              <span className="absolute inset-0 z-0 bg-[url('/images/vine-pattern.svg')] bg-cover opacity-0 transition-opacity duration-300 group-hover:opacity-30"></span>
              <motion.span 
                className="absolute -inset-1 z-0 rounded-xl bg-gradient-to-r from-[#D4A72C] via-[#E5B229] to-[#D4A72C] opacity-0 blur-xl group-hover:opacity-70 transition-all duration-500"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="absolute bottom-10 left-0 right-0 flex justify-center"
        >
          <motion.div 
            className="flex flex-col items-center text-[#E5E1D6]"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <p className="mb-2 text-sm bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">Scroll to Explore</p>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <motion.path
                d="M12 5V19M12 19L5 12M12 19L19 12"
                stroke="#E5E1D6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={{ 
                  strokeDasharray: [24, 24], 
                  strokeDashoffset: [24, 0] 
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  repeatDelay: 0.5
                }}
              />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
