import { useState } from 'react'
import { useLanguageContext } from '../../../hooks/useLanguageContext'
import { translations } from '../../../i18n/translations'
import styles from './Hero.module.css'

function Hero() {
  const { language } = useLanguageContext()
  const [isVisible, setIsVisible] = useState(true)
  const hero = translations[language.code].hero

  return (
    <section className={styles.hero}>
      {/* espaço reservado pra futura animação de fundo (vídeo ou Three.js) */}

      {isVisible && (
        <div className={styles.textBlock}>
          <button
            type="button"
            className={styles.deleteButton}
            onClick={() => setIsVisible(false)}
          >
            {hero.delete}
          </button>
          <h1 className={styles.title}>{hero.title}</h1>
          <p className={styles.subtitle}>{hero.subtitle}</p>
        </div>
      )}
    </section>
  )
}

export default Hero