// GovUkMockup — displays the GOV.UK step screen as a read-only reference.
// The Continue/Submit buttons are removed: this is a display of what the step
// looks like, not an interactive form. Removing the button prevents user confusion.

const F = { b:"'DM Sans',sans-serif" }

export default function GovUkMockup({ stepNumber }) {
  return (
    <div style={{ border:'1px solid rgba(255,255,255,0.1)', borderRadius:8, overflow:'hidden', boxShadow:'0 4px 20px rgba(0,0,0,0.4)' }}>
      <div style={{ background:'#0b0c0c', padding:'10px 16px', display:'flex', alignItems:'center', gap:8 }}>
        <svg width="22" height="17" viewBox="0 0 104 80" fill="white"><path d="M52 4 L36 32 L12 18 L18 46 L86 46 L92 18 L68 32 Z"/><rect x="14" y="50" width="76" height="10" rx="2"/><rect x="10" y="64" width="84" height="16" rx="3"/></svg>
        <span style={{ color:'white', fontFamily:F.b, fontWeight:600, fontSize:14 }}>GOV.UK</span>
      </div>
      <div style={{ height:3, background:'#1d70b8' }} />

      {stepNumber === 1 && (
        <div style={{ background:'white', padding:'20px' }}>
          <p style={{ fontFamily:F.b, fontSize:12, color:'#505a5f', marginBottom:6 }}>Apply for Universal Credit</p>
          <h3 style={{ fontFamily:F.b, fontWeight:700, fontSize:20, color:'#0b0c0c', margin:'0 0 14px' }}>Create your GOV.UK One Login</h3>
          <label style={{ display:'block', fontFamily:F.b, fontSize:14, fontWeight:600, color:'#0b0c0c', marginBottom:5 }}>Email address</label>
          <div style={{ border:'2px solid #0b0c0c', borderRadius:4, padding:'9px 12px', marginBottom:14, fontFamily:F.b, fontSize:14, color:'#999' }}>name@example.com</div>
          <label style={{ display:'block', fontFamily:F.b, fontSize:14, fontWeight:600, color:'#0b0c0c', marginBottom:5 }}>Mobile number</label>
          <div style={{ border:'2px solid #0b0c0c', borderRadius:4, padding:'9px 12px', fontFamily:F.b, fontSize:14, color:'#999' }}>07700 900000</div>
        </div>
      )}

      {stepNumber === 2 && (
        <div style={{ background:'white', padding:'20px' }}>
          <p style={{ fontFamily:F.b, fontSize:12, color:'#505a5f', marginBottom:6 }}>Apply for Universal Credit</p>
          <h3 style={{ fontFamily:F.b, fontWeight:700, fontSize:20, color:'#0b0c0c', margin:'0 0 14px' }}>How do you want to prove your identity?</h3>
          {[
            ['Use the GOV.UK One Login app','Scan your ID and take a selfie video', true],
            ['Answer security questions online','You\'ll need a UK bank account and credit history', false],
            ['Get help at a Post Office','Take photo ID to a branch', false],
          ].map(([l,s,sel],i) => (
            <div key={i} style={{ display:'flex', gap:10, padding:'10px 12px', border:`2px solid ${sel?'#1d70b8':'#b1b4b6'}`, borderRadius:4, marginBottom:10 }}>
              <div style={{ width:18, height:18, borderRadius:'50%', border:'2px solid #0b0c0c', flexShrink:0, marginTop:2, display:'flex', alignItems:'center', justifyContent:'center' }}>
                {sel && <div style={{ width:9, height:9, borderRadius:'50%', background:'#0b0c0c' }} />}
              </div>
              <div>
                <p style={{ fontFamily:F.b, fontWeight:600, fontSize:14, color:'#0b0c0c', margin:0 }}>{l}</p>
                <p style={{ fontFamily:F.b, fontSize:12, color:'#505a5f', margin:0 }}>{s}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {stepNumber === 3 && (
        <div style={{ background:'white', padding:'20px' }}>
          <p style={{ fontFamily:F.b, fontSize:12, color:'#505a5f', marginBottom:6 }}>Apply for Universal Credit</p>
          <h3 style={{ fontFamily:F.b, fontWeight:700, fontSize:20, color:'#0b0c0c', margin:'0 0 12px' }}>Complete your to-do list</h3>
          {['About you','Your housing','Your income','Your savings','Your health'].map((s,i) => (
            <div key={i} style={{ display:'flex', justifyContent:'space-between', padding:'10px 0', borderBottom:'1px solid #f3f2f1' }}>
              <span style={{ fontFamily:F.b, fontSize:14, color:'#1d70b8', fontWeight:500 }}>{s}</span>
              <span style={{ fontFamily:F.b, fontSize:12, color:'#505a5f' }}>{i===0?'Completed':'Not started'}</span>
            </div>
          ))}
          <p style={{ fontFamily:F.b, fontSize:12, color:'#d4351c', marginTop:12 }}>You will be signed out after 30 minutes of inactivity.</p>
        </div>
      )}

      {stepNumber === 4 && (
        <div style={{ background:'white', padding:'20px' }}>
          <p style={{ fontFamily:F.b, fontSize:12, color:'#505a5f', marginBottom:6 }}>Apply for Universal Credit</p>
          <h3 style={{ fontFamily:F.b, fontWeight:700, fontSize:20, color:'#0b0c0c', margin:'0 0 12px' }}>Submit your claim</h3>
          <div style={{ background:'#f3f2f1', borderRadius:4, padding:'12px', marginBottom:14 }}>
            <p style={{ fontFamily:F.b, fontSize:13, color:'#0b0c0c', margin:0, lineHeight:1.6 }}>
              <strong>Declaration:</strong> I declare that the information I have given is correct and complete to the best of my knowledge and belief.
            </p>
          </div>
          <div style={{ display:'flex', gap:8, alignItems:'flex-start' }}>
            <div style={{ width:18, height:18, border:'2px solid #0b0c0c', borderRadius:2, flexShrink:0, marginTop:2 }} />
            <span style={{ fontFamily:F.b, fontSize:14, color:'#0b0c0c' }}>I agree to this declaration</span>
          </div>
        </div>
      )}
    </div>
  )
}
