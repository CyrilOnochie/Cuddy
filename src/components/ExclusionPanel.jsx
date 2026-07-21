// ExclusionPanel.jsx — added step identifier banner at top (light mode improvement).
// After Include clicked: shows confirmed state + Proceed to next step.

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CHARACTERS } from '../data/characters'
import { REPORT } from '../data/reportData'
const F = { d:"'Syne',sans-serif", b:"'DM Sans',sans-serif" }

const FS = {
  hard:       { border:'#ef4444', bg:'rgba(239,68,68,0.08)',   label:'HARD STOP',         sub:'this could end the journey here' },
  soft:       { border:'#f59e0b', bg:'rgba(245,158,11,0.08)',  label:'FRICTION',           sub:'slows them down, may cause drop-off' },
  workaround: { border:'#60a5fa', bg:'rgba(96,165,250,0.08)',  label:'WORKAROUND EXISTS',  sub:'a fallback route exists — but may not reach this person' },
}

function FlagItem({ item }) {
  const s = FS[item.severity]
  return (
    <div style={{ borderLeft:`3px solid ${s.border}`, borderRadius:'0 10px 10px 0', background:s.bg, padding:'12px 14px', border:`1px solid ${s.border}33`, borderLeft:`3px solid ${s.border}` }}>
      <div style={{ display:'flex', alignItems:'baseline', gap:6, marginBottom:5, flexWrap:'wrap' }}>
        <span style={{ fontFamily:F.d, fontWeight:800, fontSize:'0.7rem', color:s.border, letterSpacing:'0.1em' }}>{s.label}</span>
        <span style={{ fontFamily:F.b, fontSize:'0.7rem', color:'#6b7280' }}>— {s.sub}</span>
      </div>
      <p style={{ fontFamily:F.b, fontWeight:700, fontSize:'0.92rem', color:'#ffffff', margin:'0 0 5px' }}>{item.cardLabel}</p>
      <p style={{ fontFamily:F.b, fontSize:'0.85rem', color:'#d1d5db', margin:'0 0 8px', lineHeight:1.55 }}>{item.plainText}</p>
      <p style={{ fontFamily:F.b, fontWeight:600, fontSize:'0.8rem', color:'#e5e7eb', margin:'0 0 2px' }}>{item.stat}</p>
      <p style={{ fontFamily:F.b, fontSize:'0.72rem', color:'#6b7280', margin:0, fontStyle:'italic' }}>{item.source}</p>
    </div>
  )
}

export default function ExclusionPanel({ stepData, onProceedToNext, isAlreadyIncluded, onBack }) {
  // includeState: null → 'adding' → 'animating' → 'confirmed' → 'ready'
  const [includeState, setIncludeState] = useState(isAlreadyIncluded ? 'ready' : null)

  const handleInclude = () => {
    setIncludeState('adding')
    setTimeout(() => setIncludeState('animating'), 1600)
    setTimeout(() => setIncludeState('confirmed'), 3200)
    setTimeout(() => setIncludeState('ready'), 6000)   // 2.8s after confirmed
  }

  return (
    <div style={{ background:'#0f172a', minHeight:'100vh' }}>

      {/* Step identifier banner with back button */}
      <div style={{ background:'rgba(15,23,42,0.97)', borderBottom:'1px solid rgba(255,255,255,0.08)', padding:'14px 24px', display:'flex', alignItems:'center', gap:12, position:'fixed', top:0, left:0, right:0, zIndex:110, backdropFilter:'blur(8px)' }}>
        {onBack && (
          <button onClick={onBack}
            style={{ background:'transparent', border:'1px solid rgba(255,255,255,0.12)', borderRadius:8, width:34, height:34, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', flexShrink:0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M11 18l-6-6 6-6"/>
            </svg>
          </button>
        )}
        <div style={{ width:36, height:36, borderRadius:'50%', background:'rgba(245,158,11,0.12)', border:'1.5px solid rgba(245,158,11,0.4)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
        </div>
        <div>
          <p style={{ fontFamily:F.d, fontWeight:700, fontSize:'0.9rem', color:'#ffffff', margin:'0 0 1px' }}>
            Step {stepData.stepNumber} — {stepData.title}
          </p>
          <p style={{ fontFamily:F.b, fontSize:'0.78rem', color:'#6b7280', margin:0 }}>Who this step would affect</p>
        </div>
      </div>

      <div style={{ maxWidth:700, margin:'0 auto', padding:'96px 24px 80px' }}>
        <motion.h1 initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }}
          style={{ fontFamily:F.d, fontWeight:900, fontSize:'clamp(1.6rem,3.5vw,2.4rem)', color:'#ffffff', margin:'0 0 32px', letterSpacing:'-0.02em', lineHeight:1.15 }}>
          Who this step would affect
        </motion.h1>

        {stepData.flags.map((flag, i) => {
          const p = CHARACTERS[flag.personaKey]
          if (!p) return null
          const reportPersona = REPORT.personas.find(rp => rp.key === flag.personaKey)
          return (
            <motion.div key={i} initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.1 }}
              style={{ marginBottom:32, paddingBottom:32, borderBottom: i < stepData.flags.length-1 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}>
              <div style={{ display:'flex', gap:16, alignItems:'flex-start', marginBottom:14 }}>
                <div style={{ flexShrink:0, width:'clamp(90px,14vw,130px)', height:'clamp(180px,26vh,260px)' }}>
                  <img src={p.image} alt={p.name} style={{ width:'100%', height:'100%', objectFit:'contain', objectPosition:'bottom' }} />
                </div>
                <div>
                  <p style={{ fontFamily:F.d, fontWeight:900, fontSize:'1.15rem', color:'#ffffff', margin:'0 0 2px' }}>{p.name}</p>
                  <p style={{ fontFamily:F.b, fontWeight:600, fontSize:'0.85rem', color:'#f59e0b', margin:'0 0 6px' }}>{p.age} · {p.persona}</p>
                  <p style={{ fontFamily:F.b, fontSize:'0.85rem', color:'#9ca3af', lineHeight:1.55, margin:0 }}>{p.context}</p>
                </div>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:14 }}>
                {flag.items.map((item, j) => <FlagItem key={j} item={item} />)}
              </div>
              {(flag.represents || p.represents) && (
                <div style={{ padding:'12px 14px', borderRadius:10, background:'rgba(245,158,11,0.06)', border:'1px solid rgba(245,158,11,0.18)', marginBottom:10 }}>
                  <p style={{ fontFamily:F.b, fontWeight:700, fontSize:'0.7rem', color:'#f59e0b', letterSpacing:'0.1em', textTransform:'uppercase', margin:'0 0 5px' }}>
                    Who {p.name} represents
                  </p>
                  <p style={{ fontFamily:F.b, fontWeight:600, fontSize:'0.9rem', color:'#e5e7eb', margin:'0 0 3px', lineHeight:1.5 }}>
                    {flag.represents
                      ? flag.represents
                      : `${p.name} represents ${p.represents.count} ${p.represents.description}.`}
                  </p>
                  <p style={{ fontFamily:F.b, fontSize:'0.72rem', color:'#6b7280', margin:0, fontStyle:'italic' }}>
                    {flag.representsSource || p.represents?.source}
                  </p>
                </div>
              )}
              {flag?.whyInclude && (
                <div style={{ padding:'12px 14px', borderRadius:10, background:'rgba(96,165,250,0.06)', border:'1px solid rgba(96,165,250,0.2)' }}>
                  <p style={{ fontFamily:F.b, fontWeight:700, fontSize:'0.7rem', color:'#60a5fa', letterSpacing:'0.1em', textTransform:'uppercase', margin:'0 0 5px' }}>
                    Why include users like {p.name} in usability testing
                  </p>
                  <p style={{ fontFamily:F.b, fontWeight:500, fontSize:'0.88rem', color:'#e5e7eb', margin:0, lineHeight:1.55 }}>
                    {flag?.whyInclude}
                  </p>
                </div>
              )}
            </motion.div>
          )
        })}

        {/* Include / Proceed CTAs */}
        <div style={{ display:'flex', flexDirection:'column', gap:10, marginTop:8 }}>
          <AnimatePresence mode="wait">

            {/* State: idle — show amber CTA */}
            {!includeState && (
              <motion.button key="idle" onClick={handleInclude}
                initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0, scale:0.97 }}
                whileHover={{ background:'#fbbf24' }} whileTap={{ scale:0.97 }}
                className="pulse-btn"
                style={{ width:'100%', padding:'15px', background:'#f59e0b', color:'#0f172a', border:'none', borderRadius:9999, fontFamily:F.d, fontWeight:700, fontSize:'0.95rem', letterSpacing:'0.04em', textTransform:'uppercase', cursor:'pointer' }}>
                Add to your usability recruitment brief
              </motion.button>
            )}

            {/* State: adding — progress bar fills */}
            {includeState === 'adding' && (
              <motion.div key="adding" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
                style={{ width:'100%', padding:'15px', background:'rgba(245,158,11,0.1)', border:'1px solid rgba(245,158,11,0.35)', borderRadius:9999, textAlign:'center', position:'relative', overflow:'hidden' }}>
                <motion.div initial={{ scaleX:0 }} animate={{ scaleX:1 }} transition={{ duration:1.5, ease:'linear' }}
                  style={{ position:'absolute', inset:0, background:'rgba(245,158,11,0.15)', transformOrigin:'left', borderRadius:9999 }}/>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:10, position:'relative' }}>
                  <motion.div animate={{ rotate:360 }} transition={{ duration:0.9, repeat:Infinity, ease:'linear' }}
                    style={{ width:14, height:14, border:'2px solid rgba(245,158,11,0.3)', borderTop:'2px solid #f59e0b', borderRadius:'50%' }}/>
                  <span style={{ fontFamily:F.d, fontWeight:700, fontSize:'0.9rem', color:'#f59e0b', letterSpacing:'0.04em', textTransform:'uppercase' }}>
                    Adding to panel...
                  </span>
                </div>
              </motion.div>
            )}

            {/* State: animating — compact inline folder animation, same height as button */}
            {includeState === 'animating' && (
              <motion.div key="animating" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
                style={{ width:'100%', padding:'14px 20px', background:'rgba(245,158,11,0.07)', border:'1px solid rgba(245,158,11,0.3)', borderRadius:9999, display:'flex', alignItems:'center', justifyContent:'center', gap:14 }}>
                {/* Inline folder SVG with tiny papers flying in */}
                <div style={{ position:'relative', width:28, height:24, flexShrink:0 }}>
                  {[0,1,2].map(i => (
                    <motion.div key={i}
                      initial={{ y:-10, x:(i-1)*6, opacity:1, scale:1 }}
                      animate={{ y:10, x:0, opacity:0, scale:0.3 }}
                      transition={{ delay:i*0.12, duration:0.55, ease:[0.4,0,1,1] }}
                      style={{ position:'absolute', width:5, height:5, borderRadius:1, background:'#f59e0b', left:'50%', marginLeft:-2.5, top:0 }}/>
                  ))}
                  <svg style={{ position:'absolute', bottom:0, left:0 }} width="28" height="20" viewBox="0 0 28 20" fill="none">
                    <path d="M2 7 Q2 5 4 5 L10 5 L12 3 L24 3 Q26 3 26 5 L26 7 Z" fill="rgba(245,158,11,0.55)"/>
                    <rect x="2" y="7" width="24" height="13" rx="2" fill="rgba(245,158,11,0.35)" stroke="rgba(245,158,11,0.7)" strokeWidth="1.2"/>
                    <motion.path initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.6 }}
                      d="M9 12 L12 15 L19 9" stroke="#4ade80" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  </svg>
                </div>
                <span style={{ fontFamily:F.d, fontWeight:700, fontSize:'0.88rem', color:'#f59e0b', letterSpacing:'0.03em', textTransform:'uppercase' }}>
                  Saving to usability panel...
                </span>
              </motion.div>
            )}

            {/* State: confirmed — green badge */}
            {(includeState === 'confirmed' || includeState === 'ready') && (
              <motion.div key="confirmed" initial={{ opacity:0, scale:0.96 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0 }}
                style={{ padding:'15px', background:'rgba(74,222,128,0.1)', border:'1px solid rgba(74,222,128,0.35)', borderRadius:9999, textAlign:'center' }}>
                <span style={{ fontFamily:F.d, fontWeight:700, fontSize:'0.9rem', color:'#4ade80', letterSpacing:'0.04em', textTransform:'uppercase' }}>
                  ✓ Users added to the usability panel
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Proceed CTA — only appears after full sequence */}
          <AnimatePresence>
            {includeState === 'ready' && (
              <motion.button onClick={onProceedToNext}
                key="proceed"
                initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
                transition={{ duration:0.4 }}
                whileHover={{ background:'#fbbf24' }} whileTap={{ scale:0.97 }}
                className="pulse-btn"
                style={{ width:'100%', padding:'15px', background:'#f59e0b', color:'#0f172a', border:'none', borderRadius:9999, fontFamily:F.d, fontWeight:700, fontSize:'0.95rem', letterSpacing:'0.04em', textTransform:'uppercase', cursor:'pointer' }}>
                Audit next step →
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
