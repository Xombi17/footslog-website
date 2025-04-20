"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { MenuIcon, X, Compass, Home, InfoIcon, Calendar, Users, Image as ImageIcon } from "lucide-react"
import Image from "next/image"
import { isAnchorLink, handleNavigation } from "@/lib/navigation-utils"

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [preloaderFinished, setPreloaderFinished] = useState(false)
  const [activeLink, setActiveLink] = useState<string | null>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname() || '/'
  const router = useRouter()

  // Detect when preloader is finished
  useEffect(() => {
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
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  
  // Custom navigation handler
  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    if (isAnchorLink(href) || (pathname === '/' && href.includes('#'))) {
      e.preventDefault()
      handleNavigation(href, router)
      setActiveLink(href)
    }
  }

  // Navigation links with icons
  const links = [
    { href: "/", label: "Home", icon: <Home className="w-5 h-5" /> },
    { href: "/#about", label: "About", icon: <InfoIcon className="w-5 h-5" /> },
    
    { href: "/#itinerary", label: "Itinerary", icon: <Calendar className="w-5 h-5" /> },
    { href: "/#faq", label: "FAQ", icon: <Users className="w-5 h-5" /> },
  ]
  
  // Home page specific links for smooth scrolling
  const homeLinks = pathname === '/' ? [
    { href: "#about", label: "About", icon: <InfoIcon className="w-5 h-5" /> },
    
    { href: "#itinerary", label: "Itinerary", icon: <Calendar className="w-5 h-5" /> },
    { href: "#faq", label: "FAQ", icon: <Users className="w-5 h-5" /> },
  ] : [];
  
  // Combine links
  const navLinks = pathname === '/' ? [links[0], ...homeLinks] : links;
  
  // Function to check if link is active
  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true
    if (path.startsWith('/#') && pathname === '/') {
      const hash = window.location.hash
      return hash === path.substring(1) || (hash === '' && path === '/#about')
    }
    if (path !== '/' && !path.startsWith('#') && pathname.startsWith(path)) return true
    return false
  }

  if (!preloaderFinished) {
    return null
  }

  return (
    <motion.header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#0F1A0A]/95 shadow-lg backdrop-blur-md py-2" : "py-4"
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
            <Link href="/" className="flex items-center group">
              <div className="relative w-10 h-10 mr-3">
                <Image 
                  src="/images/rotaractlogo.png" 
                  alt="Footslog Logo" 
                  width={40} 
                  height={40}
                  className={`transition-all duration-300 ${isScrolled ? "opacity-100" : "opacity-90"} group-hover:opacity-100`}
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
                  className="font-display font-bold text-[#F3B939] text-xl md:text-2xl tracking-wide block"
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

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
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
                  className={`group relative flex flex-col items-center transition-all duration-300 ${
                    isActive(link.href) 
                      ? "text-[#F3B939]" 
                      : "text-[#E5E1D6] hover:text-[#F3B939]"
                  }`}
                >
                  <span className="flex items-center justify-center font-medium">
                    <span className="mr-2 group-hover:scale-110 transition-transform duration-200">{link.icon}</span>
                    {link.label}
                  </span>
                  <motion.span 
                    className={`absolute -bottom-2 left-0 h-0.5 bg-[#F3B939] transition-all duration-300 ${
                      isActive(link.href) 
                        ? "w-full" 
                        : "w-0 group-hover:w-full"
                    }`} 
                    initial={{ width: 0 }}
                    animate={{ width: isActive(link.href) ? "100%" : "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Register button */}
          <motion.div
            className="hidden md:block md:absolute md:right-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Link 
              href="/#register" 
              onClick={(e) => handleLinkClick(e, "/#register")}
              className="bg-[#243420] hover:bg-[#2c4127] text-[#F3B939] font-medium py-2 px-5 rounded-md transition-all duration-300 inline-flex items-center border border-[#F3B939]/40 hover:border-[#F3B939] shadow-sm hover:shadow-md hover:shadow-[#F3B939]/20"
            >
              <Users className="w-4 h-4 mr-2" />
              Register
            </Link>
          </motion.div>

          {/* Mobile menu button */}
          <motion.div 
            className="md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <button
              onClick={toggleMenu}
              className="text-[#F3B939] hover:text-[#F3B939] p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#F3B939] bg-[#243420]/70 hover:bg-[#243420] transition-all duration-300"
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
            className="md:hidden fixed top-[60px] left-0 right-0 bottom-0 bg-[#0F1A0A]/95 backdrop-blur-md z-40"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center py-8 space-y-6 h-full justify-center">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  className="w-64"
                >
                  <Link
                    href={link.href}
                    onClick={(e) => {
                      handleLinkClick(e, link.href)
                      setIsMenuOpen(false)
                    }}
                    className={`flex items-center py-3 px-6 w-full justify-center transition-all duration-300 rounded-lg ${
                      isActive(link.href)
                        ? "text-[#F3B939] bg-[#243420] border-2 border-[#F3B939]/30 shadow-md shadow-[#F3B939]/10"
                        : "text-[#E5E1D6] hover:text-[#F3B939] hover:bg-[#243420]/70 border-2 border-transparent"
                    }`}
                  >
                    <span className="mr-3">{link.icon}</span>
                    <span className="text-lg">{link.label}</span>
                  </Link>
                </motion.div>
              ))}
              
              {/* Register button for mobile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="w-64 mt-4"
              >
                <Link
                  href="/#register"
                  onClick={(e) => {
                    handleLinkClick(e, "/#register")
                    setIsMenuOpen(false)
                  }}
                  className="flex items-center py-3 px-6 w-full justify-center transition-all duration-300 rounded-md bg-[#243420] text-[#F3B939] font-medium border border-[#F3B939]/40 hover:border-[#F3B939] hover:shadow-md hover:shadow-[#F3B939]/20"
                >
                  <Users className="w-5 h-5 mr-3" />
                  <span className="text-lg">Register</span>
                </Link>
              </motion.div>
              
              {/* Decorative element */}
              <motion.div 
                className="absolute bottom-8 opacity-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.2, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Image
                  src="/images/paw-prints.svg"
                  alt="Jungle decoration"
                  width={100}
                  height={40}
                  className="object-contain"
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
