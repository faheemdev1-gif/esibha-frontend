import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store';
import BottleSVG from '../components/ui/BottleSVG';
import Button from '../components/ui/Button';
import { ArrowLeft } from '../components/ui/Icons';

export default function CartPage() {
  const navigate = useNavigate();
  const { items, removeItem, updateQty, clearCart } = useCartStore();
  const subtotal  = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping  = subtotal >= 3000 ? 0 : 200;
  const total     = subtotal + shipping;

  if (items.length === 0) return (
    <div style={{ paddingTop: 'var(--nav-h)', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 'var(--s7)' }}>
      <div style={{ fontFamily: 'var(--serif)', fontSize: '48px', color: 'var(--text-muted)', opacity: 0.3, marginBottom: 'var(--s4)' }}>◈</div>
      <h1 style={{ fontFamily: 'var(--serif)', fontSize: '32px', fontWeight: 300, color: 'var(--text-muted)', marginBottom: 'var(--s4)' }}>Your cart is empty</h1>
      <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: 'var(--s7)', fontWeight: 300 }}>Add a fragrance to begin.</p>
      <Button onClick={() => navigate('/shop')}>Explore Fragrances</Button>
    </div>
  );

  return (
    <div style={{ paddingTop: 'var(--nav-h)', background: 'var(--bg)', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: 'var(--bg-white)', borderBottom: '1px solid var(--border)', padding: 'var(--s6) var(--s7)' }}>
        <div className="container" style={{ padding: 0 }}>
          <button onClick={() => navigate('/shop')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '12px', letterSpacing: '0.08em', marginBottom: 'var(--s4)' }}>
            <ArrowLeft size={13} /> Continue Shopping
          </button>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px,4vw,44px)', fontWeight: 300, color: 'var(--text-primary)' }}>
              Your Cart <span style={{ fontSize: '18px', color: 'var(--text-muted)', fontFamily: 'var(--sans)', fontWeight: 300 }}>({items.length})</span>
            </h1>
            <button onClick={clearCart} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
              Clear All
            </button>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: 'var(--s7)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 'var(--s8)', alignItems: 'start' }}>

          {/* Items list */}
          <div>
            {items.map(item => (
              <div key={item.key} style={{
                background: 'var(--bg-white)', border: '1px solid var(--border)', borderRadius: '2px',
                padding: 'var(--s5)', marginBottom: 'var(--s4)',
                display: 'flex', gap: 'var(--s5)', alignItems: 'center',
                boxShadow: 'var(--shadow-sm)',
              }}>
                {/* Bottle thumb */}
                <div
                  onClick={() => navigate(`/product/${item.slug}`)}
                  style={{ background: 'var(--bg)', borderRadius: '2px', padding: 'var(--s3)', flexShrink: 0, cursor: 'pointer' }}
                >
                  <BottleSVG family={item.family} size={72} />
                </div>

                {/* Details */}
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: '18px', fontWeight: 400, color: 'var(--text-primary)', marginBottom: '2px', cursor: 'pointer' }}
                    onClick={() => navigate(`/product/${item.slug}`)}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: 'var(--s3)', letterSpacing: '0.05em' }}>
                    Inspired by {item.inspo} · {item.size}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s4)' }}>
                    {/* Qty stepper */}
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border)', borderRadius: '2px' }}>
                      <button onClick={() => updateQty(item.key, item.qty - 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', width: '34px', height: '34px', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                      <span style={{ width: '32px', textAlign: 'center', fontSize: '13px', color: 'var(--text-primary)' }}>{item.qty}</span>
                      <button onClick={() => updateQty(item.key, item.qty + 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', width: '34px', height: '34px', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
                    </div>
                    <button onClick={() => removeItem(item.key)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
                      Remove
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div style={{ fontFamily: 'var(--serif)', fontSize: '20px', fontWeight: 300, color: 'var(--text-primary)', flexShrink: 0 }}>
                  PKR {(item.price * item.qty).toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div style={{ background: 'var(--bg-white)', border: '1px solid var(--border)', borderRadius: '2px', padding: 'var(--s6)', position: 'sticky', top: 'calc(var(--nav-h) + 20px)', boxShadow: 'var(--shadow-sm)' }}>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: '22px', fontWeight: 300, color: 'var(--text-primary)', marginBottom: 'var(--s5)', paddingBottom: 'var(--s4)', borderBottom: '1px solid var(--border)' }}>
              Order Summary
            </h2>

            <div style={{ marginBottom: 'var(--s3)', display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--text-secondary)' }}>
              <span>Subtotal ({items.reduce((s, i) => s + i.qty, 0)} items)</span>
              <span>PKR {subtotal.toLocaleString()}</span>
            </div>
            <div style={{ marginBottom: 'var(--s5)', display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--text-secondary)' }}>
              <span>Shipping</span>
              <span style={{ color: shipping === 0 ? '#286858' : undefined }}>
                {shipping === 0 ? 'Free' : `PKR ${shipping}`}
              </span>
            </div>

            {shipping > 0 && (
              <div style={{ background: 'var(--bg-subtle)', borderRadius: '2px', padding: 'var(--s3)', marginBottom: 'var(--s4)', fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Add PKR {(3000 - subtotal).toLocaleString()} more for free shipping.
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 'var(--s4)', borderTop: '1px solid var(--border)', marginBottom: 'var(--s6)' }}>
              <span style={{ fontFamily: 'var(--serif)', fontSize: '20px', fontWeight: 300 }}>Total</span>
              <span style={{ fontFamily: 'var(--serif)', fontSize: '20px', fontWeight: 300, color: 'var(--accent)' }}>
                PKR {total.toLocaleString()}
              </span>
            </div>

            <Button fullWidth size="lg">Proceed to Checkout</Button>

            <div style={{ marginTop: 'var(--s4)', display: 'flex', flexDirection: 'column', gap: 'var(--s2)' }}>
              {['Secure checkout', 'Free returns within 30 days', 'Cash on delivery available'].map(t => (
                <div key={t} style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 'var(--s2)' }}>
                  <span style={{ color: '#286858' }}>✓</span> {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}