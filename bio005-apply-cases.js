/* ============================================================
   BIO 005 Human Physiology, Fall 2026
   bio005-apply-cases.js

   THE USE IT CASE BANK. Fifteen weeks, four cases a week, one
   case set per week in four rooms: nursing, medicine, radiology,
   and exercise and allied health.

   Why this file exists. Use It is 25 percent of the grade and runs
   every week, and until Sep 7 2026 the only week that had its cases
   written was Week 1, inside week-01.html. Weeks 2 to 15 had a stage
   in the week page and nothing in it. Students were being sent to an
   assignment that did not exist.

   THE RULE THE ROOMS FOLLOW. The four cases in a week differ in who
   the patient is and what you are looking at. They do not differ in
   rigor, and every one of them assesses the same competencies. A
   student picks the room closest to where they are heading, or the
   one furthest from it, and either choice is a full answer.

   WEEK 1 IS COPIED, NOT REWRITTEN. Its four cases already ship
   inside week-01.html. They are reproduced here word for word so the
   week page and the Canvas assignment cannot drift apart. If you
   edit one, edit both, or better, make week-01.html read this file.

   ACCURACY NOTES. Every number in here is inside a real reference
   range or a published physiological range, and the cases that turn
   on a disputed mechanism say so in the prompt rather than keying an
   answer to one side. Those are marked in the source with a
   DISAGREEMENT comment: weeks 4, 13, 14 and 15.
   ============================================================ */

window.BIO005_APPLY = {

  rooms: ['Nursing', 'Medicine', 'Radiology', 'Exercise and allied health'],

  /* The five questions are written fresh each week so they point at
     that week's physiology, but they hold the same shape all term:
     name it, predict it, trace it, read the evidence, say what would
     change your mind. Students should feel the pattern by Week 4. */

  weeks: {

  /* ---------------------------------------------------------- 1 */
  1: {
    title: 'Foundations of Physiology',
    frame: 'All four cases are about a body holding a variable steady while something pushes on it. They differ in who the patient is and what you are looking at, not in how hard they are.',
    five: [
      'Name the physiological variable being regulated, and the control system doing the regulating.',
      'Predict what is happening to that variable, and in which direction.',
      'Explain the mechanism, component by component, all the way through the loop.',
      'Interpret the evidence you were given. Say what it shows and what it cannot show.',
      'Justify your conclusion, and name the one measurement that would change it.'
    ],
    cases: [
      { room:'Nursing', h:'She stood up and went gray',
        body:'Your patient has been in bed for three days. Sitting, their blood pressure is 118/74 with a heart rate of 78. You stand them up and after one minute it is 96/60 with a heart rate of 104. They say the room went dark for a second.',
        go:'what is being defended, what did gravity do to it, and what does the heart rate tell you that the blood pressure alone does not? Then say whether this loop is failing or working hard.' },
      { room:'Medicine', h:'The fever that keeps climbing',
        body:'A patient arrives at 38.2 &deg;C (100.8 &deg;F), shivering and asking for a blanket. Two hours later they are 39.6 &deg;C (103.3 &deg;F), have stopped shivering, and are sweating heavily. Nothing was given between the two readings.',
        go:'the set point moved twice. Say when and in which direction each time, and explain how the same unchanged loop produced two opposite responses.' },
      { room:'Radiology', h:'Three numbers after the scan',
        body:'A patient has a contrast enhanced CT. Their serum creatinine is 0.9 mg/dL the day before, 1.4 mg/dL at 48 hours, and 1.0 mg/dL at day seven. The reference range is 0.6 to 1.2 mg/dL.',
        go:'only one value is outside the range, so say what the trend shows that any single value could not. Then say what the return tells you about whether the control system was damaged or loaded.' },
      { room:'Exercise and allied health', h:'Sixty minutes in the heat',
        body:'A runner exercises for an hour at 32 &deg;C (89.6 &deg;F). Core temperature rises from 37.0 &deg;C (98.6 &deg;F) to 38.6 &deg;C (101.5 &deg;F) over the first thirty minutes, then holds there for the second thirty despite the same workload.',
        go:'explain the rise, then explain the plateau, which is the harder half. Say what is happening at minute 45 that was not happening at minute 5, and what would break the plateau.' }
    ]
  },

  /* ---------------------------------------------------------- 2 */
  2: {
    title: 'Molecules, Water &amp; Energy',
    frame: 'All four cases turn on the same idea: a protein can only do work while it is holding a shape, and shape is held by weak bonds that heat, pH and dilution can undo. Two of these cases are about enzymes directly. Two are about what molecules do in water when you change the conditions around them.',
    five: [
      'Name the molecule doing the work, and say what its shape has to be doing for it to work at all.',
      'Predict what happens to the rate of the process, and in which direction.',
      'Explain the mechanism at the level of bonds and the active site, not just the outcome.',
      'Interpret the evidence you were given. Say what it shows and what it cannot show.',
      'Justify your conclusion, and name the one measurement that would change it.'
    ],
    cases: [
      { room:'Nursing', h:'The coagulation panel that looked fine',
        body:'A trauma patient arrives with a core temperature of 33.5 &deg;C (92.3 &deg;F) after a long extrication and two liters of room temperature saline. They are still oozing from every puncture site. The lab reports a PT of 13.1 seconds and an INR of 1.1, both inside the reference range. The laboratory runs every clotting assay in a heating block held at 37 &deg;C (98.6 &deg;F).',
        go:'the clotting factors are enzymes. Say what 33.5 &deg;C does to an enzyme catalyzed rate, then explain why a normal result came back from a patient who is not clotting. Name the assumption the lab number is making about the patient.' },
      { room:'Medicine', h:'The acid that was doing a job',
        body:'A patient on a high dose proton pump inhibitor reports bloating and food that seems to sit. Gastric pH, normally about 1.5 to 2.0 between meals, measures 5.2. Pepsin is most active near pH 2 and has almost no activity at pH 5. Pepsinogen is converted to pepsin by acid.',
        go:'two separate things have gone wrong here, activation and activity, and you should name both. Then say whether raising the pH to 5 has denatured the enzyme or only silenced it, and what evidence would tell those apart.' },
      { room:'Radiology', h:'Why the contrast goes in the warmer',
        body:'Iodinated contrast is kept in a warming cabinet at 37 &deg;C (98.6 &deg;F) before a power injected CT. Cold contrast is noticeably thicker, and at the same injector setting a cold syringe reaches a higher pressure and delivers a slower flow than a warm one.',
        go:'this is not an enzyme, it is molecular motion. Explain what temperature does to the movement of molecules past one another, why that shows up as viscosity, and how viscosity changes the flow the injector can deliver. Then say what the warming cabinet is protecting.' },
      { room:'Exercise and allied health', h:'Nine seconds of maximal effort',
        body:'A cyclist performs an all out sprint. Power output peaks in the first three seconds and has fallen by about half at fifteen seconds. Muscle biopsy studies of similar efforts show phosphocreatine falling to roughly a fifth of its resting concentration, while ATP concentration falls only slightly, by around 20 to 40 percent at most.',
        go:'explain how power can collapse while ATP concentration barely moves. Name the reaction that is holding ATP up and say what it is spending to do it. Then say what the near constant ATP tells you about how tightly this variable is defended.' }
    ]
  },

  /* ---------------------------------------------------------- 3 */
  3: {
    title: 'Membranes, Transport &amp; Compartments',
    frame: 'All four cases ask the same question in different rooms: where did the water go, and what made it go there. Water never moves because you told it to. It moves down an osmotic gradient that solutes create, and solutes only cross a membrane if something carries them.',
    five: [
      'Name the compartments involved and say which solute is setting the gradient.',
      'Predict which way water moves, and say what happens to cell volume.',
      'Explain the transport mechanism by name: simple diffusion, facilitated diffusion, primary or secondary active transport, or osmosis, and say what powers it.',
      'Interpret the evidence you were given. Say what it shows and what it cannot show.',
      'Justify your conclusion, and name the one measurement that would change it.'
    ],
    cases: [
      { room:'Nursing', h:'The fluid that made the sodium worse',
        body:'A patient admitted with a serum sodium of 122 mEq/L (reference 135 to 145) is given one liter of 5 percent dextrose in water. Six hours later the sodium is 118 mEq/L. The dextrose is metabolized within minutes of entering the circulation.',
        go:'say what one liter of D5W actually is once the glucose is gone, and work out how it distributes across the compartments. Then explain why a fluid that contains no sodium at all lowered the measured sodium, and what that measurement is a concentration of.' },
      { room:'Medicine', h:'Sugar in the rehydration solution',
        body:'A child with severe watery diarrhea is treated with oral rehydration solution. The World Health Organization formula contains sodium, chloride, potassium, citrate and glucose. The glucose concentration is deliberately close to the sodium concentration. Plain salt water taken by mouth works far less well.',
        go:'the glucose is not there for calories. Name the transporter it is working, say what it drags with it, and explain the two step chain that ends with water moving. Then say why the sodium to glucose ratio matters and what happens if you make the drink sweeter.' },
      { room:'Radiology', h:'A tracer that stays where you put it',
        body:'Iodinated contrast injected intravenously distributes through plasma and the interstitial fluid and does not enter cells in any appreciable amount. A different agent, one that is small and lipid soluble, distributes through total body water. Both are given in the same dose and both are measured in plasma an hour later, and the concentrations are very different.',
        go:'explain, in membrane terms, why one agent stops at the cell surface and the other does not. Then say which compartment each one is measuring, and why the agent that spreads furthest gives the lower plasma concentration.' },
      { room:'Exercise and allied health', h:'Nine pounds in two days',
        body:'A wrestler makes weight by restricting fluid and sitting in a sauna, losing about 4 kg (roughly 9 lb) in 48 hours. Nearly all of that loss is water. Sweat is hypotonic to plasma: it contains sodium, but at a lower concentration than plasma does.',
        go:'sweat leaves from plasma, but the loss does not stay in plasma. Trace which compartment loses first, what happens to plasma osmolality when the fluid lost is dilute, and which way water then moves between the intracellular and extracellular compartments. Say what that predicts about cell volume.' }
    ]
  },

  /* ---------------------------------------------------------- 4 */
  4: {
    title: 'Electrical Signaling',
    frame: 'All four cases are about the same three numbers: where the membrane sits at rest, where threshold is, and whether the sodium channels are available. Change any one of them and excitability changes, sometimes in the direction you did not expect.',
    five: [
      'Name the ion whose movement matters here, and say which way its electrochemical gradient points.',
      'Predict what happens to the resting membrane potential and to threshold, separately.',
      'Explain the mechanism gate by gate: which channels open, which close, which are inactivated, and in what order.',
      'Interpret the evidence you were given. Say what it shows and what it cannot show.',
      'Justify your conclusion, and name the one measurement that would change it.'
    ],
    cases: [
      { room:'Nursing', h:'Potassium 6.8, and the heart got quieter',
        body:'A patient in renal failure has a serum potassium of 6.8 mEq/L (reference 3.5 to 5.0). The monitor first shows tall peaked T waves. Over the next hour the QRS widens and the rate slows. A student says the cells must be firing more easily, because the resting potential has moved closer to threshold.',
        go:'the student is right about the resting potential and wrong about the outcome. Say what raising extracellular potassium does to the resting membrane potential, then say what a membrane that sits depolarized for minutes does to voltage gated sodium channels. Name the channel state that explains the contradiction.' },
      { room:'Medicine', h:'The lip went numb before the pressure did',
        body:'After a dental block with lidocaine, a patient loses sharp pain first, then temperature, and keeps a sense of pressure and touch longest. Lidocaine blocks voltage gated sodium channels and binds far better to channels that are open or inactivated than to channels that are closed and resting.',
        go:'two things are going on: which channel state the drug prefers, and which fibers it reaches first. Explain why a nerve that is firing frequently is blocked more effectively than a quiet one. Then say what fiber diameter and myelination have to do with the order the sensations disappear.' },
      { room:'Radiology', h:'The lead in the magnet',
        body:'A patient with an implanted cardiac device is being screened for MRI. A changing magnetic field induces current in a conductor, and an implanted lead is a conductor sitting in tissue. The physicist explains that the concern is not the magnet pulling on the device but the current the scan can induce at the lead tip.',
        go:'you are being asked to think about an externally applied current. Explain what injecting current at a point on an excitable membrane does to the local membrane potential, and what has to happen for that to become a propagated action potential. Then say why the tip of the lead, rather than its length, is where this matters.' },
      { room:'Exercise and allied health', h:'The cramp at mile twenty',
        body:'A runner cramps in both calves late in a marathon. Two explanations compete in the literature. One says the cramp is electrolyte and dehydration driven. The other says it is altered neuromuscular control: with fatigue, excitatory drive from muscle spindles rises and inhibitory drive from Golgi tendon organs falls, leaving the motor neuron pool hyperexcitable. Cramping runners are often not more dehydrated than non cramping runners in the same race, and stretching relieves a cramp within seconds, faster than any fluid could act.',
        go:'this one has no settled answer, and saying so is part of a full response. Lay out what each explanation predicts you would find, name the two observations in the paragraph above that are hard for the electrolyte explanation, and say what a study would have to measure to separate them.' }
    ]
  },

  /* ---------------------------------------------------------- 5 */
  5: {
    title: 'The Nervous System',
    frame: 'All four cases are about a pathway with more than one neuron in it, where the useful question is not what is broken but where. Reflexes and autonomic pathways both let you localize a lesion from the pattern of what still works.',
    five: [
      'Name the pathway and count the neurons in it, from the stimulus to the effector.',
      'Predict which parts of the pathway are intact and which are not, from the pattern given.',
      'Explain the synaptic events: which transmitter, which receptor, excitatory or inhibitory, and where the integration happens.',
      'Interpret the evidence you were given. Say what it shows and what it cannot show.',
      'Justify your conclusion, and name the one measurement that would change it.'
    ],
    cases: [
      { room:'Nursing', h:'The reflex that came back stronger',
        body:'A patient with a complete spinal cord injury at T6 has no reflexes at all below the level for the first two weeks. By week eight the knee jerk below the injury is brisk and easy to elicit, and a light touch to the sole produces a large withdrawal. Nothing was repaired.',
        go:'the arc below the lesion was intact the whole time, so the change is not in the arc. Name what normally reaches those segments from above and what it does. Then explain the two phases, why the reflexes were absent first and exaggerated later, using the same anatomy for both.' },
      { room:'Medicine', h:'One pupil, one eyelid, one dry cheek',
        body:'A patient has a slightly drooping left eyelid, a left pupil that stays small in a dark room, and no sweating on the left side of the face. The right side is normal. Vision is normal and the pupil still constricts to light. The sympathetic supply to the eye is a chain of three neurons that leaves the hypothalamus, descends into the upper thoracic cord, and travels back up the neck.',
        go:'name what each of the three findings tells you the sympathetic supply is failing to do. Then say what still works, and explain why the pupil constricts normally to light even though it will not dilate in the dark. Use the intact half of the autonomic supply in your answer.' },
      { room:'Radiology', h:'The patient who went pale on the table',
        body:'During an IV placement for a contrast study, a patient becomes pale and sweaty, says they feel sick, and passes out briefly. Heart rate is 44 and blood pressure is 82/50. They recover fully within a minute of lying flat with their legs up. A colleague asks whether this was a contrast reaction, and notes that anaphylaxis also causes hypotension.',
        go:'both events drop the blood pressure, and the heart rate is what separates them. Say which autonomic outflow is dominating here and what it is doing to the heart and to the vessels. Then say what the heart rate would be doing in anaphylaxis instead, and why.' },
      { room:'Exercise and allied health', h:'The lift that would not come up',
        body:'An athlete loading a heavy squat reaches a point where the muscle abruptly gives, without pain and without warning. Two receptors sit in this system: muscle spindles lie in parallel with the muscle fibers and respond to length and rate of change of length, and Golgi tendon organs lie in series at the musculotendinous junction and respond to tension.',
        go:'name which receptor is loaded by a heavy contraction rather than by a stretch, say whether its reflex is excitatory or inhibitory to its own muscle, and explain the sign change through the interneuron. Then say what a spindle would have done in the same moment and why the two receptors give opposite answers.' }
    ]
  },

  /* ---------------------------------------------------------- 6 */
  6: {
    title: 'Muscle',
    frame: 'All four cases follow the same chain: nerve, synapse, membrane, calcium, crossbridge. Something in that chain is doing too much or too little, and the pattern of the failure tells you which link.',
    five: [
      'Name where in the chain from motor neuron to crossbridge this case sits.',
      'Predict what happens to force, and to the time course of force, separately.',
      'Explain the mechanism through excitation contraction coupling, naming what calcium is doing and where it is coming from.',
      'Interpret the evidence you were given. Say what it shows and what it cannot show.',
      'Justify your conclusion, and name the one measurement that would change it.'
    ],
    cases: [
      { room:'Nursing', h:'The jaw that would not open',
        body:'Twenty minutes into a general anesthetic a patient develops a rigid jaw, then generalized rigidity. End tidal carbon dioxide climbs, the temperature rises about 1 &deg;C (1.8 &deg;F) every ten minutes, and the muscles feel hard rather than tense. The treatment given is dantrolene, which reduces calcium release from the sarcoplasmic reticulum.',
        go:'this is a calcium handling problem, not a nerve problem. Say what an uncontrolled release of calcium into the cytosol does to troponin and therefore to the crossbridge cycle, and why the muscle cannot relax. Then explain where the heat and the carbon dioxide are coming from, using ATP in your answer.' },
      { room:'Medicine', h:'Worse at the end of the day, better after rest',
        body:'A patient has drooping eyelids and double vision that are mild in the morning and marked by evening. Strength improves after a period of rest. On repetitive nerve stimulation the recorded muscle response gets smaller with each successive stimulus. A second patient, elsewhere in the clinic, has weakness that briefly improves with repeated effort, and their recorded response gets larger with rapid repetitive stimulation.',
        go:'the two patients fail on opposite sides of the same synapse. For each, say whether the problem is releasing the transmitter or responding to it, and name the structure involved. Then explain why one gets weaker with repetition and the other gets stronger, using the amount of transmitter in the cleft.' },
      { room:'Radiology', h:'The diaphragm that went the wrong way',
        body:'Under fluoroscopy a patient is asked to sniff sharply. The right hemidiaphragm moves down. The left moves up. In quiet breathing the difference is not obvious.',
        go:'name what makes a normal diaphragm move down on inspiration, and say what pressure is doing in the thorax at that moment. Then explain why a paralyzed hemidiaphragm moves in the opposite direction, and why a sharp sniff shows this when quiet breathing does not.' },
      { room:'Exercise and allied health', h:'Sore on Wednesday, not on Monday',
        body:'An athlete does a session of downhill running on Monday. They feel fine that evening. Soreness begins Tuesday afternoon, peaks Wednesday, and resolves by Friday. Blood lactate returns to resting concentrations within about an hour of any hard session. Downhill running loads muscle while it is lengthening.',
        go:'first, use the lactate time course to rule something out, and say plainly what it rules out. Then name what a lengthening contraction does mechanically that a shortening one does not, and explain the 48 hour delay in terms of what has to happen after the damage before you feel it.' }
    ]
  },

  /* ---------------------------------------------------------- 7 */
  7: {
    title: 'Chemical Signaling &amp; Endocrine Control',
    frame: 'All four cases are about an axis: a signal, a target, and a feedback line running backwards. Endocrine problems are usually easier to localize than they look, because the feedback hormone tells you which end is broken.',
    five: [
      'Name the hormone, its target tissue, and the receptor type it uses.',
      'Predict which way each hormone in the axis moves, including the ones you were not given.',
      'Explain the mechanism from receptor binding to cellular response, and say where the negative feedback closes.',
      'Interpret the evidence you were given. Say what it shows and what it cannot show.',
      'Justify your conclusion, and name the one measurement that would change it.'
    ],
    cases: [
      { room:'Nursing', h:'Insulin for a potassium problem',
        body:'A patient with a serum potassium of 6.9 mEq/L is given intravenous insulin together with dextrose. The potassium falls to 5.4 within thirty minutes. Total body potassium has not changed, and none has been excreted in that time.',
        go:'the potassium went somewhere rather than leaving. Name the pump insulin stimulates and say which way it moves potassium across the membrane. Then explain the receptor and second messenger steps between insulin binding and that pump working, and say why the dextrose is given alongside.' },
      { room:'Medicine', h:'TSH 8.4, free T4 normal',
        body:'A patient has a TSH of 8.4 mIU/L (reference roughly 0.4 to 4.0) and a free T4 of 1.1 ng/dL, which is inside the reference range. They feel mildly tired. TSH is released by the anterior pituitary, and thyroid hormone feeds back on the pituitary and hypothalamus. TSH changes in a roughly logarithmic way for a linear change in T4.',
        go:'say which end of this axis is failing and how the two numbers together tell you that. Then explain why the pituitary hormone leaves the reference range before the thyroid hormone does, and what that log linear relationship means for how sensitive TSH is as a test.' },
      { room:'Radiology', h:'The thyroid scan that would not take up',
        body:'A patient is scheduled for a radioiodine uptake study. Two weeks earlier they had a CT with iodinated contrast. The uptake is very low, and the scan is non diagnostic. Departments commonly wait several weeks after iodinated contrast before performing this study. Thyroid follicular cells take up iodide through the sodium iodide symporter.',
        go:'name the transporter and say what it is being asked to do in this study. Then explain why a large iodine load given weeks earlier is still interfering, using competition and the size of the load in your answer. Say what measurement would tell you when the study could be repeated.' },
      { room:'Exercise and allied health', h:'The sprint that raised the glucose',
        body:'A person with type 1 diabetes finds that a 45 minute easy jog reliably drops their glucose, while a set of maximal 30 second sprints reliably raises it, sometimes by 3 to 4 mmol/L. Both sessions use glucose in muscle. Catecholamines rise steeply with high intensity work and modestly with easy work, and glucagon rises with prolonged work.',
        go:'glucose in the blood is the difference between what the liver puts in and what the muscle takes out. For each session, say which hormones dominate and what each is doing to the liver and to the muscle. Then explain how the same exercise can move the same variable in two directions.' }
    ]
  },

  /* ---------------------------------------------------------- 8 */
  8: {
    title: 'Reproductive Physiology',
    frame: 'All four cases are about the same axis, hypothalamus to pituitary to gonad, and the same trick: the two pituitary hormones read together tell you which end of the axis the problem is at.',
    five: [
      'Name the three levels of the axis and the hormone each one releases.',
      'Predict which way FSH, LH and the gonadal steroid each move in this case.',
      'Explain the feedback, saying where it is negative, where and when it becomes positive, and what pulse frequency has to do with it.',
      'Interpret the evidence you were given. Say what it shows and what it cannot show.',
      'Justify your conclusion, and name the one measurement that would change it.'
    ],
    cases: [
      { room:'Nursing', h:'The pills that were missed in week one',
        body:'A patient taking a combined oral contraceptive misses the pills on days 5 and 6 of a new pack and takes two the next day. They ask whether they are protected. The combined pill works largely by supplying steroid at a steady concentration, which suppresses pituitary FSH and LH and prevents a follicle from being selected and from receiving an LH surge.',
        go:'name what the pill is replacing and which feedback line it is holding down. Then explain what happens to FSH during a two day gap early in a pack, why early in the pack is the vulnerable time rather than late, and what would have to occur for an ovulation to escape.' },
      { room:'Medicine', h:'FSH 42, LH 30, estradiol low',
        body:'A 34 year old patient has not menstruated for eight months. FSH is 42 IU/L and LH is 30 IU/L, both well above the follicular phase range, and estradiol is low. A second patient, same age and same missed periods, has FSH of 2.1, LH of 1.8 and estradiol that is also low.',
        go:'both patients have low estradiol and the gonadotropins point in opposite directions. For each, say whether the failure is at the gonad or above it, and explain how negative feedback produces high gonadotropins in one and low in the other. Then name which single additional test you would want in each case.' },
      { room:'Radiology', h:'Reading the cycle from the images',
        body:'Serial transvaginal ultrasounds through one cycle show a dominant follicle growing from 10 mm to 21 mm over six days, then disappearing, with a small amount of free fluid seen the next day. The endometrium measures 4 mm early, 10 mm just before the follicle disappears, and stays thick afterwards with a different, more uniform appearance.',
        go:'match the images to the hormone curves. Say which hormone is driving the follicle growth, what event the disappearance corresponds to and which hormone surge caused it, and which hormone is responsible for the endometrium after that point. Then say what the endometrium alone could not have told you.' },
      { room:'Exercise and allied health', h:'The cycles that stopped during a heavy training block',
        body:'An athlete increases training volume substantially and stops menstruating after three months. FSH and LH are both low, estradiol is low, and the ovaries look normal on imaging. Thyroid function and prolactin are normal. GnRH is released in pulses, and the pituitary responds to the frequency of those pulses, not just to their presence. Reduced energy availability, meaning the energy left over after training is subtracted from intake, slows GnRH pulse frequency.',
        go:'the ovary is being blamed and the ovary is fine. Say which level of the axis has changed and what specifically about its signal has changed. Then explain why low FSH and LH with low estradiol localizes the problem above the gonad, and say what would be expected to happen to the pulse frequency if energy availability were restored.' }
    ]
  },

  /* ---------------------------------------------------------- 9 */
  9: {
    title: 'Cardiac Function',
    frame: 'All four cases come back to one equation, cardiac output equals heart rate times stroke volume, and to the fact that the two terms are not independent. Anything that changes filling time changes stroke volume.',
    five: [
      'Name which term of cardiac output is changing, and say what is happening to the other one.',
      'Predict what happens to stroke volume and to cardiac output, separately, and say why they can move in opposite directions.',
      'Explain the mechanism through the cardiac cycle: filling, contraction, ejection, and where in that cycle the change lands.',
      'Interpret the evidence you were given. Say what it shows and what it cannot show.',
      'Justify your conclusion, and name the one measurement that would change it.'
    ],
    cases: [
      { room:'Nursing', h:'The rate went up and the pressure went down',
        body:'A patient in a supraventricular tachycardia has a heart rate of 190 and a blood pressure of 84/56. They are cool and confused. At a rate of 80 the same patient had a pressure of 126/78. Diastole is the part of the cycle that shortens most as rate rises.',
        go:'use cardiac output equals heart rate times stroke volume and say which term fell and why. Then explain, using the cardiac cycle, why filling suffers before ejection does, and say what preload and the length tension relationship have to do with the falling stroke volume.' },
      { room:'Medicine', h:'The rhythm with no P waves',
        body:'A patient in atrial fibrillation has an irregularly irregular pulse and no P waves on the ECG. They were previously well and now become breathless walking upstairs. Atrial contraction contributes a modest share of ventricular filling in a healthy heart at rest, and a larger share when the ventricle is stiff or the rate is fast.',
        go:'name what the atria normally add and when in the cycle they add it. Then say why losing that contribution matters more in a stiff ventricle than a compliant one, and why symptoms show up on exertion rather than at rest. Bring rate irregularity into your answer as a second, separate mechanism.' },
      { room:'Radiology', h:'Ejection fraction 58 percent, and short of breath',
        body:'An echocardiogram reports a left ventricular ejection fraction of 58 percent, which is normal. The patient has clear signs of heart failure. The report also notes a thick walled ventricle and abnormal filling on the Doppler tracing. Ejection fraction is stroke volume divided by end diastolic volume.',
        go:'ejection fraction is a ratio, and a ratio hides its numerator and denominator. Say what happens to that fraction if both volumes fall together, and why a normal fraction is compatible with a low stroke volume. Then say which half of the cardiac cycle this patient is failing in, and name the measurement that shows it.' },
      { room:'Exercise and allied health', h:'A resting heart rate of 42',
        body:'A trained endurance athlete has a resting heart rate of 42 and a resting cardiac output that is normal for their size. Their maximum heart rate is unchanged by training, but their maximum cardiac output is much higher than an untrained person of the same size. Echocardiography shows a larger end diastolic volume.',
        go:'at rest, say which term of cardiac output has changed and which has compensated, and name the autonomic change involved. Then explain how the same structural adaptation that lowers the resting rate raises the maximum output, using end diastolic volume and the length tension relationship.' }
    ]
  },

  /* --------------------------------------------------------- 10 */
  10: {
    title: 'Circulation &amp; Blood Pressure',
    frame: 'All four cases sit on mean arterial pressure equals cardiac output times total peripheral resistance, and on the fact that resistance is exquisitely sensitive to radius. The baroreflex defends pressure, which is not the same as defending flow.',
    five: [
      'Name what is being defended, pressure or flow, and say which one the body is prepared to sacrifice.',
      'Predict what happens to cardiac output and to total peripheral resistance, separately.',
      'Explain the mechanism through the baroreflex or through the relationship between radius and resistance, whichever this case turns on.',
      'Interpret the evidence you were given. Say what it shows and what it cannot show.',
      'Justify your conclusion, and name the one measurement that would change it.'
    ],
    cases: [
      { room:'Nursing', h:'The pressure that stayed normal until it did not',
        body:'A patient bleeding after surgery has a blood pressure of 118/76 with a heart rate of 118, cool hands and a urine output of 10 mL/hr. Forty minutes later, with no intervention, the pressure is 76/44. Nothing about the rate of bleeding changed between the two readings.',
        go:'the first set of numbers is not a reassuring set. Say what the baroreflex was doing to heart rate and to vessel radius to hold that pressure up, and name the two things it was sacrificing to do it, using the cool hands and the urine output as your evidence. Then explain what changes at the moment the pressure finally falls.' },
      { room:'Medicine', h:'The kidney that raised the pressure',
        body:'A patient has a blood pressure of 192/108 and a bruit audible over the flank. Imaging shows a narrowed renal artery on one side. The affected kidney senses reduced perfusion pressure and releases renin.',
        go:'the narrowing lowers pressure downstream and the response raises pressure everywhere. Trace the pathway from renin to a raised systemic pressure, naming each step and both of its effects, on vessels and on sodium. Then say what the kidney is trying to correct and why correcting it locally costs the whole body.' },
      { room:'Radiology', h:'Seventy percent by diameter',
        body:'A stenosis is reported as a 70 percent reduction in luminal diameter. Resistance to laminar flow varies inversely with the fourth power of the radius. Clinically, resting flow through an arterial stenosis is usually well maintained until the diameter reduction is large, and it is flow during increased demand that fails first.',
        go:'do the arithmetic: a 70 percent diameter reduction leaves what fraction of the radius, and what does that do to resistance? Then explain why resting flow can be nearly normal despite that number, naming what happens downstream to compensate, and why the reserve is spent before the resting flow falls.' },
      { room:'Exercise and allied health', h:'Pressure up, resistance down',
        body:'During steady cycling at a moderate intensity, cardiac output rises roughly fourfold. Mean arterial pressure rises only modestly, perhaps 10 to 20 mmHg. Blood flow to the working legs rises many times over, while flow to the gut and to non working muscle falls.',
        go:'if output quadrupled and pressure barely moved, say what total peripheral resistance must have done and why. Then explain how resistance can fall overall while it is rising in some beds, and name the local and the neural mechanisms that are pulling in opposite directions at the same time.' }
    ]
  },

  /* --------------------------------------------------------- 11 */
  11: {
    title: 'Blood &amp; Immunity',
    frame: 'All four cases are about the difference between what a number measures and what you wish it measured. Hematocrit is a ratio. Saturation is a percentage of something you have to name. Two different mechanisms can produce the same rash.',
    five: [
      'Name exactly what the measurement is a measurement of, including its denominator.',
      'Predict which way it moves, and say whether the quantity you actually care about moved with it.',
      'Explain the mechanism, whether that is oxygen carriage, plasma volume, or the pathway producing the response.',
      'Interpret the evidence you were given. Say what it shows and what it cannot show.',
      'Justify your conclusion, and name the one measurement that would change it.'
    ],
    cases: [
      { room:'Nursing', h:'Hematocrit 53 after two days of vomiting',
        body:'A patient admitted after two days of vomiting and poor intake has a hematocrit of 53 percent (reference roughly 41 to 50 for adult men, 36 to 44 for adult women). They have not been given any blood. Hematocrit is the fraction of blood volume occupied by red cells.',
        go:'name the numerator and the denominator of this measurement and say which one changed. Then explain why a patient can have a high hematocrit with a normal or even reduced red cell mass, and predict what the number will do after rehydration without a single red cell being added or lost.' },
      { room:'Medicine', h:'Saturation 99 percent, and getting worse',
        body:'A patient rescued from a house fire is drowsy and headachy. The pulse oximeter reads 99 percent. An arterial blood gas shows a PaO2 of 96 mmHg, which is normal, and co-oximetry reports a carboxyhemoglobin of 28 percent. A standard pulse oximeter uses two wavelengths of light and cannot distinguish carboxyhemoglobin from oxyhemoglobin.',
        go:'say what the pulse oximeter is actually reporting and why that number is not oxygen content. Then explain the two separate injuries carbon monoxide does, one to how much oxygen the blood carries and one to how readily it gives it up, and say which of the three numbers in the case reflects each.' },
      { room:'Radiology', h:'Hives after the contrast, and no antibodies',
        body:'A patient develops widespread hives and mild wheeze within minutes of an iodinated contrast injection. They have never received contrast before. Testing finds no drug specific IgE. Most immediate reactions to iodinated contrast are not IgE mediated: the agent can cause mast cells and basophils to release histamine directly. A minority of reactions are true IgE mediated allergy.',
        go:'two mechanisms, one appearance. Say what a true IgE mediated reaction requires that this patient does not have, and name what step it would have needed on a previous exposure. Then explain the direct release pathway, and say what the clinical implication is for whether the same reaction is guaranteed to recur.' },
      { room:'Exercise and allied health', h:'The hematocrit that rose in three days',
        body:'An athlete goes to 2,500 m for an altitude camp. Hematocrit measured on day three is noticeably higher than at sea level. New red cell production driven by erythropoietin takes on the order of two to three weeks to change red cell mass appreciably. Plasma volume falls in the first days at altitude.',
        go:'say which of the two possible explanations the three day time course rules out, and why. Then name what actually changed by day three, and explain what would have to be measured, rather than hematocrit, to know whether the camp had produced any real gain in oxygen carrying capacity.' }
    ]
  },

  /* --------------------------------------------------------- 12 */
  12: {
    title: 'Digestion, Absorption &amp; Energy Balance',
    frame: 'All four cases are about a step in a sequence. Digestion is mechanical, then enzymatic, then absorptive, and energy balance sits on the far end of it. Find the step that failed and the symptom explains itself.',
    five: [
      'Name the step in the sequence that has failed, and say what normally happens there.',
      'Predict what accumulates upstream of the failure and what is missing downstream of it.',
      'Explain the mechanism, naming the enzyme, transporter or muscle layer involved.',
      'Interpret the evidence you were given. Say what it shows and what it cannot show.',
      'Justify your conclusion, and name the one measurement that would change it.'
    ],
    cases: [
      { room:'Nursing', h:'The tube feed that caused diarrhea',
        body:'A patient on a nasogastric feed develops large volume watery stools within a day of the rate being increased. The formula is concentrated, at about 2 kcal/mL. Stopping the feed stops the diarrhea within hours. There is no fever and no blood.',
        go:'the stool volume is following the feed, which tells you which of the two broad mechanisms this is. Say what a concentrated formula does to the osmolality of the intestinal lumen, which way water then moves across the intestinal epithelium, and why it stops when the feed stops. Then say what would be true instead if this were a secretory diarrhea.' },
      { room:'Medicine', h:'Fat in the stool, and a vitamin problem behind it',
        body:'A patient with long standing pancreatic disease has pale, greasy, foul stools that are hard to flush, and has lost weight despite eating. Vitamin D and vitamin A concentrations are low. Serum albumin is normal and there is no anemia from iron deficiency.',
        go:'name the enzyme class that is missing and the step of fat handling that fails without it. Then explain why the vitamins that are low are exactly the ones that are low, and use the normal albumin and normal iron to argue that this is a specific failure rather than general malabsorption.' },
      { room:'Radiology', h:'The barium that sat in the esophagus',
        body:'A barium swallow shows contrast pooling in a dilated esophagus with a smooth, narrow tapering at the bottom. On manometry the lower esophageal sphincter does not relax when the patient swallows, and there are no organized peristaltic waves in the body of the esophagus.',
        go:'name what normally makes a swallow travel and what normally makes the sphincter open, and say which nerve supply coordinates both. Then explain why the narrowing is smooth and tapered rather than irregular, and what that appearance tells you about whether this is muscle, nerve, or a mass.' },
      { room:'Exercise and allied health', h:'The measured metabolic rate after weight loss',
        body:'A patient loses 12 kg (about 26 lb) over six months. Resting metabolic rate is measured by indirect calorimetry before and after and is lower than the prediction equations expect for their new body mass, by roughly 10 percent. Total daily energy expenditure is made up of resting metabolic rate, the thermic effect of food, and activity.',
        go:'separate the two reasons a metabolic rate falls with weight loss, the one that is simple arithmetic and the one that is not. Then say what indirect calorimetry actually measures, name each component of total daily expenditure and say which of them the measurement did and did not capture.' }
    ]
  },

  /* --------------------------------------------------------- 13 */
  13: {
    title: 'Respiratory Physiology',
    frame: 'All four cases separate two things students routinely merge: moving air, and exchanging gas. A patient can move plenty of air and exchange almost nothing, and the arithmetic tells you which is happening.',
    five: [
      'Name whether the failure is in ventilation, in gas exchange, or in gas transport.',
      'Predict what happens to PaO2 and to PaCO2, separately, and say whether they move together.',
      'Explain the mechanism, using alveolar ventilation, the ventilation perfusion relationship, or the oxygen dissociation curve as this case requires.',
      'Interpret the evidence you were given. Say what it shows and what it cannot show.',
      'Justify your conclusion, and name the one measurement that would change it.'
    ],
    cases: [
      { room:'Nursing', h:'Oxygen at six liters, and then he was sleepy',
        body:'A patient with severe COPD is placed on 6 L/min by nasal cannula for a saturation of 84 percent. Over the next hour the saturation reaches 98 percent, the patient becomes drowsy, and a blood gas shows the PaCO2 has risen from 58 to 79 mmHg. Three mechanisms are described for this: loss of hypoxic ventilatory drive, worsening of ventilation perfusion matching as hypoxic pulmonary vasoconstriction is released, and the Haldane effect, in which oxygenated hemoglobin carries less carbon dioxide. Measured minute ventilation in these patients typically falls only slightly, which is hard to reconcile with drive being the main cause.',
        go:'name all three mechanisms and say what each one predicts would happen to minute ventilation. Then use the observation about minute ventilation to argue which mechanism the evidence supports least well, and say plainly that this is contested. Finish by saying what the target saturation should be and why the answer is not to remove the oxygen.' },
      { room:'Medicine', h:'PaO2 of 54 with a clear chest film',
        body:'A patient is breathlessly short of breath after a long flight. The chest radiograph is normal. On room air the arterial blood gas shows a PaO2 of 54 mmHg, a PaCO2 of 30 mmHg and a pH of 7.48. The alveolar gas equation gives an expected alveolar PO2 of about 110 mmHg under these conditions.',
        go:'calculate the alveolar to arterial oxygen difference and say what a widened difference rules in and rules out. Then explain, using ventilation and perfusion, how a region can be ventilated and not perfused, what that does to gas exchange, and why the PaCO2 is low rather than high.' },
      { room:'Radiology', h:'The lung base that would not stay open',
        body:'Post operative films show collapse at both lung bases. The surface of an alveolus is lined with fluid, and surface tension in that fluid pulls the alveolus toward collapse. The pressure generated by that tension is proportional to the tension and inversely proportional to the radius. Surfactant reduces surface tension, and it does so more effectively as an alveolus gets smaller.',
        go:'use the relationship between pressure, tension and radius to say what happens to a small alveolus next to a large one if surface tension were the same in both. Then explain how surfactant changes that outcome, and say what a deep breath or a sustained inflation is doing for the patient in mechanical terms.' },
      { room:'Exercise and allied health', h:'Forty breaths a minute and still not enough',
        body:'A patient is breathing 40 times a minute with a tidal volume of about 250 mL. Their minute ventilation is therefore 10 L/min, which is high. Anatomical dead space is roughly 150 mL and does not change with tidal volume. Their PaCO2 is rising.',
        go:'work out alveolar ventilation for this pattern, then work it out again for a person breathing 10 times a minute at 1,000 mL, which is the same minute ventilation. Explain the difference in terms of dead space fraction, and say why minute ventilation on a monitor can look reassuring while the patient is ventilating poorly.' }
    ]
  },

  /* --------------------------------------------------------- 14 */
  14: {
    title: 'Renal Physiology &amp; Fluid Balance',
    frame: 'All four cases are about the kidney doing exactly what it was asked to do. Most of what looks like kidney failure is the kidney defending volume, and most of what looks like a kidney number is a number about something else.',
    five: [
      'Name what the kidney is defending in this case, and what it is spending to defend it.',
      'Predict what happens to glomerular filtration rate, to urine volume, and to urine sodium, separately.',
      'Explain the mechanism through filtration, reabsorption and secretion, naming the hormone and the segment it acts on.',
      'Interpret the evidence you were given. Say what it shows and what it cannot show.',
      'Justify your conclusion, and name the one measurement that would change it.'
    ],
    cases: [
      { room:'Nursing', h:'Fifteen milliliters an hour',
        body:'A patient two hours out of major surgery has a urine output of 15 mL/hr. The urine is dark and concentrated. Urine sodium is 12 mEq/L, which is low. Serum creatinine has not yet changed. Surgery is a strong stimulus to antidiuretic hormone release, and blood loss is a strong stimulus to aldosterone.',
        go:'say whether this kidney is failing or working, and use the urine sodium to make the argument. Then name the two hormones involved, say which nephron segment each acts on and what each one reabsorbs, and explain why one produces concentrated urine and the other produces sodium poor urine.' },
      { room:'Medicine', h:'Creatinine 1.4 in two very different people',
        body:'Two patients have a serum creatinine of 1.4 mg/dL. One is 86 years old, frail and weighs 48 kg (about 106 lb). The other is 26, muscular and weighs 104 kg (about 229 lb). Creatinine is produced from muscle at a rate roughly proportional to muscle mass, is freely filtered, and is only modestly secreted.',
        go:'the same number means two different filtration rates. Say what serum creatinine is a balance between, and which side of that balance differs between these two people. Then explain what an estimated GFR equation is trying to correct for, and name the situation in which those equations are least trustworthy.' },
      { room:'Radiology', h:'The creatinine that rose after the contrast',
        body:'A patient has a CT with contrast and their creatinine rises over the following 48 hours. For years this was attributed to the contrast. More recent controlled work comparing patients who received contrast with similar patients who did not, matched for how ill they were, has found much smaller differences than the older uncontrolled studies did, and some found none. Patients who receive contrast are, as a group, sicker than those who do not.',
        go:'say what mechanism was proposed for contrast injuring the kidney, at the level of the medulla and its oxygen supply. Then explain what confounding by indication means here, why the older studies were vulnerable to it, and what study design would separate association from cause. This is an open question and your answer should say so.' },
      { room:'Exercise and allied health', h:'The runner who drank at every station',
        body:'A runner finishes a marathon confused and unwell. Serum sodium is 126 mEq/L. They gained 2 kg (about 4.4 lb) over the race. Antidiuretic hormone is normally suppressed by a falling plasma osmolality, but during prolonged exertion it is often released anyway in response to non osmotic stimuli.',
        go:'weight went up, so say what that rules out immediately. Then explain the two things that had to happen together for the sodium to fall this far, one about intake and one about the kidney being unable to excrete the water. Name where ADH acts and what it inserts into the membrane, and say why drinking to thirst is the guidance that follows.' }
    ]
  },

  /* --------------------------------------------------------- 15 */
  15: {
    title: 'Acid-Base Balance &amp; Integration',
    frame: 'All four cases are read the same way and in the same order: pH first, then which of the two numbers explains it, then whether the other one is compensating and by how much. This is the week where the lungs and the kidneys stop being separate chapters.',
    five: [
      'Read the pH first and name the primary disturbance, respiratory or metabolic, acidosis or alkalosis.',
      'Predict what the compensating system should be doing, and say how fast it can do it.',
      'Explain the mechanism, naming the buffer, the lever the lungs pull, and the lever the kidney pulls.',
      'Interpret the evidence you were given. Say what it shows and what it cannot show.',
      'Justify your conclusion, and name the one measurement that would change it.'
    ],
    cases: [
      { room:'Nursing', h:'pH 7.26, PaCO2 28, bicarbonate 12',
        body:'A patient in diabetic ketoacidosis has an arterial pH of 7.26, a PaCO2 of 28 mmHg and a bicarbonate of 12 mEq/L. They are breathing deeply and rapidly. Sodium is 134, chloride 96. Winter’s formula predicts the expected PaCO2 in a metabolic acidosis as 1.5 times the bicarbonate plus 8, plus or minus 2.',
        go:'name the primary disturbance from the pH and the bicarbonate. Calculate the anion gap and say what a raised gap tells you about where the acid came from. Then apply Winter’s formula and say whether the respiratory response is appropriate, inadequate, or more than expected, and what each of those three answers would mean clinically.' },
      { room:'Medicine', h:'pH 7.49, PaCO2 48, bicarbonate 36',
        body:'A patient has been vomiting for four days. Arterial pH is 7.49, PaCO2 is 48 mmHg and bicarbonate is 36 mEq/L. They are volume depleted, and urine chloride is low. Gastric fluid is rich in hydrogen and chloride.',
        go:'name the primary disturbance and say what was lost to cause it. Then explain why the PaCO2 is above the reference range and why that is a compensation rather than a second problem. Finish with the harder half: explain why volume depletion keeps this alkalosis going even after the vomiting has stopped, using sodium reabsorption and chloride availability in your answer.' },
      { room:'Radiology', h:'Tingling hands in the scanner',
        body:'A claustrophobic patient hyperventilates during an MRI and develops tingling around the mouth and in the fingers, then cramping of the hands. Arterial pH is 7.55 and PaCO2 is 26 mmHg. Total serum calcium is normal at 9.4 mg/dL. About 40 percent of serum calcium is bound to albumin, and albumin binds calcium more avidly as pH rises.',
        go:'name the primary disturbance and say how fast it developed. Then explain why the total calcium is normal while the patient has symptoms of a low calcium, naming which fraction of calcium is physiologically active. Finish by saying what this predicts about excitable membranes, which links this week back to Week 4.' },
      { room:'Exercise and allied health', h:'Lactate 14, pH 7.28',
        body:'Twenty minutes after a maximal 800 m, an athlete has a blood lactate of 14 mmol/L and an arterial pH of 7.28, with a PaCO2 of 30 mmHg. The traditional teaching is that lactic acid dissociates and the released protons cause the acidosis. A competing account holds that lactate production actually consumes a proton, and that the protons come from ATP hydrolysis outrunning oxidative resynthesis, with lactate rising alongside as a marker rather than as the cause.',
        go:'name the primary disturbance and say what the PaCO2 is doing about it and how quickly the lungs can act. Then lay out both accounts of where the protons came from, say what each predicts you would measure, and take a position while making clear which parts are settled and which are not.' }
    ]
  }

  }
};
