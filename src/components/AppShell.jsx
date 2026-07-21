// AppShell.jsx — Claude-style collapsible sidebar wrapping the whole authenticated app.
// "Cuddy" branding, New Audit / Usability Testing Hub tabs, Recent Audits list,
// footer with user's first name + grey user icon avatar.
// Contextual back arrow rendered here, fixed at sidebarWidth + 10px, so it
// never overlaps the sidebar regardless of collapsed/expanded state.

import { useState } from 'react'
import { motion } from 'framer-motion'

const F = { d:"'Syne',sans-serif", b:"'DM Sans',sans-serif" }

function NewAuditIcon() {
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
}
function UsabilityHubIcon() {
  // Folder icon
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"/></svg>
}
function CollapseIcon({ collapsed }) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: collapsed ? 'rotate(180deg)' : 'none', transition:'transform 0.2s' }}>
      <rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/>
    </svg>
  )
}
function UserIcon() {
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
}
function BackArrowIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M11 18l-6-6 6-6"/>
    </svg>
  )
}

export default function AppShell({ userName, recentAudits, onNewAudit, onSelectTab, onOpenAudit, showBack, onBack, usabilityNotifCount, children }) {
  const [collapsed, setCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState('new-audit')

  const handleTab = (tab) => {
    setActiveTab(tab)
    onSelectTab(tab)
  }

  const sidebarWidth = collapsed ? 64 : 252

  return (
    <div style={{ display:'flex', width:'100%', minHeight:'100vh', background:'#0f172a', position:'relative' }}>

      {/* Sidebar */}
      <motion.div animate={{ width: sidebarWidth }} transition={{ duration:0.25, ease:[0.16,1,0.3,1] }}
        style={{ flexShrink:0, background:'#0b1322', borderRight:'1px solid rgba(255,255,255,0.06)', display:'flex', flexDirection:'column', height:'100vh', position:'sticky', top:0, overflow:'hidden' }}>

        {/* Logo row */}
        <div style={{ display:'flex', alignItems:'center', justifyContent: collapsed ? 'center' : 'space-between', padding: collapsed ? '16px 0' : '16px 18px', flexShrink:0 }}>
          {collapsed ? (
            <img src="/assets/cuddy-logo.png" alt="Cuddy"
              style={{ width:26, height:26, objectFit:'contain', filter:'brightness(0) saturate(100%) invert(73%) sepia(58%) saturate(739%) hue-rotate(350deg) brightness(103%)' }}/>
          ) : (
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <img src="/assets/cuddy-logo.png" alt="Cuddy"
                style={{ width:24, height:24, objectFit:'contain', filter:'brightness(0) saturate(100%) invert(73%) sepia(58%) saturate(739%) hue-rotate(350deg) brightness(103%)' }}/>
              <p style={{ fontFamily:F.d, fontWeight:900, fontSize:'1.1rem', color:'#ffffff', margin:0, letterSpacing:'-0.01em' }}>Cuddy</p>
            </div>
          )}
          <button onClick={() => setCollapsed(c => !c)}
            style={{ background:'transparent', border:'none', color:'#6b7280', cursor:'pointer', padding:6, display:'flex', alignItems:'center', justifyContent:'center', borderRadius:6 }}>
            <CollapseIcon collapsed={collapsed} />
          </button>
        </div>

        {/* Tabs */}
        <div style={{ padding: collapsed ? '4px 8px' : '4px 12px', display:'flex', flexDirection:'column', gap:2, flexShrink:0 }}>
          <button onClick={() => handleTab('new-audit')}
            style={{
              display:'flex', alignItems:'center', gap:10, padding: collapsed ? '10px' : '9px 12px',
              justifyContent: collapsed ? 'center' : 'flex-start',
              background: activeTab==='new-audit' ? 'rgba(245,158,11,0.1)' : 'transparent',
              border:'none', borderRadius:8, cursor:'pointer', width:'100%',
              color: activeTab==='new-audit' ? '#f59e0b' : '#9ca3af',
            }}>
            <NewAuditIcon />
            {!collapsed && <span style={{ fontFamily:F.b, fontWeight:600, fontSize:'0.88rem' }}>New Audit</span>}
          </button>
          <button onClick={() => handleTab('usability-testing')}
            style={{
              display:'flex', alignItems:'center', gap:10, padding: collapsed ? '10px' : '9px 12px',
              justifyContent: collapsed ? 'center' : 'flex-start',
              background: activeTab==='usability-testing' ? 'rgba(245,158,11,0.1)' : 'transparent',
              border:'none', borderRadius:8, cursor:'pointer', width:'100%',
              color: activeTab==='usability-testing' ? '#f59e0b' : '#9ca3af', position:'relative',
            }}>
            {/* Icon + notification badge */}
            <div style={{ position:'relative', flexShrink:0 }}>
              <UsabilityHubIcon />
              {usabilityNotifCount > 0 && (
                <motion.div
                  initial={{ scale:0 }} animate={{ scale:1 }} transition={{ type:'spring', stiffness:300, damping:20 }}
                  style={{ position:'absolute', top:-5, right:-5, width:16, height:16, borderRadius:'50%', background:'#ef4444', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 0 0 2px #0b1322' }}>
                  <motion.div animate={{ scale:[1,1.15,1] }} transition={{ duration:1.8, repeat:Infinity, ease:'easeInOut' }}
                    style={{ position:'absolute', inset:0, borderRadius:'50%', background:'#ef4444', opacity:0.5 }}/>
                  <span style={{ fontFamily:F.b, fontSize:'0.55rem', fontWeight:700, color:'white', position:'relative', lineHeight:1 }}>
                    {usabilityNotifCount > 9 ? '9+' : usabilityNotifCount}
                  </span>
                </motion.div>
              )}
            </div>
            {!collapsed && <span style={{ fontFamily:F.b, fontWeight:600, fontSize:'0.88rem' }}>Usability Testing Hub</span>}
          </button>
        </div>

        {/* Recent audits */}
        {!collapsed && (
          <div style={{ flex:1, overflowY:'auto', padding:'18px 12px 8px', minHeight:0 }}>
            <p style={{ fontFamily:F.b, fontWeight:600, fontSize:'0.68rem', color:'#4b5563', letterSpacing:'0.1em', textTransform:'uppercase', margin:'0 0 8px', padding:'0 4px' }}>
              Recent Audits
            </p>
            {recentAudits.length === 0 ? (
              <p style={{ fontFamily:F.b, fontSize:'0.78rem', color:'#374151', padding:'0 4px', lineHeight:1.5 }}>
                Completed audits will appear here.
              </p>
            ) : (
              <div style={{ display:'flex', flexDirection:'column', gap:2 }}>
                {recentAudits.map((audit, i) => (
                  <button key={i} onClick={() => onOpenAudit(audit)}
                    style={{ display:'block', width:'100%', textAlign:'left', padding:'9px 10px', background:'transparent', border:'none', borderRadius:8, cursor:'pointer' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    <p style={{ fontFamily:F.b, fontWeight:600, fontSize:'0.82rem', color:'#e5e7eb', margin:0, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
                      {audit.task} ({audit.platform})
                    </p>
                    <p style={{ fontFamily:F.b, fontSize:'0.68rem', color:'#4b5563', margin:'2px 0 0' }}>{audit.date}</p>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
        {collapsed && <div style={{ flex:1 }} />}

        {/* Footer — user */}
        <div style={{ borderTop:'1px solid rgba(255,255,255,0.06)', padding: collapsed ? '14px 0' : '14px 16px', display:'flex', alignItems:'center', gap:10, justifyContent: collapsed ? 'center' : 'flex-start', flexShrink:0 }}>
          <div style={{ width:32, height:32, borderRadius:'50%', flexShrink:0, background:'#1e293b', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <UserIcon />
          </div>
          {!collapsed && (
            <div style={{ minWidth:0 }}>
              <p style={{ fontFamily:F.b, fontWeight:600, fontSize:'0.85rem', color:'#e5e7eb', margin:0, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{userName}</p>
              <p style={{ fontFamily:F.b, fontSize:'0.68rem', color:'#4b5563', margin:0 }}>Free plan</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Contextual back arrow — fixed at sidebarWidth + 10px, follows collapse state */}
      {showBack && (
        <motion.button
          onClick={onBack}
          animate={{ left: sidebarWidth + 10 }}
          transition={{ duration:0.25, ease:[0.16,1,0.3,1] }}
          whileHover={{ background:'rgba(255,255,255,0.06)' }}
          style={{
            position:'fixed', top:20, zIndex:40,
            width:36, height:36, borderRadius:8,
            background:'transparent', border:'1px solid rgba(255,255,255,0.1)',
            display:'flex', alignItems:'center', justifyContent:'center',
            cursor:'pointer',
          }}>
          <BackArrowIcon />
        </motion.button>
      )}

      {/* Main content */}
      <div style={{ flex:1, minWidth:0, position:'relative' }}>
        {children}
      </div>
    </div>
  )
}
