/* Stage 13 · Medicine & anaesthesia */
(function(){
const {plot,range,el,SVGNS,fmt,$,$$,seg}=ATLAS.h;

const BARS=[];

const FAM={cv:["abp","Cardiovascular"],resp:["spo2","Respiratory & obesity"],endo:["nibp","Endocrine & metabolic"],org:["etco2","Liver, kidney & electrolytes"],neu:["ecg","Neuro, musculoskeletal, haem & elderly"]};

const SLIDES=[
{f:"cv",t:"Preoperative assessment and risk stratification",b:`<ul class="clean"><li><b>Aims</b>: identify and optimise disease, estimate risk, plan anaesthesia and postoperative care level, shared decision-making (including not operating), prehabilitation, consent.</li>
<li><b>Functional capacity</b>: METs (1 at rest = 3.5 mL O2/kg/min; 4 METs = two flights of stairs or walking uphill). Inability to manage 4 METs predicts risk, but self-report is imprecise (METS study 2018): the <b>Duke Activity Status Index</b> (DASI ≤ 34) is better; CPET is objective.</li>
<li><b>Scores</b>: ASA physical status; <b>RCRI</b> (Lee: high-risk surgery, IHD, heart failure, cerebrovascular disease, insulin-treated diabetes, creatinine &gt; 177 µmol/L: 0 = 0.4%, 1 = 0.9%, 2 = 6.6%, ≥ 3 = 11% major cardiac events in the original cohort; higher with troponin surveillance); NSQIP/Gupta MICA; P-POSSUM and NELA (emergency laparotomy); SORT; frailty scales; ARISCAT (pulmonary complications).</li>
<li><b>Guidelines</b>: <b>ESC 2022</b> and <b>ACC/AHA 2024</b>: assess clinical risk and surgical risk; biomarkers (NT-proBNP/BNP, high-sensitivity troponin baseline and 24/48 h after surgery) in patients ≥ 65 or with CV disease/risk factors having intermediate- or high-risk surgery; echo for new murmurs, dyspnoea or suspected heart failure; stress imaging only if it would change management. Don't delay time-sensitive surgery for tests.</li>
<li><b>Routine tests</b> (NICE NG45) are targeted by ASA grade and surgical severity: e.g. FBC and renal function for major surgery or comorbidity; ECG for cardiovascular, renal or diabetic patients having intermediate or major surgery; HbA1c in diabetes; no routine CXR, clotting or urinalysis.</li>
<li><b>Prehabilitation</b>: exercise (aerobic + resistance), nutrition (protein), psychological support, smoking cessation (benefit increases with ≥ 4–8 weeks), alcohol reduction, anaemia correction (IV iron), glycaemic control (HbA1c &lt; 69 mmol/mol for elective surgery).</li>
<li><b>Timing after cardiac events</b>: elective surgery ≥ 60 days after MI (ACC/AHA); ESC 2022 advises deferring elective surgery ~6 months after elective PCI and 12 months after ACS on DAPT (earlier only for time-sensitive surgery, after cardiology discussion).</li></ul>`,
p:"Use the cardiac risk diagram: tick RCRI factors, functional capacity and surgery risk to see the suggested work-up.",
v:"Structure: history (cardiac, respiratory, airway, drugs, functional capacity), examination, scores, investigations by guideline, optimisation, plan and level of care."},
{f:"cv",t:"Cardiopulmonary exercise testing",b:`<ul class="clean"><li><b>Method</b>: cycle ergometer ramp protocol with breath-by-breath VO2, VCO2, minute ventilation, ECG, BP and SpO2. Objective integrated assessment of cardiac, respiratory, circulatory and muscle function.</li>
<li><b>Anaerobic threshold (AT)</b>: the VO2 above which anaerobic metabolism supplements aerobic (lactate buffered by bicarbonate, so VCO2 rises faster than VO2: V-slope method). Effort-independent. <b>AT &lt; 11 mL/kg/min</b> (Older 1993) identifies higher risk after major surgery; &lt; 8 very high.</li>
<li><b>Peak VO2</b> (effort-dependent): &lt; 15 mL/kg/min high risk; &lt; 10 very high (lung resection: &lt; 10 mL/kg/min or &lt; 35% predicted contraindicates major resection without discussion).</li>
<li><b>Ventilatory efficiency</b>: VE/VCO2 at AT &gt; 34 (inefficient ventilation: heart failure, pulmonary vascular disease) predicts mortality after abdominal aortic surgery.</li>
<li><b>Other findings</b>: ischaemia (ST changes, flattening of O2 pulse), arrhythmias, exercise desaturation, chronotropic incompetence, poor effort.</li>
<li><b>Uses</b>: risk stratification and consent, deciding on level of postoperative care, guiding prehabilitation (and re-testing), cancer surgery (oesophagectomy, colorectal, hepatobiliary), aortic aneurysm repair, lung resection.</li>
<li><b>Contraindications</b>: recent MI or unstable angina, uncontrolled arrhythmia, symptomatic severe AS, acute PE, uncontrolled heart failure, inability to cycle.</li></ul>`,
p:"Remember the numbers: AT 11, VO2 peak 15, VE/VCO2 34. Use the calculator to convert DASI to estimated VO2 peak.",
v:"What is measured, define AT and how it's found, thresholds and evidence, uses, contraindications."},
{f:"cv",t:"Ischaemic heart disease and heart failure",b:`<ul class="clean"><li><b>Myocardial O2 supply</b> (CPP = diastolic BP − LVEDP; diastolic time; arterial O2 content) vs <b>demand</b> (HR, wall tension (preload, afterload), contractility). Tachycardia worsens both sides.</li>
<li><b>Anaesthetic goals</b>: avoid tachycardia, hypotension, hypertension, hypoxaemia, anaemia (Hb &gt; 80–90 g/L in IHD; MINT 2023 suggests liberal (100 g/L) after MI), hypothermia, pain and shivering. Continue β-blockers, statins, aspirin (unless intracranial/high bleed risk). Consider arterial line for major surgery; regional anaesthesia to reduce stress response.</li>
<li><b>Coronary stents</b>: do not stop DAPT early without cardiology input (Stage 9); operate where PCI is available.</li>
<li><b>Myocardial injury after non-cardiac surgery (MINS)</b>: troponin rise within 30 days from ischaemia, usually silent (VISION study: 8% of patients, strongly associated with 30-day mortality). Surveillance in high-risk patients; manage with cardiology, aspirin, statin, β-blocker, address causes (anaemia, hypotension, tachycardia); MANAGE trial (dabigatran) reduced vascular events.</li>
<li><b>Postoperative MI</b>: type 2 (supply–demand) commonest; STEMI needs urgent PCI discussion despite surgery.</li>
<li><b>Heart failure</b>: classify by EF (reduced &lt; 40%, mildly reduced, preserved ≥ 50%) and NYHA I–IV. Decompensated HF: postpone elective surgery. Drugs: ACEi/ARB/ARNI, β-blocker, MRA, <b>SGLT2 inhibitor</b> (stop 3–4 days before), diuretics; devices (ICD, CRT). Risks: hypotension with induction (reduced, slower doses), arrhythmias, fluid overload; consider invasive monitoring and HDU/ICU.</li>
<li><b>Cardiomyopathies</b>: HOCM (dynamic LVOT obstruction: maintain preload and afterload, slow HR, avoid inotropes and vasodilators; phenylephrine and β-blockers help), dilated (reduce afterload carefully, inotropes), restrictive (maintain preload and HR).</li></ul>`,
p:"Typical exam questions: '60-year-old with HTN, IHD and heart failure for radical mastectomy: continue β-blockers and ACEi?', 'Breast surgery with AS, CAD not stentable, heart failure'.",
v:"Supply–demand, goals, drugs and stents, MINS and postoperative MI, heart failure classification and plan, cardiomyopathy goals."},
{f:"cv",t:"Valvular heart disease",b:`<ul class="clean"><li><b>Aortic stenosis</b>: severe = AVA &lt; 1.0 cm² (indexed &lt; 0.6 cm²/m²), mean gradient ≥ 40 mmHg, peak velocity ≥ 4 m/s (low-flow low-gradient AS: low EF, dobutamine echo). Symptoms (angina, syncope, dyspnoea) carry high mortality. Fixed outflow obstruction, concentric LVH (stiff ventricle, atrial kick ~40% of filling, subendocardial ischaemia).
<ul class="clean"><li>Goals: <b>sinus rhythm, HR 60–80, maintain preload and SVR</b> (phenylephrine/metaraminol ready), avoid hypotension (coronary perfusion falls → ischaemia → LV failure spiral), avoid tachycardia. Arterial line before induction for major cases; cautious slow induction (etomidate/low-dose propofol + opioid).</li>
<li>Neuraxial: not absolutely contraindicated; titrated epidural or low-dose CSE with vasopressor infusion; single-shot full-dose spinal risky. Hip fracture with severe AS: don't delay for echo; low-dose spinal or GA with careful haemodynamics plus fascia iliaca block.</li>
<li>Symptomatic severe AS: valve intervention (TAVI or AVR) before elective non-cardiac surgery; asymptomatic severe AS: proceed with low/intermediate-risk surgery with care.</li></ul></li>
<li><b>Mitral stenosis</b> (rheumatic; severe &lt; 1.0 cm²): fixed LV filling; LA and pulmonary hypertension, AF. Goals: <b>slow HR</b> (diastolic filling time), maintain preload, avoid rises in PVR (hypoxia, hypercapnia, acidosis), maintain SVR, rate control in AF.</li>
<li><b>Aortic regurgitation</b> and <b>mitral regurgitation</b> (volume overload): goals <b>faster HR</b> (shorter diastole: less regurgitation for AR), <b>lower SVR</b>, maintain preload and contractility; avoid bradycardia and vasoconstriction.</li>
<li><b>Prosthetic valves</b>: mechanical valves need anticoagulation bridging (mitral or older aortic valves: high thrombotic risk); bioprosthetic need none long term. <b>Endocarditis prophylaxis</b>: NICE does not recommend routine antibiotic prophylaxis for dental or GI/GU procedures; ESC recommends it for high-risk patients (prosthetic valves, previous IE, some congenital disease) undergoing dental procedures.</li></ul>`,
p:"Typical exam questions: 'Aortic stenosis for hemi-arthroplasty' (×3), 'Aortic stenosis for knee surgery', 'Aortic stenosis: aetiology, symptoms, signs and anaesthetic management'.",
v:"For each lesion: grading, pathophysiology (draw PV loop if asked), haemodynamic goals (HR, rhythm, preload, SVR, contractility), technique choice, monitoring, postoperative care."},
{f:"cv",t:"Arrhythmias, conduction disease and pulmonary hypertension",b:`<ul class="clean"><li><b>Atrial fibrillation</b>: rate control (&lt; 110 at rest) before elective surgery; continue rate-control drugs; anticoagulation plan by CHA2DS2-VASc and bleeding risk (bridge only if very high risk: BRIDGE trial). New intraoperative AF: correct K⁺ (4–5), Mg²⁺, hypovolaemia, hypoxia, light anaesthesia, surgical stimulation; synchronised DC cardioversion if unstable; amiodarone or β-blocker if stable.</li>
<li><b>Conduction block</b>: first-degree and Mobitz I usually benign. <b>Bifascicular block</b> (RBBB + left anterior or posterior fascicular block) and "trifascicular" block (bifascicular + first-degree AV block): no prophylactic pacing if asymptomatic (risk of progression under anaesthesia is low); have transcutaneous pacing available. <b>Mobitz II</b> and <b>complete heart block</b>: need pacing before elective surgery (temporary wire or permanent pacemaker).</li>
<li><b>WPW</b>: avoid AV nodal blockers in pre-excited AF (adenosine, verapamil, digoxin); use procainamide/amiodarone or DC cardioversion. <b>Long QT</b>: avoid QT-prolonging drugs (ondansetron, droperidol, volatiles in congenital LQTS), maintain K⁺/Mg²⁺, β-blockade, magnesium for torsades.</li>
<li><b>Pulmonary hypertension</b> (mPAP &gt; 20 mmHg at rest, PVR &gt; 2 Wood units: ESC/ERS 2022): high perioperative mortality from RV failure. Goals: avoid hypoxaemia, hypercapnia, acidosis, hypothermia, pain, high airway pressures; maintain SVR &gt; PVR (noradrenaline, vasopressin), avoid tachyarrhythmias and RV volume overload; continue pulmonary vasodilators (sildenafil, bosentan, prostacyclins: never interrupt IV epoprostenol); inhaled NO or iloprost for crises; specialist centre for elective surgery.</li></ul>`,
p:"Typical exam questions: 'Patient with trifascicular block on ECG with neck of femur fracture for management under GA'. Answer: no pre-op pacing if asymptomatic; pads on; atropine and isoprenaline ready.",
v:"AF management and anticoagulation; classify conduction blocks and pacing indications; WPW and long QT; pulmonary hypertension pathophysiology and goals."},
{f:"resp",t:"Respiratory disease: COPD, asthma and postoperative pulmonary complications",b:`<ul class="clean"><li><b>Assessment</b>: symptoms, exacerbations, exercise tolerance, smoking, sputum, home O2, steroid use, admissions/ICU; spirometry (FEV1, FEV1/FVC), ABG if severe (CO2 retention), CXR if symptoms change, echo if pulmonary hypertension suspected (cor pulmonale).</li>
<li><b>Optimisation</b>: treat infection, bronchodilators, inhaled/oral steroids, smoking cessation (any duration helps; ≥ 4–8 weeks for pulmonary benefit; carboxyhaemoglobin falls within 12–24 h), pulmonary rehabilitation, nutrition, vaccinate.</li>
<li><b>Anaesthesia</b>: regional where possible (avoid high blocks impairing expiratory muscles), avoid airway instrumentation triggers (deep extubation, LMA), bronchodilating agents (sevoflurane, propofol, ketamine), avoid histamine releasers; ventilation with low RR, long expiratory time, avoid dynamic hyperinflation (intrinsic PEEP), permissive hypercapnia; lung-protective VT 6–8 mL/kg IBW, PEEP; humidification; full reversal (quantitative TOF).</li>
<li><b>Postoperative pulmonary complications (PPCs)</b>: atelectasis, pneumonia, bronchospasm, respiratory failure, aspiration. Risk factors (ARISCAT): age, low SpO2, respiratory infection in last month, anaemia, upper abdominal or thoracic surgery, duration &gt; 2 h, emergency. Prevention: lung-protective ventilation, avoid residual block, early mobilisation, physiotherapy and incentive spirometry, good analgesia (epidural/regional), CPAP/HFNO, head-up positioning.</li>
<li><b>Interstitial lung disease</b>: restrictive pattern, reduced DLCO, pulmonary hypertension; risk of acute exacerbation after surgery; avoid high FiO2 and volutrauma (bleomycin, amiodarone, paraquat history: O2 toxicity).</li></ul>`,
p:"Typical exam questions: '67-year-old COPD smoker for nephrectomy in lateral position: causes of postoperative dyspnoea', 'Obese asthmatic for laparoscopy', 'COPD with lung cancer for pneumonectomy' (lung resection assessment is covered in Stage 14).",
v:"Assessment, optimisation, anaesthetic choice and ventilation, PPC risk and prevention."},
{f:"resp",t:"Obesity and obstructive sleep apnoea",b:`<ul class="clean"><li><b>Classification</b> (BMI): overweight 25–29.9, obese class I 30–34.9, II 35–39.9, III ≥ 40 (morbid). Central (android) obesity and metabolic syndrome carry the greatest risk.</li>
<li><b>Physiology</b>: ↓ FRC (supine, after induction; closing capacity exceeds FRC: shunt), ↓ compliance, ↑ work of breathing and O2 consumption, rapid desaturation; ↑ blood volume and cardiac output, hypertension, LVH, heart failure, AF, pulmonary hypertension; obesity hypoventilation syndrome (daytime PaCO2 &gt; 6 kPa); NAFLD; diabetes; GORD; VTE risk.</li>
<li><b>OSA</b>: STOP-BANG screening (≥ 5 high risk; Stage diagram); confirmed by polysomnography (AHI: mild 5–15, moderate 15–30, severe &gt; 30). Bring CPAP and use it postoperatively; minimise opioids and sedatives; monitor SpO2 continuously; nurse semi-upright.</li>
<li><b>Airway</b>: difficult mask ventilation and (less consistently) intubation; ramped position (tragus level with sternal notch), head-up 25–30°, preoxygenation with CPAP/HFNO, videolaryngoscopy, awake intubation when indicated. Neck circumference &gt; 40 cm is a predictor.</li>
<li><b>Drugs</b> (Stage 5): induction and opioids by lean body weight; suxamethonium by total body weight; rocuronium by ideal body weight (sugammadex by actual or adjusted weight); propofol infusion by adjusted/lean weight; LMWH prophylaxis increased doses.</li>
<li><b>Ventilation</b>: VT 6–8 mL/kg <b>ideal</b> body weight, PEEP 8–10+ with recruitment, reverse Trendelenburg; extubate fully awake, sitting up, after quantitative TOFR ≥ 0.9.</li>
<li><b>Other</b>: equipment (tables, gowns, cuffs, long needles), pressure areas, rhabdomyolysis in long cases, regional anaesthesia (more difficult but valuable; ultrasound), bariatric surgery (Society for Obesity and Bariatric Anaesthesia (SOBA) guidance), drug absorption after bypass surgery.</li></ul>`,
p:"Typical exam questions: 'Morbid obesity', 'Morbid obese (awake intubation)', 'Morbidly obese patient for hiatus hernia'.",
v:"Definitions, physiology by system, OSA screening and management, airway plan, drug dosing scalars, ventilation, recovery and ward care."},
{f:"endo",t:"Thyroid and parathyroid disease",b:`<ul class="clean"><li><b>Hyperthyroidism</b> (Graves', toxic nodules, thyroiditis, amiodarone): tachycardia, AF, heart failure, weight loss, tremor, eye disease. Make euthyroid before elective surgery (carbimazole or propylthiouracil 6–8 weeks; propranolol for symptoms; Lugol's iodine 10 days before thyroidectomy to reduce vascularity). Emergency surgery: β-blockade, antithyroid drugs, steroids.</li>
<li><b>Thyroid storm</b>: hyperthermia, tachycardia/AF, heart failure, agitation, vomiting, diarrhoea (Burch–Wartofsky score); triggered by surgery, infection, iodine; distinguish from MH (no rigidity, no rapid CO2 rise), phaeo, sepsis.</li>
<li><b>Hypothyroidism</b>: bradycardia, low cardiac output, hypothermia, hyponatraemia, hypoglycaemia, slow drug metabolism, macroglossia, pericardial effusion, reduced ventilatory responses. Elective surgery: euthyroid first; mild hypothyroidism is not a reason to delay urgent surgery. <b>Myxoedema coma</b>: hydrocortisone first, then IV T3/T4 cautiously, supportive care.</li>
<li><b>Goitre and airway</b>: assess symptoms (stridor, positional dyspnoea, dysphagia, voice change), CT for tracheal compression or retrosternal extension, nasendoscopy for cord function; plan: awake fibreoptic or videolaryngoscopy with specialist tubes (reinforced), inhalational induction or awake techniques, rigid bronchoscope and cardiothoracic backup for retrosternal goitre; tracheomalacia after removal is rare.</li>
<li><b>Thyroidectomy complications</b>: haemorrhage with airway compression (SCOOP: skin exposure, cut sutures, open skin, open muscles, pack), RLN injury (unilateral hoarseness; bilateral stridor), hypocalcaemia (parathyroid injury: perioral tingling, Chvostek, Trousseau, laryngospasm), thyroid storm, pneumothorax.</li>
<li><b>Hyperparathyroidism</b> (hypercalcaemia: dehydration, polyuria, renal stones, short QT, NMB variable response): rehydrate, bisphosphonates, calcitonin; cinacalcet. Hypoparathyroidism: hypocalcaemia (prolonged QT, laryngospasm, tetany): IV calcium gluconate.</li></ul>`,
p:"Typical exam questions: 'Airway assessment for a patient with goitre and hypothyroidism', 'Hypothyroidism and hyperthyroidism anaesthetic implications'.",
v:"Pathophysiology and features, preparation for surgery, storm and coma management, airway plan for goitre, complications of thyroidectomy, calcium disorders."},
{f:"endo",t:"Adrenal disease and phaeochromocytoma",b:`<ul class="clean"><li><b>Cushing's syndrome</b> (exogenous steroids commonest, ACTH-secreting pituitary adenoma, adrenal tumour, ectopic ACTH): hypertension, diabetes, obesity, OSA, hypokalaemia, osteoporosis, fragile skin, poor healing, infection. <b>Conn's</b> (primary hyperaldosteronism): hypertension, hypokalaemia, metabolic alkalosis: spironolactone and K⁺ replacement before surgery.</li>
<li><b>Adrenal insufficiency</b> (Addison's, steroid withdrawal, pituitary): hypotension, hyponatraemia, hyperkalaemia (primary), hypoglycaemia; adrenal crisis triggered by surgery or illness. Steroid cover (Stage 9).</li>
<li><b>Phaeochromocytoma/paraganglioma</b> (chromaffin cells; ~10% malignant, bilateral, extra-adrenal, familial (MEN2, VHL, NF1, SDH)): paroxysmal headache, sweating, palpitations, hypertension (or normotension), flushing is less typical (pallor commoner). Diagnosis: plasma free or urinary metanephrines, then CT/MRI, MIBG or PET.</li>
<li><b>Preparation</b>: <b>α-blockade first</b> (phenoxybenzamine: non-selective, irreversible; or doxazosin: selective, competitive) for 10–14 days, liberal salt and fluid to re-expand volume; then β-blockade (never before α: unopposed α vasoconstriction and heart failure) for tachycardia. Roizen criteria: BP &lt; 160/90 for 24 h, orthostatic hypotension not below 80/45, no ST changes for a week, ≤ 1 VE per 5 min. Echo (catecholamine cardiomyopathy).</li>
<li><b>Intraoperative</b>: arterial line before induction, central access, deep anaesthesia before laryngoscopy, avoid triggers (histamine releasers (morphine, atracurium), metoclopramide, droperidol, ephedrine, ketamine, suxamethonium fasciculation, desflurane surges, abdominal pressure). Hypertension during tumour handling: phentolamine 1–2 mg, SNP, GTN, magnesium (4 g then 1–2 g/h), short-acting β-blockers (esmolol) after α control, clevidipine/nicardipine. After venous ligation: <b>hypotension</b> (fluids, noradrenaline, vasopressin) and <b>hypoglycaemia</b> (insulin rebound).</li>
<li><b>Postoperative</b>: HDU, glucose monitoring, steroids after bilateral adrenalectomy, persistent hypertension suggests residual tumour.</li></ul>`,
p:"Typical exam questions: '54-year-old heavy smoker for left adrenal mass excision with hot flushes and breathlessness', '58-year-old with hot flushes, normotensive, for left renal mass excision'. Consider phaeochromocytoma (or carcinoid) before any adrenal or retroperitoneal mass is removed.",
v:"Classify adrenal disorders; for phaeo: pathophysiology, diagnosis, preparation (drugs, criteria), intraoperative plan with drugs, post-ligation problems, postoperative care."},
{f:"endo",t:"Carcinoid, pituitary and other endocrine disease",b:`<ul class="clean"><li><b>Neuroendocrine (carcinoid) tumours</b>: enterochromaffin cells (midgut commonest). Release serotonin, histamine, kallikrein (bradykinin), tachykinins (substance P), prostaglandins. <b>Carcinoid syndrome</b> (flushing, diarrhoea, bronchospasm, hypotension or hypertension, right-sided heart lesions) usually needs liver metastases (or bronchial/ovarian primary) because the liver otherwise inactivates mediators. Diagnosis: urinary 5-HIAA, chromogranin A, somatostatin receptor imaging.</li>
<li><b>Carcinoid heart disease</b>: fibrous plaques on right-sided valves (tricuspid regurgitation, pulmonary stenosis), right heart failure; echo before surgery.</li>
<li><b>Anaesthesia</b>: <b>octreotide</b> (somatostatin analogue) pre-operatively (e.g. infusion 50–100 µg/h started 12 h before and continued), bolus 20–100 µg (up to 500) for crises; avoid triggers (histamine releasers, catecholamines and sympathomimetics can provoke mediator release; anxiety, tumour handling, hypotension, hypercapnia); treat hypotension with octreotide, fluids and phenylephrine/vasopressin; bronchospasm with octreotide (β-agonists may worsen); ondansetron for diarrhoea and nausea; delayed recovery (serotonin); glucose monitoring.</li>
<li><b>Acromegaly</b> (GH excess): difficult airway (macroglossia, prognathism, laryngeal and soft tissue hypertrophy, OSA, subglottic narrowing), cardiomyopathy, hypertension, diabetes; awake fibreoptic or videolaryngoscope; transsphenoidal surgery (nasal packs: mouth breathing, CSF leak).</li>
<li><b>Pituitary surgery</b> problems: diabetes insipidus (polyuria with high Na⁺: desmopressin), SIADH, cortisol deficiency (steroid cover), visual field monitoring.</li>
<li><b>Diabetes insipidus</b> (cranial vs nephrogenic) vs <b>SIADH</b> (hyponatraemia, concentrated urine, euvolaemia: fluid restriction, tolvaptan, hypertonic saline if severe symptoms).</li></ul>`,
p:"Typical exam questions: 'Carcinoid syndrome: amines and polypeptides released, anaesthesia concerns, postoperative concerns' (×3).",
v:"Pathophysiology and mediators, syndrome requirements, heart disease, octreotide regimen, triggers and crisis treatment; then acromegaly airway and pituitary fluid disorders."},
{f:"endo",t:"Diabetes and its complications",b:`<ul class="clean"><li><b>Drug management</b> is in Stage 9 (CPOC 2023). This slide covers the disease.</li>
<li><b>Complications relevant to anaesthesia</b>: macrovascular (IHD, often silent; cerebrovascular, peripheral vascular disease), microvascular (nephropathy: drug dosing, contrast; retinopathy; neuropathy: peripheral, document before regional blocks), <b>autonomic neuropathy</b> (gastroparesis and aspiration, postural hypotension, labile BP under anaesthesia, silent ischaemia, resting tachycardia, impaired hypoglycaemia awareness, cardiac arrest), stiff joint syndrome (prayer sign: difficult laryngoscopy), infection and poor healing, obesity and OSA.</li>
<li><b>Glycaemic targets</b>: 6–10 mmol/L (accept 4–12) perioperatively; HbA1c &gt; 69 mmol/mol (8.5%) should prompt optimisation before elective surgery when possible. Hyperglycaemia increases infection, AKI and mortality; hypoglycaemia is dangerous and masked under GA.</li>
<li><b>DKA</b> (glucose &gt; 11 or known diabetes, ketones &gt; 3 mmol/L, pH &lt; 7.3 or HCO₃⁻ &lt; 15): fixed-rate insulin 0.1 unit/kg/h, 0.9% saline, K⁺ replacement, add 10% glucose when glucose &lt; 14; treat precipitant; euglycaemic DKA with SGLT2 inhibitors. Delay surgery until treated unless the surgical problem is the cause (e.g. sepsis).</li>
<li><b>HHS</b> (glucose &gt; 30, osmolality &gt; 320, no significant ketosis): cautious fluid replacement (sodium and osmolality should fall slowly: osmolality ≤ 3–8 mOsm/kg/h), low-dose insulin later, VTE prophylaxis.</li>
<li><b>Organisation</b>: first on the list, avoid prolonged fasting, VRIII when indicated, specialist diabetes team, safe discharge.</li></ul>`,
p:"Typical exam questions: 'A diabetic on insulin three times per day scheduled for femoropopliteal bypass is postponed 3 days': combine this slide with the Stage 9 drug plan.",
v:"Complications by system with anaesthetic implications, targets, DKA and HHS management, organisation."},
{f:"org",t:"Liver disease and cirrhosis",b:`<ul class="clean"><li><b>Pathophysiology of cirrhosis</b>: hyperdynamic circulation (low SVR, high CO from vasodilators: NO), portal hypertension (varices, ascites, splenomegaly, thrombocytopenia), cirrhotic cardiomyopathy, hepatopulmonary syndrome (intrapulmonary shunting, orthodeoxia) and portopulmonary hypertension, hepatorenal syndrome, encephalopathy (ammonia), hypoalbuminaemia, hyponatraemia, malnutrition, coagulopathy (rebalanced: ↓ procoagulants and anticoagulants: bleeding and thrombosis both possible; INR misleads: use viscoelastic tests), hypoglycaemia, infection, impaired drug metabolism.</li>
<li><b>Risk</b>: <b>Child–Pugh</b> (bilirubin, albumin, INR, ascites, encephalopathy: A 5–6, B 7–9, C 10–15; abdominal surgery mortality ~10%, 30%, 80%: Mansour 1997) and <b>MELD/MELD-Na</b> (bilirubin, INR, creatinine ± Na: mortality rises ~1% per point above ~8–10; MELD ≥ 20 high risk). Mayo risk score; VOCAL-Penn. Elective surgery generally contraindicated in Child C, acute hepatitis, alcoholic hepatitis.</li>
<li><b>Optimisation</b>: treat ascites (paracentesis with albumin 8 g/L removed if &gt; 5 L), encephalopathy (lactulose, rifaximin), coagulopathy guided by TEG/ROTEM (vitamin K, fibrinogen, platelets; avoid blind FFP), renal function, nutrition, alcohol withdrawal (thiamine, benzodiazepine protocol).</li>
<li><b>Anaesthesia</b>: aspiration risk (ascites), reduced doses (propofol, opioids), drug choices: atracurium/cisatracurium (organ-independent), remifentanil, sevoflurane/desflurane/isoflurane (maintain hepatic blood flow); avoid long-acting benzodiazepines and morphine; paracetamol reduced (2–3 g/day), avoid NSAIDs (HRS). Maintain MAP and hepatic perfusion, avoid hypoxia, hypocapnia (splanchnic vasoconstriction), large fluid shifts; monitor glucose; regional only with acceptable coagulation.</li>
<li><b>Hepatectomy</b>: reduce blood loss with <b>low CVP</b> (&lt; 5 cmH2O: fluid restriction, head-up, GTN, low PEEP) during parenchymal transection, Pringle manoeuvre (portal triad clamping), TXA, cell salvage (debated in cancer), meticulous surgery; risks: air embolism, post-hepatectomy liver failure (remnant &lt; 25–30%), coagulopathy, hypophosphataemia (regeneration), AKI. Analgesia: epidural (beware post-op coagulopathy) or wound catheters/ITM.</li>
<li><b>Acute liver failure</b>: encephalopathy with coagulopathy (INR &gt; 1.5) without prior disease; paracetamol commonest in UK; cerebral oedema (ICP, ammonia), hypoglycaemia, AKI, sepsis, vasoplegia; King's College criteria for transplant.</li></ul>`,
p:"Use the liver risk diagram (Child–Pugh and MELD-Na) with the patient values from the viva.",
v:"Pathophysiology by system, scoring and risk, optimisation, anaesthetic plan (drugs, monitoring, haemodynamics), hepatectomy and acute liver failure."},
{f:"org",t:"Renal disease and transplantation",b:`<ul class="clean"><li><b>CKD</b> (KDIGO G1–G5 by eGFR: G3a 45–59, G3b 30–44, G4 15–29, G5 &lt; 15): hypertension, IHD, LVH, fluid overload, anaemia (EPO deficiency), uraemic platelet dysfunction (desmopressin), hyperkalaemia, metabolic acidosis, renal bone disease, autonomic neuropathy, gastroparesis, infection risk, altered drug handling (Stage 7).</li>
<li><b>Dialysis patients</b>: dialyse the day before surgery (avoid immediately before: fluid shifts, heparin, hypokalaemia); check K⁺ on the day (suxamethonium only if K⁺ &lt; 5.5 and needed), know dry weight and residual urine output, protect fistula arm (no cannula or cuff), careful fluids, drugs: atracurium/cisatracurium, sugammadex in severe CKD is not recommended (complex retained; can be dialysed with high-flux), fentanyl/alfentanil/remifentanil (avoid morphine, pethidine), avoid NSAIDs.</li>
<li><b>AV fistula formation</b>: <b>brachial plexus block</b> (supraclavicular or axillary) gives sympathectomy and vasodilation, better early flow and higher 1-year patency than local infiltration (RAFT trial, Lancet 2021); GA if block refused or not possible (consider K⁺, fluid, drug choice). Patient refusing LA: discuss risks of GA vs regional with evidence; respect autonomy.</li>
<li><b>Renal transplant</b>: recent dialysis and K⁺, cardiac assessment (high CV risk), GA ± TAP/ESP/QL blocks (epidural less often), goal-directed fluids (balanced crystalloids, not 0.9% saline: acidosis and K⁺ rise), maintain MAP for graft perfusion (avoid vasoconstrictors where possible), immunosuppression timing (basiliximab, methylprednisolone), avoid nephrotoxins, early graft function (urine output), DVT prophylaxis.</li>
<li><b>AKI prevention</b> (KDIGO staging by creatinine and urine output): identify risk (CKD, diabetes, age, sepsis, contrast, nephrotoxins, major/cardiac surgery), optimise volume and MAP (≥ 65 or individual), avoid nephrotoxins (NSAIDs, aminoglycosides, contrast), stop ACEi/ARBs and diuretics temporarily, balanced crystalloids, glycaemic control, monitor creatinine and urine output. No drug is proven protective (dopamine, fenoldopam, furosemide, mannitol).</li>
<li><b>Hyperkalaemia and dialysis types</b> (haemodialysis, haemofiltration, haemodiafiltration, peritoneal; complications: hypotension, disequilibrium, bleeding, infection, aluminium toxicity historically): see Stage 4 and the ICU stage.</li></ul>`,
p:"Typical exam questions: 'ESRD for AV fistula: preparation, anaesthetic choice, patient refuses LA', 'Anaesthesia for renal transplantation', 'SLE patient for renal re-transplantation', 'Muscle relaxants for renal/hepatic failure', 'Fenoldopam: role in renal protection?'.",
v:"CKD consequences, dialysis timing and checks, drug choice, AV fistula anaesthesia with evidence, transplant management, AKI prevention."},
{f:"org",t:"Electrolyte emergencies",b:`<ul class="clean"><li><b>Hyperkalaemia</b> (UK Kidney Association 2023): K⁺ ≥ 6.5 mmol/L or ECG changes is an emergency. Steps: (1) <b>protect the heart</b>: calcium chloride 10% 10 mL or calcium gluconate 10% 30 mL IV over 5–10 min (repeat if ECG changes persist); (2) <b>shift K⁺</b>: insulin 10 units soluble with 25 g glucose IV over 15 min (glucose monitoring; add 10% glucose infusion if pre-treatment glucose &lt; 7), salbutamol 10–20 mg nebulised; (3) <b>remove K⁺</b>: sodium zirconium cyclosilicate or patiromer, treat cause, dialysis; stop K⁺-containing fluids and culprit drugs. Sodium bicarbonate only if acidotic. Under anaesthesia: hyperventilation (alkalosis) helps briefly; avoid suxamethonium.</li>
<li><b>ECG progression</b>: peaked T waves → flattened P, prolonged PR → broadened QRS → sine wave → VF/asystole (see diagram).</li>
<li><b>Hypokalaemia</b>: arrhythmias (U waves, ST depression), weakness, ileus, potentiates digoxin and NMBs. Replace orally or IV (maximum ~10 mmol/h peripherally, up to 20 mmol/h centrally with ECG); correct Mg²⁺ first. Elective surgery usually deferred if K⁺ &lt; 3.0.</li>
<li><b>Hyponatraemia</b>: classify by volume status and osmolality (SIADH, diuretics, hypovolaemia, heart/liver failure, TURP syndrome, hypothyroidism, adrenal insufficiency). Severe symptomatic (seizures, coma): <b>150 mL 3% NaCl over 20 min</b>, repeat up to twice, aiming for a rise of 5 mmol/L. Limit correction to <b>8–10 mmol/L in 24 h</b> (≤ 8 in high risk: alcohol, malnutrition, hypokalaemia, liver disease) to avoid osmotic demyelination. Chronic asymptomatic: treat cause, fluid restriction (SIADH). Elective surgery deferred if Na⁺ &lt; 130 (cause-dependent).</li>
<li><b>Hypernatraemia</b>: water deficit = TBW × (Na/140 − 1); correct slowly (≤ 10 mmol/L/day) with enteral water or 5% glucose; DI: desmopressin.</li>
<li><b>Calcium</b>: hypocalcaemia (citrate in massive transfusion, post-thyroidectomy, pancreatitis): tetany, laryngospasm, prolonged QT, hypotension: calcium gluconate. Hypercalcaemia: fluids, bisphosphonate. <b>Magnesium</b>: hypomagnesaemia (arrhythmias, refractory hypokalaemia): 2 g IV; hypermagnesaemia (pre-eclampsia treatment): loss of reflexes at 4–5 mmol/L, respiratory paralysis &gt; 6: calcium gluconate.</li></ul>`,
p:"Typical exam questions: 'Management of hyperkalaemia' (×3), 'Hyperkalaemia with pacemaker during appendicectomy', '21-year-old in sepsis with AKI, hyperkalaemia and DKA', 'Electrolytes'.",
v:"For each: causes, clinical and ECG features, thresholds for surgery, stepwise treatment with doses, correction limits."},
{f:"neu",t:"Neuromuscular disorders",b:`<ul class="clean"><li><b>Myasthenia gravis</b>: autoantibodies against postsynaptic nicotinic AChR (or MuSK); fatigable weakness (ocular, bulbar, respiratory); thymoma in ~15%. Treatment: pyridostigmine, steroids, immunosuppressants, IVIg/plasma exchange, thymectomy. <b>Anaesthesia</b>: continue pyridostigmine (or IV neostigmine equivalent); <b>sensitive to non-depolarising NMBs</b> (use 10–50% doses with quantitative monitoring; avoid if possible), <b>resistant to suxamethonium</b> (ED95 ~2.6× normal: use 1.5–2 mg/kg if needed); sugammadex reverses rocuronium reliably; avoid drugs that worsen MG (aminoglycosides, magnesium, quinolones, β-blockers, some anticonvulsants). Postoperative ventilation risk (Leventhal): disease &gt; 6 years, chronic respiratory disease, pyridostigmine &gt; 750 mg/day, vital capacity &lt; 2.9 L. <b>Myasthenic vs cholinergic crisis</b>: both cause weakness; cholinergic has SLUDGE, miosis, fasciculations: ventilate, stop anticholinesterases, then rechallenge.</li>
<li><b>Lambert–Eaton myasthenic syndrome</b>: antibodies to presynaptic P/Q-type voltage-gated Ca²⁺ channels, ~50–60% associated with small-cell lung cancer; proximal leg weakness that <b>improves with repeated effort</b>, hyporeflexia, autonomic dysfunction (dry mouth). <b>Sensitive to both depolarising and non-depolarising NMBs</b>; anticholinesterases less effective; 3,4-diaminopyridine.</li>
<li><b>Duchenne muscular dystrophy</b> (X-linked, absent dystrophin): <b>avoid suxamethonium</b> (hyperkalaemic cardiac arrest, rhabdomyolysis) and preferably <b>volatile agents</b> (anaesthesia-induced rhabdomyolysis; TIVA preferred); dilated cardiomyopathy, restrictive lung disease, scoliosis, delayed gastric emptying; not MH, but the reactions mimic it.</li>
<li><b>Myotonic dystrophy</b> (DM1, autosomal dominant CTG repeat): myotonia triggered by suxamethonium, neostigmine, cold, shivering, diathermy, surgical handling (NMBs do not relieve it: local infiltration, phenytoin); cardiac conduction defects (pacemaker), cardiomyopathy, aspiration, OSA, sensitivity to opioids and sedatives, diabetes, postoperative respiratory failure.</li>
<li><b>Parkinson's disease</b>: time-critical medication (levodopa: give on time via NG; rotigotine patch if NBM), avoid dopamine antagonists (metoclopramide, prochlorperazine, droperidol, haloperidol: use ondansetron, domperidone), autonomic instability, dysphagia and aspiration, postoperative confusion; withdrawal can cause parkinsonism-hyperpyrexia (NMS-like). Deep brain stimulators: bipolar diathermy.</li>
<li><b>Multiple sclerosis</b>: relapse with stress, infection and hyperthermia; regional and neuraxial anaesthesia acceptable (document deficits); avoid suxamethonium in significant weakness. <b>Guillain–Barré</b>: autonomic instability, respiratory failure (VC &lt; 20 mL/kg), avoid suxamethonium.</li>
<li><b>Spinal cord injury</b>: acute (spinal shock: hypotension, bradycardia with high lesions; suxamethonium safe in the first 24–72 h, then avoid for months); chronic: <b>autonomic dysreflexia</b> with lesions at or above T6 (stimulus below the lesion, e.g. bladder distension → massive hypertension, reflex bradycardia, flushing above the lesion); prevent with anaesthesia (GA or spinal) even for "insensate" procedures.</li></ul>`,
p:"Typical exam questions: 'Myasthenia and Eaton–Lambert syndrome: how to differentiate; shape of TOF in myasthenia; treatment including steroids and plasmapheresis'. Use the NMB sensitivity diagram.",
v:"For each condition: pathophysiology, features, drug sensitivities, perioperative plan, postoperative risks."},
{f:"neu",t:"Rheumatoid arthritis, ankylosing spondylitis and Down syndrome",b:`<ul class="clean"><li><b>Rheumatoid arthritis</b>: airway: <b>atlantoaxial subluxation</b> (~25%; anterior commonest: avoid flexion; vertical and subaxial forms), cricoarytenoid arthritis (hoarseness, stridor, small tube), TMJ involvement, limited neck movement; flexion–extension cervical X-rays if neck symptoms or before major surgery with long-standing disease. Systemic: pulmonary fibrosis, effusions, pericarditis, valvular disease, anaemia, renal impairment (drugs), vasculitis, fragile skin, positioning difficulties. Drugs: continue methotrexate; hold biologics for about one dosing interval before surgery and restart after wound healing (~14 days, BSR/ACR 2022); steroid cover; NSAID effects.</li>
<li><b>Ankylosing spondylitis</b>: fixed kyphotic cervical spine (awake fibreoptic intubation; fracture risk with neck manipulation), restricted chest expansion (restrictive), aortic regurgitation, conduction defects; neuraxial blocks technically difficult (paramedian approach, ultrasound) with higher epidural haematoma risk.</li>
<li><b>Down syndrome</b> (trisomy 21): airway (macroglossia, midface hypoplasia, small subglottis: smaller ETT, OSA, laryngomalacia), <b>atlantoaxial instability</b> (radiological ~15%, symptomatic 1–2%: neutral neck positioning), congenital heart disease (~40–50%: AVSD, VSD; pulmonary hypertension, Eisenmenger), hypothyroidism, hypotonia, bradycardia during sevoflurane induction, difficult IV access, behavioural issues and consent (capacity assessment, best interests).</li>
<li><b>Jehovah's Witnesses</b>: adults with capacity may refuse blood (respect advance decisions; document which products and techniques are acceptable: cell salvage in continuity, albumin, clotting factors, EPO vary by individual); optimise Hb (IV iron, EPO), meticulous haemostasis, TXA, minimise sampling; children: seek legal authority if transfusion becomes life-saving.</li></ul>`,
p:"Typical exam questions: 'Difference between adult and paediatric anatomy', 'Rheumatoid arthritis', 'Down's syndrome'.",
v:"Airway, cervical spine, systemic involvement, drugs, regional considerations; consent and capacity issues."},
{f:"neu",t:"Haematological conditions and preoperative anaemia",b:`<ul class="clean"><li><b>Sickle cell disease</b> (HbSS; HbSC milder): HbS polymerises when deoxygenated (disease sickles at PO2 ~5–6 kPa, trait at ~2.5–4 kPa), causing vaso-occlusion and haemolysis. Complications: painful crises, acute chest syndrome, stroke, splenic sequestration and asplenia (infection), pulmonary hypertension, renal and avascular necrosis, chronic pain and opioid tolerance, alloantibodies.</li>
<li><b>Perioperative</b>: haematology involvement; <b>pre-operative transfusion to Hb ~100 g/L</b> for HbSS having low- or medium-risk surgery (TAPS trial); exchange transfusion for high-risk surgery; avoid hypoxaemia, dehydration, hypothermia, acidosis, stasis (tourniquets are relative contraindications), pain; good analgesia (regional), incentive spirometry, early mobilisation, VTE prophylaxis; watch for acute chest syndrome (fever, chest pain, new infiltrate, hypoxaemia: O2, antibiotics, transfusion, ICU). Trait: generally no special measures.</li>
<li><b>Thalassaemia</b>: chronic transfusion and iron overload (cardiomyopathy, liver, endocrine), extramedullary haematopoiesis (maxillary hypertrophy: airway), splenectomy.</li>
<li><b>Preoperative anaemia</b>: present in ~30% of major surgery patients; independent risk for transfusion, complications and death. Identify early (≥ 4–6 weeks before), investigate (iron studies: ferritin &lt; 100 µg/L with TSAT &lt; 20% suggests iron deficiency in inflammation), treat with <b>IV iron</b> (oral is slow and poorly tolerated; PREVENTT showed no transfusion reduction in abdominal surgery but improved Hb and readmissions), B12/folate, EPO in selected cases; patient blood management (restrictive transfusion, TXA, cell salvage, point-of-care testing).</li>
<li><b>Bleeding disorders</b> (von Willebrand, haemophilia) and thrombophilias: see Stage 6.</li></ul>`,
p:"Use the Ganzoni calculator for IV iron dosing.",
v:"Sickle cell pathophysiology and perioperative plan with evidence, acute chest syndrome, thalassaemia, anaemia pathway."},
{f:"neu",t:"The older patient: frailty, delirium and cognitive dysfunction",b:`<ul class="clean"><li><b>Physiological changes</b>: reduced organ reserve; CVS (stiff vessels, systolic hypertension, LVH, diastolic dysfunction, reduced β-responsiveness, conduction disease, AF); respiratory (↑ closing capacity exceeding FRC when supine, ↓ elasticity, ↓ reflexes, ↓ response to hypoxia/hypercapnia); renal (↓ GFR with normal creatinine); hepatic (↓ blood flow); CNS (↓ MAC ~6%/decade, sensitivity to sedatives, cognitive impairment); body composition (↑ fat, ↓ TBW and muscle); thermoregulation; pharmacology (Stage 7).</li>
<li><b>Frailty</b>: a state of reduced physiological reserve and vulnerability to stressors. Measure with the <b>Clinical Frailty Scale</b> (1–9; ≥ 5 frail) or Edmonton Frail Scale; predicts complications, delirium, discharge to care and death. Comprehensive geriatric assessment and POPS (perioperative medicine for older people) services; CPOC frailty guideline 2021.</li>
<li><b>Postoperative delirium</b>: acute fluctuating disturbance of attention and cognition (hyperactive, hypoactive (commoner, missed), mixed). Risk factors: age, dementia, frailty, sensory impairment, polypharmacy (anticholinergics, benzodiazepines), alcohol, emergency surgery, hip fracture, infection, pain, urinary retention, constipation, dehydration, sleep disruption. Screen with <b>4AT</b> or CAM. Prevention (NICE CG103: multicomponent): orientation, glasses and hearing aids, hydration, nutrition, mobilisation, sleep, pain control, avoid deliriogenic drugs; processed EEG to avoid excessive depth (evidence mixed: ENGAGES). Treat cause; antipsychotics only for distress or danger (low-dose haloperidol; avoid in Parkinson's/Lewy body).</li>
<li><b>Postoperative cognitive dysfunction / perioperative neurocognitive disorders</b>: subtle decline lasting weeks to months (ISPOCD study); no technique proven to prevent; regional vs general similar.</li>
<li><b>Consent and capacity</b> (Mental Capacity Act 2005): presume capacity; assess decision-specific (understand, retain, weigh, communicate); best interests decisions with family/IMCA; lasting power of attorney for health; advance decisions; escalation plans and ReSPECT/DNACPR discussions.</li>
<li><b>Hip fracture</b>: surgery within 36 h, multimodal analgesia with fascia iliaca block on admission, spinal or GA (REGAIN and RAGA trials: similar outcomes), avoid hypotension, orthogeriatric care (AAGBI 2020).</li></ul>`,
p:"Typical exam questions: '74-year-old, 50 kg, hip fracture with mild heart failure and bundle branch block, refusing regional anaesthesia'.",
v:"Ageing physiology by system, frailty assessment, delirium definition, risks, screening, prevention and treatment, POCD, capacity and consent, hip fracture pathway."},
];

/* ---------- data ---------- */
const RCRI_F=["High-risk surgery (intraperitoneal, intrathoracic, suprainguinal vascular)","Ischaemic heart disease","Heart failure","Cerebrovascular disease","Insulin-treated diabetes","Creatinine > 177 µmol/L"];
const RCRI_R=[0.4,0.9,6.6,11,11,11,11];
const SB=["Snoring loudly","Tired / sleepy in the daytime","Observed apnoeas","Pressure: treated hypertension","BMI > 35","Age > 50","Neck circumference > 40 cm","Gender: male"];
const NMD={norm:["Normal",0.3,0.3,"Normal ED95: rocuronium ~0.3 mg/kg, suxamethonium ~0.3 mg/kg."],mg:["Myasthenia gravis",0.12,0.8,"Fewer functional AChRs: very sensitive to non-depolarising NMBs (rocuronium ED95 falls to ~40%), resistant to suxamethonium (ED95 ~2.6×). Baseline TOF may show fade (decrement)."],lems:["Lambert–Eaton",0.1,0.15,"Reduced presynaptic ACh release: sensitive to BOTH non-depolarising and depolarising NMBs. Facilitation with tetanus/exercise (post-tetanic increment)."],dmd:["Duchenne (do not use sux)",0.27,0.3,"Rocuronium onset slower and duration longer; suxamethonium contraindicated (hyperkalaemic arrest, rhabdomyolysis)."]};

const CALCS=[
 {t:"Duke Activity Status Index → functional capacity",c:"abp",in:[["DASI score (0–58.2)","d",30]],
  f:(v,fmt)=>{const vo2=0.43*v.d+9.6;return [["Estimated VO2 peak (mL/kg/min)",fmt(vo2,1),vo2<15?"warn":"ok"],["Estimated METs",fmt(vo2/3.5,1),vo2/3.5<4?"warn":"ok"],["METS study threshold","DASI ≤ 34 associated with higher 30-day death/MI"]]},
  n:"VO2 peak = 0.43 × DASI + 9.6 (Hlatky 1989). 1 MET = 3.5 mL O2/kg/min."},
 {t:"CPET interpretation",c:"abp",in:[["Anaerobic threshold (mL/kg/min)","at",10],["Peak VO2 (mL/kg/min)","pk",14],["VE/VCO2 at AT","ve",36]],
  f:(v,fmt)=>{const flags=[];if(v.at<11)flags.push("AT < 11");if(v.pk<15)flags.push("VO2 peak < 15");if(v.ve>34)flags.push("VE/VCO2 > 34");return [["Risk markers present",flags.length?flags.join(", "):"None"],["Category",flags.length>=2?"High risk: consider critical care, prehabilitation, shared decision":flags.length?"Intermediate":"Lower risk"],["AT in METs",fmt(v.at/3.5,1)]]},
  n:"Older 1993 (AT), peak VO2 thresholds, Wilson 2010 (VE/VCO2 for AAA surgery)."},
 {t:"eGFR (CKD-EPI 2021) and CKD stage",c:"etco2",in:[["Age","a",65],["Female (1/0)","f",0],["Creatinine (µmol/L)","cr",140]],
  f:(v,fmt)=>{const s=v.cr/88.4,k=v.f?0.7:0.9,al=v.f?-0.241:-0.302;const e=142*Math.pow(Math.min(s/k,1),al)*Math.pow(Math.max(s/k,1),-1.2)*Math.pow(0.9938,v.a)*(v.f?1.012:1);const st=e>=90?"G1":e>=60?"G2":e>=45?"G3a":e>=30?"G3b":e>=15?"G4":"G5";return [["eGFR (mL/min/1.73 m²)",fmt(e,0),e<30?"bad":e<60?"warn":"ok"],["KDIGO stage",st]]},
  n:"CKD-EPI 2021 race-free equation. Creatinine-based estimates are inaccurate in low muscle mass (elderly, frail) and AKI."},
 {t:"Child–Pugh and MELD-Na",c:"etco2",in:[["Bilirubin (µmol/L)","b",45],["Albumin (g/L)","al",30],["INR","inr",1.8],["Ascites 0 none, 1 mild, 2 moderate–severe","as",1],["Encephalopathy 0 none, 1 grade 1–2, 2 grade 3–4","en",0],["Creatinine (µmol/L)","cr",110],["Sodium (mmol/L)","na",132]],
  f:(v,fmt)=>{const cp=(v.b<34?1:v.b<=50?2:3)+(v.al>35?1:v.al>=28?2:3)+(v.inr<1.7?1:v.inr<=2.3?2:3)+(1+Math.round(v.as))+(1+Math.round(v.en));const cls=cp<=6?"A":cp<=9?"B":"C";
   const bil=Math.max(1,v.b/17.1),inr=Math.max(1,v.inr),cr=Math.min(4,Math.max(1,v.cr/88.4));let meld=3.78*Math.log(bil)+11.2*Math.log(inr)+9.57*Math.log(cr)+6.43;meld=Math.round(meld);const na=Math.min(137,Math.max(125,v.na));const meldna=Math.round(meld+1.32*(137-na)-0.033*meld*(137-na));
   return [["Child–Pugh score",fmt(cp,0)+" (class "+cls+")",cls==="C"?"bad":cls==="B"?"warn":"ok"],["Historical abdominal surgery mortality",{A:"~10%",B:"~30%",C:"~80%"}[cls]],["MELD",fmt(meld,0)],["MELD-Na",fmt(meldna,0),meldna>=20?"bad":meldna>=10?"warn":"ok"]]},
  n:"Child–Pugh bands as in the Classify table. MELD (UNOS): 3.78 ln(bili mg/dL) + 11.2 ln(INR) + 9.57 ln(creatinine mg/dL) + 6.43, values < 1 set to 1, creatinine capped at 4."},
 {t:"Sodium correction per litre (Adrogué–Madias)",c:"etco2",in:[["Serum Na⁺ (mmol/L)","s",118],["Infusate Na⁺ (mmol/L) (3% = 513, 0.9% = 154)","i",513],["Infusate K⁺ (mmol/L)","k",0],["Weight (kg)","w",70],["Female or elderly (1/0)","f",0]],
  f:(v,fmt)=>{const tbw=v.w*(v.f?0.5:0.6);const d=(v.i+v.k-v.s)/(tbw+1);return [["Total body water (L)",fmt(tbw,1)],["Expected Δ Na⁺ per litre infused",fmt(d,1)+" mmol/L"],["Volume for +5 mmol/L (mL)",fmt(5/d*1000,0)],["Max correction","8–10 mmol/L per 24 h"]]},
  n:"Severe symptomatic hyponatraemia: 150 mL 3% NaCl over 20 min, up to three times, aiming for +5 mmol/L. Recheck Na⁺ every 2–4 h."},
 {t:"Hyperkalaemia emergency doses",c:"etco2",in:[["Serum K⁺ (mmol/L)","k",7.0],["Pre-treatment glucose (mmol/L)","g",6]],
  f:(v,fmt)=>[["Severity",v.k>=6.5?"Severe: emergency":v.k>=6?"Moderate":"Mild",v.k>=6.5?"bad":"warn"],["Calcium","CaCl 10% 10 mL or Ca gluconate 10% 30 mL IV over 5–10 min (if ECG changes)"],["Insulin–glucose","10 units soluble insulin + 25 g glucose over 15 min"],["Glucose infusion",v.g<7?"Yes: 10% glucose 50 mL/h for 5 h (pre-glucose < 7)":"Monitor glucose hourly for 6 h"],["Salbutamol","10–20 mg nebulised"],["Remove K⁺","Binder (SZC/patiromer), treat cause, dialysis if refractory"]],
  n:"UK Kidney Association 2023 guideline."},
 {t:"IV iron dose (Ganzoni)",c:"nibp",in:[["Weight (kg)","w",70],["Actual Hb (g/L)","h",100],["Target Hb (g/L)","t",130],["Iron stores (mg)","s",500]],
  f:(v,fmt)=>{const d=v.w*(v.t-v.h)/10*2.4+v.s;return [["Total iron deficit (mg)",fmt(d,0)],["Ferric carboxymaltose doses (max 1000 mg each)",fmt(Math.ceil(d/1000),0)]]},
  n:"Ganzoni: deficit (mg) = weight × (target − actual Hb in g/dL) × 2.4 + stores (500 mg if > 35 kg). Simplified tables are often used instead."},
];

const TABLES=[
 ["Revised Cardiac Risk Index (Lee 1999)",["Factor","Detail"],[["High-risk surgery","Intraperitoneal, intrathoracic, suprainguinal vascular"],["Ischaemic heart disease","MI, angina, nitrates, positive stress test, Q waves"],["Heart failure","History, pulmonary oedema, PND, S3, CXR"],["Cerebrovascular disease","Stroke or TIA"],["Diabetes on insulin","—"],["Creatinine > 177 µmol/L (2 mg/dL)","—"],["Risk of major cardiac event","0: 0.4%; 1: 0.9%; 2: 6.6%; ≥ 3: 11%"]]],
 ["Aortic stenosis severity",["Grade","AVA (cm²)","Mean gradient (mmHg)","Peak velocity (m/s)"],[["Mild","> 1.5","< 20","2.6–2.9"],["Moderate","1.0–1.5","20–39","3.0–3.9"],["Severe","< 1.0 (indexed < 0.6)","≥ 40","≥ 4.0"],["Very severe","< 0.6–0.7","≥ 60","≥ 5.0"]]],
 ["Haemodynamic goals in valve disease",["Lesion","Heart rate","Rhythm","Preload","SVR","Contractility"],[["Aortic stenosis","Low–normal (60–80)","Sinus essential","Maintain","Maintain/high","Maintain"],["Mitral stenosis","Low","Sinus/rate control","Maintain","Maintain","Maintain; avoid ↑ PVR"],["Aortic regurgitation","High–normal (80–100)","Sinus","Maintain","Low","Maintain"],["Mitral regurgitation","High–normal","Sinus","Maintain","Low","Maintain"],["HOCM","Low","Sinus","High","High","Low (avoid inotropes)"]]],
 ["Child–Pugh score",["Points","1","2","3"],[["Bilirubin (µmol/L)","< 34","34–50","> 50"],["Albumin (g/L)","> 35","28–35","< 28"],["INR","< 1.7","1.7–2.3","> 2.3"],["Ascites","None","Mild","Moderate–severe"],["Encephalopathy","None","Grade 1–2","Grade 3–4"],["Class","A: 5–6","B: 7–9","C: 10–15"]]],
 ["CKD stages (KDIGO)",["Stage","eGFR (mL/min/1.73 m²)","Description"],[["G1","≥ 90","Normal (with kidney damage)"],["G2","60–89","Mildly decreased"],["G3a","45–59","Mild–moderate"],["G3b","30–44","Moderate–severe"],["G4","15–29","Severe"],["G5","< 15","Kidney failure"]]],
 ["Endocrine emergencies",["Emergency","Key features","Treatment"],[["Thyroid storm","Fever, tachycardia/AF, agitation, heart failure","β-blocker, PTU/carbimazole, iodine (after thionamide), hydrocortisone, cooling"],["Myxoedema coma","Hypothermia, bradycardia, coma, hyponatraemia","Hydrocortisone, IV T3/T4 cautiously, supportive"],["Adrenal crisis","Hypotension, hyponatraemia, hypoglycaemia","Hydrocortisone 100 mg IV then 200 mg/24 h, fluids, glucose"],["Phaeochromocytoma crisis","Paroxysmal hypertension, arrhythmia, pulmonary oedema","Phentolamine, SNP, magnesium, then β-blockade"],["Carcinoid crisis","Flushing, bronchospasm, hypotension","Octreotide bolus/infusion, fluids, phenylephrine/vasopressin"],["DKA","Ketoacidosis, dehydration","FRIII 0.1 U/kg/h, saline, K⁺, glucose when < 14"],["HHS","Hyperosmolar, dehydrated, no ketosis","Slow fluids, later low-dose insulin, VTE prophylaxis"]]],
 ["Neuromuscular disorders: anaesthetic implications",["Condition","Suxamethonium","Non-depolarising NMB","Other"],[["Myasthenia gravis","Resistant","Very sensitive","Continue pyridostigmine; Leventhal criteria"],["Lambert–Eaton","Sensitive","Sensitive","SCLC; autonomic dysfunction"],["Duchenne","Contraindicated","Prolonged","Avoid volatiles; cardiomyopathy"],["Myotonic dystrophy","Contraindicated (myotonia)","Normal; avoid neostigmine","Conduction defects; sensitive to opioids"],["MS","Avoid if weakness","Normal","Hyperthermia → relapse"],["GBS / denervation","Contraindicated (hyperkalaemia)","Variable","Autonomic instability"],["Spinal cord injury","Avoid from 72 h","Normal/resistant","Autonomic dysreflexia ≥ T6"],["Parkinson's","Usual","Usual","Time-critical drugs; avoid D2 antagonists"]]],
 ["Conduction block and pacing",["Block","Pre-op pacing?"],[["First-degree AV block","No"],["Mobitz I (Wenckebach)","No (unless symptomatic)"],["Mobitz II","Yes"],["Complete heart block","Yes"],["Bifascicular block","No (pads available)"],["Trifascicular (bifascicular + 1st degree)","No if asymptomatic (pads available)"],["Symptomatic sinus node disease","Yes"]]],
 ["Obesity classification and implications",["BMI","Class","Key risks"],[["25–29.9","Overweight","—"],["30–34.9","Obese I","OSA, diabetes, hypertension"],["35–39.9","Obese II","Airway, OSA, OHS, VTE"],["≥ 40","Obese III","All of the above + difficult access, positioning, drug dosing"],["≥ 50","'Super-obese'","Highest risk; specialist centres"]]],
];

const CARDS=[
 ["cv","RCRI components?","High-risk surgery, IHD, heart failure, cerebrovascular disease, insulin-treated diabetes, creatinine > 177."],
 ["cv","RCRI risk with ≥ 3 factors?","~11% (original)."],
 ["cv","What does 4 METs represent?","Two flights of stairs."],
 ["cv","Better than self-reported METs?","DASI (≤ 34 risk threshold)."],
 ["cv","DASI to VO2 peak?","0.43 × DASI + 9.6."],
 ["cv","CPET anaerobic threshold risk value?","< 11 mL/kg/min."],
 ["cv","Peak VO2 high-risk value?","< 15 mL/kg/min."],
 ["cv","VE/VCO2 high-risk value?","> 34."],
 ["cv","Delay after MI for elective surgery (ACC/AHA)?","≥ 60 days."],
 ["cv","ESC 2022 biomarkers?","NT-proBNP/BNP and hs-troponin in ≥ 65 or CV risk for intermediate/high-risk surgery."],
 ["cv","Define MINS.","Ischaemic troponin rise within 30 days of non-cardiac surgery."],
 ["cv","SGLT2 inhibitors before surgery (ACC/AHA 2024)?","Stop 3–4 days before."],
 ["cv","Severe AS criteria?","AVA < 1.0 cm², mean gradient ≥ 40, Vmax ≥ 4 m/s."],
 ["cv","AS haemodynamic goals?","Sinus rhythm, HR 60–80, maintain preload and SVR."],
 ["cv","Why is hypotension dangerous in AS?","Reduced coronary perfusion of hypertrophied LV → ischaemia spiral."],
 ["cv","MS goals?","Slow HR, maintain preload, avoid PVR rise."],
 ["cv","AR/MR goals?","Faster HR, low SVR, maintain preload."],
 ["cv","HOCM goals?","Slow HR, high preload and afterload, avoid inotropes."],
 ["cv","Trifascicular block: prophylactic pacing?","Not if asymptomatic; pads available."],
 ["cv","Mobitz II before elective surgery?","Pacing required."],
 ["cv","Pulmonary hypertension definition (2022)?","mPAP > 20 mmHg; PVR > 2 WU."],
 ["cv","PH anaesthetic goals?","Avoid hypoxia, hypercapnia, acidosis; keep SVR > PVR."],
 ["cv","Drugs to avoid in pre-excited AF?","Adenosine, verapamil, digoxin."],
 ["cv","NICE stance on endocarditis prophylaxis?","Not routinely recommended."],
 ["resp","Obese class III BMI?","≥ 40."],
 ["resp","STOP-BANG high risk score?","≥ 5."],
 ["resp","AHI for severe OSA?","> 30."],
 ["resp","Obesity hypoventilation syndrome?","Obesity + daytime PaCO2 > 6 kPa."],
 ["resp","Ventilation VT in obesity based on?","Ideal body weight."],
 ["resp","Ramped position?","Tragus level with sternal notch."],
 ["resp","Rocuronium dose scalar in obesity?","Ideal body weight."],
 ["resp","Suxamethonium dose scalar in obesity?","Total body weight."],
 ["resp","ARISCAT predicts?","Postoperative pulmonary complications."],
 ["resp","Smoking cessation: how long for CO to clear?","12–24 h."],
 ["resp","Intrinsic PEEP risk in COPD?","Dynamic hyperinflation: hypotension, barotrauma."],
 ["endo","Thyroid storm treatment?","β-blocker, PTU/carbimazole, iodine after thionamide, hydrocortisone, cooling."],
 ["endo","Why give iodine after the thionamide?","Prevents iodine use for new hormone synthesis."],
 ["endo","Myxoedema coma first drug?","Hydrocortisone."],
 ["endo","SCOOP for neck haematoma?","Skin exposure, Cut sutures, Open skin, Open muscles, Pack."],
 ["endo","Bilateral RLN injury sign?","Stridor."],
 ["endo","Phaeo preparation order?","α-blockade first, then β."],
 ["endo","Phenoxybenzamine pharmacology?","Non-selective, irreversible α-blocker."],
 ["endo","Roizen criteria?","BP < 160/90 for 24 h, orthostatic hypotension not < 80/45, no ST changes 1 week, ≤ 1 VE/5 min."],
 ["endo","After phaeo vein ligation?","Hypotension and hypoglycaemia."],
 ["endo","Drugs to avoid in phaeo?","Histamine releasers, metoclopramide, droperidol, ephedrine, ketamine."],
 ["endo","Carcinoid mediators?","Serotonin, histamine, kallikrein/bradykinin, tachykinins, prostaglandins."],
 ["endo","Why does carcinoid syndrome need liver metastases?","Liver inactivates mediators from gut tumours."],
 ["endo","Carcinoid heart disease?","Right-sided valves: TR and PS."],
 ["endo","Carcinoid crisis treatment?","Octreotide, fluids, phenylephrine/vasopressin."],
 ["endo","Carcinoid diagnostic urine test?","5-HIAA."],
 ["endo","Acromegaly airway issues?","Macroglossia, prognathism, laryngeal hypertrophy, OSA."],
 ["endo","Conn's biochemistry?","Hypokalaemia, metabolic alkalosis."],
 ["endo","DKA insulin rate?","0.1 unit/kg/h fixed rate."],
 ["endo","HHS osmolality threshold?","> 320 mOsm/kg."],
 ["endo","Autonomic neuropathy risks?","Gastroparesis, labile BP, silent ischaemia, arrest."],
 ["org","Child–Pugh components?","Bilirubin, albumin, INR, ascites, encephalopathy."],
 ["org","Child C abdominal surgery mortality (Mansour)?","~80%."],
 ["org","MELD components?","Bilirubin, INR, creatinine (± Na)."],
 ["org","MELD high-risk threshold?","≥ 20."],
 ["org","Coagulation in cirrhosis?","Rebalanced: use viscoelastic testing, not INR."],
 ["org","NMB of choice in liver failure?","Atracurium/cisatracurium."],
 ["org","Albumin after large paracentesis?","8 g per litre removed (> 5 L)."],
 ["org","Hepatectomy blood-loss strategy?","Low CVP (< 5 cmH2O), Pringle manoeuvre, TXA."],
 ["org","Hepatopulmonary syndrome sign?","Orthodeoxia (desaturation upright)."],
 ["org","Paracetamol dose in liver disease?","2–3 g/day."],
 ["org","KDIGO G4 eGFR?","15–29."],
 ["org","When to dialyse before surgery?","Day before."],
 ["org","Suxamethonium in dialysis patients?","Only if K⁺ < 5.5."],
 ["org","AV fistula block advantage (RAFT)?","Brachial plexus block improves 1-year patency vs local."],
 ["org","Uraemic platelet dysfunction treatment?","Desmopressin (and dialysis)."],
 ["org","Hyperkalaemia emergency threshold?","K⁺ ≥ 6.5 or ECG changes."],
 ["org","Calcium dose for hyperkalaemia?","CaCl 10% 10 mL or gluconate 10% 30 mL."],
 ["org","Insulin–glucose dose (UKKA)?","10 units + 25 g glucose."],
 ["org","Salbutamol dose for hyperkalaemia?","10–20 mg nebulised."],
 ["org","ECG sequence in hyperkalaemia?","Peaked T → small P, long PR → wide QRS → sine wave."],
 ["org","3% saline dose for symptomatic hyponatraemia?","150 mL over 20 min, up to ×3."],
 ["org","Max Na⁺ correction in 24 h?","8–10 mmol/L."],
 ["org","Complication of rapid Na⁺ correction?","Osmotic demyelination."],
 ["org","Max peripheral K⁺ infusion rate?","~10 mmol/h."],
 ["neu","MG antibody target?","Postsynaptic nicotinic AChR (or MuSK)."],
 ["neu","MG response to suxamethonium?","Resistant (ED95 ~2.6×)."],
 ["neu","MG response to rocuronium?","Very sensitive."],
 ["neu","Leventhal criteria?","Duration > 6 y, COPD, pyridostigmine > 750 mg/day, VC < 2.9 L."],
 ["neu","LEMS antibody target?","Presynaptic P/Q voltage-gated Ca²⁺ channels."],
 ["neu","LEMS association?","Small-cell lung cancer."],
 ["neu","LEMS NMB sensitivity?","Sensitive to both depolarising and non-depolarising."],
 ["neu","Duchenne: drugs to avoid?","Suxamethonium; prefer TIVA over volatiles."],
 ["neu","Myotonic dystrophy triggers?","Sux, neostigmine, cold, shivering, diathermy."],
 ["neu","Parkinson's antiemetic choice?","Ondansetron or domperidone."],
 ["neu","Autonomic dysreflexia lesion level?","At or above T6."],
 ["neu","Suxamethonium after spinal cord injury?","Avoid after ~72 h."],
 ["neu","RA atlantoaxial subluxation prevalence?","~25%."],
 ["neu","Cricoarytenoid arthritis sign?","Hoarseness, stridor."],
 ["neu","Biologics before surgery?","Hold ~1 dosing interval; restart after wound healing."],
 ["neu","Down syndrome atlantoaxial instability?","~15% radiological, 1–2% symptomatic."],
 ["neu","Down syndrome commonest cardiac lesion?","AVSD."],
 ["neu","TAPS trial finding?","Pre-op transfusion to Hb 100 reduced complications in HbSS."],
 ["neu","Sickle disease sickling PO2?","~5–6 kPa."],
 ["neu","Acute chest syndrome features?","Fever, chest pain, infiltrate, hypoxaemia."],
 ["neu","Ganzoni formula?","Weight × (target − actual Hb g/dL) × 2.4 + 500."],
 ["neu","Clinical Frailty Scale frail threshold?","≥ 5."],
 ["neu","Delirium screening tool?","4AT (or CAM)."],
 ["neu","Commonest delirium subtype?","Hypoactive."],
 ["neu","Four elements of capacity?","Understand, retain, weigh, communicate."],
 ["neu","Hip fracture surgery timing?","Within 36 h."],
];

const FCF={all:"All",cv:"Cardiovascular",resp:"Respiratory & obesity",endo:"Endocrine",org:"Liver, kidney, electrolytes",neu:"Neuro, MSK, haem, elderly"};

const VIVA=[
 {st:"SOE 3 · Anaesthesia",q:"An 82-year-old with severe aortic stenosis needs a hemiarthroplasty for a fractured neck of femur.",a:["Assess severity (symptoms, echo if available without delay).","Pathophysiology and goals.","Technique: low-dose spinal/CSE vs GA; fascia iliaca block.","Monitoring and vasopressors.","Postoperative care and decision-making."],fu:"Would you perform a single-shot spinal?"},
 {st:"SOE 3 · Anaesthesia",q:"Preoperative assessment of a patient with ischaemic heart disease and heart failure for major surgery.",a:["History, functional capacity, DASI.","RCRI and biomarkers (ESC/ACC-AHA).","Investigations and optimisation.","Drug management (β-blocker, ACEi, SGLT2i, antiplatelets).","Intraoperative goals, MINS surveillance, level of care."],fu:"How would you manage a postoperative troponin rise?"},
 {st:"SOE 4 · Internal medicine",q:"What is CPET and how does it help?",a:["Method.","Anaerobic threshold definition and detection.","Thresholds and evidence.","Uses including prehabilitation.","Limitations and contraindications."],fu:"Why is the anaerobic threshold preferred over peak VO2?"},
 {st:"SOE 3 · Anaesthesia",q:"A patient with an adrenal mass, hot flushes and hypertension is listed for adrenalectomy.",a:["Differential (phaeo, Conn's, Cushing's, carcinoid).","Diagnosis.","Preoperative α then β-blockade; Roizen criteria.","Intraoperative plan and drugs.","Post-ligation hypotension and hypoglycaemia."],fu:"Why not start the β-blocker first?"},
 {st:"SOE 4 · Internal medicine",q:"Carcinoid syndrome: mediators, anaesthetic concerns and postoperative issues.",a:["Tumour origin and mediators.","Syndrome and liver metastases.","Carcinoid heart disease.","Octreotide and triggers.","Crisis management and postoperative care."],fu:"Which vasopressor would you choose in a carcinoid crisis?"},
 {st:"SOE 3 · Anaesthesia",q:"A patient with Child–Pugh B cirrhosis needs a hemicolectomy.",a:["Pathophysiology by system.","Child–Pugh and MELD risk.","Optimisation: ascites, coagulation, nutrition, encephalopathy.","Anaesthetic plan: drugs, monitoring, fluids, analgesia.","Postoperative complications."],fu:"Epidural or not, and why?"},
 {st:"SOE 3 · Anaesthesia",q:"An ESRD patient on haemodialysis is listed for AV fistula formation and refuses local anaesthesia.",a:["Problems of ESRD.","Preparation: dialysis timing, K⁺, fluids.","Options: brachial plexus block (RAFT) vs GA.","GA conduct: drugs, RSI if needed, K⁺.","Postoperative care."],fu:"Which NMB and why?"},
 {st:"SOE 3 · Anaesthesia",q:"Management of hyperkalaemia in a patient under anaesthesia.",a:["Causes in theatre.","ECG changes.","Stepwise treatment with doses.","Specific issues: pacemaker, suxamethonium, transfusion.","Monitoring and follow-up."],fu:"How does salbutamol lower potassium?"},
 {st:"SOE 4 · Internal medicine",q:"Compare myasthenia gravis and Lambert–Eaton syndrome. How do they affect anaesthesia?",a:["Pathophysiology and antibodies.","Clinical features and investigations.","Treatment including steroids and plasmapheresis.","NMB sensitivities and TOF appearance.","Postoperative ventilation risk."],fu:"How do you distinguish myasthenic from cholinergic crisis?"},
 {st:"SOE 3 · Anaesthesia",q:"A morbidly obese patient with OSA is listed for laparoscopic surgery.",a:["Physiology and comorbidities.","OSA screening and CPAP.","Airway plan and positioning.","Drug dosing and ventilation.","Extubation and postoperative monitoring."],fu:"Which weight do you use for rocuronium and sugammadex?"},
 {st:"SOE 3 · Anaesthesia",q:"A patient with a large goitre and hypothyroidism: how do you assess and manage the airway?",a:["History and examination.","CT, nasendoscopy, thyroid function.","Optimisation of hypothyroidism.","Airway strategy and backup.","Postoperative complications."],fu:"What is the SCOOP manoeuvre?"},
 {st:"SOE 3 · Anaesthesia",q:"A frail 88-year-old with delirium risk needs emergency surgery.",a:["Frailty and ageing physiology.","Capacity and consent.","Delirium prevention.","Anaesthetic plan.","Escalation planning and postoperative care."],fu:"How would you screen for delirium?"},
];

const QUIZ=[
 ["Risk assessment",[["RCRI includes insulin-treated diabetes",1,""],["RCRI includes age > 70",0,""],["DASI ≤ 34 suggests higher risk",1,""],["4 METs ≈ two flights of stairs",1,""],["Routine CXR is recommended before major surgery",0,"Not routine (NICE NG45)."]]],
 ["CPET",[["AT < 11 mL/kg/min indicates higher risk",1,""],["AT is effort-dependent",0,"Effort-independent."],["VE/VCO2 > 34 predicts risk",1,""],["Symptomatic severe AS is a contraindication",1,""],["Peak VO2 < 15 suggests high risk",1,""]]],
 ["Aortic stenosis",[["Severe AS has AVA < 1.0 cm²",1,""],["Tachycardia is beneficial",0,"Harmful."],["Phenylephrine treats hypotension well",1,""],["Neuraxial anaesthesia is absolutely contraindicated",0,"Titrated techniques acceptable."],["Loss of atrial kick worsens filling",1,""]]],
 ["Other valves and conduction",[["MS: slow heart rate is desirable",1,""],["AR: bradycardia is desirable",0,"Faster HR preferred."],["HOCM: inotropes are helpful",0,"Worsen obstruction."],["Asymptomatic trifascicular block needs pacing",0,""],["Complete heart block needs pacing pre-op",1,""]]],
 ["Obesity and OSA",[["STOP-BANG ≥ 5 is high risk",1,""],["VT should be based on total body weight",0,"Ideal body weight."],["Suxamethonium is dosed on total weight",1,""],["FRC falls in obesity",1,""],["CPAP should be stopped after surgery",0,"Continue."]]],
 ["Thyroid",[["Iodine is given before the thionamide in storm",0,"After."],["PTU reduces T4 → T3 conversion",1,""],["Hydrocortisone is given first in myxoedema coma",1,""],["Bilateral RLN palsy causes stridor",1,""],["Hypocalcaemia can cause laryngospasm",1,""]]],
 ["Phaeochromocytoma",[["α-blockade precedes β-blockade",1,""],["Phenoxybenzamine is a selective α1 blocker",0,"Non-selective, irreversible."],["Hypoglycaemia follows tumour removal",1,""],["Metoclopramide is safe",0,"Can trigger crisis."],["Magnesium helps control hypertension",1,""]]],
 ["Carcinoid",[["Syndrome usually requires liver metastases",1,""],["Carcinoid heart disease is mainly left-sided",0,"Right-sided."],["Octreotide is the key drug",1,""],["Urinary 5-HIAA is diagnostic",1,""],["Adrenaline is first-line for carcinoid hypotension",0,"May worsen mediator release."]]],
 ["Liver disease",[["Child–Pugh includes creatinine",0,"MELD does."],["MELD ≥ 20 indicates high risk",1,""],["INR reliably predicts bleeding",0,"Rebalanced haemostasis."],["Atracurium is suitable",1,""],["Low CVP reduces hepatectomy blood loss",1,""]]],
 ["Renal disease",[["Dialysis is best the day before surgery",1,""],["Morphine is a good choice",0,"Metabolites accumulate."],["Brachial plexus block improves fistula patency",1,""],["NSAIDs should be avoided",1,""],["Fenoldopam is proven to protect the kidneys",0,""]]],
 ["Electrolytes",[["Calcium stabilises the myocardium in hyperkalaemia",1,""],["Insulin dose is 10 units with 25 g glucose",1,""],["Na⁺ correction up to 20 mmol/L/day is safe",0,"8–10 max."],["3% saline 150 mL bolus for seizures with hyponatraemia",1,""],["Correct Mg²⁺ before K⁺ in refractory hypokalaemia",1,""]]],
 ["Neuromuscular disease",[["MG is resistant to suxamethonium",1,""],["LEMS is resistant to non-depolarisers",0,"Sensitive."],["Duchenne: avoid suxamethonium",1,""],["Myotonia is relieved by NMBs",0,"Not relieved."],["Autonomic dysreflexia occurs with lesions above T6",1,""]]],
 ["Musculoskeletal and syndromes",[["RA can cause cricoarytenoid arthritis",1,""],["Atlantoaxial subluxation is rare in RA",0,"~25%."],["Down syndrome patients often need a smaller ETT",1,""],["AVSD is common in Down syndrome",1,""],["Ankylosing spondylitis makes neuraxial blocks easier",0,""]]],
 ["Elderly and haematology",[["Hypoactive delirium is commonest",1,""],["CFS ≥ 5 indicates frailty",1,""],["TAPS supports pre-op transfusion to Hb 100 in HbSS",1,""],["Sickle trait needs exchange transfusion",0,""],["Capacity is decision-specific",1,""]]],
];

const CRISIS=[
 ["Thyroid storm","nibp",["Recognise: hyperthermia, tachycardia/AF, hypertension then shock, agitation; exclude MH (rigidity, CO2), phaeo, sepsis, NMS.","Cool, O2, fluids; β-blockade (esmolol infusion or propranolol 1 mg IV increments) unless cardiogenic shock.","Propylthiouracil 500–1000 mg load then 250 mg 4-hourly via NG (or carbimazole), then Lugol's iodine ≥ 1 h later.","Hydrocortisone 100 mg IV 8-hourly; treat precipitant; avoid aspirin (displaces T4).","ICU; consider plasmapheresis or cholestyramine if refractory."],"Excess thyroid hormone raises metabolic rate and adrenergic sensitivity."],
 ["Adrenal crisis","nibp",["Suspect: refractory hypotension, hyponatraemia, hyperkalaemia, hypoglycaemia in a patient on steroids or with adrenal disease.","Hydrocortisone 100 mg IV immediately (don't wait for cortisol result; take a sample first if possible).","Fluids: 0.9% saline 1 L over 1 h then guided; glucose if hypoglycaemic.","Hydrocortisone 200 mg/24 h by infusion (or 50 mg 6-hourly); vasopressors if needed.","Find the precipitant; endocrine review; sick-day rules education."],"Cortisol deficiency removes permissive vascular tone and gluconeogenesis."],
 ["Intraoperative phaeochromocytoma crisis","abp",["Deepen anaesthesia; stop surgical stimulation (tumour handling); 100% O2.","Phentolamine 1–2 mg IV boluses; SNP or GTN infusion; magnesium 2–4 g IV; clevidipine/nicardipine.","Tachyarrhythmias after α control: esmolol, amiodarone if needed.","After tumour vein ligation: stop vasodilators; fluids, noradrenaline/vasopressin for hypotension; check glucose.","Undiagnosed phaeo (unexpected crisis during unrelated surgery): stabilise, abandon if possible, investigate later."],"Catecholamine surges from tumour manipulation; then sudden withdrawal after ligation."],
 ["Carcinoid crisis","nibp",["Recognise: flushing, bronchospasm, hypotension (or hypertension), tachycardia during tumour handling or induction.","Octreotide 20–100 µg IV bolus (repeat; up to 500 µg), increase infusion.","Fluids; phenylephrine or vasopressin for hypotension (avoid adrenaline and ephedrine where possible).","Bronchospasm: octreotide, ipratropium, deepen with volatile; avoid histamine-releasing drugs.","Continue octreotide postoperatively and taper; HDU monitoring."],"Release of serotonin, kinins and histamine from the tumour."],
 ["Myasthenic vs cholinergic crisis","ecg",["Weakness with respiratory compromise (VC < 15–20 mL/kg, rising CO2, bulbar weakness): secure the airway and ventilate.","Distinguish: cholinergic has miosis, salivation, bronchorrhoea, sweating, bradycardia, fasciculations, diarrhoea after recent dose increase.","Myasthenic: stop triggers (infection, drugs), plasma exchange or IVIg, steroids.","Cholinergic: stop anticholinesterases, atropine/glycopyrrolate for muscarinic effects, ventilate until recovered, then reintroduce cautiously.","ICU; neurology."],"Too little ACh effect (myasthenic) vs depolarising block from excess ACh (cholinergic)."],
 ["Autonomic dysreflexia","abp",["Recognise: severe hypertension, bradycardia, flushing and sweating above the lesion, headache, in a patient with spinal cord injury at or above T6.","Remove the stimulus: stop surgery/stimulation, check bladder (catheter), bowel, positioning, tight clothing.","Deepen anaesthesia (volatile, propofol) or extend the regional block.","Antihypertensives: GTN, nifedipine, labetalol, phentolamine, magnesium.","Prevention: adequate anaesthesia (GA or spinal) even for 'insensate' procedures."],"Uninhibited sympathetic reflexes below the lesion; descending inhibition lost."],
 ["Severe hyperkalaemia under anaesthesia","etco2",["Recognise: peaked T waves, broad QRS, bradycardia, arrhythmias; check K⁺ (blood gas).","Calcium chloride 10% 10 mL IV (repeat to effect), stop K⁺ sources (blood, Hartmann's, suxamethonium), hyperventilate.","Insulin 10 units + 25 g glucose; salbutamol; bicarbonate if acidotic.","Cardiac arrest: CPR with calcium; consider dialysis/ECMO.","Find cause: renal failure, rhabdomyolysis, reperfusion, transfusion, MH, suxamethonium in at-risk patient."],"Raised extracellular K⁺ depolarises resting membrane, inactivating Na⁺ channels."],
];

const SRC="";
const ERR="";
const REFS="";

const DIAG=`<div class="grid2">
 <div class="fig"><h3>Cardiac risk work-up</h3>
  <div class="ctl" id="rk-box" style="flex-direction:column;align-items:flex-start;gap:4px"></div>
  <div class="ctl"><div class="seg" id="rk-mets"></div></div>
  <div class="svgbox"><svg id="rk" viewBox="0 0 520 200" role="img" aria-label="RCRI"></svg></div>
  <div class="readout" id="rk-r"></div></div>

 <div class="fig"><h3>Aortic stenosis: LV and aortic pressures</h3>
  <div class="ctl"><label>Aortic valve area cm² <input type="range" id="as-a" min="0.4" max="3" step="0.05" value="0.8"><output id="as-a-o"></output></label>
   <label>Heart rate <input type="range" id="as-h" min="50" max="130" step="5" value="75"><output id="as-h-o"></output></label>
   <label>Diastolic BP mmHg <input type="range" id="as-d" min="30" max="90" step="1" value="60"><output id="as-d-o"></output></label></div>
  <div class="svgbox"><svg id="as" viewBox="0 0 520 260" role="img" aria-label="Aortic stenosis"></svg></div>
  <div class="readout" id="as-r"></div></div>

 <div class="fig"><h3>Hyperkalaemia: ECG progression</h3>
  <div class="ctl"><label>Serum K⁺ mmol/L <input type="range" id="hk-k" min="3" max="9.5" step="0.1" value="6.5"><output id="hk-k-o"></output></label></div>
  <div class="svgbox"><svg id="hk" viewBox="0 0 520 220" role="img" aria-label="Hyperkalaemia ECG"></svg></div>
  <div class="readout" id="hk-r"></div></div>

 <div class="fig" style="grid-column:1/-1"><h3>STOP-BANG screening</h3>
  <div class="ctl" id="sb-box" style="flex-direction:row;flex-wrap:wrap;gap:6px 18px"></div>
  <div class="svgbox"><svg id="sb" viewBox="0 0 900 90" role="img" aria-label="STOP-BANG"></svg></div>
  <div class="readout" id="sb-r"></div></div>

 <div class="fig" style="grid-column:1/-1"><h3>Neuromuscular disease and NMB sensitivity</h3>
  <div class="seg" id="nd-sel"></div>
  <div class="svgbox"><svg id="nd" viewBox="0 0 900 280" role="img" aria-label="NMB dose response"></svg></div>
  <div class="readout" id="nd-r"></div></div>
</div>`;

function initDiagrams(){
 const out=(id,t)=>{const o=$("#"+id+"-o");if(o)o.textContent=t};
 const mk=svg=>(t,a,tx)=>{const e=document.createElementNS(SVGNS,t);for(const k in a)e.setAttribute(k,a[k]);if(tx!=null)e.textContent=tx;svg.append(e);return e};
 const cbRow=f=>`display:flex;flex-direction:row;align-items:center;gap:6px`;

 /* 1. RCRI */
 let rkM="ge4";const rb=$("#rk-box");RCRI_F.forEach((f,i)=>rb.append(el("label",{style:cbRow()},`<input type="checkbox" id="rk-${i}" ${i===0||i===1?"checked":""}> ${f}`)));
 function drawRK(){const n=RCRI_F.filter((_,i)=>$("#rk-"+i).checked).length;const svg=$("#rk");svg.innerHTML="";const add=mk(svg);
  [0,1,2,3].forEach(i=>{const x=40+i*115,h=RCRI_R[i]*12;add("rect",{x,y:170-h,width:80,height:h,fill:Math.min(n,3)===i?"var(--abp)":"var(--muted)","fill-opacity":Math.min(n,3)===i?0.9:0.3});add("text",{x:x+40,y:164-h,"text-anchor":"middle",class:"lbl"},RCRI_R[i]+"%");add("text",{x:x+40,y:188,"text-anchor":"middle",class:"lbl"},i===3?"≥ 3 factors":i+" factor"+(i===1?"":"s"))});
  const poor=rkM!=="ge4";let rec;
  if(n===0&&!poor)rec="Low risk: proceed. No further cardiac testing.";
  else if(!poor)rec="Elevated clinical risk but ≥ 4 METs (DASI > 34): proceed; consider baseline and postoperative troponin and NT-proBNP (≥ 65 or CV disease); ECG.";
  else rec="Elevated risk with poor or unknown functional capacity: NT-proBNP/BNP and troponin; ECG; echo if dyspnoea, murmur or suspected HF; stress imaging only if it would change management; consider CPET; optimise medicines; plan level of care. Don't delay time-sensitive surgery.";
  $("#rk-r").innerHTML=`RCRI <b>${n}</b>: original major cardiac event risk ~<b>${RCRI_R[Math.min(n,3)]}%</b> (higher with troponin surveillance). ${rec}`}
 RCRI_F.forEach((_,i)=>$("#rk-"+i).onchange=drawRK);
 seg($("#rk-mets"),[["ge4","≥ 4 METs / DASI > 34"],["lt4","< 4 METs or unknown"]],k=>{rkM=k;drawRK()},"ge4");

 /* 2. Aortic stenosis */
 function drawAS(){const A=+$("#as-a").value,hr=+$("#as-h").value,dbp=+$("#as-d").value;out("as-a",A.toFixed(2));out("as-h",hr);out("as-d",dbp);
  const sv=70*(hr>90?0.85:1),T=60/hr,et=Math.max(0.2,0.36-0.0016*(hr-60)),q=sv/et;const vmax=q*1.5/(A*100);const peakG=4*vmax*vmax,meanG=peakG*0.6;
  const sbp=Math.max(dbp+20,120-(A<1?(1-A)*30:0));const lvsp=sbp+peakG;
  const P=plot($("#as"),{w:520,h:260,x0:0,x1:2*T,y0:0,y1:Math.max(220,lvsp*1.1),xt:[0,+(T).toFixed(2),+(2*T).toFixed(2)],yt:[0,50,100,150,200],xl:"Time (s)",yl:"mmHg"});
  const lv=t=>{const c=t%T;return c<et?12+(lvsp-12)*Math.sin(Math.PI*c/et):c<et+0.05?12:12};const ao=t=>{const c=t%T;return c<et?Math.max(dbp,dbp+(sbp-dbp)*Math.sin(Math.PI*Math.min(1,c/et*0.9))):dbp+(sbp-dbp)*0.35*Math.exp(-(c-et)/0.4)};
  P.line(range(0,2*T,300).map(t=>[t,lv(t)]),{stroke:"var(--abp)"});P.line(range(0,2*T,300).map(t=>[t,ao(t)]),{stroke:"var(--spo2)"});
  P.text(0.02,Math.max(220,lvsp*1.1)*0.93,"LV",{fill:"var(--abp)","font-size":"11"});P.text(0.12,Math.max(220,lvsp*1.1)*0.93,"aorta",{fill:"var(--spo2)","font-size":"11"});
  const dt=(T-et)*hr;const cpp=dbp-15;const grade=A<0.6?"very severe":A<1?"severe":A<=1.5?"moderate":"mild";
  $("#as-r").innerHTML=`AVA ${A.toFixed(2)} cm² (<b>${grade}</b>): peak velocity ~${vmax.toFixed(1)} m/s, peak gradient ~${peakG.toFixed(0)} mmHg, mean ~${meanG.toFixed(0)} mmHg; LV systolic ~${lvsp.toFixed(0)} mmHg. Diastolic time ${(dt).toFixed(0)}% of the minute; coronary perfusion pressure ~${cpp} mmHg (DBP − LVEDP ~15). ${hr>90?"<b>Tachycardia</b> shortens diastole (less coronary flow) and ejection time (higher gradient). ":""}${dbp<50?"<b>Low diastolic pressure</b> threatens subendocardial perfusion of the hypertrophied LV: give a vasoconstrictor. ":""}Schematic model.`}
 ["#as-a","#as-h","#as-d"].forEach(x=>$(x).oninput=drawAS);drawAS();

 /* 3. Hyperkalaemia ECG */
 function drawHK(){const k=+$("#hk-k").value;out("hk-k",k.toFixed(1));const svg=$("#hk");svg.innerHTML="";const add=mk(svg);
  const f=Math.max(0,(k-5)/4);const pAmp=Math.max(0,1-Math.max(0,k-6.5)/1.5)*8,pr=0.16+Math.max(0,k-6)*0.03,qrs=0.08+Math.max(0,k-6.5)*0.06,tAmp=k<3.5?6:k<5.5?14:14+(k-5.5)*14,u=k<3.2?6:0;
  const pts=[];const beat=0.9;for(let i=0;i<=500;i++){const t=i/500*2.7;const c=t%beat;let v=0;
   if(k>=8.5){v=40*Math.sin(2*Math.PI*c/(beat*0.6))}else{
   if(c<0.08)v=pAmp*Math.sin(Math.PI*c/0.08);
   const q0=pr;if(c>=q0&&c<q0+qrs){const x=(c-q0)/qrs;v=x<0.2?-6*x/0.2:x<0.5?-6+56*(x-0.2)/0.3:x<0.8?50-62*(x-0.5)/0.3:-12+12*(x-0.8)/0.2}
   const t0=q0+qrs+0.08,tw=k>6?0.16:0.2;if(c>=t0&&c<t0+tw)v=tAmp*Math.sin(Math.PI*(c-t0)/tw)*(k>6?Math.pow(Math.sin(Math.PI*(c-t0)/tw),1):1);
   if(u&&c>=t0+tw+0.02&&c<t0+tw+0.12)v=u*Math.sin(Math.PI*(c-t0-tw-0.02)/0.1)}
   pts.push([20+i*0.96,120-v*1.6])}
  add("path",{d:pts.map((p,i)=>(i?"L":"M")+p[0].toFixed(1)+" "+p[1].toFixed(1)).join(" "),fill:"none",stroke:"var(--ecg)","stroke-width":1.6});
  let stage;if(k<3.5)stage="Hypokalaemia: flat T, ST depression, prominent U waves, long QU; arrhythmias.";else if(k<5.5)stage="Normal.";else if(k<6.5)stage="Peaked, narrow-based T waves.";else if(k<7.5)stage="Flattened P waves, prolonged PR, peaked T: emergency treatment.";else if(k<8.5)stage="Broad QRS merging with T: imminent arrest.";else stage="Sine-wave pattern: pre-arrest (VF/asystole). Calcium now.";
  $("#hk-r").innerHTML=`K⁺ ${k.toFixed(1)} mmol/L: <b>${stage}</b> ECG changes correlate poorly with the exact level; any change with K⁺ ≥ 6.5 needs calcium. Schematic.`}
 $("#hk-k").oninput=drawHK;drawHK();

 /* 4. STOP-BANG */
 const sbb=$("#sb-box");SB.forEach((f,i)=>sbb.append(el("label",{style:cbRow()},`<input type="checkbox" id="sb-${i}" ${[0,4,7].includes(i)?"checked":""}> ${f}`)));
 function drawSB(){const n=SB.filter((_,i)=>$("#sb-"+i).checked).length;const svg=$("#sb");svg.innerHTML="";const add=mk(svg);
  for(let i=0;i<=8;i++){const x=40+i*95;add("rect",{x,y:20,width:80,height:50,rx:6,fill:i<=n?(n>=5?"var(--bad)":n>=3?"var(--warn)":"var(--good)"):"var(--panel)",stroke:"var(--line)","fill-opacity":i<=n?0.6:1});add("text",{x:x+40,y:51,"text-anchor":"middle",class:"lbl","font-size":"14"},i)}
  const stop=SB.slice(0,4).filter((_,i)=>$("#sb-"+i).checked).length;const high=n>=5||(stop>=2&&($("#sb-4").checked||$("#sb-6").checked||$("#sb-7").checked));
  $("#sb-r").innerHTML=`STOP-BANG <b>${n}/8</b>: ${high?"<b>high risk</b> of moderate–severe OSA":n>=3?"intermediate risk":"low risk"}. ${high?"Plan: treat as OSA (minimise opioids and sedatives, regional/multimodal analgesia, extubate awake semi-upright, continuous SpO2, CPAP availability); refer for sleep study if elective timeline allows.":""}`}
 SB.forEach((_,i)=>$("#sb-"+i).onchange=drawSB);drawSB();

 /* 5. NMB sensitivity */
 function drawND(k){const [nm,roc,sux,txt]=NMD[k];const svg=$("#nd");svg.innerHTML="";
  const E=(d,ed95)=>{const ed50=ed95/Math.pow(19,1/4.5);return 100/(1+Math.pow(ed50/d,4.5))};
  const P1=plot(svg,{w:450,h:280,x0:-2,x1:0.5,y0:0,y1:100,xt:[-2,-1.5,-1,-0.5,0,0.5],yt:[0,50,95],xl:"log10 rocuronium dose (mg/kg)",yl:"% twitch depression",clear:false});
  P1.line(range(-2,0.5,150).map(x=>[x,E(Math.pow(10,x),0.3)]),{stroke:"var(--muted)","stroke-dasharray":"5 4","stroke-width":1.5});P1.line(range(-2,0.5,150).map(x=>[x,E(Math.pow(10,x),roc)]),{stroke:"var(--abp)"});
  P1.text(-1.95,92,"Rocuronium",{"font-size":"11"});
  const svg2=svg;const add=mk(svg2);const g=document.createElementNS(SVGNS,"g");g.setAttribute("transform","translate(450,0)");svg2.append(g);
  const P2=plot(g,{w:450,h:280,x0:-2,x1:0.5,y0:0,y1:100,xt:[-2,-1.5,-1,-0.5,0,0.5],yt:[0,50,95],xl:"log10 suxamethonium dose (mg/kg)",yl:"",clear:false});
  P2.line(range(-2,0.5,150).map(x=>[x,E(Math.pow(10,x),0.3)]),{stroke:"var(--muted)","stroke-dasharray":"5 4","stroke-width":1.5});
  if(k!=="dmd")P2.line(range(-2,0.5,150).map(x=>[x,E(Math.pow(10,x),sux)]),{stroke:"var(--etco2)"});else P2.text(-1.6,50,"Contraindicated",{fill:"var(--bad)","font-size":"14"});
  P2.text(-1.95,92,"Suxamethonium",{"font-size":"11"});
  $("#nd-r").innerHTML=`<b>${nm}</b> (solid) vs normal (dashed). ${txt} Rocuronium ED95 ~${roc} mg/kg; suxamethonium ED95 ~${k==="dmd"?"n/a":sux} mg/kg. Schematic dose–response curves; always use quantitative monitoring.`}
 seg($("#nd-sel"),Object.entries(NMD).map(([k,v])=>[k,v[0]]),drawND,"mg");
}

ATLAS.register({id:"13",name:"Medicine & anaesthesia",
  lede:"Preoperative assessment, CPET, ischaemic and valvular heart disease, arrhythmias and pulmonary hypertension, respiratory disease, obesity and OSA, thyroid, adrenal, phaeochromocytoma and carcinoid, diabetes, liver and renal disease, electrolytes, neuromuscular and musculoskeletal disease, haematology and the older patient.",
  barsNote:"",
  bars:BARS,fam:FAM,slides:SLIDES,calcs:CALCS,tables:TABLES,cards:CARDS,fcf:FCF,viva:VIVA,quiz:QUIZ,crisis:CRISIS,
  sources:SRC,errata:ERR,refs:REFS,diagHTML:DIAG,initDiagrams,
  diagLede:"Five clinical tools: a cardiac risk work-up (RCRI and functional capacity), an aortic stenosis pressure model, hyperkalaemia ECG progression, STOP-BANG screening and NMB dose–response in neuromuscular disease."});
})();
