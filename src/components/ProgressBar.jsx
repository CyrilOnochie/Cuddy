import { motion } from 'framer-motion'
const F = { d:"'Syne',sans-serif", b:"'DM Sans',sans-serif" }
const LABELS = ['Create account','Verify identity','Complete to-do list','Submit & claim']
export default function ProgressBar({ currentStep, completedSteps }) {
  return (
    <div style={{ position:'sticky', top:0, zIndex:50, background:'rgba(15,23,42,0.96)', backdropFilter:'blur(10px)', borderBottom:'1px solid rgba(255,255,255,0.06)', padding:'0 24px' }}>
      <div style={{ maxWidth:700, margin:'0 auto', display:'flex', alignItems:'center', height:64 }}>
        {LABELS.map((label, i) => {
          const done = completedSteps.has(i)
          const active = i === currentStep && !done
          return (
            <div key={i} style={{ display:'flex', alignItems:'center', flex: i < LABELS.length-1 ? 1 : 'none' }}>
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4, flexShrink:0 }}>
                <motion.div animate={{ background: done ? '#4ade80' : active ? '#f59e0b' : 'rgba(255,255,255,0.06)', borderColor: done ? '#4ade80' : active ? '#f59e0b' : 'rgba(255,255,255,0.15)', boxShadow: active ? '0 0 14px rgba(245,158,11,0.45)' : 'none' }}
                  style={{ width:28, height:28, borderRadius:'50%', border:'2px solid', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  {done ? <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6L4.5 8.5L10 3" stroke="#0f172a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    : <span style={{ fontFamily:F.b, fontWeight:600, fontSize:'0.68rem', color: active ? '#0f172a' : '#6b7280' }}>{i+1}</span>}
                </motion.div>
                <span style={{ fontFamily:F.b, fontSize:'0.6rem', fontWeight: active ? 600 : 400, color: done ? '#4ade80' : active ? '#f59e0b' : '#4b5563', whiteSpace:'nowrap' }}>{label}</span>
              </div>
              {i < LABELS.length-1 && (
                <div style={{ flex:1, height:2, margin:'0 6px', marginBottom:18, position:'relative', background:'rgba(255,255,255,0.06)', overflow:'hidden' }}>
                  <motion.div animate={{ scaleX: done ? 1 : 0 }} transition={{ duration:0.65, ease:[0.16,1,0.3,1] }} style={{ position:'absolute', inset:0, background:'#4ade80', transformOrigin:'left' }} />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
