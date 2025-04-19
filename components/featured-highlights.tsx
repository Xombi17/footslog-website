"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"

export default function FeaturedHighlights() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })
  
  // Countdown state
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  
  useEffect(() => {
    const targetDate = new Date("2024-07-27T05:30:00").getTime()
    
    const updateTimer = () => {
      const now = new Date().getTime()
      const distance = targetDate - now
      
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        })
      }
    }
    
    updateTimer()
    const interval = setInterval(updateTimer, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section ref={sectionRef} className="bg-[#113907] relative py-20" id="highlights">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black/30 to-transparent"></div>
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black/30 to-transparent"></div>
        <div className="absolute -left-24 top-1/3 w-48 h-48 rounded-full bg-amber-400/10 blur-3xl"></div>
        <div className="absolute -right-24 bottom-1/3 w-64 h-64 rounded-full bg-amber-400/10 blur-3xl"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="font-display text-5xl font-bold text-[#F3B939] mb-4">
            THE JOURNEY BEGINS
          </h2>
          <div className="h-1 w-32 bg-[#F3B939] mx-auto mb-6"></div>
          <p className="mx-auto mt-4 max-w-2xl text-2xl text-[#F3B939]">
            DISCOVER THE WILD
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-[400px] rounded-xl overflow-hidden shadow-2xl"
          >
            <Image 
              src="/images/jungle-book-bg.png"
              alt="Trek Adventure"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#113907]/80 to-transparent"></div>
          </motion.div>

          {/* Right column - Text and countdown */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="mb-8 text-white space-y-4">
              <p className="text-lg">
                FOOTSLOG is the annual trekking adventure organized by the Rotaract Club of FRCRCE. Inspired by the timeless tale of The Jungle Book, we invite you to explore the untamed wilderness, discover hidden paths, and connect with nature in its purest form.
              </p>
              <p className="text-lg">
                Our carefully curated trek routes offer breathtaking views, challenging trails, and unforgettable experiences. Whether you're a seasoned trekker or a first-timer, FOOTSLOG promises an adventure that will awaken your spirit of exploration.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="bg-green-900/50 backdrop-blur-sm border border-green-800/50 rounded-xl p-6 text-center">
                <p className="text-amber-400 text-4xl font-bold mb-2">10+</p>
                <p className="text-white">Years of Experience</p>
              </div>
              <div className="bg-green-900/50 backdrop-blur-sm border border-green-800/50 rounded-xl p-6 text-center">
                <p className="text-amber-400 text-4xl font-bold mb-2">500+</p>
                <p className="text-white">Happy Trekkers</p>
              </div>
            </div>

            {/* Countdown timer */}
            <div className="bg-green-900/50 backdrop-blur-sm border border-green-800/50 rounded-xl p-6 shadow-xl">
              <p className="text-xl font-bold text-amber-300 mb-4 text-center">Countdown to Adventure</p>
              <p className="text-center text-white mb-6">July 27, 2024 • Kothaligad Trek</p>
              <div className="flex justify-center gap-4">
                {[
                  { value: timeLeft.days, label: "Days" },
                  { value: timeLeft.hours, label: "Hours" },
                  { value: timeLeft.minutes, label: "Mins" },
                  { value: timeLeft.seconds, label: "Secs" }
                ].map((unit, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="bg-green-800/80 border border-green-700 rounded-lg w-16 h-16 flex items-center justify-center mb-1">
                      <span className="text-2xl font-bold text-amber-400">
                        {String(unit.value).padStart(2, "0")}
                      </span>
                    </div>
                    <span className="text-xs text-amber-200/80">{unit.label}</span>
                  </div>
                ))}
              </div>
              <div className="text-center mt-6">
                <a 
                  href="/register" 
                  className="inline-block px-6 py-2 bg-amber-500 hover:bg-amber-600 text-green-950 font-bold rounded-md transition-colors duration-300"
                >
                  Register Now
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 