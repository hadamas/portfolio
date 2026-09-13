import { useState } from 'react'
import { useLanguageContext } from '../../../hooks/useLanguageContext'  
import { useTypewriter } from '../../../hooks/useTypewriter'
import { translations } from '../../../i18n/translations'
import styles from './Hero.module.css'

function Hero() {
  const { language } = useLanguageContext()
  const [isVisible, setIsVisible] = useState(true)
  const hero = translations[language.code].hero

  const title = useTypewriter(hero.title, {
    speed: 70,
    enabled: isVisible,
  })

  const subtitle = useTypewriter(hero.subtitle, {
    speed: 40,
    enabled: isVisible && title.isDone,
  })

  if (!isVisible) {
    return <section className={styles.hero} />
  }

  return (
    <section className={styles.hero}>
      <div className={styles.textBlock}>
        <button
          type="button"
          className={styles.deleteButton}
          onClick={() => setIsVisible(false)}
        >
          {hero.delete}
        </button>

        <h1 className={styles.title}>
          <span aria-hidden="true">
            {title.displayedText}
            {!title.isDone && <span className={styles.cursor} />}
          </span>
          {!title.isDone && <span className="sr-only">{hero.title}</span>}
        </h1>

        <p className={styles.subtitle}>
          <span aria-hidden="true">
            {subtitle.displayedText}
            {title.isDone && !subtitle.isDone && <span className={styles.cursor} />}
          </span>
          {!subtitle.isDone && <span className="sr-only">{hero.subtitle}</span>}
        </p>
      </div>
    </section>
  )
}

export default Hero