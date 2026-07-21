// AuditComplete.jsx
// Phase 1 (0-3s): Large green "Audit complete" + checkmark
// Phase 2 (3s+): "Preparing audit matrix" heading + 3→2→1 amber countdown
// Transitions to AuditMatrix after countdown

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ParticleCanvas from './ParticleCanvas'

const F = { d:"'Syne',sans-serif", b:"'DM Sans',sans-serif" }

export default function AuditComplete({ onComplete }) {
  const [phase, setPhase] = useState(0)   // 0 = complete screen, 1 = countdown
  const [count, setCount] = useState(3)

  useEffect(() => {
    // After 3s show the countdown phase
    const t = setTimeout(() => setPhase(1), 3000)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (phase !== 1) return
    const t2 = setTimeout(() => setCount(2), 1500)
    const t1 = setTimeout(() => setCount(1), 3000)
    const td = setTimeout(() => onComplete(), 4200)
    return () => { clearTimeout(t2); clearTimeout(t1); clearTimeout(td) }
  }, [phase, onComplete])

  return (
    <div style={{ minHeight:'100vh', background:'#0f172a', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:32, position:'relative', overflow:'hidden' }}>
      <ParticleCanvas />
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 60% 60% at 50% 50%, transparent 20%, #0f172a 100%)', pointerEvents:'none', zIndex:1 }}/>

      <div style={{ position:'relative', zIndex:2, textAlign:'center', display:'flex', flexDirection:'column', alignItems:'center', gap:32 }}>
        <AnimatePresence mode="wait">

          {/* Phase 0: Audit complete */}
          {phase === 0 && (
            <motion.div key="complete"
              initial={{ opacity:0, scale:0.92 }} animate={{ opacity:1, scale:1 }}
              exit={{ opacity:0, scale:1.04, y:-20 }}
              transition={{ duration:0.45, ease:[0.16,1,0.3,1] }}
              style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:24 }}>
              {/* Large green checkmark circle */}
              <motion.div
                initial={{ scale:0 }} animate={{ scale:1 }}
                transition={{ delay:0.1, type:'spring', stiffness:200, damping:18 }}
                style={{ width:96, height:96, borderRadius:'50%', background:'rgba(74,222,128,0.12)', border:'2px solid rgba(74,222,128,0.4)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                  <motion.path
                    d="M8 22L18 32L36 12"
                    stroke="#4ade80" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"
                    initial={{ pathLength:0 }} animate={{ pathLength:1 }}
                    transition={{ delay:0.3, duration:0.6, ease:'easeOut' }}/>
                </svg>
              </motion.div>
              <motion.h1 initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.35 }}
                style={{ fontFamily:F.d, fontWeight:900, fontSize:'clamp(2.2rem,5vw,3.5rem)', color:'#4ade80', margin:0, letterSpacing:'-0.04em', lineHeight:1 }}>
                Audit complete
              </motion.h1>
              <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.55 }}
                style={{ fontFamily:F.b, fontSize:'0.9rem', color:'#6b7280', margin:0 }}>
                Preparing your audit matrix…
              </motion.p>
            </motion.div>
          )}

          {/* Phase 1: Countdown */}
          {phase === 1 && (
            <motion.div key="countdown"
              initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
              transition={{ duration:0.4, ease:[0.16,1,0.3,1] }}
              style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:28 }}>
              <div>
                <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.1 }}
                  style={{ fontFamily:F.b, fontWeight:600, fontSize:'0.72rem', color:'#4ade80', letterSpacing:'0.16em', textTransform:'uppercase', margin:'0 0 10px' }}>
                  Audit complete
                </motion.p>
                <motion.h1 initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.15 }}
                  style={{ fontFamily:F.d, fontWeight:900, fontSize:'clamp(1.8rem,4vw,2.6rem)', color:'#ffffff', margin:'0 0 8px', letterSpacing:'-0.03em' }}>
                  Preparing audit matrix
                </motion.h1>
                <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.3 }}
                  style={{ fontFamily:F.b, fontSize:'0.85rem', color:'#6b7280', margin:0 }}>
                  Your full findings are ready
                </motion.p>
              </div>

              {/* Amber pulsing countdown circle */}
              <AnimatePresence mode="wait">
                <motion.div key={count}
                  initial={{ scale:0.6, opacity:0 }} animate={{ scale:1, opacity:1 }} exit={{ scale:1.3, opacity:0 }}
                  transition={{ duration:0.35, ease:[0.16,1,0.3,1] }}
                  style={{ position:'relative', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <motion.div animate={{ scale:[1,1.5,1], opacity:[0.6,0,0.6] }} transition={{ duration:1.2, repeat:Infinity, ease:'easeOut' }}
                    style={{ position:'absolute', width:96, height:96, borderRadius:'50%', background:'rgba(245,158,11,0.25)', zIndex:0 }}/>
                  <motion.div animate={{ scale:[1,1.25,1], opacity:[0.4,0,0.4] }} transition={{ duration:1.2, repeat:Infinity, ease:'easeOut', delay:0.2 }}
                    style={{ position:'absolute', width:80, height:80, borderRadius:'50%', background:'rgba(245,158,11,0.2)', zIndex:0 }}/>
                  <div style={{ width:72, height:72, borderRadius:'50%', background:'#f59e0b', display:'flex', alignItems:'center', justifyContent:'center', position:'relative', zIndex:1 }}>
                    <span style={{ fontFamily:F.d, fontWeight:900, fontSize:'1.8rem', color:'#0f172a', lineHeight:1 }}>{count}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
