import { useLanguageContext } from '../../../hooks/useLanguageContext'
import { translations } from '../../../i18n/translations'
import styles from './Contact.module.css'

function Contact() {
  const { language } = useLanguageContext()
  return (
    <section className={styles.section}>
      <h2>{translations[language.code].nav.contact}</h2>
    </section>
  )
}

export default Contact