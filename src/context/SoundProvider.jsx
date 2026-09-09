import { useState, useEffect, useCallback } from 'react'
import useSound from 'use-sound'
import { SoundContext } from './SoundContext'
import buttonClickSfx from '../assets/sounds/button-click.mp3'

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
      if (isInteractive) playButtonSound()
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