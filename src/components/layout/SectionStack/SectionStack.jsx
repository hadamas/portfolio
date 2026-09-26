import Hero from '../../sections/Hero/Hero'
import About from '../../sections/About/About'
import Projects from '../../sections/Projects/Projects'
import Contact from '../../sections/Contact/Contact'
import styles from './SectionStack.module.css'

function SectionStack() {
  return (
    <div className={styles.stack}>
      <div id="home" className={styles.section}>
        <Hero />
      </div>
      <div id="about" className={styles.section}>
        <About />
      </div>
      <div id="projects" className={styles.section}>
        <Projects />
      </div>
      <div id="contact" className={styles.section}>
        <Contact />
      </div>
    </div>
  )
}

export default SectionStack