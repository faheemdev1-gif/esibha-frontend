import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store';
import BottleSVG from '../ui/BottleSVG';
import FamilyTag from '../ui/FamilyTag';

export default function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);
  const [adding,  setAdding]  = useState(false);
  const navigate  = useNavigate();
  const addItem   = useCartStore(s => s.addItem);

  const handleAdd = async e => {
    e.stopPropagation();
    setAdding(true);
    addItem(product, '30ml', 1);
    setTimeout(() => setAdding(false), 1200);
  };

  return (
    <article
      onClick={() => navigate(`/product/${product.slug}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--bg-white)',
        border: `1px solid ${hovered ? 'var(--accent)' : 'var(--border)'}`,
        borderRadius: '2px',
        padding: '28px 20px 22px',
        cursor: 'pointer',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        position: 'relative', overflow: 'hidden',
        transition: 'border-color var(--base) var(--ease), box-shadow var(--base) var(--ease)',
        boxShadow: hovered ? 'var(--shadow-md)' : 'var(--shadow-sm)',
      }}
    >
      {/* Top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: hovered ? 'var(--accent)' : 'transparent',
        transition: 'background var(--base)',
      }} />

      {/* Bottle */}
      <div style={{
        transform: hovered ? 'translateY(-5px)' : 'none',
        transition: 'transform var(--slow) var(--ease)',
        marginBottom: '18px',
      }}>
        <BottleSVG family={product.family} size={90} />
      </div>

      <FamilyTag family={product.family} />

      <h3 style={{
        fontFamily: 'var(--serif)', fontSize: '17px', fontWeight: 400,
        color: 'var(--text-primary)', marginTop: '10px', marginBottom: '3px',
        textAlign: 'center',
      }}>
        {product.name}
      </h3>

      <p style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.05em', marginBottom: '10px', textAlign: 'center' }}>
        Inspired by {product.inspo}
      </p>

      <div style={{ fontSize: '14px', fontWeight: 400, color: 'var(--accent)', letterSpacing: '0.04em' }}>
        PKR {product.sizes[1].price.toLocaleString()}
      </div>

      {/* Add to cart — reveals on hover */}
      <div style={{
        width: '100%', marginTop: '16px',
        opacity: hovered ? 1 : 0,
        transform: hovered ? 'none' : 'translateY(6px)',
        transition: 'all var(--base) var(--ease)',
        pointerEvents: hovered ? 'auto' : 'none',
      }}>
        <button
          onClick={handleAdd}
          style={{
            width: '100%', padding: '9px',
            background: adding ? 'var(--accent)' : 'transparent',
            border: `1px solid ${adding ? 'var(--accent)' : 'var(--accent)'}`,
            color: adding ? '#fff' : 'var(--accent)',
            fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase',
            borderRadius: '2px', fontFamily: 'var(--sans)', fontWeight: 400,
            cursor: 'pointer',
            transition: 'all var(--fast)',
          }}
        >
          {adding ? '✓ Added' : 'Add to Cart'}
        </button>
      </div>
    </article>
  );
}