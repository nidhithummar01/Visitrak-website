import { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Sparkles, RefreshCw, Zap, Check } from 'lucide-react';

const DEMO_FLOWS = {
  demo1: [
    { from: 'bot',  text: "Hi! 👋 Welcome to Visitrak. Who are you here to visit today?", delay: 0 },
    { from: 'user', text: "I'm here for John at 2pm", delay: 800 },
    { from: 'bot',  text: "I found **John Smith** (Head of Product) with a 2:00 PM slot available. May I have your full name and company?", delay: 2000 },
    { from: 'user', text: "Priya Mehta from TechCorp", delay: 3400 },
    { from: 'bot',  text: "✅ All done! I've registered your visit:\n\n• Name: **Priya Mehta**\n• Company: **TechCorp**\n• Host: **John Smith**\n• Time: **2:00 PM**\n\nYour badge **B-1044** is printing now. John will meet you in reception in ~3 minutes.", delay: 5000 },
    { from: 'user', text: "Where is the parking?", delay: 6600 },
    { from: 'bot',  text: "🅿️ Visitor parking is on **Level 2, Slots P20–P45**. Show badge **B-1044** at the barrier. Need anything else?", delay: 8000 },
  ],
  demo2: [
    { from: 'bot',  text: "Hi! How can I help you today?", delay: 0 },
    { from: 'user', text: "What time is Dr. Patel available?", delay: 800 },
    { from: 'bot',  text: "Dr. Patel's open slots today:\n\n• **10:30 AM** — Available\n• **12:00 PM** — Available\n• **4:00 PM** — Available\n\nWhich would you like? I can pre-register you right now.", delay: 2200 },
    { from: 'user', text: "Book 12pm for Arjun Sharma", delay: 3600 },
    { from: 'bot',  text: "✅ Booked! Dr. Patel at 12:00 PM for **Arjun Sharma**.\n\nConfirmation sent via email and SMS. Your check-in QR code is ready — just scan on arrival, no queue.\n\nTotal time: **28 seconds** 🚀", delay: 5200 },
  ],
};

const REPLIES = {
  'parking':  "🅿️ Visitor parking is on **Level 2, Slots P20–P45**. Show your badge at the barrier.",
  'wifi':     "📶 Guest WiFi:\n\n• Network: **Visitrak-Guest**\n• Password: **Visit@2025**\n\nValid for 8 hours.",
  'cafeteria':"🍽️ Cafeteria is on **Floor 3**, open 8 AM – 7 PM. Visitor meals are complimentary with pre-registration.",
  'emergency':"🚨 Emergency: Dial **Ext. 100** or call **+91-22-1234-5678**. Security is stationed on every floor.",
};

function getReply(t) {
  const l = t.toLowerCase();
  if (l.includes('parking')) return REPLIES['parking'];
  if (l.includes('wifi') || l.includes('internet')) return REPLIES['wifi'];
  if (l.includes('cafeteria') || l.includes('food')) return REPLIES['cafeteria'];
  if (l.includes('emergency')) return REPLIES['emergency'];
  return "I can help with:\n• **Visitor check-in** — tell me who you're visiting\n• **Scheduling** — book a slot with any host\n• **FAQs** — parking, WiFi, cafeteria\n• **Badge & access** info\n\nWhat do you need?";
}

function renderText(text) {
  return text.split('\n').map((line, i, arr) => {
    const parts = line.split(/\*\*(.*?)\*\*/g);
    return (
      <span key={i}>
        {parts.map((p, j) => j % 2 === 1 ? <strong key={j}>{p}</strong> : p)}
        {i < arr.length - 1 && <br />}
      </span>
    );
  });
}

function now() { return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); }

function Bubble({ msg }) {
  const isBot = msg.from === 'bot';
  return (
    <div style={{ display: 'flex', gap: 9, flexDirection: isBot ? 'row' : 'row-reverse', marginBottom: 14, animation: 'fadeUp 0.2s ease' }}>
      <div style={{ width: 28, height: 28, borderRadius: '50%', flexShrink: 0, background: isBot ? '#1B4FD8' : '#1F2937', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {isBot ? <Bot size={13} color="#fff" /> : <User size={13} color="#fff" />}
      </div>
      <div style={{
        maxWidth: '76%', padding: '10px 14px',
        background: isBot ? '#fff' : '#1B4FD8',
        border: isBot ? '1px solid var(--border)' : 'none',
        borderRadius: isBot ? '4px 12px 12px 12px' : '12px 4px 12px 12px',
        boxShadow: isBot ? 'var(--shadow-sm)' : 'none',
      }}>
        {msg.typing
          ? <div style={{ display: 'flex', gap: 4, padding: '2px 0' }}>{[0,1,2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: '#9CA3AF', animation: `typingDot 1.2s ${i*0.2}s infinite` }} />)}</div>
          : <div style={{ fontSize: 13, lineHeight: 1.65, color: isBot ? 'var(--text-2)' : '#fff' }}>{renderText(msg.text)}</div>
        }
        {!msg.typing && <div style={{ fontSize: 10, color: isBot ? '#9CA3AF' : 'rgba(255,255,255,0.55)', marginTop: 4, textAlign: 'right' }}>{msg.time}</div>}
      </div>
    </div>
  );
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState([{ from: 'bot', text: "Hi! 👋 I'm the **Visitrak AI Assistant** — your 24/7 check-in and visitor management bot.\n\nWho are you visiting today?", time: now(), id: 1 }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [demoRunning, setDemoRunning] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const send = async (text) => {
    if (!text.trim() || loading) return;
    setMessages(p => [...p, { id: Date.now(), from: 'user', text: text.trim(), time: now() }]);
    setInput('');
    setLoading(true);
    const tid = Date.now() + 1;
    setMessages(p => [...p, { id: tid, from: 'bot', typing: true, time: now() }]);
    await new Promise(r => setTimeout(r, 800 + Math.random() * 500));
    setMessages(p => p.filter(m => m.id !== tid).concat({ id: Date.now() + 2, from: 'bot', text: getReply(text), time: now() }));
    setLoading(false);
  };

  const runDemo = async (key) => {
    if (demoRunning) return;
    setDemoRunning(true);
    setMessages([]);
    const flow = DEMO_FLOWS[key];
    for (let i = 0; i < flow.length; i++) {
      const step = flow[i];
      const wait = step.delay - (flow[i - 1]?.delay || 0);
      await new Promise(r => setTimeout(r, wait));
      if (step.from === 'bot' && i > 0) {
        const tid = Date.now() + i * 100;
        setMessages(p => [...p, { id: tid, from: 'bot', typing: true, time: now() }]);
        await new Promise(r => setTimeout(r, 800));
        setMessages(p => p.filter(m => m.id !== tid).concat({ ...step, id: Date.now() + i, time: now() }));
      } else {
        setMessages(p => [...p, { ...step, id: Date.now() + i, time: now() }]);
      }
    }
    setDemoRunning(false);
  };

  const reset = () => { setMessages([{ from: 'bot', text: "Chat reset! Who are you visiting today?", time: now(), id: Date.now() }]); setLoading(false); };

  return (
    <div style={{ padding: '32px 28px', display: 'flex', gap: 24, height: 'calc(100vh - 130px)' }}>

      {/* Left panel */}
      <div style={{ width: 272, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 14, overflowY: 'auto' }}>

        <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '20px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 12 }}>What this solves</div>
          {[
            ['Before', '10-field form, 2–3 min, staff handle FAQs', false],
            ['After AI', '1 sentence, 30 seconds, 24/7 automated', true],
          ].map(([l, v, good]) => (
            <div key={l} style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: good ? '#16A34A' : 'var(--muted)', marginBottom: 4 }}>{l}</div>
              <div style={{ fontSize: 12, color: 'var(--text-2)', background: '#F9FAFB', border: '1px solid var(--border-l)', borderRadius: 7, padding: '8px 10px', lineHeight: 1.5 }}>{v}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '20px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 12 }}>Live Demos</div>
          <button onClick={() => runDemo('demo1')} disabled={demoRunning}
            style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border)', background: '#fff', color: 'var(--text-2)', fontSize: 13, fontWeight: 500, marginBottom: 8, cursor: demoRunning ? 'wait' : 'pointer', display: 'flex', alignItems: 'center', gap: 7, transition: 'background 0.15s' }}
            onMouseEnter={e => { if (!demoRunning) e.currentTarget.style.background = '#F9FAFB'; }}
            onMouseLeave={e => e.currentTarget.style.background = '#fff'}
          ><Zap size={13} color="#1B4FD8" /> Business Visitor Check-In</button>
          <button onClick={() => runDemo('demo2')} disabled={demoRunning}
            style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border)', background: '#fff', color: 'var(--text-2)', fontSize: 13, fontWeight: 500, cursor: demoRunning ? 'wait' : 'pointer', display: 'flex', alignItems: 'center', gap: 7, transition: 'background 0.15s' }}
            onMouseEnter={e => { if (!demoRunning) e.currentTarget.style.background = '#F9FAFB'; }}
            onMouseLeave={e => e.currentTarget.style.background = '#fff'}
          ><Check size={13} color="#16A34A" /> Hospital Appointment Booking</button>
        </div>

        <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 12, padding: '20px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 12 }}>Try asking</div>
          {["Where's the parking?", "What's the WiFi?", "I'm here for Dr. Patel at noon", "Emergency contact?"].map(q => (
            <button key={q} onClick={() => send(q)}
              style={{ width: '100%', textAlign: 'left', padding: '8px 10px', marginBottom: 6, background: '#F9FAFB', border: '1px solid var(--border-l)', borderRadius: 7, fontSize: 12, color: 'var(--text-2)', cursor: 'pointer', transition: 'background 0.15s' }}
              onMouseEnter={e => e.currentTarget.style.background = '#F3F4F6'}
              onMouseLeave={e => e.currentTarget.style.background = '#F9FAFB'}
            >"{q}"</button>
          ))}
        </div>
      </div>

      {/* Chat */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#fff', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 11, background: '#fff' }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#1B4FD8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bot size={17} color="#fff" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>Visitrak AI Assistant</div>
            <div style={{ fontSize: 11, color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#16A34A', display: 'inline-block', animation: 'pulse-r 2s infinite' }} />
              Online · Replies instantly · 24/7
            </div>
          </div>
          <button onClick={reset} style={{ background: '#F9FAFB', border: '1px solid var(--border)', borderRadius: 7, padding: '6px 8px', cursor: 'pointer', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 5, fontSize: 12 }}>
            <RefreshCw size={12} /> Reset
          </button>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '18px 18px 10px', background: '#F9FAFB' }}>
          {messages.map(m => <Bubble key={m.id} msg={m} />)}
          <div ref={bottomRef} />
        </div>

        {/* Quick replies */}
        <div style={{ padding: '8px 14px', background: '#fff', borderTop: '1px solid var(--border-l)', display: 'flex', gap: 5, overflowX: 'auto' }}>
          {['Who are you?', 'Check-in help', 'Book a slot', 'Emergency'].map(q => (
            <button key={q} onClick={() => send(q)}
              style={{ flexShrink: 0, fontSize: 11, fontWeight: 500, color: 'var(--text-2)', background: '#F3F4F6', border: '1px solid var(--border)', borderRadius: 20, padding: '4px 12px', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'background 0.12s' }}
              onMouseEnter={e => e.currentTarget.style.background = '#E5E7EB'}
              onMouseLeave={e => e.currentTarget.style.background = '#F3F4F6'}
            >{q}</button>
          ))}
        </div>

        {/* Input */}
        <div style={{ padding: '10px 14px', background: '#fff', borderTop: '1px solid var(--border)', display: 'flex', gap: 9, alignItems: 'flex-end' }}>
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') send(input); }}
            placeholder="Type a message... (e.g. 'I'm here for Sarah at 3pm')"
            style={{ flex: 1, border: '1px solid var(--border)', borderRadius: 9, padding: '9px 13px', fontSize: 13, color: 'var(--text)', background: '#fff', outline: 'none', transition: 'border-color 0.15s' }}
            onFocus={e => e.target.style.borderColor = '#1B4FD8'}
            onBlur={e => e.target.style.borderColor = 'var(--border)'}
          />
          <button onClick={() => send(input)} disabled={!input.trim() || loading}
            style={{ width: 38, height: 38, borderRadius: 9, border: 'none', background: input.trim() && !loading ? '#1B4FD8' : '#F3F4F6', color: input.trim() && !loading ? '#fff' : '#9CA3AF', cursor: input.trim() && !loading ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.15s' }}>
            <Send size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
