export const REPORT = {
  platform: 'GOV.UK', task: 'Apply for Universal Credit',
  stepsReviewed: 4, exclusionPoints: 11,
  personas: [
    {
      key: 'jack', name: 'Jack', age: 47, persona: 'Low digital literacy, Salford', image: '/assets/jack.png',
      stepOutcomes: [{ step:1, status:'hard-stop' }, { step:2, status:'not-reached' }, { step:3, status:'not-reached' }, { step:4, status:'not-reached' }],
      flags: [
        { step:1, severity:'hard', label:'No email address — hard stop on the digital pathway', detail:"Jack can't create an account. The digital journey stops before it starts. The phone route is not promoted from the failure point." },
        { step:1, severity:'workaround', label:'Phone/Jobcentre route — not discoverable from failure', detail:"CPAG confirms it is not widely publicised. Jack has no prior claim history and no support network to point him to it." },
      ],
      population: { stat:'Jack represents 13 million UK adults — around 1 in 4 — who have very low digital confidence and capability.', source:'Lloyds Bank UK Consumer Digital Index, 2023' },
      recruitment: { summary:"People matching Jack's profile are reached through digital inclusion organisations and community employment support services.", contacts:[{ org:'Good Things Foundation — Online Centres Network', detail:'UK-wide network of digital inclusion hubs serving people with very low digital capability.' }, { org:'Salford City Council — Digital Inclusion Team', detail:'Local authority programme targeting residents with low digital skills in Greater Manchester.' }] },
      whyInclude:"Jack represents 13 million people the GOV.UK digital journey was not designed for. Including him in usability testing answers one specific question: what would it take for the platform to redirect someone who cannot create an account to the right alternative — without requiring them to already know it exists?",
    },
    {
      key: 'sam', name: 'Sam', age: 72, persona: 'Older Salford resident', image: '/assets/sam.png',
      stepOutcomes: [{ step:1, status:'friction' }, { step:2, status:'hard-stop' }, { step:3, status:'friction' }, { step:4, status:'clean' }],
      flags: [
        { step:1, severity:'soft', label:"Wasn't expecting to need a digital account", detail:"Sam's first instinct is to phone. The shift to digital-first has happened without a corresponding awareness campaign." },
        { step:2, severity:'hard', label:'Cannot complete identity verification through either primary route', detail:"NFC scanning requires a phone she can't use for this. Security questions require digital confidence she doesn't have." },
        { step:3, severity:'soft', label:'30-minute session timeout risks losing all progress', detail:"Sam is likely to pause. If she pauses without saving, all progress is lost and the session must restart including MFA." },
      ],
      population: { stat:'Sam represents an estimated 2.5 million people aged 65 and over in the UK who are online but cannot confidently complete everyday digital tasks like this.', source:'Age UK, Offline and Overlooked, 2024' },
      recruitment: { summary:"People matching Sam's profile are reachable through older people's organisations in Greater Manchester.", contacts:[{ org:'Age UK Salford — Vanda Groves (direct contact established)', detail:'Primary research contact already established. Age UK Salford works directly with older residents in the Salford area.' }, { org:'Age Friendly Salford programme', detail:'Partnership programme documented in our secondary research. Participants match Sam\'s digital confidence profile.' }] },
      whyInclude:"Sam reaches Step 3 before friction makes drop-off likely. Including her in usability testing would identify exactly where the multi-section form and session timeout cause her to pause, seek help, or abandon — and what changes would allow someone with her digital confidence to complete the claim without support.",
    },
    {
      key: 'tosin', name: 'Tosin', age: 34, persona: 'Migrant woman, Salford', image: '/assets/tosin.png',
      stepOutcomes: [{ step:1, status:'clean' }, { step:2, status:'friction' }, { step:3, status:'friction' }, { step:4, status:'friction' }],
      flags: [
        { step:2, severity:'soft', label:"Identity check doesn't fit her device or document situation", detail:"Her phone likely cannot complete NFC scanning. No UK credit history for security questions. Non-UK passport acceptance is inconsistent." },
        { step:3, severity:'soft', label:'The form may not capture her full entitlement', detail:"Universal Credit includes extra amounts and exemptions only awarded if the form asks, or if the claimant already knows the rules. The digital claim often does not ask. An omission here can result in a wrong award and later benefit debt." },
        { step:4, severity:'soft', label:'Legal declaration is the most demanding English in the entire process', detail:"The submission declaration requires attesting to formal legal terms. For a claimant navigating in a second language, this is where the gap between the language the state uses and the language the citizen has is widest." },
      ],
      population: { stat:'Tosin sits at the intersection of several documented groups: the 117,639 people from non-biometric-passport countries the government cannot verify; claimants the digital form fails to ask the right questions of; and the 880,000 people in England and Wales who do not speak English well. She represents no single statistic — the people most at risk are those who fall into more than one of these at once.', source:'ONS Census 2021; Companies House EIA 2025; CPAG 2023' },
      recruitment: { summary:"People matching Tosin's profile are reachable through migrant and refugee community organisations in Salford.", contacts:[{ org:'Afrocats / Mahtsen, Salford — Edel Fernandez Vanaclocha (primary research already conducted)', detail:'Primary research was conducted here on 25 May 2026. Edel is a direct contact and has invited further collaboration.' }, { org:'Salford Refugee Community Organisation', detail:'Works with recently arrived migrants in Salford on digital access and civic services.' }] },
      whyInclude:"Tosin is the only persona who reaches the final step yet meets friction at every stage, and for a different reason each time: a device and document mismatch at identity verification, a form that fails to establish her full entitlement, and dense legal language at submission. Her significance is that no single barrier stops her, but the accumulation makes a costly error likely. A usability session with a participant like Tosin would show where this compounding friction becomes a genuine risk of a wrong award, and which fixes — across identity, form design, and language — would most reduce it.",
    },
    {
      key: 'jane', name: 'Jane', age: 28, persona: 'Person with a learning disability', image: '/assets/jane.png',
      stepOutcomes: [{ step:1, status:'clean' }, { step:2, status:'friction' }, { step:3, status:'hard-stop' }, { step:4, status:'friction' }],
      flags: [
        { step:2, severity:'soft', label:'Error recovery is unclear if the identity check fails', detail:"A failed face scan produces an abstract error message. Mencap documents that abstract errors typically end the attempt for people with learning disabilities." },
        { step:3, severity:'hard', label:'30-minute timeout resets multi-factor authentication from scratch', detail:"Every pause to check with a support worker risks a session end. Re-entry requires MFA from scratch. Each return is a fresh barrier." },
        { step:4, severity:'soft', label:'Claimant commitment must be signed within 7 days or claim closes', detail:"Written in formal legal English. Jane needs time and support to understand it. The deadline creates real risk of the claim closing before she can accept." },
      ],
      population: { stat:'Jane represents approximately 1.5 million people in the UK with a learning disability — for whom session timeouts, abstract error messages, and formal language create documented, systemic barriers.', source:'Mencap, 2024' },
      recruitment: { summary:"People matching Jane's profile are reachable through learning disability organisations and supported-living services.", contacts:[{ org:'Mencap — local groups and partnership boards', detail:'Sessions should be co-designed with Mencap to ensure appropriate support is in place.' }, { org:'Salford Foundation — supported employment services', detail:'Works with adults with learning disabilities in supported employment in the Salford area.' }] },
      whyInclude:"Jane completes step 1 cleanly — but the step 3 session timeout creates a structural barrier affecting everyone who needs to work at a slower pace. Mencap's position is explicit: needing a support worker to complete a standard civic process is a design failure. A usability session with Jane would answer one specific question: what session architecture would allow interrupted completion without penalty?",
    },
  ],
}
