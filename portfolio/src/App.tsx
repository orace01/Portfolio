import { Route, Routes } from 'react-router-dom'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CircuitBackground from '@/components/layout/CircuitBackground'
import Caine from '@/components/caine/Caine'
import CurtainTransition from '@/components/transitions/CurtainTransition'
import { CaineProvider } from '@/context/CaineContext'
import Home from '@/pages/Home'
import Projects from '@/pages/Projects'
import Skills from '@/pages/Skills'
import About from '@/pages/About'
import Contact from '@/pages/Contact'

export default function App() {
  return (
    <CaineProvider>
      <CircuitBackground />
      <div className="relative flex min-h-screen flex-col">
        <Header />
        <CurtainTransition>
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
        </CurtainTransition>
        <Footer />
      </div>
      <Caine />
    </CaineProvider>
  )
}
