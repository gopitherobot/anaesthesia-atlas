/* Stage 12 · Clinical anatomy & regional anaesthesia */
(function(){
const {plot,range,el,SVGNS,fmt,$,$$,seg}=ATLAS.h;

const BARS=[];

const FAM={air:["spo2","Airway, neck & vessels"],neu:["etco2","Neuraxial & spine"],ul:["abp","Upper limb, head & neck"],ll:["nibp","Trunk & lower limb"],ans:["ecg","Autonomic, cranial nerves & eye"]};

const SLIDES=[
{f:"air",t:"The larynx and airway innervation",b:`<ul class="clean"><li><b>Larynx</b> (C3–C6 in adults): cartilages: unpaired thyroid, cricoid (only complete ring), epiglottis; paired arytenoid, corniculate, cuneiform. Membranes: thyrohyoid (pierced by internal laryngeal nerve and superior laryngeal vessels), cricothyroid (front-of-neck access: ~10 mm high, ~22 mm wide), cricotracheal.</li>
<li><b>Intrinsic muscles</b>: posterior cricoarytenoid (the only abductor), lateral cricoarytenoid and interarytenoids (adductors), thyroarytenoid (relaxes), cricothyroid (tenses: the only one supplied by the external laryngeal nerve).</li>
<li><b>Sensory supply</b>:
<ul class="clean"><li>Nasal cavity and nasopharynx: V1 (anterior ethmoidal) and V2 (sphenopalatine ganglion branches).</li>
<li>Oropharynx, posterior third of tongue, vallecula, anterior surface of epiglottis: <b>glossopharyngeal (IX)</b> (gag reflex afferent).</li>
<li>Posterior epiglottis down to the vocal cords: <b>internal branch of the superior laryngeal nerve</b> (X).</li>
<li>Below the cords and trachea: <b>recurrent laryngeal nerve</b> (X).</li></ul></li>
<li><b>Motor</b>: recurrent laryngeal nerve supplies all intrinsic muscles except cricothyroid (external laryngeal). The left RLN hooks under the aortic arch (ligamentum arteriosum), the right under the subclavian artery; both ascend in the tracheo-oesophageal groove. Unilateral RLN palsy: hoarseness; bilateral: stridor (cords adducted, paramedian). Semon's law (abductors fail first) is often quoted but disputed.</li>
<li><b>Paediatric airway</b>: large occiput and tongue, higher, more anterior larynx (C3–4 in infants vs C5–6 adults), long floppy U-shaped epiglottis, narrowest at the cricoid (functional; imaging shows the glottis/subglottis is elliptical), short trachea (4–5 cm in neonates: endobronchial intubation easily), obligate nasal breathers until ~5 months, small FRC with high O2 consumption (rapid desaturation), compliant chest wall.</li></ul>`,
p:"Typical exam questions: 'Nerve supply of larynx', 'Airway innervation and blocks', 'Difference between adult and paediatric airway anatomy'.",
v:"Describe the larynx (cartilages, membranes, muscles), then nerve supply region by region, then RLN course and palsy, then paediatric differences."},
{f:"air",t:"Trachea, bronchi and front-of-neck access",b:`<ul class="clean"><li><b>Trachea</b>: 10–15 cm (adult ~11 cm), from the cricoid (C6) to the carina (T4/5; lower on inspiration), 16–20 C-shaped cartilage rings with trachealis posteriorly. Diameter ~2 cm (men).</li>
<li><b>Relations at C6</b>: anterior: skin, fascia, isthmus of thyroid (rings 2–4), strap muscles, inferior thyroid veins; lateral: thyroid lobes, carotid sheath (common carotid artery, IJV, vagus); posterior: oesophagus, with the recurrent laryngeal nerves in the groove between them.</li>
<li><b>Relations at T4</b>: anterior: manubrium, thymic remnant, left brachiocephalic vein, arch of aorta and its branches (brachiocephalic trunk, left common carotid); right: right vagus, azygos vein arching over the right main bronchus, pleura; left: aortic arch, left common carotid and subclavian arteries, left vagus, left RLN; posterior: oesophagus.</li>
<li><b>Bronchi</b>: right main bronchus wider, shorter (~2.5 cm) and more vertical (~25°): aspiration and endobronchial intubation go right; the right upper lobe bronchus arises ~1.5–2.5 cm from the carina (sometimes from the trachea: "pig bronchus"), making right-sided double-lumen tubes harder to position. Left main bronchus ~5 cm, ~45°, passes under the aortic arch.</li>
<li><b>Bronchopulmonary segments</b>: right 10 (upper 3, middle 2, lower 5), left 8–10 (upper with lingula, lower).</li>
<li><b>Front-of-neck access (DAS)</b>: scalpel–bougie–tube through the cricothyroid membrane (laryngeal handshake to identify; vertical incision if impalpable). Structures at risk: cricothyroid arteries (superior), thyroid isthmus and pyramidal lobe, anterior jugular veins. Tracheostomy between rings 2–4 (below the isthmus or through it).</li></ul>`,
p:"Typical exam questions: 'List the immediate relations of the right vagus nerve in the neck at C6 and thorax at T4'. In the neck it lies in the carotid sheath posteriorly between the IJV and common carotid; at T4 it lies on the right of the trachea, behind the right main bronchus, and forms the pulmonary and oesophageal plexuses.",
v:"Dimensions and levels, relations at C6 and T4 (anterior, lateral, posterior), bronchial differences and lung isolation implications, FONA anatomy."},
{f:"air",t:"Airway blocks for awake tracheal intubation",b:`<ul class="clean"><li><b>DAS awake tracheal intubation guideline (2020)</b>: "sTOP": <b>s</b>edation (optional, minimal: remifentanil TCI, midazolam ≤ 1 mg increments), <b>T</b>opicalisation, <b>O</b>xygenation (HFNO), <b>P</b>erformance (videolaryngoscope or flexible scope). Lidocaine maximum <b>9 mg/kg lean body weight</b>; check topicalisation before instrumenting; two attempts maximum per operator (three total).</li>
<li><b>Topical</b>: nasal co-phenylcaine (lidocaine 5% + phenylephrine 0.5%), lidocaine 10% spray (10 mg per puff) to the oropharynx, "spray-as-you-go" 2–4% through the scope channel, nebulised 4% lidocaine, MADgic atomiser.</li>
<li><b>Glossopharyngeal nerve block</b>: submucosal injection at the base of the palatoglossal fold (anterior tonsillar pillar), 2 mL lidocaine 1–2% each side, aspirate (carotid nearby); abolishes gag.</li>
<li><b>Superior laryngeal nerve block</b>: walk off the greater cornu of the hyoid (or ultrasound-guided between hyoid and thyroid cartilage), inject 2 mL above the thyrohyoid membrane each side. Or topical pledgets in the piriform fossae.</li>
<li><b>Transtracheal (translaryngeal) injection</b>: needle through the cricothyroid membrane, aspirate air, inject 3–4 mL lidocaine 4% at end-expiration: the cough spreads it above and below the cords (RLN territory).</li>
<li><b>Indications for awake intubation</b>: predicted difficult intubation and/or difficult mask ventilation, airway pathology (tumours, abscess, radiotherapy), unstable cervical spine, limited mouth opening, morbid obesity with other predictors. <b>Contraindications</b>: refusal, LA allergy, bleeding airway (relative), raised ICP/open globe (relative).</li>
<li>Local anaesthetic toxicity, aspiration risk with a topicalised airway (keep nil by mouth for 2–4 h after), loss of airway with over-sedation, laryngospasm.</li></ul>`,
p:"Typical exam questions: 'Block for awake intubation: nerves of the larynx'. Use the lidocaine calculator for the 9 mg/kg limit.",
v:"Indications, guideline framework, nerve supply mapped to each block with technique and dose, complications."},
{f:"air",t:"Neck vessels and central venous access",b:`<ul class="clean"><li><b>Internal jugular vein</b>: from the jugular foramen, within the carotid sheath (lateral to the internal then common carotid artery, vagus posterior between them), passes deep to the sternocleidomastoid and emerges in the triangle between its sternal and clavicular heads at the level of the cricoid; joins the subclavian behind the sternoclavicular joint to form the brachiocephalic vein. Right IJV is straighter to the SVC (preferred).</li>
<li><b>Subclavian vein</b>: continuation of the axillary vein at the lateral border of the first rib, passes over the first rib anterior to scalenus anterior (artery behind the muscle), behind the medial third of the clavicle. Infraclavicular approach at the junction of the medial and middle thirds. Lowest infection and thrombosis rates, best patient comfort; pneumothorax risk, non-compressible artery.</li>
<li><b>Femoral vein</b>: in the femoral triangle medial to the artery (NAVEL lateral to medial: nerve, artery, vein, empty space, lymphatics), below the inguinal ligament. Easy in emergencies and coagulopathy; infection and thrombosis risk; mobility.</li>
<li><b>Ultrasound guidance</b> for IJV cannulation (NICE TA49): fewer failures, arterial punctures and attempts. Confirm venous placement (ultrasound of wire, transduced pressure/waveform, blood gas) before dilating. Never dilate an artery.</li>
<li><b>Tip position</b>: lower SVC or cavoatrial junction, approximately at the level of the carina on CXR (right-sided lines).</li>
<li><b>Complications</b>: immediate (arterial puncture or cannulation, haemorrhage, pneumothorax, haemothorax, air embolism, arrhythmias, thoracic duct injury (left side), nerve injury (brachial plexus, phrenic, RLN, stellate: Horner's), wire loss); late (infection, thrombosis, stenosis, catheter migration, tamponade from erosion).</li>
<li><b>Antecubital fossa</b> (lateral to medial): radial nerve (under brachioradialis), biceps tendon, brachial artery, median nerve; superficially the cephalic (lateral), basilic (medial) and median cubital veins. <b>Radial artery</b>: between brachioradialis and flexor carpi radialis tendons at the wrist; superficial branch of the radial nerve lies lateral.</li></ul>`,
p:"Typical exam questions: 'CVP line insertion anatomy and complications for each', 'CXR: CVP line misdirected into the subclavian vein', 'Radial artery anatomy'.",
v:"Course and relations of each vein, technique landmarks, ultrasound, tip position, complications grouped by time and site."},
{f:"neu",t:"Vertebral column, meninges and spinal cord",b:`<ul class="clean"><li><b>Vertebrae</b>: 7 cervical, 12 thoracic, 5 lumbar, 5 fused sacral, 3–5 coccygeal. Thoracic spinous processes are steeply angled (paramedian approach easier); lumbar processes horizontal.</li>
<li><b>Ligaments</b> (posterior to anterior along a midline needle path): supraspinous, interspinous, <b>ligamentum flavum</b> (yellow elastic, thickest lumbar ~5–6 mm, "gritty" resistance), then the epidural space; the posterior and anterior longitudinal ligaments lie on the vertebral bodies.</li>
<li><b>Surface landmarks</b>: C7 vertebra prominens; T3 spine of scapula; T7 inferior angle of scapula; T12 lowest rib attachment; <b>Tuffier's (intercristal) line</b> crosses L4 or L4/5 (often higher in obesity and pregnancy, so the true level is frequently one space higher than estimated); PSIS at S2.</li>
<li><b>Spinal cord</b>: ends as the conus medullaris at <b>L1–2</b> in adults (L3 at birth; adult level by ~1 year); below it the cauda equina and filum terminale. <b>Dural sac</b> ends at <b>S2</b> in adults (S3–4 in infants). Spinal cord has 31 pairs of nerves (8 cervical: C1–7 exit above their vertebra, C8 below C7).</li>
<li><b>Meninges</b>: dura mater, arachnoid mater, subarachnoid space (CSF ~150 mL total, ~30 mL below T10? spinal CSF ~75 mL, lumbosacral volume varies and predicts spinal block height), pia mater (denticulate ligaments). Subdural space (between dura and arachnoid): accidental subdural injection gives patchy, high, slow-onset block.</li>
<li><b>Blood supply</b>: one <b>anterior spinal artery</b> (from both vertebral arteries) supplies the anterior two-thirds; two <b>posterior spinal arteries</b> (vertebral or PICA) supply the posterior third; reinforced by segmental radiculomedullary arteries, the largest being the <b>artery of Adamkiewicz</b> (T9–T12 in ~75%, usually left). Watershed zones in the mid-thoracic cord. <b>Anterior spinal artery syndrome</b> (hypotension, aortic surgery, vasoconstrictors): paraplegia and loss of pain and temperature with preserved proprioception and vibration (dorsal columns).</li>
<li><b>Venous drainage</b>: valveless internal vertebral (Batson's) venous plexus, mainly anterolateral in the epidural space, engorged in pregnancy and with raised intra-abdominal pressure.</li></ul>`,
p:"Typical exam questions: 'Anatomy of the extradural space and spinal cord blood supply'. Draw a transverse section of a lumbar vertebra with the meninges and the needle path.",
v:"Vertebral column and ligaments, landmarks, cord and sac termination with age, meninges and CSF, blood supply with clinical syndromes."},
{f:"neu",t:"The epidural space and structures pierced",b:`<ul class="clean"><li><b>Boundaries</b>: superior: foramen magnum (fusion of periosteal and spinal dura); inferior: <b>sacrococcygeal membrane</b> (sacral hiatus); anterior: posterior longitudinal ligament, vertebral bodies and discs; posterior: <b>ligamentum flavum</b> and laminae; lateral: pedicles and intervertebral foramina (communicates with the paravertebral space).</li>
<li><b>Contents</b>: fat (more in the elderly? less: fat decreases with age, with more spread), internal vertebral venous plexus, segmental arteries, lymphatics, spinal nerve roots in dural cuffs, connective tissue bands (plica mediana dorsalis: unilateral blocks).</li>
<li><b>Dimensions</b>: widest posteriorly in the lumbar region (5–6 mm at L2), narrower in thoracic (3–5 mm) and cervical (1.5–2 mm) regions. Skin-to-epidural depth in adults 4–6 cm lumbar (80% within 3.5–6 cm), deeper with obesity; children ~1 mm/kg (6 months–10 years).</li>
<li><b>Negative pressure</b> (thoracic &gt; lumbar): transmitted intrathoracic pressure, dural tenting by the needle, ligament recoil. Basis of the hanging drop technique. Loss of resistance (saline preferred to air: fewer patchy blocks and no pneumocephalus).</li>
<li><b>Structures pierced (midline)</b>: skin, subcutaneous fat, supraspinous ligament, interspinous ligament, ligamentum flavum, epidural space; then for spinal: dura mater, (subdural potential space), arachnoid mater, into the subarachnoid space (CSF). Paramedian: skin, fat, paraspinal muscle (erector spinae), ligamentum flavum.</li>
<li><b>Caudal (sacral) epidural space</b>: accessed through the sacral hiatus (failed fusion of the S5 laminae, bounded by sacral cornua, covered by the sacrococcygeal membrane); contains the sacral nerves, venous plexus and filum terminale; volume in adults 10–27 mL. The hiatus is the apex of an equilateral triangle with the two PSIS.</li></ul>`,
p:"Typical exam questions: 'Boundaries of the epidural and caudal space' (several times), 'Anatomy and structures pierced during a spinal injection'.",
v:"Boundaries (six), contents, dimensions by level, pressure, structures pierced in midline and paramedian approaches, then the caudal space."},
{f:"neu",t:"Spinal anaesthesia",b:`<ul class="clean"><li><b>Factors affecting block height</b>: <b>baricity</b> and patient position (most important: hyperbaric bupivacaine (8% glucose) moves with gravity; lithotomy and supine curvature: T4–T6 highest point and L3 apex), <b>dose</b> (mass of drug), volume and concentration (less independent effect), <b>lumbosacral CSF volume</b> (inversely related: pregnancy, obesity, raised abdominal pressure lower it), level of injection, age (higher in elderly), pregnancy, speed of injection and barbotage (minor), needle bevel direction, patient height (weak correlation).</li>
<li><b>Physiological effects</b>: sympathectomy (2–6 segments above the sensory level) causing venodilation, reduced preload, hypotension; bradycardia if T1–T4 cardioaccelerator fibres are blocked (and Bezold–Jarisch reflex with low preload); reduced respiratory reserve with high blocks (intercostal paralysis; diaphragm spared unless C3–5); bowel contraction (unopposed vagus), urinary retention, reduced stress response.</li>
<li><b>Dermatome targets</b>: caesarean section T4 to cold and light touch to T5 (S5 to T4 bilaterally); TURP T10; hip and knee surgery T10–T12; inguinal hernia T10 (with ilioinguinal infiltration).</li>
<li><b>Agents</b>: hyperbaric bupivacaine 0.5% (2–3.5 mL; caesarean 10–12.5 mg + diamorphine 300 µg or fentanyl 15–25 µg); prilocaine 2% hyperbaric (day case, 1–2 h); chloroprocaine 1% (40–50 mg, 40–60 min); intrathecal morphine 100–200 µg (delayed respiratory depression up to 12–24 h: monitor).</li>
<li><b>Contraindications</b>: refusal, infection at site, raised ICP, coagulopathy or anticoagulation within guideline windows, uncorrected hypovolaemia; relative: fixed cardiac output (AS: cautious low-dose or CSE), sepsis, neurological disease, spinal surgery.</li>
<li><b>Complications</b>: hypotension, bradycardia, high/total spinal, failure, PDPH (25–27G pencil-point &lt; 1%; 16G Tuohy dural puncture 50–80%: conservative measures, epidural blood patch 15–20 mL (~70% success), sphenopalatine ganglion block, rule out other causes), urinary retention, transient neurological symptoms (lidocaine), infection, haematoma, nerve damage. <b>NAP3</b>: permanent harm after central neuraxial block 2.0–4.2 per 100 000 (lower in obstetrics, higher with perioperative epidurals).</li></ul>`,
p:"Use the dermatome diagram to check what a T4 vs T10 block covers and what physiological consequences follow.",
v:"Factors affecting spread (ranked), physiological effects by level, drug choice by surgery, contraindications, complications with incidences."},
{f:"neu",t:"Epidural analgesia and its complications",b:`<ul class="clean"><li><b>Levels</b>: catheter tip at the middle of the incision's dermatomes: thoracotomy T4–T6, upper abdominal T6–T8, lower abdominal T8–T10, hip and knee L1–L3 (or peripheral blocks). Thoracic epidurals reduce pulmonary complications and ileus but are falling out of favour in ERAS (fascial plane blocks, laparoscopy).</li>
<li><b>Technique</b>: aseptic (gown, gloves, mask, chlorhexidine 0.5% allowed to dry), 16–18G Tuohy, LOR to saline, catheter 4–5 cm into the space, aspirate, test dose (detects intrathecal placement; adrenaline test dose for intravascular placement is unreliable), fix and label. Lumbar epidural in labour: low-dose mixtures (0.1% bupivacaine + fentanyl 2 µg/mL) via PIEB/PCEA.</li>
<li><b>Complications</b>: failure or unilateral block (1 in 10 need re-siting), accidental dural puncture (~1% obstetric), hypotension, intravascular injection and LAST, high or total spinal (subdural or intrathecal catheter), urinary retention, pruritus (opioid), catheter shearing, infection (epidural abscess 1:50 000–1:100 000; higher with long catheter duration and immunosuppression), <b>epidural haematoma</b> (obstetric ~1:200 000; much higher in elderly women having orthopaedic surgery with antithrombotics).</li>
<li><b>Red flags</b> (Association of Anaesthetists/RA-UK): motor block that is denser than expected, increasing, or persists &gt; 4 h after stopping the infusion, back pain, fever, new bladder or bowel dysfunction: stop the infusion, assess hourly, urgent MRI, neurosurgical decompression (outcome best within 8–12 h).</li>
<li><b>Postpartum numbness</b>: most are obstetric nerve palsies (lateral cutaneous nerve of thigh: meralgia paraesthetica; femoral, common peroneal, lumbosacral trunk compression by the fetal head), not anaesthetic. Examine distribution (dermatomal vs peripheral nerve), exclude haematoma/abscess (MRI if central signs), neurology referral, nerve conduction studies at 3–4 weeks.</li>
<li><b>Collapse during an epidural top-up</b>: LAST, high/total spinal (subdural/intrathecal migration), anaphylaxis, vasovagal, aortocaval compression, haemorrhage, amniotic fluid embolism.</li></ul>`,
p:"Typical exam questions: 'Primigravida with numbness in the lower limbs 2 days after epidural: management; epidural haematoma incidence', 'Thoracic epidural for cholecystectomy: level, complications', 'While injecting epidural the patient collapsed'.",
v:"Indications and levels, technique, complications with incidences, red-flag monitoring and response, differential for postpartum neurological deficit."},
{f:"neu",t:"Caudal block and paediatric regional anaesthesia",b:`<ul class="clean"><li><b>Indications</b>: infra-umbilical surgery in children (circumcision, hypospadias, hernia, orchidopexy, lower limb), sacral anaesthesia in adults (rare).</li>
<li><b>Technique</b>: lateral position (knees to chest) or prone; palpate the sacral cornua (the hiatus forms the apex of an equilateral triangle with the PSIS); short-bevelled 22G cannula or needle at 45–60° to the skin until a "pop" through the sacrococcygeal membrane, flatten and advance 2–3 mm (cannula off the needle); aspirate, inject slowly watching for swelling (subcutaneous), ECG changes (T-wave peaking: intravascular), resistance.</li>
<li><b>Armitage regimen</b> (bupivacaine 0.25%): 0.5 mL/kg sacrolumbar (circumcision), 1.0 mL/kg lumbar/lower thoracic (hernia, orchidopexy), 1.25 mL/kg mid-thoracic (dilute to ~0.19% to stay within 2.5 mg/kg). Levobupivacaine 0.25% or ropivacaine 0.2% are alternatives.</li>
<li><b>Adjuncts</b>: clonidine 1–2 µg/kg (prolongs analgesia; sedation, avoid in ex-premature neonates: apnoea), preservative-free (S)-ketamine 0.5 mg/kg (neurotoxicity concerns), preservative-free morphine/diamorphine (respiratory depression: monitoring).</li>
<li><b>Complications</b>: failure (5–10%), intravascular or intraosseous injection (LAST), dural puncture and total spinal (the dural sac ends lower in infants: S3–4), urinary retention, motor block (delayed ambulation), infection, haematoma.</li>
<li><b>Paediatric differences</b>: blocks usually done under GA (accepted safe practice: ESRA/ASRA paediatric consensus), lower α1-AGP (more free LA: lower doses in neonates), less myelination (faster onset), lower CSF pressure and larger CSF volume per kg (spinals shorter), haemodynamically stable spinals under 6–8 years (immature sympathetic tone), ultrasound improves accuracy (ossification incomplete).</li></ul>`,
p:"Typical exam questions: 'Regional analgesia in paediatrics: most frequently caudal; differences to consider', 'Child with a caudal catheter with tachycardia and rising CO2: differential diagnosis'.",
v:"Anatomy (hiatus, cornua, membrane, sac level), technique, volumes by Armitage, adjuncts, complications, paediatric differences."},
{f:"ul",t:"Brachial plexus and upper limb blocks",b:`<ul class="clean"><li><b>Formation</b>: anterior rami of C5–T1 (variable C4 "prefixed" or T2 "postfixed"). <b>Roots</b> (between scalenus anterior and medius) → <b>trunks</b> (upper C5–6, middle C7, lower C8–T1; posterior triangle above the clavicle) → <b>divisions</b> (anterior and posterior, behind the clavicle) → <b>cords</b> (lateral, posterior, medial: named by their relation to the second part of the axillary artery) → terminal branches.</li>
<li><b>Branches</b>: roots: dorsal scapular (C5), long thoracic (C5–7), contribution to phrenic (C5). Upper trunk: suprascapular, nerve to subclavius. Lateral cord: lateral pectoral, musculocutaneous, lateral root of median. Medial cord: medial pectoral, medial cutaneous nerves of arm and forearm, ulnar, medial root of median. Posterior cord: upper and lower subscapular, thoracodorsal, axillary, radial.</li>
<li><b>Interscalene</b> (roots/upper trunk at C6, between scalenes): shoulder and proximal humerus surgery. Often spares C8–T1 (ulnar territory). Side effects: <b>phrenic nerve block ~100%</b> (diaphragmatic paresis: caution in respiratory disease; low-volume or superior trunk/suprascapular alternatives), Horner's syndrome, RLN palsy (hoarseness), vertebral artery injection (seizures), epidural/intrathecal spread, pneumothorax (rare), nerve injury.</li>
<li><b>Supraclavicular</b> (divisions lateral to the subclavian artery above the first rib): "spinal of the arm"; dense, fast; pneumothorax risk (ultrasound reduces), phrenic ~50%.</li>
<li><b>Infraclavicular</b> (cords around the axillary artery, deep to pectoral muscles): elbow, forearm, hand; catheter-friendly; spares the shoulder.</li>
<li><b>Axillary</b> (terminal nerves around the axillary artery: median usually superolateral, ulnar inferomedial, radial posterior/inferior, <b>musculocutaneous separately in coracobrachialis</b>): forearm and hand; needs a separate musculocutaneous injection. Intercostobrachial (T2) block for tourniquet pain.</li>
<li><b>Distal blocks</b>: median (medial to brachial artery at elbow; between palmaris longus and FCR at wrist), ulnar (behind medial epicondyle: avoid; forearm ulnar to artery), radial (between biceps tendon and brachioradialis at elbow), digital, IVRA (Bier's: prilocaine 0.5% 3 mg/kg (~40 mL), double cuff, deflate ≥ 20 min).</li></ul>`,
p:"Use the brachial plexus diagram: choose a block to highlight what it reaches and spares.",
v:"Draw the plexus (Randy Travis Drinks Cold Beer), branches by level, then each approach with target, coverage, gaps, side effects."},
{f:"ul",t:"Terminal nerves of the upper limb",b:`<ul class="clean"><li><b>Radial nerve</b> (C5–T1, posterior cord): passes posterior to the axillary artery, through the triangular interval, winds in the <b>spiral (radial) groove</b> with the profunda brachii, pierces the lateral intermuscular septum, lies between brachialis and brachioradialis in front of the lateral epicondyle, then divides into the superficial (sensory) branch and the deep branch (posterior interosseous, through supinator). Motor: triceps, brachioradialis, wrist and finger extensors, supinator. Sensory: posterior arm and forearm, dorsum of the lateral hand (first dorsal web space). Injury: axilla (crutch palsy: triceps weak), spiral groove (humeral shaft fracture, "Saturday night palsy": wrist drop, triceps spared), posterior interosseous (finger drop without sensory loss).</li>
<li><b>Musculocutaneous</b> (C5–7, lateral cord): pierces coracobrachialis, runs between biceps and brachialis (supplies both), continues as the lateral cutaneous nerve of the forearm. Missed by axillary techniques unless blocked separately.</li>
<li><b>Median</b> (C5/6–T1, lateral and medial cords): lateral then medial to the brachial artery, medial to it in the cubital fossa, between FDS and FDP, through the carpal tunnel. Motor: forearm flexors (except FCU and medial FDP), LOAF thenar muscles. Sensory: lateral palm and 3½ fingers. Injury: "ape hand", benediction sign on fist.</li>
<li><b>Ulnar</b> (C8–T1, medial cord): medial to the artery, behind the medial epicondyle (cubital tunnel: vulnerable in positioning), FCU, Guyon's canal. Motor: FCU, medial FDP, hypothenar, interossei, medial lumbricals, adductor pollicis. Sensory: medial 1½ fingers. Injury: claw hand, Froment's sign.</li>
<li><b>Axillary</b> (C5–6, posterior cord): through the quadrangular space around the surgical neck of the humerus: deltoid, teres minor; "regimental badge" sensation. Shoulder dislocation and fractures.</li>
<li><b>Nerve regeneration</b>: after axonotmesis, axons regrow ~1 mm/day (~2.5 cm per month) if endoneurial tubes are intact; neurotmesis needs surgical repair.</li></ul>`,
p:"Typical exam questions: 'Radial nerve anatomy: root value, course, injury and all blocks related; will it regenerate?', 'Musculocutaneous nerve: how to block, relevance in upper limb surgery'.",
v:"For each nerve: roots, cord, course with key relations, motor and sensory supply, injury pattern, where to block."},
{f:"ul",t:"Head and neck blocks",b:`<ul class="clean"><li><b>Cervical plexus</b> (C1–C4 anterior rami): superficial branches emerge at the midpoint of the posterior border of sternocleidomastoid (lesser occipital, great auricular, transverse cervical, supraclavicular); deep branches include the ansa cervicalis and phrenic contribution (C3–5). Superficial or intermediate cervical plexus block for carotid endarterectomy (GALA: LA vs GA no difference in outcome), thyroid surgery, clavicle (with interscalene). Deep block risks phrenic palsy, vertebral artery injection, intrathecal spread.</li>
<li><b>Scalp block</b> (awake craniotomy, pin head-holder): supratrochlear and supraorbital (V1), zygomaticotemporal (V2), auriculotemporal (V3), greater occipital (C2 dorsal ramus), lesser occipital (C2–3), ± great auricular (C2–3). Large volumes of LA: toxicity risk.</li>
<li><b>Trigeminal nerve</b>: V1 ophthalmic (superior orbital fissure), V2 maxillary (foramen rotundum, infraorbital foramen), V3 mandibular (foramen ovale; motor to muscles of mastication). Gasserian ganglion block for trigeminal neuralgia (radiofrequency). <b>Infraorbital nerve block</b> (intra- or extraoral) for cleft lip repair; maxillary nerve block (suprazygomatic) and greater palatine/nasopalatine blocks for cleft palate.</li>
<li><b>Stellate ganglion block</b>: the ganglion (fused inferior cervical and first thoracic ganglia) lies anterior to the C7 transverse process and neck of the first rib, behind the vertebral artery and above the pleural dome. Injection is made at <b>C6 (Chassaignac's tubercle)</b>, ideally under ultrasound, with 5–10 mL that spreads caudally. Indications: CRPS of the upper limb, vascular insufficiency and Raynaud's, refractory ventricular arrhythmias (electrical storm), hyperhidrosis, phantom pain (PTSD under study). Success: Horner's syndrome (ptosis, miosis, anhidrosis, enophthalmos), nasal congestion, conjunctival injection, warm arm. Complications: vertebral artery injection (seizures with tiny volumes), RLN palsy, phrenic block, brachial plexus block, pneumothorax, haematoma, epidural/intrathecal injection, oesophageal puncture.</li></ul>`,
p:"Typical exam questions: 'Stellate ganglion block (composition, uses, complications)', 'Cervical plexus block', 'Trigeminal block', 'Blocks for cleft palate and lip'.",
v:"Anatomy of the plexus or nerve, landmarks or ultrasound technique, indications, signs of success, complications."},
{f:"ans",t:"The eye: orbital anatomy and blocks",b:`<ul class="clean"><li><b>Orbit</b>: four-sided pyramid (~30 mL; globe ~7 mL), apex posteromedial. Openings: optic canal (optic nerve, ophthalmic artery), superior orbital fissure (III, IV, V1 branches, VI, superior ophthalmic vein), inferior orbital fissure (V2, infraorbital vessels). The <b>annulus of Zinn</b> is the origin of the four recti, forming the <b>muscle cone</b> (contains II, III, VI, nasociliary nerve, ciliary ganglion, ophthalmic artery). IV (superior oblique) runs outside the cone (often spared by retrobulbar blocks).</li>
<li><b>Globe</b>: axial length normal ~23–24 mm; &gt; 26 mm (high myopia) or staphyloma increases perforation risk. Tenon's capsule (fascial sheath) surrounds the globe from the limbus to the optic nerve.</li>
<li><b>Blocks</b>: <b>sub-Tenon's</b> (inferonasal quadrant incision in conjunctiva and Tenon's, blunt curved cannula, 3–5 mL; safest; chemosis, subconjunctival haemorrhage), <b>peribulbar/extraconal</b> (inferotemporal needle along the orbital floor, 6–10 mL; slower onset; less risk than retrobulbar), <b>retrobulbar/intraconal</b> (2–4 mL into the cone; fast dense akinesia; highest risk), topical ± intracameral (cataract).</li>
<li><b>Complications</b>: globe perforation, retrobulbar haemorrhage (proptosis, tense orbit, rising IOP: lateral canthotomy), optic nerve injury, central spread via the optic nerve sheath (<b>brainstem anaesthesia</b>: confusion, apnoea, bilateral amaurosis, cardiac arrest within minutes), intravascular injection, oculocardiac reflex, extraocular muscle injury (diplopia, ptosis).</li>
<li><b>Oculocardiac reflex</b>: traction on extraocular muscles (medial rectus in squint) or pressure on the globe → afferent V1 (long and short ciliary nerves, ciliary ganglion) → efferent vagus → bradycardia, AV block, asystole. Stop the stimulus; atropine or glycopyrrolate; deepen; more common in children and with hypercapnia or hypoxia.</li>
<li><b>Reflexes</b>: pupillary light (afferent II → pretectal nucleus → both Edinger–Westphal nuclei → III → ciliary ganglion → short ciliary nerves → sphincter pupillae: direct and consensual); corneal (afferent V1 nasociliary → efferent VII: blink); lacrimal (V1 afferent, VII parasympathetic via pterygopalatine ganglion).</li>
<li><b>Intraocular pressure</b> 10–21 mmHg: raised by coughing, straining, laryngoscopy, hypercapnia, hypoxia, venous congestion, suxamethonium (transient ~10 mmHg), ketamine (debated); lowered by most IV and volatile agents, hypocapnia, head-up tilt, acetazolamide, mannitol. Penetrating eye injury: avoid rises (smooth deep induction; RSI with rocuronium 1.2 mg/kg ± sugammadex; suxamethonium acceptable if needed: the airway takes priority).</li></ul>`,
p:"Typical exam questions: 'Eye block and complications', 'Ocular blocks', 'Optic nerve anatomy and eye nerve supply; light, corneal and lacrimal reflexes', 'Child with penetrating eye injury'.",
v:"Orbital anatomy with the cone, globe measurements, each block's technique and risks, complications and their management, reflexes, IOP control."},
{f:"ll",t:"Truncal and abdominal wall blocks",b:`<ul class="clean"><li><b>Abdominal wall innervation</b>: anterior rami T6–T12 (thoracoabdominal intercostal and subcostal nerves) and L1 (iliohypogastric, ilioinguinal) run in the <b>transversus abdominis plane</b> between internal oblique and transversus abdominis, entering the rectus sheath laterally and piercing rectus abdominis to end as anterior cutaneous branches. Lateral cutaneous branches leave near the mid-axillary line (so lateral TAP misses them).</li>
<li><b>TAP block</b>: lateral (T10–T12: lower abdominal incisions), subcostal (T6–T9: upper abdomen), posterior (more extensive, possible paravertebral spread). 15–20 mL per side; somatic analgesia only (no visceral). Bilateral blocks need careful dose calculation. Complications: peritoneal or bowel puncture, liver injury (right subcostal), femoral nerve block (quadriceps weakness), LAST.</li>
<li><b>Rectus sheath block</b>: LA between rectus abdominis and the posterior rectus sheath (T7–T11 terminal branches): midline laparotomy and umbilical hernia; catheters for continuous infusion.</li>
<li><b>Quadratus lumborum blocks</b>: QL1 (lateral), QL2 (posterior), QL3/transmuscular (anterior, between QL and psoas: possible paravertebral and lumbar plexus spread). <b>Ilioinguinal/iliohypogastric block</b> (medial to the ASIS, between internal oblique and transversus) for hernia repair.</li>
<li><b>Inguinal canal</b> (~4 cm; from the deep ring, midpoint of the inguinal ligament lateral to the inferior epigastric vessels, to the superficial ring above the pubic tubercle): anterior wall external oblique aponeurosis (+ internal oblique laterally); posterior wall transversalis fascia (+ conjoint tendon medially); roof arching fibres of internal oblique and transversus; floor inguinal ligament (lacunar ligament medially). Contents: spermatic cord or round ligament, ilioinguinal nerve (outside the cord but in the canal), genital branch of genitofemoral (in the cord).</li>
<li><b>Thoracic</b>: <b>paravertebral</b> (wedge space: anterolateral parietal pleura, posterior superior costotransverse ligament, medial vertebral body and intervertebral foramen; contains spinal nerve, rami, sympathetic chain; unilateral somatic and sympathetic block; pneumothorax ~0.5%); <b>erector spinae plane</b> (deep to erector spinae on the transverse process, 20–30 mL: rib fractures, thoracic and spinal surgery; safe and simple); <b>serratus anterior</b> (lateral chest wall, rib fractures, VATS); <b>PECS I</b> (between pectoralis major and minor: medial and lateral pectoral nerves) and <b>PECS II</b> (+ between pectoralis minor and serratus anterior: lateral cutaneous branches, long thoracic, thoracodorsal) for breast surgery; <b>intercostal</b> (highest systemic absorption); thoracic epidural (gold standard for thoracotomy but hypotension).</li></ul>`,
p:"Typical exam questions: 'TAP block and its different forms and complications: types of surgery, volume, nerves blocked', 'Abdominal wall blocks', 'Blocks for thoracic surgery', 'Anatomy of the inguinal canal'.",
v:"Nerve anatomy of the wall, then each block: plane, nerves, coverage, volume, indications, complications."},
{f:"ll",t:"Lumbar and sacral plexuses: lower limb blocks",b:`<ul class="clean"><li><b>Lumbar plexus</b> (anterior rami L1–L4 ± T12, within psoas major): iliohypogastric and ilioinguinal (L1), genitofemoral (L1–2), lateral cutaneous nerve of the thigh (L2–3), <b>femoral</b> (L2–4 posterior divisions), <b>obturator</b> (L2–4 anterior divisions). Psoas compartment (posterior lumbar plexus) block: deep, risk of epidural spread, retroperitoneal haematoma (anticoagulation rules as for neuraxial).</li>
<li><b>Femoral triangle</b>: inguinal ligament (superior), sartorius (lateral), adductor longus (medial); floor iliopsoas and pectineus; contents lateral to medial: femoral nerve (outside the femoral sheath, deep to fascia iliaca), artery, vein, femoral canal (lymphatics). <b>Femoral nerve</b> supplies quadriceps, sartorius, pectineus; anterior thigh skin and (via saphenous) medial leg to the medial foot.</li>
<li><b>Hip fracture analgesia</b> (AAGBI 2020 hip fracture guideline: block on admission): <b>fascia iliaca</b> (suprainguinal approach under ultrasound, 30–40 mL: femoral and lateral cutaneous; obturator inconsistent), femoral nerve block, <b>PENG</b> (pericapsular nerve group: between the iliopubic eminence and psoas tendon; articular branches of femoral, obturator and accessory obturator nerves; motor-sparing). "3-in-1" femoral injection rarely reaches the obturator nerve.</li>
<li><b>Knee</b>: <b>adductor canal</b> (Hunter's canal: sartorius roof, vastus medialis lateral, adductor longus/magnus medial; saphenous nerve and nerve to vastus medialis: quadriceps-sparing for TKA), femoral, <b>iPACK</b> (infiltration between popliteal artery and posterior capsule), genicular nerve blocks, periarticular infiltration.</li>
<li><b>Sacral plexus and sciatic nerve</b> (L4–S3): leaves the pelvis through the greater sciatic foramen <b>below piriformis</b>, between the greater trochanter and ischial tuberosity, deep to gluteus maximus, then on adductor magnus deep to the hamstrings; divides into tibial and common peroneal nerves 5–10 cm above the popliteal crease. Approaches: posterior (Labat: perpendicular 4–5 cm from the midpoint of a line joining the PSIS and greater trochanter; Winnie: where it meets the line from the greater trochanter to the sacral hiatus), anterior, subgluteal, <b>popliteal</b> (at the bifurcation; foot and ankle surgery with saphenous block).</li>
<li><b>Ankle block</b> (five nerves): deep peroneal (lateral to dorsalis pedis/EHL: first web space), superficial peroneal (subcutaneous ring across the anterior ankle: dorsum), saphenous (anterior to the medial malleolus beside the saphenous vein: medial ankle), posterior tibial (behind the medial malleolus, posterior to the posterior tibial artery: sole), sural (between the lateral malleolus and Achilles: lateral foot).</li></ul>`,
p:"Typical exam questions: 'Lower limb blocks: all blocks, anatomy for femur fractures', 'Nerves of the femoral triangle', '3-in-1 block', 'Posterior approach of Labat', 'Ankle block', 'USG image of a block for knee arthroscopy'.",
v:"Plexus formation and branches, femoral triangle, blocks by surgery (hip, knee, foot) with anatomy, ultrasound image description, limitations."},
{f:"ans",t:"Autonomic nervous system and sympathetic blocks",b:`<ul class="clean"><li><b>Sympathetic (thoracolumbar) outflow</b>: preganglionic cell bodies in the lateral horn T1–L2; myelinated white rami communicantes to the paravertebral chain; synapse in chain ganglia (postganglionic grey rami to spinal nerves: sweat glands, vessels) or pass through as splanchnic nerves to prevertebral ganglia (coeliac, aorticorenal, superior and inferior mesenteric). Greater splanchnic T5–9, lesser T10–11, least T12. Adrenal medulla receives preganglionic fibres directly (modified postganglionic cells). Cardiac accelerator fibres T1–T4.</li>
<li><b>Parasympathetic (craniosacral)</b>: III (Edinger–Westphal → ciliary ganglion), VII (lacrimal, submandibular, sublingual via pterygopalatine and submandibular ganglia), IX (parotid via otic ganglion), X (heart, lungs, gut to the splenic flexure), S2–4 (pelvic splanchnics: nervi erigentes; bladder, rectum, erection). Ganglia lie near or in target organs (long preganglionic, short postganglionic).</li>
<li><b>Coeliac plexus</b>: largest visceral plexus, around the coeliac trunk anterolateral to the aorta at <b>L1</b>, retroperitoneal; relays afferents from pancreas, liver, biliary tree, stomach, small bowel and colon to the mid-transverse colon. <b>Block/neurolysis</b> (pancreatic and upper GI cancer pain): CT, fluoroscopic or EUS-guided (posterior retrocrural, transcrural/transaortic, or anterior); LA test then alcohol 50–100% (painful: precede with LA) or phenol 6–10%. Complications: orthostatic hypotension, diarrhoea (unopposed parasympathetic), back pain, intravascular injection, retroperitoneal haemorrhage, renal or pleural puncture, paraplegia (artery of Adamkiewicz spasm or injury).</li>
<li><b>Other sympathetic blocks</b>: stellate ganglion (upper limb, head, heart), thoracic sympathetic, lumbar sympathetic (L2–3: lower limb ischaemia, CRPS), superior hypogastric plexus (L5/S1: pelvic cancer pain), ganglion impar (Walther: perineal pain).</li>
<li><b>Effects of neuraxial sympathetic block</b>: venodilation, reduced SVR, bradycardia (T1–4), bowel contraction, reduced stress response, warm dry skin in blocked area.</li></ul>`,
p:"Typical exam questions: 'Coeliac plexus block: innervation, ganglia, indications, drugs and how they work, contraindications and complications', 'Anatomy and function of the sympathetic nervous system', 'Adrenal gland anatomy'.",
v:"Outflow and pathways, ganglia, neurotransmitters (Stage 3), then the coeliac plexus in detail, other blocks, complications."},
{f:"ans",t:"Cranial nerves",b:`<ul class="clean"><li><b>I Olfactory</b>: smell (cribriform plate: anosmia in basal skull fracture).</li>
<li><b>II Optic</b>: vision; afferent for the pupillary light reflex.</li>
<li><b>III Oculomotor</b>: all extraocular muscles except LR6 SO4, levator palpebrae, parasympathetic to the pupil (Edinger–Westphal). Compression by uncal herniation: fixed dilated pupil ("down and out").</li>
<li><b>IV Trochlear</b>: superior oblique. <b>VI Abducens</b>: lateral rectus (long intracranial course: false localising sign with raised ICP; PDPH can cause VI palsy).</li>
<li><b>V Trigeminal</b>: sensation of the face, cornea, nasal and oral mucosa, anterior two-thirds of tongue (general); muscles of mastication (V3). Afferent for corneal, oculocardiac and sneeze reflexes.</li>
<li><b>VII Facial</b>: muscles of facial expression, stapedius, taste (anterior two-thirds), lacrimal and salivary glands; efferent of corneal reflex. Peripheral palsy spares nothing on that side; upper motor neurone lesions spare the forehead.</li>
<li><b>VIII Vestibulocochlear</b>: hearing, balance (N2O and middle ear pressure; PONV via vestibular pathways).</li>
<li><b>IX Glossopharyngeal</b>: posterior third of tongue (taste and sensation), pharynx (gag afferent), carotid sinus and body (baroreceptor and chemoreceptor afferents), stylopharyngeus, parotid secretion.</li>
<li><b>X Vagus</b>: nuclei: nucleus ambiguus (motor to pharynx, larynx, soft palate), dorsal motor nucleus (parasympathetic to thoracic and abdominal viscera), nucleus tractus solitarius (visceral afferents and taste), spinal trigeminal nucleus (ear sensation). Branches: pharyngeal, superior laryngeal (internal/external), recurrent laryngeal, cardiac, pulmonary, oesophageal, gastric. Gag efferent, cough, aortic baroreceptor afferents.</li>
<li><b>XI Accessory</b>: sternocleidomastoid, trapezius (posterior triangle: at risk in node surgery). <b>XII Hypoglossal</b>: tongue muscles (except palatoglossus: X); deviation towards the lesion side.</li>
<li><b>Brainstem death testing</b> uses II, III (pupils), V and VII (corneal), VIII and III/VI (vestibulo-ocular/caloric), IX and X (gag and cough), V and VII (pain response in the face), plus apnoea test (Stage 3).</li></ul>`,
p:"Typical exam questions: 'Cranial nerves: everything (oculomotor, trigeminal, facial, glossopharyngeal, vagus, nerve supply to tongue, pharynx and larynx)', 'List the nuclei of the vagus nerve'.",
v:"Name, type, nucleus/exit, function, anaesthetic relevance for each, with emphasis on V, VII, IX, X."},
{f:"ll",t:"Ultrasound-guided regional anaesthesia: principles and safety",b:`<ul class="clean"><li><b>Probe choice</b>: high-frequency linear (8–15 MHz) for superficial blocks (interscalene, axillary, femoral, TAP); low-frequency curvilinear (2–5 MHz) for deep blocks (subgluteal sciatic, QL, lumbar plexus, neuraxial). Depth, gain, focus, colour Doppler to identify vessels.</li>
<li><b>Sonoanatomy</b>: nerves appear hyperechoic with a "honeycomb" pattern peripherally; hypoechoic round structures at roots (interscalene); arteries pulsatile, non-compressible; veins compressible; fascia hyperechoic lines; bone with acoustic shadow; pleura sliding.</li>
<li><b>Needling</b>: in-plane (whole shaft visible) or out-of-plane (tip as a dot: walk-down technique); hydrodissection with small volumes to confirm tip location; avoid intraneural injection (swelling of the nerve, high opening pressure &gt; 15 psi), aspirate intermittently, inject slowly in 5 mL aliquots. Nerve stimulation (twitch at &lt; 0.2–0.3 mA suggests intraneural placement) as an adjunct.</li>
<li><b>Safety</b>: consent including failure and nerve injury (~1 in 2000–5000 permanent), <b>Stop Before You Block</b> (time-out immediately before needle insertion to prevent wrong-side blocks), monitoring and IV access, lipid emulsion available, dose calculation (lean body weight), anticoagulation guidelines for deep/non-compressible blocks, aseptic technique, documentation.</li>
<li><b>Plan A blocks (RA-UK 2021)</b>: interscalene, axillary brachial plexus, erector spinae plane, rectus sheath, femoral, adductor canal, popliteal sciatic: the core blocks every anaesthetist should be able to perform.</li>
<li><b>Methods to reduce LA dose</b>: ultrasound guidance (smaller volumes), distal or selective blocks, lower concentrations for analgesia, catheters instead of large boluses, adjuncts (dexamethasone, dexmedetomidine) for duration, avoiding multiple simultaneous high-volume blocks, adrenaline to slow absorption.</li></ul>`,
p:"Typical exam questions: 'USG picture of regional blocks', 'Ultrasound image for identification (axillary artery is the landmark)', 'Methods to reduce LA volume during blocks'.",
v:"Equipment, sonoanatomy, needling technique, safety bundle, core blocks, dose-reduction strategies."},
{f:"ll",t:"Perioperative nerve injury and positioning",b:`<ul class="clean"><li><b>Classification</b>: <b>Seddon</b>: neurapraxia (conduction block, myelin injury; recovers in weeks), axonotmesis (axon disrupted, endoneurium intact: Wallerian degeneration, regrowth ~1 mm/day), neurotmesis (nerve transected: needs repair). <b>Sunderland</b> grades 1–5 subdivide axonotmesis by connective tissue involvement.</li>
<li><b>Mechanisms</b>: stretch, compression, ischaemia, direct needle trauma, intraneural injection (high pressure), LA neurotoxicity, tourniquet, haematoma, compartment syndrome, surgical injury. Pre-existing neuropathy (diabetes) predisposes ("double crush").</li>
<li><b>Common injuries</b>: ulnar nerve (elbow compression: forearm pronated on the armboard; supinate the forearm, pad the elbow), brachial plexus (arm abduction &gt; 90°, head turned away, shoulder braces in Trendelenburg, sternotomy retraction), radial (arm compressed against a screen), common peroneal (lithotomy: fibular head on stirrup), sciatic (lithotomy hyperflexion, thin patients sitting), femoral and lateral cutaneous of thigh (lithotomy, retractors), obturator, supraorbital (prone headrests), eye injuries in prone position (ischaemic optic neuropathy: blood loss, hypotension, long spinal surgery).</li>
<li><b>Prevention</b>: neutral positions, padding, avoid stretch and pressure, document positioning, check regularly in long cases, limit tourniquet time (~2 h, pressure 50–100 mmHg above systolic for the arm, 100–150 for the leg).</li>
<li><b>Management of a deficit after a block</b>: examine and document (distribution: block-related or surgical/positional?), exclude reversible causes (haematoma, compartment syndrome, tight cast), discuss with surgeon, early neurology referral; nerve conduction studies and EMG at ~3–4 weeks (after Wallerian degeneration) unless urgent; most block-related deficits recover within weeks to months.</li></ul>`,
p:"Typical exam questions: 'Nerve injuries most common in which positions'.",
v:"Classification, mechanisms, common injuries by position with prevention, approach to a postoperative deficit."},
];

/* ---------- data ---------- */
const DERM=[["C4","Clavicle / top of shoulder",40],["T1","Inner arm",62],["T4","Nipple",80],["T6","Xiphisternum",96],["T8","Costal margin",112],["T10","Umbilicus",132],["T12","Suprapubic",150],["L1","Inguinal ligament",162],["L3","Knee",210],["L5","Dorsum of foot, big toe",258],["S1","Lateral foot, sole",270],["S3–5","Perineum, saddle",188]];
const SURG={cs:["Caesarean section","T4"],turp:["TURP","T10"],hip:["Hip / knee","T10"],hern:["Inguinal hernia","T10"],perineal:["Perineal / haemorrhoids","S1"],abd:["Upper abdominal (epidural)","T6"]};
const BP={is:["Interscalene",["C5","C6","C7","up","mid","ad","pd","lat","post","mc","md","ax","rad","ssc","phr"],"Shoulder, lateral clavicle, proximal humerus","C8–T1 (ulnar territory), intercostobrachial","Phrenic ~100%, Horner's, hoarseness"],
 sc:["Supraclavicular",["up","mid","low","ad","pd","lat","post","med","mc","md","ul","ax","rad"],"Whole upper limb distal to shoulder","Suprascapular (sometimes), intercostobrachial","Pneumothorax, phrenic ~50%"],
 ic:["Infraclavicular",["lat","post","med","mc","md","ul","ax","rad"],"Elbow, forearm, hand","Shoulder; intercostobrachial","Vascular puncture; deep"],
 ax:["Axillary",["md","ul","rad","mc"],"Forearm and hand (mc separately)","Axillary nerve, shoulder, intercostobrachial unless added","Vascular puncture; multiple injections"]};
const LB_REG=["Hip capsule","Anterior thigh","Lateral thigh","Medial knee/leg","Posterior knee","Leg & foot","Sole","Quads motor"];
const LB={fem:["Femoral",[1,2,0,2,0,0,0,2]],fic:["Fascia iliaca (supra-inguinal)",[2,2,2,2,0,0,0,2]],peng:["PENG",[2,1,1,0,0,0,0,0]],acb:["Adductor canal",[0,0,0,2,0,0,0,0]],ipack:["iPACK",[0,0,0,0,2,0,0,0]],pop:["Popliteal sciatic",[0,0,0,0,1,2,2,0]],ank:["Ankle block",[0,0,0,1,0,1,2,0]]};
const EYEB={st:["Sub-Tenon's","Blunt cannula through an inferonasal conjunctival incision into the space between Tenon's capsule and sclera; 3–5 mL spreads around the globe and into the cone. Lowest risk of serious complications."],peri:["Peribulbar (extraconal)","Needle inferotemporal along the orbital floor, staying outside the muscle cone (≤ 25 mm); 6–10 mL diffuses into the cone. Slower onset; globe perforation still possible."],retro:["Retrobulbar (intraconal)","Needle enters the cone behind the globe (~31 mm): fast dense akinesia with 2–4 mL but risk of optic nerve injury, retrobulbar haemorrhage and brainstem anaesthesia (spread along the optic nerve sheath)."]};
const LAY=[["Skin",0.3,"var(--muted)"],["Subcutaneous fat",0,"var(--warn)"],["Supraspinous lig.",0.3,"var(--abp)"],["Interspinous lig.",1.5,"var(--nibp)"],["Ligamentum flavum",0.5,"var(--ecg)"],["Epidural space",0.5,"var(--spo2)"],["Dura + arachnoid",0.05,"var(--ink)"],["Subarachnoid (CSF)",1.0,"var(--etco2)"]];

const CALCS=[
 {t:"Caudal block (Armitage)",c:"etco2",in:[["Weight (kg)","w",15],["Level: 0.5 sacral, 1.0 lumbar, 1.25 mid-thoracic (mL/kg)","v",1],["Bupivacaine concentration %","c",0.25]],
  f:(v,fmt)=>{const ml=v.v*v.w,mg=ml*v.c*10,max=2.5*v.w;return [["Volume (mL)",fmt(ml,1)],["Bupivacaine dose (mg)",fmt(mg,1),mg>max?"bad":"ok"],["Max 2.5 mg/kg (mg)",fmt(max,1)],["Clonidine 1–2 µg/kg (µg)",fmt(v.w,0)+"–"+fmt(2*v.w,0)],["If 1.25 mL/kg, dilute to ~0.19%","Keeps dose ≤ 2.5 mg/kg"]]},
  n:"Armitage 1979: 0.5 mL/kg (sacrolumbar), 1.0 mL/kg (lumbar to lower thoracic), 1.25 mL/kg (mid-thoracic). Use lean weight; reduce in neonates."},
 {t:"Paediatric epidural depth and airway",c:"spo2",in:[["Age (years)","a",4],["Weight (kg)","w",16]],
  f:(v,fmt)=>[["Skin–epidural depth ≈ 1 mm/kg (cm)",fmt(v.w/10,1)],["Alternative: 1 + 0.15 × age (cm)",fmt(1+0.15*v.a,1)],["Cuffed ETT ID (age/4 + 3.5) mm",fmt(v.a/4+3.5,1)],["Uncuffed ETT ID (age/4 + 4) mm",fmt(v.a/4+4,1)],["Oral ETT length (age/2 + 12) cm",fmt(v.a/2+12,1)],["Nasal ETT length (age/2 + 15) cm",fmt(v.a/2+15,1)]],
  n:"Depth formulas are approximate (6 months–10 years); use ultrasound. ETT formulas apply over 1 year."},
 {t:"Topical lidocaine for awake intubation",c:"spo2",in:[["Lean body weight (kg)","w",60],["Lidocaine 10% spray puffs (10 mg each)","p",10],["Lidocaine 4% (mL)","f",5],["Lidocaine 2% (mL)","t",5],["Co-phenylcaine (5% lidocaine) mL","cp",2.5]],
  f:(v,fmt)=>{const tot=v.p*10+v.f*40+v.t*20+v.cp*50,max=9*v.w;return [["Total lidocaine (mg)",fmt(tot,0),tot>max?"bad":"ok"],["Maximum 9 mg/kg LBW (mg)",fmt(max,0)],["% of maximum",fmt(tot/max*100,0)+"%"]]},
  n:"DAS ATI 2020: maximum 9 mg/kg lean body weight of topical lidocaine. 1% = 10 mg/mL."},
 {t:"Intravenous regional anaesthesia (Bier's block)",c:"abp",in:[["Weight (kg)","w",70]],
  f:(v,fmt)=>{const mg=3*v.w;return [["Prilocaine 0.5% dose 3 mg/kg (mg)",fmt(mg,0)],["Volume of 0.5% (mL)",fmt(mg/5,0)],["Minimum cuff time","20 min (deflate in stages)"],["Cuff pressure","~100 mmHg above systolic (arm)"]]},
  n:"Prilocaine is the agent of choice (least cardiotoxic). Never use bupivacaine. Check double-cuff tourniquet before use."},
 {t:"Nerve regeneration estimate",c:"abp",in:[["Distance from injury to target muscle (cm)","d",20],["Regrowth rate (mm/day)","r",1]],
  f:(v,fmt)=>{const days=v.d*10/v.r;return [["Days",fmt(days,0)],["Months",fmt(days/30,1)]]},
  n:"Axonotmesis: Wallerian degeneration then regrowth ~1 mm/day (≈ 2.5 cm/month) along intact endoneurial tubes. Neurapraxia recovers in weeks without regrowth."},
 {t:"Truncal block LA budget",c:"nibp",in:[["Weight (kg)","w",70],["Volume per side (mL)","vs",20],["Number of injections","n",2],["Concentration (% levobupivacaine/bupivacaine)","c",0.25]],
  f:(v,fmt)=>{const mg=v.vs*v.n*v.c*10,max=2*v.w;return [["Total mg",fmt(mg,0),mg>max?"bad":mg>0.8*max?"warn":"ok"],["Max 2 mg/kg (mg)",fmt(max,0)],["Max volume at this concentration (mL)",fmt(max/(v.c*10),0)]]},
  n:"Bilateral TAP, rectus sheath, ESP and QL blocks use large volumes: reduce concentration (0.2–0.25%), use lean body weight, consider catheters."},
 {t:"Transducer / spinal height of injection (Tuffier's line)",c:"etco2",in:[["BMI","b",35],["Pregnant (1/0)","p",1]],
  f:(v,fmt)=>{const err=(v.b>30?1:0)+(v.p?1:0);return [["Likely true level of 'L4/5' by palpation",err>0?"L3/4 or higher":"L4/5 (±1)"],["Advice","Choose a lower space, use ultrasound to count from the sacrum"],["Conus medullaris","L1–2 in adults (L3 occasionally)"]]},
  n:"Clinicians usually misjudge the level by at least one space, more often higher than intended, especially in obesity and pregnancy."},
];

const TABLES=[
 ["Dermatome landmarks",["Dermatome","Landmark","Clinical relevance"],[["C4","Clavicle","Above this: diaphragm (C3–5)"],["T1","Medial arm","Cardioaccelerators T1–4"],["T4","Nipple","Caesarean section target"],["T6","Xiphisternum","Upper abdominal surgery"],["T10","Umbilicus","TURP, hip, lower abdomen"],["L1","Inguinal ligament","Hernia"],["L3","Knee","Knee surgery"],["L5","Big toe, dorsum of foot","Foot surgery"],["S1","Lateral foot, sole","Ankle reflex"],["S2–S5","Perineum, saddle","Saddle block"]]],
 ["Airway innervation",["Region","Sensory nerve","Block / topical"],[["Nasal mucosa","V1 (anterior ethmoidal), V2 (sphenopalatine)","Co-phenylcaine, cotton pledgets"],["Oropharynx, posterior tongue, vallecula","Glossopharyngeal (IX)","Palatoglossal fold block, spray"],["Epiglottis to cords","Internal superior laryngeal (X)","SLN block at greater cornu of hyoid"],["Below the cords, trachea","Recurrent laryngeal (X)","Transtracheal injection"],["Cricothyroid (motor)","External superior laryngeal","—"]]],
 ["Brachial plexus approaches",["Approach","Level","Covers","Misses","Side effects"],Object.values(BP).map(b=>[b[0],{Interscalene:"Roots/upper trunk (C6)",Supraclavicular:"Trunks/divisions",Infraclavicular:"Cords",Axillary:"Terminal nerves"}[b[0]],b[2],b[3],b[4]])],
 ["Upper limb terminal nerves",["Nerve","Roots","Motor","Sensory","Injury sign"],[["Radial","C5–T1","Triceps, extensors, brachioradialis, supinator","Posterior arm/forearm, dorsal 1st web","Wrist drop"],["Median","C6–T1","Forearm flexors, LOAF thenar","Lateral palm, 3½ fingers","Ape hand, benediction"],["Ulnar","C8–T1","FCU, interossei, hypothenar, adductor pollicis","Medial 1½ fingers","Claw hand, Froment's"],["Musculocutaneous","C5–7","Biceps, brachialis, coracobrachialis","Lateral forearm","Weak elbow flexion"],["Axillary","C5–6","Deltoid, teres minor","Regimental badge","Weak abduction"]]],
 ["Lower limb nerves",["Nerve","Roots","Motor","Sensory"],[["Femoral","L2–4","Quadriceps, sartorius","Anterior thigh; medial leg (saphenous)"],["Obturator","L2–4","Adductors","Variable medial thigh/knee"],["Lateral cutaneous nerve of thigh","L2–3","—","Lateral thigh"],["Sciatic","L4–S3","Hamstrings, all below knee","Leg and foot except medial"],["Common peroneal","L4–S2","Dorsiflexors, evertors","Lateral leg, dorsum foot"],["Tibial","L4–S3","Plantarflexors, invertors, foot intrinsics","Sole"],["Sural","S1–2","—","Lateral foot"]]],
 ["Ankle block",["Nerve","Origin","Location","Territory"],[["Deep peroneal","Common peroneal","Lateral to dorsalis pedis / EHL","First web space"],["Superficial peroneal","Common peroneal","Subcutaneous anterior ankle","Dorsum of foot"],["Saphenous","Femoral","Anterior to medial malleolus","Medial ankle"],["Posterior tibial","Sciatic (tibial)","Behind medial malleolus, posterior to artery","Sole"],["Sural","Tibial + peroneal","Between lateral malleolus and Achilles","Lateral foot"]]],
 ["Truncal blocks",["Block","Plane","Nerves","Uses","Typical volume"],[["TAP (lateral)","Internal oblique / transversus abdominis","T10–T12 (L1)","Lower abdominal incisions","15–20 mL/side"],["Subcostal TAP","Rectus / transversus below costal margin","T6–T9","Upper abdomen","15–20 mL/side"],["Rectus sheath","Rectus / posterior sheath","T7–T11 anterior branches","Midline laparotomy","10–20 mL/side"],["Quadratus lumborum","Around QL","T7–L1 ± paravertebral","Abdominal, hip","20–30 mL/side"],["ESP","Deep to erector spinae on TP","Dorsal ± ventral rami","Rib fractures, spine, thoracic","20–30 mL"],["Paravertebral","Paravertebral space","Spinal nerves + sympathetic chain","Thoracic, breast","15–20 mL"],["PECS II","Pectoral muscles / serratus","Pectoral, lateral intercostal, long thoracic","Breast","10 + 20 mL"],["Serratus anterior","Superficial or deep to serratus","Lateral intercostal branches","Rib fractures, VATS","20–30 mL"]]],
 ["Eye blocks",["Block","Volume","Akinesia","Key risks"],[["Topical ± intracameral","Drops","None","Minimal"],["Sub-Tenon's","3–5 mL","Variable","Chemosis, subconjunctival haemorrhage; rare serious"],["Peribulbar","6–10 mL","Good (slower)","Globe perforation, haemorrhage"],["Retrobulbar","2–4 mL","Excellent, fast","Brainstem anaesthesia, optic nerve injury, haemorrhage, perforation"]]],
 ["Central venous access sites",["Site","Advantages","Disadvantages"],[["Internal jugular","Ultrasound-friendly, compressible, low pneumothorax","Carotid puncture, patient comfort, infection"],["Subclavian","Lowest infection and thrombosis, comfort","Pneumothorax, non-compressible artery"],["Femoral","Easy in emergencies, coagulopathy, no pneumothorax","Infection, DVT, immobility"],["PICC / arm","Long-term, few acute complications","Thrombosis, small lumen"]]],
 ["Nerve injury classification",["Seddon","Sunderland","Pathology","Prognosis"],[["Neurapraxia","1","Myelin damage, conduction block","Full recovery in weeks"],["Axonotmesis","2–4","Axon (± endoneurium, perineurium) disrupted","Regrowth ~1 mm/day; variable"],["Neurotmesis","5","Complete transection","Needs surgical repair"]]],
 ["Epidural catheter level by surgery",["Surgery","Insertion level"],[["Thoracotomy","T4–T6"],["Upper abdominal","T6–T8"],["Lower abdominal","T8–T10"],["Hip / knee (if used)","L1–L3"],["Labour","L2–L4"]]],
];

const CARDS=[
 ["air","Sensory supply of the oropharynx and posterior tongue?","Glossopharyngeal nerve."],
 ["air","Sensory supply above the vocal cords (laryngeal)?","Internal branch of the superior laryngeal nerve."],
 ["air","Sensory supply below the cords?","Recurrent laryngeal nerve."],
 ["air","Only abductor of the vocal cords?","Posterior cricoarytenoid."],
 ["air","Intrinsic muscle not supplied by the RLN?","Cricothyroid (external laryngeal)."],
 ["air","Bilateral RLN palsy presents with?","Stridor (cords paramedian)."],
 ["air","Where does the left RLN loop?","Under the aortic arch."],
 ["air","Level of the infant larynx?","C3–4."],
 ["air","Narrowest part of the child's airway (classically)?","Cricoid ring."],
 ["air","Tracheal levels?","C6 to carina T4/5."],
 ["air","Right main bronchus angle and length?","~25°, ~2.5 cm."],
 ["air","Left main bronchus angle and length?","~45°, ~5 cm."],
 ["air","Number of bronchopulmonary segments on the right?","10."],
 ["air","Lidocaine maximum for awake intubation?","9 mg/kg lean body weight."],
 ["air","DAS ATI acronym?","sTOP: sedation, topicalisation, oxygenation, performance."],
 ["air","Where to block the superior laryngeal nerve?","Greater cornu of the hyoid / thyrohyoid membrane."],
 ["air","Glossopharyngeal block site?","Base of the palatoglossal fold."],
 ["air","IJV relation to carotid?","Lateral (and anterior) within the carotid sheath."],
 ["air","Subclavian vein relation to scalenus anterior?","Anterior (artery is behind)."],
 ["air","Femoral triangle contents lateral to medial?","Nerve, artery, vein, canal (lymphatics)."],
 ["air","CVC tip target on CXR?","Carina level (cavoatrial junction)."],
 ["air","Thoracic duct risk with which CVC?","Left IJV/subclavian."],
 ["neu","Tuffier's line crosses?","L4 or L4/5."],
 ["neu","Conus medullaris level in adults?","L1–2."],
 ["neu","Conus level at birth?","L3."],
 ["neu","Dural sac ends at?","S2 adult (S3–4 infant)."],
 ["neu","Structures pierced for spinal (midline)?","Skin, fat, supraspinous, interspinous, flavum, epidural space, dura, arachnoid."],
 ["neu","Epidural space anterior boundary?","Posterior longitudinal ligament."],
 ["neu","Epidural space posterior boundary?","Ligamentum flavum and laminae."],
 ["neu","Epidural space inferior boundary?","Sacrococcygeal membrane."],
 ["neu","Epidural space superior boundary?","Foramen magnum."],
 ["neu","Lumbar ligamentum flavum thickness?","~5–6 mm."],
 ["neu","Adult skin-to-epidural depth (lumbar)?","4–6 cm."],
 ["neu","Anterior spinal artery supplies?","Anterior two-thirds of the cord."],
 ["neu","Artery of Adamkiewicz level?","T9–T12 (usually left)."],
 ["neu","Anterior spinal artery syndrome spares?","Proprioception and vibration (dorsal columns)."],
 ["neu","Most important factor in spinal block height?","Baricity with patient position (and dose)."],
 ["neu","Cardioaccelerator fibres?","T1–T4."],
 ["neu","Caesarean section block height?","T4 (cold) / T5 (touch)."],
 ["neu","NAP3 permanent harm incidence?","2.0–4.2 per 100 000."],
 ["neu","PDPH rate with 25G pencil-point?","< 1%."],
 ["neu","Blood patch volume?","15–20 mL."],
 ["neu","Epidural haematoma red flag?","Dense/increasing motor block, back pain."],
 ["neu","Time window for decompression of haematoma?","Within ~8–12 h."],
 ["neu","Sacral hiatus formed by?","Failure of fusion of S5 laminae."],
 ["neu","Armitage volumes?","0.5 / 1.0 / 1.25 mL/kg."],
 ["neu","Max bupivacaine dose for caudal?","2.5 mg/kg."],
 ["neu","Caudal clonidine dose?","1–2 µg/kg."],
 ["ul","Brachial plexus roots?","C5–T1."],
 ["ul","Upper trunk roots?","C5–C6."],
 ["ul","Cords named by relation to?","Axillary artery (second part)."],
 ["ul","Branches of the posterior cord?","Upper/lower subscapular, thoracodorsal, axillary, radial."],
 ["ul","Interscalene block spares?","C8–T1 (ulnar)."],
 ["ul","Phrenic block with interscalene?","~100%."],
 ["ul","Nerve missed by axillary block?","Musculocutaneous."],
 ["ul","Musculocutaneous nerve pierces?","Coracobrachialis."],
 ["ul","Radial nerve groove?","Spiral groove of humerus."],
 ["ul","Radial injury at mid-humerus?","Wrist drop, triceps spared."],
 ["ul","Median nerve injury sign?","Ape hand / benediction sign."],
 ["ul","Ulnar injury sign?","Claw hand."],
 ["ul","Bier's block agent and dose?","Prilocaine 0.5% 3 mg/kg."],
 ["ul","Stellate ganglion location?","Anterior to C7 TP / neck of first rib."],
 ["ul","Stellate block injection level?","C6 (Chassaignac's tubercle)."],
 ["ul","Signs of successful stellate block?","Horner's: ptosis, miosis, anhidrosis, enophthalmos."],
 ["ul","Superficial cervical plexus emerges?","Midpoint of posterior border of SCM."],
 ["ul","Scalp block nerves?","Supraorbital, supratrochlear, zygomaticotemporal, auriculotemporal, greater and lesser occipital."],
 ["ul","Block for cleft lip?","Infraorbital nerve block."],
 ["ans","Annulus of Zinn?","Common tendinous ring: origin of the four recti."],
 ["ans","Normal axial length of globe?","~23–24 mm."],
 ["ans","Axial length increasing perforation risk?","> 26 mm."],
 ["ans","Safest eye block?","Sub-Tenon's."],
 ["ans","Brainstem anaesthesia mechanism?","Spread along the optic nerve sheath to CSF."],
 ["ans","Oculocardiac reflex arc?","Afferent V1 → efferent vagus."],
 ["ans","Pupillary light reflex efferent?","Oculomotor (Edinger–Westphal) via ciliary ganglion."],
 ["ans","Corneal reflex arc?","Afferent V1, efferent VII."],
 ["ans","Normal IOP?","10–21 mmHg."],
 ["ans","Sympathetic outflow?","T1–L2."],
 ["ans","Greater splanchnic nerve roots?","T5–T9."],
 ["ans","Coeliac plexus level?","L1."],
 ["ans","Coeliac neurolysis agents?","Alcohol 50–100% or phenol 6–10%."],
 ["ans","Coeliac block side effects?","Hypotension, diarrhoea."],
 ["ans","Parasympathetic sacral outflow?","S2–S4."],
 ["ans","Vagus nuclei?","Ambiguus, dorsal motor, tractus solitarius, spinal trigeminal."],
 ["ans","Cranial nerve false localising sign?","VI (abducens)."],
 ["ans","Afferent of carotid sinus baroreflex?","Glossopharyngeal (IX)."],
 ["ll","TAP plane?","Between internal oblique and transversus abdominis."],
 ["ll","Nerves in the TAP?","T6–L1 anterior rami."],
 ["ll","Rectus sheath block plane?","Between rectus and posterior sheath."],
 ["ll","Paravertebral space anterolateral boundary?","Parietal pleura."],
 ["ll","Block with highest LA absorption?","Intercostal."],
 ["ll","Inguinal canal posterior wall?","Transversalis fascia (+ conjoint tendon)."],
 ["ll","Femoral nerve roots?","L2–4 (posterior divisions)."],
 ["ll","Obturator nerve roots?","L2–4 (anterior divisions)."],
 ["ll","Sciatic nerve roots?","L4–S3."],
 ["ll","Sciatic exits pelvis?","Greater sciatic foramen below piriformis."],
 ["ll","Sciatic divides where?","5–10 cm above popliteal crease."],
 ["ll","PENG targets?","Articular branches of femoral, obturator, accessory obturator."],
 ["ll","Adductor canal contents blocked?","Saphenous nerve, nerve to vastus medialis."],
 ["ll","iPACK?","Between popliteal artery and posterior knee capsule."],
 ["ll","Labat approach?","Perpendicular 4–5 cm from midpoint of PSIS–greater trochanter line."],
 ["ll","Ankle block nerves?","Deep and superficial peroneal, saphenous, posterior tibial, sural."],
 ["ll","Nerve supplying the sole?","Posterior tibial."],
 ["ll","Nerve supplying first web space?","Deep peroneal."],
 ["ll","Plan A blocks (RA-UK)?","Interscalene, axillary, ESP, rectus sheath, femoral, adductor canal, popliteal sciatic."],
 ["ll","Opening injection pressure threshold?","< 15 psi."],
 ["ll","Seddon classes?","Neurapraxia, axonotmesis, neurotmesis."],
 ["ll","Commonest positioning nerve injury?","Ulnar."],
 ["ll","Lithotomy nerve at risk at fibular head?","Common peroneal."],
];

const FCF={all:"All",air:"Airway, neck, vessels",neu:"Neuraxial",ul:"Upper limb, head & neck",ll:"Trunk & lower limb",ans:"Autonomic, cranial, eye"};

const VIVA=[
 {st:"SOE 1 · Anatomy",q:"Describe the boundaries and contents of the epidural space. What structures are pierced during a spinal injection?",a:["Six boundaries.","Contents.","Dimensions by level and depth.","Structures pierced (midline and paramedian).","Caudal space and sacral hiatus."],fu:"Where does the dural sac end in an infant?"},
 {st:"SOE 1 · Anatomy",q:"Draw the brachial plexus. Describe the interscalene block.",a:["Roots, trunks, divisions, cords, branches.","Anatomy at C6 between scalenes.","Ultrasound technique, volume.","Coverage and gaps.","Side effects and complications."],fu:"How would you provide shoulder analgesia in a patient with severe COPD?"},
 {st:"SOE 1 · Anatomy",q:"Describe the anatomy relevant to an axillary block. Show the ultrasound image.",a:["Terminal nerves and axillary artery.","Position of each nerve around the artery.","Musculocutaneous in coracobrachialis.","Technique and volumes.","Intercostobrachial and tourniquet."],fu:"Which nerve is missed most often and why?"},
 {st:"SOE 1 · Anatomy",q:"Describe the nerve supply of the larynx and how you would anaesthetise the airway for awake intubation.",a:["Laryngeal anatomy.","Sensory supply by region.","Motor supply and RLN course.","Blocks and topical techniques.","Dose limits and DAS guideline."],fu:"What happens with bilateral recurrent laryngeal nerve palsy?"},
 {st:"SOE 1 · Anatomy",q:"Describe the stellate ganglion and its block.",a:["Anatomy and relations.","Indications.","Technique at C6.","Signs of success.","Complications."],fu:"Why is the block performed at C6 rather than C7?"},
 {st:"SOE 1 · Anatomy",q:"Describe the coeliac plexus and the coeliac plexus block.",a:["Location and relations.","Innervation and afferents.","Indications.","Approaches and agents.","Complications."],fu:"Why do patients develop diarrhoea after the block?"},
 {st:"SOE 1 · Anatomy",q:"Describe orbital anatomy and the blocks used for eye surgery.",a:["Orbit, openings, muscle cone.","Globe and axial length.","Sub-Tenon's, peribulbar, retrobulbar.","Complications including brainstem anaesthesia.","Reflexes and IOP."],fu:"How do you recognise and treat retrobulbar haemorrhage?"},
 {st:"SOE 1 · Anatomy",q:"Lower limb blocks for a fractured femur and knee surgery.",a:["Lumbar plexus anatomy.","Femoral triangle.","Fascia iliaca, femoral, PENG.","Adductor canal, iPACK, popliteal sciatic.","Complications and falls risk."],fu:"Does a '3-in-1' block reliably block the obturator nerve?"},
 {st:"SOE 1 · Anatomy",q:"Describe the TAP block.",a:["Abdominal wall nerves.","The TAP and its approaches.","Coverage and limitations (no visceral).","Volumes and LA doses.","Complications."],fu:"Which approach would you use for an upper midline incision?"},
 {st:"SOE 1 · Anatomy",q:"Describe the radial nerve.",a:["Roots and cord.","Course with relations.","Motor and sensory supply.","Injury at different levels.","Blocks and regeneration."],fu:"How quickly will the nerve regenerate?"},
 {st:"SOE 1 · Anatomy",q:"Cranial nerves: tell me about the vagus nerve.",a:["Nuclei.","Course in neck and thorax.","Branches.","Functions.","Anaesthetic relevance (reflexes, RLN, vagal responses)."],fu:"Describe the relations of the right vagus at T4."},
 {st:"SOE 3 · Anaesthesia",q:"Two days after an epidural for labour, a woman complains of numbness in her legs. How do you manage this?",a:["History and examination.","Distribution: central vs peripheral.","Red flags and urgent MRI.","Common obstetric palsies.","Follow-up, documentation, communication."],fu:"What is the incidence of epidural haematoma in obstetrics?"},
];

const QUIZ=[
 ["Larynx",[["The posterior cricoarytenoid abducts the cords",1,""],["Cricothyroid is supplied by the RLN",0,"External laryngeal."],["The internal laryngeal nerve pierces the thyrohyoid membrane",1,""],["Glossopharyngeal supplies the vallecula",1,""],["The left RLN loops under the subclavian artery",0,"Aortic arch."]]],
 ["Trachea and bronchi",[["The trachea begins at C6",1,""],["The carina is at T4/5",1,""],["The left main bronchus is shorter",0,"Longer (~5 cm)."],["The right upper lobe bronchus arises close to the carina",1,""],["There are 10 right bronchopulmonary segments",1,""]]],
 ["Central venous access",[["The IJV lies lateral to the carotid",1,""],["Subclavian lines have the highest pneumothorax risk",1,""],["The subclavian artery lies anterior to scalenus anterior",0,"Behind it; vein is in front."],["NICE recommends ultrasound for IJV",1,""],["Thoracic duct injury occurs on the right",0,"Left."]]],
 ["Vertebral column",[["Tuffier's line crosses L4–L5",1,""],["The conus ends at L3 in adults",0,"L1–2 (L3 at birth)."],["The dural sac ends at S2 in adults",1,""],["Ligamentum flavum is thickest in the lumbar region",1,""],["The anterior spinal artery supplies the posterior columns",0,"Anterior two-thirds."]]],
 ["Epidural space",[["Its posterior boundary is the ligamentum flavum",1,""],["It ends inferiorly at the sacrococcygeal membrane",1,""],["It contains CSF",0,""],["The venous plexus is mainly anterolateral",1,""],["Lumbar depth is usually 4–6 cm in adults",1,""]]],
 ["Spinal anaesthesia",[["Baricity is a major determinant of spread",1,""],["Pregnancy reduces CSF volume and increases spread",1,""],["Bradycardia relates to T1–4 block",1,""],["Pencil-point needles increase PDPH",0,"Reduce."],["Volume is more important than dose",0,"Dose more important."]]],
 ["Caudal block",[["The hiatus results from failed fusion of S5",1,""],["1 mL/kg reaches the lower thoracic level",1,""],["Clonidine is safe in ex-premature neonates",0,"Apnoea risk."],["The dural sac ends higher in infants",0,"Lower (S3–4)."],["T-wave peaking suggests intravascular injection",1,""]]],
 ["Brachial plexus",[["Roots are C5–T1",1,""],["The lateral cord gives the ulnar nerve",0,"Medial cord."],["Interscalene blocks the phrenic nerve almost always",1,""],["Axillary block often misses musculocutaneous",1,""],["Supraclavicular has no pneumothorax risk",0,""]]],
 ["Upper limb nerves",[["Radial injury at the spiral groove spares triceps",1,""],["Median nerve supplies adductor pollicis",0,"Ulnar."],["Musculocutaneous pierces coracobrachialis",1,""],["Axillary nerve supplies deltoid",1,""],["Ulnar nerve lies behind the medial epicondyle",1,""]]],
 ["Head and neck",[["The stellate ganglion lies anterior to C7",1,""],["Stellate block is done at C6",1,""],["Horner's indicates successful stellate block",1,""],["The greater occipital nerve comes from C2",1,""],["Superficial cervical plexus emerges at the anterior border of SCM",0,"Posterior border."]]],
 ["Eye",[["Retrobulbar blocks are intraconal",1,""],["Sub-Tenon's has the highest complication rate",0,"Lowest."],["Axial length > 26 mm increases perforation risk",1,""],["Oculocardiac efferent is the vagus",1,""],["Corneal reflex efferent is V",0,"VII."]]],
 ["Autonomic",[["Sympathetic outflow is T1–L2",1,""],["The coeliac plexus lies at L1",1,""],["Coeliac block causes constipation",0,"Diarrhoea."],["Parasympathetic sacral outflow is S2–4",1,""],["The greater splanchnic arises from T5–9",1,""]]],
 ["Trunk blocks",[["TAP lies between internal oblique and transversus",1,""],["TAP gives visceral analgesia",0,"Somatic only."],["Intercostal blocks have the highest absorption",1,""],["ESP is deep to erector spinae",1,""],["Rectus sheath block suits midline incisions",1,""]]],
 ["Lower limb",[["Femoral nerve is L2–4",1,""],["Sciatic exits above piriformis",0,"Below."],["Adductor canal block spares quadriceps",1,""],["Posterior tibial supplies the sole",1,""],["Saphenous is a branch of the sciatic",0,"Femoral."]]],
];

const CRISIS=[
 ["High or total spinal","etco2",["Recognise: rapidly rising block, hypotension, bradycardia, dyspnoea, weak hands (C6–8), difficulty speaking, apnoea, loss of consciousness.","Call for help; airway, 100% O2; intubate and ventilate if respiratory failure or unconscious (induction agent at reduced dose to prevent awareness).","Treat hypotension and bradycardia aggressively: fluids, vasopressors (phenylephrine, ephedrine, adrenaline), atropine; left uterine displacement in pregnancy.","Deliver the baby if obstetric and the mother does not stabilise (perimortem caesarean by 5 min if arrest).","Sedate and ventilate until the block regresses; reassure; document; debrief."],"Excess intrathecal spread (or epidural dose given intrathecally/subdurally) blocks cervical roots and sympathetic outflow."],
 ["Suspected epidural haematoma or abscess","ecg",["Red flags: new or increasing motor block, block > 4 h after stopping infusion, back pain, fever, bowel/bladder dysfunction.","Stop the epidural infusion; full neurological examination and documentation; check coagulation and antithrombotic timing.","Urgent MRI (same day, within hours).","Immediate neurosurgical referral: decompression within 8–12 h gives the best recovery.","Do not remove the catheter if anticoagulated without checking timings; inform the patient; incident report."],"Compression of the cord or cauda equina by blood or pus; recovery is time-dependent."],
 ["Retrobulbar haemorrhage or brainstem anaesthesia after eye block","abp",["Haemorrhage: proptosis, tense orbit, subconjunctival bleeding, closed lids, rising IOP: stop, digital pressure, measure IOP, urgent lateral canthotomy and cantholysis by the surgeon if vision threatened; postpone surgery.","Brainstem anaesthesia (minutes after block): confusion, dysarthria, contralateral amaurosis, apnoea, cardiovascular instability, seizures.","Support: airway, 100% O2, ventilate (may need intubation), vasopressors, atropine.","Usually resolves within 1–2 hours; reassure and monitor.","Document, inform, consider sub-Tenon's in future."],"LA spreads along the optic nerve sheath into the subarachnoid space around the brainstem."],
 ["Pneumothorax after a block (supraclavicular, paravertebral, intercostal)","spo2",["Symptoms: chest pain, cough, dyspnoea, falling SpO2 (may be delayed hours).","Examine; lung ultrasound (absent sliding, lung point) or CXR.","O2; small, stable: observe; large or symptomatic: aspiration or chest drain; tension: immediate decompression (4th–5th ICS mid-axillary).","If under positive pressure ventilation, drain early.","Document, inform, review technique (ultrasound visualisation of the pleura)."],"Needle breaches the pleural dome or parietal pleura."],
 ["Wrong-side block","nibp",["Prevention: 'Stop Before You Block': immediately before needle insertion, the anaesthetist and assistant confirm the surgical site mark and side.","If it happens: stop; assess the patient; inform them and the surgeon; consider whether the correct side can be safely blocked (total LA dose).","Monitor for LAST and complications.","Duty of candour: explain and apologise; document.","Report as a never event / serious incident; learn (time lag between WHO sign-in and block, distractions, positional changes)."],"Human factors: delays, turning the patient, distractions and missing site marks."],
];

const SRC="";
const ERR="";
const REFS="";

const DIAG=`<div class="grid2">
 <div class="fig"><h3>Dermatomes and block height</h3>
  <div class="seg" id="dt-sel"></div>
  <div class="ctl"><label>Sensory block upper level <input type="range" id="dt-l" min="0" max="10" step="1" value="2"><output id="dt-l-o"></output></label></div>
  <div class="svgbox"><svg id="dt" viewBox="0 0 520 300" role="img" aria-label="Dermatomes"></svg></div>
  <div class="readout" id="dt-r"></div></div>
 <div class="fig"><h3>Midline needle path to the epidural and subarachnoid spaces</h3>
  <div class="ctl"><label>BMI <input type="range" id="np-b" min="18" max="55" step="1" value="28"><output id="np-b-o"></output></label>
   <label>Needle depth cm <input type="range" id="np-d" min="0" max="12" step="0.1" value="4.5"><output id="np-d-o"></output></label></div>
  <div class="svgbox"><svg id="np" viewBox="0 0 520 300" role="img" aria-label="Needle path"></svg></div>
  <div class="readout" id="np-r"></div></div>
 <div class="fig"><h3>Eye blocks: needle paths</h3>
  <div class="seg" id="ey-sel"></div>
  <div class="ctl"><label>Axial length mm <input type="range" id="ey-a" min="20" max="32" step="0.5" value="23.5"><output id="ey-a-o"></output></label></div>
  <div class="svgbox"><svg id="ey" viewBox="0 0 520 300" role="img" aria-label="Eye block"></svg></div>
  <div class="readout" id="ey-r"></div></div>
 <div class="fig" style="grid-column:1/-1"><h3>Brachial plexus: what each block reaches</h3>
  <div class="seg" id="bp-sel"></div>
  <div class="svgbox"><svg id="bp" viewBox="0 0 640 300" role="img" aria-label="Brachial plexus"></svg></div>
  <div class="readout" id="bp-r"></div></div>
 <div class="fig" style="grid-column:1/-1"><h3>Lower limb block coverage</h3>
  <div class="seg" id="lb-sel"></div>
  <div class="svgbox"><svg id="lb" viewBox="0 0 820 300" role="img" aria-label="Lower limb coverage"></svg></div>
  <div class="readout" id="lb-r"></div></div>
</div>`;

function initDiagrams(){
 const out=(id,t)=>{const o=$("#"+id+"-o");if(o)o.textContent=t};
 const mk=svg=>(t,a,tx)=>{const e=document.createElementNS(SVGNS,t);for(const k in a)e.setAttribute(k,a[k]);if(tx!=null)e.textContent=tx;svg.append(e);return e};

 /* 1. Dermatomes */
 const ORDER=["C4","T1","T4","T6","T8","T10","T12","L1","L3","L5","S1"];
 let dtS="cs";
 function drawDT(){const li=+$("#dt-l").value;out("dt-l",ORDER[li]);const svg=$("#dt");svg.innerHTML="";const add=mk(svg);
  /* body silhouette */
  add("circle",{cx:130,cy:22,r:16,fill:"var(--panel)",stroke:"var(--muted)"});
  add("path",{d:"M100 40 L160 40 L172 160 L160 160 L150 290 L134 290 L130 175 L126 290 L110 290 L100 160 L88 160 Z",fill:"var(--panel)",stroke:"var(--muted)"});
  add("path",{d:"M100 44 L70 140 L80 142 L104 70 M160 44 L190 140 L180 142 L156 70",fill:"none",stroke:"var(--muted)","stroke-width":2});
  const lvl=DERM.find(d=>d[0]===ORDER[li]);const y=lvl[2];
  add("rect",{x:86,y:y,width:88,height:Math.max(0,176-y),fill:"var(--spo2)","fill-opacity":0.25});add("rect",{x:108,y:176,width:44,height:114,fill:"var(--spo2)","fill-opacity":0.25});
  DERM.forEach(([d,l,yy])=>{add("line",{x1:200,x2:230,y1:yy,y2:yy,stroke:"var(--line)"});add("text",{x:236,y:yy+4,class:"lbl","font-size":"11"},d+": "+l)});
  add("line",{x1:80,x2:200,y1:y,y2:y,stroke:"var(--abp)","stroke-width":2});
  const tgt=SURG[dtS][1];const ti=ORDER.indexOf(tgt);const ok=li<=ti;
  const effects=[];if(li<=3)effects.push("sympathectomy reaches cardioaccelerators if ≥ T4–T1: bradycardia risk");if(li<=1)effects.push("upper limb/intercostal involvement: dyspnoea, weak hands");if(li===0)effects.push("C4: approaching phrenic (C3–5): impending respiratory failure");if(li>=5)effects.push("lower sympathectomy: modest hypotension");
  $("#dt-r").innerHTML=`Block to <b>${ORDER[li]}</b> (${lvl[1]}). ${SURG[dtS][0]} needs <b>${tgt}</b>: ${ok?"<b>adequate</b>.":"<b>inadequate</b>: extend the block or supplement."} ${effects.join("; ")}.`}
 seg($("#dt-sel"),Object.entries(SURG).map(([k,v])=>[k,v[0]]),k=>{dtS=k;drawDT()},"cs");$("#dt-l").oninput=drawDT;

 /* 2. Brachial plexus */
 const NODES={C5:[40,40],C6:[40,90],C7:[40,140],C8:[40,190],T1:[40,240],up:[150,65],mid:[150,140],low:[150,215],ad:[250,90],pd:[250,165],lat:[350,70],post:[350,150],med:[350,230],mc:[480,40],md:[480,110],ul:[480,250],ax:[480,170],rad:[480,200],ssc:[230,25],phr:[110,20]};
 const LBL={C5:"C5",C6:"C6",C7:"C7",C8:"C8",T1:"T1",up:"Upper trunk",mid:"Middle trunk",low:"Lower trunk",ad:"Anterior divisions",pd:"Posterior divisions",lat:"Lateral cord",post:"Posterior cord",med:"Medial cord",mc:"Musculocutaneous",md:"Median",ul:"Ulnar",ax:"Axillary",rad:"Radial",ssc:"Suprascapular",phr:"Phrenic (C3–5)"};
 const EDG=[["C5","up"],["C6","up"],["C7","mid"],["C8","low"],["T1","low"],["up","ad"],["up","pd"],["mid","ad"],["mid","pd"],["low","ad"],["low","pd"],["ad","lat"],["ad","med"],["pd","post"],["lat","mc"],["lat","md"],["med","md"],["med","ul"],["post","ax"],["post","rad"],["up","ssc"]];
 function drawBP(k){const svg=$("#bp");svg.innerHTML="";const add=mk(svg);const [nm,on,cov,miss,se]=BP[k];const isOn=n=>on.includes(n);
  add("line",{x1:110,x2:40,y1:20,y2:40,stroke:"var(--muted)","stroke-dasharray":"3 3"});
  EDG.forEach(([a,b])=>{const A=NODES[a],B=NODES[b];const hot=isOn(a)&&isOn(b);add("line",{x1:A[0],y1:A[1],x2:B[0],y2:B[1],stroke:hot?"var(--abp)":"var(--line)","stroke-width":hot?4:2})});
  Object.entries(NODES).forEach(([n,[x,y]])=>{const hot=isOn(n);add("circle",{cx:x,cy:y,r:6,fill:hot?"var(--abp)":"var(--panel)",stroke:"var(--muted)"});add("text",{x:x+(x>400?10:-4),y:y+(x>400?4:-10),"text-anchor":x>400?"start":"middle",class:"lbl","font-size":"10"},LBL[n])});
  add("text",{x:40,y:290,class:"lbl","font-size":"10"},"Roots");add("text",{x:150,y:290,"text-anchor":"middle",class:"lbl","font-size":"10"},"Trunks");add("text",{x:250,y:290,"text-anchor":"middle",class:"lbl","font-size":"10"},"Divisions");add("text",{x:350,y:290,"text-anchor":"middle",class:"lbl","font-size":"10"},"Cords");add("text",{x:480,y:290,class:"lbl","font-size":"10"},"Terminal nerves");
  $("#bp-r").innerHTML=`<b>${nm}</b>. Covers: ${cov}. Misses: ${miss}. Side effects: ${se}.`}
 seg($("#bp-sel"),Object.entries(BP).map(([k,v])=>[k,v[0]]),drawBP,"is");

 /* 3. Needle path */
 function drawNP(){const b=+$("#np-b").value,d=+$("#np-d").value;out("np-b",b);out("np-d",d.toFixed(1));const fat=Math.max(0.5,(b-18)*0.12+0.8);
  const lay=LAY.map(l=>l.slice());lay[1][1]=fat;let acc=0;const bounds=lay.map(l=>{const s=acc;acc+=l[1];return [l[0],s,acc,l[2]]});
  const svg=$("#np");svg.innerHTML="";const add=mk(svg);const sc=280/Math.max(12,acc);
  let ly=-99;bounds.forEach(([n,s,e,c],i)=>{add("rect",{x:150,y:10+s*sc,width:220,height:Math.max(1,(e-s)*sc),fill:c,"fill-opacity":0.3,stroke:"var(--line)"});let y=10+(s+e)/2*sc+4;if(y<ly+12)y=ly+12;ly=y;add("line",{x1:370,x2:378,y1:10+(s+e)/2*sc,y2:y-4,stroke:"var(--line)"});add("text",{x:380,y:y,class:"lbl","font-size":"10"},n+" ("+(e-s).toFixed(1)+" cm)")});
  add("line",{x1:260,x2:260,y1:0,y2:10+Math.min(d,acc)*sc,stroke:"var(--ink)","stroke-width":2});add("polygon",{points:`255,${10+Math.min(d,acc)*sc} 265,${10+Math.min(d,acc)*sc} 260,${18+Math.min(d,acc)*sc}`,fill:"var(--ink)"});
  for(let cm=0;cm<=12;cm+=2){add("text",{x:140,y:14+cm*sc,"text-anchor":"end",class:"lbl","font-size":"10"},cm+" cm")}
  const cur=bounds.find(([n,s,e])=>d>=s&&d<e)||bounds[bounds.length-1];const epi=bounds[5];
  const feel={"Skin":"skin resistance","Subcutaneous fat":"little resistance","Supraspinous lig.":"firm","Interspinous lig.":"firm, spongy","Ligamentum flavum":"gritty, high resistance: loss of resistance about to occur","Epidural space":"<b>loss of resistance</b>: stop here for an epidural","Dura + arachnoid":"dural 'click' (pencil-point)","Subarachnoid (CSF)":"<b>CSF flows</b>: spinal position (accidental dural puncture with a Tuohy)"}[cur[0]];
  $("#np-r").innerHTML=`BMI ${b}: subcutaneous fat ~${fat.toFixed(1)} cm, epidural space at <b>${epi[1].toFixed(1)}–${epi[2].toFixed(1)} cm</b>. Needle tip at ${d.toFixed(1)} cm is in the <b>${cur[0]}</b>: ${feel}. Schematic lumbar midline (L3/4) thicknesses.`}
 ["#np-b","#np-d"].forEach(x=>$(x).oninput=drawNP);drawNP();

 /* 4. Eye */
 let eyK="st";
 function drawEY(){const al=+$("#ey-a").value;out("ey-a",al);const svg=$("#ey");svg.innerHTML="";const add=mk(svg);const s=6;const cx=140,cy=150,r=al*s/2;
  add("path",{d:`M40 40 L460 140 L460 160 L40 260`,fill:"none",stroke:"var(--muted)","stroke-width":2});add("text",{x:420,y:130,class:"lbl","font-size":"10"},"orbital apex");
  add("circle",{cx:cx,cy:cy,r:r,fill:"var(--panel)",stroke:"var(--ink)","stroke-width":1.5});add("text",{x:cx-r+6,y:cy+4,class:"lbl","font-size":"10"},"cornea");
  add("path",{d:`M${cx+r} ${cy} L450 ${cy}`,stroke:"var(--nibp)","stroke-width":6});add("text",{x:300,y:cy-8,class:"lbl","font-size":"10"},"optic nerve (in dural sheath)");
  add("path",{d:`M${cx+r*0.7} ${cy-r*0.7} L450 ${cy-6} M${cx+r*0.7} ${cy+r*0.7} L450 ${cy+6}`,stroke:"var(--abp)","stroke-width":3,fill:"none"});add("text",{x:290,y:cy-48,class:"lbl","font-size":"10",fill:"var(--abp)"},"recti forming the muscle cone");
  add("path",{d:`M${cx} ${cy-r-4} A ${r+4} ${r+4} 0 0 1 ${cx} ${cy+r+4}`,fill:"none",stroke:"var(--spo2)","stroke-dasharray":"4 3"});add("text",{x:cx+10,y:cy+r+18,class:"lbl","font-size":"10",fill:"var(--spo2)"},"Tenon's capsule");
  let path;if(eyK==="st")path=`M${cx-10} ${cy+r+30} Q ${cx+r*0.6} ${cy+r+12} ${cx+r*0.95} ${cy+r*0.45}`;else if(eyK==="peri")path=`M${cx-20} ${cy+r+40} L ${cx+r+40} ${cy+r+12}`;else path=`M${cx-20} ${cy+r+40} L ${cx+r+70} ${cy+10}`;
  add("path",{d:path,fill:"none",stroke:"var(--ink)","stroke-width":2.5});
  const risk=al>26?"<b>High perforation risk</b> (long myopic eye): prefer sub-Tenon's or topical; avoid sharp-needle blocks.":al<21?"Short (hypermetropic) eye: crowded orbit, take care.":"Normal axial length (~23–24 mm).";
  $("#ey-r").innerHTML=`<b>${EYEB[eyK][0]}.</b> ${EYEB[eyK][1]} ${risk}`}
 seg($("#ey-sel"),Object.entries(EYEB).map(([k,v])=>[k,v[0]]),k=>{eyK=k;drawEY()},"st");$("#ey-a").oninput=drawEY;

 /* 5. Lower limb coverage matrix */
 function drawLB(k){const svg=$("#lb");svg.innerHTML="";const add=mk(svg);const keys=Object.keys(LB);const cw=66,x0=220,y0=70,rh=30;
  LB_REG.forEach((r,j)=>{const x=x0+j*cw+cw/2;add("text",{x:x,y:y0-8,"text-anchor":"start",class:"lbl","font-size":"9",transform:`rotate(-35 ${x} ${y0-8})`},r)});
  keys.forEach((b,i)=>{const y=y0+i*rh;const on=b===k;add("text",{x:x0-8,y:y+rh/2+4,"text-anchor":"end",class:"lbl","font-size":"11","font-weight":on?"700":"400"},LB[b][0]);
   LB[b][1].forEach((v,j)=>{add("rect",{x:x0+j*cw+3,y:y+3,width:cw-6,height:rh-6,rx:4,fill:v===2?"var(--nibp)":v===1?"var(--nibp)":"var(--panel)","fill-opacity":v===2?(on?0.95:0.5):v===1?(on?0.45:0.2):1,stroke:on?"var(--ink)":"var(--line)"})})});
  const cov=LB[k][1].map((v,j)=>v===2?LB_REG[j]:v===1?LB_REG[j]+" (partial)":null).filter(Boolean);
  const notes={fem:"Quadriceps weakness (falls risk); misses obturator and posterior capsule.",fic:"Supra-inguinal approach spreads to femoral and lateral cutaneous nerves; obturator inconsistent. First-line for hip fracture on admission.",peng:"Motor-sparing hip analgesia targeting articular branches; often combined with LFCN block for incisional pain.",acb:"Quadriceps-sparing knee analgesia (saphenous and nerve to vastus medialis); add iPACK for posterior knee.",ipack:"Posterior knee capsule analgesia without foot drop.",pop:"Foot and ankle surgery; add saphenous block for the medial ankle.",ank:"Forefoot surgery; five nerves; no motor block of the leg."}[k];
  $("#lb-r").innerHTML=`<b>${LB[k][0]}</b>: ${cov.join(", ")}. ${notes}`}
 seg($("#lb-sel"),Object.entries(LB).map(([k,v])=>[k,v[0]]),drawLB,"fic");
}

ATLAS.register({id:"12",name:"Clinical anatomy & regional",
  lede:"Airway and larynx, trachea, neck vessels, vertebral column and neuraxial blocks, caudal, brachial plexus and upper limb, head and neck blocks, eye, truncal and lower limb blocks, autonomic and cranial nerves, ultrasound principles and nerve injury.",
  barsNote:"",
  bars:BARS,fam:FAM,slides:SLIDES,calcs:CALCS,tables:TABLES,cards:CARDS,fcf:FCF,viva:VIVA,quiz:QUIZ,crisis:CRISIS,
  sources:SRC,errata:ERR,refs:REFS,diagHTML:DIAG,initDiagrams,
  diagLede:"Five interactive anatomy maps: dermatomes and block height by operation, the brachial plexus by block approach, a midline needle path by BMI, eye block needle paths by axial length and a lower limb block coverage matrix."});
})();
