import { ArrowUpRight, Image as ImageIcon } from 'lucide-react'
import styles from './ProjectCard.module.css'

function ProjectCard({ project, text, linkLabel }) {
  const { link, media } = project
  const { category, title } = text

  return (
    <article className={styles.card} tabIndex={0}>
      <div className={styles.media}>
        {media?.type === 'video' ? (
          <video
            className={styles.mediaEl}
            src={media.src}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : media?.type === 'image' ? (
          <img className={styles.mediaEl} src={media.src} alt="" />
        ) : (
          <div className={styles.placeholder} aria-hidden="true">
            <ImageIcon size={28} strokeWidth={1.5} />
          </div>
        )}
      </div>

      <div className={styles.overlay} aria-hidden="true" />

      {link && (
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className={styles.linkButton}
          aria-label={linkLabel}
        >
          <ArrowUpRight size={18} strokeWidth={2} />
        </a>
      )}

      <div className={styles.caption}>
        <span className={styles.category}>{category}</span>
        <h3 className={styles.title}>{title}</h3>
      </div>
    </article>
  )
}

export default ProjectCard
