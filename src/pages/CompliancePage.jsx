import { useState } from 'react';
import { FileText, AlertTriangle, CheckCircle, Clock, Download, RefreshCw, Shield } from 'lucide-react';
import { complianceReports, anomalies } from '../data/mockData';

const statusCfg = {
  ready:       { color: '#16A34A', label: 'Ready',       Icon: CheckCircle },
  generating:  { color: '#1B4FD8', label: 'Generating',  Icon: RefreshCw   },
  scheduled:   { color: '#CA8A04', label: 'Scheduled',   Icon: Clock       },
};

export default function CompliancePage() {
  const [generating, setGenerating] = useState(false);
  const [generated,  setGenerated]  = useState(false);
  const [expanded,   setExpanded]   = useState(null);

  const runGenerate = async () => {
    setGenerating(true);
    setGenerated(false);
    await new Promise(r => setTimeout(r, 2000));
    setGenerating(false);
    setGenerated(true);
  };

  return (
    <div style={{ padding: '32px 28px' }}>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 296px', gap: 16 }}>

        {/* Main */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

          {/* Generate panel */}
          <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '22px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>Generate New Report</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: 10, alignItems: 'end' }}>
              {[
                { label: 'Report Type', opts: ['HIPAA Visitor Log', 'Banking Audit Trail', 'GDPR Data Access', 'Security Incidents'] },
                { label: 'Date Range',  opts: ['This Month', 'Last 3 Months', 'Q2 2025', 'Last 30 Days'] },
                { label: 'Industry',    opts: ['Healthcare', 'Banking', 'Corporate', 'All Industries'] },
              ].map(f => (
                <div key={f.label}>
                  <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--muted)', display: 'block', marginBottom: 5 }}>{f.label}</label>
                  <select style={{ width: '100%', padding: '8px 10px', borderRadius: 7, border: '1px solid var(--border)', fontSize: 13, color: 'var(--text)', background: '#fff', outline: 'none' }}>
                    {f.opts.map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              ))}
              <button onClick={runGenerate} disabled={generating}
                style={{ padding: '8px 20px', borderRadius: 7, border: 'none', background: generating ? '#F3F4F6' : '#1B4FD8', color: generating ? '#9CA3AF' : '#fff', fontSize: 13, fontWeight: 600, cursor: generating ? 'wait' : 'pointer', display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.15s' }}>
                {generating ? <RefreshCw size={13} style={{ animation: 'spin 0.8s linear infinite' }} /> : null}
                {generating ? 'Generating...' : 'Generate'}
              </button>
            </div>
            {generated && (
              <div style={{ marginTop: 14, padding: '12px 16px', background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 9, display: 'flex', alignItems: 'center', gap: 10, animation: 'fadeUp 0.3s ease' }}>
                <CheckCircle size={15} color="#16A34A" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#15803D' }}>Report generated in 4.8 seconds</div>
                  <div style={{ fontSize: 12, color: '#166534' }}>1,842 records processed · 2 anomalies flagged · Audit-ready PDF</div>
                </div>
                <button style={{ padding: '5px 14px', borderRadius: 7, border: '1px solid #BBF7D0', background: '#fff', color: '#16A34A', fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Download size={12} /> Download
                </button>
              </div>
            )}
          </div>

          {/* Reports list */}
          <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '22px' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>All Reports</div>
            {complianceReports.map(r => {
              const s = statusCfg[r.status];
              const Icon = s.Icon;
              const isExp = expanded === r.id;
              return (
                <div key={r.id} onClick={() => setExpanded(isExp ? null : r.id)}
                  style={{ padding: '14px 16px', borderRadius: 9, marginBottom: 8, cursor: 'pointer', background: isExp ? '#F9FAFB' : '#fff', border: `1px solid ${isExp ? 'var(--border)' : 'var(--border-l)'}`, transition: 'all 0.15s' }}
                  onMouseEnter={e => { if (!isExp) e.currentTarget.style.background = '#F9FAFB'; }}
                  onMouseLeave={e => { if (!isExp) e.currentTarget.style.background = '#fff'; }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 9, background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={15} color={s.color} style={r.status === 'generating' ? { animation: 'spin 1s linear infinite' } : {}} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>{r.name}</div>
                      <div style={{ display: 'flex', gap: 12, fontSize: 11, color: 'var(--muted)' }}>
                        <span>{r.generated}</span>
                        {r.records && <span>{r.records.toLocaleString()} records</span>}
                        {r.flags === 0 && <span style={{ color: '#16A34A', fontWeight: 600 }}>✓ Clean</span>}
                        {r.flags > 0 && <span style={{ color: '#CA8A04', fontWeight: 600 }}>⚠ {r.flags} flags</span>}
                        <span style={{ background: '#F3F4F6', borderRadius: 4, padding: '0 6px', fontWeight: 500 }}>{r.industry}</span>
                      </div>
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 600, color: s.color, background: '#F9FAFB', border: '1px solid var(--border)', borderRadius: 20, padding: '3px 10px' }}>{s.label}</span>
                    {r.status === 'ready' && (
                      <button onClick={e => e.stopPropagation()} style={{ padding: '4px 10px', borderRadius: 6, border: '1px solid var(--border)', background: '#fff', color: 'var(--muted)', fontSize: 11, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Download size={10} /> PDF
                      </button>
                    )}
                  </div>
                  {isExp && r.status === 'ready' && (
                    <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border-l)', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, animation: 'fadeUp 0.2s ease' }}>
                      {[['Records', r.records?.toLocaleString()], ['Period', 'Full period'], ['Compliance', '100%'], ['Flags', r.flags + ' found']].map(([l, v]) => (
                        <div key={l} style={{ background: '#fff', border: '1px solid var(--border-l)', borderRadius: 8, padding: '10px', textAlign: 'center' }}>
                          <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text)', marginBottom: 2 }}>{v}</div>
                          <div style={{ fontSize: 10, color: 'var(--muted)', fontWeight: 600 }}>{l}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

          {/* Anomalies */}
          <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '18px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', marginBottom: 14 }}>AI Anomaly Detection</div>
            {anomalies.map(a => (
              <div key={a.id} style={{ padding: '10px 12px', borderRadius: 8, marginBottom: 8, background: '#F9FAFB', border: '1px solid var(--border-l)', opacity: a.resolved ? 0.6 : 1 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 7, marginBottom: 4 }}>
                  <AlertTriangle size={12} color={a.type === 'high' ? '#DC2626' : a.type === 'medium' ? '#CA8A04' : '#9CA3AF'} style={{ flexShrink: 0, marginTop: 1 }} />
                  <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.4 }}>{a.msg}</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 10, color: 'var(--muted-l)' }}>{a.time}</span>
                  {a.resolved
                    ? <span style={{ fontSize: 10, fontWeight: 600, color: '#16A34A' }}>Resolved</span>
                    : <span style={{ fontSize: 10, fontWeight: 700, color: a.type === 'high' ? '#DC2626' : '#CA8A04', textTransform: 'uppercase' }}>{a.type}</span>
                  }
                </div>
              </div>
            ))}
          </div>

          {/* Standards */}
          <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '18px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', marginBottom: 14 }}>Compliance Standards</div>
            {[['HIPAA', 'Healthcare visitor access'], ['SOX', 'Financial audit trails'], ['GDPR', 'Data privacy logs'], ['ISO 27001', 'Security management']].map(([std, desc]) => (
              <div key={std} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Shield size={14} color="#1B4FD8" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)' }}>{std}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>{desc}</div>
                </div>
                <CheckCircle size={13} color="#16A34A" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
