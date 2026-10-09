import Hero from '../../sections/Hero/Hero'
import About from '../../sections/About/About'
import Projects from '../../sections/Projects/Projects'
import Contact from '../../sections/Contact/Contact'
import ViewportSection from './ViewportSection'
import { useNavigationContext } from '../../../hooks/useNavigationContext'
import styles from './SectionStack.module.css'

const VIEWPORTS = [
  { key: 'home', Component: Hero, scrollable: false },
  { key: 'about', Component: About, scrollable: true }, // conteúdo maior que a tela
  { key: 'projects', Component: Projects, scrollable: false },
  { key: 'contact', Component: Contact, scrollable: false },
]

function SectionStack() {
  const { activeSection, isMenuOpen } = useNavigationContext()

  return (
    <div className={styles.stack}>
      {VIEWPORTS.map(({ key, Component, scrollable }) => (
        <ViewportSection
          key={key}
          id={key}
          isActive={!isMenuOpen && key === activeSection}
          scrollable={scrollable}
        >
          <Component />
        </ViewportSection>
      ))}
    </div>
  )
}

export default SectionStack
