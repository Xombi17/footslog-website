import { Suspense } from "react"
import Preloader from "@/components/preloader"
import Navigation from "@/components/navigation"
import HeroSection from "@/components/hero-section"
import EventOverview from "@/components/event-overview"
import NaturalWonders from "@/components/gallery"
import Testimonials from "@/components/testimonials"
import Footer from "@/components/footer"
import { ParallaxProvider } from "@/components/parallax-provider"
import BackgroundMusic from "@/components/background-music"
import FeaturedHighlights from "@/components/featured-highlights"
import TrekEquipment from "@/components/trek-equipment"
import TreksMap from "@/components/treks-map"
import AchievementsStats from "@/components/achievements-stats"
import SmoothScroll from "@/components/smooth-scroll"

export default function Home() {
  return (
    <ParallaxProvider>
      <Suspense fallback={<Preloader />}>
        <main className="relative overflow-hidden">
          <Preloader />
          <Navigation />
          <BackgroundMusic />

          <SmoothScroll>
            <div className="relative">
              <div id="/">
                <HeroSection />
              </div>
              
              <FeaturedHighlights />

              <div id="events">
                <EventOverview />
              </div>

              <TreksMap />
              <TrekEquipment />
              <NaturalWonders />
              <AchievementsStats />
              <Testimonials />

              {/* Register Call to Action */}
              <div id="register" className="relative py-20 overflow-hidden" style={{
                background: "linear-gradient(to bottom, #0F1A0A, #113907)",
              }}>
                <div className="container mx-auto px-4">
                  <div className="max-w-4xl mx-auto text-center">
                    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[#F3B939] mb-6">
                      Join The Adventure
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90 mb-10">
                      Ready to experience the wilderness like never before? Register now and secure your spot for our next trek!
                    </p>
                    <a 
                      href="/register" 
                      className="inline-block px-10 py-4 bg-[#F3B939] hover:bg-amber-500 text-[#0A1508] font-bold rounded-full transition-all duration-300 text-xl shadow-lg hover:shadow-amber-400/30 hover:scale-105"
                    >
                      Register Now
                    </a>
                  </div>
                </div>
              </div>

              <Footer />
            </div>
          </SmoothScroll>
        </main>
      </Suspense>
    </ParallaxProvider>
  )
}
