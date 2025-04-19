"use client"

import { useState, useEffect, useRef } from "react"

export default function CountdownBanner() {
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
      className="py-20 bg-gradient-to-b from-[#0a2304] to-[#113907]" 
      style={{ boxShadow: "inset 0 0 50px rgba(0,0,0,0.5)" }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto animate-on-scroll">
          <div className="bg-[#0c2d05]/70 backdrop-blur-sm rounded-2xl p-10 shadow-2xl">
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
                  <div className="bg-[#0a2304] border-2 border-[#F3B939]/20 rounded-lg w-24 h-24 md:w-32 md:h-32 flex items-center justify-center mb-3 shadow-2xl relative overflow-hidden">
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
                className="inline-block px-10 py-4 bg-[#F3B939] hover:bg-amber-500 text-[#0c2d05] font-bold rounded-full transition-all duration-300 text-xl shadow-lg hover:shadow-amber-400/30 hover:scale-105"
              >
                Register Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 