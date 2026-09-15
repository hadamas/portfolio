import { useLanguageContext } from '../../../hooks/useLanguageContext'
import { translations } from '../../../i18n/translations'
import styles from './Projects.module.css'

function Projects() {
  const { language } = useLanguageContext()
  return (
    <section className={styles.section}>
      <h2>{translations[language.code].nav.projects}</h2>
    </section>
  )
}

export default Projects