import { useCallback, useEffect, useState } from 'react'
import { NavigationContext } from './NavigationContext'
import { SECTIONS } from '../data/sections'

const SECTION_KEYS = SECTIONS.map((section) => section.key)

// the active section comes from the URL hash (#about), so direct links and the
// browser back button keep working even without page scroll
function readSectionFromHash() {
  const key = window.location.hash.replace('#', '')
  return SECTION_KEYS.includes(key) ? key : SECTION_KEYS[0]
}

export function NavigationProvider({ children }) {
  const [activeSection, setActiveSection] = useState(readSectionFromHash)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleHashChange = () => setActiveSection(readSectionFromHash())
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // ESC closes the menu
  useEffect(() => {
    if (!isMenuOpen) return undefined
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isMenuOpen])

  const goToSection = useCallback((key) => {
    if (!SECTION_KEYS.includes(key)) return
    setActiveSection(key)
    setIsMenuOpen(false)
    if (window.location.hash !== `#${key}`) {
      window.history.pushState(null, '', `#${key}`)
    }
  }, [])

  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), [])
  const closeMenu = useCallback(() => setIsMenuOpen(false), [])

  return (
    <NavigationContext.Provider
      value={{ activeSection, goToSection, isMenuOpen, toggleMenu, closeMenu }}
    >
      {children}
    </NavigationContext.Provider>
  )
}
