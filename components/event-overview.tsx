"use client"

import { useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { MapPin, Calendar, Mountain, Droplets, Users, Info, IndianRupee } from "lucide-react"
import Image from "next/image"

const timelineEvents = [
  {
    date: "October 15, 2023",
    title: "Registration Opens",
    description: "Register early to secure your spot for this exciting adventure! Limited seats available.",
    icon: <Calendar className="h-6 w-6 text-[#F3B939]" />,
  },
  {
    date: "November 5, 2023",
    title: "Pre-Trek Briefing",
    description: "Gather for an essential briefing on trek details, safety guidelines, and equipment checklist.",
    icon: <Users className="h-6 w-6 text-[#F3B939]" />,
  },
  {
    date: "November 18-20, 2023",
    title: "Footslog Trek",
    description: "The main event! Three days of adventure through the breathtaking Sandhan Valley.",
    icon: <Mountain className="h-6 w-6 text-[#F3B939]" />,
  },
  {
    date: "November 25, 2023",
    title: "Photo Sharing & Certificates",
    description: "Celebrate your achievement! Share photos and receive your completion certificates.",
    icon: <Droplets className="h-6 w-6 text-[#F3B939]" />,
  },
]

export default function EventOverview() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  return (
    <section ref={sectionRef} className="relative py-20" id="overview">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#1A2614]/80 backdrop-blur-sm" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="font-display text-4xl font-bold text-[#F3B939] md:text-5xl">The Adventure Awaits</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#E5E1D6]">
            <span className="italic">
              "The strength of the pack is the wolf, and the strength of the wolf is the pack."
            </span>{" "}
            - Join our trek family!
          </p>
        </motion.div>

        {/* Timeline Cards - Redesigned */}
        <div className="mb-20">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="rounded-xl bg-gradient-to-br from-[#243420]/90 to-[#1A2614]/90 backdrop-blur-sm p-6 border border-[#4A6D33]/30 shadow-lg hover:shadow-xl transition-all duration-300 h-full group hover:translate-y-[-5px]">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-[#0F1A0A] shadow-lg border border-[#F3B939]/50 group-hover:border-[#F3B939] transition-colors duration-300">
                        {event.icon}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-[#F3B939] uppercase tracking-wider">{event.date}</div>
                        <h3 className="text-xl font-bold text-white">{event.title}</h3>
                      </div>
                    </div>
                    
                    <p className="text-[#E5E1D6]/90 mt-3 leading-relaxed text-sm md:text-base">{event.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Trek Details Card with Cost */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-4xl rounded-xl bg-gradient-to-br from-[#243420]/90 to-[#1A2614]/90 backdrop-blur-sm p-8 shadow-xl border border-[#4A6D33]/30 overflow-hidden relative mb-12"
        >
          {/* Decorative elements */}
          <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full bg-[#F3B939]/5 blur-3xl"></div>
          <div className="absolute -left-16 -top-16 w-48 h-48 rounded-full bg-[#F3B939]/5 blur-3xl"></div>

          <h3 className="mb-6 text-2xl font-bold text-[#F3B939] relative z-10">Trek Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            <div>
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <IndianRupee className="h-5 w-5 text-[#F3B939]" />
                  <h4 className="font-bold text-[#F3B939] text-lg">Trek Fee</h4>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-white">₹850</span>
                  <span className="text-[#E5E1D6]/80 text-sm">per person</span>
                </div>
                <p className="text-[#E5E1D6]/80 mt-2 text-sm">Includes transportation, equipment, guides, and basic refreshments</p>
              </div>
              
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Info className="h-5 w-5 text-[#F3B939]" />
                  <h4 className="font-bold text-[#F3B939] text-lg">What's Included</h4>
                </div>
                <ul className="text-[#E5E1D6] space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#F3B939]"></span>
                    <span>Professional trek guides</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#F3B939]"></span>
                    <span>Transportation to and from base camp</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#F3B939]"></span>
                    <span>Safety equipment and first aid</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#F3B939]"></span>
                    <span>Completion certificate</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="relative h-64 rounded-lg overflow-hidden">
              <Image 
                src="/images/sandhanvalley.png" 
                alt="Sandhan Valley"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1A0A]/90 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-[#F3B939]" />
                  <h4 className="text-xl font-bold text-white">Sandhan Valley</h4>
                </div>
                <p className="text-[#E5E1D6]/90 text-sm">Western Ghats, Maharashtra</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 grid gap-4 md:grid-cols-3 relative z-10">
            <motion.div
              className="rounded-lg bg-[#0F1A0A]/50 backdrop-blur-sm p-4 text-center border border-[#4A6D33]/30"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.8 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <h4 className="font-bold text-[#F3B939]">Difficulty</h4>
              <p className="text-[#E5E1D6]">Moderate</p>
            </motion.div>
            <motion.div
              className="rounded-lg bg-[#0F1A0A]/50 backdrop-blur-sm p-4 text-center border border-[#4A6D33]/30"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.8 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <h4 className="font-bold text-[#F3B939]">Distance</h4>
              <p className="text-[#E5E1D6]">12 km</p>
            </motion.div>
            <motion.div
              className="rounded-lg bg-[#0F1A0A]/50 backdrop-blur-sm p-4 text-center border border-[#4A6D33]/30"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.8 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <h4 className="font-bold text-[#F3B939]">Elevation</h4>
              <p className="text-[#E5E1D6]">1,200 m</p>
            </motion.div>
          </div>
          
          <div className="text-center mt-8 relative z-10">
            <a 
              href="/register" 
              className="inline-block px-8 py-3 bg-[#F3B939] hover:bg-amber-500 text-[#0A1508] font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-amber-400/30 hover:scale-105"
            >
              Register Now
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
