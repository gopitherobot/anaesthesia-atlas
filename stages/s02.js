/* Stage 02 · Cardiovascular physiology */
(function(){
const {plot,range,el,SVGNS,fmt,$,$$,seg}=ATLAS.h;

const BARS=[];

const FAM={elec:["ecg","Electrophysiology"],pump:["abp","The pump"],circ:["nibp","Circulation"],ctrl:["etco2","Control"],app:["spo2","Applied"]};

const SLIDES=[
{f:"elec",t:"Ventricular myocyte action potential",b:`<div class="tbl"><table><tr><th>Phase</th><th>Event</th><th>Current</th><th>ECG</th></tr>
<tr><td>4</td><td>Resting −90 mV, close to E<sub>K</sub></td><td>I<sub>K1</sub> (inward rectifier), Na⁺/K⁺-ATPase</td><td>TP segment</td></tr>
<tr><td>0</td><td>Upstroke to +20–30 mV, ~200 V/s</td><td>Fast Na⁺ (I<sub>Na</sub>, Nav1.5)</td><td>QRS</td></tr>
<tr><td>1</td><td>Early partial repolarisation (notch)</td><td>Transient outward K⁺ (I<sub>to</sub>)</td><td>J point</td></tr>
<tr><td>2</td><td>Plateau ~200 ms</td><td>L-type Ca²⁺ in balances delayed rectifier K⁺ out</td><td>ST segment</td></tr>
<tr><td>3</td><td>Repolarisation</td><td>I<sub>Kr</sub> (hERG), I<sub>Ks</sub>, I<sub>K1</sub></td><td>T wave</td></tr></table></div>
<ul class="clean"><li><b>Absolute refractory period</b> ≈ 250 ms (phases 0–2 and early 3); relative ≈ 50 ms. ERP nearly as long as contraction, so <b>no tetany</b>.</li>
<li>QT interval ≈ ventricular AP duration. Drugs blocking hERG lengthen phase 3 → long QT → early afterdepolarisations → torsades.</li>
<li>Hyperkalaemia: RMP less negative → Na⁺ channels inactivated → slow phase 0 (wide QRS), faster phase 3 (peaked T).</li></ul>`,
p:"Atrial APs are shorter (~150 ms) with less plateau; Purkinje APs are longest (~300+ ms) and have a slow phase 4 (latent pacemakers).",
v:"Draw the five phases on a mV/ms grid first (−90, 0, +30; 0–400 ms). Label each phase with its ion and its ECG correlate. Then compare with nerve and skeletal muscle."},
{f:"elec",t:"Pacemaker potential and control of heart rate",b:`<ul class="clean"><li>SA node has no stable resting potential. Maximum diastolic potential ≈ −60 mV, threshold ≈ −40 mV, peak ≈ +10–20 mV.</li>
<li><b>Phase 4</b> (spontaneous diastolic depolarisation): funny current I<sub>f</sub> (HCN channels, Na⁺ in on hyperpolarisation), declining K⁺ efflux, then <b>T-type</b> Ca²⁺ late in phase 4, Na⁺/Ca²⁺ exchange ("calcium clock").</li>
<li><b>Phase 0</b>: slow upstroke from <b>L-type</b> Ca²⁺ channels (no fast Na⁺ channels, which are inactivated at −60 mV).</li>
<li><b>Phase 3</b>: K⁺ efflux. No phase 1 or 2.</li>
<li>Intrinsic rates: SA 100–110, AV junction 40–60, ventricle 20–40 bpm. Resting 60–80 reflects dominant vagal tone.</li></ul>
<p><b>Rate changes by:</b> slope of phase 4, threshold, and maximum diastolic potential.<br>
Sympathetic (β1 → Gs → ↑cAMP) steepens I<sub>f</sub> and boosts I<sub>Ca-L</sub>. Vagal (M2 → Gi → ↓cAMP) flattens phase 4 and opens I<sub>K-ACh</sub> (GIRK), hyperpolarising the cell. Ivabradine blocks I<sub>f</sub>.</p>`,
p:"Use the Diagrams tab: move autonomic tone and switch to the denervated heart to see why a transplant patient sits at ~100 bpm.",
v:"'How does the pacemaker AP differ from the myocyte AP?' Draw both on one axis and list five differences: unstable phase 4, less negative MDP, higher threshold, slow Ca²⁺ upstroke, no plateau."},
{f:"elec",t:"Conduction, excitation–contraction coupling, cardiac vs skeletal muscle",b:`<p><b>Conduction:</b> SA node → atrial tracts (Bachmann, Wenckebach, Thorel) 0.5–1 m/s → AV node 0.05 m/s (≈ 0.1 s delay lets the atria empty) → His → bundle branches → Purkinje 2–4 m/s → myocardium 0.3–1 m/s. Endocardium depolarises first, epicardium repolarises first (so T is upright).</p>
<p><b>E–C coupling (cardiac):</b> AP enters T-tubules → L-type (DHP) channels let Ca²⁺ in → <b>calcium-induced calcium release</b> from SR via RyR2 → Ca²⁺ binds troponin C → cross-bridges. Relaxation: SERCA2a (controlled by phospholamban) and Na⁺/Ca²⁺ exchanger.</p>
<div class="tbl"><table><tr><th></th><th>Nerve</th><th>Skeletal muscle</th><th>Cardiac muscle</th></tr>
<tr><td>RMP</td><td>−70 mV</td><td>−90 mV</td><td>−90 mV</td></tr><tr><td>AP duration</td><td>~1 ms</td><td>2–5 ms</td><td>200–300 ms</td></tr>
<tr><td>Upstroke</td><td>Na⁺</td><td>Na⁺</td><td>Na⁺ (myocyte), Ca²⁺ (nodal)</td></tr><tr><td>Plateau</td><td>No</td><td>No</td><td>Yes (Ca²⁺)</td></tr>
<tr><td>Ca²⁺ source</td><td>–</td><td>SR only; DHPR mechanically opens RyR1</td><td>Extracellular trigger + SR (RyR2)</td></tr>
<tr><td>Tetany</td><td>–</td><td>Yes (summation)</td><td>No (long ERP)</td></tr><tr><td>Force grading</td><td>–</td><td>Motor unit recruitment, frequency</td><td>Fibre length (Starling), inotropy</td></tr>
<tr><td>Coupling</td><td>Synapse</td><td>NMJ, one fibre per end-plate</td><td>Gap junctions: functional syncytium</td></tr></table></div>`,
p:"Asked in EDAIC exactly as 'cardiac AP in detail, ECG reflection, compare with skeletal muscle, and how the excitation wave traverses the heart'. This slide is that answer.",
v:"Run it in order: ions → AP shape → ECG → conduction pathway with velocities → E–C coupling → the comparison table."},
{f:"pump",t:"The cardiac cycle",b:`<p>Seven events in order, starting at end-diastole with the R wave:</p>
<ol class="clean" style="padding-left:1.3em"><li><b>Isovolumetric contraction</b> (≈ 0.05 s): mitral closes (S1), all valves shut, LV pressure 8 → 80 mmHg. CVP <i>c</i> wave.</li>
<li><b>Rapid ejection</b>: aortic valve opens; ~70% of SV leaves in the first third of systole. CVP <i>x</i> descent.</li>
<li><b>Reduced ejection</b>: LV and aortic pressure fall; T wave.</li>
<li><b>Isovolumetric relaxation</b>: aortic valve closes (S2, dicrotic notch). CVP <i>v</i> wave peaks.</li>
<li><b>Rapid filling</b>: mitral opens, ~80% of filling (S3 if pathological). CVP <i>y</i> descent.</li>
<li><b>Diastasis</b> (slow filling): shortens first as HR rises.</li>
<li><b>Atrial systole</b>: P wave, 15–20% of filling (more in AS, LVH, elderly: AF is poorly tolerated). CVP <i>a</i> wave. S4 if stiff ventricle.</li></ol>
<p>Normal values: EDV 120–130 mL, ESV 50–60, SV 70, EF 55–70%. LV 120/8, aorta 120/80, LA 8–10, RV 25/4, PA 25/10.</p>`,
p:"Diastole is about two thirds of the cycle at 60 bpm but under half at 150 bpm. The left ventricle is perfused almost only in diastole, so tachycardia hurts supply and demand at once.",
v:"Draw ECG first across the top, then aortic, LV and LA pressures, then LV volume. Mark the four valve events as vertical lines. The Diagrams tab draws this live and lets you change heart rate."},
{f:"pump",t:"Venous and arterial waveforms",b:`<div class="tbl"><table><tr><th>CVP component</th><th>Cause</th><th>Abnormal</th></tr>
<tr><td><b>a</b> wave</td><td>Atrial contraction (after P)</td><td>Absent: AF. Large: TS, RVH, pulmonary hypertension. Cannon: AV dissociation (irregular in CHB, regular in junctional rhythm)</td></tr>
<tr><td><b>c</b> wave</td><td>Tricuspid bulge in isovolumetric contraction</td><td>Merges with v in TR</td></tr>
<tr><td><b>x</b> descent</td><td>Atrial relaxation and descent of the AV ring</td><td>Lost in TR; prominent in tamponade</td></tr>
<tr><td><b>v</b> wave</td><td>Atrial filling against a closed tricuspid</td><td>Giant cv wave: TR</td></tr>
<tr><td><b>y</b> descent</td><td>Tricuspid opens, ventricular filling</td><td>Steep: constrictive pericarditis, RV infarct. Blunted: tamponade, TS</td></tr></table></div>
<p><b>Peripheral arterial pulse:</b> moving distally the systolic peak rises and narrows, the dicrotic notch is delayed and smoothed, diastolic and mean fall slightly. Causes: reflected waves from branch points and tapering, falling compliance. So femoral or dorsalis pedis SBP can exceed aortic SBP by 10–20 mmHg.</p>`,
p:"CVP is read at end-expiration at the base of the c wave (closest to RV end-diastolic pressure).",
v:"EDAIC asked 'correlation of JVP/CVP with ECG' and 'compare aortic and femoral pulse'. Draw ECG above the CVP trace with P → a, QRS → c, T end → v."},
{f:"pump",t:"Pressure–volume loop",b:`<p>Anticlockwise loop: <b>A</b> end-diastole (mitral closes) → <b>B</b> aortic valve opens (≈ 80 mmHg) → <b>C</b> end-systole (aortic closes) → <b>D</b> mitral opens. Width = SV; area = stroke work.</p>
<ul class="clean"><li><b>ESPVR</b>: slope E<sub>es</sub> = load-independent contractility.</li>
<li><b>EDPVR</b>: passive diastolic stiffness (inverse of compliance).</li>
<li><b>Arterial elastance</b> E<sub>a</sub> ≈ P<sub>es</sub>/SV: the afterload line from EDV on the volume axis to the end-systolic point.</li>
<li>↑Preload: wider loop to the right, ESV almost unchanged. ↑Afterload: taller, narrower loop, ESV rises. ↑Contractility: ESPVR steeper, ESV falls.</li>
<li>Systolic failure: flat ESPVR, loop shifted right, low EF. Diastolic failure (HFpEF): steep EDPVR, high EDP at normal volume.</li>
<li><b>AS</b>: very high systolic pressure, stiff EDPVR. <b>MR</b>: no true isovolumetric contraction (blood leaves backwards early). <b>AR</b>: no true isovolumetric relaxation, very large EDV.</li></ul>`,
p:"Ischaemia makes the loop lean right: ischaemic segments bulge during isovolumetric contraction, so volume rises while pressure rises.",
v:"Draw ESPVR and EDPVR first as dashed lines, then the loop between them. That shows the examiner you know the loop is bounded by the two relationships."},
{f:"pump",t:"Preload, afterload, contractility and Frank–Starling",b:`<ul class="clean"><li><b>Preload</b>: myocyte length before contraction ≈ EDV. Clinically estimated by LVEDP, PCWP or CVP (pressure, which depends on compliance).</li>
<li><b>Afterload</b>: wall stress during ejection. Laplace: σ = P·r / 2h. Raised by aortic pressure, AS, dilated LV (bigger r); reduced by hypertrophy (bigger h). SVR is only one part of it.</li>
<li><b>Contractility</b>: force at a given preload and afterload. Raised by sympathetic tone, Ca²⁺, catecholamines, PDE inhibitors, digoxin, Bowditch (staircase) and Anrep effects; reduced by acidosis, hypoxia, ischaemia, volatiles, β-blockers.</li>
<li><b>Frank–Starling law</b>: force of contraction depends on initial fibre length. Mechanism: optimal actin–myosin overlap (sarcomere 2.0–2.2 µm) and length-dependent Ca²⁺ sensitivity of troponin C.</li>
<li>Inotropes move the curve up and left; failure moves it down and right with a descending limb (overstretch, functional MR).</li></ul>`,
p:"Volume moves you along a Starling curve; inotropy moves you to another curve. Fluid responsiveness simply means being on the steep part.",
v:"Draw SV against LVEDP with three curves (normal, inotrope, failure), then mark the steep part as 'preload responsive'."},
{f:"pump",t:"Coronary circulation and myocardial O2 balance",b:`<ul class="clean"><li>Flow ≈ 250 mL/min (5% of CO), ≈ 80 mL/100 g/min. MVO2 ≈ 8–10 mL/100 g/min at rest. Extraction 60–75%, so supply rises only by raising flow.</li>
<li><b>Anatomy:</b> LCA (posterior/left aortic sinus) → LAD and circumflex. RCA (anterior/right sinus) → SA node (60%), AV node (80–90%), RV, inferior LV. Right-dominant (RCA gives the PDA) in ~70%, left in ~10%, co-dominant ~20%.</li>
<li><b>Veins:</b> coronary sinus (great, middle, small cardiac veins) drains ~2/3 to RA; anterior cardiac veins to RA; Thebesian veins into all chambers (part of physiological shunt).</li>
<li><b>Left coronary flow</b> is mainly diastolic (subendocardial compression in systole). <b>Right</b> flows through both phases.</li>
<li>CPP = aortic DBP − LVEDP. Autoregulation 60–140/180 mmHg via metabolic (adenosine, H⁺, K⁺, CO2, low O2), myogenic and endothelial (NO, PGI2) mechanisms. α1 constricts, β2 dilates, but metabolic control dominates.</li></ul>
<div class="tbl"><table><tr><th>O2 supply</th><th>O2 demand</th></tr><tr><td>CPP (DBP − LVEDP), diastolic time (HR), coronary diameter, CaO2 (Hb, SaO2)</td><td>Heart rate (largest), wall tension (preload, afterload: Laplace), contractility, basal metabolism</td></tr></table></div>`,
p:"ECG territories: inferior (II, III, aVF) RCA or distal Cx; anterior (V1–V4) LAD; lateral (I, aVL, V5–6) Cx; RV infarct = inferior pattern with ST elevation in V1 / V4R.",
v:"Organise any 'blood flow to an organ' answer the same way: organ-specific factors, autoregulation, metabolic, neural, humoral, drugs. Then name a measurement method (Fick with N2O or argon via coronary sinus catheter, thermodilution, PET)."},
{f:"circ",t:"Haemodynamics: pressure, flow and resistance",b:`<ul class="clean"><li><b>Ohm's law</b>: MAP − CVP = CO × SVR. SVR 900–1400 dyn·s·cm⁻⁵; PVR ≈ 1/10 of that.</li>
<li><b>Hagen–Poiseuille</b>: Q = ΔP·π·r⁴ / 8·η·l (laminar, Newtonian). Halving radius cuts flow 16-fold. Arterioles hold ~50% of SVR.</li>
<li><b>Reynolds number</b> Re = ρ·v·d / η; turbulence likely above ~2000 (aortic root at peak flow, stenoses, anaemia lowers viscosity). Turbulent flow ∝ √ΔP.</li>
<li><b>Viscosity</b> rises with haematocrit; blood is non-Newtonian (shear-thinning). Fåhræus–Lindqvist effect lowers apparent viscosity in vessels under ~300 µm.</li>
<li><b>Laplace</b>: wall tension T = P·r (cylinder); explains why capillaries withstand pressure and why dilated hearts and aneurysms fail.</li>
<li><b>Windkessel</b>: elastic aorta stores ~half of SV in systole and releases it in diastole. A stiff aorta (age) raises SBP and pulse pressure and lowers DBP (coronary perfusion).</li>
<li>Blood volume: veins 65–70% (capacitance), arteries 15%, capillaries 5%, heart and lungs the rest.</li></ul>`,
p:"MAP ≈ DBP + PP/3 only at normal heart rates; at fast rates diastole shortens and MAP moves closer to the arithmetic mean.",
v:"State the law, its assumptions (laminar, Newtonian, rigid, steady), then why each assumption fails in vivo."},
{f:"circ",t:"Venous return and the Guyton model",b:`<ul class="clean"><li>VR = (MSFP − RAP) / R<sub>V</sub>. Mean systemic filling pressure ≈ 7 mmHg (pressure in the circulation with zero flow).</li>
<li><b>Stressed volume</b> (~1.3–1.5 L, ~25–30%) generates MSFP; <b>unstressed volume</b> (~3.5 L) fills vessels without pressure. Venoconstriction moves blood from unstressed to stressed volume (an "autotransfusion").</li>
<li>VR falls as RAP rises and plateaus below ~0 mmHg when the great veins collapse.</li>
<li>Cardiac output = venous return at the intersection of the VR curve and the cardiac function (Starling) curve.</li>
<li>Haemorrhage lowers MSFP (curve shifts left). Fluid raises it. Venodilatation from spinal or GA lowers stressed volume. PPV raises RAP (ITP), cutting VR. Inotropes steepen the cardiac curve.</li></ul>`,
p:"Why do anaesthetised patients drop their BP after induction? Venodilatation lowers MSFP, sympatholysis lowers contractility and SVR, and PPV raises RAP. Three Guyton levers at once.",
v:"Draw the VR line (x-intercept MSFP 7) crossing a Starling curve at RAP ≈ 0, CO ≈ 5. Then shift each curve for the clinical scenario. Use the Diagrams tab to rehearse."},
{f:"circ",t:"Microcirculation, Starling forces and oedema",b:`<div class="eq">J<sub>v</sub> = K<sub>f</sub> [ (P<sub>c</sub> − P<sub>i</sub>) − σ (π<sub>c</sub> − π<sub>i</sub>) ]</div>
<ul class="clean"><li>Typical: P<sub>c</sub> 35 → 15 mmHg along the capillary, π<sub>c</sub> 25, P<sub>i</sub> ≈ 0 to −3, π<sub>i</sub> ≈ 5, σ (reflection coefficient for albumin) ≈ 0.9.</li>
<li><b>Classic model</b>: filtration at the arteriolar end, reabsorption at the venular end, ~10% returned by lymph.</li>
<li><b>Revised model (glycocalyx)</b>: the endothelial glycocalyx is the semi-permeable layer; the oncotic pressure that matters is just beneath it and is low. At steady state most capillaries filter along their whole length and do not reabsorb ("no-absorption rule"); lymph returns ~8 L/day of filtrate. Transient absorption only happens when P<sub>c</sub> falls acutely (haemorrhage, autotransfusion).</li>
<li>Glycocalyx damage: sepsis, hypervolaemia (ANP release), surgery, hyperglycaemia, ischaemia–reperfusion.</li>
<li><b>Oedema</b> causes: ↑P<sub>c</sub> (heart failure, fluid overload, venous obstruction), ↓π<sub>c</sub> (low albumin), ↑K<sub>f</sub> / ↓σ (sepsis, burns, ARDS), lymphatic obstruction. Safety factors: lymph flow up 10×, washout of interstitial protein, rising P<sub>i</sub>.</li></ul>`,
p:"Pulmonary oedema: pulmonary capillary pressure ~7–10 mmHg gives a large safety margin. Cardiogenic oedema appears when PCWP exceeds ~18–25 mmHg (lower if albumin is low). Non-cardiogenic: ARDS, negative-pressure, neurogenic, re-expansion, high altitude.",
v:"Asked 4 times as 'Starling forces' or 'mechanism of pulmonary oedema'. Give the equation, typical numbers, the classic picture, then the revised model and what it means for fluids (colloid stays in the circulation less than predicted)."},
{f:"circ",t:"Regional circulations",b:`<div class="tbl"><table><tr><th>Organ</th><th>Flow mL/min (% CO)</th><th>mL/100 g/min</th><th>O2 use</th><th>Main control</th></tr>
<tr><td>Brain</td><td>750 (15%)</td><td>50</td><td>~20% of VO2</td><td>Autoregulation 60–160 (newer data: narrower), PaCO2, PaO2 &lt; 6.7 kPa, metabolic coupling</td></tr>
<tr><td>Heart</td><td>250 (5%)</td><td>80</td><td>~10%, ER 70%</td><td>Metabolic (adenosine), diastolic time</td></tr>
<tr><td>Kidneys</td><td>1200 (20–25%)</td><td>400 (highest)</td><td>ER ~10%</td><td>Myogenic + tubuloglomerular feedback 75–160 mmHg</td></tr>
<tr><td>Liver</td><td>1500 (25%)</td><td>100</td><td>~20%</td><td>Portal 75% of flow / 50% of O2; hepatic arterial buffer response</td></tr>
<tr><td>Skeletal muscle</td><td>1000 (20%) rising 20× in exercise</td><td>3–4 at rest</td><td>~20%</td><td>Sympathetic at rest, metabolic in exercise</td></tr>
<tr><td>Skin</td><td>300–500 (5%)</td><td>10–20</td><td>Low</td><td>Sympathetic, thermoregulation (AV anastomoses)</td></tr></table></div>`,
p:"The kidney has the highest flow per gram but low extraction, so renal venous blood is red. The heart has the highest extraction.",
v:"For any organ: flow and percentage of CO, autoregulation range, metabolic factors, neural, humoral, then effect of anaesthesia."},
{f:"ctrl",t:"Control of blood pressure",b:`<p><b>Short term (seconds): baroreflex.</b> High-pressure receptors in the carotid sinus (IX, via the nerve of Hering) and aortic arch (X) → nucleus tractus solitarius → inhibits the vasomotor (pressor) area in the rostral ventrolateral medulla and excites the nucleus ambiguus (vagal). Active over MAP 60–180 mmHg, most sensitive near normal MAP, respond to rate of change. Reset in chronic hypertension; blunted by age, volatiles, propofol, diabetes.</p>
<p><b>Low-pressure (cardiopulmonary) receptors</b> in the atria and great veins: stretch → ↓ADH (Gauer–Henry), ↑ANP, ↓renal sympathetic tone, Bainbridge tachycardia.</p>
<p><b>Chemoreceptors</b> (MAP &lt; 60) and the <b>CNS ischaemic response</b> (MAP &lt; 40, strongest sympathetic drive).</p>
<p><b>Intermediate (minutes–hours):</b> renin–angiotensin, catecholamines, ADH, capillary fluid shift, stress relaxation of vessels.</p>
<p><b>Long term (days):</b> renal pressure natriuresis (Guyton), aldosterone, ANP/BNP, thirst.</p>`,
p:"The phenylephrine bolus bradycardia and the spinal-induced bradycardia are both reflexes you can name: baroreflex and Bezold–Jarisch/low preload respectively.",
v:"Structure by time course: seconds, minutes, days. Draw the baroreceptor firing curve against MAP and show the hypertensive shift."},
{f:"ctrl",t:"Cardiovascular reflexes",b:`<div class="tbl"><table><tr><th>Reflex</th><th>Trigger</th><th>Afferent → efferent</th><th>Effect</th></tr>
<tr><td>Baroreceptor</td><td>↑ or ↓ arterial stretch</td><td>IX, X → NTS → vagus / sympathetic</td><td>↑BP → ↓HR, vasodilatation</td></tr>
<tr><td>Bainbridge</td><td>↑ atrial stretch (fluid load)</td><td>X → ↑sympathetic to SA node</td><td>Tachycardia</td></tr>
<tr><td>Bezold–Jarisch</td><td>LV chemo/mechanoreceptors (empty, vigorously contracting LV; serotonin, contrast)</td><td>Unmyelinated vagal C fibres → vagus</td><td>Bradycardia, vasodilatation, hypotension (spinal, interscalene in sitting position, haemorrhage)</td></tr>
<tr><td>Cushing</td><td>Raised ICP, brainstem ischaemia</td><td>Central sympathetic surge → baroreflex</td><td>Hypertension, bradycardia, irregular breathing</td></tr>
<tr><td>Oculocardiac</td><td>Traction on extraocular muscles, globe pressure</td><td>V (ophthalmic) → X</td><td>Bradycardia, AV block, asystole</td></tr>
<tr><td>Chemoreceptor</td><td>Hypoxia, hypercapnia, acidosis</td><td>IX, X</td><td>Hypertension, ↑ventilation; bradycardia if apnoeic</td></tr>
<tr><td>Diving</td><td>Cold water on face, apnoea</td><td>V → X, sympathetic</td><td>Bradycardia, peripheral vasoconstriction</td></tr>
<tr><td>Valsalva</td><td>Forced expiration against a closed glottis (40 mmHg, 10–15 s)</td><td>Baroreflex</td><td>Four phases (see Diagrams)</td></tr></table></div>`,
p:"Similar vagal reflexes in theatre: peritoneal traction, cervical dilatation, laryngoscopy in children, sinus surgery (trigeminocardiac), pneumoperitoneum. First action: stop the stimulus.",
v:"For each reflex give trigger, afferent, centre, efferent, effect, and a theatre example."},
{f:"ctrl",t:"Response to haemorrhage",b:`<p>EDAIC 2023 asked: "Hypovolaemic shock after 1 litre haemorrhage: acute and chronic compensation."</p>
<div class="tbl"><table><tr><th>Time</th><th>Mechanism</th><th>Effect</th></tr>
<tr><td>Seconds</td><td>Baroreflex (unloading), chemoreceptors if MAP &lt; 60, CNS ischaemic response &lt; 40</td><td>↑HR, ↑contractility, arteriolar constriction (skin, gut, kidney), venoconstriction mobilises unstressed volume</td></tr>
<tr><td>Minutes–hours</td><td>Transcapillary refill (P<sub>c</sub> falls); adrenaline, noradrenaline, cortisol; renin–angiotensin; ADH (V1 vasoconstriction, V2 water retention)</td><td>Plasma volume restored by up to ~0.5–1 L in the first hour; Hb dilutes</td></tr>
<tr><td>Hours–days</td><td>Aldosterone, thirst, renal Na⁺ and water retention; hepatic albumin synthesis</td><td>Volume restored over 12–72 h</td></tr>
<tr><td>Days–weeks</td><td>EPO → reticulocytosis from day 2–3</td><td>Red cell mass restored over 4–8 weeks</td></tr></table></div>
<p>Blood is diverted to the heart and brain. Late features: lactic acidosis, coagulopathy (consumption, dilution, hypothermia, acidosis), and decompensation with paradoxical bradycardia (Bezold–Jarisch-type) before arrest.</p>`,
p:"Young fit patients can lose up to 30% before SBP falls. Pulse pressure narrows first (class II). Elderly patients and those on β-blockers may never become tachycardic.",
v:"Answer by time course, then the ATLS classes (Classify tab), then the shock index (HR/SBP > 1 is worrying)."},
{f:"app",t:"Shock: definition and classification",b:`<p><b>Shock</b>: circulatory failure causing inadequate tissue O2 use, usually with hypotension and raised lactate.</p>
<div class="tbl"><table><tr><th>Type</th><th>CVP</th><th>PCWP</th><th>CO</th><th>SVR</th><th>SvO2</th></tr>
<tr><td>Hypovolaemic</td><td>↓</td><td>↓</td><td>↓</td><td>↑</td><td>↓</td></tr>
<tr><td>Cardiogenic</td><td>↑</td><td>↑</td><td>↓</td><td>↑</td><td>↓</td></tr>
<tr><td>Obstructive: tamponade</td><td>↑</td><td>↑ (equalised)</td><td>↓</td><td>↑</td><td>↓</td></tr>
<tr><td>Obstructive: massive PE</td><td>↑</td><td>N/↓</td><td>↓</td><td>↑</td><td>↓</td></tr>
<tr><td>Distributive: septic (warm)</td><td>N/↓</td><td>N/↓</td><td>↑ (later ↓)</td><td>↓</td><td>N/↑</td></tr>
<tr><td>Distributive: neurogenic</td><td>↓</td><td>↓</td><td>N/↓ with bradycardia</td><td>↓</td><td>N</td></tr>
<tr><td>Distributive: anaphylactic</td><td>↓</td><td>↓</td><td>↓ then ↑</td><td>↓</td><td>variable</td></tr>
<tr><td>Cytotoxic / dissociative</td><td>N</td><td>N</td><td>N/↑</td><td>N/↓</td><td>↑ (CO, cyanide)</td></tr></table></div>`,
p:"Spinal shock is different from neurogenic shock: spinal shock is loss of reflexes below the lesion; neurogenic shock is loss of sympathetic tone (lesion above T6) with hypotension and bradycardia.",
v:"Classify, give the haemodynamic profile, then show how you would tell them apart at the bedside (POCUS: IVC, LV/RV function, pericardial fluid, lung B-lines)."},
{f:"app",t:"The transplanted (denervated) heart",b:`<p>A favourite exam topic, for example "58-year-old with transplanted heart on ciclosporin for laparoscopic appendicectomy".</p>
<ul class="clean"><li><b>Rate:</b> resting HR 90–110 (intrinsic SA rate, no vagal tone). No beat-to-beat baroreflex: hypotension does not produce reflex tachycardia.</li>
<li><b>Stress response:</b> HR and contractility rise only slowly, after 5–10 min, from circulating catecholamines. Cardiac output depends on <b>preload</b> (Frank–Starling): keep filled, avoid sudden vasodilatation (care with neuraxial block).</li>
<li><b>Drugs:</b> atropine and glycopyrrolate do not raise HR. Ephedrine is less effective (indirect action lost). Direct agents work, often more strongly (β-receptor up-regulation): adrenaline, isoprenaline, dobutamine, noradrenaline. Neostigmine can still cause bradycardia and arrest: give with an anticholinergic, or use sugammadex. Pacing should be available.</li>
<li><b>ECG:</b> two P waves (donor and recipient atria with biatrial technique), RBBB common.</li>
<li><b>Ischaemia is silent</b> (no angina). Cardiac allograft vasculopathy is diffuse coronary disease.</li>
<li>Partial sympathetic reinnervation over years; parasympathetic rarely.</li>
<li><b>Immunosuppression:</b> ciclosporin/tacrolimus (renal impairment, hypertension, hyperkalaemia, drug interactions, lower seizure threshold), mycophenolate, steroids (consider stress dosing). Strict asepsis. Check for rejection and infection.</li></ul>`,
p:"Laparoscopy in a transplanted heart: pneumoperitoneum lowers venous return and the heart cannot respond with tachycardia, so pre-load first, insufflate slowly and keep pressures low.",
v:"Structure: physiology of denervation → pharmacology → immunosuppression → complications (rejection, infection, CAV, renal failure, malignancy) → anaesthetic plan pre, intra, post."},
{f:"app",t:"Fetal and transitional circulation",b:`<ul class="clean"><li>O2 comes from the placenta: umbilical vein PO2 ≈ 4–4.7 kPa, SaO2 ≈ 80–85% (HbF, P50 ≈ 2.4 kPa).</li>
<li><b>Ductus venosus</b>: ~50% of UV blood bypasses the liver to the IVC.</li>
<li>IVC blood (mixed, ~70%) is streamed by the Eustachian valve and crista dividens across the <b>foramen ovale</b> to the LA → LV → ascending aorta (~65%) to the heart and brain.</li>
<li>SVC blood (~40%) goes RA → RV → PA. High PVR means only ~10% reaches the lungs; ~90% crosses the <b>ductus arteriosus</b> to the descending aorta (~60%) and back to the placenta via two umbilical arteries.</li>
<li>Ventricles work in parallel; RV output ≈ 60% of combined output.</li></ul>
<p><b>At birth:</b> lung expansion and rising PAO2 drop PVR (NO, prostacyclin); cord clamping raises SVR. LA pressure exceeds RA → FO closes functionally within minutes (anatomically over months; ~25% of adults keep a PFO). DA closes functionally in 10–15 h (↑PaO2, ↓PGE2) and anatomically in 2–3 weeks. DV closes in 3–7 days.</p>`,
p:"Hypoxia, acidosis, hypothermia and sepsis can raise PVR again and reopen the shunts (persistent pulmonary hypertension of the newborn). Indomethacin or ibuprofen closes a PDA; alprostadil keeps it open in duct-dependent lesions.",
v:"Follow one red cell from the placenta round the fetus and back, naming the saturation at each step. Then describe the three shunts and when each closes."},
{f:"app",t:"Exercise physiology and CPET",b:`<ul class="clean"><li>VO2 rises from ~250 mL/min to 3–4 L/min (12–16 METs). 1 MET = 3.5 mL O2/kg/min.</li>
<li>CO rises up to 5× (to 20–25 L/min; 30+ in athletes): HR to ~220 − age, SV rises then plateaus. SBP rises, DBP barely changes, SVR falls (muscle vasodilatation from K⁺, adenosine, H⁺, CO2, heat).</li>
<li>Muscle flow rises up to 20×; coronary 4×; skin rises for heat loss; renal and splanchnic fall; cerebral unchanged.</li>
<li>Ventilation rises abruptly at onset (cortical and proprioceptive drive), then with CO2 production; beyond the anaerobic threshold lactate buffering adds CO2 and ventilation rises disproportionately.</li>
<li>O2 curve shifts right in muscle (heat, acidosis, CO2).</li></ul>
<p><b>CPET for surgical risk:</b> anaerobic threshold &lt; ~11 mL/kg/min and peak VO2 &lt; ~15 mL/kg/min mark higher risk for major surgery; VE/VCO2 &gt; ~34 indicates ventilatory inefficiency. Inability to climb two flights of stairs ≈ &lt; 4 METs.</p>`,
p:"The term is anaerobic threshold (not 'anabolic threshold').",
v:"CVS, respiratory, metabolic, then how CPET turns this into a preoperative number."},
];

const CALCS=[
 {t:"MAP, coronary perfusion and diastolic time",c:"abp",in:[["SBP mmHg","sbp",120],["DBP mmHg","dbp",75],["HR /min","hr",75],["LVEDP mmHg","lvedp",10]],
  f:(v,fmt)=>{const map=v.dbp+(v.sbp-v.dbp)/3,cpp=v.dbp-v.lvedp,ts=0.42-0.0012*v.hr,T=60/v.hr,td=T-ts,rpp=v.hr*v.sbp;return [["MAP",fmt(map,0)],["Pulse pressure",fmt(v.sbp-v.dbp,0)],["CPP",fmt(cpp,0),cpp<50?"bad":cpp<60?"warn":"ok"],["Diastole s/beat",fmt(td,2)],["Diastole % of cycle",fmt(td/T*100,0),td/T<0.5?"warn":"ok"],["Diastolic s per min",fmt(td*v.hr,1)],["RPP",fmt(rpp,0),rpp>12000?"warn":"ok"]]},
  n:"Systolic duration approximated as 0.42 − 0.0012 × HR s. Rate–pressure product > 12 000 is often quoted as the threshold for ischaemia in coronary disease."},
 {t:"Systemic and pulmonary resistance (indexed)",c:"nibp",in:[["MAP","map",90],["CVP","cvp",6],["MPAP","mpap",16],["PCWP","pcwp",9],["CO L/min","co",5.2],["BSA m²","bsa",1.85]],
  f:(v,fmt)=>{const ci=v.co/v.bsa,svr=(v.map-v.cvp)/v.co*80,pvr=(v.mpap-v.pcwp)/v.co*80;return [["CI",fmt(ci,1),ci<2.2?"bad":"ok"],["SVR",fmt(svr,0),svr<800?"warn":svr>1600?"warn":"ok"],["SVRI",fmt(svr*v.bsa,0)],["PVR",fmt(pvr,0),pvr>240?"bad":"ok"],["PVRI",fmt(pvr*v.bsa,0)],["TPG",fmt(v.mpap-v.pcwp,0)]]},
  n:"Units dyn·s·cm⁻⁵ (indexed: dyn·s·cm⁻⁵·m²). Normal SVR 900–1400, SVRI 1700–2400, PVR 50–150. TPG = transpulmonary gradient."},
 {t:"Fick cardiac output, stroke volume, ejection fraction",c:"spo2",in:[["VO2 mL/min","vo2",250],["Hb g/dL","hb",14],["SaO2 %","sao2",98],["SvO2 %","svo2",72],["HR /min","hr",72],["EDV mL","edv",125]],
  f:(v,fmt)=>{const avd=1.34*v.hb*(v.sao2-v.svo2)/100,co=v.vo2/(avd*10),sv=co*1000/v.hr;return [["a–v O2 mL/dL",fmt(avd,1)],["CO L/min",fmt(co,1),co<4?"bad":"ok"],["SV mL",fmt(sv,0)],["ESV mL",fmt(v.edv-sv,0)],["EF %",fmt(sv/v.edv*100,0),sv/v.edv<0.4?"bad":sv/v.edv<0.5?"warn":"ok"]]},
  n:"Fick: CO = VO2 / (CaO2 − CvO2). Dissolved O2 ignored. VO2 can be estimated as 125 mL/min/m²."},
 {t:"Poiseuille and Reynolds",c:"nibp",in:[["Radius change %","dr",-20],["Viscosity × normal","eta",1],["Length × normal","len",1],["Velocity cm/s","vel",30],["Vessel diameter cm","d",2.5],["Haematocrit %","hct",42]],
  f:(v,fmt)=>{const q=Math.pow(1+v.dr/100,4)/(v.eta*v.len);const visc=0.0035*v.eta*(0.6+v.hct/105),re=1060*(v.vel/100)*(v.d/100)/visc;return [["Flow × normal",fmt(q,2),q<0.5?"bad":"ok"],["Resistance × normal",fmt(1/q,2)],["Blood viscosity mPa·s",fmt(visc*1000,1)],["Reynolds number",fmt(re,0),re>2000?"warn":"ok"]]},
  n:"Q ∝ r⁴ / (η·l). Re = ρvd/η with ρ = 1060 kg/m³; viscosity scaled roughly with haematocrit. Aortic peak velocity ~100 cm/s gives Re near 4000 briefly."},
 {t:"Starling net filtration",c:"nibp",in:[["Pc mmHg","pc",25],["Pi mmHg","pi",-1],["πc mmHg","pic",25],["πi mmHg","pii",5],["σ","sig",0.9],["Kf (relative)","kf",1]],
  f:(v,fmt)=>{const out=v.pc-v.pi,inn=v.sig*(v.pic-v.pii),nfp=out-inn;return [["Outward ΔP",fmt(out,1)],["Effective inward",fmt(inn,1)],["Net pressure",fmt(nfp,1),nfp>5?"warn":"ok"],["Flux (relative)",fmt(v.kf*nfp,1)],["Direction",nfp>0?"Filtration":"Absorption"]]},
  n:"Jv = Kf[(Pc − Pi) − σ(πc − πi)]. Try low albumin (πc 15), sepsis (σ 0.5, Kf 3) or heart failure (Pc 35)."},
 {t:"Laplace: LV wall stress",c:"abp",in:[["LV pressure mmHg","p",120],["Internal radius cm","r",2.5],["Wall thickness cm","h",1.0]],
  f:(v,fmt)=>{const s=v.p*133.3*v.r/(2*v.h)/1000;return [["Wall stress kPa",fmt(s,1),s>25?"warn":"ok"],["vs normal (20 kPa)",fmt(s/20,2)+"×"]]},
  n:"σ = P·r / 2h for a thick-walled sphere. Dilated cardiomyopathy (r 3.5, h 0.8) raises stress; concentric hypertrophy (h 1.5) normalises it at the cost of stiffness and O2 demand."},
 {t:"Corrected QT",c:"ecg",in:[["QT ms","qt",400],["HR /min","hr",75],["Sex (1 = female, 0 = male)","f",0]],
  f:(v,fmt)=>{const rr=60/v.hr,baz=v.qt/Math.sqrt(rr),fri=v.qt/Math.cbrt(rr),fra=v.qt+154*(1-rr),hod=v.qt+1.75*(v.hr-60),lim=v.f?460:450;return [["Bazett",fmt(baz,0),baz>500?"bad":baz>lim?"warn":"ok"],["Fridericia",fmt(fri,0),fri>500?"bad":fri>lim?"warn":"ok"],["Framingham",fmt(fra,0)],["Hodges",fmt(hod,0)]]},
  n:"Bazett over-corrects at fast rates; Fridericia is preferred for drug monitoring. QTc > 500 ms carries a high risk of torsades."},
 {t:"Haemorrhage: EBV, allowable loss, shock index",c:"abp",in:[["Weight kg","wt",70],["EBV mL/kg (adult M 70, F 65, child 75–80, neonate 85–90)","ebv",70],["Start Hct %","h0",42],["Lowest acceptable Hct %","h1",27],["HR","hr",118],["SBP","sbp",96]],
  f:(v,fmt)=>{const E=v.wt*v.ebv,abl=E*(v.h0-v.h1)/((v.h0+v.h1)/2),si=v.hr/v.sbp;const cls=v.hr<100?"I":v.hr<=120?"II":v.hr<=140?"III":"IV";return [["EBV mL",fmt(E,0)],["Allowable loss mL",fmt(abl,0)],["Shock index",fmt(si,2),si>1?"bad":si>0.7?"warn":"ok"],["ATLS class by HR",cls,cls==="I"?"ok":cls==="II"?"warn":"bad"]]},
  n:"ABL = EBV × (Hi − Hf) / H average. ATLS class here uses HR alone; check BP, pulse pressure, RR, urine output, mental state and base deficit too."},
 {t:"Stroke work",c:"abp",in:[["SV mL","sv",70],["MAP","map",90],["PCWP","pcwp",9],["MPAP","mpap",16],["CVP","cvp",6],["BSA m²","bsa",1.85]],
  f:(v,fmt)=>{const lv=v.sv*(v.map-v.pcwp)*0.0136,rv=v.sv*(v.mpap-v.cvp)*0.0136;return [["LVSW g·m",fmt(lv,0)],["LVSWI g·m/m²",fmt(lv/v.bsa,0),lv/v.bsa<35?"warn":"ok"],["RVSW g·m",fmt(rv,1)],["RVSWI g·m/m²",fmt(rv/v.bsa,1)]]},
  n:"SW = SV × (mean ejection pressure − filling pressure) × 0.0136. Normal LVSWI 50–62, RVSWI 5–10 g·m/m²."},
];

const TABLES=[
 ["Normal haemodynamic values (adult)",["Site / variable","Value"],[["Right atrium / CVP","0–8 mmHg (mean)"],["Right ventricle","15–30 / 0–8 mmHg"],["Pulmonary artery","15–30 / 4–12, mean 9–18 mmHg"],["PCWP / PAOP","6–12 mmHg"],["Left ventricle","100–140 / 3–12 mmHg"],["Aorta","100–140 / 60–90, mean 70–105 mmHg"],["Cardiac output / index","4–8 L/min; 2.5–4 L/min/m²"],["Stroke volume / index","60–100 mL; 35–55 mL/m²"],["SVR / PVR","900–1400 / 50–150 dyn·s·cm⁻⁵"],["SvO2 / ScvO2","65–75% / ~70–80%"],["EF","55–70%"]]],
 ["Cardiac myocyte vs SA node action potential",["Feature","Ventricular myocyte","SA node"],[["Resting / max diastolic potential","−90 mV (stable)","−60 mV (unstable)"],["Threshold","≈ −70 mV","≈ −40 mV"],["Phase 0 current","Fast Na⁺","L-type Ca²⁺"],["Upstroke velocity","~200 V/s","~5 V/s"],["Phases present","0, 1, 2, 3, 4","0, 3, 4"],["Phase 4","Stable (I<sub>K1</sub>)","I<sub>f</sub>, T-type Ca²⁺, ↓K⁺ efflux"],["Conduction velocity","0.3–1 m/s","0.05 m/s (nodal tissue)"]]],
 ["Coronary territories and ECG leads",["Leads","Territory","Usual artery"],[["II, III, aVF","Inferior","RCA (~80%) or circumflex"],["V1–V2","Septal","LAD (septal branches)"],["V3–V4","Anterior","LAD"],["I, aVL, V5–V6","Lateral","Circumflex or diagonal"],["V7–V9, tall R + ST↓ in V1–V3","Posterior","RCA (PDA) or circumflex"],["V4R, ST↑ in V1 with inferior changes","Right ventricle","Proximal RCA"]]],
 ["ATLS classes of haemorrhage (70 kg adult)",["","I","II","III","IV"],[["Blood loss","< 15% (< 750 mL)","15–30% (750–1500)","30–40% (1500–2000)","> 40% (> 2000)"],["Heart rate","< 100","100–120","120–140","> 140"],["Systolic BP","Normal","Normal","↓","↓↓"],["Pulse pressure","Normal","↓","↓","↓"],["Respiratory rate","14–20","20–30","30–40","> 35"],["Urine mL/h","> 30","20–30","5–15","Negligible"],["Mental state","Slightly anxious","Anxious","Confused","Lethargic"],["Base deficit (ATLS 10)","0 to −2","−2 to −6","−6 to −10","< −10"],["Blood products","Monitor","Possible","Yes","Massive transfusion protocol"]]],
 ["Denervated heart: drug responses",["Drug","Response","Why"],[["Atropine, glycopyrrolate","No HR rise","No vagal tone to block"],["Ephedrine","Reduced","Indirect noradrenaline release lost; direct action remains"],["Adrenaline, isoprenaline, dobutamine","Normal or exaggerated","Direct β-agonists; receptor up-regulation"],["Noradrenaline, phenylephrine","Pressor effect, no reflex bradycardia","No baroreflex efferent to the heart"],["Neostigmine","Bradycardia, asystole reported","Direct muscarinic effect on the graft, partial reinnervation"],["Digoxin","Weak rate control","Rate control is mostly vagally mediated"],["Adenosine","Exaggerated, prolonged block","Receptor hypersensitivity: reduce the dose (or avoid)"],["Verapamil, β-blockers","Effective but may cause marked depression","Graft depends on circulating catecholamines"]]],
 ["Fetal shunts and their closure",["Structure","Fetal role","Functional closure","Remnant"],[["Ductus venosus","Bypasses liver","3–7 days","Ligamentum venosum"],["Foramen ovale","RA → LA","Minutes (LA > RA)","Fossa ovalis (PFO in ~25%)"],["Ductus arteriosus","PA → descending aorta","10–15 h (↑PaO2, ↓PGE2)","Ligamentum arteriosum"],["Umbilical vein","From placenta","Cord clamp","Ligamentum teres"],["Umbilical arteries","To placenta","Cord clamp","Medial umbilical ligaments"]]],
 ["ECG and electrolytes / temperature",["Condition","ECG"],[["Hyperkalaemia","Peaked T (> 5.5) → PR ↑, P flattens → wide QRS → sine wave → VF/asystole"],["Hypokalaemia","ST depression, flat T, U waves, long QU; torsades risk"],["Hypercalcaemia","Short QT"],["Hypocalcaemia","Long QT (long ST segment)"],["Hypomagnesaemia","Long QT, torsades"],["Hypothermia","Bradycardia, Osborn (J) waves, long PR/QRS/QT, AF, VF < 28 °C"],["Digoxin effect","Reverse-tick ST depression, short QT; toxicity: any arrhythmia, classically atrial tachycardia with block"]]],
 ["Valsalva responses",["Phase","Normal","Autonomic failure","Heart failure (square wave)"],[["I (strain onset)","BP ↑ briefly, HR ↓","BP ↑","BP ↑"],["II (sustained strain)","BP ↓ then recovers, HR ↑","BP falls progressively, no HR rise","BP stays raised"],["III (release)","BP ↓ briefly","BP ↓","No dip"],["IV (recovery)","BP overshoot, reflex bradycardia","No overshoot, no bradycardia","No overshoot"]]],
];

const CARDS=[
 ["elec","Resting membrane potential of a ventricular myocyte and its main current?","−90 mV; inward rectifier K⁺ current (I<sub>K1</sub>) keeps it near E<sub>K</sub>.".replace(/<[^>]+>/g,"")],
 ["elec","Ion responsible for phase 0 of the ventricular AP?","Fast Na⁺ influx (Nav1.5)."],
 ["elec","Ion responsible for the plateau (phase 2)?","L-type Ca²⁺ influx balanced against delayed-rectifier K⁺ efflux."],
 ["elec","Why can't cardiac muscle be tetanised?","The absolute refractory period (~250 ms) lasts almost as long as contraction."],
 ["elec","Ion responsible for phase 0 of the SA node AP?","L-type Ca²⁺ (fast Na⁺ channels are inactivated at −60 mV)."],
 ["elec","What is the funny current?","I<sub>f</sub>: Na⁺-dominant inward current through HCN channels, activated by hyperpolarisation; drives phase 4. Blocked by ivabradine.".replace(/<[^>]+>/g,"")],
 ["elec","How does vagal stimulation slow the SA node?","ACh on M2 → Gi → ↓cAMP (flatter phase 4) and opens I<sub>K-ACh</sub> (hyperpolarises).".replace(/<[^>]+>/g,"")],
 ["elec","Intrinsic rates of SA node, AV junction and ventricle?","100–110, 40–60 and 20–40 bpm."],
 ["elec","Conduction velocity in the AV node vs Purkinje fibres?","≈ 0.05 m/s vs 2–4 m/s."],
 ["elec","What triggers SR Ca²⁺ release in cardiac muscle?","Ca²⁺ entering through L-type channels opens RyR2: calcium-induced calcium release."],
 ["elec","Two mechanisms removing Ca²⁺ in diastole?","SERCA2a pump into the SR (regulated by phospholamban) and the Na⁺/Ca²⁺ exchanger."],
 ["elec","ECG correlate of phase 2 and phase 3?","ST segment and T wave."],
 ["elec","Earliest ECG sign of hyperkalaemia?","Peaked (tented) T waves, from about 5.5–6 mmol/L."],
 ["pump","Normal EDV, ESV, SV and EF?","EDV 120–130 mL, ESV 50–60 mL, SV ~70 mL, EF 55–70%."],
 ["pump","Contribution of atrial systole to ventricular filling?","15–20% at rest; up to 30–40% with stiff ventricles or tachycardia."],
 ["pump","Which heart sound marks the start of isovolumetric contraction?","S1 (mitral and tricuspid closure)."],
 ["pump","What causes the dicrotic notch?","Aortic valve closure with brief backflow and elastic recoil."],
 ["pump","Name the five CVP components.","a, c, v waves; x and y descents."],
 ["pump","Cannon a waves: regular vs irregular?","Regular: junctional rhythm. Irregular: complete heart block (AV dissociation)."],
 ["pump","CVP sign of tricuspid regurgitation?","Giant cv wave with loss of the x descent."],
 ["pump","Slope of the ESPVR represents?","End-systolic elastance (Ees): load-independent contractility."],
 ["pump","Effect of increased afterload on the PV loop?","Taller, narrower loop; ESV rises, SV falls; EDV unchanged at first."],
 ["pump","Which valve lesion removes isovolumetric contraction from the PV loop?","Mitral regurgitation."],
 ["pump","State Laplace's law for ventricular wall stress.","σ = P × r / 2h."],
 ["pump","Mechanism of the Frank–Starling law?","Optimal actin–myosin overlap and length-dependent troponin C Ca²⁺ sensitivity."],
 ["pump","Coronary blood flow at rest?","≈ 250 mL/min, ~5% of CO, ~80 mL/100 g/min."],
 ["pump","Myocardial O2 extraction at rest?","60–75%: coronary sinus SO2 ≈ 25–35%."],
 ["pump","Coronary perfusion pressure formula?","Aortic diastolic pressure − LVEDP."],
 ["pump","Main determinant of myocardial O2 demand?","Heart rate; then wall tension (preload, afterload) and contractility."],
 ["pump","Which artery supplies the AV node?","RCA in 80–90% (from the dominant artery)."],
 ["pump","Where do Thebesian veins drain?","Directly into the cardiac chambers, including the left side (physiological shunt)."],
 ["circ","Hagen–Poiseuille equation?","Q = ΔP·π·r⁴ / (8·η·l)."],
 ["circ","Reynolds number formula and turbulence threshold?","Re = ρvd/η; turbulence likely above ~2000."],
 ["circ","Where is most systemic resistance?","Arterioles (~50%)."],
 ["circ","Where is most blood volume?","Systemic veins and venules (~65–70%)."],
 ["circ","Mean systemic filling pressure?","≈ 7 mmHg: pressure throughout the circulation when flow stops."],
 ["circ","Stressed vs unstressed volume?","Stressed (~25–30%) stretches vessels and creates MSFP; unstressed fills them without pressure."],
 ["circ","Write the Starling filtration equation.","Jv = Kf[(Pc − Pi) − σ(πc − πi)]."],
 ["circ","What is the 'no-absorption rule'?","In the revised (glycocalyx) model most capillaries filter along their length at steady state; filtrate returns via lymph."],
 ["circ","Four mechanisms of oedema?","↑Capillary pressure, ↓plasma oncotic pressure, ↑permeability, lymphatic obstruction."],
 ["circ","Organ with the highest blood flow per gram?","Kidney (~400 mL/100 g/min)."],
 ["circ","Liver blood flow split?","Portal vein 75% of flow and ~50% of O2; hepatic artery 25% of flow and ~50% of O2."],
 ["ctrl","Afferent nerves of carotid sinus and aortic arch baroreceptors?","Carotid sinus: IX (nerve of Hering). Aortic arch: X."],
 ["ctrl","Operating range of arterial baroreceptors?","MAP ~60–180 mmHg; most sensitive around normal MAP."],
 ["ctrl","What happens to baroreceptors in chronic hypertension?","They reset: the curve shifts right."],
 ["ctrl","Bainbridge reflex?","Atrial stretch → tachycardia (vagal afferent, sympathetic efferent)."],
 ["ctrl","Bezold–Jarisch reflex?","LV receptor stimulation via vagal C fibres → bradycardia, vasodilatation, hypotension."],
 ["ctrl","Cushing's triad?","Hypertension, bradycardia, irregular respiration from raised ICP."],
 ["ctrl","Afferent and efferent of the oculocardiac reflex?","Trigeminal (ophthalmic division) afferent, vagal efferent."],
 ["ctrl","Valsalva phase II in autonomic neuropathy?","Progressive fall in BP without compensatory tachycardia; no phase IV overshoot."],
 ["ctrl","How fast does transcapillary refill restore volume after haemorrhage?","Up to ~0.5–1 L in the first hour, completing over 12–72 h."],
 ["ctrl","ATLS class III blood loss and heart rate?","30–40% (1.5–2 L); HR 120–140; SBP falls; confused."],
 ["app","Haemodynamic profile of septic (warm) shock?","Low SVR, high or normal CO, low or normal filling pressures, normal or high SvO2."],
 ["app","Neurogenic vs spinal shock?","Neurogenic: loss of sympathetic tone, hypotension and bradycardia. Spinal: temporary loss of reflexes below the cord lesion."],
 ["app","Resting heart rate of a transplanted heart?","90–110 bpm (intrinsic SA rate, no vagal tone)."],
 ["app","Does atropine work in a transplanted heart?","No: there is no vagal tone to block."],
 ["app","How does a denervated heart increase output during stress?","Preload (Frank–Starling) immediately; circulating catecholamines after 5–10 minutes."],
 ["app","Umbilical vein saturation in the fetus?","≈ 80–85% (PO2 ≈ 4–4.7 kPa)."],
 ["app","Proportion of RV output crossing the ductus arteriosus in the fetus?","≈ 90%; only ~10% perfuses the lungs."],
 ["app","Functional closure time of the ductus arteriosus?","10–15 hours; anatomical in 2–3 weeks."],
 ["app","1 MET equals?","3.5 mL O2/kg/min."],
 ["app","CPET anaerobic threshold marking higher surgical risk?","< ~11 mL/kg/min."],
];

const FCF={all:"All",elec:"Electrophysiology",pump:"Pump",circ:"Circulation",ctrl:"Control",app:"Applied"};

const VIVA=[
 {st:"SOE 1 · Physiology",q:"Draw the action potential of a ventricular myocyte. Relate it to the ECG and compare it with skeletal muscle.",a:["Axes in mV and ms; five phases with ions (Na⁺, I<sub>to</sub>, Ca²⁺ L-type vs K⁺, K⁺, I<sub>K1</sub>).","Refractory periods and why no tetany.","ECG: QRS = phase 0, ST = phase 2, T = phase 3, QT ≈ AP duration.","Spread of excitation: SA → atria → AV delay → His–Purkinje → endocardium to epicardium.","Comparison table: duration, plateau, Ca²⁺ source (CICR vs mechanical DHPR–RyR1), syncytium, force grading."],fu:"What happens to the action potential in hyperkalaemia and why does the QRS widen?"},
 {st:"SOE 1 · Physiology",q:"Describe the pacemaker potential. How is heart rate controlled?",a:["MDP −60, threshold −40, slow Ca²⁺ upstroke, no plateau.","Phase 4 currents: I<sub>f</sub> (HCN), declining K⁺, T-type Ca²⁺, NCX.","Three levers: slope, threshold, MDP.","Sympathetic β1/cAMP vs vagal M2/Gi/I<sub>K-ACh</sub>; intrinsic rate 100–110.","Clinical: ivabradine, denervated heart, sick sinus, drugs (β-blockers, Ca²⁺ blockers, adenosine)."],fu:"Why is the neonate prone to bradycardia?"},
 {st:"SOE 1 · Physiology",q:"Draw and explain the cardiac cycle. Correlate the CVP waveform with the ECG.",a:["ECG top; aortic, LV, LA pressure; LV volume; heart sounds.","Seven phases with valve events.","CVP: a after P, c at QRS, x descent in ejection, v at end of T, y after tricuspid opening.","Effect of tachycardia on diastole and coronary flow.","Abnormal waves: AF, TR, CHB, tamponade, constriction."],fu:"Why does atrial fibrillation cause such a drop in output in aortic stenosis?"},
 {st:"SOE 1 · Physiology",q:"Draw a left ventricular pressure–volume loop and show the effects of preload, afterload and contractility.",a:["Axes, ESPVR and EDPVR, anticlockwise loop with A–D points.","Width = SV, area = stroke work, Ea line.","↑Preload, ↑afterload, ↑contractility drawn separately.","Pathology: systolic vs diastolic failure, AS, MR, AR, ischaemia.","Clinical use: conductance catheter, echo-derived loops; ventriculo-arterial coupling (Ea/Ees ≈ 0.5–1)."],fu:"How would a volatile agent change the loop?"},
 {st:"SOE 1 · Physiology",q:"What are Starling forces? Explain how pulmonary oedema forms.",a:["Equation with typical numbers and σ.","Classic model and the revised glycocalyx model (no-absorption rule, lymph).","Pulmonary specifics: low Pc, safety factors (lymph, interstitial protein washout, Pi).","Causes: hydrostatic (LVF, overload), oncotic, permeability (ARDS), negative-pressure, neurogenic, re-expansion, altitude.","CXR stages: upper lobe diversion, interstitial (Kerley B, cuffing), alveolar (bat-wing)."],fu:"Why do colloids expand plasma volume less than predicted in sepsis?"},
 {st:"SOE 1 · Physiology",q:"Describe the coronary circulation and the factors that determine myocardial O2 supply and demand.",a:["Anatomy of LCA, RCA, dominance; venous drainage (coronary sinus, anterior cardiac, Thebesian).","Phasic flow: left mainly diastolic, right continuous.","Autoregulation and its mechanisms.","Supply vs demand table.","Theatre application: avoid tachycardia, maintain DBP, treat anaemia, avoid raised LVEDP; cardioplegia and hypothermia."],fu:"How would you measure coronary blood flow?"},
 {st:"SOE 1 · Physiology",q:"A patient loses 1 litre of blood. Describe the acute and chronic compensation.",a:["Classify (ATLS class II, ~15–20% of EBV).","Seconds: baroreflex, chemoreceptors, venoconstriction, redistribution.","Minutes–hours: transcapillary refill, catecholamines, RAAS, ADH, cortisol.","Days–weeks: aldosterone, thirst, albumin, EPO.","Effect of anaesthesia and β-blockers on these responses."],fu:"Why is pulse pressure an earlier sign than systolic pressure?"},
 {st:"SOE 3 · Anaesthesia",q:"A 58-year-old with a heart transplant on ciclosporin needs a laparoscopic appendicectomy. Worsening dyspnoea. Discuss.",a:["Differential for dyspnoea: rejection, CAV with silent ischaemia, infection, renal failure with fluid overload, sepsis from appendicitis.","Workup: echo, ECG (two P waves), troponin, BNP, renal function, drug levels, liaise with transplant team.","Physiology of denervation and its implications (preload dependence, delayed stress response, no baroreflex).","Drugs: what works and what does not; asepsis; steroid cover; avoid nephrotoxins.","Laparoscopy: low pressure, slow insufflation, head-up/down effects, pre-load, invasive BP; capnothorax risk."],fu:"The BP falls after insufflation and HR stays at 100. What do you do?"},
 {st:"SOE 1 · Physiology",q:"Describe the fetal circulation and the changes at birth.",a:["Placenta → UV (80–85%) → DV → IVC → FO → LA → LV → ascending aorta.","SVC → RV → PA → DA → descending aorta → umbilical arteries.","Why PVR is high in utero; parallel circulation; HbF.","Birth: lung expansion, PVR falls, SVR rises, FO, DA, DV closure and timing.","Transitional circulation and PPHN; anaesthetic relevance (avoid hypoxia, acidosis, hypothermia)."],fu:"How would you keep a ductus open in a neonate with a duct-dependent lesion?"},
 {st:"SOE 1 · Physiology",q:"Describe the baroreceptor reflex and the Valsalva manoeuvre.",a:["Receptors, afferents, NTS, vasomotor centre, efferents; operating range and resetting.","Low-pressure receptors and humoral links (ADH, ANP).","Valsalva: four phases with BP and HR traces.","Abnormal responses: autonomic neuropathy, heart failure (square wave), hypovolaemia.","Uses: autonomic testing, terminating SVT (modified Valsalva)."],fu:"Which anaesthetic agents depress the baroreflex most?"},
 {st:"SOE 2 · Pharmacology",q:"How can cardiac output be measured?",a:["Fick principle (O2, CO2 partial rebreathing), with equation.","Indicator dilution: dye, thermodilution (Stewart–Hamilton), lithium.","Pulse contour and pulse power analysis; calibrated vs uncalibrated.","Doppler: oesophageal (descending aorta flow, FTc, SV), transthoracic/transoesophageal echo (VTI × LVOT area).","Bioimpedance/bioreactance; MRI. Accuracy, invasiveness and errors (TR, shunts)."],fu:"Draw a thermodilution curve and show what a low cardiac output looks like."},
 {st:"SOE 4 · Critical care",q:"Classify shock. How would you tell the types apart at the bedside?",a:["Definition and the four or five types.","Haemodynamic profile table.","Bedside: history, skin (warm vs cold), JVP, POCUS (IVC, LV, RV, pericardium, lungs), lactate, SvO2.","Initial management of each type.","Monitoring escalation: arterial line, CVC, cardiac output monitoring."],fu:"Why is ScvO2 high in septic shock and is that reassuring?"},
 {st:"SOE 1 · Physiology",q:"Describe the cardiovascular changes during exercise and how CPET is used before surgery.",a:["VO2, CO, HR, SV, BP, SVR changes.","Regional flow redistribution and mechanisms.","Respiratory changes and the anaerobic threshold.","CPET variables: AT, peak VO2, VE/VCO2, O2 pulse.","Risk thresholds and how they guide consent and level of care."],fu:"What does a falling O2 pulse during CPET suggest?"},
];

const QUIZ=[
 ["Regarding the ventricular myocyte action potential",[["Phase 0 is due to fast sodium influx",1,""],["The plateau is due to T-type calcium channels",0,"L-type calcium channels."],["The absolute refractory period is about 250 ms",1,""],["Phase 3 corresponds to the T wave",1,""],["Resting potential is about −60 mV",0,"About −90 mV; −60 mV is the SA node maximum diastolic potential."]]],
 ["The sinoatrial node",[["Has a stable resting membrane potential",0,"It drifts upwards in phase 4."],["Depolarises in phase 0 mainly by calcium influx",1,"L-type Ca²⁺."],["Has an intrinsic rate of about 100–110 bpm",1,""],["Is supplied by the right coronary artery in about 60%",1,""],["Is slowed by ivabradine through calcium channel block",0,"Ivabradine blocks the funny current (HCN)."]]],
 ["During the cardiac cycle",[["The c wave occurs during isovolumetric contraction",1,""],["The aortic valve opens at the start of isovolumetric contraction",0,"It opens at the end of isovolumetric contraction."],["The second heart sound coincides with aortic valve closure",1,""],["Most ventricular filling occurs during atrial systole",0,"About 80% fills passively in early diastole."],["Diastole shortens more than systole as heart rate rises",1,""]]],
 ["Pressure–volume loops",[["Stroke work is the area enclosed by the loop",1,""],["The slope of the ESPVR reflects contractility",1,""],["Increased preload mainly increases end-systolic volume",0,"It mainly increases EDV and SV."],["Mitral regurgitation removes true isovolumetric contraction",1,""],["Diastolic dysfunction steepens the EDPVR",1,""]]],
 ["Coronary blood flow",[["Is about 5% of cardiac output",1,""],["In the left ventricle occurs mainly in systole",0,"Mainly in diastole."],["Is autoregulated by adenosine among other metabolites",1,""],["Myocardial O2 extraction at rest is about 25%",0,"60–75%."],["Coronary perfusion pressure is aortic diastolic pressure minus LVEDP",1,""]]],
 ["Concerning haemodynamics",[["Flow is proportional to the fourth power of radius in laminar flow",1,"Poiseuille."],["Most systemic resistance lies in the capillaries",0,"Arterioles."],["Turbulence is more likely in anaemia",1,"Lower viscosity raises Reynolds number."],["Most blood volume is in the veins",1,""],["A stiff aorta lowers pulse pressure",0,"It widens pulse pressure."]]],
 ["Venous return",[["Equals cardiac output at steady state",1,""],["Is driven by the gradient between MSFP and right atrial pressure",1,""],["Increases when right atrial pressure rises",0,"It falls."],["Falls with positive pressure ventilation",1,"RAP rises."],["MSFP is normally about 25 mmHg",0,"About 7 mmHg."]]],
 ["Starling forces and oedema",[["Hypoalbuminaemia favours oedema",1,""],["A reflection coefficient of 1 means the membrane is fully permeable to protein",0,"σ = 1 means impermeable."],["Lymphatic flow can rise several-fold as a safety factor",1,""],["The glycocalyx is a determinant of transcapillary flux",1,""],["Pulmonary capillary pressure is normally about 25 mmHg",0,"About 7–10 mmHg."]]],
 ["Arterial baroreceptors",[["Carotid sinus afferents run in the glossopharyngeal nerve",1,""],["Aortic arch afferents run in the vagus",1,""],["Respond to the rate of change of pressure",1,""],["Are reset to a lower range in chronic hypertension",0,"Reset to a higher range."],["Are enhanced by volatile anaesthetics",0,"Depressed."]]],
 ["Cardiovascular reflexes",[["Bainbridge reflex causes tachycardia with atrial distension",1,""],["Bezold–Jarisch reflex causes bradycardia and hypotension",1,""],["The oculocardiac reflex has a vagal afferent",0,"Trigeminal afferent, vagal efferent."],["Cushing's response includes bradycardia",1,""],["The diving reflex causes peripheral vasodilatation",0,"Peripheral vasoconstriction."]]],
 ["After acute haemorrhage",[["Pulse pressure narrows before systolic pressure falls",1,""],["Transcapillary refill begins within minutes",1,""],["Haemoglobin concentration falls immediately",0,"It falls as plasma volume is restored over hours."],["ADH causes vasoconstriction through V1 receptors",1,""],["Reticulocytosis is seen within 2–3 days",1,""]]],
 ["The transplanted heart",[["Has a resting rate higher than normal",1,"~90–110 bpm."],["Responds to atropine with tachycardia",0,"No vagal tone to block."],["Relies on preload to increase stroke volume",1,""],["Shows an exaggerated response to adenosine",1,""],["Experiences typical angina with ischaemia",0,"Ischaemia is usually silent."]]],
 ["The fetal circulation",[["The umbilical vein carries the most oxygenated blood",1,""],["Most right ventricular output enters the lungs",0,"About 90% crosses the ductus arteriosus."],["The foramen ovale closes when left atrial pressure exceeds right",1,""],["Prostaglandin E2 helps keep the ductus open",1,""],["The ductus venosus carries blood from the aorta to the IVC",0,"From the umbilical vein to the IVC, bypassing the liver."]]],
 ["During dynamic exercise",[["Systolic BP rises more than diastolic",1,""],["SVR rises",0,"SVR falls (muscle vasodilatation)."],["Cerebral blood flow increases several-fold",0,"Essentially unchanged."],["Skeletal muscle flow may rise 20-fold",1,""],["The respiratory exchange ratio exceeds 1 beyond the anaerobic threshold",1,""]]],
];

const CRISIS=[
 ["Major haemorrhage in theatre","abp",["Declare major haemorrhage; activate the protocol; tell the surgeon and get senior help.","Large-bore access (or rapid infuser), arterial line, warm everything, cell salvage.","Give blood products early in balanced ratio (RBC:FFP about 1:1 to 2:1), platelets after 1 blood volume or < 75 × 10⁹/L.","Tranexamic acid 1 g (trauma: within 3 h); fibrinogen to > 1.5–2 g/L guided by viscoelastic testing.","Correct Ca²⁺ (ionised > 1.1 mmol/L), K⁺, acidosis, temperature > 36 °C.","Permissive hypotension in penetrating trauma until surgical control (not with TBI)."],"Lethal triad: hypothermia, acidosis, coagulopathy. Calcium falls with citrate load."],
 ["Bradycardia under anaesthesia","ecg",["Assess: real (pulse, arterial line), rate, rhythm, BP.","Stop the stimulus: peritoneal or eye traction, laryngoscopy, pneumoperitoneum, cervical dilatation.","Check for hypoxia, high spinal, drug causes (remifentanil, suxamethonium second dose, neostigmine, dexmedetomidine, β-blockers).","Treat if hypotensive: glycopyrrolate 200–400 µg or atropine 300–600 µg (up to 3 mg); ephedrine.","If unresponsive: adrenaline 2–10 µg/min, isoprenaline, transcutaneous or transvenous pacing.","Transplanted heart: skip anticholinergics, go to isoprenaline/adrenaline and pacing."],"Vagal reflex arcs (oculocardiac, Bezold–Jarisch, trigeminocardiac) explain most theatre bradycardias."],
 ["Hypotension after spinal anaesthesia","nibp",["Expect it: preload or co-load with crystalloid (obstetrics: co-load 1 L).","Left uterine displacement in pregnancy (aortocaval compression).","Phenylephrine infusion (e.g. 25–50 µg/min) titrated to baseline SBP in obstetrics; noradrenaline as an alternative.","Bradycardia with hypotension: ephedrine or glycopyrrolate; consider high block.","Check block height; T4 or above blocks cardiac accelerator fibres.","Severe collapse: treat as Bezold–Jarisch / arrest: adrenaline early."],"Spinal lowers stressed volume (venodilatation) and SVR; a high block removes T1–T4 cardioaccelerator fibres."],
 ["Tachyarrhythmia with shock","abp",["Adverse features: shock, syncope, myocardial ischaemia, heart failure.","If any present: synchronised DC cardioversion up to 3 attempts (sedation or GA).","Then amiodarone 300 mg over 10–20 min and repeat shock.","Correct K⁺ (4.5–5.0), Mg²⁺, hypovolaemia, light anaesthesia, hypercapnia, central line irritation.","Stable narrow complex regular: vagal manoeuvres, adenosine 6 → 12 → 18 mg (lower in transplant)."],"Short diastole reduces filling and coronary perfusion together, so tachycardia can cause the shock it accompanies."],
 ["Hyperkalaemia with ECG changes","ecg",["Stop K⁺ sources (suxamethonium, stored blood, K⁺-containing fluids).","Calcium chloride 10% 10 mL (or gluconate 30 mL) to stabilise the membrane; repeat if ECG unchanged.","Insulin 10 units with 25 g glucose; salbutamol 10–20 mg nebulised.","Sodium bicarbonate if acidotic; hyperventilate if on a ventilator.","Remove K⁺: dialysis or haemofiltration, binders.","Pacemaker patients: rising capture threshold can cause loss of capture."],"High extracellular K⁺ depolarises the RMP, inactivating Na⁺ channels: slow conduction, wide QRS, sine wave."],
 ["Torsades de pointes","ecg",["Pulseless: defibrillate (unsynchronised) and follow ALS.","Magnesium sulfate 2 g IV over 10 min.","Stop QT-prolonging drugs (ondansetron, droperidol, haloperidol, macrolides, methadone, sevoflurane in long QT).","Correct K⁺, Mg²⁺, Ca²⁺.","Overdrive pacing or isoprenaline to raise the rate if recurrent and bradycardia-dependent."],"Long phase 3 allows early afterdepolarisations; faster rates shorten the AP."],
];

const SRC="";
const ERR="";
const REFS="";

const DIAG=`<div class="grid2">
 <div class="fig"><h3>Cardiac action potentials</h3>
  <div class="ctl"><div class="seg" id="ap-mode"></div>
   <label>Autonomic tone <input type="range" id="ap-tone" min="-1" max="1" step="0.05" value="0"><output id="ap-tone-o">neutral</output></label>
   <label>Plasma K⁺ mmol/L <input type="range" id="ap-k" min="2.5" max="8" step="0.1" value="4"><output id="ap-k-o">4.0</output></label>
   <div class="seg" id="ap-dn"></div></div>
  <div class="svgbox"><svg id="ap" viewBox="0 0 520 300" role="img" aria-label="Cardiac action potentials"></svg></div>
  <div class="readout" id="ap-r"></div></div>

 <div class="fig"><h3>Wiggers diagram: the cardiac cycle</h3>
  <div class="ctl"><label>Heart rate /min <input type="range" id="wg-hr" min="45" max="160" step="1" value="72"><output id="wg-hr-o">72</output></label></div>
  <div class="svgbox"><svg id="wg" viewBox="0 0 520 560" role="img" aria-label="Wiggers diagram"></svg></div>
  <div class="readout" id="wg-r"></div></div>

 <div class="fig"><h3>Pressure–volume loop</h3>
  <div class="seg" id="pv-pre"></div>
  <div class="ctl">
   <label>Preload: EDV mL <input type="range" id="pv-edv" min="70" max="230" step="1" value="120"><output id="pv-edv-o"></output></label>
   <label>Contractility: Ees <input type="range" id="pv-ees" min="0.6" max="4.5" step="0.05" value="2.5"><output id="pv-ees-o"></output></label>
   <label>Afterload: Ea <input type="range" id="pv-ea" min="0.6" max="4" step="0.05" value="1.6"><output id="pv-ea-o"></output></label>
   <label>Diastolic stiffness <input type="range" id="pv-k" min="0.012" max="0.04" step="0.001" value="0.02"><output id="pv-k-o"></output></label></div>
  <div class="svgbox"><svg id="pv" viewBox="0 0 520 330" role="img" aria-label="Pressure volume loop"></svg></div>
  <div class="readout" id="pv-r"></div></div>

 <div class="fig"><h3>Guyton: venous return meets cardiac function</h3>
  <div class="seg" id="gy-pre"></div>
  <div class="ctl">
   <label>MSFP (volume) mmHg <input type="range" id="gy-m" min="3" max="15" step="0.1" value="7"><output id="gy-m-o"></output></label>
   <label>Venous resistance × <input type="range" id="gy-r" min="0.5" max="2" step="0.05" value="1"><output id="gy-r-o"></output></label>
   <label>Contractility × <input type="range" id="gy-c" min="0.4" max="1.8" step="0.05" value="1"><output id="gy-c-o"></output></label>
   <label>Pleural pressure shift mmHg <input type="range" id="gy-p" min="-4" max="8" step="0.5" value="0"><output id="gy-p-o"></output></label></div>
  <div class="svgbox"><svg id="gy" viewBox="0 0 520 320" role="img" aria-label="Guyton curves"></svg></div>
  <div class="readout" id="gy-out"></div></div>

 <div class="fig"><h3>CVP waveform</h3>
  <div class="seg" id="cv-sel"></div>
  <div class="svgbox"><svg id="cv" viewBox="0 0 520 300" role="img" aria-label="CVP waveform"></svg></div>
  <div class="readout" id="cv-r"></div></div>

 <div class="fig"><h3>Starling forces along a capillary</h3>
  <div class="ctl">
   <label>Arteriolar Pc <input type="range" id="sf-pa" min="20" max="50" step="1" value="35"><output id="sf-pa-o"></output></label>
   <label>Venular Pc <input type="range" id="sf-pv" min="8" max="30" step="1" value="15"><output id="sf-pv-o"></output></label>
   <label>Plasma oncotic πc <input type="range" id="sf-pc" min="10" max="32" step="0.5" value="25"><output id="sf-pc-o"></output></label>
   <label>Reflection σ <input type="range" id="sf-s" min="0.3" max="1" step="0.05" value="0.9"><output id="sf-s-o"></output></label></div>
  <div class="svgbox"><svg id="sf" viewBox="0 0 520 300" role="img" aria-label="Starling forces"></svg></div>
  <div class="readout" id="sf-r"></div></div>

 <div class="fig"><h3>Valsalva manoeuvre</h3>
  <div class="seg" id="va-sel"></div>
  <div class="svgbox"><svg id="va" viewBox="0 0 520 420" role="img" aria-label="Valsalva manoeuvre"></svg></div>
  <div class="readout" id="va-r"></div></div>

 <div class="fig"><h3>Baroreceptor response curve</h3>
  <div class="seg" id="br-sel"></div>
  <div class="svgbox"><svg id="br" viewBox="0 0 520 290" role="img" aria-label="Baroreceptor curve"></svg></div>
  <div class="readout" id="br-r"></div></div>

 <div class="fig" style="grid-column:1/-1"><h3>Fetal circulation</h3>
  <div class="seg" id="fe-sel"></div>
  <div class="svgbox"><svg id="fe" viewBox="0 0 900 430" role="img" aria-label="Fetal circulation schematic"></svg></div>
  <div class="readout" id="fe-r"></div></div>
</div>`;

function initDiagrams(){
 const out=(id,t)=>{const o=$("#"+id+"-o");if(o)o.textContent=t};
 const mk=(svg)=>(t,a,tx)=>{const e=document.createElementNS(SVGNS,t);for(const k in a)e.setAttribute(k,a[k]);if(tx!=null)e.textContent=tx;svg.append(e);return e};
 const smooth=(x,a,b)=>{const t=Math.min(1,Math.max(0,(x-a)/(b-a)));return t*t*(3-2*t)};
 const gauss=(x,m,s)=>Math.exp(-Math.pow((x-m)/s,2)/2);

 /* ---------- 1. Action potentials ---------- */
 let apMode="myo",apDen=false;
 function drawAP(){
  const tone=+$("#ap-tone").value,K=+$("#ap-k").value;
  out("ap-tone",apDen?"no effect (denervated)":tone>0.05?`sympathetic +${tone.toFixed(2)}`:tone<-0.05?`vagal ${tone.toFixed(2)}`:"neutral");out("ap-k",K.toFixed(1));
  const Ek=61.5*Math.log10(K/140),rmp=Math.max(Ek+4,-100);
  // SA node parameters
  let thr=-40-2*Math.max(0,tone),mdp=-60-5*Math.max(0,-tone),s0=20/0.583,s=s0*(tone>=0?1+1.2*tone:1+0.5*tone);
  if(apDen){thr=-40;mdp=-60;s=20/0.35}
  const t4=(thr-mdp)/s,HR=60/(t4+0.25);
  const myo=t=>{if(t<20)return rmp;if(t<22)return rmp+(25-rmp)*smooth(t,20,22);if(t<32)return 25-20*smooth(t,22,32);if(t<230)return 5-15*smooth(t,32,230);if(t<330)return -10+(rmp+10)*smooth(t,230,330);return rmp};
  const sa=(tms,period)=>{const ph=(tms%period)/1000,up=t4,cyc=period/1000;if(ph<up)return mdp+(thr-mdp)*(ph/up)*(1+0.15*(ph/up)*(ph/up-1));if(ph<up+0.05)return thr+(15-thr)*smooth(ph,up,up+0.05);if(ph<up+0.25)return 15+(mdp-15)*smooth(ph,up+0.05,up+0.25);return mdp};
  const nerve=t=>t<20?-70:t<20.5?-70+105*smooth(t,20,20.5):t<21.5?35-110*smooth(t,20.5,21.5):t<26?-75+5*smooth(t,21.5,26):-70;
  const skel=t=>t<20?-90:t<21?-90+120*smooth(t,20,21):t<24?30-125*smooth(t,21,24):-90+0*t;
  let P,txt;
  if(apMode==="sa"){
   const per=60000/HR;P=plot($("#ap"),{x0:0,x1:2000,y0:-80,y1:30,xt:[0,500,1000,1500,2000],yt:[-80,-60,-40,-20,0,20],xl:"Time (ms)",yl:"Membrane potential (mV)"});
   P.line(range(0,2000,600).map(t=>[t,sa(t+per-0.2*per,per)]),{stroke:"var(--etco2)"});
   P.add("line",{x1:P.X(0),x2:P.X(2000),y1:P.Y(thr),y2:P.Y(thr),stroke:"var(--muted)","stroke-dasharray":"4 4"});P.text(1500,thr+3,"threshold "+thr.toFixed(0)+" mV");
   txt=`SA node · MDP ${mdp.toFixed(0)} mV · threshold ${thr.toFixed(0)} mV · phase 4 slope ${s.toFixed(0)} mV/s → <b>${HR.toFixed(0)} bpm</b>${apDen?" (denervated: intrinsic rate, ignores the tone slider)":""}. Phase 4: I<sub>f</sub> + T-type Ca²⁺; phase 0: L-type Ca²⁺; phase 3: K⁺.`;
  }else if(apMode==="myo"){
   P=plot($("#ap"),{x0:0,x1:400,y0:-100,y1:40,xt:[0,100,200,300,400],yt:[-100,-80,-60,-40,-20,0,20,40],xl:"Time (ms)",yl:"Membrane potential (mV)"});
   P.add("rect",{x:P.X(20),y:P.Y(40),width:P.X(270)-P.X(20),height:P.Y(-100)-P.Y(40),fill:"var(--abp)",opacity:.07});P.text(110,34,"absolute refractory",{fill:"var(--abp)"});
   P.add("rect",{x:P.X(270),y:P.Y(40),width:P.X(320)-P.X(270),height:P.Y(-100)-P.Y(40),fill:"var(--etco2)",opacity:.09});P.text(272,24,"RRP",{fill:"var(--etco2)"});
   P.line(range(0,400,400).map(t=>[t,myo(t)]),{stroke:"var(--ecg)"});
   [[8,rmp+6,"4"],[23,30,"0"],[36,12,"1"],[130,8,"2"],[290,-50,"3"],[370,rmp+6,"4"]].forEach(([x,y,l])=>P.text(x,y,l,{fill:"var(--ink)","font-weight":"700"}));
   txt=`Ventricular myocyte · E<sub>K</sub> ${Ek.toFixed(0)} mV → resting ≈ ${rmp.toFixed(0)} mV. ${K>5.5?"Hyperkalaemia: RMP less negative, fewer Na⁺ channels available → slower phase 0 (wide QRS), faster phase 3 (peaked T).":K<3.5?"Hypokalaemia: RMP more negative, but reduced I<sub>K</sub> slows repolarisation → long QU, U waves, arrhythmias.":"Normal K⁺."}`;
  }else{
   P=plot($("#ap"),{x0:0,x1:400,y0:-100,y1:40,xt:[0,100,200,300,400],yt:[-100,-60,-20,20],xl:"Time (ms)",yl:"Membrane potential (mV)"});
   const per=60000/HR;
   P.line(range(0,400,800).map(t=>[t,nerve(t)]),{stroke:"var(--nibp)","stroke-width":1.8});
   P.line(range(0,400,800).map(t=>[t,skel(t)]),{stroke:"var(--spo2)","stroke-width":1.8});
   P.line(range(0,400,400).map(t=>[t,myo(t)]),{stroke:"var(--ecg)"});
   P.line(range(0,400,400).map(t=>[t,sa(t+per-(t4*1000)+20,per)]),{stroke:"var(--etco2)"});
   P.text(30,-62,"nerve 1 ms",{fill:"var(--nibp)"});P.text(30,-80,"skeletal 3 ms",{fill:"var(--spo2)"});P.text(150,14,"myocyte",{fill:"var(--ecg)"});P.text(150,-40,"SA node",{fill:"var(--etco2)"});
   txt="Overlay on one time scale: the nerve and skeletal muscle spikes are over before the myocyte plateau begins. The long plateau and refractory period protect the heart from tetany and re-entry.";
  }
  $("#ap-r").innerHTML=txt;
 }
 seg($("#ap-mode"),[["myo","Ventricular myocyte"],["sa","SA node"],["all","Overlay: nerve, skeletal, cardiac"]],v=>{apMode=v;drawAP()},"myo");
 seg($("#ap-dn"),[["n","Innervated"],["d","Denervated"]],v=>{apDen=v==="d";drawAP()},"n");
 ["#ap-tone","#ap-k"].forEach(s=>$(s).oninput=drawAP);

 /* ---------- 2. Wiggers ---------- */
 function drawWG(){
  const hr=+$("#wg-hr").value;out("wg-hr",hr);
  const T=60/hr,Ts=0.42-0.0012*hr,ivc=0.05,ivr=0.07,Td=T-Ts,aKick=Math.min(0.1,Td*0.3),avo=ivc,avc=Ts,mvo=Ts+ivr;
  const ej=t=>(t-avo)/(avc-avo);
  const lv=t=>{if(t<avo)return 8+72*smooth(t,0,avo);if(t<avc){const u=ej(t);return 80+48*Math.sin(Math.PI*Math.pow(u,0.8))-(u>0.6?(u-0.6)*40:0)+ (u>0.9?-(u-0.9)*80:0)}
   if(t<mvo)return 96*(1-smooth(t,avc,mvo))+4;const fill=t-mvo,end=T-aKick;if(t<end)return 3+3*(fill/(end-mvo));return 6+6*Math.sin(Math.PI*(t-end)/aKick)};
  const ao=t=>{const decay=(x0,dt)=>80+(x0-80)*Math.exp(-dt/0.35);if(t<avo)return decay(86,T-Ts+t)-0;if(t<avc)return Math.max(lv(t)-3,decay(86,T-Ts+t));const pe=Math.max(lv(avc)-3,80);const dt=t-avc;return decay(pe-6+5*gauss(dt,0.03,0.012)*1.4,dt)};
  const la=t=>{const end=T-aKick;let v=5;v+=2.5*gauss(t,0.025,0.012);if(t>avo&&t<avc)v-=3*smooth(t,avo,avo+0.08);if(t>=avc-0.04)v=2+8*smooth(t,avc-0.05,mvo);if(t>mvo)v=10-6*smooth(t,mvo,mvo+0.09)+2*smooth(t,mvo+0.1,end);if(t>end)v=6+5*Math.sin(Math.PI*(t-end)/aKick);return v};
  const vol=t=>{const edv=120,esv=50;if(t<avo)return edv;if(t<avc){const u=ej(t);return edv-(edv-esv)*(1-Math.pow(1-u,1.8))}if(t<mvo)return esv;const end=T-aKick;if(t<end){const f=t-mvo;return esv+(108-esv)*(1-Math.exp(-f/0.07))}return 108+12*smooth(t,end,T)};
  const ecg=t=>{const tp=T-aKick-0.06;return 0.15*gauss(t,tp,0.02)+(t<0.04?(-0.1*gauss(t,0.0,0.006)+1.0*gauss(t,0.015,0.006)-0.25*gauss(t,0.03,0.006)):0)+(1.0*gauss(t-T,0.015,0.006))+0.3*gauss(t,Ts-0.06,0.035)};
  const lca=t=>{if(t<avo)return 30*(1-smooth(t,0,avo))-5*smooth(t,0,avo);if(t<avc)return 15+10*Math.sin(Math.PI*ej(t));const d=t-avc;return 100*smooth(d,0,0.04)*Math.exp(-d/0.9)+15};
  const rca=t=>{if(t<avc&&t>=avo)return 45+20*Math.sin(Math.PI*ej(t));if(t<avo)return 45;const d=t-avc;return 45+15*Math.exp(-d/0.5)};
  const svg=$("#wg");svg.innerHTML="";const N=400,ts=range(0,T,N);
  const P1=plot(svg,{w:520,h:240,x0:0,x1:T,y0:0,y1:135,yt:[0,40,80,120],yl:"Pressure mmHg",mb:10,clear:false});
  P1.line(ts.map(t=>[t,ao(t)]),{stroke:"var(--abp)"});P1.line(ts.map(t=>[t,lv(t)]),{stroke:"var(--ink)"});P1.line(ts.map(t=>[t,la(t)]),{stroke:"var(--nibp)"});
  P1.text(avc+0.02,ao(avc+0.05)+8,"aorta",{fill:"var(--abp)"});P1.text(ej?(avo+avc)/2-0.04:0,lv((avo+avc)/2)+8,"LV",{fill:"var(--ink)"});P1.text(T*0.72,20,"LA (a, c, v)",{fill:"var(--nibp)"});
  const P2=plot(svg,{w:520,h:110,x0:0,x1:T,y0:40,y1:130,yt:[50,120],yl:"LV vol",mb:10,mt:6,clear:false,yOff:240});
  P2.line(ts.map(t=>[t,vol(t)]),{stroke:"var(--spo2)"});P2.text(T*0.02,124,"EDV 120",{fill:"var(--spo2)"});P2.text(avc,56,"ESV 50",{fill:"var(--spo2)"});
  const P3=plot(svg,{w:520,h:80,x0:0,x1:T,y0:-0.4,y1:1.1,yt:[],yl:"ECG",mb:6,mt:4,clear:false,yOff:350});
  P3.line(range(0,T,N).map(t=>[t,ecg(t)]),{stroke:"var(--ecg)","stroke-width":1.8});
  const P4=plot(svg,{w:520,h:130,x0:0,x1:T,y0:-10,y1:110,yt:[0,50,100],yl:"Cor. flow",xl:"Time (s) · one beat from the R wave",mb:34,mt:6,clear:false,yOff:430,xt:range(0,Math.floor(T*10)/10,Math.floor(T*10)).map(x=>+x.toFixed(1))});
  P4.line(ts.map(t=>[t,lca(t)]),{stroke:"var(--etco2)"});P4.line(ts.map(t=>[t,rca(t)]),{stroke:"var(--nibp)","stroke-dasharray":"5 4","stroke-width":1.8});
  P4.text(avc+0.03,104,"left coronary",{fill:"var(--etco2)"});P4.text(avc+0.03,30,"right coronary",{fill:"var(--nibp)"});
  const add=mk(svg);[[0,"MVC · S1"],[avo,"AVO"],[avc,"AVC · S2"],[mvo,"MVO"]].forEach(([t,l],i)=>{const x=P1.X(t);add("line",{x1:x,x2:x,y1:14,y2:530,stroke:"var(--muted)","stroke-dasharray":"3 4","stroke-width":1});add("text",{x:x+3,y:12+(i%2)*11,"font-size":"10"},l)});
  add("rect",{x:P1.X(0),y:2,width:P1.X(avc)-P1.X(0),height:4,fill:"var(--abp)",opacity:.5});add("rect",{x:P1.X(avc),y:2,width:P1.X(T)-P1.X(avc),height:4,fill:"var(--spo2)",opacity:.5});
  $("#wg-r").innerHTML=`Cycle ${(T*1000).toFixed(0)} ms · systole ${(Ts*1000).toFixed(0)} ms · diastole ${(Td*1000).toFixed(0)} ms (<b>${(Td/T*100).toFixed(0)}%</b> of the cycle) · left coronary perfusion time ${(Td*hr).toFixed(1)} s per minute${Td/T<0.5?" · diastole now shorter than systole: subendocardial ischaemia risk":""}. Red bar = systole, cyan = diastole.`;
 }
 $("#wg-hr").oninput=drawWG;drawWG();

 /* ---------- 3. PV loop ---------- */
 const PVP={normal:[120,2.5,1.6,0.02,""],pre:[160,2.5,1.6,0.02,""],aft:[120,2.5,3.0,0.02,""],con:[120,4,1.6,0.02,""],sys:[190,0.9,1.6,0.016,""],dia:[110,2.5,1.8,0.034,""],as:[115,3.2,2.0,0.03,"as"],mr:[170,2.2,1.0,0.018,"mr"],ar:[220,2.2,1.4,0.013,"ar"]};
 let pvFlag="";
 function setPV(k){const p=PVP[k];$("#pv-edv").value=p[0];$("#pv-ees").value=p[1];$("#pv-ea").value=p[2];$("#pv-k").value=p[3];pvFlag=p[4];drawPV()}
 function drawPV(){
  const EDV=+$("#pv-edv").value,Ees=+$("#pv-ees").value,Ea=+$("#pv-ea").value,k=+$("#pv-k").value,V0=10;
  out("pv-edv",EDV);out("pv-ees",Ees.toFixed(2)+" mmHg/mL");out("pv-ea",Ea.toFixed(2)+" mmHg/mL");out("pv-k",k.toFixed(3));
  const edp=V=>Math.exp(k*(V-V0))-1;
  const ESV=(Ea*EDV+Ees*V0)/(Ees+Ea),Pes=Ees*(ESV-V0),EDP=edp(EDV);
  const grad=pvFlag==="as"?55:0,Pao=Math.max(EDP+10,0.72*Pes)+(pvFlag==="as"?grad*0.6:0);
  const P=plot($("#pv"),{w:520,h:330,x0:0,x1:250,y0:0,y1:200,xt:[0,50,100,150,200,250],yt:[0,40,80,120,160,200],xl:"LV volume (mL)",yl:"LV pressure (mmHg)"});
  P.line(range(V0,Math.min(250,V0+200/Ees),40).map(V=>[V,Ees*(V-V0)]),{stroke:"var(--abp)","stroke-dasharray":"6 4","stroke-width":1.5});
  P.line(range(V0,250,120).map(V=>[V,Math.min(200,edp(V))]),{stroke:"var(--spo2)","stroke-dasharray":"6 4","stroke-width":1.5});
  P.line([[EDV,0],[ESV,Pes]],{stroke:"var(--etco2)","stroke-dasharray":"3 4","stroke-width":1.4});
  const pts=[];const n=60;
  if(pvFlag==="mr"){for(let i=0;i<=n;i++){const u=i/n;pts.push([EDV-(EDV-ESV)*u*u*0.35-(EDV-ESV)*0.0*u,EDP+(Pao-EDP)*u])}}else{pts.push([EDV,EDP],[EDV,Pao])}
  const Vs=pts[pts.length-1][0];
  for(let i=1;i<=n;i++){const u=i/n,V=Vs-(Vs-ESV)*u;const peak=(Pes-Pao)*u+Pao+(0.22*(Pes-Pao)+18+grad)*Math.sin(Math.PI*u);pts.push([V,peak])}
  if(pvFlag==="ar"){for(let i=1;i<=n;i++){const u=i/n;pts.push([ESV+(EDV-ESV)*0.25*u,Pes-(Pes-edp(ESV+(EDV-ESV)*0.25))*u])}const Vr=ESV+(EDV-ESV)*0.25;for(let i=1;i<=n;i++){const V=Vr+(EDV-Vr)*i/n;pts.push([V,edp(V)])}}
  else{pts.push([ESV,edp(ESV)]);for(let i=1;i<=n;i++){const V=ESV+(EDV-ESV)*i/n;pts.push([V,edp(V)])}}
  P.add("path",{d:pts.map((p,i)=>(i?"L":"M")+P.X(p[0]).toFixed(1)+" "+P.Y(Math.min(p[1],200)).toFixed(1)).join(" ")+" Z",fill:"var(--abp)","fill-opacity":0.12,stroke:"var(--abp)","stroke-width":2.6});
  let area=0;for(let i=0;i<pts.length;i++){const a=pts[i],b=pts[(i+1)%pts.length];area+=a[0]*b[1]-b[0]*a[1]}area=Math.abs(area)/2;
  P.dot(EDV,EDP,"var(--spo2)","A",6,14);P.dot(pts[1][0],pts[1][1],"var(--ink)","B",6,4);P.dot(ESV,Pes,"var(--abp)","C",-16,-6);P.dot(ESV,edp(ESV),"var(--nibp)","D",-16,-4);
  P.text(V0+200/Ees>250?200:V0+170/Ees,Math.min(185,Ees*(Math.min(250,V0+170/Ees)-V0)),"ESPVR",{fill:"var(--abp)"});P.text(205,Math.min(190,edp(215))+8>200?190:Math.min(190,edp(215))+8,"EDPVR",{fill:"var(--spo2)"});
  const SV=EDV-ESV;const fwd=pvFlag==="mr"?SV*0.55:pvFlag==="ar"?SV*0.6:SV;
  $("#pv-r").innerHTML=`EDV ${EDV} · ESV ${ESV.toFixed(0)} · SV ${SV.toFixed(0)} mL${pvFlag?` (forward ≈ ${fwd.toFixed(0)})`:""} · EF <b>${(SV/EDV*100).toFixed(0)}%</b> · EDP ${EDP.toFixed(0)} mmHg${EDP>18?" (raised: pulmonary congestion)":""} · Pes ${Pes.toFixed(0)} · stroke work ≈ ${(area*1.333e-4).toFixed(2)} J · Ea/Ees ${(Ea/Ees).toFixed(2)} ${Ea/Ees>1.3?"(poor coupling)":""}`+(pvFlag==="as"?" · AS: high LV systolic pressure, stiff ventricle.":pvFlag==="mr"?" · MR: no isovolumetric contraction; volume falls as pressure rises.":pvFlag==="ar"?" · AR: no isovolumetric relaxation; huge EDV.":"");
 }
 seg($("#pv-pre"),[["normal","Normal"],["pre","↑ Preload"],["aft","↑ Afterload"],["con","↑ Contractility"],["sys","Systolic failure"],["dia","Diastolic failure"],["as","Aortic stenosis"],["mr","Mitral regurg."],["ar","Aortic regurg."]],setPV,"normal");
 ["#pv-edv","#pv-ees","#pv-ea","#pv-k"].forEach(s=>$(s).oninput=drawPV);

 /* ---------- 4. Guyton ---------- */
 const GYP={n:[7,1,1,0,"Normal: RAP ≈ 0, CO ≈ 5 L/min."],hem:[4.5,1,1.1,0,"Haemorrhage: MSFP falls; sympathetic tone partly restores it and raises contractility."],flu:[10,1,1,0,"Fluid bolus: MSFP rises; on the steep part of the Starling curve CO rises."],hf:[9.5,1,0.5,0,"Heart failure: flat cardiac curve; fluid retention raises MSFP, so RAP is high and CO low."],spin:[5,0.8,0.9,0,"Spinal or GA: venodilatation lowers MSFP (stressed volume), sympatholysis lowers contractility."],ppv:[7,1,1,5,"PPV + PEEP: raised pleural pressure shifts the cardiac curve right; RAP rises, VR and CO fall."],sep:[5.5,0.6,1.2,0,"Early sepsis: low venous resistance and high contractility keep CO up despite low MSFP."]};
 function setGY(k){const p=GYP[k];$("#gy-m").value=p[0];$("#gy-r").value=p[1];$("#gy-c").value=p[2];$("#gy-p").value=p[3];$("#gy-r").dataset.note=p[4];drawGY()}
 function drawGY(){
  const M=+$("#gy-m").value,Rf=+$("#gy-r").value,C=+$("#gy-c").value,Pp=+$("#gy-p").value;out("gy-m",M.toFixed(1));out("gy-r",Rf.toFixed(2));out("gy-c",C.toFixed(2));out("gy-p",(Pp>0?"+":"")+Pp);
  const Rv=1.4*Rf,vr=rap=>(M-Math.max(rap,-2))/Rv,co=rap=>{const x=rap+2-Pp;return x<=0?0:13*C*(1-Math.exp(-x/5))};
  const P=plot($("#gy"),{w:520,h:320,x0:-4,x1:16,y0:0,y1:12,xt:[-4,0,4,8,12,16],yt:[0,2,4,6,8,10,12],xl:"Right atrial pressure (mmHg)",yl:"Flow (L/min)"});
  const nv=rap=>(7-Math.max(rap,-2))/1.4,nc=rap=>{const x=rap+2;return x<=0?0:13*(1-Math.exp(-x/5))};
  P.line(range(-4,7,60).map(r=>[r,Math.max(0,nv(r))]),{stroke:"var(--muted)","stroke-dasharray":"5 4","stroke-width":1.3});P.line(range(-2,16,80).map(r=>[r,nc(r)]),{stroke:"var(--muted)","stroke-dasharray":"5 4","stroke-width":1.3});
  P.line(range(-4,M,80).map(r=>[r,Math.min(12,Math.max(0,vr(r)))]),{stroke:"var(--nibp)"});P.line(range(-4,16,120).map(r=>[r,Math.min(12,co(r))]),{stroke:"var(--abp)"});
  let lo=-4,hi=M;for(let i=0;i<60;i++){const m=(lo+hi)/2;(co(m)-vr(m))>0?hi=m:lo=m}const rap=(lo+hi)/2,q=co(rap);
  P.dot(rap,q,"var(--ink)",`RAP ${rap.toFixed(1)}, CO ${q.toFixed(1)}`,8,-8);P.text(M-0.2,0.6,"MSFP",{fill:"var(--nibp)","text-anchor":"end"});P.text(10,Math.min(11.4,co(10))+0.5,"cardiac function",{fill:"var(--abp)"});P.text(-3.6,Math.min(11.2,vr(-3))+0.6,"venous return",{fill:"var(--nibp)"});
  $("#gy-out").innerHTML=`Equilibrium: RAP <b>${rap.toFixed(1)} mmHg</b>, CO = VR <b>${q.toFixed(1)} L/min</b>. ${$("#gy-r").dataset.note||""} Dashed lines show the normal curves.`;
 }
 seg($("#gy-pre"),[["n","Normal"],["hem","Haemorrhage"],["flu","Fluid bolus"],["hf","Heart failure"],["spin","Spinal / GA"],["ppv","PPV + PEEP"],["sep","Early sepsis"]],setGY,"n");
 ["#gy-m","#gy-r","#gy-c","#gy-p"].forEach(s=>$(s).oninput=()=>{$("#gy-r").dataset.note="";drawGY()});

 /* ---------- 5. CVP ---------- */
 const CVS={n:["Normal",{base:5,a:3,c:1.5,x:-2.5,v:3,y:-2.5},"a after P (atrial systole), c with QRS (tricuspid bulge), x descent in ejection, v at end of systole (filling against a closed valve), y after the tricuspid opens."],
  af:["Atrial fibrillation",{base:6,a:0,c:1.5,x:-1.2,v:3,y:-2.5,irr:1},"No a wave and an irregular rhythm; the x descent is shallow because atrial relaxation is lost."],
  tr:["Tricuspid regurgitation",{base:9,a:2,c:0,x:0,v:0,cv:9,y:-5},"Giant cv wave replaces the x descent (systolic regurgitation into the RA); steep y."],
  chb:["Complete heart block",{base:6,a:3,c:1.5,x:-2,v:3,y:-2,cannon:1},"Irregular cannon a waves when the atria contract against a closed tricuspid valve."],
  jun:["Junctional rhythm",{base:6,a:0,c:1.5,x:-2,v:3,y:-2,cannonR:1},"Regular cannon waves: atrial and ventricular contraction coincide every beat."],
  ts:["Tricuspid stenosis / RVH / pulm. HTN",{base:9,a:9,c:1.5,x:-2,v:3,y:-1},"Large a wave from forceful atrial contraction into a stiff or obstructed ventricle; slow y descent in TS."],
  tam:["Cardiac tamponade",{base:16,a:2,c:1,x:-5,v:2,y:-0.3},"Raised mean pressure, prominent x descent, absent y descent (the ventricle cannot fill in early diastole). Pulsus paradoxus."],
  con:["Constrictive pericarditis / RV infarct",{base:15,a:3,c:1,x:-5,v:3,y:-8},"Raised pressure with a steep, deep y descent (M or W shape); Kussmaul's sign (CVP rises on inspiration)."]};
 function drawCV(k){const [nm,o,txt]=CVS[k];const P=plot($("#cv"),{w:520,h:300,x0:0,x1:2,y0:-2,y1:26,xt:[0,0.5,1,1.5,2],yt:[0,5,10,15,20,25],xl:"Time (s) · two beats",yl:"CVP (mmHg)",mt:40});
  const beat=(t,j)=>{let p=o.base;const irr=o.irr?(j===1?0.06:0):0;const tt=t-irr;
   p+=o.a*gauss(tt,0.08,0.035)+o.c*gauss(tt,0.22,0.025)+o.x*gauss(tt,0.34,0.05)+o.v*gauss(tt,0.55,0.05)+o.y*gauss(tt,0.7,0.05);
   if(o.cv)p+=o.cv*gauss(tt,0.45,0.1);if(o.cannon&&j===1)p+=11*gauss(tt,0.27,0.03);if(o.cannonR)p+=10*gauss(tt,0.24,0.03);return p};
  P.line(range(0,2,400).map(t=>{const j=t<1?0:1;return [t,beat(t-j,j)]}),{stroke:"var(--etco2)"});
  const add=P.add;for(let j=0;j<2;j++){[[0.04,"P"],[0.2,"QRS"],[0.48,"T"]].forEach(([t,l])=>{if(l==="P"&&(o.a===0)&&!o.cannon)return;add("text",{x:P.X(j+t),y:22,"text-anchor":"middle",fill:"var(--ecg)","font-size":"11"},l)})}
  if(k==="n"){[[0.08,"a"],[0.22,"c"],[0.34,"x"],[0.55,"v"],[0.7,"y"]].forEach(([t,l])=>P.text(t,beat(t,0)+(l==="x"||l==="y"?-2.2:1.2),l,{"text-anchor":"middle",fill:"var(--ink)","font-weight":"700"}))}
  $("#cv-r").innerHTML=`<b>${nm}.</b> ${txt}`}
 seg($("#cv-sel"),Object.entries(CVS).map(([k,v])=>[k,v[0]]),drawCV,"n");

 /* ---------- 6. Starling forces ---------- */
 function drawSF(){const pa=+$("#sf-pa").value,pv=+$("#sf-pv").value,pc=+$("#sf-pc").value,s=+$("#sf-s").value;out("sf-pa",pa+" mmHg");out("sf-pv",pv+" mmHg");out("sf-pc",pc+" mmHg");out("sf-s",s.toFixed(2));
  const Pi=-1,pii=5,inward=s*(pc-pii)+Pi;
  const P=plot($("#sf"),{w:520,h:300,x0:0,x1:1,y0:0,y1:50,xt:[0,0.5,1],yt:[0,10,20,30,40,50],xl:"Arteriolar end → venular end",yl:"Pressure (mmHg)"});
  let fil="",abs="";const n=100;let netA=0;
  for(let i=0;i<=n;i++){const x=i/n,pcx=pa+(pv-pa)*x;netA+=(pcx-inward)/n}
  const X=P.X,Y=P.Y;const cross=(inward-pa)/(pv-pa);
  const poly=(a,b,above)=>{const pts=[];for(let i=0;i<=40;i++){const x=a+(b-a)*i/40;pts.push([x,pa+(pv-pa)*x])}for(let i=40;i>=0;i--){const x=a+(b-a)*i/40;pts.push([x,inward])}return pts.map((p,i)=>(i?"L":"M")+X(p[0])+" "+Y(Math.max(0,Math.min(50,p[1])))).join(" ")+"Z"};
  const c=Math.max(0,Math.min(1,cross));
  if(pa>inward)P.add("path",{d:poly(0,pv>inward?1:c),fill:"var(--abp)",opacity:.25});
  if(pv<inward)P.add("path",{d:poly(pa<inward?0:c,1),fill:"var(--spo2)",opacity:.25});
  P.line([[0,pa],[1,pv]],{stroke:"var(--abp)"});P.line([[0,inward],[1,inward]],{stroke:"var(--spo2)"});
  P.text(0.02,pa+2,"capillary hydrostatic Pc",{fill:"var(--abp)"});P.text(0.55,inward+2,"σ(πc − πi) + Pi = "+inward.toFixed(1),{fill:"var(--spo2)"});
  if(pa>inward)P.text(0.05,(pa+inward)/2-1,"filtration",{fill:"var(--abp)"});if(pv<inward)P.text(0.8,(pv+inward)/2-1,"absorption",{fill:"var(--spo2)"});
  $("#sf-r").innerHTML=`Mean net pressure <b>${netA>0?"+":""}${netA.toFixed(1)} mmHg</b> (${netA>0.5?"net filtration":netA<-0.5?"net absorption":"near balance"}). Classic model shown. Revised model: at steady state most capillaries do not reabsorb; filtrate returns as lymph. Try low albumin (πc 15) or sepsis (σ 0.5).`}
 ["#sf-pa","#sf-pv","#sf-pc","#sf-s"].forEach(s=>$(s).oninput=drawSF);drawSF();

 /* ---------- 7. Valsalva ---------- */
 const VA={n:["Normal","Phase I: BP rises as raised intrathoracic pressure squeezes blood out of the lungs. II: venous return falls, BP drops, then reflex tachycardia and vasoconstriction partly restore it. III: release, BP dips as the pulmonary bed refills. IV: overshoot with reflex bradycardia."],
  an:["Autonomic neuropathy","BP falls steadily through phase II with no heart rate rise and no overshoot or bradycardia in phase IV: diabetic neuropathy, cord injury, multiple system atrophy."],
  hf:["Heart failure (square wave)","BP stays up through the strain and returns to baseline without a dip or overshoot; heart rate barely changes. The engorged circulation keeps venous return up."],
  hy:["Hypovolaemia / GA","Exaggerated fall in phase II with a large compensatory tachycardia."]};
 function drawVA(k){const [nm,txt]=VA[k];const svg=$("#va");svg.innerHTML="";
  const on=t=>t>=5&&t<=15;const P1=plot(svg,{w:520,h:110,x0:0,x1:30,y0:0,y1:45,yt:[0,40],yl:"Paw",mb:10,mt:8,clear:false});
  P1.line(range(0,30,300).map(t=>[t,on(t)?40:0]),{stroke:"var(--muted)"});
  const sbp=t=>{if(k==="an"){if(t<5)return 120;if(t<6)return 120+25*smooth(t,5,5.6);if(t<=15)return 145-75*smooth(t,6,15);if(t<17)return 70-5*smooth(t,15,16);return 65+55*smooth(t,17,25)}
   if(k==="hf"){if(t<5)return 120;if(t<=15)return 120+18*smooth(t,5,5.6);return 138-18*smooth(t,15,16.5)}
   const dip=k==="hy"?50:30;if(t<5)return 120;if(t<6)return 120+20*smooth(t,5,5.6);if(t<9)return 140-(20+dip)*smooth(t,6,9);if(t<=15)return 120-dip+(dip-8)*smooth(t,9,15);if(t<17)return 112-22*smooth(t,15,16.5);if(t<21)return 90+60*smooth(t,17,20);return 150-30*smooth(t,21,27)};
  const hr=t=>{if(k==="an")return 75;if(k==="hf")return 75+3*(on(t)?1:0);const up=k==="hy"?45:25;if(t<5)return 75;if(t<6)return 75-5*smooth(t,5,6);if(t<=15)return 70+up*smooth(t,7,13);if(t<18)return 70+up;if(t<22)return 70+up-(up+20)*smooth(t,18,21);return 50+25*smooth(t,22,28)};
  const P2=plot(svg,{w:520,h:170,x0:0,x1:30,y0:50,y1:170,yt:[60,100,140],yl:"SBP",mb:10,mt:6,clear:false,yOff:110});
  P2.line(range(0,30,300).map(t=>[t,sbp(t)]),{stroke:"var(--abp)"});P2.line(range(0,30,300).map(t=>[t,sbp(t)*0.65+5]),{stroke:"var(--abp)","stroke-width":1.2,opacity:.6});
  const P3=plot(svg,{w:520,h:140,x0:0,x1:30,y0:40,y1:130,yt:[50,75,100,125],xt:[0,5,10,15,20,25,30],yl:"HR",xl:"Time (s)",mb:32,mt:6,clear:false,yOff:280});
  P3.line(range(0,30,300).map(t=>[t,hr(t)]),{stroke:"var(--ecg)"});
  const add=mk(svg);[[5,"I"],[6.5,"II"],[15,"III"],[17.5,"IV"]].forEach(([t,l])=>{add("line",{x1:P1.X(t),x2:P1.X(t),y1:8,y2:390,stroke:"var(--muted)","stroke-dasharray":"3 4","stroke-width":1});add("text",{x:P1.X(t)+3,y:16,fill:"var(--ink)","font-weight":"700"},l)});
  $("#va-r").innerHTML=`<b>${nm}.</b> ${txt}`}
 seg($("#va-sel"),Object.entries(VA).map(([k,v])=>[k,v[0]]),drawVA,"n");

 /* ---------- 8. Baroreceptor curve ---------- */
 const BRS={n:["Normal",95,1,"Steepest (most sensitive) around normal MAP; threshold ~60, saturation ~180 mmHg."],ht:["Chronic hypertension",130,0.8,"Curve resets to the right and flattens: the patient defends a higher MAP and reacts less to falls (induction hypotension)."],old:["Elderly / volatile / diabetes",100,0.5,"Flatter curve: smaller reflex responses to the same change in pressure."]};
 function drawBR(k){const [nm,c,g,txt]=BRS[k];const P=plot($("#br"),{w:520,h:290,x0:40,x1:220,y0:0,y1:100,xt:[40,60,100,140,180,220],yt:[0,25,50,75,100],xl:"Mean arterial pressure (mmHg)",yl:"Afferent firing (% max)"});
  const f=(m,c0,g0)=>100/(1+Math.exp(-(m-c0)/(18/g0)));
  P.line(range(40,220).map(m=>[m,f(m,95,1)]),{stroke:"var(--muted)","stroke-dasharray":"5 4","stroke-width":1.4});P.line(range(40,220).map(m=>[m,f(m,c,g)]),{stroke:"var(--etco2)"});P.dot(c,50,"var(--ink)","set point "+c,8,4);
  $("#br-r").innerHTML=`<b>${nm}.</b> ${txt}`}
 seg($("#br-sel"),Object.entries(BRS).map(([k,v])=>[k,v[0]]),drawBR,"n");

 /* ---------- 9. Fetal circulation ---------- */
 function drawFE(mode){const svg=$("#fe");svg.innerHTML="";const add=mk(svg);const born=mode==="b";
  const defs=add("defs",{});const mkr=document.createElementNS(SVGNS,"marker");[["id","arw"],["viewBox","0 0 10 10"],["refX","9"],["refY","5"],["markerWidth","6"],["markerHeight","6"],["orient","auto-start-reverse"]].forEach(([a,b])=>mkr.setAttribute(a,b));const mp=document.createElementNS(SVGNS,"path");mp.setAttribute("d","M0 0 L10 5 L0 10 Z");mp.setAttribute("fill","var(--muted)");mkr.append(mp);defs.append(mkr);
  const box=(x,y,w,h,label,sat,col,dim)=>{add("rect",{x,y,width:w,height:h,rx:8,fill:"var(--panel)",stroke:col,"stroke-width":dim?1:2,opacity:dim?.35:1});add("text",{x:x+w/2,y:y+h/2-2,"text-anchor":"middle",class:"lbl",opacity:dim?.4:1},label);if(sat)add("text",{x:x+w/2,y:y+h/2+14,"text-anchor":"middle",fill:col,"font-size":"12",opacity:dim?.4:1},sat)};
  const arr=(d,col,dim,w=2)=>add("path",{d,fill:"none",stroke:col,"stroke-width":w,"marker-end":"url(#arw)",opacity:dim?.25:1});
  const red="var(--abp)",mix="var(--nibp)",blue="var(--spo2)";
  box(20,180,110,60,"Placenta",born?"":"",red,born);
  box(150,40,170,54,"Lungs",born?"PVR low · all RV output":"PVR high · ~10% of RV output",blue,false);
  box(180,180,120,54,"Liver","",mix,false);
  box(360,250,90,50,"RA",born?"~75%":"~65–70%",mix,false);box(360,120,90,50,"LA",born?"~98%":"~65%",mix,false);
  box(520,250,90,50,"RV",born?"~75%":"~55%",blue,false);box(520,120,90,50,"LV",born?"~98%":"~65%",mix,false);
  box(680,40,180,54,"Head, arms, coronaries",born?"":"Asc. aorta ~65%",mix,false);box(680,300,180,54,"Lower body",born?"":"Desc. aorta ~60%",mix,false);
  box(360,370,90,44,"SVC",born?"":"~40%",blue,false);
  // fetal paths
  arr("M130 205 L178 207",red,born);add("text",{x:134,y:196,fill:red,"font-size":"11",opacity:born?.3:1},"UV ~80–85%");
  arr("M130 220 C230 300 300 290 360 280",red,born);add("text",{x:200,y:300,fill:red,"font-size":"11",opacity:born?.3:1},"Ductus venosus");
  arr("M240 234 C260 270 320 275 360 272",mix,false);add("text",{x:250,y:258,"font-size":"11"},"IVC");
  arr("M405 370 L405 302",blue,false);
  arr("M405 250 L405 172",mix,born,3);add("text",{x:412,y:215,fill:mix,"font-size":"12","font-weight":"700",opacity:born?.3:1},born?"FO closed":"Foramen ovale");
  arr("M450 275 L518 275",blue,false);arr("M450 145 L518 145",mix,false);
  arr("M540 250 C500 205 340 150 290 96",blue,false);add("text",{x:455,y:200,fill:blue,"font-size":"11"},"pulmonary artery");
  arr("M320 67 C380 67 405 90 405 118",mix,false);add("text",{x:340,y:60,"font-size":"11"},"pulm. veins");
  arr("M610 140 C640 120 650 70 678 67",mix,false);
  arr("M610 268 C650 300 650 320 678 325",born?mix:blue,born,born?2:3);add("text",{x:618,y:236,fill:blue,"font-size":"12","font-weight":"700",opacity:born?.3:1},born?"DA closing":"Ductus arteriosus ~90%");
  arr("M770 94 L770 298",mix,false);
  arr("M680 340 C300 420 120 330 75 242",mix,born);add("text",{x:470,y:418,fill:mix,"font-size":"11",opacity:born?.3:1},"Umbilical arteries ×2");
  $("#fe-r").innerHTML=born?"After birth: lung expansion and higher PAO2 drop PVR; cord clamping raises SVR. LA pressure > RA closes the foramen ovale (minutes). The ductus arteriosus closes functionally in 10–15 h, the ductus venosus in 3–7 days. The circulations now run in series.":"Fetal: the best-oxygenated blood (UV) bypasses the liver via the ductus venosus, streams across the foramen ovale to the LV and supplies the heart and brain. SVC blood goes RV → PA → ductus arteriosus to the lower body and placenta. Saturations are approximate."}
 seg($("#fe-sel"),[["f","Fetal"],["b","After birth"]],drawFE,"f");
}

ATLAS.register({id:"02",name:"Cardiovascular physiology",
  lede:"Cardiovascular physiology: the heart as a pump, and the control of the circulation.",
  barsNote:"",
  bars:BARS,fam:FAM,slides:SLIDES,calcs:CALCS,tables:TABLES,cards:CARDS,fcf:FCF,viva:VIVA,quiz:QUIZ,crisis:CRISIS,
  sources:SRC,errata:ERR,refs:REFS,diagHTML:DIAG,initDiagrams,
  diagLede:"Nine live diagrams. Use the presets first, then move the sliders yourself and explain out loud what changed and why."});
})();
