import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import SoundToggle from './components/SoundToggle'
import LanguageSelector from './components/LanguageSelector'
import ThemeToggle from './components/ThemeToggle'
import MobileMenu from './components/MobileMenu'
import { useSoundContext } from '../../../hooks/useSoundContext'
import { useLanguageContext } from '../../../hooks/useLanguageContext'
import { translations } from '../../../i18n/translations'
import { MOBILE_BREAKPOINT } from '../../../constants/breakpoints'
import styles from './Header.module.css'

const NAV_ITEMS = [
  { href: '#home', key: 'home' },
  { href: '#about', key: 'about' },
  { href: '#projects', key: 'projects' },
  { href: '#contact', key: 'contact' },
]

function Header() {
  const { language } = useLanguageContext()
  const { playMenuOpenSound, playMenuCloseSound } = useSoundContext()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const nav = translations[language.code].nav

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    const mobileQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`)

    function handleChange(event) {
      if (!event.matches) {
        setIsMobileMenuOpen(false)
      }
    }

    mobileQuery.addEventListener('change', handleChange)
    return () => mobileQuery.removeEventListener('change', handleChange)
  }, [])

  function handleMenuToggle() {
    setIsMobileMenuOpen((prev) => {
      const next = !prev
      if (next) {
        playMenuOpenSound()
      } else {
        playMenuCloseSound()
      }
      return next
    })
  }

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <p>AHª</p>
      </div>

      <nav className={styles.nav} aria-label="Navegação principal">
        <ul>
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{nav[item.key]}</a>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.actions}>
        <SoundToggle />
        <LanguageSelector />
        <ThemeToggle />
      </div>

      <button
        className={styles.menuButton}
        onClick={handleMenuToggle}
        data-no-sound
        aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
        aria-expanded={isMobileMenuOpen}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <MobileMenu
        navItems={NAV_ITEMS}
        nav={nav}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  )
}

export default Header