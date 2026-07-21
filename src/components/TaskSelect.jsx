// TaskSelect — same card grid pattern as PlatformSelect.
// Universal Credit is live with verified stat. Other GOV.UK tasks shown as
// "In development" cards — no fabricated statistics, since only UC is sourced.

import { motion } from 'framer-motion'
import ParticleCanvas from './ParticleCanvas'

const F = { d:"'Syne',sans-serif", b:"'DM Sans',sans-serif" }

function CrownIcon() {
  return <svg width="34" height="27" viewBox="0 0 104 80" fill="white"><path d="M52 4 L36 32 L12 18 L18 46 L86 46 L92 18 L68 32 Z"/><rect x="14" y="50" width="76" height="10" rx="2"/><rect x="10" y="64" width="84" height="16" rx="3"/></svg>
}
function NhsIcon() {
  return <svg width="32" height="32" viewBox="0 0 60 60" fill="white"><rect x="20" y="0" width="20" height="60" rx="3"/><rect x="0" y="20" width="60" height="20" rx="3"/></svg>
}
function PassportTaskIcon() {
  return <svg width="34" height="34" viewBox="0 0 60 60" fill="none"><rect x="10" y="6" width="40" height="48" rx="4" fill="none" stroke="white" strokeWidth="3"/><circle cx="30" cy="24" r="8" stroke="white" strokeWidth="2.5" fill="none"/><line x1="18" y1="40" x2="42" y2="40" stroke="white" strokeWidth="2.5" strokeLinecap="round"/><line x1="18" y1="46" x2="36" y2="46" stroke="white" strokeWidth="2.5" strokeLinecap="round"/></svg>
}
function ChecklistIcon() {
  return <svg width="34" height="34" viewBox="0 0 60 60" fill="none"><rect x="8" y="6" width="44" height="48" rx="4" fill="none" stroke="white" strokeWidth="3"/><path d="M16 20 L20 24 L28 14" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/><line x1="34" y1="20" x2="46" y2="20" stroke="white" strokeWidth="2.5" strokeLinecap="round"/><path d="M16 36 L20 40 L28 30" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/><line x1="34" y1="36" x2="46" y2="36" stroke="white" strokeWidth="2.5" strokeLinecap="round"/></svg>
}
function VoteIcon() {
  return <svg width="34" height="34" viewBox="0 0 60 60" fill="none"><rect x="10" y="22" width="40" height="30" rx="3" fill="none" stroke="white" strokeWidth="3"/><path d="M10 26 L30 40 L50 26" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/><rect x="24" y="6" width="12" height="18" rx="2" fill="white"/></svg>
}

const TASKS = {
  govuk: {
    platformName: 'GOV.UK', headerBg: '#0b0c0c', accent: '#00703c',
    items: [
      {
        key: 'universal-credit', Icon: CrownIcon, name: 'Apply for Universal Credit',
        live: true,
        stat: '8.0 million', statCaption: 'people were claiming Universal Credit in the UK as of July 2025 — the highest level since the benefit began in 2013',
        source: 'DWP official statistics, reported July 2025',
      },
      {
        key: 'passport', Icon: PassportTaskIcon, name: 'Renew a passport',
        live: false,
        description: 'Audit the GOV.UK passport renewal journey for digital exclusion barriers.',
      },
      {
        key: 'benefits-check', Icon: ChecklistIcon, name: 'Check benefits entitlement',
        live: false,
        description: 'Audit the benefits calculator and entitlement-checking journey.',
      },
      {
        key: 'register-vote', Icon: VoteIcon, name: 'Register to vote',
        live: false,
        description: 'Audit the electoral register sign-up process for digital exclusion barriers.',
      },
    ],
  },
  nhs: {
    platformName: 'NHS App', headerBg: '#003087', accent: '#005EB8',
    items: [
      {
        key: 'register-gp', Icon: NhsIcon, name: 'Register with a GP',
        live: true,
        stat: '60.7 million', statCaption: 'patients are registered with a GP practice in England — close to the entire population',
        source: 'NHS Digital, comparison with ONS Census 2021',
      },
    ],
  },
}

export default function TaskSelect({ platform, onSelectTask }) {
  const data = TASKS[platform] || TASKS.govuk

  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'80px 24px 48px', backgroundColor:'#0f172a', position:'relative', overflow:'hidden' }}>
      <ParticleCanvas />
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 20%, #0f172a 95%)', pointerEvents:'none', zIndex:1 }} />

      <div style={{ position:'relative', zIndex:2, maxWidth:1060, width:'100%' }}>
        <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }}
          style={{ fontFamily:F.b, fontWeight:600, fontSize:'0.78rem', color:'#f59e0b', letterSpacing:'0.2em', textTransform:'uppercase', textAlign:'center', marginBottom:12 }}>
          {data.platformName}
        </motion.p>
        <motion.h1 initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}
          style={{ fontFamily:F.d, fontWeight:900, fontSize:'clamp(1.8rem,4.5vw,3rem)', color:'#ffffff', letterSpacing:'-0.02em', textAlign:'center', marginBottom:8 }}>
          Select a task
        </motion.h1>
        <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.2 }}
          style={{ fontFamily:F.b, fontSize:'1rem', color:'#6b7280', textAlign:'center', marginBottom:40 }}>
          Live audits are available now. More tasks are in development.
        </motion.p>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))', gap:'clamp(12px,2.5vw,20px)' }}>
          {data.items.map((item, i) => {
            const Icon = item.Icon
            return (
              <motion.div key={item.key}
                initial={{ opacity:0, y:20 }}
                animate={{ opacity:1, y:0 }}
                transition={{ delay:0.25 + i * 0.08 }}
                onClick={() => item.live && onSelectTask()}
                whileHover={item.live ? { y:-5, boxShadow:`0 12px 36px rgba(245,158,11,0.2), 0 0 0 1.5px #f59e0b` } : {}}
                style={{
                  background:'#0f172a', borderRadius:18, overflow:'hidden',
                  cursor: item.live ? 'pointer' : 'default',
                  opacity: item.live ? 1 : 0.55,
                  boxShadow:'0 2px 8px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.07)',
                }}>

                {/* Header */}
                <div style={{ background:data.headerBg, padding:'20px 22px 18px', position:'relative' }}>
                  {item.live ? (
                    <div style={{ position:'absolute', top:14, right:14, display:'inline-flex', alignItems:'center', gap:5, padding:'4px 10px', background:'rgba(74,222,128,0.12)', border:'1px solid rgba(74,222,128,0.3)', borderRadius:9999 }}>
                      <div style={{ width:5, height:5, borderRadius:'50%', background:'#4ade80', flexShrink:0 }} />
                      <span style={{ fontFamily:F.b, fontWeight:700, fontSize:'0.65rem', color:'#4ade80', letterSpacing:'0.08em', textTransform:'uppercase' }}>Live</span>
                    </div>
                  ) : (
                    <div style={{ position:'absolute', top:14, right:14, display:'inline-flex', alignItems:'center', padding:'4px 10px', background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:9999 }}>
                      <span style={{ fontFamily:F.b, fontWeight:700, fontSize:'0.62rem', color:'#6b7280', letterSpacing:'0.08em', textTransform:'uppercase' }}>In development</span>
                    </div>
                  )}
                  <div style={{ marginBottom:10, paddingRight:110 }}><Icon /></div>
                  <p style={{ fontFamily:F.d, fontWeight:900, fontSize:'clamp(1.1rem,2.2vw,1.4rem)', color:'#ffffff', margin:0, lineHeight:1.15 }}>{item.name}</p>
                </div>

                {/* Body */}
                <div style={{ padding:'18px 22px 20px' }}>
                  {item.live ? (
                    <>
                      <div style={{ borderRadius:12, border:`1px solid ${data.accent}44`, background:`${data.accent}0e`, padding:'14px 16px', marginBottom:14 }}>
                        <p style={{ fontFamily:F.d, fontWeight:900, fontSize:'clamp(1.4rem,3vw,1.8rem)', color:data.accent, margin:'0 0 4px', lineHeight:1 }}>{item.stat}</p>
                        <p style={{ fontFamily:F.b, fontSize:'0.8rem', color:'#d1d5db', margin:'0 0 5px', lineHeight:1.5 }}>{item.statCaption}</p>
                        <p style={{ fontFamily:F.b, fontSize:'0.68rem', color:'#6b7280', margin:0, fontStyle:'italic' }}>{item.source}</p>
                      </div>
                      <p style={{ fontFamily:F.d, fontWeight:700, fontSize:'0.82rem', letterSpacing:'0.06em', textTransform:'uppercase', color:'#4b5563', margin:0 }}>
                        Begin audit →
                      </p>
                    </>
                  ) : (
                    <p style={{ fontFamily:F.b, fontSize:'0.85rem', color:'#4b5563', lineHeight:1.55, margin:0 }}>{item.description}</p>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
