/* Equipment & procedures, part 4: asepsis, sterile technique and procedural safety */
ATLAS.refGroup("eq",{key:"safety",col:"ecg",name:"Asepsis, sterile technique & safety checks",
intro:"<p>Infection prevention and procedural safety are examined as frameworks: the WHO <b>5 moments</b> of hand hygiene, <b>Aseptic Non-Touch Technique</b> (key parts and key sites), <b>sterile field</b> and skin preparation, the <b>Spaulding</b> classification for decontamination, care <b>bundles</b>, and safety checklists — WHO Surgical Safety Checklist, NatSSIPs 2 (2023) and local LocSSIPs, and <b>Stop Before You Block</b> for wrong-side blocks.</p>",
diagHTML:`<div class="fig"><h3>WHO Surgical Safety Checklist (interactive)</h3><div class="ctl"><div class="seg" id="eqs-ph"></div><button class="btn ghost" id="eqs-reset">Reset</button></div><div id="eqs-list" style="display:flex;flex-direction:column;gap:6px"></div><div class="readout" id="eqs-out"></div></div>
<div class="fig"><h3>WHO 5 moments for hand hygiene</h3><div class="svgbox"><svg id="eqh-svg" viewBox="0 0 460 360" role="img" aria-label="Five moments for hand hygiene"></svg></div><div class="readout" id="eqh-out"><b>Tap a moment.</b> The patient zone includes the patient and their immediate surroundings; the critical site is any point of entry (line, wound, airway).</div></div>`,
init(){const H=ATLAS.h,$=H.$;
const PH={in:["Sign in (before induction)",["Patient has confirmed identity, site, procedure and consent","Site marked (or not applicable)","Anaesthesia machine and medication check complete","Pulse oximeter on and functioning","Known allergy?","Difficult airway or aspiration risk? Equipment and assistance available","Risk of > 500 mL blood loss (7 mL/kg in children)? IV access and fluids planned"]],
tout:["Time out (before skin incision)",["All team members introduced by name and role","Confirm patient name, procedure and incision site","Antibiotic prophylaxis given within the last 60 minutes?","Surgeon: critical or non-routine steps, duration, anticipated blood loss","Anaesthetist: patient-specific concerns","Nursing: sterility confirmed (including indicators), equipment issues","Essential imaging displayed","VTE prophylaxis addressed"]],
out:["Sign out (before the team leaves theatre)",["Name of the procedure recorded","Instrument, swab and needle counts correct","Specimens labelled (including patient name)","Equipment problems to be addressed","Key concerns for recovery and management handed over"]]};
const st={};let cur="in";const list=$("#eqs-list");if(!list)return;
function drawS(){const [t,items]=PH[cur];list.innerHTML="";items.forEach((x,i)=>{const k=cur+i;const row=document.createElement("label");row.style.cssText="display:flex;gap:10px;align-items:flex-start;padding:6px 8px;border:1px solid var(--line);border-radius:8px;background:var(--panel2);cursor:pointer;font-size:.9rem";row.innerHTML=`<input type="checkbox" ${st[k]?"checked":""} style="margin-top:4px;accent-color:var(--ecg)"><span>${x}</span>`;row.querySelector("input").onchange=e=>{st[k]=e.target.checked;upd()};list.append(row)});upd()}
function upd(){const [t,items]=PH[cur];const n=items.filter((x,i)=>st[cur+i]).length;$("#eqs-out").innerHTML=`<b>${t}</b>: ${n}/${items.length} confirmed aloud. ${n===items.length?"Complete — proceed.":"The checklist is a team conversation, not a form: pause until every item is answered."}<br><span class="src">WHO (2008): introduction reduced mortality and complications in the Haynes 8-country study (NEJM 2009). NatSSIPs 2 (2023) extends this into organisational and procedural standards.</span>`}
H.seg($("#eqs-ph"),[["in","Sign in"],["tout","Time out"],["out","Sign out"]],v=>{cur=v;drawS()},"in");$("#eqs-reset").onclick=()=>{for(const k in st)delete st[k];drawS()};
const sv=$("#eqh-svg");const M=[["1","Before touching a patient","To protect the patient from germs carried on your hands (e.g. before examination, shaking hands, positioning)."],["2","Before a clean or aseptic procedure","To protect the patient from germs entering their body, including their own: before cannulation, line access, drug preparation for injection, airway suction, wound care."],["3","After body fluid exposure risk","To protect yourself and the environment: after suctioning, blood sampling, emptying catheters, removing gloves."],["4","After touching a patient","When leaving the patient after touching them or their immediate surroundings."],["5","After touching patient surroundings","After touching any object in the patient zone (bed rails, monitor, infusion pumps), even if the patient was not touched."]];
const A=(t,a,tx)=>{const e=document.createElementNS(H.SVGNS,t);for(const k in a)e.setAttribute(k,a[k]);if(tx!=null)e.textContent=tx;sv.append(e);return e};
A("circle",{cx:230,cy:180,r:110,fill:"var(--spo2)","fill-opacity":.1,stroke:"var(--spo2)","stroke-dasharray":"6 4"});A("text",{x:230,y:176,"text-anchor":"middle",class:"lbl"},"Patient zone");A("text",{x:230,y:194,"text-anchor":"middle",class:"lbl"},"(patient + surroundings)");
const pos=[[230,40],[380,120],[350,300],[110,300],[80,120]];
M.forEach(([n,t,d],i)=>{const [x,y]=pos[i];const gg=document.createElementNS(H.SVGNS,"g");gg.setAttribute("style","cursor:pointer");gg.setAttribute("tabindex","0");gg.setAttribute("role","button");gg.setAttribute("aria-label",t);
  const c=document.createElementNS(H.SVGNS,"circle");Object.entries({cx:x,cy:y,r:24,fill:"var(--ecg)"}).forEach(([a,v])=>c.setAttribute(a,v));gg.append(c);const tx=document.createElementNS(H.SVGNS,"text");Object.entries({x,y:y+6,"text-anchor":"middle",style:"font-family:var(--display);font-size:18px;fill:var(--bg);font-weight:700"}).forEach(([a,v])=>tx.setAttribute(a,v));tx.textContent=n;gg.append(tx);
  const lb=document.createElementNS(H.SVGNS,"text");Object.entries({x,y:y+(y<200?-32:44),"text-anchor":"middle",class:"lbl"}).forEach(([a,v])=>lb.setAttribute(a,v));lb.textContent=t.length>30?t.slice(0,28)+"…":t;gg.append(lb);
  const pick=()=>{$("#eqh-out").innerHTML=`<b>Moment ${n}: ${t}.</b> ${d}`};gg.addEventListener("click",pick);gg.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();pick()}});sv.append(gg)});
drawS()}
});

ATLAS.refAdd("eq",[
{id:"hand_hygiene",g:"safety",n:"Hand hygiene",s:"WHO 5 moments and technique",dg:["safety",1],
what:"The single most effective measure against healthcare-associated infection. Alcohol-based hand rub (20–30 s) is the standard unless hands are visibly soiled or after contact with C. difficile or norovirus, when soap and water (40–60 s) are needed (alcohol does not kill spores).",
steps:["Bare below the elbows; remove rings (plain band allowed), watches, long sleeves.","Apply enough product to cover all surfaces.","Palm to palm; right palm over left dorsum and vice versa; palm to palm fingers interlaced; backs of fingers to opposing palms; rotational rubbing of thumbs; fingertips in palms.","Rub until dry (rub) or rinse and dry with a single-use towel (wash)."],
cx:"Missed areas: thumbs, fingertips and between fingers; irritant dermatitis (use emollients).",
p:["Gloves do not replace hand hygiene: decontaminate before putting on and after removing them.","Surgical scrub: chlorhexidine 4% or povidone-iodine 7.5% for 2–5 min for the first scrub, or an alcohol-based surgical rub."],
rel:["antt","sterile_field"],aka:["hand washing","5 moments","hand rub"]},

{id:"antt",g:"safety",n:"Aseptic Non-Touch Technique (ANTT)",s:"Protecting key parts and key sites",
what:"ANTT is a standardised framework. <b>Key parts</b> are parts of equipment that must remain aseptic (needle, syringe tip, line hub); <b>key sites</b> are open wounds and insertion sites. <b>Standard ANTT</b>: technically simple, short procedures with few small key parts (IV drug administration, cannulation) — non-touch of key parts, general aseptic field, non-sterile gloves. <b>Surgical ANTT</b>: complex or long procedures, large or many key parts (CVC, epidural, urinary catheter) — critical aseptic field, sterile gloves, often full barrier precautions.",
steps:["Hand hygiene; clean the tray (general aseptic field).","Identify key parts and key sites.","Protect key parts with caps or covers (micro critical aseptic fields).","Clean hubs and ports ('scrub the hub' with 2% chlorhexidine/70% alcohol for 15 s, allow to dry).","Never touch key parts or key sites; if touched, replace or re-clean.","Dispose of sharps and waste; hand hygiene."],
cx:"Contamination of key parts → line infection, epidural abscess, sepsis.",
p:["Asepsis is achieved by non-touch, not by gloves alone."],
rel:["hand_hygiene","sterile_field","bundles"],aka:["ANTT","aseptic technique","scrub the hub"]},

{id:"sterile_field",g:"safety",n:"Sterile field, gowning & skin preparation",s:"Surgical asepsis for invasive procedures",
what:"Full barrier precautions (cap, mask, sterile gown and gloves, large sterile drape) for central lines, neuraxial and continuous catheter techniques. Skin antisepsis: <b>2% chlorhexidine gluconate in 70% alcohol</b> applied with friction for 30 s and <b>allowed to dry completely</b> (alcohol fire risk with diathermy; chlorhexidine contamination of neuraxial needles is a concern, so let it dry and keep it away from the tray).",
steps:["Surgical hand scrub or rub.","Don sterile gown (assistant ties back) and gloves (closed gloving).","Prepare the skin from the centre outwards; allow to dry (≥ 2 min for alcoholic solutions).","Drape widely; keep the field above waist level and in view.","Arrange equipment on the sterile trolley; nothing passes from non-sterile to sterile.","Maintain the field until the dressing is applied."],
cx:"Infection, chemical burns (pooling of chlorhexidine under the patient or in neonates), fires (alcohol vapour), chlorhexidine anaphylaxis (rising cause; NAP6).",
p:["0.5% chlorhexidine in alcohol is often recommended for neuraxial procedures (AAGBI 2014) to limit neurotoxicity risk, allowed to dry before needle insertion.","Chlorhexidine anaphylaxis: suspect when reactions follow urinary catheter gels or coated lines."],
rel:["antt","bundles"],aka:["sterile field","gowning","gloving","skin prep","chlorhexidine"]},

{id:"decontam",g:"safety",n:"Decontamination of equipment",s:"Cleaning, disinfection, sterilisation (Spaulding)",
what:"Spaulding classification by infection risk: <b>critical</b> items enter sterile tissue (surgical instruments, needles) → sterilisation; <b>semi-critical</b> items contact mucous membranes (laryngoscope blades, fibreoptic scopes) → high-level disinfection or sterilisation; <b>non-critical</b> items contact intact skin (BP cuffs) → cleaning ± low-level disinfection.",
sz:["Methods",["Method","Examples","Notes"],[["Cleaning","Detergent and water","Removes organic material; essential first step"],["Disinfection","Alcohol, chlorine dioxide, peracetic acid, washer-disinfector (80 °C)","Kills vegetative organisms, not reliably spores"],["Sterilisation: steam","Autoclave 134 °C for 3 min (porous load)","Gold standard for heat-tolerant items"],["Sterilisation: low temperature","Ethylene oxide, hydrogen peroxide plasma, gamma irradiation (manufacturers)","Heat-sensitive items"],["Prions (vCJD)","Single-use instruments; quarantine","Resistant to standard sterilisation"]]],
cx:"Cross-infection from inadequately decontaminated laryngoscopes and scopes; residual disinfectant causing tissue injury.",
p:["Single-use laryngoscope blades became standard in the UK after vCJD concerns (2001).","Bronchoscopes: automated endoscope reprocessors with traceability, or single-use scopes."],
rel:["antt"],aka:["Spaulding","sterilisation","disinfection","autoclave"]},

{id:"bundles",g:"safety",n:"Care bundles (CVC and VAP)",s:"Insertion and maintenance bundles",
what:"A bundle is a small set of evidence-based practices performed together. The Pronovost (Keystone, Michigan) CVC bundle reduced CLABSI by ~66%.",
sec:[["CVC insertion bundle","Hand hygiene; full barrier precautions; 2% chlorhexidine in 70% alcohol skin prep; optimal site (avoid femoral where possible); ultrasound guidance; sterile dressing."],["CVC maintenance bundle","Daily review of need (remove promptly); ANTT for every access; scrub the hub; dressing intact and changed per policy (chlorhexidine-impregnated dressings); change administration sets per policy (72–96 h; 24 h for lipids/TPN, blood sets)."],["Ventilator bundle (VAP)","Head-up 30–45°, daily sedation hold and assessment of readiness to extubate, subglottic secretion drainage, oral care, cuff pressure 20–30 cmH₂O, VTE and stress ulcer prophylaxis as indicated."]],
cx:"Non-compliance (bundles work only when every element is done each time).",
p:["CLABSI definition: bloodstream infection with a CVC in place > 48 h and no other source."],
rel:["cvc","antt"],aka:["care bundle","CLABSI","VAP bundle","Matching Michigan"]},

{id:"who_checklist",g:"safety",n:"WHO Surgical Safety Checklist",s:"Sign in, time out, sign out",dg:["safety",0],
what:"Introduced by WHO in 2008 ('Safe Surgery Saves Lives'), mandatory in NHS theatres since 2009, with a team brief before the list and a debrief at the end ('five steps to safer surgery').",
steps:["Team brief at the start of the list.","Sign in before induction (anaesthetist and practitioner).","Time out before skin incision (whole team).","Sign out before the patient leaves theatre.","Team debrief at the end of the list."],
cx:"Tick-box culture, missing team members, interruptions — reduce its effect.",
p:["Haynes (NEJM 2009): mortality 1.5% → 0.8% and complications 11% → 7% across eight countries."],
rel:["natssips","sbyb"],aka:["WHO checklist","surgical safety checklist","sign in","time out","sign out"]},

{id:"natssips",g:"safety",n:"NatSSIPs & LocSSIPs",s:"National and Local Safety Standards for Invasive Procedures",
what:"<b>NatSSIPs</b> (NHS England 2015, revised as NatSSIPs 2 in 2023) set national standards for any invasive procedure; organisations write <b>LocSSIPs</b> (local checklists) for specific procedures (central lines, regional blocks, chest drains, lumbar puncture, interventional radiology). NatSSIPs 2 adds organisational standards (governance, training, audit) and sequential procedural steps: consent, team brief, sign in, time out, procedure, sign out, handover, debrief.",
steps:["Consent and planning.","Team brief.","Sign in (patient identity, procedure, allergies, consent, site marking).","Time out immediately before the procedure.","Perform the procedure with prosthesis and implant verification and counts as applicable.","Sign out (counts, specimens, wire removal for lines).","Handover and debrief."],
cx:"Never events: wrong-site surgery and blocks, retained foreign objects (including guidewires), wrong implant.",
p:["Retained central line guidewire and wrong-site block are both never events in England."],
rel:["who_checklist","sbyb","cvc"],aka:["NatSSIPs","LocSSIPs","safety standards","never event"]},

{id:"sbyb",g:"safety",n:"Stop Before You Block",s:"Preventing wrong-side regional anaesthesia",
what:"A Safe Anaesthesia Liaison Group / RA-UK campaign (2011): immediately before needle insertion for a peripheral nerve block, the anaesthetist and assistant must <b>stop</b> and check the site marking (surgical arrow visible) and laterality with the patient's notes and consent. Wrong-side blocks often follow a delay between the WHO sign in and the block, or turning the patient.",
steps:["Sign in completed and site marked.","Immediately before inserting the block needle: stop.","Anaesthetist and assistant check the surgical site marking (arrow) and the side together.","Confirm with consent form and patient (if awake).","Then proceed."],
cx:"Wrong-side block (never event), with risk of proceeding to wrong-side surgery.",
p:["The campaign covers peripheral nerve blocks; many units apply the same pause to fascial plane blocks and unilateral neuraxial techniques."],
rel:["natssips","who_checklist"],aka:["SBYB","Stop before you block","wrong side block"]},

{id:"sharps",g:"safety",n:"Sharps & needlestick injury",s:"Prevention and post-exposure management",
what:"Percutaneous exposure risks of transmission: hepatitis B ~30% (HBeAg positive, unvaccinated), hepatitis C ~1.8%, HIV ~0.3%. Prevention: safety-engineered devices (EU Directive 2010/32, UK Sharps Regulations 2013), no resheathing, immediate sharps disposal by the user, double gloving in high-risk surgery.",
steps:["Encourage bleeding; wash with soap and running water (do not scrub or suck); cover.","Report immediately to occupational health or the emergency department.","Risk-assess the source (consent for testing) and recipient.","HIV PEP: start as soon as possible, ideally within 1 h and no later than 72 h; a 28-day three-drug regimen chosen per current BHIVA guidance.","Hepatitis B: booster or HBIG plus vaccine depending on vaccination status and source.","Hepatitis C: no PEP; follow-up testing and early treatment.","Document and follow up (baseline serology and at 6–12 weeks)."],
cx:"Seroconversion, psychological impact.",
p:["Treat any undiagnosed source as high risk until tested."],
rel:["hand_hygiene"],aka:["needlestick","sharps injury","PEP","post-exposure prophylaxis"]}
]);
