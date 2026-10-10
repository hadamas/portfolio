import SoundToggle from './components/SoundToggle'
import LanguageSelector from './components/LanguageSelector'
import ThemeToggle from './components/ThemeToggle'
import MenuButton from './components/MenuButton'
import TextHoverEffect from './components/TextHoverEffect'
import { useSoundContext } from '../../../hooks/useSoundContext'
import { useNavigationContext } from '../../../hooks/useNavigationContext'
import styles from './Header.module.css'

const LOGO_TEXT = 'Hadi.'

function Header() {
  const { playMenuOpenSound, playMenuCloseSound } = useSoundContext()
  const { goToSection, isMenuOpen, toggleMenu } = useNavigationContext()

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
        aria-label={LOGO_TEXT}
      >
        <TextHoverEffect text={LOGO_TEXT} />
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
