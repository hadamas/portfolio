import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguageContext } from '../../../hooks/useLanguageContext'
import { translations } from '../../../i18n/translations'
import { PROJECTS } from '../../../data/projects'
import SectionBackground from '../../../three/SectionBackground'
import constellationModel from '../../../three/constellation.glb?url'
import ProjectCard from './ProjectCard'
import styles from './Projects.module.css'

function Projects() {
  const { language } = useLanguageContext()
  const copy = translations[language.code].projects
  const sectionTitle = translations[language.code].nav.projects

  const trackRef = useRef(null)
  const cardRefs = useRef([])
  const [activeIndex, setActiveIndex] = useState(0)

  // Observa qual card está mais visível dentro da faixa de rolagem e
  // mantém o texto da esquerda sincronizado com ele -- cobre tanto a
  // rolagem manual (arraste/trackpad) quanto os botões de seta, já que
  // ambos movem a mesma faixa.
  useEffect(() => {
    const track = trackRef.current
    const cards = cardRefs.current
    if (!track || cards.length === 0) return undefined

    const ratios = new Map()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => ratios.set(entry.target, entry.intersectionRatio))

        let bestIndex = -1
        let bestRatio = 0
        cards.forEach((card, index) => {
          const ratio = ratios.get(card) ?? 0
          if (ratio > bestRatio) {
            bestRatio = ratio
            bestIndex = index
          }
        })
        if (bestIndex !== -1) setActiveIndex(bestIndex)
      },
      { root: track, threshold: [0, 0.25, 0.5, 0.75, 1] }
    )

    cards.forEach((card) => card && observer.observe(card))
    return () => observer.disconnect()
  }, [])

  const goTo = useCallback((index) => {
    const card = cardRefs.current[index]
    card?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' })
  }, [])

  const handlePrev = () => goTo(Math.max(0, activeIndex - 1))
  const handleNext = () => goTo(Math.min(PROJECTS.length - 1, activeIndex + 1))

  const activeProject = PROJECTS[activeIndex] ?? PROJECTS[0]
  const activeText = copy.items[activeProject.id]

  return (
    <section className={styles.section}>
      <SectionBackground
        url={constellationModel}
        // pausado por enquanto -- volte enabled pra true (ou remova a linha)
        // quando formos colocar o objeto 3D definitivo desta seção
        enabled={false}
        animationSpeed={0.5}
        margin={0.3}
        ambientIntensity={0.6}
        keyLightPosition={[4, 6, 5]}
        keyLightIntensity={1.2}
        fillLightPosition={[-4, -2, -5]}
        fillLightIntensity={0.35}
        environmentPreset="city"
      />

      <div className={styles.left}>
        {/* Título da seção: fixo na metade vertical, nunca se move --
            ver Projects.module.css (.titleAnchor / .textAnchor) pro
            truque de ancorar os dois blocos em top:50% separadamente,
            em vez de centralizar o grupo inteiro como um flex. */}
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
        <div className={styles.track} ref={trackRef}>
          {PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.id}
              ref={(node) => {
                cardRefs.current[index] = node
              }}
              project={project}
              text={copy.items[project.id]}
              linkLabel={copy.linkLabel}
            />
          ))}
        </div>

        <div className={styles.controls}>
          <button
            type="button"
            className={styles.arrowButton}
            onClick={handlePrev}
            disabled={activeIndex === 0}
            aria-label={copy.prevLabel}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            className={styles.arrowButton}
            onClick={handleNext}
            disabled={activeIndex === PROJECTS.length - 1}
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
