/* ============================================================
   BIO 005 Human Physiology, Yuba College, Fall 2026
   readiness-check-view.js

   Renders the two readiness boxes on before-you-start.html from
   the data in readiness-check.js.

   THE FLOW, AND WHY IT IS THIS WAY

     1. Start.   A sentence and a button. Nothing to read.
     2. Quiz.    Ten or eleven questions, one at a time.
     3. Answer.  Either "you are good to go" or a short review of
                 only what they missed.

   The first build of this page put the whole concept list on screen
   next to the quiz, before the student had answered anything. That
   is backwards. A student who already knows this material should
   never see the list at all, and a student who does not should see
   the three things they missed, not eighteen things they might
   need. The list is still reachable, behind a link, for anyone who
   wants to read all of it.

   SCORED BY CONCEPT, NOT ONLY BY TOTAL
   Seven right by answering every easy question is a different
   situation from seven right spread across all three levels. The
   review is built from the concepts actually missed, so it is short
   and it is theirs.

   STORAGE
   Last result per box, in this browser only, under
   bio005-readiness-<key>. Nothing is submitted. The instructor never
   sees it. Wrapped in try/catch so blocked storage degrades to
   session only rather than throwing.
   ============================================================ */

(function () {
  'use strict';

  var DATA = window.BIO005_READINESS;
  if (!DATA) return;

  function esc(t) {
    var d = document.createElement('div');
    d.textContent = t == null ? '' : String(t);
    return d.innerHTML;
  }

  function loadResult(key) {
    try { return JSON.parse(localStorage.getItem('bio005-readiness-' + key)) || null; }
    catch (e) { return null; }
  }
  function saveResult(key, obj) {
    try {
      if (obj) localStorage.setItem('bio005-readiness-' + key, JSON.stringify(obj));
      else localStorage.removeItem('bio005-readiness-' + key);
    } catch (e) { /* storage unavailable, this session only */ }
  }

  function verdictFor(score, total) {
    /* Bands are written against a ten item check. Scale so an eleven
       item check is judged on the same footing. */
    var scaled = Math.round((score / total) * 10);
    for (var i = 0; i < DATA.verdicts.length; i++) {
      if (scaled >= DATA.verdicts[i].min) return DATA.verdicts[i];
    }
    return DATA.verdicts[DATA.verdicts.length - 1];
  }

  /* UNIT FILTER
     A unit page passes its number and gets only the concepts that unit
     uses and only the questions written at that unit's depth. The same
     concept turns up in several units: pH is "what does the scale mean"
     in unit 1 and a compensating patient in unit 5, and those are two
     different questions carrying the same concept id. Filtering on the
     question's own units array is what keeps them apart. Passing no
     unit gives the whole set, which is what the course-wide page uses. */
  function forUnit(set, unit) {
    if (!unit) return set;
    var concepts = set.concepts.filter(function (c) {
      return c.units && c.units.indexOf(unit) !== -1;
    });
    var ids = concepts.map(function (c) { return c.id; });
    return {
      key: set.key + '-u' + unit,
      title: set.title,
      blurb: set.blurb,
      concepts: concepts,
      questions: set.questions.filter(function (q) {
        return q.units && q.units.indexOf(unit) !== -1 && ids.indexOf(q.concept) !== -1;
      })
    };
  }

  function build(setIn, mountId, unit) {
    var mount = document.getElementById(mountId);
    if (!mount) return;
    var set = forUnit(setIn, unit);
    if (!set.questions.length) {
      mount.innerHTML = '<div class="rd-panel"><p class="rd-sub">' +
        'No check for this one yet.</p></div>';
      return;
    }

    var answers = {};
    var at = 0;

    function conceptById(id) {
      return set.concepts.filter(function (c) { return c.id === id; })[0];
    }

    /* ---------- 1. start ---------- */
    function renderStart() {
      var prev = loadResult(set.key);
      mount.innerHTML =
        '<div class="rd-panel rd-start">' +
          '<p class="rd-blurb">' + esc(set.blurb) + '</p>' +
          (prev ? '<p class="rd-prev">Last time you got ' + esc(prev.score) + ' of ' + esc(prev.total) +
                  ' on ' + esc(prev.when) + '.</p>' : '') +
          '<p class="rd-sub">' + set.questions.length + ' questions. About five minutes. ' +
            'Not graded, and I never see it.</p>' +
          '<div class="rd-bar">' +
            '<button type="button" class="rd-btn rd-btn-primary" data-start>' +
              (prev ? 'Take it again' : 'Start the check') + '</button>' +
            (prev ? '<button type="button" class="rd-btn" data-showlast>Show my last result</button>' : '') +
            '<button type="button" class="rd-btn" data-showall>Just show me the list</button>' +
          '</div>' +
        '</div>';

      mount.querySelector('[data-start]').addEventListener('click', function () {
        answers = {}; at = 0; renderQuestion();
      });
      var last = mount.querySelector('[data-showlast]');
      if (last) last.addEventListener('click', function () { renderResult(prev); });
      mount.querySelector('[data-showall]').addEventListener('click', function () { renderFullList(); });
    }

    /* ---------- 2. one question at a time ---------- */
    function renderQuestion() {
      var q = set.questions[at];
      mount.innerHTML =
        '<div class="rd-panel">' +
          '<p class="rd-progress">Question ' + (at + 1) + ' of ' + set.questions.length + '</p>' +
          '<div class="rd-track" aria-hidden="true"><span style="width:' +
            Math.round((at / set.questions.length) * 100) + '%"></span></div>' +
          '<p class="rd-stem">' + esc(q.q) + '</p>' +
          '<div class="rd-opts" role="group" aria-label="Answers">' +
            q.options.map(function (o, oi) {
              return '<button type="button" class="rd-opt" data-i="' + oi + '">' + esc(o) + '</button>';
            }).join('') +
          '</div>' +
          '<p class="rd-why" hidden></p>' +
          '<div class="rd-bar" hidden data-next-bar>' +
            '<button type="button" class="rd-btn rd-btn-primary" data-next>' +
              (at === set.questions.length - 1 ? 'See what to do' : 'Next question') + '</button>' +
          '</div>' +
        '</div>';

      var opts = Array.prototype.slice.call(mount.querySelectorAll('.rd-opt'));
      var why = mount.querySelector('.rd-why');
      var bar = mount.querySelector('[data-next-bar]');

      opts.forEach(function (btn) {
        btn.addEventListener('click', function () {
          if (q.id in answers) return;
          var chosen = +btn.dataset.i;
          answers[q.id] = chosen;
          opts.forEach(function (b, bi) {
            b.disabled = true;
            if (bi === q.answer) b.classList.add('is-right');
            else if (bi === chosen) b.classList.add('is-wrong');
          });
          why.textContent = (chosen === q.answer ? 'Yes. ' : 'Not this one. ') + q.why;
          why.hidden = false;
          bar.hidden = false;
          bar.querySelector('[data-next]').focus();
        });
      });

      mount.querySelector('[data-next]').addEventListener('click', function () {
        at++;
        if (at < set.questions.length) { renderQuestion(); mount.scrollIntoView({ block: 'start' }); }
        else finish();
      });

      opts[0].focus();
    }

    function finish() {
      var score = 0, missed = {};
      set.questions.forEach(function (q) {
        if (answers[q.id] === q.answer) score++;
        else missed[q.concept] = true;
      });
      var result = {
        score: score,
        total: set.questions.length,
        gaps: Object.keys(missed),
        when: new Date().toISOString().slice(0, 10)
      };
      saveResult(set.key, result);
      renderResult(result);
      mount.scrollIntoView({ block: 'start' });
    }

    /* ---------- 3. the answer, and only the review they need ---------- */
    function renderResult(r) {
      var v = verdictFor(r.score, r.total);
      var good = r.gaps.length === 0;

      var reviewHtml;
      if (good) {
        reviewHtml =
          '<div class="rd-clear">' +
            '<p class="rd-clear-line">Nothing to review. Go and start week 1.</p>' +
            '<p class="rd-sub">If something does come up later, this page is still here and the ' +
              'answer will be waiting.</p>' +
            '<div class="rd-bar">' +
              '<a class="rd-btn rd-btn-primary" href="course-start.html" target="_top">Go to the course home</a>' +
              '<button type="button" class="rd-btn" data-again>Take it again</button>' +
            '</div>' +
          '</div>';
      } else {
        reviewHtml =
          '<p class="rd-review-head">Your short review, ' + r.gaps.length +
            (r.gaps.length === 1 ? ' thing' : ' things') + '</p>' +
          r.gaps.map(function (id) {
            var c = conceptById(id);
            if (!c) return '';
            return '<div class="rd-concept is-gap">' +
              '<p class="rd-name">' + esc(c.name) + '</p>' +
              '<p class="rd-need">' + esc(c.need) + '</p>' +
              '<p class="rd-when">' + esc(c.usedIn) + '</p>' +
              '<p class="rd-review">' + esc(c.review) + '</p>' +
            '</div>';
          }).join('') +
          '<div class="rd-bar">' +
            '<button type="button" class="rd-btn rd-btn-primary" data-again>Take it again</button>' +
            '<button type="button" class="rd-btn" data-showall>Show the whole list</button>' +
          '</div>';
      }

      mount.innerHTML =
        '<div class="rd-result' + (good ? ' is-clear' : '') + '" role="status">' +
          '<p class="rd-score">' + esc(r.score) + ' of ' + esc(r.total) + '</p>' +
          '<h3>' + esc(v.headline) + '</h3>' +
          '<p>' + esc(v.body) + '</p>' +
        '</div>' +
        '<div class="rd-panel">' + reviewHtml + '</div>';

      var again = mount.querySelector('[data-again]');
      if (again) again.addEventListener('click', function () { answers = {}; at = 0; renderQuestion(); });
      var all = mount.querySelector('[data-showall]');
      if (all) all.addEventListener('click', function () { renderFullList(r); });
    }

    /* ---------- the whole list, for anyone who asks for it ---------- */
    function renderFullList(r) {
      var gaps = r ? r.gaps : [];
      mount.innerHTML =
        '<div class="rd-panel">' +
          '<p class="rd-review-head">Everything this box covers</p>' +
          '<p class="rd-sub">You do not have to read all of this. It is here because some people want it.</p>' +
          set.concepts.map(function (c) {
            var gap = gaps.indexOf(c.id) > -1;
            return '<div class="rd-concept' + (gap ? ' is-gap' : '') + '">' +
              '<p class="rd-name">' + esc(c.name) +
                (gap ? ' <span class="rd-flag">review this</span>' : '') + '</p>' +
              '<p class="rd-need">' + esc(c.need) + '</p>' +
              '<p class="rd-when">' + esc(c.usedIn) + '</p>' +
              '<p class="rd-review">' + esc(c.review) + '</p>' +
            '</div>';
          }).join('') +
          '<div class="rd-bar">' +
            '<button type="button" class="rd-btn rd-btn-primary" data-back>Back</button>' +
          '</div>' +
        '</div>';
      mount.querySelector('[data-back]').addEventListener('click', function () {
        var prev = loadResult(set.key);
        if (prev) renderResult(prev); else renderStart();
      });
    }

    renderStart();
  }

  /* A unit page sets data-unit on the page; the course-wide page does not. */
  var unit = 0;
  try {
    var u = document.body.getAttribute('data-readiness-unit');
    unit = u ? parseInt(u, 10) : 0;
  } catch (e) { unit = 0; }

  build(DATA.chemistry, 'chemMount', unit);
  build(DATA.anatomy, 'anatMount', unit);
  build(DATA.math, 'mathMount', unit);
}());
