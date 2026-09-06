import { Volume2, VolumeX } from 'lucide-react'
import { useSoundContext } from '../../../../context/SoundContext'
import styles from './SoundToggle.module.css'

function SoundToggle() {
  const { enabled, toggleEnabled } = useSoundContext()

  return (
    <button
      className={styles.trigger}
      onClick={toggleEnabled}
      aria-label={enabled ? 'Desativar som' : 'Ativar som'}
      aria-pressed={enabled}
    >
      {enabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
    </button>
  )
}

export default SoundToggle