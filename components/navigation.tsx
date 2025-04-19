"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { MenuIcon, X, Compass, Home, InfoIcon, Calendar, Users } from "lucide-react"
import Image from "next/image"
import { isAnchorLink, handleNavigation } from "@/lib/navigation-utils"

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [preloaderFinished, setPreloaderFinished] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const router = useRouter()

  // Detect when preloader is finished
  useEffect(() => {
    // Preloader duration (2s) + fadeout duration (1s)
    const preloaderDuration = 3000
    const timer = setTimeout(() => {
      setPreloaderFinished(true)
    }, preloaderDuration)
    
    return () => clearTimeout(timer)
  }, [])

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
  
  // Custom navigation handler
  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    // Only handle the event for local in-page links
    if (isAnchorLink(href) || (pathname === '/' && href.includes('#'))) {
      e.preventDefault()
      handleNavigation(href, router)
    }
  }

  // Navigation links with icons
  const links = [
    { href: "/", label: "Home", icon: <Home className="w-5 h-5" /> },
    { href: "/about", label: "About", icon: <InfoIcon className="w-5 h-5" /> },
    { href: "/events", label: "Events", icon: <Calendar className="w-5 h-5" /> },
    { href: "/register", label: "Register", icon: <Users className="w-5 h-5" /> },
  ]
  
  // Home page specific links for smooth scrolling
  const homeLinks = pathname === '/' ? [
    { href: "#about", label: "About", icon: <InfoIcon className="w-5 h-5" /> },
    { href: "#events", label: "Events", icon: <Calendar className="w-5 h-5" /> },
    { href: "#register", label: "Register", icon: <Users className="w-5 h-5" /> },
  ] : [];
  
  // Combine links - show internal anchor links only when on home page
  const navLinks = pathname === '/' ? [links[0], ...homeLinks] : links;
  
  // Function to check if link is active
  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true
    if (path !== '/' && !path.startsWith('#') && pathname.startsWith(path)) return true
    return false
  }

  if (!preloaderFinished) {
    return null; // Don't render anything until preloader is finished
  }

  return (
    <motion.header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#0F1A0A]/90 shadow-lg backdrop-blur-md py-2" : "py-4"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        type: "spring", 
        damping: 20, 
        stiffness: 100,
        delay: 0.3
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between md:justify-center">
          {/* Logo */}
          <motion.div 
            className="flex items-center md:absolute md:left-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="flex items-center">
              <div className="relative w-10 h-10 mr-3">
                <Image 
                  src="/images/rotaractlogo.png" 
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
              <div className="relative">
                <motion.span 
                  className="font-display font-bold text-[#F3B939] text-2xl tracking-wide hidden md:block"
                  animate={{ 
                    textShadow: [
                      "0 0 8px rgba(243, 185, 57, 0.3)",
                      "0 0 12px rgba(243, 185, 57, 0.5)",
                      "0 0 8px rgba(243, 185, 57, 0.3)"
                    ] 
                  }}
                  transition={{
                    textShadow: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                >
                  FOOTSLOG
                </motion.span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation - truly centered */}
          <div className="hidden md:flex space-x-12 items-center">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.7 + (index * 0.1) }}
              >
                <Link
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`group relative flex flex-col items-center transition-colors duration-300 ${
                    isActive(link.href) 
                      ? "text-[#F3B939]" 
                      : "text-[#E5E1D6] hover:text-[#F3B939]"
                  }`}
                >
                  <span className="flex items-center justify-center font-medium">
                    <span className="mr-2">{link.icon}</span>
                    {link.label}
                  </span>
                  <span 
                    className={`absolute bottom-0 left-0 h-0.5 bg-[#F3B939] transition-all duration-300 ${
                      isActive(link.href) 
                        ? "w-full" 
                        : "w-0 group-hover:w-full"
                    }`} 
                  />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile menu button */}
          <motion.div 
            className="md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
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
          </motion.div>
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
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  <Link
                    href={link.href}
                    onClick={(e) => {
                      handleLinkClick(e, link.href)
                      setIsMenuOpen(false)
                    }}
                    className={`flex items-center py-2 px-4 w-full justify-center transition-colors duration-300 rounded-lg ${
                      isActive(link.href)
                        ? "text-[#F3B939] bg-[#243420]/80"
                        : "text-[#E5E1D6] hover:text-[#F3B939] hover:bg-[#243420]/50"
                    }`}
                  >
                    <span className="mr-3">{link.icon}</span>
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
