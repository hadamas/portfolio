import { useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguageContext } from '../../../hooks/useLanguageContext'
import { translations } from '../../../i18n/translations'
import { PROJECTS } from '../../../data/projects'
import DepthCarousel from './DepthCarousel'
import ProjectCard from './ProjectCard'
import styles from './Projects.module.css'

function Projects() {
  const { language } = useLanguageContext()
  const copy = translations[language.code].projects
  const sectionTitle = translations[language.code].nav.projects

  const carouselRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const activeProject = PROJECTS[activeIndex] ?? PROJECTS[0]
  const activeText = copy.items[activeProject.id]

  return (
    <section className={styles.section}>

      <div className={styles.left}>
        <div className={styles.titleAnchor}>
          <h2 className={styles.title}>{sectionTitle}</h2>
        </div>

        <div className={styles.textAnchor}>
          <div key={activeProject.id} className={styles.textInner}>
            <p className={styles.description}>{activeText.description}</p>
          </div>
        </div>
      </div>

      <div className={styles.right}>
        <DepthCarousel
          ref={carouselRef}
          items={PROJECTS}
          onChange={setActiveIndex}
          renderItem={(project) => (
            <ProjectCard
              project={project}
              text={copy.items[project.id]}
              linkLabel={copy.linkLabel}
            />
          )}
        />

        <div className={styles.controls}>
          <button
            type="button"
            className={styles.arrowButton}
            onClick={() => carouselRef.current?.prev()}
            aria-label={copy.prevLabel}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            className={styles.arrowButton}
            onClick={() => carouselRef.current?.next()}
            aria-label={copy.nextLabel}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  )
}

export default Projects
