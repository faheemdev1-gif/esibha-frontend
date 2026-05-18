import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QUIZ_QUESTIONS, PRODUCTS } from '../data/seed';
import Button from '../components/ui/Button';
import ProductCard from '../components/shop/ProductCard';
import { ArrowRight, ArrowLeft } from '../components/ui/Icons';

export default function QuizPage() {
  const [step,    setStep]    = useState(0); // 0 = intro, 1-4 = questions, 5 = results
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  const totalSteps = QUIZ_QUESTIONS.length;
  const currentQ   = QUIZ_QUESTIONS[step - 1];

  const handleAnswer = (qId, value) => {
    const next = { ...answers, [qId]: value };
    setAnswers(next);
    if (step < totalSteps) {
      setTimeout(() => setStep(s => s + 1), 320);
    } else {
      setTimeout(() => setStep(totalSteps + 1), 320);
    }
  };

  // Tally votes → pick winning family
  const getResults = () => {
    const tally = {};
    Object.values(answers).forEach(v => { tally[v] = (tally[v] || 0) + 1; });
    const winner = Object.entries(tally).sort((a, b) => b[1] - a[1])[0]?.[0];
    const familyMap = {
      fresh:  'Fresh & Citrus',
      floral: 'Floral',
      oud:    'Oud & Amber',
      woody:  'Woody & Oriental',
      musk:   'Musk',
    };
    const targetFamily = familyMap[winner] || 'Oud & Amber';
    return PRODUCTS.filter(p => p.family === targetFamily).slice(0, 4);
  };

  const progress = step > 0 && step <= totalSteps ? (step / totalSteps) * 100 : 0;

  return (
    <div style={{ paddingTop: 'var(--nav-h)', background: 'var(--bg)', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: 'var(--bg-white)', borderBottom: '1px solid var(--border)', padding: 'var(--s8) var(--s7)', textAlign: 'center' }}>
        <p className="section-eyebrow" style={{ textAlign: 'center' }}>Scent Quiz</p>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(34px,5vw,56px)', fontWeight: 300, color: 'var(--text-primary)', marginBottom: 'var(--s3)' }}>
          Find Your <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Signature</em>
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '400px', margin: '0 auto', lineHeight: 1.75, fontWeight: 300 }}>
          Four questions. Your perfect fragrance profile.
        </p>

        {/* Progress bar */}
        {step > 0 && step <= totalSteps && (
          <div style={{ maxWidth: '400px', margin: 'var(--s5) auto 0', height: '2px', background: 'var(--border)', borderRadius: '1px' }}>
            <div style={{ width: `${progress}%`, height: '100%', background: 'var(--accent)', borderRadius: '1px', transition: 'width 0.4s var(--ease)' }} />
          </div>
        )}
      </div>

      <div style={{ maxWidth: '640px', margin: '0 auto', padding: 'var(--s9) var(--s7)' }}>

        {/* ── INTRO ─────────────────────────────────────────── */}
        {step === 0 && (
          <div className="fade-in" style={{ textAlign: 'center' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 'var(--s4)', marginBottom: 'var(--s7)' }}>
              {[
                { icon: '◈', title: 'Quick & Simple', sub: 'Just 4 questions' },
                { icon: '◇', title: 'Personalised',   sub: 'Based on your lifestyle' },
                { icon: '◆', title: 'Curated Match',  sub: 'From our full collection' },
                { icon: '◉', title: 'No Account',     sub: 'No sign-up needed' },
              ].map(card => (
                <div key={card.title} style={{ background: 'var(--bg-white)', border: '1px solid var(--border)', borderRadius: '2px', padding: 'var(--s5)', textAlign: 'left' }}>
                  <div style={{ fontSize: '20px', color: 'var(--accent)', marginBottom: 'var(--s3)' }}>{card.icon}</div>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: '16px', color: 'var(--text-primary)', marginBottom: '3px' }}>{card.title}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{card.sub}</div>
                </div>
              ))}
            </div>
            <Button size="lg" onClick={() => setStep(1)}>
              Start the Quiz <ArrowRight size={14} />
            </Button>
          </div>
        )}

        {/* ── QUESTION ──────────────────────────────────────── */}
        {step >= 1 && step <= totalSteps && currentQ && (
          <div key={step} className="fade-in">
            <div style={{ marginBottom: 'var(--s3)', fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Question {step} of {totalSteps}
            </div>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(24px,4vw,34px)', fontWeight: 300, color: 'var(--text-primary)', lineHeight: 1.25, marginBottom: 'var(--s7)' }}>
              {currentQ.question}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s3)' }}>
              {currentQ.options.map(opt => (
                <AnswerOption
                  key={opt.value}
                  label={opt.label}
                  selected={answers[currentQ.id] === opt.value}
                  onClick={() => handleAnswer(currentQ.id, opt.value)}
                />
              ))}
            </div>
            {step > 1 && (
              <button onClick={() => setStep(s => s - 1)} style={{
                marginTop: 'var(--s5)', background: 'none', border: 'none',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
                color: 'var(--text-muted)', fontSize: '12px', letterSpacing: '0.08em',
              }}>
                <ArrowLeft size={13} /> Previous
              </button>
            )}
          </div>
        )}

        {/* ── RESULTS ───────────────────────────────────────── */}
        {step === totalSteps + 1 && (
          <div className="fade-in">
            <div style={{ textAlign: 'center', marginBottom: 'var(--s7)' }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: '13px', color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 'var(--s3)' }}>
                Your Scent Profile
              </div>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px,4vw,42px)', fontWeight: 300, color: 'var(--text-primary)', marginBottom: 'var(--s4)' }}>
                We Found Your Match
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.75, fontWeight: 300 }}>
                Based on your answers, these fragrances are made for you.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--s5)', marginBottom: 'var(--s7)' }}>
              {getResults().map(p => <ProductCard key={p.id} product={p} />)}
            </div>

            <div style={{ display: 'flex', gap: 'var(--s4)', justifyContent: 'center' }}>
              <Button variant="secondary" onClick={() => { setStep(0); setAnswers({}); }}>Retake Quiz</Button>
              <Button onClick={() => navigate('/shop')}>Shop All Fragrances</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function AnswerOption({ label, selected, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: '100%', padding: 'var(--s5) var(--s6)',
        background: selected ? 'var(--accent-light)' : hov ? 'var(--bg-white)' : 'var(--bg-white)',
        border: `1px solid ${selected ? 'var(--accent)' : hov ? 'var(--accent)' : 'var(--border)'}`,
        borderRadius: '2px', cursor: 'pointer',
        fontFamily: 'var(--serif)', fontSize: '18px', fontWeight: 400,
        color: selected ? 'var(--accent-dark)' : 'var(--text-primary)',
        textAlign: 'left',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        transition: 'all var(--fast)',
        boxShadow: hov || selected ? 'var(--shadow-sm)' : 'none',
      }}
    >
      {label}
      {selected && <span style={{ color: 'var(--accent)', fontSize: '16px' }}>✓</span>}
    </button>
  );
}
