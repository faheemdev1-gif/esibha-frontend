import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS, JOURNAL_POSTS } from '../data/seed';
import ProductCard from '../components/shop/ProductCard';
import Button from '../components/ui/Button';
import { ArrowRight } from '../components/ui/Icons';

const MOODS = [
  { label: 'Fresh',    sub: 'Citrus & Aquatic', symbol: '◈' },
  { label: 'Romantic', sub: 'Floral & Soft',    symbol: '◇' },
  { label: 'Bold',     sub: 'Oud & Intense',    symbol: '◆' },
  { label: 'Luxury',   sub: 'Rich & Rare',      symbol: '◉' },
  { label: 'Night',    sub: 'Dark & Musk',      symbol: '◐' },
];

const TESTIMONIALS = [
  { text: 'Identical to the original — six people asked which perfume I was wearing.', author: 'Sana M.', city: 'Lahore' },
  { text: 'eSibha made my wedding scent feel designed only for me. Truly bespoke.', author: 'Ayesha K.', city: 'Karachi' },
  { text: 'Cedar Mystère is indistinguishable from Oud Wood at a fifth of the price.', author: 'Bilal R.', city: 'Islamabad' },
  { text: 'The packaging, the longevity, the bottle — everything exactly as promised.', author: 'Zara F.', city: 'Dubai' },
];

export default function HomePage() {
  const navigate  = useNavigate();
  const bestsellers = PRODUCTS.filter(p => p.bestseller);
  const featured    = PRODUCTS.filter(p => p.featured).slice(0, 3);

  return (
    <div style={{ paddingTop: 'var(--nav-h)' }}>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section style={{
        minHeight: '92vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center',
        padding: 'var(--s10) var(--s7) var(--s9)',
        background: 'var(--bg-white)',
        position: 'relative',
        borderBottom: '1px solid var(--border)',
      }}>
        {/* Decorative top line */}
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '1px', height: '80px', background: 'linear-gradient(to bottom, transparent, var(--border))' }} />

        <p className="fade-up d1 section-eyebrow">Luxury Fragrance House · Pakistan</p>

        <h1 className="fade-up d2" style={{
          fontFamily: 'var(--serif)',
          fontSize: 'clamp(52px, 8vw, 96px)',
          fontWeight: 300, lineHeight: 1.05,
          color: 'var(--text-primary)',
          marginBottom: 'var(--s4)',
          letterSpacing: '-0.01em',
        }}>
          Wear the Feeling,<br />
          <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Not Just the Scent.</em>
        </h1>

        <p className="fade-up d3" style={{
          fontSize: '15px', fontWeight: 300,
          color: 'var(--text-secondary)', maxWidth: '400px',
          lineHeight: 1.75, marginBottom: 'var(--s7)',
          letterSpacing: '0.02em',
        }}>
          Designer-inspired fragrances crafted for those who know exactly what they want.
        </p>

        <div className="fade-up d4" style={{ display: 'flex', gap: 'var(--s4)', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Button size="lg" onClick={() => navigate('/shop')}>Shop Collection</Button>
          <Button size="lg" variant="ghost" onClick={() => navigate('/finder')}>Find Your Fragrance</Button>
        </div>

        {/* Scroll indicator */}
        <div className="fade-up d5" style={{
          position: 'absolute', bottom: '32px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
        }}>
          <span style={{ fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Scroll</span>
          <div style={{ width: '1px', height: '36px', background: 'linear-gradient(to bottom, var(--text-muted), transparent)' }} />
        </div>
      </section>

      {/* ── DISCOVER BY MOOD ─────────────────────────────────── */}
      <section style={{ padding: 'var(--s9) 0', background: 'var(--bg)' }}>
        <div className="container">
          <SectionHeader eyebrow="Curated Moods" title="Discover by Feeling" linkTo="/shop" linkLabel="View All" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 'var(--s4)' }}>
            {MOODS.map(m => (
              <MoodCard key={m.label} mood={m} onClick={() => navigate(`/shop?mood=${m.label.toLowerCase()}`)} />
            ))}
          </div>
        </div>
      </section>

      {/* ── BESTSELLERS ──────────────────────────────────────── */}
      <section style={{ padding: 'var(--s9) 0', background: 'var(--bg-white)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <SectionHeader eyebrow="Bestsellers" title="Most Loved" linkTo="/shop" linkLabel="View All" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--s5)' }}>
            {bestsellers.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* ── FRAGRANCE FINDER TEASER ──────────────────────────── */}
      <section style={{ padding: 'var(--s10) 0', background: 'var(--bg)' }}>
        <div className="container">
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--s9)',
            alignItems: 'center',
            border: '1px solid var(--border)', borderRadius: '2px',
            padding: 'var(--s9)',
            background: 'var(--bg-white)',
            boxShadow: 'var(--shadow-sm)',
          }}>
            <div>
              <p className="section-eyebrow">Fragrance Finder</p>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(32px,4vw,48px)', fontWeight: 300, lineHeight: 1.15, color: 'var(--text-primary)', marginBottom: 'var(--s4)' }}>
                Any Fragrance.<br />
                <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>On Demand.</em>
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: 'var(--s6)', fontWeight: 300 }}>
                Name any designer scent — we find our version or recreate it specifically for you.
              </p>
              <Button variant="accent" onClick={() => navigate('/finder')}>
                Try the Finder <ArrowRight size={14} />
              </Button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 'var(--s5)' }}>
              {featured.map((p, i) => (
                <div key={p.id} style={{ transform: i === 1 ? 'translateY(-16px)' : 'none', opacity: i === 1 ? 1 : 0.7 }}>
                  {/* Inline minimal bottle for teaser */}
                  <svg width={i===1?110:85} height={i===1?160:123} viewBox="0 0 100 145" fill="none">
                    <rect x="34" y="6" width="32" height="10" rx="3" fill="var(--accent)" opacity="0.3"/>
                    <rect x="6"  y="16" width="88" height="122" rx="10" fill="var(--bg-subtle)" stroke="var(--border)" strokeWidth="0.8"/>
                    <rect x="14" y="30" width="72" height="92" rx="6" fill="var(--bg-white)"/>
                    <text x="50" y="80" textAnchor="middle" fontFamily="Georgia,serif" fontSize="8" fill="var(--accent)" opacity="0.8" letterSpacing="2">eSibha</text>
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      <section style={{ padding: 'var(--s9) 0', background: 'var(--bg-accent)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <SectionHeader eyebrow="Client Stories" title="What They Say" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--s5)' }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{
                background: 'var(--bg-white)',
                border: '1px solid var(--border)',
                borderRadius: '2px', padding: 'var(--s5)',
                boxShadow: 'var(--shadow-sm)',
              }}>
                <div style={{ fontFamily: 'var(--serif)', fontSize: '28px', color: 'var(--accent)', opacity: 0.4, lineHeight: 1, marginBottom: 'var(--s4)' }}>"</div>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.7, fontStyle: 'italic', marginBottom: 'var(--s4)', fontWeight: 300 }}>
                  {t.text}
                </p>
                <div style={{ fontSize: '11px', fontWeight: 500, color: 'var(--text-primary)', letterSpacing: '0.06em' }}>{t.author}</div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>{t.city}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── JOURNAL TEASER ───────────────────────────────────── */}
      <section style={{ padding: 'var(--s9) 0', background: 'var(--bg-white)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <SectionHeader eyebrow="Journal" title="Stories & Craft" linkTo="/journal" linkLabel="All Posts" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--s5)' }}>
            {JOURNAL_POSTS.slice(0, 3).map(post => (
              <div key={post.id} style={{
                border: '1px solid var(--border)', borderRadius: '2px', padding: 'var(--s6)',
                cursor: 'pointer', transition: 'box-shadow var(--base)',
              }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--shadow-md)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--s4)' }}>
                  <span style={{ fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)' }}>{post.category}</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{post.date}</span>
                </div>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: '20px', fontWeight: 400, color: 'var(--text-primary)', lineHeight: 1.3, marginBottom: 'var(--s3)' }}>{post.title}</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.7, fontWeight: 300 }}>{post.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}

// ── LOCAL COMPONENTS ───────────────────────────────────────────────
function SectionHeader({ eyebrow, title, linkTo, linkLabel }) {
  const navigate = useNavigate();
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 'var(--s7)' }}>
      <div>
        <p className="section-eyebrow">{eyebrow}</p>
        <h2 className="section-title">{title}</h2>
      </div>
      {linkTo && (
        <button onClick={() => navigate(linkTo)} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '6px',
          fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase',
          color: 'var(--text-muted)',
          transition: 'color var(--fast)',
        }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
        >
          {linkLabel} <ArrowRight size={13} />
        </button>
      )}
    </div>
  );
}

function MoodCard({ mood, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? 'var(--bg-white)' : 'var(--bg-white)',
        border: `1px solid ${hov ? 'var(--accent)' : 'var(--border)'}`,
        borderRadius: '2px', padding: 'var(--s6) var(--s4)',
        cursor: 'pointer', textAlign: 'center',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--s2)',
        transition: 'all var(--base) var(--ease)',
        transform: hov ? 'translateY(-3px)' : 'none',
        boxShadow: hov ? 'var(--shadow-md)' : 'var(--shadow-sm)',
      }}
    >
      <span style={{ fontSize: '22px', color: 'var(--accent)', opacity: hov ? 1 : 0.7, transition: 'opacity var(--fast)' }}>{mood.symbol}</span>
      <span style={{ fontFamily: 'var(--serif)', fontSize: '17px', fontWeight: 400, color: 'var(--text-primary)' }}>{mood.label}</span>
      <span style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>{mood.sub}</span>
    </button>
  );
}
