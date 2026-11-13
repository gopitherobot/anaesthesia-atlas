/* Stage 07 · Pharmacological principles */
(function(){
const {plot,range,el,SVGNS,fmt,$,$$,seg}=ATLAS.h;

const BARS=[];

const FAM={pk:["spo2","Pharmacokinetics"],tci:["abp","Models & TCI"],pd:["etco2","Pharmacodynamics"],chem:["nibp","Chemistry & genetics"],stat:["ecg","Statistics"]};

const SLIDES=[
{f:"pk",t:"Absorption and bioavailability",b:`<ul class="clean"><li><b>Bioavailability (F)</b>: fraction of an administered dose that reaches the systemic circulation unchanged. F = AUC<sub>oral</sub> × Dose<sub>IV</sub> / (AUC<sub>IV</sub> × Dose<sub>oral</sub>). IV = 1.</li>
<li><b>Factors</b>: drug (formulation, lipid solubility, pKa, molecular size, stability in acid), patient (gastric pH and emptying, gut motility, blood flow, food, mucosal area, first-pass metabolism by gut wall and liver).</li>
<li><b>First-pass metabolism</b>: e.g. morphine (F ~0.3), GTN (~0.01), propranolol, lidocaine (hence not given orally), midazolam. Avoided by sublingual, buccal, rectal (partly: inferior and middle rectal veins bypass the portal system), transdermal, intranasal, inhalational, IV, IM, SC routes.</li>
<li><b>Membrane passage</b>: passive diffusion of the unionised, lipid-soluble form (Fick's law: rate ∝ area × concentration gradient / thickness), facilitated diffusion, active transport (P-glycoprotein efflux), pinocytosis.</li>
<li><b>Transdermal</b>: needs low molecular weight, high potency, lipid and some water solubility (fentanyl, buprenorphine, GTN, hyoscine, lidocaine). Slow onset, depot in skin, absorption rises with heat (warming blankets!).</li>
<li><b>Other routes</b>: intranasal (diamorphine, fentanyl, dexmedetomidine, midazolam in children), inhalation (volatiles, salbutamol), neuraxial, IO (same as IV), IM (depends on muscle blood flow: poor in shock).</li></ul>`,
p:"Hepatic extraction ratio decides oral bioavailability: high-extraction drugs (E > 0.7: lidocaine, propranolol, morphine, GTN) have low oral F; low-extraction drugs (warfarin, diazepam, phenytoin) have high F.",
v:"Define F with the AUC equation and draw the oral vs IV concentration–time curves; then factors (drug, patient), first pass, and routes that avoid it."},
{f:"pk",t:"Distribution and volume of distribution",b:`<ul class="clean"><li><b>Vd</b>: the apparent volume into which a drug would have to distribute to give the measured plasma concentration. Vd = Dose / C<sub>0</sub> (one-compartment). Units L or L/kg.</li>
<li>Large Vd (≫ TBW ~0.6 L/kg): lipid-soluble, tissue-bound drugs (propofol ~4 L/kg, fentanyl ~4, digoxin ~7, amiodarone ~60). Small Vd (~ECF 0.2 L/kg): polar, protein-bound or large molecules (NMBAs 0.2–0.3, warfarin 0.1, heparin 0.06).</li>
<li><b>Determinants</b>: lipid solubility, ionisation (pKa vs pH), plasma and tissue protein binding, molecular size, regional blood flow, active transport, body composition (age, obesity, pregnancy, oedema).</li>
<li><b>Protein binding</b>: albumin binds acidic and neutral drugs (thiopental, NSAIDs, warfarin, benzodiazepines); α1-acid glycoprotein binds basic drugs (local anaesthetics, opioids, propranolol). α1-AGP rises after surgery, trauma, burns and cancer (more binding) and is low in neonates and pregnancy (more free LA: toxicity). Only the free fraction is active and filtered; displacement matters only for drugs with high binding, small Vd and narrow therapeutic index.</li>
<li><b>Redistribution</b>: after a bolus, drug moves first to the vessel-rich group (brain, heart, liver, kidney: ~75% of CO, ~10% of mass), then muscle, then fat. Awakening after a single dose of propofol or thiopental is due to redistribution, not elimination.</li>
<li><b>Barriers</b>: BBB (Stage 3); placenta (small, lipid-soluble, unionised, unbound drugs cross: most anaesthetics; NMBAs, glycopyrrolate, heparin and insulin do not). Ion trapping of basic drugs in an acidotic fetus.</li></ul>`,
p:"Loading dose depends on Vd; maintenance dose depends on clearance. Write both on the board before any calculation.",
v:"Define Vd, explain why it can exceed body volume, list determinants, then protein binding (which protein binds what, what changes it), redistribution, and barriers."},
{f:"pk",t:"Metabolism",b:`<ul class="clean"><li>Purpose: make lipid-soluble drugs water-soluble for excretion. Mostly hepatic; also gut wall, lung, kidney, plasma, tissues.</li>
<li><b>Phase I</b> (functionalisation): oxidation (cytochrome P450, mainly CYP3A4 ~50% of drugs, 2D6, 2C9, 2C19, 1A2, 2E1), reduction, hydrolysis (esterases, amidases).</li>
<li><b>Phase II</b> (conjugation): glucuronidation (morphine → M3G, M6G; propofol), sulphation (paracetamol in children), acetylation (NAT2: isoniazid, hydralazine; fast/slow acetylators), methylation, glutathione (NAPQI detoxification).</li>
<li><b>Enzyme induction</b> (slow, days–weeks; more enzyme): rifampicin, phenytoin, carbamazepine, phenobarbital, chronic alcohol, smoking (CYP1A2), St John's wort. <b>Inhibition</b> (fast; competitive): erythromycin, clarithromycin, fluconazole, ketoconazole, cimetidine, grapefruit juice, amiodarone, ritonavir, acute alcohol. Clinical: midazolam and alfentanil prolonged by erythromycin; warfarin INR changes.</li>
<li><b>Non-hepatic metabolism</b>: plasma (butyryl)cholinesterase (suxamethonium, mivacurium, ester LAs), non-specific tissue and RBC esterases (remifentanil, esmolol, atracurium partly), Hofmann degradation (atracurium, cisatracurium: pH- and temperature-dependent), lung (prilocaine, angiotensin I).</li>
<li><b>Prodrugs</b>: codeine (→ morphine by CYP2D6), tramadol (→ O-desmethyltramadol), clopidogrel, enalapril, diamorphine (→ 6-MAM → morphine), parecoxib, fospropofol, cyclophosphamide.</li></ul>`,
p:"Active or toxic metabolites matter in renal failure: morphine-6-glucuronide (opioid), norpethidine (seizures), laudanosine from atracurium (seizures at very high levels), M3G (hyperalgesia).",
v:"Phase I vs II with examples, CYP450 isoforms, induction vs inhibition with anaesthetic examples, non-hepatic routes, prodrugs."},
{f:"pk",t:"Elimination and clearance",b:`<ul class="clean"><li><b>Clearance (CL)</b>: volume of plasma completely cleared of drug per unit time (mL/min). Rate of elimination = CL × C<sub>p</sub>. Total CL = hepatic + renal + other.</li>
<li><b>Organ clearance</b> = Q × E (blood flow × extraction ratio). <b>Well-stirred model</b>: CL<sub>H</sub> = Q × f<sub>u</sub> × CL<sub>int</sub> / (Q + f<sub>u</sub> × CL<sub>int</sub>).
<ul class="clean"><li>High extraction (E &gt; 0.7, flow-limited): propofol, lidocaine, morphine, fentanyl, ketamine, propranolol. Clearance follows hepatic blood flow (falls with low CO, β-blockers, volatiles).</li>
<li>Low extraction (E &lt; 0.3, capacity-limited): thiopental, diazepam, warfarin, phenytoin, alfentanil (~0.3–0.5), theophylline. Clearance follows enzyme activity and free fraction (induction, inhibition, protein binding).</li></ul></li>
<li><b>Renal excretion</b> = filtration (unbound drug) + active secretion (PCT: organic acids, e.g. penicillin, furosemide; organic bases) − reabsorption (passive, of unionised lipid-soluble drug; urinary pH matters: alkalinise urine for salicylate and phenobarbital).</li>
<li>Other routes: bile (enterohepatic recirculation: oestrogens, morphine glucuronide, rocuronium partly), lungs (volatiles, N2O), breast milk, saliva, sweat.</li>
<li><b>Elimination vs excretion</b>: elimination = all removal (metabolism + excretion); excretion = removal from the body unchanged or as metabolites.</li></ul>`,
p:"Propofol clearance (~2 L/min) exceeds hepatic blood flow (1.5 L/min), proving extrahepatic metabolism (kidney, lung).",
v:"Define CL and its units, write CL = Q × E and the well-stirred model, give high- and low-extraction examples, then renal handling of drugs."},
{f:"pk",t:"Exponentials, half-life and kinetic order",b:`<ul class="clean"><li><b>First-order</b>: a constant <i>fraction</i> eliminated per unit time; rate ∝ concentration. C = C<sub>0</sub>e<sup>−kt</sup>; straight line on log C vs time. Most drugs at clinical doses.</li>
<li><b>Rate constant</b> k = CL / Vd. <b>Time constant</b> τ = 1/k = Vd/CL: time to fall to 37% (or the time it would take to reach zero if the initial rate continued). <b>Half-life</b> t½ = 0.693 × τ = 0.693 Vd / CL.</li>
<li>After 1, 2, 3, 4, 5 half-lives: 50, 75, 87.5, 93.75, 96.9% eliminated. After 1, 2, 3 time constants: 63, 86.5, 95%.</li>
<li><b>Infusion without loading</b>: concentration rises as a wash-in exponential, reaching ~97% of steady state after 5 half-lives. C<sub>ss</sub> = infusion rate / CL. Steady-state level is independent of Vd; time to reach it depends on t½.</li>
<li><b>Zero-order (saturation)</b>: a constant <i>amount</i> per unit time; linear fall on a linear plot. Enzyme saturated: ethanol, phenytoin, salicylates, thiopental at high doses, theophylline. Small dose increases cause large concentration rises.</li>
<li><b>Michaelis–Menten</b>: V = V<sub>max</sub>[S] / (K<sub>m</sub> + [S]): a rectangular hyperbola. First-order when [S] ≪ K<sub>m</sub>; zero-order when [S] ≫ K<sub>m</sub>. K<sub>m</sub> = [S] at half V<sub>max</sub>.</li></ul>`,
p:"e (2.718) is the base for which the rate of change of e<sup>x</sup> equals its value. Exponential decay: rate proportional to amount remaining; the same maths describes capacitor discharge, lung emptying, washout.",
v:"Draw the decay curve (linear and log axes), mark t½ and τ, then the wash-in curve for an infusion, then zero- vs first-order with the Michaelis–Menten curve."},
{f:"tci",t:"Compartment models",b:`<ul class="clean"><li><b>One-compartment</b>: instant mixing in one volume, single exponential decay. Rarely true.</li>
<li><b>Two-compartment</b>: central (V1, plasma and vessel-rich tissue) and peripheral (V2). Bi-exponential decline: fast distribution (α) then slow elimination (β): C = Ae<sup>−αt</sup> + Be<sup>−βt</sup>.</li>
<li><b>Three-compartment</b> (most anaesthetic drugs): V1 central, V2 fast peripheral (muscle, well perfused), V3 slow peripheral (fat). Micro-rate constants k10 (elimination), k12, k21, k13, k31. Tri-exponential decay: C = Ae<sup>−αt</sup> + Be<sup>−βt</sup> + Ge<sup>−γt</sup>. Elimination occurs only from V1.</li>
<li>An <b>effect-site compartment</b> (negligible volume) linked to V1 by <b>k<sub>e0</sub></b> explains the delay between plasma concentration and effect (hysteresis). Time to peak effect after a bolus: propofol ~1.5–2 min, fentanyl ~3.5 min, alfentanil ~1.5 min, remifentanil ~1.5 min, morphine ~15–20 min.</li>
<li><b>Limitations</b>: compartments are mathematical, not anatomical; parameters come from small volunteer studies; ignore cardiac output, protein binding changes, age extremes, obesity, critical illness.</li>
<li><b>Physiological (PBPK) models</b> use real organ volumes and flows; <b>non-compartmental</b> analysis uses AUC and statistical moments (mean residence time).</li></ul>`,
p:"Front-end kinetics: in the first minutes the drug is not mixed in V1. Low cardiac output (elderly, shock) gives higher peak concentrations from the same bolus: reduce induction doses.",
v:"Draw the 3-compartment diagram with rate constants, then the log C vs time curve with three slopes; explain what each phase represents and the limitations."},
{f:"tci",t:"Context-sensitive half-time and decrement times",b:`<ul class="clean"><li><b>Definition</b> (Hughes 1992): time for the plasma concentration to fall by 50% after stopping an infusion designed to maintain a constant concentration. The "context" is the infusion duration.</li>
<li>Depends on the infusion duration and on how much drug has filled the peripheral compartments (which flow back into plasma when the infusion stops), not on the elimination half-life alone.</li>
<li><b>Values</b> (approximate, 3–8 h infusions): remifentanil 3–4 min whatever the duration (rapid esterase clearance, small peripheral volumes); sufentanil and propofol &lt; 40 min up to 8 h; alfentanil plateaus ~50–60 min after ~2 h; fentanyl rises steeply to &gt; 4 h after 8 h; thiopental and midazolam rise steadily.</li>
<li><b>Decrement time</b>: time to fall by any stated percentage (e.g. 80%) or to a stated level (propofol wake-up ~1.2 µg/mL). The CSHT does not equal time to waking: waking may need a 50%, 70% or 80% fall depending on the drug combination.</li>
<li><b>Effect-site decrement times</b> are more clinically relevant than plasma ones.</li></ul>`,
p:"Remifentanil's speed means no residual analgesia: give long-acting analgesia (morphine, regional, paracetamol, NSAID) before stopping it, and beware hyperalgesia after high-dose infusions.",
v:"Define CSHT, explain why it differs from elimination half-life, draw the classic curves (Diagrams tab simulates them from model parameters), then decrement times."},
{f:"tci",t:"TIVA and target-controlled infusion",b:`<ul class="clean"><li><b>TCI</b>: a microprocessor-driven pump runs a three-compartment model (with an effect site) to achieve and hold a target concentration, plasma (Cp) or effect site (Ce). Uses the <b>BET</b> principle: Bolus to fill V1, Elimination replacement (k10 × V1 × C), Transfer replacement to peripheral compartments (decreasing exponentially).</li>
<li><b>Marsh</b> (propofol): weight only. V1 = 0.228 L/kg (≈ 16 L in 70 kg), k10 0.119, k12 0.112, k13 0.042, k21 0.055, k31 0.0033 min⁻¹. Original k<sub>e0</sub> 0.26; <b>modified Marsh</b> uses k<sub>e0</sub> 1.2 (Diprifusor plasma targeting; effect-site option on newer pumps).</li>
<li><b>Schnider</b> (propofol): fixed V1 4.27 L, V3 238 L; V2, k12, k21 adjusted for age; k10 for weight, lean body mass (James formula) and height; k<sub>e0</sub> 0.456. Use in effect-site mode (plasma mode gives small boluses). LBM formula fails at high BMI, so pumps restrict entries.</li>
<li><b>Eleveld</b> (2018): general-purpose propofol model from pooled data across ages (children to elderly) and body sizes, with optional opioid co-administration; now on some pumps. <b>Minto</b> for remifentanil (age, LBM); <b>Paedfusor</b> and <b>Kataria</b> for children.</li>
<li><b>TIVA benefits</b>: less PONV, MH-safe, smoother emergence, no volatile in neuromonitoring cases, tubeless airway surgery and transfer, lower environmental impact, may reduce delirium (evidence mixed).</li>
<li><b>Risks (NAP5)</b>: accidental awareness from disconnection, tissued cannula, wrong syringe or concentration, or pump programming errors. Use a dedicated visible cannula, anti-reflux/anti-syphon valves, processed EEG when paralysed, pumps programmed after loading syringes.</li></ul>`,
p:"Typical exam question: 'Propofol: Vd, dose–response, Marsh model, how do you calculate it, propofol infusion syndrome, calories in ICU'. Use the TCI simulator in the Diagrams tab and the Marsh calculator in the Formulas tab.",
v:"Explain BET, compare Marsh and Schnider (inputs, V1, k<sub>e0</sub>, effect on bolus), describe what the pump does when you raise and lower the target, then limits and safety (NAP5)."},
{f:"tci",t:"Pharmacokinetics in special populations",b:`<div class="tbl"><table><tr><th>Group</th><th>Changes</th><th>Practice</th></tr>
<tr><td>Elderly</td><td>↓ V1 and CO (higher peaks), ↓ hepatic and renal clearance, ↑ fat (larger Vd lipophilic), ↓ albumin, ↑ sensitivity (MAC ↓ 6%/decade)</td><td>Lower, slower induction; lower TCI targets; reduce maintenance</td></tr>
<tr><td>Obese</td><td>↑ fat and lean mass, ↑ CO and blood volume, ↑ Vd lipophilic, variable clearance</td><td>Dose by scalar (Stage 5): induction by LBW, maintenance by adjusted weight; Eleveld/adjusted weight for TCI</td></tr>
<tr><td>Neonates and infants</td><td>↑ TBW and ECF (larger Vd for polar drugs), ↓ albumin and α1-AGP, immature CYP and glucuronidation, ↓ GFR, immature BBB</td><td>mg/kg doses higher for some drugs, longer intervals; caution with opioids</td></tr>
<tr><td>Pregnancy</td><td>↑ blood volume and CO, ↑ GFR, ↓ albumin and α1-AGP, ↓ MAC (~30%), progesterone effects</td><td>More free LA (toxicity), faster renal clearance</td></tr>
<tr><td>Renal failure</td><td>Accumulation of renally cleared drugs and metabolites, ↓ protein binding, uraemic sensitivity</td><td>Avoid morphine, pethidine; dose by CrCl (Stage 4)</td></tr>
<tr><td>Liver disease</td><td>↓ metabolism, ↓ albumin, ↑ Vd (ascites), portosystemic shunting (↑ oral F)</td><td>Reduce benzodiazepines and opioids; atracurium (Stage 5)</td></tr>
<tr><td>Cardiopulmonary bypass</td><td>Haemodilution, sequestration in circuit, hypothermia ↓ clearance, ↓ protein binding</td><td>Top-up doses on bypass; delayed elimination</td></tr>
<tr><td>Critical illness</td><td>Capillary leak, augmented renal clearance, organ failure, ECMO sequestration</td><td>Therapeutic drug monitoring</td></tr></table></div>`,
p:"Asked in EDAIC as 'factors determining distribution, metabolism and elimination of anaesthetic drugs, changes with drug interactions and in the presence of disease'. This table is the backbone of that answer.",
v:"Pick each PK process (absorption, distribution, metabolism, excretion) and show how age, size, pregnancy and organ failure alter it."},
{f:"pd",t:"Receptors and signal transduction",b:`<ul class="clean"><li><b>Drug targets</b>: receptors, ion channels, enzymes, carriers/transporters; also physicochemical actions (antacids, chelators, sugammadex encapsulation, osmotic diuretics, protamine).</li>
<li><b>Ligand-gated ion channels</b> (milliseconds): nicotinic ACh, GABA<sub>A</sub>, glycine, 5-HT3, NMDA/AMPA. Pentamers (or tetramers for glutamate).</li>
<li><b>G-protein coupled receptors</b> (seconds): seven transmembrane domains. Gs (↑ adenylyl cyclase, cAMP, PKA: β, D1, H2, V2), Gi (↓ cAMP, opens K⁺, closes Ca²⁺: α2, M2, opioid, D2, GABA<sub>B</sub>), Gq (phospholipase C → IP3 (Ca²⁺) and DAG (PKC): α1, M1/M3, H1, V1, AT1).</li>
<li><b>Enzyme-linked receptors</b> (minutes–hours): tyrosine kinase (insulin, growth factors), guanylyl cyclase (ANP; soluble form activated by NO → cGMP), JAK-STAT (cytokines).</li>
<li><b>Nuclear receptors</b> (hours–days): steroids, thyroid hormone, vitamin D: alter gene transcription.</li>
<li><b>Voltage-gated ion channels</b>: Na⁺ (local anaesthetics, class I antiarrhythmics), Ca²⁺ (amlodipine, verapamil; gabapentinoids at α2δ), K⁺ (K<sub>ATP</sub>: sulphonylureas, nicorandil).</li>
<li><b>Enzymes</b>: acetylcholinesterase (neostigmine), COX (NSAIDs), PDE (milrinone, sildenafil, aminophylline), carbonic anhydrase (acetazolamide), MAO (MAOIs), ACE, HMG-CoA reductase, Na⁺/K⁺-ATPase (digoxin), H⁺/K⁺-ATPase (PPIs).</li></ul>`,
p:"Receptor regulation: chronic agonist use leads to down-regulation and desensitisation (tolerance to β-agonists, opioids); chronic antagonist use or denervation up-regulates (rebound tachycardia after stopping β-blockers; suxamethonium hyperkalaemia).",
v:"Classify targets, then receptors by transduction speed with examples and second messengers. Draw a GPCR with its G-protein cycle (GDP/GTP)."},
{f:"pd",t:"Affinity, efficacy, potency and the dose–response curve",b:`<ul class="clean"><li><b>Affinity</b>: how avidly a drug binds its receptor (K<sub>D</sub>: concentration at which 50% of receptors are occupied; lower K<sub>D</sub> = higher affinity).</li>
<li><b>Intrinsic activity / efficacy</b>: ability to produce a response once bound (full agonist 1, partial 0–1, antagonist 0, inverse agonist &lt; 0).</li>
<li><b>Potency</b>: dose needed for a given effect (EC<sub>50</sub>/ED<sub>50</sub>); depends on affinity and efficacy. Fentanyl is ~100× more potent than morphine but has similar maximal efficacy.</li>
<li><b>Dose–response curve</b>: hyperbolic on a linear dose axis, sigmoid on a log axis (the middle 20–80% is near-linear, allowing comparison). Hill coefficient describes steepness (cooperativity).</li>
<li><b>Quantal dose–response</b> (all-or-none effect in a population): ED<sub>50</sub>, LD<sub>50</sub>; <b>therapeutic index</b> = LD<sub>50</sub>/ED<sub>50</sub> (or TD<sub>50</sub>/ED<sub>50</sub>). Remifentanil ~33 000, morphine ~70, digoxin ~2, lithium narrow. MAC is a quantal ED<sub>50</sub> for immobility.</li>
<li><b>Spare receptors</b> (receptor reserve): a full response with only a fraction of receptors occupied (e.g. NMJ: twitch depression starts at ~70% occupancy). Explains why irreversible antagonists first shift the curve right before depressing the maximum.</li></ul>`,
p:"Efficacy vs potency in the viva: 'Which is more efficacious, morphine or fentanyl?' Neither: both are full μ agonists. Fentanyl is more potent.",
v:"Draw linear and log dose–response curves, mark EC50 and Emax, define the terms, then quantal curves and therapeutic index."},
{f:"pd",t:"Agonists and antagonists",b:`<ul class="clean"><li><b>Full agonist</b>: maximal response (morphine, fentanyl at μ; adrenaline at β).</li>
<li><b>Partial agonist</b>: submaximal response even at full occupancy; antagonises a full agonist when given with it (buprenorphine at μ, clonidine at α2 (partial), pindolol, varenicline).</li>
<li><b>Inverse agonist</b>: reduces constitutive (baseline) receptor activity (flumazenil is close to neutral; β-carbolines at GABA<sub>A</sub>; many "antihistamines" are inverse agonists).</li>
<li><b>Competitive reversible antagonist</b>: binds the same site; parallel right shift of the log dose–response curve with the same maximum (surmountable). Dose ratio = 1 + [B]/K<sub>B</sub> (Schild equation); pA2 = −log of antagonist concentration giving a dose ratio of 2. Examples: naloxone, atropine, rocuronium, flumazenil, β-blockers.</li>
<li><b>Irreversible (non-equilibrium) competitive</b>: covalent binding; right shift then depressed maximum (phenoxybenzamine, aspirin on COX).</li>
<li><b>Non-competitive</b>: binds elsewhere (allosteric) or blocks downstream; reduces the maximum without shifting EC<sub>50</sub> (ketamine at the NMDA channel pore, which is also use-dependent).</li>
<li><b>Other antagonism</b>: physiological/functional (adrenaline vs histamine in anaphylaxis), chemical (protamine–heparin, sugammadex–rocuronium), pharmacokinetic (enzyme induction).</li>
<li><b>Allosteric modulators</b>: positive (benzodiazepines increase GABA<sub>A</sub> opening frequency; barbiturates and propofol increase duration and directly open at high doses) or negative.</li></ul>`,
p:"Naloxone has a shorter duration (~30–60 min) than many opioids: re-narcotisation. Flumazenil can precipitate seizures in benzodiazepine-dependent patients and after tricyclic overdose.",
v:"Draw the log dose–response curves for each antagonist type (Diagrams tab), write the Schild equation, give clinical examples."},
{f:"pd",t:"Tolerance, tachyphylaxis, dependence and hysteresis",b:`<ul class="clean"><li><b>Tachyphylaxis</b>: rapid loss of effect after repeated doses (minutes): depletion of mediator stores (ephedrine, metaraminol, amphetamine), receptor desensitisation (nitrates, GTN; desmopressin), phase II block with repeated suxamethonium.</li>
<li><b>Tolerance</b>: slower (days–weeks) need for higher doses for the same effect: pharmacokinetic (enzyme induction: barbiturates, alcohol) or pharmacodynamic (receptor down-regulation, uncoupling, internalisation: opioids, benzodiazepines). Cross-tolerance within a class.</li>
<li><b>Dependence</b>: physical (withdrawal syndrome on stopping: opioids, benzodiazepines, alcohol, clonidine, β-blockers, steroids) or psychological (craving). Addiction is compulsive use despite harm.</li>
<li><b>Hysteresis</b>: effect lags concentration (counter-clockwise loop on an effect vs plasma concentration plot), because of effect-site equilibration (k<sub>e0</sub>). Clockwise loops indicate acute tolerance.</li>
<li><b>Desensitisation</b> mechanisms: receptor phosphorylation (GRKs, β-arrestin), internalisation, down-regulation, uncoupling from G-proteins.</li></ul>`,
p:"Opioid-tolerant patients need their baseline opioid plus more for acute pain, and adjuncts (ketamine, regional); never stop buprenorphine or methadone without a plan.",
v:"Define each term with time course and mechanism, then draw the hysteresis loop."},
{f:"pd",t:"Drug interactions",b:`<ul class="clean"><li><b>Pharmaceutical</b> (in vitro): thiopental precipitates with rocuronium or atracurium (acid–base); sodium bicarbonate precipitates calcium; drugs adsorbed onto plastic (GTN).</li>
<li><b>Pharmacokinetic</b>: absorption (opioids slow gastric emptying; adrenaline slows LA absorption), distribution (protein-binding displacement), metabolism (enzyme induction or inhibition: erythromycin and midazolam/alfentanil; rifampicin and contraceptives; CYP2D6 inhibitors (fluoxetine, paroxetine) block codeine activation), excretion (probenecid reduces penicillin secretion; NSAIDs reduce lithium and methotrexate clearance).</li>
<li><b>Pharmacodynamic</b>: <b>additive/summation</b> (effects add: volatiles + N2O MAC), <b>synergism</b> (more than additive: propofol + remifentanil, propofol + midazolam, opioid + benzodiazepine respiratory depression), <b>potentiation</b> (a drug with no effect enhances another: probenecid–penicillin; clavulanate–amoxicillin), <b>antagonism</b>.</li>
<li><b>Isobologram</b>: dose combinations producing equal effect. Straight line = additive; bowed towards the origin = synergy; bowed away = antagonism.</li>
<li><b>Dangerous combinations</b>: serotonin syndrome (tramadol, pethidine, fentanyl, methylene blue, ondansetron with SSRIs/MAOIs), MAOIs with indirect sympathomimetics (ephedrine, metaraminol) or pethidine, aminoglycosides and magnesium potentiating NMB, QT-prolonging drugs together, warfarin interactions.</li></ul>`,
p:"Response surface models describe three-dimensional interactions (e.g. propofol–remifentanil probability of no response to laryngoscopy); some modern monitors display them.",
v:"Classify (pharmaceutical, pharmacokinetic, pharmacodynamic) with anaesthetic examples, define summation, synergism and potentiation, draw the isobologram."},
{f:"chem",t:"Physicochemical properties: pKa, ionisation and lipid solubility",b:`<ul class="clean"><li><b>pKa</b>: the pH at which a drug is 50% ionised. Not a measure of acid or base strength on its own: it is a property of the molecule.</li>
<li><b>Henderson–Hasselbalch</b>: acids: pH − pKa = log([ionised]/[unionised]); bases: pKa − pH = log([ionised]/[unionised]). A base is more ionised when pH &lt; pKa; an acid is more ionised when pH &gt; pKa.</li>
<li>Only the unionised fraction crosses lipid membranes. Local anaesthetics (weak bases, pKa 7.6–8.1): the closer the pKa to 7.4, the more unionised and the faster the onset (lidocaine 7.9 &gt; bupivacaine 8.1). Adding bicarbonate speeds onset; infected acidic tissue slows it.</li>
<li><b>Ion trapping</b>: basic drugs accumulate in more acidic compartments (fetus, especially if acidotic; stomach; breast milk; acidic urine). Acidic drugs accumulate in alkaline compartments (alkalinise urine for aspirin).</li>
<li><b>Lipid solubility</b> (oil:water or octanol:water partition coefficient) determines potency for many agents (fentanyl ≫ morphine; Meyer–Overton for volatiles, Stage 8), membrane penetration, Vd and duration (accumulation in fat).</li>
<li>Examples of pKa: thiopental 7.6 (acid; ~60% unionised at 7.4), propofol 11 (acid), alfentanil 6.5 (base; ~90% unionised at 7.4, rapid onset), fentanyl 8.4, morphine 8.0, midazolam 6.5 (ring closed and lipid-soluble at physiological pH).</li></ul>`,
p:"Alfentanil acts faster than fentanyl despite lower lipid solubility because, with a pKa of 6.5, ~90% is unionised at pH 7.4 and its small Vd keeps plasma concentration high.",
v:"Define pKa, write HH for acids and bases, calculate the unionised fraction for one LA, then explain ion trapping with the fetus as the example."},
{f:"chem",t:"Isomerism",b:`<ul class="clean"><li><b>Isomers</b>: same molecular formula, different arrangement.</li>
<li><b>Structural isomers</b>: different bonding order. Enflurane and isoflurane are structural isomers (C3H2ClF5O). <b>Tautomerism</b>: dynamic interconversion depending on environment: thiopental (keto–enol). Midazolam's pH-dependent ring opening (open, water-soluble at pH 3.5; closed, lipid-soluble at pH 7.4) is often quoted in the same breath.</li>
<li><b>Stereoisomers</b>: same bonds, different 3-D arrangement.
<ul class="clean"><li><b>Enantiomers</b>: one chiral centre (atom with four different groups), non-superimposable mirror images. Named R/S (Cahn–Ingold–Prelog priority, clockwise = R) or by optical rotation (+/d dextrorotatory, −/l laevorotatory); the two systems do not correspond.</li>
<li><b>Diastereoisomers</b>: more than one chiral centre, not mirror images (atracurium: 4 chiral centres, 10 stereoisomers; cisatracurium is the 1R-cis,1′R-cis isomer, ~3× more potent, less histamine and laudanosine).</li>
<li><b>Geometric (cis–trans)</b> isomers around a double bond or ring (mivacurium: trans-trans and cis-trans isomers are active).</li></ul></li>
<li><b>Racemic</b> mixture: equal enantiomers (bupivacaine, ketamine, isoflurane, desflurane, halothane, enflurane, adrenaline in some forms). <b>Enantiopure</b>: single enantiomer (levobupivacaine S(−), ropivacaine S, S(+)-ketamine, cisatracurium, esomeprazole).</li>
<li><b>Why it matters</b>: enantiomers differ in potency, toxicity and kinetics. S(+)-ketamine is ~2× as potent as the racemate with faster recovery; levobupivacaine and ropivacaine are less cardiotoxic than racemic bupivacaine; thalidomide (one enantiomer teratogenic, and they interconvert in vivo).</li></ul>`,
p:"Sevoflurane is the only volatile without a chiral centre; all others are racemic.",
v:"Draw the classification tree, define each type with an anaesthetic example, then why it matters clinically."},
{f:"chem",t:"Pharmacogenetics and adverse drug reactions",b:`<ul class="clean"><li><b>Plasma cholinesterase variants</b> (BCHE gene): usual (E1u), atypical (E1a), fluoride-resistant (E1f), silent (E1s). Homozygous atypical (~1 in 3000) → suxamethonium apnoea for 2–3 h; silent → longer. Dibucaine number: normal ~80, heterozygous ~60, homozygous atypical ~20. Acquired deficiency: pregnancy, liver disease, renal failure, burns, malnutrition, neostigmine, ecothiopate, cyclophosphamide, plasmapheresis, CPB.</li>
<li><b>CYP2D6</b>: poor metabolisers get little analgesia from codeine and tramadol; ultra-rapid metabolisers can get dangerous morphine levels (deaths in breastfed infants and children after tonsillectomy: codeine contraindicated under 12 years and after tonsillectomy under 18).</li>
<li><b>CYP2C9 / VKORC1</b>: warfarin sensitivity. <b>CYP2C19</b>: clopidogrel non-response. <b>NAT2</b>: slow acetylators (hydralazine lupus, isoniazid neuropathy).</li>
<li><b>RYR1 / CACNA1S</b>: malignant hyperthermia. <b>G6PD</b> deficiency: haemolysis with oxidants. <b>Porphyrias</b> (Stage 5). <b>Methaemoglobin reductase</b> deficiency.</li>
<li><b>Adverse drug reactions</b> (Rawlins & Thompson extended): A augmented (predictable, dose-related: respiratory depression with opioids), B bizarre (idiosyncratic, immune: anaphylaxis, MH), C chronic (steroid adrenal suppression), D delayed (teratogenesis, carcinogenesis), E end-of-use (withdrawal, rebound), F failure of therapy (interactions).</li></ul>`,
p:"Suxamethonium apnoea management: keep the patient anaesthetised and ventilated until full recovery (TOF monitoring), then send a sample for cholinesterase activity and dibucaine/fluoride numbers; test the family and issue an alert card.",
v:"Define pharmacogenetics and give the five or six anaesthetic examples with mechanism and consequence; then classify ADRs."},
{f:"stat",t:"Statistics for the anaesthetist",b:`<ul class="clean"><li><b>Data types</b>: qualitative (nominal: blood group; ordinal: ASA grade, pain scores) and quantitative (discrete: number of attempts; continuous: blood pressure).</li>
<li><b>Central tendency and spread</b>: mean ± SD (normal data), median and interquartile range (skewed or ordinal), mode. SEM = SD/√n (precision of the mean); 95% CI ≈ mean ± 1.96 SEM.</li>
<li><b>Normal distribution</b>: mean = median = mode; 68%, 95%, 99.7% within 1, 2, 3 SD. Skew: positive (tail right: mean &gt; median), negative.</li>
<li><b>Hypothesis testing</b>: null hypothesis; p-value = probability of data at least this extreme if H0 true. <b>Type I error</b> (α, false positive, usually 0.05); <b>Type II error</b> (β, false negative); <b>power</b> = 1 − β (usually 80–90%), depends on sample size, effect size, variability and α.</li>
<li><b>Choosing a test</b>: parametric (normal, continuous): unpaired or paired t-test, ANOVA (&gt; 2 groups); non-parametric: Mann–Whitney U, Wilcoxon signed-rank, Kruskal–Wallis; categorical: chi-squared, Fisher's exact (small numbers); correlation: Pearson (parametric), Spearman (rank); agreement between methods: Bland–Altman; survival: Kaplan–Meier with log-rank; multiple comparisons: Bonferroni.</li></ul>`,
p:"Correlation does not show agreement: two monitors can correlate perfectly and still disagree. Use Bland–Altman (bias and limits of agreement = bias ± 1.96 SD of differences).",
v:"Classify data, choose descriptive statistics, explain p, errors and power, then choose a test from a flow chart."},
{f:"stat",t:"Trials, evidence and diagnostic tests",b:`<ul class="clean"><li><b>Hierarchy of evidence</b>: systematic reviews/meta-analyses of RCTs &gt; RCTs &gt; cohort &gt; case–control &gt; case series &gt; expert opinion. GRADE rates certainty.</li>
<li><b>RCT quality</b>: randomisation with allocation concealment, blinding, intention-to-treat analysis, adequate power, CONSORT reporting. Bias types: selection, performance, detection, attrition, reporting, publication (funnel plot asymmetry).</li>
<li><b>Effect measures</b>: absolute risk reduction (ARR = CER − EER), relative risk (EER/CER), relative risk reduction, odds ratio (case–control), <b>NNT = 1/ARR</b>, NNH.</li>
<li><b>Diagnostic tests</b>: sensitivity = TP/(TP+FN) (SnNout), specificity = TN/(TN+FP) (SpPin), PPV = TP/(TP+FP), NPV = TN/(TN+FN). Predictive values depend on prevalence; sensitivity and specificity do not. Likelihood ratios LR+ = sens/(1−spec). ROC curve: area under the curve 0.5 useless, 1.0 perfect.</li>
<li><b>Drug development phases</b>: preclinical; phase I (healthy volunteers, safety, PK), phase II (small patient groups, dose finding), phase III (large RCTs vs standard), phase IV (post-marketing surveillance, Yellow Card).</li>
<li><b>Meta-analysis</b>: forest plot (squares sized by weight, diamond = pooled estimate), heterogeneity (I²), fixed vs random effects.</li></ul>`,
p:"NNT example: if PONV falls from 40% to 30% with a drug, ARR = 0.10 and NNT = 10.",
v:"Know the 2 × 2 table cold; the Formulas tab calculates sensitivity, specificity, predictive values, LRs and NNT."},
];

/* ---------- PK engine (shared with diagrams/calcs) ---------- */
function jamesLBM(w,h,f){return f?1.07*w-148*Math.pow(w/h,2):1.1*w-128*Math.pow(w/h,2)}
function propModel(kind,w,h,age,f){
 if(kind==="schnider"){const lbm=jamesLBM(w,h,f),V1=4.27,V2=18.9-0.391*(age-53),V3=238;
  return {V1,V2,V3,k10:0.443+0.0107*(w-77)-0.0159*(lbm-59)+0.0062*(h-177),k12:0.302-0.0056*(age-53),k13:0.196,k21:(1.29-0.024*(age-53))/V2,k31:0.0035,ke0:0.456,lbm}}
 const V1=0.228*w;return {V1,V2:0.463*w,V3:2.893*w,k10:0.119,k12:0.112,k13:0.0419,k21:0.055,k31:0.0033,ke0:kind==="mmarsh"?1.21:0.26};
}
const DRUGS={propofol:["Propofol (Marsh)",{k10:.119,k12:.112,k13:.0419,k21:.055,k31:.0033},"var(--spo2)"],fentanyl:["Fentanyl (Shafer)",{k10:.0827,k12:.471,k13:.225,k21:.102,k31:.006},"var(--abp)"],alfentanil:["Alfentanil (Maitre)",{k10:.0458,k12:.104,k13:.017,k21:.0673,k31:.0126},"var(--etco2)"],sufentanil:["Sufentanil (Gepts)",{k10:.0645,k12:.1086,k13:.0229,k21:.0245,k31:.0013},"var(--nibp)"],remifentanil:["Remifentanil (Minto)",{k10:.51,k12:.40,k13:.0149,k21:.209,k31:.014},"var(--ecg)"]};
function decrementTime(p,a2,a3,frac){let a1=1,t=0,dt=0.05;while(a1>frac&&t<1500){const d1=-(p.k10+p.k12+p.k13)*a1+p.k21*a2+p.k31*a3,d2=p.k12*a1-p.k21*a2,d3=p.k13*a1-p.k31*a3;a1+=d1*dt;a2+=d2*dt;a3+=d3*dt;t+=dt}return t}
function cshtCurve(p,frac,Tmax){const pts=[];let a2=0,a3=0,dt=0.1,t=0,next=0;while(t<=Tmax+1e-9){if(t>=next-1e-9){pts.push([next,next===0?0:decrementTime(p,a2,a3,frac)]);next+=10}const d2=p.k12*1-p.k21*a2,d3=p.k13*1-p.k31*a3;a2+=d2*dt;a3+=d3*dt;t+=dt}return pts}

const CALCS=[
 {t:"Loading dose, infusion rate and half-life",c:"spo2",in:[["Weight kg","w",70],["Vd L/kg","vd",0.8],["Clearance mL/kg/min","cl",10],["Target concentration mg/L","c",2]],
  f:(v,fmt)=>{const Vd=v.vd*v.w,CL=v.cl*v.w/1000,ld=v.c*Vd,inf=v.c*CL*60,t=0.693*Vd/CL;return [["Vd L",fmt(Vd,0)],["CL L/min",fmt(CL,2)],["Loading dose mg",fmt(ld,0)],["Infusion mg/h",fmt(inf,0)],["t½ min",fmt(t,0)],["Time to 97% Css without load",fmt(5*t/60,1)+" h"]]},
  n:"LD = C × Vd; maintenance rate = C × CL; t½ = 0.693 × Vd / CL. Example: lidocaine (Vd ~1 L/kg, CL ~10 mL/kg/min)."},
 {t:"Exponential decay",c:"spo2",in:[["Half-life min","h",30],["Time elapsed min","t",90],["Starting concentration","c0",100]],
  f:(v,fmt)=>{const k=0.693/v.h,c=v.c0*Math.exp(-k*v.t);return [["Rate constant k /min",fmt(k,4)],["Time constant τ min",fmt(1/k,1)],["Concentration now",fmt(c,1)],["% remaining",fmt(c/v.c0*100,1)],["Half-lives elapsed",fmt(v.t/v.h,2)]]},
  n:"C = C0·e^(−kt); k = 0.693/t½; τ = 1/k = 1.44 × t½."},
 {t:"Ionisation (Henderson–Hasselbalch)",c:"nibp",in:[["pKa","pk",7.9],["pH","ph",7.4],["Base (1) or acid (0)","b",1],["Second compartment pH (ion trapping)","ph2",7.25]],
  f:(v,fmt)=>{const ion=ph=>v.b?1/(1+Math.pow(10,ph-v.pk)):1/(1+Math.pow(10,v.pk-ph));const u=1-ion(v.ph);const ratio=v.b?(1+Math.pow(10,v.pk-v.ph2))/(1+Math.pow(10,v.pk-v.ph)):(1+Math.pow(10,v.ph2-v.pk))/(1+Math.pow(10,v.ph-v.pk));return [["% unionised",fmt(u*100,1)],["% ionised",fmt((1-u)*100,1)],["Total conc ratio (2nd : 1st)",fmt(ratio,2),ratio>1.2?"warn":"ok"]]},
  n:"Defaults: lidocaine, maternal pH 7.4 vs fetal 7.25. Set fetal pH 7.0 to see trapping increase (fetal acidosis)."},
 {t:"Hepatic clearance (well-stirred model)",c:"spo2",in:[["Hepatic blood flow L/min","q",1.5],["Free fraction fu","fu",0.1],["Intrinsic clearance L/min","ci",20]],
  f:(v,fmt)=>{const fc=v.fu*v.ci,cl=v.q*fc/(v.q+fc),e=fc/(v.q+fc);return [["Extraction ratio",fmt(e,2),e>0.7?"warn":"ok"],["Hepatic clearance L/min",fmt(cl,2)],["Behaviour",e>0.7?"Flow-limited (high extraction)":e<0.3?"Capacity-limited (low extraction)":"Intermediate"],["Oral bioavailability (liver only)",fmt(1-e,2)]]},
  n:"Halve Q to mimic low cardiac output: high-extraction drug clearance falls almost proportionally. Change fu or CLint to see low-extraction behaviour."},
 {t:"Bioavailability",c:"spo2",in:[["AUC oral","ao",40],["Oral dose mg","do",20],["AUC IV","ai",100],["IV dose mg","di",10]],
  f:(v,fmt)=>{const F=(v.ao*v.di)/(v.ai*v.do);return [["F",fmt(F,2)],["% reaching circulation",fmt(F*100,0)+"%"]]},
  n:"F = (AUC_oral × Dose_IV) / (AUC_IV × Dose_oral)."},
 {t:"Propofol TCI parameters (Marsh / Schnider)",c:"abp",in:[["Weight kg","w",70],["Height cm","h",170],["Age","a",40],["Female (1/0)","f",0],["Target µg/mL","c",4]],
  f:(v,fmt)=>{const m=propModel("marsh",v.w,v.h,v.a,v.f),s=propModel("schnider",v.w,v.h,v.a,v.f);return [["Marsh V1 L",fmt(m.V1,1)],["Marsh plasma bolus mg",fmt(m.V1*v.c,0)],["Marsh initial maint. mg/h",fmt(m.V1*v.c*m.k10*60,0)],["Schnider V1 L",fmt(s.V1,2)],["Schnider LBM kg",fmt(s.lbm,1)],["Schnider k10 /min",fmt(s.k10,3)],["Schnider plasma bolus mg",fmt(s.V1*v.c,0)]]},
  n:"Plasma-targeted bolus = V1 × target. Marsh V1 = 0.228 L/kg; Schnider V1 fixed 4.27 L (hence effect-site mode). LBM by the James formula."},
 {t:"Competitive antagonism (Schild)",c:"etco2",in:[["Agonist EC50 alone","e1",10],["EC50 with antagonist","e2",40],["Antagonist concentration nM","b",3]],
  f:(v,fmt)=>{const dr=v.e2/v.e1,kb=v.b/(dr-1),pa2=-Math.log10(kb*1e-9);return [["Dose ratio",fmt(dr,1)],["K_B nM",fmt(kb,2)],["pA2",fmt(pa2,2)]]},
  n:"Dose ratio = 1 + [B]/K_B. pA2 = −log10 K_B (molar) for a competitive antagonist with a Schild slope of 1."},
 {t:"Renal dose adjustment (Dettli)",c:"spo2",in:[["Fraction excreted unchanged in urine (fe)","fe",0.9],["Patient CrCl mL/min","cr",30],["Normal CrCl mL/min","n",120]],
  f:(v,fmt)=>{const q=1-v.fe*(1-v.cr/v.n);return [["Dose fraction Q",fmt(q,2)],["Either give dose ×",fmt(q,2)],["or extend interval ×",fmt(1/q,2)]]},
  n:"Q = 1 − fe(1 − CrCl/normal). Gentamicin fe ~0.9; vancomycin ~0.9; morphine fe low but active metabolites accumulate."},
 {t:"Diagnostic test and NNT",c:"ecg",in:[["True positives","tp",90],["False positives","fp",30],["False negatives","fn",10],["True negatives","tn",170],["Control event rate %","cer",40],["Experimental event rate %","eer",30]],
  f:(v,fmt)=>{const se=v.tp/(v.tp+v.fn),sp=v.tn/(v.tn+v.fp),ppv=v.tp/(v.tp+v.fp),npv=v.tn/(v.tn+v.fn),lrp=se/(1-sp),lrn=(1-se)/sp,arr=(v.cer-v.eer)/100;return [["Sensitivity",fmt(se*100,0)+"%"],["Specificity",fmt(sp*100,0)+"%"],["PPV",fmt(ppv*100,0)+"%"],["NPV",fmt(npv*100,0)+"%"],["LR+",fmt(lrp,1)],["LR−",fmt(lrn,2)],["ARR",fmt(arr*100,1)+"%"],["NNT",arr>0?fmt(1/arr,0):"–"]]},
  n:"Prevalence in this table = (TP+FN)/total. Predictive values change with prevalence; sensitivity and specificity do not."},
];

const TABLES=[
 ["Pharmacokinetic values of common anaesthetic drugs (adult, approximate)",["Drug","Vd L/kg","CL mL/kg/min","Elimination t½","Protein binding","pKa"],[["Propofol","2–10 (≈4)","30–60","4–7 h (terminal longer)","98%","11 (acid)"],["Thiopental","2.5","3.5","~11 h","80%","7.6 (acid)"],["Ketamine","3","17","2.5 h","25%","7.5"],["Etomidate","3","10–20","3–5 h","75%","4.2"],["Midazolam","1.1","7","2–3 h","95%","6.5"],["Morphine","3.5","15","2–3 h","35%","8.0"],["Fentanyl","4","13","3.5 h","83%","8.4"],["Alfentanil","0.6","6","1.6 h","90%","6.5"],["Remifentanil","0.3","40","3–10 min","70%","7.1"],["Lidocaine","1.1","10","1.6 h","70%","7.9"],["Bupivacaine","1.0","8","2.7 h","95%","8.1"],["Rocuronium","0.2","3–4","70 min","~30%","– (quaternary)"]]],
 ["Cytochrome P450: anaesthetic relevance",["Isoform","Substrates","Inducers","Inhibitors"],[["CYP3A4","Midazolam, alfentanil, fentanyl, lidocaine, ondansetron, ciclosporin","Rifampicin, carbamazepine, phenytoin, St John's wort","Erythromycin, clarithromycin, fluconazole, ketoconazole, ritonavir, grapefruit, diltiazem"],["CYP2D6","Codeine → morphine, tramadol, metoprolol, ondansetron, oxycodone (partly)","(Not inducible)","Fluoxetine, paroxetine, quinidine, bupropion"],["CYP2C9","Warfarin (S), NSAIDs, phenytoin","Rifampicin","Fluconazole, amiodarone"],["CYP2C19","Clopidogrel activation, omeprazole, diazepam","Rifampicin","Omeprazole, fluoxetine"],["CYP1A2","Theophylline, caffeine, ropivacaine","Smoking, charcoal-grilled meat","Ciprofloxacin, fluvoxamine"],["CYP2E1","Sevoflurane, enflurane, halothane, paracetamol (→ NAPQI)","Chronic alcohol, isoniazid","Disulfiram"],["CYP2B6","Propofol (and glucuronidation), ketamine, methadone","Phenobarbital","Ticlopidine"]]],
 ["Receptor types",["Type","Speed","Examples"],[["Ligand-gated ion channel","Milliseconds","nAChR, GABA_A, glycine, 5-HT3, NMDA"],["G-protein coupled","Seconds","Adrenoceptors, muscarinic, opioid, dopamine, histamine"],["Enzyme-linked","Minutes","Insulin (tyrosine kinase), ANP (guanylyl cyclase)"],["Nuclear","Hours","Steroids, thyroid hormone, vitamin D"]]],
 ["Antagonist types",["Type","Effect on log DRC","Example"],[["Competitive reversible","Parallel right shift, same Emax","Naloxone, atropine, rocuronium"],["Competitive irreversible","Right shift then reduced Emax","Phenoxybenzamine"],["Non-competitive","Reduced Emax, EC50 unchanged","Ketamine (NMDA channel)"],["Physiological","Opposing effect via another receptor","Adrenaline vs histamine"],["Chemical","Binds the drug","Protamine, sugammadex, chelators"]]],
 ["Isomers in anaesthesia",["Drug","Isomerism","Clinical note"],[["Bupivacaine / levobupivacaine","Racemic / S(−) enantiomer","S form less cardiotoxic"],["Ropivacaine","S enantiomer","Less cardiotoxic, less motor block"],["Ketamine / esketamine","Racemic / S(+)","S(+) ~2× potent, faster recovery"],["Atracurium / cisatracurium","10 stereoisomers / 1R-cis,1′R-cis","Cis: more potent, less histamine, less laudanosine"],["Mivacurium","3 geometric isomers","Cis-cis isomer weak and long-acting"],["Isoflurane, desflurane, enflurane, halothane","Racemic","Sevoflurane achiral"],["Enflurane vs isoflurane","Structural isomers","Different potency and metabolism"],["Thiopental","Tautomer (keto–enol) and racemic","Enol form water-soluble as sodium salt"]]],
 ["Choosing a statistical test",["Data","Two groups (unpaired)","Two groups (paired)","> 2 groups"],[["Normal continuous","Unpaired t-test","Paired t-test","ANOVA"],["Non-normal / ordinal","Mann–Whitney U","Wilcoxon signed-rank","Kruskal–Wallis"],["Categorical","Chi-squared (Fisher's if small)","McNemar","Chi-squared"],["Association","Pearson (normal) / Spearman (ranked) correlation","Bland–Altman for agreement","Regression"]]],
 ["Adverse drug reactions (Rawlins & Thompson, extended)",["Type","Features","Example"],[["A – Augmented","Predictable, dose-related, common","Opioid respiratory depression"],["B – Bizarre","Unpredictable, not dose-related","Anaphylaxis, MH"],["C – Chronic","Long-term use","Steroid adrenal suppression"],["D – Delayed","After years / in offspring","Teratogenicity, carcinogenicity"],["E – End of use","Withdrawal or rebound","β-blocker rebound, opioid withdrawal"],["F – Failure","Unexpected treatment failure","Interactions (enzyme induction)"]]],
];

const CARDS=[
 ["pk","Define bioavailability.","Fraction of a dose reaching the systemic circulation unchanged (IV = 1)."],
 ["pk","Bioavailability equation?","F = (AUC_oral × Dose_IV) / (AUC_IV × Dose_oral)."],
 ["pk","Routes that avoid first-pass metabolism?","Sublingual, buccal, transdermal, intranasal, inhalational, IV, IM, SC (partly rectal)."],
 ["pk","Define volume of distribution.","Apparent volume needed to contain the dose at the measured plasma concentration: Vd = Dose/C0."],
 ["pk","Why can Vd exceed total body water?","Extensive tissue binding or lipid sequestration lowers plasma concentration."],
 ["pk","Which plasma protein binds basic drugs such as local anaesthetics?","α1-acid glycoprotein."],
 ["pk","Which plasma protein binds acidic drugs?","Albumin."],
 ["pk","When is protein-binding displacement clinically important?","Highly bound (> 90%), small Vd, narrow therapeutic index drugs."],
 ["pk","Why do patients wake after a single bolus of propofol?","Redistribution from brain to muscle and fat."],
 ["pk","Phase I vs phase II metabolism?","I: oxidation, reduction, hydrolysis. II: conjugation (glucuronide, sulphate, acetyl, methyl, glutathione)."],
 ["pk","Most important CYP isoform for anaesthetic drugs?","CYP3A4 (midazolam, alfentanil, fentanyl)."],
 ["pk","Two drugs inhibiting midazolam/alfentanil metabolism?","Erythromycin/clarithromycin, fluconazole (also diltiazem, ritonavir)."],
 ["pk","Enzyme metabolising remifentanil?","Non-specific tissue and plasma esterases."],
 ["pk","What is Hofmann degradation?","Spontaneous non-enzymatic breakdown at body pH and temperature (atracurium, cisatracurium)."],
 ["pk","Define clearance.","Volume of plasma cleared of drug per unit time; rate of elimination = CL × Cp."],
 ["pk","Organ clearance equation?","CL = Q × E (blood flow × extraction ratio)."],
 ["pk","Well-stirred model of hepatic clearance?","CL = Q·fu·CLint / (Q + fu·CLint)."],
 ["pk","High-extraction drugs?","Propofol, lidocaine, morphine, fentanyl, ketamine, propranolol, GTN."],
 ["pk","Clearance of high-extraction drugs depends on?","Hepatic blood flow."],
 ["pk","Clearance of low-extraction drugs depends on?","Enzyme activity and free fraction."],
 ["pk","Relationship between t½, Vd and CL?","t½ = 0.693 × Vd / CL."],
 ["pk","Time constant vs half-life?","τ = 1/k = time to fall to 37%; t½ = 0.693 τ."],
 ["pk","% eliminated after 5 half-lives?","≈ 97%."],
 ["pk","What does the steady-state concentration of an infusion depend on?","Infusion rate / clearance (not Vd)."],
 ["pk","Define zero-order kinetics.","Constant amount eliminated per unit time (enzyme saturation)."],
 ["pk","Drugs showing zero-order kinetics?","Phenytoin, ethanol, salicylates, high-dose thiopental, theophylline."],
 ["pk","Michaelis–Menten equation?","V = Vmax[S]/(Km + [S]); Km = [S] at half Vmax."],
 ["tci","Number of exponentials in a three-compartment model?","Three (distribution, redistribution, elimination)."],
 ["tci","What is ke0?","Rate constant for equilibration between plasma and effect site."],
 ["tci","Define context-sensitive half-time.","Time for plasma concentration to halve after stopping an infusion that maintained a constant concentration."],
 ["tci","Which opioid has a context-insensitive half-time?","Remifentanil (~3–4 min)."],
 ["tci","CSHT of fentanyl after 8 h?","> 4 h (≈ 260 min)."],
 ["tci","Define decrement time.","Time to fall to a stated percentage or level after an infusion stops."],
 ["tci","What does BET stand for in TCI?","Bolus, Elimination, Transfer."],
 ["tci","Marsh model V1?","0.228 L/kg."],
 ["tci","Patient inputs for the Marsh model?","Weight only (age entered but not used for kinetics)."],
 ["tci","Schnider model V1?","Fixed 4.27 L."],
 ["tci","Inputs for the Schnider model?","Age, weight, height, sex (for LBM)."],
 ["tci","Why use Schnider in effect-site mode?","Its fixed small V1 gives small plasma-mode boluses."],
 ["tci","Modified Marsh ke0?","≈ 1.2 min⁻¹ (original 0.26)."],
 ["tci","Remifentanil TCI model?","Minto."],
 ["tci","Main cause of awareness with TIVA in NAP5?","Drug not reaching the patient (disconnection, tissued cannula, pump errors)."],
 ["tci","Propofol concentration associated with waking (no other drugs)?","≈ 1.0–1.5 µg/mL (often 1.2)."],
 ["pd","Define affinity.","Strength of binding to a receptor (KD: 50% occupancy)."],
 ["pd","Define efficacy (intrinsic activity).","Ability to produce a response after binding."],
 ["pd","Define potency.","Dose needed to produce a given effect (EC50/ED50)."],
 ["pd","Why is the log dose–response curve sigmoid?","Log transformation of a hyperbolic occupancy relationship."],
 ["pd","Define therapeutic index.","LD50/ED50 (or TD50/ED50)."],
 ["pd","What is a partial agonist?","Produces a submaximal response even at full occupancy; antagonises full agonists."],
 ["pd","Example of a partial μ agonist?","Buprenorphine."],
 ["pd","What is an inverse agonist?","Reduces constitutive receptor activity (efficacy < 0)."],
 ["pd","Effect of a competitive antagonist on the log DRC?","Parallel right shift, same maximum."],
 ["pd","Effect of a non-competitive antagonist?","Reduced maximum, EC50 unchanged."],
 ["pd","Schild equation?","Dose ratio = 1 + [B]/KB."],
 ["pd","What are spare receptors?","Receptors in excess of those needed for maximal response."],
 ["pd","Tachyphylaxis vs tolerance?","Tachyphylaxis: rapid (minutes). Tolerance: gradual (days–weeks)."],
 ["pd","Mechanism of ephedrine tachyphylaxis?","Depletion of noradrenaline stores."],
 ["pd","Define hysteresis in pharmacology.","Lag between plasma concentration and effect (anticlockwise loop)."],
 ["pd","Gs, Gi, Gq second messengers?","Gs ↑cAMP; Gi ↓cAMP (and K⁺/Ca²⁺ channels); Gq PLC → IP3 + DAG."],
 ["pd","Synergism vs summation?","Summation: effects add. Synergism: combined effect greater than the sum."],
 ["pd","Define potentiation.","A drug without the effect enhances another drug's effect."],
 ["pd","Shape of an isobologram for synergy?","Line bows towards the origin."],
 ["pd","Example of anaesthetic synergy?","Propofol + remifentanil (or propofol + midazolam)."],
 ["chem","Define pKa.","pH at which a drug is 50% ionised."],
 ["chem","When is a weak base mostly ionised?","When pH < pKa."],
 ["chem","Why is lidocaine faster than bupivacaine?","Lower pKa (7.9 vs 8.1): more unionised at pH 7.4."],
 ["chem","Why does alfentanil act quickly?","pKa 6.5: ~90% unionised at pH 7.4."],
 ["chem","What is ion trapping?","Ionised drug accumulates in a compartment where pH favours ionisation (bases in acidic fetus/stomach)."],
 ["chem","What is a chiral centre?","An atom bonded to four different groups."],
 ["chem","R vs S naming?","Cahn–Ingold–Prelog priorities clockwise = R, anticlockwise = S."],
 ["chem","Racemic vs enantiopure?","Racemic: 50:50 enantiomers. Enantiopure: single enantiomer."],
 ["chem","Example of structural isomers among volatiles?","Enflurane and isoflurane."],
 ["chem","Example of tautomerism?","Thiopental (keto–enol)."],
 ["chem","How many stereoisomers does atracurium have?","10."],
 ["chem","Which volatile is achiral?","Sevoflurane."],
 ["chem","Dibucaine number of homozygous atypical cholinesterase?","≈ 20 (normal ~80)."],
 ["chem","Why is codeine dangerous in CYP2D6 ultra-rapid metabolisers?","Rapid conversion to morphine causes toxicity."],
 ["chem","Type A vs type B ADRs?","A: augmented, predictable, dose-related. B: bizarre, idiosyncratic."],
 ["stat","SEM formula?","SD / √n."],
 ["stat","Define type I and type II errors.","I: false positive (α). II: false negative (β)."],
 ["stat","Define power.","1 − β: probability of detecting a true effect."],
 ["stat","Test for agreement between two monitors?","Bland–Altman."],
 ["stat","Non-parametric equivalent of the unpaired t-test?","Mann–Whitney U."],
 ["stat","Formula for NNT?","1 / absolute risk reduction."],
 ["stat","Sensitivity formula?","TP / (TP + FN)."],
 ["stat","Which test values depend on prevalence?","PPV and NPV."],
 ["stat","Phase I trial purpose?","Safety, tolerability and PK in healthy volunteers."],
];

const FCF={all:"All",pk:"Pharmacokinetics",tci:"Models & TCI",pd:"Pharmacodynamics",chem:"Chemistry & genetics",stat:"Statistics"};

const VIVA=[
 {st:"SOE 2 · Pharmacology",q:"Propofol: volume of distribution, dose–response, the Marsh model, how the pump calculates the dose, propofol infusion syndrome and the calories it adds in ICU.",a:["PK: Vd ~4 L/kg, CL ~2 L/min (extrahepatic), high extraction, 98% bound, three-compartment kinetics.","Marsh model: weight-based V1 0.228 L/kg and fixed rate constants; modified Marsh ke0; BET principle; plasma vs effect-site targeting; compare Schnider.","Dose–response: sigmoid, EC50 for loss of consciousness ~3–4 µg/mL; synergy with opioids.","PRIS: > 4 mg/kg/h for > 48 h, mitochondrial fatty acid oxidation failure; lactic acidosis, rhabdomyolysis, hyperkalaemia, arrhythmia, cardiac failure; management.","Calories: 1% propofol ~1.1 kcal/mL (10% lipid); e.g. 20 mL/h ≈ 530 kcal/day; adjust feed, check triglycerides."],fu:"Why does the Schnider model give a smaller bolus in plasma-targeted mode?"},
 {st:"SOE 2 · Pharmacology",q:"What factors determine the distribution, metabolism and elimination of anaesthetic drugs, and how are they changed by drug interactions and disease?",a:["Distribution: lipid solubility, ionisation, protein binding, blood flow, barriers, body composition.","Metabolism: phase I/II, CYP450, extrahepatic routes, induction/inhibition.","Elimination: hepatic extraction (well-stirred model), renal handling, other routes.","Interactions: pharmaceutical, PK, PD with examples.","Disease: renal, hepatic, cardiac failure (low flow), critical illness, extremes of age, obesity, pregnancy."],fu:"Why is fentanyl clearance reduced in heart failure?"},
 {st:"SOE 2 · Pharmacology",q:"What is TIVA? Describe the models used and how a target-controlled infusion works.",a:["Definition and indications/advantages.","Compartment models and micro-rate constants; ke0 and effect site.","BET principle and pump behaviour on target increase and decrease (draw Cp, Ce, rate).","Marsh, Schnider, Eleveld, Minto: inputs and differences.","Limitations and safety: NAP5, processed EEG, dedicated line, anti-reflux valves."],fu:"What happens to the infusion rate immediately after you lower the target?"},
 {st:"SOE 2 · Pharmacology",q:"Define context-sensitive half-time. Draw the curves for common anaesthetic drugs.",a:["Definition (Hughes) and what 'context' means.","Why it differs from elimination half-life (peripheral compartment back-flow).","Curves: remifentanil flat ~3 min; propofol and sufentanil low; alfentanil plateau; fentanyl and thiopental rising.","Decrement times and effect-site vs plasma.","Clinical use: choosing infusions for long cases, predicting waking."],fu:"Why does alfentanil's CSHT plateau while fentanyl's keeps rising?"},
 {st:"SOE 2 · Pharmacology",q:"Explain first- and zero-order kinetics. What is a time constant?",a:["Definitions, graphs (linear and log), examples.","Michaelis–Menten equation and curve; transition between orders.","Rate constant, time constant, half-life and their relationships.","Infusion wash-in and time to steady state; loading doses.","Clinical: phenytoin dosing, alcohol, thiopental infusion."],fu:"How many time constants to reach 95% of steady state?"},
 {st:"SOE 2 · Pharmacology",q:"Define affinity, efficacy and potency. Draw dose–response curves for agonists, partial agonists and antagonists.",a:["Definitions with KD, EC50, Emax.","Linear vs log DRC.","Partial agonist and inverse agonist curves.","Competitive (parallel shift, Schild), irreversible, non-competitive curves.","Quantal curves and therapeutic index; spare receptors."],fu:"Why does buprenorphine make it hard to treat acute pain with morphine?"},
 {st:"SOE 2 · Pharmacology",q:"Classify receptors. Describe G-protein coupled receptors and second messengers.",a:["Ligand-gated, GPCR, enzyme-linked, nuclear; voltage-gated channels and enzymes as targets.","GPCR structure (7TM), G-protein cycle (GDP/GTP, α, βγ).","Gs, Gi, Gq pathways with second messengers.","Examples relevant to anaesthesia for each.","Regulation: desensitisation, down/up-regulation."],fu:"How does milrinone increase contractility?"},
 {st:"SOE 2 · Pharmacology",q:"What is pKa? How does it affect local anaesthetic action and placental transfer?",a:["Definition and HH equation for acids and bases.","Calculate unionised fraction of lidocaine at 7.4.","Onset, effect of bicarbonate, infected tissue.","Placental transfer of LAs and opioids, ion trapping in fetal acidosis.","Other examples: alfentanil, thiopental, midazolam ring opening."],fu:"Why might a distressed fetus be more affected by maternal pethidine?"},
 {st:"SOE 2 · Pharmacology",q:"What are isomers? Give examples relevant to anaesthesia.",a:["Classification tree.","Structural isomers and tautomerism with examples.","Enantiomers (R/S, d/l), diastereoisomers, geometric isomers.","Racemic vs enantiopure; examples (levobupivacaine, ropivacaine, S-ketamine, cisatracurium).","Clinical significance (potency, toxicity, kinetics)."],fu:"Why is cisatracurium associated with less histamine release than atracurium?"},
 {st:"SOE 2 · Pharmacology",q:"Describe the types of drug interaction with examples from anaesthetic practice.",a:["Pharmaceutical.","Pharmacokinetic at each stage (absorption, distribution, metabolism, excretion).","Pharmacodynamic: summation, synergism, potentiation, antagonism.","Isobologram and response surfaces.","Dangerous combinations: serotonin syndrome, MAOIs, QT drugs, NMB potentiation."],fu:"Which anaesthetic drugs can trigger serotonin syndrome in a patient on an SSRI?"},
 {st:"SOE 2 · Pharmacology",q:"What is pharmacogenetics? Discuss suxamethonium apnoea.",a:["Definition; genetic polymorphisms affecting PK and PD.","Plasma cholinesterase genetics, dibucaine and fluoride numbers.","Presentation and management (sedation, ventilation, monitoring, testing, family).","Acquired causes of low cholinesterase.","Other examples: CYP2D6/codeine, RYR1, G6PD, CYP2C9/VKORC1."],fu:"What is the dibucaine number and how is it measured?"},
 {st:"SOE 2 · Statistics",q:"A new monitor is compared with thermodilution cardiac output. How would you analyse the data?",a:["Data type and distribution.","Why correlation is not agreement.","Bland–Altman: bias, limits of agreement, percentage error (Critchley < 30%).","Trending ability (polar plot, concordance).","Study design issues: sample size, repeated measures."],fu:"What would a high correlation with wide limits of agreement mean?"},
];

const QUIZ=[
 ["Bioavailability",[["Is 1 for IV drugs",1,""],["Is increased by first-pass metabolism",0,"Reduced."],["Sublingual GTN avoids first-pass metabolism",1,""],["High hepatic extraction drugs have high oral bioavailability",0,"Low."],["Is calculated from areas under the concentration–time curves",1,""]]],
 ["Volume of distribution",[["Equals dose divided by initial plasma concentration",1,""],["Cannot exceed total body water",0,"Can greatly exceed it (tissue binding)."],["Is small for neuromuscular blockers",1,"~0.2–0.3 L/kg."],["Determines the loading dose",1,""],["Determines the steady-state concentration of an infusion",0,"Css = rate/CL."]]],
 ["Protein binding",[["Local anaesthetics bind mainly to α1-acid glycoprotein",1,""],["α1-acid glycoprotein falls after surgery",0,"It rises (acute phase)."],["Only unbound drug is filtered at the glomerulus",1,""],["Neonates have low α1-acid glycoprotein",1,""],["Displacement is clinically important for all highly bound drugs",0,"Mainly those with small Vd and narrow TI."]]],
 ["Metabolism",[["CYP3A4 metabolises midazolam",1,""],["Rifampicin inhibits CYP3A4",0,"Induces."],["Remifentanil is metabolised by plasma cholinesterase",0,"Non-specific esterases."],["Atracurium undergoes Hofmann degradation",1,""],["Codeine is activated by CYP2D6",1,""]]],
 ["Clearance",[["Rate of elimination = clearance × plasma concentration",1,""],["Propofol clearance exceeds hepatic blood flow",1,""],["Clearance of high-extraction drugs depends on enzyme activity",0,"Mainly on blood flow."],["t½ = 0.693 × Vd / CL",1,""],["Alkalinising urine increases aspirin excretion",1,""]]],
 ["Kinetics",[["In first-order kinetics a constant fraction is eliminated per unit time",1,""],["Phenytoin follows zero-order kinetics at therapeutic doses",1,""],["After 3 time constants about 95% is eliminated",1,""],["The Michaelis–Menten curve is parabolic",0,"Rectangular hyperbola."],["Time to steady state depends on half-life",1,""]]],
 ["Context-sensitive half-time",[["Is the same as elimination half-life",0,"Different: depends on infusion duration."],["Remifentanil's is about 3–4 minutes regardless of duration",1,""],["Fentanyl's increases markedly after several hours",1,""],["Equals the time to wake up",0,"Waking may need more or less than a 50% fall."],["Alfentanil's plateaus after about 2 hours",1,""]]],
 ["Target-controlled infusion",[["The Marsh model uses weight only",1,""],["The Schnider model has a weight-proportional V1",0,"Fixed 4.27 L."],["Effect-site targeting gives a larger initial bolus than plasma targeting",1,""],["A slower ke0 leads to a larger initial bolus in effect-site mode",1,""],["The pump measures blood propofol concentration",0,"It predicts it."]]],
 ["Dose–response",[["Potency is related to EC50",1,""],["A competitive antagonist reduces the maximum response",0,"Parallel shift, same maximum."],["A partial agonist can act as an antagonist",1,""],["Therapeutic index = LD50/ED50",1,""],["Fentanyl is more efficacious than morphine",0,"More potent; similar efficacy."]]],
 ["Receptors",[["Nicotinic receptors are ligand-gated ion channels",1,""],["Opioid receptors are coupled to Gs",0,"Gi/o."],["α1-adrenoceptors activate phospholipase C",1,"Gq."],["Steroid receptors are intracellular",1,""],["Insulin acts via a tyrosine kinase receptor",1,""]]],
 ["Ionisation",[["A weak base is more ionised at a pH below its pKa",1,""],["Thiopental is a weak base",0,"Weak acid (pKa 7.6)."],["Alfentanil is mostly unionised at pH 7.4",1,"pKa 6.5."],["Fetal acidosis increases trapping of local anaesthetic",1,""],["Adding bicarbonate to lidocaine slows onset",0,"Speeds onset."]]],
 ["Isomerism",[["Enflurane and isoflurane are structural isomers",1,""],["Sevoflurane is a racemic mixture",0,"Achiral."],["Atracurium has 10 stereoisomers",1,""],["Levobupivacaine is the S enantiomer",1,""],["R and S naming depends on optical rotation",0,"Based on Cahn–Ingold–Prelog priorities; unrelated to rotation."]]],
 ["Pharmacogenetics",[["Homozygous atypical cholinesterase has a dibucaine number about 20",1,""],["CYP2D6 poor metabolisers get more analgesia from codeine",0,"Less."],["RYR1 mutations cause MH susceptibility",1,""],["Slow acetylators are more prone to hydralazine-induced lupus",1,""],["Pregnancy increases plasma cholinesterase activity",0,"Reduces it (~25%)."]]],
 ["Statistics",[["SEM = SD/√n",1,""],["A type I error is a false negative",0,"False positive."],["Power = 1 − β",1,""],["Bland–Altman assesses agreement",1,""],["PPV is independent of prevalence",0,"Depends on prevalence."]]],
];

const CRISIS=[
 ["Suxamethonium apnoea","nibp",["Recognise: no recovery of breathing or TOF long after suxamethonium (or mivacurium).","Keep the patient anaesthetised (awareness risk) and ventilated; reassure that recovery will occur.","Monitor with nerve stimulator; phase II block may develop.","FFP (contains cholinesterase) is rarely needed; avoid anticholinesterases (unpredictable).","Once recovered: send blood for cholinesterase activity, dibucaine and fluoride numbers; inform patient, GP; family testing; alert card."],"Reduced or abnormal butyrylcholinesterase cannot hydrolyse suxamethonium, so it persists at the end-plate."],
 ["TIVA delivery failure and awareness risk","abp",["Clues: rising BIS or HR/BP, movement, pump occlusion alarm, swelling at cannula, wet drapes.","Check the whole pathway: syringe, pump settings (drug, concentration, model), line, valves, cannula.","Give an immediate IV bolus via a working line or switch to volatile while fixing the problem.","Consider awareness: give a benzodiazepine, document, and follow up the patient (NAP5 pathway).","Prevent: dedicated visible cannula, anti-syphon and anti-reflux valves, processed EEG with NMB, programme after loading."],"TCI displays a predicted concentration: it cannot detect that drug is not reaching the patient."],
 ["Serotonin syndrome","ecg",["Suspect after serotonergic drugs (tramadol, pethidine, fentanyl, methylene blue, ondansetron, linezolid) in patients on SSRIs, SNRIs or MAOIs.","Triad: neuromuscular excitation (clonus, hyperreflexia, rigidity), autonomic instability (hyperthermia, tachycardia, sweating), altered mental state (Hunter criteria).","Stop the drugs; supportive care; benzodiazepines for agitation.","Cyproheptadine (oral/NG) for moderate cases; active cooling; paralyse and ventilate if temperature > 41 °C (avoid suxamethonium in rhabdomyolysis).","Differentiate from MH (no clonus) and NMS (slow onset, bradyreflexia)."],"Excess synaptic serotonin from drugs that release it, block reuptake or block its breakdown."],
 ["MAOI interaction (hypertensive crisis)","etco2",["Avoid indirect sympathomimetics (ephedrine, metaraminol) and pethidine in patients on MAOIs.","Hypertensive crisis: deepen anaesthesia, phentolamine, GTN, labetalol.","For hypotension use direct-acting agents in small doses (phenylephrine, noradrenaline).","Pethidine reaction: excitatory (serotonin syndrome) or depressive (coma): supportive care.","Plan: continue MAOIs perioperatively in most cases (stopping risks relapse); use safe drugs."],"MAO inhibition leaves extra noradrenaline in nerve endings for indirect sympathomimetics to release."],
 ["Drug administration error (syringe swap)","nibp",["Recognise the wrong drug or dose; stop administration.","Treat the effects: e.g. NMB given to an awake patient: induce anaesthesia immediately and ventilate; reverse if possible (sugammadex for rocuronium).","Opioid overdose: ventilate, naloxone titrated; excess vasopressor: vasodilator, check ECG.","Inform the patient (duty of candour), document, report via the incident system and MHRA if device-related.","Prevention: label every syringe, colour coding, read-back, separate storage, prefilled syringes."],"Most errors happen at drawing up or administration; human factors design reduces them."],
 ["Opioid accumulation in renal failure","spo2",["Suspect: increasing drowsiness, pinpoint pupils, slow breathing, myoclonus in a patient with AKI or CKD on morphine, codeine, oxycodone or tramadol.","ABCDE, O2, naloxone in small titrated doses (e.g. 40–100 µg) to restore breathing without full reversal of analgesia; infusion may be needed (long-acting metabolites).","Stop the culprit; switch to fentanyl or alfentanil; regional analgesia.","Check for other sedatives and hypercapnia; consider RRT for severe cases (morphine metabolites are dialysable).","Review prescribing: dose by renal function."],"M6G and M3G (morphine) and normeperidine (pethidine) are renally excreted active metabolites."],
];

const SRC="";
const ERR="";
const REFS="";

const DIAG=`<div class="grid2">
 <div class="fig" style="grid-column:1/-1"><h3>Propofol TCI simulator</h3>
  <div class="ctl"><div class="seg" id="tc-mod"></div><div class="seg" id="tc-mode"></div></div>
  <div class="ctl">
   <label>Weight kg <input type="range" id="tc-w" min="40" max="140" step="1" value="70"><output id="tc-w-o"></output></label>
   <label>Height cm <input type="range" id="tc-h" min="145" max="200" step="1" value="170"><output id="tc-h-o"></output></label>
   <label>Age <input type="range" id="tc-a" min="18" max="90" step="1" value="40"><output id="tc-a-o"></output></label>
   <label>Target µg/mL <input type="range" id="tc-t" min="1" max="8" step="0.5" value="4"><output id="tc-t-o"></output></label>
   <label>Target change at 15 min to <input type="range" id="tc-t2" min="1" max="8" step="0.5" value="3"><output id="tc-t2-o"></output></label>
   <label>Stop infusion at min <input type="range" id="tc-s" min="20" max="240" step="5" value="60"><output id="tc-s-o"></output></label></div>
  <div class="svgbox"><svg id="tc" viewBox="0 0 900 430" role="img" aria-label="TCI simulation"></svg></div>
  <div class="readout" id="tc-r"></div></div>

 <div class="fig"><h3>Context-sensitive decrement times</h3>
  <div class="seg" id="cs-sel"></div>
  <div class="svgbox"><svg id="cs" viewBox="0 0 520 320" role="img" aria-label="CSHT curves"></svg></div>
  <div class="readout" id="cs-r"></div></div>

 <div class="fig"><h3>Dose–response curves</h3>
  <div class="seg" id="dr-sel"></div>
  <div class="ctl"><label>Antagonist concentration ×K<sub>B</sub> <input type="range" id="dr-b" min="0" max="30" step="0.5" value="4"><output id="dr-b-o"></output></label>
   <label>Partial agonist efficacy <input type="range" id="dr-e" min="0.1" max="1" step="0.05" value="0.5"><output id="dr-e-o"></output></label></div>
  <div class="svgbox"><svg id="dr" viewBox="0 0 520 300" role="img" aria-label="Dose response"></svg></div>
  <div class="readout" id="dr-r"></div></div>

 <div class="fig"><h3>Exponential kinetics: bolus, infusion, repeated doses</h3>
  <div class="seg" id="ek-sel"></div><div class="seg" id="ek-log"></div>
  <div class="ctl"><label>Half-life min <input type="range" id="ek-h" min="10" max="240" step="5" value="60"><output id="ek-h-o"></output></label>
   <label>Dosing interval min <input type="range" id="ek-i" min="15" max="240" step="5" value="60"><output id="ek-i-o"></output></label></div>
  <div class="svgbox"><svg id="ek" viewBox="0 0 520 300" role="img" aria-label="Exponential kinetics"></svg></div>
  <div class="readout" id="ek-r"></div></div>

 <div class="fig"><h3>Michaelis–Menten and zero-order elimination</h3>
  <div class="ctl"><label>Km mg/L <input type="range" id="mm-k" min="1" max="20" step="0.5" value="5"><output id="mm-k-o"></output></label>
   <label>Starting concentration mg/L <input type="range" id="mm-c" min="2" max="60" step="1" value="30"><output id="mm-c-o"></output></label></div>
  <div class="svgbox"><svg id="mmk" viewBox="0 0 520 340" role="img" aria-label="Michaelis Menten"></svg></div>
  <div class="readout" id="mmk-r"></div></div>

 <div class="fig"><h3>Hepatic extraction (well-stirred model)</h3>
  <div class="ctl"><label>Hepatic blood flow L/min <input type="range" id="he-q" min="0.3" max="3" step="0.05" value="1.5"><output id="he-q-o"></output></label>
   <label>Free fraction × CL<sub>int</sub> L/min <input type="range" id="he-c" min="0.05" max="30" step="0.05" value="2"><output id="he-c-o"></output></label></div>
  <div class="svgbox"><svg id="he" viewBox="0 0 520 300" role="img" aria-label="Hepatic clearance"></svg></div>
  <div class="readout" id="he-r"></div></div>

 <div class="fig"><h3>Ionisation and ion trapping</h3>
  <div class="seg" id="io-sel"></div>
  <div class="svgbox"><svg id="io" viewBox="0 0 520 300" role="img" aria-label="Ionisation curve"></svg></div>
  <div class="readout" id="io-r"></div></div>

 <div class="fig"><h3>Isobologram</h3>
  <div class="seg" id="ib-sel"></div>
  <div class="svgbox"><svg id="ib" viewBox="0 0 520 300" role="img" aria-label="Isobologram"></svg></div>
  <div class="readout" id="ib-r"></div></div>
</div>`;

function initDiagrams(){
 const out=(id,t)=>{const o=$("#"+id+"-o");if(o)o.textContent=t};
 const mk=svg=>(t,a,tx)=>{const e=document.createElementNS(SVGNS,t);for(const k in a)e.setAttribute(k,a[k]);if(tx!=null)e.textContent=tx;svg.append(e);return e};

 /* 1. TCI simulator */
 let tcModel="mmarsh",tcMode="ce";
 function simulate(p,targetAt,stopAt,mode,T){const dt=1/30,imax=200;let a1=0,a2=0,a3=0,ce=0,bolusLeft=0,phase="idle",lastT=null,dir=1;const res=[];let total=0,firstBolus=null;
  const peakCe=(B,s)=>{let [x1,x2,x3,xe]=s,left=B,pk=xe;for(let t=0;t<10;t+=dt){const inf=left>0?Math.min(imax,left/dt):0;left-=inf*dt;const c1=x1/p.V1;const d1=inf-(p.k10+p.k12+p.k13)*x1+p.k21*x2+p.k31*x3;x2+=(p.k12*x1-p.k21*x2)*dt;x3+=(p.k13*x1-p.k31*x3)*dt;x1+=d1*dt;xe+=p.ke0*(c1-xe)*dt;if(xe>pk)pk=xe;if(t>2&&xe<pk-0.001)break}return pk};
  for(let t=0;t<=T;t+=dt){const tgt=t<stopAt?targetAt(t):0;let inf=0;const c1=a1/p.V1;
   if(tgt!==lastT){ dir=tgt>(mode==="ce"?ce:c1)?1:-1; if(t<stopAt&&mode==="ce"&&tgt>ce+0.01){let lo=0,hi=p.V1*tgt*6;for(let i=0;i<28;i++){const m=(lo+hi)/2;peakCe(m,[a1,a2,a3,ce])>tgt?hi=m:lo=m}bolusLeft=lo;if(firstBolus===null)firstBolus=lo;phase="bolus"}
     else if(t<stopAt&&mode==="cp"&&tgt>c1){bolusLeft=Math.max(0,tgt*p.V1-a1);if(firstBolus===null)firstBolus=bolusLeft;phase="bolus"} else phase=tgt<(mode==="ce"?ce:c1)?"wait":"clamp"; lastT=tgt}
   if(t>=stopAt){inf=0}
   else if(phase==="bolus"){inf=Math.min(imax,bolusLeft/dt);bolusLeft-=inf*dt;if(bolusLeft<=1e-6)phase=mode==="ce"?"wait":"clamp"}
   else if(phase==="wait"){inf=0;if(mode==="ce"){if(dir>0?(ce>=tgt-0.03||c1<=ce):ce<=tgt)phase="clamp"}else if(c1<=tgt)phase="clamp"}
   if(phase==="clamp"&&t<stopAt){const loss=(p.k10+p.k12+p.k13)*a1-p.k21*a2-p.k31*a3;inf=Math.max(0,Math.min(imax,(tgt*p.V1-a1)/dt+loss))}
   const d1=inf-(p.k10+p.k12+p.k13)*a1+p.k21*a2+p.k31*a3;a2+=(p.k12*a1-p.k21*a2)*dt;a3+=(p.k13*a1-p.k31*a3)*dt;a1+=d1*dt;ce+=p.ke0*(c1-ce)*dt;total+=inf*dt;
   if(Math.round(t*30)%6===0)res.push([t,a1/p.V1,ce,inf*6,tgt])}
  return {res,total,firstBolus:firstBolus||0}}
 function drawTC(){const w=+$("#tc-w").value,h=+$("#tc-h").value,a=+$("#tc-a").value,t1=+$("#tc-t").value,t2=+$("#tc-t2").value,s=+$("#tc-s").value;out("tc-w",w);out("tc-h",h);out("tc-a",a);out("tc-t",t1);out("tc-t2",t2);out("tc-s",s);
  const p=propModel(tcModel,w,h,a,0);const T=s+40;const sim=simulate(p,t=>t<15?t1:t2,s,tcMode,T);
  const svg=$("#tc");svg.innerHTML="";const add=mk(svg);
  const ymax=Math.max(8,...sim.res.map(r=>Math.min(20,r[1])))*1.05;
  const P1=plot(svg,{w:900,h:260,x0:0,x1:T,y0:0,y1:ymax,xt:range(0,T,Math.min(12,Math.round(T/10))).map(x=>Math.round(x)),yt:[0,2,4,6,8,10,12,14,16].filter(y=>y<=ymax),yl:"µg/mL",clear:false,mb:24});
  P1.line(sim.res.map(r=>[r[0],Math.min(ymax,r[1])]),{stroke:"var(--abp)","stroke-width":2});P1.line(sim.res.map(r=>[r[0],r[2]]),{stroke:"var(--spo2)","stroke-width":2.4});P1.line(sim.res.map(r=>[r[0],r[4]]),{stroke:"var(--muted)","stroke-dasharray":"5 4","stroke-width":1.2});
  P1.add("line",{x1:P1.X(0),x2:P1.X(T),y1:P1.Y(1.2),y2:P1.Y(1.2),stroke:"var(--good)","stroke-dasharray":"2 4"});P1.text(T*0.86,1.5,"wake ~1.2",{fill:"var(--good)","font-size":"11"});
  P1.text(T*0.02,ymax*0.92,"Cp (plasma)",{fill:"var(--abp)"});P1.text(T*0.18,ymax*0.92,"Ce (effect site)",{fill:"var(--spo2)"});P1.text(T*0.38,ymax*0.92,"target",{fill:"var(--muted)"});
  const rmax=Math.max(...sim.res.map(r=>r[3]))||1;
  const P2=plot(svg,{w:900,h:160,x0:0,x1:T,y0:0,y1:rmax*1.08,xt:range(0,T,Math.min(12,Math.round(T/10))).map(x=>Math.round(x)),yt:[0,Math.round(rmax/2),Math.round(rmax)],yl:"mL/h (1%)",xl:"Time (min)",clear:false,yOff:265,mt:6});
  P2.add("path",{d:sim.res.map((r,i)=>(i?"L":"M")+P2.X(r[0])+" "+P2.Y(r[3])).join(" ")+` L${P2.X(T)} ${P2.Y(0)} L${P2.X(0)} ${P2.Y(0)} Z`,fill:"var(--etco2)","fill-opacity":.35,stroke:"var(--etco2)"});
  let wake=null;for(const r of sim.res){if(r[0]>s&&r[2]<=1.2){wake=r[0]-s;break}}
  const at10=sim.res.find(r=>r[0]>=10)||sim.res[0];
  $("#tc-r").innerHTML=`${tcModel==="schnider"?"Schnider":tcModel==="mmarsh"?"Modified Marsh":"Marsh (original ke0)"}, ${tcMode==="ce"?"effect-site":"plasma"} targeting · V1 ${p.V1.toFixed(1)} L · ke0 ${p.ke0} /min · initial bolus <b>${sim.firstBolus.toFixed(0)} mg</b> (${(sim.firstBolus/10).toFixed(1)} mL) · rate at 10 min ${(at10[3]).toFixed(0)} mL/h · total ${(sim.total).toFixed(0)} mg (${(sim.total/10).toFixed(0)} mL) · time from stopping to Ce 1.2 µg/mL: <b>${wake!==null?wake.toFixed(1)+" min":"> 40 min"}</b>. Note the plasma overshoot in effect-site mode, the pause when the target is lowered, and how Schnider plasma mode gives a small bolus.`}
 seg($("#tc-mod"),[["mmarsh","Modified Marsh (ke0 1.2)"],["marsh","Marsh (ke0 0.26)"],["schnider","Schnider"]],k=>{tcModel=k;drawTC()},"mmarsh");
 seg($("#tc-mode"),[["ce","Effect-site target"],["cp","Plasma target"]],k=>{tcMode=k;drawTC()},"ce");
 ["#tc-w","#tc-h","#tc-a","#tc-t","#tc-t2","#tc-s"].forEach(s=>$(s).oninput=drawTC);

 /* 2. CSHT */
 let csCache={};
 function drawCS(fr){const frac=fr==="80"?0.2:fr==="70"?0.3:0.5;const P=plot($("#cs"),{w:520,h:320,x0:0,x1:600,y0:0,y1:300,xt:[0,120,240,360,480,600],yt:[0,60,120,180,240,300],xl:"Infusion duration (min)",yl:"Decrement time (min)"});
  const lines=[],labs=[];Object.entries(DRUGS).forEach(([k,[nm,p,col]])=>{const key=k+frac;if(!csCache[key])csCache[key]=cshtCurve(p,frac,600);const pts=csCache[key];P.line(pts.map(([t,v])=>[t,Math.min(300,v)]),{stroke:col});const last=pts[pts.length-1];lines.push([nm,last[1],pts.find(x=>x[0]===240)[1]]);labs.push([Math.min(290,last[1]),nm.split(" ")[0],col])});
  labs.sort((a,b)=>a[0]-b[0]);for(let i=1;i<labs.length;i++)if(labs[i][0]-labs[i-1][0]<22)labs[i][0]=labs[i-1][0]+22;labs.forEach(([y,n,c])=>P.text(470,Math.min(296,y)+4,n,{fill:c,"font-size":"11"}));
  $("#cs-r").innerHTML=`${fr==="50"?"Context-sensitive half-time":"Decrement time to "+(100-frac*100)+"% fall"}: `+lines.map(([n,v10,v4])=>`${n.split(" ")[0]} ${v4.toFixed(0)} min at 4 h, ${v10.toFixed(0)} at 10 h`).join(" · ")+". Simulated from typical published parameters. Propofol here uses the Gepts/Marsh rate constants and comes out lower than Hughes\u2019 classic figure (~20 min at 3 h, < 40 min at 8 h), which used different data; quote the Hughes values in the exam.";}
 seg($("#cs-sel"),[["50","50% (CSHT)"],["70","70%"],["80","80%"]],drawCS,"50");

 /* 3. Dose-response */
 let drK="comp";
 function drawDR(){const B=+$("#dr-b").value,eff=+$("#dr-e").value;out("dr-b",B);out("dr-e",eff.toFixed(2));
  const P=plot($("#dr"),{w:520,h:300,x0:-3,x1:4,y0:-25,y1:110,xt:[-3,-2,-1,0,1,2,3,4],yt:[-20,0,25,50,75,100],xl:"log10 agonist concentration (EC50 = 0)",yl:"% maximal response"});
  const E=(x,ec,emax,n=1)=>emax*Math.pow(10,n*x)/(Math.pow(10,n*x)+Math.pow(10,n*ec));
  P.line(range(-3,4,200).map(x=>[x,E(x,0,100)]),{stroke:"var(--muted)","stroke-dasharray":"5 4","stroke-width":1.5});P.text(-2.8,104,"full agonist alone",{fill:"var(--muted)","font-size":"11"});
  let txt="";
  if(drK==="comp"){const ec=Math.log10(1+B);P.line(range(-3,4,200).map(x=>[x,E(x,ec,100)]),{stroke:"var(--abp)"});txt=`Competitive reversible antagonist: dose ratio = 1 + [B]/K<sub>B</sub> = ${(1+B).toFixed(1)}; parallel shift of ${ec.toFixed(2)} log units; maximum unchanged (surmountable).`}
  if(drK==="non"){const emax=100/(1+B/2);P.line(range(-3,4,200).map(x=>[x,E(x,0,emax)]),{stroke:"var(--abp)"});txt=`Non-competitive antagonist: maximum reduced to ${emax.toFixed(0)}%, EC50 unchanged (insurmountable).`}
  if(drK==="irr"){const shift=Math.log10(1+Math.min(B,4));const emax=B>4?100*Math.exp(-(B-4)/8):100;P.line(range(-3,4,200).map(x=>[x,E(x,shift,emax)]),{stroke:"var(--abp)"});txt=`Irreversible antagonist with spare receptors: right shift first; once the reserve is used up (here above ${4}× K<sub>B</sub>) the maximum falls (${emax.toFixed(0)}%).`}
  if(drK==="part"){P.line(range(-3,4,200).map(x=>[x,E(x,0.3,100*eff)]),{stroke:"var(--etco2)"});const mixed=x=>{const occP=0.8;return 100*eff*occP+E(x,Math.log10(1+4),100)*(1-eff*occP)};P.line(range(-3,4,200).map(x=>[x,Math.min(100,mixed(x))]),{stroke:"var(--abp)","stroke-dasharray":"4 3"});P.text(1.5,100*eff*0.5,"partial agonist",{fill:"var(--etco2)","font-size":"11"});P.text(1.2,90,"full agonist + partial (dashed)",{fill:"var(--abp)","font-size":"11"});txt=`Partial agonist (efficacy ${eff.toFixed(2)}): maximum ${(100*eff).toFixed(0)}% at full occupancy. Given with a full agonist it raises the baseline but shifts the full agonist curve right (buprenorphine with morphine).`}
  if(drK==="inv"){P.add("line",{x1:P.X(-3),x2:P.X(4),y1:P.Y(0),y2:P.Y(0),stroke:"var(--muted)"});P.line(range(-3,4,200).map(x=>[x,15-E(x,0,35)]),{stroke:"var(--nibp)"});P.text(1,-15,"inverse agonist",{fill:"var(--nibp)","font-size":"11"});P.text(-2.8,18,"constitutive activity 15%",{"font-size":"11"});txt="Inverse agonist: reduces activity below the constitutive (baseline) level; a neutral antagonist would leave baseline unchanged and block both."}
  $("#dr-r").innerHTML=txt}
 seg($("#dr-sel"),[["comp","Competitive"],["non","Non-competitive"],["irr","Irreversible + spare receptors"],["part","Partial agonist"],["inv","Inverse agonist"]],k=>{drK=k;drawDR()},"comp");["#dr-b","#dr-e"].forEach(s=>$(s).oninput=drawDR);

 /* 4. Exponential kinetics */
 let ekK="bolus",ekLog=false;
 function drawEK(){const h=+$("#ek-h").value,iv=+$("#ek-i").value;out("ek-h",h);out("ek-i",iv);const k=0.693/h,T=6*h;
  let f,txt;if(ekK==="bolus"){f=t=>100*Math.exp(-k*t);txt=`Single bolus: t½ ${h} min, τ = ${(h/0.693).toFixed(0)} min. After 1 τ 37% remains; after 5 t½ ~3%.`}
  else if(ekK==="inf"){f=t=>100*(1-Math.exp(-k*t));txt=`Constant infusion, no loading dose: reaches 50% of Css at 1 t½, 94% at 4 t½, 97% at 5 t½ (${(5*h).toFixed(0)} min). Css = rate/CL.`}
  else if(ekK==="load"){f=t=>100;txt="Loading dose (C × Vd) plus maintenance infusion (C × CL): steady state immediately in a one-compartment model; in reality distribution causes an early dip."}
  else{const r=Math.exp(-k*iv),acc=1/(1-r);f=t=>{let s=0;for(let n=0;n*iv<=t;n++)s+=100*Math.exp(-k*(t-n*iv));return s};txt=`Repeated boluses every ${iv} min: accumulation factor 1/(1 − e<sup>−kτ</sup>) = ${acc.toFixed(2)}; peak-to-trough ratio ${(1/r).toFixed(2)}. Steady state after ~5 t½ whatever the interval.`}
  const vals=range(0,T,400).map(t=>[t,f(t)]);const ymax=Math.max(...vals.map(v=>v[1]))*1.1;
  if(ekLog){const P=plot($("#ek"),{w:520,h:300,x0:0,x1:T,y0:-1,y1:Math.log10(ymax),xt:range(0,T,6).map(x=>Math.round(x)),yt:[0,1,2].filter(y=>y<=Math.log10(ymax)),xl:"Time (min)",yl:"log10 concentration"});P.line(vals.filter(v=>v[1]>0.1).map(([t,v])=>[t,Math.log10(v)]),{stroke:"var(--spo2)"});}
  else{const P=plot($("#ek"),{w:520,h:300,x0:0,x1:T,y0:0,y1:ymax,xt:range(0,T,6).map(x=>Math.round(x)),yt:[0,25,50,75,100].filter(y=>y<=ymax),xl:"Time (min)",yl:"% of C0 / Css"});P.line(vals,{stroke:"var(--spo2)"});if(ekK==="bolus"){P.add("line",{x1:P.X(h),x2:P.X(h),y1:P.Y(0),y2:P.Y(50),stroke:"var(--abp)","stroke-dasharray":"3 3"});P.text(h+2,52,"t½",{fill:"var(--abp)"});P.add("line",{x1:P.X(0),x2:P.X(h/0.693),y1:P.Y(100),y2:P.Y(0),stroke:"var(--etco2)","stroke-dasharray":"3 3"});P.text(h/0.693+2,8,"τ",{fill:"var(--etco2)"})}}
  $("#ek-r").innerHTML=txt}
 seg($("#ek-sel"),[["bolus","Bolus decay"],["inf","Infusion wash-in"],["load","Loading + infusion"],["rep","Repeated boluses"]],k=>{ekK=k;drawEK()},"bolus");seg($("#ek-log"),[["lin","Linear axis"],["log","Log axis"]],k=>{ekLog=k==="log";drawEK()},"lin");["#ek-h","#ek-i"].forEach(s=>$(s).oninput=drawEK);

 /* 5. Michaelis-Menten */
 function drawMMK(){const Km=+$("#mm-k").value,C0=+$("#mm-c").value;out("mm-k",Km);out("mm-c",C0);const Vm=10;const svg=$("#mmk");svg.innerHTML="";
  const P1=plot(svg,{w:520,h:165,x0:0,x1:60,y0:0,y1:11,xt:[0,10,20,30,40,50,60],yt:[0,5,10],xl:"[S] mg/L",yl:"Rate",clear:false});
  P1.line(range(0,60).map(s=>[s,Vm*s/(Km+s)]),{stroke:"var(--spo2)"});P1.add("line",{x1:P1.X(Km),x2:P1.X(Km),y1:P1.Y(0),y2:P1.Y(5),stroke:"var(--abp)","stroke-dasharray":"3 3"});P1.text(Km+1,5.5,"Km",{fill:"var(--abp)"});P1.text(45,10.3,"Vmax",{"font-size":"11"});
  let c=C0;const pts=[[0,c]];const dt=0.05;for(let t=dt;t<=12;t+=dt){c=Math.max(0,c-Vm*c/(Km+c)/10*dt*2);pts.push([t,c])}
  const P2=plot(svg,{w:520,h:170,x0:0,x1:12,y0:0,y1:C0*1.05,xt:[0,2,4,6,8,10,12],yt:[0,Math.round(C0/2),C0],xl:"Time (h)",yl:"Plasma mg/L",clear:false,yOff:165,mt:10});
  P2.line(pts,{stroke:"var(--abp)"});
  $("#mmk-r").innerHTML=`Above Km (${Km} mg/L) elimination is near-constant in amount (zero-order: the plasma curve is nearly a straight line); below Km it becomes first-order (exponential tail). Phenytoin's Km lies within its therapeutic range, so small dose increases cause disproportionate rises.`}
 ["#mm-k","#mm-c"].forEach(s=>$(s).oninput=drawMMK);drawMMK();

 /* 6. Hepatic extraction */
 function drawHE(){const Q=+$("#he-q").value,fc=+$("#he-c").value;out("he-q",Q.toFixed(2));out("he-c",fc.toFixed(2));
  const P=plot($("#he"),{w:520,h:300,x0:0,x1:3,y0:0,y1:2.6,xt:[0,0.5,1,1.5,2,2.5,3],yt:[0,0.5,1,1.5,2,2.5],xl:"Hepatic blood flow (L/min)",yl:"Hepatic clearance (L/min)"});
  const cl=(q,f)=>q*f/(q+f);P.line(range(0.05,3).map(q=>[q,q]),{stroke:"var(--muted)","stroke-dasharray":"4 4","stroke-width":1.2});P.text(2.2,2.35,"CL = Q (E = 1)",{"font-size":"10"});
  P.line(range(0.05,3).map(q=>[q,cl(q,20)]),{stroke:"var(--abp)","stroke-width":1.6});P.text(2.3,cl(2.3,20)-0.15,"high E (propofol-like)",{fill:"var(--abp)","font-size":"10"});
  P.line(range(0.05,3).map(q=>[q,cl(q,0.15)]),{stroke:"var(--nibp)","stroke-width":1.6});P.text(1.9,0.25,"low E (warfarin-like)",{fill:"var(--nibp)","font-size":"10"});
  P.line(range(0.05,3).map(q=>[q,cl(q,fc)]),{stroke:"var(--spo2)"});P.dot(Q,cl(Q,fc),"var(--ink)","",0,0);
  const E=fc/(Q+fc);$("#he-r").innerHTML=`E = fu·CLint/(Q + fu·CLint) = <b>${E.toFixed(2)}</b>; CL = <b>${cl(Q,fc).toFixed(2)} L/min</b>. ${E>0.7?"Flow-limited: halving Q nearly halves clearance (low cardiac output, β-blockers, volatiles, clamping).":E<0.3?"Capacity-limited: clearance barely changes with flow but tracks enzyme activity and free fraction.":"Intermediate: sensitive to both."}`}
 ["#he-q","#he-c"].forEach(s=>$(s).oninput=drawHE);drawHE();

 /* 7. Ionisation */
 const IO={lido:["Lidocaine (base 7.9)",7.9,1,7.4,7.25],bupi:["Bupivacaine (base 8.1)",8.1,1,7.4,7.0],alf:["Alfentanil (base 6.5)",6.5,1,7.4,7.25],fent:["Fentanyl (base 8.4)",8.4,1,7.4,7.25],thio:["Thiopental (acid 7.6)",7.6,0,7.4,7.25],asp:["Aspirin in stomach (acid 3.5)",3.5,0,7.4,2.0]};
 function drawIO(k){const [nm,pk,base,ph1,ph2]=IO[k];const P=plot($("#io"),{w:520,h:300,x0:1,x1:11,y0:0,y1:100,xt:[1,3,5,7,9,11],yt:[0,25,50,75,100],xl:"pH",yl:"% unionised"});
  const un=ph=>base?100/(1+Math.pow(10,pk-ph)):100/(1+Math.pow(10,ph-pk));P.line(range(1,11,200).map(ph=>[ph,un(ph)]),{stroke:"var(--nibp)"});
  [[ph1,"plasma "+ph1],[ph2,(k==="asp"?"stomach ":"fetal ")+ph2]].forEach(([ph,l],i)=>{P.add("line",{x1:P.X(ph),x2:P.X(ph),y1:P.Y(0),y2:P.Y(100),stroke:i?"var(--abp)":"var(--spo2)","stroke-dasharray":"4 3"});P.text(ph+0.1,90-i*10,l,{fill:i?"var(--abp)":"var(--spo2)","font-size":"11"})});
  P.add("line",{x1:P.X(pk),x2:P.X(pk),y1:P.Y(0),y2:P.Y(50),stroke:"var(--muted)"});P.text(pk+0.1,46,"pKa",{"font-size":"11"});
  const ratio=base?(1+Math.pow(10,pk-ph2))/(1+Math.pow(10,pk-ph1)):(1+Math.pow(10,ph2-pk))/(1+Math.pow(10,ph1-pk));
  $("#io-r").innerHTML=`<b>${nm}.</b> Unionised at pH ${ph1}: ${un(ph1).toFixed(1)}%; at ${ph2}: ${un(ph2).toFixed(1)}%. At equilibrium the unionised concentrations are equal, so the total concentration ratio (${k==="asp"?"stomach":"fetal"} : plasma) is <b>${ratio.toFixed(2)}</b>. ${ratio>1?"Trapping in the second compartment.":"Drug concentrates on the plasma side."}`}
 seg($("#io-sel"),Object.entries(IO).map(([k,v])=>[k,v[0]]),drawIO,"lido");

 /* 8. Isobologram */
 const IB={add:["Additive",1,"Straight line between the ED50 of each drug alone: combinations behave as if one drug (two volatiles; N2O with volatile MAC)."],syn:["Synergistic",0.45,"Curve bowed towards the origin: less of each needed (propofol + remifentanil; propofol + midazolam; opioid + benzodiazepine respiratory depression)."],ant:["Antagonistic",1.8,"Curve bowed away from the origin: more of each needed (e.g. physiological antagonism)."]};
 function drawIB(k){const [nm,g,txt]=IB[k];const P=plot($("#ib"),{w:520,h:300,x0:0,x1:1.2,y0:0,y1:1.2,xt:[0,0.25,0.5,0.75,1],yt:[0,0.25,0.5,0.75,1],xl:"Dose of drug A (fraction of its ED50)",yl:"Dose of drug B (fraction of ED50)"});
  P.line([[1,0],[0,1]],{stroke:"var(--muted)","stroke-dasharray":"5 4","stroke-width":1.3});
  const pts=range(0,1,80).map(a=>{const b=Math.pow(Math.max(0,1-Math.pow(a,1/g)),g);return [a,b]});P.line(pts,{stroke:k==="syn"?"var(--good)":k==="ant"?"var(--bad)":"var(--spo2)"});
  $("#ib-r").innerHTML=`<b>${nm}.</b> ${txt} Each point on the line produces the same effect (isobole).`}
 seg($("#ib-sel"),Object.entries(IB).map(([k,v])=>[k,v[0]]),drawIB,"syn");
}

ATLAS.register({id:"07",name:"Pharmacological principles",
  lede:"Pharmacokinetics, models and TCI, pharmacodynamics, physicochemistry, pharmacogenetics and statistics.",
  barsNote:"",
  bars:BARS,fam:FAM,slides:SLIDES,calcs:CALCS,tables:TABLES,cards:CARDS,fcf:FCF,viva:VIVA,quiz:QUIZ,crisis:CRISIS,
  sources:SRC,errata:ERR,refs:REFS,diagHTML:DIAG,initDiagrams,
  diagLede:"Eight live diagrams, led by a propofol TCI simulator (Marsh, modified Marsh, Schnider; plasma or effect-site targeting) and CSHT curves simulated from published parameters."});
})();
