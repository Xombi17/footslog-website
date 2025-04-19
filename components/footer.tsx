"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin, ChevronRight, ArrowUp } from "lucide-react"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const footerLinks = [
    {
      title: "Quick Links",
      links: [
        { name: "Home", href: "#" },
        { name: "Event Overview", href: "#overview" },
        { name: "Trek Route", href: "#map" },
        { name: "Gallery", href: "#gallery" },
        { name: "Register", href: "#register" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Equipment List", href: "#equipment" },
        { name: "Weather Info", href: "#" },
        { name: "FAQs", href: "#" },
        { name: "Trek Guidelines", href: "#" },
        { name: "Safety Tips", href: "#" },
      ],
    },
    {
      title: "About Us",
      links: [
        { name: "Rotaract Club FRCRCE", href: "#" },
        { name: "Our Events", href: "#" },
        { name: "Team", href: "#" },
        { name: "Blogs", href: "#" },
        { name: "Sustainability Efforts", href: "#" },
      ],
    },
  ]

  const socialLinks = [
    { icon: <Instagram className="h-5 w-5" />, href: "#", label: "Instagram" },
    { icon: <Facebook className="h-5 w-5" />, href: "#", label: "Facebook" },
    { icon: <Twitter className="h-5 w-5" />, href: "#", label: "Twitter" },
    { icon: <Mail className="h-5 w-5" />, href: "mailto:info@footslog.com", label: "Email" },
  ]

  const contactInfo = [
    { icon: <Mail className="h-5 w-5" />, text: "info@footslog.com" },
    { icon: <Phone className="h-5 w-5" />, text: "+91 98765 43210" },
    { icon: <MapPin className="h-5 w-5" />, text: "Fr. CRCE, Bandra West, Mumbai" },
  ]

  return (
    <footer className="relative bg-[#0F1A0A] pt-16">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-[#D4A72C] to-transparent opacity-70" />
      
      {/* Vine decor */}
      <div className="absolute top-0 left-0 w-24 h-32 bg-[url('/images/left-vine.svg')] bg-no-repeat opacity-20" />
      <div className="absolute top-0 right-0 w-24 h-32 bg-[url('/images/right-vine.svg')] bg-no-repeat opacity-20" />

      <div className="container mx-auto px-4">
        {/* Logo and subscribe section */}
        <div className="mb-12 grid gap-8 md:grid-cols-2">
          <div>
            <Link href="#" className="inline-flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D4A72C]/20 text-[#D4A72C]">
                <span className="text-xl">🌿</span>
              </div>
              <span className="font-display text-xl font-bold text-[#D4A72C]">FOOTSLOG</span>
            </Link>
            <p className="mt-4 max-w-sm text-[#E5E1D6]/80">
              Join us for an unforgettable adventure through the breathtaking Sahyadri Mountains.
              Connect with nature, challenge yourself, and make lasting memories.
            </p>

            <div className="mt-6 flex space-x-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#243420] text-[#D4A72C] transition-colors hover:bg-[#D4A72C] hover:text-[#0F1A0A]"
                  aria-label={link.label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-[#D4A72C]">Contact Information</h3>
            <ul className="mt-4 space-y-3">
              {contactInfo.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="mt-1 text-[#D4A72C]">{item.icon}</div>
                  <span className="text-[#E5E1D6]/80">{item.text}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-6">
              <p className="font-medium text-[#D4A72C]">Event Dates</p>
              <p className="text-[#E5E1D6]/80">June 7, 2025</p>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid gap-8 border-t border-[#4A6D33]/30 py-8 md:grid-cols-3">
          {footerLinks.map((column, columnIndex) => (
            <div key={columnIndex}>
              <h3 className="mb-4 font-bold text-[#D4A72C]">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="group flex items-center text-[#E5E1D6]/70 transition-colors hover:text-[#D4A72C]"
                    >
                      <ChevronRight className="mr-1 h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col justify-between gap-4 border-t border-[#4A6D33]/30 py-6 md:flex-row">
          <p className="text-sm text-[#E5E1D6]/50">
            © {new Date().getFullYear()} Footslog | Rotaract Club FRCRCE. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-sm text-[#E5E1D6]/50 hover:text-[#D4A72C]">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-[#E5E1D6]/50 hover:text-[#D4A72C]">
              Terms of Service
            </Link>
            <motion.button
              onClick={scrollToTop}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#243420] text-[#D4A72C] transition-colors hover:bg-[#D4A72C] hover:text-[#0F1A0A]"
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
