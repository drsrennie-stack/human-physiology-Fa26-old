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
