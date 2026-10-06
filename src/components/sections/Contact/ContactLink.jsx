import styles from './ContactLink.module.css'

function ContactLink({ href, children, external = false }) {
  return (
    <a
      className={styles.link}
      href={href ?? undefined}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
    >
      <svg
        className={styles.arrow}
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.0"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path className={styles.arrowPath} d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
      </svg>
      <span className={styles.text}>{children}</span>
    </a>
  )
}

export default ContactLink
