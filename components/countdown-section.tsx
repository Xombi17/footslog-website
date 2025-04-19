"use client"

import { useEffect, useRef } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import CountdownTimer from "./countdown-timer"

export default function CountdownSection() {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  return (
    <section className="py-16 bg-[#0F1A0A] relative overflow-hidden border-t border-b border-green-900/50">
      {/* Decorative Elements */}
      <div className="absolute -left-24 top-1/3 w-48 h-48 rounded-full bg-amber-400/10 blur-3xl"></div>
      <div className="absolute -right-24 bottom-1/3 w-64 h-64 rounded-full bg-amber-400/10 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
          className="bg-green-900/50 backdrop-blur-sm border border-green-800/50 rounded-xl p-8 md:p-12 shadow-xl relative z-10"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-amber-400 mb-4 treasure-heading">The Adventure Awaits</h2>
            <p className="text-amber-100 max-w-2xl mx-auto">
              Mark your calendars for our trek to Kothaligad. The countdown has begun!
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-amber-300 mb-2">FOOTSLOG 2024</h3>
              <p className="text-amber-100">July 27, 2024</p>
              <p className="text-amber-100">Kothaligad, Maharashtra</p>
              <a 
                href="/register" 
                className="mt-6 px-6 py-2 bg-amber-500 hover:bg-amber-600 text-green-950 font-bold rounded-md transition-colors duration-300 inline-block"
              >
                Register Now
              </a>
            </div>

            <div className="md:border-l md:border-green-700 md:pl-8 py-4">
              <CountdownTimer targetDate={new Date("2024-07-27T05:30:00")} className="scale-110 md:scale-125" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 