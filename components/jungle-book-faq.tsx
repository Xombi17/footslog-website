"use client"

import React, { useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { ChevronDown, Quote } from "lucide-react"
import Image from "next/image"

type FAQItem = {
  character: string;
  question: string;
  answer: string;
  image: string;
  color: string;
};

const faqs: FAQItem[] = [
  {
    character: "Mowgli",
    question: "What is the difficulty level of the trek?",
    answer: "Our trek is designed for beginners and intermediate level trekkers. With a moderate difficulty level, it offers challenges while remaining accessible to those with basic fitness levels.",
    image: "/images/mowgli.png",
    color: "from-amber-700/80 to-amber-900/80",
  },
  {
    character: "Bagheera",
    question: "What should I pack for the trek?",
    answer: "Essential items include appropriate footwear, comfortable clothing, a backpack, water bottle, snacks, sunscreen, insect repellent, and a first aid kit. Check our equipment section for a detailed packing list.",
    image: "/images/bagheera.png",
    color: "from-slate-700/80 to-slate-900/80",
  },
  {
    character: "Baloo",
    question: "Is food provided during the trek?",
    answer: "Yes, we provide nutritious meals during the trek. Our team prepares fresh, energizing food to keep you fueled throughout the adventure. We can accommodate dietary restrictions with advance notice.",
    image: "/images/baloo.png",
    color: "from-blue-700/80 to-blue-900/80",
  },
  {
    character: "Kaa",
    question: "Are there age restrictions for participants?",
    answer: "Participants should be at least 12 years old. Those under 18 must be accompanied by an adult. There's no upper age limit, but we recommend consulting with your physician if you have health concerns.",
    image: "/images/kaa.png",
    color: "from-green-700/80 to-green-900/80",
  },
  {
    character: "King Louie",
    question: "What happens in case of bad weather?",
    answer: "Safety is our priority. In case of severe weather, we may modify or postpone the trek. Our guides constantly monitor conditions and will make decisions accordingly. You'll be informed of any changes as early as possible.",
    image: "/images/king-louie.png",
    color: "from-orange-700/80 to-orange-900/80",
  },
];

export default function JungleBookFAQ() {
  const [openItem, setOpenItem] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };

  return (
    <div ref={containerRef} className="py-20 relative overflow-hidden bg-[#0F1A0A]" id="faq">
      {/* Character decorations that scroll with the page */}
      <div className="absolute -right-5 top-20 w-48 h-48 opacity-25">
        <Image
          src="/images/sherkhan.png"
          alt="Shere Khan"
          width={200}
          height={200}
          className="object-contain rotate-12"
        />
      </div>
      
      {/* Bottom character that scrolls with page */}
      <div className="absolute -left-5 bottom-20 w-36 h-36 opacity-25">
        <Image
          src="/images/mowgly-hanging.png"
          alt="Mowgli"
          width={160}
          height={160}
          className="object-contain -rotate-12"
        />
      </div>
      
      {/* Diagonal decorative element */}
      <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-r from-[#0F1A0A] via-[#4A6D33]/20 to-[#0F1A0A] transform skew-y-2" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-12"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="font-display text-3xl md:text-4xl font-bold text-[#D4A72C] mb-4"
          >
            QUESTIONS FROM THE JUNGLE
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[#E5E1D6]/90 max-w-2xl mx-auto font-sans text-lg"
          >
            Our jungle friends have some questions you might be wondering about too!
          </motion.p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="mb-6"
            >
              <div 
                className="relative overflow-hidden rounded-xl bg-black/30 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:shadow-md hover:shadow-amber-900/20 group"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="flex items-center justify-between w-full px-6 py-5 text-left relative z-20 cursor-pointer"
                  aria-expanded={openItem === index}
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/20 flex-shrink-0 group-hover:border-[#F3B939]/50 transition-all duration-300">
                      <Image
                        src={faq.image}
                        alt={faq.character}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="block text-sm font-medium text-[#F3B939]">
                        {faq.character} asks:
                      </span>
                      <h3 className="text-xl font-medium text-white group-hover:text-[#F3B939]/90 transition-colors duration-300">
                        {faq.question}
                      </h3>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-6 h-6 text-white/70 transition-transform duration-300 flex-shrink-0 ${
                      openItem === index ? "rotate-180 text-[#F3B939]" : "rotate-0 group-hover:text-[#F3B939]/70"
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {openItem === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="relative z-10"
                    >
                      <div 
                        className={`px-6 pb-6 pt-2 text-white/90 bg-gradient-to-br ${faq.color} rounded-b-xl relative`}
                      >
                        <Quote className="absolute top-2 left-2 w-8 h-8 text-white/10 opacity-50" />
                        <p className="relative z-10 pl-2">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <p className="text-[#E5E1D6]/90 mb-6 font-sans">Don't see your question? Feel free to reach out!</p>
          <a 
            href="mailto:contact@footslog.com" 
            className="inline-block px-8 py-3 rounded-full bg-[#243420] text-[#D4A72C] hover:bg-[#D4A72C] hover:text-[#0F1A0A] transition-colors font-sans font-bold text-base"
          >
            Contact Us
          </a>
        </motion.div>
      </div>
    </div>
  );
} 