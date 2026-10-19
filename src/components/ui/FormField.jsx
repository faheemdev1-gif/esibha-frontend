import { useState } from 'react';

export default function FormField({
  label, name, type = 'text', value, onChange,
  placeholder = '', required = false, as = 'input', rows = 4,
}) {
  const [focused, setFocused] = useState(false);

  const sharedStyle = {
    width: '100%',
    padding: '11px 14px',
    background: 'var(--bg-white)',
    border: `1px solid ${focused ? 'var(--accent)' : 'var(--border)'}`,
    borderRadius: '2px',
    color: 'var(--text-primary)',
    fontSize: '14px',
    fontFamily: 'var(--sans)',
    fontWeight: 300,
    outline: 'none',
    transition: 'border-color var(--fast) var(--ease)',
    resize: as === 'textarea' ? 'vertical' : undefined,
  };

  return (
    <div style={{ marginBottom: '18px' }}>
      {label && (
        <label htmlFor={name} style={{
          display: 'block',
          fontSize: '10px',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: focused ? 'var(--accent)' : 'var(--text-muted)',
          marginBottom: '7px',
          transition: 'color var(--fast)',
        }}>
          {label}{required && <span style={{ color: 'var(--accent)', marginLeft: '2px' }}>*</span>}
        </label>
      )}
      {as === 'textarea' ? (
        <textarea
          id={name} name={name} rows={rows} value={value}
          onChange={onChange} placeholder={placeholder}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={sharedStyle}
        />
      ) : (
        <input
          id={name} name={name} type={type} value={value}
          onChange={onChange} placeholder={placeholder}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          required={required}
          style={sharedStyle}
        />
      )}
    </div>
  );
}