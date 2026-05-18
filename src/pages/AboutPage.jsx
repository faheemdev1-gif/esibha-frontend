import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';

const STATS = [
  { number: '2024',  label: 'Founded'        },
  { number: '8+',    label: 'Signature Scents'},
  { number: '1,000+',label: 'Happy Clients'  },
  { number: '3',     label: 'Countries'      },
];

const VALUES = [
  {
    symbol: '◈',
    title: 'Authentic Ingredients',
    body: 'We source saffron from Iran, oud from Myanmar, and ambergris from the Atlantic — the same raw materials used by the houses we admire.',
  },
  {
    symbol: '◇',
    title: 'Transparent Craft',
    body: 'Every fragrance tells you its top, heart, and base notes. You know exactly what you\'re wearing and why it works.',
  },
  {
    symbol: '◆',
    title: 'Accessible Luxury',
    body: 'We believe extraordinary fragrance should not be a privilege. Our prices reflect craft, not status.',
  },
  {
    symbol: '◉',
    title: 'Made in Pakistan',
    body: 'Our perfumers are based in Lahore. We are proud to build a world-class fragrance house from the ground up, here at home.',
  },
];

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div style={{ paddingTop: 'var(--nav-h)', background: 'var(--bg)' }}>

      {/* ── Hero ──────────────────────────────────────────── */}
      <div style={{ background: 'var(--bg-white)', borderBottom: '1px solid var(--border)', padding: 'var(--s10) var(--s7)', textAlign: 'center' }}>
        <p className="fade-up d1 section-eyebrow" style={{ textAlign: 'center' }}>Our Story</p>
        <h1 className="fade-up d2" style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(40px,6vw,80px)', fontWeight: 300, lineHeight: 1.1, color: 'var(--text-primary)', maxWidth: '800px', margin: '0 auto var(--s4)' }}>
          Born from a love<br />
          <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>of extraordinary scent.</em>
        </h1>
        <div className="fade-up d3" style={{ width: '40px', height: '1px', background: 'var(--accent)', margin: '0 auto' }} />
      </div>

      {/* ── Story ─────────────────────────────────────────── */}
      <section style={{ padding: 'var(--s10) 0', background: 'var(--bg-white)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 var(--s7)' }}>
          {[
            { text: 'eSibha was founded on a single belief: that the world\'s most extraordinary fragrances should not be reserved for the few.', large: true },
            { text: 'We study the finest creations from Maison Francis Kurkdjian, Tom Ford, Byredo, and Creed — then recreate them with the same raw materials, the same obsessive attention to molecular structure, at a fraction of the price.' },
            { text: 'Every bottle we produce is a promise: that luxury is not a price point. It is a feeling. And that feeling belongs to everyone who knows what they want.' },
            { text: 'Our team of perfumers is based in Pakistan, sourcing ingredients globally — saffron from Iran, oud from Myanmar, ambergris from the Atlantic. We believe in transparency, in craftsmanship, and in the quiet power of a scent that is unmistakably yours.' },
          ].map(({ text, large }, i) => (
            <p key={i} style={{
              fontFamily: large ? 'var(--serif)' : 'var(--sans)',
              fontSize: large ? '22px' : '16px',
              fontWeight: 300,
              color: large ? 'var(--text-primary)' : 'var(--text-secondary)',
              lineHeight: 1.85,
              marginBottom: 'var(--s6)',
              fontStyle: large ? 'italic' : 'normal',
            }}>
              {text}
            </p>
          ))}
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────── */}
      <section style={{ background: 'var(--bg-accent)', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ padding: 'var(--s8) var(--s7)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: 'var(--border)' }}>
            {STATS.map(({ number, label }) => (
              <div key={label} style={{ background: 'var(--bg-accent)', padding: 'var(--s7)', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(36px,4vw,52px)', fontWeight: 300, color: 'var(--accent)', marginBottom: 'var(--s2)' }}>
                  {number}
                </div>
                <div style={{ fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ────────────────────────────────────────── */}
      <section style={{ padding: 'var(--s9) 0', background: 'var(--bg-white)', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ padding: 'var(--s7)' }}>
          <p className="section-eyebrow" style={{ textAlign: 'center', marginBottom: 'var(--s3)' }}>What We Stand For</p>
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: 'var(--s8)' }}>Our Values</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--s5)' }}>
            {VALUES.map(v => (
              <div key={v.title} style={{ borderTop: '2px solid var(--accent)', paddingTop: 'var(--s5)' }}>
                <div style={{ fontSize: '22px', color: 'var(--accent)', marginBottom: 'var(--s4)', opacity: 0.7 }}>{v.symbol}</div>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: '18px', fontWeight: 400, color: 'var(--text-primary)', marginBottom: 'var(--s3)', lineHeight: 1.3 }}>{v.title}</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.75, fontWeight: 300 }}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team note ─────────────────────────────────────── */}
      <section style={{ padding: 'var(--s9) 0', background: 'var(--bg)' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', padding: '0 var(--s7)', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--serif)', fontSize: '26px', fontWeight: 300, color: 'var(--text-primary)', lineHeight: 1.5, marginBottom: 'var(--s6)', fontStyle: 'italic' }}>
            "We started eSibha because we were tired of paying thousands for a scent that costs hundreds to make. And we knew we weren't alone."
          </p>
          <div style={{ fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 'var(--s7)' }}>
            — The eSibha Team, Lahore
          </div>
          <div style={{ display: 'flex', gap: 'var(--s4)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button onClick={() => navigate('/shop')}>Explore the Collection</Button>
            <Button variant="ghost" onClick={() => navigate('/contact')}>Get in Touch</Button>
          </div>
        </div>
      </section>

    </div>
  );
}