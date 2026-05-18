import { familyMeta } from '../../styles/tokens';

export default function BottleSVG({ family, size = 120 }) {
  const meta = familyMeta[family] || { text: '#9A7B55' };
  const accent = meta.text;
  const h = size * 1.45;

  return (
    <svg width={size} height={h} viewBox="0 0 100 145" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Cap */}
      <rect x="34" y="6" width="32" height="10" rx="3" fill={accent} opacity="0.35" />
      <rect x="40" y="2"  width="20" height="7"  rx="2.5" fill={accent} opacity="0.22" />
      {/* Body */}
      <rect x="6"  y="16" width="88" height="122" rx="10" fill="var(--bg-white)"  />
      <rect x="6"  y="16" width="88" height="122" rx="10" stroke={accent} strokeWidth="0.7" opacity="0.4" />
      {/* Inner panel */}
      <rect x="14" y="30" width="72" height="92"  rx="6"  fill="var(--bg-subtle)" />
      {/* Label lines */}
      <rect x="22" y="52" width="56" height="0.8" fill={accent} opacity="0.25" />
      <rect x="22" y="96" width="56" height="0.8" fill={accent} opacity="0.18" />
      {/* Brand name */}
      <text x="50" y="78" textAnchor="middle" fontFamily="Georgia,serif" fontSize="9"
            fill={accent} opacity="0.85" letterSpacing="2.5">
        eSibha
      </text>
      {/* Liquid fill hint */}
      <rect x="14" y="88" width="72" height="50" rx="0 0 6 6" fill={accent} opacity="0.06" />
    </svg>
  );
}