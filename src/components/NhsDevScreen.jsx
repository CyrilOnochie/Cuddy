import { motion } from 'framer-motion'
import ParticleCanvas from './ParticleCanvas'
const F = { d:"'Syne',sans-serif", b:"'DM Sans',sans-serif" }
export default function NhsDevScreen() {
  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', backgroundColor:'#0f172a', position:'relative', overflow:'hidden', padding:40 }}>
      <ParticleCanvas />
      <div style={{ position:'relative', zIndex:2, maxWidth:480, textAlign:'center' }}>
        <div style={{ width:60, height:60, borderRadius:'50%', background:'rgba(96,165,250,0.12)', border:'2px solid rgba(96,165,250,0.4)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        </div>
        <h1 style={{ fontFamily:F.d, fontWeight:900, fontSize:'2rem', color:'#ffffff', margin:'0 0 12px' }}>Still in development</h1>
        <p style={{ fontFamily:F.b, fontSize:'1rem', color:'#9ca3af', lineHeight:1.6, marginBottom:28 }}>The NHS App audit follows the same methodology as the GOV.UK journey. The audit database for this platform is being built — check back soon.</p>
      </div>
    </div>
  )
}
