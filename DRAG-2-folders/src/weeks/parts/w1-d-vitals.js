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
