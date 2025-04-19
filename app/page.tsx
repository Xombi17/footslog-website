import { Suspense } from "react"
import Preloader from "@/components/preloader"
import Navigation from "@/components/navigation"
import HeroSection from "@/components/hero-section"
import EventOverview from "@/components/event-overview"
import ScheduleDetails from "@/components/schedule-details"
import RegistrationForm from "@/components/registration-form"
import Gallery from "@/components/gallery"
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
              <HeroSection />
              
              <div id="about">
                <FeaturedHighlights />
              </div>

              <div id="events">
                <EventOverview />
              </div>

              <TreksMap />
              <ScheduleDetails />
              <TrekEquipment />
              <Gallery />
              <AchievementsStats />
              <Testimonials />

              <div id="register">
                <RegistrationForm />
              </div>

              <Footer />
            </div>
          </SmoothScroll>
        </main>
      </Suspense>
    </ParallaxProvider>
  )
}
