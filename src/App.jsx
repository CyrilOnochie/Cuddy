import { useState, useEffect } from 'react'
import Landing from './components/Landing'
import Onboarding from './components/Onboarding'
import AppShell from './components/AppShell'
import AuditTypeSelect from './components/AuditTypeSelect'
import PlatformSelect from './components/PlatformSelect'
import TaskSelect from './components/TaskSelect'
import NhsDevScreen from './components/NhsDevScreen'
import AuditIntro from './components/AuditIntro'
import AuditPage from './components/AuditPage'
import ExclusionPanel from './components/ExclusionPanel'
import AuditMatrix from './components/AuditMatrix'
import AuditComplete from './components/AuditComplete'
import ReportScreen from './components/ReportScreen'
import AuditResultsView from './components/AuditResultsView'
import UsabilityTestingTab from './components/UsabilityTestingTab'
import { STEP1 } from './data/step1'
import { STEP2 } from './data/step2'
import { STEP3 } from './data/step3'
import { STEP4 } from './data/step4'

const STEPS = [STEP1, STEP2, STEP3, STEP4]

const loadUser   = () => { try { return JSON.parse(localStorage.getItem('dea_user')) } catch { return null } }
const saveUser   = (name, profile) => localStorage.setItem('dea_user', JSON.stringify({ name, profile }))
const loadAudits = () => { try { return JSON.parse(localStorage.getItem('dea_audits')) || [] } catch { return [] } }
const saveAudits = (a) => localStorage.setItem('dea_audits', JSON.stringify(a))
const loadInclusions = () => { try { return JSON.parse(localStorage.getItem('dea_inclusions')) || [] } catch { return [] } }
const saveInclusions = (r) => localStorage.setItem('dea_inclusions', JSON.stringify(r))

export default function App() {
  const [screen,         setScreen]         = useState('intro')
  const [userName,       setUserName]       = useState(null)
  const [selectedPlatform, setSelectedPlatform] = useState(null)
  const [exclusionDetail,  setExclusionDetail]  = useState(null)
  const [includedSteps,    setIncludedSteps]    = useState(new Set())
  const [recentAudits,     setRecentAudits]     = useState([])
  const [inclusions,       setInclusions]       = useState([])
  const [currentAuditId,   setCurrentAuditId]   = useState(null)
  const [usabilityNotif,   setUsabilityNotif]   = useState(0)

  useEffect(() => {
    const u = loadUser()
    if (u?.name) { setUserName(u.name); setScreen('shell-audit-type') }
    setRecentAudits(loadAudits())
    setInclusions(loadInclusions())
    setUsabilityNotif(parseInt(localStorage.getItem('dea_notif') || '0', 10))
  }, [])

  const handleOnboardingComplete = (name, profile) => {
    saveUser(name, profile)
    setUserName(name)
    setScreen('shell-audit-type')
  }

  const runAnother = () => {
    setScreen('shell-audit-type')
    setSelectedPlatform(null)
    setExclusionDetail(null)
    setIncludedSteps(new Set())
    setCurrentAuditId(null)
  }

  const handleOpenExclusionDetail = (stepIndex, onComplete) => setExclusionDetail({ stepIndex, onComplete })

  const handleExclusionProceed = () => {
    if (!exclusionDetail) return
    setIncludedSteps(prev => new Set(prev).add(exclusionDetail.stepIndex))
    const step = STEPS[exclusionDetail.stepIndex]
    const keys = [...new Set(step.flags.map(f => f.personaKey))]
    const auditId = currentAuditId
    setInclusions(prev => {
      const next = [...prev]
      const sevRank = { hard:3, soft:2, workaround:1 }
      keys.forEach(personaKey => {
        if (!next.find(r => r.auditId===auditId && r.personaKey===personaKey && r.step===exclusionDetail.stepIndex+1)) {
          const flagGroup = step.flags.find(f => f.personaKey===personaKey)
          const worst = flagGroup?.items.reduce((w,item) => sevRank[item.severity]>sevRank[w] ? item.severity : w, 'workaround') || 'soft'
          next.push({ auditId, personaKey, step:exclusionDetail.stepIndex+1, severity:worst, status:'No activity' })
        }
      })
      saveInclusions(next)
      return next
    })
    const cb = exclusionDetail.onComplete
    setExclusionDetail(null)
    cb && cb()
  }

  const handleAuditComplete = () => {
    const entry = { id:currentAuditId, platform:'GOV.UK', task:'Apply for Universal Credit', date:new Date().toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'}) }
    const updated = [entry, ...recentAudits]
    setRecentAudits(updated)
    saveAudits(updated)
    // Increment notification by 1 per completed audit (count of unreviewed audits)
    setUsabilityNotif(prev => {
      const next = prev + 1
      localStorage.setItem('dea_notif', next)
      return next
    })
    setScreen('shell-audit-complete')
  }

  const handleUpdateStatus = (auditId, personaKey, step, status) => {
    setInclusions(prev => {
      const next = prev.map(r => (r.auditId===auditId && r.personaKey===personaKey && r.step===step) ? {...r,status} : r)
      saveInclusions(next)
      return next
    })
  }

  const backMap = {
    'shell-platform-select': 'shell-audit-type',
    'shell-task-select':     'shell-platform-select',
    'shell-nhs-dev':         'shell-platform-select',
  }
  const showBack = Object.prototype.hasOwnProperty.call(backMap, screen)
  const handleBack = () => { if (backMap[screen]) setScreen(backMap[screen]) }

  if (screen === 'intro')    return <Landing onGetStarted={() => setScreen('onboarding')} />
  if (screen === 'onboarding') return <Onboarding onComplete={handleOnboardingComplete} />

  const shellContent = () => {
    switch (screen) {
      case 'shell-audit-type':
        return <AuditTypeSelect onSelect={() => setScreen('shell-platform-select')} />
      case 'shell-platform-select':
        return <PlatformSelect onSelect={k => { setSelectedPlatform(k); setScreen('shell-task-select') }} />
      case 'shell-task-select':
        return <TaskSelect platform={selectedPlatform} onSelectTask={() => {
          const id = `audit-${Date.now()}`
          setCurrentAuditId(id)
          setScreen(selectedPlatform==='govuk' ? 'shell-intro' : 'shell-nhs-dev')
        }} />
      case 'shell-nhs-dev':
        return <NhsDevScreen />
      case 'shell-intro':
        return <AuditIntro onBeginSteps={() => setScreen('shell-audit')} />
      case 'shell-audit-complete':
        return <AuditComplete onComplete={() => setScreen('shell-matrix')} />
      case 'shell-matrix':
        return <AuditMatrix onViewReport={() => setScreen('shell-report')} />
      case 'shell-report':
        return <ReportScreen onRunAnother={runAnother} onViewHub={() => setScreen('shell-usability-testing')} />
      case 'shell-audit-results':
        return <AuditResultsView onRunAnother={runAnother} onViewHub={() => setScreen('shell-usability-testing')} />
      case 'shell-usability-testing':
        return <UsabilityTestingTab recentAudits={recentAudits} inclusions={inclusions} onUpdateStatus={handleUpdateStatus} />
      case 'shell-audit':
        return (
          <div style={{ width:'100%', minHeight:'100vh' }}>
            <AuditPage onComplete={handleAuditComplete} onOpenExclusionDetail={handleOpenExclusionDetail} />
            {exclusionDetail !== null && (
              <div style={{ position:'fixed', inset:0, zIndex:100, background:'#0f172a', overflowY:'auto' }}>
                <ExclusionPanel stepData={STEPS[exclusionDetail.stepIndex]} isAlreadyIncluded={includedSteps.has(exclusionDetail.stepIndex)} onProceedToNext={handleExclusionProceed} onBack={() => setExclusionDetail(null)} />
              </div>
            )}
          </div>
        )
      default:
        return <AuditTypeSelect onSelect={() => setScreen('shell-platform-select')} />
    }
  }

  return (
    <AppShell userName={userName || 'there'} recentAudits={recentAudits}
      onNewAudit={() => setScreen('shell-audit-type')}
      onSelectTab={tab => { setScreen(tab==='new-audit' ? 'shell-audit-type' : 'shell-usability-testing'); if(tab==='usability-testing') { setUsabilityNotif(0); localStorage.setItem('dea_notif','0') } }}
      onOpenAudit={() => setScreen('shell-audit-results')}
      showBack={showBack} onBack={handleBack}
      usabilityNotifCount={usabilityNotif}>
      {shellContent()}
    </AppShell>
  )
}
