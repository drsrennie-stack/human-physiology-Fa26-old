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
