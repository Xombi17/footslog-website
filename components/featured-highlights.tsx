"use client"

import { useState, useEffect, useRef } from "react"
import { useInView } from "framer-motion"
import Image from "next/image"

export default function FeaturedHighlights() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  // Countdown state
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  
  useEffect(() => {
    const targetDate = new Date("2025-06-07T05:30:00").getTime()
    
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
    <section 
      ref={sectionRef} 
      className="bg-[#0F1A0A] relative" 
      id="highlights"
      style={{
        background: "linear-gradient(to bottom, #0F1A0A, #113907)",
        marginTop: "-2px", // Tiny negative margin to hide potential seam
      }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -left-24 top-1/3 w-64 h-64 rounded-full bg-amber-400/5 blur-3xl"></div>
        <div className="absolute -right-24 bottom-1/3 w-72 h-72 rounded-full bg-amber-400/5 blur-3xl"></div>
      </div>

      {/* Countdown Timer Section */}
      <div className="pb-12 pt-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto animate-on-scroll">
            <div className="bg-[#0A1508]/70 backdrop-blur-sm rounded-2xl p-10 shadow-2xl border border-[#1A2614]/30">
              <h3 className="text-3xl md:text-4xl font-bold text-[#F3B939] mb-6 text-center">
                Countdown to Adventure
              </h3>
              <p className="text-center text-white text-xl mb-10">
                June 7, 2025 • Sandhan Valley Trek
              </p>
              
              <div className="flex flex-wrap justify-center gap-8">
                {[
                  { value: timeLeft.days, label: "Days" },
                  { value: timeLeft.hours, label: "Hours" },
                  { value: timeLeft.minutes, label: "Mins" },
                  { value: timeLeft.seconds, label: "Secs" }
                ].map((unit, i) => (
                  <div 
                    key={i}
                    className="flex flex-col items-center animate-on-scroll"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className="bg-[#0A1508] border-2 border-[#F3B939]/20 rounded-lg w-24 h-24 md:w-32 md:h-32 flex items-center justify-center mb-3 shadow-2xl relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-b from-[#F3B939]/5 to-transparent"></div>
                      <span className="text-4xl md:text-5xl font-bold text-[#F3B939] relative z-10">
                        {String(unit.value).padStart(2, "0")}
                      </span>
                    </div>
                    <span className="text-base text-white/90">{unit.label}</span>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-12 animate-on-scroll">
                <a 
                  href="/register" 
                  className="inline-block px-10 py-4 bg-[#F3B939] hover:bg-amber-500 text-[#0A1508] font-bold rounded-full transition-all duration-300 text-xl shadow-lg hover:shadow-amber-400/30 hover:scale-105"
                >
                  Register Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Journey Begins Section */}
      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="mb-16 text-center animate-on-scroll">
          <h2 className="font-display text-5xl md:text-6xl font-bold text-[#F3B939] mb-6">
            THE JOURNEY BEGINS
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-2xl md:text-3xl text-[#F3B939]">
            DISCOVER THE WILD
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left column - Image */}
          <div className="relative h-[450px] rounded-2xl overflow-hidden shadow-2xl animate-on-scroll">
            <Image 
              src="/images/sandhanvalley.png"
              alt="Sandhan Valley Trek"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1508]/90 to-transparent"></div>
          </div>

          {/* Right column - Text */}
          <div className="space-y-8">
            <div className="text-white space-y-4 animate-on-scroll">
              <p className="text-lg md:text-xl leading-relaxed">
                FOOTSLOG is the annual trekking adventure organized by the Rotaract Club of FRCRCE. Inspired by the timeless tale of The Jungle Book, we invite you to explore the untamed wilderness, discover hidden paths, and connect with nature in its purest form.
              </p>
              <p className="text-lg md:text-xl leading-relaxed">
                Our carefully curated trek to Sandhan Valley offers breathtaking views, challenging trails, and unforgettable experiences. Whether you're a seasoned trekker or a first-timer, FOOTSLOG promises an adventure that will awaken your spirit of exploration.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 animate-on-scroll">
              <div className="bg-[#0A1508]/60 backdrop-blur-sm rounded-xl p-8 text-center transform transition-transform duration-500 hover:scale-105 hover:shadow-lg hover:shadow-amber-400/10">
                <p className="text-amber-400 text-5xl font-bold mb-3">10+</p>
                <p className="text-white text-lg">Years of Experience</p>
              </div>
              <div className="bg-[#0A1508]/60 backdrop-blur-sm rounded-xl p-8 text-center transform transition-transform duration-500 hover:scale-105 hover:shadow-lg hover:shadow-amber-400/10">
                <p className="text-amber-400 text-5xl font-bold mb-3">500+</p>
                <p className="text-white text-lg">Happy Trekkers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 