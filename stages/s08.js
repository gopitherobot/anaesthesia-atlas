/* Stage 08 · Anaesthetic agents */
(function(){
const {plot,range,el,SVGNS,fmt,$,$$,seg}=ATLAS.h;

const BARS=[];

const FAM={iv:["spo2","IV agents & sedatives"],inh:["etco2","Inhaled agents"],nmb:["abp","NMJ & reversal"],an:["nibp","Analgesics"],la:["ecg","Local anaesthetics"]};

const SLIDES=[
{f:"iv",t:"The ideal IV induction agent and how agents work",b:`<ul class="clean"><li><b>Ideal agent</b>. <i>Physical</i>: water-soluble, stable in solution and light, long shelf life, no pain on injection, small volume, cheap, no preservative. <i>Pharmacokinetic</i>: onset in one arm–brain circulation time, rapid redistribution and clearance, no active metabolites, non-cumulative, safe in organ failure. <i>Pharmacodynamic</i>: high therapeutic index, minimal cardiovascular and respiratory depression, analgesic, antiemetic, no excitatory effects, no histamine release or allergy, safe in porphyria and MH, neuroprotective, no interactions.</li>
<li><b>Classification</b>: barbiturates (thiopental, methohexital), phenols (propofol), imidazoles (etomidate), phencyclidines (ketamine), benzodiazepines (midazolam, remimazolam), steroids (alfaxalone).</li>
<li><b>Mechanisms of general anaesthesia</b>:
<ul class="clean"><li><b>GABA<sub>A</sub> positive allosteric modulation</b> (propofol, thiopental, etomidate, benzodiazepines, volatiles): increased Cl⁻ conductance, hyperpolarisation. Binding sites at β subunits (etomidate β2/β3, propofol β3); benzodiazepines at the α–γ2 interface.</li>
<li><b>NMDA antagonism</b> (ketamine, N2O, xenon).</li>
<li><b>Two-pore K⁺ channels (K2P: TREK-1, TASK)</b> opened by volatiles, N2O, xenon; glycine receptor potentiation (spinal immobility by volatiles); HCN channels.</li>
<li>Older theories: Meyer–Overton lipid theory, critical volume hypothesis. Disproved by the cut-off effect, enantiomer differences and protein binding studies (Franks & Lieb).</li>
<li>Sites: immobility is mainly spinal (volatiles); hypnosis and amnesia are cortical and thalamocortical.</li></ul></li></ul>`,
p:"A common EDAIC question asks about the ideal IV agent with a good and a bad example. Propofol comes closest; thiopental fails on infusion (accumulation), etomidate on adrenal suppression, ketamine on emergence phenomena.",
v:"List ideal properties under physical, PK and PD headings, then classify the agents, then give mechanisms (GABA<sub>A</sub>, NMDA, K2P)."},
{f:"iv",t:"Propofol",b:`<ul class="clean"><li><b>Chemistry</b>: 2,6-diisopropylphenol, a weak acid (pKa 11). 1% or 2% emulsion in 10% soybean oil, 1.2% egg lecithin, 2.25% glycerol, with NaOH to pH 6–8.5. Some brands contain EDTA or metabisulphite to limit bacterial growth: discard after 6 h (syringes) or 12 h (infusion sets).</li>
<li><b>Dose</b>: induction 1.5–2.5 mg/kg (less in elderly or shocked patients); maintenance 4–12 mg/kg/h or TCI 3–6 µg/mL; sedation 0.3–4 mg/kg/h.</li>
<li><b>PK</b>: 98% protein bound; Vd ~4 L/kg; clearance 30–60 mL/kg/min (exceeds hepatic blood flow, so there is extrahepatic metabolism in kidney and lung). Metabolised mainly by <b>glucuronidation</b> to propofol glucuronide, and by CYP2B6 hydroxylation to 4-hydroxypropofol, which is then conjugated. Metabolites are inactive and excreted in urine (can turn urine green). Terminal t½ 5–12 h; CSHT &lt; 40 min after 8 h.</li>
<li><b>CNS</b>: smooth, rapid induction; ↓ CMRO2, CBF and ICP; anticonvulsant (but excitatory movements occur); antiemetic at subhypnotic doses; euphoria.</li>
<li><b>CVS</b>: MAP falls 15–25% (↓ SVR, venodilation, some negative inotropy, reset baroreflex). Bradycardia, especially with remifentanil.</li>
<li><b>RS</b>: apnoea, ↓ laryngeal reflexes (good for LMA insertion), bronchodilation.</li>
<li><b>Other</b>: pain on injection (lidocaine premix, large vein); safe in porphyria and MH; no histamine release (allergy rare; egg and soy allergy are not contraindications per current guidance).</li>
<li><b>Propofol infusion syndrome</b>: &gt; 4 mg/kg/h for &gt; 48 h (also after shorter, high-dose infusions), especially with catecholamines, steroids, low carbohydrate intake or children. Impaired mitochondrial fatty acid oxidation causes metabolic acidosis, rhabdomyolysis, hyperkalaemia, hypertriglyceridaemia, lipaemia, hepatomegaly, AKI, arrhythmias (Brugada-like ECG) and cardiac failure. Stop propofol; give supportive care, carbohydrate, RRT, ECMO.</li>
<li><b>Calories</b>: 1% propofol supplies ~1.1 kcal/mL from lipid, so count it in ICU nutrition.</li></ul>`,
p:"Typical exam question: 'Propofol: Vd, dose–response curve, Marsh model, how do you calculate, PRIS, calories'. Combine this slide with Stage 7's TCI simulator.",
v:"Structure: presentation, dose, mechanism, PK, effects by system, side effects and PRIS. Compare with thiopental when asked."},
{f:"iv",t:"Thiopental and the comparison with propofol",b:`<ul class="clean"><li><b>Chemistry</b>: sodium thiopental, a thiobarbiturate (sulphur at C2 increases lipid solubility). Yellow powder with 6% sodium carbonate under nitrogen; 2.5% solution at pH 10.5–11. Weak acid, pKa 7.6, so ~61% is unionised at pH 7.4. Racemic. Tautomerism (keto–enol).</li>
<li><b>Dose</b>: 3–5 mg/kg (4–6 in fit young adults). Onset in one arm–brain time (~30 s); duration 5–10 min, ended by redistribution.</li>
<li><b>PK</b>: 80% protein bound (albumin); Vd 2.5 L/kg; clearance 3.5 mL/kg/min (low-extraction drug); t½ 6–15 h. Hepatic <b>oxidation</b> (and desulphuration to pentobarbital, which is active). Saturable (zero-order) kinetics at high doses. Accumulates in fat, so it is unsuitable for infusion except for refractory status epilepticus or ICP control.</li>
<li><b>Effects</b>: ↓ CMRO2 and ICP, anticonvulsant (used to produce burst suppression). Hypotension, with less fall than propofol. Laryngospasm and bronchospasm more likely (histamine release). Antanalgesic at low doses.</li>
<li><b>Hazards</b>: <b>contraindicated in acute porphyrias</b> (induces ALA synthase); intra-arterial injection causes crystals, arteritis, thrombosis and gangrene; extravasation causes tissue necrosis. Anaphylaxis is rare (~1 in 30 000).</li>
<li>Still used for classical RSI in some obstetric and neuro practice; there are supply problems in many countries.</li></ul>
<div class="tbl"><table><tr><th></th><th>Propofol</th><th>Thiopental</th></tr><tr><td>pKa / acid</td><td>11, weak acid</td><td>7.6, weak acid</td></tr><tr><td>Formulation pH</td><td>6–8.5 (emulsion)</td><td>10.5–11 (solution)</td></tr><tr><td>Protein binding</td><td>98%</td><td>80%</td></tr><tr><td>Vd / CL</td><td>4 L/kg / 30–60 mL/kg/min</td><td>2.5 L/kg / 3.5 mL/kg/min</td></tr><tr><td>Metabolism</td><td>Glucuronidation, extrahepatic</td><td>Hepatic oxidation, active metabolite</td></tr><tr><td>Recovery</td><td>Clear-headed, antiemetic</td><td>Hangover, cumulative</td></tr><tr><td>Airway</td><td>Suppresses reflexes</td><td>Laryngospasm more likely</td></tr><tr><td>Porphyria</td><td>Safe</td><td>Contraindicated</td></tr></table></div>`,
p:"Why is thiopental not good for continuous infusion? Low clearance plus a large fat depot gives a very long context-sensitive half-time, and saturable metabolism at high concentrations.",
v:"Lead with the comparison table, then the PK reasons for accumulation, then the hazards (porphyria, intra-arterial injection)."},
{f:"iv",t:"Ketamine",b:`<ul class="clean"><li><b>Chemistry</b>: phencyclidine derivative; racemic (S(+) esketamine is ~2× as potent, with faster recovery and fewer psychotomimetic effects). pKa 7.5; 25% protein bound; water-soluble (pH 3.5–5.5, with benzethonium chloride preservative).</li>
<li><b>Mechanism</b>: non-competitive NMDA antagonist (binds the phencyclidine site in the open channel). Also acts at opioid (μ, κ), monoaminergic, muscarinic and HCN1 receptors, and blocks Na⁺ channels (LA-like at high doses).</li>
<li><b>Dose</b>: induction 1–2 mg/kg IV or 5–10 mg/kg IM; analgesia 0.1–0.5 mg/kg IV, infusion 0.1–0.3 mg/kg/h; sedation 0.5–1 mg/kg IV; intranasal 1–3 mg/kg (esketamine nasal for depression).</li>
<li><b>PK</b>: Vd 3 L/kg; clearance 17 mL/kg/min (high extraction); t½ 2–3 h. CYP3A4/2B6 N-demethylation to norketamine (~30% potency, active). Oral F ~20%.</li>
<li><b>Dissociative anaesthesia</b>: eyes open, nystagmus, preserved reflexes (not protective), profound analgesia, amnesia.</li>
<li><b>CVS</b>: sympathomimetic (central sympathetic outflow and reduced catecholamine uptake): ↑ HR, BP and CO. Direct myocardial depression is unmasked in catecholamine-depleted patients.</li>
<li><b>RS</b>: preserved ventilation, bronchodilation (asthma, status asthmaticus), ↑ secretions (give an antisialagogue).</li>
<li><b>CNS</b>: ↑ CBF. Modern evidence shows no harmful ICP rise in ventilated patients (acceptable in TBI). Emergence phenomena (vivid dreams, hallucinations) are reduced by benzodiazepines and a quiet recovery. Rapid antidepressant effect.</li>
<li><b>Uses</b>: shocked or trauma patients, field and austere anaesthesia, burns dressings, asthma, analgesia in opioid tolerance and to reduce OIH, CRPS, sedation in children, depression.</li>
<li><b>Contraindications</b>: severe hypertension, pre-eclampsia, IHD (relative), raised IOP or open globe (relative), psychosis, porphyria (relative). Chronic recreational use causes ulcerative cystitis.</li></ul>`,
p:"Ketamine is the only induction agent with significant analgesia and the one that best preserves airway tone and blood pressure, but it is not cardiostable in catecholamine-depleted shock.",
v:"Mechanism (NMDA), presentation and isomers, doses by route, effects by system, uses and contraindications."},
{f:"iv",t:"Etomidate and the newer agents",b:`<ul class="clean"><li><b>Etomidate</b>: carboxylated imidazole, R(+) enantiomer; 2 mg/mL in 35% propylene glycol (pain, thrombophlebitis) or a lipid emulsion. pKa 4.2; 75% protein bound. Dose 0.3 mg/kg. Ester hydrolysis in plasma and liver; t½ 1–4 h.</li>
<li>Most <b>cardiostable</b> induction agent: minimal change in HR, SVR and contractility. Myoclonus (common), PONV, hiccups, pain on injection. Lowers CMRO2 and ICP but can activate epileptiform EEG foci.</li>
<li><b>Adrenal suppression</b>: reversible inhibition of 11β-hydroxylase (and 17α-hydroxylase); one dose suppresses cortisol for 6–24 h (up to 72 h). Infusions increased mortality in ICU (Ledingham 1983). Single-dose effect on outcome in sepsis is debated. Avoid repeat doses and infusions. Porphyrinogenic in animals.</li>
<li><b>Remimazolam</b>: ester-based benzodiazepine. Hydrolysed by tissue carboxylesterase-1 to an inactive metabolite; clearance ~1 L/min, independent of organ function; context-insensitive. Less hypotension than propofol, reversible with flumazenil. Licensed for procedural sedation (UK/EU, also general anaesthesia in some countries).</li>
<li><b>Methohexital</b>: oxybarbiturate, used for ECT (lowers seizure threshold less); causes excitatory movements and pain on injection. <b>Alfaxalone</b>: neurosteroid GABA<sub>A</sub> modulator in cyclodextrin (the old Cremophor version caused anaphylaxis).</li></ul>`,
p:"Etomidate for RSI in shock: the haemodynamic advantage is real; the adrenal suppression lasts about a day. Many now choose ketamine or reduced-dose propofol instead, with a vasopressor ready.",
v:"Etomidate: presentation, CVS stability, adrenal suppression mechanism and evidence; then remimazolam as the 'new kid'."},
{f:"iv",t:"Benzodiazepines and flumazenil",b:`<ul class="clean"><li><b>Mechanism</b>: bind the GABA<sub>A</sub> α–γ2 interface (benzodiazepine site), a positive allosteric modulator that <b>increases the frequency</b> of Cl⁻ channel opening (barbiturates increase the duration). Effects by subunit: α1 sedation, amnesia and anticonvulsant; α2/α3 anxiolysis and muscle relaxation; α5 memory.</li>
<li><b>Effects</b>: anxiolysis, sedation, anterograde amnesia, anticonvulsant, centrally mediated muscle relaxation. Modest respiratory depression that is synergistic with opioids. Mild hypotension. Reduce MAC.</li>
<li><b>Midazolam</b>: imidazobenzodiazepine with pH-dependent ring opening (water-soluble at pH 3.5, lipid-soluble ring closed at 7.4). pKa 6.5 (~90% unionised). 96% protein bound; Vd 1–1.5 L/kg; CYP3A4 hydroxylation to 1-hydroxymidazolam (active, renally excreted, accumulates in renal failure); t½ 2–4 h (much longer in ICU, elderly or obese patients, and with CYP3A4 inhibitors). Doses: sedation 0.02–0.1 mg/kg IV; buccal or intranasal for seizures; oral 0.5 mg/kg premedication in children.</li>
<li><b>Diazepam</b>: t½ 20–100 h; active metabolites (desmethyldiazepam, t½ up to 200 h; oxazepam; temazepam). <b>Lorazepam</b>: glucuronidated, no active metabolites; first-line for status epilepticus (0.1 mg/kg).</li>
<li><b>Flumazenil</b>: competitive antagonist (with very weak partial inverse agonist activity) at the benzodiazepine site. 200 µg then 100 µg increments (max 1 mg; 2 mg in ICU). t½ ~1 h, shorter than most benzodiazepines, so resedation can occur. Can provoke seizures in chronic users or with tricyclic overdose.</li>
<li><b>Tolerance and withdrawal</b> after chronic use: anxiety, insomnia, seizures. Do not stop abruptly before surgery.</li></ul>`,
p:"Paradoxical agitation with midazolam occurs mainly in elderly patients and children. Flumazenil reverses it.",
v:"Receptor and mechanism, effects, compare midazolam, diazepam and lorazepam, flumazenil and its limits."},
{f:"iv",t:"α2-adrenoceptor agonists: dexmedetomidine and clonidine",b:`<div class="tbl"><table><tr><th></th><th>Clonidine</th><th>Dexmedetomidine</th></tr>
<tr><td>α2:α1 selectivity</td><td>200:1 (partial agonist)</td><td>1620:1 (full agonist)</td></tr>
<tr><td>t½</td><td>9–12 h</td><td>2–3 h</td></tr>
<tr><td>Elimination</td><td>~50% unchanged in urine, rest hepatic</td><td>Hepatic (glucuronidation, CYP2A6); inactive metabolites</td></tr>
<tr><td>Routes</td><td>Oral (F ~ 90%), IV, epidural, intrathecal, perineural, transdermal</td><td>IV infusion (intranasal and buccal in children)</td></tr>
<tr><td>Doses</td><td>IV 1–2 µg/kg; premed 2–4 µg/kg oral (children)</td><td>Optional load 0.5–1 µg/kg over 10–20 min; infusion 0.2–1.4 µg/kg/h (ICU)</td></tr></table></div>
<ul class="clean"><li><b>Mechanism</b>: presynaptic α2A in the locus coeruleus (sedation that resembles natural NREM sleep, patients rousable), spinal dorsal horn (analgesia), brainstem vasomotor centre (↓ sympathetic outflow: hypotension, bradycardia). Gi-coupled: ↓ cAMP, K⁺ efflux, ↓ Ca²⁺ entry, ↓ noradrenaline release.</li>
<li><b>Effects</b>: sedation without significant respiratory depression, analgesia and opioid sparing, anxiolysis, sympatholysis, ↓ shivering, ↓ MAC (up to 50%), antisialagogue, diuresis. A bolus can cause transient hypertension (peripheral α2B vasoconstriction) before hypotension.</li>
<li><b>Uses</b>: ICU sedation (light sedation targets, possibly less delirium than benzodiazepines; SPICE III: no mortality benefit, more bradycardia and hypotension), awake fibreoptic intubation, opioid-sparing anaesthesia, emergence delirium in children, withdrawal states (alcohol, opioid), adjunct to blocks and neuraxial anaesthesia, hypertension (clonidine).</li>
<li><b>Cautions</b>: bradycardia and heart block, hypovolaemia; rebound hypertension after abrupt withdrawal of clonidine.</li></ul>`,
p:"Typical exam questions: 'Dexmed and clonidine comparison', 'Clonidine mechanism as hypotensive and anxiolytic agent', 'Dexmedetomidine use in ICU and anaesthesia'.",
v:"Lead with the table, then mechanism by site, effects, ICU evidence (SPICE III, MENDS), cautions."},
{f:"inh",t:"Uptake and distribution of inhaled agents",b:`<ul class="clean"><li>Depth of anaesthesia depends on the <b>partial pressure</b> in the brain, which equilibrates with alveolar partial pressure (F<sub>A</sub>). The rate of rise of F<sub>A</sub>/F<sub>I</sub> is the speed of induction.</li>
<li><b>Factors increasing the rate of rise</b>:
<ul class="clean"><li><i>Delivery</i>: high inspired concentration (overpressure), high fresh gas flow, small circuit volume, low circuit absorption.</li>
<li><i>Ventilation</i>: high alveolar ventilation, small FRC.</li>
<li><i>Agent</i>: low blood:gas partition coefficient (low solubility means less uptake into blood, so F<sub>A</sub> rises fast). Order: xenon 0.14, desflurane 0.42, N2O 0.47, sevoflurane 0.65, isoflurane 1.4, halothane 2.4.</li>
<li><i>Uptake</i>: <b>low cardiac output</b> (less agent carried away, so F<sub>A</sub> rises faster; most marked for soluble agents), low alveolar–venous partial pressure difference.</li>
<li><b>Concentration effect</b>: a high inspired concentration of N2O concentrates the remaining gas as N2O is absorbed and draws in more inspired gas.</li>
<li><b>Second gas effect</b>: the rapid uptake of N2O concentrates and augments uptake of a companion volatile (and O2).</li></ul></li>
<li><b>Tissue groups</b>: vessel-rich group (brain, heart, kidney, liver; 10% of mass, 75% of CO) saturates in minutes; muscle in hours; fat (high fat:blood coefficients) takes days.</li>
<li><b>Recovery</b> is the mirror image. Low solubility, high ventilation and a short anaesthetic speed it. Diffusion hypoxia after N2O: give 100% O2 for 5–10 min.</li>
<li><b>V/Q mismatch</b> slows induction more for insoluble agents. Right-to-left shunt slows it (more for insoluble agents); left-to-right shunt has little effect on inhalational induction.</li>
<li>Children have faster induction: high alveolar ventilation relative to FRC and a high VRG fraction (despite a high CO).</li></ul>`,
p:"Typical exam questions: 'Comparison between desflurane and halothane in high and low cardiac output and high and low alveolar ventilation'. Use the uptake simulator in the Diagrams tab.",
v:"Draw F<sub>A</sub>/F<sub>I</sub> against time for the agents, then go through the factors under delivery, ventilation, agent, uptake. Explain the cardiac output paradox and the concentration and second gas effects."},
{f:"inh",t:"Minimum alveolar concentration",b:`<ul class="clean"><li><b>MAC</b>: the minimum alveolar concentration of an inhaled agent, at steady state, at 1 atmosphere, that prevents movement in response to a standard surgical skin incision in 50% of subjects. It is a quantal ED50 of potency. MAC is a percentage of an atmosphere, so in partial pressure terms it changes with altitude.</li>
<li><b>Variants</b>: MAC<sub>awake</sub> (~0.3–0.4 MAC: eyes open to command), MAC-EI (endotracheal intubation, ~1.3–1.5 MAC), MAC-BAR (block of adrenergic response, ~1.5–2 MAC), MAC95 ≈ 1.3 MAC (MAC dose–response is steep).</li>
<li><b>Additive</b>: 0.5 MAC N2O + 0.5 MAC sevoflurane ≈ 1 MAC.</li>
<li><b>Age</b>: peaks at ~6 months, then falls ~6% per decade (Mapleson: MAC = MAC<sub>40</sub> × 10<sup>−0.00269(age−40)</sup>).</li>
<li><b>Decreased by</b>: increasing age, neonates (vs infants), pregnancy (~30%), hypothermia, hyponatraemia, hypothyroidism, hypotension (MAP &lt; 50), hypoxaemia (PaO2 &lt; 5.3 kPa), anaemia (Hb &lt; 50 g/L), acidosis, acute alcohol, opioids, benzodiazepines, α2 agonists, ketamine, lithium, magnesium (high), N2O, IV anaesthetics, reserpine.</li>
<li><b>Increased by</b>: infancy, hyperthermia (up to 42 °C), hypernatraemia, chronic alcohol, acute amphetamine or cocaine, MAOIs, ephedrine, red hair (MC1R variants, ~20%), hyperthyroidism (modest).</li>
<li><b>No effect</b>: duration of anaesthesia, sex, K⁺, PaCO2 in the normal range, hypertension, mild anaemia.</li>
<li>Ultimate site of MAC (immobility) is the spinal cord, so MAC does not measure awareness or hypnosis.</li></ul>`,
p:"MAC multiplied by oil:gas coefficient is roughly constant (Meyer–Overton). Use the MAC-age calculator and the Meyer–Overton plot in Diagrams.",
v:"Define precisely (four conditions), give variants, then factors that change it grouped as physiological, pathological and pharmacological."},
{f:"inh",t:"The volatile agents",b:`<ul class="clean"><li><b>Sevoflurane</b> (fluorinated isopropyl methyl ether): pleasant, non-irritant, so it is the agent for gas induction; B:G 0.65, MAC ~1.8–2.0. 3–5% metabolised by CYP2E1 to hexafluoroisopropanol and inorganic fluoride (no clinical nephrotoxicity). With strong-base absorbents it forms <b>compound A</b> (vinyl ether, nephrotoxic in rats), more at low flows, high temperature and with desiccated absorbent. Emergence agitation in children. Epileptiform EEG at high concentrations.</li>
<li><b>Desflurane</b> (fully fluorinated methyl ethyl ether): BP 22.8 °C, SVP 89 kPa, so it needs a heated, pressurised vaporiser (Tec 6: 39 °C, ~2 atm). B:G 0.42, MAC 6.6: fastest emergence (obesity, long cases, elderly). Pungent: coughing, laryngospasm, breath-holding, so no gas induction. Sympathetic surge with a rapid rise above 1 MAC. Produces CO with dry absorbent. <b>Global warming potential ~2540</b> (high): banned in the EU from 1 Jan 2026 unless medically necessary; decommissioned in NHS Scotland and England.</li>
<li><b>Isoflurane</b> (methyl ethyl ether, structural isomer of enflurane): pungent; B:G 1.4, MAC 1.17; 0.2% metabolised. Potent vasodilator. "Coronary steal" was a theoretical concern that has not been shown clinically. Cheap; used in ICU sedation (AnaConDa/Sedaconda).</li>
<li><b>Halothane</b> (halogenated alkane, thymol preservative): B:G 2.4, MAC 0.75; 20% metabolised. Sensitises the myocardium to catecholamines (arrhythmias), bradycardia. <b>Halothane hepatitis</b>: type I mild and common (reductive metabolism); type II fulminant (1:35 000), immune-mediated, trifluoroacetylated proteins from oxidative metabolism; risk with repeat exposure, obese middle-aged women. Cross-sensitivity is possible with other agents (rare).</li>
<li><b>Shared effects</b>: dose-dependent ↓ MAP (vasodilation; halothane by myocardial depression), ↓ tidal volume ↑ RR, ↑ PaCO2, blunted hypoxic and hypercapnic responses, bronchodilation, ↑ CBF with ↓ CMRO2 (uncoupling above ~1 MAC), ↓ HPV, uterine relaxation (dose-dependent), potentiation of NMBs, MH triggers, preconditioning (cardioprotection).</li></ul>`,
p:"Typical exam questions: 'Compare pharmacokinetics of sevoflurane and desflurane: which is more potent?' Sevoflurane (lower MAC), but desflurane is faster. Learn the properties table in Classify.",
v:"For each agent: structure, physical properties, PK, systems effects, specific toxicity. Then environment."},
{f:"inh",t:"Nitrous oxide and xenon",b:`<ul class="clean"><li><b>N2O</b>: made by heating ammonium nitrate to 240 °C (impurities NO, NO2, NH3 removed). Stored in blue cylinders as liquid at 44 bar (20 °C). Critical temperature 36.5 °C (Entonox: 50:50 with O2, pseudo-critical temperature −5.5 to −7 °C, separates below that). B:G 0.47, MAC 104% (hyperbaric only), O:G 1.4. Non-flammable but supports combustion.</li>
<li><b>Mechanism</b>: NMDA antagonism; analgesia through release of endogenous opioids and descending noradrenergic inhibition; K2P channels.</li>
<li><b>Effects</b>: analgesia (Entonox), MAC-sparing, mild sympathomimetic, ↑ PVR (avoid in pulmonary hypertension), ↑ CBF and ICP, PONV (dose-related; ENIGMA II found no increase in cardiovascular complications).</li>
<li><b>Gas spaces</b>: 34× more soluble than N2 in blood, so it enters closed cavities faster than N2 leaves: pneumothorax (doubles in 10 min), bowel, middle ear, pneumocephalus, intraocular SF6/C3F8 gas bubbles (contraindicated for weeks), ETT cuff pressure rise, air embolism.</li>
<li><b>Toxicity</b>: oxidises the cobalt in vitamin B12, which inactivates methionine synthase. Megaloblastic anaemia (after &gt; 6–8 h), subacute combined degeneration of the cord (recreational misuse, B12 deficiency), raised homocysteine, teratogenic in animals. Occupational exposure limit 100 ppm (8 h TWA, UK).</li>
<li><b>Environment</b>: GWP ~273 and ozone-depleting, with a long atmospheric life (~110 years). Most N2O loss comes from leaking manifolds; many hospitals are decommissioning piped N2O.</li>
<li><b>Xenon</b>: noble gas; B:G 0.115–0.14 (fastest onset and offset), MAC 63–71%, NMDA antagonist. Cardiostable, analgesic, not metabolised, non-teratogenic, no environmental harm. Expensive (fractional distillation of air) and dense (↑ airway resistance); needs a closed circuit. Possible neuroprotection.</li></ul>`,
p:"Typical exam questions: 'N2O: talk about everything (mechanism of analgesia and neurotoxicity)'.",
v:"Manufacture and storage, physical properties, mechanism, effects, gas-space problems, B12 toxicity, environment. Finish with xenon as the 'ideal' gas."},
{f:"nmb",t:"The neuromuscular junction and blocking drugs",b:`<ul class="clean"><li><b>Junction</b>: a motor nerve terminal releases ACh quanta (~200 quanta of ~10 000 molecules each per impulse) by Ca²⁺-triggered exocytosis (SNARE proteins: the site of botulinum toxin). ACh crosses a 50 nm cleft and binds the nicotinic receptor (pentamer α1₂β1δε in adults; γ replaces ε in fetal and extrajunctional receptors). Both α subunits must be bound to open the channel (Na⁺ in, K⁺ out), producing an end-plate potential and then a muscle action potential. Acetylcholinesterase in the cleft hydrolyses ACh within ~1 ms.</li>
<li><b>Margin of safety</b>: ~70–75% of receptors must be occupied before twitch height falls, and ~90–95% for complete block.</li>
<li><b>Prejunctional nicotinic receptors</b> (α3β2) provide positive feedback for ACh mobilisation. Blocking them by non-depolarising drugs causes <b>fade</b>.</li>
<li><b>Extrajunctional (immature) receptor up-regulation</b> (burns, denervation, immobility, stroke, critical illness): sensitive to suxamethonium (hyperkalaemia) and resistant to non-depolarising drugs.</li>
<li><b>Classification</b>: depolarising (suxamethonium) and non-depolarising: aminosteroids (rocuronium, vecuronium, pancuronium) and benzylisoquinoliniums (atracurium, cisatracurium, mivacurium). All are quaternary ammonium compounds: ionised, low Vd, do not cross BBB or placenta.</li>
<li><b>Potentiation</b> by volatiles, aminoglycosides, magnesium, lithium, local anaesthetics, hypothermia, acidosis, hypokalaemia, hypocalcaemia, myasthenia. <b>Resistance</b> in burns, upper motor neurone lesions, anticonvulsants (chronic), hypercalcaemia.</li></ul>`,
p:"Typical exam questions: 'All about the neuromuscular junction', 'NMBs: their pharmacology, antidotes, sugammadex, neostigmine and ceiling effect'.",
v:"Draw the junction step by step, then the receptor, then classification and factors altering block."},
{f:"nmb",t:"Suxamethonium",b:`<ul class="clean"><li>Two ACh molecules joined: a depolarising agonist at the nicotinic receptor. Not hydrolysed by acetylcholinesterase, so depolarisation persists. Perijunctional Na⁺ channels inactivate and the muscle becomes flaccid (phase I block) after fasciculations.</li>
<li><b>Dose</b> 1–1.5 mg/kg IV (2 mg/kg in infants; IM 4 mg/kg). Onset 30–60 s, duration 5–10 min. ED95 ~0.3 mg/kg. Stored at 2–8 °C.</li>
<li><b>Metabolism</b>: plasma (butyryl)cholinesterase to succinylmonocholine (weakly active), then succinic acid and choline. Only ~10% of the dose reaches the junction.</li>
<li><b>Phase I characteristics</b>: reduced single twitch, no fade on TOF or tetanus, no post-tetanic potentiation, potentiated by anticholinesterases. <b>Phase II</b> (after &gt; 2–5 mg/kg or infusion): resembles non-depolarising block (fade).</li>
<li><b>Side effects</b>: myalgia (young, ambulant patients), hyperkalaemia (~0.5 mmol/L normally; life-threatening with up-regulated receptors: burns &gt; 24–48 h, denervation, crush, prolonged immobility, myopathies), bradycardia (especially repeat doses and children: M2 stimulation), ↑ IOP, ↑ intragastric pressure (but ↑ LOS tone too), ↑ ICP (transient), MH trigger, masseter spasm, anaphylaxis (a leading NMB cause in NAP6), prolonged block (cholinesterase deficiency).</li>
<li><b>Contraindications</b>: MH susceptibility, hyperkalaemia, at-risk denervation or burns, muscular dystrophies (Duchenne: hyperkalaemic rhabdomyolysis in boys), known cholinesterase deficiency, myotonias (spasm).</li></ul>`,
p:"The case for suxamethonium today: fastest onset and offset (but offset is not fast enough to rescue a failed airway). Rocuronium 1.2 mg/kg gives similar intubating conditions with sugammadex available.",
v:"Mechanism, dose, metabolism, block characteristics, side effects (with the 'at-risk' groups for hyperkalaemia), contraindications."},
{f:"nmb",t:"Non-depolarising blockers",b:`<ul class="clean"><li><b>Competitive antagonists</b> at the α subunits of the post-junctional receptor (one α is enough to prevent opening); prejunctional block causes fade.</li>
<li><b>Rocuronium</b> (aminosteroid): ED95 0.3 mg/kg, intubation 0.6 mg/kg (60–90 s), RSI 1–1.2 mg/kg (~60 s). Low potency, so many molecules give a fast onset (Bowman principle). Duration 30–40 min (at 0.6 mg/kg). Excreted mainly unchanged in bile (~70%) and urine. Pain on injection; anaphylaxis (NAP6). Reversible with sugammadex.</li>
<li><b>Vecuronium</b>: no vagolytic effect, lyophilised powder; hepatic deacetylation to 3-desacetylvecuronium (active, accumulates in renal failure and ICU).</li>
<li><b>Pancuronium</b>: long acting (60–90 min), vagolytic and sympathomimetic (tachycardia), 80% renal.</li>
<li><b>Atracurium</b>: 10 stereoisomers; <b>Hofmann degradation</b> (pH- and temperature-dependent) and ester hydrolysis by non-specific esterases to laudanosine (CNS excitant at very high concentrations) and acrylates. Histamine release (flushing, hypotension, bronchospasm). Independent of organ function, so used in renal and hepatic failure.</li>
<li><b>Cisatracurium</b>: 1R-cis,1′R-cis isomer, ~4× more potent, slower onset, ~77% Hofmann, less laudanosine, negligible histamine release. ICU infusions in ARDS.</li>
<li><b>Mivacurium</b>: short acting (15–20 min), hydrolysed by plasma cholinesterase (prolonged in deficiency), histamine release.</li>
<li><b>Monitoring</b>: quantitative monitoring (TOF ratio by acceleromyography or electromyography at the adductor pollicis) whenever NMBs are used (AAGBI 2021). Extubate at TOF ratio ≥ 0.9. Residual block (TOFR &lt; 0.9) causes pharyngeal dysfunction, aspiration, hypoxaemia and pulmonary complications.</li></ul>`,
p:"Sensitivity varies by muscle. The diaphragm and laryngeal muscles are resistant but have a faster onset (high blood flow); adductor pollicis recovers last; the corrugator supercilii (facial nerve) tracks the larynx.",
v:"Mechanism, classification with examples, compare rocuronium and atracurium/cisatracurium (onset, duration, elimination, side effects), then monitoring."},
{f:"nmb",t:"Reversal: anticholinesterases and sugammadex",b:`<ul class="clean"><li><b>Neostigmine</b>: a quaternary carbamate that inhibits acetylcholinesterase (carbamylates the esteratic site; ~30–60 min). Increased ACh competes with the NMB. Dose 50 µg/kg (max 5 mg) with glycopyrrolate 10 µg/kg (or atropine 20 µg/kg) to block muscarinic effects (bradycardia, bronchospasm, secretions, gut motility, PONV).</li>
<li><b>Ceiling effect</b>: once acetylcholinesterase is fully inhibited, more neostigmine adds nothing, so it cannot reverse deep block. Give only once spontaneous recovery is under way (TOF count 4, ideally TOFR ≥ 0.4). Excess in the absence of block can cause weakness (depolarising-type).</li>
<li><b>Other anticholinesterases</b>: edrophonium (reversible, electrostatic; short; Tensilon test), pyridostigmine (oral, myasthenia), physostigmine (tertiary, crosses the BBB: central anticholinergic syndrome), organophosphates (irreversible phosphorylation; aging; treat with atropine, pralidoxime, benzodiazepines).</li>
<li><b>Sugammadex</b>: modified γ-cyclodextrin that encapsulates aminosteroid molecules 1:1 (rocuronium &gt; vecuronium ≫ pancuronium); no effect on benzylisoquinoliniums or suxamethonium. The complex is renally excreted. No anticholinergic needed.
<ul class="clean"><li>Doses: 2 mg/kg at TOF count ≥ 2; 4 mg/kg at 1–2 post-tetanic counts; 16 mg/kg for immediate reversal 3 min after rocuronium 1.2 mg/kg.</li>
<li>Cautions: anaphylaxis (~1:2500–1:35 000; NAP6), bradycardia and asystole (rare), binding of hormonal contraceptives (count as one missed pill; use extra contraception for 7 days), interference with some coagulation assays (aPTT/PT briefly prolonged), not recommended if CrCl &lt; 30 mL/min. Re-blocking with rocuronium after sugammadex needs high doses or a benzylisoquinolinium. Displacement by toremifene (and possibly flucloxacillin and fusidic acid).</li></ul></li>
<li>Sugammadex does not replace monitoring: underdosing without monitoring causes residual block or recurarisation.</li></ul>`,
p:"Clinical rule of thumb: sugammadex for deep or moderate block, neostigmine only for shallow or minimal block (TOF count 4 with fade), confirmed by quantitative TOFR ≥ 0.9.",
v:"Mechanism of each, doses tied to monitoring depth, ceiling effect, side effects, and when neither is appropriate."},
{f:"nmb",t:"Anticholinergics",b:`<ul class="clean"><li><b>Atropine</b> (tertiary, racemic, crosses BBB): 10–20 µg/kg (0.5–1 mg adult; ≥ 0.5 mg because low doses cause paradoxical bradycardia through central vagal stimulation and presynaptic M1 block). Uses: bradycardia, with neostigmine, organophosphate poisoning (large doses).</li>
<li><b>Glycopyrrolate</b> (quaternary, no CNS effects): 5–10 µg/kg; potent antisialagogue; slower onset, longer duration; less tachycardia; pairs well with neostigmine.</li>
<li><b>Hyoscine</b> (tertiary): sedation, amnesia, antiemetic (transdermal for motion sickness); confusion in the elderly. Hyoscine butylbromide (quaternary) as an antispasmodic.</li>
<li><b>Effects</b>: tachycardia, dry mouth, reduced sweating (hyperthermia in children), mydriasis and cycloplegia (glaucoma risk), bronchodilation with more viscous secretions, reduced gut motility and LOS tone, urinary retention.</li>
<li><b>Central anticholinergic syndrome</b>: agitation, confusion, hallucinations, seizures, or somnolence and coma, with peripheral signs ("hot as a hare, blind as a bat, dry as a bone, red as a beet, mad as a hatter"). Causes: atropine, hyoscine, antihistamines, tricyclics, antipsychotics, plants (Datura). Treat with physostigmine 0.5–2 mg IV slowly (contraindicated in TCA overdose with QRS widening) and supportive care.</li></ul>`,
p:"Typical exam questions: 'Anticholinergic toxicity, antidote and differential diagnosis'. The differential includes serotonin syndrome, NMS, sympathomimetic toxicity, sepsis, MH and emergence delirium.",
v:"Compare atropine, glycopyrrolate and hyoscine (tertiary vs quaternary), effects, then the central anticholinergic syndrome and physostigmine."},
{f:"an",t:"Opioid pharmacology",b:`<ul class="clean"><li><b>Classification</b>: naturally occurring (morphine, codeine, from the opium poppy), semi-synthetic (diamorphine, oxycodone, buprenorphine, hydromorphone), synthetic: phenylpiperidines (pethidine, fentanyl, alfentanil, sufentanil, remifentanil), diphenylpropylamines (methadone), others (tramadol, tapentadol). By receptor action: full agonist, partial agonist (buprenorphine), mixed agonist–antagonist (nalbuphine, pentazocine), antagonist (naloxone, naltrexone, methylnaltrexone).</li>
<li><b>Receptors</b> (Gi/o-coupled GPCRs): MOP (μ), KOP (κ), DOP (δ), NOP (ORL-1, nociceptin). Effects: ↓ adenylyl cyclase, opening of K⁺ channels (hyperpolarisation), closing of presynaptic Ca²⁺ channels (↓ release of glutamate and substance P).</li>
<li><b>Sites</b>: periaqueductal grey and rostral ventromedial medulla (descending inhibition), dorsal horn substantia gelatinosa (pre- and postsynaptic), peripheral nerves in inflamed tissue.</li>
<li><b>Effects</b>: analgesia, sedation, euphoria (μ) or dysphoria (κ), respiratory depression (μ: ↓ brainstem CO2 response, ↓ RR more than tidal volume), cough suppression, miosis (Edinger–Westphal), nausea (CTZ), constipation, biliary sphincter spasm, urinary retention, pruritus (especially neuraxial: μ, not histamine), bradycardia (vagal), muscle rigidity (chest wall, with large rapid boluses of fentanyl family), histamine release (morphine, pethidine), immunomodulation, hormonal changes (↓ testosterone, ↑ ADH).</li>
<li><b>Physicochemistry</b> determines onset: lipid solubility, unionised fraction (pKa vs 7.4), protein binding, Vd. Alfentanil is faster than fentanyl because ~90% is unionised and its small Vd keeps a high concentration gradient to the brain.</li>
<li><b>Naloxone</b>: competitive antagonist at all receptors (highest affinity for μ). 40–100 µg IV titrated (1–2 mg in arrest or overdose), t½ 1 h (shorter than most opioids: renarcotisation; consider infusion). Can precipitate withdrawal, pulmonary oedema and hypertension.</li></ul>`,
p:"Use the opioid comparison diagram: potency, unionised fraction, lipid solubility and protein binding side by side.",
v:"Classification, receptors and transduction, sites of action, effects by system, factors affecting onset, antagonists."},
{f:"an",t:"Individual opioids",b:`<ul class="clean"><li><b>Morphine</b>: pKa 8.0, 35% protein bound, low lipid solubility (slow onset, peak 15–20 min IV). Oral F ~30%. Glucuronidated (UGT2B7) to M3G (~70%, inactive at opioid receptors, neuroexcitatory) and M6G (~10%, more potent than morphine). Both accumulate in renal failure. Histamine release.</li>
<li><b>Diamorphine</b>: diacetylmorphine prodrug, very lipid-soluble, rapidly deacetylated to 6-monoacetylmorphine and morphine. Intrathecal and epidural use; intranasal in children.</li>
<li><b>Pethidine</b>: phenylpiperidine; anticholinergic, local anaesthetic action, treats shivering (κ). Norpethidine accumulates in renal failure (seizures). Serotonin syndrome with MAOIs. Now little used.</li>
<li><b>Fentanyl</b>: ~100× morphine; very lipid-soluble; large Vd (4 L/kg); CYP3A4; CSHT rises steeply. Routes: IV, transdermal, intranasal, buccal, neuraxial. Cardiostable; no histamine release.</li>
<li><b>Alfentanil</b>: 10–20× morphine; pKa 6.5 (~90% unionised); small Vd (0.6 L/kg); peak effect in ~1.5 min; CYP3A4 (erythromycin, fluconazole). Safe in renal failure.</li>
<li><b>Remifentanil</b>: ester linkage hydrolysed by non-specific tissue and red cell esterases (not butyrylcholinesterase) to an inactive acid. Clearance 40 mL/kg/min; CSHT 3–4 min regardless of duration. Hypotension and bradycardia; acute tolerance and opioid-induced hyperalgesia at high doses. Plan analgesia before stopping. Formulated with glycine (not for neuraxial use). PCA in labour.</li>
<li><b>Sufentanil</b>: ~1000× morphine; sublingual tablet systems.</li>
<li><b>Oxycodone</b>: oral F ~60–87%, ~1.5× oral morphine; CYP3A4 (and 2D6 to oxymorphone). <b>Codeine</b>: prodrug (CYP2D6 ~10% to morphine). <b>Tramadol</b>: weak μ agonist (O-desmethyltramadol via CYP2D6) plus serotonin and noradrenaline reuptake inhibition; lowers seizure threshold; serotonin syndrome.</li>
<li><b>Methadone</b>: long, variable t½ (15–60 h), NMDA antagonist, QT prolongation. <b>Buprenorphine</b>: high-affinity partial μ agonist, κ antagonist; ceiling on respiratory depression; difficult to reverse with naloxone. Current guidance: usually continue buprenorphine perioperatively and add analgesia.</li>
<li><b>Tapentadol</b>: μ agonist with noradrenaline reuptake inhibition.</li></ul>`,
p:"Typical exam questions: 'Remifentanil: everything including onset, duration, uses, CSHT'. Write remifentanil on its own card: ester, esterases, clearance 40 mL/kg/min, Vd 0.3 L/kg, CSHT 3–4 min.",
v:"Compare 4–5 opioids under physicochemistry, PK, metabolism and clinical niche."},
{f:"an",t:"Tolerance, hyperalgesia and the opioid-tolerant patient",b:`<ul class="clean"><li><b>Tolerance</b>: receptor phosphorylation (GRK), β-arrestin binding, internalisation, uncoupling, up-regulation of the cAMP pathway (withdrawal symptoms when the opioid stops), NMDA activation.</li>
<li><b>Opioid-induced hyperalgesia</b>: increased pain sensitivity from opioid exposure (spinal NMDA sensitisation, dynorphin, descending facilitation). Tolerance improves with more opioid; OIH worsens. Reduced by ketamine, magnesium, α2 agonists, opioid rotation.</li>
<li><b>Dependence</b>: physical (withdrawal: yawning, rhinorrhoea, mydriasis, piloerection, sweating, diarrhoea, tachycardia, anxiety) and psychological. Addiction is compulsive use despite harm.</li>
<li><b>Perioperative plan for the opioid-tolerant patient</b> (EDAIC 2023: 260 mg/day oxycodone for a hepatectomy):
<ul class="clean"><li>Pre-op: document all opioids and OME (260 mg oxycodone ≈ 390 mg oral morphine/day), involve the pain team, continue usual opioid (or its IV equivalent) to avoid withdrawal, continue buprenorphine and methadone, set expectations.</li>
<li>Intra-op: give the baseline requirement plus extra; multimodal analgesia (paracetamol, NSAID if appropriate (often not after hepatectomy), ketamine 0.5 mg/kg then 0.1–0.25 mg/kg/h, lidocaine infusion, magnesium, dexamethasone, α2 agonist); regional (epidural, wound catheters, ESP/TAP blocks; check coagulation before epidural with liver resection).</li>
<li>Post-op: PCA with background infusion equal to baseline, higher bolus doses; monitor sedation, not just pain scores; naloxone available; plan a taper back to baseline and communicate with the GP. Give opioid-tolerance alerts.</li></ul></li>
<li><b>Opioid stewardship</b>: avoid discharge with long-acting opioids for acute pain; limit supply; Faculty of Pain Medicine "Opioids Aware".</li></ul>`,
p:"Harm rises steeply above ~120 mg/day oral morphine equivalent with little extra benefit (Opioids Aware).",
v:"Mechanisms of tolerance and OIH, then a structured pre-, intra- and post-operative plan for an opioid-tolerant patient."},
{f:"an",t:"Non-opioid analgesics and adjuncts",b:`<ul class="clean"><li><b>Paracetamol</b>: central COX inhibition (in low-peroxide environments), serotonergic descending inhibition, metabolite AM404 acts on TRPV1 and cannabinoid CB1 receptors. 1 g 6-hourly (15 mg/kg if &lt; 50 kg or risk factors). Metabolised by glucuronidation and sulphation, with ~5–10% via CYP2E1/3A4 to NAPQI, which glutathione detoxifies. <b>Overdose</b>: glutathione depletion leads to NAPQI binding and centrilobular necrosis. Risk factors: malnutrition, enzyme induction, chronic alcohol. Treatment: acetylcysteine if level above the 100 mg/L treatment line at 4 h, or a staggered overdose (UK: 21-h regimen; many centres now use a 12-h SNAP regimen). King's College criteria for transplant (pH &lt; 7.3 after resuscitation, or INR &gt; 6.5 + creatinine &gt; 300 µmol/L + grade 3–4 encephalopathy).</li>
<li><b>NSAIDs</b>: inhibit COX-1 (constitutive: gastric mucosa, platelet thromboxane A2, renal blood flow) and COX-2 (inducible: inflammation; also constitutive in kidney and endothelium producing prostacyclin). Side effects: GI ulceration and bleeding, AKI (especially with hypovolaemia, ACEi and diuretics: the "triple whammy"), platelet dysfunction (aspirin irreversible), bronchospasm (aspirin-exacerbated respiratory disease ~10% of asthmatics), CV thrombosis (COX-2 selective, diclofenac), impaired bone healing (debated). COX-2 selective drugs (parecoxib, celecoxib, etoricoxib) have fewer GI and platelet effects.</li>
<li><b>Gabapentinoids</b>: bind the α2δ subunit of voltage-gated Ca²⁺ channels. Routine perioperative use is no longer recommended (sedation, respiratory depression with opioids, misuse; Class C controlled drugs in the UK since 2019).</li>
<li><b>Ketamine</b> (sub-anaesthetic), <b>IV lidocaine</b> (1–1.5 mg/kg then 1–2 mg/kg/h; return of bowel function after colorectal surgery; ALLEGRO trial showed no benefit on recovery; avoid with blocks), <b>magnesium</b> (NMDA block), <b>dexamethasone</b> (PADDI: safe for wound infection; antiemetic and analgesic), <b>α2 agonists</b>.</li>
<li><b>Multimodal and opioid-sparing analgesia</b> with regional techniques is the default (procedure-specific PROSPECT recommendations).</li></ul>`,
p:"Paracetamol toxicity and NSAIDs (COX-1/COX-2, mechanism, advantages and disadvantages) are both common exam questions.",
v:"Mechanism, metabolism, toxicity and treatment of paracetamol; COX physiology, NSAID side effects; then adjuncts with their evidence."},
{f:"la",t:"Local anaesthetics: structure and mechanism",b:`<ul class="clean"><li><b>Structure</b>: lipophilic aromatic ring + intermediate chain (<b>ester</b> –COO– or <b>amide</b> –NHCO–) + hydrophilic tertiary amine. Amides have two "i"s in the name (lidocaine, bupivacaine).</li>
<li><b>Esters</b> (cocaine, procaine, chloroprocaine, tetracaine): hydrolysed by plasma cholinesterase (except cocaine: partly hepatic). Short plasma t½; metabolite para-aminobenzoic acid causes allergy. <b>Amides</b>: hepatic metabolism (CYP1A2/3A4); allergy very rare (often a reaction to preservative or adrenaline).</li>
<li><b>Mechanism</b>: weak bases (pKa 7.6–9) given as acidic hydrochloride solutions. The unionised base crosses the axonal membrane; inside, the re-ionised cation blocks the voltage-gated Na⁺ channel (Nav1.x α subunit, domain IV S6) from the inside, preferring open and inactivated states (<b>use-dependent</b> or frequency-dependent block). Minor routes: membrane expansion, K⁺ and Ca²⁺ channels.</li>
<li><b>Differential block</b>: small myelinated fibres (Aδ, B) block before large ones; C fibres are relatively resistant per unit length. Typical order of loss: autonomic (B), then pain and temperature (Aδ, C), touch (Aβ), motor (Aα). Three consecutive nodes of Ranvier must be blocked.</li>
<li><b>Properties</b>:
<ul class="clean"><li><b>pKa → onset</b>: closer to 7.4 gives more unionised base and faster onset (lidocaine 7.9 faster than bupivacaine 8.1). Acidic infected tissue slows onset; bicarbonate speeds it.</li>
<li><b>Lipid solubility → potency</b> (bupivacaine ≫ lidocaine).</li>
<li><b>Protein binding → duration</b> (bupivacaine 95%, lidocaine 70%).</li>
<li>Intrinsic vasoactivity: most vasodilate at clinical concentrations (shorter action); cocaine vasoconstricts; ropivacaine and levobupivacaine vasoconstrict at low concentrations.</li></ul></li>
<li><b>Systemic absorption by site</b> (highest to lowest): intravenous > intercostal > caudal > epidural > brachial plexus > femoral/sciatic > subcutaneous. Adrenaline 1:200 000 (5 µg/mL) reduces absorption, prolongs block and marks intravascular injection.</li></ul>`,
p:"Typical exam questions: 'Comparison of bupivacaine and lignocaine: details of the effect of pKa on onset and protein binding on duration'.",
v:"Draw the structure, classify esters and amides, explain mechanism and use-dependence, then the three key properties with numbers."},
{f:"la",t:"Individual local anaesthetics: bupivacaine vs ropivacaine",b:`<div class="tbl"><table><tr><th></th><th>Lidocaine</th><th>Bupivacaine</th><th>Levobupivacaine</th><th>Ropivacaine</th></tr>
<tr><td>Isomer</td><td>Achiral</td><td>Racemic</td><td>S(−)</td><td>S(−) (propyl, not butyl)</td></tr>
<tr><td>pKa</td><td>7.9</td><td>8.1</td><td>8.1</td><td>8.1</td></tr>
<tr><td>Protein binding</td><td>70%</td><td>95%</td><td>&gt; 97%</td><td>94%</td></tr>
<tr><td>Relative potency</td><td>1 (lipid 2.9)</td><td>4 (lipid 28)</td><td>~4</td><td>~3 (lipid 2.9–14)</td></tr>
<tr><td>Max dose (mg/kg)</td><td>3 (7 with adr.)</td><td>2</td><td>2</td><td>3</td></tr>
<tr><td>Toxic plasma level (µg/mL)</td><td>&gt; 5</td><td>&gt; 1.5–2</td><td>&gt; 2.6</td><td>&gt; 4</td></tr>
<tr><td>Cardiotoxicity</td><td>Low</td><td>High</td><td>Lower</td><td>Lower</td></tr></table></div>
<ul class="clean"><li><b>Bupivacaine cardiotoxicity</b>: high lipid solubility and Na⁺ channel binding: "fast in, slow out" (dissociation ~10× slower than lidocaine), so channels stay blocked during diastole. Ventricular arrhythmias (re-entry, broad QRS) and myocardial depression (also mitochondrial and Ca²⁺ effects) are refractory to resuscitation. The R(+) enantiomer is more cardiotoxic, hence levobupivacaine and ropivacaine. CC:CNS dose ratio is lower for bupivacaine (~2) than lidocaine (~7), so cardiac collapse can occur with little CNS warning.</li>
<li><b>Ropivacaine</b>: lower lipid solubility gives more <b>sensory–motor separation</b> at low concentrations (labour, ambulatory blocks), slightly less potent and shorter than bupivacaine, less cardiotoxic, vasoconstrictor at low concentrations.</li>
<li><b>Prilocaine</b>: least toxic amide; o-toluidine metabolite causes methaemoglobinaemia (&gt; 600 mg); hyperbaric 2% for short spinals; IVRA (Bier's block) with plain prilocaine 0.5%. EMLA (lidocaine + prilocaine eutectic mixture).</li>
<li><b>Chloroprocaine</b>: ester, rapid hydrolysis (t½ ~20 s), short spinal (1%) for day surgery. <b>Tetracaine</b> (amethocaine) topical gel. <b>Cocaine</b>: topical nasal (blocks noradrenaline reuptake: vasoconstriction, sympathomimetic toxicity), max ~1.5–3 mg/kg.</li>
<li><b>Adjuncts</b>: adrenaline, dexamethasone (perineural or IV prolongs block), clonidine, dexmedetomidine, opioids (neuraxial), bicarbonate. Liposomal bupivacaine.</li></ul>`,
p:"'Compare ropivacaine to bupivacaine', 'Bupivacaine and the heart', 'Comparison between LAs in terms of toxicity'.",
v:"Table first (isomer, pKa, PB, potency, max dose, toxicity), then explain cardiotoxicity mechanism, then clinical choice."},
{f:"la",t:"Local anaesthetic systemic toxicity (LAST)",b:`<ul class="clean"><li><b>Causes</b>: intravascular injection (immediate), excess dose or absorption from vascular sites (delayed 10–60 min; continuous catheters, tumescent). Risk factors: extremes of age, low muscle mass, pregnancy, cardiac disease (conduction, low EF), hepatic failure, low α1-AGP, acidosis, hypoxia.</li>
<li><b>Features</b>: CNS (circumoral tingling, tinnitus, metallic taste, slurred speech, agitation, then seizures and coma: inhibitory pathways are blocked first), then CVS (hypertension and tachycardia, then bradycardia, conduction block, broad QRS, VT/VF, asystole). With bupivacaine, cardiovascular collapse may occur first or alone. Acidosis and hypercapnia worsen toxicity (ion trapping in cells, less protein binding).</li>
<li><b>Management</b> (AAGBI 2010, ASRA 2020 checklist): stop injecting, call for help, 100% O2 and ventilate (avoid hypercapnia and acidosis), secure IV access. Control seizures with a benzodiazepine (or small doses of propofol/thiopental if haemodynamically stable).</li>
<li><b>Lipid emulsion 20%</b>: bolus 1.5 mL/kg over 1 min; start infusion 15 mL/kg/h; repeat the bolus up to twice at 5-min intervals and double the infusion to 30 mL/kg/h if unstable; maximum cumulative dose 12 mL/kg. Mechanisms: "lipid sink", direct inotropy, fatty acid supply to the myocardium, scavenging.</li>
<li>Cardiac arrest: ALS with <b>reduced adrenaline doses (≤ 1 µg/kg)</b>, avoid vasopressin, calcium channel blockers, β-blockers and further LA (do not use lidocaine as an antiarrhythmic: use amiodarone). Prolonged CPR (&gt; 1 h may be needed); cardiopulmonary bypass or ECMO if available.</li>
<li>After recovery: monitor for ≥ 4–6 h (12 h after CVS involvement), check amylase/lipase (pancreatitis with lipid), report.</li></ul>`,
p:"Typical exam questions: 'Cardiovascular collapse after an epidural: causes (LAST, high spinal, anaphylaxis, vasovagal)'. Learn the lipid doses for a 70 kg adult: 100 mL bolus, 1000 mL/h, max 840 mL.",
v:"Causes and risk factors, presentation, management sequence with lipid doses, special points for cardiac arrest, prevention (ultrasound, aspiration, test dose, fractionation, dose limits)."},
];

/* ---------- Data for diagrams ---------- */
const AG={n2o:["N2O",0.47,1.1,1.2,2.3,"var(--nibp)",104],des:["Desflurane",0.42,1.3,2.0,27,"var(--spo2)",6.6],sevo:["Sevoflurane",0.65,1.7,3.1,48,"var(--etco2)",1.8],iso:["Isoflurane",1.4,1.6,2.9,45,"var(--abp)",1.17],hal:["Halothane",2.4,1.9,3.4,51,"var(--ecg)",0.75]};
function uptake(a,VA,Q,stop,T){const [nm,lb,kb,km,kf]=AG[a];const VL=2.5,tis=[[6,0.75,kb],[33,0.19,km],[14.5,0.06,kf]];let PA=0;const P=[0,0,0];const dt=0.01,out=[];
 for(let i=0,t=0;t<=T+1e-9;i++,t=i*dt){const PI=t<stop?1:0;const Pv=tis.reduce((s,[v,f],j)=>s+f*P[j],0);
  if(i%20===0)out.push([t,PA]);
  const dPA=(VA*(PI-PA)-Q*lb*(PA-Pv))/VL;tis.forEach(([v,f,k],j)=>{P[j]+=f*Q*(PA-P[j])/(v*k)*dt});PA+=dPA*dt}
 return out}
const MAC40={sevo:["Sevoflurane",1.80],des:["Desflurane",6.6],iso:["Isoflurane",1.17],hal:["Halothane",0.75],n2o:["N2O",104]};
const macAge=(m40,age)=>m40*Math.pow(10,-0.00269*(age-40));
const MO=[["Halothane",0.75,224],["Isoflurane",1.17,98],["Enflurane",1.68,98],["Sevoflurane",1.8,47],["Desflurane",6.6,18.7],["Xenon",71,1.9],["N2O",104,1.4]];
const OPI=[["Morphine",1,8.0,1.4,35],["Diamorphine",2,7.8,280,40],["Pethidine",0.1,8.5,39,60],["Fentanyl",100,8.4,813,83],["Alfentanil",15,6.5,128,90],["Remifentanil",100,7.1,18,70],["Sufentanil",1000,8.0,1778,93]];
const LAS=[["Lidocaine",7.9,70,"var(--spo2)"],["Prilocaine",7.9,55,"var(--nibp)"],["Ropivacaine",8.1,94,"var(--etco2)"],["Bupivacaine",8.1,95,"var(--abp)"],["Tetracaine",8.5,76,"var(--ecg)"],["Chloroprocaine",8.7,"–","var(--muted)"]];

const CALCS=[
 {t:"Age-adjusted MAC (Mapleson)",c:"etco2",in:[["Age (years)","a",70],["N2O inspired %","n",50],["Target total MAC","m",1]],
  f:(v,fmt)=>{const fac=Math.pow(10,-0.00269*(v.a-40)),nm=v.n/(104*fac),rem=Math.max(0,v.m-nm);return [["Age factor vs 40 yr",fmt(fac,2)],["MAC fraction from N2O",fmt(nm,2)],["Sevoflurane ET %",fmt(rem*1.8*fac,2)],["Desflurane ET %",fmt(rem*6.6*fac,2)],["Isoflurane ET %",fmt(rem*1.17*fac,2)],["MAC-awake (≈0.34 MAC) sevo %",fmt(0.34*1.8*fac,2)]]},
  n:"MAC = MAC40 × 10^(−0.00269 × (age − 40)); MAC40 sevoflurane 1.8, desflurane 6.6, isoflurane 1.17, N2O 104. Valid above 1 year."},
 {t:"Local anaesthetic maximum dose",c:"ecg",in:[["Weight kg (lean weight in obesity)","w",70],["Concentration %","c",0.5],["Adrenaline added (1/0)","ad",0]],
  f:(v,fmt)=>{const mgml=v.c*10;const D=[["Lidocaine",3,7],["Prilocaine",6,9],["Bupivacaine",2,2],["Levobupivacaine",2,2],["Ropivacaine",3,3]];return [["mg per mL",fmt(mgml,1)]].concat(D.map(([n,p,a])=>{const mg=(v.ad?a:p)*v.w;return [n,fmt(mg,0)+" mg = "+fmt(mg/mgml,0)+" mL"]}))},
  n:"1% = 10 mg/mL. Commonly quoted UK limits (mg/kg): lidocaine 3 (7 with adrenaline), prilocaine 6 (9), bupivacaine and levobupivacaine 2, ropivacaine 3. Reduce for vascular sites, elderly, cardiac or hepatic disease; doses are additive across agents."},
 {t:"Reversal: sugammadex and neostigmine",c:"abp",in:[["Weight kg","w",80],["Sugammadex mg/kg (2, 4 or 16)","d",4]],
  f:(v,fmt)=>{const mg=v.w*v.d;return [["Sugammadex dose mg",fmt(mg,0)],["Volume (100 mg/mL)",fmt(mg/100,1)+" mL"],["500 mg vials",fmt(Math.ceil(mg/500),0)],["Neostigmine 50 µg/kg (max 5 mg)",fmt(Math.min(5,v.w*0.05),2)+" mg"],["Glycopyrrolate 10 µg/kg",fmt(Math.min(1,v.w*0.01),2)+" mg"]]},
  n:"Sugammadex: 2 mg/kg at TOF count ≥ 2, 4 mg/kg at PTC 1–2, 16 mg/kg immediate reversal after rocuronium 1.2 mg/kg. Neostigmine only once TOF count is 4 (ceiling effect)."},
 {t:"Lipid emulsion for LAST (20%)",c:"ecg",in:[["Weight kg","w",70]],
  f:(v,fmt)=>[["Initial bolus (1.5 mL/kg over 1 min)",fmt(1.5*v.w,0)+" mL"],["Infusion 15 mL/kg/h",fmt(15*v.w,0)+" mL/h"],["Doubled infusion 30 mL/kg/h",fmt(30*v.w,0)+" mL/h"],["Repeat boluses (max 2, at 5 min)",fmt(1.5*v.w,0)+" mL each"],["Maximum cumulative 12 mL/kg",fmt(12*v.w,0)+" mL"]],
  n:"AAGBI 2010 regimen. ASRA 2020 uses 100 mL over 2–3 min if > 70 kg, then 0.25 mL/kg/min (same 12 mL/kg ceiling)."},
 {t:"Dantrolene for MH",c:"abp",in:[["Weight kg","w",80]],
  f:(v,fmt)=>{const mg=2.5*v.w;return [["Initial dose 2.5 mg/kg",fmt(mg,0)+" mg"],["20 mg vials",fmt(Math.ceil(mg/20),0)+" (each with 60 mL water)"],["Repeat 1 mg/kg",fmt(v.w,0)+" mg every 5 min as needed"],["10 mg/kg (consider other diagnoses beyond)",fmt(10*v.w,0)+" mg"]]},
  n:"AAGBI MH crisis guideline 2020/21. Ryanodex (250 mg in 5 mL) is a faster alternative where available."},
 {t:"Oral morphine equivalent (OME)",c:"nibp",in:[["Oral morphine mg/day","m",0],["Oral oxycodone mg/day","o",260],["Codeine mg/day","c",0],["Tramadol mg/day","t",0],["Fentanyl patch µg/h","f",0],["Buprenorphine patch µg/h","b",0]],
  f:(v,fmt)=>{const ome=v.m+1.5*v.o+0.1*v.c+0.1*v.t+2.4*v.f+2.4*v.b;return [["Total OME mg/day",fmt(ome,0),ome>=120?"warn":"ok"],["IV/SC morphine mg/day (÷2)",fmt(ome/2,0)],["IV morphine mg/h equivalent",fmt(ome/48,1)],["Opioid tolerant (≥ 60 mg/day)",ome>=60?"Yes":"No"]]},
  n:"Approximate factors (FPM Opioids Aware/BNF): oxycodone 1.5, codeine 0.1, tramadol 0.1 (some tables 0.15–0.2), transdermal fentanyl and buprenorphine µg/h × 2.4. Reduce by 25–50% when switching drugs (incomplete cross-tolerance)."},
 {t:"Volatile use and carbon footprint",c:"etco2",in:[["Fresh gas flow L/min","fgf",1],["MAC multiple","m",1],["Duration h","h",1]],
  f:(v,fmt)=>{const A=[["Sevoflurane",1.8,183,1.52,130],["Desflurane",6.6,210,1.47,2540],["Isoflurane",1.17,195,1.50,510]];return A.flatMap(([n,mac,vap,dens,gwp])=>{const ml=v.fgf*1000*60*v.h*mac*v.m/100/vap,kg=ml*dens/1000*gwp;return [[n+" liquid",fmt(ml,1)+" mL"],[n+" CO2e",fmt(kg,1)+" kg (≈ "+fmt(kg/0.17,0)+" km by car)"]]})},
  n:"Assumes all agent in the fresh gas is vented. Vapour per mL liquid (20 °C): sevoflurane 183, desflurane 210, isoflurane 195 mL. GWP100: sevoflurane 130, isoflurane 510, desflurane 2540. Car 0.17 kg CO2e/km."},
];

const TABLES=[
 ["Physical properties of inhaled agents",["Agent","MW","BP °C","SVP 20 °C kPa","B:G","O:G","MAC % (age 40)","Metabolised","GWP100"],[["Halothane","197","50.2","32.3","2.4","224","0.75","20%","50"],["Isoflurane","184.5","48.5","33.2","1.4","98","1.17","0.2%","510"],["Enflurane","184.5","56.5","23.3","1.8","98","1.68","2%","–"],["Sevoflurane","200","58.5","22.7","0.65","47–53","1.8–2.0","3–5%","130"],["Desflurane","168","22.8","89.2","0.42","18.7 (some UK texts 29)","6.6","0.02%","2540"],["Nitrous oxide","44","−88","5200 (cylinder)","0.47","1.4","104","0.004%","273"],["Xenon","131","−108","–","0.115–0.14","1.9","63–71","0","0"]]],
 ["IV induction agents and sedatives",["Agent","Induction dose","pKa","Protein binding","Vd L/kg","CL mL/kg/min","t½","Key features"],[["Propofol","1.5–2.5 mg/kg","11","98%","4","30–60","5–12 h","↓ BP, antiemetic, PRIS"],["Thiopental","3–5 mg/kg","7.6","80%","2.5","3.5","6–15 h","Porphyria CI, accumulates, intra-arterial injury"],["Ketamine","1–2 mg/kg IV; 5–10 IM","7.5","25%","3","17","2–3 h","Analgesia, ↑ HR/BP, bronchodilator, emergence phenomena"],["Etomidate","0.3 mg/kg","4.2","75%","3–4.5","10–20","1–4 h","Cardiostable, adrenal suppression, myoclonus"],["Midazolam","0.1–0.3 mg/kg","6.5","96%","1–1.5","6–8","2–4 h","Active metabolite, CYP3A4"],["Remimazolam","Sedation 2.5–7.5 mg","–","92%","~0.5","~15","~1 h","Ester, organ-independent, flumazenil-reversible"],["Dexmedetomidine","Infusion 0.2–1.4 µg/kg/h","–","94%","1.3","~10","2–3 h","Rousable sedation, bradycardia"]]],
 ["Neuromuscular blocking drugs",["Drug","Class","ED95 mg/kg","Intubating dose","Onset","Clinical duration","Elimination","Notes"],[["Suxamethonium","Depolarising","0.3","1–1.5 mg/kg","30–60 s","5–10 min","Plasma cholinesterase","Hyperkalaemia, MH, bradycardia"],["Rocuronium","Aminosteroid","0.3","0.6 (RSI 1.2)","60–90 s","30–40 min","Bile > urine","Sugammadex; anaphylaxis"],["Vecuronium","Aminosteroid","0.05","0.1","2–3 min","30–40 min","Liver (active metabolite)","No CVS effects"],["Pancuronium","Aminosteroid","0.06","0.1","3–5 min","60–90 min","Renal 80%","Tachycardia"],["Atracurium","Benzylisoquinolinium","0.2–0.25","0.5","2–3 min","30–40 min","Hofmann + ester hydrolysis","Histamine, laudanosine"],["Cisatracurium","Benzylisoquinolinium","0.05","0.15–0.2","3–5 min","45–60 min","Hofmann (77%)","No histamine; ICU"],["Mivacurium","Benzylisoquinolinium","0.08","0.15–0.2","2–3 min","15–20 min","Plasma cholinesterase","Histamine; prolonged in deficiency"]]],
 ["Opioids compared",["Drug","Potency vs IV morphine","pKa","Unionised at 7.4","Lipid solubility","Protein binding","t½","Notes"],[["Morphine","1","8.0","20%","1.4","35%","2–3 h","M6G/M3G, renal accumulation"],["Diamorphine","2","7.8","28%","280","40%","3 min (prodrug)","Neuraxial, intranasal"],["Pethidine","0.1","8.5","7%","39","60%","3–5 h","Norpethidine; MAOI"],["Fentanyl","100","8.4","9%","813","83%","3.5 h","CSHT rises"],["Alfentanil","10–20","6.5","89%","128","90%","1.6 h","Fast onset; CYP3A4"],["Remifentanil","~100","7.1","67%","18","70%","3–10 min","Esterases; CSHT 3–4 min"],["Sufentanil","1000","8.0","20%","1778","93%","2.5 h","Sublingual systems"],["Oxycodone","1.5 (oral)","8.5","7%","~1","45%","3–4.5 h","CYP3A4/2D6"],["Methadone","Variable","8.9","3%","116","90%","15–60 h","NMDA, QT"],["Buprenorphine","25–50","8.5","7%","High","96%","20–37 h","Partial agonist, high affinity"]]],
 ["Opioid receptors",["Receptor","Endogenous ligand","Agonist effects"],[["MOP (μ)","β-endorphin, endomorphins","Supraspinal and spinal analgesia, respiratory depression, euphoria, miosis, constipation, pruritus, dependence"],["KOP (κ)","Dynorphin","Spinal analgesia, sedation, dysphoria, diuresis (↓ ADH), miosis"],["DOP (δ)","Enkephalins","Spinal analgesia, modulates μ, respiratory depression (minor)"],["NOP (ORL-1)","Nociceptin/orphanin FQ","Anti-opioid supraspinally, analgesia spinally; not reversed by naloxone"]]],
 ["Local anaesthetics",["Agent","Type","pKa","Protein binding","Onset","Duration","Max dose mg/kg (plain/adr.)","Notes"],[["Lidocaine","Amide","7.9","70%","Fast","Medium","3 / 7","Antiarrhythmic IB, IV analgesia"],["Prilocaine","Amide","7.9","55%","Fast","Medium","6 / 9","MetHb; IVRA; spinal"],["Bupivacaine","Amide (racemic)","8.1","95%","Slow","Long","2 / 2","Cardiotoxic"],["Levobupivacaine","Amide S(−)","8.1","97%","Slow","Long","2 / 2","Less cardiotoxic"],["Ropivacaine","Amide S(−)","8.1","94%","Slow","Long","3 / 3","Sensory–motor separation"],["Chloroprocaine","Ester","8.7–9.1","Low","Fast","Short","11 / 14","Short spinal"],["Tetracaine","Ester","8.5","76%","Slow","Long","Topical","Ametop gel"],["Cocaine","Ester","8.6","92%","Fast","Medium","1.5–3 topical","Vasoconstrictor, sympathomimetic"]]],
 ["Reversal agents and antidotes",["Agent","Reverses","Mechanism","Dose","Caveat"],[["Neostigmine","Non-depolarising NMB (shallow)","AChE inhibition","50 µg/kg (max 5 mg) + glycopyrrolate","Ceiling effect; muscarinic effects"],["Sugammadex","Rocuronium, vecuronium","Encapsulation 1:1","2 / 4 / 16 mg/kg","Anaphylaxis; contraception; renal"],["Naloxone","Opioids","Competitive antagonist","40–100 µg titrated","Short t½; withdrawal"],["Flumazenil","Benzodiazepines","Competitive antagonist","200 µg then 100 µg","Seizures; short t½"],["Dantrolene","MH","RyR1 antagonist","2.5 mg/kg then 1 mg/kg","Large volume, slow reconstitution"],["Lipid emulsion 20%","LA toxicity","Lipid sink, inotropy","1.5 mL/kg, 15 mL/kg/h","Max 12 mL/kg"],["Physostigmine","Central anticholinergic syndrome","Tertiary AChE inhibitor","0.5–2 mg slowly","Not in TCA toxicity"],["Acetylcysteine","Paracetamol","Glutathione precursor","21 h or 12 h SNAP regimen","Anaphylactoid reactions"]]],
];

const CARDS=[
 ["iv","Propofol pKa and formulation?","pKa 11 (weak acid); 1% or 2% in 10% soybean oil, egg lecithin, glycerol."],
 ["iv","Propofol induction dose and Vd?","1.5–2.5 mg/kg; Vd ~4 L/kg."],
 ["iv","Main route of propofol metabolism?","Glucuronidation (plus CYP2B6 hydroxylation then conjugation)."],
 ["iv","Evidence for extrahepatic propofol metabolism?","Clearance (~2 L/min) exceeds hepatic blood flow."],
 ["iv","Propofol infusion syndrome threshold?","> 4 mg/kg/h for > 48 h."],
 ["iv","Features of PRIS?","Metabolic acidosis, rhabdomyolysis, hyperkalaemia, lipaemia, arrhythmias, cardiac failure, AKI."],
 ["iv","Calories in 1% propofol?","~1.1 kcal/mL."],
 ["iv","Thiopental pKa and % unionised at 7.4?","7.6; ~61% unionised."],
 ["iv","Why is thiopental unsuitable for infusion?","Low clearance, fat depot, saturable metabolism: very long CSHT."],
 ["iv","Absolute contraindication to thiopental?","Acute porphyria."],
 ["iv","Ketamine mechanism?","Non-competitive NMDA antagonist (phencyclidine site)."],
 ["iv","Ketamine IV and IM induction doses?","1–2 mg/kg IV; 5–10 mg/kg IM."],
 ["iv","Active metabolite of ketamine?","Norketamine."],
 ["iv","Which ketamine enantiomer is more potent?","S(+) (esketamine), ~2×."],
 ["iv","Etomidate adrenal mechanism?","Reversible 11β-hydroxylase inhibition."],
 ["iv","Etomidate dose?","0.3 mg/kg."],
 ["iv","Most cardiostable induction agent?","Etomidate."],
 ["iv","Remimazolam metabolism?","Tissue carboxylesterase-1 to inactive metabolite."],
 ["iv","Benzodiazepine vs barbiturate effect on GABA_A?","Benzodiazepines ↑ frequency; barbiturates ↑ duration of opening."],
 ["iv","Midazolam pKa and why it is lipid-soluble in blood?","6.5; ring closes at physiological pH."],
 ["iv","Flumazenil dose and pitfall?","200 µg then 100 µg; short t½ (resedation), seizures."],
 ["iv","Dexmedetomidine α2:α1 selectivity?","1620:1 (clonidine 200:1)."],
 ["iv","Dexmedetomidine infusion range in ICU?","0.2–1.4 µg/kg/h."],
 ["iv","Why may dexmedetomidine bolus cause hypertension?","Peripheral α2B vasoconstriction."],
 ["inh","Define MAC.","Alveolar concentration at steady state, 1 atm, preventing movement to skin incision in 50%."],
 ["inh","MAC-awake as a fraction of MAC?","~0.3–0.4."],
 ["inh","MAC change with age?","~6% fall per decade after 1 year (peak at 6 months)."],
 ["inh","Two factors that increase MAC?","Hyperthermia, chronic alcohol, infancy, hypernatraemia, amphetamines, red hair."],
 ["inh","Two factors with no effect on MAC?","Duration of anaesthesia, sex, K⁺, hypertension."],
 ["inh","Blood:gas coefficients in order?","Xenon 0.14, des 0.42, N2O 0.47, sevo 0.65, iso 1.4, halothane 2.4."],
 ["inh","What does the oil:gas coefficient predict?","Potency (inversely related to MAC)."],
 ["inh","Effect of low cardiac output on inhalational induction?","Faster rise of FA/FI (most for soluble agents)."],
 ["inh","Define the second gas effect.","Rapid N2O uptake concentrates and increases uptake of a companion gas."],
 ["inh","Desflurane SVP and boiling point?","89 kPa; 22.8 °C."],
 ["inh","How does the Tec 6 vaporiser work?","Heats desflurane to 39 °C at ~2 atm; injects vapour into the fresh gas."],
 ["inh","Desflurane MAC?","6.6%."],
 ["inh","Sevoflurane metabolism?","3–5% via CYP2E1 (fluoride, HFIP)."],
 ["inh","What is compound A?","Vinyl ether from sevoflurane and strong-base absorbents; nephrotoxic in rats."],
 ["inh","Halothane hepatitis type II mechanism?","Immune reaction to trifluoroacetylated proteins (oxidative metabolism)."],
 ["inh","Halothane MAC and metabolism?","0.75%; 20%."],
 ["inh","Global warming potential of desflurane?","~2540 (sevoflurane 130)."],
 ["inh","EU status of desflurane from 2026?","Banned unless medically necessary (F-gas Regulation)."],
 ["inh","N2O mechanism of toxicity?","Oxidises vitamin B12 cobalt, inactivating methionine synthase."],
 ["inh","N2O critical temperature?","36.5 °C."],
 ["inh","Why does N2O expand air spaces?","34× more soluble than N2: enters faster than N2 leaves."],
 ["inh","Xenon MAC and B:G?","~63–71%; 0.115–0.14."],
 ["inh","Volatile effect on CBF at > 1 MAC?","↑ CBF with ↓ CMRO2 (uncoupling)."],
 ["nmb","Fetal vs adult nicotinic receptor subunit?","γ (fetal) replaces ε (adult)."],
 ["nmb","Receptor occupancy before twitch falls?","~70–75%."],
 ["nmb","Cause of fade?","Prejunctional nicotinic receptor block."],
 ["nmb","Suxamethonium dose and onset?","1–1.5 mg/kg; 30–60 s."],
 ["nmb","Suxamethonium metabolism?","Plasma cholinesterase → succinylmonocholine → succinate + choline."],
 ["nmb","Phase I block characteristics?","No fade, no post-tetanic potentiation, potentiated by anticholinesterases."],
 ["nmb","Normal K⁺ rise with suxamethonium?","~0.5 mmol/L."],
 ["nmb","When does burn-related suxamethonium hyperkalaemia risk start?","After ~24–48 h."],
 ["nmb","Rocuronium RSI dose?","1–1.2 mg/kg."],
 ["nmb","Why does rocuronium have a fast onset?","Low potency means many molecules (Bowman principle)."],
 ["nmb","Atracurium elimination?","Hofmann degradation + ester hydrolysis."],
 ["nmb","Laudanosine concern?","CNS excitation (seizures) at very high levels."],
 ["nmb","Cisatracurium advantage?","No histamine release, less laudanosine."],
 ["nmb","Neostigmine dose?","50 µg/kg (max 5 mg) with glycopyrrolate 10 µg/kg."],
 ["nmb","Ceiling effect of neostigmine?","Once AChE fully inhibited, more drug cannot reverse deeper block."],
 ["nmb","Sugammadex doses?","2 mg/kg (TOFC ≥ 2), 4 mg/kg (PTC 1–2), 16 mg/kg (immediate)."],
 ["nmb","Sugammadex and contraception?","Count as a missed pill; extra contraception 7 days."],
 ["nmb","TOF ratio for safe extubation?","≥ 0.9 (quantitative)."],
 ["nmb","Atropine vs glycopyrrolate?","Atropine tertiary (CNS); glycopyrrolate quaternary (no CNS)."],
 ["nmb","Antidote for central anticholinergic syndrome?","Physostigmine."],
 ["nmb","Treatment of organophosphate poisoning?","Atropine, pralidoxime, benzodiazepines, airway support."],
 ["an","Opioid receptor transduction?","Gi/o: ↓ cAMP, K⁺ efflux, ↓ Ca²⁺ entry."],
 ["an","Which morphine metabolite is analgesic?","M6G."],
 ["an","Why is alfentanil faster than fentanyl?","pKa 6.5: ~90% unionised; small Vd."],
 ["an","Remifentanil metabolism?","Non-specific tissue/RBC esterases (not plasma cholinesterase)."],
 ["an","Remifentanil CSHT?","3–4 min, independent of duration."],
 ["an","Remifentanil clearance?","~40 mL/kg/min."],
 ["an","Fentanyl potency relative to morphine?","~100×."],
 ["an","Codeine activation enzyme?","CYP2D6."],
 ["an","Tramadol mechanisms?","Weak μ agonist (via M1) plus serotonin/noradrenaline reuptake inhibition."],
 ["an","Pethidine metabolite toxicity?","Norpethidine: seizures (renal failure)."],
 ["an","Buprenorphine pharmacology?","High-affinity partial μ agonist, κ antagonist."],
 ["an","Naloxone half-life?","~1 h."],
 ["an","Define opioid-induced hyperalgesia.","Paradoxical pain sensitisation from opioid exposure."],
 ["an","260 mg/day oral oxycodone in OME?","~390 mg oral morphine/day."],
 ["an","NAPQI is detoxified by?","Glutathione."],
 ["an","Paracetamol overdose treatment line at 4 h (UK)?","100 mg/L."],
 ["an","COX-1 vs COX-2?","COX-1 constitutive (gut, platelets, kidney); COX-2 inducible (inflammation)."],
 ["an","Gabapentinoid binding site?","α2δ subunit of voltage-gated Ca²⁺ channels."],
 ["an","IV lidocaine infusion dose?","1–1.5 mg/kg bolus then 1–2 mg/kg/h."],
 ["la","Ester vs amide metabolism?","Esters: plasma cholinesterase. Amides: hepatic."],
 ["la","Site of LA action?","Inner aspect of voltage-gated Na⁺ channel (domain IV S6)."],
 ["la","What is use-dependent block?","Greater block of open and inactivated channels (frequently firing nerves)."],
 ["la","pKa determines?","Onset."],
 ["la","Protein binding determines?","Duration."],
 ["la","Lipid solubility determines?","Potency."],
 ["la","pKa of lidocaine and bupivacaine?","7.9 and 8.1."],
 ["la","Max dose lidocaine with adrenaline?","7 mg/kg."],
 ["la","Max dose bupivacaine?","2 mg/kg."],
 ["la","Ropivacaine max dose?","3 mg/kg."],
 ["la","Why is bupivacaine cardiotoxic?","Fast in, slow out Na⁺ channel binding; persists through diastole."],
 ["la","Why does ropivacaine give sensory–motor separation?","Lower lipid solubility; slower penetration of large motor fibres."],
 ["la","Prilocaine toxicity?","Methaemoglobinaemia (o-toluidine)."],
 ["la","Order of systemic LA absorption by site?","IV > intercostal > caudal > epidural > brachial > femoral/sciatic > SC."],
 ["la","Lipid emulsion bolus?","1.5 mL/kg 20% over 1 min."],
 ["la","Lipid emulsion infusion and max?","15 mL/kg/h (double to 30); max 12 mL/kg."],
 ["la","Adrenaline dose in LAST arrest?","≤ 1 µg/kg."],
 ["la","Drugs to avoid in LAST arrest?","Vasopressin, CCBs, β-blockers, further LA."],
];

const FCF={all:"All",iv:"IV & sedatives",inh:"Inhaled",nmb:"NMJ & reversal",an:"Analgesics",la:"Local anaesthetics"};

const VIVA=[
 {st:"SOE 2 · Pharmacology",q:"Compare the pharmacokinetic and pharmacodynamic properties of the IV induction agents.",a:["Classification and ideal agent.","Table: dose, pKa, protein binding, Vd, clearance, t½, metabolism.","Mechanisms: GABA_A (propofol, thiopental, etomidate), NMDA (ketamine).","Systems: CVS (ketamine ↑, etomidate stable, propofol ↓↓), RS, CNS, airway reflexes.","Specific side effects: PRIS, porphyria, adrenal suppression, emergence phenomena."],fu:"Which agent would you choose for a shocked trauma patient, and why?"},
 {st:"SOE 2 · Pharmacology",q:"Difference between propofol and thiopental. Why is thiopental not good for continuous infusion?",a:["Chemistry and presentation.","pKa, ionisation, protein binding.","Vd, clearance, metabolism (glucuronidation vs oxidation).","Recovery, CSHT, accumulation.","Airway, CVS, porphyria, intra-arterial injection."],fu:"How would you manage an accidental intra-arterial thiopental injection?"},
 {st:"SOE 2 · Pharmacology",q:"Tell me about ketamine.",a:["Structure, isomers, presentation.","Mechanism (NMDA and others).","Doses by route and purpose.","Effects by system and dissociative state.","Uses and contraindications; emergence phenomena."],fu:"Is ketamine safe in traumatic brain injury?"},
 {st:"SOE 2 · Pharmacology",q:"What is MAC? What factors affect it and how can you speed up inhalational induction?",a:["Definition and conditions.","MAC variants and additivity.","Factors increasing, decreasing, no effect.","Uptake factors: FI, VA, B:G, CO, A–v difference, concentration and second gas effect.","Practical: overpressure, high FGF, sevoflurane, N2O, children."],fu:"Why does low cardiac output speed induction?"},
 {st:"SOE 2 · Pharmacology",q:"Desflurane: tell me all about it, including SVP and coefficients. Compare with sevoflurane.",a:["Structure, BP 22.8 °C, SVP 89 kPa, Tec 6 vaporiser.","B:G 0.42, O:G 18.7, MAC 6.6.","Effects: airway irritation, sympathetic surge, fast emergence.","Metabolism 0.02%; CO with dry absorbent.","Environment: GWP 2540, EU ban 2026; compare with sevoflurane."],fu:"Which is more potent: sevoflurane or desflurane?"},
 {st:"SOE 2 · Pharmacology",q:"Nitrous oxide: talk about everything, including mechanism of analgesia and neurotoxicity.",a:["Manufacture, storage, critical temperature, Entonox.","Physical properties.","Mechanism: NMDA, endogenous opioids, descending noradrenergic.","Effects and gas spaces.","B12 inactivation, SACD, megaloblastic anaemia; environment."],fu:"What is diffusion hypoxia?"},
 {st:"SOE 2 · Pharmacology",q:"Neuromuscular blockers, their antidotes, sugammadex, neostigmine and the ceiling effect.",a:["NMJ physiology and receptor.","Depolarising vs non-depolarising; classes and examples.","Monitoring: TOF, PTC, quantitative TOFR ≥ 0.9.","Neostigmine: mechanism, dose, ceiling effect, anticholinergic.","Sugammadex: encapsulation, doses, cautions."],fu:"How would you reverse a cisatracurium block at TOF count 1?"},
 {st:"SOE 2 · Pharmacology",q:"Compare bupivacaine and ropivacaine. How does bupivacaine affect the heart?",a:["Structure and isomerism.","pKa, protein binding, lipid solubility, potency.","Maximum doses and toxic levels.","Cardiotoxicity mechanism (fast in, slow out; R enantiomer).","Clinical choice: sensory–motor separation."],fu:"Why does acidosis worsen LA toxicity?"},
 {st:"SOE 3 · Critical incident",q:"Cardiovascular collapse after an epidural top-up. Causes and management of LAST.",a:["Differential: LAST, high block, anaphylaxis, vasovagal, haemorrhage, aortocaval compression.","Recognise CNS and CVS features.","Immediate management, airway and seizures.","Lipid emulsion doses.","Modified ALS, ECMO, follow-up and reporting."],fu:"What is the maximum cumulative lipid dose for a 70 kg patient?"},
 {st:"SOE 2 · Pharmacology",q:"Opioids: receptors, effects, and tolerance. Which would you use for a patient on 260 mg/day oxycodone having hepatectomy?",a:["Receptors, transduction, sites.","Effects by system.","Tolerance and OIH mechanisms.","OME calculation and baseline replacement.","Multimodal and regional plan, monitoring and discharge."],fu:"How would you manage a patient on buprenorphine?"},
 {st:"SOE 2 · Pharmacology",q:"Remifentanil: everything including onset, duration, uses and CSHT.",a:["Structure (ester), presentation with glycine.","PK: esterases, clearance, Vd, CSHT.","PD: potency, hypotension, bradycardia, rigidity.","Uses: TIVA, awake fibreoptic, labour PCA, neurosurgery, day case.","Problems: OIH, no residual analgesia, errors with dilution."],fu:"Why is it not used intrathecally?"},
 {st:"SOE 2 · Pharmacology",q:"Dexmedetomidine and clonidine: compare them. What is the use of dexmedetomidine in ICU and anaesthesia?",a:["Receptor selectivity and mechanism.","PK comparison.","Effects: sedation, analgesia, sympatholysis.","ICU sedation evidence and delirium.","Anaesthetic uses and side effects."],fu:"Why do patients on dexmedetomidine remain rousable?"},
 {st:"SOE 2 · Pharmacology",q:"NSAIDs and paracetamol: mechanisms, advantages, disadvantages and paracetamol toxicity.",a:["COX-1 and COX-2 physiology.","NSAID side effects and contraindications.","Paracetamol mechanism and metabolism.","Toxicity mechanism, nomogram, NAC.","Liver transplant criteria."],fu:"Why are alcoholics and malnourished patients at higher risk from paracetamol?"},
];

const QUIZ=[
 ["Propofol",[["Has a pKa of 11",1,""],["Is metabolised mainly by oxidation",0,"Mainly glucuronidation."],["Is safe in acute porphyria",1,""],["Clearance exceeds hepatic blood flow",1,""],["Contains Cremophor EL",0,"Soybean oil emulsion; Cremophor was the original vehicle (1977)."]]],
 ["Thiopental",[["Is a weak acid with pKa 7.6",1,""],["Solution is acidic",0,"pH 10.5–11."],["Is cumulative on infusion",1,""],["Has an active metabolite",1,"Pentobarbital."],["Is safe in porphyria",0,"Contraindicated."]]],
 ["Ketamine",[["Is an NMDA antagonist",1,""],["Causes bronchoconstriction",0,"Bronchodilator."],["Norketamine is active",1,""],["Reduces salivation",0,"Increases secretions."],["S(+) enantiomer is more potent",1,""]]],
 ["Etomidate",[["Inhibits 11β-hydroxylase",1,""],["Causes marked hypotension",0,"Cardiostable."],["Causes myoclonus",1,""],["Is suitable for ICU sedation infusion",0,"Adrenal suppression, increased mortality."],["Dose is 0.3 mg/kg",1,""]]],
 ["MAC",[["Is reduced by pregnancy",1,""],["Is increased by hypothermia",0,"Decreased."],["Is unaffected by duration of anaesthesia",1,""],["Is additive between agents",1,""],["Is higher in the elderly",0,"Lower."]]],
 ["Inhalational uptake",[["Low B:G coefficient speeds induction",1,""],["High cardiac output speeds induction",0,"Slows."],["Increased ventilation speeds induction",1,""],["N2O shows a concentration effect",1,""],["Left-to-right shunt markedly slows inhalational induction",0,"Little effect; right-to-left slows."]]],
 ["Desflurane",[["Boils at about 23 °C",1,""],["Is suitable for gas induction",0,"Airway irritant."],["Has the lowest B:G of the volatiles",1,"0.42."],["Is extensively metabolised",0,"0.02%."],["Has a higher GWP than sevoflurane",1,""]]],
 ["Nitrous oxide",[["Inactivates methionine synthase",1,""],["Has a critical temperature of 36.5 °C",1,""],["Reduces pulmonary vascular resistance",0,"Increases."],["Expands a pneumothorax",1,""],["MAC is 50%",0,"104%."]]],
 ["Suxamethonium",[["Causes fade on TOF in phase I block",0,"No fade in phase I."],["Is metabolised by plasma cholinesterase",1,""],["Raises K⁺ by ~0.5 mmol/L normally",1,""],["Is safe in the first hours after a burn",1,"Risk from ~24–48 h."],["Causes bradycardia with repeat doses",1,""]]],
 ["Non-depolarising NMBs",[["Atracurium undergoes Hofmann degradation",1,""],["Cisatracurium releases more histamine than atracurium",0,"Less."],["Pancuronium causes tachycardia",1,""],["Rocuronium is reversed by sugammadex",1,""],["Mivacurium is prolonged by cholinesterase deficiency",1,""]]],
 ["Reversal",[["Neostigmine reverses deep block",0,"Ceiling effect."],["Sugammadex reverses cisatracurium",0,"Aminosteroids only."],["Sugammadex 16 mg/kg is for immediate reversal",1,""],["Glycopyrrolate does not cross the BBB",1,""],["Physostigmine crosses the BBB",1,""]]],
 ["Opioids",[["Remifentanil is hydrolysed by plasma cholinesterase",0,"Non-specific esterases."],["Alfentanil is mostly unionised at pH 7.4",1,""],["M6G accumulates in renal failure",1,""],["Buprenorphine is a partial μ agonist",1,""],["Naloxone outlasts morphine",0,"Shorter t½."]]],
 ["Local anaesthetics",[["Lower pKa gives faster onset",1,""],["Esters are metabolised in the liver",0,"Plasma cholinesterase (cocaine partly hepatic)."],["Bupivacaine is more protein bound than lidocaine",1,""],["Ropivacaine is a racemic mixture",0,"S enantiomer."],["Prilocaine can cause methaemoglobinaemia",1,""]]],
 ["LAST",[["Lipid bolus is 1.5 mL/kg 20%",1,""],["Lidocaine is used for arrhythmias",0,"Avoid; use amiodarone."],["Adrenaline doses are reduced (≤ 1 µg/kg)",1,""],["Hypercapnia worsens toxicity",1,""],["Maximum lipid dose 12 mL/kg",1,""]]],
];

const CRISIS=[
 ["Local anaesthetic systemic toxicity","ecg",["Stop injecting; call for help; 100% O2; airway, ventilate (avoid hypercapnia).","Seizures: midazolam or small propofol doses; avoid propofol if unstable.","Lipid 20%: 1.5 mL/kg over 1 min, infusion 15 mL/kg/h; up to 2 repeat boluses at 5 min; double infusion; max 12 mL/kg.","Arrest: CPR with adrenaline ≤ 1 µg/kg; amiodarone for VT/VF; no lidocaine, vasopressin, CCB or β-blockers. Prolonged CPR; ECMO/bypass.","After: monitor ≥ 4–6 h (12 h if CVS), check amylase, report (NRLS/LIPID registry)."],"Na⁺ channel block in brain then heart; bupivacaine binds 'fast in, slow out'."],
 ["Malignant hyperthermia","abp",["Recognise: unexplained ↑ EtCO2, tachycardia, rigidity (masseter), hyperthermia (late), acidosis, hyperkalaemia.","Stop volatiles; call for help and the MH kit; hyperventilate with 100% O2 at high flow; insert activated charcoal filters; switch to TIVA.","Dantrolene 2.5 mg/kg IV, then 1 mg/kg every 5 min until stable (up to 10 mg/kg).","Treat hyperkalaemia, arrhythmias (avoid CCBs), cool actively (stop at 38.5 °C), arterial line, urine output > 2 mL/kg/h (myoglobinuria).","ICU, CK and myoglobin, recrudescence risk 24 h; refer patient and family for IVCT testing."],"RyR1 (or CACNA1S) mutation causes uncontrolled sarcoplasmic Ca²⁺ release with triggering agents."],
 ["Suxamethonium hyperkalaemic arrest","nibp",["Suspect after suxamethonium in burns > 24 h, denervation, immobility, myopathy (boys with undiagnosed Duchenne).","Peaked T waves, broad QRS, VF or asystole.","CPR; calcium chloride 10% 10 mL IV; insulin–glucose; salbutamol; bicarbonate if acidotic.","Consider dantrolene if MH possible; prolonged resuscitation; ECMO.","Check CK and K⁺; refer for neuromuscular investigation."],"Up-regulated extrajunctional receptors release K⁺ throughout the muscle membrane."],
 ["Residual neuromuscular block in recovery","abp",["Weak patient: poor head lift, hypoxia, see-saw breathing, anxiety, difficulty swallowing.","Support airway and oxygenation; reassure (patient may be aware).","Measure TOF ratio quantitatively.","Rocuronium/vecuronium: sugammadex 2–4 mg/kg by depth. Benzylisoquinolinium: neostigmine if TOF count 4, else ventilate and sedate until recovery.","Exclude other causes: opioids, residual volatile, hypothermia, magnesium, aminoglycosides, electrolytes, cholinesterase deficiency."],"TOFR < 0.9 impairs pharyngeal function and the hypoxic ventilatory response."],
 ["Central anticholinergic syndrome","etco2",["Confusion, agitation, hallucinations or somnolence after anticholinergics (hyoscine, atropine, antihistamines).","Peripheral signs: tachycardia, dry flushed skin, mydriasis, hyperthermia, urinary retention.","Supportive care; exclude hypoxia, hypoglycaemia, emergence delirium, serotonin syndrome.","Physostigmine 0.5–2 mg IV slowly (monitor for bradycardia, bronchospasm); avoid with TCA overdose.","Benzodiazepines for agitation; cooling."],"Central muscarinic blockade by tertiary amines that cross the BBB."],
 ["Opioid chest wall rigidity / severe respiratory depression","spo2",["Rigidity after a rapid large bolus of fentanyl, alfentanil or remifentanil: cannot ventilate, high airway pressure, falling SpO2.","Call for help; give NMB (e.g. suxamethonium or rocuronium) and ventilate; intubate if needed.","Respiratory depression post-op: stimulate, O2, bag–mask, naloxone 40–100 µg increments.","Long-acting opioids: naloxone infusion (2/3 of the effective bolus per hour).","Review drugs, renal function, sedatives; monitor in HDU."],"μ-receptor-mediated muscle tone increase (supraspinal) and brainstem respiratory depression."],
 ["Paracetamol overdose","nibp",["History: time and amount, staggered or not, risk factors.","Level at ≥ 4 h; treat above the 100 mg/L line, if staggered or uncertain timing, or if > 150 mg/kg ingested with delayed presentation.","Acetylcysteine (21-h three-bag or 12-h SNAP regimen); anaphylactoid reactions: pause, antihistamine, restart.","Monitor INR, creatinine, ALT, pH, lactate, glucose, phosphate.","King's College criteria: refer to a liver unit (pH < 7.3, or INR > 6.5 + creatinine > 300 + encephalopathy grade 3–4)."],"Glutathione depletion lets NAPQI cause centrilobular necrosis."],
];

const SRC="";
const ERR="";
const REFS="";

const DIAG=`<div class="grid2">
 <div class="fig" style="grid-column:1/-1"><h3>Inhaled agent uptake and washout (FA/FI)</h3>
  <div class="ctl"><label>Alveolar ventilation L/min <input type="range" id="up-va" min="1" max="12" step="0.5" value="4"><output id="up-va-o"></output></label>
   <label>Cardiac output L/min <input type="range" id="up-q" min="1.5" max="12" step="0.5" value="5"><output id="up-q-o"></output></label>
   <label>Turn agent off at min <input type="range" id="up-s" min="5" max="60" step="5" value="30"><output id="up-s-o"></output></label></div>
  <div class="svgbox"><svg id="up" viewBox="0 0 900 340" role="img" aria-label="Uptake curves"></svg></div>
  <div class="readout" id="up-r"></div></div>

 <div class="fig"><h3>MAC and age</h3>
  <div class="seg" id="ma-sel"></div>
  <div class="ctl"><label>Age <input type="range" id="ma-a" min="1" max="95" step="1" value="70"><output id="ma-a-o"></output></label>
   <label>N2O % <input type="range" id="ma-n" min="0" max="70" step="5" value="0"><output id="ma-n-o"></output></label></div>
  <div class="svgbox"><svg id="ma" viewBox="0 0 520 300" role="img" aria-label="MAC versus age"></svg></div>
  <div class="readout" id="ma-r"></div></div>

 <div class="fig"><h3>Meyer–Overton: potency vs lipid solubility</h3>
  <div class="seg" id="mo-sel"></div>
  <div class="svgbox"><svg id="mo" viewBox="0 0 520 300" role="img" aria-label="Meyer Overton"></svg></div>
  <div class="readout" id="mo-r"></div></div>

 <div class="fig" style="grid-column:1/-1"><h3>Neuromuscular monitor: TOF, tetanus, post-tetanic count</h3>
  <div class="ctl"><div class="seg" id="nm-type"></div><div class="seg" id="nm-drug"></div></div>
  <div class="ctl"><label>Receptor occupancy % <input type="range" id="nm-o" min="0" max="100" step="1" value="85"><output id="nm-o-o"></output></label></div>
  <div class="svgbox"><svg id="nm" viewBox="0 0 900 230" role="img" aria-label="Nerve stimulator"></svg></div>
  <div class="readout" id="nm-r"></div></div>

 <div class="fig"><h3>Local anaesthetics: tissue pH and onset</h3>
  <div class="ctl"><label>Tissue pH <input type="range" id="la-p" min="6.4" max="7.8" step="0.05" value="7.4"><output id="la-p-o"></output></label></div>
  <div class="svgbox"><svg id="la" viewBox="0 0 520 300" role="img" aria-label="Local anaesthetic ionisation"></svg></div>
  <div class="readout" id="la-r"></div></div>

 <div class="fig"><h3>Opioids compared</h3>
  <div class="seg" id="op-sel"></div>
  <div class="svgbox"><svg id="op" viewBox="0 0 520 300" role="img" aria-label="Opioid properties"></svg></div>
  <div class="readout" id="op-r"></div></div>
</div>`;

function initDiagrams(){
 const out=(id,t)=>{const o=$("#"+id+"-o");if(o)o.textContent=t};

 /* 1. Uptake */
 function drawUP(){const VA=+$("#up-va").value,Q=+$("#up-q").value,s=+$("#up-s").value;out("up-va",VA);out("up-q",Q);out("up-s",s);const T=s+30;
  const P=plot($("#up"),{w:900,h:340,x0:0,x1:T,y0:0,y1:1,xt:range(0,T,Math.round(T/5)).map(x=>Math.round(x)),yt:[0,0.25,0.5,0.75,1],xl:"Time (min)",yl:"FA / FI"});
  P.add("line",{x1:P.X(s),x2:P.X(s),y1:P.Y(0),y2:P.Y(1),stroke:"var(--muted)","stroke-dasharray":"4 4"});P.text(s+0.5,0.95,"agent off",{"font-size":"11"});
  const res={};Object.keys(AG).forEach(k=>{const d=uptake(k,VA,Q,s,T);res[k]=d;P.line(d,{stroke:AG[k][5]})});
  const at=(d,t)=>{let b=d[0];for(const p of d){if(p[0]<=t+1e-9)b=p}return b[1]};
  const labs=Object.keys(AG).map(k=>[at(res[k],s*0.6),AG[k][0],AG[k][5]]).sort((a,b)=>b[0]-a[0]);for(let i=1;i<labs.length;i++)if(labs[i-1][0]-labs[i][0]<0.06)labs[i][0]=labs[i-1][0]-0.06;labs.forEach(([y,n,c])=>P.text(s*0.6,y+0.025,n,{fill:c,"font-size":"11"}));
  $("#up-r").innerHTML="FA/FI at 5 min: "+Object.keys(AG).map(k=>`${AG[k][0]} <b>${at(res[k],5).toFixed(2)}</b>`).join(" · ")+`. Ten minutes after switching off, the fraction remaining: `+Object.keys(AG).map(k=>`${AG[k][0]} ${at(res[k],Math.min(T,s+10)).toFixed(2)}`).join(" · ")+". Lower cardiac output or higher ventilation speeds the rise, most visibly for halothane and isoflurane; the insoluble agents barely change."}
 ["#up-va","#up-q","#up-s"].forEach(x=>$(x).oninput=drawUP);drawUP();

 /* 2. MAC age */
 let maK="sevo";
 function drawMA(){const a=+$("#ma-a").value,n=+$("#ma-n").value;out("ma-a",a);out("ma-n",n);const [nm,m40]=MAC40[maK];const ymax=m40*1.45;
  const P=plot($("#ma"),{w:520,h:300,x0:0,x1:100,y0:0,y1:ymax,xt:[0,20,40,60,80,100],yt:[0,m40*0.5,m40,m40*1.4].map(v=>+v.toPrecision(2)),xl:"Age (years)",yl:nm+" %"});
  P.line(range(1,100).map(x=>[x,macAge(m40,x)]),{stroke:"var(--etco2)"});
  const fac=Math.pow(10,-0.00269*(a-40)),nfrac=maK==="n2o"?0:n/(104*fac),need=Math.max(0,1-nfrac)*m40*fac;
  if(n>0&&maK!=="n2o")P.line(range(1,100).map(x=>[x,Math.max(0,1-n/(104*Math.pow(10,-0.00269*(x-40))))*macAge(m40,x)]),{stroke:"var(--abp)","stroke-dasharray":"5 4"});
  P.dot(a,macAge(m40,a),"var(--ink)",macAge(m40,a).toFixed(2)+"%");
  $("#ma-r").innerHTML=`${nm} MAC at age ${a}: <b>${macAge(m40,a).toFixed(2)}%</b> (×${fac.toFixed(2)} of the age-40 value)`+(maK!=="n2o"?`. With ${n}% N2O (${(nfrac).toFixed(2)} MAC) the end-tidal ${nm} needed for 1 MAC is <b>${need.toFixed(2)}%</b> (dashed line). MAC-awake ≈ ${(0.34*macAge(m40,a)).toFixed(2)}%.`:". N2O alone cannot reach 1 MAC at 1 atmosphere.")}
 seg($("#ma-sel"),Object.entries(MAC40).map(([k,v])=>[k,v[0]]),k=>{maK=k;drawMA()},"sevo");["#ma-a","#ma-n"].forEach(x=>$(x).oninput=drawMA);

 /* 3. Meyer-Overton */
 function drawMO(sel){const P=plot($("#mo"),{w:520,h:300,x0:0,x1:2.5,y0:-0.3,y1:2.2,xt:[0,1,2],yt:[0,1,2],xl:"log10 oil:gas coefficient",yl:"log10 MAC (%)"});
  P.line([[0,Math.log10(130)],[2.5,Math.log10(130)-2.5]],{stroke:"var(--muted)","stroke-dasharray":"5 4","stroke-width":1.4});P.text(0.75,Math.log10(130)-0.75+0.28,"MAC × O:G ≈ 130",{"font-size":"11"});
  MO.forEach(([n,m,o])=>{const on=n===sel;P.dot(Math.log10(o),Math.log10(m),on?"var(--abp)":"var(--spo2)",n,o>150?-62:(n==="Enflurane"?-62:6),n==="Isoflurane"?14:(on?-8:12))});
  const r=MO.find(x=>x[0]===sel);$("#mo-r").innerHTML=`<b>${sel}</b>: MAC ${r[1]}%, oil:gas ${r[2]}; product <b>${(r[1]*r[2]).toFixed(0)}</b>. The line of slope −1 is the Meyer–Overton prediction: the products cluster around 85–170, but the rule fails for non-immobilisers, the cut-off effect and enantiomers, pointing to protein targets.`}
 seg($("#mo-sel"),MO.map(x=>[x[0],x[0]]),drawMO,"Sevoflurane");

 /* 4. NMB monitor */
 let nmT="nd",nmD="ster";
 function drawNM(){const occ=+$("#nm-o").value/100;out("nm-o",Math.round(occ*100));const svg=$("#nm");svg.innerHTML="";
  const add=(t,a,tx)=>{const e=document.createElementNS(SVGNS,t);for(const k in a)e.setAttribute(k,a[k]);if(tx!=null)e.textContent=tx;svg.append(e);return e};
  const T1=Math.max(0,Math.min(1,(0.95-occ)/0.2));let tofr,fade;
  if(nmT==="dep"){tofr=1;fade=0}else{tofr=Math.max(0,Math.min(1,1-(occ-0.6)/0.3));fade=1-tofr}
  const tw=[0,1,2,3].map(n=>T1*(1-fade*n/3));const base=190,H=150;
  add("line",{x1:20,x2:880,y1:base,y2:base,stroke:"var(--muted)"});
  add("text",{x:110,y:216,"text-anchor":"middle",class:"lbl"},"Train-of-four (2 Hz)");
  tw.forEach((h,i)=>{add("rect",{x:50+i*35,y:base-h*H,width:16,height:Math.max(0.5,h*H),fill:"var(--abp)"})});
  add("line",{x1:40,x2:180,y1:base-H,y2:base-H,stroke:"var(--muted)","stroke-dasharray":"3 3"});add("text",{x:184,y:base-H+4,class:"lbl","font-size":"10"},"control");
  /* tetanus */
  const end=nmT==="dep"?T1:T1*Math.pow(tofr,1.5);
  add("text",{x:390,y:216,"text-anchor":"middle",class:"lbl"},"Tetanus 50 Hz, 5 s");
  add("path",{d:`M300 ${base} L305 ${base-T1*H} L480 ${base-end*H} L485 ${base} Z`,fill:"var(--etco2)","fill-opacity":0.45,stroke:"var(--etco2)"});
  /* PTC */
  const tofc=tw.filter(h=>h>0.05).length;let ptc=0;
  if(nmT!=="dep"&&tofc===0)ptc=Math.max(0,Math.min(15,Math.round((0.995-occ)/0.045*10)));
  if(nmT!=="dep"&&tofc>0)ptc=15;
  add("text",{x:700,y:216,"text-anchor":"middle",class:"lbl"},nmT==="dep"?"Post-tetanic twitches (no facilitation)":"Post-tetanic count (1 Hz)");
  for(let i=0;i<15;i++){let h;if(nmT==="dep")h=T1;else h=i<ptc?Math.max(0.12,Math.min(1,(tofc?T1*1.2:0.5)*(1-i/18))):0;add("rect",{x:540+i*21,y:base-h*H,width:9,height:Math.max(0.5,h*H),fill:"var(--spo2)"})}
  let depth,adv;const ratio=T1>0.05?tw[3]/tw[0]:0;
  if(nmT==="dep"){depth=T1<0.05?"Complete phase I block":"Phase I block (no fade)";adv="Wait for plasma cholinesterase to hydrolyse it. Neostigmine would <b>prolong</b> phase I block. Prolonged block suggests cholinesterase deficiency (keep sedated and ventilated)."}
  else{const ster=nmD==="ster";
   if(tofc===0&&ptc===0){depth="Intense block (PTC 0)";adv=ster?"Sugammadex 16 mg/kg only for an immediate reversal need; otherwise wait and keep anaesthetised.":"No reversal possible: ventilate, keep anaesthetised and wait."}
   else if(tofc===0){depth="Deep block (TOF count 0, PTC "+ptc+")";adv=ster?"Sugammadex <b>4 mg/kg</b> (PTC ≥ 1–2).":"Wait. Neostigmine is ineffective (ceiling effect)."}
   else if(tofc<4){depth="Moderate block (TOF count "+tofc+")";adv=ster?"Sugammadex <b>2 mg/kg</b> (TOF count ≥ 2).":"Wait for TOF count 4 before neostigmine."}
   else if(ratio<0.4){depth="Shallow block (TOF count 4, TOFR "+ratio.toFixed(2)+")";adv=ster?"Sugammadex 2 mg/kg (preferred) or neostigmine 50 µg/kg; confirm TOFR ≥ 0.9.":"Neostigmine 50 µg/kg with glycopyrrolate; confirm TOFR ≥ 0.9."}
   else if(ratio<0.9){depth="Minimal block (TOFR "+ratio.toFixed(2)+")";adv="Neostigmine 30–50 µg/kg (or sugammadex 2 mg/kg for aminosteroids). Fade below 0.4 cannot be detected reliably by eye or touch."}
   else{depth="Adequate recovery (TOFR "+ratio.toFixed(2)+")";adv="Safe to extubate (TOFR ≥ 0.9). Neostigmine now could cause weakness."}}
  if(nmT==="ph2")adv="Phase II block after large or repeated suxamethonium doses: fade like a non-depolarising block. Sugammadex does nothing. Keep sedated and ventilated until spontaneous recovery; neostigmine has an unpredictable effect.";
  $("#nm-r").innerHTML=`Occupancy ${Math.round(occ*100)}%: T1 ${Math.round(T1*100)}% of control, TOF count ${nmT==="dep"?(T1>0.05?4:0):tofc}${nmT==="dep"?", TOF ratio ~1.0 (no fade)":""}. <b>${depth}</b>. ${adv} Twitch height is preserved until ~75% occupancy (margin of safety). Fade comes from prejunctional block.`}
 seg($("#nm-type"),[["nd","Non-depolarising"],["dep","Depolarising (phase I)"],["ph2","Phase II (sux)"]],k=>{nmT=k==="ph2"?"ph2":k;drawNM()},"nd");
 seg($("#nm-drug"),[["ster","Rocuronium / vecuronium"],["benz","Atracurium / cisatracurium"]],k=>{nmD=k;drawNM()},"ster");$("#nm-o").oninput=drawNM;

 /* 5. LA ionisation */
 function drawLA(){const ph=+$("#la-p").value;out("la-p",ph.toFixed(2));const svg=$("#la");svg.innerHTML="";const add=(t,a,tx)=>{const e=document.createElementNS(SVGNS,t);for(const k in a)e.setAttribute(k,a[k]);if(tx!=null)e.textContent=tx;svg.append(e);return e};
  const x0=120,x1=500,bh=30;add("text",{x:x0,y:20,class:"lbl"},"% unionised (free base) at pH "+ph.toFixed(2));
  [0,25,50].forEach(v=>{const x=x0+(x1-x0)*v/50;add("line",{x1:x,x2:x,y1:30,y2:280,class:"gr"});add("text",{x:x,y:294,"text-anchor":"middle"},v+"%")});
  const rows=LAS.map(([n,pk,pb,c])=>[n,pk,pb,c,100/(1+Math.pow(10,pk-ph))]);
  rows.forEach(([n,pk,pb,c,u],i)=>{const y=40+i*40;add("text",{x:x0-8,y:y+bh/2+4,"text-anchor":"end",class:"lbl"},n+" ("+pk+")");add("rect",{x:x0,y:y,width:Math.max(1,(x1-x0)*Math.min(u,50)/50),height:bh,fill:c,"fill-opacity":0.8});add("text",{x:x0+(x1-x0)*Math.min(u,50)/50+4,y:y+bh/2+4,class:"lbl"},u.toFixed(1)+"%")});
  const l=rows[0][4],b=rows[3][4];$("#la-r").innerHTML=`At pH ${ph.toFixed(2)} lidocaine is ${l.toFixed(1)}% and bupivacaine ${b.toFixed(1)}% unionised (ratio ${(l/b).toFixed(1)}:1). Lowering the pH (infected or ischaemic tissue) cuts the free base for every agent; adding bicarbonate raises it (but may precipitate bupivacaine). Chloroprocaine's fast onset despite a high pKa comes from the high concentration used (3%).`}
 $("#la-p").oninput=drawLA;drawLA();

 /* 6. Opioid comparison */
 function drawOP(k){const svg=$("#op");svg.innerHTML="";const add=(t,a,tx)=>{const e=document.createElementNS(SVGNS,t);for(const kk in a)e.setAttribute(kk,a[kk]);if(tx!=null)e.textContent=tx;svg.append(e);return e};
  const x0=110,x1=470;let val,lab,log=false,max;
  if(k==="pot"){val=r=>r[1];lab="Potency vs morphine (log scale)";log=true;max=4}
  if(k==="un"){val=r=>100/(1+Math.pow(10,r[2]-7.4));lab="% unionised at pH 7.4";max=100}
  if(k==="lip"){val=r=>r[3];lab="Octanol:water partition (log scale)";log=true;max=4}
  if(k==="pb"){val=r=>r[4];lab="% protein bound";max=100}
  const sc=v=>log?(Math.log10(v)+1)/(max+1):v/max;
  add("text",{x:x0,y:18,class:"lbl"},lab);
  (log?[-1,0,1,2,3,4]:[0,25,50,75,100]).forEach(t=>{const x=x0+(x1-x0)*(log?(t+1)/(max+1):t/max);add("line",{x1:x,x2:x,y1:26,y2:282,class:"gr"});add("text",{x:x,y:296,"text-anchor":"middle"},log?(t<0?"0.1":String(Math.pow(10,t))):t)});
  OPI.forEach((r,i)=>{const y=30+i*36,v=val(r);add("text",{x:x0-8,y:y+18,"text-anchor":"end",class:"lbl"},r[0]);add("rect",{x:x0,y:y,width:Math.max(1,(x1-x0)*sc(v)),height:26,fill:r[0]==="Alfentanil"?"var(--etco2)":"var(--nibp)","fill-opacity":0.85});add("text",{x:x0+(x1-x0)*sc(v)+4,y:y+18,class:"lbl"},v>=10?v.toFixed(0):v.toFixed(1))});
  const txt={pot:"Potency follows lipid solubility and receptor affinity: sufentanil > fentanyl ≈ remifentanil > alfentanil > diamorphine > morphine > pethidine.",un:"Alfentanil (pKa 6.5) is ~90% unionised, so it crosses the BBB fastest despite modest lipid solubility. Fentanyl and pethidine are < 10% unionised.",lip:"Lipid solubility drives potency, Vd and accumulation. Morphine's low value gives slow onset and longer intrathecal spread (late respiratory depression); diamorphine is far more lipid-soluble.",pb:"High binding (alfentanil, sufentanil) limits Vd. Morphine's low binding does not speed its onset because it is poorly lipid-soluble and mostly ionised."};
  $("#op-r").innerHTML=txt[k]}
 seg($("#op-sel"),[["pot","Potency"],["un","Unionised fraction"],["lip","Lipid solubility"],["pb","Protein binding"]],drawOP,"un");
}

ATLAS.register({id:"08",name:"Anaesthetic agents",
  lede:"IV induction agents, sedatives, inhaled agents and MAC, neuromuscular blockers and reversal, opioids and analgesics, local anaesthetics and LAST.",
  barsNote:"",
  bars:BARS,fam:FAM,slides:SLIDES,calcs:CALCS,tables:TABLES,cards:CARDS,fcf:FCF,viva:VIVA,quiz:QUIZ,crisis:CRISIS,
  sources:SRC,errata:ERR,refs:REFS,diagHTML:DIAG,initDiagrams,
  diagLede:"Six live diagrams: an inhaled-agent uptake and washout simulator with ventilation and cardiac output controls, MAC against age, Meyer–Overton, a nerve-stimulator with reversal advice, LA ionisation by tissue pH and an opioid property comparison."});
})();
