import { useState, useEffect, useCallback } from 'react'
import useSound from 'use-sound'
import { SoundContext } from './SoundContext'
import buttonClickSfx from '../assets/sounds/button-click.mp3'
import menuUpSfx from '../assets/sounds/menu-up.mp3'
import menuDownSfx from '../assets/sounds/menu-down.mp3'

export function SoundProvider({ children }) {
  const [enabled, setEnabled] = useState(true)
  const [playButtonSound] = useSound(buttonClickSfx, { volume: 0.5 })
  const [playMenuUpRaw] = useSound(menuUpSfx, { volume: 0.5 })
  const [playMenuDownRaw] = useSound(menuDownSfx, { volume: 0.5 })

  const toggleEnabled = useCallback(() => setEnabled((prev) => !prev), [])

  const playMenuOpenSound = useCallback(() => {
    if (enabled) playMenuUpRaw()
  }, [enabled, playMenuUpRaw])

  const playMenuCloseSound = useCallback(() => {
    if (enabled) playMenuDownRaw()
  }, [enabled, playMenuDownRaw])

  useEffect(() => {
    function handleClick(event) {
      if (!enabled) return
      if (event.target.closest('[data-no-sound]')) return

      const isInteractive = event.target.closest(
        'button, a, [role="button"], [role="option"], [role="tab"]'
      )
      if (isInteractive) playButtonSound()
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [enabled, playButtonSound])

  return (
    <SoundContext.Provider value={{ enabled, toggleEnabled, playMenuOpenSound, playMenuCloseSound }}>
      {children}
    </SoundContext.Provider>
  )
}