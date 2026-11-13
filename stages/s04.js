/* Stage 04 · Renal, fluids, acid–base */
(function(){
const {plot,range,el,SVGNS,fmt,$,$$,seg}=ATLAS.h;

const BARS=[];

const FAM={fluid:["spo2","Fluids"],lyte:["ecg","Electrolytes"],ab:["etco2","Acid–base"],kid:["nibp","Kidney"],app:["abp","Applied"]};

const SLIDES=[
{f:"fluid",t:"Body fluid compartments",b:`<ul class="clean"><li><b>Total body water</b> ≈ 60% of body weight in adult men (42 L in 70 kg), 50–55% in women, 45–50% in the elderly, 75–80% in term neonates. Fat holds little water, so TBW per kg falls with obesity.</li>
<li><b>ICF</b> ≈ 2/3 of TBW (40% of body weight, 28 L). <b>ECF</b> ≈ 1/3 (20%, 14 L): interstitial ≈ 3/4 (10.5 L), plasma ≈ 1/4 (3.5 L), plus transcellular fluid (CSF, GI, pleural, synovial, ~1–2 L).</li>
<li>Blood volume ≈ 70 mL/kg (men), 65 (women), 80 (children), 85–90 (neonates).</li>
<li><b>Measurement by indicator dilution</b> (V = amount given / concentration after mixing, corrected for loss): TBW with deuterium or tritium oxide; ECF with inulin, mannitol, bromide, ²⁴Na; plasma with Evans blue or ¹²⁵I-albumin; red cell volume with ⁵¹Cr-labelled cells. ICF and interstitial volume are calculated by difference.</li>
<li>Water moves freely across cell membranes, so ICF and ECF are always at the same osmolality. ECF tonicity therefore decides ICF volume.</li></ul>
<div class="tbl"><table><tr><th>mmol/L</th><th>ECF (plasma)</th><th>ICF</th></tr><tr><td>Na⁺</td><td>140</td><td>10–15</td></tr><tr><td>K⁺</td><td>4–5</td><td>140–150</td></tr><tr><td>Cl⁻</td><td>100–105</td><td>5–10</td></tr><tr><td>HCO3⁻</td><td>24</td><td>10</td></tr><tr><td>Ca²⁺ (ionised)</td><td>1.1–1.3</td><td>~0.0001</td></tr><tr><td>Mg²⁺</td><td>0.8–1.0</td><td>~15 (mostly bound)</td></tr><tr><td>Main anions</td><td>Cl⁻, HCO3⁻, albumin</td><td>Proteins, organic phosphates</td></tr></table></div>`,
p:"The Na⁺/K⁺-ATPase is what keeps Na⁺ effectively outside the cell, which is why Na⁺ and its anions define ECF volume and K⁺ defines ICF.",
v:"Draw the 60–40–20 rule as a stacked bar for a 70 kg man, then show where 1 L of saline, dextrose and albumin end up. The Diagrams tab does this live."},
{f:"fluid",t:"Osmolality, tonicity and osmotic pressure",b:`<ul class="clean"><li><b>Osmolarity</b>: osmoles per litre of solution. <b>Osmolality</b>: osmoles per kg of solvent (measured by freezing-point depression). Plasma 285–295 mOsm/kg.</li>
<li>Calculated osmolality ≈ 2[Na⁺] + [glucose] + [urea]. <b>Osmolar gap</b> = measured − calculated (normal &lt; 10): raised by ethanol, methanol, ethylene glycol, mannitol, glycine, sorbitol.</li>
<li><b>Tonicity</b> (effective osmolality) counts only solutes that do not cross membranes. Urea crosses cells, so it adds to osmolality but not tonicity. Glucose is effective when insulin is lacking.</li>
<li><b>Osmotic pressure</b> (van 't Hoff): π = n·C·R·T (× reflection coefficient). 1 mOsm/kg ≈ 19.3 mmHg at 37 °C, so plasma (290 mOsm) has a total osmotic pressure of ≈ 5600 mmHg, of which proteins provide only ≈ 25 mmHg (<b>oncotic</b> or colloid osmotic pressure).</li>
<li>Colligative properties (depend on the number of particles): osmotic pressure, freezing-point depression (1 osmol/kg lowers it by 1.86 °C), boiling-point elevation, vapour pressure reduction (Raoult).</li></ul>`,
p:"Gibbs–Donnan effect: trapped negatively charged plasma proteins hold extra cations in plasma, so plasma oncotic pressure is ~50% higher than predicted from protein alone.",
v:"Define the four terms precisely (asked in EDAIC as 'osmolality vs osmolarity, tonicity, how to measure, plasma osmolality equation')."},
{f:"fluid",t:"Intravenous fluids",b:`<ul class="clean"><li><b>Crystalloids</b> distribute by tonicity. 1 L of 0.9% saline expands plasma by ~250 mL at equilibrium (ECF-wide); 1 L of 5% dextrose by only ~80 mL (TBW-wide, once glucose is metabolised). Early after infusion, more stays intravascular in hypovolaemia and under anaesthesia (context-sensitive volume effect).</li>
<li><b>0.9% saline</b>: Na⁺ and Cl⁻ 154 mmol/L, SID 0 → hyperchloraemic metabolic acidosis, renal vasoconstriction (Cl⁻-mediated tubuloglomerular feedback), slower diuresis.</li>
<li><b>Balanced solutions</b> (Hartmann's, Plasma-Lyte): lower Cl⁻ and a metabolisable anion (lactate, acetate, gluconate) that raises the effective SID. Large ICU trials (SMART, BaSICS, PLUS) show at most a small benefit overall, possibly greater in sepsis; saline may be better in traumatic brain injury (hypotonic balanced fluids can raise ICP).</li>
<li><b>Colloids</b>: 4.5% and 20% human albumin (SAFE: equivalent to saline overall, worse in TBI; useful in cirrhosis, large-volume paracentesis, hypoalbuminaemic sepsis). Gelatins (anaphylaxis ~1:13 000). Hydroxyethyl starches: AKI and death in sepsis; marketing authorisations suspended in the EU in 2022.</li>
<li><b>NICE maintenance (adult)</b>: water 25–30 mL/kg/day, Na⁺, K⁺, Cl⁻ ~1 mmol/kg/day each, glucose 50–100 g/day. Children: 4-2-1 rule (Holliday–Segar), isotonic fluid.</li></ul>`,
p:"Glycocalyx: when intact, colloids stay in the circulation longer than crystalloids; in sepsis or after hypervolaemia the glycocalyx is shed and the advantage shrinks (Stage 2, Starling forces).",
v:"For any fluid question give composition, distribution, effect on acid–base (SID), side effects, and evidence. Composition table in the Classify tab."},
{f:"fluid",t:"Control of water and sodium",b:`<ul class="clean"><li><b>Osmoreceptors</b> in the OVLT and subfornical organ (outside the BBB) sense a 1–2% rise in tonicity → thirst and <b>ADH</b> (vasopressin, nonapeptide made in supraoptic and paraventricular nuclei, released from the posterior pituitary). Threshold ~280–285 mOsm/kg.</li>
<li>ADH also rises with &gt; 10% fall in volume or pressure (baroreceptors), pain, nausea, stress, surgery, opioids, positive pressure ventilation, angiotensin II. Volume overrides tonicity.</li>
<li><b>V2</b> (collecting duct, Gs → cAMP) inserts aquaporin-2 into the apical membrane and increases urea permeability. <b>V1</b> (vascular, Gq) vasoconstricts. V3 (pituitary ACTH). Urine 50–1200 mOsm/kg.</li>
<li><b>Sodium (volume) control</b>: renin from juxtaglomerular cells (low perfusion pressure, sympathetic β1, low NaCl at macula densa) → angiotensin II (vasoconstriction, efferent constriction, PCT Na⁺ uptake, thirst, ADH, aldosterone) → aldosterone (ENaC and Na⁺/K⁺-ATPase in collecting duct: Na⁺ retention, K⁺ and H⁺ loss). <b>ANP/BNP</b> oppose (natriuresis, afferent dilatation).</li></ul>
<div class="tbl"><table><tr><th></th><th>Diabetes insipidus</th><th>SIADH</th><th>Cerebral salt wasting</th></tr><tr><td>Plasma Na⁺</td><td>↑</td><td>↓</td><td>↓</td></tr><tr><td>Volume</td><td>↓ (if access to water limited)</td><td>Euvolaemic</td><td>Hypovolaemic</td></tr><tr><td>Urine</td><td>Large volume, dilute (&lt; 300 mOsm)</td><td>Inappropriately concentrated, Na⁺ &gt; 30</td><td>Concentrated, high Na⁺ and volume</td></tr><tr><td>Treatment</td><td>Desmopressin (central); thiazide (nephrogenic)</td><td>Fluid restriction, treat cause, tolvaptan, hypertonic saline if severe</td><td>Replace Na⁺ and volume, fludrocortisone</td></tr></table></div>`,
p:"Perioperative hyponatraemia: surgery and pain raise ADH, so giving hypotonic fluid (4%/0.18%, 5% dextrose) after surgery, especially to children, can cause dangerous hyponatraemia.",
v:"Sensor → integrator → effector for water (osmoreceptors, hypothalamus, ADH and thirst), then for sodium (baroreceptors and JGA, RAAS, ANP). Then DI vs SIADH."},
{f:"lyte",t:"Sodium disorders",b:`<p><b>Hyponatraemia</b> (&lt; 135; severe &lt; 125): first check tonicity (pseudohyponatraemia with high lipids or protein; hypertonic with hyperglycaemia, mannitol, glycine). Then volume status:</p>
<ul class="clean"><li>Hypovolaemic: GI or renal losses, diuretics, Addison's, cerebral salt wasting.</li><li>Euvolaemic: SIADH (lung, CNS, drugs: SSRIs, carbamazepine, opioids), hypothyroidism, glucocorticoid deficiency, water intoxication, postoperative.</li><li>Hypervolaemic: heart failure, cirrhosis, nephrotic syndrome, renal failure.</li></ul>
<p><b>Acute symptomatic</b> (confusion, seizures, coma; brain oedema): 3% saline 150 mL over 20 min, repeat up to 2–3 times until Na⁺ rises ~5 mmol/L or symptoms improve. <b>Chronic</b> (&gt; 48 h): limit correction to <b>≤ 10 mmol/L in 24 h</b> (≤ 8 if high risk: alcohol, malnutrition, hypokalaemia, liver disease) to avoid <b>osmotic demyelination</b>.</p>
<p><b>TURP syndrome</b>: absorption of 1.5% glycine (≈ 200 mOsm/L, hypotonic) through prostatic venous sinuses: fluid overload, hyponatraemia, hypo-osmolality; glycine toxicity (visual disturbance, transient blindness, encephalopathy) and ammonia. Risk factors: long resection (&gt; 60 min), high irrigation bag (&gt; 60 cm), large gland, open sinuses. Bipolar resection with saline reduces risk.</p>
<p><b>Hypernatraemia</b>: water loss (DI, insensible, osmotic diuresis), Na⁺ gain (hypertonic saline, bicarbonate). Free water deficit = TBW × (Na⁺/140 − 1); correct chronic cases at ≤ 10 mmol/L/day.</p>`,
p:"Spinal anaesthesia is preferred for TURP partly because an awake patient reports early TURP syndrome (confusion, nausea, visual change).",
v:"Classify by tonicity and volume, then management of acute vs chronic with rates. The Formulas tab has the Adrogué–Madias calculator."},
{f:"lyte",t:"Potassium",b:`<ul class="clean"><li>Total body K⁺ ≈ 3500 mmol, 98% intracellular. Plasma 3.5–5.0 mmol/L. Daily intake ~1 mmol/kg; 90% excreted renally.</li>
<li><b>Internal balance</b> (shifts into cells): insulin, β2 agonists (Na⁺/K⁺-ATPase), alkalosis, aldosterone. Out of cells: acidosis (especially mineral acids), hyperosmolality, cell lysis, suxamethonium, digoxin toxicity, β-blockade, exercise.</li>
<li><b>Renal handling</b>: 65% reabsorbed in PCT, 25% in the thick ascending limb; final control by secretion in the principal cells of the collecting duct (ROMK), driven by aldosterone, distal Na⁺ delivery and tubular flow. Intercalated cells reabsorb K⁺ in depletion.</li>
<li><b>Hyperkalaemia</b>: renal failure, ACE inhibitors/ARBs, spironolactone, NSAIDs, trimethoprim, rhabdomyolysis, tumour lysis, haemolysis, massive transfusion, suxamethonium with up-regulated receptors, malignant hyperthermia. Severe ≥ 6.5 mmol/L or with ECG changes.</li>
<li><b>Hypokalaemia</b>: diuretics, vomiting (with renal loss from metabolic alkalosis and hyperaldosteronism), diarrhoea, insulin, β2 agonists, hypomagnesaemia, Conn's. Arrhythmias, potentiation of NMB, ileus, polyuria. Replace up to 10–20 mmol/h peripherally (40 mmol/h centrally with ECG monitoring); correct Mg²⁺ first.</li></ul>`,
p:"Elective surgery is usually deferred if K⁺ > 6.0 or < 3.0 mmol/L. For emergencies, correct towards safe limits and monitor the ECG.",
v:"Distribution, internal and external balance, then causes and management of each extreme. ECG changes are in Stage 2."},
{f:"lyte",t:"Calcium, magnesium and phosphate",b:`<ul class="clean"><li><b>Calcium</b>: total 2.2–2.6 mmol/L; ~45% ionised (1.1–1.3, the active form), 45% albumin-bound, 10% complexed. Alkalosis increases binding (lower ionised Ca²⁺: tetany with hyperventilation). Corrected Ca = total + 0.02 × (40 − albumin g/L).</li>
<li>Control: <b>PTH</b> (bone resorption, distal tubular Ca²⁺ reabsorption, phosphate excretion, 1α-hydroxylation of vitamin D), <b>calcitriol</b> (gut absorption), calcitonin (minor).</li>
<li>Hypocalcaemia: citrate in massive transfusion, post-thyroid/parathyroid surgery, pancreatitis, rhabdomyolysis, hypomagnesaemia. Signs: perioral tingling, Chvostek, Trousseau, laryngospasm, long QT, hypotension, poor clotting. Treat with calcium chloride 10% (6.8 mmol Ca²⁺ per 10 mL) or gluconate 10% (2.2 mmol per 10 mL).</li>
<li><b>Magnesium</b> 0.7–1.0 mmol/L: cofactor for ATPases; physiological Ca²⁺ blocker and NMDA antagonist. Low: arrhythmias (torsades), seizures, hypokalaemia and hypocalcaemia that resist treatment. High (&gt; 2.5 in pre-eclampsia therapy at 2–4 target): loss of reflexes (~5), respiratory depression (~6–7), cardiac arrest (&gt; 7.5); potentiates NMB.</li>
<li><b>Phosphate</b> 0.8–1.5 mmol/L: ATP, 2,3-DPG, buffer. Hypophosphataemia in refeeding, DKA treatment, alcoholism: muscle weakness (weaning failure, diaphragm), left-shifted ODC, haemolysis.</li></ul>`,
p:"Refeeding syndrome: insulin surge drives phosphate, K⁺ and Mg²⁺ into cells. Start nutrition slowly in malnourished patients and supplement thiamine and phosphate.",
v:"For each ion: normal range, distribution, control, causes of high/low, clinical features, treatment."},
{f:"ab",t:"pH, buffers and the Henderson–Hasselbalch equation",b:`<ul class="clean"><li>pH = −log10[H⁺]. Normal arterial [H⁺] 35–45 nmol/L (pH 7.35–7.45). From pH 7.2 to 7.6 [H⁺] ≈ 80 − (decimal part × 100) nmol/L (pH 7.30 ≈ 50 nmol/L).</li>
<li>Daily acid load: ~15 000 mmol volatile acid (CO2) excreted by the lungs; ~1 mmol/kg/day fixed acid (sulphuric, phosphoric) excreted by the kidneys.</li>
<li><b>Buffer</b>: weak acid plus conjugate base; best within ±1 of its pKa. <b>Henderson–Hasselbalch</b>: pH = pKa + log([A⁻]/[HA]).</li>
<li><b>Bicarbonate system</b>: pH = 6.1 + log([HCO3⁻] / (0.23 × PaCO2 kPa)). Normal 24 / (0.23 × 5.3) = 20:1 → pH 7.40. Its pKa is far from 7.4, but it is an <b>open system</b>: lungs adjust CO2 and kidneys adjust HCO3⁻, so it is the most important ECF buffer.</li>
<li><b>Haemoglobin</b> (histidine imidazole groups, pKa ~6.8; deoxy-Hb buffers better: Haldane), plasma proteins, phosphate (pKa 6.8: intracellular and urine), bone carbonate (chronic acidosis), ammonia (urine, pKa 9.2).</li>
<li><b>Isohydric principle</b>: all buffer pairs in a solution are in equilibrium with the same [H⁺], so measuring one (bicarbonate) reflects all.</li></ul>`,
p:"Local anaesthetics work poorly in infected tissue: at pH ~6.5 a base with pKa 8 is > 97% ionised and cannot cross the nerve membrane.",
v:"Write and derive the equation from the law of mass action, then apply it to the bicarbonate system with numbers."},
{f:"ab",t:"Interpreting a blood gas",b:`<ol class="clean" style="padding-left:1.3em"><li><b>Oxygenation</b>: PaO2 against FiO2 (P/F ratio, A–a gradient: Stage 1).</li>
<li><b>pH</b>: acidaemia (&lt; 7.35) or alkalaemia (&gt; 7.45).</li>
<li><b>Primary process</b>: does PaCO2 or HCO3⁻ explain the pH?</li>
<li><b>Compensation</b> (it never overcorrects):
<ul class="clean"><li>Metabolic acidosis: expected PaCO2 (kPa) = (1.5 × HCO3⁻ + 8) / 7.5 ± 0.3 (Winter's).</li><li>Metabolic alkalosis: PaCO2 rises ~0.1 kPa per 1 mmol/L HCO3⁻ rise (rarely above 7.5 kPa).</li><li>Respiratory acidosis: HCO3⁻ rises 1 per 1.33 kPa (acute) or 4 per 1.33 kPa (chronic, 3–5 days).</li><li>Respiratory alkalosis: HCO3⁻ falls 2 per 1.33 kPa (acute) or 5 per 1.33 kPa (chronic).</li></ul></li>
<li><b>Anion gap</b> = Na⁺ − (Cl⁻ + HCO3⁻), normal ~8–12 (lab-dependent; add 4 if K⁺ included). Correct for albumin: + 0.25 × (40 − albumin g/L).</li>
<li><b>Delta ratio</b> = ΔAG / ΔHCO3⁻: &lt; 0.4 pure normal-gap acidosis; 0.4–0.8 mixed; 1–2 pure high-gap; &gt; 2 high-gap plus metabolic alkalosis (or chronic respiratory acidosis).</li>
<li>Other values: lactate, glucose, K⁺, Na⁺, Cl⁻, Hb, COHb, MetHb; then the clinical story.</li></ol>`,
p:"Base excess is the acid or base needed to return 1 L of blood to pH 7.40 at PaCO2 5.3 kPa and 37 °C. Standard base excess uses an Hb of 50 g/L to represent the whole ECF. Normal ±2 mmol/L.",
v:"Always follow the same order aloud. The Formulas tab interprets any gas you enter and shows the expected compensation."},
{f:"ab",t:"Metabolic acidosis and alkalosis",b:`<div class="tbl"><table><tr><th>High anion gap (added acid)</th><th>Normal anion gap (HCO3⁻ loss or Cl⁻ gain)</th></tr>
<tr><td>Lactate: type A (hypoperfusion, hypoxia), type B (metformin, liver failure, adrenaline, β2 agonists, propofol infusion syndrome, cyanide, thiamine deficiency, malignancy)<br>Ketones: DKA, alcohol, starvation, SGLT2 inhibitors (euglycaemic DKA)<br>Renal failure (sulphate, phosphate)<br>Toxins: methanol, ethylene glycol, salicylate, paracetamol (5-oxoproline), iron, isoniazid</td>
<td>Excess 0.9% saline (hyperchloraemic)<br>GI loss: diarrhoea, ileostomy, pancreatic fistula, ureteric diversion<br>Renal tubular acidosis<br>Carbonic anhydrase inhibitors (acetazolamide)<br>Addison's disease<br>Recovery phase of DKA</td></tr></table></div>
<p><b>Effects of acidaemia</b>: reduced myocardial contractility and catecholamine response, arrhythmias, vasodilatation (but pulmonary vasoconstriction), right-shifted ODC, hyperkalaemia, insulin resistance, Kussmaul breathing.</p>
<p><b>Metabolic alkalosis</b>: H⁺ loss (vomiting, NG drainage), diuretics, hyperaldosteronism, hypokalaemia, citrate from massive transfusion, bicarbonate, post-hypercapnia. Classify as chloride-responsive (urine Cl⁻ &lt; 20: vomiting, diuretics after stopping) or chloride-resistant (mineralocorticoid excess). Effects: hypoventilation, left-shifted ODC, low ionised Ca²⁺, hypokalaemia, arrhythmias.</p>`,
p:"Bicarbonate therapy is reserved for severe normal-gap acidosis, hyperkalaemia, TCA overdose and some pH < 7.1–7.2 cases with AKI. It generates CO2, so ventilation must rise to match.",
v:"Classify by anion gap with mechanisms, then the systemic effects, then treatment of the cause."},
{f:"ab",t:"The Stewart (physicochemical) approach",b:`<p>pH is a dependent variable set by three independent variables:</p>
<ul class="clean"><li><b>PaCO2</b> (lungs).</li>
<li><b>Strong ion difference (SID)</b>: fully dissociated cations minus anions. Apparent SID = (Na⁺ + K⁺ + Ca²⁺ + Mg²⁺) − (Cl⁻ + lactate) ≈ 40–42 mEq/L. A fall in SID (more Cl⁻, lactate, ketones, or less Na⁺) makes the solution dissociate more water → more H⁺: acidosis.</li>
<li><b>Total weak acids (A<sub>TOT</sub>)</b>: mainly albumin and phosphate. Low albumin causes metabolic alkalosis; high phosphate causes acidosis.</li></ul>
<p>Effective SID = HCO3⁻ + A⁻ (albumin and phosphate charge). <b>Strong ion gap</b> = SIDa − SIDe: unmeasured anions (normally ~0–2).</p>
<p>Applications: 0.9% saline (SID 0) lowers plasma SID → acidosis. Hartmann's and Plasma-Lyte have effective SIDs of ~28 and ~50 once lactate, acetate and gluconate are metabolised. Hypoalbuminaemia hides a coexisting acidosis (normal pH with a large SIG).</p>
<p>Bicarbonate approach vs Stewart: both describe the same chemistry; Stewart explains mechanisms (Cl⁻, albumin) that the bicarbonate method labels only as "metabolic".</p>`,
p:"Plasma SID ≈ 40 mEq/L at pH 7.4. A balanced crystalloid is one whose effective SID roughly equals the plasma HCO3⁻ (~24–28), so infusing it barely changes pH.",
v:"Name the three independent variables, give the SID equation with numbers, explain saline acidosis and hypoalbuminaemic alkalosis. The Diagrams tab has a live Gamblegram."},
{f:"ab",t:"Renal regulation of acid–base",b:`<ul class="clean"><li><b>Bicarbonate reabsorption</b>: ~4300 mmol/day filtered; 80–85% reabsorbed in the PCT (Na⁺/H⁺ exchanger NHE3 secretes H⁺; luminal carbonic anhydrase IV converts H2CO3 to CO2 + H2O; CO2 enters the cell, is rehydrated by CA II, HCO3⁻ leaves basolaterally with Na⁺). 10–15% in the thick ascending limb, the rest distally.</li>
<li><b>New bicarbonate generation</b> (excreting the fixed acid load): each H⁺ excreted bound to a non-bicarbonate buffer creates one new HCO3⁻.<br>• <b>Titratable acid</b>, mostly phosphate (HPO4²⁻ + H⁺ → H2PO4⁻): ~30% of acid excretion, limited by filtered phosphate.<br>• <b>Ammonium</b>: glutamine metabolised in PCT cells to NH4⁺ and HCO3⁻; NH4⁺ excreted (recycled through the medulla). Rises several-fold over days in chronic acidosis: the main adaptive response.</li>
<li>Distal: α-intercalated cells secrete H⁺ (H⁺-ATPase, H⁺/K⁺-ATPase) and β-intercalated cells secrete HCO3⁻ (pendrin) in alkalosis. Aldosterone enhances H⁺ secretion.</li>
<li>Minimum urine pH ≈ 4.5.</li></ul>
<div class="tbl"><table><tr><th>RTA</th><th>Defect</th><th>K⁺</th><th>Urine pH</th></tr><tr><td>Type 1 (distal)</td><td>H⁺ secretion in collecting duct</td><td>↓</td><td>&gt; 5.5</td></tr><tr><td>Type 2 (proximal)</td><td>HCO3⁻ reabsorption in PCT (Fanconi)</td><td>↓</td><td>&lt; 5.5 once HCO3⁻ low</td></tr><tr><td>Type 4</td><td>Hypoaldosteronism or resistance</td><td>↑</td><td>&lt; 5.5</td></tr></table></div>`,
p:"Hypokalaemia drives H⁺ into cells and H⁺ secretion in the kidney: it both causes and maintains metabolic alkalosis.",
v:"Reabsorption (PCT, carbonic anhydrase) versus regeneration (titratable acid, ammonium), then distal cells, then RTA."},
{f:"kid",t:"Renal blood flow and autoregulation",b:`<ul class="clean"><li>RBF ≈ 1.1–1.2 L/min (20–25% of CO) for 1% of body weight; renal plasma flow ≈ 650 mL/min.</li>
<li>Distribution: cortex ~500 mL/100 g/min, outer medulla ~100, inner medulla ~20 ("rule of fives"). The medulla is relatively hypoxic (tissue PO2 ~1.3–2.7 kPa) because of countercurrent O2 shunting in the vasa recta and high O2 use by the thick ascending limb: hence vulnerable to ischaemia.</li>
<li>Renal O2 consumption is high but extraction is low (~10%) because flow far exceeds metabolic need; most O2 use is for Na⁺ reabsorption, so O2 demand falls when GFR falls.</li>
<li><b>Autoregulation</b> of RBF and GFR over MAP ~75–170 mmHg by (1) the <b>myogenic</b> response of the afferent arteriole (seconds) and (2) <b>tubuloglomerular feedback</b>: macula densa senses NaCl (via NKCC2) → adenosine (A1, afferent constriction) or, when NaCl is low, prostaglandins, NO and renin release.</li>
<li><b>Extrinsic control</b>: sympathetic (α1 afferent constriction, β1 renin), angiotensin II (efferent more than afferent: maintains GFR), prostaglandins (PGE2, PGI2: afferent dilatation, essential in hypovolaemia), ANP, NO, endothelin, adenosine, ADH.</li>
<li><b>Measurement</b>: PAH clearance (extraction ~90%) gives effective RPF; RBF = RPF / (1 − Hct).</li></ul>`,
p:"The 'triple whammy': ACE inhibitor (efferent dilatation) + NSAID (no afferent prostaglandin dilatation) + diuretic (hypovolaemia) removes every protective mechanism for GFR. Try it on the glomerular haemodynamics diagram.",
v:"Flow and distribution numbers, autoregulation range and mechanisms with diagram, extrinsic factors, measurement."},
{f:"kid",t:"Glomerular filtration",b:`<ul class="clean"><li>GFR ≈ 125 mL/min (180 L/day); filtration fraction ≈ 20% (125/650).</li>
<li><b>Filtration barrier</b>: fenestrated endothelium (70–100 nm pores) + glycocalyx, glomerular basement membrane (negatively charged heparan sulphate), podocyte slit diaphragms (nephrin). Freely filtered below ~2 nm radius (~7 kDa); albumin (3.6 nm, 69 kDa, negative) almost excluded; cations filtered more easily than anions of the same size.</li>
<li><b>Starling forces</b>: GFR = K<sub>f</sub>[(P<sub>GC</sub> − P<sub>BS</sub>) − (π<sub>GC</sub> − π<sub>BS</sub>)]. P<sub>GC</sub> ≈ 45–55 mmHg (high because the efferent arteriole adds resistance downstream), P<sub>BS</sub> ≈ 10, π<sub>GC</sub> rises from ~25 to ~35 along the capillary as protein concentrates; filtration can reach equilibrium near the efferent end.</li>
<li><b>Clearance</b> C = U·V / P. Inulin is the gold standard (freely filtered, not reabsorbed, secreted or metabolised). Creatinine slightly overestimates GFR (~10–20% secreted). Urea underestimates (~50% reabsorbed). Glucose clearance is zero below the threshold.</li>
<li><b>Estimates</b>: CKD-EPI (UK labs since NICE 2021, without ethnicity adjustment), Cockcroft–Gault (still used for drug dosing), cystatin C to confirm CKD in muscle extremes. Creatinine rises only after ~50% loss of GFR and lags by 24–48 h in AKI.</li></ul>`,
p:"Obstruction raises Bowman's space pressure and stops filtration; low plasma oncotic pressure (hypoalbuminaemia) increases filtration slightly; mesangial contraction (angiotensin II) lowers K<sub>f</sub>.",
v:"Barrier structure, Starling equation with numbers, how arteriolar tone changes GFR, clearance and its markers. Diagrams tab: glomerular haemodynamics."},
{f:"kid",t:"Tubular function and the countercurrent mechanism",b:`<div class="tbl"><table><tr><th>Segment</th><th>Key transport</th><th>% filtered Na⁺</th><th>Water</th></tr>
<tr><td>PCT</td><td>NHE3, SGLT2 (glucose), amino acids, phosphate, HCO3⁻ (CA), K⁺, urea; secretes organic acids, drugs, PAH</td><td>~65%</td><td>Iso-osmotic, AQP1</td></tr>
<tr><td>Thin descending limb</td><td>Passive</td><td>–</td><td>Permeable</td></tr>
<tr><td>Thin ascending limb</td><td>Passive NaCl exit</td><td>–</td><td>Impermeable</td></tr>
<tr><td>Thick ascending limb</td><td>NKCC2 (Na⁺, K⁺, 2Cl⁻), ROMK; paracellular Ca²⁺, Mg²⁺; secretes Tamm–Horsfall protein</td><td>~25%</td><td>Impermeable ("diluting segment")</td></tr>
<tr><td>DCT</td><td>NCC (Na⁺Cl⁻), Ca²⁺ reabsorption (PTH)</td><td>~5%</td><td>Impermeable</td></tr>
<tr><td>Collecting duct</td><td>Principal cells: ENaC, ROMK (aldosterone); intercalated: H⁺ or HCO3⁻; inner medulla: urea (UT-A1)</td><td>2–5%</td><td>ADH-dependent (AQP2)</td></tr></table></div>
<p><b>Countercurrent multiplier</b>: the thick ascending limb pumps NaCl out without water, creating a ~200 mOsm gradient at each level; flow down the descending limb and up the ascending limb multiplies this to ~1200–1400 mOsm/kg at the papilla. <b>Urea recycling</b> (ADH-dependent) provides ~half the inner medullary osmolality. The <b>vasa recta</b> are a countercurrent exchanger: slow hairpin flow removes reabsorbed water without washing out the gradient.</p>
<p>Fluid leaving the loop is hypotonic (~100 mOsm). With maximal ADH, urine reaches ~1200 mOsm/kg; without ADH it can be as dilute as ~50 mOsm/kg. Obligatory urine volume ≈ 600 mOsm daily solute ÷ 1200 = 0.5 L/day.</p>`,
p:"Glucose: renal threshold ~10–11 mmol/L, Tmax ~375 mg/min. SGLT2 inhibitors lower the threshold (glycosuria at normal glucose) and can cause euglycaemic ketoacidosis perioperatively: UK CPOC guidance omits them the day before and the day of surgery (FDA advises 3–4 days).",
v:"Draw the nephron with the transporters and the loop with osmolalities (Diagrams tab), then explain ADH's two actions (water and urea)."},
{f:"kid",t:"Diuretics: physiology by site",b:`<div class="tbl"><table><tr><th>Class</th><th>Site / target</th><th>Effects and side effects</th></tr>
<tr><td>Osmotic (mannitol)</td><td>PCT and loop (filtered, not reabsorbed)</td><td>Water diuresis, plasma expansion then dehydration; reduces ICP and IOP; hypernatraemia, osmolar gap, AKI if osmolality &gt; 320</td></tr>
<tr><td>Carbonic anhydrase inhibitors (acetazolamide)</td><td>PCT</td><td>HCO3⁻ diuresis, metabolic acidosis; altitude, glaucoma, post-hypercapnic alkalosis</td></tr>
<tr><td>Loop (furosemide, bumetanide)</td><td>NKCC2, thick ascending limb (from the lumen, secreted in PCT)</td><td>Most potent (up to 25% of filtered Na⁺); washes out medullary gradient; venodilatation; hypokalaemia, hypomagnesaemia, alkalosis, ototoxicity, hypercalciuria</td></tr>
<tr><td>Thiazides</td><td>NCC, DCT</td><td>Moderate; hypokalaemia, hyponatraemia, hypercalcaemia, hyperglycaemia, hyperuricaemia; paradoxical use in nephrogenic DI</td></tr>
<tr><td>K⁺-sparing: amiloride, triamterene</td><td>ENaC, collecting duct</td><td>Weak; hyperkalaemia</td></tr>
<tr><td>Aldosterone antagonists (spironolactone, eplerenone)</td><td>Mineralocorticoid receptor</td><td>Hyperkalaemia, gynaecomastia; heart failure, cirrhosis, Conn's</td></tr>
<tr><td>Vaptans (tolvaptan)</td><td>V2 antagonist</td><td>Aquaresis for SIADH; risk of over-rapid Na⁺ rise</td></tr></table></div>`,
p:"Loop diuretics only work once secreted into the tubular lumen by the PCT organic anion transporters, so they need higher doses in renal failure and hypoalbuminaemia.",
v:"Classify by site along the nephron, with mechanism, clinical use and electrolyte consequences."},
{f:"app",t:"Acute kidney injury",b:`<p><b>KDIGO definition</b>: creatinine rise ≥ 26.5 µmol/L within 48 h, or ≥ 1.5 × baseline within 7 days, or urine &lt; 0.5 mL/kg/h for 6 h.</p>
<div class="tbl"><table><tr><th>Stage</th><th>Creatinine</th><th>Urine output</th></tr><tr><td>1</td><td>1.5–1.9 × baseline or ≥ 26.5 µmol/L rise</td><td>&lt; 0.5 mL/kg/h for 6–12 h</td></tr><tr><td>2</td><td>2.0–2.9 × baseline</td><td>&lt; 0.5 mL/kg/h for ≥ 12 h</td></tr><tr><td>3</td><td>≥ 3 × baseline, or ≥ 354 µmol/L, or RRT started</td><td>&lt; 0.3 mL/kg/h for ≥ 24 h, or anuria ≥ 12 h</td></tr></table></div>
<ul class="clean"><li><b>Causes</b>: prerenal (hypovolaemia, low CO, sepsis, raised intra-abdominal pressure, hepatorenal), intrinsic (acute tubular injury from ischaemia or toxins: aminoglycosides, contrast, NSAIDs, myoglobin; glomerulonephritis; interstitial nephritis), postrenal (obstruction, blocked catheter).</li>
<li><b>Prerenal vs intrinsic</b>: FENa &lt; 1% and urine Na⁺ &lt; 20, high urine osmolality suggest prerenal (unreliable after diuretics).</li>
<li><b>Perioperative risk</b>: age, CKD, diabetes, heart failure, emergency, major vascular, cardiac (CPB) and abdominal surgery, sepsis, nephrotoxins, hypotension (MAP &lt; 65 for &gt; 10 min associated with AKI).</li>
<li><b>Prevention</b>: identify risk, stop nephrotoxins (NSAIDs, ACEi/ARB on the day), maintain MAP and CO, avoid hypovolaemia and fluid overload, balanced crystalloids, avoid HES, glucose control, avoid raised abdominal pressure. No drug (dopamine, furosemide, mannitol, fenoldopam) prevents AKI.</li></ul>`,
p:"Oliguria under anaesthesia is often a physiological response (ADH, sympathetic, RAAS) to surgery. Check the catheter and haemodynamics before giving fluid boluses reflexively.",
v:"Definition and staging, causes in three groups, perioperative risk factors, prevention, then indications for RRT."},
{f:"app",t:"CKD, dialysis and the anaesthetist",b:`<ul class="clean"><li><b>Systemic effects</b>: anaemia (low EPO), uraemic platelet dysfunction (treat with desmopressin, dialysis, Hb &gt; 100), hypertension, accelerated atherosclerosis, LVH, pericarditis, hyperkalaemia, metabolic acidosis, renal bone disease, fluid overload, autonomic neuropathy, delayed gastric emptying (diabetes), infection risk.</li>
<li><b>Pre-op</b>: timing of dialysis (ideally within 24 h before surgery, allow heparin to wear off and fluid shifts to settle), post-dialysis K⁺ and weight, protect the AV fistula arm (no BP cuff or cannula).</li>
<li><b>Drugs</b>: avoid morphine (active M6G and M3G accumulate), pethidine (norpethidine seizures), codeine; prefer fentanyl, alfentanil, remifentanil, oxycodone with care. Atracurium/cisatracurium (Hofmann) preferred; rocuronium prolonged; sugammadex–rocuronium complex is cleared renally (not recommended if CrCl &lt; 30). Suxamethonium raises K⁺ by ~0.5: acceptable if K⁺ normal. Avoid NSAIDs, gentamicin; reduce LMWH; gabapentinoids accumulate.</li>
<li>Reduced protein binding and altered volume of distribution; uraemia increases sensitivity to sedatives.</li>
<li><b>Renal transplant recipient / surgery</b>: keep well filled (CVP-guided historically), MAP &gt; 80 at reperfusion, avoid nephrotoxins, immunosuppressant interactions, aseptic technique.</li></ul>`,
p:"Examiners ask 'drugs to be avoided in CKD' and 'CKD and pregnancy'. In pregnancy, CKD increases pre-eclampsia, preterm delivery and loss of renal function; GFR normally rises 50% in pregnancy so a 'normal' creatinine may be abnormal.",
v:"Systems affected, preoperative optimisation and dialysis timing, drug choices with reasons, intraoperative and postoperative issues."},
{f:"app",t:"Renal replacement therapy",b:`<ul class="clean"><li><b>Principles</b>: <b>diffusion</b> (haemodialysis: solute moves down a concentration gradient across the membrane, countercurrent dialysate; best for small molecules like urea and K⁺), <b>convection</b> (haemofiltration: solvent drag with hydrostatic pressure; clears middle molecules up to ~20–30 kDa; needs replacement fluid), <b>ultrafiltration</b> (water removal), <b>adsorption</b> to the membrane.</li>
<li><b>Modalities</b>: intermittent haemodialysis (efficient, 4 h, haemodynamic swings), CRRT (CVVH, CVVHD, CVVHDF: slower, better for unstable ICU patients and raised ICP), SLED (hybrid), peritoneal dialysis.</li>
<li><b>CRRT dose</b>: effluent 20–25 mL/kg/h delivered (prescribe ~25–30 to allow for downtime). Pre-dilution reduces filter clotting but lowers efficiency.</li>
<li><b>Anticoagulation</b>: regional citrate (chelates Ca²⁺ in the circuit; monitor post-filter and systemic ionised Ca²⁺; risk of citrate accumulation in liver failure: rising total/ionised Ca ratio &gt; 2.5), heparin, or none.</li>
<li><b>Indications (AEIOU)</b>: refractory acidosis (pH &lt; 7.15), electrolytes (K⁺ &gt; 6.5 despite treatment), intoxication (lithium, methanol, ethylene glycol, salicylate, metformin), overload (pulmonary oedema resistant to diuretics), uraemia (encephalopathy, pericarditis, bleeding). Timing: early vs delayed trials show no benefit of starting early without these triggers.</li></ul>`,
p:"Drugs cleared by RRT have small molecular weight, low protein binding and small volume of distribution (gentamicin, vancomycin partly, meropenem, lithium). Dose antibiotics for the CRRT effluent rate.",
v:"Physics first (diffusion vs convection), then modalities, then prescription (dose, anticoagulation, fluid removal), then indications and complications."},
{f:"app",t:"Anaesthesia, surgery and the kidney",b:`<ul class="clean"><li><b>Stress response</b>: ADH, aldosterone, cortisol and catecholamines rise → Na⁺ and water retention for 24–48 h, oliguria, K⁺ loss. The "third space" concept is largely discredited; perioperative weight gain is mostly iatrogenic.</li>
<li><b>Anaesthetic agents</b>: most reduce RBF and GFR via lower MAP and sympathetic activation. Volatiles preserve autoregulation at usual doses. Sevoflurane produces compound A (with low flows, CO2 absorbents) and fluoride ions: no clinical nephrotoxicity proven. Methoxyflurane caused high-output renal failure (fluoride).</li>
<li><b>Positive pressure ventilation and PEEP</b> lower CO and raise venous pressure, ADH and renin → oliguria.</li>
<li><b>Pneumoperitoneum</b> (&gt; 15 mmHg) compresses renal veins and parenchyma → oliguria; recovers after deflation. Intra-abdominal hypertension &gt; 20 mmHg with organ failure = abdominal compartment syndrome.</li>
<li><b>Neuraxial block</b>: renal autoregulation preserved; sympathetic block can increase RBF if MAP maintained.</li>
<li><b>Aortic cross-clamping</b>: suprarenal clamping stops RBF; infrarenal clamping still reduces RBF by ~40% (renal vasoconstriction). Cardiopulmonary bypass: non-pulsatile flow, haemolysis, emboli, inflammation.</li>
<li><b>Rhabdomyolysis</b>: myoglobin causes tubular obstruction, direct toxicity and vasoconstriction (worse in acidic urine); CK &gt; 5000 IU/L increases risk. Aggressive fluids to urine 200–300 mL/h; treat hyperkalaemia; bicarbonate and mannitol unproven.</li></ul>`,
p:"Contrast-associated AKI risk is lower than previously thought with modern agents; protect by ensuring euvolaemia (isotonic crystalloid) in high-risk patients rather than with N-acetylcysteine or bicarbonate.",
v:"Organise by stress response, drugs, ventilation, surgery type, specific syndromes."},
];

const CALCS=[
 {t:"Body fluid volumes",c:"spo2",in:[["Weight kg","w",70],["TBW fraction (M 0.6, F 0.5, elderly 0.45–0.5, neonate 0.75)","f",0.6],["Blood volume mL/kg","bv",70],["Haematocrit %","h",42]],
  f:(v,fmt)=>{const tbw=v.w*v.f,icf=tbw*2/3,ecf=tbw/3,pl=ecf/4,bv=v.w*v.bv/1000;return [["TBW L",fmt(tbw,1)],["ICF L",fmt(icf,1)],["ECF L",fmt(ecf,1)],["Interstitial L",fmt(ecf*0.75,1)],["Plasma L (ECF/4)",fmt(pl,1)],["Blood volume L",fmt(bv,1)],["Plasma from Hct L",fmt(bv*(1-v.h/100),1)]]},
  n:"60–40–20 rule. Plasma from ECF/4 and from blood volume × (1 − Hct) should roughly agree."},
 {t:"Maintenance fluids",c:"spo2",in:[["Weight kg","w",70],["Adult mL/kg/day (NICE 25–30)","a",27]],
  f:(v,fmt)=>{const w=v.w,hs=w<=10?4*w:w<=20?40+2*(w-10):60+(w-20);return [["Adult water mL/day",fmt(w*v.a,0)],["Adult mL/h",fmt(w*v.a/24,0)],["Na⁺/K⁺/Cl⁻ mmol/day",fmt(w,0)+" each"],["Glucose g/day","50–100"],["4-2-1 rule mL/h",fmt(hs,0)]]},
  n:"NICE CG174 adults. 4-2-1 (Holliday–Segar) mainly for children; NICE NG29 recommends isotonic fluid in children, often restricted to 70% of this when ADH is high."},
 {t:"Osmolality and osmolar gap",c:"nibp",in:[["Na⁺","na",140],["Glucose mmol/L","g",5],["Urea mmol/L","u",5],["Ethanol mmol/L (mg/dL ÷ 4.6)","e",0],["Measured osmolality","m",290]],
  f:(v,fmt)=>{const c=2*v.na+v.g+v.u+v.e,ton=2*v.na+v.g,gap=v.m-(2*v.na+v.g+v.u);return [["Calculated mOsm/kg",fmt(c,0)],["Tonicity (no urea)",fmt(ton,0)],["Osmolar gap",fmt(gap,0),gap>10?"bad":"ok"],["Gap after ethanol",fmt(v.m-c,0),v.m-c>10?"bad":"ok"]]},
  n:"A gap > 10 after accounting for ethanol suggests methanol, ethylene glycol, mannitol, glycine or sorbitol."},
 {t:"Anion gap, albumin correction, delta ratio",c:"etco2",in:[["Na⁺","na",138],["K⁺ (0 to omit)","k",0],["Cl⁻","cl",100],["HCO3⁻","hco",14],["Albumin g/L","alb",30],["Normal AG (lab)","n",10]],
  f:(v,fmt)=>{const ag=v.na+v.k-v.cl-v.hco,cag=ag+0.25*(40-v.alb),dr=(cag-v.n-(v.k?4:0))/(24-v.hco);let i=v.hco>=22?"No metabolic acidosis":dr<0.4?"Normal-gap acidosis":dr<0.8?"Mixed high + normal gap":dr<=2?"High-gap acidosis":"High-gap + metabolic alkalosis";return [["Anion gap",fmt(ag,0)],["Corrected AG",fmt(cag,1),cag>v.n+(v.k?4:0)+4?"bad":"ok"],["Delta ratio",v.hco<24?fmt(dr,2):"–"],["Interpretation",i]]},
  n:"Corrected AG = AG + 0.25 × (40 − albumin). Each 10 g/L fall in albumin hides ~2.5 mmol/L of unmeasured anions."},
 {t:"Blood gas interpreter",c:"etco2",in:[["pH","ph",7.25],["PaCO2 kPa","co2",3.6],["HCO3⁻ mmol/L","hco",12],["Chronic? (1 = yes)","ch",0]],
  f:(v,fmt)=>{const ph=v.ph,c=v.co2,h=v.hco;let pri="",exp="",ok="";const calcpH=6.1+Math.log10(h/(0.23*c));
   if(ph<7.35){if(h<22&&c<=6.0){pri="Metabolic acidosis";const e=(1.5*h+8)/7.5;exp=`Expected PaCO2 ${fmt(e-0.3,1)}–${fmt(e+0.3,1)}`;ok=c<e-0.3?"plus respiratory alkalosis":c>e+0.3?"plus respiratory acidosis":"appropriate respiratory compensation"}else if(c>6.0){pri="Respiratory acidosis";const e=24+(v.ch?4:1)*(c-5.3)/1.33;exp=`Expected HCO3⁻ ≈ ${fmt(e,0)}`;ok=h<e-2?"plus metabolic acidosis":h>e+2?"plus metabolic alkalosis":"appropriate "+(v.ch?"chronic":"acute")+" compensation"}}
   else if(ph>7.45){if(h>26&&c>=4.6){pri="Metabolic alkalosis";const e=5.3+0.1*(h-24);exp=`Expected PaCO2 ≈ ${fmt(e,1)}`;ok=c<e-0.4?"plus respiratory alkalosis":c>e+0.4?"plus respiratory acidosis":"appropriate compensation"}else if(c<4.6){pri="Respiratory alkalosis";const e=24-(v.ch?5:2)*(5.3-c)/1.33;exp=`Expected HCO3⁻ ≈ ${fmt(e,0)}`;ok=h<e-2?"plus metabolic acidosis":h>e+2?"plus metabolic alkalosis":"appropriate compensation"}}
   else{pri=(c>6||c<4.6||h<22||h>26)?"Normal pH with abnormal values: mixed disorder or full compensation":"Normal acid–base"}
   return [["Primary",pri||"Check values",pri?"":"warn"],["Compensation",exp||"–"],["Verdict",ok||"–"],["pH from HCO3⁻/PaCO2",fmt(calcpH,2),Math.abs(calcpH-ph)>0.05?"warn":"ok"],["[H⁺] nmol/L",fmt(Math.pow(10,9-ph),0)]]},
  n:"Uses Winter's formula and standard compensation rules (kPa). If the pH calculated from HCO3⁻ and PaCO2 differs by > 0.05 from the measured pH, recheck the entries."},
 {t:"Hyponatraemia: Adrogué–Madias and free water",c:"ecg",in:[["Serum Na⁺","na",118],["Weight kg","w",70],["TBW fraction","f",0.5],["Infusate Na⁺ (3% 513, 0.9% 154, RL 130)","inf",513],["Infusate K⁺","k",0],["Max rise per 24 h","lim",8]],
  f:(v,fmt)=>{const tbw=v.w*v.f,d=(v.inf+v.k-v.na)/(tbw+1),vol=v.lim/d,fwd=tbw*(v.na/140-1);return [["Δ Na⁺ per 1 L",fmt(d,1)+" mmol/L"],["Volume for limit",d>0?fmt(vol*1000,0)+" mL/24 h":"–"],["150 mL bolus raises Na⁺ by",fmt(d*0.15,1)],["Free water deficit (if hyper)",v.na>145?fmt(fwd,1)+" L":"–"]]},
  n:"Δ[Na⁺] = (infusate Na⁺ + K⁺ − serum Na⁺) / (TBW + 1). Estimates only: ongoing urine losses change the result; check Na⁺ every 2–4 h."},
 {t:"eGFR and creatinine clearance",c:"nibp",in:[["Creatinine µmol/L","cr",110],["Age","age",65],["Weight kg","w",70],["Female (1/0)","fe",0]],
  f:(v,fmt)=>{const s=v.cr/88.4,k=v.fe?0.7:0.9,a=v.fe?-0.329:-0.411;const egfr=141*Math.pow(Math.min(s/k,1),a)*Math.pow(Math.max(s/k,1),-1.209)*Math.pow(0.993,v.age)*(v.fe?1.018:1);const cg=(140-v.age)*v.w*(v.fe?1.04:1.23)/v.cr;const st=egfr>=90?"G1":egfr>=60?"G2":egfr>=45?"G3a":egfr>=30?"G3b":egfr>=15?"G4":"G5";return [["CKD-EPI eGFR",fmt(egfr,0)+" mL/min/1.73m²",egfr<30?"bad":egfr<60?"warn":"ok"],["CKD stage",st],["Cockcroft–Gault CrCl",fmt(cg,0)+" mL/min",cg<30?"bad":cg<60?"warn":"ok"]]},
  n:"CKD-EPI 2009 creatinine equation without ethnicity coefficient (NICE NG203). Use Cockcroft–Gault for drug dosing where the product licence specifies it."},
 {t:"KDIGO AKI stage",c:"abp",in:[["Baseline creatinine µmol/L","b",80],["Current creatinine","c",170],["Rise within 48 h µmol/L","r",50],["Urine mL/kg/h","uo",0.4],["Hours at that urine rate","hr",8],["RRT started (1/0)","rrt",0]],
  f:(v,fmt)=>{const ratio=v.c/v.b;let sc=0;if(v.rrt||ratio>=3||v.c>=354)sc=3;else if(ratio>=2)sc=2;else if(ratio>=1.5||v.r>=26.5)sc=1;let su=0;if((v.uo<0.3&&v.hr>=24)||(v.uo===0&&v.hr>=12))su=3;else if(v.uo<0.5&&v.hr>=12)su=2;else if(v.uo<0.5&&v.hr>=6)su=1;const s=Math.max(sc,su);return [["Creatinine ratio",fmt(ratio,2)+"×"],["Stage by creatinine",sc||"–"],["Stage by urine",su||"–"],["KDIGO stage",s?String(s):"No AKI",s===3?"bad":s?"warn":"ok"]]},
  n:"Highest stage from either criterion applies."},
 {t:"Clearance and fractional excretion",c:"nibp",in:[["Urine conc of X","u",8000],["Urine flow mL/min","v",1],["Plasma conc of X","p",80],["Urine Na⁺","una",15],["Plasma Na⁺","pna",140],["Urine creatinine µmol/L","ucr",9000],["Plasma creatinine µmol/L","pcr",160]],
  f:(v,fmt)=>{const C=v.u*v.v/v.p,fena=v.una*v.pcr/(v.pna*v.ucr)*100;return [["Clearance mL/min",fmt(C,0)],["FENa %",fmt(fena,2),fena<1?"ok":"warn"],["Suggests",fena<1?"Prerenal (if no diuretic)":fena>2?"Intrinsic (ATN)":"Indeterminate"]]},
  n:"C = UV/P. FENa = (U<sub>Na</sub> × P<sub>Cr</sub>)/(P<sub>Na</sub> × U<sub>Cr</sub>) × 100. After diuretics use fractional excretion of urea (< 35% prerenal).".replace(/<[^>]+>/g,"")},
 {t:"Corrected calcium",c:"ecg",in:[["Total Ca mmol/L","ca",2.0],["Albumin g/L","alb",28]],
  f:(v,fmt)=>{const c=v.ca+0.02*(40-v.alb);return [["Corrected Ca",fmt(c,2)+" mmol/L",c<2.1?"warn":c>2.6?"warn":"ok"]]},
  n:"Formulae are unreliable in critical illness: measure ionised Ca²⁺ on a blood gas (normal 1.1–1.3)."},
];

const TABLES=[
 ["Composition of IV fluids (mmol/L)",["Fluid","Na⁺","K⁺","Cl⁻","Ca²⁺ / Mg²⁺","Buffer","Glucose g/L","mOsm/L","Effective SID"],[["0.9% sodium chloride","154","0","154","–","–","–","308","0"],["Hartmann's / Ringer's lactate","131","5","111","Ca 2","Lactate 29","–","278","~28"],["Plasma-Lyte 148","140","5","98","Mg 1.5","Acetate 27, gluconate 23","–","294","~50"],["5% glucose","–","–","–","–","–","50","278 (hypotonic in vivo)","0"],["4% glucose / 0.18% NaCl","30","–","30","–","–","40","284 (hypotonic in vivo)","0"],["4.5% human albumin","100–160","&lt; 2","100–160","–","Octanoate","–","~270–300","COP ~25 mmHg"],["20% human albumin","50–120","&lt; 2","&lt; 40","–","Octanoate","–","~135","COP ~100 mmHg"],["Succinylated gelatin 4%","154","0","120","–","–","–","274","~34"],["3% sodium chloride","513","0","513","–","–","–","1026","0"],["8.4% sodium bicarbonate","1000","–","–","–","HCO3⁻ 1000","–","2000","1000"],["1.5% glycine (irrigation)","–","–","–","–","–","–","200","–"]]],
 ["Normal arterial blood gas",["Variable","Value"],[["pH","7.35–7.45"],["[H⁺]","35–45 nmol/L"],["PaCO2","4.7–6.0 kPa (35–45 mmHg)"],["PaO2 (air)","10.6–13.3 kPa"],["HCO3⁻ (actual / standard)","22–26 mmol/L"],["Base excess","−2 to +2 mmol/L"],["Lactate","&lt; 2 mmol/L"],["Anion gap (Na − Cl − HCO3)","~8–12 mmol/L (lab-dependent)"],["Strong ion difference","~40–42 mEq/L"]]],
 ["Expected compensation",["Primary disorder","Rule (kPa)","Time"],[["Metabolic acidosis","PaCO2 = (1.5 × HCO3⁻ + 8)/7.5 ± 0.3","12–24 h"],["Metabolic alkalosis","PaCO2 ↑ 0.1 per 1 mmol/L HCO3⁻ ↑","12–24 h"],["Respiratory acidosis, acute","HCO3⁻ ↑ 1 per 1.33 kPa","Minutes"],["Respiratory acidosis, chronic","HCO3⁻ ↑ 4 per 1.33 kPa","3–5 days"],["Respiratory alkalosis, acute","HCO3⁻ ↓ 2 per 1.33 kPa","Minutes"],["Respiratory alkalosis, chronic","HCO3⁻ ↓ 5 per 1.33 kPa","2–3 days"]]],
 ["Hormones acting on the kidney",["Hormone","Source","Renal action"],[["ADH (vasopressin)","Posterior pituitary","V2: AQP2 insertion and urea permeability in collecting duct"],["Aldosterone","Adrenal zona glomerulosa","ENaC, Na⁺/K⁺-ATPase: Na⁺ retention, K⁺ and H⁺ secretion"],["Angiotensin II","Plasma (ACE in lung endothelium)","Efferent constriction, PCT Na⁺ reabsorption, mesangial contraction"],["ANP / BNP","Atria / ventricles","Natriuresis, afferent dilatation, renin and aldosterone suppression"],["PTH","Parathyroid","Ca²⁺ reabsorption (DCT), phosphate excretion (PCT), 1α-hydroxylase"],["Calcitonin","Thyroid C cells","Minor: Ca²⁺ and phosphate excretion"],["Made by the kidney","–","Renin, erythropoietin, calcitriol, prostaglandins, kinins, urodilatin"]]],
 ["Hyponatraemia by volume status",["Hypovolaemic","Euvolaemic","Hypervolaemic"],[["GI loss (urine Na⁺ &lt; 20)","SIADH","Heart failure"],["Diuretics, Addison's, salt-losing nephropathy, cerebral salt wasting (urine Na⁺ &gt; 20)","Hypothyroidism, cortisol deficiency","Cirrhosis"],["Burns, third-space loss","Primary polydipsia, beer potomania, TURP / water intoxication","Nephrotic syndrome, renal failure"]]],
 ["Renal replacement modalities",["Modality","Principle","Clears","Notes"],[["Intermittent haemodialysis","Diffusion","Small solutes fast","Haemodynamic instability, disequilibrium (raised ICP)"],["CVVH","Convection","Small and middle molecules","Needs replacement fluid; pre- or post-dilution"],["CVVHD","Diffusion","Small solutes","Countercurrent dialysate"],["CVVHDF","Both","Small and middle","Common ICU default"],["SLED","Diffusion, slower","Small","Hybrid 6–12 h"],["Peritoneal dialysis","Diffusion across peritoneum","Small","Splints diaphragm; peritonitis risk"],["Plasma exchange","Removal of plasma","Antibodies, proteins","Not a renal replacement"]]],
 ["Drugs and renal failure (anaesthetic relevance)",["Avoid / caution","Prefer / reason"],[["Morphine (M6G, M3G), pethidine, codeine, tramadol (seizures), gabapentinoids","Fentanyl, alfentanil, remifentanil; oxycodone at reduced dose"],["Rocuronium, vecuronium prolonged; sugammadex if CrCl &lt; 30","Atracurium, cisatracurium (Hofmann elimination)"],["NSAIDs, COX-2 inhibitors","Paracetamol (normal dose), regional techniques"],["Gentamicin, vancomycin (level-guided), contrast","Dose by CrCl and levels"],["LMWH full dose, metformin (lactic acidosis)","Unfractionated heparin if CrCl &lt; 30"],["Suxamethonium if K⁺ high","Acceptable if K⁺ normal (rise ~0.5 mmol/L)"]]],
];

const CARDS=[
 ["fluid","Total body water in a 70 kg man?","≈ 42 L (60% of body weight)."],
 ["fluid","ICF and ECF volumes in a 70 kg man?","ICF ≈ 28 L (40%), ECF ≈ 14 L (20%)."],
 ["fluid","Plasma volume as a fraction of ECF?","≈ 1/4 (≈ 3.5 L; ~5% of body weight)."],
 ["fluid","Indicator used to measure TBW?","Deuterium oxide (or tritiated water)."],
 ["fluid","Indicator used to measure plasma volume?","Evans blue or ¹²⁵I-albumin."],
 ["fluid","Indicators for ECF volume?","Inulin, mannitol, bromide, ²⁴Na, thiosulphate."],
 ["fluid","Osmolality vs osmolarity?","Osmolality: per kg solvent. Osmolarity: per litre of solution."],
 ["fluid","Calculated plasma osmolality formula?","2[Na⁺] + [glucose] + [urea]."],
 ["fluid","Normal osmolar gap?","< 10 mOsm/kg."],
 ["fluid","Osmotic pressure of 1 mOsm/kg at 37 °C?","≈ 19.3 mmHg."],
 ["fluid","Plasma oncotic pressure?","≈ 25 mmHg."],
 ["fluid","How much of 1 L 0.9% saline stays intravascular at equilibrium?","≈ 250 mL."],
 ["fluid","How much of 1 L 5% dextrose stays intravascular?","≈ 80 mL."],
 ["fluid","Composition of 0.9% saline?","Na⁺ 154, Cl⁻ 154 mmol/L; 308 mOsm/L; SID 0."],
 ["fluid","Composition of Hartmann's?","Na⁺ 131, K⁺ 5, Cl⁻ 111, Ca²⁺ 2, lactate 29 mmol/L; 278 mOsm/L."],
 ["fluid","NICE daily maintenance for adults?","Water 25–30 mL/kg, Na⁺/K⁺/Cl⁻ ~1 mmol/kg each, glucose 50–100 g."],
 ["fluid","Status of hydroxyethyl starch in Europe?","Marketing authorisations suspended in 2022 (AKI and mortality)."],
 ["fluid","Where are the osmoreceptors?","OVLT and subfornical organ of the hypothalamus (outside the BBB)."],
 ["fluid","Receptor and second messenger for ADH in the collecting duct?","V2, Gs → cAMP → aquaporin-2 insertion."],
 ["fluid","Main stimuli for renin release?","Low renal perfusion pressure, sympathetic β1, low NaCl at the macula densa."],
 ["lyte","Maximum rate of correction of chronic hyponatraemia?","≤ 10 mmol/L in 24 h (≤ 8 if high risk)."],
 ["lyte","Treatment of severe symptomatic hyponatraemia?","3% saline 150 mL over 20 min, repeated to raise Na⁺ ~5 mmol/L."],
 ["lyte","Osmolality of 1.5% glycine?","≈ 200 mOsm/L (hypotonic)."],
 ["lyte","TURP syndrome features?","Hyponatraemia, fluid overload, hypo-osmolality, glycine toxicity (visual), hyperammonaemia."],
 ["lyte","Free water deficit formula?","TBW × (Na⁺/140 − 1)."],
 ["lyte","Percentage of body K⁺ inside cells?","≈ 98%."],
 ["lyte","Drugs shifting K⁺ into cells?","Insulin, β2 agonists, bicarbonate/alkalosis."],
 ["lyte","Main site of renal K⁺ secretion?","Principal cells of the collecting duct (ROMK), driven by aldosterone and distal flow."],
 ["lyte","Fraction of plasma calcium that is ionised?","≈ 45% (1.1–1.3 mmol/L)."],
 ["lyte","Effect of alkalosis on ionised calcium?","Reduces it (more albumin binding)."],
 ["lyte","Calcium content of 10 mL 10% CaCl2 vs gluconate?","6.8 mmol vs 2.2 mmol."],
 ["lyte","Magnesium level at which reflexes are lost?","≈ 5 mmol/L."],
 ["lyte","Three electrolytes that fall in refeeding syndrome?","Phosphate, potassium, magnesium."],
 ["ab","Normal [H⁺] at pH 7.40?","40 nmol/L."],
 ["ab","pKa of the bicarbonate buffer system?","6.1."],
 ["ab","Solubility coefficient of CO2 in plasma?","0.23 mmol/L/kPa (0.03 per mmHg)."],
 ["ab","Why is bicarbonate the main ECF buffer despite its pKa?","It is an open system: lungs control CO2 and kidneys control HCO3⁻; it is also abundant."],
 ["ab","Main intracellular buffers?","Proteins and phosphates (and Hb in red cells)."],
 ["ab","What is the isohydric principle?","All buffer pairs in a solution are in equilibrium with the same [H⁺]."],
 ["ab","Winter's formula (kPa)?","Expected PaCO2 = (1.5 × HCO3⁻ + 8)/7.5 ± 0.3."],
 ["ab","HCO3⁻ change in chronic respiratory acidosis?","Rises ~4 mmol/L per 1.33 kPa rise in PaCO2."],
 ["ab","Define base excess.","Acid needed to restore 1 L of blood to pH 7.40 at PaCO2 5.3 kPa and 37 °C."],
 ["ab","Anion gap correction for albumin?","Add 0.25 × (40 − albumin g/L)."],
 ["ab","Delta ratio > 2 suggests?","High anion gap acidosis plus metabolic alkalosis."],
 ["ab","Causes of normal anion gap acidosis?","Saline, diarrhoea, RTA, acetazolamide, ureteric diversion, Addison's."],
 ["ab","Type B lactic acidosis examples?","Metformin, adrenaline, liver failure, propofol infusion syndrome, cyanide, thiamine deficiency."],
 ["ab","Stewart's three independent variables?","PaCO2, strong ion difference, total weak acids (A<sub>TOT</sub>).".replace(/<[^>]+>/g,"")],
 ["ab","Normal apparent SID?","≈ 40–42 mEq/L."],
 ["ab","Why does saline cause acidosis in Stewart terms?","Its SID is 0, so it lowers plasma SID."],
 ["ab","Acid–base effect of hypoalbuminaemia?","Metabolic alkalosis (fewer weak acids)."],
 ["ab","Main renal adaptation to chronic acidosis?","Increased ammoniagenesis from glutamine (NH4⁺ excretion)."],
 ["ab","Distal RTA (type 1): K⁺ and urine pH?","Low K⁺; urine pH > 5.5."],
 ["kid","Renal blood flow?","≈ 1.1–1.2 L/min (20–25% of CO)."],
 ["kid","Renal plasma flow and how it is measured?","≈ 650 mL/min; PAH clearance."],
 ["kid","Renal autoregulation range?","MAP ≈ 75–170 mmHg."],
 ["kid","Two mechanisms of renal autoregulation?","Myogenic response and tubuloglomerular feedback."],
 ["kid","Mediator of TGF afferent constriction?","Adenosine (A1 receptors)."],
 ["kid","Effect of angiotensin II on the glomerular arterioles?","Constricts efferent more than afferent: maintains GFR."],
 ["kid","Normal GFR and filtration fraction?","≈ 125 mL/min; FF ≈ 20%."],
 ["kid","Why is inulin ideal for GFR?","Freely filtered, not reabsorbed, secreted, metabolised or stored."],
 ["kid","Why does creatinine clearance overestimate GFR?","Creatinine is partly secreted by the tubules."],
 ["kid","Glomerular capillary hydrostatic pressure?","≈ 45–55 mmHg."],
 ["kid","Percentage of filtered Na⁺ reabsorbed in the PCT?","≈ 65%."],
 ["kid","Transporter in the thick ascending limb?","NKCC2 (Na⁺-K⁺-2Cl⁻), blocked by loop diuretics."],
 ["kid","Maximum urine osmolality?","≈ 1200–1400 mOsm/kg."],
 ["kid","Osmolality of fluid leaving the loop of Henle?","≈ 100 mOsm/kg (hypotonic)."],
 ["kid","Role of the vasa recta?","Countercurrent exchanger: removes water without washing out the medullary gradient."],
 ["kid","Contribution of urea to medullary osmolality?","≈ half (urea recycling, ADH-dependent)."],
 ["kid","Renal threshold for glucose?","≈ 10–11 mmol/L."],
 ["app","KDIGO creatinine criteria for AKI?","Rise ≥ 26.5 µmol/L in 48 h, or ≥ 1.5 × baseline in 7 days."],
 ["app","KDIGO urine criterion for AKI?","< 0.5 mL/kg/h for 6 h."],
 ["app","KDIGO stage 3 creatinine?","≥ 3 × baseline, ≥ 354 µmol/L, or RRT."],
 ["app","FENa suggesting prerenal AKI?","< 1%."],
 ["app","Opioid to avoid in renal failure and why?","Morphine: M6G and M3G accumulate."],
 ["app","Preferred NMB in renal failure?","Atracurium or cisatracurium (Hofmann)."],
 ["app","Diffusion vs convection in RRT?","Diffusion: concentration gradient (dialysis). Convection: solvent drag (filtration)."],
 ["app","Standard CRRT dose?","Effluent 20–25 mL/kg/h delivered."],
 ["app","Sign of citrate accumulation on CRRT?","Total:ionised Ca ratio > 2.5, metabolic acidosis, rising anion gap."],
 ["app","Indications for urgent RRT?","Refractory acidosis, hyperkalaemia, intoxication, fluid overload, uraemic complications."],
 ["app","Effect of pneumoperitoneum on urine output?","Reduced (renal vein and parenchymal compression, ADH)."],
];

const FCF={all:"All",fluid:"Fluids",lyte:"Electrolytes",ab:"Acid–base",kid:"Kidney",app:"Applied"};

const VIVA=[
 {st:"SOE 2 · Pharmacology",q:"What IV fluids do you know? Discuss daily requirements, osmolarity and osmolality of different fluids.",a:["Daily water and electrolyte needs (NICE).","Crystalloids vs colloids; composition table with osmolarity and SID.","Distribution of 1 L of each fluid.","Effects on acid–base (saline acidosis) and evidence (balanced vs saline, SAFE, HES).","Choice in special situations: TBI, hyponatraemia, paediatrics, hyperkalaemia."],fu:"Is Hartmann's safe in a hyperkalaemic patient?"},
 {st:"SOE 1 · Physiology",q:"Describe the body fluid compartments and how they are measured.",a:["TBW and its variation with age, sex and fat.","ICF/ECF split and subdivisions with volumes.","Composition differences and why (Na⁺/K⁺-ATPase).","Indicator dilution principle and indicators for each compartment.","What determines movement between compartments (osmolality, Starling forces)."],fu:"What happens to the compartments when you give 1 L of 5% dextrose?"},
 {st:"SOE 1 · Physiology",q:"Define a buffer. What buffer systems are there in the body? Write the Henderson–Hasselbalch equation.",a:["Definition and weak acid/conjugate base.","Derivation from the law of mass action.","Bicarbonate system with numbers; open-system advantage.","Hb, proteins, phosphate, bone, urinary buffers (ammonia).","Role of lungs and kidneys (time course)."],fu:"Why is bicarbonate a poor buffer of alkali?"},
 {st:"SOE 4 · Critical care",q:"Interpret: pH 7.12, PaCO2 3.1 kPa, HCO3⁻ 7, Na⁺ 136, Cl⁻ 100, glucose 28, lactate 2.",a:["Severe metabolic acidosis.","Expected PaCO2 = (1.5 × 7 + 8)/7.5 = 2.5 ± 0.3: actual 3.1 is higher → coexisting respiratory component (tiring).","AG = 136 − 107 = 29 (high).","Delta ratio = (29 − 10)/(24 − 7) ≈ 1.1: pure high-gap acidosis.","Diagnosis: DKA; management (fluids, insulin, K⁺, monitoring, cause)."],fu:"Why does the anion gap fall and chloride rise during treatment of DKA?"},
 {st:"SOE 1 · Physiology",q:"Explain Stewart's approach to acid–base and why 0.9% saline causes an acidosis.",a:["Dependent vs independent variables.","SID equation and normal value; A<sub>TOT</sub>.","Saline (SID 0) vs balanced fluids (effective SID).","Hypoalbuminaemic alkalosis; strong ion gap.","Comparison with the bicarbonate method."],fu:"What is the effective SID of Plasma-Lyte?"},
 {st:"SOE 1 · Physiology",q:"How is renal blood flow regulated? How is GFR measured?",a:["RBF numbers and distribution; medullary hypoxia.","Autoregulation: myogenic and TGF with the curve.","Extrinsic: sympathetic, AII, PGs, ANP, NO.","GFR Starling forces; effect of afferent and efferent tone.","Clearance concept; inulin, creatinine, PAH; eGFR equations."],fu:"Why are NSAIDs dangerous in the hypovolaemic patient?"},
 {st:"SOE 1 · Physiology",q:"Describe the countercurrent mechanism. How is concentrated urine produced?",a:["Permeabilities of each limb (table).","Thick ascending limb pumping and multiplication.","Urea recycling.","Vasa recta exchange.","ADH actions (AQP2, urea) and maximum/minimum osmolalities; loop diuretics."],fu:"Why do loop diuretics impair urine concentration?"},
 {st:"SOE 3 · Anaesthesia",q:"A patient becomes confused and bradycardic 50 minutes into a TURP under spinal. Discuss.",a:["Differential: TURP syndrome, high block, hypoglycaemia, sepsis, bleeding, MI, bladder perforation.","Pathophysiology: glycine absorption, hyponatraemia, hypo-osmolality, glycine and ammonia toxicity.","Immediate: stop surgery, ABCDE, check Na⁺ and osmolality, CXR if overload.","Treatment: fluid restriction/furosemide if overload; hypertonic saline if severe/symptomatic Na⁺ < 120; seizures; ICU.","Prevention: bipolar with saline, limit time and bag height, monitor."],fu:"Why is glycine 1.5% used rather than water or saline in monopolar TURP?"},
 {st:"SOE 4 · Critical care",q:"A post-laparotomy patient is oliguric with a rising creatinine. Define AKI and discuss management.",a:["KDIGO definition and staging.","Causes: prerenal, intrinsic, postrenal; check catheter.","Assessment: volume status, haemodynamics, IAP, urine tests (FENa), ultrasound.","Management: optimise MAP and CO, stop nephrotoxins, balanced fluids, avoid overload, adjust drugs.","RRT indications and modality; prognosis."],fu:"Should you give furosemide to an oliguric patient?"},
 {st:"SOE 1 · Physiology",q:"Discuss the effects of altered CO2 on the renal system, and the causes of AKI.",a:["Hypercapnia: renal vasoconstriction, sympathetic and RAAS activation, ADH, oliguria.","Renal compensation: H⁺ secretion, HCO3⁻ reabsorption and generation, ammonia (3–5 days).","Hypocapnia: HCO3⁻ excretion.","Causes of AKI (classification).","Drugs to avoid in CKD."],fu:"How quickly does renal compensation for chronic hypercapnia occur?"},
 {st:"SOE 3 · Anaesthesia",q:"A patient on haemodialysis needs an emergency laparotomy. What are your concerns?",a:["Timing of last dialysis, K⁺, fluid status, residual urine output.","Comorbidities: cardiovascular disease, anaemia, platelet dysfunction, diabetes, gastroparesis.","Drugs: induction doses, NMB choice, opioids, avoid nephrotoxins; protect fistula.","Intraoperative: arterial line, K⁺ monitoring, careful fluids, temperature.","Postop: HDU, dialysis plan, analgesia without NSAIDs or morphine."],fu:"Is suxamethonium contraindicated in renal failure?"},
 {st:"SOE 2 · Pharmacology",q:"What are the principles of renal replacement therapy? Compare the modalities.",a:["Diffusion, convection, ultrafiltration, adsorption.","IHD vs CRRT vs SLED vs PD.","CRRT prescription: dose, pre/post-dilution, fluid balance.","Anticoagulation: citrate vs heparin; complications.","Drug dosing and indications."],fu:"Why is CRRT preferred in a patient with raised ICP?"},
 {st:"SOE 1 · Physiology",q:"Describe the control of plasma osmolality and the differences between DI and SIADH.",a:["Osmoreceptors, ADH synthesis and release, thresholds.","Non-osmotic stimuli and perioperative relevance.","ADH receptors and actions.","Thirst.","DI vs SIADH vs cerebral salt wasting table and management."],fu:"How would you diagnose diabetes insipidus after pituitary surgery?"},
];

const QUIZ=[
 ["In a 70 kg adult man",[["Total body water is about 42 L",1,""],["ICF volume is about 14 L",0,"ICF ≈ 28 L; ECF ≈ 14 L."],["Plasma volume is about 3.5 L",1,""],["TBW can be measured with deuterium oxide",1,""],["Evans blue measures ECF volume",0,"It binds albumin: plasma volume."]]],
 ["Osmolality",[["Is measured by freezing-point depression",1,""],["Is expressed per litre of solution",0,"Per kg of solvent; osmolarity is per litre."],["Urea contributes to tonicity",0,"Urea crosses membranes: osmolality but not tonicity."],["An osmolar gap can be caused by mannitol",1,""],["1 mOsm/kg exerts about 19.3 mmHg",1,""]]],
 ["Intravenous fluids",[["0.9% saline contains 154 mmol/L of sodium",1,""],["Hartmann's solution contains potassium",1,"5 mmol/L."],["5% dextrose is effectively hypotonic once infused",1,"Glucose is metabolised."],["Plasma-Lyte contains lactate",0,"Acetate and gluconate."],["0.9% saline has a strong ion difference of 40",0,"SID 0."]]],
 ["ADH",[["Is synthesised in the posterior pituitary",0,"Synthesised in hypothalamic nuclei; stored and released from the posterior pituitary."],["Acts on V2 receptors to insert aquaporin-2",1,""],["Is released in response to hypovolaemia",1,""],["Increases urea permeability of the inner medullary collecting duct",1,""],["Secretion is reduced by surgery and pain",0,"Increased."]]],
 ["Hyponatraemia",[["Chronic hyponatraemia should be corrected by no more than 10 mmol/L in 24 h",1,""],["SIADH causes hypovolaemia",0,"Euvolaemic."],["Glycine 1.5% is hypotonic",1,""],["Hyperglycaemia causes hypertonic hyponatraemia",1,""],["Osmotic demyelination follows over-rapid correction",1,""]]],
 ["Potassium",[["About 98% of body potassium is intracellular",1,""],["Insulin moves K⁺ out of cells",0,"Into cells."],["Aldosterone increases K⁺ secretion",1,""],["Metabolic acidosis tends to cause hyperkalaemia",1,""],["Hypomagnesaemia makes hypokalaemia harder to correct",1,""]]],
 ["Buffers",[["The pKa of the bicarbonate system is 6.1",1,""],["Buffers work best within one pH unit of their pKa",1,""],["Haemoglobin buffers mainly through histidine residues",1,""],["Phosphate is the main extracellular buffer",0,"Bicarbonate."],["Oxygenated Hb is a better buffer than deoxygenated Hb",0,"Deoxy-Hb buffers better (Haldane)."]]],
 ["Blood gas interpretation",[["In metabolic acidosis expected PaCO2 = (1.5 × HCO3⁻ + 8)/7.5 kPa",1,""],["Compensation can overcorrect the pH",0,"It does not overcorrect."],["Chronic respiratory acidosis raises HCO3⁻ more than acute",1,""],["A delta ratio below 0.4 suggests a normal-gap acidosis",1,""],["Hypoalbuminaemia raises the anion gap",0,"It lowers it, hiding unmeasured anions."]]],
 ["Causes of high anion gap metabolic acidosis include",[["Diabetic ketoacidosis",1,""],["Diarrhoea",0,"Normal gap."],["Methanol poisoning",1,""],["Excess 0.9% saline",0,"Normal gap (hyperchloraemic)."],["Renal failure",1,""]]],
 ["Stewart approach",[["PaCO2 is an independent variable",1,""],["HCO3⁻ is an independent variable",0,"Dependent."],["A fall in SID causes acidosis",1,""],["Hypoalbuminaemia causes metabolic alkalosis",1,""],["Normal SID is about 24 mEq/L",0,"About 40–42."]]],
 ["Renal blood flow",[["Is about 20–25% of cardiac output",1,""],["Is greatest in the inner medulla",0,"Highest in the cortex."],["Is autoregulated by tubuloglomerular feedback",1,""],["Can be measured by PAH clearance",1,""],["Is increased by NSAIDs",0,"NSAIDs remove prostaglandin vasodilatation."]]],
 ["Glomerular filtration",[["Normal GFR is about 125 mL/min",1,""],["Efferent arteriolar constriction tends to increase GFR",1,""],["Inulin is reabsorbed in the proximal tubule",0,"Not reabsorbed."],["Creatinine clearance slightly overestimates GFR",1,""],["Albumin is freely filtered",0,"Restricted by size and negative charge."]]],
 ["The nephron",[["About 65% of filtered sodium is reabsorbed in the PCT",1,""],["The thick ascending limb is permeable to water",0,"Impermeable."],["Thiazides act on the Na⁺Cl⁻ co-transporter in the DCT",1,""],["Fluid leaving the loop of Henle is hypotonic",1,""],["Maximum urine osmolality is about 600 mOsm/kg",0,"About 1200–1400."]]],
 ["Acute kidney injury (KDIGO)",[["A creatinine rise of 26.5 µmol/L in 48 h meets the definition",1,""],["Urine output < 0.5 mL/kg/h for 6 h meets the definition",1,""],["Stage 3 includes starting RRT",1,""],["Low-dose dopamine prevents AKI",0,"No benefit."],["FENa < 1% suggests acute tubular necrosis",0,"Suggests prerenal AKI."]]],
];

const CRISIS=[
 ["TURP syndrome","ecg",["Recognise: restlessness, confusion, nausea, visual disturbance, bradycardia, hypertension then hypotension, seizures (under GA: unexplained hypotension, bradycardia, delayed waking).","Stop irrigation and finish surgery quickly; tell the surgeon; check for bladder perforation.","ABCDE, O2; send Na⁺, osmolality, glucose, Hb, ammonia.","Fluid overload with Na⁺ > 120 and mild symptoms: fluid restriction, furosemide.","Severe symptoms or Na⁺ < 120: 3% saline (150 mL bolus, repeat), aim +5 mmol/L then ≤ 10 per 24 h; treat seizures (benzodiazepine, Mg²⁺).","ICU/HDU; watch for pulmonary oedema and haemolysis."],"Hypotonic glycine absorbed at up to 20 mL/min dilutes plasma Na⁺ and osmolality and swells the brain."],
 ["Severe symptomatic hyponatraemia","ecg",["Confirm true hypotonic hyponatraemia (glucose, lipids, osmolality).","Severe symptoms (seizures, coma, vomiting, cardiorespiratory distress): 3% saline 150 mL over 20 min.","Recheck Na⁺ after 20 min; repeat bolus up to twice more until +5 mmol/L.","Then limit to ≤ 10 mmol/L in 24 h (≤ 8 if high risk); stop hypertonic saline when symptoms resolve.","Over-correction: give 5% dextrose or desmopressin to re-lower Na⁺."],"Brain cells lose osmolytes over 48 h in chronic hyponatraemia, so rapid correction shrinks them (osmotic demyelination)."],
 ["DKA needing emergency surgery","etco2",["Delay surgery if possible for 4–6 h of resuscitation (unless the cause is surgical sepsis).","Fluids: 0.9% saline or balanced crystalloid (1 L in first hour if not shocked; bolus if SBP < 90).","Fixed-rate insulin 0.1 units/kg/h; add 10% glucose when glucose < 14 mmol/L; continue long-acting insulin.","K⁺: none if > 5.5; 40 mmol/L of fluid if 3.5–5.5; delay insulin if < 3.5 and replace first.","Theatre: RSI (gastroparesis), arterial line, hourly glucose, ketones, K⁺, pH; avoid hypotension.","Watch for cerebral oedema (children), hypokalaemia, hypophosphataemia, hyperchloraemia."],"Insulin drives K⁺ into cells: total body K⁺ is depleted even when plasma K⁺ looks normal or high."],
 ["Rhabdomyolysis","abp",["Suspect after crush, compartment syndrome, prolonged immobility, MH, NMS, seizures, statins, propofol infusion syndrome.","Check CK (> 5000 IU/L increases AKI risk), K⁺, Ca²⁺, phosphate, creatinine, myoglobinuria (dark urine, dipstick positive for blood without red cells).","Aggressive isotonic fluids to urine output 200–300 mL/h (2–3 mL/kg/h); avoid overload.","Treat hyperkalaemia urgently; do not treat early hypocalcaemia unless symptomatic (rebound hypercalcaemia later).","Fasciotomy for compartment syndrome; RRT if refractory hyperkalaemia, acidosis or overload."],"Myoglobin precipitates with Tamm–Horsfall protein in acidic urine and releases free iron that injures tubules."],
 ["Intraoperative oliguria","nibp",["Check the catheter (kinked, blocked, displaced) and the surgical field (ureteric injury, pneumoperitoneum).","Assess perfusion: MAP vs baseline, CO, lactate, heart rate, fluid responsiveness (stroke volume response).","Correct hypovolaemia and hypotension; vasopressor if vasodilated and fluid-unresponsive.","Recognise physiological oliguria (ADH, stress) in a well-perfused patient; avoid reflex fluid loading.","Avoid nephrotoxins; consider raised intra-abdominal pressure; plan postoperative monitoring of creatinine and urine."],"Urine output reflects ADH and sympathetic tone as much as kidney perfusion under anaesthesia."],
 ["Massive transfusion: calcium and potassium","abp",["Monitor ionised Ca²⁺ and K⁺ every 30–60 min (blood gas).","Citrate binds Ca²⁺: give CaCl2 10% 10 mL if iCa < 1.1 mmol/L (especially with rapid FFP, liver failure, hypothermia).","Stored red cells release K⁺ (older units, irradiated): warm, use fresher units in neonates, treat hyperkalaemia.","Later metabolic alkalosis as citrate is metabolised to bicarbonate.","Correct hypothermia (citrate metabolism slows), acidosis and coagulopathy together."],"Each unit of FFP carries ~3 g citrate; the liver normally clears it in minutes unless cold, shocked or failing."],
];

const SRC="";
const ERR="";
const REFS="";

const DIAG=`<div class="grid2">
 <div class="fig"><h3>Where does 1 litre go?</h3>
  <div class="seg" id="bf-fl"></div>
  <div class="ctl"><label>Weight kg <input type="range" id="bf-w" min="10" max="120" step="1" value="70"><output id="bf-w-o"></output></label>
   <label>TBW fraction <input type="range" id="bf-f" min="0.45" max="0.8" step="0.01" value="0.6"><output id="bf-f-o"></output></label></div>
  <div class="svgbox"><svg id="bf" viewBox="0 0 520 260" role="img" aria-label="Fluid compartments"></svg></div>
  <div class="readout" id="bf-r"></div></div>

 <div class="fig"><h3>Davenport diagram</h3>
  <div class="ctl"><label>pH <input type="range" id="dv-ph" min="6.9" max="7.7" step="0.01" value="7.40"><output id="dv-ph-o"></output></label>
   <label>PaCO2 kPa <input type="range" id="dv-c" min="2" max="12" step="0.1" value="5.3"><output id="dv-c-o"></output></label></div>
  <div class="seg" id="dv-pre"></div>
  <div class="svgbox"><svg id="dv" viewBox="0 0 520 320" role="img" aria-label="Davenport diagram"></svg></div>
  <div class="readout" id="dv-r"></div></div>

 <div class="fig" style="grid-column:1/-1"><h3>Gamblegram: anion gap and Stewart</h3>
  <div class="seg" id="gb-pre"></div>
  <div class="ctl">
   <label>Na⁺ <input type="range" id="gb-na" min="115" max="160" step="1" value="140"><output id="gb-na-o"></output></label>
   <label>Cl⁻ <input type="range" id="gb-cl" min="80" max="125" step="1" value="107"><output id="gb-cl-o"></output></label>
   <label>Lactate <input type="range" id="gb-la" min="0" max="15" step="0.5" value="1"><output id="gb-la-o"></output></label>
   <label>Unmeasured anions (ketones, toxins) <input type="range" id="gb-ua" min="0" max="25" step="0.5" value="2"><output id="gb-ua-o"></output></label>
   <label>Albumin g/L <input type="range" id="gb-al" min="10" max="50" step="1" value="40"><output id="gb-al-o"></output></label>
   <label>PaCO2 kPa <input type="range" id="gb-c" min="2" max="10" step="0.1" value="5.3"><output id="gb-c-o"></output></label></div>
  <div class="svgbox"><svg id="gb" viewBox="0 0 900 330" role="img" aria-label="Gamblegram"></svg></div>
  <div class="readout" id="gb-r"></div></div>

 <div class="fig"><h3>Buffer titration curves</h3>
  <div class="ctl"><label>pH <input type="range" id="bt-ph" min="4" max="10" step="0.05" value="7.4"><output id="bt-ph-o"></output></label></div>
  <div class="svgbox"><svg id="bt" viewBox="0 0 520 300" role="img" aria-label="Buffer titration curves"></svg></div>
  <div class="readout" id="bt-r"></div></div>

 <div class="fig"><h3>Glomerular haemodynamics</h3>
  <div class="seg" id="gh-pre"></div>
  <div class="ctl">
   <label>MAP mmHg <input type="range" id="gh-m" min="40" max="160" step="1" value="93"><output id="gh-m-o"></output></label>
   <label>Afferent resistance × <input type="range" id="gh-a" min="0.4" max="3" step="0.05" value="1"><output id="gh-a-o"></output></label>
   <label>Efferent resistance × <input type="range" id="gh-e" min="0.4" max="3" step="0.05" value="1"><output id="gh-e-o"></output></label>
   <label>Bowman's pressure mmHg <input type="range" id="gh-b" min="5" max="40" step="1" value="10"><output id="gh-b-o"></output></label>
   <label>Plasma oncotic mmHg <input type="range" id="gh-p" min="12" max="35" step="0.5" value="25"><output id="gh-p-o"></output></label></div>
  <div class="svgbox"><svg id="gh" viewBox="0 0 520 260" role="img" aria-label="Glomerular haemodynamics"></svg></div>
  <div class="readout" id="gh-r"></div></div>

 <div class="fig"><h3>Renal autoregulation</h3>
  <div class="seg" id="ra-sel"></div>
  <div class="svgbox"><svg id="ra" viewBox="0 0 520 290" role="img" aria-label="Renal autoregulation"></svg></div>
  <div class="readout" id="ra-r"></div></div>

 <div class="fig"><h3>Renal glucose handling</h3>
  <div class="seg" id="gl-sel"></div>
  <div class="svgbox"><svg id="gl" viewBox="0 0 520 290" role="img" aria-label="Glucose titration curve"></svg></div>
  <div class="readout" id="gl-r"></div></div>

 <div class="fig"><h3>Loop of Henle: countercurrent multiplier</h3>
  <div class="seg" id="lh-sel"></div>
  <div class="svgbox"><svg id="lh" viewBox="0 0 520 380" role="img" aria-label="Loop of Henle osmolalities"></svg></div>
  <div class="readout" id="lh-r"></div></div>
</div>`;

function initDiagrams(){
 const out=(id,t)=>{const o=$("#"+id+"-o");if(o)o.textContent=t};
 const mk=svg=>(t,a,tx)=>{const e=document.createElementNS(SVGNS,t);for(const k in a)e.setAttribute(k,a[k]);if(tx!=null)e.textContent=tx;svg.append(e);return e};

 /* 1. Fluid compartments */
 const FL={sal:["0.9% saline 1 L",1000,308,154,"crys"],hart:["Hartmann's 1 L",1000,273,131,"crys"],d5:["5% dextrose 1 L",1000,0,0,"crys"],dex4:["4%/0.18% 1 L",1000,60,30,"crys"],alb45:["4.5% albumin 1 L",1000,290,140,"col"],alb20:["20% albumin 100 mL",100,135,100,"hyperonc"],hts:["3% saline 250 mL",250,1026,513,"crys"],blood:["Blood loss 1 L",-1000,290,140,"loss"]};
 let flK="sal";
 function drawBF(){const w=+$("#bf-w").value,f=+$("#bf-f").value;out("bf-w",w);out("bf-f",f.toFixed(2));
  const [nm,V,osm,na,kind]=FL[flK],tbw=w*f*1000,icf=tbw*2/3,ecf=tbw/3,pl=ecf/4,isf=ecf-pl;
  let dIcf=0,dIsf=0,dPl=0;
  if(kind==="crys"){const totOsm=290*tbw+osm*V,newOsm=totOsm/(tbw+V),newIcf=290*icf/newOsm,newEcf=tbw+V-newIcf;dIcf=newIcf-icf;dPl=(newEcf-ecf)*0.25;dIsf=(newEcf-ecf)*0.75}
  else if(kind==="col"){dPl=V*0.8;dIsf=V*0.2}
  else if(kind==="hyperonc"){dPl=V*4.5;dIsf=-(V*4.5-V)}
  else if(kind==="loss"){dPl=-1000+300;dIsf=-300}
  const svg=$("#bf");svg.innerHTML="";const add=mk(svg);const sc=440/Math.max(tbw+Math.max(0,V),1);let x=40;
  const bar=(lbl,base,d,col,y)=>{const wd=base*sc,dd=d*sc;add("rect",{x,y,width:wd,height:44,fill:col,opacity:.35});if(d>0)add("rect",{x:x+wd,y,width:dd,height:44,fill:col,opacity:.95});if(d<0)add("rect",{x:x+wd+dd,y,width:-dd,height:44,fill:"var(--bad)",opacity:.6});add("text",{x:x+4,y:y+18,class:"lbl"},lbl);add("text",{x:x+4,y:y+36,"font-size":"11"},`${(base/1000).toFixed(1)} L ${d>=0?"+":""}${Math.round(d)} mL`);const end=x+wd+Math.max(0,dd);x=end+6;return end};
  x=40;bar("ICF",icf,dIcf,"var(--nibp)",40);x=40;bar("Interstitial",isf,dIsf,"var(--spo2)",110);x=40;bar("Plasma",pl,dPl,"var(--abp)",180);
  add("text",{x:40,y:24,class:"lbl"},nm);
  $("#bf-r").innerHTML=`Plasma volume change ≈ <b>${dPl>0?"+":""}${Math.round(dPl)} mL</b>, interstitial ${dIsf>0?"+":""}${Math.round(dIsf)} mL, ICF ${dIcf>0?"+":""}${Math.round(dIcf)} mL at equilibrium. ${kind==="crys"?"Distributed by tonicity (osmotic equilibrium model).":kind==="col"?"Colloid: most stays intravascular initially (less with a damaged glycocalyx).":kind==="hyperonc"?"Hyperoncotic albumin draws interstitial fluid into plasma (~3–4 mL per mL given).":"Acute loss before transcapillary refill (~30% refilled from the interstitium within hours)."}`}
 seg($("#bf-fl"),Object.entries(FL).map(([k,v])=>[k,v[0]]),k=>{flK=k;drawBF()},"sal");["#bf-w","#bf-f"].forEach(s=>$(s).oninput=drawBF);

 /* 2. Davenport */
 const DVP={n:[7.40,5.3],ma:[7.25,3.6],ra:[7.25,8.0],mal:[7.50,6.2],ral:[7.55,3.2],cra:[7.36,8.5]};
 function drawDV(){const ph=+$("#dv-ph").value,c=+$("#dv-c").value;out("dv-ph",ph.toFixed(2));out("dv-c",c.toFixed(1));
  const h=0.23*c*Math.pow(10,ph-6.1);
  const P=plot($("#dv"),{w:520,h:320,x0:6.9,x1:7.7,y0:0,y1:50,xt:[7.0,7.2,7.4,7.6],yt:[0,10,20,30,40,50],xl:"pH",yl:"HCO3⁻ (mmol/L)"});
  P.add("rect",{x:P.X(7.35),y:P.Y(50),width:P.X(7.45)-P.X(7.35),height:P.Y(0)-P.Y(50),fill:"var(--good)",opacity:.08});
  [2.7,4,5.3,8,10.7].forEach(p=>{P.line(range(6.9,7.7,60).map(x=>[x,Math.min(50,0.23*p*Math.pow(10,x-6.1))]),{stroke:p===5.3?"var(--etco2)":"var(--muted)","stroke-width":p===5.3?2:1,"stroke-dasharray":p===5.3?"":"4 4"});const xe=Math.min(7.68,6.1+Math.log10(48/(0.23*p)));P.text(xe,Math.min(49,0.23*p*Math.pow(10,xe-6.1)),p+" kPa",{"font-size":"10",fill:"var(--muted)"})});
  P.line([[7.1,24-(7.4-7.1)*(-12)],[7.7,24+(7.7-7.4)*(-12)]].map(([x,y])=>[x,24+(x-7.4)*(-12)]),{stroke:"var(--nibp)","stroke-dasharray":"6 4","stroke-width":1.5});P.text(7.12,30,"blood buffer line",{fill:"var(--nibp)","font-size":"10"});
  P.dot(7.40,24,"var(--muted)","N",6,-6);P.dot(ph,Math.min(50,h),"var(--abp)","",0,0);
  let d="Normal";if(ph<7.35)d=c>6?(h>26?"Respiratory acidosis, compensating (↑HCO3⁻)":"Respiratory acidosis"+(h<22?" + metabolic acidosis":"")):(h<22?"Metabolic acidosis"+(c<5.0?", respiratory compensation":""):"Acidaemia");
  else if(ph>7.45)d=c<4.6?(h<22?"Respiratory alkalosis, compensating (↓HCO3⁻)":"Respiratory alkalosis"):(h>26?"Metabolic alkalosis"+(c>5.6?", respiratory compensation":""):"Alkalaemia");
  else if(c>6&&h>26)d="Compensated respiratory acidosis or mixed";else if(c<4.6&&h<22)d="Compensated respiratory alkalosis or mixed";
  $("#dv-r").innerHTML=`HCO3⁻ = 0.23 × PaCO2 × 10^(pH − 6.1) = <b>${h.toFixed(1)} mmol/L</b> · ${d}. Moving along a PaCO2 isobar = metabolic change; moving along the buffer line = acute respiratory change.`}
 seg($("#dv-pre"),[["n","Normal"],["ma","Metabolic acidosis"],["ra","Acute resp. acidosis"],["cra","Chronic resp. acidosis"],["mal","Metabolic alkalosis"],["ral","Resp. alkalosis"]],k=>{$("#dv-ph").value=DVP[k][0];$("#dv-c").value=DVP[k][1];drawDV()},"n");["#dv-ph","#dv-c"].forEach(s=>$(s).oninput=drawDV);

 /* 3. Gamblegram */
 const GBP={n:[140,107,1,2,40,5.3],sal:[141,118,1,2,38,5.0],lac:[138,103,8,2,38,3.6],dka:[136,100,1.5,18,40,2.8],alb:[140,107,1,2,15,5.3],vom:[136,86,1,2,42,6.2],mix:[140,103,6,2,18,4.6]};
 function drawGB(){const [na,cl,la,ua,al,c]=["na","cl","la","ua","al","c"].map(k=>+$("#gb-"+k).value);["na","cl","la","ua","al"].forEach(k=>out("gb-"+k,$("#gb-"+k).value));out("gb-c",c.toFixed(1));
  const K=4,Ca=2.4,Mg=1.6,sida=na+K+Ca+Mg-cl-la,phos=1.1;
  // solve for pH: SIDa - ua = HCO3 + Alb- + Pi-
  const albCharge=ph=>al*(0.123*ph-0.631),piCharge=ph=>phos*(0.309*ph-0.469),hco=ph=>0.23*c*Math.pow(10,ph-6.1);
  let lo=6.6,hi=7.9;for(let i=0;i<60;i++){const m=(lo+hi)/2;(hco(m)+albCharge(m)+piCharge(m))>(sida-ua)?hi=m:lo=m}const ph=(lo+hi)/2,H=hco(ph),A=albCharge(ph)+piCharge(ph);
  const ag=na-cl-H,cag=ag+0.25*(40-al),sig=sida-(H+A)-0;
  const svg=$("#gb");svg.innerHTML="";const add=mk(svg);const s=1.6,base=300;
  const stack=(x,items,lbl)=>{let y=base;items.forEach(([n,v,col])=>{if(v<=0)return;const hh=v*s;add("rect",{x,y:y-hh,width:120,height:hh,fill:col,opacity:.75,stroke:"var(--panel)"});if(hh>13)add("text",{x:x+60,y:y-hh/2+4,"text-anchor":"middle","font-size":"11",fill:"var(--ink)"},`${n} ${v.toFixed(v<10?1:0)}`);y-=hh});add("text",{x:x+60,y:base+18,"text-anchor":"middle",class:"lbl"},lbl)};
  stack(80,[["Na⁺",na,"var(--spo2)"],["K⁺ Ca²⁺ Mg²⁺",K+Ca+Mg,"var(--nibp)"]],"Cations");
  stack(230,[["Cl⁻",cl,"var(--ecg)"],["HCO3⁻",H,"var(--etco2)"],["Alb⁻ + Pi⁻",A,"var(--muted)"],["Lactate",la,"var(--abp)"],["Unmeasured",ua,"var(--bad)"]],"Anions");
  const gx=420;add("text",{x:gx,y:40,class:"lbl"},"Stewart");
  [["Apparent SID",sida],["Effective SID (HCO3⁻ + A⁻)",H+A],["Strong ion gap",sida-(H+A)],["A_TOT (albumin)",al]].forEach(([l,v],i)=>{add("text",{x:gx,y:70+i*26,"font-size":"12"},`${l}: ${v.toFixed(1)}`)});
  add("text",{x:gx,y:190,class:"lbl"},"Bicarbonate approach");
  [["pH",ph.toFixed(2)],["HCO3⁻",H.toFixed(1)],["Anion gap (Na − Cl − HCO3)",ag.toFixed(1)],["Albumin-corrected AG",cag.toFixed(1)]].forEach(([l,v],i)=>add("text",{x:gx,y:218+i*24,"font-size":"12"},`${l}: ${v}`));
  const msg=ph<7.35?"Acidaemia":ph>7.45?"Alkalaemia":"Normal pH";
  $("#gb-r").innerHTML=`<b>${msg}</b> (pH ${ph.toFixed(2)}). ${sida<38?"Low SID (Cl⁻, lactate or low Na⁺) → acidosis. ":sida>44?"High SID → alkalosis. ":""}${ua>3?"Unmeasured anions widen the anion gap and the strong ion gap. ":""}${al<30?"Low albumin lowers A_TOT (alkalinising) and hides anions: use the corrected AG. ":""}pH is solved from electroneutrality with the PaCO2 you set.`}
 seg($("#gb-pre"),[["n","Normal"],["sal","Saline excess"],["lac","Lactic acidosis"],["dka","DKA"],["alb","Hypoalbuminaemia"],["vom","Vomiting"],["mix","ICU mixed"]],k=>{const v=GBP[k];["na","cl","la","ua","al","c"].forEach((id,i)=>$("#gb-"+id).value=v[i]);drawGB()},"n");["na","cl","la","ua","al","c"].forEach(k=>$("#gb-"+k).oninput=drawGB);

 /* 4. Buffer titration */
 function drawBT(){const ph=+$("#bt-ph").value;out("bt-ph",ph.toFixed(2));
  const B=[["Bicarbonate",6.1,"var(--etco2)"],["Phosphate",6.8,"var(--nibp)"],["Histidine (Hb)",6.8,"var(--abp)"],["Ammonia",9.2,"var(--spo2)"],["Lactate",3.9,"var(--ecg)"]];
  const P=plot($("#bt"),{x0:3,x1:11,y0:0,y1:100,xt:[3,4,5,6,7,8,9,10,11],yt:[0,25,50,75,100],xl:"pH",yl:"% in base (A⁻) form"});
  P.add("line",{x1:P.X(7.4),x2:P.X(7.4),y1:P.Y(0),y2:P.Y(100),stroke:"var(--muted)","stroke-dasharray":"4 4"});P.text(7.45,96,"7.4");
  B.forEach(([n,pk,col])=>{if(pk===6.8&&n.startsWith("Hist"))return;P.line(range(3,11,120).map(x=>[x,100/(1+Math.pow(10,pk-x))]),{stroke:col});P.text(pk+0.05,n==="Phosphate"?40:52,n,{fill:col,"font-size":"11"})});
  P.add("line",{x1:P.X(ph),x2:P.X(ph),y1:P.Y(0),y2:P.Y(100),stroke:"var(--ink)","stroke-width":1.5});
  $("#bt-r").innerHTML=B.map(([n,pk])=>`${n} (pKa ${pk}): A⁻/HA = ${Math.pow(10,ph-pk)>=100?Math.pow(10,ph-pk).toFixed(0):Math.pow(10,ph-pk).toFixed(2)}`).join(" · ")+`. Best buffering where the curve is flattest (pH = pKa ± 1).`}
 $("#bt-ph").oninput=drawBT;drawBT();

 /* 5. Glomerular haemodynamics */
 const GHP={n:[93,1,1,10,25,"Normal: Pgc ~49, RPF ~650, GFR ~125, FF ~19%."],hem:[70,1.6,1.9,10,25,"Haemorrhage: sympathetic afferent constriction and angiotensin II efferent constriction keep GFR better than RPF (FF rises)."],acei:[85,1.3,0.55,10,25,"ACE inhibitor in renal artery stenosis/hypovolaemia: efferent dilatation collapses Pgc and GFR."],nsaid:[80,2.0,1.6,10,25,"NSAID in hypovolaemia: no prostaglandin afferent dilatation; afferent constriction lowers RPF and GFR."],obs:[93,1,1,30,25,"Ureteric obstruction: raised Bowman's pressure stops filtration."],alb:[93,1,1,10,15,"Low plasma oncotic pressure: GFR rises a little."]};
 function setGH(k){const v=GHP[k];["m","a","e","b","p"].forEach((id,i)=>$("#gh-"+id).value=v[i]);$("#gh-r").dataset.note=v[5];drawGH()}
 function drawGH(){const M=+$("#gh-m").value,Ra=+$("#gh-a").value,Re=+$("#gh-e").value*0.9,PB=+$("#gh-b").value,pa=+$("#gh-p").value;out("gh-m",M);out("gh-a",(+$("#gh-a").value).toFixed(2));out("gh-e",(+$("#gh-e").value).toFixed(2));out("gh-b",PB);out("gh-p",pa);
  const Pv=10,Pgc=Pv+(M-Pv)*Re/(Ra+Re),rpf=(M-Pv)/(Ra+Re)*14.9*(1.9/1.9),Kf=11.3;
  let ff=0.19,gfr=0;for(let i=0;i<40;i++){const pe=pa/(1-Math.min(ff,0.6));const pav=(pa+pe)/2;gfr=Math.max(0,Kf*(Pgc-PB-pav));ff=Math.min(0.6,gfr/Math.max(rpf,1))}
  const svg=$("#gh");svg.innerHTML="";const add=mk(svg);
  const bars=[["Pgc mmHg",Pgc,80,"var(--abp)"],["RPF mL/min",rpf,1200,"var(--nibp)"],["GFR mL/min",gfr,200,"var(--spo2)"],["FF %",ff*100,40,"var(--etco2)"]];
  bars.forEach(([l,v,mx,col],i)=>{const y=30+i*55;add("text",{x:20,y:y+18,class:"lbl"},l);add("rect",{x:150,y,width:330,height:26,fill:"var(--soft)",rx:4});add("rect",{x:150,y,width:Math.max(2,Math.min(330,v/mx*330)),height:26,fill:col,rx:4,opacity:.85});add("text",{x:156,y:y+18,"font-size":"12",fill:"var(--ink)"},v.toFixed(0))});
  $("#gh-r").innerHTML=`${$("#gh-r").dataset.note||""} Model: series resistances (no autoregulation), oncotic pressure rising along the capillary with filtration fraction.`}
 seg($("#gh-pre"),[["n","Normal"],["hem","Haemorrhage + AII"],["acei","ACE inhibitor"],["nsaid","NSAID + hypovolaemia"],["obs","Obstruction"],["alb","Hypoalbuminaemia"]],setGH,"n");["m","a","e","b","p"].forEach(k=>$("#gh-"+k).oninput=()=>{$("#gh-r").dataset.note="";drawGH()});

 /* 6. Renal autoregulation */
 const RA={n:["Normal",75,170,"RBF and GFR held constant between MAP ~75 and 170 mmHg by the myogenic response and TGF. Urine output is not autoregulated: it keeps rising with pressure (pressure natriuresis)."],ht:["Chronic hypertension",95,200,"Curve shifted right: 'normal' anaesthetic MAPs may be below the lower limit."],aki:["AKI / sepsis",0,0,"Autoregulation impaired: flow becomes pressure-passive, so hypotension further injures the kidney."]};
 function drawRA(k){const [nm,lo,hi,txt]=RA[k];const P=plot($("#ra"),{w:520,h:290,x0:0,x1:220,y0:0,y1:1.6,xt:[0,50,100,150,200],yt:[0,0.5,1,1.5],xl:"Mean arterial pressure (mmHg)",yl:"Fraction of normal"});
  const rbf=m=>lo===0?m/93:m<lo?m/lo:m>hi?1+(m-hi)/120:1,gfr=m=>lo===0?Math.max(0,(m-35)/58):m<lo?Math.max(0,(m-40)/(lo-40)):m>hi?1+(m-hi)/200:1,uo=m=>Math.max(0,(m-50)/43)*Math.min(1.6,1+(m-93)/150);
  P.line(range(0,220).map(m=>[m,Math.min(1.6,rbf(m))]),{stroke:"var(--nibp)"});P.line(range(0,220).map(m=>[m,Math.min(1.6,gfr(m))]),{stroke:"var(--spo2)","stroke-dasharray":"6 3"});P.line(range(50,220).map(m=>[m,Math.min(1.6,uo(m))]),{stroke:"var(--etco2)","stroke-width":1.6});
  P.text(180,Math.min(1.5,rbf(180))+0.08,"RBF",{fill:"var(--nibp)"});P.text(150,Math.min(1.5,gfr(150))-0.1,"GFR",{fill:"var(--spo2)"});P.text(160,1.5,"urine flow",{fill:"var(--etco2)"});
  $("#ra-r").innerHTML=`<b>${nm}.</b> ${txt}`}
 seg($("#ra-sel"),Object.entries(RA).map(([k,v])=>[k,v[0]]),drawRA,"n");

 /* 7. Glucose */
 const GL={n:["Normal",11,375,"Threshold ~10–11 mmol/L; Tmax ~375 mg/min. Splay (gradual curve) because nephrons differ in Tmax."],sglt:["SGLT2 inhibitor",4,190,"Threshold falls to ~4 mmol/L: glycosuria at normal glucose; risk of euglycaemic DKA when fasting or stressed."],preg:["Pregnancy",8,330,"Higher GFR and lower threshold: glycosuria is common and not diagnostic of diabetes."]};
 function drawGL(k){const [nm,thr,tm,txt]=GL[k];const P=plot($("#gl"),{w:520,h:290,x0:0,x1:30,y0:0,y1:900,xt:[0,5,10,15,20,25,30],yt:[0,300,600,900],xl:"Plasma glucose (mmol/L)",yl:"mg/min"});
  const filt=g=>g*18*1.25,re=g=>{const f=filt(g);const t=thr*18*1.25;if(f<t)return f;return tm-(tm-t)*Math.exp(-(f-t)/((tm-t)*0.9))};
  P.line(range(0,30).map(g=>[g,filt(g)]),{stroke:"var(--ink)"});P.line(range(0,30).map(g=>[g,re(g)]),{stroke:"var(--spo2)"});P.line(range(0,30).map(g=>[g,filt(g)-re(g)]),{stroke:"var(--abp)"});
  P.text(24,filt(24)+20,"filtered",{fill:"var(--ink)"});P.text(22,tm+30,"reabsorbed (Tmax)",{fill:"var(--spo2)"});P.text(22,filt(22)-re(22)-40,"excreted",{fill:"var(--abp)"});
  $("#gl-r").innerHTML=`<b>${nm}.</b> ${txt}`}
 seg($("#gl-sel"),Object.entries(GL).map(([k,v])=>[k,v[0]]),drawGL,"n");

 /* 8. Loop of Henle */
 const LH={adh:["Maximal ADH (dehydration)",[300,600,900,1200],100,1200,"Collecting duct water reabsorption follows the gradient: small volume of urine at ~1200 mOsm/kg. Urea recycling adds to the inner medulla."],noadh:["No ADH (water load or DI)",[300,500,700,900],100,60,"Collecting duct impermeable: dilute urine ~50–100 mOsm/kg; gradient partly washed out by high flow."],loop:["Loop diuretic",[300,350,380,400],280,330,"NKCC2 blocked: no single effect, medullary gradient collapses, so urine cannot be concentrated or diluted (isosthenuria-like)."]};
 function drawLH(k){const [nm,lv,tal,cd,txt]=LH[k];const svg=$("#lh");svg.innerHTML="";const add=mk(svg);
  const top=40,step=75;["Cortex","Outer medulla","","Inner medulla"].forEach((l,i)=>{add("rect",{x:20,y:top+i*step,width:480,height:step,fill:i===0?"var(--panel)":"var(--soft)",opacity:i===0?1:0.4+0.15*i});if(l)add("text",{x:26,y:top+i*step+14,"font-size":"10"},l)});
  lv.forEach((o,i)=>add("text",{x:470,y:top+i*step+44,"text-anchor":"end","font-size":"12",fill:"var(--etco2)"},o));add("text",{x:470,y:top-8,"text-anchor":"end","font-size":"11"},"interstitium mOsm/kg");
  add("path",{d:`M140 ${top} L140 ${top+4*step-10} Q160 ${top+4*step+10} 180 ${top+4*step-10} L180 ${top+60}`,fill:"none",stroke:"var(--spo2)","stroke-width":6,"stroke-linecap":"round"});
  add("path",{d:`M180 ${top+60} L180 ${top}`,fill:"none",stroke:"var(--abp)","stroke-width":9});
  add("path",{d:`M300 ${top} L300 ${top+4*step-10}`,fill:"none",stroke:k==="noadh"?"var(--muted)":"var(--nibp)","stroke-width":8});
  add("text",{x:90,y:top+20,"font-size":"11"},"300");add("text",{x:110,y:top+4*step-4,"font-size":"11"},lv[3]);add("text",{x:190,y:top+20,"font-size":"11"},tal);add("text",{x:310,y:top+4*step+16,"font-size":"12",fill:"var(--nibp)"},"urine "+cd);
  add("text",{x:60,y:top+150,"font-size":"10",fill:"var(--spo2)"},"descending:");add("text",{x:60,y:top+163,"font-size":"10",fill:"var(--spo2)"},"water out");
  add("text",{x:188,y:top+80,"font-size":"10",fill:"var(--abp)"},"thick ascending:");add("text",{x:188,y:top+93,"font-size":"10",fill:"var(--abp)"},"NaCl out (NKCC2),");add("text",{x:188,y:top+106,"font-size":"10",fill:"var(--abp)"},"no water");
  add("text",{x:310,y:top+150,"font-size":"10",fill:"var(--nibp)"},"collecting duct:");add("text",{x:310,y:top+163,"font-size":"10",fill:"var(--nibp)"},k==="noadh"?"impermeable (no AQP2)":"water out via AQP2");
  $("#lh-r").innerHTML=`<b>${nm}.</b> ${txt}`}
 seg($("#lh-sel"),Object.entries(LH).map(([k,v])=>[k,v[0]]),drawLH,"adh");
}

ATLAS.register({id:"04",name:"Renal, fluids, acid–base",
  lede:"Renal physiology, body fluids, electrolytes and acid–base.",
  barsNote:"",
  bars:BARS,fam:FAM,slides:SLIDES,calcs:CALCS,tables:TABLES,cards:CARDS,fcf:FCF,viva:VIVA,quiz:QUIZ,crisis:CRISIS,
  sources:SRC,errata:ERR,refs:REFS,diagHTML:DIAG,initDiagrams,
  diagLede:"Eight live diagrams: fluid distribution, Davenport, a Stewart Gamblegram, buffer curves, glomerular haemodynamics, autoregulation, glucose handling and the loop of Henle."});
})();
