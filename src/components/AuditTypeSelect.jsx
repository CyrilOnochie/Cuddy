// AuditTypeSelect — two cards using the same visual language as platform cards.
// Icon + title in coloured header. Details below. IN DEVELOPMENT at top-right of prototype card.

import { motion } from 'framer-motion'
import ParticleCanvas from './ParticleCanvas'

const F = { d:"'Syne',sans-serif", b:"'DM Sans',sans-serif" }

function GlobeIcon() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <circle cx="26" cy="26" r="22" stroke="white" strokeWidth="3" fill="none"/>
      <ellipse cx="26" cy="26" rx="11" ry="22" stroke="white" strokeWidth="2.5" fill="none"/>
      <line x1="4" y1="26" x2="48" y2="26" stroke="white" strokeWidth="2.5"/>
      <line x1="10" y1="16" x2="42" y2="16" stroke="white" strokeWidth="2"/>
      <line x1="10" y1="36" x2="42" y2="36" stroke="white" strokeWidth="2"/>
    </svg>
  )
}

function FrameIcon() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <rect x="8" y="8" width="36" height="36" rx="4" stroke="white" strokeWidth="3" fill="none"/>
      <rect x="16" y="16" width="20" height="14" rx="2" fill="rgba(255,255,255,0.25)" stroke="white" strokeWidth="2"/>
      <line x1="16" y1="36" x2="28" y2="36" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="16" y1="42" x2="24" y2="42" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  )
}

const TYPES = [
  {
    key: 'existing',
    headerBg: '#0b1525',
    accentBorder: '#f59e0b',
    icon: <GlobeIcon />,
    title: 'Existing Platform',
    description: 'Test a live digital service against documented patterns of exclusion. Identify who is being excluded and where — before your next usability testing session.',
    cta: 'Select platform →',
    available: true,
  },
  {
    key: 'prototype',
    headerBg: '#160d2a',
    accentBorder: '#60a5fa',
    icon: <FrameIcon />,
    title: 'Prototype or Wireframe',
    description: 'Identify exclusion before a single user encounters the platform. Upload Figma frames or wireframes and receive an exclusion report before code is written.',
    cta: 'Coming soon',
    available: false,
  },
]

export default function AuditTypeSelect({ onSelect }) {
  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'40px 24px', backgroundColor:'#0f172a', position:'relative', overflow:'hidden' }}>
      <ParticleCanvas />
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 20%, #0f172a 95%)', pointerEvents:'none', zIndex:1 }} />

      <div style={{ position:'relative', zIndex:2, maxWidth:860, width:'100%' }}>
        <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }}
          style={{ fontFamily:F.b, fontWeight:600, fontSize:'0.78rem', color:'#f59e0b', letterSpacing:'0.2em', textTransform:'uppercase', textAlign:'center', marginBottom:12 }}>
          Digital Exclusion Audit
        </motion.p>
        <motion.h1 initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}
          style={{ fontFamily:F.d, fontWeight:900, fontSize:'clamp(1.8rem,4.5vw,3rem)', color:'#ffffff', letterSpacing:'-0.02em', textAlign:'center', marginBottom:8 }}>
          What would you like to audit?
        </motion.h1>
        <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.2 }}
          style={{ fontFamily:F.b, fontSize:'1rem', color:'#6b7280', textAlign:'center', marginBottom:40 }}>
          Choose the type of audit you want to run.
        </motion.p>

        <div style={{ display:'flex', gap:'clamp(14px,3vw,28px)', flexWrap:'wrap', justifyContent:'center' }}>
          {TYPES.map((type, i) => (
            <motion.div key={type.key}
              initial={{ opacity:0, y:24 }}
              animate={{ opacity:1, y:0 }}
              transition={{ delay:0.3 + i * 0.12 }}
              onClick={() => type.available && onSelect(type.key)}
              whileHover={type.available ? { y:-6, boxShadow:`0 16px 48px rgba(245,158,11,0.2), 0 0 0 1.5px ${type.accentBorder}` } : {}}
              style={{
                flex:'1 1 320px', maxWidth:420,
                background:'#0f172a', borderRadius:20, overflow:'hidden',
                cursor: type.available ? 'pointer' : 'default',
                opacity: type.available ? 1 : 0.65,
                boxShadow:'0 4px 16px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.07)',
              }}>

              {/* Coloured header — icon + title, IN DEVELOPMENT at top right */}
              <div style={{ background:type.headerBg, padding:'24px 24px 22px', position:'relative', borderBottom:'1px solid rgba(255,255,255,0.08)' }}>
                {!type.available && (
                  <div style={{ position:'absolute', top:16, right:16, display:'inline-flex', alignItems:'center', padding:'4px 10px', background:'rgba(96,165,250,0.15)', border:'1px solid rgba(96,165,250,0.35)', borderRadius:9999 }}>
                    <span style={{ fontFamily:F.b, fontWeight:700, fontSize:'0.65rem', color:'#60a5fa', letterSpacing:'0.1em', textTransform:'uppercase' }}>In development</span>
                  </div>
                )}
                <div style={{ marginBottom:14 }}>{type.icon}</div>
                <p style={{ fontFamily:F.d, fontWeight:900, fontSize:'clamp(1.4rem,3vw,1.9rem)', color:'#ffffff', margin:0, lineHeight:1.1, paddingRight: type.available ? 0 : 100 }}>
                  {type.title}
                </p>
              </div>

              {/* Body */}
              <div style={{ padding:'20px 24px 24px' }}>
                <p style={{ fontFamily:F.b, fontSize:'0.92rem', color:'#9ca3af', lineHeight:1.65, margin:'0 0 20px' }}>{type.description}</p>
                <p style={{ fontFamily:F.d, fontWeight:700, fontSize:'0.88rem', letterSpacing:'0.06em', textTransform:'uppercase', color: type.available ? '#4b5563' : '#374151' }}>
                  {type.cta}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
