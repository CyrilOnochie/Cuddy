export const STEP4 = {
  stepNumber: 4, platform: 'GOV.UK', title: 'Submit your claim', totalSteps: 4,
  requirements: [
    { id: 'declaration', icon: 'declaration', caption: 'A signed legal declaration confirming the information you have provided is accurate and that you understand the consequences of providing false information' },
    { id: 'interview', icon: 'interview', caption: 'Attendance at a Jobcentre Plus appointment within 7 days of submitting, where you will sign a claimant commitment outlining the conditions of your award' },
  ],
  flags: [
    {
      personaKey: 'tosin',
      represents: 'Tosin represents the 880,000 people in England and Wales who do not speak English well',
      representsSource: 'ONS Census 2021',
      whyInclude: 'Observing users like Tosin in a usability session at this step would identify how she interprets the legal declaration she is required to sign, whether she understands what she is agreeing to and the consequences of that agreement, how she responds to the formal language of the claimant commitment, and whether the 7-day Jobcentre appointment requirement is clearly communicated and understood.',
      items: [
        { severity: 'soft', cardLabel: 'The legal declaration is the most demanding English in the entire process', plainText: "The submission declaration requires attesting to formal legal terms. For a claimant navigating in a second language, this is where the gap between the language the state uses and the language the citizen has is widest.", stat: 'Shared by the 880,000 people in England and Wales who do not speak English well', source: 'ONS Census 2021' },
        { severity: 'workaround', cardLabel: 'A work coach can help at the interview — if she gets there', plainText: "The Jobcentre interview gives Tosin a chance to speak with someone face to face. But only if she has successfully submitted first — meaning she has agreed to a legal declaration she may not have fully understood.", stat: 'Help to Claim uptake among migrant communities is lower without active signposting', source: 'Citizens Advice, Help to Claim programme documentation, 2020' },
      ],
    },
    {
      personaKey: 'jane',
      whyInclude: 'Observing users like Jane in a usability session at this step would identify whether she understands what the legal declaration requires her to confirm, how she interprets the claimant commitment and the 7-day appointment deadline, what happens if she misses that window because the consequence was not communicated plainly enough, and whether she needs a support worker for any of this or if the language allows her to confidently complete this step by herself.',
      items: [
        { severity: 'soft', cardLabel: 'The claimant commitment must be signed within 7 days or the claim closes', plainText: "The commitment is written in formal legal English. Jane needs time and her support worker's help to understand what she is agreeing to. The seven-day deadline under formal language conditions creates real risk of the claim closing before she can accept.", stat: 'Mencap: needing a support worker to complete a standard civic process is a design failure, not a solution', source: 'Mencap position statement on digital exclusion' },
        { severity: 'workaround', cardLabel: 'Support worker can attend the Jobcentre interview', plainText: "Jane's support worker can attend the interview and help her understand the commitment. But as Mencap explicitly states: assistance that should not be necessary for a standard civic process is not a solution — it is evidence of a design failure.", stat: 'Approximately 1.5 million people in the UK have a learning disability', source: 'Mencap, 2024' },
      ],
    },
  ],
}
