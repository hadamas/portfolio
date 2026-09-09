import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'

export function useThemeContext() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useThemeContext deve ser usado dentro de um ThemeProvider')
  }
  return context
}