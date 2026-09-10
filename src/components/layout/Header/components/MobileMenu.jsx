import SoundToggle from './SoundToggle'
import LanguageSelector from './LanguageSelector'
import ThemeToggle from './ThemeToggle'
import ResumeButton from './ResumeButton'
import styles from './MobileMenu.module.css'

function MobileMenu({ navItems, nav, isOpen, onClose }) {
  return (
    <>
      <div
        className={`${styles.backdrop} ${isOpen ? styles.backdropOpen : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={`${styles.panel} ${isOpen ? styles.panelOpen : ''}`}
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        <nav className={styles.nav} aria-label="Navegação mobile">
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={onClose}>
                  {nav[item.key]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <SoundToggle />
          <LanguageSelector />
          <ThemeToggle />
        </div>

        <ResumeButton />
      </div>
    </>
  )
}

export default MobileMenu