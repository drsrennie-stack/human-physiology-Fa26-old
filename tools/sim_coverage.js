/* What does COVERAGE actually cost, and is it even reachable?

   The difficulty simulation answers "does it get harder". This one answers
   the question a student has to plan around: how many cards a day, and how
   many minutes a day, to COVER the course rather than sample it.

   ---------------------------------------------------------------------
   WHAT COVERAGE MEANS HERE

   Not "every card in the bank". The bank holds 4,980 cards across 268
   competencies, which is 18 cards per competency on average. A student who
   has proved a competency at all three levels does not need its twelfth
   recall card; the spares exist so there is always something new to ask
   when a card is missed.

   Coverage is defined as: every competency has THREE CARDS HOLDING AT
   EVERY LEVEL IT HAS CARDS FOR. Holding means box 2 or better, which can
   only be reached by being right on two separate days. Three is the same
   threshold the level gate already uses, so covering a competency and
   opening its top level are the same act.

   That is 268 competencies times up to 9 cards, about 2,300 cards, not
   4,980. The rest of the bank is reserve.

   ---------------------------------------------------------------------
   THE STRUCTURAL LIMIT, WHICH NO AMOUNT OF STUDYING FIXES

   A competency cannot be covered the day it is taught. Three level 1 cards
   have to reach box 2, which takes at least two separate days each. Only
   then does level 2 open, and the same again, and then level 3. The
   fastest possible path from first exposure to level 3 covered is about
   six study days, and that assumes never missing one.

   So material taught in the last week of term cannot be covered before the
   term ends. This simulation reports where that line falls.

   ---------------------------------------------------------------------
   TIME MODEL

   Word counts measured from the bank itself: level 1 cards average 103
   words, level 2 average 121, level 3 average 153, counting question, four
   options and explanation. Costed at 200 words per minute, a normal rate
   for dense study text read for comprehension, plus a thinking pause.

     first time on a card   read everything, including the explanation
     review answered right  read question and options only
     review answered wrong  read everything again

   These are estimates with a real basis, not stopwatch data.

   Run: node tools/sim_coverage.js
*/
global.window = {};
require('../os/bio005-card-bank.js');
require('../bio005-competencies.js');

const BOX_DAYS = [0, 1, 4, 12, 30, 75];
const HOLDING = 2, TARGET = 3;      // three cards holding, per competency, per level
const HIT = { 1: 0.80, 2: 0.70, 3: 0.60 };
const TERM_WEEKS = 15;
const CURRENT_FLOOR = 3;

const WORDS = { 1: 103, 2: 121, 3: 153 };
const THINK = { 1: 10, 2: 15, 3: 20 };
const WPM = 200;
const secFirst = d => WORDS[d] / WPM * 60 + THINK[d];
const secRight = d => WORDS[d] * 0.40 / WPM * 60 + THINK[d] * 0.5;
const secWrong = d => secFirst(d);

const COMP_WEEK = {};
(window.BIO005_COMPETENCIES || []).forEach(c => COMP_WEEK[c.id] = c.week || 0);

const ALL = [];
window.BIO005_CARD_BANK.modules.forEach(m => m.topics.forEach(t => t.cards.forEach(c => {
  ALL.push({
    key: t.id + ':' + c.id, comp: c.competencyId || t.id,
    dok: Math.max(1, Math.min(3, +c.dok || 1)),
    week: c.week || COMP_WEEK[c.competencyId] || 0
  });
})));
const COMPS = [...new Set(ALL.map(e => e.comp))];

/* what each competency has, per level, so a target can be capped at reality */
const HAVE = {};
for (const e of ALL) {
  const g = HAVE[e.comp] || (HAVE[e.comp] = { 1: 0, 2: 0, 3: 0 });
  g[e.dok]++;
}
let TIER = { name: 'all three levels', top: () => 3 };
function needAt(comp, dok) {
  if (dok > TIER.top(comp)) return 0;
  return Math.min(TARGET, HAVE[comp][dok]);
}
/* total cards that have to be holding for full coverage */
const COVERAGE_CARDS = COMPS.reduce((s, c) =>
  s + needAt(c, 1) + needAt(c, 2) + needAt(c, 3), 0);

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

function runTerm(budget, daysPerWeek) {
  const progress = {};
  let hold = {};          // comp -> {1,2,3} count holding
  let GATE = {};

  function census() {
    hold = {};
    for (const c of COMPS) hold[c] = { 1: 0, 2: 0, 3: 0 };
    for (const e of ALL) {
      const p = progress[e.key];
      if (p && (p.box || 0) >= HOLDING) hold[e.comp][e.dok]++;
    }
    GATE = {};
    for (const c of COMPS) {
      let open = 1;
      if (HAVE[c][2] && hold[c][1] >= Math.min(TARGET, HAVE[c][1])) open = 2;
      if (open === 2 && HAVE[c][3] && hold[c][2] >= Math.min(TARGET, HAVE[c][2])) open = 3;
      GATE[c] = open;
    }
  }
  const gateFor = e => GATE[e.comp] || 1;

  /* a card is worth introducing only if its competency and level is still
     short of the target. Past that, the extra cards are reserve. */
  /* in flight: started but not yet holding. A competency and level needs
     only three cards holding, so there is no point starting a fourth while
     three are already on their way. */
  let flight = {};
  function inflight() {
    flight = {};
    for (const c of COMPS) flight[c] = { 1: 0, 2: 0, 3: 0 };
    for (const e of ALL) {
      const p = progress[e.key];
      if (p && (p.box || 0) < HOLDING) flight[e.comp][e.dok]++;
    }
  }
  const wanted = e =>
    hold[e.comp][e.dok] + flight[e.comp][e.dok] < needAt(e.comp, e.dok);
  /* how many more cards have to be started for full coverage */
  function shortfall() {
    let n = 0;
    for (const c of COMPS) for (const d of [1, 2, 3]) {
      n += Math.max(0, needAt(c, d) - hold[c][d] - flight[c][d]);
    }
    return n;
  }
  const covered = c => [1, 2, 3].every(d => hold[c][d] >= needAt(c, d));

  inflight();
  const totalDays = TERM_WEEKS * daysPerWeek;
  const dailyMin = [], dailyN = [];
  const weekCovered = {};     // week of material -> study day it finished
  let dayIndex = 0;
  census();

  for (let w = 1; w <= TERM_WEEKS; w++) {
    for (let d = 0; d < daysPerWeek; d++) {
      const day = (w - 1) * 7 + d;
      dayIndex++;
      const daysLeft = Math.max(1, totalDays - dayIndex + 1);

      const pool = ALL.filter(e => (!e.week || e.week <= w) && e.dok <= gateFor(e));
      const reviews = [], fresh = [];
      for (const e of pool) {
        const p = progress[e.key];
        if (p) { if (p.next <= day && (p.box || 0) < HOLDING + 3) reviews.push(e); }
        else if (wanted(e)) fresh.push(e);
      }

      /* New cards are NOT rationed evenly across the term. Material only
         exists once it has been taught, so rationing against the whole
         term starves the early weeks and then runs out of days at the end.
         Instead: reserve a slice of the budget for new cards, let due
         reviews take the rest, and hand any unused review slots back to
         new cards. */
      const reserveNew = Math.min(fresh.length, Math.ceil(budget * 0.35));

      reviews.sort((a, b) => (progress[a.key].next - progress[b.key].next) || (b.dok - a.dok));
      /* Reviews are taken strictly by how overdue they are, NOT round robin
         across competencies. Round robin caps a competency at one review a
         day, and a competency needs three cards holding at each of three
         levels, so that cap alone makes coverage unreachable. */
      const takeReviews = reviews.slice(0, Math.max(0, budget - reserveNew));
      const newSlots = Math.min(budget - takeReviews.length, fresh.length);

      const current = fresh.filter(e => (COMP_WEEK[e.comp] || e.week) === w).sort((a, b) => a.dok - b.dok);
      const backlog = fresh.slice().sort((a, b) =>
        ((COMP_WEEK[a.comp] || a.week || 0) - (COMP_WEEK[b.comp] || b.week || 0)) || (a.dok - b.dok));

      /* Take no more cards for a competency and level than it is actually
         short of. Without this cap a single day starts every card the
         competency owns, and the review load balloons past what any daily
         budget can carry. */
      const room = {};
      function take(list, limit, out) {
        for (const e of list) {
          if (out.length >= limit) break;
          if (used.has(e.key)) continue;
          const k = e.comp + '|' + e.dok;
          if (room[k] === undefined) {
            room[k] = needAt(e.comp, e.dok) - hold[e.comp][e.dok] - flight[e.comp][e.dok];
          }
          if (room[k] <= 0) continue;
          room[k]--; used.add(e.key); out.push(e);
        }
        return out;
      }
      const used = new Set();
      const takeCurrent = take(spread(current), Math.min(CURRENT_FLOOR, newSlots), []);
      const newCards = takeCurrent.concat(take(spread(backlog), newSlots - takeCurrent.length, []));

      let sec = 0;
      const set = takeReviews.concat(newCards);
      for (const e of set) {
        const first = !progress[e.key];
        const p = progress[e.key] || { box: 0, right: 0, wrong: 0 };
        const right = Math.random() < HIT[e.dok];
        sec += first ? secFirst(e.dok) : (right ? secRight(e.dok) : secWrong(e.dok));
        if (right) { p.right++; p.box = Math.min(p.box + 1, BOX_DAYS.length - 1); }
        else { p.wrong++; p.box = 0; }
        p.next = day + BOX_DAYS[p.box];
        progress[e.key] = p;
      }
      dailyMin.push(sec / 60);
      dailyN.push(set.length);
      census();
      inflight();

      for (let mw = 1; mw <= w; mw++) {
        if (weekCovered[mw]) continue;
        const cs = COMPS.filter(c => (COMP_WEEK[c] || 0) === mw);
        if (cs.length && cs.every(covered)) weekCovered[mw] = dayIndex;
      }
    }
  }

  const done = COMPS.filter(covered).length;
  const holdingCards = ALL.filter(e => (progress[e.key] || {}).box >= HOLDING).length;
  const lastCovered = Math.max(0, ...Object.keys(weekCovered).map(Number));
  return {
    covered: done / COMPS.length,
    holdingCards,
    meanMin: dailyMin.reduce((a, b) => a + b, 0) / dailyMin.length,
    maxMin: Math.max(...dailyMin),
    meanN: dailyN.reduce((a, b) => a + b, 0) / dailyN.length,
    lastCovered, weekCovered
  };
}


/* ---------------------------------------------------------------- report */
const TIERS = [
  { key: 'L1',   name: 'Level 1 on every competency',        top: () => 1 },
  { key: 'L1L2', name: 'Levels 1 and 2 on every competency', top: () => 2 },
  { key: 'ALL',  name: 'All three levels on every competency', top: () => 3 },
];
const RUNS = 3;
function avg(list, k) { return list.reduce((s2, r) => s2 + r[k], 0) / list.length; }

console.log('BIO 005 spaced recall, what coverage costs.\n');
console.log('Bank: 4,980 cards, 268 competencies.');
console.log('Covered means three cards holding, per competency, per level.');
console.log('Holding means box 2 or better, which needs right on two separate days.');
console.log('Each cell is the average of ' + RUNS + ' simulated terms.\n');

for (const tier of TIERS) {
  TIER = tier;
  const need = COMPS.reduce((a, c) => a + needAt(c, 1) + needAt(c, 2) + needAt(c, 3), 0);
  console.log('\n' + tier.name.toUpperCase() + '   (' + need + ' cards must be holding)');
  console.log('  daily cap    days/wk   competencies covered   cards actually done/day   min/day');
  for (const days of [5, 6, 7]) {
    for (const budget of [30, 60, 90, 130, 180]) {
      const rs = []; for (let i2 = 0; i2 < RUNS; i2++) rs.push(runTerm(budget, days));
      console.log('  ' + String(budget).padStart(9) + String(days).padStart(11) +
        ((avg(rs, 'covered') * 100).toFixed(0) + '%').padStart(23) +
        avg(rs, 'meanN').toFixed(0).padStart(26) +
        avg(rs, 'meanMin').toFixed(0).padStart(10));
    }
    console.log('  ' + '-'.repeat(84));
  }
}

/* Where the term runs out. Level 1 tier, a realistic daily cap. */
TIER = TIERS[0];
const probe = runTerm(90, 7);
console.log('\n\nLAG. Level 1 coverage, 90 cards a day, 7 days a week.');
console.log('Each week of material finishes being covered on study day:');
const ws = Object.keys(probe.weekCovered).map(Number).sort((a, b) => a - b);
ws.forEach(w => console.log('  week ' + String(w).padStart(2) + ' material   study day ' +
  String(probe.weekCovered[w]).padStart(3) + '   (' +
  (probe.weekCovered[w] / 7 - w).toFixed(1) + ' weeks after it was taught)'));
const missed = [];
for (let w = 1; w <= TERM_WEEKS; w++) if (!probe.weekCovered[w]) missed.push(w);
console.log(missed.length
  ? '  NOT finished before the term ends: weeks ' + missed.join(', ')
  : '  every week of material finished before the term ends');

TIER = TIERS[1];
const probe2 = runTerm(180, 7);
console.log('\nLAG. Levels 1 and 2, 180 cards a day, 7 days a week.');
const missed2 = [];
for (let w = 1; w <= TERM_WEEKS; w++) if (!probe2.weekCovered[w]) missed2.push(w);
console.log('  weeks finished: ' + Object.keys(probe2.weekCovered).map(Number).sort((a,b)=>a-b).join(', '));
console.log(missed2.length
  ? '  NOT finished before the term ends: weeks ' + missed2.join(', ')
  : '  every week finished');
