import { useState } from 'react';
import Button from '../components/ui/Button';
import FormField from '../components/ui/FormField';
import { CheckIcon } from '../components/ui/Icons';

const REASONS = ['General Enquiry','Order Support','Custom Lab','Wholesale','Press & Media','Other'];

export default function ContactPage() {
  const [form,      setForm]      = useState({ name: '', email: '', phone: '', reason: 'General Enquiry', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    // TODO: contactService.send(form)
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div style={{ paddingTop: 'var(--nav-h)', background: 'var(--bg)', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: 'var(--bg-white)', borderBottom: '1px solid var(--border)', padding: 'var(--s8) var(--s7)' }}>
        <div className="container" style={{ padding: 0 }}>
          <p className="section-eyebrow">Contact</p>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(36px,5vw,60px)', fontWeight: 300, color: 'var(--text-primary)' }}>
            Let's Talk
          </h1>
        </div>
      </div>

      <div className="container" style={{ padding: 'var(--s8) var(--s7)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--s9)', alignItems: 'start' }}>

          {/* Left — Info */}
          <div>
            {/* WhatsApp */}
            <div style={{ background: 'var(--bg-white)', border: '1px solid var(--border)', borderRadius: '2px', padding: 'var(--s5)', marginBottom: 'var(--s4)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 'var(--s3)' }}>Fastest Response</div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: '18px', fontWeight: 400, color: 'var(--text-primary)', marginBottom: 'var(--s2)' }}>WhatsApp</div>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 300, lineHeight: 1.65, marginBottom: 'var(--s4)' }}>
                For orders, custom requests, and urgent enquiries — WhatsApp is the fastest way to reach us.
              </p>
              <Button variant="accent" fullWidth onClick={() => window.open('https://wa.me/923001234567', '_blank')}>
                Open WhatsApp
              </Button>
            </div>

            {/* Contact details */}
            {[
              { label: 'Email',    value: 'hello@esibha.com', href: 'mailto:hello@esibha.com' },
              { label: 'Instagram',value: '@esibha.pk',       href: 'https://instagram.com/esibha.pk' },
              { label: 'Location', value: 'Lahore, Pakistan', href: null },
            ].map(({ label, value, href }) => (
              <div key={label} style={{ marginBottom: 'var(--s4)', paddingBottom: 'var(--s4)', borderBottom: '1px solid var(--border-soft)' }}>
                <div style={{ fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px' }}>{label}</div>
                {href ? (
                  <a href={href} target="_blank" rel="noreferrer" style={{ fontSize: '14px', color: 'var(--accent)', fontWeight: 400 }}>{value}</a>
                ) : (
                  <div style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 300 }}>{value}</div>
                )}
              </div>
            ))}

            {/* Hours */}
            <div style={{ background: 'var(--bg-subtle)', borderRadius: '2px', padding: 'var(--s4)', marginTop: 'var(--s2)' }}>
              <div style={{ fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 'var(--s3)' }}>Response Hours</div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.7, fontWeight: 300 }}>
                Mon – Sat: 10am – 8pm PKT<br />
                Sunday: 12pm – 6pm PKT<br />
                WhatsApp responses within 2 hours.
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div style={{ background: 'var(--bg-white)', border: '1px solid var(--border)', borderRadius: '2px', padding: 'var(--s7)', boxShadow: 'var(--shadow-sm)' }}>
            {!submitted ? (
              <>
                <h2 style={{ fontFamily: 'var(--serif)', fontSize: '26px', fontWeight: 300, color: 'var(--text-primary)', marginBottom: 'var(--s6)' }}>
                  Send a Message
                </h2>
                <form onSubmit={handleSubmit}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--s4)' }}>
                    <FormField label="Full Name" name="name" value={form.name}
                      onChange={e => set('name', e.target.value)} placeholder="Your name" required />
                    <FormField label="Email" name="email" type="email" value={form.email}
                      onChange={e => set('email', e.target.value)} placeholder="you@email.com" required />
                  </div>
                  <FormField label="WhatsApp (optional)" name="phone" type="tel" value={form.phone}
                    onChange={e => set('phone', e.target.value)} placeholder="+92 3XX XXXXXXX" />

                  {/* Reason select */}
                  <div style={{ marginBottom: 'var(--s5)' }}>
                    <label style={{ display: 'block', fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '7px' }}>
                      Reason
                    </label>
                    <select value={form.reason} onChange={e => set('reason', e.target.value)} style={{
                      width: '100%', padding: '11px 14px',
                      background: 'var(--bg-white)', border: '1px solid var(--border)',
                      borderRadius: '2px', color: 'var(--text-primary)',
                      fontSize: '14px', fontFamily: 'var(--sans)', outline: 'none', cursor: 'pointer',
                    }}>
                      {REASONS.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>

                  <FormField label="Message" name="message" as="textarea" rows={5}
                    value={form.message} onChange={e => set('message', e.target.value)}
                    placeholder="Tell us how we can help..." required />

                  <Button type="submit" fullWidth size="lg" disabled={loading}>
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: 'var(--s9) 0' }}>
                <div style={{
                  width: '56px', height: '56px', borderRadius: '50%',
                  background: 'var(--accent-light)', border: '1px solid var(--accent)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto var(--s5)', color: 'var(--accent)',
                }}>
                  <CheckIcon size={24} />
                </div>
                <h2 style={{ fontFamily: 'var(--serif)', fontSize: '28px', fontWeight: 300, color: 'var(--text-primary)', marginBottom: 'var(--s3)' }}>
                  Message Sent
                </h2>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.75, fontWeight: 300, marginBottom: 'var(--s6)' }}>
                  Thank you, {form.name}. We'll be in touch within 24 hours.
                </p>
                <Button variant="secondary" onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', reason: 'General Enquiry', message: '' }); }}>
                  Send Another
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}