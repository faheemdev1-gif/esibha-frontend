
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store';
import Button from '../components/ui/Button';
import { ArrowLeft } from '../components/ui/Icons';
import api from '../api/api';
export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, clearCart } = useCartStore();

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal >= 3000 ? 0 : 200;
  const total = subtotal + shipping;

  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    address: '',
    notes: '',
    paymentMethod: 'COD',
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
const handleSubmit = async e => {
    e.preventDefault();

    const orderData = {
      customer: form,
      items,
      subtotal,
      shipping,
      total,
    };

   try {
  await api.post('/orders', orderData);

  clearCart();
  navigate('/order-success');
} catch (error) {
  console.error(error);
  alert('Failed to place order. Please try again.');
}
  };

  if (items.length === 0) {
    return (
      <div style={{ paddingTop: 'var(--nav-h)', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: '32px', fontWeight: 300, color: 'var(--text-muted)' }}>
            Your cart is empty
          </h1>
          <Button onClick={() => navigate('/shop')}>Back to Shop</Button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: 'var(--nav-h)', background: 'var(--bg)', minHeight: '100vh' }}>
      <div className="container" style={{ padding: 'var(--s7)' }}>
        <button
          onClick={() => navigate('/cart')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '12px', letterSpacing: '0.08em', marginBottom: 'var(--s5)' }}
        >
          <ArrowLeft size={13} /> Back to Cart
        </button>

        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(30px,4vw,46px)', fontWeight: 300, color: 'var(--text-primary)', marginBottom: 'var(--s7)' }}>
          Checkout
        </h1>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 'var(--s8)', alignItems: 'start' }}>
          <div style={{ background: 'var(--bg-white)', border: '1px solid var(--border)', padding: 'var(--s6)', borderRadius: '2px' }}>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: '24px', fontWeight: 300, marginBottom: 'var(--s5)' }}>
              Delivery Details
            </h2>

            <Input label="Full Name" name="fullName" value={form.fullName} onChange={handleChange} required />
            <Input label="Phone Number" name="phone" value={form.phone} onChange={handleChange} required />
            <Input label="Email Address" name="email" value={form.email} onChange={handleChange} />
            <Input label="City" name="city" value={form.city} onChange={handleChange} required />

            <label style={labelStyle}>Complete Address</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              required
              rows="4"
              style={inputStyle}
            />

            <label style={labelStyle}>Order Notes</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows="3"
              style={inputStyle}
              placeholder="Optional"
            />

            <div style={{ marginTop: 'var(--s5)' }}>
              <label style={labelStyle}>Payment Method</label>
              <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange} style={inputStyle}>
                <option value="COD">Cash on Delivery</option>
              </select>
            </div>
          </div>

          <div style={{ background: 'var(--bg-white)', border: '1px solid var(--border)', padding: 'var(--s6)', borderRadius: '2px', position: 'sticky', top: 'calc(var(--nav-h) + 20px)' }}>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: '22px', fontWeight: 300, marginBottom: 'var(--s5)', paddingBottom: 'var(--s4)', borderBottom: '1px solid var(--border)' }}>
              Order Summary
            </h2>

            {items.map(item => (
              <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--s3)', marginBottom: 'var(--s3)', fontSize: '13px', color: 'var(--text-secondary)' }}>
                <span>{item.name} · {item.size} × {item.qty}</span>
                <span>PKR {(item.price * item.qty).toLocaleString()}</span>
              </div>
            ))}

            <div style={{ borderTop: '1px solid var(--border)', marginTop: 'var(--s4)', paddingTop: 'var(--s4)' }}>
              <Row label="Subtotal" value={`PKR ${subtotal.toLocaleString()}`} />
              <Row label="Shipping" value={shipping === 0 ? 'Free' : `PKR ${shipping}`} />
              <Row label="Total" value={`PKR ${total.toLocaleString()}`} total />
            </div>

            <Button fullWidth size="lg" type="submit">
              Place Order
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div style={{ marginBottom: 'var(--s4)' }}>
      <label style={labelStyle}>{label}</label>
      <input {...props} style={inputStyle} />
    </div>
  );
}

function Row({ label, value, total = false }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--s3)', fontSize: total ? '18px' : '13px', color: total ? 'var(--accent)' : 'var(--text-secondary)', fontFamily: total ? 'var(--serif)' : 'var(--sans)' }}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

const labelStyle = {
  display: 'block',
  fontSize: '10px',
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'var(--text-muted)',
  marginBottom: '8px',
};

const inputStyle = {
  width: '100%',
  padding: '12px 14px',
  border: '1px solid var(--border)',
  borderRadius: '2px',
  background: 'var(--bg)',
  color: 'var(--text-primary)',
  fontFamily: 'var(--sans)',
  fontSize: '14px',
  outline: 'none',
  marginBottom: 'var(--s4)',
};

