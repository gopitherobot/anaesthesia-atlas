/* Stage 15 · Intensive care & crises */
(function(){
const {plot,range,el,SVGNS,fmt,$,$$,seg}=ATLAS.h;

const BARS=[];

const FAM={icu:["spo2","Sepsis & organ support"],resp:["etco2","ARDS, ventilation & oxygen"],tox:["nibp","Poisoning, burns & environment"],tr:["abp","Trauma & transfusion"],cr:["ecg","Perioperative crises & resuscitation"]};

const SLIDES=[
{f:"icu",t:"The deteriorating patient, levels of care and scoring",b:`<ul class="clean"><li><b>Track and trigger</b>: NEWS2 (RR, SpO2 (scale 2 for hypercapnic patients), supplemental O2, SBP, HR, consciousness (ACVPU), temperature): 5–6 urgent response, ≥ 7 or 3 in one parameter emergency review; critical care outreach.</li>
<li><b>Levels of care</b> (Intensive Care Society 2021): level 0 ward; level 1 ward with outreach/enhanced obs; level 2 single organ support or post-op monitoring (HDU); level 3 advanced respiratory support or ≥ 2 organ support (ICU).</li>
<li><b>High-risk surgical patient</b>: predicted mortality ≥ 5% (emergency laparotomy, major cancer surgery, frail elderly); identify with scores (P-POSSUM, NELA, SORT, CPET), consultant-delivered care, goal-directed haemodynamics, planned critical care admission.</li>
<li><b>Severity scores</b>: APACHE II (worst values in first 24 h: acute physiology + age + chronic health, predicts hospital mortality), SAPS, ICNARC model (UK benchmarking), <b>SOFA</b> (6 organ systems 0–4: respiratory P/F, coagulation platelets, liver bilirubin, cardiovascular MAP/vasopressors, CNS GCS, renal creatinine/urine; rise of ≥ 2 defines organ dysfunction in sepsis-3; trends track progress), MODS. Scores benchmark units, not individual decisions.</li>
<li><b>Multiple organ dysfunction</b>: progressive failure of ≥ 2 systems after sepsis, trauma, pancreatitis, burns or major surgery: inflammation, microcirculatory and mitochondrial dysfunction; mortality rises with each failing organ.</li>
<li><b>ICU-acquired weakness</b>: critical illness polyneuropathy (axonal, sensory and motor) and myopathy (loss of myosin); risk factors: sepsis, MOF, prolonged ventilation, hyperglycaemia, steroids, NMBs, immobility; diagnose clinically (MRC sum score &lt; 48) and neurophysiology; prevent with early mobilisation, glycaemic control, minimising sedation and NMBs. Post-intensive care syndrome (physical, cognitive, psychological): follow-up clinics.</li></ul>`,
p:"Typical exam questions: 'Define critical illness weakness and list the types; risk factors; diagnosis and management' (SAQ style).",
v:"Recognition, levels of care, high-risk surgical patient, scores (how built, uses, limitations), MOF and ICU-acquired weakness."},
{f:"icu",t:"Sepsis and septic shock",b:`<ul class="clean"><li><b>Sepsis-3 (2016)</b>: <b>sepsis</b> = life-threatening organ dysfunction caused by a dysregulated host response to infection (SOFA rise ≥ 2). <b>Septic shock</b> = sepsis needing <b>vasopressors to maintain MAP ≥ 65 mmHg AND lactate &gt; 2 mmol/L</b> despite adequate fluid resuscitation (hospital mortality &gt; 40%). SIRS criteria abandoned for definition; qSOFA (RR ≥ 22, altered mentation, SBP ≤ 100) is a prognostic tool, not a screening tool alone (SSC 2021); NEWS2 used for screening in the UK.</li>
<li><b>SSC 2021 core recommendations</b>: cultures before antibiotics without delaying them; antibiotics within <b>1 h</b> for possible septic shock or high-likelihood sepsis (within 3 h if sepsis possible without shock); measure lactate; <b>30 mL/kg crystalloid</b> within 3 h for hypoperfusion (weak recommendation; guided by dynamic measures and capillary refill); <b>balanced crystalloids</b> over saline; albumin if large volumes; no HES or gelatins; <b>noradrenaline</b> first-line (peripheral start acceptable), target MAP 65; add <b>vasopressin</b> at noradrenaline 0.25–0.5 µg/kg/min; add dobutamine or adrenaline for cardiac dysfunction; <b>hydrocortisone 200 mg/day</b> for ongoing vasopressor need; source control within 6–12 h; restrictive transfusion (Hb 70 g/L); VTE and stress ulcer prophylaxis; glucose 8–10 mmol/L; no vitamin C.</li>
<li><b>SSC 2026 update</b> (March 2026; 129 statements, 46 new) revises the 2021 guideline: check the full text for changed recommendations (new terminology, prehospital care, antimicrobial stewardship balance, haemodynamic resuscitation, post-discharge care).</li>
<li><b>UK</b>: NICE NG51 and the Sepsis Six (O2, cultures, IV antibiotics, fluids, lactate, urine output within 1 h).</li>
<li><b>Pathophysiology</b>: PAMPs/DAMPs → TLRs → cytokines (TNF, IL-1, IL-6), endothelial injury and glycocalyx shedding, NO-mediated vasodilation, capillary leak, microthrombosis (DIC), mitochondrial dysfunction, immunoparalysis.</li></ul>`,
p:"Typical exam questions: 'Sepsis guidelines and management including antibiotics and transfusion trigger', 'Postoperative day 3 colon resection: hypotensive, tachypnoeic, febrile, oliguric: manage', 'Diabetic with forearm abscess in ICU: sepsis in detail, ARDS'.",
v:"Definitions (sepsis-3), pathophysiology, first-hour actions, fluids and vasopressors with targets, steroids, source control, supportive care, and awareness of the 2026 update."},
{f:"icu",t:"Shock and haemodynamic support",b:`<ul class="clean"><li><b>Shock</b>: inadequate tissue O2 delivery for demand (raised lactate, oliguria, altered mentation, mottled skin, prolonged capillary refill).</li>
<li><b>Types</b>: <b>hypovolaemic</b> (↓ CO, ↑ SVR, ↓ CVP/PAWP), <b>cardiogenic</b> (↓ CO, ↑ SVR, ↑ filling pressures), <b>obstructive</b> (tamponade, tension pneumothorax, massive PE: ↓ CO, ↑ SVR, ↑ CVP with equalisation or RV dilatation), <b>distributive</b> (sepsis, anaphylaxis, neurogenic, adrenal crisis: ↑ or normal CO, ↓ SVR). Mixed states are common. Echo (or POCUS) is the key bedside discriminator.</li>
<li><b>Fluids</b>: give in boluses (250–500 mL) with reassessment; fluid responsiveness (PLR, SV change, PPV); avoid overload (worse outcomes in AKI, ARDS); balanced crystalloids (SMART, PLUS/BaSICS: modest or no differences); albumin in sepsis (ALBIOS: no overall mortality benefit) or cirrhosis; avoid HES (6S, CHEST: AKI, mortality; EMA suspension).</li>
<li><b>Vasoactive drugs</b> (Stage 9): noradrenaline, vasopressin, adrenaline, dobutamine, milrinone, levosimendan, angiotensin II, methylene blue.</li>
<li><b>Mechanical circulatory support</b>: IABP (Stage 14), Impella (LV-to-aorta axial pump), VA-ECMO (cardiogenic shock, ECPR: LV distension, limb ischaemia, bleeding), LVAD.</li>
<li><b>Goals</b>: MAP 65 (individualise: 65 trial in older patients favoured permissive 60–65), lactate clearance, capillary refill (ANDROMEDA-SHOCK), ScvO2 &gt; 70%, CO2 gap &lt; 0.8 kPa, urine output &gt; 0.5 mL/kg/h.</li></ul>`,
p:"Use the shock classifier: set cardiac index, SVR and CVP to see the pattern and the next step.",
v:"Define shock, classify with haemodynamic profiles, then fluids (evidence), vasoactive drugs, mechanical support and targets."},
{f:"resp",t:"ARDS",b:`<ul class="clean"><li><b>Berlin definition (2012)</b>: within 1 week of a known insult or new/worsening symptoms; bilateral opacities not fully explained by effusions, collapse or nodules; respiratory failure not fully explained by cardiac failure or fluid overload; PaO2/FiO2 with PEEP/CPAP ≥ 5 cmH2O: <b>mild 26.6–40 kPa (200–300 mmHg), moderate 13.3–26.6 (100–200), severe &lt; 13.3 (&lt; 100)</b>.</li>
<li><b>Global definition (2023)</b> broadens this: includes patients on HFNO ≥ 30 L/min, allows SpO2/FiO2 ≤ 315 (with SpO2 ≤ 97%) instead of PaO2, and lung ultrasound in resource-limited settings.</li>
<li><b>Causes</b>: direct (pneumonia, aspiration, inhalational injury, contusion, near-drowning, COVID-19) and indirect (sepsis, pancreatitis, trauma, massive transfusion/TRALI, burns, CPB).</li>
<li><b>Pathophysiology</b>: exudative phase (alveolar–capillary injury, protein-rich oedema, hyaline membranes, surfactant loss, shunt), proliferative (type II pneumocyte proliferation), fibrotic phase. "Baby lung": small aerated volume (hence low VT).</li>
<li><b>Management</b>: treat cause; <b>lung-protective ventilation</b> (ARDSNet: VT 6 mL/kg predicted body weight, plateau &lt; 30 cmH2O; driving pressure &lt; 15 cmH2O), PEEP by FiO2–PEEP table or individualised (higher PEEP in moderate–severe), permissive hypercapnia (pH &gt; 7.20); <b>conservative fluids</b> once shock resolved (FACTT); <b>prone positioning ≥ 16 h/day</b> if P/F &lt; 20 kPa (150 mmHg) (PROSEVA: mortality benefit); NMB infusion for 48 h in severe early ARDS selectively (ACURASYS vs ROSE: no benefit with light sedation); <b>VV-ECMO</b> in refractory hypoxaemia or hypercapnia (CESAR, EOLIA); steroids debated (dexamethasone in COVID-19, DEXA-ARDS); avoid HFOV (OSCILLATE, OSCAR).</li></ul>`,
p:"Use the pressure–volume diagram: PEEP and VT position the tidal breath between atelectrauma and overdistension.",
v:"Definition and severity (Berlin and 2023), causes, phases, ventilation strategy (numbers), adjuncts with trial evidence."},
{f:"resp",t:"Mechanical ventilation, weaning and respiratory support",b:`<ul class="clean"><li><b>Modes</b>: volume control (set VT, variable pressure), pressure control (set pressure, variable VT), PRVC, SIMV, pressure support (patient-triggered, flow-cycled), CPAP, APRV (long high pressure with brief releases), NAVA. HFOV not recommended in adults.</li>
<li><b>Complications</b>: VILI (volutrauma, barotrauma, atelectrauma, biotrauma), pneumothorax, haemodynamic compromise (↓ venous return), <b>VAP</b> (bundle: head-up 30–45°, daily sedation hold, subglottic suction, cuff pressure 20–30 cmH2O, oral care (chlorhexidine debated), avoid unnecessary reintubation), diaphragm dysfunction, oxygen toxicity.</li>
<li><b>Weaning</b>: daily screening (cause improving, FiO2 ≤ 0.4, PEEP ≤ 8, haemodynamically stable, awake), spontaneous breathing trial (30–120 min on PS 5–8 or T-piece); predictors: RSBI (RR/VT in L) &lt; 105; extubate onto HFNO or NIV in high-risk patients. Tracheostomy (TracMan: early vs late no mortality difference).</li>
<li><b>NIV</b>: hypercapnic COPD exacerbation with pH &lt; 7.35 and PaCO2 &gt; 6.5 kPa despite medical therapy (BTS): strong evidence; cardiogenic pulmonary oedema (CPAP); obesity hypoventilation; post-extubation in high-risk; avoid delaying intubation in de novo hypoxaemic failure.</li>
<li><b>HFNO</b>: up to 60 L/min, FiO2 0.21–1, heated and humidified, dead-space washout, small PEEP (~1 cmH2O per 10 L/min with mouth closed): hypoxaemic failure (FLORALI), pre-oxygenation, post-extubation.</li>
<li><b>Sedation</b>: light targets (RASS 0 to −2), analgesia-first, dexmedetomidine or propofol over benzodiazepines; ABCDEF bundle (assess pain, both SAT and SBT, choice of sedation, delirium, early mobility, family).</li></ul>`,
p:"Typical exam questions: 'Mechanical ventilation: effects on the body' (cardiovascular, renal, hepatic, cerebral and respiratory effects of positive pressure).",
v:"Modes, physiological effects and complications, VAP bundle, weaning criteria and SBT, NIV and HFNO indications, sedation."},
{f:"resp",t:"Oxygen therapy and oxygen toxicity",b:`<ul class="clean"><li><b>Targets</b> (BTS 2017): SpO2 94–98% for most acutely ill patients; 88–92% if at risk of hypercapnic respiratory failure (COPD, obesity hypoventilation, neuromuscular disease, chest wall disease). Avoid hyperoxia: meta-analyses suggest liberal O2 increases mortality in acutely ill adults (IOTA); ICU trials of conservative vs usual oxygen show mixed results (ICU-ROX, HOT-ICU, UK-ROX).</li>
<li><b>Pulmonary toxicity</b> (Lorrain Smith effect): reactive oxygen species (superoxide, hydroxyl, H2O2) overwhelm antioxidants: tracheobronchitis, reduced vital capacity, then diffuse alveolar damage and fibrosis; related to FiO2 and duration (FiO2 &gt; 0.6 for &gt; 24–48 h).</li>
<li><b>CNS toxicity</b> (Paul Bert effect): hyperbaric O2 (&gt; 2–3 atm): seizures, visual and auditory disturbances.</li>
<li><b>Absorption atelectasis</b>: high FiO2 replaces nitrogen in poorly ventilated alveoli; O2 is absorbed and the alveoli collapse (pre-oxygenation, high FiO2 during anaesthesia).</li>
<li><b>Hypercapnia with O2 in COPD</b>: mainly V/Q mismatch (loss of HPV) and the Haldane effect, less loss of hypoxic drive.</li>
<li><b>Retinopathy of prematurity</b>: vasoconstriction then abnormal neovascularisation in premature infants (target SpO2 91–95%).</li>
<li><b>Drug interactions</b>: bleomycin (pulmonary fibrosis with high FiO2: use lowest FiO2), paraquat, amiodarone, nitrofurantoin.</li>
<li><b>Hyperbaric oxygen</b>: CO poisoning (selected), decompression illness, gas embolism, necrotising infections, radiation injury; complications: barotrauma (ears, sinuses, lungs), CNS toxicity, claustrophobia.</li></ul>`,
p:"Typical exam questions: 'Oxygen toxicity: safe FiO2', 'Oxygen toxicity' (SAQ).",
v:"Targets with evidence, mechanisms of toxicity (pulmonary, CNS), absorption atelectasis, hypercapnia in COPD, special groups, HBO."},
{f:"icu",t:"Acute kidney injury and renal replacement therapy",b:`<ul class="clean"><li><b>KDIGO AKI</b>: stage 1 creatinine ×1.5–1.9 (or ≥ 26.5 µmol/L rise in 48 h) or UO &lt; 0.5 mL/kg/h for 6–12 h; stage 2 ×2–2.9 or UO &lt; 0.5 for ≥ 12 h; stage 3 ×3, creatinine ≥ 354 µmol/L, RRT, or UO &lt; 0.3 for ≥ 24 h or anuria ≥ 12 h. (RIFLE and AKIN preceded it.)</li>
<li><b>Indications for RRT</b> ("AEIOU"): refractory acidosis, electrolytes (K⁺ &gt; 6.5 refractory), intoxication (dialysable drugs), overload (fluid unresponsive to diuretics), uraemia (pericarditis, encephalopathy, bleeding). Timing: early initiation without urgent indication shows no benefit (AKIKI, IDEAL-ICU, STARRT-AKI).</li>
<li><b>Principles</b>: <b>diffusion</b> (concentration gradient across membrane: small solutes; haemodialysis), <b>convection</b> ("solvent drag" with ultrafiltration: middle molecules; haemofiltration), ultrafiltration (fluid removal), adsorption.</li>
<li><b>Modalities</b>: CVVH (convection, replacement fluid pre- or post-filter), CVVHD (diffusion), CVVHDF (both), intermittent haemodialysis (faster solute removal; hypotension, disequilibrium), SLED (hybrid), peritoneal dialysis. Continuous therapies are better tolerated in haemodynamically unstable patients and with raised ICP.</li>
<li><b>Dose</b>: effluent <b>20–25 mL/kg/h</b> delivered (prescribe ~25–30) (RENAL, ATN: higher doses no benefit; HVHF &gt; 50 mL/kg/h reduces vasopressor needs but not mortality). <b>Filtration fraction</b> &lt; 20–25% to limit clotting (pre-dilution helps).</li>
<li><b>Anticoagulation</b>: regional citrate (chelates Ca²⁺ in circuit; monitor systemic and post-filter ionised Ca²⁺; citrate accumulation in liver failure: ↑ total/ionised Ca ratio &gt; 2.5, metabolic acidosis) preferred over heparin (KDIGO); prostacyclin; no anticoagulation with high bleeding risk.</li>
<li><b>Complications</b>: catheter-related (bleeding, infection, thrombosis), hypotension, electrolyte disturbance (hypophosphataemia, hypokalaemia), hypothermia, drug removal (antibiotic dosing), air embolism, disequilibrium syndrome. Aluminium toxicity historically with dialysate water (encephalopathy, bone disease, anaemia).</li></ul>`,
p:"Typical exam questions: 'Sepsis with AKI, then different types of dialysis', 'Haemodialysis: types, complications, aluminium toxicity', 'Acute renal failure, RIFLE criteria'.",
v:"Definitions and staging, causes (pre-renal, renal, post-renal), indications and timing evidence, physical principles, modalities, dose, anticoagulation, complications."},
{f:"icu",t:"ICU care bundle: nutrition, glucose, prophylaxis, delirium",b:`<ul class="clean"><li><b>Nutrition</b>: enteral within 24–48 h if gut functional (prokinetics for intolerance; post-pyloric if high gastric residuals), parenteral when enteral fails (avoid early full PN: EPaNIC). Energy ~20–25 kcal/kg/day (avoid overfeeding early; indirect calorimetry is gold standard), protein 1.2–2 g/kg/day. Count propofol lipid (1.1 kcal/mL).</li>
<li><b>Refeeding syndrome</b> (malnutrition, alcohol, prolonged fasting): insulin surge drives phosphate, K⁺ and Mg²⁺ into cells → hypophosphataemia (weakness, respiratory failure, arrhythmias, heart failure), Wernicke's: start low (10 kcal/kg/day), thiamine before feeding, replace electrolytes (NICE CG32).</li>
<li><b>Glucose</b>: target 6–10 mmol/L (NICE-SUGAR: intensive 4.5–6 increased mortality and hypoglycaemia).</li>
<li><b>Prophylaxis</b>: VTE (LMWH + mechanical), stress ulcer prophylaxis in high-risk patients (coagulopathy, shock, prolonged ventilation; REVISE: pantoprazole reduced bleeding without mortality effect), eye care, pressure care, mouth care, early mobilisation.</li>
<li><b>Delirium</b>: CAM-ICU screening; prevention (sleep, mobility, orientation, hearing aids, minimise benzodiazepines and anticholinergics); antipsychotics don't shorten delirium (MIND-USA); dexmedetomidine for agitated delirium preventing extubation.</li>
<li><b>Transfusion</b>: restrictive Hb 70 g/L (TRICC, TRISS); higher in acute coronary syndrome (MINT 2023 favoured ~100 g/L).</li>
<li><b>Communication</b>: family meetings, treatment escalation plans, end-of-life care, organ donation discussions with specialist nurse.</li></ul>`,
p:"A 'daily ICU checklist' answer: FAST HUGS BID (feeding, analgesia, sedation, thromboprophylaxis, head-up, ulcer prophylaxis, glucose, spontaneous breathing trial, bowels, indwelling catheters, de-escalation of antibiotics).",
v:"Nutrition targets and timing, refeeding, glucose, prophylaxis, delirium, transfusion thresholds, communication."},
{f:"tr",t:"Major trauma and damage control resuscitation",b:`<ul class="clean"><li><b>Primary survey</b>: &lt;C&gt;ABCDE: catastrophic haemorrhage (tourniquet, packing, haemostatic dressings, pelvic binder), airway with cervical spine protection (manual in-line stabilisation; collars less used), breathing (tension pneumothorax: finger thoracostomy or needle decompression at 4th/5th ICS mid-axillary line; open pneumothorax; massive haemothorax; flail chest), circulation (haemorrhage control, IO/IV access, blood), disability (GCS, pupils, glucose), exposure (hypothermia).</li>
<li><b>Damage control resuscitation</b>: <b>permissive hypotension</b> (SBP ~80–90 or palpable radial pulse until haemorrhage control; not in TBI: SBP ≥ 110), minimal crystalloid, early blood products (1:1:1 red cells:FFP:platelets or whole blood; PROPPR), <b>TXA 1 g within 3 h then 1 g over 8 h</b> (CRASH-2), calcium (hypocalcaemia joins hypothermia, acidosis and coagulopathy as the "lethal diamond"), warming, viscoelastic-guided fibrinogen (target &gt; 1.5–2 g/L), damage control surgery or interventional radiology; REBOA (UK-REBOA trial: no benefit, possible harm).</li>
<li><b>Trauma-induced coagulopathy</b>: acute (endothelial activation, protein C, hyperfibrinolysis) present on arrival in ~25%; worsened by dilution, hypothermia, acidosis, hypocalcaemia.</li>
<li><b>Scoring</b>: ISS (sum of squares of the highest AIS in three body regions; &gt; 15 = major trauma), RTS, TRISS (probability of survival), GCS.</li>
<li><b>Spine</b>: NEXUS or Canadian C-spine rules for imaging; CT for high-risk; spinal shock vs neurogenic shock (bradycardia, hypotension above T6 lesions).</li>
<li><b>Anaesthesia for trauma</b>: RSI with reduced-dose induction (ketamine 1 mg/kg or reduced fentanyl/propofol; rocuronium 1.2 mg/kg), MILS, videolaryngoscope, avoid hypoxia and hypotension (worse outcome in TBI), arterial line, rapid infuser, cell salvage, normothermia, NAP-style checklists.</li></ul>`,
p:"Use the haemorrhage class diagram (ATLS) to link blood loss to physiology and transfusion needs.",
v:"Primary survey with life-saving interventions, damage control resuscitation (targets and evidence), coagulopathy, scores, spine, anaesthetic technique."},
{f:"tr",t:"Massive transfusion and transfusion complications",b:`<ul class="clean"><li><b>Massive haemorrhage</b> definitions: loss of one blood volume in 24 h, 50% in 3 h, or &gt; 150 mL/min; or clinically &gt; 4 units in 1 h with ongoing bleeding. Activate the <b>major haemorrhage protocol</b>: named coordinator, packs of red cells and FFP (± platelets, cryoprecipitate), group O (RhD negative for women of childbearing potential) until group-specific/crossmatched.</li>
<li><b>Targets</b> (BSH 2015/updates): Hb 70–90 g/L during bleeding, platelets &gt; 50 (&gt; 100 in TBI or multiple trauma), fibrinogen &gt; 1.5 g/L (&gt; 2 in obstetrics), PT/APTT &lt; 1.5 × normal, ionised Ca²⁺ &gt; 1.1 mmol/L, temperature &gt; 36 °C, pH &gt; 7.2; viscoelastic testing (TEG/ROTEM: Stage 6) guides therapy.</li>
<li><b>Complications of massive transfusion</b>: dilutional coagulopathy and thrombocytopenia, hypothermia, hypocalcaemia (citrate binds Ca²⁺; impaired metabolism in liver failure/hypothermia), hyperkalaemia (stored red cells), acidosis then alkalosis (citrate → bicarbonate), TACO, TRALI, immunomodulation.</li>
<li><b>Transfusion reactions</b>: acute haemolytic (ABO incompatibility: fever, hypotension, haemoglobinuria, DIC; usually clerical error: stop, keep line, fluids, report to SHOT/MHRA), febrile non-haemolytic, allergic/anaphylactic (IgA deficiency), TRALI (within 6 h; donor anti-HLA/HNA antibodies; non-cardiogenic oedema), TACO (commonest cause of transfusion death in SHOT reports: hypertension, overload; diuretics), delayed haemolytic, transfusion-associated GvHD (irradiated products for at-risk), infection (bacterial contamination: platelets).</li>
<li><b>Patient blood management</b>: optimise Hb, minimise loss (TXA, cell salvage, surgical technique, point-of-care tests), restrictive thresholds.</li></ul>`,
p:"Typical exam questions: 'Blood transfusion error' and 'Hyperkalaemia with bradycardia during transfusion'.",
v:"Definitions and MHP, targets, complications by mechanism, reactions table (timing, cause, management), patient blood management."},
{f:"tox",t:"Burns and inhalational injury",b:`<ul class="clean"><li><b>Assessment</b>: % TBSA by Wallace rule of nines (adult: head 9, each arm 9, front trunk 18, back 18, each leg 18, perineum 1) or Lund–Browder chart (children: larger head, smaller legs); patient's palm with fingers ≈ 1%. Exclude simple erythema. Depth: superficial (epidermis, painful, red), superficial partial thickness (blisters, painful), deep partial thickness, full thickness (white/leathery, insensate).</li>
<li><b>Airway</b>: <b>inhalational injury</b> signs: enclosed-space fire, facial burns, singed nasal hairs, soot in mouth/sputum, hoarseness, stridor, carboxyhaemoglobin. Early intubation with an <b>uncut</b> large tube (oedema worsens over 24–48 h) by an experienced operator; suxamethonium safe in the first 24 h (avoid from 24–48 h until healed: hyperkalaemia); resistance to non-depolarising NMBs later.</li>
<li><b>Carbon monoxide</b>: binds Hb with ~240× the affinity of O2 (left shift, reduced carriage) and cytochrome oxidase. Pulse oximetry over-reads; measure COHb by co-oximetry. Treatment: 100% O2 (t½ 4–6 h on air → 60–90 min on 100% O2 → ~20–30 min hyperbaric); HBO considered for severe cases (LOC, neurological signs, pregnancy, COHb &gt; 25%) though evidence is mixed.</li>
<li><b>Cyanide</b> (burning plastics, foam): inhibits cytochrome oxidase a3: high lactate (&gt; 8 mmol/L suggests), high venous O2, coma, seizures, cardiovascular collapse. Treatment: <b>hydroxocobalamin 5 g IV</b> (binds to form cyanocobalamin; red urine, interferes with co-oximetry), sodium thiosulphate; avoid nitrites in combined CO poisoning.</li>
<li><b>Fluids</b>: for burns &gt; 15% TBSA adults (&gt; 10% children): <b>Parkland 4 mL/kg/%TBSA</b> crystalloid in 24 h from time of burn (half in first 8 h); many centres start at 2–4 mL/kg/% (ABA) and titrate to urine output 0.5 mL/kg/h (adults), 1 mL/kg/h (children) to avoid "fluid creep" (abdominal compartment syndrome, pulmonary oedema); add maintenance with glucose in children; albumin rescue.</li>
<li><b>Other</b>: escharotomy for circumferential burns (chest: ventilation; limbs: perfusion), analgesia (opioids, ketamine), hypermetabolism (early enteral feeding, high protein, propranolol, oxandrolone), infection, temperature control, pharmacokinetic changes, referral to burns centre (inhalational injury, face, hands, feet, perineum, circumferential, full thickness, large % TBSA, electrical/chemical, comorbidity).</li></ul>`,
p:"Typical exam questions: 'Chemical factory worker with burns and black face, GCS 15: burns, cyanide, CO poisoning in detail', '27-year-old found unconscious in a closed space with facial burns and soot', '25-year-old with 30% burns: signs of inhalational injury', 'RSI in facial/neck burns'. Use the burns diagram.",
v:"Assessment (TBSA, depth), airway decisions, CO and cyanide (mechanism, diagnosis, treatment), fluids (Parkland and titration), other management, referral."},
{f:"tox",t:"Poisoning",b:`<ul class="clean"><li><b>Approach</b>: ABCDE, glucose, ECG, blood gas (anion and osmolar gaps), paracetamol and salicylate levels in all, collateral history, TOXBASE/National Poisons Information Service; toxidromes (sympathomimetic, anticholinergic, cholinergic, opioid, sedative-hypnotic, serotonin).</li>
<li><b>Decontamination</b>: activated charcoal 50 g within 1 h for adsorbable toxins (not alcohols, metals (iron, lithium), acids/alkalis); whole bowel irrigation (sustained-release preparations, body packers, iron, lithium); gastric lavage rarely.</li>
<li><b>Enhanced elimination</b>: urinary alkalinisation (salicylates, phenobarbital), multiple-dose charcoal (carbamazepine, theophylline, dapsone, quinine), haemodialysis (salicylates, lithium, methanol, ethylene glycol, metformin, valproate, theophylline, barbiturates).</li>
<li><b>Tricyclic antidepressants</b>: anticholinergic toxidrome, seizures, Na⁺ channel block (QRS &gt; 100 ms, terminal R in aVR, VT), hypotension. <b>Sodium bicarbonate</b> 1–2 mmol/kg to pH 7.45–7.55 (alkalinisation reduces free drug and the Na⁺ load overcomes block); hyperventilation if intubated; magnesium; lipid; avoid class Ia/Ic antiarrhythmics, physostigmine and flumazenil.</li>
<li><b>Toxic alcohols</b> (methanol: formic acid → optic neuritis, blindness; ethylene glycol: glycolic and oxalic acid → oxalate crystals, AKI, hypocalcaemia): high anion gap acidosis with high <b>osmolar gap</b> (early); treat with <b>fomepizole</b> (or ethanol) to block alcohol dehydrogenase, haemodialysis, folinic acid (methanol), thiamine/pyridoxine (ethylene glycol).</li>
<li><b>Salicylates</b>: respiratory alkalosis then metabolic acidosis, tinnitus, hyperthermia, non-cardiogenic oedema: alkalinise urine, dialysis if severe (&gt; 700 mg/L, acidosis, CNS signs); avoid intubation if possible (loss of compensatory hyperventilation) or hyperventilate.</li>
<li><b>Others</b>: β-blockers and CCBs (calcium, glucagon, high-dose insulin euglycaemic therapy 1 unit/kg/h, vasopressors, lipid, ECMO), digoxin (Fab), opioids (naloxone), benzodiazepines (supportive; flumazenil rarely), organophosphates (atropine doubling doses, pralidoxime, benzodiazepines), iron (desferrioxamine), lithium (fluids, dialysis), MDMA (hyperthermia, hyponatraemia, serotonin syndrome: cooling, benzodiazepines, dantrolene/cyproheptadine debated), sulphonylureas (glucose, octreotide), cyanide and CO (burns slide), paracetamol (Stage 8: nomogram).</li></ul>`,
p:"Typical exam questions: '23-year-old comatose with blurred vision: methanol toxicity, investigations, anion gap, management', 'Anticholinergics, TCA and anticonvulsant toxicity', 'Paracetamol toxicity'. Use the paracetamol nomogram and the anion/osmolar gap calculator.",
v:"General approach, decontamination and elimination, then specific poisons with mechanism, features and antidote."},
{f:"tox",t:"Environmental emergencies: hypothermia, drowning, electrocution, heat",b:`<ul class="clean"><li><b>Accidental hypothermia</b> (core &lt; 35 °C; Swiss staging I–IV by consciousness, shivering, cardiac output): J (Osborn) waves, bradycardia, AF, VF below 28 °C (handling can trigger). Rewarming: passive, active external (forced air), active internal (warm fluids, lavage), <b>ECMO/CPB for arrest or instability</b> (survival with good neurology possible after prolonged arrest: "not dead until warm and dead"). ALS: withhold adrenaline and limit shocks to 3 below 30 °C; double the dose interval 30–35 °C. Potassium &gt; 12 mmol/L (avalanche) suggests non-survivable asphyxia.</li>
<li><b>Drowning</b>: hypoxia is the key insult (laryngospasm, aspiration, surfactant loss); 5 rescue breaths first in arrest; ARDS, hypothermia, cervical spine injury in diving; fresh vs salt water differences are clinically minor.</li>
<li><b>Electrocution</b> (Stage 10 physics): low-voltage AC (VF, tetanic grip), high-voltage (deep tissue burns out of proportion to skin, rhabdomyolysis, compartment syndrome, AKI, fractures from tetany), lightning (DC: asystole, respiratory arrest: prolonged CPR worthwhile; Lichtenberg figures). ECG monitoring after significant exposure; CK and myoglobin.</li>
<li><b>Heat illness</b>: heat exhaustion vs <b>heat stroke</b> (core &gt; 40 °C with CNS dysfunction): rapid cooling (cold water immersion for exertional, evaporative), fluids, monitor for rhabdomyolysis, DIC, AKI, liver failure. Differential: MH, NMS, serotonin syndrome, thyroid storm, MDMA, sepsis, anticholinergic toxicity.</li></ul>`,
p:"Know the ALS modifications for hypothermia and the 'not dead until warm and dead' principle with ECMO.",
v:"Pathophysiology, staging, rewarming methods and ALS changes; drowning, electrocution and heat stroke essentials."},
{f:"cr",t:"Perioperative anaphylaxis",b:`<ul class="clean"><li><b>Mechanism</b>: IgE-mediated mast cell and basophil degranulation (histamine, tryptase, leukotrienes, prostaglandins, PAF); non-IgE (direct mast cell activation via MRGPRX2, complement).</li>
<li><b>NAP6</b> (2018): ~1 in 10 000 anaesthetics; culprits: <b>antibiotics</b> (~47%; teicoplanin highest rate, co-amoxiclav most frequent), <b>NMBs</b> (~33%; suxamethonium highest rate, rocuronium, atracurium), <b>chlorhexidine</b> (~9%), Patent Blue dye (~4.5%). Presenting features: hypotension (commonest, often sole), bronchospasm, low EtCO2, tachycardia or bradycardia; rash often absent initially; cardiac arrest in ~15%; mortality ~4%.</li>
<li><b>Grades</b> (NAP6): 1 mild mucocutaneous; 2 moderate (hypotension, bronchospasm not life-threatening); 3 life-threatening; 4 cardiac arrest; 5 death.</li>
<li><b>Management</b> (AAGBI/RCUK): stop triggers (antibiotic, chlorhexidine, colloids, latex), call for help, 100% O2, airway, elevate legs; <b>adrenaline IV 50 µg boluses</b> (anaesthetised and monitored) titrated, or IM 500 µg if no IV; adrenaline infusion early if repeated boluses needed; rapid IV fluids (20 mL/kg); CPR with standard adrenaline dosing in arrest (grade 4); refractory: noradrenaline, vasopressin, glucagon (β-blocked patients), metaraminol, ECMO. Bronchospasm: salbutamol, magnesium, ketamine. Second-line: chlorphenamine and hydrocortisone are not life-saving (RCUK 2021 removed them from the immediate algorithm; consider after stabilisation).</li>
<li><b>Investigations</b>: mast cell <b>tryptase</b>: sample 1 as soon as feasible after starting resuscitation, sample 2 at 1–2 h (no later than 4 h), sample 3 at ≥ 24 h (baseline) or at allergy clinic. Raised tryptase supports mast cell activation (peak 1–2 h, t½ ~2 h).</li>
<li><b>Follow-up</b>: refer to an anaesthetic allergy clinic (skin prick and intradermal tests, specific IgE, challenge), report to MHRA (Yellow Card), document and inform the patient and GP; decide whether surgery continues after stabilisation.</li></ul>`,
p:"Typical exam questions: 'Anaphylaxis'; NAP6 is the evidence base: know the culprits and the hypotension-first presentation.",
v:"Mechanism, incidence and culprits, presentation and grading, immediate management with doses, refractory options, tryptase timing, follow-up and reporting."},
{f:"cr",t:"Perioperative cardiac arrest and resuscitation",b:`<ul class="clean"><li><b>NAP7</b> (2023): perioperative cardiac arrest ~3 per 10 000 anaesthetics; commonest causes: <b>major haemorrhage</b>, <b>bradyarrhythmia</b>, cardiac ischaemia, <b>anaphylaxis</b>, pulmonary embolism, hypoxaemia (airway), BCIS, LAST; risk higher in emergency, frail, ASA 4–5, cardiac and major vascular surgery, extremes of age. Survival is better than in-hospital arrest elsewhere (~70%).</li>
<li><b>ALS</b> (RCUK 2021; ERC 2025 update emphasises the first 3–5 minutes, IV over IO access where possible, changing pad vector for refractory VF, experienced use of POCUS, and new special-circumstances algorithms): high-quality CPR 100–120/min, depth 5–6 cm, minimal pauses, waveform capnography; shockable rhythm: shock, CPR 2 min, adrenaline 1 mg after third shock then every 3–5 min, amiodarone 300 mg after third shock (150 mg after fifth); non-shockable: adrenaline 1 mg as soon as possible. Reversible causes: <b>4 Hs</b> (hypoxia, hypovolaemia, hypo/hyperkalaemia and metabolic, hypothermia/hyperthermia) and <b>4 Ts</b> (thrombosis coronary or pulmonary, tension pneumothorax, tamponade, toxins).</li>
<li><b>Perioperative specifics</b>: anticipate (arrest during induction or major bleeding), call for help early, stop surgery and anaesthetic agents if appropriate, 100% O2, check airway, start CPR (prone CPR possible), consider open cardiac massage in the open chest/abdomen, treat cause (bleeding, anaphylaxis, LAST lipid, MH dantrolene, hyperkalaemia calcium), ECPR in selected cases.</li>
<li><b>Bradycardia</b>: atropine 500 µg (repeat to 3 mg), isoprenaline, adrenaline infusion, transcutaneous pacing; vagal causes (pneumoperitoneum, traction, spinal): stop stimulus.</li>
<li><b>Post-resuscitation care</b>: airway and ventilation (SpO2 94–98%, normocapnia), MAP &gt; 65, coronary angiography if STEMI, <b>temperature control</b> (prevent fever ≤ 37.7 °C for ≥ 72 h; TTM2 found no benefit of 33 °C), glucose, seizure management, multimodal neuroprognostication (no earlier than 72 h).</li>
<li><b>Debrief</b>, documentation, duty of candour, support for staff (NAP7 found significant psychological impact).</li></ul>`,
p:"NAP7 lessons: bradycardia and haemorrhage are common precipitants; frailty and emergency surgery raise risk; talk about treatment escalation plans before surgery.",
v:"NAP7 epidemiology and causes, ALS sequence with doses, perioperative adaptations, bradycardia, post-resuscitation care including temperature, debrief."},
{f:"cr",t:"Airway crises",b:`<ul class="clean"><li><b>DAS 2015 unanticipated difficult intubation</b>: Plan A (facemask and intubation: optimise position, preoxygenation and apnoeic oxygenation, ≤ 3 attempts (+1 by experienced), videolaryngoscope, bougie, external laryngeal manipulation); Plan B (second-generation SGA: maximum 3 attempts; stop and think: wake, intubate via SGA (fibreoptic), proceed with SGA, or FONA); Plan C (facemask ventilation; if possible wake patient (sugammadex)); Plan D (<b>CICO</b>: declare, front-of-neck access with <b>scalpel–bougie–tube</b> through the cricothyroid membrane; full neuromuscular blockade).</li>
<li><b>NAP4</b> lessons: poor assessment and planning, failure to use capnography (ICU and ED deaths), delayed FONA, obesity, aspiration (most common cause of airway death under anaesthesia), problems at extubation and in recovery.</li>
<li><b>Extubation</b> (DAS 2012): plan, prepare, perform, post-extubation care; "at-risk" extubations: remifentanil, airway exchange catheter, SGA exchange (Bailey manoeuvre), awake vs deep, delayed extubation or tracheostomy.</li>
<li><b>Aspiration</b>: head-down, suction, 100% O2, intubate if needed, bronchoscopy for particulate matter, no routine steroids or antibiotics (aspiration pneumonitis vs pneumonia), supportive care; prevention with fasting, RSI, gastric ultrasound, NG decompression.</li>
<li><b>High airway pressure</b>: systematic check from patient to machine: patient (bronchospasm, anaphylaxis, pneumothorax, endobronchial intubation, chest wall rigidity, light anaesthesia/coughing, pneumoperitoneum, abdominal compression), tube (kink, secretions, cuff herniation, displacement), circuit/ventilator (valves, settings). Hand-ventilate to feel compliance; pass a suction catheter.</li>
<li><b>Laryngospasm</b>, <b>failed intubation in obstetrics</b> and <b>paediatric airway</b> drills are in Stage 14.</li></ul>`,
p:"Typical exam questions: 'During appendicectomy sudden disappearance of capnogram trace' (Stage 11) and 'High peak airway pressure at lap chole' (Stage 14).",
v:"DAS plans A–D with key numbers, CICO technique, NAP4 lessons, extubation strategies, aspiration management, high airway pressure differential."},
{f:"icu",t:"Organ donation and end-of-life care",b:`<ul class="clean"><li><b>Pathways</b>: donation after brain death (<b>DBD</b>: death confirmed by neurological criteria (Stage 3), heart beating until retrieval) and donation after circulatory death (<b>DCD</b>: planned withdrawal of life-sustaining treatment, death after 5 min of observed asystole; warm ischaemic time limits organs: liver, kidney, lungs, pancreas, and heart via normothermic regional perfusion or ex-situ perfusion).</li>
<li><b>Legislation (UK)</b>: deemed consent ("opt-out") in Wales (2015), England (2020, Max and Keira's law), Scotland (2021), Northern Ireland (2023); the family is always approached by the specialist nurse for organ donation (SNOD), who should be involved early; the decision to withdraw treatment must be separate from the donation decision.</li>
<li><b>Physiology after brainstem death</b>: catecholamine storm (hypertension, arrhythmias, myocardial injury) then loss of vasomotor tone (hypotension), diabetes insipidus (~70%), hypothermia, coagulopathy, hyperglycaemia, inflammation, neurogenic pulmonary oedema.</li>
<li><b>Donor optimisation</b> (care bundle): MAP 60–80 mmHg (fluid to euvolaemia, vasopressin first-line (0.5–4 U/h), then noradrenaline), treat DI (desmopressin), lung-protective ventilation with recruitment (VT 6–8 mL/kg, PEEP 5–10, FiO2 for SpO2 &gt; 92%), methylprednisolone 15 mg/kg (UK practice), glucose 4–10, normothermia, correct electrolytes (Na⁺ &lt; 150), urine output 0.5–2.5 mL/kg/h, continue enteral feeding, blood products as needed.</li>
<li><b>End-of-life care</b>: treatment escalation plans and ReSPECT discussions, best-interest decisions for patients lacking capacity, symptom control (opioids, anxiolytics, antisecretory agents), family support, faith and cultural needs, document clearly.</li></ul>`,
p:"Typical exam questions: 'Objectives for organ donation and role of steroids', 'Organ donation', brainstem death testing (Stage 3).",
v:"DBD vs DCD, legal framework and consent, physiological changes after brainstem death, donor optimisation with targets, end-of-life principles."},
{f:"resp",t:"Chest imaging in ICU",b:`<ul class="clean"><li><b>Systematic CXR</b>: patient details, projection (AP in ICU magnifies heart), rotation, inspiration, penetration; then tubes and lines (ETT tip 3–5 cm above carina; CVC tip at the cavoatrial junction ≈ carina level; NG tube below the diaphragm and to the left of the midline crossing the carina; chest drains; pacing wires), then ABCDE (airway, breathing (lung fields, pneumothorax, effusion, consolidation, collapse), cardiac (size, borders), diaphragm (free air, hernia), everything else (bones, soft tissue, surgical emphysema, sternotomy wires, valves)).</li>
<li><b>Patterns</b>: lobar collapse (right upper: elevated horizontal fissure; left lower: "sail" sign behind heart; right middle: loss of right heart border), consolidation with air bronchograms, ARDS (bilateral patchy infiltrates, normal heart size) vs cardiogenic oedema (cardiomegaly, upper lobe diversion, Kerley B lines, effusions, bat-wing), pneumothorax (supine: deep sulcus sign), tension (mediastinal shift), effusion (meniscus; supine haze), pneumoperitoneum (gas under diaphragm), diaphragmatic hernia (bowel in chest), misdirected CVC (into contralateral subclavian or IJV).</li>
<li><b>Lung ultrasound</b> (BLUE protocol): lung sliding (absent with pneumothorax; lung point confirms), A-lines (normal or pneumothorax), B-lines (interstitial syndrome: oedema, ARDS), consolidation (tissue-like with dynamic air bronchograms), effusion (anechoic above diaphragm), diaphragm function.</li>
<li><b>CT</b>: PE (CTPA), ARDS heterogeneity, empyema, abscess, trauma.</li></ul>`,
p:"Typical exam questions: 'CXR showing chest drain, sternotomy, fluid in fissures, CVP line misdirected into subclavian vein', 'CXR: left-sided diaphragmatic hernia'.",
v:"Systematic approach, line and tube positions, key patterns, ultrasound signs."},
];

/* ---------- data ---------- */
const BURN={adult:[["Head & neck",9],["Right arm",9],["Left arm",9],["Front trunk",18],["Back trunk",18],["Right leg",18],["Left leg",18],["Perineum",1]],child:[["Head & neck",18],["Right arm",9],["Left arm",9],["Front trunk",18],["Back trunk",18],["Right leg",14],["Left leg",14]]};
const ATLS=[[0,15,"I","< 750","< 100","Normal","Normal","14–20","> 30","Slightly anxious","Monitor; crystalloid/blood unlikely"],[15,30,"II","750–1500","100–120","Normal","Decreased","20–30","20–30","Mildly anxious","Possible blood"],[30,40,"III","1500–2000","120–140","Decreased","Decreased","30–40","5–15","Anxious, confused","Blood; consider MHP"],[40,100,"IV","> 2000","> 140","Decreased","Decreased","> 35","Negligible","Confused, lethargic","Massive transfusion protocol"]];

const CALCS=[
 {t:"NEWS2",c:"spo2",in:[["Respiratory rate","rr",22],["SpO2 % (scale 1)","s",93],["On supplemental O2 (1/0)","o",1],["Systolic BP","sbp",98],["Heart rate","hr",112],["New confusion / V / P / U (1/0)","c",0],["Temperature °C","t",38.4]],
  f:(v,fmt)=>{const sc=[v.rr<=8?3:v.rr<=11?1:v.rr<=20?0:v.rr<=24?2:3, v.s<=91?3:v.s<=93?2:v.s<=95?1:0, v.o?2:0, v.sbp<=90?3:v.sbp<=100?2:v.sbp<=110?1:v.sbp<=219?0:3, v.hr<=40?3:v.hr<=50?1:v.hr<=90?0:v.hr<=110?1:v.hr<=130?2:3, v.c?3:0, v.t<=35?3:v.t<=36?1:v.t<=38?0:v.t<=39?1:2];const tot=sc.reduce((a,b)=>a+b,0);const red=sc.some(x=>x===3);
   return [["NEWS2 total",fmt(tot,0),tot>=7?"bad":tot>=5||red?"warn":"ok"],["Response",tot>=7?"Emergency: critical care team":tot>=5?"Urgent clinical review":red?"Urgent review (single parameter 3)":"Ward-based monitoring"]]},
  n:"Royal College of Physicians 2017. Use SpO2 scale 2 (target 88–92%) for confirmed hypercapnic respiratory failure."},
 {t:"Oxygenation: P/F ratio and oxygenation index",c:"etco2",in:[["PaO2 (kPa)","p",9],["FiO2 (0.21–1)","f",0.6],["Mean airway pressure (cmH2O)","m",18],["PEEP ≥ 5 (1/0)","pe",1]],
  f:(v,fmt)=>{const pf=v.p/v.f,mm=pf*7.5,oi=v.f*100*v.m/(v.p*7.5);const cat=!v.pe?"PEEP < 5: Berlin criteria not applicable":pf<13.3?"Severe ARDS range":pf<26.6?"Moderate":pf<=40?"Mild":"Not ARDS range";return [["P/F (kPa)",fmt(pf,1),pf<13.3?"bad":pf<26.6?"warn":"ok"],["P/F (mmHg)",fmt(mm,0)],["Oxygenation index",fmt(oi,1),oi>25?"bad":oi>15?"warn":"ok"],["Berlin category",cat],["Prone positioning","Consider if P/F < 20 kPa (150 mmHg)"]]},
  n:"OI = FiO2 × mean airway pressure × 100 / PaO2 (mmHg). OI > 25–40 suggests ECMO consideration (paediatrics/neonates)."},
 {t:"Lung-protective ventilation",c:"etco2",in:[["Height (cm)","h",170],["Female (1/0)","f",0],["Plateau pressure (cmH2O)","pp",28],["PEEP (cmH2O)","pe",10],["Set VT (mL)","vt",450]],
  f:(v,fmt)=>{const pbw=(v.f?45.5:50)+0.91*(v.h-152.4),dp=v.pp-v.pe;return [["Predicted body weight (kg)",fmt(pbw,1)],["VT 6 mL/kg (mL)",fmt(6*pbw,0)],["Current VT (mL/kg PBW)",fmt(v.vt/pbw,1),v.vt/pbw>8?"bad":v.vt/pbw>6.5?"warn":"ok"],["Driving pressure (cmH2O)",fmt(dp,0),dp>15?"bad":"ok"],["Static compliance (mL/cmH2O)",fmt(v.vt/Math.max(1,dp),0)],["Plateau < 30?",v.pp<30?"Yes":"No",v.pp<30?"ok":"bad"]]},
  n:"ARDSNet PBW: men 50 + 0.91 × (height − 152.4), women 45.5 + 0.91 × (height − 152.4)."},
 {t:"Anion gap and osmolar gap",c:"nibp",in:[["Na⁺","na",140],["K⁺","k",4.5],["Cl⁻","cl",100],["HCO₃⁻","hc",8],["Albumin (g/L)","al",40],["Measured osmolality (mOsm/kg)","om",330],["Urea (mmol/L)","u",5],["Glucose (mmol/L)","g",6],["Ethanol (mmol/L)","e",0]],
  f:(v,fmt)=>{const ag=v.na+v.k-v.cl-v.hc,cag=ag+0.25*(40-v.al),calc=2*v.na+v.u+v.g+v.e,og=v.om-calc;return [["Anion gap (with K⁺)",fmt(ag,0),ag>16?"bad":"ok"],["Albumin-corrected AG",fmt(cag,0),cag>16?"bad":"ok"],["Calculated osmolality",fmt(calc,0)],["Osmolar gap",fmt(og,0),og>10?"bad":"ok"],["Interpretation",og>10&&cag>16?"High AG + high osmolar gap: toxic alcohol likely (methanol/ethylene glycol)":cag>16?"High AG acidosis: lactate, ketones, renal failure, salicylate, toxic alcohols late":"Normal AG"]]},
  n:"AG normal ~10–16 with K⁺ (8–12 without). Osmolar gap normal < 10; early toxic alcohol ingestion raises the osmolar gap before the anion gap."},
 {t:"Oxygen for transfer",c:"spo2",in:[["Minute ventilation (L/min)","mv",8],["FiO2","f",0.6],["Ventilator driving gas (L/min)","dg",1],["Journey time (min)","t",90]],
  f:(v,fmt)=>{const use=(v.mv*v.f+v.dg)*v.t,need=use*2;return [["O2 used (L)",fmt(use,0)],["Carry (×2 safety) (L)",fmt(need,0)],["Size CD cylinders (460 L)",fmt(Math.ceil(need/460),0)],["Size F cylinders (1360 L)",fmt(Math.ceil(need/1360),0)]]},
  n:"O2 per min ≈ MV × FiO2 (+ driving gas for pneumatic ventilators). Carry at least double the expected requirement (Association of Anaesthetists/ICS transfer guidance)."},
 {t:"Injury Severity Score",c:"abp",in:[["Highest AIS region 1 (1–6)","a",4],["Highest AIS region 2 (1–6)","b",3],["Highest AIS region 3 (1–6)","c",2]],
  f:(v,fmt)=>{const m=Math.max(v.a,v.b,v.c);const iss=m>=6?75:v.a*v.a+v.b*v.b+v.c*v.c;return [["ISS",fmt(iss,0),iss>15?"bad":"ok"],["Category",iss>15?"Major trauma (ISS > 15)":"Not major trauma"]]},
  n:"ISS = sum of squares of the highest AIS in three different body regions (head/neck, face, chest, abdomen, extremities/pelvis, external). Any AIS 6 = ISS 75."},
 {t:"CRRT dose and filtration fraction",c:"spo2",in:[["Weight (kg)","w",80],["Target effluent (mL/kg/h)","d",25],["Blood flow (mL/min)","qb",200],["Haematocrit","hct",0.3],["Post-dilution replacement (mL/h)","uf",1500]],
  f:(v,fmt)=>{const eff=v.w*v.d,qp=v.qb*(1-v.hct)*60,ff=v.uf/qp*100;return [["Effluent rate (mL/h)",fmt(eff,0)],["Plasma flow (mL/h)",fmt(qp,0)],["Filtration fraction (%)",fmt(ff,0),ff>25?"bad":ff>20?"warn":"ok"]]},
  n:"Delivered dose 20–25 mL/kg/h (prescribe more to allow downtime). Keep post-dilution FF < 20–25% to limit filter clotting; pre-dilution reduces FF."},
];

const TABLES=[
 ["Shock: haemodynamic profiles",["Type","CO/CI","SVR","CVP/PAWP","Examples"],[["Hypovolaemic","↓","↑","↓","Haemorrhage, dehydration, burns"],["Cardiogenic","↓","↑","↑","MI, cardiomyopathy, arrhythmia, valve failure"],["Obstructive","↓","↑","↑ (RV)","Tamponade, tension pneumothorax, massive PE"],["Distributive","↑ or N (↓ late)","↓","↓ or N","Sepsis, anaphylaxis, neurogenic, adrenal crisis"]]],
 ["ARDS definitions",["Feature","Berlin 2012","Global 2023"],[["Timing","Within 1 week","Within 1 week"],["Imaging","Bilateral opacities (CXR/CT)","Bilateral opacities (CXR/CT) or ultrasound B-lines/consolidation"],["Oxygenation","P/F ≤ 300 mmHg with PEEP ≥ 5","P/F ≤ 300 or SpO2/FiO2 ≤ 315 (SpO2 ≤ 97%)"],["Support","Invasive or NIV/CPAP ≥ 5","Includes HFNO ≥ 30 L/min (non-intubated ARDS)"],["Severity","Mild 200–300, moderate 100–200, severe < 100 mmHg","Severity for intubated patients as Berlin"]]],
 ["RRT modalities",["Modality","Mechanism","Notes"],[["CVVH","Convection","Middle molecules; replacement pre/post-filter"],["CVVHD","Diffusion","Small solutes; dialysate counter-current"],["CVVHDF","Convection + diffusion","Common ICU choice"],["IHD","Diffusion (high flow)","Fast; hypotension, disequilibrium"],["SLED","Diffusion, slower","Hybrid; daytime"],["PD","Diffusion across peritoneum","Paediatrics, low resource; slow"]]],
 ["Antidotes",["Poison","Antidote / treatment"],[["Paracetamol","Acetylcysteine"],["Opioids","Naloxone"],["Benzodiazepines","Flumazenil (rarely)"],["TCAs","Sodium bicarbonate"],["Methanol / ethylene glycol","Fomepizole (or ethanol), dialysis"],["Cyanide","Hydroxocobalamin 5 g, sodium thiosulphate"],["Carbon monoxide","100% O2 ± hyperbaric O2"],["Organophosphates","Atropine, pralidoxime"],["Digoxin","Digoxin-specific Fab"],["β-blockers / CCBs","Calcium, glucagon, high-dose insulin, lipid"],["Iron","Desferrioxamine"],["Local anaesthetics","Lipid emulsion 20%"],["Sulphonylureas","Glucose, octreotide"],["Heparin / warfarin / dabigatran","Protamine / vitamin K + PCC / idarucizumab"],["Methaemoglobinaemia","Methylene blue 1–2 mg/kg"],["MH","Dantrolene"]]],
 ["Toxidromes",["Toxidrome","Features","Examples"],[["Sympathomimetic","Tachycardia, hypertension, hyperthermia, mydriasis, sweating, agitation","Cocaine, amphetamines, MDMA"],["Anticholinergic","Tachycardia, hyperthermia, dry skin, mydriasis, urinary retention, delirium","TCAs, antihistamines, atropine, hyoscine"],["Cholinergic","Salivation, lacrimation, urination, diarrhoea, bronchorrhoea, bradycardia, miosis","Organophosphates, carbamates, nerve agents"],["Opioid","Miosis, respiratory depression, coma","Heroin, morphine, fentanyl"],["Serotonin","Clonus, hyperreflexia, hyperthermia, agitation","SSRIs + tramadol/MAOI, MDMA"],["Sedative-hypnotic","Sedation, normal pupils, respiratory depression","Benzodiazepines, alcohol, barbiturates"]]],
 ["ATLS haemorrhage classes",["Class","Loss %","Volume mL","HR","SBP","Pulse pressure","RR","UO mL/h","Mental state"],ATLS.map(a=>[a[2],a[0]+"–"+(a[1]===100?"":a[1])+"%",a[3],a[4],a[5],a[6],a[7],a[8],a[9]])],
 ["Burn depth",["Depth","Appearance","Sensation","Healing"],[["Superficial (epidermal)","Red, no blisters","Painful","Days, no scar"],["Superficial partial thickness","Blisters, pink, blanches","Very painful","2–3 weeks"],["Deep partial thickness","Mottled, slow refill","Reduced","> 3 weeks; graft often"],["Full thickness","White/leathery/charred","Insensate","Grafting"]]],
 ["Anaphylaxis grades (NAP6) and tryptase",["Grade","Features"],[["1","Mild: mucocutaneous only"],["2","Moderate: hypotension or bronchospasm not life-threatening"],["3","Life-threatening hypotension, bronchospasm or angioedema"],["4","Cardiac arrest"],["5","Death"],["Tryptase","1: ASAP after resuscitation starts; 2: 1–2 h (≤ 4 h); 3: ≥ 24 h / baseline"]]],
 ["DBD vs DCD",["Feature","DBD","DCD"],[["Death confirmed","Neurological criteria","Circulatory: 5 min asystole after WLST"],["Warm ischaemia","None","Yes (limits organs)"],["Organs","All, including heart and lungs","Kidneys, liver, lungs, pancreas; heart with NRP/ex-situ"],["Physiology issues","Catecholamine storm, DI, hypotension","Time to death after WLST must be within limits"]]],
 ["NAP7: perioperative cardiac arrest",["Item","Finding"],[["Incidence","~3 per 10 000 anaesthetics"],["Common causes","Major haemorrhage, bradyarrhythmia, cardiac ischaemia, anaphylaxis, PE, hypoxaemia"],["High risk","Emergency, frail, ASA 4–5, cardiac/vascular surgery, extremes of age"],["Survival","Better than general in-hospital arrest (~70% initial)"],["Lessons","Treatment escalation planning, recognise bradycardia, debrief and staff support"]]],
];

const CARDS=[
 ["icu","NEWS2 emergency threshold?","≥ 7 (or 3 in one parameter = urgent)."],
 ["icu","Level 3 care?","Advanced respiratory support or ≥ 2 organ support."],
 ["icu","APACHE II components?","Acute physiology (worst 24 h), age, chronic health."],
 ["icu","SOFA systems?","Respiratory, coagulation, liver, cardiovascular, CNS, renal."],
 ["icu","Sepsis-3 definition?","Life-threatening organ dysfunction from dysregulated host response to infection."],
 ["icu","Septic shock definition?","Vasopressors for MAP ≥ 65 AND lactate > 2 despite fluids."],
 ["icu","qSOFA criteria?","RR ≥ 22, altered mentation, SBP ≤ 100."],
 ["icu","Antibiotics timing in septic shock?","Within 1 hour."],
 ["icu","SSC 2021 initial fluid?","30 mL/kg crystalloid within 3 h (weak)."],
 ["icu","First-line vasopressor in sepsis?","Noradrenaline."],
 ["icu","When to add vasopressin?","Noradrenaline 0.25–0.5 µg/kg/min."],
 ["icu","Steroid in septic shock?","Hydrocortisone 200 mg/day."],
 ["icu","Sepsis Six?","O2, cultures, antibiotics, fluids, lactate, urine output."],
 ["icu","HES in critical illness?","Avoid (AKI, mortality)."],
 ["icu","ICU-acquired weakness types?","Critical illness polyneuropathy and myopathy."],
 ["icu","MRC sum score for ICUAW?","< 48."],
 ["icu","KDIGO stage 3?","Creatinine ×3, ≥ 354 µmol/L, RRT, or UO < 0.3 for 24 h."],
 ["icu","RRT indications?","Acidosis, electrolytes, intoxication, overload, uraemia."],
 ["icu","Convection vs diffusion?","Convection: solvent drag (CVVH); diffusion: gradient (CVVHD)."],
 ["icu","CRRT dose?","20–25 mL/kg/h delivered."],
 ["icu","Early RRT benefit?","No (STARRT-AKI)."],
 ["icu","Citrate accumulation sign?","Total/ionised Ca ratio > 2.5, acidosis."],
 ["icu","Filtration fraction limit?","< 20–25%."],
 ["icu","ICU glucose target?","6–10 mmol/L (NICE-SUGAR)."],
 ["icu","Refeeding syndrome key electrolyte?","Phosphate."],
 ["icu","ICU protein target?","1.2–2 g/kg/day."],
 ["icu","Restrictive transfusion threshold?","Hb 70 g/L."],
 ["icu","DCD observation period?","5 min of asystole."],
 ["icu","Donor first-line vasopressor?","Vasopressin."],
 ["icu","DI incidence after brainstem death?","~70%."],
 ["icu","Steroid for DBD donors (UK)?","Methylprednisolone 15 mg/kg."],
 ["resp","Berlin severe ARDS P/F?","< 13.3 kPa (< 100 mmHg)."],
 ["resp","Berlin PEEP requirement?","≥ 5 cmH2O."],
 ["resp","2023 global definition additions?","HFNO ≥ 30 L/min, SpO2/FiO2 ≤ 315, ultrasound."],
 ["resp","ARDSNet VT?","6 mL/kg predicted body weight."],
 ["resp","Plateau pressure limit?","< 30 cmH2O."],
 ["resp","Driving pressure target?","< 15 cmH2O."],
 ["resp","Prone positioning criteria and duration?","P/F < 150 mmHg; ≥ 16 h/day (PROSEVA)."],
 ["resp","ECMO trials in ARDS?","CESAR, EOLIA."],
 ["resp","HFOV in ARDS?","Not recommended (OSCILLATE, OSCAR)."],
 ["resp","RSBI weaning threshold?","< 105."],
 ["resp","VAP bundle?","Head-up, sedation hold, subglottic suction, cuff pressure, oral care."],
 ["resp","NIV criteria in COPD?","pH < 7.35, PaCO2 > 6.5 kPa despite treatment."],
 ["resp","BTS O2 target general?","SpO2 94–98%."],
 ["resp","BTS O2 target hypercapnic risk?","88–92%."],
 ["resp","Lorrain Smith effect?","Pulmonary O2 toxicity."],
 ["resp","Paul Bert effect?","CNS O2 toxicity (hyperbaric)."],
 ["resp","Drug causing O2-related lung fibrosis?","Bleomycin."],
 ["resp","ETT tip position on CXR?","3–5 cm above carina."],
 ["resp","Right middle lobe collapse sign?","Loss of right heart border."],
 ["resp","Left lower lobe collapse sign?","Sail sign behind heart."],
 ["resp","Pneumothorax on supine CXR?","Deep sulcus sign."],
 ["resp","Lung ultrasound sign confirming pneumothorax?","Lung point."],
 ["tox","Rule of nines: each leg?","18%."],
 ["tox","Palm area?","~1% TBSA."],
 ["tox","Parkland formula?","4 mL/kg/%TBSA in 24 h; half in first 8 h."],
 ["tox","Burns urine output target adult?","0.5 mL/kg/h (1 mL/kg/h child)."],
 ["tox","Fluid creep complication?","Abdominal compartment syndrome."],
 ["tox","Suxamethonium in burns?","Safe < 24 h; avoid from 24–48 h until healed."],
 ["tox","Signs of inhalational injury?","Enclosed space, facial burns, soot, hoarseness, stridor."],
 ["tox","CO affinity for Hb?","~240× O2."],
 ["tox","COHb t½ on 100% O2?","60–90 min."],
 ["tox","Cyanide antidote?","Hydroxocobalamin 5 g IV."],
 ["tox","Lactate suggesting cyanide in fire victims?","> 8 mmol/L."],
 ["tox","Activated charcoal window?","Within 1 h."],
 ["tox","Toxins not adsorbed by charcoal?","Alcohols, metals (iron, lithium), acids/alkalis."],
 ["tox","TCA ECG sign?","QRS > 100 ms, R in aVR."],
 ["tox","TCA treatment?","Sodium bicarbonate to pH 7.45–7.55."],
 ["tox","Methanol toxic metabolite?","Formic acid."],
 ["tox","Ethylene glycol toxic products?","Glycolic and oxalic acid."],
 ["tox","Toxic alcohol antidote?","Fomepizole (or ethanol)."],
 ["tox","Osmolar gap normal?","< 10."],
 ["tox","Salicylate acid–base pattern?","Respiratory alkalosis then metabolic acidosis."],
 ["tox","High-dose insulin for CCB overdose?","1 unit/kg/h with glucose."],
 ["tox","Organophosphate treatment?","Atropine, pralidoxime, benzodiazepines."],
 ["tox","Hypothermia ALS change below 30 °C?","Withhold adrenaline; max 3 shocks."],
 ["tox","Hypothermic arrest best rewarming?","ECMO/CPB."],
 ["tox","Heat stroke definition?","Core > 40 °C with CNS dysfunction."],
 ["tox","Lightning strike arrest rhythm?","Asystole/respiratory arrest (prolonged CPR)."],
 ["tr","<C>ABCDE C?","Catastrophic haemorrhage."],
 ["tr","Permissive hypotension target?","SBP 80–90 (not TBI)."],
 ["tr","TXA in trauma?","1 g within 3 h then 1 g over 8 h."],
 ["tr","Lethal diamond?","Hypothermia, acidosis, coagulopathy, hypocalcaemia."],
 ["tr","Major trauma ISS?","> 15."],
 ["tr","ATLS class III blood loss?","30–40%."],
 ["tr","ATLS class II HR?","100–120."],
 ["tr","Fibrinogen target in bleeding?","> 1.5 g/L (> 2 obstetric)."],
 ["tr","Ionised calcium target?","> 1.1 mmol/L."],
 ["tr","Commonest cause of transfusion death (SHOT)?","TACO."],
 ["tr","TRALI timing?","Within 6 h."],
 ["tr","UK-REBOA result?","No benefit (possible harm)."],
 ["tr","Neurogenic shock features?","Hypotension with bradycardia."],
 ["cr","NAP6 commonest culprit?","Antibiotics (teicoplanin highest rate)."],
 ["cr","Commonest presenting feature of perioperative anaphylaxis?","Hypotension."],
 ["cr","IV adrenaline dose for anaphylaxis under anaesthesia?","50 µg boluses."],
 ["cr","IM adrenaline dose adult?","500 µg."],
 ["cr","Tryptase sampling times?","ASAP, 1–2 h (≤ 4 h), ≥ 24 h."],
 ["cr","Glucagon in anaphylaxis?","Refractory, β-blocked patients."],
 ["cr","NAP7 incidence?","~3 per 10 000."],
 ["cr","Adrenaline in shockable arrest?","1 mg after 3rd shock, then every 3–5 min."],
 ["cr","Amiodarone in arrest?","300 mg after 3rd shock, 150 mg after 5th."],
 ["cr","4 Hs?","Hypoxia, hypovolaemia, hypo/hyperkalaemia/metabolic, hypo/hyperthermia."],
 ["cr","4 Ts?","Thrombosis, tension pneumothorax, tamponade, toxins."],
 ["cr","Post-arrest temperature target?","Prevent fever (≤ 37.7 °C) for ≥ 72 h."],
 ["cr","DAS Plan D technique?","Scalpel–bougie–tube cricothyroidotomy."],
 ["cr","Max intubation attempts (DAS)?","3 (+1 by experienced)."],
 ["cr","Max SGA attempts?","3."],
 ["cr","Commonest cause of airway death under anaesthesia (NAP4)?","Aspiration."],
 ["cr","Bailey manoeuvre?","Exchange ETT for SGA before extubation."],
];

const FCF={all:"All",icu:"Sepsis & organ support",resp:"ARDS & ventilation",tox:"Poisoning & burns",tr:"Trauma & transfusion",cr:"Crises & resuscitation"};

const VIVA=[
 {st:"SOE 4 · Critical care",q:"Day 3 after colon resection: febrile, hypotensive (90/50), tachycardic, oliguric. Manage.",a:["ABCDE and immediate resuscitation.","Sepsis-3 definitions and diagnosis of source (anastomotic leak).","First-hour bundle: cultures, antibiotics, lactate, fluids.","Vasopressors, steroids, source control.","Organ support and ICU admission; SSC 2021 and 2026."],fu:"What MAP would you target and why?"},
 {st:"SOE 4 · Critical care",q:"Define ARDS and describe your ventilation strategy.",a:["Berlin and 2023 global definitions.","Causes and pathophysiology.","Lung-protective ventilation with numbers.","PEEP, prone, NMB, fluids.","ECMO criteria and evidence."],fu:"What is driving pressure and why does it matter?"},
 {st:"SOE 4 · Critical care",q:"Sepsis with AKI: when do you start RRT and which modality?",a:["KDIGO staging.","Indications vs timing evidence.","Principles: diffusion, convection.","Modalities and choice.","Dose, anticoagulation, complications."],fu:"Why might citrate accumulate?"},
 {st:"SOE 4 · Critical care",q:"A chemical factory worker with facial burns and soot, GCS 15. Manage.",a:["Airway assessment and early intubation decision.","TBSA and depth assessment.","CO and cyanide poisoning: diagnosis and treatment.","Fluid resuscitation (Parkland and titration).","Other management and referral."],fu:"Why might SpO2 read 99% in this patient?"},
 {st:"SOE 4 · Critical care",q:"A 23-year-old is comatose with blurred vision. Suspected methanol poisoning.",a:["Resuscitation and general toxicology approach.","Investigations: ABG, anion gap, osmolar gap.","Pathophysiology (formic acid).","Fomepizole/ethanol, dialysis, folinic acid.","Supportive care."],fu:"Calculate the osmolar gap from these values."},
 {st:"SOE 4 · Critical care",q:"Tricyclic antidepressant overdose: features and management.",a:["Mechanisms (Na⁺ block, anticholinergic, α-block).","ECG features.","Sodium bicarbonate and ventilation.","Seizures and arrhythmias.","Drugs to avoid."],fu:"How does bicarbonate work?"},
 {st:"SOE 4 · Emergency medicine",q:"A 28-year-old after an RTA: HR 130, BP 70/40, GCS 4, absent femoral pulses. Manage.",a:["<C>ABCDE with life-saving interventions.","Damage control resuscitation.","TBI vs haemorrhage BP targets conflict.","Massive transfusion, TXA, calcium.","Imaging, surgery/IR, ICU."],fu:"What does an absent femoral pulse suggest?"},
 {st:"SOE 3 · Critical incident",q:"Suspected anaphylaxis after induction.",a:["Recognition (NAP6).","Immediate management with doses.","Refractory options.","Tryptase timing.","Follow-up and reporting."],fu:"Which drugs are the commonest culprits in the UK?"},
 {st:"SOE 3 · Critical incident",q:"Perioperative cardiac arrest: what did NAP7 show and how do you manage it?",a:["Incidence and causes.","ALS sequence.","Perioperative adaptations.","Post-resuscitation care.","Debrief and staff support."],fu:"Why is bradycardia emphasised in NAP7?"},
 {st:"SOE 3 · Critical incident",q:"Unanticipated difficult intubation progressing to CICO.",a:["Plan A optimisation and limits.","Plan B SGA and decision point.","Plan C facemask and waking.","Plan D scalpel cricothyroidotomy.","Post-event care and documentation."],fu:"Why scalpel–bougie–tube rather than needle cricothyroidotomy?"},
 {st:"SOE 4 · Critical care",q:"Oxygen toxicity: what is a safe FiO2?",a:["Targets and evidence.","Pulmonary and CNS toxicity mechanisms.","Absorption atelectasis.","COPD hypercapnia.","Special groups and drugs."],fu:"What is the Lorrain Smith effect?"},
 {st:"SOE 4 · Critical care",q:"Organ donation: pathways, physiology and donor management, including steroids.",a:["DBD vs DCD.","Consent framework.","Physiology after brainstem death.","Donor optimisation targets.","Role of steroids and vasopressin."],fu:"Why is vasopressin first-line?"},
];

const QUIZ=[
 ["Sepsis",[["Septic shock requires vasopressors and lactate > 2",1,""],["qSOFA is recommended as a stand-alone screening tool",0,"SSC advises against."],["Noradrenaline is first-line",1,""],["HES is recommended",0,"Avoid."],["Hydrocortisone 200 mg/day for ongoing vasopressors",1,""]]],
 ["ARDS",[["Berlin requires PEEP ≥ 5",1,""],["Severe ARDS P/F < 100 mmHg",1,""],["VT 10 mL/kg is protective",0,"6 mL/kg PBW."],["Prone positioning reduces mortality in severe ARDS",1,""],["HFOV improves outcome",0,""]]],
 ["Ventilation",[["RSBI < 105 predicts successful weaning",1,""],["NIV is first-line for de novo hypoxaemic failure in all",0,"Caution; may delay intubation."],["Cuff pressure 20–30 cmH2O",1,""],["Head-up positioning reduces VAP",1,""],["Early tracheostomy reduces mortality",0,"TracMan: no."]]],
 ["Oxygen",[["BTS target 94–98% for most",1,""],["CNS toxicity occurs at normal pressure",0,"Hyperbaric."],["Bleomycin increases O2 lung toxicity",1,""],["High FiO2 causes absorption atelectasis",1,""],["Loss of hypoxic drive is the main cause of hypercapnia in COPD on O2",0,"Mainly V/Q (loss of HPV) and Haldane."]]],
 ["AKI and RRT",[["Convection removes middle molecules better",1,""],["Early RRT improves survival",0,""],["Citrate accumulation is likely in liver failure",1,""],["Recommended dose 20–25 mL/kg/h",1,""],["Filtration fraction > 30% is ideal",0,"< 20–25%."]]],
 ["ICU care",[["NICE-SUGAR favoured 6–10 mmol/L glucose",1,""],["Refeeding causes hyperphosphataemia",0,"Hypophosphataemia."],["Thiamine before feeding at-risk patients",1,""],["Antipsychotics shorten ICU delirium",0,""],["Restrictive transfusion threshold is 70 g/L",1,""]]],
 ["Trauma",[["TXA within 3 h of injury",1,""],["Permissive hypotension is appropriate in TBI",0,""],["Hypocalcaemia worsens coagulopathy",1,""],["ISS > 15 defines major trauma",1,""],["Class IV haemorrhage is > 40% loss",1,""]]],
 ["Transfusion",[["TACO is a leading cause of transfusion death",1,""],["TRALI occurs within 6 h",1,""],["Stored blood causes hypokalaemia",0,"Hyperkalaemia."],["Citrate toxicity lowers ionised calcium",1,""],["ABO incompatibility is usually due to clerical error",1,""]]],
 ["Burns",[["Parkland is 4 mL/kg/%TBSA",1,""],["Suxamethonium is unsafe in the first 24 h",0,"Safe early; avoid later."],["Cut ETTs are preferred",0,"Uncut (oedema)."],["Hydroxocobalamin treats cyanide",1,""],["Pulse oximetry over-reads in CO poisoning",1,""]]],
 ["Poisoning",[["Charcoal adsorbs lithium",0,""],["Bicarbonate treats TCA cardiotoxicity",1,""],["Fomepizole blocks alcohol dehydrogenase",1,""],["Ethylene glycol causes oxalate crystals",1,""],["Salicylate poisoning causes respiratory acidosis first",0,"Alkalosis first."]]],
 ["Environmental",[["Adrenaline is withheld below 30 °C",1,""],["ECMO rewarming suits hypothermic arrest",1,""],["Lightning causes VF predominantly",0,"Asystole/respiratory arrest."],["Heat stroke involves CNS dysfunction",1,""],["Drowning arrest begins with 5 rescue breaths",1,""]]],
 ["Anaphylaxis",[["Hypotension is the commonest feature (NAP6)",1,""],["Chlorphenamine is first-line",0,"Adrenaline."],["Tryptase sample 2 at 1–2 h",1,""],["Teicoplanin has a high anaphylaxis rate",1,""],["Rash is always present",0,""]]],
 ["Cardiac arrest",[["Adrenaline after the third shock in VF",1,""],["Amiodarone 150 mg after the third shock",0,"300 mg."],["TTM2 favoured 33 °C",0,"No benefit vs fever prevention."],["Haemorrhage is a common perioperative arrest cause",1,""],["Capnography guides CPR quality",1,""]]],
 ["Airway crises",[["DAS Plan D is scalpel–bougie–tube",1,""],["Aspiration was the commonest airway death cause in NAP4",1,""],["Unlimited intubation attempts are acceptable",0,""],["Capnography absence contributed to ICU airway deaths",1,""],["Routine steroids are given after aspiration",0,""]]],
];

const CRISIS=[
 ["Septic shock: first hour","spo2",["ABCDE; O2 to SpO2 94–98%; IV access ×2; blood cultures, lactate, FBC, U&E, LFT, clotting, glucose.","Broad-spectrum antibiotics within 1 hour (local guidance; consider MRSA/resistant organisms).","Fluids: crystalloid boluses (up to 30 mL/kg if hypoperfused), reassess after each; balanced solutions.","Noradrenaline for MAP ≥ 65 (peripheral start acceptable); arterial line; add vasopressin; hydrocortisone if escalating.","Source control (imaging, surgery/drainage within 6–12 h); ICU referral; monitor urine output and lactate clearance."],"Vasodilation, capillary leak and myocardial depression cause distributive shock."],
 ["Refractory hypoxaemia in ARDS","etco2",["Check: tube position and patency, circuit, FiO2 1.0, pneumothorax, secretions (suction/bronchoscopy), bronchospasm.","Optimise PEEP (recruitment cautiously), keep plateau < 30, sedate and paralyse if dyssynchronous.","Prone position for ≥ 16 h (P/F < 150 mmHg).","Conservative fluids if haemodynamics allow; consider inhaled vasodilators as rescue.","Early referral for VV-ECMO (e.g. P/F < 80 mmHg for > 6 h, or pH < 7.25 with PaCO2 > 8 kPa despite optimisation)."],"Shunt through flooded, collapsed alveoli; low compliance limits safe ventilation."],
 ["Major traumatic haemorrhage","abp",["<C>: tourniquets, pressure, pelvic binder; activate MHP; IV/IO access.","Permissive hypotension (SBP 80–90; ≥ 110 in TBI); blood products 1:1:1 or whole blood; avoid crystalloid.","TXA 1 g (within 3 h) then 1 g over 8 h; calcium; warming; viscoelastic-guided fibrinogen.","Rapid transfer to theatre or IR; damage control surgery.","Reassess: lactate, base deficit, ionised Ca²⁺, temperature, coagulation; ICU."],"Haemorrhage plus trauma-induced coagulopathy, worsened by dilution, cold and acidosis."],
 ["Tension pneumothorax","abp",["Recognise: hypoxia, hypotension, rising airway pressure, absent breath sounds, tracheal deviation (late), distended neck veins.","Ventilated patient: immediate finger thoracostomy (4th/5th ICS anterior to mid-axillary line).","Spontaneously breathing: needle decompression (2nd ICS MCL or 4th/5th ICS MAL with long cannula), then chest drain.","Insert chest drain; CXR or ultrasound confirmation.","Look for cause (barotrauma, central line, trauma)."],"Valve effect traps air, shifts mediastinum and obstructs venous return."],
 ["Inhalational burn with CO/cyanide","nibp",["100% O2 via non-rebreathe or intubate early if airway compromised (uncut tube, experienced operator).","Co-oximetry COHb; lactate; ABG; ECG.","Suspect cyanide if lactate > 8, coma, shock: hydroxocobalamin 5 g IV over 15 min (repeat).","Fluids per burn % (titrate to urine output); escharotomy if needed.","Hyperbaric O2 discussion for severe CO; burns centre referral."],"CO and cyanide block O2 carriage and utilisation; airway oedema progresses."],
 ["Toxic alcohol ingestion","nibp",["ABCDE; ABG: high anion gap metabolic acidosis; measure osmolality (osmolar gap).","Fomepizole (or IV ethanol) immediately if suspected.","Haemodialysis for severe acidosis, visual signs, AKI or high levels.","Methanol: folinic acid; ethylene glycol: thiamine and pyridoxine; correct calcium cautiously.","Bicarbonate for severe acidosis; NPIS/TOXBASE; eye review."],"Alcohol dehydrogenase converts parent alcohols to toxic acids."],
 ["Accidental hypothermic cardiac arrest","ecg",["Confirm arrest (check pulse up to 1 min); start CPR (mechanical device for transport).","Below 30 °C: withhold adrenaline, max 3 shocks; 30–35 °C: double drug intervals.","Avoid rough handling; warm fluids; airway protection.","Transfer to ECMO/CPB centre for rewarming.","Prognosis: K⁺ > 12 mmol/L or asphyxia before cooling suggests non-survivable."],"Hypothermia protects the brain but makes the myocardium refractory."],
 ["ABO-incompatible transfusion","abp",["Stop the transfusion; keep the line (replace giving set); check patient identity and unit.","ABCDE; fluids; treat hypotension; monitor urine output (haemoglobinuria) and DIC.","Send unit and samples to lab (DAT, repeat group, LDH, bilirubin, coagulation, cultures).","Supportive: diuresis, ICU if needed; treat DIC.","Report to SHOT/MHRA; duty of candour."],"Recipient antibodies lyse donor cells: complement activation, DIC, AKI."],
 ["Needlestick / sharps injury","ecg",["Encourage bleeding, wash with soap and water; don't scrub or suck.","Report to occupational health or ED immediately; risk assess source (HIV, HBV, HCV).","HIV post-exposure prophylaxis within 1 hour ideally (up to 72 h) if indicated.","Hepatitis B booster or immunoglobulin depending on vaccination status; HCV follow-up testing.","Document; incident report; follow-up serology at intervals."],"Transmission risk: HBV ~30%, HCV ~2%, HIV ~0.3% after percutaneous exposure."],
];

const SRC="";
const ERR="";
const REFS="";

const DIAG=`<div class="grid2">
 <div class="fig" style="grid-column:1/-1"><h3>Pressure–volume curve and lung-protective ventilation</h3>
  <div class="ctl"><label>PEEP cmH2O <input type="range" id="pv-p" min="0" max="20" step="1" value="10"><output id="pv-p-o"></output></label>
   <label>Tidal volume mL <input type="range" id="pv-v" min="200" max="900" step="10" value="420"><output id="pv-v-o"></output></label>
   <label>Height cm <input type="range" id="pv-h" min="150" max="200" step="1" value="175"><output id="pv-h-o"></output></label></div>
  <div class="svgbox"><svg id="pvc" viewBox="0 0 900 300" role="img" aria-label="PV curve"></svg></div>
  <div class="readout" id="pv-r"></div></div>
 <div class="fig"><h3>Shock classifier</h3>
  <div class="ctl"><label>Cardiac index L/min/m² <input type="range" id="sh-c" min="1" max="6" step="0.1" value="1.8"><output id="sh-c-o"></output></label>
   <label>SVR dyn·s·cm⁻⁵ <input type="range" id="sh-s" min="300" max="2200" step="50" value="1600"><output id="sh-s-o"></output></label>
   <label>CVP mmHg <input type="range" id="sh-v" min="0" max="25" step="1" value="3"><output id="sh-v-o"></output></label></div>
  <div class="svgbox"><svg id="sh" viewBox="0 0 520 300" role="img" aria-label="Shock"></svg></div>
  <div class="readout" id="sh-r"></div></div>
 <div class="fig"><h3>Paracetamol treatment nomogram (UK)</h3>
  <div class="ctl"><label>Hours since ingestion <input type="range" id="pc-t" min="4" max="24" step="0.5" value="8"><output id="pc-t-o"></output></label>
   <label>Paracetamol level mg/L <input type="range" id="pc-l" min="5" max="300" step="5" value="60"><output id="pc-l-o"></output></label></div>
  <div class="svgbox"><svg id="pc" viewBox="0 0 520 300" role="img" aria-label="Paracetamol nomogram"></svg></div>
  <div class="readout" id="pc-r"></div></div>
 <div class="fig"><h3>ATLS haemorrhage classes</h3>
  <div class="ctl"><label>Blood loss % of circulating volume <input type="range" id="hc-p" min="0" max="60" step="1" value="32"><output id="hc-p-o"></output></label></div>
  <div class="svgbox"><svg id="hc" viewBox="0 0 520 140" role="img" aria-label="Haemorrhage classes"></svg></div>
  <div class="readout" id="hc-r"></div></div>
 <div class="fig" style="grid-column:1/-1"><h3>Burns: TBSA and fluid plan</h3>
  <div class="ctl"><div class="seg" id="bn-age"></div><label>Weight kg <input type="range" id="bn-w" min="5" max="120" step="1" value="70"><output id="bn-w-o"></output></label>
   <label>Hours since burn <input type="range" id="bn-t" min="0" max="8" step="0.5" value="2"><output id="bn-t-o"></output></label>
   <label>Formula mL/kg/% <input type="range" id="bn-f" min="2" max="4" step="0.5" value="4"><output id="bn-f-o"></output></label></div>
  <div class="ctl" id="bn-box" style="flex-direction:row;flex-wrap:wrap;gap:6px 18px"></div>
  <div class="svgbox"><svg id="bn" viewBox="0 0 900 200" role="img" aria-label="Burns fluids"></svg></div>
  <div class="readout" id="bn-r"></div></div>
</div>`;

function initDiagrams(){
 const out=(id,t)=>{const o=$("#"+id+"-o");if(o)o.textContent=t};
 const mk=svg=>(t,a,tx)=>{const e=document.createElementNS(SVGNS,t);for(const k in a)e.setAttribute(k,a[k]);if(tx!=null)e.textContent=tx;svg.append(e);return e};

 /* 1. PV curve */
 const Vmax=1200,Pm=22,K=5;const Vof=p=>Vmax/(1+Math.exp(-(p-Pm)/K));const Pof=v=>Pm-K*Math.log(Vmax/Math.min(Vmax-1,Math.max(1,v))-1);
 function drawPV(){const pe=+$("#pv-p").value,vt=+$("#pv-v").value,h=+$("#pv-h").value;out("pv-p",pe);out("pv-v",vt);out("pv-h",h);
  const pbw=50+0.91*(h-152.4);const v0=Vof(pe),v1=v0+vt,pp=Pof(v1),dp=pp-pe;const lip=Pm-2*K,uip=Pm+2*K;
  const P=plot($("#pvc"),{w:900,h:300,x0:0,x1:45,y0:0,y1:Vmax,xt:[0,5,10,15,20,25,30,35,40,45],yt:[0,300,600,900,1200],xl:"Airway pressure (cmH2O)",yl:"Volume above FRC (mL)"});
  P.add("rect",{x:P.X(0),y:P.Y(Vmax),width:P.X(lip)-P.X(0),height:P.Y(0)-P.Y(Vmax),fill:"var(--warn)","fill-opacity":0.08});P.add("rect",{x:P.X(uip),y:P.Y(Vmax),width:P.X(45)-P.X(uip),height:P.Y(0)-P.Y(Vmax),fill:"var(--bad)","fill-opacity":0.08});
  P.text(1,1130,"Atelectrauma zone (below LIP)",{fill:"var(--warn)","font-size":"11"});P.text(uip+1,1130,"Overdistension (above UIP)",{fill:"var(--bad)","font-size":"11"});
  P.line(range(0,45,200).map(p=>[p,Vof(p)]),{stroke:"var(--etco2)"});
  P.line(range(pe,Math.min(45,pp),80).map(p=>[p,Vof(p)]),{stroke:"var(--abp)","stroke-width":6,"stroke-opacity":0.6});
  P.dot(pe,v0,"var(--ink)","PEEP");P.dot(Math.min(45,pp),Math.min(Vmax,v1),"var(--ink)","Pplat "+(pp>45?">45":pp.toFixed(0)));
  P.add("line",{x1:P.X(30),x2:P.X(30),y1:P.Y(0),y2:P.Y(Vmax),stroke:"var(--bad)","stroke-dasharray":"4 4"});P.text(30.3,60,"30 cmH2O",{fill:"var(--bad)","font-size":"10"});
  const warn=[];if(pe<lip)warn.push("end-expiration below the lower inflection point: cyclic collapse (atelectrauma)");if(pp>uip||pp>=30)warn.push("end-inspiration in the overdistension zone");if(dp>15)warn.push("driving pressure > 15");
  $("#pv-r").innerHTML=`PBW ${pbw.toFixed(0)} kg: VT ${vt} mL = <b>${(vt/pbw).toFixed(1)} mL/kg</b> (target 6). Plateau ≈ <b>${pp>45?"> 45":pp.toFixed(0)} cmH2O</b>, driving pressure <b>${dp>40?"> 40":dp.toFixed(0)}</b>, compliance ≈ ${(vt/Math.max(1,dp)).toFixed(0)} mL/cmH2O. ${warn.length?"<b>Problems</b>: "+warn.join("; ")+".":"Tidal breath sits on the steep, compliant part of the curve: good."} Schematic ARDS lung (LIP ~${lip}, UIP ~${uip} cmH2O).`}
 ["#pv-p","#pv-v","#pv-h"].forEach(x=>$(x).oninput=drawPV);drawPV();

 /* 2. Shock */
 function drawSH(){const ci=+$("#sh-c").value,svr=+$("#sh-s").value,cvp=+$("#sh-v").value;out("sh-c",ci.toFixed(1));out("sh-s",svr);out("sh-v",cvp);
  const P=plot($("#sh"),{w:520,h:300,x0:1,x1:6,y0:300,y1:2200,xt:[1,2,3,4,5,6],yt:[400,800,1200,1600,2000],xl:"Cardiac index (L/min/m²)",yl:"SVR"});
  P.add("line",{x1:P.X(2.2),x2:P.X(2.2),y1:P.Y(300),y2:P.Y(2200),stroke:"var(--muted)","stroke-dasharray":"4 4"});P.add("line",{x1:P.X(1),x2:P.X(6),y1:P.Y(800),y2:P.Y(800),stroke:"var(--muted)","stroke-dasharray":"4 4"});
  P.text(1.05,2100,"Low output, vasoconstricted",{"font-size":"10"});P.text(3.6,600,"Distributive (high CI, low SVR)",{"font-size":"10"});P.text(3.6,2100,"Normal/high CI",{"font-size":"10"});P.text(1.05,500,"Mixed / late sepsis",{"font-size":"10"});
  P.dot(ci,svr,cvp>12?"var(--bad)":cvp<6?"var(--spo2)":"var(--warn)","CVP "+cvp);
  let t;if(ci<2.2&&svr>1200&&cvp<8)t="<b>Hypovolaemic</b>: low CI, high SVR, low filling pressures: fluid/blood, find and stop the losses.";else if(ci<2.2&&svr>1200&&cvp>=12)t="<b>Cardiogenic or obstructive</b>: low CI, high SVR, high CVP. Echo now: poor LV/RV function (cardiogenic: inotropes, revascularisation, mechanical support) vs tamponade, tension pneumothorax or massive PE (relieve obstruction).";else if(svr<800&&ci>=2.5)t="<b>Distributive</b> (sepsis, anaphylaxis, neurogenic, adrenal): vasopressors after fluid responsiveness assessment; treat cause.";else if(svr<800&&ci<2.2)t="<b>Mixed</b>: vasodilated with poor output (septic cardiomyopathy, late shock): noradrenaline plus inotrope (dobutamine/adrenaline); echo.";else t="Intermediate or compensated profile: integrate lactate, capillary refill, urine output and echo.";
  $("#sh-r").innerHTML=`CI ${ci.toFixed(1)}, SVR ${svr}, CVP ${cvp}. ${t}`}
 ["#sh-c","#sh-s","#sh-v"].forEach(x=>$(x).oninput=drawSH);drawSH();

 /* 3. Paracetamol nomogram */
 function drawPC(){const t=+$("#pc-t").value,l=+$("#pc-l").value;out("pc-t",t);out("pc-l",l);const line=h=>100*Math.pow(2,-(h-4)/4);
  const P=plot($("#pc"),{w:520,h:300,x0:4,x1:24,y0:0,y1:200,xt:[4,8,12,16,20,24],yt:[0,50,100,150,200],xl:"Hours after ingestion",yl:"Plasma paracetamol (mg/L)"});
  P.add("path",{d:range(4,24,80).map((h,i)=>(i?"L":"M")+P.X(h)+" "+P.Y(line(h))).join(" ")+` L${P.X(24)} ${P.Y(200)} L${P.X(4)} ${P.Y(200)} Z`,fill:"var(--bad)","fill-opacity":0.08});
  P.line(range(4,24,80).map(h=>[h,line(h)]),{stroke:"var(--bad)"});P.text(13,line(13)+12,"treatment line",{fill:"var(--bad)","font-size":"11"});
  P.dot(t,Math.min(200,l),"var(--ink)","");const above=l>=line(t);
  $("#pc-r").innerHTML=`At ${t} h the treatment line is <b>${line(t).toFixed(0)} mg/L</b>; level ${l} mg/L is <b>${above?"on/above the line: give acetylcysteine":"below the line"}</b>. ${t>=15?"Beyond ~15 h the nomogram is unreliable: treat if any doubt and check INR, ALT, creatinine.":""} Staggered or uncertain-time ingestion, or > 150 mg/kg presenting late: treat regardless (MHRA 2012 single line at 100 mg/L at 4 h).`}
 ["#pc-t","#pc-l"].forEach(x=>$(x).oninput=drawPC);drawPC();

 /* 4. Burns */
 let bnA="adult";
 function buildBN(){const box=$("#bn-box");box.innerHTML="";BURN[bnA].forEach(([n,p],i)=>{box.append(el("label",{style:"display:flex;flex-direction:row;align-items:center;gap:6px"},`<input type="checkbox" id="bn-${i}" ${[1,3].includes(i)?"checked":""}> ${n} (${p}%)`));$("#bn-"+i).onchange=drawBN});drawBN()}
 function drawBN(){const w=+$("#bn-w").value,t=+$("#bn-t").value,f=+$("#bn-f").value;out("bn-w",w);out("bn-t",t);out("bn-f",f);
  const tb=BURN[bnA].reduce((s,[n,p],i)=>s+($("#bn-"+i)&&$("#bn-"+i).checked?p:0),0);const tot=f*w*tb,first=tot/2,rem8=Math.max(0,8-t);
  const svg=$("#bn");svg.innerHTML="";const add=mk(svg);const X=h=>60+h/24*800;
  add("rect",{x:X(0),y:60,width:X(8)-X(0),height:50,fill:"var(--abp)","fill-opacity":0.6});add("rect",{x:X(8),y:60,width:X(24)-X(8),height:50,fill:"var(--spo2)","fill-opacity":0.5});
  add("text",{x:X(4),y:90,"text-anchor":"middle",class:"lbl"},fmt(first,0)+" mL (0–8 h)");add("text",{x:X(16),y:90,"text-anchor":"middle",class:"lbl"},fmt(first,0)+" mL (8–24 h)");
  add("line",{x1:X(t),x2:X(t),y1:40,y2:130,stroke:"var(--ink)","stroke-width":2});add("text",{x:X(t)+4,y:36,class:"lbl","font-size":"11"},"now ("+t+" h)");
  [0,8,16,24].forEach(hh=>add("text",{x:X(hh),y:150,"text-anchor":"middle",class:"lbl","font-size":"11"},hh+" h"));
  const rate1=rem8>0?first/rem8:0;const need=bnA==="child"?tb>10:tb>15;
  $("#bn-r").innerHTML=`TBSA <b>${tb}%</b>${need?"":" (below formal resuscitation threshold: oral/maintenance fluids may suffice)"}. ${f} mL/kg/% × ${w} kg × ${tb}% = <b>${fmt(tot,0)} mL</b> in 24 h from the time of burn. Remaining first-half volume over the next ${rem8} h: <b>${rem8>0?fmt(rate1,0)+" mL/h":"(first 8 h elapsed)"}</b> (minus any fluid already given), then ${fmt(first/16,0)} mL/h. Titrate to urine output ${bnA==="child"?"1 mL/kg/h (add glucose-containing maintenance)":"0.5 mL/kg/h"}; avoid fluid creep.`}
 seg($("#bn-age"),[["adult","Adult (rule of nines)"],["child","Child (modified)"]],k=>{bnA=k;buildBN()},"adult");["#bn-w","#bn-t","#bn-f"].forEach(x=>$(x).oninput=drawBN);

 /* 5. ATLS */
 function drawHC(){const p=+$("#hc-p").value;out("hc-p",p);const svg=$("#hc");svg.innerHTML="";const add=mk(svg);const X=v=>30+v/60*460;
  ATLS.forEach((a,i)=>{const x0=X(a[0]),x1=X(Math.min(60,a[1]));add("rect",{x:x0,y:40,width:x1-x0,height:40,fill:["var(--good)","var(--warn)","var(--abp)","var(--bad)"][i],"fill-opacity":p>=a[0]?0.7:0.2});add("text",{x:(x0+x1)/2,y:66,"text-anchor":"middle",class:"lbl","font-size":"11"},a[2])});
  add("line",{x1:X(p),x2:X(p),y1:30,y2:90,stroke:"var(--ink)","stroke-width":3});[0,15,30,40,60].forEach(v=>add("text",{x:X(v),y:110,"text-anchor":"middle",class:"lbl","font-size":"11"},v+"%"));
  const a=ATLS.find(r=>p>=r[0]&&p<r[1])||ATLS[3];
  $("#hc-r").innerHTML=`<b>Class ${a[2]}</b> (${a[3]} mL in a 70 kg adult): HR ${a[4]}, SBP ${a[5]}, pulse pressure ${a[6]}, RR ${a[7]}, urine ${a[8]} mL/h, ${a[9]}. ${a[10]}. Caveats: β-blockers, pacemakers, athletes, elderly, pregnancy and children compensate differently; base deficit and lactate add information (ATLS 10th ed.).`}
 $("#hc-p").oninput=drawHC;drawHC();
}

ATLAS.register({id:"15",name:"Intensive care & crises",
  lede:"Recognition and scoring, sepsis, shock, ARDS and ventilation, oxygen, AKI and RRT, ICU care, trauma and massive transfusion, burns, poisoning, environmental emergencies, anaphylaxis, perioperative cardiac arrest, airway crises, organ donation and chest imaging.",
  barsNote:"",
  bars:BARS,fam:FAM,slides:SLIDES,calcs:CALCS,tables:TABLES,cards:CARDS,fcf:FCF,viva:VIVA,quiz:QUIZ,crisis:CRISIS,
  sources:SRC,errata:ERR,refs:REFS,diagHTML:DIAG,initDiagrams,
  diagLede:"Five ICU tools: a pressure–volume curve for lung-protective ventilation, a shock classifier, the UK paracetamol nomogram, a burns TBSA and fluid planner and ATLS haemorrhage classes."});
})();
