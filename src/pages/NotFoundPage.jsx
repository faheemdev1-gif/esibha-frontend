import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

export default function NotFoundPage() {
  return (
    <section className="section" style={{ textAlign: 'center', padding: '8rem 1.5rem' }}>
      <p className="eyebrow">404</p>
      <h1 className="display" style={{ marginBottom: '1rem' }}>Page not found</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        The page you are looking for does not exist or has been moved.
      </p>
      <Button as={Link} to="/">Return home</Button>
    </section>
  );
}
