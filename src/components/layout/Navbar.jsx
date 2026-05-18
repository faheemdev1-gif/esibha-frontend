import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCartStore, useUIStore } from '../../store';
import { SearchIcon, BagIcon, MenuIcon, CloseIcon, UserIcon } from '../ui/Icons';

const NAV_LINKS = [
  { label: 'Shop',             href: '/shop' },
  { label: 'Fragrance Finder', href: '/finder' },
  { label: 'Custom Lab',       href: '/lab' },
  { label: 'Hybrid Creator',   href: '/hybrid' },
  { label: 'The Quiz',         href: '/quiz' },
  { label: 'Gifting',          href: '/gifting' },
  { label: 'Journal',          href: '/journal' },
];

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [shopOpen,   setShopOpen]   = useState(false);
  const location = useLocation();
  const { toggleCart }      = useUIStore();
  const { toggleMobileMenu, mobileMenuOpen, closeMobileMenu } = useUIStore();
  const totalItems = useCartStore(s => s.items.reduce((a, i) => a + i.qty, 0));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { closeMobileMenu(); }, [location.pathname]);

  const isActive = href => location.pathname.startsWith(href);

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        height: 'var(--nav-h)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 var(--s7)',
        background: scrolled ? 'rgba(247,247,248,0.94)' : 'var(--bg-white)',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: `1px solid ${scrolled ? 'var(--border)' : 'var(--border-soft)'}`,
        transition: 'all var(--base) var(--ease)',
      }}>

        {/* Logo */}
        <Link to="/" style={{
          fontFamily: 'var(--serif)', fontSize: '22px', fontWeight: 300,
          color: 'var(--text-primary)', letterSpacing: '0.18em',
          textDecoration: 'none', flexShrink: 0,
        }}>
          eSibha
        </Link>

        {/* Centre links */}
        <div style={{ display: 'flex', gap: '36px', alignItems: 'center' }}>
          {/* Shop with dropdown */}
          <div
            style={{ position: 'relative' }}
            onMouseEnter={() => setShopOpen(true)}
            onMouseLeave={() => setShopOpen(false)}
          >
            <Link to="/shop" style={linkStyle(isActive('/shop'))}>Shop</Link>
            {shopOpen && (
              <div style={{
                position: 'absolute', top: '100%', left: '50%',
                transform: 'translateX(-50%)',
                marginTop: '8px',
                background: 'var(--bg-white)',
                border: '1px solid var(--border)',
                borderRadius: '2px',
                boxShadow: 'var(--shadow-md)',
                padding: '8px 0',
                minWidth: '160px',
                animation: 'slideDown var(--fast) var(--ease)',
              }}>
                {[["Men's","/shop/mens"],["Women's","/shop/womens"],["Unisex","/shop/unisex"],["Gift Packs","/shop/gifts"],["Seasonal","/shop/seasonal"]].map(([l, h]) => (
                  <Link key={h} to={h} style={{
                    display: 'block', padding: '9px 20px',
                    fontSize: '12px', letterSpacing: '0.08em',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    transition: 'color var(--fast)',
                  }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                  >{l}</Link>
                ))}
              </div>
            )}
          </div>

          {NAV_LINKS.slice(1).map(({ label, href }) => (
            <Link key={href} to={href} style={linkStyle(isActive(href))}>{label}</Link>
          ))}
        </div>

        {/* Right icons */}
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Link to="/account" style={iconBtnStyle} title="Account"><UserIcon size={18} /></Link>
          <button onClick={toggleCart} style={{ ...iconBtnStyle, position: 'relative' }} title="Cart">
            <BagIcon size={18} />
            {totalItems > 0 && (
              <span style={{
                position: 'absolute', top: '-7px', right: '-7px',
                background: 'var(--accent)', color: '#fff',
                fontSize: '9px', width: '17px', height: '17px',
                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{totalItems}</span>
            )}
          </button>
          <button onClick={toggleMobileMenu} style={iconBtnStyle} title="Menu">
            {mobileMenuOpen ? <CloseIcon size={18} /> : <MenuIcon size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile / full menu overlay */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 190,
          background: 'var(--bg-white)',
          paddingTop: 'var(--nav-h)',
          animation: 'fadeIn var(--base) var(--ease)',
          overflowY: 'auto',
        }}>
          <div style={{ padding: 'var(--s7)' }}>
            {[...NAV_LINKS, { label: 'Our Story', href: '/about' }, { label: 'Contact', href: '/contact' }].map(({ label, href }) => (
              <Link key={href} to={href} style={{
                display: 'block',
                fontFamily: 'var(--serif)',
                fontSize: '32px', fontWeight: 300,
                color: 'var(--text-primary)',
                padding: '14px 0',
                borderBottom: '1px solid var(--border-soft)',
                textDecoration: 'none',
                letterSpacing: '0.04em',
              }}>{label}</Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

const linkStyle = active => ({
  fontFamily: 'var(--sans)',
  fontSize: '11px', fontWeight: 400,
  letterSpacing: '0.14em', textTransform: 'uppercase',
  color: active ? 'var(--accent)' : 'var(--text-secondary)',
  textDecoration: 'none',
  transition: 'color var(--fast)',
});

const iconBtnStyle = {
  background: 'none', border: 'none',
  color: 'var(--text-secondary)', cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  padding: '4px',
  transition: 'color var(--fast)',
  textDecoration: 'none',
};