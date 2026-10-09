import styles from './MenuButton.module.css'

// Menu button adapted from Uiverse "shy-emu-7" by vinodjangid07 (MIT license).
function MenuButton({ isOpen, onClick, label }) {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={onClick}
      data-no-sound
      data-open={isOpen}
      aria-label={label}
      aria-expanded={isOpen}
      aria-controls="site-menu"
    >
      <span className={styles.wrapper} aria-hidden="true">
        <span className={styles.row}>
          <span className={styles.dot} />
          <span className={styles.dot} />
        </span>
        <span className={`${styles.row} ${styles.rowBottom}`}>
          <span className={styles.dot} />
          <span className={styles.dot} />
        </span>
        <span className={styles.rowVertical}>
          <span className={styles.dot} />
          <span className={`${styles.dot} ${styles.middleDot}`} />
          <span className={styles.dot} />
        </span>
        <span className={styles.rowHorizontal}>
          <span className={styles.dot} />
          <span className={`${styles.dot} ${styles.middleDotHorizontal}`} />
          <span className={styles.dot} />
        </span>
      </span>
    </button>
  )
}

export default MenuButton
