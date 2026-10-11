import { useEffect, useRef } from 'react'
import styles from './GhostLayer.module.css'

const TRAVEL = 3200 // ms the ghost takes to cross the screen

// Classic ghost facing left (tail on the right). Eyes are holes (evenodd).
export const GHOST_PATH =
  'M100 90 L45 90 C20 90 5 72 5 50 C5 28 20 10 45 10 L100 10 L88 22 L100 36 L88 50 L100 64 L88 78 Z ' +
  'M40 29 a6 6 0 1 0 0.01 0 Z M40 59 a6 6 0 1 0 0.01 0 Z'

// inspired by the "Ghost" CodePen
function GhostLayer({ controllerRef, running, subscribers }) {
  const layerRef = useRef(null)
  const ghostRef = useRef(null)
  const frameRef = useRef(0)

  useEffect(() => {
    const ghost = ghostRef.current
    const layer = layerRef.current
    const notify = (rect) => subscribers.forEach((fn) => fn(rect))

    const stop = () => {
      cancelAnimationFrame(frameRef.current)
      frameRef.current = 0
      ghost.style.opacity = '0'
      notify(null)
    }

    controllerRef.current = {
      play(anchor) {
        if (frameRef.current || !running) return // one pass at a time
        const start = performance.now()

        const tick = (now) => {
          const progress = Math.min((now - start) / TRAVEL, 1)
          if (progress >= 1) {
            stop()
            return
          }
          const eased = 1 - Math.pow(1 - progress, 1.6)

          const layerRect = layer.getBoundingClientRect()
          const anchorRect = anchor.getBoundingClientRect()
          const size = ghost.getBoundingClientRect().width

          const x = layerRect.width + size - eased * (layerRect.width + size * 2.4)
          const y =
            anchorRect.top - layerRect.top + anchorRect.height / 2 - size / 2 +
            Math.sin(now / 350) * 8

          ghost.style.opacity = '1'
          ghost.style.transform = `translate(${x}px, ${y}px)`
          notify(ghost.getBoundingClientRect())
          frameRef.current = requestAnimationFrame(tick)
        }

        frameRef.current = requestAnimationFrame(tick)
      },
    }

    return () => {
      controllerRef.current = null
      stop()
    }
  }, [running, controllerRef, subscribers])

  return (
    <div ref={layerRef} className={styles.layer} aria-hidden="true">
      <svg ref={ghostRef} className={styles.ghost} viewBox="0 0 100 100">
        <path d={GHOST_PATH} fillRule="evenodd" />
      </svg>
    </div>
  )
}

export default GhostLayer
