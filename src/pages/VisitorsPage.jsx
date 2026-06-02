import { recentVisitors } from '../data/mockData';
import { UserCheck, UserX, Clock, Users } from 'lucide-react';

const statusCfg = {
  'checked-in':  { label: 'Checked In',  color: '#059669', bg: '#ECFDF5' },
  'checked-out': { label: 'Checked Out', color: '#475569', bg: '#F1F5F9' },
  'pending':     { label: 'Pending',     color: '#D97706', bg: '#FFFBEB' },
  'pre-reg':     { label: 'Pre-Reg',     color: '#1D4ED8', bg: '#EFF6FF' },
};

export default function VisitorsPage() {
  return (
    <div style={{ padding: 24, animation: 'fadeUp 0.3s ease' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 22 }}>
        {[
          { label: 'Currently Inside', value: 47,  Icon: UserCheck, color: '#059669', bg: '#ECFDF5' },
          { label: 'Checked Out',      value: 295, Icon: UserX,     color: '#475569', bg: '#F1F5F9' },
          { label: 'Expected Today',   value: 28,  Icon: Clock,     color: '#D97706', bg: '#FFFBEB' },
          { label: 'Total Registered', value: 342, Icon: Users,     color: '#1D4ED8', bg: '#EFF6FF' },
        ].map(s => {
          const Icon = s.Icon;
          return (
            <div key={s.label} style={{ background: '#fff', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow)', padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={20} color={s.color} />
              </div>
              <div>
                <div style={{ fontSize: 28, fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>{s.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ background: '#fff', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow)', padding: '22px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.6px' }}>All Visitors Today</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{ padding: '6px 14px', borderRadius: 8, border: '1px solid var(--border)', background: '#fff', fontSize: 12, cursor: 'pointer', color: 'var(--text-2)' }}>Filter</button>
            <button style={{ padding: '6px 14px', borderRadius: 8, border: 'none', background: '#1D4ED8', color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>+ Pre-Register</button>
          </div>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['Visitor', 'Host', 'Purpose', 'Company', 'Time', 'Badge', 'Status', 'Action'].map(h => (
                <th key={h} style={{ textAlign: 'left', fontSize: 11, fontWeight: 700, color: 'var(--muted)', padding: '0 14px 12px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recentVisitors.map((v, i) => {
              const s = statusCfg[v.status];
              return (
                <tr key={v.id} style={{ background: i % 2 === 0 ? '#FAFBFF' : '#fff' }}>
                  <td style={{ padding: '12px 14px 12px 0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                      <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg, #1D4ED8, #3B82F6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff', flexShrink: 0 }}>
                        {v.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{v.name}</div>
                    </div>
                  </td>
                  <td style={{ padding: '12px 14px 12px 0', fontSize: 13, color: 'var(--text-2)' }}>{v.host}</td>
                  <td style={{ padding: '12px 14px 12px 0', fontSize: 12, color: 'var(--muted)' }}>{v.purpose}</td>
                  <td style={{ padding: '12px 14px 12px 0', fontSize: 12, color: 'var(--muted)' }}>{v.company}</td>
                  <td style={{ padding: '12px 14px 12px 0', fontSize: 12, fontWeight: 500, color: 'var(--text-2)' }}>{v.time}</td>
                  <td style={{ padding: '12px 14px 12px 0', fontSize: 11, color: 'var(--muted)', fontFamily: 'monospace' }}>{v.badge || '—'}</td>
                  <td style={{ padding: '12px 14px 12px 0' }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: s.color, background: s.bg, borderRadius: 20, padding: '3px 10px' }}>{s.label}</span>
                  </td>
                  <td style={{ padding: '12px 0' }}>
                    <button style={{ fontSize: 11, padding: '4px 10px', borderRadius: 6, border: '1px solid var(--border)', background: '#fff', color: 'var(--text-2)', cursor: 'pointer' }}>View</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
