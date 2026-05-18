import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS, FINDER_LIBRARY } from '../data/seed';
import { useCartStore } from '../store';
import Button from '../components/ui/Button';
import FormField from '../components/ui/FormField';
import BottleSVG from '../components/ui/BottleSVG';
import FamilyTag from '../components/ui/FamilyTag';
import { SearchIcon, ArrowRight, CheckIcon } from '../components/ui/Icons';

export default function FragranceFinderPage() {
  const [query,     setQuery]     = useState('');
  const [result,    setResult]    = useState(null);
  const [notFound,  setNotFound]  = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form,      setForm]      = useState({ name: '', brand: '', phone: '' });
  const [adding,    setAdding]    = useState(false);

  const navigate = useNavigate();
  const addItem  = useCartStore(s => s.addItem);

  // Live search against library
  useEffect(() => {
    const q = query.toLowerCase().trim();
    if (q.length < 3) { setResult(null); setNotFound(false); return; }

    const matchKey = Object.keys(FINDER_LIBRARY).find(k => q.includes(k) || k.includes(q));
    if (matchKey) {
      const product = PRODUCTS.find(p => p.id === FINDER_LIBRARY[matchKey]);
      setResult(product || null);
      setNotFound(!product);
    } else {
      setResult(null);
      setNotFound(true);
    }
  }, [query]);

  const handleAdd = () => {
    if (!result) return;
    setAdding(true);
    addItem(result, '30ml', 1);
    setTimeout(() => setAdding(false), 1400);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    // TODO: finderService.request(form)
    setSubmitted(true);
  };

  return (
    <div style={{ paddingTop: 'var(--nav-h)', background: 'var(--bg)', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ background: 'var(--bg-white)', borderBottom: '1px solid var(--border)', padding: 'var(--s9) var(--s7)', textAlign: 'center' }}>
        <p className="fade-up d1 section-eyebrow" style={{ textAlign: 'center' }}>Fragrance Finder</p>
        <h1 className="fade-up d2" style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(40px,6vw,72px)', fontWeight: 300, lineHeight: 1.1, color: 'var(--text-primary)', marginBottom: 'var(--s4)' }}>
          Any Fragrance.<br />
          <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>On Demand.</em>
        </h1>
        <p className="fade-up d3" style={{ fontSize: '15px', color: 'var(--text-secondary)', maxWidth: '480px', margin: '0 auto', lineHeight: 1.75, fontWeight: 300 }}>
          If you can name it, we can find or recreate it.
        </p>
      </div>

      <div style={{ maxWidth: '680px', margin: '0 auto', padding: 'var(--s9) var(--s7)' }}>

        {/* ── OPTION A: Search ────────────────────────────── */}
        <div style={{ background: 'var(--bg-white)', border: '1px solid var(--border)', borderRadius: '2px', padding: 'var(--s6)', marginBottom: 'var(--s5)', boxShadow: 'var(--shadow-sm)' }}>
          <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 'var(--s4)' }}>
            Option A — Search Our Library
          </p>

          {/* Search input */}
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }}>
              <SearchIcon size={16} />
            </div>
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Type any designer fragrance name..."
              style={{
                width: '100%',
                padding: '13px 16px 13px 44px',
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                borderRadius: '2px',
                color: 'var(--text-primary)',
                fontSize: '14px',
                fontFamily: 'var(--sans)',
                fontWeight: 300,
                outline: 'none',
                transition: 'border-color var(--fast)',
              }}
              onFocus={e  => e.target.style.borderColor = 'var(--accent)'}
              onBlur={e   => e.target.style.borderColor = 'var(--border)'}
            />
          </div>

          {/* Suggestion chips */}
          <div style={{ display: 'flex', gap: 'var(--s2)', flexWrap: 'wrap', marginTop: 'var(--s3)' }}>
            {['Baccarat Rouge', 'Sauvage', 'Bleu de Chanel', 'Oud Wood', 'Mon Paris'].map(s => (
              <button key={s} onClick={() => setQuery(s)} style={{
                fontSize: '11px', padding: '4px 12px', borderRadius: '999px',
                border: '1px solid var(--border)', background: 'transparent',
                color: 'var(--text-muted)', cursor: 'pointer', fontFamily: 'var(--sans)',
                transition: 'all var(--fast)',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
              >{s}</button>
            ))}
          </div>

          {/* Found result */}
          {result && (
            <div className="fade-in" style={{
              marginTop: 'var(--s5)',
              border: '1px solid var(--accent)',
              borderRadius: '2px',
              background: 'var(--accent-light)',
              padding: 'var(--s4)',
              display: 'flex', alignItems: 'center', gap: 'var(--s4)',
            }}>
              <div style={{ background: 'var(--bg-white)', borderRadius: '2px', padding: 'var(--s3)', flexShrink: 0 }}>
                <BottleSVG family={result.family} size={60} />
              </div>
              <div style={{ flex: 1 }}>
                <FamilyTag family={result.family} />
                <div style={{ fontFamily: 'var(--serif)', fontSize: '18px', fontWeight: 400, color: 'var(--text-primary)', margin: '6px 0 2px' }}>{result.name}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Inspired by {result.inspo}</div>
                <div style={{ fontSize: '14px', color: 'var(--accent)', marginTop: '4px', fontWeight: 400 }}>
                  PKR {result.sizes[1].price.toLocaleString()} · 30ml
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s2)', flexShrink: 0 }}>
                <Button size="sm" variant="accent" onClick={handleAdd}>
                  {adding ? '✓ Added' : 'Add to Cart'}
                </Button>
                <Button size="sm" variant="secondary" onClick={() => navigate(`/product/${result.slug}`)}>
                  View
                </Button>
              </div>
            </div>
          )}

          {/* Not found hint */}
          {notFound && query.length >= 3 && (
            <div className="fade-in" style={{ marginTop: 'var(--s4)', fontSize: '13px', color: 'var(--text-muted)', textAlign: 'center', padding: 'var(--s4)', background: 'var(--bg)', borderRadius: '2px', border: '1px solid var(--border)' }}>
              Not in our library yet — request it below ↓
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="divider" style={{ margin: 'var(--s6) 0' }}>or</div>

        {/* ── OPTION B: Request form ───────────────────────── */}
        {!submitted ? (
          <div style={{ background: 'var(--bg-white)', border: '1px solid var(--border)', borderRadius: '2px', padding: 'var(--s6)', boxShadow: 'var(--shadow-sm)' }}>
            <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 'var(--s5)' }}>
              Option B — Request This Fragrance
            </p>
            <form onSubmit={handleSubmit}>
              <FormField label="Fragrance Name" name="name" value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="e.g. Aventus, Terre d'Hermès..." required />
              <FormField label="Brand" name="brand" value={form.brand}
                onChange={e => setForm(f => ({ ...f, brand: e.target.value }))}
                placeholder="e.g. Creed, Hermès, Tom Ford..." />
              <FormField label="WhatsApp Number" name="phone" type="tel" value={form.phone}
                onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                placeholder="+92 3XX XXXXXXX" required />
              <Button type="submit" fullWidth size="lg">
                Request This Fragrance <ArrowRight size={14} />
              </Button>
            </form>
          </div>
        ) : (
          /* Confirmation */
          <div className="fade-in" style={{
            background: 'var(--bg-white)', border: '1px solid var(--border)',
            borderRadius: '2px', padding: 'var(--s9)', textAlign: 'center',
            boxShadow: 'var(--shadow-sm)',
          }}>
            <div style={{
              width: '52px', height: '52px', borderRadius: '50%',
              background: 'var(--accent-light)', border: '1px solid var(--accent)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto var(--s5)', color: 'var(--accent)',
            }}>
              <CheckIcon size={22} />
            </div>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: '28px', fontWeight: 300, color: 'var(--text-primary)', marginBottom: 'var(--s3)' }}>
              Request Received
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.75, fontWeight: 300, marginBottom: 'var(--s6)' }}>
              Our team will confirm availability and pricing<br />on WhatsApp within 24 hours.
            </p>
            <Button variant="secondary" onClick={() => { setSubmitted(false); setForm({ name: '', brand: '', phone: '' }); setQuery(''); }}>
              Submit Another Request
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}