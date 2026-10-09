import CausticsBackground from './CausticsBackground'
import { useThemeContext } from '../../../hooks/useThemeContext'

// Site-wide "Waves of Light" background. It follows the light/dark theme.
// reducedMotion 'full' keeps the waves moving even when the OS asks for less motion
// (they are very slow). Use 'slow' or 'pause' to respect that setting.
function SiteBackground() {
  const { theme } = useThemeContext()

  return <CausticsBackground theme={theme} reducedMotion="full" />
}

export default SiteBackground
