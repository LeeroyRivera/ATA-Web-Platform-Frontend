import { useCallback, useMemo, useRef, useState, type ReactNode } from 'react'
import { CircleAlert, CircleCheck, Info, X } from 'lucide-react'
import { ToastContext, type ToastKind } from './toastContext.ts'
import styles from './Toast.module.css'

interface ToastItem {
  id: number
  message: string
  kind: ToastKind
  leaving: boolean
}

const ICONS = { info: Info, success: CircleCheck, error: CircleAlert }
const DURATION_MS = 3500
const EXIT_MS = 200

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const nextId = useRef(1)

  const dismiss = useCallback((id: number) => {
    setToasts((list) => list.map((t) => (t.id === id ? { ...t, leaving: true } : t)))
    setTimeout(() => setToasts((list) => list.filter((t) => t.id !== id)), EXIT_MS)
  }, [])

  const show = useCallback(
    (message: string, kind: ToastKind = 'info') => {
      const id = nextId.current++
      setToasts((list) => [...list.slice(-2), { id, message, kind, leaving: false }])
      setTimeout(() => dismiss(id), DURATION_MS)
    },
    [dismiss],
  )

  const api = useMemo(() => ({ show }), [show])

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className={styles.stack} role="status" aria-live="polite">
        {toasts.map((toast) => {
          const Icon = ICONS[toast.kind]
          return (
            <div
              key={toast.id}
              className={`${styles.toast} ${styles[toast.kind]} ${toast.leaving ? styles.leaving : ''}`}
            >
              <Icon size={18} className={styles.icon} />
              <span className={styles.message}>{toast.message}</span>
              <button
                type="button"
                className={styles.close}
                onClick={() => dismiss(toast.id)}
                aria-label="Dismiss"
              >
                <X size={16} />
              </button>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}
