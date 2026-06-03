import { AlertTriangle, Brain, CalendarDays, Car, CheckCircle, DoorOpen, IdCard, ShieldAlert, Sparkles, TrendingUp, Users } from 'lucide-react';
import { hourlyTraffic, weeklyForecast } from '../data/mockData';

const signals = [
  { Icon: TrendingUp, title: 'Visitor traffic forecasts', detail: 'Tomorrow 450 visitors predicted, with a 10 AM - 1 PM peak.' },
  { Icon: Users, title: 'Reception workload', detail: 'Current staffing covers 310 visitors before wait times increase.' },
  { Icon: CalendarDays, title: 'Meeting schedules', detail: 'Large client meetings overlap with lunch-hour arrivals.' },
  { Icon: Car, title: 'Parking utilization', detail: 'Visitor parking reaches 92% occupancy during the same window.' },
  { Icon: ShieldAlert, title: 'Security events', detail: 'Gate A had three delayed approvals during the last rush.' },
];

const recommendations = [
  { Icon: Users, title: 'Add 2 receptionists', detail: 'Schedule additional reception coverage from 10 AM - 1 PM.', impact: 'Wait time down 38%', priority: 'High' },
  { Icon: DoorOpen, title: 'Open Gate B', detail: 'Route pre-registered visitors through Gate B during peak hours.', impact: 'Queue split across 2 gates', priority: 'High' },
  { Icon: IdCard, title: 'Prepare 450 visitor badges', detail: 'Pre-print badges for confirmed meetings and bulk arrivals.', impact: 'Faster check-in', priority: 'Medium' },
  { Icon: Car, title: 'Allocate 50 parking slots', detail: 'Reserve additional visitor parking near the east entrance.', impact: 'No overflow risk', priority: 'Medium' },
];

const outcomes = [
  'Better staff planning',
  'Reduced visitor waiting times',
  'Improved operational efficiency',
  'Lower staffing costs',
];

export default function RecommendationPage() {
  const tomorrowVisitors = weeklyForecast.find(d => d.day === 'Fri')?.visitors || 450;
  const peakPrediction = hourlyTraffic.find(h => h.hour === '12PM')?.predicted || 95;

  return (
    <div style={{ padding: '32px 28px' }}>
      {/* Stat row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 24 }}>
        {[
          { label: 'Expected Visitors Tomorrow', value: tomorrowVisitors, sub: 'Converted into action plan' },
          { label: 'Peak Traffic Window', value: '10 AM - 1 PM', sub: `${peakPrediction}+ visitors per peak hour` },
          { label: 'Planning Impact', value: '40%', sub: 'Faster operational decisions' },
        ].map(s => (
          <div key={s.label} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 22px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>{s.label}</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--text)', lineHeight: 1, marginBottom: 5 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Overview */}
      <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '22px', marginBottom: 24 }}>
        <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
          <div style={{ width: 42, height: 42, borderRadius: 11, background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Sparkles size={18} color="#1B4FD8" />
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 5 }}>AI Recommendation Engine</div>
            <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>
              Visitrak analyzes forecasts, visitor history, employee schedules, meeting load, parking capacity and security events, then gives facility managers, reception teams and security staff clear operational recommendations.
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 14, marginBottom: 24 }}>
        <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 3 }}>Tomorrow's AI Action Plan</div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>Generated from visitor forecasts, schedules and operating constraints</div>
            </div>
            <div style={{ padding: '6px 12px', borderRadius: 20, background: '#F0FDF4', border: '1px solid #BBF7D0', color: '#16A34A', fontSize: 11, fontWeight: 800 }}>
              {peakPrediction}+ peak/hour
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {recommendations.map(({ Icon, title, detail, impact, priority }) => (
              <div key={title} style={{ background: '#F9FAFB', border: '1px solid var(--border)', borderRadius: 10, padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 9, background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={15} color="#1B4FD8" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--text)' }}>{title}</div>
                    <div style={{ fontSize: 10, fontWeight: 800, color: priority === 'High' ? '#DC2626' : '#CA8A04', textTransform: 'uppercase', letterSpacing: '0.4px' }}>{priority} priority</div>
                  </div>
                </div>
                <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.55, marginBottom: 10 }}>{detail}</div>
                <div style={{ display: 'inline-flex', padding: '4px 9px', borderRadius: 20, background: '#fff', border: '1px solid var(--border)', color: '#16A34A', fontSize: 11, fontWeight: 700 }}>{impact}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '22px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>AI analyzes continuously</div>
          {signals.map(({ Icon, title, detail }) => (
            <div key={title} style={{ display: 'flex', gap: 10, padding: '10px 0', borderTop: '1px solid var(--border-l)' }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={14} color="#1B4FD8" />
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', marginBottom: 2 }}>{title}</div>
                <div style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.45 }}>{detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '22px', marginBottom: 24 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 18 }}>Before vs After AI Recommendations</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
          <div style={{ paddingRight: 24 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12 }}>Before</div>
            {['Expected visitors tomorrow: 450', 'Managers manually interpret charts', 'Reception reacts after queues form', 'Parking overflow discovered too late'].map(t => (
              <div key={t} style={{ display: 'flex', gap: 9, marginBottom: 10, alignItems: 'flex-start' }}>
                <span style={{ width: 16, height: 16, borderRadius: '50%', border: '1.5px solid #D1D5DB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#9CA3AF', flexShrink: 0, marginTop: 1 }}>!</span>
                <span style={{ fontSize: 13, color: 'var(--muted)' }}>{t}</span>
              </div>
            ))}
          </div>
          <div style={{ paddingLeft: 24, borderLeft: '1px solid var(--border-l)' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#16A34A', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12 }}>After AI</div>
            {['Add 2 receptionists from 10 AM - 1 PM', 'Open Gate B during peak hours', 'Prepare 450 visitor badges', 'Allocate 50 additional parking slots'].map(t => (
              <div key={t} style={{ display: 'flex', gap: 9, marginBottom: 10, alignItems: 'flex-start' }}>
                <span style={{ width: 16, height: 16, borderRadius: '50%', background: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#16A34A', flexShrink: 0, marginTop: 1, fontWeight: 700 }}>✓</span>
                <span style={{ fontSize: 13, color: 'var(--text-2)' }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '22px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 14 }}>Expected Results</div>
          {outcomes.map(item => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 10 }}>
              <CheckCircle size={15} color="#16A34A" />
              <span style={{ fontSize: 13, color: 'var(--text-2)', fontWeight: 500 }}>{item}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '22px' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <div style={{ width: 42, height: 42, borderRadius: 12, background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Brain size={19} color="#1B4FD8" />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 7 }}>Business Benefit</div>
              <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>
                The engine turns existing analytics into measurable operational improvements: better visitor experience, less manual planning and lower avoidable staffing costs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
