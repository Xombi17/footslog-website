"use client"

import { useRef, useState } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

const galleryImages = [
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Trekkers climbing a mountain path",
    caption: "Conquering the summit",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Group photo at campsite",
    caption: "Evening at base camp",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Waterfall during trek",
    caption: "Refreshing waterfall stop",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Sunrise view from mountain",
    caption: "Sunrise from the peak",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Trek through dense forest",
    caption: "Jungle exploration",
  },
  {
    src: "/placeholder.svg?height=400&width=600",
    alt: "Team building activities",
    caption: "Team bonding activities",
  },
]

export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 })
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const nextImage = () => {
    if (selectedImage === null) return
    setSelectedImage((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    if (selectedImage === null) return
    setSelectedImage((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))
  }

  return (
    <section ref={sectionRef} className="relative py-20" id="gallery">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#1A2614]/90 backdrop-blur-sm" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="font-serif text-4xl font-bold text-[#D4A72C] md:text-5xl">Trek Gallery</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#E5E1D6]">
            Glimpses from our previous adventures in the wild
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="group relative cursor-pointer overflow-hidden rounded-lg"
              onClick={() => setSelectedImage(index)}
            >
              <div className="aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  width={600}
                  height={400}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 w-full p-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="text-sm font-medium">{image.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
              onClick={() => setSelectedImage(null)}
            >
              <button
                className="absolute right-4 top-4 rounded-full bg-black/50 p-2 text-white"
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedImage(null)
                }}
              >
                <X className="h-6 w-6" />
              </button>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white"
                onClick={(e) => {
                  e.stopPropagation()
                  prevImage()
                }}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white"
                onClick={(e) => {
                  e.stopPropagation()
                  nextImage()
                }}
              >
                <ChevronRight className="h-6 w-6" />
              </button>
              <div className="relative max-h-[80vh] max-w-4xl">
                <Image
                  src={galleryImages[selectedImage].src || "/placeholder.svg"}
                  alt={galleryImages[selectedImage].alt}
                  width={1200}
                  height={800}
                  className="max-h-[80vh] w-auto rounded-lg object-contain"
                />
                <div className="absolute bottom-0 left-0 w-full rounded-b-lg bg-black/50 p-4 text-white">
                  <p className="text-center text-lg font-medium">{galleryImages[selectedImage].caption}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
