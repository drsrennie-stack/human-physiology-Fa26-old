/*
 * The checks a11y-report.js does NOT do.
 *
 *   node hard-audit.js
 *
 * A page can pass axe, pass contrast, pass reflow, and still fail a real
 * person. These are the ones that bite here: Windows High Contrast, text-only
 * zoom, and the icon tiles, whose background is a translucent wash over a
 * card color and so is not the color anyone wrote down.
 */
const { chromium } = require('playwright');
const path = require('path');

function lum(rgb) {
  const n = rgb.map(c => c / 255).map(c => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  return 0.2126 * n[0] + 0.7152 * n[1] + 0.0722 * n[2];
}
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
const parse = s => s.match(/[\d.]+/g).map(Number);
/* The icon tile is rgba over the card, and the card sits on the page. Alpha
   has to be composited down the stack or the number is fiction. */
function over(fg, bg) {
  const a = fg.length > 3 ? fg[3] : 1;
  return [0, 1, 2].map(i => Math.round(fg[i] * a + bg[i] * (1 - a)));
}
const hex = c => '#' + c.slice(0, 3).map(v => v.toString(16).padStart(2, '0')).join('').toUpperCase();

(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const f = 'bio4/home.html';
  let bad = 0;

  console.log('1. ICON TILES, glyph stroke on the composited tile (1.4.11 wants 3:1)');
  const gp = await (await b.newContext({ viewport: { width: 1200, height: 900 } })).newPage();
  await gp.goto('file://' + path.resolve(f));
  await gp.waitForTimeout(300);
  await gp.click('#enter');
  await gp.waitForTimeout(250);
  const tiles = await gp.evaluate(() => [...document.querySelectorAll('.cat')].map(c => ({
    name: (c.querySelector('h3') || {}).textContent || 'Enter',
    card: getComputedStyle(c).backgroundColor,
    tile: getComputedStyle(c.querySelector('.ic')).backgroundColor,
    stroke: getComputedStyle(c.querySelector('.ic svg path, .ic svg rect')).stroke,
    body: getComputedStyle(c.querySelector('p')).color,
    go: getComputedStyle(c.querySelector('.go')).color,
  })));
  for (const t of tiles) {
    const card = parse(t.card), tile = over(parse(t.tile), card), stroke = parse(t.stroke);
    const r = ratio(stroke, tile);
    const bodyR = ratio(parse(t.body), card), goR = ratio(parse(t.go), card);
    const fail = r < 3 || bodyR < 7 || goR < 4.5;
    if (fail) bad++;
    console.log(`   ${t.name.padEnd(23)} card ${hex(card)}  tile ${hex(tile)}  ` +
      `glyph ${r.toFixed(2)}:1  body ${bodyR.toFixed(2)}:1  go ${goR.toFixed(2)}:1  ${fail ? 'FAIL' : 'ok'}`);
  }

  console.log('\n2. FORCED COLORS (Windows High Contrast)');
  const fc = await (await b.newContext({ forcedColors: 'active', viewport: { width: 1200, height: 900 } })).newPage();
  await fc.goto('file://' + path.resolve(f));
  await fc.waitForTimeout(300);
  await fc.click('#enter');
  await fc.waitForTimeout(300);
  const hc = await fc.evaluate(() => {
    const c = document.querySelector('.cat'), i = c.querySelector('.ic');
    const cs = getComputedStyle(c);
    return { border: cs.borderTopWidth + ' ' + cs.borderTopStyle,
             iconBorder: getComputedStyle(i).borderTopWidth,
             distinct: cs.backgroundColor !== getComputedStyle(document.body).backgroundColor };
  });
  const hcFail = hc.border.startsWith('0px') || hc.iconBorder === '0px';
  if (hcFail) bad++;
  console.log(`   card border "${hc.border}", icon tile border ${hc.iconBorder}  ${hcFail ? 'FAIL: cards lose their edges' : 'ok'}`);
  await fc.screenshot({ path: 'hc-level2.png', fullPage: true });

  console.log('\n3. TEXT-ONLY ZOOM to 200% (1.4.4 Resize Text)');
  const tz = await (await b.newContext({ viewport: { width: 1000, height: 900 } })).newPage();
  await tz.goto('file://' + path.resolve(f));
  await tz.addStyleTag({ content: 'html{font-size:200%}' });
  await tz.click('#enter');
  await tz.waitForTimeout(400);
  const z = await tz.evaluate(() => ({
    o: document.documentElement.scrollWidth > innerWidth + 1,
    clipped: [...document.querySelectorAll('.cat h2,.cat p,.cat .go,.ph,.lead')]
      .filter(e => e.scrollHeight > e.clientHeight + 2 || e.scrollWidth > e.clientWidth + 2).length,
  }));
  if (z.o || z.clipped) bad++;
  console.log(`   horizontal scroll ${z.o}, clipped text nodes ${z.clipped}  ${z.o || z.clipped ? 'FAIL' : 'ok'}`);

  console.log(bad ? `\n${bad} FAILURE(S)` : '\nall clear');
  await b.close();
  process.exit(bad ? 1 : 0);
})();
