/* Does the difficulty actually climb as a student uses it?

   The unit tests prove the gate opens when it is supposed to. This one
   answers the question a student would ask: if I do a set most days,
   does the thing get harder?

   It simulates a term of daily practice against the real bank, using
   the same Leitner boxes and the same level gate the page uses, and
   reports what share of each week's cards were level 1, 2 and 3.

   The simulated student is deliberately imperfect: right about 80% of
   the time on level 1, 70% on level 2, 60% on level 3, so the gate has
   to be earned rather than handed over.

   Run: node tools/sim_difficulty.js
*/
global.window = {};
require('../os/bio005-card-bank.js');
require('../bio005-competencies.js');

const BOX_DAYS = [0, 1, 4, 12, 30, 75];
const HOLDING = 2, GATE_N = 3, SET_SIZE = 15, NEW_PER_SET = 5;
const HIT = { 1: 0.80, 2: 0.70, 3: 0.60 };
const TERM_WEEKS = 15;

const COMP_WEEK = {};
(window.BIO005_COMPETENCIES || []).forEach(c => COMP_WEEK[c.id] = c.week || 0);

const ALL = [];
window.BIO005_CARD_BANK.modules.forEach(m => m.topics.forEach(t => t.cards.forEach(c => {
  ALL.push({
    key: t.id + ':' + c.id, topicId: t.id, comp: c.competencyId || t.id,
    dok: Math.max(1, Math.min(3, +c.dok || 1)),
    week: c.week || COMP_WEEK[c.competencyId] || 0
  });
})));

const progress = {};
let GATE = {};
function computeGates() {
  const by = {};
  for (const e of ALL) {
    const g = by[e.comp] || (by[e.comp] = { have: { 1: 0, 2: 0, 3: 0 }, hold: { 1: 0, 2: 0, 3: 0 } });
    g.have[e.dok]++;
    const p = progress[e.key];
    if (p && (p.box || 0) >= HOLDING) g.hold[e.dok]++;
  }
  GATE = {};
  for (const k of Object.keys(by)) {
    const g = by[k];
    let open = 1;
    const need2 = Math.min(GATE_N, g.have[1]);
    if (g.have[2] && need2 && g.hold[1] >= need2) open = 2;
    const need3 = Math.min(GATE_N, g.have[2]);
    if (open === 2 && g.have[3] && need3 && g.hold[2] >= need3) open = 3;
    GATE[k] = open;
  }
}
const gateFor = e => GATE[e.comp] || 1;

let day = 0;
const isDue = e => { const p = progress[e.key]; return !p || p.next <= day; };

function needFor(comp) {
  // how many level 1 cards of this competency still have to hold
  const g = HAVE[comp];
  return Math.min(GATE_N, g.have[1]);
}

let HAVE = {};
function census() {
  HAVE = {};
  for (const e of ALL) {
    const g = HAVE[e.comp] || (HAVE[e.comp] = { have: { 1: 0, 2: 0, 3: 0 }, hold: { 1: 0, 2: 0, 3: 0 } });
    g.have[e.dok]++;
    const p = progress[e.key];
    if (p && (p.box || 0) >= HOLDING) g.hold[e.dok]++;
  }
}

function spread(list) {
  const by = {}, order = [];
  for (const e of list) {
    if (!by[e.comp]) { by[e.comp] = []; order.push(e.comp); }
    by[e.comp].push(e);
  }
  const out = [];
  let round = 0, more = true;
  while (more) {
    more = false;
    for (const c of order) if (by[c].length > round) { out.push(by[c][round]); more = true; }
    round++;
  }
  return out;
}

function buildSet(week) {
  census();
  const pool = ALL.filter(e => (!e.week || e.week <= week) && e.dok <= gateFor(e));
  const reviews = [], fresh = [];
  for (const e of pool) {
    const p = progress[e.key];
    if (p) { if (p.next <= day) reviews.push(e); }
    else fresh.push(e);
  }
  reviews.sort((a, b) => (progress[a.key].next - progress[b.key].next) || (b.dok - a.dok));
  // finish what is started: a competency partway to its gate comes first
  const started = e => {
    const g = HAVE[e.comp];
    const n = needFor(e.comp);
    return g.hold[1] > 0 && g.hold[1] < n ? 0 : 1;
  };
  // New cards split two ways so neither job starves the other: half the
  // slots go to a level that has just opened, half to material from the
  // week being taught now.
  const deeper = fresh.filter(e => e.dok > 1)
    .sort((a, b) => (b.dok - a.dok) || (started(a) - started(b)) ||
      ((COMP_WEEK[b.comp] || 0) - (COMP_WEEK[a.comp] || 0)));
  const newest = fresh.filter(e => e.dok === 1)
    .sort((a, b) => ((COMP_WEEK[b.comp] || b.week || 0) - (COMP_WEEK[a.comp] || a.week || 0)) ||
      (started(a) - started(b)));
  const spreadReviews = spread(reviews);
  const deep2 = spread(deeper), new2 = spread(newest);
  const halfUp = Math.ceil(NEW_PER_SET / 2);
  const takeDeep = deep2.slice(0, halfUp);
  const takeNew = new2.slice(0, NEW_PER_SET - takeDeep.length);
  const newCards = takeDeep.concat(takeNew);
  const newTake = newCards.length;
  let out = spreadReviews.slice(0, SET_SIZE - newTake).concat(newCards);
  if (out.length < SET_SIZE) {
    const used = new Set(out.map(e => e.key));
    out = out.concat(spreadReviews.concat(deep2, new2).filter(e => !used.has(e.key)).slice(0, SET_SIZE - out.length));
  }
  return out;
}

function grade(e, right) {
  const p = progress[e.key] || { box: 0, right: 0, wrong: 0 };
  if (right) { p.right++; p.box = Math.min(p.box + 1, BOX_DAYS.length - 1); }
  else { p.wrong++; p.box = 0; }
  p.next = day + BOX_DAYS[p.box];
  progress[e.key] = p;
}

console.log('A simulated student, one set of ' + SET_SIZE + ' cards on 5 days a week, 15 weeks.');
console.log('Accuracy held at ' + Math.round(HIT[1] * 100) + '% on level 1, ' +
            Math.round(HIT[2] * 100) + '% on level 2, ' + Math.round(HIT[3] * 100) + '% on level 3.\n');
console.log('week   cards    L1      L2      L3     level 2 open   level 3 open   holding');

let rows = [];
computeGates();
for (let w = 1; w <= TERM_WEEKS; w++) {
  const seen = { 1: 0, 2: 0, 3: 0 };
  for (let d = 0; d < 5; d++) {
    day = (w - 1) * 7 + d;
    const set = buildSet(w);
    for (const e of set) {
      seen[e.dok]++;
      grade(e, Math.random() < HIT[e.dok]);
    }
    computeGates();
  }
  const n = seen[1] + seen[2] + seen[3];
  const open2 = Object.values(GATE).filter(v => v >= 2).length;
  const open3 = Object.values(GATE).filter(v => v >= 3).length;
  const holding = Object.values(progress).filter(p => p.box >= HOLDING).length;
  const pc = k => n ? (seen[k] * 100 / n).toFixed(0).padStart(3) + '%' : '   0%';
  rows.push({ w, n, l1: seen[1] / n, l2: seen[2] / n, l3: seen[3] / n });
  console.log(String(w).padStart(4) + String(n).padStart(8) +
              pc(1).padStart(7) + pc(2).padStart(8) + pc(3).padStart(8) +
              String(open2).padStart(14) + String(open3).padStart(15) +
              String(holding).padStart(10));
}

const early = rows.slice(0, 3), late = rows.slice(-3);
const avg = (a, k) => a.reduce((s, r) => s + r[k], 0) / a.length;
const l1Early = avg(early, 'l1'), l1Late = avg(late, 'l1');
const deepEarly = avg(early, 'l2') + avg(early, 'l3');
const deepLate = avg(late, 'l2') + avg(late, 'l3');

console.log('\nFirst three weeks: ' + (l1Early * 100).toFixed(0) + '% level 1, ' +
            (deepEarly * 100).toFixed(0) + '% level 2 or 3.');
console.log('Last three weeks:  ' + (l1Late * 100).toFixed(0) + '% level 1, ' +
            (deepLate * 100).toFixed(0) + '% level 2 or 3.');

let fails = 0;
function ok(name, cond, extra) {
  console.log((cond ? '\n  PASS  ' : '\n  FAIL  ') + name + (extra ? '   ' + extra : ''));
  if (!cond) fails++;
}
ok('the share of level 1 cards falls over the term', l1Late < l1Early,
   (l1Early * 100).toFixed(0) + '% down to ' + (l1Late * 100).toFixed(0) + '%');
ok('the share of level 2 and 3 cards rises over the term', deepLate > deepEarly,
   (deepEarly * 100).toFixed(0) + '% up to ' + (deepLate * 100).toFixed(0) + '%');
ok('level 3 is reached', avg(late, 'l3') > 0, (avg(late, 'l3') * 100).toFixed(0) + '% of late cards');
process.exit(fails ? 1 : 0);
