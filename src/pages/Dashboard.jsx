import { stats, recentVisitors, hourlyTraffic, anomalies, industryImpact } from '../data/mockData';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Users, TrendingUp, AlertTriangle, CheckCircle, Clock, MessageSquare, Search, FileText, Bot } from 'lucide-react';

const statusCfg = {
  'checked-in':  { label: 'Checked In',  color: '#059669', bg: '#ECFDF5' },
  'checked-out': { label: 'Checked Out', color: '#475569', bg: '#F1F5F9' },
  'pending':     { label: 'Pending',     color: '#D97706', bg: '#FFFBEB' },
  'pre-reg':     { label: 'Pre-Reg',     color: '#1D4ED8', bg: '#EFF6FF' },
};

function StatCard({ stat }) {
  return (
    <div style={{
      background: '#fff', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow)',
      padding: '20px 22px', borderTop: `3px solid ${stat.color}`,
      animation: 'fadeUp 0.3s ease',
    }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>{stat.label}</div>
      <div style={{ fontSize: 34, fontWeight: 800, color: stat.color, lineHeight: 1 }}>{stat.value}</div>
      <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 5 }}>
        <span style={{
          fontSize: 11, fontWeight: 700,
          color: stat.up ? '#059669' : '#D97706',
          background: stat.up ? '#ECFDF5' : '#FFFBEB',
          borderRadius: 20, padding: '2px 8px',
        }}>{stat.change}</span>
        <span style={{ fontSize: 11, color: 'var(--muted)' }}>vs yesterday</span>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div style={{ padding: 24, animation: 'fadeUp 0.3s ease' }}>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 22 }}>
        {stats.map(s => <StatCard key={s.label} stat={s} />)}
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 14, marginBottom: 22 }}>

        {/* Traffic Chart */}
        <div style={{ background: '#fff', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow)', padding: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.6px' }}>Live Traffic + AI Forecast</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>Actual vs. predicted visitor volume today</div>
            </div>
            <div style={{ display: 'flex', gap: 14, fontSize: 11, color: 'var(--muted)' }}>
              <span><span style={{ display: 'inline-block', width: 10, height: 3, background: '#1D4ED8', borderRadius: 2, marginRight: 4, verticalAlign: 'middle' }} />Actual</span>
              <span><span style={{ display: 'inline-block', width: 10, height: 3, background: '#06B6D4', borderRadius: 2, marginRight: 4, verticalAlign: 'middle', opacity: 0.6 }} />Predicted</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={190}>
            <AreaChart data={hourlyTraffic}>
              <defs>
                <linearGradient id="gActual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1D4ED8" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#1D4ED8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gPred" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="hour" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid var(--border)', fontSize: 12 }} />
              <Area type="monotone" dataKey="actual" stroke="#1D4ED8" strokeWidth={2} fill="url(#gActual)" dot={false} name="Actual" />
              <Area type="monotone" dataKey="predicted" stroke="#06B6D4" strokeWidth={2} strokeDasharray="5 3" fill="url(#gPred)" dot={false} name="Predicted" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Anomalies */}
        <div style={{ background: '#fff', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow)', padding: '22px' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 16 }}>AI Anomaly Alerts</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {anomalies.map(a => (
              <div key={a.id} style={{
                display: 'flex', gap: 10, alignItems: 'flex-start',
                padding: '10px 12px', borderRadius: 10,
                background: a.type === 'high' ? '#FEF2F2' : a.type === 'medium' ? '#FFFBEB' : '#F8FAFC',
                border: `1px solid ${a.type === 'high' ? '#FECACA' : a.type === 'medium' ? '#FDE68A' : 'var(--border-l)'}`,
              }}>
                <AlertTriangle size={14} color={a.type === 'high' ? '#DC2626' : a.type === 'medium' ? '#D97706' : '#94A3B8'} style={{ flexShrink: 0, marginTop: 1 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, color: 'var(--text-2)', fontWeight: 500, lineHeight: 1.4 }}>{a.msg}</div>
                  <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 3 }}>{a.time}</div>
                </div>
                {a.resolved && <CheckCircle size={13} color="#059669" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Visitors Table */}
      <div style={{ background: '#fff', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow)', padding: '22px', marginBottom: 22 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.6px' }}>Today's Visitors</div>
          <button style={{ fontSize: 12, fontWeight: 600, color: '#1D4ED8', background: '#EFF6FF', border: '1px solid #93C5FD', borderRadius: 8, padding: '5px 13px', cursor: 'pointer' }}>View All</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Visitor', 'Host', 'Purpose', 'Time', 'Badge', 'Status'].map(h => (
                  <th key={h} style={{ textAlign: 'left', fontSize: 11, fontWeight: 700, color: 'var(--muted)', padding: '0 14px 10px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentVisitors.map((v, i) => {
                const s = statusCfg[v.status];
                return (
                  <tr key={v.id} style={{ background: i % 2 === 0 ? '#FAFBFF' : '#fff' }}>
                    <td style={{ padding: '10px 14px 10px 0' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                        <div style={{
                          width: 32, height: 32, borderRadius: '50%',
                          background: 'linear-gradient(135deg, #1D4ED8, #3B82F6)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 11, fontWeight: 700, color: '#fff', flexShrink: 0,
                        }}>{v.name.split(' ').map(n => n[0]).join('')}</div>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{v.name}</div>
                          <div style={{ fontSize: 11, color: 'var(--muted)' }}>{v.company}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '10px 14px 10px 0', fontSize: 13, color: 'var(--text-2)' }}>{v.host}</td>
                    <td style={{ padding: '10px 14px 10px 0', fontSize: 12, color: 'var(--muted)' }}>{v.purpose}</td>
                    <td style={{ padding: '10px 14px 10px 0', fontSize: 12, color: 'var(--text-2)', fontWeight: 500 }}>{v.time}</td>
                    <td style={{ padding: '10px 14px 10px 0', fontSize: 12, color: 'var(--muted)', fontFamily: 'monospace' }}>{v.badge || '—'}</td>
                    <td style={{ padding: '10px 0' }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: s.color, background: s.bg, borderRadius: 20, padding: '3px 10px' }}>{s.label}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Solutions Overview */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 22 }}>
        {[
          { icon: MessageSquare, label: 'AI Chatbot',         desc: '30-sec registration', stat: '3x faster', color: '#1D4ED8', bg: '#EFF6FF' },
          { icon: TrendingUp,    label: 'Traffic Forecast',   desc: 'Predict busy hours',  stat: '5h saved/wk', color: '#059669', bg: '#ECFDF5' },
          { icon: Search,        label: 'NL Search',          desc: 'Plain-English queries',stat: '3s results', color: '#7C3AED', bg: '#F5F3FF' },
          { icon: FileText,      label: 'Compliance AI',      desc: 'Auto-generated reports',stat: '10h saved/wk',color: '#D97706', bg: '#FFFBEB' },
        ].map(s => {
          const Icon = s.icon;
          return (
            <div key={s.label} style={{ background: '#fff', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow)', padding: '18px 20px', borderLeft: `4px solid ${s.color}` }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                <Icon size={18} color={s.color} />
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 8 }}>{s.desc}</div>
              <div style={{ fontSize: 13, fontWeight: 800, color: s.color }}>{s.stat}</div>
            </div>
          );
        })}
      </div>

      {/* Industry Impact */}
      <div style={{ background: '#fff', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow)', padding: '22px' }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 16 }}>Industry Impact</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
          {industryImpact.map(ind => (
            <div key={ind.industry} style={{ padding: '14px', background: 'var(--bg)', borderRadius: 'var(--radius)', border: '1px solid var(--border-l)', textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{ind.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{ind.industry}</div>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#1D4ED8', marginBottom: 2 }}>{ind.stat}</div>
              <div style={{ fontSize: 11, color: '#059669', fontWeight: 600 }}>Saves {ind.saving}</div>
              {ind.hipaa && <div style={{ marginTop: 6, display: 'inline-block', fontSize: 9, fontWeight: 700, color: '#7C3AED', background: '#F5F3FF', border: '1px solid #DDD6FE', borderRadius: 20, padding: '2px 8px' }}>HIPAA</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
