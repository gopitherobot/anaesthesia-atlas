/* Stage 05 · Liver, endocrine, metabolism, temperature */
(function(){
const {plot,range,el,SVGNS,fmt,$,$$,seg}=ATLAS.h;

const BARS=[];

const FAM={met:["spo2","Metabolism"],endo:["etco2","Endocrine"],liver:["nibp","Liver & gut"],temp:["abp","Temperature"],app:["ecg","Applied"]};

const SLIDES=[
{f:"met",t:"Carbohydrate metabolism",b:`<ul class="clean"><li>Glucose enters cells via GLUT transporters: GLUT1 (RBC, brain, BBB), GLUT2 (liver, β-cells, kidney: bidirectional, high capacity), GLUT3 (neurons), <b>GLUT4</b> (muscle and fat: insulin-dependent). Phosphorylated to glucose-6-phosphate by hexokinase (most tissues) or glucokinase (liver, β-cells).</li>
<li><b>Glycolysis</b> (Embden–Meyerhof, cytoplasm): glucose → 2 pyruvate, net 2 ATP + 2 NADH. Rate-limiting enzyme phosphofructokinase-1. Without O2, pyruvate → lactate (regenerates NAD⁺).</li>
<li><b>Link reaction</b>: pyruvate dehydrogenase (needs thiamine) → acetyl-CoA in mitochondria.</li>
<li><b>TCA (Krebs) cycle</b>: acetyl-CoA + oxaloacetate (C4) → citrate (C6) → α-ketoglutarate (C5) → succinate (C4) → oxaloacetate. Per turn: 3 NADH, 1 FADH2, 1 GTP, 2 CO2.</li>
<li><b>Oxidative phosphorylation</b>: electrons pass down the electron transport chain to O2; the proton gradient drives ATP synthase. Total ≈ 30–32 ATP per glucose (older texts: 36–38). Cyanide blocks cytochrome oxidase; uncouplers (dinitrophenol) waste the gradient as heat.</li>
<li><b>Pentose phosphate pathway</b> (HMP shunt): NADPH (glutathione reduction, fatty acid synthesis) and ribose; no ATP. G6PD deficiency → haemolysis with oxidant drugs.</li>
<li><b>Glycogen</b>: ~400–500 g (liver ~100 g, used to maintain blood glucose; muscle ~300–400 g, used locally because muscle lacks glucose-6-phosphatase).</li>
<li><b>Gluconeogenesis</b> (liver, kidney): from lactate (Cori cycle), alanine (glucose–alanine cycle), glycerol; costs 6 ATP per glucose. Stimulated by glucagon, cortisol, adrenaline; inhibited by insulin.</li></ul>`,
p:"Brain, red cells and renal medulla depend on glucose. The brain uses ~120 g/day, which is why gluconeogenesis and later ketones are the priority in starvation.",
v:"Asked in EDAIC as 'glucose metabolism: glycogenolysis, gluconeogenesis, glycolysis, TCA cycle and HMP shunt in detail'. Draw the map (Diagrams tab) and walk round it."},
{f:"met",t:"Fat and protein metabolism, ketones and urea",b:`<ul class="clean"><li><b>Lipolysis</b>: hormone-sensitive lipase (activated by catecholamines, glucagon, cortisol, GH; inhibited by insulin) → free fatty acids + glycerol. Glycerol enters glycolysis or gluconeogenesis as dihydroxyacetone phosphate.</li>
<li><b>β-oxidation</b> in mitochondria (long chains need the carnitine shuttle, CPT-1 inhibited by malonyl-CoA after meals) → acetyl-CoA. Fat yields ~9 kcal/g vs 4 kcal/g for carbohydrate and protein.</li>
<li><b>Ketogenesis</b> (liver only) when acetyl-CoA exceeds oxaloacetate availability (low insulin, high glucagon): acetoacetate and β-hydroxybutyrate (and acetone, exhaled). Used by brain, heart, muscle, kidney; the liver cannot use them. Normal &lt; 0.6 mmol/L; starvation 3–7; DKA &gt; 3 with acidosis.</li>
<li><b>Lipogenesis</b>: from excess acetyl-CoA, stimulated by insulin (RQ &gt; 1 when carbohydrate is converted to fat: more CO2 to clear).</li>
<li><b>Protein</b>: ~10–12 kg, no storage form, so every gram lost is functional tissue. Amino acids are transaminated (ALT, AST need pyridoxine); the amino group goes to the <b>urea cycle</b> in the liver (ornithine → citrulline → arginine → urea, 3 ATP per urea). Carbon skeletons are glucogenic (most) or ketogenic (leucine, lysine).</li>
<li>Nitrogen balance: 6.25 g protein contains 1 g nitrogen. Urinary urea nitrogen estimates catabolism.</li></ul>`,
p:"Propofol infusion syndrome: impaired fatty acid oxidation and mitochondrial electron transport → lactic acidosis, rhabdomyolysis, hyperkalaemia, cardiac failure. Risk with > 4 mg/kg/h for > 48 h, low carbohydrate intake, catecholamines, steroids.",
v:"Lipolysis → β-oxidation → TCA or ketones, then protein turnover and urea, with energy yields."},
{f:"met",t:"Insulin, glucagon and glucose control",b:`<ul class="clean"><li><b>Insulin</b>: β-cells; 51 amino acids (A and B chains joined by disulphide bridges, from proinsulin with C-peptide). Glucose enters via GLUT2 → ATP rises → K<sub>ATP</sub> channels close (sulphonylurea target) → depolarisation → Ca²⁺ entry → release. Biphasic: rapid first phase (stored), slower second phase. Also stimulated by amino acids, incretins (GLP-1, GIP), vagus, β2; inhibited by α2, somatostatin, catecholamines.</li>
<li>Acts via a tyrosine kinase receptor. Effects: GLUT4 translocation, glycogen synthesis, lipogenesis, protein synthesis, K⁺ into cells; inhibits gluconeogenesis, lipolysis, ketogenesis, proteolysis. Half-life ~5 min; cleared by liver (~50% first pass) and kidney.</li>
<li><b>Glucagon</b> (α-cells, 29 aa, Gs-coupled): glycogenolysis, gluconeogenesis, ketogenesis. Stimulated by hypoglycaemia, amino acids, stress; also positive inotrope (bypasses β-receptors: β-blocker overdose) and relaxes the sphincter of Oddi.</li>
<li><b>Counter-regulatory hormones</b> (raise glucose): glucagon and adrenaline (minutes), cortisol and growth hormone (hours).</li>
<li>Normal fasting glucose 4–6 mmol/L. Symptoms of hypoglycaemia below ~3; neuroglycopenia below ~2.8. Under GA the autonomic warning signs are masked.</li></ul>`,
p:"Perioperative target glucose 6–10 mmol/L (acceptable 4–12). Avoid hypoglycaemia more than mild hyperglycaemia; tight control (4.4–6.1) increased death in ICU (NICE-SUGAR).",
v:"Synthesis and secretion of insulin with the K<sub>ATP</sub> mechanism, actions by tissue, then glucagon and counter-regulation."},
{f:"met",t:"Starvation",b:`<p>Aim of the response: keep glucose supply to brain and red cells while sparing protein.</p>
<ul class="clean"><li><b>Energy stores (70 kg)</b>: glycogen ~1600 kcal (lasts ~24 h), mobilisable protein ~24 000 kcal, fat ~135 000 kcal (lasts weeks). Resting needs 1600–2000 kcal/day.</li>
<li><b>0–24 h</b>: insulin falls, glucagon rises → glycogenolysis; gluconeogenesis starts from lactate, alanine and glycerol.</li>
<li><b>1–3 days</b>: glycogen exhausted; gluconeogenesis peaks using amino acids (~75 g protein/day lost); lipolysis increases.</li>
<li><b>&gt; 3 days</b>: ketogenesis accelerates (ketones 3–7 mmol/L); the brain takes ~30% of its energy from ketones by day 3 and ~70% after a few weeks, so protein loss falls to ~20 g/day. T3 falls (reverse T3 rises), metabolic rate falls ~20%, sympathetic tone falls.</li>
<li><b>Death</b> after ~60–70 days in a non-obese adult, usually from pneumonia once ~half the muscle mass is lost.</li>
<li><b>Protein-sparing effect of glucose</b>: ~100 g/day of glucose sharply reduces gluconeogenesis from protein (insulin effect).</li></ul>
<p><b>Preoperative fasting</b>: clear fluids until 2 h (UK practice increasingly allows sips of clear fluid up to 1 h, and children until 1 h), food 6 h; carbohydrate loading in ERAS reduces insulin resistance.</p>`,
p:"Refeeding syndrome: when feeding restarts, insulin drives phosphate, K⁺ and Mg²⁺ into cells and thiamine is consumed. Start at ~10 kcal/kg/day in high-risk patients, give thiamine before feeding, monitor electrolytes.",
v:"Classify by time, give stores in kcal, then hormonal changes, then the brain's switch to ketones and the protein-sparing story."},
{f:"met",t:"The stress response to surgery",b:`<p>Neuroendocrine, metabolic, immunological and haematological changes, proportional to the size of injury. Triggered by afferent nerve input from the wound and by cytokines.</p>
<div class="tbl"><table><tr><th>Increased</th><th>Decreased or unchanged</th></tr><tr><td>Catecholamines (minutes), cortisol (hours, loses feedback), ACTH, GH, ADH, prolactin, glucagon, renin–angiotensin–aldosterone, β-endorphin, IL-6 (peak 12–24 h), acute phase proteins (CRP, fibrinogen)</td><td>Insulin (relative deficiency and resistance), testosterone, oestrogen, T3 (sick euthyroid), TSH, LH, FSH unchanged or down, albumin (negative acute phase protein)</td></tr></table></div>
<ul class="clean"><li><b>Metabolic</b>: hyperglycaemia (gluconeogenesis + insulin resistance), protein catabolism (negative nitrogen balance, muscle loss), lipolysis, Na⁺ and water retention, K⁺ loss.</li>
<li><b>Phases</b>: ebb (first 24 h, hypometabolic), catabolic flow (days), anabolic recovery (weeks).</li>
<li><b>Haematological</b>: hypercoagulability, leucocytosis, lymphopenia; immunosuppression.</li>
<li><b>Modification</b>: neuraxial block (lumbar epidural for lower abdominal and limb surgery abolishes the hormonal response; less effective for upper abdominal surgery and does not block the cytokine response), high-dose opioids, minimally invasive surgery, normothermia, glucose control, ERAS (carbohydrate loading, early feeding and mobilisation). Etomidate suppresses cortisol synthesis. α2 agonists and β-blockers blunt the sympathetic arm.</li></ul>`,
p:"The stress response once protected an injured animal. In surgical patients it mostly causes harm: myocardial ischaemia, hyperglycaemia and infection, VTE, muscle loss, fluid retention.",
v:"Define, then classify (endocrine, metabolic, cytokine, haematological), then phases, then ways to modify it. EDAIC asked 'surgery stress response' directly."},
{f:"met",t:"Nutrition in the critically ill and parenteral nutrition",b:`<ul class="clean"><li><b>Energy</b>: ~20–25 kcal/kg/day in the acute phase (avoid overfeeding in the first days), rising to 25–30 kcal/kg/day in recovery. Indirect calorimetry is the reference. Burns and sepsis increase needs.</li>
<li><b>Protein</b>: 1.3 g/kg/day (range 1.2–2.0), more in burns and on CRRT.</li>
<li><b>Water</b> ~30 mL/kg/day; Na⁺, K⁺ ~1 mmol/kg/day; plus Mg²⁺, phosphate, Ca²⁺, trace elements and vitamins (thiamine).</li>
<li><b>Route</b>: enteral within 24–48 h if the gut works (trophic benefit, fewer infections). Parenteral if enteral is impossible or insufficient after ~3–7 days, or earlier if malnourished.</li>
<li><b>PN composition</b>: glucose (limit to ≤ 4–5 mg/kg/min: hyperglycaemia, CO2 load, fatty liver), lipid emulsion (~9 kcal/g; 20% emulsion ~2 kcal/mL: essential fatty acids; propofol is 10% lipid = 1.1 kcal/mL), amino acids (4 kcal/g).</li>
<li><b>Complications of PN</b>: line sepsis, thrombosis, hyperglycaemia, refeeding, hypertriglyceridaemia, cholestasis and liver dysfunction, metabolic bone disease.</li></ul>`,
p:"Typical exam questions: 'calculate the nutritional requirements of a 70 kg critically ill patient; total volume of water; other components'. Use the calculator in the Formulas tab and answer in the order energy, protein, water, electrolytes, micronutrients.",
v:"Assessment (history, BMI, weight loss, NUTRIC/MUST), requirements with numbers, route, monitoring, complications."},
{f:"endo",t:"Hormones and the hypothalamic–pituitary axis",b:`<ul class="clean"><li><b>Hormone classes</b>: peptides (insulin, GH, ADH; water-soluble, membrane receptors, short half-life), amines (catecholamines on membrane receptors; thyroid hormones on nuclear receptors), steroids (cortisol, aldosterone, sex steroids; lipid-soluble, carried on proteins, intracellular receptors altering gene transcription).</li>
<li><b>Receptors</b>: G-protein coupled (Gs, Gi, Gq), tyrosine kinase (insulin, IGF-1), JAK-STAT (GH, prolactin, EPO), nuclear (steroids, T3, vitamin D).</li>
<li><b>Pituitary</b>: in the sella turcica below the optic chiasm, cavernous sinuses lateral. <b>Anterior</b> (adenohypophysis, from Rathke's pouch): ACTH, TSH, GH, prolactin, LH, FSH, controlled by hypothalamic hormones via the hypophyseal portal veins (CRH, TRH, GHRH, GnRH; inhibitors somatostatin and dopamine). <b>Posterior</b> (neurohypophysis): ADH and oxytocin made in supraoptic and paraventricular nuclei, carried down axons.</li>
<li><b>Negative feedback</b> (long loop on hypothalamus and pituitary) is the rule; positive feedback is rare (LH surge, oxytocin in labour).</li>
<li><b>Growth hormone</b>: anabolic via IGF-1 but anti-insulin (lipolysis, gluconeogenesis); raised in stress, sleep, hypoglycaemia. Acromegaly: macroglossia, enlarged epiglottis and larynx, OSA, difficult mask ventilation and intubation, cardiomyopathy, diabetes.</li></ul>`,
p:"After pituitary surgery watch for diabetes insipidus (often triphasic: DI, then SIADH, then permanent DI) and give hydrocortisone cover if the ACTH axis is at risk.",
v:"Classify hormones by structure and receptor, then the anterior and posterior pituitary with their control, then feedback."},
{f:"endo",t:"Thyroid",b:`<ul class="clean"><li>Gland ~20 g in the pretracheal fascia; isthmus over tracheal rings 2–4. Blood supply: superior thyroid artery (external carotid), inferior thyroid artery (thyrocervical trunk); recurrent laryngeal nerve near the inferior artery, external branch of the superior laryngeal nerve near the superior pole.</li>
<li><b>Synthesis</b>: iodide trapped by the Na⁺/I⁻ symporter → oxidised by thyroid peroxidase (TPO) → iodinates tyrosine residues on thyroglobulin (MIT, DIT) → coupling (DIT+DIT = T4; MIT+DIT = T3) → stored as colloid → endocytosed and released. Carbimazole and PTU block TPO; PTU also blocks peripheral T4 → T3; iodide (Wolff–Chaikoff) blocks release acutely.</li>
<li>T4 (~90% of secretion, half-life ~7 days) is converted to active T3 (half-life ~1 day) by deiodinases. &gt; 99% protein-bound (TBG, transthyretin, albumin).</li>
<li><b>Actions</b> (nuclear receptors): ↑BMR, O2 use and heat production, ↑β-receptor number (tachycardia, contractility), ↑ventilatory drive, growth and CNS development, carbohydrate and lipid turnover.</li>
<li><b>Hyperthyroidism</b>: Graves' (TSH-receptor antibodies), toxic nodules, thyroiditis, amiodarone. Make euthyroid before elective surgery (carbimazole for 6–8 weeks, β-blockers; Lugol's iodine 10 days before thyroidectomy). Thyroid storm can follow surgery, infection, labour.</li>
<li><b>Hypothyroidism</b>: Hashimoto's, post-treatment, amiodarone, lithium. Sensitive to sedatives and opioids, hypothermia, hypoventilation, hyponatraemia, bradycardia, pericardial effusion, macroglossia. Myxoedema coma needs IV levothyroxine/liothyronine with hydrocortisone.</li></ul>`,
p:"Goitre: assess for tracheal deviation or compression (CT), retrosternal extension, voice change (RLN). Post-thyroidectomy stridor: haematoma (open the wound at the bedside), bilateral RLN palsy, hypocalcaemia, tracheomalacia.",
v:"Anatomy with nerves, synthesis with drug sites, transport, actions, then hyper/hypo with anaesthetic implications."},
{f:"endo",t:"Adrenal cortex: cortisol and aldosterone",b:`<ul class="clean"><li>Adrenals at T12 on the upper poles of the kidneys; very high flow per gram (superior suprarenal from inferior phrenic, middle from aorta, inferior from renal artery); left adrenal vein drains to the left renal vein, right directly to the IVC.</li>
<li><b>Cortex zones</b> ("GFR: salt, sugar, sex"): glomerulosa → aldosterone; fasciculata → cortisol; reticularis → androgens.</li>
<li><b>Steroidogenesis</b>: cholesterol → (StAR protein, side-chain cleavage, rate-limiting) pregnenolone → … 21-hydroxylase and <b>11β-hydroxylase</b> (inhibited by etomidate and metyrapone) → cortisol / corticosterone → aldosterone synthase → aldosterone.</li>
<li><b>Cortisol</b> (15–30 mg/day; peaks early morning; ~90% bound to cortisol-binding globulin): raises glucose (gluconeogenesis, insulin antagonism), protein catabolism, lipolysis, permissive for catecholamine vasoconstriction, anti-inflammatory and immunosuppressive, some mineralocorticoid effect, suppresses T4 → T3. Rises to 75–150 mg/day in major surgery.</li>
<li><b>HPA axis</b>: CRH → ACTH → cortisol, with negative feedback; overridden by stress and circadian rhythm. Exogenous steroids suppress it: patients on ≥ 5 mg prednisolone for &gt; 4 weeks (or recently stopped) need perioperative cover.</li>
<li><b>Aldosterone</b>: regulated by angiotensin II and plasma K⁺ (ACTH minor). Acts on ENaC and Na⁺/K⁺-ATPase in collecting duct principal cells.</li>
<li>Addison's (primary insufficiency): weakness, hypotension, hyponatraemia, hyperkalaemia, hypoglycaemia, pigmentation. Cushing's: hypertension, diabetes, obesity, fragile skin, osteoporosis, OSA, difficult IV access.</li></ul>`,
p:"Perioperative steroid cover (AAGBI/SfE 2020): major surgery hydrocortisone 100 mg IV at induction then 200 mg per 24 h by infusion (or 50 mg IM 6-hourly) until eating, then double the usual oral dose for 48 h (up to a week after major surgery).",
v:"Anatomy, zones and products, steroidogenesis with the etomidate site, cortisol actions grouped (metabolic, CVS, anti-inflammatory, other), the HPA axis, aldosterone control."},
{f:"endo",t:"Adrenal medulla and phaeochromocytoma",b:`<ul class="clean"><li>Medulla = modified sympathetic ganglion of neural crest chromaffin cells; preganglionic cholinergic fibres (nicotinic). Releases adrenaline ~80%, noradrenaline ~20% (PNMT is induced by cortisol arriving via the corticomedullary portal blood).</li>
<li><b>Synthesis</b>: tyrosine → (tyrosine hydroxylase, rate-limiting) DOPA → (DOPA decarboxylase) dopamine → (dopamine β-hydroxylase) noradrenaline → (PNMT) adrenaline. Metabolised by COMT and MAO to metanephrines and VMA.</li>
<li><b>Phaeochromocytoma</b> (and paraganglioma): episodic headache, sweating, palpitations, hypertension; associations: MEN 2, VHL, NF1, SDH mutations. Diagnosis: plasma free metanephrines; imaging (CT/MRI, MIBG or PET).</li>
<li><b>Preparation</b>: α-blockade first (phenoxybenzamine non-competitive, or doxazosin) for 10–14 days with high salt and fluid intake to restore volume; β-blockade only after α-blockade (otherwise unopposed α vasoconstriction → crisis). Targets (Roizen): BP &lt; 160/90 for 24 h, orthostatic hypotension (not &lt; 80/45), ECG free of ST changes, ≤ 1 ectopic per 5 min.</li>
<li><b>Intraoperative</b>: arterial line before induction, deep anaesthesia, avoid triggers (histamine releasers, ketamine, ephedrine, metoclopramide, droperidol, desflurane surges, tumour handling). Treat surges with phentolamine, SNP, GTN, magnesium, esmolol, clevidipine. After tumour vein ligation: hypotension (catecholamine withdrawal, residual blockade) needing fluids and noradrenaline/vasopressin; hypoglycaemia (rebound insulin).</li></ul>`,
p:"EDAIC 2023: 54-year-old heavy smoker with an adrenal mass, hot flushes and breathlessness. Think phaeochromocytoma (or catecholamine cardiomyopathy) vs carcinoid vs metastatic lung cancer; investigate before anaesthesia.",
v:"Physiology of the medulla, catecholamine synthesis (rate-limiting step), then phaeochromocytoma: diagnosis, preparation with targets, intraoperative and postoperative problems."},
{f:"endo",t:"Diabetes and perioperative glucose management",b:`<ul class="clean"><li><b>Type 1</b>: autoimmune insulin deficiency; always needs insulin (risk of DKA). <b>Type 2</b>: insulin resistance with relative deficiency.</li>
<li><b>Complications that matter to anaesthetists</b>: ischaemic heart disease (silent), autonomic neuropathy (labile BP, gastroparesis, silent hypoglycaemia), nephropathy, stiff joint syndrome (prayer sign: difficult intubation), retinopathy, infection, poor wound healing.</li>
<li><b>UK guidance (CPOC/JBDS)</b>: HbA1c &lt; 69 mmol/mol (8.5%) for elective surgery; put first on the list; short starvation patients managed by adjusting usual drugs; <b>VRIII</b> if more than one meal will be missed, poor control, or emergency surgery; continue long-acting basal insulin (at ~80% dose) with VRIII.</li>
<li><b>Drug adjustments</b>: SGLT2 inhibitors omitted the day before and the day of surgery (euglycaemic DKA; check ketones before restarting); metformin usually continued unless contrast or AKI risk or more than one meal missed; sulphonylureas omitted on the day (hypoglycaemia).</li>
<li><b>GLP-1 receptor agonists</b> (semaglutide, tirzepatide): delayed gastric emptying with retained solids despite fasting. UK multidisciplinary consensus (2025): usually continue; assess GI symptoms; consider a liquid diet for 24 h before, gastric ultrasound, and RSI if retained contents are possible.</li>
<li>Target glucose 6–10 (4–12 acceptable); treat &lt; 4 with IV glucose (e.g. 75–80 mL of 20%).</li></ul>`,
p:"Hyperglycaemia causes osmotic diuresis, infection, poor wound healing and worse neurological and cardiac outcomes; hypoglycaemia under anaesthesia is silent and can cause permanent brain injury.",
v:"Pathophysiology, end-organ effects, preoperative assessment and HbA1c, drug management by class, VRIII, intraoperative targets, postoperative transition."},
{f:"liver",t:"Liver anatomy, blood flow and function",b:`<ul class="clean"><li>1.5 kg; receives ~25% of CO (1.5 L/min): portal vein ~75% of flow (SaO2 ~70–85%), hepatic artery ~25% of flow; each supplies about half the O2.</li>
<li><b>Functional unit</b>: the acinus (Rappaport) centred on the portal triad. <b>Zone 1</b> (periportal, O2-rich: oxidative metabolism, gluconeogenesis, urea synthesis), <b>zone 3</b> (centrilobular, O2-poor: glycolysis, cytochrome P450, lipogenesis) is most vulnerable to hypoxia and to paracetamol (NAPQI) and halothane injury.</li>
<li><b>Regulation</b>: the portal vein has no autoregulation (flow follows splanchnic outflow); the hepatic artery has myogenic autoregulation and the <b>hepatic arterial buffer response</b>: falling portal flow lets adenosine accumulate and dilates the artery, buffering ~25–60% of the loss. Sympathetic venoconstriction releases ~500 mL from the hepatic reservoir.</li>
<li><b>Reduced by</b>: hypotension, low CO, PPV and PEEP (raised hepatic venous pressure), hypocapnia, surgical traction, vasopressin, β-blockers, high-dose volatiles (isoflurane and sevoflurane preserve HABR best; halothane impairs it).</li>
<li><b>Functions</b>: carbohydrate (glycogen, gluconeogenesis), protein (albumin, clotting factors II, VII, IX, X, V, fibrinogen, proteins C and S, antithrombin, CRP, pseudocholinesterase), fat (lipoproteins, ketones, cholesterol), urea, bile (500–1000 mL/day; bile salts, bilirubin excretion), drug metabolism (phase I, II), hormone breakdown (insulin, aldosterone, oestrogen), storage (vitamins A, D, B12, iron, copper), immune (Kupffer cells), haematopoiesis in the fetus, heat production.</li></ul>`,
p:"An examiner in 2023 'refused the idea that the liver has an autoregulation mechanism'. Be precise: the hepatic artery autoregulates and shows the buffer response; the liver as a whole (portal flow) does not.",
v:"Blood supply with numbers, acinus and zones, regulation (intrinsic, extrinsic, anaesthetic), functions classified."},
{f:"liver",t:"Liver tests, bilirubin and liver failure",b:`<ul class="clean"><li><b>Bilirubin</b>: haem → biliverdin → unconjugated bilirubin (albumin-bound, lipid-soluble) → hepatic uptake and conjugation (UDP-glucuronyl transferase) → bile → urobilinogen in gut (some reabsorbed, excreted in urine) → stercobilin. Pre-hepatic (haemolysis, Gilbert's: unconjugated), hepatic, post-hepatic (obstructive: conjugated, dark urine, pale stools).</li>
<li><b>Tests</b>: hepatocellular injury (ALT, AST), cholestasis (ALP, GGT), synthetic function (albumin: half-life ~20 days; INR/PT: factor VII half-life ~6 h; glucose).</li>
<li><b>Acute liver failure</b>: encephalopathy and coagulopathy within weeks without prior disease (paracetamol, viral, drugs). Cerebral oedema, hypoglycaemia, AKI, vasoplegia, infection. King's College criteria for transplant.</li>
<li><b>Chronic liver disease / cirrhosis</b>: portal hypertension (varices, ascites, splenomegaly), hyperdynamic circulation (high CO, low SVR, NO), hepatorenal syndrome, hepatopulmonary syndrome (intrapulmonary vasodilatation, platypnoea–orthodeoxia) vs portopulmonary hypertension, encephalopathy (ammonia, GABA-ergic tone; lactulose, rifaximin), hyponatraemia, malnutrition.</li>
<li><b>Coagulation</b> is "rebalanced": low pro- and anticoagulant factors, low platelets but high von Willebrand factor. INR overstates bleeding risk; viscoelastic tests (TEG/ROTEM) guide treatment; patients also clot (portal vein thrombosis, VTE).</li>
<li><b>Risk scores</b>: Child–Pugh (A/B/C ≈ 10%, 30%, 80% surgical mortality historically) and MELD.</li></ul>`,
p:"Delayed waking in liver disease: encephalopathy, hypoglycaemia, hyponatraemia, reduced drug clearance (benzodiazepines, morphine), hypothermia. Check glucose and ammonia.",
v:"Bilirubin pathway with jaundice classification, LFT interpretation, acute vs chronic failure by system, coagulation, scoring."},
{f:"liver",t:"Anaesthesia, liver disease and hepatectomy",b:`<ul class="clean"><li><b>Drug handling</b>: reduced clearance of high-extraction drugs if flow falls (propofol, lidocaine, morphine, fentanyl) and of low-extraction drugs if enzyme capacity falls (benzodiazepines, warfarin). Low albumin raises free fractions; large Vd from ascites. Low pseudocholinesterase prolongs suxamethonium and mivacurium. Atracurium/cisatracurium independent of the liver; rocuronium and vecuronium prolonged. Avoid NSAIDs (renal, bleeding); paracetamol at reduced dose (e.g. ≤ 2–3 g/day, lower if weight &lt; 50 kg).</li>
<li><b>Preoperative</b>: Child–Pugh/MELD, ascites (drain), encephalopathy, coagulation, renal function, varices, nutrition, alcohol withdrawal.</li>
<li><b>Hepatectomy blood loss reduction</b>: low CVP (&lt; 5 cmH2O) during parenchymal transection (restrict fluid, head-down tilt avoided, GTN, diuretics, low tidal volume), Pringle manoeuvre (portal triad clamping; tolerated ~60 min intermittently), total vascular exclusion, ischaemic preconditioning, cell salvage (not with malignancy in many centres), tranexamic acid.</li>
<li><b>Physiological effects of partial hepatectomy</b>: hyperbilirubinaemia, coagulopathy, hypoglycaemia, hypophosphataemia (regeneration uses phosphate), lactate rise, post-hepatectomy liver failure if remnant &lt; 25–30% (normal liver) or &lt; 40% (cirrhotic). Regeneration over 2–4 weeks.</li>
<li><b>Analgesia</b>: thoracic epidural is debated (coagulopathy develops after day 1–3; hypotension conflicts with low CVP); wound catheters, intrathecal morphine, PCA.</li></ul>`,
p:"Low CVP reduces back-bleeding from hepatic veins but increases air embolism risk and renal hypoperfusion. Restore volume once transection is complete.",
v:"Effects of liver disease on drugs, then hepatectomy: preparation, blood-sparing methods, physiological consequences, analgesia."},
{f:"liver",t:"Gastric physiology, aspiration and vomiting",b:`<ul class="clean"><li><b>Gastric secretion</b> (~2 L/day): parietal cells secrete HCl (H⁺/K⁺-ATPase, stimulated by ACh (M3), gastrin, histamine (H2)) and intrinsic factor; chief cells pepsinogen. Phases: cephalic (vagal), gastric (distension, gastrin), intestinal (inhibitory: secretin, CCK, GIP).</li>
<li><b>Gastric emptying</b>: liquids exponential (half-time ~10–20 min), solids linear after a lag. Slowed by opioids, pain, anxiety, labour, diabetes (autonomic), GLP-1 agonists, trauma, high fat. Lower oesophageal sphincter barrier pressure (LOS − gastric pressure) normally ~15–25 mmHg: reduced by pregnancy, opioids, atropine, volatiles, propofol, hiatus hernia; increased by metoclopramide, suxamethonium (gastric pressure rises more).</li>
<li><b>Aspiration</b>: risk factors (full stomach, emergency, obesity, reflux, pregnancy, depressed consciousness); traditional risk thresholds pH &lt; 2.5 and volume &gt; 25 mL (0.4 mL/kg). Prevention: fasting, antacid prophylaxis (H2 antagonist/PPI, sodium citrate), RSI, gastric ultrasound to assess contents.</li>
<li><b>Vomiting</b>: vomiting centre (central pattern generator in the medulla near the NTS) receives input from the CTZ in the area postrema (D2, 5-HT3, opioid, NK1 receptors; outside the BBB), the vestibular system (H1, muscarinic), vagal gut afferents (5-HT3 from enterochromaffin cells), and higher centres.</li>
<li><b>PONV</b> (Apfel): female, non-smoker, previous PONV or motion sickness, postoperative opioids: 10%, 20%, 40%, 60%, 80% with 0–4 factors. Others: volatile and N2O, duration, laparoscopic, gynaecological, strabismus and middle ear surgery, age (young). Prophylaxis by risk: dexamethasone, ondansetron, droperidol, aprepitant, TIVA, avoiding N2O and limiting opioids.</li></ul>`,
p:"Vomiting causes loss of H⁺, Cl⁻ and K⁺ → hypochloraemic hypokalaemic metabolic alkalosis with paradoxical aciduria (pyloric stenosis in infants: resuscitate before surgery).",
v:"Gastric secretion and emptying, factors affecting LOS, aspiration prevention, then vomiting pathways with receptor targets and PONV risk scoring."},
{f:"temp",t:"Thermoregulation",b:`<ul class="clean"><li>Core temperature 36.5–37.5 °C with circadian variation (~0.5 °C; lowest early morning; rises after ovulation). Core (brain, trunk organs) vs periphery (skin, limbs: 2–4 °C cooler).</li>
<li><b>Sensors</b>: cold receptors (Aδ, TRPM8) and warm receptors (C fibres, TRPV) in skin, plus central receptors in the hypothalamus, spinal cord and deep tissues. Afferents via the spinothalamic tract.</li>
<li><b>Integrator</b>: preoptic anterior hypothalamus compares input with a set point. The <b>interthreshold range</b> (no response) is only ~0.2–0.4 °C when awake.</li>
<li><b>Effectors</b>: behaviour (most powerful), cutaneous vasoconstriction (AV shunts in fingers and toes, α1, noradrenaline; first response to cold), non-shivering thermogenesis (brown fat via β3 and uncoupling protein-1: important in neonates), shivering (raises heat production 2–5×), sweating (sympathetic cholinergic; evaporation removes ~2.4 kJ per mL), active vasodilatation.</li>
<li><b>Heat loss mechanisms</b> under anaesthesia: radiation ~40%, convection ~30%, evaporation (skin, wound, respiratory) ~20–25%, conduction ~5%. Respiratory loss ~10% (dry cold gas).</li>
<li><b>Fever</b>: pyrogens (IL-1, IL-6, TNF) → PGE2 in the hypothalamus raises the set point; treated by antipyretics (COX inhibition). Hyperthermia (heat stroke, MH, NMS, serotonin syndrome, thyroid storm) is a failure of heat loss or excess production with a normal set point: antipyretics do not work.</li></ul>`,
p:"Neonates: large surface area to mass ratio, thin skin, little fat, non-shivering thermogenesis only. Keep the theatre at 26 °C or higher, use overhead heaters, warmed fluids, and wrap the head.",
v:"Sensors, integrator, effectors with the threshold diagram (Diagrams tab), heat loss mechanisms, fever vs hyperthermia."},
{f:"temp",t:"Perioperative hypothermia and its treatment",b:`<ul class="clean"><li><b>Definition</b>: core temperature &lt; 36.0 °C (NICE CG65).</li>
<li><b>GA widens the interthreshold range</b> to ~2–4 °C: sweating threshold rises ~1 °C; vasoconstriction and shivering thresholds fall ~2–3 °C (to ~34–35 °C). Metabolic heat production falls ~20–30%.</li>
<li><b>Three phases</b>: (1) <b>redistribution</b> in the first hour: vasodilatation lets core heat flow to the periphery, core falls 0.5–1.5 °C with almost no loss of total heat; (2) <b>linear</b> decline over 2–3 h when loss exceeds production; (3) <b>plateau</b> when vasoconstriction returns (~34–35 °C) or passive equilibrium. <b>Neuraxial</b> anaesthesia also causes redistribution and blocks vasoconstriction and shivering below the block, so the plateau may never come; combined GA + epidural cools fastest.</li>
<li><b>Consequences</b>: coagulopathy (platelet and enzyme dysfunction; normal lab values at 37 °C), more blood loss and transfusion, wound infection (vasoconstriction, impaired immunity), myocardial ischaemia (shivering raises VO2 up to 3–5×; catecholamines), arrhythmias, prolonged drug action (NMB, volatiles, propofol), delayed waking and discharge, left shift of ODC, hyperglycaemia, thermal discomfort.</li>
<li><b>NICE prevention</b>: measure temperature before induction and every 30 min; do not induce if &lt; 36.0 °C unless urgent; prewarm for ≥ 30 min (reduces redistribution); active warming (forced air set to keep ≥ 36.5 °C) if anaesthesia &gt; 30 min or high risk; warm IV and irrigation fluids if &gt; 500 mL; theatre ≥ 21 °C until warming starts.</li>
<li><b>Therapeutic temperature control</b>: after cardiac arrest current guidance targets avoiding fever (≤ 37.5 °C) for at least 72 h rather than routine 33 °C (TTM2 trial); hypothermia for neuroprotection in neonatal HIE and deep hypothermic circulatory arrest.</li></ul>`,
p:"Pethidine 25 mg, clonidine, dexmedetomidine and magnesium reduce postoperative shivering; but warming the patient is the definitive treatment.",
v:"Definition, mechanisms (threshold widening, three phases), effects by system, prevention and treatment, then measurement sites (Stage 11)."},
{f:"app",t:"Carcinoid tumours and carcinoid syndrome",b:`<ul class="clean"><li>Neuroendocrine tumours of enterochromaffin cells (small bowel, appendix, bronchus). Secrete serotonin, histamine, kallikrein (→ bradykinin), tachykinins, prostaglandins.</li>
<li><b>Carcinoid syndrome</b> appears when mediators bypass hepatic inactivation: liver metastases, or primaries draining outside the portal system (bronchial, ovarian). Flushing, diarrhoea, bronchospasm, hypotension or hypertension, right-sided heart disease (tricuspid regurgitation, pulmonary stenosis from serotonin-driven fibrosis; the lung inactivates mediators, so left-sided disease is rare unless bronchial primary or PFO).</li>
<li><b>Investigations</b>: urinary 5-HIAA, chromogranin A, echocardiography, NT-proBNP.</li>
<li><b>Preoperative</b>: somatostatin analogues (octreotide; e.g. 100 µg SC 8-hourly before surgery or infusion 50–100 µg/h started 12 h before and continued), correct fluid and electrolytes from diarrhoea, assess heart valves.</li>
<li><b>Intraoperative</b>: avoid histamine-releasing drugs (morphine, atracurium, mivacurium) and catecholamine stimulation; avoid ephedrine and adrenaline in crisis (they release more mediators). Treat <b>carcinoid crisis</b> (profound hypotension, bronchospasm, flushing) with octreotide 20–50 µg IV boluses, fluids, phenylephrine or vasopressin. Antihistamines for histamine-dominant tumours.</li>
<li><b>Postoperative</b>: HDU, continue and wean octreotide, watch for delayed crises and hypoglycaemia/hyperglycaemia.</li></ul>`,
p:"A common question: 'carcinoid syndrome: amines and polypeptides released, anaesthesia concerns, postoperative concerns'. Use exactly that structure.",
v:"Pathophysiology and mediators, why the syndrome needs liver metastases, cardiac involvement, preparation, intraoperative crisis management, postoperative care."},
{f:"app",t:"Acute porphyrias",b:`<ul class="clean"><li>Inherited defects in haem synthesis (autosomal dominant with low penetrance). Acute forms: <b>acute intermittent porphyria</b> (porphobilinogen deaminase), variegate porphyria, hereditary coproporphyria. Acute attacks occur when ALA synthase is induced (enzyme inducers, fasting, dehydration, infection, alcohol, stress, menstruation) and ALA and PBG accumulate.</li>
<li><b>Attack</b>: severe abdominal pain, vomiting, constipation, tachycardia and hypertension, neuropathy (motor, can progress to respiratory paralysis like Guillain–Barré), seizures, psychiatric symptoms, hyponatraemia (SIADH). Dark urine that darkens on standing.</li>
<li><b>Drugs</b>: unsafe include barbiturates (thiopentone), etomidate (now considered probably unsafe), phenytoin, carbamazepine, sulphonamides, oral contraceptives, diclofenac, ketorolac (variable). Considered safe: propofol, ketamine, opioids (morphine, fentanyl), suxamethonium, atracurium, rocuronium, neostigmine, atropine, bupivacaine, lidocaine, nitrous oxide, isoflurane/sevoflurane, paracetamol. Always check a current database (e.g. the Welsh Medicines Information Centre/UK Porphyria service).</li>
<li><b>Treatment of an attack</b>: stop triggers, IV glucose (suppresses ALA synthase), <b>haem arginate</b> (Human hemin) IV daily for 4 days, analgesia with opioids, antiemetics, β-blockers, treat hyponatraemia and seizures (gabapentin, levetiracetam), monitor vital capacity.</li></ul>`,
p:"Regional anaesthesia is acceptable if no neuropathy is present and is documented carefully, because a new neuropathy could otherwise be blamed on the block.",
v:"Classify porphyrias, the haem pathway defect and triggers, clinical features, safe and unsafe drugs, management of an attack."},
{f:"app",t:"Obesity",b:`<ul class="clean"><li>BMI ≥ 30 obese; ≥ 40 (or ≥ 35 with comorbidity) severe. Central (visceral) obesity carries the metabolic risk; waist-to-height ratio &gt; 0.5.</li>
<li><b>Respiratory</b>: FRC and ERV fall (more supine and under GA; closing capacity may exceed FRC → atelectasis and shunt), compliance falls, work of breathing and VO2 rise, faster desaturation; OSA (STOP-BANG), obesity hypoventilation syndrome (PaCO2 &gt; 6 kPa awake).</li>
<li><b>Cardiovascular</b>: raised blood volume and CO, hypertension, LVH, heart failure, AF, pulmonary hypertension (OSA/OHS), IHD.</li>
<li><b>Other</b>: diabetes, NAFLD, reflux, difficult IV access, VTE, pressure injuries, rhabdomyolysis on long cases.</li>
<li><b>Drug dosing</b>: lipophilic drugs (propofol infusion, benzodiazepines) by total or adjusted weight for loading; induction propofol and opioids by lean body weight; suxamethonium by total body weight; rocuronium, atracurium and sugammadex by ideal or adjusted body weight (sugammadex by actual or adjusted per local guidance); local anaesthetic maximum doses by ideal or lean weight.</li>
<li><b>Practice</b>: ramped position (tragus level with sternal notch), preoxygenation with head-up and CPAP or HFNO, videolaryngoscopy, PEEP and recruitment, short-acting agents, extubate fully awake and sitting up, CPAP after surgery if OSA, multimodal opioid-sparing analgesia.</li></ul>`,
p:"Lean body weight (Janmahasatian) plateaus with increasing total weight, which is why it suits induction doses; the Formulas tab calculates IBW, LBW and adjusted weight.",
v:"Definitions, physiology by system with the reasons, airway and positioning, drug dosing by scalar, postoperative risks."},
{f:"app",t:"Physiology of ageing",b:`<ul class="clean"><li><b>Cardiovascular</b>: stiff arteries (raised SBP and pulse pressure), LVH and diastolic dysfunction (atrial kick important), reduced β-receptor response and maximum HR, reduced baroreflex: exaggerated hypotension on induction and with neuraxial block.</li>
<li><b>Respiratory</b>: closing capacity rises (reaches FRC supine mid-40s and standing mid-60s), PaO2 falls (~13.3 − age/30 kPa), loss of elastic recoil, chest wall stiffer, blunted responses to hypoxia and hypercapnia, weaker cough and airway reflexes.</li>
<li><b>Renal</b>: GFR falls ~1 mL/min/year after 40 with unchanged creatinine (less muscle), reduced concentrating ability and thirst.</li>
<li><b>Hepatic</b>: liver mass and flow fall ~30–40%: slower clearance.</li>
<li><b>CNS</b>: neuronal loss, MAC falls ~6% per decade after 40, increased sensitivity to benzodiazepines and opioids, postoperative delirium and cognitive dysfunction, frailty.</li>
<li><b>Body composition</b>: less muscle and water, more fat (larger Vd for lipophilic drugs, smaller for hydrophilic), lower albumin, impaired thermoregulation.</li></ul>`,
p:"Frailty (Clinical Frailty Scale ≥ 5) predicts complications and mortality better than age alone. Comprehensive geriatric assessment and delirium prevention improve outcomes.",
v:"System by system with the anaesthetic consequence for each, then frailty and delirium."},
];

const CALCS=[
 {t:"Body weight scalars",c:"ecg",in:[["Total weight kg","w",120],["Height cm","h",170],["Female (1/0)","f",0]],
  f:(v,fmt)=>{const m=v.h/100,bmi=v.w/(m*m),ibw=(v.f?45.5:50)+0.91*(v.h-152.4),lbw=v.f?9270*v.w/(8780+244*bmi):9270*v.w/(6680+216*bmi),abw=ibw+0.4*(v.w-ibw);const cls=bmi<18.5?"Underweight":bmi<25?"Normal":bmi<30?"Overweight":bmi<35?"Obese I":bmi<40?"Obese II":"Obese III";return [["BMI",fmt(bmi,1),bmi>=40?"bad":bmi>=30?"warn":"ok"],["Class",cls],["Ideal BW kg",fmt(ibw,0)],["Lean BW kg",fmt(lbw,0)],["Adjusted BW kg",fmt(abw,0)]]},
  n:"IBW (Devine) = 50 (M) or 45.5 (F) + 0.91 × (height − 152.4 cm). LBW (Janmahasatian). Adjusted BW = IBW + 0.4 × (TBW − IBW)."},
 {t:"Energy and protein requirements",c:"spo2",in:[["Weight kg","w",70],["Height cm","h",175],["Age","a",55],["Female (1/0)","f",0],["Stress factor (1.0–1.5)","s",1.2],["Protein g/kg/day","p",1.3]],
  f:(v,fmt)=>{const hb=v.f?655.1+9.563*v.w+1.85*v.h-4.676*v.a:66.5+13.75*v.w+5.003*v.h-6.75*v.a;return [["Harris–Benedict REE kcal",fmt(hb,0)],["× stress factor",fmt(hb*v.s,0)],["Simple 25 kcal/kg",fmt(25*v.w,0)],["Protein g/day",fmt(v.p*v.w,0)],["Nitrogen g/day",fmt(v.p*v.w/6.25,1)],["Water mL/day (30/kg)",fmt(30*v.w,0)]]},
  n:"Use 20–25 kcal/kg/day in the acute phase, 25–30 in recovery. Indirect calorimetry is preferred when available."},
 {t:"Parenteral substrate and calories",c:"spo2",in:[["Weight kg","w",70],["Glucose %","g",20],["Glucose infusion mL/h","gr",40],["20% lipid mL/h","l",10],["Propofol 1% mL/h","pr",15],["Amino acids g/day","aa",90]],
  f:(v,fmt)=>{const gmin=v.g*10*v.gr/60/v.w*1000/1000;const gkcal=v.g*10*v.gr*24/1000*3.4,lk=v.l*24*2,pk=v.pr*24*1.1,ak=v.aa*4;return [["Glucose mg/kg/min",fmt(gmin,1),gmin>5?"warn":"ok"],["Glucose kcal/day",fmt(gkcal,0)],["Lipid kcal/day",fmt(lk,0)],["Propofol kcal/day",fmt(pk,0)],["Protein kcal/day",fmt(ak,0)],["Total kcal/day",fmt(gkcal+lk+pk+ak,0)]]},
  n:"Glucose 3.4 kcal/g (hydrated), 20% lipid ~2 kcal/mL, propofol 1% ~1.1 kcal/mL, protein 4 kcal/g. Keep glucose ≤ 4–5 mg/kg/min."},
 {t:"Child–Pugh score",c:"nibp",in:[["Bilirubin µmol/L","b",40],["Albumin g/L","a",30],["INR","i",1.9],["Ascites (0 none, 1 mild, 2 moderate–severe)","as",1],["Encephalopathy (0 none, 1 grade 1–2, 2 grade 3–4)","e",0]],
  f:(v,fmt)=>{const s=(v.b<34?1:v.b<=50?2:3)+(v.a>35?1:v.a>=28?2:3)+(v.i<1.7?1:v.i<=2.3?2:3)+(1+v.as)+(1+v.e);const c=s<=6?"A":s<=9?"B":"C";return [["Score",s],["Class",c,c==="A"?"ok":c==="B"?"warn":"bad"],["Historic surgical mortality",c==="A"?"~10%":c==="B"?"~30%":"~75–80%"]]},
  n:"Points: bilirubin < 34 / 34–50 / > 50; albumin > 35 / 28–35 / < 28; INR < 1.7 / 1.7–2.3 / > 2.3; ascites and encephalopathy none / mild / severe."},
 {t:"MELD score",c:"nibp",in:[["Bilirubin µmol/L","b",60],["INR","i",1.8],["Creatinine µmol/L","c",120],["Na⁺ (for MELD-Na)","na",132]],
  f:(v,fmt)=>{const bi=Math.max(1,v.b/17.1),in_=Math.max(1,v.i),cr=Math.min(4,Math.max(1,v.c/88.4));const meld=3.78*Math.log(bi)+11.2*Math.log(in_)+9.57*Math.log(cr)+6.43;const na=Math.min(137,Math.max(125,v.na));const mna=meld+1.32*(137-na)-0.033*meld*(137-na);return [["MELD",fmt(meld,0),meld>20?"bad":meld>10?"warn":"ok"],["MELD-Na",fmt(mna,0)],["Postop risk",meld<10?"Elective surgery usually acceptable":meld<=15?"Increased risk: consider carefully":"High risk: avoid elective surgery"]]},
  n:"Original MELD with lower bounds of 1 and creatinine capped at 4 mg/dL. Mayo postoperative risk model refines prediction."},
 {t:"Steroid equivalence and perioperative cover",c:"etco2",in:[["Daily dose mg","d",10],["Drug (1 pred, 2 hydrocort, 3 dexameth, 4 methylpred)","k",1],["Duration weeks","wk",8],["Surgery (1 minor, 2 intermediate, 3 major)","s",3]],
  f:(v,fmt)=>{const fac={1:1,2:0.25,3:6.67,4:1.25}[v.k]||1,pe=v.d*fac;const need=pe>=5&&v.wk>=4;let plan="Usual dose only; consider cover if unwell.";if(need){plan=v.s===1?"Usual dose; 50–100 mg IV hydrocortisone at induction for minor procedures, double oral dose for 24 h.":v.s===2?"Hydrocortisone 100 mg IV at induction, then 200 mg/24 h infusion or 50 mg IV/IM 6-hourly until eating; double oral dose 48 h.":"Hydrocortisone 100 mg IV at induction, then 200 mg/24 h infusion (or 50 mg 6-hourly) until eating; double oral dose for 48 h to 1 week."}return [["Prednisolone equivalent mg/day",fmt(pe,1)],["HPA suppression likely",need?"Yes":"Unlikely",need?"warn":"ok"],["Plan",plan]]},
  n:"Equivalence: prednisolone 5 mg = hydrocortisone 20 mg = methylprednisolone 4 mg = dexamethasone 0.75 mg. Based on AAGBI/Society for Endocrinology guideline (2020)."},
 {t:"Rewarming energy",c:"abp",in:[["Weight kg","w",70],["Current core °C","t",34.5],["Target °C","tt",36.5],["Net heat gain W (forced air ~30–60)","p",40]],
  f:(v,fmt)=>{const kj=v.w*3.47*(v.tt-v.t),h=kj*1000/v.p/3600;return [["Heat deficit kJ",fmt(kj,0)],["Time at that rate h",fmt(h,1)],["kcal",fmt(kj/4.184,0)]]},
  n:"Specific heat of the body ≈ 3.47 kJ/kg/°C. Shows why prevention (prewarming) beats treatment: forced air adds only tens of watts net."},
 {t:"Apfel PONV risk",c:"ecg",in:[["Female (1/0)","f",1],["Non-smoker (1/0)","ns",1],["Previous PONV or motion sickness (1/0)","h",0],["Postoperative opioids (1/0)","o",1]],
  f:(v,fmt)=>{const n=v.f+v.ns+v.h+v.o,r=[10,21,39,61,79][n];return [["Risk factors",n],["Predicted PONV %",r,r>=40?"warn":"ok"],["Suggested prophylaxis",n<=1?"Consider one agent":n===2?"Two agents":"Two or more agents, TIVA, opioid-sparing"]]},
  n:"Simplified Apfel score (adults). Consensus guidelines suggest two agents for patients with one or two risk factors, more for higher risk."},
];

const TABLES=[
 ["Corticosteroid equivalence",["Drug","Equivalent dose","Glucocorticoid potency","Mineralocorticoid potency","Duration"],[["Hydrocortisone","20 mg","1","1","Short (8–12 h)"],["Prednisolone","5 mg","4","0.8","Intermediate (12–36 h)"],["Methylprednisolone","4 mg","5","0.5","Intermediate"],["Dexamethasone","0.75 mg","25–30","~0","Long (36–72 h)"],["Fludrocortisone","–","10","125","Intermediate"]]],
 ["Anterior pituitary hormones",["Hormone","Hypothalamic control","Target and action"],[["ACTH","CRH (+), cortisol (−)","Adrenal cortex: cortisol, androgens"],["TSH","TRH (+), somatostatin (−), T3/T4 (−)","Thyroid: T4, T3"],["GH","GHRH (+), somatostatin (−)","Liver IGF-1: growth, anti-insulin"],["Prolactin","Dopamine (−), TRH (+)","Breast: lactation"],["LH, FSH","GnRH (+), sex steroids (−)","Gonads: sex steroids, gametes"],["(Posterior) ADH, oxytocin","Osmolality, volume / suckling, labour","Kidney V2, vessels V1 / uterus, breast"]]],
 ["Thyroid function patterns",["Condition","TSH","Free T4","Free T3"],[["Primary hyperthyroidism (Graves')","↓↓","↑","↑"],["Primary hypothyroidism","↑","↓","↓/N"],["Subclinical hypothyroidism","↑","N","N"],["Secondary (pituitary) hypothyroidism","↓/N","↓","↓"],["Sick euthyroid (non-thyroidal illness)","N/↓","N/↓","↓ (reverse T3 ↑)"],["T3 toxicosis","↓","N","↑"]]],
 ["Stress response hormones",["Increased","Decreased"],[["Adrenaline, noradrenaline","Insulin (relative)"],["Cortisol, ACTH","Testosterone, oestrogen"],["Growth hormone, prolactin","T3 (with ↑ reverse T3)"],["ADH","–"],["Glucagon","–"],["Renin, angiotensin II, aldosterone","–"],["β-endorphin","–"],["IL-6, IL-1, TNF; CRP, fibrinogen","Albumin, transferrin"]]],
 ["Hepatic acinus zones",["Zone","Location","Function","Vulnerable to"],[["1","Periportal (O2-rich)","Oxidative metabolism, gluconeogenesis, urea, bile acid formation","Toxins arriving in portal blood (e.g. phosphorus)"],["2","Intermediate","Mixed","Yellow fever"],["3","Centrilobular (O2-poor)","Glycolysis, lipogenesis, cytochrome P450","Ischaemia, paracetamol (NAPQI), halothane, alcohol"]]],
 ["Liver function tests",["Pattern","Bilirubin","ALT/AST","ALP/GGT","Albumin, INR"],[["Pre-hepatic (haemolysis, Gilbert's)","↑ unconjugated","N","N","N"],["Hepatocellular (hepatitis, paracetamol)","↑","↑↑↑","↑","↓ / ↑ INR in severe"],["Cholestatic (obstruction, drugs)","↑ conjugated","↑","↑↑↑","INR ↑ (vitamin K malabsorption, corrects with vitamin K)"],["Cirrhosis (synthetic failure)","N/↑","N/↑","N/↑","Albumin ↓, INR ↑ (does not correct with vitamin K)"]]],
 ["Heat loss under anaesthesia",["Mechanism","Share","Reduce by"],[["Radiation","~40%","Cover the patient, warm theatre"],["Convection","~30%","Forced-air warming, drapes, reduce air flow over skin"],["Evaporation (skin, wound, airway)","~15–25%","HME, low-flow anaesthesia, minimise exposed viscera, warm irrigation"],["Conduction","~5%","Warming mattress, warmed fluids"],["Cold IV fluid","~0.25 °C per litre at room temp","Fluid warmer"]]],
 ["Effects of perioperative hypothermia",["System","Effect"],[["Haematological","Coagulopathy, platelet dysfunction, more blood loss and transfusion"],["Cardiovascular","Myocardial ischaemia, arrhythmias, vasoconstriction, increased SVR"],["Metabolic","Shivering raises VO2 3–5×, hyperglycaemia, left-shifted ODC, acidosis"],["Drugs","Prolonged NMB, reduced MAC, slower metabolism of propofol and opioids"],["Immune / wound","Wound infection (3× risk at 34.7 °C), impaired neutrophils"],["Recovery","Delayed waking, longer PACU stay, thermal discomfort"]]],
 ["Obesity: physiological changes",["System","Change"],[["Respiratory","↓ FRC, ERV, compliance; ↑ VO2, VCO2, work of breathing; OSA, OHS; rapid desaturation"],["Cardiovascular","↑ blood volume, CO, SV; hypertension, LVH, HFpEF, AF, pulmonary hypertension"],["GI / metabolic","Reflux, NAFLD, type 2 diabetes, dyslipidaemia"],["Haematology","Hypercoagulable, VTE"],["Pharmacology","↑ Vd lipophilic drugs, ↑ lean mass and clearance; dose by appropriate scalar"]]],
];

const CARDS=[
 ["met","Net ATP from glycolysis?","2 ATP (plus 2 NADH) per glucose."],
 ["met","Rate-limiting enzyme of glycolysis?","Phosphofructokinase-1."],
 ["met","Total ATP from complete oxidation of glucose (modern estimate)?","≈ 30–32 (older texts 36–38)."],
 ["met","Which vitamin does pyruvate dehydrogenase need?","Thiamine (B1)."],
 ["met","Products of the pentose phosphate pathway?","NADPH and ribose-5-phosphate."],
 ["met","What is the Cori cycle?","Muscle lactate → liver → glucose (gluconeogenesis) → back to muscle."],
 ["met","Why can't muscle glycogen supply blood glucose?","Muscle lacks glucose-6-phosphatase."],
 ["met","Energy yield of fat vs carbohydrate?","≈ 9 vs 4 kcal/g."],
 ["met","Ketone bodies?","Acetoacetate, β-hydroxybutyrate (and acetone)."],
 ["met","Which organ makes ketones but cannot use them?","Liver."],
 ["met","Grams of protein per gram of nitrogen?","6.25."],
 ["met","Insulin secretion mechanism?","Glucose → ATP ↑ → K<sub>ATP</sub> closes → depolarisation → Ca²⁺ entry → exocytosis.".replace(/<[^>]+>/g,"")],
 ["met","Insulin-dependent glucose transporter?","GLUT4 (muscle and fat)."],
 ["met","Counter-regulatory hormones?","Glucagon, adrenaline, cortisol, growth hormone."],
 ["met","Glycogen stores and duration in starvation?","≈ 400–500 g, ~1600 kcal, used up in ~24 h."],
 ["met","Brain fuel after weeks of starvation?","~70% ketones."],
 ["met","Protein-sparing effect of glucose?","~100 g/day glucose reduces gluconeogenesis from protein (via insulin)."],
 ["met","Main cytokine in the surgical stress response?","IL-6 (peak 12–24 h)."],
 ["met","Hormones that fall in the stress response?","Insulin (relative), testosterone, oestrogen, T3."],
 ["met","Which regional technique best abolishes the stress response?","Lumbar epidural for lower abdominal or limb surgery."],
 ["met","Acute-phase energy target in ICU?","≈ 20–25 kcal/kg/day."],
 ["met","Protein target in critical illness?","≈ 1.3 g/kg/day (1.2–2.0)."],
 ["met","Maximum glucose infusion rate in PN?","≈ 4–5 mg/kg/min."],
 ["met","Calories in 1% propofol?","≈ 1.1 kcal/mL (10% lipid)."],
 ["met","Electrolytes that fall in refeeding?","Phosphate, potassium, magnesium (and thiamine depletion)."],
 ["endo","Three structural classes of hormone?","Peptides, amines (catecholamines, thyroid), steroids."],
 ["endo","Receptor type for steroid and thyroid hormones?","Intracellular (nuclear) receptors altering transcription."],
 ["endo","Hormones of the posterior pituitary?","ADH and oxytocin."],
 ["endo","Inhibitory hypothalamic control of prolactin?","Dopamine."],
 ["endo","Enzyme that iodinates thyroglobulin?","Thyroid peroxidase (TPO)."],
 ["endo","Active thyroid hormone and its half-life?","T3, ≈ 1 day (T4 ≈ 7 days)."],
 ["endo","Drug that blocks peripheral T4 → T3 conversion?","Propylthiouracil (also propranolol, steroids, amiodarone)."],
 ["endo","Origin of the superior thyroid artery?","External carotid artery."],
 ["endo","Three zones of the adrenal cortex and products?","Glomerulosa (aldosterone), fasciculata (cortisol), reticularis (androgens)."],
 ["endo","Enzyme inhibited by etomidate?","11β-hydroxylase."],
 ["endo","Rate-limiting step of steroidogenesis?","Cholesterol transport into mitochondria (StAR) and side-chain cleavage."],
 ["endo","Daily cortisol output and during major surgery?","15–30 mg/day; 75–150 mg/day with major surgery."],
 ["endo","Threshold for perioperative steroid cover?","≥ 5 mg prednisolone-equivalent daily for > 4 weeks (or within 3 months)."],
 ["endo","Major surgery steroid cover (AAGBI 2020)?","Hydrocortisone 100 mg IV at induction, then 200 mg/24 h infusion until eating."],
 ["endo","Equivalent doses of hydrocortisone, prednisolone, dexamethasone?","20 mg = 5 mg = 0.75 mg."],
 ["endo","Main regulators of aldosterone?","Angiotensin II and plasma K⁺."],
 ["endo","Rate-limiting enzyme in catecholamine synthesis?","Tyrosine hydroxylase."],
 ["endo","Adrenal medulla output ratio?","Adrenaline ~80%, noradrenaline ~20%."],
 ["endo","Why α-block before β-block in phaeochromocytoma?","Unopposed α vasoconstriction after β-block causes hypertensive crisis and heart failure."],
 ["endo","Roizen criteria (phaeochromocytoma readiness)?","BP < 160/90 for 24 h, orthostatic hypotension present, no ST changes, ≤ 1 VE per 5 min."],
 ["endo","When are SGLT2 inhibitors omitted before surgery in the UK?","The day before and the day of surgery."],
 ["endo","HbA1c above which elective surgery is usually postponed?","69 mmol/mol (8.5%)."],
 ["endo","Perioperative glucose target?","6–10 mmol/L (4–12 acceptable)."],
 ["liver","Liver blood flow and split?","≈ 1.5 L/min (25% CO); portal ~75%, artery ~25%; ~50% O2 each."],
 ["liver","What is the hepatic arterial buffer response?","Falling portal flow raises adenosine and dilates the hepatic artery."],
 ["liver","Which liver zone is most vulnerable to hypoxia and paracetamol?","Zone 3 (centrilobular)."],
 ["liver","Which liver zone is richest in cytochrome P450?","Zone 3."],
 ["liver","Clotting factors made by the liver needing vitamin K?","II, VII, IX, X (and proteins C, S)."],
 ["liver","Best rapid marker of liver synthetic function?","INR/PT (factor VII half-life ~6 h)."],
 ["liver","Enzyme conjugating bilirubin?","UDP-glucuronyl transferase."],
 ["liver","Bile production per day?","≈ 500–1000 mL."],
 ["liver","Child–Pugh variables?","Bilirubin, albumin, INR, ascites, encephalopathy."],
 ["liver","MELD variables?","Bilirubin, INR, creatinine (± sodium)."],
 ["liver","Hepatopulmonary syndrome sign?","Platypnoea–orthodeoxia (desaturation when upright)."],
 ["liver","Why is INR misleading in cirrhosis?","Pro- and anticoagulant factors both fall (rebalanced haemostasis)."],
 ["liver","Minimum safe liver remnant after hepatectomy?","≈ 25–30% (normal liver), ~40% (cirrhotic)."],
 ["liver","CVP target during hepatic transection?","< 5 cmH2O (low CVP technique)."],
 ["liver","Parietal cell stimuli?","Acetylcholine (M3), gastrin, histamine (H2)."],
 ["liver","Lower oesophageal barrier pressure?","LOS pressure minus gastric pressure."],
 ["liver","Four Apfel risk factors?","Female, non-smoker, previous PONV/motion sickness, postoperative opioids."],
 ["liver","Receptors in the chemoreceptor trigger zone?","D2, 5-HT3, NK1, opioid."],
 ["temp","Normal interthreshold range awake?","≈ 0.2–0.4 °C."],
 ["temp","Thermoregulatory integrator?","Preoptic anterior hypothalamus."],
 ["temp","First physiological response to cold?","Cutaneous vasoconstriction (AV shunts)."],
 ["temp","Non-shivering thermogenesis mechanism?","Brown fat, β3 receptors, uncoupling protein-1."],
 ["temp","Main route of heat loss in theatre?","Radiation (~40%)."],
 ["temp","NICE definition of perioperative hypothermia?","Core temperature < 36.0 °C."],
 ["temp","Cause of the first-hour fall in core temperature under GA?","Redistribution of heat from core to periphery (vasodilatation)."],
 ["temp","How much does core temperature fall in the redistribution phase?","≈ 0.5–1.5 °C."],
 ["temp","When does NICE recommend active warming?","Anaesthesia > 30 min, or shorter if high risk."],
 ["temp","Specific heat of the body?","≈ 3.47 kJ/kg/°C."],
 ["temp","Fever vs hyperthermia?","Fever: raised set point (PGE2). Hyperthermia: normal set point with failed heat loss or excess production."],
 ["app","Mediators in carcinoid syndrome?","Serotonin, histamine, kallikrein/bradykinin, tachykinins, prostaglandins."],
 ["app","Why does carcinoid syndrome usually need liver metastases?","The liver inactivates mediators from gut primaries."],
 ["app","Urinary marker of carcinoid?","5-HIAA."],
 ["app","Treatment of carcinoid crisis?","Octreotide IV, fluids, phenylephrine/vasopressin; avoid catecholamines."],
 ["app","Enzyme defect in acute intermittent porphyria?","Porphobilinogen deaminase."],
 ["app","Specific treatment of an acute porphyric attack?","Haem arginate (and IV glucose)."],
 ["app","Induction agent considered safe in porphyria?","Propofol."],
 ["app","Ideal body weight formula (male)?","50 + 0.91 × (height cm − 152.4)."],
 ["app","Which scalar for induction doses in obesity?","Lean body weight."],
 ["app","MAC change with age?","Falls ~6% per decade after 40."],
 ["app","GFR decline with age?","≈ 1 mL/min/year after 40."],
];

const FCF={all:"All",met:"Metabolism",endo:"Endocrine",liver:"Liver & gut",temp:"Temperature",app:"Applied"};

const VIVA=[
 {st:"SOE 1 · Physiology",q:"Describe glucose metabolism: glycogenolysis, gluconeogenesis, glycolysis, the TCA cycle and the HMP shunt.",a:["Glucose entry (GLUT) and phosphorylation.","Glycolysis: products, ATP, rate-limiting enzyme, anaerobic fate.","Link reaction and TCA cycle with key intermediates and products; oxidative phosphorylation and ATP yield.","Glycogen synthesis and breakdown; gluconeogenesis substrates and hormones; Cori cycle.","HMP shunt: NADPH and ribose; G6PD."],fu:"Why does cyanide cause lactic acidosis with a high venous saturation?"},
 {st:"SOE 1 · Physiology",q:"Describe the metabolic response to starvation.",a:["Energy stores in kcal.","0–24 h: insulin ↓, glucagon ↑, glycogenolysis.","1–3 days: gluconeogenesis from amino acids, lactate, glycerol.","> 3 days: ketogenesis, brain adaptation, falling metabolic rate and protein loss.","Clinical: preoperative fasting, carbohydrate loading, refeeding syndrome."],fu:"What is the protein-sparing effect of glucose?"},
 {st:"SOE 1 · Physiology",q:"What is the stress response to surgery and how can anaesthesia modify it?",a:["Definition and triggers.","Endocrine changes (table).","Metabolic, immunological and haematological effects; phases.","Harms in surgical patients.","Modification: neuraxial, opioids, minimally invasive surgery, ERAS, normothermia, glucose control, drugs."],fu:"Why does a thoracic epidural blunt the stress response less than a lumbar epidural?"},
 {st:"SOE 4 · Critical care",q:"Calculate the nutritional requirements of a 70 kg critically ill patient. What else would you add?",a:["Energy: ~1400–1750 kcal/day acute (20–25 kcal/kg), rising later; indirect calorimetry.","Protein ~90 g/day (1.3 g/kg).","Water ~2.1 L/day; Na⁺ and K⁺ ~70 mmol/day.","Micronutrients: phosphate, Mg²⁺, trace elements, vitamins, thiamine.","Route, timing, monitoring, refeeding precautions; burns and sepsis adjustments."],fu:"How much energy does a propofol infusion at 15 mL/h provide?"},
 {st:"SOE 1 · Physiology",q:"Describe the anatomy of the adrenal gland and the physiology of its hormones.",a:["Position, size, blood supply, venous drainage.","Cortex zones and products; steroidogenesis with the etomidate site.","Cortisol actions and HPA axis.","Aldosterone actions and regulation.","Medulla: catecholamine synthesis, ratio, control; pathology (Addison's, Cushing's, phaeochromocytoma)."],fu:"Which patients need perioperative steroid cover and what dose?"},
 {st:"SOE 3 · Anaesthesia",q:"A 54-year-old heavy smoker with hot flushes and breathlessness is listed for excision of a left adrenal mass. Discuss.",a:["Differential: phaeochromocytoma, functional cortical tumour (Cushing's, Conn's), adrenal metastasis from lung cancer; carcinoid-like flushing.","Investigations: metanephrines, cortisol, aldosterone/renin, CT chest, echo (catecholamine cardiomyopathy), lung function.","If phaeochromocytoma: α-blockade then β-blockade, volume, Roizen targets.","Intraoperative: arterial line, triggers, vasodilators, post-ligation hypotension and hypoglycaemia; laparoscopic issues.","Postoperative: HDU, glucose, steroid cover if bilateral or cortisol-secreting."],fu:"Which drugs would you avoid in phaeochromocytoma?"},
 {st:"SOE 1 · Physiology",q:"Describe thyroid hormone synthesis and actions. What are the anaesthetic implications of hypo- and hyperthyroidism?",a:["Anatomy and nerve relations.","Synthesis steps with drug sites; transport; T4 → T3.","Actions by system.","Hyperthyroidism: preparation, airway, thyroid storm.","Hypothyroidism: drug sensitivity, hypothermia, airway, myxoedema coma."],fu:"How do you manage post-thyroidectomy stridor in recovery?"},
 {st:"SOE 1 · Physiology",q:"Describe the hepatic blood supply and its regulation. Does the liver autoregulate?",a:["Numbers and O2 contribution.","Acinus and zones.","Portal flow is passive; hepatic artery myogenic autoregulation and HABR (adenosine).","Extrinsic: sympathetic, hormones, CO2, PPV, CVP.","Anaesthetic effects; clinical: hepatectomy, cirrhosis, shock liver."],fu:"Why is zone 3 most at risk in shock?"},
 {st:"SOE 3 · Anaesthesia",q:"A patient with moderate cirrhosis is listed for a left hemicolectomy. Discuss.",a:["Assessment: aetiology, Child–Pugh/MELD, varices, ascites, encephalopathy, renal function, nutrition, alcohol.","Coagulation: rebalanced haemostasis, viscoelastic testing, platelets, fibrinogen.","Drugs: altered PK, NMB choice, avoid NSAIDs, cautious opioids and benzodiazepines.","Intraoperative: hyperdynamic circulation, vasopressors, fluids (avoid sodium overload), glucose, temperature.","Analgesia (epidural vs intercostal/TAP vs wound catheters), postop liver decompensation, HRS, encephalopathy."],fu:"Epidural or intercostal blocks in this patient?"},
 {st:"SOE 1 · Physiology",q:"How is body temperature regulated? Describe the mechanisms of intraoperative hypothermia and its consequences.",a:["Sensors, integrator, effectors; interthreshold range.","Heat loss mechanisms with percentages.","GA and neuraxial effects on thresholds; three phases.","Consequences by system.","Prevention (NICE), treatment, measurement sites."],fu:"Why does prewarming reduce redistribution hypothermia?"},
 {st:"SOE 3 · Anaesthesia",q:"Carcinoid syndrome: mediators, anaesthetic concerns and postoperative concerns.",a:["Tumour origin and mediators.","Why liver metastases are needed; cardiac lesions.","Preparation: octreotide, fluids, echo.","Intraoperative: avoid histamine release and catecholamines; crisis management.","Postoperative: HDU, octreotide weaning, glucose."],fu:"Why is adrenaline dangerous in carcinoid crisis?"},
 {st:"SOE 3 · Anaesthesia",q:"A woman with insulin-treated diabetes is listed for femoropopliteal bypass. Discuss perioperative management.",a:["Assessment: control (HbA1c), complications (IHD, autonomic, renal, stiff joints), vascular disease.","Day-before and day-of drug management; VRIII with basal insulin.","Intraoperative glucose and K⁺ monitoring; regional options; temperature.","Postoperative: return to usual regimen, wound and infection, AKI.","CPOC/JBDS guidance; hypoglycaemia treatment."],fu:"How would you manage a patient on an SGLT2 inhibitor who is found to be acidotic after surgery with normal glucose?"},
 {st:"SOE 1 · Physiology",q:"What are the physiological changes of obesity and how do they affect anaesthesia?",a:["Definitions.","Respiratory: FRC, OSA, OHS, desaturation.","Cardiovascular and metabolic changes.","Drug dosing scalars.","Airway, positioning, ventilation, extubation, postoperative CPAP and VTE."],fu:"Which weight would you use to dose rocuronium and sugammadex?"},
 {st:"SOE 3 · Anaesthesia",q:"What are the porphyrias and how would you anaesthetise a patient with acute intermittent porphyria?",a:["Haem pathway and enzyme defect.","Triggers and features of an attack.","Safe and unsafe drugs (check a database).","Plan: minimise fasting (IV glucose), safe drugs, regional with documented neurology.","Managing an attack: haem arginate, glucose, analgesia, electrolytes, respiratory monitoring."],fu:"Why is fasting a trigger?"},
];

const QUIZ=[
 ["Glucose metabolism",[["Glycolysis occurs in the cytoplasm",1,""],["The TCA cycle requires thiamine for pyruvate entry",1,"Pyruvate dehydrogenase needs thiamine."],["Muscle glycogen directly maintains blood glucose",0,"Muscle lacks glucose-6-phosphatase."],["The pentose phosphate pathway produces NADPH",1,""],["Gluconeogenesis is stimulated by insulin",0,"Inhibited by insulin."]]],
 ["Ketone bodies",[["Are produced in the liver",1,""],["Are used as fuel by the liver",0,"The liver lacks the enzyme (succinyl-CoA transferase)."],["Supply most of the brain's energy after weeks of starvation",1,""],["Include β-hydroxybutyrate",1,""],["Are produced when insulin is high",0,"When insulin is low."]]],
 ["Insulin",[["Is secreted when K<sub>ATP</sub> channels close".replace(/<[^>]+>/g,""),1,""],["Acts through a G-protein coupled receptor",0,"Tyrosine kinase receptor."],["Moves potassium into cells",1,""],["Promotes lipolysis",0,"Inhibits lipolysis."],["About half is removed on first pass through the liver",1,""]]],
 ["The stress response to surgery",[["Cortisol increases",1,""],["Insulin secretion increases appropriately",0,"Relative deficiency and resistance."],["IL-6 is a key cytokine",1,""],["T3 levels fall",1,""],["Epidural anaesthesia abolishes the cytokine response",0,"It blocks the neuroendocrine response but not cytokine release."]]],
 ["Thyroid",[["T4 is the main secreted hormone",1,""],["T3 has a longer half-life than T4",0,"T3 ~1 day, T4 ~7 days."],["Thyroid peroxidase iodinates tyrosine",1,""],["Propylthiouracil blocks peripheral conversion of T4 to T3",1,""],["The superior thyroid artery arises from the internal carotid",0,"External carotid."]]],
 ["Adrenal cortex",[["The zona glomerulosa produces aldosterone",1,""],["Etomidate inhibits 11β-hydroxylase",1,""],["ACTH is the main regulator of aldosterone",0,"Angiotensin II and K⁺."],["Cortisol is mostly bound to cortisol-binding globulin",1,""],["Dexamethasone has strong mineralocorticoid activity",0,"Almost none."]]],
 ["Catecholamine synthesis",[["Tyrosine hydroxylase is rate-limiting",1,""],["PNMT converts noradrenaline to adrenaline",1,""],["PNMT activity is induced by cortisol",1,""],["The adrenal medulla secretes mainly noradrenaline",0,"Mainly adrenaline (~80%)."],["Metanephrines are used to diagnose phaeochromocytoma",1,""]]],
 ["Phaeochromocytoma",[["β-blockade should start before α-blockade",0,"α first."],["Phenoxybenzamine is a non-competitive α-antagonist",1,""],["Hypoglycaemia can follow tumour removal",1,""],["Metoclopramide is safe as an antiemetic",0,"Can trigger a crisis."],["Hypotension after tumour ligation is common",1,""]]],
 ["Hepatic blood flow",[["The portal vein provides about 75% of flow",1,""],["The portal vein autoregulates",0,"It is passive."],["Adenosine mediates the hepatic arterial buffer response",1,""],["Positive pressure ventilation reduces hepatic blood flow",1,""],["Hypocapnia increases hepatic blood flow",0,"Hypocapnia reduces portal flow."]]],
 ["The liver",[["Zone 3 is most vulnerable to hypoxia",1,""],["Factor VIII is made only by hepatocytes",0,"Largely endothelial; often raised in liver disease."],["Albumin has a half-life of about 20 days",1,""],["Unconjugated bilirubin is water-soluble",0,"Conjugated bilirubin is water-soluble."],["Child–Pugh includes INR and albumin",1,""]]],
 ["Thermoregulation",[["The integrating centre is the preoptic anterior hypothalamus",1,""],["Radiation is the main heat loss in theatre",1,""],["Neonates rely mainly on shivering",0,"Non-shivering thermogenesis (brown fat)."],["General anaesthesia widens the interthreshold range",1,""],["Fever is due to a raised set point",1,""]]],
 ["Perioperative hypothermia",[["Is defined by NICE as a core temperature below 36 °C",1,""],["The first-hour fall is mainly due to heat loss to the environment",0,"Mainly redistribution."],["Increases surgical blood loss",1,""],["Prolongs neuromuscular block",1,""],["Prewarming reduces redistribution hypothermia",1,""]]],
 ["Carcinoid syndrome",[["Usually requires liver metastases from a gut primary",1,""],["Causes left-sided valve lesions in most cases",0,"Right-sided; the lung inactivates mediators."],["Octreotide is used to treat crises",1,""],["Adrenaline is the first-line vasopressor in crisis",0,"Catecholamines can worsen mediator release; use phenylephrine or vasopressin."],["Urinary 5-HIAA is raised",1,""]]],
 ["Obesity",[["FRC is reduced",1,""],["Induction doses of propofol are best based on lean body weight",1,""],["Suxamethonium is dosed on ideal body weight",0,"Total body weight."],["Obesity hypoventilation syndrome causes daytime hypercapnia",1,""],["Closing capacity may exceed FRC under anaesthesia",1,""]]],
];

const CRISIS=[
 ["Malignant hyperthermia","abp",["Recognise: unexplained rise in EtCO2 despite increased ventilation, tachycardia, masseter or generalised rigidity, rising temperature (often late), acidosis, hyperkalaemia, arrhythmias.","Call for help and the MH kit; stop volatile and suxamethonium; switch to TIVA; hyperventilate with 100% O2 at high flow; activated charcoal filters on the circuit.","Dantrolene 2.5 mg/kg IV, repeat 1 mg/kg every 5 min until signs resolve (up to 10 mg/kg). Ryanodex or traditional vials (20 mg with 3 g mannitol, 60 mL water each).","Treat hyperkalaemia (insulin/glucose, calcium), acidosis, arrhythmias (avoid calcium channel blockers with dantrolene); active cooling (stop at 38.5 °C).","Monitor CK, myoglobin, urine output (aim > 2 mL/kg/h), coagulation (DIC); ICU for 24 h; refer for testing (IVCT); family counselling."],"RyR1 mutation causes uncontrolled SR Ca²⁺ release: sustained contraction, hypermetabolism, heat and CO2 production."],
 ["Thyroid storm","etco2",["Suspect: hyperthermia, tachycardia/AF, agitation, heart failure, diarrhoea; triggers include surgery, infection, labour, iodine contrast. Can mimic MH or phaeochromocytoma.","Supportive: O2, cooling (avoid aspirin: displaces T4), fluids, treat heart failure.","β-blockade: propranolol (also reduces T4 → T3) or esmolol infusion.","Block synthesis: propylthiouracil (or carbimazole) orally/NG; then, 1 h later, iodine (Lugol's) to block release.","Hydrocortisone 100 mg 6-hourly; treat trigger; ICU."],"Excess T3 raises β-receptor numbers and metabolic rate; storm decompensates the heat and cardiovascular reserve."],
 ["Adrenal crisis","etco2",["Suspect in refractory hypotension, especially with known steroid use, Addison's, recent etomidate, sepsis, pituitary surgery, bilateral adrenalectomy.","Hydrocortisone 100 mg IV immediately (do not wait for cortisol result; take a sample first if possible).","Then 200 mg/24 h by infusion (or 50 mg 6-hourly).","Fluids: 0.9% saline 1 L in the first hour; glucose for hypoglycaemia; treat hyperkalaemia.","Find the trigger; ICU; endocrine review; taper later."],"Cortisol is permissive for vascular responses to catecholamines: without it pressors fail."],
 ["Phaeochromocytoma crisis during surgery","abp",["Severe hypertension and tachyarrhythmia with tumour handling, induction or insufflation.","Tell the surgeon to stop handling; deepen anaesthesia.","Phentolamine 1–2 mg boluses, or SNP/GTN infusion; magnesium sulfate 2–4 g; clevidipine.","Esmolol or labetalol for tachycardia only after α-blockade is effective.","After vein ligation: expect hypotension (fluids, noradrenaline, vasopressin) and hypoglycaemia."],"Catecholamine surge without adequate α-blockade: vasoconstriction, myocardial ischaemia, pulmonary oedema."],
 ["Carcinoid crisis","ecg",["Sudden hypotension, bronchospasm, flushing, tachycardia (or hypertension) during induction, tumour handling or embolisation.","Octreotide 20–50 µg IV bolus, repeat; increase infusion (50–100 µg/h).","Fluids; phenylephrine or vasopressin for hypotension (avoid adrenaline, ephedrine where possible).","Bronchospasm: octreotide, ipratropium, consider steroids; avoid adrenaline unless life-threatening.","Antihistamines (H1 and H2) for histamine-secreting tumours; HDU afterwards."],"Mediators (serotonin, kallikrein, histamine) cause vasodilatation and bronchoconstriction; catecholamines stimulate more release."],
 ["Acute porphyric attack (perioperative)","spo2",["Suspect: severe abdominal pain, vomiting, tachycardia, hypertension, confusion, seizures, weakness, hyponatraemia, dark urine after exposure to a trigger.","Stop all unsafe drugs; check a porphyria drug database.","IV glucose (e.g. 10% at 2–3 L/day) and haem arginate 3 mg/kg daily for 4 days.","Analgesia with opioids; antiemetic (ondansetron, prochlorperazine); β-blocker for tachycardia; treat hyponatraemia carefully.","Monitor vital capacity and power (progressive neuropathy can cause respiratory failure); seizures: levetiracetam or gabapentin, not phenytoin."],"Induction of ALA synthase floods the blocked haem pathway with neurotoxic ALA and PBG."],
];

const SRC="";
const ERR="";
const REFS="";

const DIAG=`<div class="grid2">
 <div class="fig" style="grid-column:1/-1"><h3>Metabolic map by state</h3>
  <div class="seg" id="mm-sel"></div>
  <div class="svgbox"><svg id="mm" viewBox="0 0 900 380" role="img" aria-label="Metabolic pathway map"></svg></div>
  <div class="readout" id="mm-r"></div></div>

 <div class="fig"><h3>Starvation over time</h3>
  <div class="ctl"><label>Days without food <input type="range" id="sv-d" min="0" max="40" step="0.5" value="3"><output id="sv-d-o"></output></label></div>
  <div class="svgbox"><svg id="sv" viewBox="0 0 520 300" role="img" aria-label="Starvation curves"></svg></div>
  <div class="readout" id="sv-r"></div></div>

 <div class="fig"><h3>Stress response timeline</h3>
  <div class="seg" id="st-sel"></div>
  <div class="svgbox"><svg id="st" viewBox="0 0 520 300" role="img" aria-label="Stress response"></svg></div>
  <div class="readout" id="st-r"></div></div>

 <div class="fig"><h3>Endocrine feedback loops</h3>
  <div class="seg" id="ax-sel"></div>
  <div class="seg" id="ax-st"></div>
  <div class="svgbox"><svg id="ax" viewBox="0 0 520 330" role="img" aria-label="Endocrine axis"></svg></div>
  <div class="readout" id="ax-r"></div></div>

 <div class="fig"><h3>Hepatic blood flow and the buffer response</h3>
  <div class="seg" id="hb-pre"></div>
  <div class="ctl"><label>Portal flow % of normal <input type="range" id="hb-p" min="0" max="150" step="1" value="100"><output id="hb-p-o"></output></label>
   <label>MAP mmHg <input type="range" id="hb-m" min="30" max="130" step="1" value="90"><output id="hb-m-o"></output></label>
   <label>HABR intact % <input type="range" id="hb-h" min="0" max="100" step="5" value="100"><output id="hb-h-o"></output></label></div>
  <div class="svgbox"><svg id="hb" viewBox="0 0 520 260" role="img" aria-label="Hepatic blood flow"></svg></div>
  <div class="readout" id="hb-r"></div></div>

 <div class="fig"><h3>Thermoregulatory thresholds</h3>
  <div class="seg" id="tt-sel"></div>
  <div class="svgbox"><svg id="tt" viewBox="0 0 520 240" role="img" aria-label="Thermoregulatory thresholds"></svg></div>
  <div class="readout" id="tt-r"></div></div>

 <div class="fig"><h3>Core temperature under anaesthesia</h3>
  <div class="seg" id="ht-sel"></div>
  <div class="svgbox"><svg id="ht" viewBox="0 0 520 290" role="img" aria-label="Perioperative hypothermia curve"></svg></div>
  <div class="readout" id="ht-r"></div></div>
</div>`;

function initDiagrams(){
 const out=(id,t)=>{const o=$("#"+id+"-o");if(o)o.textContent=t};
 const mk=svg=>(t,a,tx)=>{const e=document.createElementNS(SVGNS,t);for(const k in a)e.setAttribute(k,a[k]);if(tx!=null)e.textContent=tx;svg.append(e);return e};
 const smooth=(x,a,b)=>{const t=Math.min(1,Math.max(0,(x-a)/(b-a)));return t*t*(3-2*t)};

 /* 1. Metabolic map */
 const MM={fed:["Fed (insulin high)",["glyc","pdh","tca","etc","gsyn","lipo","hmp","prot"],"Insulin drives glucose into muscle and fat (GLUT4), glycogen synthesis, lipogenesis and protein synthesis. Gluconeogenesis, lipolysis and ketogenesis are switched off."],
  fast:["Overnight fast (0–24 h)",["glyc","pdh","tca","etc","glyco","gneo","lipol"],"Glucagon ↑, insulin ↓: liver glycogenolysis keeps glucose up; gluconeogenesis begins (lactate, alanine, glycerol); lipolysis supplies fatty acids to muscle."],
  starv:["Starvation (> 3 days)",["gneo","lipol","beta","keto","tca","etc"],"Glycogen gone. Fatty acids → β-oxidation → acetyl-CoA; oxaloacetate is diverted to gluconeogenesis so acetyl-CoA forms ketones, which the brain increasingly uses. Protein loss falls."],
  stress:["Surgical stress",["glyco","gneo","lipol","beta","protcat","glyc","tca","etc"],"Catecholamines, cortisol, glucagon and GH with insulin resistance: hyperglycaemia from glycogenolysis and gluconeogenesis, protein catabolism (amino acids to liver), lipolysis."],
  hyp:["Hypoxia / shock",["glyc","lact","glyco"],"No O2 for oxidative phosphorylation: pyruvate → lactate to regenerate NAD⁺; only 2 ATP per glucose. Lactic acidosis (type A)."],
  dka:["DKA (no insulin)",["glyco","gneo","lipol","beta","keto","protcat"],"Absolute insulin lack with counter-regulatory excess: unrestrained gluconeogenesis, lipolysis and ketogenesis; hyperglycaemia, osmotic diuresis, ketoacidosis."]};
 function drawMM(k){const svg=$("#mm");svg.innerHTML="";const add=mk(svg);const [nm,on,txt]=MM[k];
  const node=(id,x,y,l)=>{add("rect",{x:x-55,y:y-16,width:110,height:32,rx:8,fill:"var(--panel)",stroke:"var(--muted)"});add("text",{x,y:y+4,"text-anchor":"middle",class:"lbl","font-size":"12"},l)};
  const arrow=(id,x1,y1,x2,y2,l,lx,ly)=>{const a=on.includes(id);add("line",{x1,y1,x2,y2,stroke:a?"var(--abp)":"var(--line)","stroke-width":a?4:2});if(l)add("text",{x:lx??(x1+x2)/2+6,y:ly??(y1+y2)/2,"font-size":"11",fill:a?"var(--abp)":"var(--muted)","font-weight":a?"700":"400"},l)};
  arrow("glyco",130,60,130,140,"glycogenolysis",140,95);arrow("gsyn",110,140,110,60,"",0,0);add("text",{x:20,y:100,"font-size":"11",fill:on.includes("gsyn")?"var(--abp)":"var(--muted)"},"glycogenesis");
  arrow("glyc",120,170,120,250,"",0,0);add("text",{x:112,y:215,"text-anchor":"end","font-size":"11",fill:on.includes("glyc")?"var(--abp)":"var(--muted)","font-weight":on.includes("glyc")?"700":"400"},"glycolysis");arrow("gneo",160,250,160,170,"gluconeogenesis",170,200);
  arrow("hmp",195,155,320,155,"HMP shunt → NADPH",205,145);
  arrow("lact",70,265,10,265,"",0,0);add("text",{x:8,y:290,"font-size":"11",fill:on.includes("lact")?"var(--abp)":"var(--muted)"},"→ lactate");
  arrow("pdh",140,280,140,320,"PDH",150,305);
  arrow("tca",200,335,330,335,"",0,0);arrow("etc",470,335,560,335,"",0,0);
  arrow("lipol",720,60,720,140,"lipolysis",730,100);arrow("lipo",700,140,700,60,"",0,0);add("text",{x:610,y:100,"font-size":"11",fill:on.includes("lipo")?"var(--abp)":"var(--muted)"},"lipogenesis");
  arrow("beta",720,170,250,330,"β-oxidation",470,240);arrow("keto",250,345,250,360,"",0,0);
  arrow("protcat",560,60,200,255,"amino acids → liver",360,140);arrow("prot",540,60,540,30,"",0,0);
  node("gly",120,45,"Glycogen");node("glu",140,155,"Glucose");node("pyr",140,265,"Pyruvate");node("acoa",140,335,"Acetyl-CoA");node("tcaN",400,335,"TCA cycle");node("etcN",620,335,"ETC → ATP");node("tg",720,45,"Triglyceride");node("ffa",720,155,"Fatty acids");node("prt",560,45,"Muscle protein");
  add("text",{x:200,y:375,"font-size":"11",fill:on.includes("keto")?"var(--abp)":"var(--muted)","font-weight":on.includes("keto")?"700":"400"},"↓ ketone bodies (liver)");
  $("#mm-r").innerHTML=`<b>${nm}.</b> ${txt} Highlighted arrows are active.`}
 seg($("#mm-sel"),Object.entries(MM).map(([k,v])=>[k,v[0]]),drawMM,"fed");

 /* 2. Starvation */
 function drawSV(){const d=+$("#sv-d").value;out("sv-d",d.toFixed(1));
  const P=plot($("#sv"),{x0:0,x1:40,y0:0,y1:8,xt:[0,5,10,20,30,40],yt:[0,2,4,6,8],xl:"Days of starvation",yl:"Plasma mmol/L"});
  const glu=t=>5-1.2*smooth(t,0,3)+0.2*smooth(t,3,10),ket=t=>0.2+6.3*smooth(t,0.5,14),ffa=t=>0.5+1.3*smooth(t,0,4);
  P.line(range(0,40).map(t=>[t,glu(t)]),{stroke:"var(--spo2)"});P.line(range(0,40).map(t=>[t,ket(t)]),{stroke:"var(--abp)"});P.line(range(0,40).map(t=>[t,ffa(t)]),{stroke:"var(--etco2)"});
  P.text(32,glu(32)+0.3,"glucose",{fill:"var(--spo2)"});P.text(30,ket(30)+0.3,"ketones",{fill:"var(--abp)"});P.text(30,ffa(30)+0.3,"fatty acids",{fill:"var(--etco2)"});
  P.add("line",{x1:P.X(d),x2:P.X(d),y1:P.Y(0),y2:P.Y(8),stroke:"var(--ink)","stroke-dasharray":"4 3"});
  const kb=d<1?0:d<3?15*d/3+0:d<21?30+40*smooth(d,3,21):70,prot=d<1?40:d<3?75:75-55*smooth(d,3,21),gly=Math.max(0,100-100*d/1);
  $("#sv-r").innerHTML=`Day ${d.toFixed(1)}: glucose ${glu(d).toFixed(1)}, ketones ${ket(d).toFixed(1)} mmol/L · brain energy from ketones ≈ <b>${kb.toFixed(0)}%</b> · protein broken down ≈ <b>${prot.toFixed(0)} g/day</b> · liver glycogen ${gly>0?gly.toFixed(0)+"%":"exhausted"}. Fat stores (~135 000 kcal) set the limit of survival.`}
 $("#sv-d").oninput=drawSV;drawSV();

 /* 3. Stress response */
 const STR={ga:["Volatile GA, major abdominal surgery",1,1,"Full neuroendocrine and cytokine response: catecholamines within minutes, cortisol peaks at 4–6 h, glucose rises, IL-6 peaks at 12–24 h, negative nitrogen balance for days."],epi:["Lumbar epidural (lower abdominal/limb)",0.25,0.95,"Afferent block abolishes most of the cortisol, catecholamine and glucose rise; IL-6 (tissue injury) is barely changed."],op:["High-dose opioid (e.g. fentanyl 50 µg/kg)",0.4,0.95,"Hypothalamic suppression attenuates hormonal responses during surgery; they return afterwards."],lap:["Laparoscopic surgery + ERAS",0.7,0.55,"Smaller wound: lower IL-6 and CRP; carbohydrate loading and early feeding reduce insulin resistance."]};
 function drawST(k){const [nm,hor,cyt,txt]=STR[k];const P=plot($("#st"),{x0:0,x1:72,y0:0,y1:110,xt:[0,6,12,24,48,72],yt:[0,25,50,75,100],xl:"Hours after incision",yl:"% of peak (GA reference)"});
  const cat=t=>100*Math.exp(-t/6)*smooth(t,0,0.5),cort=t=>100*(smooth(t,0,5)*Math.exp(-Math.max(0,t-6)/30)),glu=t=>100*smooth(t,0,3)*Math.exp(-Math.max(0,t-8)/40),il6=t=>100*smooth(t,0,16)*Math.exp(-Math.max(0,t-18)/30);
  const s=[["catecholamines",cat,"var(--abp)",hor],["cortisol",cort,"var(--etco2)",hor],["glucose",glu,"var(--spo2)",hor],["IL-6",il6,"var(--nibp)",cyt]];
  s.forEach(([n,f,c,m])=>{P.line(range(0,72,150).map(t=>[t,f(t)]),{stroke:c,"stroke-dasharray":"4 4","stroke-width":1.1,opacity:.6});P.line(range(0,72,150).map(t=>[t,f(t)*m]),{stroke:c})});
  [["catecholamines",2,92],["cortisol",8,104],["glucose",30,60],["IL-6",50,80]].forEach(([n,x,y],i)=>P.text(x,y*(i===3?cyt:hor),n,{fill:s[i][2]}));
  $("#st-r").innerHTML=`<b>${nm}.</b> ${txt} Dashed lines show the unmodified GA response.`}
 seg($("#st-sel"),Object.entries(STR).map(([k,v])=>[k,v[0]]),drawST,"ga");

 /* 4. Endocrine axes */
 const AX={hpa:{names:["Hypothalamus","CRH","Anterior pituitary","ACTH","Adrenal cortex","Cortisol"],states:{n:["Normal",[0,0,0],"Cortisol feeds back on CRH and ACTH; circadian peak on waking."],ex:["Exogenous steroids",[-1,-1,1],"Exogenous glucocorticoid suppresses CRH and ACTH; the adrenal cortex atrophies, so surgery cannot raise cortisol: give cover. (Cortisol column shows total glucocorticoid effect.)"],add:["Addison's (primary)",[1,1,-1],"Adrenal destruction: low cortisol (and aldosterone), loss of feedback drives very high ACTH (pigmentation)."],cush:["Cushing's disease (pituitary)",[-1,1,1],"ACTH-secreting adenoma: high ACTH and cortisol; CRH suppressed."],eto:["Etomidate",[1,1,-1],"11β-hydroxylase blocked: cortisol falls for 6–24 h after one dose, ACTH rises."]}},
  hpt:{names:["Hypothalamus","TRH","Anterior pituitary","TSH","Thyroid","T4 / T3"],states:{n:["Normal",[0,0,0],"T4/T3 inhibit TRH and TSH."],gr:["Graves' disease",[-1,-1,1],"TSH-receptor antibodies drive the gland: high T4/T3, suppressed TSH."],hypo:["Primary hypothyroidism",[1,1,-1],"Gland failure: low T4, high TSH (most sensitive test)."],sec:["Pituitary failure",[1,-1,-1],"Low TSH with low T4: TSH alone would mislead."],sick:["Sick euthyroid / stress",[0,-0.3,-0.5],"Low T3 with normal or low TSH; reverse T3 rises; do not treat."]}}};
 let axK="hpa",axS="n";
 function drawAX(){const A=AX[axK],[nm,lv,txt]=A.states[axS]||A.states.n;const svg=$("#ax");svg.innerHTML="";const add=mk(svg);
  const ys=[40,150,260];[0,1,2].forEach(i=>{add("rect",{x:40,y:ys[i]-22,width:170,height:44,rx:10,fill:"var(--panel)",stroke:"var(--muted)"});add("text",{x:125,y:ys[i]+5,"text-anchor":"middle",class:"lbl"},A.names[i*2]);
   if(i<2){add("line",{x1:125,y1:ys[i]+22,x2:125,y2:ys[i+1]-22,stroke:"var(--good)","stroke-width":3});add("text",{x:135,y:(ys[i]+ys[i+1])/2+4,"font-size":"12",fill:"var(--good)"},"+ "+A.names[i*2+1])}});
  add("path",{d:`M210 ${ys[2]} C300 ${ys[2]} 300 ${ys[0]} 210 ${ys[0]}`,fill:"none",stroke:"var(--bad)","stroke-width":2,"stroke-dasharray":"6 4"});add("path",{d:`M210 ${ys[2]-10} C260 ${ys[2]-10} 260 ${ys[1]} 210 ${ys[1]}`,fill:"none",stroke:"var(--bad)","stroke-width":2,"stroke-dasharray":"6 4"});add("text",{x:265,y:ys[1]-30,"font-size":"11",fill:"var(--bad)"},"− feedback by "+A.names[5]);
  const labels=[A.names[1],A.names[3],A.names[5]];labels.forEach((l,i)=>{const v=lv[i];const x=340+i*60,h=60+v*45;add("rect",{x,y:300-h,width:40,height:h,fill:v>0?"var(--abp)":v<0?"var(--spo2)":"var(--muted)",opacity:.8});add("text",{x:x+20,y:318,"text-anchor":"middle","font-size":"11"},l);add("text",{x:x+20,y:292-h,"text-anchor":"middle","font-size":"12"},v>0?"↑":v<0?"↓":"N")});
  $("#ax-r").innerHTML=`<b>${nm}.</b> ${txt}`}
 function setAxStates(){seg($("#ax-st"),Object.entries(AX[axK].states).map(([k,v])=>[k,v[0]]),k=>{axS=k;drawAX()},"n")}
 seg($("#ax-sel"),[["hpa","Hypothalamic–pituitary–adrenal"],["hpt","Hypothalamic–pituitary–thyroid"]],k=>{axK=k;axS="n";setAxStates()},"hpa");

 /* 5. Hepatic blood flow */
 const HB={n:[100,90,100,"Normal: portal ~1.1 L/min, artery ~0.4 L/min."],hem:[55,60,100,"Haemorrhage: splanchnic vasoconstriction cuts portal flow; HABR raises arterial flow, but low MAP limits it."],cir:[60,85,60,"Cirrhosis: high portal resistance (portosystemic shunting) reduces portal flow; arterial fraction rises."],ppv:[80,85,100,"PPV + PEEP: raised hepatic venous pressure and lower CO reduce both inflows."],prin:[0,90,0,"Pringle manoeuvre: portal vein and hepatic artery both clamped: no inflow (warm ischaemia)."],hal:[75,75,30,"Halothane-like agent: HABR impaired and MAP lower: total flow and O2 delivery fall."]};
 function setHB(k){const v=HB[k];$("#hb-p").value=v[0];$("#hb-m").value=v[1];$("#hb-h").value=v[2];$("#hb-r").dataset.note=v[3];drawHB()}
 function drawHB(){const p=+$("#hb-p").value,m=+$("#hb-m").value,h=+$("#hb-h").value;out("hb-p",p+"%");out("hb-m",m);out("hb-h",h+"%");
  const pv=1.1*p/100,auto=m>=60?1:m/60,habr=Math.max(0,(100-p)/100)*1.1*0.4*(h/100);const prin=p===0&&h===0;const ha=prin?0:Math.min(1.4,(0.4*auto+habr)*Math.min(1,m/60+0.0));const tot=pv+ha;const o2=pv*0.75+ha*1.0;
  const svg=$("#hb");svg.innerHTML="";const add=mk(svg);const sc=220;
  [["Portal vein",pv,"var(--nibp)"],["Hepatic artery",ha,"var(--abp)"],["Total",tot,"var(--spo2)"]].forEach(([l,v,c],i)=>{const y=30+i*60;add("text",{x:20,y:y+18,class:"lbl"},l);add("rect",{x:150,y,width:330,height:26,fill:"var(--soft)",rx:4});add("rect",{x:150,y,width:Math.max(2,Math.min(330,v*sc)),height:26,fill:c,rx:4,opacity:.85});add("text",{x:156,y:y+18,"font-size":"12"},v.toFixed(2)+" L/min")});
  add("text",{x:20,y:230,"font-size":"12"},`Relative O2 delivery ${(o2/(1.1*0.75+0.4)*100).toFixed(0)}% · arterial share of flow ${(tot>0?ha/tot*100:0).toFixed(0)}%`);
  $("#hb-r").innerHTML=`${$("#hb-r").dataset.note||""} The HABR offsets part of any portal fall (here ${(habr).toFixed(2)} L/min). Portal flow itself is never autoregulated.`}
 seg($("#hb-pre"),[["n","Normal"],["hem","Haemorrhage"],["cir","Cirrhosis"],["ppv","PPV + PEEP"],["prin","Pringle"],["hal","Impaired HABR"]],setHB,"n");["#hb-p","#hb-m","#hb-h"].forEach(s=>$(s).oninput=()=>{$("#hb-r").dataset.note="";drawHB()});

 /* 6. Thresholds */
 const TT={aw:["Awake",[36.0,36.6,36.8,37.0],"Interthreshold range only ~0.2–0.4 °C: tiny changes trigger responses."],ga:["General anaesthesia",[33.8,34.6,37.8,38.0],"Volatiles and propofol lower the vasoconstriction and shivering thresholds by ~2–3 °C and raise sweating by ~1 °C: a 3–4 °C range where the body does nothing."],na:["Neuraxial (spinal/epidural)",[35.5,36.0,37.0,37.2],"Thresholds fall ~0.5 °C, and below the block vasoconstriction and shivering cannot occur at all; the patient may not feel cold."],eld:["Elderly",[35.4,35.9,37.0,37.2],"Thresholds lower and responses weaker: cool more easily and later."]};
 function drawTT(k){const [nm,t,txt]=TT[k];const svg=$("#tt");svg.innerHTML="";const add=mk(svg);const X=v=>40+(v-33)*(440/6);
  add("line",{x1:X(33),x2:X(39),y1:150,y2:150,stroke:"var(--muted)"});for(let v=33;v<=39;v++){add("line",{x1:X(v),x2:X(v),y1:146,y2:154,stroke:"var(--muted)"});add("text",{x:X(v),y:172,"text-anchor":"middle"},v+" °C")}
  add("rect",{x:X(t[1]),y:120,width:X(t[2])-X(t[1]),height:24,fill:"var(--good)",opacity:.15});add("text",{x:(X(t[1])+X(t[2]))/2,y:136,"text-anchor":"middle","font-size":"11"},"interthreshold range");
  [["shivering",t[0],"var(--spo2)",40,"end"],["vasoconstriction",t[1],"var(--nibp)",70,"end"],["sweating",t[2],"var(--abp)",70,"start"],["active vasodilatation",t[3],"var(--etco2)",40,"start"]].forEach(([l,v,c,y,an])=>{add("line",{x1:X(v),x2:X(v),y1:y+8,y2:150,stroke:c,"stroke-width":3});add("text",{x:X(v)+(an==="end"?4:-4),y,"text-anchor":an,"font-size":"11",fill:c},`${l} ${v.toFixed(1)}`)});
  add("text",{x:40,y:210,class:"lbl"},`Range ${(t[2]-t[1]).toFixed(1)} °C`);
  $("#tt-r").innerHTML=`<b>${nm}.</b> ${txt}`}
 seg($("#tt-sel"),Object.entries(TT).map(([k,v])=>[k,v[0]]),drawTT,"ga");

 /* 7. Hypothermia curve */
 const HT={un:["GA, unwarmed",1.2,0.4,34.6,"Redistribution (~1.2 °C in the first hour), linear loss, then plateau when vasoconstriction returns near 34.5 °C."],pre:["Prewarmed 30 min + forced air",0.35,-0.05,36.3,"Prewarming raises peripheral heat content so redistribution is small; forced air then holds temperature above 36 °C."],epi:["GA + epidural, unwarmed",1.4,0.55,33.0,"Redistribution plus loss of vasoconstriction below the block: no plateau and the steepest fall."],warm:["GA + forced air only",1.0,0.0,35.8,"Warming does not prevent redistribution but stops the linear phase."]};
 function drawHT(k){const [nm,red,lin,floor,txt]=HT[k];const P=plot($("#ht"),{x0:0,x1:4,y0:32.5,y1:37.5,xt:[0,1,2,3,4],yt:[33,34,35,36,37],xl:"Hours after induction",yl:"Core temperature °C"});
  const T=t=>{let v=37-red*(1-Math.exp(-t*2.5))-lin*Math.max(0,t-0.8);return Math.max(floor,v)};
  P.add("rect",{x:P.X(0),y:P.Y(36),width:P.X(4)-P.X(0),height:P.Y(32.5)-P.Y(36),fill:"var(--abp)",opacity:.06});P.text(3.1,35.8,"< 36 °C",{fill:"var(--abp)"});
  P.line(range(0,4,160).map(t=>[t,T(t)]),{stroke:"var(--spo2)"});P.text(0.2,T(0.6)-0.25,"redistribution",{"font-size":"11"});P.text(1.5,T(1.6)+0.2,"linear",{"font-size":"11"});if(lin>0.3)P.text(3.2,T(3.5)+0.2,"plateau?",{"font-size":"11"});
  $("#ht-r").innerHTML=`<b>${nm}.</b> ${txt} Temperature at 3 h ≈ ${T(3).toFixed(1)} °C.`}
 seg($("#ht-sel"),Object.entries(HT).map(([k,v])=>[k,v[0]]),drawHT,"un");
}

ATLAS.register({id:"05",name:"Liver, endocrine, metabolism",
  lede:"Metabolism, endocrine glands, the liver and gut, temperature, and their disorders.",
  barsNote:"",
  bars:BARS,fam:FAM,slides:SLIDES,calcs:CALCS,tables:TABLES,cards:CARDS,fcf:FCF,viva:VIVA,quiz:QUIZ,crisis:CRISIS,
  sources:SRC,errata:ERR,refs:REFS,diagHTML:DIAG,initDiagrams,
  diagLede:"Seven live diagrams: metabolic map by state, starvation, the stress response with modifiers, endocrine feedback loops, hepatic blood flow and the buffer response, thermoregulatory thresholds and perioperative hypothermia."});
})();
