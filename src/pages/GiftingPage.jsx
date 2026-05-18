import { useState } from 'react';
import { GIFT_PACKS } from '../data/seed';
import { useCartStore } from '../store';
import Button from '../components/ui/Button';
import { CheckIcon } from '../components/ui/Icons';

const WRAP_OPTIONS = [
  { id: 'classic', label: 'Classic White', desc: 'Matte white box with ivory ribbon',    price: 0   },
  { id: 'luxury',  label: 'Luxury Black',  desc: 'Matte black with gold foil & ribbon',  price: 350 },
  { id: 'custom',  label: 'Custom Print',  desc: 'Personalised label on the outer wrap', price: 550 },
];

export default function GiftingPage() {
  const [selectedWrap, setSelectedWrap] = useState('classic');
  const [message,      setMessage]      = useState('');
  const [added,        setAdded]        = useState(null);
  const addItem = useCartStore(s => s.addItem);

  const handleAdd = pack => {
    const wrapPrice = WRAP_OPTIONS.find(w => w.id === selectedWrap)?.price ?? 0;
    addItem({ ...pack, price: pack.price + wrapPrice, category: 'Gift Pack', family: 'Oud & Amber' }, 'Gift', 1);
    setAdded(pack.id);
    setTimeout(() => setAdded(null), 1800);
  };

  return (
    <div style={{ paddingTop: 'var(--nav-h)', background: 'var(--bg)', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: 'var(--bg-white)', borderBottom: '1px solid var(--border)', padding: 'var(--s8) var(--s7)', textAlign: 'center' }}>
        <p className="section-eyebrow" style={{ textAlign: 'center' }}>Gifting</p>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(36px,5vw,60px)', fontWeight: 300, color: 'var(--text-primary)', marginBottom: 'var(--s3)' }}>
          Give the Gift of <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Scent</em>
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '480px', margin: '0 auto', lineHeight: 1.75, fontWeight: 300 }}>
          Curated sets, beautiful packaging, and a personal message — all handled by us.
        </p>
      </div>

      <div className="container" style={{ padding: 'var(--s9) var(--s7)' }}>

        {/* ── Gift Sets ─────────────────────────────────────── */}
        <div style={{ marginBottom: 'var(--s9)' }}>
          <p className="section-eyebrow">Curated Sets</p>
          <h2 className="section-title" style={{ marginBottom: 'var(--s7)' }}>Choose Your Set</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--s5)' }}>
            {GIFT_PACKS.map(pack => (
              <div key={pack.id} style={{
                background: 'var(--bg-white)', border: '1px solid var(--border)',
                borderRadius: '2px', padding: 'var(--s6)', boxShadow: 'var(--shadow-sm)',
              }}>
                {/* Gift box illustration */}
                <div style={{
                  background: 'var(--bg-accent)', borderRadius: '2px',
                  height: '140px', marginBottom: 'var(--s5)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '36px', marginBottom: '4px' }}>◈</div>
                    <div style={{ fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent)' }}>eSibha Gift</div>
                  </div>
                </div>

                <h3 style={{ fontFamily: 'var(--serif)', fontSize: '20px', fontWeight: 400, color: 'var(--text-primary)', marginBottom: 'var(--s2)' }}>
                  {pack.name}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: 'var(--s4)', fontWeight: 300 }}>
                  {pack.description}
                </p>

                {/* Contents */}
                <div style={{ marginBottom: 'var(--s4)' }}>
                  {pack.contents.map(c => (
                    <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 'var(--s2)', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: 'var(--s1)' }}>
                      <span style={{ color: 'var(--accent)', fontSize: '10px' }}>✓</span> {c}
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--s4)' }}>
                  <span style={{ fontFamily: 'var(--serif)', fontSize: '20px', fontWeight: 300, color: 'var(--accent)' }}>
                    PKR {pack.price.toLocaleString()}
                  </span>
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>+ wrapping</span>
                </div>

                <Button fullWidth variant={added === pack.id ? 'accent' : 'primary'} onClick={() => handleAdd(pack)}>
                  {added === pack.id ? '✓ Added' : 'Add to Cart'}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* ── Wrapping Options ──────────────────────────────── */}
        <div style={{ marginBottom: 'var(--s9)' }}>
          <p className="section-eyebrow">Presentation</p>
          <h2 className="section-title" style={{ marginBottom: 'var(--s7)' }}>Choose Your Wrapping</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--s5)' }}>
            {WRAP_OPTIONS.map(w => (
              <button key={w.id} onClick={() => setSelectedWrap(w.id)} style={{
                background: 'var(--bg-white)',
                border: `1px solid ${selectedWrap === w.id ? 'var(--accent)' : 'var(--border)'}`,
                borderRadius: '2px', padding: 'var(--s5)', cursor: 'pointer', textAlign: 'left',
                transition: 'all var(--fast)', fontFamily: 'var(--sans)',
                boxShadow: selectedWrap === w.id ? 'var(--shadow-sm)' : 'none',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 'var(--s3)' }}>
                  <div style={{
                    width: '20px', height: '20px', borderRadius: '50%',
                    border: `1px solid ${selectedWrap === w.id ? 'var(--accent)' : 'var(--border)'}`,
                    background: selectedWrap === w.id ? 'var(--accent)' : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, transition: 'all var(--fast)',
                  }}>
                    {selectedWrap === w.id && <CheckIcon size={11} style={{ color: '#fff' }} />}
                  </div>
                  <span style={{ fontSize: '13px', color: 'var(--accent)', fontWeight: 400 }}>
                    {w.price === 0 ? 'Free' : `+PKR ${w.price}`}
                  </span>
                </div>
                <div style={{ fontFamily: 'var(--serif)', fontSize: '17px', fontWeight: 400, color: 'var(--text-primary)', marginBottom: '4px' }}>{w.label}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 300 }}>{w.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* ── Gift Message ──────────────────────────────────── */}
        <div style={{ background: 'var(--bg-white)', border: '1px solid var(--border)', borderRadius: '2px', padding: 'var(--s6)', maxWidth: '600px', marginBottom: 'var(--s7)' }}>
          <p className="section-eyebrow" style={{ marginBottom: 'var(--s4)' }}>Personal Message</p>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: 'var(--s4)', fontWeight: 300 }}>
            We'll include a handwritten card with your order.
          </p>
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Write your personal message here..."
            rows={4}
            maxLength={220}
            style={{
              width: '100%', padding: '12px 14px',
              background: 'var(--bg)', border: '1px solid var(--border)',
              borderRadius: '2px', resize: 'vertical',
              fontSize: '13px', fontFamily: 'var(--sans)', fontWeight: 300,
              color: 'var(--text-primary)', outline: 'none', lineHeight: 1.65,
            }}
            onFocus={e => e.target.style.borderColor = 'var(--accent)'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'}
          />
          <div style={{ textAlign: 'right', fontSize: '11px', color: 'var(--text-muted)', marginTop: 'var(--s2)' }}>
            {message.length}/220
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: 'var(--bg-accent)', border: '1px solid var(--border)', borderRadius: '2px', padding: 'var(--s7)', textAlign: 'center' }}>
          <h3 style={{ fontFamily: 'var(--serif)', fontSize: '26px', fontWeight: 300, color: 'var(--text-primary)', marginBottom: 'var(--s3)' }}>
            Need a Custom Gift?
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: 'var(--s5)', fontWeight: 300, lineHeight: 1.7 }}>
            Corporate orders, wedding favours, or personalised sets — we handle everything.
          </p>
          <Button variant="accent" size="lg" onClick={() => window.open('https://wa.me/923001234567', '_blank')}>
            WhatsApp Us
          </Button>
        </div>
      </div>
    </div>
  );
}