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
