"use client"

import { useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { Tally5, Users, MapPin, Award, Mountain } from "lucide-react"

interface StatItem {
  icon: React.ReactNode
  value: string
  label: string
  delay: number
}

export default function AchievementsStats() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.3 })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const translateY = useTransform(scrollYProgress, [0, 0.5], [50, 0])

  const stats: StatItem[] = [
    {
      icon: <Tally5 className="h-10 w-10" />,
      value: "5+",
      label: "Years Running",
      delay: 0
    },
    {
      icon: <Users className="h-10 w-10" />,
      value: "1500+",
      label: "Participants",
      delay: 0.1
    },
    {
      icon: <MapPin className="h-10 w-10" />,
      value: "10+",
      label: "Trek Routes",
      delay: 0.2
    },
    {
      icon: <Award className="h-10 w-10" />,
      value: "4.9/5",
      label: "Average Rating",
      delay: 0.3
    },
    {
      icon: <Mountain className="h-10 w-10" />,
      value: "25+",
      label: "Peaks Conquered",
      delay: 0.4
    },
  ]

  return (
    <div className="py-16 relative bg-gradient-to-b from-[#0F1A0A] to-[#243420]" id="achievements">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-20 bg-[#4A6D33]/10 transform -skew-y-3" />
        <div className="absolute bottom-0 right-0 w-full h-20 bg-[#4A6D33]/10 transform skew-y-3" />
        
        {/* Floating vines */}
        <svg className="absolute top-10 right-10 w-32 h-32 text-[#4A6D33]/20" viewBox="0 0 100 100">
          <path d="M10,90 Q30,40 50,70 T90,10" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M20,80 Q40,30 60,60 T80,20" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
        
        <svg className="absolute bottom-10 left-10 w-32 h-32 text-[#4A6D33]/20" viewBox="0 0 100 100">
          <path d="M90,90 Q70,40 50,70 T10,10" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M80,80 Q60,30 40,60 T20,20" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
      
      <div 
        ref={containerRef}
        className="container mx-auto px-4 relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#D4A72C] mb-4">
            Footslog by the Numbers
          </h2>
          <p className="max-w-2xl mx-auto text-[#E5E1D6]/70">
            Over the years, we've built a legacy of unforgettable adventures and milestones
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              style={{ opacity, y: translateY }}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: stat.delay }}
              className="bg-[#1A2614]/80 backdrop-blur-sm rounded-lg p-6 flex flex-col items-center text-center border border-[#4A6D33]/30 hover:border-[#D4A72C]/50 transition-all hover:transform hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="bg-gradient-to-br from-[#4A6D33]/20 to-[#D4A72C]/20 p-3 rounded-full mb-4 text-[#D4A72C]">
                {stat.icon}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-[#D4A72C] mb-2">
                {stat.value}
              </h3>
              <p className="text-[#E5E1D6]/70 font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-block bg-[#1A2614] px-5 py-3 rounded-full border border-[#4A6D33]/50">
            <p className="text-[#E5E1D6] font-semibold">
              <span className="text-[#D4A72C]">Join us</span> for our most adventurous year yet!
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 