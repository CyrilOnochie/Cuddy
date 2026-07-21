// PreReportScreen.jsx
// Three stats side by side: steps reviewed, exclusion points, user groups affected.
// Bigger persona avatars. Bolder note under CTA.

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ParticleCanvas from './ParticleCanvas'
import { REPORT } from '../data/reportData'

const F = { d:"'Syne',sans-serif", b:"'DM Sans',sans-serif" }

const STATUS_COLOURS = {
  'clean':       '#4ade80',
  'friction':    '#f59e0b',
  'hard-stop':   '#ef4444',
  'workaround':  '#60a5fa',
  'not-reached': '#374151',
}

function StepDot({ status }) {
  return <div style={{ width:10, height:10, borderRadius:'50%', background:STATUS_COLOURS[status]||'#374151', flexShrink:0 }} />
}

const userGroupsAffected = REPORT.personas.length

export default function PreReportScreen({ onViewReport }) {
  const [phase, setPhase] = useState(0) // 0=loading, 1=stats, 2=personas, 3=ready

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1200)
    const t2 = setTimeout(() => setPhase(2), 2400)
    const t3 = setTimeout(() => setPhase(3), 3400)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  return (
    <div style={{ minHeight:'100vh', backgroundColor:'#0f172a', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'40px 24px', position:'relative', overflow:'hidden' }}>
      <ParticleCanvas />
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 30%, #0f172a 100%)', pointerEvents:'none', zIndex:1 }} />

      <div style={{ position:'relative', zIndex:2, maxWidth:760, width:'100%', textAlign:'center' }}>
        {phase === 0 && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:20 }}>
            <motion.div animate={{ rotate:360 }} transition={{ duration:1, repeat:Infinity, ease:'linear' }}
              style={{ width:48, height:48, border:'3px solid rgba(245,158,11,0.2)', borderTop:'3px solid #f59e0b', borderRadius:'50%' }} />
            <p style={{ fontFamily:F.b, fontSize:'1rem', color:'#6b7280' }}>Processing audit results…</p>
          </motion.div>
        )}

        {phase >= 1 && (
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}>
            <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }}
              style={{ fontFamily:F.b, fontWeight:600, fontSize:'0.78rem', color:'#f59e0b', letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:28 }}>
              {REPORT.platform} · {REPORT.task}
            </motion.p>

            {/* Three stats side by side, same size and weight */}
            <div style={{ display:'flex', justifyContent:'center', gap:'clamp(24px,6vw,64px)', marginBottom:40, flexWrap:'wrap' }}>
              <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.1 }}>
                <p style={{ fontFamily:F.d, fontWeight:900, fontSize:'clamp(2.4rem,6vw,4rem)', color:'#ffffff', lineHeight:1, margin:0 }}>
                  {REPORT.stepsReviewed}
                </p>
                <p style={{ fontFamily:F.b, fontSize:'0.92rem', color:'#9ca3af', margin:'6px 0 0' }}>steps reviewed</p>
              </motion.div>

              {phase >= 1 && (
                <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.18 }}>
                  <p style={{ fontFamily:F.d, fontWeight:900, fontSize:'clamp(2.4rem,6vw,4rem)', color:'#f59e0b', lineHeight:1, margin:0 }}>
                    {REPORT.exclusionPoints}
                  </p>
                  <p style={{ fontFamily:F.b, fontSize:'0.92rem', color:'#9ca3af', margin:'6px 0 0' }}>exclusion points identified</p>
                </motion.div>
              )}

              {phase >= 1 && (
                <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.26 }}>
                  <p style={{ fontFamily:F.d, fontWeight:900, fontSize:'clamp(2.4rem,6vw,4rem)', color:'#60a5fa', lineHeight:1, margin:0 }}>
                    {userGroupsAffected}
                  </p>
                  <p style={{ fontFamily:F.b, fontSize:'0.92rem', color:'#9ca3af', margin:'6px 0 0' }}>user groups affected</p>
                </motion.div>
              )}
            </div>

            {/* Persona journey overview — bigger avatars */}
            {phase >= 2 && (
              <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.2 }}
                style={{ display:'flex', gap:'clamp(20px,4vw,36px)', justifyContent:'center', marginBottom:40, flexWrap:'wrap' }}>
                {REPORT.personas.map(p => (
                  <div key={p.key} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}>
                    <div style={{ width:'clamp(72px,11vw,100px)', height:'clamp(120px,16vh,165px)' }}>
                      <img src={p.image} alt={p.name} style={{ width:'100%', height:'100%', objectFit:'contain', objectPosition:'bottom' }} />
                    </div>
                    <p style={{ fontFamily:F.d, fontWeight:700, fontSize:'0.85rem', color:'#e5e7eb', margin:0 }}>{p.name}</p>
                    <div style={{ display:'flex', gap:4 }}>
                      {p.stepOutcomes.map(o => <StepDot key={o.step} status={o.status} />)}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* View report CTA */}
            {phase >= 3 && (
              <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}>
                <motion.button onClick={onViewReport}
                  whileHover={{ background:'#fbbf24', scale:1.04 }} whileTap={{ scale:0.97 }}
                  className="pulse-btn"
                  style={{ padding:'15px 48px', background:'#f59e0b', color:'#0f172a', border:'none', borderRadius:9999, fontFamily:F.d, fontWeight:700, fontSize:'1.05rem', letterSpacing:'0.06em', textTransform:'uppercase', cursor:'pointer', marginBottom:14 }}>
                  View audit report →
                </motion.button>
                <p style={{ fontFamily:F.b, fontWeight:600, fontSize:'0.8rem', color:'#9ca3af' }}>
                  See who to include in your usability test and how to reach them
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}
