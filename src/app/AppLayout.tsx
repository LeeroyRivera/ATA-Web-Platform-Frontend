import { NavLink, Outlet } from 'react-router'
import styles from './AppLayout.module.css'

const NAV_ITEMS = [
  { to: '/', label: 'Home', end: true },
  { to: '/gr-invoice', label: 'GR Invoice Template', end: false },
]

// Placeholder user until the simulated session arrives (day 2).
const USER = { name: 'Aleksander Rivera', initials: 'AR' }

export default function AppLayout() {
  return (
    <>
      <header className={styles.top}>
        <NavLink to="/" aria-label="Home">
          <img src="/logo.png" alt="American Textile & Apparel Inc." className={styles.logo} />
        </NavLink>
        <nav className={styles.nav}>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className={styles.user}>
          <span>{USER.name}</span>
          <div className={styles.avatar}>{USER.initials}</div>
        </div>
      </header>
      <div className={styles.stripe} />
      <main className={styles.main}>
        <Outlet />
        <footer className="pie">ATA Web Platform · Internal use only</footer>
      </main>
    </>
  )
}
