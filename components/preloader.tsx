"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Compass } from "lucide-react"

export default function Preloader() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000)

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 10
        return newProgress > 100 ? 100 : newProgress
      })
    }, 200)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0F1A0A]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "linear" }}
            className="mb-8"
          >
            <Compass className="h-16 w-16 text-[#D4A72C]" />
          </motion.div>
          <h2 className="mb-6 font-serif text-2xl font-bold text-[#D4A72C]">Entering the Jungle...</h2>
          <div className="h-2 w-64 overflow-hidden rounded-full bg-[#2A3B22] md:w-96">
            <motion.div className="h-full bg-[#D4A72C]" initial={{ width: 0 }} animate={{ width: `${progress}%` }} />
          </div>
          <p className="mt-2 text-[#8B9D7D]">{Math.round(progress)}%</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
