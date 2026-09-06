/* =====================================================================
   WEEK 1, PART G: the written test and the start up

   Questions are tagged by objective, so the results page can tell a
   student which idea to go back to rather than just a score.
   ===================================================================== */
(function () {
'use strict';
var L = window.LAB, el = L.el, $ = L.$;
var W = L.W1;

var OBJ = {
  loop: 'Control loops',
  map: 'Mean arterial pressure and pulse pressure',
  baro: 'The baroreflex and standing',
  curve: 'The oxygen dissociation curve',
  clin: 'Putting it together clinically'
};
var WHERE = {
  loop: 'Learn, every loop has the same four parts, and the loop lab',
  map: 'Learn, what the two numbers actually are, and both dataset tasks',
  baro: 'Learn, what happens the moment you stand up, and step three of Rosa\u2019s case',
  curve: 'Learn, the oxygen curve and how it slides, and the curve page',
  clin: 'Learn, why MAP is the number the body defends, and the decision chart'
};

var BANK = [
  /* ---- control loops ---- */
  { o: 'loop', q: 'In the temperature loop, what is the regulated variable?', a: ['The hypothalamus', 'Sweat glands', 'Core body temperature', 'Thermoreceptors in the skin'], c: 2,
    e: 'The regulated variable is the number being defended, not any of the parts defending it. Everything else in the loop exists to hold that number steady.' },
  { o: 'loop', q: 'Which part of a control loop can measure but cannot change anything?', a: ['The effector', 'The sensor', 'The integrator', 'The regulated variable'], c: 1,
    e: 'Sensors report and nothing more. This matters clinically because a patient can detect a problem perfectly well and still fail to correct it, and knowing which limb has failed is what tells you what to do about it.' },
  { o: 'loop', q: 'Sweating and shivering are both effectors in the temperature loop. What does having two opposite effectors buy the body?', a: ['A faster response', 'The ability to defend the set point from both directions', 'A lower set point', 'Redundancy if one fails'], c: 1,
    e: 'One effector can only push one way. Two opposite effectors mean the loop can correct being too hot and being too cold, which is why core temperature moves so little across a whole day.' },
  { o: 'loop', q: 'Blood clotting, where each activated factor activates more of the next, is an example of what?', a: ['Negative feedback', 'Positive feedback', 'Autoregulation', 'A set point error'], c: 1,
    e: 'Each step amplifies the next, which is positive feedback. It is useful and it is deliberate, and like all positive feedback it needs an event, the finished clot, to end it.' },
  { o: 'loop', q: 'In the breathing loop, which variable is regulated minute to minute?', a: ['Arterial oxygen', 'Arterial carbon dioxide', 'Blood pH only', 'Respiratory rate'], c: 1,
    e: 'Carbon dioxide is regulated first and oxygen is the backup, taking over only once oxygen falls a long way. This ordering explains a great deal about respiratory physiology later in the course.' },

  /* ---- MAP and pulse pressure ---- */
  { o: 'map', q: 'A patient reads 132 over 66. What is the mean arterial pressure?', a: ['99', '88', '110', '78'], c: 1,
    e: 'The gap is 66. A third of 66 is 22. Add that to the diastolic: 66 plus 22 gives 88. Averaging the two numbers would have given 99, which is the most common mistake and is nearly always too high.' },
  { o: 'map', q: 'Why is mean arterial pressure closer to the diastolic than to the systolic?', a: ['Diastolic is measured more accurately', 'The heart spends about two thirds of each beat filling rather than ejecting', 'Systolic is an instantaneous peak that does not count', 'Because of the weight of the blood column'], c: 1,
    e: 'The mean is a time average, and the heart spends far longer at the low end of the cycle than at the peak. That is the whole reason for the one third, two thirds shape of the formula.' },
  { o: 'map', q: 'A chart records a mean arterial pressure of 90 and a pulse pressure of 60. What was the cuff reading?', a: ['120 over 60', '130 over 70', '135 over 55', '110 over 50'], c: 1,
    e: 'Diastolic is the mean minus a third of the swing: 90 minus 20, so 70. Systolic is the diastolic plus the whole swing: 70 plus 60, so 130. Working the formula backwards like this is the test of whether you actually understand it.' },
  { o: 'map', q: 'An 80 year old reads 160 over 70. A 25 year old reads 130 over 100. Who has the wider pulse pressure, and what does it most likely mean?', a: ['The 25 year old, meaning a strong heart', 'The 80 year old, meaning stiff arteries', 'The 80 year old, meaning a strong heart', 'They are the same'], c: 1,
    e: 'Ninety against thirty. In an older person a wide swing almost always means the aorta has lost its stretch, so the whole push of each beat arrives at once instead of being cushioned. It is a statement about the pipes, not about the pump.' },
  { o: 'map', q: 'Two patients both have a mean arterial pressure of 93. One is 120 over 80, the other is 150 over 65. What is physically different?', a: ['Their heart rates', 'Their arterial stiffness, which shows up as a much wider pulse pressure in the second', 'Their blood volume', 'Nothing, they are physiologically identical'], c: 1,
    e: 'Identical mean pressures, pulse pressures of 40 and 85. The second patient has stiff arteries that cannot absorb the push of a beat. Two patients can share a mean pressure and have completely different circulations, which is why you look at both numbers.' },

  /* ---- baroreflex ---- */
  { o: 'baro', q: 'What do baroreceptors actually detect?', a: ['Pressure directly', 'Stretch of the arterial wall', 'Oxygen content', 'Blood flow velocity'], c: 1,
    e: 'They are stretch sensors. Pressure is inferred from how far the wall has been pushed out, which is why a stiff artery can send a misleading signal even when the pressure is fine.' },
  { o: 'baro', q: 'When blood pressure falls, what happens to the firing rate from the baroreceptors?', a: ['It increases', 'It decreases', 'It stays the same', 'It becomes irregular'], c: 1,
    e: 'Less pressure means less stretch means fewer signals. The brainstem reads that quiet as low pressure and responds by increasing sympathetic output. This is one of the places where less signal produces more response, and it catches people out every year.' },
  { o: 'baro', q: 'Roughly how much blood moves into the legs when a person stands up?', a: ['50 to 100 mL', '500 to 800 mL', '1.5 to 2 L', 'Almost none, valves prevent it'], c: 1,
    e: 'Five hundred to eight hundred millilitres, most of a large drink bottle, in about a second. The reflex has to find that much circulating volume from somewhere before the brain notices.' },
  { o: 'baro', q: 'A patient on a beta blocker stands and their systolic falls 30 points while their heart rate rises only 3. Which limb of the loop has failed?', a: ['The sensor', 'The integrator', 'The effector', 'No limb has failed, this is normal'], c: 2,
    e: 'The sensors detected it and the brainstem sent the order. The heart is chemically prevented from answering, so the failure is at the effector. Compare that with dehydration, where the heart rate climbs hard and pressure still falls because there was never enough volume to work with.' },
  { o: 'baro', q: 'What defines orthostatic hypotension?', a: ['Any dizziness on standing', 'A fall of 20 in systolic or 10 in diastolic within three minutes of standing', 'A systolic below 100 while standing', 'A heart rate rise of more than 30'], c: 1,
    e: 'Twenty systolic or ten diastolic, within three minutes. Symptoms matter clinically, but the definition is a measurement, and it is one you can make with a cuff and a clock.' },
  { o: 'baro', q: 'In the intact run, why does diastolic pressure rise slightly while systolic falls?', a: ['Measurement artifact', 'Vessels tighten, holding more pressure between beats, while smaller stroke volumes lower the peak', 'The heart fills better while upright', 'Diastolic always rises with heart rate'], c: 1,
    e: 'Vessel tone holds the diastolic up, and a smaller beat pulls the systolic down. The two move in opposite directions, so the pulse pressure narrows. That narrowing is often the first visible sign the reflex has engaged.' },

  /* ---- oxygen curve ---- */
  { o: 'curve', q: 'At a saturation of 90 percent, roughly what is the oxygen pressure?', a: ['90', '75', '60', '40'], c: 2,
    e: 'Ninety over sixty is the landmark. A reading that looks only slightly low already means the oxygen pressure has fallen to 60, and everything below that is on the steep part of the curve.' },
  { o: 'curve', q: 'A patient\'s oxygen pressure falls from 100 to 65. What happens to the saturation?', a: ['It falls to about 65 percent', 'It falls about six points, to roughly 91 percent', 'It does not change', 'It falls below 80 percent'], c: 1,
    e: 'Over a third of the oxygen pressure is gone and the saturation moves six points. That is the flat top of the curve doing its job, and it is also why the finger clip can look calm while something real is developing.' },
  { o: 'curve', q: 'What does the P50 describe?', a: ['The pressure at which hemoglobin is half loaded', 'Half of the arterial oxygen pressure', 'The saturation at a pressure of 50', 'The pressure needed for 50 mL of oxygen delivery'], c: 0,
    e: 'It is the pressure that fills exactly half the binding sites, normally about 27. Because the whole curve moves together, one number is enough to say where it is sitting.' },
  { o: 'curve', q: 'Which of these shifts the curve to the right?', a: ['Cold, alkalosis, low carbon dioxide', 'Heat, acidosis, high carbon dioxide, high 2,3-BPG', 'Fetal hemoglobin', 'Carbon monoxide'], c: 1,
    e: 'Every one of those describes hard working tissue. The tissue creates its own conditions, and the blood passing through it hands over more oxygen as a direct result. No signal is needed.' },
  { o: 'curve', q: 'A patient rescued from a house fire has a pulse oximeter reading of 99 percent. Why is that not reassuring?', a: ['Oximeters do not work in smoke', 'Carbon monoxide occupies the same binding sites and a standard oximeter reads it as oxygen', 'The reading should be 100 percent', 'The curve shifts right in fires'], c: 1,
    e: 'A standard two wavelength oximeter cannot tell carbon monoxide from oxygen, so the seats can be full of the wrong gas. This is one of the few settings where a normal saturation is actively misleading, and it is why smoke exposure gets a blood test.' },
  { o: 'curve', q: 'Why does anemia not lower the saturation reading?', a: ['It does lower it, by about ten points', 'Saturation is the percentage of available sites that are filled, not how many sites there are', 'Anemic blood shifts the curve left', 'Oximeters correct for hemoglobin automatically'], c: 1,
    e: 'A percentage says nothing about the size of what is being divided. Halve the hemoglobin and every remaining site can still be full, giving a perfect reading on half the oxygen. Saturation is a percentage, not an amount.' },

  /* ---- clinical ---- */
  { o: 'clin', q: 'Why is a mean arterial pressure of 65 used as a target in so many hospital protocols?', a: ['It is exactly half of normal', 'It is roughly where autoregulation runs out of room, so below it organ blood flow follows pressure down', 'It is the pressure at which the kidneys start making urine', 'It is a historical convention with no physiological basis'], c: 1,
    e: 'Organs widen their own vessels to protect their blood flow, but only down to a point. Around 65 that reserve is used up, so any further fall means the organ simply gets less. It is a floor, not a goal.' },
  { o: 'clin', q: 'A patient is 74 over 55 with a heart rate of 122. What does the narrow pulse pressure and fast rate suggest?', a: ['Vessels have lost their tone', 'Each beat is moving very little blood, and the reflex is compensating hard', 'The reflex is blocked', 'Nothing, these numbers are normal'], c: 1,
    e: 'A narrow swing means a small stroke volume, and a fast rate means the reflex is intact and working. Together they point at not enough circulating volume, from bleeding, vomiting or another loss. The loop is fine, the tank is low.' },
  { o: 'clin', q: 'A patient is 95 over 43 with a heart rate of 110 and warm hands. Where is the problem?', a: ['The pump, which has become too weak', 'The pipes, which have lost their tone', 'The volume, which is too low', 'The sensor limb of the reflex'], c: 1,
    e: 'A wide swing on a very low diastolic means pressure is leaking away between beats, which is a statement about vessel tone. This is the picture of distributive shock, most commonly sepsis. Fluid helps at first because the container just got larger, but the container is the real problem.' },
  { o: 'clin', q: 'A patient has a mean arterial pressure of 55 and an oxygen saturation of 99 percent. Is the tissue receiving enough oxygen?', a: ['Yes, the saturation is what matters', 'Not necessarily, because loaded blood still has to be delivered', 'Yes, provided the hemoglobin is normal', 'There is no way to say without an arterial blood gas'], c: 1,
    e: 'Delivery needs oxygen on board, enough hemoglobin to carry it, and enough pressure and flow to move it. This patient has the first and has lost the third. Saturation and perfusion are two separate questions and this week deliberately puts them side by side.' },
  { o: 'clin', q: 'Which single number would you most want if you could only have one from a cuff reading?', a: ['Systolic, because it is the peak', 'Diastolic, because it is the trough', 'Mean arterial pressure, because it is what organs experience across the whole beat', 'Pulse pressure, because it describes the arteries'], c: 2,
    e: 'The mean is the driving pressure organs actually feel, all cycle long. The other three are all worth having, and pulse pressure in particular tells you about the arteries, but if you can only carry one number in your head, carry the mean.' }
];

L.W1.testCfg = { root: 'test-root', bank: BANK, objectives: OBJ, where: WHERE };

/* ---------------------------------------------------------------------
   Start up
   --------------------------------------------------------------------- */
L.start(function () {
  W.casePanel();
  W.learnPanel();
  W.loopsPanel();
  W.vitalsPanel();
  W.curvePanel();
  L.testPanel(L.W1.testCfg);
});
})();
