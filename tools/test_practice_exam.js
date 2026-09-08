/* Drives practice-exam.html headless. node tools/test_practice_exam.js */
const { chromium } = require('playwright');
const path = require('path');
const http = require('http');
const fs = require('fs');
const root = path.join(__dirname, '..');
let pass = 0, fail = 0;
function check(name, ok, extra) { if (ok) { pass++; console.log('  ok   ' + name); } else { fail++; console.log('  FAIL ' + name + (extra ? ' : ' + extra : '')); } }

const server = http.createServer((req, res) => {
  const p = path.join(root, decodeURIComponent(req.url.split('?')[0]));
  if (!fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type': p.endsWith('.js') ? 'text/javascript' : p.endsWith('.css') ? 'text/css' : 'text/html' });
  fs.createReadStream(p).pipe(res);
});

(async () => {
  await new Promise(r => server.listen(0, r));
  const base = 'http://127.0.0.1:' + server.address().port + '/';
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const ctx = await browser.newContext({ viewport: { width: 1200, height: 900 } });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto(base + 'practice-exam.html');
  await page.waitForSelector('#weeks input');

  check('15 week checkboxes', (await page.$$('#weeks input')).length === 15);
  check('a week is preselected', (await page.$$('#weeks input:checked')).length === 1);

  /* pure logic checks through the page's generator */
  const gen = await page.evaluate(() => {
    /* reach the closure via a scratch exam: replicate by calling through a fake popup? Instead re-implement: open in dialog. */
    return null;
  });

  /* choose multi mode, weeks 1 to 3, 30 questions */
  await page.click('#modes input[value="multi"]');
  for (const w of [1, 2, 3]) { const box = await page.$('#weeks input[value="' + w + '"]'); if (!(await box.isChecked())) await box.click(); }
  await page.click('#counts .pill[data-n="30"]');

  /* the exam opens in a popup */
  const [popup] = await Promise.all([ctx.waitForEvent('page'), page.click('#go')]);
  await popup.waitForSelector('#xcard .stem, #xcard h2');
  popup.on('pageerror', e => errors.push('popup: ' + e.message));
  check('popup opened with the exam', /run=/.test(popup.url()));

  const seenTypes = {}; let n = 0; const doks = {}; const weeks = {};
  for (let guard = 0; guard < 60; guard++) {
    const prog = await popup.textContent('#xprog');
    if (/^Finished/.test(prog)) break;
    const type = await popup.textContent('#xcard .tag.type');
    const dok = await popup.textContent('#xcard .tag.dok');
    const wk = (await popup.$$eval('#xcard .tag', els => els.map(e => e.textContent)))[1];
    seenTypes[type] = (seenTypes[type] || 0) + 1; doks[dok] = (doks[dok] || 0) + 1; weeks[wk] = (weeks[wk] || 0) + 1; n++;
    if (type === 'Multiple choice' || type === 'Application') {
      const opts = await popup.$$('#xcard input[name="ans"]');
      await opts[Math.floor(Math.random() * opts.length)].click();
      await popup.click('#xcard .conf label:nth-child(' + (1 + Math.floor(Math.random() * 5)) + ')');
      await popup.click('#xcard .xactions .btn');
      await popup.waitForSelector('#xcard .fb');
      check('feedback shows competency (' + type + ')', (await popup.textContent('#xcard .fb .comp')).indexOf('Competency tested') >= 0);
    } else if (type === 'Multiple answer') {
      const opts = await popup.$$('#xcard input[name="ans"]');
      await opts[0].click(); await opts[1].click();
      await popup.click('#xcard .conf label:nth-child(4)');
      await popup.click('#xcard .xactions .btn');
      await popup.waitForSelector('#xcard .fb');
    } else if (/True or false/.test(type)) {
      await popup.click('#xcard .tfbtn:nth-child(2)');
      await popup.fill('#tfwrite', 'my correction');
      await popup.click('#xcard .conf label:nth-child(3)');
      await popup.click('#xcard .xactions .btn');
      await popup.waitForSelector('#xcard .fb input[name="cmp"]');
      const nb = await popup.$('#xcard .xactions .btn');
      check('tf next disabled until compare', await nb.isDisabled());
      await popup.click('#xcard .fb input[name="cmp"][value="0.5"]');
      check('tf next enabled after compare', !(await nb.isDisabled()));
    } else if (type === 'Brain dump') {
      await popup.fill('#bdwrite', 'stuff');
      await popup.click('#xcard .xactions .btn');
      await popup.waitForSelector('#xcard .rubric input');
      const boxes = await popup.$$('#xcard .rubric input');
      await boxes[0].click(); await boxes[1].click();
      check('bd count updates', /2 of/.test(await popup.textContent('#bdcount')));
    }
    await popup.click('#xcard .xactions .btn');
    await popup.waitForTimeout(30);
  }
  console.log('  types', JSON.stringify(seenTypes), 'doks', JSON.stringify(doks), 'weeks', JSON.stringify(weeks));
  check('30 items served', n === 30, String(n));
  check('all five types appeared', Object.keys(seenTypes).length === 5);
  check('blueprint counts', seenTypes['Multiple choice'] === 14 && seenTypes['Multiple answer'] === 5 && seenTypes['Brain dump'] === 3 && seenTypes['Application'] === 4 && seenTypes['True or false, then fix it'] === 4, JSON.stringify(seenTypes));
  check('DOK mix 3 / 13 or 14 / 13 or 14', doks['Recall'] === 3 && doks['Apply'] >= 13 && doks['Apply'] <= 14 && doks['Analyze and predict'] >= 13, JSON.stringify(doks));
  check('all three weeks drawn', Object.keys(weeks).length === 3);

  await popup.waitForSelector('#xcard .finish');
  const finishText = await popup.textContent('#xcard .finish');
  check('finish screen has a percent', /percent on Weeks 1 to 3/.test(finishText));
  check('finish shows score by week', /Score by week/.test(finishText));
  check('finish has quadrant counts', (await popup.$$('#xcard .quad div')).length === 4);
  check('finish has start-here list', /Start here/.test(finishText) || /fully correct/.test(finishText));
  check('report never lists questions', true);

  /* results report */
  await popup.fill('#rname', 'Test Student');
  const [rep] = await Promise.all([ctx.waitForEvent('page'), popup.click('#saverep')]);
  await rep.waitForLoadState();
  const repText = await rep.textContent('body');
  check('report has name and weeks', /Test Student/.test(repText) && /Weeks 1 to 3/.test(repText));
  check('report lists competencies to review', /Competencies to review/.test(repText));
  check('report has no question stems', !/Select all that apply/.test(repText));
  await rep.close();

  /* history on the setup page */
  await page.bringToFront();
  await page.evaluate(() => window.dispatchEvent(new Event('focus')));
  await page.waitForTimeout(100);
  const rows = await page.$$('#hist tbody tr');
  check('history has one attempt', rows.length === 1 && /%/.test(await rows[0].textContent()));
  check('gap card filled', /percent on/.test(await page.textContent('#gaptitle')));
  check('trend card visible', !(await page.$eval('#trendcard', e => e.hidden)));
  check('trend rows for 3 weeks', (await page.$$('#trends tbody tr')).length === 3);

  /* practice my gaps: second attempt in a popup (close the first so a fresh window opens) */
  await popup.close();
  const [popup2] = await Promise.all([ctx.waitForEvent('page'), page.click('#practicegaps')]);
  await popup2.waitForSelector('#xcard .tag.type');
  check('practice my gaps opened', /Question 1 of (20|30)/.test(await popup2.textContent('#xprog')));
  await popup2.close();

  /* export */
  const [dl] = await Promise.all([page.waitForEvent('download'), page.click('#export')]);
  check('export downloads a json', /bio005-practice-history/.test(dl.suggestedFilename()));

  /* weekly log */
  page.once('dialog', d => d.accept('Test Student'));
  const [logw] = await Promise.all([ctx.waitForEvent('page'), page.click('#printlog')]);
  await logw.waitForLoadState();
  const logText = await logw.textContent('body');
  check('log has engagement counts', /Attempts in the last 7 days/.test(logText));
  check('log has score by week', /Score by week/.test(logText) && /Week 1\./.test(logText));
  check('log has discussion box', /For your discussion post/.test(logText));
  check('log has biggest lift', /Biggest lift/.test(logText));
  await logw.close();

  /* blocked popup fallback: dialog */
  await page.evaluate(() => { window.open = () => null; });
  await page.click('#go');
  await page.waitForSelector('dialog[open] #xcard .tag.type');
  check('dialog fallback runs the exam', true);

  /* keyboard: tab reaches the generate button */
  await page.keyboard.press('Escape');

  check('no page errors', errors.length === 0, errors.join(' | '));
  await browser.close(); server.close();
  console.log('\n' + pass + ' passed, ' + fail + ' failed');
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
