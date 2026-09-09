import logoLight from '../../../assets/images/logo.png'
import logoDark from '../../../assets/images/logo-dark.png'
import SoundToggle from './components/SoundToggle'
import LanguageSelector from './components/LanguageSelector'
import ThemeToggle from './components/ThemeToggle'
import { useThemeContext } from '../../../hooks/useThemeContext'
import { useLanguageContext } from '../../../hooks/useLanguageContext'
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
  const nav = translations[language.code].nav
  const logo = theme === 'dark' ? logoDark : logoLight

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
    </header>
  )
}

export default Header