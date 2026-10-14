import { lazy, Suspense, useEffect, useState } from 'react'
import Hero from '../../sections/Hero/Hero'
import ViewportSection from './ViewportSection'
import { useNavigationContext } from '../../../hooks/useNavigationContext'
import styles from './SectionStack.module.css'

// Only the Hero is in the first bundle; the other sections load as separate chunks
const About = lazy(() => import('../../sections/About/About'))
const Projects = lazy(() => import('../../sections/Projects/Projects'))
const Contact = lazy(() => import('../../sections/Contact/Contact'))

// After the first screen is up, the remaining sections are fetched in the background
const PRELOAD_DELAY_MS = 3000

const VIEWPORTS = [
  { key: 'home', Component: Hero, scrollable: false },
  { key: 'about', Component: About, scrollable: true }, // conteúdo maior que a tela
  { key: 'projects', Component: Projects, scrollable: false },
  { key: 'contact', Component: Contact, scrollable: false },
]

function SectionStack() {
  const { activeSection, isMenuOpen } = useNavigationContext()
  const [preloaded, setPreloaded] = useState(false)
  const [visited, setVisited] = useState(() => new Set(['home']))

  useEffect(() => {
    const timer = setTimeout(() => setPreloaded(true), PRELOAD_DELAY_MS)
    return () => clearTimeout(timer)
  }, [])

  // remember every section that was opened (adjusting state while rendering is the
  // pattern React recommends for state derived from other state)
  if (!visited.has(activeSection)) {
    setVisited(new Set(visited).add(activeSection))
  }

  return (
    <div className={styles.stack}>
      {VIEWPORTS.map(({ key, Component, scrollable }) => (
        <ViewportSection
          key={key}
          id={key}
          isActive={!isMenuOpen && key === activeSection}
          scrollable={scrollable}
        >
          {(key === 'home' || preloaded || visited.has(key)) && (
            <Suspense fallback={null}>
              <Component />
            </Suspense>
          )}
        </ViewportSection>
      ))}
    </div>
  )
}

export default SectionStack
