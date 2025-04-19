"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { MenuIcon, X, Compass, Home, InfoIcon, Calendar, Users } from "lucide-react"
import Image from "next/image"

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)

  // Toggle menu
  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev)
  }

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Navigation links with icons
  const links = [
    { href: "/", label: "Home", icon: <Home className="w-5 h-5" /> },
    { href: "#about", label: "About", icon: <InfoIcon className="w-5 h-5" /> },
    { href: "#events", label: "Events", icon: <Calendar className="w-5 h-5" /> },
    { href: "#register", label: "Register", icon: <Users className="w-5 h-5" /> },
  ]

  return (
    <motion.header 
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#0F1A0A]/90 shadow-lg backdrop-blur-md py-2" : "py-4"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ 
        type: "spring", 
        damping: 20, 
        stiffness: 100,
        delay: 0.2
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between md:justify-center">
          {/* Logo */}
          <motion.div 
            className="flex items-center md:absolute md:left-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="flex items-center">
              <div className="relative w-10 h-10 mr-3">
                <Image 
                  src="/images/compass-logo.svg" 
                  alt="Footslog Logo" 
                  width={40} 
                  height={40}
                  className={`transition-all duration-300 ${isScrolled ? "opacity-100" : "opacity-90"}`}
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
              <span className="font-display font-bold text-[#F3B939] text-2xl tracking-wide hidden md:block">
                FOOTSLOG
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation - truly centered */}
          <div className="hidden md:flex space-x-12 items-center">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="group relative flex flex-col items-center text-[#E5E1D6] hover:text-[#F3B939] transition-colors duration-300"
              >
                <span className="flex items-center justify-center font-medium">
                  <span className="mr-2">{link.icon}</span>
                  {link.label}
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F3B939] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-[#E5E1D6] hover:text-[#F3B939] p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#F3B939]"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <MenuIcon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 right-0 bg-[#0F1A0A]/95 backdrop-blur-md"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center py-4 space-y-4">
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="flex items-center py-2 px-4 text-[#E5E1D6] hover:text-[#F3B939] hover:bg-[#243420]/50 w-full justify-center transition-colors duration-300 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="mr-3">{link.icon}</span>
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
