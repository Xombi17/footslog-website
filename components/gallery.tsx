"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { FaCamera, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa"

export default function NaturalWonders() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })

  const galleryItems = [
    {
      id: 1,
      title: "Stargazing Experience",
      description: "Experience the breathtaking night sky view from Sandhan Valley, one of Maharashtra's best stargazing spots. The narrow gorge opens up to reveal a blanket of stars unlike anything you've seen in the city.",
      image: "/images/stargazing.png",
      location: "Sandhan Valley",
      date: "March 2024"
    },
    {
      id: 2,
      title: "Firefly Magic",
      description: "During pre-monsoon months, witness the magical spectacle of thousands of fireflies illuminating the valley with their synchronous flashing, creating a natural light show in the forest.",
      image: "/images/fireflies.jpg",
      location: "Sandhan Valley",
      date: "March 2024"
    },
    {
      id: 3,
      title: "Valley of Shadows",
      description: "Known as the 'Valley of Shadows,' Sandhan's towering walls create dramatic light and shadow effects throughout the day as sunlight filters through the narrow gorge.",
      image: "/images/valley.png",
      location: "Sandhan Valley",
      date: "March 2024"
    },
    {
      id: 4,
      title: "Night Camping",
      description: "Surrounded by the majestic Sahyadri range, camping in Sandhan Valley offers an otherworldly experience. Fall asleep to the sounds of nature and wake up to the breathtaking valley views.",
      image: "/images/nightcamping.jpg",
      location: "Sandhan Valley",
      date: "March 2024"
    }
  ]

  return (
    <section 
      ref={sectionRef} 
      className="relative py-20" 
      id="gallery"
      style={{
        background: "linear-gradient(to bottom, #113907, #0A1508)"
      }}
    >
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#0A1508]/80" />
        <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('/images/stars-bg.svg')] bg-repeat"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[#F3B939] mb-4 tracking-wide">
            Natural Wonders
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
            Discover the magical experiences awaiting you at Sandhan Valley
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl hover:shadow-[#F3B939]/20 transition-all duration-300 max-w-sm mx-auto w-full"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/90 to-transparent">
                <h3 className="text-xl font-bold text-[#F3B939] mb-2">{item.title}</h3>
                <p className="text-white/90 mb-4">{item.description}</p>
                <div className="flex items-center space-x-4 text-sm text-white/70">
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-[#F3B939]" />
                    <span>{item.location}</span>
                  </div>
                  <div className="flex items-center">
                    <FaCalendarAlt className="mr-2 text-[#F3B939]" />
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <a 
            href="/register" 
            className="inline-flex items-center px-8 py-4 bg-[#F3B939] hover:bg-amber-500 text-[#0A1508] font-bold rounded-full transition-all duration-300 text-lg shadow-lg hover:shadow-amber-400/30 hover:scale-105"
          >
            <FaCamera className="mr-3" />
            Join the Adventure
          </a>
        </motion.div>
      </div>
    </section>
  )
}
