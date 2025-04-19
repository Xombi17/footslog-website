"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { ChevronRight } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect } from "react"

// Sandhan Valley natural wonders data
const naturalWonders = [
  {
    name: "Stargazing Experience",
    description: "Experience the breathtaking night sky view from Sandhan Valley, one of Maharashtra's best stargazing spots. The narrow gorge opens up to reveal a blanket of stars unlike anything you've seen in the city.",
    stats: { bestTime: "Clear moonless nights", duration: "2-3 hours", highlight: "Milky Way visibility" },
    image: "/images/stargazing.png",
  },
  {
    name: "Firefly Magic",
    description: "During pre-monsoon months, witness the magical spectacle of thousands of fireflies illuminating the valley with their synchronous flashing, creating a natural light show in the forest.",
    stats: { bestTime: "May-June 2025", duration: "Evening hours", highlight: "Synchronous flashing" },
    image: "/images/fireflies.jpg",
  },
  {
    name: "Valley of Shadows",
    description: "Known as the 'Valley of Shadows,' Sandhan's towering walls create dramatic light and shadow effects throughout the day as sunlight filters through the narrow gorge.",
    stats: { bestTime: "Morning/Evening", duration: "All day", highlight: "Golden hour shadows" },
    image: "/images/valley.png",
  },
  {
    name: "Night Camping",
    description: "Surrounded by the majestic Sahyadri range, camping in Sandhan Valley offers an otherworldly experience. Fall asleep to the sounds of nature and wake up to the breathtaking valley views.",
    stats: { bestTime: "Winter months", duration: "Overnight", highlight: "Sunrise views" },
    image: "/images/nightcamping.jpg",
  }
]

export default function NaturalWonders() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 })
  const cardRefs = useRef<HTMLDivElement[]>([])

  // GSAP Animation
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    
    cardRefs.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        { 
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            end: "bottom 20%",
            toggleActions: "play reverse play reverse"
          },
          delay: index * 0.2
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  // Add card reference
  const addCardRef = (el: HTMLDivElement | null) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el)
    }
  }

  return (
    <section 
      ref={sectionRef} 
      className="relative py-20" 
      id="wonders"
      style={{
        background: "linear-gradient(to bottom, #113907, #0A1508)"
      }}
    >
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#0A1508]/80" />
        <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('/images/stars-bg.svg')] bg-repeat"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[#F3B939] mb-4 tracking-wide">
            Natural Wonders
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
            Discover the magical experiences awaiting you at Sandhan Valley
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {naturalWonders.map((wonder, index) => (
            <div 
              key={index}
              ref={addCardRef}
              className="bg-[#0A1508]/70 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl border border-[#243420]/50 hover:border-[#F3B939]/30 transition-all duration-500"
            >
              <div className="relative h-64">
                <Image 
                  src={wonder.image} 
                  alt={wonder.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1508] to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-6">
                  <h3 className="text-2xl font-bold text-[#F3B939]">{wonder.name}</h3>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-white/90 mb-6">{wonder.description}</p>
                
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="bg-[#1A2614]/70 rounded-lg px-3 py-2 flex-1">
                    <p className="text-[#F3B939] font-medium mb-1">Best Time</p>
                    <p className="text-white">{wonder.stats.bestTime}</p>
                  </div>
                  <div className="bg-[#1A2614]/70 rounded-lg px-3 py-2 flex-1">
                    <p className="text-[#F3B939] font-medium mb-1">Duration</p>
                    <p className="text-white">{wonder.stats.duration}</p>
                  </div>
                  <div className="bg-[#1A2614]/70 rounded-lg px-3 py-2 flex-1">
                    <p className="text-[#F3B939] font-medium mb-1">Highlight</p>
                    <p className="text-white">{wonder.stats.highlight}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="/register" 
            className="inline-flex items-center gap-2 bg-[#F3B939] hover:bg-amber-500 text-[#0A1508] font-bold rounded-full transition-all duration-300 px-8 py-3 shadow-lg hover:shadow-amber-400/30"
          >
            <span>Experience these wonders</span>
            <ChevronRight className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  )
}
