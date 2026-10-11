import { useLanguageContext } from '../../../hooks/useLanguageContext'
import { useNavigationContext } from '../../../hooks/useNavigationContext'
import { translations } from '../../../i18n/translations'
import { EMAIL, SOCIALS } from '../../../data/contacts'
import ContactLink from './ContactLink'
import styles from './Contact.module.css'

function Contact() {
  const { language } = useLanguageContext()
  const { activeSection, isMenuOpen } = useNavigationContext()
  const t = translations[language.code]
  const isActive = !isMenuOpen && activeSection === 'contact'

  return (
    <section className={styles.section} data-active={isActive}>
      <div className={styles.group}>
        <h2 className={`${styles.title} ${styles.reveal}`} style={{ '--d': '0.1s' }}>{t.nav.contact}</h2>

        <div className={styles.blocks}>
          <div className={`${styles.block} ${styles.reveal}`} style={{ '--d': '0.25s' }}>
            <h3 className={styles.label}>{t.contact.emailLabel}</h3>
            <ul className={styles.list}>
              <li>
                <ContactLink href={`mailto:${EMAIL}`}>{EMAIL}</ContactLink>
              </li>
            </ul>
          </div>

          <div className={`${styles.block} ${styles.reveal}`} style={{ '--d': '0.4s' }}>
            <h3 className={styles.label}>{t.contact.socialLabel}</h3>
            <ul className={styles.list}>
              {SOCIALS.map((social) => (
                <li key={social.id}>
                  <ContactLink
                    href={
                      typeof social.href === 'function'
                        ? social.href(language.code)
                        : social.href
                    }
                    external
                  >
                    {social.name}
                  </ContactLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
