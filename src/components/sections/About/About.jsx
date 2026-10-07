import { useLanguageContext } from '../../../hooks/useLanguageContext'
import { translations } from '../../../i18n/translations'
import profilePic from '../../../assets/images/profile-pic.jpeg'
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
  const about = translations[language.code].about
  const [firstName, ...rest] = about.name.split(' ')
  const lastName = rest.join(' ')

  return (
    <section className={styles.section}>
      {/* my name + profession + photo + presentation text */}
      <article className={styles.card}>
        <p className={styles.profession}>{about.profession}</p>

        <div className={styles.cardBody}>
          <div className={styles.photoWrap}>
            <img src={profilePic} alt="Alanis Hadama profile picture" className={styles.photo} />
          </div>

          <div className={styles.info}>
            <h1 className={styles.name}>
              <span className={styles.firstName}>{firstName}</span>
              {lastName && <span className={styles.lastName}> {lastName}</span>}
            </h1>

            <div className={styles.introRow}>
              <p className={styles.intro}>{about.intro}</p>
              <a
                className={styles.cta}
                href={RESUME_FILES[language.code]}
                target="_blank"
                rel="noreferrer"
                aria-label={about.linkCVLabel}
              >
                <span className={styles.ctaArrow} aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </article>

      {/* professional information */}
      <div className={`${styles.row} ${styles.gridRow}`}>
        <div className={styles.column}>
          <h2 className={styles.columnTitle}>{about.languages}</h2>
          <ul className={styles.list}>
            {about.languagesSpoken.map((lang) => (
              <li key={lang.name}>
                {lang.name} — {lang.level}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.column}>
          <h2 className={styles.columnTitle}>{about.education}</h2>
          <ul className={styles.list}>
            {about.educationItems.map((item, index) => (
              <li key={index}>
                <span className={styles.itemPeriod}>{item.period}</span>
                <strong>{item.title}</strong>
                <span>{item.subtitle}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.column}>
          <h2 className={styles.columnTitle}>{about.experience}</h2>
          <ul className={styles.list}>
            {about.experienceItems.map((item, index) => (
              <li key={index}>
                <span className={styles.itemPeriod}>{item.period}</span>
                <strong>{item.title}</strong>
                <span>{item.subtitle}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* stack flowing rows */}
      <div className={`${styles.row} ${styles.stackSection}`}>
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