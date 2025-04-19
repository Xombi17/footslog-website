"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
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

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-16 overflow-hidden" style={{
      background: "linear-gradient(to bottom, #1A2C1C, #0F1A0A)",
    }}>
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <Image 
          src="/images/jungle-book-bg.png" 
          alt="Jungle background" 
          fill 
          className="object-cover opacity-20"
        />
      </div>
      
      {/* Jungle vines */}
      <div className="absolute right-0 top-20 h-80 w-20">
        <Image
          src="/images/jungle-vines-right.svg"
          alt="Jungle vines"
          width={100}
          height={400}
          className="opacity-30"
        />
      </div>
      
      <div className="absolute left-0 bottom-20 h-80 w-20">
        <Image
          src="/images/jungle-vines-right.svg"
          alt="Jungle vines"
          width={100}
          height={400}
          className="opacity-30 rotate-180"
        />
      </div>
      
      <div className="container px-4 mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-14">
          <motion.div
            className="inline-block mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: .4 }}
            viewport={{ once: true }}
          >
            <Image 
              src="/images/jungle-book-paw.svg" 
              alt="Paw print" 
              width={50} 
              height={50} 
              className="opacity-30"
            />
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4 text-[#F3B939] font-display"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: .6 }}
            viewport={{ once: true }}
          >
            QUESTIONS FROM THE JUNGLE
          </motion.h2>
          
          <motion.p 
            className="text-lg text-[#ffffffcc] max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: .6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Our jungle friends have some questions you might be wondering about too!
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div 
                className="flex items-center p-5 cursor-pointer rounded-lg"
                style={{ background: "rgba(41, 76, 47, 0.5)" }}
                onClick={() => toggleFAQ(index)}
              >
                <div className="relative w-12 h-12 mr-4 rounded-full overflow-hidden">
                  <Image 
                    src={faq.image} 
                    alt={faq.character} 
                    fill 
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white">{faq.question}</h3>
                  <p className="text-sm text-white/70">Asked by {faq.character}</p>
                </div>
                <ChevronDown 
                  className={`text-white transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} 
                  size={20}
                />
              </div>
              
              {openIndex === index && (
                <motion.div 
                  className="p-6 bg-[#1a2c1c]/80 rounded-b-lg"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-white/90 leading-relaxed">{faq.answer}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-white/80 mb-6">Don't see your question? Feel free to reach out!</p>
          <a 
            href="mailto:contact@footslog.com" 
            className="inline-block px-10 py-4 bg-[#F3B939] hover:bg-amber-500 text-[#0A1508] font-bold rounded-full transition-all duration-300 text-xl shadow-lg hover:shadow-amber-400/30 hover:scale-105"
          >
            Contact Us
          </a>
        </motion.div>
      </div>
    </section>
  );
} 