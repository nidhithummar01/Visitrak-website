import { AlertTriangle, BadgeCheck, Building2, CheckCircle, FileCheck2, FileWarning, History, ShieldCheck, Users } from 'lucide-react';

const vendorTypes = ['Vendors', 'Contractors', 'Consultants', 'Auditors', 'Maintenance Teams'];

const documents = [
  { name: 'Safety certification', status: 'Valid', expires: 'Dec 12, 2026', ok: true },
  { name: 'Service contract', status: 'Active', expires: 'Sep 30, 2026', ok: true },
  { name: 'Insurance document', status: 'Active', expires: 'Aug 18, 2026', ok: true },
  { name: 'Government license', status: 'Missing', expires: 'Required before access', ok: false },
];

const contractors = [
  { company: 'SecureBuild Services', contact: 'Amit Rao', type: 'Maintenance', compliance: 96, status: 'Approved', visits: 18, color: '#16A34A' },
  { company: 'MediClean Systems', contact: 'Neha Pillai', type: 'Healthcare Vendor', compliance: 91, status: 'Approved', visits: 42, color: '#16A34A' },
  { company: 'Axis Audit Partners', contact: 'Karan Mehta', type: 'Auditor', compliance: 84, status: 'Review', visits: 7, color: '#CA8A04' },
  { company: 'Metro HVAC Works', contact: 'Sameer Khan', type: 'Contractor', compliance: 58, status: 'Blocked', visits: 3, color: '#DC2626' },
];

const aiFlags = [
  { title: 'Expired certification', detail: 'Metro HVAC Works safety certificate expired 9 days ago.', level: 'high' },
  { title: 'Expiring contract', detail: 'Axis Audit Partners contract expires in 14 days.', level: 'medium' },
  { title: 'Missing document', detail: 'Government license missing for SecureBuild subcontractor.', level: 'medium' },
  { title: 'Unauthorized access attempt', detail: 'Blocked badge request from inactive contractor profile.', level: 'high' },
];

const trackingFields = [
  'Company information',
  'Contract status',
  'Certifications',
  'Insurance documents',
  'Government licenses',
  'Expiry dates',
  'Visit history',
];

export default function VendorPage() {
  return (
    <div style={{ padding: '32px 28px' }}>
      {/* Stat row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 24 }}>
        {[
          { label: 'Managed External Teams', value: '5', sub: 'Vendors, contractors, auditors and more' },
          { label: 'Documents Checked', value: '7', sub: 'Contracts, licenses, insurance, history' },
          { label: 'Access Decision', value: 'Auto', sub: 'Approved only when compliant' },
        ].map(s => (
          <div key={s.label} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '20px 22px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>{s.label}</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--text)', lineHeight: 1, marginBottom: 5 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 14, marginBottom: 24 }}>
        <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '22px' }}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 18 }}>
            <div style={{ width: 42, height: 42, borderRadius: 11, background: '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <ShieldCheck size={18} color="#16A34A" />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 5 }}>Vendor & Contractor Management</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>
                Maintain centralized records for vendors, contractors, consultants, auditors and maintenance teams. AI validates certifications, contracts, insurance and licenses before access is approved.
              </div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 8 }}>
            {vendorTypes.map(type => (
              <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 10px', borderRadius: 8, background: '#F9FAFB', border: '1px solid var(--border-l)' }}>
                <Users size={13} color="#1B4FD8" />
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-2)' }}>{type}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '22px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 14 }}>System Tracks</div>
          <div>
            {trackingFields.map(field => (
              <div key={field} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '8px 0', borderTop: '1px solid var(--border-l)' }}>
                <CheckCircle size={14} color="#16A34A" />
                <span style={{ fontSize: 12, color: 'var(--text-2)', fontWeight: 500 }}>{field}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 14, marginBottom: 24 }}>
        <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--border-l)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 3 }}>Vendor Compliance Dashboard</div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>Live status before contractors arrive at reception</div>
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#16A34A', background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 20, padding: '4px 10px' }}>AI validation active</div>
          </div>

          {contractors.map(contractor => (
            <div key={contractor.company} style={{ padding: '14px 22px', borderBottom: '1px solid var(--border-l)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr auto', gap: 14, alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Building2 size={16} color="#1B4FD8" />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{contractor.company}</div>
                    <div style={{ fontSize: 11, color: 'var(--muted)' }}>{contractor.contact} - {contractor.type}</div>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 5 }}>Compliance score</div>
                  <div style={{ height: 7, background: '#F3F4F6', borderRadius: 20, overflow: 'hidden' }}>
                    <div style={{ width: `${contractor.compliance}%`, height: '100%', background: contractor.color, borderRadius: 20 }} />
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 11, color: 'var(--muted)', whiteSpace: 'nowrap' }}>
                    <History size={12} style={{ verticalAlign: 'middle', marginRight: 5 }} />
                    {contractor.visits} visits
                  </span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: contractor.color, background: '#F9FAFB', border: '1px solid var(--border)', borderRadius: 20, padding: '4px 10px' }}>{contractor.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '22px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>AI Risk Detection</div>
          {aiFlags.map(flag => (
            <div key={flag.title} style={{ padding: '11px 12px', borderRadius: 9, background: '#F9FAFB', border: '1px solid var(--border-l)', marginBottom: 9 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <AlertTriangle size={13} color={flag.level === 'high' ? '#DC2626' : '#CA8A04'} />
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)' }}>{flag.title}</span>
              </div>
              <div style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.5 }}>{flag.detail}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 24 }}>
        <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '22px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>Before a contractor enters</div>
          {documents.map(doc => (
            <div key={doc.name} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 0', borderTop: '1px solid var(--border-l)' }}>
              {doc.ok ? <FileCheck2 size={15} color="#16A34A" /> : <FileWarning size={15} color="#DC2626" />}
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{doc.name}</div>
                <div style={{ fontSize: 11, color: 'var(--muted)' }}>{doc.expires}</div>
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, color: doc.ok ? '#16A34A' : '#DC2626', background: '#F9FAFB', border: '1px solid var(--border)', borderRadius: 20, padding: '3px 9px' }}>{doc.status}</span>
            </div>
          ))}
          <div style={{ marginTop: 14, padding: '11px 14px', borderRadius: 9, background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', fontSize: 12, fontWeight: 700 }}>
            Access blocked until missing government license is uploaded.
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '22px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 18 }}>Before vs After AI Validation</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
            <div style={{ paddingRight: 20 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12 }}>Before</div>
              {['Manual document review', 'Expired insurance missed', 'Audit evidence in emails', 'No single contractor status'].map(t => (
                <div key={t} style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 9 }}>! {t}</div>
              ))}
            </div>
            <div style={{ paddingLeft: 20, borderLeft: '1px solid var(--border-l)' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#16A34A', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12 }}>After AI</div>
              {['Documents validated automatically', 'Expired certifications blocked', 'Audit-ready vendor history', 'Access approved only when compliant'].map(t => (
                <div key={t} style={{ fontSize: 12, color: 'var(--text-2)', marginBottom: 9 }}>✓ {t}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '22px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>Business Benefits</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
          {[
            ['Strong compliance management', 'Every contractor entry is tied to valid documents and policy checks.'],
            ['Reduced manual verification', 'Reception no longer reviews certificates and insurance by hand.'],
            ['Improved audit readiness', 'Contract status, expiry dates and approvals stay searchable.'],
            ['Better contractor accountability', 'Visit history and blocked attempts are visible in one place.'],
          ].map(([title, detail]) => (
            <div key={title} style={{ border: '1px solid var(--border-l)', borderRadius: 10, background: '#F9FAFB', padding: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7 }}>
                <BadgeCheck size={14} color="#16A34A" />
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)' }}>{title}</span>
              </div>
              <div style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.55 }}>{detail}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
