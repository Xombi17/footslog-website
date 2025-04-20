import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import FeaturedHighlights from "@/components/featured-highlights"
import SectionTransition from "@/components/section-transition"
import { ParallaxProvider } from "@/components/parallax-provider"
import BackgroundMusic from "@/components/background-music"

export default function AboutPage() {
  return (
    <ParallaxProvider>
      <main className="relative overflow-hidden">
        <Navigation />
        <BackgroundMusic />

        <div className="relative">
          {/* About Hero */}
          <div className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-[#0F1A0A]">
            <div className="absolute inset-0 z-0">
              <div 
                className="w-full h-full bg-[url('/images/jungle-book-bg.png')] bg-cover bg-center opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0F1A0A]/40 to-[#0F1A0A]/90 z-10"></div>
            </div>
            
            <div className="relative z-20 text-center p-8">
              <h1 className="font-display treasure-heading text-5xl md:text-7xl font-bold tracking-wider text-[#F3B939] mb-4">
                About Footslog
              </h1>
              <p className="text-white/90 text-lg md:text-xl max-w-3xl mx-auto">
                Our mission, heritage and commitment to unforgettable trekking experiences
              </p>
            </div>
          </div>

          {/* About Content */}
          <div className="bg-[#0F1A0A] py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto bg-[#1A2614]/50 p-8 rounded-xl backdrop-blur-sm border border-[#4A6D33]/30">
                <h2 className="text-3xl text-[#F3B939] font-display font-bold mb-6">Our Story</h2>
                <div className="prose prose-lg prose-invert max-w-none">
                  <p>
                    Founded by the Rotaract Club FRCRCE, Footslog began as a passionate initiative to connect urban students with the natural wonders that surround our bustling city. What started as small group expeditions has grown into an annual tradition that draws adventure enthusiasts from across the region.
                  </p>
                  <p>
                    Each year, we carefully select routes that offer both challenge and beauty, ensuring participants experience the thrill of trekking while fostering a deep appreciation for our natural environment.
                  </p>
                  <h3 className="text-2xl text-[#F3B939] font-display font-bold mt-8 mb-4">Our Mission</h3>
                  <p>
                    Footslog is more than just a trek – it's a transformative journey designed to:
                  </p>
                  <ul>
                    <li>Promote environmental conservation through first-hand experience with nature</li>
                    <li>Build leadership skills and team cooperation in challenging environments</li>
                    <li>Create lasting bonds among participants through shared adventure</li>
                    <li>Provide a mental and physical break from academic pressures</li>
                    <li>Instill a sense of achievement through conquering difficult trails</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <SectionTransition>
            <FeaturedHighlights />
          </SectionTransition>

          
          

          <Footer />
        </div>
      </main>
    </ParallaxProvider>
  )
} 