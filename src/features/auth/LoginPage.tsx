import { useState, type ChangeEvent, type FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { CircleAlert, Eye, EyeOff } from 'lucide-react'
import { login } from '../../api/index.ts'
import { useSession } from '../../app/sessionContext.ts'
import Button from '../../components/Button.tsx'
import { useToast } from '../../components/toast/toastContext.ts'
import styles from './LoginPage.module.css'

type Field = 'username' | 'password'
type Errors = Partial<Record<Field, string>>

const PASSWORD_MIN = 6

function validate(values: Record<Field, string>): Errors {
  const errors: Errors = {}
  const username = values.username.trim()
  if (!username) errors.username = 'Enter your username.'
  else if (/\s/.test(username)) errors.username = 'Username cannot contain spaces.'
  if (!values.password) errors.password = 'Enter your password.'
  else if (values.password.length < PASSWORD_MIN)
    errors.password = `Password must be at least ${PASSWORD_MIN} characters.`
  return errors
}

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { signIn } = useSession()
  const toast = useToast()

  const [values, setValues] = useState<Record<Field, string>>({ username: '', password: '' })
  const [touched, setTouched] = useState<Record<Field, boolean>>({
    username: false,
    password: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [shake, setShake] = useState(false)

  const errors = validate(values)
  const visibleError = (field: Field) => (touched[field] ? errors[field] : undefined)

  const update = (field: Field) => (event: ChangeEvent<HTMLInputElement>) =>
    setValues((v) => ({ ...v, [field]: event.target.value }))

  const blur = (field: Field) => () => setTouched((t) => ({ ...t, [field]: true }))

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (submitting) return
    setTouched({ username: true, password: true })
    if (Object.keys(errors).length > 0) {
      setShake(true)
      const firstInvalid = errors.username ? 'username' : 'password'
      document.getElementById(firstInvalid)?.focus()
      return
    }
    setSubmitting(true)
    const user = await login(values.username, values.password)
    signIn(user)
    toast.show(`Welcome back, ${user.name.split(' ')[0]}.`, 'success')
    const from = (location.state as { from?: string } | null)?.from
    navigate(from && from !== '/login' ? from : '/', { replace: true })
  }

  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <form
          className={`${styles.box} ${shake ? styles.shake : ''}`}
          onSubmit={handleSubmit}
          onAnimationEnd={() => setShake(false)}
          noValidate
        >
          <img src="/logo.png" alt="American Textile & Apparel Inc." className={styles.logo} />
          <h1 className={styles.title}>Sign in</h1>
          <p className={styles.sub}>ATA Web Platform</p>

          <label htmlFor="username" className={styles.label}>
            Username
          </label>
          <input
            id="username"
            className={`${styles.input} ${visibleError('username') ? styles.invalid : ''}`}
            value={values.username}
            onChange={update('username')}
            onBlur={blur('username')}
            autoComplete="username"
            autoFocus
            disabled={submitting}
            aria-invalid={Boolean(visibleError('username'))}
            aria-describedby="username-error"
          />
          <FieldError id="username-error" message={visibleError('username')} />

          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <div className={styles.passwordWrap}>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              className={`${styles.input} ${styles.passwordInput} ${visibleError('password') ? styles.invalid : ''}`}
              value={values.password}
              onChange={update('password')}
              onBlur={blur('password')}
              autoComplete="current-password"
              disabled={submitting}
              aria-invalid={Boolean(visibleError('password'))}
              aria-describedby="password-error"
            />
            <button
              type="button"
              className={styles.eye}
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <FieldError id="password-error" message={visibleError('password')} />

          <Button type="submit" size="lg" block loading={submitting} className={styles.submit}>
            {submitting ? 'Signing in...' : 'Sign in'}
          </Button>
          <button
            type="button"
            className={styles.forgot}
            onClick={() =>
              toast.show('To reset your password, please contact the IT department.', 'info')
            }
          >
            Forgot your password?
          </button>
        </form>
        <div className="pie">Internal use only</div>
      </div>
    </div>
  )
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <div id={id} className={`${styles.error} ${message ? styles.errorVisible : ''}`} role="alert">
      {message && (
        <>
          <CircleAlert size={14} />
          {message}
        </>
      )}
    </div>
  )
}
