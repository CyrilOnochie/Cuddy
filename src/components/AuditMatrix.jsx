// AuditMatrix.jsx — interactive exclusion matrix for the original dark prototype.
// Replaces PreReportScreen. Same v2 interaction model (click cell → detail panel)
// but using Syne/DM Sans fonts and the original dark navy design system.

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MATRIX_PERSONAS, MATRIX_STEPS, MATRIX_CELLS, AUDIT_STATS } from '../data/matrixData'
import { CHARACTERS } from '../data/characters'
import { REPORT } from '../data/reportData'
import { STEP1 } from '../data/step1'
import { STEP2 } from '../data/step2'
import { STEP3 } from '../data/step3'
import { STEP4 } from '../data/step4'
import ParticleCanvas from './ParticleCanvas'

const F = { d:"'Syne',sans-serif", b:"'DM Sans',sans-serif" }

const SEVERITY = {
  clean:      { bg:'rgba(74,222,128,0.08)',  border:'rgba(74,222,128,0.3)',   text:'#4ade80', label:'Clear',        icon:'✓' },
  soft:       { bg:'rgba(245,158,11,0.08)',  border:'rgba(245,158,11,0.3)',   text:'#f59e0b', label:'Friction',     icon:'⚠' },
  hard:       { bg:'rgba(239,68,68,0.08)',   border:'rgba(239,68,68,0.3)',    text:'#ef4444', label:'Hard stop',    icon:'✕' },
  workaround: { bg:'rgba(96,165,250,0.08)',  border:'rgba(96,165,250,0.3)',   text:'#60a5fa', label:'Workaround',   icon:'↗' },
  blocked:    { bg:'rgba(255,255,255,0.02)', border:'rgba(255,255,255,0.05)', text:'#374151', label:'Not reached',  icon:'—' },
}

const STEPS_MAP = { 1:STEP1, 2:STEP2, 3:STEP3, 4:STEP4 }

// ── Stat card ──
function StatCard({ value, label, color, delay }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => {
      const start = Date.now(), dur = 900
      const tick = () => {
        const e = 1 - Math.pow(1 - Math.min((Date.now()-start)/dur,1), 3)
        setCount(Math.round(value * e))
        if (e < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return (
    <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:delay/1000 }}
      style={{ flex:'1 1 110px', padding:'14px 16px', background:'#16213a', border:`1px solid rgba(255,255,255,0.08)`, borderRadius:10, borderTop:`2px solid ${color}` }}>
      <p style={{ fontFamily:F.d, fontWeight:900, fontSize:'1.8rem', color, margin:'0 0 3px', letterSpacing:'-0.03em', fontVariantNumeric:'tabular-nums' }}>{count}</p>
      <p style={{ fontFamily:F.b, fontSize:'0.75rem', color:'#9ca3af', margin:0, lineHeight:1.4 }}>{label}</p>
    </motion.div>
  )
}

// ── Matrix cell ──
function Cell({ personaKey, stepNumber, severity, isSelected, onClick }) {
  const s = SEVERITY[severity] || SEVERITY.blocked
  return (
    <motion.button onClick={() => onClick({ personaKey, stepNumber, severity })}
      whileHover={{ scale:1.04 }}
      animate={{ boxShadow: isSelected ? '0 0 0 2px #f59e0b, 0 0 16px rgba(245,158,11,0.3)' : 'none' }}
      style={{ width:'100%', aspectRatio:'1', minHeight:64, maxHeight:82, background: isSelected ? 'rgba(245,158,11,0.1)' : s.bg, border:`1px solid ${isSelected ? '#f59e0b' : s.border}`, borderRadius:8, cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:4, padding:6 }}>
      <span style={{ fontSize:'0.88rem', color:s.text, lineHeight:1 }}>{s.icon}</span>
      <span style={{ fontFamily:F.b, fontWeight:600, fontSize:'0.52rem', color: isSelected ? '#f59e0b' : s.text, textTransform:'uppercase', letterSpacing:'0.04em', textAlign:'center', lineHeight:1.2, opacity:0.9 }}>{s.label}</span>
    </motion.button>
  )
}

// ── Detail panel ──
function DetailPanel({ cell, onClose }) {
  if (!cell) return null
  const { personaKey, stepNumber, severity } = cell
  const s = SEVERITY[severity] || SEVERITY.blocked
  const p = CHARACTERS[personaKey]
  const stepData = STEPS_MAP[stepNumber]
  const flagGroup = stepData?.flags.find(f => f.personaKey === personaKey)
  const reportPersona = REPORT.personas.find(rp => rp.key === personaKey)

  return (
    <motion.div initial={{ x:50, opacity:0 }} animate={{ x:0, opacity:1 }} exit={{ x:50, opacity:0 }} transition={{ duration:0.22, ease:[0.16,1,0.3,1] }}
      style={{ width:360, flexShrink:0, borderLeft:'1px solid rgba(255,255,255,0.08)', background:'#0f172a', display:'flex', flexDirection:'column', height:'100%', overflowY:'auto', position:'sticky', top:0 }}>

      {/* Panel header */}
      <div style={{ padding:'14px 18px', borderBottom:'1px solid rgba(255,255,255,0.08)', display:'flex', alignItems:'center', justifyContent:'space-between', position:'sticky', top:0, background:'rgba(15,23,42,0.97)', backdropFilter:'blur(8px)', zIndex:5, flexShrink:0 }}>
        <div>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:2 }}>
            <span style={{ fontFamily:F.b, fontSize:'0.7rem', color:'#6b7280' }}>Step {stepNumber} · {p?.name}</span>
            <span style={{ padding:'2px 8px', background:s.bg, border:`1px solid ${s.border}`, borderRadius:9999, fontFamily:F.b, fontWeight:700, fontSize:'0.6rem', color:s.text, textTransform:'uppercase', letterSpacing:'0.06em' }}>{s.label}</span>
          </div>
          <p style={{ fontFamily:F.d, fontWeight:700, fontSize:'0.82rem', color:'#ffffff', margin:0 }}>{stepData?.title}</p>
        </div>
        <button onClick={onClose}
          style={{ background:'transparent', border:'none', color:'#6b7280', cursor:'pointer', fontSize:'1rem', lineHeight:1, padding:'4px 6px', borderRadius:4 }}
          onMouseEnter={e => e.currentTarget.style.color='#e5e7eb'}
          onMouseLeave={e => e.currentTarget.style.color='#6b7280'}>✕</button>
      </div>

      <div style={{ padding:'16px 18px', flex:1 }}>
        {/* Special message for clean/blocked cells */}
        {(severity === 'clean' || severity === 'blocked') && (
          <div style={{ padding:'20px', textAlign:'center' }}>
            <span style={{ fontSize:'2rem' }}>{severity === 'clean' ? '✓' : '—'}</span>
            <p style={{ fontFamily:F.d, fontWeight:700, fontSize:'0.9rem', color:'#ffffff', margin:'10px 0 6px' }}>
              {severity === 'clean' ? 'No exclusion at this step' : 'Not reached'}
            </p>
            <p style={{ fontFamily:F.b, fontSize:'0.8rem', color:'#6b7280', lineHeight:1.55 }}>
              {severity === 'clean' ? `${p?.name} completes this step without a documented barrier.` : `${p?.name} does not reach this step due to an earlier hard stop.`}
            </p>
          </div>
        )}

        {/* Persona */}
        {p && severity !== 'clean' && severity !== 'blocked' && (
          <div style={{ display:'flex', alignItems:'center', gap:12, padding:'12px', background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:10, marginBottom:14 }}>
            <div style={{ width:48, height:76, flexShrink:0 }}>
              <img src={p.image} alt={p.name} style={{ width:'100%', height:'100%', objectFit:'contain', objectPosition:'bottom' }}/>
            </div>
            <div>
              <p style={{ fontFamily:F.d, fontWeight:800, fontSize:'0.9rem', color:'#ffffff', margin:'0 0 2px' }}>{p.name}</p>
              <p style={{ fontFamily:F.b, fontSize:'0.74rem', color:'#f59e0b', margin:'0 0 5px' }}>{p.age} · {p.persona}</p>
              {(flagGroup?.represents || p.represents) && <p style={{ fontFamily:F.b, fontSize:'0.7rem', color:'#9ca3af', margin:0, lineHeight:1.4 }}>{flagGroup?.represents || `Represents ${p.represents.short}`}</p>}
            </div>
          </div>
        )}

        {/* Flag cards */}
        {flagGroup?.items?.map((item, i) => {
          const fs = SEVERITY[item.severity] || SEVERITY.soft
          return (
            <div key={i} style={{ borderLeft:`3px solid ${fs.text}`, background:fs.bg, borderRadius:'0 8px 8px 0', padding:'10px 12px', marginBottom:8, border:`1px solid ${fs.border}80`, borderLeft:`3px solid ${fs.text}` }}>
              <span style={{ fontFamily:F.b, fontWeight:700, fontSize:'0.62rem', color:fs.text, textTransform:'uppercase', letterSpacing:'0.08em' }}>{fs.label}</span>
              <p style={{ fontFamily:F.b, fontWeight:600, fontSize:'0.82rem', color:'#ffffff', margin:'4px 0 4px' }}>{item.cardLabel}</p>
              <p style={{ fontFamily:F.b, fontSize:'0.78rem', color:'#d1d5db', lineHeight:1.5, margin:'0 0 7px' }}>{item.plainText}</p>
              <div style={{ padding:'7px 10px', background:'rgba(0,0,0,0.25)', borderRadius:6 }}>
                <p style={{ fontFamily:F.b, fontSize:'0.75rem', color:'#e5e7eb', fontWeight:500, margin:'0 0 2px' }}>{item.stat}</p>
                <p style={{ fontFamily:F.b, fontSize:'0.65rem', color:'#6b7280', margin:0, fontStyle:'italic' }}>{item.source}</p>
              </div>
            </div>
          )
        })}

        {/* Why include — uses step-specific flagGroup.whyInclude, falls back to report-level */}
        {(flagGroup?.whyInclude || reportPersona?.whyInclude) && severity !== 'clean' && severity !== 'blocked' && (
          <div style={{ padding:'11px 13px', background:'rgba(245,158,11,0.06)', border:'1px solid rgba(245,158,11,0.2)', borderRadius:8, marginTop:8 }}>
            <p style={{ fontFamily:F.b, fontWeight:700, fontSize:'0.63rem', color:'#f59e0b', letterSpacing:'0.1em', textTransform:'uppercase', margin:'0 0 5px' }}>Why include users like {p?.name} in usability testing</p>
            <p style={{ fontFamily:F.b, fontSize:'0.78rem', color:'#e5e7eb', lineHeight:1.6, margin:0 }}>{flagGroup?.whyInclude || reportPersona?.whyInclude}</p>
          </div>
        )}

        {/* Recruitment */}
        {reportPersona?.recruitment?.contacts?.[0] && severity !== 'clean' && severity !== 'blocked' && (
          <div style={{ padding:'11px 13px', background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)', borderRadius:8, marginTop:8 }}>
            <p style={{ fontFamily:F.b, fontWeight:700, fontSize:'0.63rem', color:'#6b7280', letterSpacing:'0.1em', textTransform:'uppercase', margin:'0 0 5px' }}>Point of contact</p>
            <p style={{ fontFamily:F.d, fontWeight:700, fontSize:'0.8rem', color:'#ffffff', margin:'0 0 2px' }}>{reportPersona.recruitment.contacts[0].org}</p>
            <p style={{ fontFamily:F.b, fontSize:'0.72rem', color:'#6b7280', margin:0 }}>{reportPersona.recruitment.contacts[0].detail}</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}

// ── Main AuditMatrix ──
export default function AuditMatrix({ onViewReport }) {
  const [selectedCell, setSelectedCell] = useState(null)
  const [revealedRows, setRevealedRows] = useState(new Set())  // start empty

  // Scroll to top when matrix appears — user should see stat cards first
  useEffect(() => {
    window.scrollTo({ top:0, behavior:'instant' })
  }, [])

  // Stat cards animate in at 0.1–0.7s (via StatCard delay prop).
  // Persona rows wait until cards are done, then stagger in one by one.
  useEffect(() => {
    const CARD_SETTLE = 1300  // wait for stat cards to finish
    const STAGGER = 380       // gap between each persona row
    // Dan (default user) appears first, just after cards settle
    setTimeout(() => setRevealedRows(new Set(['dan'])), CARD_SETTLE)
    // Other personas follow with stagger
    ;['jack','sam','tosin','jane'].forEach((key, i) => {
      setTimeout(() => setRevealedRows(prev => new Set([...prev, key])), CARD_SETTLE + (i+1)*STAGGER)
    })
  }, [])

  const handleCell = (cell) => {
    if (selectedCell?.personaKey===cell.personaKey && selectedCell?.stepNumber===cell.stepNumber) setSelectedCell(null)
    else setSelectedCell(cell)
  }

  return (
    <div style={{ minHeight:'100vh', background:'#0f172a', display:'flex', flexDirection:'column', position:'relative', overflow:'hidden' }}>
      <ParticleCanvas />
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 80% 80% at 50% 0%, transparent 20%, rgba(15,23,42,0.85) 90%)', pointerEvents:'none', zIndex:1 }}/>

      <div style={{ position:'relative', zIndex:2, display:'flex', flexDirection:'column', flex:1 }}>
        {/* Header */}
        <div style={{ padding:'28px 32px 0', flexShrink:0 }}>
          <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:20, flexWrap:'wrap', gap:12 }}>
            <div>
              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
                <span style={{ fontFamily:F.b, fontWeight:600, fontSize:'0.65rem', color:'#4ade80', padding:'2px 8px', background:'rgba(74,222,128,0.1)', border:'1px solid rgba(74,222,128,0.3)', borderRadius:4 }}>● Audit complete</span>
                <span style={{ fontFamily:F.b, fontSize:'0.65rem', color:'#6b7280' }}>GOV.UK · Apply for Universal Credit</span>
              </div>
              <h1 style={{ fontFamily:F.d, fontWeight:900, fontSize:'clamp(1.4rem,3vw,2rem)', color:'#ffffff', margin:'0 0 4px', letterSpacing:'-0.03em' }}>Audit matrix</h1>
              <p style={{ fontFamily:F.b, fontSize:'0.8rem', color:'#6b7280', margin:0 }}>Click any cell to inspect the evidence behind each finding.</p>
            </div>
            <motion.button onClick={onViewReport}
              initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.5 }}
              whileHover={{ background:'rgba(245,158,11,0.15)', borderColor:'#f59e0b' }} whileTap={{ scale:0.97 }}
              className='pulse-btn' style={{ padding:'9px 20px', background:'transparent', color:'#f59e0b', border:'1px solid rgba(245,158,11,0.4)', borderRadius:9999, fontFamily:F.d, fontWeight:700, fontSize:'0.82rem', cursor:'pointer', letterSpacing:'0.02em', transition:'background 0.15s', whiteSpace:'nowrap' }}>
              View full report →
            </motion.button>
          </div>

          {/* Stat cards */}
          <div style={{ display:'flex', gap:10, marginBottom:20, flexWrap:'wrap' }}>
            <StatCard value={AUDIT_STATS.steps}           label="steps reviewed"              color="#f59e0b" delay={100}/>
            <StatCard value={AUDIT_STATS.exclusionPoints}  label="exclusion points identified"  color="#ef4444" delay={300}/>
            <StatCard value={AUDIT_STATS.userGroups}       label="user groups affected"          color="#60a5fa" delay={500}/>
            <StatCard value={1}                             label="default user — no barriers"    color="#4ade80" delay={700}/>
          </div>

          {/* Legend */}
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.8 }}
            style={{ display:'flex', gap:14, alignItems:'center', marginBottom:16, flexWrap:'wrap' }}>
            <span style={{ fontFamily:F.b, fontSize:'0.62rem', color:'#4b5563', textTransform:'uppercase', letterSpacing:'0.08em' }}>Key:</span>
            {Object.entries(SEVERITY).filter(([k]) => k !== 'workaround').map(([k, s]) => (
              <div key={k} style={{ display:'flex', alignItems:'center', gap:5 }}>
                <div style={{ width:8, height:8, borderRadius:2, background:s.text, opacity: k==='blocked' ? 0.3 : 1 }}/>
                <span style={{ fontFamily:F.b, fontSize:'0.65rem', color:'#6b7280' }}>{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Matrix + detail panel */}
        <div style={{ flex:1, display:'flex', overflow:'hidden', position:'relative', zIndex:2 }}>
          <div style={{ flex:1, overflowX:'auto', overflowY:'auto', padding:'0 32px 40px' }}>
            <div style={{ minWidth:560 }}>
              {/* Column headers */}
              <div style={{ display:'grid', gridTemplateColumns:'176px repeat(4,1fr)', gap:8, marginBottom:8 }}>
                <div/>
                {MATRIX_STEPS.map(step => (
                  <div key={step.number} style={{ textAlign:'center' }}>
                    <p style={{ fontFamily:F.b, fontSize:'0.58rem', color:'#4b5563', letterSpacing:'0.08em', textTransform:'uppercase', margin:'0 0 1px' }}>Step {step.number}</p>
                    <p style={{ fontFamily:F.d, fontWeight:700, fontSize:'0.78rem', color:'#9ca3af', margin:0 }}>{step.short}</p>
                  </div>
                ))}
              </div>

              {/* Persona rows */}
              {MATRIX_PERSONAS.map(persona => {
                const char = CHARACTERS[persona.key] || {}
                const revealed = revealedRows.has(persona.key)
                return (
                  <motion.div key={persona.key}
                    initial={{ opacity:0, x:-12 }} animate={{ opacity: revealed ? 1 : 0, x: revealed ? 0 : -12 }}
                    transition={{ duration:0.35, ease:[0.16,1,0.3,1] }}
                    style={{ display:'grid', gridTemplateColumns:'176px repeat(4,1fr)', gap:8, marginBottom:8 }}>

                    {/* Persona label */}
                    <div style={{ display:'flex', alignItems:'center', gap:10, padding:'0 2px' }}>
                      <div style={{ width:32, height:52, flexShrink:0 }}>
                        <img src={persona.image} alt={persona.name} style={{ width:'100%', height:'100%', objectFit:'contain', objectPosition:'bottom' }}/>
                      </div>
                      <div style={{ minWidth:0 }}>
                        <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                          <p style={{ fontFamily:F.d, fontWeight:700, fontSize:'0.8rem', color: persona.isDefault ? '#6b7280' : '#ffffff', margin:0, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{persona.name}</p>
                          {persona.isDefault && <span style={{ fontFamily:F.b, fontSize:'0.55rem', color:'#374151', padding:'1px 5px', border:'1px solid rgba(255,255,255,0.08)', borderRadius:3, whiteSpace:'nowrap' }}>Default</span>}
                        </div>
                        <p style={{ fontFamily:F.b, fontSize:'0.62rem', color:'#4b5563', margin:'1px 0 0', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{persona.subtitle}</p>
                      </div>
                    </div>

                    {/* Cells */}
                    {MATRIX_STEPS.map(step => {
                      const sev = MATRIX_CELLS[persona.key]?.[step.number] || 'clean'
                      const isSel = selectedCell?.personaKey===persona.key && selectedCell?.stepNumber===step.number
                      return <Cell key={step.number} personaKey={persona.key} stepNumber={step.number} severity={sev} isSelected={isSel} onClick={handleCell}/>
                    })}
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Detail panel */}
          <AnimatePresence>
            {selectedCell && <DetailPanel cell={selectedCell} onClose={() => setSelectedCell(null)}/>}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
