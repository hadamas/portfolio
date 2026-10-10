import { useState } from 'react'
import { Image as ImageIcon } from 'lucide-react'
import { useLanguageContext } from '../../../hooks/useLanguageContext'
import { translations } from '../../../i18n/translations'
import { PROJECTS } from '../../../data/projects'
import styles from './Projects.module.css'

// 'YYYY-MM' -> 'MM.YYYY'
function formatDate(date) {
  const [year, month] = date.split('-')
  return `${month}.${year}`
}

function Projects() {
  const { language } = useLanguageContext()
  const copy = translations[language.code].projects
  const sectionTitle = translations[language.code].nav.projects

  const [activeId, setActiveId] = useState(PROJECTS[0].id)
  // Last active project, kept visible under the new one while it fades in
  const [prevId, setPrevId] = useState(null)
  // Touch devices have no hover: a tap on the media toggles the description
  const [infoOpen, setInfoOpen] = useState(false)

  const select = (id) => {
    if (id !== activeId) {
      setPrevId(activeId)
      setActiveId(id)
    }
    setInfoOpen(false)
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.srOnly}>{sectionTitle}</h2>

      {/* Left: media of the selected project */}
      <div
        className={`${styles.stage} ${infoOpen ? styles.stageOpen : ''}`}
        onClick={() => setInfoOpen((open) => !open)}
      >
        {PROJECTS.map((project) => {
          const { media } = project
          const isActive = project.id === activeId
          const isPrev = project.id === prevId
          const text = copy.items[project.id]

          return (
            <div
              key={project.id}
              className={`${styles.slide} ${isActive ? styles.slideActive : ''} ${isPrev ? styles.slidePrev : ''}`}
              aria-hidden={!isActive}
            >
              <div className={styles.media}>
                {media?.type === 'video' ? (
                  (isActive || isPrev) && (
                    <video className={styles.mediaEl} src={media.src} autoPlay muted loop playsInline />
                  )
                ) : media?.type === 'image' ? (
                  <img className={styles.mediaEl} src={media.src} alt="" />
                ) : (
                  <div className={styles.placeholder}>
                    <ImageIcon size={32} strokeWidth={1.25} />
                  </div>
                )}
              </div>

              <div className={styles.info}>
                <p className={styles.description}>{text.description}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Right: scrollable project list */}
      <ul className={styles.list}>
        {PROJECTS.map((project) => {
          const text = copy.items[project.id]
          const isActive = project.id === activeId

          return (
            <li
              key={project.id}
              className={`${styles.item} ${isActive ? styles.itemActive : ''}`}
              onMouseEnter={() => select(project.id)}
              onFocus={() => select(project.id)}
              onClick={() => select(project.id)}
            >
              {project.link ? (
                <a
                  className={styles.itemTitle}
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  {text.title}
                </a>
              ) : (
                <span className={styles.itemTitle} tabIndex={0}>{text.title}</span>
              )}
              <span className={styles.itemMeta}>
                {formatDate(project.date)} | {text.category}
              </span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default Projects
