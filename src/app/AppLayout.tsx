import { NavLink, Outlet, useLocation } from 'react-router'
import UserMenu from './UserMenu.tsx'
import styles from './AppLayout.module.css'

const NAV_ITEMS = [
  { to: '/', label: 'Home', end: true },
  { to: '/gr-invoice', label: 'GR Invoice Template', end: false },
]

export default function AppLayout() {
  const location = useLocation()

  return (
    <>
      <header className={styles.top}>
        <NavLink to="/" aria-label="Home" className={styles.logoLink}>
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
        <div className={styles.spacer} />
        <UserMenu />
      </header>
      <div className={styles.stripe} />
      <main className={styles.main}>
        {/* The key restarts the fade-in animation on every page change. */}
        <div key={location.pathname} className={styles.page}>
          <Outlet />
        </div>
        <footer className="pie">ATA Web Platform · Internal use only</footer>
      </main>
    </>
  )
}
