// Onboarding.jsx
// Step 1: Account form only (no OAuth). Terms checkbox unlocks CTA. Terms link opens modal.
// Step 2: Professional profile
// Step 3: Welcome screen

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ParticleCanvas from './ParticleCanvas'

const F = { d:"'Syne',sans-serif", b:"'DM Sans',sans-serif" }

const ROLES = [
  'UX Designer', 'Service Designer', 'Product Manager',
  'Developer / Engineer', 'User Researcher', 'Accessibility Specialist', 'Other'
]

const USE_CASES = [
  { key:'existing',   icon:'🌐', label:'Audit existing platforms',     desc:'Test live digital services for exclusion before your next usability session.' },
  { key:'prototype',  icon:'📐', label:'Audit prototypes before launch', desc:'Identify exclusion in Figma frames and wireframes before code is written.' },
  { key:'compliance', icon:'📋', label:'Support accessibility compliance', desc:'Build evidence for equality impact assessments and WCAG compliance work.' },
]

const TERMS_CONTENT = `Cuddy is a prototype tool built as part of an MA Creative Technology project at the University of Salford.

No personal data is stored. The account you create here exists only in your browser's local storage and is not transmitted to any server. It will be cleared if you clear your browser data.

All content shown within the tool — personas, audit findings, platform data, exclusion evidence, and recruitment contacts — is for proof-of-concept purposes only. It is intended to demonstrate the methodology of the Digital Exclusion Audit.

This is not a commercial product. Any resemblance to real individuals beyond the documented personas (Jack, Sam, Tosin, Jane) is coincidental. The platform audit data is drawn from published secondary research and one primary observation session.

By ticking the checkbox, you confirm you understand this is a working prototype submitted as assessed coursework, and that: personas are composites rather than individuals; every flag is an evidenced hypothesis carrying its source rather than a verdict; and the tool's output directs human testing rather than replacing it.`

function StyledInput({ type='text', placeholder, value, onChange, autoFocus }) {
  const [focused, setFocused] = useState(false)
  return (
    <input type={type} placeholder={placeholder} value={value} onChange={onChange} autoFocus={autoFocus}
      onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
      style={{ width:'100%', padding:'11px 14px', background:'rgba(255,255,255,0.04)', border:`1px solid ${focused ? 'rgba(245,158,11,0.6)' : 'rgba(255,255,255,0.1)'}`, borderRadius:8, color:'#ffffff', fontFamily:F.b, fontSize:'0.9rem', outline:'none', transition:'border-color 0.15s' }}
    />
  )
}

function TermsModal({ onClose }) {
  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
      onClick={onClose}
      style={{ position:'fixed', inset:0, zIndex:200, background:'rgba(0,0,0,0.75)', display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}>
      <motion.div initial={{ opacity:0, scale:0.95, y:16 }} animate={{ opacity:1, scale:1, y:0 }} exit={{ opacity:0, scale:0.95 }}
        onClick={e => e.stopPropagation()}
        style={{ background:'#16213a', border:'1px solid rgba(255,255,255,0.1)', borderRadius:14, padding:'28px 32px', maxWidth:520, width:'100%', maxHeight:'80vh', overflowY:'auto' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:18 }}>
          <h2 style={{ fontFamily:F.d, fontWeight:800, fontSize:'1.1rem', color:'#ffffff', margin:0, letterSpacing:'-0.02em' }}>
            Terms of use
          </h2>
          <button onClick={onClose}
            style={{ background:'transparent', border:'none', color:'#6b7280', cursor:'pointer', fontSize:'1.2rem', lineHeight:1, padding:'2px 6px', borderRadius:4 }}
            onMouseEnter={e => e.currentTarget.style.color='#e5e7eb'}
            onMouseLeave={e => e.currentTarget.style.color='#6b7280'}>✕</button>
        </div>

        <div style={{ padding:'14px 16px', background:'rgba(245,158,11,0.08)', border:'1px solid rgba(245,158,11,0.25)', borderRadius:8, marginBottom:18 }}>
          <p style={{ fontFamily:F.d, fontWeight:700, fontSize:'0.82rem', color:'#f59e0b', margin:'0 0 3px' }}>Prototype notice</p>
          <p style={{ fontFamily:F.b, fontSize:'0.8rem', color:'#e5e7eb', margin:0, lineHeight:1.5 }}>
            This tool has not saved your data. Everything shown is for proof of concept only, as part of a Digital Inclusion research project.
          </p>
        </div>

        {TERMS_CONTENT.split('\n\n').map((para, i) => (
          <p key={i} style={{ fontFamily:F.b, fontSize:'0.82rem', color:'#9ca3af', lineHeight:1.7, margin:'0 0 14px' }}>{para}</p>
        ))}

        <motion.button onClick={onClose}
          whileHover={{ background:'#fbbf24' }} whileTap={{ scale:0.97 }}
          style={{ width:'100%', padding:'11px', background:'#f59e0b', color:'#0f172a', border:'none', borderRadius:8, fontFamily:F.d, fontWeight:700, fontSize:'0.88rem', cursor:'pointer', marginTop:6 }}>
          Close
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

export default function Onboarding({ onComplete }) {
  const [step, setStep] = useState(1)
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [useCases, setUseCases] = useState([])
  const [agreed, setAgreed] = useState(false)
  const [showTerms, setShowTerms] = useState(false)

  const toggleUseCase = (key) =>
    setUseCases(prev => prev.includes(key) ? prev.filter(k=>k!==key) : [...prev, key])

  const handleAccountSubmit = () => {
    if (!firstName.trim() || !agreed) return
    setStep(2)
  }

  const handleProfileSubmit = () => {
    setStep(3)
    setTimeout(() => onComplete(firstName.trim() || 'there', { role, useCases }), 5500)
  }

  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#0f172a', padding:24, position:'relative', overflow:'hidden' }}>
      <ParticleCanvas />
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 60% 60% at 50% 50%, transparent 20%, #0f172a 100%)', pointerEvents:'none', zIndex:1 }}/>

      {/* Terms modal */}
      <AnimatePresence>
        {showTerms && <TermsModal onClose={() => setShowTerms(false)} />}
      </AnimatePresence>

      <AnimatePresence mode="wait">

        {/* Step 1: Account */}
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-20 }}
            style={{ position:'relative', zIndex:2, width:'100%', maxWidth:400 }}>

            {/* Logo */}
            <div style={{ display:'flex', alignItems:'center', gap:9, marginBottom:36 }}>
              <div style={{ width:26, height:26, borderRadius:7, background:'#f59e0b', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M6 2v8" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round"/></svg>
              </div>
              <span style={{ fontFamily:F.d, fontWeight:900, fontSize:'1rem', color:'#ffffff', letterSpacing:'-0.02em' }}>Cuddy</span>
            </div>

            <h1 style={{ fontFamily:F.d, fontWeight:900, fontSize:'1.7rem', color:'#ffffff', margin:'0 0 6px', letterSpacing:'-0.03em' }}>Create your account</h1>
            <p style={{ fontFamily:F.b, fontSize:'0.85rem', color:'#6b7280', marginBottom:28 }}>Your audits, reports, and testing panel — all in one place.</p>

            {/* Progress */}
            <div style={{ display:'flex', gap:4, marginBottom:28 }}>
              {[1,2].map(n => <div key={n} style={{ flex:1, height:3, borderRadius:2, background: n <= 1 ? '#f59e0b' : 'rgba(255,255,255,0.08)' }}/>)}
            </div>

            {/* Form */}
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              <StyledInput placeholder="First name" value={firstName} onChange={e => setFirstName(e.target.value)} autoFocus/>
              <StyledInput type="email" placeholder="Work email" value={email} onChange={e => setEmail(e.target.value)}/>
              <StyledInput type="password" placeholder="Password (min. 8 characters)"/>

              {/* Terms checkbox */}
              <div style={{ display:'flex', alignItems:'flex-start', gap:10, marginTop:6, padding:'12px 14px', background:'rgba(255,255,255,0.03)', border:`1px solid ${agreed ? 'rgba(245,158,11,0.35)' : 'rgba(255,255,255,0.08)'}`, borderRadius:8, cursor:'pointer', transition:'border-color 0.15s' }}
                onClick={() => setAgreed(a => !a)}>
                {/* Checkbox */}
                <div style={{ width:18, height:18, borderRadius:4, border:`2px solid ${agreed ? '#f59e0b' : 'rgba(255,255,255,0.2)'}`, background: agreed ? '#f59e0b' : 'transparent', flexShrink:0, marginTop:1, display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.15s' }}>
                  {agreed && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1.5 5L4 7.5L8.5 2" stroke="#0f172a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
                <p style={{ fontFamily:F.b, fontSize:'0.8rem', color:'#9ca3af', margin:0, lineHeight:1.5, userSelect:'none' }}>
                  I understand this is a prototype. I have read and agree to the{' '}
                  <span onClick={e => { e.stopPropagation(); setShowTerms(true) }}
                    style={{ color:'#f59e0b', textDecoration:'underline', cursor:'pointer' }}>
                    terms of use
                  </span>.
                </p>
              </div>

              {/* CTA — grey when unchecked, amber + pulse when checked */}
              <motion.button
                onClick={handleAccountSubmit}
                disabled={!agreed || !firstName.trim()}
                animate={agreed && firstName.trim() ? { scale:1 } : { scale:1 }}
                whileHover={agreed && firstName.trim() ? { background:'#fbbf24' } : {}}
                whileTap={agreed && firstName.trim() ? { scale:0.97 } : {}}
                className={agreed && firstName.trim() ? 'pulse-btn' : ''}
                style={{
                  width:'100%', padding:'12px', border:'none', borderRadius:9999,
                  fontFamily:F.d, fontWeight:700, fontSize:'0.9rem',
                  letterSpacing:'0.02em', textTransform:'uppercase',
                  cursor: agreed && firstName.trim() ? 'pointer' : 'not-allowed',
                  background: agreed && firstName.trim() ? '#f59e0b' : 'rgba(255,255,255,0.08)',
                  color: agreed && firstName.trim() ? '#0f172a' : '#4b5563',
                  transition:'background 0.2s, color 0.2s',
                  marginTop:4,
                }}>
                Continue →
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Professional profile */}
        {step === 2 && (
          <motion.div key="step2" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-20 }}
            style={{ position:'relative', zIndex:2, width:'100%', maxWidth:520 }}>

            <div style={{ display:'flex', alignItems:'center', gap:9, marginBottom:36 }}>
              <div style={{ width:26, height:26, borderRadius:7, background:'#f59e0b', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M6 2v8" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round"/></svg>
              </div>
              <span style={{ fontFamily:F.d, fontWeight:900, fontSize:'1rem', color:'#ffffff', letterSpacing:'-0.02em' }}>Cuddy</span>
            </div>

            <h1 style={{ fontFamily:F.d, fontWeight:900, fontSize:'1.7rem', color:'#ffffff', margin:'0 0 6px', letterSpacing:'-0.03em' }}>
              {firstName ? `Hi ${firstName}. ` : ''}Tell us about yourself.
            </h1>
            <p style={{ fontFamily:F.b, fontSize:'0.85rem', color:'#6b7280', marginBottom:28 }}>
              Cuddy tailors its audit output to your role and the work you're doing.
            </p>

            <div style={{ display:'flex', gap:4, marginBottom:28 }}>
              {[1,2].map(n => <div key={n} style={{ flex:1, height:3, borderRadius:2, background:'#f59e0b' }}/>)}
            </div>

            {/* Role */}
            <div style={{ marginBottom:22 }}>
              <p style={{ fontFamily:F.b, fontWeight:600, fontSize:'0.8rem', color:'#e5e7eb', margin:'0 0 10px' }}>What's your role?</p>
              <div style={{ display:'flex', flexWrap:'wrap', gap:7 }}>
                {ROLES.map(r => (
                  <motion.button key={r} onClick={() => setRole(r)}
                    whileHover={{ borderColor: role===r ? '#f59e0b' : 'rgba(255,255,255,0.2)' }}
                    style={{ padding:'7px 14px', background: role===r ? 'rgba(245,158,11,0.12)' : 'rgba(255,255,255,0.04)', border:`1px solid ${role===r ? '#f59e0b' : 'rgba(255,255,255,0.1)'}`, borderRadius:9999, fontFamily:F.b, fontWeight: role===r ? 600 : 400, fontSize:'0.82rem', color: role===r ? '#f59e0b' : '#9ca3af', cursor:'pointer', transition:'all 0.12s' }}>
                    {r}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Use cases */}
            <div style={{ marginBottom:24 }}>
              <p style={{ fontFamily:F.b, fontWeight:600, fontSize:'0.8rem', color:'#e5e7eb', margin:'0 0 10px' }}>
                How will you use Cuddy? <span style={{ color:'#4b5563', fontWeight:400 }}>Select all that apply.</span>
              </p>
              <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                {USE_CASES.map(uc => {
                  const sel = useCases.includes(uc.key)
                  return (
                    <motion.button key={uc.key} onClick={() => toggleUseCase(uc.key)}
                      whileHover={{ borderColor: sel ? '#f59e0b' : 'rgba(255,255,255,0.2)' }}
                      style={{ display:'flex', alignItems:'flex-start', gap:14, padding:'13px 16px', background: sel ? 'rgba(245,158,11,0.08)' : 'rgba(255,255,255,0.03)', border:`1px solid ${sel ? 'rgba(245,158,11,0.5)' : 'rgba(255,255,255,0.08)'}`, borderRadius:10, cursor:'pointer', textAlign:'left', transition:'all 0.12s' }}>
                      <span style={{ fontSize:'1.2rem', flexShrink:0, marginTop:1 }}>{uc.icon}</span>
                      <div>
                        <p style={{ fontFamily:F.d, fontWeight:700, fontSize:'0.88rem', color: sel ? '#f59e0b' : '#e5e7eb', margin:'0 0 2px' }}>{uc.label}</p>
                        <p style={{ fontFamily:F.b, fontSize:'0.78rem', color:'#6b7280', margin:0, lineHeight:1.4 }}>{uc.desc}</p>
                      </div>
                      <div style={{ marginLeft:'auto', flexShrink:0, width:18, height:18, borderRadius:'50%', border:`2px solid ${sel ? '#f59e0b' : 'rgba(255,255,255,0.15)'}`, background: sel ? '#f59e0b' : 'transparent', display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.12s' }}>
                        {sel && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1.5 5L4 7.5L8.5 2.5" stroke="#0f172a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                      </div>
                    </motion.button>
                  )
                })}
              </div>
            </div>

            <motion.button onClick={handleProfileSubmit}
              whileHover={{ background:'#fbbf24' }} whileTap={{ scale:0.97 }}
              className="pulse-btn"
              style={{ width:'100%', padding:'12px', background:'#f59e0b', color:'#0f172a', border:'none', borderRadius:9999, fontFamily:F.d, fontWeight:700, fontSize:'0.9rem', letterSpacing:'0.02em', textTransform:'uppercase', cursor:'pointer' }}>
              Create my workspace →
            </motion.button>
          </motion.div>
        )}

        {/* Step 3: Welcome */}
        {step === 3 && (
          <motion.div key="welcome" initial={{ opacity:0, scale:0.96 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0 }}
            style={{ position:'relative', zIndex:2, textAlign:'center', maxWidth:480 }}>
            <motion.div initial={{ scale:0 }} animate={{ scale:1 }} transition={{ delay:0.2, type:'spring', stiffness:200 }}
              style={{ width:56, height:56, borderRadius:16, background:'#f59e0b', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 24px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </motion.div>
            <motion.h1 initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.35 }}
              style={{ fontFamily:F.d, fontWeight:900, fontSize:'clamp(2rem,5vw,3rem)', color:'#ffffff', margin:'0 0 10px', letterSpacing:'-0.04em' }}>
              Welcome{firstName ? `, ${firstName}` : ''}.
            </motion.h1>
            <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.55 }}
              style={{ fontFamily:F.b, fontSize:'1rem', color:'#9ca3af', margin:'0 0 6px' }}>
              {role ? `${role} ·` : ''} Your workspace is ready.
            </motion.p>
            <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.75 }}
              style={{ fontFamily:F.b, fontSize:'0.82rem', color:'#4b5563' }}>
              Setting up your audit environment...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
