import { useState } from 'react';
import { Search, Check } from 'lucide-react';
import { recentVisitors } from '../data/mockData';

const EXAMPLES = [
  'Show all visitors from Dubai last week',
  'Who visited Dr. Patel in June?',
  'Visitors who stayed more than 4 hours',
  'All unregistered access attempts today',
  'KPMG auditors this month',
  'Visitors on Level 3 after 8 PM',
];

const MOCK = {
  dubai: [
    { name: 'Ahmed Al Rashid', company: 'Emirates Bank', host: 'James Wilson',  date: 'Jun 3', time: '10:30 AM', status: 'checked-out', badge: 'B-1020', flag: false },
    { name: 'Fatima Hassan',   company: 'Dubai Ports',   host: 'Lisa Wang',     date: 'Jun 4', time: '2:00 PM',  status: 'checked-out', badge: 'B-1024', flag: false },
    { name: 'Omar Khalid',     company: 'Emirates Bank', host: 'Sarah Johnson', date: 'Jun 6', time: '9:00 AM',  status: 'checked-out', badge: 'B-1031', flag: true  },
  ],
  patel:   recentVisitors.filter(v => v.host.includes('Patel')),
  kpmg:    recentVisitors.filter(v => v.company === 'KPMG'),
  default: recentVisitors,
};

function getResults(q) {
  const l = q.toLowerCase();
  if (l.includes('dubai'))  return MOCK.dubai;
  if (l.includes('patel'))  return MOCK.patel.length ? MOCK.patel : MOCK.default;
  if (l.includes('kpmg') || l.includes('audit')) return MOCK.kpmg.length ? MOCK.kpmg : MOCK.default;
  return MOCK.default;
}

const statusLabel = { 'checked-in': 'In', 'checked-out': 'Out', 'pending': 'Pending', 'pre-reg': 'Pre-Reg' };
const statusColor = { 'checked-in': '#16A34A', 'checked-out': '#6B7280', 'pending': '#CA8A04', 'pre-reg': '#1B4FD8' };

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [elapsed, setElapsed] = useState(null);

  const doSearch = async (q) => {
    if (!q.trim()) return;
    setQuery(q);
    setLoading(true);
    setResults(null);
    const t0 = Date.now();
    await new Promise(r => setTimeout(r, 700 + Math.random() * 400));
    setElapsed(((Date.now() - t0) / 1000).toFixed(2));
    setResults(getResults(q));
    setLoading(false);
  };

  return (
    <div style={{ padding: '32px 28px' }}>

      {/* Search bar */}
      <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 22px', marginBottom: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 12 }}>Search visitor records in plain English</div>
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10, border: '1.5px solid var(--border)', borderRadius: 9, padding: '10px 15px', transition: 'border-color 0.15s' }}
            onFocus={() => {}} >
            <Search size={15} color="var(--muted-l)" />
            <input value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && doSearch(query)}
              placeholder='e.g. "Show all visitors from Dubai last week"'
              style={{ flex: 1, border: 'none', outline: 'none', fontSize: 14, color: 'var(--text)', background: 'transparent' }}
              onFocus={e => e.target.closest('div').style.borderColor = '#1B4FD8'}
              onBlur={e => e.target.closest('div').style.borderColor = 'var(--border)'}
            />
          </div>
          <button onClick={() => doSearch(query)} disabled={!query.trim()}
            style={{ padding: '10px 24px', borderRadius: 9, border: 'none', background: query.trim() ? '#1B4FD8' : '#F3F4F6', color: query.trim() ? '#fff' : '#9CA3AF', fontSize: 13, fontWeight: 600, cursor: query.trim() ? 'pointer' : 'default', transition: 'all 0.15s' }}>
            Search
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 16 }}>

        {/* Left */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '18px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 12 }}>Example queries</div>
            {EXAMPLES.map(ex => (
              <button key={ex} onClick={() => doSearch(ex)}
                style={{ width: '100%', textAlign: 'left', padding: '8px 10px', marginBottom: 5, background: '#F9FAFB', border: '1px solid var(--border-l)', borderRadius: 7, fontSize: 12, color: 'var(--text-2)', cursor: 'pointer', lineHeight: 1.4, transition: 'background 0.12s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#F3F4F6'}
                onMouseLeave={e => e.currentTarget.style.background = '#F9FAFB'}
              >"{ex}"</button>
            ))}
          </div>

          <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '18px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 12 }}>Before vs After</div>
            {[['5–6 filter clicks','One sentence'], ['1–2 min lookup','3 seconds'], ['Panic in emergencies','Instant answers'], ['Staff training needed','Anyone can use']].map(([b, a]) => (
              <div key={b} style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 3 }}>✕ {b}</div>
                <div style={{ fontSize: 11, color: '#16A34A', fontWeight: 500 }}>✓ {a}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Results */}
        <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', minHeight: 300 }}>
          {!results && !loading && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 360, color: 'var(--muted-l)' }}>
              <Search size={40} color="#E5E7EB" style={{ marginBottom: 12 }} />
              <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--muted)', marginBottom: 4 }}>Enter a plain English query</div>
              <div style={{ fontSize: 12, color: 'var(--muted-l)' }}>e.g. "Show all visitors from Dubai last week"</div>
            </div>
          )}
          {loading && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 360 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', border: '2.5px solid #1B4FD8', borderTopColor: 'transparent', animation: 'spin 0.8s linear infinite', marginBottom: 14 }} />
              <div style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 500 }}>Searching visitor records...</div>
            </div>
          )}
          {results && !loading && (
            <>
              <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border-l)', display: 'flex', alignItems: 'center', gap: 10 }}>
                <Check size={14} color="#16A34A" />
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{results.length} results</span>
                <span style={{ fontSize: 12, color: 'var(--muted)' }}>for "{query}"</span>
                <span style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 600, color: '#16A34A', background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 20, padding: '2px 10px' }}>⚡ {elapsed}s</span>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#F9FAFB' }}>
                      {['Visitor', 'Host', 'Company', 'Date', 'Time', 'Badge', 'Status'].map(h => (
                        <th key={h} style={{ textAlign: 'left', fontSize: 11, fontWeight: 700, color: 'var(--muted)', padding: '10px 14px', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '1px solid var(--border-l)' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((v, i) => (
                      <tr key={v.id || i} style={{ borderBottom: '1px solid var(--border-l)', animation: `fadeUp 0.2s ${i * 0.04}s ease both`, background: v.flag ? '#FFFBEB' : '#fff' }}>
                        <td style={{ padding: '11px 14px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#1B4FD8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#fff', flexShrink: 0 }}>
                              {v.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{v.name}</div>
                              {v.flag && <div style={{ fontSize: 10, color: '#CA8A04', fontWeight: 600 }}>⚠ Flagged</div>}
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '11px 14px', fontSize: 12, color: 'var(--text-2)' }}>{v.host}</td>
                        <td style={{ padding: '11px 14px', fontSize: 12, color: 'var(--muted)' }}>{v.company}</td>
                        <td style={{ padding: '11px 14px', fontSize: 12, color: 'var(--muted)' }}>{v.date || 'Today'}</td>
                        <td style={{ padding: '11px 14px', fontSize: 12, color: 'var(--text-2)', fontWeight: 500 }}>{v.time}</td>
                        <td style={{ padding: '11px 14px', fontSize: 11, color: 'var(--muted)', fontFamily: 'monospace' }}>{v.badge || '—'}</td>
                        <td style={{ padding: '11px 14px' }}>
                          <span style={{ fontSize: 11, fontWeight: 600, color: statusColor[v.status] || '#6B7280', background: '#F9FAFB', border: '1px solid var(--border)', borderRadius: 20, padding: '3px 10px' }}>
                            {statusLabel[v.status] || v.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
