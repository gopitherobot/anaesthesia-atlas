/* Stage 09 · CVS & other drugs */
(function(){
const {plot,range,el,SVGNS,fmt,$,$$,seg}=ATLAS.h;

const BARS=[];

const FAM={cv:["abp","Cardiovascular drugs"],vaso:["spo2","Inotropes & vasopressors"],coag:["ecg","Anticoagulants & haemostasis"],gi:["nibp","GI, endocrine, antiemetics"],misc:["etco2","Antimicrobials, CNS, respiratory"]};

const SLIDES=[
{f:"vaso",t:"Adrenoceptors and the sympathomimetics",b:`<ul class="clean"><li><b>Catecholamine synthesis</b>: tyrosine → (tyrosine hydroxylase, rate-limiting) DOPA → dopamine → (dopamine β-hydroxylase, in vesicles) noradrenaline → (PNMT, adrenal medulla, induced by cortisol) adrenaline. Removal: neuronal reuptake (uptake 1, ~80%: blocked by cocaine and tricyclics), extraneuronal uptake 2, MAO and COMT to VMA and metanephrines.</li>
<li><b>Receptors</b>: α1 (Gq: vasoconstriction, mydriasis, uterine contraction), α2 (Gi: presynaptic inhibition of NA release, sedation, analgesia, ↓ insulin), β1 (Gs: inotropy, chronotropy, dromotropy, renin), β2 (Gs: bronchodilation, vasodilation in muscle, glycogenolysis, K⁺ into cells, uterine relaxation), β3 (lipolysis, detrusor relaxation), D1 (Gs: renal and mesenteric vasodilation, natriuresis), D2 (Gi: presynaptic, CTZ).</li>
<li><b>Classification of sympathomimetics</b>: natural catecholamines (adrenaline, noradrenaline, dopamine), synthetic catecholamines (isoprenaline, dobutamine, dopexamine), non-catecholamines: direct (phenylephrine, methoxamine, salbutamol), indirect (amphetamine, cocaine), mixed (ephedrine, metaraminol).</li>
<li><b>Indirect action</b> depends on noradrenaline stores (tachyphylaxis with ephedrine) and is dangerous with MAOIs and cocaine.</li>
<li><b>Catecholamines</b> have a catechol (3,4-dihydroxybenzene) ring and an amine; they are not active orally (COMT, MAO in gut and liver), have a short t½ (~2 min), and are given by infusion through a central line (extravasation: phentolamine).</li></ul>`,
p:"A classic opener: 'Draw the synthesis pathway and classify the sympathomimetics'. The receptor profile diagram (Diagrams tab) shows how dose changes the receptor mix.",
v:"Synthesis and removal, receptors with G-proteins and effects, classification, direct vs indirect."},
{f:"vaso",t:"Inotropes and vasopressors",b:`<div class="tbl"><table><tr><th>Drug</th><th>Receptors</th><th>Typical dose</th><th>Notes</th></tr>
<tr><td>Adrenaline</td><td>β1, β2 (low); α1 (high)</td><td>0.01–0.5 µg/kg/min</td><td>Inotropy, lactate (β2 glycolysis), hyperglycaemia, arrhythmia</td></tr>
<tr><td>Noradrenaline</td><td>α1 ≫ β1</td><td>0.01–1 µg/kg/min</td><td>First-line in septic shock; reflex bradycardia</td></tr>
<tr><td>Dopamine</td><td>D1 (low), β1 (mid), α1 (high)</td><td>2–20 µg/kg/min</td><td>"Renal dose" has no benefit; arrhythmias (SOAP II)</td></tr>
<tr><td>Dobutamine</td><td>β1 &gt; β2, α1 (racemate)</td><td>2.5–20 µg/kg/min</td><td>Inodilator, tachycardia, stress echo</td></tr>
<tr><td>Isoprenaline</td><td>β1, β2</td><td>1–10 µg/min</td><td>Bradycardia and heart block bridge</td></tr>
<tr><td>Milrinone</td><td>PDE3 inhibition (↑ cAMP)</td><td>0.375–0.75 µg/kg/min</td><td>Inodilator, lusitropy, RV failure; renal excretion</td></tr>
<tr><td>Levosimendan</td><td>Troponin C Ca²⁺ sensitiser; K<sub>ATP</sub> opener</td><td>0.05–0.2 µg/kg/min (24 h)</td><td>Active metabolite OR-1896, effect lasts ~1 week</td></tr>
<tr><td>Vasopressin</td><td>V1 (V2 renal)</td><td>0.01–0.04 U/min</td><td>Catecholamine-sparing (VASST); digital and gut ischaemia</td></tr>
<tr><td>Phenylephrine</td><td>α1</td><td>50–100 µg bolus; 25–100 µg/min</td><td>Obstetric spinal hypotension (infusion), reflex bradycardia</td></tr>
<tr><td>Metaraminol</td><td>α1 (direct + indirect), some β1</td><td>0.5–1 mg bolus; 1–10 mg/h</td><td>UK ward/theatre favourite; peripheral infusion</td></tr>
<tr><td>Ephedrine</td><td>α, β (mixed, mainly indirect)</td><td>3–6 mg boluses</td><td>Tachyphylaxis; crosses placenta (fetal acidosis)</td></tr>
<tr><td>Methylene blue</td><td>Inhibits NOS and guanylyl cyclase</td><td>1–2 mg/kg</td><td>Vasoplegia; serotonin syndrome with SSRIs; false SpO2 fall</td></tr>
<tr><td>Angiotensin II</td><td>AT1</td><td>20 ng/kg/min</td><td>Refractory vasodilatory shock (ATHOS-3)</td></tr></table></div>
<ul class="clean"><li><b>Inotrope classification</b> by mechanism: ↑ cAMP (β agonists, PDE3 inhibitors, glucagon), ↑ intracellular Ca²⁺ (calcium, digoxin via Na⁺/K⁺-ATPase), Ca²⁺ sensitisers (levosimendan), others (thyroid hormone T3, myosin activators: omecamtiv mecarbil).</li>
<li><b>Septic shock</b> (SSC 2021): noradrenaline first-line, target MAP 65 mmHg (65 trial: 60–65 in over-65s), add vasopressin at 0.25–0.5 µg/kg/min noradrenaline, add dobutamine or adrenaline for myocardial dysfunction, hydrocortisone 200 mg/day when vasopressor needs persist.</li></ul>`,
p:"Examiners ask for inotropes with doses. Know the receptor, dose and one trial or caveat for each.",
v:"Classify by mechanism, then go drug by drug (receptor, dose, haemodynamic profile, side effects), then a clinical scenario (septic shock vs cardiogenic shock vs RV failure)."},
{f:"cv",t:"Antihypertensives and perioperative continuation",b:`<ul class="clean"><li><b>Classes</b>: ACE inhibitors and ARBs; calcium channel blockers (dihydropyridine: amlodipine, nifedipine, nicardipine; non-dihydropyridine: verapamil, diltiazem); thiazide-like diuretics (indapamide, bendroflumethiazide); β-blockers; α1 blockers (doxazosin); central α2 agonists (clonidine, methyldopa: pregnancy); direct vasodilators (hydralazine, minoxidil); aldosterone antagonists (spironolactone); renin inhibitor (aliskiren). NICE: ACEi/ARB first (CCB if Black African/Caribbean or &gt; 55), then add CCB, then thiazide-like diuretic, then spironolactone or α/β-blocker.</li>
<li><b>Perioperative</b>:
<ul class="clean"><li><b>β-blockers</b>: continue if established (withdrawal causes rebound tachycardia and ischaemia). Do not start high-dose β-blockade within 24 h of surgery (POISE: fewer MIs but more strokes and deaths with metoprolol 200 mg). Start, if indicated, ≥ 2–7 days before and titrate.</li>
<li><b>ACEi/ARBs</b>: either omit 24 h before surgery or continue. STOP-or-NOT (JAMA 2024) found the same 22% major complication rate either way, but more intra-operative hypotension when continued. Omit when hypotension risk is high (major surgery, neuraxial, sepsis, low EF caution) and restart within 48 h when euvolaemic and creatinine stable.</li>
<li>CCBs, statins, clonidine: continue. Diuretics: usually omit on the morning of surgery. Stopping clonidine causes rebound hypertension.</li></ul></li>
<li><b>Anaesthetic interactions</b>: CCBs potentiate NMBs and volatile negative inotropy, and blunt the stress response; verapamil with β-blockers causes AV block. ACEi/ARB cause vasoplegia that responds poorly to phenylephrine (vasopressin works). β-blockers mask hypoglycaemia and blunt the response to adrenaline in anaphylaxis (glucagon).</li>
<li><b>Postponing surgery</b>: AAGBI/BHS 2016: proceed with elective surgery if primary care BP &lt; 160/100 mmHg; if not known, defer if clinic BP ≥ 180/110.</li>
<li><b>Calcium channels</b>: L-type (long-lasting; heart, smooth muscle; target of CCBs), T-type (transient; SA node, thalamus; ethosuximide), N-type (neuronal; ziconotide), P/Q-type (presynaptic NMJ: Lambert–Eaton antibodies), R-type.</li></ul>`,
p:"Typical exam questions: 'Antihypertensives: perioperative recommendations', 'Perioperative use of β-blockers', 'Ca channel types and differences', 'Ca channel blockers' effect on anaesthesia'.",
v:"Classification, NICE ladder, then drug-by-drug perioperative advice with evidence (POISE, STOP-or-NOT), anaesthetic interactions, BP thresholds for elective surgery."},
{f:"cv",t:"Vasodilators and controlled hypotension",b:`<ul class="clean"><li><b>GTN (glyceryl trinitrate)</b>: denitrated in smooth muscle (mitochondrial aldehyde dehydrogenase) to NO, which activates guanylyl cyclase → cGMP → ↓ Ca²⁺. <b>Venodilator</b> mainly (↓ preload, ↓ LVEDP, ↓ wall tension, coronary dilation, relieves spasm). Infusion 10–200 µg/min (0.5–10 mg/h); sublingual 400 µg. Tolerance in 24 h (needs a nitrate-free interval); adsorbs to PVC; methaemoglobinaemia; headache; ↑ ICP. Uses: angina, acute LV failure, hypertension in pre-eclampsia at intubation, uterine relaxation, oesophageal spasm.</li>
<li><b>Sodium nitroprusside (SNP)</b>: ferrous ion with five cyanide ligands and one nitrosyl. Reacts with oxyhaemoglobin to release NO (direct, no enzyme), so it acts within seconds and wears off within 1–2 min. <b>Arterial and venous</b> dilator. 0.3–1.5 µg/kg/min initially, maximum 8 µg/kg/min for ≤ 10 min; total ≤ 1.5 mg/kg for short procedures. Protect from light. <b>Cyanide toxicity</b>: each molecule releases 5 CN⁻; detoxified by rhodanese with thiosulphate to thiocyanate (renal, toxic if accumulates) and by methaemoglobin to cyanomethaemoglobin. Signs: tachyphylaxis, metabolic (lactic) acidosis, ↑ mixed venous O2 (cells cannot use O2), arrhythmias. Treat with stopping SNP, O2, sodium thiosulphate, hydroxocobalamin 5 g, dicobalt edetate. Also reflex tachycardia, rebound hypertension, ↑ ICP, inhibits HPV.</li>
<li><b>GTN vs SNP</b>: GTN is venous-predominant, enzyme-dependent (tolerance), safer; SNP is balanced, faster, more potent and titratable, but has cyanide risk and light sensitivity.</li>
<li><b>Hydralazine</b>: arteriolar dilator (↑ cGMP, opens K⁺ channels), 5–10 mg IV slowly; reflex tachycardia; lupus-like syndrome (slow acetylators). Pre-eclampsia second-line. <b>Labetalol</b>: α1 + β (1:3 oral, 1:7 IV), 5–20 mg IV increments or 50 mg over 1 min; infusion 20–160 mg/h. <b>Esmolol</b>: cardioselective β1, ester (RBC esterases), t½ 9 min; 0.5 mg/kg then 50–200 µg/kg/min. <b>Phentolamine</b>: competitive α1/α2 antagonist (phaeochromocytoma, extravasation). <b>Clonidine</b> 15–30 µg increments (up to 150 µg). <b>Nicardipine/clevidipine</b>: titratable dihydropyridines.</li>
<li><b>Controlled (deliberate) hypotension</b>: for bloodless fields (middle ear, sinus, spine, orthognathic); MAP 50–65 mmHg or ≥ 30% below baseline only in fit patients. Techniques: good position (head up, no venous obstruction), remifentanil and propofol TIVA, volatile, β-blockers, α2 agonists, vasodilators. Contraindicated in cerebrovascular, coronary and renal disease, uncontrolled hypertension, pregnancy. Risks: cerebral and spinal cord ischaemia, ION (visual loss), AKI.</li></ul>`,
p:"Typical exam questions: 'Postoperative hypertension: differential diagnosis and treatment (β-blockers with doses, GTN, nitroprusside all in doses and details, and clonidine with dose)'. Exclude pain, hypoxia, hypercapnia, full bladder, awareness and omitted drugs before giving drugs.",
v:"Mechanism (NO/cGMP), GTN vs SNP table, SNP cyanide metabolism and treatment, other agents with doses, then controlled hypotension."},
{f:"cv",t:"Antiarrhythmic classification",b:`<ul class="clean"><li><b>Vaughan Williams (Singh–Vaughan Williams)</b>:
<ul class="clean"><li><b>Class I</b>: Na⁺ channel block (phase 0). <b>Ia</b> intermediate dissociation, prolongs APD (quinidine, procainamide, disopyramide). <b>Ib</b> fast dissociation, shortens APD, works in ischaemic, depolarised tissue (lidocaine, mexiletine, phenytoin). <b>Ic</b> slow dissociation, marked slowing of conduction, little effect on APD (flecainide, propafenone; avoid in structural heart disease: CAST).</li>
<li><b>Class II</b>: β-blockers (↓ phase 4 slope in nodes, slow AV conduction).</li>
<li><b>Class III</b>: K⁺ channel block (I<sub>Kr</sub>), prolong APD and refractoriness (amiodarone, sotalol, dronedarone, ibutilide, dofetilide). QT prolongation and torsades.</li>
<li><b>Class IV</b>: L-type Ca²⁺ channel block (verapamil, diltiazem): slow SA and AV nodes.</li></ul></li>
<li><b>Limitations</b>: many drugs have several actions (amiodarone has all four; sotalol is II + III); omits digoxin, adenosine, magnesium, atropine; based on single-cell electrophysiology, not clinical use.</li>
<li><b>Modernised classification (Lei 2018)</b> adds: class 0 (HCN/I<sub>f</sub> blockers: ivabradine), class II subdivided (β-blockers, β-agonists, muscarinic M2 inhibitors (atropine) and activators (digoxin's vagal action, adenosine A1 agonists)), class IV extended to Ca²⁺ handling (RyR2 block by flecainide), class V (mechanosensitive channels), VI (gap junctions), VII (upstream modulators: ACEi, ARBs, statins, omega-3).</li>
<li><b>Clinical classification</b>: supraventricular (adenosine, verapamil, digoxin, β-blockers), ventricular (lidocaine, mexiletine), both (amiodarone, sotalol, flecainide, procainamide).</li>
<li><b>Proarrhythmia</b>: all antiarrhythmics can cause arrhythmias: torsades (class Ia, III), incessant VT (Ic), bradycardia and block (II, IV, digoxin, amiodarone).</li></ul>`,
p:"Typical exam questions: 'Antiarrhythmics: classification and mechanism of action'. Draw the ventricular and SA node action potentials and show where each class acts (Diagrams tab).",
v:"Draw the APs, give classes with examples, the limitations, then the clinical classification."},
{f:"cv",t:"Amiodarone, adenosine, digoxin and magnesium",b:`<ul class="clean"><li><b>Amiodarone</b>: benzofuran (iodinated: 37% iodine by weight, structurally like thyroxine). Class III with I, II and IV actions. IV 300 mg over 20–60 min (5 mg/kg) then 900 mg over 24 h (via central line: phlebitis); 300 mg bolus in VF/pVT after the third shock (150 mg after the fifth). Vd ~60 L/kg, t½ 20–100 days, protein bound &gt; 95%; CYP3A4 to active desethylamiodarone; inhibits CYP3A4, 2C9, 2D6 and P-gp (↑ warfarin, digoxin, simvastatin, ciclosporin levels). <b>Side effects</b>: hypotension and bradycardia IV (polysorbate 80 solvent), QT prolongation, pulmonary fibrosis and pneumonitis (high FiO2 after surgery may precipitate ARDS), hypo- (more common) or hyperthyroidism (type 1 iodine-induced, type 2 thyroiditis), hepatitis, corneal microdeposits, optic neuropathy, photosensitivity and slate-grey skin, peripheral neuropathy, epididymitis.</li>
<li><b>Adenosine</b>: purine nucleoside, A1 receptor (Gi) on SA and AV nodes opens K<sub>ACh</sub> channels (hyperpolarisation) and reduces cAMP. Transient AV block terminates AV re-entry (AVNRT, AVRT) or unmasks atrial flutter. 6 mg rapid IV bolus and flush, then 12 mg, then 18 mg. t½ &lt; 10 s (uptake into RBCs and endothelium, adenosine deaminase). Reduce dose (3 mg) with a central line, heart transplant, dipyridamole or carbamazepine; theophylline blocks it. Side effects: chest pain, flushing, dyspnoea, bronchospasm (avoid in severe asthma), sense of doom; pre-excited AF can degenerate to VF.</li>
<li><b>Digoxin</b>: inhibits Na⁺/K⁺-ATPase, so ↑ intracellular Na⁺ reduces Na⁺/Ca²⁺ exchange and raises Ca²⁺ (weak inotrope); increases vagal tone (slows AV node). Rate control in AF (with HF), low-output HF. Loading 0.75–1.5 mg in divided doses; t½ ~36 h (renal); target 0.5–1 µg/L in HF (up to 2 µg/L for rate control). <b>Toxicity</b> (worse with ↓ K⁺, ↓ Mg²⁺, ↑ Ca²⁺, hypothyroidism, renal failure, amiodarone, verapamil, macrolides): nausea, xanthopsia, confusion, any arrhythmia (classically bidirectional VT, atrial tachycardia with block), hyperkalaemia in acute overdose. Digoxin-specific Fab fragments for life-threatening arrhythmias, K⁺ &gt; 5–6 mmol/L in acute overdose, or large ingestion. Avoid DC cardioversion if toxic (VF risk; use low energy).</li>
<li><b>Magnesium</b>: physiological Ca²⁺ antagonist; 2 g (8 mmol) IV over 10–15 min for torsades and AF; also asthma, pre-eclampsia (4 g load, 1 g/h), NMB potentiation.</li>
<li><b>Verapamil</b> 5–10 mg IV for narrow-complex tachycardia (never with β-blockers or in VT or pre-excited AF).</li></ul>`,
p:"Typical exam questions: 'Adenosine', 'Amiodarone: side effects', 'β-blockers and CCBs as antiarrhythmic agents'.",
v:"For each drug: structure, mechanism, dose, PK, side effects, interactions. Amiodarone: use the 'thyroid, lungs, liver, eyes, skin, nerves' list."},
{f:"cv",t:"Diuretics",b:`<ul class="clean"><li><b>Carbonic anhydrase inhibitors</b> (acetazolamide, PCT): ↓ HCO₃⁻ reabsorption → hyperchloraemic metabolic acidosis, alkaline urine. Uses: glaucoma, altitude sickness, IIH, metabolic alkalosis in ICU (DIABOLO).</li>
<li><b>Osmotic</b> (mannitol): freely filtered, not reabsorbed; holds water in PCT and descending limb; also expands plasma volume first (risk of pulmonary oedema), then diuresis; reduces brain water across an intact BBB; free radical scavenger. 0.25–1 g/kg (20% = 200 g/L; ~1100 mOsm/L). Rebound ICP rise; hypernatraemia or dilutional hyponatraemia; crystallises when cold.</li>
<li><b>Loop</b> (furosemide, bumetanide; thick ascending limb, NKCC2): reach the lumen by secretion (organic acid transporter) so need adequate renal blood flow; up to 25% of filtered Na⁺. Venodilation within minutes (IV). Side effects: ↓ K⁺, ↓ Mg²⁺, ↓ Ca²⁺ (hypercalciuria), hypochloraemic alkalosis, ototoxicity (with aminoglycosides), gout, hyperglycaemia. Furosemide 20–40 mg IV; t½ 1.5 h.</li>
<li><b>Thiazides and thiazide-like</b> (bendroflumethiazide, indapamide; DCT NCC): ~5% of Na⁺; ↓ Ca²⁺ excretion (hypercalcaemia), ↓ K⁺, ↓ Na⁺ (hyponatraemia: elderly women), ↓ Mg²⁺, hyperuricaemia, hyperglycaemia, hyperlipidaemia, impotence; lithium levels rise. Ineffective at GFR &lt; 30 (except metolazone).</li>
<li><b>Potassium-sparing</b>: aldosterone antagonists (spironolactone, eplerenone: HF mortality benefit, ascites, Conn's; gynaecomastia), ENaC blockers (amiloride, triamterene). Hyperkalaemia with ACEi, CKD.</li>
<li><b>Others</b>: SGLT2 inhibitors (PCT: glycosuria, osmotic natriuresis; HF and CKD benefit; euglycaemic DKA: omit day before and day of surgery), vaptans (V2 antagonists: SIADH; osmotic demyelination if overcorrection), ANP analogues.</li>
<li><b>Perioperative</b>: omit on the morning of surgery; check K⁺, Mg²⁺, Na⁺ and volume status; loop diuretics potentiate NMBs (hypokalaemia).</li></ul>`,
p:"Typical exam questions: 'Define osmolality and osmolarity and calculate osmolality of 50% mannitol'. 50% w/v = 500 g/L ÷ 182 g/mol ≈ 2750 mOsm/L (osmolarity; osmolality per kg of water is higher still). Use the calculator.",
v:"Draw the nephron with sites (Diagrams tab), go class by class with mechanism, % Na⁺ load, side effects and uses."},
{f:"coag",t:"Antiplatelet drugs",b:`<ul class="clean"><li><b>Aspirin</b>: irreversibly acetylates COX-1 (serine 529), blocking TXA2 synthesis for the platelet's lifetime (7–10 days; ~10% of platelets replaced daily). 75 mg daily; continue for most surgery and with neuraxial anaesthesia (not alone a contraindication); stop only for intracranial, posterior eye or prostate surgery when risk is extreme.</li>
<li><b>P2Y12 inhibitors</b> (block ADP receptor): clopidogrel (prodrug, CYP2C19, irreversible; stop 5–7 days before neuraxial or major surgery), prasugrel (prodrug, irreversible, 7 days), ticagrelor (direct, reversible, but stop 5 days; dyspnoea), cangrelor (IV, reversible, t½ 3–6 min: bridging).</li>
<li><b>GP IIb/IIIa antagonists</b> (abciximab, eptifibatide, tirofiban): block fibrinogen cross-linking; PCI.</li>
<li><b>PDE inhibitors</b>: dipyridamole (also adenosine reuptake inhibition), cilostazol. <b>PAR-1 antagonist</b>: vorapaxar.</li>
<li><b>Dual antiplatelet therapy (DAPT) and stents</b>: elective non-cardiac surgery should be delayed: ≥ 6 months after drug-eluting stent for stable disease (1–3 months possible with newer stents if urgent), 12 months after ACS. Continue aspirin throughout; stop the P2Y12 inhibitor only after cardiology discussion; operate in a centre with PCI access. Stopping DAPT early risks stent thrombosis (mortality ~ 40%).</li>
<li><b>Monitoring</b>: platelet function tests (PFA-100, VerifyNow, Multiplate, TEG platelet mapping). <b>Reversal</b>: platelet transfusion (less effective for ticagrelor while drug present), desmopressin (uraemia, aspirin), tranexamic acid.</li></ul>`,
p:"Typical exam questions: 'Anticoagulants (perioperative management)'. Combine this slide with the stop/restart timeline in Diagrams.",
v:"Mechanism and reversibility, timings, the stented patient (who to call, what to continue), monitoring and reversal."},
{f:"coag",t:"Heparins and HIT",b:`<ul class="clean"><li><b>Unfractionated heparin (UFH)</b>: sulphated glycosaminoglycan (3–30 kDa) from porcine mucosa. Binds antithrombin via a pentasaccharide, accelerating its inhibition of thrombin (IIa) and Xa about 1000-fold (also IXa, XIa, XIIa). IIa inhibition needs chains ≥ 18 saccharides to bridge thrombin. Prophylaxis 5000 IU SC 8–12-hourly; treatment: 80 IU/kg bolus then 18 IU/kg/h titrated to APTT ratio 1.5–2.5; bypass 300–400 IU/kg (ACT &gt; 400–480 s). t½ 1–2 h (dose-dependent, saturable reticuloendothelial clearance). Monitoring: APTT, ACT, anti-Xa.</li>
<li><b>Protamine</b>: basic (positive) protein from salmon sperm; 1 mg neutralises ~100 IU UFH (max 50 mg per dose, ≤ 5 mg/min). Reverses LMWH only ~60%. Reactions: hypotension (histamine release), anaphylaxis (prior NPH insulin exposure, fish allergy, vasectomy), catastrophic pulmonary vasoconstriction (thromboxane), and excess protamine is itself an anticoagulant.</li>
<li><b>LMWH</b> (enoxaparin, dalteparin, tinzaparin; 4–5 kDa): mainly anti-Xa (anti-Xa:IIa ratio 2–4:1), SC once or twice daily, predictable dose–response (weight-based), renal clearance (reduce if CrCl &lt; 30), less HIT and osteoporosis. Monitor anti-Xa (peak 3–4 h) in renal failure, obesity, pregnancy. Enoxaparin prophylaxis 40 mg daily; treatment 1.5 mg/kg daily or 1 mg/kg twice daily.</li>
<li><b>Fondaparinux</b>: synthetic pentasaccharide, pure indirect anti-Xa, t½ 17–21 h, renal, no HIT. Not reversed by protamine.</li>
<li><b>HIT</b>: type 1 is a mild non-immune fall in the first 4 days. Type 2 is IgG against heparin–PF4 complexes activating platelets via FcγRIIa: platelet fall &gt; 50% 5–10 days after starting (earlier if exposed in the last 100 days), with <b>thrombosis</b> (venous &gt; arterial), skin necrosis, anaphylactoid reactions to boluses. Assess with the 4Ts score (thrombocytopenia, timing, thrombosis, other causes), then PF4 immunoassay and functional assay (HIPA/SRA). Stop all heparin (including flushes); start a non-heparin anticoagulant (argatroban (hepatic), bivalirudin, fondaparinux, DOAC); no platelet transfusion unless bleeding; no warfarin until platelets &gt; 150 (venous limb gangrene); look for DVT.</li></ul>`,
p:"Typical exam questions: 'Heparin and its antidote', 'Heparin: mechanism of action, side effects, reversal, uses'.",
v:"Structure and mechanism (antithrombin), UFH vs LMWH table, monitoring, protamine with its hazards, then HIT."},
{f:"coag",t:"Warfarin, DOACs and perioperative bridging",b:`<ul class="clean"><li><b>Warfarin</b>: racemic coumarin; inhibits vitamin K epoxide reductase (VKORC1), preventing γ-carboxylation of II, VII, IX, X and proteins C and S. 99% albumin-bound; CYP2C9 (S-warfarin). Onset 48–72 h (factor t½: VII 6 h, IX 24 h, X 40 h, II 60 h); early hypercoagulability from protein C depletion (skin necrosis), hence heparin overlap. Teratogenic (nasal hypoplasia, stippled epiphyses in weeks 6–12; CNS abnormalities; fetal bleeding).</li>
<li><b>Interactions</b>: potentiated by enzyme inhibitors (amiodarone, metronidazole, macrolides, fluconazole, acute alcohol), antibiotics (gut flora), hyperthyroidism, liver disease; antagonised by enzyme inducers (rifampicin, carbamazepine, St John's wort, chronic alcohol), vitamin K-rich food, hypothyroidism.</li>
<li><b>Reversal</b>: major bleeding: stop warfarin, vitamin K 5–10 mg IV (onset 6–12 h) + 4-factor PCC 25–50 IU/kg (by INR). FFP 15 mL/kg only if PCC is unavailable (large volume, slow, incomplete). Elective surgery: stop 5 days before, operate when INR &lt; 1.5 (≤ 1.4 for neuraxial); bridge with LMWH only if thrombotic risk is high (mechanical mitral valve, VTE in last 3 months, recent stroke). BRIDGE trial: bridging in AF caused more bleeding without fewer strokes.</li>
<li><b>DOACs</b>: direct Xa inhibitors (apixaban, rivaroxaban, edoxaban) and direct thrombin inhibitor (dabigatran: 80% renal, prodrug). Fixed doses, rapid onset (2–4 h), t½ 8–15 h (dabigatran longer in renal impairment), fewer interactions (P-gp and CYP3A4). Not for mechanical valves or triple-positive antiphospholipid syndrome.</li>
<li><b>Monitoring</b>: drug-specific anti-Xa levels (calibrated) for Xa inhibitors; dilute thrombin time or ecarin time for dabigatran. A normal TT excludes significant dabigatran; PT/APTT are insensitive.</li>
<li><b>Reversal</b>: dabigatran: <b>idarucizumab</b> 5 g IV (humanised antibody fragment), haemodialysis. Apixaban and rivaroxaban: <b>andexanet alfa</b> (decoy Xa) where available, or PCC 50 IU/kg. Charcoal if ingested within 2–6 h. TXA as an adjunct.</li>
<li><b>Perioperative DOAC interruption</b> (PAUSE, no bridging): apixaban/rivaroxaban/edoxaban: omit 1 day before low-bleed-risk and 2 days before high-bleed-risk surgery; dabigatran: 1–2 days if CrCl ≥ 50, 2–4 days if CrCl 30–50. Neuraxial: ≥ 72 h for Xa inhibitors (ASRA/ESRA), 72–120 h for dabigatran by CrCl. Restart 24 h (low risk) to 48–72 h (high risk) after surgery; ≥ 6 h after epidural catheter removal.</li></ul>`,
p:"Typical exam questions: 'Direct-acting oral anticoagulants, how to monitor their effect and implications in anaesthesia'. Use the stop/restart timeline diagram.",
v:"Warfarin mechanism, monitoring, interactions, reversal, bridging; DOAC classes, PK, monitoring, reversal, timing around surgery and neuraxial blocks."},
{f:"coag",t:"Antifibrinolytics, haemostatic drugs and thrombolytics",b:`<ul class="clean"><li><b>Tranexamic acid</b>: lysine analogue that blocks lysine-binding sites on plasminogen, preventing binding to fibrin (antifibrinolytic; at high doses directly inhibits plasmin). 1 g IV (15 mg/kg) at induction for surgery with expected blood loss &gt; 500 mL (NICE). Trauma: 1 g within 3 h then 1 g over 8 h (CRASH-2; harmful after 3 h). TBI: CRASH-3 (benefit in mild–moderate). PPH: WOMAN (1 g within 3 h). Non-cardiac surgery: POISE-3 (less bleeding, non-inferior for CV events). Renal excretion (reduce in CKD); seizures at high doses (cardiac surgery); intrathecal injection by error causes seizures and death. GI bleeding: HALT-IT (no benefit, more VTE).</li>
<li><b>Desmopressin (DDAVP)</b>: V2 agonist that releases vWF and factor VIII from endothelium; 0.3 µg/kg IV over 30 min. Uses: type 1 von Willebrand disease, mild haemophilia A, uraemic and aspirin-related platelet dysfunction, diabetes insipidus. Hyponatraemia, tachyphylaxis.</li>
<li><b>Aprotinin</b>: serine protease inhibitor (bovine); withdrawn after BART (2008), now licensed again in Europe for isolated CABG.</li>
<li><b>Concentrates</b>: fibrinogen concentrate, 4-factor PCC, recombinant VIIa (off-label rescue; thrombosis risk).</li>
<li><b>Thrombolytics</b> (plasminogen activators): alteplase (rt-PA, fibrin-specific), tenecteplase, streptokinase (antigenic). Uses: stroke (within 4.5 h), massive PE with shock, STEMI without PCI access. Contraindicated after recent surgery, trauma or bleeding. Reverse with TXA, cryoprecipitate/fibrinogen.</li>
<li><b>Vitamin K</b>: phytomenadione IV (anaphylactoid reactions rare) or oral; neonatal prophylaxis.</li></ul>`,
p:"TXA timing is time-critical in trauma (CRASH-2) and PPH (WOMAN): each 15-minute delay reduces benefit by ~10%.",
v:"TXA mechanism, dose, evidence by setting, side effects; desmopressin; thrombolytics and their reversal."},
{f:"gi",t:"Antiemetics and PONV",b:`<ul class="clean"><li><b>Vomiting pathways</b>: CTZ in the area postrema (outside the BBB: D2, 5-HT3, NK1, opioid), vestibular system (H1, M1), GI vagal afferents (5-HT3 from enterochromaffin cells), higher centres; all converge on the vomiting centre (nucleus tractus solitarius, NK1).</li>
<li><b>Risk</b>: Apfel adult score (female, non-smoker, history of PONV or motion sickness, postoperative opioids: 10, 21, 39, 61, 79% for 0–4 factors). Also surgery type (laparoscopic, gynaecological, strabismus), volatiles and N2O, duration. Children: POVOC score.</li>
<li><b>Drugs</b>:
<ul class="clean"><li>5-HT3 antagonists: ondansetron 4 mg at the end of surgery (QT), granisetron, palonosetron (long t½, single dose).</li>
<li>Corticosteroid: dexamethasone 4–8 mg at induction (PADDI: 8 mg safe for surgical site infection; transient hyperglycaemia; perineal burning if given awake).</li>
<li>D2 antagonists: droperidol 0.625–1.25 mg (QT), haloperidol 1 mg, amisulpride 5 mg (rescue too), metoclopramide (10 mg is weak; 25–50 mg more effective; EPS; max 5 days MHRA), prochlorperazine 12.5 mg IM.</li>
<li>NK1 antagonists: aprepitant (oral 40–80 mg; IV emulsion), fosaprepitant: best for reducing vomiting; interacts with the oral contraceptive pill.</li>
<li>Antihistamines: cyclizine 50 mg (H1, antimuscarinic: tachycardia, pain on injection, abuse), promethazine.</li>
<li>Anticholinergic: transdermal hyoscine (motion sickness; confusion in the elderly, dry mouth, blurred vision).</li></ul></li>
<li><b>Risk reduction</b>: regional anaesthesia, propofol TIVA, avoid N2O and volatiles, opioid-sparing multimodal analgesia, sugammadex rather than neostigmine (modest), hydration, short fasting.</li>
<li><b>Guidelines</b>: the 5th consensus guidelines (Gan et al., Anesth Analg 2025) keep the algorithm: assess risk, then give prophylaxis with up to 4 agents according to risk (multimodal, from different classes), reduce baseline risk, plan rescue with a drug from a <b>different class</b> from prophylaxis, and address post-discharge nausea and vomiting.</li></ul>`,
p:"Typical exam questions: 'PONV', 'PONV management, adverse drug reactions'. Use the Apfel diagram to show risk and number of agents.",
v:"Physiology of vomiting, risk factors and scores, drugs by receptor with dose and side effects, guideline algorithm, rescue."},
{f:"gi",t:"Gastric drugs and aspiration prophylaxis",b:`<ul class="clean"><li><b>Gastric acid secretion</b>: parietal cell H⁺/K⁺-ATPase stimulated by ACh (M3), gastrin (CCK2) and histamine (H2, cAMP).</li>
<li><b>Proton pump inhibitors</b> (omeprazole, pantoprazole, lansoprazole): prodrugs activated in acid, irreversibly inhibit H⁺/K⁺-ATPase; need 2 doses for full effect (evening before and morning). Risks: C. difficile, pneumonia, hypomagnesaemia, osteoporosis, interaction with clopidogrel (omeprazole via CYP2C19).</li>
<li><b>H2 antagonists</b> (famotidine; ranitidine withdrawn 2020 for NDMA contamination; cimetidine inhibits CYP450): faster onset than PPIs (useful for emergency caesarean: 50 mg IV ranitidine historically; famotidine 20 mg).</li>
<li><b>Antacids</b>: sodium citrate 0.3 M 30 mL immediately before caesarean section under GA (non-particulate; raises pH, but increases volume). Particulate antacids cause pneumonitis if aspirated.</li>
<li><b>Prokinetics</b>: metoclopramide (D2 antagonist + 5-HT4 agonist; enhances gastric emptying and LOS tone), domperidone (peripheral D2; QT), erythromycin (motilin agonist; 250 mg IV before emergency endoscopy for upper GI bleed).</li>
<li><b>GLP-1 receptor agonists</b> (semaglutide, tirzepatide, liraglutide) delay gastric emptying, and there are reports of aspiration despite fasting. 2024 multi-society guidance: most patients continue; assess GI symptoms on the day; consider a 24-h clear-liquid diet beforehand in high-risk patients; treat as a full stomach if symptomatic (RSI, consider gastric ultrasound).</li>
<li><b>Other GI drugs</b>: octreotide (variceal bleed, carcinoid crisis), terlipressin (varices, hepatorenal syndrome), laxatives, loperamide (μ agonist), ondansetron constipation.</li></ul>`,
p:"Remember the stomach pH < 2.5 and volume > 25 mL (0.4 mL/kg) thresholds for aspiration pneumonitis risk (Mendelson; animal data).",
v:"Acid secretion physiology, PPIs vs H2 antagonists vs antacids, prokinetics, and the GLP-1 agonist question."},
{f:"gi",t:"Diabetes drugs and the perioperative plan",b:`<ul class="clean"><li><b>Insulin</b>: rapid-acting analogues (lispro, aspart, glulisine), short-acting soluble (Actrapid: the IV insulin), intermediate (isophane/NPH, contains protamine), long-acting analogues (glargine, detemir, degludec), biphasic mixes. Continue basal insulin at ~80% of the usual dose the evening before and morning of surgery (CPOC 2023).</li>
<li><b>VRIII</b> (variable-rate IV insulin infusion) if more than one missed meal, poorly controlled (HbA1c &gt; 69 mmol/mol), or emergencies; continue long-acting basal insulin alongside; glucose target 6–12 mmol/L (accept up to 10); 0.45% saline + 5% glucose + KCl as substrate fluid.</li>
<li><b>Metformin</b> (biguanide: ↓ hepatic gluconeogenesis via AMPK, ↑ insulin sensitivity): no hypoglycaemia; continue unless AKI risk, contrast or more than one missed meal (omit the lunchtime dose if TDS). Lactic acidosis in renal failure or hypoperfusion.</li>
<li><b>Sulphonylureas</b> (gliclazide, glibenclamide: close β-cell K<sub>ATP</sub> channels): hypoglycaemia; omit on the day of surgery.</li>
<li><b>SGLT2 inhibitors</b> (dapagliflozin, empagliflozin): omit the day before and day of surgery (FDA: 3–4 days); euglycaemic DKA (check ketones, even with normal glucose). Restart when eating and drinking.</li>
<li><b>DPP-4 inhibitors</b> (sitagliptin; "gliptins": prolong endogenous incretins): continue. <b>GLP-1 agonists</b>: see the previous slide (aspiration risk). <b>Pioglitazone</b> (PPAR-γ agonist: fluid retention, heart failure): continue.</li>
<li><b>Perioperative risks of diabetes</b>: hypoglycaemia (masked by anaesthesia and β-blockers), hyperglycaemia (infection, poor healing), DKA/HHS, autonomic neuropathy (gastroparesis, unstable BP, silent ischaemia), stiff joint syndrome (difficult airway), renal disease. Put the patient first on the list.</li></ul>`,
p:"Typical exam questions: 'A diabetic on insulin three times daily scheduled for femoropopliteal bypass is postponed for 3 days: perioperative management'. That means an insulin plan, VRIII, glucose targets and the complications of diabetes.",
v:"Classify drugs by mechanism, then a day-by-day perioperative plan per drug (CPOC 2023), VRIII rules, and complications."},
{f:"gi",t:"Corticosteroids",b:`<ul class="clean"><li><b>Mechanism</b>: intracellular glucocorticoid receptor → nucleus → transactivation (anti-inflammatory proteins: lipocortin/annexin-1 inhibits phospholipase A2) and transrepression (NF-κB, AP-1: ↓ cytokines, COX-2, iNOS). Non-genomic membrane effects at high doses.</li>
<li><b>Relative potency</b> (equivalent dose): hydrocortisone 20 mg (glucocorticoid 1, mineralocorticoid 1), prednisolone 5 mg (4 : 0.8), methylprednisolone 4 mg (5 : 0.5), dexamethasone 0.75 mg (25–30 : negligible), fludrocortisone (10 : 125–400).</li>
<li><b>Side effects</b>: adrenal suppression (HPA axis), Cushingoid habitus, hyperglycaemia, hypertension, fluid retention, hypokalaemia, osteoporosis and avascular necrosis, myopathy (proximal; ICU-acquired weakness with NMBs), poor wound healing, infection, peptic ulcer (with NSAIDs), cataract, glaucoma, mood disturbance and psychosis, growth suppression in children, thin skin.</li>
<li><b>Perioperative cover</b> (AAGBI/RCP/SfE 2020): at risk if taking ≥ 5 mg prednisolone (or equivalent, including inhaled, topical, intra-articular) for ≥ 4 weeks in the past 3 months. Continue the usual dose. Major surgery: hydrocortisone 100 mg IV at induction, then 200 mg/24 h by infusion (or 50 mg IV/IM 6-hourly) until eating, then double the oral dose for 48 h (up to a week for major surgery). Minor surgery under LA: usual dose only (consider 100 mg if long). Adrenal crisis: hydrocortisone 100 mg IV then 200 mg/24 h, fluids, glucose.</li>
<li><b>ICU uses</b>: septic shock (hydrocortisone 200 mg/day when vasopressor needs persist: ADRENAL, APROCCHSS: faster shock reversal), severe community-acquired pneumonia (CAPE COD 2023: hydrocortisone reduced mortality), COVID-19 needing O2 (dexamethasone 6 mg, RECOVERY), bacterial meningitis (dexamethasone 10 mg 6-hourly for 4 days, before or with antibiotics), early moderate–severe ARDS (debated), airway oedema before extubation, Pneumocystis, myasthenic crisis, brainstem-dead organ donors (methylprednisolone 15 mg/kg for lung donor optimisation; UK practice varies).</li>
<li><b>Not indicated</b>: head injury (CRASH: increased mortality), acute spinal cord injury (NASCIS evidence weak; not recommended).</li></ul>`,
p:"Typical exam questions: 'Patient on oral steroids for 2 months: concerns (adverse effects and steroid cover by operation)', 'Role of steroids in critical care', 'Objectives for organ donation and role of steroids'.",
v:"Mechanism, potency table, side effects, perioperative cover by risk and surgery size, then ICU indications with trials."},
{f:"misc",t:"Antibiotics: mechanisms and pharmacodynamics",b:`<ul class="clean"><li><b>Mechanisms</b>:
<ul class="clean"><li>Cell wall: β-lactams (penicillins, cephalosporins, carbapenems, monobactams: bind penicillin-binding proteins and block peptidoglycan cross-linking; bactericidal), glycopeptides (vancomycin, teicoplanin: bind D-Ala-D-Ala).</li>
<li>Protein synthesis: 30S (aminoglycosides: bactericidal; tetracyclines), 50S (macrolides, clindamycin, linezolid, chloramphenicol).</li>
<li>Nucleic acids: fluoroquinolones (DNA gyrase/topoisomerase IV), rifampicin (RNA polymerase), metronidazole (DNA damage in anaerobes).</li>
<li>Folate synthesis: trimethoprim, sulphonamides. Cell membrane: colistin (polymyxin), daptomycin.</li></ul></li>
<li><b>PK/PD targets</b>:
<ul class="clean"><li><b>Time-dependent</b> (β-lactams): free drug concentration above MIC for a fraction of the dosing interval (fT &gt; MIC 40–70%; 100% in critical illness). Extended or continuous infusions help (BLING III: lower mortality signal in meta-analysis).</li>
<li><b>Concentration-dependent</b> (aminoglycosides, quinolones, daptomycin): Cmax/MIC ≥ 8–10, with a long post-antibiotic effect. Once-daily dosing (gentamicin 5–7 mg/kg) allows trough &lt; 1 mg/L, reducing toxicity.</li>
<li><b>AUC/MIC</b> (vancomycin AUC24 400–600 mg·h/L, quinolones, linezolid).</li></ul></li>
<li><b>Critical illness changes</b>: ↑ Vd (capillary leak, fluids, ECMO), augmented renal clearance (young trauma, sepsis, TBI) or AKI/RRT, hypoalbuminaemia (↑ free fraction and clearance of highly bound drugs), so use loading doses and therapeutic drug monitoring.</li>
<li><b>Anaesthetic interactions</b>: aminoglycosides, clindamycin, polymyxins potentiate NMB; macrolides and quinolones prolong QT; erythromycin and clarithromycin inhibit CYP3A4 (midazolam, alfentanil); rifampicin induces; linezolid is a MAOI (serotonin syndrome); metronidazole: disulfiram reaction, warfarin; <b>carbapenems lower valproate levels by 60–90%</b> (seizures); vancomycin flushing reaction (histamine with fast infusion: ≤ 10 mg/min) is not allergy; ototoxicity (aminoglycosides, vancomycin, loop diuretics).</li></ul>`,
p:"Typical exam questions: 'Pharmacokinetics and dynamics of antibiotics', 'Antibiotics: carbapenem', 'Antibiotics: common groups, indications, side effects, contraindications and doses'. Use the PK/PD simulator in Diagrams.",
v:"Classify by mechanism, then bactericidal vs static, time- vs concentration-dependent, critical illness PK, then anaesthetic interactions."},
{f:"misc",t:"Antibiotic prophylaxis, allergy and stewardship",b:`<ul class="clean"><li><b>Surgical prophylaxis</b> (NICE NG125): for clean surgery with implants, clean-contaminated and contaminated surgery; give IV within 60 min before incision (before tourniquet inflation); cefazolin 2 g (3 g if ≥ 120 kg). Redose if the operation exceeds 2 half-lives (cefazolin 4 h) or blood loss &gt; 1500 mL. Single dose is usually enough; do not continue beyond 24 h.</li>
<li><b>Penicillin allergy</b>: ~10% of patients are labelled, but &lt; 5–10% of those are truly allergic. Take a detailed history (rash type, timing, anaphylaxis, severe cutaneous reactions). Cross-reactivity with cephalosporins depends on side chains: cefazolin has a unique R1 side chain, so cross-reactivity is negligible and it can usually be given unless there was a severe delayed reaction. De-labelling and testing pathways improve outcomes.</li>
<li><b>NAP6</b> (2018): antibiotics were the leading cause of perioperative anaphylaxis (47%), with teicoplanin having the highest rate per exposure (~16 per 100 000) and co-amoxiclav most frequent overall. Give antibiotics before induction while awake when practical, so reactions are recognised.</li>
<li><b>Stewardship</b> ("Start Smart then Focus", UK Health Security Agency): take cultures first; start appropriate empirical therapy promptly (within 1 h in septic shock: SSC 2021); document indication, review date and duration; review at 48–72 h: stop, switch IV to oral, change, continue, or outpatient therapy; de-escalate using microbiology; shortest effective duration; monitor levels; use procalcitonin to guide stopping in some settings.</li>
<li><b>Resistant organisms</b>: MRSA (vancomycin, teicoplanin, linezolid, daptomycin), ESBL Enterobacterales (carbapenems), carbapenemase producers (ceftazidime–avibactam, colistin), VRE (linezolid, daptomycin), C. difficile after broad-spectrum use (oral vancomycin or fidaxomicin).</li>
<li><b>Fluoroquinolone safety</b> (MHRA 2019/2024): tendon rupture, aortic aneurysm, neuropathy, psychiatric effects: use only when other antibiotics are inappropriate.</li></ul>`,
p:"Typical exam questions: 'Antibiotic stewardship', 'How to choose initially and best practice for antibiotic prescription', 'Peripheral cannula infection: organisms and antibiotics' (S. aureus: flucloxacillin, or vancomycin if MRSA).",
v:"Prophylaxis rules, allergy assessment and cross-reactivity, NAP6 lessons, stewardship principles, resistant organisms."},
{f:"misc",t:"Anticonvulsants",b:`<ul class="clean"><li><b>Mechanisms</b>: Na⁺ channel block (phenytoin, carbamazepine, lamotrigine, lacosamide), GABA enhancement (benzodiazepines, barbiturates, vigabatrin (GABA-transaminase inhibitor), tiagabine (reuptake)), SV2A modulation (levetiracetam, brivaracetam), α2δ Ca²⁺ subunit (gabapentin, pregabalin), T-type Ca²⁺ (ethosuximide: absence seizures), mixed (valproate, topiramate).</li>
<li><b>Phenytoin</b>: zero-order kinetics in the therapeutic range (10–20 mg/L total; adjust for low albumin), 90% protein bound, enzyme inducer. IV loading 20 mg/kg at ≤ 50 mg/min with ECG and BP monitoring (arrhythmias, hypotension: propylene glycol vehicle); purple glove syndrome. Chronic: gingival hyperplasia, hirsutism, ataxia, nystagmus, osteomalacia, fetal hydantoin syndrome. Fosphenytoin: prodrug, faster infusion.</li>
<li><b>Valproate</b>: enzyme inhibitor (↑ lamotrigine, phenobarbital), platelet dysfunction and thrombocytopenia, hepatotoxicity, pancreatitis, hyperammonaemia, highly teratogenic (MHRA restrictions 2024 for men and women under 55). Levels collapse with carbapenems.</li>
<li><b>Carbamazepine</b>: enzyme inducer (autoinduction), SIADH, agranulocytosis, HLA-B*1502 SJS risk. <b>Levetiracetam</b>: renal excretion, few interactions, behavioural effects; IV and oral equivalent. <b>Lamotrigine</b>: rash (SJS).</li>
<li><b>Anaesthetic implications</b>: continue on the day of surgery (missing doses provokes seizures; use IV levetiracetam, valproate, phenytoin or lacosamide if nil by mouth); enzyme inducers cause resistance to aminosteroid NMBs and increase opioid requirements; avoid seizure-threshold-lowering drugs (high-dose sevoflurane, pethidine, tramadol, methohexital, enflurane, ketamine in some patients); valproate and bleeding.</li>
<li><b>Convulsive status epilepticus</b> (UK/ESETT): 0–5 min: ABC, O2, glucose; 5 min: benzodiazepine (lorazepam 0.1 mg/kg IV max 4 mg, or buccal midazolam 10 mg), repeat once at 10 min; 20 min: second line (levetiracetam 60 mg/kg max 4.5 g, or valproate 40 mg/kg max 3 g, or (fos)phenytoin 20 mg/kg PE); ESETT showed equal efficacy (~47%); 40 min: refractory: RSI with propofol, midazolam or thiopental, EEG to burst suppression, ICU.</li></ul>`,
p:"Typical exam questions: 'Anticonvulsants, phenytoin', 'Antidepressants, antipsychotics and antiepileptics: types and concerns in anaesthesia'.",
v:"Classify by mechanism, then phenytoin and valproate in depth, then perioperative implications and the status epilepticus algorithm."},
{f:"misc",t:"Psychiatric drugs",b:`<ul class="clean"><li><b>SSRIs</b> (fluoxetine, sertraline, citalopram): continue (discontinuation syndrome). Platelet serotonin depletion (bleeding, especially with NSAIDs), hyponatraemia (SIADH, elderly), QT (citalopram), CYP2D6 inhibition (fluoxetine, paroxetine: less codeine/tramadol activation). Serotonin syndrome with tramadol, pethidine, fentanyl, methylene blue, ondansetron (rare), linezolid.</li>
<li><b>TCAs</b> (amitriptyline, nortriptyline): block noradrenaline and serotonin reuptake, plus muscarinic, H1, α1 and Na⁺ channel antagonism. Continue; anticholinergic effects, postural hypotension, QT and QRS prolongation, exaggerated response to indirect sympathomimetics and adrenaline (avoid large doses of adrenaline in LA). <b>TCA overdose</b>: anticholinergic toxidrome, seizures, broad QRS (&gt; 100 ms) and arrhythmias: sodium bicarbonate (pH 7.45–7.55, Na⁺ load), avoid class Ia/Ic, consider lipid.</li>
<li><b>MAOIs</b>: irreversible non-selective (phenelzine, tranylcypromine) or reversible selective MAO-A (moclobemide: omit 24 h before). Current practice: usually continue irreversible MAOIs (stopping requires 2–3 weeks and risks relapse) and plan a "MAOI-safe" anaesthetic: avoid indirect sympathomimetics (ephedrine, metaraminol: hypertensive crisis; use small doses of direct agents: phenylephrine, noradrenaline), avoid pethidine, tramadol, dextromethorphan, methylene blue. Tyramine reaction ("cheese reaction").</li>
<li><b>Lithium</b>: narrow therapeutic range 0.4–1.0 mmol/L; toxicity (&gt; 1.5): tremor, ataxia, confusion, seizures, arrhythmias, nephrogenic DI. Levels rise with NSAIDs, ACEi, thiazides, dehydration. Prolongs NMB and reduces anaesthetic requirement. Perioperative: continue for minor surgery; for major surgery omit 24 h before (books say up to 72 h), check level and U&E, restart when eating, drinking and renal function is stable.</li>
<li><b>Antipsychotics</b> (haloperidol, olanzapine, quetiapine, clozapine): continue; QT prolongation, postural hypotension, EPS, lower seizure threshold, metabolic syndrome. Clozapine: agranulocytosis, myocarditis, ileus, hypersalivation; levels rise when smoking stops (CYP1A2). <b>Neuroleptic malignant syndrome</b>: rigidity, hyperthermia, autonomic instability, ↑ CK, over days: stop the drug, cooling, dantrolene or bromocriptine, benzodiazepines.</li></ul>`,
p:"Serotonin syndrome (rapid onset, clonus and hyperreflexia) vs NMS (days, lead-pipe rigidity, bradyreflexia) vs MH (anaesthetic trigger, ↑ EtCO2) vs anticholinergic syndrome (dry, no clonus).",
v:"For each class: mechanism, side effects, interactions with anaesthesia, continue or stop, and the toxidrome it can cause."},
{f:"misc",t:"Respiratory drugs and acute severe asthma",b:`<ul class="clean"><li><b>β2 agonists</b>: short-acting (salbutamol, terbutaline) and long-acting (salmeterol, formoterol). Gs → cAMP → PKA → ↓ Ca²⁺ and myosin light chain kinase. Side effects: tachycardia, tremor, hypokalaemia, lactic acidosis (IV), hyperglycaemia.</li>
<li><b>Antimuscarinics</b>: ipratropium (SAMA), tiotropium (LAMA). <b>Inhaled corticosteroids</b> (beclometasone, budesonide, fluticasone; may need steroid cover at high doses). <b>Leukotriene receptor antagonists</b> (montelukast). <b>Methylxanthines</b>: theophylline/aminophylline (PDE inhibition, adenosine antagonism; range 10–20 mg/L; toxicity: arrhythmias, seizures, vomiting; levels ↑ with erythromycin, ciprofloxacin, cimetidine, heart failure; ↓ with smoking, enzyme inducers). <b>Biologics</b>: omalizumab (anti-IgE), mepolizumab and benralizumab (IL-5), dupilumab (IL-4Rα), tezepelumab (TSLP).</li>
<li><b>Acute severe asthma</b> (BTS/SIGN): O2 to SpO2 93–95%; nebulised salbutamol 5 mg (back-to-back or continuous) + ipratropium 500 µg; prednisolone 40–50 mg or hydrocortisone 100 mg IV; magnesium sulphate 2 g IV over 20 min; IV salbutamol (250 µg then 5–20 µg/min) or aminophylline (5 mg/kg over 20 min if not on theophylline, then <b>0.5 mg/kg/h</b>) on senior advice; adrenaline, ketamine, volatile anaesthetic (ICU), heliox; ECMO for refractory cases.</li>
<li><b>Ventilating the asthmatic</b>: ketamine or propofol induction, large ETT, low RR (8–10), small VT (6–8 mL/kg), long expiratory time (I:E 1:3–1:5), low or zero PEEP initially, permissive hypercapnia (pH &gt; 7.2), watch plateau pressure (&lt; 30) and intrinsic PEEP; disconnect and decompress the chest if hypotension from gas trapping; exclude pneumothorax.</li>
<li><b>Elective surgery</b>: optimise (no recent exacerbation, PEFR &gt; 80% of best), continue inhalers, salbutamol before induction, steroid cover if on long courses, consider regional or SGA, avoid histamine-releasing drugs and β-blockers, deep extubation or lidocaine to blunt airway reflexes.</li></ul>`,
p:"Typical exam questions: 'Status asthmaticus', 'Asthmatic on three unknown medications for emergency spinal decompression', 'Obese asthmatic for laparoscopic surgery'.",
v:"Drug classes with mechanism and side effects; acute severe asthma in steps with doses; ventilator strategy; elective optimisation."},
{f:"cv",t:"Statins and other cardiovascular drugs",b:`<ul class="clean"><li><b>Statins</b>: HMG-CoA reductase inhibitors. Lower LDL and have pleiotropic effects (endothelial function, anti-inflammatory, plaque stabilisation). Continue perioperatively; acute withdrawal increases cardiac events. Observational data link statins to less perioperative MI, AF and AKI (trial evidence in cardiac surgery is mixed). Side effects: myalgia, myopathy and rhabdomyolysis (↑ with macrolides, fibrates, amiodarone via CYP3A4 for simvastatin and atorvastatin), hepatotoxicity.</li>
<li><b>Ivabradine</b>: I<sub>f</sub> (HCN) blocker; slows SA node without negative inotropy (heart failure, rate control for CT coronary angiography). <b>Ranolazine</b>: late Na⁺ current blocker (angina).</li>
<li><b>Sacubitril/valsartan</b> (ARNI: neprilysin inhibitor + ARB): heart failure; hypotension, angioedema; omit on day of surgery like ARBs.</li>
<li><b>Nicorandil</b>: K<sub>ATP</sub> opener + nitrate; GI ulceration; continue.</li>
<li><b>Anticoagulant and antiplatelet decisions</b> are covered in the coagulation slides; SGLT2 inhibitors in diabetes drugs.</li></ul>`,
p:"Typical exam questions: 'Statins'. Answer: mechanism, benefits, side effects, interactions, perioperative continuation, and statins as a cause of rhabdomyolysis (with propofol and electrolytes) in the 'what drugs cause it' question.",
v:"Mechanism, pleiotropy, perioperative evidence, side effects and interactions."},
];

/* ---------- data for diagrams ---------- */
const VASO={adr:["Adrenaline",[0.01,0.5],(d)=>[d<0.05?1:d<0.2?2.5:3.5,d<0.05?1.5:3,d<0.05?2:2,0,0,0]],
 nor:["Noradrenaline",[0.01,1],(d)=>[d<0.1?2.5:4,1.5,0.3,0,0,0]],
 dop:["Dopamine",[2,20],(d)=>[d<5?0.2:d<10?1:3,d<5?0.5:2.5,0.5,d<5?2:1.5,0,0]],
 dob:["Dobutamine",[2.5,20],(d)=>[0.5,d<10?2.5:3.5,1.5,0,0,0]],
 phe:["Phenylephrine",[0.1,2],(d)=>[d<0.5?2:3.5,0,0,0,0,0]],
 vas:["Vasopressin (U/min)",[0.01,0.04],(d)=>[0,0,0,0,d<0.03?2.5:3.5,0]],
 mil:["Milrinone",[0.375,0.75],(d)=>[0,0,0,0,0,d<0.5?2.5:3.5]],
 iso:["Isoprenaline (µg/min)",[1,10],(d)=>[0,d<4?2.5:3.5,d<4?2.5:3.5,0,0,0]]};
const RECS=["α1","β1","β2","D1","V1","PDE3"];
function haemo(r){const [a1,b1,b2,d1,v1,p3]=r;return {HR:b1*0.9+b2*0.4+p3*0.3-a1*0.35-v1*0.3,CO:b1*0.9+p3*0.9+b2*0.3-a1*0.25-v1*0.25+d1*0.2,SVR:a1*1-b2*0.6+v1*1-p3*0.7-d1*0.4,MAP:0}}

const NEPH={pct:[[60,80],[100,80],[110,60],[140,70],[150,95],[130,110]],dl:[[130,110],[160,110],[170,250]],tal:[[200,250],[210,110]],dct:[[210,110],[240,95],[260,70],[290,80]],cd:[[290,80],[330,85],[340,270]]};
const DIUR={ca:["Carbonic anhydrase inhibitor","pct","Acetazolamide: blocks HCO₃⁻ reabsorption in the PCT (CA in brush border and cell). Mild diuresis (alkaline urine); hyperchloraemic metabolic acidosis; ↓ K⁺. Uses: glaucoma, altitude, ICU metabolic alkalosis."],
 osm:["Osmotic (mannitol)","pct,dl","Mannitol: filtered, not reabsorbed; retains water in the PCT and descending limb, washes out the medullary gradient. Expands plasma volume first. ↑ Na⁺ and water excretion, risk of hypernatraemia."],
 sglt:["SGLT2 inhibitor","pct","Gliflozins: block SGLT2 (~90% of filtered glucose) in the early PCT. Glycosuria, osmotic natriuresis, tubuloglomerular feedback restores afferent tone (renoprotection). Euglycaemic DKA."],
 loop:["Loop","tal","Furosemide: blocks NKCC2 in the thick ascending limb (~25% of filtered Na⁺). Abolishes the medullary gradient. ↓ K⁺, ↓ Mg²⁺, ↓ Ca²⁺ (calciuria), hypochloraemic metabolic alkalosis, ototoxicity."],
 thz:["Thiazide","dct","Bendroflumethiazide/indapamide: block NCC in the DCT (~5–7%). ↑ Ca²⁺ reabsorption (hypercalcaemia), ↓ Na⁺ (hyponatraemia), ↓ K⁺, ↑ urate, ↑ glucose and lipids. Weak at GFR < 30."],
 ksp:["Potassium-sparing","cd","Spironolactone/eplerenone (aldosterone antagonists) and amiloride (ENaC blocker) in the collecting duct (~2–3%). Hyperkalaemia and metabolic acidosis; synergy with loop/thiazide; mortality benefit in heart failure."],
 adh:["V2 antagonist (vaptan)","cd","Tolvaptan: blocks V2 receptors on principal cells, preventing aquaporin-2 insertion: aquaresis (free water loss). SIADH, ADPKD. Overly rapid Na⁺ correction risks osmotic demyelination."]};

const AC={apx:["Apixaban / rivaroxaban / edoxaban","xa"],dab:["Dabigatran","dab"],war:["Warfarin","war"],lmp:["Enoxaparin (prophylactic)","lmp"],lmt:["Enoxaparin (treatment)","lmt"],ufh:["UFH infusion","ufh"],clo:["Clopidogrel / ticagrelor","p2y"],pra:["Prasugrel","pra"],asp:["Aspirin","asp"]};
function acPlan(k,risk,crcl){/* returns {stop: hours before surgery last dose, neur: hours before neuraxial, restart: hours after surgery, note} */
 const hi=risk==="high";
 if(k==="apx"){const stop=hi?72:48;return {stop,neur:72,restart:hi?60:24,note:"PAUSE: no bridging. Last dose day −"+(stop/24)+" ("+(hi?"2 days omitted":"1 day omitted")+"). Neuraxial: ≥ 72 h (ESRA/ASRA). Catheter removal ≥ 6 h before the next dose. Reversal: andexanet alfa or PCC 50 IU/kg."}}
 if(k==="dab"){let stop;if(crcl>=50)stop=hi?72:48;else stop=hi?120:72;const neur=crcl>=80?72:crcl>=50?96:120;return {stop,neur,restart:hi?60:24,note:"Renally cleared: timings lengthen as CrCl falls (CrCl "+crcl+" mL/min). Neuraxial ≥ "+neur+" h. Avoid if CrCl < 30. Reversal: idarucizumab 5 g IV; dialysable."}}
 if(k==="war")return {stop:120,neur:120,restart:12,note:"Stop 5 days before; check INR the day before (< 1.5 for surgery, ≤ 1.4 for neuraxial; vitamin K 1–2 mg orally if still high). Bridge with LMWH only if high thrombotic risk (mechanical mitral valve, VTE < 3 months). Restart the evening of surgery if haemostasis secure."};
 if(k==="lmp")return {stop:12,neur:12,restart:hi?24:6,note:"Prophylactic LMWH: ≥ 12 h before neuraxial puncture or catheter removal; next dose ≥ 4 h after catheter removal. Renal impairment (CrCl < 30): extend."};
 if(k==="lmt")return {stop:24,neur:24,restart:hi?48:24,note:"Treatment-dose LMWH: last dose ≥ 24 h before surgery or neuraxial; restart treatment dose 24–72 h after, depending on bleeding risk (prophylactic dose earlier)."};
 if(k==="ufh")return {stop:4,neur:4,restart:hi?24:6,note:"IV UFH: stop 4–6 h before; check APTT normal. SC prophylactic UFH: ≥ 4 h. Restart ≥ 1 h after catheter removal. Check platelets if > 4 days (HIT)."};
 if(k==="clo")return {stop:120,neur:120,restart:24,note:"Clopidogrel 5–7 days (ESRA 5), ticagrelor 5 days. Never stop in the first 6–12 months after a coronary stent without cardiology advice; continue aspirin. Restart within 24 h (loading dose may be needed)."};
 if(k==="pra")return {stop:168,neur:168,restart:24,note:"Prasugrel: 7 days. Same stent rules as clopidogrel."};
 return {stop:0,neur:0,restart:0,note:"Aspirin: continue for most surgery and neuraxial blocks (alone it is not a contraindication). Consider stopping 5–7 days only for intracranial, spinal canal, posterior chamber eye or TURP surgery when it is primary prevention."};}

const ABX={bl:["Piperacillin (β-lactam)",0.3,1,4000,8,"time"],gen:["Gentamicin",0.25,2.5,350,24,"conc"],van:["Vancomycin",0.7,6,1000,12,"auc"]};

const CALCS=[
 {t:"Infusion rate from µg/kg/min",c:"spo2",in:[["Drug in syringe (mg)","mg",4],["Syringe volume (mL)","ml",50],["Weight (kg)","w",70],["Dose (µg/kg/min)","d",0.1]],
  f:(v,fmt)=>{const conc=v.mg*1000/v.ml,rate=v.d*v.w*60/conc;return [["Concentration µg/mL",fmt(conc,0)],["Rate mL/h",fmt(rate,1)],["µg/min",fmt(v.d*v.w,1)],["Syringe lasts h",fmt(v.ml/rate,1)]]},
  n:"Rate (mL/h) = dose (µg/kg/min) × weight × 60 / concentration (µg/mL). Example: noradrenaline 4 mg in 50 mL = 80 µg/mL."},
 {t:"Mannitol and osmolarity",c:"abp",in:[["Mannitol % w/v","p",20],["Dose g/kg","g",0.5],["Weight kg","w",70]],
  f:(v,fmt)=>{const gL=v.p*10,osm=gL/182.17*1000,grams=v.g*v.w;return [["g per litre",fmt(gL,0)],["Osmolarity mOsm/L",fmt(osm,0),osm>1000?"warn":"ok"],["Dose g",fmt(grams,0)],["Volume mL",fmt(grams/(v.p/100),0)],["Osmoles given mOsm",fmt(grams/182.17*1000,0)]]},
  n:"Mannitol MW 182.17. 20% = 1098 mOsm/L, 10% = 549. 50% gives ~2745 mOsm/L; osmolality (per kg water) is higher as the solution is less than 1 kg water per litre."},
 {t:"Protamine for heparin reversal",c:"ecg",in:[["Heparin given (IU)","h",25000],["Minutes since last heparin","t",60],["Heparin t½ (min)","th",90]],
  f:(v,fmt)=>{const rem=v.h*Math.pow(0.5,v.t/v.th),pm=rem/100;return [["Heparin remaining (IU)",fmt(rem,0)],["Protamine (1 mg/100 IU)",fmt(pm,0)+" mg"],["Give in doses ≤ 50 mg at ≤ 5 mg/min",pm>50?"Split / recheck ACT":"Single dose OK",pm>50?"warn":"ok"]]},
  n:"Typical t½ 60–90 min (dose-dependent). After CPB, protamine is often dosed at 0.8–1 mg per 100 IU of the initial heparin dose and titrated to ACT. Excess protamine is anticoagulant."},
 {t:"Steroid equivalence and cover",c:"nibp",in:[["Prednisolone mg/day (or equivalent)","p",10],["Duration weeks","wk",8]],
  f:(v,fmt)=>{const risk=v.p>=5&&v.wk>=4;return [["Hydrocortisone equivalent mg",fmt(v.p*4,0)],["Methylprednisolone mg",fmt(v.p*0.8,1)],["Dexamethasone mg",fmt(v.p*0.15,2)],["HPA suppression risk",risk?"Yes: give cover":"Low",risk?"warn":"ok"],["Major surgery cover","100 mg IV at induction, then 200 mg/24 h until eating; double oral dose 48 h"]]},
  n:"Equivalent doses: hydrocortisone 20, prednisolone 5, methylprednisolone 4, dexamethasone 0.75 mg. Threshold ≥ 5 mg prednisolone for ≥ 4 weeks (AAGBI/SfE 2020)."},
 {t:"Gentamicin (once daily) and vancomycin loading",c:"etco2",in:[["Age","a",60],["Weight kg","w",90],["Height cm","h",175],["Female (1/0)","f",0],["Creatinine µmol/L","cr",90],["Gentamicin mg/kg (5 or 7)","g",5]],
  f:(v,fmt)=>{const ibw=(v.f?45.5:50)+0.9*(v.h-152.4),dw=v.w>1.2*ibw?ibw+0.4*(v.w-ibw):v.w,crcl=(140-v.a)*dw*(v.f?1.04:1.23)/v.cr;const gd=Math.min(v.g*dw,v.g===7?700:500);return [["Ideal body weight kg",fmt(ibw,1)],["Dosing weight kg",fmt(dw,1)],["CrCl (Cockcroft–Gault) mL/min",fmt(crcl,0),crcl<40?"warn":"ok"],["Gentamicin dose mg",fmt(Math.round(gd/20)*20,0)],["Suggested interval",crcl>=60?"24 h (check level 6–14 h, Hartford nomogram)":crcl>=40?"36 h":"48 h or avoid"],["Vancomycin load 25 mg/kg (actual wt, max 2 g)",fmt(Math.min(2000,Math.round(25*v.w/250)*250),0)+" mg at ≤ 10 mg/min"]]},
  n:"Dosing weight = adjusted body weight if > 120% IBW. Cockcroft–Gault factor 1.23 (men) / 1.04 (women) with creatinine in µmol/L. Check local protocols."},
 {t:"Status epilepticus doses",c:"etco2",in:[["Weight kg","w",70]],
  f:(v,fmt)=>[["Lorazepam 0.1 mg/kg (max 4 mg)",fmt(Math.min(4,0.1*v.w),1)+" mg"],["Buccal midazolam","10 mg (adult)"],["Levetiracetam 60 mg/kg (max 4.5 g)",fmt(Math.min(4500,60*v.w),0)+" mg over 10 min"],["Valproate 40 mg/kg (max 3 g)",fmt(Math.min(3000,40*v.w),0)+" mg over 10 min"],["Phenytoin 20 mg/kg (≤ 50 mg/min)",fmt(Math.min(2000,20*v.w),0)+" mg over ≥ "+fmt(Math.min(2000,20*v.w)/50,0)+" min"],["Phenobarbital 15 mg/kg",fmt(15*v.w,0)+" mg"]],
  n:"Benzodiazepine at 5 min (repeat once), second-line at 20 min, anaesthesia at 40 min. ESETT: levetiracetam, fosphenytoin and valproate are equally effective."},
 {t:"Asthma infusions",c:"etco2",in:[["Weight kg","w",70],["On oral theophylline (1/0)","th",0]],
  f:(v,fmt)=>[["Magnesium sulphate","2 g (8 mmol) over 20 min"],["Aminophylline load 5 mg/kg over 20 min",v.th?"Omit (on theophylline)":fmt(5*v.w,0)+" mg"],["Aminophylline infusion 0.5 mg/kg/h",fmt(0.5*v.w,0)+" mg/h"],["IV salbutamol","250 µg slowly, then 5–20 µg/min"],["Hydrocortisone","100 mg IV 6-hourly (or prednisolone 40–50 mg)"],["Ketamine","1–2 mg/kg induction; 0.5–2 mg/kg/h infusion"]],
  n:"BTS/SIGN. Aminophylline target level 10–20 mg/L; check within 24 h. Note the infusion is per hour, not per minute."},
];

const TABLES=[
 ["Adrenoceptors and dopamine receptors",["Receptor","G-protein","Main locations","Effects"],[["α1","Gq (IP3, DAG)","Vascular smooth muscle, iris, uterus, bladder sphincter","Vasoconstriction, mydriasis, glycogenolysis"],["α2","Gi (↓ cAMP)","Presynaptic terminals, CNS, pancreas, platelets","↓ NA release, sedation, analgesia, ↓ insulin, platelet aggregation"],["β1","Gs (↑ cAMP)","Heart, juxtaglomerular cells","↑ HR, contractility, conduction; renin release"],["β2","Gs","Bronchi, skeletal muscle vessels, uterus, liver","Bronchodilation, vasodilation, tocolysis, glycogenolysis, K⁺ uptake"],["β3","Gs","Adipose tissue, bladder","Lipolysis, detrusor relaxation"],["D1","Gs","Renal, mesenteric vessels","Vasodilation, natriuresis"],["D2","Gi","Presynaptic, CTZ, pituitary","↓ NA release, emesis, ↓ prolactin"]]],
 ["Perioperative management of cardiovascular drugs",["Drug class","Recommendation","Reason"],[["β-blockers","Continue; do not start high dose < 24 h before","Rebound ischaemia; POISE"],["ACEi / ARB / ARNI","Omit 24 h before or continue (individualise)","Intra-operative hypotension; STOP-or-NOT: no outcome difference"],["Calcium channel blockers","Continue","Rebound hypertension and angina"],["Diuretics","Omit morning of surgery","Hypovolaemia, hypokalaemia"],["Statins","Continue","Withdrawal increases cardiac events"],["Clonidine","Continue","Rebound hypertension"],["Nitrates, nicorandil","Continue","Angina"],["Digoxin","Continue; check K⁺ and level if concern","Rate control"],["Amiodarone","Continue","Long t½; arrhythmia control"],["Antiplatelets / anticoagulants","See coagulation slides and timeline","Balance bleeding vs thrombosis"]]],
 ["Vaughan Williams classification",["Class","Action","Examples","ECG / notes"],[["Ia","Na⁺ block (intermediate), ↑ APD","Quinidine, procainamide, disopyramide","↑ QRS, ↑ QT"],["Ib","Na⁺ block (fast), ↓ APD","Lidocaine, mexiletine, phenytoin","Ischaemic ventricle"],["Ic","Na⁺ block (slow)","Flecainide, propafenone","↑↑ QRS; avoid in structural disease"],["II","β-blockade","Metoprolol, esmolol, propranolol","↑ PR, ↓ HR"],["III","K⁺ block, ↑ APD","Amiodarone, sotalol, dronedarone","↑ QT; torsades"],["IV","L-type Ca²⁺ block","Verapamil, diltiazem","↑ PR; AV nodal"],["Other","Variable","Adenosine (A1), digoxin, magnesium, atropine, ivabradine (class 0)","—"]]],
 ["Anticoagulants",["Drug","Mechanism","t½","Monitoring","Reversal","Before neuraxial"],[["UFH","Antithrombin (IIa = Xa)","1–2 h","APTT, ACT, anti-Xa","Protamine 1 mg/100 IU","IV 4–6 h; SC 4 h"],["LMWH","Antithrombin (Xa > IIa)","4–6 h","Anti-Xa","Protamine partial","12 h prophylactic; 24 h treatment"],["Fondaparinux","Antithrombin (Xa only)","17–21 h","Anti-Xa (specific)","None (rVIIa)","36–42 h (prophylactic)"],["Warfarin","VKORC1 inhibition","40 h","INR","Vitamin K + PCC","5 days; INR ≤ 1.4"],["Apixaban","Direct Xa","12 h","Calibrated anti-Xa","Andexanet / PCC","72 h"],["Rivaroxaban","Direct Xa","7–11 h","Calibrated anti-Xa","Andexanet / PCC","72 h"],["Dabigatran","Direct thrombin","12–17 h (renal)","dTT, ECT","Idarucizumab, dialysis","72–120 h by CrCl"],["Argatroban / bivalirudin","Direct thrombin (IV)","45 min / 25 min","APTT, ACT","None","4 h"]]],
 ["Antiemetics",["Class","Drugs","Site","Dose","Side effects"],[["5-HT3 antagonist","Ondansetron, granisetron, palonosetron","CTZ, vagal afferents","4 mg at end","QT, headache, constipation"],["Corticosteroid","Dexamethasone","Unclear (central PG)","4–8 mg at induction","Hyperglycaemia, perineal burning"],["D2 antagonist","Droperidol, haloperidol, amisulpride, metoclopramide, prochlorperazine","CTZ","0.625–1.25 mg droperidol; 5 mg amisulpride","QT, EPS, sedation, NMS"],["NK1 antagonist","Aprepitant, fosaprepitant","CTZ, NTS","40–80 mg oral","OCP interaction"],["H1 antagonist","Cyclizine, promethazine","Vestibular, vomiting centre","50 mg cyclizine","Tachycardia, sedation, abuse"],["Antimuscarinic","Hyoscine patch","Vestibular","1.5 mg patch","Dry mouth, confusion, blurred vision"]]],
 ["Corticosteroid equivalence",["Steroid","Equivalent dose","Glucocorticoid","Mineralocorticoid","t½ (biological)"],[["Hydrocortisone","20 mg","1","1","8–12 h"],["Prednisolone","5 mg","4","0.8","12–36 h"],["Methylprednisolone","4 mg","5","0.5","12–36 h"],["Dexamethasone","0.75 mg","25–30","~0","36–54 h"],["Fludrocortisone","—","10","125–400","18–36 h"]]],
 ["Antibiotic classes",["Class","Mechanism","Examples","Killing","Anaesthetic relevance"],[["Penicillins","PBP / cell wall","Amoxicillin, flucloxacillin, piperacillin–tazobactam","Time","Allergy; NAP6"],["Cephalosporins","PBP / cell wall","Cefazolin, cefuroxime, ceftriaxone","Time","Prophylaxis; low cross-reactivity"],["Carbapenems","PBP / cell wall","Meropenem, ertapenem","Time","↓ valproate; seizures (imipenem)"],["Glycopeptides","D-Ala-D-Ala","Vancomycin, teicoplanin","AUC","Flushing; teicoplanin anaphylaxis"],["Aminoglycosides","30S","Gentamicin, amikacin","Concentration","NMB potentiation; oto/nephrotoxicity"],["Macrolides","50S","Clarithromycin, erythromycin","Time/AUC","CYP3A4 inhibition, QT, prokinetic"],["Lincosamides","50S","Clindamycin","Time","NMB potentiation; C. difficile"],["Oxazolidinones","50S","Linezolid","AUC","MAOI: serotonin syndrome"],["Fluoroquinolones","DNA gyrase","Ciprofloxacin, levofloxacin","Concentration","QT, seizures, tendons, aorta"],["Nitroimidazoles","DNA damage","Metronidazole","Concentration","Disulfiram reaction, warfarin"],["Polymyxins","Membrane","Colistin","Concentration","Nephrotoxicity, NMB potentiation"]]],
 ["Perioperative psychiatric and neurological drugs",["Drug","Default","Key issues"],[["SSRIs","Continue","Bleeding, hyponatraemia, serotonin syndrome"],["TCAs","Continue","Anticholinergic, QT, sympathomimetic sensitivity"],["Irreversible MAOIs","Usually continue; MAOI-safe anaesthetic","No pethidine, no indirect sympathomimetics"],["Moclobemide","Omit 24 h","Reversible"],["Lithium","Continue (minor); omit 24 h (major); check level","NMB prolongation, nephrotoxicity, interactions"],["Antipsychotics / clozapine","Continue","QT, NMS, agranulocytosis"],["Antiepileptics","Continue (IV if NBM)","Enzyme induction, NMB resistance"],["Parkinson's drugs","Continue (time-critical)","Rigidity, NMS-like crisis; avoid D2 antagonists"]]],
];

const CARDS=[
 ["vaso","Rate-limiting enzyme in catecholamine synthesis?","Tyrosine hydroxylase."],
 ["vaso","Enzyme converting noradrenaline to adrenaline?","PNMT (induced by cortisol)."],
 ["vaso","α1 receptor G-protein and second messengers?","Gq: IP3 and DAG."],
 ["vaso","β2 effects?","Bronchodilation, vasodilation, glycogenolysis, K⁺ into cells, tocolysis."],
 ["vaso","Why does ephedrine show tachyphylaxis?","Indirect action depletes noradrenaline stores."],
 ["vaso","Adrenaline receptor profile with dose?","Low: β; high: α1."],
 ["vaso","First-line vasopressor in septic shock?","Noradrenaline."],
 ["vaso","When to add vasopressin in septic shock?","Noradrenaline 0.25–0.5 µg/kg/min."],
 ["vaso","Milrinone mechanism?","PDE3 inhibition → ↑ cAMP (inodilator)."],
 ["vaso","Levosimendan mechanism?","Ca²⁺ sensitiser (troponin C) + K_ATP opener."],
 ["vaso","Dobutamine receptors?","β1 > β2, some α1 (racemic)."],
 ["vaso","Methylene blue mechanism in vasoplegia?","Inhibits NOS and guanylyl cyclase."],
 ["vaso","Vasopressin dose in shock?","0.01–0.04 U/min (usually 0.03)."],
 ["cv","GTN mechanism?","Denitration to NO → cGMP; mainly venodilator."],
 ["cv","SNP cyanide molecules per molecule?","Five."],
 ["cv","Signs of cyanide toxicity with SNP?","Tachyphylaxis, metabolic acidosis, high SvO2, arrhythmias."],
 ["cv","Treatment of cyanide toxicity?","Stop SNP, O2, hydroxocobalamin, sodium thiosulphate."],
 ["cv","SNP maximum dose?","8 µg/kg/min for ≤ 10 min."],
 ["cv","Labetalol α:β ratio IV?","1:7."],
 ["cv","Esmolol metabolism and t½?","RBC esterases; ~9 min."],
 ["cv","Hydralazine side effect in slow acetylators?","Drug-induced lupus."],
 ["cv","POISE trial finding?","Metoprolol started before surgery: fewer MIs, more strokes and deaths."],
 ["cv","STOP-or-NOT result?","No difference in complications; more hypotension when RASi continued."],
 ["cv","BP threshold to proceed with elective surgery (primary care)?","< 160/100 mmHg."],
 ["cv","Which Ca²⁺ channel is targeted by CCBs?","L-type."],
 ["cv","Class Ib example and APD effect?","Lidocaine; shortens APD."],
 ["cv","Class Ic example and caveat?","Flecainide; avoid in structural heart disease (CAST)."],
 ["cv","Class III mechanism?","K⁺ channel block → ↑ APD and refractory period."],
 ["cv","Sotalol classes?","II and III."],
 ["cv","Class 0 in the modernised classification?","HCN (If) blockers: ivabradine."],
 ["cv","Amiodarone IV loading?","300 mg (5 mg/kg) over 20–60 min, then 900 mg/24 h."],
 ["cv","Amiodarone half-life?","20–100 days."],
 ["cv","Amiodarone thyroid effects?","Hypothyroidism (commoner) or hyperthyroidism (types 1 and 2)."],
 ["cv","Adenosine receptor and mechanism?","A1 (Gi) → K_ACh channels open, AV block."],
 ["cv","Adenosine doses?","6, 12, 18 mg rapid IV."],
 ["cv","Who needs a lower adenosine dose?","Central line, heart transplant, dipyridamole, carbamazepine."],
 ["cv","Digoxin mechanism?","Na⁺/K⁺-ATPase inhibition, ↑ vagal tone."],
 ["cv","Factors increasing digoxin toxicity?","↓ K⁺, ↓ Mg²⁺, ↑ Ca²⁺, renal failure, amiodarone, verapamil."],
 ["cv","Magnesium dose for torsades?","2 g IV over 10–15 min."],
 ["cv","Loop diuretic site and transporter?","Thick ascending limb, NKCC2."],
 ["cv","Thiazide effect on calcium?","↓ Ca²⁺ excretion (hypercalcaemia)."],
 ["cv","Acetazolamide acid–base effect?","Hyperchloraemic metabolic acidosis."],
 ["cv","Osmolarity of 20% mannitol?","~1100 mOsm/L."],
 ["cv","Statin perioperative advice?","Continue."],
 ["coag","Aspirin mechanism?","Irreversible COX-1 acetylation (↓ TXA2)."],
 ["coag","Clopidogrel activation?","Prodrug via CYP2C19."],
 ["coag","Which P2Y12 inhibitor is reversible?","Ticagrelor (and IV cangrelor)."],
 ["coag","DAPT delay before elective surgery after DES?","≥ 6 months (12 after ACS)."],
 ["coag","UFH mechanism?","Potentiates antithrombin (IIa and Xa)."],
 ["coag","Protamine dose?","1 mg per 100 IU heparin (max 50 mg)."],
 ["coag","Protamine adverse reactions?","Hypotension, anaphylaxis, pulmonary hypertension."],
 ["coag","LMWH monitoring test?","Anti-Xa."],
 ["coag","HIT type II timing?","5–10 days after starting (earlier if recent exposure)."],
 ["coag","HIT pathophysiology?","IgG against heparin–PF4 activating platelets."],
 ["coag","HIT treatment?","Stop all heparin; argatroban/bivalirudin/fondaparinux; no platelets."],
 ["coag","Warfarin target enzyme?","Vitamin K epoxide reductase (VKORC1)."],
 ["coag","Vitamin K-dependent factors?","II, VII, IX, X, proteins C and S."],
 ["coag","Warfarin major bleeding reversal?","Vitamin K 5–10 mg IV + PCC 25–50 IU/kg."],
 ["coag","INR for neuraxial block?","≤ 1.4."],
 ["coag","Dabigatran antidote?","Idarucizumab 5 g."],
 ["coag","Apixaban/rivaroxaban antidote?","Andexanet alfa (or PCC)."],
 ["coag","Test excluding dabigatran effect?","Normal thrombin time."],
 ["coag","Apixaban before neuraxial?","≥ 72 h."],
 ["coag","PAUSE apixaban omission?","1 day (low bleed risk), 2 days (high)."],
 ["coag","TXA mechanism?","Blocks lysine sites on plasminogen."],
 ["coag","CRASH-2 time limit?","Within 3 h of injury."],
 ["coag","Desmopressin haemostatic mechanism?","V2-mediated release of vWF and factor VIII."],
 ["gi","Apfel risk factors?","Female, non-smoker, PONV/motion sickness history, postoperative opioids."],
 ["gi","Apfel risk with 2 factors?","~39%."],
 ["gi","Ondansetron timing and dose?","4 mg at end of surgery."],
 ["gi","Dexamethasone PONV dose?","4–8 mg at induction."],
 ["gi","Droperidol concern?","QT prolongation."],
 ["gi","Rescue antiemetic rule?","Use a different class from prophylaxis."],
 ["gi","Cyclizine receptors?","H1 and muscarinic antagonist."],
 ["gi","Metoclopramide prokinetic mechanism?","D2 antagonism + 5-HT4 agonism."],
 ["gi","Erythromycin prokinetic mechanism?","Motilin receptor agonist."],
 ["gi","Antacid before GA caesarean?","Sodium citrate 0.3 M 30 mL."],
 ["gi","GLP-1 agonist anaesthetic risk?","Delayed gastric emptying → aspiration."],
 ["gi","SGLT2 inhibitor perioperative?","Omit day before and day of surgery."],
 ["gi","Metformin mechanism?","↓ hepatic gluconeogenesis (AMPK)."],
 ["gi","Sulphonylurea mechanism?","Close β-cell K_ATP channels."],
 ["gi","VRIII glucose target?","6–12 mmol/L."],
 ["gi","Hydrocortisone equivalent of 5 mg prednisolone?","20 mg."],
 ["gi","Dexamethasone potency vs hydrocortisone?","25–30× glucocorticoid, no mineralocorticoid."],
 ["gi","Steroid cover threshold?","≥ 5 mg prednisolone for ≥ 4 weeks (within 3 months)."],
 ["gi","Major surgery steroid cover?","Hydrocortisone 100 mg IV at induction, then 200 mg/24 h."],
 ["gi","Hydrocortisone in septic shock?","200 mg/day if ongoing vasopressor needs."],
 ["gi","Steroids in bacterial meningitis?","Dexamethasone 10 mg 6-hourly for 4 days."],
 ["misc","β-lactam PK/PD target?","fT > MIC."],
 ["misc","Aminoglycoside PK/PD target?","Cmax/MIC ≥ 8–10."],
 ["misc","Vancomycin target?","AUC24/MIC 400–600."],
 ["misc","Antibiotics that potentiate NMB?","Aminoglycosides, clindamycin, polymyxins."],
 ["misc","Carbapenem interaction?","↓ valproate levels (seizures)."],
 ["misc","Linezolid interaction?","MAOI → serotonin syndrome."],
 ["misc","Commonest cause of perioperative anaphylaxis in NAP6?","Antibiotics (teicoplanin highest rate)."],
 ["misc","Surgical prophylaxis timing?","Within 60 min before incision."],
 ["misc","Cefazolin redosing?","Every 4 h or blood loss > 1500 mL."],
 ["misc","Start Smart then Focus review time?","48–72 h."],
 ["misc","Phenytoin kinetics?","Zero-order in therapeutic range."],
 ["misc","Phenytoin maximum IV rate?","50 mg/min."],
 ["misc","Levetiracetam mechanism?","SV2A modulation."],
 ["misc","Levetiracetam status epilepticus dose?","60 mg/kg (max 4.5 g)."],
 ["misc","Enzyme-inducing anticonvulsants and NMBs?","Resistance to aminosteroids."],
 ["misc","TCA overdose treatment for broad QRS?","Sodium bicarbonate."],
 ["misc","MAOI: drugs to avoid?","Pethidine, tramadol, indirect sympathomimetics."],
 ["misc","Lithium therapeutic range?","0.4–1.0 mmol/L."],
 ["misc","Aminophylline infusion rate?","0.5 mg/kg/h."],
 ["misc","Magnesium in acute asthma?","2 g IV over 20 min."],
 ["misc","Theophylline therapeutic range?","10–20 mg/L."],
];

const FCF={all:"All",vaso:"Inotropes & vasopressors",cv:"CVS drugs",coag:"Coagulation",gi:"GI, endocrine, PONV",misc:"Antimicrobials, CNS, resp"};

const VIVA=[
 {st:"SOE 2 · Pharmacology",q:"Classify antiarrhythmic drugs. Tell me about amiodarone and adenosine.",a:["Draw ventricular and nodal APs.","Vaughan Williams with examples and limitations; modernised classification.","Amiodarone: structure, mechanisms, dose, PK, side effects by system, interactions.","Adenosine: receptor, mechanism, dose, t½, contraindications, interactions.","Clinical use in SVT, AF, VT."],fu:"Why must adenosine be given as a rapid bolus via a large vein?"},
 {st:"SOE 2 · Pharmacology",q:"Difference between nitroglycerine and nitroprusside. How would you treat postoperative hypertension?",a:["Mechanism (NO, cGMP), enzyme dependence.","Venous vs balanced vasodilation; onset/offset; doses.","SNP: cyanide, thiocyanate, light sensitivity; treatment.","Postoperative hypertension: causes to exclude first.","Drugs with doses: labetalol, esmolol, GTN, hydralazine, clonidine."],fu:"What would make you suspect cyanide toxicity?"},
 {st:"SOE 2 · Pharmacology",q:"Perioperative management of antihypertensive drugs. Would you continue β-blockers and ACE inhibitors?",a:["Classes and NICE ladder.","β-blockers: continue; POISE; do not start acutely.","ACEi/ARB: STOP-or-NOT; hypotension; vasopressin.","CCBs and anaesthetic interactions.","BP thresholds for elective surgery."],fu:"How would you treat refractory hypotension in a patient on an ACE inhibitor?"},
 {st:"SOE 2 · Pharmacology",q:"Heparin: mechanism, side effects, reversal, uses. What is HIT?",a:["Structure and antithrombin mechanism; UFH vs LMWH.","Dosing and monitoring (APTT, ACT, anti-Xa).","Protamine: dose and reactions.","HIT pathophysiology, diagnosis (4Ts, assays), management.","Neuraxial timings."],fu:"Why does LMWH have less anti-IIa activity?"},
 {st:"SOE 2 · Pharmacology",q:"Direct oral anticoagulants: how do you monitor their effect and what are the implications for anaesthesia?",a:["Classes and mechanisms.","PK: onset, t½, renal dependence.","Monitoring: calibrated anti-Xa, dTT; limitations of PT/APTT.","Perioperative interruption (PAUSE) and neuraxial timings.","Reversal: idarucizumab, andexanet, PCC; emergency surgery."],fu:"A patient on apixaban needs an emergency laparotomy. What do you do?"},
 {st:"SOE 2 · Pharmacology",q:"Tell me about inotropes and vasopressors.",a:["Define and classify by mechanism.","Receptor pharmacology and second messengers.","Drug-by-drug with doses.","Choice in septic, cardiogenic and RV failure.","Side effects and monitoring."],fu:"Why does adrenaline raise lactate?"},
 {st:"SOE 2 · Pharmacology",q:"A patient has been on oral steroids for 2 months. What are your concerns?",a:["Mechanism and potency.","Side effects by system.","HPA suppression and risk thresholds.","Steroid cover by surgical stress.","Adrenal crisis recognition and treatment."],fu:"What are the equivalent doses of prednisolone and dexamethasone?"},
 {st:"SOE 2 · Pharmacology",q:"Antibiotics: common groups, pharmacokinetics and pharmacodynamics, and stewardship.",a:["Classification by mechanism.","Time- vs concentration-dependent killing; AUC/MIC.","Changes in critical illness.","Prophylaxis rules and allergy.","Stewardship principles and resistance."],fu:"How would you dose meropenem in augmented renal clearance?"},
 {st:"SOE 2 · Pharmacology",q:"PONV: risk factors, prevention and treatment.",a:["Physiology and receptors.","Apfel and other risk factors.","Prophylaxis by risk; drug classes and doses.","Risk reduction strategies.","Rescue therapy from a different class; PDNV."],fu:"Why is droperidol limited in some countries?"},
 {st:"SOE 2 · Pharmacology",q:"Antidepressants, antipsychotics and antiepileptics: types and concerns in anaesthesia.",a:["SSRIs, TCAs, MAOIs, lithium: mechanisms and interactions.","Serotonin syndrome and NMS.","Antiepileptics: mechanisms, enzyme effects, continue perioperatively.","Specific interactions: pethidine, sympathomimetics, NMB.","Toxidromes and treatment."],fu:"A patient on phenelzine becomes hypotensive after induction. What do you give?"},
 {st:"SOE 3 · Critical incident",q:"Management of status asthmaticus.",a:["Assessment of severity.","Stepwise drugs with doses.","Indications for intubation; induction choice.","Ventilation strategy and dynamic hyperinflation.","Refractory options: volatiles, ketamine, ECMO."],fu:"What is the aminophylline infusion rate?"},
 {st:"SOE 2 · Pharmacology",q:"Diuretics, especially thiazides. Calculate the osmolarity of 50% mannitol.",a:["Classify by site with mechanism.","Thiazide effects and side effects.","Loop diuretics and K⁺-sparing.","Mannitol mechanism and uses.","Calculation: 500/182 × 1000 ≈ 2745 mOsm/L."],fu:"What is the difference between osmolarity and osmolality?"},
];

const QUIZ=[
 ["Sympathomimetics",[["Ephedrine is a mixed-acting sympathomimetic",1,""],["Phenylephrine is an α2 agonist",0,"α1."],["Dobutamine is a racemic mixture",1,""],["Noradrenaline causes reflex bradycardia",1,""],["Dopamine at 2 µg/kg/min is renoprotective",0,"No outcome benefit."]]],
 ["Vasodilators",[["SNP releases NO without enzymatic metabolism",1,""],["GTN mainly dilates arterioles",0,"Mainly veins."],["Hydroxocobalamin treats cyanide toxicity",1,""],["Tolerance develops to GTN",1,""],["SNP improves hypoxic pulmonary vasoconstriction",0,"Inhibits it."]]],
 ["Antiarrhythmics",[["Lidocaine is class Ib",1,""],["Flecainide shortens the APD",0,"Little effect on APD."],["Sotalol has class II and III actions",1,""],["Verapamil is safe in pre-excited AF",0,"Dangerous."],["Amiodarone has all four class actions",1,""]]],
 ["Adenosine and digoxin",[["Adenosine acts on A1 receptors",1,""],["Theophylline potentiates adenosine",0,"Antagonises."],["Digoxin toxicity is worsened by hypokalaemia",1,""],["Digoxin inhibits Na⁺/K⁺-ATPase",1,""],["Adenosine t½ is about 2 min",0,"< 10 s."]]],
 ["Diuretics",[["Furosemide acts on NKCC2",1,""],["Thiazides cause hypocalcaemia",0,"Hypercalcaemia."],["Acetazolamide causes metabolic acidosis",1,""],["Spironolactone causes hyperkalaemia",1,""],["Mannitol is reabsorbed in the PCT",0,"Not reabsorbed."]]],
 ["Heparin",[["UFH acts via antithrombin",1,""],["LMWH is fully reversed by protamine",0,"~60%."],["HIT causes thrombosis",1,""],["Platelets should be transfused in HIT",0,"Avoid unless bleeding."],["1 mg protamine reverses 100 IU heparin",1,""]]],
 ["Oral anticoagulants",[["Warfarin inhibits VKORC1",1,""],["Factor VII has the shortest t½",1,""],["Dabigatran is a direct Xa inhibitor",0,"Direct thrombin inhibitor."],["Idarucizumab reverses dabigatran",1,""],["FFP is first-line warfarin reversal",0,"PCC + vitamin K."]]],
 ["Antiplatelets",[["Aspirin irreversibly inhibits COX-1",1,""],["Clopidogrel is a prodrug",1,""],["Ticagrelor binds irreversibly",0,"Reversible."],["Aspirin alone contraindicates neuraxial block",0,""],["Prasugrel should be stopped 7 days before",1,""]]],
 ["Antiemetics",[["Ondansetron is a 5-HT3 antagonist",1,""],["Droperidol can prolong QT",1,""],["Aprepitant is an NK1 antagonist",1,""],["Cyclizine is a D2 antagonist",0,"H1 antagonist."],["Rescue should use the same class as prophylaxis",0,"Different class."]]],
 ["Steroids",[["Prednisolone 5 mg ≈ hydrocortisone 20 mg",1,""],["Dexamethasone has strong mineralocorticoid activity",0,"Negligible."],["Steroids are indicated in head injury",0,"CRASH: harm."],["Hydrocortisone 200 mg/day is used in septic shock",1,""],["Inhaled steroids can suppress the HPA axis",1,""]]],
 ["Antibiotics",[["β-lactams show time-dependent killing",1,""],["Gentamicin has a post-antibiotic effect",1,""],["Vancomycin flushing is IgE-mediated",0,"Direct histamine release."],["Carbapenems lower valproate levels",1,""],["Clindamycin potentiates NMB",1,""]]],
 ["Anticonvulsants",[["Phenytoin shows zero-order kinetics at therapeutic levels",1,""],["Levetiracetam is an enzyme inducer",0,"Few interactions."],["Valproate is an enzyme inhibitor",1,""],["Carbamazepine can cause SIADH",1,""],["Phenytoin can be given at 100 mg/min",0,"≤ 50 mg/min."]]],
 ["Psychiatric drugs",[["Linezolid has MAOI activity",1,""],["Lithium levels fall with NSAIDs",0,"Rise."],["TCA overdose is treated with bicarbonate",1,""],["Moclobemide is a reversible MAO-A inhibitor",1,""],["Ephedrine is safe with MAOIs",0,"Hypertensive crisis."]]],
 ["Asthma drugs",[["Salbutamol is a β2 agonist",1,""],["Aminophylline infusion is 0.5 mg/kg/min",0,"0.5 mg/kg/h."],["Theophylline levels rise with ciprofloxacin",1,""],["Magnesium relaxes bronchial smooth muscle",1,""],["IV salbutamol can cause lactic acidosis",1,""]]],
];

const CRISIS=[
 ["Acute severe bronchospasm under GA","etco2",["Call for help; 100% O2; check circuit, tube position and kinking; exclude anaphylaxis, aspiration, pneumothorax, endobronchial intubation.","Deepen anaesthesia (volatile, propofol, ketamine).","Salbutamol: 6–10 puffs via circuit or 250 µg IV slowly; ipratropium.","Magnesium 2 g IV; hydrocortisone 100 mg; aminophylline 5 mg/kg (if not on theophylline) then 0.5 mg/kg/h; adrenaline 10–100 µg IV if severe.","Ventilate with low RR, long expiration, permissive hypercapnia; disconnect if gas trapping causes hypotension."],"Airway smooth muscle constriction, oedema and mucus; dynamic hyperinflation reduces venous return."],
 ["Major bleeding on an anticoagulant","ecg",["Resuscitate (major haemorrhage protocol); surgical or endoscopic control; TXA 1 g.","Identify drug, dose and time of last dose; send PT, APTT, TT, anti-Xa/dTT, fibrinogen, platelets.","Warfarin: vitamin K 5–10 mg IV + 4-factor PCC 25–50 IU/kg.","Dabigatran: idarucizumab 5 g IV; consider dialysis. Apixaban/rivaroxaban: andexanet alfa or PCC 50 IU/kg.","UFH: protamine; LMWH: protamine (partial). Antiplatelets: platelets, desmopressin."],"Specific reversal plus haemostatic resuscitation."],
 ["Heparin-induced thrombocytopenia","ecg",["Suspect: platelets fall > 50% 5–10 days after heparin, new thrombosis, skin necrosis at injection sites.","Calculate 4Ts score; if intermediate/high stop ALL heparin (including flushes and heparin-coated catheters).","Start argatroban (hepatic clearance, APTT-guided) or bivalirudin; fondaparinux or DOAC if stable.","Send PF4 antibody and functional assay; Doppler scan for DVT.","No platelet transfusion unless bleeding; no warfarin until platelets > 150; document allergy."],"IgG–PF4–heparin complexes activate platelets via FcγRIIa, causing a prothrombotic state."],
 ["Status epilepticus","etco2",["0–5 min: ABC, O2, glucose (give thiamine if alcohol), time it.","5 min: lorazepam 0.1 mg/kg IV (max 4 mg) or buccal midazolam 10 mg; repeat once at 10 min.","20 min: levetiracetam 60 mg/kg (max 4.5 g) or valproate 40 mg/kg or phenytoin 20 mg/kg.","40 min: RSI with propofol/thiopental/midazolam; EEG monitoring; ICU.","Find the cause: hypoglycaemia, Na⁺, Ca²⁺, Mg²⁺, drugs, withdrawal, infection, structural lesions, eclampsia (magnesium)."],"Failure of seizure termination; GABA_A receptors internalise, so benzodiazepines lose effect with time."],
 ["Digoxin toxicity","abp",["Recognise: nausea, visual changes, confusion, any arrhythmia (bidirectional VT, atrial tachycardia with block), hyperkalaemia.","Stop digoxin; ECG monitoring; check K⁺, Mg²⁺, Ca²⁺, creatinine, digoxin level (≥ 6 h post-dose).","Correct hypokalaemia and hypomagnesaemia; avoid IV calcium in hyperkalaemia (classic teaching).","Digoxin-specific Fab for life-threatening arrhythmias, K⁺ > 5–6 mmol/L or large ingestion.","Bradycardia: atropine, pacing; avoid DC cardioversion (low energy if essential)."],"Na⁺/K⁺-ATPase inhibition causes Ca²⁺ overload and delayed afterdepolarisations."],
 ["Hypertensive crisis under anaesthesia","abp",["Check: depth (awareness), pain, hypercapnia, hypoxia, full bladder, drugs given (vasopressor error), transducer level.","Deepen anaesthesia and give analgesia first.","Labetalol 5–10 mg increments, esmolol 0.5 mg/kg, GTN 50–100 µg or infusion, hydralazine 5 mg.","Phaeochromocytoma suspected: phentolamine, magnesium, SNP; avoid β-blockers before α-blockade.","MAOI or cocaine interaction: phentolamine, benzodiazepines, GTN; avoid β-blockers with cocaine."],"Sympathetic surge or exogenous catecholamine excess."],
 ["Neuroleptic malignant syndrome","nibp",["Suspect after antipsychotics or abrupt withdrawal of dopaminergic drugs: fever, lead-pipe rigidity, autonomic instability, altered consciousness; ↑ CK.","Stop the offending drug; restart Parkinson's medication if withdrawn.","Cooling, fluids, ICU monitoring; benzodiazepines.","Dantrolene and/or bromocriptine (or amantadine) for severe cases; ventilate if needed.","Differentiate from MH, serotonin syndrome and sepsis; monitor for rhabdomyolysis and AKI."],"Central dopamine D2 blockade in the hypothalamus and basal ganglia."],
];

const SRC="";
const ERR="";
const REFS="";

const DIAG=`<div class="grid2">
 <div class="fig"><h3>Vasoactive drug receptor profile</h3>
  <div class="seg" id="va-sel"></div>
  <div class="ctl"><label>Dose (position in usual range) <input type="range" id="va-d" min="0" max="1" step="0.05" value="0.3"><output id="va-d-o"></output></label></div>
  <div class="svgbox"><svg id="va" viewBox="0 0 520 320" role="img" aria-label="Receptor profile"></svg></div>
  <div class="readout" id="va-r"></div></div>

 <div class="fig"><h3>Action potentials and antiarrhythmics</h3>
  <div class="seg" id="ap-sel"></div>
  <div class="svgbox"><svg id="ap" viewBox="0 0 520 360" role="img" aria-label="Action potentials"></svg></div>
  <div class="readout" id="ap-r"></div></div>

 <div class="fig"><h3>Diuretic sites on the nephron</h3>
  <div class="seg" id="ne-sel"></div>
  <div class="svgbox"><svg id="ne" viewBox="0 0 520 300" role="img" aria-label="Nephron"></svg></div>
  <div class="readout" id="ne-r"></div></div>

 <div class="fig" style="grid-column:1/-1"><h3>PONV risk (Apfel)</h3>
  <div class="ctl" id="pv-box" style="flex-direction:row;flex-wrap:wrap;gap:8px 20px"></div>
  <div class="svgbox"><svg id="pv" viewBox="0 0 900 250" role="img" aria-label="Apfel risk"></svg></div>
  <div class="readout" id="pv-r"></div></div>

 <div class="fig" style="grid-column:1/-1"><h3>Antithrombotics: stop and restart timeline</h3>
  <div class="seg" id="tl-sel"></div>
  <div class="ctl"><div class="seg" id="tl-risk"></div><label>CrCl mL/min <input type="range" id="tl-c" min="20" max="120" step="5" value="80"><output id="tl-c-o"></output></label></div>
  <div class="svgbox"><svg id="tl" viewBox="0 0 900 200" role="img" aria-label="Timeline"></svg></div>
  <div class="readout" id="tl-r"></div></div>

 <div class="fig" style="grid-column:1/-1"><h3>Antibiotic PK/PD: concentration vs MIC</h3>
  <div class="ctl"><div class="seg" id="ab-sel"></div><div class="seg" id="ab-reg"></div><div class="seg" id="ab-ren"></div></div>
  <div class="ctl"><label>MIC mg/L <input type="range" id="ab-m" min="0.5" max="32" step="0.5" value="8"><output id="ab-m-o"></output></label></div>
  <div class="svgbox"><svg id="ab" viewBox="0 0 900 300" role="img" aria-label="Antibiotic concentration"></svg></div>
  <div class="readout" id="ab-r"></div></div>
</div>`;

function initDiagrams(){
 const out=(id,t)=>{const o=$("#"+id+"-o");if(o)o.textContent=t};
 const mk=svg=>(t,a,tx)=>{const e=document.createElementNS(SVGNS,t);for(const k in a)e.setAttribute(k,a[k]);if(tx!=null)e.textContent=tx;svg.append(e);return e};

 /* 1. Vasoactive */
 let vaK="adr";
 function drawVA(){const f=+$("#va-d").value;const [nm,[lo,hi],fn]=VASO[vaK];const d=lo+(hi-lo)*f;out("va-d",d<1?d.toFixed(d<0.1?3:2):d.toFixed(1));
  const r=fn(d);const svg=$("#va");svg.innerHTML="";const add=mk(svg);
  add("text",{x:20,y:18,class:"lbl"},"Relative receptor activity (0–4)");
  RECS.forEach((rc,i)=>{const x=40+i*45,h=r[i]*40;add("rect",{x,y:190-h,width:32,height:Math.max(1,h),fill:["var(--abp)","var(--spo2)","var(--etco2)","var(--nibp)","var(--ecg)","var(--muted)"][i]});add("text",{x:x+16,y:206,"text-anchor":"middle",class:"lbl"},rc)});
  add("line",{x1:30,x2:310,y1:190,y2:190,stroke:"var(--muted)"});
  const h=haemo(r);h.MAP=(h.CO+h.SVR)/1.5;const ef=[["HR",h.HR],["CO",h.CO],["SVR",h.SVR],["MAP",h.MAP]];
  add("text",{x:340,y:18,class:"lbl"},"Predicted direction");
  ef.forEach(([n,v],i)=>{const y=40+i*42;const w=Math.max(-1,Math.min(1,v/3))*80;add("text",{x:340,y:y+14,class:"lbl"},n);add("line",{x1:430,x2:430,y1:y-2,y2:y+24,stroke:"var(--muted)"});add("rect",{x:w<0?430+w:430,y:y,width:Math.max(1,Math.abs(w)),height:20,fill:w>=0?"var(--good)":"var(--bad)","fill-opacity":0.8})});
  add("text",{x:350,y:230,class:"lbl","font-size":"10"},"← fall    rise →");
  const notes={adr:"Low dose: β1/β2 (↑ CO, ↓ SVR, wide pulse pressure). High dose: α1 dominates (↑ SVR). β2 glycolysis raises lactate and glucose.",nor:"α1-dominant with modest β1: ↑ SVR and MAP; HR may fall (baroreflex). CO unchanged or ↑ (venous return) unless afterload-sensitive ventricle.",dop:"Dose-dependent: D1 (2–5), β1 (5–10), α1 (> 10 µg/kg/min). Arrhythmias; no renal protection; suppresses prolactin.",dob:"β1 inotropy with β2 vasodilation: ↑ CO, ↓ SVR; MAP may fall. Tachycardia and arrhythmias; tolerance after 72 h.",phe:"Pure α1: ↑ SVR and MAP, reflex bradycardia, CO may fall. Good for spinal hypotension in obstetrics.",vas:"V1 vasoconstriction independent of adrenoceptors (works in acidosis and catecholamine resistance). ↑ SVR, may ↓ CO and splanchnic flow.",mil:"PDE3 inhibition: ↑ cAMP without receptors (works with β-blockade, downregulation). Inodilator: ↑ CO, ↓ SVR and PVR; often needs noradrenaline.",iso:"Non-selective β: ↑ HR and CO, ↓ SVR (MAP may fall). Bridge to pacing in bradycardia; torsades with bradycardia."};
  $("#va-r").innerHTML=`<b>${nm}</b> at ${d<1?d.toFixed(3):d.toFixed(1)} ${vaK==="vas"||vaK==="iso"?"":"µg/kg/min"}. ${notes[vaK]} <i>Schematic teaching profile, not measured data.</i>`}
 seg($("#va-sel"),Object.entries(VASO).map(([k,v])=>[k,v[0].split(" (")[0]]),k=>{vaK=k;drawVA()},"adr");$("#va-d").oninput=drawVA;

 /* 2. Action potentials */
 const APD={base:["Baseline",{up:2,apd:280,rest:-90,plat:5},{slope:0.12,mdp:-60,thr:-40,up:0.6,amp:10}],
  ia:["Class Ia",{up:5,apd:330,rest:-90,plat:5},null],ib:["Class Ib",{up:3,apd:240,rest:-90,plat:5},null],ic:["Class Ic",{up:9,apd:285,rest:-90,plat:5},null],
  ii:["Class II (β-blocker)",null,{slope:0.07,mdp:-60,thr:-40,up:0.6,amp:10}],iii:["Class III",{up:2.2,apd:380,rest:-90,plat:5},null],
  iv:["Class IV (verapamil)",null,{slope:0.08,mdp:-60,thr:-38,up:0.3,amp:4}],ade:["Adenosine",null,{slope:0.06,mdp:-68,thr:-40,up:0.6,amp:10}],dig:["Digoxin (vagal)",{up:2,apd:260,rest:-88,plat:5},{slope:0.09,mdp:-64,thr:-40,up:0.6,amp:10}],
  ivab:["Ivabradine (class 0)",null,{slope:0.07,mdp:-60,thr:-40,up:0.6,amp:10}]};
 function vent(p,t){const t0=20;if(t<t0)return p.rest;const tu=t0+p.up;if(t<tu)return p.rest+(20-p.rest)*(t-t0)/p.up;if(t<tu+15)return 20-(20-p.plat)*(t-tu)/15;const pe=t0+p.apd*0.7;if(t<pe)return p.plat-8*(t-tu-15)/(pe-tu-15);const re=t0+p.apd;if(t<re)return (p.plat-8)+(p.rest-(p.plat-8))*((t-pe)/(re-pe));return p.rest}
 function node(p,T){const pts=[];let v=p.mdp,t=0,ph=4;while(t<=T){pts.push([t,v]);if(ph===4){v+=p.slope*2;if(v>=p.thr)ph=0}else if(ph===0){v+=p.up*10;if(v>=p.amp)ph=3}else{v-=1.2*2;if(v<=p.mdp){v=p.mdp;ph=4}}t+=2}return pts}
 function drawAP(k){const svg=$("#ap");svg.innerHTML="";const b=APD.base,d=APD[k];
  const P1=plot(svg,{w:520,h:180,x0:0,x1:450,y0:-100,y1:30,xt:[0,100,200,300,400],yt:[-90,-50,0],yl:"mV",clear:false,mb:26});
  P1.text(300,15,"Ventricular myocyte",{"font-size":"11"});
  P1.line(range(0,450,450).map(t=>[t,vent(b[1],t)]),{stroke:"var(--muted)","stroke-dasharray":"5 4","stroke-width":1.6});
  if(d[1])P1.line(range(0,450,450).map(t=>[t,vent(d[1],t)]),{stroke:"var(--abp)"});
  const P2=plot(svg,{w:520,h:180,x0:0,x1:1200,y0:-75,y1:20,xt:[0,400,800,1200],yt:[-60,-40,0],yl:"mV",xl:"Time (ms)",clear:false,yOff:180,mt:8});
  P2.text(800,12,"SA node",{"font-size":"11"});
  P2.line(node(b[2],1200),{stroke:"var(--muted)","stroke-dasharray":"5 4","stroke-width":1.6});
  if(d[2])P2.line(node(d[2],1200),{stroke:"var(--spo2)"});
  const txt={base:"Baseline: ventricular phases 0–4 (top) and SA node pacemaker potential (bottom). Choose a class.",ia:"Ia: slower phase 0 (moderate Na⁺ block) and longer APD (K⁺ block): ↑ QRS and QT. Quinidine, procainamide.",ib:"Ib: minimal phase 0 change in normal tissue, shorter APD; binds inactivated channels in ischaemic, depolarised tissue. Lidocaine.",ic:"Ic: marked slowing of phase 0 (slow dissociation), APD barely changed: ↑↑ QRS. Flecainide.",ii:"II: β-blockade flattens SA node phase 4 (↓ If and I_CaL): slower rate; slows AV conduction (↑ PR).",iii:"III: K⁺ block prolongs phase 3 and the refractory period: ↑ QT (torsades risk). Amiodarone, sotalol.",iv:"IV: L-type Ca²⁺ block slows the nodal upstroke (phase 0 is Ca²⁺-dependent in nodes) and phase 4: slower SA rate, AV block.",ade:"Adenosine: A1 → K_ACh opens: hyperpolarised MDP and flatter phase 4; transient AV block.",dig:"Digoxin: vagal effect hyperpolarises and slows nodal tissue; in myocytes it shortens APD slightly and raises resting potential (toxicity: DADs).",ivab:"Ivabradine: blocks HCN (If, the 'funny' current) and flattens phase 4 only: slows HR without negative inotropy."};
  $("#ap-r").innerHTML=`${txt[k]} Dashed lines are baseline.`}
 seg($("#ap-sel"),Object.entries(APD).map(([k,v])=>[k,v[0].replace(" (β-blocker)","").replace(" (verapamil)","").replace(" (vagal)","").replace(" (class 0)","")]),drawAP,"iii");

 /* 3. Nephron */
 function drawNE(k){const svg=$("#ne");svg.innerHTML="";const add=mk(svg);const [nm,segs,txt]=DIUR[k];const on=segs.split(",");
  add("circle",{cx:50,cy:80,r:18,fill:"none",stroke:"var(--muted)","stroke-width":2});add("text",{x:50,y:50,"text-anchor":"middle",class:"lbl","font-size":"10"},"Glomerulus");
  const lab={pct:["PCT 65%",115,50],dl:["Desc. limb",120,190],tal:["TAL 25%",215,190],dct:["DCT 5–7%",250,60],cd:["CD 2–3%",345,180]};
  Object.entries(NEPH).forEach(([s,pts])=>{const act=on.includes(s);add("path",{d:pts.map((p,i)=>(i?"L":"M")+p[0]+" "+p[1]).join(" "),fill:"none",stroke:act?"var(--bad)":"var(--muted)","stroke-width":act?9:5,"stroke-linecap":"round","stroke-linejoin":"round"});add("text",{x:lab[s][1],y:lab[s][2],class:"lbl","font-size":"11",fill:act?"var(--bad)":"var(--ink)"},lab[s][0])});
  add("path",{d:"M170 250 Q185 285 200 250",fill:"none",stroke:"var(--muted)","stroke-width":5});add("text",{x:370,y:270,class:"lbl","font-size":"10"},"→ urine");
  add("text",{x:380,y:40,class:"lbl"},"% of filtered Na⁺");add("text",{x:380,y:56,class:"lbl"},"reabsorbed by segment");
  $("#ne-r").innerHTML=`<b>${nm}.</b> ${txt}`}
 seg($("#ne-sel"),Object.entries(DIUR).map(([k,v])=>[k,v[0].split(" (")[0]]),drawNE,"loop");

 /* 4. Apfel */
 const AF=["Female sex","Non-smoker","History of PONV or motion sickness","Postoperative opioids"];const RISK=[10,21,39,61,79];
 const box=$("#pv-box");box.innerHTML="";AF.forEach((f,i)=>{const l=el("label",{style:"display:flex;flex-direction:row;align-items:center;gap:6px"},`<input type="checkbox" id="pv-${i}" ${i<2?"checked":""}> ${f}`);box.append(l)});
 function drawPV(){const n=AF.filter((_,i)=>$("#pv-"+i).checked).length;const svg=$("#pv");svg.innerHTML="";const add=mk(svg);
  RISK.forEach((r,i)=>{const x=90+i*160,h=r*2.2;add("rect",{x,y:210-h,width:90,height:h,fill:i===n?"var(--nibp)":"var(--muted)","fill-opacity":i===n?0.9:0.35});add("text",{x:x+45,y:205-h,"text-anchor":"middle",class:"lbl"},r+"%");add("text",{x:x+45,y:230,"text-anchor":"middle",class:"lbl"},i+" factor"+(i===1?"":"s"))});
  const agents=n<=0?"None routinely (consider 1 if other factors such as laparoscopic or gynaecological surgery)":n===1?"1–2 agents":n===2?"2 agents (e.g. dexamethasone + ondansetron)":"3–4 agents from different classes + TIVA and opioid-sparing";
  $("#pv-r").innerHTML=`Apfel score <b>${n}</b>: predicted PONV risk ~<b>${RISK[n]}%</b>. Suggested prophylaxis: ${agents}. Each agent reduces relative risk by ~25–30%. Rescue with a different class.`}
 AF.forEach((_,i)=>$("#pv-"+i).onchange=drawPV);drawPV();

 /* 5. Timeline */
 let tlK="apx",tlR="low";
 function drawTL(){const c=+$("#tl-c").value;out("tl-c",c);const p=acPlan(tlK,tlR,c);const svg=$("#tl");svg.innerHTML="";const add=mk(svg);
  const X=h=>450+h/24*55;/* hours relative to surgery; 55 px/day */
  for(let d=-7;d<=4;d++){const x=X(d*24);add("line",{x1:x,x2:x,y1:40,y2:160,class:"gr"});add("text",{x,y:178,"text-anchor":"middle",class:"lbl","font-size":"11"},d===0?"Surgery":(d>0?"+":"")+d+"d")}
  add("line",{x1:X(-168),x2:X(96),y1:100,y2:100,stroke:"var(--muted)"});
  if(p.stop>0){add("rect",{x:X(-p.stop),y:84,width:X(0)-X(-p.stop),height:32,fill:"var(--warn)","fill-opacity":0.35});add("text",{x:(X(-p.stop)+X(0))/2,y:104,"text-anchor":"middle",class:"lbl","font-size":"11"},"off drug "+(p.stop>=24?(p.stop/24).toFixed(p.stop%24?1:0)+" d":p.stop+" h"))}
  add("line",{x1:X(0),x2:X(0),y1:30,y2:160,stroke:"var(--bad)","stroke-width":2});
  if(p.neur>0){add("line",{x1:X(-p.neur),x2:X(-p.neur),y1:44,y2:84,stroke:"var(--spo2)","stroke-width":2});add("text",{x:X(-p.neur)+4,y:56,class:"lbl","font-size":"11",fill:"var(--spo2)"},"last dose for neuraxial ≥ "+p.neur+" h")}
  if(p.restart>0){add("rect",{x:X(p.restart),y:84,width:Math.max(0,X(96)-X(p.restart)),height:32,fill:"var(--good)","fill-opacity":0.3});add("text",{x:X(p.restart)+4,y:134,class:"lbl","font-size":"11",fill:"var(--good)"},"restart ≥ "+p.restart+" h")}
  $("#tl-r").innerHTML=`<b>${AC[tlK][0]}</b>, ${tlR} bleeding risk${tlK==="dab"?", CrCl "+c:""}. ${p.note}`}
 seg($("#tl-sel"),Object.entries(AC).map(([k,v])=>[k,v[0]]),k=>{tlK=k;drawTL()},"apx");seg($("#tl-risk"),[["low","Low/moderate bleed risk"],["high","High bleed risk"]],k=>{tlR=k;drawTL()},"low");$("#tl-c").oninput=drawTL;

 /* 6. Antibiotic PK/PD */
 let abK="bl",abReg="int",abRen="norm";
 function drawAB(){const mic=+$("#ab-m").value;out("ab-m",mic);const [nm,vdk,t12,dose,tau,kind]=ABX[abK];const Vd=vdk*70;const ren={arc:0.6,norm:1,aki:3}[abRen];const k=0.693/(t12*ren);
  let infD=abK==="gen"?0.5:abReg==="ext"?4:abReg==="cont"?tau:0.5;if(abK==="gen")infD=0.5;
  const T=48,dt=0.01;let A=0;const pts=[];let above=0,auc=0,cmax=0,ctr=0;
  for(let i=0,t=0;t<=T+1e-9;i++,t=i*dt){const tin=t%tau;const rate=(abReg==="cont"&&abK!=="gen")?dose/tau:(tin<infD?dose/infD:0);const ld=(abReg==="cont"&&abK!=="gen"&&t<0.5)?dose/0.5:0;A+=(rate+ld-k*A)*dt;const C=A/Vd;if(i%10===0)pts.push([t,C]);if(t>=24){if(C>mic)above+=dt;auc+=C*dt;if(C>cmax)cmax=C}if(Math.abs(t-T)<dt)ctr=C}
  const ymax=Math.max(mic*1.3,...pts.map(p=>p[1]))*1.1;
  const P=plot($("#ab"),{w:900,h:300,x0:0,x1:T,y0:0,y1:ymax,xt:[0,6,12,18,24,30,36,42,48],yt:[0,ymax/4,ymax/2,ymax*3/4].map(v=>+v.toPrecision(2)),xl:"Time (h)",yl:"Concentration mg/L"});
  P.add("rect",{x:P.X(24),y:P.Y(ymax),width:P.X(48)-P.X(24),height:P.Y(0)-P.Y(ymax),fill:"var(--muted)","fill-opacity":0.06});
  P.line(pts,{stroke:"var(--spo2)"});P.add("line",{x1:P.X(0),x2:P.X(T),y1:P.Y(mic),y2:P.Y(mic),stroke:"var(--bad)","stroke-dasharray":"6 4"});P.text(1,mic+ymax*0.03,"MIC "+mic,{fill:"var(--bad)","font-size":"11"});
  let txt;const f=above/24*100;
  if(kind==="time")txt=`fT&gt;MIC over day 2: <b>${f.toFixed(0)}%</b> (target ≥ 50% for piperacillin; 100% in critical illness). ${f>=100?"Target met.":f>=50?"Adequate for non-critically ill.":"Under-exposed: use extended or continuous infusion, higher dose or shorter interval."}`;
  else if(kind==="conc")txt=`Cmax <b>${cmax.toFixed(1)} mg/L</b>, Cmax/MIC <b>${(cmax/mic).toFixed(1)}</b> (target ≥ 8–10); trough ${ctr.toFixed(2)} mg/L (target &lt; 1 to limit toxicity). ${cmax/mic>=8?"Target met.":"Inadequate peak: organism likely resistant at this MIC."}`;
  else txt=`AUC24 (day 2) <b>${auc.toFixed(0)} mg·h/L</b>, AUC/MIC <b>${(auc/mic).toFixed(0)}</b> (target 400–600 for MIC 1). Trough ${ctr.toFixed(1)} mg/L. ${auc/mic<400?"Under target: increase dose.":auc/mic>600?"Above target: nephrotoxicity risk.":"Within target."}`;
  $("#ab-r").innerHTML=`<b>${nm}</b>, Vd ${Vd.toFixed(0)} L, t½ ${(t12*ren).toFixed(1)} h (${{arc:"augmented renal clearance",norm:"normal",aki:"AKI"}[abRen]}). `+txt+` Day 2 is shaded.`}
 seg($("#ab-sel"),[["bl","Piperacillin 4 g 8-hourly"],["gen","Gentamicin 5 mg/kg daily"],["van","Vancomycin 1 g 12-hourly"]],k=>{abK=k;drawAB()},"bl");
 seg($("#ab-reg"),[["int","30-min infusion"],["ext","Extended 4 h"],["cont","Continuous"]],k=>{abReg=k;drawAB()},"int");
 seg($("#ab-ren"),[["arc","ARC"],["norm","Normal"],["aki","AKI"]],k=>{abRen=k;drawAB()},"norm");$("#ab-m").oninput=drawAB;
}

ATLAS.register({id:"09",name:"CVS & other drugs",
  lede:"Sympathomimetics, inotropes, antihypertensives, vasodilators, antiarrhythmics, diuretics, antithrombotics, antiemetics, diabetes drugs, steroids, antibiotics, anticonvulsants, psychiatric and respiratory drugs.",
  barsNote:"",
  bars:BARS,fam:FAM,slides:SLIDES,calcs:CALCS,tables:TABLES,cards:CARDS,fcf:FCF,viva:VIVA,quiz:QUIZ,crisis:CRISIS,
  sources:SRC,errata:ERR,refs:REFS,diagHTML:DIAG,initDiagrams,
  diagLede:"Six live diagrams: vasoactive receptor profiles, action potentials with antiarrhythmic classes, diuretic sites on the nephron, Apfel PONV risk, an antithrombotic stop/restart timeline and an antibiotic PK/PD simulator."});
})();
