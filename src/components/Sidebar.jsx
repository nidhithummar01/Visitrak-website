import { useState } from 'react';
import { LayoutDashboard, MessageSquare, TrendingUp, Search, FileText, Users, Settings, Zap, ChevronRight } from 'lucide-react';

const nav = [
  { icon: LayoutDashboard, label: 'Dashboard',     id: 'dashboard' },
  { icon: MessageSquare,   label: 'AI Chatbot',    id: 'chatbot',   badge: 'NEW' },
  { icon: TrendingUp,      label: 'Forecasting',   id: 'forecast' },
  { icon: Search,          label: 'NL Search',     id: 'search' },
  { icon: FileText,        label: 'Compliance',    id: 'compliance' },
  { icon: Users,           label: 'Visitors',      id: 'visitors' },
  { icon: Settings,        label: 'Settings',      id: 'settings' },
];

export default function Sidebar({ active, onNav }) {
  const [hov, setHov] = useState(null);

  return (
    <aside style={{
      width: 230, minHeight: '100vh', background: '#fff',
      borderRight: '1px solid var(--border)',
      display: 'flex', flexDirection: 'column', flexShrink: 0,
    }}>
      {/* Brand */}
      <div style={{ padding: '18px 18px 14px', borderBottom: '1px solid var(--border-l)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10, flexShrink: 0,
            background: 'linear-gradient(135deg, #1D4ED8 0%, #3B82F6 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(29,78,216,0.3)',
          }}>
            <Zap size={18} color="#fff" fill="#fff" />
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.3px' }}>Visitrak</div>
            <div style={{ fontSize: 10, color: 'var(--muted)', fontWeight: 500 }}>AI Intelligence</div>
          </div>
        </div>
      </div>

      {/* Live badge */}
      <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--border-l)' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 7,
          background: '#ECFDF5', border: '1px solid #A7F3D0',
          borderRadius: 20, padding: '5px 10px',
        }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#059669', animation: 'pulse-r 2s infinite' }} />
          <span style={{ fontSize: 11, color: '#059669', fontWeight: 600 }}>Live Monitoring</span>
          <span style={{ marginLeft: 'auto', fontSize: 10, color: 'var(--muted)' }}>342 in</span>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 8px' }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted-l)', letterSpacing: '0.7px', textTransform: 'uppercase', padding: '0 10px 10px' }}>Navigation</div>
        {nav.map(item => {
          const Icon = item.icon;
          const isActive = active === item.id;
          const isHov = hov === item.id;
          return (
            <button key={item.id}
              onClick={() => onNav(item.id)}
              onMouseEnter={() => setHov(item.id)}
              onMouseLeave={() => setHov(null)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                padding: '9px 10px', borderRadius: 8, border: 'none', cursor: 'pointer',
                background: isActive ? 'linear-gradient(90deg, #EFF6FF, #DBEAFE)' : isHov ? '#F8FAFC' : 'transparent',
                color: isActive ? '#1D4ED8' : isHov ? '#1E293B' : '#334155',
                fontWeight: isActive ? 700 : 500, fontSize: 13, marginBottom: 2,
                textAlign: 'left',
                borderLeft: isActive ? '3px solid #1D4ED8' : '3px solid transparent',
                transition: 'all 0.15s',
              }}>
              <Icon size={15} />
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.badge && (
                <span style={{ background: '#1D4ED8', color: '#fff', borderRadius: 6, fontSize: 9, fontWeight: 700, padding: '1px 6px' }}>{item.badge}</span>
              )}
              {isActive && <ChevronRight size={12} color="#93C5FD" />}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border-l)' }}>
        <div style={{ fontSize: 11, color: 'var(--muted)' }}>v2.1.0-ai · Visitrak</div>
        <div style={{ fontSize: 10, color: 'var(--muted-l)', marginTop: 2 }}>AI-Powered Visitor Management</div>
      </div>
    </aside>
  );
}
