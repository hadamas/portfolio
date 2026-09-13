import { useState, useEffect, useRef } from 'react'

export function useTypewriter(text, { speed = 50, onCharacter, enabled = true } = {}) {
  const [displayedText, setDisplayedText] = useState('')
  const [isDone, setIsDone] = useState(false)
  const [currentText, setCurrentText] = useState(text)
  const onCharacterRef = useRef(onCharacter)

  useEffect(() => {
    onCharacterRef.current = onCharacter
  }, [onCharacter])

  // Reset durante o render quando o texto muda (padrão recomendado pelo React
  // para "ajustar estado quando uma prop muda" — evita fazer isso num efeito)
  if (text !== currentText) {
    setCurrentText(text)
    setDisplayedText('')
    setIsDone(false)
  }

  useEffect(() => {
    if (!enabled) return

    let index = 0
    const intervalId = setInterval(() => {
      index += 1
      setDisplayedText(currentText.slice(0, index))
      onCharacterRef.current?.()

      if (index >= currentText.length) {
        clearInterval(intervalId)
        setIsDone(true)
      }
    }, speed)

    return () => clearInterval(intervalId)
  }, [currentText, speed, enabled])

  return { displayedText, isDone }
}