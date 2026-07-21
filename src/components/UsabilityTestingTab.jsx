// UsabilityTestingTab.jsx — full rebuild with:
// - Needs Testing cards showing date/time stamps
// - Session Records mirroring folder structure of Needs Testing
// - + Add session button for multiple participants per persona
// - Debrief form with "Why this user was included" accordion
// - Session records showing pseudonym + original hypothesis before barrier

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CHARACTERS } from '../data/characters'
import { REPORT } from '../data/reportData'

const F = { d:"'Syne',sans-serif", b:"'DM Sans',sans-serif" }
const C = {
  bg:'#0f172a', s1:'#16213a', s2:'#1e2a45',
  border:'rgba(255,255,255,0.08)', borderH:'rgba(255,255,255,0.16)',
  amber:'#f59e0b', aD:'rgba(245,158,11,0.1)', aBorder:'rgba(245,158,11,0.3)',
  success:'#4ade80', sD:'rgba(74,222,128,0.1)', sBorder:'rgba(74,222,128,0.3)',
  danger:'#ef4444', info:'#60a5fa',
  t1:'#ffffff', t2:'#e5e7eb', t3:'#9ca3af', t4:'#4b5563',
}

const loadDebriefs  = () => { try { return JSON.parse(localStorage.getItem('dea_debriefs'))  || [] } catch { return [] } }
const saveDebriefs  = (d) => localStorage.setItem('dea_debriefs', JSON.stringify(d))

const SEV = {
  hard:       { bg:'rgba(239,68,68,0.1)',   border:'rgba(239,68,68,0.3)',   text:'#ef4444', label:'Hard stop' },
  soft:       { bg:'rgba(245,158,11,0.1)',  border:'rgba(245,158,11,0.3)',  text:'#f59e0b', label:'Friction' },
  workaround: { bg:'rgba(96,165,250,0.1)',  border:'rgba(96,165,250,0.3)',  text:'#60a5fa', label:'Workaround' },
}

const STATUS_OPTIONS = ['No activity','Contact made','Invite extended','Invite Accepted','Usability testing held']
const STATUS_COLOURS = {
  'No activity':            { bg:'rgba(255,255,255,0.05)', border:C.border,                       text:C.t4 },
  'Contact made':           { bg:'rgba(96,165,250,0.1)',  border:'rgba(96,165,250,0.3)',          text:C.info },
  'Invite extended':        { bg:C.aD,                   border:C.aBorder,                       text:C.amber },
  'Invite Accepted':        { bg:'rgba(167,139,250,0.1)',border:'rgba(167,139,250,0.3)',          text:'#a78bfa' },
  'Usability testing held': { bg:C.sD,                   border:C.sBorder,                       text:C.success },
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function fmtDate(iso) {
  if (!iso) return ''
  try { return new Date(iso).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' }) }
  catch { return iso }
}

function StatusDropdown({ value, onChange }) {
  const sc = STATUS_COLOURS[value] || STATUS_COLOURS['No activity']
  return (
    <select value={value} onChange={e => onChange(e.target.value)}
      style={{ background:sc.bg, border:`1px solid ${sc.border}`, borderRadius:9999, color:sc.text, fontFamily:F.b, fontWeight:600, fontSize:'0.78rem', padding:'6px 12px', cursor:'pointer', outline:'none', appearance:'none', WebkitAppearance:'none' }}>
      {STATUS_OPTIONS.map(o => <option key={o} value={o} style={{ background:C.s1, color:C.t2 }}>{o}</option>)}
    </select>
  )
}

// ── Why-include accordion (used in form + session cards) ──────────────────────
function WhyIncludeAccordion({ personaKey, recs, defaultOpen=false }) {
  const [open, setOpen] = useState(defaultOpen)
  const reportPersona = REPORT.personas.find(rp => rp.key === personaKey)
  if (!reportPersona?.whyInclude) return null

  return (
    <div style={{ background:'rgba(96,165,250,0.05)', border:'1px solid rgba(96,165,250,0.18)', borderRadius:10, overflow:'hidden' }}>
      <button type="button" onClick={() => setOpen(o => !o)}
        style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'11px 14px', background:'transparent', border:'none', cursor:'pointer' }}>
        <span style={{ fontFamily:F.b, fontWeight:700, fontSize:'0.72rem', color:C.info, letterSpacing:'0.08em', textTransform:'uppercase' }}>
          Why this user was included
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration:0.2 }} style={{ color:C.info }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M2 4l4 4 4-4"/>
          </svg>
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }}
            transition={{ duration:0.22 }} style={{ overflow:'hidden' }}>
            <div style={{ padding:'0 14px 13px' }}>
              <p style={{ fontFamily:F.b, fontSize:'0.8rem', color:C.t2, lineHeight:1.6, margin:'0 0 10px' }}>
                {reportPersona.whyInclude}
              </p>
              {recs && recs.length > 0 && (
                <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                  {recs.sort((a,b) => a.step - b.step).map(rec => {
                    const sc = SEV[rec.severity] || SEV.soft
                    return (
                      <span key={rec.step} style={{ padding:'3px 9px', background:sc.bg, border:`1px solid ${sc.border}`, borderRadius:9999, fontFamily:F.b, fontSize:'0.65rem', fontWeight:700, color:sc.text }}>
                        S{rec.step} — {sc.label}
                      </span>
                    )
                  })}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Debrief Modal ─────────────────────────────────────────────────────────────
function DebriefModal({ target, onSubmit, onDismiss }) {
  const char = CHARACTERS[target.personaKey]
  const [form, setForm] = useState({
    sessionDate: new Date().toISOString().split('T')[0],
    participantPseudonym: '',
    taskCompleted: '',
    stepReached: '',
    specificBarrier: '',
    matchedPrediction: '',
    matchElaboration: '',
    designChange: '',
    additionalNotes: '',
  })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const required = form.sessionDate && form.taskCompleted && form.specificBarrier && form.designChange

  const inputStyle = { width:'100%', padding:'9px 12px', background:C.s2, border:`1px solid ${C.border}`, borderRadius:8, color:C.t1, fontFamily:F.b, fontSize:'0.85rem', outline:'none', resize:'vertical', transition:'border-color 0.15s' }
  const labelStyle = { fontFamily:F.b, fontWeight:600, fontSize:'0.7rem', color:C.t3, letterSpacing:'0.06em', textTransform:'uppercase', display:'block', marginBottom:6 }
  const opts = (key, options) => (
    <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
      {options.map(o => (
        <button key={o} type="button" onClick={() => set(key, o)}
          style={{ padding:'7px 14px', background: form[key]===o ? C.aD : C.s2, border:`1px solid ${form[key]===o ? C.amber : C.border}`, borderRadius:8, color: form[key]===o ? C.amber : C.t3, fontFamily:F.b, fontWeight:600, fontSize:'0.8rem', cursor:'pointer', transition:'all 0.12s' }}>
          {o}
        </button>
      ))}
    </div>
  )

  return (
    <div onClick={onDismiss} style={{ position:'fixed', inset:0, zIndex:200, background:'rgba(0,0,0,0.75)', display:'flex', alignItems:'center', justifyContent:'center', padding:24, overflowY:'auto' }}>
      <motion.div initial={{ opacity:0, scale:0.96, y:16 }} animate={{ opacity:1, scale:1, y:0 }}
        onClick={e => e.stopPropagation()}
        style={{ background:C.s1, border:`1px solid ${C.border}`, borderRadius:16, padding:'26px 26px', maxWidth:560, width:'100%', maxHeight:'90vh', overflowY:'auto' }}>

        <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:18, gap:12 }}>
          <div>
            <p style={{ fontFamily:F.b, fontWeight:600, fontSize:'0.65rem', color:C.amber, letterSpacing:'0.12em', textTransform:'uppercase', margin:'0 0 3px' }}>
              Session debrief — {char?.name}
            </p>
            <h2 style={{ fontFamily:F.d, fontWeight:900, fontSize:'1.15rem', color:C.t1, margin:'0 0 2px', letterSpacing:'-0.02em' }}>
              Add a participant session
            </h2>
            <p style={{ fontFamily:F.b, fontSize:'0.74rem', color:C.t4, margin:0 }}>
              One form per participant. Submit again for additional participants.
            </p>
          </div>
          <button type="button" onClick={onDismiss}
            style={{ background:'transparent', border:'none', color:C.t4, cursor:'pointer', fontSize:'1.1rem', padding:'2px 6px', flexShrink:0 }}>✕</button>
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          {/* Why included accordion — collapsed by default */}
          <WhyIncludeAccordion personaKey={target.personaKey} recs={target.recs} defaultOpen={false}/>

          {/* Date + pseudonym */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            <div>
              <label style={labelStyle}>Session date</label>
              <input type="date" value={form.sessionDate} onChange={e => set('sessionDate', e.target.value)} style={inputStyle}
                onFocus={e => e.target.style.borderColor=C.amber} onBlur={e => e.target.style.borderColor=C.border}/>
            </div>
            <div>
              <label style={labelStyle}>Participant pseudonym</label>
              <input type="text" placeholder="e.g. P1, Participant A" value={form.participantPseudonym}
                onChange={e => set('participantPseudonym', e.target.value)} style={inputStyle}
                onFocus={e => e.target.style.borderColor=C.amber} onBlur={e => e.target.style.borderColor=C.border}/>
            </div>
          </div>

          {/* Task completion */}
          <div>
            <label style={labelStyle}>Did the participant complete the full task? *</label>
            {opts('taskCompleted', ['Yes', 'Partially', 'No'])}
          </div>

          {(form.taskCompleted === 'Partially' || form.taskCompleted === 'No') && (
            <div>
              <label style={labelStyle}>Which step did they reach before stopping?</label>
              {opts('stepReached', ['Step 1', 'Step 2', 'Step 3', 'Step 4'])}
            </div>
          )}

          <div>
            <label style={labelStyle}>What specific barrier did they encounter? *</label>
            <textarea rows={3} placeholder="Describe exactly what happened — what they tried, what they said, what blocked them…"
              value={form.specificBarrier} onChange={e => set('specificBarrier', e.target.value)} style={inputStyle}
              onFocus={e => e.target.style.borderColor=C.amber} onBlur={e => e.target.style.borderColor=C.border}/>
          </div>

          <div>
            <label style={labelStyle}>Did this match what the audit predicted?</label>
            {opts('matchedPrediction', ['Yes', 'Partly', 'No'])}
            {form.matchedPrediction && (
              <textarea rows={2} placeholder="Elaborate — was the barrier different, more severe, less severe, or something the audit didn't anticipate?"
                style={{ ...inputStyle, marginTop:8 }} value={form.matchElaboration} onChange={e => set('matchElaboration', e.target.value)}
                onFocus={e => e.target.style.borderColor=C.amber} onBlur={e => e.target.style.borderColor=C.border}/>
            )}
          </div>

          <div>
            <label style={labelStyle}>What would need to change for this user to complete this step without assistance? *</label>
            <textarea rows={3} placeholder="Be specific — what is the one change that would remove the barrier you observed?"
              value={form.designChange} onChange={e => set('designChange', e.target.value)} style={inputStyle}
              onFocus={e => e.target.style.borderColor=C.amber} onBlur={e => e.target.style.borderColor=C.border}/>
          </div>

          <div>
            <label style={labelStyle}>Additional notes</label>
            <textarea rows={2} placeholder="Anything else worth recording from this session…"
              value={form.additionalNotes} onChange={e => set('additionalNotes', e.target.value)} style={inputStyle}
              onFocus={e => e.target.style.borderColor=C.amber} onBlur={e => e.target.style.borderColor=C.border}/>
          </div>

          <div style={{ display:'flex', gap:10, paddingTop:2 }}>
            <motion.button type="button" onClick={() => required && onSubmit(form)}
              whileHover={required ? { background:'#fbbf24' } : {}} whileTap={required ? { scale:0.97 } : {}}
              style={{ flex:1, padding:'12px', background: required ? C.amber : C.s2, color: required ? C.bg : C.t4, border:'none', borderRadius:9999, fontFamily:F.d, fontWeight:700, fontSize:'0.88rem', cursor: required ? 'pointer' : 'default', letterSpacing:'0.02em', textTransform:'uppercase', transition:'background 0.15s' }}>
              {required ? 'Save session record →' : 'Fill required fields to save'}
            </motion.button>
            <button type="button" onClick={onDismiss}
              style={{ padding:'12px 18px', background:'transparent', border:`1px solid ${C.border}`, borderRadius:9999, color:C.t4, fontFamily:F.b, fontSize:'0.85rem', cursor:'pointer' }}>
              Skip
            </button>
          </div>
          <p style={{ fontFamily:F.b, fontSize:'0.65rem', color:C.t4, margin:0, textAlign:'center' }}>
            * Required. One form per participant — submit again for each additional person interviewed.
          </p>
        </div>
      </motion.div>
    </div>
  )
}

// ── TrackerRow ────────────────────────────────────────────────────────────────
function TrackerRow({ personaKey, recs, index, auditId, onUpdateStatus, onTriggerDebrief, existingDebriefs }) {
  const [expanded, setExpanded] = useState(false)
  const char = CHARACTERS[personaKey]
  if (!char) return null
  const reportPersona = REPORT.personas.find(rp => rp.key === personaKey)
  const contact = reportPersona?.recruitment?.contacts?.[0]
  const sharedStatus = recs[0].status
  const hasDebriefs = existingDebriefs.length > 0

  const handleStatus = (val) => {
    recs.forEach(rec => onUpdateStatus(auditId, personaKey, rec.step, val))
    if (val === 'Usability testing held') onTriggerDebrief({ personaKey, auditId, recs })
  }

  return (
    <div style={{ borderBottom:`1px solid ${C.border}` }}>
      <motion.div initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:index*0.05 }}
        style={{ display:'grid', gridTemplateColumns:'2.4fr 1.2fr 2fr 1.6fr', gap:16, alignItems:'center', padding:'14px 16px' }}>

        {/* User */}
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <div style={{ width:42, height:64, flexShrink:0 }}>
            <img src={char.image} alt={char.name} style={{ width:'100%', height:'100%', objectFit:'contain', objectPosition:'bottom' }}/>
          </div>
          <div>
            <p style={{ fontFamily:F.d, fontWeight:800, fontSize:'0.9rem', color:C.t1, margin:'0 0 2px' }}>{char.name}</p>
            <p style={{ fontFamily:F.b, fontSize:'0.72rem', color:C.t3, margin:'0 0 6px', lineHeight:1.4 }}>
              Represents {char.persona.toLowerCase()}
            </p>
            {reportPersona?.whyInclude && (
              <button onClick={() => setExpanded(e => !e)}
                style={{ background:'transparent', border:'none', padding:0, cursor:'pointer', display:'flex', alignItems:'center', gap:4 }}>
                <span style={{ fontFamily:F.b, fontWeight:600, fontSize:'0.7rem', color:C.info }}>Why include {char.name}?</span>
                <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration:0.2 }} style={{ color:C.info }}>
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M2 4l4 4 4-4"/></svg>
                </motion.span>
              </button>
            )}
          </div>
        </div>

        {/* Exclusion step pills */}
        <div style={{ display:'flex', gap:5, flexWrap:'wrap' }}>
          {recs.sort((a,b) => a.step - b.step).map(rec => {
            const sc = SEV[rec.severity] || SEV.soft
            return (
              <span key={rec.step} style={{ display:'inline-block', padding:'4px 8px', background:sc.bg, border:`1px solid ${sc.border}`, borderRadius:9999, fontFamily:F.b, fontWeight:700, fontSize:'0.68rem', color:sc.text }}>S{rec.step}</span>
            )
          })}
        </div>

        {/* Contact */}
        <div>
          {contact ? (
            <>
              <p style={{ fontFamily:F.b, fontWeight:600, fontSize:'0.78rem', color:C.t2, margin:'0 0 1px' }}>{contact.org}</p>
              <p style={{ fontFamily:F.b, fontSize:'0.7rem', color:C.t4, margin:0 }}>{contact.detail}</p>
            </>
          ) : <p style={{ fontFamily:F.b, fontSize:'0.78rem', color:C.t4 }}>—</p>}
        </div>

        {/* Status + add session */}
        <div style={{ display:'flex', flexDirection:'column', gap:8, alignItems:'flex-start' }}>
          <StatusDropdown value={sharedStatus} onChange={handleStatus}/>
          {hasDebriefs && (
            <motion.button type="button" onClick={() => onTriggerDebrief({ personaKey, auditId, recs })}
              whileHover={{ borderColor:C.amber, color:C.amber }} whileTap={{ scale:0.97 }}
              style={{ padding:'4px 10px', background:'transparent', border:`1px solid ${C.border}`, borderRadius:9999, fontFamily:F.b, fontWeight:600, fontSize:'0.7rem', color:C.t4, cursor:'pointer', display:'flex', alignItems:'center', gap:5, transition:'all 0.12s' }}>
              <span style={{ fontSize:'0.85rem' }}>+</span> Add session
            </motion.button>
          )}
          {hasDebriefs && (
            <p style={{ fontFamily:F.b, fontSize:'0.62rem', color:C.t4, margin:0 }}>
              {existingDebriefs.length} session{existingDebriefs.length !== 1 ? 's' : ''} recorded
            </p>
          )}
        </div>
      </motion.div>

      {/* Expandable why-include */}
      <AnimatePresence>
        {expanded && reportPersona?.whyInclude && (
          <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }} exit={{ opacity:0, height:0 }}
            transition={{ duration:0.25 }} style={{ overflow:'hidden' }}>
            <div style={{ margin:'0 16px 14px', padding:'12px 14px', background:'rgba(96,165,250,0.06)', border:'1px solid rgba(96,165,250,0.2)', borderRadius:9 }}>
              <p style={{ fontFamily:F.b, fontWeight:700, fontSize:'0.65rem', color:C.info, letterSpacing:'0.1em', textTransform:'uppercase', margin:'0 0 5px' }}>
                Why include {char.name} in usability testing
              </p>
              <p style={{ fontFamily:F.b, fontWeight:500, fontSize:'0.83rem', color:C.t2, margin:0, lineHeight:1.6 }}>
                {reportPersona.whyInclude}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Session card (inside Session Records drill-down) ──────────────────────────
function SessionCard({ debrief, personaRecs }) {
  const [open, setOpen] = useState(false)
  const statusColour = debrief.taskCompleted === 'Yes' ? C.success : debrief.taskCompleted === 'Partially' ? C.amber : C.danger
  const displayName = debrief.participantPseudonym || 'Anonymous participant'

  return (
    <motion.div initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}
      style={{ background:C.s2, border:`1px solid ${C.border}`, borderRadius:10, overflow:'hidden', marginBottom:8 }}>
      <button onClick={() => setOpen(o => !o)}
        style={{ width:'100%', display:'flex', alignItems:'center', gap:12, padding:'12px 16px', background:'transparent', border:'none', cursor:'pointer', textAlign:'left' }}>
        <div style={{ flex:1 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:2, flexWrap:'wrap' }}>
            <p style={{ fontFamily:F.d, fontWeight:700, fontSize:'0.88rem', color:C.t1, margin:0 }}>{displayName}</p>
            <span style={{ padding:'2px 8px', background:`${statusColour}18`, border:`1px solid ${statusColour}44`, borderRadius:9999, fontFamily:F.b, fontSize:'0.62rem', fontWeight:700, color:statusColour }}>
              {debrief.taskCompleted}
            </span>
          </div>
          <p style={{ fontFamily:F.b, fontSize:'0.7rem', color:C.t4, margin:0 }}>{fmtDate(debrief.sessionDate)}</p>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration:0.2 }} style={{ color:C.t4, flexShrink:0 }}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 5l3.5 3.5L10 5"/></svg>
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }}
            transition={{ duration:0.22 }} style={{ overflow:'hidden' }}>
            <div style={{ padding:'0 16px 16px', display:'flex', flexDirection:'column', gap:10, borderTop:`1px solid ${C.border}`, paddingTop:14 }}>
              {/* Why this user was tested — original hypothesis */}
              <WhyIncludeAccordion personaKey={debrief.personaKey} recs={personaRecs} defaultOpen={true}/>

              {/* Debrief fields */}
              {[
                { label:'Specific barrier encountered', value:debrief.specificBarrier },
                { label:'Did this match the audit prediction?', value:debrief.matchedPrediction + (debrief.matchElaboration ? ` — ${debrief.matchElaboration}` : '') },
                { label:'What would need to change for this user to complete this step without assistance?', value:debrief.designChange },
                debrief.additionalNotes && { label:'Additional notes', value:debrief.additionalNotes },
              ].filter(Boolean).map((row, i) => (
                <div key={i} style={{ padding:'10px 12px', background:C.s1, borderRadius:8 }}>
                  <p style={{ fontFamily:F.b, fontWeight:700, fontSize:'0.62rem', color:C.t4, letterSpacing:'0.08em', textTransform:'uppercase', margin:'0 0 4px' }}>{row.label}</p>
                  <p style={{ fontFamily:F.b, fontSize:'0.82rem', color:C.t2, margin:0, lineHeight:1.55 }}>{row.value}</p>
                </div>
              ))}
              {(debrief.taskCompleted === 'Partially' || debrief.taskCompleted === 'No') && debrief.stepReached && (
                <p style={{ fontFamily:F.b, fontSize:'0.72rem', color:C.t4, margin:0 }}>
                  Stopped at: <strong style={{ color:C.amber }}>{debrief.stepReached}</strong>
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ── Audit card (shared between both tabs) ─────────────────────────────────────
function AuditCard({ audit, count, countLabel, timestamp, onClick, index }) {
  return (
    <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:index*0.07 }}
      onClick={onClick}
      whileHover={{ y:-4, boxShadow:`0 12px 32px rgba(245,158,11,0.18), 0 0 0 1.5px ${C.amber}` }}
      style={{ background:C.s1, borderRadius:14, overflow:'hidden', cursor:'pointer', boxShadow:`0 2px 8px rgba(0,0,0,0.3), 0 0 0 1px ${C.border}` }}>
      <div style={{ background:'#0b0c0c', padding:'16px 20px' }}>
        <p style={{ fontFamily:F.b, fontWeight:600, fontSize:'0.65rem', color:C.t4, letterSpacing:'0.08em', textTransform:'uppercase', margin:'0 0 5px' }}>{audit.platform}</p>
        <p style={{ fontFamily:F.d, fontWeight:900, fontSize:'1.05rem', color:C.t1, margin:0, lineHeight:1.25 }}>{audit.task}</p>
      </div>
      <div style={{ padding:'14px 20px' }}>
        <p style={{ fontFamily:F.d, fontWeight:900, fontSize:'1.8rem', color:C.amber, margin:'0 0 2px', lineHeight:1 }}>{count}</p>
        <p style={{ fontFamily:F.b, fontSize:'0.78rem', color:C.t4, margin:'0 0 10px' }}>{countLabel}</p>
        {timestamp && (
          <p style={{ fontFamily:F.b, fontSize:'0.65rem', color:C.t4, borderTop:`1px solid ${C.border}`, paddingTop:8, margin:0 }}>
            {timestamp}
          </p>
        )}
      </div>
    </motion.div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
function groupByPersona(records) {
  const map = {}
  records.forEach(r => { if (!map[r.personaKey]) map[r.personaKey] = []; map[r.personaKey].push(r) })
  return Object.entries(map)
}

export default function UsabilityTestingTab({ recentAudits, inclusions, onUpdateStatus }) {
  const [activeTab,          setActiveTab]          = useState('needs-testing')
  const [openAuditId,        setOpenAuditId]        = useState(null)   // needs-testing drill-down
  const [openSessionAuditId, setOpenSessionAuditId] = useState(null)   // session records drill-down
  const [debriefTarget,      setDebriefTarget]      = useState(null)
  const [debriefs,           setDebriefs]           = useState([])

  useEffect(() => { setDebriefs(loadDebriefs()) }, [])

  const handleSubmitDebrief = (formData) => {
    const record = { id:`debrief-${Date.now()}`, auditId:debriefTarget.auditId, personaKey:debriefTarget.personaKey, submittedAt:new Date().toISOString(), ...formData }
    const updated = [record, ...debriefs]
    setDebriefs(updated)
    saveDebriefs(updated)
    setDebriefTarget(null)
  }

  // Audits that have included users
  const auditsWithInclusions = recentAudits.map(audit => {
    const records = inclusions.filter(r => r.auditId === audit.id)
    const uniquePersonas = [...new Set(records.map(r => r.personaKey))]
    return { ...audit, records, userCount:uniquePersonas.length }
  }).filter(a => a.userCount > 0)

  // Audits that have debriefs
  const auditsWithDebriefs = recentAudits.map(audit => {
    const auditDebriefs = debriefs.filter(d => d.auditId === audit.id)
    const auditInclusions = inclusions.filter(r => r.auditId === audit.id)
    return { ...audit, auditDebriefs, auditInclusions }
  }).filter(a => a.auditDebriefs.length > 0)

  const openAudit        = auditsWithInclusions.find(a => a.id === openAuditId)
  const openSessionAudit = auditsWithDebriefs.find(a => a.id === openSessionAuditId)

  const tab = (key, label, count) => (
    <button onClick={() => setActiveTab(key)}
      style={{ padding:'8px 18px', background: activeTab===key ? C.s2 : 'transparent', border:`1px solid ${activeTab===key ? C.border : 'transparent'}`, borderRadius:8, fontFamily:F.b, fontWeight:600, fontSize:'0.82rem', color: activeTab===key ? C.t1 : C.t4, cursor:'pointer', display:'flex', alignItems:'center', gap:6, transition:'all 0.12s' }}>
      {label}
      {count > 0 && (
        <span style={{ padding:'1px 6px', background: activeTab===key ? C.amber : 'rgba(255,255,255,0.08)', color: activeTab===key ? C.bg : C.t4, borderRadius:9999, fontFamily:F.b, fontSize:'0.65rem', fontWeight:700 }}>{count}</span>
      )}
    </button>
  )

  const backButton = (label, onClick) => (
    <button onClick={onClick}
      style={{ background:'transparent', border:`1px solid ${C.border}`, borderRadius:8, padding:'8px 16px', color:C.t3, fontFamily:F.b, fontSize:'0.82rem', cursor:'pointer', marginBottom:20, display:'flex', alignItems:'center', gap:6 }}>
      ← {label}
    </button>
  )

  return (
    <div style={{ minHeight:'100vh', background:C.bg, padding:'40px 48px 56px 60px' }}>

      <AnimatePresence>
        {debriefTarget && (
          <DebriefModal target={debriefTarget} onSubmit={handleSubmitDebrief} onDismiss={() => setDebriefTarget(null)}/>
        )}
      </AnimatePresence>

      {/* ── Header (hide in drill-downs) ── */}
      {!openAudit && !openSessionAudit && (
        <>
          <div style={{ marginBottom:24 }}>
            <p style={{ fontFamily:F.b, fontWeight:600, fontSize:'0.72rem', color:C.amber, letterSpacing:'0.16em', textTransform:'uppercase', margin:'0 0 8px' }}>Usability Testing Hub</p>
            <h1 style={{ fontFamily:F.d, fontWeight:900, fontSize:'clamp(1.5rem,3vw,2rem)', color:C.t1, margin:0, letterSpacing:'-0.03em' }}>Your usability testing panel</h1>
          </div>
          <div style={{ display:'flex', gap:8, marginBottom:28, borderBottom:`1px solid ${C.border}`, paddingBottom:16 }}>
            {tab('needs-testing',  'Needs Testing',   auditsWithInclusions.reduce((n,a) => n + a.userCount, 0))}
            {tab('session-records','Session Records',  debriefs.length)}
          </div>
        </>
      )}

      {/* ── NEEDS TESTING — Level 1: audit cards ── */}
      {!openAudit && activeTab === 'needs-testing' && (
        auditsWithInclusions.length === 0 ? (
          <div style={{ padding:'40px 24px', background:C.s1, border:`1px solid ${C.border}`, borderRadius:12, textAlign:'center' }}>
            <p style={{ fontFamily:F.b, fontSize:'0.9rem', color:C.t4 }}>No users added yet. Run an assessment and include users to see them here.</p>
          </div>
        ) : (
          <>
          <p style={{ fontFamily:F.b, fontWeight:600, fontSize:'0.85rem', color:'#9ca3af', marginBottom:16 }}>Click each card to review recruitment tracker</p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:16 }}>
            {auditsWithInclusions.map((audit, i) => (
              <AuditCard key={audit.id} audit={audit} count={audit.userCount}
                countLabel="users included for testing"
                timestamp={`Added ${fmtDate(audit.date)}`}
                onClick={() => setOpenAuditId(audit.id)} index={i}/>
            ))}
          </div>
          </>
        )
      )}

      {/* ── NEEDS TESTING — Level 2: tracker ── */}
      {openAudit && (
        <div>
          {backButton('All audits', () => setOpenAuditId(null))}
          <div style={{ marginBottom:20 }}>
            <p style={{ fontFamily:F.b, fontWeight:600, fontSize:'0.72rem', color:C.amber, letterSpacing:'0.16em', textTransform:'uppercase', margin:'0 0 6px' }}>GOV.UK · Apply for Universal Credit</p>
            <h1 style={{ fontFamily:F.d, fontWeight:900, fontSize:'clamp(1.3rem,2.5vw,1.8rem)', color:C.t1, margin:'0 0 10px', letterSpacing:'-0.02em' }}>
              Usability testing tracker
            </h1>
            <p style={{ fontFamily:F.b, fontSize:'0.8rem', color:C.t3, lineHeight:1.65, margin:'0 0 16px', maxWidth:640 }}>
              Below are the user groups for each exclusion identified, the step exclusion occurs for them, the point of contact for their recruitment, and a status to track the progress of this recruitment and testing.
            </p>
            <div style={{ display:'flex', gap:12, alignItems:'center', flexWrap:'wrap' }}>
              <span style={{ fontFamily:F.b, fontWeight:600, fontSize:'0.62rem', color:C.t4, textTransform:'uppercase', letterSpacing:'0.08em' }}>Steps:</span>
              {[['S1','Create an account'],['S2','Verify your identity'],['S3','Complete your to-do list'],['S4','Submit your claim']].map(([s,l]) => (
                <div key={s} style={{ display:'flex', alignItems:'center', gap:5 }}>
                  <span style={{ fontFamily:F.b, fontWeight:700, fontSize:'0.65rem', color:C.amber }}>{s}</span>
                  <span style={{ fontFamily:F.b, fontSize:'0.65rem', color:C.t4 }}>= {l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div style={{ display:'flex', gap:12, alignItems:'center', marginBottom:20, padding:'10px 14px', background:C.s1, border:`1px solid ${C.border}`, borderRadius:9, flexWrap:'wrap' }}>
            <span style={{ fontFamily:F.b, fontWeight:600, fontSize:'0.62rem', color:C.t4, textTransform:'uppercase', letterSpacing:'0.08em' }}>Exclusion steps key:</span>
            {[['#ef4444','Hard stop'],['#f59e0b','Friction'],['#60a5fa','Workaround']].map(([c,l]) => (
              <div key={l} style={{ display:'flex', alignItems:'center', gap:5 }}>
                <div style={{ width:8, height:8, borderRadius:2, background:c }}/>
                <span style={{ fontFamily:F.b, fontSize:'0.72rem', color:C.t3 }}>{l}</span>
              </div>
            ))}
          </div>

          {/* Table header */}
          <div style={{ display:'grid', gridTemplateColumns:'2.4fr 1.2fr 2fr 1.6fr', gap:16, padding:'0 16px 10px', borderBottom:`1px solid ${C.border}`, marginBottom:6 }}>
            {['User','Exclusion Steps','Point of contact','Status'].map(h => (
              <p key={h} style={{ fontFamily:F.b, fontWeight:600, fontSize:'0.65rem', color:C.t4, letterSpacing:'0.1em', textTransform:'uppercase', margin:0 }}>{h}</p>
            ))}
          </div>

          {groupByPersona(openAudit.records).map(([personaKey, recs], i) => {
            const existingDebriefs = debriefs.filter(d => d.auditId === openAudit.id && d.personaKey === personaKey)
            return (
              <TrackerRow key={personaKey} personaKey={personaKey} recs={recs} index={i}
                auditId={openAudit.id} onUpdateStatus={onUpdateStatus}
                onTriggerDebrief={setDebriefTarget} existingDebriefs={existingDebriefs}/>
            )
          })}
        </div>
      )}

      {/* ── SESSION RECORDS — Level 1: audit cards ── */}
      {!openAudit && !openSessionAudit && activeTab === 'session-records' && (
        auditsWithDebriefs.length === 0 ? (
          <div style={{ padding:'40px 24px', background:C.s1, border:`1px solid ${C.border}`, borderRadius:12, textAlign:'center' }}>
            <p style={{ fontFamily:F.b, fontSize:'0.9rem', color:C.t4, marginBottom:6 }}>No session records yet.</p>
            <p style={{ fontFamily:F.b, fontSize:'0.8rem', color:C.t4, margin:0 }}>When you mark a session as "Usability testing held" and submit debrief notes, the record will appear here.</p>
          </div>
        ) : (
          <>
          <p style={{ fontFamily:F.b, fontWeight:600, fontSize:'0.85rem', color:'#9ca3af', marginBottom:16 }}>Click each card to review testing results</p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:16 }}>
            {auditsWithDebriefs.map((audit, i) => {
              const lastSession = audit.auditDebriefs.sort((a,b) => new Date(b.submittedAt)-new Date(a.submittedAt))[0]
              return (
                <AuditCard key={audit.id} audit={audit}
                  count={audit.auditDebriefs.length}
                  countLabel={`session${audit.auditDebriefs.length !== 1 ? 's' : ''} recorded`}
                  timestamp={lastSession ? `Last session ${fmtDate(lastSession.sessionDate)}` : ''}
                  onClick={() => setOpenSessionAuditId(audit.id)} index={i}/>
              )
            })}
          </div>
          </>
        )
      )}

      {/* ── SESSION RECORDS — Level 2: grouped by persona ── */}
      {openSessionAudit && (
        <div>
          {backButton('All session records', () => setOpenSessionAuditId(null))}
          <div style={{ marginBottom:24 }}>
            <p style={{ fontFamily:F.b, fontWeight:600, fontSize:'0.72rem', color:C.amber, letterSpacing:'0.16em', textTransform:'uppercase', margin:'0 0 6px' }}>{openSessionAudit.platform}</p>
            <h1 style={{ fontFamily:F.d, fontWeight:900, fontSize:'clamp(1.3rem,2.5vw,1.8rem)', color:C.t1, margin:0, letterSpacing:'-0.02em' }}>
              {openSessionAudit.task} — session records
            </h1>
          </div>

          {groupByPersona(openSessionAudit.auditDebriefs).map(([personaKey, personaDebriefs]) => {
            const char = CHARACTERS[personaKey]
            const personaRecs = openSessionAudit.auditInclusions.filter(r => r.personaKey === personaKey)
            return (
              <div key={personaKey} style={{ marginBottom:28 }}>
                {/* Persona group header */}
                <div style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 16px', background:C.s1, border:`1px solid ${C.border}`, borderRadius:10, marginBottom:10 }}>
                  <div style={{ width:34, height:50, flexShrink:0 }}>
                    <img src={char?.image} alt={char?.name} style={{ width:'100%', height:'100%', objectFit:'contain', objectPosition:'bottom' }}/>
                  </div>
                  <div>
                    <p style={{ fontFamily:F.d, fontWeight:800, fontSize:'0.9rem', color:C.t1, margin:'0 0 2px' }}>{char?.name}</p>
                    <p style={{ fontFamily:F.b, fontSize:'0.72rem', color:C.t4, margin:0 }}>
                      {personaDebriefs.length} session{personaDebriefs.length !== 1 ? 's' : ''} recorded
                    </p>
                  </div>
                </div>

                {/* Session cards for this persona */}
                {personaDebriefs.sort((a,b) => new Date(b.submittedAt)-new Date(a.submittedAt)).map(d => (
                  <SessionCard key={d.id} debrief={d} personaRecs={personaRecs}/>
                ))}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
