import type { ButtonHTMLAttributes, ReactNode } from 'react'
import Spinner from './Spinner.tsx'
import styles from './Button.module.css'

type Variant = 'primary' | 'secondary' | 'success' | 'link'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: 'md' | 'sm' | 'lg'
  block?: boolean
  loading?: boolean
  icon?: ReactNode
}

export default function Button({
  variant = 'primary',
  size = 'md',
  block = false,
  loading = false,
  icon,
  disabled,
  className,
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  const classes = [
    styles.btn,
    styles[variant],
    styles[size],
    block ? styles.block : '',
    loading ? styles.loading : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button type={type} className={classes} disabled={disabled || loading} {...rest}>
      {loading ? <Spinner size={16} /> : icon}
      {children}
    </button>
  )
}
