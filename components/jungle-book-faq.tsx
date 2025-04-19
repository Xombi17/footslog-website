"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ChevronDown, Quote } from "lucide-react"
import Image from "next/image"

type FAQItem = {
  character: string;
  question: string;
  answer: string;
  image: string;
};

const faqs: FAQItem[] = [
  {
    character: "Mowgli",
    question: "What should I expect during the Footslog trek?",
    answer: "Our trek will take you through the heart of nature, with breathtaking views, challenging terrain, and unforgettable experiences. We'll explore valleys, forests, and streams while creating memories that will last a lifetime.",
    image: "/images/jungle-book-bg.png",
  },
  {
    character: "Bagheera",
    question: "How difficult is the trek? Do I need prior experience?",
    answer: "The trek is suitable for beginners with a basic fitness level. While prior trekking experience is helpful, it's not mandatory. We recommend daily walking practice for 2-3 weeks before the trek to build stamina. Our experienced guides will assist you throughout the journey.",
    image: "/images/jungle-book-bg.png",
  },
  {
    character: "Baloo",
    question: "What food and accommodation arrangements are made?",
    answer: "We provide simple, nutritious meals throughout the trek. Breakfast, lunch, dinner, and evening snacks are included in your package. Accommodation will be in tents (2-3 people sharing), with sleeping bags and mats provided. It's a blend of adventure and comfort!",
    image: "/images/jungle-book-bg.png",
  },
  {
    character: "Kaa",
    question: "What safety measures are in place?",
    answer: "Your safety is our priority. Our guides are trained in first aid and emergency response. We carry medical kits, maintain regular communication with base camps, and follow strict safety protocols. The trek routes are carefully selected and regularly assessed for safety.",
    image: "/images/jungle-book-bg.png",
  },
  {
    character: "King Louie",
    question: "How do I book and what's the cancellation policy?",
    answer: "You can book through our website with a 50% advance payment. The remaining amount should be paid before the trek date. For cancellations 30+ days before: 80% refund; 15-29 days: 50% refund; less than 15 days: no refund. We do offer to reschedule to another date subject to availability.",
    image: "/images/jungle-book-bg.png",
  },
];

export default function JungleBookFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div ref={containerRef} className="py-20 relative overflow-hidden bg-[#0F1A0A]">
      {/* Diagonal decorative element - matches testimonials */}
      <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-r from-[#0F1A0A] via-[#4A6D33]/20 to-[#0F1A0A] transform skew-y-2" />
      
      {/* Background elements - similar to testimonials */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-10 w-24 h-24 rounded-full bg-[#D4A72C]/30" />
        <div className="absolute bottom-40 left-20 w-32 h-32 rounded-full bg-[#4A6D33]/20" />
        <div className="absolute top-1/2 right-1/3 w-16 h-16 rounded-full bg-[#D4A72C]/20" />
      </div>
      
      {/* Jungle vines as subtle background elements */}
      <div className="absolute right-0 top-20 h-80 w-20 opacity-10">
        <Image
          src="/images/jungle-vines-right.svg"
          alt="Jungle vines"
          width={100}
          height={400}
        />
      </div>
      
      <div className="absolute left-0 bottom-20 h-80 w-20 opacity-10">
        <Image
          src="/images/jungle-vines-right.svg"
          alt="Jungle vines"
          width={100}
          height={400}
          className="rotate-180"
        />
      </div>
      
      <div className="container mx-auto px-4">
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
            className="text-3xl md:text-4xl font-bold text-[#D4A72C] mb-4"
          >
            QUESTIONS FROM THE JUNGLE
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[#E5E1D6]/70 max-w-2xl mx-auto"
          >
            Our jungle friends have some questions you might be wondering about too!
          </motion.p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="mb-6"
            >
              <div 
                className="flex items-center p-5 cursor-pointer rounded-lg bg-[#243420] shadow-md"
                onClick={() => toggleFAQ(index)}
              >
                <div className="relative w-12 h-12 mr-4 rounded-full overflow-hidden border-4 border-[#4A6D33]/50">
                  <Image 
                    src={faq.image} 
                    alt={faq.character} 
                    fill 
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#E5E1D6]">{faq.question}</h3>
                  <p className="text-sm text-[#E5E1D6]/70">Asked by {faq.character}</p>
                </div>
                <ChevronDown 
                  className={`text-[#D4A72C] transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} 
                  size={20}
                />
              </div>
              
              {openIndex === index && (
                <motion.div 
                  className="p-6 bg-[#243420]/80 rounded-b-lg border-t border-[#4A6D33]/30 mt-px"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-[#D4A72C] mb-3">
                    <Quote className="h-6 w-6 opacity-70" />
                  </div>
                  <p className="text-[#E5E1D6]/90 leading-relaxed">{faq.answer}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <p className="text-[#E5E1D6]/70 mb-6">Don't see your question? Feel free to reach out!</p>
          <a 
            href="mailto:contact@footslog.com" 
            className="inline-block px-8 py-3 rounded-full bg-[#243420] text-[#D4A72C] hover:bg-[#D4A72C] hover:text-[#0F1A0A] transition-colors"
          >
            Contact Us
          </a>
        </motion.div>
      </div>
    </div>
  );
} 