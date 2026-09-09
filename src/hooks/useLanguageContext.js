import { useContext } from 'react'
import { LanguageContext } from '../context/LanguageContext'

export function useLanguageContext() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguageContext deve ser usado dentro de um LanguageProvider')
  }
  return context
}