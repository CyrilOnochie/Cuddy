export const STEP3 = {
  stepNumber: 3, platform: 'GOV.UK', title: 'Complete your to-do list', totalSteps: 4,
  requirements: [
    { id: 'nicard', icon: 'nicard', caption: 'Your National Insurance number, to link your claim to your tax and employment records' },
    { id: 'bank', icon: 'bank', caption: 'Your bank sort code and account number, so Universal Credit payments can be made directly to you' },
    { id: 'housing', icon: 'housing', caption: 'Your landlord\'s name and address, and details of your tenancy agreement, to calculate any housing costs element' },
  ],
  flags: [
    {
      personaKey: 'sam',
      whyInclude: 'Observing users like Sam in a usability session at this step would identify how she responds when the session times out, whether she understands her progress may be saved, how long re-authentication takes her on return, and at what point — if any — the complexity and length of the form causes her to seek help or stop altogether.',
      items: [
        { severity: 'soft', cardLabel: 'Long multi-section form exceeds her digital confidence', plainText: "The to-do list contains multiple sections — housing, income, health, savings — each requiring detailed answers. Citizens Advice confirmed the complexity is causing people to drop out of Universal Credit altogether — not because they are ineligible, but because the process is not completable without support.", stat: 'Citizens Advice found digital complexity is causing people to abandon UC claims — not because they are ineligible, but because the process is not completable without support', source: 'Citizens Advice, written evidence to the House of Commons Work and Pensions Committee' },
        { severity: 'soft', cardLabel: '30-minute session timeout risks losing all progress', plainText: "If Sam pauses to check a document or takes a break, the session closes. The account saves details — but only if she pressed save first, which she may not know. For someone at the limit of her digital confidence, a timeout may mean a permanent end to the attempt.", stat: 'Sessions automatically close after 30 minutes of inactivity', source: 'Citizens Advice, How to apply for Universal Credit, 2024' },
      ],
    },
    {
      personaKey: 'tosin',
      represents: 'Tosin represents claimants the digital form fails to ask the right questions of — leaving them to miss entitlements they legally qualify for, and risking an incorrect award and later benefit debt',
      representsSource: 'CPAG, 2023',
      whyInclude: 'Observing users like Tosin in a usability session at this step would reveal whether the form gives her a fair chance to establish her full entitlement, whether it asks the questions needed to identify any extra amounts or exemptions she qualifies for, or whether it leaves her to self-identify circumstances she may not know are relevant, and whether she completes the step believing her claim is correct when it may be missing money she is owed.',
      items: [
        { severity: 'soft', cardLabel: 'The form does not ask the questions that would establish her full entitlement', plainText: "Universal Credit includes extra amounts and exemptions a claimant only receives if the form asks, or if they already know the rules well enough to self-identify. The digital claim often does not ask, so people miss money they are legally owed. An error or omission here can result in a wrong award and later benefit debt.", stat: 'Shared by claimants the digital form fails to ask the right questions of, so they miss entitlements they qualify for', source: 'CPAG, 2023' },
      ],
    },
    {
      personaKey: 'jane',
      whyInclude: 'Observing users like Jane in a usability session at this step would identify how she manages the need to pause and check information with a support worker, whether the session timeout and MFA reset causes her to lose progress, how many times she can re-authenticate before giving up, and whether the multi-section form is navigable without assistance across multiple sessions.',
      items: [
        { severity: 'hard', cardLabel: 'A 30-minute timeout creates a new barrier on every return', plainText: "If Jane pauses to check with her support worker or takes a break, the session ends. Returning means completing multi-factor authentication from scratch. Each attempt is a fresh start. For someone who works at a slower pace, the timeout is not a one-time friction — it is a recurring gate.", stat: 'Over half of disabled claimants who did register online needed assistance doing so', source: 'House of Commons Work and Pensions Committee, 2019' },
      ],
    },
  ],
}
