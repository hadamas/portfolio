import { useLanguageContext } from '../../../../hooks/useLanguageContext'
import { translations } from '../../../../i18n/translations'
import { RESUME_FILES } from '../../../../data/resumeFiles'
import styles from './ResumeButton.module.css'

function ResumeButton() {
  const { language } = useLanguageContext()
  const label = translations[language.code].resumeButton
  const href = RESUME_FILES[language.code]

  return (
    <a
      className={styles.button}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {label}
    </a>
  )
}

export default ResumeButton