import { useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import styles from './SoundToggle.module.css'

function SoundToggle() {
  const [enabled, setEnabled] = useState(true)

  return (
    <button
      className={styles.toggle}
      onClick={() => setEnabled((prev) => !prev)}
      aria-label={enabled ? 'Desativar som' : 'Ativar som'}
      aria-pressed={enabled}
    >
      {enabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
    </button>
  )
}

export default SoundToggle