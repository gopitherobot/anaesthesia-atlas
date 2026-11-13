/* Equipment & procedures, part 2: airway devices */
ATLAS.refGroup("eq",{key:"airway",col:"spo2",name:"Airway devices",
intro:"<p>Devices from simplest to most invasive: <b>face mask and adjuncts</b> (oro- and nasopharyngeal airways), <b>supraglottic airway devices</b> (first generation: LMA Classic/Unique; second generation with a gastric drain and higher seal pressure: i-gel, ProSeal, Supreme), <b>tracheal tubes</b> placed with direct or video laryngoscopy, aids (bougie, stylet, airway exchange catheter, flexible bronchoscope), and <b>front-of-neck access</b>. The DAS guidelines (2015 unanticipated difficult intubation; 2020 awake tracheal intubation) tie them into one plan. Airway anatomy is in Stage 12.</p>",
diagHTML:`<div class="fig" style="grid-column:1/-1"><h3>Airway sizing calculator (child to adult)</h3><div class="ctl"><label>Age (years) <input type="range" id="eqa-age" min="0" max="18" step="0.5" value="6"><output id="eqa-ao">6 y</output></label><label>Weight (kg) <input type="number" id="eqa-w" min="1" max="200" step="0.5" style="width:90px;background:var(--bg2);color:var(--ink);border:1px solid var(--line);border-radius:7px;padding:5px 8px;font-family:var(--mono)"></label><div class="seg" id="eqa-sex"></div><button class="btn ghost" id="eqa-est">Use APLS weight estimate</button></div><div class="tbl"><table><thead><tr><th>Item</th><th>Size</th><th>How derived</th></tr></thead><tbody id="eqa-tb"></tbody></table></div></div>
<div class="fig"><h3>Where each device sits (sagittal view)</h3><div class="ctl"><div class="seg" id="eqd-dev"></div></div><div class="svgbox"><svg id="eqd-svg" viewBox="0 0 520 390" role="img" aria-label="Sagittal airway with device"></svg></div><div class="readout" id="eqd-out"></div></div>
<div class="fig"><h3>DAS unanticipated difficult intubation (2015), step by step</h3><div class="ctl"><button class="btn" id="eqf-reset">Restart</button></div><div id="eqf-box" style="display:flex;flex-direction:column;gap:10px"></div></div>`,
init(){const H=ATLAS.h,$=H.$;
/* ---- sizing ---- */
const ageEl=$("#eqa-age");if(!ageEl)return;let SEX="f";
const est=a=>a<1?Math.round(a*12*0.5+4):a<=5?2*a+8:a<=12?3*a+7:Math.min(70,3*a+7);
const ig=w=>w<2?"–":w<5?"1":w<12?"1.5":w<25?"2":w<35?"2.5":w<60?"3":w<90?"4":"5";
const lma=w=>w<5?"1":w<10?"1.5":w<20?"2":w<30?"2.5":w<50?"3":w<70?"4":w<100?"5":"6";
function calc(){const a=+ageEl.value,w=+$("#eqa-w").value||est(a);$("#eqa-ao").textContent=a<1?Math.round(a*12)+" mo":a+" y";const adult=a>=16;let rows=[];
  let cuff,unc,len,nasal,blade,opa,npa;
  if(adult){cuff=SEX==="f"?"7.0–7.5":"8.0–8.5";unc="–";len=SEX==="f"?"20–21 cm":"22–23 cm";nasal=SEX==="f"?"24–25 cm (6.0–6.5 tube)":"26–27 cm (6.5–7.0 tube)";blade="Macintosh 3 (4 for large)";opa=SEX==="f"?"Size 3 (medium, red)":"Size 3–4 (red/yellow)";npa=SEX==="f"?"6.0–7.0 mm":"7.0–8.0 mm"}
  else if(a<1){const m=a*12;cuff=m<8?"3.0":"3.5";unc=w<3?"3.0 (term)":"3.5";len=(Math.round((w+6)*10)/10)+" cm at lips (weight + 6)";nasal=(Math.round((w+7)*10)/10)+" cm (weight + 7)";blade="Miller 0–1 (straight)";opa="000–0 (measure)";npa="Not usually used (3.0 tube cut short if needed)"}
  else{const c=a/4+3.5,u=a/4+4;cuff=(Math.round(c*2)/2).toFixed(1);unc=(Math.round(u*2)/2).toFixed(1);len=(Math.round(a/2+12))+" cm at lips";nasal=(Math.round(a/2+15))+" cm";blade=a<2?"Miller 1 or Mac 1":a<10?"Macintosh 2":"Macintosh 3";opa=a<2?"0–1":a<8?"1–2":"2–3";npa=(Math.round((u-1)*2)/2).toFixed(1)+" mm (≈ ETT size − 1)"}
  const idn=parseFloat(String(cuff))||7;const suct=Math.max(6,Math.round(idn*1.5/2)*2);
  rows=[["Tracheal tube, cuffed (ID mm)",cuff,adult?"Typical adult sizes":a<1?"Infant cuffed tubes (Microcuff)":"Age/4 + 3.5"],["Tracheal tube, uncuffed (ID mm)",unc,adult?"–":"Age/4 + 4"],["Oral length",len,adult?"At the teeth":"Age/2 + 12 (child); weight + 6 (neonate)"],["Nasal length",nasal,adult?"At the nostril":"Age/2 + 15"],["i-gel",ig(w),"By weight"],["LMA Classic/Unique",lma(w),"By weight"],["Laryngoscope blade",blade,"Straight blades lift the floppy infant epiglottis"],["Oropharyngeal airway",opa,"Measure incisors (centre of mouth) to angle of mandible"],["Nasopharyngeal airway",npa,"Measure nostril to tragus"],["Suction catheter",suct+" FG","≈ 1.5 × ETT ID (outer diameter < half the tube ID)"]];
  if(!adult)rows=rows.concat([["Adrenaline (arrest)",Math.round(10*w)+" µg ("+(w/10).toFixed(1)+" mL of 1:10 000)","10 µg/kg"],["Defibrillation",Math.min(360,Math.round(4*w))+" J","4 J/kg (RCUK)"],["Fluid bolus",Math.round(10*w)+" mL","10 mL/kg crystalloid"],["Glucose 10%",Math.round(2*w)+" mL","2 mL/kg for hypoglycaemia"],["Amiodarone (arrest)",Math.round(5*w)+" mg","5 mg/kg after 3rd and 5th shocks"]]);
  $("#eqa-tb").innerHTML=rows.map(r=>`<tr><td>${r[0]}</td><td class="mono" style="color:var(--etco2)">${r[1]}</td><td style="color:var(--muted)">${r[2]}</td></tr>`).join("")}
ageEl.oninput=()=>{$("#eqa-w").value=est(+ageEl.value);calc()};$("#eqa-w").oninput=calc;$("#eqa-est").onclick=()=>{$("#eqa-w").value=est(+ageEl.value);calc()};
H.seg($("#eqa-sex"),[["f","Adult female"],["m","Adult male"]],v=>{SEX=v;calc()},"f");$("#eqa-w").value=est(6);calc();

/* ---- sagittal device ---- */
const sv=$("#eqd-svg");const DEV={mask:["Face mask + OPA","Mask seals over nose and mouth; Guedel airway lifts the tongue base off the posterior pharyngeal wall. Two-person technique (two hands on the mask, assistant squeezes bag) when difficult. No protection from aspiration; insufflation of the stomach above ~20 cmH₂O."],
npa:["Nasopharyngeal airway","Passes along the floor of the nose (parallel to the hard palate, not upwards); tip lies just above the epiglottis behind the tongue. Tolerated in lighter planes than an OPA. Avoid with basal skull fracture or coagulopathy."],
igel:["i-gel (2nd-gen SAD)","Non-inflatable thermoplastic elastomer cuff moulds over the laryngeal inlet; tip in the upper oesophageal sphincter; gastric channel; integral bite block. Seal pressure ~25–30 cmH₂O."],
proseal:["LMA ProSeal / Supreme","Inflatable cuff (≤ 60 cmH₂O; manometer) with a dorsal cuff (ProSeal) raising seal pressure to ~30 cmH₂O; drain tube opens at the upper oesophageal sphincter (allows gastric tube, vents regurgitation, and confirms position: bubble/suprasternal notch tests)."],
ett:["Cuffed tracheal tube","Passes through the vocal cords; tip mid-trachea, 2–4 cm above the carina (~T2–T4). Cuff in the subglottic trachea, pressure 20–30 cmH₂O (measured). The only device that reliably protects the lungs from aspiration (but not completely: micro-aspiration past folds)."]};
let D="mask";
function drawD(){sv.innerHTML="";const A=(t,a,tx)=>{const e=document.createElementNS(H.SVGNS,t);for(const k in a)e.setAttribute(k,a[k]);if(tx!=null)e.textContent=tx;sv.append(e);return e};
  const tissue="var(--soft)",edge="var(--muted)";
  A("path",{d:"M40 40 L250 40 Q300 40 300 90 L300 120 L80 120 Q60 120 50 110 Z",fill:tissue,stroke:edge});A("text",{x:150,y:80,"text-anchor":"middle",class:"lbl"},"Nasal cavity");
  A("path",{d:"M70 160 Q110 140 200 150 Q260 160 280 210 Q285 240 270 250 Q200 250 150 230 Q90 210 70 190 Z",fill:"var(--abp)","fill-opacity":.18,stroke:edge});A("text",{x:170,y:200,"text-anchor":"middle",class:"lbl"},"Tongue");
  A("path",{d:"M300 90 Q350 160 352 270 L360 385",fill:"none",stroke:edge,"stroke-width":2});A("text",{x:372,y:170,class:"lbl"},"Posterior pharyngeal wall");
  A("path",{d:"M278 214 Q300 222 304 248",fill:"none",stroke:"var(--etco2)","stroke-width":4,"stroke-linecap":"round"});A("text",{x:226,y:232,class:"lbl"},"Epiglottis");
  A("path",{d:"M298 268 L298 385 M332 268 L332 385",stroke:edge,"stroke-width":2});A("line",{x1:298,y1:272,x2:332,y2:272,stroke:"var(--ecg)","stroke-width":3});A("text",{x:250,y:300,class:"lbl"},"Cords");A("text",{x:260,y:372,class:"lbl"},"Trachea");
  A("path",{d:"M338 268 L338 385 M356 268 L362 385",stroke:edge,"stroke-width":2,"stroke-dasharray":"3 3"});A("text",{x:372,y:330,class:"lbl"},"Oesophagus");
  A("rect",{x:52,y:150,width:14,height:12,fill:"var(--ink2)"});A("rect",{x:52,y:192,width:14,height:12,fill:"var(--ink2)"});A("text",{x:20,y:180,class:"lbl"},"Teeth");
  A("line",{x1:80,y1:120,x2:280,y2:122,stroke:edge});A("text",{x:120,y:136,class:"lbl"},"Hard palate");
  const col="var(--spo2)";
  if(D==="mask"){A("path",{d:"M30 90 Q10 160 40 215 L60 210 Q40 160 55 95 Z",fill:col,"fill-opacity":.35,stroke:col});A("path",{d:"M64 176 Q150 150 230 170 Q262 182 270 214",fill:"none",stroke:col,"stroke-width":10,"stroke-linecap":"round","stroke-opacity":.85})}
  if(D==="npa"){A("path",{d:"M42 100 L250 104 Q292 110 296 150 L300 205",fill:"none",stroke:col,"stroke-width":9,"stroke-linecap":"round","stroke-opacity":.85})}
  if(D==="igel"||D==="proseal"){A("path",{d:"M40 178 Q150 166 250 180 Q300 196 312 236",fill:"none",stroke:col,"stroke-width":12,"stroke-linecap":"round","stroke-opacity":.8});A("ellipse",{cx:322,cy:256,rx:20,ry:30,fill:col,"fill-opacity":.45,stroke:col});A("path",{d:"M330 232 L346 290",stroke:"var(--etco2)","stroke-width":4});
    if(D==="proseal"){A("path",{d:"M40 190 Q160 180 260 196 Q318 214 348 300",fill:"none",stroke:"var(--etco2)","stroke-width":4,"stroke-dasharray":"7 4"});A("text",{x:356,y:300,class:"lbl",fill:"var(--etco2)"},"drain tube")}}
  if(D==="ett"){A("path",{d:"M40 178 Q160 166 250 182 Q300 200 312 262 L314 345",fill:"none",stroke:col,"stroke-width":9,"stroke-linecap":"round","stroke-opacity":.85});A("ellipse",{cx:314,cy:318,rx:16,ry:14,fill:col,"fill-opacity":.45,stroke:col});A("text",{x:250,y:340,class:"lbl",fill:col},"cuff")}
  $("#eqd-out").innerHTML=`<b>${DEV[D][0]}.</b> ${DEV[D][1]}`}
H.seg($("#eqd-dev"),[["mask","Mask + OPA"],["npa","NPA"],["igel","i-gel"],["proseal","ProSeal"],["ett","ETT"]],v=>{D=v;drawD()},"mask");

/* ---- DAS stepper ---- */
const ST={A:["Plan A: face-mask ventilation and tracheal intubation","Optimise head and neck position, preoxygenate (and apnoeic oxygenation), ensure adequate neuromuscular block. Maximum <b>3 attempts + 1</b> by a more experienced colleague; use videolaryngoscopy, bougie, external laryngeal manipulation. Maintain oxygenation with face mask between attempts. Confirm with <b>capnography</b>.","Tube in trachea, capnography confirmed","Failed: declare <b>failed intubation</b>",null,"B"],
B:["Plan B: maintain oxygenation with a supraglottic airway","Insert a <b>second-generation SAD</b>; change size or type if needed; maximum <b>3 attempts</b>. Oxygenate.","SAD oxygenates: STOP AND THINK","Failed: declare failure","THINK","C"],
THINK:["Stop and think","Options: <b>wake the patient up</b> (sugammadex if rocuronium); <b>intubate via the SAD</b> with a flexible bronchoscope (Aintree catheter); <b>proceed with surgery on the SAD</b> (life-threatening condition only); <b>tracheostomy or cricothyroidotomy</b>. Decide as a team.","Plan agreed","",null,null],
C:["Plan C: final attempt at face-mask ventilation","Two-person technique with adjuncts (oral and nasal airways); ensure full neuromuscular block. If ventilation is possible: <b>wake the patient up</b>.","Face mask oxygenates: wake up","Fails: <b>declare CICO</b> (can't intubate, can't oxygenate)","WAKE","D"],
WAKE:["Wake up","Reverse with sugammadex (if rocuronium or vecuronium), maintain oxygenation, postpone surgery, document and report, discuss with the patient and give an airway alert letter.","","",null,null],
D:["Plan D: emergency front-of-neck access","<b>Scalpel–bougie–tube cricothyroidotomy</b>: extend the neck, identify the cricothyroid membrane (laryngeal handshake); transverse stab incision with a size 10 blade, rotate 90° (sharp edge caudal), slide a bougie along the blade into the trachea, railroad a size 6.0 cuffed tube, inflate, ventilate, confirm with capnography. If the membrane is impalpable: 8–10 cm vertical skin incision, blunt dissection, then as above. Continue upper-airway oxygenation attempts.","Airway secured: capnography confirmed","",null,null]};
let cur="A",hist=[];const box=$("#eqf-box");
function drawF(){box.innerHTML="";hist.concat([cur]).forEach((k,i,arr)=>{const s=ST[k];const last=i===arr.length-1;const d=document.createElement("div");d.className="card";d.style.cssText="padding:12px 14px;gap:6px;"+(last?"border-color:var(--spo2)":"opacity:.7");
  d.innerHTML=`<b style="font-family:var(--display)">${s[0]}</b><div style="font-size:.92rem;color:var(--ink2)">${s[1]}</div>`;
  if(last&&(s[4]!==null||s[5]!==null||s[2])){const row=document.createElement("div");row.style.cssText="display:flex;gap:8px;flex-wrap:wrap";
    if(s[2]){const ok=document.createElement("button");ok.className="btn pri";ok.innerHTML=s[2];ok.onclick=()=>{if(s[4]){hist.push(cur);cur=s[4];drawF()}else{ok.disabled=true;ok.textContent="Done: document and debrief"}};row.append(ok)}
    if(s[5]){const no=document.createElement("button");no.className="btn";no.style.borderColor="var(--abp)";no.innerHTML=s[3];no.onclick=()=>{hist.push(cur);cur=s[5];drawF()};row.append(no)}d.append(row)}
  box.append(d)})}
$("#eqf-reset").onclick=()=>{cur="A";hist=[];drawF()};drawF()}
});

ATLAS.refAdd("eq",[
{id:"facemask",g:"airway",n:"Face mask & bag-valve-mask",s:"Basic airway: seal, open, ventilate",dg:["airway",1],
what:"Anatomical face masks (sizes 0–5) with an air-filled cushion; the C-and-E grip holds the mask (thumb and index) while the other fingers lift the mandible. A self-inflating bag with a reservoir delivers FiO₂ ~0.9 at 15 L/min.",
ind:"Preoxygenation, induction and ventilation before intubation or SAD, rescue (Plan C), resuscitation.",
ci:"Full stomach (relative: gentle pressures < 20 cmH₂O), facial trauma.",
steps:["Choose a mask covering bridge of nose to chin groove.","Position: sniffing (child neutral; infant shoulder roll).","C-and-E grip; jaw thrust; insert an OPA or NPA if obstruction.","Ventilate gently with pressures < 20 cmH₂O, watching chest rise and capnography.","If difficult: two-person technique, adjuncts, consider SAD."],
cx:"Gastric insufflation and regurgitation, eye or nerve pressure injury, inadequate ventilation.",
sec:[["Predictors of difficult mask ventilation (OBESE)","Obese (BMI > 26), Beard, Elderly (> 55), Snorer/OSA, Edentulous; also neck radiation, Mallampati III–IV, limited jaw protrusion."]],
p:["Difficult mask ventilation plus difficult intubation is the dangerous combination: plan the SAD and FONA steps beforehand."],
rel:["opa","igel","das"],aka:["face mask","BVM","bag valve mask","Ambu"]},

{id:"opa",g:"airway",n:"Oropharyngeal (Guedel) airway",s:"Lifts the tongue base",dg:["airway",1],
what:"Curved plastic airway with a flange, bite block and lumen, sized by the distance from the incisors to the angle of the mandible (colour-coded sizes 000–4).",
ind:"Upper-airway obstruction by the tongue in an unconscious patient; bite block.",
ci:"Intact gag reflex (vomiting, laryngospasm), oral trauma.",
steps:["Size: incisors to angle of the jaw.","Adults: insert inverted (concave up) and rotate 180° as it passes the hard palate (or use a tongue depressor).","Children: insert the right way up with a tongue depressor (avoid palatal trauma).","Check airway patency and ventilation."],
cx:"Too small: pushes the tongue back (worse obstruction). Too large: hits the epiglottis or larynx (obstruction, laryngospasm). Dental and lip trauma, vomiting.",
p:["The rotation technique is not used in children because it can damage the soft palate."],
rel:["npa","facemask"],aka:["Guedel","OPA","oral airway"]},

{id:"npa",g:"airway",n:"Nasopharyngeal airway",s:"Soft nasal trumpet",dg:["airway",1],
what:"Soft tube with a flange, passed through a nostril along the floor of the nose so the tip lies behind the tongue, above the epiglottis.",
ind:"Obstruction with intact gag, trismus, seizures, oral trauma, recovery.",
ci:"Basal skull fracture (relative), severe coagulopathy, nasal deformity or obstruction.",
steps:["Size: nostril to tragus; diameter ~ the patient's little finger (adult 6–7 mm).","Lubricate; insert bevel towards the septum, directed posteriorly along the floor (perpendicular to the face).","Rotate gently if resistance; try the other nostril.","Check flow and patency."],
cx:"Epistaxis, mucosal injury, intracranial placement with skull-base fracture (rare), laryngospasm if too long.",
p:["Use a safety pin only if the flange is inadequate (older designs)."],
rel:["opa","fibreoptic"],aka:["NPA","nasal airway","nasal trumpet"]},

{id:"igel",g:"airway",n:"i-gel",s:"Second-generation SAD with a non-inflatable cuff",dg:["airway",1],
what:"Thermoplastic elastomer 'gel-like' cuff shaped to the perilaryngeal structures, with a gastric channel, integral bite block and buccal stabiliser. Inserted in one movement, no cuff inflation.",
ind:"Spontaneous or controlled ventilation for elective surgery; rescue (DAS Plan B); out-of-hospital arrest; conduit for fibreoptic intubation (with Aintree catheter).",
ci:"High aspiration risk (unless as rescue), high airway pressures needed (seal ~25–30 cmH₂O), limited mouth opening (< 2 cm), pharyngeal pathology.",
eqp:"Sizes 1–5 by weight (3: 30–60 kg, 4: 50–90 kg, 5: > 90 kg); lubricant on the back of the cuff; gastric tube (size 3–5 accepts 12–14 FG).",
steps:["Choose size by weight; lubricate the back, sides and front of the cuff.","Head in sniffing position; hold the bite block; open the mouth.","Glide the device downwards and backwards along the hard palate until definite resistance.","Check the incisors sit on the bite block line; secure (tape maxilla to maxilla).","Confirm ventilation with capnography and minimal leak; pass a gastric tube if needed."],
chk:"Capnography, chest movement, low leak at moderate pressures; gastric channel test (gel at the drain port moves with ventilation = malposition).",
cx:"Malposition, leak, aspiration, sore throat (less than cuffed SADs), nerve injury (lingual, hypoglossal) rare.",
p:["The commonest SAD for DAS Plan B and pre-hospital use in the UK.","Second-generation SADs have a drain channel and higher seal pressures: NAP4 recommends them over first-generation devices."],
rel:["proseal","lma","das","fibreoptic"],aka:["i-gel","igel","supraglottic airway","SAD"]},

{id:"lma",g:"airway",n:"LMA Classic & Unique",s:"First-generation laryngeal mask airways",dg:["airway",1],
what:"Inflatable silicone (Classic, reusable 40 times) or PVC (Unique, single use) elliptical cuff on a tube; sits over the laryngeal inlet with its tip in the upper oesophageal sphincter. Flexible (reinforced) LMA for head and neck surgery.",
ind:"Short elective cases with spontaneous ventilation, low aspiration risk.",
ci:"Full stomach, high airway pressures, prone (relative), limited mouth opening.",
eqp:"Sizes by weight (3: 30–50 kg, 4: 50–70 kg, 5: 70–100 kg); cuff manometer.",
steps:["Deflate the cuff into a wedge; lubricate the back.","Index finger at the cuff–tube junction, press the device along the palate into the hypopharynx.","Inflate the cuff with the minimum volume to seal (pressure ≤ 60 cmH₂O, ideally 40); the tube rises slightly.","Confirm with capnography; insert a bite block."],
cx:"Leak, aspiration (~2:10 000), laryngospasm, sore throat, cuff over-inflation (nerve injury: lingual, hypoglossal, recurrent laryngeal), N₂O diffusion raises cuff pressure.",
p:["Seal pressure ~20 cmH₂O: avoid high-pressure IPPV."],
rel:["igel","proseal"],aka:["LMA","laryngeal mask","LMA Classic","LMA Unique","flexible LMA"]},

{id:"proseal",g:"airway",n:"LMA ProSeal & Supreme",s:"Second-generation inflatable SADs with gastric drain",dg:["airway",1],
what:"<b>ProSeal</b>: reusable, with a dorsal cuff that raises seal pressure to ~30 cmH₂O, drain tube, bite block and introducer. <b>Supreme</b>: single use, rigid curved shaft, drain tube, fixation tab.",
ind:"Controlled ventilation including laparoscopy (selected), rescue airway.",
ci:"High aspiration risk elective use (relative), very high airway pressures.",
steps:["Deflate, lubricate, insert along the palate (introducer or finger for ProSeal).","Inflate to ≤ 60 cmH₂O (manometer).","Confirm position: capnography, seal pressure test (close APL at 3 L/min — leak pressure), suprasternal notch test and soap-bubble test at the drain tube.","Pass a gastric tube through the drain tube."],
chk:"Bubbling at the drain tube means the tip is not in the oesophagus (folded or in the larynx) or a poor seal.",
cx:"As other SADs; drain-tube malposition.",
p:["Drain tube separates the respiratory and GI tracts and lets regurgitated fluid vent."],
rel:["igel","lma"],aka:["ProSeal","Supreme","LMA ProSeal","LMA Supreme"]},

{id:"ett",g:"airway",n:"Tracheal tubes",s:"Cuffed, specialised and paediatric tubes",dg:["airway",1],
what:"PVC tubes with a 15 mm connector, radio-opaque line, Murphy eye, high-volume low-pressure cuff and markings (ID in mm, length in cm). Specialised: preformed RAE (oral south-facing for tonsillectomy, nasal north-facing), reinforced (armoured) for head and neck and prone, microlaryngeal (5.0 ID with adult-length cuff), laser-resistant, subglottic suction tubes (reduce VAP), double-lumen tubes.",
ind:"Airway protection (full stomach, ↓GCS), controlled ventilation with high pressures, prone or remote access, airway surgery, prolonged ventilation.",
ci:"None absolute when indicated.",
eqp:"Tubes of 3 sizes, laryngoscopes, bougie, stylet, syringe, cuff manometer, capnography, suction, tie.",
steps:["Preoxygenate (ETO₂ > 85–90%), position (ramped if obese).","Induce and paralyse; laryngoscopy (direct or video).","Pass the tube through the cords under vision until the cuff is 1–2 cm below the cords.","Inflate the cuff to 20–30 cmH₂O.","Confirm: sustained capnography waveform, chest movement, auscultation; secure at the correct length."],
chk:"'No trace = wrong place' (RCoA/DAS): an absent or flat capnography trace means oesophageal intubation until proven otherwise, even in cardiac arrest (a reduced trace is still present with effective CPR).",
cx:"Oesophageal or endobronchial intubation, dental injury, sore throat, laryngeal and tracheal injury, cuff over-inflation (mucosal ischaemia > 30 cmH₂O), tube obstruction (kink, secretions), extubation complications.",
sz:["Sizing quick reference",["Patient","Cuffed ID","Oral length"],[["Neonate (term)","3.0 (uncuffed 3.0–3.5)","9 cm (weight + 6)"],["1 year","3.5","12–13 cm"],["4 years","4.5","14 cm"],["8 years","5.5","16 cm"],["Adult female","7.0–7.5","20–21 cm"],["Adult male","8.0–8.5","22–23 cm"]]],
p:["Cuffed tubes are now standard in children (Microcuff): fewer tube changes and leaks, no increase in stridor when cuff pressure is monitored.","Cuff pressure rises with N₂O diffusion: measure regularly."],
rel:["laryngoscopes","vl","bougie","dlt"],aka:["endotracheal tube","ETT","tracheal tube","RAE","reinforced tube","microlaryngeal"]},

{id:"laryngoscopes",g:"airway",n:"Direct laryngoscopes",s:"Macintosh, Miller, McCoy",
what:"<b>Macintosh</b> (curved): tip in the vallecula, lifts the epiglottis indirectly via the hyoepiglottic ligament. <b>Miller</b> (straight): lifts the epiglottis directly; used in infants. <b>McCoy</b>: hinged tip lever elevates the epiglottis. Fibre-optic (green-system) or bulb-in-blade designs.",
ind:"Direct laryngoscopy for intubation; Magill forceps for nasal intubation and foreign bodies.",
steps:["Hold in the left hand; insert to the right of the tongue and sweep it to the left.","Advance the tip into the vallecula (Mac) or under the epiglottis (Miller).","Lift along the line of the handle (up and away, do not lever on teeth).","Grade the view (Cormack–Lehane) and pass the tube from the right."],
cx:"Dental damage (upper incisors), lip injury, cervical movement, sympathetic response.",
sec:[["Cormack–Lehane grades","1: full glottis. 2a: partial glottis. 2b: arytenoids only. 3a: epiglottis liftable. 3b: epiglottis adherent to pharynx. 4: no glottic structures."]],
p:["Optimise before repeating: position (ear-to-sternal-notch), BURP / external laryngeal manipulation, bougie, change blade or device."],
rel:["vl","bougie","ett"],aka:["Macintosh","Miller","McCoy","laryngoscope","Cormack"]},

{id:"vl",g:"airway",n:"Videolaryngoscopes",s:"Indirect laryngoscopy",
what:"Camera at the blade tip. <b>Macintosh-type</b> blades (C-MAC, McGrath Mac) allow direct or indirect view; <b>hyperangulated</b> blades (McGrath X3, GlideScope, C-MAC D-blade) give a view around the tongue but need a shaped stylet. Channelled devices (Airtraq, King Vision) guide the tube.",
ind:"First-line for intubation in many UK departments; predicted or encountered difficulty, cervical immobilisation, obesity, ICU and ED intubation, teaching.",
ci:"Blood or secretions obscuring the camera; limited mouth opening for some blades.",
steps:["Insert in the midline (hyperangulated) or as a Macintosh.","Obtain a view of the glottis that is not too close (leave room to manipulate).","Pass a stylet-shaped tube (hyperangulated: matched rigid stylet) along the blade curve, watching the screen.","Withdraw the stylet slightly as the tube enters the cords; advance and confirm with capnography."],
cx:"'Seeing but not passing' with hyperangulated blades, palatal and tonsillar injury from the stylet, fogging.",
p:["DAS 2015 recommends VL as an option at Plan A; NAP7 and recent guidance favour routine availability and skill.","A good view does not guarantee easy tube passage."],
rel:["laryngoscopes","bougie","ett"],aka:["videolaryngoscope","video laryngoscopy","C-MAC","McGrath","GlideScope","Airtraq"]},

{id:"bougie",g:"airway",n:"Bougie, stylets & exchange catheters",s:"Intubation aids",
what:"<b>Bougie</b> (gum-elastic or single-use, 60 cm, angled coudé tip): passed through the cords when the view is poor; tracheal rings give clicks and it 'holds up' in a small bronchus at ~30–40 cm. <b>Stylet</b>: malleable rod shaping the tube (must not protrude). <b>Airway exchange catheter</b> (Cook): hollow, allows O₂ insufflation and tube exchange. <b>Aintree</b> catheter: passed over a fibreoptic scope through a SAD to allow intubation.",
ind:"Grade 2b–3a views, tube exchange, staged extubation, intubation through a SAD.",
steps:["Bougie: pass with the coudé tip anterior under the epiglottis.","Feel clicks and hold-up (do not force beyond).","Keep the laryngoscope in place; railroad the tube with a 90° anticlockwise rotation to avoid the arytenoids.","Remove the bougie and confirm with capnography."],
cx:"Airway perforation and pneumothorax from forceful bougie or exchange catheter insertion; barotrauma with O₂ via exchange catheters (use low flow, avoid jet).",
p:["The bougie is part of the scalpel–bougie–tube FONA technique."],
rel:["vl","fona","fibreoptic"],aka:["bougie","gum elastic bougie","stylet","Aintree","airway exchange catheter","Frova"]},

{id:"fibreoptic",g:"airway",n:"Flexible bronchoscope & awake tracheal intubation",s:"DAS awake tracheal intubation (2020)",
what:"Awake tracheal intubation (ATI) keeps spontaneous breathing and airway tone while the airway is secured, using a flexible bronchoscope (often single-use, e.g. aScope) or videolaryngoscope. DAS 2020 'sTOP' elements: <b>s</b>edation (optional, minimal), <b>T</b>opicalisation, <b>O</b>xygenation (HFNO), <b>P</b>erformance (checking and success).",
ind:"Predicted difficult airway with difficult mask ventilation or SAD rescue, limited mouth opening, unstable cervical spine, head and neck pathology, high aspiration risk with difficult airway.",
ci:"Patient refusal, inability to cooperate, local anaesthetic allergy, rapidly deteriorating airway (critical obstruction: may need awake FONA).",
eqp:"Bronchoscope and screen, appropriately sized tube (6.0–7.0 loaded), lidocaine 2–4% topical and 10% spray (max 9 mg/kg lean body weight), atomiser (MADgic), glycopyrronium, remifentanil or dexmedetomidine (optional), HFNO.",
steps:["Consent, position (sitting up), monitoring, HFNO 30–70 L/min.","Antisialagogue (glycopyrronium 200 µg) if time allows.","Topical lidocaine to oropharynx and larynx (spray-as-you-go), test adequacy (e.g. oral airway tolerance).","Optional light sedation (remifentanil TCI 1–3 ng/mL or dexmedetomidine).","Advance the scope to visualise the cords and carina; railroad the tube with rotation.","Confirm with capnography (and scope view of carina) before inducing anaesthesia."],
cx:"Oversedation and obstruction, LA toxicity, laryngospasm, bleeding, failure (< 2% in DAS data).",
p:["Limit attempts: three by the operator plus one by a more experienced colleague (DAS ATI).","Confirm tracheal placement with two-point check: carina seen through the tube and capnography."],
rel:["bougie","ett","npa"],aka:["fibreoptic intubation","awake fibreoptic","ATI","bronchoscope","awake intubation","aScope"]},

{id:"fona",g:"airway",n:"Front-of-neck access (FONA)",s:"Scalpel–bougie–tube cricothyroidotomy",dg:["airway",2],
what:"The DAS 2015 Plan D technique for CICO: a surgical cricothyroidotomy through the cricothyroid membrane using a size 10 scalpel, bougie and size 6.0 cuffed tube. Needle techniques with high-pressure jet ventilation are no longer recommended as first-line for anaesthetists.",
ind:"Can't intubate, can't oxygenate (CICO) despite optimal attempts at Plans A–C.",
ci:"None in CICO; children < 8 years: needle cricothyroidotomy (small membrane) or surgical tracheostomy per paediatric guidance.",
eqp:"Scalpel with size 10 blade, bougie (coudé), cuffed tube size 6.0, syringe; FONA set on every difficult airway trolley.",
steps:["Declare CICO; ensure full neuromuscular block; continue upper-airway O₂.","Extend the neck; identify the cricothyroid membrane (laryngeal handshake) and stabilise the larynx with the non-dominant hand.","Palpable membrane: transverse stab incision through skin and membrane with the blade facing you.","Rotate the blade 90° so the sharp edge points caudally; pull it towards you to open the incision.","Slide the bougie's coudé tip along the blade into the trachea (10–15 cm).","Remove the blade; railroad the lubricated 6.0 cuffed tube; inflate the cuff; ventilate and confirm with capnography.","Impalpable membrane: 8–10 cm vertical midline incision, blunt finger dissection to identify the larynx, then proceed as above."],
cx:"Bleeding, false passage, oesophageal or posterior tracheal wall injury, subcutaneous emphysema, laryngeal injury, infection.",
p:["Mark the cricothyroid membrane (palpation or ultrasound) before induction in predicted difficult airways.","Practise regularly: rare, time-critical and skill-dependent."],
rel:["das","bougie"],aka:["cricothyroidotomy","FONA","front of neck access","CICO","scalpel bougie tube"]},

{id:"das",g:"airway",n:"Difficult airway plan (DAS 2015)",s:"Plans A–D for unanticipated difficulty",dg:["airway",2],
what:"The DAS guideline for unanticipated difficult tracheal intubation in adults (2015) structures management into Plans A–D with limited attempts, prioritising oxygenation over intubation, and with explicit declaration of failure at each step. Companion DAS guidelines cover obstetrics (OAA/DAS 2015), extubation (2012), ICU (2018), awake intubation (2020) and paediatrics (APA/DAS).",
steps:["Plan A: face mask ventilation and intubation, ≤ 3 + 1 attempts.","Declare failed intubation.","Plan B: second-generation SAD, ≤ 3 attempts; if it works, stop and think.","Plan C: final face-mask attempt; if it works, wake the patient.","Declare CICO.","Plan D: scalpel–bougie–tube FONA."],
chk:"At each step: maintain oxygenation, call for help early, communicate clearly ('I am declaring a failed intubation').",
cx:"Fixation on intubation, too many attempts (airway trauma converts 'can't intubate' to 'can't oxygenate'), delayed FONA.",
p:["NAP4: poor assessment, poor planning, failure to use capnography and delayed FONA were recurring themes.","Obstetric guideline adds the decision whether to wake or proceed (a 'proceed with surgery' table based on maternal and fetal condition)."],
rel:["fona","igel","vl","facemask"],aka:["DAS","difficult airway society","failed intubation","CICO"]},

{id:"dlt",g:"airway",n:"Double-lumen tubes & bronchial blockers",s:"Lung isolation for one-lung ventilation",
what:"<b>DLTs</b> (Robertshaw design, left or right, 35–41 Fr): tracheal and bronchial lumens with separate cuffs; left-sided DLTs are preferred (right main bronchus is short and the right upper lobe takes off within 2.5 cm). <b>Bronchial blockers</b> (Arndt, Uniblocker, EZ-blocker) pass through a single-lumen tube.",
ind:'Absolute: isolation to prevent contamination (abscess, haemorrhage), control of ventilation distribution (bronchopleural fistula, giant bulla), whole-lung lavage. Relative: surgical exposure (lobectomy, oesophagectomy, thoracoscopic surgery).',
steps:["Choose size (female 35–37 Fr, male 39–41 Fr) and side (usually left).","Laryngoscopy; pass the tip through the cords, remove the stylet, rotate 90° towards the intended bronchus and advance until resistance (~29 cm at the teeth for a 170 cm adult, +1 cm per 10 cm height).","Inflate tracheal cuff, check bilateral ventilation; inflate bronchial cuff (1–2 mL), clamp each side in turn.","Confirm with a fibreoptic scope: blue bronchial cuff just below the carina in the left main bronchus; right upper lobe orifice patent for right DLTs."],
chk:"Fibreoptic confirmation after positioning and after turning the patient lateral.",
cx:"Malposition (commonest), hypoxaemia during OLV, airway trauma (bronchial rupture with cuff over-inflation), difficulty in difficult airways (exchange to single-lumen tube at the end).",
p:["Hypoxaemia during OLV: check position, FiO₂ 1.0, CPAP to the non-ventilated lung, PEEP to the ventilated lung, intermittent two-lung ventilation, clamp the pulmonary artery (surgeon). See the Stage 14 OLV shunt diagram."],
rel:["ett","fibreoptic"],aka:["DLT","double lumen tube","Robertshaw","bronchial blocker","one-lung ventilation"]},

{id:"trache",g:"airway",n:"Tracheostomy tubes & emergencies",s:"Tube types and NTSP algorithms",
what:"Cuffed or uncuffed tubes with or without an inner cannula, fenestrated (for speech), adjustable flange; percutaneous (Seldinger dilatational, ICU) or surgical. A <b>laryngectomy</b> stoma has no connection to the upper airway; a tracheostomy usually does.",
ind:"Prolonged ventilation and weaning, upper-airway obstruction, pulmonary toilet, airway protection.",
steps:["Emergency (NTSP): call for help; look, listen, feel at the mouth and tracheostomy; apply high-flow O₂ to face and stoma.","Remove the speaking valve or cap and the inner tube.","Pass a suction catheter: if it does not pass, deflate the cuff.","If not improving: remove the tracheostomy tube.","Oxygenate via the upper airway (face mask, SAD) with the stoma covered, or via the stoma (paediatric mask or SAD on the stoma).","Secondary: oral intubation (uncut tube advanced beyond the stoma) or stoma intubation with a fibreoptic scope or bougie (small tube 6.0)."],
cx:"Displacement (especially early, before tract maturity ~7 days), blockage, bleeding (tracheo-innominate fistula: torrential), infection, tracheal stenosis, pneumothorax.",
p:["Bedhead signs (green for tracheostomy, red for laryngectomy) show the airway and emergency plan.","NAP4: half of ICU airway deaths involved displaced tracheostomies; capnography is mandatory in ventilated tracheostomy patients."],
rel:["ett","fona"],aka:["tracheostomy","laryngectomy","NTSP","trache"]}
]);
