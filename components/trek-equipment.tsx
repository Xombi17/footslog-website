"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Backpack, Droplets, Sun, SunMedium, Wind, Tent, Utensils, Map, Compass } from "lucide-react"

type EquipmentCategory = "essentials" | "clothing" | "personal" | "optional"

interface EquipmentItem {
  name: string
  description: string
  category: EquipmentCategory
  essential: boolean
  icon: React.ReactNode
}

const equipmentList: EquipmentItem[] = [
  // Essentials
  { 
    name: "Backpack (40-50L)", 
    description: "Waterproof with rain cover, comfortable fit", 
    category: "essentials", 
    essential: true, 
    icon: <Backpack className="h-6 w-6 text-[#F3B939]" />
  },
  { 
    name: "Water Bottles (2L min)", 
    description: "Stay hydrated throughout the trek", 
    category: "essentials", 
    essential: true, 
    icon: <Droplets className="h-6 w-6 text-[#F3B939]" />
  },
  { 
    name: "Sleeping Bag", 
    description: "For overnight comfort in the jungle", 
    category: "essentials", 
    essential: true, 
    icon: <Tent className="h-6 w-6 text-[#F3B939]" />
  },
  { 
    name: "Navigation Tools", 
    description: "Compass and map (guides will provide)", 
    category: "essentials", 
    essential: true, 
    icon: <Compass className="h-6 w-6 text-[#F3B939]" />
  },
  { 
    name: "Mess Kit & Utensils", 
    description: "Plate, spoon, fork for meals", 
    category: "essentials", 
    essential: true, 
    icon: <Utensils className="h-6 w-6 text-[#F3B939]" />
  },
  
  // Clothing
  { 
    name: "Hiking Boots", 
    description: "Well broken-in with ankle support", 
    category: "clothing", 
    essential: true, 
    icon: <Sun className="h-6 w-6 text-[#F3B939]" />
  },
  { 
    name: "Quick-dry Clothes", 
    description: "Moisture-wicking shirts and pants", 
    category: "clothing", 
    essential: true, 
    icon: <Wind className="h-6 w-6 text-[#F3B939]" />
  },
  { 
    name: "Rain Jacket", 
    description: "Lightweight, waterproof protection", 
    category: "clothing", 
    essential: true, 
    icon: <Wind className="h-6 w-6 text-[#F3B939]" />
  },
  { 
    name: "Sun Hat", 
    description: "Wide-brimmed for sun protection", 
    category: "clothing", 
    essential: false, 
    icon: <SunMedium className="h-6 w-6 text-[#F3B939]" />
  },
  { 
    name: "Warm Layer", 
    description: "Fleece or light jacket for evenings", 
    category: "clothing", 
    essential: true, 
    icon: <Wind className="h-6 w-6 text-[#F3B939]" />
  },
  
  // Personal
  { 
    name: "Sunscreen", 
    description: "SPF 30+ and lip balm", 
    category: "personal", 
    essential: true, 
    icon: <Sun className="h-6 w-6 text-[#F3B939]" />
  },
  { 
    name: "Insect Repellent", 
    description: "Jungle-strength protection", 
    category: "personal", 
    essential: true, 
    icon: <Sun className="h-6 w-6 text-[#F3B939]" />
  },
  { 
    name: "Medications", 
    description: "Personal prescriptions and basic painkillers", 
    category: "personal", 
    essential: true, 
    icon: <Sun className="h-6 w-6 text-[#F3B939]" />
  },
  { 
    name: "Energy Snacks", 
    description: "Granola bars, nuts, dried fruits", 
    category: "personal", 
    essential: true, 
    icon: <Utensils className="h-6 w-6 text-[#F3B939]" />
  },
  { 
    name: "ID & Money", 
    description: "In a waterproof pouch", 
    category: "personal", 
    essential: true, 
    icon: <Map className="h-6 w-6 text-[#F3B939]" />
  },
  
  // Optional
  { 
    name: "Trekking Poles", 
    description: "For stability on steep terrain", 
    category: "optional", 
    essential: false, 
    icon: <Map className="h-6 w-6 text-[#F3B939]" />
  },
  { 
    name: "Camera", 
    description: "Capture memories (protect from elements)", 
    category: "optional", 
    essential: false, 
    icon: <Sun className="h-6 w-6 text-[#F3B939]" />
  },
  { 
    name: "Power Bank", 
    description: "Keep devices charged", 
    category: "optional", 
    essential: false, 
    icon: <Sun className="h-6 w-6 text-[#F3B939]" />
  },
  { 
    name: "Binoculars", 
    description: "For wildlife spotting", 
    category: "optional", 
    essential: false, 
    icon: <Sun className="h-6 w-6 text-[#F3B939]" />
  },
  { 
    name: "Notebook & Pen", 
    description: "Journal your adventure", 
    category: "optional", 
    essential: false, 
    icon: <Map className="h-6 w-6 text-[#F3B939]" />
  },
]

export default function TrekEquipment() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 })
  const [selectedCategory, setSelectedCategory] = useState<EquipmentCategory>("essentials")

  const categories = [
    { id: "essentials", label: "Essentials", description: "Must-have items for your jungle trek" },
    { id: "clothing", label: "Clothing", description: "Appropriate attire for the terrain and weather" },
    { id: "personal", label: "Personal Items", description: "Health, comfort and personal necessities" },
    { id: "optional", label: "Optional Gear", description: "Enhancements for a better experience" }
  ]

  const filteredItems = equipmentList.filter(item => item.category === selectedCategory)

  return (
    <section 
      ref={sectionRef} 
      className="relative py-20 overflow-hidden" 
      id="equipment"
      style={{
        background: "linear-gradient(to bottom, #113907, #0F1A0A)",
        marginTop: "-2px"
      }}
    >
      {/* Decorative jungle elements */}
      <div className="absolute left-0 top-0 h-full w-full pointer-events-none">
        <div className="absolute left-0 top-0 h-64 w-64 bg-[url('/images/paw-prints.svg')] bg-contain bg-no-repeat opacity-10 -translate-x-1/4"></div>
        <div className="absolute right-0 bottom-0 h-64 w-64 bg-[url('/images/paw-prints.svg')] bg-contain bg-no-repeat opacity-10 translate-x-1/4 rotate-180"></div>
        
        <div className="absolute left-1/4 top-1/4 h-48 w-48 bg-[url('/images/jungle-book-paw.svg')] bg-contain bg-no-repeat opacity-5 rotate-45"></div>
        <div className="absolute right-1/4 bottom-1/4 h-48 w-48 bg-[url('/images/jungle-book-paw.svg')] bg-contain bg-no-repeat opacity-5 -rotate-45"></div>
        
        <div className="absolute left-0 bottom-0 h-full w-24 bg-[url('/images/left-vine.svg')] bg-contain bg-left bg-no-repeat opacity-20"></div>
        <div className="absolute right-0 top-0 h-full w-24 bg-[url('/images/right-vine.svg')] bg-contain bg-right bg-no-repeat opacity-20"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[#F3B939] mb-4 tracking-wide treasure-heading">
            TREK DETAILS
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
            Everything you need to know to prepare for your jungle adventure
          </p>
        </motion.div>

        {/* Category tabs */}
        <div className="grid md:grid-cols-4 gap-4 mb-12 relative">
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id as EquipmentCategory)}
              className={`relative overflow-hidden rounded-xl transition-all duration-300 ${
                selectedCategory === category.id
                  ? "bg-[#F3B939]/20 border-2 border-[#F3B939]/40"
                  : "bg-[#0A1508]/70 border border-[#F3B939]/10 hover:border-[#F3B939]/30"
              }`}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 }
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
            >
              <div className="p-6 text-center">
                <h3 className={`text-xl font-bold mb-2 ${
                  selectedCategory === category.id ? "text-[#F3B939]" : "text-white"
                }`}>{category.label}</h3>
                <p className="text-white/70 text-sm">{category.description}</p>
              </div>
              {selectedCategory === category.id && (
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 h-1 bg-[#F3B939]"
                  layoutId="activeCategory"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Equipment Checklist */}
        <div className="mb-12">
          <div className="bg-[#0A1508]/70 backdrop-blur-sm rounded-2xl p-8 border border-[#1A2614]/30 shadow-2xl">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  className="flex gap-4 items-start group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-12 w-12 rounded-full bg-[#0A1508] border-2 border-[#F3B939]/20 group-hover:border-[#F3B939]/40 flex items-center justify-center transition-colors duration-300">
                      {item.icon}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-white group-hover:text-[#F3B939] transition-colors duration-300">{item.name}</h3>
                      {item.essential && (
                        <span className="text-xs font-medium bg-[#F3B939]/20 text-[#F3B939] px-2 py-0.5 rounded-full">
                          Essential
                        </span>
                      )}
                    </div>
                    <p className="text-white/70">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Trek Tips */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative bg-[#0A1508]/70 backdrop-blur-sm rounded-2xl p-8 border border-[#1A2614]/30 shadow-2xl overflow-hidden">
            {/* Background pattern */}
            <div className="absolute top-0 right-0 h-64 w-64 bg-[url('/images/jungle-book-paw.svg')] bg-contain bg-no-repeat opacity-5 transform rotate-45"></div>
            <div className="absolute bottom-0 left-0 h-64 w-64 bg-[url('/images/paw-prints.svg')] bg-contain bg-no-repeat opacity-5"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-[#F3B939] mb-6 text-center">Jungle Trek Tips</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-bold text-white flex items-center">
                    <span className="inline-block w-6 h-6 bg-[#F3B939]/20 rounded-full flex items-center justify-center mr-2 text-sm text-[#F3B939]">1</span>
                    Pack Light, Pack Right
                  </h4>
                  <p className="text-white/70 ml-8">Every gram counts on a jungle trek. Choose multi-purpose items and prioritize essentials.</p>
                  
                  <h4 className="font-bold text-white flex items-center">
                    <span className="inline-block w-6 h-6 bg-[#F3B939]/20 rounded-full flex items-center justify-center mr-2 text-sm text-[#F3B939]">2</span>
                    Waterproof Everything
                  </h4>
                  <p className="text-white/70 ml-8">Use dry bags or ziplock bags for electronics, documents and clothing to protect from rain and humidity.</p>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-bold text-white flex items-center">
                    <span className="inline-block w-6 h-6 bg-[#F3B939]/20 rounded-full flex items-center justify-center mr-2 text-sm text-[#F3B939]">3</span>
                    Layer Your Clothing
                  </h4>
                  <p className="text-white/70 ml-8">Temperature can vary through the trek. Wear light moisture-wicking base layers with options to add or remove.</p>
                  
                  <h4 className="font-bold text-white flex items-center">
                    <span className="inline-block w-6 h-6 bg-[#F3B939]/20 rounded-full flex items-center justify-center mr-2 text-sm text-[#F3B939]">4</span>
                    Stay Hydrated
                  </h4>
                  <p className="text-white/70 ml-8">Drink water regularly even if you don't feel thirsty. Jungle treks can be deceptively dehydrating.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-white/80 max-w-2xl mx-auto mb-6">
            Got all your gear ready? Join us for an unforgettable adventure through the mystical Sandhan Valley!
          </p>
          <a 
            href="/register" 
            className="inline-block px-10 py-4 bg-[#F3B939] hover:bg-amber-500 text-[#0A1508] font-bold rounded-full transition-all duration-300 text-xl shadow-lg hover:shadow-amber-400/30 hover:scale-105"
          >
            Register Now
          </a>
        </motion.div>
      </div>
    </section>
  )
} 