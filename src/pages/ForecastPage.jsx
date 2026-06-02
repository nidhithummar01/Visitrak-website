import { hourlyTraffic, weeklyForecast } from '../data/mockData';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine } from 'recharts';
import { AlertTriangle } from 'lucide-react';

const peakAlerts = [
  { time: '12 PM – 2 PM', spike: '+31% above average', dept: 'Reception + Parking', action: 'Add 2 extra staff', high: true },
  { time: '4 PM – 6 PM',  spike: '+44% above average', dept: 'All entry points',    action: 'Activate on-call fleet', high: true },
  { time: 'Monday 10 AM', spike: '50+ visitors predicted', dept: 'Boardroom level', action: 'Pre-configure AV systems', high: false },
];

export default function ForecastPage() {
  return (
    <div style={{ padding: '32px 28px' }}>

      {/* Stat row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 24 }}>
        {[
          { label: "Today's Predicted Peak", value: '4–6 PM',  sub: '+44% above average' },
          { label: 'Busiest Day This Week',   value: 'Friday', sub: '460 visitors predicted' },
          { label: 'Staff Needed at Peak',    value: '8 FTE',  sub: 'Currently 5 scheduled' },
        ].map(s => (
          <div key={s.label} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 22px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>{s.label}</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--text)', lineHeight: 1, marginBottom: 5 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 14, marginBottom: 24 }}>
        <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '22px' }}>
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 3 }}>Today: Actual vs AI Prediction</div>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>Solid line = actual check-ins · Dashed = AI forecast</div>
          </div>
          <ResponsiveContainer width="100%" height={210}>
            <AreaChart data={hourlyTraffic}>
              <defs>
                <linearGradient id="gA" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#1B4FD8" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#1B4FD8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gP" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#16A34A" stopOpacity={0.08} />
                  <stop offset="95%" stopColor="#16A34A" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="hour" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid var(--border)', fontSize: 12, boxShadow: 'var(--shadow-sm)' }} />
              <Area type="monotone" dataKey="actual"    stroke="#1B4FD8" strokeWidth={2}   fill="url(#gA)" dot={false} name="Actual" />
              <Area type="monotone" dataKey="predicted" stroke="#16A34A" strokeWidth={1.5} fill="url(#gP)" strokeDasharray="5 3" dot={false} name="Predicted" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '22px' }}>
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 3 }}>Weekly Forecast</div>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>Red dashed line = capacity limit (400)</div>
          </div>
          <ResponsiveContainer width="100%" height={210}>
            <BarChart data={weeklyForecast}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid var(--border)', fontSize: 12 }} />
              <ReferenceLine y={400} stroke="#DC2626" strokeDasharray="4 2" label={{ value: 'Capacity', fill: '#DC2626', fontSize: 10 }} />
              <Bar dataKey="visitors" fill="#1B4FD8" radius={[4,4,0,0]} name="Visitors" opacity={0.85} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Recommendations */}
      <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '22px', marginBottom: 24 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>AI Staffing Recommendations</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
          {peakAlerts.map((a, i) => (
            <div key={i} style={{ background: '#F9FAFB', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                <AlertTriangle size={13} color={a.high ? '#DC2626' : '#CA8A04'} />
                <span style={{ fontSize: 11, fontWeight: 700, color: a.high ? '#DC2626' : '#CA8A04', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                  {a.high ? 'Urgent' : 'Advisory'}
                </span>
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 3 }}>{a.time}</div>
              <div style={{ fontSize: 12, color: '#16A34A', fontWeight: 600, marginBottom: 3 }}>{a.spike}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 10 }}>{a.dept}</div>
              <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 7, padding: '7px 10px', fontSize: 12, fontWeight: 600, color: '#1B4FD8' }}>
                → {a.action}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Before / After */}
      <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '22px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 18 }}>Before vs After AI Forecasting</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
          <div style={{ paddingRight: 24 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12 }}>Before</div>
            {["Only see yesterday's count", "Reception understaffed at rush hours", "Hotels and hospitals guess demand", "React after problems happen"].map(t => (
              <div key={t} style={{ display: 'flex', gap: 9, marginBottom: 10, alignItems: 'flex-start' }}>
                <span style={{ width: 16, height: 16, borderRadius: '50%', border: '1.5px solid #D1D5DB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#9CA3AF', flexShrink: 0, marginTop: 1 }}>✕</span>
                <span style={{ fontSize: 13, color: 'var(--muted)' }}>{t}</span>
              </div>
            ))}
          </div>
          <div style={{ paddingLeft: 24, borderLeft: '1px solid var(--border-l)' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#16A34A', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12 }}>After AI</div>
            {["See predicted count for next week", "Schedule exact staff needed in advance", 'Know "Monday 10 AM = 50+ visitors" weeks ahead', "Prepare before problems happen"].map(t => (
              <div key={t} style={{ display: 'flex', gap: 9, marginBottom: 10, alignItems: 'flex-start' }}>
                <span style={{ width: 16, height: 16, borderRadius: '50%', background: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#16A34A', flexShrink: 0, marginTop: 1, fontWeight: 700 }}>✓</span>
                <span style={{ fontSize: 13, color: 'var(--text-2)' }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
