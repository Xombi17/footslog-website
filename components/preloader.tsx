"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

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
          <div className="flex items-center justify-center overflow-hidden">
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
            className="h-1 bg-[#D4A72C] mt-8"
            initial={{ width: 0 }}
            animate={{ width: "200px" }}
            transition={{ 
              duration: 1.5, 
              ease: "easeInOut" 
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
