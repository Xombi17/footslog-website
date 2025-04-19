"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"

const highlights = [
  {
    title: "Thrilling Trail Adventures",
    description: "Experience the adrenaline rush of navigating challenging terrain and discover hidden gems of the Sahyadri range.",
    icon: "🥾",
    image: "/images/trail-adventure.jpg", // Placeholder - replace with actual image
    color: "#D4A72C"
  },
  {
    title: "Campfire Bonding",
    description: "Share stories and forge lifelong friendships under the stars around a warming campfire after a day of adventure.",
    icon: "🔥",
    image: "/images/campfire.jpg", // Placeholder - replace with actual image
    color: "#E55934"
  },
  {
    title: "Wildlife Encounters",
    description: "Spot diverse flora and fauna in their natural habitat, guided by experts who share fascinating ecological knowledge.",
    icon: "🦋",
    image: "/images/wildlife.jpg", // Placeholder - replace with actual image
    color: "#4A6D33"
  }
]

export default function FeaturedHighlights() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })

  return (
    <section ref={sectionRef} className="relative py-20" id="highlights">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#1A2614]/90 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A2614] via-transparent to-[#1A2614] opacity-80" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="font-display text-4xl font-bold text-[#D4A72C] md:text-5xl">
            Trek Highlights
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#E5E1D6]">
            Discover what makes Footslog a must-attend adventure for nature enthusiasts and thrill-seekers alike
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative overflow-hidden rounded-xl border border-[#4A6D33]/30 bg-[#243420]/80 backdrop-blur-sm p-6 shadow-xl"
            >
              {/* Content */}
              <div className="relative z-10">
                <div 
                  className="mb-4 flex h-16 w-16 items-center justify-center rounded-full text-3xl"
                  style={{ background: `${highlight.color}20`, color: highlight.color }}
                >
                  {highlight.icon}
                </div>
                <h3 className="mb-3 text-xl font-bold text-[#D4A72C]">{highlight.title}</h3>
                <p className="text-[#E5E1D6]">{highlight.description}</p>
              </div>

              {/* Glow effect and animations */}
              <div className="absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div 
                  className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full blur-3xl"
                  style={{ background: `${highlight.color}20` }}
                ></div>
              </div>

              {/* Hover animation */}
              <motion.div
                className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full"
                style={{ background: highlight.color }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Featured callout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 rounded-xl border border-[#D4A72C]/30 bg-[#1A2614]/80 backdrop-blur-sm p-6 shadow-xl"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative h-40 w-40 md:h-32 md:w-32 flex-shrink-0 overflow-hidden rounded-full border-4 border-[#D4A72C]/30">
              <div className="flex h-full w-full items-center justify-center bg-[#243420] text-5xl">🌄</div>
            </div>
            <div>
              <h3 className="mb-2 text-2xl font-bold text-[#D4A72C]">This Year's Special: Sunrise Summit</h3>
              <p className="text-[#E5E1D6]">
                Join our pre-dawn trek to witness the breathtaking sunrise from the peak. The golden rays breaking through the morning mist create a magical experience you'll cherish forever. Our experienced guides will lead you safely to the perfect viewpoint.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 