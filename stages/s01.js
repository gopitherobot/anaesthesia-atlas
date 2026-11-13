/* Stage 01 · Respiratory physiology */
(function(){
const {plot,range,el,hill,contentO2,pFromContent,SVGNS,fmt,$,$$}=ATLAS.h;
const BARS=[];
const FAM={o2:["spo2","Oxygen"],co2:["etco2","Carbon dioxide"],mech:["ecg","Mechanics"],vq:["nibp","V/Q & circulation"],app:["abp","Applied"]};
const SLIDES=[
{f:"o2",t:"Oxygen cascade",b:`<p>PO2 falls stepwise from air to mitochondria. Each step has one equation and one cause of hypoxia.</p>
<div class="tbl"><table><tr><th>Step</th><th>PO2 kPa</th><th>Why it falls</th></tr>
<tr><td>Dry air</td><td class="mono">21.2</td><td>0.21 × 101.3</td></tr><tr><td>Trachea</td><td class="mono">19.9</td><td>Humidified: SVP water 6.3 kPa at 37 °C</td></tr>
<tr><td>Alveolus</td><td class="mono">13.3–14</td><td>CO2 added (PACO2/RQ): alveolar gas equation</td></tr><tr><td>Arterial</td><td class="mono">12.5–13.3</td><td>A–a difference: V/Q scatter, shunt (2–5%), diffusion</td></tr>
<tr><td>Capillary / tissue</td><td class="mono">5–6</td><td>Extraction</td></tr><tr><td>Mitochondria</td><td class="mono">1–1.5</td><td>Pasteur point ≈ 0.13–0.3 kPa (1–2 mmHg)</td></tr></table></div>`,
p:"Normal A–a difference on air is under 2 kPa, wider with age and with FiO2 (up to ~10 kPa on 100% O2).",
v:"Start with the definition, then draw the staircase with numbers on the y-axis, then name the equation that governs each step."},
{f:"o2",t:"Oxygen content, delivery and consumption",b:`<div class="eq">CaO2 = (1.34 × Hb × SaO2) + (0.0225 × PaO2 kPa)   ≈ 20 mL/dL</div>
<div class="eq">DO2 = CO × CaO2 × 10   ≈ 1000 mL/min (≈ 600 mL/min/m²)</div>
<div class="eq">VO2 = CO × (CaO2 − CvO2) × 10   ≈ 250 mL/min   (Fick)</div>
<ul class="clean"><li>O2ER = VO2/DO2 ≈ 0.25. Heart ≈ 0.6, so the heart can only raise supply by raising flow.</li>
<li>Critical DO2 ≈ 4–8 mL/kg/min: below it VO2 becomes supply-dependent and lactate rises.</li>
<li>Hüfner's constant 1.39 in theory, 1.34 in vivo (COHb, MetHb).</li>
<li>Dissolved O2 at 3 ATA on 100% O2 ≈ 6 mL/dL, enough to meet resting needs without Hb.</li></ul>`,
p:"SvO2 70–75% is the global balance: low means DO2 has fallen or VO2 has risen; high in sepsis and cyanide (cells not extracting).",
v:"Examiner favourite: 'How would you increase oxygen delivery?' Answer by the terms of the equation: CO (HR, preload, contractility, afterload), Hb (transfuse), SaO2 (FiO2, PEEP, recruit), then reduce VO2 (sedation, cooling, ventilation)."},
{f:"o2",t:"Oxyhaemoglobin dissociation curve",b:`<p>Sigmoid because of cooperative binding: T (tense) to R (relaxed) state change as each O2 binds. Draw three anchor points first.</p>
<ul class="clean"><li><b>Arterial</b> 13.3 kPa, 97–98%</li><li><b>Venous</b> 5.3 kPa, 75%</li><li><b>P50</b> 3.5 kPa (26.6 mmHg)</li></ul>
<p><b>Right shift (P50 up):</b> ↑CO2, ↓pH (Bohr), ↑temperature, ↑2,3-DPG, HbS, pregnancy, anaemia (via DPG), chronic altitude.<br><b>Left shift:</b> the reverse, plus HbF (P50 ≈ 2.4), COHb, MetHb, stored blood (low DPG), hypothermia.</p>
<p>Flat top protects loading when PAO2 drops; steep middle allows unloading for a small fall in PO2.</p>`,
p:"Double Bohr effect at the placenta: maternal curve shifts right and fetal curve shifts left as CO2 moves across. A double Haldane effect also operates.",
v:"Use the Diagrams tab to shift the curve live, then explain each factor with its mechanism."},
{f:"o2",t:"Hypoxia: classification",b:`<p><b>Hypoxia</b> is inadequate O2 at tissue level. <b>Hypoxaemia</b> is a low PaO2. You can have one without the other.</p>
<div class="tbl"><table><tr><th>Type</th><th>PaO2</th><th>CaO2</th><th>SvO2</th><th>Example</th></tr>
<tr><td>Hypoxaemic</td><td>↓</td><td>↓</td><td>↓</td><td>Low FiO2, hypoventilation, V/Q mismatch, shunt, diffusion</td></tr>
<tr><td>Anaemic</td><td>N</td><td>↓</td><td>↓</td><td>Haemorrhage, CO poisoning, MetHb</td></tr>
<tr><td>Stagnant (ischaemic)</td><td>N</td><td>N</td><td>↓</td><td>Cardiogenic shock, embolus</td></tr>
<tr><td>Histotoxic</td><td>N</td><td>N</td><td>↑</td><td>Cyanide, late sepsis</td></tr></table></div>
<p><b>Five causes of hypoxaemia:</b> low PiO2, hypoventilation (normal A–a), V/Q mismatch, shunt, diffusion limitation (the last three widen A–a).</p>`,
p:"Only shunt fails to correct with 100% O2. Hypoventilation corrects with O2 but CO2 keeps rising, so watch the capnograph, not just SpO2.",
v:"For 'causes of postoperative hypoxaemia' sort by the five mechanisms, then give a theatre example for each: opioid hypoventilation, atelectasis shunt, aspiration V/Q, pulmonary oedema diffusion, hypoxic gas from the pipeline."},
{f:"co2",t:"CO2 transport and the Haldane effect",b:`<p>CO2 is ~20× more soluble than O2. Body stores ~120 L, so PaCO2 rises slowly in apnoea (~0.4–0.8 kPa/min).</p>
<div class="tbl"><table><tr><th>Form</th><th>% of total arterial CO2</th><th>% of the a–v difference</th></tr>
<tr><td>Bicarbonate</td><td class="mono">90</td><td class="mono">60</td></tr><tr><td>Carbamino (on Hb –NH2)</td><td class="mono">5</td><td class="mono">30</td></tr><tr><td>Dissolved</td><td class="mono">5</td><td class="mono">10</td></tr></table></div>
<ul class="clean"><li>Carbonic anhydrase in RBC speeds CO2 + H2O ⇌ H2CO3 by ~1000×.</li><li>HCO3− leaves the cell; Cl− enters: <b>chloride (Hamburger) shift</b>. Venous RBCs are slightly larger (osmotic water entry).</li>
<li><b>Haldane:</b> deoxy-Hb carries more CO2, because it forms carbamino more readily and is a better H+ buffer. Accounts for about half of CO2 exchange.</li></ul>`,
p:"Bohr effect is CO2 changing O2 affinity. Haldane effect is O2 changing CO2 carriage. Say both in one sentence to show you know the difference.",
v:"'Draw the events in the red cell.' Draw tissue → plasma → RBC, carbonic anhydrase, HCO3− out, Cl− in, H+ buffered by Hb, carbamino formation."},
{f:"co2",t:"Control of ventilation",b:`<p><b>Controller:</b> medulla (dorsal group = inspiration, ventral group = active expiration, pre-Bötzinger complex = rhythm generator); pons (pneumotaxic shortens inspiration, apneustic prolongs it).</p>
<p><b>Sensors:</b></p><ul class="clean">
<li><b>Central chemoreceptors</b>, ventral medulla: respond to H+ in CSF from CO2 crossing the BBB. About 80% of the CO2 drive. CSF has little protein, so small changes matter. HCO3− transport resets them in 24–48 h.</li>
<li><b>Peripheral chemoreceptors</b>, carotid bodies (IX) and aortic bodies (X): respond to PaO2 (not content), also CO2 and H+ (carotid only). Fast. Glomus type I cells with O2-sensitive K+ channels. Blood flow ~2 L/100 g/min.</li>
<li>Lung receptors: stretch (Hering–Breuer), irritant, J receptors (C fibres). Also muscle/joint receptors, baroreceptors, cortex, limbic system.</li></ul>
<p><b>Effectors:</b> diaphragm (C3–5), intercostals, accessory muscles.</p>
<p>CO2 response slope ≈ 15–20 L/min per kPa (doubling PaCO2 roughly quadruples MV). Hypoxic drive is flat until PaO2 &lt; 8 kPa, then steep; hypercapnia steepens it.</p>`,
p:"Volatiles at 0.1 MAC blunt the hypoxic response. Opioids shift the CO2 curve right and flatten it. Doxapram acts on the carotid bodies.",
v:"Structure: controller, sensors, effectors, then the two graphs (MV vs PaCO2, MV vs PaO2). Then drugs and disease (COPD, sleep, age)."},
{f:"co2",t:"Effects of hypercapnia and hypocapnia",b:`<div class="tbl"><table><tr><th>System</th><th>Raised PaCO2</th><th>Low PaCO2</th></tr>
<tr><td>CNS</td><td>CBF ↑ ~ 4%/mmHg (≈ 30%/kPa) between 3–10 kPa; ICP ↑; narcosis above ~10–12 kPa</td><td>Cerebral vasoconstriction, ischaemia below ~3.5 kPa, seizure threshold ↓</td></tr>
<tr><td>CVS</td><td>Sympathetic surge: HR, CO, BP ↑; direct myocardial depression and vasodilatation; arrhythmias</td><td>↓CO, coronary vasoconstriction</td></tr>
<tr><td>Pulmonary</td><td>PVR ↑, HPV potentiated, right shift ODC</td><td>HPV inhibited, bronchoconstriction</td></tr>
<tr><td>Renal / metabolic</td><td>Acidosis, K+ ↑, HCO3− retention over 3–5 days</td><td>Alkalosis, K+ and ionised Ca2+ ↓ (tetany)</td></tr></table></div>`,
p:"Laparoscopy is the classic theatre cause of rising EtCO2: CO2 absorption, then ask about subcutaneous emphysema, capnothorax and CO2 embolism.",
v:"Examiners ask 'effects on the renal system in particular': mention renal vasoconstriction, sympathetic activation, renin–angiotensin–ADH, HCO3− reabsorption and H+ secretion."},
{f:"vq",t:"Ventilation–perfusion, shunt and dead space",b:`<p>Overall V/Q ≈ 4/5 = 0.8. Apex ≈ 3 (high PO2, TB likes it); base ≈ 0.6. Both V and Q increase towards the base, Q more steeply.</p>
<ul class="clean"><li><b>Shunt</b> (V/Q = 0): physiological 2–5% (bronchial veins, Thebesian veins); pathological = atelectasis, consolidation, OLV, R→L intracardiac, AV malformation.</li>
<li><b>Dead space</b> (V/Q = ∞): anatomical ≈ 2 mL/kg (Fowler, generations 0–16), alveolar (PE, low CO, high PEEP), physiological = both (Bohr), VD/VT ≈ 0.3.</li>
<li>Shunt barely raises PaCO2 because chemoreceptors raise ventilation and the CO2 curve is linear; the O2 curve is flat at the top so high-V/Q units cannot compensate for low-V/Q units.</li></ul>`,
p:"Lateral position: awake, the dependent lung gets ~60% of ventilation and most perfusion. Under GA with IPPV, the non-dependent lung gets ~60% of ventilation while perfusion stays dependent, so V/Q worsens.",
v:"Draw the V and Q lines against rib level with V/Q on a second axis, then the shunt diagram (QT, QS, CcO2, CvO2, CaO2)."},
{f:"vq",t:"Pulmonary circulation and HPV",b:`<p>Low-pressure, low-resistance: MPAP ≈ 15 mmHg, PVR ≈ 1/10 of SVR (50–150 dyn·s·cm⁻⁵). Rising PAP lowers PVR by <b>recruitment</b> then <b>distension</b>.</p>
<p><b>Hypoxic pulmonary vasoconstriction</b>: local arteriolar constriction when PAO2 (mainly) and PvO2 fall, starting below ~13 kPa, biphasic (seconds, then a sustained phase over hours). Mechanism: inhibition of O2-sensitive K+ channels → depolarisation → Ca2+ entry; reduced NO; endothelin. Works in the isolated lung, so not neural.</p>
<div class="tbl"><table><tr><th>Enhance HPV</th><th>Inhibit HPV</th></tr>
<tr><td>Acidosis, hypercapnia, COX inhibitors, almitrine, low PvO2</td><td>Volatiles (dose-dependent, minor below 1 MAC), vasodilators (GTN, SNP, NO, CCB, PDE3/5 inhibitors), alkalosis, hypocapnia, infection/sepsis, very high or low PAP, high FiO2</td></tr></table></div>`,
p:"In OLV, HPV roughly halves blood flow to the non-ventilated lung. TIVA does not inhibit HPV; at below 1 MAC volatiles make little clinical difference.",
v:"PVR = (MPAP − PCWP)/CO × 80. Name the three main determinants: HPV, lung volume, pulmonary artery pressure."},
{f:"mech",t:"Lung volumes, FRC and closing capacity",b:`<ul class="clean"><li>TLC 6 L, VC 4.5–4.8 L, TV 0.5 L, IRV 2.5 L, ERV 1.2–1.5 L, RV 1.2–1.5 L.</li>
<li><b>FRC</b> ≈ 3 L upright, ~2.2 L supine: the balance of lung recoil inwards against chest wall outwards. It is the O2 store during apnoea.</li>
<li>FRC falls with supine (−0.5 to −1 L), induction of GA (−15–20%), obesity, pregnancy, abdominal distension. It rises with PEEP, emphysema, asthma (gas trapping), upright posture.</li>
<li><b>Closing capacity</b> = RV + closing volume. It rises with age, smoking and lung disease, reaching FRC supine in the mid-40s and upright in the mid-60s. When CC &gt; FRC, airways close during tidal breathing → shunt.</li></ul>`,
p:"Preoxygenation turns the FRC from ~450 mL of O2 into ~2000 mL, about 8 min of apnoea in a healthy adult (VO2 250 mL/min). Obesity, pregnancy and children desaturate much faster.",
v:"Draw the spirometer trace starting at FRC 3 L. Say which volumes spirometry cannot measure and how you would measure them (helium dilution, N2 washout, plethysmography: only the last catches trapped gas)."},
{f:"mech",t:"Compliance, surfactant and work of breathing",b:`<ul class="clean"><li>Compliance = ΔV/ΔP. Lung ≈ 200 mL/cmH2O, chest wall ≈ 200, total ≈ 100 (reciprocals add, like capacitors).</li>
<li><b>Static</b> (no flow, plateau pressure): elastic only. <b>Dynamic</b> (peak pressure): elastic plus airway resistance, so lower.</li>
<li><b>Laplace</b>: P = 2T/r. Small alveoli would empty into large ones. Surfactant (DPPC from type II pneumocytes) lowers T more as the alveolus shrinks, stabilising alveoli, raising compliance and keeping alveoli dry.</li>
<li><b>Hysteresis</b>: inflation needs more pressure than deflation for the same volume (surfactant behaviour, recruitment). The loop area is energy lost as heat.</li>
<li><b>Time constant</b> τ = C × R ≈ 0.2 s; 95% emptying takes 3τ. ARDS: short τ. Asthma: long τ → breath stacking and intrinsic PEEP.</li></ul>`,
p:"Under GA, apical alveoli move to the steep part of the P–V curve and basal alveoli to the flat bottom part. This is why the non-dependent lung is better ventilated.",
v:"Draw the P–V loop: sigmoid inspiration, smooth expiration, tidal loop around FRC, A (apex) high on the curve and B (base) low."},
{f:"mech",t:"Spirometry and flow–volume loops",b:`<div class="tbl"><table><tr><th>Pattern</th><th>FEV1</th><th>FVC</th><th>FEV1/FVC</th><th>TLC</th></tr>
<tr><td>Obstructive</td><td>↓↓</td><td>N/↓</td><td>&lt; 0.7</td><td>N/↑</td></tr><tr><td>Restrictive</td><td>↓</td><td>↓↓</td><td>N or ↑</td><td>↓</td></tr></table></div>
<ul class="clean"><li>Reversibility: FEV1 rise ≥ 12% and ≥ 200 mL after bronchodilator.</li>
<li>Variable <b>extrathoracic</b> obstruction flattens the <b>inspiratory</b> limb. Variable <b>intrathoracic</b> obstruction flattens the <b>expiratory</b> limb. <b>Fixed</b> obstruction flattens both.</li>
<li>Effort-independence of the expiratory limb is due to dynamic airway compression (equal pressure point).</li></ul>`,
p:"An anterior mediastinal mass gives a variable intrathoracic pattern that worsens supine and under GA. Keep spontaneous ventilation and have rigid bronchoscopy and ECMO options ready.",
v:"Always draw the normal loop first, volume axis with TLC on the left, expiration above the axis."},
{f:"app",t:"Heart–lung interactions",b:`<p><b>Pressures to define:</b> transpulmonary = Palv − Ppleural (distends the lung). Transmural = intracardiac − Ppleural (distends the heart). How much airway pressure reaches the pleura depends on the ratio of lung to chest wall compliance (stiff lungs transmit less; stiff chest wall/obesity/raised IAP transmit more).</p>
<div class="tbl"><table><tr><th></th><th>Spontaneous inspiration (ITP ↓)</th><th>Positive-pressure inspiration (ITP ↑)</th></tr>
<tr><td>Venous return</td><td>↑ (Pms − RAP gradient widens)</td><td>↓</td></tr>
<tr><td>RV afterload</td><td>Small change</td><td>↑ with lung volume (PVR, zone 1/2)</td></tr>
<tr><td>LV preload</td><td>↓ (septal shift, pooling in lung)</td><td>Briefly ↑ (blood squeezed from lung), then ↓ after a few beats</td></tr>
<tr><td>LV afterload</td><td>↑ (transmural pressure rises)</td><td>↓ (helps the failing LV)</td></tr></table></div>
<p><b>Clinical uses:</b> pulsus paradoxus (&gt; 10 mmHg inspiratory fall: tamponade, severe asthma); PPV/SVV &gt; 12–13% predicts fluid responsiveness only with controlled ventilation, VT ≥ 8 mL/kg, sinus rhythm, closed chest and no RV failure; CPAP in cardiogenic pulmonary oedema; hypotension after intubation in the hypovolaemic patient; weaning failure from cardiac causes.</p>`,
p:"Asked in at least two EDAIC sessions as 'describe the mechanisms that change transpulmonary pressure'. Answer with chest wall versus lung compliance, PEEP, intra-abdominal pressure, posture and effort.",
v:"Lead with the two definitions, draw the PPV arterial trace showing pulse pressure maximum in inspiration and minimum in expiration (a reverse pulsus), then list clinical applications."},
{f:"app",t:"Effects of anaesthesia on the lung",b:`<ul class="clean"><li><b>Control:</b> CO2 response depressed and shifted right; hypoxic response abolished at low volatile concentrations; BMR falls ~15%.</li>
<li><b>Mechanics:</b> FRC −15–20% within minutes (loss of diaphragm and intercostal tone, cephalad diaphragm), compliance ↓, resistance ↑.</li>
<li><b>Atelectasis</b> in ~90% of patients, dependent regions, 5–10% of lung: compression, absorption (high FiO2) and surfactant impairment. Shunt rises to ~10%.</li>
<li><b>Dead space:</b> alveolar ↑ (PPV, low CO), anatomical ↓ with ETT but apparatus dead space ↑.</li>
<li>HPV inhibited by volatiles; mucociliary clearance ↓ (dry gases, N2O, volatiles).</li></ul>`,
p:"Prevention: preoxygenate with FiO2 up to 1.0 for safety, then lower FiO2 after intubation, add PEEP 5–8 cmH2O, recruitment manoeuvres, and CPAP during induction in obese patients.",
v:"Classify by control, mechanics, gas exchange, and defence mechanisms. Then say what you do about each."},
{f:"app",t:"Oxygen therapy, HFNO and oxygen toxicity",b:`<ul class="clean"><li><b>HFNO</b> (up to 60–70 L/min, heated, humidified): matches peak inspiratory flow so FiO2 is reliable, washes out nasopharyngeal dead space, gives ~1 cmH2O PEEP per 10 L/min with the mouth closed, improves mucociliary function and comfort. <b>THRIVE</b> extends safe apnoea time and slows the CO2 rise (apnoeic oxygenation plus some apnoeic ventilation from turbulent flow and cardiogenic oscillations).</li>
<li><b>Absorption atelectasis</b>: without N2 as a splint, O2 is absorbed from poorly ventilated units faster than it is replaced. Seen within minutes at FiO2 1.0.</li>
<li><b>Pulmonary toxicity</b> (Lorrain Smith): reactive oxygen species; tracheobronchitis after FiO2 &gt; 0.6 for 24 h, then diffuse alveolar damage. <b>CNS toxicity</b> (Paul Bert): seizures at PO2 &gt; ~2 ATA (diving, hyperbaric).</li>
<li>Others: retinopathy of prematurity, loss of hypoxic drive in CO2 retainers (mostly V/Q worsening and Haldane effect), systemic and coronary vasoconstriction, bleomycin lung.</li>
<li>Targets: SpO2 94–98% for most; 88–92% if at risk of hypercapnic failure (BTS).</li></ul>`,
p:"Paraquat and bleomycin: avoid high FiO2. Use the lowest FiO2 that achieves target saturation.",
v:"Asked as 'side effects of 100% oxygen, especially absorption atelectasis'. Classify: respiratory, CNS, eye, cardiovascular, CO2 retention, fire risk."},
{f:"app",t:"Altitude, diving and hyperbaric O2",b:`<ul class="clean"><li>Pressure halves every ~5500 m (18 000 ft). FiO2 stays 0.21; PiO2 falls. At 19 200 m (Armstrong line) Patm = SVP water, so PiO2 = 0.</li>
<li><b>Acute:</b> hypoxic hyperventilation → respiratory alkalosis, tachycardia, HPV. <b>Days:</b> renal HCO3− loss, CSF HCO3− correction, ↑2,3-DPG (right shift). <b>Weeks:</b> EPO, polycythaemia, capillary density, mitochondrial changes. Extreme altitude: left shift from alkalosis.</li>
<li>AMS, HAPE (exaggerated uneven HPV; nifedipine, descent), HACE (dexamethasone, descent). Acetazolamide prevents AMS by creating a metabolic acidosis that drives ventilation.</li>
<li><b>Diving:</b> +1 atm per 10 m. N2 narcosis below ~30 m, O2 toxicity, decompression sickness (bubbles; treat with recompression), barotrauma, pulmonary oedema with long snorkels.</li>
<li><b>Hyperbaric O2:</b> CO poisoning, gas embolism, DCS, necrotising infection, radiation injury. Absolute contraindication: untreated pneumothorax.</li></ul>`,
p:"Vaporisers at altitude: a TEC vaporiser delivers the same partial pressure, so the clinical effect is unchanged even though the % reading rises. Desflurane's Tec 6 delivers a fixed %, so the partial pressure falls; turn it up.",
v:"Use the alveolar gas equation at altitude in your answer: PAO2 = 0.21 × (Patm − 6.3) − PaCO2/0.8, and show how hyperventilation rescues PAO2."},
{f:"app",t:"Non-respiratory functions of the lung",b:`<ul class="clean"><li><b>Filter:</b> clots, fat, air, cell aggregates (lost with R→L shunt or CPB, hence paradoxical embolism).</li>
<li><b>Reservoir:</b> ~500 mL blood, mobilised in haemorrhage.</li>
<li><b>Metabolic:</b> ACE converts angiotensin I → II and inactivates bradykinin. Removes serotonin (~98%), noradrenaline (~30%), PGE2/F2α, leukotrienes. Spares adrenaline, dopamine, histamine, isoprenaline, AII, vasopressin, PGI2.</li>
<li><b>Drug uptake:</b> first-pass uptake of fentanyl, lidocaine, propranolol, pethidine.</li>
<li><b>Synthesis:</b> surfactant, heparin and histamine (mast cells), NO, prostaglandins.</li>
<li><b>Defence:</b> mucociliary escalator, IgA, alveolar macrophages, α1-antitrypsin.</li>
<li>Also: heat and water loss, acid–base, phonation, fibrinolysis (plasminogen activator).</li>
<li><b>Lymphatics:</b> up to ~20 mL/h normally, rising ~10-fold; they keep alveoli dry until interstitial capacity is exceeded (Kerley B lines, cuffing on CXR).</li></ul>`,
p:"Mnemonic FRAMES-D: Filter, Reservoir, ACE/Metabolic, Mast cell products, Endocrine/eicosanoids, Surfactant, Defence.",
v:"A pure knowledge question. Classify first; the examiner wants breadth before depth."},
];
const CALCS=[
 {t:"Alveolar gas equation and A–a gradient",c:"spo2",in:[["FiO2","fio2",0.21],["Patm kPa","patm",101.3],["PaCO2 kPa","paco2",5.3],["RQ","rq",0.8],["PaO2 kPa","pao2",12.5],["Age yr","age",40]],
  f:v=>{const PA=v.fio2*(v.patm-6.3)-v.paco2/v.rq,g=PA-v.pao2,pf=v.pao2/v.fio2,exp=(v.age/4+4)*0.133;return [["PAO2 kPa",fmt(PA)],["A–a kPa",fmt(g),v.fio2<=0.25?(g>Math.max(2,exp)?"bad":"ok"):""],["P/F kPa",fmt(pf,0),pf<13.3?"bad":pf<26.7?"warn":"ok"],["Age-expected A–a",fmt(exp)]]},
  n:"PAO2 = FiO2 (Patm − 6.3) − PaCO2/RQ. P/F < 40 kPa (300 mmHg) mild ARDS, < 26.7 moderate, < 13.3 severe (Berlin, with PEEP ≥ 5). Expected A–a in mmHg ≈ age/4 + 4."},
 {t:"O2 content, delivery, consumption",c:"abp",in:[["Hb g/dL","hb",14],["SaO2 %","sao2",98],["PaO2 kPa","pao2",13],["SvO2 %","svo2",75],["PvO2 kPa","pvo2",5.3],["CO L/min","co",5]],
  f:v=>{const ca=1.34*v.hb*v.sao2/100+0.0225*v.pao2,cv=1.34*v.hb*v.svo2/100+0.0225*v.pvo2,d=v.co*ca*10,vo=v.co*(ca-cv)*10;return [["CaO2 mL/dL",fmt(ca)],["CvO2 mL/dL",fmt(cv)],["DO2 mL/min",fmt(d,0),d<600?"bad":"ok"],["VO2 mL/min",fmt(vo,0)],["O2ER",fmt(vo/d,2),vo/d>0.35?"warn":"ok"]]},
  n:"Hüfner 1.34 mL/g; dissolved 0.0225 mL/dL/kPa (0.003 per mmHg). O2ER > 0.5 approaches the anaerobic limit."},
 {t:"Shunt fraction (Berggren)",c:"nibp",in:[["Hb g/dL","hb",14],["FiO2","fio2",1.0],["PaCO2 kPa","paco2",5.3],["PaO2 kPa","pao2",30],["SaO2 %","sao2",100],["SvO2 %","svo2",70],["PvO2 kPa","pvo2",5]],
  f:v=>{const PA=v.fio2*95-v.paco2/0.8,cc=1.34*v.hb+0.0225*PA,ca=1.34*v.hb*v.sao2/100+0.0225*v.pao2,cv=1.34*v.hb*v.svo2/100+0.0225*v.pvo2,q=(cc-ca)/(cc-cv);return [["PAO2 kPa",fmt(PA)],["Cc'O2",fmt(cc)],["CaO2",fmt(ca)],["Qs/Qt %",fmt(q*100),q>0.3?"bad":q>0.1?"warn":"ok"]]},
  n:"Qs/Qt = (Cc'O2 − CaO2)/(Cc'O2 − CvO2). Cc'O2 assumes end-capillary blood fully saturated at PAO2. Normal 2–5%. Measure on FiO2 1.0 to exclude V/Q mismatch."},
 {t:"Bohr dead space",c:"etco2",in:[["PaCO2 kPa","paco2",5.3],["Mixed expired PECO2 kPa","peco2",3.7],["VT mL","vt",500],["RR /min","rr",12]],
  f:v=>{const r=(v.paco2-v.peco2)/v.paco2,vd=r*v.vt,va=(v.vt-vd)*v.rr/1000;return [["VD/VT",fmt(r,2),r>0.45?"bad":r>0.35?"warn":"ok"],["VD mL",fmt(vd,0)],["Alveolar vent L/min",fmt(va,2)]]},
  n:"Enghoff modification uses PaCO2 (physiological dead space). With EtCO2 instead of mixed expired, you get alveolar dead space: (PaCO2 − EtCO2)/PaCO2."},
 {t:"Ventilator mechanics",c:"ecg",in:[["VT mL","vt",450],["Ppeak cmH2O","pk",22],["Pplat cmH2O","pl",17],["PEEP cmH2O","peep",5],["Flow L/s","fl",0.8],["PBW kg","pbw",65]],
  f:v=>{const cs=v.vt/(v.pl-v.peep),cd=v.vt/(v.pk-v.peep),dp=v.pl-v.peep,raw=(v.pk-v.pl)/v.fl,tau=cs/1000*raw;return [["Cstat mL/cmH2O",fmt(cs,0)],["Cdyn",fmt(cd,0)],["Driving P",fmt(dp,0),dp>15?"bad":"ok"],["Raw cmH2O/L/s",fmt(raw,1),raw>15?"warn":"ok"],["τ s",fmt(tau,2)],["VT mL/kg PBW",fmt(v.vt/v.pbw,1),v.vt/v.pbw>8?"bad":"ok"]]},
  n:"Lung-protective: VT 6 mL/kg PBW, Pplat ≤ 30, driving pressure ≤ 15. Peak − plateau rising alone = resistance problem (tube, bronchospasm); both rising = compliance problem (pneumothorax, endobronchial tube, ARDS)."},
 {t:"Pulmonary and systemic vascular resistance",c:"nibp",in:[["MPAP mmHg","mpap",15],["PCWP mmHg","pcwp",8],["MAP mmHg","map",90],["CVP mmHg","cvp",5],["CO L/min","co",5],["BSA m²","bsa",1.8]],
  f:v=>{const pvr=(v.mpap-v.pcwp)/v.co*80,svr=(v.map-v.cvp)/v.co*80,wu=(v.mpap-v.pcwp)/v.co;return [["PVR dyn·s·cm⁻⁵",fmt(pvr,0),pvr>250?"bad":"ok"],["PVR Wood units",fmt(wu,1),wu>2?"warn":"ok"],["SVR",fmt(svr,0)],["CI L/min/m²",fmt(v.co/v.bsa,1)]]},
  n:"Pulmonary hypertension (2022 ESC/ERS): mPAP > 20 mmHg; pre-capillary if PAWR ≤ 15 and PVR > 2 WU. 1 WU = 80 dyn·s·cm⁻⁵."},
 {t:"Preoxygenation and safe apnoea",c:"spo2",in:[["FRC mL","frc",2500],["End-tidal FeO2","feo2",0.9],["VO2 mL/min","vo2",250],["Hb g/dL","hb",14],["Blood vol L","bv",5]],
  f:v=>{const lung=v.frc*v.feo2,lungAir=v.frc*0.14,blood=v.bv*10*(1.34*v.hb*0.98)*0.25;const t=(lung*0.8+blood)/v.vo2;return [["Lung O2 store mL",fmt(lung,0)],["…on air",fmt(lungAir,0)],["Usable blood O2",fmt(blood,0)],["≈ time to SpO2 90% min",fmt(t,1)]]},
  n:"Rough model (assumes ~80% of lung O2 usable plus a quarter of arterial content before SpO2 hits 90%). Obesity, pregnancy and sepsis cut FRC and raise VO2. Aim for FeO2 ≥ 0.9."},
 {t:"Altitude: inspired and alveolar O2",c:"etco2",in:[["Altitude m","alt",3600],["FiO2","fio2",0.21],["PaCO2 kPa","paco2",4.0]],
  f:v=>{const p=101.3*Math.exp(-v.alt/7990),pi=v.fio2*(p-6.3),pa=pi-v.paco2/0.8;return [["Patm kPa",fmt(p)],["PiO2 kPa",fmt(pi)],["PAO2 kPa",fmt(pa),pa<8?"bad":pa<10?"warn":"ok"],["Predicted SaO2 %",fmt(100*hill(Math.max(pa-1,0.1),3.8),0)]]},
  n:"Barometric formula with scale height ~8 km. Lower PaCO2 to see how hyperventilation rescues PAO2. Everest summit: Patm ≈ 33 kPa."},
];
const TABLES=[
 ["Causes of hypoxaemia by mechanism",["Mechanism","A–a gradient","Corrects with O2?","Theatre example"],[
  ["Low PiO2","Normal","Yes","Hypoxic mixture, altitude, empty cylinder, N2O without O2 failsafe"],["Hypoventilation","Normal","Yes (CO2 still high)","Opioids, residual block, high spinal"],["V/Q mismatch","↑","Yes","Bronchospasm, aspiration, positioning"],["Shunt","↑","Poorly (> 30% barely)","Atelectasis, endobronchial intubation, OLV, PFO"],["Diffusion","↑","Yes","Pulmonary oedema, fibrosis, exercise at altitude"]]],
 ["Factors shifting the ODC",["Right shift (P50 ↑)","Left shift (P50 ↓)"],[["↑ PCO2, ↓ pH (Bohr)","↓ PCO2, ↑ pH"],["↑ Temperature","Hypothermia"],["↑ 2,3-DPG (anaemia, altitude, chronic hypoxia, hyperthyroid)","↓ 2,3-DPG (stored blood, hypophosphataemia, septic shock)"],["HbS, pregnancy","HbF, myoglobin"],["Volatile agents (minor)","COHb, MetHb"]]],
 ["Anatomical dead space",["Increased by","Decreased by"],[["Neck extension, jaw protrusion","Neck flexion"],["Increasing age, lung volume (bronchial traction)","Tracheal intubation, tracheostomy (bypass ~70 mL)"],["Anticholinergics (bronchodilatation)","Supine posture"],["Apparatus: HME, catheter mount, facemask","Low lung volume, bronchoconstriction"]]],
 ["Alveolar dead space",["Cause","Mechanism"],[["Pulmonary embolism (thrombus, air, fat, amniotic)","Perfusion lost"],["Hypotension, low cardiac output, haemorrhage","Zone 1 enlarges"],["High PEEP, high airway pressure","Alveolar capillaries compressed"],["Emphysema","Capillary bed destroyed"],["Lateral position with IPPV","Ventilation goes to the non-dependent lung"]]],
 ["FRC",["Increased","Decreased"],[["Upright posture","Supine (−0.5 to −1 L), Trendelenburg"],["PEEP, CPAP","General anaesthesia (−15–20%), neuromuscular block"],["Emphysema, asthma (gas trapping)","Obesity, pregnancy, ascites, abdominal packing"],["Tall stature, male","Restrictive disease, pulmonary oedema, infancy"]]],
 ["Modifiers of HPV",["Enhance","Inhibit"],[["Hypercapnia, acidosis","Hypocapnia, alkalosis"],["Low PvO2 (low cardiac output)","Volatiles > 1 MAC (dose-dependent)"],["COX inhibitors, almitrine","GTN, SNP, inhaled NO, CCB, milrinone, sildenafil, β2 agonists"],["Propranolol","Sepsis, infection, very high or low PAP, high FiO2 to hypoxic units"]]],
 ["Respiratory chemoreceptors",["Feature","Central","Peripheral"],[["Site","Ventral medulla","Carotid bodies (bifurcation), aortic bodies (arch)"],["Afferent","Direct","IX (carotid, via Hering), X (aortic)"],["Stimulus","H+ in CSF (from PaCO2)","↓PaO2 (< 8 kPa), ↑PaCO2, ↓pH (carotid only), hypoperfusion"],["Share of CO2 drive","~80%","~20%"],["Speed","Slower (tens of seconds)","Fast (seconds)"],["Adaptation","Resets in 24–48 h (HCO3− transport)","Little"],["Drugs","Opioids depress","Volatiles abolish hypoxic response at 0.1 MAC; doxapram, almitrine stimulate"]]],
 ["Hypoxia types with arterial and venous values",["Type","Hb","SaO2","PaO2","SvO2","CaO2 / CvO2 mL/dL"],[["Normal","15","100","13.3","75","20.4 / 15.2"],["Hypoxaemic (altitude)","15","85","6.5","45","17 / 9"],["Anaemic (haemorrhage)","7","100","13.3","50","10 / 5"],["Stagnant (cardiogenic)","15","100","13.3","≤ 75","20 / ≤ 15"],["Histotoxic (cyanide)","15","100","13.3","90","20 / 18"]]],
 ["Carbon monoxide vs methaemoglobin",["Feature","COHb","MetHb"],[["Mechanism","CO binds Hb with ~240× affinity","Fe2+ oxidised to Fe3+"],["ODC","Left shift, capacity ↓","Left shift"],["Pulse oximeter","Reads falsely high (reads COHb as O2Hb)","Trends towards 85%"],["Colour","'Cherry red' (late, unreliable)","Slate-grey cyanosis, chocolate blood"],["Causes","Fires, exhausts, faulty heaters, desflurane on dry absorbent","Prilocaine, benzocaine, nitrates/nitrites, dapsone, congenital"],["Treatment","100% O2 (t½ 4–5 h → ~1 h), HBO if severe or pregnant","Methylene blue 1–2 mg/kg (not in G6PD), ascorbic acid"],["Diagnosis","Co-oximetry","Co-oximetry"]]],
];
const CARDS=[
 ["o2","Normal P50 of adult Hb?","3.5 kPa (26.6 mmHg). HbF ≈ 2.4 kPa; myoglobin ≈ 0.37 kPa."],
 ["o2","Write the O2 content equation.","CaO2 = 1.34 × Hb × SaO2 + 0.0225 × PaO2 (kPa). Normal ≈ 20 mL/dL arterial, 15 mL/dL venous."],
 ["o2","Normal DO2 and VO2?","DO2 ≈ 1000 mL/min (≈ 600 mL/min/m²); VO2 ≈ 250 mL/min; O2ER ≈ 0.25."],
 ["o2","Which organ has the highest O2 extraction?","The heart, ≈ 0.6 (coronary sinus SO2 ≈ 30–40%). It can only raise O2 supply by raising coronary flow."],
 ["o2","What is the Pasteur point?","The mitochondrial PO2 below which oxidative phosphorylation fails: ≈ 0.13–0.3 kPa (1–2 mmHg)."],
 ["o2","Name the four types of hypoxia.","Hypoxaemic, anaemic, stagnant (ischaemic), histotoxic."],
 ["o2","Which hypoxia type raises SvO2?","Histotoxic (cyanide, carbon monoxide's mitochondrial effect, late sepsis): tissues cannot extract O2."],
 ["o2","Why is Hüfner's constant 1.34 in vivo and not 1.39?","Some Hb is present as COHb and MetHb, which cannot carry O2."],
 ["o2","How much dissolved O2 at 3 ATA on 100% O2?","≈ 6 mL/dL, enough for resting metabolic needs without Hb."],
 ["o2","Half-life of COHb on air, 100% O2 and HBO?","≈ 4–5 h on air, ≈ 1 h on 100% O2, ≈ 20–30 min at 2.5–3 ATA."],
 ["o2","Drugs causing methaemoglobinaemia?","Prilocaine (o-toluidine), benzocaine, nitrates/nitrites, nitric oxide, dapsone, sulphonamides, primaquine, metoclopramide."],
 ["o2","What does the double Bohr effect describe?","At the placenta, maternal blood takes up CO2 (right shift, unloads O2) while fetal blood loses CO2 (left shift, loads O2)."],
 ["co2","Percentage of arterial CO2 carried as bicarbonate, carbamino, dissolved?","≈ 90 / 5 / 5. Of the a–v difference: ≈ 60 / 30 / 10."],
 ["co2","Define the Haldane effect.","Deoxygenated Hb carries more CO2 than oxygenated Hb: better carbamino formation and better H+ buffering."],
 ["co2","What is the chloride shift?","HCO3− leaves the RBC in exchange for Cl− (band 3 protein) to keep electrical neutrality. Also called the Hamburger shift."],
 ["co2","Where are the central chemoreceptors and what do they sense?","Ventral surface of the medulla; H+ in brain ECF/CSF generated from CO2 crossing the BBB."],
 ["co2","Afferent nerves of the carotid and aortic bodies?","Carotid: glossopharyngeal (IX) via the nerve of Hering. Aortic: vagus (X)."],
 ["co2","Below what PaO2 does hypoxic ventilatory drive rise steeply?","≈ 8 kPa (60 mmHg), which matches the knee of the ODC."],
 ["co2","Effect of opioids on the CO2 response curve?","Shifts it to the right (higher apnoeic threshold) and flattens the slope."],
 ["co2","How much does CBF change with PaCO2?","≈ 4% per mmHg (≈ 30% per kPa) between ~3 and 10 kPa; it halves at 2.7 kPa and doubles at 10.7 kPa."],
 ["co2","Rate of PaCO2 rise during apnoea?","≈ 0.4–0.8 kPa/min (3–6 mmHg/min); fastest in the first minute."],
 ["vq","Overall V/Q ratio and its range apex to base?","≈ 0.8 overall; ≈ 3 at the apex, ≈ 0.6 at the base (upright)."],
 ["vq","Normal shunt fraction and its sources?","2–5%: bronchial veins draining to pulmonary veins, Thebesian veins draining into the left heart."],
 ["vq","Normal anatomical dead space and VD/VT?","≈ 2 mL/kg (≈ 150 mL); physiological VD/VT ≈ 0.3."],
 ["vq","How is anatomical dead space measured?","Fowler's single-breath N2 washout: phase II divided so areas A and B are equal."],
 ["vq","Write the Bohr equation.","VD/VT = (PACO2 − PECO2)/PACO2. Enghoff substitutes PaCO2."],
 ["vq","West zone 2 pressure relationship?","Pa > PA > Pv. Flow depends on Pa − PA (waterfall / Starling resistor)."],
 ["vq","Distribution of ventilation in lateral position under GA with IPPV?","Non-dependent ≈ 60%, dependent ≈ 40% (awake spontaneous: 40 / 60)."],
 ["vq","Mechanism of HPV?","Hypoxia inhibits O2-sensitive K+ channels in pulmonary artery smooth muscle → depolarisation → Ca2+ entry → constriction; reduced NO; endothelin."],
 ["vq","Normal PVR?","50–150 dyn·s·cm⁻⁵ (≈ 1 Wood unit), about one tenth of SVR."],
 ["vq","At what lung volume is PVR lowest?","At FRC."],
 ["mech","Normal lung, chest wall and total compliance?","Lung ≈ 200, chest wall ≈ 200, total ≈ 100 mL/cmH2O."],
 ["mech","State Laplace's law for an alveolus.","P = 2T/r (sphere with one surface)."],
 ["mech","Main component of surfactant and its source?","Dipalmitoyl phosphatidylcholine (DPPC), from type II pneumocytes; surfactant proteins A–D."],
 ["mech","When does closing capacity equal FRC?","Supine in the mid-40s; upright in the mid-60s. Earlier in smokers and neonates."],
 ["mech","Which lung volumes can spirometry not measure?","RV, and therefore FRC and TLC."],
 ["mech","Which FRC method also measures trapped gas?","Body plethysmography (Boyle's law). Helium dilution and N2 washout only measure communicating gas."],
 ["mech","Time constant of a lung unit?","τ = compliance × resistance ≈ 0.2 s. After 3τ, 95% of the change is complete."],
 ["mech","Flow–volume loop in variable extrathoracic obstruction?","Flattened inspiratory limb; expiratory limb preserved."],
 ["mech","Obstructive vs restrictive FEV1/FVC?","Obstructive < 0.7; restrictive normal or high with low FVC and low TLC."],
 ["mech","What fraction of breathing work is elastic during quiet breathing?","≈ 65% elastic (stored, returned in expiration); ≈ 35% resistive (lost as heat)."],
 ["app","How much does FRC fall at induction of GA?","≈ 15–20% (about 400–500 mL), within minutes, independent of paralysis."],
 ["app","Three mechanisms of atelectasis under GA?","Compression, absorption (high FiO2), loss of surfactant function."],
 ["app","Two definitions behind heart–lung interactions?","Transpulmonary pressure = Palv − Ppl. Transmural pressure = intracardiac − Ppl."],
 ["app","Effect of PPV on LV afterload?","It falls, because raised pleural pressure reduces LV transmural pressure. This benefits the failing LV."],
 ["app","Conditions for PPV to predict fluid responsiveness?","Controlled ventilation, VT ≥ 8 mL/kg, sinus rhythm, closed chest, no RV failure, normal IAP. Threshold ~12–13%."],
 ["app","What is THRIVE?","Transnasal humidified rapid-insufflation ventilatory exchange: HFNO up to 70 L/min that prolongs apnoea time and slows CO2 rise."],
 ["app","Two named forms of O2 toxicity?","Lorrain Smith (pulmonary, FiO2 > 0.6 for > 24 h); Paul Bert (CNS seizures, PO2 > ~2 ATA)."],
 ["app","Target SpO2 for patients at risk of hypercapnic respiratory failure?","88–92% (BTS)."],
 ["app","Substances metabolised by the pulmonary circulation?","Angiotensin I (converted), bradykinin, serotonin, noradrenaline, PGE2/F2α, leukotrienes. Not adrenaline, histamine, dopamine, AII, vasopressin."],
 ["app","Why does acetazolamide help acute mountain sickness?","Carbonic anhydrase inhibition causes bicarbonate diuresis and metabolic acidosis, which drives ventilation and raises PAO2."],
 ["app","Absolute contraindication to hyperbaric O2?","Untreated pneumothorax."],
];
const FCF={all:"All",o2:"Oxygen",co2:"CO2 & control",vq:"V/Q",mech:"Mechanics",app:"Applied"};
const VIVA=[
 {st:"SOE 1 · Physiology",q:"Describe how carbon dioxide is transported in the blood, and draw the CO2 dissociation curve.",a:["Production ≈ 200 mL/min; body stores ≈ 120 L; 20× more soluble than O2.","Three forms: bicarbonate 90%, carbamino 5%, dissolved 5% of arterial content; of the a–v difference 60/30/10.","Red cell: carbonic anhydrase, H+ buffered by deoxy-Hb, HCO3− out, Cl− in (chloride shift).","Haldane effect with the two-curve diagram (oxy vs deoxy) and the a→v physiological line.","Clinical: CO2 curve is near-linear, so hyperventilation can lower PaCO2 but cannot raise PaO2 much; shunt rarely raises PaCO2."],fu:"Why does a patient with a large shunt have a normal or low PaCO2?"},
 {st:"SOE 1 · Physiology",q:"How is ventilation controlled? Show the effect of PaO2 and PaCO2 on minute ventilation.",a:["Controller: medullary DRG/VRG, pre-Bötzinger rhythm, pontine centres; cortex can override.","Central chemoreceptors: H+ from CO2, ~80% of drive, reset by CSF HCO3− in 24–48 h.","Peripheral: carotid (IX) and aortic (X) bodies, PaO2 < 8 kPa, fast; carotid also pH.","Graphs: MV vs PaCO2 linear ~15–20 L/min/kPa, steeper with hypoxia; MV vs PaO2 flat then steep below 8 kPa, steeper with hypercapnia.","Modifiers: opioids, volatiles (0.1 MAC abolishes hypoxic response), sleep, age, COPD, metabolic acidosis."],fu:"Why is giving oxygen to a COPD patient dangerous, and is loss of hypoxic drive the main reason?"},
 {st:"SOE 1 · Physiology",q:"Which heart–lung interactions do you know? Describe the mechanisms that change transpulmonary pressure.",a:["Definitions: transpulmonary = Palv − Ppl; transmural = intracavity − Ppl.","Spontaneous inspiration: ↑VR, RV expands, septal shift, ↑LV afterload: pulsus paradoxus.","PPV: ↓VR (Guyton), ↑RV afterload at high volume, ↓LV afterload, LV preload falls after a few beats.","Transpulmonary pressure depends on airway pressure and how much reaches the pleura: lung vs chest wall compliance, obesity, IAP, prone, effort, PEEP.","Applications: PPV/SVV (with caveats), post-intubation hypotension, CPAP in LVF, weaning failure, tamponade."],fu:"Why is PPV unreliable during laparoscopy and in AF?"},
 {st:"SOE 1 · Physiology",q:"Define hypoxia. Classify the causes and show the arterial and venous points on the ODC for each.",a:["Hypoxia vs hypoxaemia definitions.","Hypoxaemic (five mechanisms), anaemic, stagnant, histotoxic.","Draw ODC per type: arterial low in hypoxaemic, content low in anaemic, venous low in stagnant, venous high in histotoxic.","Calculate CaO2 for an example (Hb 7: ≈ 10 mL/dL).","Management by term in the DO2 equation."],fu:"A patient has PaO2 6 kPa on 4 L/min O2. How do you tell shunt from V/Q mismatch?"},
 {st:"SOE 1 · Physiology",q:"What happens to the lungs at induction of anaesthesia? Use the alveolar gas equation in your answer.",a:["FRC falls 15–20%; closing capacity may exceed FRC → airway closure.","Atelectasis by compression and absorption (FiO2 1.0), shunt ~10%.","Hypoventilation raises PACO2 → PAO2 falls (show the equation).","Dead space changes; HPV inhibited by volatiles; control depressed.","Mitigation: preoxygenation, head-up, CPAP/PEEP, recruitment, reduce FiO2 after intubation."],fu:"How long would a 120 kg patient take to desaturate after preoxygenation, and why?"},
 {st:"SOE 2 · Pharmacology",q:"What are the side effects of 100% oxygen?",a:["Respiratory: absorption atelectasis, tracheobronchitis, DAD (Lorrain Smith), bleomycin/paraquat potentiation.","CNS: Paul Bert seizures above ~2 ATA.","Eye: retinopathy of prematurity.","Cardiovascular: systemic and coronary vasoconstriction, reduced cardiac output.","CO2 retention in COPD: V/Q worsening (HPV release), Haldane effect, less drive. Fire risk in airway surgery."],fu:"What FiO2 do you use during laser airway surgery and why?"},
 {st:"SOE 2 · Pharmacology",q:"Tell me about high-flow nasal oxygen and its uses in theatre.",a:["Heated humidified gas at up to 60–70 L/min, FiO2 0.21–1.0.","Mechanisms: matches inspiratory flow, dead-space washout, modest PEEP, humidification, comfort.","Uses: preoxygenation and apnoeic oxygenation (THRIVE), difficult airway, tubeless ENT surgery, obese, obstetric, post-extubation.","Limits: CO2 still rises without ventilation in apnoea; risk with base-of-skull fracture, nasal obstruction, laser/diathermy fire.","Evidence: extends safe apnoea time; less clear benefit for emergency RSI."],fu:"Why does CO2 rise more slowly with THRIVE than with classical apnoeic oxygenation?"},
 {st:"SOE 3 · Anaesthesia",q:"During laparoscopic fundoplication the SpO2 falls to 85%. Talk me through it.",a:["Call for help if not improving; FiO2 1.0, hand-ventilate, feel compliance, check EtCO2 trace.","DOPES / airway–breathing–circulation sweep: tube position (endobronchial with pneumoperitoneum), kinking, secretions, bronchospasm.","Surgical: capnothorax (pleural tear at the hiatus), CO2 embolism, raised IAP pushing diaphragm up.","Equipment: disconnection, O2 supply, analyser.","Treat: reduce insufflation pressure, recruit, PEEP, tension → decompress, CO2 embolus → stop gas, left lateral head-down, aspirate CVC."],fu:"How would capnothorax differ from tension pneumothorax on the monitor?"},
 {st:"SOE 3 · Anaesthesia",q:"Talk about one-lung ventilation: the physiology and how you manage hypoxaemia.",a:["Lateral, open chest, non-dependent lung collapsed → obligatory shunt; HPV reduces non-dependent flow by ~50%.","Dependent lung: compressed, low FRC, atelectasis.","Set-up: FiO2 to target, VT 4–6 mL/kg PBW, PEEP 5, Pplat < 30, permissive hypercapnia.","Hypoxaemia: check DLT position with fibrescope, FiO2 1.0, recruit dependent lung, PEEP to dependent lung, CPAP 5–10 cmH2O to non-dependent lung, intermittent two-lung ventilation, clamp the pulmonary artery.","Avoid HPV inhibitors: volatile > 1 MAC, vasodilators; keep cardiac output up."],fu:"Why is PaCO2 usually only mildly raised during OLV?"},
 {st:"SOE 4 · Critical care",q:"ABG on FiO2 0.5: pH 7.29, PaCO2 7.2 kPa, PaO2 8 kPa, HCO3− 25. Interpret and calculate the A–a gradient.",a:["Acute respiratory acidosis (HCO3− normal, so not compensated).","PAO2 = 0.5 × 95 − 7.2/0.8 = 47.5 − 9 = 38.5 kPa.","A–a = 38.5 − 8 = 30.5 kPa: very wide → shunt or V/Q problem plus hypoventilation.","P/F = 16 kPa (120 mmHg): moderate range if bilateral infiltrates and PEEP ≥ 5 (Berlin).","Plan: cause (ARDS, pneumonia, oedema), lung-protective ventilation, PEEP titration, prone if P/F < 20 kPa."],fu:"What would the expected HCO3− be if this were chronic?"},
 {st:"SOE 1 · Physiology",q:"Describe the physiological effects of ascent to high altitude.",a:["Patm falls; FiO2 constant; PiO2 falls (equation).","Immediate: hyperventilation via carotid bodies → respiratory alkalosis; tachycardia; HPV.","Days: renal HCO3− excretion, CSF correction, 2,3-DPG ↑.","Weeks: EPO, polycythaemia, capillarity, mitochondria.","Illness: AMS, HAPE, HACE and treatment; anaesthetic equipment at altitude."],fu:"What happens to a desflurane vaporiser at altitude?"},
 {st:"SOE 1 · Physiology",q:"What are the non-respiratory functions of the lung?",a:["Filter.","Reservoir.","Metabolic: ACE, bradykinin, serotonin, noradrenaline, prostaglandins (and what passes unchanged).","Synthesis: surfactant, heparin, histamine, NO.","Defence, drug uptake, heat and water exchange, acid–base, fibrinolysis, phonation; lymphatics and pulmonary oedema."],fu:"Which vasoactive drugs pass through the lung unchanged?"},
];
const QUIZ=[
 ["The P50 of haemoglobin is increased by",[["Hyperthermia",1,"Temperature right-shifts the curve."],["Fetal haemoglobin",0,"HbF has a lower P50 (≈ 2.4 kPa)."],["Raised 2,3-DPG",1,"DPG binds β-chains of deoxy-Hb, stabilising the T state."],["Carbon monoxide",0,"COHb left-shifts the remaining Hb."],["Acidosis",1,"Bohr effect."]]],
 ["Concerning CO2 carriage in blood",[["Most CO2 is carried as bicarbonate",1,"≈ 90% of arterial CO2."],["Carbonic anhydrase is found mainly in plasma",0,"It is mainly in red cells; plasma has very little."],["Deoxygenated Hb binds more CO2 than oxyhaemoglobin",1,"Haldane effect."],["Chloride moves out of red cells in the tissues",0,"Chloride moves into red cells as HCO3− leaves."],["CO2 is about 20 times more soluble than O2 in blood",1,"0.23 vs 0.0225 mL/dL/kPa (≈ 0.03 vs 0.003 per mmHg)."]]],
 ["The central chemoreceptors",[["Lie on the ventral surface of the medulla",1,""],["Respond directly to arterial PO2",0,"Hypoxia acts on peripheral chemoreceptors."],["Respond to H+ in the CSF",1,"Generated from CO2 crossing the BBB."],["Account for most of the ventilatory response to CO2",1,"≈ 80%."],["Are abolished by 0.1 MAC volatile",0,"The peripheral hypoxic response is the one abolished at low MAC."]]],
 ["Anatomical dead space",[["Is about 2 mL/kg in adults",1,""],["Is measured by the Bohr equation",0,"Fowler's method measures anatomical; Bohr gives physiological."],["Increases with neck extension",1,"Airway lengthens."],["Decreases after tracheostomy",1,"Upper airway bypassed."],["Increases in pulmonary embolism",0,"PE increases alveolar dead space."]]],
 ["Functional residual capacity",[["Can be measured by simple spirometry",0,"It contains RV."],["Falls on induction of general anaesthesia",1,"By 15–20%."],["Is increased by PEEP",1,""],["Is increased in pregnancy",0,"Falls by ~20% (gravid uterus)."],["Is the main O2 store during apnoea",1,""]]],
 ["Hypoxic pulmonary vasoconstriction",[["Is abolished in a denervated (transplanted) lung",0,"It is a local mechanism and persists."],["Is inhibited by sodium nitroprusside",1,""],["Is enhanced by alkalosis",0,"Alkalosis and hypocapnia inhibit it."],["Responds mainly to alveolar PO2",1,"PAO2 is the main stimulus; PvO2 contributes."],["Is inhibited by propofol at clinical doses",0,"IV agents have little effect; volatiles inhibit dose-dependently."]]],
 ["Shunt",[["Normal physiological shunt is about 2–5% of cardiac output",1,""],["Thebesian veins contribute to physiological shunt",1,"They drain into the left heart."],["Hypoxaemia from a 40% shunt corrects with FiO2 1.0",0,"Above ~30% shunt, PaO2 barely responds."],["Commonly causes a high PaCO2",0,"Ventilation increases and keeps PaCO2 normal or low."],["The Berggren equation uses mixed venous O2 content",1,""]]],
 ["West zone 1",[["Is where alveolar pressure exceeds arterial pressure",1,"PA > Pa > Pv."],["Is large in healthy upright subjects",0,"Barely present in health."],["Increases with haemorrhage",1,"Low PAP."],["Increases with positive pressure ventilation",1,"Higher PA."],["Represents shunt",0,"It is alveolar dead space."]]],
 ["Lung compliance",[["Is the change in volume per unit change in pressure",1,""],["Is increased in emphysema",1,"Loss of elastic tissue."],["Is greatest at very high lung volumes",0,"Steepest near FRC."],["Static compliance is usually less than dynamic compliance",0,"Static is higher; dynamic includes resistive pressure."],["Total respiratory compliance is about 100 mL/cmH2O",1,""]]],
 ["Flow–volume loops",[["Variable extrathoracic obstruction flattens the inspiratory limb",1,""],["Fixed upper airway obstruction flattens both limbs",1,""],["Restrictive disease shows a scooped expiratory limb",0,"That is obstructive; restrictive is small and right-shifted."],["Expiratory flow at low lung volumes is effort-independent",1,"Dynamic airway compression."],["TLC is plotted on the left of the volume axis",1,"By convention."]]],
 ["With positive pressure ventilation",[["Venous return falls during inspiration",1,""],["LV afterload rises",0,"It falls (lower transmural pressure)."],["RV afterload rises at high lung volumes",1,"PVR rises above FRC."],["Systolic pressure is highest in inspiration",1,"Reverse pulsus paradoxus."],["Pulse pressure variation is reliable in atrial fibrillation",0,"Requires sinus rhythm."]]],
 ["Oxygen toxicity",[["Pulmonary toxicity is called the Lorrain Smith effect",1,""],["CNS toxicity occurs at PO2 above about 2 atmospheres",1,"Paul Bert effect."],["Absorption atelectasis needs hours of FiO2 1.0",0,"It occurs within minutes."],["Bleomycin increases susceptibility",1,""],["Retinopathy of prematurity is related to hyperoxia",1,""]]],
 ["At high altitude",[["The FiO2 of air falls",0,"Fraction stays 0.21; pressure falls."],["The initial hyperventilation is driven by peripheral chemoreceptors",1,""],["Acetazolamide causes a metabolic alkalosis",0,"Metabolic acidosis, which drives ventilation."],["Hypoxic pulmonary vasoconstriction contributes to HAPE",1,""],["2,3-DPG rises within days",1,""]]],
 ["The pulmonary circulation",[["Converts angiotensin I to angiotensin II",1,"ACE on endothelium."],["Inactivates most circulating serotonin",1,""],["Inactivates adrenaline",0,"Adrenaline passes unchanged."],["Inactivates bradykinin",1,""],["Has a resistance about one tenth of systemic",1,""]]],
];
const CRISIS=[
 ["Intraoperative hypoxaemia","abp",["Call for help early if SpO2 < 90% and not recovering. FiO2 1.0, increase fresh gas flow.","Check the patient end of the circuit: EtCO2 trace present? Listen, look at chest rise.","Hand-ventilate to feel compliance; check for disconnection, kinks, obstruction, wrong gas (O2 analyser).","Tube: endobronchial (especially after head-down or pneumoperitoneum), displaced, blocked; pass a suction catheter.","Lung: bronchospasm, atelectasis (recruit, PEEP), aspiration, pneumothorax, pulmonary oedema.","Circulation: low cardiac output, embolism (air, CO2, fat, thrombus), anaphylaxis, sepsis.","Probe: poor signal, MetHb from prilocaine or dyes (methylene blue reads falsely low)."],"Causes map to the five hypoxaemia mechanisms. Low FiO2 is the one you rule out first."],
 ["Sudden fall or loss of EtCO2","etco2",["Zero trace with no chest movement: disconnection, oesophageal intubation, total obstruction, apnoea. 'No trace = wrong place' until proven otherwise.","Check pulse and arterial line: cardiac arrest gives a fall to near zero. Start CPR; EtCO2 < 1.3 kPa means poor CPR.","Gradual or abrupt fall with hypotension: massive PE, air or CO2 embolism, severe hypovolaemia, anaphylaxis.","Embolism: stop N2O and insufflation, flood the field, left lateral head-down, aspirate CVC, support circulation.","Leak or sampling fault: check the sampling line and water trap."],"A fall in EtCO2 with a stable PaCO2 means alveolar dead space has risen (West zone 1)."],
 ["Rising EtCO2","etco2",["Check the inspired CO2 baseline: exhausted soda lime, incompetent unidirectional valve, insufficient fresh gas in Mapleson circuits.","Hypoventilation: ventilator settings, leak, increased dead space.","Increased production: laparoscopic CO2 absorption, release of tourniquet, sepsis, thyroid storm, malignant hyperthermia.","MH: rising EtCO2 despite increased ventilation, tachycardia, rigidity, rising temperature. Stop volatile, dantrolene 2.5 mg/kg.","Reduced elimination: bronchospasm (shark-fin trace), rebreathing."],"Capnography is taught in full in Stage 11."],
 ["Carbon monoxide poisoning","spo2",["Suspect from history (fire, enclosed space, heaters); SpO2 reads falsely normal.","100% O2 via non-rebreathing mask or tube immediately; COHb half-life falls from ~4–5 h to ~1 h.","Co-oximetry COHb level; lactate, ECG, troponin; check for cyanide in smoke inhalation (high lactate, high SvO2) → hydroxocobalamin.","Consider HBO: neurological signs, LOC, pregnancy, COHb > 25%, cardiac ischaemia.","Airway burns: early intubation with an uncut tube."],"Peripheral chemoreceptors are not stimulated because PaO2 is normal."],
 ["Postoperative hypoxaemia in recovery","nibp",["ABCDE, FiO2 high, sit up, encourage deep breaths and cough.","Hypoventilation: opioid (naloxone titrated), residual block (TOF ratio, sugammadex/neostigmine), high block, hypothermia.","V/Q and shunt: atelectasis (CPAP, physiotherapy, incentive spirometry), aspiration, bronchospasm, pneumothorax, pulmonary oedema (fluid, negative pressure).","Airway obstruction: OSA, laryngospasm, oedema, haematoma after neck surgery.","Circulation: PE, low output, sepsis. Investigations: ABG, CXR, ECG, POCUS."],"Diffusion hypoxia after N2O: give 100% O2 for 5–10 minutes at the end of the case."],
 ["Anterior mediastinal mass","abp",["Symptoms: orthopnoea, stridor, SVC obstruction, syncope; CT tracheal compression > 50% = high risk.","Flow–volume loop: variable intrathoracic pattern (expiratory plateau) worse supine.","Plan with surgeons and perfusion: awake fibreoptic or inhalational induction, keep spontaneous ventilation, avoid paralysis.","Positioning rescue: lateral or prone; rigid bronchoscope in theatre; femoral access for ECMO/CPB in high-risk cases.","Consider biopsy under local, or steroids/radiotherapy first if lymphoma is likely."],"Loss of chest wall tone and FRC under GA removes the forces that hold the airway open."],
];
const SRC="";
const ERR="";

const DIAG=`    <div class="grid2">
      <div class="fig">
        <h3>Oxyhaemoglobin dissociation curve</h3>
        <div class="ctl">
          <label>pH <input type="range" id="o-ph" min="7.0" max="7.7" step="0.01" value="7.40"><output id="o-ph-o">7.40</output></label>
          <label>Temperature °C <input type="range" id="o-t" min="30" max="42" step="0.5" value="37"><output id="o-t-o">37</output></label>
          <label>2,3-DPG mmol/L <input type="range" id="o-d" min="2" max="9" step="0.5" value="5"><output id="o-d-o">5</output></label>
          <div class="seg" id="o-hb"><button aria-pressed="true" data-v="A">HbA</button><button aria-pressed="false" data-v="F">HbF</button><button aria-pressed="false" data-v="CO">COHb 30%</button><button aria-pressed="false" data-v="Mb">Myoglobin</button></div>
        </div>
        <div class="svgbox"><svg id="odc" viewBox="0 0 520 330" role="img" aria-label="Oxyhaemoglobin dissociation curve"></svg></div>
        <div class="readout" id="odc-r"></div>
      </div>

      <div class="fig">
        <h3>CO2 dissociation curve and the Haldane effect</h3>
        <p class="lede">Near-linear over the physiological range, so ventilation changes PaCO2 effectively. Deoxygenated blood holds more CO2 at every PCO2.</p>
        <div class="svgbox"><svg id="co2c" viewBox="0 0 520 300" role="img" aria-label="CO2 dissociation curve"></svg></div>
        <p class="src">Arterial point a (5.3 kPa, ~48 mL/dL); venous point v (6.1 kPa, ~52 mL/dL). The a→v line is the physiological curve.</p>
      </div>

      <div class="fig">
        <h3>Iso-shunt diagram</h3>
        <div class="ctl"><label>Hb g/dL <input type="range" id="i-hb" min="7" max="17" step="0.5" value="14"><output id="i-hb-o">14</output></label>
          <label>a–v O2 difference mL/dL <input type="range" id="i-av" min="3" max="8" step="0.5" value="5"><output id="i-av-o">5</output></label></div>
        <div class="svgbox"><svg id="iso" viewBox="0 0 520 320" role="img" aria-label="Iso-shunt diagram"></svg></div>
        <p class="src">Computed live: PAO2 from the alveolar gas equation (PaCO2 5.3, RQ 0.8), Hill curve n = 2.7. Above about 30% shunt, raising FiO2 barely moves PaO2.</p>
      </div>

      <div class="fig">
        <h3>Flow–volume loops</h3>
        <div class="seg" id="fv-sel"></div>
        <div class="svgbox"><svg id="fv" viewBox="0 0 520 320" role="img" aria-label="Flow volume loop"></svg></div>
        <div class="readout" id="fv-r"></div>
      </div>

      <div class="fig">
        <h3>Control of ventilation: CO2 response</h3>
        <div class="seg" id="cr-sel"></div>
        <div class="svgbox"><svg id="cr" viewBox="0 0 520 300" role="img" aria-label="CO2 response curve"></svg></div>
        <div class="readout" id="cr-r"></div>
      </div>

      <div class="fig">
        <h3>West zones</h3>
        <div class="seg" id="wz-sel"><button aria-pressed="true" data-v="n">Upright, awake</button><button aria-pressed="false" data-v="ppv">PPV + PEEP</button><button aria-pressed="false" data-v="hypo">Haemorrhage</button></div>
        <div class="svgbox"><svg id="wz" viewBox="0 0 520 320" role="img" aria-label="West zones"></svg></div>
        <div class="readout" id="wz-r"></div>
      </div>

      <div class="fig">
        <h3>Spirometer trace: lung volumes</h3>
        <div class="svgbox"><svg id="spiro" viewBox="0 0 520 300" role="img" aria-label="Lung volumes"></svg></div>
        <p class="src">70 kg adult. FRC, RV and TLC need helium dilution, N2 washout or body plethysmography.</p>
      </div>

      <div class="fig">
        <h3>PVR against lung volume</h3>
        <div class="svgbox"><svg id="pvr" viewBox="0 0 520 280" role="img" aria-label="PVR versus lung volume"></svg></div>
        <p class="src">Lowest at FRC. Low volume: extra-alveolar vessels kink. High volume: alveolar vessels stretched and compressed.</p>
      </div>
    </div>
  </section>`;
const REFS="";
function initDiagrams(){
/* ODC */
let hbMode="A";
function drawODC(){
  const ph=+$("#o-ph").value,t=+$("#o-t").value,d=+$("#o-d").value;
  $("#o-ph-o").textContent=ph.toFixed(2);$("#o-t-o").textContent=t;$("#o-d-o").textContent=d;
  let p50=3.5*Math.pow(10,-0.48*(ph-7.4))*Math.pow(10,0.024*(t-37))*(1+0.065*(d-5));
  let n=2.7,cap=1,label="HbA";
  if(hbMode==="F"){p50*=2.4/3.5;label="HbF"}
  if(hbMode==="Mb"){p50=0.37;n=1;label="Myoglobin"}
  if(hbMode==="CO"){p50*=0.6;n=2.0;cap=0.7;label="30% COHb"}
  const P=plot($("#odc"),{w:520,h:330,x0:0,x1:14,y0:0,y1:100,xt:[0,2,4,6,8,10,12,14],yt:[0,25,50,75,100],xl:"PO2 (kPa)",yl:"Hb saturation (%)"});
  P.line(range(0,14).map(p=>[p,100*hill(p,3.5)]),{stroke:"var(--muted)","stroke-dasharray":"5 4","stroke-width":1.6});
  P.line(range(0,14).map(p=>[p,100*cap*hill(p,p50,n)]),{stroke:"var(--spo2)"});
  P.dot(13.3,100*hill(13.3,3.5),"var(--abp)","a",-14,-8);P.dot(5.3,100*hill(5.3,3.5),"var(--nibp)","v̄",6,14);
  P.add("line",{x1:P.X(0),x2:P.X(p50),y1:P.Y(50*cap),y2:P.Y(50*cap),stroke:"var(--etco2)","stroke-dasharray":"3 3"});
  P.add("line",{x1:P.X(p50),x2:P.X(p50),y1:P.Y(50*cap),y2:P.Y(0),stroke:"var(--etco2)","stroke-dasharray":"3 3"});
  P.text(Math.min(p50,12)+0.2,6,"P50 "+p50.toFixed(2),{fill:"var(--etco2)"});
  const shift=p50>3.6?"right shift: easier unloading to tissues":p50<3.4?"left shift: tighter binding, harder unloading":"normal position";
  const S13=100*cap*hill(13.3,p50,n),S5=100*cap*hill(5.3,p50,n);
  $("#odc-r").innerHTML=`${label} · P50 ${p50.toFixed(2)} kPa (${(p50*7.5).toFixed(1)} mmHg) · ${shift}<br>SaO2 at 13.3 kPa ${S13.toFixed(1)}% · SvO2 at 5.3 kPa ${S5.toFixed(1)}% · unloaded ${(S13-S5).toFixed(1)} percentage points`;
}
["#o-ph","#o-t","#o-d"].forEach(s=>$(s).oninput=drawODC);
$$("#o-hb button").forEach(b=>b.onclick=()=>{hbMode=b.dataset.v;$$("#o-hb button").forEach(x=>x.setAttribute("aria-pressed",x===b));drawODC()});
drawODC();

/* CO2 curve */
(function(){const P=plot($("#co2c"),{x0:0,x1:10,y0:0,y1:70,xt:[0,2,4,6,8,10],yt:[0,20,40,60],xl:"PCO2 (kPa)",yl:"CO2 content (mL/dL)"});
  const f=(p,k)=>k*(1-Math.exp(-p/2.6))+2.3*p*0.0;  // total carriage curves
  const oxy=p=>58*(1-Math.exp(-p/3.4))+0.23*p*1.0, deo=p=>oxy(p)+4.5*(1-Math.exp(-p/2));
  P.line(range(0.8,10).map(p=>[p,deo(p)]),{stroke:"var(--nibp)"});P.line(range(0.8,10).map(p=>[p,oxy(p)]),{stroke:"var(--spo2)"});
  P.line(range(0,10).map(p=>[p,0.23*p*2.3]),{stroke:"var(--muted)","stroke-dasharray":"5 4","stroke-width":1.6});
  P.text(7.2,deo(7.2)+4,"Deoxygenated (PO2 5)",{fill:"var(--nibp)"});P.text(7.2,oxy(7.2)-6,"Oxygenated (PO2 13)",{fill:"var(--spo2)"});P.text(6.6,8,"Dissolved",{fill:"var(--muted)"});
  const a=[5.3,oxy(5.3)],v=[6.1,deo(6.1)];P.line([a,v],{stroke:"var(--etco2)","stroke-width":3});P.dot(a[0],a[1],"var(--abp)","a",-14,14);P.dot(v[0],v[1],"var(--nibp)","v",6,-6);
})();

/* Iso-shunt */
function drawIso(){const hb=+$("#i-hb").value,av=+$("#i-av").value;$("#i-hb-o").textContent=hb;$("#i-av-o").textContent=av;
  const P=plot($("#iso"),{w:520,h:320,x0:20,x1:100,y0:0,y1:80,xt:[20,40,60,80,100],yt:[0,20,40,60,80],xl:"FiO2 (%)",yl:"PaO2 (kPa)"});
  const cols=["var(--ecg)","var(--spo2)","var(--nibp)","var(--etco2)","var(--abp)"];
  [0,0.1,0.2,0.3,0.5].forEach((s,i)=>{const pts=range(21,100,80).map(F=>{const PA=F/100*95-5.3/0.8,Cc=contentO2(PA,hb),Ca=Cc-av*s/(1-s);return [F,pFromContent(Ca,hb)]});
    P.line(pts,{stroke:cols[i]});const L=pts[pts.length-1];P.text(86,Math.min(L[1],78)+(i===0?-4:3),(s*100)+"% shunt",{fill:cols[i],"font-size":"11"})});
}
["#i-hb","#i-av"].forEach(s=>$(s).oninput=drawIso);drawIso();

/* Flow-volume loops */
const FV={
 normal:{n:"Normal",exp:v=>8.5*Math.pow(1-v/5,0.9)*Math.min(1,v/0.35+0.15),ins:v=>-5.5*Math.sin(Math.PI*v/5),tlc:0,rv:5,r:"Rapid rise to PEFR 8–10 L/s, near-straight descent (effort-independent: dynamic compression). Inspiratory limb rounded, 4–6 L/s."},
 obs:{n:"Obstructive",exp:v=>v<0.4?11*v:4.4*Math.pow(Math.max(0,1-(v-0.4)/4.9),2.2),ins:v=>-4.5*Math.sin(Math.PI*v/5.3),tlc:0,rv:5.3,shift:-0.5,r:"Low PEFR, scooped (concave) expiratory limb, raised RV and TLC from gas trapping. FEV1/FVC < 0.7."},
 res:{n:"Restrictive",exp:v=>6.5*Math.pow(1-v/3,0.8)*Math.min(1,v/0.3+0.15),ins:v=>-4.2*Math.sin(Math.PI*v/3),tlc:0,rv:3,shift:1.2,r:"Normal shape, small and shifted to the right (low TLC). Flow can be high for the volume. FEV1/FVC normal or high."},
 vet:{n:"Variable extrathoracic",exp:v=>8*Math.pow(1-v/5,0.9)*Math.min(1,v/0.35+0.15),ins:v=>-Math.min(5.5*Math.sin(Math.PI*v/5),2),tlc:0,rv:5,r:"Inspiratory limb flattened (negative airway pressure collapses the extrathoracic airway). Vocal cord palsy, laryngomalacia, goitre, OSA."},
 vit:{n:"Variable intrathoracic",exp:v=>Math.min(8*Math.pow(1-v/5,0.9)*Math.min(1,v/0.35+0.15),2.4),ins:v=>-5.5*Math.sin(Math.PI*v/5),tlc:0,rv:5,r:"Expiratory plateau (positive intrathoracic pressure compresses the airway); inspiration preserved. Tracheomalacia, lower tracheal or mediastinal tumour."},
 fix:{n:"Fixed large airway",exp:v=>Math.min(8*Math.pow(1-v/5,0.9)*Math.min(1,v/0.35+0.15),2.4),ins:v=>-Math.min(5.5*Math.sin(Math.PI*v/5),2.2),tlc:0,rv:5,r:"Both limbs flattened and near-symmetrical; flow set by orifice size, not effort. Tracheal stenosis, post-intubation stricture."}};
const fvSel=$("#fv-sel");Object.entries(FV).forEach(([k,o],i)=>{const b=el("button",{"aria-pressed":i===0,"data-v":k},o.n);b.onclick=()=>{$$("#fv-sel button").forEach(x=>x.setAttribute("aria-pressed",x===b));drawFV(k)};fvSel.append(b)});
function drawFV(k){const o=FV[k],sh=o.shift||0;const P=plot($("#fv"),{w:520,h:320,x0:-1,x1:7,y0:-7,y1:11,xt:[0,1,2,3,4,5,6],yt:[-6,-3,0,3,6,9],xl:"Volume (L) · TLC on left → RV on right",yl:"Flow (L/s) · expiration up"});
  const N=FV.normal;P.line(range(0,5).map(v=>[v,N.exp(v)]),{stroke:"var(--muted)","stroke-dasharray":"5 4","stroke-width":1.4});P.line(range(0,5).map(v=>[v,N.ins(v)]),{stroke:"var(--muted)","stroke-dasharray":"5 4","stroke-width":1.4});
  P.line(range(0,o.rv).map(v=>[v+sh,o.exp(v)]),{stroke:"var(--ecg)"});P.line(range(0,o.rv).map(v=>[v+sh,o.ins(v)]),{stroke:"var(--etco2)"});
  P.add("line",{x1:P.X(-1),x2:P.X(7),y1:P.Y(0),y2:P.Y(0),stroke:"var(--muted)","stroke-width":1});
  P.text(sh-0.1,-1,"TLC",{"text-anchor":"end"});P.text(o.rv+sh+0.1,-1,"RV");$("#fv-r").textContent=o.r}
drawFV("normal");

/* CO2 response */
const CR={n:["Normal",1,0],op:["Opioid: right shift + flatter",0.55,1.3],hy:["Hypoxia (PaO2 5 kPa): steeper",1.8,-0.3],an:["Volatile 1 MAC",0.45,0.6],copd:["Chronic CO2 retainer",0.35,2]};
const crSel=$("#cr-sel");Object.entries(CR).forEach(([k,o],i)=>{const b=el("button",{"aria-pressed":i===0},o[0]);b.onclick=()=>{$$("#cr-sel button").forEach(x=>x.setAttribute("aria-pressed",x===b));drawCR(k)};crSel.append(b)});
function drawCR(k){const [nm,sl,dx]=CR[k];const P=plot($("#cr"),{x0:3,x1:11,y0:0,y1:50,xt:[3,4,5,6,7,8,9,10,11],yt:[0,10,20,30,40,50],xl:"PaCO2 (kPa)",yl:"Minute ventilation (L/min)"});
  const f=(p,s,d)=>{const x=p-d;let v=6+18*s*(x-5.3);if(x<4.6)v=Math.max(2.5,6+18*s*(4.6-5.3)*Math.exp((x-4.6)*1.2));return Math.min(v,48)};
  P.line(range(3,11).map(p=>[p,f(p,1,0)]),{stroke:"var(--muted)","stroke-dasharray":"5 4","stroke-width":1.6});
  P.line(range(3,11).map(p=>[p,f(p,sl,dx)]),{stroke:"var(--etco2)"});P.dot(5.3,6,"var(--ecg)","rest 5.3 kPa, 6 L/min",8,4);
  $("#cr-r").textContent=`${nm}: slope ≈ ${(18*sl).toFixed(0)} L/min per kPa${dx?`, threshold shifted ${dx>0?"+":""}${dx} kPa`:""}. Above ~10–12 kPa CO2 narcosis depresses ventilation.`}
drawCR("n");

/* West zones */
const WZ={n:{z:[0.05,0.33,0.62],r:"Zone 1 (PA > Pa > Pv) barely exists in health. Zone 2 (Pa > PA > Pv): flow set by Pa − PA, the waterfall. Zone 3 (Pa > Pv > PA): flow set by Pa − Pv. Zone 4 at the very base: extra-alveolar vessel compression at low lung volume."},
 ppv:{z:[0.25,0.45,0.3],r:"Raised alveolar pressure with PPV and PEEP converts zone 3 to 2 and zone 2 to 1: alveolar dead space rises, EtCO2 falls relative to PaCO2."},
 hypo:{z:[0.38,0.32,0.3],r:"Low pulmonary artery pressure in haemorrhage or low cardiac output enlarges zone 1: dead space rises, the PaCO2–EtCO2 gap widens."}};
$$("#wz-sel button").forEach(b=>b.onclick=()=>{$$("#wz-sel button").forEach(x=>x.setAttribute("aria-pressed",x===b));drawWZ(b.dataset.v)});
function drawWZ(k){const o=WZ[k],svg=$("#wz");svg.innerHTML="";const add=(t,a,tx)=>{const e=document.createElementNS(SVGNS,t);for(const q in a)e.setAttribute(q,a[q]);if(tx!=null)e.textContent=tx;svg.append(e);return e};
  const top=20,H=270,cols=["var(--abp)","var(--etco2)","var(--spo2)"],names=["Zone 1  PA > Pa > Pv","Zone 2  Pa > PA > Pv","Zone 3  Pa > Pv > PA"];let y=top;
  add("path",{d:`M120 ${top} C40 ${top+20} 30 ${top+H-30} 60 ${top+H} L200 ${top+H} C215 ${top+H-60} 210 ${top+40} 120 ${top} Z`,fill:"var(--soft)",stroke:"var(--muted)"});
  o.z.forEach((f,i)=>{const h=H*f;add("rect",{x:40,y:y,width:180,height:h,fill:cols[i],opacity:.22});add("line",{x1:30,x2:470,y1:y,y2:y,class:"gr"});if(h>16)add("text",{x:240,y:y+h/2+4,class:"lbl",fill:cols[i]},names[i]);y+=h});
  // flow line
  let pts=[],yy=top;const z1=H*o.z[0],z2=H*o.z[1];for(let i=0;i<=40;i++){const h=top+H*i/40;let fl=0;if(h>top+z1&&h<=top+z1+z2)fl=(h-top-z1)/z2*0.6;else if(h>top+z1+z2)fl=0.6+(h-top-z1-z2)/(H-z1-z2)*0.4;pts.push([410+fl*80,h])}
  add("path",{d:pts.map((p,i)=>(i?"L":"M")+p[0]+" "+p[1]).join(" "),fill:"none",stroke:"var(--ink)","stroke-width":2.4});
  add("text",{x:410,y:top+H+22,class:"lbl"},"Blood flow →");add("text",{x:60,y:top+H+22},"Upright lung");$("#wz-r").textContent=o.r}
drawWZ("n");

/* Spirometry */
(function(){const P=plot($("#spiro"),{x0:0,x1:20,y0:0,y1:6.5,xt:[],yt:[0,1.2,3,3.5,6],xl:"Time",yl:"Volume (L)"});
  const pts=[];for(let t=0;t<=20;t+=0.05){let v;if(t<6)v=3+0.25*(1-Math.cos(t*Math.PI*2/3));else if(t<8)v=3+((t-6)/2)*3*Math.sin((t-6)/2*Math.PI/2)**1;else if(t<11)v=6-(t-8)/3*4.8*Math.sin(Math.min(1,(t-8)/3)*Math.PI/2);else if(t<13)v=1.2+(t-11)/2*1.8;else v=3+0.25*(1-Math.cos((t-13)*Math.PI*2/3));pts.push([t,Math.max(1.2,Math.min(6,v))])}
  P.line(pts,{stroke:"var(--spo2)"});
  const br=(x,a,b,t,c)=>{P.add("line",{x1:P.X(x),x2:P.X(x),y1:P.Y(a),y2:P.Y(b),stroke:c,"stroke-width":2});P.text(x+0.25,(a+b)/2,t,{fill:c})};
  br(14.6,3,3.5,"TV 0.5","var(--ecg)");br(16.2,3.5,6,"IRV 2.5","var(--nibp)");br(14.6,1.2,3,"ERV 1.8","var(--etco2)");br(1,0,1.2,"RV 1.2","var(--abp)");br(18.3,0,3,"FRC 3","var(--abp)");br(19.4,0,6,"TLC 6","var(--muted)");br(10,1.2,6,"VC 4.8","var(--spo2)");
})();

/* PVR vs volume */
(function(){const P=plot($("#pvr"),{w:520,h:280,x0:0,x1:6,y0:0,y1:10,xt:[0,1.2,3,6],yt:[],xl:"Lung volume (L) · RV 1.2 → FRC 3 → TLC 6",yl:"PVR"});
  const ex=v=>7*Math.exp(-(v-1)*1.1)+0.4,al=v=>0.4+0.08*Math.exp((v-1.5)*0.85);
  P.line(range(1.2,6).map(v=>[v,ex(v)]),{stroke:"var(--etco2)","stroke-dasharray":"5 4","stroke-width":1.6});P.line(range(1.2,6).map(v=>[v,al(v)]),{stroke:"var(--nibp)","stroke-dasharray":"5 4","stroke-width":1.6});
  P.line(range(1.2,6).map(v=>[v,ex(v)+al(v)]),{stroke:"var(--abp)"});P.text(1.5,8,"extra-alveolar vessels",{fill:"var(--etco2)"});P.text(3.8,5.5,"alveolar vessels",{fill:"var(--nibp)"});P.text(2.6,2.4,"total PVR (minimum at FRC)",{fill:"var(--abp)"});
})();
}
ATLAS.register({id:"01",name:"Respiratory physiology",
  lede:"Respiratory physiology, applied to the theatre.",
  barsNote:"",
  bars:BARS,fam:FAM,slides:SLIDES,calcs:CALCS,tables:TABLES,cards:CARDS,fcf:FCF,viva:VIVA,quiz:QUIZ,crisis:CRISIS,
  sources:SRC,errata:ERR,refs:REFS,diagHTML:DIAG,initDiagrams,
  diagLede:"Draw each one on paper first, then check against the live version. Examiners mark axes, units and the three anchor points before the curve itself."});
})();
