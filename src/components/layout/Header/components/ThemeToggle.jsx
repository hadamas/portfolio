import { Sun, Moon } from 'lucide-react'
import { useThemeContext } from '../../../../hooks/useThemeContext'
import styles from './ThemeToggle.module.css'

function ThemeToggle() {
  const { theme, toggleTheme } = useThemeContext()
  const isDark = theme === 'dark'

  return (
    <button
      className={styles.trigger}
      onClick={toggleTheme}
      aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
      aria-pressed={isDark}
    >
      {isDark ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  )
}

export default ThemeToggle