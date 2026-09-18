import { useState } from 'react'
import { useLanguageContext } from '../../../hooks/useLanguageContext'
import { translations } from '../../../i18n/translations'
import profilePic from '../../../assets/images/profile2.png'
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
    label: 'Front-end',
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
    label: 'Back-end',
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
    label: 'Cloud & DevOps',
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
  const [activeTool, setActiveTool] = useState(null)

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
        <div className={styles.animationColumn}>
          <div className={styles.animationPlaceholder}>{about.animationPlaceholder}</div>
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

      {STACK_CATEGORIES.map((category) => {
        const label = category.labelKey ? about[category.labelKey] : category.label
        return (
          <div key={label} className={styles.stackRow}>
            <span className={styles.stackRowLabel}>{label}</span>
            <div className={styles.toolsGrid}>
              {category.tools.map((tool) => {
                const toolId = `${label}-${tool.name}`
                return (
                  <button
                    key={tool.name}
                    type="button"
                    className={`${styles.toolItem} ${
                      activeTool === toolId ? styles.toolItemActive : ''
                    }`}
                    onClick={() =>
                      setActiveTool((current) => (current === toolId ? null : toolId))
                    }
                  >
                    {tool.slug ? (
                      <img
                        src={`https://skillicons.dev/icons?i=${tool.slug}`}
                        alt={tool.name}
                        className={styles.toolIcon}
                      />
                    ) : (
                      <span className={styles.toolIconPlaceholder}>
                        {tool.name.slice(0, 2).toUpperCase()}
                      </span>
                    )}
                    <span className={styles.toolName}>{tool.name}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}

    </section>
  )
}

export default About