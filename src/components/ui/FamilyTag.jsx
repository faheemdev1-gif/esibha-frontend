import { familyMeta } from '../../styles/tokens';

export default function FamilyTag({ family, size = 'sm' }) {
  const meta = familyMeta[family] || { bg: '#eee', text: '#555', border: '#ccc' };
  const fs = size === 'sm' ? '9px' : '11px';
  const px = size === 'sm' ? '8px' : '12px';
  const py = size === 'sm' ? '3px' : '5px';

  return (
    <span style={{
      display: 'inline-block',
      fontSize: fs,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      padding: `${py} ${px}`,
      borderRadius: '999px',
      background: meta.bg,
      color: meta.text,
      border: `1px solid ${meta.border}`,
      fontWeight: 400,
      whiteSpace: 'nowrap',
    }}>
      {family}
    </span>
  );
}