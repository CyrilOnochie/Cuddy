import { useState, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import ParticleCanvas from './ParticleCanvas'
import ProgressBar from './ProgressBar'
import StepBlock from './StepBlock'
import ExclusionOverlay from './ExclusionOverlay'
import { STEP1 } from '../data/step1'
import { STEP2 } from '../data/step2'
import { STEP3 } from '../data/step3'
import { STEP4 } from '../data/step4'

const STEPS = [STEP1, STEP2, STEP3, STEP4]

export default function AuditPage({ onComplete, onOpenExclusionDetail }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [stepStatuses, setStepStatuses] = useState({})
  const [showOverlay, setShowOverlay] = useState(false)
  const [completedSteps, setCompletedSteps] = useState(new Set())
  const stepRefs = [useRef(), useRef(), useRef(), useRef()]

  const scrollToStep = idx => setTimeout(() => stepRefs[idx]?.current?.scrollIntoView({ behavior:'smooth', block:'start' }), 150)

  const advanceStep = status => {
    const idx = currentStep
    setStepStatuses(prev => ({ ...prev, [idx]:status }))
    setCompletedSteps(prev => new Set(prev).add(idx))
    setShowOverlay(false)
    if (idx === STEPS.length - 1) { setTimeout(() => onComplete(), 300) }
    else { setCurrentStep(idx+1); scrollToStep(idx+1) }
  }

  const handleProceed = () => {
    if (STEPS[currentStep].flags.length > 0) setShowOverlay(true)
    else advanceStep('clean')
  }

  return (
    <div style={{ width:'100%', minHeight:'100vh', backgroundColor:'#0f172a', position:'relative', overflowX:'clip' }}>
      <ParticleCanvas />
      <div style={{ position:'fixed', inset:0, pointerEvents:'none', background:'radial-gradient(ellipse 90% 90% at 50% 0%, transparent 20%, rgba(15,23,42,0.7) 90%)', zIndex:1 }} />
      <div style={{ position:'relative', zIndex:2 }}>
        <ProgressBar currentStep={currentStep} completedSteps={completedSteps} />
        {STEPS.map((stepData, i) => {
          if (i > currentStep && !completedSteps.has(i)) return null
          return (
            <div key={i} ref={stepRefs[i]} style={{ borderTop: i > 0 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
              <StepBlock
                stepData={stepData}
                isActive={i === currentStep}
                isCompleted={completedSteps.has(i)}
                status={stepStatuses[i] ?? null}
                onProceed={i === currentStep ? handleProceed : null}
                onIncludeRetro={completedSteps.has(i) && stepStatuses[i]==='skipped' ? () => onOpenExclusionDetail(i, () => setStepStatuses(prev => ({...prev, [i]:'included'}))) : null}
              />
            </div>
          )
        })}
      </div>
      <AnimatePresence>
        {showOverlay && (
          <ExclusionOverlay
            stepData={STEPS[currentStep]}
            onReview={() => { setShowOverlay(false); onOpenExclusionDetail(currentStep, () => advanceStep('included')) }}
            onSkip={() => advanceStep('skipped')}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
