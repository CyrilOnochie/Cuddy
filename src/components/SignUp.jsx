// SignUp.jsx — convincing mock authentication screen.
// No real backend. Any path (email/password or OAuth buttons) logs in locally
// and stores a first name for personalisation. State persists via localStorage.

import { useState } from 'react'
import { motion } from 'framer-motion'
import ParticleCanvas from './ParticleCanvas'

const F = { d:"'Syne',sans-serif", b:"'DM Sans',sans-serif" }

function OAuthButton({ label, onClick, icon }) {
  return (
    <motion.button onClick={onClick}
      whileHover={{ background:'rgba(255,255,255,0.06)', borderColor:'rgba(255,255,255,0.25)' }}
      whileTap={{ scale:0.98 }}
      style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'center', gap:10, padding:'12px 16px', background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:10, color:'#e5e7eb', fontFamily:F.b, fontWeight:600, fontSize:'0.92rem', cursor:'pointer' }}>
      {icon}
      {label}
    </motion.button>
  )
}

export default function SignUp({ onComplete }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const finish = (fallbackName) => {
    const finalName = name.trim() || fallbackName || 'Cyril'
    onComplete(finalName)
  }

  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'40px 24px', backgroundColor:'#0f172a', position:'relative', overflow:'hidden' }}>
      <ParticleCanvas />
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 30%, #0f172a 100%)', pointerEvents:'none', zIndex:1 }} />

      <div style={{ position:'relative', zIndex:2, maxWidth:380, width:'100%' }}>
        <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }}
          style={{ fontFamily:F.b, fontWeight:600, fontSize:'0.75rem', color:'#f59e0b', letterSpacing:'0.2em', textTransform:'uppercase', textAlign:'center', marginBottom:10 }}>
          Digital Exclusion Audit
        </motion.p>
        <motion.h1 initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.08 }}
          style={{ fontFamily:F.d, fontWeight:900, fontSize:'1.9rem', color:'#ffffff', textAlign:'center', marginBottom:6, letterSpacing:'-0.02em' }}>
          Create your account
        </motion.h1>
        <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.15 }}
          style={{ fontFamily:F.b, fontSize:'0.9rem', color:'#6b7280', textAlign:'center', marginBottom:32 }}>
          Save your audits and pick up where you left off.
        </motion.p>

        <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}
          style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:24 }}>
          <OAuthButton label="Continue with Google" onClick={() => finish('Cyril')}
            icon={<svg width="18" height="18" viewBox="0 0 18 18"><path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 01-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z"/><path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.81.54-1.84.87-3.04.87-2.34 0-4.32-1.58-5.03-3.7H.97v2.33A9 9 0 009 18z"/><path fill="#FBBC05" d="M3.97 10.73A5.4 5.4 0 013.68 9c0-.6.1-1.18.29-1.73V4.94H.97A9 9 0 000 9c0 1.45.35 2.83.97 4.06l3-2.33z"/><path fill="#EA4335" d="M9 3.58c1.32 0 2.51.45 3.44 1.35l2.59-2.59A8.6 8.6 0 009 0 9 9 0 00.97 4.94l3 2.33C4.68 5.16 6.66 3.58 9 3.58z"/></svg>}
          />
          <OAuthButton label="Continue with Apple" onClick={() => finish('Cyril')}
            icon={<svg width="16" height="18" viewBox="0 0 16 18" fill="white"><path d="M13.2 9.5c0-2.1 1.7-3.1 1.8-3.2-1-1.4-2.5-1.6-3-1.6-1.3-.1-2.5.8-3.1.8-.6 0-1.6-.7-2.7-.7-1.4 0-2.7.8-3.4 2-1.5 2.5-.4 6.3 1 8.3.7 1 1.5 2.1 2.6 2 1-.04 1.4-.7 2.7-.7 1.3 0 1.6.7 2.7.7 1.1 0 1.8-1 2.5-2 .8-1.2 1.1-2.3 1.1-2.3-.02-.01-2.2-.85-2.2-3.3zM10.9 1.9c.6-.7 1-1.7.9-2.7-.9.04-1.9.6-2.5 1.3-.5.6-1 1.6-.9 2.6 1 .07 1.9-.5 2.5-1.2z"/></svg>}
          />
        </motion.div>

        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.28 }}
          style={{ display:'flex', alignItems:'center', gap:12, marginBottom:24 }}>
          <div style={{ flex:1, height:1, background:'rgba(255,255,255,0.08)' }} />
          <span style={{ fontFamily:F.b, fontSize:'0.78rem', color:'#4b5563' }}>or</span>
          <div style={{ flex:1, height:1, background:'rgba(255,255,255,0.08)' }} />
        </motion.div>

        <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.34 }}>
          <input
            type="text" placeholder="First name" value={name} onChange={e => setName(e.target.value)}
            style={{ width:'100%', padding:'12px 14px', marginBottom:10, background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:10, color:'#ffffff', fontFamily:F.b, fontSize:'0.92rem', outline:'none' }}
          />
          <input
            type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)}
            style={{ width:'100%', padding:'12px 14px', marginBottom:10, background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:10, color:'#ffffff', fontFamily:F.b, fontSize:'0.92rem', outline:'none' }}
          />
          <input
            type="password" placeholder="Password"
            style={{ width:'100%', padding:'12px 14px', marginBottom:18, background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:10, color:'#ffffff', fontFamily:F.b, fontSize:'0.92rem', outline:'none' }}
          />
          <motion.button onClick={() => finish('Cyril')}
            whileHover={{ background:'#fbbf24' }} whileTap={{ scale:0.97 }}
            className="pulse-btn"
            style={{ width:'100%', padding:'14px', background:'#f59e0b', color:'#0f172a', border:'none', borderRadius:9999, fontFamily:F.d, fontWeight:700, fontSize:'0.95rem', letterSpacing:'0.04em', textTransform:'uppercase', cursor:'pointer' }}>
            Create account
          </motion.button>
        </motion.div>


      </div>
    </div>
  )
}
