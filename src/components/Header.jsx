import { useState } from 'react';
import { Bell, Search, RefreshCw, ChevronDown, Shield } from 'lucide-react';

export default function Header({ alertCount = 3 }) {
  const [hov, setHov] = useState(null);

  const btn = (id, children, extra = {}) => (
    <button
      onMouseEnter={() => setHov(id)}
      onMouseLeave={() => setHov(null)}
      style={{
        display: 'flex', alignItems: 'center', gap: 6,
        border: '1px solid var(--border)', borderRadius: 8,
        background: hov === id ? '#F8FAFC' : '#fff',
        color: 'var(--text-2)', cursor: 'pointer',
        transition: 'all 0.15s', padding: '6px 10px',
        ...extra,
      }}>
      {children}
    </button>
  );

  return (
    <header style={{
      height: 60, background: '#fff', borderBottom: '1px solid var(--border)',
      display: 'flex', alignItems: 'center', padding: '0 24px', gap: 12, flexShrink: 0,
    }}>
      <div style={{ flex: 1 }}>
        <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.3px' }}>
          Visitrak AI Platform
        </span>
        <span style={{
          marginLeft: 10, fontSize: 10, fontWeight: 700, color: '#1D4ED8',
          background: '#EFF6FF', border: '1px solid #93C5FD',
          borderRadius: 20, padding: '2px 9px',
        }}>AI POWERED</span>
      </div>

      {/* Search */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        background: 'var(--bg)', border: '1px solid var(--border)',
        borderRadius: 8, padding: '6px 12px', width: 210,
      }}>
        <Search size={13} color="var(--muted-l)" />
        <input placeholder="Search visitors, reports..." style={{ background: 'none', border: 'none', outline: 'none', color: 'var(--text)', fontSize: 12, width: '100%' }} />
      </div>

      {btn('refresh', <RefreshCw size={14} color="var(--muted)" />, { padding: '7px 9px' })}

      {/* Bell */}
      <div style={{ position: 'relative' }}>
        {btn('bell', <Bell size={14} color="var(--muted)" />, { padding: '7px 9px' })}
        {alertCount > 0 && (
          <span style={{
            position: 'absolute', top: -4, right: -4,
            background: '#DC2626', color: '#fff', borderRadius: '50%',
            width: 16, height: 16, fontSize: 9, fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '2px solid #fff',
          }}>{alertCount}</span>
        )}
      </div>

      <div style={{ width: 1, height: 24, background: 'var(--border)' }} />

      {/* Security badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: '#EFF6FF', border: '1px solid #93C5FD', borderRadius: 20, padding: '4px 10px' }}>
        <Shield size={11} color="#1D4ED8" />
        <span style={{ fontSize: 11, fontWeight: 600, color: '#1D4ED8' }}>SOC2 Compliant</span>
      </div>

      {/* User */}
      <button
        onMouseEnter={() => setHov('user')}
        onMouseLeave={() => setHov(null)}
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: hov === 'user' ? '#F8FAFC' : 'transparent',
          border: '1px solid var(--border)', borderRadius: 10,
          padding: '4px 10px 4px 4px', cursor: 'pointer', transition: 'all 0.15s',
        }}>
        <div style={{
          width: 30, height: 30, borderRadius: '50%',
          background: 'linear-gradient(135deg, #1D4ED8, #3B82F6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 11, fontWeight: 700, color: '#fff',
        }}>AD</div>
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)', lineHeight: 1.2 }}>Admin</div>
          <div style={{ fontSize: 10, color: 'var(--muted)' }}>Security Manager</div>
        </div>
        <ChevronDown size={12} color="var(--muted-l)" />
      </button>
    </header>
  );
}
