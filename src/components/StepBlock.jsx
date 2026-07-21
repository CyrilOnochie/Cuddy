// StepBlock.jsx — full redesign of completed container matching light mode:
// - Each completed step = contained card with subtle border
// - Step label + CTA both at top (left and right)
// - "What this step requires" aligned left under step label
// - Small icons with annotation, then "created exclusion for X user groups" below
// - Wide persona rows: avatar left, name+persona+represents box right (heights aligned)
// - CTA at TOP RIGHT, not bottom center

import { motion, AnimatePresence } from 'framer-motion'
import GovUkMockup from './GovUkMockup'
import { CHARACTERS } from '../data/characters'
import { ICON_MAP } from './RequirementIcons'

const F = { d:"'Syne',sans-serif", b:"'DM Sans',sans-serif" }

const DAN = { name:'Dan', age:35, label:'Tech savvy British white male · Ideal user', image:'/assets/dan.png' }

const FROZEN_AT_STEP = { 0:['jack','sam'], 1:['sam','tosin','jane'], 2:['sam','tosin','jane'], 3:['tosin','jane'] }

function SmallReqIcon({ icon }) {
  const Icon = ICON_MAP[icon]
  if (!Icon) return null
  return (
    <div style={{ width:56, height:56, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ transform:'scale(0.55)', transformOrigin:'center center', width:96, height:96, display:'flex', alignItems:'center', justifyContent:'center' }}>
        <Icon />
      </div>
    </div>
  )
}

export default function StepBlock({ stepData, isActive, isCompleted, status, onProceed, onIncludeRetro }) {
  const stepIdx = stepData.stepNumber - 1
  const frozenPersonas = FROZEN_AT_STEP[stepIdx] || []
  const flaggedCount = [...new Set(stepData.flags.map(f => f.personaKey))].length

  return (
    <div style={{ maxWidth:1100, margin:'0 auto', padding:'clamp(20px,3vw,40px) clamp(16px,4vw,40px)' }}>
      <AnimatePresence mode="wait">

        {/* ── ACTIVE STATE ── */}
        {isActive && (
          <motion.div key="active" initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, ease:[0.16,1,0.3,1] }}
            style={{ display:'flex', gap:'clamp(16px,3vw,48px)', alignItems:'flex-start' }}>

            {/* Dan — left column */}
            <div style={{ flexShrink:0, width:'clamp(110px,15vw,175px)', display:'flex', flexDirection:'column', alignItems:'center' }}>
              <motion.div initial={{ opacity:0, scale:0.9, y:16 }} animate={{ opacity:1, scale:1, y:0 }} transition={{ duration:0.8, delay:0.1, ease:[0.16,1,0.3,1] }}
                style={{ width:'100%', height:'clamp(300px,48vh,520px)' }}>
                <img src={DAN.image} alt="Dan — ideal user" style={{ width:'100%', height:'100%', objectFit:'contain', objectPosition:'bottom center' }} onError={e => e.target.style.visibility='hidden'} />
              </motion.div>
              <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.5 }}
                style={{ textAlign:'center', marginTop:8 }}>
                <p style={{ fontFamily:F.d, fontWeight:800, fontSize:'0.95rem', color:'#ffffff', margin:'0 0 3px' }}>{DAN.name} · {DAN.age}</p>
                <p style={{ fontFamily:F.b, fontWeight:600, fontSize:'0.75rem', color:'#9ca3af', margin:0, lineHeight:1.4 }}>{DAN.label}</p>
              </motion.div>
            </div>

            {/* Step content */}
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
                <span style={{ background:'#f59e0b', color:'#0f172a', fontFamily:F.b, fontWeight:700, fontSize:'0.7rem', padding:'3px 10px', borderRadius:9999, letterSpacing:'0.06em', textTransform:'uppercase' }}>
                  Step {stepData.stepNumber} of {stepData.totalSteps}
                </span>
                <span style={{ fontFamily:F.b, fontSize:'0.7rem', color:'#6b7280', textTransform:'uppercase', letterSpacing:'0.1em' }}>{stepData.platform}</span>
              </div>
              <h1 style={{ fontFamily:F.d, fontWeight:900, fontSize:'clamp(1.2rem,2.5vw,1.7rem)', color:'#ffffff', margin:'0 0 6px', letterSpacing:'-0.02em', lineHeight:1.15 }}>{stepData.title}</h1>
              <p style={{ fontFamily:F.b, fontSize:'0.78rem', color:'#6b7280', margin:'0 0 14px' }}>Current sample of Step {stepData.stepNumber} on the GOV.UK website</p>
              <div style={{ width:'100%', marginBottom:10 }}><GovUkMockup stepNumber={stepData.stepNumber} /></div>
              <div style={{ padding:'14px 16px', background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:10, marginBottom:20 }}>
                <p style={{ fontFamily:F.b, fontWeight:600, fontSize:'0.65rem', color:'#6b7280', letterSpacing:'0.12em', textTransform:'uppercase', margin:'0 0 10px' }}>What this step requires</p>
                <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
                  {stepData.requirements.map((r, idx) => (
                    <motion.div key={r.id} initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.22, delay:0.3 + idx*0.08 }}
                      style={{ display:'flex', alignItems:'flex-start', gap:10, padding:'7px 12px', background:'rgba(74,222,128,0.05)', border:'1px solid rgba(74,222,128,0.15)', borderRadius:6 }}>
                      <span style={{ fontFamily:F.b, fontSize:'0.8rem', color:'#e5e7eb', lineHeight:1.5 }}>{r.caption}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              <motion.button onClick={onProceed}
                initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.8 }}
                whileHover={{ background:'#fbbf24', scale:1.04 }} whileTap={{ scale:0.97 }}
                className="pulse-btn"
                style={{ padding:'14px 44px', background:'#f59e0b', color:'#0f172a', border:'none', borderRadius:9999, fontFamily:F.d, fontWeight:700, fontSize:'1rem', letterSpacing:'0.05em', textTransform:'uppercase', cursor:'pointer' }}>
                Check for exclusions →
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* ── COMPLETED STATE — light mode container design ── */}
        {isCompleted && (
          <motion.div key="completed" initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.5 }}
            style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, overflow:'hidden' }}>

            {/* Header row: step label LEFT, CTA TOP RIGHT */}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'16px 22px', borderBottom:'1px solid rgba(255,255,255,0.06)', flexWrap:'wrap', gap:10 }}>
              <p style={{ fontFamily:F.b, fontWeight:600, fontSize:'0.75rem', color:'#6b7280', letterSpacing:'0.14em', textTransform:'uppercase', margin:0 }}>
                Step {stepData.stepNumber} — {stepData.title}
              </p>
              {status==='included' && (
                <div style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'5px 14px', background:'rgba(74,222,128,0.1)', border:'1px solid rgba(74,222,128,0.3)', borderRadius:9999 }}>
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M1.5 5.5L4 8L9.5 2.5" stroke="#4ade80" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span style={{ fontFamily:F.d, fontWeight:700, fontSize:'0.7rem', color:'#4ade80', letterSpacing:'0.06em', textTransform:'uppercase' }}>Selected for usability testing</span>
                </div>
              )}
              {status==='skipped' && (
                <button onClick={onIncludeRetro} className="pulse-btn"
                  style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'5px 14px', background:'rgba(245,158,11,0.08)', border:'1px solid rgba(245,158,11,0.25)', borderRadius:9999, cursor:'pointer' }}>
                  <span style={{ fontFamily:F.d, fontWeight:700, fontSize:'0.7rem', color:'#f59e0b', letterSpacing:'0.06em', textTransform:'uppercase' }}>Include in usability testing →</span>
                </button>
              )}
              {(!status || status==='clean') && (
                <span style={{ fontFamily:F.b, fontSize:'0.78rem', color:'#4b5563' }}>No exclusions at this step</span>
              )}
            </div>

            {flaggedCount > 0 && (
              <div style={{ padding:'16px 22px 20px' }}>
                {/* Requirements — left aligned, small icons, annotation below */}
                <p style={{ fontFamily:F.b, fontWeight:600, fontSize:'0.65rem', color:'#6b7280', letterSpacing:'0.12em', textTransform:'uppercase', margin:'0 0 8px' }}>
                  What this step requires
                </p>
                <div style={{ display:'flex', flexDirection:'column', gap:5, marginBottom:12 }}>
                  {stepData.requirements.map(r => (
                    <div key={r.id} style={{ display:'flex', alignItems:'flex-start', gap:10, padding:'7px 12px', background:'rgba(74,222,128,0.05)', border:'1px solid rgba(74,222,128,0.15)', borderRadius:6 }}>
                      <span style={{ fontFamily:F.b, fontSize:'0.78rem', color:'#e5e7eb', lineHeight:1.5 }}>{r.caption}</span>
                    </div>
                  ))}
                </div>
                <p style={{ fontFamily:F.b, fontWeight:500, fontSize:'0.85rem', color:'#9ca3af', margin:'0 0 16px' }}>
                  The requirement above creates exclusion for <strong style={{ color:'#e5e7eb', fontWeight:700 }}>{flaggedCount} user {flaggedCount===1?'group':'groups'}</strong>
                </p>

                {/* Personas — wide row layout: avatar LEFT, name+bio+represents RIGHT */}
                <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                  {frozenPersonas.map(key => {
                    const p = CHARACTERS[key]
                    if (!p) return null
                    return (
                      <div key={key} style={{ display:'flex', gap:14, alignItems:'stretch', background:'rgba(255,255,255,0.025)', borderRadius:12, padding:'12px 14px', border:'1px solid rgba(255,255,255,0.05)' }}>
                        {/* Avatar — height matches content block */}
                        <div style={{ flexShrink:0, width:'clamp(60px,8vw,90px)', minHeight:'clamp(120px,16vh,180px)', display:'flex', alignItems:'flex-end', justifyContent:'center' }}>
                          <img src={p.image} alt={p.name} style={{ width:'100%', height:'100%', objectFit:'contain', objectPosition:'bottom' }} />
                        </div>
                        {/* Text block — fills all remaining width */}
                        <div style={{ flex:1, minWidth:0, paddingTop:4 }}>
                          <p style={{ fontFamily:F.d, fontWeight:800, fontSize:'0.95rem', color:'#ffffff', margin:'0 0 2px' }}>{p.name}</p>
                          <p style={{ fontFamily:F.b, fontWeight:500, fontSize:'0.75rem', color:'#f59e0b', margin:'0 0 8px' }}>{p.age} · {p.persona}</p>
                          {p.represents && (
                            <div style={{ padding:'10px 12px', borderRadius:8, background:'rgba(245,158,11,0.07)', border:'1px solid rgba(245,158,11,0.2)' }}>
                              <p style={{ fontFamily:F.b, fontWeight:700, fontSize:'0.7rem', color:'#f59e0b', letterSpacing:'0.1em', textTransform:'uppercase', margin:'0 0 4px' }}>Represents</p>
                              <p style={{ fontFamily:F.b, fontWeight:500, fontSize:'0.8rem', color:'#e5e7eb', margin:'0 0 3px', lineHeight:1.45 }}>
                                {p.represents.count} {p.represents.description}.
                              </p>
                              <p style={{ fontFamily:F.b, fontSize:'0.68rem', color:'#6b7280', margin:0, fontStyle:'italic' }}>{p.represents.source}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
