import { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, RefreshCw, MessageSquare, User, Sparkles } from 'lucide-react';

const QUICK = ['How does check-in work?', 'Industries served?', 'Book a demo', 'Pricing?'];

const ANSWERS = {
  check:    "Our **AI Chatbot** lets visitors check in by typing who they're visiting — e.g. *\"I'm here for Sarah at 2pm\"*. The bot auto-fills everything and prints the badge in **30 seconds**. No forms needed.",
  industri: "Visitrak serves:\n\n🏥 **Healthcare** — HIPAA-compliant logs\n🏦 **Banking** — SOX audit trails\n🏢 **Corporate** — Smart access control\n🏨 **Hotels** — Guest pre-registration\n\nAll industries get the 4 AI solutions.",
  demo:     "I'd love to set up a demo! Our team will walk you through all 4 AI solutions live.\n\nClick **Request demo →** in the top navbar, or share your email and we'll reach out within 1 hour.",
  pric:     "Visitrak offers flexible plans:\n\n• **Starter** — up to 500 visitors/month\n• **Business** — up to 5,000 visitors/month\n• **Enterprise** — unlimited + custom AI\n\nAll plans include the 4 AI solutions. Contact sales for a quote.",
  default:  "I can help with:\n• **Check-in flow** — how visitors register\n• **AI solutions** — all 4 explained\n• **Industries** — compliance by sector\n• **Demo / pricing** — getting started\n\nWhat would you like to know?",
};

function getReply(t) {
  const l = t.toLowerCase();
  if (l.includes('check') || l.includes('visit') || l.includes('register')) return ANSWERS.check;
  if (l.includes('industr') || l.includes('hospital') || l.includes('bank') || l.includes('hotel')) return ANSWERS.industri;
  if (l.includes('demo') || l.includes('contact') || l.includes('trial')) return ANSWERS.demo;
  if (l.includes('pric') || l.includes('cost') || l.includes('plan')) return ANSWERS.pric;
  return ANSWERS.default;
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

export default function FloatingChatbot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([{ id: 1, from: 'bot', text: "Hi! 👋 I'm **Visitrak AI**.\n\nAsk me anything about our platform, AI solutions, or how to book a demo.", time: now() }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs]);

  const send = async (text) => {
    if (!text.trim() || loading) return;
    setMsgs(p => [...p, { id: Date.now(), from: 'user', text: text.trim(), time: now() }]);
    setInput('');
    setLoading(true);
    const tid = Date.now() + 1;
    setMsgs(p => [...p, { id: tid, from: 'bot', typing: true, time: now() }]);
    await new Promise(r => setTimeout(r, 800 + Math.random() * 500));
    setMsgs(p => p.filter(m => m.id !== tid).concat({ id: Date.now() + 2, from: 'bot', text: getReply(text), time: now() }));
    setLoading(false);
  };

  const reset = () => {
    setMsgs([{ id: Date.now(), from: 'bot', text: "Chat cleared! What can I help you with?", time: now() }]);
    setLoading(false);
  };

  return (
    <>
      {open && (
        <div style={{
          position: 'fixed', bottom: 86, right: 24, width: 350, zIndex: 9999,
          background: '#fff', borderRadius: 16, overflow: 'hidden',
          border: '1px solid var(--border)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.12), 0 4px 20px rgba(0,0,0,0.06)',
          animation: 'chatPop 0.22s cubic-bezier(0.34,1.56,0.64,1)',
        }}>
          {/* Header */}
          <div style={{ padding: '14px 16px', background: '#1B4FD8', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Bot size={17} color="#fff" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Visitrak AI</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#4ADE80', display: 'inline-block', animation: 'pulse-r 2s infinite' }} />
                Online · Replies instantly
              </div>
            </div>
            <button onClick={reset} title="Clear" style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.65)', cursor: 'pointer', padding: 4, borderRadius: 5, display: 'flex' }}>
              <RefreshCw size={13} />
            </button>
            <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.65)', cursor: 'pointer', padding: 4, borderRadius: 5, display: 'flex' }}>
              <X size={15} />
            </button>
          </div>

          {/* Messages */}
          <div style={{ height: 320, overflowY: 'auto', padding: '14px 13px 8px', background: '#F9FAFB' }}>
            {msgs.map(msg => {
              const isBot = msg.from === 'bot';
              return (
                <div key={msg.id} style={{ display: 'flex', gap: 8, flexDirection: isBot ? 'row' : 'row-reverse', marginBottom: 12, animation: 'fadeUp 0.18s ease' }}>
                  <div style={{ width: 26, height: 26, borderRadius: '50%', flexShrink: 0, background: isBot ? '#1B4FD8' : '#1F2937', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {isBot ? <Bot size={12} color="#fff" /> : <User size={12} color="#fff" />}
                  </div>
                  <div style={{ maxWidth: '78%', padding: '9px 13px', background: isBot ? '#fff' : '#1B4FD8', border: isBot ? '1px solid var(--border-l)' : 'none', borderRadius: isBot ? '4px 12px 12px 12px' : '12px 4px 12px 12px', boxShadow: isBot ? 'var(--shadow-sm)' : 'none' }}>
                    {msg.typing
                      ? <div style={{ display: 'flex', gap: 3, padding: '2px 0' }}>{[0,1,2].map(i => <div key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: '#9CA3AF', animation: `typingDot 1.2s ${i*0.2}s infinite` }} />)}</div>
                      : <div style={{ fontSize: 12.5, lineHeight: 1.65, color: isBot ? 'var(--text-2)' : '#fff' }}>{renderText(msg.text)}</div>
                    }
                    {!msg.typing && <div style={{ fontSize: 10, color: isBot ? '#9CA3AF' : 'rgba(255,255,255,0.55)', marginTop: 4, textAlign: 'right' }}>{msg.time}</div>}
                  </div>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>

          {/* Quick replies */}
          <div style={{ padding: '6px 11px', background: '#fff', borderTop: '1px solid var(--border-l)', display: 'flex', gap: 5, overflowX: 'auto' }}>
            {QUICK.map(q => (
              <button key={q} onClick={() => send(q)}
                style={{ flexShrink: 0, fontSize: 11, color: 'var(--text-2)', background: '#F3F4F6', border: '1px solid var(--border)', borderRadius: 20, padding: '4px 11px', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'background 0.12s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#E5E7EB'}
                onMouseLeave={e => e.currentTarget.style.background = '#F3F4F6'}
              >{q}</button>
            ))}
          </div>

          {/* Input */}
          <div style={{ padding: '9px 11px', background: '#fff', borderTop: '1px solid var(--border)', display: 'flex', gap: 8, alignItems: 'center' }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') send(input); }}
              placeholder="Ask anything about Visitrak..."
              style={{ flex: 1, border: '1px solid var(--border)', borderRadius: 8, padding: '8px 11px', fontSize: 12.5, color: 'var(--text)', background: '#F9FAFB', outline: 'none', transition: 'border-color 0.15s' }}
              onFocus={e => e.target.style.borderColor = '#1B4FD8'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
            <button onClick={() => send(input)} disabled={!input.trim() || loading}
              style={{ width: 34, height: 34, borderRadius: 8, border: 'none', background: input.trim() && !loading ? '#1B4FD8' : '#F3F4F6', color: input.trim() && !loading ? '#fff' : '#9CA3AF', cursor: input.trim() && !loading ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.15s' }}>
              <Send size={13} />
            </button>
          </div>
        </div>
      )}

      {/* FAB */}
      <button onClick={() => setOpen(o => !o)} title="Chat with Visitrak AI"
        style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 9998,
          width: 54, height: 54, borderRadius: '50%', border: 'none',
          background: open ? '#1F2937' : '#1B4FD8', color: '#fff', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(27,79,216,0.4)',
          transition: 'all 0.18s',
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        {open ? <X size={20} /> : <MessageSquare size={20} />}
        {!open && (
          <span style={{ position: 'absolute', top: -1, right: -1, width: 16, height: 16, borderRadius: '50%', background: '#16A34A', border: '2px solid #fff', fontSize: 8, fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>AI</span>
        )}
      </button>
    </>
  );
}
