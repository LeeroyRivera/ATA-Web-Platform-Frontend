import type { ReactNode } from 'react'
import styles from './Badge.module.css'

export type BadgeTone = 'ok' | 'pending' | 'gray' | 'blue' | 'error'

export default function Badge({
  tone = 'gray',
  children,
}: {
  tone?: BadgeTone
  children: ReactNode
}) {
  return <span className={`${styles.badge} ${styles[tone]}`}>{children}</span>
}
