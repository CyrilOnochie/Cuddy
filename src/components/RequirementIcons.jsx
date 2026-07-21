// RequirementIcons — professional flat outline icons matching tool visual language.
// Consistent 2px stroke, rounded caps, subtle gradient background square (96x96).
// Same clean line-art style as the platform/audit type select cards.

function IconBase({ id, bg1, bg2, children }) {
  return (
    <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`grad-${id}`} x1="0" y1="0" x2="96" y2="96" gradientUnits="userSpaceOnUse">
          <stop stopColor={bg1}/><stop offset="1" stopColor={bg2}/>
        </linearGradient>
      </defs>
      <rect width="96" height="96" rx="22" fill={`url(#grad-${id})`}/>
      {children}
    </svg>
  )
}

export function EmailIcon() {
  return (
    <IconBase id="em" bg1="#1e40af" bg2="#1d4ed8">
      <rect x="18" y="28" width="60" height="40" rx="6" stroke="white" strokeWidth="2.5" fill="none"/>
      <path d="M18 36 L48 54 L78 36" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </IconBase>
  )
}
export function MobileIcon() {
  return (
    <IconBase id="mo" bg1="#065f46" bg2="#047857">
      <rect x="30" y="12" width="36" height="72" rx="8" stroke="white" strokeWidth="2.5" fill="none"/>
      <circle cx="48" cy="74" r="3" fill="white"/>
      <line x1="38" y1="22" x2="58" y2="22" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    </IconBase>
  )
}
export function PassportIcon() {
  return (
    <IconBase id="pa" bg1="#4c1d95" bg2="#6d28d9">
      <rect x="20" y="12" width="56" height="72" rx="6" stroke="white" strokeWidth="2.5" fill="none"/>
      <circle cx="48" cy="40" r="10" stroke="white" strokeWidth="2.5" fill="none"/>
      <path d="M30 60 Q48 52 66 60" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <line x1="30" y1="70" x2="66" y2="70" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
    </IconBase>
  )
}
export function FaceScanIcon() {
  return (
    <IconBase id="fs" bg1="#92400e" bg2="#b45309">
      <path d="M20 36 L20 24 Q20 20 24 20 L36 20" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M76 36 L76 24 Q76 20 72 20 L60 20" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M20 60 L20 72 Q20 76 24 76 L36 76" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M76 60 L76 72 Q76 76 72 76 L60 76" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <circle cx="48" cy="48" r="12" stroke="white" strokeWidth="2.5" fill="none"/>
      <circle cx="48" cy="48" r="4" fill="white" opacity="0.7"/>
    </IconBase>
  )
}
export function NiCardIcon() {
  return (
    <IconBase id="ni" bg1="#0c4a6e" bg2="#0369a1">
      <rect x="14" y="26" width="68" height="44" rx="6" stroke="white" strokeWidth="2.5" fill="none"/>
      <rect x="22" y="36" width="20" height="14" rx="3" stroke="white" strokeWidth="2" fill="none" opacity="0.6"/>
      <line x1="50" y1="38" x2="72" y2="38" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <line x1="50" y1="44" x2="66" y2="44" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
      <line x1="22" y1="58" x2="72" y2="58" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.35"/>
      <line x1="22" y1="64" x2="56" y2="64" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.35"/>
    </IconBase>
  )
}
export function BankIcon() {
  return (
    <IconBase id="ba" bg1="#064e3b" bg2="#065f46">
      <path d="M48 14 L78 30 L78 34 L18 34 L18 30 Z" stroke="white" strokeWidth="2.5" strokeLinejoin="round" fill="none"/>
      <rect x="24" y="38" width="8" height="28" rx="2" fill="white" opacity="0.7"/>
      <rect x="44" y="38" width="8" height="28" rx="2" fill="white" opacity="0.7"/>
      <rect x="64" y="38" width="8" height="28" rx="2" fill="white" opacity="0.7"/>
      <line x1="18" y1="70" x2="78" y2="70" stroke="white" strokeWidth="3" strokeLinecap="round"/>
    </IconBase>
  )
}
export function HousingIcon() {
  return (
    <IconBase id="ho" bg1="#881337" bg2="#be123c">
      <path d="M48 14 L80 42 L72 42 L72 80 L24 80 L24 42 L16 42 Z" stroke="white" strokeWidth="2.5" strokeLinejoin="round" fill="none"/>
      <rect x="38" y="58" width="20" height="22" rx="3" stroke="white" strokeWidth="2" fill="none"/>
    </IconBase>
  )
}
export function DeclarationIcon() {
  return (
    <IconBase id="de" bg1="#312e81" bg2="#4338ca">
      <rect x="20" y="10" width="46" height="60" rx="5" stroke="white" strokeWidth="2.5" fill="none"/>
      <line x1="28" y1="24" x2="58" y2="24" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <line x1="28" y1="32" x2="54" y2="32" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
      <line x1="28" y1="40" x2="56" y2="40" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
      <line x1="28" y1="48" x2="46" y2="48" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
      <path d="M30 60 L38 70 L56 52" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </IconBase>
  )
}
export function InterviewIcon() {
  return (
    <IconBase id="iv" bg1="#78350f" bg2="#92400e">
      <circle cx="36" cy="32" r="12" stroke="white" strokeWidth="2.5" fill="none"/>
      <circle cx="64" cy="32" r="12" stroke="white" strokeWidth="2.5" fill="none"/>
      <path d="M14 80 Q14 60 36 60 Q50 60 56 68 Q62 60 64 60 Q82 60 82 80" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    </IconBase>
  )
}

export const ICON_MAP = {
  email: EmailIcon,
  mobile: MobileIcon,
  passport: PassportIcon,
  facescan: FaceScanIcon,
  nicard: NiCardIcon,
  bank: BankIcon,
  housing: HousingIcon,
  declaration: DeclarationIcon,
  interview: InterviewIcon,
}
