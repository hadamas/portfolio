import { Listbox } from '@headlessui/react'
import { Globe, Check } from 'lucide-react'
import { useLanguageContext, LANGUAGES } from '../../../../context/LanguageContext'
import styles from './LanguageSelector.module.css'

function LanguageSelector() {
  const { language, selectLanguage } = useLanguageContext()

  return (
    <Listbox value={language} onChange={selectLanguage}>
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
                    <span className={styles.optionName}>{lang.names[language.code]}</span>
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