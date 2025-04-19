"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { ParallaxProvider } from "@/components/parallax-provider"
import BackgroundMusic from "@/components/background-music"
import Image from "next/image"

export default function SchedulePage() {
  // Simple countdown state
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  
  useEffect(() => {
    const targetDate = new Date("2025-06-07T05:30:00").getTime()
    
    const updateTimer = () => {
      const now = new Date().getTime()
      const distance = targetDate - now
      
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        })
      }
    }
    
    updateTimer()
    const interval = setInterval(updateTimer, 1000)
    return () => clearInterval(interval)
  }, [])
  
  return (
    <ParallaxProvider>
      <main className="relative overflow-hidden">
        <Navigation />
        <BackgroundMusic />

        <div className="relative">
          {/* Schedule Hero */}
          <div className="relative h-[40vh] flex items-center justify-center overflow-hidden bg-[#0F1A0A]">
            <div className="absolute inset-0 z-0">
              <div 
                className="w-full h-full bg-[url('/images/jungle-book-bg.png')] bg-cover bg-center opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0F1A0A]/40 to-[#0F1A0A]/90 z-10"></div>
            </div>
            
            <div className="relative z-20 text-center p-8">
              <h1 className="font-display treasure-heading text-5xl md:text-7xl font-bold tracking-wider text-[#F3B939] mb-4">
                Trek Itinerary
              </h1>
              <p className="text-white/90 text-lg md:text-xl max-w-3xl mx-auto">
                Your adventure to Sandhan Valley awaits - Here&apos;s the day&apos;s journey
              </p>
            </div>
          </div>

          {/* Inline Countdown Section */}
          <section className="py-16 bg-[#0F1A0A] relative overflow-hidden border-t border-b border-green-900/50">
            {/* Decorative Elements */}
            <div className="absolute -left-24 top-1/3 w-48 h-48 rounded-full bg-amber-400/10 blur-3xl"></div>
            <div className="absolute -right-24 bottom-1/3 w-64 h-64 rounded-full bg-amber-400/10 blur-3xl"></div>

            <div className="max-w-7xl mx-auto px-4 md:px-8">
              <div className="bg-green-900/50 backdrop-blur-sm border border-green-800/50 rounded-xl p-8 md:p-12 shadow-xl relative z-10">
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-amber-400 mb-4 treasure-heading">The Adventure Awaits</h2>
                  <p className="text-amber-100 max-w-2xl mx-auto">
                    Mark your calendars for our trek to Sandhan Valley. The countdown has begun!
                  </p>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-8">
                  <div className="text-center md:text-left">
                    <h3 className="text-xl font-bold text-amber-300 mb-2">FOOTSLOG 2025</h3>
                    <p className="text-amber-100">June 7, 2025</p>
                    <p className="text-amber-100">Sandhan Valley, Maharashtra</p>
                    <a 
                      href="/register" 
                      className="mt-6 px-6 py-2 bg-amber-500 hover:bg-amber-600 text-green-950 font-bold rounded-md transition-colors duration-300 inline-block"
                    >
                      Register Now
                    </a>
                  </div>

                  <div className="md:border-l md:border-green-700 md:pl-8 py-4">
                    {/* Simple countdown display */}
                    <div className="flex gap-4">
                      {[
                        { value: timeLeft.days, label: "Days" },
                        { value: timeLeft.hours, label: "Hours" },
                        { value: timeLeft.minutes, label: "Mins" },
                        { value: timeLeft.seconds, label: "Secs" }
                      ].map((unit, i) => (
                        <div key={i} className="flex flex-col items-center">
                          <div className="bg-green-800/80 border border-green-700 rounded-lg w-16 h-16 flex items-center justify-center mb-1">
                            <span className="text-2xl font-bold text-amber-400">
                              {String(unit.value).padStart(2, "0")}
                            </span>
                          </div>
                          <span className="text-xs text-amber-200/80">{unit.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Scroll Itinerary Section */}
          <div className="bg-[#0F1A0A] py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                {/* Logo Header */}
                <div className="flex justify-center items-center mb-8">
                  <div className="bg-white rounded-lg p-4 flex items-center space-x-8">
                    <div className="relative h-16 w-16 md:h-20 md:w-20">
                      <Image 
                        src="/images/rotaractlogo.png" 
                        alt="CRCE Logo" 
                        fill
                        className="rounded-full object-contain"
                      />
                    </div>
                    <div className="relative h-12 w-48 md:h-16 md:w-64">
                      <Image 
                        src="/images/rotaractlogo.png" 
                        alt="FR CRCE Logo" 
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Scroll Design */}
                <div className="relative">
                  {/* Top scroll edge */}
                  <div className="absolute -top-5 left-0 right-0 h-20 overflow-hidden">
                    <div className="w-full h-40 bg-[#EFD3A3] rounded-[50%] transform translate-y-20"></div>
                  </div>
                  
                  {/* Main scroll content */}
                  <div className="relative pt-10 pb-10 bg-[#EFD3A3] rounded-lg shadow-2xl overflow-hidden">
                    {/* Paper texture overlay */}
                    <div className="absolute inset-0 bg-[url('/images/paper-texture.png')] opacity-30 mix-blend-overlay pointer-events-none"></div>
                    
                    {/* Burnt edges */}
                    <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-[#8B4513]/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-[#8B4513]/40 to-transparent"></div>
                    <div className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-[#8B4513]/40 to-transparent"></div>
                    <div className="absolute top-0 right-0 h-full w-8 bg-gradient-to-l from-[#8B4513]/40 to-transparent"></div>
                    
                    {/* Itinerary header */}
                    <div className="relative z-10 text-center mb-8">
                      <div className="relative mx-auto w-80 h-16 md:w-96 md:h-20 bg-[#D4A72C] flex items-center justify-center rounded-lg shadow-md border-2 border-[#8B4513]">
                        <h2 className="treasure-heading text-4xl text-[#8B4513] font-bold">ITINERARY</h2>
                        
                        {/* Corner decorations */}
                        <div className="absolute top-1 left-1 w-3 h-3 bg-[#8B4513] rounded-full"></div>
                        <div className="absolute top-1 right-1 w-3 h-3 bg-[#8B4513] rounded-full"></div>
                        <div className="absolute bottom-1 left-1 w-3 h-3 bg-[#8B4513] rounded-full"></div>
                        <div className="absolute bottom-1 right-1 w-3 h-3 bg-[#8B4513] rounded-full"></div>
                      </div>
                    </div>
                    
                    {/* Itinerary items */}
                    <div className="relative z-10 max-w-2xl mx-auto px-8 space-y-4">
                      {[
                        { time: "5:30 AM", event: "REPORTING AT COLLEGE" },
                        { time: "6:00 AM", event: "DEPARTURE FROM COLLEGE" },
                        { time: "9:00 AM", event: "REACH BASE VILLAGE" },
                        { time: "9:15 AM", event: "START ASCEND" },
                        { time: "11:15 AM", event: "REACH THE TOP OF SANDHAN VALLEY" },
                        { time: "12:00 PM", event: "START DESCEND" },
                        { time: "2:00 PM", event: "REACH BASE VILLAGE" },
                        { time: "2:45 PM", event: "DEPARTURE FROM SANDHAN VALLEY" },
                        { time: "4:00 PM", event: "HALT FOR LUNCH AT A RESTAURANT" },
                        { time: "5:30 PM", event: "HEAD TO BANDRA STATION" },
                        { time: "8:30 PM", event: "REACH BANDRA STATION" },
                      ].map((item, index) => (
                        <div key={index} className="flex items-start">
                          <div className="w-32 md:w-36 flex-shrink-0">
                            <p className="text-[#8B4513] font-extrabold text-lg md:text-xl treasure-heading">{item.time}</p>
                          </div>
                          <div className="flex-grow">
                            <div className="border-l-4 border-[#8B4513] pl-4">
                              <p className="text-[#8B4513] font-bold text-lg md:text-xl">{item.event}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Decorative elements */}
                    <div className="absolute top-5 right-5 opacity-40 rotate-12">
                      <div className="w-12 h-12 md:w-16 md:h-16">
                        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M50 0C50 27.6 27.6 50 0 50C27.6 50 50 72.4 50 100C50 72.4 72.4 50 100 50C72.4 50 50 27.6 50 0Z" fill="#8B4513" />
                        </svg>
                      </div>
                    </div>
                    
                    <div className="absolute bottom-10 left-10 opacity-40">
                      <div className="w-16 h-16 md:w-20 md:h-20">
                        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M50 0L52.9 47.1L100 50L52.9 52.9L50 100L47.1 52.9L0 50L47.1 47.1L50 0Z" fill="#8B4513" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Bottom scroll edge */}
                  <div className="absolute -bottom-5 left-0 right-0 h-20 overflow-hidden">
                    <div className="w-full h-40 bg-[#EFD3A3] rounded-[50%] transform -translate-y-20"></div>
                  </div>
                </div>
                
                {/* Sponsor Section */}
                <div className="mt-12 text-center">
                  <p className="text-[#F3B939] text-xl mb-4">Proudly brought to you by our amazing sponsors</p>
                  <div className="flex justify-center items-center space-x-8">
                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                      <p className="text-white text-2xl font-bold">Balaji</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
                      <p className="text-white text-2xl font-bold">Swaras</p>
                    </div>
                  </div>
                </div>
                
                {/* Trek Date */}
                <div className="flex justify-center mt-8">
                  <div className="bg-[#113907]/70 backdrop-blur-sm px-6 py-3 rounded-full border border-[#D4A72C]">
                    <p className="text-white font-bold text-xl">7 June 2025</p>
                  </div>
                </div>
                
                {/* Additional information */}
                <div className="mt-12 bg-[#1A2614]/50 p-8 rounded-xl backdrop-blur-sm border border-[#4A6D33]/30 text-center">
                  <h3 className="text-[#F3B939] treasure-heading text-2xl font-bold mb-4">Important Reminders</h3>
                  <ul className="text-white list-disc list-inside text-left max-w-md mx-auto space-y-2">
                    <li>Bring comfortable trekking shoes with good grip</li>
                    <li>Pack at least 2 liters of water per person</li>
                    <li>Carry light snacks for energy during the trek</li>
                    <li>Don't forget sunscreen and a hat</li>
                    <li>Bring a light windcheater or raincoat</li>
                    <li>Keep your ID proof handy at all times</li>
                  </ul>
                  
                  <div className="mt-8">
                    <a 
                      href="/register" 
                      className="inline-flex items-center justify-center rounded-full border-2 border-[#D4A72C] bg-[#113907] px-8 py-3 font-bold text-white transition-all duration-300 ease-out hover:scale-105 hover:bg-gradient-to-r hover:from-[#215812] hover:to-[#113907] hover:shadow-lg hover:shadow-green-500/20"
                    >
                      <span className="relative z-10 flex items-center text-lg font-medium tracking-wider">
                        RESERVE YOUR SPOT
                      </span>
                    </a>
                  </div>
                  
                  <div className="mt-6">
                    <p className="text-white/80 italic">
                      Embark on an epic journey with Footslog! Get ready to conquer the trails and embrace the adventure.
                      Let&apos;s hike, explore, and make unforgettable memories together! 🥾🔥
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </main>
    </ParallaxProvider>
  )
} 