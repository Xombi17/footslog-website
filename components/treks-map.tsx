"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { MapPin, Flag, Mountain, Droplets, Navigation, ArrowRight } from "lucide-react"

interface TrekPoint {
  name: string
  description: string
  type: "start" | "landmark" | "rest" | "peak" | "end"
  position: { top: string; left: string }
}

const trekPoints: TrekPoint[] = [
  {
    name: "Base Camp",
    description: "Starting point with registration and prep area",
    type: "start",
    position: { top: "75%", left: "20%" }
  },
  {
    name: "Forest Trail",
    description: "Dense forest with rich biodiversity",
    type: "landmark",
    position: { top: "60%", left: "30%" }
  },
  {
    name: "Waterfall Rest",
    description: "Refreshment spot by cascading waterfall",
    type: "rest",
    position: { top: "45%", left: "45%" }
  },
  {
    name: "Eagle's Viewpoint",
    description: "Panoramic valley views and bird watching",
    type: "landmark",
    position: { top: "30%", left: "60%" }
  },
  {
    name: "Summit Peak",
    description: "Highest point with 360° mountain vistas",
    type: "peak",
    position: { top: "25%", left: "70%" }
  },
  {
    name: "Campsite",
    description: "Overnight camping area with facilities",
    type: "end",
    position: { top: "40%", left: "80%" }
  }
]

const getIconByType = (type: TrekPoint["type"]) => {
  switch (type) {
    case "start":
      return <Flag className="h-4 w-4" />
    case "landmark":
      return <Navigation className="h-4 w-4" />
    case "rest":
      return <Droplets className="h-4 w-4" />
    case "peak":
      return <Mountain className="h-4 w-4" />
    case "end":
      return <MapPin className="h-4 w-4" />
  }
}

export default function TreksMap() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 })

  // Trek details
  const trekDetails = [
    { icon: "⏱️", label: "Duration", value: "2 Days, 1 Night" },
    { icon: "📏", label: "Distance", value: "12 km" },
    { icon: "📈", label: "Elevation Gain", value: "850m" },
    { icon: "🥾", label: "Difficulty", value: "Moderate" },
    { icon: "👪", label: "Group Size", value: "10-15 people" }
  ]

  return (
    <section ref={sectionRef} className="relative py-20" id="map">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#1A2614]/90 backdrop-blur-sm" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="font-display text-4xl font-bold text-[#D4A72C] md:text-5xl">
            Trek Route
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#E5E1D6]">
            Explore the breathtaking journey through the Sahyadri Mountains
          </p>
        </motion.div>

        {/* Trek Details Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5"
        >
          {trekDetails.map((detail, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center rounded-lg bg-[#243420]/80 backdrop-blur-sm p-4 text-center border border-[#4A6D33]/30"
            >
              <span className="text-3xl">{detail.icon}</span>
              <h3 className="mt-2 text-sm font-bold text-[#D4A72C]">{detail.label}</h3>
              <p className="text-[#E5E1D6]">{detail.value}</p>
            </div>
          ))}
        </motion.div>

        {/* Trek Map */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative mx-auto mb-12 h-[400px] max-w-4xl overflow-hidden rounded-xl border border-[#4A6D33]/30 bg-[#243420]/80 backdrop-blur-sm shadow-xl"
        >
          {/* Map Background */}
          <div className="absolute inset-0 bg-[#1A2614] opacity-80">
            <div 
              className="h-full w-full opacity-30"
              style={{
                backgroundImage: "url('/images/topographic-pattern.svg')",
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}
            ></div>
          </div>

          {/* Trek Path Line */}
          <svg 
            className="absolute inset-0 h-full w-full" 
            viewBox="0 0 100 100" 
            preserveAspectRatio="none"
          >
            <motion.path
              d="M20,75 C25,65 30,60 45,45 S60,30 70,25 L80,40"
              fill="none"
              stroke="#D4A72C"
              strokeWidth="1"
              strokeDasharray="5,5"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 2, delay: 0.5 }}
            />
          </svg>

          {/* Trek Points */}
          {trekPoints.map((point, index) => (
            <motion.div
              key={index}
              className="absolute flex flex-col items-center"
              style={{ top: point.position.top, left: point.position.left }}
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
            >
              <div 
                className={`group relative flex h-8 w-8 items-center justify-center rounded-full cursor-pointer ${
                  point.type === "peak" ? "bg-[#D4A72C]" : "bg-[#4A6D33]"
                }`}
              >
                {getIconByType(point.type)}
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 mb-2 w-40 -translate-x-1/2 rounded-md bg-[#0F1A0A]/90 p-2 text-center opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                  <p className="text-sm font-bold text-[#D4A72C]">{point.name}</p>
                  <p className="text-xs text-[#E5E1D6]">{point.description}</p>
                </div>
              </div>
              <p className="mt-1 max-w-[80px] text-center text-xs font-medium text-[#E5E1D6]">{point.name}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Trek Route Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mx-auto max-w-4xl rounded-xl border border-[#D4A72C]/30 bg-[#1A2614]/70 backdrop-blur-sm p-6"
        >
          <h3 className="mb-4 text-xl font-bold text-[#D4A72C]">Trek Itinerary</h3>
          
          <div className="space-y-4">
            {[
              {
                day: "Day 1",
                title: "Base Camp to Summit Peak",
                description: "Begin your adventure at the Base Camp with a brief orientation. Trek through the lush Forest Trail, take a break at the refreshing Waterfall Rest, and continue to Eagle's Viewpoint for stunning vistas. Finally, reach the Summit Peak for unforgettable sunset views.",
                time: "8 hours"
              },
              {
                day: "Day 2",
                title: "Summit Peak to Campsite",
                description: "After watching the sunrise from the Summit Peak, trek down to the Campsite. Enjoy outdoor activities, cultural performances, and stargazing at night before returning to Base Camp the next morning.",
                time: "4 hours"
              }
            ].map((day, index) => (
              <div key={index} className="rounded-lg bg-[#243420]/50 p-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#D4A72C] text-xs font-bold text-[#0F1A0A]">
                      {index + 1}
                    </span>
                    <h4 className="text-lg font-bold text-[#D4A72C]">{day.day}: {day.title}</h4>
                  </div>
                  <span className="rounded-full bg-[#4A6D33]/30 px-3 py-1 text-xs text-[#E5E1D6]">
                    {day.time}
                  </span>
                </div>
                <p className="mt-2 text-[#E5E1D6]">{day.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
} 