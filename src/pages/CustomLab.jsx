import { useState } from 'react';
import { LAB_NOTES } from '../data/seed';
import Button from '../components/ui/Button';
import FormField from '../components/ui/FormField';
import { CheckIcon, FlaskIcon } from '../components/ui/Icons';

const MAX = { top: 3, heart: 3, base: 2 };

const SIZES = [
  { label: '30ml', price: 2800 },
  { label: '50ml', price: 4200 },
  { label: '100ml', price: 6800 },
];

export default function CustomLabPage() {
  const [selected, setSelected]   = useState({ top: [], heart: [], base: [] });
  const [size,     setSize]       = useState('30ml');
  const [name,     setName]       = useState('');
  const [step,     setStep]       = useState(1); // 1=build, 2=details, 3=confirm
  const [contact,  setContact]    = useState({ name: '', phone: '', notes: '' });

  const toggle = (layer, note) => {
    setSelected(prev => {
      const cur = prev[layer];
      if (cur.includes(note)) return { ...prev, [layer]: cur.filter(n => n !== note) };
      if (cur.length >= MAX[layer]) return prev; // max reached
      return { ...prev, [layer]: [...cur, note] };
    });
  };

  const totalSelected = Object.values(selected).flat().length;
  const price = SIZES.find(s => s.label === size)?.price ?? 2800;
  const canProceed = selected.top.length >= 1 && selected.heart.length >= 1 && selected.base.length >= 1;

  return (
    <div style={{ paddingTop: 'var(--nav-h)', background: 'var(--bg)', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: 'var(--bg-white)', borderBottom: '1px solid var(--border)', padding: 'var(--s8) var(--s7)', textAlign: 'center' }}>
        <p className="section-eyebrow" style={{ textAlign: 'center' }}>Custom Perfume Lab</p>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(36px,5vw,60px)', fontWeight: 300, color: 'var(--text-primary)', marginBottom: 'var(--s3)' }}>
          Build Your <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Signature Scent</em>
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '480px', margin: '0 auto', lineHeight: 1.75, fontWeight: 300 }}>
          Choose your notes, name your creation, and we'll craft it by hand.
        </p>

        {/* Step indicator */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--s3)', marginTop: 'var(--s6)' }}>
          {['Build Your Blend', 'Name & Size', 'Confirm'].map((s, i) => {
            const idx = i + 1;
            const active = step === idx;
            const done   = step > idx;
            return (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 'var(--s3)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s2)' }}>
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '50%',
                    background: done ? 'var(--accent)' : active ? 'var(--text-primary)' : 'var(--bg-subtle)',
                    border: `1px solid ${active || done ? 'transparent' : 'var(--border)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '11px', fontWeight: 500,
                    color: active || done ? '#fff' : 'var(--text-muted)',
                    transition: 'all var(--base)',
                  }}>
                    {done ? <CheckIcon size={13} /> : idx}
                  </div>
                  <span style={{ fontSize: '11px', letterSpacing: '0.08em', color: active ? 'var(--text-primary)' : 'var(--text-muted)' }}>{s}</span>
                </div>
                {i < 2 && <div style={{ width: '32px', height: '1px', background: 'var(--border)' }} />}
              </div>
            );
          })}
        </div>
      </div>

  <div className="container" style={{ padding: 'var(--s8) 0' }}>

        {/* ── STEP 1: Build ─────────────────────────────────── */}
        {step === 1 && (
          <div className="fade-in">
            {/* Fragrance pyramid visual */}
            <div className="grid-cols-3" style={{ marginBottom: 'var(--s7)' }}>
              {[
                { layer: 'top',   label: 'Top Notes',   sub: `Choose up to ${MAX.top}`, hint: 'First impression · 15–30 min' },
                { layer: 'heart', label: 'Heart Notes',  sub: `Choose up to ${MAX.heart}`, hint: 'The soul · 30 min–4 hrs' },
                { layer: 'base',  label: 'Base Notes',   sub: `Choose up to ${MAX.base}`, hint: 'The memory · 4–12 hrs' },
              ].map(({ layer, label, sub, hint }) => (
                <div key={layer} style={{ background: 'var(--bg-white)', border: '1px solid var(--border)', borderRadius: '2px', padding: 'var(--s5)' }}>
                  <div style={{ marginBottom: 'var(--s4)' }}>
                    <div style={{ fontFamily: 'var(--serif)', fontSize: '18px', fontWeight: 400, color: 'var(--text-primary)', marginBottom: '2px' }}>{label}</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>{sub} · {hint}</div>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--s2)' }}>
                    {LAB_NOTES[layer].map(note => {
                      const active = selected[layer].includes(note);
                      const maxed  = !active && selected[layer].length >= MAX[layer];
                      return (
                        <button key={note} onClick={() => toggle(layer, note)} disabled={maxed} style={{
                          padding: '5px 12px', borderRadius: '999px',
                          border: `1px solid ${active ? 'var(--accent)' : 'var(--border)'}`,
                          background: active ? 'var(--accent)' : 'transparent',
                          color: active ? '#fff' : maxed ? 'var(--text-muted)' : 'var(--text-secondary)',
                          fontSize: '12px', fontFamily: 'var(--sans)', cursor: maxed ? 'not-allowed' : 'pointer',
                          opacity: maxed ? 0.45 : 1,
                          transition: 'all var(--fast)',
                        }}>
                          {note}
                        </button>
                      );
                    })}
                  </div>
                  {selected[layer].length > 0 && (
                    <div style={{ marginTop: 'var(--s4)', fontSize: '11px', color: 'var(--accent)', letterSpacing: '0.06em' }}>
                      Selected: {selected[layer].join(', ')}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Live preview */}
            {totalSelected > 0 && (
              <div className="fade-in" style={{ background: 'var(--bg-accent)', border: '1px solid var(--border)', borderRadius: '2px', padding: 'var(--s5)', marginBottom: 'var(--s5)', display: 'flex', gap: 'var(--s4)', alignItems: 'center', flexWrap: 'wrap' }}>
                <FlaskIcon size={16} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                <div style={{ flex: 1, fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  <strong style={{ color: 'var(--text-primary)' }}>Your blend so far:</strong>{' '}
                  {[...selected.top, ...selected.heart, ...selected.base].join(' · ')}
                </div>
              </div>
            )}

            <div className="form-actions" style={{ justifyContent: 'flex-end' }}>
              <div />
              <Button onClick={() => setStep(2)} disabled={!canProceed} size="lg">
                Next: Name Your Scent →
              </Button>
            </div>
            {!canProceed && (
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', textAlign: 'right', marginTop: 'var(--s2)' }}>
                Select at least 1 note from each layer to continue.
              </p>
            )}
          </div>
        )}

        {/* ── STEP 2: Details ───────────────────────────────── */}
        {step === 2 && (
          <div className="fade-in" style={{ background: 'var(--bg-white)', border: '1px solid var(--border)', borderRadius: '2px', padding: 'var(--s7)' }}>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: '28px', fontWeight: 300, marginBottom: 'var(--s6)' }}>Name Your Creation</h2>
            <FormField label="Name Your Fragrance" name="perfume-name" value={name}
              onChange={e => setName(e.target.value)} placeholder="e.g. Midnight Garden, Sable Blanc..." required />

            <div style={{ marginBottom: 'var(--s6)' }}>
              <div style={{ fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 'var(--s3)' }}>Choose Size</div>
              <div style={{ display: 'flex', gap: 'var(--s3)', flexWrap: 'wrap' }}>
                {SIZES.map(s => (
                  <button key={s.label} onClick={() => setSize(s.label)} style={{
                    flex: 1, padding: 'var(--s4)',
                    background: size === s.label ? 'var(--accent-light)' : 'transparent',
                    border: `1px solid ${size === s.label ? 'var(--accent)' : 'var(--border)'}`,
                    color: size === s.label ? 'var(--accent-dark)' : 'var(--text-secondary)',
                    borderRadius: '2px', cursor: 'pointer', fontFamily: 'var(--sans)', textAlign: 'center',
                    transition: 'all var(--fast)',
                  }}>
                    <div style={{ fontSize: '14px', fontWeight: 400 }}>{s.label}</div>
                    <div style={{ fontSize: '11px', marginTop: '3px', opacity: 0.8 }}>PKR {s.price.toLocaleString()}</div>
                  </button>
                ))}
              </div>
            </div>

            <FormField label="Your Name" name="cname" value={contact.name}
              onChange={e => setContact(c => ({ ...c, name: e.target.value }))} placeholder="Full name" required />
            <FormField label="WhatsApp" name="phone" type="tel" value={contact.phone}
              onChange={e => setContact(c => ({ ...c, phone: e.target.value }))} placeholder="+92 3XX XXXXXXX" required />
            <FormField label="Special Instructions (optional)" name="notes" as="textarea" rows={3}
              value={contact.notes} onChange={e => setContact(c => ({ ...c, notes: e.target.value }))}
              placeholder="Anything specific about strength, longevity, occasion..." />

            <div className="form-actions" style={{ marginTop: 'var(--s4)' }}>
              <Button variant="secondary" onClick={() => setStep(1)}>← Back</Button>
              <Button onClick={() => setStep(3)} disabled={!name || !contact.name || !contact.phone} size="lg">
                Review Order →
              </Button>
            </div>
          </div>
        )}

        {/* ── STEP 3: Confirm ───────────────────────────────── */}
        {step === 3 && (
          <div className="fade-in" style={{ background: 'var(--bg-white)', border: '1px solid var(--border)', borderRadius: '2px', padding: 'var(--s7)' }}>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: '28px', fontWeight: 300, marginBottom: 'var(--s6)' }}>Review Your Order</h2>

            <div style={{ border: '1px solid var(--border)', borderRadius: '2px', padding: 'var(--s5)', marginBottom: 'var(--s5)', background: 'var(--bg)' }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: '20px', marginBottom: 'var(--s4)', color: 'var(--text-primary)' }}>"{name}"</div>
              {[['Top Notes', selected.top], ['Heart Notes', selected.heart], ['Base Notes', selected.base]].map(([label, notes]) => (
                <div key={label} className="row-between" style={{ gap: 'var(--s3)', marginBottom: 'var(--s2)', fontSize: '13px' }}>
                  <span className="label-col" style={{ color: 'var(--text-muted)', fontWeight: 300 }}>{label}</span>
                  <span style={{ color: 'var(--text-secondary)' }}>{notes.join(', ')}</span>
                </div>
              ))}
              <div style={{ marginTop: 'var(--s4)', paddingTop: 'var(--s4)', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{size} · Handcrafted</span>
                <span style={{ fontFamily: 'var(--serif)', fontSize: '18px', color: 'var(--accent)' }}>PKR {price.toLocaleString()}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 'var(--s3)', justifyContent: 'space-between' }}>
              <Button variant="secondary" onClick={() => setStep(2)}>← Back</Button>
              <Button variant="accent" size="lg" onClick={() => {
                // TODO: labService.submitOrder({ selected, size, name, contact })
                alert('Order placed! We will confirm on WhatsApp within 24 hours.');
              }}>
                Place Order — PKR {price.toLocaleString()}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}