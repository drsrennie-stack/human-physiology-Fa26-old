/* ============================================================
   BIO 005 Human Physiology, Fall 2026
   bio005-patient-chart.js

   THE PATIENT CHART. One patient, fifteen weeks, five entry points.

   WHAT THIS IS. Use It is 25 percent of the grade and runs every
   week. This file is that assignment. The whole class follows one
   patient for the whole term. In Week 1 a student picks an entry
   point, nursing, medicine, radiology, respiratory therapy, or
   exercise and allied health, and stays in it. Every week they get
   the same chart everyone else gets, plus the data their discipline
   would actually have on its desk, plus a prompt written from that
   desk. All five entry points assess the same competencies. Nobody
   gets an easier version.

   HOW THE CHART IS ORDERED, which students ask about every year.
   The chart is not read in date order. You read one week of
   physiology at a time, and the chart entry for that week is the
   part of her story where that physiology is on stage. Week 3 is her
   arrival in the emergency department because that is where fluid
   compartments are decided. Week 8 is six weeks after discharge
   because that is when the reproductive axis has something to say.
   Week 15 goes back to the first blood gas and reads it again with
   everything the term has taught. Each entry carries its own date so
   the story stays coherent.

   DECIDED Sep 7 2026 by Scrubs:
     - one patient seen five ways, not five patients
     - the chart IS Use It, replacing the standalone four room cases
     - five entry points, respiratory therapy added, exercise kept

   WHAT THIS SUPERSEDES, flagged not deleted:
     - bio005-apply-cases.js, the sixty standalone four room cases
       written earlier the same day, is kept as an alternate bank for
       exam items and discussion seeds. Nothing links to it as the
       graded assignment any more.
     - BIO005-patient-file.html assigns each student a different
       patient from their name. That mechanism is superseded by one
       class-wide patient. The tool is not deleted. See
       compliance-notes.md limitations 17 and 21.

   THE FORWARD REFERENCE PROBLEM, and how it is handled. Scrubs
   raised this on Sep 7 2026: a real patient does not present her
   physiology in course order, so a chart entry in Week 3 can contain
   a bicarbonate of 4 when acid-base is Week 15. An audit found 38
   forward references in this file. Three rules now govern them.

     1. A NUMBER MAY APPEAR BEFORE ITS WEEK. A student can read
        "bicarbonate 4" in Week 3 without being asked anything about
        it. Charts have numbers on them. That is not a problem.
     2. A TOOL MAY NOT BE ASKED FOR BEFORE IT IS TAUGHT OR HANDED
        OVER. Where a week's prompt needs a formula, a rule or a
        definition the course has not reached, the week carries a
        'tools' entry: the tool written out in full, and the week the
        student will actually build it. The page renders this as
        "Before you start" above the chart. Being handed a tool and
        told plainly that you are being handed it is honest; being
        expected to already have it is not.
     3. WHERE THE ASK OVERREACHED, THE ASK WAS CUT. Week 13's
        medicine prompt used to require Henderson-Hasselbalch as well
        as Winter's formula. Winter's is handed over, because her
        breathing in Week 13 makes no sense without it. The
        Henderson-Hasselbalch half moved to Week 15 where it belongs.

   Each 'tools' item is [name, what the student is given, the week it
   is properly built]. Weeks with nothing to hand over have no
   'tools' key and the page renders no box.

   ACCURACY. Every value here is internally consistent and meant to
   be checked. The arrival gas satisfies Henderson-Hasselbalch, the
   respiratory compensation satisfies Winter's formula, the anion gap
   closes as the chloride rises, the corrected sodium works out, and
   the hemoglobin and hematocrit hold their usual ratio. Students are
   asked to do that arithmetic, so it has to survive it.
   ============================================================ */

window.BIO005_CHART = {

  patient: {
    name:   'Camila Reyes',
    line:   '19 years old. Second year kinesiology student and a midfielder on the college soccer team. No prior medical history, no medications.',
    why:    'One patient, all term. You will know her better than you expect to.'
  },

  /* Entry points. Order is fixed; the page renders them in this order
     and the stored track key is one of these ids. */
  tracks: [
    { id:'nursing',   name:'Nursing',                     desk:'The flowsheet. Vitals, intake and output, what changed since the last check, and what the patient can and cannot do right now.' },
    { id:'medicine',  name:'Medicine',                    desk:'The problem list. Labs, the differential, and the question of which test would move you.' },
    { id:'radiology', name:'Radiology',                   desk:'The images and what they physically measure, as opposed to what gets inferred from them.' },
    { id:'rt',        name:'Respiratory therapy',         desk:'Gas exchange and the work of breathing. Blood gases, ventilation, oxygenation, and the airway.' },
    { id:'exercise',  name:'Exercise and allied health',  desk:'Function and capacity. What she could do in August, what she can do now, and what has to happen before she plays again.' }
  ],

  weeks: {

  /* ---------------------------------------------------------- 1 */
  1: {
    title:'Foundations of Physiology',
    date:'August 12', when:'Six weeks before she got sick',
    encounter:'Preseason physical',
    arc:'Nothing is wrong yet. This is the only chart entry in the term where every number is normal, which is exactly what makes it the most useful one. Everything you read for the next fourteen weeks gets compared to this page.',
    chart:[
      ['Vitals','HR 52, BP 108/64, RR 12, temperature 36.8 &deg;C (98.2 &deg;F), SpO<sub>2</sub> 99% on room air.'],
      ['Measurements','Weight 61 kg (134 lb), height 168 cm (5 ft 6 in).'],
      ['Labs','Sodium 139 mEq/L, potassium 4.2, chloride 103, bicarbonate 25, glucose 88 mg/dL, creatinine 0.8 mg/dL, hemoglobin 13.4 g/dL, hematocrit 40%.'],
      ['Note','Well. Cleared for full participation. No symptoms, no medications, no family history she knows of.']
    ],
    five:[
      'Name three variables in this chart that are actively regulated. For each one, say what quantity is being held steady and what control system is holding it.',
      'Her resting heart rate is 52. Say whether that is a finding or a baseline, and say exactly what you would need to know to decide.',
      'Explain what a reference range is a range of. Then say why a value inside it is not proof of health, and a value outside it is not proof of disease.',
      'Interpret this chart. Say what it shows and what it cannot show.',
      'Name the one measurement you would add to this baseline today, and say what question it would let you answer in October.'
    ],
    tracks:{
      nursing:{ data:'Orthostatic vitals were done as part of the physical: supine 108/64 with HR 52, standing at one minute 104/66 with HR 64. Documented as normal.',
        go:'a drop of 4 mmHg systolic with a rise of 12 beats is a normal response, not an absent one. Say what the reflex did in those sixty seconds and name each component of the loop. Then say what would have to be true of a later set of orthostatics for you to call it abnormal.' },
      medicine:{ data:'The reference ranges printed beside every result on this panel were derived from a healthy reference population, and are conventionally set to contain the central 95 percent of that population.',
        go:'if a range holds 95 percent of healthy people, work out roughly how often a completely healthy person will fall outside at least one of the eight results on this panel. Then say what that arithmetic means for ordering panels rather than tests, and connect it to why her normal chart is still worth having.' },
      radiology:{ data:'Screening body composition by DEXA: 22% body fat, lean soft tissue 45.1 kg. A screening ECG was done; no echocardiogram was ordered.',
        go:'DEXA does not weigh fat. Say what it physically measures and what assumption turns that measurement into a fat mass. Then say which of her numbers in the main chart is a direct measurement and which is a calculation, and why that distinction will matter in Week 3.' },
      rt:{ data:'Spirometry at the physical: FVC 4.1 L, FEV<sub>1</sub> 3.5 L, FEV<sub>1</sub>/FVC 0.85. Reported as 102% and 104% of predicted.',
        go:'"Percent of predicted" is a comparison, not a measurement. Say what the prediction is built from and why a predicted value is a population statement rather than a statement about her. Then say what her own numbers today buy you that a predicted value never can.' },
      exercise:{ data:'Graded exercise test: VO<sub>2</sub>max 52 mL/kg/min, maximum heart rate 196, lactate threshold at 82% of maximum heart rate.',
        go:'VO<sub>2</sub>max is expressed per kilogram of body mass. Predict what happens to that number if she loses 6 kg without losing any aerobic capacity at all, and say whether that represents an improvement. Then name what you would measure instead to answer the question the ratio was trying to answer.' }
    }
  },

  /* ---------------------------------------------------------- 2 */
  2: {
    title:'Molecules, Water &amp; Energy',
    date:'September 1 to 20', when:'The three weeks before she came in',
    encounter:'Student health visit, September 18',
    arc:'She has been thirsty, tired and losing weight while eating more than usual. She puts it down to preseason. This is the part of the story where the fuel switches over, and it happens at the level of enzymes and their regulation.',
    chart:[
      ['History','Six kilograms (13 lb) lost in three weeks despite eating more. Drinking 4 to 5 L a day and still thirsty. Getting up twice a night to urinate. Tired in a way that rest does not fix.'],
      ['Vitals','HR 88, BP 104/66, weight 55 kg (121 lb).'],
      ['Point of care testing','Random capillary glucose 318 mg/dL. Urine dipstick: glucose 4+, ketones 3+, no nitrites, no leukocytes.'],
      ['Note','Advised to go to the emergency department. She goes home instead, because she has a match on Saturday.']
    ],
    five:[
      'Name the fuel her cells are actually burning and the fuel they cannot get to, and name the single molecule missing between the two.',
      'Predict what is happening to her ATP production and to her body mass, separately, and say why those two answers are not the same answer.',
      'Explain the mechanism: what insulin normally does at the membrane and inside the cell, and what happens to stored fat and to muscle protein when it is absent.',
      'Interpret the dipstick. Say what glucose in the urine tells you, what ketones in the urine tell you, and what neither of them can tell you.',
      'Name the one measurement that would separate this from the other things that cause a 19 year old to lose 6 kg in three weeks.'
    ],
    tracks:{
      nursing:{ data:'She reports drinking constantly and still waking thirsty. Intake by her own estimate is 4 to 5 L a day. She has not weighed the output but describes it as large and frequent, including twice overnight.',
        go:'thirst is the end of a loop, not the start of one. Trace it: name what is being sensed, where, and what the sensed variable actually is. Then explain why her intake of 5 L a day has not corrected it, and what that failure tells you about which compartment is losing water.' },
      medicine:{ data:'The relevant regulator is not insulin alone but the ratio of insulin to glucagon. As that ratio falls, hormone sensitive lipase is disinhibited, fatty acids reach the liver, and hepatic ketogenesis is switched on. Beta-hydroxybutyrate and acetoacetate are both acids at body pH.',
        go:'name the enzyme steps that the insulin to glucagon ratio is switching, and say for each whether the switch is on or off in her. Then explain why the products of that pathway are acids, and say what you would expect her bicarbonate to be doing on September 18 even though nobody measured it.' },
      radiology:{ data:'She had no imaging during this period. Her preseason DEXA showed 22% fat and 45.1 kg of lean soft tissue.',
        go:'she has lost 6 kg. Predict how that loss is divided between fat, lean tissue and water, and justify each part from the physiology rather than from a guess. Then say what a repeat DEXA would show and what it would still not be able to separate.' },
      rt:{ data:'No blood gas was drawn. Carbonic anhydrase, present in red cells and in renal tubular cells, catalyzes the hydration of carbon dioxide to carbonic acid. Uncatalyzed, that reaction is far too slow to be useful on a circulation time.',
        go:'this is an enzyme case and it is your enzyme. Say what carbonic anhydrase does to the rate of a reaction that would happen anyway, and why speed is the entire point in a red cell that spends about a second in a capillary. Then say which two of her problems, the acid load being built right now and the breathing you will meet in Week 13, both run through this one enzyme.' },
      exercise:{ data:'Her coach notes she has been unable to finish sessions she completed easily in August. Sprint repeat times have fallen off by about 8 percent.',
        go:'she is eating more than usual and performing worse. Explain that contradiction in terms of what her working muscle can and cannot take up, and name the transporter involved. Then say why the fuel she is burning instead produces adequate ATP at rest and inadequate power at high intensity.' }
    }
  },

  /* ---------------------------------------------------------- 3 */
  3: {
    title:'Membranes, Transport &amp; Compartments',
    date:'September 22, 06:40', when:'Emergency department, arrival',
    encounter:'Arrival in the emergency department',
    /* Handed over this week. See the forward reference rules in the header:
       a number may sit on a chart before its week, but a tool may not be
       asked for before it is taught or handed over, and question 3 asks for
       a formula the course has not reached. */
    tools:[
      ['Correcting a sodium for the glucose',
       'This week is about water moving between compartments when a solute pulls on it, and her glucose is exactly such a solute: it stays outside her cells and drags water out with it. That water arrives in the extracellular space and dilutes everything already dissolved there, sodium included. So a measured sodium of 128 is not telling you she has lost sodium. It is telling you the water moved, which is the thing you are studying this week. The formula only puts a number on a shift you can already explain: <strong>corrected sodium = measured sodium + 1.6 &times; (glucose &minus; 100) &divide; 100</strong>, with glucose in mg/dL. Some sources use 2.4 rather than 1.6, and here the two differ enough to matter, which is why question 3 asks which one you used.',
       0],
      ['Why her bicarbonate is 4',
       'Bicarbonate is a solute in her extracellular fluid, so it turns up on the same panel as everything else you are working with. Its number is low for a reason that belongs to a system you have not met yet: she is making acid faster than she can buffer it, and bicarbonate is what gets spent doing the buffering. That is the whole of it. Notice the number, and leave it alone. Nothing in this week\'s questions turns on it.',
       15],
      ['Minute ventilation',
       'Respiratory therapy prompt only, and it is a compartment question like every other one this week. Water leaving through her airway is fluid going out of the extracellular space, and unlike her urine it never reaches the intake and output chart. To size that loss you need one number the course has not defined yet: minute ventilation is simply how much air moves in and out each minute, <strong>tidal volume &times; breaths per minute</strong>. Hers is running at roughly four times normal.',
       13]
    ],
    arc:'She is brought in by a teammate. This is the entry where the fluid decisions get made, and every one of them is a decision about which compartment you are filling.',
    chart:[
      ['Vitals','HR 128, BP 96/58, RR 32, temperature 36.4 &deg;C (97.5 &deg;F), SpO<sub>2</sub> 99% on room air. Weight 55 kg (121 lb).'],
      ['Examination','Dry mucous membranes, skin tenting, sunken eyes. Drowsy but rousable. Breathing deeply and without effort.'],
      ['Labs','Glucose 642 mg/dL. Sodium 128 mEq/L (measured). Potassium 5.4. Chloride 96. Bicarbonate 4. BUN 34 mg/dL. Creatinine 1.6 mg/dL. Measured serum osmolality 305 mOsm/kg.'],
      ['Note','Estimated fluid deficit approximately 6 L. First liter of 0.9% sodium chloride started.']
    ],
    five:[
      'Name the compartments involved and say which solute is setting the gradient between them.',
      'Predict which way water has moved between the intracellular and extracellular compartments, and say what has happened to cell volume.',
      'Correct her sodium for the glucose. Say which correction factor you used, say that more than one is in use, and say what the corrected number means that the measured one does not.',
      'Interpret the measured sodium of 128. Say what it shows and what it cannot show.',
      'Name the one measurement that would change your fluid plan in the next hour.'
    ],
    tracks:{
      nursing:{ data:'Orders: 0.9% sodium chloride, 1 L over the first hour, then reassess. Hourly urine output, hourly point of care glucose, potassium every two hours. Nothing by mouth.',
        go:'0.9% saline is isotonic to plasma and she is profoundly hyperosmolar. Say which compartment the first liter will expand and roughly how much of it stays there, and explain why that is the right first move even though it does nothing to correct her osmolality. Then say what would go wrong if the first liter were 5% dextrose in water instead.' },
      medicine:{ data:'Calculated osmolality is 2 &times; sodium plus glucose divided by 18 plus BUN divided by 2.8. Effective osmolality drops the BUN term, because urea crosses cell membranes freely.',
        go:'calculate both her total and her effective osmolality and compare them to the measured 305. Then explain why urea is excluded from the effective figure, using what "effective" has to mean for a solute to pull water across a membrane. Say which of the two numbers predicts her cell volume.' },
      radiology:{ data:'No imaging on arrival. Bedside ultrasound shows an inferior vena cava that collapses almost completely on inspiration. Iodinated contrast, if given, distributes through plasma and interstitial fluid and does not enter cells.',
        go:'name the compartment iodinated contrast marks out, and say why that makes it a marker of extracellular volume rather than total body water. Then use her chart to argue whether a contrast study should be done this morning, on physiological grounds rather than protocol ones.' },
      rt:{ data:'Respiratory rate 32, deep and unlabored. Insensible loss through the airway rises with minute ventilation, and her minute ventilation is roughly four times normal.',
        go:'she is losing water through her lungs faster than a normal person does, and none of it is measured on the intake and output chart. Say what makes airway loss obligatory, what determines its rate, and roughly what fraction of her deficit it could account for over a day. Then say why that loss is pure water and what it does to her plasma osmolality.' },
      exercise:{ data:'A hard match in the heat can cost 2 to 3 L of sweat. Sweat is hypotonic to plasma. Her losses here came from an osmotic diuresis, in which the fluid lost is closer to half normal saline.',
        go:'both dehydrate. Say what each type of loss does to plasma osmolality, and explain why the two move it in different directions. Then say which compartment gives up water first in each case, and what that predicts about cell volume in a dehydrated athlete versus in Camila this morning.' }
    }
  },

  /* ---------------------------------------------------------- 4 */
  4: {
    title:'Electrical Signaling',
    date:'September 22, 07:00 to 11:00', when:'The first four hours of treatment',
    encounter:'Resuscitation, hours 0 to 4',
    arc:'Her potassium is the number that will hurt her if you read it as a quantity rather than as a position. It is high on arrival and low four hours later, and almost none of that is potassium entering or leaving her body.',
    chart:[
      ['Potassium','07:00: 5.4 mEq/L. 09:00: 4.1. 11:00: 3.1.'],
      ['ECG','07:05: sinus tachycardia at 128, tall peaked T waves, QTc 410 ms. 11:00: T waves flattened, U waves present.'],
      ['Treatment','Insulin infusion started 07:20. Fluids continuing. Potassium chloride added to the infusion at 11:05 and the insulin rate reduced.'],
      ['Note','Total body potassium deficit in this presentation is typically 3 to 5 mEq per kg of body weight, which for her is roughly 165 to 275 mEq, despite the arrival value being above the reference range.']
    ],
    five:[
      'Name the ion this entry is about and say which way its electrochemical gradient points across a resting cell membrane.',
      'Predict what a serum potassium of 5.4 does to the resting membrane potential, and then what 3.1 does. Give the direction for each.',
      'Explain, gate by gate, why a membrane held depolarized becomes less excitable rather than more, and name the channel state that does it.',
      'Interpret an arrival potassium of 5.4 in a patient whose total body potassium is depleted by roughly 200 mEq. Say what it shows and what it cannot show.',
      'Name the one measurement or event that would make you hold the insulin, and say why holding it is the right move even though the glucose is still high.'
    ],
    tracks:{
      nursing:{ data:'Standing protocol: hold insulin if potassium is below 3.3 mEq/L and replace first. Potassium every two hours while on the infusion. Continuous cardiac monitoring.',
        go:'the protocol says hold the insulin, which feels like withholding treatment from a patient whose glucose is 642. Explain, physiologically, what insulin does to potassium that makes the protocol right. Then say which of the two problems, the glucose or the potassium, will kill her first, and why the ECG is the monitor that tells you.' },
      medicine:{ data:'Three separate forces are acting on where potassium sits: insulin deficiency, acidemia, and an osmotic diuresis that has been running for days. Two of them move potassium out of cells and one of them removes it from the body.',
        go:'name each of the three forces, say whether it shifts potassium or removes it, and say which direction the serum number moves under each. Then explain how a patient can be simultaneously hyperkalemic and severely potassium depleted, and say which of those two facts the treatment is about to reverse first.' },
      radiology:{ data:'There is nothing to image here. The ECG, however, is a recording of a physiological signal from the body surface, in the same sense that any imaging modality records a signal that has traveled through tissue.',
        go:'say what the ECG is actually recording, and be precise: it is not the action potential of a single cell. Explain what summation and volume conduction mean here, and then say why a change in the T wave, which is repolarization, is the first thing potassium alters. Name what the ECG cannot tell you about her potassium.' },
      rt:{ data:'Her pH on arrival was 7.09. Correcting an acidemia, whether by ventilation or by clearing the acid load, shifts potassium into cells. Her respiratory rate of 32 is already doing part of that work.',
        go:'name the exchange that couples hydrogen ion and potassium across the cell membrane, and say which way each moves as pH rises. Then say what would happen to her potassium if someone sedated and intubated her and set a ventilator rate of 14, and why that is one of the most dangerous things you could do to her this morning.' },
      exercise:{ data:'Serum potassium rises during intense exercise, sometimes to 6 mEq/L or above, and returns to baseline within minutes of stopping.',
        go:'the same number that is an emergency in her is routine in a sprinter. Explain where the potassium comes from during exercise and why it returns so fast. Then say what is different about her situation that makes 5.4 dangerous, using time course and total body content in your answer.' }
    }
  },

  /* ---------------------------------------------------------- 5 */
  5: {
    title:'The Nervous System',
    date:'September 22, 06:40 to 14:00', when:'Arrival through the first afternoon',
    encounter:'Neurological and autonomic assessment',
    arc:'Her nervous system is doing two things at once: driving a massive sympathetic response, and running slow because of what her blood has become. Both are reversible. One of them can be made worse by treating her too quickly.',
    chart:[
      ['Neurological','06:40 Glasgow Coma Scale 13 (eyes 3, verbal 4, motor 6): drowsy, oriented to person and place but not to time. Pupils 4 mm and reactive. Deep tendon reflexes 1+ and symmetric. No focal deficit.'],
      ['Autonomic','HR 128, cool peripheries, capillary refill 4 seconds. Skin dry despite the tachycardia.'],
      ['Course','10:00 GCS 14. 14:00 GCS 15, fully oriented, reflexes 2+.'],
      ['Note','Correction of the plasma osmolality was deliberately limited to approximately 3 mOsm/kg per hour.']
    ],
    five:[
      'Name the autonomic outflow that is dominating on arrival, and list three separate findings in this chart that are its signature.',
      'Predict what a rapid fall in plasma osmolality would do to brain cell volume, and say why that is the reason for the correction rate in the note.',
      'Explain the synapses: name the transmitter and the receptor producing the tachycardia, and the transmitter and receptor producing the cool peripheries. Say why they are different.',
      'Interpret reflexes of 1+. Say what that shows and what it cannot show.',
      'Name the one measurement that would change how fast you correct her.'
    ],
    tracks:{
      nursing:{ data:'Neurological observations hourly. The nurse notes that she was more confused at 08:00 than at 06:40, then steadily improved.',
        go:'a patient who gets worse before she gets better, during treatment, is the finding this entry is about. Give the two competing readings of that dip, one benign and one not, and say what each predicts about the next four hours. Then say exactly what you would document and what you would escalate on.' },
      medicine:{ data:'Brain cells generate osmotically active particles, sometimes called idiogenic osmoles, over hours to days of sustained hyperosmolality. These particles are cleared much more slowly than plasma glucose falls during treatment.',
        go:'name what those particles are for and what they protected her brain from over the last three weeks. Then explain what happens to a brain cell that is still full of them when the plasma osmolality drops fast, and use that to justify a numerical correction limit rather than a clinical one.' },
      radiology:{ data:'No head CT was performed. In this presentation, imaging is reserved for a patient whose neurological state deteriorates or fails to improve with treatment.',
        go:'say what a head CT can show in the first hours of cerebral edema and what it cannot, and be specific about the time course of the finding versus the time course of the physiology. Then argue, from her chart, whether the decision not to scan her at 06:40 was correct, and name the single observation that would change it.' },
      rt:{ data:'Respiratory rate 32 on arrival, unchanged through the morning. Central chemoreceptors in the medulla respond to the pH of cerebrospinal fluid; peripheral chemoreceptors in the carotid and aortic bodies respond to arterial oxygen, carbon dioxide and hydrogen ion.',
        go:'her arterial pH is 7.09 and her drive is enormous, yet hydrogen ions cross the blood brain barrier poorly. Explain which chemoreceptor population is doing most of the work here and why. Then say what happens to central chemoreceptor drive over the following hours as carbon dioxide, which does cross freely, falls.' },
      exercise:{ data:'After hard exercise, heart rate falls quickly at first as vagal tone returns, then slowly as circulating catecholamines clear. Sweating continues for some minutes after the work stops.',
        go:'she is tachycardic at 128 with cool, dry skin, which is not what a hot, hard-working athlete looks like. Say which autonomic effector is switched on and which is switched off in her, and explain why sweating is the exception among sympathetic responses. Name the transmitter that makes it the exception.' }
    }
  },

  /* ---------------------------------------------------------- 6 */
  6: {
    title:'Muscle',
    date:'September 25 to October 10', when:'Hospital day 4 through two weeks after discharge',
    encounter:'Mobility assessment and follow-up',
    arc:'She is out of danger and she cannot get out of a chair without pushing off. Three weeks of catabolism and four days of lying still cost her more than she expects, and the recovery does not run in the order she expects either.',
    chart:[
      ['Day 4 assessment','Stands from a chair slowly, using both arms. Walks 40 m with a frame, limited by fatigue rather than breathlessness. Grip strength 22 kg on the right; 32 kg at the preseason physical.'],
      ['Labs','Creatine kinase 340 U/L (reference roughly 30 to 190). No myoglobinuria.'],
      ['Body composition','Repeat DEXA October 10: lean soft tissue 41.2 kg, from 45.1 kg in August.'],
      ['October 10','Walking normally. Grip 27 kg. Reports that stairs are the thing that still tells her she was ill.']
    ],
    five:[
      'Name where in the chain from motor neuron to crossbridge this weakness sits, and say what evidence in the chart rules the other links in or out.',
      'Predict what has happened to her maximal force and to her endurance, separately, and say whether they had to change by the same amount.',
      'Explain excitation contraction coupling from the action potential to the crossbridge, and say which step is limited when there are simply fewer crossbridges available.',
      'Interpret a grip strength of 22 kg against a baseline of 32 kg. Say what it shows and what it cannot show.',
      'Name the one measurement that would separate loss of muscle from loss of the ability to activate the muscle she still has.'
    ],
    tracks:{
      nursing:{ data:'Sit to stand recorded as 4 repetitions in 30 seconds; 18 would be expected for her age. Falls risk score elevated. She is embarrassed and keeps trying to walk to the bathroom unassisted.',
        go:'the sit to stand test is a physiological measurement wearing everyday clothes. Say what it is actually measuring and which muscle groups and which energy system it loads. Then say why fatigue rather than breathlessness is her limit, and what that single word in the chart tells you about where the problem is not.' },
      medicine:{ data:'A creatine kinase of 340 U/L is mildly raised. Critical illness myopathy, disuse atrophy and a neuropathy would all produce weakness, and they are distinguished by their pattern, their time course and their electrophysiology.',
        go:'take the three explanations one at a time and say what each predicts for reflexes, sensation, CK, and the distribution of the weakness. Then use her chart to rank them, and name the one test that would settle it if the weakness had not resolved.' },
      radiology:{ data:'Ultrasound of the rectus femoris cross sectional area is used in critical care to track muscle mass at the bedside. Her repeat DEXA showed 3.9 kg of lean soft tissue lost.',
        go:'DEXA reports lean soft tissue, and ultrasound reports a cross sectional area. Say what each one actually measures and what has to be assumed to turn either into "muscle". Then explain why a 3.9 kg loss of lean tissue does not translate into a proportional loss of force, and name which direction the error runs.' },
      rt:{ data:'Maximal inspiratory pressure 48 cmH<sub>2</sub>O; a value above about 80 would be expected for her. Peak cough flow reduced. She clears secretions but reports that a deep breath takes effort.',
        go:'the diaphragm is skeletal muscle and it wasted with the rest. Say what MIP measures and which muscles generate it. Then explain the mechanics of a cough in three phases, say which phase a weak expiratory effort ruins, and connect that to why respiratory muscle weakness shows up as a clearance problem before it shows up as a gas exchange problem.' },
      exercise:{ data:'By November her grip is back to 31 kg while her DEXA lean mass is still 2 kg below baseline. Early strength gains after reloading come substantially from neural adaptation rather than from new contractile protein.',
        go:'her force came back faster than her muscle did. Name the two categories of adaptation involved and say what each one changes. Then explain what "neural adaptation" means mechanically, in terms of motor units and firing, and say what that predicts about how quickly she can safely return to contact training.' }
    }
  },

  /* ---------------------------------------------------------- 7 */
  7: {
    title:'Chemical Signaling &amp; Endocrine Control',
    date:'September 22 to November 3', when:'Admission through the six week clinic visit',
    encounter:'Endocrine workup and follow-up',
    arc:'This is the entry where her diagnosis is actually made, and where the counter-regulatory hormones that made her so sick get named. It is also where a thyroid result moves twice without her thyroid ever being the problem.',
    chart:[
      ['Diagnostic','C-peptide less than 0.1 ng/mL. GAD-65 antibodies positive. Islet antigen 2 antibodies positive. Diagnosis: type 1 diabetes.'],
      ['Stress hormones, on arrival','Cortisol 32 &micro;g/dL. Glucagon elevated. Catecholamines not measured but clinically evident.'],
      ['Thyroid','Sep 22: TSH 0.8 mIU/L, free T4 1.0 ng/dL, free T3 low. Sep 28: TSH 6.2. Nov 3: TSH 2.1, free T4 1.1, free T3 normal.'],
      ['Treatment','Insulin infusion, then transitioned to basal and bolus insulin before discharge.']
    ],
    five:[
      'Name each hormone in this entry, its main target tissue, and the type of receptor it uses.',
      'Predict which way glucagon, cortisol, growth hormone and the catecholamines each moved on arrival, and say why they all moved in the same direction at the same time.',
      'Explain what C-peptide is, where it comes from, and why it separates her from a patient with type 2 diabetes who is taking insulin.',
      'Interpret the thyroid results across the three dates. Say what they show and what they cannot show, and say whether her thyroid was ever the problem.',
      'Name the one measurement that would change her insulin plan in the next month.'
    ],
    tracks:{
      nursing:{ data:'She is taught basal and bolus dosing before discharge, along with hypoglycemia recognition and treatment. She asks why she needs two different insulins.',
        go:'answer her question physiologically, not procedurally. Say what a healthy pancreas does between meals and what it does after one, and name which of those two jobs each insulin is replacing. Then say what would happen if she took only the basal, and only the bolus, and why the failures look different.' },
      medicine:{ data:'The counter-regulatory hormones all raise blood glucose, and they act on the liver, on adipose tissue and on skeletal muscle. In a person with intact insulin secretion, that rise is limited by insulin. In her it was not.',
        go:'take cortisol, glucagon, growth hormone and adrenaline in turn, and for each say what it does to the liver, to fat, and to muscle glucose uptake. Then explain why the same response that keeps a healthy person alive during a stress made her critically ill, and name what was missing from the loop.' },
      radiology:{ data:'No thyroid uptake scan and no adrenal imaging were performed at any point.',
        go:'her TSH moved from 0.8 to 6.2 to 2.1 in six weeks, and her cortisol was 32. Both would prompt imaging in a different context. Say what a thyroid uptake scan physically measures and what an adrenal CT physically measures, then argue from her chart why neither was indicated, and what would have had to be true for either to be worth doing.' },
      rt:{ data:'Cortisol and catecholamines both act on the airway. Beta-2 agonists used in respiratory care act on the same receptor family as adrenaline, and corticosteroids used in airway disease act on the same receptor as cortisol.',
        go:'name the receptor class for each and say what second messenger or mechanism follows binding, being clear that the two work on completely different timescales. Then explain why one gives relief in minutes and the other takes hours, using the location of the receptor in your answer.' },
      exercise:{ data:'She is told that an easy jog usually lowers her glucose and a set of maximal sprints often raises it, sometimes by 3 to 4 mmol/L.',
        go:'the same exercise moves the same variable in two directions. For each session, say which hormones dominate and what each is doing to the liver and to the muscle. Then say what she should do differently before each type of session, and justify it from the hormone profile rather than from a rule of thumb.' }
    }
  },

  /* ---------------------------------------------------------- 8 */
  8: {
    title:'Reproductive Physiology',
    date:'October 20 and December 5', when:'Four weeks and eleven weeks after discharge',
    encounter:'Clinic follow-up, menstrual history',
    arc:'She has not had a period since the end of August. Her ovaries are fine. This entry is about reading a three hormone panel and knowing which floor of the building the problem is on.',
    chart:[
      ['History','Last menstrual period August 30. Regular before that. No pregnancy possible.'],
      ['October 20 labs','FSH 2.4 IU/L, LH 1.8 IU/L, estradiol low, prolactin normal, TSH 2.1.'],
      ['October 20 imaging','Pelvic ultrasound: endometrium 3 mm. Both ovaries normal in size with several small follicles, none dominant.'],
      ['December 5','Menses returned November 28. Weight 59 kg (130 lb). Training at roughly 70 percent of her August load.']
    ],
    five:[
      'Name the three levels of this axis and the hormone each one releases.',
      'Predict which way FSH, LH and estradiol each moved, and say what that particular combination localizes.',
      'Explain what GnRH pulse frequency has to do with which gonadotropin the pituitary favors, and what slows that frequency.',
      'Interpret low FSH with low estradiol. Say what it shows and what it cannot show, then contrast it with high FSH and low estradiol.',
      'Name the one measurement that would tell you the axis was recovering before her period returned.'
    ],
    tracks:{
      nursing:{ data:'She asks whether this means she is infertile. She has not raised it before and is upset.',
        go:'you need the physiology before you can answer her honestly. Say what her hormone pattern indicates about whether her ovaries are damaged, and what it indicates about whether the signal above them has been turned down. Then write the two or three sentences you would actually say to her, and make sure every clinical claim in them is supported by a number in this chart.' },
      medicine:{ data:'The differential for secondary amenorrhea with low gonadotropins includes functional hypothalamic suppression, hyperprolactinemia and hypothalamic or pituitary structural disease. Her prolactin and TSH are normal, and the suppression is explained by three weeks of severe catabolic illness and a large energy deficit.',
        go:'work the differential using her numbers, and say what each normal result excludes. Then explain why energy deficit and illness act at the hypothalamus rather than at the pituitary or the ovary, and name what you would expect to happen to the axis, in order, as she recovers.' },
      radiology:{ data:'Endometrium 3 mm. Several follicles of 4 to 7 mm, none dominant. In a normal cycle the endometrium reaches roughly 8 to 12 mm before ovulation and a dominant follicle reaches about 18 to 24 mm.',
        go:'the ultrasound is a hormone assay done with sound. Say what the 3 mm endometrium reports about her estradiol exposure over the preceding weeks, and what the absence of a dominant follicle reports about FSH. Then say what the ovaries looking normal rules out, and be precise about what it does not.' },
      rt:{ data:'Progesterone stimulates ventilation. In the luteal phase of a normal cycle, resting PaCO<sub>2</sub> is typically 2 to 4 mmHg lower than in the follicular phase, and it falls further in pregnancy.',
        go:'she has had no luteal phase since August, so she has had no progesterone. Predict what that does to her resting PaCO<sub>2</sub> and to her ventilatory response to carbon dioxide, and say where progesterone is acting to produce that effect. Then say what will change about her blood gas once her cycles return, and why that matters when you interpret one.' },
      exercise:{ data:'Energy availability is dietary energy intake minus the energy cost of exercise, expressed per kilogram of lean mass. Below roughly 30 kcal per kg of lean mass per day, GnRH pulsatility is reliably suppressed in study conditions.',
        go:'calculate what her energy availability would be at her August training load and her October lean mass if she ate 2,200 kcal and her training cost 700. Then say whether that number sits above or below the threshold, and explain why the reproductive axis is among the first systems to go quiet and among the last to come back.' }
    }
  },

  /* ---------------------------------------------------------- 9 */
  9: {
    title:'Cardiac Function',
    date:'September 22 and November 10', when:'Arrival, and the seven week echocardiogram',
    encounter:'Cardiac assessment',
    arc:'Her heart is the one organ in this story that was never damaged, and it is working harder on arrival than at any point in her athletic career. The numbers that look reassuring are the ones to be most careful with.',
    chart:[
      ['Arrival','HR 128, BP 96/58. ECG: sinus tachycardia, peaked T waves, QTc 410 ms, no ischemic change.'],
      ['Echocardiogram Sep 23','Left ventricular ejection fraction 62%. Hyperdynamic. End diastolic volume small. Inferior vena cava collapsed. No valve disease, no pericardial fluid.'],
      ['Echocardiogram Nov 10','Ejection fraction 60%. End diastolic volume normal for her size. Inferior vena cava normal.'],
      ['Baseline for comparison','August physical: HR 52, BP 108/64.']
    ],
    five:[
      'Name which term of cardiac output is doing the work on arrival, and say what the other term is doing.',
      'Predict her stroke volume on arrival relative to her August baseline, and justify the prediction from the echocardiogram rather than from the blood pressure.',
      'Explain, through the cardiac cycle, why the small end diastolic volume and the rate of 128 are the same problem and not two problems.',
      'Interpret an ejection fraction of 62% in a patient with a low cardiac output. Say what it shows and what it cannot show.',
      'Name the one measurement that would tell you whether more fluid will raise her cardiac output.'
    ],
    tracks:{
      nursing:{ data:'Her pulse pressure on arrival is 38 mmHg. In August it was 44. Her extremities are cool and her capillary refill is 4 seconds.',
        go:'the blood pressure looks nearly acceptable and the patient does not. Say what pulse pressure is related to and why a narrowing pulse pressure is an earlier warning than a falling systolic. Then name the two bedside findings in this entry that tell you what her peripheral vessels are doing, and say why the heart rate and the cool hands are parts of the same response.' },
      medicine:{ data:'Ejection fraction is stroke volume divided by end diastolic volume. Preload responsiveness is the question of whether a further increase in end diastolic volume would produce a useful increase in stroke volume.',
        go:'show algebraically what happens to the ejection fraction when both the stroke volume and the end diastolic volume fall together, and use that to explain her 62%. Then place her on the Frank-Starling curve and say, from where she sits, whether the next 500 mL will help, and what you would measure to check.' },
      radiology:{ data:'The echocardiogram reports an ejection fraction, which is calculated, and chamber dimensions, which are measured. Inferior vena cava collapsibility is widely used as a surrogate for volume status and performs poorly in several common situations.',
        go:'separate what this study measured from what it computed, and say what assumptions turn a two dimensional image into a ventricular volume. Then say what the collapsing inferior vena cava suggests here, and name two situations in which the same finding would mislead you.' },
      rt:{ data:'She is breathing spontaneously at 32 breaths a minute with large tidal volumes, generating negative intrathoracic pressure with every breath.',
        go:'spontaneous breathing and positive pressure ventilation do opposite things to the pressure surrounding the heart. Say what her large negative swings are doing to venous return right now, and then say what would happen to her preload and her cardiac output in the first minute after intubation. Name what you would do about it.' },
      exercise:{ data:'Her August resting heart rate of 52 reflects a large end diastolic volume and high vagal tone. A trained heart has more room to fill and empties a larger volume per beat at any given rate.',
        go:'her athletic adaptation is doing two contradictory things in this admission. Say how a large ventricle helped her tolerate a 6 L deficit for three weeks, and then say how a resting rate of 52 could have delayed anyone noticing she was compensating. Use stroke volume and heart rate reserve in your answer.' }
    }
  },

  /* --------------------------------------------------------- 10 */
  10: {
    title:'Circulation &amp; Blood Pressure',
    date:'September 22, 06:40 to 12:00', when:'The first five hours',
    encounter:'Hemodynamics and the response to fluid',
    arc:'Her blood pressure on arrival is very nearly normal, and she has lost a tenth of her body weight in water. This entry is about what the baroreflex is willing to sacrifice in order to keep one number looking acceptable.',
    chart:[
      ['06:40','Supine BP 96/58, HR 128. Sitting attempted at 06:55: 78/44 with HR 148, aborted. Capillary refill 4 seconds, extremities cool. Urine output 8 mL/hr.'],
      ['09:00, after 2 L','BP 104/64, HR 112. Capillary refill 3 seconds. Urine output 25 mL/hr.'],
      ['12:00, after 4 L','BP 112/70, HR 96. Capillary refill 2 seconds, extremities warm. Urine output 55 mL/hr.'],
      ['Baseline for comparison','August: BP 108/64, HR 52, and she stood up without any change worth recording.']
    ],
    five:[
      'Name what is being defended here and name what is being spent in order to defend it.',
      'Predict what cardiac output and total peripheral resistance were each doing at 06:40, and say how a nearly normal blood pressure is consistent with both answers.',
      'Explain the baroreflex from receptor to effector: where the receptors are, what they actually sense, and what each efferent limb does.',
      'Interpret a supine blood pressure of 96/58 in this patient. Say what it shows and what it cannot show.',
      'Name the one measurement that would tell you the reflex has stopped compensating.'
    ],
    tracks:{
      nursing:{ data:'The sitting blood pressure was abandoned after 15 seconds because she felt faint. Urine output is being measured hourly. Capillary refill was documented at every set of observations.',
        go:'three of the things on this flowsheet are organ perfusion monitors and the blood pressure is not one of them. Name them, and for each say which organ it reports on and why that organ was chosen. Then explain why the failed sitting attempt was more informative than the supine reading, and what you would document about it.' },
      medicine:{ data:'Mean arterial pressure is the product of cardiac output and total peripheral resistance. A young patient can maintain a normal blood pressure through a substantial volume loss and then decompensate quickly.',
        go:'say what proportion of her circulating volume roughly 6 L of deficit represents, and then explain how her blood pressure stayed at 96/58. Name the two variables the reflex raised to do it. Then say what happens physiologically at the moment a compensating patient decompensates, and why it is abrupt rather than gradual.' },
      radiology:{ data:'A contrast enhanced study was considered for another indication and deferred until after resuscitation. Renal medullary blood flow is low even in health, and the medulla operates close to its oxygen supply.',
        go:'her kidneys are being deliberately underperfused by her own reflex right now. Say why the medulla is the vulnerable region and what makes its oxygen supply marginal in normal conditions. Then argue, physiologically, why the same contrast dose carries a different risk at 06:40 and at 12:00.' },
      rt:{ data:'Respiratory rate 32 throughout. The work of breathing consumes a small percentage of total oxygen consumption at rest and a much larger share when ventilation is high.',
        go:'her breathing is part of the compensation and it is also a cost. Say what her respiratory muscles are consuming and where that oxygen and blood flow have to come from in a patient with a low cardiac output. Then say what happens to that balance if she tires, and name the sign that would tell you she is about to.' },
      exercise:{ data:'During exercise, cardiac output rises several fold, total peripheral resistance falls, and mean arterial pressure rises modestly. In hypovolemia, cardiac output falls, resistance rises, and mean arterial pressure is held.',
        go:'both states produce a tachycardia and both are driven by sympathetic outflow, and they are physiologically opposite. Say what resistance is doing in each and why. Then explain what local metabolic vasodilation does in exercising muscle that overrides the sympathetic signal, and say why nothing overrides it in her.' }
    }
  },

  /* --------------------------------------------------------- 11 */
  11: {
    title:'Blood &amp; Immunity',
    date:'September 22 and December 20', when:'Arrival, and the three month review',
    encounter:'Hematology and the three month glycated hemoglobin',
    arc:'Three of the numbers on her arrival blood count look like findings and are not. This entry is about what a measurement is a measurement of, and about the one result that reports on three months rather than on a moment.',
    chart:[
      ['September 22','Hemoglobin 15.8 g/dL, hematocrit 47%, white cell count 18.4 &times;10<sup>9</sup>/L with a neutrophil predominance, platelets 410. No fever. Cultures negative. Chest film clear.'],
      ['Glycated hemoglobin','September 22: HbA1c 11.2%. December 20: 6.9%.'],
      ['December 20','Hemoglobin 13.1 g/dL, hematocrit 39%, white cell count 6.2, platelets 260.'],
      ['Baseline for comparison','August: hemoglobin 13.4 g/dL, hematocrit 40%.']
    ],
    five:[
      'Name exactly what hematocrit is a measurement of, including what sits in the denominator.',
      'Predict what her hematocrit will do over the first twelve hours of rehydration if not a single red cell is added or lost, and say why.',
      'Explain what HbA1c measures and why the lifespan of a red cell sets the window it reports on.',
      'Interpret a white cell count of 18.4 with no fever and negative cultures. Say what it shows and what it cannot show.',
      'Name the one measurement that would tell you whether her red cell mass was ever abnormal at all.'
    ],
    tracks:{
      nursing:{ data:'The arrival count was drawn before fluids were started. The December count was drawn in clinic, fasting, from the antecubital fossa.',
        go:'when a sample is taken changes what it means. Say why the timing of the arrival draw relative to the first liter matters for the hematocrit, and roughly how different the number would have been at 12:00. Then name two other things about how a sample is taken that can change a result without anything changing in the patient.' },
      medicine:{ data:'Catecholamines and cortisol both raise the circulating white cell count within hours, by demargination and by release from the marrow, without any infection being present.',
        go:'name the two mechanisms and say which cells each one supplies. Then explain why her count of 18.4 is expected here, and finish with the harder half: say what you would still do about the possibility of infection, and why "expected" is not the same as "excluded".' },
      radiology:{ data:'A chest radiograph was obtained on arrival because of the respiratory rate of 32. It was reported as clear.',
        go:'the film was ordered to answer a question about her breathing. Say what a clear chest film does and does not exclude in a patient breathing at 32, and be specific about what her Week 13 entry will show the breathing was actually for. Then say whether the film was worth doing, and defend the answer either way.' },
      rt:{ data:'Oxygen content of blood depends on hemoglobin concentration, oxygen saturation, and a small dissolved component. Saturation is a percentage of the hemoglobin present, not a measure of how much hemoglobin there is.',
        go:'her saturation was 99% on arrival with a hemoglobin of 15.8, and 99% in December with a hemoglobin of 13.1. Calculate roughly what her oxygen content was on each occasion and say why the identical saturation hid the difference. Then say which of those two hemoglobin values was the real one, and why.' },
      exercise:{ data:'Endurance training expands plasma volume, which lowers hematocrit without lowering red cell mass. This is sometimes called dilutional pseudoanemia.',
        go:'her August hematocrit of 40% is at the lower end for an adult woman, and she is highly trained. Say what training did to her plasma volume and what that did to the ratio. Then explain why her September value of 47% and her August value of 40% could both be consistent with an unchanged red cell mass, and name the measurement that would prove it.' }
    }
  },

  /* --------------------------------------------------------- 12 */
  12: {
    title:'Digestion, Absorption &amp; Energy Balance',
    date:'October 1 to November 20', when:'Two weeks to eight weeks after discharge',
    encounter:'Nutrition and energy balance review',
    arc:'She is eating again and putting weight back on, and the rate at which she does it turns out to be a physiology problem rather than a willpower one. One symptom in October looks alarming and is not.',
    chart:[
      ['October','Appetite returned. Reports early fullness after about half a normal meal, and occasional nausea. No vomiting. Resolved by early November without treatment.'],
      ['Weight','October 1: 55 kg (121 lb). November 20: 59 kg (130 lb).'],
      ['Indirect calorimetry, November 5','Measured resting energy expenditure 1,320 kcal/day. Predicted for her mass and age 1,410 kcal/day. Respiratory quotient 0.83.'],
      ['Note','Eating pattern is three meals with insulin dosed to carbohydrate. No restriction.']
    ],
    five:[
      'Name the step in the digestive sequence that early fullness points to, and say what normally happens at that step.',
      'Predict what happens to her weight if intake exceeds expenditure by roughly 300 kcal a day for seven weeks, and say what that regained weight is made of.',
      'Explain what indirect calorimetry actually measures at the mouth, and how those measurements become a figure in kilocalories per day.',
      'Interpret a measured resting energy expenditure below the predicted value. Say what it shows and what it cannot show.',
      'Name the one measurement that would separate slow gastric emptying from a stomach that has simply become small.'
    ],
    tracks:{
      nursing:{ data:'She is asked to describe the fullness: it comes on early in a meal, is not painful, and is worse with large or fatty meals. She has been told to eat more and finds it difficult.',
        go:'the pattern in that description does most of the diagnostic work. Say what "worse with fat" points to, naming the mechanism by which fat in the duodenum slows gastric emptying and the hormone involved. Then give the practical advice that follows from the physiology, and say why "eat more" on its own was never going to work.' },
      medicine:{ data:'Diabetic gastroparesis is caused by autonomic neuropathy and typically develops over years of poor glycemic control. Acute hyperglycemia itself also slows gastric emptying, and that effect is reversible.',
        go:'two explanations, and the time course separates them. Say what each predicts about when the symptom starts and whether it resolves. Then use the fact that her symptom resolved in six weeks to argue which one this was, and say what you would tell her about her risk over the next twenty years.' },
      radiology:{ data:'A scintigraphic gastric emptying study labels a standardized meal with a radiotracer and measures how much has left the stomach at fixed intervals, usually reported as the percentage retained at 4 hours.',
        go:'say what the tracer is bound to and why it has to stay with the meal rather than dissolve into it. Then explain what a gastric emptying half time is and why the test uses a solid meal, and finish by arguing from her chart whether this study was indicated in October, in November, or not at all.' },
      rt:{ data:'Indirect calorimetry measures oxygen consumption and carbon dioxide production. The respiratory quotient is the ratio of carbon dioxide produced to oxygen consumed, and is about 1.0 for carbohydrate, 0.7 for fat, and around 0.8 for mixed feeding.',
        go:'her respiratory quotient is 0.83. Say what mixture of substrates that implies and how confident you can be. Then explain, using the same ratio, what happens to carbon dioxide production when a patient is fed a very high carbohydrate load, and why that matters for someone with limited ventilatory reserve.' },
      exercise:{ data:'Total daily energy expenditure is resting expenditure, plus the thermic effect of food, plus activity. She returned to light training in late October.',
        go:'the calorimeter measured one of those three components. Name which, and say what proportion of her daily total it usually represents. Then explain the two separate reasons her resting expenditure sits below the prediction, one of which is simple arithmetic and one of which is not, and say which of them will correct on its own.' }
    }
  },

  /* --------------------------------------------------------- 13 */
  13: {
    title:'Respiratory Physiology',
    date:'September 22, 06:40, and November 25', when:'Arrival, and the return to training test',
    encounter:'Ventilation and gas exchange',
    arc:'Her lungs were never the problem and her breathing was the single most important thing keeping her alive. This entry separates moving air from exchanging gas, and it contains the one intervention in the whole file that could have killed her.',
    chart:[
      ['Arrival, 06:40','Respiratory rate 32, deep and unlabored. No accessory muscle use, no wheeze, chest clear. SpO<sub>2</sub> 99% on room air.'],
      ['Arterial blood gas, 06:45, room air','pH 7.09, PaCO<sub>2</sub> 14 mmHg, PaO<sub>2</sub> 118 mmHg, bicarbonate 4 mEq/L.'],
      ['Imaging','Chest radiograph clear.'],
      ['November 25, exercise test','Peak respiratory rate 44, minute ventilation 88 L/min, tidal volume 1.9 L, SpO<sub>2</sub> 98% throughout.']
    ],
    five:[
      'Name whether the problem on arrival is ventilation, gas exchange, or gas transport, and justify the answer from the numbers rather than from the diagnosis.',
      'Predict roughly what her alveolar ventilation must be, given a PaCO<sub>2</sub> of 14 mmHg, and say what that is as a multiple of normal.',
      'Explain the relationship between alveolar ventilation and PaCO<sub>2</sub>, and say what it predicts if ventilation is doubled and then doubled again.',
      'Interpret an oxygen saturation of 99% in a patient this sick. Say what it shows and what it cannot show.',
      'Name the one measurement that would tell you her respiratory compensation is beginning to fail, and say what you would do about it.'
    ],
    tracks:{
      nursing:{ data:'The triage note records "breathing fast, not distressed". She is not using accessory muscles, is speaking in full sentences, and does not look breathless to the nurse.',
        go:'the triage nurse recorded exactly the right thing. Say what distinguishes this breathing pattern from respiratory distress, and name what she is breathing hard for, given that her oxygen is fine. Then say what it would mean if she suddenly looked comfortable and her rate fell to 18, and why that would be the worst news of the morning.' },
      medicine:{ data:'Winter’s formula predicts the expected PaCO<sub>2</sub> in a metabolic acidosis as 1.5 times the bicarbonate plus 8, plus or minus 2.',
        go:'apply the formula to her bicarbonate of 4 and compare it to her measured PaCO<sub>2</sub> of 14. Say whether the compensation is appropriate, inadequate or more than expected, and say what each of those three answers would have meant. Then check the whole gas for internal consistency using the Henderson-Hasselbalch relationship, and say what you would conclude if it did not agree.' },
      radiology:{ data:'The chest radiograph is clear. Her PaO<sub>2</sub> is 118 mmHg on room air, which is above the usual range for a young adult.',
        go:'explain why her PaO<sub>2</sub> is high rather than normal, using the alveolar gas equation and what a PaCO<sub>2</sub> of 14 does to alveolar oxygen. Then say what the clear film contributes to the assessment, and be honest about how much of the answer came from a number rather than from an image.' },
      rt:{ data:'She is generating a minute ventilation several times normal to hold a pH of 7.09. If she were sedated and intubated, the ventilator would deliver whatever rate and tidal volume were set.',
        go:'this is the most important paragraph in her file for your discipline. Say what happens to her pH within minutes if she is intubated and ventilated at a conventional rate and tidal volume, and calculate roughly what minute ventilation would have to be set to hold her PaCO<sub>2</sub> at 14. Then say what makes that setting difficult and dangerous in its own right, and what the alternative is.' },
      exercise:{ data:'In November she reached a minute ventilation of 88 L/min at a rate of 44 with tidal volumes of 1.9 L. Anatomical dead space is roughly 150 mL and does not change much with tidal volume.',
        go:'calculate her alveolar ventilation at the November peak, then calculate it again for a hypothetical patient at the same 88 L/min achieved with a rate of 88 and a tidal volume of 1.0 L. Explain the difference in terms of dead space fraction, and say why a minute ventilation on a monitor can look reassuring while the patient is ventilating poorly.' }
    }
  },

  /* --------------------------------------------------------- 14 */
  14: {
    title:'Renal Physiology &amp; Fluid Balance',
    date:'September 22 to 26, and November 10', when:'The admission, and the seven week review',
    encounter:'Renal function through the admission and after',
    arc:'Her creatinine rose and came back, and at no point was her kidney injured. This entry is about a kidney doing exactly what it was told to do, and about a transporter being asked to carry more than it can.',
    chart:[
      ['September 22','Creatinine 1.6 mg/dL, BUN 34 mg/dL. Urine output 8 mL/hr. Urine sodium 14 mEq/L. Urine glucose 4+. Urine specific gravity high but unreliable in the presence of glucose.'],
      ['September 24','Creatinine 0.9 mg/dL. Urine output 90 mL/hr. Urine glucose trace.'],
      ['November 10','Creatinine 0.8 mg/dL, estimated GFR above 90. Urine albumin to creatinine ratio 8 mg/g, which is normal.'],
      ['Note','Renal threshold for glucose is reached at a plasma glucose of roughly 180 to 200 mg/dL. Her plasma glucose was 642.']
    ],
    five:[
      'Name what her kidney is defending on September 22, and name what it is spending in order to defend it.',
      'Predict what happened to GFR, to urine volume and to urine sodium, separately, and explain how urine volume and GFR moved in opposite directions.',
      'Explain the transport maximum for glucose and how exceeding it produces an osmotic diuresis.',
      'Interpret a urine sodium of 14 mEq/L alongside a creatinine of 1.6. Say what it shows and what it cannot show.',
      'Name the one measurement that would tell you this was intrinsic kidney injury rather than a kidney responding correctly to a low circulating volume.'
    ],
    tracks:{
      nursing:{ data:'A urinary catheter was placed for hourly output measurement. Output rose from 8 mL/hr to 55 mL/hr over five hours as fluids ran, and to 90 mL/hr by day two.',
        go:'hourly urine output is the cheapest organ perfusion monitor on the unit. Say what a value of 8 mL/hr tells you and what threshold you would want her above. Then explain why her output rose while her glucose was still high, and say which of the two, the fluids or the falling glucose, deserves the credit.' },
      medicine:{ data:'A low urine sodium in the presence of a raised creatinine suggests avid sodium reabsorption, which is the response of an intact tubule to a low effective circulating volume. The fractional excretion of sodium is used for the same purpose and becomes unreliable during a diuresis.',
        go:'use her urine sodium to argue whether the tubule is working, and say what a value of 60 mEq/L would have meant instead. Then explain why the fractional excretion of sodium is unreliable in her specifically, naming the reason in her chart, and say what alternative you would use.' },
      radiology:{ data:'Renal ultrasound was not performed. Ultrasound reports kidney size, cortical thickness, and whether the collecting system is obstructed. The resistive index is a Doppler measurement of the difference between peak systolic and end diastolic flow.',
        go:'say what each of those findings would contribute and what none of them can tell you about filtration. Then argue from her chart whether ultrasound was indicated on arrival, and name the single clinical circumstance in which it would have become essential.' },
      rt:{ data:'The lungs change pH within minutes by altering carbon dioxide. The kidney changes pH over hours to days by excreting acid and regenerating bicarbonate.',
        go:'her lungs are doing all the acute work and her kidneys are doing the slow work in the background. Name the two things the kidney actually does to acid and bicarbonate, and give the time course of each. Then say why she cannot wait for her kidneys, and what would happen to her pH over the next hour if her respiratory rate fell to 20.' },
      exercise:{ data:'An endurance athlete who over-drinks during a long event can develop exercise associated hyponatremia, with a fall in sodium and a gain in body weight.',
        go:'Camila also had a low measured sodium, and hers means something completely different. Say what the mechanism is in each case, using body weight to separate them immediately. Then say what antidiuretic hormone is doing in each, and name where it acts and what it inserts into the tubule membrane.' }
    }
  },

  /* --------------------------------------------------------- 15 */
  15: {
    title:'Acid-Base Balance &amp; Integration',
    date:'The whole file', when:'Reading September 22 again, with everything you now know',
    encounter:'Integration',
    arc:'This is the last entry and it is the first one again. You read her arrival blood gas in Week 13 knowing about ventilation. Read it now knowing about her potassium, her fluid, her hormones, her kidney and her fuel. Then read the gas taken twelve hours later, which is the one that catches people out.',
    chart:[
      ['September 22, 06:45, on arrival','pH 7.09, PaCO<sub>2</sub> 14 mmHg, bicarbonate 4 mEq/L. Sodium 128 mEq/L (corrected 137), chloride 96, glucose 642 mg/dL, beta-hydroxybutyrate 6.8 mmol/L.'],
      ['September 22, 18:00, after 6 L of 0.9% saline and an insulin infusion','pH 7.31, PaCO<sub>2</sub> 26 mmHg, bicarbonate 13 mEq/L. Sodium 140, chloride 112, glucose 198 mg/dL, beta-hydroxybutyrate 1.1 mmol/L.'],
      ['September 24','pH 7.39, PaCO<sub>2</sub> 39, bicarbonate 23, chloride 106. Off the insulin infusion, on subcutaneous insulin.'],
      ['November 25','All values normal. Cleared for full training.']
    ],
    five:[
      'Read the pH on arrival and name the primary disturbance. Then do the same for the 18:00 gas.',
      'Predict what the PaCO<sub>2</sub> should be at each time point using Winter’s formula, and say whether the compensation is appropriate at each.',
      'Calculate the anion gap on arrival and at 18:00, and explain why the gap closed while the chloride rose by 16 mEq/L.',
      'Interpret the 18:00 gas. Say what it shows and what it cannot show about whether she is getting better.',
      'Name the one measurement that would change your management at 18:00, and say what you would do differently.'
    ],
    tracks:{
      nursing:{ data:'At 18:00 the team is pleased: her pH has risen from 7.09 to 7.31 and her ketones have almost cleared. Her bicarbonate, however, is 13, and her chloride has gone from 96 to 112.',
        go:'the pH improved and a new problem was created while it did. Say where the chloride came from, naming the fluid. Then explain, in the words you would use in handover, why her bicarbonate did not rise as much as the falling ketones would predict, and what should change about the fluid now.' },
      medicine:{ data:'The delta-delta compares the rise in the anion gap with the fall in bicarbonate. When the gap falls faster than the bicarbonate recovers, a second, non-gap acidosis has appeared.',
        go:'calculate the change in the anion gap and the change in the bicarbonate between the two gases, and say what the comparison reveals. Name the second acidosis and its cause. Then say what fluid you would switch to and why the anion in that fluid solves the problem.' },
      radiology:{ data:'Across this entire admission and the twelve weeks after it, she had one chest radiograph, two echocardiograms, one pelvic ultrasound and two DEXA scans. No CT, no head imaging, no renal imaging.',
        go:'this is the whole file, so read it as one. Name which single imaging study across the term actually changed her management, and defend the choice. Then name the study that was closest to being unnecessary, and say what question it was answering that a number in the chart had already answered.' },
      rt:{ data:'At 18:00 her PaCO<sub>2</sub> is 26, up from 14. Her pH is 7.31, up from 7.09. She is still breathing spontaneously.',
        go:'a rising PaCO<sub>2</sub> is usually bad news and here it is good news. Explain why, using the relationship between bicarbonate and PaCO<sub>2</sub> that holds a pH steady. Then say what her PaCO<sub>2</sub> would have to be at 18:00 for you to be worried instead, and say what that number would mean about her respiratory muscles.' },
      exercise:{ data:'At her November exercise test, peak blood lactate was 11.4 mmol/L with a pH of 7.31, the same pH she had at 18:00 on the day she nearly died. Where the protons in exercise acidosis come from is genuinely disputed: the traditional account is that lactic acid dissociates, and a competing account holds that lactate production consumes a proton and the protons come from ATP hydrolysis outrunning oxidative resynthesis.',
        go:'the same pH, two completely different states. Say what makes one an emergency and the other a normal Tuesday, using the anion gap, the time course, and what happens when the stimulus stops. Then lay out both accounts of the exercise protons, say what each predicts you would measure, and take a position while making clear which parts are settled and which are not.' }
    }
  }

  }
};
