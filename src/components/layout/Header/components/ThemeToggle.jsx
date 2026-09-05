import { useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import styles from './ThemeToggle.module.css'

function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  return (
    <button
      className={styles.toggle}
      onClick={() => setIsDark((prev) => !prev)}
      aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
      aria-pressed={isDark}
    >
      {isDark ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  )
}

export default ThemeToggle