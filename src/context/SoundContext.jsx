import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import useSound from 'use-sound'
import buttonClickSfx from '../assets/sounds/button-click.mp3'

const SoundContext = createContext(null)

export function SoundProvider({ children }) {
  const [enabled, setEnabled] = useState(true)
  const [playButtonSound] = useSound(buttonClickSfx, { volume: 0.5 })

  const toggleEnabled = useCallback(() => setEnabled((prev) => !prev), [])

  useEffect(() => {
    function handleClick(event) {
      if (!enabled) return

      const isInteractive = event.target.closest(
        'button, a, [role="button"], [role="option"], [role="tab"]'
      )
      if (isInteractive) {
        playButtonSound()
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [enabled, playButtonSound])

  return (
    <SoundContext.Provider value={{ enabled, toggleEnabled }}>
      {children}
    </SoundContext.Provider>
  )
}

export function useSoundContext() {
  const context = useContext(SoundContext)
  if (!context) {
    throw new Error('useSoundContext deve ser usado dentro de um SoundProvider')
  }
  return context
}