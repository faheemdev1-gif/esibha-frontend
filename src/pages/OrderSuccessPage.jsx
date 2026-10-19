import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';

export default function OrderSuccessPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        paddingTop: 'var(--nav-h)',
        minHeight: '100vh',
        background: 'var(--bg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--s7)',
      }}
    >
      <div
        style={{
          maxWidth: '600px',
          width: '100%',
          background: 'var(--bg-white)',
          border: '1px solid var(--border)',
          borderRadius: '2px',
          padding: 'var(--s9)',
          textAlign: 'center',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: 'rgba(40, 104, 88, 0.12)',
            color: '#286858',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '32px',
            margin: '0 auto var(--s5)',
          }}
        >
          ✓
        </div>

        <p
          style={{
            fontSize: '11px',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            marginBottom: 'var(--s3)',
          }}
        >
          Order Confirmed
        </p>

        <h1
          style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: 300,
            color: 'var(--text-primary)',
            marginBottom: 'var(--s4)',
          }}
        >
          Thank You
        </h1>

        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.8,
            color: 'var(--text-secondary)',
            marginBottom: 'var(--s7)',
          }}
        >
          Your order has been placed successfully.
          <br />
          Our team will contact you shortly to confirm your order details.
        </p>

        <div
          style={{
            background: 'var(--bg)',
            border: '1px solid var(--border-soft)',
            borderRadius: '2px',
            padding: 'var(--s4)',
            marginBottom: 'var(--s7)',
          }}
        >
          <div
            style={{
              fontSize: '12px',
              color: 'var(--text-muted)',
              lineHeight: 1.8,
            }}
          >
            ✓ Cash on Delivery available
            <br />
            ✓ Free shipping on orders above PKR 3,000
            <br />
            ✓ Delivery within 3–5 business days
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 'var(--s3)',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Button onClick={() => navigate('/shop')}>
            Continue Shopping
          </Button>

          <Button
            variant="secondary"
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}