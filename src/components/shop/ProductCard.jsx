import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store';
import BottleSVG from '../ui/BottleSVG';
import FamilyTag from '../ui/FamilyTag';

export default function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);
  const [adding, setAdding] = useState(false);

  const defaultSize = product.sizes?.[0]?.label || '30ml';
  const [selectedSize, setSelectedSize] = useState(defaultSize);

  const navigate = useNavigate();
  const addItem = useCartStore(s => s.addItem);

  const selectedSizeObj =
    product.sizes?.find(s => s.label === selectedSize) || product.sizes?.[0];

  const selectedPrice = selectedSizeObj?.price || 0;

  const handleAdd = e => {
    e.stopPropagation();

    setAdding(true);
    addItem(product, selectedSize, 1);

    setTimeout(() => setAdding(false), 1200);
  };

  const handleSizeClick = (e, size) => {
    e.stopPropagation();
    setSelectedSize(size.label);
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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color var(--base) var(--ease), box-shadow var(--base) var(--ease)',
        boxShadow: hovered ? 'var(--shadow-md)' : 'var(--shadow-sm)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: hovered ? 'var(--accent)' : 'transparent',
          transition: 'background var(--base)',
        }}
      />

      <div
        style={{
          transform: hovered ? 'translateY(-5px)' : 'none',
          transition: 'transform var(--slow) var(--ease)',
          marginBottom: '18px',
        }}
      >
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: '120px',
              height: '120px',
              objectFit: 'contain',
            }}
          />
        ) : (
          <BottleSVG family={product.family} size={90} />
        )}
      </div>

      <FamilyTag family={product.family} />

      <h3
        style={{
          fontFamily: 'var(--serif)',
          fontSize: '17px',
          fontWeight: 400,
          color: 'var(--text-primary)',
          marginTop: '10px',
          marginBottom: '3px',
          textAlign: 'center',
        }}
      >
        {product.name}
      </h3>

      <p
        style={{
          fontSize: '10px',
          color: 'var(--text-muted)',
          letterSpacing: '0.05em',
          marginBottom: '10px',
          textAlign: 'center',
        }}
      >
        Inspired by {product.inspo}
      </p>

      <div
        style={{
          fontSize: '14px',
          fontWeight: 400,
          color: 'var(--accent)',
          letterSpacing: '0.04em',
          marginBottom: '12px',
        }}
      >
        PKR {selectedPrice.toLocaleString()}
      </div>

      <div
        onClick={e => e.stopPropagation()}
        style={{
          display: 'flex',
          gap: '6px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginBottom: '12px',
        }}
      >
        {(product.sizes || []).map(size => (
          <button
            key={size.label}
            type="button"
            onClick={e => handleSizeClick(e, size)}
            style={{
              padding: '5px 9px',
              background: selectedSize === size.label ? 'var(--accent-light)' : 'transparent',
              border: `1px solid ${selectedSize === size.label ? 'var(--accent)' : 'var(--border)'}`,
              color: selectedSize === size.label ? 'var(--accent-dark)' : 'var(--text-muted)',
              borderRadius: '2px',
              fontSize: '10px',
              fontFamily: 'var(--sans)',
              cursor: 'pointer',
            }}
          >
            {size.label}
          </button>
        ))}
      </div>

      <div
        style={{
          width: '100%',
          marginTop: '4px',
          opacity: hovered ? 1 : 1,
          transform: hovered ? 'none' : 'none',
          transition: 'all var(--base) var(--ease)',
          pointerEvents: 'auto',
        }}
      >
        <button
          onClick={handleAdd}
          style={{
            width: '100%',
            padding: '9px',
            background: adding ? 'var(--accent)' : 'transparent',
            border: `1px solid ${adding ? 'var(--accent)' : 'var(--accent)'}`,
            color: adding ? '#fff' : 'var(--accent)',
            fontSize: '10px',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            borderRadius: '2px',
            fontFamily: 'var(--sans)',
            fontWeight: 400,
            cursor: 'pointer',
            transition: 'all var(--fast)',
          }}
        >
          {adding ? '✓ Added' : `Add ${selectedSize}`}
        </button>
      </div>
    </article>
  );
}