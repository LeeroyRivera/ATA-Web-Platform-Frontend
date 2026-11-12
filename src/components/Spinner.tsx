import { LoaderCircle } from 'lucide-react'
import styles from './Spinner.module.css'

export default function Spinner({ size = 20, label }: { size?: number; label?: string }) {
  return (
    <LoaderCircle
      size={size}
      className={styles.spin}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    />
  )
}
