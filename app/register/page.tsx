import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import RegistrationForm from "@/components/registration-form"
import SectionTransition from "@/components/section-transition"
import { ParallaxProvider } from "@/components/parallax-provider"
import BackgroundMusic from "@/components/background-music"

export default function RegisterPage() {
  return (
    <ParallaxProvider>
      <main className="relative overflow-hidden">
        <Navigation />
        <BackgroundMusic />

        <div className="relative">
          {/* Register Hero */}
          <div className="relative h-[40vh] flex items-center justify-center overflow-hidden bg-[#0F1A0A]">
            <div className="absolute inset-0 z-0">
              <div 
                className="w-full h-full bg-[url('/images/jungle-book-bg.png')] bg-cover bg-center opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0F1A0A]/40 to-[#0F1A0A]/90 z-10"></div>
            </div>
            
            <div className="relative z-20 text-center p-8">
              <h1 className="font-display treasure-heading text-5xl md:text-7xl font-bold tracking-wider text-[#F3B939] mb-4">
                Join The Adventure
              </h1>
              <p className="text-white/90 text-lg md:text-xl max-w-3xl mx-auto">
                Register for our upcoming treks and secure your spot in the wild
              </p>
            </div>
          </div>

          {/* Registration Information */}
          <div className="bg-[#0F1A0A] py-12">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto mb-16">
                <div className="bg-[#1A2614]/50 p-8 rounded-xl backdrop-blur-sm border border-[#4A6D33]/30">
                  <h2 className="text-2xl text-[#F3B939] font-display font-bold mb-4">Important Information</h2>
                  <div className="prose prose-lg prose-invert max-w-none">
                    <ul>
                      <li>Registration closes 2 weeks before each trek</li>
                      <li>Minimum age requirement: 18 years</li>
                      <li>No prior trekking experience required for beginner treks</li>
                      <li>Advance payment of 50% required to secure your spot</li>
                      <li>Cancellation policy: Full refund up to 10 days before the event</li>
                    </ul>
                    
                    <h3 className="text-xl text-[#F3B939] font-display font-bold mt-6 mb-2">What's Included</h3>
                    <ul>
                      <li>Professional trekking guides</li>
                      <li>Safety equipment</li>
                      <li>First aid support</li>
                      <li>Transportation from meeting point</li>
                      <li>Meals during the trek (as specified in itinerary)</li>
                      <li>Certificate of achievement</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Registration Form Component */}
              <SectionTransition>
                <RegistrationForm />
              </SectionTransition>
            </div>
          </div>

          <Footer />
        </div>
      </main>
    </ParallaxProvider>
  )
} 