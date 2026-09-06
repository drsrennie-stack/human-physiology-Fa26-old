/* ============================================================
   ANATOMY REVIEW DECK, recall engine

   A copy of the physiology recall engine, pointed at the BIO 004
   anatomy card bank and given its OWN storage keys.

   WHY IT IS A COPY AND NOT A FLAG

   This deck must never move a physiology mastery bar. A student
   reviewing the brachial plexus has not learned anything about
   glomerular filtration, and an app that says otherwise is lying to
   them at the exact moment they are trusting it to tell them what to
   study. One shared engine with a mode flag is one bug away from
   crossing those two things. Two engines, two keys, cannot.

     bio005-anatomy-review-progress   this deck only
     bio005-anatomy-review-v2         this deck only
     bio005-recall-progress           physiology, untouched by this file
     bio005-recall-v2                 physiology, untouched by this file

   Regenerate from os/recall-view.js if that engine changes. The only
   edits are the four key names, the bank it reads, and the mount id.
   ============================================================ */

/* ============================================================
   BIO 005 Human Physiology, Fall 2026
   recall-view.js

   Spaced recall, running INSIDE Mastery OS rather than beside it.

   Recall used to live on its own page, bio005-spaced-recall.html,
   which read two of the fifteen card files. Mastery OS knew which
   competency every card belonged to but held no cards at all, and
   linked out instead. So the two halves of the same idea sat in
   two places and neither was complete.

   This mounts the whole recall engine into the Mastery OS page, on
   the one bank in bio005-card-bank.js. One door.

   Wire it after the bank, anywhere on the page:
     <div id="recallMount"></div>
     <script src="bio005-card-bank.js"></script>
     <script src="recall-view.js"></script>

   Deep links, both supported:
     #s-recall            open recall
     #s-recall?comp=ID    open recall filtered to one competency
     ?comp=ID             same, from an external link

   Two kinds of card live in the bank and both are handled:
     multiple choice   options[] + correctIndex, graded by the app
     free recall       q and a only, you grade yourself after
                       committing to an answer out loud or on paper

   Nothing here runs on a timer. A student sets the pace.
   ============================================================ */

(function () {
  'use strict';

  var MOUNT = 'anatomyRecallMount';
  var SKEY  = 'bio005-anatomy-review-progress';   // this deck's own spacing state, separate on purpose
  var VKEY  = 'bio005-anatomy-review-v2';         // NOT the physiology feed, see the note below

  /* Leitner-style spacing, in days. A card you get right moves out a
     box, a card you miss goes back to the start. Deliberately coarse:
     the point is that hard cards come back soon and easy ones stop
     eating your evening. */
  var BOX_DAYS = [0, 1, 3, 7, 16, 35];

  /* Cards drawn per topic in a gap run. Two across 217 topics is a
     survey you can finish in a sitting, and it still touches everything. */
  var GAP_PER_TOPIC = 2;

  function $(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  }
  function today() {
    var d = new Date(), p = function (n) { return (n < 10 ? '0' : '') + n; };
    return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate());
  }
  function addDays(iso, n) {
    var p = iso.split('-'), d = new Date(+p[0], +p[1] - 1, +p[2]);
    d.setDate(d.getDate() + n);
    var q = function (x) { return (x < 10 ? '0' : '') + x; };
    return d.getFullYear() + '-' + q(d.getMonth() + 1) + '-' + q(d.getDate());
  }

  function load() { try { return JSON.parse(localStorage.getItem(SKEY)) || {}; } catch (e) { return {}; } }
  function save(p) { try { localStorage.setItem(SKEY, JSON.stringify(p)); } catch (e) {} }

  /* ---------- feeding Mastery OS ----------
     Mastery OS already ingests recall results and turns them into
     competency mastery, confidence, last-reviewed and next-recall. It
     reads localStorage['bio005-anatomy-review-v2'], resolves a topic id to its
     competencies through BIO004_CARD_COMPETENCY_MAP, and counts one
     attempt per entry in each card's history array. attempts/correct
     fields on the card are only a fallback, so the history is what has
     to be written.

     Shape, exactly as the OS expects it:
       { topics: { <topicId>: { cards: { <cardId>: { history:[{correct,at}] } } } } }

     Writing this is the whole reason recall belongs inside the app: the
     dashboard, the weakness list and the daily build all move on their
     own as a student works through cards. */

  function feedMasteryOS(entry, right) {
    var st;
    try { st = JSON.parse(localStorage.getItem(VKEY)) || {}; } catch (e) { st = {}; }
    if (!st.topics) st.topics = {};
    var t = st.topics[entry.topicId] || (st.topics[entry.topicId] = { cards: {} });
    if (!t.cards) t.cards = {};
    var cid = entry.card.id || entry.key;
    var card = t.cards[cid] || (t.cards[cid] = { history: [] });
    if (!card.history) card.history = [];
    card.history.push({ correct: !!right, at: today() });
    /* Keep the log from growing without bound. Twenty attempts on one
       card is already far more than the OS needs to judge mastery. */
    if (card.history.length > 20) card.history = card.history.slice(-20);
    try { localStorage.setItem(VKEY, JSON.stringify(st)); } catch (e) {}

    /* Mastery OS re-ingests on a storage event for 'bio005-progress', and
       that handler reads the cards feed too. The browser does not fire
       storage events in the tab that did the writing, and recall now lives
       in that same tab, so nothing would refresh while a student worked.
       Dispatching the event by hand gives the OS its own signal without
       reaching into its internals, which are private to its closure. */
    try {
      var ev;
      try {
        ev = new StorageEvent('storage', { key: 'bio005-anatomy-review-progress', storageArea: localStorage });
      } catch (e) {
        ev = document.createEvent('Event');
        ev.initEvent('storage', false, false);
        ev.key = 'bio005-progress';
      }
      window.dispatchEvent(ev);
    } catch (e) {}
  }

  /* ---------- the deck ---------- */

  var ALL = [];        // every card, flattened, with its topic and module
  var progress = load();
  var queue = [], pos = 0, revealed = false, confidence = null, shown = null;
  var runLog = [];   // {topicId, topicTitle, moduleTitle, right} for the run in progress
  /* SCOPE, AND WHY IT DEFAULTS TO THE COURSE SO FAR
     A student who has just watched the week 1 video and comes here for
     spaced retrieval should not be asked about the fibrous pericardium.
     The bank holds the whole term; the student has been taught one week
     of it. So the default scope is everything taught up to today, newest
     material first, and the pool is ordered rather than shuffled across
     the whole course. "Every area" is still there for anyone who wants
     to range wider. */
  var filter = { scope: 'sofar', module: 'all', topic: 'all', comp: null, mode: 'due' };
  /* set when a competency was asked for and had no cards of its own */
  var NO_CARDS_FOR = null;

  var TERM_START = new Date(2026, 7, 17);            /* Monday 17 August 2026 */
  function currentWeek() {
    var wk = Math.floor((new Date() - TERM_START) / 604800000) + 1;
    return wk < 1 ? 1 : (wk > 17 ? 17 : wk);
  }

  /* topic -> the earliest week it is taught, via the competency map and the
     competency list. Topics the map does not cover return 0, which means
     "no week known" and they only appear under Every area. */
  var TOPIC_WEEK = null;
  function topicWeek(topicId) {
    if (!TOPIC_WEEK) {
      TOPIC_WEEK = {};
      var map = window.BIO004_CARD_COMPETENCY_MAP || window.CARD_COMPETENCY_MAP || {};
      var comps = window.BIO004_COMPETENCIES || [];
      var byId = {};
      comps.forEach(function (c) { byId[c.id] = c; });
      Object.keys(map).forEach(function (tid) {
        var list = (map[tid] && map[tid].comps) || [];
        var best = 0;
        list.forEach(function (cid) {
          var c = byId[cid];
          if (c && c.week && (!best || c.week < best)) best = c.week;
        });
        if (best) TOPIC_WEEK[tid] = best;
      });
    }
    return TOPIC_WEEK[topicId] || 0;
  }

  function flatten() {
    var bank = window.BIO004_CARD_BANK || window.BIO004_COURSE_CONTENT;
    var out = [];
    if (!bank || !bank.modules) return out;
    bank.modules.forEach(function (m) {
      (m.topics || []).forEach(function (t) {
        (t.cards || []).forEach(function (c, i) {
          out.push({
            key: t.id + ':' + (c.id || i),
            card: c,
            topicId: t.id, topicTitle: t.title,
            moduleId: m.id, moduleTitle: m.title,
            mcq: Array.isArray(c.options) && typeof c.correctIndex === 'number'
          });
        });
      });
    });
    return out;
  }

  /* THE MAP IS KEYED topicId -> { title, comps: [...] }.
     This read map[entry.topicId] and returned that whole object, so the
     filter below was comparing an object with a competency id string and
     never matching. Every competency that has no competencyId stamped on
     its cards, which is 56 of 192 including all seventeen of week 1,
     therefore resolved to no cards at all. topicWeek() and
     mastery-evidence.js both read .comps correctly; only this one did
     not.

     It returns an array when the route is the map, because one topic
     covers several competencies. */
  function compOf(entry) {
    var map = window.CARD_COMPETENCY_MAP || window.BIO004_CARD_COMPETENCY_MAP;
    if (entry.card.competencyId) return entry.card.competencyId;
    if (map) {
      var e = map[entry.key] || map[entry.card.id] || map[entry.topicId];
      if (e) return (e && e.comps) ? e.comps : e;
    }
    return null;
  }
  /* compOf can be a string or a list, so never compare it directly. */
  function isComp(entry, want) {
    var c = compOf(entry);
    if (!c) return false;
    return Array.isArray(c) ? c.indexOf(want) > -1 : c === want;
  }

  function due(entry) {
    var p = progress[entry.key];
    if (!p) return true;                       // never seen, so it is due
    return !p.next || p.next <= today();
  }

  function build() {
    var wkNow = currentWeek();
    var pool = ALL.filter(function (e) {
      var w = topicWeek(e.topicId);
      if (filter.scope === 'week'  && w !== wkNow) return false;
      if (filter.scope === 'sofar' && (w === 0 || w > wkNow)) return false;
      if (filter.module !== 'all' && e.moduleId !== filter.module) return false;
      if (filter.topic !== 'all' && e.topicId !== filter.topic) return false;
      if (filter.comp && !isComp(e, filter.comp)) return false;
      return true;
    });
    if (filter.mode === 'due') pool = pool.filter(due);
    if (filter.mode === 'missed') pool = pool.filter(function (e) {
      var p = progress[e.key]; return p && p.wrong > 0 && (p.box || 0) < 3;
    });
    if (filter.mode === 'gaps') pool = sampleAcross(pool, GAP_PER_TOPIC);
    shuffle(pool);
    /* Shuffle first so order inside a week is random, then bring this week's
       material to the front. Newest first is what a student needs after a
       lecture; older weeks still come round, which is the whole point of
       spacing. */
    if (filter.scope === 'sofar') {
      pool.sort(function (a, b) { return topicWeek(b.topicId) - topicWeek(a.topicId); });
    }
    return pool;
  }

  /* A gap run is a survey, not a study session. It takes a small random
     sample from EVERY topic rather than going deep anywhere, so a short run
     tells you where you are weak across the whole course.

     This is what the old gap-cards deck was for. That deck was 35 fixed
     questions, so it found the same gaps every time and stopped being
     diagnostic the moment you had seen it once. Sampling the live bank
     instead means every run asks different questions, and there are 3,728
     to draw from. Run it as often as you like; it will not repeat itself. */
  function sampleAcross(pool, perTopic) {
    var byTopic = {};
    pool.forEach(function (e) { (byTopic[e.topicId] = byTopic[e.topicId] || []).push(e); });
    var out = [];
    Object.keys(byTopic).forEach(function (id) {
      var cards = byTopic[id].slice();
      /* Prefer what you have not proven yet, then fill from the rest, so a
         gap run spends its questions where they can still tell you something. */
      var unproven = cards.filter(function (e) { var p = progress[e.key]; return !p || (p.box || 0) < 3; });
      var rest     = cards.filter(function (e) { var p = progress[e.key]; return p && (p.box || 0) >= 3; });
      shuffle(unproven); shuffle(rest);
      out = out.concat(unproven.concat(rest).slice(0, perTopic));
    });
    return out;
  }

  /* Fisher-Yates, seeded from Math.random, so the order is different every
     single run. An earlier version sorted on a hash of the card id, which is
     stable by definition, so every student met the same cards in the same
     order every time. Stability is the wrong goal here: the order IS part of
     what you are being tested on, and a fixed one lets you learn the sequence
     instead of the anatomy. */
  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  /* Options are re-shuffled every time a card is shown, not once per card.
     Across the bank the correct answer sat in position 4 only 15.6% of the
     time and position 2 32.6%, so a student could gain marks by learning to
     avoid the last option. Returns a fresh view; the card itself is never
     mutated, so the bank on disk stays as authored. */
  function presentOptions(card) {
    var pairs = card.options.map(function (text, i) { return { text: text, right: i === card.correctIndex }; });
    shuffle(pairs);
    return pairs;
  }

  /* ---------- grading ---------- */

  function grade(entry, right) {
    var p = progress[entry.key] || { box: 0, right: 0, wrong: 0 };
    if (right) { p.right++; p.box = Math.min((p.box || 0) + 1, BOX_DAYS.length - 1); }
    else       { p.wrong++; p.box = 0; }
    p.conf = confidence;
    p.last = today();
    p.next = addDays(today(), BOX_DAYS[p.box]);
    progress[entry.key] = p;
    save(progress);
    feedMasteryOS(entry, right);
    runLog.push({ topicId: entry.topicId, topicTitle: entry.topicTitle,
                  moduleTitle: entry.moduleTitle, right: !!right });

    /* The gap worth naming: sure and wrong. That pairing is what an
       exam punishes, and a student cannot see it without being asked
       to commit to a confidence first. */
    if (!right && confidence === 'sure') p.blindspot = true;
  }

  /* ---------- render ---------- */

  function stats() {
    var seen = 0, mastered = 0, shaky = 0, blind = 0;
    ALL.forEach(function (e) {
      var p = progress[e.key];
      if (!p) return;
      seen++;
      if ((p.box || 0) >= 3) mastered++;
      if (p.wrong > 0 && (p.box || 0) < 3) shaky++;
      if (p.blindspot) blind++;
    });
    return { seen: seen, mastered: mastered, shaky: shaky, blind: blind, total: ALL.length };
  }

  function head() {
    var s = stats();
    var mods = {};
    ALL.forEach(function (e) { mods[e.moduleId] = e.moduleTitle || e.moduleId; });
    var opts = '<option value="all">Every area</option>';
    /* Topics are the chapters inside a module. filter.topic already worked;
       it simply had no control, so a student could reach a module but not the
       chapter they had just been taught. The list follows the module choice,
       and it respects the scope, so it never offers a chapter from a week
       that has not happened. */
    var wkNowT = currentWeek();
    var tops = {};
    ALL.forEach(function (e) {
      if (filter.module !== 'all' && e.moduleId !== filter.module) return;
      var w = topicWeek(e.topicId);
      if (filter.scope === 'week'  && w !== wkNowT) return;
      if (filter.scope === 'sofar' && (w === 0 || w > wkNowT)) return;
      tops[e.topicId] = e.topicTitle || e.topicId;
    });
    var topOpts = '<option value="all">Every topic</option>';
    Object.keys(tops).sort(function (a, b) {
      return (topicWeek(a) - topicWeek(b)) || String(tops[a]).localeCompare(String(tops[b]));
    }).forEach(function (k) {
      topOpts += '<option value="' + esc(k) + '"' + (filter.topic === k ? ' selected' : '') + '>'
               + esc(tops[k]) + '</option>';
    });
    Object.keys(mods).forEach(function (k) {
      opts += '<option value="' + esc(k) + '"' + (filter.module === k ? ' selected' : '') + '>'
            + esc(mods[k]) + '</option>';
    });
    return ''
      + '<div class="rv-stats" role="group" aria-label="Your recall progress">'
      +   '<p class="rv-stat"><strong>' + s.total + '</strong><span>cards in the bank</span></p>'
      +   '<p class="rv-stat"><strong>' + s.seen + '</strong><span>you have seen</span></p>'
      +   '<p class="rv-stat"><strong>' + s.mastered + '</strong><span>holding steady</span></p>'
      +   '<p class="rv-stat"><strong>' + s.shaky + '</strong><span>still shaky</span></p>'
      + '</div>'
      + (s.blind
          ? '<p class="rv-blind">You have been <strong>sure and wrong</strong> on ' + s.blind
            + ' card' + (s.blind === 1 ? '' : 's') + '. Those are worth more of your time than anything you already find hard, '
            + 'because you would not have studied them.</p>'
          : '')
      + '<div class="rv-controls">'
      +   '<span class="rv-field"><label for="rv-scope">Material</label>'
      +     '<select id="rv-scope">'
      +       '<option value="sofar"' + (filter.scope === 'sofar' ? ' selected' : '') + '>Everything taught so far</option>'
      +       '<option value="week"'  + (filter.scope === 'week'  ? ' selected' : '') + '>This week only</option>'
      +       '<option value="all"'   + (filter.scope === 'all'   ? ' selected' : '') + '>The whole course</option>'
      +     '</select></span>'
      +   '<span class="rv-field"><label for="rv-mod">Area</label>'
      +     '<select id="rv-mod">' + opts + '</select></span>'
      +   '<span class="rv-field"><label for="rv-topic">Topic</label>'
      +     '<select id="rv-topic">' + topOpts + '</select></span>'
      +   '<span class="rv-field"><label for="rv-mode">Show me</label>'
      +     '<select id="rv-mode">'
      +       '<option value="due"' + (filter.mode === 'due' ? ' selected' : '') + '>Cards due today</option>'
      +       '<option value="gaps"' + (filter.mode === 'gaps' ? ' selected' : '') + '>Find my gaps</option>'
      +       '<option value="missed"' + (filter.mode === 'missed' ? ' selected' : '') + '>Ones I keep missing</option>'
      +       '<option value="all"' + (filter.mode === 'all' ? ' selected' : '') + '>Everything</option>'
      +     '</select></span>'
      +   '<button type="button" class="btn ghost" id="rv-restart">Start a fresh run</button>'
      + '</div>';
  }

  function cardHtml(e) {
    var c = e.card;
    var body = '';
    if (!revealed) {
      body = '<div class="rv-conf" role="group" aria-labelledby="rv-conf-h">'
           + '<p id="rv-conf-h" class="rv-conf-h">Before you look, how sure are you?</p>'
           + '<div class="rv-conf-row">'
           +   btn('sure',  'I know this')
           +   btn('think', 'I think so')
           +   btn('no',    'Not yet')
           + '</div></div>';
    } else if (e.mcq) {
      if (!shown) shown = presentOptions(c);
      body = '<ol class="rv-opts">' + shown.map(function (o, i) {
        return '<li><button type="button" class="rv-opt" data-pick="' + i + '">' + esc(o.text) + '</button></li>';
      }).join('') + '</ol>';
    } else {
      body = '<div class="rv-answer"><p class="rv-answer-h">The answer</p><p>' + c.a + '</p>'
           + (c.explanation ? '<p class="rv-expl">' + c.explanation + '</p>' : '')
           + '<div class="rv-selfgrade"><p>Did you have it?</p>'
           +   '<button type="button" class="btn primary" data-self="1">I had it</button> '
           +   '<button type="button" class="btn" data-self="0">I did not</button>'
           + '</div></div>';
    }
    /* IT SHOULD LOOK LIKE A CARD, NOT LIKE THE PAGE.
       This was a flat panel the same width and color as everything
       around it, so the one thing a student is meant to be looking at
       read as another block of the form above it. It is a card now:
       narrower than the column, lifted well off the page on a real
       shadow, with a colored tile in the corner the same way the
       method cards on Today carry one. The tile color is the DOK
       level, so the depth of the question is visible before it is
       read. No bar across the top: bars are out of the system. */
    var dok = c.dok ? Math.max(1, Math.min(4, +c.dok)) : 1;
    var DOKN = { 1:'Recall', 2:'Apply', 3:'Reason', 4:'Extend' };
    return ''
      + '<div class="rv-stage">'
      + '<article class="rv-card rv-d' + dok + '">'
      +   '<p class="rv-badge" aria-hidden="true">' + dok + '</p>'
      +   '<p class="rv-level">' + esc(DOKN[dok]) + '</p>'
      +   '<p class="rv-crumb">' + esc(e.topicTitle || '')
      +     ' &middot; card ' + (pos + 1) + ' of ' + queue.length + '</p>'
      +   '<h3 class="rv-q">' + c.q + '</h3>'
      +   body
      +   '<p class="rv-live" id="rv-live" role="status" aria-live="polite"></p>'
      + '</article>'
      + '</div>';
  }
  function btn(k, label) {
    return '<button type="button" class="btn' + (k === 'sure' ? ' gold' : '') + '" data-conf="' + k + '">'
         + esc(label) + '</button>';
  }

  function render() {
    var host = $(MOUNT);
    if (!host) return;
    if (!ALL.length) {
      /* An EMPTY bank is the expected state for BIO 005 right now, not a
         load failure. Say what is true and give the student the thing that
         does work, rather than showing them a diagnostic they cannot act on. */
      var st = window.BIO004_CARD_BANK_STATUS || {};
      if (window.BIO004_CARD_BANK && st.inBuild) {
        host.innerHTML =
          '<p class="note"><strong>The card bank is still being written.</strong> '
          + 'Cards have to be written against the 268 physiology competencies, and that work is in progress.</p>'
          + '<p class="note">Retrieval practice still works in the meantime, at the competency level: '
          + 'you get the competency, you say it out loud from memory, then you rate how it went. '
          + 'That is the part that actually builds recall. '
          + '<a href="../competency-recall.html" target="_top">Open competency recall</a>.</p>';
        return;
      }
      host.innerHTML = '<p class="note">The card bank did not load. Check that '
        + '<code>bio005-card-bank.js</code> is on the page before this script.</p>';
      return;
    }
    var inner = head();
    if (NO_CARDS_FOR) {
      var cs = window.BIO004_COMPETENCIES || [];
      var hit = null;
      for (var ci = 0; ci < cs.length; ci++) { if (cs[ci].id === NO_CARDS_FOR) { hit = cs[ci]; break; } }
      inner += '<div class="rv-card rv-note"><h3>' + esc(hit ? hit.name : 'That one') +
               ' is not a card topic</h3>' +
               '<p>It is a specimen identification, so it is proved at the cadaver or the ' +
               'microscope rather than by multiple choice. Showing you everything else that is ' +
               'queued instead.</p></div>';
    }
    if (!queue.length) {
      inner += '<div class="rv-card rv-done"><h3>Nothing due right now</h3>'
             + '<p>That is the system working, not a gap. Cards come back on a schedule so you '
             + 'meet them again just as they start to fade. If you want more anyway, switch '
             + '"Show me" to everything.</p></div>';
    } else if (pos >= queue.length) {
      inner += '<div class="rv-card rv-done"><h3>That is the run finished</h3>'
             + '<p>' + queue.length + ' card' + (queue.length === 1 ? '' : 's') + ' done. '
             + 'Come back tomorrow and the ones you found hard will be waiting, the ones you '
             + 'found easy will not.</p>'
             + report()
             + '<button type="button" class="btn primary" id="rv-restart2">Run another set</button></div>';
    } else {
      inner += cardHtml(queue[pos]);
    }
    host.innerHTML = inner;
  }


  /* What the run just told you, worst first. Only shown when there is enough
     to say something honest: a topic you answered once is not evidence. */
  function report() {
    if (runLog.length < 4) return '';
    var by = {};
    runLog.forEach(function (r) {
      var t = by[r.topicId] = by[r.topicId] || { title: r.topicTitle, mod: r.moduleTitle, n: 0, ok: 0 };
      t.n++; if (r.right) t.ok++;
    });
    var rows = Object.keys(by).map(function (id) {
      var t = by[id];
      return { id: id, title: t.title, mod: t.mod, n: t.n, ok: t.ok, pct: t.ok / t.n };
    });
    var weak = rows.filter(function (r) { return r.pct < 1; })
                   .sort(function (a, b) { return a.pct - b.pct || b.n - a.n; });
    var clean = rows.length - weak.length;

    if (!weak.length) {
      return '<div class="rv-report"><h4>Nothing came up weak</h4>'
           + '<p>You got every card in this run. Run it again and it will draw '
           + 'different questions, because the sample is random each time.</p></div>';
    }
    return '<div class="rv-report"><h4>Where this run says you are exposed</h4>'
      + '<p class="rv-report-sub">Weakest first. ' + clean + ' topic' + (clean === 1 ? '' : 's')
      + ' came back clean and are not listed.</p>'
      + '<ol class="rv-weak">' + weak.slice(0, 12).map(function (r) {
          return '<li><span class="rv-weak-t">' + esc(r.title || r.id) + '</span>'
               + '<span class="rv-weak-m">' + esc(r.mod || '') + '</span>'
               + '<span class="rv-weak-n">' + r.ok + ' of ' + r.n + '</span></li>';
        }).join('') + '</ol>'
      + '<p class="rv-report-sub">This is one sample, not a verdict. Run it again '
      + 'in a few days and watch which topics keep appearing. Those are the real ones.</p>'
      + '</div>';
  }

  function next() { pos++; revealed = false; confidence = null; shown = null; render(); }

  function say(msg) {
    var l = $('rv-live');
    if (l) l.textContent = msg;
  }

  /* ---------- events ---------- */

  function onClick(ev) {
    var t = ev.target.closest ? ev.target.closest('[data-conf],[data-pick],[data-self],#rv-restart,#rv-restart2') : null;
    if (!t || !$(MOUNT) || !$(MOUNT).contains(t)) return;

    if (t.id === 'rv-restart' || t.id === 'rv-restart2') {
      queue = build(); pos = 0; revealed = false; confidence = null; shown = null; runLog = []; render();
      say(queue.length ? queue.length + ' cards queued.' : 'Nothing is due.');
      return;
    }
    var e = queue[pos];
    if (!e) return;

    if (t.hasAttribute('data-conf')) {
      confidence = t.getAttribute('data-conf');
      revealed = true;
      render();
      say('Now answer it.');
      return;
    }
    if (t.hasAttribute('data-pick')) {
      var pick = +t.getAttribute('data-pick');
      var rightAt = -1;
      for (var k = 0; k < shown.length; k++) { if (shown[k].right) rightAt = k; }
      var right = pick === rightAt;
      grade(e, right);
      var opts = $(MOUNT).querySelectorAll('.rv-opt');
      for (var i = 0; i < opts.length; i++) {
        opts[i].disabled = true;
        if (i === rightAt) opts[i].className = 'rv-opt is-right';
        else if (i === pick) opts[i].className = 'rv-opt is-wrong';
      }
      /* The verdict is words, not just color, so it survives color
         blindness and reaches a screen reader through the live region. */
      var verdict = right ? 'Correct. ' : 'Not this time. The answer is: ' + strip(shown[rightAt].text) + '. ';
      if (!right && confidence === 'sure') verdict += 'You were sure on that one, so it is worth a second look. ';
      if (e.card.explanation) verdict += strip(e.card.explanation);
      say(verdict);
      addNext();
      return;
    }
    if (t.hasAttribute('data-self')) {
      grade(e, t.getAttribute('data-self') === '1');
      say(t.getAttribute('data-self') === '1' ? 'Marked as known.' : 'Marked to come back soon.');
      addNext();
      return;
    }
  }
  function strip(h) { var d = document.createElement('div'); d.innerHTML = h; return d.textContent || ''; }

  function addNext() {
    var host = $(MOUNT);
    if (!host || host.querySelector('#rv-next')) return;
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'btn primary'; b.id = 'rv-next';
    b.textContent = pos + 1 >= queue.length ? 'Finish the run' : 'Next card';
    b.addEventListener('click', next);
    var card = host.querySelector('.rv-card');
    if (card) card.appendChild(b);
    b.focus();
  }

  function onChange(ev) {
    if (ev.target.id === 'rv-scope') { filter.scope = ev.target.value; filter.topic = 'all'; }
    else if (ev.target.id === 'rv-topic') { filter.topic = ev.target.value; }
    else if (ev.target.id === 'rv-mod')  { filter.module = ev.target.value; filter.topic = 'all'; }
    else if (ev.target.id === 'rv-mode') { filter.mode = ev.target.value; }
    else return;
    queue = build(); pos = 0; revealed = false; confidence = null; shown = null; runLog = []; render();
  }

  /* ---------- styles ---------- */

  var CSS = ''
  + '#' + MOUNT + ' .rv-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:12px;margin:0 0 14px}'
  + '#' + MOUNT + ' .rv-stat{margin:0;padding:12px 14px;border:1px solid rgba(11,21,48,.16);border-radius:10px;background:#fff}'
  + '#' + MOUNT + ' .rv-stat strong{display:block;font-size:1.5rem;line-height:1.1}'
  + '#' + MOUNT + ' .rv-stat span{font-size:.82rem;opacity:.75}'
  + '#' + MOUNT + ' .rv-blind{margin:0 0 14px;padding:12px 14px;border-left:3px solid #8B3A2E;background:#fff;border-radius:0 8px 8px 0}'
  + '#' + MOUNT + ' .rv-controls{display:flex;flex-wrap:wrap;gap:12px;align-items:flex-end;margin:0 0 16px}'
  + '#' + MOUNT + ' .rv-field{display:flex;flex-direction:column;gap:4px}'
  + '#' + MOUNT + ' .rv-field label{font-size:.78rem;font-weight:600;opacity:.8}'
  + '#' + MOUNT + ' .rv-field select{padding:8px 10px;border:1px solid rgba(11,21,48,.28);border-radius:8px;background:#fff;font:inherit;min-height:44px}'
  + '#' + MOUNT + ' .rv-note{border-left:0;background:#FFF;box-shadow:0 1px 3px rgba(11,21,48,.10);border-radius:12px;padding:16px 18px;margin:0 0 14px}'
  + '#' + MOUNT + ' .rv-note h3{margin:0 0 6px;font-size:16px}'
  + '#' + MOUNT + ' .rv-note p{margin:0;font-size:14px;color:#3D4757}'
  + '#' + MOUNT + ' .rv-stage{display:flex;justify-content:center;padding:26px 0 10px}'
  + '#' + MOUNT + ' .rv-card{position:relative;width:100%;max-width:620px;padding:26px 30px 26px;'
  +   'border:1px solid rgba(11,21,48,.09);border-radius:18px;background:#fff;'
  +   'box-shadow:0 26px 50px -14px rgba(11,21,48,.30), 0 2px 6px rgba(11,21,48,.07);'
  +   'transition:transform 220ms ease, box-shadow 220ms ease}'
  + '#' + MOUNT + ' .rv-card:hover{transform:translateY(-3px);'
  +   'box-shadow:0 34px 62px -16px rgba(11,21,48,.34), 0 2px 6px rgba(11,21,48,.07)}'
  + '@media (prefers-reduced-motion:reduce){#' + MOUNT + ' .rv-card:hover{transform:none}}'
  + '#' + MOUNT + ' .rv-badge{width:42px;height:42px;border-radius:12px;display:flex;align-items:center;'
  +   'justify-content:center;font-family:var(--font-display,inherit);font-weight:800;font-size:17px;'
  +   'margin:0 0 12px;color:#fff}'
  + '#' + MOUNT + ' .rv-d1 .rv-badge{background:#7C93A8}'
  + '#' + MOUNT + ' .rv-d2 .rv-badge{background:#C9A14A;color:#0B1530}'
  + '#' + MOUNT + ' .rv-d3 .rv-badge{background:#8B3A2E}'
  + '#' + MOUNT + ' .rv-d4 .rv-badge{background:#6E2D24}'
  + '#' + MOUNT + ' .rv-level{margin:0;font-family:var(--font-eyebrow,inherit);font-weight:700;'
  +   'font-size:.64rem;letter-spacing:.16em;text-transform:uppercase}'
  + '#' + MOUNT + ' .rv-d1 .rv-level{color:#4A5C6B}'
  + '#' + MOUNT + ' .rv-d2 .rv-level{color:#6F5316}'
  + '#' + MOUNT + ' .rv-d3 .rv-level{color:#6E2D24}'
  + '#' + MOUNT + ' .rv-d4 .rv-level{color:#6E2D24}'
  + '#' + MOUNT + ' .rv-crumb{margin:3px 0 14px;font-size:.72rem;letter-spacing:.02em;'
  +   'text-transform:uppercase;opacity:.62}'
  + '#' + MOUNT + ' .rv-q{margin:0 0 18px;font-size:1.28rem;line-height:1.4;font-weight:700}'
  + '#' + MOUNT + ' .rv-conf-h{margin:0 0 8px;font-weight:600}'
  + '#' + MOUNT + ' .rv-conf-row{display:flex;flex-wrap:wrap;gap:8px}'
  + '#' + MOUNT + ' .rv-opts{list-style:none;margin:0;padding:0;display:grid;gap:8px}'
  + '#' + MOUNT + ' .rv-opt{display:block;width:100%;text-align:left;padding:12px 14px;min-height:44px;'
  +   'border:1px solid rgba(11,21,48,.28);border-radius:10px;background:#fff;font:inherit;cursor:pointer}'
  + '#' + MOUNT + ' .rv-opt:hover:not(:disabled){border-color:#0B1530}'
  + '#' + MOUNT + ' .rv-opt.is-right{border-color:#1d7a46;border-width:2px;background:#F2F8F4}'
  + '#' + MOUNT + ' .rv-opt.is-right::after{content:" \\2713 correct";font-weight:700;color:#14532d}'
  + '#' + MOUNT + ' .rv-opt.is-wrong{border-color:#8B3A2E;border-width:2px;background:#FBF3F1}'
  + '#' + MOUNT + ' .rv-opt.is-wrong::after{content:" \\2715 what you picked";font-weight:700;color:#8B3A2E}'
  + '#' + MOUNT + ' .rv-answer-h{margin:0 0 4px;font-weight:700;font-size:.8rem;text-transform:uppercase;letter-spacing:.03em;opacity:.72}'
  + '#' + MOUNT + ' .rv-expl{margin:10px 0 0;opacity:.86}'
  + '#' + MOUNT + ' .rv-selfgrade{margin-top:14px;padding-top:12px;border-top:1px solid rgba(11,21,48,.12)}'
  + '#' + MOUNT + ' .rv-selfgrade p{margin:0 0 8px;font-weight:600}'
  + '#' + MOUNT + ' .rv-live{margin:14px 0 0;line-height:1.5}'
  + '#' + MOUNT + ' #rv-next{margin-top:16px}'
  + '#' + MOUNT + ' .rv-report{margin:18px 0 0;padding-top:14px;border-top:1px solid rgba(11,21,48,.14)}'
  + '#' + MOUNT + ' .rv-report h4{margin:0 0 4px;font-size:1rem}'
  + '#' + MOUNT + ' .rv-report-sub{margin:0 0 10px;font-size:.86rem;opacity:.78}'
  + '#' + MOUNT + ' .rv-weak{list-style:none;margin:0 0 12px;padding:0;display:grid;gap:6px}'
  + '#' + MOUNT + ' .rv-weak li{display:grid;grid-template-columns:1fr auto;gap:2px 12px;'
  +   'padding:8px 10px;border-left:3px solid #8B3A2E;background:#FAFAF9;border-radius:0 6px 6px 0}'
  + '#' + MOUNT + ' .rv-weak-t{font-weight:600}'
  + '#' + MOUNT + ' .rv-weak-m{grid-column:1;font-size:.8rem;opacity:.7}'
  + '#' + MOUNT + ' .rv-weak-n{grid-row:1/3;align-self:center;font-variant-numeric:tabular-nums;font-weight:700}'
  + '#' + MOUNT + ' .rv-done h3{margin:0 0 8px}'
  + '@media (prefers-reduced-motion: reduce){#' + MOUNT + ' *{transition:none!important;animation:none!important}}';

  function styles() {
    if ($('rv-styles')) return;
    var s = document.createElement('style');
    s.id = 'rv-styles'; s.textContent = CSS;
    document.head.appendChild(s);
  }

  /* ---------- boot ---------- */

  function readComp() {
    try {
      var m = (location.hash + location.search).match(/[?&#]comp=([^&#]+)/);
      return m ? decodeURIComponent(m[1]) : null;
    } catch (e) { return null; }
  }

  function run() {
    if (!$(MOUNT)) return;
    styles();
    ALL = flatten();
    filter.comp = readComp();
    queue = build();
    if (!queue.length && filter.mode === 'due') { filter.mode = 'all'; queue = build(); }
    render();
    document.addEventListener('click', onClick);
    document.addEventListener('change', onChange);

    /* A Study Run in Mastery OS needs to hand a student a run of cards on
       one competency without a page load, because a page load would drop
       the run. Nothing else in here is public; this is the one door. */
    window.BIO005_ANATOMY_RECALL_OPEN = function (compId) {
      filter.comp = compId || null;
      filter.mode = 'all';
      queue = build();
      /* Ten competencies have no cards on purpose: the cadaver and
         specimen identifications, which are evidenced at the bench, not
         by multiple choice. Dropping the filter used to hand a student
         the entire 2,986-card deck without a word, which reads as a
         glitch rather than as an answer. Say what happened instead. */
      NO_CARDS_FOR = null;
      if (!queue.length && compId) {
        NO_CARDS_FOR = compId;
        filter.comp = null;
        queue = build();
      } else if (!queue.length) {
        filter.comp = null;
        queue = build();
      }
      render();
      var sec = document.getElementById('s-recall') || $(MOUNT);
      if (sec && sec.scrollIntoView) sec.scrollIntoView({ block: 'start' });
      return queue.length;
    };
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
})();
