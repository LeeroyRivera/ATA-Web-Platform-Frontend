import { Link } from 'react-router'

export default function NotFoundPage() {
  return (
    <>
      <h1>Page not found</h1>
      <p className="sub">The page you are looking for does not exist.</p>
      <p style={{ marginTop: 16 }}>
        <Link to="/">Back to Home</Link>
      </p>
    </>
  )
}
