import { useParams, useNavigate } from 'react-router-dom';
import { JOURNAL_POSTS } from '../data/seed';
import Button from '../components/ui/Button';
import { ArrowLeft, ArrowRight } from '../components/ui/Icons';

// Article body content keyed by slug
const CONTENT = {
  'art-of-the-sillage': `The word "sillage" — pronounced see-yazh — is French for wake, as in the trail left by a ship moving through water. In perfumery, it refers to the cloud of scent that follows you as you move through a room.

What determines sillage? Primarily the molecular weight of the base notes. Lighter molecules evaporate quickly and produce little trail. Heavier molecules — musks, resins, ambers — linger in the air long after you've passed.

Fragrances with exceptional sillage tend to share certain characteristics: strong base notes that anchor the composition, high concentrations of Eau de Parfum or Parfum, and ingredients with a natural radiance — like iso E super, ambroxan, or hedione — that amplify the projection of everything around them.

At eSibha, we pay close attention to the sillage of every fragrance we create. Our goal is a trail that is noticeable without being intrusive: a signature that enters the room with you, and lingers just long enough to be remembered.`,

  'oud-black-gold': `Oud — also known as agarwood, eaglewood, or oud al-hindi — is produced when the Aquilaria tree becomes infected with a specific mould. In response, the tree generates a dark, resinous heartwood. It is this wood, and the oil distilled from it, that produces one of the most complex and coveted raw materials in perfumery.

The finest oud comes from trees that are decades old. The infection must be present for years before the resin develops sufficient depth. Wild agarwood is now critically endangered, making sustainably farmed oud — from Bangladesh, India, Malaysia, and Vietnam — increasingly important.

The scent of oud is famously difficult to describe: smoky, animalic, sweet, woody, and almost medicinal, all at once. No two batches smell identical.`,

  'how-to-layer-fragrances': `Layering fragrances is an ancient art. In Japan, the practice of kōdō — the way of incense — developed a sophisticated vocabulary for blending aromatic woods and resins to create complex olfactory experiences.

The principle is simple: apply a base fragrance to the skin, let it settle for 60 seconds, then apply a second fragrance on top. The two compositions interact with your skin chemistry to produce something entirely new.

Rules for effective layering: put heavier, darker fragrances on first and lighter ones on top. Woods and musks anchor; citrus and florals float. Never use more than two fragrances at once — complexity beyond that becomes confusion.`,
};

const FALLBACK = `This article explores one of the most fascinating aspects of the world of luxury fragrance. Our editorial team researches each topic in depth, drawing on conversations with master perfumers, raw material suppliers, and the broader fragrance community.

We believe that understanding the craft behind a scent makes wearing it a richer experience. Fragrance is memory, emotion, and identity — and the more you know about what you're wearing, the more intentional your relationship with it becomes.`;

export default function JournalPostPage() {
  const { slug }  = useParams();
  const navigate  = useNavigate();
  const post      = JOURNAL_POSTS.find(p => p.slug === slug);
  const content   = CONTENT[slug] || FALLBACK;

  const currentIdx = JOURNAL_POSTS.findIndex(p => p.slug === slug);
  const prev = JOURNAL_POSTS[currentIdx - 1];
  const next = JOURNAL_POSTS[currentIdx + 1];

  if (!post) return (
    <div style={{ paddingTop: 'var(--nav-h)', textAlign: 'center', padding: '120px 40px' }}>
      <p style={{ fontFamily: 'var(--serif)', fontSize: '28px', color: 'var(--text-muted)' }}>Article not found.</p>
      <Button variant="secondary" onClick={() => navigate('/journal')} style={{ marginTop: '20px' }}>Back to Journal</Button>
    </div>
  );

  return (
    <div style={{ paddingTop: 'var(--nav-h)', background: 'var(--bg)' }}>
      {/* Hero */}
      <div style={{ background: 'var(--bg-white)', borderBottom: '1px solid var(--border)', padding: 'var(--s9) var(--s7)', textAlign: 'center' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <button onClick={() => navigate('/journal')} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            color: 'var(--text-muted)', fontSize: '12px', letterSpacing: '0.08em',
            marginBottom: 'var(--s5)',
          }}>
            <ArrowLeft size={13} /> Journal
          </button>
          <div style={{ display: 'flex', gap: 'var(--s3)', justifyContent: 'center', marginBottom: 'var(--s4)' }}>
            <span style={{ fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--accent)', background: 'var(--accent-light)', padding: '3px 10px', borderRadius: '999px' }}>
              {post.category}
            </span>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{post.date}</span>
          </div>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(30px,5vw,52px)', fontWeight: 300, lineHeight: 1.15, color: 'var(--text-primary)' }}>
            {post.title}
          </h1>
        </div>
      </div>

      {/* Article body */}
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: 'var(--s9) var(--s7)' }}>
        {/* Lede */}
        <p style={{ fontFamily: 'var(--serif)', fontSize: '20px', fontWeight: 300, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 'var(--s7)', fontStyle: 'italic' }}>
          {post.excerpt}
        </p>

        <div style={{ width: '40px', height: '1px', background: 'var(--accent)', marginBottom: 'var(--s7)' }} />

        {/* Body paragraphs */}
        {content.split('\n\n').map((para, i) => (
          <p key={i} style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.85, marginBottom: 'var(--s5)', fontWeight: 300 }}>
            {para}
          </p>
        ))}

        {/* Author line */}
        <div style={{ marginTop: 'var(--s8)', paddingTop: 'var(--s6)', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 'var(--s4)' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--bg-accent)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontFamily: 'var(--serif)', fontSize: '16px', color: 'var(--accent)' }}>e</span>
          </div>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-primary)', letterSpacing: '0.06em' }}>eSibha Editorial</div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Fragrance House · {post.date}</div>
          </div>
        </div>

        {/* Prev / Next navigation */}
        <div style={{ marginTop: 'var(--s8)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--s5)' }}>
          {prev ? (
            <button onClick={() => navigate(`/journal/${prev.slug}`)} style={{
              background: 'var(--bg-white)', border: '1px solid var(--border)', borderRadius: '2px',
              padding: 'var(--s5)', cursor: 'pointer', textAlign: 'left', fontFamily: 'var(--sans)',
              transition: 'box-shadow var(--fast)',
            }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--shadow-sm)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
            >
              <div style={{ fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 'var(--s2)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ArrowLeft size={11} /> Previous
              </div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: '15px', color: 'var(--text-primary)', lineHeight: 1.35 }}>{prev.title}</div>
            </button>
          ) : <div />}

          {next && (
            <button onClick={() => navigate(`/journal/${next.slug}`)} style={{
              background: 'var(--bg-white)', border: '1px solid var(--border)', borderRadius: '2px',
              padding: 'var(--s5)', cursor: 'pointer', textAlign: 'right', fontFamily: 'var(--sans)',
              transition: 'box-shadow var(--fast)',
            }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--shadow-sm)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
            >
              <div style={{ fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 'var(--s2)', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
                Next <ArrowRight size={11} />
              </div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: '15px', color: 'var(--text-primary)', lineHeight: 1.35 }}>{next.title}</div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}