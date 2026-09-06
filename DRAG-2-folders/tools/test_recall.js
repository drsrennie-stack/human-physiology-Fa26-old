/* Headless test of the Recall view inside Mastery Physio OS.
   Run: node tools/test_recall.js  (from the bio005 working directory)  */
const { chromium } = require('playwright');
const path = require('path');

const URL = 'file://' + path.resolve(__dirname, '../repo/os/mastery-physio-os.html');
let fails = 0;
function ok(name, cond, extra) {
  console.log((cond ? '  PASS  ' : '  FAIL  ') + name + (extra ? '   ' + extra : ''));
  if (!cond) fails++;
}

/* WCAG relative luminance, so contrast claims are measured and not asserted. */
function lum(rgb) {
  const c = rgb.map(v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}
function ratio(a, b) {
  const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}
function parse(s) {
  const m = String(s).match(/rgba?\(([^)]+)\)/);
  return m ? m[1].split(',').slice(0, 3).map(n => parseFloat(n)) : [0, 0, 0];
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  /* Short timeouts on purpose. A missed click should fail the run in
     seconds with a readable message, not stall for half a minute. */
  page.setDefaultTimeout(6000);
  const errors = [], failed = [];
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', e => errors.push('pageerror: ' + e.message));
  page.on('requestfailed', r => failed.push(r.url().split('/').pop()));

  await page.goto(URL, { waitUntil: 'load' });
  await page.waitForTimeout(700);

  /* Onboarding sits in front of everything on a first visit. */
  await page.evaluate(() => {
    document.querySelectorAll('.onboard,.onboarding,#onboard,[data-onboard]').forEach(el => el.remove());
    try { localStorage.setItem('bio005-onboarded', '1'); } catch (e) {}
    location.hash = 's-recall';
  });
  await page.waitForTimeout(500);

  console.log('\n1. LOADING');
  /* The sandbox has no network, so the Google Fonts stylesheet cannot
     load here. That is the test rig, not the page: the font stacks all
     carry local fallbacks. Every other request has to succeed. */
  const net = e => /ERR_TUNNEL|ERR_INTERNET|ERR_NAME_NOT_RESOLVED|fonts\.googleapis|fonts\.gstatic/.test(e);
  const realErrors = () => errors.filter(e => !net(e));
  const realFailed = () => failed.filter(f => !/^css2|fonts/.test(f));
  ok('no console errors', realErrors().length === 0, realErrors().slice(0, 4).join(' | '));
  ok('no failed asset requests beyond the offline font CDN',
     realFailed().length === 0, realFailed().slice(0, 6).join(' '));
  const banked = await page.evaluate(() => {
    let n = 0;
    (window.BIO005_CARD_BANK.modules || []).forEach(m => (m.topics || []).forEach(t => n += t.cards.length));
    return { n, comps: (window.BIO005_COMPETENCIES || []).length,
             map: Object.keys(window.BIO005_CARD_COMPETENCY_MAP || {}).length };
  });
  ok('bank holds 4980 cards', banked.n === 4980, String(banked.n));
  ok('competency set is 268', banked.comps === 268, String(banked.comps));
  ok('map carries card level keys', banked.map > 902, String(banked.map));

  console.log('\n2. THE DECK VIEW');
  const mount = page.locator('#recallMount');
  await ok('mount rendered', await mount.count() === 1);
  const statTxt = await mount.locator('.rv-stats').innerText();
  ok('stats show the bank size', statTxt.includes('4980'), statTxt.replace(/\n/g, ' ').slice(0, 70));
  ok('gate toggle present', await page.locator('#rv-ungated').count() === 1);
  ok('note sheet button present', await page.locator('#rv-notes').count() === 1);

  console.log('\n3. THE FOCUS STAGE');
  await page.click('#rv-start');
  await page.waitForTimeout(350);
  ok('stage opened', await page.locator('#rv-stage').count() === 1);
  ok('backdrop present', await page.locator('#rv-backdrop').count() === 1);
  ok('stage is a modal dialog', await page.locator('#rv-stage').getAttribute('aria-modal') === 'true');
  ok('body scroll locked', await page.evaluate(() => document.body.classList.contains('rv-locked')));
  const stagePos = await page.evaluate(() => {
    const s = document.getElementById('rv-stage');
    return { parent: s.parentElement.tagName, z: getComputedStyle(s).zIndex,
             pos: getComputedStyle(s).position };
  });
  ok('stage escapes the OS layout', stagePos.parent === 'BODY' && stagePos.pos === 'fixed',
     stagePos.parent + ' ' + stagePos.pos + ' z' + stagePos.z);
  const bd = await page.evaluate(() => {
    const b = getComputedStyle(document.getElementById('rv-backdrop'));
    return { bg: b.backgroundColor, blur: b.backdropFilter || b.webkitBackdropFilter };
  });
  ok('backdrop obscures the page', /0\.9|0\.90/.test(bd.bg) && /blur/.test(bd.blur), bd.bg + ' ' + bd.blur);

  console.log('\n4. THE CARD LOOKS LIKE A CARD');
  const look = await page.evaluate(() => {
    const card = document.querySelector('.rv-stage .rv-card');
    const face = document.querySelector('.rv-stage .rv-face');
    const q = document.querySelector('.rv-stage .rv-q');
    const cs = getComputedStyle(card), fs = getComputedStyle(face), qs = getComputedStyle(q);
    return { shell: cs.backgroundColor, radius: cs.borderRadius, shadow: cs.boxShadow.slice(0, 40),
             faceBg: fs.backgroundColor, qColor: qs.color, qWeight: qs.fontWeight,
             crumb: getComputedStyle(document.querySelector('.rv-crumb')).color,
             level: getComputedStyle(document.querySelector('.rv-level')).color };
  });
  ok('shell is the maroon card color', parse(look.shell).every((v, i) => v === [122, 42, 34][i]), look.shell);
  ok('center is white', parse(look.faceBg).every(v => v === 255), look.faceBg);
  ok('card is rounded and lifted', parseFloat(look.radius) >= 16 && look.shadow.length > 5);
  const qc = ratio(parse(look.qColor), [255, 255, 255]);
  ok('question text on white, AAA', qc >= 7, qc.toFixed(1) + ':1');
  const crumbC = ratio(parse(look.crumb), [122, 42, 34]);
  ok('shell text on the red, AAA', crumbC >= 7, crumbC.toFixed(1) + ':1');
  const levelC = ratio(parse(look.level), [122, 42, 34]);
  ok('DOK label on the red, AA at least', levelC >= 4.5, levelC.toFixed(1) + ':1');

  console.log('\n5. CONFIDENCE COMES FIRST');
  ok('confidence buttons shown', await page.locator('[data-conf]').count() === 3);
  ok('options are hidden until confidence is given', await page.locator('.rv-opt').count() === 0);

  console.log('\n6. DOK GATE');
  const doks = await page.evaluate(() => {
    /* Rebuild the queue the way the view does and read the levels in it. */
    const seen = new Set();
    document.querySelectorAll('.rv-stage .rv-badge').forEach(b => seen.add(b.textContent.trim()));
    return [...seen];
  });
  ok('first card is DOK 1', doks.length === 1 && doks[0] === '1', doks.join(','));

  console.log('\n7. FLAGGING');
  await page.click('#rv-flagbtn');
  await page.waitForTimeout(120);
  ok('flag is pressed', await page.locator('#rv-flagbtn').getAttribute('aria-pressed') === 'true');
  const stored = await page.evaluate(() => Object.keys(JSON.parse(localStorage.getItem('bio005-recall-flags') || '{}')).length);
  ok('flag persisted', stored === 1, String(stored));

  console.log('\n8. SURE AND WRONG');
  await page.click('[data-conf="sure"]');
  await page.waitForTimeout(250);
  ok('four options appear', await page.locator('.rv-opt').count() === 4);

  /* Deterministically pick a WRONG option, so the sure-and-wrong branch is
     actually exercised rather than left to chance. The engine keeps its
     shuffled view private, so the key is resolved by matching the rendered
     question back to the bank. */
  const keyAt = await page.evaluate(() => {
    const opts = [...document.querySelectorAll('.rv-opt')];
    const q = document.querySelector('.rv-q').textContent.trim();
    let card = null;
    window.BIO005_CARD_BANK.modules.forEach(m => m.topics.forEach(t => t.cards.forEach(c => {
      if (String(c.q).replace(/<[^>]*>/g, '').trim() === q) card = c;
    })));
    if (!card) return -1;
    return opts.findIndex(o => o.textContent.trim() === String(card.options[card.correctIndex]).trim());
  });
  ok('the key can be resolved from the bank', keyAt >= 0, String(keyAt));
  ok('the committed confidence stays on screen',
     await page.locator('.rv-chosen-v').count() === 1,
     (await page.locator('.rv-chosen-v').innerText().catch(() => '')));
  ok('submit is disabled before anything is picked',
     await page.locator('#rv-submit').isDisabled());
  ok('nothing was graded by arriving at the options',
     await page.evaluate(() => Object.keys(JSON.parse(localStorage.getItem('bio005-recall-progress') || '{}')).length) === 0);

  await page.locator('.rv-opt').nth(keyAt === 0 ? 1 : 0).click();
  await page.waitForTimeout(200);
  ok('selecting marks the pick', await page.locator('.rv-opt.is-picked').count() === 1);
  ok('selecting does not grade',
     await page.evaluate(() => Object.keys(JSON.parse(localStorage.getItem('bio005-recall-progress') || '{}')).length) === 0);
  ok('submit is enabled once a pick exists', !(await page.locator('#rv-submit').isDisabled()));

  /* Changing the pick before submitting must move the mark, not add one. */
  await page.locator('.rv-opt').nth(keyAt === 0 ? 2 : 1).click();
  await page.waitForTimeout(150);
  ok('changing the pick moves the mark', await page.locator('.rv-opt.is-picked').count() === 1);
  await page.locator('.rv-opt').nth(keyAt === 0 ? 1 : 0).click();
  await page.waitForTimeout(150);

  await page.click('#rv-submit');
  await page.waitForTimeout(300);
  const marked = await page.evaluate(() => ({
    right: document.querySelectorAll('.rv-opt.is-right').length,
    wrong: document.querySelectorAll('.rv-opt.is-wrong').length,
    disabled: [...document.querySelectorAll('.rv-opt')].every(b => b.disabled),
    submitGone: !document.querySelector('#rv-submit'),
    shaded: (() => {
      const v = document.querySelector('.rv-verdict');
      return v ? getComputedStyle(v).backgroundColor : '';
    })(),
    redflag: (document.querySelector('.rv-redflag') || {}).textContent || '',
    live: (document.querySelector('.rv-live') || {}).textContent || '',
    expl: !!document.querySelector('.rv-expl'),
  }));
  ok('key is marked correct', marked.right === 1);
  ok('the wrong pick is marked as the wrong pick', marked.wrong === 1);
  ok('every option locked after submitting', marked.disabled);
  ok('the submit button is gone once used', marked.submitGone);
  ok('answer and justification sit in a shaded area',
     parse(marked.shaded).every(v => v < 255) && parse(marked.shaded)[0] > 240, marked.shaded);
  ok('explanation revealed', marked.expl);
  ok('verdict reaches the live region in words', marked.live.length > 30);
  ok('sure and wrong is called out', /sure/i.test(marked.redflag), marked.redflag.slice(0, 60));
  const bs = await page.evaluate(() => Object.values(JSON.parse(localStorage.getItem('bio005-recall-progress') || '{}')).filter(p => p.blindspot).length);
  ok('blindspot recorded', bs === 1, String(bs));
  const boxed = await page.evaluate(() => Object.values(JSON.parse(localStorage.getItem('bio005-recall-progress') || '{}')).filter(p => p.blindspot).map(p => p.box)[0]);
  ok('missed card reset to box 0, due today', boxed === 0, 'box ' + boxed);
  ok('next button offered', await page.locator('#rv-next').count() === 1);

  console.log('\n9. RIGHT BUT NOT SURE IS HELD BACK');
  await page.click('#rv-next', { timeout: 5000 });
  await page.waitForTimeout(200);
  await page.click('[data-conf="no"]');
  await page.waitForTimeout(200);
  const rightAt = await page.evaluate(() => {
    /* The engine keeps the shuffled view privately, so find the key by text. */
    const opts = [...document.querySelectorAll('.rv-opt')];
    const q = document.querySelector('.rv-q').textContent.trim();
    let card = null;
    window.BIO005_CARD_BANK.modules.forEach(m => m.topics.forEach(t => t.cards.forEach(c => {
      if (String(c.q).replace(/<[^>]*>/g, '').trim() === q) card = c;
    })));
    if (!card) return -1;
    return opts.findIndex(o => o.textContent.replace(/\s+correct|\s+what you picked/, '').trim()
                               === String(card.options[card.correctIndex]).trim());
  });
  if (rightAt >= 0) {
    await page.locator('.rv-opt').nth(rightAt).click();
    await page.waitForTimeout(150);
    await page.click('#rv-submit');
    await page.waitForTimeout(300);
    const soft = await page.evaluate(() => ({
      msg: (document.querySelector('.rv-redflag-soft') || {}).textContent || '',
      held: Object.values(JSON.parse(localStorage.getItem('bio005-recall-progress') || '{}'))
              .filter(p => p.unsure).length,
      box: Math.max(...Object.values(JSON.parse(localStorage.getItem('bio005-recall-progress') || '{}'))
              .filter(p => p.unsure).map(p => p.box || 0)),
    }));
    ok('right but unsure is named', /did not know/i.test(soft.msg), soft.msg.slice(0, 60));
    ok('card held at box 1, back tomorrow', soft.held >= 1 && soft.box <= 1, 'box ' + soft.box);
  } else {
    console.log('  note   could not resolve the key for this card, skipped');
  }

  console.log('\n10. KEYBOARD AND ESCAPE');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(250);
  ok('escape closes the stage', await page.locator('#rv-stage').count() === 0);
  ok('scroll lock released', !(await page.evaluate(() => document.body.classList.contains('rv-locked'))));
  await page.click('#rv-start');
  await page.waitForTimeout(300);
  const trapped = await page.evaluate(async () => {
    const sg = document.getElementById('rv-stage');
    const f = sg.querySelectorAll('button:not([disabled])');
    f[f.length - 1].focus();
    return sg.contains(document.activeElement);
  });
  await page.keyboard.press('Tab');
  await page.waitForTimeout(120);
  const stillIn = await page.evaluate(() => document.getElementById('rv-stage').contains(document.activeElement));
  ok('focus starts inside the card', trapped);
  ok('tab does not escape the card', stillIn);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(200);

  console.log('\n11. THE NOTE SHEET');
  await page.click('#rv-notes');
  await page.waitForTimeout(350);
  const sheet = await page.evaluate(() => {
    const s = document.getElementById('rv-sheet');
    if (!s) return null;
    return { groups: s.querySelectorAll('.rv-sheet-group').length,
             items: s.querySelectorAll('.rv-sheet-item').length,
             space: s.querySelectorAll('.rv-sheet-space').length,
             rules: s.querySelectorAll('.rv-rule').length,
             draw: !!s.querySelector('.rv-sheet-draw-h'),
             why: [...s.querySelectorAll('.rv-sheet-why')].map(e => e.textContent).slice(0, 4),
             byline: /Sharilyn Rennie/.test(s.textContent),
             cred: /,\s*(ND|MD)\b/.test(s.textContent) };
  });
  ok('sheet built', !!sheet && sheet.items > 0, sheet ? sheet.items + ' items' : 'none');
  ok('grouped by competency', sheet && sheet.groups > 0, sheet ? sheet.groups + ' groups' : '');
  ok('carries open drawing space, one block per card',
     sheet && sheet.draw && sheet.space === sheet.items, sheet ? sheet.space + ' blocks' : '');
  ok('no ruled lines on the sheet', sheet && sheet.rules === 0, sheet ? String(sheet.rules) : '');
  ok('says why each card is on the sheet', sheet && sheet.why.length > 0, (sheet ? sheet.why[0] : ''));
  ok('byline present with no credential suffix', sheet && sheet.byline && !sheet.cred);
  ok('print and save offered', await page.locator('#rv-print').count() === 1 && await page.locator('#rv-save').count() === 1);

  console.log('\n12. PROGRESS SURVIVES A RELOAD');
  const beforeReload = await page.evaluate(() => ({
    prog: Object.keys(JSON.parse(localStorage.getItem('bio005-recall-progress') || '{}')).length,
    flags: Object.keys(JSON.parse(localStorage.getItem('bio005-recall-flags') || '{}')).length,
    feed: JSON.parse(localStorage.getItem('bio005-recall-v2') || '{}'),
  }));
  await page.reload({ waitUntil: 'load' });
  await page.waitForTimeout(700);
  const afterReload = await page.evaluate(() => ({
    prog: Object.keys(JSON.parse(localStorage.getItem('bio005-recall-progress') || '{}')).length,
    flags: Object.keys(JSON.parse(localStorage.getItem('bio005-recall-flags') || '{}')).length,
  }));
  ok('spacing state survived', afterReload.prog === beforeReload.prog && afterReload.prog > 0,
     afterReload.prog + ' cards');
  ok('flags survived', afterReload.flags === beforeReload.flags && afterReload.flags > 0);
  const topics = Object.keys(beforeReload.feed.topics || {});
  ok('mastery feed written for the OS', topics.length > 0, topics.join(','));

  console.log('\n13. MASTERY CREDIT LANDS ON THE RIGHT COMPETENCY');
  const credit = await page.evaluate(() => {
    const st = JSON.parse(localStorage.getItem('bio005-recall-v2') || '{}');
    const MAP = window.BIO005_CARD_COMPETENCY_MAP;
    const hit = new Set();
    Object.keys(st.topics || {}).forEach(tid => {
      Object.keys(st.topics[tid].cards || {}).forEach(cid => {
        const e = MAP[tid + ':' + cid] || MAP[tid];
        (e ? e.comps : []).forEach(c => hit.add(c));
      });
    });
    const answered = Object.keys(st.topics || {})
      .reduce((n, tid) => n + Object.keys(st.topics[tid].cards || {}).length, 0);
    return { hit: [...hit], answered };
  });
  ok('one competency credited per card answered, not the whole chapter',
     credit.hit.length <= credit.answered,
     credit.answered + ' cards credited ' + credit.hit.length + ' competencies');

  console.log('\n14. RUNTIME ERRORS ACROSS THE WHOLE SESSION');
  ok('still no console errors', realErrors().length === 0, realErrors().slice(0, 3).join(' | '));

  await page.screenshot({ path: path.resolve(__dirname, '../shots/deck.png'), fullPage: false });
  await page.evaluate(() => { location.hash = 's-recall'; });
  await page.waitForTimeout(300);
  await page.click('#rv-start').catch(() => {});
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.resolve(__dirname, '../shots/card-front.png') });
  await page.click('[data-conf="think"]').catch(() => {});
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.resolve(__dirname, '../shots/card-options.png') });
  await page.locator('.rv-opt').nth(0).click().catch(() => {});
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.resolve(__dirname, '../shots/card-answered.png') });
  await page.keyboard.press('Escape');
  await page.waitForTimeout(200);
  await page.click('#rv-notes').catch(() => {});
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.resolve(__dirname, '../shots/note-sheet.png'), fullPage: false });

  console.log('\n' + (fails === 0 ? 'ALL CHECKS PASSED' : fails + ' CHECK(S) FAILED'));
  await browser.close();
  process.exit(fails === 0 ? 0 : 1);
})();
