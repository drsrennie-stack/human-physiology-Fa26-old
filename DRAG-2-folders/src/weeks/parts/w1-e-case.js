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
