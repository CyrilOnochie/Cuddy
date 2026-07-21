// AuditResultsView.jsx
// Shown when a user clicks a recent audit from the sidebar.
// Two tabs at the top: "Audit matrix" and "Recruitment brief".
// Same tab style as Usability Testing Hub.

import { useState } from 'react'
import { motion } from 'framer-motion'
import AuditMatrix from './AuditMatrix'
import ReportScreen from './ReportScreen'

const F = { d:"'Syne',sans-serif", b:"'DM Sans',sans-serif" }
const C = { bg:'#0f172a', s1:'#16213a', border:'rgba(255,255,255,0.08)', amber:'#f59e0b', t1:'#ffffff', t2:'#e5e7eb', t3:'#9ca3af', t4:'#4b5563' }

export default function AuditResultsView({ onRunAnother, onViewHub }) {
  const [activeTab, setActiveTab] = useState('matrix')

  const tab = (key, label) => (
    <button onClick={() => setActiveTab(key)}
      style={{
        padding:'8px 20px',
        background: activeTab === key ? C.s1 : 'transparent',
        border: `1px solid ${activeTab === key ? C.border : 'transparent'}`,
        borderRadius: 8,
        fontFamily: F.b, fontWeight: 600, fontSize: '0.84rem',
        color: activeTab === key ? C.t1 : C.t4,
        cursor: 'pointer',
        transition: 'all 0.12s',
      }}>
      {label}
    </button>
  )

  return (
    <div style={{ minHeight:'100vh', background:C.bg }}>
      {/* Tab bar — sticky at top */}
      <div style={{ position:'sticky', top:0, zIndex:50, background:`${C.bg}f0`, backdropFilter:'blur(8px)', borderBottom:`1px solid ${C.border}`, padding:'10px 32px 10px 60px', display:'flex', alignItems:'center', gap:8 }}>
        {tab('matrix',  'Audit matrix')}
        {tab('report',  'Recruitment brief')}
      </div>

      {/* Tab content */}
      <motion.div key={activeTab} initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.2 }}>
        {activeTab === 'matrix' && (
          <AuditMatrix onViewReport={() => setActiveTab('report')} />
        )}
        {activeTab === 'report' && (
          <ReportScreen onRunAnother={onRunAnother} onViewHub={onViewHub} />
        )}
      </motion.div>
    </div>
  )
}
