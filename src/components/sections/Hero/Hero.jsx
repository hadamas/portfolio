import { useEffect, useState } from 'react'
import { useLanguageContext } from '../../../hooks/useLanguageContext'
import { useNavigationContext } from '../../../hooks/useNavigationContext'
import { translations } from '../../../i18n/translations'
import { parseOutlineMarkup } from '../../../utils/outlineMarkup'
import ContactLink from '../Contact/ContactLink'
import OutlineWord from './OutlineWord'
import styles from './Hero.module.css'

// Splits the segments at every "\n" so each line can be animated on its own
function splitLines(segments) {
  const lines = [[]]
  segments.forEach((segment) => {
    segment.text.split('\n').forEach((part, index) => {
      if (index > 0) lines.push([])
      if (part) lines[lines.length - 1].push({ ...segment, text: part })
    })
  })
  return lines
}

// Each element sits inside a clipping box and slides in/out of it.
// `order` staggers the elements (see --i in the CSS).
function Reveal({ order, children }) {
  return (
    <span className={styles.reveal} style={{ '--i': order }}>
      <span className={styles.revealInner}>{children}</span>
    </span>
  )
}

function Hero() {
  const { language } = useLanguageContext()
  const { activeSection, isMenuOpen, goToSection } = useNavigationContext()
  const [isVisible, setIsVisible] = useState(true)
  // Becomes true one frame after mount so the first load also animates in
  const [isMounted, setIsMounted] = useState(false)
  const hero = translations[language.code].hero

  useEffect(() => {
    // A timer (not requestAnimationFrame) so it also runs in background tabs
    const timer = setTimeout(() => setIsMounted(true), 50)
    return () => clearTimeout(timer)
  }, [])

  const isActive = isMounted && !isMenuOpen && activeSection === 'home'

  // [[...]] in the title marks the parts rendered as outline
  const { segments: titleSegments, plain: titlePlain } = parseOutlineMarkup(hero.title)
  const titleLines = splitLines(titleSegments)

  if (!isVisible) {
    return <section className={styles.hero} />
  }

  return (
    <section className={styles.hero} data-active={isActive}>
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
            {titleLines.map((line, lineIndex) => (
              <Reveal key={lineIndex} order={lineIndex}>
                {line.map((segment, index) =>
                  segment.outline ? (
                    <OutlineWord key={index} text={segment.text} />
                  ) : (
                    <span key={index}>{segment.text}</span>
                  ),
                )}
              </Reveal>
            ))}
          </span>
          <span className="sr-only">{titlePlain}</span>
        </h1>

        <p className={styles.subtitle}>
          <Reveal order={titleLines.length}>{hero.subtitle}</Reveal>
        </p>

        <nav className={styles.links}>
          <Reveal order={titleLines.length + 1}>
            <span className={styles.linksRow}>
              <ContactLink
                href="#projects"
                icon="right"
                onClick={(e) => { e.preventDefault(); goToSection('projects') }}
              >
                {hero.projectsLink}
              </ContactLink>
              <ContactLink
                href="#about"
                icon="right"
                onClick={(e) => { e.preventDefault(); goToSection('about') }}
              >
                {hero.aboutLink}
              </ContactLink>
            </span>
          </Reveal>
        </nav>
      </div>
    </section>
  )
}

export default Hero
