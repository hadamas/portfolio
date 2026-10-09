import { useLanguageContext } from '../../../hooks/useLanguageContext'
import { useNavigationContext } from '../../../hooks/useNavigationContext'
import { translations } from '../../../i18n/translations'
import { SECTIONS } from '../../../data/sections'
import styles from './NavMenu.module.css'

// menu "screen": opens inside the frame, with nav links
// starting at the right half. the header stays on top, so its menu button closes it
function NavMenu() {
  const { language } = useLanguageContext()
  const { activeSection, goToSection, isMenuOpen } = useNavigationContext()
  const nav = translations[language.code].nav

  return (
    <div
      id="site-menu"
      className={styles.menu}
      data-open={isMenuOpen}
      inert={!isMenuOpen}
    >
      <nav className={styles.nav} aria-label="Menu">
        <ul>
          {SECTIONS.map((item) => (
            <li key={item.key}>
              <button
                type="button"
                className={styles.link}
                aria-current={item.key === activeSection ? 'page' : undefined}
                onClick={() => goToSection(item.key)}
              >
                {nav[item.key]}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default NavMenu
