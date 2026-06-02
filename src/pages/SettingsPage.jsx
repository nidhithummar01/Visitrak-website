import { Bell, Shield, Database, Bot } from 'lucide-react';

const sections = [
  {
    icon: Bot, title: 'AI Chatbot Settings', color: '#1D4ED8',
    settings: [
      { label: 'Enable AI Chatbot',              type: 'toggle', value: true  },
      { label: 'Auto pre-fill from conversation', type: 'toggle', value: true  },
      { label: 'FAQ auto-response',               type: 'toggle', value: true  },
      { label: 'Chat response time (seconds)',     type: 'input',  value: '2'   },
    ],
  },
  {
    icon: Bell, title: 'Notifications', color: '#D97706',
    settings: [
      { label: 'Peak traffic alerts',     type: 'toggle', value: true  },
      { label: 'Anomaly detection alerts', type: 'toggle', value: true  },
      { label: 'Compliance report ready',  type: 'toggle', value: true  },
      { label: 'Alert threshold (visitors)',type: 'input',  value: '400' },
    ],
  },
  {
    icon: Shield, title: 'Security & Access', color: '#059669',
    settings: [
      { label: 'Two-factor authentication', type: 'toggle', value: true  },
      { label: 'Badge auto-expiry (hours)', type: 'input',  value: '8'   },
      { label: 'Tailgate detection',        type: 'toggle', value: true  },
    ],
  },
  {
    icon: Database, title: 'Data & Retention', color: '#7C3AED',
    settings: [
      { label: 'Visitor data retention (days)', type: 'input',  value: '365' },
      { label: 'GDPR auto-anonymize',           type: 'toggle', value: true  },
      { label: 'Export for audit',              type: 'toggle', value: true  },
    ],
  },
];

function Toggle({ value }) {
  return (
    <div style={{ width: 40, height: 22, borderRadius: 11, background: value ? '#1D4ED8' : '#E2E8F0', position: 'relative', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0 }}>
      <div style={{ position: 'absolute', top: 3, left: value ? 19 : 3, width: 16, height: 16, borderRadius: '50%', background: '#fff', transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
    </div>
  );
}

export default function SettingsPage() {
  return (
    <div style={{ padding: 24, animation: 'fadeUp 0.3s ease' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14, marginBottom: 20 }}>
        {sections.map(section => {
          const Icon = section.icon;
          return (
            <div key={section.title} style={{ background: '#fff', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow)', overflow: 'hidden' }}>
              <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 10, background: 'var(--bg)', borderBottom: '1px solid var(--border-l)' }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: `${section.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={16} color={section.color} />
                </div>
                <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{section.title}</span>
              </div>
              <div style={{ padding: '14px 20px' }}>
                {section.settings.map(s => (
                  <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', gap: 16 }}>
                    <span style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 500 }}>{s.label}</span>
                    {s.type === 'toggle' ? <Toggle value={s.value} /> : (
                      <input defaultValue={s.value} style={{ width: 70, background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 7, padding: '5px 10px', fontSize: 12, color: 'var(--text)', textAlign: 'center', outline: 'none' }} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
        <button style={{ padding: '8px 18px', borderRadius: 8, border: '1px solid var(--border)', background: '#fff', fontSize: 13, cursor: 'pointer', color: 'var(--text-2)' }}>Cancel</button>
        <button style={{ padding: '8px 22px', borderRadius: 8, border: 'none', background: '#1D4ED8', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', boxShadow: '0 2px 10px rgba(29,78,216,0.3)' }}>Save Settings</button>
      </div>
    </div>
  );
}
