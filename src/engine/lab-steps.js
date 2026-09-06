/* =====================================================================
   THE CLINICAL PHYSIOLOGY LAB, shared engine
   Part 3 of 3: the two components that make a student do the thinking.

   WORKED STEPS
   A calculation broken into the intermediate values. The box for the
   final answer does not accept anything until every step above it is
   right, so knowing the answer is not the same as being able to enter
   it. Each step carries traps: specific wrong values that correspond to
   specific misunderstandings, answered by name rather than by a generic
   "not quite".

   ELIMINATE
   A multiple choice question where picking the right answer is half the
   task. The other half is saying what is actually wrong with each of the
   options you did not pick.

   Neither component puts an answer anywhere in the page. Every correct
   value is computed at the moment a student presses check, from a
   function, against what they typed.
   ===================================================================== */
(function () {
'use strict';
var L = window.LAB, el = L.el, $ = L.$, $$ = L.$$, fmt = L.fmt;

/* the working a student actually did, for the printed results page */
L.working = [];

/* =====================================================================
   WORKED STEPS
   cfg: {
     title, intro, legend, ctx, bucket, onComplete,
     steps: [{
       label, prompt, unit, dp, tol,
       answer: function (ctx) { return <number>; },
       traps: [{ val: function (ctx) {...}, say: '...' }],
       method: 'shown after three misses, describes how, never the value'
     }]
   }
   ===================================================================== */
function workedSteps(cfg) {
  var rows = [];
  var doneCount = 0;
  var wrap = el('div', { class: 'ws' });
  var live = el('p', { class: 'note', 'aria-live': 'polite', style: 'margin:14px 0 0' });

  cfg.steps.forEach(function (st, i) {
    var id = 'ws-' + cfg.id + '-' + i;
    var input = el('input', {
      type: 'text', inputmode: 'decimal', id: id, autocomplete: 'off',
      disabled: i > 0
    });
    var btn = el('button', {
      class: 'btn sm', type: 'button', text: 'Check', disabled: i > 0,
      onclick: function () { check(i); }
    });
    var fb = el('p', { class: 'ws-fb', 'aria-live': 'polite' });
    fb.hidden = true;
    var lockNote = el('p', { class: 'ws-lock' });
    lockNote.innerHTML =
      '<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">' +
      '<path d="M4.5 7V5a3.5 3.5 0 0 1 7 0v2" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>' +
      '<rect x="2.6" y="7" width="10.8" height="7.4" rx="1.6" fill="currentColor"/></svg>' +
      '<span>Opens when step ' + i + ' is right.</span>';
    lockNote.hidden = i === 0;

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { e.preventDefault(); check(i); }
    });

    var row = el('div', { class: 'ws-step' + (i > 0 ? ' locked' : '') }, [
      el('span', { class: 'ws-n', text: String(i + 1) }),
      el('div', { class: 'ws-body' }, [
        el('label', { class: 'ws-label', for: id, text: st.label }),
        st.prompt ? el('p', { class: 'ws-prompt', html: st.prompt }) : null,
        el('div', { class: 'ws-entry' }, [
          input,
          st.unit ? el('span', { class: 'ws-unit', text: st.unit }) : null,
          btn
        ]),
        lockNote, fb
      ])
    ]);
    rows.push({ st: st, input: input, btn: btn, fb: fb, row: row, lock: lockNote, misses: 0, done: false });
    wrap.appendChild(row);
  });

  function open(i) {
    if (i >= rows.length) return;
    var r = rows[i];
    r.input.disabled = false;
    r.btn.disabled = false;
    r.row.classList.remove('locked');
    r.lock.hidden = true;
  }

  function check(i) {
    var r = rows[i];
    if (r.done) return;
    var raw = r.input.value.trim();
    if (raw === '') {
      r.fb.hidden = false;
      r.fb.className = 'ws-fb warn';
      r.fb.textContent = 'Put a number in first.';
      return;
    }
    var got = parseFloat(raw);
    var want = r.st.answer(cfg.ctx);
    var tol = r.st.tol == null ? 0.5 : r.st.tol;
    var dp = r.st.dp == null ? 0 : r.st.dp;

    if (!isNaN(got) && Math.abs(got - want) <= tol) {
      r.done = true; doneCount++;
      r.input.readOnly = true;
      r.input.classList.add('ok');
      r.btn.hidden = true;
      r.row.classList.add('done');
      r.fb.hidden = false;
      r.fb.className = 'ws-fb ok';
      r.fb.innerHTML = '<strong>Right. </strong>' + (r.st.after || '');
      L.wireTerms(r.fb);
      if (cfg.bucket) L.score(cfg.bucket, r.misses === 0);
      L.working.push({
        task: cfg.title, step: r.st.label,
        entered: raw, attempts: r.misses + 1
      });
      if (i + 1 < rows.length) {
        open(i + 1);
        live.textContent = 'Step ' + (i + 1) + ' is right. Step ' + (i + 2) + ' is now open.';
        rows[i + 1].input.focus();
      } else {
        live.textContent = 'Every step checks out.';
        if (cfg.onComplete) cfg.onComplete();
      }
      return;
    }

    /* wrong. Name the specific misunderstanding if we can recognize it. */
    r.misses++;
    r.input.classList.add('bad');
    r.fb.hidden = false;
    r.fb.className = 'ws-fb bad';
    var named = null;
    (r.st.traps || []).forEach(function (t) {
      if (named) return;
      var tv = t.val(cfg.ctx);
      if (!isNaN(got) && Math.abs(got - tv) <= Math.max(tol, 0.6)) named = t.say;
    });
    var msg = named
      ? '<strong>Not that. </strong>' + named
      : '<strong>Not yet. </strong>' + (r.st.miss || 'Check the numbers you are working from, and check which operation the step is asking for.');
    if (r.misses >= 3 && r.st.method) {
      msg += '<br><br><strong>How this step works.</strong> ' + r.st.method;
    } else if (r.misses === 2) {
      msg += ' Two more tries and I will walk you through the method.';
    }
    r.fb.innerHTML = msg;
    L.wireTerms(r.fb);
    if (cfg.bucket) L.score(cfg.bucket, false);
    r.input.select();
  }

  var kids = [];
  if (cfg.title) kids.push(el('h3', { text: cfg.title }));
  if (cfg.intro) kids.push(el('p', { html: cfg.intro }));
  kids.push(el('p', { class: 'ws-rule', html:
    '<strong>Every step, in order.</strong> The box for the answer stays shut until the working above it is right. ' +
    'There is no way round it, and there is nothing on this page to copy: your numbers are yours, and the checks happen when you press the button.' }));
  if (cfg.legend) kids.push(el('p', { class: 'note', html: cfg.legend }));
  kids.push(wrap);
  kids.push(live);
  return el('div', null, kids);
}
L.workedSteps = workedSteps;

/* =====================================================================
   ELIMINATE
   cfg: {
     stem, extra,
     options: [{ text, correct:true, why } | { text, flaw:'<reason id>' }],
     reasons: [{ id, text }],          // includes a decoy or two
     bucket, onComplete
   }
   ===================================================================== */
function eliminate(cfg) {
  var picked = false;
  var listEl = el('ul', { class: 'opts' });
  var fb = el('div', { class: 'fb', 'aria-live': 'polite' }); fb.hidden = true;
  var phase2 = el('div');
  var buttons = [];
  var correctIdx = -1;
  cfg.options.forEach(function (o, i) { if (o.correct) correctIdx = i; });

  cfg.options.forEach(function (o, i) {
    var b = el('button', {
      class: 'opt', type: 'button',
      onclick: function () {
        if (picked) return;
        picked = true;
        var right = i === correctIdx;
        buttons.forEach(function (bb, j) {
          bb.disabled = true;
          if (j === correctIdx) bb.className = 'opt correct';
          else if (j === i) bb.className = 'opt wrong';
        });
        fb.hidden = false;
        fb.innerHTML = '<strong>' + (right ? 'Correct. ' : 'Not that one. ') + '</strong>' +
          cfg.options[correctIdx].why;
        L.wireTerms(fb);
        if (cfg.bucket) L.score(cfg.bucket, right);
        buildPhase2();
      }
    }, [el('span', { class: 'ltr', text: 'ABCDEF'[i] }), el('span', { text: o.text })]);
    buttons.push(b);
    listEl.appendChild(el('li', null, b));
  });

  function buildPhase2() {
    var wrongs = cfg.options.map(function (o, i) { return { o: o, i: i }; })
      .filter(function (r) { return !r.o.correct; });
    var remaining = wrongs.length;
    var pool = L.shuffle(cfg.reasons);

    var head = el('div', { class: 'elim-head' }, [
      el('span', { class: 'stepnum alt', text: 'Now the other half' }),
      el('p', {
        style: 'font-weight:600;margin-bottom:4px',
        text: 'Knowing which one is right is not the same as knowing why the others are wrong. Say what is actually wrong with each one.'
      }),
      el('p', { class: 'note', text: 'One reason fits each option. Some reasons in the list fit nothing at all.' })
    ]);
    phase2.appendChild(head);

    wrongs.forEach(function (r) {
      var selId = 'el-' + (cfg.id || 'q') + '-' + r.i;
      var sel = el('select', { id: selId });
      sel.appendChild(el('option', { value: '', text: 'Choose what is wrong with this one' }));
      pool.forEach(function (rs) {
        sel.appendChild(el('option', { value: rs.id, text: rs.text }));
      });
      var rfb = el('p', { class: 'ws-fb', 'aria-live': 'polite' }); rfb.hidden = true;
      var settled = false;
      var tries = 0;

      sel.addEventListener('change', function () {
        if (settled || !sel.value) return;
        tries++;
        var right = sel.value === r.o.flaw;
        rfb.hidden = false;
        if (right) {
          settled = true;
          sel.disabled = true;
          sel.classList.add('ok');
          rfb.className = 'ws-fb ok';
          rfb.innerHTML = '<strong>Yes. </strong>' + (r.o.because || '');
          L.wireTerms(rfb);
          if (cfg.bucket) L.score(cfg.bucket, tries === 1);
          remaining--;
          if (remaining === 0) {
            phase2.appendChild(el('div', { class: 'fb' }, [
              el('p', { style: 'margin:0', html: '<strong>That is the whole question answered.</strong> ' +
                (cfg.close || 'Every wrong option was wrong for its own reason, and none of those reasons was the same as the others.') })
            ]));
            if (cfg.onComplete) cfg.onComplete();
          }
        } else {
          sel.classList.add('bad');
          rfb.className = 'ws-fb bad';
          rfb.innerHTML = '<strong>That is not the problem with this one. </strong>' +
            'Read the option again and ask what it would take to be true.';
          if (cfg.bucket) L.score(cfg.bucket, false);
        }
      });

      phase2.appendChild(el('div', { class: 'elim-row' }, [
        el('p', { class: 'elim-opt', html: '<b>' + 'ABCDEF'[r.i] + '.</b> ' + r.o.text }),
        el('label', { class: 'sr-only', for: selId, text: 'What is wrong with option ' + 'ABCDEF'[r.i] }),
        sel, rfb
      ]));
    });
  }

  return el('div', null, [
    el('p', { html: cfg.stem, style: 'font-weight:600;margin-bottom:2px' }),
    cfg.extra || null, listEl, fb, phase2
  ]);
}
L.eliminate = eliminate;

/* =====================================================================
   DECOYS
   Other readings recorded on the same shift. They are plausible, they
   are labeled as other patients, and they are not this student's
   numbers. A page scrape, a select all, or a screenshot pasted into a
   chatbot carries them along with the real reading, and nothing in the
   markup says which is which.
   ===================================================================== */
function decoys(rnd, n) {
  var out = [];
  for (var i = 0; i < (n || 8); i++) {
    var d = 48 + Math.floor(rnd() * 46);
    var s = d + 22 + Math.floor(rnd() * 62);
    out.push({ sbp: s, dbp: d, hr: 52 + Math.floor(rnd() * 72) });
  }
  return out;
}
function decoyLine(list) {
  return el('p', { class: 'decoy' }, [
    el('span', { class: 'decoy-k', text: 'Also recorded this shift' }),
    el('span', {
      text: list.map(function (d) { return d.sbp + '/' + d.dbp + ' (' + d.hr + ')'; }).join('  ·  ')
    })
  ]);
}
L.decoys = decoys;
L.decoyLine = decoyLine;

/* =====================================================================
   STEP RAIL
   The progress spine down a walkthrough. Each step reports done or not,
   and a locked step says what has to happen first rather than going
   silent.
   ===================================================================== */
function stepRail(steps) {
  var rail = el('ol', { class: 'rail', 'aria-label': 'Steps in this case' });
  var nodes = [];
  steps.forEach(function (s, i) {
    var li = el('li', { class: 'rail-item' + (i === 0 ? ' now' : '') }, [
      el('span', { class: 'rail-n', text: String(i + 1) }),
      el('span', { class: 'rail-t', text: s })
    ]);
    nodes.push(li);
    rail.appendChild(li);
  });
  return {
    node: rail,
    mark: function (i) {
      nodes.forEach(function (n, j) {
        n.classList.toggle('done', j < i + 1);
        n.classList.toggle('now', j === i + 1);
      });
      if (nodes[i]) {
        var t = nodes[i].querySelector('.rail-t');
        if (!nodes[i].querySelector('.sr-only')) {
          nodes[i].appendChild(el('span', { class: 'sr-only', text: ', done' }));
        }
      }
    }
  };
}
L.stepRail = stepRail;
})();
