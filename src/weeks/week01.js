/* META {
  "slug": "week-01-foundations",
  "title": "Week 1, Foundations and Whole Body Control",
  "description": "BIO 005 lab for week one. Control loops, mean arterial pressure, pulse pressure, the baroreflex on standing, and reading the oxygen dissociation curve."
} */

/* =====================================================================
   WEEK 1, FOUNDATIONS AND WHOLE BODY CONTROL
   BIO 005 Human Physiology, Dr. Sharilyn Rennie

   Every regulated variable has a sensor, an integrator and an effector.
   Vital signs are that machinery showing its work.
   ===================================================================== */
(function () {
'use strict';
var L = window.LAB, el = L.el, $ = L.$, fmt = L.fmt, fx = L.fx, frac = L.frac;
var card = L.card, kicker = L.kicker, note = L.note, para = L.para, list = L.list;

L.config({
  weekLabel: 'Week 1',
  title: 'Foundations and Whole Body Control',
  lede: 'Find the loop, measure the pressure, work the numbers the machine did not give you, then read the curve.',
  eyebrow: 'Interactive clinical lab'
});

L.addTerms({
  'autoregulation': 'An organ adjusting its own vessels so its blood flow stays steady even when the pressure feeding it changes.',
  'afterload': 'How hard the heart has to push to get blood out. Stiff or narrow vessels raise it.',
  'compliance': 'How stretchy something is. A stretchy artery absorbs the push of a beat. A stiff one passes it straight on.',
  'p50': 'The oxygen pressure at which hemoglobin is exactly half loaded. Normally about 27.',
  'shift': 'The whole curve sliding left or right, which changes how tightly hemoglobin holds on to oxygen.',
  'venous': 'Blood on its way back to the heart, after the tissue has taken what it needed.',
  'arterial': 'Blood on its way out from the heart, freshly loaded in the lungs.',
  'perfusion pressure': 'The pressure actually driving blood through an organ. Roughly mean arterial pressure minus whatever pressure is pushing back.',
  'pulse oximeter': 'The clip on a finger. It reads saturation with light, and it never tells you the oxygen pressure directly.',
  'anemia': 'Not enough hemoglobin. Saturation can still read 100 percent while the blood carries far less oxygen. Sometimes spelled anemia.',
  'orthostatic hypotension': 'Blood pressure that falls too far on standing. The usual line is a 20 point fall in systolic or a 10 point fall in diastolic within three minutes.',
  'stroke': 'Blood flow to part of the brain is cut off or bleeding into it, so that part starts dying within minutes.'
});

/* ---------------------------------------------------------------------
   Progress buckets, in the order they appear on the results page
   --------------------------------------------------------------------- */
var B = {
  chart2:  L.bucket('chart2',  'Rosa, charting and the reference ranges'),
  rosa:    L.bucket('rosa',    'Rosa, the working shown step by step'),
  note:    L.bucket('note',    'Rosa, the clinical note'),
  sim:     L.bucket('sim',     'Rosa, the standing simulation'),
  limb:    L.bucket('limb',    'Rosa, naming the failed limb'),
  study:   L.bucket('study',   'Predictions and checks while studying'),
  loops:   L.bucket('loops',   'Control loops built'),
  vitals:  L.bucket('vitals',  'Blood pressure calculations'),
  chart:   L.bucket('chart',   'Hypotension decision chart'),
  curve:   L.bucket('curve',   'Oxygen dissociation curve')
};

/* ---------------------------------------------------------------------
   Sections and the guided sequence
   --------------------------------------------------------------------- */
L.sections([
  { id: 'case',   label: 'Rosa\u2019s case' },
  { id: 'learn',  label: 'Learn' },
  { id: 'loops',  label: 'Loop lab',       gate: 'case' },
  { id: 'vitals', label: 'Vitals dataset', gate: 'loops' },
  { id: 'curve',  label: 'Oxygen curve',   gate: 'vitals' },
  { id: 'test',   label: 'Test',           gate: 'vitals' },
  { id: 'report', label: 'Submit results', gate: 'vitals' }
]);

L.gateInfo('case', {
  goto: 'case',
  label: 'Go to Rosa',
  msg: 'Rosa comes first. Work her numbers step by step, run the simulation, and name the limb that failed. The rest of the lab opens when you have finished her case.',
  openMsg: '<strong>Rosa\u2019s case is finished.</strong> The loop lab is open, and everything after it unlocks as you go.',
  openLabel: 'Go to the loop lab',
  openGoto: 'loops'
});
L.gateInfo('loops', {
  goto: 'loops',
  label: 'Open the loop lab',
  msg: 'The loop lab comes next. Build all three control loops, then answer the concept check. Your patient dataset opens after that.',
  openMsg: '<strong>All three loops are built.</strong> Your patient dataset is now open, and it stays open.',
  openLabel: 'Go to my dataset',
  openGoto: 'vitals'
});
L.gateInfo('vitals', {
  goto: 'vitals',
  label: 'Open the vitals dataset',
  msg: 'Work your twelve patients next. Fill in the two columns the monitor did not give you, then take one patient through the decision chart. The rest of the lab opens after that.',
  openMsg: '<strong>Your dataset is worked and the chart is done.</strong> The oxygen curve, the test and your results page are all open now.',
  openLabel: 'Go to the oxygen curve',
  openGoto: 'curve'
});

/* ---------------------------------------------------------------------
   The student's own dataset. The seed is a four digit number they carry
   onto their submitted PDF, so their twelve patients are theirs alone
   and can still be rebuilt later from that number.
   --------------------------------------------------------------------- */
L.caseNumber = L.newCaseNumber();
var RND = L.seeded(parseInt(L.caseNumber, 10) * 7919);

function pick(arr) { return arr[Math.floor(RND() * arr.length)]; }
function between(lo, hi) { return lo + RND() * (hi - lo); }
function ri(lo, hi) { return Math.round(between(lo, hi)); }

/* Twelve patients. Each one is a short clinical situation with a cuff
   reading. Two of them are built to land on the same mean arterial
   pressure with very different pulse pressures, because that comparison
   is the point of the exercise. */
var STORIES = [
  { s: 'Routine physical, no complaints', kind: 'normal' },
  { s: 'Marathon runner, resting', kind: 'athlete' },
  { s: 'Age 78, seen for a hearing check', kind: 'stiff' },
  { s: 'Day three after a heart attack', kind: 'lowish' },
  { s: 'Vomiting for two days, dry mouth', kind: 'hypo' },
  { s: 'Untreated high blood pressure, age 54', kind: 'htn' },
  { s: 'Bleeding after a fall, in the emergency department', kind: 'shock' },
  { s: 'Anxious about a needle, sitting in clinic', kind: 'anxious' },
  { s: 'Sepsis, second hour of treatment', kind: 'sepsis' },
  { s: 'Age 81, on three blood pressure medicines', kind: 'stiffLow' },
  { s: 'Pregnant, 32 weeks, routine visit', kind: 'preg' },
  { s: 'Age 24, fainted at a concert, now lying down', kind: 'faint' }
];

var KIND = {
  normal:   function () { var d = ri(70, 80); return [d + ri(38, 48), d]; },
  athlete:  function () { var d = ri(58, 66); return [d + ri(42, 50), d]; },
  stiff:    function () { var d = ri(64, 72); return [d + ri(68, 82), d]; },
  lowish:   function () { var d = ri(60, 68); return [d + ri(30, 38), d]; },
  hypo:     function () { var d = ri(52, 60); return [d + ri(26, 34), d]; },
  htn:      function () { var d = ri(92, 102); return [d + ri(48, 58), d]; },
  shock:    function () { var d = ri(52, 58); return [d + ri(16, 22), d]; },
  anxious:  function () { var d = ri(78, 86); return [d + ri(44, 52), d]; },
  sepsis:   function () { var d = ri(40, 46); return [d + ri(46, 58), d]; },
  stiffLow: function () { var d = ri(50, 58); return [d + ri(60, 74), d]; },
  preg:     function () { var d = ri(62, 70); return [d + ri(36, 44), d]; },
  faint:    function () { var d = ri(56, 64); return [d + ri(32, 40), d]; }
};

var PATIENTS = L.shuffle(STORIES).map(function (st, i) {
  var bp = KIND[st.kind]();
  return {
    id: String.fromCharCode(65 + i),
    story: st.s,
    kind: st.kind,
    age: st.kind === 'stiff' ? ri(74, 84) : st.kind === 'stiffLow' ? ri(78, 88) : ri(21, 68),
    sbp: bp[0], dbp: bp[1],
    hr: st.kind === 'shock' ? ri(112, 130) : st.kind === 'sepsis' ? ri(104, 118) :
        st.kind === 'athlete' ? ri(44, 52) : st.kind === 'anxious' ? ri(92, 104) : ri(62, 84)
  };
});

function MAP(p) { return p.dbp + (p.sbp - p.dbp) / 3; }
function PP(p) { return p.sbp - p.dbp; }

/* ---------------------------------------------------------------------
   ROSA
   Seventy one, stood up from her bed this morning, went lightheaded and
   fell. Her supine cuff reading and, more importantly, which limb of her
   reflex has failed are both seeded, so the answer a student arrives at
   is theirs. Three presentations, all of them things that actually put
   older people on the floor.
   --------------------------------------------------------------------- */
var PRESENTATIONS = [
  {
    key: 'beta', limb: 'effector',
    hx: 'She takes metoprolol for an irregular heartbeat, and took this morning\u2019s dose with breakfast.',
    tell: 'her heart rate barely moves while her pressure falls',
    hrBand: [54, 62]
  },
  {
    key: 'dry', limb: 'volume',
    hx: 'She has had a stomach bug for two days and has not managed to keep fluids down.',
    tell: 'her heart rate climbs hard and her pressure still falls',
    hrBand: [76, 88]
  },
  {
    key: 'auto', limb: 'sensor',
    hx: 'She has had diabetes for thirty years, and her feet have been numb for the last five.',
    tell: 'nothing answers at all, neither her heart rate nor her vessels',
    hrBand: [66, 76]
  }
];

var ROSA = (function () {
  var pres = PRESENTATIONS[Math.floor(RND() * PRESENTATIONS.length)];
  var dbp = ri(66, 80);
  return {
    name: 'Rosa', age: 71,
    pres: pres,
    sbp: dbp + ri(38, 52),
    dbp: dbp,
    hr: ri(pres.hrBand[0], pres.hrBand[1]),
    temp: (36.4 + RND() * 0.6).toFixed(1),
    rr: ri(14, 18),
    spo2: ri(95, 99)
  };
})();
ROSA.map = ROSA.dbp + (ROSA.sbp - ROSA.dbp) / 3;
ROSA.pp = ROSA.sbp - ROSA.dbp;

/* readings from other people on the same shift. They are plausible and
   they are not hers. Anything that scrapes this page carries them off
   alongside the real one with nothing to tell them apart. */
var DECOYS = L.decoys(RND, 9);

L.W1 = { B: B, PATIENTS: PATIENTS, MAP: MAP, PP: PP, RND: RND, pick: pick, ri: ri,
         ROSA: ROSA, DECOYS: DECOYS };
})();
/* =====================================================================
   WEEK 1, PART B: the study page

   Read this before touching anything else. Short sections, a formula
   wherever there is one, a red word wherever a term might trip you, and
   a prediction to make before each answer shows up.
   ===================================================================== */
(function () {
'use strict';
var L = window.LAB, el = L.el, $ = L.$, fmt = L.fmt, fx = L.fx, frac = L.frac;
var card = L.card, kicker = L.kicker, note = L.note, para = L.para, list = L.list;
var W = L.W1, B = W.B;

/* ---------------------------------------------------------------------
   The oxygen dissociation curve, drawn from the Hill equation so the
   textbook landmarks fall exactly where they should:
   90 percent sits at about 60, and 75 percent at about 40.
   --------------------------------------------------------------------- */
function hill(P, p50) {
  var n = 2.7;
  var a = Math.pow(P, n), b = Math.pow(p50 || 26.6, n);
  return 100 * a / (a + b);
}
function curvePts(p50) {
  var pts = [];
  for (var P = 0; P <= 110; P += 1) pts.push([P, hill(P, p50)]);
  return pts;
}
L.W1.hill = hill;

function curveSVG(opts) {
  opts = opts || {};
  var series = [{ pts: curvePts(26.6), color: L.COLOR.terra, width: 3 }];
  if (opts.shifts) {
    series.push({ pts: curvePts(31.5), color: L.COLOR.goldText, width: 2.2, dash: '7 5' });
    series.push({ pts: curvePts(22.0), color: L.COLOR.teal, width: 2.2, dash: '2 5' });
  }
  return L.xy({
    h: 430,
    x: { min: 0, max: 110, label: 'Oxygen pressure in the blood, PO2 (mmHg)', ticks: [0, 20, 40, 60, 80, 100] },
    y: { min: 0, max: 100, label: 'Hemoglobin saturation (%)', ticks: [0, 20, 40, 60, 80, 100] },
    bands: opts.cliff ? [{ x: [0, 60], fill: 'rgba(115,23,23,.07)' }] : [],
    guides: opts.marks ? [{ y: 90, label: '90%', color: L.COLOR.muted }] : [],
    series: series,
    marks: opts.marks ? [
      { x: 100, y: 97.3, label: 'Arterial, 97%', dx: -10, dy: -14, anchor: 'end', color: L.COLOR.navy },
      { x: 60, y: 90.0, label: 'The knee, 90%', dx: 10, dy: 16, color: L.COLOR.terra },
      { x: 40, y: 75.1, label: 'Venous, 75%', dx: 12, dy: 8, color: L.COLOR.teal }
    ] : [],
    aria: opts.aria || 'The oxygen dissociation curve. Saturation rises steeply between an oxygen pressure of 10 and 60, then flattens almost level from 60 up to 100. Arterial blood sits at a pressure near 100 and a saturation near 97 percent. Venous blood sits at a pressure near 40 and a saturation near 75 percent.'
  });
}
L.W1.curveSVG = curveSVG;

/* ---------------------------------------------------------------------
   Study page scaffolding
   --------------------------------------------------------------------- */
var SECTIONS = [];
function sec(id, title, kids) {
  SECTIONS.push({ id: id, title: title });
  return el('section', { class: 'study-sec', id: 'sec-' + id }, [el('h2', { text: title })].concat(kids));
}
function check(cfg) {
  cfg.bucket = B.study;
  return el('div', { class: 'card check' }, [
    el('span', { class: 'stepnum alt', text: 'Check yourself' }),
    L.mcq(cfg)
  ]);
}
function pc(cfg) { cfg.bucket = B.study; return L.predictCheck(cfg); }

function learnPanel() {
  var root = $('#learn-root');
  root.innerHTML = '';
  var body = el('div');

  root.appendChild(el('div', { class: 'panel-intro' }, [
    el('h2', { text: 'Read this first' }),
    el('p', { html: 'This week is about one idea. The body picks a number it wants to hold steady, then builds machinery to hold it there. Once you can find that machinery, every chapter after this one gets easier, because they are all the same shape.' }),
    note('Nothing here is graded on being right. Make a prediction, then check it. Everything you answer lands on your results page.')
  ]));

  /* ============================== 1 */
  body.appendChild(sec('loop', 'Every loop has the same four parts', [
    para('Pick anything your body holds steady. Temperature. Blood pressure. Blood sugar. Every one of them is run by the same four pieces.'),
    el('div', { class: 'grid g2' }, [
      L.surface([
        el('h3', { text: 'The four parts' }),
        list([
          '<b>Regulated variable.</b> The one number being defended. Not the sensor, not the response, the number itself.',
          '<b><t>Sensor</t>.</b> Measures it. Only reports. Never fixes anything.',
          '<b><t>Integrator</t>.</b> Compares the reading against the <t>set point</t> and decides what to do. Usually the brain.',
          '<b><t>Effector</t>.</b> Actually does something. A muscle, a gland, a blood vessel.'
        ])
      ]),
      L.surface([
        el('h3', { text: 'The same four, in your house' }),
        list([
          '<b>Regulated variable.</b> Room temperature.',
          '<b>Sensor.</b> The little thermometer inside the thermostat.',
          '<b>Integrator.</b> The thermostat, comparing what it reads against what you set.',
          '<b>Effector.</b> The furnace. It is the only part that changes anything.'
        ]),
        note('The furnace does not know what temperature the room is. It only knows the thermostat told it to run. That split matters more than it looks.')
      ])
    ]),
    L.eli([
      'Think of a car with a driver and a passenger who is watching the speedometer.',
      'The speedometer is the sensor. It reads 80 and says so. It cannot slow the car down.',
      'The passenger is the integrator. They know the limit is 65, they compare, they say "slow down".',
      'The driver\'s foot is the effector. It is the only part that actually changes the speed.',
      'The speed itself is the regulated variable. That is the thing everyone is fussing about.'
    ]),
    pc({
      predict: 'A patient gets too cold. Before you read on, decide which of the four parts shivering is.',
      stem: 'Shivering is which part of the temperature loop?',
      options: [
        'The sensor, because you feel cold when you shiver',
        'The integrator, because the body has decided to warm up',
        'The effector, because muscle contraction is what actually makes heat',
        'The regulated variable, because temperature is what is changing'
      ],
      correct: 2,
      explain: 'Shivering is muscle doing work, and the waste heat from that work is the point. Feeling cold is the sensor reporting. Deciding to shiver happens in the hypothalamus, the integrator. Temperature itself is the regulated variable. Only muscle changes anything, so muscle is the effector.'
    })
  ]));

  /* ============================== 2 */
  body.appendChild(sec('negative', 'Negative feedback is not a bad thing', [
    para('<t>Negative feedback</t> does not mean bad news. It means the response pushes in the <b>opposite</b> direction to the change.'),
    list([
      'Temperature goes up, the body sweats, temperature comes back down.',
      'Blood pressure goes down, vessels tighten, pressure comes back up.',
      'Blood sugar goes up, insulin comes out, sugar comes back down.'
    ]),
    para('That opposite push is what makes something stable. Nearly every loop in this course works this way.'),
    para('<t>Positive feedback</t> pushes in the <b>same</b> direction, so it snowballs. It is rare, and it always needs an outside event to stop it. Labor is the standard example: contractions push the baby down, which stretches the cervix, which causes stronger contractions, which pushes the baby further. It only ends when the baby is born.'),
    check({
      stem: 'Blood clotting: each activated clotting factor activates more of the next one, faster and faster, until the clot is formed. Which kind of loop is that?',
      options: ['Negative feedback', 'Positive feedback', 'Neither, there is no set point'],
      correct: 1,
      explain: 'Each step makes the next step bigger, which is the definition of positive feedback. Like negative feedback it is doing something useful, and like all positive feedback it needs an event, the finished clot, to shut it off.'
    })
  ]));

  /* ============================== 3 */
  body.appendChild(sec('bp', 'What the two blood pressure numbers actually are', [
    para('A cuff reading is two pressures from the same artery at two moments in the beat.'),
    list([
      '<b><t>Systolic</t>,</b> the top number. The peak, while the heart is squeezing blood out.',
      '<b><t>Diastolic</t>,</b> the bottom number. The lowest point, while the heart is refilling.'
    ]),
    para('Here is the part most people miss. Your heart spends far more of each beat filling than ejecting. At a resting heart rate it is roughly two thirds filling, one third ejecting.'),
    para('So the average pressure over a whole beat is <b>not</b> halfway between the two numbers. It sits much closer to the diastolic end.'),
    fx('MAP &nbsp;=&nbsp; DBP &nbsp;+&nbsp; ' + frac('SBP &minus; DBP', '3'),
      'The average pressure across one whole cardiac cycle. This is the number your organs actually feel.',
      [['MAP', 'mean arterial pressure'], ['SBP', 'systolic, the peak'], ['DBP', 'diastolic, the trough']],
      ['Start at the bottom number, then add back a third of the gap between the two.',
       'You start at diastolic because that is where the heart spends most of its time.',
       'Example. 120 over 90. The gap is 30. A third of 30 is 10. So MAP is 90 plus 10, which is 100.',
       'Below about 60 to 65, organs stop being able to protect their own blood flow. That number is worth remembering.']),
    fx('PP &nbsp;=&nbsp; SBP &minus; DBP',
      'The size of the pressure swing that one <t>stroke volume</t> makes.',
      [['PP', 'pulse pressure'], ['SBP', 'systolic'], ['DBP', 'diastolic']],
      ['Just the gap between the two numbers.',
       'Two things make that gap wide. A big beat, or stiff pipes that cannot absorb the push.',
       'In an older person a wide gap almost always means stiff arteries, not a strong heart. Their aorta has lost its stretch, so the whole push arrives at once instead of being cushioned.']),
    pc({
      predict: 'Two patients. One is 120 over 80. The other is 150 over 65. Before you calculate, guess which one has the higher mean arterial pressure.',
      stem: 'Work both out. Which patient has the higher MAP?',
      options: [
        '120 over 80, at a MAP near 93',
        '150 over 65, at a MAP near 93',
        'They come out almost the same',
        '150 over 65, at a MAP near 108'
      ],
      correct: 2,
      explain: '120 over 80 gives 80 plus 40 divided by 3, which is 93. 150 over 65 gives 65 plus 85 divided by 3, which is also 93. Identical mean pressures, completely different pulse pressures: 40 against 85. The second patient has stiff arteries. This is exactly why the top number on its own tells you so little.'
    })
  ]));

  /* ============================== 4 */
  body.appendChild(sec('why-map', 'Why MAP is the number the body defends', [
    para('Organs do not care about your peak pressure. They care about the pressure that is there on average, pushing blood through them, all cycle long. That is MAP.'),
    para('Most organs can protect themselves inside a range. Brain and kidney can widen or narrow their own vessels to hold their blood flow steady even as pressure moves. That trick is called <t>autoregulation</t>.'),
    para('But it has a floor. Below a MAP of roughly 60 to 65 the vessels are already as wide as they go. There is nothing left to adjust, so flow simply follows pressure down.'),
    L.surface([
      el('h3', { text: 'Why 65 keeps showing up in hospitals' }),
      para('You will see MAP 65 written as a target on sepsis orders, in the operating room and in intensive care. It is not a magic number. It is roughly where <t>autoregulation</t> runs out of room, so anything below it means organs are being underfed.', 'note')
    ]),
    L.eli([
      'Imagine watering a garden with a hose that has a kink in it.',
      'If the water pressure drops a bit, you can straighten the kink and still get the same flow out of the end. That is autoregulation.',
      'But once the kink is completely straight, there is nothing left to fix. Any further drop in pressure and the water coming out just gets weaker.',
      'A MAP of 65 is roughly where the kink is already straight.'
    ]),
    check({
      stem: 'A patient in the emergency department reads 88 over 54. Which statement is the most useful?',
      options: [
        'The systolic is under 90, so this is shock',
        'MAP is about 65, right at the floor where organs stop being able to protect their own blood flow',
        'The diastolic is normal, so there is nothing to act on',
        'Pulse pressure is 34, which is the number to treat'
      ],
      correct: 1,
      explain: 'MAP is 54 plus 34 divided by 3, so about 65. Sitting right on the autoregulation floor is a far more useful statement than any single cuff number, because it tells you what the kidneys and the brain are experiencing.'
    })
  ]));

  /* ============================== 5 */
  body.appendChild(sec('standing', 'What happens the moment you stand up', [
    para('Stand up quickly and gravity pulls 500 to 800 mL of blood down into your legs. That is most of a large soda bottle, and it happens in about one second.'),
    para('Less blood comes back to the heart, so each beat is smaller, so pressure at the top of your body starts to fall. If nothing corrected it, you would faint every time you got off the couch.'),
    el('div', { class: 'grid g2' }, [
      L.surface([
        el('h3', { text: 'The loop that saves you' }),
        list([
          '<b>Sensor.</b> <t>Baroreceptor</t> stretch sensors in the carotid arteries and the aortic arch.',
          '<b>Integrator.</b> The medulla, in the brainstem.',
          '<b>Effector.</b> Heart rate, force of contraction, and the tightness of the arteries and veins.'
        ], false)
      ]),
      L.surface([
        el('h3', { text: 'What you should see' }),
        list([
          'Heart rate up, usually 10 to 20 beats.',
          'Vessels tighten, so diastolic actually rises a little.',
          'Systolic dips a few points, then recovers within about 30 seconds.'
        ], false)
      ])
    ]),
    para('Turn it around: less stretch on the sensor means <b>fewer</b> signals firing up to the brain. The brainstem reads that quiet as low pressure and pushes back with <t>sympathetic</t> output. Stretch sensors that go quiet are one of the few places where less signal means more response.'),
    para('When that loop is blunted, by medication, by age, by dehydration or by nerve damage, pressure falls and does not come back. The clinical name is <t>orthostatic hypotension</t>, and the usual line is a fall of 20 in systolic or 10 in diastolic within three minutes of standing.'),
    pc({
      predict: 'An older patient on a beta blocker stands up and their blood pressure drops. Predict what their heart rate does.',
      stem: 'What is the tell that the effector limb is blocked rather than the sensor?',
      options: [
        'Heart rate rises by 25 beats, but pressure still falls',
        'Heart rate barely moves while pressure falls, because the medication is blocking the heart\'s response',
        'Heart rate falls and pressure rises',
        'Heart rate and pressure both rise'
      ],
      correct: 1,
      explain: 'A beta blocker sits on the effector end. The sensors detect the fall and the brainstem sends the order, but the heart cannot answer it. A flat heart rate during a real pressure drop is the signature. Compare that with dehydration, where the reflex works perfectly, the heart rate climbs hard, and pressure still falls because there was not enough volume to work with.'
    })
  ]));

  /* ============================== 6 */
  body.appendChild(sec('curve', 'The oxygen curve, and why its shape matters', [
    para('A <t>pulse oximeter</t> gives you <t>saturation</t>, the percentage of oxygen seats on <t>hemoglobin</t> that are filled. It never tells you the oxygen <t>partial pressure</t> directly.'),
    para('Those two things are related, but not in a straight line. Plot one against the other and you get an S.'),
    el('figure', { class: 'fig' }, [
      el('div', { html: curveSVG({ marks: true }) }),
      el('figcaption', { html: 'Saturation against oxygen pressure. Three landmarks worth knowing by heart: pressure 100 gives 97 percent, pressure 60 gives 90 percent, pressure 40 gives 75 percent.' })
    ]),
    el('div', { class: 'grid g2', style: 'margin-top:16px' }, [
      L.surface([
        el('h3', { text: 'The flat top' }),
        para('From a pressure of 60 up to 100, saturation barely moves. That is a safety margin. Someone can lose a third of their oxygen pressure and still read 90 percent on the finger clip.', 'note'),
        para('It also means a saturation of 96 percent is hiding a wide range of real oxygen pressures.', 'note')
      ]),
      L.surface([
        el('h3', { text: 'The steep middle' }),
        para('Below about 60, small further drops in pressure knock saturation down fast. This is why a patient can sit at 92 percent looking stable and then fall off a cliff.', 'note'),
        para('The steepness is useful at the tissue, where oxygen needs to come off hemoglobin easily.', 'note')
      ])
    ]),
    L.eli([
      'Think of hemoglobin as a bus with four seats and oxygen as passengers.',
      'When the bus is nearly full, adding more people waiting at the stop hardly changes anything. There is almost nowhere left to sit. That is the flat top.',
      'When the bus is half empty, a few more people waiting fills seats fast. That is the steep middle.',
      'The pulse oximeter counts how full the seats are. It does not count how many people are waiting at the stop. Two very different questions.'
    ]),
    pc({
      predict: 'A patient\'s oxygen pressure falls from 100 to 65. Predict what happens to the number on the finger clip.',
      stem: 'What does the oximeter show?',
      options: [
        'It falls from 97 to about 65 percent',
        'It falls from 97 to about 91 percent, a change of six points',
        'It does not move at all',
        'It falls below 80 percent'
      ],
      correct: 1,
      explain: 'A 35 point fall in pressure, more than a third of it gone, costs about six points of saturation. That is the flat top doing its job, and it is also why the finger clip can look reassuring while something real is happening. The next 20 points of pressure would cost far more.'
    })
  ]));

  /* ============================== 7 */
  body.appendChild(sec('shift', 'The curve slides, and it slides on purpose', [
    para('The whole curve can slide left or right. Sliding is measured at the <t>p50</t>, the pressure where hemoglobin is exactly half loaded. Normally that is about 27.'),
    el('figure', { class: 'fig' }, [
      el('div', { html: curveSVG({ shifts: true }) }),
      el('figcaption', { html: 'Solid line, normal. Dashed line to the right, a right shift. Dotted line to the left, a left shift.' })
    ]),
    el('div', { class: 'grid g2', style: 'margin-top:16px' }, [
      L.surface([
        el('h3', { text: 'Right shift, oxygen comes off more easily' }),
        list(['Warmer', 'More acidic, so a lower pH', 'More carbon dioxide', 'More 2,3-BPG'], false),
        note('Every one of those describes hard working muscle. The muscle changes its own local conditions, and the blood arriving there hands over more oxygen. Nobody had to send a signal.')
      ]),
      L.surface([
        el('h3', { text: 'Left shift, oxygen is held more tightly' }),
        list(['Colder', 'More alkaline, so a higher pH', 'Less carbon dioxide', 'Fetal hemoglobin'], false),
        note('Fetal hemoglobin sits left of the mother\'s on purpose. It has to pull oxygen away from her blood across the placenta, and holding on more tightly is how it wins that tug of war.')
      ])
    ]),
    check({
      stem: 'A runner\'s quadriceps are hot, acidic and full of carbon dioxide. What does that do to oxygen delivery in that muscle?',
      options: [
        'A left shift, so less oxygen is released',
        'A right shift, so more oxygen is released exactly where it is needed',
        'Nothing, the curve is fixed',
        'A right shift, which is harmful and must be corrected'
      ],
      correct: 1,
      explain: 'The muscle makes its own conditions, and those conditions loosen hemoglobin\'s grip right there in that capillary bed. Blood passing through cold, quiet tissue keeps hold of its oxygen instead. It is local, automatic, and beautifully efficient.'
    })
  ]));

  /* ============================== 8 */
  body.appendChild(sec('traps', 'Three traps the finger clip sets', [
    el('div', { class: 'grid g3' }, [
      L.surface([
        el('h3', { text: '1. Anemia' }),
        para('Saturation is a percentage of seats filled. It says nothing about how many seats there are. Someone with half the normal <t>hemoglobin</t> can read a perfect 100 percent while carrying half the oxygen.', 'note')
      ]),
      L.surface([
        el('h3', { text: '2. Carbon monoxide' }),
        para('Carbon monoxide sits in the oxygen seats and the standard clip cannot tell the difference. The reading can be 99 percent in someone who is being starved of oxygen.', 'note')
      ]),
      L.surface([
        el('h3', { text: '3. Poor <t>perfusion</t>' }),
        para('The clip needs a pulse to read. Cold fingers, shock and vessels clamped down all make the number unreliable exactly when you need it most.', 'note')
      ])
    ]),
    para('One sentence to carry out of this section. <b>Saturation is a percentage, not an amount.</b>'),
    check({
      stem: 'A patient rescued from a house fire is alert, and the pulse oximeter reads 99 percent. What is the problem with trusting that number?',
      options: [
        'Nothing, 99 percent is reassuring',
        'The clip cannot tell carbon monoxide from oxygen, so the seats can be full of the wrong gas',
        'The clip only works on the left hand',
        'It should be re-checked in an hour'
      ],
      correct: 1,
      explain: 'Carbon monoxide binds those same sites and binds them hard, and a standard two wavelength oximeter reads it as if it were oxygen. This is one of the few settings where a normal saturation is actively misleading, and it is why smoke exposure gets a blood test rather than a finger clip.'
    })
  ]));

  /* ============================== 9 */
  body.appendChild(sec('week', 'What you are about to do', [
    el('ul', { class: 'objlist' }, [
      'Build all three control loops by dragging each part into place. Temperature, blood pressure, breathing.',
      'Work your own set of twelve patients. The monitor gives you the cuff reading, you calculate the two numbers it did not.',
      'Take one low patient through a decision chart, the way an algorithm card works on a hospital wall.',
      'Run the standing challenge twice, once on a normal reflex and once on a blunted one.',
      'Read the oxygen curve, then answer the four questions every chart in this course gets asked.'
    ].map(function (t, i) {
      return el('li', null, [el('span', { class: 'n', text: String(i + 1) }), el('span', { html: t })]);
    })),
    note('Your twelve patients are seeded from a dataset number that is yours alone, so nobody else has your set of numbers. That number prints on your submitted PDF.'),
    el('div', { class: 'btnrow' }, [
      el('button', { class: 'btn', type: 'button', text: 'Start the loop lab', onclick: function () { L.showTab('loops', true); } })
    ])
  ]));

  /* contents list, built from the sections that were just created */
  var toc = el('nav', { class: 'card', 'aria-label': 'On this page' }, [
    kicker('On this page'),
    el('ol', { class: 'toc' }, SECTIONS.map(function (s) {
      return el('li', null, el('a', {
        href: '#sec-' + s.id, text: s.title,
        onclick: function (e) {
          e.preventDefault();
          var t = $('#sec-' + s.id);
          t.scrollIntoView({ behavior: 'smooth', block: 'start' });
          t.setAttribute('tabindex', '-1');
          t.focus({ preventScroll: true });
        }
      }));
    }))
  ]);
  root.appendChild(toc);
  root.appendChild(body);
  L.wireTerms(root);
}
L.W1.learnPanel = learnPanel;
})();
/* =====================================================================
   WEEK 1, PART C: the loop lab

   Three control loops, built by hand. Temperature first, because it is
   the cleanest one in the body, then blood pressure, then breathing.
   Drag a part into a box, or click, or use the keyboard. All three work.
   ===================================================================== */
(function () {
'use strict';
var L = window.LAB, el = L.el, $ = L.$;
var card = L.card, kicker = L.kicker, note = L.note, para = L.para, list = L.list;
var W = L.W1, B = W.B;

var ROLES = [
  { key: 'var', role: 'Regulated variable', prompt: 'The one number being defended.' },
  { key: 'sen', role: 'Sensor', prompt: 'Measures it and reports. Changes nothing.' },
  { key: 'int', role: 'Integrator', prompt: 'Compares against the set point and decides.' },
  { key: 'eff', role: 'Effector', prompt: 'Actually does something about it.' }
];

var LOOPS = [
  {
    id: 'temp',
    name: 'Core body temperature',
    why: 'Start here. Every part of this loop is something you can point at, which is why it is the first loop anyone should draw.',
    items: [
      { id: 'var', abb: 'Core temperature', name: 'the regulated variable', hint: 'The number itself, not anything that measures or changes it.', why: 'Held near 37 degrees Celsius, deep in the trunk and skull.' },
      { id: 'sen', abb: 'Thermoreceptors', name: 'the sensor', hint: 'Nerve endings in the skin and in the hypothalamus itself.', why: 'Skin endings report the outside world. Hypothalamic ones report the blood washing past.' },
      { id: 'int', abb: 'Hypothalamus', name: 'the integrator', hint: 'The part of the brain holding the set point.', why: 'Compares what it reads against roughly 37 degrees and decides which way to push.' },
      { id: 'eff', abb: 'Sweat glands and shivering muscle', name: 'the effector', hint: 'Two effectors that work in opposite directions.', why: 'Sweat glands dump heat. Shivering muscle makes it. The gap between them is why your temperature barely moves.' }
    ],
    after: 'Two effectors, opposite directions. That is what lets one loop defend a number from both sides.'
  },
  {
    id: 'bp',
    name: 'Blood pressure',
    why: 'Same four parts, and this is the loop the rest of this week is built on.',
    items: [
      { id: 'var', abb: 'Mean arterial pressure', name: 'the regulated variable', hint: 'Not systolic. The average across the whole beat.', why: 'The pressure organs actually feel. This is what the loop is protecting, not the top number.' },
      { id: 'sen', abb: 'Baroreceptors', name: 'the sensor', hint: 'Stretch sensors in the carotid sinus and the aortic arch.', why: 'Higher pressure stretches them more, so they fire more. Less stretch means fewer signals, which the brain reads as low pressure.' },
      { id: 'int', abb: 'Medulla', name: 'the integrator', hint: 'In the brainstem, not the hypothalamus this time.', why: 'The cardiovascular center. It compares the incoming firing rate against what it expects and adjusts the outgoing traffic.' },
      { id: 'eff', abb: 'Heart and blood vessels', name: 'the effector', hint: 'Three levers, not one.', why: 'Heart rate, force of contraction, and the tightness of arteries and veins. Three ways to change pressure.' }
    ],
    after: 'Notice the sensor is a stretch detector. It cannot measure pressure directly, only how far the wall has been pushed out. That distinction matters when arteries get stiff.'
  },
  {
    id: 'br',
    name: 'Breathing',
    why: 'This one surprises people, because the number being defended is not the one you would guess.',
    items: [
      { id: 'var', abb: 'Arterial carbon dioxide', name: 'the regulated variable', hint: 'Not oxygen. Carbon dioxide is regulated first, minute by minute.', why: 'Carbon dioxide is what drives your breathing rate all day. Oxygen only takes over as a backup, once it gets seriously low.' },
      { id: 'sen', abb: 'Central chemoreceptors', name: 'the sensor', hint: 'On the surface of the medulla, reading the fluid around the brain.', why: 'They actually detect the pH change that carbon dioxide causes in the fluid around the brain, which amounts to the same thing.' },
      { id: 'int', abb: 'Respiratory centers in the medulla', name: 'the integrator', hint: 'Brainstem again.', why: 'Sets the rate and depth of every breath, without you thinking about it.' },
      { id: 'eff', abb: 'Diaphragm and intercostals', name: 'the effector', hint: 'The muscles that move air.', why: 'Breathe faster or deeper and you blow off more carbon dioxide. That is the whole correction.' }
    ],
    after: 'Carbon dioxide first, oxygen second. Hold that. It explains a great deal in weeks 12 and 13.'
  }
];

function loopCard(loop, onDone) {
  var boxes = L.dropBoxes(ROLES.map(function (r) {
    return { drop: r.key, role: r.role, prompt: r.prompt };
  }));
  var afterSlot = el('div');

  var m = L.matcher({
    items: loop.items,
    targetsRoot: boxes,
    targetSel: '.dropbox',
    bucket: B.loops,
    placedText: function (item, target) {
      return item.abb + ' is ' + item.name + '. ' + (item.why || '');
    },
    wrongHint: function (itemId, wantId, item) {
      var want = null;
      ROLES.forEach(function (r) { if (r.key === wantId) want = r; });
      return item.abb + ' is ' + item.name + ', and that box is looking for ' + want.role.toLowerCase() + ': ' + want.prompt.toLowerCase();
    },
    doneText: '<strong>Loop complete.</strong> ' + loop.after,
    onComplete: function () {
      afterSlot.appendChild(L.surface([
        el('h4', { text: 'Now say what the effector actually does' }),
        el('p', { class: 'note', style: 'margin-bottom:0', html: loop.after })
      ]));
      onDone();
    }
  });

  return card([
    kicker('Loop ' + (LOOPS.indexOf(loop) + 1) + ' of 3'),
    el('h3', { text: loop.name }),
    para(loop.why),
    m.counter, m.hint, m.bar, m.tray, boxes, m.fb, afterSlot
  ]);
}

function loopsPanel() {
  var root = $('#loops-root');
  root.innerHTML = '';
  var built = 0, conceptDone = false;
  var doneCard = el('div');

  function maybeOpen() {
    if (built < LOOPS.length || !conceptDone || L.gates.loops) return;
    L.openGate('loops');
    doneCard.innerHTML = '';
    doneCard.appendChild(card([
      kicker('Lab complete'),
      el('h3', { text: 'Your patient dataset is open' }),
      para('All three loops are built and the concept check is done, so your twelve patients are unlocked and they stay unlocked.'),
      note('You were not graded on getting every drop right the first time. You were asked to go through it. Everything landed on your results page either way.'),
      el('div', { class: 'btnrow' }, [
        el('button', { class: 'btn', type: 'button', text: 'Go to my patient dataset', onclick: function () { L.showTab('vitals', true); } })
      ])
    ]));
  }

  root.appendChild(el('div', { class: 'panel-intro' }, [
    el('h2', { text: 'Loop lab' }),
    para('Build three control loops, one part at a time. Drag a label into a box, or click a label and then click a box, or tab to a label and press Enter and do the same on a box. Whichever you prefer.'),
    note('Every drop is explained as you make it, right or wrong. Finish all three loops and the concept check, and your patient dataset opens.')
  ]));

  LOOPS.forEach(function (loop) {
    root.appendChild(loopCard(loop, function () { built++; maybeOpen(); }));
  });

  root.appendChild(card([
    kicker('Concept check'),
    el('h3', { text: 'One question before you move on' }),
    L.mcq({
      stem: 'You have now built three loops. In all three, which part is the only one that changes anything in the body?',
      options: [
        'The sensor, because nothing happens until something is detected',
        'The integrator, because it makes the decision',
        'The effector, because it is the only part that acts on the body',
        'The regulated variable, because it is what moves'
      ],
      correct: 2,
      explain: 'Sensors report. Integrators decide. Only effectors act. When you are asked later why a patient is not correcting a problem, the useful question is always which of those three limbs has failed, and the answer is very often the effector, because that is where most medications work.',
      bucket: B.loops,
      onAnswer: function () { conceptDone = true; maybeOpen(); }
    })
  ]));

  root.appendChild(doneCard);
  L.wireTerms(root);
}
L.W1.loopsPanel = loopsPanel;
})();
/* =====================================================================
   WEEK 1, PART D: the vitals dataset and the hypotension chart

   Twelve patients, seeded so every student has their own set. The
   monitor hands over the cuff reading. The two numbers that matter are
   the two it does not give you.

   Task two runs the arithmetic backwards, from mean and pulse pressure
   to the cuff reading, because working a formula in reverse is where
   plugging numbers in stops being enough.
   ===================================================================== */
(function () {
'use strict';
var L = window.LAB, el = L.el, $ = L.$, fmt = L.fmt, frac = L.frac;
var card = L.card, kicker = L.kicker, note = L.note, para = L.para, list = L.list;
var W = L.W1, B = W.B, P = W.PATIENTS, MAP = W.MAP, PP = W.PP;

/* ---------------------------------------------------------------------
   The decision chart. It reads the student's own patient, so the branch
   that is correct depends on the numbers they were dealt.
   --------------------------------------------------------------------- */
var HYPO_CHART = {
  start: 'map',
  nodes: {
    map: {
      q: 'Start where every chart starts. Is the mean arterial pressure at or above 65?',
      hint: function (p) {
        return 'This patient reads <strong>' + p.sbp + ' over ' + p.dbp + '</strong>, so a mean arterial pressure of <strong>' +
          fmt(MAP(p), 0) + '</strong>. Work it out yourself before you click, do not just read it off.';
      },
      opts: [
        { key: 'yes', tag: 'At or above 65', label: 'Organs can still protect their own blood flow, so watch and reassess' },
        { key: 'no', tag: 'Below 65', label: 'Below the floor, so keep going down the chart' }
      ],
      answer: function (p) { return MAP(p) < 65 ? 'no' : 'yes'; },
      explain: function (p) {
        return 'Mean arterial pressure is ' + fmt(MAP(p), 0) + '. ' +
          (MAP(p) < 65
            ? 'Below 65 means <t>autoregulation</t> has run out of room, so the kidneys and the brain are now taking whatever pressure they are given. That is why this box comes first.'
            : 'At or above 65 the organs still have room to adjust their own vessels, so the next move is to keep watching rather than to treat a number.');
      },
      next: { yes: 'watch', no: 'pp' }
    },
    watch: {
      terminal: true,
      result: 'Reassess, do not treat a single reading',
      detail: 'A mean pressure at or above 65 with no other worrying sign does not need chasing. Recheck, look at the trend, and look at the patient rather than the monitor.'
    },
    pp: {
      q: 'Now look at the pulse pressure. Is it narrow or wide?',
      hint: function (p) {
        return 'Pulse pressure here is <strong>' + PP(p) + '</strong>, against a systolic of ' + p.sbp +
          '. A useful line: narrow is under about a quarter of the systolic, wide is well over a third. This one works out at <strong>' +
          Math.round(100 * PP(p) / p.sbp) + ' percent</strong> of the systolic.';
      },
      opts: [
        { key: 'narrow', tag: 'Narrow', label: 'A small swing, so each beat is moving very little blood' },
        { key: 'wide', tag: 'Wide', label: 'A big swing with a very low diastolic, so the vessels are wide open' }
      ],
      answer: function (p) { return (PP(p) / p.sbp) < 0.30 ? 'narrow' : 'wide'; },
      explain: function (p) {
        return (PP(p) / p.sbp) < 0.30
          ? 'A narrow swing means the <t>stroke volume</t> is small. Either the tank is empty or the pump is weak. That is the fork the next box takes.'
          : 'A wide swing on top of a very low diastolic is the signature of vessels that have lost their tone. The pump may be working hard, but the pipes are not holding pressure.';
      },
      next: { narrow: 'hr', wide: 'warm' }
    },
    hr: {
      q: 'Small beats. Is the heart rate compensating?',
      hint: function (p) { return 'Heart rate here is <strong>' + p.hr + '</strong> per minute.'; },
      opts: [
        { key: 'fast', tag: 'Fast', label: 'The heart is beating hard and fast to make up for small beats' },
        { key: 'notfast', tag: 'Not fast', label: 'The rate is normal or low, so the reflex is not answering' }
      ],
      answer: function (p) { return p.hr >= 100 ? 'fast' : 'notfast'; },
      explain: function (p) {
        return p.hr >= 100
          ? 'A fast rate with small beats is the <t>baroreceptor</t> reflex working exactly as designed. The loop is intact. What is missing is volume for it to work with.'
          : 'Small beats and a rate that is not climbing means the reflex is being blocked, either by a medication sitting on the effector or by the pump itself failing.';
      },
      next: { fast: 'hypovol', notfast: 'pump' }
    },
    warm: {
      q: 'Wide swing, low diastolic. What has changed in the circulation?',
      hint: 'Think about which part of the loop has failed. The pump, the volume in it, or the pipes.',
      opts: [
        { key: 'pipes', tag: 'The pipes', label: 'The vessels have lost their tone, so pressure leaks away between beats' },
        { key: 'pump', tag: 'The pump', label: 'The heart has become too weak to generate pressure' }
      ],
      answer: 'pipes',
      explain: function (ctx, chosen) {
        return chosen === 'pump'
          ? 'A failing pump gives you a <b>narrow</b> pulse pressure, because each beat is small. This patient has a big swing, so the beats are not the problem.'
          : 'Diastolic pressure is held up by vessel tone between beats. When tone collapses, the diastolic falls away, the swing widens, and mean pressure drops even though each beat is a decent size.';
      },
      next: { pipes: 'distributive', pump: 'pump' }
    },
    hypovol: {
      terminal: true,
      result: 'The tank is low. Think volume.',
      detail: 'Small beats, a fast rate and a narrow pulse pressure is the classic picture of not enough circulating volume, from bleeding, vomiting, diarrhea or burns. The reflex is working. Give it something to pump. In week 12 you will meet the same patient again from the fluid and electrolyte side.'
    },
    pump: {
      terminal: true,
      result: 'The pump or the reflex is the problem, not the volume',
      detail: 'Small beats with a rate that will not rise means either the heart cannot generate a decent stroke volume, or something is blocking the effector limb of the reflex, most often a beta blocker. Pouring in fluid does not fix either one, and can make the first one worse. Week 10 takes this apart properly.'
    },
    distributive: {
      terminal: true,
      result: 'The pipes have opened up. Think tone.',
      detail: 'A wide pulse pressure with a very low diastolic and a fast rate is the picture of vessels that have lost their tone, most commonly in sepsis or anaphylaxis. Fluid helps at first because the container just got bigger, but the real problem is the container, and that is why these patients often end up needing a drug that tightens vessels.'
    }
  }
};

function vitalsPanel() {
  var root = $('#vitals-root');
  root.innerHTML = '';
  var tableDone = false, chartDone = false;
  var doneCard = el('div');

  function maybeOpen() {
    if (!tableDone || !chartDone || L.gates.vitals) return;
    L.openGate('vitals');
    doneCard.innerHTML = '';
    doneCard.appendChild(card([
      kicker('Dataset complete'),
      el('h3', { text: 'The rest of the lab is open' }),
      para('You have worked your twelve patients and followed one of them down the chart. The standing challenge, the oxygen curve, the test and your results page are all unlocked.'),
      el('div', { class: 'btnrow' }, [
        el('button', { class: 'btn', type: 'button', text: 'Go to the standing challenge', onclick: function () { L.showTab('posture', true); } }),
        el('button', { class: 'btn sec', type: 'button', text: 'Go to the oxygen curve', onclick: function () { L.showTab('curve', true); } })
      ])
    ]));
  }

  root.appendChild(el('div', { class: 'panel-intro' }, [
    el('h2', { text: 'Your twelve patients' }),
    para('Two tasks. Work out the two numbers the monitor did not give you for all twelve patients, then take your lowest patient down a decision chart.'),
    note('This dataset is seeded from your own number, so nobody else has these twelve readings. Write the number down, it goes on your submitted PDF.')
  ]));

  root.appendChild(el('div', { class: 'caseline' }, [
    el('span', { class: 'cl-k', text: 'Your dataset' }),
    el('span', { class: 'cl-v', text: L.caseNumber }),
    el('span', { class: 'cl-k', text: 'Patients' }),
    el('span', { class: 'cl-v', text: '12' }),
    el('span', { class: 'cl-k', text: 'Columns to calculate' }),
    el('span', { class: 'cl-v', text: 'MAP and pulse pressure' })
  ]));

  /* ---- Task one: the two columns the monitor never shows ---- */
  var t1 = L.calcTable({
    id: 't1',
    labelKey: 'id',
    caption: 'Vital signs, twelve patients. The two right hand columns are yours to work out.',
    intro: 'The monitor gives you a cuff reading and a heart rate. It does not give you mean arterial pressure or pulse pressure, and those are the two numbers that actually tell you what is happening. Work all twelve by hand, then check.',
    legend: 'Round mean arterial pressure to the nearest whole number. Anything within a point of the answer counts.',
    cols: [
      { key: 'id', label: 'Patient', text: true },
      { key: 'story', label: 'Situation', text: true },
      { key: 'age', label: 'Age', dp: 0 },
      { key: 'hr', label: 'Heart rate', unit: 'per min', dp: 0 },
      { key: 'sbp', label: 'Systolic', unit: 'mmHg', dp: 0 },
      { key: 'dbp', label: 'Diastolic', unit: 'mmHg', dp: 0 },
      { key: 'map', label: 'MAP', unit: 'mmHg', calc: true, dp: 0, tol: 1.2, answer: MAP },
      { key: 'pp', label: 'Pulse pressure', unit: 'mmHg', calc: true, dp: 0, tol: 0.5, answer: PP }
    ],
    rows: P,
    flagCol: 'Under MAP 65',
    flag: function (p) {
      return MAP(p) < 65
        ? { text: 'Yes', cls: 'flag-low' }
        : { text: 'No', cls: 'flag-ok' };
    },
    bucket: B.vitals,
    wrongHint: 'Remember mean arterial pressure starts at the <b>diastolic</b> and adds back a third of the gap. Starting halfway between the two numbers is the usual slip.',
    doneHint: 'All twenty four values check out. Now look down the flag column and find the patients who are under 65.',
    onComplete: function () { tableDone = true; maybeOpen(); }
  });

  root.appendChild(card([
    kicker('Task one'),
    el('h3', { text: 'Fill in what the monitor left out' }),
    L.fx('MAP &nbsp;=&nbsp; DBP &nbsp;+&nbsp; ' + frac('SBP &minus; DBP', '3'), null,
      [['MAP', 'mean arterial pressure'], ['SBP', 'systolic'], ['DBP', 'diastolic']],
      ['Start at the bottom number and add back a third of the gap.',
       '120 over 90: the gap is 30, a third is 10, so 90 plus 10 gives 100.']),
    L.fx('PP &nbsp;=&nbsp; SBP &minus; DBP', null, [['PP', 'pulse pressure']],
      ['Just the gap between the two numbers.']),
    t1
  ]));

  /* ---- Task two: run the formula backwards ---- */
  var back = [
    { id: 'M', story: 'Handover from the ward, cuff reading not recorded', map: 93, pp: 45 },
    { id: 'N', story: 'Arterial line, monitor showing mean and swing only', map: 70, pp: 24 },
    { id: 'O', story: 'Age 79, chart says mean 95 with a wide swing', map: 95, pp: 78 },
    { id: 'P', story: 'Post operative, mean 62 with a narrow swing', map: 62, pp: 21 },
    { id: 'Q', story: 'Athlete, mean 80', map: 80, pp: 48 }
  ];
  function backSBP(r) { return r.map + 2 * r.pp / 3; }
  function backDBP(r) { return r.map - r.pp / 3; }

  var t2 = L.calcTable({
    id: 't2',
    labelKey: 'id',
    caption: 'Five patients where only the mean and the swing were recorded.',
    intro: 'Now the other direction. These charts recorded the mean arterial pressure and the pulse pressure but lost the cuff reading. Rearrange the formula and get the two numbers back.',
    legend: 'Work it on paper first. If you rearrange the MAP formula you will find the diastolic sits a third of the swing below the mean, and the systolic sits two thirds of the swing above it.',
    cols: [
      { key: 'id', label: 'Patient', text: true },
      { key: 'story', label: 'What the chart says', text: true },
      { key: 'map', label: 'MAP', unit: 'mmHg', dp: 0 },
      { key: 'pp', label: 'Pulse pressure', unit: 'mmHg', dp: 0 },
      { key: 'sbp', label: 'Systolic', unit: 'mmHg', calc: true, dp: 0, tol: 1.2, answer: backSBP },
      { key: 'dbp', label: 'Diastolic', unit: 'mmHg', calc: true, dp: 0, tol: 1.2, answer: backDBP }
    ],
    rows: back,
    bucket: B.vitals,
    wrongHint: 'Start from MAP equals DBP plus a third of PP. Move things across and you get DBP equals MAP minus a third of PP. Then systolic is just diastolic plus the whole swing.',
    doneHint: 'That is the same formula worked backwards. Being able to move it around is the difference between knowing it and being able to use it.'
  });

  root.appendChild(card([
    kicker('Task two'),
    el('h3', { text: 'Now run it backwards' }),
    L.fx('DBP &nbsp;=&nbsp; MAP &minus; ' + frac('PP', '3') + ' &nbsp;&nbsp;&nbsp; SBP &nbsp;=&nbsp; DBP &nbsp;+&nbsp; PP', null,
      [['MAP', 'mean arterial pressure'], ['PP', 'pulse pressure'], ['SBP', 'systolic'], ['DBP', 'diastolic']],
      ['The same relationship, just rearranged.',
       'If mean pressure sits a third of the way up from diastolic, then diastolic must sit a third of the swing below the mean.',
       'Once you have the diastolic, add the whole swing to get back to the systolic.']),
    t2
  ]));

  /* ---- Task three: the chart ---- */
  var lowest = P.slice().sort(function (a, b) { return MAP(a) - MAP(b); })[0];
  var chartSlot = el('div');
  chartSlot.appendChild(L.flowchart(HYPO_CHART, lowest, {
    bucket: B.chart,
    onFinish: function () {
      chartSlot.appendChild(L.surface([
        el('h4', { text: 'What you just did' }),
        para('You did not memorize a diagnosis. You asked a question, looked at a number, took a branch, and the chart carried you somewhere. That is exactly how an algorithm card works on a hospital wall, and it is why they can be followed at three in the morning by someone who is tired.', 'note')
      ]));
      chartDone = true;
      maybeOpen();
    }
  }));

  root.appendChild(card([
    kicker('Task three'),
    el('h3', { text: 'Take your lowest patient down the chart' }),
    para('Your lowest mean pressure is <b>patient ' + lowest.id + '</b>: ' + lowest.story.toLowerCase() +
      ', reading ' + lowest.sbp + ' over ' + lowest.dbp + ' with a heart rate of ' + lowest.hr + '.'),
    note('Answer the question in each box, then click the branch you believe is right. A wrong branch gets explained and the chart does not move, so the shape of the chart is what you end up learning.'),
    chartSlot
  ]));

  root.appendChild(doneCard);
  L.wireTerms(root);
}
L.W1.vitalsPanel = vitalsPanel;
})();
/* =====================================================================
   WEEK 1, PART E: Rosa's case

   The walkthrough. Five locked steps carry a student from Rosa's cuff
   reading to the limb of her reflex that failed. Nothing here can be
   short circuited: the box for an answer does not open until the working
   above it is right, and the answer to the question at the end is only
   half the question.

   The simulation underneath it is Rosa's own baseline, so the trace and
   the numbers she was just asked to calculate are the same patient.
   ===================================================================== */
(function () {
'use strict';
var L = window.LAB, el = L.el, $ = L.$, fmt = L.fmt;
var card = L.card, kicker = L.kicker, note = L.note, para = L.para, list = L.list;
var W = L.W1, B = W.B, C = L.COLOR;

var BASE = { sbp: W.ROSA.sbp, dbp: W.ROSA.dbp, hr: W.ROSA.hr };
var T0 = 10, TMAX = 60;

/* The model works on the two numbers the body actually treats separately:
   mean arterial pressure, which the reflex defends, and pulse pressure,
   which follows stroke volume. Systolic and diastolic are then derived
   from those two, which is why the diastolic behaves correctly on its
   own instead of having to be drawn by hand.

   mapDrop is how far the mean falls. ppDrop is how far the swing falls.
   Systolic falls by mapDrop plus two thirds of ppDrop, and diastolic
   falls by mapDrop minus one third of ppDrop, which comes out negative,
   a rise, whenever the reflex is defending the mean successfully. */
var BASE_PP = BASE.sbp - BASE.dbp;
var BASE_MAP = BASE.dbp + BASE_PP / 3;

var RUNS = {
  intact: {
    name: 'Reflex intact',
    who: 'A healthy 24 year old, well hydrated, on no medication.',
    mapNadir: 1, ppNadir: 19.5, recover: 0.88, tau: 6, hrRise: 18, hrFinal: 14,
    read: 'The loop works. The swing narrows, the heart speeds up, vessels tighten, and the mean pressure barely moves at all.',
    limb: 'Nothing is broken. This is the shape every other run gets compared against.'
  },
  beta: {
    name: 'On a beta blocker',
    who: 'Age 71, on metoprolol for atrial fibrillation.',
    mapNadir: 14, ppNadir: 24, recover: 0.33, tau: 15, hrRise: 4, hrFinal: 3,
    read: 'Pressure falls hard and does not come back. Look at the heart rate: it barely moves.',
    limb: 'The <b>effector</b> limb. Sensors detected the fall and the brainstem sent the order, but the heart is chemically blocked from answering it.'
  },
  dry: {
    name: 'Dehydrated',
    who: 'Age 34, two days of vomiting, has not kept fluids down.',
    mapNadir: 15, ppNadir: 27, recover: 0.36, tau: 13, hrRise: 36, hrFinal: 32,
    read: 'The heart rate climbs hard and pressure still falls. The reflex is doing everything right.',
    limb: 'No limb is broken. The loop is intact and working at full effort. There simply is not enough volume for it to work with.'
  },
  auto: {
    name: 'Autonomic failure',
    who: 'Age 68, long standing diabetes with nerve damage.',
    mapNadir: 34, ppNadir: 18, recover: 0.06, tau: 30, hrRise: 2, hrFinal: 2,
    read: 'A free fall with a flat heart rate. Nothing is answering at all.',
    limb: 'The <b>sensor and signaling</b> path. Damaged nerves mean the fall is never properly reported, so no order is ever sent.'
  }
};
/* the headline numbers each run produces, worked out from the model */
Object.keys(RUNS).forEach(function (k) {
  var r = RUNS[k];
  r.nadir = Math.round(r.mapNadir + 2 * r.ppNadir / 3);
  r.final = Math.round(r.nadir * (1 - r.recover));
  r.dbpMove = Math.round(r.mapNadir - r.ppNadir / 3);
});

function state(run, t) {
  if (t < T0) return { map: BASE_MAP, pp: BASE_PP, sbp: BASE.sbp, dbp: BASE.dbp, hr: BASE.hr };
  var u = t - T0;
  var onset = 1 - Math.exp(-u / 1.5);
  var back = run.recover * (1 - Math.exp(-Math.max(0, u - 3) / run.tau));
  var mapD = run.mapNadir * onset * (1 - back);
  var ppD = run.ppNadir * onset * (1 - back);
  var map = BASE_MAP - mapD, pp = BASE_PP - ppD;
  return {
    map: map, pp: pp,
    dbp: map - pp / 3,
    sbp: map + 2 * pp / 3,
    hr: BASE.hr + run.hrRise * onset - (run.hrRise - run.hrFinal) * (1 - Math.exp(-u / 12))
  };
}

function trace(run, key) {
  var pts = [];
  for (var t = 0; t <= TMAX; t += 0.5) pts.push([t, state(run, t)[key]]);
  return pts;
}
function mapAt(run, t) { return state(run, t).map; }

function pressureFig(run) {
  return L.xy({
    h: 380,
    x: { min: 0, max: TMAX, label: 'Seconds. The patient stands at 10 seconds.', ticks: [0, 10, 20, 30, 40, 50, 60] },
    y: { min: 40, max: 140, label: 'Pressure (mmHg)', ticks: [40, 60, 80, 100, 120, 140] },
    bands: [{ x: [0, T0], fill: 'rgba(10,19,34,.05)' }],
    guides: [
      { x: T0, label: 'Stands', color: C.navy },
      { y: 65, label: 'MAP floor, 65', color: C.goldText }
    ],
    series: [
      { pts: trace(run, 'sbp'), color: C.terra, width: 3 },
      { pts: trace(run, 'dbp'), color: C.navy, width: 2.4, dash: '6 4' }
    ],
    aria: 'Blood pressure against time for the ' + run.name.toLowerCase() + ' run. Both pressures are flat while lying down, then the systolic falls by about ' +
      Math.round(run.nadir) + ' points after standing and settles about ' + Math.round(run.final) + ' points below where it started.'
  });
}
function rateFig(run) {
  return L.xy({
    h: 300,
    x: { min: 0, max: TMAX, label: 'Seconds', ticks: [0, 10, 20, 30, 40, 50, 60] },
    y: { min: 40, max: 130, label: 'Heart rate (per min)', ticks: [40, 60, 80, 100, 120] },
    bands: [{ x: [0, T0], fill: 'rgba(10,19,34,.05)' }],
    guides: [{ x: T0, label: 'Stands', color: C.navy }],
    series: [{ pts: trace(run, 'hr'), color: C.teal, width: 3 }],
    aria: 'Heart rate against time for the ' + run.name.toLowerCase() + ' run. It rises by about ' + Math.round(run.hrRise) + ' beats after standing.'
  });
}


/* =====================================================================
   THE WALKTHROUGH
   Five steps. Each one appears only when the step before it is finished,
   so the page is never a wall of tasks, and there is never a later box
   to fill in before the earlier thinking has been done.
   ===================================================================== */
var R = W.ROSA;
var STEP_NAMES = ['Chart her', 'The two numbers', 'Standing up', 'The loop', 'The note'];

/* which run belongs to Rosa, and the healthy reference she is read against */
var HER = R.pres.key;

function casePanel() {
  var root = $('#case-root');
  root.innerHTML = '';
  var rail = L.stepRail(STEP_NAMES);
  var slots = [];
  var done = [false, false, false, false, false];

  root.appendChild(el('div', { class: 'panel-intro' }, [
    el('h2', { text: 'Why did Rosa fall?' }),
    para('Rosa is 71. This morning she stood up from the side of her bed, the room went gray, and she went down. She is back in bed now and her first set of vital signs is below.'),
    para('You are going to work out what her monitor did not tell anyone, watch what happened to her pressure in the seconds after she stood, and name the part of her blood pressure control loop that failed.'),
    note('Five steps, in order. Each one opens when the one before it is right. There is nothing on this page to copy: your reading is yours, and every check is worked out at the moment you press the button.')
  ]));
  root.appendChild(rail.node);

  root.appendChild(el('div', { class: 'caseline' }, [
    el('span', { class: 'cl-k', text: 'Your case' }),
    el('span', { class: 'cl-v', text: L.caseNumber }),
    el('span', { class: 'cl-k', text: 'Patient' }),
    el('span', { class: 'cl-v', text: 'Rosa, 71' }),
    el('span', { class: 'cl-k', text: 'Write this down' }),
    el('span', { class: 'cl-v', text: 'It goes on your PDF' })
  ]));

  for (var i = 0; i < 5; i++) { var s = el('div'); slots.push(s); root.appendChild(s); }
  var endSlot = el('div');
  root.appendChild(endSlot);

  function finish(i) {
    if (done[i]) return;
    done[i] = true;
    rail.mark(i);
    if (i + 1 < 5) {
      BUILD[i + 1](slots[i + 1]);
      L.wireTerms(slots[i + 1]);
      slots[i + 1].scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      buildEnd();
    }
  }

  /* ================================================== STEP 1, her chart */
  /* =========================================== STEP 1, chart her
     The values arrive the way they arrive on a ward: inside a paragraph
     somebody said out loud at seven in the morning. Two of the rows on
     the chart are not in that paragraph at all, and finding nothing is
     a finding a student has to record rather than skip. */
  var CHART = null;

  var VITALS = [
    { key: 'temp',  label: 'Temperature',        unit: 'degrees C', lo: 36.1, hi: 37.8, dp: 1, tol: 0.05,
      value: function (p) { return parseFloat(p.temp); } },
    { key: 'hr',    label: 'Heart rate',          unit: 'per min',   lo: 60,   hi: 100,  dp: 0, tol: 0.5,
      value: function (p) { return p.hr; } },
    { key: 'rr',    label: 'Respiratory rate',    unit: 'per min',   lo: 12,   hi: 20,   dp: 0, tol: 0.5,
      value: function (p) { return p.rr; } },
    { key: 'sbp',   label: 'Systolic pressure',   unit: 'mmHg',      lo: 90,   hi: 130,  dp: 0, tol: 0.5,
      value: function (p) { return p.sbp; } },
    { key: 'dbp',   label: 'Diastolic pressure',  unit: 'mmHg',      lo: 60,   hi: 85,   dp: 0, tol: 0.5,
      value: function (p) { return p.dbp; } },
    { key: 'spo2',  label: 'Oxygen saturation',   unit: 'percent',   lo: 95,   hi: 100,  dp: 0, tol: 0.5,
      value: function (p) { return p.spo2; } },
    { key: 'pain',  label: 'Pain score',          unit: 'out of 10', lo: 0,    hi: 3,    dp: 0, tol: 0.5,
      value: function () { return null; } },
    { key: 'glu',   label: 'Capillary glucose',   unit: 'mmol/L',    lo: 4.0,  hi: 7.8,  dp: 1, tol: 0.05,
      value: function () { return null; } }
  ];

  function handover() {
    var s = [];
    s.push('<p>Rosa is 71. She was admitted two days ago for observation after a fall at home, and she was due to go home today.</p>');
    s.push('<p>At about a quarter past seven she sat on the edge of the bed, stood up, said the room had gone gray, and went down onto the carpet. She did not lose consciousness and there is no head injury. She was helped straight back into bed.</p>');
    s.push('<p>A full set of observations was taken with her lying flat. She was afebrile at ' + R.temp +
           ' degrees. Her pulse was regular at ' + R.hr + '. She was breathing comfortably at ' + R.rr +
           ' a minute and saturating ' + R.spo2 + ' percent on room air. The cuff read ' + R.sbp + ' over ' + R.dbp + '.</p>');
    s.push('<p>' + R.pres.hx + '</p>');
    return s.join('');
  }

  function step1(slot) {
    var chart = L.chartSheet({
      id: 'c1', ctx: R, bucket: B.chart2,
      groups: [
        { title: 'Vital signs', rows: VITALS,
          note: 'These eight rows are on every chart in this course, in this order, every single week. By week four you will not be reading the labels any more.' },
        { title: 'Calculated from the cuff reading', rows: [
          { key: 'map', label: 'Mean arterial pressure', unit: 'mmHg', lo: 65, hi: 100, dp: 1,
            pending: 'you work this out in step 2', value: function (p) { return p.map; } },
          { key: 'pp', label: 'Pulse pressure', unit: 'mmHg', lo: 30, hi: 50, dp: 0,
            pending: 'you work this out in step 2', value: function (p) { return p.pp; } }
        ] }
      ],
      onComplete: function () {
        slot.appendChild(L.card([
          el('h3', { text: 'That is a complete chart' }),
          para('Two of those rows had nothing to put in them, and you said so. That is not a technicality. A blank row cannot be told apart from a row somebody forgot, and the next person to pick up this patient has no way to know which it was. <b>Not measured is a finding.</b> It gets recorded like any other.'),
          para('Whether either of those gaps actually matters for Rosa is a different question, and you will answer it in step five.', 'note'),
          el('div', { class: 'btnrow' }, [
            el('button', {
              class: 'btn cta', type: 'button',
              onclick: function (e) { e.currentTarget.classList.add('spent'); e.currentTarget.disabled = true; finish(0); }
            }, [el('span', { text: 'Work her numbers' }), el('span', { class: 'arw', 'aria-hidden': 'true', text: '\u2192' })])
          ])
        ]));
        slot.lastChild.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
    CHART = chart;

    slot.appendChild(L.card([
      L.kicker('Step one'),
      el('h3', { text: 'Take the handover, then chart it' }),
      para('This is what you would actually be given: a person talking, at speed, at the end of their shift. Read it, then put every value where it belongs.'),
      el('div', { class: 'handover' }, [
        el('span', { class: 'hv-k', text: 'Night staff handover, 07:15' }),
        el('div', { html: handover() })
      ]),
      chart.node
    ]));
  }

  /* ============================= STEP 2, the numbers nobody gave anyone */
  function step2(slot) {
    slot.appendChild(L.card([
      L.kicker('Step two'),
      L.workedSteps({
        id: 's2',
        title: 'Work out the two numbers her monitor never showed',
        ctx: R,
        bucket: B.rosa,
        intro: 'Rosa reads <b>' + R.sbp + ' over ' + R.dbp + '</b>. Two numbers come out of that reading and both of them matter: the <t>pulse pressure</t>, which is how big each beat is, and the <t>mean arterial pressure</t>, which is what her organs feel.',
        legend: 'Work them on paper first. Round to one decimal place where a step does not come out whole. Anything within half a point counts.',
        steps: [
          {
            label: 'Pulse pressure, the gap between her two numbers',
            prompt: 'Systolic minus diastolic.',
            unit: 'mmHg', dp: 0, tol: 0.5,
            answer: function (p) { return p.sbp - p.dbp; },
            after: 'That is the size of the pressure swing one beat makes.',
            traps: [
              { val: function (p) { return p.sbp + p.dbp; },
                say: 'You added them. The pulse pressure is the distance between the two numbers, so it is a subtraction.' },
              { val: function (p) { return p.dbp - p.sbp; },
                say: 'That is the right subtraction the wrong way round. Take the smaller number away from the larger one.' },
              { val: function (p) { return (p.sbp - p.dbp) / 2; },
                say: 'You halved it. The pulse pressure is the whole gap, not half of it.' }
            ],
            miss: 'Take one of her two pressures away from the other.',
            method: 'Pulse pressure is systolic minus diastolic. Nothing else happens to it. Write her two numbers down and subtract the bottom from the top.'
          },
          {
            label: 'One third of that gap',
            prompt: 'Divide what you just found by three. This is the piece of the formula people skip, and skipping it is what makes the answer wrong.',
            unit: 'mmHg', dp: 1, tol: 0.5,
            answer: function (p) { return (p.sbp - p.dbp) / 3; },
            after: 'A third, because her heart spends roughly two thirds of every beat filling rather than ejecting.',
            traps: [
              { val: function (p) { return (p.sbp - p.dbp) / 2; },
                say: 'You halved the gap instead of taking a third of it. Halving is the single most common way this calculation goes wrong, and it is why so many people overestimate a mean pressure.' },
              { val: function (p) { return 2 * (p.sbp - p.dbp) / 3; },
                say: 'That is two thirds of the gap. Two thirds is the share of the beat spent filling, which is exactly why the piece you add back is the other third.' },
              { val: function (p) { return (p.sbp - p.dbp) * 3; },
                say: 'You multiplied by three instead of dividing by it.' }
            ],
            miss: 'Take the number from step one and divide it by three.',
            method: 'Take your answer from step one and divide by three. If the gap were 45, a third would be 15.'
          },
          {
            label: 'Her mean arterial pressure',
            prompt: 'Start at her diastolic and add back what you found in step two.',
            unit: 'mmHg', dp: 1, tol: 0.6,
            answer: function (p) { return p.dbp + (p.sbp - p.dbp) / 3; },
            after: 'That is the pressure her brain and her kidneys are actually working with.',
            traps: [
              { val: function (p) { return (p.sbp + p.dbp) / 2; },
                say: 'That is the halfway point between her two numbers, and it is always too high. The mean sits nearer the diastolic, because the heart rests longer than it squeezes.' },
              { val: function (p) { return p.sbp - (p.sbp - p.dbp) / 3; },
                say: 'You started at the systolic and came down. Start at the diastolic and come up, because that is where the heart spends most of its time.' },
              { val: function (p) { return p.dbp + 2 * (p.sbp - p.dbp) / 3; },
                say: 'You added two thirds of the gap instead of one third. That puts the mean too close to the peak.' },
              { val: function (p) { return (p.sbp - p.dbp) / 3; },
                say: 'That is step two on its own. You still have to add it to her diastolic.' }
            ],
            miss: 'Add your step two answer to her diastolic pressure.',
            method: 'Mean arterial pressure is the diastolic plus one third of the gap. You have both pieces already: take her diastolic and add your step two answer to it.'
          },
          {
            label: 'How far is she from the floor of 65?',
            prompt: 'Below a mean of about 65 an organ can no longer protect its own blood flow. Enter the difference between her mean pressure and 65. Use a minus sign if she is below it.',
            unit: 'mmHg', dp: 1, tol: 0.6,
            answer: function (p) { return (p.dbp + (p.sbp - p.dbp) / 3) - 65; },
            after: 'Lying down, this is the margin she has. In a moment you are going to watch what standing does to it.',
            traps: [
              { val: function (p) { return 65 - (p.dbp + (p.sbp - p.dbp) / 3); },
                say: 'Right size, wrong sign. Subtract 65 from her mean, not the other way round.' },
              { val: function (p) { return p.sbp - 65; },
                say: 'You used her systolic. The floor of 65 is a floor for the mean, which is the number you worked out in step three.' }
            ],
            miss: 'Take 65 away from your step three answer.',
            method: 'Subtract 65 from the mean pressure you found in step three. A positive number means she has margin, a negative number means she is already below the line.'
          }
        ],
        onComplete: function () {
          /* the two rows the chart was holding open now fill from the
             student's own verified working, not from a lookup */
          if (CHART) { CHART.fill('pp', R.pp, 0); CHART.fill('map', R.map, 1); }
          slot.appendChild(L.card([
            el('h3', { text: 'What those numbers say about her, lying down' }),
            para('Your two answers have been carried down into her chart, where they belong. A calculated value is part of the record, not a note in a margin.', 'note'),
            para('Her mean arterial pressure is <b>' + fmt(R.map, 1) + '</b> and her pulse pressure is <b>' + R.pp + '</b>. ' +
              (R.map >= 65
                ? 'Lying still, she is above the floor. Nothing about this reading, on its own, explains a fall.'
                : 'Lying still, she is already under the floor, which explains a great deal on its own.') +
              ' The question is what happened in the seconds after she stood up, and a cuff reading taken in bed cannot answer that.'),
            el('div', { class: 'btnrow' }, [
              el('button', {
                class: 'btn cta', type: 'button',
                onclick: function (e) { e.currentTarget.classList.add('spent'); e.currentTarget.disabled = true; finish(1); }
              }, [el('span', { text: 'Stand her up' }), el('span', { class: 'arw', 'aria-hidden': 'true', text: '→' })])
            ])
          ]));
          slot.lastChild.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      })
    ]));
  }

  /* ==================================================== STEP 3, standing */
  function step3(slot) {
    var ran = {};
    var out = el('div');
    var qSlot = el('div');

    var btns = el('div', { class: 'btnrow', style: 'margin-top:0' });
    [['intact', 'A healthy reflex, for comparison'], [HER, 'Rosa']].forEach(function (pair, i) {
      btns.appendChild(el('button', {
        class: i === 0 ? 'btn' : 'btn sec', type: 'button', text: 'Run ' + pair[1],
        onclick: function () { show(pair[0]); }
      }));
    });

    slot.appendChild(L.card([
      L.kicker('Step three'),
      el('h3', { text: 'Stand her up and watch' }),
      para('Standing moves 500 to 800 mL of blood down into the legs in about a second. The <t>baroreflex</t> is supposed to catch that before anyone notices. Run the healthy reflex first so you know what catching it looks like, then run Rosa.'),
      note('Both runs are required. One trace on its own tells you nothing, because there is nothing to compare it against.'),
      btns, out, qSlot
    ]));

    function show(k) {
      var run = RUNS[k];
      var lowS = BASE.sbp, lowT = T0;
      for (var t = T0; t <= TMAX; t += 0.5) {
        var sv = state(run, t).sbp;
        if (sv < lowS) { lowS = sv; lowT = t; }
      }
      var at5 = state(run, T0 + 5), end = state(run, TMAX);
      var dMove = at5.dbp - BASE.dbp;
      var isHer = k === HER;

      out.innerHTML = '';
      out.appendChild(L.card([
        L.kicker(isHer ? 'Rosa' : 'Reference run'),
        el('h3', { text: isHer ? 'Rosa, standing' : 'A healthy reflex, standing' }),
        para(isHer ? R.pres.hx : 'Same maneuver in someone whose reflex is intact. This is the shape Rosa is being compared against.'),
        el('div', { class: 'readout', style: 'margin-bottom:16px' }, [
          stat('Lowest systolic', fmt(lowS, 0), 'down ' + fmt(BASE.sbp - lowS, 0) + ' from ' + BASE.sbp, (BASE.sbp - lowS) >= 20 ? 'alert' : 'good'),
          stat('Diastolic at 5 s', fmt(at5.dbp, 0), (dMove >= 0 ? 'up ' : 'down ') + fmt(Math.abs(dMove), 0), dMove >= 0 ? 'good' : 'alert'),
          stat('Heart rate change', '+' + run.hrRise, 'beats per minute', run.hrRise < 8 ? 'alert' : 'good'),
          stat('MAP at 5 s, at her arm', fmt(at5.map, 0), at5.map < 65 ? 'under the floor' : 'above the floor', at5.map < 65 ? 'alert' : 'good'),
          stat('MAP at 5 s, at her brain', fmt(at5.map - 12, 0), (at5.map - 12) < 65 ? 'under the floor' : 'above the floor', (at5.map - 12) < 65 ? 'alert' : 'good')
        ]),
        el('figure', { class: 'fig', style: 'margin-bottom:14px' }, [
          el('div', { html: pressureFig(run) }),
          el('figcaption', { html: 'Solid line, systolic. Dashed line, diastolic. The shaded strip on the left is Rosa still lying down.' })
        ]),
        el('figure', { class: 'fig' }, [
          el('div', { html: rateFig(run) }),
          el('figcaption', { html: 'Heart rate through the same maneuver.' })
        ]),
        L.surface([
          el('h3', { text: 'What you just saw' }),
          para(run.read),
          para('<strong>Why there are two mean pressures.</strong> The cuff is on her arm, at roughly the height of her heart. Her brain sits about 30 cm higher, and blood has to be pushed up that column against gravity. Standing costs the brain roughly 12 mmHg that the arm never sees. A reading that looks survivable at the elbow can be under the floor at the ear.', 'note'),
          para('<strong>Was that enough to put her on the floor?</strong> ' + (isHer ? whyDown(at5, lowS) : 'In a healthy reflex, no. The dip is small, it is caught within about thirty seconds, and the brain never runs short.'), 'note'),
          para('<strong>Watch the diastolic.</strong> ' + (dMove >= 0
            ? 'It went <b>up</b> while the systolic fell. Vessels are tightening, so only the swing narrowed and the mean was defended.'
            : 'It fell <b>with</b> the systolic. Vessels are not making up the difference, so the mean itself is going down.'), 'note')
        ])
      ]));
      ran[k] = true;
      if (ran.intact && ran[HER] && !qSlot.dataset.built) buildQ();
      out.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    /* Say what her numbers actually support, and no more than that. On some
       presentations the brain really does drop under the floor. On others it
       does not, and the honest answer is that the speed of the fall is what
       made her symptomatic, because autoregulation takes seconds to catch up. */
    function whyDown(at5, lowS) {
      var brain = at5.map - 12;
      var sysFall = BASE.sbp - lowS;
      if (brain < 63) {
        return 'Yes, directly. At her brain the mean pressure is about ' + fmt(brain, 0) +
          ', which is under the floor. Her brain vessels are already as wide as they go, so blood flow simply followed the pressure down and the room went gray.';
      }
      if (brain < 68) {
        return 'She is sitting right on the line. At her brain the mean is about ' + fmt(brain, 0) +
          ', which is the floor itself, with no margin left in either direction. Add a systolic fall of ' + fmt(sysFall, 0) +
          ' points arriving in a few seconds, faster than <t>autoregulation</t> can widen the vessels, and that is enough. A number this close to the floor is not a comfortable number, whatever the chart says.';
      }
      return 'Not by the absolute number. At her brain the mean is about ' + fmt(brain, 0) +
        ', which is still above the floor. What made her symptomatic is <b>how fast</b> it fell: a systolic drop of ' + fmt(sysFall, 0) +
        ' points meets the definition of <t>orthostatic hypotension</t> on its own, and <t>autoregulation</t> needs several seconds to widen the vessels. She fell during those seconds. This is worth holding on to: symptoms track the speed of a change at least as much as the final value, which is why a number that looks acceptable on a chart can still put someone on the floor.';
    }

    function stat(lab, val, sub, cls) {
      return el('div', { class: 'stat' + (cls ? ' ' + cls : '') }, [
        el('span', { class: 'lab', text: lab }),
        el('span', { class: 'val', text: String(val) }),
        el('span', { class: 'sub', text: sub })
      ]);
    }

    function buildQ() {
      qSlot.dataset.built = '1';
      var her = RUNS[HER], ok = RUNS.intact;
      var herD = state(her, T0 + 5).dbp - BASE.dbp;
      qSlot.appendChild(el('div', { style: 'margin-top:20px' }, L.mcq({
        stem: 'You have both traces now. Which single difference between them is the one that matters?',
        options: [
          'Rosa’s systolic fell further, and that is the whole story',
          'Rosa’s heart rate rose by ' + her.hrRise + ' where the healthy run rose by ' + ok.hrRise + ', and her diastolic ' + (herD >= 0 ? 'held' : 'fell with her systolic') + ' where the healthy one rose',
          'Rosa took longer to recover, which is expected at 71',
          'Rosa’s starting pressure was lower'
        ],
        correct: 1,
        explain: 'A bigger fall is the symptom. What tells you where the fault is, is what her body did about it. The heart rate says whether the order reached the heart. The diastolic says whether the vessels got one. Those two together point at a limb, and a systolic number on its own never will.',
        bucket: B.sim,
        onAnswer: function () {
          qSlot.appendChild(el('div', { class: 'btnrow' }, [
            el('button', {
              class: 'btn cta', type: 'button',
              onclick: function (e) { e.currentTarget.classList.add('spent'); e.currentTarget.disabled = true; finish(2); }
            }, [el('span', { text: 'Go to the loop' }), el('span', { class: 'arw', 'aria-hidden': 'true', text: '→' })])
          ]));
        }
      })));
      L.wireTerms(qSlot);
    }
  }

  /* ================================================ STEP 4, build the loop */
  function step4(slot) {
    var boxes = L.dropBoxes([
      { drop: 'sen', role: 'Sensor', prompt: 'Measures the pressure and reports it. Changes nothing.' },
      { drop: 'int', role: 'Integrator', prompt: 'Compares what it is told against what it expects, and decides.' },
      { drop: 'eff', role: 'Effector', prompt: 'Carries out the decision. The only part that changes the body.' }
    ]);
    var items = [
      { id: 'sen', abb: 'Baroreceptors', name: 'the sensor', hint: 'Stretch sensors in the carotid sinus and the aortic arch.',
        why: 'Less stretch means fewer signals firing up to the brain, which the brainstem reads as falling pressure.' },
      { id: 'int', abb: 'Medulla', name: 'the integrator', hint: 'In the brainstem.', why: 'It compares the incoming firing rate against what it expects and adjusts the outgoing traffic.' },
      { id: 'eff', abb: 'Heart and blood vessels', name: 'the effector', hint: 'Rate, force, and the tightness of the vessels.', why: 'Three levers. Rosa’s trace tells you which of them answered and which did not.' }
    ];
    var m = L.matcher({
      items: items, targetsRoot: boxes, targetSel: '.dropbox', bucket: B.limb,
      placedText: function (it) { return it.abb + ' is ' + it.name + '. ' + (it.why || ''); },
      wrongHint: function (id, want, it) { return it.abb + ' is ' + it.name + ', and that box is asking for a different job.'; },
      doneText: '<strong>That is the loop.</strong> Now put Rosa on it: which of those three did her trace show failing?',
      onComplete: function () {
        slot.appendChild(el('div', { class: 'btnrow' }, [
          el('button', {
            class: 'btn cta', type: 'button',
            onclick: function (e) { e.currentTarget.classList.add('spent'); e.currentTarget.disabled = true; finish(3); }
          }, [el('span', { text: 'Name what failed' }), el('span', { class: 'arw', 'aria-hidden': 'true', text: '→' })])
        ]));
        slot.lastChild.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });

    slot.appendChild(L.card([
      L.kicker('Step four'),
      el('h3', { text: 'Build the loop that was supposed to catch her' }),
      para('Three jobs, three structures. Drag a label into a box, or click a label and then click a box, or tab to a label and press Enter and do the same on a box.'),
      m.counter, m.hint, m.bar, m.tray, boxes, m.fb
    ]));
  }

  /* =============================================== STEP 5, the diagnosis */
  var DIAG = {
    beta: {
      correct: 'The order was sent and her heart could not carry it out. A drug is sitting on the receptor the brainstem was trying to reach, so the rate barely moved. Her vessels still tightened.',
      why: 'Her diastolic held up, which means the vessels got their order and acted on it, so the signal was being sent and received somewhere. What did not happen is the heart rate answering. That is a blocked effector, not a blind sensor and not an empty tank.',
      flaws: { dry: 'hr-flat', auto: 'vessels-held', pump: 'pp-not-narrow' }
    },
    dry: {
      correct: 'Every part of the loop worked. There was simply not enough blood in her circulation for it to work with.',
      why: 'Her heart rate climbed hard, which is a loop doing everything it is supposed to. When a fully working reflex still cannot hold the pressure up, the problem is not the loop, it is the volume the loop has to move.',
      flaws: { beta: 'hr-did-rise', auto: 'reported-fine', pump: 'pp-not-narrow' }
    },
    auto: {
      correct: 'The fall was never properly reported, so no order was sent to anything. Neither her heart nor her vessels responded.',
      why: 'Nothing answered. Not the rate, not the vessels. When every effector stays silent at once, the failure is upstream of all of them, in the sensing and signaling path, which is what thirty years of diabetes does to small nerves.',
      flaws: { beta: 'vessels-gone', dry: 'hr-flat', pump: 'pp-not-narrow' }
    }
  };
  var OPTION_TEXT = {
    beta: 'Her heart could not speed up to defend the pressure, because a drug was blocking the response it was being asked for.',
    dry: 'Every part of the loop worked, but there was not enough blood in her circulation for it to move.',
    auto: 'The pressure drop was never properly reported, so nothing was ever asked to respond.',
    pump: 'Her heart muscle has become too weak to pump enough blood with each beat.'
  };
  var REASONS = [
    { id: 'hr-did-rise', text: 'Her heart rate rose sharply, so the heart clearly could answer the order it was given' },
    { id: 'hr-flat', text: 'Her heart rate barely moved, and a working loop fighting an empty tank drives the rate up hard' },
    { id: 'vessels-held', text: 'Her diastolic held up, so her vessels were still being told to tighten and were doing it' },
    { id: 'vessels-gone', text: 'Her diastolic fell along with her systolic, so the vessels were not responding either' },
    { id: 'reported-fine', text: 'The fall was obviously detected and reported, because a response was sent within seconds' },
    { id: 'pp-not-narrow', text: 'A failing pump shows as a narrow swing with a struggling heart, and that is not this trace' },
    { id: 'age-alone', text: 'Being 71 is a risk factor, not a mechanism' },
    { id: 'temp-off', text: 'Her temperature rules this out' }
  ];
  function step5(slot) {
    var d = DIAG[HER];
    var order = L.shuffle(['beta', 'dry', 'auto', 'pump']);
    var opts = order.map(function (k) {
      if (k === HER) return { text: d.correct, correct: true, why: d.why };
      return {
        text: OPTION_TEXT[k],
        flaw: d.flaws[k],
        because: REASONS.filter(function (r) { return r.id === d.flaws[k]; })[0].text + '.'
      };
    });
    var used = Object.keys(d.flaws).map(function (k) { return d.flaws[k]; });
    var pool = REASONS.filter(function (r) {
      return used.indexOf(r.id) >= 0 || r.id === 'age-alone' || r.id === 'temp-off';
    });

    /* Section one is built from her actual chart, so which findings count
       as abnormal depends on the numbers this student was dealt. */
    function outOfRange(row) {
      var v = row.value(R);
      if (v == null) return false;
      return (row.lo != null && v < row.lo) || (row.hi != null && v > row.hi);
    }
    var abnormalOpts = VITALS.filter(function (row) { return row.value(R) != null; })
      .map(function (row) {
        var v = row.value(R);
        return {
          id: row.key,
          text: row.label + ' of ' + fmt(v, row.dp) + ' ' + (row.unit || ''),
          correct: outOfRange(row)
        };
      });
    abnormalOpts.push({
      id: 'map', text: 'Mean arterial pressure of ' + fmt(R.map, 1) + ' mmHg',
      correct: R.map < 65 || R.map > 100
    });
    var anyAbnormal = abnormalOpts.filter(function (o) { return o.correct; }).length > 0;

    var noteBox = L.clinicalNote({
      id: 'n1', bucket: B.note,
      sections: [
        {
          key: 'pos', title: 'Pertinent abnormal findings',
          prompt: 'Everything she was measured on, straight off your chart. Tick only what is genuinely outside its reference range.',
          options: abnormalOpts,
          noneText: 'No pertinent abnormal findings on the recorded observations',
          because: anyAbnormal
            ? 'Those are the values actually outside range. Everything else on her chart is normal, and calling a normal value abnormal sends the next person hunting for a problem that is not there.'
            : 'Every recorded observation is inside its range. That is a real finding, and it is why nothing about her chart, taken lying down, explains a fall. What she was never measured doing is standing up.'
        },
        {
          key: 'neg', title: 'Pertinent negatives',
          prompt: 'The normal results that matter. A pertinent negative is a normal finding that rules something out, which is not the same as a normal finding that changes nothing.',
          options: [
            { id: 'spo2', text: 'Oxygen saturation is normal, so she was not short of oxygen when she went down', correct: true },
            { id: 'temp', text: 'She is afebrile, which makes infection an unlikely explanation for the fall', correct: true },
            { id: 'loc', text: 'She did not lose consciousness and has no head injury', correct: true },
            { id: 'rr', text: 'Her respiratory rate is normal, which rules out low blood pressure', correct: false },
            { id: 'age', text: 'She is 71, which is normal for this ward', correct: false }
          ],
          noneText: 'Nothing normal here is pertinent',
          because: 'Each of those three closes a door. Normal saturation rules out hypoxia, no fever makes sepsis unlikely, and no loss of consciousness points away from a cardiac or neurological event. A normal respiratory rate does not rule out low blood pressure, which is why it did not belong, and being 71 is not a finding at all.'
        },
        {
          key: 'gap', title: 'Not obtained, and it matters',
          prompt: 'You marked two rows not obtained. Tick the ones whose absence actually changes what should happen next for Rosa, rather than every gap in the paperwork.',
          options: [
            { id: 'glu', text: 'No capillary glucose. Low blood sugar is one of the commonest reversible causes of a fall in an older person', correct: true },
            { id: 'orth', text: 'No blood pressure was ever taken standing up, which is the one maneuver that reproduces what happened to her', correct: true },
            { id: 'pain', text: 'No pain score was recorded', correct: false },
            { id: 'wt', text: 'Her weight is not on this chart', correct: false }
          ],
          noneText: 'Nothing missing changes what happens next',
          because: 'Both of those are gaps that would change a decision, which is what makes them worth writing down. The missing pain score is a real documentation gap and it belongs on the chart, but it would not have changed anything about this fall. Telling those two kinds of missing apart is most of what makes a note useful rather than long.'
        }
      ],
      free: [
        {
          key: 'meaning',
          label: 'Your assessment, in your own words',
          minWords: 25,
          prompt: '<p>Write two or three sentences saying what you think happened to Rosa and what you would want next.</p>' +
                  '<p>Use your own numbers. Say what her mean pressure was lying down, what happened to it when she stood, and which part of the loop you think failed. Then name the one measurement or change you would want, and why that one.</p>' +
                  '<p class="note">This part is read rather than scored. It prints on your PDF exactly as you typed it.</p>'
        }
      ],
      onComplete: function () {
        slot.appendChild(L.card([
          L.kicker('The assessment'),
          el('h3', { text: 'So why did Rosa fall?' }),
          para('Your note says what you found. This says what it adds up to. One of these is what happened to her. The other three are the explanations people reach for when they have not looked at the trace.'),
          el('div', { style: 'margin-top:16px' }, L.eliminate({
            id: 'q5',
            stem: 'Pick the explanation her trace actually supports.',
            options: opts,
            reasons: pool,
            close: 'Every one of those wrong answers is a real clinical picture. It is just not <b>hers</b>, and the trace is what tells them apart.',
            bucket: B.limb,
            onComplete: function () { finish(4); }
          }))
        ]));
        slot.lastChild.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });

    slot.appendChild(L.card([
      L.kicker('Step five'),
      el('h3', { text: 'Write the note' }),
      para('The same headings every week, in this order, for the rest of the course. What is abnormal. What is normal and matters anyway. What is missing and matters anyway. Then what you make of it.'),
      noteBox
    ]));
  }

  /* ===================================================== the end of the case */
  function buildEnd() {
    if (L.gates.case) return;
    L.openGate('case');
    endSlot.innerHTML = '';
    endSlot.appendChild(L.card([
      L.kicker('Case closed'),
      el('h3', { text: 'That is Rosa' }),
      para('You did not diagnose her by recognizing a pattern. You worked out a number nobody had written down, watched what her body did about a problem, and read the answer off which part of the loop stayed silent. That sequence is the whole method of this course.'),
      para('<strong>What she needed.</strong> ' + END_NOTE[HER], 'note'),
      L.surface([
        el('h3', { text: 'What is open now' }),
        para('The loop lab takes the three parts you just used and builds two more loops with them. After that comes your own set of twelve patients, then the oxygen curve, then the test.', 'note')
      ]),
      el('div', { class: 'btnrow' }, [
        el('button', { class: 'btn', type: 'button', text: 'Go to the loop lab', onclick: function () { L.showTab('loops', true); } }),
        el('button', { class: 'btn sec', type: 'button', text: 'Read the study page first', onclick: function () { L.showTab('learn', true); } })
      ])
    ]));
    L.wireTerms(endSlot);
    endSlot.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  var END_NOTE = {
    beta: 'Her medication reviewed, not fluid. Pouring fluid into someone whose heart is chemically prevented from responding does not fix the thing that is broken.',
    dry: 'Fluid, and a reason for why she lost it. Her loop is fine and will work perfectly as soon as it has something to move.',
    auto: 'No quick fix. A signaling path that has been damaged over thirty years does not come back, so the work is compression, slow position changes, and removing anything that makes it worse.'
  };

  var BUILD = [step1, step2, step3, step4, step5];
  BUILD[0](slots[0]);
  L.wireTerms(root);
}
L.W1.casePanel = casePanel;
})();
/* =====================================================================
   WEEK 1, PART F: reading the oxygen curve

   The four questions every chart in this course gets asked, plus a curve
   you can actually poke at. Pick an oxygen pressure and watch where it
   lands you, then slide the whole curve and watch what that costs.
   ===================================================================== */
(function () {
'use strict';
var L = window.LAB, el = L.el, $ = L.$, fmt = L.fmt;
var card = L.card, kicker = L.kicker, note = L.note, para = L.para, list = L.list;
var W = L.W1, B = W.B, C = L.COLOR, hill = W.hill;

var P50 = { normal: 26.6, right: 31.5, left: 22.0 };
var SHIFT_TEXT = {
  normal: 'Normal blood, at 37 degrees and a pH of 7.4.',
  right: 'A right shift. Hot, acidic, high carbon dioxide. Working muscle makes all three.',
  left: 'A left shift. Cold, alkaline, low carbon dioxide. Also fetal hemoglobin, which is left shifted on purpose.'
};

function pts(p50) {
  var a = [];
  for (var P = 0; P <= 110; P += 1) a.push([P, hill(P, p50)]);
  return a;
}

function fig(state) {
  var p50 = P50[state.shift];
  var series = [{ pts: pts(P50.normal), color: state.shift === 'normal' ? C.terra : C.ruleSoft, width: state.shift === 'normal' ? 3 : 2 }];
  if (state.shift !== 'normal') series.push({ pts: pts(p50), color: C.terra, width: 3 });

  var marks = [];
  var guides = [];
  if (state.po2 != null) {
    var sat = hill(state.po2, p50);
    var high = state.po2 > 70;
    marks.push({
      x: state.po2, y: sat, color: C.navy,
      label: 'PO2 ' + state.po2 + ', ' + fmt(sat, 0) + '%',
      dx: high ? -12 : 12, dy: high ? 20 : -14, anchor: high ? 'end' : 'start'
    });
    guides.push({ x: state.po2, color: C.navy });
    guides.push({ y: sat, color: C.navy });
  }
  guides.push({ x: p50, label: 'P50 ' + fmt(p50, 0), color: C.goldText, pos: 'bottom' });

  return L.xy({
    h: 430,
    x: { min: 0, max: 110, label: 'Oxygen pressure in the blood, PO2 (mmHg)', ticks: [0, 20, 40, 60, 80, 100] },
    y: { min: 0, max: 100, label: 'Hemoglobin saturation (%)', ticks: [0, 20, 40, 60, 80, 100] },
    series: series, marks: marks, guides: guides,
    aria: 'Oxygen dissociation curve, ' + state.shift + ' position. ' +
      (state.po2 != null ? 'An oxygen pressure of ' + state.po2 + ' gives a saturation of ' + fmt(hill(state.po2, p50), 0) + ' percent.' : 'No point selected.')
  });
}

function curvePanel() {
  var root = $('#curve-root');
  root.innerHTML = '';
  var state = { po2: 100, shift: 'normal' };

  root.appendChild(el('div', { class: 'panel-intro' }, [
    el('h2', { text: 'The oxygen curve' }),
    para('One figure, poked at from several directions. Pick an oxygen pressure and see where it lands. Then slide the whole curve and see what that same pressure is worth.'),
    note('Everything on this page is the same curve you met on the study page. Nothing new to memorize, just somewhere to try it out.')
  ]));

  var figBox = el('figure', { class: 'fig' });
  var readout = el('div', { class: 'readout', style: 'margin-top:14px' });
  var says = el('p', { class: 'note', 'aria-live': 'polite', style: 'margin:12px 0 0' });

  var po2Row = el('div', { class: 'pt-read' });
  [20, 27, 40, 60, 80, 100].forEach(function (v) {
    po2Row.appendChild(el('button', {
      class: 'pt-btn', type: 'button', 'aria-pressed': v === state.po2 ? 'true' : 'false',
      'data-po2': v, text: 'PO2 ' + v,
      onclick: function () { state.po2 = v; draw(); }
    }));
  });
  var shiftRow = el('div', { class: 'pt-read' });
  [['normal', 'Normal'], ['right', 'Right shift'], ['left', 'Left shift']].forEach(function (s) {
    shiftRow.appendChild(el('button', {
      class: 'pt-btn', type: 'button', 'aria-pressed': s[0] === state.shift ? 'true' : 'false',
      'data-shift': s[0], text: s[1],
      onclick: function () { state.shift = s[0]; draw(); }
    }));
  });

  function draw() {
    figBox.innerHTML = fig(state) + '<figcaption>' + (state.shift === 'normal'
      ? 'The normal curve. The gold dashed line marks the P50, where hemoglobin is exactly half loaded.'
      : 'Red line, the shifted curve you are reading now. The pale gray line behind it is the normal curve, kept on screen so the size of the shift is visible.') +
      '</figcaption>';
    L.$$('[data-po2]', po2Row).forEach(function (b) {
      b.setAttribute('aria-pressed', parseInt(b.getAttribute('data-po2'), 10) === state.po2 ? 'true' : 'false');
    });
    L.$$('[data-shift]', shiftRow).forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-shift') === state.shift ? 'true' : 'false');
    });

    var p50 = P50[state.shift];
    var sat = hill(state.po2, p50);
    var satNorm = hill(state.po2, P50.normal);
    var venous = hill(40, p50);
    readout.innerHTML = '';
    readout.appendChild(box('Oxygen pressure', state.po2, 'mmHg'));
    readout.appendChild(box('Saturation here', fmt(sat, 0) + '%', state.shift === 'normal' ? 'on the normal curve' :
      (sat > satNorm ? 'up ' + fmt(sat - satNorm, 0) + ' points on normal' : 'down ' + fmt(satNorm - sat, 0) + ' points on normal')));
    readout.appendChild(box('P50', fmt(p50, 0), 'half loaded at this pressure'));
    readout.appendChild(box('At the tissue, PO2 40', fmt(venous, 0) + '%', 'what is still on board leaving the tissue'));

    says.innerHTML = SHIFT_TEXT[state.shift] + ' ' + comment();
    L.wireTerms(says);
  }

  function box(lab, val, sub) {
    return el('div', { class: 'stat' }, [
      el('span', { class: 'lab', text: lab }),
      el('span', { class: 'val', text: String(val) }),
      el('span', { class: 'sub', text: sub })
    ]);
  }

  function comment() {
    var p = state.po2;
    if (state.shift === 'right') {
      return 'At the tissue, where the pressure is about 40, a right shifted curve hands over noticeably more oxygen than a normal one. That is the point of it.';
    }
    if (state.shift === 'left') {
      return 'A left shifted curve holds on tighter. Loading in the lung is easy, but unloading at the tissue is harder, which is why a left shift is a mixed blessing.';
    }
    if (p >= 80) return 'Up here the curve is flat. Big changes in pressure buy almost no extra saturation, because the seats are nearly all taken.';
    if (p === 60) return 'This is the knee of the curve, right at 90 percent. Above here you are safe. Below here the fall gets steep quickly.';
    if (p === 40) return 'This is roughly what blood looks like on its way back from a resting tissue. A quarter of the oxygen has been handed over.';
    if (p === 27) return 'This is the P50, where exactly half the seats are filled. It is the number used to describe where the whole curve sits.';
    return 'Down here every point of pressure matters, because the curve is at its steepest.';
  }

  draw();
  root.appendChild(card([
    kicker('Try it'),
    el('h3', { text: 'Pick a pressure, then slide the curve' }),
    el('p', { html: '<strong>Oxygen pressure</strong>' }),
    po2Row,
    el('p', { style: 'margin-top:14px' , html: '<strong>Where the curve sits</strong>' }),
    shiftRow,
    figBox, readout, says
  ]));

  /* ---- the four questions ---- */
  root.appendChild(L.chartCard({
    title: 'The oxygen hemoglobin dissociation curve',
    figHTML: W.curveSVG({ marks: true, cliff: true }),
    caption: 'The shaded band on the left is the steep part, where saturation falls fast for small further drops in pressure.',
    intro: 'Answer the four questions in your own words first, then work through these.',
    bucket: B.curve,
    questions: [
      {
        stem: 'Why is the top of the curve flat, and what does that mean for a pulse oximeter reading of 96 percent?',
        options: [
          'It is flat because the oximeter is inaccurate at high readings',
          'It is flat because hemoglobin is nearly full, so 96 percent could sit anywhere across a wide range of oxygen pressures',
          'It is flat because oxygen stops dissolving in plasma above a pressure of 60',
          'It is flat because the lungs limit how much oxygen can be absorbed'
        ],
        correct: 1,
        explain: 'Once most of the binding sites are taken, extra oxygen pressure has almost nowhere to go, so saturation barely moves. A reading of 96 percent is genuinely reassuring, but it cannot tell you whether the oxygen pressure is 80 or 130, and it cannot tell you whether it has been falling all morning.'
      },
      {
        stem: 'A patient is warmer and more acidic than normal. Which way does the curve shift, and is that good or bad for the tissue?',
        options: [
          'Left, and it hurts the tissue',
          'Right, and it helps the tissue, because oxygen is released more easily where it is needed',
          'Right, and it hurts the tissue, because less oxygen is loaded in the lung',
          'It does not shift, only 2,3-BPG shifts the curve'
        ],
        correct: 1,
        explain: 'Heat and acid both loosen hemoglobin\'s grip, which shifts the curve right. Working tissue produces both, so the blood arriving there gives up more oxygen without anyone sending a signal. Loading in the lung is barely affected, because the lung sits on the flat part where there is margin to spare.'
      },
      {
        stem: 'At a saturation of 90 percent, roughly what oxygen pressure are you looking at? And at 75 percent?',
        options: [
          'About 90 and about 75',
          'About 60 and about 40',
          'About 45 and about 30',
          'About 80 and about 60'
        ],
        correct: 1,
        explain: 'Ninety over sixty, seventy five over forty. Those two pairs are worth knowing cold. They tell you that a saturation of 90 percent, which looks only slightly low, already means the oxygen pressure has fallen to 60, and that any further fall is now on the steep part of the curve.'
      },
      {
        stem: 'What is on the two axes of this chart, and which one does a finger clip actually measure?',
        options: [
          'Pressure on the vertical and saturation on the horizontal. The clip measures pressure',
          'Saturation in percent on the vertical and oxygen pressure in mmHg on the horizontal. The clip measures saturation only',
          'Both axes are saturation, one arterial and one venous',
          'Oxygen content on the vertical and pressure on the horizontal. The clip measures content'
        ],
        correct: 1,
        explain: 'Always start a chart by naming the axes and their units. Saturation, a percentage, goes up the side. Oxygen pressure, in millimeters of mercury, goes along the bottom. The finger clip only ever gives you the vertical axis, and the whole clinical value of the curve is that it lets you reason about the horizontal one.'
      }
    ]
  }));

  root.appendChild(card([
    kicker('One more'),
    el('h3', { text: 'Putting it with the rest of the week' }),
    L.mcq({
      stem: 'A patient with a mean arterial pressure of 55 has a pulse oximeter reading of 99 percent. Is their tissue getting enough oxygen?',
      options: [
        'Yes, 99 percent means oxygen delivery is fine',
        'Not necessarily. The blood is loaded, but at a mean pressure of 55 it is not being delivered',
        'No, 99 percent is too high and indicates a left shift',
        'There is no way to comment without a blood gas'
      ],
      correct: 1,
      explain: 'Saturation tells you the blood is carrying oxygen. It says nothing about whether that blood is arriving. Delivery needs three things: oxygen on board, enough <t>hemoglobin</t> to carry it, and enough pressure and flow to move it. This patient has the first, and the third has failed. That is the whole point of putting these two topics in the same week.',
      bucket: B.curve
    })
  ]));

  L.wireTerms(root);
}
L.W1.curvePanel = curvePanel;
})();
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
    e: 'Five hundred to eight hundred milliliters, most of a large drink bottle, in about a second. The reflex has to find that much circulating volume from somewhere before the brain notices.' },
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
