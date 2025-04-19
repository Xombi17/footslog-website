"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { CheckCircle2, AlertCircle, Info } from "lucide-react"

type EquipmentCategory = "essentials" | "clothing" | "personal" | "optional"

interface EquipmentItem {
  name: string
  description: string
  category: EquipmentCategory
  essential: boolean
  icon?: string
}

const equipmentList: EquipmentItem[] = [
  // Essentials
  { name: "Backpack", description: "30-40L waterproof backpack for day treks", category: "essentials", essential: true, icon: "🎒" },
  { name: "Water Bottle", description: "At least 2L capacity, preferably insulated", category: "essentials", essential: true, icon: "💧" },
  { name: "Headlamp", description: "With extra batteries for night hikes", category: "essentials", essential: true, icon: "🔦" },
  { name: "First Aid Kit", description: "Basic kit with bandages, antiseptic, pain relievers", category: "essentials", essential: true, icon: "🩹" },
  { name: "Whistle", description: "For emergency signaling", category: "essentials", essential: true, icon: "🔊" },
  
  // Clothing
  { name: "Hiking Boots", description: "Sturdy, broken-in boots with ankle support", category: "clothing", essential: true, icon: "👟" },
  { name: "Quick-dry Clothes", description: "Moisture-wicking shirts and pants", category: "clothing", essential: true, icon: "👕" },
  { name: "Rain Jacket", description: "Lightweight, waterproof shell", category: "clothing", essential: true, icon: "🧥" },
  { name: "Sun Hat", description: "Wide-brimmed for sun protection", category: "clothing", essential: false, icon: "👒" },
  { name: "Warm Layer", description: "Fleece or light jacket for evenings", category: "clothing", essential: true, icon: "🧣" },
  
  // Personal
  { name: "Sunscreen", description: "SPF 30+ and lip balm", category: "personal", essential: true, icon: "☀️" },
  { name: "Insect Repellent", description: "DEET-based for effective protection", category: "personal", essential: true, icon: "🦟" },
  { name: "Medications", description: "Personal prescriptions and altitude sickness pills", category: "personal", essential: true, icon: "💊" },
  { name: "Snacks", description: "Energy bars, nuts, dried fruits", category: "personal", essential: true, icon: "🥜" },
  { name: "ID & Money", description: "In a waterproof bag", category: "personal", essential: true, icon: "💳" },
  
  // Optional
  { name: "Trekking Poles", description: "For stability on steep terrain", category: "optional", essential: false, icon: "🥢" },
  { name: "Camera", description: "For capturing the memorable moments", category: "optional", essential: false, icon: "📷" },
  { name: "Power Bank", description: "For charging devices", category: "optional", essential: false, icon: "🔋" },
  { name: "Binoculars", description: "For wildlife spotting", category: "optional", essential: false, icon: "🔭" },
  { name: "Portable Chair", description: "Lightweight camping stool for rests", category: "optional", essential: false, icon: "🪑" },
]

export default function TrekEquipment() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 })
  const [selectedCategory, setSelectedCategory] = useState<EquipmentCategory>("essentials")

  const categories = [
    { id: "essentials", label: "Essentials", icon: "⭐" },
    { id: "clothing", label: "Clothing", icon: "👚" },
    { id: "personal", label: "Personal Items", icon: "🧴" },
    { id: "optional", label: "Optional Gear", icon: "✨" }
  ]

  const filteredItems = equipmentList.filter(item => item.category === selectedCategory)

  return (
    <section ref={sectionRef} className="relative py-20" id="equipment">
      {/* Background with pattern overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#1A2614]/90 backdrop-blur-sm" />
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "url('/images/paw-prints.svg')",
            backgroundSize: "200px",
            backgroundRepeat: "repeat"
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="font-display text-4xl font-bold text-[#D4A72C] md:text-5xl">
            Trek Equipment
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#E5E1D6]">
            Be prepared for your adventure with this essential packing list
          </p>
        </motion.div>

        {/* Category tabs */}
        <div className="mb-8 flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id as EquipmentCategory)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 transition-all ${
                selectedCategory === category.id
                  ? "bg-[#D4A72C] text-[#0F1A0A] font-medium"
                  : "bg-[#243420]/80 text-[#E5E1D6] hover:bg-[#243420] border border-[#4A6D33]/30"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span>{category.icon}</span>
              <span>{category.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Equipment items grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.name}
              className="group relative overflow-hidden rounded-xl border border-[#4A6D33]/30 bg-[#243420]/80 backdrop-blur-sm p-5 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#1A2614] text-2xl">
                  {item.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-[#D4A72C]">{item.name}</h3>
                    {item.essential ? (
                      <span title="Essential item">
                        <CheckCircle2 className="h-4 w-4 text-[#4A6D33]" />
                      </span>
                    ) : (
                      <span title="Optional item">
                        <Info className="h-4 w-4 text-[#8B9D7D]" />
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[#E5E1D6]">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Equipment tips */}
        <motion.div
          className="mt-12 rounded-xl border border-[#D4A72C]/20 bg-[#1A2614]/70 backdrop-blur-sm p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#D4A72C]/20 text-[#D4A72C]">
              <AlertCircle className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#D4A72C]">Equipment Tips</h3>
              <ul className="mt-3 list-inside list-disc space-y-2 text-[#E5E1D6]">
                <li>Pack light but pack right - every gram counts on a trek</li>
                <li>Waterproof everything - use dry bags or ziplock bags</li>
                <li>Break in new boots at least 2 weeks before the trek</li>
                <li>Layer your clothing rather than bringing bulky items</li>
                <li>Keep essentials (water, snacks, first aid) easily accessible</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 