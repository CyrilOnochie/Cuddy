// Landing.jsx
// v2 layout, 4 changes only:
// 1. Cyan → Amber (#f59e0b)
// 2. Inter → Syne (display) / DM Sans (body)
// 3. Font sizes reduced ~20% to compensate for Syne being wider than Inter
// 4. Background → #060A13 (v2's darker tone), no particles

const LOOM_URL = '' // paste Loom link here when ready

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const F = { d:"'Syne',sans-serif", b:"'DM Sans',sans-serif" }

function GridBackground() {
  return (
    <div style={{ position:'fixed', inset:0, zIndex:0, overflow:'hidden', pointerEvents:'none' }}>
      {Array.from({length:12}).map((_,i) => (
        <div key={`h${i}`} style={{ position:'absolute', left:0, right:0, top:`${(i+1)*8.33}%`, height:1, background:'rgba(255,255,255,0.04)' }}/>
      ))}
      {Array.from({length:16}).map((_,i) => (
        <div key={`v${i}`} style={{ position:'absolute', top:0, bottom:0, left:`${(i+1)*6.25}%`, width:1, background:'rgba(255,255,255,0.04)' }}/>
      ))}
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 60% 60% at 50% 40%, transparent 0%, #060A13 100%)' }}/>
    </div>
  )
}

function Counter({ to, suffix='' }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => {
      const start = Date.now(), dur = 1800
      const tick = () => {
        const p = Math.min((Date.now()-start)/dur, 1)
        setVal(Math.round(to * (1 - Math.pow(1-p, 3))))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, 600)
    return () => clearTimeout(t)
  }, [to])
  return <>{val.toLocaleString()}{suffix}</>
}

const STATS = [
  { context:'Why',     to:8000000,  suffix:'',  label:'UC claimants in the UK',                           note:'DWP, July 2025' },
  { context:'Who',     to:13000000, suffix:'',  label:'adults with very low digital capability',           note:'Lloyds CDI, 2023' },
  { context:'The Gap', to:30,       suffix:'%', label:'of accessibility issues caught by automated tools', note:'Deque Systems, 2024' },
]

export default function Landing({ onGetStarted }) {
  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'28px 24px', position:'relative', overflow:'hidden', background:'#060A13' }}>
      <GridBackground />

      <div style={{ position:'relative', zIndex:2, maxWidth:756, width:'100%', textAlign:'center' }}>

        {/* Logo */}
        <motion.div initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4 }}
          style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:10, marginBottom:24 }}>
          <img src="/assets/cuddy-logo.png" alt="Cuddy"
            style={{ width:30, height:30, objectFit:'contain', filter:'brightness(0) saturate(100%) invert(73%) sepia(58%) saturate(739%) hue-rotate(350deg) brightness(103%)' }}/>
          <span style={{ fontFamily:F.d, fontWeight:900, fontSize:'1.05rem', color:'#ffffff', letterSpacing:'-0.02em' }}>Cuddy</span>
        </motion.div>

        {/* Headline — 2 lines forced by <br/>.
            Syne is ~20% wider than Inter, so max is 3rem vs v2's 3.8rem.
            Line 1: Know who your platform
            Line 2: excludes before it fails them.
            "excludes" and "fails" both amber. */}
        <motion.h1 initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1, duration:0.5 }}
          style={{ fontFamily:F.d, fontWeight:900, fontSize:'clamp(1.4rem,2.6vw,2.1rem)', color:'#ffffff', lineHeight:1.1, letterSpacing:'-0.04em', marginBottom:10 }}>
          Know who your platform<br/>
          <span style={{ color:'#f59e0b' }}>excludes</span> before it <span style={{ color:'#f59e0b' }}>fails</span> them.
        </motion.h1>

        {/* Subheader */}
        <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.3 }}
          style={{ fontFamily:F.b, fontSize:'clamp(0.78rem,1.3vw,0.88rem)', color:'#94A3B8', lineHeight:1.7, margin:'0 auto 22px' }}>
          Cuddy is a pre-usability assessment tool for teams designing civic digital services. Select a service and task, and it identifies who may encounter barriers, where they are likely to occur, and why. It also generates a recruitment brief, helps teams track and validate those findings through usability testing, and records the evidence and actions taken to resolve identified issues.
        </motion.p>

        {/* CTAs */}
        <motion.div initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.45 }}
          style={{ display:'flex', gap:10, justifyContent:'center', marginBottom:26, flexWrap:'wrap' }}>
          <motion.button onClick={onGetStarted}
            whileHover={{ background:'#fbbf24', scale:1.02 }} whileTap={{ scale:0.98 }}
            className="pulse-btn"
            style={{ padding:'10px 22px', background:'#f59e0b', color:'#060A13', border:'none', borderRadius:8, fontFamily:F.d, fontWeight:700, fontSize:'1rem', cursor:'pointer', letterSpacing:'-0.01em' }}>
            Run Assessment →
          </motion.button>
          <motion.button onClick={() => LOOM_URL && window.open(LOOM_URL, '_blank', 'noopener noreferrer')}
            whileHover={{ background:'rgba(255,255,255,0.04)', borderColor:'rgba(255,255,255,0.2)' }}
            style={{ padding:'10px 22px', background:'transparent', color: LOOM_URL ? '#e5e7eb' : '#4b5563', border:`1px solid ${LOOM_URL ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.08)'}`, borderRadius:8, fontFamily:F.b, fontWeight:500, fontSize:'1rem', cursor: LOOM_URL ? 'pointer' : 'default', display:'flex', alignItems:'center', gap:8 }}>
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="6.5" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
              <path d="M5.5 4.5L10 7L5.5 9.5V4.5Z" fill="currentColor" opacity="0.5"/>
            </svg>
            View demo audit
          </motion.button>
        </motion.div>

        {/* Stats — numbers reduced so all 3 fit cleanly on one line each */}
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.6 }}
          style={{ display:'flex', gap:0, justifyContent:'center', borderTop:'1px solid rgba(255,255,255,0.08)', paddingTop:18 }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ flex:'1 1 160px', padding:'0 21px', borderRight: i < STATS.length-1 ? '1px solid rgba(255,255,255,0.08)' : 'none', textAlign:'center' }}>
              <p style={{ fontFamily:F.b, fontWeight:600, fontSize:'0.55rem', color:'#475569', letterSpacing:'0.1em', textTransform:'uppercase', margin:'0 0 6px' }}>
                {s.context}
              </p>
              {/* Numbers deliberately smaller so they stay on one line */}
              <p style={{ fontFamily:F.d, fontWeight:900, fontSize:'clamp(0.95rem,1.8vw,1.2rem)', color:'#ffffff', letterSpacing:'-0.03em', margin:'0 0 4px', lineHeight:1 }}>
                <Counter to={s.to} suffix={s.suffix}/>
              </p>
              <p style={{ fontFamily:F.b, fontSize:'0.68rem', color:'#64748B', margin:'0 0 2px', lineHeight:1.4 }}>{s.label}</p>
              <p style={{ fontFamily:F.b, fontSize:'0.55rem', color:'#334155', fontStyle:'italic', margin:0 }}>{s.note}</p>
            </div>
          ))}
        </motion.div>

      </div>
    </div>
  )
}
