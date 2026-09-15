import { useContext } from 'react'
import { NavigationContext } from '../context/NavigationContext'

export function useNavigationContext() {
  const context = useContext(NavigationContext)
  if (!context) {
    throw new Error('useNavigationContext deve ser usado dentro de um NavigationProvider')
  }
  return context
}