/* Stage 11 · Monitoring */
(function(){
const {plot,range,el,SVGNS,fmt,$,$$,seg}=ATLAS.h;

const BARS=[];

const FAM={std:["ecg","Standards, signals & ECG"],press:["abp","Pressure & cardiac output"],gas:["etco2","Gases & capnography"],ox:["spo2","Oximetry & oxygen"],brain:["nibp","Brain, temperature, NMB"]};

const SLIDES=[
{f:"std",t:"Standards of monitoring",b:`<ul class="clean"><li><b>Association of Anaesthetists (2021)</b>: the anaesthetist must be present throughout; monitoring starts before induction and continues into recovery until the patient has recovered. Alarms enabled with appropriate limits and audible.</li>
<li><b>Induction and maintenance</b>: pulse oximetry, NIBP, ECG, <b>capnography</b> (whenever an airway device is used, and in recovery until it is removed; also for sedation), inspired and expired O2, vapour and N2O, airway pressure.</li>
<li><b>Additional</b>: <b>quantitative neuromuscular monitoring</b> whenever an NMB is given (from before the first dose until recovery to TOFR ≥ 0.9); <b>processed EEG</b> when TIVA is used with an NMB; core temperature for procedures &gt; 30 min (NICE CG65); urine output, invasive pressures, cardiac output and others as indicated.</li>
<li><b>Recovery</b>: SpO2, NIBP, capnography if airway device present, ECG, temperature, pain, consciousness; same standard as theatre for critically ill.</li>
<li><b>Transfer</b>: same standard as theatre (Association of Anaesthetists/ICS transfer guidance).</li>
<li><b>Monitor design</b>: accuracy, precision, response time, drift, calibration, artefact rejection, alarms (smart alarms vs alarm fatigue), data recording. The anaesthetist's clinical observation remains the key monitor.</li>
<li><b>Lessons</b>: NAP4 (capnography absence linked to deaths in ICU and ED airway events), NAP5 (awareness with TIVA and NMB), NAP7 (perioperative cardiac arrest: monitoring in recovery and remote sites).</li></ul>`,
p:"State the 2021 additions crisply: capnography for any airway device and in recovery, quantitative NMB monitoring whenever an NMB is used, processed EEG for TIVA plus NMB.",
v:"Structure by phase (induction, maintenance, recovery, transfer), then 'additional' monitoring, then how a monitor's quality is judged."},
{f:"std",t:"Biological signals and their measurement",b:`<ul class="clean"><li><b>Signals</b>: ECG ~1 mV (0.5–100 Hz), EEG 1–100 µV (0.5–60 Hz), EMG 0.1–5 mV (up to 2000 Hz), evoked potentials (sub-µV, need averaging). Arterial pressure is a mechanical signal converted to electrical.</li>
<li><b>Electrodes</b>: silver/silver chloride with conductive gel reduce skin impedance and the half-cell (polarisation) potential; good skin preparation reduces impedance below ~5 kΩ.</li>
<li><b>Amplifiers</b>: differential amplifiers amplify the difference between two inputs and reject signals common to both (mains interference); quality is the <b>common mode rejection ratio</b> (CMRR, &gt; 100 000:1 or 100 dB). High input impedance prevents signal loss. The third (neutral) electrode provides a reference.</li>
<li><b>Filters</b>: high-pass (removes baseline drift, e.g. 0.5 Hz in monitoring mode), low-pass (removes high-frequency noise and EMG, e.g. 40 Hz), notch filter at 50 Hz. ECG <b>monitoring mode</b> 0.5–40 Hz (stable trace but distorts ST segments) vs <b>diagnostic mode</b> 0.05–150 Hz (accurate ST analysis).</li>
<li><b>Noise and interference</b>: mains 50 Hz (capacitive and inductive coupling: use screened cables, twisted leads, isolated amplifiers), diathermy (MHz, high-amplitude: filters, blanking), movement, shivering, poor contact. Signal-to-noise ratio; averaging improves SNR by √n (evoked potentials).</li>
<li><b>Digital processing</b>: analogue-to-digital conversion; sampling must exceed twice the highest frequency of interest (Nyquist) to avoid aliasing; Fourier analysis decomposes signals into sine waves (arterial waveform harmonics, EEG power spectra).</li></ul>`,
p:"A favourite question: 'Why does the ECG in theatre show ST changes that disappear on a 12-lead?' Monitoring-mode filtering distorts the ST segment.",
v:"Signal characteristics, electrodes, differential amplifiers and CMRR, filters and modes, interference and its prevention, digitisation."},
{f:"std",t:"ECG monitoring and pacemakers",b:`<ul class="clean"><li><b>Leads</b>: 3-electrode systems show leads I, II or III (II best for P waves and arrhythmia); <b>CM5</b> (right arm electrode on manubrium, left arm on V5 position, neutral elsewhere, monitor lead I) detects ~80–90% of left ventricular ischaemia. 5-electrode systems allow V5 plus limb leads (II + V5 detect ~80%; II + V4 + V5 ~96%).</li>
<li><b>Ischaemia</b>: ST depression ≥ 1 mm (0.1 mV) horizontal or downsloping, 80 ms after the J point; ST elevation; new T wave changes; use diagnostic mode and automated ST trending.</li>
<li><b>Artefacts</b>: shivering, diathermy, movement, poor electrodes, pacemaker spikes (pace-detection mode), infusion pumps.</li>
<li><b>Pacemakers</b>: generic code (NBG): I chamber paced, II chamber sensed, III response to sensing (I inhibited, T triggered, D dual), IV rate modulation (R), V multisite pacing. E.g. DDDR. Perioperative: identify the device, indication, dependency and last check (within 6–12 months); reprogramme to asynchronous mode (VOO/DOO) if pacing-dependent and monopolar diathermy is close; disable ICD therapies (or magnet if appropriate) with external pads on; use bipolar diathermy or short bursts, plate positioned so current avoids the device; avoid suxamethonium fasciculation sensing, shivering; check device after surgery. A magnet usually converts a pacemaker to asynchronous pacing and suspends ICD tachy-therapy (not pacing).</li>
<li><b>Pacemaker ECG</b>: pacing spike before P (atrial) or QRS (ventricular, broad LBBB-like from RV apex); failure to capture (spike without complex), failure to sense (spikes in inappropriate places), oversensing (pauses).</li></ul>`,
p:"Typical exam questions: 'Pacemaker', 'Pacemaker ECG', 'Patient with pacemaker: perioperative considerations'.",
v:"Leads and CM5, ischaemia criteria, artefacts; pacemaker code with an example; perioperative plan for pacemakers and ICDs."},
{f:"press",t:"Pressure measurement and transducers",b:`<ul class="clean"><li><b>Manometers</b>: liquid column (P = ρgh; mercury 13.6× denser than water), aneroid gauges (capsule that expands), Bourdon gauge (high pressures).</li>
<li><b>Electronic transducers</b>: the fluid-filled catheter transmits pressure to a diaphragm attached to a <b>strain gauge</b> (resistance changes with stretch) arranged in a <b>Wheatstone bridge</b> (four resistors, sensitive to small changes, compensates for temperature). Output voltage proportional to pressure.</li>
<li><b>Zeroing</b>: open the transducer to atmosphere and set the reading to zero (removes atmospheric pressure and offset drift). <b>Levelling</b>: place the transducer at the reference level (phlebostatic axis: 4th intercostal space mid-axillary line, approximately the right atrium). Each 10 cm the transducer is below the reference adds ~7.4 mmHg (1 mmHg = 1.36 cmH2O).</li>
<li><b>Calibration</b>: zero point plus a known pressure (static calibration); checking linearity; drift.</li>
<li><b>Components of an invasive system</b>: cannula (20G radial), short stiff non-compliant tubing, three-way tap, transducer, pressurised flush bag (300 mmHg, 3 mL/h saline, heparin no longer routinely used), amplifier and display.</li>
<li><b>Accuracy</b> depends on dynamic response (natural frequency and damping: next slide) as well as static calibration.</li></ul>`,
p:"Use the levelling diagram: a transducer 20 cm below the heart over-reads by ~15 mmHg, which matters hugely for CVP and for cerebral perfusion pressure (level at the tragus for neurosurgery).",
v:"Principle of the strain gauge and Wheatstone bridge, zeroing vs levelling vs calibration, components, sources of error."},
{f:"press",t:"Resonance and damping",b:`<ul class="clean"><li>The arterial waveform is a sum of sine waves (Fourier): a <b>fundamental</b> at heart rate (e.g. 2 Hz at 120 bpm) and harmonics. The first 8–10 harmonics are needed to reproduce the waveform, so the measuring system must respond faithfully up to ~20–40 Hz.</li>
<li><b>Natural (resonant) frequency</b> of the catheter–transducer system: the frequency at which it oscillates when disturbed. If components of the signal approach it, they are amplified (resonance). Natural frequency rises with catheter diameter and falls with tubing length, compliance and fluid density (fn ∝ r / √(LρC)). Use short, wide, stiff tubing and no bubbles; aim for fn &gt; 8–10 × fundamental (&gt; 20 Hz).</li>
<li><b>Damping</b>: loss of energy (friction, bubbles, clots, kinks, compliance). <b>Damping coefficient</b> (ζ): 0 undamped; &lt; 0.64 underdamped (overshoot, ringing: SBP over-read, DBP under-read); <b>0.64 optimal</b> (fastest response with flat amplitude and phase across frequencies, ~7% overshoot); <b>1.0 critical</b> (no overshoot; still responds and shows a waveform, but slowly and with amplitude reduction at higher frequencies); &gt; 1 overdamped (slurred, SBP under-read, DBP over-read). MAP is relatively preserved in both.</li>
<li><b>Fast-flush (square wave) test</b>: pull the flush tab and release. Optimal: one undershoot then a small overshoot, settling within ~1–2 oscillations. Natural frequency = paper speed / distance between peaks (25 mm/s ÷ 1 mm = 25 Hz). Damping from the ratio of successive amplitudes.</li>
<li><b>Causes of overdamping</b>: air bubbles, clots, kinks, soft tubing, low flush bag pressure, cannula against the vessel wall, vasospasm. Underdamping: long or narrow tubing, stiff vessels, tachycardia, hyperdynamic circulation, catheter whip.</li></ul>`,
p:"Critical damping is the minimum damping with no overshoot (D = 1) — not a flat trace. Use the damping simulator to see each state.",
v:"Define natural frequency and resonance, damping and the coefficient values with their traces, the flush test and the causes, then the effects on SBP, DBP and MAP."},
{f:"press",t:"Blood pressure: non-invasive and invasive",b:`<ul class="clean"><li><b>Manual (auscultatory)</b>: Riva-Rocci cuff with Korotkoff sounds (phase I systolic; phase V disappearance = diastolic; phase IV in pregnancy if sounds persist to 0). <b>Cuff size</b>: bladder width ~40% of arm circumference (or 20% more than arm diameter), length ≥ 80%. Small cuff over-reads; large cuff under-reads.</li>
<li><b>Oscillometry</b> (DINAMAP): the cuff deflates in steps; the pressure at <b>maximal oscillation = MAP</b> (most accurate); systolic and diastolic are derived by manufacturer algorithms (e.g. rapid increase and decrease of oscillations). Errors: arrhythmia (AF), movement, shivering, very low or very high pressures (over-reads low, under-reads high), wrong cuff. Complications: ulnar nerve palsy, petechiae, compartment syndrome, skin damage, interference with IV infusions.</li>
<li><b>Continuous non-invasive</b>: volume clamp (Peñáz: Finapres, ClearSight: finger cuff keeps finger blood volume constant), arterial tonometry, pulse transit time.</li>
<li><b>Invasive arterial pressure</b>: indications (beat-to-beat monitoring in major surgery, unstable patients, vasoactive drugs, frequent sampling, NIBP impossible, cardiopulmonary bypass); sites (radial (ulnar collateral; Allen's test is unreliable), brachial, femoral, dorsalis pedis: systolic amplification distally); complications (ischaemia, thrombosis, haematoma, infection, disconnection haemorrhage, inadvertent intra-arterial injection (label lines, colour-coded), air or clot embolism, nerve injury).</li>
<li><b>Waveform</b>: upstroke slope (contractility), dicrotic notch (aortic valve closure; lower when vasodilated), area under systolic portion (stroke volume), respiratory variation (pulse pressure variation &gt; 12–13% predicts fluid responsiveness in ventilated patients in sinus rhythm with VT ≥ 8 mL/kg, closed chest, no spontaneous breaths). Distal amplification: SBP higher, DBP lower, MAP similar.</li></ul>`,
p:"MAP is the most robust number: from oscillometry, through peripheral amplification, and in both damping errors.",
v:"Manual, oscillometric (MAP at maximal oscillation), errors and complications, continuous non-invasive methods, invasive indications, sites, complications and waveform interpretation."},
{f:"press",t:"Central venous and pulmonary artery pressures",b:`<ul class="clean"><li><b>CVP waveform</b>: <b>a</b> wave (atrial contraction; after the P wave), <b>c</b> wave (tricuspid bulging in isovolumetric contraction), <b>x</b> descent (atrial relaxation and descent of the base), <b>v</b> wave (atrial filling against a closed tricuspid valve), <b>y</b> descent (tricuspid opening). Normal 0–8 mmHg (spontaneous), measured at end-expiration.</li>
<li><b>Abnormal</b>: absent a (AF); cannon a waves (complete heart block, junctional rhythm, VT: atrium contracting against a closed valve); large a (tricuspid stenosis, pulmonary hypertension, RV hypertrophy); giant cv/v (tricuspid regurgitation); steep x and y (constriction, tamponade: blunted y).</li>
<li><b>CVP as a guide</b>: poor predictor of fluid responsiveness; trends and the response to a challenge are more useful. Affected by intrathoracic pressure (PEEP), RV compliance, tricuspid disease, posture.</li>
<li><b>Pulmonary artery catheter</b>: balloon-tipped, flow-directed through RA (0–8), RV (25/0–8), PA (25/10) to wedge (PAWP 6–12 mmHg ≈ LAP ≈ LVEDP if no mitral disease, West zone 3, normal compliance). Measures CO (thermodilution), mixed venous saturation (SvO2 65–75%), PVR and SVR, temperature. Complications: arrhythmias, PA rupture (balloon over-inflation, pulmonary hypertension), infarction, knotting, valve damage, infection, thrombosis; PAC-Man trial showed no outcome benefit.</li>
<li><b>Derived</b>: SVR = 80 × (MAP − CVP)/CO (800–1200 dyn·s·cm⁻⁵); PVR = 80 × (mPAP − PAWP)/CO (100–200).</li></ul>`,
p:"Link the CVP waves to the ECG: a after P, c at the start of QRS, v at the end of T.",
v:"Draw the CVP trace and label it, abnormalities, limitations, then PAC pressures, uses, complications and derived values."},
{f:"press",t:"Cardiac output measurement",b:`<ul class="clean"><li><b>Fick principle</b>: the uptake of a substance by an organ = blood flow × arteriovenous concentration difference. CO = VO2 / (CaO2 − CvO2). Gold standard but needs mixed venous blood and steady state. Indirect Fick: CO2 rebreathing (NICO).</li>
<li><b>Indicator dilution</b> (Stewart–Hamilton): CO = amount of indicator / ∫ concentration dt. Dyes (indocyanine green: recirculation problem, extrapolate the semi-log decay), lithium (LiDCO: lithium-selective electrode in an arterial line; contraindicated with lithium therapy, NMB interference), cold saline.</li>
<li><b>Thermodilution (PAC)</b>: 10 mL of cold (or room-temperature) saline injected into the RA; a thermistor in the PA records the temperature curve; CO = V(Tb − Ti)K / ∫ΔT dt. Average three injections at the same point of the respiratory cycle. Errors: tricuspid regurgitation, intracardiac shunts, rapid IV infusions, wrong injectate volume or temperature, arrhythmias. Continuous versions use a heating filament.</li>
<li><b>Transpulmonary thermodilution (PiCCO, VolumeView)</b>: central venous injection, femoral arterial thermistor; calibrates <b>pulse contour analysis</b> (stroke volume from the area under the systolic pressure curve, adjusted for aortic compliance) and gives GEDV, EVLW, SVV.</li>
<li><b>Uncalibrated pulse contour</b> (FloTrac/EV1000, LiDCOrapid, ProAQT): algorithms from demographics; less accurate in vasoplegia, arrhythmias, aortic regurgitation, IABP.</li>
<li><b>Oesophageal Doppler</b> (CardioQ): probe in the distal oesophagus measures descending aortic blood velocity; stroke distance (area under the velocity–time curve) × aortic cross-sectional area (nomogram) = stroke volume. FTc (330–360 ms normal: low with hypovolaemia or high afterload), peak velocity (contractility; falls with age). Assumes fixed proportion of flow to the descending aorta. Used for goal-directed fluid therapy (NICE MTG3).</li>
<li><b>Echocardiography</b> (LVOT VTI × LVOT area), <b>bioimpedance/bioreactance</b> (NICOM: thoracic impedance changes), <b>MRI</b>.</li></ul>`,
p:"Use the thermodilution and oesophageal Doppler diagrams. Recall that a smaller area under the thermodilution curve means a higher cardiac output.",
v:"Classify invasive to non-invasive, explain Fick and Stewart–Hamilton with equations, then each device with principle, advantages and errors."},
{f:"ox",t:"Pulse oximetry",b:`<ul class="clean"><li><b>Principle</b>: Beer's law (absorbance ∝ concentration) and Lambert's law (absorbance ∝ path length) together. Two LEDs: red <b>660 nm</b> (deoxyhaemoglobin absorbs more) and infrared <b>940 nm</b> (oxyhaemoglobin absorbs more), alternating hundreds of times per second with an "off" phase to subtract ambient light. A photodiode measures transmitted light.</li>
<li>The <b>pulsatile (AC)</b> component is divided by the <b>non-pulsatile (DC)</b> component at each wavelength, and the ratio R = (AC660/DC660)/(AC940/DC940) is converted to SpO2 using a calibration curve derived from healthy volunteers (R ≈ 0.4 at 100%, 1.0 at ~85%, ~3.4 at 0%). Readings below ~70–80% are extrapolated and less accurate.</li>
<li><b>Isosbestic points</b>: wavelengths at which oxy- and deoxyhaemoglobin absorb equally: ~805 nm (and several in the visible range, e.g. ~590 nm, which is yellow, not red). Used as references in older devices.</li>
<li><b>Errors</b>: <b>methaemoglobin</b> absorbs both wavelengths similarly, so R tends to 1 and SpO2 tends to ~85% (overestimates if true SaO2 is low, underestimates if high); <b>carboxyhaemoglobin</b> absorbs like oxyhaemoglobin at 660 nm and hardly at 940 nm, so SpO2 over-reads; dyes (methylene blue causes a large transient fall, indocyanine green, isosulfan blue); nail varnish (blue, green, black); motion; low perfusion (cold, vasoconstriction, hypotension); venous pulsation (TR, tourniquets); ambient light; electrical interference; anaemia (only at low SaO2); <b>skin pigmentation</b> (over-estimation in people with darker skin, causing occult hypoxaemia: NHS Race and Health Observatory 2022 and FDA work on new standards).</li>
<li><b>Limitations</b>: lag time (finger 30–60 s; ear and forehead faster); measures oxygenation, not ventilation (SpO2 stays high with hypercapnia on O2); flat part of the dissociation curve (PaO2 can fall from 40 to 12 kPa with little SpO2 change).</li>
<li><b>Co-oximetry</b> (blood gas analyser) uses many wavelengths to measure fractional O2Hb, COHb, MetHb and HHb. Multi-wavelength pulse CO-oximeters exist (SpCO, SpMet, SpHb).</li></ul>`,
p:"Use the oximetry diagram: increase COHb or MetHb and see the displayed SpO2 diverge from true fractional saturation.",
v:"Beer–Lambert, wavelengths and absorption spectra, AC/DC ratio and calibration, isosbestic point, errors (grouped: haemoglobins, dyes, signal, patient), limitations, co-oximetry."},
{f:"ox",t:"Oxygen and blood gas measurement",b:`<ul class="clean"><li><b>Paramagnetic analyser</b> (gas): O2 has unpaired electrons and is attracted into a magnetic field (most gases are weakly diamagnetic). A nitrogen-filled glass dumbbell suspended in a non-uniform field rotates as O2 displaces it; the current needed to restore its position is proportional to PO2 (null-deflection). Alternatively a differential pressure sensor with a switched magnetic field. Fast (breath-by-breath), accurate; water vapour and N2O cause small errors.</li>
<li><b>Fuel cell</b> (galvanic cell): gold mesh cathode, lead anode, potassium hydroxide electrolyte, O2-permeable membrane. O2 is reduced at the cathode, generating a current proportional to PO2 with no external battery. Slow (~20–30 s), consumed over months, temperature-compensated with a thermistor; N2O can produce errors in older cells. Used on anaesthetic machines (inspired O2).</li>
<li><b>Clark (polarographic) electrode</b> (blood PO2): platinum cathode and silver/silver chloride anode in KCl, polarising voltage 0.6 V, O2-permeable membrane (polypropylene). O2 + 4e⁻ + 2H2O → 4OH⁻ at the cathode; current ∝ PO2. Kept at 37 °C; halothane can cause false-high readings; membrane deposits; calibrated with two gases. Transcutaneous versions heat the skin to 43–45 °C.</li>
<li><b>pH electrode</b>: glass electrode (H⁺-sensitive glass) with a reference calomel or Ag/AgCl electrode; potential difference ~61.5 mV per pH unit at 37 °C. Calibrated with two buffers (pH 6.84 and 7.38).</li>
<li><b>Severinghaus (PCO2) electrode</b>: a pH electrode behind a CO2-permeable (PTFE/silicone) membrane with bicarbonate solution; CO2 diffuses in, forms H⁺, changes pH; log PCO2 is proportional to pH. Slow (2–3 min). Transcutaneous versions (TcCO2) heat the skin.</li>
<li><b>Temperature correction</b>: analysers measure at 37 °C. <b>Alpha-stat</b> (uncorrected values: maintains protein ionisation and cerebral autoregulation; adults on CPB) vs <b>pH-stat</b> (corrected to patient temperature, adds CO2: cerebral vasodilation; paediatric deep hypothermic arrest).</li></ul>`,
p:"Compare the three O2 analysers in a table: principle, medium, response time, power source, where used (Classify tab).",
v:"Each electrode and analyser: principle, construction, equation or reaction, calibration, errors, uses; then alpha-stat vs pH-stat."},
{f:"gas",t:"Gas analysis",b:`<ul class="clean"><li><b>Infrared absorption spectroscopy</b>: molecules with two or more different atoms absorb infrared at characteristic wavelengths (CO2 4.26 µm; N2O 4.5 µm; volatile agents 8–12 µm, which allows agent identification). Beer–Lambert law: absorption ∝ concentration. A broadband source and filters (or multiple wavelengths) and a reference chamber; detector (thermopile, photoacoustic). O2, N2, helium and xenon (symmetrical or single atoms) do not absorb infrared.</li>
<li><b>Errors</b>: <b>collision broadening</b> (N2O and O2 widen the CO2 absorption band, so CO2 over-reads unless compensated), water vapour (water traps, Nafion tubing), drift, cross-sensitivity with similar wavelengths (alcohol, methane in old single-wavelength agent monitors).</li>
<li><b>Sidestream</b>: sample aspirated (50–200 mL/min) to the analyser: light, can be used with non-intubated patients and in MRI; delay (~1–3 s), dilution with leaks, water and secretions block the line; sample returned to the breathing system or scavenged. <b>Mainstream</b>: sensor at the airway: instant, no sample loss, but heavier, adds dead space, heated to avoid condensation.</li>
<li><b>Mass spectrometry</b>: gas ionised by an electron beam, ions accelerated and deflected in a magnetic field according to mass:charge ratio; measures all gases (O2, N2, CO2, agents); expensive, shared between theatres historically.</li>
<li><b>Raman scattering</b>: monochromatic laser light scattered by molecules with a frequency shift characteristic of each gas; measures O2, N2 and others.</li>
<li><b>Piezoelectric</b>: oil-coated quartz crystal; volatile agent dissolves in the oil, changing the resonant frequency (cannot identify the agent).</li>
<li><b>Refractometry</b> (Rayleigh interferometer): change in refractive index; used to calibrate vaporisers. <b>Photoacoustic</b>: pulsed infrared causes pressure waves detected by a microphone.</li>
<li><b>Colorimetric CO2 detectors</b> (purple to yellow): confirm tracheal intubation when capnography is unavailable; false negatives in cardiac arrest.</li></ul>`,
p:"Why does N2O cause CO2 over-reading on an infrared analyser? Collision broadening: N2O molecules collide with CO2 and widen its absorption band.",
v:"Infrared principle, wavelengths, errors; sidestream vs mainstream; other methods briefly with what each can measure."},
{f:"gas",t:"Capnography",b:`<ul class="clean"><li><b>Definitions</b>: capnometry measures CO2 numerically; <b>capnography</b> displays the waveform (time or volumetric). Normal end-tidal CO2 4.5–5.5 kPa; PaCO2–EtCO2 gradient 0.5–1 kPa (alveolar dead space).</li>
<li><b>Phases</b> (time capnogram): <b>I</b> inspiratory baseline and anatomical dead space (zero); <b>II</b> rapid rise (mixing of dead space and alveolar gas); <b>III</b> alveolar plateau (slight upslope from V/Q heterogeneity); end-tidal value at the end of phase III; <b>0</b> (or IV) inspiratory downstroke. α angle (II–III, ~100–110°: increased in bronchospasm); β angle (III–0, ~90°: increased with rebreathing).</li>
<li><b>Uses</b>: confirm tracheal intubation (sustained waveform over ≥ 6 breaths; "no trace = wrong place" in cardiac arrest too: CPR produces a trace), detect disconnection, oesophageal intubation, ventilation adequacy, rebreathing, airway obstruction, MH, embolism, cardiac output trends, CPR quality (EtCO2 &lt; 1.3 kPa after 20 min ALS suggests poor prognosis; sudden rise suggests ROSC), sedation monitoring, extubation and recovery (Association of Anaesthetists 2021).</li>
<li><b>Increased EtCO2</b>: hypoventilation, rebreathing (exhausted absorber, incompetent valves, low FGF in Mapleson), increased production (MH, sepsis, thyroid storm, fever, shivering), CO2 insufflation (laparoscopy), tourniquet release, bicarbonate, return of circulation.</li>
<li><b>Decreased EtCO2</b>: hyperventilation, fall in cardiac output (haemorrhage, arrest), pulmonary embolism (air, thrombus, fat, CO2), increased dead space, hypothermia, leaks, sampling dilution.</li>
<li><b>Absent</b>: oesophageal intubation (a few decaying traces from gastric CO2), disconnection, apnoea, complete airway obstruction, cardiac arrest without CPR, sampling line blocked, analyser failure.</li>
<li><b>Waveform shapes</b>: shark fin (bronchospasm, COPD, kinked tube), curare cleft (spontaneous effort during IPPV), raised baseline (rebreathing), cardiogenic oscillations, camel hump (lateral position, single-lung transplant), steep phase III in pregnancy and children (end-tidal can exceed PaCO2).</li></ul>`,
p:"Typical exam questions: 'During appendicectomy, disappearance of the capnogram trace: causes and management'. See the Crisis drill and the waveform library.",
v:"Define, draw and label the normal trace with angles, give the gradient, then uses, causes of high, low and absent CO2, and waveform shapes."},
{f:"brain",t:"Temperature measurement",b:`<ul class="clean"><li><b>Non-electrical</b>: liquid expansion (mercury: no longer used; alcohol: lower temperatures), bimetallic strip (dial thermometers), chemical (liquid crystal strips: skin), maximum-reading clinical thermometers (constriction).</li>
<li><b>Electrical</b>:
<ul class="clean"><li><b>Resistance thermometer</b> (platinum wire): resistance rises linearly with temperature; Wheatstone bridge; accurate, slow, bulky.</li>
<li><b>Thermistor</b>: metal-oxide semiconductor bead; resistance falls non-linearly (exponentially) with temperature (negative temperature coefficient); small, fast, cheap; calibration drift; linearised electronically. Used in PA catheters, nasopharyngeal and oesophageal probes.</li>
<li><b>Thermocouple</b>: the <b>Seebeck effect</b>: two dissimilar metals (copper and constantan) joined produce a voltage proportional to the temperature difference between the measuring and reference junctions (~40 µV/°C); needs a reference junction at a known temperature; accurate to 0.1 °C, small, robust.</li></ul></li>
<li><b>Infrared</b>: tympanic (thermopile of thermocouples detects infrared emitted by the tympanic membrane; fast; errors from ear wax and aiming at the canal wall), temporal artery, non-contact forehead (screening).</li>
<li><b>Zero-heat-flux</b> (SpotOn) and double-sensor forehead probes: heat the skin to match core temperature so no heat flows: non-invasive core temperature.</li>
<li><b>Sites</b>: core = PA blood (gold standard), distal oesophagus (lower quarter, behind the heart), nasopharynx, tympanic membrane, bladder (accurate with good urine flow). Rectal lags (insulated by faeces, bacterial heat). Skin is unreliable (vasoconstriction).</li></ul>`,
p:"Draw the three graphs: platinum resistance (linear, positive), thermistor (non-linear, negative), thermocouple (voltage, near-linear).",
v:"Classify devices, explain each electrical method with its graph, then sites with accuracy and lag."},
{f:"brain",t:"Depth of anaesthesia and awareness",b:`<ul class="clean"><li><b>Clinical signs</b>: movement, tachycardia, hypertension, sweating, lacrimation, pupils (Guedel's stages for ether: analgesia, excitement, surgical anaesthesia (4 planes), medullary paralysis). Unreliable with NMBs, opioids, β-blockers. <b>Isolated forearm technique</b>: tourniquet before NMB allows the patient to respond to commands.</li>
<li><b>Processed EEG</b>: anaesthesia slows the EEG (from high-frequency, low-amplitude beta to alpha, then slow delta waves with spindles, then burst suppression and isoelectric EEG). Raw EEG and density spectral array (DSA: colour map of frequency power over time) are increasingly taught.</li>
<li><b>BIS</b>: proprietary algorithm combining bispectral analysis (phase coupling of frequencies), beta ratio and burst suppression ratio into a 0–100 index: &gt; 80–90 awake, 40–60 general anaesthesia, &lt; 40 deep, 0 isoelectric. EMG (frontalis) can raise BIS; ketamine, N2O and xenon raise BIS or have little effect despite anaesthesia; dexmedetomidine lowers it at rousable sedation; unreliable in neonates, dementia, brain injury, hypothermia, and with some pacemakers.</li>
<li><b>Entropy</b> (GE): irregularity of the EEG; state entropy (SE, 0–91: cortical) and response entropy (RE, 0–100: includes frontalis EMG); target 40–60; RE − SE &gt; 10 suggests nociception or light anaesthesia. <b>Auditory evoked potentials</b> (AEP index: mid-latency responses). Narcotrend, SedLine (PSI).</li>
<li><b>Evidence</b>: B-Aware (2004) reduced awareness vs routine care in high-risk patients; B-Unaware and BAG-RECALL (vs end-tidal agent alarms at 0.7 MAC) found no difference. ENGAGES (2019) found no reduction in postoperative delirium with EEG guidance; BALANCED (2019): deep vs light anaesthesia had no mortality difference.</li>
<li><b>Accidental awareness (NAP5)</b>: ~1 in 19 000 general anaesthetics (1 in 8000 with NMBs, 1 in 670 caesarean sections). Risk factors: NMB use, TIVA (drug delivery errors), obstetrics, cardiac surgery, obesity, female, younger adults, previous awareness, difficult airway, transfers, induction and emergence periods (residual paralysis). Recommendations: pEEG with TIVA and NMB; check drug delivery; avoid thiopental-only RSI underdosing; respond with the NAP5 Awareness Support Pathway. NICE DG6 (2012): BIS or entropy options in high-risk patients.</li></ul>`,
p:"'How would you monitor depth of anaesthesia? Is BIS useful?' Give mechanisms, numbers, limitations and trials.",
v:"Clinical signs, EEG changes with depth, BIS and entropy (how, ranges, confounders), evidence, NAP5 incidence, risk factors and recommendations."},
{f:"brain",t:"Neuromuscular monitoring",b:`<ul class="clean"><li><b>Nerve stimulator</b>: supramaximal current (~1.2–1.5× the current needed to stimulate all fibres; typically 50–60 mA), constant current, square wave of 0.2 ms duration (shorter than the refractory period). Negative (black) electrode distal over the ulnar nerve at the wrist, positive (red) 2–3 cm proximal.</li>
<li><b>Patterns</b>: single twitch (0.1–1 Hz; needs a control); <b>train-of-four</b> (4 stimuli at 2 Hz every ≥ 10–12 s; TOF count and ratio T4/T1); <b>tetanus</b> (50 Hz for 5 s; fade with non-depolarising block, painful); <b>post-tetanic count</b> (tetanus, then single twitches at 1 Hz after 3 s: number of responses predicts time to return of TOF; used in deep block); <b>double-burst stimulation</b> (two short bursts of 50 Hz separated by 750 ms: easier to detect fade by feel than TOF, but still misses TOFR 0.6–0.9).</li>
<li><b>Sites</b>: adductor pollicis (ulnar nerve: reflects recovery of upper airway muscles); orbicularis oculi (facial nerve: overestimates recovery, closer to diaphragm onset); corrugator supercilii (tracks laryngeal muscles); posterior tibial nerve (flexor hallucis brevis).</li>
<li><b>Measurement</b>: qualitative (visual or tactile: cannot detect fade above TOFR ~0.4) vs <b>quantitative</b>: acceleromyography (piezoelectric sensor: F = ma; normalise baseline; preload helps), electromyography (compound muscle action potential: unaffected by hand position), kinemyography (bending of a piezoelectric strip), mechanomyography (force transducer: research gold standard).</li>
<li><b>Recommendations</b>: Association of Anaesthetists 2021 and ASA 2023: quantitative monitoring whenever NMBs are used; confirm TOFR ≥ 0.9 at the adductor pollicis before extubation; avoid clinical tests alone (5-s head lift requires only ~50% receptor recovery). Residual block increases hypoxaemia, aspiration and pulmonary complications.</li>
<li><b>Patterns of block</b>: non-depolarising (fade, PTF), depolarising phase I (no fade, no PTF), phase II (fade). Myasthenia: sensitive to non-depolarising, resistant to suxamethonium; Lambert–Eaton: sensitive to both (TOF shows fade at baseline in myasthenia).</li></ul>`,
p:"Use the Stage 8 nerve-stimulator diagram for TOF, tetanus and PTC by receptor occupancy.",
v:"Stimulator settings and electrode placement, each pattern with how it's interpreted, sites, quantitative methods, guidance and the dangers of residual block."},
{f:"brain",t:"Other monitors: cerebral, coagulation and fluid status",b:`<ul class="clean"><li><b>Near-infrared spectroscopy</b> (NIRS, cerebral oximetry): 700–950 nm light through the scalp measures regional oxygen saturation (rSO2, mainly venous ~70%: trend monitor). A fall &gt; 20% from baseline prompts intervention in cardiac and beach-chair surgery.</li>
<li><b>Transcranial Doppler</b>: middle cerebral artery velocity through the temporal window (vasospasm after SAH, emboli in carotid surgery, autoregulation). <b>Jugular bulb oximetry</b> (SjvO2 55–75%). <b>Evoked potentials</b> (SSEP, MEP: spinal surgery; MEPs require TIVA and no NMB).</li>
<li><b>ICP monitoring</b>: external ventricular drain (gold standard, therapeutic CSF drainage, infection risk), intraparenchymal fibre-optic or strain gauge (cannot be recalibrated), subdural, epidural. Waveform P1 (percussion), P2 (tidal: rises above P1 with poor compliance), P3 (dicrotic). Lundberg A (plateau) waves are pathological (Stage 3).</li>
<li><b>Viscoelastic tests</b> (TEG, ROTEM, Quantra: Stage 6), activated clotting time (heparin, CPB), point-of-care Hb.</li>
<li><b>Fluid responsiveness</b>: dynamic indices (PPV, SVV, PVI) in ventilated patients, passive leg raise (+10% CO by a real-time CO monitor), fluid challenge (250 mL over 5–10 min with SV response &gt; 10%), end-expiratory occlusion test, IVC collapsibility on ultrasound, lung ultrasound B-lines.</li>
<li><b>Urine output</b> (&gt; 0.5 mL/kg/h is the traditional target; oliguria intra-operatively is a poor predictor of AKI), lactate, ScvO2 (&gt; 70%), CO2 gap (Pv−aCO2 &gt; 0.8 kPa suggests low flow).</li></ul>`,
p:"These link to physiology stages: NIRS (Stage 1/3), ICP (Stage 3), TEG (Stage 6), fluid responsiveness (Stage 2).",
v:"For each: principle, normal values, uses and limitations."},
];

/* ---------- data ---------- */
const EXT={hbo2:[[600,3200],[630,610],[660,320],[700,290],[750,520],[805,850],[850,1060],[900,1200],[940,1210],[1000,1100]],hb:[[600,14700],[630,5150],[660,3230],[700,1800],[750,1400],[805,850],[850,690],[900,760],[940,690],[1000,400]]};
const E660={o2:320,hb:3230,co:300,met:1600},E940={o2:1210,hb:690,co:20,met:2400};
const CAP={normal:"Normal",rebreath:"Rebreathing",bronch:"Bronchospasm",cleft:"Curare cleft",oes:"Oesophageal intubation",disc:"Disconnection / apnoea",lowco:"Falling cardiac output / PE",mh:"Malignant hyperthermia",cpr:"Cardiac arrest with CPR",cardio:"Cardiogenic oscillations",insp:"Incompetent inspiratory valve"};
const EEG={awake:["Awake (eyes closed)",[[10,25],[20,12],[25,8]],"> 80","Alpha (8–12 Hz) and beta activity, low amplitude, high frequency; EMG may add high-frequency noise."],
 light:["Sedation / light",[[15,20],[6,25],[10,15]],"60–80","Beta activation ('paradoxical excitation') then slowing; risk of recall."],
 surg:["Surgical anaesthesia",[[1.5,60],[11,20],[3,25]],"40–60","Slow delta (0.5–4 Hz) with frontal alpha 'spindles' (propofol, volatiles): the target state."],
 deep:["Deep anaesthesia",[[1,80],[0.6,40]],"20–40","Large slow delta waves, alpha fading; approaching burst suppression."],
 bs:["Burst suppression",[[8,40],[1,40]],"< 20","Bursts of activity separated by isoelectric periods (suppression ratio): too deep for routine surgery; used for refractory status epilepticus and cerebral protection."]};

const CALCS=[
 {t:"Fick cardiac output",c:"abp",in:[["VO2 (mL/min)","vo2",250],["Hb (g/L)","hb",140],["SaO2 (%)","sa",98],["SvO2 (%)","sv",73],["PaO2 (kPa)","pa",12],["PvO2 (kPa)","pv",5.3]],
  f:(v,fmt)=>{const ca=(1.34*v.hb*v.sa/100+0.225*v.pa),cv=(1.34*v.hb*v.sv/100+0.225*v.pv);const co=v.vo2/(ca-cv);return [["CaO2 (mL/L)",fmt(ca,0)],["CvO2 (mL/L)",fmt(cv,0)],["a–v O2 difference (mL/L)",fmt(ca-cv,0)],["Cardiac output (L/min)",fmt(co,2)],["O2 extraction ratio",fmt((ca-cv)/ca*100,0)+"%"]]},
  n:"CO = VO2/(CaO2 − CvO2). Content (mL/L) = 1.34 × Hb (g/L) × SaO2 + 0.225 × PaO2 (kPa)."},
 {t:"Stewart–Hamilton thermodilution",c:"abp",in:[["Injectate volume (mL)","v",10],["Blood temperature (°C)","tb",37],["Injectate temperature (°C)","ti",4],["Area under curve (°C·s)","a",5.5],["Constant K (density × specific heat × catheter)","k",0.9]],
  f:(v,fmt)=>{const co=v.v*(v.tb-v.ti)*v.k/v.a*60/1000;return [["Cardiac output (L/min)",fmt(co,2)],["Indicator 'dose' (mL·°C)",fmt(v.v*(v.tb-v.ti),0)]]},
  n:"CO = V(Tb − Ti)K / ∫ΔT dt. A smaller area means a higher output. Room-temperature injectate halves the signal and reduces accuracy."},
 {t:"Transducer levelling error",c:"abp",in:[["Transducer height relative to phlebostatic axis (cm; below = negative)","h",-20],["True MAP (mmHg)","map",75],["True CVP (mmHg)","cvp",8]],
  f:(v,fmt)=>{const off=-v.h/1.36;return [["Offset (mmHg)",fmt(off,1)],["Displayed MAP",fmt(v.map+off,0)],["Displayed CVP",fmt(v.cvp+off,0),Math.abs(off)>3?"warn":"ok"]]},
  n:"1 mmHg = 1.36 cmH2O. A transducer below the heart over-reads; above under-reads. Level at the tragus to display cerebral MAP in sitting neurosurgery."},
 {t:"Fast-flush test: natural frequency and damping",c:"abp",in:[["Paper speed (mm/s)","sp",25],["Distance between oscillation peaks (mm)","d",1.5],["First overshoot amplitude (mm)","a1",12],["Second overshoot amplitude (mm)","a2",4]],
  f:(v,fmt)=>{const fn=v.sp/v.d,l=Math.log(v.a2/v.a1),z=-l/Math.sqrt(Math.PI*Math.PI+l*l);return [["Natural frequency (Hz)",fmt(fn,1),fn<15?"warn":"ok"],["Amplitude ratio",fmt(v.a2/v.a1,2)],["Damping coefficient ζ",fmt(z,2),z<0.4?"warn":"ok"],["Adequate at HR 120 (fundamental 2 Hz)?",fn>=20&&z>=0.4&&z<=0.8?"Yes":"Check system"]]},
  n:"fn = paper speed / peak-to-peak distance. ζ = −ln(A2/A1) / √(π² + ln²(A2/A1)) (Gardner). Optimal ζ ~0.64 with fn > 20 Hz."},
 {t:"Haemodynamic indices",c:"abp",in:[["Systolic BP (mmHg)","s",120],["Diastolic BP (mmHg)","d",70],["Heart rate (bpm)","hr",80],["CVP (mmHg)","cvp",8],["Cardiac output (L/min)","co",5],["Mean PA pressure (mmHg)","mpa",18],["PAWP (mmHg)","pw",10],["BSA (m²)","bsa",1.9]],
  f:(v,fmt)=>{const map=v.d+(v.s-v.d)/3;return [["MAP (mmHg)",fmt(map,0)],["Pulse pressure",fmt(v.s-v.d,0)],["Shock index (HR/SBP)",fmt(v.hr/v.s,2),v.hr/v.s>0.9?"warn":"ok"],["Cardiac index (L/min/m²)",fmt(v.co/v.bsa,2)],["Stroke volume (mL)",fmt(v.co*1000/v.hr,0)],["SVR (dyn·s·cm⁻⁵)",fmt(80*(map-v.cvp)/v.co,0)],["PVR (dyn·s·cm⁻⁵)",fmt(80*(v.mpa-v.pw)/v.co,0)]]},
  n:"MAP ≈ DBP + PP/3. SVR 800–1200; PVR 100–200 dyn·s·cm⁻⁵ (Wood units × 80)."},
 {t:"Pulse pressure variation",c:"abp",in:[["Maximum pulse pressure (mmHg)","mx",55],["Minimum pulse pressure (mmHg)","mn",45]],
  f:(v,fmt)=>{const ppv=(v.mx-v.mn)/((v.mx+v.mn)/2)*100;return [["PPV (%)",fmt(ppv,1),ppv>13?"warn":"ok"],["Interpretation",ppv>13?"Likely fluid responsive (if conditions met)":ppv<9?"Unlikely fluid responsive":"Grey zone (9–13%)"]]},
  n:"Valid only with controlled ventilation, VT ≥ 8 mL/kg, sinus rhythm, closed chest, no spontaneous breathing, HR/RR ratio > 3.6."},
 {t:"Dead space from capnography (Bohr–Enghoff)",c:"etco2",in:[["PaCO2 (kPa)","pa",5.5],["Mixed expired PECO2 (kPa)","pe",3.0],["End-tidal CO2 (kPa)","et",4.9],["Tidal volume (mL)","vt",500]],
  f:(v,fmt)=>{const vdvt=(v.pa-v.pe)/v.pa,alv=(v.pa-v.et)/v.pa;return [["VD/VT physiological",fmt(vdvt,2),vdvt>0.4?"warn":"ok"],["Physiological dead space (mL)",fmt(vdvt*v.vt,0)],["Pa–ETCO2 gradient (kPa)",fmt(v.pa-v.et,2),v.pa-v.et>1?"warn":"ok"],["Alveolar dead space fraction",fmt(alv,2)]]},
  n:"Enghoff modification uses PaCO2 for alveolar CO2. Normal VD/VT 0.2–0.35; gradient widens with PE, low CO, COPD, lateral position."},
 {t:"Oximeter ratio to SpO2 (linear approximation)",c:"spo2",in:[["Ratio R (AC/DC 660 ÷ AC/DC 940)","r",0.6]],
  f:(v,fmt)=>{const s=Math.max(0,Math.min(100,110-25*v.r));return [["Approximate SpO2 (%)",fmt(s,0)],["Note",v.r>=1?"R ≥ 1: ≤ 85% (MetHb pattern if fixed at 1)":"In calibrated range"]]},
  n:"Many oximeters approximate SpO2 ≈ 110 − 25R in the upper range; manufacturers use empirical, non-linear look-up tables."},
];

const TABLES=[
 ["Minimum monitoring (Association of Anaesthetists 2021)",["Phase","Essential monitoring"],[["Induction","SpO2, NIBP, ECG, capnography (with any airway device), inspired O2 and agent"],["Maintenance","As above + expired agent, airway pressure, alarms set; core temperature if > 30 min"],["NMB used","Quantitative neuromuscular monitoring from before first dose to TOFR ≥ 0.9"],["TIVA + NMB","Processed EEG"],["Recovery","SpO2, NIBP, ECG, capnography while airway device present, temperature"],["Transfer","Same standard as theatre"]]],
 ["Oxygen analysers",["Analyser","Principle","Medium","Response","Notes"],[["Paramagnetic","O2 attracted to magnetic field (dumbbell / pressure)","Gas","Fast (breath-by-breath)","Accurate; water vapour error"],["Fuel cell","Galvanic: Pb anode, Au cathode, KOH","Gas","Slow (20–30 s)","No power supply; exhausts over months"],["Clark electrode","Polarographic: Pt cathode, Ag/AgCl anode, 0.6 V","Blood (and gas)","Moderate","37 °C; halothane error; membrane"],["Mass spectrometry","Mass:charge separation","Gas","Fast","All gases; expensive"],["Raman","Laser scattering shift","Gas","Fast","Multiple gases"]]],
 ["Gas analysis methods",["Method","Measures","Advantages","Limitations"],[["Infrared","CO2, N2O, volatiles","Cheap, fast, agent ID (multi-wavelength)","Collision broadening, water; not O2/N2"],["Mass spectrometry","All gases","Comprehensive, fast","Expensive, large"],["Raman","O2, N2, CO2, N2O, agents","Multiple gases","Cost"],["Piezoelectric","Total volatile","Simple","Cannot identify agent; water"],["Refractometry","Vapour concentration","Calibration standard","Not for clinical monitoring"],["Colorimetric","CO2 presence","Portable, cheap","Qualitative; false negatives in arrest"]]],
 ["Pulse oximetry errors",["Factor","Effect"],[["Methaemoglobin","SpO2 tends to ~85%"],["Carboxyhaemoglobin","Over-reads (reads COHb as O2Hb)"],["Methylene blue","Falsely low (transient)"],["Indocyanine green, isosulfan blue","Falsely low"],["Nail varnish (blue, green, black)","Falsely low"],["Darker skin pigmentation","Over-estimates SaO2 (occult hypoxaemia)"],["Low perfusion, cold, vasopressors","Poor signal, unreliable"],["Motion, shivering","Artefact"],["Venous pulsation (TR, tourniquet)","Falsely low"],["Ambient light","Error (shield probe)"],["Fetal Hb, bilirubin","No significant effect"],["Severe anaemia","Error only at low SaO2"]]],
 ["Capnography patterns",["Pattern","Causes"],[["Raised baseline","Rebreathing: exhausted absorber, faulty valve, inadequate FGF"],["Shark fin (steep α angle)","Bronchospasm, COPD, kinked tube, obstruction"],["Curare cleft","Spontaneous breathing effort during IPPV"],["Gradual rise","Hypoventilation, MH, sepsis, CO2 insufflation"],["Sudden fall","PE (air/thrombus), cardiac arrest, massive haemorrhage, disconnection"],["Absent","Oesophageal intubation, disconnection, apnoea, obstruction, arrest without CPR"],["Few decaying waves","Oesophageal intubation"],["Cardiogenic oscillations","Heart beats during expiratory pause"],["Camel hump","Lateral position, unequal lung emptying"]]],
 ["Damping states",["State","ζ","Trace","SBP / DBP / MAP"],[["Underdamped","< 0.64","Overshoot, ringing, narrow spikes","Over / under / ≈"],["Optimal","0.64","Fastest response, minimal distortion","Accurate"],["Critical","1.0","No overshoot, slower response","Mild under / over / ≈"],["Overdamped","> 1","Slurred, no dicrotic notch","Under / over / ≈"]]],
 ["Temperature measurement",["Device","Principle","Features"],[["Platinum resistance","Resistance ↑ linearly with T","Accurate, slow"],["Thermistor","Semiconductor; resistance ↓ non-linearly","Small, fast; drift; PA catheters"],["Thermocouple","Seebeck: dissimilar metals generate voltage","Accurate 0.1 °C; reference junction"],["Tympanic infrared","Thermopile senses IR from membrane","Fast; technique-dependent"],["Zero-heat-flux","Heated skin sensor matches core","Non-invasive core"],["Liquid crystal","Colour change","Skin only; crude"]]],
 ["Cardiac output methods",["Method","Principle","Invasiveness","Limitations"],[["Fick","O2 uptake / a–v difference","PAC needed","Steady state; VO2 measurement"],["PAC thermodilution","Stewart–Hamilton","Highly invasive","TR, shunts, risks"],["Transpulmonary thermodilution (PiCCO)","Thermodilution + pulse contour","CVC + arterial","Recalibrate; aortic disease"],["Lithium dilution (LiDCO)","Indicator dilution + pulse power","Arterial (+ venous)","Lithium therapy, NMB interference"],["Uncalibrated pulse contour","Algorithm","Arterial line","Vasoplegia, arrhythmias"],["Oesophageal Doppler","Aortic velocity × CSA","Minimal (oesophageal probe)","Probe position, awake patients, assumptions"],["Echocardiography","VTI × LVOT area","Non-invasive / TOE","Operator-dependent, intermittent"],["Bioreactance (NICOM)","Thoracic impedance phase shift","Non-invasive","Accuracy debated"]]],
 ["Depth of anaesthesia monitors",["Monitor","Measures","Target","Confounders"],[["BIS","Bispectral EEG + burst suppression","40–60","EMG, ketamine, N2O, neonates, dementia"],["Entropy","EEG irregularity (SE 0–91), RE with EMG (0–100)","40–60; RE − SE < 10","Similar to BIS"],["AEP index","Mid-latency auditory evoked potentials","< 50 asleep","Deafness, hearing aids"],["Narcotrend","EEG classification A–F","D–E","Similar"],["SedLine (PSI)","4-channel EEG","25–50","Similar"]]],
 ["CVP waveform",["Component","Cause","Abnormality"],[["a wave","Atrial contraction","Absent (AF); cannon (CHB, junctional); large (TS, PHT)"],["c wave","Tricuspid bulging into RA","—"],["x descent","Atrial relaxation, descent of base","Steep (constriction, tamponade)"],["v wave","Atrial filling, closed tricuspid","Giant cv (TR)"],["y descent","Tricuspid opening","Blunted (tamponade), steep (constriction)"]]],
];

const CARDS=[
 ["std","Capnography required when?","Whenever an airway device is used, in recovery while present, and in sedation."],
 ["std","When is processed EEG recommended?","TIVA with neuromuscular blockade."],
 ["std","When is quantitative NMB monitoring required?","Whenever an NMB is used (until TOFR ≥ 0.9)."],
 ["std","ECG signal amplitude and frequency?","~1 mV; 0.5–100 Hz."],
 ["std","EEG amplitude?","1–100 µV."],
 ["std","What is CMRR?","Common mode rejection ratio: rejection of signals common to both inputs."],
 ["std","Monitoring vs diagnostic ECG bandwidth?","0.5–40 Hz vs 0.05–150 Hz."],
 ["std","Nyquist criterion?","Sample at > 2× the highest frequency."],
 ["std","CM5 electrode positions?","RA manubrium, LA V5, monitor lead I."],
 ["std","Pacemaker code DDDR?","Dual paced, dual sensed, dual response, rate adaptive."],
 ["std","Effect of a magnet on an ICD?","Suspends tachytherapies (does not alter pacing)."],
 ["std","Effect of a magnet on most pacemakers?","Asynchronous pacing."],
 ["press","Strain gauge principle?","Resistance changes with stretch; Wheatstone bridge."],
 ["press","Zeroing vs levelling?","Zero to atmosphere vs place at reference level."],
 ["press","Phlebostatic axis?","4th intercostal space, mid-axillary line."],
 ["press","Error per 10 cm transducer height?","~7.4 mmHg."],
 ["press","Natural frequency requirement?","> 8–10 × fundamental (> 20 Hz)."],
 ["press","Factors raising natural frequency?","Wider, shorter, stiffer tubing; no bubbles."],
 ["press","Optimal damping coefficient?","0.64."],
 ["press","Critical damping coefficient?","1.0."],
 ["press","Underdamped trace effect?","SBP over-read, DBP under-read, MAP similar."],
 ["press","Overdamped causes?","Bubbles, clots, kinks, soft tubing, low flush pressure."],
 ["press","Natural frequency from flush test?","Paper speed / distance between peaks."],
 ["press","Oscillometry: most accurate value?","MAP (maximal oscillation)."],
 ["press","Cuff too small?","Over-reads."],
 ["press","Cuff bladder width?","~40% of arm circumference."],
 ["press","PPV threshold for fluid responsiveness?","> 12–13%."],
 ["press","Conditions for PPV validity?","IPPV, VT ≥ 8 mL/kg, sinus rhythm, closed chest, no spontaneous breaths."],
 ["press","CVP a wave?","Atrial contraction."],
 ["press","Cannon a waves?","Atrium contracts against closed tricuspid (CHB, junctional, VT)."],
 ["press","Giant v waves?","Tricuspid regurgitation."],
 ["press","Normal PAWP?","6–12 mmHg."],
 ["press","Fick equation?","CO = VO2/(CaO2 − CvO2)."],
 ["press","Stewart–Hamilton equation?","CO = V(Tb − Ti)K / ∫ΔT dt."],
 ["press","Thermodilution: smaller area under curve means?","Higher cardiac output."],
 ["press","Thermodilution errors?","TR, shunts, rapid infusions, wrong injectate volume/temperature."],
 ["press","LiDCO contraindications?","Lithium therapy, first trimester; NMB interference."],
 ["press","Oesophageal Doppler FTc normal?","330–360 ms."],
 ["press","Low FTc suggests?","Hypovolaemia (or high afterload)."],
 ["press","Doppler peak velocity reflects?","Contractility."],
 ["press","SVR formula?","80 × (MAP − CVP)/CO."],
 ["ox","Pulse oximeter wavelengths?","660 nm (red) and 940 nm (infrared)."],
 ["ox","Which absorbs more red light?","Deoxyhaemoglobin."],
 ["ox","Isosbestic point used?","~805 nm."],
 ["ox","Pulse oximeter ratio R at 85%?","~1.0."],
 ["ox","MetHb effect on SpO2?","Tends to 85%."],
 ["ox","COHb effect on SpO2?","Over-reads."],
 ["ox","Methylene blue effect on SpO2?","Falsely low."],
 ["ox","Skin pigmentation effect?","Over-estimation (occult hypoxaemia)."],
 ["ox","Paramagnetic analyser principle?","O2 attracted into a magnetic field."],
 ["ox","Fuel cell components?","Gold cathode, lead anode, KOH; generates its own current."],
 ["ox","Clark electrode components?","Pt cathode, Ag/AgCl anode, 0.6 V polarising voltage."],
 ["ox","Clark electrode reaction?","O2 + 4e⁻ + 2H2O → 4OH⁻."],
 ["ox","Severinghaus electrode?","pH electrode behind a CO2-permeable membrane with bicarbonate."],
 ["ox","pH electrode sensitivity?","~61.5 mV per pH unit at 37 °C."],
 ["ox","Alpha-stat vs pH-stat?","Uncorrected vs corrected to patient temperature."],
 ["gas","CO2 infrared absorption peak?","4.26 µm."],
 ["gas","Gases not measurable by infrared?","O2, N2, He, Xe (no dipole change)."],
 ["gas","Collision broadening?","N2O/O2 widen CO2 absorption band: over-reads CO2."],
 ["gas","Sidestream sample flow?","50–200 mL/min."],
 ["gas","Mainstream disadvantages?","Weight, dead space, heated sensor."],
 ["gas","Mass spectrometer principle?","Ions deflected by mass:charge ratio."],
 ["gas","Piezoelectric agent analyser?","Volatile dissolves in oil on quartz crystal, changes resonant frequency."],
 ["gas","Normal PaCO2–EtCO2 gradient?","0.5–1 kPa."],
 ["gas","Capnography phase III?","Alveolar plateau."],
 ["gas","α angle increased in?","Bronchospasm/obstruction."],
 ["gas","Curare cleft?","Spontaneous effort during IPPV."],
 ["gas","Causes of sudden fall in EtCO2?","PE, cardiac arrest, haemorrhage, disconnection/leak."],
 ["gas","Causes of rising EtCO2?","Hypoventilation, rebreathing, MH, sepsis, CO2 insufflation."],
 ["gas","EtCO2 in CPR prognosis?","< 1.3 kPa after 20 min suggests poor outcome."],
 ["gas","Oesophageal intubation capnogram?","A few decaying traces then none."],
 ["brain","Thermistor resistance vs temperature?","Falls non-linearly (NTC)."],
 ["brain","Seebeck effect?","Voltage at junction of dissimilar metals ∝ temperature difference."],
 ["brain","Thermocouple metals?","Copper and constantan."],
 ["brain","Core temperature gold standard site?","Pulmonary artery."],
 ["brain","Zero-heat-flux principle?","Heated skin sensor eliminates heat flow to match core."],
 ["brain","BIS range for GA?","40–60."],
 ["brain","Drugs that confound BIS?","Ketamine, N2O, xenon (and dexmedetomidine)."],
 ["brain","State vs response entropy?","SE 0–91 (EEG); RE 0–100 (EEG + EMG)."],
 ["brain","NAP5 awareness incidence?","~1 in 19 000 (1 in 670 caesarean)."],
 ["brain","B-Aware result?","BIS reduced awareness in high-risk patients."],
 ["brain","ENGAGES result?","EEG guidance did not reduce delirium."],
 ["brain","Supramaximal stimulus?","~1.2–1.5× maximal current; 0.2 ms square wave."],
 ["brain","TOF frequency?","4 stimuli at 2 Hz."],
 ["brain","Post-tetanic count used for?","Deep block (TOF count 0)."],
 ["brain","DBS pattern?","Two 50 Hz bursts 750 ms apart."],
 ["brain","Acceleromyography principle?","F = ma (piezoelectric sensor)."],
 ["brain","Muscle reflecting upper airway recovery?","Adductor pollicis."],
 ["brain","Muscle tracking laryngeal block?","Corrugator supercilii."],
 ["brain","NIRS measures?","Regional (mainly venous) cerebral saturation."],
 ["brain","Gold standard ICP monitor?","External ventricular drain."],
];

const FCF={all:"All",std:"Standards & ECG",press:"Pressure & CO",ox:"Oximetry & O2",gas:"Gases & capnography",brain:"Brain, temp, NMB"};

const VIVA=[
 {st:"SOE 2 · Clinical measurement",q:"How does a pulse oximeter work? What are its limitations?",a:["Beer–Lambert law.","Wavelengths and absorption spectra.","AC/DC ratio, calibration, isosbestic point.","Errors: haemoglobins, dyes, signal, pigmentation.","Limitations and co-oximetry."],fu:"Why does methaemoglobinaemia give a reading of 85%?"},
 {st:"SOE 2 · Clinical measurement",q:"Draw a capnograph and explain abnormalities. The trace disappears during appendicectomy: what do you do?",a:["Phases and angles.","Normal values and gradient.","Raised, low, absent CO2 causes.","Systematic check: patient (arrest, PE, bronchospasm), airway (disconnection, displacement), equipment (sampling, analyser).","Management with 100% O2, hand ventilation, call for help."],fu:"How do you confirm tracheal intubation in cardiac arrest?"},
 {st:"SOE 2 · Clinical measurement",q:"Explain resonance and damping in invasive arterial monitoring.",a:["Fourier analysis and harmonics.","Natural frequency and determinants.","Damping coefficient values and traces.","Fast-flush test.","Clinical effects and causes."],fu:"How do you calculate natural frequency from a flush test?"},
 {st:"SOE 2 · Clinical measurement",q:"How can cardiac output be measured?",a:["Classify by invasiveness.","Fick principle.","Indicator and thermodilution (Stewart–Hamilton).","Pulse contour (calibrated/uncalibrated).","Doppler, echo, bioreactance."],fu:"Why does tricuspid regurgitation affect thermodilution?"},
 {st:"SOE 2 · Clinical measurement",q:"Describe the oesophageal Doppler and how you would use it for goal-directed therapy.",a:["Doppler equation.","Waveform: PV, FT, FTc, SD.","SV calculation and assumptions.","Fluid challenge algorithm (SV rise > 10%).","Limitations."],fu:"What does a short FTc with high PV suggest?"},
 {st:"SOE 2 · Clinical measurement",q:"How are oxygen and carbon dioxide measured?",a:["Paramagnetic, fuel cell, Clark: principles.","Infrared for CO2 and agents.","Severinghaus and pH electrodes.","Mass spectrometry, Raman.","Errors and calibration."],fu:"Why does the fuel cell need replacing?"},
 {st:"SOE 2 · Clinical measurement",q:"How is temperature measured in theatre?",a:["Non-electrical methods.","Resistance, thermistor, thermocouple (graphs).","Infrared tympanic, zero-heat-flux.","Core sites and accuracy.","Guidelines (NICE CG65)."],fu:"What is the Seebeck effect?"},
 {st:"SOE 2 · Clinical measurement",q:"How do you monitor depth of anaesthesia? What is the evidence?",a:["Clinical signs, isolated forearm.","EEG changes with depth.","BIS and entropy: principle, values, confounders.","Trials: B-Aware, B-Unaware, BAG-RECALL, ENGAGES.","NAP5 findings and recommendations."],fu:"Why might BIS be high during ketamine anaesthesia?"},
 {st:"SOE 2 · Clinical measurement",q:"Describe neuromuscular monitoring.",a:["Stimulator settings and placement.","Patterns: TOF, tetanus, PTC, DBS.","Sites and differences.","Quantitative vs qualitative.","Guidelines and residual block."],fu:"Why can't you rely on feeling for fade?"},
 {st:"SOE 2 · Clinical measurement",q:"How does a non-invasive blood pressure monitor work and what are the errors?",a:["Auscultatory method and Korotkoff phases.","Oscillometry: MAP at maximal oscillation.","Cuff sizing.","Errors and complications.","Continuous non-invasive methods."],fu:"Why does oscillometry over-read at low pressures?"},
 {st:"SOE 3 · Anaesthesia",q:"Perioperative management of a patient with a pacemaker.",a:["Device identification, indication, dependency, battery.","Interactions: diathermy, MRI, NMB, shivering.","Programming: asynchronous, ICD off, external pads.","Intraoperative: bipolar, plate position, monitoring.","Post-op check."],fu:"What does a magnet do to this device?"},
 {st:"SOE 2 · Clinical measurement",q:"What are biological signals and how are they processed?",a:["Signal amplitudes and frequencies.","Electrodes and impedance.","Differential amplifiers and CMRR.","Filters and modes.","Interference and digitisation."],fu:"Why do ST changes appear in monitoring mode?"},
];

const QUIZ=[
 ["Monitoring standards",[["Capnography is required for all airway devices",1,""],["Processed EEG is mandatory for all GAs",0,"For TIVA with NMB."],["Quantitative NMB monitoring is recommended whenever NMB used",1,""],["Capnography is unnecessary in recovery",0,"Required while airway device present."],["Temperature should be measured if > 30 min",1,""]]],
 ["Biological signals",[["ECG amplitude is ~1 mV",1,""],["EEG amplitude is in millivolts",0,"Microvolts."],["Differential amplifiers reject common-mode noise",1,""],["Diagnostic ECG mode uses 0.05–150 Hz",1,""],["Sampling at the highest signal frequency avoids aliasing",0,"At > 2× (Nyquist)."]]],
 ["Transducers",[["Strain gauges use a Wheatstone bridge",1,""],["Zeroing means placing at the heart level",0,"That is levelling."],["A transducer below the heart over-reads",1,""],["1 mmHg = 1.36 cmH2O",1,""],["Calibration only needs a zero point",0,"Needs a known pressure too."]]],
 ["Damping",[["Optimal damping coefficient is 0.64",1,""],["Underdamping under-reads systolic pressure",0,"Over-reads."],["Air bubbles cause overdamping",1,""],["MAP is relatively unaffected by damping",1,""],["Longer tubing raises natural frequency",0,"Lowers it."]]],
 ["NIBP and arterial lines",[["Oscillometry measures MAP most accurately",1,""],["A small cuff under-reads",0,"Over-reads."],["Systolic is amplified in distal arteries",1,""],["Allen's test reliably predicts ischaemia",0,"Unreliable."],["PPV requires sinus rhythm",1,""]]],
 ["CVP and PAC",[["The a wave follows the P wave",1,""],["Cannon a waves occur in complete heart block",1,""],["Giant v waves suggest mitral stenosis",0,"Tricuspid regurgitation."],["PAWP approximates LAP in West zone 3",1,""],["PAC use improves mortality",0,"PAC-Man: no benefit."]]],
 ["Cardiac output",[["Fick needs mixed venous blood",1,""],["A larger thermodilution area means higher CO",0,"Lower CO."],["Tricuspid regurgitation causes thermodilution error",1,""],["Oesophageal Doppler measures descending aortic velocity",1,""],["LiDCO is safe with lithium therapy",0,"Contraindicated."]]],
 ["Pulse oximetry",[["Deoxyhaemoglobin absorbs more at 660 nm",1,""],["COHb causes under-reading",0,"Over-reads."],["MetHb tends to 85%",1,""],["Methylene blue causes a falsely low reading",1,""],["SpO2 detects hypercapnia",0,"Not ventilation."]]],
 ["Oxygen analysis",[["Oxygen is paramagnetic",1,""],["A fuel cell needs an external battery",0,"Generates its own current."],["The Clark electrode has a platinum cathode",1,""],["Halothane can cause Clark electrode errors",1,""],["The Severinghaus electrode measures PO2",0,"PCO2."]]],
 ["Gas analysis",[["Infrared can measure O2",0,"No dipole."],["N2O causes collision broadening",1,""],["Mass spectrometry can measure N2",1,""],["Sidestream analysers have a delay",1,""],["Piezoelectric analysers identify the agent",0,"Cannot."]]],
 ["Capnography",[["Normal PaCO2–EtCO2 gradient is 0.5–1 kPa",1,""],["A curare cleft indicates spontaneous effort",1,""],["Raised baseline suggests rebreathing",1,""],["PE causes a rise in EtCO2",0,"Fall."],["CPR produces no capnography trace",0,"It does: 'no trace = wrong place'."]]],
 ["Temperature",[["Thermistor resistance falls as temperature rises",1,""],["Thermocouples rely on the Seebeck effect",1,""],["Rectal temperature responds quickly",0,"Lags."],["Platinum resistance thermometers are linear",1,""],["Skin temperature reflects core temperature",0,""]]],
 ["Depth of anaesthesia",[["BIS 40–60 is the target for GA",1,""],["Ketamine lowers BIS reliably",0,"May raise it."],["Response entropy includes EMG",1,""],["NAP5 found the highest awareness rate in obstetrics",1,""],["ENGAGES showed reduced delirium",0,"No difference."]]],
 ["NMB monitoring",[["TOF uses 2 Hz",1,""],["Tactile assessment detects TOFR 0.8",0,"Cannot detect fade above ~0.4."],["Adductor pollicis reflects upper airway recovery",1,""],["PTC is used for deep block",1,""],["Head lift for 5 s guarantees full recovery",0,""]]],
];

const CRISIS=[
 ["Sudden loss of the capnography trace","etco2",["Call for help; 100% O2; check the patient (pulse, SpO2, ABP, chest movement) while you hand-ventilate.","Patient: cardiac arrest (start CPR: a trace should return), massive PE, severe bronchospasm.","Airway and circuit: disconnection, ETT displaced or kinked, obstructed, cuff leak, ventilator failure: follow the tube from mouth to machine; pass a suction catheter; reintubate if doubt ('no trace = wrong place').","Equipment: sampling line disconnected, blocked water trap, analyser failure: switch to a spare or colorimetric detector.","Once stable: identify cause, document, consider ABG."],"Absent CO2 means no ventilation, no pulmonary blood flow, or no measurement."],
 ["Rising EtCO2 under anaesthesia","abp",["Check ventilation settings and minute volume; look for leak, obstruction, rebreathing (baseline > 0: absorber, valves, FGF).","Exclude CO2 insufflation absorption (laparoscopy), bicarbonate, tourniquet release.","Look for hypermetabolism: MH (tachycardia, rigidity, rising temperature, acidosis, K⁺): treat urgently with dantrolene.","Other: sepsis, thyroid storm, phaeochromocytoma, NMS, serotonin syndrome, fever, shivering.","Increase ventilation; send ABG, K⁺, CK, lactate."],"CO2 production rises or elimination falls."],
 ["Damped or lost arterial trace","abp",["Check the patient first: pulse, NIBP, EtCO2 (is this real hypotension?).","Check the system: three-way tap, kinks, bubbles, clot (aspirate then flush), wrist position, flush bag pressure (300 mmHg) and volume.","Fast-flush test to assess damping; re-zero and re-level.","Replace the cannula or transducer if needed; use NIBP meanwhile.","Never inject drugs into the arterial line; label clearly."],"Damping (energy loss) flattens the trace and under-reads systolic pressure."],
 ["Falling SpO2 with a good trace","spo2",["100% O2; check FiO2 analyser, circuit and ventilation (EtCO2, airway pressures).","Airway: tube position (endobronchial, oesophageal), obstruction, secretions, bronchospasm, laryngospasm.","Breathing: atelectasis (recruit), pneumothorax, aspiration, pulmonary oedema, PE.","Circulation: low cardiac output, anaphylaxis, embolism; check for MetHb (dyes, prilocaine, nitrates) if SpO2 ~85% and not improving.","ABG with co-oximetry; CXR or lung ultrasound."],"Hypoxaemia: low FiO2, hypoventilation, V/Q mismatch, shunt, diffusion, low SvO2."],
 ["Suspected awareness (high BIS / patient movement)","nibp",["Deepen anaesthesia immediately (bolus propofol or increase volatile) and give analgesia; consider a benzodiazepine for amnesia.","Check drug delivery: syringe, pump, line, cannula (tissued?), vaporiser empty or off.","Talk to the patient reassuringly (they may hear).","After surgery: interview the patient, document, apologise, follow the NAP5 Awareness Support Pathway, offer psychological support.","Report and review the cause."],"NAP5: most awareness occurs at induction and emergence and with NMB."],
];

const SRC="";
const ERR="";
const REFS="";

const DIAG=`<div class="grid2">
 <div class="fig" style="grid-column:1/-1"><h3>Arterial line: natural frequency and damping</h3>
  <div class="ctl"><label>Natural frequency Hz <input type="range" id="dm-f" min="4" max="40" step="1" value="15"><output id="dm-f-o"></output></label>
   <label>Damping coefficient ζ <input type="range" id="dm-z" min="0.05" max="1.6" step="0.01" value="0.2"><output id="dm-z-o"></output></label>
   <label>Heart rate <input type="range" id="dm-h" min="50" max="160" step="5" value="90"><output id="dm-h-o"></output></label></div>
  <div class="ctl"><div class="seg" id="dm-pre"></div></div>
  <div class="svgbox"><svg id="dm" viewBox="0 0 900 320" role="img" aria-label="Damping"></svg></div>
  <div class="readout" id="dm-r"></div></div>

 <div class="fig" style="grid-column:1/-1"><h3>Pulse oximetry: absorption and dyshaemoglobins</h3>
  <div class="ctl"><label>True O2Hb % (of total Hb) <input type="range" id="po-s" min="40" max="100" step="1" value="92"><output id="po-s-o"></output></label>
   <label>COHb % <input type="range" id="po-c" min="0" max="40" step="1" value="0"><output id="po-c-o"></output></label>
   <label>MetHb % <input type="range" id="po-m" min="0" max="40" step="1" value="0"><output id="po-m-o"></output></label></div>
  <div class="svgbox"><svg id="po" viewBox="0 0 900 300" role="img" aria-label="Oximetry"></svg></div>
  <div class="readout" id="po-r"></div></div>

 <div class="fig"><h3>Capnography waveform library</h3>
  <div class="seg" id="cp-sel"></div>
  <div class="svgbox"><svg id="cp" viewBox="0 0 520 260" role="img" aria-label="Capnogram"></svg></div>
  <div class="readout" id="cp-r"></div></div>

 <div class="fig"><h3>Thermodilution (Stewart–Hamilton)</h3>
  <div class="seg" id="td-sel"></div>
  <div class="ctl"><label>True cardiac output L/min <input type="range" id="td-c" min="2" max="10" step="0.5" value="5"><output id="td-c-o"></output></label>
   <label>Injectate °C <input type="range" id="td-t" min="0" max="24" step="1" value="4"><output id="td-t-o"></output></label></div>
  <div class="svgbox"><svg id="td" viewBox="0 0 520 260" role="img" aria-label="Thermodilution"></svg></div>
  <div class="readout" id="td-r"></div></div>

 <div class="fig"><h3>Oesophageal Doppler waveform</h3>
  <div class="seg" id="od-sel"></div>
  <div class="ctl"><label>Peak velocity cm/s <input type="range" id="od-v" min="30" max="140" step="5" value="80"><output id="od-v-o"></output></label>
   <label>FTc ms <input type="range" id="od-f" min="240" max="440" step="10" value="350"><output id="od-f-o"></output></label>
   <label>Heart rate <input type="range" id="od-h" min="50" max="140" step="5" value="80"><output id="od-h-o"></output></label></div>
  <div class="svgbox"><svg id="od" viewBox="0 0 520 260" role="img" aria-label="Oesophageal Doppler"></svg></div>
  <div class="readout" id="od-r"></div></div>

 <div class="fig"><h3>Transducer levelling</h3>
  <div class="ctl"><label>Transducer height vs right atrium (cm) <input type="range" id="lv-h" min="-30" max="30" step="1" value="-15"><output id="lv-h-o"></output></label></div>
  <div class="svgbox"><svg id="lv" viewBox="0 0 520 260" role="img" aria-label="Levelling"></svg></div>
  <div class="readout" id="lv-r"></div></div>

 <div class="fig"><h3>Temperature sensors</h3>
  <div class="ctl"><label>Temperature °C <input type="range" id="tm-t" min="20" max="45" step="0.5" value="37"><output id="tm-t-o"></output></label></div>
  <div class="svgbox"><svg id="tm" viewBox="0 0 520 260" role="img" aria-label="Temperature sensors"></svg></div>
  <div class="readout" id="tm-r"></div></div>

 <div class="fig"><h3>EEG and depth of anaesthesia</h3>
  <div class="seg" id="eg-sel"></div>
  <div class="svgbox"><svg id="eg" viewBox="0 0 520 220" role="img" aria-label="EEG"></svg></div>
  <div class="readout" id="eg-r"></div></div>
</div>`;

function initDiagrams(){
 const out=(id,t)=>{const o=$("#"+id+"-o");if(o)o.textContent=t};
 const mk=svg=>(t,a,tx)=>{const e=document.createElementNS(SVGNS,t);for(const k in a)e.setAttribute(k,a[k]);if(tx!=null)e.textContent=tx;svg.append(e);return e};

 /* 1. Damping */
 function art(t,hr){const T=60/hr,c=t%T;if(c<0.06)return 80+45*Math.sin(Math.PI/2*c/0.06);if(c<0.27)return 125-25*(c-0.06)/0.21;if(c<0.29)return 100-6*(c-0.27)/0.02;if(c<0.32)return 94+6*(c-0.29)/0.03;return 80+20*Math.exp(-(c-0.32)/Math.max(0.15,(T-0.32)/2.2))}
 function drawDM(){const fn=+$("#dm-f").value,z=+$("#dm-z").value,hr=+$("#dm-h").value;out("dm-f",fn);out("dm-z",z.toFixed(2));out("dm-h",hr);
  const wn=2*Math.PI*fn,dt=0.0002,T=3.2;let x=art(0,hr),v=0;const tr=[],ds=[];let smax=0,smin=999,tmax=0,tmin=999,ssum=0,tsum=0,n=0;
  for(let t=0;t<=T;t+=dt){let p=art(t,hr);if(t>2.4)p=t<2.4+0.4?190:80;const a=wn*wn*(p-x)-2*z*wn*v;v+=a*dt;x+=v*dt;
   if(Math.round(t/dt)%10===0){tr.push([t,Math.min(p,200)]);ds.push([t,Math.max(20,Math.min(220,x))])}
   if(t>1&&t<2.4){const pt=art(t,hr);smax=Math.max(smax,x);smin=Math.min(smin,x);tmax=Math.max(tmax,pt);tmin=Math.min(tmin,pt);ssum+=x;tsum+=pt;n++}}
  const P=plot($("#dm"),{w:900,h:320,x0:0,x1:T,y0:20,y1:220,xt:[0,0.5,1,1.5,2,2.4,3],yt:[40,80,120,160,200],xl:"Time (s): arterial waveform, then a fast-flush square wave released at 2.8 s",yl:"mmHg"});
  P.line(tr.filter(p=>p[0]<2.4),{stroke:"var(--muted)","stroke-dasharray":"5 4","stroke-width":1.4});P.line(ds,{stroke:"var(--abp)"});
  P.text(0.02,212,"true pressure (dashed) vs displayed",{"font-size":"11"});
  let state=z<0.5?"underdamped":z<0.8?"near-optimal":z<1.1?"critically damped":"overdamped";if(fn<2.5*hr/60*4&&z<0.5)state+=" with low natural frequency (resonance)";
  $("#dm-r").innerHTML=`ζ ${z.toFixed(2)}, fn ${fn} Hz (fundamental ${(hr/60).toFixed(1)} Hz; fn/f₀ = ${(fn/(hr/60)).toFixed(0)}). Displayed <b>${smax.toFixed(0)}/${smin.toFixed(0)}</b> (MAP ${(ssum/n).toFixed(0)}) vs true <b>${tmax.toFixed(0)}/${tmin.toFixed(0)}</b> (MAP ${(tsum/n).toFixed(0)}): <b>${state}</b>. Watch the flush response after 2.8 s: ringing = underdamped; one small overshoot = optimal; slow creep = overdamped.`}
 seg($("#dm-pre"),[["u","Underdamped (long tubing)"],["o","Optimal"],["c","Critical"],["d","Overdamped (bubble)"]],k=>{const m={u:[12,0.15],o:[25,0.64],c:[25,1.0],d:[25,1.5]}[k];$("#dm-f").value=m[0];$("#dm-z").value=m[1];drawDM()},"u");["#dm-f","#dm-z","#dm-h"].forEach(x=>$(x).oninput=drawDM);

 /* 2. Oximetry */
 function rOf(o2,hb,co,met){const a=o2*E660.o2+hb*E660.hb+co*E660.co+met*E660.met,b=o2*E940.o2+hb*E940.hb+co*E940.co+met*E940.met;return a/b}
 function spFromR(r){let lo=0,hi=1;for(let i=0;i<50;i++){const m=(lo+hi)/2;rOf(m,1-m,0,0)>r?lo=m:hi=m}return (lo+hi)/2*100}
 function drawPO(){let s=+$("#po-s").value,c=+$("#po-c").value,m=+$("#po-m").value;if(s+c+m>100){s=100-c-m;$("#po-s").value=s}out("po-s",s);out("po-c",c);out("po-m",m);
  const o2=s/100,co=c/100,met=m/100,hb=Math.max(0,1-o2-co-met);const r=rOf(o2,hb,co,met),sp=spFromR(r);const func=o2/(o2+hb)*100;
  const svg=$("#po");svg.innerHTML="";
  const P=plot(svg,{w:560,h:300,x0:600,x1:1000,y0:2,y1:4.4,xt:[600,660,700,800,900,940,1000],yt:[2,3,4],xl:"Wavelength (nm)",yl:"log10 extinction",clear:false});
  const ip=(arr,w)=>{for(let i=1;i<arr.length;i++)if(w<=arr[i][0]){const [w0,e0]=arr[i-1],[w1,e1]=arr[i];return Math.log10(e0)+(Math.log10(e1)-Math.log10(e0))*(w-w0)/(w1-w0)}return Math.log10(arr[arr.length-1][1])};
  P.line(range(600,1000,200).map(w=>[w,ip(EXT.hbo2,w)]),{stroke:"var(--abp)"});P.line(range(600,1000,200).map(w=>[w,ip(EXT.hb,w)]),{stroke:"var(--nibp)"});
  [660,805,940].forEach(w=>P.add("line",{x1:P.X(w),x2:P.X(w),y1:P.Y(2),y2:P.Y(4.4),stroke:"var(--muted)","stroke-dasharray":"3 3"}));
  P.text(612,4.25,"Hb (deoxy)",{fill:"var(--nibp)","font-size":"11"});P.text(612,2.35,"HbO2",{fill:"var(--abp)","font-size":"11"});P.text(808,4.25,"isosbestic 805",{"font-size":"10"});
  const add=mk(svg);const bx=600;const bars=[["True fractional O2Hb",s,"var(--muted)"],["True functional SaO2",func,"var(--etco2)"],["Displayed SpO2",sp,"var(--spo2)"]];
  bars.forEach(([l,v,col],i)=>{const y=40+i*80;add("text",{x:bx,y:y,class:"lbl"},l);add("rect",{x:bx,y:y+8,width:Math.max(1,v*2.8),height:28,fill:col,"fill-opacity":0.85});add("text",{x:bx+Math.max(1,v*2.8)+6,y:y+28,class:"lbl"},v.toFixed(0)+"%")});
  $("#po-r").innerHTML=`R (660/940 pulsatile ratio) = <b>${r.toFixed(2)}</b> → displayed SpO2 <b>${sp.toFixed(0)}%</b>. True O2Hb ${s}% of total Hb (functional saturation ${func.toFixed(0)}%). ${c>0?`COHb ${c}% absorbs like O2Hb at 660 nm but hardly at 940 nm, so the oximeter counts it as oxygenated haemoglobin: <b>over-reading</b> of oxygen-carrying capacity. `:""}${m>0?`MetHb ${m}% absorbs heavily at both wavelengths, pushing R towards ~0.7–1 and the reading towards ~85% regardless of true saturation. `:""}Two wavelengths can only distinguish two haemoglobins: use co-oximetry. <i>Schematic extinction coefficients.</i>`}
 ["#po-s","#po-c","#po-m"].forEach(x=>$(x).oninput=drawPO);drawPO();

 /* 3. Capnography */
 function capVal(k,t){const br=4,ph=(t%br)/br,n=Math.floor(t/br);const base=k==="rebreath"?0.8:k==="insp"?0.6:0;
  if(k==="disc")return t<5?(normal(ph)):0;
  if(k==="oes")return n<3?normal(ph)*[0.5,0.25,0.1][n]:0;
  let peak=5;if(k==="lowco")peak=5-n*1.0;if(k==="mh")peak=5+n*0.7;if(k==="cpr")peak=1.8;
  let v;if(k==="bronch"){v=ph<0.05?base:ph<0.75?base+(peak-base)*Math.pow((ph-0.05)/0.7,0.6):ph<0.8?base+(peak-base)*(1-(ph-0.75)/0.05):base}
  else if(k==="insp"){v=ph<0.05?base:ph<0.15?base+(peak-base)*(ph-0.05)/0.1:ph<0.7?peak+0.4*(ph-0.15):ph<0.95?peak+0.22-(peak+0.22-base)*(ph-0.7)/0.25:base}
  else{v=base+(normal(ph)/5)*(peak-base)}
  if(k==="cleft"&&ph>0.4&&ph<0.5)v-=1.8*Math.sin(Math.PI*(ph-0.4)/0.1);
  if(k==="cardio"&&ph>0.72&&ph<1)v=Math.max(0,0.3+0.3*Math.sin(ph*120));
  return Math.max(0,v)}
 function normal(ph){if(ph<0.05)return 0;if(ph<0.12)return 4.6*(ph-0.05)/0.07;if(ph<0.7)return 4.6+0.6*(ph-0.12)/0.58;if(ph<0.74)return 5.2*(1-(ph-0.7)/0.04);return 0}
 const capTxt={normal:"Phase I baseline (0), II upstroke, III plateau (slight upslope), end-tidal ~5 kPa, then inspiratory downstroke (phase 0).",rebreath:"Baseline does not return to zero: exhausted absorber, faulty expiratory valve, inadequate FGF in a Mapleson system.",bronch:"'Shark fin': slow phase II, steep phase III, increased α angle: bronchospasm, COPD, kinked or obstructed tube.",cleft:"Notch in phase III: spontaneous inspiratory effort against the ventilator (returning NMB function).",oes:"A few breaths with decaying CO2 (gastric gas) then nothing: oesophageal intubation. 'No trace = wrong place'.",disc:"Sudden flat line: disconnection, apnoea, obstruction, extubation, arrest, sampling failure.",lowco:"Breath-by-breath fall with normal shape: falling cardiac output, haemorrhage, PE (air, thrombus, CO2), cardiac arrest.",mh:"Progressive rise despite constant ventilation: hypermetabolism (MH), also CO2 absorption at laparoscopy, sepsis.",cpr:"Low but present waveform with chest compressions (target > 2.5 kPa; sudden rise suggests ROSC).",cardio:"Small oscillations during the expiratory pause synchronous with the heartbeat.",insp:"Raised baseline with a slurred downstroke: incompetent inspiratory valve (rebreathing from inspiratory limb)."};
 function drawCP(k){const P=plot($("#cp"),{w:520,h:260,x0:0,x1:16,y0:0,y1:9,xt:[0,4,8,12,16],yt:[0,2,4,6,8],xl:"Time (s)",yl:"CO2 (kPa)"});P.line(range(0,16,800).map(t=>[t,capVal(k,t)]),{stroke:"var(--etco2)"});
  if(k==="normal"){[["I",0.1,0.4],["II",0.45,2.4],["III",1.6,5.6],["0",2.85,2.4]].forEach(([l,x,y])=>P.text(x,y,l,{"font-size":"11"}))}
  $("#cp-r").innerHTML=`<b>${CAP[k]}.</b> ${capTxt[k]}`}
 seg($("#cp-sel"),Object.entries(CAP),drawCP,"normal");

 /* 4. Thermodilution */
 let tdK="norm";
 function drawTD(){const co=+$("#td-c").value,ti=+$("#td-t").value;out("td-c",co);out("td-t",ti);const V=10,K=0.9,Tb=37;
  const area=V*(Tb-ti)*K/(co*1000/60);const al=3,be=1.2*(tdK==="tr"?2.2:1);const g=t=>Math.pow(t,al)*Math.exp(-t/be);let norm=0;for(let t=0;t<30;t+=0.05)norm+=g(t)*0.05;
  const A=area/norm;let pts=[],meas=0;for(let t=0;t<=30;t+=0.1){let y=A*g(t);if(tdK==="shunt")y+=0.35*A*g(Math.max(0,t-2.5));if(tdK==="rec")y+=0.25*A*g(Math.max(0,t-9));pts.push([t,y]);meas+=y*0.1}
  if(tdK==="tr")meas*=1.0;const coM=V*(Tb-ti)*K/meas*60/1000*(tdK==="tr"?0.75:1);
  const ymax=Math.max(0.5,...pts.map(p=>p[1]))*1.15;const P=plot($("#td"),{w:520,h:260,x0:0,x1:30,y0:0,y1:ymax,xt:[0,5,10,15,20,25,30],yt:[0,+(ymax/2).toFixed(2),+ymax.toFixed(2)],xl:"Time (s)",yl:"ΔT blood (°C)"});
  P.add("path",{d:pts.map((p,i)=>(i?"L":"M")+P.X(p[0])+" "+P.Y(p[1])).join(" ")+` L${P.X(30)} ${P.Y(0)} L${P.X(0)} ${P.Y(0)} Z`,fill:"var(--spo2)","fill-opacity":0.25,stroke:"var(--spo2)"});
  const note={norm:"Normal curve: rapid rise, exponential decay; area inversely proportional to CO.",tr:"Tricuspid regurgitation: indicator recirculates across the valve, prolonging and flattening the curve: CO usually underestimated.",shunt:"Intracardiac left-to-right shunt: early recirculation creates a second hump; the computer may misinterpret the area.",rec:"Late systemic recirculation: devices truncate the curve by extrapolating the exponential decay."}[tdK];
  $("#td-r").innerHTML=`True CO ${co} L/min; ${V} mL at ${ti} °C. Area <b>${meas.toFixed(1)} °C·s</b> → calculated CO <b>${coM.toFixed(1)} L/min</b>. ${note} ${ti>15?"Room-temperature injectate gives a smaller signal (worse signal-to-noise).":""}`}
 seg($("#td-sel"),[["norm","Normal"],["tr","Tricuspid regurgitation"],["shunt","L→R shunt"],["rec","Recirculation"]],k=>{tdK=k;drawTD()},"norm");["#td-c","#td-t"].forEach(x=>$(x).oninput=drawTD);

 /* 5. Oesophageal Doppler */
 function drawOD(){const pv=+$("#od-v").value,ftc=+$("#od-f").value,hr=+$("#od-h").value;out("od-v",pv);out("od-f",ftc);out("od-h",hr);
  const cyc=60/hr*1000,ft=ftc*Math.sqrt(cyc/1000);const tp=ft*0.3;const svg=$("#od");
  const P=plot(svg,{w:520,h:260,x0:0,x1:1500,y0:0,y1:150,xt:[0,500,1000,1500],yt:[0,50,100,150],xl:"Time (ms)",yl:"Velocity (cm/s)"});
  const pts=[];for(let t=0;t<=1500;t+=5){const c=t%cyc;let v=0;if(c<tp)v=pv*c/tp;else if(c<ft)v=pv*(1-(c-tp)/(ft-tp));pts.push([t,v])}
  P.add("path",{d:pts.map((p,i)=>(i?"L":"M")+P.X(p[0])+" "+P.Y(p[1])).join(" "),fill:"var(--abp)","fill-opacity":0.25,stroke:"var(--abp)"});
  const sd=0.5*pv*ft/1000,sv=sd*4.2,co=sv*hr/1000;
  const interp=ftc<330&&pv>=70?"Short FTc with good PV: <b>hypovolaemia likely</b>: give a fluid challenge and look for SV rise > 10%.":ftc<330&&pv<70?"Short FTc and low PV: <b>high afterload or poor contractility</b> (consider vasodilator/inotrope after volume check).":pv<50?"Low PV with normal FTc: <b>reduced contractility</b>.":ftc>400?"Long FTc: vasodilated (sepsis, anaesthesia, epidural) or overfilled.":"Normal FTc and PV: adequately filled with normal contractility.";
  $("#od-r").innerHTML=`Stroke distance <b>${sd.toFixed(1)} cm</b> × aortic area (~4.2 cm², nomogram) ≈ SV <b>${sv.toFixed(0)} mL</b>, CO ≈ <b>${co.toFixed(1)} L/min</b>. FTc ${ftc} ms (normal 330–360), PV ${pv} cm/s (normal falls with age: ~90–120 at 20 yr, 50–80 at 70 yr). ${interp}`}
 seg($("#od-sel"),[["n","Normal"],["h","Hypovolaemia"],["a","High afterload"],["c","Poor contractility"],["v","Vasodilated"]],k=>{const m={n:[85,350],h:[90,280],a:[60,290],c:[40,340],v:[110,420]}[k];$("#od-v").value=m[0];$("#od-f").value=m[1];drawOD()},"n");["#od-v","#od-f","#od-h"].forEach(x=>$(x).oninput=drawOD);

 /* 6. Levelling */
 function drawLV(){const h=+$("#lv-h").value;out("lv-h",h);const svg=$("#lv");svg.innerHTML="";const add=mk(svg);const off=-h/1.36;
  add("ellipse",{cx:150,cy:130,rx:90,ry:50,fill:"var(--panel)",stroke:"var(--muted)"});add("circle",{cx:150,cy:130,r:12,fill:"var(--abp)","fill-opacity":0.7});add("text",{x:150,y:100,"text-anchor":"middle",class:"lbl","font-size":"10"},"right atrium");
  add("line",{x1:30,x2:480,y1:130,y2:130,stroke:"var(--muted)","stroke-dasharray":"4 4"});add("text",{x:36,y:124,class:"lbl","font-size":"10"},"phlebostatic axis");
  const ty=130-h*3;add("rect",{x:320,y:ty-10,width:40,height:20,fill:"var(--etco2)"});add("text",{x:370,y:ty+4,class:"lbl","font-size":"10"},"transducer "+(h>0?"+":"")+h+" cm");
  add("line",{x1:240,x2:320,y1:130,y2:ty,stroke:"var(--muted)"});
  $("#lv-r").innerHTML=`Offset <b>${off>0?"+":""}${off.toFixed(1)} mmHg</b> (1 mmHg = 1.36 cmH2O). MAP 75 would read <b>${(75+off).toFixed(0)}</b>; CVP 8 would read <b>${(8+off).toFixed(0)}</b>. ${h<0?"Transducer below the heart over-reads.":h>0?"Transducer above the heart under-reads.":"Correctly levelled."} The relative error is much larger for CVP and pulmonary pressures than for MAP.`}
 $("#lv-h").oninput=drawLV;drawLV();

 /* 6b. Temperature sensors */
 function drawTM(){const T=+$("#tm-t").value;out("tm-t",T);const pt=t=>100*(1+0.00385*t),th=t=>10000*Math.exp(3950*(1/(t+273.15)-1/298.15)),tc=t=>0.0407*(t-20);
  const svg=$("#tm");svg.innerHTML="";const P=plot(svg,{w:520,h:260,x0:20,x1:45,y0:0,y1:1.15,xt:[20,25,30,35,40,45],yt:[0,0.5,1],xl:"Temperature (°C)",yl:"Output (normalised)"});
  const n=(f,a,b)=>t=>(f(t)-a)/(b-a);const fP=n(pt,pt(20),pt(45)),fT=t=>th(t)/th(20),fC=t=>0.7*tc(t)/tc(45);
  P.line(range(20,45,100).map(t=>[t,fP(t)]),{stroke:"var(--abp)"});P.line(range(20,45,100).map(t=>[t,fT(t)]),{stroke:"var(--spo2)"});P.line(range(20,45,100).map(t=>[t,fC(t)]),{stroke:"var(--etco2)","stroke-dasharray":"5 4"});
  P.add("line",{x1:P.X(T),x2:P.X(T),y1:P.Y(0),y2:P.Y(1.15),stroke:"var(--muted)","stroke-dasharray":"2 3"});
  P.text(21,1.07,"thermistor R (falls, non-linear)",{fill:"var(--spo2)","font-size":"10"});P.text(26,0.42,"platinum R (linear, rises)",{fill:"var(--abp)","font-size":"10"});P.text(36,0.3,"thermocouple µV (scaled)",{fill:"var(--etco2)","font-size":"10"});
  $("#tm-r").innerHTML=`At ${T} °C: platinum resistance <b>${pt(T).toFixed(1)} Ω</b> (Pt100: +0.385 Ω/°C, linear); thermistor <b>${(th(T)/1000).toFixed(2)} kΩ</b> (10 kΩ NTC at 25 °C, falls ~4%/°C, non-linear); thermocouple (copper–constantan, reference 20 °C) <b>${(tc(T)*1000).toFixed(0)} µV</b> (~41 µV/°C).`}
 $("#tm-t").oninput=drawTM;drawTM();

 /* 7. EEG */
 function drawEG(k){const [nm,comps,bis,txt]=EEG[k];const svg=$("#eg");svg.innerHTML="";const add=mk(svg);let s=1;const rnd=()=>{s=(s*16807)%2147483647;return s/2147483647-0.5};
  const pts=[];for(let i=0;i<=480;i++){const t=i/480*4;let v=0;comps.forEach(([f,a],j)=>{v+=a*Math.sin(2*Math.PI*f*t+j*1.3)});v+=rnd()*(k==="awake"?14:6);
   if(k==="bs"){const b=(t%1.6)<0.5;v=b?v:rnd()*3}pts.push([20+i,115-v*0.75])}
  add("path",{d:pts.map((p,i)=>(i?"L":"M")+p[0].toFixed(1)+" "+p[1].toFixed(1)).join(" "),fill:"none",stroke:"var(--nibp)","stroke-width":1.2});
  add("text",{x:20,y:20,class:"lbl"},"Frontal EEG, 4 s (schematic)");add("text",{x:500,y:20,"text-anchor":"end",class:"lbl"},"BIS "+bis);
  $("#eg-r").innerHTML=`<b>${nm}</b> (BIS ${bis}). ${txt}`}
 seg($("#eg-sel"),Object.entries(EEG).map(([k,v])=>[k,v[0]]),drawEG,"surg");
}

ATLAS.register({id:"11",name:"Monitoring",
  lede:"Monitoring standards, biological signals and ECG, pressure transducers, damping, blood pressure, CVP and PAC, cardiac output, pulse oximetry, O2 and blood gas electrodes, gas analysis, capnography, temperature, depth of anaesthesia, neuromuscular and other monitors.",
  barsNote:"",
  bars:BARS,fam:FAM,slides:SLIDES,calcs:CALCS,tables:TABLES,cards:CARDS,fcf:FCF,viva:VIVA,quiz:QUIZ,crisis:CRISIS,
  sources:SRC,errata:ERR,refs:REFS,diagHTML:DIAG,initDiagrams,
  diagLede:"Eight live monitors: an arterial-line damping simulator with fast-flush test, a pulse oximeter with COHb and MetHb, a capnography waveform library, thermodilution curves, an oesophageal Doppler, transducer levelling, temperature sensors and EEG patterns by depth."});
})();
