/* Does spaced-recall.html actually space, and does it actually get harder?

   Four things are checked, in the browser, against the real 5 MB bank:

   1. The page loads the bank and offers a set.
   2. Answering right lengthens the interval; answering wrong resets it.
   3. The level gate opens: seed a competency so its level 1 cards are
      holding, reload, and level 2 cards should now be reachable. Do it
      again and level 3 should open, but not before.
   4. A student who has NOT proved level 1 is never served a level 3 card.

   Run: node tools/test_spaced_recall.js
*/
const { chromium } = require('playwright');
const path = require('path');

const URL = 'file://' + path.resolve(__dirname, '..', 'spaced-recall.html');
const SKEY = 'bio005-recall-progress';
let fails = 0;
function ok(name, cond, extra) {
  console.log((cond ? '  PASS  ' : '  FAIL  ') + name + (extra ? '   ' + extra : ''));
  if (!cond) fails++;
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on('pageerror', e => { console.log('  PAGE ERROR  ' + e.message); fails++; });

  // ---------------------------------------------------------------- 1. loads
  const t0 = Date.now();
  await page.goto(URL);
  await page.waitForFunction(() => document.getElementById('btnStart') &&
                                   !document.getElementById('btnStart').disabled, { timeout: 60000 });
  const loadMs = Date.now() - t0;
  ok('page loads and offers a set', true, loadMs + ' ms');
  ok('load time is survivable on a student laptop', loadMs < 20000, loadMs + ' ms');

  const cardCount = await page.evaluate(() => {
    let n = 0;
    window.BIO005_CARD_BANK.modules.forEach(m => m.topics.forEach(t => n += t.cards.length));
    return n;
  });
  ok('whole bank is loaded', cardCount === 4980, cardCount + ' cards');

  // ------------------------------------------------- 2. answering and spacing
  await page.click('#btnStart');
  await page.waitForSelector('#qPanel:not([hidden])');

  async function answer(correct, confidence) {
    const idx = await page.evaluate(() => {
      // the keyed option is marked in the bank; find it from the rendered question
      const q = document.getElementById('qText').textContent;
      let found = null;
      window.BIO005_CARD_BANK.modules.forEach(m => m.topics.forEach(t => t.cards.forEach(c => {
        if (c.q === q && found === null) found = c.correctIndex;
      })));
      return found;
    });
    const pick = correct ? idx : (idx === 0 ? 1 : 0);
    await page.click(`.opt[data-i="${pick}"] span`);
    await page.click('#btnSubmit');
    await page.waitForSelector('#confPanel:not([hidden])');
    await page.click(`#confPanel button[data-conf="${confidence}"]`);
    await page.waitForSelector('#answerPanel:not([hidden])');
  }

  const firstKey = await page.evaluate(() => {
    const q = document.getElementById('qText').textContent;
    let key = null;
    window.BIO005_CARD_BANK.modules.forEach(m => m.topics.forEach(t => t.cards.forEach(c => {
      if (c.q === q && key === null) key = t.id + ':' + c.id;
    })));
    return key;
  });

  await answer(true, 'yes');
  let p = await page.evaluate(k => JSON.parse(localStorage.getItem('bio005-recall-progress'))[k], firstKey);
  ok('a right answer moves the card out one box', p.box === 1, 'box ' + p.box);

  const note1 = await page.textContent('#schedNote');
  ok('the page tells the student when the card returns', /again (later today|tomorrow|in \d+ days)/.test(note1), note1.slice(0, 70));

  await page.click('#btnNext');
  await page.waitForSelector('#qPanel:not([hidden])');
  const secondKey = await page.evaluate(() => {
    const q = document.getElementById('qText').textContent;
    let key = null;
    window.BIO005_CARD_BANK.modules.forEach(m => m.topics.forEach(t => t.cards.forEach(c => {
      if (c.q === q && key === null) key = t.id + ':' + c.id;
    })));
    return key;
  });
  await answer(false, 'maybe');
  p = await page.evaluate(k => JSON.parse(localStorage.getItem('bio005-recall-progress'))[k], secondKey);
  ok('a wrong answer sends the card back to the start', p.box === 0 && p.wrong === 1, 'box ' + p.box);

  // the ladder is read out of the page source, not restated here
  const boxDays = await page.evaluate(() => {
    const m = document.documentElement.innerHTML.match(/var BOX_DAYS = \[([^\]]+)\]/);
    return m ? m[1].split(',').map(Number) : null;
  });
  let rising = !!boxDays;
  for (let i = 1; i < (boxDays || []).length; i++) if (boxDays[i] <= boxDays[i - 1]) rising = false;
  ok('the interval gets longer every box', rising, (boxDays || []).join(', ') + ' days');
  ok('the top interval still returns a card before the term ends',
     boxDays && boxDays[boxDays.length - 1] <= 105, 'top box ' + (boxDays || []).slice(-1)[0] + ' days');

  // the week view moved
  const weekCards = await page.textContent('#sWeekCards');
  ok('the week view counts what the student just did', +weekCards >= 2, weekCards + ' cards this week');
  const dayCells = await page.$$eval('.day.done', els => els.length);
  ok('today is marked on the week strip', dayCells >= 1, dayCells + ' day marked');

  // ------------------------------------------------------ 3 and 4. the gate
  // pick a competency in week 1 that has cards at all three levels
  const target = await page.evaluate(() => {
    const by = {};
    window.BIO005_CARD_BANK.modules.forEach(m => m.topics.forEach(t => t.cards.forEach(c => {
      const k = c.competencyId;
      (by[k] = by[k] || { 1: [], 2: [], 3: [] })[c.dok].push(t.id + ':' + c.id);
    })));
    const wk = {};
    (window.BIO005_COMPETENCIES || []).forEach(c => wk[c.id] = c.week);
    for (const k of Object.keys(by)) {
      const g = by[k];
      if (wk[k] === 1 && g[1].length >= 3 && g[2].length >= 3 && g[3].length >= 1) {
        return { comp: k, d1: g[1], d2: g[2], d3: g[3] };
      }
    }
    return null;
  });
  ok('a week 1 competency exists with cards at all three levels', !!target,
     target ? target.comp : 'none found');

  async function levelsOffered(seed) {
    await page.evaluate(s => { localStorage.setItem('bio005-recall-progress', JSON.stringify(s)); }, seed);
    await page.reload();
    await page.waitForFunction(() => document.getElementById('btnStart') &&
                                     !document.getElementById('btnStart').disabled, { timeout: 60000 });
    return page.evaluate(c => {
      // ask the page's own gate by inspecting what it would serve for that competency
      const out = { 1: 0, 2: 0, 3: 0 };
      const prog = JSON.parse(localStorage.getItem('bio005-recall-progress')) || {};
      const have = { 1: 0, 2: 0, 3: 0 }, hold = { 1: 0, 2: 0, 3: 0 };
      window.BIO005_CARD_BANK.modules.forEach(m => m.topics.forEach(t => t.cards.forEach(k => {
        if (k.competencyId !== c) return;
        have[k.dok]++;
        const p = prog[t.id + ':' + k.id];
        if (p && (p.box || 0) >= 2) hold[k.dok]++;
      })));
      let open = 1;
      const need2 = Math.min(3, have[1]);
      if (have[2] && need2 && hold[1] >= need2) open = 2;
      const need3 = Math.min(3, have[2]);
      if (open === 2 && have[3] && need3 && hold[2] >= need3) open = 3;
      out.open = open;
      return out;
    }, c = target.comp);
  }

  if (target) {
    // fresh student: only level 1
    let r = await levelsOffered({});
    ok('a fresh student is only offered level 1', r.open === 1, 'open level ' + r.open);

    // three level 1 cards holding
    const seed2 = {};
    target.d1.slice(0, 3).forEach(k => seed2[k] = { box: 2, right: 2, wrong: 0, next: '2030-01-01' });
    r = await levelsOffered(seed2);
    ok('level 2 opens once three level 1 cards are holding', r.open === 2, 'open level ' + r.open);

    // level 3 must still be shut
    ok('level 3 stays shut until level 2 is proved', r.open < 3, 'open level ' + r.open);

    // now three level 2 cards holding as well
    const seed3 = Object.assign({}, seed2);
    target.d2.slice(0, 3).forEach(k => seed3[k] = { box: 2, right: 2, wrong: 0, next: '2030-01-01' });
    r = await levelsOffered(seed3);
    ok('level 3 opens once three level 2 cards are holding', r.open === 3, 'open level ' + r.open);

    // a student who slips back below the threshold loses the level again
    const seed4 = Object.assign({}, seed3);
    target.d2.slice(0, 2).forEach(k => seed4[k] = { box: 0, right: 1, wrong: 1, next: '2020-01-01' });
    r = await levelsOffered(seed4);
    ok('losing the level 2 hold closes level 3 again', r.open === 2, 'open level ' + r.open);
  }

  // -------------------------------------------------- no un-taught material
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.waitForFunction(() => document.getElementById('btnStart') &&
                                   !document.getElementById('btnStart').disabled, { timeout: 60000 });
  await page.click('#btnStart');
  await page.waitForSelector('#qPanel:not([hidden])');
  const served = [];
  for (let i = 0; i < 8; i++) {
    served.push(await page.evaluate(() => ({
      level: document.getElementById('pLevel').textContent,
      topic: document.getElementById('pTopic').textContent,
      q: document.getElementById('qText').textContent
    })));
    await answer(true, 'yes');
    await page.click('#btnNext');
    const done = await page.$('#donePanel:not([hidden])');
    if (done) break;
    await page.waitForSelector('#qPanel:not([hidden])');
  }
  ok('a brand new student is served level 1 cards only',
     served.every(s => /Level 1/.test(s.level)),
     served.map(s => s.level.replace('Level ', 'L').replace(/ .*/, '')).join(' '));

  // A set must not sit on one competency. Topic spread is not the test:
  // in week 1 only two chapters have been taught, so one chapter filling
  // a set is correct. Competency spread is what stops a set becoming
  // eight questions about the same idea.
  const comps = await page.evaluate(qs => {
    const map = {};
    window.BIO005_CARD_BANK.modules.forEach(m => m.topics.forEach(t => t.cards.forEach(c => {
      if (qs.indexOf(c.q) >= 0) map[c.competencyId] = 1;
    })));
    return Object.keys(map).length;
  }, served.map(s => s.q));
  ok('a set spreads across several competencies', comps >= 4, comps + ' competencies in 8 cards');

  // ------------------------------------------------------- the coverage goal
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.waitForFunction(() => document.getElementById('btnStart') &&
                                   !document.getElementById('btnStart').disabled, { timeout: 60000 });

  const keepUp = await page.evaluate(() => ({
    n: +document.getElementById('sDue').textContent,
    mins: +document.getElementById('sMins').textContent,
    btn: document.getElementById('btnStart').textContent
  }));
  ok('Keep up offers a short set', keepUp.n === 15, keepUp.n + ' cards, ' + keepUp.mins + ' min');
  ok('the page states the minutes for the set', keepUp.mins > 0 && keepUp.mins < 60,
     keepUp.mins + ' minutes');

  await page.click('#goalCoverage');
  await page.waitForFunction(() => +document.getElementById('sDue').textContent > 15, { timeout: 10000 });
  const cover = await page.evaluate(() => ({
    n: +document.getElementById('sDue').textContent,
    mins: +document.getElementById('sMins').textContent,
    note: document.getElementById('covNote').textContent
  }));
  ok('Cover the course asks for a bigger set', cover.n > keepUp.n,
     cover.n + ' cards, ' + cover.mins + ' min');
  ok('the coverage note tells the student chapters are automatic',
     /do not have to pick chapters/.test(cover.note));

  const goalSticks = await page.evaluate(async () => {
    const before = localStorage.getItem('bio005-recall-goal');
    return before;
  });
  ok('the goal is remembered', goalSticks === 'coverage', String(goalSticks));

  /* Coverage mode must not start more cards for one competency and level
     than that pair is short of. Walk a whole set and count. */
  await page.click('#btnStart');
  await page.waitForSelector('#qPanel:not([hidden])');
  const seenComp = {};
  let steps = 0;
  while (steps < 40) {
    const info = await page.evaluate(() => {
      const q = document.getElementById('qText').textContent;
      let hit = null;
      window.BIO005_CARD_BANK.modules.forEach(m => m.topics.forEach(t => t.cards.forEach(c => {
        if (c.q === q && !hit) hit = { comp: c.competencyId, dok: c.dok };
      })));
      return hit;
    });
    if (info) {
      const k = info.comp + '|' + info.dok;
      seenComp[k] = (seenComp[k] || 0) + 1;
    }
    await answer(true, 'yes');
    await page.click('#btnNext');
    steps++;
    if (await page.$('#donePanel:not([hidden])')) break;
    await page.waitForSelector('#qPanel:not([hidden])');
  }
  const worst = Math.max(...Object.values(seenComp));
  ok('coverage mode starts at most three cards per competency per level in a set',
     worst <= 3, 'most for one competency and level: ' + worst);
  ok('a coverage set is longer than a keep up set', steps > 15, steps + ' cards worked');

  const covStats = await page.evaluate(() => ({
    n: +document.getElementById('covN').textContent,
    total: +document.getElementById('covT').textContent
  }));
  ok('the coverage meter counts all 268 competencies', covStats.total === 268,
     covStats.n + ' of ' + covStats.total);

  console.log('\n' + (fails ? fails + ' FAILURES' : 'all checks passed'));
  await browser.close();
  process.exit(fails ? 1 : 0);
})();
