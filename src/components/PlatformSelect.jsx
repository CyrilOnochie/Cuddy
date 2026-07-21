// PlatformSelect — grid of platforms in the same card style as the original.
// Coloured header with icon + name. Navy lower section with common tasks.
// IN DEVELOPMENT badge at top-right of header for non-live cards.

import { motion } from 'framer-motion'
import ParticleCanvas from './ParticleCanvas'

const F = { d:"'Syne',sans-serif", b:"'DM Sans',sans-serif" }

function CrownIcon() {
  return <svg width="44" height="34" viewBox="0 0 104 80" fill="white"><path d="M52 4 L36 32 L12 18 L18 46 L86 46 L92 18 L68 32 Z"/><rect x="14" y="50" width="76" height="10" rx="2"/><rect x="10" y="64" width="84" height="16" rx="3"/></svg>
}
function NhsIcon() {
  return <svg width="40" height="40" viewBox="0 0 60 60" fill="white"><rect x="20" y="0" width="20" height="60" rx="3"/><rect x="0" y="20" width="60" height="20" rx="3"/></svg>
}
function TaxIcon() {
  return <svg width="40" height="40" viewBox="0 0 60 60" fill="none"><rect x="8" y="4" width="44" height="52" rx="5" fill="none" stroke="white" strokeWidth="3"/><line x1="16" y1="18" x2="44" y2="18" stroke="white" strokeWidth="2.5" strokeLinecap="round"/><line x1="16" y1="26" x2="38" y2="26" stroke="white" strokeWidth="2.5" strokeLinecap="round"/><line x1="16" y1="34" x2="42" y2="34" stroke="white" strokeWidth="2.5" strokeLinecap="round"/><line x1="16" y1="42" x2="30" y2="42" stroke="white" strokeWidth="2.5" strokeLinecap="round"/></svg>
}
function DwpIcon() {
  return <svg width="40" height="40" viewBox="0 0 60 60" fill="white"><circle cx="30" cy="18" r="12"/><path d="M8 52 Q8 36 30 36 Q52 36 52 52" fill="white"/></svg>
}
function BadgeIcon() {
  return <svg width="40" height="40" viewBox="0 0 60 60" fill="none"><circle cx="30" cy="26" r="18" stroke="white" strokeWidth="3"/><path d="M18 40 L12 58 L30 50 L48 58 L42 40" fill="white"/><text x="30" y="32" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">P</text></svg>
}
function HousingIcon() {
  return <svg width="40" height="40" viewBox="0 0 60 60" fill="white"><path d="M30 6 L56 28 L50 28 L50 56 L10 56 L10 28 L4 28 Z"/></svg>
}

const PLATFORMS = [
  {
    key: 'govuk', name: 'GOV.UK', headerBg: '#0b0c0c', Icon: CrownIcon, status: 'live',
    tasks: ['Apply for Universal Credit', 'Renew a passport', 'Check benefits entitlement', 'Register to vote'],
  },
  {
    key: 'nhs', name: 'NHS App', headerBg: '#003087', Icon: NhsIcon, status: 'partial',
    tasks: ['Register with a GP', 'Book appointments', 'Order repeat prescriptions', 'View health records'],
  },
  {
    key: 'hmrc', name: 'HMRC', headerBg: '#1a1218', Icon: TaxIcon, status: 'soon',
    tasks: ['File Self Assessment', 'Check your tax code', 'View PAYE history', 'Claim a tax refund'],
  },
  {
    key: 'dwp', name: 'DWP Portal', headerBg: '#0f1f3d', Icon: DwpIcon, status: 'soon',
    tasks: ['Manage your Universal Credit', 'Report a change in circumstances', 'View payment history'],
  },
  {
    key: 'bluebadge', name: 'Blue Badge', headerBg: '#0c2340', Icon: BadgeIcon, status: 'soon',
    tasks: ['Apply for a Blue Badge', 'Renew a Blue Badge', 'Check application status'],
  },
  {
    key: 'housing', name: 'Local Authority Housing', headerBg: '#1a1008', Icon: HousingIcon, status: 'soon',
    tasks: ['Apply for social housing', 'Bid on available properties', 'Check application status'],
  },
]

const STATUS = {
  live:    { label: 'Live', color: '#4ade80', bg: 'rgba(74,222,128,0.12)', border: 'rgba(74,222,128,0.3)' },
  partial: { label: '1 task available', color: '#60a5fa', bg: 'rgba(96,165,250,0.12)', border: 'rgba(96,165,250,0.3)' },
  soon:    null, // just shows IN DEVELOPMENT badge
}

export default function PlatformSelect({ onSelect }) {
  const clickable = p => p.status === 'live' || p.status === 'partial'

  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'80px 24px 48px', backgroundColor:'#0f172a', position:'relative', overflow:'hidden' }}>
      <ParticleCanvas />
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 20%, #0f172a 95%)', pointerEvents:'none', zIndex:1 }} />

      <div style={{ position:'relative', zIndex:2, maxWidth:1060, width:'100%' }}>
        <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }}
          style={{ fontFamily:F.b, fontWeight:600, fontSize:'0.78rem', color:'#f59e0b', letterSpacing:'0.2em', textTransform:'uppercase', textAlign:'center', marginBottom:12 }}>
          Existing platform audit
        </motion.p>
        <motion.h1 initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}
          style={{ fontFamily:F.d, fontWeight:900, fontSize:'clamp(1.8rem,4.5vw,3rem)', color:'#ffffff', letterSpacing:'-0.02em', textAlign:'center', marginBottom:8 }}>
          Choose a platform to audit.
        </motion.h1>
        <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.2 }}
          style={{ fontFamily:F.b, fontSize:'1rem', color:'#6b7280', textAlign:'center', marginBottom:40 }}>
          Live audits are available now. More platforms are in development.
        </motion.p>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))', gap:'clamp(12px,2.5vw,20px)' }}>
          {PLATFORMS.map((p, i) => {
            const live = clickable(p)
            const st = STATUS[p.status]
            return (
              <motion.div key={p.key}
                initial={{ opacity:0, y:20 }}
                animate={{ opacity:1, y:0 }}
                transition={{ delay:0.25 + i * 0.07 }}
                onClick={() => live && onSelect(p.key)}
                whileHover={live ? { y:-5, boxShadow:'0 12px 36px rgba(245,158,11,0.2), 0 0 0 1.5px #f59e0b' } : {}}
                style={{
                  background:'#0f172a', borderRadius:18, overflow:'hidden',
                  cursor: live ? 'pointer' : 'default',
                  opacity: live ? 1 : 0.55,
                  boxShadow:'0 2px 8px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.07)',
                }}>

                {/* Header */}
                <div style={{ background:p.headerBg, padding:'22px 22px 18px', position:'relative' }}>
                  {/* Status badge */}
                  {st ? (
                    <div style={{ position:'absolute', top:14, right:14, display:'inline-flex', alignItems:'center', gap:5, padding:'4px 10px', background:st.bg, border:`1px solid ${st.border}`, borderRadius:9999 }}>
                      <div style={{ width:5, height:5, borderRadius:'50%', background:st.color, flexShrink:0 }} />
                      <span style={{ fontFamily:F.b, fontWeight:700, fontSize:'0.65rem', color:st.color, letterSpacing:'0.08em', textTransform:'uppercase' }}>{st.label}</span>
                    </div>
                  ) : (
                    <div style={{ position:'absolute', top:14, right:14, display:'inline-flex', alignItems:'center', padding:'4px 10px', background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:9999 }}>
                      <span style={{ fontFamily:F.b, fontWeight:700, fontSize:'0.62rem', color:'#6b7280', letterSpacing:'0.08em', textTransform:'uppercase' }}>In development</span>
                    </div>
                  )}
                  <div style={{ marginBottom:12, paddingRight:120 }}><p.Icon /></div>
                  <p style={{ fontFamily:F.d, fontWeight:900, fontSize:'clamp(1.3rem,2.5vw,1.7rem)', color:'#ffffff', margin:0, lineHeight:1.1 }}>{p.name}</p>
                </div>

                {/* Body */}
                <div style={{ padding:'16px 22px 20px' }}>
                  <p style={{ fontFamily:F.b, fontWeight:600, fontSize:'0.7rem', color:'#6b7280', letterSpacing:'0.1em', textTransform:'uppercase', margin:'0 0 10px' }}>
                    Carry out audits on tasks like:
                  </p>
                  <ul style={{ listStyle:'none', padding:0, margin:'0 0 16px', display:'flex', flexDirection:'column', gap:4 }}>
                    {p.tasks.map((t, ti) => (
                      <li key={ti} style={{ display:'flex', alignItems:'center', gap:7 }}>
                        <span style={{ color: live ? '#f59e0b' : '#374151', fontSize:'0.65rem', flexShrink:0 }}>›</span>
                        <span style={{ fontFamily:F.b, fontSize:'0.85rem', color: live ? '#d1d5db' : '#4b5563', lineHeight:1.4 }}>{t}</span>
                      </li>
                    ))}
                  </ul>
                  {live && (
                    <p style={{ fontFamily:F.d, fontWeight:700, fontSize:'0.82rem', letterSpacing:'0.06em', textTransform:'uppercase', color:'#4b5563', margin:0 }}>
                      Enter →
                    </p>
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
