// ExclusionOverlay — compact layout with represents text in a framed card.
// All personas sit on one row regardless of count.
// Avatar size scales down to fit 3-4 personas comfortably side by side.

import { motion } from 'framer-motion'
import { CHARACTERS } from '../data/characters'

const F = { d:"'Syne',sans-serif", b:"'DM Sans',sans-serif" }

function PulsingWarning() {
  return (
    <motion.div
      animate={{ boxShadow:['0 0 0 0 rgba(245,158,11,0)','0 0 0 14px rgba(245,158,11,0.28)','0 0 0 0 rgba(245,158,11,0)'] }}
      transition={{ duration:2, repeat:Infinity }}
      style={{ width:48, height:48, borderRadius:'50%', background:'rgba(245,158,11,0.15)', border:'2px solid rgba(245,158,11,0.5)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 12px' }}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    </motion.div>
  )
}

export default function ExclusionOverlay({ stepData, onReview, onSkip }) {
  const keys = [...new Set(stepData.flags.map(f => f.personaKey))]
  const personas = keys.map(k => CHARACTERS[k]).filter(Boolean)
  const count = personas.length

  // Avatar dimensions scale with persona count so all fit on one row
  const avatarH = count <= 2 ? 'clamp(200px,34vh,360px)' : count === 3 ? 'clamp(160px,26vh,260px)' : 'clamp(130px,20vh,210px)'
  const avatarW = count <= 2 ? 'clamp(120px,14vw,180px)' : count === 3 ? 'clamp(100px,11vw,150px)' : 'clamp(85px,9vw,125px)'
  const nameSize = count <= 2 ? 'clamp(1rem,1.8vw,1.35rem)' : 'clamp(0.9rem,1.4vw,1.1rem)'
  const STAGGER = count <= 2 ? 0.38 : 0.22
  const CTA_DELAY = 0.6 + count * STAGGER + 0.2

  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.3 }}
      style={{
        position:'fixed', inset:0, zIndex:80,
        background:'rgba(3,5,12,0.94)',
        display:'flex', flexDirection:'column', alignItems:'center',
        overflowY:'auto',
        padding:'clamp(16px,4vh,32px) 24px clamp(20px,4vh,36px)',
        gap:16,
      }}>

      {/* Warning banner */}
      <motion.div initial={{ y:-40, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ delay:0.1, duration:0.4, ease:[0.16,1,0.3,1] }}
        style={{ background:'#16213a', border:'1px solid rgba(255,255,255,0.1)', borderRadius:14, padding:'16px 28px', textAlign:'center', boxShadow:'0 10px 32px rgba(0,0,0,0.7)', maxWidth:320, width:'90%', flexShrink:0 }}>
        <PulsingWarning />
        <p style={{ fontFamily:F.d, fontWeight:900, fontSize:'clamp(1rem,2vw,1.25rem)', color:'#ffffff', margin:'0 0 4px' }}>Possible exclusion detected</p>
        <p style={{ fontFamily:F.b, fontSize:'0.84rem', color:'#9ca3af', margin:0 }}>
          {keys.length} user {keys.length === 1 ? 'group' : 'groups'} could be excluded at this step.
        </p>
      </motion.div>

      {/* Personas — all on one row, equal height columns */}
      <div style={{ display:'flex', gap:'clamp(12px,2.5vw,32px)', alignItems:'stretch', justifyContent:'center', flexWrap:'nowrap', width:'100%', maxWidth:960 }}>
        {personas.map((p, i) => (
          <motion.div key={p.name}
            initial={{ opacity:0, y:50, scale:0.92 }}
            animate={{ opacity:1, y:0, scale:1 }}
            transition={{ delay:0.5 + i * STAGGER, duration:0.6, ease:[0.16,1,0.3,1] }}
            style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8, flex:1, maxWidth:avatarW, minWidth:0 }}>

            {/* Avatar — fixed height, image bottom-aligned */}
            <div style={{ width:'100%', height:avatarH, flexShrink:0 }}>
              <img src={p.image} alt={p.name}
                style={{ width:'100%', height:'100%', objectFit:'contain', objectPosition:'bottom center' }} />
            </div>

            {/* Name */}
            <p style={{ fontFamily:F.d, fontWeight:900, fontSize:nameSize, color:'#ffffff', margin:0, textAlign:'center', flexShrink:0 }}>
              {p.name}
            </p>

            {/* Represents — flex:1 so all cards stretch to equal height, text top-aligned */}
            <div style={{
              flex:1, width:'100%', padding:'7px 10px',
              background:'rgba(245,158,11,0.08)', border:'1px solid rgba(245,158,11,0.22)',
              borderRadius:8, textAlign:'center',
              display:'flex', alignItems:'flex-start', justifyContent:'center',
            }}>
              <p style={{ fontFamily:F.b, fontWeight:500, fontSize:'0.7rem', color:'#f59e0b', lineHeight:1.45, margin:0 }}>
                Represents {p.represents?.short || p.persona}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTAs */}
      <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:CTA_DELAY }}
        style={{ display:'flex', flexDirection:'column', gap:10, width:'90%', maxWidth:340, flexShrink:0 }}>
        <motion.button onClick={onReview}
          whileHover={{ backgroundColor:'#fbbf24', scale:1.02 }} whileTap={{ scale:0.97 }}
          className="pulse-btn"
          style={{ padding:'14px 20px', background:'#f59e0b', color:'#0f172a', border:'none', borderRadius:9999, fontFamily:F.d, fontWeight:700, fontSize:'0.95rem', letterSpacing:'0.04em', textTransform:'uppercase', cursor:'pointer' }}>
          Review exclusion data
        </motion.button>
        <motion.button onClick={onSkip}
          whileHover={{ background:'rgba(255,255,255,0.06)' }} whileTap={{ scale:0.97 }}
          style={{ padding:'12px 20px', background:'transparent', color:'#9ca3af', border:'1px solid rgba(255,255,255,0.15)', borderRadius:9999, fontFamily:F.b, fontWeight:600, fontSize:'0.9rem', cursor:'pointer' }}>
          Skip and proceed
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
