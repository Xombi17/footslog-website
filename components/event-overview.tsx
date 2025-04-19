"use client"

import { useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { MapPin, Calendar, Mountain, Droplets, Users, Info, IndianRupee } from "lucide-react"
import Image from "next/image"

const timelineEvents = [
  {
    date: "May 1, 2025",
    title: "Registration Opens",
    description: "Register early to secure your spot for this exciting adventure! Limited seats available.",
    icon: <Calendar className="h-6 w-6 text-[#F3B939]" />,
  },
  {
    date: "May 25, 2025",
    title: "Pre-Trek Briefing",
    description: "Gather for an essential briefing on trek details, safety guidelines, and equipment checklist.",
    icon: <Users className="h-6 w-6 text-[#F3B939]" />,
  },
  {
    date: "June 7, 2025",
    title: "Footslog Trek",
    description: "The main event! An unforgettable adventure through the breathtaking Sandhan Valley.",
    icon: <Mountain className="h-6 w-6 text-[#F3B939]" />,
  },
  {
    date: "June 14, 2025",
    title: "Photo Sharing & Certificates",
    description: "Celebrate your achievement! Share photos and receive your completion certificates.",
    icon: <Droplets className="h-6 w-6 text-[#F3B939]" />,
  },
]

// Trek events data
const trekEvents = [
  {
    title: "Sandhan Valley Trek",
    description: "A thrilling trek through the Valley of Shadows",
    date: "June 7, 2025",
    difficulty: "Moderate",
    price: "₹850"
  },
  {
    title: "Kalavantin Durg Trek",
    description: "Climb the 'Climb to Heaven' fortress",
    date: "May 24, 2025",
    difficulty: "Challenging",
    price: "₹950"
  },
  {
    title: "Rajmachi Trek",
    description: "3-day trek with camping under the stars",
    date: "May 10-12, 2025",
    difficulty: "Moderate",
    price: "₹1,250"
  },
  {
    title: "Harishchandragad Trek",
    description: "Explore ancient caves and breathtaking views",
    date: "April 27, 2025",
    difficulty: "Moderate-Hard",
    price: "₹1,100"
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
    <section 
      ref={sectionRef} 
      className="relative py-20" 
      id="overview"
      style={{
        background: "linear-gradient(to bottom, #113907, #0F1A0A)",
        marginTop: "-2px", // Tiny negative margin to hide potential seam
      }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -left-24 top-1/3 w-64 h-64 rounded-full bg-amber-400/5 blur-3xl"></div>
        <div className="absolute -right-24 bottom-1/3 w-72 h-72 rounded-full bg-amber-400/5 blur-3xl"></div>
      </div>

      {/* Character decorations that scroll with page */}
      <div className="absolute top-20 right-0 w-48 h-48 opacity-100 z-0">
        <Image
          src="/images/bagheera.png"
          alt="Bagheera"
          width={180}
          height={180}
          className="object-contain"
          style={{ filter: 'drop-shadow(0 0 10px rgba(0, 0, 0, 0.5))' }}
        />
      </div>
      
      <div className="absolute bottom-40 left-10 w-36 h-36 opacity-80 z-0">
        <Image
          src="/images/kaa.png"
          alt="Kaa"
          width={150}
          height={150}
          className="object-contain"
          style={{ filter: 'drop-shadow(0 0 10px rgba(0, 0, 0, 0.5))' }}
        />
      </div>
      
      {/* Additional Mowgli images in different sizes */}
      <div className="absolute top-40 left-10 w-28 h-28 opacity-80 z-0">
        <Image
          src="/images/baloo.png"
          alt="Baloo"
          width={120}
          height={120}
          className="object-contain rotate-12"
          style={{ filter: 'drop-shadow(0 0 10px rgba(0, 0, 0, 0.5))' }}
        />
      </div>
      
      <div className="absolute bottom-20 right-20 w-24 h-24 opacity-70 z-0">
        <Image
          src="/images/mowgly-hanging.png"
          alt="Mowgli"
          width={100}
          height={100}
          className="object-contain -rotate-6 scale-x-[-1]"
          style={{ filter: 'drop-shadow(0 0 10px rgba(0, 0, 0, 0.5))' }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="font-display text-4xl font-bold text-[#F3B939] md:text-5xl mb-6">The Adventure Awaits</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#E5E1D6] font-sans">
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
                  className="animate-on-scroll"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="rounded-xl bg-[#0A1508]/70 backdrop-blur-sm p-6 border border-[#1A2614]/30 shadow-xl hover:shadow-2xl transition-all duration-300 h-full group hover:translate-y-[-5px]">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-[#0A1508] shadow-lg border border-[#F3B939]/20 group-hover:border-[#F3B939] transition-colors duration-300">
                        {event.icon}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-[#F3B939] uppercase tracking-wider">{event.date}</div>
                        <h3 className="text-xl font-bold text-white">{event.title}</h3>
                  </div>
                </div>

                    <p className="text-white/90 mt-3 leading-relaxed text-sm md:text-base font-sans">{event.description}</p>
                  </div>
              </motion.div>
            ))}
            </div>
          </div>
        </div>

        {/* Trek Details Card with Cost and Map */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-6xl rounded-2xl bg-[#0A1508]/70 backdrop-blur-sm p-8 shadow-2xl border border-[#1A2614]/30 overflow-hidden relative mb-12 animate-on-scroll"
        >
          {/* Decorative elements - Match the FeaturedHighlights styling */}
          <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full bg-amber-400/5 blur-3xl"></div>
          <div className="absolute -left-16 -top-16 w-48 h-48 rounded-full bg-amber-400/5 blur-3xl"></div>

          <h3 className="mb-6 text-3xl md:text-4xl font-bold text-[#F3B939] relative z-10 text-center font-display">Trek Details</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
            {/* Left Column - Trek Details */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-2">
                    <IndianRupee className="h-6 w-6 text-[#F3B939]" />
                    <h4 className="font-bold text-[#F3B939] text-xl">Trek Fee</h4>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-white">₹850</span>
                    <span className="text-white/80 text-sm font-sans">per person</span>
                  </div>
                  <p className="text-white/80 mt-2 font-sans">Includes transportation, equipment, guides, and basic refreshments</p>
                </div>
                
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-3">
                    <Info className="h-6 w-6 text-[#F3B939]" />
                    <h4 className="font-bold text-[#F3B939] text-xl">What's Included</h4>
                  </div>
                  <ul className="text-white space-y-3 font-sans">
                    <li className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-[#F3B939]"></span>
                      <span>Professional trek guides</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-[#F3B939]"></span>
                      <span>Transportation to and from base camp</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-[#F3B939]"></span>
                      <span>Safety equipment and first aid</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full bg-[#F3B939]"></span>
                      <span>Completion certificate</span>
                    </li>
                  </ul>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-[#0A1508] border-2 border-[#F3B939]/20 rounded-lg p-4 text-center shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#F3B939]/5 to-transparent"></div>
                    <h4 className="font-bold text-[#F3B939] relative z-10">Difficulty</h4>
                    <p className="text-white relative z-10 font-sans">Moderate</p>
                  </div>
                  <div className="bg-[#0A1508] border-2 border-[#F3B939]/20 rounded-lg p-4 text-center shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#F3B939]/5 to-transparent"></div>
                    <h4 className="font-bold text-[#F3B939] relative z-10">Distance</h4>
                    <p className="text-white relative z-10">12 km</p>
                  </div>
                  <div className="bg-[#0A1508] border-2 border-[#F3B939]/20 rounded-lg p-4 text-center shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#F3B939]/5 to-transparent"></div>
                    <h4 className="font-bold text-[#F3B939] relative z-10">Elevation</h4>
                    <p className="text-white relative z-10">1,200 m</p>
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-6">
                <a 
                  href="/register" 
                  className="inline-block px-10 py-4 bg-[#F3B939] hover:bg-amber-500 text-[#0A1508] font-bold rounded-full transition-all duration-300 text-xl shadow-lg hover:shadow-amber-400/30 hover:scale-105"
                >
                  Register Now
                </a>
              </div>
            </div>

            {/* Right Column - Google Map */}
            <div className="h-full">
              <div className="bg-[#0A1508] border-2 border-[#F3B939]/20 rounded-xl overflow-hidden shadow-2xl h-full flex flex-col">
                <div className="p-4 flex items-center gap-2 border-b border-[#1A2614]/50">
                  <MapPin className="h-5 w-5 text-[#F3B939]" />
                  <div>
                    <h4 className="text-xl font-bold text-white">Sandhan Valley</h4>
                    <p className="text-white/80 text-sm">Western Ghats, Maharashtra</p>
                  </div>
                </div>
                <div className="w-full h-full min-h-[350px] relative">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7521.258131091493!2d73.6860967!3d19.51458835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdd7710dee4b92b%3A0x9b038473bf56be32!2sSandhan%20Valley!5e0!3m2!1sen!2sin!4v1745074834552!5m2!1sen!2sin" 
                    className="absolute inset-0 w-full h-full border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
            </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
