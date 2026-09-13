import { useLanguageContext } from '../../../hooks/useLanguageContext'
import { translations } from '../../../i18n/translations'
import styles from './Footer.module.css'

function Footer() {
  const { language } = useLanguageContext()
  const year = new Date().getFullYear()
  const copyrightLabel = translations[language.code].footer.copyright

  return (
    <footer className={styles.footer}>
      <p className={styles.logo}>AHª</p>
      <p className={styles.copyright}>
        © {year} Alanis Hadama. {copyrightLabel}
      </p>
    </footer>
  )
}

export default Footer