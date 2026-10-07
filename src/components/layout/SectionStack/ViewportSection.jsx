import styles from './SectionStack.module.css'

function ViewportSection({ id, isActive, scrollable = false, children }) {
  return (
    <div
      id={id}
      className={styles.viewport}
      data-active={isActive}
      inert={!isActive}
    >
      <div className={`${styles.window} ${scrollable ? styles.scrollable : ''}`}>
        {children}
      </div>
    </div>
  )
}

export default ViewportSection
