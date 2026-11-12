export default function Avatar({ initials, size = 34 }: { initials: string; size?: number }) {
  return (
    <span
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: 'var(--azul)',
        color: 'var(--blanco)',
        display: 'grid',
        placeItems: 'center',
        fontWeight: 700,
        fontSize: size * 0.4,
        flexShrink: 0,
      }}
    >
      {initials}
    </span>
  )
}
