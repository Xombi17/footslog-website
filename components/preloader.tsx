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
          {/* Decorative jungle elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-24 h-full bg-[url('/images/left-vine.svg')] bg-contain bg-left opacity-50"></div>
            <div className="absolute top-0 right-0 w-24 h-full bg-[url('/images/right-vine.svg')] bg-contain bg-right opacity-50"></div>
            <div className="absolute bottom-10 left-10 w-40 h-40 opacity-30">
              <Image
                src="/images/mowgly-hanging.png"
                alt="Mowgli"
                width={160}
                height={160}
                className="object-contain -rotate-12"
                style={{ filter: 'drop-shadow(0 0 10px rgba(0, 0, 0, 0.5))' }}
              />
            </div>
            <div className="absolute top-10 right-10 w-40 h-40 opacity-30">
              <Image
                src="/images/sherkhan.png"
                alt="Shere Khan"
                width={160}
                height={160}
                className="object-contain rotate-12"
              />
            </div>
          </div>

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

          {/* Main Content Container */}
          <motion.div 
            className="relative z-10 flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Main Title - FOOTSLOG */}
            <div className="flex items-center justify-center mb-6 relative">
              {/* Glow effect behind text */}
              <motion.div 
                className="absolute w-[130%] h-[150%] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#F3B939]/5 blur-[60px] rounded-[100%]"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.4, 0.7, 0.4], scale: [0.9, 1.1, 0.9] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              
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
              className="h-1.5 bg-gradient-to-r from-transparent via-[#D4A72C] to-transparent rounded-full mt-2"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "250px", opacity: 1 }}
              transition={{ 
                duration: 1.5, 
                ease: "easeInOut" 
              }}
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="text-white/90 text-lg mt-6 font-medium font-sans"
            >
              The Jungle Awaits...
            </motion.p>
          </motion.div>
          
          {/* Loading indicator */}
          <motion.div 
            className="absolute bottom-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <motion.div 
              className="w-2 h-2 bg-[#F3B939] rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
