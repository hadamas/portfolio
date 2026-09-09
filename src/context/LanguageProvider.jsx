import { useState, useCallback } from 'react'
import { LanguageContext } from './LanguageContext'
import { LANGUAGES } from '../data/languages'

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(LANGUAGES[0])
  const selectLanguage = useCallback((lang) => setLanguage(lang), [])

  return (
    <LanguageContext.Provider value={{ language, selectLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}