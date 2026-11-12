import { Link } from 'react-router'

// Placeholder for day 1. The sign-in form from the mockup arrives on day 2.
export default function LoginPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <img src="/logo.png" alt="American Textile & Apparel Inc." style={{ width: 280 }} />
        <h1 style={{ fontSize: 22, marginTop: 24 }}>Sign in</h1>
        <p className="sub">ATA Web Platform</p>
        <p style={{ marginTop: 16 }}>
          <Link to="/">Continue to Home</Link>
        </p>
      </div>
    </div>
  )
}
