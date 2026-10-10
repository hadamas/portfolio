import { useEffect, useId, useRef, useState } from 'react'
import gsap from 'gsap'
import styles from './TextHoverEffect.module.css'

// Outlined text. A colourful gradient outline is revealed under the cursor.
function TextHoverEffect({ text, duration = 0.15, fontSize = 64 }) {
  const uid = useId().replace(/:/g, '')
  const svgRef = useRef(null)
  const maskGradientRef = useRef(null)
  const drawTextRef = useRef(null)
  const [hovered, setHovered] = useState(false)

  // Intro: the outline is drawn once on mount
  useEffect(() => {
    const tween = gsap.fromTo(
      drawTextRef.current,
      { strokeDashoffset: 1000, strokeDasharray: 1000 },
      { strokeDashoffset: 0, strokeDasharray: 1000, duration: 2.5, ease: 'power2.inOut' },
    )
    return () => tween.kill()
  }, [])

  // Move the reveal mask to the pointer position (in % of the svg box)
  const moveMask = (x, y) => {
    const rect = svgRef.current.getBoundingClientRect()
    gsap.to(maskGradientRef.current, {
      attr: {
        cx: `${((x - rect.left) / rect.width) * 100}%`,
        cy: `${((y - rect.top) / rect.height) * 100}%`,
      },
      duration,
      ease: 'power2.out',
    })
  }

  const handleTouch = (e) => {
    const touch = e.touches[0]
    if (touch) moveMask(touch.clientX, touch.clientY)
  }

  return (
    <svg
      ref={svgRef}
      className={styles.svg}
      viewBox="0 0 200 80"
      aria-hidden="true"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => moveMask(e.clientX, e.clientY)}
      onTouchStart={(e) => { setHovered(true); handleTouch(e) }}
      onTouchMove={handleTouch}
      onTouchEnd={() => setHovered(false)}
      onTouchCancel={() => setHovered(false)}
    >
      <defs>
        <linearGradient id={`${uid}-gradient`} gradientUnits="userSpaceOnUse">
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
          r="40%"
          cx="50%"
          cy="50%"
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </radialGradient>
        <mask id={`${uid}-mask`}>
          <rect x="0" y="0" width="100%" height="100%" fill={`url(#${uid}-reveal)`} />
        </mask>
      </defs>

      {/* 0: faint outline, only while hovering */}
      <text
        className={styles.text}
        x="50%"
        y="50%"
        style={{ fontSize, opacity: hovered ? 0.7 : 0 }}
      >
        {text}
      </text>

      {/* 1: main outline (drawn on mount) */}
      <text ref={drawTextRef} className={styles.text} x="50%" y="50%" style={{ fontSize }}>
        {text}
      </text>

      {/* 2: gradient outline revealed under the cursor */}
      <text
        className={styles.textGradient}
        x="50%"
        y="50%"
        stroke={`url(#${uid}-gradient)`}
        strokeWidth="1.2"
        mask={`url(#${uid}-mask)`}
        style={{ fontSize }}
      >
        {text}
      </text>
    </svg>
  )
}

export default TextHoverEffect
