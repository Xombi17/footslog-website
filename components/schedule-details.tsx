"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Backpack, Compass, Tent, Utensils, Droplets, Sun, Moon, AmbulanceIcon as FirstAid } from "lucide-react"

const itineraries = [
  {
    day: "Day 1",
    title: "The Journey Begins",
    description: "Meet at the base camp, introductions, and initial trek through the lower forest paths.",
    details: [
      { time: "6:00 AM", activity: "Meet at college campus" },
      { time: "7:30 AM", activity: "Departure by bus to base location" },
      { time: "10:30 AM", activity: "Arrival and equipment check" },
      { time: "11:00 AM", activity: "Begin trek to first campsite" },
      { time: "4:00 PM", activity: "Campsite setup and rest" },
      { time: "7:00 PM", activity: "Dinner and campfire activities" },
    ],
  },
  {
    day: "Day 2",
    title: "Into the Wild",
    description: "Full day trek through diverse terrain, reaching the summit point by afternoon.",
    details: [
      { time: "5:30 AM", activity: "Sunrise yoga (optional)" },
      { time: "7:00 AM", activity: "Breakfast" },
      { time: "8:30 AM", activity: "Trek to summit point" },
      { time: "12:30 PM", activity: "Lunch at viewpoint" },
      { time: "2:00 PM", activity: "Continue to second campsite" },
      { time: "5:00 PM", activity: "Nature exploration activities" },
      { time: "7:30 PM", activity: "Dinner and stargazing" },
    ],
  },
  {
    day: "Day 3",
    title: "The Return Path",
    description: "Descent through alternate routes, exploring waterfalls and natural pools.",
    details: [
      { time: "6:00 AM", activity: "Early breakfast" },
      { time: "7:30 AM", activity: "Break camp and begin descent" },
      { time: "11:00 AM", activity: "Waterfall stop and swimming" },
      { time: "1:00 PM", activity: "Lunch" },
      { time: "2:30 PM", activity: "Final trek to base" },
      { time: "4:30 PM", activity: "Certificate distribution" },
      { time: "5:30 PM", activity: "Departure for return journey" },
      { time: "8:30 PM", activity: "Estimated arrival at college" },
    ],
  },
]

const gearItems = [
  { icon: <Backpack className="h-5 w-5" />, name: "Backpack (40-50L)", essential: true },
  { icon: <Tent className="h-5 w-5" />, name: "Sleeping Bag", essential: true },
  { icon: <Compass className="h-5 w-5" />, name: "Navigation Tools", essential: false },
  { icon: <Utensils className="h-5 w-5" />, name: "Mess Kit & Utensils", essential: true },
  { icon: <Droplets className="h-5 w-5" />, name: "Water Bottles (2L min)", essential: true },
  { icon: <Sun className="h-5 w-5" />, name: "Sun Protection", essential: true },
  { icon: <Moon className="h-5 w-5" />, name: "Headlamp/Flashlight", essential: true },
  { icon: <FirstAid className="h-5 w-5" />, name: "First Aid Kit", essential: true },
]

export default function ScheduleDetails() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 })

  return (
    <section ref={sectionRef} className="relative" id="schedule">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#0F1A0A]/90 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-[url('/images/paw-prints.svg')] bg-repeat opacity-5"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="font-serif text-4xl font-bold text-[#D4A72C] md:text-5xl">Trek Details</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#E5E1D6]">
            Everything you need to know to prepare for your jungle adventure
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
          {/* Daily Itineraries */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="mb-6 font-serif text-2xl font-bold text-[#D4A72C]">Daily Itineraries</h3>
            <Accordion type="single" collapsible className="w-full">
              {itineraries.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b border-[#4A6D33]/50">
                  <AccordionTrigger className="py-4 text-left font-bold text-[#E5E1D6] hover:text-[#D4A72C] [&[data-state=open]]:text-[#D4A72C]">
                    <span className="flex items-center">
                      <span className="mr-3 rounded-full bg-[#2A3B22] px-3 py-1 text-sm text-[#D4A72C]">
                        {item.day}
                      </span>
                      {item.title}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 pt-2 text-[#E5E1D6]">
                    <p className="mb-4">{item.description}</p>
                    <div className="rounded-lg bg-[#1A2614]/80 backdrop-blur-sm p-4 border border-[#4A6D33]/30">
                      <h4 className="mb-3 font-bold text-[#D4A72C]">Schedule</h4>
                      <ul className="space-y-2">
                        {item.details.map((detail, idx) => (
                          <li key={idx} className="flex">
                            <span className="mr-3 font-mono text-sm text-[#D4A72C]">{detail.time}</span>
                            <span>{detail.activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          {/* Gear Checklist */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="mb-6 font-serif text-2xl font-bold text-[#D4A72C]">Gear Checklist</h3>
            <div className="rounded-xl bg-[#1A2614]/80 backdrop-blur-sm p-6 shadow-lg border border-[#4A6D33]/30">
              <p className="mb-6 text-[#E5E1D6]">
                Ensure you have all the necessary equipment for a safe and comfortable trek experience.
              </p>
              <ul className="space-y-4">
                {gearItems.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="flex items-center rounded-lg bg-[#243420]/80 backdrop-blur-sm p-3 border border-[#4A6D33]/20"
                  >
                    <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#2A3B22] text-[#D4A72C]">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <span className="font-medium text-[#E5E1D6]">{item.name}</span>
                      {item.essential && (
                        <span className="ml-2 rounded-full bg-[#D4A72C]/20 px-2 py-0.5 text-xs font-medium text-[#D4A72C]">
                          Essential
                        </span>
                      )}
                    </div>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-8 rounded-lg bg-[#0F1A0A]/80 backdrop-blur-sm p-4 border border-[#4A6D33]/20">
                <h4 className="mb-2 font-bold text-[#D4A72C]">Survival Tips</h4>
                <ul className="space-y-2 text-[#E5E1D6]">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Always carry more water than you think you'll need</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Layer your clothing for changing temperatures</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Stay with the group at all times</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Inform guides of any medical conditions</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
