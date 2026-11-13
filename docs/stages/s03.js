/* Stage 03 · Neurophysiology */
(function(){
const {plot,range,el,SVGNS,fmt,$,$$,seg}=ATLAS.h;

const BARS=[];

const FAM={brain:["spo2","Brain & ICP"],neuro:["ecg","Neurons & cord"],pain:["abp","Pain"],ans:["etco2","Autonomic"],nmj:["nibp","NMJ & muscle"]};

const SLIDES=[
{f:"brain",t:"Cerebral circulation",b:`<ul class="clean"><li>Brain ≈ 2% of body weight (1.4 kg) but receives ≈ 15% of CO (750 mL/min) and uses ≈ 20% of VO2.</li>
<li><b>CBF</b> ≈ 50 mL/100 g/min (grey matter ~70–80, white ~20). <b>CMRO2</b> ≈ 3–3.5 mL/100 g/min. Glucose ≈ 5 mg/100 g/min; almost no O2 or glucose stores, so loss of flow causes unconsciousness in ~10 s.</li>
<li><b>Arterial supply:</b> two internal carotids (~2/3, anterior circulation: ACA, MCA) and two vertebrals → basilar (~1/3, posterior: PCA, cerebellar, brainstem). Joined by the anterior and posterior communicating arteries into the <b>circle of Willis</b>; complete in only ~40–50% of people.</li>
<li><b>Venous drainage:</b> superficial cortical veins and deep veins (great cerebral vein of Galen) → superior/inferior sagittal, straight, transverse, sigmoid sinuses → internal jugular veins. Sinuses are valveless and held open by dura: air embolism risk in head-up neurosurgery.</li></ul>
<div class="tbl"><table><tr><th>CBF mL/100 g/min</th><th>Consequence</th></tr><tr><td>50</td><td>Normal</td></tr><tr><td>~20–25</td><td>EEG slowing, loss of consciousness begins</td></tr><tr><td>~15–18</td><td>Isoelectric EEG, evoked potentials lost (penumbra: reversible)</td></tr><tr><td>&lt; 10</td><td>Ion pump failure, K⁺ efflux, Ca²⁺ influx, cell death within minutes</td></tr></table></div>`,
p:"Why a circle? It lets one carotid or vertebral supply the whole brain if another is occluded. Carotid endarterectomy under regional anaesthesia tests exactly this collateral reserve.",
v:"Draw the circle of Willis from the bottom up: vertebrals → basilar → PCAs → PComms → ICAs → MCAs → ACAs → AComm. Then give flow, CMRO2 and the ischaemic thresholds."},
{f:"brain",t:"Control of cerebral blood flow",b:`<ul class="clean"><li><b>CPP = MAP − ICP</b> (or − CVP if higher). Normal 70–90 mmHg.</li>
<li><b>Autoregulation</b>: constant CBF over CPP ~50/60 to 150/160 mmHg (classic figures; newer data suggest a narrower plateau with a lower limit nearer 70 and wide individual variation). Myogenic (seconds), metabolic and neurogenic mechanisms. Curve shifts right in chronic hypertension and sympathetic activation; abolished by injury, ischaemia, high volatile concentrations, severe hypercapnia.</li>
<li><b>PaCO2</b>: CBF changes ≈ 3–4% per mmHg (≈ 25–30% per kPa) between ~3 and 10 kPa; doubles at 10.6, halves at 2.7. Effect via perivascular pH; adapts over 6–24 h (CSF HCO3⁻), so prolonged hyperventilation loses effect and rebound occurs.</li>
<li><b>PaO2</b>: little effect until PaO2 &lt; ~7–8 kPa, then steep rise; overrides other controls.</li>
<li><b>Flow–metabolism coupling</b>: local flow follows local activity within seconds (K⁺, H⁺, adenosine, NO, astrocyte signalling). Seizures and fever raise CBF; hypothermia and hypnotics lower it.</li>
<li><b>Temperature</b>: CMRO2 falls ≈ 6–7% per °C.</li>
<li><b>Viscosity</b>: optimal DO2 near haematocrit 30–35%.</li>
<li><b>Neurogenic</b>: sympathetic tone shifts the autoregulation curve right; minor role in flow at rest.</li></ul>`,
p:"Inverse steal (Robin Hood): hypocapnia constricts normal vessels and can divert blood towards ischaemic, maximally dilated areas. Hypercapnia can do the opposite (steal).",
v:"Draw three graphs on one page: CBF vs CPP (with the hypertensive shift), CBF vs PaCO2 (sigmoid) and CBF vs PaO2 (flat then steep). The Diagrams tab has all three, live."},
{f:"brain",t:"Monro–Kellie doctrine and ICP",b:`<p>The adult skull is a rigid box: brain ~80–85%, blood ~5–10%, CSF ~10%. A rise in one volume must be offset by a fall in another, or ICP rises.</p>
<ul class="clean"><li>Normal ICP 5–15 mmHg (supine adult). Treatment threshold in severe TBI: <b>&gt; 22 mmHg</b> (Brain Trauma Foundation 2016).</li>
<li>Compensation order: venous blood out of the sinuses → CSF displaced into the spinal sac (and absorption increases) → then arterial blood volume falls (ischaemia).</li>
<li>Pressure–volume curve: flat, then exponential. <b>Elastance</b> (ΔP/ΔV) rises as reserve is used up; on the steep part, small volume changes (coughing, hypercapnia, a little fluid) cause big ICP spikes.</li>
<li><b>ICP waveform</b>: P1 percussive (arterial pulse), P2 tidal (brain compliance), P3 dicrotic (aortic valve closure / venous). P2 &gt; P1 indicates poor compliance.</li>
<li><b>Lundberg waves</b>: A (plateau) waves to 50–100 mmHg for 5–20 min, always pathological; B waves 0.5–2/min, linked to vasomotor and breathing changes; C waves 4–8/min, often normal.</li></ul>`,
p:"Herniation: uncal (temporal lobe over the tentorium: ipsilateral fixed dilated pupil from CN III compression, contralateral hemiparesis), central (downward), tonsillar (foramen magnum: Cushing's triad, apnoea, death).",
v:"Draw the pressure–volume curve with compensated, decompensated and ischaemic zones. Then draw the ICP pulse waveform and show P2 overtaking P1."},
{f:"brain",t:"Raised ICP and the injured brain",b:`<p><b>Primary injury</b> happens at impact. <b>Secondary injury</b> is what we prevent: hypoxia, hypotension, hyper/hypocapnia, hyper/hypoglycaemia, fever, seizures, raised ICP, anaemia, hyponatraemia. A single SBP &lt; 90 mmHg roughly doubles mortality.</p>
<p><b>Targets (tiered approach, BTF 2016 / SIBICC):</b></p>
<ul class="clean"><li><b>Basics</b>: SpO2 &gt; 94% / PaO2 &gt; 10–13 kPa, PaCO2 4.5–5.0 kPa, SBP ≥ 100–110, 30° head-up, neck neutral, no tight ETT ties, normothermia, glucose 6–10, Na⁺ 140–145, adequate sedation and analgesia, seizure prophylaxis if indicated.</li>
<li><b>Tier 1</b>: CPP 60–70 mmHg, deeper sedation, CSF drainage via EVD, osmotherapy: mannitol 0.25–1 g/kg or hypertonic saline (e.g. 3% 2–5 mL/kg, or 5–7.5% boluses).</li>
<li><b>Tier 2</b>: mild hypocapnia 4.0–4.5 kPa with brain oxygen monitoring, neuromuscular block, MAP challenge.</li>
<li><b>Tier 3</b>: barbiturate coma (thiopentone to burst suppression), decompressive craniectomy, hypothermia 35–36 °C (rescue only).</li></ul>
<p><b>Cushing's triad</b>: hypertension (widening pulse pressure), bradycardia, irregular breathing. A late sign of brainstem compression.</p>`,
p:"Vasodilatory cascade: low MAP → low CPP → vasodilatation → more cerebral blood volume → higher ICP → lower CPP. Raising MAP breaks it (vasoconstriction cascade).",
v:"Structure: prevent secondary injury (ABCDE), then ICP/CPP targets, then the tiers. Say the numbers."},
{f:"brain",t:"CSF and the blood–brain barrier",b:`<ul class="clean"><li>Volume ~150 mL (half in the ventricles, half in the subarachnoid space). Production ≈ 0.35 mL/min (~500 mL/day): turned over 3–4 times a day. About 70% from the choroid plexus (active Na⁺ secretion via Na⁺/K⁺-ATPase, carbonic anhydrase; water follows), the rest from ependyma and brain interstitium.</li>
<li>Path: lateral ventricles → foramina of Monro → third ventricle → aqueduct of Sylvius → fourth ventricle → foramina of Magendie (midline) and Luschka (lateral) → subarachnoid space → arachnoid granulations → dural venous sinuses (pressure-dependent, one-way). Some drains via perineural lymphatics.</li>
<li>Functions: buoyancy (1.4 kg brain weighs ~50 g), protection, stable ionic environment, central chemoreception, ICP buffering, waste clearance (glymphatic system).</li>
<li>Production is fairly constant; acetazolamide, furosemide, steroids reduce it slightly.</li></ul>
<p><b>Blood–brain barrier</b>: capillary endothelium with tight junctions, few vesicles, basement membrane, pericytes and astrocyte end-feet. Lipid-soluble, small, unionised drugs cross; glucose (GLUT1) and amino acids use carriers; P-glycoprotein pumps many drugs out. Enzymatic barrier: MAO, cholinesterases.</p>
<p><b>Outside the BBB</b> (circumventricular organs): area postrema (chemoreceptor trigger zone), posterior pituitary, median eminence, pineal gland, OVLT and subfornical organ (osmoreceptors, thirst).</p>`,
p:"Glycopyrrolate and neostigmine are quaternary ammonium compounds and do not cross the BBB; atropine and physostigmine are tertiary and do. Central anticholinergic syndrome is treated with physostigmine.",
v:"Production, circulation, absorption in that order, then the CSF vs plasma table (Classify tab), then the BBB and which areas sit outside it."},
{f:"brain",t:"Anaesthetic drugs and the brain",b:`<div class="tbl"><table><tr><th>Agent</th><th>CMRO2</th><th>CBF</th><th>ICP</th><th>Autoregulation / CO2 response</th></tr>
<tr><td>Propofol</td><td>↓↓</td><td>↓↓</td><td>↓</td><td>Preserved (coupled)</td></tr>
<tr><td>Thiopentone</td><td>↓↓ (to burst suppression, ~50–60%)</td><td>↓↓</td><td>↓</td><td>Preserved</td></tr>
<tr><td>Etomidate</td><td>↓↓</td><td>↓</td><td>↓</td><td>Preserved; can trigger seizure-like activity</td></tr>
<tr><td>Ketamine</td><td>↑ (regional)</td><td>↑</td><td>↑ (little effect when ventilated and co-sedated)</td><td>Preserved</td></tr>
<tr><td>Benzodiazepines</td><td>↓</td><td>↓</td><td>↓ / ↔</td><td>Preserved</td></tr>
<tr><td>Volatiles</td><td>↓ (dose-dependent)</td><td>↑ (direct vasodilator: halothane ≫ des &gt; iso &gt; sevo)</td><td>↑ at high doses</td><td>Impaired above ~1–1.5 MAC; CO2 response preserved</td></tr>
<tr><td>Nitrous oxide</td><td>↑</td><td>↑↑</td><td>↑</td><td>Avoid with pneumocephalus</td></tr>
<tr><td>Opioids</td><td>↔ / slight ↓</td><td>↔ (↑ if hypercapnic or hypotensive)</td><td>↔</td><td>Preserved</td></tr>
<tr><td>Dexmedetomidine</td><td>↔ / ↓</td><td>↓</td><td>↔</td><td>Preserved</td></tr>
<tr><td>Suxamethonium</td><td>–</td><td>Small transient ↑</td><td>Small transient ↑</td><td>Clinically unimportant if anaesthesia is adequate</td></tr></table></div>`,
p:"Volatiles 'uncouple' flow from metabolism: CMRO2 falls while CBF rises (luxury perfusion). Sevoflurane below 1 MAC is closest to neutral, which is why it is the volatile of choice when a volatile is used in neuroanaesthesia.",
v:"Draw the CBF vs CMRO2 graph with the coupling line through the origin; IV hypnotics sit on the line, volatiles and N2O sit above it, ketamine above and to the right."},
{f:"brain",t:"Death using neurological criteria (UK 2025 Code)",b:`<p>The Academy of Medical Royal Colleges Code updated on 1 January 2025 applies to all ages. Older texts quote the 2008 Code, so learn the new numbers.</p>
<p><b>Preconditions:</b> unresponsive, apnoeic and ventilated; a known cause of irreversible brain damage; reversible causes excluded: sedatives (allow for clearance, measure levels if needed), neuromuscular block (confirm with a nerve stimulator), core temperature &gt; 34 °C, adequate circulation (MAP target), and no significant metabolic or endocrine disturbance.</p>
<p><b>Brainstem reflexes absent:</b></p>
<ul class="clean"><li>Pupils fixed, unreactive to light (II afferent, III efferent).</li><li>Corneal reflex absent (V, VII).</li><li>Oculovestibular: no eye movement with 50 mL ice-cold water into each ear over 1 min, ear canals clear (VIII, III, VI).</li><li>No motor response in the cranial nerve territory to central pain, such as supraorbital pressure (V, VII); spinal reflexes may persist.</li><li>No gag (IX, X) and no cough to tracheal suction (X).</li></ul>
<p><b>Apnoea test (2025):</b> start PaCO2 ≥ 5.3 kPa after preoxygenation; disconnect with O2 insufflation or CPAP; end-point PaCO2 ≥ <b>8.0 kPa</b>, pH &lt; <b>7.30</b> and a rise of ≥ <b>2.7 kPa</b>, minimum 5 minutes, with no respiratory effort.</p>
<p>Two doctors, both registered ≥ 5 years and competent, at least one a consultant; neither from the transplant team. Time of death is when the first set of tests confirms death. Ancillary tests (CT angiography, EEG, flow studies) are used when the clinical tests cannot be completed.</p>`,
p:"After brainstem death: catecholamine storm (hypertension, arrhythmia, myocardial injury, neurogenic pulmonary oedema), then vasoplegia, diabetes insipidus, hypothermia, hyperglycaemia and coagulopathy. Donor management treats each of these.",
v:"Preconditions, exclusions, the five reflex tests with the cranial nerves each tests, apnoea test numbers, who can test, then donor physiology."},
{f:"neuro",t:"Resting membrane potential",b:`<ul class="clean"><li>Inside negative: neurons ≈ −70 mV, skeletal and cardiac muscle ≈ −90 mV.</li>
<li>Set mainly by the K⁺ gradient (in 140–150, out 4–5 mmol/L) and high resting K⁺ permeability (leak K2P channels). Na⁺/K⁺-ATPase (3 Na⁺ out, 2 K⁺ in) maintains gradients and adds a few mV directly (electrogenic).</li>
<li><b>Gibbs–Donnan effect</b>: trapped intracellular anions (proteins, phosphates) unevenly distribute diffusible ions.</li>
<li><b>Nernst</b>: E = (RT/zF) ln([out]/[in]) ≈ 61.5 log10([out]/[in]) mV at 37 °C. E<sub>K</sub> ≈ −90 to −95, E<sub>Na</sub> ≈ +60 to +65, E<sub>Cl</sub> ≈ −70, E<sub>Ca</sub> ≈ +120 mV.</li>
<li><b>Goldman–Hodgkin–Katz</b> combines ions weighted by permeability (resting P<sub>K</sub>:P<sub>Na</sub>:P<sub>Cl</sub> ≈ 1 : 0.04 : 0.45).</li></ul>`,
p:"Hyperkalaemia makes the RMP less negative. Paradoxically this reduces excitability over time because Na⁺ channels become inactivated: weakness, then cardiac conduction failure.",
v:"Define, explain the K⁺ leak and pump, write Nernst with numbers, then why the RMP sits close to E<sub>K</sub>. The Formulas tab has Nernst and GHK calculators."},
{f:"neuro",t:"Nerve action potential, conduction and fibre types",b:`<ul class="clean"><li>Stimulus depolarises to threshold (≈ −55 mV) → voltage-gated Na⁺ channels open (positive feedback) → peak ≈ +30–35 mV (short of E<sub>Na</sub> because Na⁺ channels inactivate) → delayed-rectifier K⁺ efflux repolarises → after-hyperpolarisation.</li>
<li><b>All-or-none</b>; intensity is coded by frequency. Absolute refractory ≈ 1 ms (Na⁺ channel inactivation gate shut), relative 2–3 ms. Refractoriness makes conduction one-way.</li>
<li><b>Propagation</b>: local circuit currents. Myelin (Schwann cells peripherally, oligodendrocytes centrally) raises membrane resistance and lowers capacitance; the AP jumps between nodes of Ranvier (<b>saltatory conduction</b>). Velocity ∝ diameter (myelinated, ≈ 6 m/s per µm) or ∝ √diameter (unmyelinated).</li>
<li><b>Local anaesthetics</b> block Na⁺ channels from inside (use-dependent: open/inactivated channels). Block needs ~3 consecutive nodes (≈ 1 cm) blocked.</li></ul>
<div class="tbl"><table><tr><th>Fibre</th><th>Ø µm</th><th>m/s</th><th>Function</th></tr><tr><td>Aα (Ia, Ib)</td><td>12–20</td><td>70–120</td><td>Motor, proprioception</td></tr><tr><td>Aβ (II)</td><td>5–12</td><td>30–70</td><td>Touch, pressure</td></tr><tr><td>Aγ</td><td>3–6</td><td>15–30</td><td>Muscle spindle efferent</td></tr><tr><td>Aδ (III)</td><td>2–5</td><td>12–30</td><td>Fast, sharp pain; cold; temperature</td></tr><tr><td>B</td><td>&lt; 3</td><td>3–15</td><td>Preganglionic autonomic</td></tr><tr><td>C (IV)</td><td>0.4–1.2</td><td>0.5–2</td><td>Slow, burning pain; warmth; postganglionic sympathetic</td></tr></table></div>`,
p:"Differential block with neuraxial LA: sympathetic (B) first and highest (about two segments above sensory), then pain/temperature (C, Aδ), then touch (Aβ), then motor (Aα) lowest. Recovery is in the reverse order.",
v:"Draw the AP with numbers (−70, −55, +30) and label the channels. Then saltatory conduction, then the fibre table with LA sensitivity. The Diagrams tab lets you add LA block and change K⁺."},
{f:"neuro",t:"Synapses and neurotransmitters",b:`<ul class="clean"><li>AP arrives → voltage-gated Ca²⁺ channels (N, P/Q) open → vesicle fusion via SNARE proteins (synaptobrevin, syntaxin, SNAP-25: cleaved by botulinum toxins) → transmitter release.</li>
<li><b>EPSP</b>: cation influx (glutamate via AMPA, NMDA). <b>IPSP</b>: Cl⁻ influx or K⁺ efflux (GABA<sub>A</sub>, glycine; GABA<sub>B</sub> via K⁺). Summation is temporal and spatial at the axon hillock.</li>
<li><b>Glutamate</b>: main excitatory transmitter. NMDA receptor needs glutamate + glycine co-agonist + depolarisation to remove the Mg²⁺ block; lets Ca²⁺ in (memory, wind-up, excitotoxicity). Blocked by ketamine, N2O, xenon, Mg²⁺.</li>
<li><b>GABA</b>: main inhibitory transmitter in the brain. GABA<sub>A</sub> (pentameric Cl⁻ channel) is the target of propofol, thiopentone, etomidate, benzodiazepines and volatiles. <b>Glycine</b>: inhibitory in the spinal cord and brainstem (strychnine blocks; volatiles potentiate).</li>
<li>Monoamines: noradrenaline (locus coeruleus), serotonin (raphe), dopamine (substantia nigra, VTA), histamine (tuberomammillary), acetylcholine (basal forebrain): the arousal systems that hypnotics switch off.</li></ul>`,
p:"Most hypnotics increase inhibition (GABA<sub>A</sub>); ketamine, N2O and xenon reduce excitation (NMDA); dexmedetomidine silences the locus coeruleus (α2).",
v:"For each anaesthetic, name its main receptor and whether it boosts inhibition or blocks excitation. Examiners use this to bridge into pharmacology."},
{f:"neuro",t:"Spinal cord: tracts, blood supply and injury",b:`<ul class="clean"><li>Cord ends at L1–L2 in adults (L3 at birth); dural sac to S2. 31 pairs of spinal nerves.</li>
<li><b>Ascending</b>: dorsal columns (fine touch, vibration, proprioception; ipsilateral, cross in the medulla). Lateral spinothalamic (pain, temperature; cross within 1–2 segments). Anterior spinothalamic (crude touch, pressure). Spinocerebellar (unconscious proprioception, ipsilateral).</li>
<li><b>Descending</b>: lateral corticospinal (90% of fibres, crossed in the medullary pyramids), anterior corticospinal (uncrossed), extrapyramidal (rubro-, vestibulo-, reticulo-, tectospinal).</li>
<li><b>Blood supply</b>: one anterior spinal artery (anterior 2/3) from the vertebrals; two posterior spinal arteries (posterior 1/3) from vertebral or PICA; reinforced by segmental radicular arteries. <b>Artery of Adamkiewicz</b> (great anterior radiculomedullary artery): usually left-sided, T9–T12 in ~75% (range T8–L2). Watershed at mid-thoracic level.</li>
<li><b>Acute cord injury</b>: above C3–5 diaphragm paralysed; above T1–T4 loss of cardioaccelerator fibres (bradycardia); above T6 neurogenic shock (vasodilatation, hypotension). Spinal shock = flaccid areflexia below the lesion for days to weeks. Autonomic dysreflexia appears once reflexes return (lesions above T6).</li></ul>`,
p:"Suxamethonium is safe in the first ~24–72 h after cord injury; after that extrajunctional receptors proliferate and hyperkalaemic arrest is possible for months.",
v:"Draw the cross-section (Diagrams tab), place the tracts, then explain Brown-Séquard, anterior cord and central cord syndromes from where tracts cross."},
{f:"neuro",t:"EEG, sleep and anaesthesia",b:`<ul class="clean"><li>The scalp EEG is the summed postsynaptic potentials of cortical pyramidal neurons, paced by thalamocortical circuits. Amplitude 10–100 µV.</li>
<li><b>Bands</b>: delta 0.5–4 Hz (deep sleep, deep anaesthesia), theta 4–8 (drowsy, children), alpha 8–13 (awake, eyes closed, occipital), beta 13–30 (awake, alert; benzodiazepines), gamma &gt; 30.</li>
<li><b>Sleep</b>: N1 theta; N2 sleep spindles (12–15 Hz) and K-complexes; N3 slow-wave delta; REM looks awake (with atonia).</li>
<li><b>Propofol / volatiles</b>: paradoxical beta excitation at induction → surgical anaesthesia with frontal alpha (~10 Hz) plus slow-delta waves (alpha anteriorisation) → burst suppression → isoelectric.</li>
<li><b>Ketamine and N2O</b>: fast beta–gamma activity; BIS stays high and is unreliable. <b>Dexmedetomidine</b>: spindle-like pattern like N2 sleep.</li>
<li><b>Burst suppression</b>: alternating bursts and flat periods; quantified by suppression ratio. Seen with deep anaesthesia, hypothermia, anoxic injury; targeted with barbiturates for refractory ICP or status epilepticus.</li>
<li><b>BIS</b> (0–100): processed EEG combining spectral, bispectral and burst-suppression data. 40–60 for GA, &lt; 40 deep, burst suppression usually &lt; 20–30. Prolonged very low values linked with postoperative delirium in the elderly.</li></ul>`,
p:"Asked in 2025 as 'EEG in detail: waves awake, in deep sleep, under anaesthesia; BIS; burst suppression'. Rehearse with the EEG diagram, which plays each state.",
v:"Define the EEG, list the bands with states, then natural sleep, then anaesthesia stages, then processed EEG and its limits (ketamine, N2O, EMG, hypothermia, neurological disease)."},
{f:"neuro",t:"Seizures and status epilepticus",b:`<ul class="clean"><li>A seizure is abnormal, excessive, synchronous neuronal firing: an imbalance between glutamate excitation and GABA inhibition. Prolonged seizures internalise GABA<sub>A</sub> receptors and add NMDA receptors at the synapse, so benzodiazepines lose effect with time.</li>
<li><b>Systemic effects</b>: CMRO2 and CBF up several-fold, hypertension then hypotension, lactic acidosis, hyperthermia, hypoxia, rhabdomyolysis, aspiration.</li>
<li><b>Status epilepticus (ILAE)</b>: convulsive seizure ≥ 5 min (t1, treat) or recurrent without recovery; risk of lasting neuronal injury from 30 min (t2).</li></ul>
<p><b>Treatment ladder:</b> ABC, O2, glucose (thiamine first if alcohol), then</p>
<ol class="clean" style="padding-left:1.3em"><li>0–5 min: lorazepam 0.1 mg/kg IV (max 4 mg, repeat once) or buccal/IM midazolam 10 mg.</li>
<li>~20 min: levetiracetam 60 mg/kg (max 4.5 g), or sodium valproate 40 mg/kg (max 3 g), or fosphenytoin/phenytoin 20 mg PE/kg.</li>
<li>~40 min refractory: RSI and GA (propofol, midazolam or thiopentone infusion) with EEG monitoring, ICU.</li></ol>`,
p:"Local anaesthetic toxicity, hyponatraemia, hypoglycaemia, eclampsia (magnesium), alcohol withdrawal and tramadol are the theatre and ICU causes to name.",
v:"Definition, pathophysiology, systemic effects, then the timed ladder with doses."},
{f:"neuro",t:"Cranial nerves for anaesthetists",b:`<p>Asked as "cranial nerves: oculomotor, trigeminal, facial, glossopharyngeal, vagus; nerve supply to tongue, pharynx and larynx".</p>
<div class="tbl"><table><tr><th>Structure</th><th>Sensory</th><th>Motor</th></tr>
<tr><td>Tongue, anterior 2/3</td><td>Lingual (V3) general; chorda tympani (VII) taste</td><td rowspan="2">Hypoglossal (XII) except palatoglossus (X)</td></tr>
<tr><td>Tongue, posterior 1/3</td><td>Glossopharyngeal (IX), general and taste</td></tr>
<tr><td>Pharynx</td><td>Nasopharynx V2; oropharynx IX; laryngopharynx X</td><td>Pharyngeal plexus (X) except stylopharyngeus (IX)</td></tr>
<tr><td>Larynx above the cords</td><td>Internal branch of superior laryngeal (X)</td><td rowspan="2">Recurrent laryngeal (X) for all intrinsic muscles except cricothyroid (external branch of SLN)</td></tr>
<tr><td>Larynx below the cords, trachea</td><td>Recurrent laryngeal (X)</td></tr></table></div>
<ul class="clean"><li>Airway topicalisation: glossopharyngeal block (posterior tonsillar pillar), SLN block (below the greater horn of hyoid), transtracheal (cricothyroid membrane) for below the cords.</li>
<li>Unilateral RLN palsy: cord in the paramedian position, hoarse voice. Bilateral: stridor, airway obstruction.</li>
<li>Oculocardiac reflex (V → X), trigeminocardiac reflex, the facial nerve at risk in parotid and mastoid surgery (avoid NMB for monitoring).</li></ul>`,
p:"Parasympathetic outflow travels in III, VII, IX and X. The vagus also carries the afferent limb of the cough reflex and the efferent limb of most theatre bradycardias.",
v:"Run the twelve with one anaesthetic link each, then the tongue–pharynx–larynx table. Full anatomy comes in Stage 12."},
{f:"pain",t:"Nociception: from receptor to cortex",b:`<p><b>Four processes:</b> transduction, transmission, modulation, perception.</p>
<ul class="clean"><li><b>Transduction</b>: free nerve endings with TRPV1 (heat, capsaicin, H⁺), TRPA1, TRPM8 (cold), ASICs, P2X3 (ATP), mechanosensitive Piezo channels. Sensitised by the inflammatory soup: prostaglandins, bradykinin, H⁺, K⁺, 5-HT, histamine, NGF, substance P (peripheral sensitisation, primary hyperalgesia).</li>
<li><b>Transmission</b>: Aδ fibres (fast, well-localised "first pain") end in laminae I and V; C fibres (slow, burning "second pain") end in lamina II (substantia gelatinosa) and I. Transmitters: glutamate (AMPA, NMDA) and peptides (substance P via NK1, CGRP).</li>
<li><b>Second-order neurons</b> cross the midline within one or two segments and ascend: <b>spinothalamic</b> (neospinothalamic → VPL thalamus → somatosensory cortex: location and intensity), <b>spinoreticular/paleospinothalamic</b> (→ reticular formation, medial thalamus → anterior cingulate, insula, limbic: unpleasantness, arousal), spinomesencephalic (→ PAG).</li>
<li><b>Visceral pain</b>: sparse afferents travelling with sympathetic nerves; converges on somatic dorsal horn neurons → poorly localised and referred pain (heart to left arm, diaphragm to shoulder tip C4).</li></ul>`,
p:"Definition (IASP 2020): an unpleasant sensory and emotional experience associated with, or resembling that associated with, actual or potential tissue damage. Nociception is the neural process; pain is the experience.",
v:"Draw the pathway as three neurons: first order to the dorsal horn, second order across and up to the thalamus, third order to the cortex. Mark two modulation sites: the dorsal horn and descending control. The Diagrams tab shows where each analgesic acts."},
{f:"pain",t:"Modulation, sensitisation and chronic pain",b:`<ul class="clean"><li><b>Gate control theory</b> (Melzack and Wall, 1965): Aβ (touch) input excites inhibitory interneurons in the substantia gelatinosa, closing the gate to C-fibre input; C fibres inhibit the inhibitors, opening it. Basis of rubbing, TENS and spinal cord stimulation.</li>
<li><b>Descending inhibition</b>: cortex and hypothalamus → periaqueductal grey → rostral ventromedial medulla (serotonin, with ON and OFF cells) and locus coeruleus (noradrenaline, α2) → dorsal horn. Enkephalins and endorphins act at μ, δ, κ receptors. Basis of TCAs, SNRIs, clonidine and tramadol.</li>
<li><b>Central sensitisation</b>: repeated C-fibre firing removes the NMDA Mg²⁺ block → <b>wind-up</b>, Ca²⁺ entry, kinase activation, gene changes; expanded receptive fields; secondary hyperalgesia and allodynia. Glial activation maintains it.</li>
<li><b>Chronic pain</b>: lasts beyond normal healing, usually &gt; 3 months. <b>Neuropathic pain</b>: caused by a lesion or disease of the somatosensory nervous system (ectopic firing, Na⁺ channel up-regulation, loss of inhibition, sympathetic coupling).</li>
<li><b>Opioid tolerance and opioid-induced hyperalgesia</b>: receptor desensitisation and internalisation, NMDA activation, glial activation. Ketamine, methadone (NMDA antagonism) and opioid rotation help.</li></ul>
<div class="tbl"><table><tr><th>Term</th><th>Meaning</th></tr><tr><td>Allodynia</td><td>Pain from a stimulus that is not normally painful</td></tr><tr><td>Hyperalgesia</td><td>Increased pain from a normally painful stimulus</td></tr><tr><td>Hyperpathia</td><td>Abnormally painful, often explosive reaction to a repetitive stimulus, with a raised threshold</td></tr><tr><td>Dysaesthesia</td><td>Unpleasant abnormal sensation</td></tr></table></div>`,
p:"Pre-emptive and preventive analgesia aim to stop central sensitisation before and during surgery: regional blocks, ketamine, gabapentinoids and adequate opioid dosing.",
v:"EDAIC 2023 case: 28-year-old on 260 mg/day oxycodone for hepatectomy. Physiology of tolerance, OIH, withdrawal; then a multimodal plan (continue baseline opioid, ketamine infusion, regional or TAP, paracetamol, avoid NSAIDs in liver surgery as needed)."},
{f:"ans",t:"The autonomic nervous system",b:`<div class="tbl"><table><tr><th></th><th>Sympathetic</th><th>Parasympathetic</th></tr>
<tr><td>Outflow</td><td>Thoracolumbar T1–L2 (lateral horn)</td><td>Craniosacral: III, VII, IX, X; S2–4</td></tr>
<tr><td>Ganglia</td><td>Paravertebral chain and prevertebral (coeliac, mesenteric), near the cord</td><td>Near or in the target organ</td></tr>
<tr><td>Fibres</td><td>Short preganglionic (B, myelinated, white rami), long postganglionic (C, grey rami)</td><td>Long preganglionic, short postganglionic</td></tr>
<tr><td>Ganglionic transmitter</td><td colspan="2">Acetylcholine on nicotinic (N<sub>N</sub>) receptors</td></tr>
<tr><td>End-organ transmitter</td><td>Noradrenaline (α, β); ACh to sweat glands (muscarinic); adrenal medulla releases adrenaline 80%, noradrenaline 20%</td><td>ACh on muscarinic receptors</td></tr>
<tr><td>Ratio pre:post</td><td>1:20 (divergent, widespread)</td><td>1:1 to 1:3 (discrete)</td></tr></table></div>
<p><b>Noradrenaline</b> synthesis: tyrosine → (tyrosine hydroxylase, rate-limiting) DOPA → dopamine → (dopamine β-hydroxylase, in vesicles) noradrenaline → (PNMT, adrenal medulla, cortisol-induced) adrenaline. Removal: uptake 1 (neuronal, ~80%; blocked by cocaine, TCAs), uptake 2 (extraneuronal), metabolised by MAO and COMT to VMA and metanephrines.</p>
<p><b>Receptors</b>: α1 Gq (vasoconstriction, mydriasis), α2 Gi (presynaptic inhibition, sedation, analgesia), β1 Gs (heart, renin), β2 Gs (bronchi, vessels in muscle, uterus, glycogenolysis, K⁺ into cells), β3 Gs (lipolysis, bladder). M1 Gq (CNS, gastric), M2 Gi (heart), M3 Gq (glands, bronchial and visceral smooth muscle, endothelial NO).</p>`,
p:"Stellate ganglion (inferior cervical + T1) block gives Horner's syndrome: ptosis, miosis, anhidrosis, enophthalmos, plus nasal congestion and conjunctival injection.",
v:"Compare the two divisions in a table, then neurotransmitter synthesis and removal, then receptors and second messengers. Autonomic testing: Valsalva, heart rate variability with breathing, postural BP."},
{f:"nmj",t:"The neuromuscular junction",b:`<ul class="clean"><li>Motor neuron terminal, synaptic cleft ≈ 50 nm, postjunctional folds with nicotinic AChRs on the crests (~10 000/µm²) and acetylcholinesterase in the clefts.</li>
<li><b>ACh</b>: choline (high-affinity uptake, blocked by hemicholinium) + acetyl-CoA via choline acetyltransferase; packed into vesicles (~5000–10 000 molecules = one quantum). Ca²⁺ entry through P/Q-type channels triggers release of ~100–200 quanta per impulse.</li>
<li><b>Adult receptor</b>: pentamer α2βδε; both α subunits must bind ACh to open the cation channel. Fetal/extrajunctional form has γ instead of ε: opens longer, spreads over the whole membrane, more sensitive to depolarising agents and less to non-depolarising ones.</li>
<li>Single quantum → <b>MEPP</b> (~0.5–1 mV). Nerve impulse → <b>end-plate potential</b> → muscle AP via Nav1.4 channels.</li>
<li><b>Margin of safety</b>: twitch height starts to fall only when ~70–75% of receptors are blocked and disappears at ~90–95%. A normal TOF can hide a lot of block.</li>
<li><b>Prejunctional α3β2 nAChRs</b> mobilise ACh during high-frequency stimulation; their block by non-depolarising agents causes <b>fade</b>.</li></ul>`,
p:"Myasthenia gravis: antibodies to AChR (or MuSK) → fewer receptors → resistant to suxamethonium, very sensitive to non-depolarisers. Lambert–Eaton: antibodies to presynaptic P/Q Ca²⁺ channels → sensitive to both, improves with repeated effort.",
v:"Draw the junction: terminal, vesicles in active zones, cleft, folds with receptors on crests and AChE in troughs. Then synthesis, release, receptor structure, EPP and margin of safety."},
{f:"nmj",t:"Extrajunctional receptors and suxamethonium hyperkalaemia",b:`<p>Denervation or disuse removes the neural signals that confine receptors to the end-plate. Immature (γ) and α7 receptors spread across the whole muscle membrane. Suxamethonium then opens channels everywhere and K⁺ floods out.</p>
<div class="tbl"><table><tr><th>Condition</th><th>Risk window</th></tr>
<tr><td>Burns</td><td>From ~24–48 h, for up to a year or more</td></tr><tr><td>Spinal cord injury, stroke, upper or lower motor neuron lesions</td><td>From ~72 h, for 6 months or longer</td></tr>
<tr><td>Prolonged immobilisation, critical illness, sepsis</td><td>After several days</td></tr><tr><td>Crush injury, major trauma</td><td>After several days</td></tr>
<tr><td>Muscular dystrophies (Duchenne, Becker)</td><td>Always: rhabdomyolysis and hyperkalaemic arrest, especially in boys</td></tr></table></div>
<p>Normal rise in K⁺ after suxamethonium ≈ 0.5 mmol/L. In these conditions it can rise by 5–10 mmol/L within minutes. Non-depolarising agents are needed in higher doses (more receptors), apart from myasthenia.</p>`,
p:"Examiners ask about Duchenne muscular dystrophy 'in detail': no suxamethonium, avoid volatiles where possible (rhabdomyolysis), cardiomyopathy, restrictive lung disease, delayed gastric emptying.",
v:"Mechanism (receptor up-regulation and spread), list of conditions with timing, what happens, and what to use instead."},
{f:"nmj",t:"Skeletal muscle: contraction, fibre types and reflexes",b:`<ul class="clean"><li><b>Sarcomere</b> (Z line to Z line): A band = myosin length (constant), I band = actin only (shortens), H zone = myosin only (shortens), M line in the middle.</li>
<li><b>E–C coupling</b>: AP down T-tubules → DHPR (L-type channel acting as voltage sensor) mechanically opens RyR1 on the SR → Ca²⁺ binds troponin C → tropomyosin moves → myosin binds actin → power stroke. ATP detaches myosin; SERCA pumps Ca²⁺ back (relaxation also needs ATP: rigor mortis).</li>
<li><b>Malignant hyperthermia</b>: RyR1 (or CACNA1S) mutation → uncontrolled Ca²⁺ release with volatiles/suxamethonium → hypermetabolism. Dantrolene blocks RyR1.</li>
<li><b>Fibre types</b>: I (slow, oxidative, red, fatigue-resistant, posture), IIa (fast oxidative-glycolytic), IIx/b (fast glycolytic, white, fatigable). Diaphragm and adductor pollicis differ in sensitivity to NMB.</li>
<li><b>Muscle spindle</b> (in parallel, length, Ia and II afferents, γ efferents) drives the monosynaptic stretch reflex with reciprocal inhibition. <b>Golgi tendon organ</b> (in series, tension, Ib) inhibits its own muscle (autogenic inhibition).</li>
<li><b>Smooth muscle</b>: Ca²⁺–calmodulin activates myosin light-chain kinase; no troponin; NO → cGMP → relaxation.</li></ul>`,
p:"The knee jerk is the only true monosynaptic reflex: Ia afferent → α motor neuron (glutamate), with a glycinergic interneuron relaxing the hamstrings.",
v:"Draw the sarcomere with bands, then the twelve-step E–C coupling, then the reflex arc with spindle and tendon organ."},
];

const CALCS=[
 {t:"Cerebral perfusion pressure",c:"spo2",in:[["MAP mmHg","map",85],["ICP mmHg","icp",18],["CVP mmHg","cvp",8]],
  f:(v,fmt)=>{const cpp=v.map-Math.max(v.icp,v.cvp);return [["CPP mmHg",fmt(cpp,0),cpp<60?"bad":cpp>70?"warn":"ok"],["ICP status",v.icp>22?"Treat (> 22)":v.icp>15?"Raised":"Normal",v.icp>22?"bad":v.icp>15?"warn":"ok"],["MAP needed for CPP 60",fmt(60+Math.max(v.icp,v.cvp),0)]]},
  n:"CPP = MAP − ICP (use CVP if it exceeds ICP). BTF 2016: treat ICP > 22 mmHg; target CPP 60–70. Transduce MAP at the tragus (level of the foramen of Monro) when head-up."},
 {t:"Nernst equilibrium potential",c:"ecg",in:[["[Ion] outside mmol/L","o",5],["[Ion] inside mmol/L","i",140],["Valency z","z",1],["Temperature °C","t",37]],
  f:(v,fmt)=>{const E=8.314*(v.t+273.15)/(v.z*96485)*Math.log(v.o/v.i)*1000;return [["E mV",fmt(E,1)],["61.5·log rule",fmt(61.5*Math.log10(v.o/v.i)/v.z,1)]]},
  n:"Defaults are K⁺. Try Na⁺ (145 out, 12 in) ≈ +66 mV; Cl⁻ (110 out, 10 in, z = −1) ≈ −64 mV; Ca²⁺ (1.2 out, 0.0001 in, z = 2) ≈ +125 mV."},
 {t:"Goldman–Hodgkin–Katz membrane potential",c:"ecg",in:[["K⁺ out","ko",5],["K⁺ in","ki",140],["Na⁺ out","nao",145],["Na⁺ in","nai",12],["Cl⁻ out","clo",110],["Cl⁻ in","cli",10],["pNa/pK","pna",0.04],["pCl/pK","pcl",0.45]],
  f:(v,fmt)=>{const num=v.ko+v.pna*v.nao+v.pcl*v.cli,den=v.ki+v.pna*v.nai+v.pcl*v.clo,V=61.5*Math.log10(num/den);return [["Vm mV",fmt(V,1),V>-60?"warn":"ok"],["E<sub>K</sub> mV".replace(/<[^>]+>/g,""),fmt(61.5*Math.log10(v.ko/v.ki),1)]]},
  n:"At the peak of the AP pNa/pK rises to ~20: set pNa to 20 and Vm approaches +50 mV. Raise K⁺ out to 8 to see hyperkalaemic depolarisation."},
 {t:"Nerve conduction",c:"ecg",in:[["Fibre diameter µm","d",10],["Myelinated (1 yes, 0 no)","m",1],["Distance cm","x",50]],
  f:(v,fmt)=>{const vel=v.m?6*v.d:1.1*Math.sqrt(v.d);return [["Velocity m/s",fmt(vel,1)],["Latency ms",fmt(v.x/100/vel*1000,1)],["Likely class",v.m?(v.d>=12?"Aα":v.d>=5?"Aβ":v.d>=3?"Aγ/Aδ":"Aδ/B"):"C"]]},
  n:"Myelinated: v ≈ 6 m/s per µm (Hursh). Unmyelinated: v ∝ √d. A C fibre takes ~0.5 s to carry a signal 1 m: the delay between first and second pain."},
 {t:"Brain temperature and metabolism",c:"spo2",in:[["Core temperature °C","t",32]],
  f:(v,fmt)=>{const t=v.t;let pct=t>=27?100-(37-t)*7:30-(27-t)*2;pct=Math.max(5,Math.min(130,pct));return [["CMRO2 % of 37 °C",fmt(pct,0)],["Relative ischaemic tolerance ×",fmt(100/pct,1)]]},
  n:"About 7% per °C to ~30% at 27 °C, then ~10% at 17 °C. The basis of deep hypothermic circulatory arrest; not an outcome benefit in TBI."},
 {t:"Jugular bulb oximetry",c:"spo2",in:[["Hb g/dL","hb",12],["SaO2 %","sa",98],["SjvO2 %","sj",62]],
  f:(v,fmt)=>{const avd=1.34*v.hb*(v.sa-v.sj)/100,oer=(v.sa-v.sj)/v.sa;return [["AjvDO2 mL/dL",fmt(avd,1),avd>8?"bad":avd<4?"warn":"ok"],["Cerebral O2 extraction %",fmt(oer*100,0),oer>0.42?"bad":oer<0.24?"warn":"ok"],["SjvO2 reading",v.sj<50?"Ischaemia (< 50%)":v.sj>75?"Hyperaemia or infarction (> 75%)":"Normal 55–75%",v.sj<50?"bad":v.sj>75?"warn":"ok"]]},
  n:"Low SjvO2: CBF too low for demand (hypotension, hypocapnia, raised ICP). High SjvO2: hyperaemia, low metabolism, or dead tissue not extracting. Global measure only."},
 {t:"Plasma osmolality and osmotherapy",c:"nibp",in:[["Na⁺ mmol/L","na",140],["Glucose mmol/L","g",6],["Urea mmol/L","u",5],["Weight kg","w",75],["Mannitol dose g/kg","md",0.5],["Hypertonic saline %","hs",3],["HTS volume mL","hv",250]],
  f:(v,fmt)=>{const osm=2*v.na+v.g+v.u,manG=v.md*v.w,manMl=manG/0.2,mmolNa=v.hs*10/58.44*v.hv,osmLoad=2*mmolNa;return [["Osmolality mOsm/kg",fmt(osm,0),osm>320?"warn":"ok"],["Mannitol 20% mL",fmt(manMl,0)],["Mannitol osmoles",fmt(manG/182*1000,0)+" mOsm"],["HTS Na⁺ mmol",fmt(mmolNa,0)],["HTS osmoles",fmt(osmLoad,0)+" mOsm"]]},
  n:"Calculated osmolality = 2Na + glucose + urea. 3% NaCl = 513 mmol/L Na⁺. Stop mannitol if osmolality > 320 or osmolar gap > 20 (renal injury). Monitor Na⁺ with HTS (target usually 145–155)."},
 {t:"Glasgow Coma Scale",c:"spo2",in:[["Eye 1–4","e",3],["Verbal 1–5","vb",4],["Motor 1–6","m",5]],
  f:(v,fmt)=>{const g=v.e+v.vb+v.m;return [["GCS",g+"/15",g<=8?"bad":g<=12?"warn":"ok"],["TBI severity",g<=8?"Severe (≤ 8): secure airway":g<=12?"Moderate (9–12)":"Mild (13–15)",g<=8?"bad":g<=12?"warn":"ok"],["Motor score",v.m<=3?"Abnormal flexion/extension":"",v.m<=3?"bad":""]]},
  n:"Motor score is the best single predictor. Report as E3V4M5. Intubated: V = T."},
];

const TABLES=[
 ["CSF compared with plasma",["Variable","CSF","Plasma"],[["Volume / production","~150 mL; 0.35 mL/min (500 mL/day)","–"],["Osmolality","~290 mOsm/kg (equal)","~290"],["Na⁺","~140 (similar)","140"],["K⁺","2.8 (lower)","4.5"],["Cl⁻","~120 (higher)","100"],["Ca²⁺ (total)","1.1–1.2 (lower, ~half)","2.4"],["Mg²⁺","1.2 (higher)","0.9"],["HCO3⁻","~22 (similar/slightly lower)","24"],["Glucose","2.5–4.5 (~60–70% of plasma)","4–6"],["Protein","0.15–0.45 g/L (&lt; 1%)","60–80 g/L"],["PCO2","~6.5 kPa (higher)","5.3"],["pH","7.31–7.33 (lower)","7.40"],["Cells","&lt; 5 lymphocytes/mm³","–"],["Opening pressure","10–20 cmH2O lying","–"]]],
 ["CSF in meningitis",["","Bacterial","Viral","Tuberculous"],[["Appearance","Turbid","Clear","Clear or fibrin web"],["Cells","Neutrophils, high","Lymphocytes","Lymphocytes (mixed early)"],["Protein","↑↑","N/↑","↑↑"],["Glucose (CSF:plasma)","&lt; 0.4","Normal","&lt; 0.5"],["Lactate","↑","Normal","↑"]]],
 ["Spinal cord syndromes",["Syndrome","Cause","Deficit"],[["Brown-Séquard (hemisection)","Penetrating injury, tumour","Ipsilateral weakness and loss of vibration/proprioception; contralateral loss of pain and temperature from 1–2 levels below"],["Anterior cord","Anterior spinal artery ischaemia (aortic surgery, hypotension, epidural haematoma), flexion injury","Bilateral paralysis and loss of pain/temperature; dorsal columns spared"],["Central cord","Hyperextension in a stenotic neck (elderly)","Arms weaker than legs, cape-like loss of pain/temperature, sacral sparing"],["Posterior cord","B12 deficiency, tabes, posterior artery infarct","Loss of vibration and proprioception, sensory ataxia; power preserved"],["Conus / cauda equina","Disc, tumour, haematoma, spinal anaesthesia complications","Saddle anaesthesia, bladder and bowel dysfunction, LMN leg weakness (cauda: asymmetrical)"]]],
 ["Neurotransmitter receptors and anaesthetic drugs",["Receptor","Type","Main drugs"],[["GABA<sub>A</sub>","Cl⁻ channel (pentamer)","Propofol, thiopentone, etomidate, benzodiazepines, volatiles, alcohol"],["NMDA","Ca²⁺/Na⁺ channel, Mg²⁺ block, glycine co-agonist","Ketamine, N2O, xenon, Mg²⁺, methadone, dextromethorphan"],["Glycine","Cl⁻ channel","Volatiles potentiate; strychnine blocks"],["α2-adrenoceptor","Gi","Clonidine, dexmedetomidine"],["μ, δ, κ, NOP opioid","Gi (↓cAMP, ↑K⁺, ↓Ca²⁺)","Morphine, fentanyl, oxycodone; naloxone antagonises"],["5-HT3","Cation channel","Ondansetron (antagonist)"],["D2","Gi","Droperidol, haloperidol, metoclopramide, prochlorperazine"],["H1","Gq","Cyclizine, chlorphenamine"],["Muscarinic (M1–M5)","Gq (M1, M3, M5), Gi (M2, M4)","Atropine, glycopyrrolate, hyoscine"],["Nicotinic N<sub>M</sub> (muscle)","Cation channel","Suxamethonium, rocuronium, atracurium"]]],
 ["Autonomic effects on organs",["Organ","Sympathetic","Parasympathetic"],[["Heart","↑HR, ↑contractility, ↑conduction (β1)","↓HR, ↓AV conduction (M2)"],["Arterioles","Constrict (α1); dilate in muscle (β2)","Little direct innervation (endothelial M3 → NO)"],["Bronchi","Dilate (β2, circulating adrenaline)","Constrict, ↑secretions (M3)"],["Eye","Mydriasis (α1, radial muscle)","Miosis (sphincter), accommodation (ciliary)"],["Gut","↓Motility, sphincters contract","↑Motility, sphincters relax, ↑secretion"],["Bladder","Detrusor relaxes (β3), sphincter contracts (α1)","Detrusor contracts, sphincter relaxes"],["Liver","Glycogenolysis, gluconeogenesis (α1, β2)","Glycogen synthesis"],["Sweat glands","Secretion (sympathetic cholinergic M3)","–"],["Kidney","Renin release (β1)","–"]]],
 ["EEG frequency bands",["Band","Hz","Seen in"],[["Delta","0.5–4","N3 sleep, deep anaesthesia, infants, structural lesions"],["Theta","4–8","Drowsiness, children, N1, ketamine"],["Alpha","8–13","Awake relaxed with eyes closed (occipital); frontal alpha under propofol/volatile"],["Beta","13–30","Awake, alert; benzodiazepines; paradoxical excitation at induction"],["Gamma","&gt; 30","Cognitive processing; ketamine"],["Spindles","12–15","N2 sleep; dexmedetomidine"]]],
 ["Myasthenia gravis vs Lambert–Eaton",["","Myasthenia gravis","Lambert–Eaton"],[["Target","Postsynaptic AChR (or MuSK)","Presynaptic P/Q voltage-gated Ca²⁺ channel"],["Association","Thymoma, thymic hyperplasia","Small cell lung cancer (~50%)"],["Weakness","Ocular, bulbar; worse with exercise","Proximal limbs; improves briefly with exercise; autonomic features"],["Suxamethonium","Resistant (need 1.5–2 mg/kg)","Sensitive"],["Non-depolarisers","Very sensitive","Very sensitive"],["Treatment","Pyridostigmine, steroids, IVIg, plasma exchange, thymectomy","3,4-Diaminopyridine, treat cancer"]]],
 ["Brainstem tests and cranial nerves",["Test","Afferent","Efferent"],[["Pupillary light reflex","II","III"],["Corneal reflex","V","VII"],["Oculovestibular (caloric)","VIII","III, IV, VI"],["Motor response to central pain","V","VII"],["Gag","IX","X"],["Cough to suction","X","X (and phrenic/intercostal effort)"],["Apnoea test","Medullary chemoreceptors","Respiratory muscles"]]],
];

const CARDS=[
 ["brain","Normal global CBF?","≈ 50 mL/100 g/min (≈ 750 mL/min, 15% of CO)."],
 ["brain","Normal CMRO2?","≈ 3–3.5 mL/100 g/min (≈ 50 mL/min, 20% of total VO2)."],
 ["brain","CBF at which the EEG becomes isoelectric?","≈ 15–18 mL/100 g/min; membrane failure and cell death below ~10."],
 ["brain","Classic autoregulation range?","CPP ~50/60 to 150/160 mmHg; shifted right in chronic hypertension."],
 ["brain","CBF response to PaCO2?","≈ 3–4% per mmHg (≈ 25–30% per kPa) between ~3 and 10 kPa; doubles at 10.6 kPa."],
 ["brain","PaO2 below which CBF rises?","≈ 7–8 kPa."],
 ["brain","CMRO2 change per °C?","≈ 6–7% per °C."],
 ["brain","Monro–Kellie doctrine?","In a rigid skull, an increase in brain, blood or CSF volume must be offset by a fall in another or ICP rises."],
 ["brain","First compensation for an expanding mass?","Venous blood squeezed from the sinuses, then CSF displaced into the spinal sac."],
 ["brain","ICP treatment threshold in severe TBI?","> 22 mmHg (BTF 2016)."],
 ["brain","CPP target in severe TBI?","60–70 mmHg."],
 ["brain","Meaning of P2 > P1 on the ICP waveform?","Reduced intracranial compliance."],
 ["brain","Lundberg A waves?","Plateau waves to 50–100 mmHg for 5–20 min: always pathological."],
 ["brain","Cushing's triad?","Hypertension, bradycardia, irregular respiration."],
 ["brain","CSF production rate?","≈ 0.35 mL/min, ~500 mL/day."],
 ["brain","CSF volume?","≈ 150 mL."],
 ["brain","CSF pH compared with plasma?","Lower: ~7.32 (higher PCO2, less buffering)."],
 ["brain","Which ions are higher in CSF than plasma?","Cl⁻ and Mg²⁺."],
 ["brain","Name four circumventricular organs.","Area postrema, posterior pituitary, median eminence, pineal, OVLT, subfornical organ."],
 ["brain","Which induction agent increases CBF?","Ketamine."],
 ["brain","Effect of volatiles on CBF and CMRO2?","CBF ↑ (vasodilatation), CMRO2 ↓: flow–metabolism uncoupling."],
 ["brain","2025 UK apnoea test end-point?","PaCO2 ≥ 8.0 kPa, pH < 7.30 and a rise ≥ 2.7 kPa, minimum 5 minutes."],
 ["brain","Minimum temperature for brainstem testing?","Core temperature > 34 °C."],
 ["brain","Oculovestibular test volume?","50 mL ice-cold water into each ear over 1 minute."],
 ["neuro","Nernst potential for K⁺?","≈ −90 to −95 mV."],
 ["neuro","Nernst potential for Na⁺?","≈ +60 to +65 mV."],
 ["neuro","Nerve threshold potential?","≈ −55 mV."],
 ["neuro","Why doesn't the AP reach E<sub>Na</sub>?".replace(/<[^>]+>/g,""),"Na⁺ channels inactivate and K⁺ channels open before equilibrium is reached."],
 ["neuro","Absolute refractory period in a nerve?","≈ 1 ms (Na⁺ channels inactivated)."],
 ["neuro","What is saltatory conduction?","APs jumping between nodes of Ranvier in myelinated fibres."],
 ["neuro","Conduction velocity of a 10 µm myelinated fibre?","≈ 60 m/s (≈ 6 m/s per µm)."],
 ["neuro","Fibres most sensitive to local anaesthetic?","B (preganglionic sympathetic), then C and Aδ, then Aβ, then Aα."],
 ["neuro","Fibres carrying fast sharp pain?","Aδ."],
 ["neuro","Fibres carrying slow burning pain?","C (unmyelinated)."],
 ["neuro","NMDA receptor requirements to open?","Glutamate, glycine co-agonist and depolarisation to remove the Mg²⁺ block."],
 ["neuro","Main inhibitory transmitter in the spinal cord?","Glycine (and GABA)."],
 ["neuro","Where do dorsal column fibres cross?","Medulla (internal arcuate fibres)."],
 ["neuro","Where do spinothalamic fibres cross?","Within 1–2 segments of entry, in the anterior white commissure."],
 ["neuro","Blood supply of the anterior 2/3 of the cord?","Anterior spinal artery."],
 ["neuro","Usual level of the artery of Adamkiewicz?","T9–T12 on the left (range T8–L2)."],
 ["neuro","Brown-Séquard syndrome?","Ipsilateral motor and dorsal column loss; contralateral pain and temperature loss."],
 ["neuro","Spinal shock vs neurogenic shock?","Spinal: areflexia below the lesion. Neurogenic: hypotension and bradycardia from sympathetic loss (above T6)."],
 ["neuro","EEG alpha band?","8–13 Hz: awake, eyes closed."],
 ["neuro","EEG signature of propofol surgical anaesthesia?","Frontal alpha (~10 Hz) with slow-delta waves."],
 ["neuro","BIS range for general anaesthesia?","40–60."],
 ["neuro","Which agents make BIS unreliable?","Ketamine and nitrous oxide (also EMG, hypothermia, neurological disease)."],
 ["neuro","ILAE time point for treating status epilepticus?","5 minutes (t1); injury risk from 30 minutes (t2)."],
 ["neuro","Sensory supply of the larynx above the cords?","Internal branch of the superior laryngeal nerve (X)."],
 ["neuro","Only intrinsic laryngeal muscle not supplied by the RLN?","Cricothyroid (external branch of the SLN)."],
 ["neuro","Sensation to the posterior third of the tongue?","Glossopharyngeal nerve (IX)."],
 ["pain","Four processes of nociception?","Transduction, transmission, modulation, perception."],
 ["pain","Where do C fibres terminate in the dorsal horn?","Lamina II (substantia gelatinosa) and lamina I."],
 ["pain","Gate control theory?","Aβ input excites inhibitory interneurons in the substantia gelatinosa that reduce C-fibre transmission."],
 ["pain","Key nuclei of descending inhibition?","Periaqueductal grey → rostral ventromedial medulla (5-HT) and locus coeruleus (NA)."],
 ["pain","What is wind-up?","Progressive increase in dorsal horn response to repeated C-fibre input, NMDA dependent."],
 ["pain","Define allodynia.","Pain from a stimulus that is not normally painful."],
 ["pain","IASP definition of neuropathic pain?","Pain caused by a lesion or disease of the somatosensory nervous system."],
 ["pain","Mechanisms of opioid-induced hyperalgesia?","NMDA activation, glial activation, descending facilitation, receptor changes."],
 ["ans","Sympathetic outflow levels?","T1–L2 (lateral horn)."],
 ["ans","Cranial nerves carrying parasympathetic fibres?","III, VII, IX, X."],
 ["ans","Rate-limiting enzyme in catecholamine synthesis?","Tyrosine hydroxylase."],
 ["ans","Enzyme converting noradrenaline to adrenaline?","PNMT (in the adrenal medulla, induced by cortisol)."],
 ["ans","G-protein of α1, α2 and β receptors?","α1 Gq, α2 Gi, β Gs."],
 ["ans","Transmitter at sympathetic postganglionic fibres to sweat glands?","Acetylcholine (muscarinic)."],
 ["ans","Components of Horner's syndrome?","Ptosis, miosis, anhidrosis (and enophthalmos)."],
 ["nmj","Width of the neuromuscular synaptic cleft?","≈ 50 nm."],
 ["nmj","Subunits of the adult muscle nAChR?","α2βδε (fetal: γ instead of ε)."],
 ["nmj","How many ACh molecules in one quantum?","≈ 5000–10 000."],
 ["nmj","What is a MEPP?","Miniature end-plate potential (~0.5–1 mV) from spontaneous release of one vesicle."],
 ["nmj","Margin of safety of neuromuscular transmission?","Twitch falls only after ~70–75% receptor occupancy; abolished at ~90–95%."],
 ["nmj","Cause of fade with non-depolarising block?","Block of prejunctional α3β2 nAChRs that mobilise ACh."],
 ["nmj","Normal K⁺ rise after suxamethonium?","≈ 0.5 mmol/L."],
 ["nmj","When does suxamethonium become dangerous after a burn?","From ~24–48 h, for up to a year or more."],
 ["nmj","Myasthenia: response to suxamethonium?","Resistant; non-depolarisers have an exaggerated effect."],
 ["nmj","Lambert–Eaton target antigen?","Presynaptic P/Q-type voltage-gated Ca²⁺ channels."],
 ["nmj","Skeletal muscle E–C coupling link?","DHPR (L-type voltage sensor) mechanically opens RyR1."],
 ["nmj","Which band stays constant during contraction?","A band (length of myosin)."],
 ["nmj","Muscle spindle afferent fibres?","Ia (annulospiral, dynamic) and II (flower-spray, static)."],
 ["nmj","Golgi tendon organ afferent?","Ib, in series with muscle, senses tension."],
];

const FCF={all:"All",brain:"Brain & ICP",neuro:"Neurons & cord",pain:"Pain",ans:"Autonomic",nmj:"NMJ & muscle"};

const VIVA=[
 {st:"SOE 1 · Physiology",q:"What factors affect cerebral blood flow? Draw the relevant graphs.",a:["Numbers: CBF 50, CMRO2 3.3, 15% of CO.","CPP = MAP − ICP; autoregulation curve with hypertensive shift.","PaCO2 (sigmoid, doubles at ~10.6 kPa) and PaO2 (rises below ~8 kPa) graphs.","Flow–metabolism coupling, temperature, viscosity, neurogenic, drugs.","Clinical: TBI management, hyperventilation limits, inverse steal."],fu:"Why does hyperventilation lose its effect on ICP after several hours?"},
 {st:"SOE 1 · Physiology",q:"Describe CSF: production, flow, composition and function. Explain the Monro–Kellie doctrine and how ICP is monitored.",a:["Production 0.35 mL/min by choroid plexus; volume 150 mL.","Circulation path and absorption via arachnoid granulations.","Composition vs plasma (Classify table).","Monro–Kellie with pressure–volume curve and compensation order.","Monitoring: intraventricular (gold standard, allows drainage), intraparenchymal fibre-optic, subdural; waveform P1–P3; Lundberg waves."],fu:"What is the role of CSF in the control of breathing?"},
 {st:"SOE 1 · Physiology",q:"Describe the EEG: the waves awake, in deep sleep and under anaesthesia. What is BIS and what is burst suppression?",a:["Origin: summed postsynaptic potentials of pyramidal cells, thalamocortical rhythms.","Bands with frequencies and states.","Sleep stages (spindles, K-complexes, delta).","Anaesthesia sequence: beta excitation → frontal alpha + slow → burst suppression → isoelectric.","BIS: derivation, 40–60 target, limitations; burst suppression and suppression ratio; uses (ICP, status)."],fu:"Why can a patient on ketamine have a BIS of 80 while unconscious?"},
 {st:"SOE 4 · Critical care",q:"A 25-year-old with isolated head injury, GCS 6, left pupil dilated. Outline your management.",a:["ABCDE with C-spine; RSI with haemodynamic stability; avoid hypoxia and hypotension.","Targets: PaO2, PaCO2 4.5–5.0, MAP/CPP, glucose, Na⁺, temperature, head-up.","Treat suspected herniation: osmotherapy, brief hyperventilation as a bridge, urgent CT and neurosurgery.","ICP monitoring and tiered therapy.","Secondary injury prevention, seizures, VTE, nutrition; prognosis."],fu:"Mannitol or hypertonic saline: which and why?"},
 {st:"SOE 4 · Critical care",q:"How is death diagnosed using neurological criteria in the UK?",a:["Preconditions and exclusions with numbers (temperature > 34 °C etc.).","Brainstem reflex tests and the cranial nerves tested.","Apnoea test: 2025 thresholds (PaCO2 ≥ 8.0, pH < 7.30, rise ≥ 2.7 kPa, ≥ 5 min).","Who tests, two sets, time of death; ancillary tests.","Physiology after brainstem death and donor optimisation."],fu:"Why might spinal reflexes still be present after brainstem death?"},
 {st:"SOE 1 · Physiology",q:"What is the resting membrane potential? Describe the nerve action potential and how it propagates.",a:["Definition, ionic gradients, K⁺ leak, Na⁺/K⁺ pump, Gibbs–Donnan.","Nernst and Goldman equations with values.","AP phases with channels; all-or-none; refractory periods.","Propagation: local currents, myelin, saltatory conduction, velocity ∝ diameter.","Fibre classification and local anaesthetic mechanism."],fu:"What happens to nerve excitability in hyperkalaemia?"},
 {st:"SOE 1 · Physiology",q:"Describe the pain pathway and how pain is modulated. Where do analgesics act?",a:["Transduction (receptors, inflammatory mediators).","Transmission: Aδ and C, dorsal horn laminae, transmitters.","Ascending tracts to thalamus and cortex; affective pathways.","Modulation: gate control, descending inhibition, central sensitisation.","Drug sites: periphery (NSAIDs, LA), dorsal horn (opioids, ketamine, gabapentinoids, α2), descending (TCAs, SNRIs, tramadol), cortex."],fu:"What is the difference between primary and secondary hyperalgesia?"},
 {st:"SOE 3 · Anaesthesia",q:"A patient on 260 mg/day oxycodone needs a hepatectomy. How do chronic opioids change physiology and how will you manage analgesia?",a:["Tolerance (receptor desensitisation), dependence, OIH, endocrine (hypogonadism, adrenal), immune effects.","Preop: confirm dose, continue baseline, plan with pain team, consider methadone/buprenorphine issues.","Intraop: ketamine infusion, lidocaine, dexmedetomidine; regional (epidural if coagulation allows; TAP/rectus sheath catheters); higher opioid doses.","Postop: baseline plus PCA with higher bolus, multimodal; avoid NSAIDs if renal/hepatic risk; watch withdrawal and respiratory depression.","Non-technical skills: communication with the patient and team."],fu:"Can neuraxial anaesthesia be used after a major liver resection?"},
 {st:"SOE 1 · Physiology",q:"Compare the sympathetic and parasympathetic nervous systems.",a:["Outflows, ganglia, fibre lengths, transmitters, receptors.","Catecholamine synthesis and removal.","Receptor subtypes, G-proteins and organ effects.","Adrenal medulla; sympathetic cholinergic fibres.","Clinical: autonomic neuropathy testing, stellate block, spinal anaesthesia, dysreflexia."],fu:"Why does a high spinal cause bradycardia?"},
 {st:"SOE 2 · Pharmacology",q:"Describe the neuromuscular junction and the events of neuromuscular transmission.",a:["Structure with diagram.","ACh synthesis, storage, release (Ca²⁺, SNAREs), breakdown.","Receptor structure (α2βδε) and channel opening; MEPP, EPP, AP.","Pre-, post- and extra-junctional receptors; margin of safety; fade.","Clinical: NMB monitoring, MG, LEMS, denervation and suxamethonium."],fu:"Why are burns patients resistant to rocuronium but sensitive to suxamethonium?"},
 {st:"SOE 3 · Anaesthesia",q:"A 10-year-old boy with Duchenne muscular dystrophy needs scoliosis surgery. Discuss.",a:["Pathophysiology: dystrophin absence, progressive weakness, X-linked.","Cardiomyopathy and conduction defects; restrictive lung disease, weak cough; aspiration risk.","Suxamethonium contraindicated (hyperkalaemic arrest, rhabdomyolysis); avoid volatiles (TIVA), sensitivity to NDMR.","Spinal surgery issues: blood loss, prone positioning, spinal cord monitoring, postoperative ventilation and NIV.","Postop: HDU/ICU, physiotherapy, analgesia."],fu:"What would you do if he became hyperkalaemic and bradycardic after induction?"},
 {st:"SOE 1 · Physiology",q:"Describe the anatomy of the spinal cord and the effects of acute spinal cord injury.",a:["Extent, meninges, cross-section and tracts.","Blood supply and the artery of Adamkiewicz.","Syndromes (Brown-Séquard, anterior, central, posterior).","Acute injury by system and level (C3–5, T1–4, T6).","Spinal vs neurogenic shock, autonomic dysreflexia, suxamethonium timing."],fu:"What are the triggers and management of autonomic dysreflexia under anaesthesia?"},
 {st:"SOE 4 · Critical care",q:"Define status epilepticus. Describe the pathophysiology and management.",a:["Definition (5 and 30 minutes).","Glutamate–GABA imbalance; receptor trafficking explains benzodiazepine resistance.","Systemic effects.","Timed treatment ladder with doses.","Causes in theatre and ICU; EEG monitoring; non-convulsive status."],fu:"Why are benzodiazepines less effective as status continues?"},
 {st:"SOE 1 · Physiology",q:"Describe the cranial nerves, with the nerve supply of the tongue, pharynx and larynx.",a:["List I–XII with one anaesthetic link each.","Tongue sensory and motor supply.","Pharynx sensory and motor supply.","Larynx: SLN internal and external branches, RLN.","Clinical: airway blocks, RLN palsy, oculocardiac reflex."],fu:"How would you anaesthetise the airway for an awake fibreoptic intubation?"},
];

const QUIZ=[
 ["Cerebral blood flow",[["Is about 50 mL/100 g/min",1,""],["Is higher in white than grey matter",0,"Grey ~70–80, white ~20."],["Increases about 3–4% per mmHg rise in PaCO2",1,""],["Rises steeply when PaO2 falls below 13 kPa",0,"Below about 7–8 kPa."],["Is reduced by hypothermia",1,"CMRO2 falls ~7%/°C with coupled flow."]]],
 ["Cerebrospinal fluid",[["Is produced at about 500 mL per day",1,""],["Has a higher protein concentration than plasma",0,"Less than 1% of plasma."],["Has a higher chloride concentration than plasma",1,""],["Has a pH higher than arterial blood",0,"Lower, about 7.32."],["Is absorbed through arachnoid granulations",1,""]]],
 ["Intracranial pressure",[["Normal adult supine ICP is 5–15 mmHg",1,""],["Lundberg A waves are a normal finding",0,"Always pathological."],["P2 greater than P1 suggests reduced compliance",1,""],["The first compensation for a mass is loss of arterial blood volume",0,"Venous blood and CSF are displaced first."],["CPP = MAP − ICP",1,""]]],
 ["Effects of anaesthetic agents",[["Propofol reduces both CMRO2 and CBF",1,""],["Volatile agents uncouple flow and metabolism",1,""],["Ketamine reduces CBF",0,"It increases CBF."],["Nitrous oxide increases CMRO2",1,""],["Thiopentone abolishes CO2 reactivity",0,"CO2 reactivity is preserved."]]],
 ["Death using neurological criteria (UK 2025 Code)",[["Core temperature must be above 34 °C",1,""],["The corneal reflex tests cranial nerves V and VII",1,""],["The apnoea test end-point is a PaCO2 rise of 0.5 kPa",0,"2025 Code: rise ≥ 2.7 kPa to ≥ 8.0 kPa with pH < 7.30."],["Spinal reflexes exclude the diagnosis",0,"Spinal reflexes can persist."],["One of the two doctors must be a consultant",1,""]]],
 ["Resting membrane potential",[["Is close to the K⁺ equilibrium potential",1,""],["Is about −70 mV in neurons",1,""],["Becomes less negative in hyperkalaemia",1,""],["Is mainly generated by the Na⁺/K⁺ pump directly",0,"Mainly K⁺ leak; the pump maintains gradients and adds only a few mV."],["The Nernst potential for Na⁺ is about −60 mV",0,"About +60 mV."]]],
 ["Nerve fibres",[["Aδ fibres carry fast, sharp pain",1,""],["C fibres are myelinated",0,"Unmyelinated."],["B fibres are preganglionic autonomic",1,""],["Conduction velocity in myelinated fibres is proportional to diameter",1,""],["Motor fibres are blocked first by local anaesthetic",0,"Usually last; sympathetic fibres first."]]],
 ["The spinal cord",[["Ends at L1–L2 in adults",1,""],["Dorsal columns carry pain and temperature",0,"Fine touch, vibration, proprioception."],["Spinothalamic fibres cross within one or two segments",1,""],["The anterior spinal artery supplies the anterior two-thirds",1,""],["Anterior cord syndrome spares proprioception",1,"Dorsal columns are supplied by the posterior arteries."]]],
 ["Pain physiology",[["C fibres terminate mainly in lamina II",1,""],["Gate control involves inhibitory interneurons in the substantia gelatinosa",1,""],["Wind-up depends on NMDA receptors",1,""],["Allodynia is increased pain from a painful stimulus",0,"That is hyperalgesia; allodynia is pain from a non-painful stimulus."],["The periaqueductal grey is part of descending inhibition",1,""]]],
 ["The autonomic nervous system",[["Sympathetic preganglionic neurons arise from T1–L2",1,""],["All sympathetic postganglionic fibres release noradrenaline",0,"Sweat glands are cholinergic."],["Ganglionic transmission is nicotinic",1,""],["α2 receptors are coupled to Gs",0,"Gi."],["PNMT converts noradrenaline to adrenaline",1,""]]],
 ["The neuromuscular junction",[["The adult receptor contains two α subunits",1,""],["The fetal receptor contains an ε subunit",0,"Fetal has γ; adult ε."],["ACh release depends on calcium entry",1,""],["Twitch height falls only after about 70% of receptors are occupied",1,""],["Acetylcholinesterase sits on the crests of the junctional folds",0,"In the clefts (troughs); receptors are on the crests."]]],
 ["Suxamethonium hyperkalaemia is a risk in",[["Burns at 72 hours",1,""],["Spinal cord injury within the first 12 hours",0,"Risk starts after ~24–72 h."],["Duchenne muscular dystrophy",1,""],["Prolonged ICU immobilisation",1,""],["Myasthenia gravis",0,"Myasthenics are resistant; hyperkalaemia is not the issue."]]],
 ["The EEG",[["Alpha rhythm is 8–13 Hz",1,""],["Sleep spindles characterise N3 sleep",0,"N2 sleep; N3 is slow-wave."],["Propofol anaesthesia produces frontal alpha oscillations",1,""],["Ketamine reliably lowers the BIS",0,"BIS often stays high."],["Burst suppression can be caused by hypothermia",1,""]]],
 ["Skeletal muscle",[["The A band shortens during contraction",0,"The A band stays constant."],["Calcium binds to troponin C",1,""],["RyR1 mutations cause malignant hyperthermia susceptibility",1,""],["Golgi tendon organs lie in parallel with muscle fibres",0,"In series; spindles are in parallel."],["Relaxation requires ATP",1,""]]],
];

const CRISIS=[
 ["Raised ICP with signs of herniation","spo2",["Recognise: falling GCS, unilateral fixed dilated pupil, Cushing's response, extensor posturing.","Secure the airway (RSI with haemodynamic stability); SpO2 > 94%, PaCO2 4.5–5.0 kPa.","Raise MAP to CPP ≥ 60–70; head-up 30°, neck neutral, release tight ties.","Osmotherapy now: mannitol 0.5–1 g/kg or hypertonic saline (e.g. 3% 250 mL / 5% 2 mL/kg).","Brief hyperventilation to PaCO2 ~4.0 kPa only as a bridge to theatre or CT.","Urgent CT and neurosurgery (evacuation, EVD, decompressive craniectomy); deepen sedation; treat seizures and fever."],"Hyperventilation lowers ICP by vasoconstriction, but also lowers CBF: use it briefly."],
 ["Status epilepticus","ecg",["ABC, O2, check glucose; IV access, bloods (Na⁺, Ca²⁺, Mg²⁺, drug levels).","0–5 min: lorazepam 4 mg IV (0.1 mg/kg), repeat once; or midazolam 10 mg buccal/IM.","~20 min: levetiracetam 60 mg/kg (max 4.5 g) or valproate 40 mg/kg or phenytoin 20 mg/kg.","~40 min: RSI and GA with propofol or thiopentone, midazolam infusion; ICU; EEG to target burst suppression.","Treat cause: hypoglycaemia, hyponatraemia, LA toxicity (lipid), eclampsia (Mg²⁺), alcohol (thiamine)."],"GABA<sub>A</sub> receptors are internalised as seizures continue, so early benzodiazepine is key."],
 ["Autonomic dysreflexia under anaesthesia","etco2",["Suspect in cord lesions above T6 (more common in lesions above T6, after spinal shock has resolved).","Signs: sudden severe hypertension, reflex bradycardia, flushing and sweating above the lesion, pallor below.","Remove the trigger: stop surgical stimulus, check bladder (catheter), bowel, positioning.","Deepen anaesthesia; spinal or epidural blocks prevent it.","Fast-acting antihypertensives: GTN, labetalol, hydralazine, nifedipine; treat arrhythmias.","Watch for complications: pulmonary oedema, stroke, myocardial ischaemia."],"Stimulus below the lesion triggers unopposed spinal sympathetic reflexes; descending inhibition cannot reach them."],
 ["Suxamethonium-induced hyperkalaemic arrest","nibp",["Suspect after suxamethonium in burns, denervation, immobility, myopathy (especially undiagnosed muscular dystrophy in young boys).","Start ALS if in arrest; peaked T, wide QRS, VF/asystole.","Calcium chloride 10% 10 mL, repeat; insulin 10 units with glucose; salbutamol; bicarbonate.","Hyperventilate; consider dialysis; prolonged CPR is justified while K⁺ is corrected.","Check CK and for myoglobinuria; consider MH if rigidity and rising EtCO2."],"Extrajunctional receptors spread over the whole membrane, so the whole muscle leaks K⁺."],
 ["Acute high spinal cord injury","abp",["Airway with manual in-line stabilisation; suxamethonium is safe in the first 24–72 h.","Expect bradycardia (loss of T1–T4) and hypotension (neurogenic shock): atropine/glycopyrrolate, vasopressors (noradrenaline), cautious fluids.","MAP target ~85–90 mmHg for 5–7 days is often used to protect cord perfusion.","Ventilation: C3–5 lesions lose the diaphragm; even lower cervical lesions lose intercostals and cough; plan early ICU.","Watch for vagal arrest with suction, ileus, aspiration, hypothermia, VTE."],"Above T6 the sympathetic chain is cut off from the brain: vasodilatation without compensatory tachycardia."],
 ["Organ donor after neurological death","spo2",["Catecholamine storm: short-acting β-blockers or vasodilators only if severe.","Vasoplegia: restore volume; vasopressin (0.5–2.4 units/h) first, noradrenaline if needed; MAP 60–80 mmHg.","Diabetes insipidus: urine > 3–4 mL/kg/h with rising Na⁺: desmopressin, replace losses with hypotonic fluid.","Methylprednisolone 15 mg/kg; insulin to keep glucose 4–10; warm to > 36 °C.","Lung protective ventilation, recruitment, bronchoscopy; correct coagulopathy for retrieval."],"Loss of hypothalamic–pituitary function and brainstem vasomotor control explains DI, hypothermia and vasoplegia."],
];

const SRC="";
const ERR="";
const REFS="";

const DIAG=`<div class="grid2">
 <div class="fig"><h3>Nerve action potential and membrane potential</h3>
  <div class="ctl">
   <label>Plasma K⁺ mmol/L <input type="range" id="na-k" min="2" max="10" step="0.1" value="4.5"><output id="na-k-o"></output></label>
   <label>Na⁺ channel block (local anaesthetic) % <input type="range" id="na-b" min="0" max="100" step="1" value="0"><output id="na-b-o"></output></label>
   <label>Temperature °C <input type="range" id="na-t" min="28" max="40" step="0.5" value="37"><output id="na-t-o"></output></label></div>
  <div class="svgbox"><svg id="na" viewBox="0 0 520 300" role="img" aria-label="Nerve action potential"></svg></div>
  <div class="readout" id="na-r"></div></div>

 <div class="fig"><h3>Cerebral autoregulation</h3>
  <div class="seg" id="au-sel"></div>
  <div class="ctl"><label>MAP mmHg <input type="range" id="au-m" min="20" max="200" step="1" value="90"><output id="au-m-o"></output></label></div>
  <div class="svgbox"><svg id="au" viewBox="0 0 520 300" role="img" aria-label="Cerebral autoregulation curve"></svg></div>
  <div class="readout" id="au-r"></div></div>

 <div class="fig"><h3>CBF against PaCO2 and PaO2</h3>
  <div class="ctl"><label>PaCO2 kPa <input type="range" id="cg-c" min="2" max="12" step="0.1" value="5.3"><output id="cg-c-o"></output></label>
   <label>PaO2 kPa <input type="range" id="cg-o" min="3" max="20" step="0.1" value="13"><output id="cg-o-o"></output></label>
   <div class="seg" id="cg-sel"></div></div>
  <div class="svgbox"><svg id="cg" viewBox="0 0 520 300" role="img" aria-label="CBF versus PaCO2 and PaO2"></svg></div>
  <div class="readout" id="cg-r"></div></div>

 <div class="fig"><h3>Intracranial pressure–volume curve and ICP waveform</h3>
  <div class="ctl"><label>Added intracranial volume mL <input type="range" id="ic-v" min="0" max="45" step="1" value="0"><output id="ic-v-o"></output></label>
   <label>MAP mmHg <input type="range" id="ic-m" min="50" max="130" step="1" value="90"><output id="ic-m-o"></output></label></div>
  <div class="svgbox"><svg id="ic" viewBox="0 0 520 420" role="img" aria-label="ICP volume curve and waveform"></svg></div>
  <div class="readout" id="ic-r"></div></div>

 <div class="fig"><h3>Anaesthetic agents: CBF against CMRO2</h3>
  <div class="svgbox"><svg id="cm" viewBox="0 0 520 330" role="img" aria-label="CBF versus CMRO2 by agent"></svg></div>
  <p class="src">Approximate relative changes from awake baseline at typical anaesthetic doses (volatiles ~1 MAC). The dashed line is flow–metabolism coupling; points above it are luxury perfusion.</p></div>

 <div class="fig"><h3>EEG states</h3>
  <div class="seg" id="ee-sel"></div>
  <div class="svgbox"><svg id="ee" viewBox="0 0 520 220" role="img" aria-label="EEG trace"></svg></div>
  <div class="readout" id="ee-r"></div></div>

 <div class="fig" style="grid-column:1/-1"><h3>Pain pathway and where analgesics act</h3>
  <div class="seg" id="pp-sel"></div>
  <div class="svgbox"><svg id="pp" viewBox="0 0 900 400" role="img" aria-label="Pain pathway schematic"></svg></div>
  <div class="readout" id="pp-r"></div></div>

 <div class="fig"><h3>Spinal cord cross-section and lesions</h3>
  <div class="seg" id="sc-sel"></div>
  <div class="svgbox"><svg id="sc" viewBox="0 0 520 330" role="img" aria-label="Spinal cord cross-section"></svg></div>
  <div class="readout" id="sc-r"></div></div>

 <div class="fig"><h3>Receptor occupancy, train-of-four and tetanus</h3>
  <div class="seg" id="tf-sel"></div>
  <div class="ctl"><label>Postjunctional receptors blocked % <input type="range" id="tf-o" min="0" max="100" step="1" value="0"><output id="tf-o-o"></output></label></div>
  <div class="svgbox"><svg id="tf" viewBox="0 0 520 260" role="img" aria-label="Train of four"></svg></div>
  <div class="readout" id="tf-r"></div></div>
</div>`;

function initDiagrams(){
 const out=(id,t)=>{const o=$("#"+id+"-o");if(o)o.textContent=t};
 const mk=svg=>(t,a,tx)=>{const e=document.createElementNS(SVGNS,t);for(const k in a)e.setAttribute(k,a[k]);if(tx!=null)e.textContent=tx;svg.append(e);return e};
 const smooth=(x,a,b)=>{const t=Math.min(1,Math.max(0,(x-a)/(b-a)));return t*t*(3-2*t)};
 const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));

 /* 1. Nerve AP */
 function drawNA(){const K=+$("#na-k").value,B=+$("#na-b").value,T=+$("#na-t").value;out("na-k",K.toFixed(1));out("na-b",B+"%");out("na-t",T.toFixed(1));
  const f=61.5*(T+273)/310,num=K+0.04*145+0.45*10,den=140+0.04*12+0.45*110,Vr=f*Math.log10(num/den);
  const h=1/(1+Math.exp((Vr+62)/5)),h0=1/(1+Math.exp((-70.5+62)/5)),avail=(1-B/100)*Math.min(1.1,h/h0);
  const fires=avail>0.3,peak=fires?Vr+(35-Vr)*Math.min(1,Math.sqrt(avail)):Vr+12*avail/0.3,dur=Math.pow(1.07,37-T);
  const P=plot($("#na"),{x0:0,x1:8,y0:-100,y1:50,xt:[0,2,4,6,8],yt:[-100,-80,-60,-40,-20,0,20,40],xl:"Time (ms)",yl:"Membrane potential (mV)"});
  const v=t=>{const t0=1;if(t<t0)return Vr;if(t<t0+0.3)return Vr+(-55-Vr)*smooth(t,t0,t0+0.3)*(fires?1:Math.min(1,(peak-Vr)/(-55-Vr)));const s=t0+0.3;if(!fires)return Vr+(peak-Vr)*Math.exp(-(t-s)/0.6);
   if(t<s+0.25*dur)return -55+(peak+55)*smooth(t,s,s+0.25*dur);if(t<s+1.0*dur)return peak-(peak-(Vr-10))*smooth(t,s+0.25*dur,s+1.0*dur);return (Vr-10)+10*smooth(t,s+1.0*dur,s+4*dur)};
  P.add("line",{x1:P.X(0),x2:P.X(8),y1:P.Y(-55),y2:P.Y(-55),stroke:"var(--muted)","stroke-dasharray":"4 4"});P.text(6.2,-51,"threshold −55");
  P.line(range(0,8,400).map(t=>[t,v(t)]),{stroke:fires?"var(--ecg)":"var(--abp)"});
  $("#na-r").innerHTML=`Resting potential (GHK) <b>${Vr.toFixed(0)} mV</b> · Na⁺ channels available ≈ ${(Math.min(1,avail)*100).toFixed(0)}% · ${fires?`AP fires, peak ≈ ${peak.toFixed(0)} mV`:"<b>no action potential</b> (subthreshold response: conduction block)"}. ${K>6?"Hyperkalaemia depolarises the membrane and inactivates Na⁺ channels: weaker or failed APs.":""}${B>60&&fires?" Partial block: smaller AP, slower rise; a few more % blocks it.":""}${T<33?" Cooling slows channel kinetics: wider AP, slower conduction.":""}`}
 ["#na-k","#na-b","#na-t"].forEach(s=>$(s).oninput=drawNA);drawNA();

 /* 2. Autoregulation */
 const AU={n:["Normal adult",55,150,50,"Plateau between CPP ~55 and 150 mmHg."],ht:["Chronic hypertension",80,180,50,"Curve shifted right: hypotension that is safe for others causes ischaemia here."],neo:["Neonate",30,70,40,"Narrow plateau at low pressures; pressure-passive outside it (IVH risk)."],tbi:["Traumatic brain injury",0,0,50,"Autoregulation impaired: flow follows pressure, so hypotension causes ischaemia and hypertension causes hyperaemia."],vol:["Volatile > 1.5 MAC",0,0,62,"Vasodilated, pressure-passive and raised flow."]};
 let auK="n";
 function drawAU(){const [nm,lo,hi,base,txt]=AU[auK];const m=+$("#au-m").value;out("au-m",m);
  const f=x=>{if(lo===0)return base*x/90;if(x<lo)return Math.max(4,base*(x/lo));if(x>hi)return base+(x-hi)*0.6;return base};
  const P=plot($("#au"),{x0:0,x1:200,y0:0,y1:110,xt:[0,50,100,150,200],yt:[0,25,50,75,100],xl:"Cerebral perfusion pressure (mmHg)",yl:"CBF (mL/100 g/min)"});
  P.line(range(0,200).map(x=>[x,Math.min(110,(x<55?Math.max(4,50*x/55):x>150?50+(x-150)*0.6:50))]),{stroke:"var(--muted)","stroke-dasharray":"5 4","stroke-width":1.4});
  P.line(range(0,200).map(x=>[x,Math.min(110,f(x))]),{stroke:"var(--spo2)"});const y=Math.min(110,f(m));P.dot(m,y,y<25?"var(--abp)":"var(--ink)",`${y.toFixed(0)} mL/100 g/min`,8,-6);
  P.add("rect",{x:P.X(0),y:P.Y(20),width:P.X(200)-P.X(0),height:P.Y(0)-P.Y(20),fill:"var(--abp)",opacity:.08});P.text(150,10,"ischaemic range",{fill:"var(--abp)"});
  $("#au-r").innerHTML=`<b>${nm}.</b> ${txt}`}
 seg($("#au-sel"),Object.entries(AU).map(([k,v])=>[k,v[0]]),k=>{auK=k;drawAU()},"n");$("#au-m").oninput=drawAU;

 /* 3. CO2 / O2 */
 let cgChronic=false;
 function drawCG(){const c=+$("#cg-c").value,o=+$("#cg-o").value;out("cg-c",c.toFixed(1));out("cg-o",o.toFixed(1));
  const sh=cgChronic?1.5:0,fc=x=>20+100/(1+Math.exp(-(x-sh-6.4)/1.25)),fo=x=>50+70/(1+Math.exp((x-5.2)/0.75));
  const svg=$("#cg");svg.innerHTML="";
  const P1=plot(svg,{w:520,h:300,x0:0,x1:20,y0:0,y1:130,xt:[0,4,8,12,16,20],yt:[0,25,50,75,100,125],xl:"Partial pressure (kPa)",yl:"CBF (mL/100 g/min)",clear:false});
  P1.line(range(1.5,13,100).map(x=>[x,fc(x)]),{stroke:"var(--etco2)"});P1.line(range(2.5,20,100).map(x=>[x,fo(x)]),{stroke:"var(--spo2)"});
  P1.text(9,fc(9)+6,"PaCO2",{fill:"var(--etco2)"});P1.text(15,58,"PaO2",{fill:"var(--spo2)"});
  const yc=fc(c)*(fo(o)/50),yo=fo(o);P1.dot(c,fc(c),"var(--etco2)","",0,0);P1.dot(o,yo,"var(--spo2)","",0,0);
  $("#cg-r").innerHTML=`At PaCO2 ${c.toFixed(1)} kPa CBF ≈ <b>${fc(c).toFixed(0)}</b>; at PaO2 ${o.toFixed(1)} kPa the hypoxic factor is ×${(fo(o)/50).toFixed(2)}. Combined estimate ≈ <b>${Math.min(140,yc).toFixed(0)} mL/100 g/min</b>. ${c<4?"Hypocapnia: vasoconstriction lowers ICP but risks ischaemia below ~3.5 kPa.":c>7?"Hypercapnia: vasodilatation raises cerebral blood volume and ICP.":""} ${o<7.5?"Hypoxia now overrides other controls.":""}${cgChronic?" Chronic hypercapnia: curve reset to the right as CSF HCO3⁻ rises.":""}`}
 seg($("#cg-sel"),[["n","Acute"],["c","Chronic hypercapnia"]],k=>{cgChronic=k==="c";drawCG()},"n");["#cg-c","#cg-o"].forEach(s=>$(s).oninput=drawCG);

 /* 4. ICP */
 function drawIC(){const V=+$("#ic-v").value,M=+$("#ic-m").value;out("ic-v",V+" mL");out("ic-m",M);
  const icp=v=>Math.min(95,8*Math.exp(0.058*v)),I=icp(V),E=(icp(V+1)-I),cpp=M-I;
  const svg=$("#ic");svg.innerHTML="";
  const P=plot(svg,{w:520,h:240,x0:0,x1:45,y0:0,y1:100,xt:[0,10,20,30,40],yt:[0,20,40,60,80,100],xl:"Added intracranial volume (mL)",yl:"ICP (mmHg)",clear:false});
  P.add("rect",{x:P.X(0),y:P.Y(100),width:P.X(45)-P.X(0),height:P.Y(22)-P.Y(100),fill:"var(--abp)",opacity:.07});P.text(1,26,"treat > 22",{fill:"var(--abp)"});
  P.line(range(0,45,120).map(v=>[v,icp(v)]),{stroke:"var(--spo2)"});P.dot(V,I,"var(--ink)",`ICP ${I.toFixed(0)}`,8,4);
  P.text(3,92,V<15?"compensated":V<28?"decompensating":"exhausted: ischaemia",{fill:V<15?"var(--good)":V<28?"var(--warn)":"var(--bad)"});
  const r=clamp(0.75+(I-8)/40,0.7,1.6);
  const P2=plot(svg,{w:520,h:170,x0:0,x1:2,y0:Math.max(0,I-10),y1:I+14,yt:[Math.round(I)],xt:[0,1,2],yl:"ICP wave",xl:"Time (s)",clear:false,yOff:250,mt:10});
  const amp=3+E*4,wave=t=>{const p=t%1;const g=(m,s)=>Math.exp(-Math.pow((p-m)/s,2)/2);return I+amp*(1.0*g(0.1,0.035)+r*g(0.24,0.05)+0.55*g(0.42,0.05))};
  P2.line(range(0,2,300).map(t=>[t,wave(t)]),{stroke:"var(--etco2)"});
  [[0.1,"P1"],[0.24,"P2"],[0.42,"P3"]].forEach(([t,l])=>P2.text(t,wave(t)+1.5,l,{"text-anchor":"middle",fill:"var(--ink)","font-size":"11"}));
  $("#ic-r").innerHTML=`ICP <b>${I.toFixed(0)} mmHg</b> · elastance ${E.toFixed(1)} mmHg/mL · CPP <b>${cpp.toFixed(0)} mmHg</b>${cpp<60?" (below target: raise MAP or lower ICP)":""} · P2/P1 ≈ ${r.toFixed(2)}${r>1?": poor compliance":""}.`}
 ["#ic-v","#ic-m"].forEach(s=>$(s).oninput=drawIC);drawIC();

 /* 5. CBF vs CMRO2 */
 (function(){const P=plot($("#cm"),{w:520,h:330,x0:-70,x1:40,y0:-70,y1:110,xt:[-60,-40,-20,0,20,40],yt:[-60,-30,0,30,60,90],xl:"Change in CMRO2 (%)",yl:"Change in CBF (%)"});
  P.line([[-70,-70],[40,40]],{stroke:"var(--muted)","stroke-dasharray":"6 4","stroke-width":1.4});
  P.add("line",{x1:P.X(0),x2:P.X(0),y1:P.Y(-70),y2:P.Y(110),class:"gr"});P.add("line",{x1:P.X(-70),x2:P.X(40),y1:P.Y(0),y2:P.Y(0),class:"gr"});
  const pts=[["Thiopentone",-55,-50,"var(--nibp)",-70,14],["Propofol",-45,-40,"var(--nibp)",8,12],["Etomidate",-45,-33,"var(--nibp)",-62,-2],["Midazolam",-25,-25,"var(--nibp)",6,-6],["Dexmedetomidine",-5,-25,"var(--nibp)",6,12],["Opioids",-8,-5,"var(--nibp)",6,-6],["Sevoflurane",-40,5,"var(--etco2)",8,4],["Isoflurane",-45,20,"var(--etco2)",8,4],["Desflurane",-45,32,"var(--etco2)",8,-4],["Halothane",-25,90,"var(--etco2)",8,4],["N2O",15,50,"var(--abp)",-30,-6],["Ketamine",20,60,"var(--abp)",8,-6]];
  pts.forEach(([n,x,y,c,dx,dy])=>{P.dot(x,y,c,n,dx,dy)});P.text(10,-55,"coupling line",{fill:"var(--muted)"});
 })();

 /* 6. EEG */
 const EE={awake:["Awake, eyes open","Low-amplitude, mixed fast beta (13–30 Hz).","BIS 90–100"],closed:["Awake, eyes closed","Posterior alpha rhythm ~10 Hz, 30–50 µV; blocked by eye opening.","BIS ~90"],exc:["Induction: paradoxical excitation","Beta activity increases in amplitude before loss of consciousness.","BIS 70–90"],ga:["Surgical anaesthesia (propofol / sevoflurane)","Frontal alpha ~10 Hz riding on large slow-delta waves (0.5–1.5 Hz).","BIS 40–60"],bs:["Deep: burst suppression","Bursts of mixed activity separated by near-flat suppression. Suppression ratio = % of time suppressed.","BIS ~10–30"],iso:["Isoelectric","Flat trace (&lt; 2 µV): very deep anaesthesia, severe hypothermia, anoxic injury, brain death (with clinical tests).","BIS 0"],ket:["Ketamine","Fast beta–gamma with theta; dissociative state. Processed EEG reads 'awake'.","BIS often 60–80"],n3:["Natural sleep N3","High-amplitude delta 0.5–2 Hz (slow-wave sleep).","–"],dex:["Dexmedetomidine","Spindle-like 12–15 Hz bursts and slow waves, resembling N2 sleep; easily rousable.","BIS 50–70"]};
 function rnd(seed){let s=seed;return ()=>{s=(s*16807)%2147483647;return s/2147483647}}
 function drawEE(k){const [nm,txt,bis]=EE[k];const r=rnd(7),ph=Array.from({length:12},()=>r()*6.28);
  const P=plot($("#ee"),{w:520,h:220,x0:0,x1:4,y0:-120,y1:120,xt:[0,1,2,3,4],yt:[-100,0,100],xl:"Time (s)",yl:"µV"});
  const s=(t,f,a,i)=>a*Math.sin(2*Math.PI*f*t+ph[i%12]);
  const f=t=>{switch(k){case"awake":return s(t,18,6,0)+s(t,23,5,1)+s(t,27,4,2)+s(t,9,3,3);case"closed":return s(t,10,35,0)*(0.7+0.3*Math.sin(2*Math.PI*0.5*t))+s(t,20,4,1);
   case"exc":return s(t,16,18,0)+s(t,22,14,1)+s(t,26,10,2);case"ga":return s(t,10,22,0)*(0.8+0.2*Math.sin(t*3))+s(t,0.8,60,1)+s(t,1.3,30,2);
   case"bs":{const p=t%2.2;const on=p<0.7;return on?(s(t,8,40,0)+s(t,3,50,1)+s(t,14,15,2))*Math.sin(Math.PI*p/0.7):s(t,30,1.5,3)}case"iso":return s(t,37,1,0)+s(t,51,0.8,1);
   case"ket":return s(t,32,10,0)+s(t,27,9,1)+s(t,6,15,2)+s(t,40,5,3);case"n3":return s(t,1,70,0)+s(t,1.7,40,1)+s(t,5,8,2);
   case"dex":{const sp=(t%1.6)<0.6?Math.sin(Math.PI*(t%1.6)/0.6):0;return s(t,13,25,0)*sp+s(t,0.9,35,1)+s(t,4,6,2)}}return 0};
  P.line(range(0,4,1600).map(t=>[t,f(t)]),{stroke:"var(--ecg)","stroke-width":1.3});
  $("#ee-r").innerHTML=`<b>${nm}.</b> ${txt} <span class="mono">${bis}</span>`}
 seg($("#ee-sel"),Object.entries(EE).map(([k,v])=>[k,v[0]]),drawEE,"ga");

 /* 7. Pain pathway */
 const PP={none:["Pathway only","Three-neuron chain: nociceptor (first order, cell body in the dorsal root ganglion) → dorsal horn (second order, crosses) → thalamus (third order) → cortex. Descending control from PAG and RVM/locus coeruleus.",[]],
  nsaid:["NSAIDs","COX inhibition reduces prostaglandin sensitisation of nociceptors (periphery) and of dorsal horn neurons (spinal COX-2).",["per","dh"]],
  la:["Local anaesthetics","Na⁺ channel block in the peripheral nerve, plexus, roots or dorsal horn entry; systemic lidocaine has central effects too.",["per","nerve"]],
  op:["Opioids","μ receptors: presynaptic (↓Ca²⁺ entry, less glutamate and substance P release) and postsynaptic (↑K⁺, hyperpolarisation) in the dorsal horn; supraspinal activation of PAG–RVM descending inhibition; some peripheral action in inflamed tissue.",["dh","pag","per"]],
  ket:["Ketamine","NMDA antagonism in the dorsal horn reduces wind-up and central sensitisation; also supraspinal effects. Useful in opioid tolerance.",["dh","ctx"]],
  gaba:["Gabapentinoids","Bind α2δ subunit of presynaptic voltage-gated Ca²⁺ channels in the dorsal horn: less excitatory transmitter release.",["dh"]],
  a2:["α2 agonists, TCAs, SNRIs, tramadol","Enhance descending noradrenergic/serotonergic inhibition at the dorsal horn (clonidine, dexmedetomidine act directly on α2 there).",["desc","dh"]],
  para:["Paracetamol","Central mechanisms: COX inhibition in the CNS, serotonergic descending pathways, AM404 acting on TRPV1 and cannabinoid receptors.",["desc","ctx"]]};
 function drawPP(k){const svg=$("#pp");svg.innerHTML="";const add=mk(svg);const [nm,txt,hl]=PP[k];
  const box=(id,x,y,w,h,l1,l2,col)=>{const on=hl.includes(id);add("rect",{x,y,width:w,height:h,rx:10,fill:on?"var(--abp)":"var(--panel)","fill-opacity":on?0.18:1,stroke:on?"var(--abp)":col,"stroke-width":on?3:1.6});add("text",{x:x+w/2,y:y+h/2-3,"text-anchor":"middle",class:"lbl"},l1);if(l2)add("text",{x:x+w/2,y:y+h/2+13,"text-anchor":"middle","font-size":"11"},l2)};
  const ln=(d,c,dash,id)=>add("path",{d,fill:"none",stroke:hl.includes(id)?"var(--abp)":c,"stroke-width":hl.includes(id)?3.5:2,"stroke-dasharray":dash||""});
  box("per",20,280,150,70,"Periphery","TRPV1, PGs, bradykinin","var(--etco2)");
  ln("M170 315 C230 315 250 300 300 300","var(--etco2)","","nerve");add("text",{x:185,y:296,"font-size":"11",fill:hl.includes("nerve")?"var(--abp)":"var(--muted)"},"Aδ / C fibre");
  box("drg",205,330,70,40,"DRG","1st order","var(--muted)");
  box("dh",300,260,170,90,"Dorsal horn","laminae I, II (SG), V","var(--ecg)");
  ln("M470 300 C540 300 560 220 560 180","var(--nibp)");add("text",{x:500,y:250,"font-size":"11"},"crosses → spinothalamic");
  box("thal",500,110,130,60,"Thalamus","VPL, medial","var(--nibp)");
  ln("M630 140 C700 140 720 90 740 80","var(--nibp)");
  box("ctx",700,20,180,70,"Cortex","S1/S2, ACC, insula","var(--spo2)");
  box("pag",300,40,170,60,"PAG","midbrain","var(--spo2)");
  box("rvm",300,140,170,60,"RVM / locus coeruleus","5-HT / NA","var(--spo2)");
  ln("M385 100 L385 140","var(--spo2)","6 4","desc");ln("M385 200 L385 260","var(--spo2)","6 4","desc");add("text",{x:392,y:235,"font-size":"11",fill:hl.includes("desc")?"var(--abp)":"var(--spo2)"},"descending inhibition");
  ln("M700 50 C600 40 520 60 470 68","var(--spo2)","6 4","desc");
  add("text",{x:610,y:240,"font-size":"11"},"spinoreticular → limbic (affect)");
  $("#pp-r").innerHTML=`<b>${nm}.</b> ${txt}`}
 seg($("#pp-sel"),Object.entries(PP).map(([k,v])=>[k,v[0]]),drawPP,"none");

 /* 8. Spinal cord */
 const SC={none:["Normal",null,"Dorsal columns (posterior, ipsilateral: fine touch, vibration, proprioception), lateral corticospinal (posterolateral, ipsilateral motor below a lesion), spinothalamic (anterolateral, crossed: pain and temperature from the opposite side)."],
  hemi:["Brown-Séquard (left hemisection)","hemi","Left: weakness (corticospinal) and loss of vibration/proprioception (dorsal column) below the lesion. Right: loss of pain and temperature from 1–2 segments below."],
  ant:["Anterior cord syndrome","ant","Bilateral paralysis and loss of pain/temperature below the lesion; dorsal columns spared (vibration and proprioception intact). Anterior spinal artery territory: aortic cross-clamp, hypotension, epidural haematoma."],
  cen:["Central cord syndrome","cen","Damage near the central canal: crossing spinothalamic fibres (cape-like loss) and the medially placed arm fibres of the corticospinal tract: arms weaker than legs, sacral sparing."],
  post:["Posterior cord syndrome","post","Dorsal columns lost: sensory ataxia, loss of vibration and proprioception; power and pain sensation preserved."],
  comp:["Complete transection","comp","Loss of all motor and sensory function below the level, with autonomic effects depending on level (T6, T1–4, C3–5)."]};
 function drawSC(k){const svg=$("#sc");svg.innerHTML="";const add=mk(svg);const [nm,les,txt]=SC[k];const cx=200,cy=165;
  add("ellipse",{cx,cy,rx:150,ry:120,fill:"var(--panel)",stroke:"var(--muted)","stroke-width":2});
  add("path",{d:`M${cx} ${cy-20} C${cx-30} ${cy-110} ${cx-75} ${cy-110} ${cx-70} ${cy-95} C${cx-55} ${cy-60} ${cx-30} ${cy-30} ${cx-28} ${cy-5} C${cx-60} ${cy+10} ${cx-95} ${cy+40} ${cx-80} ${cy+70} C${cx-60} ${cy+85} ${cx-25} ${cy+40} ${cx} ${cy+25} C${cx+25} ${cy+40} ${cx+60} ${cy+85} ${cx+80} ${cy+70} C${cx+95} ${cy+40} ${cx+60} ${cy+10} ${cx+28} ${cy-5} C${cx+30} ${cy-30} ${cx+55} ${cy-60} ${cx+70} ${cy-95} C${cx+75} ${cy-110} ${cx+30} ${cy-110} ${cx} ${cy-20} Z`,fill:"var(--soft)",stroke:"var(--muted)"});
  add("circle",{cx,cy:cy+5,r:5,fill:"var(--muted)"});
  const tr=(x,y,rx,ry,c,l,side)=>{[-1,1].forEach(s=>add("ellipse",{cx:cx+s*x,cy:cy+y,rx,ry,fill:c,opacity:.55}));if(l)add("text",{x:cx+x+rx+8,y:cy+y+4,"font-size":"11",fill:c},l)};
  tr(22,-75,18,32,"var(--spo2)","");add("text",{x:cx+50,y:cy-112,"font-size":"11",fill:"var(--spo2)"},"dorsal columns");
  tr(100,-20,30,28,"var(--abp)","lateral corticospinal");tr(110,45,30,26,"var(--etco2)","spinothalamic");tr(22,92,14,20,"var(--nibp)","");add("text",{x:cx+40,y:cy+118,"font-size":"11",fill:"var(--nibp)"},"anterior corticospinal");
  tr(140,10,8,40,"var(--ecg)","");add("text",{x:cx+150,y:cy-62,"font-size":"11",fill:"var(--ecg)"},"spinocerebellar");
  add("text",{x:cx,y:cy-128,"text-anchor":"middle","font-size":"11"},"posterior");add("text",{x:cx,y:cy+138,"text-anchor":"middle","font-size":"11"},"anterior");add("text",{x:cx-165,y:cy+4,"text-anchor":"end","font-size":"11"},"L");add("text",{x:cx+165,y:cy+4,"font-size":"11"},"R");
  const shade=d=>add("path",{d,fill:"var(--bad)",opacity:.28,stroke:"var(--bad)","stroke-width":1.5});
  if(les==="hemi")shade(`M${cx} ${cy-120} A150 120 0 0 0 ${cx} ${cy+120} Z`);
  if(les==="ant")shade(`M${cx-150} ${cy+20} A150 120 0 0 0 ${cx+150} ${cy+20} Z`);
  if(les==="cen")add("ellipse",{cx,cy:cy+5,rx:70,ry:55,fill:"var(--bad)",opacity:.28,stroke:"var(--bad)"});
  if(les==="post")shade(`M${cx-60} ${cy-108} A150 120 0 0 1 ${cx+60} ${cy-108} L${cx} ${cy} Z`);
  if(les==="comp")add("ellipse",{cx,cy,rx:150,ry:120,fill:"var(--bad)",opacity:.25});
  $("#sc-r").innerHTML=`<b>${nm}.</b> ${txt}`}
 seg($("#sc-sel"),Object.entries(SC).map(([k,v])=>[k,v[0]]),drawSC,"none");

 /* 9. TOF */
 let tfK="nd";
 function drawTF(){const o=+$("#tf-o").value;out("tf-o",o+"%");
  const t1=clamp((95-o)/25,0,1);let fade=0;if(tfK==="nd"||tfK==="p2")fade=clamp((o-65)/25,0,1);const tw=[0,1,2,3].map(n=>t1*(1-0.9*fade*n/3));
  const svg=$("#tf");svg.innerHTML="";const add=mk(svg);const base=210,H=160;
  add("line",{x1:30,x2:500,y1:base,y2:base,stroke:"var(--muted)"});
  tw.forEach((h,i)=>{add("rect",{x:50+i*40,y:base-h*H,width:22,height:Math.max(1,h*H),fill:"var(--nibp)"});add("text",{x:61+i*40,y:base+16,"text-anchor":"middle"},"T"+(i+1))});
  add("text",{x:110,y:30,"text-anchor":"middle",class:"lbl"},"Train-of-four (2 Hz)");
  const tet=[];for(let i=0;i<=60;i++){const x=i/60;const h=t1*(fade?1-0.85*fade*Math.min(1,x*2):1);tet.push([260+x*120,base-h*H])}
  add("path",{d:`M260 ${base} `+tet.map(p=>`L${p[0]} ${p[1]}`).join(" ")+` L380 ${base} Z`,fill:"var(--etco2)",opacity:.5});add("text",{x:320,y:30,"text-anchor":"middle",class:"lbl"},"Tetanus 50 Hz, 5 s");
  const ptp=tfK==="d1"?1:1.4;const pt=t1>0.01?Math.min(1,t1*ptp):0;add("rect",{x:420,y:base-pt*H,width:22,height:Math.max(1,pt*H),fill:"var(--spo2)"});add("text",{x:431,y:base+16,"text-anchor":"middle"},"post-tet");
  const tofr=tw[0]>0?tw[3]/tw[0]:0,count=tw.filter(h=>h>0.04).length,ptc=t1<=0.01&&o<99?Math.round(clamp((99-o)*2.5,0,15)):null;
  const desc={nd:"Non-depolarising: fade on TOF and tetanus, post-tetanic potentiation (prejunctional block).",d1:"Depolarising phase I (suxamethonium): equal reduction of all four, no fade, no post-tetanic potentiation; fasciculations first.",p2:"Phase II block (large or prolonged suxamethonium): looks like non-depolarising block, with fade."}[tfK];
  $("#tf-r").innerHTML=`${desc}<br>T1 ${(t1*100).toFixed(0)}% · TOF count ${count} · TOF ratio <b>${count===4?tofr.toFixed(2):"–"}</b>${count===4&&tofr<0.9?" (residual block: TOFR < 0.9)":""}${ptc!=null?` · TOF 0: post-tetanic count ≈ ${ptc}`:""}. Note how T1 stays at 100% until ~70% of receptors are blocked: the margin of safety.`}
 seg($("#tf-sel"),[["nd","Non-depolarising"],["d1","Depolarising phase I"],["p2","Phase II"]],k=>{tfK=k;drawTF()},"nd");$("#tf-o").oninput=drawTF;
}

ATLAS.register({id:"03",name:"Neurophysiology",
  lede:"Neurophysiology: brain, ICP, nerves, pain, autonomic and neuromuscular physiology.",
  barsNote:"",
  bars:BARS,fam:FAM,slides:SLIDES,calcs:CALCS,tables:TABLES,cards:CARDS,fcf:FCF,viva:VIVA,quiz:QUIZ,crisis:CRISIS,
  sources:SRC,errata:ERR,refs:REFS,diagHTML:DIAG,initDiagrams,
  diagLede:"Nine live diagrams. Each one answers a common exam question: CBF graphs, ICP and its waveform, EEG states, pain pathway drug targets, cord syndromes and neuromuscular block."});
})();
