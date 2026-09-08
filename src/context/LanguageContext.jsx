import { createContext, useContext, useState, useCallback } from 'react'

export const LANGUAGES = [
  { code: 'en', native: 'English', names: { en: 'English', pt: 'Inglês', fr: 'Anglais', ja: '英語' } },
  { code: 'pt', native: 'Português', names: { en: 'Portuguese', pt: 'Português', fr: 'Portugais', ja: 'ポルトガル語' } },
  { code: 'fr', native: 'Français', names: { en: 'French', pt: 'Francês', fr: 'Français', ja: 'フランス語' } },
  { code: 'ja', native: '日本語', names: { en: 'Japanese', pt: 'Japonês', fr: 'Japonais', ja: '日本語' } },
]

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(LANGUAGES[0])

  const selectLanguage = useCallback((lang) => setLanguage(lang), [])

  return (
    <LanguageContext.Provider value={{ language, selectLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguageContext() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguageContext deve ser usado dentro de um LanguageProvider')
  }
  return context
}