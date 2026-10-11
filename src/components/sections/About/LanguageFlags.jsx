import styles from './LanguageFlags.module.css'

// Simple inline SVG flags; `bg` is the flag's predominant color, used behind the hover label.
const FLAGS = [
  {
    code: 'pt',
    bg: '#065524',
    svg: (
      <svg viewBox="0 0 30 20" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="30" height="20" fill="#095a28" />
        <path d="M15 2 27 10 15 18 3 10Z" fill="#ffdf00" />
        <circle cx="15" cy="10" r="4.2" fill="#002776" />
      </svg>
    ),
  },
  {
    code: 'en',
    bg: '#012169',
    svg: (
      <svg viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="60" height="30" fill="#012169" />
        <path d="M0 0 60 30M60 0 0 30" stroke="#fff" strokeWidth="6" />
        <path d="M0 0 60 30M60 0 0 30" stroke="#c8102e" strokeWidth="2.5" />
        <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" />
        <path d="M30 0v30M0 15h60" stroke="#c8102e" strokeWidth="6" />
      </svg>
    ),
  },
  {
    code: 'fr',
    bg: '#0055a4',
    svg: (
      <svg viewBox="0 0 30 20" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="10" height="20" fill="#0055a4" />
        <rect x="10" width="10" height="20" fill="#fff" />
        <rect x="20" width="10" height="20" fill="#ef4135" />
      </svg>
    ),
  },
  {
    code: 'ja',
    bg: '#bc002d',
    svg: (
      <svg viewBox="0 0 30 20" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="30" height="20" fill="#fff" />
        <circle cx="15" cy="10" r="6" fill="#bc002d" />
      </svg>
    ),
  },
]

// `languages` follows the order in translations: pt, en, fr, ja
function LanguageFlags({ label, languages }) {
  return (
    <ul className={styles.list} aria-label={label}>
      {languages.map((lang, index) => {
        const flag = FLAGS[index]
        if (!flag) return null
        return (
          <li key={flag.code} className={styles.item}>
            <div
              className={styles.btn}
              style={{ '--flag-bg': flag.bg }}
              tabIndex={0}
              role="group"
              aria-label={`${lang.name} — ${lang.level}`}
              title={`${lang.name} — ${lang.level}`}
            >
              <span className={styles.flag}>{flag.svg}</span>
              <span className={styles.label}>
                <span className={styles.labelText}>{lang.name}</span>
              </span>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default LanguageFlags
