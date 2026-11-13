/* Stage 14 · Specialty anaesthesia */
(function(){
const {plot,range,el,SVGNS,fmt,$,$$,seg,contentO2,pFromContent}=ATLAS.h;

const BARS=[];

const FAM={ct:["abp","Cardiac, thoracic & vascular"],neu:["nibp","Neuro & ophthalmic"],obs:["spo2","Obstetrics"],paed:["etco2","Paediatrics & ENT"],gen:["ecg","Orthopaedic, general & day case"]};

const SLIDES=[
{f:"ct",t:"Thoracic: assessment for lung resection",b:`<ul class="clean"><li><b>Three-legged assessment</b> (BTS/ERS-ESTS): <b>respiratory mechanics</b> (FEV1), <b>parenchymal function</b> (DLCO), <b>cardiopulmonary reserve</b> (exercise capacity), plus cardiac risk (ThRCRI) and frailty.</li>
<li><b>Predicted postoperative (ppo) values</b>: ppoFEV1 = preop FEV1 × (1 − segments resected / 19 functional segments) (or perfusion scintigraphy for pneumonectomy); same for ppoDLCO. ppo &gt; 60% predicted: low risk; 30–60%: exercise testing (stair climb &gt; 22 m or shuttle walk &gt; 400 m reassuring); &lt; 30%: high risk, CPET. <b>VO2 peak</b> &lt; 10 mL/kg/min (or &lt; 35% predicted): very high risk (consider limited resection or non-surgical treatment); &gt; 20 low risk.</li>
<li><b>Other</b>: ABG (hypercapnia), echo if pulmonary hypertension suspected, smoking cessation, prehabilitation, optimise COPD, staging of cancer (mediastinoscopy, EBUS). Pneumonectomy risks: right &gt; left, post-pneumonectomy pulmonary oedema (fluid restriction, avoid high pressures), AF, bronchopleural fistula, cardiac herniation.</li>
<li><b>Analgesia</b>: thoracic epidural or paravertebral (PROSPECT/ESTS favour paravertebral or ESP for VATS: similar analgesia with fewer side effects), intercostal, serratus anterior; multimodal; early mobilisation and physiotherapy.</li></ul>`,
p:"Typical exam questions: 'COPD patient with lung SCC for pneumonectomy: assessment and investigations, DLT, analgesia', '60-year-old with COPD, AF and lung cancer for pneumonectomy'. Use the ppoFEV1 calculator.",
v:"Three-legged assessment with numbers, ppo calculation, pathway by risk category, cardiac assessment, analgesia and postoperative complications."},
{f:"ct",t:"One-lung ventilation",b:`<ul class="clean"><li><b>Indications</b>: absolute: lung isolation to prevent contamination (abscess, massive haemorrhage), control of ventilation distribution (bronchopleural fistula, giant bullae, unilateral lung lavage); relative: surgical exposure (VATS, pneumonectomy, oesophagectomy, thoracic aortic and spinal surgery).</li>
<li><b>Devices</b>: <b>left double-lumen tube</b> preferred (right upper lobe bronchus arises 1.5–2.5 cm from the carina: right DLT has a side slot); sizes women 35–37 Fr, men 39–41 Fr; confirm with fibreoptic bronchoscopy (blue bronchial cuff just below the carina in the left main bronchus). <b>Bronchial blockers</b> (Arndt, Cohen, EZ-blocker, Uniblocker) for difficult airways, nasal or existing tubes, children; slower collapse, dislodgement. Univent tube.</li>
<li><b>Physiology</b> (lateral decubitus): awake, the dependent lung gets more ventilation and perfusion; under GA with an open chest, the non-dependent lung is better ventilated but the dependent lung better perfused (V/Q mismatch). During OLV all blood through the non-ventilated lung is shunt (~40% of CO), reduced to ~20–25% by <b>hypoxic pulmonary vasoconstriction</b> (onset minutes, max at 2 h; inhibited by volatiles &gt; 1 MAC, vasodilators, hypocapnia, alkalosis, high PVR states) and gravity.</li>
<li><b>Ventilation</b>: VT 4–6 mL/kg (predicted weight), PEEP 5 cmH2O, plateau &lt; 25 cmH2O, FiO2 to SpO2 92–96%, permissive hypercapnia; lung-protective to reduce acute lung injury.</li>
<li><b>Hypoxaemia during OLV</b>: FiO2 1.0; check tube position with the bronchoscope; suction; recruit the ventilated lung and optimise PEEP; check haemodynamics/Hb; <b>CPAP 5–10 cmH2O of O2 to the non-ventilated lung</b> (or O2 insufflation); intermittent two-lung ventilation; ask the surgeon to clamp the pulmonary artery (pneumonectomy); reduce volatile or switch to TIVA.</li></ul>`,
p:"Use the OLV shunt model: see how HPV, CPAP to the deflated lung and cardiac output change PaO2.",
v:"Indications, devices and placement, physiology (lateral position, HPV, shunt), ventilation strategy, management of hypoxaemia step by step."},
{f:"ct",t:"Cardiac surgery, cardiopulmonary bypass and tamponade",b:`<ul class="clean"><li><b>CPB circuit</b>: venous cannula (RA) → reservoir → oxygenator (membrane) and heat exchanger → pump (roller or centrifugal) → arterial filter → aortic cannula; cardiotomy suction, vents, cardioplegia line. Priming 1.5–2 L (haemodilution).</li>
<li><b>Anticoagulation</b>: heparin 300–400 IU/kg, ACT &gt; 480 s before bypass; reversal with protamine (1 mg per 100 IU; reactions: hypotension, pulmonary hypertension, anaphylaxis). HIT: bivalirudin.</li>
<li><b>Myocardial protection</b>: cardioplegia (high K⁺ crystalloid or blood, cold or warm, antegrade/retrograde) arrests the heart in diastole; hypothermia reduces O2 demand. Alpha-stat pH management in adults.</li>
<li><b>Effects of CPB</b>: SIRS, coagulopathy (dilution, platelet dysfunction, fibrinolysis: TXA), haemodilution, AKI, neurological injury (emboli, hypoperfusion), vasoplegia (vasopressin, methylene blue), myocardial stunning.</li>
<li><b>Weaning</b>: rewarming, rhythm (pacing), ventilation, electrolytes (K⁺, Ca²⁺), contractility (TOE, inotropes), volume; IABP or ECMO if needed.</li>
<li><b>Intra-aortic balloon pump</b>: inflates at aortic valve closure (dicrotic notch: diastolic augmentation of coronary perfusion) and deflates just before systole (reduced afterload). Indications: cardiogenic shock, refractory ischaemia, mechanical complications of MI, weaning from CPB. Contraindications: aortic regurgitation, aortic dissection, severe peripheral vascular disease. (IABP-SHOCK II: no mortality benefit in MI with shock.)</li>
<li><b>Cardiac tamponade</b> (after surgery or trauma; Beck's triad: hypotension, raised JVP, muffled heart sounds; pulsus paradoxus &gt; 10 mmHg, equalisation of diastolic pressures, electrical alternans): echo; pericardiocentesis or surgical drainage. Anaesthesia: "<b>fast, full and tight</b>" (keep HR up, preload, SVR); ideally drain under LA; avoid positive-pressure ventilation and vasodilating induction until the surgeon is ready (ketamine or etomidate, spontaneous breathing).</li>
<li><b>Congenital heart disease</b>: left-to-right (ASD, VSD, PDA: pulmonary overcirculation; Eisenmenger), right-to-left (tetralogy of Fallot: tet spells: phenylephrine, volume, β-blockade, knee–chest), single ventricle and Fontan (passive pulmonary flow: maintain preload, low PVR, spontaneous ventilation favourable). Air filters on IV lines; endocarditis prophylaxis per guidance.</li></ul>`,
p:"Use the IABP timing diagram: early or late inflation and deflation each produce characteristic waveform errors.",
v:"CPB components, heparin/protamine, myocardial protection, physiological consequences, weaning, IABP, tamponade and congenital principles."},
{f:"ct",t:"Vascular: carotid endarterectomy and the circle of Willis",b:`<ul class="clean"><li><b>Circle of Willis</b>: two internal carotid arteries (anterior circulation) and the basilar artery (from two vertebral arteries) joined by the anterior communicating artery (between the anterior cerebral arteries) and two posterior communicating arteries (ICA to posterior cerebral). It is a "circle" so that collateral flow can maintain perfusion if one inflow is occluded. Complete in fewer than half of people; hypoplastic communicating vessels make some patients dependent on one carotid.</li>
<li><b>Carotid endarterectomy</b>: for symptomatic stenosis &gt; 50–70% within 2 weeks of TIA or minor stroke. Patients have widespread vascular disease (IHD, hypertension, diabetes, CKD). Continue antiplatelets and statins.</li>
<li><b>Technique</b>: <b>GA vs LA</b> (superficial/intermediate cervical plexus block): GALA trial found no difference in stroke, MI or death. LA gives the gold-standard neurological monitor (awake patient: contralateral hand squeeze, speech) and selective shunting; requires a cooperative patient; conversion to GA under drapes is difficult. GA allows airway control and a still field; cerebral monitoring with stump pressure (&gt; 40–50 mmHg reassuring), NIRS, TCD, EEG or SSEPs.</li>
<li><b>Haemodynamics</b>: maintain BP at or above baseline during cross-clamping (collateral perfusion); bradycardia and hypotension from carotid sinus manipulation (LA to the sinus, atropine); hypertension after surgery (baroreceptor dysfunction) increases haematoma and <b>hyperperfusion syndrome</b> (headache, seizures, haemorrhage: keep SBP &lt; 140–160).</li>
<li><b>Complications</b>: stroke (embolic), neck haematoma (airway compromise: open wound early), cranial nerve injury (hypoglossal, RLN, marginal mandibular), MI, hyperperfusion.</li>
<li><b>Other vascular</b>: lower limb revascularisation (regional/neuraxial with anticoagulation rules; heparin before clamping), amputation (perineural catheters, phantom limb pain), endovascular procedures (sedation, contrast, radiation).</li></ul>`,
p:"Typical exam questions: 'Blood supply to the brain: the circle of Willis: draw, explain why it's a circle, then CEA and how to avoid brain ischaemia (monitoring, shunt)'. Use the circle of Willis diagram.",
v:"Draw the circle, explain collateral flow and variants, CEA indications, GA vs LA with monitoring options and evidence, haemodynamic goals, complications."},
{f:"ct",t:"Vascular: aortic aneurysm repair",b:`<ul class="clean"><li><b>Open AAA repair</b>: arterial line, central access, cell salvage, epidural, warming, large-bore access. <b>Cross-clamping</b>: sudden ↑ afterload (↑ SBP, LV wall stress, ischaemia, LV failure: vasodilators, deepen anaesthesia, β-blockade), ischaemia distal to the clamp (lactate, K⁺, myoglobin); suprarenal or supracoeliac clamps add renal and mesenteric ischaemia.</li>
<li><b>Unclamping</b>: sudden ↓ afterload, reactive hyperaemia, washout of acidic metabolites, K⁺, CO2 and vasoactive mediators: hypotension (pre-load with volume, reduce anaesthetic depth, vasopressors, gradual unclamping, communicate with surgeon), acidosis, arrhythmias.</li>
<li><b>Complications</b>: blood loss, AKI, spinal cord ischaemia (artery of Adamkiewicz: thoracoabdominal repairs use CSF drainage to CSF pressure &lt; 10 mmHg and MAP targets), mesenteric ischaemia, MI, colonic ischaemia, lower limb ischaemia, coagulopathy.</li>
<li><b>EVAR</b>: less physiological insult, local anaesthesia/sedation possible (IMPROVE trial: LA for ruptured EVAR associated with lower mortality), contrast nephropathy, endoleaks, radiation; requires suitable anatomy.</li>
<li><b>Ruptured AAA</b>: "permissive hypotension" (target SBP ~70–90 mmHg or conscious level), minimal fluids until clamp, blood products, cell salvage, prepare and drape awake, induce on the table with the surgeon scrubbed (induction removes sympathetic tone: profound hypotension), aortic occlusion balloon if needed, massive transfusion protocol; EVAR under LA if anatomy allows.</li></ul>`,
p:"Clamp and unclamp physiology is a favourite: describe the haemodynamic, metabolic and organ consequences and how you manage each.",
v:"Preparation, clamp physiology and management, unclamp, organ protection, EVAR vs open, ruptured AAA plan."},
{f:"neu",t:"Neuroanaesthesia: head injury and craniotomy",b:`<ul class="clean"><li><b>Principles</b>: maintain CPP (MAP − ICP), avoid secondary injury (hypoxia, hypotension, hypercapnia, hypo- or hyperglycaemia, hyperthermia, seizures), control ICP, smooth emergence (Stage 3 for physiology).</li>
<li><b>Traumatic brain injury</b> (BTF 4th edition / NICE NG232): intubate if GCS ≤ 8, loss of airway reflexes, hypoxia/hypercapnia, seizures, agitation preventing care, before transfer if deteriorating. Targets: SpO2 &gt; 94%, PaO2 &gt; 13 kPa, PaCO2 4.5–5.0 kPa (short-term hyperventilation only for herniation), SBP ≥ 100 mmHg (50–69 y) or ≥ 110 mmHg (15–49 and &gt; 70), CPP 60–70 mmHg, ICP &lt; 22 mmHg, Na⁺ 140–145, glucose 6–10, normothermia, head-up 30° with neutral neck and no tight ETT ties. Hyperosmolar therapy: mannitol 0.25–1 g/kg or hypertonic saline (e.g. 2.7–5%). TXA within 3 h (CRASH-3: mild–moderate). No steroids (CRASH).</li>
<li><b>Craniotomy</b>: smooth induction (propofol, opioid), avoid coughing and hypertension at pinning (scalp block or remifentanil), TIVA or ≤ 1 MAC volatile, normocapnia (mild hypocapnia for brain relaxation), avoid hypotonic fluids, glucose control, antiepileptics, emergence without coughing (remifentanil, lidocaine), early neurological assessment.</li>
<li><b>Posterior fossa and sitting position</b>: venous air embolism (TOE/Doppler monitoring, EtCO2 fall, flood the field, jugular compression, head down, aspirate via multi-orifice CVC, avoid N2O), paradoxical embolism through a PFO, macroglossia, quadriplegia from neck flexion, brainstem stimulation (bradycardia, arrhythmias).</li>
<li><b>Awake craniotomy</b> (tumours near eloquent cortex, epilepsy surgery): asleep–awake–asleep or awake throughout with sedation (dexmedetomidine, remifentanil, propofol), scalp block, patient selection and rapport, seizure management (cold saline to cortex), airway rescue plan.</li>
<li><b>Spinal surgery</b>: prone position (pressure areas, eyes: postoperative visual loss from ischaemic optic neuropathy with long surgery, hypotension, anaemia; abdominal compression ↑ venous bleeding; airway oedema), neuromonitoring (SSEPs and MEPs: TIVA, no NMB after intubation, stable depth), blood loss (TXA, cell salvage), spinal cord perfusion (MAP &gt; 80–85 in cord injury).</li></ul>`,
p:"Typical exam questions: head injury and ICP control, SAH, craniotomy, awake craniotomy, spinal surgery with neuromonitoring, MRI for a child, brainstem death testing (Stage 3).",
v:"Secondary injury, TBI targets (numbers), craniotomy technique, sitting position and VAE, awake craniotomy, prone spinal surgery and neuromonitoring."},
{f:"neu",t:"Subarachnoid haemorrhage and other neuro topics",b:`<ul class="clean"><li><b>Aneurysmal SAH</b>: thunderclap headache; grading by WFNS (GCS and motor deficit: I–V) or Hunt and Hess; Fisher/modified Fisher CT grade predicts vasospasm. Early securing of the aneurysm (endovascular coiling preferred where suitable: ISAT) to prevent rebleeding (highest in first 24 h).</li>
<li><b>Complications</b>: rebleeding, <b>delayed cerebral ischaemia/vasospasm</b> (days 4–14: <b>nimodipine 60 mg 4-hourly for 21 days</b> (oral/NG; IV causes hypotension), euvolaemia, avoid hypotension; "triple H" (hypertension, hypervolaemia, haemodilution) abandoned in favour of induced hypertension for symptomatic vasospasm; endovascular angioplasty/intra-arterial vasodilators), hydrocephalus (EVD), hyponatraemia (cerebral salt wasting: treat with saline; SIADH: avoid fluid restriction in SAH), neurogenic pulmonary oedema and stress cardiomyopathy, seizures.</li>
<li><b>Anaesthesia for coiling/clipping</b>: avoid hypertension (rebleeding) at laryngoscopy and pinning, maintain CPP, rapid control of rupture (adenosine for temporary arrest during clipping, protamine for heparin in the angio suite), communication.</li>
<li><b>MRI anaesthesia</b> (Stage 10), <b>ECT</b> (methohexital or propofol (raises seizure threshold), suxamethonium 0.5 mg/kg, short seizure 25–60 s, sympathetic surge: labetalol/esmolol), <b>epilepsy</b> (continue antiepileptics; drugs that lower seizure threshold), interventional neuroradiology (thrombectomy for stroke: GA vs sedation: similar outcomes in recent trials; avoid hypotension; time-critical).</li>
<li><b>Ophthalmic</b> (Stage 12 for blocks): penetrating eye injury (prevent IOP rise: deep anaesthesia, avoid coughing; RSI with rocuronium 1.2 mg/kg or suxamethonium if needed: airway first), strabismus surgery (oculocardiac reflex, high PONV, emergence agitation), vitreoretinal surgery (intraocular gas: SF6 or C3F8: <b>avoid N2O for weeks</b> and air travel; patient wristbands), cataract (topical/sub-Tenon's; continue anticoagulants).</li></ul>`,
p:"Typical exam questions: 'Child with penetrating eye injury' (×3), 'Management of open vs closed eye injury'.",
v:"SAH grading, complications with timings and treatment (nimodipine dose), anaesthetic priorities; ECT; eye surgery issues."},
{f:"obs",t:"Physiology of pregnancy and anaesthetic implications",b:`<ul class="clean"><li><b>Cardiovascular</b>: ↑ blood volume (40–50%; plasma &gt; red cells: dilutional anaemia), ↑ CO (40–50% by 3rd trimester, further in labour and immediately postpartum), ↓ SVR, ↑ HR. <b>Aortocaval compression</b> from ~20 weeks supine: hypotension, reduced uteroplacental flow: left lateral tilt (15°) or manual uterine displacement.</li>
<li><b>Respiratory</b>: ↑ minute ventilation (progesterone) → PaCO2 ~4 kPa (compensated respiratory alkalosis); ↓ FRC (20%) with ↑ O2 consumption: rapid desaturation; capillary engorgement and oedema of airway: smaller tubes, bleeding, more difficult intubation (failed intubation ~1 in 400 historical; 1:390 OAA data).</li>
<li><b>GI</b>: progesterone ↓ LOS tone, enlarged uterus ↑ intragastric pressure: aspiration risk from ~18–20 weeks and for 24–48 h postpartum: antacid prophylaxis (H2 antagonist, sodium citrate before GA) and RSI.</li>
<li><b>Haematological</b>: hypercoagulable (↑ fibrinogen (4–6 g/L at term), factors VII, VIII, X, vWF; ↓ protein S): VTE risk; fibrinogen &lt; 2 g/L in PPH predicts severe bleeding. Gestational thrombocytopenia.</li>
<li><b>Renal</b>: ↑ GFR (50%), lower normal creatinine (a "normal" adult creatinine may be abnormal); glycosuria. <b>Hepatic</b>: ↓ albumin, ↓ plasma cholinesterase (~25%), ↑ ALP (placental).</li>
<li><b>CNS/pharmacology</b>: ↓ MAC (~30%), ↑ sensitivity to LA (engorged epidural veins reduce epidural volume; hormonal effects), lower doses for neuraxial blocks. Drugs crossing the placenta: lipid-soluble, unionised, small (most anaesthetic agents; not NMBs or glycopyrrolate).</li>
<li><b>Non-obstetric surgery in pregnancy</b>: defer elective surgery until after delivery, urgent surgery preferably in the 2nd trimester; avoid hypoxaemia, hypotension, hypercapnia/hypocapnia; left tilt after 20 weeks; aspiration prophylaxis; fetal monitoring per gestation (viability ~22–24 weeks: obstetric and neonatal teams); VTE prophylaxis; no anaesthetic drug is proven teratogenic in humans at clinical doses; anti-D if indicated.</li></ul>`,
p:"Typical exam questions: 'Anaesthesia for emergency CS and difficult airway management', 'Non-obstetric surgery in pregnancy', physiological changes of pregnancy.",
v:"System-by-system changes with numbers and each one's anaesthetic implication."},
{f:"obs",t:"Labour analgesia and caesarean section",b:`<ul class="clean"><li><b>Labour analgesia</b>: epidural (most effective; low-dose bupivacaine 0.1% + fentanyl 2 µg/mL; PIEB/PCEA; CSE for faster onset), remifentanil PCA (needs 1:1 midwife, SpO2 monitoring and O2: apnoea), Entonox, IM opioids (pethidine/diamorphine: less effective, neonatal depression), TENS, water. Epidurals don't increase caesarean rate; may prolong the second stage and increase instrumental delivery slightly.</li>
<li><b>Category of urgency</b> (NICE): 1 immediate threat to life of mother or fetus (decision-to-delivery ≤ 30 min), 2 compromise not immediately life-threatening (≤ 75 min), 3 needs early delivery, 4 elective.</li>
<li><b>Neuraxial anaesthesia</b> for CS (spinal or extending a labour epidural: 15–20 mL 2% lidocaine with adrenaline ± bicarbonate and fentanyl, or 0.5% levobupivacaine): block to T4 to cold and T5 to touch; phenylephrine infusion to maintain SBP near baseline (international consensus 2018); intrathecal diamorphine 300 µg or morphine 100–150 µg for analgesia; oxytocin.</li>
<li><b>General anaesthesia</b>: reserved for contraindication to or failure of neuraxial block, or category 1 with no time; WHO checklist, antacids, left tilt, preoxygenation (HFNO), RSI (propofol or thiopental, rocuronium 1–1.2 mg/kg or suxamethonium), videolaryngoscope, ETT 6.0–7.0. <b>OAA/DAS 2015</b> obstetric difficult and failed intubation guideline: maximum two laryngoscopy attempts (third by experienced), second-generation SGA, decide to wake or proceed (table of factors: maternal and fetal condition, airway, aspiration risk), FONA if CICO. Higher awareness risk (NAP5: 1 in 670): adequate induction dose, volatile ≥ 1 MAC (with N2O or opioid after delivery), consider pEEG.</li>
<li><b>Uterotonics</b>: oxytocin (UK: slow bolus 3–5 IU at CS (lower doses effective: 1–3 IU at elective CS), infusion 10 IU/h; hypotension, tachycardia, ST changes, water retention), carbetocin 100 µg (long-acting), ergometrine 500 µg IM or 250 µg IV slowly (hypertension, coronary spasm, vomiting: avoid in pre-eclampsia and cardiac disease), carboprost (15-methyl PGF2α) 250 µg IM every 15 min up to 8 doses (bronchospasm: caution in asthma), misoprostol (PGE1) 800 µg sublingual/rectal, TXA 1 g.</li></ul>`,
p:"Typical exam questions: 'Anaesthesia for emergency CS and difficult airway management', 'Patient with labour epidural: management for painless vaginal delivery'.",
v:"Labour analgesia options, urgency categories, neuraxial technique and hypotension management, GA conduct and failed intubation algorithm, uterotonics with doses and side effects."},
{f:"obs",t:"Pre-eclampsia and eclampsia",b:`<ul class="clean"><li><b>Definition</b>: new hypertension (≥ 140/90) after 20 weeks with proteinuria (PCR ≥ 30 mg/mmol) or maternal organ dysfunction (renal, liver, neurological, haematological (platelets &lt; 150), uteroplacental). Severe: BP ≥ 160/110, symptoms (headache, visual disturbance, epigastric pain), HELLP (haemolysis, elevated liver enzymes, low platelets), pulmonary oedema, eclampsia.</li>
<li><b>Pathophysiology</b>: abnormal placentation (failed spiral artery remodelling) → placental ischaemia → release of anti-angiogenic factors (sFlt-1) → widespread endothelial dysfunction: vasoconstriction, capillary leak, coagulation activation, reduced intravascular volume despite oedema. Aspirin 75–150 mg from 12 weeks in high-risk women reduces risk.</li>
<li><b>Treatment</b> (NICE NG133): antihypertensives to target ~135/85 (labetalol oral or IV, nifedipine, hydralazine, methyldopa); <b>magnesium sulphate</b> for severe pre-eclampsia or eclampsia: 4 g IV over 5–15 min then 1 g/h for 24 h (recurrent seizure: further 2 g); monitor reflexes, RR, urine output; reduce in oliguria/renal failure; levels if concern (therapeutic 2–4 mmol/L). Fluid restriction (~80 mL/h) to avoid pulmonary oedema. Delivery is the cure.</li>
<li><b>Anaesthesia</b>: early epidural in labour (BP control, avoids GA); check platelets (and trend: neuraxial usually acceptable ≥ 75 × 10⁹/L if stable and no other coagulopathy). GA risks: <b>hypertensive response to laryngoscopy</b> (intracranial haemorrhage: remifentanil, alfentanil, magnesium, labetalol), airway oedema (smaller tube, videolaryngoscope), magnesium potentiates NMBs (monitor; reduced doses), ergometrine contraindicated.</li>
<li><b>Eclampsia</b>: ABC, left tilt, O2, magnesium 4 g (stop the seizure; benzodiazepines second line), control BP, deliver once stable; exclude other causes (intracranial haemorrhage, PRES).</li></ul>`,
p:"Use the magnesium ladder diagram: plasma level versus clinical effect.",
v:"Definition and severity, pathophysiology, treatment with doses and targets, neuraxial vs GA considerations, eclampsia management."},
{f:"obs",t:"Obstetric haemorrhage, placenta praevia and maternal collapse",b:`<ul class="clean"><li><b>PPH</b> (RCOG): minor 500–1000 mL; major &gt; 1000 mL (moderate 1001–2000, severe &gt; 2000) or clinical shock. Causes: the four Ts: <b>tone</b> (atony ~70%), <b>trauma</b>, <b>tissue</b> (retained products, placenta accreta), <b>thrombin</b> (coagulopathy, AFE, abruption).</li>
<li><b>Management</b>: call for help (obstetric, anaesthetic, haematology, MOH activation), ABC, two large-bore cannulae, warm fluids and blood, uterotonics stepwise, bimanual compression, TXA 1 g (WOMAN: within 3 h), measure blood loss (weighing), point-of-care viscoelastic testing (fibrinogen &lt; 2 g/L or FIBTEM A5 &lt; 12 mm: give fibrinogen concentrate or cryoprecipitate), cell salvage, surgical measures (balloon tamponade, B-Lynch suture, uterine artery ligation, interventional radiology, hysterectomy). Shock index (HR/SBP) &gt; 0.9 suggests significant loss.</li>
<li><b>Placenta praevia and accreta spectrum</b> (RCOG 2018): placenta praevia covers the internal os; low-lying placenta lies &lt; 20 mm from it (the old grades 1–4 are no longer used). Accreta spectrum (accreta, increta, percreta) risk rises with previous caesarean sections and anterior low-lying placenta. Plan delivery in a specialist centre: MDT, cell salvage, blood products, IR balloons, GA or neuraxial (CSE with conversion plan), large-bore and arterial access.</li>
<li><b>Amniotic fluid embolism</b>: sudden collapse, hypoxia, hypotension, seizures and DIC around delivery: supportive (ALS, massive transfusion with early fibrinogen, inotropes, ECMO), delivery.</li>
<li><b>Maternal cardiac arrest</b>: call obstetric and neonatal teams, CPR with <b>manual uterine displacement</b>, early intubation, IV access above the diaphragm, standard ALS drugs, and <b>perimortem caesarean (resuscitative hysterotomy)</b> by 5 minutes if no ROSC after 4 minutes (≥ 20 weeks), performed at the site of arrest. Causes: 4 Hs and 4 Ts plus eclampsia, haemorrhage, AFE, LAST, high block, anaphylaxis, magnesium toxicity, cardiac disease (MBRRACE leading cause of indirect death).</li></ul>`,
p:"Typical exam questions: 'Anaesthetic management of vaginal delivery for placenta praevia', 'Unresponsiveness after epidural anaesthesia', 'PPH'. Use the PPH escalation diagram.",
v:"PPH definitions, causes, structured management with drugs, products and targets; placenta praevia/accreta planning; AFE; maternal arrest and perimortem CS."},
{f:"paed",t:"Paediatric anaesthesia: principles",b:`<ul class="clean"><li><b>Differences</b>: airway (Stage 12), respiratory (high O2 consumption 6–8 mL/kg/min, low FRC, compliant chest wall, horizontal ribs, diaphragm fatigue: rapid desaturation), CVS (cardiac output rate-dependent, vagal predominance: bradycardia with hypoxia, suxamethonium, sevoflurane), renal immaturity, temperature (large surface area: radiant heaters, warm theatres), pharmacology (larger Vd for water-soluble drugs, immature metabolism, higher MAC in infants), psychology and consent.</li>
<li><b>Estimating weight</b> (APLS): 0–12 months (0.5 × age in months) + 4; 1–5 years (2 × age) + 8; 6–12 years (3 × age) + 7. Use measured weight when available.</li>
<li><b>Fasting</b> (APA/ESAIC 2022): clear fluids up to <b>1 hour</b> before, breast milk 4 h, formula and cow's milk 6 h, light meal 6 h; avoid prolonged fasting (dehydration, hypoglycaemia, distress).</li>
<li><b>Fluids</b> (NICE NG29, APA): use <b>isotonic</b> fluids (Hartmann's, Plasma-Lyte or 0.9% saline, with 1–2.5% glucose in neonates/infants intra-operatively); maintenance by the Holliday–Segar 4-2-1 rule (often restricted to ~2/3 postoperatively because of ADH: hyponatraemia with hypotonic fluids has caused deaths); bolus 10 mL/kg (trauma/sepsis guidance: 10 mL/kg reassess); monitor glucose and Na⁺.</li>
<li><b>Induction</b>: inhalational (sevoflurane in O2 ± N2O) or IV (EMLA/Ametop for cannulation); parental presence; premedication (midazolam 0.5 mg/kg oral, clonidine/dexmedetomidine intranasal).</li>
<li><b>Laryngospasm</b>: stop stimulation, 100% O2 with CPAP, jaw thrust (Larson's point), deepen with propofol 0.5–1 mg/kg, then suxamethonium 0.5–1 mg/kg IV (or 4 mg/kg IM) with atropine 20 µg/kg if bradycardic; intubate if needed; watch for negative-pressure pulmonary oedema.</li>
<li><b>Ex-premature infants</b>: postoperative apnoea risk until ~60 weeks postmenstrual age (highest &lt; 46 weeks, anaemia): overnight apnoea monitoring; regional/spinal techniques reduce early apnoea; caffeine.</li>
<li><b>Consent and safeguarding</b>: Gillick competence; parental responsibility; recognise non-accidental injury and escalate.</li></ul>`,
p:"Use the paediatric calculator for weight, tube sizes, fluids and emergency doses.",
v:"Physiology differences, weight formulas, fasting, fluids (isotonic), induction and analgesia, laryngospasm, ex-prems, consent."},
{f:"paed",t:"Paediatric emergencies and surgery",b:`<ul class="clean"><li><b>Pyloric stenosis</b> (2–8 weeks, boys): projectile non-bilious vomiting causes loss of H⁺, Cl⁻ and K⁺: <b>hypochloraemic hypokalaemic metabolic alkalosis</b>, with paradoxical aciduria later (aldosterone-driven Na⁺ retention in exchange for H⁺ and K⁺). A medical, not surgical, emergency: resuscitate with 0.9% saline + glucose + K⁺ until Cl⁻ ≥ 100, HCO₃⁻ &lt; 28 mmol/L, K⁺ normal. Aspirate NG tube, RSI or modified RSI, apnoea risk (alkalosis), laparoscopic pyloromyotomy, local infiltration and paracetamol.</li>
<li><b>Croup vs epiglottitis</b>: croup (parainfluenza, 6 months–3 years, gradual, barking cough, low fever: dexamethasone 0.15 mg/kg, nebulised adrenaline 400 µg/kg (max 5 mL of 1:1000)); epiglottitis (H. influenzae b, now rare, 2–6 years and adults, rapid, toxic, drooling, tripod sitting, no cough: don't upset the child, inhalational induction in theatre with ENT ready for tracheostomy, small tube); bacterial tracheitis (toxic, croupy, poor response to adrenaline).</li>
<li><b>Inhaled foreign body</b>: rigid bronchoscopy, inhalational induction maintaining spontaneous ventilation (or controlled with TIVA), shared airway.</li>
<li><b>Tonsillectomy and post-tonsillectomy bleed</b>: primary (&lt; 24 h) or secondary (5–10 days, infection). Hypovolaemia underestimated, swallowed blood (full stomach), airway obscured: resuscitate, experienced anaesthetist, RSI (head-down, left lateral or supine with suction) or inhalational in lateral position, smaller tube, pass an OGT at the end, extubate awake.</li>
<li><b>Neonatal surgical emergencies</b>: tracheo-oesophageal fistula/oesophageal atresia (avoid mask ventilation: gastric distension; tube tip beyond the fistula; associated VACTERL), congenital diaphragmatic hernia (pulmonary hypoplasia and hypertension: gentle ventilation, no bag-mask, delayed surgery after stabilisation), gastroschisis/exomphalos (heat and fluid loss, abdominal compartment), necrotising enterocolitis.</li>
<li><b>Day-case paediatric surgery</b>: circumcision, hernia, orchidopexy with caudal or penile/ilioinguinal blocks, adenotonsillectomy (OSA children may need overnight monitoring), MRI under GA or sedation.</li></ul>`,
p:"Typical exam questions: '5-week-old with pyloric stenosis listed as emergency', 'Acute respiratory distress, upper airway infections, stridor: croup vs epiglottitis', 'Approach a 2-year-old's airway', 'Bleeding tonsil'.",
v:"Pathophysiology and biochemistry, resuscitation targets, anaesthetic technique, airway emergencies (croup, epiglottitis, foreign body, bleeding tonsil), neonatal emergencies."},
{f:"paed",t:"ENT and shared airway surgery",b:`<ul class="clean"><li><b>Shared airway</b>: communication, plan A/B/C, tube choice (microlaryngeal tube 5.0–6.0, reinforced, laser tube), head and neck positioning, throat packs (documented removal), blood in the airway, smooth emergence, laryngospasm and bleeding risk.</li>
<li><b>Jet ventilation</b>: supraglottic (via laryngoscope), subglottic (catheter through cords), transtracheal (cannula through the cricothyroid membrane: highest barotrauma risk). Low-frequency (Sanders injector, manual) or high-frequency (100–150/min). Requires a clear exit path for gas (risk of barotrauma, pneumothorax, surgical emphysema); TIVA; CO2 retention (monitor with intermittent EtCO2 or transcutaneous CO2).</li>
<li><b>Tubeless techniques</b>: high-flow nasal oxygen (THRIVE: apnoeic oxygenation for 15–30 min; CO2 rises ~0.15–0.25 kPa/min), spontaneous ventilation with TIVA, intermittent apnoea.</li>
<li><b>Distal tracheal tumour</b>: CT and flexible bronchoscopy assessment, plan with thoracic surgeons; options: awake fibreoptic with a small tube beyond the lesion, rigid bronchoscopy with jet ventilation, spontaneous ventilation, ECMO standby for critical obstruction; laser ablation: low FiO2, smoke can travel distally (ARDS).</li>
<li><b>Upper airway obstruction in adults</b> (tumour, abscess, Ludwig's angina, angioedema): awake techniques (fibreoptic or videolaryngoscopy), awake tracheostomy under LA, avoid sedation and muscle relaxation until the airway is secured; FONA kit ready (DAS).</li>
<li><b>Tracheostomy emergencies</b> (NTSP algorithm): call for help, O2 to face and stoma, remove speaking valve or inner tube, pass suction catheter, deflate cuff, remove the tube if blocked, oxygenate via face/stoma, re-intubate orally or via the stoma (laryngectomy patients: stoma only).</li>
<li><b>Facial fractures</b>: Le Fort I–III; nasal intubation contraindicated with basal skull fracture/CSF leak (relative); submental intubation; wire cutters if jaws wired.</li></ul>`,
p:"Typical exam questions: 'Patient with distal tracheal tumour for laser ablation (jet ventilation, TIVA, smoke)', 'Airway fire' (Stage 10).",
v:"Shared airway principles, jet ventilation (types, risks), tubeless options, tracheal tumour plan, adult upper airway obstruction, tracheostomy emergencies."},
{f:"gen",t:"Orthopaedic anaesthesia: tourniquets, BCIS and fat embolism",b:`<ul class="clean"><li><b>Tourniquet</b>: bloodless field. Pressure: limb occlusion pressure + margin (arm ~SBP + 50–75 mmHg (~200–250), leg ~SBP + 100 mmHg (~250–300)); wide cuffs need less pressure. Time: ≤ 2 h (deflate for 10–15 min if longer). Effects: inflation (↑ CVP and BP from autotransfusion, tourniquet pain/hypertension after 30–60 min despite GA or block), ischaemia (acidosis, ↑ K⁺, lactate, temperature rise), deflation (reperfusion: ↓ BP, ↑ EtCO2, ↓ temperature, acidosis, emboli, ↑ ICP in head injury). Complications: nerve injury, skin burns (prep under cuff), compartment syndrome, DVT dislodgement; contraindicated in sickle cell disease (relative), severe PVD, crush injury.</li>
<li><b>Bone cement implantation syndrome</b> (cemented hemiarthroplasty and arthroplasty): hypoxia, hypotension, arrhythmia, ↑ PVR, cardiac arrest around cementing, reaming or reduction. Grades (Donaldson): 1 SpO2 &lt; 94% or SBP fall &gt; 20%; 2 SpO2 &lt; 88% or SBP fall &gt; 40% or loss of consciousness; 3 cardiovascular collapse needing CPR. Mechanism: embolism of marrow fat, cement and debris, with mediator release. Risk factors: age, ASA 3–4, cardiopulmonary disease, pulmonary hypertension, male, diuretics, osteoporosis, uncemented-to-cemented decisions. Prevention (AAGBI/BOA/BGS 2015): identify high-risk patients, team brief, surgeon's medullary lavage and venting, cement gun/retrograde insertion, avoid hypovolaemia, invasive BP in high risk, anaesthetist vigilance at cementing (say "cementing now"). Treat: 100% O2, fluids, vasopressors (RV support: noradrenaline, adrenaline), CPR.</li>
<li><b>Fat embolism syndrome</b> (long bone/pelvic fractures; 24–72 h): respiratory failure, neurological dysfunction, petechial rash (axilla, conjunctiva) (Gurd and Wilson criteria); supportive care; early fracture fixation reduces risk.</li>
<li><b>Compartment syndrome</b>: pain out of proportion, pain on passive stretch; regional analgesia may mask (use lower concentrations, monitor, compartment pressure (ΔP = diastolic − compartment &lt; 30 mmHg)): fasciotomy.</li>
<li><b>Joint replacement and spinal surgery</b>: regional analgesia (Stage 12), TXA, cell salvage, VTE prophylaxis, early mobilisation (ERAS).</li></ul>`,
p:"Typical exam questions: 'Bone cement implantation syndrome', 'Tourniquet physiology', 'Monitoring and analgesia for total knee arthroplasty with a nerve catheter'.",
v:"Tourniquet physiology at inflation, ischaemia and release, settings and complications; BCIS grades, mechanism, risk, prevention and treatment; fat embolism and compartment syndrome."},
{f:"gen",t:"Laparoscopy, robotic surgery and TURP syndrome",b:`<ul class="clean"><li><b>Pneumoperitoneum</b> (CO2 at 12–15 mmHg): CVS: ↑ SVR and MAP, ↓ venous return (more at higher pressures and with hypovolaemia), CO may fall; vagal bradycardia/asystole on insufflation (stop insufflation, atropine). Respiratory: cephalad diaphragm displacement → ↓ FRC and compliance, ↑ airway pressure, atelectasis, endobronchial intubation (carina moves up); CO2 absorption ↑ PaCO2 (increase minute ventilation). Other: ↓ renal and splanchnic flow, ↑ ICP and IOP, PONV, shoulder-tip pain.</li>
<li><b>Complications</b>: CO2 embolism (sudden fall in EtCO2 then rise, hypotension, "mill-wheel" murmur: stop gas, 100% O2, head-down left lateral, aspirate via CVC, CPR), subcutaneous emphysema, capnothorax/pneumothorax (rising airway pressure, falling SpO2), vascular and visceral injury, high airway pressures (Typical exam questions: lap chole with raised peak pressure: patient (bronchospasm, pneumothorax, endobronchial), equipment (kinked tube, ventilator), surgical (high IAP, steep tilt, inadequate relaxation)).</li>
<li><b>Robotic surgery</b>: steep Trendelenburg (25–45°) for pelvic surgery: facial/airway oedema (check cuff leak before extubation), ↑ ICP and IOP (ischaemic optic neuropathy), brachial plexus injury, sliding, reduced access to the patient, rapid undocking plan for emergencies.</li>
<li><b>TURP syndrome</b>: absorption of irrigation fluid (glycine 1.5%: hypotonic ~200 mOsm/L) through open prostatic sinuses (risk ↑ with resection time &gt; 1 h, bag height, large gland, low venous pressure). Features: fluid overload (hypertension then hypotension, bradycardia, pulmonary oedema), dilutional hyponatraemia and hypo-osmolality (confusion, seizures, coma), glycine toxicity (transient blindness, ammonia → encephalopathy), haemolysis. Spinal anaesthesia allows early detection (confusion, restlessness). Management: stop surgery, check Na⁺ and osmolality, furosemide for overload, hypertonic saline for severe symptomatic hyponatraemia (limit correction), supportive. Bipolar resection with saline irrigation largely prevents hyponatraemia (overload still possible).</li>
<li><b>Bladder perforation</b> (abdominal/shoulder pain under spinal), hypothermia from irrigation, obturator jerk (obturator nerve block).</li></ul>`,
p:"Typical exam questions: 'Lap chole: differential of elevated peak airway pressure, pneumothorax diagnosis and management', 'TURP case with hypotension and bradycardia (heart block and pacing, TURP syndrome)'.",
v:"Pneumoperitoneum physiology by system, complications including CO2 embolism, robotic positioning, TURP syndrome causes, features, management and prevention."},
{f:"gen",t:"Day-case surgery and enhanced recovery",b:`<ul class="clean"><li><b>Day surgery</b> (BADS/AAGBI 2019): default for most procedures; selection by <b>physiological fitness rather than arbitrary limits</b> (ASA 3 with stable disease, BMI alone not a contraindication; OSA acceptable if managed and opioid-sparing), procedure (minimal bleeding, pain manageable with oral analgesia, early oral intake), social (adult escort and carer for 24 h, telephone, travel within ~1 h).</li>
<li><b>Technique</b>: short-acting agents (propofol, remifentanil, sevoflurane/desflurane), multimodal opioid-sparing analgesia (paracetamol, NSAID, LA infiltration, peripheral blocks with clear instructions), PONV prophylaxis, spinal with short-acting agents (prilocaine 2%, chloroprocaine 1%), avoid long fasting.</li>
<li><b>Discharge criteria</b>: stable observations, alert and oriented, pain and PONV controlled, able to drink (eating not mandatory), mobilising appropriately, voiding (not mandatory for all), escort present, written instructions and analgesia, contact number. Unplanned admission causes: pain, PONV, surgical complications, drowsiness.</li>
<li><b>Enhanced recovery (ERAS)</b>: pre-op (education, prehabilitation, nutrition, carbohydrate loading, minimal fasting (clear fluids until 2 h; many centres now 1 h for adults too), no routine bowel preparation, anaemia correction), intra-op (minimally invasive surgery, goal-directed or zero-balance fluids, opioid-sparing analgesia, normothermia, PONV prophylaxis, lung-protective ventilation, no routine drains/NGT), post-op (early oral intake, early mobilisation, early removal of catheters, multimodal analgesia, VTE prophylaxis, audit). Reduces length of stay and complications.</li>
<li><b>Sedation outside theatre</b> (AoMRC 2013): appropriate training, monitoring (capnography for moderate/deep sedation), resuscitation equipment, recovery and discharge criteria.</li></ul>`,
p:"Day-case selection is a classic discussion: argue from physiological status, procedure and social factors, not age or BMI cut-offs.",
v:"Selection criteria, anaesthetic technique, discharge criteria, unplanned admission causes; ERAS elements by phase and evidence."},
];

/* ---------- data ---------- */
const COW={nodes:{lica:[170,240],rica:[350,240],lmca:[60,190],rmca:[460,190],laca:[195,70],raca:[325,70],lpca:[175,330],rpca:[345,330],bas:[260,400]},
 edges:[["lica","lmca","L ICA–MCA"],["rica","rmca","R ICA–MCA"],["lica","laca","L ICA–ACA"],["rica","raca","R ICA–ACA"],["laca","raca","ACoA"],["lica","lpca","L PCoA"],["rica","rpca","R PCoA"],["bas","lpca","Basilar–L PCA"],["bas","rpca","Basilar–R PCA"]]};
const PPH=[[0,"Normal delivery","Active management of the third stage (oxytocin 10 IU IM / 3–5 IU IV at CS)."],[500,"Minor PPH (500–1000 mL)","Call for help (midwife, obstetrician), IV access ×2 (14–16G), FBC/group & screen, warm crystalloid, uterine massage, empty bladder, oxytocin infusion, ergometrine 500 µg IM (if no hypertension)."],[1000,"Major PPH (> 1000 mL) or shock","Activate MOH protocol; senior obstetrician and anaesthetist; TXA 1 g IV; carboprost 250 µg IM every 15 min (max 8); misoprostol 800 µg; crossmatch 4 units; viscoelastic testing; give fibrinogen if < 2 g/L or FIBTEM A5 < 12 mm; cell salvage; transfer to theatre."],[1500,"Ongoing major PPH (> 1500 mL)","Red cells (O negative/group-specific), FFP 12–15 mL/kg if PT/APTT prolonged or no POC result after 4 units, platelets < 75; arterial line; keep warm, Ca²⁺ > 1, pH > 7.2; surgical: balloon tamponade, B-Lynch, uterine artery ligation, IR embolisation."],[2500,"Severe PPH (> 2500 mL)","Hysterectomy decision early (consultant), consider GA, massive transfusion ratios, ICU; AFE and DIC suspicion; debrief."]];
const MG=[[0,"Normal 0.7–1.0 mmol/L"],[2,"Therapeutic 2–4 mmol/L: seizure prophylaxis"],[5,"Loss of patellar reflexes (~5 mmol/L): stop infusion"],[6.5,"Respiratory depression, somnolence (~6–7.5)"],[7.5,"Prolonged PR, wide QRS, heart block"],[12,"Cardiac arrest (> 12 mmol/L)"]];

const CALCS=[
 {t:"Lung resection: predicted postoperative function",c:"abp",in:[["Preop FEV1 (% predicted)","f",65],["Preop DLCO (% predicted)","d",60],["Segments to be resected (of 19)","s",5],["Obstructed/non-functioning segments already","o",0]],
  f:(v,fmt)=>{const fr=v.s/Math.max(1,19-v.o);const pf=v.f*(1-fr),pd=v.d*(1-fr);const lo=Math.min(pf,pd);return [["ppoFEV1 (%)",fmt(pf,0),pf<30?"bad":pf<60?"warn":"ok"],["ppoDLCO (%)",fmt(pd,0),pd<30?"bad":pd<60?"warn":"ok"],["Next step",lo>60?"Low risk: proceed":lo>=30?"Exercise test (stair climb > 22 m / shuttle > 400 m) or CPET":"CPET: VO2 peak < 10 mL/kg/min = very high risk"]]},
  n:"Segments: right upper 3, middle 2, lower 5; left upper 3 + lingula 2, lower 4 (19 total). Lobectomy example: right lower lobe = 5 segments."},
 {t:"Double-lumen tube size",c:"abp",in:[["Female (1/0)","f",0],["Height (cm)","h",178]],
  f:(v,fmt)=>{const s=v.f?(v.h<160?35:37):(v.h<170?39:41);return [["Suggested left DLT (Fr)",fmt(s,0)],["Insertion depth estimate (cm at teeth)",fmt(12+0.1*v.h,0)],["Confirm with","Fibreoptic bronchoscopy"]]},
  n:"Size by sex and height (Slinger); depth ≈ 12 + height/10 cm (Brodsky). Always confirm position after turning lateral."},
 {t:"Paediatric weight, airway and emergency doses",c:"etco2",in:[["Age (years, use 0.5 for 6 months)","a",4]],
  f:(v,fmt)=>{const w=v.a<1?0.5*v.a*12+4:v.a<=5?2*v.a+8:3*v.a+7;const maint=w<=10?4*w:w<=20?40+2*(w-10):60+(w-20);return [["Estimated weight (kg)",fmt(w,1)],["Cuffed ETT ID (mm)",v.a>=1?fmt(v.a/4+3.5,1):"3.0–3.5"],["Oral ETT length (cm)",v.a>=1?fmt(v.a/2+12,1):"≈ 10"],["Maintenance fluid (mL/h)",fmt(maint,0)],["Fluid bolus 10 mL/kg (mL)",fmt(10*w,0)],["Adrenaline 10 µg/kg (µg)",fmt(10*w,0)],["Defibrillation 4 J/kg (J)",fmt(4*w,0)],["Suxamethonium 2 mg/kg (mg)",fmt(2*w,0)],["Atropine 20 µg/kg (µg)",fmt(Math.max(100,20*w),0)],["Glucose 10% 2 mL/kg (mL)",fmt(2*w,0)]]},
  n:"APLS weight formulas; Holliday–Segar maintenance (isotonic fluids). Use measured weight whenever possible."},
 {t:"Pyloric stenosis: fit for theatre?",c:"etco2",in:[["Na⁺ (mmol/L)","na",134],["K⁺ (mmol/L)","k",3.2],["Cl⁻ (mmol/L)","cl",92],["HCO₃⁻ (mmol/L)","hc",32],["Glucose (mmol/L)","g",4.5]],
  f:(v,fmt)=>{const ok=v.cl>=100&&v.hc<28&&v.k>=3.5&&v.na>=135&&v.g>=3;return [["Chloride ≥ 100",v.cl>=100?"Yes":"No",v.cl>=100?"ok":"bad"],["Bicarbonate < 28",v.hc<28?"Yes":"No",v.hc<28?"ok":"bad"],["K⁺ ≥ 3.5",v.k>=3.5?"Yes":"No",v.k>=3.5?"ok":"bad"],["Na⁺ ≥ 135",v.na>=135?"Yes":"No",v.na>=135?"ok":"warn"],["Decision",ok?"Biochemically ready for surgery":"Continue resuscitation (0.9% saline + glucose + K⁺)"]]},
  n:"Pyloric stenosis is a medical emergency: correct the hypochloraemic, hypokalaemic metabolic alkalosis before surgery."},
 {t:"Head injury: CPP and BP targets",c:"nibp",in:[["MAP (mmHg)","m",80],["ICP (mmHg)","i",20],["Age","a",60],["Systolic BP (mmHg)","s",115]],
  f:(v,fmt)=>{const cpp=v.m-v.i,tgt=(v.a>=50&&v.a<=69)?100:110;return [["CPP (mmHg)",fmt(cpp,0),cpp<60?"bad":cpp>70?"warn":"ok"],["CPP target","60–70 mmHg"],["ICP threshold","Treat if > 22 mmHg",v.i>22?"bad":"ok"],["SBP target (BTF)","≥ "+tgt+" mmHg",v.s<tgt?"bad":"ok"]]},
  n:"Brain Trauma Foundation 4th edition: SBP ≥ 100 (50–69 years) or ≥ 110 (15–49, > 70); ICP > 22 treat; CPP 60–70."},
 {t:"Obstetric shock index",c:"spo2",in:[["Heart rate","hr",115],["Systolic BP","s",95]],
  f:(v,fmt)=>{const si=v.hr/v.s;return [["Shock index",fmt(si,2),si>=1.4?"bad":si>=0.9?"warn":"ok"],["Interpretation",si>=1.4?"Severe haemorrhage likely: urgent intervention":si>=0.9?"Significant blood loss possible: escalate":"Normal range (0.7–0.9 in pregnancy)"]]},
  n:"Obstetric shock index ≥ 0.9 suggests need for transfusion; ≥ 1.4 urgent intervention. Healthy pregnant women compensate until late."},
 {t:"TURP syndrome: estimated sodium fall",c:"ecg",in:[["Serum Na⁺ before (mmol/L)","na",140],["Weight (kg)","w",75],["Irrigant absorbed (L, glycine 1.5%)","v",2],["Elderly male TBW fraction","f",0.5]],
  f:(v,fmt)=>{const tbw=v.w*v.f;const nn=v.na*tbw/(tbw+v.v);return [["Estimated Na⁺ after (mmol/L)",fmt(nn,0),nn<120?"bad":nn<130?"warn":"ok"],["Fall (mmol/L)",fmt(v.na-nn,0)],["Rule of thumb","~1 L absorbed lowers Na⁺ by ~3–5 mmol/L"]]},
  n:"Dilution estimate (ignores redistribution and urine loss). Symptoms usually below 120 mmol/L; glycine toxicity and hypo-osmolality add to the picture."},
 {t:"Tourniquet settings",c:"ecg",in:[["Systolic BP (mmHg)","s",130],["Limb: 1 arm, 2 leg","l",2],["Inflation time so far (min)","t",100]],
  f:(v,fmt)=>{const p=v.l===1?v.s+60:v.s+100;return [["Suggested cuff pressure (mmHg)",fmt(p,0)],["Time status",v.t>120?"Over 2 h: deflate 10–15 min or stop":v.t>90?"Approaching 2 h limit":"Within limits",v.t>120?"bad":v.t>90?"warn":"ok"]]},
  n:"Prefer limb occlusion pressure + 40 (LOP < 130) to + 80 mmHg (LOP > 190) where measurable; ≤ 2 h total ischaemia."},
];

const TABLES=[
 ["Lung resection risk",["Measure","Low risk","Intermediate","High risk"],[["ppoFEV1 / ppoDLCO","> 60%","30–60%","< 30%"],["Stair climb","> 22 m","12–22 m","< 12 m"],["Shuttle walk","> 400 m","250–400 m","< 250 m"],["VO2 peak","> 20 mL/kg/min","10–20","< 10 (or < 35% predicted)"]]],
 ["Hypoxaemia during OLV: stepwise",["Step","Action"],[["1","FiO2 1.0; check SpO2 probe and haemodynamics"],["2","Fibreoptic check of DLT/blocker position; suction"],["3","Recruit and optimise PEEP in the ventilated lung"],["4","CPAP 5–10 cmH2O O2 (or insufflation) to the operative lung"],["5","Reduce volatile / switch to TIVA; correct Hb, CO"],["6","Intermittent two-lung ventilation"],["7","Surgical clamping of the pulmonary artery (pneumonectomy)"]]],
 ["IABP",["Item","Detail"],[["Inflation","Dicrotic notch (aortic valve closure): diastolic augmentation"],["Deflation","Just before systole (R wave / end-diastole): afterload reduction"],["Indications","Cardiogenic shock, refractory angina, mechanical MI complications, weaning from CPB"],["Contraindications","Aortic regurgitation, aortic dissection, severe PVD, uncontrolled sepsis/bleeding"],["Complications","Limb ischaemia, vascular injury, thrombocytopenia, balloon rupture (gas embolism), malposition (renal/subclavian occlusion)"]]],
 ["Head injury targets (BTF 4th ed.)",["Parameter","Target"],[["SpO2 / PaO2","> 94% / > 13 kPa"],["PaCO2","4.5–5.0 kPa"],["SBP","≥ 100 (50–69 y), ≥ 110 (15–49, > 70)"],["CPP","60–70 mmHg"],["ICP","Treat > 22 mmHg"],["Na⁺","140–145 mmol/L"],["Glucose","6–10 mmol/L"],["Temperature","Normothermia"]]],
 ["WFNS grading of SAH",["Grade","GCS","Motor deficit"],[["I","15","Absent"],["II","13–14","Absent"],["III","13–14","Present"],["IV","7–12","Present or absent"],["V","3–6","Present or absent"]]],
 ["Physiological changes of pregnancy (term)",["System","Change"],[["Blood volume","↑ 40–50%"],["Cardiac output","↑ 40–50%"],["SVR","↓ 20–30%"],["Minute ventilation","↑ 50% (PaCO2 ~4 kPa)"],["FRC","↓ 20%"],["O2 consumption","↑ 20–30%"],["GFR","↑ 50%"],["Fibrinogen","↑ (4–6 g/L)"],["Plasma cholinesterase","↓ ~25%"],["MAC","↓ ~30%"]]],
 ["Uterotonics",["Drug","Dose","Side effects / cautions"],[["Oxytocin","3–5 IU slow IV (1–3 IU elective CS); 10 IU/h infusion","Hypotension, tachycardia, ST changes, water intoxication"],["Carbetocin","100 µg IV","Similar to oxytocin; long-acting"],["Ergometrine","500 µg IM / 250 µg IV slowly","Hypertension, coronary spasm, vomiting; avoid in pre-eclampsia, cardiac disease"],["Carboprost","250 µg IM q15 min (max 8 doses)","Bronchospasm (asthma), diarrhoea, fever, hypertension"],["Misoprostol","800 µg sublingual/rectal","Fever, shivering, diarrhoea"],["Tranexamic acid","1 g IV (repeat once)","Thrombosis (theoretical), seizures at high doses"]]],
 ["Croup, epiglottitis and bacterial tracheitis",["Feature","Croup","Epiglottitis","Bacterial tracheitis"],[["Cause","Parainfluenza","H. influenzae b (also strep, staph)","Staph aureus"],["Age","6 months–3 years","2–6 years (and adults)","Any child"],["Onset","Days, coryzal","Hours","Days then rapid deterioration"],["Features","Barking cough, stridor, low fever","Toxic, drooling, tripod, no cough","Toxic, croupy cough, pus"],["Treatment","Dexamethasone, nebulised adrenaline","Gas induction in theatre, ENT, intubate, antibiotics","Intubation, antibiotics, suction"]]],
 ["Paediatric fasting (APA/ESAIC 2022)",["Intake","Minimum fast"],[["Clear fluids","1 hour"],["Breast milk","4 hours"],["Formula / cow's milk","6 hours"],["Light meal","6 hours"]]],
 ["Carotid endarterectomy: cerebral monitoring",["Method","Principle","Notes"],[["Awake patient (LA)","Neurological function","Gold standard; selective shunting"],["Stump pressure","Back-pressure distal to clamp","> 40–50 mmHg reassuring"],["NIRS","Regional cerebral O2 saturation","> 20% fall significant; extracranial contamination"],["Transcranial Doppler","MCA flow velocity, emboli","Window failure in 10–15%"],["EEG / SSEPs","Cortical function","Affected by anaesthetics"]]],
 ["BCIS grading (Donaldson 2009)",["Grade","Criteria"],[["1","SpO2 < 94% or SBP fall > 20%"],["2","SpO2 < 88% or SBP fall > 40% or unexpected loss of consciousness"],["3","Cardiovascular collapse needing CPR"]]],
 ["TURP syndrome features",["System","Features"],[["Cardiovascular","Hypertension, then hypotension, bradycardia, pulmonary oedema"],["Neurological","Confusion, agitation, seizures, coma, transient blindness (glycine)"],["Metabolic","Hyponatraemia, hypo-osmolality, hyperammonaemia, hyperglycinaemia"],["Haematological","Haemolysis, DIC"]]],
];

const CARDS=[
 ["ct","Three legs of lung resection assessment?","FEV1, DLCO, cardiopulmonary exercise capacity."],
 ["ct","ppoFEV1 formula?","Preop FEV1 × (1 − segments resected/19)."],
 ["ct","ppo threshold for low risk?","> 60%."],
 ["ct","VO2 peak very high risk for resection?","< 10 mL/kg/min."],
 ["ct","Why left DLT preferred?","Right upper lobe bronchus arises close to carina."],
 ["ct","DLT sizes?","Women 35–37 Fr, men 39–41 Fr."],
 ["ct","Shunt fraction during OLV after HPV?","~20–25%."],
 ["ct","Drugs inhibiting HPV?","Volatiles > 1 MAC, vasodilators (GTN, SNP)."],
 ["ct","CPAP to non-ventilated lung?","5–10 cmH2O O2."],
 ["ct","OLV tidal volume?","4–6 mL/kg predicted weight."],
 ["ct","Heparin dose for CPB?","300–400 IU/kg; ACT > 480 s."],
 ["ct","IABP inflation timing?","Dicrotic notch."],
 ["ct","IABP deflation timing?","Just before systole."],
 ["ct","IABP contraindication?","Aortic regurgitation, aortic dissection."],
 ["ct","Beck's triad?","Hypotension, raised JVP, muffled heart sounds."],
 ["ct","Tamponade haemodynamic goals?","Fast, full, tight; spontaneous ventilation."],
 ["ct","Tet spell treatment?","Phenylephrine, fluid, β-blocker, knee-chest, O2."],
 ["ct","Why is the circle of Willis a circle?","Collateral flow if one inflow is occluded."],
 ["ct","GALA trial result?","GA vs LA for CEA: no difference."],
 ["ct","Reassuring stump pressure?","> 40–50 mmHg."],
 ["ct","Hyperperfusion syndrome after CEA?","Headache, seizures, haemorrhage: control BP."],
 ["ct","Aortic cross-clamp effects?","↑ afterload, distal ischaemia."],
 ["ct","Aortic unclamping effects?","Hypotension, acidosis, hyperkalaemia."],
 ["ct","CSF drain target in thoracoabdominal repair?","CSF pressure < 10 mmHg."],
 ["ct","Ruptured AAA BP target?","SBP ~70–90 (permissive hypotension)."],
 ["ct","When to induce in ruptured AAA?","On the table, surgeon scrubbed."],
 ["neu","BTF SBP target age 50–69?","≥ 100 mmHg."],
 ["neu","BTF ICP treatment threshold?","> 22 mmHg."],
 ["neu","CPP target in TBI?","60–70 mmHg."],
 ["neu","PaCO2 target in TBI?","4.5–5.0 kPa."],
 ["neu","Steroids in head injury?","No (CRASH: harm)."],
 ["neu","Signs of VAE?","Sudden ↓ EtCO2, hypotension, arrhythmia."],
 ["neu","VAE management?","Flood field, jugular compression, head down, aspirate CVC, 100% O2."],
 ["neu","Neuromonitoring anaesthetic for MEPs?","TIVA, no NMB."],
 ["neu","Postoperative visual loss cause in prone spine surgery?","Ischaemic optic neuropathy."],
 ["neu","Nimodipine dose in SAH?","60 mg 4-hourly for 21 days."],
 ["neu","Vasospasm timing?","Days 4–14."],
 ["neu","Hyponatraemia in SAH?","Cerebral salt wasting or SIADH."],
 ["neu","WFNS grade IV GCS?","7–12."],
 ["neu","ECT suxamethonium dose?","~0.5 mg/kg."],
 ["neu","Intraocular gas and N2O?","Avoid N2O for weeks (SF6/C3F8)."],
 ["obs","Blood volume increase in pregnancy?","40–50%."],
 ["obs","PaCO2 in pregnancy?","~4 kPa."],
 ["obs","Aortocaval compression from?","~20 weeks."],
 ["obs","MAC in pregnancy?","↓ ~30%."],
 ["obs","Fibrinogen at term?","4–6 g/L."],
 ["obs","Category 1 CS decision-to-delivery?","≤ 30 min."],
 ["obs","CS block height?","T4 cold / T5 touch."],
 ["obs","Spinal hypotension drug of choice?","Phenylephrine infusion."],
 ["obs","Max laryngoscopy attempts (OAA/DAS)?","Two (third by experienced)."],
 ["obs","Awareness at CS under GA (NAP5)?","~1 in 670."],
 ["obs","Oxytocin bolus at CS?","3–5 IU slowly (1–3 IU elective)."],
 ["obs","Ergometrine contraindications?","Pre-eclampsia, hypertension, cardiac disease."],
 ["obs","Carboprost dose?","250 µg IM q15 min, max 8."],
 ["obs","Carboprost caution?","Asthma (bronchospasm)."],
 ["obs","Pre-eclampsia definition?","BP ≥ 140/90 after 20 wk + proteinuria or organ dysfunction."],
 ["obs","MgSO4 regimen?","4 g over 5–15 min, then 1 g/h × 24 h."],
 ["obs","Mg level losing reflexes?","~5 mmol/L."],
 ["obs","Mg toxicity antidote?","Calcium gluconate."],
 ["obs","Pre-eclampsia GA risk at laryngoscopy?","Hypertensive surge → intracranial haemorrhage."],
 ["obs","Platelets for neuraxial in pre-eclampsia?","Usually ≥ 75 × 10⁹/L if stable."],
 ["obs","Major PPH volume?","> 1000 mL."],
 ["obs","Four Ts of PPH?","Tone, trauma, tissue, thrombin."],
 ["obs","Fibrinogen trigger in PPH?","< 2 g/L (FIBTEM A5 < 12 mm)."],
 ["obs","TXA in PPH (WOMAN)?","1 g within 3 h."],
 ["obs","Low-lying placenta definition (RCOG 2018)?","< 20 mm from internal os."],
 ["obs","Perimortem CS timing?","By 5 min of arrest (≥ 20 weeks)."],
 ["obs","Obstetric shock index concern?","≥ 0.9."],
 ["paed","APLS weight 1–5 years?","(2 × age) + 8."],
 ["paed","APLS weight 6–12 years?","(3 × age) + 7."],
 ["paed","Clear fluid fast for children (APA)?","1 hour."],
 ["paed","Maintenance fluid rule?","4-2-1 (Holliday–Segar), isotonic."],
 ["paed","Paediatric fluid bolus?","10 mL/kg."],
 ["paed","Laryngospasm suxamethonium dose IV?","0.5–1 mg/kg (4 mg/kg IM)."],
 ["paed","Ex-prem apnoea risk until?","~60 weeks postmenstrual age."],
 ["paed","Pyloric stenosis biochemistry?","Hypochloraemic hypokalaemic metabolic alkalosis."],
 ["paed","Pyloric stenosis readiness targets?","Cl ≥ 100, HCO3 < 28, K normal."],
 ["paed","Paradoxical aciduria mechanism?","Aldosterone: Na⁺ retained, H⁺/K⁺ excreted."],
 ["paed","Croup treatment?","Dexamethasone 0.15 mg/kg, nebulised adrenaline."],
 ["paed","Epiglottitis organism?","H. influenzae type b."],
 ["paed","Epiglottitis induction?","Inhalational, in theatre, ENT ready."],
 ["paed","Secondary tonsil bleed timing?","5–10 days."],
 ["paed","TOF/OA ventilation concern?","Gastric distension via fistula."],
 ["paed","CDH problem?","Pulmonary hypoplasia and hypertension."],
 ["paed","Gillick competence?","Child under 16 with sufficient understanding to consent."],
 ["paed","Transtracheal jet ventilation risk?","Barotrauma (needs gas exit)."],
 ["paed","THRIVE CO2 rise rate?","~0.15–0.25 kPa/min."],
 ["paed","Tracheostomy blocked: first steps?","O2 face and stoma, remove inner tube, suction, deflate cuff, remove tube."],
 ["paed","Laryngectomy patient oxygenation route?","Stoma only."],
 ["gen","Arm tourniquet pressure?","~SBP + 50–75 mmHg."],
 ["gen","Leg tourniquet pressure?","~SBP + 100 mmHg."],
 ["gen","Maximum tourniquet time?","~2 h."],
 ["gen","Effects of tourniquet release?","↓ BP, ↑ EtCO2, ↑ K⁺, acidosis, ↓ temperature."],
 ["gen","BCIS grade 2?","SpO2 < 88% or SBP fall > 40% or LOC."],
 ["gen","BCIS risk factors?","Age, ASA 3–4, cardiopulmonary disease, PH, male, diuretics."],
 ["gen","Fat embolism triad?","Respiratory failure, neurological signs, petechiae."],
 ["gen","Pneumoperitoneum pressure?","12–15 mmHg."],
 ["gen","Bradycardia on insufflation cause?","Vagal (peritoneal stretch)."],
 ["gen","CO2 embolism sign?","Sudden ↓ EtCO2, hypotension, mill-wheel murmur."],
 ["gen","Steep Trendelenburg risks?","Airway oedema, ↑ ICP/IOP, ION, plexus injury."],
 ["gen","Glycine irrigant osmolality?","~200 mOsm/L (hypotonic)."],
 ["gen","Glycine toxicity sign?","Transient blindness."],
 ["gen","TURP syndrome prevention?","Bipolar resection with saline, limit time and bag height."],
 ["gen","Why spinal for TURP?","Early detection of confusion (TURP syndrome)."],
 ["gen","Day-case selection basis?","Physiological fitness, procedure, social support."],
 ["gen","Day-case escort requirement?","Responsible adult for 24 h."],
 ["gen","ERAS fluid strategy?","Goal-directed / zero balance."],
];

const FCF={all:"All",ct:"Cardiac, thoracic, vascular",neu:"Neuro & eye",obs:"Obstetrics",paed:"Paediatrics & ENT",gen:"Ortho, general, day case"};

const VIVA=[
 {st:"SOE 3 · Anaesthesia",q:"A 65-year-old smoker with COPD needs a right pneumonectomy. How do you assess and manage him?",a:["Three-legged assessment with ppo values.","Cardiac risk and CPET.","Lung isolation choice and confirmation.","OLV ventilation and hypoxaemia management.","Analgesia and postoperative complications."],fu:"What is post-pneumonectomy pulmonary oedema?"},
 {st:"SOE 3 · Anaesthesia",q:"Hypoxaemia during one-lung ventilation: what do you do?",a:["Physiology: shunt and HPV.","Immediate FiO2 and tube check.","PEEP, CPAP to operative lung.","Haemodynamics, volatile reduction.","Intermittent two-lung ventilation, PA clamp."],fu:"Why does a high volatile concentration worsen oxygenation?"},
 {st:"SOE 3 · Anaesthesia",q:"Draw the circle of Willis. How do you prevent cerebral ischaemia during carotid endarterectomy?",a:["Anatomy and collateral function; variants.","GA vs LA (GALA).","Monitoring options and shunting.","BP management during clamp.","Postoperative complications."],fu:"What is hyperperfusion syndrome?"},
 {st:"SOE 3 · Anaesthesia",q:"A patient with a ruptured AAA arrives in theatre.",a:["Permissive hypotension.","Preparation and MOH.","Induction timing and drugs.","Clamp and unclamp physiology.","Complications and EVAR option."],fu:"Why induce only when the surgeon is ready?"},
 {st:"SOE 3 · Anaesthesia",q:"A 30-year-old with a severe head injury (GCS 6) needs a CT and transfer.",a:["Indications for intubation and RSI technique.","Targets: SpO2, PaCO2, BP, CPP, Na, glucose.","ICP management including osmotherapy.","Transfer standards.","What not to do (steroids, hyperventilation)."],fu:"What SBP would you target in a 72-year-old?"},
 {st:"SOE 3 · Anaesthesia",q:"Subarachnoid haemorrhage: grading, complications and anaesthesia for coiling.",a:["WFNS and Fisher.","Rebleeding, vasospasm, hydrocephalus, hyponatraemia.","Nimodipine and induced hypertension.","Anaesthetic priorities for coiling/clipping.","ICU care."],fu:"How do you differentiate cerebral salt wasting from SIADH?"},
 {st:"SOE 3 · Anaesthesia",q:"Category 1 caesarean section for fetal bradycardia in a woman with a predicted difficult airway.",a:["Communication and decision (neuraxial vs GA).","Preparation and aspiration prophylaxis.","RSI, videolaryngoscopy, OAA/DAS failed intubation algorithm.","Wake vs proceed decision.","Awareness prevention and uterotonics."],fu:"When would you proceed with surgery on a second-generation SGA?"},
 {st:"SOE 3 · Anaesthesia",q:"Severe pre-eclampsia: management and anaesthetic implications.",a:["Definition and pathophysiology.","BP control and magnesium.","Fluids and monitoring.","Neuraxial vs GA; platelets.","Eclampsia and HELLP."],fu:"How would you blunt the pressor response to laryngoscopy?"},
 {st:"SOE 3 · Anaesthesia",q:"Major postpartum haemorrhage after vaginal delivery.",a:["Definitions and causes (4 Ts).","Immediate resuscitation and MOH.","Uterotonics with doses.","Blood products, fibrinogen, TXA, cell salvage.","Surgical options and ICU."],fu:"Why is fibrinogen important in obstetric haemorrhage?"},
 {st:"SOE 3 · Anaesthesia",q:"A 5-week-old with pyloric stenosis is listed as an emergency.",a:["Pathophysiology and biochemistry.","Resuscitation and targets.","Preoperative preparation (NGT).","Induction technique and airway.","Postoperative apnoea and analgesia."],fu:"Explain paradoxical aciduria."},
 {st:"SOE 3 · Anaesthesia",q:"A child with stridor: croup or epiglottitis? How do you manage it?",a:["Differential diagnosis.","Assessment without distressing the child.","Croup medical treatment.","Epiglottitis airway plan in theatre.","Post-intubation care."],fu:"Why is inhalational induction preferred?"},
 {st:"SOE 3 · Anaesthesia",q:"Post-tonsillectomy bleed in a 6-year-old.",a:["Assessment of hypovolaemia.","Resuscitation and blood.","Induction choices (RSI vs inhalational lateral).","Airway management and suction.","Extubation and aftercare."],fu:"Why might blood loss be underestimated?"},
 {st:"SOE 3 · Anaesthesia",q:"Bone cement implantation syndrome during a hemiarthroplasty.",a:["Definition and grades.","Mechanism.","Risk factors.","Prevention (AAGBI/BOA/BGS).","Treatment."],fu:"Would you choose a cemented or uncemented prosthesis in a frail patient?"},
 {st:"SOE 3 · Anaesthesia",q:"During laparoscopic cholecystectomy the peak airway pressure rises suddenly.",a:["Systematic differential: patient, equipment, surgical.","Pneumoperitoneum effects.","Capnothorax/pneumothorax diagnosis and treatment.","Endobronchial intubation, bronchospasm.","CO2 embolism."],fu:"How do you diagnose a capnothorax intra-operatively?"},
 {st:"SOE 3 · Anaesthesia",q:"An elderly man becomes confused and bradycardic during TURP under spinal anaesthesia.",a:["Differential: TURP syndrome, high block, bladder perforation, MI, hypoxia.","TURP syndrome mechanism.","Investigations (Na, osmolality).","Treatment and correction limits.","Prevention."],fu:"What is glycine toxicity?"},
];

const QUIZ=[
 ["Lung resection",[["ppoFEV1 > 60% is low risk",1,""],["VO2 peak < 10 mL/kg/min is very high risk",1,""],["DLCO is not needed",0,"Part of the assessment."],["Right pneumonectomy is lower risk than left",0,"Higher."],["Stair climb > 22 m is reassuring",1,""]]],
 ["One-lung ventilation",[["Left DLTs are preferred",1,""],["HPV is enhanced by high-dose volatiles",0,"Inhibited."],["CPAP to the operative lung improves oxygenation",1,""],["Tidal volumes of 10 mL/kg are recommended",0,"4–6 mL/kg."],["Fibreoptic confirmation is advised",1,""]]],
 ["Cardiac",[["ACT > 480 s before CPB",1,""],["IABP inflates during systole",0,"Diastole (dicrotic notch)."],["Aortic regurgitation contraindicates IABP",1,""],["Tamponade: keep HR fast",1,""],["Positive pressure ventilation is ideal before draining tamponade",0,"Avoid if possible."]]],
 ["Vascular",[["The ACoA connects the anterior cerebral arteries",1,""],["GALA showed LA superior",0,"No difference."],["Stump pressure > 40–50 mmHg is reassuring",1,""],["Unclamping causes hypertension",0,"Hypotension."],["Permissive hypotension is used in ruptured AAA",1,""]]],
 ["Neuro",[["CPP target is 60–70 mmHg",1,""],["Prolonged hyperventilation is recommended",0,"Only briefly for herniation."],["MEPs need TIVA without NMB",1,""],["Nimodipine is given for 21 days",1,""],["Vasospasm peaks on day 1",0,"Days 4–14."]]],
 ["Pregnancy physiology",[["FRC falls in pregnancy",1,""],["PaCO2 rises in pregnancy",0,"Falls to ~4 kPa."],["Plasma cholinesterase falls",1,""],["MAC increases",0,"Decreases."],["Fibrinogen rises",1,""]]],
 ["Caesarean section",[["Phenylephrine infusion treats spinal hypotension",1,""],["Block height T10 is adequate",0,"T4."],["Category 1 is within 30 min",1,""],["Awareness risk is higher than in general surgery",1,""],["Ergometrine is safe in pre-eclampsia",0,"Contraindicated."]]],
 ["Pre-eclampsia",[["MgSO4 load is 4 g",1,""],["Patellar reflexes are lost at ~5 mmol/L Mg",1,""],["Fluid loading prevents pulmonary oedema",0,"Restrict fluids."],["Laryngoscopy can cause intracranial haemorrhage",1,""],["Calcium reverses magnesium toxicity",1,""]]],
 ["PPH",[["Atony is the commonest cause",1,""],["Major PPH is > 1000 mL",1,""],["Carboprost is safe in asthma",0,"Bronchospasm risk."],["Fibrinogen < 2 g/L predicts severe bleeding",1,""],["TXA is most effective after 6 h",0,"Within 3 h."]]],
 ["Paediatrics",[["Children may drink clear fluids until 1 h before",1,""],["Hypotonic maintenance fluids are recommended",0,"Isotonic."],["Bradycardia is a sign of hypoxia",1,""],["APLS weight for 4 years ≈ 16 kg",1,""],["Ex-prems need apnoea monitoring",1,""]]],
 ["Paediatric emergencies",[["Pyloric stenosis causes metabolic alkalosis",1,""],["Pyloric stenosis is a surgical emergency",0,"Medical (resuscitate first)."],["Epiglottitis causes a barking cough",0,"Croup does."],["Croup is treated with dexamethasone",1,""],["Tonsil bleed patients have a full stomach",1,""]]],
 ["ENT",[["Transtracheal jet ventilation risks barotrauma",1,""],["THRIVE prevents CO2 rise",0,"CO2 rises."],["Laryngectomy patients are oxygenated via the stoma",1,""],["Jet ventilation needs a gas exit route",1,""],["Nasal intubation is preferred with basal skull fracture",0,"Relative contraindication."]]],
 ["Orthopaedics",[["Tourniquet release lowers BP",1,""],["Tourniquet time should be ≤ 2 h",1,""],["BCIS grade 3 requires CPR",1,""],["BCIS risk is lower in ASA 4 patients",0,"Higher."],["Fat embolism presents at 24–72 h",1,""]]],
 ["Laparoscopy and TURP",[["Pneumoperitoneum raises SVR",1,""],["CO2 embolism causes a rise in EtCO2 first",0,"Sudden fall."],["Glycine 1.5% is hypotonic",1,""],["Bipolar saline resection reduces hyponatraemia",1,""],["Spinal anaesthesia masks TURP syndrome",0,"Allows early detection."]]],
];

const CRISIS=[
 ["Hypoxaemia during one-lung ventilation","abp",["FiO2 1.0; confirm SpO2 trace and haemodynamics.","Fibreoptic check of DLT/blocker; suction secretions/blood.","Recruitment and PEEP to the ventilated lung; check for bronchospasm or pneumothorax on the dependent side.","CPAP 5–10 cmH2O O2 to the operative lung; reduce volatile/TIVA; correct Hb and cardiac output.","Intermittent two-lung ventilation; surgical clamping of the pulmonary artery."],"Shunt through the non-ventilated lung; HPV reduces it."],
 ["Maternal cardiac arrest","spo2",["Call 2222 'maternal cardiac arrest' (obstetric, anaesthetic, neonatal teams).","CPR with manual left uterine displacement; standard ALS drugs and energies; early intubation by experienced anaesthetist.","IV/IO access above the diaphragm; look for causes (haemorrhage, AFE, LAST, magnesium, high block, eclampsia, PE, cardiac).","Perimortem caesarean (resuscitative hysterotomy) by 5 min if ≥ 20 weeks and no ROSC by 4 min, at the site of arrest.","Massive transfusion if bleeding; lipid if LAST; calcium if magnesium toxicity; debrief."],"Aortocaval compression limits venous return; delivery improves CPR effectiveness."],
 ["Obstetric failed intubation (OAA/DAS 2015)","spo2",["Call for help; maximum two attempts at laryngoscopy (third by experienced); maintain cricoid force (reduce if impeding view).","Failed intubation: insert second-generation SGA (or facemask) and oxygenate.","Decide: wake (if maternal/fetal condition allows) or proceed with surgery via SGA (if life-threatening).","CICO: front-of-neck access (scalpel–bougie–tube).","Document, inform, airway alert."],"Pregnancy airway oedema, reduced FRC and aspiration risk make failed intubation more dangerous."],
 ["Major obstetric haemorrhage","spo2",["Call for help; activate MOH protocol; ABC, O2, two large-bore cannulae, warmed fluids.","Uterotonics: oxytocin, ergometrine, carboprost, misoprostol; TXA 1 g; bimanual compression.","Blood: group O negative/group-specific, then crossmatched; fibrinogen if < 2 g/L (or FIBTEM); FFP/platelets as guided.","Theatre: examination under anaesthesia, balloon tamponade, B-Lynch, IR, hysterectomy; cell salvage.","Keep warm, Ca²⁺ > 1, monitor lactate; ICU; debrief."],"Uterine blood flow at term ~700 mL/min: haemorrhage can be rapid."],
 ["Eclamptic seizure","spo2",["Call for help; left lateral position; airway and O2.","Magnesium sulphate 4 g IV over 5–10 min (2 g if already on magnesium).","Control BP (labetalol, hydralazine, nifedipine) to < 160/110.","Assess fetus; plan delivery once mother stable.","Exclude other causes; monitor Mg toxicity (reflexes, RR, urine output)."],"Cerebral endothelial dysfunction, vasospasm and oedema."],
 ["Paediatric laryngospasm","etco2",["Stop stimulation; call for help; 100% O2 with CPAP via tight facemask; jaw thrust (Larson's point).","Deepen anaesthesia: propofol 0.5–1 mg/kg IV.","Persistent: suxamethonium 0.5–1 mg/kg IV (4 mg/kg IM if no IV) ± atropine 20 µg/kg.","Intubate if required; treat bradycardia (atropine, CPR if HR < 60 with poor perfusion).","After: watch for negative-pressure pulmonary oedema; document."],"Reflex glottic closure triggered by airway stimulation at light planes."],
 ["Post-tonsillectomy haemorrhage","etco2",["Assess: tachycardia, pallor, swallowing, haematemesis (underestimated loss); IV access, bloods, crossmatch, fluid/blood bolus.","Senior anaesthetist and ENT surgeon; two suctions, range of tubes.","RSI (head-down, slight tilt) or inhalational induction in left lateral head-down position.","Control bleeding; pass OGT to empty stomach.","Extubate fully awake in lateral position; HDU if needed."],"Swallowed blood (full stomach) and an obscured airway in a hypovolaemic child."],
 ["Ruptured AAA","abp",["Permissive hypotension (SBP 70–90, mentating); MOH activation; cell salvage; arterial line under LA.","Consider EVAR under LA if anatomy suitable.","Open repair: prep and drape awake, surgeon scrubbed; then cautious induction (ketamine/etomidate/reduced-dose agent + vasopressor).","Rapid proximal control (clamp/balloon); then fluids, products, warming.","Unclamping: anticipate hypotension, acidosis, hyperkalaemia; ICU."],"Tamponade by retroperitoneum and sympathetic tone keep the patient alive until induction."],
 ["Bone cement implantation syndrome","ecg",["Anticipate at cementing; surgeon announces; 100% O2.","Recognise hypoxia, hypotension, ↓ EtCO2, arrhythmia.","Fluids; vasopressors and inotropes for RV failure (noradrenaline, adrenaline, consider milrinone/iNO).","Cardiac arrest: ALS (consider PE-like physiology).","Prevention: identify risk, lavage, venting, avoid hypovolaemia, invasive monitoring."],"Embolic load and mediator release raise PVR and cause RV failure."],
 ["TURP syndrome","ecg",["Stop surgery and irrigation; ask surgeon to finish quickly.","100% O2; check Na⁺, osmolality, glucose, Hb (blood gas).","Fluid overload: furosemide; ventilation support if pulmonary oedema.","Severe symptomatic hyponatraemia (seizures, coma): 3% NaCl 150 mL bolus, recheck (limit rise 8–10 mmol/L/24 h).","Seizures: benzodiazepine, magnesium; ICU."],"Absorption of hypotonic glycine irrigation: hyponatraemia, hypo-osmolality, overload."],
 ["Venous / CO2 gas embolism","nibp",["Recognise: sudden fall in EtCO2, hypotension, arrhythmia, desaturation (sitting craniotomy, laparoscopy, central lines).","Stop the source: flood surgical field (neuro), stop insufflation (laparoscopy); 100% O2, stop N2O.","Position: head down, left lateral (Durant) if possible; jugular compression (neuro).","Aspirate via multi-orifice CVC; vasopressors and inotropes; CPR if arrest.","Consider paradoxical embolism (PFO): hyperbaric O2 referral."],"Gas lock in the right ventricular outflow tract obstructs pulmonary flow."],
];

const SRC="";
const ERR="";
const REFS="";

const DIAG=`<div class="grid2">
 <div class="fig" style="grid-column:1/-1"><h3>One-lung ventilation: shunt and oxygenation</h3>
  <div class="ctl"><label>FiO2 <input type="range" id="ol-f" min="0.3" max="1" step="0.05" value="0.8"><output id="ol-f-o"></output></label>
   <label>HPV strength (% of flow diverted) <input type="range" id="ol-h" min="0" max="60" step="5" value="45"><output id="ol-h-o"></output></label>
   <label>Cardiac output L/min <input type="range" id="ol-c" min="2" max="8" step="0.5" value="5"><output id="ol-c-o"></output></label>
   <label>Hb g/dL <input type="range" id="ol-b" min="7" max="16" step="0.5" value="13"><output id="ol-b-o"></output></label></div>
  <div class="ctl"><div class="seg" id="ol-cp"></div></div>
  <div class="svgbox"><svg id="ol" viewBox="0 0 900 260" role="img" aria-label="OLV model"></svg></div>
  <div class="readout" id="ol-r"></div></div>

 <div class="fig"><h3>IABP timing</h3>
  <div class="seg" id="ia-sel"></div>
  <div class="svgbox"><svg id="ia" viewBox="0 0 520 280" role="img" aria-label="IABP"></svg></div>
  <div class="readout" id="ia-r"></div></div>

 <div class="fig"><h3>Circle of Willis and carotid clamping</h3>
  <div class="ctl" id="cw-box" style="flex-direction:column;align-items:flex-start;gap:4px"></div>
  <div class="svgbox"><svg id="cw" viewBox="0 0 520 440" role="img" aria-label="Circle of Willis"></svg></div>
  <div class="readout" id="cw-r"></div></div>

 <div class="fig"><h3>Magnesium levels and effects</h3>
  <div class="ctl"><label>Plasma Mg²⁺ mmol/L <input type="range" id="mg-l" min="0.7" max="14" step="0.1" value="3"><output id="mg-l-o"></output></label></div>
  <div class="svgbox"><svg id="mg" viewBox="0 0 520 280" role="img" aria-label="Magnesium"></svg></div>
  <div class="readout" id="mg-r"></div></div>

 <div class="fig" style="grid-column:1/-1"><h3>Postpartum haemorrhage escalation</h3>
  <div class="ctl"><label>Estimated blood loss mL <input type="range" id="pp-v" min="0" max="3500" step="50" value="1200"><output id="pp-v-o"></output></label>
   <label>Heart rate <input type="range" id="pp-h" min="60" max="160" step="5" value="110"><output id="pp-h-o"></output></label>
   <label>Systolic BP <input type="range" id="pp-s" min="50" max="150" step="5" value="100"><output id="pp-s-o"></output></label></div>
  <div class="svgbox"><svg id="pp" viewBox="0 0 900 160" role="img" aria-label="PPH"></svg></div>
  <div class="readout" id="pp-r"></div></div>
</div>`;

function initDiagrams(){
 const out=(id,t)=>{const o=$("#"+id+"-o");if(o)o.textContent=t};
 const mk=svg=>(t,a,tx)=>{const e=document.createElementNS(SVGNS,t);for(const k in a)e.setAttribute(k,a[k]);if(tx!=null)e.textContent=tx;svg.append(e);return e};

 /* 1. OLV */
 let olC="none";
 function olPa(F,hpv,co,hb,cp){const PA=F*(101.3-6.3)-5.3/0.8;let s=0.40*(1-hpv/100);if(cp==="cpap5")s*=0.6;if(cp==="cpap10")s*=0.4;if(cp==="tlv")s=0.08;const cc=contentO2(Math.max(PA,1),hb);const d=250/(co*10);const ca=cc-s*d/(1-s);return {pa:pFromContent(Math.max(1,ca),hb),s,ca,PA}}
 function drawOL(){const F=+$("#ol-f").value,h=+$("#ol-h").value,co=+$("#ol-c").value,hb=+$("#ol-b").value;out("ol-f",F.toFixed(2));out("ol-h",h);out("ol-c",co);out("ol-b",hb);
  const r=olPa(F,h,co,hb,olC);const svg=$("#ol");svg.innerHTML="";
  const P=plot(svg,{w:900,h:260,x0:0.3,x1:1,y0:0,y1:60,xt:[0.3,0.4,0.5,0.6,0.7,0.8,0.9,1],yt:[0,8,15,30,45,60],xl:"FiO2",yl:"PaO2 (kPa)"});
  [["none","var(--abp)"],["cpap5","var(--etco2)"],["cpap10","var(--spo2)"],["tlv","var(--good)"]].forEach(([c,col])=>P.line(range(0.3,1,70).map(f=>[f,Math.min(60,olPa(f,h,co,hb,c).pa)]),{stroke:col,"stroke-width":c===olC?3:1.3,"stroke-dasharray":c===olC?"":"4 3"}));
  P.add("line",{x1:P.X(0.3),x2:P.X(1),y1:P.Y(8),y2:P.Y(8),stroke:"var(--bad)","stroke-dasharray":"2 3"});P.text(0.8,5.5,"PaO2 8 kPa (SpO2 ~90%)",{fill:"var(--bad)","font-size":"10"});
  P.dot(F,Math.min(60,r.pa),"var(--ink)",r.pa.toFixed(1)+" kPa");
  const sat=contentO2(r.pa,hb)>0?Math.min(100,100*(r.ca-0.0225*r.pa)/(1.34*hb)):0;
  $("#ol-r").innerHTML=`Shunt fraction <b>${(r.s*100).toFixed(0)}%</b> (non-ventilated lung receives 40% of CO without HPV). PaO2 ≈ <b>${r.pa.toFixed(1)} kPa</b>, SaO2 ≈ ${sat.toFixed(0)}%. With a large shunt, raising FiO2 helps little (curves flatten); reducing the shunt (HPV, CPAP to the operative lung, two-lung ventilation) or raising mixed venous O2 (higher CO and Hb) helps more. Lines: no CPAP (red), CPAP 5 (amber), CPAP 10 (cyan), two-lung ventilation (green). Teaching model (VO2 250 mL/min, PaCO2 5.3 kPa).`}
 seg($("#ol-cp"),[["none","No CPAP"],["cpap5","CPAP 5 to operative lung"],["cpap10","CPAP 10"],["tlv","Two-lung ventilation"]],k=>{olC=k;drawOL()},"none");["#ol-f","#ol-h","#ol-c","#ol-b"].forEach(x=>$(x).oninput=drawOL);

 /* 2. IABP */
 function drawIA(k){const svg=$("#ia");svg.innerHTML="";const T=0.8,X1=3*T;const P=plot(svg,{w:520,h:280,x0:0,x1:X1,y0:40,y1:150,xt:[0,0.8,1.6,2.4],yt:[40,60,80,100,120,140],xl:"Time (s): unassisted beat, then assisted beats",yl:"mmHg"});
  const tm={norm:[0.3,0.76],ei:[0.18,0.76],li:[0.42,0.76],ed:[0.3,0.58],ld:[0.3,0.88]}[k];
  const sysAdj={norm:-8,ei:-4,li:-6,ed:-2,ld:+8}[k],edp={norm:-10,ei:-8,li:-8,ed:0,ld:+4}[k];
  const beat=(c,a,ed)=>{const s0=70+ed;if(c<0.06)return s0+(115+a-s0)*Math.sin(Math.PI/2*c/0.06);if(c<0.28)return 115+a-(20)*(c-0.06)/0.22;if(c<0.3)return 95+a-6*(c-0.28)/0.02;if(c<0.32)return 89+a+4*(c-0.3)/0.02;return 70+(23+a)*Math.exp(-(c-0.32)/0.25)};
  const f=t=>{const n=Math.floor(t/T),c=t-n*T;if(n===0)return beat(c,0,0);let p=beat(c,sysAdj,edp);
   if(k==="ld"&&c<0.08)p=Math.max(p,82);
   const [ti,td]=tm;if(c>=ti&&c<Math.min(td,T)){const rise=Math.min(1,(c-ti)/0.06);p=Math.max(p,(beat(ti,sysAdj,edp))+(130-beat(ti,sysAdj,edp))*rise*Math.exp(-Math.max(0,c-ti-0.06)*1.4))}
   if(c>=td&&c<td+0.08)p=Math.min(p,70+edp+6*Math.sin(Math.PI*(c-td)/0.08));if(k==="ei"&&c>=ti&&c<0.3)p-=6;return p};
  P.line(range(0,X1,600).map(t=>[t,f(t)]),{stroke:"var(--abp)"});
  [1,2].forEach(n=>{P.add("line",{x1:P.X(n*T+tm[0]),x2:P.X(n*T+tm[0]),y1:P.Y(40),y2:P.Y(150),stroke:"var(--spo2)","stroke-dasharray":"3 3"});if(tm[1]<T)P.add("line",{x1:P.X(n*T+tm[1]),x2:P.X(n*T+tm[1]),y1:P.Y(40),y2:P.Y(150),stroke:"var(--etco2)","stroke-dasharray":"3 3"})});
  P.text(T+tm[0]+0.02,146,"inflate",{fill:"var(--spo2)","font-size":"10"});if(tm[1]<T)P.text(T+tm[1]-0.2,44,"deflate",{fill:"var(--etco2)","font-size":"10"});
  const txt={norm:"Correct: inflation at the dicrotic notch produces diastolic augmentation (peak above systolic); deflation just before systole lowers the assisted end-diastolic pressure and the next (assisted) systolic pressure: afterload reduction.",ei:"<b>Early inflation</b> (before aortic valve closure): truncates ejection, premature valve closure, reduced stroke volume, increased LV wall stress.",li:"<b>Late inflation</b>: dicrotic notch visible before augmentation; reduced coronary perfusion benefit.",ed:"<b>Early deflation</b>: augmentation is short and pressure falls back before systole: little afterload reduction; possible retrograde coronary flow.",ld:"<b>Late deflation</b>: balloon still inflated as the LV ejects: assisted end-diastolic pressure is higher and the next systole is higher: increased afterload and O2 demand (most dangerous)."}[k];
  $("#ia-r").innerHTML=txt}
 seg($("#ia-sel"),[["norm","Correct"],["ei","Early inflation"],["li","Late inflation"],["ed","Early deflation"],["ld","Late deflation"]],drawIA,"norm");

 /* 3. Circle of Willis */
 const cwOpts=[["clamp","Clamp left ICA (carotid endarterectomy)",true],["noacom","Absent ACoA",false],["nolpcom","Absent left PCoA",false],["lowbp","Hypotension during clamping",false]];
 const box=$("#cw-box");cwOpts.forEach(([k,l,c])=>box.append(el("label",{style:"display:flex;flex-direction:row;align-items:center;gap:6px"},`<input type="checkbox" id="cw-${k}" ${c?"checked":""}> ${l}`)));
 function drawCW(){const on=k=>$("#cw-"+k).checked;const svg=$("#cw");svg.innerHTML="";const add=mk(svg);const N=COW.nodes;
  const absent=new Set();if(on("noacom"))absent.add("ACoA");if(on("nolpcom"))absent.add("L PCoA");
  /* perfusion propagation */
  const src=new Set(["rica","bas"]);if(!on("clamp"))src.add("lica");
  const adj={};COW.edges.forEach(([a,b,l])=>{if(absent.has(l))return;(adj[a]=adj[a]||[]).push(b);(adj[b]=adj[b]||[]).push(a)});
  const hops={};const q=[...src];src.forEach(s=>hops[s]=0);while(q.length){const n=q.shift();(adj[n]||[]).forEach(m=>{if(hops[m]==null){hops[m]=hops[n]+1;q.push(m)}})}
  COW.edges.forEach(([a,b,l])=>{const A=N[a],B=N[b];const ab=absent.has(l);add("line",{x1:A[0],y1:A[1],x2:B[0],y2:B[1],stroke:ab?"var(--line)":"var(--abp)","stroke-width":ab?1.5:4,"stroke-dasharray":ab?"4 4":""});const mx=(A[0]+B[0])/2,my=(A[1]+B[1])/2;add("text",{x:mx+(l==="ACoA"?-14:l==="L PCoA"?-58:8),y:my+(l==="ACoA"?-10:4),class:"lbl","font-size":"10"},l.split("–").length>1&&!["ACoA","L PCoA","R PCoA"].includes(l)?"":l)});
  const LB={lica:"L ICA",rica:"R ICA",lmca:"L MCA",rmca:"R MCA",laca:"L ACA",raca:"R ACA",lpca:"L PCA",rpca:"R PCA",bas:"Basilar"};
  const risk=[];Object.entries(N).forEach(([n,[x,y]])=>{let col="var(--good)";const h=hops[n];if(n==="lica"&&on("clamp"))col="var(--muted)";else if(h==null){col="var(--bad)";risk.push(LB[n])}else if(h>=2&&on("lowbp")&&n!=="lica"){col="var(--warn)";risk.push(LB[n]+" (collateral, BP-dependent)")}add("circle",{cx:x,cy:y,r:14,fill:col,"fill-opacity":0.8,stroke:"var(--ink)"});add("text",{x:x,y:y+30,"text-anchor":"middle",class:"lbl","font-size":"11"},LB[n])});
  if(on("clamp"))add("text",{x:N.lica[0]-20,y:N.lica[1]+55,class:"lbl","font-size":"11",fill:"var(--bad)"},"✕ clamp");
  $("#cw-r").innerHTML=risk.length?`<b>At risk</b>: ${risk.join(", ")}. ${risk.some(r=>!r.includes("collateral"))?"No collateral path: a <b>shunt</b> is needed (low stump pressure / neurological change).":"Collateral flow present but dependent on perfusion pressure: keep BP at or above baseline."}`:"All territories perfused through collaterals (ACoA from the right, PCoA from the basilar). Maintain BP during cross-clamping."}
 cwOpts.forEach(([k])=>$("#cw-"+k).onchange=drawCW);drawCW();

 /* 4. Magnesium */
 function drawMG(){const l=+$("#mg-l").value;out("mg-l",l.toFixed(1));const svg=$("#mg");svg.innerHTML="";const add=mk(svg);const Y=v=>260-v/14*240;
  add("rect",{x:60,y:Y(14),width:60,height:Y(0)-Y(14),fill:"var(--panel)",stroke:"var(--line)"});
  add("rect",{x:60,y:Y(l),width:60,height:Y(0)-Y(l),fill:l>=5?"var(--bad)":l>=2?"var(--good)":"var(--spo2)","fill-opacity":0.7});
  let ly=999;MG.forEach(([v,t])=>{let y=Y(v)+4;if(y>ly-14)y=ly-14;ly=y;add("line",{x1:120,x2:150,y1:Y(v),y2:y-4,stroke:"var(--muted)"});add("text",{x:156,y:y,class:"lbl","font-size":"11","font-weight":l>=v?"700":"400"},t)});
  const cur=MG.filter(m=>l>=m[0]).pop();$("#mg-r").innerHTML=`Mg²⁺ ${l.toFixed(1)} mmol/L: <b>${cur[1]}</b>. Monitor reflexes, respiratory rate (&gt; 12), urine output (&gt; 100 mL/4 h) hourly; reduce or stop the infusion in oliguria. Toxicity: stop infusion, calcium gluconate 10% 10 mL IV over 10 min, ventilate if needed.`}
 $("#mg-l").oninput=drawMG;drawMG();

 /* 5. PPH */
 function drawPP(){const v=+$("#pp-v").value,h=+$("#pp-h").value,s=+$("#pp-s").value;out("pp-v",v);out("pp-h",h);out("pp-s",s);const svg=$("#pp");svg.innerHTML="";const add=mk(svg);const X=x=>40+x/3500*820;
  PPH.forEach(([th,l],i)=>{const nx=i<PPH.length-1?PPH[i+1][0]:3500;add("rect",{x:X(th),y:40,width:X(nx)-X(th),height:40,fill:["var(--good)","var(--warn)","var(--abp)","var(--bad)","var(--nibp)"][i],"fill-opacity":v>=th?0.75:0.2});add("text",{x:X(th)+4,y:100,class:"lbl","font-size":"10"},th+" mL")});
  add("line",{x1:X(v),x2:X(v),y1:30,y2:90,stroke:"var(--ink)","stroke-width":3});add("text",{x:X(v)+4,y:26,class:"lbl"},v+" mL");
  const si=h/s;const stage=PPH.filter(p=>v>=p[0]).pop();
  $("#pp-r").innerHTML=`<b>${stage[1]}.</b> ${stage[2]} Shock index ${si.toFixed(2)} ${si>=1.4?"(<b>severe</b>: act now)":si>=0.9?"(<b>significant loss</b>)":"(normal)"}. ${si>=0.9&&v<1000?"Visual estimates underestimate loss: weigh swabs and trust the physiology.":""}`}
 ["#pp-v","#pp-h","#pp-s"].forEach(x=>$(x).oninput=drawPP);drawPP();
}

ATLAS.register({id:"14",name:"Specialty anaesthesia",
  lede:"Thoracic, cardiac and vascular, neuro and ophthalmic, obstetric, paediatric and ENT, orthopaedic, laparoscopic and urological, day-case and enhanced recovery.",
  barsNote:"",
  bars:BARS,fam:FAM,slides:SLIDES,calcs:CALCS,tables:TABLES,cards:CARDS,fcf:FCF,viva:VIVA,quiz:QUIZ,crisis:CRISIS,
  sources:SRC,errata:ERR,refs:REFS,diagHTML:DIAG,initDiagrams,
  diagLede:"Five specialty models: OLV shunt and oxygenation, IABP timing errors, the circle of Willis during carotid clamping, magnesium levels in pre-eclampsia and a PPH escalation ladder."});
})();
