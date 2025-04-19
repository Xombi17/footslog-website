"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin, ArrowUp } from "lucide-react"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const socialLinks = [
    { icon: <Instagram className="h-5 w-5" />, href: "#", label: "Instagram" },
    { icon: <Facebook className="h-5 w-5" />, href: "#", label: "Facebook" },
    { icon: <Twitter className="h-5 w-5" />, href: "#", label: "Twitter" },
    { icon: <Mail className="h-5 w-5" />, href: "mailto:info@footslog.com", label: "Email" },
  ]

  const contactInfo = [
    { icon: <Mail className="h-4 w-4" />, text: "info@footslog.com" },
    { icon: <Phone className="h-4 w-4" />, text: "+91 98765 43210" },
    { icon: <MapPin className="h-4 w-4" />, text: "Fr. CRCE, Bandra West, Mumbai" },
  ]

  const footerLinks = [
    { name: "Home", href: "#" },
    { name: "Event Overview", href: "#overview" },
    { name: "Trek Route", href: "#itinerary" },
    { name: "Highlights", href: "#highlights" },
    { name: "FAQs", href: "#faq" },
    { name: "Equipment List", href: "#equipment" },
    { name: "Register", href: "#register" },
  ]

  return (
    <footer className="relative bg-[#0F1A0A] pt-10 pb-6">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-[#D4A72C] to-transparent opacity-70" />
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between mb-6 gap-6">
          {/* Logo and info section */}
          <div className="flex-1">
            <Link href="#" className="flex items-center gap-2 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#D4A72C]/20 text-[#D4A72C]">
                <span className="text-lg">🌿</span>
              </div>
              <motion.span 
                className="font-display text-lg font-bold text-[#D4A72C]"
                animate={{ 
                  textShadow: [
                    "0 0 8px rgba(243, 185, 57, 0.3)",
                    "0 0 12px rgba(243, 185, 57, 0.5)",
                    "0 0 8px rgba(243, 185, 57, 0.3)"
                  ] 
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                FOOTSLOG
              </motion.span>
            </Link>
            <p className="text-[#E5E1D6]/70 text-sm max-w-sm mb-3">
              Explore the breathtaking Sahyadri Mountains. Challenge yourself, connect with nature.
            </p>
            
            {/* Social links */}
            <div className="flex space-x-3">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-[#243420] text-[#D4A72C] transition-colors hover:bg-[#D4A72C] hover:text-[#0F1A0A]"
                  aria-label={link.label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>
          
          {/* Contact and date section */}
          <div className="flex-1">
            <h3 className="text-sm font-bold text-[#D4A72C] mb-3">Contact Information</h3>
            <ul className="space-y-2">
              {contactInfo.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="text-[#D4A72C]">{item.icon}</div>
                  <span className="text-[#E5E1D6]/70 text-sm">{item.text}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3">
              <p className="text-xs font-medium text-[#D4A72C]">Event Date</p>
              <p className="text-[#E5E1D6]/70 text-sm">June 7, 2025</p>
            </div>
          </div>
          
          {/* Quick links */}
          <div className="flex-1">
            <h3 className="text-sm font-bold text-[#D4A72C] mb-3">Quick Links</h3>
            <div className="grid grid-cols-2 gap-x-2 gap-y-2">
              {footerLinks.map((link, index) => (
                <Link 
                  key={index} 
                  href={link.href} 
                  className="text-[#E5E1D6]/70 text-sm hover:text-[#D4A72C]"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 border-t border-[#4A6D33]/30 pt-4">
          <p className="text-xs text-[#E5E1D6]/50 text-center sm:text-left">
            © {new Date().getFullYear()} Footslog | Rotaract Club FRCRCE. All rights reserved.
            <span className="block sm:inline sm:before:content-['_•_']">Created by Varad Joshi</span>
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-xs text-[#E5E1D6]/50 hover:text-[#D4A72C]">
              Privacy Policy
            </Link>
            <Link href="#" className="text-xs text-[#E5E1D6]/50 hover:text-[#D4A72C]">
              Terms of Service
            </Link>
            <motion.button
              onClick={scrollToTop}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-[#243420] text-[#D4A72C] transition-colors hover:bg-[#D4A72C] hover:text-[#0F1A0A]"
              aria-label="Back to top"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowUp className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  )
}
