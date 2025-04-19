"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

// Group itinerary items by character guides
const itineraryByGuide = [
  {
    guide: "Bagheera",
    description: "The wise panther guides the beginning of your journey",
    color: "from-purple-900/40 to-black/30",
    colorAccent: "border-purple-600/50",
    items: [
      { time: "5:30 AM", event: "REPORTING AT COLLEGE", hint: "Swift like Bagheera, arrive on time" },
      { time: "6:00 AM", event: "DEPARTURE FROM COLLEGE", hint: "The journey into the wild begins" },
      { time: "9:00 AM", event: "REACH BASE VILLAGE", hint: "Your gateway to the jungle" }
    ]
  },
  {
    guide: "Baloo",
    description: "The fun-loving bear leads you on the ascent",
    color: "from-blue-900/40 to-blue-700/20",
    colorAccent: "border-blue-500/50",
    items: [
      { time: "9:15 AM", event: "START ASCEND", hint: "With Baloo's strength, begin the climb" },
      { time: "11:15 AM", event: "REACH THE TOP OF SANDHAN VALLEY", hint: "The bare necessities of achievement!" }
    ]
  },
  {
    guide: "Kaa",
    description: "The wise serpent shows you the path down",
    color: "from-green-900/40 to-emerald-700/20",
    colorAccent: "border-emerald-500/50",
    items: [
      { time: "12:00 PM", event: "START DESCEND", hint: "Slither down the winding path" },
      { time: "2:00 PM", event: "REACH BASE VILLAGE", hint: "Complete the loop through the jungle" }
    ]
  },
  {
    guide: "King Louie",
    description: "The jungle king brings you back to civilization",
    color: "from-orange-900/40 to-amber-700/20",
    colorAccent: "border-amber-500/50",
    items: [
      { time: "2:45 PM", event: "DEPARTURE FROM SANDHAN VALLEY", hint: "Bid farewell to the wilderness" },
      { time: "4:00 PM", event: "HALT FOR LUNCH AT A RESTAURANT", hint: "Feast like kings of the jungle" },
      { time: "5:30 PM", event: "HEAD TO BANDRA STATION", hint: "The journey home begins" },
      { time: "8:30 PM", event: "REACH BANDRA STATION", hint: "Return with tales of adventure" }
    ]
  }
]

export default function TreksMap() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 })

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
          className="mb-12 text-center"
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[#F3B939] mb-4 tracking-wide treasure-heading">
            JUNGLE JOURNEY
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
            Follow our Jungle Book guides through your trek adventure
          </p>
        </motion.div>

        {/* Character-guided Itinerary */}
        <div className="max-w-4xl mx-auto space-y-16">
          {itineraryByGuide.map((section, sectionIndex) => (
            <motion.div
              key={sectionIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
              className="relative"
            >
              {/* Character guide header */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${section.color} flex items-center justify-center shadow-lg border-2 border-[#F3B939]/40`}>
                  <div className={`w-12 h-12 bg-[url('/images/jungle-book-paw.svg')] bg-contain bg-center bg-no-repeat opacity-90`}></div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#F3B939]">{section.guide}</h3>
                  <p className="text-white/80">{section.description}</p>
                </div>
              </div>
              
              {/* Schedule items for this guide */}
              <div className={`ml-8 pl-8 border-l-2 ${section.colorAccent} space-y-6`}>
                {section.items.map((item, itemIndex) => (
                  <motion.div
                    key={itemIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.8 }}
                    transition={{ duration: 0.4, delay: 0.1 + itemIndex * 0.1 }}
                    className="relative"
                  >
                    {/* Timeline dot */}
                    <div className="absolute -left-[34px] top-1/2 w-6 h-6 -translate-y-1/2 bg-[url('/images/paw-prints.svg')] bg-contain bg-center bg-no-repeat"></div>
                    
                    <div className={`bg-[#0A1508]/70 backdrop-blur-sm rounded-xl p-6 border border-[#1A2614]/50 hover:border-[#F3B939]/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-3px]`}>
                      <div className="flex flex-wrap gap-4 items-start justify-between mb-2">
                        <div className="bg-[#F3B939]/10 px-3 py-1.5 rounded-lg">
                          <span className="text-[#F3B939] font-bold">{item.time}</span>
                        </div>
                        <h4 className="text-xl font-bold text-white tracking-wide">{item.event}</h4>
                      </div>
                      <p className="text-white/70 text-sm italic">{item.hint}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Journey connector */}
              {sectionIndex < itineraryByGuide.length - 1 && (
                <div className="absolute left-8 -bottom-10 h-5 w-5">
                  <div className="h-full w-full bg-[url('/images/paw-prints.svg')] bg-contain bg-center bg-no-repeat opacity-50 transform -rotate-45"></div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
        
        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-3xl mx-auto mt-16 text-center"
        >
          <blockquote className="italic text-xl md:text-2xl text-[#F3B939]/90 mb-4">
            "Look for the bare necessities, the simple bare necessities. Forget about your worries and your strife!"
          </blockquote>
          <p className="text-white/80">— Baloo, The Jungle Book</p>
        </motion.div>
        
        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <a 
            href="/register" 
            className="inline-block px-10 py-4 bg-[#F3B939] hover:bg-amber-500 text-[#0A1508] font-bold rounded-full transition-all duration-300 text-xl shadow-lg hover:shadow-amber-400/30 hover:scale-105"
          >
            Join The Pack
          </a>
        </motion.div>
      </div>
    </section>
  )
} 