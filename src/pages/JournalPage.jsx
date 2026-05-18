import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { JOURNAL_POSTS } from '../data/seed';
import { ArrowRight } from '../components/ui/Icons';

const CATEGORIES = ['All', 'Education', 'Ingredients', 'Guide', 'Opinion', 'Seasonal'];

export default function JournalPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const navigate = useNavigate();

  const posts = activeCategory === 'All'
    ? JOURNAL_POSTS
    : JOURNAL_POSTS.filter(p => p.category === activeCategory);

  return (
    <div style={{ paddingTop: 'var(--nav-h)', background: 'var(--bg)', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: 'var(--bg-white)', borderBottom: '1px solid var(--border)', padding: 'var(--s8) var(--s7)' }}>
        <div className="container" style={{ padding: 0 }}>
          <p className="section-eyebrow">Journal</p>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(36px,5vw,60px)', fontWeight: 300, color: 'var(--text-primary)', marginBottom: 'var(--s5)' }}>
            Stories & Craft
          </h1>

          {/* Category filters */}
          <div style={{ display: 'flex', gap: 'var(--s3)', flexWrap: 'wrap' }}>
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase',
                padding: '6px 16px', borderRadius: '999px',
                border: `1px solid ${activeCategory === cat ? 'var(--accent)' : 'var(--border)'}`,
                background: activeCategory === cat ? 'var(--accent-light)' : 'transparent',
                color: activeCategory === cat ? 'var(--accent-dark)' : 'var(--text-muted)',
                cursor: 'pointer', fontFamily: 'var(--sans)',
                transition: 'all var(--fast)',
              }}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="container" style={{ padding: 'var(--s8) var(--s7)' }}>
        {/* Featured first post */}
        {posts[0] && (
          <div
            onClick={() => navigate(`/journal/${posts[0].slug}`)}
            style={{
              background: 'var(--bg-white)', border: '1px solid var(--border)', borderRadius: '2px',
              padding: 'var(--s8)', marginBottom: 'var(--s6)', cursor: 'pointer',
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--s8)',
              alignItems: 'center', boxShadow: 'var(--shadow-sm)',
              transition: 'box-shadow var(--base)',
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--shadow-md)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = 'var(--shadow-sm)'}
          >
            <div>
              <div style={{ display: 'flex', gap: 'var(--s3)', marginBottom: 'var(--s4)', alignItems: 'center' }}>
                <span style={{ fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent)', background: 'var(--accent-light)', padding: '3px 10px', borderRadius: '999px' }}>
                  Featured
                </span>
                <span style={{ fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                  {posts[0].category}
                </span>
              </div>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(24px,3vw,34px)', fontWeight: 400, color: 'var(--text-primary)', lineHeight: 1.25, marginBottom: 'var(--s4)' }}>
                {posts[0].title}
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: 'var(--s5)', fontWeight: 300 }}>
                {posts[0].excerpt}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--s2)', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)' }}>
                Read More <ArrowRight size={12} />
              </div>
            </div>
            {/* Decorative placeholder for article image */}
            <div style={{
              background: 'var(--bg-accent)', borderRadius: '2px', height: '280px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: '48px', color: 'var(--accent)', opacity: 0.3 }}>"</div>
            </div>
          </div>
        )}

        {/* Remaining posts grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--s5)' }}>
          {posts.slice(1).map(post => (
            <article
              key={post.id}
              onClick={() => navigate(`/journal/${post.slug}`)}
              style={{
                background: 'var(--bg-white)', border: '1px solid var(--border)',
                borderRadius: '2px', padding: 'var(--s6)', cursor: 'pointer',
                transition: 'box-shadow var(--base)',
                boxShadow: 'var(--shadow-sm)',
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--shadow-md)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = 'var(--shadow-sm)'}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--s4)' }}>
                <span style={{ fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)' }}>
                  {post.category}
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{post.date}</span>
              </div>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '20px', fontWeight: 400, color: 'var(--text-primary)', lineHeight: 1.3, marginBottom: 'var(--s3)' }}>
                {post.title}
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.7, fontWeight: 300, marginBottom: 'var(--s4)' }}>
                {post.excerpt}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)' }}>
                Read More <ArrowRight size={11} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}