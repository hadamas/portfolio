import { useState, useRef, useEffect } from 'react'
import { Globe } from 'lucide-react'
import styles from './LanguageSelector.module.css'

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'pt', label: 'Português' },
  { code: 'fr', label: 'Français' },
  { code: 'jp', label: '日本語' },
]

function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState('en')
  const containerRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className={styles.wrapper} ref={containerRef}>
      <button
        className={styles.toggle}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Selecionar idioma"
        aria-expanded={isOpen}
      >
        <Globe size={20} />
      </button>

      {isOpen && (
        <ul className={styles.dropdown} role="listbox">
          {LANGUAGES.map((lang) => (
            <li key={lang.code}>
              <button
                className={styles.option}
                role="option"
                aria-selected={selected === lang.code}
                onClick={() => {
                  setSelected(lang.code)
                  setIsOpen(false)
                }}
              >
                {lang.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default LanguageSelector