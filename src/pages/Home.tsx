import ReactLenis from "lenis/react"
import AmbientBackground from "../components/ui/AmbientBackground.js"
import Footer from "../components/layout/Footer.js"
import Features from "../components/home/Features.js"
import Hero from "../components/home/Hero.js"
import How from "../components/home/How.js"
import Navbar from "../components/layout/Navbar/Navbar.js"
import ScrollReveal from "../components/ui/ScrollReveal.js"
import CTASection from "../components/home/CTASection.js"

const Home = () => {
  return (
    <ReactLenis root options={{
      lerp: 0.1,
      duration: 1.2,
      smoothWheel: false,
      wheelMultiplier: 1
    }}>
      <div className="relative min-h-screen">
        <div className="relative z-10 bg-gray-50 dark:bg-slate-950 min-h-full">
          <AmbientBackground />
          <Navbar />

          <Hero />
          <ScrollReveal>
            <div id="how-it-works">
              <How />
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div id="features">
              <Features />
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <CTASection />
          </ScrollReveal>
          <ScrollReveal>
            <Footer />
          </ScrollReveal>
        </div>
      </div>
    </ReactLenis>
  )
}

export default Home
