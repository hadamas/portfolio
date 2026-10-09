import SoundToggle from './components/SoundToggle'
import LanguageSelector from './components/LanguageSelector'
import ThemeToggle from './components/ThemeToggle'
import MenuButton from './components/MenuButton'
import { useSoundContext } from '../../../hooks/useSoundContext'
import { useLanguageContext } from '../../../hooks/useLanguageContext'
import { useNavigationContext } from '../../../hooks/useNavigationContext'
import { translations } from '../../../i18n/translations'
import styles from './Header.module.css'

function Header() {
  const { language } = useLanguageContext()
  const { playMenuOpenSound, playMenuCloseSound } = useSoundContext()
  const { goToSection, isMenuOpen, toggleMenu } = useNavigationContext()

  const { name } = translations[language.code].about
  const [firstName, ...rest] = name.split(' ')
  const lastName = rest.join(' ')

  function handleMenuToggle() {
    if (isMenuOpen) {
      playMenuCloseSound()
    } else {
      playMenuOpenSound()
    }
    toggleMenu()
  }

  return (
    <header className={styles.header}>
      <button
        type="button"
        className={styles.logo}
        onClick={() => goToSection('home')}
        aria-label={name}
      >
        <span aria-hidden="true">{firstName}</span>
        {lastName && <span aria-hidden="true">{lastName}</span>}
      </button>

      <div className={styles.controls}>
        <div className={styles.actions}>
          <SoundToggle />
          <LanguageSelector />
          <ThemeToggle />
        </div>

        <MenuButton
          isOpen={isMenuOpen}
          onClick={handleMenuToggle}
          label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
        />
      </div>
    </header>
  )
}

export default Header
