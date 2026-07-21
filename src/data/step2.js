export const STEP2 = {
  stepNumber: 2, platform: 'GOV.UK', title: 'Verify your identity', totalSteps: 4,
  requirements: [
    { id: 'passport', icon: 'passport', caption: 'A valid passport, UK driving licence, or similar photo ID, to confirm your identity during verification' },
    { id: 'facescan', icon: 'facescan', caption: 'A smartphone with NFC capability, to scan your document and record a short selfie video for biometric matching' },
  ],
  flags: [
    {
      personaKey: 'sam',
      whyInclude: 'Observing users like Sam in a usability session at this step would identify which verification route she attempts first, how far she gets before it becomes unnavigable, whether she understands there are alternative routes available, and whether the failure state gives her enough information to try a different route or whether she simply abandons.',
      items: [
        { severity: 'hard', cardLabel: 'Cannot complete online identity verification through either primary route', plainText: "The app route requires NFC-capable scanning — Sam's basic smartphone is used only for calls and texts. The security questions route requires navigating UK credit records online, which exceeds her digital confidence. Neither route is viable.", stat: '2.5 million people aged 65 and over online still cannot confidently complete tasks like this', source: 'Age UK, Offline and Overlooked, 2024' },
        { severity: 'workaround', cardLabel: 'The Post Office route was designed for her — but reaching it requires getting here first', plainText: "The Post Office route is the right solution for Sam. But it requires navigating the online journey far enough to obtain a GOV.UK reference number, then understanding it must be taken to a branch. Citizens Advice found only 38% of those who attempt online identity verification can complete it.", stat: 'Over half of disabled claimants who registered online needed assistance doing so', source: 'House of Commons Work and Pensions Committee, 2019' },
      ],
    },
    {
      personaKey: 'tosin',
      represents: 'Tosin represents 117,639 individuals from 112 non-biometric-passport countries the government cannot verify online',
      representsSource: 'Companies House Equality Impact Assessment, 2025',
      whyInclude: 'Observing users like Tosin in a usability session at this step would identify whether her device can complete the NFC face-scanning requirement, whether the identity routes accommodate documents issued outside the UK, how she navigates between multiple verification options when no route clearly fits her situation, and whether she reaches a point where no route is available to her without in-person support.',
      items: [
        { severity: 'soft', cardLabel: "Identity check doesn't match her device or document situation", plainText: "Tosin's basic smartphone likely cannot complete NFC document scanning. As a recent arrival she has no UK credit history for the security questions route. Non-UK biometric passport acceptance through the app route is inconsistent.", stat: 'Shared by the 117,639 people from non-biometric-passport countries the government\'s own assessment cannot verify', source: 'Companies House Equality Impact Assessment, 2025' },
        { severity: 'workaround', cardLabel: 'Post Office route exists but requires understanding which route applies to her situation', plainText: "The platform does not clearly explain which route is appropriate for which document type or device. A person in Tosin's situation must determine this themselves — without guidance written for her circumstances.", stat: 'At Afrocats/Mahtsen, a community member was found to have been without UC she was entitled to for months due to this exact barrier', source: 'Afrocats/Mahtsen community observation, 25 May 2026 (primary research)' },
      ],
    },
    {
      personaKey: 'jane',
      whyInclude: 'Observing users like Jane in a usability session at this step would identify how she responds if the face scan fails and the error message is abstract, whether she can identify and navigate to an alternative verification route without support, and how many attempts she makes before seeking help or abandoning.',
      items: [
        { severity: 'soft', cardLabel: 'Error recovery is unclear if the identity check fails', plainText: "Jane's barrier is not the check itself — if it works first time, she can likely complete it. The barrier is what happens if the face scan fails. GOV.UK error messages are documented as abstract, without plain-language recovery guidance.", stat: 'Mencap (2020) documents that abstract error messages without plain-language guidance typically end the attempt for people with learning disabilities', source: 'Mencap, Easy Read Research, 2020' },
      ],
    },
  ],
}
