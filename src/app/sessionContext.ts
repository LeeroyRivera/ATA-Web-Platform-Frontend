import { createContext, useContext } from 'react'
import type { User } from '../api/types.ts'

export interface SessionValue {
  user: User
  isSignedIn: boolean
  signIn: (user: User) => void
  signOut: () => void
}

export const SessionContext = createContext<SessionValue | null>(null)

export function useSession(): SessionValue {
  const value = useContext(SessionContext)
  if (!value) throw new Error('useSession must be used inside <SessionProvider>')
  return value
}
