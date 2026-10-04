import { useLanguageContext } from '../../../hooks/useLanguageContext'
import { translations } from '../../../i18n/translations'
import profilePic from '../../../assets/images/profile-pic.jpeg'
import StackFlowingMenu from './StackFlowingMenu/StackFlowingMenu'
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

  return (
    <section className={styles.section}>
      {/* Title + Subtitle */}
      <div className={styles.row}>
        <div className={styles.nameBlock}>
          <h1 className={styles.name}>{about.name}</h1>
          <p className={styles.profession}>{about.profession}</p>
        </div>
      </div>

      {/* Fileira 2 — foto / apresentação / espaço da animação 3D */}
      <div className={`${styles.row} ${styles.introRow}`}>
        <div className={styles.profilePic}>
          <img src={profilePic} alt="Alanis Hadama profile picture" className={styles.photo} />
        </div>
        <div className={styles.introColumn}>
          <p>{about.intro}</p>
        </div>
      </div>

      {/* Professional Information */}
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

      <div className={`${styles.row} ${styles.stackSection}`}>
        <h2 className={styles.columnTitle}>{about.stack}</h2>
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