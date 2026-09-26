import { useCallback } from 'react'
import { NavigationContext } from './NavigationContext'

export function NavigationProvider({ children }) {
  const goToSection = useCallback((key) => {
    document.getElementById(key)?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <NavigationContext.Provider value={{ goToSection }}>
      {children}
    </NavigationContext.Provider>
  )
}