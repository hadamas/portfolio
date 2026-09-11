import logoLight from '../../../assets/images/logo.png'
import logoDark from '../../../assets/images/logo-dark.png'
import { useThemeContext } from '../../../hooks/useThemeContext'
import { useLanguageContext } from '../../../hooks/useLanguageContext'
import { translations } from '../../../i18n/translations'
import styles from './Footer.module.css'

function Footer() {
  const { theme } = useThemeContext()
  const { language } = useLanguageContext()
  const logo = theme === 'dark' ? logoDark : logoLight
  const year = new Date().getFullYear()
  const copyrightLabel = translations[language.code].footer.copyright

  return (
    <footer className={styles.footer}>
      <img className={styles.logo} src={logo} alt="alanis-logo" />
      <p className={styles.copyright}>
        © {year} Alanis Hadama. {copyrightLabel}
      </p>
    </footer>
  )
}

export default Footer