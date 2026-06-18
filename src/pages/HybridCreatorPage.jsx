
import { useState, useEffect } from 'react';
import Button from '../components/ui/Button';
import BottleSVG from '../components/ui/BottleSVG';
import FamilyTag from '../components/ui/FamilyTag';
import FormField from '../components/ui/FormField';
import api from '../api/api';

export default function HybridCreatorPage() {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const [scentA, setScentA] = useState(null);
  const [scentB, setScentB] = useState(null);
  const [ratio, setRatio] = useState(50);
  const [hybridName, setHybridName] = useState('');
  const [size, setSize] = useState('30ml');
  const [contact, setContact] = useState({ name: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [picking, setPicking] = useState(null);

  const sizes = [
    { label: '30ml', price: 3200 },
    { label: '50ml', price: 4800 },
    { label: '100ml', price: 7800 },
  ];

  const price = sizes.find(s => s.label === size)?.price ?? 3200;
  const canSubmit = scentA && scentB && hybridName && contact.name && contact.phone && !submitting;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/products');
        setProducts(res.data.data || []);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSubmit = async () => {
    if (!canSubmit) return;

    try {
      setSubmitting(true);

      const payload = {
        scentA: {
          productId: scentA._id,
          name: scentA.name,
          slug: scentA.slug,
          family: scentA.family,
        },
        scentB: {
          productId: scentB._id,
          name: scentB.name,
          slug: scentB.slug,
          family: scentB.family,
        },
        ratio,
        hybridName,
        size,
        price,
        contact,
      };

      await api.post('/hybrid-orders', payload);

      setSubmitted(true);
      setScentA(null);
      setScentB(null);
      setRatio(50);
      setHybridName('');
      setSize('30ml');
      setContact({ name: '', phone: '' });
    } catch (error) {
      console.error('Failed to place hybrid order:', error);
      alert('Failed to place hybrid order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ paddingTop: 'var(--nav-h)', background: 'var(--bg)', minHeight: '100vh' }}>
      <div style={{ background: 'var(--bg-white)', borderBottom: '1px solid var(--border)', padding: 'var(--s8) var(--s7)', textAlign: 'center' }}>
        <p className="section-eyebrow" style={{ textAlign: 'center' }}>Hybrid Creator</p>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(36px,5vw,60px)', fontWeight: 300, color: 'var(--text-primary)', marginBottom: 'var(--s3)' }}>
          Blend Two Worlds<br /><em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Into One.</em>
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '480px', margin: '0 auto', lineHeight: 1.75, fontWeight: 300 }}>
          Pick two fragrances from our collection. Set your ratio. We blend them into your unique hybrid.
        </p>
      </div>

      <div className="container" style={{ padding: 'var(--s8) 0' }}>
        <div className="three-area" style={{ marginBottom: 'var(--s7)' }}>
          <ScentSlot label="Scent A" scent={scentA} onPick={() => setPicking('A')} onClear={() => setScentA(null)} ratio={ratio} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '80px' }}>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '28px', color: 'var(--text-muted)', opacity: 0.4 }}>×</div>
          </div>
          <ScentSlot label="Scent B" scent={scentB} onPick={() => setPicking('B')} onClear={() => setScentB(null)} ratio={100 - ratio} />
        </div>

        {scentA && scentB && (
          <div className="fade-in" style={{ background: 'var(--bg-white)', border: '1px solid var(--border)', borderRadius: '2px', padding: 'var(--s6)', marginBottom: 'var(--s5)' }}>
            <div style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 'var(--s4)', textAlign: 'center' }}>
              Blend Ratio
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s4)', marginBottom: 'var(--s3)', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '12px', color: 'var(--accent)', minWidth: '70px', textAlign: 'right', fontWeight: 500 }}>
                {scentA.name} {ratio}%
              </span>

              <input
                type="range"
                min={10}
                max={90}
                step={5}
                value={ratio}
                onChange={e => setRatio(Number(e.target.value))}
                style={{ flex: 1, accentColor: 'var(--accent)', height: '4px', cursor: 'pointer' }}
              />

              <span style={{ fontSize: '12px', color: 'var(--accent)', minWidth: '70px', fontWeight: 500 }}>
                {100 - ratio}% {scentB.name}
              </span>
            </div>

            <div style={{ height: '6px', borderRadius: '3px', background: 'var(--bg-subtle)', overflow: 'hidden' }}>
              <div style={{ width: `${ratio}%`, height: '100%', background: 'var(--accent)', borderRadius: '3px', transition: 'width 0.1s' }} />
            </div>
          </div>
        )}

        {scentA && scentB && (
          <div className="fade-in" style={{ background: 'var(--bg-white)', border: '1px solid var(--border)', borderRadius: '2px', padding: 'var(--s6)', marginBottom: 'var(--s5)' }}>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '22px', fontWeight: 300, marginBottom: 'var(--s5)' }}>
              Name Your Hybrid
            </h3>

            <FormField
              label="Hybrid Name"
              name="hybrid-name"
              value={hybridName}
              onChange={e => setHybridName(e.target.value)}
              placeholder="e.g. Sable Noir, Bleu Rose..."
              required
            />

            <div style={{ marginBottom: 'var(--s5)' }}>
              <div style={{ fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 'var(--s3)' }}>
                Choose Size
              </div>

              <div style={{ display: 'flex', gap: 'var(--s3)', flexWrap: 'wrap' }}>
                {sizes.map(s => (
                  <button
                    key={s.label}
                    onClick={() => setSize(s.label)}
                    style={{
                      flex: 1,
                      padding: 'var(--s3)',
                      background: size === s.label ? 'var(--accent-light)' : 'transparent',
                      border: `1px solid ${size === s.label ? 'var(--accent)' : 'var(--border)'}`,
                      color: size === s.label ? 'var(--accent-dark)' : 'var(--text-secondary)',
                      borderRadius: '2px',
                      cursor: 'pointer',
                      fontFamily: 'var(--sans)',
                      textAlign: 'center',
                      transition: 'all var(--fast)',
                    }}
                  >
                    <div style={{ fontSize: '13px' }}>{s.label}</div>
                    <div style={{ fontSize: '10px', marginTop: '2px', opacity: 0.8 }}>
                      PKR {s.price.toLocaleString()}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid-cols-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--s4)' }}>
              <FormField
                label="Your Name"
                name="cname"
                value={contact.name}
                onChange={e => setContact(c => ({ ...c, name: e.target.value }))}
                placeholder="Full name"
                required
              />

              <FormField
                label="WhatsApp"
                name="phone"
                type="tel"
                value={contact.phone}
                onChange={e => setContact(c => ({ ...c, phone: e.target.value }))}
                placeholder="+92 3XX XXXXXXX"
                required
              />
            </div>

            <Button fullWidth size="lg" variant="accent" disabled={!canSubmit} onClick={handleSubmit}>
              {submitting ? 'Placing Order...' : `Place Hybrid Order — PKR ${price.toLocaleString()}`}
            </Button>
          </div>
        )}

        {submitted && (
          <div className="fade-in" style={{ background: 'var(--accent-light)', border: '1px solid var(--accent)', borderRadius: '2px', padding: 'var(--s6)', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '22px', color: 'var(--text-primary)', marginBottom: 'var(--s3)' }}>
              Hybrid Order Placed ✓
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 300 }}>
              We'll confirm your blend and pricing on WhatsApp within 24 hours.
            </p>
          </div>
        )}

        {picking && (
          <div
            style={{ position: 'fixed', inset: 0, zIndex: 400, background: 'rgba(17,19,24,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--s5)' }}
            onClick={() => setPicking(null)}
          >
            <div
              style={{ background: 'var(--bg-white)', border: '1px solid var(--border)', borderRadius: '2px', padding: 'var(--s6)', maxWidth: '700px', width: '100%', maxHeight: '80vh', overflowY: 'auto', boxShadow: 'var(--shadow-lg)' }}
              onClick={e => e.stopPropagation()}
            >
              <div style={{ fontFamily: 'var(--serif)', fontSize: '22px', fontWeight: 300, marginBottom: 'var(--s5)' }}>
                Select Scent {picking}
              </div>

              {loadingProducts ? (
                <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Loading fragrances...</p>
              ) : products.length === 0 ? (
                <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>No fragrances found.</p>
              ) : (
                <div className="picker-grid">
                  {products.map(p => {
                    const isOther = (picking === 'A' ? scentB : scentA)?._id === p._id;

                    return (
                      <button
                        key={p._id}
                        disabled={isOther}
                        onClick={() => {
                          if (picking === 'A') setScentA(p);
                          else setScentB(p);

                          setPicking(null);
                        }}
                        style={{
                          background: 'var(--bg)',
                          border: '1px solid var(--border)',
                          borderRadius: '2px',
                          padding: 'var(--s4)',
                          cursor: isOther ? 'not-allowed' : 'pointer',
                          opacity: isOther ? 0.4 : 1,
                          textAlign: 'center',
                          transition: 'all var(--fast)',
                          fontFamily: 'var(--sans)',
                        }}
                        onMouseEnter={e => !isOther && (e.currentTarget.style.borderColor = 'var(--accent)')}
                        onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                      >
                        {p.image ? (
                          <img
                            src={p.image}
                            alt={p.name}
                            style={{ width: '70px', height: '80px', objectFit: 'contain' }}
                          />
                        ) : (
                          <BottleSVG family={p.family} size={60} />
                        )}

                        <div style={{ fontFamily: 'var(--serif)', fontSize: '14px', marginTop: 'var(--s2)', color: 'var(--text-primary)' }}>
                          {p.name}
                        </div>

                        <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>
                          {p.family}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ScentSlot({ label, scent, onPick, onClear, ratio }) {
  return (
    <div style={{ background: 'var(--bg-white)', border: '1px solid var(--border)', borderRadius: '2px', padding: 'var(--s5)', textAlign: 'center', minHeight: '220px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 'var(--s4)' }}>
        {label}
      </div>

      {scent ? (
        <>
          {scent.image ? (
            <img
              src={scent.image}
              alt={scent.name}
              style={{ width: '90px', height: '110px', objectFit: 'contain' }}
            />
          ) : (
            <BottleSVG family={scent.family} size={80} />
          )}

          <div style={{ fontFamily: 'var(--serif)', fontSize: '16px', marginTop: 'var(--s3)', color: 'var(--text-primary)' }}>
            {scent.name}
          </div>

          <FamilyTag family={scent.family} />

          {ratio !== undefined && (
            <div style={{ marginTop: 'var(--s3)', fontSize: '22px', fontFamily: 'var(--serif)', color: 'var(--accent)', fontWeight: 300 }}>
              {ratio}%
            </div>
          )}

          <button onClick={onClear} style={{ marginTop: 'var(--s3)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
            Change
          </button>
        </>
      ) : (
        <>
          <div style={{ width: '80px', height: '116px', background: 'var(--bg-subtle)', borderRadius: '4px', marginBottom: 'var(--s4)', border: '1px dashed var(--border)' }} />
          <Button variant="secondary" size="sm" onClick={onPick}>
            Choose Scent
          </Button>
        </>
      )}
    </div>
  );
}
