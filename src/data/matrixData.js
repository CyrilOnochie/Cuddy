// Pre-computed worst-case severity for each persona × step.
// 'blocked' = step not reached due to earlier hard stop.
// Data sourced from step1.js–step4.js; this is the summary layer the matrix renders from.

export const MATRIX_PERSONAS = [
  { key:'dan',   name:'Dan',   subtitle:'35 · Default assumed user',    image:'/assets/dan.png',   isDefault:true },
  { key:'jack',  name:'Jack',  subtitle:'47 · Low digital literacy',    image:'/assets/jack.png' },
  { key:'sam',   name:'Sam',   subtitle:'72 · Older Salford resident',  image:'/assets/sam.png' },
  { key:'tosin', name:'Tosin', subtitle:'34 · Migrant woman, Salford',  image:'/assets/tosin.png' },
  { key:'jane',  name:'Jane',  subtitle:'28 · Learning disability',     image:'/assets/jane.png' },
]

export const MATRIX_STEPS = [
  { number:1, title:'Create an account',        short:'Account',   requires:['Email address','UK mobile number'] },
  { number:2, title:'Verify your identity',     short:'Identity',  requires:['Photo ID','NFC-capable smartphone'] },
  { number:3, title:'Complete your to-do list', short:'To-do list',requires:['National Insurance number','Bank details','Housing info'] },
  { number:4, title:'Submit your claim',        short:'Submit',    requires:['Legal declaration','Jobcentre interview within 7 days'] },
]

// Worst severity per cell
export const MATRIX_CELLS = {
  dan:   {1:'clean',   2:'clean',   3:'clean',   4:'clean'},
  jack:  {1:'hard',    2:'blocked', 3:'blocked', 4:'blocked'},
  sam:   {1:'soft',    2:'hard',    3:'soft',    4:'clean'},
  tosin: {1:'clean',   2:'soft',    3:'soft',    4:'soft'},
  jane:  {1:'clean',   2:'soft',    3:'hard',    4:'soft'},
}

// Terminal-style streaming log for the processing screen
export const PROCESSING_LOG = [
  { delay:0,    text:'Connecting to audit database...',                                          type:'info' },
  { delay:220,  text:'Platform: GOV.UK · Apply for Universal Credit',                           type:'success' },
  { delay:440,  text:'Loading user profiles from research database...',                          type:'info' },
  { delay:640,  text:'5 profiles loaded (1 default · 4 documented exclusion patterns)',          type:'success' },
  { delay:860,  text:'Analysing Step 1 — Create an account',                                    type:'step' },
  { delay:1060, text:'jack · No email address · Hard stop detected · 13M affected',             type:'critical' },
  { delay:1200, text:'sam · Platform assumes digital account intent · Friction detected',        type:'warn' },
  { delay:1340, text:'Analysing Step 2 — Verify your identity',                                 type:'step' },
  { delay:1520, text:'sam · Neither verification route viable · Hard stop detected',             type:'critical' },
  { delay:1660, text:'tosin · Device/document mismatch · Friction detected',                    type:'warn' },
  { delay:1780, text:'jane · Abstract error recovery · Conditional friction detected',           type:'warn' },
  { delay:1900, text:'Analysing Step 3 — Complete your to-do list',                             type:'step' },
  { delay:2060, text:'sam · Session timeout risk · Friction detected',                          type:'warn' },
  { delay:2180, text:'tosin · Form may not capture full entitlement · Friction detected',        type:'warn' },
  { delay:2300, text:'jane · Timeout resets MFA on every return · Hard stop detected · 1.5M',   type:'critical' },
  { delay:2420, text:'Analysing Step 4 — Submit your claim',                                    type:'step' },
  { delay:2580, text:'tosin · Legal declaration in complex formal English · Friction detected',  type:'warn' },
  { delay:2700, text:'jane · 7-day claimant commitment deadline · Friction detected',            type:'warn' },
  { delay:2820, text:'',                                                                         type:'divider' },
  { delay:2900, text:'Audit complete · 4 steps · 11 exclusion points · 4 user groups affected', type:'complete' },
]

export const AUDIT_STATS = { steps:4, exclusionPoints:11, userGroups:4 }
