import { useState } from 'react'
import { Listbox } from '@headlessui/react'
import { Globe, Check } from 'lucide-react'
import styles from './LanguageSelector.module.css'

const LANGUAGES = [
  { code: 'en', native: 'English', names: { en: 'English', pt: 'Inglês', fr: 'Anglais', ja: '英語' } },
  { code: 'pt', native: 'Português', names: { en: 'Portuguese', pt: 'Português', fr: 'Portugais', ja: 'ポルトガル語' } },
  { code: 'fr', native: 'Français', names: { en: 'French', pt: 'Francês', fr: 'Français', ja: 'フランス語' } },
  { code: 'ja', native: '日本語', names: { en: 'Japanese', pt: 'Japonês', fr: 'Japonais', ja: '日本語' } },
]

function LanguageSelector() {
  const [selected, setSelected] = useState(LANGUAGES[0])

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className={styles.wrapper}>
        <Listbox.Button className={styles.trigger} aria-label="Selecionar idioma">
          <Globe size={20} />
        </Listbox.Button>

        <Listbox.Options className={styles.dropdown}>
          {LANGUAGES.map((lang) => (
            <Listbox.Option key={lang.code} value={lang} className={styles.option}>
              {({ selected: isSelected }) => (
                <span className={styles.optionRow}>
                  <span className={styles.optionText}>
                    <span className={styles.optionName}>{lang.names[selected.code]}</span>
                    <span className={styles.optionNative}>{lang.native}</span>
                  </span>
                  {isSelected && <Check size={16} className={styles.checkIcon} />}
                </span>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  )
}

export default LanguageSelector