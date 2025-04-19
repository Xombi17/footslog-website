import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import ScheduleDetails from "@/components/schedule-details"
import TreksMap from "@/components/treks-map"
import SectionTransition from "@/components/section-transition"
import { ParallaxProvider } from "@/components/parallax-provider"
import BackgroundMusic from "@/components/background-music"
import TrekEquipment from "@/components/trek-equipment"
import EventOverview from "@/components/event-overview"

export default function EventsPage() {
  return (
    <ParallaxProvider>
      <main className="relative overflow-hidden">
        <Navigation />
        <BackgroundMusic />

        <div className="relative">
          {/* Events Hero */}
          <div className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-[#0F1A0A]">
            <div className="absolute inset-0 z-0">
              <div 
                className="w-full h-full bg-[url('/images/jungle-book-bg.png')] bg-cover bg-center opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0F1A0A]/40 to-[#0F1A0A]/90 z-10"></div>
            </div>
            
            <div className="relative z-20 text-center p-8">
              <h1 className="font-display treasure-heading text-5xl md:text-7xl font-bold tracking-wider text-[#F3B939] mb-4">
                Our Events
              </h1>
              <p className="text-white/90 text-lg md:text-xl max-w-3xl mx-auto">
                Discover our upcoming treks, past expeditions, and exciting jungle adventures
              </p>
            </div>
          </div>

          {/* Featured Event */}
          <div className="bg-[#0F1A0A] py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl text-center text-[#F3B939] font-display font-bold mb-10">
                  Upcoming Trek: Jungle Summit 2023
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Event cards */}
                  {[
                    {
                      title: "Jungle Trek Expedition",
                      date: "November 15, 2023",
                      image: "/images/jungle-book-bg.png",
                      desc: "A challenging trek through dense jungle terrain with breathtaking viewpoints."
                    },
                    {
                      title: "Waterfall Hike",
                      date: "December 5, 2023",
                      image: "/images/jungle-book-bg.png",
                      desc: "Explore hidden waterfalls and natural pools in the heart of the wilderness."
                    },
                    {
                      title: "Night Safari Adventure",
                      date: "January 20, 2024",
                      image: "/images/jungle-book-bg.png",
                      desc: "Experience the jungle after dark with our expert guides and special equipment."
                    }
                  ].map((event, i) => (
                    <div key={i} className="bg-[#1A2614]/70 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-transform duration-300">
                      <div className="h-48 relative">
                        <div 
                          className="absolute inset-0 bg-cover bg-center"
                          style={{ backgroundImage: `url(${event.image})` }}
                        />
                      </div>
                      <div className="p-6">
                        <span className="text-[#F3B939] text-sm font-medium">{event.date}</span>
                        <h3 className="text-white text-xl font-bold mt-1 mb-2">{event.title}</h3>
                        <p className="text-white/80">{event.desc}</p>
                        <button className="mt-4 bg-[#113907] hover:bg-[#215812] text-white px-4 py-2 rounded-full text-sm transition-colors duration-300">
                          Learn More
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

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

          <Footer />
        </div>
      </main>
    </ParallaxProvider>
  )
} 