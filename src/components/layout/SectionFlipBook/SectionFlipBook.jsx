import HTMLFlipBook from 'react-pageflip-enhanced'
import { useNavigationContext } from '../../../hooks/useNavigationContext'
import { useSoundContext } from '../../../hooks/useSoundContext'
import { useElementSize } from '../../../hooks/useElementSize'
import Hero from '../../sections/Hero/Hero'
import About from '../../sections/About/About'
import Projects from '../../sections/Projects/Projects'
import Contact from '../../sections/Contact/Contact'
import styles from './SectionFlipBook.module.css'

function SectionFlipBook() {
  const { flipBookRef, handleFlip } = useNavigationContext()
  const { playFlipSound } = useSoundContext()
  const [wrapperRef, size] = useElementSize()

  function onFlip(event) {
    playFlipSound()
    handleFlip(event)
  }

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      {size.width > 0 && size.height > 0 && (
        <HTMLFlipBook
          ref={flipBookRef}
          width={size.width}
          height={size.height}
          size="fixed"
          singlePage
          showCover={false}
          drawShadow
          maxShadowOpacity={0.3}
          onFlip={onFlip}
        >
          <div className={styles.page}>
            <Hero />
          </div>
          <div className={styles.page}>
            <About />
          </div>
          <div className={styles.page}>
            <Projects />
          </div>
          <div className={styles.page}>
            <Contact />
          </div>
        </HTMLFlipBook>
      )}
    </div>
  )
}

export default SectionFlipBook