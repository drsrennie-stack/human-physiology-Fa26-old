/* =====================================================================
   THE CLINICAL PHYSIOLOGY LAB, shared engine
   Dr. Sharilyn Rennie, BIO 005 Human Physiology

   Part 1 of 2: helpers, page shell, tabs and gates, progress, plain
   language layer, clickable terms, formulas, multiple choice.

   Every week page loads this file, then adds its own content. Nothing
   in here knows anything about a particular week.
   ===================================================================== */
(function () {
'use strict';

var LAB = {};
window.LAB = LAB;

/* ---------------------------------------------------------------------
   DOM helpers
   --------------------------------------------------------------------- */
function el(tag, attrs, kids) {
  var n = document.createElement(tag);
  if (attrs) for (var k in attrs) {
    if (k === 'class') n.className = attrs[k];
    else if (k === 'html') n.innerHTML = attrs[k];
    else if (k === 'text') n.textContent = attrs[k];
    else if (k.slice(0, 2) === 'on') n.addEventListener(k.slice(2), attrs[k]);
    else if (attrs[k] === true) n.setAttribute(k, '');
    else if (attrs[k] !== false && attrs[k] != null) n.setAttribute(k, attrs[k]);
  }
  if (kids) (Array.isArray(kids) ? kids : [kids]).forEach(function (c) {
    if (c == null) return;
    n.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
  });
  return n;
}
function $(sel, root) { return (root || document).querySelector(sel); }
function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
function fmt(v, d) { if (v == null || isNaN(v)) return '–'; return Number(v).toFixed(d == null ? 2 : d); }
function pct(v) { return Math.round(v) + '%'; }
function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
function round(v, d) { var m = Math.pow(10, d || 0); return Math.round(v * m) / m; }

/* deterministic seeded random, so a student's dataset is their own and
   can still be rebuilt later from the case number printed on their work */
function seeded(seed) {
  var s = seed % 2147483647; if (s <= 0) s += 2147483646;
  return function () { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
}
function shuffle(arr, rnd) {
  rnd = rnd || Math.random;
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(rnd() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}
/* a fresh four digit case number for this session */
function newCaseNumber() {
  return String(1000 + Math.floor(Math.random() * 9000));
}

LAB.el = el; LAB.$ = $; LAB.$$ = $$; LAB.fmt = fmt; LAB.pct = pct;
LAB.clamp = clamp; LAB.round = round; LAB.seeded = seeded; LAB.shuffle = shuffle;
LAB.newCaseNumber = newCaseNumber;

/* the typeface stack SVG text has to be given explicitly */
LAB.SVG_FONT = 'Helvetica Neue,Helvetica,Arial,sans-serif';
LAB.COLOR = {
  navy: '#0B1530', ink: '#0A1322', muted: '#414B5C',
  terra: '#731717', terraDark: '#5A1212', gold: '#C9A14A', goldText: '#6E5018',
  teal: '#27565D', rule: '#7F8798', ruleSoft: '#DCE0E6', off: '#FAFAF9'
};

/* =====================================================================
   PAGE CONFIG AND SHELL
   The week page hands over a config and a list of sections. The engine
   builds the brand bar, the header, the tab strip and the panels, so
   every week in the course looks and behaves the same way.
   ===================================================================== */
var CFG = {
  course: 'BIO 005',
  courseTitle: 'Human Physiology',
  weekLabel: '',
  title: 'Lab',
  lede: '',
  eyebrow: 'Interactive clinical lab',
  chips: ['Learn', 'Practice', 'Test', 'Submit as PDF'],
  footerNote: 'BIO 005 Human Physiology. Every patient in this lab is fictional. Reference intervals are teaching values and are not for clinical use.'
};
LAB.config = function (o) { for (var k in o) CFG[k] = o[k]; };
LAB.cfg = function () { return CFG; };

var SECTIONS = [];   /* [{id,label,gate,build}] */
LAB.sections = function (list) { SECTIONS = list; };

function logoSVG() {
  return '<svg viewBox="0 0 64 64" role="img" aria-label="Course logo, three figures side by side">' +
    '<circle cx="14" cy="17" r="7.4" fill="#C9A14A"/>' +
    '<path d="M14 27.5c-7 0-11.6 4.6-11.6 11.4V57h23.2V38.9c0-6.8-4.6-11.4-11.6-11.4z" fill="#C9A14A"/>' +
    '<circle cx="32" cy="12.5" r="8.2" fill="#731717"/>' +
    '<path d="M32 24c-7.7 0-12.8 5.1-12.8 12.6V57h25.6V36.6C44.8 29.1 39.7 24 32 24z" fill="#731717"/>' +
    '<circle cx="50" cy="17" r="7.4" fill="#0B1530"/>' +
    '<path d="M50 27.5c-7 0-11.6 4.6-11.6 11.4V57h23.2V38.9c0-6.8-4.6-11.4-11.6-11.4z" fill="#0B1530"/></svg>';
}

function buildShell() {
  var app = $('#app');
  if (!app) return;
  var h = [];

  h.push('<a class="skip" href="#main">Skip to the lab</a>');

  h.push('<div class="brandbar"><div class="wrap">' + logoSVG() +
    '<span class="brandlines"><span class="b1">' + CFG.courseTitle + '</span>' +
    '<span class="b2">' + CFG.course + (CFG.weekLabel ? ' · ' + CFG.weekLabel : '') + '</span></span>' +
    '<button type="button" class="hdr-eli" id="eli-all" aria-pressed="false">Explain it to me like I am 10</button>' +
    '<span class="sr-only" id="eli-all-help">Opens a plain language explanation under every concept on the page.</span>' +
    '</div></div>');

  h.push('<header class="site-header on-red"><div class="wrap">' +
    '<p class="eyebrow">' + CFG.eyebrow + '</p>' +
    '<h1>' + CFG.title + '</h1>' +
    (CFG.lede ? '<p class="lede">' + CFG.lede + '</p>' : '') +
    '<div class="badge-row">' + CFG.chips.map(function (c, i) {
      return '<span class="chip' + (i ? ' ghost' : '') + '">' + c + '</span>';
    }).join('') + '</div></div></header>');

  h.push('<nav class="tabbar" aria-label="Lab sections"><div class="wrap">' +
    '<div class="tablist" role="tablist" aria-label="Lab sections">' +
    SECTIONS.map(function (s, i) {
      return '<button class="tab" role="tab" id="tab-' + s.id + '" aria-controls="panel-' + s.id +
        '" aria-selected="' + (i === 0 ? 'true' : 'false') + '"' + (i === 0 ? '' : ' tabindex="-1"') + '>' +
        (i + 1) + '. ' + s.label + '</button>';
    }).join('') +
    '</div><p class="gate-msg" id="gate-msg" role="status" aria-live="polite" hidden></p></div></nav>');

  h.push('<main id="main">' + SECTIONS.map(function (s, i) {
    return '<section class="panel" id="panel-' + s.id + '" role="tabpanel" aria-labelledby="tab-' + s.id +
      '" tabindex="-1"' + (i === 0 ? '' : ' hidden') + '><div class="wrap" id="' + s.id + '-root"></div></section>';
  }).join('') + '</main>');

  h.push('<footer class="site-footer"><div class="wrap">' +
    '<p class="name">Dr. Sharilyn Rennie</p>' +
    '<p>Professor of Anatomy &amp; Physiology</p>' +
    '<p class="muted">' + CFG.footerNote + '</p></div></footer>');

  app.innerHTML = h.join('\n');
}

/* =====================================================================
   PROGRESS
   Session only. Nothing is stored and nothing is transmitted. Buckets
   are registered by the week page in the order they should appear on
   the results page.
   ===================================================================== */
var BUCKETS = [];
function bucket(key, label) {
  var b = { key: key, label: label, right: 0, asked: 0 };
  BUCKETS.push(b);
  return b;
}
function score(b, correct) {
  b.asked++; if (correct) b.right++;
  var rp = $('#report-root');
  if (rp && rp.dataset.built === '1') LAB.renderReport();
}
var quiz = { right: 0, asked: 0, byObjective: {}, missed: [] };
LAB.bucket = bucket; LAB.score = score; LAB.quiz = quiz;
LAB.buckets = function () { return BUCKETS; };

/* =====================================================================
   TABS AND THE GUIDED SEQUENCE
   A section can name a gate it waits on. Gates open when the week page
   calls LAB.openGate. Once open, a section stays open.
   ===================================================================== */
var gates = {};
var GATE_INFO = {};
LAB.gates = gates;
LAB.gateInfo = function (name, info) { GATE_INFO[name] = info; gates[name] = false; };

function gateOf(id) {
  for (var i = 0; i < SECTIONS.length; i++) if (SECTIONS[i].id === id) return SECTIONS[i].gate;
  return null;
}
function isOpen(id) {
  var need = gateOf(id);
  return !need || gates[need] === true;
}

var gateMsgTimer = null;
function sayGate(text, actionLabel, actionTab) {
  var box = $('#gate-msg');
  if (!box) return;
  box.innerHTML = '';
  box.appendChild(el('span', { html: text }));
  if (actionLabel) {
    box.appendChild(el('button', {
      class: 'btn sm', type: 'button', text: actionLabel,
      onclick: function () { showTab(actionTab, true); }
    }));
  }
  box.hidden = false;
  if (gateMsgTimer) clearTimeout(gateMsgTimer);
  gateMsgTimer = setTimeout(function () { box.hidden = true; }, 14000);
}

function refreshLocks() {
  SECTIONS.forEach(function (s) {
    var tab = $('#tab-' + s.id);
    if (!tab) return;
    if (isOpen(s.id)) {
      tab.removeAttribute('data-locked');
      var sr = tab.querySelector('.sr-only');
      if (sr) sr.remove();
    } else {
      /* deliberately not aria-disabled. A closed tab still does something
         useful: it says what has to be finished first and takes you there. */
      tab.setAttribute('data-locked', 'true');
      if (!tab.querySelector('.sr-only')) {
        tab.appendChild(el('span', {
          class: 'sr-only',
          text: ', not open yet, selecting this explains what to finish first'
        }));
      }
    }
  });
}

function openGate(which) {
  if (gates[which]) return;
  gates[which] = true;
  refreshLocks();
  var info = GATE_INFO[which] || {};
  var firstOpened = null;
  for (var i = 0; i < SECTIONS.length; i++) {
    if (SECTIONS[i].gate === which) { firstOpened = SECTIONS[i].id; break; }
  }
  if (firstOpened) {
    var tab = $('#tab-' + firstOpened);
    if (tab) {
      tab.classList.add('just-opened');
      setTimeout(function () { tab.classList.remove('just-opened'); }, 9000);
    }
  }
  if (info.openMsg) sayGate(info.openMsg, info.openLabel, info.openGoto || firstOpened);
}

function showTab(name, focusPanel) {
  if (!isOpen(name)) {
    var g = GATE_INFO[gateOf(name)] || {};
    sayGate(g.msg || 'That section is not open yet.', g.label, g.goto);
    if (g.goto && g.goto !== name) showTab(g.goto, true);
    return;
  }
  SECTIONS.forEach(function (s) {
    var tab = $('#tab-' + s.id), panel = $('#panel-' + s.id);
    if (!tab || !panel) return;
    var on = (s.id === name);
    tab.setAttribute('aria-selected', on ? 'true' : 'false');
    tab.tabIndex = on ? 0 : -1;
    panel.hidden = !on;
  });
  if (name === 'report' && LAB.renderReport) LAB.renderReport();
  if (focusPanel) { var p = $('#panel-' + name); if (p) p.focus(); }
  window.scrollTo({ top: 0, behavior: 'auto' });
}

function initTabs() {
  SECTIONS.forEach(function (s, i) {
    var tab = $('#tab-' + s.id);
    if (!tab) return;
    tab.addEventListener('click', function () { showTab(s.id); });
    tab.addEventListener('keydown', function (e) {
      var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 :
              e.key === 'Home' ? -99 : e.key === 'End' ? 99 : 0;
      if (!d) return;
      e.preventDefault();
      var j = d === -99 ? 0 : d === 99 ? SECTIONS.length - 1 : (i + d + SECTIONS.length) % SECTIONS.length;
      $('#tab-' + SECTIONS[j].id).focus();
      showTab(SECTIONS[j].id);
    });
  });
  refreshLocks();
}
LAB.showTab = showTab; LAB.openGate = openGate; LAB.isOpen = isOpen; LAB.sayGate = sayGate;

/* =====================================================================
   PLAIN LANGUAGE LAYER
   Every idea on the page can be opened up in everyday words, one button
   at a time or all at once from the header.
   ===================================================================== */
var eliBlocks = [];
function eli(paragraphs) {
  var box = el('div', { class: 'eli-box' });
  box.appendChild(el('span', { class: 'eli-head', text: 'In plain words' }));
  (Array.isArray(paragraphs) ? paragraphs : [paragraphs]).forEach(function (t) {
    box.appendChild(el('p', { html: t }));
  });
  box.hidden = true;
  var btn = el('button', {
    class: 'eli-toggle', type: 'button', 'aria-expanded': 'false',
    onclick: function () { setOne(btn.getAttribute('aria-expanded') !== 'true'); }
  }, 'Explain it to me like I am 10');
  function setOne(open) {
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    box.hidden = !open;
    btn.textContent = open ? 'Hide the plain words' : 'Explain it to me like I am 10';
  }
  eliBlocks.push({ set: setOne });
  return el('div', null, [btn, box]);
}
function eliIcon(paragraphs, label) {
  var box = el('div', { class: 'eli-box', style: 'margin:10px 0 0' });
  box.appendChild(el('span', { class: 'eli-head', text: 'In plain words' }));
  (Array.isArray(paragraphs) ? paragraphs : [paragraphs]).forEach(function (t) {
    box.appendChild(el('p', { html: t }));
  });
  box.hidden = true;
  var btn = el('button', {
    class: 'fx-info', type: 'button', 'aria-expanded': 'false',
    'aria-label': 'Explain ' + (label || 'this') + ' in plain words',
    onclick: function () { setOne(btn.getAttribute('aria-expanded') !== 'true'); }
  }, 'i');
  function setOne(open) {
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    box.hidden = !open;
  }
  eliBlocks.push({ set: setOne });
  return { btn: btn, box: box };
}
function eliAll(open) { eliBlocks.forEach(function (r) { r.set(open); }); }
function initEli() {
  var master = $('#eli-all');
  if (!master) return;
  master.setAttribute('aria-describedby', 'eli-all-help');
  master.addEventListener('click', function () {
    var on = master.getAttribute('aria-pressed') !== 'true';
    master.setAttribute('aria-pressed', on ? 'true' : 'false');
    master.textContent = on ? 'Back to the clinical wording' : 'Explain it to me like I am 10';
    eliAll(on);
  });
}
LAB.eli = eli; LAB.eliIcon = eliIcon; LAB.eliAll = eliAll;

/* =====================================================================
   CLICKABLE TERMS
   Write <t>baroreceptor</t> anywhere in a string. It becomes a red word
   the student can click for a one line definition, so the sentence
   around it stays short instead of carrying the explanation.
   ===================================================================== */
var GLOSSARY = {
  /* words that come up in more than one week live here. A week page adds
     its own with LAB.addTerms. */
  'homeostasis': 'Keeping something steady inside the body while the world outside keeps changing.',
  'set point': 'The value the body is aiming for, like the temperature you set on a thermostat.',
  'negative feedback': 'The body pushes back against whatever moved. Too hot, it cools. Too cold, it warms.',
  'positive feedback': 'The body pushes in the same direction as the change, so it snowballs. Rare, and it needs an event to end it.',
  'sensor': 'The part that measures. It only reports, it never fixes anything.',
  'integrator': 'The part that compares the reading against the set point and decides what to do. Usually the brain.',
  'effector': 'The part that actually does something about it. A muscle, a gland, a vessel.',
  'regulated variable': 'The one thing the loop is defending. Not the sensor, not the response, the number itself.',
  'baroreceptor': 'A stretch sensor in the wall of a big artery that reports blood pressure to the brain.',
  'mean arterial pressure': 'The average pushing pressure across one whole heartbeat. This is the number organs actually feel.',
  'pulse pressure': 'The size of the jump between the top number and the bottom number.',
  'systolic': 'The peak pressure, while the heart is squeezing.',
  'diastolic': 'The lowest pressure, while the heart is filling.',
  'cardiac output': 'How much blood the heart pumps in a minute. Heart rate multiplied by the amount per beat.',
  'stroke volume': 'How much blood leaves the heart with one beat.',
  'perfusion': 'Blood actually arriving at a tissue. Pressure is the push, perfusion is the delivery.',
  'hemoglobin': 'The protein inside red blood cells that carries oxygen. Sometimes spelled hemoglobin.',
  'saturation': 'The share of oxygen seats on hemoglobin that are filled. Reported as a percent.',
  'partial pressure': 'How hard a gas is pushing to get somewhere. Oxygen moves from higher push to lower push.',
  'hypoxemia': 'Not enough oxygen in the blood.',
  'hypoxia': 'Not enough oxygen arriving where it is needed. Blood levels can look fine and this can still be true.',
  'orthostatic': 'Caused by standing up.',
  'reflex': 'A fast, automatic correction that happens before you notice anything.',
  'sympathetic': 'The fast, go, get ready branch of the nervous system. Raises rate, tightens vessels.',
  'parasympathetic': 'The slow it back down branch. Lowers heart rate, runs digestion.',
  'vasoconstriction': 'Vessels narrowing, which raises pressure and sends blood elsewhere.',
  'vasodilation': 'Vessels widening, which lowers pressure and lets more blood into that tissue.',
  'lower limit of normal': 'The line below the bottom 5 out of every 100 healthy people. Below it is genuinely unusual.',
  'predicted': 'What a healthy person of the same height, age and sex would be expected to do.'
};
LAB.addTerms = function (obj) { for (var k in obj) GLOSSARY[k.toLowerCase()] = obj[k]; };
LAB.GLOSSARY = GLOSSARY;

var termSeq = 0;
function wireTerms(root) {
  $$('t', root).forEach(function (n) {
    var word = (n.getAttribute('k') || n.textContent).toLowerCase().trim();
    var def = GLOSSARY[word];
    if (!def) { n.outerHTML = n.innerHTML; return; }
    var id = 'td' + (++termSeq);
    var btn = el('button', {
      class: 'term', type: 'button', 'aria-expanded': 'false', 'aria-controls': id,
      text: n.textContent
    });
    var box = el('span', { class: 'term-def', id: id, html: '<b>' + n.textContent + '.</b> ' + def });
    box.hidden = true;
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', open ? 'false' : 'true');
      box.hidden = open;
    });
    var wrap = document.createDocumentFragment();
    wrap.appendChild(btn); wrap.appendChild(box);
    n.parentNode.replaceChild(wrap, n);
  });
}
LAB.wireTerms = wireTerms;

/* =====================================================================
   BUILDING BLOCKS
   ===================================================================== */
function card(kids, cls) { return el('div', { class: 'card' + (cls ? ' ' + cls : '') }, kids); }
function surface(kids, cls) { return el('div', { class: 'surface' + (cls ? ' ' + cls : '') }, kids); }
function kicker(t, cls) { return el('p', { class: 'kicker' + (cls ? ' ' + cls : ''), text: t }); }
function note(t) { return el('p', { class: 'note', html: t }); }
function para(t, cls) { return el('p', cls ? { class: cls, html: t } : { html: t }); }
function list(items, ordered, cls) {
  return el(ordered ? 'ol' : 'ul', { class: 'tight' + (cls ? ' ' + cls : '') },
    items.map(function (i) { return el('li', { html: i }); }));
}
LAB.card = card; LAB.surface = surface; LAB.kicker = kicker;
LAB.note = note; LAB.para = para; LAB.list = list;

/* a formula block: the equation, one line of what it tells you, an
   abbreviation key, and an info button holding the plain words */
function fx(eq, what, key, plain) {
  var info = plain ? eliIcon(plain, 'this formula') : null;
  var top = el('div', { class: 'fx-top' }, [
    el('p', { class: 'fx-eq', html: eq }),
    info ? info.btn : null
  ]);
  var legend = null;
  if (key && key.length) {
    legend = el('p', { class: 'fx-key' }, key.map(function (k) {
      return el('span', { html: '<b>' + k[0] + '</b> ' + k[1] });
    }));
  }
  return el('div', { class: 'fx' }, [
    top,
    what ? el('p', { class: 'fx-note', html: what }) : null,
    legend,
    info ? info.box : null
  ]);
}
function frac(n, d) {
  return '<span class="frac"><span class="num">' + n + '</span><span class="den">' + d + '</span></span>';
}
LAB.fx = fx; LAB.frac = frac;

/* collapsible block */
function disclosure(title, bodyNodes, openByDefault) {
  var body = el('div', { class: 'body' }, bodyNodes);
  var mark = el('span', { class: 'mark', text: openByDefault ? '–' : '+' });
  var btn = el('button', {
    type: 'button', 'aria-expanded': openByDefault ? 'true' : 'false',
    onclick: function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', open ? 'false' : 'true');
      body.hidden = open; mark.textContent = open ? '+' : '–';
    }
  }, [el('span', { text: title }), mark]);
  body.hidden = !openByDefault;
  return el('div', { class: 'disc' }, [btn, body]);
}
LAB.disclosure = disclosure;

/* multiple choice */
function mcq(cfg) {
  var answered = false;
  var listEl = el('ul', { class: 'opts' });
  var fb = el('div', { class: 'fb', 'aria-live': 'polite' });
  fb.hidden = true;
  var buttons = [];
  cfg.options.forEach(function (o, i) {
    var b = el('button', {
      class: 'opt', type: 'button',
      onclick: function () {
        if (answered) return;
        answered = true;
        buttons.forEach(function (bb, j) {
          bb.disabled = true;
          if (j === cfg.correct) bb.className = 'opt correct';
          else if (j === i) bb.className = 'opt wrong';
        });
        var right = i === cfg.correct;
        fb.hidden = false;
        fb.innerHTML = '<strong>' + (right ? 'Correct. ' : 'Not quite. ') + '</strong>' + cfg.explain;
        wireTerms(fb);
        if (cfg.bucket) score(cfg.bucket, right);
        if (cfg.onAnswer) cfg.onAnswer(right, i);
      }
    }, [el('span', { class: 'ltr', text: 'ABCDEF'[i] }), el('span', { text: o })]);
    buttons.push(b);
    listEl.appendChild(el('li', null, b));
  });
  return el('div', null, [
    el('p', { html: cfg.stem, style: 'font-weight:600;margin-bottom:2px' }),
    cfg.extra || null, listEl, fb
  ]);
}
LAB.mcq = mcq;

/* predict, then check with a question. No typing. */
function predictCheck(cfg) {
  /* cfg: {predict, options, correct, explain, bucket, reveal} */
  var checkSlot = el('div');
  var goBtn = el('button', {
    class: 'btn cta', type: 'button',
    onclick: function () {
      goBtn.disabled = true;
      goBtn.classList.add('spent');
      checkSlot.appendChild(buildCheck());
      checkSlot.querySelector('.check').scrollIntoView({ block: 'nearest' });
    }
  }, [
    el('span', { text: 'Got it, show me the check' }),
    el('span', { class: 'arw', 'aria-hidden': 'true', text: '→' })
  ]);

  var pre = el('div', { class: 'card predict' }, [
    el('span', { class: 'stepnum', text: 'Predict first' }),
    el('p', { html: cfg.predict, style: 'font-weight:600;font-size:1.05rem;margin-bottom:16px' }),
    el('div', { class: 'btnrow', style: 'margin-top:0' }, [goBtn])
  ]);
  function buildCheck() {
    return el('div', { class: 'card check' }, [
      el('span', { class: 'stepnum alt', text: 'Now check it' }),
      mcq({
        stem: cfg.stem, options: cfg.options, correct: cfg.correct,
        explain: cfg.explain, bucket: cfg.bucket
      })
    ]);
  }
  return el('div', null, [pre, checkSlot]);
}
LAB.predictCheck = predictCheck;

/* the four questions that get asked of every chart in this course */
function chartCard(cfg) {
  /* cfg: {title, figHTML, caption, aria, questions:[mcq cfg], bucket} */
  var fig = el('figure', { class: 'fig' });
  fig.innerHTML = cfg.figHTML + (cfg.caption ? '<figcaption>' + cfg.caption + '</figcaption>' : '');
  var kids = [
    kicker('Chart reading'),
    el('h3', { text: cfg.title }),
    el('p', { class: 'note', html: '<strong>The four questions, every time.</strong> What are the axes and units. What is the shape. What physically produces that shape. What would move it, and which way.' }),
    fig
  ];
  if (cfg.intro) kids.splice(3, 0, el('p', { html: cfg.intro }));
  (cfg.questions || []).forEach(function (q) {
    q.bucket = q.bucket || cfg.bucket;
    kids.push(el('div', { style: 'margin-top:18px' }, mcq(q)));
  });
  return card(kids);
}
LAB.chartCard = chartCard;

LAB.initShell = function () { buildShell(); initTabs(); initEli(); };
})();
