export const STEP1 = {
  stepNumber: 1, platform: 'GOV.UK', title: 'Create an account', totalSteps: 4,
  requirements: [
    { id: 'email', icon: 'email', caption: 'An email address, used to create your GOV.UK One Login and receive notifications about your claim' },
    { id: 'mobile', icon: 'mobile', caption: 'A UK mobile number, to get a security code by text' },
  ],
  flags: [
    {
      personaKey: 'jack',
      whyInclude: 'Observing users like Jack in a usability session at this step would identify at exactly what point the email requirement causes drop-off, whether participants are aware a phone or Jobcentre alternative exists, how easily they can locate that alternative from the point of failure, and how much support they need to proceed at all.',
      items: [
        { severity: 'hard', cardLabel: 'No email address', plainText: "Jack doesn't have an email address. The very first screen requires one — the account cannot be created and the claim cannot begin. This is not a navigation problem. It is a prerequisite he cannot meet.", stat: '13 million UK adults — around 1 in 4 — have very low digital confidence', source: 'Lloyds Bank UK Consumer Digital Index, 2023' },
        { severity: 'workaround', cardLabel: 'A phone and Jobcentre route exists — but is not promoted from the failure point', plainText: "GOV.UK does let people apply by phone or at a Jobcentre. But the Cabinet Office's digital-by-default policy explicitly discourages promotion of non-digital routes to protect digital take-up. Jack would need to already know to ask.", stat: 'The telephone claim option is not always widely publicised, meaning many vulnerable people rely heavily on local charities to find out it is an option', source: 'CPAG, Non-Digital Universal Credit, 2023' },
      ],
    },
    {
      personaKey: 'sam',
      whyInclude: 'Observing users like Sam in a usability session at this step would identify whether she expects to need a digital account before accessing the service, how easily she can recall and input her email address, whether the purpose of creating an account is clearly communicated by the interface, and how she responds if she encounters an error.',
      items: [
        { severity: 'soft', cardLabel: "Sam wasn't expecting to need a digital account", plainText: "Sam's first instinct is to phone. The platform provides no explanation of why an account is needed. The Age Friendly Salford report documented older participants who were unaware that services they assumed were phone or in-person had moved primarily online.", stat: "2.5 million people aged 65 and over who are online still can't confidently complete everyday digital tasks", source: 'Age UK, Offline and Overlooked, 2024' },
        { severity: 'workaround', cardLabel: 'Same phone and Jobcentre route — with the same discoverability problem', plainText: "Sam would also need to discover this route herself. The Jobcentre option may require travel and a booked appointment — additional barriers for a 72-year-old without confident transport access or digital booking skills.", stat: '22% of people who completed the online claim still needed someone else\'s help to do it', source: 'DWP claimant data, reported HuffPost UK, 2019' },
      ],
    },
  ],
}
