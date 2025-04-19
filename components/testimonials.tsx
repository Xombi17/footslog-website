"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import Image from "next/image"

interface Testimonial {
  id: number
  name: string
  role: string
  quote: string
  image: string
  rating: number
}

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.3 })
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Ananya Sharma",
      role: "3-time Participant",
      quote: "Footslog was more than just a trek—it was a journey that pushed me beyond my limits and showed me what I'm truly capable of. The team's organization was impeccable, and the memories created will last a lifetime.",
      image: "/images/testimonial-1.jpg",
      rating: 5
    },
    {
      id: 2,
      name: "Rohan Mehta",
      role: "First-time Trekker",
      quote: "As someone who'd never trekked before, I was nervous about joining Footslog. The organizers made everyone feel welcome and supported throughout the journey. The beauty of the Sahyadris combined with new friendships made this an unforgettable experience.",
      image: "/images/testimonial-2.jpg",
      rating: 5
    },
    {
      id: 3,
      name: "Priya Desai",
      role: "Photography Enthusiast",
      quote: "The breathtaking views throughout the trek were a photographer's dream. From misty mountains to star-filled nights, every moment was picturesque. The guides were knowledgeable about the local flora and fauna, adding educational value to the adventure.",
      image: "/images/testimonial-3.jpg",
      rating: 4
    },
    {
      id: 4,
      name: "Vikram Singh",
      role: "Adventurer",
      quote: "Footslog strikes the perfect balance between adventure and safety. The trek was challenging enough to feel accomplished but organized in a way that everyone could participate regardless of experience level. I'll definitely be back next year!",
      image: "/images/testimonial-4.jpg",
      rating: 5
    },
  ]

  const nextTestimonial = () => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial()
    }, 5000)
    
    return () => clearInterval(interval)
  }, [])

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  }

  return (
    <div ref={containerRef} className="py-20 relative overflow-hidden bg-[#0F1A0A]">
      {/* Diagonal decorative element */}
      <div className="absolute top-0 left-0 w-full h-10 bg-gradient-to-r from-[#0F1A0A] via-[#4A6D33]/20 to-[#0F1A0A] transform -skew-y-2" />
      
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-24 h-24 rounded-full bg-[#D4A72C]/30" />
        <div className="absolute bottom-40 right-20 w-32 h-32 rounded-full bg-[#4A6D33]/20" />
        <div className="absolute top-1/2 left-1/3 w-16 h-16 rounded-full bg-[#D4A72C]/20" />
      </div>
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#D4A72C] mb-4">
            Trekker Testimonials
          </h2>
          <p className="text-[#E5E1D6]/70 max-w-2xl mx-auto">
            Hear what past participants have to say about their Footslog experience
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="bg-[#243420] rounded-lg p-6 md:p-10 shadow-xl"
            >
              <div className="md:flex items-center gap-6">
                <div className="mb-6 md:mb-0 md:w-1/3 flex justify-center">
                  <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-[#4A6D33]/50">
                    <Image
                      src={testimonials[current].image}
                      alt={testimonials[current].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  <div className="text-[#D4A72C] mb-4">
                    <Quote className="h-8 w-8 opacity-70" />
                  </div>
                  <p className="text-[#E5E1D6] text-lg italic mb-6">
                    "{testimonials[current].quote}"
                  </p>
                  
                  <div>
                    <div className="flex mb-2">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-xl">
                          {i < testimonials[current].rating ? "★" : "☆"}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-[#D4A72C] font-bold text-xl">{testimonials[current].name}</h3>
                    <p className="text-[#E5E1D6]/70">{testimonials[current].role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex justify-center mt-8 space-x-4">
            <motion.button
              onClick={prevTestimonial}
              className="bg-[#243420] p-3 rounded-full text-[#D4A72C] hover:bg-[#D4A72C] hover:text-[#0F1A0A] transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="h-6 w-6" />
            </motion.button>
            
            <div className="flex items-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > current ? 1 : -1)
                    setCurrent(index)
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === current ? "bg-[#D4A72C] w-6" : "bg-[#4A6D33]/40"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            
            <motion.button
              onClick={nextTestimonial}
              className="bg-[#243420] p-3 rounded-full text-[#D4A72C] hover:bg-[#D4A72C] hover:text-[#0F1A0A] transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="h-6 w-6" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  )
}
