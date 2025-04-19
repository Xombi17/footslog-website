"use client"

import { useRef } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { MapPin, Calendar, Mountain, Droplets, Users } from "lucide-react"

const timelineEvents = [
  {
    date: "October 15, 2023",
    title: "Registration Opens",
    icon: <Calendar className="h-6 w-6 text-[#D4A72C]" />,
  },
  {
    date: "November 5, 2023",
    title: "Pre-Trek Briefing",
    icon: <Users className="h-6 w-6 text-[#D4A72C]" />,
  },
  {
    date: "November 18-20, 2023",
    title: "Footslog Trek",
    icon: <Mountain className="h-6 w-6 text-[#D4A72C]" />,
  },
  {
    date: "November 25, 2023",
    title: "Photo Sharing & Certificates",
    icon: <Droplets className="h-6 w-6 text-[#D4A72C]" />,
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
          <h2 className="font-serif text-4xl font-bold text-[#D4A72C] md:text-5xl">The Adventure Awaits</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#E5E1D6]">
            <span className="italic">
              "The strength of the pack is the wolf, and the strength of the wolf is the pack."
            </span>{" "}
            - Join our trek family!
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="mb-20">
          <div className="relative mx-auto max-w-4xl">
            {/* Timeline line */}
            <motion.div
              className="absolute left-1/2 top-0 w-1 bg-[#D4A72C]"
              style={{
                height: useTransform(scrollYProgress, [0, 0.9], ["0%", "100%"]),
                translateX: "-50%",
              }}
            ></motion.div>

            {/* Timeline events */}
            {timelineEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative mb-12 flex ${index % 2 === 0 ? "justify-end md:flex-row-reverse" : "justify-start"}`}
              >
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                  <div className="rounded-lg bg-[#243420]/80 backdrop-blur-sm p-6 shadow-lg border border-[#4A6D33]/30">
                    <div className="mb-2 text-sm font-semibold text-[#8B9D7D]">{event.date}</div>
                    <h3 className="text-xl font-bold text-[#D4A72C]">{event.title}</h3>
                  </div>
                </div>

                {/* Timeline dot */}
                <motion.div
                  className="absolute left-1/2 top-6 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-[#243420] shadow-md border border-[#D4A72C]"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: false, amount: 0.8 }}
                  transition={{ type: "spring", stiffness: 300, delay: index * 0.2 + 0.3 }}
                >
                  {event.icon}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trek Map */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto max-w-4xl rounded-xl bg-[#243420]/80 backdrop-blur-sm p-6 shadow-xl border border-[#4A6D33]/30"
        >
          <h3 className="mb-4 font-serif text-2xl font-bold text-[#D4A72C]">Trek Location</h3>
          <div className="relative h-[300px] w-full overflow-hidden rounded-lg bg-[#1A2614] md:h-[400px]">
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=800')] bg-cover bg-center opacity-70"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-lg bg-[#0F1A0A]/80 backdrop-blur-sm p-4 text-center">
                <MapPin className="mx-auto h-8 w-8 text-[#D4A72C]" />
                <h4 className="mt-2 text-xl font-bold text-white">Sahyadri Mountains</h4>
                <p className="text-[#E5E1D6]">Western Ghats, Maharashtra</p>
              </div>
            </div>

            {/* Map markers */}
            <div className="absolute left-[30%] top-[40%] h-6 w-6 animate-pulse rounded-full bg-[#D4A72C]/50">
              <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4A72C]"></div>
            </div>
            <div className="absolute left-[60%] top-[60%] h-6 w-6 animate-pulse rounded-full bg-[#D4A72C]/50">
              <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4A72C]"></div>
            </div>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <motion.div
              className="rounded-lg bg-[#1A2614]/80 backdrop-blur-sm p-4 text-center border border-[#4A6D33]/30"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.8 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <h4 className="font-bold text-[#D4A72C]">Difficulty</h4>
              <p className="text-[#E5E1D6]">Moderate</p>
            </motion.div>
            <motion.div
              className="rounded-lg bg-[#1A2614]/80 backdrop-blur-sm p-4 text-center border border-[#4A6D33]/30"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.8 }}
              transition={{ duration: 0.4, delay: 0.7 }}
            >
              <h4 className="font-bold text-[#D4A72C]">Distance</h4>
              <p className="text-[#E5E1D6]">12 km</p>
            </motion.div>
            <motion.div
              className="rounded-lg bg-[#1A2614]/80 backdrop-blur-sm p-4 text-center border border-[#4A6D33]/30"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.8 }}
              transition={{ duration: 0.4, delay: 0.8 }}
            >
              <h4 className="font-bold text-[#D4A72C]">Elevation</h4>
              <p className="text-[#E5E1D6]">1,200 m</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
