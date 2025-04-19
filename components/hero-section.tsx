"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence, MotionValue } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

// Event date - November 18, 2023 (Example date from the event timeline)
const EVENT_DATE = new Date("November 18, 2023 08:00:00").getTime()

// Custom 3D tilt effect hook
function useMousePosition3D() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * -20,
      })
    }
    
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])
  
  return mousePosition
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  // Enhanced parallax effect
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.8], [0, 100])
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 1.1])
  const rotateX = useTransform(scrollYProgress, [0, 0.3], [0, -5])
  const contentY = useTransform(scrollYProgress, [0, 0.4], [0, -50])
  
  // Don't use mouse position for animations
  // const mousePosition = useMousePosition3D()
  
  // Audio elements for interactive sounds
  const [audioReady, setAudioReady] = useState(false)
  const jungleSoundRef = useRef<HTMLAudioElement | null>(null)
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      jungleSoundRef.current = new Audio("/sounds/jungle-ambience.mp3")
      jungleSoundRef.current.volume = 0.2
      jungleSoundRef.current.loop = true
      setAudioReady(true)
    }
  }, [])
  
  // Play ambient sound on user interaction
  const playAmbientSound = () => {
    if (audioReady && jungleSoundRef.current) {
      jungleSoundRef.current.play().catch(() => {
        // Browser may block autoplay
        console.log("Audio autoplay was prevented")
      })
    }
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

  // Enhanced particle effect with more particles
  const [dots, setDots] = useState(() => 
    Array.from({ length: 80 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 2,
      opacity: Math.random() * 0.5 + 0.2,
      speed: Math.random() * 1.5 + 0.5,
      color: Math.random() > 0.7 ? "#E5B229" : "#D4A72C", // Mix of gold shades
      blur: Math.random() > 0.8,
    }))
  )

  // Animate dots with more dynamic movement
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prevDots => 
        prevDots.map(dot => ({
          ...dot,
          y: (dot.y + (Math.sin(Date.now() / 2000) * 0.2 + 1) * dot.speed * 0.1) % 100,
          x: (dot.x + Math.cos(Date.now() / 3000 + dot.y / 10) * dot.speed * 0.05) % 100,
          opacity: Math.sin(Date.now() / 1000 * dot.speed) * 0.3 + 0.3,
        }))
      )
    }, 30) // Faster updates for smoother animation
    
    return () => clearInterval(interval)
  }, [])

  // Wild animals silhouettes that occasionally appear
  const [animals, setAnimals] = useState([
    { type: "tiger", position: { x: -10, y: 70 }, visible: false, size: 120 },
    { type: "monkey", position: { x: 85, y: 30 }, visible: false, size: 90 },
    { type: "bird", position: { x: 60, y: 15 }, visible: false, size: 70 },
    { type: "elephant", position: { x: 20, y: 80 }, visible: false, size: 150 },
  ])
  
  // Randomly show/hide animal silhouettes
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimals(prevAnimals => 
        prevAnimals.map(animal => ({
          ...animal,
          visible: Math.random() > 0.85, // 15% chance to appear
        }))
      )
    }, 3000) // Check every 3 seconds
    
    return () => clearInterval(interval)
  }, [])

  // Animated text reveal with more dynamic effect
  const titleChars = "FOOTSLOG".split("")

  return (
    <section 
      ref={sectionRef} 
      id="hero" 
      className="relative h-screen w-full overflow-hidden"
      onClick={playAmbientSound}
    >
      {/* Enhanced 3D Background with Parallax - Remove mouse effects */}
      <motion.div 
        className="absolute inset-0 z-0" 
        style={{ 
          scale,
          rotateX,
        }}
      >
        <div className="relative h-full w-full overflow-hidden">
          {/* Main background without mouse parallax */}
          <Image
            src="/images/jungle-book-bg.png"
            alt="Jungle Book Background"
            fill
            priority
            className="object-cover object-center"
          />
          
          {/* Keep fog/mist overlay */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 mix-blend-overlay"
            animate={{
              opacity: [0.4, 0.6, 0.4],
              background: [
                "linear-gradient(to top, rgba(0,0,0,0.5), rgba(0,0,0,0), rgba(0,0,0,0.3))",
                "linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.1), rgba(0,0,0,0.4))",
                "linear-gradient(to top, rgba(0,0,0,0.5), rgba(0,0,0,0), rgba(0,0,0,0.3))",
              ]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Keep animated light rays */}
          <motion.div 
            className="absolute inset-0 bg-[url('/images/light-rays.png')] bg-cover bg-center mix-blend-soft-light"
            animate={{
              opacity: [0, 0.3, 0],
              backgroundPosition: ['center', '51% 49%', 'center']
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Keep color filter */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
        </div>
      </motion.div>

      {/* Enhanced particle effect - remove depth transforms */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        {dots.map((dot, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${dot.blur ? 'blur-sm' : ''}`}
            style={{
              left: `${dot.x}%`,
              top: `${dot.y}%`,
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              backgroundColor: dot.color,
              opacity: dot.opacity,
              zIndex: dot.blur ? 1 : 2,
              boxShadow: `0 0 ${dot.size * 3}px ${dot.size/1.5}px rgba(229, 178, 41, 0.7)`,
            }}
            animate={{
              opacity: [dot.opacity, dot.opacity * 1.8, dot.opacity],
              scale: [1, 1.3, 1],
              boxShadow: [
                `0 0 ${dot.size * 3}px ${dot.size/1.5}px rgba(229, 178, 41, 0.6)`,
                `0 0 ${dot.size * 4}px ${dot.size}px rgba(229, 178, 41, 0.8)`,
                `0 0 ${dot.size * 3}px ${dot.size/1.5}px rgba(229, 178, 41, 0.6)`,
              ]
            }}
            transition={{
              duration: 2 + dot.speed,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Animal silhouettes */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        {animals.map((animal, i) => (
          <AnimatePresence key={i}>
            {animal.visible && (
              <motion.div 
                className={`absolute bg-[url('/images/${animal.type}-silhouette.svg')] bg-contain bg-no-repeat`}
                style={{
                  left: `${animal.position.x}%`,
                  top: `${animal.position.y}%`,
                  width: animal.size,
                  height: animal.size,
                }}
                initial={{ opacity: 0, scale: 0.9, x: animal.type === "bird" ? -50 : 0 }}
                animate={{ 
                  opacity: [0, 0.7, 0], 
                  scale: [0.9, 1, 0.9],
                  x: animal.type === "bird" ? [0, 100, 200] : 0,
                  y: animal.type === "bird" ? [0, -30, -10] : 0,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: animal.type === "bird" ? 4 : 3, ease: "easeInOut" }}
              />
            )}
          </AnimatePresence>
        ))}
      </div>

      {/* Enhanced animated vines with parallax */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-[url('/images/jungle-vines-left.svg')] bg-no-repeat bg-left-top"
          style={{
            backgroundSize: "35%",
            y: useTransform(scrollYProgress, [0, 1], [0, -120]),
            x: useTransform(scrollYProgress, [0, 1], [0, -30]),
            opacity: useTransform(scrollYProgress, [0, 0.5], [1, 0.2]),
            filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.4))",
          }}
          animate={{
            filter: ["drop-shadow(0 10px 15px rgba(0,0,0,0.3))", "drop-shadow(0 15px 20px rgba(0,0,0,0.5))", "drop-shadow(0 10px 15px rgba(0,0,0,0.3))"],
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
            backgroundSize: "35%",
            y: useTransform(scrollYProgress, [0, 1], [0, -170]),
            x: useTransform(scrollYProgress, [0, 1], [0, 30]),
            opacity: useTransform(scrollYProgress, [0, 0.5], [1, 0.2]),
            filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.4))",
          }}
          animate={{
            filter: ["drop-shadow(0 10px 15px rgba(0,0,0,0.3))", "drop-shadow(0 15px 20px rgba(0,0,0,0.5))", "drop-shadow(0 10px 15px rgba(0,0,0,0.3))"],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
      </div>

      {/* Content without 3D mouse perspective */}
      <motion.div
        className="relative z-20 flex h-full flex-col items-center justify-center px-4 text-center"
        style={{ 
          opacity, 
          y: contentY,
        }}
      >
        {/* Enhanced title - remove 3D mouse effects */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-12"
        >
          <div className="relative">
            {/* 3D shadow effect - keep this non-mouse effect */}
            <div className="absolute flex justify-center overflow-hidden opacity-40 blur-md" style={{ 
              left: "50%", 
              top: "53%", 
              transform: "translate(-50%, -50%) rotateX(60deg) scale(0.9, 0.5)"
            }}>
              {titleChars.map((char, i) => (
                <motion.span
                  key={`shadow-${i}`}
                  className="inline-block font-display text-5xl font-bold tracking-wider text-black md:text-7xl lg:text-8xl"
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 0.8 }}
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
            
            {/* Main title with floating effect - keep non-mouse animations */}
            <motion.div 
              className="flex justify-center overflow-hidden"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {titleChars.map((char, i) => (
                <motion.span
                  key={i}
                  className="inline-block font-display text-6xl font-bold tracking-wider text-[#F3B939] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] md:text-8xl lg:text-9xl"
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ 
                    y: 0, 
                    opacity: 1,
                    textShadow: [
                      "0 2px 10px rgba(243, 185, 57, 0.3), 0 0 30px rgba(243, 185, 57, 0.1)",
                      "0 2px 15px rgba(243, 185, 57, 0.5), 0 0 40px rgba(243, 185, 57, 0.2)",
                      "0 2px 10px rgba(243, 185, 57, 0.3), 0 0 30px rgba(243, 185, 57, 0.1)",
                    ]
                  }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.3 + i * 0.1,
                    ease: [0.215, 0.61, 0.355, 1],
                    textShadow: {
                      duration: 3, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: i * 0.1,
                    }
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>
            
            {/* Enhanced paw print - keep non-mouse animations */}
            <motion.div
              className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-36 h-36 md:w-48 md:h-48 bg-[url('/images/jungle-book-paw.svg')] bg-contain bg-no-repeat"
              style={{
                filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.3))",
                opacity: 0.25,
              }}
              animate={{
                rotate: [0, 5, 0, -5, 0],
                scale: [1, 1.08, 1],
                opacity: [0.25, 0.35, 0.25],
                filter: [
                  "drop-shadow(0 10px 20px rgba(0,0,0,0.3))",
                  "drop-shadow(0 15px 30px rgba(0,0,0,0.5))",
                  "drop-shadow(0 10px 20px rgba(0,0,0,0.3))",
                ]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
          
          {/* Enhanced subtitle - remove 3D transform */}
          <motion.p 
            className="mt-6 text-2xl text-[#E5E1D6] md:text-3xl max-w-2xl mx-auto font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            style={{
              textShadow: "0 0 15px rgba(229, 225, 214, 0.3)"
            }}
          >
            <motion.span 
              className="italic font-display bg-gradient-to-r from-[#E5E1D6] via-[#FFF8E3] to-[#D4A72C] bg-clip-text text-transparent block mb-2"
              animate={{
                backgroundPosition: ['0% center', '100% center', '0% center']
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              style={{
                backgroundSize: "200% auto",
                textShadow: "0 0 15px rgba(229, 225, 214, 0.3)",
              }}
            >
              "The Jungle Awaits Your Adventure..."
            </motion.span>
            <motion.span 
              className="bg-black/50 px-4 py-2 rounded-full backdrop-blur-md inline-block"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(0, 0, 0, 0.3)",
                  "0 0 30px rgba(0, 0, 0, 0.5)",
                  "0 0 20px rgba(0, 0, 0, 0.3)"
                ]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              Rotaract Club FRCRCE's Annual Trek
            </motion.span>
          </motion.p>
        </motion.div>
        
        {/* Enhanced Countdown Timer - remove 3D transform */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="my-8"
        >
          {isEventPast ? (
            <motion.div 
              className="rounded-xl bg-gradient-to-r from-[#243420]/90 to-[#304F29]/90 backdrop-blur-md px-8 py-5 border-2 border-[#D4A72C]"
              animate={{ 
                boxShadow: [
                  '0 0 20px rgba(212, 167, 44, 0.3)',
                  '0 0 40px rgba(212, 167, 44, 0.5)',
                  '0 0 20px rgba(212, 167, 44, 0.3)'
                ],
                borderColor: ['rgba(212, 167, 44, 1)', 'rgba(243, 185, 57, 1)', 'rgba(212, 167, 44, 1)'],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <p className="text-[#F3B939] text-2xl font-semibold">The adventure has begun!</p>
            </motion.div>
          ) : (
            <motion.div 
              className="grid grid-cols-4 gap-3 md:gap-6 p-5 bg-black/30 backdrop-blur-md rounded-2xl border border-[#D4A72C]/40"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              animate={{
                boxShadow: [
                  '0 15px 30px -10px rgba(0, 0, 0, 0.4)',
                  '0 20px 40px -15px rgba(0, 0, 0, 0.5)',
                  '0 15px 30px -10px rgba(0, 0, 0, 0.4)'
                ],
              }}
            >
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
                    className="relative h-16 w-20 md:h-24 md:w-28 bg-gradient-to-b from-[#243420]/90 to-[#304F29]/90 backdrop-blur-md rounded-2xl flex items-center justify-center border border-[#4A6D33]/30 overflow-hidden"
                    animate={{ 
                      boxShadow: [
                        '0 15px 35px -15px rgba(0, 0, 0, 0.5)',
                        '0 20px 40px -20px rgba(0, 0, 0, 0.6)',
                        '0 15px 35px -15px rgba(0, 0, 0, 0.5)'
                      ],
                      borderColor: item.label === "Seconds" 
                        ? ['rgba(212, 167, 44, 0.3)', 'rgba(243, 185, 57, 0.6)', 'rgba(212, 167, 44, 0.3)']
                        : ['rgba(74, 109, 51, 0.3)', 'rgba(74, 109, 51, 0.5)', 'rgba(74, 109, 51, 0.3)'],
                    }}
                    transition={{ duration: item.label === "Seconds" ? 1 : 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {/* Light effect on countdown elements */}
                    <motion.div 
                      className="absolute inset-0 opacity-50"
                      animate={{
                        background: [
                          'radial-gradient(circle at 50% 0%, rgba(212, 167, 44, 0.15), transparent 60%)',
                          'radial-gradient(circle at 50% 0%, rgba(212, 167, 44, 0.25), transparent 70%)',
                          'radial-gradient(circle at 50% 0%, rgba(212, 167, 44, 0.15), transparent 60%)',
                        ]
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                    
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={item.value}
                        className="font-display text-3xl md:text-4xl font-bold bg-gradient-to-b from-[#F3B939] to-[#D4A72C] bg-clip-text text-transparent"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 20, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {item.value}
                      </motion.span>
                    </AnimatePresence>
                  </motion.div>
                  <motion.span 
                    className="mt-2 text-[#E5E1D6] text-sm md:text-base font-medium"
                    animate={{
                      textShadow: [
                        '0 0 5px rgba(229, 225, 214, 0.3)',
                        '0 0 8px rgba(229, 225, 214, 0.5)',
                        '0 0 5px rgba(229, 225, 214, 0.3)'
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {item.label}
                  </motion.span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Enhanced CTA Button - remove 3D transform */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="mt-8"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="#register">
            <Button className="group relative overflow-hidden bg-gradient-to-r from-[#D4A72C] to-[#F3B939] px-10 py-7 text-xl font-bold text-[#0F1A0A] hover:from-[#F3B939] hover:to-[#D4A72C] rounded-xl transition-all duration-500 shadow-[0_10px_25px_-5px_rgba(212,167,44,0.4)]">
              <motion.span 
                className="relative z-10"
                animate={{
                  textShadow: ['0 0 0px rgba(0,0,0,0)', '0 0 15px rgba(0,0,0,0.4)', '0 0 0px rgba(0,0,0,0)']
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                JOIN THE ADVENTURE
              </motion.span>
              
              {/* Button decorative elements */}
              <span className="absolute inset-0 z-0 bg-[url('/images/vine-pattern.svg')] bg-cover opacity-0 transition-opacity duration-300 group-hover:opacity-40"></span>
              
              <motion.span 
                className="absolute -inset-1 z-0 rounded-xl bg-gradient-to-r from-[#D4A72C] via-[#F3B939] to-[#D4A72C] opacity-0 blur-xl group-hover:opacity-70 transition-all duration-500"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Animated paw prints that appear on hover */}
              <div className="absolute inset-0 overflow-hidden rounded-xl">
                <motion.div 
                  className="absolute -right-6 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-[url('/images/paw-print.svg')] bg-contain bg-no-repeat opacity-0 group-hover:opacity-30"
                  animate={{ x: [50, -120], rotate: [0, -20] }}
                  transition={{ duration: 2, ease: "easeOut", repeat: Infinity, repeatDelay: 1 }}
                />
                <motion.div 
                  className="absolute -left-6 top-1/3 transform -translate-y-1/2 w-8 h-8 bg-[url('/images/paw-print.svg')] bg-contain bg-no-repeat opacity-0 group-hover:opacity-30"
                  animate={{ x: [-50, 120], rotate: [0, 20] }}
                  transition={{ duration: 2.5, ease: "easeOut", repeat: Infinity, repeatDelay: 0.8, delay: 0.5 }}
                />
              </div>
            </Button>
          </Link>
        </motion.div>

        {/* Enhanced scroll indicator */}
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
            <motion.p 
              className="mb-2 text-sm bg-black/40 px-4 py-1.5 rounded-full backdrop-blur-md"
              animate={{
                boxShadow: [
                  '0 0 10px rgba(0, 0, 0, 0.2)',
                  '0 0 20px rgba(0, 0, 0, 0.4)',
                  '0 0 10px rgba(0, 0, 0, 0.2)'
                ],
                textShadow: [
                  '0 0 3px rgba(229, 225, 214, 0.3)',
                  '0 0 8px rgba(229, 225, 214, 0.5)',
                  '0 0 3px rgba(229, 225, 214, 0.3)'
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              Explore The Wild
            </motion.p>
            <motion.svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <motion.path
                d="M12 5V19M12 19L5 12M12 19L19 12"
                stroke="#F3B939"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={{ 
                  strokeDasharray: [24, 24], 
                  strokeDashoffset: [24, 0],
                  filter: [
                    'drop-shadow(0 0 4px rgba(243, 185, 57, 0.3))',
                    'drop-shadow(0 0 8px rgba(243, 185, 57, 0.6))',
                    'drop-shadow(0 0 4px rgba(243, 185, 57, 0.3))'
                  ]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  repeatDelay: 0.5
                }}
              />
            </motion.svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
