import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import gsap from 'gsap'
import styles from './DepthCarousel.module.css'

/* Adpted "Depth Carousel" by reactbits.dev
  Changes from the original:
   - Card content is provided via `renderItem` instead of <img>;
   - Removed built-in autoplay, arrows, and dots; the Projects section
     controls navigation via next()/prev() through the ref;
   - Mouse wheel only rotates the carousel on horizontal gestures,
     allowing normal vertical page scrolling. */

const clamp = (v, min, max) => Math.min(Math.max(v, min), max)

const DepthCarousel = forwardRef(function DepthCarousel(
  {
    items,
    renderItem,
    cardWidth = 440,
    cardHeight = 275,
    radius = 20,
    tint = '#05060a',
    depth = 180,
    spread = 70,
    tilt = 18,
    perspective = 1400,
    visibleCards = 3,
    falloff = 0.2,
    blur = 5,
    duration = 700,
    ease = 'power3.out',
    onChange,
  },
  ref
) {
  const count = items.length

  const rootRef = useRef(null)
  const cardRefs = useRef([])
  const overlayRefs = useRef([])

  const posRef = useRef(0)
  const focusRef = useRef(0)
  const tweenRef = useRef(null)
  const scaleRef = useRef(1)
  const dragRef = useRef(null)
  const wheelTimerRef = useRef(null)
  const reducedRef = useRef(false)
  const onChangeRef = useRef(onChange)
  const cfgRef = useRef({})

  const [active, setActive] = useState(0)

  onChangeRef.current = onChange
  cfgRef.current = {
    count,
    depth,
    spread,
    tilt,
    visibleCards,
    falloff,
    blur,
    duration,
    ease,
    cardWidth,
  }

  const layout = useCallback((pos) => {
    const cfg = cfgRef.current
    const n = cfg.count
    if (!n) return
    const sc = scaleRef.current

    for (let i = 0; i < n; i++) {
      const el = cardRefs.current[i]
      if (!el) continue

      // signed distance to the focus, wrapping around the loop
      let d = i - pos
      if (n > 1) {
        d = ((d % n) + n) % n
        if (d > n / 2) d -= n
      }

      const back = Math.max(0, d)
      const shown = Math.abs(d) <= cfg.visibleCards + 0.5

      const tz = -cfg.depth * d
      const tx = cfg.spread * d
      const ry = cfg.tilt * clamp(d, 0, 1)

      let opacity = d < 0 ? Math.max(0, 1 + d) : 1
      if (!shown) opacity = 0

      const brightness = Math.max(0.15, 1 - back * cfg.falloff)
      const blurPx =
        cfg.blur > 0
          ? Math.min(cfg.blur, (back / Math.max(1, cfg.visibleCards)) * cfg.blur)
          : 0

      el.style.transform = `translate(-50%, -50%) scale(${sc}) translateX(${tx.toFixed(2)}px) translateZ(${tz.toFixed(2)}px) rotateY(${ry.toFixed(3)}deg)`
      el.style.opacity = opacity.toFixed(3)
      el.style.filter = `brightness(${brightness.toFixed(3)}) blur(${blurPx.toFixed(2)}px)`
      el.style.zIndex = String(Math.round(2000 - d * 20))
      el.style.pointerEvents = shown && opacity > 0.05 ? 'auto' : 'none'

      const ov = overlayRefs.current[i]
      if (ov) ov.style.opacity = clamp(back * cfg.falloff * 1.25, 0, 0.86).toFixed(3)
    }
  }, [])

  const tweenTo = useCallback(
    (target, animate) => {
      tweenRef.current?.kill()
      const cfg = cfgRef.current
      const proxy = { p: posRef.current }
      tweenRef.current = gsap.to(proxy, {
        p: target,
        duration: animate && !reducedRef.current ? cfg.duration / 1000 : 0,
        ease: cfg.ease,
        onUpdate: () => {
          posRef.current = proxy.p
          layout(proxy.p)
        },
        onComplete: () => {
          const n = cfg.count
          if (n > 0) posRef.current = ((posRef.current % n) + n) % n
          layout(posRef.current)
        },
      })
    },
    [layout]
  )

  const setFocus = useCallback(
    (rawIndex) => {
      const n = cfgRef.current.count
      if (!n) return
      const idx = ((rawIndex % n) + n) % n
      let delta = idx - posRef.current
      if (n > 1) {
        delta = ((delta % n) + n) % n
        if (delta > n / 2) delta -= n
      }
      tweenTo(posRef.current + delta, true)
      if (idx !== focusRef.current) {
        focusRef.current = idx
        setActive(idx)
        onChangeRef.current?.(idx)
      }
    },
    [tweenTo]
  )

  const navigateBy = useCallback((step) => setFocus(focusRef.current + step), [setFocus])

  useImperativeHandle(
    ref,
    () => ({ next: () => navigateBy(1), prev: () => navigateBy(-1) }),
    [navigateBy]
  )

  useEffect(() => {
    const root = rootRef.current
    if (!root) return undefined
    const ro = new ResizeObserver((entries) => {
      const w = entries[0].contentRect.width
      const cfg = cfgRef.current
      const needed = cfg.cardWidth + Math.abs(cfg.spread) * 2 + 40
      scaleRef.current = clamp(w / needed, 0.4, 1)
      layout(posRef.current)
    })
    ro.observe(root)
    return () => ro.disconnect()
  }, [layout])

  // horizontal gestures rotate the carousel, vertical gestures scroll the page
  useEffect(() => {
    const el = rootRef.current
    if (!el) return undefined
    function onWheel(event) {
      if (cfgRef.current.count < 2) return
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return
      event.preventDefault()
      tweenRef.current?.kill()
      const step = clamp(event.deltaX / (cfgRef.current.cardWidth * 0.9), -0.6, 0.6)
      posRef.current += step
      layout(posRef.current)
      clearTimeout(wheelTimerRef.current)
      wheelTimerRef.current = setTimeout(() => setFocus(Math.round(posRef.current)), 130)
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => {
      el.removeEventListener('wheel', onWheel)
      clearTimeout(wheelTimerRef.current)
    }
  }, [layout, setFocus])

  function stepPx() {
    return Math.max(cfgRef.current.cardWidth * 0.55 * scaleRef.current, 40)
  }

  function handlePointerDown(event) {
    if (cfgRef.current.count < 2) return
    tweenRef.current?.kill()
    dragRef.current = {
      x: event.clientX,
      startPos: posRef.current,
      lastX: event.clientX,
      lastT: performance.now(),
      v: 0,
      moved: false,
      id: event.pointerId,
    }
  }

  function handlePointerMove(event) {
    const drag = dragRef.current
    if (!drag) return
    const dx = event.clientX - drag.x
    if (!drag.moved && Math.abs(dx) > 4) {
      drag.moved = true
      rootRef.current?.setPointerCapture(drag.id)
    }
    if (!drag.moved) return
    const now = performance.now()
    drag.v = (event.clientX - drag.lastX) / Math.max(now - drag.lastT, 1)
    drag.lastX = event.clientX
    drag.lastT = now
    posRef.current = drag.startPos - dx / stepPx()
    layout(posRef.current)
  }

  function handlePointerEnd() {
    const drag = dragRef.current
    if (!drag) return
    dragRef.current = null
    if (!drag.moved) return
    setFocus(Math.round(posRef.current - (drag.v * 180) / stepPx()))
  }

  function handleKeyDown(event) {
    if (event.target !== event.currentTarget) return
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      navigateBy(-1)
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      navigateBy(1)
    }
  }

  useEffect(() => {
    reducedRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  useEffect(() => {
    layout(posRef.current)
  }, [layout, depth, spread, tilt, visibleCards, falloff, blur, cardWidth, cardHeight, count])

  useEffect(() => () => tweenRef.current?.kill(), [])

  return (
    <div
      ref={rootRef}
      className={styles.carousel}
      style={{ '--dc-perspective': `${perspective}px` }}
      role="group"
      aria-roledescription="carousel"
      tabIndex={0}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.stage}>
        {items.map((item, i) => (
          <div
            key={item.id}
            className={styles.card}
            ref={(el) => {
              cardRefs.current[i] = el
            }}
            style={{ width: cardWidth, height: cardHeight, borderRadius: radius }}
            aria-roledescription="slide"
            aria-current={active === i}
            onClick={() => setFocus(i)}
          >
            {renderItem(item, i)}
            <span
              className={styles.tint}
              ref={(el) => {
                overlayRefs.current[i] = el
              }}
              style={{ background: tint }}
            />
          </div>
        ))}
      </div>
    </div>
  )
})

export default DepthCarousel
