
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { JOURNAL_POSTS } from '../data/seed';
import ProductCard from '../components/shop/ProductCard';
import Button from '../components/ui/Button';
import { ArrowRight } from '../components/ui/Icons';
import ReviewGallery from '../components/reviews/ReviewGallery';
import api from '../api/api';

const MOODS = [
  { label: 'Fresh', sub: 'Citrus & Aquatic', symbol: '◈' },
  { label: 'Romantic', sub: 'Floral & Soft', symbol: '◇' },
  { label: 'Bold', sub: 'Oud & Intense', symbol: '◆' },
  { label: 'Luxury', sub: 'Rich & Rare', symbol: '◉' },
  { label: 'Night', sub: 'Dark & Musk', symbol: '◐' },
];

const CUSTOMER_REVIEWS = [
  { name: 'Amin', image: '/reviews/amin.webp' },
  { name: 'Fahad', image: '/reviews/fahad.webp' },
  { name: 'Minahil', image: '/reviews/minahil.webp' },
  { name: 'Muzdalfa', image: '/reviews/muzdalfa.webp' },
  { name: 'Rahat', image: '/reviews/rahat.webp' },
  { name: 'Riffat', image: '/reviews/riffat.webp' },
  { name: 'Shahan Babar', image: '/reviews/shahan-babar.webp' },
  { name: 'Stoic', image: '/reviews/stoic.webp' },
  { name: 'Tahir', image: '/reviews/tahir.webp' },
  { name: 'Customer review', image: '/reviews/g-13.webp' },
];

export default function HomePage() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/products');
        setProducts(res.data.data || []);
      } catch (error) {
        console.error('Failed to fetch homepage products:', error);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  const bestsellers = products
    .filter(p => p.bestseller || p.mostLoved)
    .slice(0, 4);

  const fallbackBestsellers = products.slice(0, 4);

  const displayBestsellers =
    bestsellers.length > 0 ? bestsellers : fallbackBestsellers;

  const featured = products
    .filter(p => p.featured || p.newArrival)
    .slice(0, 3);

  const displayFeatured =
    featured.length > 0 ? featured : products.slice(0, 3);

  const menProducts = products
    .filter(p => p.category === "Men's")
    .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
    .slice(0, 4);

  const womenProducts = products
    .filter(p => p.category === "Women's")
    .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
    .slice(0, 4);

  return (
    <div style={{ paddingTop: 'var(--nav-h)' }}>
      {/* ── HERO ─────────────────────────────────────────────── */}
      {/* ── HERO ─────────────────────────────────────────────── */}
<section
  style={{
    minHeight: '92vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: 'var(--s10) var(--s7) var(--s9)',
    position: 'relative',
    overflow: 'hidden',
    borderBottom: '1px solid rgba(255,255,255,.08)',
    background: '#000',
  }}
>
  {/* Background Video */}
  <video
    autoPlay
    muted
    loop
    playsInline
    style={{
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      zIndex: 0,
    }}
  >
    <source src="/video.mp4" type="video/mp4" />
  </video>

  {/* Overlay */}
  <div
    style={{
      position: 'absolute',
      inset: 0,
      background:
        'linear-gradient(to bottom, rgba(0,0,0,.35), rgba(0,0,0,.55), rgba(0,0,0,.75))',
      zIndex: 1,
    }}
  />

  {/* Decorative line */}
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '1px',
      height: '80px',
      background:
        'linear-gradient(to bottom, transparent, rgba(255,255,255,.4))',
      zIndex: 2,
    }}
  />

  {/* Hero Content */}
  <div
    style={{
      position: 'relative',
      zIndex: 2,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      maxWidth: '900px',
    }}
  >
    <p
      className="fade-up d1 section-eyebrow"
      style={{ color: 'rgba(255,255,255,.75)' }}
    >
      Luxury Fragrance House · Pakistan
    </p>

    <h1
      className="fade-up d2"
      style={{
        fontFamily: 'var(--serif)',
        fontSize: 'clamp(52px, 8vw, 96px)',
        fontWeight: 300,
        lineHeight: 1.05,
        color: '#fff',
        marginBottom: 'var(--s4)',
        letterSpacing: '-0.01em',
      }}
    >
      Wear the Feeling,
      <br />
      <em
        style={{
          fontStyle: 'italic',
          color: '#d8b26e',
        }}
      >
        Not Just the Scent.
      </em>
    </h1>

    <p
      className="fade-up d3"
      style={{
        fontSize: '15px',
        fontWeight: 300,
        color: 'rgba(255,255,255,.85)',
        maxWidth: '450px',
        lineHeight: 1.75,
        marginBottom: 'var(--s7)',
        letterSpacing: '0.02em',
      }}
    >
      Designer-inspired fragrances crafted for those who know exactly what they
      want.
    </p>

    <div
      className="fade-up d4"
      style={{
        display: 'flex',
        gap: 'var(--s4)',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}
    >
      <Button size="lg" onClick={() => navigate('/shop')}>
        Shop Collection
      </Button>

      <Button
        size="lg"
        variant="ghost"
        onClick={() => navigate('/finder')}
      >
        Find Your Fragrance
      </Button>
    </div>
  </div>

  {/* Scroll Indicator */}
  <div
    className="fade-up d5"
    style={{
      position: 'absolute',
      bottom: '32px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px',
      zIndex: 2,
    }}
  >
    <span
      style={{
        fontSize: '9px',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,.75)',
      }}
    >
      Scroll
    </span>

    <div
      style={{
        width: '1px',
        height: '36px',
        background:
          'linear-gradient(to bottom, rgba(255,255,255,.8), transparent)',
      }}
    />
  </div>
</section>

      {/* ── DISCOVER BY MOOD ─────────────────────────────────── */}
      <section style={{ padding: 'var(--s9) 0', background: 'var(--bg)' }}>
        <div className="container">
          <SectionHeader eyebrow="Curated Moods" title="Discover by Feeling" linkTo="/shop" linkLabel="View All" />
          <div className="grid-cols-5">
            {MOODS.map(m => (
              <MoodCard
                key={m.label}
                mood={m}
                onClick={() => navigate(`/shop?mood=${m.label}`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── BESTSELLERS ──────────────────────────────────────── */}
      <section style={{ padding: 'var(--s9) 0', background: 'var(--bg-white)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <SectionHeader eyebrow="Bestsellers" title="Most Loved" linkTo="/shop" linkLabel="View All" />

          {loadingProducts ? (
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Loading products...</p>
          ) : displayBestsellers.length === 0 ? (
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>No products found.</p>
          ) : (
            <div className="grid-cols-4">
              {displayBestsellers.map(p => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── SHOP FOR MEN ─────────────────────────────────────── */}
      <ProductCollectionSection
        eyebrow="For Him"
        title="Fragrances for Men"
        products={menProducts}
        loading={loadingProducts}
        linkTo={`/shop?category=${encodeURIComponent("Men's")}`}
      />

      {/* ── SHOP FOR WOMEN ───────────────────────────────────── */}
      <ProductCollectionSection
        eyebrow="For Her"
        title="Fragrances for Women"
        products={womenProducts}
        loading={loadingProducts}
        linkTo={`/shop?category=${encodeURIComponent("Women's")}`}
        alternate
      />

      {/* ── FRAGRANCE FINDER TEASER ──────────────────────────── */}
      <section style={{ padding: 'var(--s10) 0', background: 'var(--bg)' }}>
        <div className="container">
          <div className="two-col card-pad" style={{
            border: '1px solid var(--border)', borderRadius: '2px',
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

            <div className="hero-bottles">
              {displayFeatured.map((p, i) => (
                <div key={p._id} style={{ transform: i === 1 ? 'translateY(-16px)' : 'none', opacity: i === 1 ? 1 : 0.7 }}>
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.name}
                      style={{
                        width: i === 1 ? '130px' : '100px',
                        height: i === 1 ? '170px' : '135px',
                        objectFit: 'contain',
                      }}
                    />
                  ) : (
                    <svg width={i === 1 ? 110 : 85} height={i === 1 ? 160 : 123} viewBox="0 0 100 145" fill="none">
                      <rect x="34" y="6" width="32" height="10" rx="3" fill="var(--accent)" opacity="0.3" />
                      <rect x="6" y="16" width="88" height="122" rx="10" fill="var(--bg-subtle)" stroke="var(--border)" strokeWidth="0.8" />
                      <rect x="14" y="30" width="72" height="92" rx="6" fill="var(--bg-white)" />
                      <text x="50" y="80" textAnchor="middle" fontFamily="Georgia,serif" fontSize="8" fill="var(--accent)" opacity="0.8" letterSpacing="2">eSibha</text>
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      <ReviewGallery reviews={CUSTOMER_REVIEWS} />

      {/* ── JOURNAL TEASER ───────────────────────────────────── */}
      <section style={{ padding: 'var(--s9) 0', background: 'var(--bg-white)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <SectionHeader eyebrow="Journal" title="Stories & Craft" linkTo="/journal" linkLabel="All Posts" />
          <div className="grid-cols-3">
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

function SectionHeader({ eyebrow, title, linkTo, linkLabel }) {
  const navigate = useNavigate();

  return (
    <div className="section-header-row">
      <div>
        <p className="section-eyebrow">{eyebrow}</p>
        <h2 className="section-title">{title}</h2>
      </div>

      {linkTo && (
        <button
          onClick={() => navigate(linkTo)}
          style={{
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

function ProductCollectionSection({ eyebrow, title, products, loading, linkTo, alternate = false }) {
  return (
    <section
      style={{
        padding: 'var(--s9) 0',
        background: alternate ? 'var(--bg)' : 'var(--bg-white)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div className="container">
        <SectionHeader eyebrow={eyebrow} title={title} linkTo={linkTo} linkLabel="View All" />

        {loading ? (
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Loading products...</p>
        ) : products.length === 0 ? (
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            No products are currently available in this collection.
          </p>
        ) : (
          <div className="grid-cols-4">
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
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
