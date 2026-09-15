import { useLanguageContext } from '../../../hooks/useLanguageContext'
import { translations } from '../../../i18n/translations'
import styles from './About.module.css'
import profile from '../../../../src/assets/images/profile2.png'

function About() {
  const { language } = useLanguageContext()
  return (
    <section className={styles.section}>
      <h2>{translations[language.code].nav.about}</h2>
      <img src={profile} alt="profile-pic" />
    </section>
  )
}

export default About