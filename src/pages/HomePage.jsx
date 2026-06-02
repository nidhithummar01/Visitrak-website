import { useState } from 'react';
import { ArrowRight, Check, MessageSquare, TrendingUp, Search, FileText, Star, Zap } from 'lucide-react';

const solutions = [
  {
    id: 'chatbot', Icon: MessageSquare, num: '01',
    title: 'AI Chatbot Pre-Registration',
    headline: 'From 2 minutes to 30 seconds',
    desc: 'Visitors type who they are visiting — the AI auto-fills name, host, purpose and prints the badge. No forms, no friction, no queues.',
    before: ['10-field manual form', '2–3 minutes per registration', 'Staff answer the same FAQs', 'Visitors abandon long forms'],
    after:  ['One natural sentence to check in', '30 seconds end-to-end', '80% of FAQs handled automatically', 'Higher completion, no frustration'],
    metrics: [{ v: '3×', l: 'Faster' }, { v: '80%', l: 'Less FAQ work' }, { v: '30s', l: 'Check-in time' }, { v: '24/7', l: 'Available' }],
    client: 'Your visitors will register 3× faster and reception staff will stop answering the same questions all day.',
  },
  {
    id: 'forecast', Icon: TrendingUp, num: '02',
    title: 'Predictive Traffic Forecasting',
    headline: 'Know next week\'s visitors today',
    desc: 'ML models trained on your historical data predict visitor volume with ±8% accuracy. Schedule the right number of staff before rush hours arrive.',
    before: ['Only see yesterday\'s numbers', 'Understaffed during rush hours', 'Guess when to add reception staff', 'React after problems happen'],
    after:  ['See predicted count for next week', 'Schedule exact staff needed in advance', '"Monday 10 AM = 50+ visitors" — weeks ahead', 'Prepare before problems happen'],
    metrics: [{ v: '±8%', l: 'Accuracy' }, { v: '5h', l: 'Saved/week' }, { v: '2 wk', l: 'Forecast window' }, { v: '0', l: 'Surprises' }],
    client: 'You will know exactly how many visitors to expect so staffing is always right — no overtime, no gaps.',
  },
  {
    id: 'nlsearch', Icon: Search, num: '03',
    title: 'Natural Language Search',
    headline: 'Plain English. Results in 3 seconds.',
    desc: 'Security staff type a plain question — "Show all KPMG visitors last week" — instead of clicking 5 filter dropdowns. Critical during emergencies.',
    before: ['5–6 filter dropdowns to click', '1–2 minutes to find one record', 'Panic searching during emergencies', 'New staff need training on filters'],
    after:  ['Type one sentence and press Enter', 'Results appear in 3 seconds', 'Instant answers during any emergency', 'Anyone can use it from day one'],
    metrics: [{ v: '3s', l: 'Search time' }, { v: '0', l: 'Training needed' }, { v: '100%', l: 'Searchable' }, { v: '∞', l: 'Query types' }],
    client: 'During emergencies your team gets instant answers. No more panic-clicking through filters when every second counts.',
  },
  {
    id: 'compliance', Icon: FileText, num: '04',
    title: 'Auto Compliance Reports',
    headline: '10 hours of manual work in 5 minutes',
    desc: 'AI pulls visitor data and formats it into audit-ready reports for HIPAA, SOX, GDPR and banking regulations — automatically, on schedule.',
    before: ['10+ hours per week compiling manually', 'Human errors in copied data', 'Miss deadlines, scramble before audits', 'Anomalies hidden in thousands of rows'],
    after:  ['Auto-generated in 5 minutes', '100% accurate — pulled directly from source', 'Always audit-ready, always on schedule', 'AI flags every suspicious pattern instantly'],
    metrics: [{ v: '10h', l: 'Saved/week' }, { v: '5 min', l: 'To generate' }, { v: '100%', l: 'Accurate' }, { v: 'Auto', l: 'Scheduled' }],
    client: 'Your compliance team saves 10+ hours every week and you will always be audit-ready without any manual work.',
  },
];

const whatsInside = [
  { n: '01', label: 'AI Chatbot Pre-Registration' },
  { n: '02', label: 'Printed visitor badge' },
  { n: '03', label: 'Natural Language Search' },
  { n: '04', label: 'Predictive Traffic Forecasting' },
  { n: '05', label: 'Self-service kiosk' },
  { n: '06', label: 'Auto Compliance Reports' },
  { n: '07', label: 'Access Control & ANPR Integration' },
];

const testimonials = [
  { name: 'Sarah Johnson', role: 'Head of Operations, Apollo Hospitals', text: 'Check-in time dropped from 3 minutes to under 30 seconds. The chatbot handles 80% of visitor FAQs without any staff involvement.' },
  { name: 'Rajiv Mehta',   role: 'Compliance Manager, Emirates Bank',    text: 'Reports that took 10 hours now generate in 5 minutes. We walked into our last audit completely prepared, with zero last-minute scramble.' },
  { name: 'Lisa Wang',     role: 'Security Director, Global HQ',          text: 'During a fire drill we found every visitor on Floor 4 in under 4 seconds. Natural language search is a safety game-changer.' },
];

export default function HomePage({ onNav }) {
  const [tab, setTab] = useState(0);
  const sol = solutions[tab];
  const SolIcon = sol.Icon;

  return (
    <div style={{ paddingTop: 64 }}>

      {/* ── HERO ── */}
      <section style={{ padding: '80px 0 72px', background: '#fff', borderBottom: '1px solid var(--border-l)' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 28px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>

          <div style={{ animation: 'slideUp 0.5s ease' }}>
            {/* badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, border: '1px solid var(--border)', borderRadius: 20, padding: '4px 12px', marginBottom: 28 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#16A34A', display: 'inline-block', animation: 'pulse-r 2s infinite' }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)', letterSpacing: '0.3px' }}>Visitor Management Software</span>
            </div>

            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 58, fontWeight: 700, lineHeight: 1.08, color: 'var(--text)', marginBottom: 22, letterSpacing: '-1.5px' }}>
              The visitor<br />management<br />platform<br />
              <span style={{ color: '#1B4FD8', fontStyle: 'italic' }}>trusted by modern<br />enterprises.</span>
            </h1>

            <p style={{ fontSize: 16, color: 'var(--muted)', lineHeight: 1.75, marginBottom: 32, maxWidth: 440 }}>
              AI-powered check-in, predictive forecasting, plain-English search and automated compliance — everything your front desk needs, reimagined.
            </p>

            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => onNav('chatbot')}
                style={{ padding: '12px 26px', borderRadius: 8, border: 'none', background: '#1B4FD8', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, boxShadow: '0 2px 10px rgba(27,79,216,0.3)', transition: 'all 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#1541B8'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#1B4FD8'; e.currentTarget.style.transform = 'none'; }}
              >Explore AI Solutions <ArrowRight size={15} /></button>
              <button
                style={{ padding: '12px 24px', borderRadius: 8, border: '1px solid var(--border)', background: '#fff', color: 'var(--text-2)', fontSize: 14, fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#F9FAFB'}
                onMouseLeave={e => e.currentTarget.style.background = '#fff'}
              >Watch Demo</button>
            </div>

            <div style={{ display: 'flex', gap: 20, marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--border-l)' }}>
              {[['SOC2 Certified', '#16A34A'], ['GDPR Compliant', '#16A34A'], ['HIPAA Ready', '#16A34A']].map(([l, c]) => (
                <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Check size={13} color={c} strokeWidth={3} />
                  <span style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 500 }}>{l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right panel */}
          <div style={{ animation: 'slideUp 0.6s ease' }}>
            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
              {[
                { v: '100+', l: 'Gates and front desks live' },
                { v: '1M+',  l: 'Visitors handled each year' },
                { v: '25h+', l: 'Saved weekly per team' },
                { v: '3×',   l: 'Faster than manual check-in' },
              ].map(s => (
                <div key={s.v} style={{ background: '#F9FAFB', border: '1px solid var(--border)', borderRadius: 12, padding: '22px 20px' }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 700, color: 'var(--text)', lineHeight: 1, marginBottom: 6 }}>{s.v}</div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.4px', lineHeight: 1.4 }}>{s.l}</div>
                </div>
              ))}
            </div>

            {/* What's inside */}
            <div style={{ background: '#F9FAFB', border: '1px solid var(--border)', borderRadius: 12, padding: '18px 20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.6px' }}>What's inside</span>
                <button onClick={() => onNav('chatbot')} style={{ fontSize: 12, color: '#1B4FD8', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>See all features ↗</button>
              </div>
              <div>
                {whatsInside.map((f, i) => (
                  <div key={f.n} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '9px 0', borderTop: i > 0 ? '1px solid var(--border-l)' : 'none' }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted-l)', width: 22, flexShrink: 0 }}>{f.n}</span>
                    <span style={{ fontSize: 13, color: 'var(--text-2)', fontWeight: 500 }}>{f.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SOLUTIONS ── */}
      <section style={{ padding: '96px 0', background: '#F9FAFB' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 28px' }}>

          <div style={{ marginBottom: 52 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 12 }}>4 AI-Powered Solutions</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 42, fontWeight: 700, color: 'var(--text)', lineHeight: 1.15, maxWidth: 560 }}>
              Transform every touchpoint with intelligence
            </h2>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 4, marginBottom: 32, background: '#F3F4F6', borderRadius: 10, padding: 4, width: 'fit-content' }}>
            {solutions.map((s, i) => (
              <button key={s.id} onClick={() => setTab(i)}
                style={{
                  padding: '8px 18px', borderRadius: 7, border: 'none', cursor: 'pointer',
                  background: tab === i ? '#fff' : 'transparent',
                  color: tab === i ? 'var(--text)' : 'var(--muted)',
                  fontSize: 13, fontWeight: tab === i ? 600 : 400,
                  boxShadow: tab === i ? 'var(--shadow-sm)' : 'none',
                  transition: 'all 0.15s',
                }}>
                Solution {s.num}
              </button>
            ))}
          </div>

          {/* Solution card */}
          <div key={sol.id} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow)', animation: 'fadeIn 0.2s ease' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>

              {/* Left */}
              <div style={{ padding: '48px', borderRight: '1px solid var(--border-l)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <SolIcon size={20} color="#1B4FD8" />
                  </div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Solution {sol.num}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{sol.title}</div>
                  </div>
                </div>

                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: 'var(--text)', lineHeight: 1.2, marginBottom: 14 }}>{sol.headline}</h3>
                <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.75, marginBottom: 28 }}>{sol.desc}</p>

                {/* Metrics row */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1, background: 'var(--border)', borderRadius: 10, overflow: 'hidden', marginBottom: 28 }}>
                  {sol.metrics.map(m => (
                    <div key={m.l} style={{ background: '#F9FAFB', padding: '14px 8px', textAlign: 'center' }}>
                      <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--text)', lineHeight: 1 }}>{m.v}</div>
                      <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 3, fontWeight: 500 }}>{m.l}</div>
                    </div>
                  ))}
                </div>

                <button onClick={() => onNav(sol.id)}
                  style={{ padding: '11px 22px', borderRadius: 8, border: 'none', background: '#1B4FD8', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.15s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#1541B8'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#1B4FD8'; e.currentTarget.style.transform = 'none'; }}
                >See live demo <ArrowRight size={14} /></button>
              </div>

              {/* Right — Before / After */}
              <div style={{ padding: '48px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, marginBottom: 28 }}>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 16 }}>Before</div>
                    {sol.before.map((t, i) => (
                      <div key={i} style={{ display: 'flex', gap: 9, marginBottom: 12, alignItems: 'flex-start' }}>
                        <span style={{ width: 16, height: 16, borderRadius: '50%', border: '1.5px solid #D1D5DB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#9CA3AF', flexShrink: 0, marginTop: 1 }}>✕</span>
                        <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5 }}>{t}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#16A34A', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 16 }}>After AI</div>
                    {sol.after.map((t, i) => (
                      <div key={i} style={{ display: 'flex', gap: 9, marginBottom: 12, alignItems: 'flex-start' }}>
                        <Check size={15} color="#16A34A" strokeWidth={2.5} style={{ flexShrink: 0, marginTop: 1 }} />
                        <span style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.5 }}>{t}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Client pitch */}
                <div style={{ background: '#F9FAFB', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 18px' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>What to tell the client</div>
                  <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.65 }}>"{sol.client}"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section style={{ padding: '80px 0', background: '#fff' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 28px' }}>
          <div style={{ marginBottom: 44 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 10 }}>Industries</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 38, fontWeight: 700, color: 'var(--text)' }}>Built for your sector</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
            {[
              { emoji: '🏥', name: 'Healthcare',  badge: 'HIPAA',  desc: 'Patient visitor management, HIPAA-compliant logs, doctor appointment scheduling.' },
              { emoji: '🏦', name: 'Banking',      badge: 'SOX',    desc: 'SOX audit trails, banking compliance reports, secure branch access control.' },
              { emoji: '🏢', name: 'Corporate',    badge: null,     desc: 'Smart check-in, printed badges, employee host notifications, meeting room linking.' },
              { emoji: '🏨', name: 'Hotels',       badge: null,     desc: 'Guest pre-registration, lobby traffic forecasting, concierge AI assistant.' },
            ].map(ind => (
              <div key={ind.name} style={{ background: '#F9FAFB', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 20px', cursor: 'pointer', transition: 'all 0.18s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.boxShadow = 'var(--shadow)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#F9FAFB'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}
              >
                <div style={{ fontSize: 30, marginBottom: 14 }}>{ind.emoji}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>{ind.name}</span>
                  {ind.badge && <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', border: '1px solid var(--border)', borderRadius: 4, padding: '1px 6px' }}>{ind.badge}</span>}
                </div>
                <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TOTAL IMPACT ── */}
      <section style={{ padding: '72px 0', background: '#F9FAFB', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 28px' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 10 }}>Combined Impact</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 700, color: 'var(--text)' }}>All 4 solutions together</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
            {[
              { sol: 'AI Chatbot',     saved: '80% fewer staff questions', benefit: 'Visitors register 3× faster' },
              { sol: 'Forecasting',    saved: '5+ hours/week on scheduling', benefit: 'Never over or understaff again' },
              { sol: 'NL Search',      saved: '1–2 minutes per search',      benefit: 'Instant emergency response' },
              { sol: 'Compliance AI',  saved: '10+ hours/week reporting',     benefit: 'Always audit-ready automatically' },
            ].map((r, i) => (
              <div key={r.sol} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '22px 20px' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#1B4FD8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 10 }}>Solution {String(i + 1).padStart(2, '0')}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>{r.sol}</div>
                <div style={{ fontSize: 13, color: '#16A34A', fontWeight: 500, marginBottom: 4 }}>↓ {r.saved}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.5 }}>{r.benefit}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 24, background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 28px', display: 'flex', justifyContent: 'space-around' }}>
            {[['25+ hours', 'Saved every week'], ['3× faster', 'Visitor experience'], ['24/7', 'Automated support'], ['Proactive', 'Not reactive']].map(([v, l]) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)', marginBottom: 3 }}>{v}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 500 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: '80px 0', background: '#fff' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 28px' }}>
          <div style={{ marginBottom: 44 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 10 }}>Customers</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 38, fontWeight: 700, color: 'var(--text)' }}>Trusted by modern enterprises</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
            {testimonials.map(t => (
              <div key={t.name} style={{ background: '#F9FAFB', border: '1px solid var(--border)', borderRadius: 12, padding: '26px 24px' }}>
                <div style={{ display: 'flex', gap: 2, marginBottom: 14 }}>
                  {[0,1,2,3,4].map(i => <Star key={i} size={13} color="#CA8A04" fill="#CA8A04" />)}
                </div>
                <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.7, marginBottom: 18 }}>"{t.text}"</p>
                <div style={{ borderTop: '1px solid var(--border-l)', paddingTop: 14 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '80px 0', background: '#0D1117', borderTop: '1px solid #1F2937' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 28px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 44, fontWeight: 700, color: '#fff', marginBottom: 14, lineHeight: 1.2, letterSpacing: '-0.5px' }}>
            Ready to transform your<br />visitor experience?
          </h2>
          <p style={{ fontSize: 15, color: '#6B7280', marginBottom: 36, maxWidth: 440, margin: '0 auto 36px', lineHeight: 1.7 }}>
            25+ hours saved weekly. 3× faster check-in. Always audit-ready. Software-only — no hardware changes required.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <button onClick={() => onNav('chatbot')}
              style={{ padding: '13px 28px', borderRadius: 8, border: 'none', background: '#1B4FD8', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#1541B8'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#1B4FD8'; e.currentTarget.style.transform = 'none'; }}
            >Try live demo <ArrowRight size={15} /></button>
            <button
              style={{ padding: '13px 26px', borderRadius: 8, border: '1px solid #374151', background: 'transparent', color: '#D1D5DB', fontSize: 14, fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#6B7280'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#374151'}
            >Contact sales</button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: '#0D1117', borderTop: '1px solid #1F2937', padding: '44px 0 28px' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 28px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2.2fr 1fr 1fr 1fr', gap: 40, marginBottom: 36 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <div style={{ width: 30, height: 30, borderRadius: 7, background: '#1B4FD8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Zap size={14} color="#fff" fill="#fff" />
                </div>
                <span style={{ fontSize: 16, fontWeight: 800, color: '#fff', letterSpacing: '-0.3px' }}>VISIT<span style={{ color: '#3B6EF0' }}>R</span>AK</span>
              </div>
              <p style={{ fontSize: 13, color: '#4B5563', lineHeight: 1.7, maxWidth: 260 }}>
                AI-powered visitor management trusted by modern enterprises across healthcare, banking and corporate sectors.
              </p>
            </div>
            {[
              { title: 'AI Solutions', links: ['AI Chatbot', 'Traffic Forecasting', 'NL Search', 'Compliance Reports'] },
              { title: 'Industries',   links: ['Healthcare', 'Banking', 'Corporate', 'Hotels'] },
              { title: 'Company',      links: ['About', 'Customers', 'Partners', 'Request Demo'] },
            ].map(col => (
              <div key={col.title}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 14 }}>{col.title}</div>
                {col.links.map(l => (
                  <div key={l} style={{ fontSize: 13, color: '#4B5563', marginBottom: 9, cursor: 'pointer', transition: 'color 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#D1D5DB'}
                    onMouseLeave={e => e.currentTarget.style.color = '#4B5563'}
                  >{l}</div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid #1F2937', paddingTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 12, color: '#374151' }}>© 2025 Visitrak. AI-Powered Visitor Management.</div>
            <div style={{ display: 'flex', gap: 18 }}>
              {['Privacy', 'Terms', 'Security'].map(l => <span key={l} style={{ fontSize: 12, color: '#374151', cursor: 'pointer' }}>{l}</span>)}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
