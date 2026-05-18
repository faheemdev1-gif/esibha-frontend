import { useState, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { PRODUCTS } from '../data/seed';
import ProductCard from '../components/shop/ProductCard';
import ShopFilters from '../components/shop/ShopFilters';

const CATEGORIES = {
  mens:     "Men's",
  womens:   "Women's",
  unisex:   'Unisex',
  gifts:    'Gift Packs',
  seasonal: 'Seasonal',
};

const SORT_OPTIONS = [
  { value: 'default',    label: 'Bestselling' },
  { value: 'new',        label: 'New Arrivals' },
  { value: 'price-asc',  label: 'Price: Low – High' },
  { value: 'price-desc', label: 'Price: High – Low' },
];

export default function ShopPage() {
  const { category } = useParams();           // e.g. "mens"
  const [searchParams] = useSearchParams();

  const [filters, setFilters] = useState({ family: 'All', intensity: [], sizes: [] });
  const [sort,    setSort]    = useState('default');

  const catLabel = CATEGORIES[category] || null;

  const products = useMemo(() => {
    let list = [...PRODUCTS];

    // Category filter
    if (catLabel) list = list.filter(p => p.category === catLabel);

    // Family
    if (filters.family !== 'All') list = list.filter(p => p.family === filters.family);

    // Intensity — numeric map
    if (filters.intensity?.length) {
      const intensityMap = { Light: [0,40], Moderate: [40,65], Strong: [65,82], 'Very Strong': [82,100] };
      list = list.filter(p => filters.intensity.some(i => {
        const [min, max] = intensityMap[i] || [0, 100];
        return p.intensity >= min && p.intensity < max;
      }));
    }

    // Sort
    if (sort === 'price-asc')  list.sort((a,b) => a.sizes[1].price - b.sizes[1].price);
    if (sort === 'price-desc') list.sort((a,b) => b.sizes[1].price - a.sizes[1].price);
    if (sort === 'default')    list.sort((a,b) => (b.bestseller ? 1 : 0) - (a.bestseller ? 1 : 0));

    return list;
  }, [catLabel, filters, sort]);

  const pageTitle = catLabel || 'All Fragrances';

  return (
    <div style={{ paddingTop: 'var(--nav-h)' }}>
      {/* Page header */}
      <div style={{ background: 'var(--bg-white)', borderBottom: '1px solid var(--border)', padding: 'var(--s7) var(--s7) var(--s5)' }}>
        <div className="container" style={{ padding: 0 }}>
          <p className="section-eyebrow">Collection</p>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--s4)' }}>
            <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(32px,5vw,52px)', fontWeight: 300, color: 'var(--text-primary)' }}>
              {pageTitle}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s3)' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>{products.length} fragrances</span>
              <select value={sort} onChange={e => setSort(e.target.value)} style={{
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
                padding: '8px 14px',
                borderRadius: '2px',
                fontSize: '11px', letterSpacing: '0.06em',
                fontFamily: 'var(--sans)', outline: 'none', cursor: 'pointer',
              }}>
                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>

          {/* Category sub-nav */}
          <div style={{ display: 'flex', gap: 'var(--s3)', marginTop: 'var(--s5)', flexWrap: 'wrap' }}>
            {[['All', '/shop'], ["Men's", '/shop/mens'], ["Women's", '/shop/womens'], ['Unisex', '/shop/unisex'], ['Gift Packs', '/shop/gifts'], ['Seasonal', '/shop/seasonal']].map(([label, href]) => (
              <a key={href} href={href} style={{
                fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase',
                padding: '5px 14px', borderRadius: '999px',
                border: `1px solid ${(!category && label === 'All') || CATEGORIES[category] === label ? 'var(--accent)' : 'var(--border)'}`,
                color: (!category && label === 'All') || CATEGORIES[category] === label ? 'var(--accent)' : 'var(--text-muted)',
                background: (!category && label === 'All') || CATEGORIES[category] === label ? 'var(--accent-light)' : 'transparent',
                textDecoration: 'none',
                transition: 'all var(--fast)',
              }}>
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="container" style={{ padding: 'var(--s7)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 'var(--s7)', alignItems: 'start' }}>
          <ShopFilters filters={filters} onChange={setFilters} />
          <div>
            {products.length === 0 ? (
              <div style={{ textAlign: 'center', paddingTop: 'var(--s10)' }}>
                <p style={{ fontFamily: 'var(--serif)', fontSize: '26px', color: 'var(--text-muted)', marginBottom: 'var(--s3)' }}>No results</p>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Try adjusting your filters.</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--s5)' }}>
                {products.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}