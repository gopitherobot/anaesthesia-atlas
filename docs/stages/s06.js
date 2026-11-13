/* Stage 06 · Haematology & immunology */
(function(){
const {plot,range,el,SVGNS,fmt,$,$$,seg}=ATLAS.h;

const BARS=[];

const FAM={coag:["abp","Coagulation"],tx:["nibp","Transfusion"],drug:["etco2","Anticoagulants"],red:["spo2","Red cells"],imm:["ecg","Immunology"]};

const SLIDES=[
{f:"coag",t:"Haemostasis: platelets and the vessel wall",b:`<ul class="clean"><li><b>Vascular phase</b>: immediate reflex and endothelin-mediated vasoconstriction.</li>
<li><b>Platelets</b>: 150–400 × 10⁹/L, life 7–10 days, one third pooled in the spleen; made from megakaryocytes under thrombopoietin (from the liver).</li>
<li><b>Adhesion</b>: exposed collagen binds GPVI and, at high shear, von Willebrand factor bridges collagen to GPIb–IX–V.</li>
<li><b>Activation</b>: shape change, granule release (dense granules: ADP, serotonin, Ca²⁺; α-granules: fibrinogen, vWF, factor V, PF4), thromboxane A2 synthesis (COX-1), phosphatidylserine exposed on the surface as the stage for coagulation.</li>
<li><b>Aggregation</b>: ADP (P2Y12), TXA2 and thrombin (PAR-1) convert GPIIb/IIIa to its high-affinity form, which binds fibrinogen and links platelets.</li>
<li><b>Endothelium normally prevents clotting</b>: prostacyclin, NO, ADPase (CD39), thrombomodulin (turns thrombin into a protein C activator), heparan sulphate (antithrombin cofactor), tPA, glycocalyx.</li></ul>`,
p:"Drug targets map onto this sequence: aspirin (COX-1, irreversible for the platelet's life), clopidogrel/prasugrel/ticagrelor (P2Y12), GPIIb/IIIa antagonists (tirofiban, abciximab), vorapaxar (PAR-1), dipyridamole (phosphodiesterase, adenosine uptake).",
v:"Primary haemostasis first: vessel, adhesion (receptor + ligand), activation (mediators), aggregation (GPIIb/IIIa), then how normal endothelium keeps blood fluid."},
{f:"coag",t:"Coagulation: the cell-based model",b:`<p>The classical cascade (intrinsic XII → XI → IX → X; extrinsic TF–VIIa → X; common X → II → fibrin) explains laboratory tests. In vivo coagulation follows the <b>cell-based model</b>:</p>
<ol class="clean" style="padding-left:1.3em"><li><b>Initiation</b> on tissue factor-bearing cells: TF–VIIa activates X (and IX); Xa with Va makes a little thrombin. Rapidly limited by TFPI.</li>
<li><b>Amplification</b> on platelets: the small amount of thrombin activates platelets and factors V, VIII and XI.</li>
<li><b>Propagation</b> on the activated platelet surface: tenase (IXa–VIIIa) makes Xa; prothrombinase (Xa–Va) produces a thrombin burst (~1000-fold) that converts fibrinogen to fibrin.</li>
<li><b>Stabilisation</b>: thrombin activates XIII (cross-links fibrin) and TAFI (slows lysis).</li></ol>
<ul class="clean"><li>Ca²⁺ (factor IV) is needed at most steps; vitamin K γ-carboxylates II, VII, IX, X and proteins C and S so they bind Ca²⁺ and phospholipid.</li>
<li><b>Natural anticoagulants</b>: antithrombin (inhibits thrombin and Xa mainly, also IXa, XIa; accelerated ~1000× by heparin), protein C (activated by thrombin–thrombomodulin, cleaves Va and VIIIa) with cofactor protein S, TFPI.</li>
<li><b>Fibrinolysis</b>: tPA (endothelium) and urokinase convert plasminogen to plasmin on fibrin; plasmin produces fibrin degradation products and D-dimers (cross-linked fibrin only). Inhibited by PAI-1, α2-antiplasmin, TAFI; tranexamic acid blocks lysine binding sites on plasminogen.</li></ul>`,
p:"Factor VII has the shortest half-life (~6 h), so warfarin and liver failure prolong the PT first. Factor VIII is made largely by endothelium and is often normal or high in liver disease.",
v:"Draw the classical cascade for the tests, then explain the four cell-based phases on TF-bearing cells and platelets, then the control mechanisms and fibrinolysis. Diagrams tab: cascade with drug overlays."},
{f:"coag",t:"Testing coagulation",b:`<div class="tbl"><table><tr><th>Test</th><th>Measures</th><th>Prolonged by</th></tr>
<tr><td>PT / INR (11–14 s)</td><td>Extrinsic + common: VII, X, V, II, fibrinogen</td><td>Warfarin, vitamin K deficiency, liver disease, DIC, high-dose DOAC (variable)</td></tr>
<tr><td>APTT (25–35 s)</td><td>Intrinsic + common: XII, XI, IX, VIII, X, V, II, fibrinogen</td><td>Heparin, haemophilia A/B, vWD (low VIII), lupus anticoagulant (paradoxically prothrombotic), DIC, dabigatran</td></tr>
<tr><td>Thrombin time</td><td>Fibrinogen → fibrin</td><td>Heparin, dabigatran (very sensitive), low or abnormal fibrinogen</td></tr>
<tr><td>Fibrinogen (Clauss) 2–4 g/L</td><td>Functional fibrinogen</td><td>Falls first in haemorrhage and dilution; pregnancy raises it to 4–6</td></tr>
<tr><td>Anti-Xa assay</td><td>LMWH, UFH, fondaparinux, Xa-inhibitor levels</td><td>Drug-specific calibration needed</td></tr>
<tr><td>Activated clotting time (100–150 s)</td><td>Whole-blood intrinsic</td><td>Heparin in cardiac/vascular surgery (CPB target &gt; 400–480 s)</td></tr>
<tr><td>Platelet count and function (PFA-100, aggregometry, Multiplate)</td><td>Number and function</td><td>Antiplatelet drugs, uraemia, vWD, CPB</td></tr>
<tr><td>Viscoelastic tests (TEG, ROTEM)</td><td>Whole-blood clot initiation, strength, lysis</td><td>See the TEG/ROTEM slide</td></tr></table></div>
<p>Standard tests use citrated platelet-poor plasma at 37 °C, so they miss platelet function, hypothermia, acidosis and fibrinolysis, and take 30–60 min.</p>`,
p:"Mixing study: if the prolonged APTT corrects with normal plasma, a factor is deficient; if not, an inhibitor (lupus anticoagulant, acquired factor VIII inhibitor, heparin) is present.",
v:"For each test give principle, what it measures, normal value and causes of prolongation. Then the limits of lab tests and why viscoelastic tests help in theatre."},
{f:"coag",t:"TEG and ROTEM",b:`<p>Whole blood in a cup with a pin; one oscillates and the developing clot transmits torque. The trace is clot amplitude against time.</p>
<div class="tbl"><table><tr><th>TEG</th><th>ROTEM</th><th>Meaning</th><th>Abnormal → treat</th></tr>
<tr><td>R (4–8 min, kaolin)</td><td>CT (EXTEM 38–79 s; INTEM 100–240 s)</td><td>Time to start clotting: factors, heparin</td><td>Prolonged → FFP or PCC (protamine if heparin: INTEM vs HEPTEM)</td></tr>
<tr><td>K (1–4 min), α angle (47–74°)</td><td>CFT, α</td><td>Speed of clot build-up: fibrinogen, platelets</td><td>Slow → fibrinogen ± platelets</td></tr>
<tr><td>MA (55–73 mm)</td><td>MCF (EXTEM 50–72 mm); A5/A10</td><td>Maximum clot strength: platelets (~80%) and fibrinogen (~20%)</td><td>Low MA/A5 with normal FIBTEM → platelets</td></tr>
<tr><td>Functional fibrinogen</td><td>FIBTEM (cytochalasin blocks platelets) A5/A10 &lt; 8–10 mm or MCF &lt; 9–10</td><td>Fibrinogen contribution</td><td>Fibrinogen concentrate or cryoprecipitate</td></tr>
<tr><td>LY30 (&lt; 8%)</td><td>ML (&lt; 15% at 60 min); APTEM corrects with aprotinin/TXA</td><td>Fibrinolysis</td><td>Tranexamic acid</td></tr></table></div>
<ul class="clean"><li>Advantages: point of care, results in 10–20 min (A5/A10 early values), detects hyperfibrinolysis and hypercoagulability, guides targeted therapy and reduces transfusion.</li>
<li>Limits: insensitive to aspirin and P2Y12 inhibitors (standard tests), to vWD and to warfarin/DOAC levels; performed at 37 °C unless corrected.</li></ul>`,
p:"EDAIC repeatedly shows TEG or ROTEM images (e.g. 'TEG in a hepatic patient with HCC bleeding'). Read in order: start time, build-up, strength, lysis, and give the specific product for each defect. Practise on the Diagrams tab.",
v:"Principle (TEG vs ROTEM mechanism), draw the normal trace with labels, then four abnormal patterns and the treatment of each."},
{f:"coag",t:"Bleeding disorders and DIC",b:`<ul class="clean"><li><b>Haemophilia A</b> (factor VIII) and <b>B</b> (IX): X-linked recessive; joint and muscle bleeds; APTT prolonged. Perioperative factor replacement to 80–100% with a haematologist; desmopressin raises VIII in mild haemophilia A; avoid IM injections and NSAIDs; neuraxial only if levels corrected.</li>
<li><b>von Willebrand disease</b> (commonest inherited, ~1%): type 1 (partial quantitative), type 2 (qualitative subtypes; desmopressin can worsen 2B), type 3 (absent). Mucosal bleeding. Desmopressin 0.3 µg/kg (releases vWF and VIII, peak 30–60 min, tachyphylaxis, hyponatraemia), vWF-containing concentrates, tranexamic acid.</li>
<li><b>DIC</b>: systemic activation of coagulation (sepsis, trauma, amniotic fluid embolism, abruption, malignancy, transfusion reactions) → microvascular thrombosis and consumption of platelets and factors → bleeding. Low platelets, prolonged PT, low fibrinogen, high D-dimer (ISTH score ≥ 5 overt). Treat the cause; replace products only if bleeding or for procedures (platelets &gt; 50, fibrinogen &gt; 1.5, FFP for PT &gt; 1.5×).</li>
<li><b>Thrombocytopenia</b>: reduced production (marrow), increased destruction (ITP, HIT, TTP, HELLP, DIC), sequestration (hypersplenism), dilution. TTP (ADAMTS13 deficiency): avoid platelet transfusion; plasma exchange.</li>
<li><b>Acquired</b>: liver disease (rebalanced), uraemia (platelet dysfunction: desmopressin, dialysis, Hb &gt; 100), CPB, hypothermia and acidosis (enzymes slow ~10% per °C below 37).</li></ul>`,
p:"Trauma-induced coagulopathy is present in ~25% of major trauma on arrival, before dilution: activated protein C, hyperfibrinolysis and fibrinogen depletion. Early tranexamic acid (within 3 h) and fibrinogen target it.",
v:"Classify: inherited (haemophilias, vWD) vs acquired (consumption, dilution, drugs, organ failure, temperature). For each: mechanism, tests, perioperative plan."},
{f:"coag",t:"Thrombosis, VTE and HIT",b:`<ul class="clean"><li><b>Virchow's triad</b>: stasis (immobility, pneumoperitoneum, tourniquet), endothelial injury (surgery), hypercoagulability (malignancy, pregnancy, oestrogens, thrombophilia, sepsis, the stress response).</li>
<li><b>Thrombophilias</b>: factor V Leiden (APC resistance, commonest), prothrombin G20210A, antithrombin, protein C and S deficiencies, antiphospholipid syndrome.</li>
<li><b>VTE prophylaxis</b> (NICE NG89): assess risk on admission; mechanical (anti-embolism stockings, intermittent pneumatic compression) plus LMWH unless contraindicated; extended prophylaxis after major cancer surgery and hip/knee replacement; early mobilisation.</li>
<li><b>Pulmonary embolism</b>: Wells score, CTPA, echo (RV dilatation, McConnell's sign); massive PE (shock) → thrombolysis (alteplase 100 mg over 2 h, or 50 mg bolus in arrest with 60–90 min CPR), surgical embolectomy or catheter-directed therapy.</li>
<li><b>HIT (type II)</b>: IgG against heparin–PF4 complexes activates platelets → thrombocytopenia (falls &gt; 50%, rarely &lt; 20) and <b>thrombosis</b> 5–10 days after starting heparin (sooner if exposed in the last 100 days). 4Ts score; anti-PF4 ELISA and functional assays. Stop all heparin (including flushes); start a non-heparin anticoagulant (argatroban, bivalirudin, fondaparinux, danaparoid, or a DOAC); no platelets unless bleeding; avoid warfarin until platelets recover.</li></ul>`,
p:"Lepirudin, mentioned in older texts, was withdrawn in 2012. Argatroban (hepatic clearance) suits renal failure; bivalirudin is used in cardiac surgery.",
v:"Virchow, risk assessment, prophylaxis, diagnosis and treatment of PE, then HIT: mechanism, timing, diagnosis, management."},
{f:"tx",t:"Blood groups and compatibility testing",b:`<ul class="clean"><li><b>ABO</b>: antigens on RBCs (A, B, AB, none in O) with naturally occurring IgM antibodies against the absent antigen (from early exposure to gut bacteria). UK: O ~44%, A ~42%, B ~10%, AB ~4%.</li>
<li><b>Rh</b>: D antigen most immunogenic (~85% RhD positive). Anti-D (IgG) only after exposure (transfusion, pregnancy); crosses the placenta → haemolytic disease of the fetus and newborn. Prevented by anti-D immunoglobulin (routine antenatal prophylaxis at 28 weeks and after sensitising events/delivery).</li>
<li>Other clinically important systems: Kell, Kidd (delayed haemolytic reactions), Duffy, MNS.</li>
<li><b>Group and screen</b>: forward group (cells + anti-A, anti-B, anti-D), reverse group (serum + A and B cells), antibody screen against reagent red cells covering common antigens. ~30–40 min. If screen negative, electronic issue is possible.</li>
<li><b>Crossmatch</b>: serological (patient serum + donor cells, ~45 min) when antibodies are present.</li>
<li><b>Emergency</b>: group O RhD-negative red cells (O RhD-positive acceptable for males and women beyond childbearing potential when stocks are low), then group-specific within ~15–20 min, then fully crossmatched.</li>
<li>Plasma compatibility is the reverse: AB plasma is the universal plasma donor (no antibodies); group A plasma with low titre anti-B is used for emergency release in many centres.</li></ul>`,
p:"Most ABO-incompatible transfusions are caused by identification errors at sampling or administration. Use positive patient identification at the bedside every time.",
v:"Antigens and antibodies in ABO and Rh, how G&S and crossmatch work, emergency options, and compatibility rules for red cells vs plasma."},
{f:"tx",t:"Blood components",b:`<div class="tbl"><table><tr><th>Component</th><th>Storage</th><th>Typical adult dose and effect</th></tr>
<tr><td>Red cells (SAGM, leucodepleted)</td><td>2–6 °C, up to 35 days</td><td>1 unit (~280 mL, Hct ~0.6) raises Hb ~10 g/L in 70 kg. Infuse within 4 h of leaving storage.</td></tr>
<tr><td>Platelets (pool of 4 donors or apheresis)</td><td>20–24 °C with agitation, 7 days</td><td>1 adult dose (~2.5–3 × 10¹¹) raises count by ~20–40 × 10⁹/L. Highest bacterial contamination risk (warm storage).</td></tr>
<tr><td>Fresh frozen plasma</td><td>≤ −25 °C, 36 months; once thawed 24 h (up to 5 days at 4 °C for major haemorrhage)</td><td>12–15 mL/kg raises factors ~15–20%; ABO compatible.</td></tr>
<tr><td>Cryoprecipitate (pools of 5)</td><td>≤ −25 °C; use within 4 h of thawing</td><td>2 pools (~10 units) raise fibrinogen ~1 g/L; also contains VIII, vWF, XIII.</td></tr>
<tr><td>Fibrinogen concentrate</td><td>Room temperature, lyophilised</td><td>Dose (g) ≈ Δfibrinogen (g/L) × plasma volume (L); 3–4 g common.</td></tr>
<tr><td>Prothrombin complex concentrate (4-factor)</td><td>Lyophilised</td><td>II, VII, IX, X (+ C, S); 25–50 IU/kg for warfarin reversal with IV vitamin K 5–10 mg.</td></tr>
<tr><td>Albumin, IVIg, anti-D</td><td>Fractionated plasma products</td><td>No ABO matching needed</td></tr></table></div>
<p><b>Storage lesion</b> of red cells: K⁺ rises (up to ~40–50 mmol/L of supernatant by expiry), 2,3-DPG falls (left shift; recovers over 24–72 h after transfusion), ATP falls, pH falls, haemolysis, microparticles; citrate anticoagulant chelates Ca²⁺. Irradiated cells (to prevent TA-GvHD) leak K⁺ faster.</p>`,
p:"Irradiated products for: Hodgkin's lymphoma, purine analogue chemotherapy, stem cell transplant, congenital T-cell immunodeficiency, intrauterine and neonatal exchange transfusion, and HLA-matched or directed donations from relatives.",
v:"For each component: preparation, storage temperature and shelf life, dose and expected increment, indications, special requirements (CMV-negative, irradiated)."},
{f:"tx",t:"Transfusion triggers, patient blood management and cell salvage",b:`<ul class="clean"><li><b>Red cells (NICE NG24)</b>: restrictive threshold Hb 70 g/L (target 70–90) for most; 80 g/L (target 80–100) with acute coronary syndrome (the 2023 MINT trial suggested a more liberal strategy may help in acute MI). Transfuse single units and reassess. Chronic transfusion-dependent anaemia: individualised.</li>
<li><b>Platelets</b>: &lt; 10 (prophylactic), &lt; 50 before most surgery, &lt; 100 for neurosurgery or posterior eye surgery; ≥ 75–80 for neuraxial block (individualise; obstetric spinal often acceptable above 70–75 if stable).</li>
<li><b>FFP</b>: bleeding with PT/APTT &gt; 1.5× normal; not for warfarin reversal (use PCC).</li>
<li><b>Patient blood management</b> (three pillars): optimise red cell mass (detect and treat anaemia: preoperative Hb &lt; 130 g/L in both sexes is significant; IV iron 2–4 weeks before surgery), minimise blood loss (stop antithrombotics appropriately, surgical technique, tranexamic acid for expected loss &gt; 500 mL, cell salvage, point-of-care testing, normothermia), optimise tolerance of anaemia (restrictive thresholds, maximise DO2).</li>
<li><b>Intraoperative cell salvage</b>: suction with heparin or citrate → reservoir → centrifuged, washed with saline → red cells (Hct 0.5–0.7) reinfused through a filter (leucocyte depletion filter in malignancy and obstetrics). Indicated with expected loss &gt; 500 mL or &gt; 10% blood volume, rare antibodies, patient refusal of allogeneic blood. Returned blood lacks platelets and factors; risk of reinfused contaminants (bowel, amniotic fluid, tumour cells; mitigated with filters).</li></ul>`,
p:"Jehovah's Witnesses: respect an informed adult refusal (advance decision); discuss acceptable products individually (fractions such as albumin, PCC, fibrinogen, cryoprecipitate are personal choices; cell salvage in continuous circuit often accepted). Children: seek a court order if transfusion is life-saving and parents refuse.",
v:"Triggers by component with numbers, then the three PBM pillars, then cell salvage technique, indications and limits."},
{f:"tx",t:"Transfusion reactions and complications",b:`<div class="tbl"><table><tr><th>Reaction</th><th>Timing</th><th>Mechanism and features</th></tr>
<tr><td>Acute haemolytic (ABO incompatibility)</td><td>Minutes</td><td>Recipient IgM + complement lyse donor cells: fever, loin pain, hypotension, haemoglobinuria, DIC, AKI. Under GA: unexplained hypotension, bleeding, dark urine.</td></tr>
<tr><td>Anaphylaxis</td><td>Minutes</td><td>IgE or anti-IgA (IgA-deficient recipients): bronchospasm, hypotension, angioedema.</td></tr>
<tr><td>Febrile non-haemolytic</td><td>During or within 4 h</td><td>Cytokines or recipient anti-leucocyte antibodies; less common since leucodepletion.</td></tr>
<tr><td>Allergic (urticarial)</td><td>During</td><td>Donor plasma proteins; antihistamine, slow rate.</td></tr>
<tr><td>TRALI</td><td>Within 6 h</td><td>Donor anti-HLA/HNA antibodies activate recipient neutrophils in the lung: non-cardiogenic pulmonary oedema, hypoxia, fever, hypotension; often with plasma-rich products. Supportive care; resolves in 48–96 h.</td></tr>
<tr><td>TACO</td><td>Within 12 h</td><td>Circulatory overload: hypertension, raised JVP, pulmonary oedema, positive balance; elderly, small, heart or renal failure. Leading cause of transfusion-related death reported to SHOT. Diuretic, slow rate.</td></tr>
<tr><td>Delayed haemolytic</td><td>3–14 days</td><td>Anamnestic response (Kidd, Rh, Kell): falling Hb, jaundice, positive DAT.</td></tr>
<tr><td>Post-transfusion purpura</td><td>5–12 days</td><td>Anti-HPA-1a: severe thrombocytopenia; IVIg.</td></tr>
<tr><td>TA-GvHD</td><td>1–2 weeks</td><td>Donor lymphocytes engraft: almost always fatal; prevented by irradiation.</td></tr>
<tr><td>Infection</td><td>Days–years</td><td>Bacterial (platelets), viral (HBV ~1 in 1.3 million, HCV and HIV &lt; 1 in 10 million in UK), vCJD (theoretical), malaria.</td></tr>
<tr><td>Massive transfusion</td><td>During</td><td>Hypothermia, hypocalcaemia (citrate), hyperkalaemia, acidosis then alkalosis, dilutional coagulopathy, TRIM (immunomodulation).</td></tr></table></div>`,
p:"TRALI vs TACO: TRALI has normal or low BP, normal JVP and no response to diuretics; TACO has hypertension, high JVP, raised BNP and responds to diuretics.",
v:"Classify by timing and mechanism (immunological, infective, metabolic, volume), then what you do when you suspect a reaction (stop, check, support, report to SHOT/haematology)."},
{f:"tx",t:"Major haemorrhage and massive transfusion",b:`<ul class="clean"><li><b>Definitions</b>: one blood volume in 24 h; 50% in 3 h; &gt; 150 mL/min; &gt; 4 units in 1 h with ongoing loss (children: &gt; 40 mL/kg).</li>
<li><b>Dilutional coagulopathy</b>: fibrinogen reaches critical levels first (&lt; 1.0–1.5 g/L after ~1–1.5 blood volumes replaced with red cells and crystalloid), then factors, then platelets (&lt; 50 after ~2 blood volumes).</li>
<li><b>Haemostatic resuscitation</b>: early plasma and platelets with red cells (RBC:FFP 1:1 to 2:1 in trauma; PROPPR showed better early haemostasis with 1:1:1), limit crystalloid, permissive hypotension until control in penetrating trauma (not TBI), tranexamic acid 1 g within 3 h then 1 g over 8 h (CRASH-2), fibrinogen &gt; 1.5 g/L (&gt; 2 in obstetrics), platelets &gt; 75 during active bleeding, ionised Ca²⁺ &gt; 1.1, temperature &gt; 36 °C, pH &gt; 7.2.</li>
<li><b>Goal-directed</b> with ROTEM/TEG once available.</li>
<li>Damage control surgery and interventional radiology; cell salvage.</li></ul>`,
p:"The lethal triad (hypothermia, acidosis, coagulopathy) is now often called the 'lethal diamond' with hypocalcaemia as the fourth point.",
v:"Definition, pathophysiology of coagulopathy (dilution, consumption, trauma-induced, hypothermia, acidosis), protocol-driven then goal-directed management, complications."},
{f:"drug",t:"Anticoagulants and antiplatelets",b:`<div class="tbl"><table><tr><th>Drug</th><th>Mechanism</th><th>Monitoring</th><th>Reversal</th></tr>
<tr><td>Unfractionated heparin</td><td>Antithrombin cofactor: IIa = Xa (chains ≥ 18 saccharides needed for thrombin)</td><td>APTT, ACT, anti-Xa</td><td>Protamine 1 mg per 100 IU (max 50 mg)</td></tr>
<tr><td>LMWH (enoxaparin, dalteparin, tinzaparin)</td><td>Antithrombin: Xa ≫ IIa</td><td>Anti-Xa (renal failure, obesity, pregnancy)</td><td>Protamine partial (~60%)</td></tr>
<tr><td>Fondaparinux</td><td>Indirect Xa (pentasaccharide), t½ 17–21 h</td><td>Anti-Xa (specific)</td><td>None</td></tr>
<tr><td>Warfarin</td><td>Vitamin K epoxide reductase (VKORC1) → ↓ II, VII, IX, X, C, S</td><td>INR</td><td>Vitamin K 5–10 mg IV + PCC 25–50 IU/kg</td></tr>
<tr><td>Rivaroxaban, apixaban, edoxaban</td><td>Direct Xa inhibitors</td><td>Drug-specific anti-Xa</td><td>Andexanet alfa (apixaban, rivaroxaban); PCC if unavailable</td></tr>
<tr><td>Dabigatran</td><td>Direct thrombin inhibitor (~80% renal)</td><td>Dilute TT, ECT</td><td>Idarucizumab 5 g; dialysable</td></tr>
<tr><td>Argatroban, bivalirudin</td><td>Parenteral direct thrombin inhibitors</td><td>APTT / ACT</td><td>None (short t½)</td></tr>
<tr><td>Aspirin</td><td>Irreversible COX-1: ↓ TXA2</td><td>Platelet function tests</td><td>Platelet transfusion</td></tr>
<tr><td>Clopidogrel, prasugrel (prodrugs), ticagrelor (reversible)</td><td>P2Y12 (ADP) antagonists</td><td>Platelet function tests</td><td>Platelets (less effective for ticagrelor)</td></tr>
<tr><td>Alteplase, tenecteplase</td><td>Plasminogen activators</td><td>Fibrinogen</td><td>Tranexamic acid, cryoprecipitate</td></tr></table></div>
<p><b>Stopping before elective surgery</b> (EHRA 2021): Xa inhibitors ≥ 24 h (low bleeding risk) or ≥ 48 h (high risk) if CrCl ≥ 30; dabigatran 24/48 h at CrCl ≥ 80, 36/72 h at 50–79, 48/96 h at 30–49. Clopidogrel and ticagrelor 5 days, prasugrel 7 days. Bridging warfarin with LMWH only for very high thrombotic risk (recent VTE, mechanical mitral valve).</p>`,
p:"Never stop dual antiplatelet therapy early after a coronary stent without cardiology input: stent thrombosis has ~40% mortality. Defer elective surgery for 6 months after a drug-eluting stent where possible.",
v:"Classify by target (platelets, vitamin K factors, antithrombin-dependent, direct Xa, direct thrombin, fibrinolytic), then monitoring, reversal, perioperative management."},
{f:"drug",t:"Neuraxial and deep blocks with antithrombotic drugs",b:`<p>Spinal/epidural haematoma is rare (~1 in 150 000 epidurals; higher in elderly women, osteoporosis, traumatic or multiple attempts, catheter removal, renal impairment). Times below follow the ESAIC/ESRA 2022 and ASRA 2018 guidelines; check your local policy, which may differ.</p>
<div class="tbl"><table><tr><th>Drug</th><th>Stop before block / catheter removal</th><th>Restart after block / removal</th></tr>
<tr><td>UFH SC prophylaxis</td><td>4–6 h</td><td>1 h</td></tr>
<tr><td>UFH IV (therapeutic)</td><td>4–6 h and normal APTT</td><td>1 h</td></tr>
<tr><td>LMWH prophylactic</td><td>12 h</td><td>4 h (ESAIC/RA-UK); first dose ≥ 12 h after puncture (ASRA)</td></tr>
<tr><td>LMWH therapeutic</td><td>24 h</td><td>4 h after removal; 24 h after high-risk procedures (ASRA)</td></tr>
<tr><td>Fondaparinux (prophylactic)</td><td>36–42 h</td><td>6–12 h</td></tr>
<tr><td>Rivaroxaban / apixaban / edoxaban</td><td>Treatment dose 72 h (ASRA); shorter for prophylactic doses (~24–36 h, ESAIC)</td><td>6 h</td></tr>
<tr><td>Dabigatran</td><td>72–120 h depending on CrCl</td><td>6 h</td></tr>
<tr><td>Warfarin</td><td>INR ≤ 1.4 (UK) / normal</td><td>After catheter removal</td></tr>
<tr><td>Aspirin, NSAIDs alone</td><td>No need to stop</td><td>–</td></tr>
<tr><td>Clopidogrel / prasugrel / ticagrelor</td><td>5–7 / 7–10 / 5–7 days</td><td>6 h (after removal)</td></tr>
<tr><td>Thrombolytics</td><td>48 h (and normal tests)</td><td>10 days</td></tr></table></div>
<p>Monitor neurology after neuraxial block in anticoagulated patients; new leg weakness or numbness beyond expected needs MRI and decompression within ~8 h.</p>`,
p:"Deep plexus and paravertebral blocks follow neuraxial rules; superficial compressible blocks (e.g. femoral, axillary) can usually proceed on anticoagulation with care.",
v:"State the risk, the risk factors, then timings by drug class with the source guideline, then monitoring and what to do if a haematoma is suspected."},
{f:"red",t:"Anaemia and its physiology",b:`<ul class="clean"><li><b>WHO definition</b>: Hb &lt; 130 g/L (men), &lt; 120 (non-pregnant women), &lt; 110 (pregnancy). Preoperatively, &lt; 130 g/L in either sex is now treated as significant.</li>
<li><b>Classification by MCV</b>: microcytic (iron deficiency, thalassaemia, anaemia of chronic disease, sideroblastic), normocytic (acute blood loss, chronic disease, renal failure, marrow failure, haemolysis), macrocytic (B12/folate deficiency, alcohol, liver disease, hypothyroidism, reticulocytosis, drugs: methotrexate, hydroxycarbamide).</li>
<li><b>Iron studies</b>: ferritin &lt; 30 µg/L = absolute deficiency; 30–100 with transferrin saturation &lt; 20% = functional deficiency (inflammation; hepcidin blocks absorption and release).</li>
<li><b>Compensation</b>: ↑ cardiac output (lower viscosity, sympathetic), ↑ O2 extraction, right shift of ODC (2,3-DPG), redistribution to heart and brain, ↑ EPO. Healthy patients tolerate Hb ~70 g/L acutely; critical DO2 reached around Hb 40–50 g/L at rest.</li>
<li><b>Consequences</b>: preoperative anaemia independently predicts transfusion, complications and mortality.</li>
<li><b>B12 and N2O</b>: nitrous oxide oxidises cobalamin and inactivates methionine synthase: megaloblastic changes and subacute combined degeneration after prolonged or repeated exposure, particularly in B12-deficient patients.</li></ul>`,
p:"Anaemia of critical illness: blood sampling (~40 mL/day), inflammation (hepcidin, low EPO response), haemolysis, bleeding, reduced red cell life. TRICC (1999): restrictive 70 g/L as good as 100 g/L in ICU patients.",
v:"Definition, classification by MCV with causes, investigation, physiological compensation, perioperative implications and treatment (IV iron, EPO in selected patients, transfusion)."},
{f:"red",t:"Haemoglobinopathies: sickle cell and thalassaemia",b:`<ul class="clean"><li><b>Sickle cell</b>: point mutation in the β-globin gene: glutamic acid at position 6 replaced by valine (HbS). Deoxygenated HbS polymerises → rigid sickle cells → vaso-occlusion and haemolysis. Triggers: hypoxia, acidosis, dehydration, hypothermia, infection, stasis, pain.</li>
<li><b>Sickle trait</b> (HbAS): usually benign; sickles only with severe hypoxia. Disease (HbSS, HbSC, HbS-β-thal) needs specialist planning.</li>
<li>Complications: painful crises, acute chest syndrome (new infiltrate with fever, chest pain, hypoxia: leading cause of death), stroke, splenic sequestration and autosplenectomy (encapsulated organism infections), priapism, AKI, pulmonary hypertension, avascular necrosis, chronic pain and opioid tolerance.</li>
<li><b>Perioperative</b>: haematology input; preoperative transfusion to Hb ~100 g/L for medium-risk surgery in HbSS (TAPS trial); exchange transfusion for high-risk surgery; keep warm, well hydrated, oxygenated, normocarbic, pain-free; avoid tourniquets if possible; incentive spirometry and early mobilisation; HDU after major surgery.</li>
<li><b>Thalassaemia</b>: reduced synthesis of α or β chains. β-thalassaemia major: transfusion dependence, iron overload (cardiomyopathy, endocrine failure, liver), extramedullary haematopoiesis (maxillary overgrowth: difficult airway), splenectomy.</li>
<li><b>G6PD deficiency</b>: X-linked; oxidant stress (primaquine, dapsone, sulphonamides, methylene blue, fava beans, infection) → haemolysis (Heinz bodies).</li></ul>`,
p:"Pulse oximetry may underestimate SaO2 in sickle cell disease; arterial gases are more reliable during crises.",
v:"Genetics and molecular mechanism, triggers, complications by system, perioperative plan (pre, intra, post), and trait vs disease."},
{f:"imm",t:"The immune system",b:`<ul class="clean"><li><b>Innate</b> (fast, non-specific, no memory): physical barriers, neutrophils, macrophages, NK cells, mast cells, eosinophils, dendritic cells; pattern-recognition receptors (Toll-like receptors) detect PAMPs and DAMPs; <b>complement</b> (classical: antibody–antigen; lectin: mannose-binding lectin; alternative: spontaneous C3 hydrolysis) → opsonisation (C3b), chemotaxis and anaphylatoxins (C3a, C5a), membrane attack complex (C5b–9); acute phase proteins (CRP, fibrinogen, ferritin).</li>
<li><b>Adaptive</b> (slower, specific, memory): <b>T cells</b> mature in the thymus; CD4 helpers (Th1 cell-mediated, Th2 humoral and allergy, Th17, Tregs) recognise antigen on MHC II; CD8 cytotoxic cells recognise MHC I. <b>B cells</b> mature in marrow, become plasma cells making antibodies.</li>
<li><b>Immunoglobulins</b>: IgG (75%, crosses placenta, secondary response), IgM (pentamer, first response, ABO antibodies), IgA (mucosal, secretions, breast milk), IgE (mast cell binding, allergy, parasites), IgD (B-cell receptor).</li>
<li><b>Effects of anaesthesia and surgery</b>: the stress response, opioids (μ-receptor effects on immune cells), volatiles, hypothermia, hyperglycaemia and transfusion (TRIM) depress immunity; regional anaesthesia and propofol may preserve NK function (evidence on cancer recurrence is not conclusive; the RAS-cancer trials showed no difference).</li>
<li><b>Sepsis</b>: dysregulated host response with early hyperinflammation and later immunoparalysis.</li></ul>
<div class="tbl"><table><tr><th>Gell and Coombs</th><th>Mechanism</th><th>Example</th></tr><tr><td>Type I (immediate)</td><td>IgE on mast cells → degranulation</td><td>Anaphylaxis, asthma</td></tr><tr><td>Type II (cytotoxic)</td><td>IgG/IgM against cell antigens + complement</td><td>ABO reaction, HIT, myasthenia, Goodpasture's</td></tr><tr><td>Type III (immune complex)</td><td>Complexes deposit, activate complement</td><td>Serum sickness, SLE, post-streptococcal GN</td></tr><tr><td>Type IV (delayed)</td><td>T cell-mediated, 48–72 h</td><td>Contact dermatitis (chlorhexidine skin), TB test, graft rejection</td></tr></table></div>`,
p:"Splenectomy patients need vaccination against pneumococcus, Haemophilus influenzae b and meningococcus (ideally 2 weeks before elective surgery) and lifelong infection awareness.",
v:"Innate vs adaptive with cells and molecules, complement pathways, immunoglobulins, hypersensitivity types, then anaesthesia and immunity."},
{f:"imm",t:"Perioperative anaphylaxis (NAP6)",b:`<ul class="clean"><li>Incidence ~1 in 10 000 anaesthetics (NAP6, 2018). Mortality ~4%.</li>
<li><b>Causes (NAP6)</b>: antibiotics ~47% (teicoplanin highest rate, co-amoxiclav most common), NMBAs ~33% (suxamethonium and atracurium highest rates, then rocuronium), chlorhexidine ~9%, Patent Blue ~4.5%. Latex was rare.</li>
<li><b>Mechanisms</b>: IgE-mediated (type I) or non-IgE (direct mast cell activation via MRGPRX2: atracurium, morphine, vancomycin "red man").</li>
<li><b>Presentation</b>: hypotension is the commonest first sign (often the only one), then bronchospasm (asthmatics), tachycardia or bradycardia, low EtCO2, rash often absent or late. Cardiac arrest in ~15% of NAP6 cases.</li>
<li><b>Treatment</b>: stop triggers, call for help, 100% O2, legs up, adrenaline 50 µg IV boluses (adult; children 1 µg/kg), repeat; start an adrenaline infusion if more than 2–3 boluses are needed; crystalloid 20 mL/kg boluses; CPR if SBP &lt; 50 mmHg; refractory: noradrenaline, vasopressin, glucagon (β-blocked patients), consider ECMO. Chlorphenamine and hydrocortisone are second line.</li>
<li><b>Tryptase</b>: mast cell enzyme, peaks 30 min–2 h, half-life ~2 h. Samples as soon as resuscitation allows, at 1–2 h (no later than 4 h), and a baseline at &gt; 24 h. A rise &gt; 20% + 2 µg/L above baseline supports mast cell activation.</li>
<li><b>Follow-up</b>: refer to an anaesthetic allergy clinic (skin prick, intradermal, specific IgE, challenge); inform patient and GP; report to MHRA Yellow Card.</li></ul>`,
p:"Chlorhexidine anaphylaxis can be delayed (15–45 min) and is easily missed: think of impregnated central lines, urinary catheter gels and skin prep.",
v:"Incidence and causes from NAP6, mechanism, recognition (hypotension first), treatment with doses, tryptase timing, investigation and reporting."},
];

const CALCS=[
 {t:"Allowable blood loss and transfusion volume",c:"nibp",in:[["Weight kg","w",70],["EBV mL/kg","ebv",70],["Current Hb g/L","h0",130],["Lowest acceptable Hb g/L","h1",80],["Target Hb after transfusion g/L","ht",90],["Hb now (post-loss) g/L","hn",70]],
  f:(v,fmt)=>{const E=v.w*v.ebv,abl=E*(v.h0-v.h1)/((v.h0+v.h1)/2),units=(v.ht-v.hn)/10*(70/v.w),ml=v.w*(v.ht-v.hn)/10*4;return [["EBV mL",fmt(E,0)],["Allowable loss mL",fmt(abl,0)],["Red cell units needed",fmt(Math.max(0,units),1)],["Paediatric formula mL",fmt(Math.max(0,ml),0)]]},
  n:"One adult unit raises Hb ~10 g/L in 70 kg. Paediatric: volume (mL) = weight × ΔHb (g/dL) × 4 (some use × 5)."},
 {t:"Heparin and protamine",c:"etco2",in:[["Heparin given IU","h",25000],["Minutes since dose","t",60],["Heparin half-life min (dose-dependent ~60–90)","hl",75]],
  f:(v,fmt)=>{const rem=v.h*Math.pow(0.5,v.t/v.hl),pro=Math.min(50,rem/100);return [["Heparin remaining IU",fmt(rem,0)],["Protamine mg (1 per 100 IU)",fmt(rem/100,0)],["Single bolus (max 50 mg)",fmt(pro,0)]]},
  n:"Give protamine slowly (≤ 5 mg/min): rapid injection causes hypotension, pulmonary hypertension and anaphylactoid reactions (fish allergy, NPH insulin, vasectomy). Excess protamine is itself anticoagulant."},
 {t:"Warfarin reversal",c:"etco2",in:[["INR","inr",5],["Weight kg","w",80],["Life-threatening bleed / emergency surgery (1/0)","e",1]],
  f:(v,fmt)=>{const d=v.inr<4?25:v.inr<=6?35:50;const iu=Math.min(d*v.w,d*100);return [["PCC dose IU/kg",v.e?d:"–"],["PCC total IU",v.e?fmt(iu,0):"–"],["Vitamin K",v.e?"5–10 mg IV":(v.inr>8?"1–5 mg oral":"Withhold warfarin")],["Recheck INR","30 min after PCC"]]},
  n:"Four-factor PCC dosing bands (UK BSH guidance): INR 2–4 → 25 IU/kg, 4–6 → 35 IU/kg, > 6 → 50 IU/kg (product-specific, usually capped at 100 kg). FFP is inferior for warfarin reversal."},
 {t:"Fibrinogen replacement",c:"abp",in:[["Weight kg","w",70],["Current fibrinogen g/L","f0",1.0],["Target g/L","f1",2.0],["Haematocrit","hct",0.30]],
  f:(v,fmt)=>{const pv=v.w*0.07*(1-v.hct),g=(v.f1-v.f0)*pv;return [["Plasma volume L",fmt(pv,1)],["Fibrinogen concentrate g",fmt(Math.max(0,g),1)],["Cryoprecipitate pools (~1.5 g/pool effective)",fmt(Math.max(0,g/1.5),1)]]},
  n:"Dose ≈ Δfibrinogen × plasma volume. Ongoing bleeding consumes more: recheck with Clauss fibrinogen or FIBTEM."},
 {t:"DOAC interruption before surgery",c:"etco2",in:[["Drug (1 apixaban/rivaroxaban/edoxaban, 2 dabigatran)","d",1],["CrCl mL/min","cr",60],["Bleeding risk (1 low, 2 high)","b",2],["Neuraxial planned (1/0)","n",0]],
  f:(v,fmt)=>{let h;if(v.d===1){h=v.cr<15?"Avoid / seek advice":v.cr<30?(v.b===1?36:72):(v.b===1?24:48)}else{h=v.cr<30?"Not indicated (contraindicated)":v.cr<50?(v.b===1?48:96):v.cr<80?(v.b===1?36:72):(v.b===1?24:48)}const neur=v.n?(v.d===1?"≥ 72 h for treatment doses (ASRA); check local policy":"72–120 h by CrCl (ASRA)"):"–";return [["Last dose before surgery",typeof h==="number"?h+" h":h],["Neuraxial",neur],["Restart","6–8 h (low risk) or 48–72 h (high risk), when haemostasis secure"]]},
  n:"EHRA 2021 practical guide intervals; no bridging needed. Measure drug-specific levels if timing is uncertain in an emergency."},
 {t:"4Ts score for HIT",c:"abp",in:[["Thrombocytopenia (2: fall > 50% and nadir ≥ 20; 1: 30–50% or nadir 10–19; 0: < 30% or < 10)","t1",2],["Timing (2: day 5–10 or ≤ 1 day with heparin in last 30 days; 1: unclear/after day 10; 0: < 4 days, no recent heparin)","t2",2],["Thrombosis (2: new thrombosis/skin necrosis; 1: suspected/progressive; 0: none)","t3",1],["Other causes (2: none; 1: possible; 0: definite)","t4",1]],
  f:(v,fmt)=>{const s=v.t1+v.t2+v.t3+v.t4;return [["Score",s],["Probability",s<=3?"Low (< 5%)":s<=5?"Intermediate (~10–30%)":"High (~50–80%)",s<=3?"ok":s<=5?"warn":"bad"],["Action",s<=3?"HIT unlikely; look for other causes":"Stop heparin, start argatroban/fondaparinux, send anti-PF4 assay"]]},
  n:"A low score has a high negative predictive value; intermediate and high scores need laboratory confirmation."},
 {t:"Wells score for PE",c:"nibp",in:[["Signs of DVT (3)","a",0],["PE most likely diagnosis (3)","b",3],["HR > 100 (1.5)","c",1.5],["Immobilisation ≥ 3 days or surgery in 4 weeks (1.5)","d",1.5],["Previous DVT/PE (1.5)","e",0],["Haemoptysis (1)","f",0],["Malignancy (1)","g",0]],
  f:(v,fmt)=>{const s=v.a+v.b+v.c+v.d+v.e+v.f+v.g;return [["Wells score",fmt(s,1)],["Two-level",s>4?"PE likely: CTPA":"PE unlikely: D-dimer first",s>4?"bad":"ok"]]},
  n:"Enter the point value for each criterion present (0 if absent). D-dimer is unhelpful postoperatively (almost always raised)."},
 {t:"Platelet transfusion increment",c:"abp",in:[["Pre-count × 10⁹/L","pre",20],["1-h post count","post",45],["Platelets given × 10¹¹","n",3],["BSA m²","bsa",1.8]],
  f:(v,fmt)=>{const cci=(v.post-v.pre)*v.bsa/v.n;return [["Increment",fmt(v.post-v.pre,0)],["Corrected count increment",fmt(cci,1),cci<7.5?"bad":"ok"],["Interpretation",cci<7.5?"Refractory: consider HLA antibodies, consumption, sepsis, splenomegaly":"Adequate response"]]},
  n:"CCI = increment × BSA / number of platelets (× 10¹¹). < 7.5 at 1 h on two occasions suggests immune refractoriness."},
 {t:"Tranexamic acid dosing",c:"spo2",in:[["Weight kg","w",70],["Scenario (1 trauma/PPH, 2 elective surgery, 3 cardiac)","s",1]],
  f:(v,fmt)=>{const r=v.s===1?"1 g IV over 10 min, then 1 g over 8 h (trauma within 3 h; PPH: 1 g, repeat after 30 min if bleeding)":v.s===2?`15 mg/kg (≈ ${fmt(15*v.w,0)} mg) at induction, ± repeat or infusion`:`High-dose regimens up to 30–100 mg/kg (seizure risk with high doses)`;return [["Regimen",r],["Renal adjustment","Reduce repeat doses when eGFR < 30"]]},
  n:"CRASH-2 (trauma), WOMAN (PPH), CRASH-3 (TBI within 3 h, mild–moderate). Benefit falls ~10% for every 15 min of delay in haemorrhage."},
];

const TABLES=[
 ["ABO compatibility",["Recipient","Red cells can come from","Plasma can come from","Antibodies in recipient plasma"],[["O","O","O, A, B, AB","Anti-A, anti-B"],["A","A, O","A, AB","Anti-B"],["B","B, O","B, AB","Anti-A"],["AB","AB, A, B, O","AB","None"]]],
 ["Transfusion thresholds (UK)",["Component","Threshold"],[["Red cells","Hb 70 g/L (target 70–90); 80 g/L with ACS; single units then reassess"],["Platelets","< 10 prophylaxis; < 50 surgery; < 100 neurosurgery/eye; ≥ 75–80 neuraxial; > 75 in major haemorrhage"],["FFP","Bleeding with PT or APTT > 1.5× normal; major haemorrhage protocol"],["Cryoprecipitate / fibrinogen","Fibrinogen < 1.5 g/L with bleeding (< 2 g/L in obstetric haemorrhage)"],["PCC","Warfarin reversal (with vitamin K); DOAC bleeding when specific reversal unavailable"]]],
 ["Viscoelastic tests: defects and treatment",["Finding","Likely cause","Treatment"],[["R / CT prolonged (INTEM long, HEPTEM normal)","Heparin","Protamine"],["R / CT prolonged (both)","Factor deficiency","FFP or PCC"],["MA / MCF / A5 low, FIBTEM normal","Platelets low or dysfunctional","Platelets"],["FIBTEM A5 < 8–10 mm","Low fibrinogen","Fibrinogen concentrate or cryoprecipitate"],["LY30 > 8% / ML > 15%","Hyperfibrinolysis","Tranexamic acid"],["Short R, high MA","Hypercoagulable","Consider thromboprophylaxis"]]],
 ["Anaemia by MCV",["Microcytic (< 80 fL)","Normocytic (80–100 fL)","Macrocytic (> 100 fL)"],[["Iron deficiency","Acute blood loss","B12 / folate deficiency"],["Thalassaemia trait","Anaemia of chronic disease","Alcohol, liver disease"],["Anaemia of chronic disease (late)","Renal failure (low EPO)","Hypothyroidism"],["Sideroblastic anaemia","Haemolysis, marrow failure","Drugs (methotrexate, hydroxycarbamide), reticulocytosis"]]],
 ["Immunoglobulins",["Class","Structure","Key features"],[["IgG","Monomer","75% of total; secondary response; crosses placenta; opsonises; fixes complement"],["IgM","Pentamer","First response; best complement activator; ABO antibodies; does not cross placenta"],["IgA","Dimer (secretory)","Mucosal surfaces, breast milk; IgA deficiency → anaphylaxis to blood products"],["IgE","Monomer","Binds mast cells and basophils; allergy, anaphylaxis, parasites"],["IgD","Monomer","B-cell surface receptor"]]],
 ["NAP6 headline findings",["Item","Finding"],[["Incidence","~1 in 10 000 anaesthetics; 4% mortality"],["Top causes","Antibiotics 47% (teicoplanin, co-amoxiclav), NMBAs 33% (suxamethonium, atracurium, rocuronium), chlorhexidine 9%, Patent Blue 4.5%"],["First sign","Hypotension (46%), bronchospasm (18%), low EtCO2, tachycardia"],["Cardiac arrest","~15% of cases; most with PEA"],["Learning","Adrenaline given late or not at all in some cases; CPR when SBP < 50; refer every case to allergy clinic"]]],
];

const CARDS=[
 ["coag","Platelet lifespan and normal count?","7–10 days; 150–400 × 10⁹/L."],
 ["coag","Receptor for vWF on platelets?","GPIb–IX–V."],
 ["coag","Final common receptor for platelet aggregation?","GPIIb/IIIa (binds fibrinogen)."],
 ["coag","Aspirin's mechanism?","Irreversible COX-1 acetylation → no TXA2 for the platelet's life."],
 ["coag","Target of clopidogrel?","P2Y12 ADP receptor (irreversible, prodrug)."],
 ["coag","Four phases of the cell-based model?","Initiation, amplification, propagation, stabilisation."],
 ["coag","What starts coagulation in vivo?","Tissue factor binding factor VIIa."],
 ["coag","Tenase and prothrombinase complexes?","Tenase: IXa–VIIIa. Prothrombinase: Xa–Va."],
 ["coag","Vitamin K-dependent factors?","II, VII, IX, X and proteins C and S."],
 ["coag","Clotting factor with the shortest half-life?","Factor VII (~6 h)."],
 ["coag","Main natural anticoagulants?","Antithrombin, protein C (+ S), TFPI."],
 ["coag","What does thrombomodulin do?","Binds thrombin and switches it to activate protein C."],
 ["coag","How does tranexamic acid work?","Blocks lysine-binding sites on plasminogen, preventing plasmin binding to fibrin."],
 ["coag","Which factors does the PT test?","VII, X, V, II, fibrinogen (extrinsic and common)."],
 ["coag","Which factors does the APTT test?","XII, XI, IX, VIII, X, V, II, fibrinogen (intrinsic and common)."],
 ["coag","Normal ACT and CPB target?","100–150 s; > 400–480 s on bypass."],
 ["coag","What is D-dimer?","Breakdown product of cross-linked fibrin."],
 ["coag","TEG R time reflects?","Time to clot initiation: clotting factors, heparin."],
 ["coag","TEG MA reflects?","Clot strength: platelets (~80%) and fibrinogen (~20%)."],
 ["coag","ROTEM test that isolates fibrinogen?","FIBTEM (platelets blocked with cytochalasin D)."],
 ["coag","ROTEM sign of hyperfibrinolysis?","Maximum lysis > 15% (corrected in APTEM)."],
 ["coag","Normal TEG LY30?","< 8%."],
 ["coag","Commonest inherited bleeding disorder?","von Willebrand disease."],
 ["coag","Desmopressin dose for vWD / mild haemophilia A?","0.3 µg/kg IV over 30 min."],
 ["coag","Haemophilia A vs B?","A: factor VIII. B: factor IX. Both X-linked."],
 ["coag","Lab picture in DIC?","Low platelets, long PT/APTT, low fibrinogen, high D-dimer."],
 ["coag","Components of Virchow's triad?","Stasis, endothelial injury, hypercoagulability."],
 ["coag","Commonest inherited thrombophilia?","Factor V Leiden."],
 ["coag","Mechanism of HIT type II?","IgG against heparin–PF4 complexes activating platelets."],
 ["coag","Timing of HIT?","5–10 days after starting heparin (earlier if exposed in last 100 days)."],
 ["coag","Treatment of HIT?","Stop all heparin; argatroban, bivalirudin, fondaparinux or danaparoid; no platelets unless bleeding."],
 ["tx","Antibodies in a group A patient?","Anti-B (IgM)."],
 ["tx","Universal plasma donor group?","AB."],
 ["tx","Which antibody causes haemolytic disease of the newborn classically?","Anti-D (IgG, crosses placenta)."],
 ["tx","Red cell storage temperature and shelf life?","2–6 °C, up to 35 days."],
 ["tx","Platelet storage?","20–24 °C with agitation, 7 days."],
 ["tx","FFP dose?","12–15 mL/kg."],
 ["tx","Effect of 2 pools of cryoprecipitate?","Raises fibrinogen ~1 g/L."],
 ["tx","Hb rise per unit of red cells?","≈ 10 g/L in a 70 kg adult."],
 ["tx","Storage lesion changes?","↑ K⁺, ↓ 2,3-DPG, ↓ pH, ↓ ATP, haemolysis."],
 ["tx","Restrictive red cell threshold?","Hb 70 g/L (80 with ACS)."],
 ["tx","Platelet threshold for neuraxial block?","≈ 75–80 × 10⁹/L (individualise)."],
 ["tx","Three pillars of patient blood management?","Optimise red cell mass, minimise loss, tolerate anaemia."],
 ["tx","Preoperative Hb considered anaemic in both sexes?","< 130 g/L."],
 ["tx","Most common transfusion reaction?","Febrile non-haemolytic (and minor allergic)."],
 ["tx","Leading cause of transfusion-related death reported to SHOT?","TACO (circulatory overload)."],
 ["tx","TRALI mechanism and timing?","Donor anti-HLA/HNA antibodies activate recipient neutrophils; within 6 h."],
 ["tx","TRALI vs TACO?","TRALI: normal/low BP, normal JVP, no diuretic response. TACO: hypertension, high JVP, responds to diuretics."],
 ["tx","How is TA-GvHD prevented?","Irradiation of cellular components."],
 ["tx","Definition of massive transfusion?","One blood volume in 24 h (or 50% in 3 h; > 150 mL/min)."],
 ["tx","Which haemostatic component falls first with dilution?","Fibrinogen."],
 ["tx","Fibrinogen target in major haemorrhage?","> 1.5 g/L (> 2 g/L in obstetrics)."],
 ["tx","CRASH-2 tranexamic acid regimen?","1 g over 10 min then 1 g over 8 h, within 3 h of injury."],
 ["tx","Cell salvage indications?","Expected loss > 500 mL or > 10% BV, rare antibodies, refusal of allogeneic blood."],
 ["drug","Protamine dose?","1 mg per 100 IU heparin, max 50 mg, slowly."],
 ["drug","Warfarin's target enzyme?","Vitamin K epoxide reductase (VKORC1)."],
 ["drug","Warfarin reversal for emergency surgery?","Vitamin K 5–10 mg IV + 4-factor PCC 25–50 IU/kg."],
 ["drug","Reversal of dabigatran?","Idarucizumab 5 g IV."],
 ["drug","Reversal of apixaban/rivaroxaban?","Andexanet alfa (or PCC if unavailable)."],
 ["drug","Prophylactic LMWH: time before neuraxial block?","12 h."],
 ["drug","Therapeutic LMWH: time before neuraxial block?","24 h."],
 ["drug","Clopidogrel stop time before neuraxial?","5–7 days."],
 ["drug","Does aspirin need stopping before neuraxial block?","No (if used alone)."],
 ["drug","EHRA interval for Xa inhibitor, high bleeding risk, CrCl ≥ 30?","≥ 48 h."],
 ["drug","LMWH: main factor inhibited?","Xa (much more than IIa)."],
 ["red","Sickle cell mutation?","Glutamic acid → valine at position 6 of β-globin."],
 ["red","Triggers of sickling?","Hypoxia, acidosis, dehydration, cold, infection, stasis."],
 ["red","Leading cause of death in sickle cell disease?","Acute chest syndrome."],
 ["red","Preoperative transfusion target in HbSS for medium-risk surgery?","Hb ~100 g/L (TAPS)."],
 ["red","Ferritin level confirming iron deficiency?","< 30 µg/L."],
 ["red","Hormone that blocks iron absorption in inflammation?","Hepcidin."],
 ["red","How does N2O affect B12?","Oxidises cobalamin, inactivating methionine synthase."],
 ["red","TRICC trial conclusion?","Restrictive transfusion (70 g/L) as safe as liberal (100 g/L) in ICU."],
 ["red","G6PD deficiency triggers?","Oxidant drugs (primaquine, dapsone, methylene blue), fava beans, infection."],
 ["imm","Three complement pathways?","Classical, lectin, alternative."],
 ["imm","Anaphylatoxins?","C3a and C5a."],
 ["imm","Immunoglobulin that crosses the placenta?","IgG."],
 ["imm","Type II hypersensitivity examples?","ABO incompatibility, HIT, myasthenia gravis."],
 ["imm","Incidence of perioperative anaphylaxis (NAP6)?","≈ 1 in 10 000."],
 ["imm","Commonest cause of perioperative anaphylaxis in NAP6?","Antibiotics (teicoplanin highest rate, co-amoxiclav most common)."],
 ["imm","Commonest first sign of perioperative anaphylaxis?","Hypotension."],
 ["imm","Adult IV adrenaline bolus in anaphylaxis?","50 µg, repeated; infusion if more than 2–3 boluses."],
 ["imm","Tryptase sampling times?","As soon as possible after resuscitation, at 1–2 h (≤ 4 h), and > 24 h baseline."],
 ["imm","Mast cell receptor for non-IgE drug reactions?","MRGPRX2."],
];

const FCF={all:"All",coag:"Coagulation",tx:"Transfusion",drug:"Anticoagulants",red:"Red cells",imm:"Immunology"};

const VIVA=[
 {st:"SOE 1 · Physiology",q:"Describe haemostasis. How does the body stop bleeding after a cut?",a:["Vascular phase.","Primary haemostasis: adhesion (GPIb–vWF, GPVI), activation, aggregation (GPIIb/IIIa).","Secondary: classical cascade vs cell-based model (four phases), role of Ca²⁺ and vitamin K.","Control: antithrombin, protein C/S, TFPI, endothelium.","Fibrinolysis and its inhibitors; clinical drug targets."],fu:"Why does warfarin prolong the PT before the APTT?"},
 {st:"SOE 2 · Pharmacology",q:"Here is a ROTEM trace from a bleeding patient after liver resection. Interpret it and guide treatment.",a:["Explain the principle and the channels (EXTEM, INTEM, FIBTEM, HEPTEM, APTEM).","Read CT, CFT/α, A5/A10/MCF, ML in order.","Map defects to products: FFP/PCC, platelets, fibrinogen, TXA, protamine.","Note limits (antiplatelets, vWD, temperature).","Re-test after treatment; integrate with clinical bleeding."],fu:"How would hyperfibrinolysis appear and which channel confirms it?"},
 {st:"SOE 3 · Anaesthesia",q:"Define massive transfusion. What are its complications and how do you manage major haemorrhage?",a:["Definitions.","Complications: immunological, infective, metabolic (citrate, K⁺, acid–base), hypothermia, dilutional coagulopathy, TRALI/TACO, TRIM.","Protocol: activate MHP, ratios, TXA, calcium, warming, permissive hypotension.","Goal-directed with POC tests; thresholds.","Damage control and cell salvage."],fu:"Why does hypocalcaemia occur and how quickly?"},
 {st:"SOE 2 · Pharmacology",q:"Classify anticoagulants and antiplatelet drugs. How do you manage them before neuraxial anaesthesia?",a:["Classification by target with examples.","Monitoring and reversal for each.","Neuraxial timings with source guideline.","Risk factors for spinal haematoma; monitoring after the block.","Bridging and stent considerations."],fu:"A patient on rivaroxaban needs an emergency hip fracture repair. What anaesthetic do you choose?"},
 {st:"SOE 1 · Physiology",q:"Describe the ABO and Rhesus systems and how blood is made safe for transfusion.",a:["Antigens and naturally occurring antibodies; inheritance.","Rh D, sensitisation and HDFN, anti-D prophylaxis.","Group and screen, crossmatch, electronic issue, emergency O-negative.","Component processing: leucodepletion, irradiation, CMV-negative, donor screening.","Bedside checking and haemovigilance (SHOT)."],fu:"Why is AB the universal plasma donor but O the universal red cell donor?"},
 {st:"SOE 4 · Critical care",q:"A patient becomes hypoxic 2 hours into a transfusion of FFP. Discuss.",a:["Stop the transfusion, ABC, check identity and bag.","Differential: TRALI, TACO, anaphylaxis, haemolytic reaction, sepsis from contaminated unit, unrelated causes.","Distinguishing features (BP, JVP, BNP, echo, fluid balance, fever).","Management: supportive, diuretic for TACO, ventilation strategy for TRALI.","Reporting: haematology, SHOT, donor investigation."],fu:"Which donors are deferred to reduce TRALI?"},
 {st:"SOE 3 · Anaesthesia",q:"A patient with sickle cell disease needs a laparoscopic cholecystectomy. How will you manage them?",a:["Pathophysiology and triggers.","Preop: haematology input, baseline Hb, previous crises, organ damage, transfusion to Hb 100 (TAPS), hydration.","Intraop: oxygenation, normothermia, normocarbia (pneumoperitoneum), hydration, analgesia, avoid tourniquet.","Postop: oxygen, incentive spirometry, analgesia, mobilisation, watch for acute chest syndrome.","Trait vs disease differences."],fu:"How would you recognise and manage acute chest syndrome?"},
 {st:"SOE 1 · Physiology",q:"Define anaemia. How would you investigate and optimise an anaemic patient before major surgery?",a:["Definitions and preoperative threshold (130 g/L).","Classification by MCV and causes.","Investigations: FBC, film, ferritin, TSAT, CRP, B12/folate, renal function, GI investigation.","Treatment: IV iron 2–4 weeks before, B12/folate, EPO in selected cases, defer surgery if appropriate.","Physiological tolerance and transfusion thresholds; PBM."],fu:"Why is oral iron often ineffective before surgery?"},
 {st:"SOE 3 · Anaesthesia",q:"Shortly after induction and antibiotics, the BP falls to 50 systolic with bronchospasm. Manage.",a:["Recognise anaphylaxis (or differential: drug overdose, embolism, tension, cardiac).","Call for help, stop triggers, 100% O2, legs up, IV adrenaline 50 µg boluses, fluids.","CPR if SBP < 50; adrenaline infusion; refractory options.","Tryptase samples and timings.","Allergy clinic referral, documentation, Yellow Card, patient information."],fu:"What did NAP6 find about chlorhexidine?"},
 {st:"SOE 4 · Critical care",q:"A patient's platelets fall from 250 to 80 on day 7 of ICU stay on heparin. Discuss.",a:["Differential: sepsis/DIC, dilution, drugs, HIT, TTP, liver disease, sequestration, pseudothrombocytopenia.","4Ts score and laboratory testing.","If HIT likely: stop heparin, alternative anticoagulant (argatroban in renal failure), screen for thrombosis.","Avoid platelet transfusion and warfarin initially.","Future heparin avoidance; cardiac surgery planning."],fu:"Why are patients with HIT at risk of thrombosis rather than bleeding?"},
 {st:"SOE 1 · Physiology",q:"Describe the components of the immune system and how anaesthesia affects it.",a:["Innate: barriers, cells, PRRs, complement, acute phase.","Adaptive: T-cell subsets, MHC, B cells, immunoglobulins.","Hypersensitivity types with anaesthetic examples.","Effects of surgery, opioids, volatiles, transfusion, hypothermia, glucose.","Clinical: infection, cancer recurrence debate, sepsis."],fu:"What are the consequences of splenectomy?"},
 {st:"SOE 3 · Anaesthesia",q:"A Jehovah's Witness needs major surgery with expected large blood loss. How would you approach this?",a:["Respect autonomy; confirm wishes privately, advance decision, which products and procedures are acceptable.","Preoperative optimisation (IV iron, EPO), stop antithrombotics appropriately.","Intraoperative: cell salvage in continuity, TXA, meticulous haemostasis, hypotensive technique where safe, POC coagulation, fibrinogen/PCC if acceptable.","Postoperative: minimise sampling (paediatric tubes), tolerate low Hb, consider hyperbaric O2 rarely.","Children and emergencies: legal position."],fu:"Can a 16-year-old Jehovah's Witness refuse a life-saving transfusion in the UK?"},
 {st:"SOE 4 · Critical care",q:"How would you diagnose and treat a massive pulmonary embolism with cardiac arrest?",a:["Recognition: sudden collapse, PEA, high CVP, low EtCO2, RV dilatation on echo.","CPR; thrombolysis (alteplase 50 mg bolus) and continue CPR 60–90 min.","If not arrested but shocked: alteplase 100 mg over 2 h; catheter-directed or surgical embolectomy if contraindicated; ECMO.","Supportive: avoid excessive fluid (RV failure), noradrenaline, careful intubation.","Anticoagulation afterwards; investigate cause."],fu:"Why can intubation precipitate arrest in massive PE?"},
];

const QUIZ=[
 ["Platelets",[["Have a lifespan of 7–10 days",1,""],["Adhere to collagen via GPIIb/IIIa",0,"Adhesion: GPIb–vWF and GPVI; GPIIb/IIIa mediates aggregation."],["Aspirin inhibits them irreversibly",1,""],["Are stored at 4 °C",0,"20–24 °C with agitation."],["Expose phosphatidylserine when activated",1,""]]],
 ["Coagulation",[["Tissue factor–VIIa initiates coagulation in vivo",1,""],["Factor VIII is vitamin K-dependent",0,"II, VII, IX, X are."],["Protein C inactivates Va and VIIIa",1,""],["Antithrombin activity is greatly increased by heparin",1,""],["Factor XIII cross-links fibrin",1,""]]],
 ["Clotting tests",[["The PT is prolonged by factor VII deficiency",1,""],["The APTT is prolonged by factor VII deficiency",0,"VII is tested by the PT only."],["Dabigatran prolongs the thrombin time",1,""],["Standard tests are performed at the patient's temperature",0,"At 37 °C."],["Lupus anticoagulant prolongs the APTT",1,""]]],
 ["TEG and ROTEM",[["R time reflects clotting factor activity",1,""],["MA mainly reflects platelet function",1,""],["FIBTEM blocks platelet contribution",1,""],["They reliably detect aspirin effect",0,"Standard assays are insensitive to antiplatelet drugs."],["Raised LY30 suggests hyperfibrinolysis",1,""]]],
 ["Blood components",[["Red cells are stored at 2–6 °C",1,""],["Cryoprecipitate is rich in fibrinogen, VIII and vWF",1,""],["FFP is the treatment of choice for warfarin reversal",0,"PCC with vitamin K."],["Stored red cells have increased 2,3-DPG",0,"2,3-DPG falls during storage."],["Irradiation prevents TA-GvHD",1,""]]],
 ["Transfusion reactions",[["Febrile non-haemolytic reactions are the most common",1,""],["TRALI occurs within 6 hours",1,""],["TACO typically causes hypotension",0,"Hypertension and raised JVP."],["Acute haemolytic reactions are usually due to clerical error",1,""],["Delayed haemolytic reactions are often due to Kidd antibodies",1,""]]],
 ["Massive haemorrhage",[["Fibrinogen is the first factor to reach critical levels with dilution",1,""],["Tranexamic acid should be given within 3 h of trauma",1,""],["Permissive hypotension is recommended in traumatic brain injury",0,"Contraindicated in TBI."],["Citrate toxicity causes hypocalcaemia",1,""],["Platelets should be kept above 75 during active bleeding",1,""]]],
 ["Heparins",[["UFH inhibits thrombin and Xa equally",1,""],["LMWH is fully reversed by protamine",0,"Only partially (~60%)."],["Prophylactic LMWH should be stopped 12 h before neuraxial block",1,""],["HIT is mediated by antibodies to heparin–PF4 complexes",1,""],["HIT usually causes severe bleeding",0,"Thrombosis is the main risk."]]],
 ["Oral anticoagulants",[["Warfarin inhibits vitamin K epoxide reductase",1,""],["Dabigatran is a direct Xa inhibitor",0,"Direct thrombin inhibitor."],["Idarucizumab reverses dabigatran",1,""],["Apixaban clearance depends heavily on renal function",0,"Only ~27% renal; dabigatran ~80%."],["Andexanet alfa reverses rivaroxaban",1,""]]],
 ["Sickle cell disease",[["Valine replaces glutamic acid in the β chain",1,""],["Sickling is promoted by alkalosis",0,"By acidosis."],["Acute chest syndrome is a leading cause of death",1,""],["Patients are functionally asplenic",1,""],["Sickle trait patients routinely need preoperative transfusion",0,"Trait usually needs no transfusion."]]],
 ["Anaemia",[["Iron deficiency causes a microcytic anaemia",1,""],["B12 deficiency causes a microcytic anaemia",0,"Macrocytic."],["Hepcidin reduces iron absorption",1,""],["Anaemia shifts the ODC to the right via 2,3-DPG",1,""],["A preoperative Hb of 125 g/L is normal in men",0,"< 130 g/L is anaemic."]]],
 ["Immunoglobulins and hypersensitivity",[["IgM is the first antibody produced",1,""],["IgA crosses the placenta",0,"IgG crosses the placenta."],["Anaphylaxis is type I hypersensitivity",1,""],["Contact dermatitis is type IV",1,""],["HIT is a type III reaction",0,"Usually classed as type II (antibody against cell-bound antigen)."]]],
 ["Perioperative anaphylaxis (NAP6)",[["Incidence is about 1 in 10 000 anaesthetics",1,""],["Latex was the leading cause",0,"Antibiotics, then NMBAs."],["Hypotension was the most common first sign",1,""],["Initial adult IV adrenaline dose is 50 µg",1,""],["A single tryptase sample at 24 h is sufficient",0,"Early (1–2 h) samples are essential; 24 h is baseline."]]],
 ["Bleeding disorders",[["von Willebrand disease is the commonest inherited bleeding disorder",1,""],["Desmopressin increases vWF and factor VIII release",1,""],["Haemophilia B is factor VIII deficiency",0,"Factor IX."],["Platelets should be avoided in TTP unless life-threatening bleeding",1,""],["Hypothermia impairs coagulation even when lab tests are normal",1,"Lab tests are run at 37 °C."]]],
];

const CRISIS=[
 ["Perioperative anaphylaxis","ecg",["Stop all possible triggers (drugs, colloid, chlorhexidine, latex); call for help; note time.","100% O2, maintain airway; elevate legs; large-bore access.","Adrenaline 50 µg IV bolus (child 1 µg/kg), repeat every 1–2 min; IM 0.5 mg if no IV access.","Crystalloid 20 mL/kg boluses; start adrenaline infusion if more than 2–3 boluses needed.","CPR if SBP < 50 mmHg or arrest; refractory: noradrenaline, vasopressin, glucagon (β-blocked), consider ECMO.","Then chlorphenamine 10 mg and hydrocortisone 200 mg; salbutamol for persistent bronchospasm; tryptase samples; ICU; allergy clinic referral."],"Mast cell mediators (histamine, tryptase, leukotrienes) cause vasodilatation, capillary leak and bronchoconstriction."],
 ["Suspected ABO-incompatible transfusion","nibp",["Stop the transfusion immediately; keep the line with saline (new giving set).","Check patient identity and the bag label at the bedside; tell the lab (other patients may be at risk of a mix-up).","Support circulation and airway; fluids, vasopressors.","Send samples: repeat group and screen, DAT, FBC, coagulation, LDH, bilirubin, haptoglobin, U&E; return the bag.","Maintain urine output > 1 mL/kg/h (AKI); treat DIC with products guided by tests.","Report to SHOT and MHRA (SABRE); duty of candour."],"Recipient IgM anti-A/anti-B fix complement and lyse donor cells within minutes."],
 ["Respiratory distress during transfusion (TRALI vs TACO)","nibp",["Stop the transfusion; O2; sit up; examine BP, JVP, chest, fluid balance.","TACO: hypertension, raised JVP, positive balance, raised BNP: furosemide, slow future transfusions, single units.","TRALI: hypotension, fever, normal JVP: supportive, lung-protective ventilation, avoid diuretics if hypovolaemic.","Exclude anaphylaxis and haemolysis; CXR, echo.","Report to haematology and SHOT; donor investigation for TRALI."],"TACO is hydrostatic oedema; TRALI is neutrophil-mediated capillary leak."],
 ["Emergency surgery on a DOAC or warfarin","etco2",["Establish drug, dose, last dose time, renal function; measure drug-specific level (anti-Xa, dilute TT) and INR.","Delay if safe: wait 12–24 h (Xa inhibitors) to allow clearance.","Warfarin: vitamin K 5–10 mg IV + PCC 25–50 IU/kg.","Dabigatran: idarucizumab 5 g IV (dialysis an alternative).","Apixaban/rivaroxaban with life-threatening bleeding: andexanet alfa, or PCC 50 IU/kg if not available; tranexamic acid.","Prefer GA or peripheral blocks over neuraxial; cell salvage; viscoelastic testing."],"DOAC effect falls with each half-life (~12 h); reversal agents act within minutes."],
 ["Acute chest syndrome after surgery","spo2",["Suspect in sickle cell disease with chest pain, fever, tachypnoea, falling SpO2 and new infiltrate (often day 2–3 postoperatively).","O2 to SpO2 ≥ 95%, incentive spirometry, analgesia (avoid oversedation), hydration (avoid overload).","Antibiotics covering atypical organisms (macrolide + cephalosporin).","Urgent haematology: top-up or exchange transfusion (target HbS < 30%) if deteriorating.","CPAP/NIV or ventilation; ICU if hypoxic despite O2."],"Hypoxia, splinting and atelectasis promote sickling in the lung, which worsens hypoxia: a vicious circle."],
 ["HIT with thrombosis","abp",["Stop all heparin including flushes and heparin-coated lines.","Start a non-heparin anticoagulant: argatroban (APTT-guided, safe in renal failure), bivalirudin, fondaparinux, danaparoid or a DOAC once stable.","Do not give platelets unless life-threatening bleeding; do not start warfarin until platelets > 150 (risk of venous limb gangrene); give vitamin K if already on warfarin.","Image for occult DVT; send anti-PF4 and functional assays.","Document heparin allergy; plan for future cardiac surgery (wait for antibody clearance or alternative)."],"Antibody-coated platelets activate and release procoagulant microparticles: thrombosis despite a low count."],
];

const SRC="";
const ERR="";
const REFS="";

const DIAG=`<div class="grid2">
 <div class="fig" style="grid-column:1/-1"><h3>Coagulation cascade with drug and test overlays</h3>
  <div class="seg" id="cc-sel"></div>
  <div class="svgbox"><svg id="cc" viewBox="0 0 900 400" role="img" aria-label="Coagulation cascade"></svg></div>
  <div class="readout" id="cc-r"></div></div>

 <div class="fig" style="grid-column:1/-1"><h3>TEG / ROTEM trace interpreter</h3>
  <div class="seg" id="te-pre"></div>
  <div class="ctl">
   <label>R time min <input type="range" id="te-r" min="2" max="20" step="0.5" value="6"><output id="te-r-o"></output></label>
   <label>Build-up rate (α°) <input type="range" id="te-a" min="20" max="80" step="1" value="62"><output id="te-a-o"></output></label>
   <label>MA mm <input type="range" id="te-m" min="20" max="85" step="1" value="62"><output id="te-m-o"></output></label>
   <label>LY30 % <input type="range" id="te-l" min="0" max="60" step="1" value="2"><output id="te-l-o"></output></label></div>
  <div class="svgbox"><svg id="te" viewBox="0 0 900 300" role="img" aria-label="TEG trace"></svg></div>
  <div class="readout" id="te-rd"></div></div>

 <div class="fig"><h3>Dilutional coagulopathy</h3>
  <div class="seg" id="dc-sel"></div>
  <div class="svgbox"><svg id="dc" viewBox="0 0 520 300" role="img" aria-label="Dilutional coagulopathy"></svg></div>
  <div class="readout" id="dc-r"></div></div>

 <div class="fig"><h3>Haematocrit, viscosity and O2 delivery</h3>
  <div class="ctl"><label>Haematocrit % <input type="range" id="hv-h" min="10" max="65" step="1" value="42"><output id="hv-h-o"></output></label></div>
  <div class="svgbox"><svg id="hv" viewBox="0 0 520 290" role="img" aria-label="Hct and DO2"></svg></div>
  <div class="readout" id="hv-r"></div></div>

 <div class="fig"><h3>Red cell storage lesion</h3>
  <div class="ctl"><label>Days in storage <input type="range" id="sl-d" min="0" max="35" step="1" value="14"><output id="sl-d-o"></output></label></div>
  <div class="svgbox"><svg id="sl" viewBox="0 0 520 290" role="img" aria-label="Storage lesion"></svg></div>
  <div class="readout" id="sl-r"></div></div>

 <div class="fig"><h3>Anaphylaxis: tryptase and histamine timing</h3>
  <div class="ctl"><label>Sample time after reaction (h) <input type="range" id="ty-t" min="0" max="26" step="0.25" value="1"><output id="ty-t-o"></output></label>
   <label>Peak tryptase µg/L <input type="range" id="ty-p" min="5" max="80" step="1" value="40"><output id="ty-p-o"></output></label></div>
  <div class="svgbox"><svg id="ty" viewBox="0 0 520 290" role="img" aria-label="Tryptase curve"></svg></div>
  <div class="readout" id="ty-r"></div></div>
</div>`;

function initDiagrams(){
 const out=(id,t)=>{const o=$("#"+id+"-o");if(o)o.textContent=t};
 const mk=svg=>(t,a,tx)=>{const e=document.createElementNS(SVGNS,t);for(const k in a)e.setAttribute(k,a[k]);if(tx!=null)e.textContent=tx;svg.append(e);return e};
 const smooth=(x,a,b)=>{const t=Math.min(1,Math.max(0,(x-a)/(b-a)));return t*t*(3-2*t)};

 /* 1. Cascade */
 const CC={none:["Cascade only",[],"Classical cascade: intrinsic (contact) pathway, extrinsic (tissue factor) pathway, common pathway to fibrin. In vivo, TF–VIIa starts it and the platelet surface amplifies it (cell-based model)."],
  pt:["PT / INR covers",["VII","X","V","II","I"],"PT measures VII plus the common pathway."],
  aptt:["APTT covers",["XII","XI","IX","VIII","X","V","II","I"],"APTT measures the contact pathway plus the common pathway."],
  war:["Warfarin",["VII","IX","X","II","C"],"Vitamin K antagonist: lowers II, VII, IX, X and proteins C and S. Protein C falls early (short half-life) → transient hypercoagulability: bridge with heparin when starting for thrombosis."],
  ufh:["Unfractionated heparin",["IIa","Xa","AT"],"Potentiates antithrombin against thrombin and Xa equally (and IXa, XIa)."],
  lmwh:["LMWH / fondaparinux",["Xa","AT"],"Mainly anti-Xa via antithrombin (fondaparinux is pure anti-Xa)."],
  doac:["DOACs",["Xa","IIa"],"Apixaban, rivaroxaban, edoxaban block Xa directly; dabigatran blocks thrombin directly."],
  txa:["Tranexamic acid / fibrinolysis",["plasmin"],"Blocks plasminogen lysine binding sites so plasmin cannot break fibrin."],
  plt:["Antiplatelet drugs",["PLT"],"Aspirin (COX-1/TXA2), P2Y12 antagonists (ADP), GPIIb/IIIa antagonists act on platelets, which provide the surface for tenase and prothrombinase."]};
 function drawCC(k){const svg=$("#cc");svg.innerHTML="";const add=mk(svg);const [nm,hl,txt]=CC[k];
  const box=(id,x,y,l)=>{const on=hl.includes(id)||hl.includes(id.replace("a",""));const bw=Math.max(68,l.length*8+16);add("rect",{x:x-bw/2,y:y-16,width:bw,height:32,rx:7,fill:on?"var(--abp)":"var(--panel)","fill-opacity":on?0.22:1,stroke:on?"var(--abp)":"var(--muted)","stroke-width":on?3:1.4});add("text",{x,y:y+5,"text-anchor":"middle",class:"lbl"},l)};
  const ar=(x1,y1,x2,y2)=>add("line",{x1,y1,x2,y2,stroke:"var(--muted)","stroke-width":1.6});
  add("text",{x:80,y:28,class:"lbl"},"Intrinsic (contact)");add("text",{x:600,y:28,class:"lbl"},"Extrinsic (tissue factor)");add("text",{x:330,y:248,class:"lbl"},"Common pathway");
  ar(110,64,110,104);ar(110,136,110,176);ar(144,192,286,262);ar(640,80,640,170);ar(606,186,354,262);ar(320,294,320,320);ar(354,336,470,336);ar(500,352,500,375);
  box("XII",110,48,"XII");box("XI",110,120,"XI");box("IX",110,192,"IX + VIIIa");box("VIII",210,150,"VIII");ar(176,150,144,186);
  box("TF",640,64,"Tissue factor");box("VII",640,186,"VIIa");
  box("X",320,278,"X → Xa");box("V",220,320,"Va");ar(254,320,286,320);box("II",320,336,"II → IIa");box("I",500,336,"Fibrinogen");box("XIII",500,388,"Fibrin (XIIIa)");
  box("C",800,200,"Protein C/S");box("AT",800,280,"Antithrombin");box("plasmin",800,360,"Plasmin");box("PLT",420,110,"Platelet surface");
  ar(748,200,354,330);ar(744,280,354,282);ar(764,360,534,388);
  add("text",{x:640,y:226,"font-size":"11",fill:"var(--muted)"},"inhibits Va, VIIIa");add("text",{x:600,y:300,"font-size":"11",fill:"var(--muted)"},"inhibits IIa, Xa");add("text",{x:610,y:380,"font-size":"11",fill:"var(--muted)"},"lyses fibrin");
  if(hl.includes("IIa")||hl.includes("Xa")){["Xa","IIa"].forEach(id=>{if(hl.includes(id)){const y=id==="Xa"?278:336;add("rect",{x:286,y:y-16,width:68,height:32,rx:7,fill:"var(--abp)","fill-opacity":0.22,stroke:"var(--abp)","stroke-width":3})}})}
  $("#cc-r").innerHTML=`<b>${nm}.</b> ${txt}`}
 seg($("#cc-sel"),Object.entries(CC).map(([k,v])=>[k,v[0]]),drawCC,"none");

 /* 2. TEG */
 const TE={n:[6,62,62,2,"Normal kaolin TEG."],hep:[16,45,55,2,"Heparin or factor deficiency: long R (compare heparinase cup or INTEM/HEPTEM)."],plt:[6,50,38,2,"Thrombocytopenia or platelet dysfunction: normal R, low MA."],fib:[7,35,45,3,"Hypofibrinogenaemia: slow build-up (small α, long K) and lower MA; FIBTEM low."],lys:[6,62,60,40,"Hyperfibrinolysis: normal start then collapse of amplitude (LY30 > 8%): tranexamic acid."],hyper:[3,75,78,1,"Hypercoagulable (postoperative, cancer, pregnancy): short R, steep α, high MA."],dic1:[3.5,72,72,18,"DIC early: hypercoagulable with increased lysis."],dic2:[14,30,30,10,"DIC late / dilutional: long R, flat α, low MA (consumption)."]};
 function setTE(k){const v=TE[k];["r","a","m","l"].forEach((id,i)=>$("#te-"+id).value=v[i]);$("#te-rd").dataset.note=v[4];drawTE()}
 function drawTE(){const R=+$("#te-r").value,A=+$("#te-a").value,M=+$("#te-m").value,L=+$("#te-l").value;out("te-r",R);out("te-a",A+"°");out("te-m",M);out("te-l",L+"%");
  const slope=Math.tan(A*Math.PI/180)*2,kk=Math.max(0.3,M/(slope*2.2));const amp=t=>{if(t<R)return 0;const x=t-R;let a=M*(1-Math.exp(-x/kk*0.9));const tMA=R+kk*4;if(t>tMA){const f=Math.min(1,(t-tMA)/30);a=a*(1-L/100*f*(L>15?1.6:1))}return Math.max(0,a)};
  const P=plot($("#te"),{w:900,h:300,x0:0,x1:70,y0:-45,y1:45,xt:[0,10,20,30,40,50,60,70],yt:[-40,-20,0,20,40],xl:"Time (min)",yl:"Amplitude (mm)"});
  const ts=range(0,70,500);P.add("path",{d:ts.map((t,i)=>(i?"L":"M")+P.X(t)+" "+P.Y(amp(t)/2)).join(" ")+" "+ts.slice().reverse().map(t=>"L"+P.X(t)+" "+P.Y(-amp(t)/2)).join(" ")+"Z",fill:"var(--abp)","fill-opacity":.18,stroke:"var(--abp)","stroke-width":2});
  P.add("line",{x1:P.X(R),x2:P.X(R),y1:P.Y(-40),y2:P.Y(40),stroke:"var(--muted)","stroke-dasharray":"4 4"});P.text(R+0.5,40,"R",{fill:"var(--ink)"});
  let kt=R;for(let t=R;t<70;t+=0.05){if(amp(t)>=20){kt=t;break}}P.add("line",{x1:P.X(kt),x2:P.X(kt),y1:P.Y(-40),y2:P.Y(40),stroke:"var(--muted)","stroke-dasharray":"2 4"});P.text(kt+0.5,34,"K",{fill:"var(--ink)"});
  P.text(R+kk*4,M/2+4,"MA "+M,{fill:"var(--abp)"});
  const iss=[];if(R>8)iss.push(R>12?"Long R: factor deficiency or heparin → FFP/PCC (protamine if heparin)":"Borderline long R");if(R<4)iss.push("Short R: hypercoagulable");if(A<45)iss.push("Small α: low fibrinogen (± platelets) → fibrinogen");if(M<50)iss.push(M<40?"Low MA: platelets ± fibrinogen → check FIBTEM; platelets if FIBTEM normal":"Borderline MA");if(M>73)iss.push("High MA: hypercoagulable");if(L>8)iss.push("LY30 > 8%: hyperfibrinolysis → tranexamic acid");
  $("#te-rd").innerHTML=`${$("#te-rd").dataset.note||""} K ≈ ${(kt-R).toFixed(1)} min. ${iss.length?"<b>"+iss.join(". ")+".</b>":"All parameters within the normal kaolin range (R 4–8, K 1–4, α 47–74°, MA 55–73, LY30 < 8%)."} ROTEM equivalents: CT, CFT, MCF, ML.`}
 seg($("#te-pre"),[["n","Normal"],["hep","Heparin / factors"],["plt","Low platelets"],["fib","Low fibrinogen"],["lys","Hyperfibrinolysis"],["hyper","Hypercoagulable"],["dic1","DIC early"],["dic2","DIC late"]],setTE,"n");["r","a","m","l"].forEach(k=>$("#te-"+k).oninput=()=>{$("#te-rd").dataset.note="";drawTE()});

 /* 3. Dilutional coagulopathy */
 const DC={rbc:["Red cells + crystalloid only",0,0,0,"Factors and fibrinogen fall exponentially: fibrinogen reaches 1.5 g/L after ~1 blood volume and 1.0 after ~1.4; platelets reach 50 after ~2 blood volumes."],r21:["RBC:FFP 2:1",0.33,0,0,"Plasma slows the factor decline but fibrinogen still drifts down (FFP fibrinogen ~2 g/L): add fibrinogen."],r11:["RBC:FFP:PLT 1:1:1",0.5,0.45,0.3,"Haemostatic resuscitation keeps factors ~50–60% and platelets above ~80, although plasma never fully replaces blood because of the dilution from anticoagulant and additive solutions."]};
 function drawDC(k){const [nm,ffp,plt,fibx,txt]=DC[k];const P=plot($("#dc"),{x0:0,x1:3,y0:0,y1:110,xt:[0,0.5,1,1.5,2,2.5,3],yt:[0,25,50,75,100],xl:"Blood volumes replaced",yl:"% of starting level"});
  const fac=n=>100*((ffp*0.75)+(1-ffp*0.75)*Math.exp(-n)),fib=n=>100*((ffp*0.55+fibx*0.2)+(1-(ffp*0.55+fibx*0.2))*Math.exp(-n)),pl=n=>100*((plt*0.75)+(1-plt*0.75)*Math.exp(-n*0.85));
  P.line(range(0,3).map(n=>[n,fac(n)]),{stroke:"var(--abp)"});P.line(range(0,3).map(n=>[n,fib(n)]),{stroke:"var(--etco2)"});P.line(range(0,3).map(n=>[n,pl(n)]),{stroke:"var(--nibp)"});
  P.add("line",{x1:P.X(0),x2:P.X(3),y1:P.Y(50),y2:P.Y(50),stroke:"var(--muted)","stroke-dasharray":"4 4"});P.text(2.2,53,"fibrinogen 1.5 g/L (from 3)",{"font-size":"10"});
  P.add("line",{x1:P.X(0),x2:P.X(3),y1:P.Y(20),y2:P.Y(20),stroke:"var(--muted)","stroke-dasharray":"4 4"});P.text(2.2,23,"platelets 50 (from 250)",{"font-size":"10"});
  P.text(0.1,fac(0.3)+4,"factors",{fill:"var(--abp)"});P.text(0.9,fib(1)-6,"fibrinogen",{fill:"var(--etco2)"});P.text(1.8,pl(1.8)+5,"platelets",{fill:"var(--nibp)"});
  $("#dc-r").innerHTML=`<b>${nm}.</b> ${txt}`}
 seg($("#dc-sel"),Object.entries(DC).map(([k,v])=>[k,v[0]]),drawDC,"rbc");

 /* 4. Hct and DO2 */
 function drawHV(){const h=+$("#hv-h").value;out("hv-h",h+"%");
  const visc=x=>1.2*Math.exp(0.025*x),flow=x=>1/visc(x),do2=x=>x*flow(x),n=do2(42);
  const P=plot($("#hv"),{x0:10,x1:65,y0:0,y1:130,xt:[10,20,30,40,50,60],yt:[0,25,50,75,100,125],xl:"Haematocrit %",yl:"% of normal"});
  P.line(range(10,65).map(x=>[x,do2(x)/n*100]),{stroke:"var(--abp)"});P.line(range(10,65).map(x=>[x,visc(x)/visc(42)*100]),{stroke:"var(--nibp)","stroke-dasharray":"5 4"});P.line(range(10,65).map(x=>[x,x/42*100]),{stroke:"var(--spo2)","stroke-dasharray":"2 4"});
  P.text(52,do2(52)/n*100+6,"DO2 (fixed driving pressure)",{fill:"var(--abp)","font-size":"11"});P.text(55,visc(60)/visc(42)*100-6,"viscosity",{fill:"var(--nibp)","font-size":"11"});P.text(12,30,"O2 content",{fill:"var(--spo2)","font-size":"11"});
  P.dot(h,do2(h)/n*100,"var(--ink)","",0,0);
  $("#hv-r").innerHTML=`Hct ${h}%: O2 content ${(h/42*100).toFixed(0)}%, viscosity ${(visc(h)/visc(42)*100).toFixed(0)}%, estimated DO2 ${(do2(h)/n*100).toFixed(0)}% of normal. With constant perfusion pressure, falling viscosity raises flow, so DO2 is well preserved down to Hct ~30% and peaks near 35–40% (simplified model; real compensation also includes higher cardiac output and extraction).`}
 $("#hv-h").oninput=drawHV;drawHV();

 /* 5. Storage lesion */
 function drawSL(){const d=+$("#sl-d").value;out("sl-d",d);
  const K=t=>3+42*(1-Math.exp(-t/16)),dpg=t=>100*Math.exp(-t/7),ph=t=>7.0-0.0115*t,atp=t=>100-1.6*t,hem=t=>0.05+0.015*t;
  const P=plot($("#sl"),{x0:0,x1:35,y0:0,y1:100,xt:[0,7,14,21,28,35],yt:[0,25,50,75,100],xl:"Days of storage",yl:"% / mmol/L"});
  P.line(range(0,35).map(t=>[t,K(t)]),{stroke:"var(--abp)"});P.line(range(0,35).map(t=>[t,dpg(t)]),{stroke:"var(--spo2)"});P.line(range(0,35).map(t=>[t,atp(t)]),{stroke:"var(--etco2)"});
  P.text(28,K(28)+4,"supernatant K⁺ mmol/L",{fill:"var(--abp)","font-size":"11"});P.text(8,dpg(8)+6,"2,3-DPG %",{fill:"var(--spo2)","font-size":"11"});P.text(22,atp(22)+5,"ATP %",{fill:"var(--etco2)","font-size":"11"});
  P.add("line",{x1:P.X(d),x2:P.X(d),y1:P.Y(0),y2:P.Y(100),stroke:"var(--ink)","stroke-dasharray":"4 3"});
  $("#sl-r").innerHTML=`Day ${d}: supernatant K⁺ ≈ ${K(d).toFixed(0)} mmol/L, 2,3-DPG ≈ ${dpg(d).toFixed(0)}% (left-shifted ODC), ATP ≈ ${atp(d).toFixed(0)}%, pH ≈ ${ph(d).toFixed(2)}, haemolysis ≈ ${hem(d).toFixed(2)}% (limit 0.8%). K⁺ load matters with rapid transfusion, neonates and irradiated units; 2,3-DPG recovers 24–72 h after transfusion.`}
 $("#sl-d").oninput=drawSL;drawSL();

 /* 6. Tryptase */
 function drawTY(){const t=+$("#ty-t").value,pk=+$("#ty-p").value;out("ty-t",t.toFixed(2)+" h");out("ty-p",pk);
  const base=5,tr=x=>base+(pk-base)*(x<0.75?smooth(x,0,0.75):Math.pow(0.5,(x-0.75)/2)),hi=x=>100*(x<0.08?smooth(x,0,0.08):Math.exp(-(x-0.08)/0.25));
  const P=plot($("#ty"),{x0:0,x1:26,y0:0,y1:Math.max(pk+10,30),xt:[0,1,2,4,6,12,24],yt:[0,Math.round(pk/2),pk],xl:"Hours after reaction",yl:"Tryptase µg/L"});
  P.line(range(0,26,400).map(x=>[x,tr(x)]),{stroke:"var(--abp)"});P.line(range(0,3,200).map(x=>[x,hi(x)/100*pk*0.8]),{stroke:"var(--nibp)","stroke-dasharray":"5 4","stroke-width":1.4});P.text(0.4,pk*0.78,"histamine (minutes)",{fill:"var(--nibp)","font-size":"11"});
  [[1,"1st"],[2,"2nd (1–2 h)"],[24,"baseline > 24 h"]].forEach(([x,l])=>{P.add("line",{x1:P.X(x),x2:P.X(x),y1:P.Y(0),y2:P.Y(pk+5),stroke:"var(--ecg)","stroke-dasharray":"3 3"});P.text(x+0.2,pk+3,l,{fill:"var(--ecg)","font-size":"10"})});
  P.dot(t,tr(t),"var(--ink)","",0,0);const thr=1.2*base+2;
  $("#ty-r").innerHTML=`Tryptase at ${t.toFixed(2)} h ≈ <b>${tr(t).toFixed(1)} µg/L</b> (baseline ${base}). Diagnostic rise needs > 20% + 2 µg/L above baseline (> ${thr.toFixed(1)}): ${tr(t)>thr?"detected":"missed"} at this time. Peak ~30 min–2 h, half-life ~2 h; samples taken after ~6 h may already be back to baseline.`}
 ["#ty-t","#ty-p"].forEach(s=>$(s).oninput=drawTY);drawTY();
}

ATLAS.register({id:"06",name:"Haematology & immunology",
  lede:"Haematology, transfusion, anticoagulation and immunology.",
  barsNote:"",
  bars:BARS,fam:FAM,slides:SLIDES,calcs:CALCS,tables:TABLES,cards:CARDS,fcf:FCF,viva:VIVA,quiz:QUIZ,crisis:CRISIS,
  sources:SRC,errata:ERR,refs:REFS,diagHTML:DIAG,initDiagrams,
  diagLede:"Six live diagrams: the cascade with drug and test overlays, a TEG/ROTEM interpreter with presets, dilutional coagulopathy by transfusion strategy, haematocrit and O2 delivery, the storage lesion, and tryptase timing."});
})();
