import styles from './Loader.module.css'

/**
 * Loader genérico e reutilizável.
 * - variant="global": ocupa a tela toda (carregamento inicial do app)
 * - variant="section": ocupa só o container pai (ex: dentro de um Suspense de seção 3D)
 */
function Loader({ variant = 'section', label = 'Carregando...' }) {
  return (
    <div
      className={`${styles.loader} ${styles[variant]}`}
      role="status"
      aria-live="polite"
    >
      <div className={styles.spinner} aria-hidden="true" />
      <span className={styles.label}>{label}</span>
    </div>
  )
}

export default Loader