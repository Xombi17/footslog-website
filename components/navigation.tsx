"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()

  // Close menu when clicking outside on mobile
  useEffect(() => {
    const handleClick = () => {
      if (isOpen) setIsOpen(false)
    }

    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [isOpen])

  // Track scroll position
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50)
  })

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsOpen(!isOpen)
  }

  // Navigation links with icon mapping
  const navLinks = [
    { href: "#", label: "Home", icon: "🏠" },
    { href: "#overview", label: "Overview", icon: "📖" },
    { href: "#schedule", label: "Schedule", icon: "📅" },
    { href: "#gallery", label: "Gallery", icon: "📸" },
    { href: "#testimonials", label: "Testimonials", icon: "💬" },
    { href: "#register", label: "Register", icon: "✍️" },
  ]

  return (
    <motion.header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-[#1A2614]/90 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="#" className="flex items-center gap-2">
              <motion.div
                className="relative h-10 w-10 md:h-12 md:w-12 overflow-hidden"
                animate={{ 
                  rotateY: [0, 360] 
                }}
                transition={{ 
                  duration: 10, 
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#D4A72C] to-[#4A6D33] p-[2px]">
                  <div className="h-full w-full rounded-full bg-[#1A2614] flex items-center justify-center">
                    <span className="text-xl font-bold">🌿</span>
                  </div>
                </div>
              </motion.div>
              <motion.span 
                className="font-display text-xl font-bold tracking-wider text-[#D4A72C] md:text-2xl"
                animate={{
                  textShadow: isScrolled 
                    ? ['0 0 8px rgba(212, 167, 44, 0.3)', '0 0 16px rgba(212, 167, 44, 0.5)', '0 0 8px rgba(212, 167, 44, 0.3)']
                    : ['0 0 0px rgba(0,0,0,0)', '0 0 0px rgba(0,0,0,0)', '0 0 0px rgba(0,0,0,0)']
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                FOOTSLOG
              </motion.span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden gap-1 md:flex md:items-center md:gap-2">
            {navLinks.map((link, i) => (
              <motion.div 
                key={link.label}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * i }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={link.href}
                  className={`relative rounded-md px-3 py-2 text-sm font-medium transition-colors 
                    ${link.label === "Register" 
                      ? "bg-[#D4A72C] text-[#0F1A0A] hover:bg-[#C69A28]" 
                      : "text-[#E5E1D6] hover:text-[#D4A72C]"
                    }`}
                >
                  {link.label}
                  {link.label !== "Register" && (
                    <motion.span
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4A72C] origin-left"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            className="group flex h-10 w-10 flex-col items-center justify-center rounded-md border border-[#4A6D33]/30 bg-[#1A2614]/80 backdrop-blur-sm md:hidden"
            onClick={toggleMenu}
            whileTap={{ scale: 0.9 }}
          >
            <motion.span
              className={`mb-1 h-0.5 w-5 bg-[#D4A72C] transition-all ${
                isOpen ? "translate-y-1.5 rotate-45" : ""
              }`}
            />
            <motion.span
              className={`h-0.5 w-5 bg-[#D4A72C] transition-all ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <motion.span
              className={`mt-1 h-0.5 w-5 bg-[#D4A72C] transition-all ${
                isOpen ? "-translate-y-1.5 -rotate-45" : ""
              }`}
            />
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className={`absolute top-full left-0 w-full overflow-hidden bg-[#1A2614]/95 backdrop-blur-md shadow-lg md:hidden ${
          isOpen ? "block" : "hidden"
        }`}
        initial={{ height: 0 }}
        animate={{ height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <nav className="container mx-auto px-4 py-4">
          <ul className="space-y-2">
            {navLinks.map((link, i) => (
              <motion.li 
                key={link.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.05 * i }}
              >
                <Link
                  href={link.href}
                  className={`flex w-full items-center gap-2 rounded-md px-4 py-3 text-base font-medium transition-colors ${
                    link.label === "Register"
                      ? "bg-[#D4A72C] text-[#0F1A0A]"
                      : "hover:bg-[#243420] text-[#E5E1D6]"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-xl">{link.icon}</span>
                  {link.label}
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>
      </motion.div>
    </motion.header>
  )
}
