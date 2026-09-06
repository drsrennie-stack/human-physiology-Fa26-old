/* Does the DOK gate actually open?
   The main suite only proves a fresh student meets DOK 1 first. This one
   drives a competency all the way up: seed the spacing state so its DOK 1
   cards are holding, reload, and check that DOK 2 appears and DOK 3 still
   does not. Then do it again for DOK 2 and check DOK 3 opens.

   It also checks the override, because a gate a student cannot open is a
   wall, and checks that bank load time is survivable at 5 MB. */
const { chromium } = require('playwright');
const path = require('path');

const URL = 'file://' + path.resolve(__dirname, '../repo/os/mastery-physio-os.html');
let fails = 0;
function ok(name, cond, extra) {
  console.log((cond ? '  PASS  ' : '  FAIL  ') + name + (extra ? '   ' + extra : ''));
  if (!cond) fails++;
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  page.setDefaultTimeout(9000);
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));

  const t0 = Date.now();
  await page.goto(URL, { waitUntil: 'load' });
  await page.waitForTimeout(800);
  const loadMs = Date.now() - t0;

  console.log('\n1. THE BANK AT FULL SIZE');
  const size = await page.evaluate(() => {
    let n = 0, byDok = { 1: 0, 2: 0, 3: 0 }, comps = new Set(), tagged = 0;
    window.BIO005_CARD_BANK.modules.forEach(m => m.topics.forEach(t => t.cards.forEach(c => {
      n++; byDok[c.dok]++; comps.add(c.competencyId);
      if (c.topic && c.tags && c.tags.length && c.week && c.yield) tagged++;
    })));
    return { n, byDok, comps: comps.size, tagged };
  });
  ok('4,980 cards load', size.n === 4980, String(size.n));
  ok('all 268 competencies reachable', size.comps === 268, String(size.comps));
  ok('every card carries topic, DOK, week, yield and tags',
     size.tagged === size.n, size.tagged + ' of ' + size.n);
  ok('DOK spread is recall heavy',
     size.byDok[1] > size.byDok[2] && size.byDok[2] > size.byDok[3],
     `1:${size.byDok[1]} 2:${size.byDok[2]} 3:${size.byDok[3]}`);
  ok('page loads in under 8 seconds with the full bank', loadMs < 8000, loadMs + ' ms');
  ok('no page errors on load', errors.length === 0, errors.slice(0, 2).join(' | '));

  /* Pick a competency with cards at all three levels. */
  const target = await page.evaluate(() => {
    const byComp = {};
    window.BIO005_CARD_BANK.modules.forEach(m => m.topics.forEach(t => t.cards.forEach(c => {
      const g = byComp[c.competencyId] || (byComp[c.competencyId] = { t: t.id, d: {1:[],2:[],3:[]} });
      g.d[c.dok].push(t.id + ':' + c.id);
    })));
    const id = Object.keys(byComp).find(k =>
      byComp[k].d[1].length >= 3 && byComp[k].d[2].length >= 3 && byComp[k].d[3].length >= 1);
    return { id, ...byComp[id] };
  });

  /* Seed the spacing store directly. box 2 is "holding": right on two
     separate days. GATE_N is 3. */
  async function seed(levels) {
    await page.evaluate(({ target, levels }) => {
      const store = {};
      levels.forEach(lvl => target.d[lvl].slice(0, 3).forEach(key => {
        store[key] = { box: 2, right: 2, wrong: 0, last: '2026-01-01', next: '2026-01-02' };
      }));
      localStorage.setItem('bio005-recall-progress', JSON.stringify(store));
    }, { target, levels });
  }
  async function levelsOffered() {
    /* A hash-only navigation is a SAME DOCUMENT navigation: the page does
       not reload, the script does not re-run, and recall-view keeps the
       copy of the spacing state it read at boot. Seeding localStorage and
       then changing the hash therefore tests nothing. Go somewhere else
       first so the next goto is a real load. */
    await page.goto('about:blank');
    await page.goto(URL + '#s-recall?comp=' + target.id, { waitUntil: 'load' });
    await page.waitForTimeout(900);
    return page.evaluate(compId => {
      /* Ask the view itself, through its one public door. */
      const n = window.BIO005_RECALL_OPEN(compId);
      const seen = new Set();
      document.querySelectorAll('.rv-stage .rv-badge').forEach(b => seen.add(b.textContent.trim()));
      return { queued: n, showing: [...seen] };
    }, target.id);
  }

  console.log('\n2. THE GATE, DRIVEN UP THROUGH THE LEVELS');
  console.log('   competency under test: ' + target.id);

  /* The queue size is the honest measure. A competency with 8 DOK 1,
     7 DOK 2 and 4 DOK 3 cards should deal 8 when only DOK 1 is open, 15
     when DOK 2 opens, and all 19 when DOK 3 does. Reading the first
     rendered card only tells you the queue is sorted shallow first, which
     it always is. */
  const counts = await page.evaluate(compId => {
    const n = { 1: 0, 2: 0, 3: 0 };
    window.BIO005_CARD_BANK.modules.forEach(m => m.topics.forEach(t => t.cards.forEach(c => {
      if (c.competencyId === compId) n[c.dok]++;
    })));
    return n;
  }, target.id);
  const expect1 = counts[1];
  const expect2 = counts[1] + counts[2];
  const expect3 = counts[1] + counts[2] + counts[3];
  console.log('   cards at each level: 1=' + counts[1] + ' 2=' + counts[2] + ' 3=' + counts[3]);

  await page.evaluate(() => localStorage.removeItem('bio005-recall-progress'));
  let r = await levelsOffered();
  ok('fresh student is dealt DOK 1 only', r.queued === expect1,
     r.queued + ' queued, expected ' + expect1);
  ok('and the card on screen is a DOK 1', r.showing.join(',') === '1', r.showing.join(','));

  await seed([1]);
  r = await levelsOffered();
  ok('three DOK 1 cards holding opens DOK 2, and not DOK 3',
     r.queued === expect2, r.queued + ' queued, expected ' + expect2);

  await seed([1, 2]);
  r = await levelsOffered();
  ok('three DOK 2 cards holding opens DOK 3',
     r.queued === expect3, r.queued + ' queued, expected ' + expect3);

  /* And the gate must not leak sideways: holding DOK 1 on this competency
     should not open DOK 2 on a different one. */
  const other = await page.evaluate(compId => {
    const byComp = {};
    window.BIO005_CARD_BANK.modules.forEach(m => m.topics.forEach(t => t.cards.forEach(c => {
      const g = byComp[c.competencyId] || (byComp[c.competencyId] = { 1: 0, 2: 0, 3: 0 });
      g[c.dok]++;
    })));
    const id = Object.keys(byComp).find(k => k !== compId && byComp[k][1] >= 3 && byComp[k][2] >= 3);
    return { id, n1: byComp[id][1] };
  }, target.id);
  await page.goto('about:blank');
  await page.goto(URL + '#s-recall?comp=' + other.id, { waitUntil: 'load' });
  await page.waitForTimeout(900);
  const otherQueued = await page.evaluate(id => window.BIO005_RECALL_OPEN(id), other.id);
  ok('the gate is per competency, it does not leak to its neighbors',
     otherQueued === other.n1, other.id + ': ' + otherQueued + ' queued, expected ' + other.n1);

  console.log('\n3. THE OVERRIDE');
  await page.evaluate(() => localStorage.removeItem('bio005-recall-progress'));
  await page.goto('about:blank');
  await page.goto(URL + '#s-recall', { waitUntil: 'load' });
  await page.waitForTimeout(900);
  const gated = await page.evaluate(() => {
    document.getElementById('rv-ungated').checked = false;
    document.getElementById('rv-ungated').dispatchEvent(new Event('change', { bubbles: true }));
    return document.querySelector('#recallMount .rv-panel h3').textContent;
  });
  await page.waitForTimeout(300);
  const ungated = await page.evaluate(() => {
    const cb = document.getElementById('rv-ungated');
    cb.checked = true;
    cb.dispatchEvent(new Event('change', { bubbles: true }));
    return document.querySelector('#recallMount .rv-panel h3').textContent;
  });
  const nGated = parseInt(gated, 10), nUngated = parseInt(ungated, 10);
  ok('the override widens the pool', nUngated > nGated, nGated + ' -> ' + nUngated);

  console.log('\n' + (fails === 0 ? 'ALL GATE CHECKS PASSED' : fails + ' CHECK(S) FAILED'));
  await browser.close();
  process.exit(fails === 0 ? 0 : 1);
})();
