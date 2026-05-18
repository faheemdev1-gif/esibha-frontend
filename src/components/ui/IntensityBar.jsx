export default function IntensityBar({ value = 50 }) {
    const label = value < 40 ? 'Light' : value < 65 ? 'Moderate' : value < 82 ? 'Strong' : 'Very Strong';
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
          <span style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
            Intensity
          </span>
          <span style={{ fontSize: '10px', color: 'var(--accent)', letterSpacing: '0.06em' }}>{label}</span>
        </div>
        <div style={{ height: '2px', background: 'var(--border)', borderRadius: '1px' }}>
          <div style={{
            width: `${value}%`, height: '100%',
            background: 'var(--accent)', borderRadius: '1px',
            transition: 'width 0.6s var(--ease)',
          }} />
        </div>
      </div>
    );
  }