"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

export default function Preloader() {
  const [loading, setLoading] = useState(true)
  const titleChars = "FOOTSLOG".split("")

  useEffect(() => {
    // Show preloader for 2 seconds for better animation visibility
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0F1A0A]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          {/* Logo Element - Similar to navigation */}
          <motion.div 
            className="absolute top-8 left-8 flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="relative w-10 h-10 mr-3">
              <Image 
                src="/images/compass-logo.svg" 
                alt="Footslog Logo" 
                width={40} 
                height={40}
                className="opacity-90"
              />
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ 
                  duration: 15, 
                  ease: "linear",
                  repeat: Infinity 
                }}
              >
                <div className="absolute top-1 left-1/2 w-1 h-1 bg-[#F3B939] rounded-full transform -translate-x-1/2" />
              </motion.div>
            </div>
          </motion.div>

          {/* Main Title - FOOTSLOG */}
          <div className="flex items-center justify-center overflow-hidden mb-6">
            {titleChars.map((char, i) => (
              <motion.span
                key={i}
                className="inline-block font-display text-7xl md:text-9xl font-bold tracking-wider text-[#F3B939]"
                initial={{ y: 100, opacity: 0 }}
                animate={{ 
                  y: 0, 
                  opacity: 1,
                  textShadow: [
                    "0 0 20px rgba(243, 185, 57, 0.3)",
                    "0 0 40px rgba(243, 185, 57, 0.6)",
                    "0 0 20px rgba(243, 185, 57, 0.3)"
                  ] 
                }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.1 + i * 0.1,
                  ease: [0.215, 0.61, 0.355, 1],
                  textShadow: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>
          
          <motion.div
            className="h-1 bg-[#D4A72C] mt-2"
            initial={{ width: 0 }}
            animate={{ width: "200px" }}
            transition={{ 
              duration: 1.5, 
              ease: "easeInOut" 
            }}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="text-white/80 text-lg mt-6 font-medium"
          >
            The Jungle Awaits...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
