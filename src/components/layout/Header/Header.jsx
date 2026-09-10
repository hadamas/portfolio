import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import logoLight from '../../../assets/images/logo.png'
import logoDark from '../../../assets/images/logo-dark.png'
import SoundToggle from './components/SoundToggle'
import LanguageSelector from './components/LanguageSelector'
import ThemeToggle from './components/ThemeToggle'
import MobileMenu from './components/MobileMenu'
import { useLanguageContext } from '../../../hooks/useLanguageContext'
import { useThemeContext } from '../../../hooks/useThemeContext'
import { translations } from '../../../i18n/translations'
import styles from './Header.module.css'

const NAV_ITEMS = [
  { href: '#home', key: 'home' },
  { href: '#about', key: 'about' },
  { href: '#projects', key: 'projects' },
  { href: '#contact', key: 'contact' },
]

function Header() {
  const { language } = useLanguageContext()
  const { theme } = useThemeContext()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const nav = translations[language.code].nav
  const logo = theme === 'dark' ? logoDark : logoLight

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={logo} alt="alanis-logo" />
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
        onClick={() => setIsMobileMenuOpen((prev) => !prev)}
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