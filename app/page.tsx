import { Suspense } from "react"
import Navigation from "@/components/navigation"
import HeroSection from "@/components/hero-section"
import EventOverview from "@/components/event-overview"
import ScheduleDetails from "@/components/schedule-details"
import RegistrationForm from "@/components/registration-form"
import Gallery from "@/components/gallery"
import Testimonials from "@/components/testimonials"
import Footer from "@/components/footer"
import { ParallaxProvider } from "@/components/parallax-provider"
import SectionTransition from "@/components/section-transition"
import BackgroundMusic from "@/components/background-music"
import FeaturedHighlights from "@/components/featured-highlights"
import TrekEquipment from "@/components/trek-equipment"
import TreksMap from "@/components/treks-map"
import AchievementsStats from "@/components/achievements-stats"

export default function Home() {
  return (
    <ParallaxProvider>
      <Suspense>
        <main className="relative overflow-hidden">
          <Navigation />
          <BackgroundMusic />

          <div className="relative">
            <HeroSection />

            {/* Key Highlights */}
            <div className="py-6 bg-[#243420]/90">
              <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                  {[
                    { icon: "🏔️", text: "Breathtaking Views" },
                    { icon: "🌳", text: "Rich Biodiversity" },
                    { icon: "⛺", text: "Camping Experience" },
                    { icon: "🧠", text: "Team Building" },
                    { icon: "🧭", text: "Expert Guides" }
                  ].map((item, i) => (
                    <div 
                      key={i} 
                      className="flex items-center gap-2 bg-[#1A2614]/50 px-4 py-2 rounded-full backdrop-blur-sm border border-[#4A6D33]/30"
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span className="text-[#E5E1D6] font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <SectionTransition>
              <FeaturedHighlights />
            </SectionTransition>

            <SectionTransition>
              <EventOverview />
            </SectionTransition>

            <SectionTransition>
              <TreksMap />
            </SectionTransition>

            <SectionTransition>
              <ScheduleDetails />
            </SectionTransition>

            <SectionTransition>
              <TrekEquipment />
            </SectionTransition>

            <SectionTransition>
              <Gallery />
            </SectionTransition>

            <SectionTransition>
              <AchievementsStats />
            </SectionTransition>

            <SectionTransition>
              <Testimonials />
            </SectionTransition>

            <SectionTransition>
              <RegistrationForm />
            </SectionTransition>

            <Footer />
          </div>
        </main>
      </Suspense>
    </ParallaxProvider>
  )
}
