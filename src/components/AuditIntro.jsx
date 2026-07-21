import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ParticleCanvas from './ParticleCanvas'

const F = { d:"'Syne',sans-serif", b:"'DM Sans',sans-serif" }

const PHASE0_LOGS = [
  { text:'Connecting to audit database...', color:'#6b7280' },
  { text:'Connection established.', color:'#4ade80' },
  { text:'Loading platform registry...', color:'#6b7280' },
  { text:'Platform found: GOV.UK — 12 registered tasks', color:'#4ade80' },
  { text:'Task selected: Apply for Universal Credit', color:'#4ade80' },
  { text:'Fetching task configuration...', color:'#6b7280' },
  { text:'4 steps identified in user flow.', color:'#4ade80' },
  { text:'Step 1: Create an account → requires: email address, UK mobile number', color:'#4b5563' },
  { text:'Step 2: Verify your identity → requires: photo ID, NFC-capable smartphone', color:'#4b5563' },
  { text:'Step 3: Complete to-do list → requires: NI number, bank details, housing info', color:'#4b5563' },
  { text:'Step 4: Submit your claim → requires: legal declaration, Jobcentre interview', color:'#4b5563' },
  { text:'Loading user profiles from research database...', color:'#6b7280' },
  { text:'5 profiles loaded — 1 default, 4 documented exclusion patterns', color:'#4ade80' },
  { text:'Cross-referencing profiles against 20 step/profile combinations...', color:'#6b7280' },
  { text:'Scan complete. Exclusion patterns mapped across all 4 steps.', color:'#f59e0b' },
  { text:'Initiating ideal user profile generation...', color:'#6b7280' },
]

const PHASE1_LOGS = [
  { text:'Evaluating profiles against Step 1 requirements...', color:'#6b7280' },
  { text:'  jack (47) — No email address. Cannot proceed past Step 1.', color:'#ef4444' },
  { text:'  sam (72) — Not expecting digital account. Friction detected.', color:'#f59e0b' },
  { text:'  tosin (34) — Step 1 clear. No barriers detected.', color:'#4ade80' },
  { text:'  jane (28) — Step 1 clear. No barriers.', color:'#4ade80' },
  { text:'Evaluating profiles against Step 2 requirements...', color:'#6b7280' },
  { text:'  sam (72) — Neither verification route viable. Hard stop.', color:'#ef4444' },
  { text:'  tosin (34) — Device/document mismatch. Friction detected.', color:'#f59e0b' },
  { text:'  jane (28) — Abstract error recovery gap. Conditional friction.', color:'#f59e0b' },
  { text:'Evaluating profiles against Step 3 requirements...', color:'#6b7280' },
  { text:'  sam — Session timeout risk. Friction. tosin — Formal English. Friction.', color:'#f59e0b' },
  { text:'  jane (28) — Session timeout resets MFA on every return. Hard stop.', color:'#ef4444' },
  { text:'Evaluating profiles against Step 4 requirements...', color:'#6b7280' },
  { text:'  tosin (34) — Legal declaration complexity. Friction detected.', color:'#f59e0b' },
  { text:'Filtering for profile with zero friction across all 4 steps...', color:'#6b7280' },
  { text:'Result: 1 of 5 profiles completes all 4 steps without barriers.', color:'#4ade80' },
]

const LOG_INTERVAL = 580
const PHASE_PAUSE  = 700

const DAN_CAPS = [
  'An email address',
  'A UK mobile number',
  'A smartphone with NFC capability',
  'UK credit history for identity verification',
  'Confidence completing multi-step digital processes',
]

function Terminal({ title, logs, totalLogs }) {
  return (
    <div style={{ background:'#0c1220', border:'1px solid rgba(255,255,255,0.07)', borderRadius:10, overflow:'hidden' }}>
      <div style={{ padding:'9px 14px', borderBottom:'1px solid rgba(255,255,255,0.06)', display:'flex', alignItems:'center', gap:5 }}>
        {['#ef4444','#f59e0b','#4ade80'].map((c,i)=><div key={i} style={{ width:9,height:9,borderRadius:'50%',background:c,opacity:0.6 }}/>)}
        <span style={{ fontFamily:F.b, fontSize:'0.62rem', color:'#374151', marginLeft:6 }}>{title}</span>
      </div>
      <div style={{ padding:'14px 18px', minHeight:200, fontFamily:"'JetBrains Mono','Fira Code',monospace", fontSize:'0.73rem', lineHeight:1.85 }}>
        {logs.map((line, i) => (
          <motion.div key={i} initial={{ opacity:0, x:-4 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.14 }}>
            <span style={{ color:'#2d3748', userSelect:'none' }}>{'> '}</span>
            <span style={{ color:line.color }}>{line.text}</span>
          </motion.div>
        ))}
        {logs.length < totalLogs && (
          <motion.span animate={{ opacity:[1,0,1] }} transition={{ duration:0.8, repeat:Infinity }} style={{ color:'#f59e0b' }}>▋</motion.span>
        )}
      </div>
    </div>
  )
}

export default function AuditIntro({ onBeginSteps }) {
  const [phase, setPhase] = useState(0)
  const [p0Lines, setP0Lines] = useState([])
  const [p1Lines, setP1Lines] = useState([])
  const [visibleCaps, setVisibleCaps] = useState([])

  useEffect(() => {
    PHASE0_LOGS.forEach((line, i) => {
      setTimeout(() => setP0Lines(prev => [...prev, line]), i * LOG_INTERVAL)
    })
    setTimeout(() => setPhase(1), PHASE0_LOGS.length * LOG_INTERVAL + PHASE_PAUSE)
  }, [])

  useEffect(() => {
    if (phase !== 1) return
    PHASE1_LOGS.forEach((line, i) => {
      setTimeout(() => setP1Lines(prev => [...prev, line]), i * LOG_INTERVAL)
    })
    setTimeout(() => setPhase(2), PHASE1_LOGS.length * LOG_INTERVAL + PHASE_PAUSE)
  }, [phase])

  useEffect(() => {
    if (phase !== 2) return
    DAN_CAPS.forEach((_, i) => {
      setTimeout(() => setVisibleCaps(prev => [...prev, i]), i * 200 + 500)
    })
    setTimeout(() => setPhase(3), DAN_CAPS.length * 200 + 1100)
  }, [phase])

  return (
    <div style={{ minHeight:'100vh', background:'#0f172a', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'40px 24px', position:'relative', overflow:'hidden' }}>
      <ParticleCanvas />
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 20%, #0f172a 100%)', pointerEvents:'none', zIndex:1 }}/>

      <div style={{ position:'relative', zIndex:2, maxWidth:700, width:'100%' }}>
        <AnimatePresence mode="wait">

          {/* Phase 0 */}
          {phase === 0 && (
            <motion.div key="p0" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0, y:-8 }}
              style={{ display:'flex', flexDirection:'column', gap:14 }}>
              <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:2 }}>
                <motion.div animate={{ rotate:360 }} transition={{ duration:1.2, repeat:Infinity, ease:'linear' }}
                  style={{ width:18, height:18, border:'2.5px solid rgba(245,158,11,0.18)', borderTop:'2.5px solid #f59e0b', borderRadius:'50%', flexShrink:0 }}/>
                <p style={{ fontFamily:F.d, fontWeight:800, fontSize:'1.05rem', color:'#ffffff', margin:0 }}>Running audit...</p>
                <span style={{ fontFamily:F.b, fontSize:'0.72rem', color:'#6b7280' }}>GOV.UK · Apply for Universal Credit</span>
              </div>
              <Terminal title="cuddy — audit-engine" logs={p0Lines} totalLogs={PHASE0_LOGS.length} />
            </motion.div>
          )}

          {/* Phase 1 */}
          {phase === 1 && (
            <motion.div key="p1" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0, y:-8 }}
              style={{ display:'flex', flexDirection:'column', gap:14 }}>
              <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:2 }}>
                <motion.div animate={{ rotate:360 }} transition={{ duration:1.0, repeat:Infinity, ease:'linear' }}
                  style={{ width:18, height:18, border:'2.5px solid rgba(74,222,128,0.18)', borderTop:'2.5px solid #4ade80', borderRadius:'50%', flexShrink:0 }}/>
                <p style={{ fontFamily:F.d, fontWeight:800, fontSize:'1.05rem', color:'#ffffff', margin:0 }}>Generating ideal user profile...</p>
                <span style={{ fontFamily:F.b, fontSize:'0.72rem', color:'#6b7280' }}>5 profiles · 4 steps · 20 combinations</span>
              </div>
              <Terminal title="cuddy — profile-engine" logs={p1Lines} totalLogs={PHASE1_LOGS.length} />
            </motion.div>
          )}

          {/* Phase 2+: Dan reveal — redesigned layout */}
          {phase >= 2 && (
            <motion.div key="reveal" initial={{ opacity:0 }} animate={{ opacity:1 }}
              style={{ display:'grid', gridTemplateColumns:'1fr 2.2fr', gap:'clamp(32px,5vw,56px)', alignItems:'center', width:'100%' }}>

              {/* Left column: avatar — supporting context only */}
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:14 }}>
                <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.1 }}
                  style={{ fontFamily:F.b, fontWeight:600, fontSize:'0.6rem', color:'#4ade80', letterSpacing:'0.16em', textTransform:'uppercase', margin:0, textAlign:'center' }}>
                  Ideal user identified
                </motion.p>
                <motion.div initial={{ scale:0.85, y:24, opacity:0 }} animate={{ scale:1, y:0, opacity:1 }} transition={{ delay:0.15, duration:0.65, ease:[0.16,1,0.3,1] }}
                  style={{ width:'clamp(100px,14vw,155px)', height:'clamp(170px,26vh,270px)' }}>
                  <img src="/assets/dan.png" alt="Dan" style={{ width:'100%', height:'100%', objectFit:'contain', objectPosition:'bottom' }}/>
                </motion.div>
                <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.48 }} style={{ textAlign:'center' }}>
                  <p style={{ fontFamily:F.d, fontWeight:900, fontSize:'1rem', color:'#ffffff', margin:'0 0 2px' }}>Dan · 35</p>
                  <p style={{ fontFamily:F.b, fontSize:'0.72rem', color:'#9ca3af', margin:0 }}>Tech-savvy · UK-based</p>
                </motion.div>
              </div>

              {/* Right column: all content, left-aligned */}
              <div style={{ display:'flex', flexDirection:'column' }}>

                {/* Status label — small uppercase like Linear breadcrumb */}
                <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.2 }}
                  style={{ fontFamily:F.b, fontWeight:600, fontSize:'0.6rem', color:'#6b7280', letterSpacing:'0.12em', textTransform:'uppercase', margin:'0 0 14px' }}>
                  Assessment complete
                </motion.p>

                {/* Primary heading + subtext */}
                <motion.div initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.25 }} style={{ marginBottom:28 }}>
                  <p style={{ fontFamily:F.d, fontWeight:800, fontSize:'0.95rem', color:'#ffffff', margin:'0 0 10px', lineHeight:1.2, letterSpacing:'-0.01em' }}>
                    The Universal Credit application on GOV.UK has 4 steps.
                  </p>
                  <p style={{ fontFamily:F.b, fontSize:'0.8rem', color:'#94a3b8', lineHeight:1.65, margin:0, borderLeft:'2px solid rgba(255,255,255,0.1)', paddingLeft:12 }}>
                    The assessment identified the requirements needed to complete all 4 steps, and the ideal user who could meet every one of them without encountering a barrier.
                  </p>
                </motion.div>

                {/* Requirements */}
                <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.3 }} style={{ marginBottom:20 }}>
                  <p style={{ fontFamily:F.b, fontWeight:600, fontSize:'0.6rem', color:'#6b7280', letterSpacing:'0.12em', textTransform:'uppercase', margin:'0 0 10px' }}>
                    List of requirements
                  </p>
                  <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
                    {DAN_CAPS.map((cap, i) => (
                      <AnimatePresence key={i}>
                        {visibleCaps.includes(i) && (
                          <motion.div initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.22 }}
                            style={{ display:'flex', alignItems:'center', gap:10, padding:'7px 12px', background:'rgba(74,222,128,0.05)', border:'1px solid rgba(74,222,128,0.15)', borderRadius:6 }}>
                            <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M1.5 6L4.5 9L10.5 3" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            <span style={{ fontFamily:F.b, fontSize:'0.82rem', color:'#e5e7eb' }}>{cap}</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    ))}
                  </div>
                </motion.div>

                {/* Info card — faint, muted */}
                {visibleCaps.length === DAN_CAPS.length && (
                  <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.1 }}
                    style={{ padding:'9px 14px', background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:6, marginBottom:20 }}>
                    <p style={{ fontFamily:F.b, fontSize:'0.78rem', color:'#9ca3af', margin:0, lineHeight:1.55 }}>
                      Review each step to identify where exclusion may occur, which user groups could be affected, and why.
                    </p>
                  </motion.div>
                )}

                {/* CTA — original full-width amber pulse */}
                {phase >= 3 && (
                  <motion.button onClick={onBeginSteps}
                    initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.38 }}
                    whileHover={{ background:'#fbbf24', scale:1.03 }} whileTap={{ scale:0.97 }}
                    className="pulse-btn"
                    style={{ width:'100%', padding:'12px 22px', background:'#f59e0b', color:'#0f172a', border:'none', borderRadius:9999, fontFamily:F.d, fontWeight:700, fontSize:'0.92rem', letterSpacing:'0.04em', textTransform:'uppercase', cursor:'pointer' }}>
                    Review audit →
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
