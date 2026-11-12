import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { DEFAULT_USER } from '../api/mock/data.ts'
import type { User } from '../api/types.ts'
import { SessionContext } from './sessionContext.ts'

const STORAGE_KEY = 'ata.session'

function readStoredUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as User) : null
  } catch {
    return null
  }
}

/**
 * Simulated session kept in localStorage. Routes are not protected yet: without a session the
 * header shows the sample user.
 */
export function SessionProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(readStoredUser)

  const signIn = useCallback((next: User) => {
    setUser(next)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      /* storage unavailable: session lasts until reload */
    }
  }, [])

  const signOut = useCallback(() => {
    setUser(null)
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      /* ignore */
    }
  }, [])

  const value = useMemo(
    () => ({ user: user ?? DEFAULT_USER, isSignedIn: user !== null, signIn, signOut }),
    [user, signIn, signOut],
  )

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
}
