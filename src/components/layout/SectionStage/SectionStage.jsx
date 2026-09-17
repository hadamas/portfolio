import { useNavigationContext } from '../../../hooks/useNavigationContext'
import Hero from '../../sections/Hero/Hero'
import About from '../../sections/About/About'
import Projects from '../../sections/Projects/Projects'
import Contact from '../../sections/Contact/Contact'
import styles from './SectionStage.module.css'

const SECTION_COMPONENTS = {
  home: Hero,
  about: About,
  projects: Projects,
  contact: Contact,
}

function SectionStage() {
  const { activeSection } = useNavigationContext()
  const ActiveComponent = SECTION_COMPONENTS[activeSection]

  return (
    <div className={styles.stage}>
      <ActiveComponent />
    </div>
  )
}

export default SectionStage