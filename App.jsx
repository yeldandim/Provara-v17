import { useState, useEffect, useRef } from 'react'
import imgFounder from './founder.jpg'

/* ═══════════════════════════════════════
   BRAND CONSTANTS
═══════════════════════════════════════ */
const AMBER = '#ED6F19'
const INK   = '#1A1614'
const DARK  = '#111110'
const WHITE = '#FFFFFF'

/* ═══════════════════════════════════════
   LOGO — h=72 navbar, h=72 hero, h=72 footer
═══════════════════════════════════════ */
function Logo({ h = 72, dark = false }) {
  const ink = dark ? WHITE : INK
  return (
    <svg height={h} viewBox="0 0 800 200" fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display:'block', flexShrink:0 }}
      role="img" aria-label="Provara">
      <path fill={ink} d="M133.55,75.93a17.35,17.35,0,0,1,7.78,6.47,19.75,19.75,0,0,1,0,20,17.22,17.22,0,0,1-7.78,6.5,29.07,29.07,0,0,1-11.92,2.26H109.74v15.19H100V73.68h21.66A29.24,29.24,0,0,1,133.55,75.93Zm-2.67,24.22a9.45,9.45,0,0,0,3.31-7.75,9.45,9.45,0,0,0-3.31-7.74q-3.32-2.72-9.7-2.71H109.74v20.91h11.44Q127.57,102.86,130.88,100.15Z"/>
      <path fill={ink} d="M224.36,126.32,213.6,110.9a17.14,17.14,0,0,1-2,.08H199.69v15.34h-9.78V73.68h21.66a29.17,29.17,0,0,1,11.92,2.25,17.37,17.37,0,0,1,7.79,6.47,18.13,18.13,0,0,1,2.7,10,17.83,17.83,0,0,1-2.89,10.23,17.18,17.18,0,0,1-8.31,6.39l12.11,17.3Zm-3.54-41.66q-3.3-2.72-9.7-2.71H199.69v21h11.43q6.39,0,9.7-2.74a9.55,9.55,0,0,0,3.31-7.79A9.42,9.42,0,0,0,220.82,84.66Z"/>
      <path fill={ink} d="M291.06,123.58a26,26,0,0,1-10.15-9.7,28,28,0,0,1,0-27.76,26,26,0,0,1,10.15-9.7,31.93,31.93,0,0,1,29,0,26,26,0,0,1,10.16,9.67,28.13,28.13,0,0,1,0,27.82,26,26,0,0,1-10.16,9.67,31.93,31.93,0,0,1-29,0Zm24-7.45a17.1,17.1,0,0,0,6.61-6.62,20,20,0,0,0,0-19,17.1,17.1,0,0,0-6.61-6.62,20.15,20.15,0,0,0-19,0,17.1,17.1,0,0,0-6.61,6.62,20,20,0,0,0,0,19,17.1,17.1,0,0,0,6.61,6.62,20.15,20.15,0,0,0,19,0Z"/>
      <path fill={AMBER} d="M426.89,73.68,404,126.32h-9.63l-23-52.64h10.6l17.53,40.61,17.67-40.61Z"/>
      <polygon fill={AMBER} points="506.37 126.32 516.53 126.32 492.77 73.68 483.14 73.68 459.45 126.32 469.53 126.32 487.88 83.45 506.37 126.32"/>
      <path fill={ink} d="M593.77,126.32,583,110.9a17.24,17.24,0,0,1-2,.08H569.1v15.34h-9.78V73.68H581a29.21,29.21,0,0,1,11.92,2.25,17.37,17.37,0,0,1,7.79,6.47,18.13,18.13,0,0,1,2.7,10,17.83,17.83,0,0,1-2.89,10.23,17.18,17.18,0,0,1-8.31,6.39l12.11,17.3Zm-3.54-41.66q-3.3-2.72-9.7-2.71H569.1v21h11.43q6.39,0,9.7-2.74a9.55,9.55,0,0,0,3.31-7.79A9.42,9.42,0,0,0,590.23,84.66Z"/>
      <polygon fill={ink} points="689.87 126.32 700.03 126.32 676.27 73.68 666.64 73.68 642.95 126.32 653.03 126.32 671.38 83.45 689.87 126.32"/>
    </svg>
  )
}

/* ═══════════════════════════════════════
   VA MONOGRAM
   ViewBox precisely measured from paths:
   V left: 371.37  V right: 426.89
   A left: 459.45  A right: 516.53
   Top: 73.68      Bottom: 126.32
═══════════════════════════════════════ */
function VA({ size = 32, opacity = 1, color = AMBER }) {
  return (
    <svg
      width={size * (152/60)}
      height={size}
      viewBox="368 70 152 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display:'block', opacity, flexShrink:0 }}
      aria-hidden="true"
    >
      <path fill={color} d="M426.89,73.68,404,126.32h-9.63l-23-52.64h10.6l17.53,40.61,17.67-40.61Z"/>
      <polygon fill={color} points="506.37 126.32 516.53 126.32 492.77 73.68 483.14 73.68 459.45 126.32 469.53 126.32 487.88 83.45 506.37 126.32"/>
    </svg>
  )
}

/* ═══════════════════════════════════════
   SCROLL REVEAL
═══════════════════════════════════════ */
function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('in'); obs.disconnect() } },
      { threshold: 0.07 }
    )
    obs.observe(el); return () => obs.disconnect()
  }, [])
  return ref
}

const PAD = 'clamp(24px, 5.5vw, 88px)'
const MW  = '1180px'
const SEC = 'clamp(72px, 8vw, 112px)'

/* ═══════════════════════════════════════
   NAVBAR
   Logo hidden over hero (onDark=true).
   Fades in once scrolled past hero.
═══════════════════════════════════════ */
function Navbar() {
  const [sc, setSc] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const fn = () => setSc(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  const onDark = !sc
  const links = [
    ['Services','#services'],['P6 Scheduling','#scheduling'],
    ['Sectors','#sectors'],['Leadership','#leadership'],['Contact','#contact'],
  ]
  return (
    <header style={{
      position:'fixed', top:0, left:0, right:0, zIndex:200,
      height:'64px', padding:`0 ${PAD}`,
      display:'flex', alignItems:'center', justifyContent:'space-between',
      background: onDark ? 'rgba(17,17,16,.97)' : 'rgba(250,250,248,.97)',
      borderBottom: onDark ? '1px solid rgba(255,255,255,.08)' : '1px solid var(--rule)',
      backdropFilter:'blur(16px)',
      transition:'background .4s, border-color .4s',
    }}>
      {/* Logo hidden when over hero — hero has the logo at h=72 */}
      <a href="#" style={{
        textDecoration:'none',
        opacity: onDark ? 0 : 1,
        pointerEvents: onDark ? 'none' : 'auto',
        transition:'opacity .4s',
      }}>
        <Logo h={72} dark={false} />
      </a>
      <nav className="desk" style={{ display:'flex', gap:'32px', alignItems:'center' }}>
        {links.map(([l,h]) => (
          <a key={l} href={h} className={`nl ${onDark ? 'nl-w' : ''}`}>{l}</a>
        ))}
      </nav>
      <a href="#contact" className="btn-primary desk" style={{ padding:'10px 22px', fontSize:'12px' }}>
        Let's Talk
      </a>
      <button className="mob" onClick={() => setOpen(!open)}
        style={{ background:'none', border:'none', cursor:'pointer', padding:'8px', flexDirection:'column', gap:'5px' }}
        aria-label="Menu">
        {[0,1,2].map(i => (
          <span key={i} style={{
            display:'block', width:'20px', height:'1.5px',
            background: onDark ? 'rgba(255,255,255,.75)' : INK,
            transition:'all .3s',
            transform: open&&i===0 ? 'rotate(45deg) translate(4px,4px)' : open&&i===2 ? 'rotate(-45deg) translate(4px,-4px)' : 'none',
            opacity: open&&i===1 ? 0 : 1,
          }} />
        ))}
      </button>
      {open && (
        <div style={{
          position:'fixed', inset:0, top:'64px', background:'rgba(250,250,248,.99)',
          display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'28px', zIndex:199,
        }}>
          {links.map(([l,h]) => (
            <a key={l} href={h} className="nl" style={{ fontSize:'18px' }} onClick={() => setOpen(false)}>{l}</a>
          ))}
          <a href="#contact" className="btn-primary" onClick={() => setOpen(false)}>Let's Talk</a>
        </div>
      )}
    </header>
  )
}
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-18240151831"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'AW-18240151831');
</script>
/* ═══════════════════════════════════════
   HERO
═══════════════════════════════════════ */
function Hero() {
  return (
    <section style={{
      position:'relative', minHeight:'100vh', background:DARK,
      display:'flex', alignItems:'center', overflow:'hidden',
      padding:`80px ${PAD} 60px`,
    }}>
      <div className="va-bg" style={{
        position:'absolute', right:'-2%', top:'50%',
        transform:'translateY(-50%)', pointerEvents:'none',
      }}>
        <VA size={320} opacity={1} color="rgba(237,111,25,.11)" />
      </div>
      <div style={{
        position:'absolute', left:0, top:'15%', bottom:'15%', width:'3px',
        background:`linear-gradient(to bottom, transparent, ${AMBER} 30%, ${AMBER} 70%, transparent)`,
        opacity:.5,
      }} />
      <div style={{ position:'relative', zIndex:2, maxWidth:'680px' }}>
        <div className="h1" style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'36px' }}>
          <div style={{ width:'24px', height:'1.5px', background:AMBER, flexShrink:0 }} />
          <span style={{
            fontFamily:'var(--sans)', fontSize:'11px', fontWeight:500,
            letterSpacing:'.14em', textTransform:'uppercase', color:'rgba(255,255,255,.45)',
          }}>
            Construction Management · P6 Scheduling · Owner's Representation
          </span>
        </div>
        <div className="h2" style={{ marginBottom:'28px' }}>
          <Logo h={72} dark={true} />
        </div>
        <div className="hl" style={{ width:'40px', height:'2px', background:AMBER, marginBottom:'24px' }} />
        <p className="h3" style={{
          fontFamily:'var(--serif)', fontSize:'clamp(18px,2.2vw,26px)', fontWeight:400,
          lineHeight:1.55, color:'rgba(255,255,255,.65)', maxWidth:'540px', marginBottom:'36px',
        }}>
          Strategic construction leadership for projects that cannot afford failure.
        </p>
        <div className="h4" style={{ display:'flex', gap:'12px', flexWrap:'wrap', marginBottom:'52px' }}>
          <a href="#contact" className="btn-primary">Schedule a Consultation →</a>
          <a href="#services" className="btn-outline-w">View Services</a>
        </div>
        <div className="h5" style={{
          display:'flex', gap:'32px', alignItems:'center',
          paddingTop:'28px', borderTop:'1px solid rgba(255,255,255,.1)', flexWrap:'wrap',
        }}>
          {['Vision Aligned','Value Assured'].map(label => (
            <div key={label} style={{ display:'flex', alignItems:'center', gap:'9px' }}>
              <VA size={16} opacity={.8} />
              <span style={{
                fontFamily:'var(--sans)', fontSize:'11px', fontWeight:400,
                letterSpacing:'.1em', textTransform:'uppercase', color:'rgba(255,255,255,.35)',
              }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════
   SERVICES
═══════════════════════════════════════ */
const SVCS = [
  ["Owner's Representation","Independent owner-side advocacy through design, procurement, and construction. Your interests protected at every decision point — not your contractor's."],
  ["Construction Management","Full program oversight from groundbreaking through closeout: contractor coordination, schedule control, quality assurance, and cost management."],
  ["CPM / P6 Scheduling","Baseline schedules, updates, and forensic analysis in Primavera P6 and MS Project. Legally defensible, field-executable, and written in plain English."],
  ["Capital Project Advisory","Strategic guidance on delivery methods, budget structuring, procurement strategy, and risk allocation for major capital investments."],
  ["Development Consulting","Pre-development advisory covering feasibility, entitlement strategy, design management, and delivery planning for ground-up development."],
  ["Due Diligence & Risk Oversight","Independent technical review, project audits, and risk assessments for investors, lenders, and acquirers evaluating construction exposure."],
  ["Program Management","Multi-site, multi-phase oversight with standardized reporting, governance, and controls — from a single accountable point of contact."],
  ["Facilities & Asset Strategy","Long-range planning, operational readiness, and asset management frameworks that protect the value of built environments over time."],
]

function Services() {
  const rH = useReveal()
  return (
    <section id="services" style={{ background:'var(--off)', padding:`${SEC} ${PAD}`, borderBottom:'1px solid var(--rule)' }}>
      <div style={{ maxWidth:MW, margin:'0 auto' }}>
        <div ref={rH} className="rv" style={{
          display:'grid', gridTemplateColumns:'260px 1fr',
          gap:'clamp(24px,4vw,72px)', marginBottom:'48px',
          paddingBottom:'32px', borderBottom:`2px solid ${INK}`,
        }}>
          <div>
            <span className="lbl" style={{ marginBottom:'8px' }}>Services</span>
            <h2 style={{ fontFamily:'var(--serif)', fontWeight:400, fontSize:'clamp(26px,3vw,38px)', lineHeight:1.15, color:'var(--ink)', letterSpacing:'-.02em' }}>What We Do</h2>
          </div>
          <p style={{ fontFamily:'var(--sans)', fontWeight:400, fontSize:'15px', lineHeight:1.75, color:'var(--mid)', alignSelf:'end' }}>
            Every engagement draws on multiple disciplines. Whether you need a single specialist service or end-to-end construction leadership, Provara brings the same rigour to every scope.
          </p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0' }} className="g2">
          {SVCS.map(([title, body], i) => {
            const r = useReveal()
            const isRight = i%2===1
            return (
              <div key={title} ref={r} className={`rv d${(i%4)+1}`} style={{
                padding:'28px 0', borderBottom:'1px solid var(--rule)',
                borderLeft: isRight ? '1px solid var(--rule)' : 'none',
                paddingLeft: isRight ? '40px' : '0',
                paddingRight: isRight ? '0' : '40px',
              }}>
                <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'10px' }}>
                  <VA size={14} opacity={.55} />
                  <h3 style={{ fontFamily:'var(--sans)', fontWeight:500, fontSize:'15px', color:'var(--ink)', lineHeight:1.2 }}>{title}</h3>
                </div>
                <p style={{ fontFamily:'var(--sans)', fontWeight:400, fontSize:'14px', lineHeight:1.75, color:'var(--mid)', margin:0, paddingLeft:'22px' }}>{body}</p>
              </div>
            )
          })}
        </div>
        <div style={{ marginTop:'36px' }}>
          <a href="#contact" className="btn-primary">Request a Consultation →</a>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════
   SCHEDULING
═══════════════════════════════════════ */
const SCHED = [
  ['CPM Schedule Development','Baseline schedules built to Critical Path Method standards — activity-sequenced, resource-loaded, and structured to withstand owner, lender, and contractor review.'],
  ['Primavera P6 Expert Delivery','Expert scheduling in Primavera P6 and MS Project. Schedules your field team can execute and your PM can defend in any review meeting.'],
  ['Schedule Updates & Maintenance','Periodic updates with variance analysis, look-ahead windows, and clear narrative reporting written in plain English — not just Gantt charts.'],
  ['Delay Analysis & Claims Support','Forensic schedule analysis, time impact assessments, and contemporaneous documentation that protects your position in disputes and claims.'],
  ['Recovery Scheduling','When a project falls behind: identify critical path bottlenecks, model recovery scenarios, and build executable acceleration plans.'],
  ["Owner's Schedule Review","Independent audit of contractor-submitted schedules — finding logic errors and unrealistic durations before they compound into cost overruns."],
]

function Scheduling() {
  const rH = useReveal()
  return (
    <section id="scheduling" style={{ background:DARK, padding:`${SEC} ${PAD}` }}>
      <div style={{ maxWidth:MW, margin:'0 auto' }}>
        <div ref={rH} className="rv" style={{
          display:'grid', gridTemplateColumns:'260px 1fr',
          gap:'clamp(24px,4vw,72px)', marginBottom:'48px',
          paddingBottom:'32px', borderBottom:'2px solid rgba(255,255,255,.2)',
        }}>
          <div>
            <span className="lbl" style={{ marginBottom:'8px' }}>Scheduling</span>
            <h2 style={{ fontFamily:'var(--serif)', fontWeight:400, fontSize:'clamp(26px,3vw,38px)', lineHeight:1.15, color:WHITE, letterSpacing:'-.02em' }}>P6 Scheduling Services</h2>
          </div>
          <div style={{ alignSelf:'end' }}>
            <p style={{ fontFamily:'var(--sans)', fontWeight:400, fontSize:'15px', lineHeight:1.75, color:'rgba(255,255,255,.55)', marginBottom:'16px' }}>
              Most schedules satisfy a contract requirement, not manage a project. We build CPM and P6 schedules that are field-executable, legally defensible, and genuinely useful — from bid phase through closeout.
            </p>
            <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
              <VA size={16} opacity={.7} />
              <span style={{ fontFamily:'var(--sans)', fontSize:'11px', fontWeight:400, letterSpacing:'.1em', textTransform:'uppercase', color:'rgba(255,255,255,.35)' }}>
                Primavera P6 · CPM · MS Project · Delay Analysis
              </span>
            </div>
          </div>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0' }} className="g2">
          {SCHED.map(([title, body], i) => {
            const r = useReveal()
            const isRight = i%2===1
            return (
              <div key={title} ref={r} className={`rv d${(i%3)+1}`} style={{
                padding:'28px 0', borderBottom:'1px solid rgba(255,255,255,.1)',
                borderLeft: isRight ? '1px solid rgba(255,255,255,.1)' : 'none',
                paddingLeft: isRight ? '40px' : '0',
                paddingRight: isRight ? '0' : '40px',
              }}>
                <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'10px' }}>
                  <VA size={14} opacity={.6} />
                  <h3 style={{ fontFamily:'var(--sans)', fontWeight:500, fontSize:'15px', color:WHITE, lineHeight:1.2 }}>{title}</h3>
                </div>
                <p style={{ fontFamily:'var(--sans)', fontWeight:400, fontSize:'14px', lineHeight:1.75, color:'rgba(255,255,255,.5)', margin:0, paddingLeft:'22px' }}>{body}</p>
              </div>
            )
          })}
        </div>
        <div style={{
          marginTop:'2px', padding:'28px 32px',
          background:'rgba(237,111,25,.1)', borderTop:`2px solid ${AMBER}`,
          display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'20px',
        }}>
          <p style={{ fontFamily:'var(--serif)', fontWeight:400, fontSize:'clamp(14px,1.4vw,18px)', color:'rgba(255,255,255,.7)', margin:0, maxWidth:'560px' }}>
            Every schedule includes a written narrative, logic summary, and critical path explanation in plain English — not just a Gantt chart.
          </p>
          <a href="#contact" className="btn-primary" style={{ flexShrink:0 }}>Get a Schedule Quote →</a>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════
   SECTORS
═══════════════════════════════════════ */
const SECTORS = [
  ['Commercial Construction','Office, retail, and mixed-use development'],
  ['Self Storage Development','Ground-up development and conversion projects'],
  ['Healthcare Facilities','Complex regulated construction environments'],
  ['Capital Projects','Institutional and government-scale programs'],
  ['Industrial & Logistics','Warehouse, manufacturing, and distribution'],
  ['Mixed-Use Development','Phased, multi-stakeholder programs'],
  ['Institutional & Education','Campus, civic, and higher education programs'],
  ['Investment Due Diligence','Lender, investor, and acquirer risk review'],
]

function Sectors() {
  const rH = useReveal()
  return (
    <section id="sectors" style={{ background:'var(--off)', padding:`${SEC} ${PAD}`, borderBottom:'1px solid var(--rule)' }}>
      <div style={{ maxWidth:MW, margin:'0 auto' }}>
        <div ref={rH} className="rv" style={{
          display:'grid', gridTemplateColumns:'260px 1fr',
          gap:'clamp(24px,4vw,72px)', marginBottom:'40px',
          paddingBottom:'32px', borderBottom:`2px solid ${INK}`,
        }}>
          <div>
            <span className="lbl" style={{ marginBottom:'8px' }}>Sectors</span>
            <h2 style={{ fontFamily:'var(--serif)', fontWeight:400, fontSize:'clamp(26px,3vw,38px)', lineHeight:1.15, color:'var(--ink)', letterSpacing:'-.02em' }}>Who We Serve</h2>
          </div>
          <p style={{ fontFamily:'var(--sans)', fontWeight:400, fontSize:'15px', lineHeight:1.75, color:'var(--mid)', alignSelf:'end' }}>
            Owners, developers, lenders, general contractors, and institutional investors across complex project types and geographies.
          </p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1px', background:'var(--rule)' }} className="g4">
          {SECTORS.map(([name, sub], i) => {
            const r = useReveal()
            return (
              <div key={name} ref={r} className={`rv d${(i%4)+1}`}
                style={{ background:'var(--off)', padding:'24px 22px', borderTop:'2px solid transparent', transition:'border-color .25s, background .25s' }}
                onMouseEnter={e => { e.currentTarget.style.borderTopColor=AMBER; e.currentTarget.style.background=WHITE }}
                onMouseLeave={e => { e.currentTarget.style.borderTopColor='transparent'; e.currentTarget.style.background='var(--off)' }}>
                <div style={{ display:'flex', alignItems:'center', gap:'7px', marginBottom:'10px' }}>
                  <VA size={13} opacity={.4} />
                </div>
                <h3 style={{ fontFamily:'var(--sans)', fontWeight:500, fontSize:'14px', color:'var(--ink)', lineHeight:1.3, marginBottom:'5px' }}>{name}</h3>
                <p style={{ fontFamily:'var(--sans)', fontWeight:400, fontSize:'12px', color:'var(--ghost)', margin:0, lineHeight:1.5 }}>{sub}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════
   LEADERSHIP
   Photo: fixed 300px wide, 4:5 ratio,
   centred in its column with padding.
   Bio fills the rest cleanly.
═══════════════════════════════════════ */
function Leadership() {
  const r1 = useReveal(), r2 = useReveal()
  return (
    <section id="leadership" style={{ background:WHITE, borderBottom:`1px solid var(--rule)` }}>
      <div style={{ maxWidth:MW, margin:'0 auto', padding:`${SEC} ${PAD}` }}>

        {/* Section header — same pattern as other sections */}
        <div style={{
          display:'grid', gridTemplateColumns:'260px 1fr',
          gap:'clamp(24px,4vw,72px)', marginBottom:'48px',
          paddingBottom:'32px', borderBottom:`2px solid ${INK}`,
        }}>
          <div>
            <span className="lbl" style={{ marginBottom:'8px' }}>Leadership</span>
            <h2 style={{ fontFamily:'var(--serif)', fontWeight:400, fontSize:'clamp(26px,3vw,38px)', lineHeight:1.15, color:'var(--ink)', letterSpacing:'-.02em' }}>Who We Are</h2>
          </div>
          <p style={{ fontFamily:'var(--sans)', fontWeight:400, fontSize:'15px', lineHeight:1.75, color:'var(--mid)', alignSelf:'end' }}>
            Provara is led by a practitioner — not a generalist. Every client engagement is led directly by Mithul Yeldandi.
          </p>
        </div>

        {/* Leader row — photo left, bio right */}
        <div style={{ display:'grid', gridTemplateColumns:'300px 1fr', gap:'clamp(36px,5vw,80px)', alignItems:'start' }} className="g2">

          {/* Photo — 300px wide, 4:5 aspect, centred */}
          <div ref={r1} className="rv" style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
            <div style={{ position:'relative', width:'100%' }}>
              {/* Amber corner brackets */}
              <div style={{ position:'absolute', top:0, left:0, zIndex:2, width:'36px', height:'36px', borderTop:`2px solid ${AMBER}`, borderLeft:`2px solid ${AMBER}` }} />
              <div style={{ position:'absolute', bottom:0, right:0, zIndex:2, width:'36px', height:'36px', borderBottom:`2px solid ${AMBER}`, borderRight:`2px solid ${AMBER}` }} />
              <img src={imgFounder} alt="Mithul Yeldandi, Founder"
                style={{ display:'block', width:'100%', aspectRatio:'4/5', objectFit:'cover', objectPosition:'center 8%' }} />
            </div>
            {/* Name + title below photo */}
            <div style={{ marginTop:'16px', textAlign:'center' }}>
              <div style={{ fontFamily:'var(--serif)', fontWeight:400, fontSize:'18px', color:INK, lineHeight:1.2, marginBottom:'5px' }}>
                Mithul Yeldandi
              </div>
              <div style={{ fontFamily:'var(--sans)', fontSize:'11px', fontWeight:500, letterSpacing:'.1em', textTransform:'uppercase', color:AMBER }}>
                Founder &amp; Principal · PMP · CCM
              </div>
            </div>
          </div>

          {/* Bio */}
          <div ref={r2} className="rv d2" style={{ display:'flex', flexDirection:'column' }}>
            <p style={{ fontFamily:'var(--sans)', fontSize:'15px', lineHeight:1.85, color:'var(--mid)', marginBottom:'16px' }}>
              Mithul Yeldandi founded Provara with a clear conviction: owners deserve the same caliber of strategic construction leadership that major institutions take for granted. His career sits at the intersection of owner representation, capital project delivery, and construction management.
            </p>
            <p style={{ fontFamily:'var(--sans)', fontSize:'15px', lineHeight:1.85, color:'var(--mid)', marginBottom:'16px' }}>
              He has led construction and facilities operations at the director level, managed projects for a top-ranked ENR general contractor, and holds a Master's in Construction Management from UT Arlington.
            </p>
            <p style={{ fontFamily:'var(--sans)', fontSize:'15px', lineHeight:1.85, color:'var(--mid)', marginBottom:'32px' }}>
              Mithul serves as Program Chair for the CMAA South Central Texas Chapter and as a Program Evaluator for ABET.
            </p>

            {/* Credentials */}
            <div style={{ borderTop:'1px solid var(--rule)', marginBottom:'28px' }}>
              {[
                ['PMP','Project Management Professional — PMI'],
                ['CCM','Certified Construction Manager — CMAA'],
                ['MCM','Master of Construction Management — UT Arlington'],
                ['CMAA','Program Chair, South Central Texas Chapter'],
                ['ABET','Program Evaluator — Construction Management Accreditation'],
              ].map(([code, label]) => (
                <div key={code} style={{ display:'flex', alignItems:'center', gap:'14px', padding:'11px 0', borderBottom:'1px solid var(--rule)' }}>
                  <VA size={14} opacity={.45} />
                  <span style={{ fontFamily:'var(--sans)', fontWeight:500, fontSize:'11px', letterSpacing:'.08em', color:AMBER, minWidth:'38px' }}>{code}</span>
                  <span style={{ fontFamily:'var(--sans)', fontWeight:400, fontSize:'13px', color:'var(--mid)' }}>{label}</span>
                </div>
              ))}
            </div>

            <blockquote style={{ borderLeft:`2px solid ${AMBER}`, paddingLeft:'18px' }}>
              <p style={{ fontFamily:'var(--serif)', fontWeight:400, fontSize:'clamp(14px,1.3vw,17px)', lineHeight:1.7, color:'var(--ink)', margin:'0 0 8px' }}>
                "Projects fail in the gaps between responsibility and accountability. We close those gaps."
              </p>
              <cite style={{ fontFamily:'var(--sans)', fontSize:'11px', fontWeight:400, letterSpacing:'.08em', textTransform:'uppercase', color:'var(--ghost)', fontStyle:'normal' }}>
                — Mithul Yeldandi, Founder
              </cite>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════
   APPROACH
═══════════════════════════════════════ */
const STEPS = [
  ['01','Align Before You Build','Every engagement begins with a diagnostic of scope, risk, team capability, and owner objectives. Misalignment at the start compounds through every phase of construction.'],
  ['02','Build Defensible Systems','We establish the reporting structures, documentation standards, and decision protocols that give owners real-time visibility and legal defensibility throughout execution.'],
  ['03','Close the Gaps','Most projects fail in the white space between contracts. We identify those gaps early and assign clear ownership before they become disputes or claims.'],
  ['04','Deliver With Accountability','We measure success against your objectives — not industry averages. On-budget, on-schedule, and operationally ready is the standard, not the exception.'],
]

function Approach() {
  const rH = useReveal()
  return (
    <section id="approach" style={{ background:'var(--off)', padding:`${SEC} ${PAD}`, borderTop:'1px solid var(--rule)', borderBottom:'1px solid var(--rule)' }}>
      <div style={{ maxWidth:MW, margin:'0 auto' }}>
        <div ref={rH} className="rv" style={{
          display:'grid', gridTemplateColumns:'260px 1fr',
          gap:'clamp(24px,4vw,72px)', marginBottom:'40px',
          paddingBottom:'32px', borderBottom:`2px solid ${INK}`,
        }}>
          <div>
            <span className="lbl" style={{ marginBottom:'8px' }}>Approach</span>
            <h2 style={{ fontFamily:'var(--serif)', fontWeight:400, fontSize:'clamp(26px,3vw,38px)', lineHeight:1.15, color:'var(--ink)', letterSpacing:'-.02em' }}>How We Work</h2>
          </div>
          <p style={{ fontFamily:'var(--sans)', fontWeight:400, fontSize:'15px', lineHeight:1.75, color:'var(--mid)', alignSelf:'end' }}>
            Provara's process is built around one principle: the owner's interests come first, and every system we build serves that outcome.
          </p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0' }} className="g2">
          {STEPS.map(([n, title, body], i) => {
            const r = useReveal()
            const isRight = i%2===1
            return (
              <div key={n} ref={r} className={`rv d${i+1}`} style={{
                padding:'32px 0', borderBottom:'1px solid var(--rule)',
                borderLeft: isRight ? '1px solid var(--rule)' : 'none',
                paddingLeft: isRight ? '40px' : '0',
                paddingRight: isRight ? '0' : '40px',
              }}>
                <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'12px' }}>
                  <VA size={16} opacity={.4} />
                  <span style={{ fontFamily:'var(--sans)', fontWeight:500, fontSize:'11px', letterSpacing:'.12em', textTransform:'uppercase', color:AMBER }}>{n}</span>
                </div>
                <h3 style={{ fontFamily:'var(--sans)', fontWeight:500, fontSize:'15px', color:'var(--ink)', lineHeight:1.3, marginBottom:'10px' }}>{title}</h3>
                <p style={{ fontFamily:'var(--sans)', fontWeight:400, fontSize:'14px', lineHeight:1.75, color:'var(--mid)', margin:0 }}>{body}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════
   CONTACT — email: admin@provarallc.com
═══════════════════════════════════════ */
const EMAIL = 'admin@provarallc.com'

function Contact() {
  const r1 = useReveal(), r2 = useReveal()
  const [form, setForm] = useState({ name:'', company:'', service:'', message:'' })
  const [sent, setSent] = useState(false)
  const submit = e => {
    e.preventDefault()
    const sub  = encodeURIComponent(`Provara — ${form.name}${form.company ? ' · '+form.company : ''}`)
    const body = encodeURIComponent(`Name: ${form.name}\nCompany: ${form.company}\nService: ${form.service}\n\n${form.message}`)
    window.open(`mailto:${EMAIL}?subject=${sub}&body=${body}`)
    setSent(true)
  }
  const fi = {
    width:'100%', background:'transparent', border:'none',
    borderBottom:'1px solid rgba(255,255,255,.18)',
    padding:'10px 0', fontFamily:'var(--sans)', fontWeight:400,
    fontSize:'14px', color:WHITE, outline:'none', transition:'border-color .2s',
  }
  const lb = {
    fontFamily:'var(--sans)', fontSize:'11px', fontWeight:500,
    letterSpacing:'.1em', textTransform:'uppercase',
    color:'rgba(255,255,255,.35)', display:'block', marginBottom:'6px',
  }
  return (
    <section id="contact" style={{ background:DARK }}>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr' }} className="g2">
        {/* Left */}
        <div ref={r1} className="rv" style={{
          padding:`${SEC} ${PAD}`, borderRight:'1px solid rgba(255,255,255,.07)',
          display:'flex', flexDirection:'column', justifyContent:'space-between',
        }}>
          <div>
            <span className="lbl" style={{ marginBottom:'12px' }}>Contact</span>
            <h2 style={{
              fontFamily:'var(--serif)', fontWeight:400,
              fontSize:'clamp(36px,5vw,64px)', lineHeight:1,
              letterSpacing:'-.02em', color:WHITE, marginBottom:'28px',
            }}>
              Bring control<br />back to the<br />
              <span style={{ color:AMBER }}>project.</span>
            </h2>
            <p style={{ fontFamily:'var(--sans)', fontWeight:400, fontSize:'15px', lineHeight:1.75, color:'rgba(255,255,255,.45)', maxWidth:'380px', marginBottom:'40px' }}>
              Tell us about your project. We respond within one business day with an honest assessment of where we can add value.
            </p>
            <div>
              <div style={{ fontFamily:'var(--sans)', fontSize:'11px', fontWeight:500, letterSpacing:'.1em', textTransform:'uppercase', color:AMBER, marginBottom:'6px' }}>Email</div>
              <a href={`mailto:${EMAIL}`}
                style={{ fontFamily:'var(--serif)', fontSize:'clamp(17px,2vw,24px)', color:WHITE, textDecoration:'none', transition:'color .2s' }}
                onMouseEnter={e => e.currentTarget.style.color=AMBER}
                onMouseLeave={e => e.currentTarget.style.color=WHITE}>
                {EMAIL}
              </a>
            </div>
          </div>
          <div style={{ paddingTop:'28px', borderTop:'1px solid rgba(255,255,255,.08)', marginTop:'40px' }}>
            <Logo h={72} dark={true} />
            <div style={{ display:'flex', gap:'24px', marginTop:'14px', flexWrap:'wrap' }}>
              {['Vision Aligned','Value Assured'].map(label => (
                <div key={label} style={{ display:'flex', alignItems:'center', gap:'7px' }}>
                  <VA size={14} opacity={.5} />
                  <span style={{ fontFamily:'var(--sans)', fontSize:'11px', letterSpacing:'.1em', textTransform:'uppercase', color:'rgba(255,255,255,.28)' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Form */}
        <div ref={r2} className="rv d2" style={{ padding:`${SEC} ${PAD}`, background:'rgba(0,0,0,.2)' }}>
          {sent ? (
            <div style={{ height:'100%', minHeight:'400px', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', gap:'16px' }}>
              <VA size={40} opacity={1} />
              <h3 style={{ fontFamily:'var(--serif)', fontWeight:400, fontSize:'28px', color:WHITE, letterSpacing:'-.02em' }}>Email draft ready.</h3>
              <p style={{ fontFamily:'var(--sans)', fontSize:'14px', color:'rgba(255,255,255,.4)', maxWidth:'280px', lineHeight:1.7 }}>
                Your email client opened. Send when ready — we respond within one business day.
              </p>
              <button onClick={() => setSent(false)} style={{ fontFamily:'var(--sans)', fontSize:'12px', fontWeight:500, letterSpacing:'.08em', textTransform:'uppercase', color:AMBER, background:'none', border:'none', cursor:'pointer', marginTop:'8px' }}>
                ← Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={submit} style={{ display:'flex', flexDirection:'column' }}>
              <h3 style={{ fontFamily:'var(--serif)', fontWeight:400, fontSize:'clamp(22px,2.5vw,30px)', color:WHITE, letterSpacing:'-.02em', marginBottom:'36px', lineHeight:1.1 }}>
                Tell us about your project.
              </h3>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'24px', marginBottom:'24px' }}>
                <div>
                  <label style={lb}>Name *</label>
                  <input required type="text" placeholder="Jane Smith" value={form.name} onChange={e => setForm({...form,name:e.target.value})} style={fi}
                    onFocus={e=>e.target.style.borderBottomColor=AMBER} onBlur={e=>e.target.style.borderBottomColor='rgba(255,255,255,.18)'} />
                </div>
                <div>
                  <label style={lb}>Company</label>
                  <input type="text" placeholder="Organization" value={form.company} onChange={e => setForm({...form,company:e.target.value})} style={fi}
                    onFocus={e=>e.target.style.borderBottomColor=AMBER} onBlur={e=>e.target.style.borderBottomColor='rgba(255,255,255,.18)'} />
                </div>
              </div>
              <div style={{ marginBottom:'24px' }}>
                <label style={lb}>Service Interest</label>
                <select value={form.service} onChange={e=>setForm({...form,service:e.target.value})}
                  style={{...fi, appearance:'none', cursor:'pointer', color:form.service?WHITE:'rgba(255,255,255,.35)'}}
                  onFocus={e=>e.target.style.borderBottomColor=AMBER} onBlur={e=>e.target.style.borderBottomColor='rgba(255,255,255,.18)'}>
                  <option value="" style={{background:'#111110'}}>Select a service...</option>
                  {['CPM / P6 Scheduling',"Owner's Representation",'Construction Management','Capital Project Advisory','Development Consulting','Due Diligence & Risk Oversight','Program Management','Delay Analysis & Claims','Other / Multiple'].map(s=>(
                    <option key={s} style={{background:'#111110'}}>{s}</option>
                  ))}
                </select>
              </div>
              <div style={{ marginBottom:'36px' }}>
                <label style={lb}>Project Description *</label>
                <textarea required rows={5} placeholder="Project type, location, timeline, and where you need support..." value={form.message} onChange={e=>setForm({...form,message:e.target.value})}
                  style={{...fi, resize:'none', lineHeight:1.7}}
                  onFocus={e=>e.target.style.borderBottomColor=AMBER} onBlur={e=>e.target.style.borderBottomColor='rgba(255,255,255,.18)'} />
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:'16px', flexWrap:'wrap' }}>
                <button type="submit" className="btn-primary">Send Inquiry →</button>
                <span style={{ fontFamily:'var(--sans)', fontSize:'11px', color:'rgba(255,255,255,.22)' }}>Opens your email client</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════
   FOOTER
═══════════════════════════════════════ */
function Footer() {
  return (
    <footer style={{ background:DARK, borderTop:'1px solid rgba(255,255,255,.07)', padding:`clamp(40px,5vw,56px) ${PAD} 28px` }}>
      <div style={{ maxWidth:MW, margin:'0 auto' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap:'40px', marginBottom:'40px' }} className="g2">
          <div>
            <Logo h={72} dark={true} />
            <p style={{ fontFamily:'var(--sans)', fontSize:'13px', color:'rgba(255,255,255,.3)', marginTop:'14px', lineHeight:1.75, maxWidth:'220px' }}>
              Construction management, P6 scheduling, and owner's representation — San Antonio, TX.
            </p>
            <div style={{ marginTop:'14px', fontFamily:'var(--sans)', fontSize:'11px', letterSpacing:'.06em', color:'rgba(255,255,255,.2)', lineHeight:1.8 }}>
              {EMAIL}
            </div>
          </div>
          {[
            { h:'Company',  items:[['Leadership','#leadership'],['Our Approach','#approach']] },
            { h:'Services', items:[['P6 Scheduling','#scheduling'],["Owner's Rep",'#services'],['Construction Mgmt','#services'],['Due Diligence','#services']] },
            { h:'Connect',  items:[['Email Us',`mailto:${EMAIL}`],['LinkedIn','https://www.linkedin.com/in/yeldandi/'],['Schedule a Call','#contact']] },
          ].map(col => (
            <div key={col.h}>
              <div style={{ fontFamily:'var(--sans)', fontSize:'11px', fontWeight:500, letterSpacing:'.1em', textTransform:'uppercase', color:AMBER, marginBottom:'14px' }}>{col.h}</div>
              {col.items.map(([lbl, href]) => (
                <a key={lbl} href={href}
                  style={{ display:'block', fontFamily:'var(--sans)', fontSize:'13px', color:'rgba(255,255,255,.32)', textDecoration:'none', marginBottom:'8px', transition:'color .2s' }}
                  onMouseEnter={e=>e.currentTarget.style.color='rgba(255,255,255,.8)'}
                  onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,.32)'}
                  {...(href.startsWith('http')?{target:'_blank',rel:'noopener noreferrer'}:{})}>
                  {lbl}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop:'1px solid rgba(255,255,255,.07)', paddingTop:'18px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'12px' }}>
          <p style={{ fontFamily:'var(--sans)', fontSize:'12px', color:'rgba(255,255,255,.2)', margin:0 }}>
            © {new Date().getFullYear()} Provara. All rights reserved.
          </p>
          <div style={{ display:'flex', gap:'24px', alignItems:'center' }}>
            {['Vision Aligned','Value Assured'].map(label => (
              <div key={label} style={{ display:'flex', alignItems:'center', gap:'7px' }}>
                <VA size={13} opacity={.38} />
                <span style={{ fontFamily:'var(--sans)', fontSize:'11px', letterSpacing:'.08em', textTransform:'uppercase', color:'rgba(255,255,255,.2)' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ═══════════════════════════════════════
   APP
═══════════════════════════════════════ */
export default function App() {
  return (
    <>
      <Navbar /><Hero /><Services /><Scheduling />
      <Sectors /><Leadership /><Approach /><Contact /><Footer />
    </>
  )
}
