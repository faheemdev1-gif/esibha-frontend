import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../data/seed';
import { useCartStore } from '../store';
import BottleSVG from '../components/ui/BottleSVG';
import FamilyTag from '../components/ui/FamilyTag';
import IntensityBar from '../components/ui/IntensityBar';
import Button from '../components/ui/Button';
import ProductCard from '../components/shop/ProductCard';
import { HeartIcon, ArrowLeft } from '../components/ui/Icons';

export default function ProductDetailPage() {
  const { slug }   = useParams();
  const navigate   = useNavigate();
  const addItem    = useCartStore(s => s.addItem);
  const product    = PRODUCTS.find(p => p.slug === slug);

  const [selectedSize, setSelectedSize] = useState(product?.sizes[1]?.label || '30ml');
  const [qty,          setQty]          = useState(1);
  const [added,        setAdded]        = useState(false);

  if (!product) return (
    <div style={{ paddingTop: 'var(--nav-h)', textAlign: 'center', padding: '120px 40px' }}>
      <p style={{ fontFamily: 'var(--serif)', fontSize: '28px', color: 'var(--text-muted)' }}>Fragrance not found.</p>
      <button onClick={() => navigate('/shop')} style={{ marginTop: '20px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent)', fontSize: '13px', letterSpacing: '0.1em' }}>← Back to Shop</button>
    </div>
  );

  const currentPrice = product.sizes.find(s => s.label === selectedSize)?.price ?? product.sizes[1].price;
  const related      = PRODUCTS.filter(p => p.id !== product.id && (p.family === product.family || p.category === product.category)).slice(0, 4);

  const handleAdd = () => {
    addItem(product, selectedSize, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div style={{ paddingTop: 'var(--nav-h)', background: 'var(--bg)' }}>
      <div className="container" style={{ padding: 'var(--s7)' }}>

        {/* Breadcrumb */}
        <div style={{ display: 'flex', gap: 'var(--s2)', alignItems: 'center', marginBottom: 'var(--s6)' }}>
          <button onClick={() => navigate('/shop')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '12px', letterSpacing: '0.06em' }}>
            <ArrowLeft size={14} /> Shop
          </button>
          <span style={{ color: 'var(--border)', fontSize: '12px' }}>/</span>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{product.name}</span>
        </div>

        {/* Main grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--s9)', alignItems: 'start', background: 'var(--bg-white)', border: '1px solid var(--border)', borderRadius: '2px', padding: 'var(--s9)', marginBottom: 'var(--s9)' }}>

          {/* Left — Bottle */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '480px', background: 'var(--bg)', borderRadius: '2px', padding: 'var(--s8)' }}>
            <BottleSVG family={product.family} size={200} />
          </div>

          {/* Right — Details */}
          <div>
            <div style={{ display: 'flex', gap: 'var(--s2)', marginBottom: 'var(--s4)', flexWrap: 'wrap' }}>
              <FamilyTag family={product.family} size="md" />
              <span style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '5px 12px', borderRadius: '999px', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
                {product.category}
              </span>
            </div>

            <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(32px,4vw,44px)', fontWeight: 300, lineHeight: 1.1, color: 'var(--text-primary)', marginBottom: 'var(--s2)' }}>
              {product.name}
            </h1>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', letterSpacing: '0.06em', marginBottom: 'var(--s5)' }}>
              Inspired by {product.inspo}
            </p>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.75, fontWeight: 300, marginBottom: 'var(--s6)' }}>
              {product.description}
            </p>

            {/* Intensity */}
            <div style={{ marginBottom: 'var(--s6)' }}>
              <IntensityBar value={product.intensity} />
            </div>

            {/* Scent notes */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--s3)', marginBottom: 'var(--s6)' }}>
              {[['Top Notes', product.top], ['Heart Notes', product.heart], ['Base Notes', product.base]].map(([label, notes]) => (
                <div key={label} style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '2px', padding: 'var(--s4)', textAlign: 'center' }}>
                  <div style={{ fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 'var(--s3)' }}>{label}</div>
                  {notes.map(n => <div key={n} style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.6, fontWeight: 300 }}>{n}</div>)}
                </div>
              ))}
            </div>

            {/* Size selector */}
            <div style={{ marginBottom: 'var(--s5)' }}>
              <div style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 'var(--s3)' }}>Select Size</div>
              <div style={{ display: 'flex', gap: 'var(--s2)', flexWrap: 'wrap' }}>
                {product.sizes.map(s => (
                  <button key={s.label} onClick={() => setSelectedSize(s.label)} style={{
                    padding: 'var(--s2) var(--s4)',
                    background: selectedSize === s.label ? 'var(--accent-light)' : 'transparent',
                    border: `1px solid ${selectedSize === s.label ? 'var(--accent)' : 'var(--border)'}`,
                    color: selectedSize === s.label ? 'var(--accent-dark)' : 'var(--text-secondary)',
                    borderRadius: '2px', cursor: 'pointer',
                    fontFamily: 'var(--sans)', fontSize: '12px',
                    transition: 'all var(--fast)',
                  }}>
                    <div style={{ fontWeight: 400 }}>{s.label}</div>
                    <div style={{ fontSize: '10px', opacity: 0.75, marginTop: '2px' }}>PKR {s.price.toLocaleString()}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Qty + Price row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--s5)' }}>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border)', borderRadius: '2px' }}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', width: '38px', height: '38px', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
                <span style={{ width: '36px', textAlign: 'center', fontSize: '14px', color: 'var(--text-primary)' }}>{qty}</span>
                <button onClick={() => setQty(q => q + 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', width: '38px', height: '38px', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
              </div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: '28px', fontWeight: 300, color: 'var(--text-primary)' }}>
                PKR {(currentPrice * qty).toLocaleString()}
              </div>
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: 'var(--s3)' }}>
              <Button fullWidth onClick={handleAdd} variant={added ? 'accent' : 'primary'}>
                {added ? '✓ Added to Cart' : 'Add to Cart'}
              </Button>
              <button style={{
                width: '48px', flexShrink: 0, background: 'transparent',
                border: '1px solid var(--border)', borderRadius: '2px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--text-muted)', transition: 'all var(--fast)',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#e05555'; e.currentTarget.style.color = '#e05555'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
              >
                <HeartIcon size={16} />
              </button>
            </div>

            {/* Trust signals */}
            <div style={{ display: 'flex', gap: 'var(--s5)', marginTop: 'var(--s5)', paddingTop: 'var(--s5)', borderTop: '1px solid var(--border-soft)', flexWrap: 'wrap' }}>
              {['Free shipping on orders over PKR 3,000', 'Authentic ingredients', '30-day returns'].map(t => (
                <span key={t} style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ color: '#286858', fontSize: '12px' }}>✓</span> {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* You Might Also Love */}
        {related.length > 0 && (
          <div style={{ marginBottom: 'var(--s9)' }}>
            <p className="section-eyebrow">Related</p>
            <h2 className="section-title" style={{ marginBottom: 'var(--s7)' }}>You Might Also Love</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--s5)' }}>
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}