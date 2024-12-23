import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#121212',
        color: '#ffffff',
        textAlign: 'center',
      }}
    >
      <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Not Found</h2>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem', color: '#b0b0b0' }}>
        Could not find the requested resource
      </p>
      <Link
        href="/"
        style={{
          color: '#61dafb',
          textDecoration: 'none',
          fontSize: '1.2rem',
          border: '1px solid #61dafb',
          borderRadius: '5px',
          padding: '0.5rem 1rem',
        }}
      >
        Home
      </Link>
    </div>
  );
}
