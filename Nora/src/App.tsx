import { useState } from 'react'
import { Navbar } from './components/Navbar'
import { SpineCanvas } from './components/SpineCanvas'
import { Preloader } from './components/Preloader'
import { Hero } from './components/Hero'
import { Specialties } from './components/Specialties'
import { Experience } from './components/Experience'
import { Contact } from './components/Contact'
import { useImageSequence } from './hooks/useImageSequence'
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion'
import { doctor } from './data/siteContent'

const SCROLL_TARGET_ID = 'page-root'

function App() {
  const { images, frameCount, loadedCount, isLoading, error } = useImageSequence()
  const reducedMotion = usePrefersReducedMotion()
  const [errorDismissed, setErrorDismissed] = useState(false)

  const preloaderVisible = isLoading || (Boolean(error) && !errorDismissed)
  const contentReady = !preloaderVisible

  return (
    <>
      <SpineCanvas
        images={images}
        frameCount={frameCount}
        reducedMotion={reducedMotion}
        scrollTargetId={SCROLL_TARGET_ID}
      />

      <Preloader
        visible={preloaderVisible}
        loadedCount={loadedCount}
        frameCount={frameCount}
        error={error}
        practiceInitials={doctor.logoInitials}
        onDismiss={() => setErrorDismissed(true)}
      />

      <div id={SCROLL_TARGET_ID} className="relative z-10">
        <Navbar />
        <main>
          <Hero ready={contentReady} />
          <Specialties reducedMotion={reducedMotion} />
          <Experience reducedMotion={reducedMotion} />
          <Contact />
        </main>
        <footer className="border-t border-line/60 px-6 py-8 text-center text-xs text-muted">
          © {new Date().getFullYear()} {doctor.name} — Contenu de démonstration.
        </footer>
      </div>
    </>
  )
}

export default App
