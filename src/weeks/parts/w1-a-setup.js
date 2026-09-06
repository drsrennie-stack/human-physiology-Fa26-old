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
