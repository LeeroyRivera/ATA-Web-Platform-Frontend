import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import Badge from '../../components/Badge.tsx'
import styles from './HomePage.module.css'

interface ModuleCardProps {
  title: string
  description: string
  icon: ReactNode
  to?: string
  onComingSoon?: () => void
  index: number
}

export default function ModuleCard({
  title,
  description,
  icon,
  to,
  onComingSoon,
  index,
}: ModuleCardProps) {
  const delay = { animationDelay: `${index * 70}ms` }

  if (to) {
    return (
      <Link to={to} className={`${styles.mod} ${styles.active}`} style={delay}>
        <div className={styles.icon}>{icon}</div>
        <h3>{title}</h3>
        <p>{description}</p>
        <span className={styles.open}>
          Open <ArrowRight size={16} className={styles.arrow} />
        </span>
      </Link>
    )
  }

  return (
    <button
      type="button"
      className={`${styles.mod} ${styles.soon}`}
      style={delay}
      onClick={onComingSoon}
      aria-disabled="true"
    >
      <div className={styles.icon}>{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      <Badge tone="gray">Coming soon</Badge>
    </button>
  )
}
