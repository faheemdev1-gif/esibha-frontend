import { useEffect, useRef, useState } from 'react';

export default function ReviewGallery({ reviews }) {
  const trackRef = useRef(null);
  const [activeReview, setActiveReview] = useState(null);

  useEffect(() => {
    if (activeReview === null) return undefined;

    const handleKeyDown = event => {
      if (event.key === 'Escape') setActiveReview(null);
      if (event.key === 'ArrowRight') {
        setActiveReview(current => (current + 1) % reviews.length);
      }
      if (event.key === 'ArrowLeft') {
        setActiveReview(current => (current - 1 + reviews.length) % reviews.length);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeReview, reviews.length]);

  const scrollReviews = direction => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({
      left: direction * Math.min(track.clientWidth * 0.82, 720),
      behavior: 'smooth',
    });
  };

  const showPrevious = () => {
    setActiveReview(current => (current - 1 + reviews.length) % reviews.length);
  };

  const showNext = () => {
    setActiveReview(current => (current + 1) % reviews.length);
  };

  return (
    <section className="customer-reviews" aria-labelledby="customer-reviews-title">
      <style>{`
        .customer-reviews {
          padding: var(--s9) 0;
          overflow: hidden;
          color: #fff;
          border-top: 1px solid rgba(216,178,110,.22);
          border-bottom: 1px solid rgba(216,178,110,.16);
          background: radial-gradient(circle at 15% 0%, rgba(216,178,110,.12), transparent 30%), linear-gradient(135deg, #0b0b0b, #15120e 55%, #080808);
        }
        .customer-reviews__header {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 24px;
          margin-bottom: var(--s6);
        }
        .customer-reviews__eyebrow {
          margin-bottom: 10px;
          color: #d8b26e;
          font-size: 9px;
          letter-spacing: .2em;
          text-transform: uppercase;
        }
        .customer-reviews__title {
          margin: 0;
          color: #fff;
          font-family: var(--serif);
          font-size: clamp(34px, 4vw, 52px);
          font-weight: 300;
          line-height: 1.05;
        }
        .customer-reviews__intro {
          max-width: 430px;
          margin: 16px 0 0;
          color: rgba(255,255,255,.58);
          font-size: 13px;
          font-weight: 300;
          line-height: 1.7;
        }
        .customer-reviews__controls { display: flex; gap: 10px; }
        .customer-reviews__arrow,
        .review-lightbox__control,
        .review-lightbox__close {
          display: grid;
          place-items: center;
          border: 1px solid rgba(216,178,110,.4);
          color: #d8b26e;
          background: rgba(255,255,255,.035);
          cursor: pointer;
          transition: background .2s ease, color .2s ease, border-color .2s ease;
        }
        .customer-reviews__arrow { width: 44px; height: 44px; }
        .customer-reviews__arrow:hover,
        .review-lightbox__control:hover,
        .review-lightbox__close:hover {
          color: #111;
          border-color: #d8b26e;
          background: #d8b26e;
        }
        .customer-reviews__track {
          display: grid;
          grid-auto-flow: column;
          grid-auto-columns: clamp(210px, 23vw, 280px);
          gap: clamp(14px, 2vw, 24px);
          overflow-x: auto;
          padding: 5px max(24px, calc((100vw - 1200px) / 2)) 22px;
          scroll-padding-inline: max(24px, calc((100vw - 1200px) / 2));
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
        }
        .customer-reviews__track::-webkit-scrollbar { display: none; }
        .review-card {
          position: relative;
          padding: 8px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,.1);
          border-radius: 18px;
          background: linear-gradient(145deg, rgba(255,255,255,.1), rgba(255,255,255,.025));
          box-shadow: 0 24px 60px rgba(0,0,0,.35);
          cursor: zoom-in;
          scroll-snap-align: start;
          transition: transform .3s ease, border-color .3s ease;
        }
        .review-card:hover {
          border-color: rgba(216,178,110,.5);
          transform: translateY(-5px);
        }
        .review-card__image {
          display: block;
          width: 100%;
          aspect-ratio: 9 / 16;
          border-radius: 11px;
          object-fit: cover;
          background: #eee;
        }
        .review-card__badge {
          position: absolute;
          right: 18px;
          bottom: 18px;
          padding: 8px 10px;
          border: 1px solid rgba(216,178,110,.5);
          border-radius: 999px;
          color: #f1d397;
          background: rgba(8,8,8,.82);
          backdrop-filter: blur(8px);
          font-size: 8px;
          letter-spacing: .14em;
          text-transform: uppercase;
        }
        .customer-reviews__hint {
          margin: 2px 0 0;
          color: rgba(255,255,255,.36);
          font-size: 10px;
          letter-spacing: .12em;
          text-align: center;
          text-transform: uppercase;
        }
        .review-lightbox {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: grid;
          grid-template-columns: 64px minmax(0,1fr) 64px;
          align-items: center;
          gap: 20px;
          padding: 28px;
          background: rgba(0,0,0,.93);
          backdrop-filter: blur(12px);
        }
        .review-lightbox__figure {
          display: flex;
          min-width: 0;
          height: min(86vh, 920px);
          margin: 0;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }
        .review-lightbox__image {
          display: block;
          width: auto;
          max-width: 100%;
          min-height: 0;
          flex: 1;
          object-fit: contain;
          border-radius: 12px;
          box-shadow: 0 30px 90px rgba(0,0,0,.7);
        }
        .review-lightbox__caption {
          color: rgba(255,255,255,.7);
          font-size: 11px;
          letter-spacing: .1em;
        }
        .review-lightbox__control {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          font-size: 24px;
        }
        .review-lightbox__close {
          position: absolute;
          top: 24px;
          right: 24px;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          font-size: 20px;
        }
        @media (max-width: 700px) {
          .customer-reviews__header { align-items: start; }
          .customer-reviews__controls { display: none; }
          .customer-reviews__track {
            grid-auto-columns: min(78vw, 280px);
            padding-inline: 20px;
            scroll-padding-inline: 20px;
          }
          .review-lightbox {
            grid-template-columns: 38px minmax(0,1fr) 38px;
            gap: 5px;
            padding: 72px 8px 20px;
          }
          .review-lightbox__control { width: 36px; height: 36px; font-size: 18px; }
          .review-lightbox__close { top: 18px; right: 18px; }
          .review-lightbox__figure { height: 82vh; }
        }
        @media (prefers-reduced-motion: reduce) {
          .review-card, .customer-reviews__arrow { transition: none; }
        }
      `}</style>

      <div className="container customer-reviews__header">
        <div>
          <p className="customer-reviews__eyebrow">Verified Client Stories</p>
          <h2 className="customer-reviews__title" id="customer-reviews-title">Loved in Real Life</h2>
          <p className="customer-reviews__intro">Real messages from customers who made eSibha part of their everyday rituals.</p>
        </div>
        <div className="customer-reviews__controls" aria-label="Review gallery controls">
          <button className="customer-reviews__arrow" type="button" onClick={() => scrollReviews(-1)} aria-label="Previous reviews">←</button>
          <button className="customer-reviews__arrow" type="button" onClick={() => scrollReviews(1)} aria-label="Next reviews">→</button>
        </div>
      </div>

      <div className="customer-reviews__track" ref={trackRef}>
        {reviews.map((review, index) => (
          <button className="review-card" type="button" key={review.image} onClick={() => setActiveReview(index)} aria-label={`Open review from ${review.name}`}>
            <img className="review-card__image" src={review.image} alt={`Customer feedback from ${review.name}`} loading="lazy" decoding="async" />
            <span className="review-card__badge">View review</span>
          </button>
        ))}
      </div>
      <p className="customer-reviews__hint">Swipe or drag to explore · Tap to enlarge</p>

      {activeReview !== null && (
        <div className="review-lightbox" role="dialog" aria-modal="true" aria-label={`Review from ${reviews[activeReview].name}`} onMouseDown={event => { if (event.target === event.currentTarget) setActiveReview(null); }}>
          <button className="review-lightbox__close" type="button" onClick={() => setActiveReview(null)} aria-label="Close review">×</button>
          <button className="review-lightbox__control" type="button" onClick={showPrevious} aria-label="Previous review">‹</button>
          <figure className="review-lightbox__figure">
            <img className="review-lightbox__image" src={reviews[activeReview].image} alt={`Customer feedback from ${reviews[activeReview].name}`} />
            <figcaption className="review-lightbox__caption">{reviews[activeReview].name} · {activeReview + 1} of {reviews.length}</figcaption>
          </figure>
          <button className="review-lightbox__control" type="button" onClick={showNext} aria-label="Next review">›</button>
        </div>
      )}
    </section>
  );
}
