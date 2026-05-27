import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import PortfolioChat from './components/PortfolioChat'
import { allProjectGalleryImages } from './data/portfolio'
import { preloadImages } from './utils/imagePreload'

function App() {
  useEffect(() => {
    preloadImages(allProjectGalleryImages)
  }, [])

  return (
    <div className="app-shell">
      <div className="app-ambient" aria-hidden="true">
        <span className="app-ambient__orb app-ambient__orb--one" />
        <span className="app-ambient__orb app-ambient__orb--two" />
        <span className="app-ambient__orb app-ambient__orb--three" />
      </div>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <PortfolioChat />
    </div>
  )
}

export default App
