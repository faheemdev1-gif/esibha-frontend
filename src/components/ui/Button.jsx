import { useState } from 'react';

const variants = {
  primary: {
    background: 'var(--text-primary)',
    color: 'var(--bg-white)',
    border: 'none',
    hover: { background: 'var(--accent)', color: 'var(--bg-white)' },
  },
  secondary: {
    background: 'transparent',
    color: 'var(--text-primary)',
    border: '1px solid var(--border)',
    hover: { background: 'var(--bg-subtle)', color: 'var(--text-primary)' },
  },
  accent: {
    background: 'var(--accent)',
    color: 'var(--bg-white)',
    border: 'none',
    hover: { background: 'var(--accent-dark)', color: 'var(--bg-white)' },
  },
  ghost: {
    background: 'transparent',
    color: 'var(--accent)',
    border: '1px solid var(--accent)',
    hover: { background: 'var(--accent)', color: 'var(--bg-white)' },
  },
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  onClick,
  type = 'button',
  style: extraStyle = {},
}) {
  const [hovered, setHovered] = useState(false);
  const v = variants[variant] || variants.primary;

  const sizes = {
    sm: { padding: '8px 18px', fontSize: '10px', letterSpacing: '0.14em' },
    md: { padding: '12px 28px', fontSize: '11px', letterSpacing: '0.16em' },
    lg: { padding: '15px 36px', fontSize: '12px', letterSpacing: '0.18em' },
  };

  const s = sizes[size] || sizes.md;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        fontFamily: 'var(--sans)',
        fontWeight: 400,
        textTransform: 'uppercase',
        borderRadius: '2px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'all var(--base) var(--ease)',
        width: fullWidth ? '100%' : undefined,
        whiteSpace: 'nowrap',
        ...s,
        background: hovered && !disabled ? v.hover.background : v.background,
        color:      hovered && !disabled ? v.hover.color      : v.color,
        border:     v.border || 'none',
        ...extraStyle,
      }}
    >
      {children}
    </button>
  );
}