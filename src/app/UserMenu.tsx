import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { ChevronDown, LogOut } from 'lucide-react'
import Avatar from '../components/Avatar.tsx'
import { useToast } from '../components/toast/toastContext.ts'
import { useSession } from './sessionContext.ts'
import styles from './UserMenu.module.css'

export default function UserMenu() {
  const { user, signOut } = useSession()
  const toast = useToast()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onClick = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  function handleSignOut() {
    setOpen(false)
    signOut()
    toast.show('You have signed out.', 'info')
    navigate('/login', { replace: true })
  }

  return (
    <div className={styles.wrap} ref={ref}>
      <button
        type="button"
        className={`${styles.trigger} ${open ? styles.open : ''}`}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className={styles.name}>{user.name}</span>
        <Avatar initials={user.initials} />
        <ChevronDown size={16} className={styles.chevron} />
      </button>
      {open && (
        <div className={styles.menu} role="menu">
          <div className={styles.header}>
            <strong>{user.name}</strong>
            <span>{user.username}</span>
          </div>
          <button type="button" role="menuitem" className={styles.item} onClick={handleSignOut}>
            <LogOut size={16} />
            Sign out
          </button>
        </div>
      )}
    </div>
  )
}
