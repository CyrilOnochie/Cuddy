// ReportScreen.jsx
// H1 updated: "These are the users that should be included in your usability test"
// "Run another audit" → goes to platform select (not landing)

import { motion } from 'framer-motion'
import { REPORT } from '../data/reportData'

const F = { d:"'Syne',sans-serif", b:"'DM Sans',sans-serif" }

const SC = {
  'clean':       { bg:'rgba(74,222,128,0.08)',  border:'rgba(74,222,128,0.3)',  text:'#4ade80',  icon:'✓' },
  'friction':    { bg:'rgba(245,158,11,0.08)',  border:'rgba(245,158,11,0.3)',  text:'#f59e0b',  icon:'⚠' },
  'hard-stop':   { bg:'rgba(239,68,68,0.08)',   border:'rgba(239,68,68,0.3)',   text:'#ef4444',  icon:'✕' },
  'workaround':  { bg:'rgba(96,165,250,0.08)',  border:'rgba(96,165,250,0.3)',  text:'#60a5fa',  icon:'↗' },
  'not-reached': { bg:'rgba(255,255,255,0.03)', border:'rgba(255,255,255,0.08)', text:'#4b5563',  icon:'—' },
}
const FS = {
  hard:       { border:'#ef4444', bg:'rgba(239,68,68,0.08)',  accent:'#ef4444', label:'HARD STOP',         sub:'this could end the journey here' },
  soft:       { border:'#f59e0b', bg:'rgba(245,158,11,0.08)', accent:'#f59e0b', label:'FRICTION',           sub:'slows them down, may cause drop-off' },
  workaround: { border:'#60a5fa', bg:'rgba(96,165,250,0.08)', accent:'#60a5fa', label:'WORKAROUND EXISTS',  sub:'a fallback route exists — but may not reach this person' },
}

function StepSquare({ status }) {
  const s = SC[status] || SC['not-reached']
  return (
    <div style={{ width:36, height:36, borderRadius:8, background:s.bg, border:`1.5px solid ${s.border}`, display:'flex', alignItems:'center', justifyContent:'center' }}>
      <span style={{ fontFamily:F.b, fontSize:'0.75rem', fontWeight:700, color:s.text }}>{s.icon}</span>
    </div>
  )
}

export default function ReportScreen({ onRunAnother, onViewHub }) {
  // onRunAnother goes to platform-select, not landing

  return (
    <div style={{ background:'#0f172a', minHeight:'100vh' }}>
      {/* Sticky header */}
      <div style={{ background:'rgba(15,23,42,0.96)', borderBottom:'1px solid rgba(255,255,255,0.06)', padding:'14px 32px', display:'flex', alignItems:'center', justifyContent:'space-between', position:'sticky', top:0, zIndex:50, backdropFilter:'blur(8px)' }}>
        <p style={{ fontFamily:F.d, fontWeight:700, fontSize:'0.82rem', color:'#f59e0b', letterSpacing:'0.1em', textTransform:'uppercase', margin:0 }}>Digital Exclusion Audit</p>
        <p style={{ fontFamily:F.b, fontSize:'0.78rem', color:'#6b7280', margin:0 }}>{REPORT.platform} · {REPORT.task}</p>
      </div>

      <div style={{ maxWidth:920, margin:'0 auto', padding:'48px 32px 80px' }}>
        {/* Report heading — updated H1 */}
        <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'5px 12px', background:'rgba(74,222,128,0.1)', border:'1px solid rgba(74,222,128,0.3)', borderRadius:9999, marginBottom:18 }}>
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M2 6L4.5 8.5L10 3" stroke="#4ade80" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span style={{ fontFamily:F.b, fontWeight:600, fontSize:'0.75rem', color:'#4ade80' }}>Audit complete — {REPORT.stepsReviewed} steps reviewed · {REPORT.exclusionPoints} exclusion points</span>
          </div>
          <h1 style={{ fontFamily:F.d, fontWeight:900, fontSize:'clamp(1.8rem,4vw,2.8rem)', color:'#ffffff', margin:'0 0 12px', letterSpacing:'-0.02em', lineHeight:1.2 }}>
            Here is your recruitment brief.
          </h1>
          <p style={{ fontFamily:F.b, fontSize:'1rem', color:'#9ca3af', margin:'0 0 36px', lineHeight:1.65 }}>
            The assessment identified user groups who may encounter barriers across the Universal Credit application. The profiles below form a recruitment brief for targeted usability testing.
          </p>
        </motion.div>

        {/* Legend */}
        <div style={{ display:'flex', gap:16, flexWrap:'wrap', padding:'12px 16px', background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:10, marginBottom:32 }}>
          {[['clean','✓','Clean'],['friction','⚠','Friction'],['hard-stop','✕','Hard stop'],['workaround','↗','Workaround'],['not-reached','—','Not reached']].map(([k,icon,label]) => (
            <div key={k} style={{ display:'flex', alignItems:'center', gap:6 }}>
              <div style={{ width:9, height:9, borderRadius:'50%', background:SC[k].text, opacity:k==='not-reached'?0.3:1 }} />
              <span style={{ fontFamily:F.b, fontSize:'0.75rem', color:'#6b7280' }}>{label}</span>
            </div>
          ))}
        </div>

        {/* Step key */}
        <div style={{ display:'flex', gap:14, alignItems:'center', marginBottom:32, flexWrap:'wrap' }}>
          <span style={{ fontFamily:F.b, fontWeight:600, fontSize:'0.65rem', color:'#4b5563', textTransform:'uppercase', letterSpacing:'0.08em' }}>Steps:</span>
          {[['S1','Create an account'],['S2','Verify your identity'],['S3','Complete your to-do list'],['S4','Submit your claim']].map(([s,l]) => (
            <div key={s} style={{ display:'flex', alignItems:'center', gap:5 }}>
              <span style={{ fontFamily:F.b, fontWeight:700, fontSize:'0.7rem', color:'#f59e0b' }}>{s}</span>
              <span style={{ fontFamily:F.b, fontSize:'0.7rem', color:'#6b7280' }}>= {l}</span>
            </div>
          ))}
        </div>

        {/* Persona cards */}
        <div style={{ display:'flex', flexDirection:'column', gap:24 }}>
          {REPORT.personas.map((p, pi) => (
            <motion.div key={p.key} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:pi*0.08 }}
              style={{ background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:20, overflow:'hidden' }}>

              {/* Card header */}
              <div style={{ display:'flex', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ flexShrink:0, width:110, background:'rgba(255,255,255,0.03)', borderRight:'1px solid rgba(255,255,255,0.06)', display:'flex', alignItems:'flex-end', justifyContent:'center', overflow:'hidden', padding:'0 8px' }}>
                  <img src={p.image} alt={p.name} style={{ width:'100%', height:160, objectFit:'contain', objectPosition:'bottom' }} />
                </div>
                <div style={{ flex:1, padding:'20px' }}>
                  <p style={{ fontFamily:F.d, fontWeight:900, fontSize:'1.35rem', color:'#ffffff', margin:'0 0 2px' }}>{p.name}</p>
                  <p style={{ fontFamily:F.b, fontWeight:600, fontSize:'0.85rem', color:'#f59e0b', margin:'0 0 14px' }}>{p.age} · {p.persona}</p>
                  <div style={{ display:'flex', gap:8, alignItems:'center', flexWrap:'wrap' }}>
                    {p.stepOutcomes.map(o => (
                      <div key={o.step} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
                        <StepSquare status={o.status} />
                        <span style={{ fontFamily:F.b, fontSize:'0.58rem', color:'#4b5563' }}>S{o.step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Flag items */}
              <div style={{ padding:'16px 20px', borderBottom:'1px solid rgba(255,255,255,0.06)', display:'flex', flexDirection:'column', gap:10 }}>
                <p style={{ fontFamily:F.b, fontWeight:600, fontSize:'0.68rem', color:'#6b7280', letterSpacing:'0.12em', textTransform:'uppercase', margin:'0 0 4px' }}>Exclusion points</p>
                {p.flags.map((f, fi) => {
                  const s = FS[f.severity]
                  return (
                    <div key={fi} style={{ borderLeft:`3px solid ${s.border}`, background:s.bg, padding:'10px 12px', borderRadius:'0 8px 8px 0', border:`1px solid ${s.border}33`, borderLeft:`3px solid ${s.border}` }}>
                      <div style={{ display:'flex', alignItems:'baseline', gap:6, marginBottom:4, flexWrap:'wrap' }}>
                        <span style={{ fontFamily:F.d, fontWeight:700, fontSize:'0.66rem', color:s.accent, letterSpacing:'0.08em' }}>S{f.step} · {s.label}</span>
                        <span style={{ fontFamily:F.b, fontSize:'0.68rem', color:'#6b7280' }}>— {s.sub}</span>
                      </div>
                      <p style={{ fontFamily:F.b, fontWeight:600, fontSize:'0.85rem', color:'#e5e7eb', margin:'0 0 3px' }}>{f.label}</p>
                      <p style={{ fontFamily:F.b, fontSize:'0.8rem', color:'#9ca3af', margin:0, lineHeight:1.5 }}>{f.detail}</p>
                    </div>
                  )
                })}
              </div>

              {/* Why include them */}
              <div style={{ padding:'14px 20px', borderBottom:'1px solid rgba(255,255,255,0.06)', background:'rgba(245,158,11,0.03)' }}>
                <p style={{ fontFamily:F.b, fontWeight:700, fontSize:'0.68rem', color:'#f59e0b', letterSpacing:'0.1em', textTransform:'uppercase', margin:'0 0 5px' }}>Why include users like {p.name} in usability testing</p>
                <p style={{ fontFamily:F.b, fontSize:'0.85rem', color:'#9ca3af', margin:0, lineHeight:1.6 }}>{p.whyInclude}</p>
              </div>

              {/* Population */}
              <div style={{ padding:'14px 20px', borderBottom:'1px solid rgba(255,255,255,0.06)', background:'rgba(245,158,11,0.04)' }}>
                <p style={{ fontFamily:F.b, fontWeight:700, fontSize:'0.68rem', color:'#f59e0b', letterSpacing:'0.1em', textTransform:'uppercase', margin:'0 0 4px' }}>Who {p.name} represents</p>
                <p style={{ fontFamily:F.b, fontWeight:600, fontSize:'0.88rem', color:'#e5e7eb', margin:'0 0 2px', lineHeight:1.5 }}>{p.population.stat}</p>
                <p style={{ fontFamily:F.b, fontSize:'0.72rem', color:'#6b7280', margin:0, fontStyle:'italic' }}>{p.population.source}</p>
              </div>

              {/* Recruitment */}
              <div style={{ padding:'14px 20px' }}>
                <p style={{ fontFamily:F.b, fontWeight:600, fontSize:'0.68rem', color:'#6b7280', letterSpacing:'0.12em', textTransform:'uppercase', margin:'0 0 6px' }}>How to reach people like {p.name}</p>
                <p style={{ fontFamily:F.b, fontSize:'0.85rem', color:'#9ca3af', margin:'0 0 10px', lineHeight:1.55 }}>{p.recruitment.summary}</p>
                {p.recruitment.contacts.map((c, ci) => (
                  <div key={ci} style={{ display:'flex', gap:8, alignItems:'flex-start', marginBottom:6 }}>
                    <span style={{ color:'#f59e0b', fontWeight:700, flexShrink:0, fontFamily:F.b }}>→</span>
                    <div>
                      <p style={{ fontFamily:F.d, fontWeight:700, fontSize:'0.83rem', color:'#ffffff', margin:'0 0 1px' }}>{c.org}</p>
                      <p style={{ fontFamily:F.b, fontSize:'0.78rem', color:'#6b7280', margin:0 }}>{c.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Final CTA */}
        <div style={{ marginTop:44, padding:'28px 32px', background:'rgba(245,158,11,0.05)', border:'1px solid rgba(245,158,11,0.2)', borderRadius:16 }}>
          <p style={{ fontFamily:F.d, fontWeight:900, fontSize:'1.35rem', color:'#ffffff', margin:'0 0 10px' }}>
            All user groups have been added to your usability testing hub.
          </p>
          <p style={{ fontFamily:F.b, fontSize:'0.95rem', color:'#9ca3af', margin:'0 0 20px', lineHeight:1.6 }}>
            The contacts above are real organisations working with these communities. Each can help you recruit participants to test, validate and fix these possible exclusions.
          </p>
          <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
            <motion.button onClick={onViewHub}
              whileHover={{ background:'#fbbf24' }} whileTap={{ scale:0.97 }}
              className="pulse-btn"
              style={{ padding:'13px 28px', background:'#f59e0b', color:'#0f172a', border:'none', borderRadius:9999, fontFamily:F.d, fontWeight:700, fontSize:'0.88rem', cursor:'pointer', letterSpacing:'0.02em', textTransform:'uppercase' }}>
              View usability testing hub
            </motion.button>
            <motion.button onClick={onRunAnother}
              whileHover={{ background:'rgba(255,255,255,0.08)', borderColor:'rgba(255,255,255,0.2)' }} whileTap={{ scale:0.97 }}
              style={{ padding:'13px 28px', background:'transparent', color:'#9ca3af', border:'1px solid rgba(255,255,255,0.12)', borderRadius:9999, fontFamily:F.d, fontWeight:700, fontSize:'0.88rem', cursor:'pointer', letterSpacing:'0.02em', textTransform:'uppercase' }}>
              Run another audit →
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  )
}
