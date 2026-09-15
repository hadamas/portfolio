import { useState, useRef, useCallback } from 'react'
import { NavigationContext } from './NavigationContext'
import { SECTIONS } from '../data/sections'

export function NavigationProvider({ children }) {
  const flipBookRef = useRef(null)
  const [activeSection, setActiveSection] = useState(SECTIONS[0].key)

  const goToSection = useCallback((key) => {
    const targetIndex = SECTIONS.findIndex((section) => section.key === key)
    if (targetIndex === -1) return
    flipBookRef.current?.pageFlip()?.flip(targetIndex)
  }, [])

  const handleFlip = useCallback((event) => {
    const section = SECTIONS[event.data]
    if (section) setActiveSection(section.key)
  }, [])

  return (
    <NavigationContext.Provider
      value={{ activeSection, goToSection, flipBookRef, handleFlip }}
    >
      {children}
    </NavigationContext.Provider>
  )
}