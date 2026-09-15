import { useState, useEffect, useCallback } from 'react'
import useSound from 'use-sound'
import { SoundContext } from './SoundContext'
import buttonClickSfx from '../assets/sounds/button-click.mp3'
import menuUpSfx from '../assets/sounds/menu-up.mp3'
import menuDownSfx from '../assets/sounds/menu-down.mp3'
import typeSfx from '../assets/sounds/type.mp3'
import flipPageSfx from '../assets/sounds/flip-page.mp3'

export function SoundProvider({ children }) {
  const [enabled, setEnabled] = useState(true)

  const [playButtonSound] = useSound(buttonClickSfx, { volume: 0.5 })
  const toggleEnabled = useCallback(() => setEnabled((prev) => !prev), [])

  const [playMenuUpRaw] = useSound(menuUpSfx, { volume: 0.5 })
  const playMenuOpenSound = useCallback(() => {
    if (enabled) playMenuUpRaw()
  }, [enabled, playMenuUpRaw])

  const [playMenuDownRaw] = useSound(menuDownSfx, { volume: 0.5 })
  const playMenuCloseSound = useCallback(() => {
    if (enabled) playMenuDownRaw()
  }, [enabled, playMenuDownRaw])

  const [playTypeRaw] = useSound(typeSfx, { volume: 0.3 })
  const playTypeSound = useCallback(() => {
    if (enabled) playTypeRaw()
  }, [enabled, playTypeRaw])

  const [playFlipRaw] = useSound(flipPageSfx, { volume: 0.5 })
  const playFlipSound = useCallback(() => {
    if (enabled) playFlipRaw()
  }, [enabled, playFlipRaw])

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
    <SoundContext.Provider 
      value={{ 
        enabled, 
        toggleEnabled, 
        playMenuOpenSound, 
        playMenuCloseSound, 
        playTypeSound, 
        playFlipSound
      }}
    >
      {children}
    </SoundContext.Provider>
  )
}