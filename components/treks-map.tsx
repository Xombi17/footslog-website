"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

export default function TreksMap() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 })

  const itinerarySchedule = [
    { time: "5:30 AM", event: "REPORTING AT COLLEGE" },
    { time: "6:00 AM", event: "DEPARTURE FROM COLLEGE" },
    { time: "9:00 AM", event: "REACH BASE VILLAGE" },
    { time: "9:15 AM", event: "START ASCEND" },
    { time: "11:15 AM", event: "REACH THE TOP OF SANDHAN VALLEY" },
    { time: "12:00 PM", event: "START DESCEND" },
    { time: "2:00 PM", event: "REACH BASE VILLAGE" },
    { time: "2:45 PM", event: "DEPARTURE FROM SANDHAN VALLEY" },
    { time: "4:00 PM", event: "HALT FOR LUNCH AT A RESTAURANT" },
    { time: "5:30 PM", event: "HEAD TO BANDRA STATION" },
    { time: "8:30 PM", event: "REACH BANDRA STATION" }
  ]

  return (
    <section 
      ref={sectionRef} 
      className="relative py-20 overflow-hidden" 
      id="itinerary"
      style={{
        background: "linear-gradient(to bottom, #0F1A0A, #113907)",
        marginTop: "-2px"
      }}
    >
      {/* Decorative jungle elements */}
      <div className="absolute left-0 top-0 h-full w-24 bg-[url('/images/left-vine.svg')] bg-contain bg-left opacity-30 transform scale-150"></div>
      <div className="absolute right-0 top-0 h-full w-24 bg-[url('/images/right-vine.svg')] bg-contain bg-right opacity-30 transform scale-150"></div>
      
      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[#F3B939] mb-4 tracking-wide treasure-heading">
            ITINERARY
          </h2>
        </motion.div>

        {/* Treasure Map Scroll */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Scroll content with paper texture */}
          <div className="relative rounded-xl overflow-hidden">
            <div 
              className="relative p-8 md:p-12"
              style={{
                background: `url('/images/paper-texture.png')`,
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}
            >
              {/* Overlay for aged look */}
              <div className="absolute inset-0 bg-amber-800/10 mix-blend-multiply"></div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <h3 className="font-display text-3xl font-bold text-[#8B4513] mb-2">SANDHAN VALLEY TREK</h3>
                  <div className="w-3/4 h-1 bg-[#8B4513]/60 mx-auto"></div>
                </div>
                
                <div className="space-y-4">
                  {itinerarySchedule.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-28 md:w-32 flex-shrink-0">
                        <p className="text-[#8B4513] font-extrabold text-lg md:text-xl treasure-heading">{item.time}</p>
                      </div>
                      <div className="flex-grow">
                        <div className="border-l-4 border-[#8B4513] pl-4">
                          <p className="text-[#8B4513] font-bold text-lg md:text-xl">{item.event}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="text-center mt-10">
                  <div className="inline-block">
                    <div className="w-16 h-16 bg-[url('/images/jungle-book-paw.svg')] bg-contain bg-center bg-no-repeat opacity-70"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative paw prints */}
            <div className="absolute top-8 right-8 w-24 h-24 bg-[url('/images/paw-prints.svg')] bg-contain bg-center bg-no-repeat opacity-20 rotate-12"></div>
            <div className="absolute bottom-8 left-8 w-24 h-24 bg-[url('/images/paw-prints.svg')] bg-contain bg-center bg-no-repeat opacity-20 -rotate-12"></div>
          </div>
        </motion.div>
        
        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-10"
        >
          <a 
            href="/register" 
            className="inline-block px-10 py-4 bg-[#F3B939] hover:bg-amber-500 text-[#0A1508] font-bold rounded-full transition-all duration-300 text-xl shadow-lg hover:shadow-amber-400/30 hover:scale-105"
          >
            Join The Adventure
          </a>
        </motion.div>
      </div>
    </section>
  )
} 