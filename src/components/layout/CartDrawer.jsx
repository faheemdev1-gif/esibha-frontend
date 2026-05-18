import { useCartStore, useUIStore } from '../../store';
import { CloseIcon } from '../ui/Icons';
import Button from '../ui/Button';
import BottleSVG from '../ui/BottleSVG';

export default function CartDrawer() {
  const { cartOpen, closeCart } = useUIStore();
  const { items, removeItem, updateQty } = useCartStore();
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping  = subtotal >= 3000 ? 0 : 200;

  if (!cartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div onClick={closeCart} style={{
        position: 'fixed', inset: 0, zIndex: 300,
        background: 'rgba(17,19,24,0.25)',
        animation: 'fadeIn var(--base) var(--ease)',
      }} />

      {/* Drawer */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 301,
        width: '100%', maxWidth: '420px',
        background: 'var(--bg-white)',
        borderLeft: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column',
        boxShadow: 'var(--shadow-lg)',
        animation: 'slideDown var(--base) var(--ease)',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '20px 24px',
          borderBottom: '1px solid var(--border)',
        }}>
          <div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '20px', fontWeight: 300 }}>Your Cart</div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>{items.length} item{items.length !== 1 ? 's' : ''}</div>
          </div>
          <button onClick={closeCart} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '4px' }}>
            <CloseIcon size={18} />
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', paddingTop: '60px' }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: '22px', color: 'var(--text-muted)', marginBottom: '10px' }}>Empty</div>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Your cart is waiting.</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.key} style={{
                display: 'flex', gap: '14px', alignItems: 'center',
                padding: '16px 0',
                borderBottom: '1px solid var(--border-soft)',
              }}>
                <div style={{ background: 'var(--bg)', borderRadius: '2px', padding: '8px', flexShrink: 0 }}>
                  <BottleSVG family={item.family} size={52} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '14px', fontFamily: 'var(--serif)', fontWeight: 400, marginBottom: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '8px' }}>{item.size}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border)', borderRadius: '2px' }}>
                      <button onClick={() => updateQty(item.key, item.qty - 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', width: '28px', height: '28px', fontSize: '14px', display:'flex',alignItems:'center',justifyContent:'center' }}>−</button>
                      <span style={{ width: '24px', textAlign: 'center', fontSize: '12px' }}>{item.qty}</span>
                      <button onClick={() => updateQty(item.key, item.qty + 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', width: '28px', height: '28px', fontSize: '14px', display:'flex',alignItems:'center',justifyContent:'center' }}>+</button>
                    </div>
                    <button onClick={() => removeItem(item.key)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '11px', color: 'var(--text-muted)', padding: '0', letterSpacing: '0.04em' }}>Remove</button>
                  </div>
                </div>
                <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)', flexShrink: 0 }}>
                  PKR {(item.price * item.qty).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary */}
        {items.length > 0 && (
          <div style={{ padding: '20px 24px', borderTop: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>
              <span>Subtotal</span><span>PKR {subtotal.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>
              <span>Shipping</span>
              <span style={{ color: shipping === 0 ? '#286858' : undefined }}>{shipping === 0 ? 'Free' : `PKR ${shipping}`}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <span style={{ fontFamily: 'var(--serif)', fontSize: '18px' }}>Total</span>
              <span style={{ fontFamily: 'var(--serif)', fontSize: '18px', color: 'var(--accent)' }}>PKR {(subtotal + shipping).toLocaleString()}</span>
            </div>
            {shipping > 0 && (
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '14px', textAlign: 'center' }}>
                Add PKR {(3000 - subtotal).toLocaleString()} for free shipping
              </p>
            )}
            <Button fullWidth>Proceed to Checkout</Button>
          </div>
        )}
      </div>
    </>
  );
}