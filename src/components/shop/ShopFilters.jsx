const FAMILIES = ['All','Fresh & Citrus','Floral','Oud & Amber','Woody & Oriental','Musk'];
const INTENSITIES = [{ label: 'Light', max: 40 }, { label: 'Moderate', min: 40, max: 65 }, { label: 'Strong', min: 65, max: 82 }, { label: 'Very Strong', min: 82 }];
const SIZES = ['5ml','30ml','50ml','100ml'];

export default function ShopFilters({ filters, onChange }) {
  const set = (key, val) => onChange({ ...filters, [key]: val });

  return (
    <aside style={{
      background: 'var(--bg-white)',
      border: '1px solid var(--border)',
      borderRadius: '2px',
      padding: 'var(--s5)',
      alignSelf: 'start',
      position: 'sticky', top: 'calc(var(--nav-h) + 20px)',
    }}>
      <div style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: 'var(--s5)', paddingBottom: 'var(--s4)', borderBottom: '1px solid var(--border)' }}>
        Filters
      </div>

      {/* Scent Family */}
      <FilterSection title="Scent Family">
        {FAMILIES.map(f => (
          <FilterPill key={f} label={f} active={filters.family === f} onClick={() => set('family', f)} />
        ))}
      </FilterSection>

      {/* Intensity */}
      <FilterSection title="Intensity">
        {INTENSITIES.map(({ label }) => (
          <FilterCheckbox key={label} label={label} checked={filters.intensity?.includes(label)} onChange={v => {
            const cur = filters.intensity || [];
            set('intensity', v ? [...cur, label] : cur.filter(i => i !== label));
          }} />
        ))}
      </FilterSection>

      {/* Size */}
      <FilterSection title="Size" last>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {SIZES.map(s => (
            <SizeChip key={s} label={s}
              active={(filters.sizes || []).includes(s)}
              onClick={() => {
                const cur = filters.sizes || [];
                set('sizes', cur.includes(s) ? cur.filter(x => x !== s) : [...cur, s]);
              }}
            />
          ))}
        </div>
      </FilterSection>

      {/* Reset */}
      <button onClick={() => onChange({ family: 'All', intensity: [], sizes: [] })} style={{
        marginTop: 'var(--s4)', width: '100%', padding: '9px',
        background: 'none', border: '1px solid var(--border)',
        color: 'var(--text-muted)', fontSize: '10px', letterSpacing: '0.14em',
        textTransform: 'uppercase', borderRadius: '2px', cursor: 'pointer',
        fontFamily: 'var(--sans)',
        transition: 'all var(--fast)',
      }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
      >
        Reset Filters
      </button>
    </aside>
  );
}

function FilterSection({ title, children, last = false }) {
  return (
    <div style={{ marginBottom: last ? 0 : 'var(--s5)', paddingBottom: last ? 0 : 'var(--s5)', borderBottom: last ? 'none' : '1px solid var(--border-soft)' }}>
      <div style={{ fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 'var(--s3)' }}>
        {title}
      </div>
      {children}
    </div>
  );
}

function FilterPill({ label, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      display: 'block', width: '100%', textAlign: 'left',
      padding: '7px 10px', marginBottom: '4px',
      background: active ? 'var(--accent-light)' : 'transparent',
      border: `1px solid ${active ? 'var(--accent)' : 'transparent'}`,
      borderRadius: '2px',
      color: active ? 'var(--accent-dark)' : 'var(--text-secondary)',
      fontSize: '13px', fontFamily: 'var(--sans)', cursor: 'pointer',
      transition: 'all var(--fast)',
    }}>
      {label}
    </button>
  );
}

function FilterCheckbox({ label, checked, onChange }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', cursor: 'pointer' }}>
      <input type="checkbox" checked={checked || false} onChange={e => onChange(e.target.checked)}
        style={{ accentColor: 'var(--accent)', width: '13px', height: '13px' }} />
      <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{label}</span>
    </label>
  );
}

function SizeChip({ label, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding: '5px 12px',
      background: active ? 'var(--accent)' : 'transparent',
      border: `1px solid ${active ? 'var(--accent)' : 'var(--border)'}`,
      color: active ? '#fff' : 'var(--text-secondary)',
      fontSize: '11px', borderRadius: '2px',
      cursor: 'pointer', fontFamily: 'var(--sans)',
      transition: 'all var(--fast)',
    }}>
      {label}
    </button>
  );
}