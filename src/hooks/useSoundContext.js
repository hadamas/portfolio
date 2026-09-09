import { useContext } from 'react'
import { SoundContext } from '../context/SoundContext'

export function useSoundContext() {
  const context = useContext(SoundContext)
  if (!context) {
    throw new Error('useSoundContext deve ser usado dentro de um SoundProvider')
  }
  return context
}