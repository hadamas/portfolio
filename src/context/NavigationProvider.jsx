import { useState, useCallback } from 'react'
import { NavigationContext } from './NavigationContext'
import { useSoundContext } from '../hooks/useSoundContext'
import { SECTIONS } from '../data/sections'

export function NavigationProvider({ children }) {
  const { playFlipSound } = useSoundContext()
  const [activeSection, setActiveSection] = useState(SECTIONS[0].key)

  const goToSection = useCallback(
    (key) => {
      if (key === activeSection) return
      playFlipSound()
      setActiveSection(key)
    },
    [activeSection, playFlipSound]
  )

  return (
    <NavigationContext.Provider value={{ activeSection, goToSection }}>
      {children}
    </NavigationContext.Provider>
  )
}