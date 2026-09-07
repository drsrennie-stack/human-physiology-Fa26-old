/* ============================================================
   BIO 005 Human Physiology, Yuba College, Fall 2026
   bio005-gate.js

   NOT IN USE, and not the rule. Checked Sep 7 2026: no page in this
   repo loads this file. It is a third implementation of week gating,
   left behind from an earlier design, and the rule it describes below
   (Monday open, early access 8 pm the Saturday before, conditional on
   having submitted the current week) is not the rule the course runs.

   THE LIVE RULE lives in two places, and they must stay identical:
       week-navigator.html   unlockAt()  + LEAD_DAYS
       welcome.html          hgUnlock()  + HG_LEAD_DAYS
   Two weeks are open at any time, the current week and the next one.
   A week unlocks at noon on the Saturday before the PREVIOUS week
   starts, and finished weeks stay open for the rest of the term.

   Either wire this file up to that rule or delete it. Leaving a third
   version of a student-facing policy sitting in the repo is how a page
   ends up telling a student something the course does not do.

   Date gating for the week pages.

   A week opens on its Monday. Early access opens the Saturday night
   before, at 8 pm, so a student who has finished and submitted the
   current week over the weekend can start the next one instead of
   waiting two days for nothing.

   Nothing here hides anything a student has a right to. The study
   tools, the recall cards, the Mastery OS, the competency study guide,
   the syllabus, the schedule and the lab manual are open from day one
   and are never gated. What is gated is the week teaching material,
   and only because it is being written.

   A gated page never shows a wall. It says which day it opens, which
   day early access starts, and gives six ways onward, so no student
   ever hits this and has nowhere to go.

   The times below carry their own UTC offset, so a student in another
   timezone sees the correct local moment without any conversion in
   this file. Pacific is UTC-7 through Nov 1 2026 and UTC-8 after.
   ============================================================ */

(function (root) {
  'use strict';

  var WEEKS = {
     1: { opens: '2026-09-08', unlock: '2026-09-08T00:00:00-07:00', title: 'How physiology works and what keeps you steady' },
     2: { opens: '2026-09-14', unlock: '2026-09-12T20:00:00-07:00', title: 'The chemistry that does work in the body' },
     3: { opens: '2026-09-21', unlock: '2026-09-19T20:00:00-07:00', title: 'Getting across the membrane' },
     4: { opens: '2026-09-28', unlock: '2026-09-26T20:00:00-07:00', title: 'How cells talk, and the electrical signal' },
     5: { opens: '2026-10-05', unlock: '2026-10-03T20:00:00-07:00', title: 'Synapses and central integration' },
     6: { opens: '2026-10-12', unlock: '2026-10-10T20:00:00-07:00', title: 'Sensing the world, and the responses you do not control' },
     7: { opens: '2026-10-19', unlock: '2026-10-17T20:00:00-07:00', title: 'Muscle, and how movement gets commanded' },
     8: { opens: '2026-10-26', unlock: '2026-10-24T20:00:00-07:00', title: 'Hormones and reproduction, the slow control system' },
     9: { opens: '2026-11-02', unlock: '2026-10-31T20:00:00-07:00', title: 'The heart as a pump' },
    10: { opens: '2026-11-09', unlock: '2026-11-07T20:00:00-08:00', title: 'Pressure, flow, and holding blood pressure steady' },
    11: { opens: '2026-11-16', unlock: '2026-11-14T20:00:00-08:00', title: 'Blood and how the body defends itself' },
    12: { opens: '2026-11-23', unlock: '2026-11-21T20:00:00-08:00', title: 'Digestion, and how you use food for fuel' },
    13: { opens: '2026-11-30', unlock: '2026-11-28T20:00:00-08:00', title: 'Breathing, gas transport, and the fast pH lever' },
    14: { opens: '2026-12-07', unlock: '2026-12-05T20:00:00-08:00', title: 'The kidney and body fluid balance' },
    15: { opens: '2026-12-14', unlock: '2026-12-12T20:00:00-08:00', title: 'The slow pH lever, and putting it all together' }
  };

  var DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  var MONS = ['January','February','March','April','May','June','July',
              'August','September','October','November','December'];

  function dayDate(iso) {           /* '2026-09-14' without timezone drift */
    var p = iso.split('-');
    var d = new Date(+p[0], +p[1] - 1, +p[2]);
    return DAYS[d.getDay()] + ' ' + MONS[d.getMonth()] + ' ' + d.getDate();
  }
  function stamp(iso) {
    /* Read the wall clock straight out of the string rather than converting
       into whatever timezone the student's device is set to. Every date in
       this course, in Canvas and on the site, is Pacific, and a student on a
       laptop still set to another zone should see the same time everyone
       else is working to, not a translated one. */
    var m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(iso);
    if (!m) return '';
    var d = new Date(+m[1], +m[2] - 1, +m[3]);
    var h = +m[4], mi = +m[5], ap = h < 12 ? 'am' : 'pm', hh = h % 12 || 12;
    return DAYS[d.getDay()] + ' ' + MONS[d.getMonth()] + ' ' + d.getDate()
         + ' at ' + hh + (mi ? ':' + (mi < 10 ? '0' + mi : mi) : '') + ' ' + ap
         + ' Pacific';
  }

  var API = {
    weeks: WEEKS,
    isOpen: function (n) {
      var w = WEEKS[n];
      return !w || new Date() >= new Date(w.unlock);
    },
    openLabel: function (n) {        /* for the dock badge */
      var w = WEEKS[n];
      if (!w) return '';
      var d = new Date(w.unlock);
      return 'Opens ' + DAYS[d.getDay()].slice(0, 3) + ' ' + MONS[d.getMonth()].slice(0, 3) + ' ' + d.getDate();
    },
    dayDate: dayDate,
    stamp: stamp,

    /* Replaces the marked region on a week page while the week is shut.
       Call it with the week number. It does nothing once the week is open,
       so the same page works before and after with no second version. */
    guard: function (n, target) {
      var w = WEEKS[n];
      if (!w || API.isOpen(n)) return false;
      var host = target || document.querySelector('[data-b5-gate]') ||
                 document.querySelector('main') || document.body;
      host.innerHTML =
        '<div class="b5gate-card">' +
          '<h2>Week ' + n + ' is not open yet</h2>' +
          '<p class="b5gate-when">This week opens <strong>' + dayDate(w.opens) + '</strong>.</p>' +
          '<p class="b5gate-early">If you have finished and submitted the week you are in, you can start ' +
            'this one early from <strong>' + stamp(w.unlock) + '</strong>, which is the Saturday night ' +
            'before it opens. You do not have to wait until Monday to get going.</p>' +
          '<p>Nothing is being kept from you. The teaching material for this week is still being ' +
            'written, and it will be here when the week opens. Everything you can study right now ' +
            'is below.</p>' +
        '</div>' +
        '<div class="b5gate-card">' +
          '<h2>Open right now, every day of the term</h2>' +
          '<ul class="b5gate-links">' +
            '<li><a href="course-start.html" target="_top">Course home<span>The week that is open now</span></a></li>' +
            '<li><a href="os/mastery-physio-os.html" target="_top">Mastery OS<span>Recall cards for the whole course, never locked</span></a></li>' +
            '<li><a href="competency-study-guide.html" target="_top">Competency study guide<span>What you should be able to do, every week</span></a></li>' +
            '<li><a href="clinical-physiology-lab-manual.html" target="_top">Lab manual<span>All fifteen labs</span></a></li>' +
            '<li><a href="course-schedule.html" target="_top">Course schedule<span>Every week, with dates and reading</span></a></li>' +
            '<li><a href="sitemap.html" target="_top">All course pages<span>Everything in one list</span></a></li>' +
          '</ul>' +
        '</div>';
      return true;
    }
  };

  var CSS = ''
   + '.b5gate-card{background:#fff;border-radius:12px;padding:24px;margin:0 0 20px;'
   + 'box-shadow:0 1px 3px rgba(0,0,0,.08)}'
   + '.b5gate-card h2{margin:0 0 10px;font-size:21px;font-weight:700;color:#6E2D24}'
   + '.b5gate-card p{margin:0 0 12px;max-width:68ch}'
   + '.b5gate-card p:last-child{margin-bottom:0}'
   + '.b5gate-when{font-size:19px;color:#0B1530}'
   + '.b5gate-early{color:#0B1530}'
   + '.b5gate-links{list-style:none;margin:0;padding:0;display:grid;gap:10px;'
   + 'grid-template-columns:repeat(auto-fit,minmax(240px,1fr))}'
   + '.b5gate-links a{display:block;background:#fff;border:1px solid #E3E1DE;border-radius:10px;'
   + 'padding:13px 15px;text-decoration:none;color:#0B1530;font-weight:600;line-height:1.35;'
   + 'box-shadow:0 1px 3px rgba(0,0,0,.08);transition:transform 200ms ease,box-shadow 200ms ease}'
   + '.b5gate-links a:hover{transform:translateY(-2px);box-shadow:0 8px 16px rgba(0,0,0,.10)}'
   + '.b5gate-links a:focus-visible{outline:3px solid #C9A14A;outline-offset:2px}'
   + '.b5gate-links span{display:block;font-weight:400;font-size:14px;color:#4A4A4A;margin-top:3px}'
   + '@media (prefers-reduced-motion:reduce){.b5gate-links a{transition:none}'
   + '.b5gate-links a:hover{transform:none}}';

  function style() {
    if (document.querySelector('style[data-bio005-gate]')) return;
    var s = document.createElement('style');
    s.setAttribute('data-bio005-gate', '');
    s.appendChild(document.createTextNode(CSS));
    document.head.appendChild(s);
  }

  function auto() {
    style();
    var el = document.querySelector('[data-b5-week]');
    if (!el) return;
    var n = parseInt(el.getAttribute('data-b5-week'), 10);
    if (n) API.guard(n, document.querySelector('[data-b5-gate]') || el);
  }

  root.BIO005_GATE = API;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', auto);
  else auto();
})(window);
