import ReactLenis from "lenis/react"
import AmbientBackground from "../components/AmbientBackground.js"
import Footer from "../components/Footer.js"
import Features from "../components/Home/Fetures.js"
import Hero from "../components/Home/Hero.js"
import How from "../components/Home/How.js"
import Navbar from "../components/Navbar/Navbar.js"
import ScrollReveal from "../components/ScrollReveal.js"

const Home = () => {

return(
     <ReactLenis root options={{ 
      lerp: 0.05,
      duration: 1.5,
      smoothWheel: true,
      wheelMultiplier: 0.8
    }}>
<div className="relative min-h-screen">
<div className="relative z-10 bg-gray-50 dark:bg-gray-800 min-h-full">
    <AmbientBackground/>
   <Navbar user={null} handleLogout={() => {}} />
    
    <Hero/>``
    <ScrollReveal>
        <div id= "how-it-works">
          <How/>
        </div>
    </ScrollReveal>
    <ScrollReveal>
        <div id="features">   
         <Features/>
        </div>
    </ScrollReveal>
    <ScrollReveal>
    <Footer/>
    </ScrollReveal>
</div>
</div>
</ReactLenis>
)
}

export default Home