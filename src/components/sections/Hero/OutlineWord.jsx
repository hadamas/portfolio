import { useContext, useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { GhostContext } from './GhostContext'
import { GHOST_PATH } from './GhostLayer'
import styles from './OutlineWord.module.css'

// Outline-only word with a rainbow gradient revealed under the cursor.
// surrounding text: a hidden span gives the layout size and an SVG is drawn on top.
function OutlineWord({ text }) {
  const uid = useId().replace(/:/g, '')
  const wordRef = useRef(null)
  const sizerRef = useRef(null)
  const svgRef = useRef(null)
  const ghostMaskRef = useRef(null)
  const ghost = useContext(GhostContext)
  const maskGradientRef = useRef(null)
  const [box, setBox] = useState({ w: 0, h: 0, fontSize: 16 })
  const [hovered, setHovered] = useState(false)

  // Read the real size of the text (it changes with the responsive font-size
  // and when the web font finishes loading).
  useLayoutEffect(() => {
    const el = sizerRef.current
    const measure = () =>
      setBox({
        w: el.offsetWidth,
        h: el.offsetHeight,
        fontSize: parseFloat(getComputedStyle(el).fontSize),
      })
    measure()

    // Observe the wrapper: ResizeObserver never reports size changes of a
    // plain inline element (like the sizer span), so observing it would miss
    // the font swap and leave a stale size (the word then overlaps its neighbours).
    const observer = new ResizeObserver(measure)
    observer.observe(wordRef.current)

    // Safety net: measure again once the fonts are ready
    let cancelled = false
    document.fonts?.ready.then(() => {
      if (!cancelled) measure()
    })

    return () => {
      cancelled = true
      observer.disconnect()
    }
  }, [text])

  // Follow the ghost: its silhouette (in this word's coordinates) is the mask
  // of the "contrast" layer, so the letters flip colour only where it passes.
  useEffect(() => {
    if (!ghost) return undefined
    return ghost.subscribe((rect) => {
      const group = ghostMaskRef.current
      const svg = svgRef.current
      if (!group || !svg) return
      if (!rect) {
        group.setAttribute('transform', 'translate(-9999 -9999)')
        return
      }
      const word = svg.getBoundingClientRect()
      group.setAttribute(
        'transform',
        `translate(${rect.left - word.left} ${rect.top - word.top}) scale(${rect.width / 100})`,
      )
    })
  }, [ghost, box.w])

  useEffect(() => () => gsap.killTweensOf(maskGradientRef.current), [])

  const moveMask = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    gsap.to(maskGradientRef.current, {
      attr: { cx: e.clientX - rect.left, cy: e.clientY - rect.top },
      duration: 0.15,
      ease: 'power2.out',
    })
  }

  const { w, h, fontSize } = box

  return (
    <span ref={wordRef} className={styles.word}>
      <span ref={sizerRef} className={styles.sizer}>{text}</span>

      {w > 0 && (
        <svg
          ref={svgRef}
          className={styles.svg}
          viewBox={`0 0 ${w} ${h}`}
          aria-hidden="true"
          onMouseEnter={() => {
            setHovered(true)
            ghost?.trigger(svgRef.current)
          }}
          onMouseLeave={() => setHovered(false)}
          onMouseMove={moveMask}
        >
          <defs>
            <linearGradient id={`${uid}-gradient`} gradientUnits="userSpaceOnUse" x1="0" x2={w} y1="0" y2="0">
              {hovered && (
                <>
                  <stop offset="0%" stopColor="#eab308" />
                  <stop offset="25%" stopColor="#ef4444" />
                  <stop offset="50%" stopColor="#3b82f6" />
                  <stop offset="75%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </>
              )}
            </linearGradient>
            <radialGradient
              id={`${uid}-reveal`}
              ref={maskGradientRef}
              gradientUnits="userSpaceOnUse"
              r={Math.max(h * 1.4, 60)}
              cx={w / 2}
              cy={h / 2}
            >
              <stop offset="0%" stopColor="white" />
              <stop offset="100%" stopColor="black" />
            </radialGradient>
            <mask id={`${uid}-ghost`} maskUnits="userSpaceOnUse" x="0" y="0" width={w} height={h}>
              <g ref={ghostMaskRef} transform="translate(-9999 -9999)">
                <path d={GHOST_PATH} fill="white" fillRule="evenodd" />
              </g>
            </mask>
            <mask id={`${uid}-mask`}>
              <rect x="0" y="0" width={w} height={h} fill={`url(#${uid}-reveal)`} />
            </mask>
          </defs>

          <text className={styles.text} x="0" y={h / 2} style={{ fontSize, strokeWidth: fontSize / 40 }}>
            {text}
          </text>
          {/* Contrast layer: filled letters, visible only under the ghost */}
          <text
            className={styles.textContrast}
            x="0"
            y={h / 2}
            mask={`url(#${uid}-ghost)`}
            style={{ fontSize, strokeWidth: fontSize / 40 }}
          >
            {text}
          </text>
          <text
            className={styles.textGradient}
            x="0"
            y={h / 2}
            stroke={`url(#${uid}-gradient)`}
            mask={`url(#${uid}-mask)`}
            style={{ fontSize, strokeWidth: fontSize / 32 }}
          >
            {text}
          </text>
        </svg>
      )}
    </span>
  )
}

export default OutlineWord
