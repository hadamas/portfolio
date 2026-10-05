import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import styles from './StackFlowingMenu.module.css'

function StackFlowingMenu({ categories }) {
  return (
    <div className={styles.menuWrap}>
      <nav className={styles.menu}>
        {categories.map(({ id, ...category }) => (
          <StackMenuRow key={id} {...category} />
        ))}
      </nav>
    </div>
  )
}

function StackMenuRow({ label, tools }) {
  const itemRef = useRef(null)
  const marqueeRef = useRef(null)
  const marqueeInnerRef = useRef(null)
  const animationRef = useRef(null)
  const [repetitions, setRepetitions] = useState(4)
  const [isActive, setIsActive] = useState(false)

  const animationDefaults = { duration: 0.6, ease: 'expo' }

  function findClosestEdge(mouseX, mouseY, width, height) {
    const topEdgeDist = distMetric(mouseX, mouseY, width / 2, 0)
    const bottomEdgeDist = distMetric(mouseX, mouseY, width / 2, height)
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom'
  }

  function distMetric(x, y, x2, y2) {
    const xDiff = x - x2
    const yDiff = y - y2
    return xDiff * xDiff + yDiff * yDiff
  }

  useEffect(() => {
    function calculateRepetitions() {
      if (!marqueeInnerRef.current) return
      const content = marqueeInnerRef.current.querySelector(`.${styles.marqueePart}`)
      if (!content) return

      const contentWidth = content.offsetWidth
      if (contentWidth === 0) return
      const needed = Math.ceil(window.innerWidth / contentWidth) + 2
      setRepetitions(Math.max(4, needed))
    }

    calculateRepetitions()
    window.addEventListener('resize', calculateRepetitions)
    return () => window.removeEventListener('resize', calculateRepetitions)
  }, [tools])

  useEffect(() => {
    function setupMarquee() {
      if (!marqueeInnerRef.current) return
      const content = marqueeInnerRef.current.querySelector(`.${styles.marqueePart}`)
      if (!content) return

      const contentWidth = content.offsetWidth
      if (contentWidth === 0) return

      animationRef.current?.kill()
      animationRef.current = gsap.to(marqueeInnerRef.current, {
        x: -contentWidth,
        duration: 15,
        ease: 'none',
        repeat: -1,
      })
    }

    const timer = setTimeout(setupMarquee, 50)
    return () => {
      clearTimeout(timer)
      animationRef.current?.kill()
    }
  }, [tools, repetitions])

  function revealFrom(clientX, clientY) {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return
    const rect = itemRef.current.getBoundingClientRect()
    const edge = findClosestEdge(clientX - rect.left, clientY - rect.top, rect.width, rect.height)

    gsap
      .timeline({ defaults: animationDefaults })
      .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' }, 0)
  }

  function hideFrom(clientX, clientY) {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return
    const rect = itemRef.current.getBoundingClientRect()
    const edge = findClosestEdge(clientX - rect.left, clientY - rect.top, rect.width, rect.height)

    gsap
      .timeline({ defaults: animationDefaults })
      .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
  }

  function handleMouseEnter(event) {
    if (isActive) return
    revealFrom(event.clientX, event.clientY)
  }

  function handleMouseLeave(event) {
    if (isActive) return
    hideFrom(event.clientX, event.clientY)
  }

  function handleClick(event) {
    setIsActive((current) => {
      const next = !current
      if (next) {
        revealFrom(event.clientX, event.clientY)
      } else {
        hideFrom(event.clientX, event.clientY)
      }
      return next
    })
  }

  const iconSet = tools.map((tool) => ({ ...tool, key: tool.slug ?? tool.name }))

  return (
    <div className={styles.menuItem} ref={itemRef}>
      <button
        type="button"
        className={styles.menuItemLink}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        aria-pressed={isActive}
      >
        {label}
      </button>
      <div className={styles.marquee} ref={marqueeRef}>
        <div className={styles.marqueeInnerWrap}>
          <div className={styles.marqueeInner} ref={marqueeInnerRef} aria-hidden="true">
            {[...Array(repetitions)].map((_, repIndex) => (
              <div className={styles.marqueePart} key={repIndex}>
                {iconSet.map((tool) => (
                  <span key={tool.key} className={styles.iconBadge} title={tool.name}>
                    {tool.slug ? (
                      <img
                        src={`https://skillicons.dev/icons?i=${tool.slug}`}
                        alt={tool.name}
                        className={styles.icon}
                        loading="lazy"
                      />
                    ) : (
                      <span className={styles.iconFallback}>{tool.name.slice(0, 2).toUpperCase()}</span>
                    )}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StackFlowingMenu
