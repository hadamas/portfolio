import { useEffect, useState } from 'react'
import { useLanguageContext } from '../../../hooks/useLanguageContext'
import { useNavigationContext } from '../../../hooks/useNavigationContext'
import { translations } from '../../../i18n/translations'
import profileVideo from '../../../assets/videos/profile-pic.mp4'
import profilePicStatic from '../../../assets/images/profile-pic-static.jpg'
import ContactLink from '../Contact/ContactLink'
import LanguageFlags from './LanguageFlags'
import StackFlowingMenu from './StackFlowingMenu/StackFlowingMenu'
import { RESUME_FILES } from '../../../data/resumeFiles'
import styles from './About.module.css'

const STACK_CATEGORIES = [
  {
    labelKey: 'stackLanguagesLabel',
    tools: [
      { name: 'JavaScript', slug: 'js' },
      { name: 'TypeScript', slug: 'ts' },
      { name: 'Python', slug: 'py' },
      { name: 'C', slug: 'c' },
      { name: 'C#', slug: 'cs' },
    ],
  },
  {
    labelKey: 'stackFrontendLabel',
    tools: [
      { name: 'React', slug: 'react' },
      { name: 'Vue', slug: 'vue' },
      { name: 'Next.js', slug: 'nextjs' },
      { name: 'HTML5', slug: 'html' },
      { name: 'Tailwind CSS', slug: 'tailwind' },
      { name: 'Bootstrap', slug: 'bootstrap' },
      { name: 'Vite', slug: 'vite' },
      { name: 'Vitest', slug: 'vitest' },
      { name: 'React Testing Library', slug: null },
      { name: 'Three.js', slug: 'threejs' },
    ],
  },
  {
    labelKey: 'stackBackendLabel',
    tools: [
      { name: 'Node.js', slug: 'nodejs' },
      { name: 'Express.js', slug: 'express' },
      { name: 'PostgreSQL', slug: 'postgres' },
      { name: 'REST APIs', slug: null },
      { name: 'RabbitMQ', slug: 'rabbitmq' },
      { name: 'DBeaver', slug: null },
      { name: 'Postman', slug: 'postman' },
      { name: 'QlikView', slug: null },
    ],
  },
  {
    labelKey: 'stackCloudLabel',
    tools: [
      { name: 'Docker', slug: 'docker' },
      { name: 'AWS', slug: 'aws' },
      { name: 'Azure DevOps', slug: 'azure' },
      { name: 'Git', slug: 'git' },
      { name: 'Linux', slug: 'linux' },
      { name: 'CI/CD', slug: null },
    ],
  },
]

function About() {
  const { language } = useLanguageContext()
  const { activeSection, isMenuOpen } = useNavigationContext()
  const about = translations[language.code].about
  const [isPlaying, setIsPlaying] = useState(false)
  // Becomes true shortly after mount so the entrance animation also plays
  // when this section is mounted already active (lazy loaded on first visit)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 50)
    return () => clearTimeout(timer)
  }, [])

  const isActive = isMounted && !isMenuOpen && activeSection === 'about'

  // mounting a fresh <video> restarts it at frame 1; it keeps looping while hovered
  const startPlaying = () => setIsPlaying(true)
  const stopPlaying = () => setIsPlaying(false)

  return (
    <section className={styles.section} data-active={isActive}>
      {/* photo + presentation text + cv button + lang*/}
      <article className={styles.card}>
        <div className={styles.cardBody}>
          <div className={`${styles.photoCol} ${styles.fromLeft}`}>
            <div className={styles.photoWrap} onMouseEnter={startPlaying} onMouseLeave={stopPlaying}>
              <img src={profilePicStatic} alt="alanis profile pic" className={styles.photo} />
              {isPlaying && (
                <video
                  className={styles.photoGif}
                  src={profileVideo}
                  poster={profilePicStatic}
                  autoPlay
                  loop
                  muted
                  playsInline
                  aria-hidden="true"
                />
              )}
            </div>
            <LanguageFlags label={about.languages} languages={about.languagesSpoken} />
          </div>

          <div className={`${styles.info} ${styles.fromRight}`}>
            <div className={styles.introRow}>
              <p className={styles.intro}>{about.intro}</p>
              <div className={styles.resume}>
                <ContactLink href={RESUME_FILES[language.code]} external icon="down">
                  {about.linkCVLabel}
                </ContactLink>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* education + experience */}
      <ul className={`${styles.timeline} ${styles.fadeUp} ${styles.delayTimeline}`}>
        {[
          ...about.educationItems.map((item) => ({ ...item, type: about.education })),
          ...about.experienceItems.map((item) => ({ ...item, type: about.experience })),
        ].map((item, index) => (
          <li key={index} className={styles.cell}>
            <span className={styles.cellType}>{item.type}</span>
            <div className={styles.cellMain}>
              <p className={styles.cellSubtitle}>{item.subtitle}</p>
              <p className={styles.cellMeta}>
                {item.title} / {item.period}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {/* stack flowing rows */}
      <div className={`${styles.row} ${styles.stackSection} ${styles.fadeUp} ${styles.delayStack}`}>
        <StackFlowingMenu
          categories={STACK_CATEGORIES.map((category) => ({
            id: category.labelKey,
            label: about[category.labelKey],
            tools: category.tools,
          }))}
        />
      </div>

    </section>
  )
}

export default About