export const stats = [
  { label: 'Total Visitors Today',    value: 342,    change: '+18%',  up: true,  color: '#1D4ED8', bg: '#EFF6FF' },
  { label: 'Pre-Registered',          value: 218,    change: '+31%',  up: true,  color: '#059669', bg: '#ECFDF5' },
  { label: 'Pending Check-In',        value: 47,     change: '-12%',  up: false, color: '#D97706', bg: '#FFFBEB' },
  { label: 'Avg Check-In Time',       value: '28s',  change: '-65%',  up: true,  color: '#7C3AED', bg: '#F5F3FF' },
];

export const recentVisitors = [
  { id: 1,  name: 'Priya Mehta',     host: 'Sarah Johnson',  purpose: 'Business Meeting', time: '10:14 AM', status: 'checked-in',  company: 'TechCorp',   badge: 'B-1042' },
  { id: 2,  name: 'Arjun Sharma',    host: 'Mike Chen',      purpose: 'Interview',        time: '10:30 AM', status: 'pending',     company: 'Self',       badge: 'B-1043' },
  { id: 3,  name: 'Zara Khan',       host: 'Dr. Patel',      purpose: 'Consultation',     time: '11:00 AM', status: 'pre-reg',     company: 'HealthPlus', badge: null     },
  { id: 4,  name: 'Ravi Kumar',      host: 'Emma Davis',     purpose: 'Delivery',         time: '09:45 AM', status: 'checked-out', company: 'DHL',        badge: 'B-1041' },
  { id: 5,  name: 'Anita Singh',     host: 'James Wilson',   purpose: 'Audit Visit',      time: '11:30 AM', status: 'pre-reg',     company: 'KPMG',       badge: null     },
  { id: 6,  name: 'Carlos Fernandez',host: 'Lisa Wang',      purpose: 'Partnership Talk', time: '12:00 PM', status: 'pending',     company: 'GlobalTech', badge: null     },
];

export const hourlyTraffic = [
  { hour: '8AM',  actual: 12,  predicted: 14  },
  { hour: '9AM',  actual: 34,  predicted: 30  },
  { hour: '10AM', actual: 58,  predicted: 55  },
  { hour: '11AM', actual: 72,  predicted: 70  },
  { hour: '12PM', actual: 91,  predicted: 95  },
  { hour: '1PM',  actual: 64,  predicted: 60  },
  { hour: '2PM',  actual: 48,  predicted: 52  },
  { hour: '3PM',  actual: null, predicted: 78  },
  { hour: '4PM',  actual: null, predicted: 110 },
  { hour: '5PM',  actual: null, predicted: 88  },
  { hour: '6PM',  actual: null, predicted: 40  },
];

export const weeklyForecast = [
  { day: 'Mon', visitors: 280, capacity: 400 },
  { day: 'Tue', visitors: 340, capacity: 400 },
  { day: 'Wed', visitors: 410, capacity: 400 },
  { day: 'Thu', visitors: 390, capacity: 400 },
  { day: 'Fri', visitors: 460, capacity: 400 },
  { day: 'Sat', visitors: 180, capacity: 400 },
  { day: 'Sun', visitors: 90,  capacity: 400 },
];

export const complianceReports = [
  { id: 1, name: 'HIPAA Visitor Access Log — June 2025',  status: 'ready',     generated: '2 hours ago',  records: 1842, flags: 2,  industry: 'Healthcare' },
  { id: 2, name: 'Banking Audit Trail — Q2 2025',         status: 'ready',     generated: '1 day ago',    records: 5230, flags: 0,  industry: 'Banking'    },
  { id: 3, name: 'Security Incident Summary — May 2025',  status: 'ready',     generated: '3 days ago',   records: 720,  flags: 7,  industry: 'All'        },
  { id: 4, name: 'GDPR Data Access Report — June 2025',   status: 'generating',generated: 'In progress',  records: null, flags: null,industry: 'All'       },
  { id: 5, name: 'Contractor Compliance — June 2025',     status: 'scheduled', generated: 'Tomorrow 6AM', records: null, flags: null,industry: 'Corporate'  },
];

export const anomalies = [
  { id: 1, type: 'high',   msg: 'Visitor "Robert Tan" entered 5x today — unusual pattern',   time: '11:42 AM', resolved: false },
  { id: 2, type: 'medium', msg: 'After-hours access detected in Zone B (9:40 PM yesterday)', time: '9:40 PM',  resolved: true  },
  { id: 3, type: 'high',   msg: 'Unregistered visitor attempted tailgate at Gate 3',          time: '10:15 AM', resolved: false },
  { id: 4, type: 'low',    msg: 'Host "Sarah" overloaded — 8 visitors scheduled at 2PM',     time: '2:00 PM',  resolved: false },
];

export const chatBotResponses = {
  checkin: {
    flow: [
      { from: 'bot',  text: "Hi! Welcome to Visitrak. Who are you here to visit today?" },
      { from: 'user', text: "I'm here for John at 2pm" },
      { from: 'bot',  text: "Got it! I found **John Smith** (Head of Product) with a 2 PM slot available. May I have your name?" },
      { from: 'user', text: "Priya Mehta from TechCorp" },
      { from: 'bot',  text: "Perfect, **Priya Mehta from TechCorp**! Notifying John now... ✅\n\nYour visitor badge **B-1044** is printing at the front desk. John will meet you in 3 minutes. Is there anything else I can help with?" },
      { from: 'user', text: "Where's the parking?" },
      { from: 'bot',  text: "🅿️ Visitor parking is on **Level 2, Slots P20–P45**. Show your badge at the barrier. Need anything else?" },
    ]
  }
};

export const industryImpact = [
  { industry: 'Healthcare / Hospitals', icon: '🏥', hipaa: true,  saving: '14h/week', stat: '3x faster check-in' },
  { industry: 'Banking & Finance',      icon: '🏦', hipaa: false, saving: '10h/week', stat: '100% audit-ready' },
  { industry: 'Corporate Offices',      icon: '🏢', hipaa: false, saving: '8h/week',  stat: '80% fewer FAQs'   },
  { industry: 'Hotels & Hospitality',   icon: '🏨', hipaa: false, saving: '6h/week',  stat: 'Predict rush hours'},
];
