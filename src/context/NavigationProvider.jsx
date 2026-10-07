import { useCallback, useEffect, useState } from 'react'
import { NavigationContext } from './NavigationContext'
import { SECTIONS } from '../data/sections'

const SECTION_KEYS = SECTIONS.map((section) => section.key)

function readSectionFromHash() {
  const key = window.location.hash.replace('#', '')
  return SECTION_KEYS.includes(key) ? key : SECTION_KEYS[0]
}

export function NavigationProvider({ children }) {
  const [activeSection, setActiveSection] = useState(readSectionFromHash)

  useEffect(() => {
    const handleHashChange = () => setActiveSection(readSectionFromHash())
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const goToSection = useCallback((key) => {
    if (!SECTION_KEYS.includes(key)) return
    setActiveSection(key)
    if (window.location.hash !== `#${key}`) {
      window.history.pushState(null, '', `#${key}`)
    }
  }, [])

  return (
    <NavigationContext.Provider value={{ activeSection, goToSection }}>
      {children}
    </NavigationContext.Provider>
  )
}
