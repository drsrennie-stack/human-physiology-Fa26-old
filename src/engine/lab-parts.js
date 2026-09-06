/* =====================================================================
   THE CLINICAL PHYSIOLOGY LAB, shared engine
   Part 2 of 2: decision charts, matching, calculation tables, plotting,
   the written test, the results page and the PDF submission.
   ===================================================================== */
(function () {
'use strict';
var L = window.LAB, el = L.el, $ = L.$, $$ = L.$$, fmt = L.fmt, C = L.COLOR;

/* =====================================================================
   CLICKABLE DECISION CHART
   Built the way an ACLS algorithm card works. The student answers the
   question at each box, clicks the branch they believe is right, and the
   chart grows downward along the path they chose. A wrong branch is
   explained and does not advance, so the shape of the chart is what
   gets learned, not just the answer.

   spec = { start: id, nodes: { id: node } }
   question node: { q, hint, opts:[{key,tag,label}], answer(ctx),
                    explain(ctx, chosen, correct), next:{key:id} }
   terminal node: { terminal:true, result(ctx), detail(ctx) }
   ===================================================================== */
function flowchart(spec, ctx, opts) {
  opts = opts || {};
  var wrap = el('div', { class: 'fc' });
  var stepNo = 0;

  function connector() { return el('div', { class: 'fc-link', 'aria-hidden': 'true' }, el('span')); }

  function renderNode(id) {
    var node = spec.nodes[id];
    if (!node) return;

    if (node.terminal) {
      var res = typeof node.result === 'function' ? node.result(ctx) : node.result;
      var det = typeof node.detail === 'function' ? node.detail(ctx) : node.detail;
      wrap.appendChild(connector());
      var endBox = el('div', { class: 'fc-node fc-end' }, [
        el('span', { class: 'fc-tag', text: 'Where the chart lands you' }),
        el('h4', { text: res }),
        det ? el('p', { html: det, style: 'margin-bottom:0' }) : null
      ]);
      wrap.appendChild(endBox);
      L.wireTerms(endBox);
      if (opts.onFinish) opts.onFinish(res, ctx);
      return;
    }

    stepNo++;
    var wrongThisNode = 0;
    if (stepNo > 1) wrap.appendChild(connector());

    var optsBox = el('div', { class: 'fc-opts' });
    var fb = el('div', { class: 'fb', 'aria-live': 'polite' }); fb.hidden = true;
    var buttons = [];
    var answered = false;
    var correctKey = typeof node.answer === 'function' ? node.answer(ctx) : node.answer;

    node.opts.forEach(function (o) {
      var b = el('button', {
        class: 'fc-opt', type: 'button',
        onclick: function () {
          if (answered) return;
          var right = o.key === correctKey;
          if (!right) {
            wrongThisNode++;
            b.classList.add('miss');
            b.disabled = true;
            fb.hidden = false;
            fb.innerHTML = '<strong>Not that branch. </strong>' +
              (node.explain ? node.explain(ctx, o.key, correctKey) : '') +
              ' Look at the numbers again and pick the other way.';
            L.wireTerms(fb);
            if (opts.bucket) L.score(opts.bucket, false);
            return;
          }
          answered = true;
          if (opts.bucket && wrongThisNode === 0) L.score(opts.bucket, true);
          buttons.forEach(function (bb) { bb.disabled = true; });
          b.classList.add('taken');
          fb.hidden = false;
          fb.innerHTML = '<strong>' + (wrongThisNode ? 'Right branch. ' : 'Correct. ') + '</strong>' +
            (node.explain ? node.explain(ctx, o.key, correctKey) : '');
          L.wireTerms(fb);
          renderNode(node.next[o.key]);
        }
      }, [
        el('span', { class: 'fc-key', text: o.tag || '' }),
        el('span', { text: o.label })
      ]);
      buttons.push(b);
      optsBox.appendChild(b);
    });

    var box = el('div', { class: 'fc-node' }, [
      el('span', { class: 'fc-tag', text: 'Box ' + stepNo }),
      el('h4', { text: typeof node.q === 'function' ? node.q(ctx) : node.q }),
      node.hint ? el('p', { class: 'note', style: 'margin-bottom:10px', html: typeof node.hint === 'function' ? node.hint(ctx) : node.hint }) : null,
      optsBox, fb
    ]);
    wrap.appendChild(box);
    L.wireTerms(box);
  }

  renderNode(spec.start);
  return wrap;
}
L.flowchart = flowchart;

/* =====================================================================
   MATCHING WITH THREE INPUT PATHS
   Drag a chip onto a target, or click a chip then click a target, or
   tab to a chip and press Enter then tab to a target and press Enter.
   WCAG 2.2 criterion 2.5.7 asks that dragging never be the only way.

   Targets are any elements carrying data-drop="<item id>". They can be
   HTML boxes or groups inside an SVG.
   ===================================================================== */
function matcher(cfg) {
  /* cfg: {items:[{id,abb,name,hint}], targetsRoot, targetSel, bucket,
           onComplete, wrongHint(itemId, targetId), placedText(item)} */
  var placed = 0, selected = null;
  var total = cfg.items.length;
  var targetSel = cfg.targetSel || '[data-drop]';

  var counter = el('p', { style: 'font-weight:700;font-size:1.02rem;margin-bottom:4px', 'aria-live': 'polite' });
  var bar = el('span', { style: 'width:0%' });
  var fb = el('div', { class: 'fb', 'aria-live': 'polite' }); fb.hidden = true;
  var tray = el('div', { class: 'dnd-tray' });
  var hint = el('p', {
    class: 'dnd-hint',
    text: 'Drag each label onto the box it belongs to. If you would rather not drag, click a label to pick it up and then click a box. The same works with the keyboard: tab to a label, press Enter, tab to a box, press Enter again.'
  });

  function updateCount() {
    counter.textContent = placed + ' of ' + total + ' labels placed.';
    bar.style.width = Math.round(100 * placed / total) + '%';
  }

  var chips = {};
  var byId = {};
  cfg.items.forEach(function (m) { byId[m.id] = m; });

  L.shuffle(cfg.items).forEach(function (m) {
    var chip = el('button', {
      class: 'chip-drag', type: 'button', draggable: 'true',
      'aria-pressed': 'false', 'data-label': m.id,
      'aria-label': (m.name || m.abb) + '. Pick up, then choose a box.'
    }, [el('span', { text: m.abb }), m.name ? el('small', { text: m.name }) : null]);

    chip.addEventListener('dragstart', function (e) {
      selectChip(this);
      this.classList.add('dragging');
      try {
        e.dataTransfer.setData('text/plain', this.getAttribute('data-label'));
        e.dataTransfer.effectAllowed = 'move';
      } catch (err) {}
    });
    chip.addEventListener('dragend', function () { this.classList.remove('dragging'); });
    chip.addEventListener('click', function () {
      if (selected === this) selectChip(null); else selectChip(this);
    });
    chips[m.id] = chip;
    tray.appendChild(chip);
  });

  function targets() { return $$(targetSel, cfg.targetsRoot); }

  function selectChip(chip) {
    Object.keys(chips).forEach(function (k) { chips[k].setAttribute('aria-pressed', 'false'); });
    selected = chip;
    var tg = targets();
    if (chip) {
      chip.setAttribute('aria-pressed', 'true');
      tg.forEach(function (t) { if (!t.classList.contains('hit')) t.classList.add('drop-ready'); });
      var m = byId[chip.getAttribute('data-label')];
      fb.hidden = false;
      fb.innerHTML = '<strong>' + m.abb + ' picked up. </strong>' + (m.hint || '') + ' Now choose the box it belongs to.';
      L.wireTerms(fb);
    } else {
      tg.forEach(function (t) { t.classList.remove('drop-ready'); });
    }
  }

  function placeOn(target, itemId) {
    if (!target || target.classList.contains('hit')) return;
    var want = target.getAttribute('data-drop');
    var m = byId[itemId];
    var right = want === itemId;
    if (cfg.bucket) L.score(cfg.bucket, right);
    fb.hidden = false;
    if (right) {
      target.classList.add('hit');
      target.classList.remove('drop-ready', 'drop-over');
      var slot = target.querySelector('.slot') || target.querySelector('.brk-label');
      if (slot) slot.textContent = m.abb;
      var why = target.querySelector('.why');
      if (why && m.why) { why.innerHTML = m.why; L.wireTerms(why); }
      target.setAttribute('aria-label', m.abb + ', ' + (m.name || '') + ', already matched');
      chips[itemId].classList.add('placed');
      chips[itemId].disabled = true;
      selectChip(null);
      placed++; updateCount();
      fb.innerHTML = '<strong>Correct. </strong>' + (cfg.placedText ? cfg.placedText(m, target) : (m.name + '. ' + (m.hint || '')));
      L.wireTerms(fb);
      if (placed === total) {
        if (cfg.doneText) fb.innerHTML += '<br><br>' + cfg.doneText;
        L.wireTerms(fb);
        if (cfg.onComplete) cfg.onComplete();
      }
    } else {
      target.classList.add('miss');
      setTimeout(function () { target.classList.remove('miss'); }, 700);
      fb.innerHTML = '<strong>Not that box. </strong>' +
        (cfg.wrongHint ? cfg.wrongHint(itemId, want, m) : (m.abb + ' is ' + (m.name || '').toLowerCase() + '. ' + (m.hint || '')));
      L.wireTerms(fb);
    }
  }

  var root = cfg.targetsRoot;
  root.addEventListener('click', function (e) {
    var t = e.target.closest ? e.target.closest(targetSel) : null;
    if (!t) return;
    if (!selected) {
      fb.hidden = false;
      fb.innerHTML = '<strong>Pick up a label first. </strong>Choose one of the labels above, then come back and choose a box.';
      return;
    }
    placeOn(t, selected.getAttribute('data-label'));
  });
  root.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    var t = e.target.closest ? e.target.closest(targetSel) : null;
    if (!t) return;
    e.preventDefault();
    if (!selected) {
      fb.hidden = false;
      fb.innerHTML = '<strong>Pick up a label first. </strong>Tab back to the labels, press Enter on one, then come back here.';
      return;
    }
    placeOn(t, selected.getAttribute('data-label'));
  });
  root.addEventListener('dragover', function (e) {
    var t = e.target.closest ? e.target.closest(targetSel) : null;
    if (!t || t.classList.contains('hit')) return;
    e.preventDefault();
    try { e.dataTransfer.dropEffect = 'move'; } catch (err) {}
    t.classList.add('drop-over');
  });
  root.addEventListener('dragleave', function (e) {
    var t = e.target.closest ? e.target.closest(targetSel) : null;
    if (t) t.classList.remove('drop-over');
  });
  root.addEventListener('drop', function (e) {
    var t = e.target.closest ? e.target.closest(targetSel) : null;
    if (!t) return;
    e.preventDefault();
    t.classList.remove('drop-over');
    var id = '';
    try { id = e.dataTransfer.getData('text/plain'); } catch (err) {}
    if (!id && selected) id = selected.getAttribute('data-label');
    if (id) placeOn(t, id);
  });

  updateCount();
  return { counter: counter, bar: el('div', { class: 'progress' }, bar), hint: hint, tray: tray, fb: fb };
}
L.matcher = matcher;

/* build a row of empty drop boxes */
function dropBoxes(boxes) {
  /* boxes: [{drop, role, prompt}] */
  return el('div', { class: 'dropgrid' }, boxes.map(function (b) {
    return el('button', {
      type: 'button', class: 'dropbox', 'data-drop': b.drop,
      'aria-label': b.role + ', empty. Pick up a label, then choose this box.'
    }, [
      el('span', { class: 'role', text: b.role }),
      el('span', { class: 'slot', text: 'drop here' }),
      el('span', { class: 'why', html: b.prompt || '' })
    ]);
  }));
}
L.dropBoxes = dropBoxes;

/* =====================================================================
   CALCULATION TABLE
   Some columns are given. Others are blank and the student works them
   out. Every blank is checked against a tolerance and explained. This
   is the pattern that stops a calculation being pure number plugging:
   the numbers on screen are never the numbers being asked for.
   ===================================================================== */
function calcTable(cfg) {
  var inputs = [];
  var t = el('table', { class: 'dt' });
  var thead = el('thead');
  var htr = el('tr');
  cfg.cols.forEach(function (c) {
    htr.appendChild(el('th', {
      scope: 'col', class: c.text ? '' : 'num',
      html: c.label + (c.unit ? ' <span class="note">(' + c.unit + ')</span>' : '')
    }));
  });
  if (cfg.flagCol) htr.appendChild(el('th', { scope: 'col', text: cfg.flagCol }));
  thead.appendChild(htr);
  t.appendChild(el('caption', { text: cfg.caption }));
  t.appendChild(thead);

  var tb = el('tbody');
  cfg.rows.forEach(function (row, ri) {
    var tr = el('tr');
    cfg.cols.forEach(function (c) {
      if (!c.calc) {
        tr.appendChild(el('td', {
          class: c.text ? '' : 'num',
          text: c.text ? String(row[c.key]) : L.fmt(row[c.key], c.dp == null ? 0 : c.dp)
        }));
        return;
      }
      var id = 'ct-' + cfg.id + '-' + ri + '-' + c.key;
      var inp = el('input', {
        type: 'text', inputmode: 'decimal', id: id, autocomplete: 'off',
        'aria-label': c.label + ' for ' + row[cfg.labelKey || 'id']
      });
      var noteSpan = el('span', { class: 'cellnote' });
      inputs.push({ inp: inp, col: c, row: row, note: noteSpan, done: false });
      tr.appendChild(el('td', { class: 'num' }, [inp, noteSpan]));
    });
    if (cfg.flagCol) {
      tr.appendChild(el('td', { class: 'rowflag', 'data-flag': ri, text: '' }));
    }
    tb.appendChild(tr);
  });
  t.appendChild(tb);

  var fb = el('div', { class: 'fb', 'aria-live': 'polite' }); fb.hidden = true;

  function check() {
    var right = 0, wrong = 0, blank = 0;
    inputs.forEach(function (rec) {
      var raw = rec.inp.value.trim();
      if (raw === '') { blank++; rec.inp.classList.remove('ok', 'bad'); rec.note.textContent = ''; return; }
      var got = parseFloat(raw);
      var want = rec.col.answer(rec.row);
      var tol = rec.col.tol == null ? 0.5 : rec.col.tol;
      var ok = !isNaN(got) && Math.abs(got - want) <= tol;
      if (!rec.done) { if (cfg.bucket) L.score(cfg.bucket, ok); rec.done = true; }
      rec.inp.classList.toggle('ok', ok);
      rec.inp.classList.toggle('bad', !ok);
      rec.note.textContent = ok ? '' : L.fmt(want, rec.col.dp == null ? 0 : rec.col.dp);
      if (ok) right++; else wrong++;
    });
    if (cfg.flagCol) {
      $$('[data-flag]', t).forEach(function (cell) {
        var r = cfg.rows[parseInt(cell.getAttribute('data-flag'), 10)];
        var f = cfg.flag(r);
        cell.textContent = f.text;
        cell.className = 'rowflag ' + f.cls;
      });
    }
    fb.hidden = false;
    var msg = '<strong>' + right + ' correct';
    if (wrong) msg += ', ' + wrong + ' to look at again';
    msg += '. </strong>';
    if (blank) msg += blank + ' still blank. ';
    if (wrong) msg += 'The value in small type under a red box is the answer. ' + (cfg.wrongHint || '');
    else if (!blank) msg += (cfg.doneHint || 'Every value checks out.');
    fb.innerHTML = msg;
    L.wireTerms(fb);
    if (!blank && !wrong && cfg.onComplete) cfg.onComplete();
  }

  var kids = [];
  if (cfg.intro) kids.push(el('p', { html: cfg.intro }));
  if (cfg.legend) kids.push(el('p', { class: 'dt-legend', html: cfg.legend }));
  kids.push(el('div', { class: 'dt-wrap' }, t));
  kids.push(el('div', { class: 'btnrow' }, [
    el('button', { class: 'btn', type: 'button', text: 'Check my numbers', onclick: check })
  ]));
  kids.push(fb);
  return el('div', null, kids);
}
L.calcTable = calcTable;

/* =====================================================================
   PLOTTING
   One generic x against y figure. Weeks hand it curves, shaded bands and
   labeled points, and get back an SVG string with real axes, units and
   a text alternative.
   ===================================================================== */
function xy(cfg) {
  var W = cfg.w || 820, H = cfg.h || 440;
  var x0 = cfg.padL || 74, x1 = W - (cfg.padR || 26), y0 = cfg.padT || 22, y1 = H - (cfg.padB || 58);
  var X = cfg.x, Y = cfg.y;
  function px(v) { return x0 + (v - X.min) / (X.max - X.min) * (x1 - x0); }
  function py(v) { return y1 - (v - Y.min) / (Y.max - Y.min) * (y1 - y0); }
  var F = L.SVG_FONT;
  var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + cfg.aria + '">';

  /* shaded bands behind everything */
  (cfg.bands || []).forEach(function (b) {
    if (b.x != null) {
      s += '<rect x="' + fmt(px(b.x[0]), 1) + '" y="' + y0 + '" width="' + fmt(px(b.x[1]) - px(b.x[0]), 1) +
        '" height="' + (y1 - y0) + '" fill="' + (b.fill || 'rgba(201,161,74,.16)') + '"/>';
    } else {
      s += '<rect x="' + x0 + '" y="' + fmt(py(b.y[1]), 1) + '" width="' + (x1 - x0) + '" height="' +
        fmt(py(b.y[0]) - py(b.y[1]), 1) + '" fill="' + (b.fill || 'rgba(201,161,74,.16)') + '"/>';
    }
  });

  /* grid and ticks */
  (Y.ticks || []).forEach(function (v) {
    s += '<line x1="' + x0 + '" y1="' + fmt(py(v), 1) + '" x2="' + x1 + '" y2="' + fmt(py(v), 1) +
      '" stroke="' + C.ruleSoft + '" stroke-width="1"/>';
    s += '<text x="' + (x0 - 10) + '" y="' + fmt(py(v) + 4, 1) + '" text-anchor="end" font-size="11.5" fill="' +
      C.muted + '" font-family="' + F + '">' + v + '</text>';
  });
  (X.ticks || []).forEach(function (v) {
    s += '<line x1="' + fmt(px(v), 1) + '" y1="' + y1 + '" x2="' + fmt(px(v), 1) + '" y2="' + (y1 + 5) +
      '" stroke="' + C.rule + '" stroke-width="1"/>';
    s += '<text x="' + fmt(px(v), 1) + '" y="' + (y1 + 20) + '" text-anchor="middle" font-size="11.5" fill="' +
      C.muted + '" font-family="' + F + '">' + v + '</text>';
  });

  /* axes */
  s += '<line x1="' + x0 + '" y1="' + y0 + '" x2="' + x0 + '" y2="' + y1 + '" stroke="' + C.ink + '" stroke-width="1.5"/>';
  s += '<line x1="' + x0 + '" y1="' + y1 + '" x2="' + x1 + '" y2="' + y1 + '" stroke="' + C.ink + '" stroke-width="1.5"/>';
  s += '<text x="' + ((x0 + x1) / 2) + '" y="' + (y1 + 44) + '" text-anchor="middle" font-size="12.5" font-weight="700" fill="' +
    C.ink + '" font-family="' + F + '">' + X.label + '</text>';
  var ym = (y0 + y1) / 2, yx = x0 - 52;
  s += '<text x="' + yx + '" y="' + ym + '" text-anchor="middle" font-size="12.5" font-weight="700" fill="' + C.ink +
    '" font-family="' + F + '" transform="rotate(-90 ' + yx + ' ' + ym + ')">' + Y.label + '</text>';

  /* guide lines. Labels carry a white outline underneath the glyphs so
     they stay readable wherever a line happens to run behind them. */
  var HALO = ' paint-order="stroke" stroke="#ffffff" stroke-width="3.5" stroke-linejoin="round"';
  (cfg.guides || []).forEach(function (g) {
    if (g.y != null) {
      s += '<line x1="' + x0 + '" y1="' + fmt(py(g.y), 1) + '" x2="' + x1 + '" y2="' + fmt(py(g.y), 1) +
        '" stroke="' + (g.color || C.rule) + '" stroke-width="1.5" stroke-dasharray="5 4"/>';
      if (g.label) s += '<text x="' + (x0 + 8) + '" y="' + fmt(py(g.y) - 7, 1) + '" font-size="11.5" font-weight="700" fill="' +
        (g.color || C.muted) + '" font-family="' + F + '"' + HALO + '>' + g.label + '</text>';
    } else {
      s += '<line x1="' + fmt(px(g.x), 1) + '" y1="' + y0 + '" x2="' + fmt(px(g.x), 1) + '" y2="' + y1 +
        '" stroke="' + (g.color || C.rule) + '" stroke-width="1.5" stroke-dasharray="5 4"/>';
      if (g.label) {
        var gy = g.pos === 'bottom' ? (y1 - 8) : (y0 + 14);
        var near = px(g.x) > (x1 - 70);
        s += '<text x="' + fmt(px(g.x) + (near ? -6 : 6), 1) + '" y="' + gy + '"' + (near ? ' text-anchor="end"' : '') +
          ' font-size="11.5" font-weight="700" fill="' + (g.color || C.muted) + '" font-family="' + F + '"' + HALO + '>' + g.label + '</text>';
      }
    }
  });

  /* curves */
  (cfg.series || []).forEach(function (ser) {
    var d = ser.pts.map(function (p, i) {
      return (i ? 'L' : 'M') + fmt(px(p[0]), 1) + ' ' + fmt(py(p[1]), 1);
    }).join(' ');
    s += '<path d="' + d + '" fill="none" stroke="' + (ser.color || C.terra) + '" stroke-width="' +
      (ser.width || 2.6) + '"' + (ser.dash ? ' stroke-dasharray="' + ser.dash + '"' : '') +
      ' stroke-linecap="round" stroke-linejoin="round"/>';
  });

  /* labeled points */
  (cfg.marks || []).forEach(function (m) {
    var cx = px(m.x), cy = py(m.y);
    s += '<circle cx="' + fmt(cx, 1) + '" cy="' + fmt(cy, 1) + '" r="6" fill="' + (m.color || C.navy) + '" stroke="#fff" stroke-width="2"/>';
    if (m.label) {
      var dx = m.dx == null ? 12 : m.dx, dy = m.dy == null ? -10 : m.dy;
      s += '<text x="' + fmt(cx + dx, 1) + '" y="' + fmt(cy + dy, 1) + '" font-size="12" font-weight="700" fill="' +
        (m.color || C.navy) + '" font-family="' + F + '"' + (m.anchor ? ' text-anchor="' + m.anchor + '"' : '') +
        ' paint-order="stroke" stroke="#ffffff" stroke-width="3.5" stroke-linejoin="round">' + m.label + '</text>';
    }
  });

  s += '</svg>';
  return s;
}
L.xy = xy;

/* =====================================================================
   WRITTEN TEST
   ===================================================================== */
function testPanel(cfg) {
  /* cfg: {root, bank:[{o,q,a[],c,e}], objectives:{key:label}, where:{key:text}, intro} */
  var root = $('#' + cfg.root);
  root.innerHTML = '';
  var order = L.shuffle(cfg.bank.map(function (_, i) { return i; }));
  var idx = 0;
  L.testMeta = { objectives: cfg.objectives, where: cfg.where };

  root.appendChild(el('div', { class: 'panel-intro' }, [
    el('h2', { text: 'Test yourself' }),
    el('p', {
      text: cfg.intro || (cfg.bank.length + ' questions covering everything in this lab, in random order, one at a time. ' +
        'Each answer is explained as soon as you commit to it, and your score is broken down by topic on the results page ' +
        'so you can see exactly which idea needs another pass.')
    })
  ]));

  var bar = el('span', { style: 'width:0%' });
  var counter = el('p', { class: 'note', 'aria-live': 'polite' });
  var qslot = el('div');
  root.appendChild(el('div', { class: 'card tight' }, [counter, el('div', { class: 'progress' }, bar)]));
  root.appendChild(qslot);

  function next() {
    qslot.innerHTML = '';
    if (idx >= order.length) {
      counter.textContent = 'Test complete. ' + L.quiz.right + ' correct out of ' + L.quiz.asked + '.';
      bar.style.width = '100%';
      qslot.appendChild(el('div', { class: 'card' }, [
        el('h3', { text: 'Finished' }),
        el('p', { text: 'Your results page breaks this down by topic, alongside everything you did in the labs, and it can be saved as a PDF to hand in.' }),
        el('div', { class: 'btnrow' }, [
          el('button', { class: 'btn', type: 'button', text: 'See my results', onclick: function () { L.showTab('report', true); } }),
          el('button', { class: 'btn sec', type: 'button', text: 'Run the test again', onclick: function () { testPanel(cfg); } })
        ])
      ]));
      return;
    }
    var q = cfg.bank[order[idx]];
    counter.textContent = 'Question ' + (idx + 1) + ' of ' + order.length + '. Topic: ' +
      cfg.objectives[q.o] + '. Score so far ' + L.quiz.right + ' of ' + L.quiz.asked + '.';
    bar.style.width = Math.round(100 * idx / order.length) + '%';
    var nextBtn = el('div', { class: 'btnrow' });
    var qcard = el('div', { class: 'qcard' }, [
      el('p', { class: 'kicker', text: cfg.objectives[q.o] }),
      L.mcq({
        stem: q.q, options: q.a, correct: q.c, explain: q.e,
        onAnswer: function (right) {
          var b = L.quiz;
          b.asked++; if (right) b.right++;
          if (!b.byObjective[q.o]) b.byObjective[q.o] = { right: 0, asked: 0 };
          b.byObjective[q.o].asked++; if (right) b.byObjective[q.o].right++;
          if (!right) b.missed.push({ o: q.o, q: q.q, a: q.a[q.c], e: q.e });
          nextBtn.appendChild(el('button', {
            class: 'btn', type: 'button',
            text: idx + 1 >= order.length ? 'Finish and see results' : 'Next question',
            onclick: function () { idx++; next(); }
          }));
          nextBtn.querySelector('button').focus();
          var rp = $('#report-root');
          if (rp && rp.dataset.built === '1') L.renderReport();
        }
      }),
      nextBtn
    ]);
    qslot.appendChild(qcard);
    L.wireTerms(qcard);
  }
  next();
}
L.testPanel = testPanel;

/* =====================================================================
   RESULTS AND PDF SUBMISSION
   Nothing typed on this page is stored or sent anywhere. The name field
   exists only so the printed PDF can be matched to a student.
   ===================================================================== */
function renderReport() {
  var root = $('#report-root');
  if (!root) return;
  root.innerHTML = '';
  root.dataset.built = '1';

  var sections = L.buckets().slice();
  var totalRight = 0, totalAsked = 0;
  sections.forEach(function (b) { totalRight += b.right; totalAsked += b.asked; });
  totalRight += L.quiz.right; totalAsked += L.quiz.asked;

  root.appendChild(el('div', { class: 'panel-intro' }, [
    el('h2', { text: 'My results' }),
    el('p', { text: 'Everything you have answered in this session, in one place. Nothing here is stored or sent anywhere. Closing the page clears it, so save this page as a PDF if it needs to be handed in.' })
  ]));

  root.appendChild(el('div', { class: 'readout', style: 'margin-bottom:18px' }, [
    el('div', { class: 'stat' }, [el('span', { class: 'lab', text: 'Total answered' }), el('span', { class: 'val', text: String(totalAsked) })]),
    el('div', { class: 'stat' }, [el('span', { class: 'lab', text: 'Correct' }), el('span', { class: 'val', text: String(totalRight) })]),
    el('div', { class: 'stat' }, [el('span', { class: 'lab', text: 'Overall' }), el('span', { class: 'val', text: totalAsked ? Math.round(100 * totalRight / totalAsked) + '%' : 'Not started' })])
  ]));

  var rows = sections.map(function (b) {
    var p = b.asked ? Math.round(100 * b.right / b.asked) : null;
    return '<tr><td>' + b.label + '</td><td class="num">' + b.right + '</td><td class="num">' + b.asked +
      '</td><td class="num">' + (p == null ? 'not attempted' : p + '%') + '</td></tr>';
  });
  var qp = L.quiz.asked ? Math.round(100 * L.quiz.right / L.quiz.asked) : null;
  rows.push('<tr><td>Written test</td><td class="num">' + L.quiz.right + '</td><td class="num">' + L.quiz.asked +
    '</td><td class="num">' + (qp == null ? 'not attempted' : qp + '%') + '</td></tr>');

  var t = el('table');
  t.innerHTML = '<caption>By activity</caption><thead><tr><th scope="col">Activity</th><th class="num" scope="col">Correct</th>' +
    '<th class="num" scope="col">Answered</th><th class="num" scope="col">Percent</th></tr></thead><tbody>' + rows.join('') + '</tbody>';
  root.appendChild(el('div', { class: 'card scroll-x' }, t));

  var meta = L.testMeta || { objectives: {}, where: {} };
  if (Object.keys(L.quiz.byObjective).length) {
    var t2 = el('table');
    t2.innerHTML = '<caption>Written test, by topic</caption><thead><tr><th scope="col">Topic</th>' +
      '<th class="num" scope="col">Correct</th><th class="num" scope="col">Answered</th><th scope="col">Where to go back to</th></tr></thead><tbody>' +
      Object.keys(L.quiz.byObjective).map(function (k) {
        var b = L.quiz.byObjective[k];
        return '<tr><td>' + meta.objectives[k] + '</td><td class="num">' + b.right + '</td><td class="num">' + b.asked +
          '</td><td class="note">' + (meta.where[k] || '') + '</td></tr>';
      }).join('') + '</tbody>';
    root.appendChild(el('div', { class: 'card scroll-x' }, t2));
  }

  /* The chart the student actually filled in, reproduced as they left it. */
  if (L.charted && L.charted.length) {
    var ct = el('table');
    ct.innerHTML = '<caption>Your chart</caption><thead><tr><th scope="col">Section</th>' +
      '<th scope="col">Measurement</th><th scope="col">Value</th><th scope="col">Your reading</th></tr></thead><tbody>' +
      L.charted.map(function (r) {
        return '<tr><td class="note">' + r.group + '</td><td>' + r.label + '</td><td>' + r.value +
          '</td><td>' + r.reading + '</td></tr>';
      }).join('') + '</tbody>';
    root.appendChild(el('div', { class: 'card scroll-x' }, ct));
  }

  /* The note, in the student's own words where they wrote them. */
  if (L.noted && L.noted.length) {
    var kids2 = [el('h3', { text: 'Your note' })];
    L.noted.forEach(function (n) {
      kids2.push(el('div', { class: 'surface', style: 'margin-bottom:10px' }, [
        el('p', { class: 'kicker', text: n.section }),
        el('p', { style: 'margin-bottom:0', text: n.answer })
      ]));
    });
    root.appendChild(el('div', { class: 'card' }, kids2));
  }

  /* The working itself, which is the point of the worked steps. An
     instructor can see every intermediate value a student entered and how
     many attempts each one took, which is far more useful than a score. */
  if (L.working && L.working.length) {
    var wt = el('table');
    wt.innerHTML = '<caption>Your working, step by step</caption><thead><tr>' +
      '<th scope="col">Task</th><th scope="col">Step</th><th class="num" scope="col">You entered</th>' +
      '<th class="num" scope="col">Attempts</th></tr></thead><tbody>' +
      L.working.map(function (w) {
        return '<tr><td class="note">' + w.task + '</td><td>' + w.step + '</td><td class="num">' +
          w.entered + '</td><td class="num">' + w.attempts + '</td></tr>';
      }).join('') + '</tbody>';
    root.appendChild(el('div', { class: 'card scroll-x' }, [
      wt,
      el('p', { class: 'note', style: 'margin:12px 0 0' , text:
        'Attempts are not a penalty. Getting a step wrong twice and then reasoning your way to it is worth more than getting it right first time by luck, and this table is where that shows.' })
    ]));
  }

  if (L.quiz.missed.length) {
    var kids = [el('h3', { text: 'Questions you missed, with the reasoning' })];
    L.quiz.missed.forEach(function (m) {
      kids.push(el('div', { class: 'surface', style: 'margin-bottom:10px' }, [
        el('p', { class: 'kicker', text: meta.objectives[m.o] }),
        el('p', { style: 'font-weight:600;margin-bottom:4px', html: m.q }),
        el('p', { style: 'margin-bottom:4px', html: '<strong>Correct answer.</strong> ' + m.a }),
        el('p', { style: 'margin-bottom:0', class: 'note', html: m.e })
      ]));
    });
    var missCard = el('div', { class: 'card' }, kids);
    root.appendChild(missCard);
    L.wireTerms(missCard);
  }

  root.appendChild(submitCard());
}

function submitCard() {
  var head = $('#submit-head');
  if (!head) {
    head = el('div', { class: 'submit-head', id: 'submit-head' });
    $('#panel-report .wrap').appendChild(head);
  }
  var cfg = L.cfg();

  var nameIn = el('input', { type: 'text', id: 'sub-name', autocomplete: 'off', placeholder: 'First and last name' });
  var sectIn = el('input', { type: 'text', id: 'sub-section', autocomplete: 'off', placeholder: 'For example BIO 005 section D9286' });
  var caseIn = el('input', { type: 'text', id: 'sub-case', autocomplete: 'off', value: L.caseNumber || '', placeholder: 'The number on your dataset' });

  function stamp() {
    var d = new Date();
    var date = d.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    head.innerHTML = '';
    head.appendChild(el('p', {
      class: 'sh-line', style: 'margin:0 0 2px',
      text: (nameIn.value || 'Name not entered') + (sectIn.value ? '.  ' + sectIn.value : '')
    }));
    head.appendChild(el('p', {
      class: 'note', style: 'margin:0',
      text: (cfg.weekLabel ? cfg.weekLabel + '.  ' : '') + cfg.title + '.  ' + date +
        (caseIn.value ? '.  Dataset ' + caseIn.value : '')
    }));
  }
  [nameIn, sectIn, caseIn].forEach(function (i) { i.addEventListener('input', stamp); });
  stamp();

  return el('div', { class: 'card' }, [
    el('p', { class: 'kicker', text: 'Submit' }),
    el('h3', { text: 'Save this page as a PDF and hand it in' }),
    el('p', { text: 'Put your name on it first, then save. The PDF carries your name, the date, your dataset number, your score by activity and by topic, and every question you missed with the reasoning underneath it.' }),
    el('div', { class: 'grid g3' }, [
      el('div', { class: 'field' }, [el('label', { for: 'sub-name', text: 'Your name' }), nameIn]),
      el('div', { class: 'field' }, [el('label', { for: 'sub-section', text: 'Course and section' }), sectIn]),
      el('div', { class: 'field' }, [el('label', { for: 'sub-case', text: 'Your dataset number' }), caseIn])
    ]),
    el('p', { class: 'note', text: 'What you type here never leaves this browser tab. It is not saved, not stored, and not sent anywhere. It is printed onto the page so your work can be identified, and it disappears the moment you close the tab.' }),
    el('div', { class: 'btnrow' }, [
      el('button', {
        class: 'btn', type: 'button', text: 'Save as PDF to submit',
        onclick: function () {
          stamp();
          if (!nameIn.value) {
            nameIn.focus();
            var m = $('#sub-msg'); if (m) m.textContent = 'Add your name first, otherwise the PDF cannot be matched to you.';
            return;
          }
          window.print();
        }
      })
    ]),
    el('p', { class: 'note', id: 'sub-msg', 'aria-live': 'polite', style: 'margin:10px 0 0' }),
    el('p', { class: 'note', style: 'margin-bottom:0', text: 'In the print dialog choose Save as PDF as the destination, or Print to PDF on Windows. On a phone, choose Share then Save to Files.' })
  ]);
}
L.renderReport = renderReport;

/* =====================================================================
   BOOT
   ===================================================================== */
L.start = function (buildAll) {
  document.addEventListener('DOMContentLoaded', function () {
    L.initShell();
    buildAll();
    L.renderReport();
    L.wireTerms(document.body);
    /* anything rendered later, such as a revealed answer or a dealt case,
       gets its terms wired as soon as it lands */
    if (window.MutationObserver) {
      var mo = new MutationObserver(function (recs) {
        recs.forEach(function (r) {
          Array.prototype.slice.call(r.addedNodes).forEach(function (n) {
            if (n.nodeType === 1 && n.querySelector && n.querySelector('t')) L.wireTerms(n);
          });
        });
      });
      mo.observe(document.body, { childList: true, subtree: true });
    }
  });
};
})();
