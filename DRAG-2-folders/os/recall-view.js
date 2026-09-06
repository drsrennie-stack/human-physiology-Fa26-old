/* ============================================================
   BIO 005 Human Physiology, Yuba College, Fall 2026
   recall-view.js

   Spaced recall, running INSIDE Mastery Physio OS rather than beside it.

   Wire it after the bank, anywhere on the page:
     <div id="recallMount"></div>
     <script src="bio005-card-bank.js"></script>
     <script src="recall-view.js"></script>

   Deep links, all supported:
     #s-recall            open recall
     #s-recall?comp=ID    open recall filtered to one competency
     ?comp=ID             same, from an external link

   Two kinds of card live in the bank and both are handled:
     multiple choice   options[] + correctIndex, graded by the app
     free recall       q and a only, you grade yourself after
                       committing to an answer out loud or on paper

   Nothing here runs on a timer. A student sets the pace.

   ------------------------------------------------------------
   WHAT CHANGED IN THIS VERSION, AND WHY

   1. THE CARD IS A CARD NOW, ON ITS OWN.
      It used to sit inline in the column with the filters, the stats
      and the rest of the OS still on screen around it. A student
      answering a question was looking at eleven other things at the
      same time. The card now opens on a focus stage: everything behind
      it is dimmed and blurred out, and the only thing lit is the
      question. Dark navy shell, white face, plain body text. It reads
      as a physical card because that is what it is pretending to be.

   2. FLAGGING, AND WHAT A FLAG IS FOR.
      A flag is not a bookmark. Flagged cards, plus the ones the
      student actually missed, assemble into a printable note sheet
      grouped by competency: the question, the answer, why the wrong
      options were wrong, and blank ruled space to redraw or re-derive
      the mechanism from memory. The sheet is the study product; the
      cards are how you find out what belongs on it.

   3. BOTH CONFIDENCE RED FLAGS, NOT ONE.
      The old build caught "sure and wrong", which is the expensive
      one. It missed "not sure and right", which is the quiet one. A
      student who guesses correctly gets the card marked as known and
      never sees it again until it has gone. So a correct answer given
      at low confidence no longer advances the card past box 1: it
      comes back tomorrow and has to be produced again, on purpose,
      before it counts.

   4. DOK PROGRESSION, PER COMPETENCY.
      Cards are gated by depth. Within one competency a student meets
      DOK 1 recall cards first. DOK 2 apply cards unlock once enough
      DOK 1 cards are holding, DOK 3 analyze cards once DOK 2 is. The
      gate is per competency, not per chapter, so being strong on
      osmolarity does not hand you the hard membrane potential
      questions. There is an override, because a gate a student cannot
      open is a wall, and a student reviewing for an exam has earned
      the right to see everything.

      There is no DOK 4. Transfer at that depth is clinical medicine.

   5. TERM START.
      This file was forked from the anatomy build and inherited its
      August 17 term start and 17 week term. BIO 005 opens Tue Sep 8
      2026 and runs 15 weeks. Everything scoped to "this week" or
      "everything taught so far" was reading the wrong week all term.
   ============================================================ */

(function () {
  'use strict';

  var MOUNT = 'recallMount';
  var SKEY  = 'bio005-recall-progress';   // this engine's own spacing state
  var VKEY  = 'bio005-recall-v2';         // the feed Mastery OS already reads
  var FKEY  = 'bio005-recall-flags';      // cards the student flagged by hand

  /* Leitner-style spacing, in days. A card you get right moves out a
     box, a card you miss goes back to the start. Deliberately coarse:
     the point is that hard cards come back soon and easy ones stop
     eating your evening. */
  var BOX_DAYS = [0, 1, 3, 7, 16, 35];

  /* Box 2 is the first box that means anything. Box 1 is "answered
     right once", which is inside the window where a lucky guess still
     looks like knowledge. Box 2 means right on two separate days. */
  var HOLDING = 2;

  /* Cards drawn per competency in a gap run. Three across the 268
     competencies is a survey you can finish in a sitting and it still
     touches everything. Sampling per competency rather than per chapter
     matters: a chapter like Renal Physiology holds nineteen
     competencies, and two cards would have told you nothing about
     seventeen of them. */
  var GAP_PER_COMP = 3;

  /* How many cards at a depth have to be holding before the next depth
     opens, per competency. Capped at what actually exists, so a
     competency with three DOK 1 cards is not permanently stuck. */
  var GATE_N = 3;

  var TERM_START = new Date(2026, 8, 8);   /* Tue 8 September 2026 */
  var TERM_WEEKS = 15;

  var DOKN = { 1: 'Recall', 2: 'Apply', 3: 'Analyze' };

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
  function strip(h) { var d = document.createElement('div'); d.innerHTML = h; return d.textContent || ''; }

  function load() { try { return JSON.parse(localStorage.getItem(SKEY)) || {}; } catch (e) { return {}; } }
  function save(p) { try { localStorage.setItem(SKEY, JSON.stringify(p)); } catch (e) {} }
  function loadFlags() { try { return JSON.parse(localStorage.getItem(FKEY)) || {}; } catch (e) { return {}; } }
  function saveFlags(f) { try { localStorage.setItem(FKEY, JSON.stringify(f)); } catch (e) {} }

  /* ---------- feeding Mastery OS ----------
     Mastery OS already ingests recall results and turns them into
     competency mastery, confidence, last-reviewed and next-recall. It
     reads localStorage['bio005-recall-v2'], resolves a topic id to its
     competencies through BIO005_CARD_COMPETENCY_MAP, and counts one
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
        ev = new StorageEvent('storage', { key: 'bio005-progress', storageArea: localStorage });
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
  var flags = loadFlags();
  var queue = [], pos = 0, revealed = false, confidence = null, shown = null;
  var answered = false;              // this card has been graded
  var picked = null;                 // which option is selected, before submit
  var runLog = [];   // {topicId, topicTitle, moduleTitle, right} for the run in progress
  var stage = false;                 // the focus stage is open
  var lastFocus = null;              // what to hand focus back to when it closes
  var view = 'deck';                 // deck | notes

  /* SCOPE, AND WHY IT DEFAULTS TO THE COURSE SO FAR
     A student who has just watched the week 1 video and comes here for
     spaced retrieval should not be asked about the oxyhemoglobin curve.
     The bank holds the whole term; the student has been taught one week
     of it. So the default scope is everything taught up to today, newest
     material first, and the pool is ordered rather than shuffled across
     the whole course. "The whole course" is still there for anyone
     revising for a final. */
  var filter = { scope: 'sofar', module: 'all', topic: 'all', comp: null,
                 mode: 'due', ungated: false };
  /* set when a competency was asked for and had no cards of its own */
  var NO_CARDS_FOR = null;

  function currentWeek() {
    var wk = Math.floor((new Date() - TERM_START) / 604800000) + 1;
    return wk < 1 ? 1 : (wk > TERM_WEEKS ? TERM_WEEKS : wk);
  }

  /* topic -> the earliest week it is taught, via the competency map and the
     competency list. Topics the map does not cover return 0, which means
     "no week known" and they only appear under the whole course. */
  var TOPIC_WEEK = null;
  function topicWeek(topicId) {
    if (!TOPIC_WEEK) {
      TOPIC_WEEK = {};
      var map = window.BIO005_CARD_COMPETENCY_MAP || window.CARD_COMPETENCY_MAP || {};
      var comps = window.BIO005_COMPETENCIES || [];
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

  /* A card knows its own week when it carries a competency id, which
     every card in this bank does. Fall back to the topic for anything
     hand-added later without one. */
  var COMP_WEEK = null;
  function cardWeek(entry) {
    if (!COMP_WEEK) {
      COMP_WEEK = {};
      (window.BIO005_COMPETENCIES || []).forEach(function (c) { COMP_WEEK[c.id] = c.week || 0; });
    }
    var cid = entry.card.competencyId;
    if (cid && COMP_WEEK[cid]) return COMP_WEEK[cid];
    return topicWeek(entry.topicId);
  }

  function flatten() {
    var bank = window.BIO005_CARD_BANK || window.BIO005_COURSE_CONTENT;
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

  /* THE MAP IS KEYED topicId -> { title, comps: [...] }, and a card may
     carry its own competencyId, which wins. Returns a string or a list,
     because one topic covers several competencies. Never compare the
     result directly: use isComp(). */
  function compOf(entry) {
    var map = window.CARD_COMPETENCY_MAP || window.BIO005_CARD_COMPETENCY_MAP;
    if (entry.card.competencyId) return entry.card.competencyId;
    if (map) {
      var e = map[entry.key] || map[entry.card.id] || map[entry.topicId];
      if (e) return (e && e.comps) ? e.comps : e;
    }
    return null;
  }
  function isComp(entry, want) {
    var c = compOf(entry);
    if (!c) return false;
    return Array.isArray(c) ? c.indexOf(want) > -1 : c === want;
  }
  /* One stable string per card for gating and for grouping the note
     sheet. A card with a competency id gates against that competency;
     anything else falls back to its chapter. */
  function gateKey(entry) {
    var c = compOf(entry);
    if (!c) return entry.topicId;
    return Array.isArray(c) ? (c[0] || entry.topicId) : c;
  }
  function compName(id) {
    if (!COMP_NAME) {
      COMP_NAME = {};
      (window.BIO005_COMPETENCIES || []).forEach(function (c) { COMP_NAME[c.id] = c.name; });
    }
    return COMP_NAME[id] || id;
  }
  var COMP_NAME = null;

  function dokOf(entry) {
    var d = +entry.card.dok || 1;
    return d < 1 ? 1 : (d > 3 ? 3 : d);
  }

  /* ---------- the DOK gate ----------
     Per competency, the deepest level a student has opened. DOK 1 is
     always open. DOK 2 opens when GATE_N of that competency's DOK 1
     cards are holding (box 2 or better, which means right on two
     separate days). DOK 3 opens the same way off DOK 2. The threshold
     is capped at what exists, so a competency carrying only two DOK 1
     cards opens on both of them rather than never.

     Recomputed per build() rather than stored, so it self-heals if a
     student clears progress or the bank gains cards. */
  var GATE = null;
  function computeGates() {
    var byKey = {};
    ALL.forEach(function (e) {
      var k = gateKey(e), d = dokOf(e);
      var g = byKey[k] || (byKey[k] = { have: {1:0,2:0,3:0}, hold: {1:0,2:0,3:0} });
      g.have[d]++;
      var p = progress[e.key];
      if (p && (p.box || 0) >= HOLDING) g.hold[d]++;
    });
    GATE = {};
    Object.keys(byKey).forEach(function (k) {
      var g = byKey[k], top = 1;
      for (var d = 1; d < 3; d++) {
        var need = Math.min(GATE_N, g.have[d]);
        /* A level with no cards at all cannot gate the one below it. */
        if (g.have[d] === 0 || g.hold[d] >= need) top = d + 1;
        else break;
      }
      GATE[k] = top;
    });
  }
  function gateFor(entry) { return (GATE && GATE[gateKey(entry)]) || 1; }

  function due(entry) {
    var p = progress[entry.key];
    if (!p) return true;                       // never seen, so it is due
    return !p.next || p.next <= today();
  }

  function build() {
    computeGates();
    var wkNow = currentWeek();
    var pool = ALL.filter(function (e) {
      var w = cardWeek(e);
      if (filter.scope === 'week'  && w !== wkNow) return false;
      if (filter.scope === 'sofar' && (w === 0 || w > wkNow)) return false;
      if (filter.module !== 'all' && e.moduleId !== filter.module) return false;
      if (filter.topic !== 'all' && e.topicId !== filter.topic) return false;
      if (filter.comp && !isComp(e, filter.comp)) return false;
      if (!filter.ungated && dokOf(e) > gateFor(e)) return false;
      return true;
    });
    if (filter.mode === 'due') pool = pool.filter(due);
    if (filter.mode === 'missed') pool = pool.filter(function (e) {
      var p = progress[e.key];
      return p && (p.wrong > 0 || p.blindspot || p.unsure) && (p.box || 0) < HOLDING;
    });
    if (filter.mode === 'flagged') pool = pool.filter(function (e) { return !!flags[e.key]; });
    if (filter.mode === 'gaps') pool = sampleAcross(pool, GAP_PER_COMP);
    shuffle(pool);
    /* Shuffle first so order inside a week is random, then bring this week's
       material to the front. Newest first is what a student needs after a
       lecture; older weeks still come round, which is the whole point of
       spacing. Inside a week, shallow before deep, so a run walks up the
       levels instead of opening on the hardest thing in the chapter. */
    if (filter.scope === 'sofar') {
      pool.sort(function (a, b) { return cardWeek(b) - cardWeek(a) || dokOf(a) - dokOf(b); });
    } else {
      pool.sort(function (a, b) { return dokOf(a) - dokOf(b); });
    }
    return pool;
  }

  /* A gap run is a survey, not a study session. It takes a small random
     sample from EVERY competency in scope rather than going deep
     anywhere, so a short run tells you where you are weak across the
     whole course. Every run asks different questions, so it stays
     diagnostic however often you run it. */
  function sampleAcross(pool, perComp) {
    var byKey = {};
    pool.forEach(function (e) { (byKey[gateKey(e)] = byKey[gateKey(e)] || []).push(e); });
    var out = [];
    Object.keys(byKey).forEach(function (id) {
      var cards = byKey[id].slice();
      /* Prefer what you have not proven yet, then fill from the rest, so a
         gap run spends its questions where they can still tell you something. */
      var unproven = cards.filter(function (e) { var p = progress[e.key]; return !p || (p.box || 0) < HOLDING; });
      var rest     = cards.filter(function (e) { var p = progress[e.key]; return p && (p.box || 0) >= HOLDING; });
      shuffle(unproven); shuffle(rest);
      out = out.concat(unproven.concat(rest).slice(0, perComp));
    });
    return out;
  }

  /* Fisher-Yates, seeded from Math.random, so the order is different every
     single run. Stability is the wrong goal here: the order IS part of what
     you are being tested on, and a fixed one lets you learn the sequence
     instead of the physiology. */
  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  /* Options are re-shuffled every time a card is shown, not once per card,
     so a student cannot gain marks by learning which position the key
     tends to sit in. Returns a fresh view; the card itself is never
     mutated, so the bank on disk stays as authored. */
  function presentOptions(card) {
    var pairs = card.options.map(function (text, i) { return { text: text, right: i === card.correctIndex }; });
    shuffle(pairs);
    return pairs;
  }

  /* ---------- grading ---------- */

  function grade(entry, right) {
    var p = progress[entry.key] || { box: 0, right: 0, wrong: 0 };
    var unsure = (confidence === 'no' || confidence === 'think');

    if (right) {
      p.right++;
      p.box = Math.min((p.box || 0) + 1, BOX_DAYS.length - 1);
      /* THE QUIET RED FLAG. Right, but the student said they did not
         know it. That is a coin landing the right way up, not recall.
         Hold the card at box 1 so it comes back tomorrow and has to be
         produced deliberately before it counts as held. Only "Not yet"
         does this. "I think so" is a real, if shaky, retrieval. */
      if (confidence === 'no' && p.box > 1) p.box = 1;
      if (confidence === 'no') p.unsure = true;
      else if (p.box >= HOLDING) p.unsure = false;
    } else {
      p.wrong++;
      p.box = 0;
      /* THE EXPENSIVE RED FLAG. Sure and wrong. That pairing is what an
         exam punishes, and a student cannot see it without being asked
         to commit to a confidence first. It is worth more of their time
         than anything they already find hard, because they would not
         have studied it. */
      if (confidence === 'sure') p.blindspot = true;
    }

    p.conf = confidence;
    p.last = today();
    p.next = addDays(today(), BOX_DAYS[p.box]);
    progress[entry.key] = p;
    save(progress);
    feedMasteryOS(entry, right);
    runLog.push({ key: entry.key, topicId: entry.topicId, topicTitle: entry.topicTitle,
                  moduleTitle: entry.moduleTitle, right: !!right,
                  conf: confidence, comp: gateKey(entry) });
    return p;
  }

  /* ---------- flags ---------- */

  function isFlagged(entry) { return !!flags[entry.key]; }
  function toggleFlag(entry) {
    if (flags[entry.key]) delete flags[entry.key];
    else flags[entry.key] = { at: today() };
    saveFlags(flags);
    return isFlagged(entry);
  }

  /* Everything that belongs on a note sheet: cards the student flagged
     by hand, plus the ones they actually missed or were sure and wrong
     on. Missed cards are included without being asked for, because the
     student who most needs the sheet is the least likely to remember to
     flag anything. */
  function sheetEntries() {
    return ALL.filter(function (e) {
      if (flags[e.key]) return true;
      var p = progress[e.key];
      if (!p) return false;
      return p.blindspot || p.unsure || (p.wrong > 0 && (p.box || 0) < HOLDING);
    });
  }
  function sheetReason(e) {
    var p = progress[e.key] || {};
    if (p.blindspot) return 'You were sure, and wrong';
    if (p.wrong > 0 && (p.box || 0) < HOLDING) return 'Missed, not yet holding';
    if (p.unsure) return 'Right, but you said you did not know it';
    return 'You flagged this';
  }

  /* ---------- render, the deck view ---------- */

  function stats() {
    var seen = 0, mastered = 0, shaky = 0, blind = 0, lucky = 0;
    ALL.forEach(function (e) {
      var p = progress[e.key];
      if (!p) return;
      seen++;
      if ((p.box || 0) >= HOLDING) mastered++;
      if (p.wrong > 0 && (p.box || 0) < HOLDING) shaky++;
      if (p.blindspot) blind++;
      if (p.unsure && (p.box || 0) < HOLDING) lucky++;
    });
    return { seen: seen, mastered: mastered, shaky: shaky, blind: blind,
             lucky: lucky, total: ALL.length, sheet: sheetEntries().length };
  }

  function head() {
    var s = stats();
    var mods = {};
    ALL.forEach(function (e) { mods[e.moduleId] = e.moduleTitle || e.moduleId; });
    var opts = '<option value="all">Every module</option>';
    var wkNowT = currentWeek();
    var tops = {};
    ALL.forEach(function (e) {
      if (filter.module !== 'all' && e.moduleId !== filter.module) return;
      var w = cardWeek(e);
      if (filter.scope === 'week'  && w !== wkNowT) return;
      if (filter.scope === 'sofar' && (w === 0 || w > wkNowT)) return;
      tops[e.topicId] = e.topicTitle || e.topicId;
    });
    var topOpts = '<option value="all">Every chapter</option>';
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

    var redflags = '';
    if (s.blind || s.lucky) {
      redflags = '<div class="rv-flags-note">';
      if (s.blind) {
        redflags += '<p class="rv-blind"><strong>Sure and wrong on ' + s.blind + ' card'
          + (s.blind === 1 ? '' : 's') + '.</strong> Those are worth more of your time than '
          + 'anything you already find hard, because you would not have studied them.</p>';
      }
      if (s.lucky) {
        redflags += '<p class="rv-lucky"><strong>Right without knowing it on ' + s.lucky + ' card'
          + (s.lucky === 1 ? '' : 's') + '.</strong> You picked the correct option after saying '
          + 'you did not know it. Those are held back deliberately so you have to produce the '
          + 'answer a second time before they count.</p>';
      }
      redflags += '</div>';
    }

    return ''
      + '<div class="rv-stats" role="group" aria-label="Your recall progress">'
      +   '<p class="rv-stat"><strong>' + s.total + '</strong><span>cards in the bank</span></p>'
      +   '<p class="rv-stat"><strong>' + s.seen + '</strong><span>you have seen</span></p>'
      +   '<p class="rv-stat"><strong>' + s.mastered + '</strong><span>holding steady</span></p>'
      +   '<p class="rv-stat"><strong>' + s.shaky + '</strong><span>still shaky</span></p>'
      + '</div>'
      + redflags
      + '<div class="rv-controls">'
      +   '<span class="rv-field"><label for="rv-scope">Material</label>'
      +     '<select id="rv-scope">'
      +       '<option value="sofar"' + (filter.scope === 'sofar' ? ' selected' : '') + '>Everything taught so far</option>'
      +       '<option value="week"'  + (filter.scope === 'week'  ? ' selected' : '') + '>This week only</option>'
      +       '<option value="all"'   + (filter.scope === 'all'   ? ' selected' : '') + '>The whole course</option>'
      +     '</select></span>'
      +   '<span class="rv-field"><label for="rv-mod">Module</label>'
      +     '<select id="rv-mod">' + opts + '</select></span>'
      +   '<span class="rv-field"><label for="rv-topic">Chapter</label>'
      +     '<select id="rv-topic">' + topOpts + '</select></span>'
      +   '<span class="rv-field"><label for="rv-mode">Show me</label>'
      +     '<select id="rv-mode">'
      +       '<option value="due"' + (filter.mode === 'due' ? ' selected' : '') + '>Cards due today</option>'
      +       '<option value="gaps"' + (filter.mode === 'gaps' ? ' selected' : '') + '>Find my gaps</option>'
      +       '<option value="missed"' + (filter.mode === 'missed' ? ' selected' : '') + '>Ones I keep missing</option>'
      +       '<option value="flagged"' + (filter.mode === 'flagged' ? ' selected' : '') + '>Ones I flagged</option>'
      +       '<option value="all"' + (filter.mode === 'all' ? ' selected' : '') + '>Everything</option>'
      +     '</select></span>'
      + '</div>'
      + '<div class="rv-actions">'
      +   '<button type="button" class="btn primary" id="rv-start">'
      +     (pos > 0 && pos < queue.length ? 'Back to the card' : 'Start a run') + '</button> '
      +   '<button type="button" class="btn ghost" id="rv-restart">Fresh run</button> '
      +   '<button type="button" class="btn ghost" id="rv-notes">Note sheets'
      +     (s.sheet ? ' (' + s.sheet + ')' : '') + '</button>'
      + '</div>'
      + '<p class="rv-gate-line">'
      +   '<label class="rv-check"><input type="checkbox" id="rv-ungated"'
      +   (filter.ungated ? ' checked' : '') + '> Show every depth now</label> '
      +   '<span class="rv-gate-help">Off, cards climb from recall to apply to analyze as each '
      +   'competency starts to hold. On, you see all three straight away, which is what you '
      +   'want the week before an exam.</span>'
      + '</p>';
  }

  /* ---------- render, the focus stage ----------
     The card is not part of the page. It sits on a dimmed, blurred
     backdrop with nothing else reachable, because the whole point of
     retrieval practice is that there is nothing to look at except the
     question. */

  var CONFN = { sure: 'I know this', think: 'I think so', no: 'Not yet' };

  function cardHtml(e) {
    var c = e.card;
    var body = '';
    if (!revealed) {
      /* STEP ONE. Commit to a confidence before the options are on screen.
         Seeing four plausible options changes what a student believes they
         knew, so a rating given afterwards measures recognition, not
         recall. This step is what makes both red flags meaningful. */
      body = '<div class="rv-conf" role="group" aria-labelledby="rv-conf-h">'
           + '<p id="rv-conf-h" class="rv-conf-h">Before you look, how sure are you?</p>'
           + '<div class="rv-conf-row">'
           +   cbtn('sure',  CONFN.sure)
           +   cbtn('think', CONFN.think)
           +   cbtn('no',    CONFN.no)
           + '</div>'
           + '<p class="rv-conf-why">Commit first. It is the only way the app can tell the '
           + 'difference between knowing something and getting it right.</p>'
           + '</div>';
    } else if (e.mcq) {
      /* STEP TWO. Pick an option, then submit. Selecting is not the same
         as answering: a student can change their mind, and nothing is
         graded until they say so. The confidence they gave stays on screen
         and stays changeable right up to the moment they commit. */
      if (!shown) shown = presentOptions(c);
      var locked = answered;
      body = '<div class="rv-chosen">'
           +   '<span class="rv-chosen-l">Your confidence</span> '
           +   '<span class="rv-chosen-v">' + esc(CONFN[confidence] || '') + '</span>'
           +   (locked ? '' : ' <button type="button" class="rv-chosen-b" id="rv-changeconf">Change</button>')
           + '</div>'
           + '<ol class="rv-opts">' + shown.map(function (o, i) {
               return '<li><button type="button" class="rv-opt'
                    + (picked === i ? ' is-picked' : '') + '" data-pick="' + i + '"'
                    + ' aria-pressed="' + (picked === i ? 'true' : 'false') + '">'
                    + esc(o.text) + '</button></li>';
             }).join('') + '</ol>'
           + (locked ? '' :
               '<div class="rv-submit-row">'
             + '<button type="button" class="btn primary" id="rv-submit"'
             +   (picked === null ? ' disabled' : '') + '>Submit answer</button>'
             + '<span class="rv-submit-hint">'
             +   (picked === null ? 'Choose one of the four, then submit.'
                                  : 'You rated this ' + esc(CONFN[confidence] || '') + '. Submit when you are ready.')
             + '</span></div>');
    } else {
      body = '<div class="rv-verdict"><p class="rv-answer-h">The answer</p>'
           + '<p class="rv-verdict-a">' + c.a + '</p>'
           + (c.explanation ? '<p class="rv-expl">' + c.explanation + '</p>' : '')
           + '<div class="rv-selfgrade"><p>Did you have it?</p>'
           +   '<button type="button" class="btn primary" data-self="1">I had it</button> '
           +   '<button type="button" class="btn" data-self="0">I did not</button>'
           + '</div></div>';
    }

    var dok = dokOf(e);
    var flagged = isFlagged(e);
    var comp = gateKey(e);

    return ''
      + '<div class="rv-backdrop" id="rv-backdrop"></div>'
      + '<div class="rv-stage" id="rv-stage" role="dialog" aria-modal="true" aria-labelledby="rv-q">'
      + '<article class="rv-card rv-d' + dok + '">'
      +   '<header class="rv-shell">'
      +     '<p class="rv-level"><span class="rv-badge" aria-hidden="true">' + dok + '</span>'
      +       esc(DOKN[dok]) + '</p>'
      +     '<p class="rv-crumb">' + esc(compName(comp)) + '</p>'
      +     '<p class="rv-count">Card ' + (pos + 1) + ' of ' + queue.length + '</p>'
      +     '<button type="button" class="rv-flag' + (flagged ? ' is-on' : '') + '" id="rv-flagbtn"'
      +       ' aria-pressed="' + (flagged ? 'true' : 'false') + '">'
      +       '<span aria-hidden="true">&#9873;</span> '
      +       '<span class="rv-flag-t">' + (flagged ? 'Flagged for the note sheet' : 'Flag this for my note sheet') + '</span>'
      +     '</button>'
      +     '<button type="button" class="rv-close" id="rv-close" aria-label="Close the card and go back to the deck">'
      +       '<span aria-hidden="true">&#10005;</span></button>'
      +   '</header>'
      +   '<div class="rv-face">'
      +     '<h3 class="rv-q" id="rv-q">' + c.q + '</h3>'
      +     body
      +     '<p class="rv-live" id="rv-live" role="status" aria-live="polite"></p>'
      +   '</div>'
      + '</article>'
      + '</div>';
  }
  function cbtn(k, label) {
    return '<button type="button" class="btn' + (k === 'sure' ? ' gold' : '') + '" data-conf="' + k + '">'
         + esc(label) + '</button>';
  }

  /* ---------- the note sheet ----------
     Grouped by competency, worst first. Every entry carries the
     question, the answer, why the wrong options were wrong, and ruled
     space to redraw the mechanism from memory. The blank space is not
     decoration: drawing from memory is the integrity mechanism this
     course is built on, and a note sheet you only read is a note sheet
     that taught you nothing. */

  function noteSheetHtml() {
    var items = sheetEntries();
    if (!items.length) {
      return '<div class="rv-panel"><h3>Nothing on your note sheet yet</h3>'
        + '<p>This fills up on its own. Anything you miss, anything you are sure about and wrong '
        + 'on, and anything you flag while you work lands here, grouped by competency. Then you '
        + 'print it and work it by hand.</p>'
        + '<p><button type="button" class="btn" id="rv-back">Back to the cards</button></p></div>';
    }
    var by = {};
    items.forEach(function (e) {
      var k = gateKey(e);
      (by[k] = by[k] || []).push(e);
    });
    var keys = Object.keys(by).sort(function (a, b) { return by[b].length - by[a].length; });

    var sheet = '<div class="rv-sheet" id="rv-sheet">'
      + '<div class="rv-sheet-head">'
      +   '<p class="rv-sheet-eyebrow">BIO 005 Human Physiology</p>'
      +   '<h2>Your note sheet</h2>'
      +   '<p class="rv-sheet-sub">' + items.length + ' card' + (items.length === 1 ? '' : 's')
      +     ' across ' + keys.length + ' competenc' + (keys.length === 1 ? 'y' : 'ies')
      +     ', built from what you missed and what you flagged. Work it by hand. '
      +     'Read the explanation once, then cover it and redraw the mechanism in the blank space.</p>'
      +   '<p class="rv-sheet-sub rv-sheet-name">Name and date</p>'
      + '</div>';

    keys.forEach(function (k, gi) {
      sheet += '<section class="rv-sheet-group">'
        + '<h3><span class="rv-sheet-n">' + (gi + 1) + '</span> ' + esc(compName(k)) + '</h3>';
      by[k].forEach(function (e) {
        var c = e.card;
        sheet += '<article class="rv-sheet-item">'
          + '<p class="rv-sheet-why">' + esc(sheetReason(e)) + ' &middot; ' + DOKN[dokOf(e)] + '</p>'
          + '<p class="rv-sheet-q">' + c.q + '</p>'
          + '<p class="rv-sheet-a"><span>Answer</span> ' + c.a + '</p>'
          + (c.explanation ? '<p class="rv-sheet-e">' + c.explanation + '</p>' : '')
          + '<div class="rv-sheet-draw">'
          +   '<p class="rv-sheet-draw-h">Cover the answer. Draw or write the mechanism from memory.</p>'
          +   '<div class="rv-sheet-space"></div>'
          + '</div>'
          + '</article>';
      });
      sheet += '</section>';
    });
    sheet += '<p class="rv-sheet-foot">Dr. Sharilyn Rennie &middot; BIO 005 Human Physiology &middot; '
      + 'Generated from your own answers. Nothing on this sheet leaves your browser.</p>'
      + '</div>';

    return '<div class="rv-panel rv-panel-sheet">'
      + '<div class="rv-sheet-actions">'
      +   '<button type="button" class="btn primary" id="rv-print">Print this sheet</button> '
      +   '<button type="button" class="btn" id="rv-save">Save a copy</button> '
      +   '<button type="button" class="btn ghost" id="rv-back">Back to the cards</button> '
      +   '<button type="button" class="btn ghost" id="rv-clearflags">Clear my flags</button>'
      + '</div>'
      + sheet + '</div>';
  }

  function render() {
    var host = $(MOUNT);
    if (!host) return;
    if (!ALL.length) {
      /* An EMPTY bank is a real state, not a load failure. Say what is
         true and give the student the thing that does work. */
      var st = window.BIO005_CARD_BANK_STATUS || {};
      if (window.BIO005_CARD_BANK && st.inBuild) {
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

    if (view === 'notes') { host.innerHTML = noteSheetHtml(); focusFirst(host); return; }

    var inner = head();
    if (NO_CARDS_FOR) {
      var cs = window.BIO005_COMPETENCIES || [];
      var hit = null;
      for (var ci = 0; ci < cs.length; ci++) { if (cs[ci].id === NO_CARDS_FOR) { hit = cs[ci]; break; } }
      inner += '<div class="rv-panel"><h3>' + esc(hit ? hit.name : 'That one')
             + ' has no cards of its own</h3>'
             + '<p>It is proved by doing rather than by answering: a measurement, a tracing, or a '
             + 'drawing. Showing you everything else that is queued instead.</p></div>';
    }
    if (!queue.length) {
      inner += '<div class="rv-panel"><h3>Nothing due right now</h3>'
             + '<p>That is the system working, not a gap. Cards come back on a schedule so you '
             + 'meet them again just as they start to fade. If you want more anyway, switch '
             + '"Show me" to everything.</p></div>';
    } else if (pos >= queue.length) {
      inner += '<div class="rv-panel"><h3>That is the run finished</h3>'
             + '<p>' + queue.length + ' card' + (queue.length === 1 ? '' : 's') + ' done. '
             + 'Come back tomorrow and the ones you found hard will be waiting, the ones you '
             + 'found easy will not.</p>'
             + report()
             + '<button type="button" class="btn primary" id="rv-restart2">Run another set</button> '
             + '<button type="button" class="btn" id="rv-notes2">Build my note sheet</button></div>';
    } else if (stage) {
      inner += cardHtml(queue[pos]);
    } else {
      inner += '<div class="rv-panel"><h3>' + queue.length + ' card'
             + (queue.length === 1 ? '' : 's') + ' queued</h3>'
             + '<p>They open one at a time on their own, with the rest of the page out of the '
             + 'way. Press Escape at any point to come back here.</p></div>';
    }
    /* Tear the old stage off the body BEFORE the new markup is written.
       mountStage() moves the freshly rendered backdrop and stage onto the
       body, and without this the previous pair stayed there. Two elements
       then shared each id, getElementById returned the stale one, and the
       click handler's "is this inside the stage" test failed against a
       node that was no longer on screen. Every click after the first
       render was silently dropped. */
    unmountStage();
    host.innerHTML = inner;
    if (stage) mountStage();
  }

  /* Move the stage out of the mount and onto the body, so nothing in the
     OS layout (a transformed ancestor, an overflow clip, a stacking
     context) can trap it half on screen. */
  function mountStage() {
    var host = $(MOUNT);
    var bd = $('rv-backdrop'), sg = $('rv-stage');
    if (!bd || !sg) return;
    document.body.appendChild(bd);
    document.body.appendChild(sg);
    document.body.classList.add('rv-locked');
    sg.scrollTop = 0;
    focusFirst(sg);
  }
  function unmountStage() {
    var bd = $('rv-backdrop'), sg = $('rv-stage');
    if (bd && bd.parentNode) bd.parentNode.removeChild(bd);
    if (sg && sg.parentNode) sg.parentNode.removeChild(sg);
    document.body.classList.remove('rv-locked');
  }
  function focusFirst(root) {
    if (!root) return;
    var f = root.querySelector('button:not([disabled]), [href], input, select, textarea');
    if (f && f.focus) { try { f.focus(); } catch (e) {} }
  }

  /* Keep the keyboard inside the card while it is open. Without this a
     student tabbing through the card walks straight out into the OS
     behind it, which they cannot see. */
  function trap(ev) {
    if (!stage || ev.key !== 'Tab') return;
    var sg = $('rv-stage');
    if (!sg) return;
    var f = sg.querySelectorAll('button:not([disabled]), [href], input, select, textarea');
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (ev.shiftKey && document.activeElement === first) { ev.preventDefault(); last.focus(); }
    else if (!ev.shiftKey && document.activeElement === last) { ev.preventDefault(); first.focus(); }
  }

  function closeStage() {
    stage = false;
    unmountStage();
    render();
    if (lastFocus && lastFocus.focus) { try { lastFocus.focus(); } catch (e) {} }
  }

  /* What the run just told you, worst first. Only shown when there is enough
     to say something honest: a topic you answered once is not evidence. */
  function report() {
    if (runLog.length < 4) return '';
    var by = {};
    runLog.forEach(function (r) {
      var t = by[r.comp] = by[r.comp] || { mod: r.moduleTitle, n: 0, ok: 0 };
      t.n++; if (r.right) t.ok++;
    });
    var rows = Object.keys(by).map(function (id) {
      var t = by[id];
      return { id: id, title: compName(id), mod: t.mod, n: t.n, ok: t.ok, pct: t.ok / t.n };
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
      + '<p class="rv-report-sub">Weakest first. ' + clean + ' competenc' + (clean === 1 ? 'y' : 'ies')
      + ' came back clean and are not listed.</p>'
      + '<ol class="rv-weak">' + weak.slice(0, 12).map(function (r) {
          return '<li><span class="rv-weak-t">' + esc(r.title || r.id) + '</span>'
               + '<span class="rv-weak-m">' + esc(r.mod || '') + '</span>'
               + '<span class="rv-weak-n">' + r.ok + ' of ' + r.n + '</span></li>';
        }).join('') + '</ol>'
      + '<p class="rv-report-sub">This is one sample, not a verdict. Run it again '
      + 'in a few days and watch which competencies keep appearing. Those are the real ones.</p>'
      + '</div>';
  }

  function next() {
    pos++; revealed = false; confidence = null; shown = null; answered = false; picked = null;
    if (pos >= queue.length) { stage = false; unmountStage(); }
    render();
  }

  function say(msg) {
    var l = $('rv-live');
    if (l) l.textContent = msg;
  }

  /* ---------- events ---------- */

  function onClick(ev) {
    var sel = '[data-conf],[data-pick],[data-self],#rv-restart,#rv-restart2,#rv-start,'
            + '#rv-notes,#rv-notes2,#rv-back,#rv-print,#rv-save,#rv-clearflags,'
            + '#rv-flagbtn,#rv-close,#rv-submit,#rv-changeconf';
    var t = ev.target.closest ? ev.target.closest(sel) : null;
    if (!t) return;
    var host = $(MOUNT), sg = $('rv-stage');
    if (!(host && host.contains(t)) && !(sg && sg.contains(t))) return;

    if (t.id === 'rv-start') {
      lastFocus = t;
      if (!queue.length || pos >= queue.length) { queue = build(); pos = 0; runLog = []; }
      revealed = false; confidence = null; shown = null; answered = false; picked = null;
      stage = queue.length > 0; view = 'deck'; render();
      return;
    }
    if (t.id === 'rv-restart' || t.id === 'rv-restart2') {
      lastFocus = t;
      queue = build(); pos = 0; revealed = false; confidence = null; shown = null;
      answered = false; picked = null; runLog = []; view = 'deck'; stage = queue.length > 0;
      render();
      if (!queue.length) say('Nothing is due.');
      return;
    }
    if (t.id === 'rv-notes' || t.id === 'rv-notes2') {
      lastFocus = t; stage = false; unmountStage(); view = 'notes'; render(); return;
    }
    if (t.id === 'rv-back') { view = 'deck'; render(); return; }
    if (t.id === 'rv-print') { printSheet(); return; }
    if (t.id === 'rv-save') { saveSheet(); return; }
    if (t.id === 'rv-clearflags') {
      flags = {}; saveFlags(flags); render(); return;
    }
    if (t.id === 'rv-close') { closeStage(); return; }

    var e = queue[pos];
    if (!e) return;

    if (t.id === 'rv-flagbtn') {
      var on = toggleFlag(e);
      t.setAttribute('aria-pressed', on ? 'true' : 'false');
      t.className = 'rv-flag' + (on ? ' is-on' : '');
      var lab = t.querySelector('.rv-flag-t');
      if (lab) lab.textContent = on ? 'Flagged for the note sheet' : 'Flag this for my note sheet';
      say(on ? 'Flagged. It will appear on your note sheet.' : 'Flag removed.');
      return;
    }

    if (t.hasAttribute('data-conf')) {
      confidence = t.getAttribute('data-conf');
      revealed = true;
      picked = null;
      render();
      say('You rated this ' + CONFN[confidence] + '. Choose one of the four options, then submit.');
      return;
    }
    if (t.id === 'rv-changeconf') {
      /* Back to the confidence step. The pick is dropped on purpose: a
         student who has seen the options and goes back to re-rate is
         re-rating on recognition, so the honest thing is to make them
         choose again rather than carry a selection across. */
      revealed = false; picked = null; shown = null;
      render();
      return;
    }
    if (t.hasAttribute('data-pick')) {
      /* SELECTING IS NOT ANSWERING. Nothing is graded here. The old build
         graded on the click, so a mis-tap on a phone was a permanent
         wrong answer that reset the card's box and, at high confidence,
         wrote a blindspot the student never had. */
      if (answered) return;
      picked = +t.getAttribute('data-pick');
      var sgSel = $('rv-stage') || $(MOUNT);
      var all = sgSel.querySelectorAll('.rv-opt');
      for (var pi = 0; pi < all.length; pi++) {
        var on = pi === picked;
        all[pi].className = 'rv-opt' + (on ? ' is-picked' : '');
        all[pi].setAttribute('aria-pressed', on ? 'true' : 'false');
      }
      var sb = $('rv-submit');
      if (sb) sb.disabled = false;
      var hint = sgSel.querySelector('.rv-submit-hint');
      if (hint) hint.textContent = 'You rated this ' + CONFN[confidence]
                                 + '. Submit when you are ready.';
      say('Selected. Submit when you are ready.');
      return;
    }
    if (t.id === 'rv-submit') {
      if (answered || picked === null) return;
      answered = true;
      var pick = picked;
      var rightAt = -1;
      for (var k = 0; k < shown.length; k++) { if (shown[k].right) rightAt = k; }
      var right = pick === rightAt;
      grade(e, right);
      var host2 = $('rv-stage') || $(MOUNT);
      var opts = host2.querySelectorAll('.rv-opt');
      for (var i = 0; i < opts.length; i++) {
        opts[i].disabled = true;
        opts[i].removeAttribute('aria-pressed');
        if (i === rightAt) opts[i].className = 'rv-opt is-right';
        else if (i === pick) opts[i].className = 'rv-opt is-wrong';
        else opts[i].className = 'rv-opt is-spent';
      }
      var row = host2.querySelector('.rv-submit-row');
      if (row && row.parentNode) row.parentNode.removeChild(row);
      var chb = $('rv-changeconf');
      if (chb && chb.parentNode) chb.parentNode.removeChild(chb);
      /* The verdict is words, not just color, so it survives color
         blindness and reaches a screen reader through the live region. */
      var verdict = right ? 'Correct. ' : 'Not this time. The answer is: ' + strip(shown[rightAt].text) + '. ';
      if (!right && confidence === 'sure') {
        verdict += 'You were sure on that one. That is the pairing worth chasing, so it has gone '
                 + 'onto your note sheet. ';
      }
      if (right && confidence === 'no') {
        verdict += 'You said you did not know it, so it is held back to tomorrow rather than '
                 + 'counted as learned. ';
      }
      if (e.card.explanation) verdict += strip(e.card.explanation);
      showExplanation(e, right);
      say(verdict);
      addNext();
      return;
    }
    if (t.hasAttribute('data-self')) {
      if (answered) return;
      answered = true;
      var got = t.getAttribute('data-self') === '1';
      grade(e, got);
      say(got ? 'Marked as known.' : 'Marked to come back soon.');
      addNext();
      return;
    }
  }

  /* The teaching moment. Shown after the click, never before it. */
  function showExplanation(e, right) {
    var sg = $('rv-stage');
    if (!sg || sg.querySelector('.rv-verdict')) return;
    var c = e.card;
    var d = document.createElement('div');
    d.className = 'rv-verdict ' + (right ? 'is-right' : 'is-wrong');
    var flagline = '';
    if (!right && confidence === 'sure') {
      flagline = '<p class="rv-redflag">Sure and wrong. This one is on your note sheet.</p>';
    } else if (right && confidence === 'no') {
      flagline = '<p class="rv-redflag rv-redflag-soft">Right, but you said you did not know it. '
               + 'It comes back tomorrow before it counts.</p>';
    }
    d.innerHTML = flagline
      + '<p class="rv-answer-h">' + (right ? 'Correct' : 'The answer') + '</p>'
      + '<p class="rv-verdict-a">' + c.a + '</p>'
      + (c.explanation ? '<p class="rv-expl">' + c.explanation + '</p>' : '');
    var face = sg.querySelector('.rv-face');
    var live = sg.querySelector('.rv-live');
    if (face) face.insertBefore(d, live || null);
    /* Bring the verdict into view. On a long explanation the panel opens
       below the fold, and a student who does not scroll reads nothing,
       which is the one part of the card that actually teaches. */
    try {
      var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      d.scrollIntoView({ block: 'nearest', behavior: reduce ? 'auto' : 'smooth' });
    } catch (e) {}
  }

  function addNext() {
    var sg = $('rv-stage');
    if (!sg || sg.querySelector('#rv-next')) return;
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'btn primary'; b.id = 'rv-next';
    b.textContent = pos + 1 >= queue.length ? 'Finish the run' : 'Next card';
    b.addEventListener('click', next);
    var face = sg.querySelector('.rv-face');
    if (face) face.appendChild(b);
    b.focus();
  }

  function onChange(ev) {
    if (ev.target.id === 'rv-scope') { filter.scope = ev.target.value; filter.topic = 'all'; }
    else if (ev.target.id === 'rv-topic') { filter.topic = ev.target.value; }
    else if (ev.target.id === 'rv-mod')  { filter.module = ev.target.value; filter.topic = 'all'; }
    else if (ev.target.id === 'rv-mode') { filter.mode = ev.target.value; }
    else if (ev.target.id === 'rv-ungated') { filter.ungated = !!ev.target.checked; }
    else return;
    queue = build(); pos = 0; revealed = false; confidence = null; shown = null;
    answered = false; picked = null; runLog = []; stage = false; unmountStage(); render();
  }

  function onKey(ev) {
    if (ev.key === 'Escape' && stage) { ev.preventDefault(); closeStage(); return; }
    trap(ev);
  }

  /* ---------- printing and saving the sheet ---------- */

  function printSheet() {
    /* The sheet is moved to the body and everything else is hidden for
       the print, then put back. Printing the OS page whole would give a
       student forty pages of dashboard. */
    var panel = $('rv-sheet');
    if (!panel) return;
    var holder = document.createElement('div');
    holder.className = 'rv-print-holder';
    holder.appendChild(panel.cloneNode(true));
    document.body.appendChild(holder);
    document.body.classList.add('rv-printing');
    var done = function () {
      document.body.classList.remove('rv-printing');
      if (holder.parentNode) holder.parentNode.removeChild(holder);
      window.removeEventListener('afterprint', done);
    };
    window.addEventListener('afterprint', done);
    try { window.print(); } catch (e) { done(); }
    /* Safari does not always fire afterprint. */
    setTimeout(function () { if (document.body.classList.contains('rv-printing')) done(); }, 4000);
  }

  function saveSheet() {
    var panel = $('rv-sheet');
    if (!panel) return;
    var doc = '<!doctype html><html lang="en"><head><meta charset="utf-8">'
      + '<meta name="viewport" content="width=device-width, initial-scale=1">'
      + '<title>BIO 005 note sheet</title><style>' + SHEET_CSS + '</style></head><body>'
      + panel.outerHTML + '</body></html>';
    try {
      var blob = new Blob([doc], { type: 'text/html' });
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'bio005-note-sheet-' + today() + '.html';
      document.body.appendChild(a);
      a.click();
      setTimeout(function () {
        URL.revokeObjectURL(a.href);
        if (a.parentNode) a.parentNode.removeChild(a);
      }, 1000);
    } catch (e) {
      window.alert('This browser would not save the file. Use Print instead, and choose '
                 + 'Save as PDF.');
    }
  }

  /* ---------- styles ----------
     Two surfaces, and they are deliberately different. The deck controls
     belong to the OS and keep its application palette. The card is its
     own object: dark navy shell, white face, plain body text, lifted off
     a dimmed backdrop. */

  /* THE CARD IS RED. Scrubs's call, and it is the right one: on the dark
     navy application surface a navy card was a slightly different dark
     rectangle on a dark page. Maroon #7A2A22 is already in the OS palette
     (welcome.html carries it), it separates hard from the navy behind it,
     and white on it measures 9.6:1, which is AAA. The lighter terras were
     tested and rejected: #C2734D gives 3.6:1 against white and #A0522D
     gives 5.6:1, so neither can carry body text at AAA.

     No bookend bars. The maroon is a frame around the white face on all
     four sides, not a band across the top and another across the bottom. */
  var NAVY = '#08101F', NAVY2 = '#0B1530', GOLD = '#DCB45C';
  var CARD = '#7A2A22';          // the card shell
  var CARD_DEEP = '#5E201A';     // text sitting on a light chip over the shell
  var ON_CARD = '#FDEEE9';       // body text on the shell, 8.5:1
  var ON_CARD_SOFT = '#F4DCD4';  // secondary text on the shell, 7.3:1
  var ON_CARD_GOLD = '#EFCB7E';  // the accent that survives on maroon, 6.2:1
  var SHADE = '#FBF5F3';         // the shaded answer panel on the white face

  var SHEET_CSS = ''
    + '.rv-sheet{max-width:44rem;margin:0 auto;color:#101828;'
    +   'font:400 15px/1.6 "Plus Jakarta Sans",system-ui,-apple-system,Segoe UI,sans-serif;'
    +   'background:#fff;padding:8px 0}'
    + '.rv-sheet-head{border-bottom:2px solid ' + CARD + ';padding-bottom:14px;margin-bottom:22px}'
    + '.rv-sheet-eyebrow{margin:0 0 4px;font-size:11px;letter-spacing:.16em;text-transform:uppercase;'
    +   'font-weight:700;color:#8A4A2B}'
    + '.rv-sheet h2{margin:0 0 6px;font-size:26px;line-height:1.2;color:' + NAVY + '}'
    + '.rv-sheet-sub{margin:0 0 6px;font-size:14px;color:#3D4757}'
    + '.rv-sheet-name{margin-top:12px}'
    + '.rv-sheet-group{margin:0 0 26px;break-inside:auto}'
    + '.rv-sheet-group h3{display:flex;align-items:center;gap:9px;margin:0 0 12px;font-size:17px;'
    +   'color:' + NAVY + ';border-bottom:1px solid rgba(8,16,31,.18);padding-bottom:7px}'
    + '.rv-sheet-n{display:inline-flex;align-items:center;justify-content:center;width:26px;'
    +   'height:26px;border-radius:7px;background:' + CARD + ';color:#fff;font-size:13px;'
    +   'font-weight:700;flex:none}'
    + '.rv-sheet-item{margin:0 0 20px;padding:0 0 4px;break-inside:avoid}'
    + '.rv-sheet-why{margin:0 0 4px;font-size:11px;letter-spacing:.09em;text-transform:uppercase;'
    +   'font-weight:700;color:#8A4A2B}'
    + '.rv-sheet-q{margin:0 0 7px;font-weight:700;font-size:15.5px;color:' + NAVY + '}'
    + '.rv-sheet-a{margin:0 0 6px}'
    + '.rv-sheet-a span{font-size:11px;letter-spacing:.09em;text-transform:uppercase;'
    +   'font-weight:700;color:#4A5C6B;margin-right:5px}'
    + '.rv-sheet-e{margin:0 0 10px;font-size:14px;color:#3D4757}'
    + '.rv-sheet-draw{border-left:3px solid ' + CARD + ';padding:8px 0 4px 12px}'
    + '.rv-sheet-draw-h{margin:0 0 8px;font-size:12.5px;font-style:italic;color:#4A5C6B}'
    /* OPEN SPACE, NOT RULED LINES. Ruled lines say "write sentences here".
       The thing being asked for is a drawing, and a drawing does not sit
       on lines. A plain bounded box, sized for a diagram. */
    + '.rv-sheet-space{height:120px;border:1px dashed rgba(122,42,34,.60);border-radius:8px}'
    + '.rv-sheet-name{margin-top:14px;padding-bottom:26px;'
    +   'border-bottom:1px solid rgba(8,16,31,.30)}'
    + '.rv-sheet-foot{margin:26px 0 0;padding-top:10px;border-top:1px solid rgba(8,16,31,.18);'
    +   'font-size:11.5px;color:#4A5C6B}'
    + '@media print{.rv-sheet{max-width:none;font-size:11.5pt}'
    +   '.rv-sheet-item{break-inside:avoid;page-break-inside:avoid}'
    +   '.rv-sheet-group h3{break-after:avoid}}';

  var CSS = ''
  /* deck controls */
  + '#' + MOUNT + ' .rv-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:12px;margin:0 0 14px}'
  + '#' + MOUNT + ' .rv-stat{margin:0;padding:12px 14px;border:1px solid rgba(11,21,48,.16);border-radius:10px;background:#fff}'
  + '#' + MOUNT + ' .rv-stat strong{display:block;font-size:1.5rem;line-height:1.1}'
  + '#' + MOUNT + ' .rv-stat span{font-size:.82rem;opacity:.75}'
  + '#' + MOUNT + ' .rv-flags-note{display:grid;gap:8px;margin:0 0 14px}'
  + '#' + MOUNT + ' .rv-blind,#' + MOUNT + ' .rv-lucky{margin:0;padding:12px 14px;background:#fff;border-radius:0 8px 8px 0}'
  + '#' + MOUNT + ' .rv-blind{border-left:3px solid #8B3A2E}'
  + '#' + MOUNT + ' .rv-lucky{border-left:3px solid ' + GOLD + '}'
  + '#' + MOUNT + ' .rv-controls{display:flex;flex-wrap:wrap;gap:12px;align-items:flex-end;margin:0 0 14px}'
  + '#' + MOUNT + ' .rv-field{display:flex;flex-direction:column;gap:4px}'
  + '#' + MOUNT + ' .rv-field label{font-size:.78rem;font-weight:600;opacity:.8}'
  + '#' + MOUNT + ' .rv-field select{padding:8px 10px;border:1px solid rgba(11,21,48,.52);border-radius:8px;background:#fff;font:inherit;min-height:44px}'
  + '#' + MOUNT + ' .rv-actions{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 12px}'
  + '#' + MOUNT + ' .rv-gate-line{margin:0 0 16px;font-size:.84rem}'
  + '#' + MOUNT + ' .rv-check{display:inline-flex;align-items:center;gap:8px;font-weight:600;min-height:44px}'
  + '#' + MOUNT + ' .rv-check input{width:18px;height:18px}'
  + '#' + MOUNT + ' .rv-gate-help{display:block;opacity:.78;margin-top:2px}'
  + '#' + MOUNT + ' .rv-panel{background:#fff;border-radius:12px;padding:18px 20px;margin:0 0 14px;'
  +   'box-shadow:0 1px 3px rgba(8,16,31,.10)}'
  + '#' + MOUNT + ' .rv-panel h3{margin:0 0 8px;font-size:17px}'
  + '#' + MOUNT + ' .rv-panel p{margin:0 0 10px}'

  /* the focus stage */
  + '.rv-backdrop{position:fixed;inset:0;z-index:9998;background:rgba(4,8,16,.90);'
  +   '-webkit-backdrop-filter:blur(7px) saturate(.6);backdrop-filter:blur(7px) saturate(.6)}'
  + '.rv-stage{position:fixed;inset:0;z-index:9999;display:flex;align-items:flex-start;'
  +   'justify-content:center;padding:clamp(14px,5vh,54px) 16px;overflow-y:auto;'
  +   '-webkit-overflow-scrolling:touch}'
  + 'body.rv-locked{overflow:hidden}'
  /* margin:0 auto, not margin:auto. Auto vertical margins center the card
     in the flex container, and once the card grows taller than the
     viewport that centering pushes its header above the scroll origin
     where it cannot be reached. Top anchored, horizontally centered. */
  + '.rv-stage .rv-card{position:relative;width:100%;max-width:680px;margin:0 auto;'
  +   'border-radius:20px;background:' + CARD + ';padding:8px;'
  +   'box-shadow:0 44px 84px -22px rgba(0,0,0,.78), 0 10px 22px rgba(0,0,0,.34),'
  +   '0 0 0 1px rgba(255,255,255,.10);'
  +   'font:400 16px/1.6 var(--font-body,"Plus Jakarta Sans",system-ui,sans-serif);'
  +   'animation:rv-in 240ms cubic-bezier(.2,.7,.3,1)}'
  + '@keyframes rv-in{from{opacity:0;transform:translateY(14px) scale(.985)}to{opacity:1;transform:none}}'
  /* the maroon frame: header content sits on the shell above the white face */
  + '.rv-stage .rv-shell{display:grid;grid-template-columns:1fr auto;gap:2px 12px;'
  +   'padding:10px 12px 12px;color:' + ON_CARD + '}'
  + '.rv-stage .rv-level{grid-column:1;margin:0;display:flex;align-items:center;gap:9px;'
  +   'font-weight:700;font-size:.68rem;letter-spacing:.16em;text-transform:uppercase}'
  + '.rv-stage .rv-badge{display:inline-flex;align-items:center;justify-content:center;'
  +   'width:26px;height:26px;border-radius:8px;font-size:13px;font-weight:800;letter-spacing:0}'
  + '.rv-stage .rv-d1 .rv-badge{background:' + ON_CARD_SOFT + ';color:' + CARD_DEEP + '}'
  + '.rv-stage .rv-d1 .rv-level{color:' + ON_CARD_SOFT + '}'
  + '.rv-stage .rv-d2 .rv-badge{background:' + ON_CARD_GOLD + ';color:#4A3308}'
  + '.rv-stage .rv-d2 .rv-level{color:' + ON_CARD_GOLD + '}'
  + '.rv-stage .rv-d3 .rv-badge{background:#FFFFFF;color:' + CARD + '}'
  + '.rv-stage .rv-d3 .rv-level{color:#FFFFFF}'
  + '.rv-stage .rv-crumb{grid-column:1;margin:2px 0 0;font-size:.92rem;color:' + ON_CARD + ';font-weight:600}'
  + '.rv-stage .rv-count{grid-column:1;margin:1px 0 0;font-size:.76rem;color:' + ON_CARD_SOFT + ';'
  +   'font-variant-numeric:tabular-nums}'
  + '.rv-stage .rv-close{grid-column:2;grid-row:1;justify-self:end;width:36px;height:36px;'
  +   'border-radius:9px;border:1px solid rgba(253,238,233,.34);background:transparent;'
  +   'color:' + ON_CARD + ';font-size:15px;line-height:1;cursor:pointer}'
  + '.rv-stage .rv-close:hover{background:rgba(253,238,233,.16)}'
  + '.rv-stage .rv-flag{grid-column:2;grid-row:2/4;justify-self:end;align-self:end;'
  +   'display:inline-flex;align-items:center;gap:7px;min-height:36px;padding:7px 12px;'
  +   'border-radius:9px;border:1px solid ' + ON_CARD_GOLD + ';background:transparent;'
  +   'color:' + ON_CARD_GOLD + ';font:inherit;font-size:.8rem;font-weight:600;cursor:pointer}'
  + '.rv-stage .rv-flag:hover{background:rgba(239,203,126,.18)}'
  + '.rv-stage .rv-flag.is-on{background:' + ON_CARD_GOLD + ';color:#4A3308;border-color:' + ON_CARD_GOLD + '}'
  /* the white face */
  + '.rv-stage .rv-face{background:#fff;color:#101828;padding:24px 26px 26px;'
  +   'border-radius:14px}'
  + '.rv-stage .rv-q{margin:0 0 18px;font-size:1.24rem;line-height:1.45;font-weight:700;'
  +   'color:' + NAVY2 + '}'
  + '.rv-stage .rv-conf-h{margin:0 0 9px;font-weight:600}'
  + '.rv-stage .rv-conf-row{display:flex;flex-wrap:wrap;gap:8px}'
  + '.rv-stage .rv-conf-why{margin:12px 0 0;font-size:.84rem;font-style:italic;color:#4A5C6B}'
  /* the confidence a student committed to, kept on screen while they answer */
  + '.rv-stage .rv-chosen{display:flex;align-items:center;flex-wrap:wrap;gap:8px;'
  +   'margin:0 0 14px;padding:8px 12px;border-radius:9px;background:' + SHADE + ';'
  +   'border-left:3px solid ' + CARD + '}'
  + '.rv-stage .rv-chosen-l{font-size:.7rem;letter-spacing:.10em;text-transform:uppercase;'
  +   'font-weight:700;color:' + CARD_DEEP + '}'
  + '.rv-stage .rv-chosen-v{font-weight:700;color:' + NAVY2 + '}'
  + '.rv-stage .rv-chosen-b{margin-left:auto;min-height:32px;padding:5px 11px;border-radius:7px;'
  +   'border:1px solid rgba(11,21,48,.52);background:#fff;font:inherit;font-size:.82rem;'
  +   'font-weight:600;color:' + NAVY2 + ';cursor:pointer}'
  + '.rv-stage .rv-opts{list-style:none;margin:0;padding:0;display:grid;gap:8px}'
  + '.rv-stage .rv-opt{display:block;width:100%;text-align:left;padding:13px 15px;min-height:44px;'
  +   'border:1px solid rgba(11,21,48,.52);border-radius:10px;background:#fff;font:inherit;'
  +   'color:#101828;cursor:pointer}'
  + '.rv-stage .rv-opt:hover:not(:disabled){border-color:' + CARD + ';background:#FDF8F7}'
  + '.rv-stage .rv-opt:disabled{cursor:default}'
  /* selected but not submitted. Marked in weight and a left bar as well as
     color, so the selection is visible without relying on hue. */
  + '.rv-stage .rv-opt.is-picked{border-color:' + CARD + ';border-width:2px;'
  +   'background:' + SHADE + ';font-weight:700;box-shadow:inset 4px 0 0 ' + CARD + '}'
  + '.rv-stage .rv-opt.is-picked::after{content:" \\2022 your pick";font-weight:700;color:' + CARD_DEEP + '}'
  + '.rv-stage .rv-opt.is-right{border-color:#14653B;border-width:2px;background:#F1F8F4;color:#0C3D24}'
  + '.rv-stage .rv-opt.is-right::after{content:" \\2713 correct";font-weight:700;color:#0C3D24}'
  + '.rv-stage .rv-opt.is-wrong{border-color:#8B3A2E;border-width:2px;background:#FBF3F1;color:#5E201A}'
  + '.rv-stage .rv-opt.is-wrong::after{content:" \\2715 what you picked";font-weight:700;color:#5E201A}'
  + '.rv-stage .rv-opt.is-spent{opacity:.72}'
  + '.rv-stage .rv-submit-row{display:flex;align-items:center;flex-wrap:wrap;gap:10px 14px;'
  +   'margin:16px 0 0}'
  + '.rv-stage .rv-submit-hint{font-size:.86rem;color:#4A5C6B}'
  + '.rv-stage .btn.primary:disabled{background:#8A93A1;border-color:#8A93A1;cursor:not-allowed}'
  /* THE SHADED ANSWER AREA. The answer and the justification live in one
     tinted block so they read as a separate thing from the question, which
     is what a student is scanning back to when they review. */
  + '.rv-stage .rv-verdict{margin:18px 0 0;padding:16px 18px;border-radius:12px;'
  +   'background:' + SHADE + ';border:1px solid rgba(122,42,34,.20);'
  +   'border-left:4px solid ' + CARD + '}'
  + '.rv-stage .rv-verdict.is-right{border-left-color:#14653B}'
  + '.rv-stage .rv-verdict.is-wrong{border-left-color:#8B3A2E}'
  + '.rv-stage .rv-redflag{margin:0 0 11px;padding:9px 11px;border-radius:8px;background:#F7E4DF;'
  +   'color:#5E201A;font-weight:700;font-size:.9rem}'
  + '.rv-stage .rv-redflag-soft{background:#F7EEDA;color:#5C4310}'
  + '.rv-stage .rv-answer-h{margin:0 0 4px;font-weight:700;font-size:.74rem;text-transform:uppercase;'
  +   'letter-spacing:.10em;color:' + CARD_DEEP + '}'
  + '.rv-stage .rv-verdict-a{margin:0 0 10px;font-weight:700;color:' + NAVY2 + '}'
  + '.rv-stage .rv-expl{margin:0;color:#3D4757}'
  + '.rv-stage .rv-selfgrade{margin-top:14px;padding-top:12px;border-top:1px solid rgba(122,42,34,.22)}'
  + '.rv-stage .rv-selfgrade p{margin:0 0 8px;font-weight:600}'
  /* THE LIVE REGION IS FOR SCREEN READERS, NOT FOR THE PAGE.
     It used to render as visible prose directly under the explanation
     panel, so a sighted student read the same paragraph twice. Hidden
     visually, still in the accessibility tree, still announced. Not
     display:none, which would take it out of the tree and silence it. */
  + '.rv-stage .rv-live{position:absolute;width:1px;height:1px;margin:-1px;padding:0;'
  +   'overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap;border:0}'
  + '.rv-stage #rv-next{margin-top:18px}'
  /* buttons inside the stage, in case the OS button classes do not reach it */
  + '.rv-stage .btn{display:inline-flex;align-items:center;justify-content:center;min-height:44px;'
  +   'padding:10px 17px;border-radius:9px;border:1px solid rgba(11,21,48,.52);background:#fff;'
  +   'color:' + NAVY2 + ';font:inherit;font-weight:600;cursor:pointer}'
  + '.rv-stage .btn:hover:not(:disabled){border-color:' + CARD + '}'
  + '.rv-stage .btn.primary{background:' + CARD + ';border-color:' + CARD + ';color:#fff}'
  + '.rv-stage .btn.primary:hover:not(:disabled){background:' + CARD_DEEP + '}'
  + '.rv-stage .btn.gold{background:' + GOLD + ';border-color:#8A6A1E;color:' + NAVY + '}'
  + '.rv-stage :focus-visible,#' + MOUNT + ' :focus-visible{outline:3px solid ' + GOLD + ';'
  +   'outline-offset:3px;box-shadow:0 0 0 3px ' + NAVY + '}'

  /* report and note sheet inside the OS */
  + '#' + MOUNT + ' .rv-report{margin:18px 0 14px;padding-top:14px;border-top:1px solid rgba(11,21,48,.14)}'
  + '#' + MOUNT + ' .rv-report h4{margin:0 0 4px;font-size:1rem}'
  + '#' + MOUNT + ' .rv-report-sub{margin:0 0 10px;font-size:.86rem;opacity:.78}'
  + '#' + MOUNT + ' .rv-weak{list-style:none;margin:0 0 12px;padding:0;display:grid;gap:6px}'
  + '#' + MOUNT + ' .rv-weak li{display:grid;grid-template-columns:1fr auto;gap:2px 12px;'
  +   'padding:8px 10px;border-left:3px solid #8B3A2E;background:#FAFAF9;border-radius:0 6px 6px 0}'
  + '#' + MOUNT + ' .rv-weak-t{font-weight:600}'
  + '#' + MOUNT + ' .rv-weak-m{grid-column:1;font-size:.8rem;opacity:.7}'
  + '#' + MOUNT + ' .rv-weak-n{grid-row:1/3;align-self:center;font-variant-numeric:tabular-nums;font-weight:700}'
  + '#' + MOUNT + ' .rv-panel-sheet{padding:16px 18px 22px}'
  + '#' + MOUNT + ' .rv-sheet-actions{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 18px;'
  +   'padding-bottom:14px;border-bottom:1px solid rgba(11,21,48,.14)}'
  + SHEET_CSS
  /* printing: the sheet only, nothing else on the page */
  + '.rv-print-holder{display:none}'
  + '@media print{body.rv-printing>*{display:none!important}'
  +   'body.rv-printing>.rv-print-holder{display:block!important}'
  +   'body.rv-printing{background:#fff!important;overflow:visible!important}}'
  + '@media (prefers-reduced-motion: reduce){.rv-stage .rv-card{animation:none}'
  +   '#' + MOUNT + ' *,.rv-stage *{transition:none!important}}'
  + '@media (max-width:560px){.rv-stage .rv-face{padding:18px 16px 20px}'
  +   '.rv-stage .rv-shell{padding:13px 14px 12px}'
  +   '.rv-stage .rv-flag .rv-flag-t{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}}';

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
    document.addEventListener('keydown', onKey);

    /* A Study Run in Mastery OS needs to hand a student a run of cards on
       one competency without a page load, because a page load would drop
       the run. Nothing else in here is public; this is the one door. */
    window.BIO005_RECALL_OPEN = function (compId) {
      filter.comp = compId || null;
      filter.mode = 'all';
      view = 'deck';
      queue = build();
      NO_CARDS_FOR = null;
      if (!queue.length && compId) {
        /* A competency can be empty for two different reasons and the
           student deserves to know which. Either it is gated (they have
           not opened that depth yet) or it genuinely has no cards, which
           is true of the lab tasks proved by a measurement or a drawing
           rather than by answering. Try lifting the gate before saying
           there is nothing. */
        var wasUngated = filter.ungated;
        filter.ungated = true;
        queue = build();
        if (!queue.length) {
          filter.ungated = wasUngated;
          NO_CARDS_FOR = compId;
          filter.comp = null;
          queue = build();
        }
      } else if (!queue.length) {
        filter.comp = null;
        queue = build();
      }
      pos = 0; revealed = false; confidence = null; shown = null;
      answered = false; picked = null; runLog = [];
      stage = queue.length > 0;
      render();
      var sec = document.getElementById('s-recall') || $(MOUNT);
      if (sec && sec.scrollIntoView) sec.scrollIntoView({ block: 'start' });
      return queue.length;
    };
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
})();
