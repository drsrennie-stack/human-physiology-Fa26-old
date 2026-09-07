/* ============================================================
   BIO 005 Human Physiology, Fall 2026
   bio005-lab-plan.js

   THE WEEKLY LAB, ALL FIFTEEN WEEKS.

   Every week has four parts and the page renders them in this order:

     1. WHAT YOU RUN. Either the PhysioEx exercise, named down to the
        activity so nobody has to hunt through Pearson, or, in the
        weeks that have no PhysioEx exercise, a dry lab.
     2. WHAT YOU RECORD. The data table. This is what the points are
        actually on.
     3. THE CLINICAL CORRELATION. Every week, PhysioEx or not. A
        simulation shows you the physiology with the noise removed;
        the correlation puts the noise back.
     4. LOOK BACK AT YOUR THINKING. The metacognition. Three
        questions, same shape every week: decision, evidence,
        adjustment.

   WEEKS WITH NO PHYSIOEX EXERCISE: 1, 5 and 8. Weeks 1 and 8 already
   had built worksheets. Week 5 had nothing at all and is new here.

   PhysioEx assignments come from physioex-lab-map-fall2026.md and
   agree with the Canvas module list. Week titles come from
   bio005-week-grid.js.
   ============================================================ */

window.BIO005_LAB = {

  /* Worksheet pages that exist in this repo. A week with no entry
     here still gets its full instructions; it just has no button,
     which is honest. A button to a page that 404s is worse than no
     button at all. */
  sheets: {
    1:  ['reference-range-lab.html',      'Open the reference range lab'],
    2:  ['enzyme-amylase-lab.html',       'Open the enzyme lab'],
    3:  ['osmosis-iv-fluids-lab.html',    'Open the osmosis and IV fluids lab'],
    8:  ['lab-week08-hormone-cycle.html', 'Open the hormone cycle lab'],
    11: ['cbc-pcr-lab.html',              'Open the blood analysis lab'],
    13: ['pulmonary-function-lab.html',   'Open the pulmonary function lab'],
    15: ['BIO005-patient-file.html',      'Open your patient file']
  },

  weeks: {

  /* ---------------------------------------------------------- 1 */
  1: { title:'Foundations of Physiology', kind:'dry',
    dry:{ name:'Standards and ranges: where a reference range comes from',
      steps:[
        'Read the three lab reports on the worksheet. Two are printed with the reference range beside each value; one is printed without it. Work the third one anyway and say what you cannot conclude.',
        'For each value, mark it in range, above range or below range, and write the distance from the nearest limit in the units of the test, not as a judgement.',
        'One patient has three results for the same test taken a week apart. Plot them by hand on the axis provided, using the reference limits as horizontal lines.'
      ]},
    record:[
      'A table with one row per value: the test, the result, the units, the reference range, and in or out.',
      'Your hand plot of the three serial results with both reference limits drawn on it.',
      'One sentence per patient saying what you would want measured next.'
    ],
    corr:{ title:'The value inside the range that is still wrong',
      body:'A reference range is usually built to contain the central 95 percent of a healthy reference population. That construction has two consequences that matter at the bedside: one healthy person in twenty falls outside a given range, and a person whose own baseline sits near one end of the range can move a long way toward the other end while every result still prints as normal.',
      qs:['Take the serial results you plotted. Say what the trend shows that no single value in it could show.',
          'A patient has eight tests run as a panel and every one is truly independent. Work out roughly how likely it is that at least one comes back outside its range in a completely healthy person.',
          'Name one test where the reference range differs by sex, and one where it differs by age, and say what physiological fact makes each one differ.'] },
    meta:['Before you started, what did you expect "normal" to mean? Write the version you would have given in August.',
          'What in this worksheet pushed on that? Name the specific value or plot.',
          'What will you do differently the next time you read a result? Be concrete enough that someone could check whether you did it.'] },

  /* ---------------------------------------------------------- 2 */
  2: { title:'Molecules, Water &amp; Energy', kind:'physioex',
    pex:{ name:'PhysioEx Exercise 8, Chemical and Physical Processes of Digestion',
      steps:[
        'Run the <strong>amylase</strong> activity only. Save the pepsin and lipase activities for Week 12; you will need them there and running them now wastes the comparison.',
        'Work through every tube in the assay, including the controls. The controls are the whole point: they are what let you claim the change was the enzyme.',
        'Vary temperature and pH as the activity directs, and record the result at each condition rather than only the optimum.'
      ]},
    record:[
      'The full assay grid: tube contents, incubation condition, and the result of the iodine and Benedict tests.',
      'A hand drawn plot of activity against temperature, and a second of activity against pH.',
      'For each control tube, one line saying what it rules out.'
    ],
    corr:{ title:'The trauma patient who is cold and will not clot',
      body:'The clotting factors are enzymes. A trauma patient arrives with a core temperature of 33.5 &deg;C (92.3 &deg;F) and continues to ooze from every puncture site. The coagulation panel comes back normal: PT 13.1 seconds, INR 1.1. Every clotting assay in the laboratory is run in a heating block held at 37 &deg;C (98.6 &deg;F).',
      qs:['Use your own temperature plot to say what 33.5 &deg;C would do to an enzyme catalyzed rate.',
          'Explain how a normal number came back from a patient who is not clotting. Name the assumption the assay is making.',
          'Say what you would do first for this patient, and justify it from your plot rather than from a protocol.'] },
    meta:['Which condition did you expect to matter more, temperature or pH? Say what you predicted before you ran either.',
          'What did the data actually show, and where did your prediction miss?',
          'What will you change about how you predict before an experiment next week?'] },

  /* ---------------------------------------------------------- 3 */
  3: { title:'Membranes, Transport &amp; Compartments', kind:'physioex',
    pex:{ name:'PhysioEx Exercise 1, Cell Transport Mechanisms and Permeability',
      steps:[
        'Run all five activities: simple diffusion, facilitated diffusion, osmotic pressure, filtration, and active transport.',
        'In the facilitated diffusion activity, change the number of carriers as well as the concentration. The saturation you get is the whole lesson.',
        'In the osmosis activity, record the pressure generated, not only the direction the water went.'
      ]},
    record:[
      'A table with one row per run: the membrane used, the solute, the concentration gradient, and the rate.',
      'A plot of rate against concentration for simple diffusion and for facilitated diffusion, on the same axes.',
      'One line per activity naming the energy source, or saying there is none.'
    ],
    corr:{ title:'The fluid that made her sodium worse',
      body:'A patient admitted with a serum sodium of 122 mEq/L is given one liter of 5 percent dextrose in water. Six hours later the sodium is 118. The dextrose is metabolized within minutes of entering the circulation. A second patient with the same sodium is given one liter of 0.9% sodium chloride and her sodium does not fall.',
      qs:['Say what one liter of 5 percent dextrose in water actually is once the glucose is gone, and work out roughly how it distributes across the compartments.',
          'Explain why a fluid containing no sodium at all lowered a sodium concentration. Name what that measurement is a concentration of.',
          'Use your osmosis plot to predict what happened to cell volume in the first patient.'] },
    meta:['Before you ran the facilitated diffusion activity, what did you expect adding more solute to do to the rate?',
          'What did the plot show instead, and at what point did the two curves separate?',
          'Name one thing you now know you had confused, and say how you will catch that confusion next time.'] },

  /* ---------------------------------------------------------- 4 */
  4: { title:'Electrical Signaling', kind:'physioex',
    pex:{ name:'PhysioEx Exercise 3, Neurophysiology of Nerve Impulses',
      steps:[
        'Run all activities: resting membrane potential, threshold and stimulus intensity, blocking the action potential, conduction velocity, and synaptic transmission.',
        'In the resting potential activity, change extracellular potassium and record the membrane potential at each concentration rather than only noting the direction.',
        'In the blocking activity, note which agent blocks where. Lidocaine, tetrodotoxin and ethanol do not act at the same place.'
      ]},
    record:[
      'A table of extracellular potassium against measured resting membrane potential, with at least four points.',
      'Threshold voltage, and what happened at stimuli above it. Say in one line whether the response got bigger.',
      'Conduction velocity for each axon type, with diameter and myelination beside it.'
    ],
    corr:{ title:'Potassium 6.8, and the heart got quieter',
      body:'A patient in renal failure has a serum potassium of 6.8 mEq/L. The monitor shows tall peaked T waves, then over an hour the QRS widens and the rate slows. A classmate says the cells must be firing more easily, because the resting potential has moved closer to threshold.',
      qs:['Use your own potassium table to say what 6.8 mEq/L does to the resting membrane potential, with a number.',
          'Your classmate is right about the resting potential and wrong about the outcome. Say what a membrane held depolarized for minutes does to voltage gated sodium channels, and name the channel state involved.',
          'Say which of your recorded measurements would change first if you could measure this patient, and which would change last.'] },
    meta:['What did you think "closer to threshold" would do to excitability before this week?',
          'What in the simulation or the correlation changed that?',
          'If your answer has not moved, say so, and say what you would need to see to move it.'] },

  /* ---------------------------------------------------------- 5 */
  5: { title:'The Nervous System', kind:'dry',
    dry:{ name:'Dry lab: the reflex, the pupil and the autonomic exam',
      steps:[
        '<strong>Reflexes.</strong> With a partner, elicit the patellar, biceps and Achilles reflexes. Grade each 0 to 4+ on the standard scale. Then repeat the patellar reflex while your partner clenches their teeth and pulls their interlocked hands apart (the Jendrassik maneuver) and grade it again.',
        '<strong>The pupil.</strong> In a dimly lit room, shine a light into one eye. Record what that pupil does and what the other pupil does. Repeat on the other side.',
        '<strong>Autonomic.</strong> Take your partner\'s blood pressure and heart rate lying down, then at one minute and three minutes after standing. Record all three.',
        'If you have no partner, work the recorded observations printed on the worksheet instead. The reasoning is the graded part either way.'
      ]},
    record:[
      'A reflex table: reflex, side, grade, and grade again with reinforcement.',
      'A pupil table: which eye was lit, direct response, consensual response.',
      'The three sets of blood pressure and heart rate, and the change from supine for each.'
    ],
    corr:{ title:'One pupil, one eyelid, one dry cheek',
      body:'A patient has a slightly drooping left eyelid, a left pupil that stays small in a dark room, and no sweating on the left side of the face. Vision is normal and both pupils constrict briskly to light. The sympathetic supply to the eye is a chain of three neurons that leaves the hypothalamus, descends into the upper thoracic cord, and travels back up the neck.',
      qs:['Name what each of the three findings tells you the sympathetic supply is failing to do.',
          'Explain why the pupil still constricts normally to light even though it will not dilate in the dark. Use your own consensual response data in the answer.',
          'Your orthostatic numbers came from an intact reflex. Say what each part of that reflex contributed in the sixty seconds after standing, and which part is missing in this patient.'] },
    meta:['Before the Jendrassik maneuver, what did you expect clenching the jaw to do to a knee reflex?',
          'What did your two grades actually show, and what does the difference say about where the reflex is being controlled from?',
          'Name one thing you will check differently the next time a reflex seems absent.'] },

  /* ---------------------------------------------------------- 6 */
  6: { title:'Muscle', kind:'physioex',
    pex:{ name:'PhysioEx Exercise 2, Skeletal Muscle Physiology',
      steps:[
        'Run all activities: the single twitch, the effect of stimulus voltage, treppe, wave summation, tetanus, fatigue, the length tension relationship, and isotonic contraction.',
        'In the length tension activity, take enough points to see both sides of the curve. Two points on the way up is not a curve.',
        'In the fatigue activity, record the time to a set drop in force, not just the shape of the trace.'
      ]},
    record:[
      'Threshold voltage, maximal voltage, and one line saying what happens between them and why.',
      'A hand drawn length tension curve with your points on it, and the resting length marked.',
      'The stimulus frequency at which summation began and at which tetanus was complete.'
    ],
    corr:{ title:'Sore on Wednesday, not on Monday',
      body:'An athlete does a session of downhill running on Monday and feels fine that evening. Soreness begins Tuesday afternoon, peaks Wednesday and resolves by Friday. Blood lactate returns to resting concentration within about an hour of any hard session. Downhill running loads muscle while it is lengthening.',
      qs:['Use the lactate time course to rule something out, and say plainly what it rules out.',
          'Name what a lengthening contraction does mechanically that a shortening one does not, and connect it to your length tension curve.',
          'Explain the 48 hour delay in terms of what has to happen after the damage before you feel it.'] },
    meta:['What did you predict tetanus would look like before you produced one?',
          'Where on your own length tension curve did you expect peak force, and where was it?',
          'Say one thing about muscle you believed on Monday that you would now state differently.'] },

  /* ---------------------------------------------------------- 7 */
  7: { title:'Chemical Signaling &amp; Endocrine Control', kind:'physioex',
    pex:{ name:'PhysioEx Exercise 4, Endocrine System Physiology, and Exercise 12, Serological Testing',
      steps:[
        '<strong>Exercise 4.</strong> Run the metabolism and thyroid hormone activity, then the insulin and diabetes activity. Record the baseline before every intervention.',
        '<strong>Exercise 12.</strong> Run the ELISA activity and treat it as the hormone immunoassay it is: a way of measuring a hormone you cannot see.',
        'In the thyroid activity, note which animal received which hormone and what changed. The point is which level of the axis you are replacing.'
      ]},
    record:[
      'A table with one row per animal or condition: the intervention, the metabolic rate before, and after.',
      'The glucose response curves, with the baseline glucose marked on each.',
      'For the ELISA, the standard curve you built and where the unknown fell on it.'
    ],
    corr:{ title:'TSH 8.4 with a normal free T4',
      body:'A patient has a TSH of 8.4 mIU/L, above the usual 0.4 to 4.0, and a free T4 of 1.1 ng/dL, which is inside the reference range. TSH is released by the anterior pituitary and thyroid hormone feeds back on the pituitary and the hypothalamus. TSH changes in a roughly logarithmic way for a linear change in T4.',
      qs:['Say which end of this axis is failing, and say how the two numbers together tell you that.',
          'Explain why the pituitary hormone leaves the reference range before the thyroid hormone does.',
          'Use your ELISA standard curve to say what "sensitive" means for an assay, and why that matters for TSH specifically.'] },
    meta:['Before the thyroid activity, which hormone did you expect to change metabolic rate the most?',
          'What did the data show, and what did you have to change about the axis you had drawn in your head?',
          'Name the one thing about feedback that is now clearer than it was, and say what made it clear.'] },

  /* ---------------------------------------------------------- 8 */
  8: { title:'Reproductive Physiology', kind:'dry',
    dry:{ name:'Dry lab: reading the cycle from graphs and images',
      steps:[
        'On the worksheet you are given four curves across one 28 day cycle, unlabeled: FSH, LH, estradiol and progesterone. Identify each and say what identified it.',
        'Mark ovulation on the axis and say which feature you used. Then mark the luteal phase and say what is producing the hormone that defines it.',
        'You are given three ultrasound reports from the same patient across one cycle, with follicle diameters and endometrial thickness. Place each report on your labeled graph.'
      ]},
    record:[
      'The labeled graph, with all four curves named and ovulation marked.',
      'A table matching each ultrasound report to a day range, with your reasoning in one line each.',
      'One paragraph naming where negative feedback operates in this cycle and where, and for how long, it becomes positive.'
    ],
    corr:{ title:'FSH 42 in one patient, FSH 2.1 in another',
      body:'Two patients, both 34, both without periods for eight months, both with low estradiol. The first has FSH 42 IU/L and LH 30 IU/L. The second has FSH 2.1 and LH 1.8. Both have normal prolactin and normal thyroid function.',
      qs:['For each patient, say whether the failure is at the gonad or above it, and explain how negative feedback produces opposite gonadotropins from the same low estradiol.',
          'Use your labeled graph to say what an endometrium of 3 mm reports about estradiol exposure over the preceding weeks.',
          'Name the single additional test you would want in each patient, and say what answer would change your mind.'] },
    meta:['Which of the four curves did you label first, and what feature made you confident?',
          'Which one did you get wrong or nearly get wrong, and what misled you?',
          'Say what you would look at first the next time you are handed an unlabeled hormone graph.'] },

  /* ---------------------------------------------------------- 9 */
  9: { title:'Cardiac Function', kind:'physioex',
    pex:{ name:'PhysioEx Exercise 6, Cardiovascular Physiology',
      steps:[
        'Run all activities: the cardiac refractory period, vagal stimulation, the autonomic modifiers, temperature, and the ions.',
        'In the refractory period activity, deliver the extra stimulus at several points in the cycle rather than only the one that works.',
        'In the ions activity, record the direction and the size of the change for calcium, potassium and sodium separately.'
      ]},
    record:[
      'A table of intervention against heart rate and force, with the baseline repeated before each one.',
      'Where in the cardiac cycle an extra stimulus produced an extra beat, and where it produced nothing.',
      'One line per ion saying what it did and, from Week 4, why.'
    ],
    corr:{ title:'Heart sounds against the cardiac cycle',
      body:'The first heart sound is produced as the atrioventricular valves close and the second as the semilunar valves close. On a normal recording the interval from the first sound to the second is shorter than the interval from the second back to the next first. A patient in atrial fibrillation has an irregularly irregular pulse, no P waves, and becomes breathless on stairs.',
      qs:['Place the first and second heart sounds on a cardiac cycle diagram you draw yourself, and say what is happening to ventricular volume between them.',
          'Explain why the gap from the second sound to the next first sound is the longer one, and say what happens to that gap at a heart rate of 190.',
          'Say what the atria normally contribute to filling, when in the cycle they contribute it, and why losing it matters more on stairs than at rest.'] },
    meta:['Before the vagal stimulation activity, what did you expect stimulating a nerve to do to a heart rate?',
          'What did the trace show, and what did you have to revise about which nerve does what?',
          'Name one thing you can now predict about the heart that you could only recall before.'] },

  /* --------------------------------------------------------- 10 */
  10: { title:'Circulation &amp; Blood Pressure', kind:'physioex',
    pex:{ name:'PhysioEx Exercise 5, Cardiovascular Dynamics',
      steps:[
        'Run all activities: vessel radius, viscosity, vessel length, pressure, and pump mechanics.',
        'In the radius activity, take at least five radii. This is the one relationship in the course where two points will actively mislead you.',
        'In the pump activity, change preload and afterload separately and record the stroke volume for each.'
      ]},
    record:[
      'A table of vessel radius against flow, with at least five points, and a hand plot of it.',
      'Flow against viscosity and flow against length, each in one line with the direction and rough size of the effect.',
      'Stroke volume at each preload and each afterload you tested.'
    ],
    corr:{ title:'Seventy percent by diameter',
      body:'A stenosis is reported as a 70 percent reduction in luminal diameter. Resistance to laminar flow varies inversely with the fourth power of the radius. Clinically, resting flow through an arterial stenosis is usually well maintained until the diameter reduction is large, and it is flow during increased demand that fails first.',
      qs:['Do the arithmetic. A 70 percent diameter reduction leaves what fraction of the radius, and what does that do to resistance? Check the answer against your own radius plot.',
          'Explain why resting flow can be nearly normal despite that number. Name what happens downstream to compensate.',
          'Say why the reserve is spent before the resting flow falls, and what symptom that produces first.'] },
    meta:['What did you expect halving the radius to do to flow before you ran it?',
          'What did your plot show, and how far off was your prediction?',
          'Name one place outside this lab where you now expect a fourth power relationship to bite.'] },

  /* --------------------------------------------------------- 11 */
  11: { title:'Blood &amp; Immunity', kind:'physioex',
    pex:{ name:'PhysioEx Exercise 11, Blood Analysis',
      steps:[
        'Run all activities: hematocrit determination, erythrocyte sedimentation rate, hemoglobin determination, blood typing, and total cholesterol.',
        'In the hematocrit activity, run the samples from every patient offered, including the ones at altitude, rather than only the first.',
        'In blood typing, record which antisera caused agglutination for each sample before you name the type.'
      ]},
    record:[
      'A table with one row per sample: hematocrit, hemoglobin, and the ratio between them.',
      'The agglutination grid for every sample, with the resulting type written after the grid, not before.',
      'One line per patient saying what their history explains about their numbers.'
    ],
    corr:{ title:'Saturation 99 percent, and getting worse',
      body:'A patient rescued from a house fire is drowsy and headachy. The pulse oximeter reads 99 percent. An arterial blood gas shows a PaO2 of 96 mmHg, which is normal, and co-oximetry reports a carboxyhemoglobin of 28 percent. A standard pulse oximeter uses two wavelengths of light and cannot distinguish carboxyhemoglobin from oxyhemoglobin.',
      qs:['Say what the pulse oximeter is actually reporting, and why that number is not oxygen content.',
          'Use your own hemoglobin data to explain the two separate injuries carbon monoxide does, one to how much oxygen the blood carries and one to how readily it gives it up.',
          'Say which of the three numbers in this case reflects each injury, and which of them is useless here.'] },
    meta:['Before the hematocrit activity, what did you think a high hematocrit told you about a patient?',
          'What did the altitude and dehydration samples show that changed the size of that claim?',
          'Say what you would ask for alongside a hematocrit from now on, and why.'] },

  /* --------------------------------------------------------- 12 */
  12: { title:'Digestion, Absorption &amp; Energy Balance', kind:'physioex',
    pex:{ name:'PhysioEx Exercise 8, the pepsin and lipase activities, and Exercise 4, the metabolism activity',
      steps:[
        '<strong>Exercise 8.</strong> Run the pepsin activity and the lipase activity now. You already ran amylase in Week 2; pull those results out and put all three side by side.',
        'For each enzyme, record the pH at which it worked and the pH at which it did not, and note where in the gut that pH is found.',
        '<strong>Exercise 4.</strong> Run the metabolism activity for basal metabolic rate and record the rate for each animal with its condition.'
      ]},
    record:[
      'A three enzyme comparison table: amylase, pepsin, lipase, with substrate, optimal pH, and the organ where that pH occurs.',
      'The lipase results with and without bile salts, and one line saying what bile salts did and did not do.',
      'Basal metabolic rate for each animal with its hormone status beside it.'
    ],
    corr:{ title:'Fat in the stool, and a vitamin problem behind it',
      body:'A patient with long standing pancreatic disease has pale, greasy stools that are hard to flush, and has lost weight despite eating. Vitamin D and vitamin A concentrations are low. Serum albumin is normal and there is no iron deficiency anemia.',
      qs:['Name the enzyme class that is missing and the step of fat handling that fails without it. Use your own lipase data.',
          'Explain why the vitamins that are low are exactly the ones that are low.',
          'Use the normal albumin and the normal iron to argue that this is a specific failure rather than general malabsorption.'] },
    meta:['You ran amylase ten weeks ago. Before you looked back at it, what did you remember about its optimal pH?',
          'Was the memory right? Say what looking at your own Week 2 sheet corrected.',
          'Name what that tells you about how you should be reviewing, and say what you will change.'] },

  /* --------------------------------------------------------- 13 */
  13: { title:'Respiratory Physiology', kind:'physioex',
    pex:{ name:'PhysioEx Exercise 7, Respiratory System Mechanics, and Exercise 10, the hyperventilation and rebreathing activities',
      steps:[
        '<strong>Exercise 7.</strong> Run all activities, including the ones on airway radius, surfactant and pneumothorax. Record the volumes before and after every change.',
        '<strong>Exercise 10.</strong> Run the hyperventilation activity and the rebreathing activity, and record the pH and PCO2 at each stage of both.',
        'In the surfactant activity, note what happened to the two lungs separately, not just to the total.'
      ]},
    record:[
      'A table of tidal volume, expiratory reserve, inspiratory reserve, vital capacity and FEV1, before and after each intervention.',
      'A plot of airway radius against flow.',
      'pH and PCO2 through hyperventilation and through rebreathing, with the direction marked for each.'
    ],
    corr:{ title:'Forty breaths a minute and still not enough',
      body:'A patient is breathing 40 times a minute with a tidal volume of about 250 mL, so a minute ventilation of 10 L/min, which is high. Anatomical dead space is roughly 150 mL and does not change much with tidal volume. Their PaCO2 is rising.',
      qs:['Work out alveolar ventilation for this pattern, then again for a person breathing 10 times a minute at 1,000 mL, which is the same minute ventilation.',
          'Explain the difference in terms of dead space fraction, and say why the monitor can look reassuring while the patient ventilates poorly.',
          'Use your hyperventilation data to say what should have happened to this patient\'s PaCO2, and say why it did not.'] },
    meta:['Before the rebreathing activity, what did you expect to happen to pH, and how fast?',
          'What did the data show about how quickly ventilation can move pH compared with anything else in this course?',
          'Name what you now expect to see in Week 15, and say what would surprise you.'] },

  /* --------------------------------------------------------- 14 */
  14: { title:'Renal Physiology &amp; Fluid Balance', kind:'physioex',
    pex:{ name:'PhysioEx Exercise 9, Renal System Physiology',
      steps:[
        'Run all activities: the effect of arteriole radius on filtration, the effect of pressure on filtration, urine concentration, the glucose carriers, and the effect of ADH and aldosterone.',
        'In the arteriole activity, change the afferent and the efferent arterioles separately. They do not do the same thing to filtration and this is the point of the activity.',
        'In the glucose carrier activity, add carriers one at a time and record the plasma glucose at which glucose first appears in the urine.'
      ]},
    record:[
      'A table of afferent radius against glomerular filtration rate, and a second of efferent radius against the same.',
      'The plasma glucose at which glucose appeared in the urine, for each number of carriers.',
      'Urine volume and concentration with and without ADH, and sodium excretion with and without aldosterone.'
    ],
    corr:{ title:'Fifteen milliliters an hour after surgery',
      body:'A patient two hours out of major surgery has a urine output of 15 mL/hr. The urine is dark and concentrated. Urine sodium is 12 mEq/L, which is low. Serum creatinine has not yet changed. Surgery is a strong stimulus to antidiuretic hormone, and blood loss is a strong stimulus to aldosterone.',
      qs:['Say whether this kidney is failing or working, and use the urine sodium to make the argument.',
          'Name which nephron segment each of the two hormones acts on and what each reabsorbs. Use your own ADH and aldosterone data.',
          'Explain why one hormone produces concentrated urine and the other produces sodium poor urine, and say what you would expect if only one of them were acting.'] },
    meta:['Before you ran it, did you expect constricting the efferent arteriole to raise or lower filtration?',
          'What did the data show, and can you now explain the direction rather than just remember it?',
          'Say which of the two arterioles you are more likely to confuse under exam pressure, and what cue you will use to keep them apart.'] },

  /* --------------------------------------------------------- 15 */
  15: { title:'Acid-Base Balance &amp; Integration', kind:'physioex',
    pex:{ name:'PhysioEx Exercise 10, Acid-Base Balance, the renal and respiratory compensation activities',
      steps:[
        'Run the respiratory acidosis and alkalosis activity and the metabolic acidosis and alkalosis activity.',
        'Run the renal compensation activity and record what the kidney excreted at each condition, not only the resulting pH.',
        'For every run, write down the primary disturbance before you look at the compensation. Predict first, then check.'
      ]},
    record:[
      'A four row table, one for each primary disturbance, with pH, PCO2, bicarbonate, and the direction of the compensation.',
      'What the kidney excreted or retained in each condition.',
      'For each run, your written prediction beside the result, so the misses are visible.'
    ],
    corr:{ title:'One patient, two gases, twelve hours apart',
      body:'On arrival: pH 7.09, PaCO2 14 mmHg, bicarbonate 4 mEq/L, sodium 128 (corrected 137), chloride 96. Twelve hours later, after 6 liters of 0.9% sodium chloride: pH 7.31, PaCO2 26, bicarbonate 13, sodium 140, chloride 112. Winter\'s formula predicts the expected PaCO2 in a metabolic acidosis as 1.5 times the bicarbonate plus 8, plus or minus 2.',
      qs:['Name the primary disturbance on each gas, and apply Winter\'s formula to each to say whether the compensation is appropriate.',
          'Calculate the anion gap at both times. Explain why the gap closed while the chloride rose by 16 mEq/L, and name what the second acidosis is.',
          'Say what you would change about the fluid at twelve hours, and justify it from the anion in that fluid.'] },
    meta:['Across the whole term, which lab prediction of yours was most wrong, and what did it cost you to find out?',
          'Name the one thing you can now do without looking it up that you could not do in September.',
          'What is still shaky? Be specific enough that you could study it this week rather than intending to.'] }

  }
};
