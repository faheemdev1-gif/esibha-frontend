import { Link } from 'react-router-dom';

const COLS = [
  { title: 'Explore',  links: [['Shop',           '/shop'],['Fragrance Finder','/finder'],['Custom Lab',    '/lab'],['The Quiz',  '/quiz'],['Gifting',      '/gifting']] },
  { title: 'Brand',    links: [['Our Story',      '/about'],['Journal',         '/journal'],['Hybrid Creator','/hybrid'],['Contact',  '/contact']] },
  { title: 'Support',  links: [['Shipping Policy','/shipping'],['Returns',      '/returns'],['WhatsApp',     'https://wa.me/923001234567'],['FAQ',         '/faq']] },
];

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg-white)', borderTop: '1px solid var(--border)' }}>
      {/* Main grid */}
      <div className="container" style={{ padding: 'var(--s9) var(--s7) var(--s7)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 'var(--s9)' }}>
          {/* Brand column */}
          <div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '26px', fontWeight: 300, letterSpacing: '0.14em', color: 'var(--text-primary)', marginBottom: '14px' }}>
              eSibha
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: '240px', fontWeight: 300, marginBottom: '24px' }}>
              A luxury fragrance house creating designer-inspired perfumes for the discerning few.
            </p>
            {/* Newsletter */}
            <div style={{ display: 'flex', gap: '0' }}>
              <input
                type="email" placeholder="Your email"
                style={{
                  flex: 1, padding: '10px 14px',
                  border: '1px solid var(--border)', borderRight: 'none',
                  borderRadius: '2px 0 0 2px',
                  fontSize: '12px', fontFamily: 'var(--sans)',
                  background: 'var(--bg)', color: 'var(--text-primary)', outline: 'none',
                }}
              />
              <button style={{
                padding: '10px 16px',
                background: 'var(--text-primary)', color: 'var(--bg-white)',
                border: 'none', borderRadius: '0 2px 2px 0',
                fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase',
                cursor: 'pointer', fontFamily: 'var(--sans)',
                transition: 'background var(--fast)',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--accent)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--text-primary)'}
              >
                Join
              </button>
            </div>
          </div>

          {/* Link columns */}
          {COLS.map(col => (
            <div key={col.title}>
              <div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '20px', fontWeight: 400 }}>
                {col.title}
              </div>
              {col.links.map(([label, href]) => (
                <Link key={label} to={href} style={{
                  display: 'block', fontSize: '13px',
                  color: 'var(--text-muted)', marginBottom: '10px',
                  textDecoration: 'none', fontWeight: 300,
                  transition: 'color var(--fast)',
                }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                >
                  {label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{
          padding: 'var(--s4) var(--s7)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>© 2026 eSibha. All rights reserved.</span>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>Pakistan · UAE · UK</span>
        </div>
      </div>
    </footer>
  );
}