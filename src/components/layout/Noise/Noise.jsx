import { useRef, useEffect } from 'react'
import styles from './Noise.module.css'

/* Noise Background - finded on React Bits ;) */
function Noise({
  patternAlpha = 15,
  patternRefreshInterval = 2,
}) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let frame = 0
    let animationId
    const canvasSize = 1024

    function resize() {
      canvas.width = canvasSize
      canvas.height = canvasSize
    }

    function drawGrain() {
      const imageData = ctx.createImageData(canvasSize, canvasSize)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255
        data[i] = value
        data[i + 1] = value
        data[i + 2] = value
        data[i + 3] = patternAlpha
      }

      ctx.putImageData(imageData, 0, 0)
    }

    function loop() {
      if (frame % patternRefreshInterval === 0) {
        drawGrain()
      }
      frame++
      animationId = window.requestAnimationFrame(loop)
    }

    resize()
    loop()

    return () => {
      window.cancelAnimationFrame(animationId)
    }
  }, [patternRefreshInterval, patternAlpha])

  return (
    <canvas
      ref={canvasRef}
      className={styles.noiseOverlay}
      style={{ imageRendering: 'pixelated' }}
      aria-hidden="true"
    />
  )
}

export default Noise
