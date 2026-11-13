/* Stage 10 · Physics & equipment */
(function(){
const {plot,range,el,SVGNS,fmt,$,$$,seg}=ATLAS.h;

const BARS=[];

const FAM={units:["etco2","Units & gas laws"],flow:["spo2","Flow & measurement"],supply:["nibp","Gas supply & machine"],circ:["abp","Breathing systems, vaporisers, ventilators"],elec:["ecg","Electricity & special equipment"]};

const SLIDES=[
{f:"units",t:"SI units and definitions",b:`<ul class="clean"><li><b>Seven base units</b>: metre (length), kilogram (mass), second (time), ampere (current), kelvin (temperature), mole (amount of substance), candela (luminous intensity). Since 2019 all are defined by fixed physical constants (e.g. kilogram via Planck's constant).</li>
<li><b>Derived units</b>: newton (force, kg·m·s⁻²), pascal (pressure, N/m²), joule (energy or work, N·m), watt (power, J/s), coulomb (charge, A·s), volt (potential difference, W/A), ohm (resistance, V/A), farad (capacitance, C/V), henry (inductance), hertz (frequency, s⁻¹), tesla (magnetic flux density).</li>
<li><b>Pressure</b> = force / area. 1 kPa = 7.5 mmHg = 10.2 cmH2O; 1 atm = 101.325 kPa = 760 mmHg = 1.013 bar ≈ 14.7 psi; 1 bar = 100 kPa. <b>Gauge pressure</b> = absolute − atmospheric (cylinder gauges read gauge pressure).</li>
<li><b>Work</b> = force × distance (or pressure × volume change: work of breathing). <b>Power</b> = work / time. <b>Energy</b> forms: kinetic ½mv², potential mgh, electrical (VIt), heat.</li>
<li><b>Temperature</b>: kelvin = °C + 273.15; the triple point of water (273.16 K) is where solid, liquid and vapour coexist. <b>STP</b> = 273.15 K and 101.325 kPa; 1 mole of ideal gas occupies 22.4 L at STP. <b>SATP/BTPS/ATPS</b> conventions matter for gas volumes (lung volumes reported at BTPS: 37 °C, saturated).</li>
<li><b>Non-SI units</b> still used: mmHg, cmH2O, calorie (4.184 J), litre, °C. The mole is 6.022 × 10²³ particles (Avogadro's number).</li></ul>`,
p:"Classic opener: 'What is the SI unit of pressure? Define it. Convert 20 cmH2O to kPa' (≈ 2 kPa).",
v:"Define SI, list base units, derive the pascal from base units, then pressure conversions and gauge vs absolute."},
{f:"units",t:"The gas laws",b:`<ul class="clean"><li><b>Boyle</b>: at constant temperature, PV = constant (isothermal). Cylinder contents, bellows spirometers, lung volume by body plethysmography, gas expansion at altitude (pneumothorax, ETT cuffs, middle ear).</li>
<li><b>Charles</b>: at constant pressure, V ∝ T (absolute). <b>Gay-Lussac (third law)</b>: at constant volume, P ∝ T: cylinders in a fire explode; cylinder pressure rises in hot climates.</li>
<li><b>Combined/ideal gas equation</b>: PV = nRT (R = 8.314 J/K/mol). <b>Avogadro</b>: equal volumes of gases at the same temperature and pressure contain equal numbers of molecules; 1 mole = 22.4 L at STP.</li>
<li><b>Dalton</b>: in a mixture, each gas exerts the pressure it would exert if it alone occupied the volume; total = sum of partial pressures. Alveolar gas equation, Entonox.</li>
<li><b>Henry</b>: at constant temperature, the amount of gas dissolved in a liquid is proportional to its partial pressure above the liquid (dissolved O2 0.0232 mL/dL/kPa; decompression sickness; hyperbaric O2). Solubility falls as temperature rises.</li>
<li><b>Graham</b>: rate of diffusion ∝ 1/√(molecular weight). <b>Fick</b>: diffusion rate ∝ area × concentration gradient / thickness (× solubility/√MW for gases).</li>
<li><b>Critical temperature</b>: the temperature above which a substance cannot be liquefied however much pressure is applied. A gas is above, a vapour below, its critical temperature. Critical pressure is the pressure needed to liquefy at the critical temperature. O2 −119 °C (critical pressure 50 bar), N2O 36.5 °C (72 bar), CO2 31 °C (73 bar). Entonox has a <b>pseudocritical temperature</b> of −5.5 °C in the cylinder (−30 °C in pipelines): below it, N2O liquefies and separates (the first gas delivered is O2-rich, the last hypoxic). Store above 10 °C and invert several times before use.</li>
<li><b>Adiabatic changes</b> (no heat exchange): rapid compression heats (opening a cylinder valve quickly with oil or grease nearby causes fire); rapid expansion cools (Joule–Thomson effect: cryoprobes, frosting of N2O cylinders as the liquid absorbs latent heat).</li></ul>`,
p:"Worked example: a full size E O2 cylinder (water capacity 4.7 L) at 137 bar gauge gives about 4.7 × 137 ≈ 640–680 L at atmospheric pressure (compressibility makes real contents slightly higher than the ideal value).",
v:"State each law with conditions and a clinical example, then define critical temperature, vapour vs gas, pseudocritical temperature."},
{f:"flow",t:"Flow: laminar, turbulent and the Hagen–Poiseuille equation",b:`<ul class="clean"><li><b>Flow</b> = quantity passing a point per unit time (L/min); laminar flow has a parabolic velocity profile (centre velocity twice the mean).</li>
<li><b>Hagen–Poiseuille</b> (laminar, Newtonian fluid, rigid straight tube): Q = πΔPr⁴ / 8ηl. Flow ∝ r⁴: halving the radius cuts flow 16-fold. Depends on <b>viscosity</b> (η), not density. Resistance = 8ηl / πr⁴.</li>
<li><b>Turbulent flow</b>: eddies, flat velocity profile, flow ∝ √ΔP (ΔP ∝ Q²), depends on <b>density</b> (ρ) rather than viscosity, and on r⁵ approximately. Occurs at high flows, bends, branches, constrictions, irregular walls.</li>
<li><b>Reynolds number</b> Re = ρvd / η (dimensionless). &lt; 2000 laminar; &gt; 4000 turbulent (2000–4000 transitional, but flow becomes turbulent at lower Re at bends and orifices). Critical velocity = 2000η/ρd.</li>
<li><b>Heliox</b> (79% He / 21% O2): density ~0.43 g/L vs air 1.29 g/L (similar viscosity), so lower Re and less turbulent resistance through upper airway obstruction (stridor, tumours). Limits FiO2 to ≤ 0.3 at useful helium concentrations; flowmeters must be calibrated for heliox.</li>
<li><b>Clinical</b>: cannula flow (14G ~ 300 mL/min vs 22G ~ 35 mL/min, length matters too: short wide cannulas for rapid infusion), ETT size (resistance rises steeply below 6 mm ID; each 1 mm decrease adds much more work of breathing), small airway disease, warming fluids lowers viscosity, blood viscosity rises with haematocrit and cold.</li></ul>`,
p:"'Ventilating through different-sized ETTs, cannula flow and the physics of rotameters'. Use the flow diagram to show the laminar–turbulent transition and the heliox benefit.",
v:"Define laminar and turbulent flow, write both relationships with their variables, Reynolds number with the critical value, then clinical applications (cannulae, ETT, heliox)."},
{f:"flow",t:"Bernoulli, Venturi and Coanda",b:`<ul class="clean"><li><b>Bernoulli</b>: along a streamline of an ideal fluid, P + ½ρv² + ρgh is constant, so where velocity rises pressure falls. Conservation of energy.</li>
<li><b>Venturi effect</b>: at a constriction, velocity rises and pressure falls below atmospheric, entraining a second gas or fluid through a side port.</li>
<li><b>Entrainment ratio</b> = entrained flow / driving flow. Fixed-performance <b>Venturi masks</b> (HAFOE: high air flow oxygen enrichment) entrain a known amount of air to give a fixed FiO2, provided total flow exceeds peak inspiratory flow (~30–60 L/min, higher in respiratory distress). Valve colours (UK common): 24% blue 2 L/min, 28% white 4 L/min, 35% yellow 8 L/min, 40% red 10 L/min, 60% green 15 L/min.</li>
<li><b>Other applications</b>: nebulisers, Sanders injector (jet ventilation through a rigid bronchoscope: 4 bar O2 entrains air), suction devices, scavenging, Doppler velocity–pressure (modified Bernoulli: ΔP = 4v² across a stenotic valve), aortic stenosis.</li>
<li><b>Coanda effect</b>: a jet of fluid adheres to a nearby curved surface. Fluidic logic ventilators; unequal ventilation distal to airway branches; flow preferentially into one branch after a plaque.</li>
<li><b>Variable vs fixed performance O2 devices</b>: nasal cannulae and Hudson masks deliver variable FiO2 that depends on the patient's inspiratory flow; Venturi masks and high-flow nasal oxygen (HFNO, up to 60–70 L/min, heated, humidified, small PEEP and dead-space washout) give fixed FiO2.</li></ul>`,
p:"Use the Venturi diagram: choose the valve, then raise the patient's peak inspiratory flow above the total delivered flow to see FiO2 fall.",
v:"State Bernoulli, explain the Venturi principle, define entrainment ratio, then the mask and its limitations, other uses and Coanda."},
{f:"flow",t:"Measurement of gas volume and flow",b:`<ul class="clean"><li><b>Rotameter</b> (variable orifice, constant pressure difference): a bobbin floats in a tapered glass tube; the annulus widens with height. At low flows the annulus is long and narrow (tube-like): laminar, viscosity-dependent; at high flows it acts as an orifice: turbulent, density-dependent. Hence calibrated for a specific gas at 20 °C and 101.3 kPa. Read the top of a bobbin and the centre of a ball. Errors: static (antistatic coating), dirt, tube not vertical, bobbin sticking, back-pressure, cracked tube (O2 tube placed downstream/last so a leak cannot cause a hypoxic mixture).</li>
<li><b>Pneumotachograph</b> (fixed orifice, variable pressure): laminar flow through a resistance (Fleisch: parallel tubes; Lilly: mesh screen) so ΔP ∝ flow (Poiseuille); heated to prevent condensation. Integrate flow for volume. Variable-orifice versions are used in spirometry loops on ventilators.</li>
<li><b>Wright respirometer</b>: a rotating vane, unidirectional. Inertia makes it over-read at high flows and under-read at low flows; water condensation causes errors.</li>
<li><b>Hot-wire anemometer</b>: gas flow cools a heated wire, changing its resistance (measured with a Wheatstone bridge). Used on some ventilators; needs temperature compensation.</li>
<li><b>Ultrasonic flowmeters</b>: transit-time difference of ultrasound upstream vs downstream. <b>Peak flow meter</b> (variable orifice), <b>Benedict–Roth spirometer</b> (water-sealed bell: volumes, FRC by helium dilution), <b>vitalograph</b> (wedge bellows: FEV1, FVC).</li>
<li><b>Bourdon gauge</b> measures pressure: a coiled tube straightens as pressure rises, moving a pointer (cylinders, pipelines).</li></ul>`,
p:"Why is a rotameter gas-specific? Because the same bobbin height means different flows for gases of different viscosity (laminar, low flow) and density (turbulent, high flow).",
v:"For each device: principle, flow regime, accuracy and errors, where it is used."},
{f:"supply",t:"Medical gas cylinders",b:`<ul class="clean"><li><b>Construction</b>: molybdenum steel (lightweight versions: aluminium with carbon-fibre wrap). Tested every 5–10 years (hydraulic test, flattening, tensile, bend, impact; 1 in 100 cut up), with a coloured plastic ring showing the test year. Labelled with gas name, symbol, pressure, batch, expiry, hazard.</li>
<li><b>Colours (UK, EN 1089-3)</b>: O2 black body, white shoulder (new lightweight cylinders white bodies); N2O French blue; Entonox French blue body with blue and white quartered shoulders; air black or grey body with black and white quartered shoulders; CO2 grey; heliox black body with brown and white shoulders; helium brown.</li>
<li><b>Pressures</b> (gauge, 15 °C): O2, air, Entonox 137 bar (CD and HX sizes 230 bar); N2O 44 bar (liquid–vapour equilibrium, so the gauge stays constant until the liquid is gone, then falls quickly); CO2 50 bar.</li>
<li><b>Sizes (O2)</b>: CD 460 L (integral valve with flowmeter), E 680 L (on machines; water capacity 4.7 L), F 1360 L, HX 2300 L, J 6800 L (manifolds). N2O E holds 1800 L (3.4 kg liquid).</li>
<li><b>Filling ratio</b> (N2O, CO2) = mass of gas in the cylinder / mass of water the cylinder could hold: 0.75 in temperate climates, 0.67 in the tropics, leaving ullage so the liquid cannot expand to fill the cylinder and burst it. Contents of N2O cylinders are known only by weighing (tare weight is stamped).</li>
<li><b>Connections</b>: pin index system (PISS) on the yoke: O2 2 &amp; 5, N2O 3 &amp; 5, air 1 &amp; 5, Entonox 7, CO2 1 &amp; 6, heliox 2 &amp; 4. Bodok seal (neoprene with aluminium rim) makes the joint gas-tight. Never use oil or grease.</li>
<li><b>Safety</b>: store upright or flat, chained, away from heat, in a dry, ventilated room; open slowly; handle full and empty cylinders separately; clean hands (alcohol gel ignites in O2-rich conditions).</li></ul>`,
p:"Use the cylinder diagram: gauge pressure falls linearly with O2 use (Boyle) but stays flat with N2O until about 85–90% has been used (then the liquid is gone).",
v:"Construction, testing, colour coding, pressures and states, sizes and contents, filling ratio, pin index and Bodok seal, safe handling."},
{f:"supply",t:"Piped gases, VIE and oxygen concentrators",b:`<ul class="clean"><li><b>Vacuum-insulated evaporator (VIE)</b>: double-walled steel vessel with a vacuum and perlite insulation; liquid O2 at −150 to −170 °C and ~5–10 bar. Heat entering the vessel evaporates O2 (latent heat keeps it cold). Gas leaves the top, is warmed in a superheater and reduced to 4 bar for the pipeline. If demand rises, liquid is drawn off and evaporated in an extra heat exchanger. If pressure rises (low demand), a safety valve vents at 17 bar. Contents are measured by weight (liquid O2 mass) or a differential pressure gauge. 1 L liquid O2 ≈ 840 L gas.</li>
<li><b>Backup</b>: cylinder manifolds (two banks of J cylinders that switch automatically) and an emergency reserve manifold; hospitals must hold reserve stock.</li>
<li><b>Oxygen concentrators</b>: compress air to ~1.4 bar (137 kPa) and pass it through zeolite molecular sieves that adsorb nitrogen (pressure swing adsorption: two columns alternate). Produce up to ~93–95% O2 (the rest is argon); output falls if the sieve is overloaded. Used in remote and austere settings, at home and in some hospitals (Health Technical Memorandum HTM 02-01 allows "oxygen 93%").</li>
<li><b>Pipelines</b> (HTM 02-01): copper alloy, degreased; O2, N2O, air (medical air 4 bar; surgical air 7 bar for power tools), Entonox and vacuum. Wall terminal outlets use gas-specific <b>Schrader</b> probes (collar indexing), checked by a "tug test". Hoses are colour-coded and connect to the machine with non-interchangeable screw thread (<b>NIST</b>) fittings. Area valve service units isolate zones. Cross-connection after maintenance has killed patients: a qualified person must test and certify gas identity after any work.</li>
<li><b>N2O manifolds</b> leak: NHS audits found most purchased N2O was lost to the atmosphere. Many trusts have decommissioned piped N2O in favour of portable cylinders (NHS Nitrous Oxide Project).</li>
<li><b>Vacuum</b>: suction must generate −53 kPa (−400 mmHg) within 10 s and displace 40 L/min (theatre).</li></ul>`,
p:"A favourite drawing: VIE with insulation, superheater, safety valve (17 bar), pressure regulator (4 bar) and weighing balance.",
v:"Describe each source with its physics (latent heat, critical temperature, adsorption), then the pipeline system and its safety features."},
{f:"supply",t:"The anaesthetic machine and its safety features",b:`<ul class="clean"><li><b>High-pressure system</b>: cylinders (yokes with pin index), first-stage pressure regulators reduce cylinder pressure to ~4 bar (slightly below pipeline so the pipeline is used preferentially), non-return valves, Bourdon gauges.</li>
<li><b>Intermediate pressure</b>: pipeline inlets (NIST) at 4 bar; second-stage regulators on flowmeter inputs smooth fluctuations; the <b>oxygen failure alarm</b> (powered by O2 itself, e.g. Ritchie whistle: sounds ≥ 7 s at ≥ 60 dB when supply falls below ~200 kPa, and cuts off N2O, opening the breathing system to air on older machines); <b>oxygen flush</b> (35–75 L/min at ~4 bar, bypasses flowmeters and vaporisers: barotrauma and awareness risk).</li>
<li><b>Low-pressure system</b>: flow control valves and rotameters (O2 knob larger and ridged; O2 enters the back bar last, downstream, so a cracked tube cannot cause a hypoxic mixture); <b>hypoxic guard</b> (mechanical or pneumatic link: minimum FiO2 ~25% with N2O, e.g. Link-25); back bar with Selectatec interlocked vaporisers (only one on at a time); pressure relief valve on the back bar (~35 kPa) to protect flowmeters and vaporisers; common gas outlet (22 mm female / 15 mm male).</li>
<li><b>Modern workstations</b>: electronic flow control (virtual flowmeters with a backup O2 flowmeter), integrated ventilator, gas analysis, alarms, battery backup (≥ 30 min), self-test. O2 analyser on the inspiratory limb is mandatory.</li>
<li><b>Checking</b> (AAGBI "Checking anaesthetic equipment" 2012, under review): before each session check power, gas supplies (tug test, cylinders), O2 failure alarm, flowmeters and hypoxic guard, vaporisers (seated, filled, sealed, leak-free), breathing system (leak test, valves, two-bag test), ventilator, scavenging, monitors and alarms, airway equipment and suction; a self-inflating bag must be available. Record the check. Brief "first user" checks between cases: breathing system and monitor.</li>
<li><b>Hazards</b> remembered by the safety features: hypoxic mixture, wrong gas, high pressure, disconnection, awareness (empty vaporiser), pollution.</li></ul>`,
p:"Typical exam questions: 'Safety features of the anaesthetic machine'. Go from the wall/cylinder to the patient, naming the hazard each feature prevents.",
v:"Trace gas from source to common gas outlet, naming each component and the safety feature at each point, then the check."},
{f:"circ",t:"Breathing systems: Mapleson and the circle",b:`<ul class="clean"><li><b>Function</b>: deliver O2 and anaesthetic gases, remove CO2, with low resistance, low dead space, minimal rebreathing, humidity and heat conservation, ability to ventilate, scavenging, light and safe.</li>
<li><b>Classification</b>: open, semi-open, semi-closed (Mapleson), closed (circle at metabolic flow). Mapleson (1954) classified by position of fresh gas inlet, reservoir bag and APL valve.</li>
<li><b>Mapleson A (Magill; coaxial Lack)</b>: most efficient for spontaneous breathing (FGF ≈ alveolar minute ventilation, ~70 mL/kg/min; in practice 1 × MV) because dead-space gas is retained and alveolar gas vented. Inefficient for IPPV (2–3 × MV).</li>
<li><b>Mapleson B and C</b> (C = "Waters" bag for resuscitation and transfer): FGF 2–2.5 × MV for both modes; rebreathing.</li>
<li><b>Mapleson D (coaxial Bain: fresh gas in the inner tube)</b>: efficient for IPPV (70–100 mL/kg/min, 1–2 × MV); inefficient for spontaneous breathing (2–3 × MV, 150–200 mL/kg/min). Check the inner tube (Pethick test) because a disconnected inner tube creates huge dead space.</li>
<li><b>Mapleson E (Ayre's T-piece) and F (Jackson–Rees: E with an open-ended bag)</b>: children &lt; 20–25 kg; low resistance and dead space; FGF 2.5–3 × MV (minimum 3–4 L/min).</li>
<li><b>Humphrey ADE</b>: a lever switches between A (spontaneous) and D/E (controlled) function; efficient for both, with an optional soda lime canister.</li>
<li><b>Circle system</b>: fresh gas inlet, inspiratory and expiratory unidirectional valves, limbs, Y-piece, reservoir bag, APL valve and CO2 absorber; vaporiser outside the circle. Allows low flow (0.5–1 L/min), minimal flow (&lt; 0.5) or closed (metabolic, ~250 mL/min O2). Advantages: economy, less pollution and carbon footprint, warm humidified gas. Disadvantages: slow change of inspired concentration at low FGF (time constant = system volume / FGF, e.g. 6 L ÷ 1 L/min = 6 min), accumulation of CO (dry absorbent), compound A, methane, acetone, ethanol, N2 (denitrogenate with high flow initially), sticking valves, resistance, more connections to leak. Use gas analysis.</li></ul>`,
p:"Mnemonic: 'All Dogs Can Bite' for efficiency in spontaneous breathing (A > D > C > B); 'Dogs Bite Can Accordingly' for controlled (D > B > C > A).",
v:"Define the ideal system, draw A–F, give FGF requirements and why (gas distribution in expiratory pause), then the circle with its pros and cons."},
{f:"circ",t:"Carbon dioxide absorption",b:`<ul class="clean"><li><b>Soda lime</b>: ~75–80% calcium hydroxide, ~3% sodium hydroxide (activator), 14–19% water, silica for hardness; potassium hydroxide removed (UK 2000). Granules 4–8 mesh (balance between surface area and resistance/dust). Absorbs ~25 L CO2 per 100 g; usually change when the indicator changes over half the canister.</li>
<li><b>Reactions</b> (exothermic: heat and water produced): CO2 + H2O → H2CO3; H2CO3 + 2NaOH → Na2CO3 + 2H2O + heat; Na2CO3 + Ca(OH)2 → CaCO3 + 2NaOH. Net: CO2 + Ca(OH)2 → CaCO3 + H2O + heat.</li>
<li><b>Indicators</b>: ethyl violet (white to purple), phenolphthalein (white to pink), Clayton yellow (pink to yellow). Colour may revert on resting ("regeneration") even though capacity is used.</li>
<li><b>Problems</b>: compound A with sevoflurane (more with strong bases, low flow, high temperature, dry absorbent); carbon monoxide with desflurane, enflurane, isoflurane over <b>desiccated</b> absorbent (left over the weekend with gas flowing); fires with sevoflurane and desiccated Baralyme (withdrawn); trichloroethylene produced dichloroacetylene (cranial nerve palsies, historical); dust; channelling.</li>
<li><b>Alternatives</b>: Amsorb (calcium hydroxide + calcium chloride, no strong base: no compound A or CO, but lower capacity), lithium hydroxide (submarines, spacecraft), membrane and zeolite systems.</li>
<li><b>Exhaustion signs</b>: rising inspired CO2 (capnograph baseline above zero), then hypercapnia, tachycardia, hypertension, sweating.</li></ul>`,
p:"A classic picture question: show a canister with a colour change, then ask the chemistry, indicators and why granule size is 4–8 mesh.",
v:"Composition, reactions, indicators, problems with agents, alternatives, how you detect exhaustion."},
{f:"circ",t:"Vaporisers",b:`<ul class="clean"><li><b>Saturated vapour pressure (SVP)</b>: pressure exerted by a vapour in equilibrium with its liquid at a given temperature; rises with temperature; boiling occurs when SVP = ambient pressure. Sevoflurane 22.7 kPa, isoflurane 33 kPa, halothane 32 kPa, desflurane 89 kPa at 20 °C.</li>
<li><b>Plenum (variable bypass) vaporisers</b> (Tec 5, Tec 7, Dräger Vapor 2000): fresh gas splits between a bypass and a vaporising chamber with wicks (saturation). <b>Splitting ratio</b> sets the output (1% isoflurane ≈ 1 : 46 chamber:bypass). Output % = chamber vapour flow / total flow.</li>
<li><b>Temperature compensation</b>: evaporation absorbs latent heat, cooling the liquid and lowering SVP. Countered by a heat sink (copper or brass, high specific heat capacity and conductivity) and a bimetallic strip or expanding bellows that changes the splitting ratio.</li>
<li><b>Flow compensation</b>: wicks and baffles ensure saturation; accurate from ~0.5 to 15 L/min.</li>
<li><b>Pumping effect</b>: intermittent back-pressure (IPPV, O2 flush) compresses gas in the chamber; on release, vapour-laden gas enters the bypass, increasing output at low flows and low dial settings. Prevented by a long inlet tube, small chamber, non-return valve on the common gas outlet.</li>
<li><b>Altitude</b>: a plenum vaporiser delivers the same <b>partial pressure</b> (so the same clinical effect) although the % concentration rises. The Tec 6 delivers a fixed % so partial pressure falls; increase the dial: required dial = sea-level dial × 101.3 / ambient kPa.</li>
<li><b>Desflurane Tec 6</b>: BP 22.8 °C, so a plenum would boil. Electrically heated sump at 39 °C and ~2 atm (SVP ~200 kPa); pressure-regulated injection of vapour into the fresh gas proportional to FGF (dual-circuit, measured flow). Needs electricity; warm-up; alarms; tilt protection.</li>
<li><b>Other types</b>: Aladin cassette (GE: electronic control, cassette per agent including desflurane), direct injection (Dräger DIVA, Maquet), draw-over (low resistance: Oxford Miniature Vaporiser, EMO, Diamedica: austere settings with a self-inflating bag), copper kettle (historical measured flow).</li>
<li><b>Safety</b>: agent-specific keyed fillers (Quik-Fil sevoflurane, Saf-T-Fill desflurane), colour coding (sevoflurane yellow, isoflurane purple, desflurane blue, halothane red, enflurane orange), interlocks, anti-spill.</li></ul>`,
p:"Use the vaporiser diagram: choose agent, temperature, altitude and a wrong-agent filling. The output change from isoflurane in a halothane vaporiser is small (SVPs similar); the clinical difference comes from potency.",
v:"SVP and latent heat, draw a plenum vaporiser and label it, splitting ratio, temperature and flow compensation, pumping effect, altitude, then Tec 6."},
{f:"circ",t:"Ventilators and resuscitation bags",b:`<ul class="clean"><li><b>Classification</b>: by power source (pneumatic, electric), drive (bellows: bag-in-bottle; piston; turbine), cycling (time, volume, pressure, flow), and <b>Mapleson's classification</b> as <b>pressure generators</b> (low driving pressure: flow falls as lung pressure rises; compensates for leaks; tidal volume varies with compliance) or <b>flow generators</b> (high driving pressure: delivers a set flow whatever the compliance; volume constant).</li>
<li><b>Phases</b>: inspiration, change from inspiration to expiration (cycling), expiration, change to inspiration (triggering).</li>
<li><b>Modes</b>: volume control (constant flow, set VT), pressure control (decelerating flow, set pressure), PRVC/volume-guaranteed pressure, SIMV, pressure support (patient-triggered, flow-cycled at ~25% of peak), CPAP, APRV, high-frequency oscillation and jet ventilation.</li>
<li><b>Anaesthetic ventilators</b>: bag-in-bottle with <b>ascending (standing) bellows</b> (collapse visibly on disconnection: safer) vs descending (hanging) bellows (fill by gravity even if disconnected). Piston ventilators (Dräger) with fresh-gas decoupling. Penlon Nuffield 200: time-cycled flow generator; a Newton valve converts it to a pressure generator for children &lt; 10 kg on a T-piece. Minute volume dividers (Manley): fresh gas powers the ventilator.</li>
<li><b>Self-inflating bag</b> (Ambu): non-rebreathing valve (Ruben, Ambu E), O2 reservoir (FiO2 up to ~0.85–0.9 at 10–15 L/min with reservoir), PEEP valve, pressure relief (paediatric ~40 cmH2O). Works without gas supply: always available.</li>
<li><b>Ventilator alarms</b>: high and low pressure, low volume, disconnection (pressure or volume monitors), apnoea, power and gas supply failure.</li></ul>`,
p:"Describe a flow generator vs pressure generator by what happens when compliance halves (volume kept vs volume falls).",
v:"Classify (drive, cycling, Mapleson), modes, anaesthetic ventilator types with bellows, Newton valve, resuscitation bags."},
{f:"circ",t:"Scavenging and theatre pollution",b:`<ul class="clean"><li><b>Why</b>: occupational exposure (possible effects on fertility, fetus, haematology with N2O, headaches, fatigue) and COSHH regulations. UK workplace exposure limits (8-h TWA, EH40): N2O 100 ppm, isoflurane 50 ppm, enflurane 50 ppm, halothane 10 ppm (none set for sevoflurane or desflurane).</li>
<li><b>Components</b>: collecting system (APL valve, ventilator exhaust; 30 mm connectors to prevent misconnection with 15/22 mm), transfer tubing, receiving system (reservoir bag or open reservoir with visual flow indicator; positive and negative pressure relief valves), disposal system.</li>
<li><b>Active systems</b> (AGSS, BS EN ISO 7396-2): fan or pump generating low pressure, high flow (75–130 L/min peak), with protection so the patient's airway is never exposed to suction. <b>Passive</b>: tubing to outside (≤ 0.5 cmH2O resistance; affected by wind). <b>Semi-active</b>: tubing into the theatre ventilation extract. Absorptive (activated charcoal: cannot absorb N2O; used in MH to remove volatile).</li>
<li><b>Other measures</b>: theatre air changes (15–25 per hour; laminar flow ultra-clean theatres more), low-flow anaesthesia, TIVA, avoid N2O, cuffed tubes, switching off flows when disconnecting, maintenance of manifolds.</li>
<li><b>Environment</b>: scavenged gas is vented to the atmosphere. Anaesthetic gases make up ~2% of NHS England's carbon footprint. Ranking by GWP100: desflurane 2540, N2O 273 (ozone depleting), isoflurane 510, sevoflurane 130. Volatile capture technologies (zeolite canisters) are emerging.</li></ul>`,
p:"Compare the 'carbon cost' of 1 h of desflurane at 1 L/min (~70 kg CO2e) with sevoflurane (~1 kg CO2e) using the Stage 8 calculator.",
v:"Rationale and limits, components with connectors and valves, active vs passive vs absorptive, other measures, environmental impact."},
{f:"units",t:"Heat, temperature and perioperative heat loss",b:`<ul class="clean"><li><b>Heat</b> is energy (J); <b>temperature</b> is the tendency to transfer heat (K). <b>Heat capacity</b> = heat needed to raise an object by 1 K (J/K); <b>specific heat capacity</b> = per kg (water 4.18 kJ/kg/K, body ~3.5, blood 3.6, air ~1.0 kJ/kg/K).</li>
<li><b>Latent heat</b> = heat absorbed or released at a phase change without temperature change; specific latent heat of vaporisation of water ~2.26 kJ/g at 100 °C, ~2.4 kJ/g at 37 °C (sweating, evaporation from wounds and airways, vaporisers cooling, N2O cylinders frosting).</li>
<li><b>Heat loss under anaesthesia</b>: radiation ~40% (infrared to colder surroundings; proportional to T⁴ difference), convection ~30% (air currents; laminar flow theatres), evaporation ~15% (skin, open cavities, airways), respiration ~10% (humidifying and warming dry gases), conduction ~5% (cold table, fluids).</li>
<li><b>Phases of hypothermia under GA</b>: redistribution (first hour, 1–1.5 °C: vasodilation moves heat from core to periphery), linear (heat loss > production: 2–3 h), plateau (vasoconstriction restores balance or neuraxial patients continue losing). Thresholds widen from ±0.2 °C to ~4 °C under anaesthesia.</li>
<li><b>Consequences</b>: wound infection, coagulopathy and bleeding, MI and arrhythmias, prolonged drug action (NMB, volatiles), shivering (O2 consumption up 200–400%), delayed discharge, altered drug metabolism.</li>
<li><b>Prevention (NICE CG65)</b>: measure temperature before induction (do not induce below 36 °C unless urgent), forced-air warming if surgery &gt; 30 min or high risk, warm IV fluids and blood &gt; 500 mL to 37 °C, warm irrigation, pre-warming, raise theatre temperature (≥ 21 °C, higher for neonates and burns), cover the patient, HMEs, measure every 30 min, maintain ≥ 36 °C into recovery.</li></ul>`,
p:"Calculator: 2 L of crystalloid at 20 °C given to a 70 kg patient lowers mean body temperature by ~0.6 °C (energy 2 × 4.18 × 17 = 142 kJ; 142 / (70 × 3.5)).",
v:"Define the terms, list heat-loss mechanisms with percentages, phases of hypothermia, consequences, prevention with guideline."},
{f:"units",t:"Humidity and humidification",b:`<ul class="clean"><li><b>Absolute humidity</b>: mass of water vapour per unit volume of gas (mg/L or g/m³). <b>Relative humidity</b>: ratio of water vapour present to that required to saturate it at the same temperature (%). <b>Dew point</b>: the temperature at which gas becomes saturated and water condenses.</li>
<li>Saturated air holds 17 mg/L at 20 °C and 44 mg/L at 37 °C (SVP water 2.3 and 6.3 kPa). The isothermic saturation boundary is normally just below the carina. Dry medical gases (pipelines are dry to prevent corrosion and freezing) bypassing the upper airway via an ETT cause mucociliary dysfunction, thick secretions, tube blockage, atelectasis, heat loss (2.4 kJ per g of water evaporated).</li>
<li><b>Hygrometers</b>: hair hygrometer (relative humidity 15–85%: hair lengthens as humidity rises), wet and dry bulb (evaporative cooling of the wet bulb: tables give RH), Regnault's (dew point: silver tube cooled by ether evaporation), electrical transducers (capacitance or resistance change), mass spectrometry.</li>
<li><b>Humidifiers</b>:
<ul class="clean"><li><b>HME</b> (passive): hygroscopic (calcium or lithium chloride coated paper or foam) or hydrophobic membrane; HMEF also filters bacteria and viruses. 60–70% efficiency (inspired 25–35 mg/L). Adds dead space (~50–90 mL adult) and resistance; can block with secretions or nebulised drugs; needs 15–20 min to reach efficiency.</li>
<li><b>Heated water bath</b> (active): 100% humidity at 37 °C; heated wire circuits prevent rainout; risks of scalding, overhydration, infection (bath at 60 °C or above inhibits bacteria), electrical hazard.</li>
<li><b>Nebulisers</b>: gas-driven (Venturi/Bernoulli), spinning disc, ultrasonic (piezoelectric crystal at ~2 MHz: droplets 1–2 µm, reach alveoli, risk of overhydration). Droplet size determines deposition: 5–10 µm trachea and bronchi; 1–5 µm alveoli.</li>
<li>Cold-water bubble humidifiers (low efficiency), HFNO with heated humidifier.</li></ul></li></ul>`,
p:"Use the humidity calculator: water and heat needed to humidify 6 L/min of dry gas to body conditions (~16 g/h of water and ~38 kJ/h).",
v:"Definitions with values, why humidify, how to measure, then each humidifier with principle, performance and problems."},
{f:"elec",t:"Electricity basics",b:`<ul class="clean"><li><b>Current</b> (A) = rate of flow of charge (1 C/s). <b>Potential difference</b> (V) = energy per unit charge (J/C). <b>Resistance</b> (Ω): Ohm's law V = IR. <b>Power</b> P = VI = I²R (W).</li>
<li><b>Direct current</b> flows one way (batteries, defibrillator capacitor). <b>Alternating current</b>: UK mains 230 V RMS (peak ~325 V), 50 Hz (USA 110–120 V, 60 Hz).</li>
<li><b>Capacitor</b>: two conducting plates separated by an insulator (dielectric) storing charge (Q = CV) and energy (½CV²). <b>Capacitive reactance</b> X<sub>C</sub> = 1 / 2πfC: passes high frequencies, blocks DC and low frequencies (high-pass filters, isolating capacitors in diathermy, defibrillator). Stray capacitance couples mains to patients and equipment (interference, leakage current).</li>
<li><b>Inductor</b>: a coil storing energy in a magnetic field (½LI²). <b>Inductive reactance</b> X<sub>L</sub> = 2πfL: opposes high frequencies and changes in current (low-pass, defibrillator waveform shaping, transformers, eddy currents).</li>
<li><b>Impedance</b> (Z): total opposition to AC: resistance + reactance (frequency-dependent). <b>Transformers</b> step voltage up or down (V proportional to turns ratio) and provide isolation.</li>
<li><b>Wheatstone bridge</b>: four resistors with a galvanometer: detects small resistance changes (strain-gauge pressure transducers, hot-wire anemometers, thermistors; Stage 11).</li>
<li><b>Semiconductors and diodes</b> rectify AC to DC (defibrillator charging); thermocouples use the Seebeck effect (Stage 11).</li></ul>`,
p:"Know the frequency behaviour: capacitors pass high frequency (X_C falls), inductors block it (X_L rises). That explains isolating capacitors in diathermy and why diathermy at 1 MHz does not stimulate nerves.",
v:"Define each quantity with units, Ohm's law, AC vs DC, capacitor and inductor behaviour, impedance, transformers."},
{f:"elec",t:"Electrical safety",b:`<ul class="clean"><li><b>Effects of 50 Hz current</b> (hand to hand, for 1 s): 1 mA tingling; 5 mA pain; 10–20 mA tetanic contraction (cannot let go); 50 mA respiratory muscle tetany and severe pain; 100 mA–1 A ventricular fibrillation; &gt; 5 A sustained myocardial contraction (then may restart in sinus) and burns. DC VF threshold is higher (~500 mA).</li>
<li><b>Determinants</b>: current magnitude (I = V/R: wet skin ~1 kΩ vs dry ~100 kΩ), frequency (50 Hz is the most dangerous; above 100 kHz the current only heats), duration, pathway, <b>current density</b>.</li>
<li><b>Microshock</b>: current applied directly to the heart (central lines filled with saline, pacing wires, PA catheters) can cause VF at ~100 µA (50–150 µA). Hence leakage limits of 10 µA for cardiac (CF) applied parts.</li>
<li><b>Equipment classes</b> (IEC 60601): <b>Class I</b> earthed casing with fuses; <b>Class II</b> double or reinforced insulation, no earth needed; <b>Class III</b> internally powered or safety extra-low voltage (≤ 24 V AC / 50 V DC). <b>Types</b> by applied part: <b>B</b> (body; leakage ≤ 100 µA normal, 500 µA single fault), <b>BF</b> (floating/isolated applied part, same limits), <b>CF</b> (cardiac floating; ≤ 10 µA normal, 50 µA single fault). Defibrillator-proof symbols.</li>
<li><b>Protection in theatre</b>: isolating transformers (patient circuits float, so touching one live conductor does not complete a path to earth), residual current devices (RCD/ELCB: trip at ~30 mA imbalance within 30 ms), line isolation monitors, equipotential earthing (all metal at the same potential), antistatic flooring and footwear (moderate resistance), regular testing (PAT), avoiding multi-socket extensions, keeping fluids away.</li>
<li><b>Burns</b> from high current density: diathermy plate faults, alternative earth paths through ECG electrodes or metal contact; and from MRI induction loops.</li></ul>`,
p:"EDAIC-style: 'A nurse touches a faulty infusion pump and the patient's central line at the same time. What could happen and why?' (microshock, CF limits, equipotential earthing).",
v:"Effects by current, determinants, macro vs microshock, classes and types with leakage limits, protective measures."},
{f:"elec",t:"Defibrillators",b:`<ul class="clean"><li><b>Principle</b>: pass sufficient current through the myocardium to depolarise a critical mass simultaneously, allowing the SA node to resume control.</li>
<li><b>Circuit</b>: mains or battery → step-up transformer (~5000 V) → rectifier (diodes: AC to DC) → <b>capacitor</b> (stores up to ~400 J: E = ½CV²) → discharge switch → <b>inductor</b> prolongs and shapes the current pulse (monophasic damped sine) → paddles/pads → patient.</li>
<li><b>Stored vs delivered energy</b>: delivered energy is less because of losses in internal resistance; displayed energy is usually delivered into 50 Ω.</li>
<li><b>Waveforms</b>: monophasic (damped sine, 360 J) vs <b>biphasic</b> (truncated exponential, current reverses after ~5–6 ms; 120–200 J): higher first-shock success at lower energy, less myocardial injury, <b>impedance compensation</b> (adjusts voltage or duration).</li>
<li><b>Transthoracic impedance</b> (~50–150 Ω, typical 70–80 Ω) falls with larger pads, firm pressure, gel pads, expiration, repeated shocks, shaved chest. Current (not energy) defibrillates: I = V/R.</li>
<li><b>Practice (ERC/RCUK 2021)</b>: VF/pVT shocks 150–360 J biphasic per device (escalate if refractory), minimise pauses; synchronised cardioversion (shock on the R wave to avoid the vulnerable period on the T wave): AF 120–150 J biphasic (maximum energy for AF), atrial flutter and SVT 70–120 J; children 4 J/kg. Pads ≥ 8 cm from pacemakers or ICDs; anteroposterior positioning for AF and pacemaker patients. Oxygen sources away from the chest (fire). AEDs analyse rhythm automatically.</li>
<li><b>Implanted devices</b>: ICDs deliver internal shocks (~30–40 J); deactivate ICD therapies before surgery with monopolar diathermy above the umbilicus and use external pads.</li></ul>`,
p:"Draw the circuit and the two waveforms (Diagrams tab: energy, impedance and peak current).",
v:"Principle, circuit with function of each component, energy equation, waveforms, impedance, practical energies and synchronisation, devices."},
{f:"elec",t:"Surgical diathermy",b:`<ul class="clean"><li><b>Principle</b>: high-frequency AC (0.4–10 MHz; typically ~0.5–1 MHz) passed through tissue produces heat (I²R) where <b>current density</b> is high. At these frequencies there is no nerve or muscle stimulation (Na⁺ channels cannot respond) and no risk of VF.</li>
<li><b>Monopolar</b>: small active electrode (very high current density: cutting or coagulation) with current returning through the patient to a large <b>patient plate</b> (low current density, no heating); power up to ~400 W. <b>Bipolar</b>: current passes only between the two forceps tips (lower power ~40–50 W), no plate needed; safer with pacemakers and in extremities (penis, fingers), for neurosurgery.</li>
<li><b>Waveforms</b>: <b>cutting</b>: continuous sine wave, high current and low voltage, vaporises cells; <b>coagulation</b>: pulsed (intermittent bursts) high-voltage waveform, desiccation and fulguration; <b>blend</b> combines both.</li>
<li><b>Isolation</b>: modern units have floating (isolated) outputs via transformers and an isolating capacitor that has low impedance at 1 MHz but high impedance at 50 Hz, preventing mains-frequency current flow through the patient. Return electrode monitoring (split plates measure contact impedance and stop output if poor).</li>
<li><b>Hazards</b>: burns (poor plate contact (place over well-perfused muscle, away from bone and metal implants, shave), alternate return paths through ECG electrodes, metal table contact), fires (alcohol skin prep, bowel gas, O2-enriched drapes), interference with monitors and pacemakers or ICDs (oversensing: inhibition; reprogramming; use bipolar or short bursts, plate positioned so the current path avoids the device), surgical smoke (carcinogens, viruses: smoke evacuation), capacitive coupling in laparoscopic instruments.</li></ul>`,
p:"Why doesn't diathermy cause VF? Frequency: above ~100 kHz the depolarisation threshold rises so steeply that only heating occurs.",
v:"Principle with frequency, current density, monopolar vs bipolar, waveforms, isolation, hazards and pacemaker management."},
{f:"elec",t:"Lasers and airway fire",b:`<ul class="clean"><li><b>LASER</b> = light amplification by stimulated emission of radiation. A lasing medium (gas, liquid, solid) is energised by a pumping source (flash lamp, electricity, another laser) to <b>population inversion</b>; photons stimulate identical photons, amplified between two mirrors (one partially reflective). Laser light is <b>monochromatic</b> (one wavelength), <b>coherent</b> (in phase) and <b>collimated</b> (parallel, low divergence): high power density.</li>
<li><b>Types</b>: CO2 (10 600 nm, far infrared, absorbed by water: precise cutting, airway and skin surgery; cannot pass through fibre-optics; superficial); Nd:YAG (1064 nm, near infrared, deep penetration and coagulation, fibre-optic delivery, tumour debulking); KTP (532 nm green, laryngeal); argon (488–514 nm, absorbed by haemoglobin and melanin: retina); pulsed dye (585 nm: port-wine stains); Ho:YAG (2100 nm: lithotripsy); Er:YAG (2940 nm: skin); excimer (ultraviolet: cornea).</li>
<li><b>Classes</b> (IEC 60825): 1, 1M, 2, 2M, 3R, 3B, 4. Surgical lasers are class 4 (eye and skin hazard from direct, reflected and diffuse beams; fire). Nominal ocular hazard distance (NOHD).</li>
<li><b>Safety</b>: laser protection adviser and supervisor, controlled area with warning signs and locked doors, wavelength-specific goggles (patient too: wet gauze or goggles), matt instruments, wet swabs, smoke evacuation, standby mode, fire extinguisher and water available.</li>
<li><b>Airway fire</b> (fire triangle: <b>fuel</b> (ETT, drapes, gauze, alcohol), <b>oxidiser</b> (O2, N2O), <b>ignition</b> (laser, diathermy)): prevention: lowest FiO2 (&lt; 0.3), no N2O, laser-resistant ETT (metal or metal-wrapped) with cuff filled with saline (± methylene blue) and wet pledgets, or tubeless techniques (jet ventilation, apnoeic), communication with surgeon before activation.</li></ul>`,
p:"Airway fire drill is in the Crisis tab: stop ventilation and gas, remove the tube, extinguish, re-establish the airway, bronchoscopy.",
v:"Principle and properties, types with wavelengths and uses, classes, hazards and safety measures, airway fire prevention and management."},
{f:"elec",t:"Ultrasound and Doppler",b:`<ul class="clean"><li><b>Ultrasound</b>: sound &gt; 20 kHz; medical imaging 2–15 MHz. <b>Piezoelectric</b> crystals (lead zirconate titanate) deform when voltage is applied (transmit) and generate voltage when compressed by returning echoes (receive). Pulses are emitted, then the probe listens; depth = speed × time / 2 (soft tissue assumed 1540 m/s).</li>
<li><b>Wavelength</b> = speed / frequency (1540 m/s ÷ 10 MHz = 0.15 mm). Higher frequency: better axial resolution but more attenuation (≈ 0.5–1 dB/cm/MHz), so less penetration: 10–15 MHz linear probes for superficial nerves and vessels; 2–5 MHz curvilinear and phased-array for deep, abdominal and cardiac imaging.</li>
<li><b>Acoustic impedance</b> Z = density × speed. Reflection depends on the impedance mismatch at interfaces: bone and air reflect almost everything (acoustic shadow), hence gel coupling. Echogenicity: hyperechoic (bright: bone, fascia, fat-tissue interfaces), hypoechoic, anechoic (fluid, vessels).</li>
<li><b>Artefacts</b>: acoustic shadowing, posterior acoustic enhancement (behind fluid), reverberation (A-lines between pleura and probe), mirror image, anisotropy (tendons and nerves vary with angle), refraction, side lobes, needle "bayonet" artefact.</li>
<li><b>Modes</b>: A (amplitude), B (brightness: 2-D greyscale), M (motion over time: TM-mode in lung sliding, valve motion), Doppler.</li>
<li><b>Doppler effect</b>: the frequency shift of sound reflected from moving red cells: <b>Δf = 2 f₀ v cos θ / c</b>. Angle of insonation should be &lt; 60° (cos 90° = 0: no signal). Continuous-wave (high velocities, no depth resolution), pulsed-wave (depth-specific, aliasing above the Nyquist limit: half the pulse repetition frequency), colour flow (BART: blue away, red towards), power Doppler, tissue Doppler. Uses: echo, oesophageal Doppler cardiac output (Stage 11), transcranial Doppler, vascular access, fetal heart.</li>
<li><b>Safety</b>: thermal index and mechanical index (cavitation); very safe at diagnostic energies; probe decontamination (high-level disinfection for TOE probes).</li></ul>`,
p:"Use the ultrasound diagram: slide the frequency to see the trade-off between penetration and resolution, and the angle to see Doppler under-reading.",
v:"Principle and piezoelectric effect, frequency–resolution–penetration trade-off, impedance and reflection, artefacts, modes, Doppler equation and its uses."},
{f:"elec",t:"MRI and CT",b:`<ul class="clean"><li><b>MRI physics</b>: a strong static magnetic field (1.5–3 T; Earth ~50 µT; superconducting coils cooled by liquid helium at 4 K) aligns hydrogen nuclei (protons), which precess at the Larmor frequency. RF pulses tip them; as they relax (T1 longitudinal, T2 transverse) they emit RF signals detected by coils. Gradient coils localise signal (and cause loud noise, up to 110 dB).</li>
<li><b>Hazards</b>: projectile (missile) effect of ferromagnetic objects (cylinders, laryngoscopes, scissors) in the fringe field; implant displacement, heating or malfunction (pacemakers: many now MR-conditional; aneurysm clips; cochlear implants); <b>RF heating burns</b> (loops of cable or skin-to-skin contact, ECG leads); acoustic injury (ear protection for all); <b>quench</b> (helium boils off: asphyxia and cold burns if venting fails; only for entrapment or fire, as the magnet takes days to restore); gadolinium (nephrogenic systemic fibrosis in severe CKD; anaphylaxis rare); remote, poorly lit, cold patient; claustrophobia.</li>
<li><b>Organisation</b>: MR zones I–IV with controlled access; screening checklist for staff and patients; equipment labelled <b>MR Safe</b> (no hazard), <b>MR Conditional</b> (safe under stated conditions, e.g. field strength, gauss line), <b>MR Unsafe</b>. MR-conditional anaesthetic machine, monitors (fibre-optic SpO2, non-ferrous ECG), infusion pumps behind the gauss line or shielded; long breathing system or MR-conditional ventilator.</li>
<li><b>Emergencies</b>: remove the patient from the scanner room to resuscitate (zone III or below); do not bring the arrest team or defibrillator into the magnet room.</li>
<li><b>CT</b>: X-ray tube rotates around the patient; attenuation measured in Hounsfield units (water 0, air −1000, bone +1000). Ionising radiation (CT head ~2 mSv, CT chest–abdomen–pelvis ~10 mSv vs annual background ~2.7 mSv in the UK): ALARP, lead aprons, distance (inverse square law), time. Contrast reactions and nephropathy; remote patient.</li></ul>`,
p:"'You are asked to anaesthetise a child for MRI: what are your concerns?' Use: patient, equipment, environment, staff, emergencies.",
v:"MRI physics in three sentences, hazards grouped (field, RF, gradients, cryogen, contrast, location), safety organisation and labels, emergency plan; CT and radiation safety."},
{f:"elec",t:"Cleaning, disinfection and sterilisation",b:`<ul class="clean"><li><b>Definitions</b>: <b>cleaning</b> physically removes contamination (essential first step); <b>disinfection</b> removes or kills most microorganisms but not necessarily spores (high-level disinfection kills all except large numbers of spores); <b>sterilisation</b> kills all microorganisms including spores (sterility assurance level 10⁻⁶).</li>
<li><b>Spaulding classification</b>: <b>critical</b> items enter sterile tissue or vascular system (surgical instruments, needles, central lines, regional block needles): sterilise or single-use. <b>Semi-critical</b> contact mucous membranes or non-intact skin (laryngoscope blades, endoscopes, TOE probes, ETTs, LMAs): high-level disinfection or sterilisation (single-use preferred). <b>Non-critical</b> contact intact skin (BP cuffs, stethoscopes): clean, low-level disinfection.</li>
<li><b>Methods</b>: steam <b>autoclave</b> (134–137 °C for 3 min at ~2.2 bar, or 121 °C for 15 min: moist heat; cheap, reliable; not for heat-sensitive items), dry heat, <b>ethylene oxide</b> (heat-sensitive items; toxic, flammable; long aeration), low-temperature hydrogen peroxide gas plasma, <b>gamma irradiation</b> (industrial, single-use items), chemical (glutaraldehyde (sensitiser, now largely replaced), peracetic acid, chlorine dioxide, ortho-phthalaldehyde), UV (surfaces), pasteurisation (washer-disinfectors at 70–90 °C).</li>
<li><b>Prions</b> (vCJD) resist conventional sterilisation (they bind to steel): single-use equipment for high-risk tissue contact (posterior eye, CNS, lymphoid tissue such as tonsils), quarantine of instruments.</li>
<li><b>Bacterial/viral filters</b> on breathing systems (HMEF), changing breathing systems per local policy (per patient or daily with a new filter for each patient).</li></ul>`,
p:"Spaulding's three categories are worth a sentence each with an anaesthetic example.",
v:"Define the three levels, Spaulding classification with examples, methods with conditions and pros and cons, prions."},
];

/* ---------- data ---------- */
const AGV={hal:["Halothane",32.3,50.2,0.75],iso:["Isoflurane",33.2,48.5,1.17],enf:["Enflurane",23.3,56.5,1.68],sevo:["Sevoflurane",22.7,58.5,1.8],des:["Desflurane",89.2,22.8,6.6]};
function svp(k,T){const [n,s20,bp]=AGV[k];const B=Math.log(101.325/s20)/(1/293.15-1/(bp+273.15));return s20*Math.exp(B*(1/293.15-1/(T+273.15)))}
const N2O_T=[[-20,18.2],[-10,23.6],[0,31.3],[10,40.4],[15,45.4],[20,50.6],[25,56.4],[30,63.1],[36.4,72.5]];
function n2oSVP(T){if(T>=36.4)return 72.5;for(let i=1;i<N2O_T.length;i++){if(T<=N2O_T[i][0]){const [t0,p0]=N2O_T[i-1],[t1,p1]=N2O_T[i];return p0+(p1-p0)*(T-t0)/(t1-t0)}}return 18.2}
const CYL={o2cd:["O2 CD (230 bar)",230,460,"o2"],o2e:["O2 E (137 bar)",137,680,"o2"],o2f:["O2 F (137 bar)",137,1360,"o2"],o2j:["O2 J (137 bar)",137,6800,"o2"],n2oe:["N2O E",44,1800,"n2o"],n2og:["N2O G",44,9000,"n2o"]};
const GAS={air:["Air",1.2,1.81e-5],o2:["Oxygen",1.33,2.04e-5],hx:["Heliox 79/21",0.43,2.0e-5]};
const VENT=[["24% (blue)",0.24,2],["28% (white)",0.28,4],["31% (orange)",0.31,6],["35% (yellow)",0.35,8],["40% (red)",0.40,10],["60% (green)",0.60,15]];

const CALCS=[
 {t:"Combined gas law",c:"etco2",in:[["P1 (kPa absolute)","p1",101.3],["V1 (L)","v1",10],["T1 (°C)","t1",20],["P2 (kPa absolute)","p2",50],["T2 (°C)","t2",-20]],
  f:(v,fmt)=>{const V2=v.p1*v.v1*(v.t2+273.15)/((v.t1+273.15)*v.p2),n=v.p1*1000*v.v1/1000/(8.314*(v.t1+273.15));return [["V2 (L)",fmt(V2,2)],["Ratio V2/V1",fmt(V2/v.v1,2)],["Moles of gas",fmt(n,3)]]},
  n:"P1V1/T1 = P2V2/T2 using absolute pressures and kelvin. Example defaults: an air-filled space at sea level taken to ~5500 m and −20 °C (aeromedical transfer of a pneumothorax or ETT cuff)."},
 {t:"Pressure conversion",c:"etco2",in:[["Pressure (kPa)","k",13.3]],
  f:(v,fmt)=>[["mmHg",fmt(v.k*7.50062,1)],["cmH2O",fmt(v.k*10.197,1)],["bar",fmt(v.k/100,3)],["atm",fmt(v.k/101.325,3)],["psi",fmt(v.k*0.145038,2)]],
  n:"1 kPa = 7.5 mmHg = 10.2 cmH2O; 101.325 kPa = 1 atm = 760 mmHg = 14.7 psi."},
 {t:"Cylinder contents and duration",c:"nibp",in:[["Water capacity (L) (E = 4.7, F = 9.4, CD = 2)","wc",4.7],["Gauge pressure (bar)","p",137],["Flow (L/min)","q",6]],
  f:(v,fmt)=>{const L=v.wc*v.p*1.06;return [["Contents (L, approx.)",fmt(L,0)],["Duration (min)",fmt(L/v.q,0)],["Duration (h)",fmt(L/v.q/60,1)]]},
  n:"Boyle: contents ≈ water capacity × gauge pressure (bar), with ~6% added for gas compressibility at 137 bar. Not valid for N2O (liquid: weigh the cylinder)."},
 {t:"Humidity and heat of humidification",c:"etco2",in:[["Gas temperature °C","t",37],["Relative humidity %","rh",100],["Minute ventilation of dry gas L/min","mv",6]],
  f:(v,fmt)=>{const es=6.112*Math.exp(17.62*v.t/(243.12+v.t));const ah=216.7*(v.rh/100*es)/(273.15+v.t);const body=216.7*62.8/310.15;const need=Math.max(0,body)*v.mv*60/1000;return [["SVP of water (kPa)",fmt(es/10,2)],["Absolute humidity (mg/L)",fmt(ah,1)],["Water to saturate dry gas at 37 °C (g/h)",fmt(need,1)],["Latent heat for that water (kJ/h)",fmt(need*2.4,0)]]},
  n:"Magnus formula for SVP; saturated at 37 °C = 44 mg/L, at 20 °C = 17 mg/L. Latent heat ~2.4 kJ/g at body temperature."},
 {t:"Fluid-induced cooling",c:"etco2",in:[["Fluid volume (L)","v",2],["Fluid temperature °C","tf",20],["Patient weight (kg)","w",70],["Core temperature °C","tc",37]],
  f:(v,fmt)=>{const E=v.v*4.18*(v.tc-v.tf),dT=E/(v.w*3.5);return [["Heat to warm fluid (kJ)",fmt(E,0)],["Fall in mean body temperature (°C)",fmt(dT,2),dT>0.5?"warn":"ok"]]},
  n:"Specific heat capacity: water 4.18, body 3.5 kJ/kg/°C. One unit of red cells at 4 °C needs ~40 kJ to warm."},
 {t:"Electricity: Ohm's law, power, current density",c:"ecg",in:[["Voltage (V)","v",230],["Resistance (Ω)","r",1000],["Current (A) for density","i",0.5],["Contact area (cm²)","a",100]],
  f:(v,fmt)=>{const I=v.v/v.r;return [["Current (mA)",fmt(I*1000,1),I>0.1?"bad":I>0.01?"warn":"ok"],["Power (W)",fmt(v.v*I,1)],["Current density (mA/cm²)",fmt(v.i*1000/v.a,1)],["Same current over 0.01 cm² tip (A/cm²)",fmt(v.i/0.01,0)]]},
  n:"230 V across wet skin (~1 kΩ) drives ~230 mA: VF range. Dry skin (~100 kΩ): ~2 mA. Diathermy plate vs active tip shows why only the tip heats."},
 {t:"Defibrillator capacitor energy",c:"ecg",in:[["Capacitance (µF)","c",32],["Voltage (V)","v",5000],["Transthoracic impedance (Ω)","r",75]],
  f:(v,fmt)=>{const E=0.5*v.c*1e-6*v.v*v.v;return [["Stored energy (J)",fmt(E,0)],["Peak current V/R (A)",fmt(v.v/v.r,0)],["Charge stored (mC)",fmt(v.c*v.v/1000,0)]]},
  n:"E = ½CV². Peak current is lower in practice (inductor and internal resistance); current, not energy, defibrillates."},
 {t:"Ultrasound wavelength, depth and Doppler shift",c:"ecg",in:[["Frequency (MHz)","f",10],["Blood velocity (cm/s)","u",50],["Insonation angle (°)","th",60]],
  f:(v,fmt)=>{const lam=1540/(v.f*1e6)*1000,depth=60/(2*0.7*v.f),df=2*v.f*1e6*(v.u/100)*Math.cos(v.th*Math.PI/180)/1540;return [["Wavelength (mm)",fmt(lam,3)],["Axial resolution ≈ 2λ (mm)",fmt(2*lam,2)],["Approx. useful depth (cm)",fmt(depth,1)],["Doppler shift (kHz)",fmt(df/1000,2)],["Velocity error if angle ignored (%)",fmt((1-Math.cos(v.th*Math.PI/180))*100,0)]]},
  n:"λ = c/f (c = 1540 m/s). Depth assumes 60 dB dynamic range and 0.7 dB/cm/MHz attenuation (two-way). Δf = 2f₀v cos θ / c."},
];

const TABLES=[
 ["SI base and derived units",["Quantity","Unit","Symbol","Definition"],[["Length","metre","m","Base"],["Mass","kilogram","kg","Base (Planck constant)"],["Time","second","s","Base (caesium-133)"],["Current","ampere","A","Base"],["Temperature","kelvin","K","Base"],["Amount","mole","mol","Base (6.022 × 10²³)"],["Luminous intensity","candela","cd","Base"],["Force","newton","N","kg·m/s²"],["Pressure","pascal","Pa","N/m²"],["Energy","joule","J","N·m"],["Power","watt","W","J/s"],["Charge","coulomb","C","A·s"],["Potential","volt","V","W/A"],["Resistance","ohm","Ω","V/A"],["Capacitance","farad","F","C/V"],["Frequency","hertz","Hz","s⁻¹"]]],
 ["UK medical gas cylinders",["Gas","Body / shoulder","Pin index","Pressure (bar, 15 °C)","State in cylinder","Critical temperature"],[["Oxygen","Black (or white) / white","2, 5","137 (CD, HX 230)","Gas","−119 °C"],["Nitrous oxide","French blue / French blue","3, 5","44","Liquid + vapour","36.5 °C"],["Entonox","French blue / blue–white quarters","7 (central)","137","Gas","−5.5 °C (pseudocritical)"],["Air","Black or grey / black–white quarters","1, 5","137","Gas","−141 °C"],["Carbon dioxide","Grey / grey","1, 6","50","Liquid + vapour","31 °C"],["Heliox","Black / brown–white quarters","2, 4","137","Gas","—"]]],
 ["Oxygen cylinder sizes (BOC, UK)",["Size","Water capacity (L)","Pressure (bar)","Contents (L)","Use"],[["CD","2","230","460","Integral valve, transfers, resus"],["E","4.7","137","680","Anaesthetic machine"],["F","9.4","137","1360","Wards"],["HX","10","230","2300","Integral valve, high capacity"],["J","47.2","137","6800","Manifolds"]]],
 ["Mapleson systems: fresh gas flow to prevent rebreathing",["System","Example","Spontaneous","Controlled"],[["A","Magill, Lack","≈ 1 × MV (70 mL/kg/min)","2–3 × MV"],["B","—","2–2.5 × MV","2–2.5 × MV"],["C","Waters bag","2–2.5 × MV","2–2.5 × MV"],["D","Bain","2–3 × MV (150–200 mL/kg/min)","1–2 × MV (70–100 mL/kg/min)"],["E","Ayre's T-piece","2.5–3 × MV","2.5–3 × MV (intermittent occlusion)"],["F","Jackson–Rees","2.5–3 × MV (min 3–4 L/min)","1000 mL + 100 mL/kg/min (approx.)"]]],
 ["Vaporiser classification",["Feature","Options","Examples"],[["Resistance","Plenum (high) vs draw-over (low)","Tec 5 vs OMV, EMO"],["Splitting","Variable bypass vs measured flow","Tec 5 vs Tec 6, copper kettle"],["Vaporisation","Flow-over (wicks), bubble-through, injection","Tec 5; copper kettle; DIVA, Maquet"],["Temperature compensation","Supplied heat, bimetallic strip, bellows","Tec 6 heated; Tec 5 bimetallic"],["Specificity","Agent-specific vs multiple agent","Modern vs OMV"],["Position","Out of circle (VOC) vs in circle (VIC)","Modern machines vs historical draw-over in circle"]]],
 ["Electrical equipment classification (IEC 60601)",["Category","Protection","Leakage limit (normal / single fault)"],[["Class I","Earthed casing + fuses","—"],["Class II","Double or reinforced insulation","—"],["Class III","Internal power or SELV ≤ 24 V AC / 50 V DC","—"],["Type B","Applied part, body (not cardiac)","100 µA / 500 µA"],["Type BF","Floating applied part","100 µA / 500 µA"],["Type CF","Floating, direct cardiac use","10 µA / 50 µA"]]],
 ["Physiological effects of 50 Hz current",["Current","Effect"],[["10 µA","Safety limit for direct cardiac connection"],["~100 µA","Microshock VF if applied to the heart"],["1 mA","Tingling (perception)"],["5 mA","Pain"],["10–20 mA","Tetany: cannot let go"],["50 mA","Respiratory muscle tetany, severe pain"],["100 mA – 1 A","Ventricular fibrillation"],["> 5 A","Sustained myocardial contraction, burns"]]],
 ["Medical lasers",["Laser","Wavelength (nm)","Absorbed by","Uses"],[["CO2","10 600","Water (superficial)","Airway, skin, cutting"],["Nd:YAG","1064","Deep, protein","Coagulation, tumour debulking (fibre-optic)"],["KTP","532","Haemoglobin","Larynx, vascular"],["Argon","488–514","Haemoglobin, melanin","Retina"],["Pulsed dye","585","Oxyhaemoglobin","Port-wine stains"],["Ho:YAG","2100","Water","Lithotripsy, prostate"],["Er:YAG","2940","Water","Skin resurfacing"],["Excimer","193 (UV)","Protein","Corneal refractive surgery"]]],
 ["IV cannula flows (gravity, ~1 m head, crystalloid)",["Gauge","Colour (UK)","Approx. flow mL/min"],[["14G","Orange","270–330"],["16G","Grey","180–240"],["18G","Green","90–105"],["20G","Pink","55–65"],["22G","Blue","30–36"],["24G","Yellow","~20"]]],
 ["Spaulding classification",["Category","Contact","Requirement","Examples"],[["Critical","Sterile tissue or blood","Sterilisation or single-use","Surgical instruments, needles, central lines"],["Semi-critical","Mucous membranes, non-intact skin","High-level disinfection (or sterilise / single-use)","Laryngoscope blades, endoscopes, TOE probe, LMA"],["Non-critical","Intact skin","Cleaning / low-level disinfection","BP cuffs, stethoscopes, pulse oximeter probes"]]],
];

const CARDS=[
 ["units","Name the seven SI base units.","Metre, kilogram, second, ampere, kelvin, mole, candela."],
 ["units","Define the pascal.","1 N/m²."],
 ["units","1 kPa in mmHg and cmH2O?","7.5 mmHg; 10.2 cmH2O."],
 ["units","Gauge vs absolute pressure?","Absolute = gauge + atmospheric."],
 ["units","Define the joule.","Work done when 1 N moves 1 m."],
 ["units","Boyle's law?","PV constant at constant temperature."],
 ["units","Charles' law?","V ∝ T at constant pressure."],
 ["units","Gay-Lussac's (third) law?","P ∝ T at constant volume."],
 ["units","Dalton's law?","Total pressure = sum of partial pressures."],
 ["units","Henry's law?","Dissolved gas ∝ partial pressure at constant temperature."],
 ["units","Graham's law?","Diffusion rate ∝ 1/√MW."],
 ["units","Define critical temperature.","Temperature above which a substance cannot be liquefied by pressure alone."],
 ["units","Gas vs vapour?","Gas: above critical temperature. Vapour: below it."],
 ["units","Critical temperature of O2, N2O, CO2?","−119 °C, 36.5 °C, 31 °C."],
 ["units","Entonox pseudocritical temperature?","−5.5 °C (cylinder); −30 °C (pipeline)."],
 ["units","Volume of 1 mole at STP?","22.4 L."],
 ["units","Define specific heat capacity.","Heat to raise 1 kg by 1 K."],
 ["units","Define latent heat.","Heat absorbed/released during a phase change without temperature change."],
 ["units","Largest route of heat loss under anaesthesia?","Radiation (~40%)."],
 ["units","Phases of perioperative hypothermia?","Redistribution, linear, plateau."],
 ["units","NICE warming threshold?","Forced-air warming if > 30 min or high risk; keep ≥ 36 °C."],
 ["units","Absolute humidity at 37 °C saturated?","44 mg/L."],
 ["units","Define relative humidity.","Water vapour present / amount for saturation at that temperature."],
 ["units","Define dew point.","Temperature at which gas becomes saturated and water condenses."],
 ["units","HME efficiency?","~60–70% (25–35 mg/L)."],
 ["units","Ideal droplet size to reach alveoli?","1–5 µm."],
 ["flow","Hagen–Poiseuille equation?","Q = πΔPr⁴/8ηl."],
 ["flow","Laminar flow depends on viscosity or density?","Viscosity."],
 ["flow","Turbulent flow depends on viscosity or density?","Density."],
 ["flow","Reynolds number formula?","ρvd/η."],
 ["flow","Reynolds number for turbulent flow?","> 2000 (definitely > 4000)."],
 ["flow","Why does heliox help upper airway obstruction?","Lower density → lower Re and turbulent resistance."],
 ["flow","Turbulent flow relationship to pressure?","Q ∝ √ΔP."],
 ["flow","Bernoulli principle?","Pressure falls where velocity rises."],
 ["flow","Define entrainment ratio.","Entrained flow / driving flow."],
 ["flow","Why can a Venturi mask fail to deliver its FiO2?","Peak inspiratory flow exceeds total delivered flow."],
 ["flow","Coanda effect?","A fluid jet adheres to a nearby curved surface."],
 ["flow","Rotameter: fixed or variable orifice?","Variable orifice, constant pressure difference."],
 ["flow","Why is a rotameter gas-specific?","Viscosity (low flow) and density (high flow) dependence."],
 ["flow","Pneumotachograph principle?","Laminar flow across fixed resistance: ΔP ∝ flow."],
 ["flow","Wright respirometer errors?","Over-reads high flow, under-reads low flow."],
 ["flow","Hot-wire anemometer principle?","Cooling changes wire resistance (Wheatstone bridge)."],
 ["supply","O2 cylinder colour (UK)?","Black body (or white), white shoulder."],
 ["supply","N2O cylinder gauge pressure?","44 bar (15 °C)."],
 ["supply","Why does N2O cylinder pressure stay constant?","Liquid–vapour equilibrium (SVP)."],
 ["supply","Define filling ratio.","Mass of gas / mass of water the cylinder could hold."],
 ["supply","Filling ratio temperate vs tropical?","0.75 vs 0.67."],
 ["supply","Pin index for O2 and N2O?","O2 2,5; N2O 3,5."],
 ["supply","Contents of a size E O2 cylinder?","680 L."],
 ["supply","VIE storage temperature and safety valve?","−150 to −170 °C; 17 bar."],
 ["supply","Pipeline pressure?","4 bar (400 kPa)."],
 ["supply","Oxygen concentrator mechanism?","Zeolite adsorbs N2 (pressure swing); ~93–95% O2."],
 ["supply","Wall outlet connector?","Schrader probe (gas-specific)."],
 ["supply","Machine end hose connector?","NIST (non-interchangeable screw thread)."],
 ["supply","Oxygen flush flow?","35–75 L/min."],
 ["supply","Oxygen failure alarm requirements?","Powered by O2; ≥ 7 s, ≥ 60 dB."],
 ["supply","Hypoxic guard minimum FiO2?","~25%."],
 ["supply","Why does O2 enter the back bar last?","A cracked upstream tube cannot cause a hypoxic mixture."],
 ["circ","Most efficient Mapleson for spontaneous breathing?","A."],
 ["circ","Most efficient Mapleson for controlled ventilation?","D."],
 ["circ","Bain circuit inner tube carries?","Fresh gas."],
 ["circ","Mapleson A FGF for spontaneous breathing?","≈ alveolar MV (~70 mL/kg/min)."],
 ["circ","Jackson–Rees is which Mapleson?","F."],
 ["circ","Circle time constant formula?","System volume / FGF."],
 ["circ","Soda lime main component?","Calcium hydroxide (~75–80%)."],
 ["circ","Soda lime granule size?","4–8 mesh."],
 ["circ","Ethyl violet colour change?","White → purple."],
 ["circ","Carbon monoxide in the circle arises from?","Desflurane/isoflurane over desiccated absorbent."],
 ["circ","Amsorb advantage?","No strong base: no compound A or CO."],
 ["circ","Define SVP.","Pressure of vapour in equilibrium with its liquid at a given temperature."],
 ["circ","Splitting ratio for 1% isoflurane?","~1:46 (chamber:bypass)."],
 ["circ","Vaporiser temperature compensation?","Heat sink + bimetallic strip/bellows."],
 ["circ","Pumping effect?","Back-pressure pushes vapour into bypass, ↑ output at low flow."],
 ["circ","Plenum vaporiser at altitude?","Same partial pressure (% rises)."],
 ["circ","Tec 6 sump temperature and pressure?","39 °C, ~2 atm."],
 ["circ","Mapleson ventilator classification?","Pressure generators vs flow generators."],
 ["circ","Safer bellows type?","Ascending (standing)."],
 ["circ","Newton valve purpose?","Converts Nuffield 200 to a pressure generator for children."],
 ["circ","UK WEL for N2O?","100 ppm (8-h TWA)."],
 ["circ","Scavenging connector size?","30 mm."],
 ["elec","Ohm's law?","V = IR."],
 ["elec","Energy stored in a capacitor?","½CV²."],
 ["elec","Capacitive reactance formula?","1/(2πfC)."],
 ["elec","Inductive reactance formula?","2πfL."],
 ["elec","UK mains voltage and frequency?","230 V RMS, 50 Hz."],
 ["elec","Microshock VF threshold?","~100 µA."],
 ["elec","CF leakage current limit?","10 µA (normal), 50 µA (single fault)."],
 ["elec","Class II equipment?","Double insulated; no earth."],
 ["elec","RCD trip current?","~30 mA."],
 ["elec","Let-go current?","10–20 mA."],
 ["elec","Defibrillator: purpose of the inductor?","Prolongs and shapes the current pulse."],
 ["elec","Biphasic vs monophasic energy?","120–200 J vs 360 J."],
 ["elec","Why synchronise cardioversion?","Avoid shock on the T wave (vulnerable period)."],
 ["elec","Diathermy frequency?","~0.5–1 MHz (0.4–10 MHz)."],
 ["elec","Why does diathermy not cause VF?","High frequency only heats tissue."],
 ["elec","Cutting vs coagulation waveform?","Continuous sine vs pulsed bursts."],
 ["elec","Bipolar diathermy advantage?","Current only between tips; safer with pacemakers."],
 ["elec","LASER stands for?","Light amplification by stimulated emission of radiation."],
 ["elec","Three properties of laser light?","Monochromatic, coherent, collimated."],
 ["elec","CO2 laser wavelength?","10 600 nm."],
 ["elec","Nd:YAG wavelength?","1064 nm."],
 ["elec","Fire triangle?","Fuel, oxidiser, ignition."],
 ["elec","Ultrasound speed in soft tissue?","1540 m/s."],
 ["elec","High-frequency probe trade-off?","Better resolution, less penetration."],
 ["elec","Doppler equation?","Δf = 2f₀v cos θ / c."],
 ["elec","Optimal Doppler angle?","< 60°."],
 ["elec","Acoustic impedance?","Density × speed of sound."],
 ["elec","MRI field strength?","1.5–3 T."],
 ["elec","MR Conditional means?","Safe under specified conditions."],
 ["elec","MRI quench hazard?","Helium release: asphyxia, cold burns."],
 ["elec","Autoclave conditions?","134–137 °C for 3 min (~2.2 bar)."],
 ["elec","Spaulding semi-critical example?","Laryngoscope blade."],
];

const FCF={all:"All",units:"Units & gas laws",flow:"Flow",supply:"Gas supply & machine",circ:"Systems & vaporisers",elec:"Electricity & equipment"};

const VIVA=[
 {st:"SOE 2 · Clinical measurement",q:"How are medical gases supplied to the hospital and the anaesthetic machine?",a:["Sources: VIE (liquid O2), manifolds, concentrators, cylinders.","Physics: critical temperature, latent heat, Boyle, filling ratio.","Pipelines: 4 bar, Schrader, NIST, colour coding.","Cylinders: colours, pins, Bodok, sizes, pressures.","Safety: testing, alarms, backup, gas identity after work."],fu:"Why does an N2O cylinder gauge not reflect contents?"},
 {st:"SOE 2 · Clinical measurement",q:"Define critical temperature. Explain how Entonox works.",a:["Definitions: critical temperature and pressure, gas vs vapour.","Values for O2, N2O, CO2.","Poynting effect: dissolved O2 in liquid N2O allows a 50:50 gas mixture.","Pseudocritical temperature and separation.","Storage and use (invert, above 10 °C)."],fu:"What happens if an Entonox cylinder is used after storage at −10 °C?"},
 {st:"SOE 2 · Clinical measurement",q:"Describe laminar and turbulent flow. Why does heliox help a patient with stridor?",a:["Definitions and velocity profiles.","Hagen–Poiseuille and its variables.","Turbulent flow relationships and Reynolds number.","Heliox physics and FiO2 limit.","Clinical: cannula and ETT sizes."],fu:"What is the critical velocity?"},
 {st:"SOE 2 · Clinical measurement",q:"Explain the Venturi principle and how a Venturi mask works.",a:["Bernoulli and conservation of energy.","Entrainment and the entrainment ratio.","Fixed vs variable performance devices.","Total flow vs peak inspiratory flow.","Other applications."],fu:"Calculate the total flow from a 40% Venturi at 10 L/min."},
 {st:"SOE 2 · Clinical measurement",q:"Classify breathing systems. Describe the Mapleson systems and the circle.",a:["Ideal properties.","Classification and Mapleson A–F drawings.","Efficiency in spontaneous vs controlled ventilation with FGF.","Circle components and low-flow principles.","Hazards and checks (Bain inner tube)."],fu:"Why is Mapleson A efficient for spontaneous ventilation?"},
 {st:"SOE 2 · Clinical measurement",q:"How does a plenum vaporiser work? What happens at altitude and with the wrong agent?",a:["SVP, latent heat, temperature dependence.","Splitting ratio, chamber saturation.","Temperature and flow compensation, pumping effect.","Altitude: partial pressure constant; Tec 6 differs.","Wrong agent: SVP and potency."],fu:"Why can't desflurane be used in a plenum vaporiser?"},
 {st:"SOE 2 · Clinical measurement",q:"What is soda lime? Describe the reactions and problems.",a:["Composition and granule size.","Reactions (exothermic, water).","Indicators.","Compound A, CO, desiccation.","Alternatives and exhaustion detection."],fu:"How would you detect absorber exhaustion?"},
 {st:"SOE 2 · Clinical measurement",q:"Electrical safety in theatre: macroshock, microshock and equipment classification.",a:["Current effects by magnitude.","Determinants: current, frequency, duration, pathway, density.","Microshock and its sources.","Classes I–III, types B/BF/CF with leakage limits.","Protective measures in theatre."],fu:"What is an isolating transformer and how does it protect the patient?"},
 {st:"SOE 2 · Clinical measurement",q:"How does a defibrillator work?",a:["Principle.","Circuit components and functions.","Energy equation; stored vs delivered.","Monophasic vs biphasic; impedance.","Synchronised cardioversion and safety."],fu:"Why is biphasic more effective?"},
 {st:"SOE 2 · Clinical measurement",q:"Surgical diathermy: how does it work, and how do you prevent burns?",a:["High frequency and heating.","Current density: active vs plate.","Monopolar vs bipolar; waveforms.","Isolation and return electrode monitoring.","Burns, fire, pacemakers, smoke."],fu:"How would you manage diathermy in a patient with an ICD?"},
 {st:"SOE 2 · Clinical measurement",q:"Lasers in the operating theatre and airway fire.",a:["Principle and properties.","Types and wavelengths.","Classes and safety measures.","Fire triangle and prevention.","Airway fire management."],fu:"Why is a CO2 laser used for laryngeal surgery?"},
 {st:"SOE 2 · Clinical measurement",q:"Principles of ultrasound and the Doppler effect.",a:["Piezoelectric effect, frequency range.","Resolution vs penetration.","Impedance, reflection, artefacts.","Modes.","Doppler equation, angle, aliasing, uses."],fu:"Why does Doppler underestimate velocity at large angles?"},
 {st:"SOE 2 · Clinical measurement",q:"Humidity: definitions, measurement and humidification.",a:["Absolute, relative humidity, dew point.","Values at 20 and 37 °C.","Hygrometers.","HME vs hot water bath vs nebulisers.","Consequences of dry gas."],fu:"How does a hair hygrometer work?"},
];

const QUIZ=[
 ["SI units",[["The pascal is 1 N/m²",1,""],["The kelvin is a derived unit",0,"Base unit."],["1 kPa ≈ 7.5 mmHg",1,""],["The joule is the unit of power",0,"Energy; power is the watt."],["The mole is a base unit",1,""]]],
 ["Gas laws",[["Boyle's law applies at constant temperature",1,""],["Henry's law relates diffusion to molecular weight",0,"That is Graham's law."],["Gay-Lussac's law explains cylinder explosion in fires",1,""],["Dalton's law describes partial pressures",1,""],["Solubility of gases rises with temperature",0,"Falls."]]],
 ["Critical temperature",[["N2O's critical temperature is 36.5 °C",1,""],["O2 is a vapour at room temperature",0,"A gas (above −119 °C)."],["Entonox separates below its pseudocritical temperature",1,""],["CO2 is stored partly as liquid",1,""],["A vapour cannot be liquefied by pressure",0,"A gas cannot; a vapour can."]]],
 ["Flow",[["Laminar flow is proportional to r⁴",1,""],["Turbulent flow depends mainly on viscosity",0,"Density."],["Reynolds number has units of m/s",0,"Dimensionless."],["Heliox reduces turbulent resistance",1,""],["Warming blood increases flow through a cannula",1,"Lower viscosity."]]],
 ["Flow measurement",[["A rotameter is a variable orifice meter",1,""],["Rotameter bobbins are read at the bottom",0,"Top (balls at centre)."],["A pneumotachograph requires laminar flow",1,""],["The Wright respirometer over-reads at high flows",1,""],["Hot-wire anemometers use the Wheatstone bridge",1,""]]],
 ["Cylinders",[["O2 cylinders in the UK have white shoulders",1,""],["N2O pin index is 2 and 5",0,"3 and 5 (O2 is 2, 5)."],["Size E O2 holds about 680 L",1,""],["N2O cylinder gauge pressure reflects contents",0,"Only after the liquid is gone."],["The filling ratio is lower in hot climates",1,"0.67."]]],
 ["Gas supply",[["Pipeline pressure is 4 bar",1,""],["The VIE safety valve opens at 17 bar",1,""],["Oxygen concentrators deliver 100% O2",0,"~93–95%."],["Schrader valves are at the wall outlet",1,""],["Oxygen flush passes through the vaporiser",0,"Bypasses it."]]],
 ["Breathing systems",[["Mapleson A is efficient for spontaneous breathing",1,""],["The Bain is a coaxial Mapleson A",0,"Coaxial D."],["Jackson–Rees is a Mapleson F",1,""],["Mapleson D is efficient for IPPV",1,""],["Circle systems need high FGF to change concentration quickly",1,""]]],
 ["Soda lime",[["Calcium hydroxide is the main constituent",1,""],["The reaction is endothermic",0,"Exothermic."],["Desiccated absorbent can produce CO",1,""],["Amsorb produces compound A",0,"No strong base."],["Granules are 4–8 mesh",1,""]]],
 ["Vaporisers",[["SVP rises with temperature",1,""],["Desflurane can be used in a plenum vaporiser",0,"Boils near room temperature."],["The pumping effect increases output",1,""],["A plenum vaporiser delivers a higher % at altitude",1,"Same partial pressure."],["The Tec 6 heats desflurane to 39 °C",1,""]]],
 ["Electrical safety",[["Microshock VF can occur at ~100 µA",1,""],["CF equipment allows 100 µA leakage",0,"10 µA."],["Class II equipment needs an earth wire",0,"Double insulated."],["50 Hz is particularly dangerous",1,""],["Isolating transformers create floating circuits",1,""]]],
 ["Defibrillation",[["Energy stored = ½CV²",1,""],["The inductor shapes the waveform",1,""],["Biphasic shocks need more energy",0,"Less."],["Cardioversion is synchronised to the T wave",0,"To the R wave, avoiding T."],["Firm pad pressure lowers impedance",1,""]]],
 ["Diathermy and lasers",[["Diathermy uses ~1 MHz current",1,""],["Bipolar diathermy needs a patient plate",0,"No plate."],["CO2 laser light is absorbed by water",1,""],["Nd:YAG can be delivered by fibre-optics",1,""],["Use FiO2 > 0.5 during airway laser surgery",0,"< 0.3."]]],
 ["Ultrasound and MRI",[["High-frequency probes penetrate deeper",0,"Less deep."],["Doppler shift is zero at 90°",1,"cos 90° = 0."],["Soft tissue sound speed is 1540 m/s",1,""],["MR Conditional equipment is safe anywhere in the scanner room",0,"Only under stated conditions."],["A quench releases helium",1,""]]],
];

const CRISIS=[
 ["Oxygen pipeline failure or contamination","nibp",["Alarm or falling O2 supply pressure / unexpected low FiO2 on analyser.","Open the machine O2 cylinder; check its contents; reduce FGF (low flow) to conserve.","If the pipeline gas may be wrong (low FiO2 despite O2 flow): disconnect the pipeline hose (or it will still be used preferentially), use cylinder O2 or a self-inflating bag with a separate O2 cylinder or room air.","Switch to TIVA if volatile delivery depends on the machine; call for help and more cylinders; inform estates and other theatres.","Report; after any pipeline work insist on gas identity testing before use."],"The machine draws from the pipeline at 4 bar in preference to the cylinder (regulated slightly lower)."],
 ["Airway fire","abp",["Stop the laser/diathermy; shout 'fire'.","Stop ventilation and turn off O2 and N2O; remove the ETT; pour saline into the airway; remove burning material and swabs.","Re-establish ventilation with air via bag-mask (avoid O2 until the fire is out), then O2; reintubate (consider a smaller tube) if needed.","Rigid bronchoscopy to assess damage and remove debris; examine the tube for missing fragments.","Steroids? Not routinely; ICU; CXR; report. Prevention: FiO2 < 0.3, no N2O, laser tube with saline-filled cuff, wet swabs."],"Fuel (tube), oxidiser (O2/N2O) and ignition (laser) meet in the airway."],
 ["Anaesthetic machine or ventilator failure","abp",["Ventilate with a self-inflating bag and a separate O2 source; keep the patient anaesthetised (TIVA with battery-powered pumps).","Check power, gas supply, breathing system and valves, CO2 absorber, vaporiser (empty, unseated: awareness).","Swap to a spare machine when safe; call for technical help.","Monitor with a standalone monitor if needed; document.","Quarantine the faulty equipment for investigation (MHRA report)."],"Every location where anaesthesia is given must have a self-inflating bag and backup O2."],
 ["Power failure in theatre","ecg",["Most modern machines and monitors switch to battery (≥ 30 min); the emergency generator should start within 15 s; check UPS-protected sockets (red/marked).","Ensure lighting (torch, phone light), ventilation (manual if needed), and anaesthesia (switch to volatile if pumps fail, or battery pumps).","Prioritise: stop surgery safely, haemostasis.","Communicate with estates; identify which theatres and systems are affected.","Do not restart essential equipment on non-protected sockets."],"Hospitals have essential, UPS and normal supply circuits."],
 ["Electric shock or diathermy burn","ecg",["Switch off or isolate the source before touching the victim; use a non-conducting object.","Check rhythm: VF needs immediate defibrillation and CPR.","Assess burns (entry and exit); check diathermy plate site and ECG electrode sites.","Investigate: remove faulty equipment from service, check earthing and RCDs.","Document, inform the patient (duty of candour), incident report."],"Current density at a small contact area produces heat (burns); 50 Hz current through the heart causes VF."],
 ["Cardiac arrest in MRI","abp",["Shout for help; start CPR; do not bring the arrest team or ferromagnetic equipment into the scanner room (zone IV).","Move the patient on an MR-conditional trolley out of the magnet room as fast as possible.","Resuscitate in zone III or below with standard equipment and defibrillator.","Quench only to release someone trapped by a ferromagnetic object or in a fire (helium hazard; magnet down for days).","Debrief; review screening and emergency drills."],"The static field is always on; projectiles kill."],
];

const SRC="";
const ERR="";
const REFS="";

const DIAG=`<div class="grid2">
 <div class="fig"><h3>Cylinder gauge vs contents</h3>
  <div class="seg" id="cy-sel"></div>
  <div class="ctl"><label>Ambient temperature °C <input type="range" id="cy-t" min="-10" max="35" step="1" value="15"><output id="cy-t-o"></output></label>
   <label>Contents used % <input type="range" id="cy-u" min="0" max="100" step="1" value="50"><output id="cy-u-o"></output></label>
   <label>Flow L/min <input type="range" id="cy-q" min="1" max="15" step="1" value="6"><output id="cy-q-o"></output></label></div>
  <div class="svgbox"><svg id="cy" viewBox="0 0 520 300" role="img" aria-label="Cylinder pressure"></svg></div>
  <div class="readout" id="cy-r"></div></div>

 <div class="fig"><h3>Laminar vs turbulent flow through an ETT</h3>
  <div class="seg" id="fl-sel"></div>
  <div class="ctl"><label>ETT internal diameter mm <input type="range" id="fl-d" min="3" max="10" step="0.5" value="7"><output id="fl-d-o"></output></label>
   <label>Peak flow L/min <input type="range" id="fl-q" min="5" max="120" step="5" value="60"><output id="fl-q-o"></output></label></div>
  <div class="svgbox"><svg id="fl" viewBox="0 0 520 300" role="img" aria-label="Flow pressure"></svg></div>
  <div class="readout" id="fl-r"></div></div>

 <div class="fig"><h3>Venturi mask entrainment</h3>
  <div class="seg" id="vm-sel"></div>
  <div class="ctl"><label>Patient peak inspiratory flow L/min <input type="range" id="vm-p" min="20" max="120" step="5" value="40"><output id="vm-p-o"></output></label></div>
  <div class="svgbox"><svg id="vm" viewBox="0 0 520 300" role="img" aria-label="Venturi"></svg></div>
  <div class="readout" id="vm-r"></div></div>

 <div class="fig" style="grid-column:1/-1"><h3>Plenum vaporiser: splitting ratio, temperature, altitude and the wrong agent</h3>
  <div class="ctl"><div class="seg" id="vp-cal"></div><div class="seg" id="vp-fill"></div><div class="seg" id="vp-comp"></div></div>
  <div class="ctl"><label>Dial % <input type="range" id="vp-d" min="0.2" max="5" step="0.1" value="1"><output id="vp-d-o"></output></label>
   <label>Liquid temperature °C <input type="range" id="vp-t" min="10" max="35" step="1" value="20"><output id="vp-t-o"></output></label>
   <label>Ambient pressure kPa <input type="range" id="vp-p" min="50" max="101" step="1" value="101"><output id="vp-p-o"></output></label></div>
  <div class="svgbox"><svg id="vp" viewBox="0 0 900 300" role="img" aria-label="Vaporiser output"></svg></div>
  <div class="readout" id="vp-r"></div></div>

 <div class="fig"><h3>Electric shock: Ohm's law and effects</h3>
  <div class="seg" id="es-path"></div><div class="seg" id="es-skin"></div>
  <div class="svgbox"><svg id="es" viewBox="0 0 520 300" role="img" aria-label="Electric shock"></svg></div>
  <div class="readout" id="es-r"></div></div>

 <div class="fig"><h3>Defibrillator waveforms</h3>
  <div class="seg" id="df-sel"></div>
  <div class="ctl"><label>Energy J <input type="range" id="df-e" min="50" max="360" step="10" value="150"><output id="df-e-o"></output></label>
   <label>Transthoracic impedance Ω <input type="range" id="df-r" min="25" max="175" step="5" value="75"><output id="df-r-o"></output></label></div>
  <div class="svgbox"><svg id="df" viewBox="0 0 520 300" role="img" aria-label="Defibrillator current"></svg></div>
  <div class="readout" id="df-r2"></div></div>

 <div class="fig"><h3>Ultrasound: frequency trade-off and Doppler angle</h3>
  <div class="ctl"><label>Probe frequency MHz <input type="range" id="us-f" min="2" max="15" step="0.5" value="10"><output id="us-f-o"></output></label>
   <label>Insonation angle ° <input type="range" id="us-a" min="0" max="90" step="5" value="60"><output id="us-a-o"></output></label></div>
  <div class="svgbox"><svg id="us" viewBox="0 0 520 300" role="img" aria-label="Ultrasound"></svg></div>
  <div class="readout" id="us-r"></div></div>
</div>`;

function initDiagrams(){
 const out=(id,t)=>{const o=$("#"+id+"-o");if(o)o.textContent=t};
 const mk=svg=>(t,a,tx)=>{const e=document.createElementNS(SVGNS,t);for(const k in a)e.setAttribute(k,a[k]);if(tx!=null)e.textContent=tx;svg.append(e);return e};

 /* 1. Cylinder */
 let cyK="o2e";
 function drawCY(){const T=+$("#cy-t").value,u=+$("#cy-u").value,q=+$("#cy-q").value;out("cy-t",T);out("cy-u",u);out("cy-q",q);
  const [nm,pf,vol,kind]=CYL[cyK];let curve,ymax,txt;
  if(kind==="o2"){const pT=pf*(T+273.15)/288.15;curve=range(0,100,100).map(x=>[x,pT*(1-x/100)]);ymax=Math.max(250,pT*1.1);const pg=pT*(1-u/100);txt=`Gauge reads <b>${pg.toFixed(0)} bar</b> (full ${pT.toFixed(0)} bar at ${T} °C). Remaining ≈ <b>${(vol*(1-u/100)).toFixed(0)} L</b>: ${(vol*(1-u/100)/q).toFixed(0)} min at ${q} L/min. Boyle's law: pressure is proportional to contents, so the gauge is a fuel gauge.`}
  else{const sv=n2oSVP(T)-1,liqEnd=86;curve=range(0,100,100).map(x=>[x,x<=liqEnd?sv:sv*(100-x)/(100-liqEnd)]);ymax=80;const pg=u<=liqEnd?sv:sv*(100-u)/(100-liqEnd);txt=`Gauge reads <b>${pg.toFixed(0)} bar</b> at ${T} °C (SVP of N2O). It stays at the SVP while liquid remains (~${liqEnd}% of contents), then falls fast: only ~${(vol*(100-liqEnd)/100).toFixed(0)} L (${((vol*(100-liqEnd)/100)/q).toFixed(0)} min at ${q} L/min) is left when the needle starts to move. Weigh the cylinder to know contents. Above 36.5 °C the contents are all gas.`+(T<5?" Cold cylinders deliver at lower pressure; heavy use cools the liquid (latent heat) and frosts the cylinder.":"")}
  const P=plot($("#cy"),{w:520,h:300,x0:0,x1:100,y0:0,y1:ymax,xt:[0,25,50,75,100],yt:kind==="o2"?[0,50,100,150,200,250]:[0,20,40,60,80],xl:"Contents used (%)",yl:"Gauge pressure (bar)"});
  P.line(curve,{stroke:kind==="o2"?"var(--spo2)":"var(--nibp)"});const cur=curve.find(c=>c[0]>=u)||curve[curve.length-1];P.dot(u,cur[1],"var(--ink)","");
  $("#cy-r").innerHTML=`<b>${nm}</b>, ${vol} L when full. `+txt}
 seg($("#cy-sel"),Object.entries(CYL).map(([k,v])=>[k,v[0]]),k=>{cyK=k;drawCY()},"o2e");["#cy-t","#cy-u","#cy-q"].forEach(x=>$(x).oninput=drawCY);

 /* 2. Flow */
 let flG="air";
 function dp(Qlpm,d,g){const [n,rho,eta]=GAS[g];const r=d/2000,L=0.3,Q=Qlpm/60000,A=Math.PI*r*r,v=Q/A,Re=rho*v*(2*r)/eta;let P;if(Re<2000)P=8*eta*L*Q/(Math.PI*Math.pow(r,4));else{const f=0.316*Math.pow(Re,-0.25);P=f*(L/(2*r))*0.5*rho*v*v}return [P/98.0665,Re]}
 function drawFL(){const d=+$("#fl-d").value,q=+$("#fl-q").value;out("fl-d",d);out("fl-q",q);
  const pts={};let ymax=1;Object.keys(GAS).forEach(g=>{pts[g]=range(1,120,120).map(Q=>[Q,dp(Q,d,g)[0]]);ymax=Math.max(ymax,...pts[g].map(p=>p[1]))});ymax=Math.min(ymax*1.05,200);
  const P=plot($("#fl"),{w:520,h:300,x0:0,x1:120,y0:0,y1:ymax,xt:[0,30,60,90,120],yt:[0,ymax/4,ymax/2,ymax*3/4,ymax].map(v=>+v.toPrecision(2)),xl:"Flow (L/min)",yl:"ΔP across 30 cm tube (cmH2O)"});
  const col={air:"var(--abp)",o2:"var(--spo2)",hx:"var(--etco2)"};Object.keys(GAS).forEach(g=>P.line(pts[g].map(([x,y])=>[x,Math.min(y,ymax)]),{stroke:col[g],"stroke-width":g===flG?3:1.4,"stroke-dasharray":g===flG?"":"4 3"}));
  const [p1,re1]=dp(q,d,flG),[ph,reh]=dp(q,d,"hx");const qc=2000*GAS[flG][2]*Math.PI*(d/2000)/(2*GAS[flG][1])*60000;
  P.add("line",{x1:P.X(Math.min(120,qc)),x2:P.X(Math.min(120,qc)),y1:P.Y(0),y2:P.Y(ymax),stroke:"var(--muted)","stroke-dasharray":"2 4"});P.text(Math.min(112,qc+1),ymax*0.92,"Re 2000",{"font-size":"10"});
  P.text(35,ymax*0.95,"air",{fill:col.air,"font-size":"11"});P.text(52,ymax*0.95,"oxygen",{fill:col.o2,"font-size":"11"});P.text(78,ymax*0.95,"heliox",{fill:col.hx,"font-size":"11"});
  $("#fl-r").innerHTML=`${GAS[flG][0]} through a ${d} mm tube at ${q} L/min: Re <b>${re1.toFixed(0)}</b> (${re1<2000?"laminar":"turbulent"}), ΔP <b>${p1.toFixed(1)} cmH2O</b>. Heliox: Re ${reh.toFixed(0)}, ΔP ${ph.toFixed(1)} cmH2O. Laminar flow becomes turbulent above ~${qc.toFixed(0)} L/min (Re 2000) in this tube. Narrowing the tube from 8 to 6 mm raises laminar resistance ×${Math.pow(8/6,4).toFixed(1)} (r⁴).`}
 seg($("#fl-sel"),Object.entries(GAS).map(([k,v])=>[k,v[0]]),k=>{flG=k;drawFL()},"air");["#fl-d","#fl-q"].forEach(x=>$(x).oninput=drawFL);

 /* 3. Venturi */
 let vmI=4;
 function drawVM(){const pif=+$("#vm-p").value;out("vm-p",pif);const [nm,F,o2]=VENT[vmI];const ratio=(1-F)/(F-0.21),air=o2*ratio,tot=o2+air;
  const deficit=Math.max(0,pif-tot),Feff=(o2+0.21*air+0.21*deficit)/(tot+deficit);
  const svg=$("#vm");svg.innerHTML="";const add=mk(svg);const sc=v=>v*2.2,base=250;const ymaxv=Math.max(tot,pif)*1.1;const s=200/ymaxv;
  add("line",{x1:40,x2:500,y1:base,y2:base,stroke:"var(--muted)"});
  add("rect",{x:100,y:base-o2*s,width:80,height:o2*s,fill:"var(--spo2)"});add("rect",{x:100,y:base-tot*s,width:80,height:air*s,fill:"var(--muted)","fill-opacity":0.5});
  add("text",{x:140,y:base+16,"text-anchor":"middle",class:"lbl"},"Delivered");add("text",{x:140,y:base-tot*s-6,"text-anchor":"middle",class:"lbl"},tot.toFixed(0)+" L/min");
  add("text",{x:188,y:base-o2*s/2,class:"lbl","font-size":"10"},"O2 "+o2);add("text",{x:188,y:base-o2*s-air*s/2,class:"lbl","font-size":"10"},"air "+air.toFixed(0));
  add("rect",{x:300,y:base-pif*s,width:80,height:pif*s,fill:deficit>0?"var(--bad)":"var(--good)","fill-opacity":0.6});add("text",{x:340,y:base+16,"text-anchor":"middle",class:"lbl"},"Patient PIF");add("text",{x:340,y:base-pif*s-6,"text-anchor":"middle",class:"lbl"},pif+" L/min");
  $("#vm-r").innerHTML=`<b>${nm}</b> valve at ${o2} L/min O2: entrainment ratio (air:O2) <b>${ratio.toFixed(1)}:1</b>, total flow <b>${tot.toFixed(0)} L/min</b>. ${deficit>0?`Peak inspiratory flow exceeds delivered flow by ${deficit.toFixed(0)} L/min, so room air is drawn around the mask: effective FiO2 falls to ~<b>${(Feff*100).toFixed(0)}%</b>. Increase the O2 flow above the label (the ratio is fixed, so total flow rises) or use HFNO.`:"Delivered flow exceeds peak inspiratory flow: FiO2 is fixed."}`}
 seg($("#vm-sel"),VENT.map((v,i)=>[String(i),v[0]]),k=>{vmI=+k;drawVM()},"4");$("#vm-p").oninput=drawVM;

 /* 4. Vaporiser */
 let vpCal="iso",vpFill="iso",vpComp="yes";
 function vapOut(cal,fill,dial,T,Patm,comp){const C=dial/100;const Tc=comp==="yes"?T:20;const sc=svp(cal,Tc);const Fv=C/(1-C);const Fc=Fv*(101.325-sc)/sc;const sf=svp(fill,T);if(sf>=Patm)return {Fc,boil:true,out:NaN,pp:NaN};const Fvf=Fc*sf/(Patm-sf);const o=Fvf/(1+Fvf);return {Fc,boil:false,out:o*100,pp:o*Patm}}
 function drawVP(){const d=+$("#vp-d").value,T=+$("#vp-t").value,Pa=+$("#vp-p").value;out("vp-d",d.toFixed(1));out("vp-t",T);out("vp-p",Pa);
  const cur=vapOut(vpCal,vpFill,d,T,Pa,vpComp);
  const curve=range(10,35,50).map(t=>{const r=vapOut(vpCal,vpFill,d,t,Pa,vpComp);return [t,r.boil?NaN:r.out]});
  const fin=curve.filter(c=>isFinite(c[1]));const ymax=Math.max(d*2,...fin.map(c=>c[1]))*1.15||d*2;
  const P=plot($("#vp"),{w:900,h:300,x0:10,x1:35,y0:0,y1:Math.min(ymax,40),xt:[10,15,20,25,30,35],yt:[0,d,2*d].map(v=>+v.toFixed(1)),xl:"Liquid temperature (°C)",yl:"Output %"});
  P.add("line",{x1:P.X(10),x2:P.X(35),y1:P.Y(d),y2:P.Y(d),stroke:"var(--muted)","stroke-dasharray":"5 4"});P.text(10.3,d+ymax*0.03,"dial setting",{"font-size":"11"});
  let seg1=[];const segs=[];curve.forEach(c=>{if(isFinite(c[1])&&c[1]<=40)seg1.push(c);else{if(seg1.length)segs.push(seg1);seg1=[]}});if(seg1.length)segs.push(seg1);segs.forEach(s=>P.line(s,{stroke:"var(--etco2)"}));
  if(!cur.boil)P.dot(T,Math.min(cur.out,40),"var(--ink)",cur.out.toFixed(2)+"%");
  const split=(1-cur.Fc)/cur.Fc;const macF=AGV[vpFill][3];
  let txt=`Vaporiser calibrated for <b>${AGV[vpCal][0]}</b>${vpComp==="yes"?" (temperature-compensated)":" (uncompensated, set at 20 °C)"}, filled with <b>${AGV[vpFill][0]}</b>. Splitting ratio bypass:chamber <b>${split.toFixed(0)}:1</b> (chamber ${(cur.Fc*100).toFixed(1)}% of FGF). `;
  if(cur.boil)txt+=`<b>${AGV[vpFill][0]} boils</b> at this temperature and pressure (SVP ${svp(vpFill,T).toFixed(0)} kPa ≥ ${Pa} kPa): uncontrolled, potentially lethal output. This is why desflurane needs the heated, pressurised Tec 6.`;
  else txt+=`Output <b>${cur.out.toFixed(2)}%</b> = partial pressure <b>${cur.pp.toFixed(2)} kPa</b> (${(cur.pp/(macF*1.01325)).toFixed(2)} MAC of ${AGV[vpFill][0]}; dial intended ${(d/AGV[vpCal][3]).toFixed(2)} MAC of ${AGV[vpCal][0]}). SVP ${svp(vpFill,T).toFixed(1)} kPa at ${T} °C.`+(Pa<100?` At ${Pa} kPa the % rises but partial pressure stays close to the sea-level value: clinical effect is unchanged.`:"");
  $("#vp-r").innerHTML=txt}
 const agOpts=[["hal","Halothane"],["iso","Isoflurane"],["enf","Enflurane"],["sevo","Sevoflurane"]];
 seg($("#vp-cal"),agOpts.map(([k,n])=>[k,n+" vaporiser"]),k=>{vpCal=k;drawVP()},"iso");
 seg($("#vp-fill"),agOpts.concat([["des","Desflurane"]]).map(([k,n])=>[k,"filled: "+n]),k=>{vpFill=k;drawVP()},"iso");
 seg($("#vp-comp"),[["yes","Compensated"],["no","Uncompensated"]],k=>{vpComp=k;drawVP()},"yes");["#vp-d","#vp-t","#vp-p"].forEach(x=>$(x).oninput=drawVP);

 /* 5. Electric shock */
 let esPath="hand",esSkin="wet";
 function drawES(){const svg=$("#es");svg.innerHTML="";const add=mk(svg);
  const Rskin={dry:100000,wet:1000,broken:500}[esSkin];const I=esPath==="heart"?230/(Rskin+500)*0.002:230/(Rskin*2+500);
  const levels=[[10e-6,"10 µA CF limit"],[100e-6,"100 µA microshock VF"],[1e-3,"1 mA tingle"],[5e-3,"5 mA pain"],[15e-3,"15 mA cannot let go"],[50e-3,"50 mA resp. arrest"],[100e-3,"100 mA VF"],[5,"5 A asystole/burns"]];
  const X=v=>40+(Math.log10(v)+6)/(Math.log10(10)+6)*440;
  add("line",{x1:40,x2:480,y1:200,y2:200,stroke:"var(--muted)"});
  levels.forEach(([v,l],i)=>{add("line",{x1:X(v),x2:X(v),y1:190,y2:210,stroke:"var(--muted)"});add("line",{x1:X(v),x2:X(v),y1:210,y2:214+(i%4)*15,stroke:"var(--line)"});add("text",{x:X(v),y:224+(i%4)*15,"text-anchor":"middle",class:"lbl","font-size":"9"},l)});
  add("circle",{cx:X(Math.max(1e-6,I)),cy:200,r:8,fill:"var(--bad)"});add("text",{x:X(Math.max(1e-6,I)),y:180,"text-anchor":"middle",class:"lbl"},I>=1e-3?(I*1000).toFixed(1)+" mA":(I*1e6).toFixed(0)+" µA");
  add("text",{x:40,y:40,class:"lbl"},"Current (log scale)");add("text",{x:40,y:60,class:"lbl","font-size":"11"},"230 V mains; skin "+Rskin.toLocaleString()+" Ω per contact; body 500 Ω");
  let eff=levels.filter(l=>I>=l[0]).map(l=>l[1]).pop()||"Below perception";
  const vfThr=esPath==="heart"?100e-6:100e-3;
  $("#es-r").innerHTML=`${esPath==="heart"?"Microshock path: only a tiny fraction (here 0.2%) of leakage current reaches a saline-filled central line, but it is delivered straight to the myocardium, so the VF threshold is ~100 µA.":"Macroshock path hand to hand: current spreads through the body; VF threshold ~100 mA."} Current <b>${I>=1e-3?(I*1000).toFixed(1)+" mA":(I*1e6).toFixed(0)+" µA"}</b>: ${eff}. ${I>=vfThr?"<b>VF likely.</b>":"VF unlikely at this current via this path."} Wet or broken skin lowers resistance dramatically (I = V/R).`}
 seg($("#es-path"),[["hand","Hand to hand (macroshock)"],["heart","Via central line (microshock)"]],k=>{esPath=k;drawES()},"hand");
 seg($("#es-skin"),[["dry","Dry skin"],["wet","Wet skin"],["broken","Broken skin / electrode gel"]],k=>{esSkin=k;drawES()},"wet");

 /* 6. Defibrillator */
 let dfW="bi";
 function drawDF(){const E=+$("#df-e").value,R=+$("#df-r").value;out("df-e",E);out("df-r",R);let pts=[],peak=0,txt;
  if(dfW==="mono"){const C=32e-6,L=0.05,Ri=11;const V=Math.sqrt(2*E/C);const Rt=R+Ri;const a=Rt/(2*L),w0=1/Math.sqrt(L*C);
   for(let t=0;t<=0.012;t+=0.0001){let i;if(a<w0){const wd=Math.sqrt(w0*w0-a*a);i=V/(L*wd)*Math.exp(-a*t)*Math.sin(wd*t)}else{const s=Math.sqrt(a*a-w0*w0);i=V/(L*2*s)*(Math.exp((-a+s)*t)-Math.exp((-a-s)*t))}pts.push([t*1000,i]);peak=Math.max(peak,i)}
   txt=`Monophasic damped sine (C 32 µF, L 50 mH): charged to ${(Math.sqrt(2*E/32e-6)/1000).toFixed(1)} kV; peak current <b>${peak.toFixed(0)} A</b> into ${R} Ω. No impedance compensation: high impedance lowers the current.`}
  else{const C=100e-6,V0=Math.sqrt(2*E/C);const comp=Math.min(1.4,Math.max(0.8,Math.sqrt(R/75)));const V=V0*comp;const tau=R*C;const d1=Math.min(0.008,Math.max(0.004,tau*0.8));const d2=d1*0.66;let Vend=0;
   for(let t=0;t<=0.012;t+=0.0001){let i=0;if(t<d1)i=V/R*Math.exp(-t/tau);else if(t<d1+d2){const Vs=V*Math.exp(-d1/tau);i=-Vs/R*Math.exp(-(t-d1)/tau)}pts.push([t*1000,i]);peak=Math.max(peak,Math.abs(i))}
   const tilt=1-Math.exp(-d1/tau);txt=`Biphasic truncated exponential: phase 1 ${(d1*1000).toFixed(1)} ms (tilt ${(tilt*100).toFixed(0)}%), then reversed for ${(d2*1000).toFixed(1)} ms. Peak current <b>${peak.toFixed(0)} A</b> into ${R} Ω. Devices adjust voltage or duration for impedance (compensation), so lower energies (120–200 J) achieve higher first-shock success.`}
  const ym=Math.max(60,peak*1.15);const P=plot($("#df"),{w:520,h:300,x0:0,x1:12,y0:dfW==="bi"?-ym*0.6:0,y1:ym,xt:[0,2,4,6,8,10,12],yt:(dfW==="bi"?[-Math.round(ym*0.5),0,Math.round(ym*0.5),Math.round(ym)]:[0,Math.round(ym*0.5),Math.round(ym)]),xl:"Time (ms)",yl:"Current (A)"});
  P.add("line",{x1:P.X(0),x2:P.X(12),y1:P.Y(0),y2:P.Y(0),stroke:"var(--muted)"});P.line(pts,{stroke:"var(--ecg)"});
  $("#df-r2").innerHTML=txt}
 seg($("#df-sel"),[["bi","Biphasic"],["mono","Monophasic"]],k=>{dfW=k;drawDF()},"bi");["#df-e","#df-r"].forEach(x=>$(x).oninput=drawDF);

 /* 7. Ultrasound */
 function drawUS(){const f=+$("#us-f").value,a=+$("#us-a").value;out("us-f",f);out("us-a",a);const svg=$("#us");svg.innerHTML="";
  const P=plot(svg,{w:520,h:150,x0:2,x1:15,y0:0,y1:16,xt:[2,5,8,11,15],yt:[0,8,16],yl:"cm / ×0.1 mm",clear:false,mb:28});
  P.line(range(2,15,100).map(x=>[x,Math.min(16,60/(2*0.7*x))]),{stroke:"var(--spo2)"});P.line(range(2,15,100).map(x=>[x,2*1.54/x*10]),{stroke:"var(--abp)","stroke-dasharray":"5 4"});
  P.text(10.5,12,"useful depth (cm)",{fill:"var(--spo2)","font-size":"10"});P.text(10.5,6,"axial resolution (0.1 mm)",{fill:"var(--abp)","font-size":"10"});
  P.add("line",{x1:P.X(f),x2:P.X(f),y1:P.Y(0),y2:P.Y(16),stroke:"var(--muted)","stroke-dasharray":"2 3"});
  const P2=plot(svg,{w:520,h:150,x0:0,x1:90,y0:0,y1:1,xt:[0,30,60,90],yt:[0,0.5,1],xl:"Insonation angle (°) / probe frequency (MHz, top)",yl:"cos θ",clear:false,yOff:150,mt:10});
  P2.line(range(0,90,90).map(x=>[x,Math.cos(x*Math.PI/180)]),{stroke:"var(--etco2)"});P2.dot(a,Math.cos(a*Math.PI/180),"var(--ink)","");
  const lam=1540/(f*1e6)*1000;const depth=60/(2*0.7*f);const df=2*f*1e6*0.5*Math.cos(a*Math.PI/180)/1540;
  $("#us-r").innerHTML=`${f} MHz: wavelength <b>${lam.toFixed(3)} mm</b>, axial resolution ~${(2*lam).toFixed(2)} mm, useful depth ~<b>${depth.toFixed(1)} cm</b> (${f>=8?"superficial blocks and vascular access":"deep, abdominal or cardiac"}). Doppler at ${a}°: measured shift is ${(Math.cos(a*Math.PI/180)*100).toFixed(0)}% of the true value (${(df/1000).toFixed(2)} kHz for 50 cm/s); ${a>60?"<b>angle too large</b>: velocity grossly underestimated":"acceptable if angle-corrected"}.`}
 ["#us-f","#us-a"].forEach(x=>$(x).oninput=drawUS);drawUS();
}

ATLAS.register({id:"10",name:"Physics & equipment",
  lede:"SI units, gas laws, flow, gas supply, the anaesthetic machine, breathing systems, CO2 absorption, vaporisers, ventilators, scavenging, heat and humidity, electricity and safety, defibrillators, diathermy, lasers, ultrasound, MRI and decontamination.",
  barsNote:"",
  bars:BARS,fam:FAM,slides:SLIDES,calcs:CALCS,tables:TABLES,cards:CARDS,fcf:FCF,viva:VIVA,quiz:QUIZ,crisis:CRISIS,
  sources:SRC,errata:ERR,refs:REFS,diagHTML:DIAG,initDiagrams,
  diagLede:"Seven live physics models: cylinder gauges (O2 vs N2O), laminar vs turbulent ETT flow with heliox, Venturi entrainment, a plenum vaporiser (temperature, altitude, wrong agent), electric shock paths, defibrillator waveforms and ultrasound trade-offs."});
})();
