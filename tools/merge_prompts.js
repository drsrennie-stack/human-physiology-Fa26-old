/* ============================================================
   tools/merge_prompts.js

   Merges hand-written A/B prompts from tools/prompts/weekNN.json into
   assets/bio005-sheet-data.js, matching on competency NAME so a prompt
   can never land on the wrong competency because an index shifted.

   Run: node tools/merge_prompts.js [weekNumber ...]
   With no arguments it merges every weekNN.json it finds.
   ============================================================ */
const fs = require('fs'), path = require('path');
const ROOT = process.cwd();
global.window = {};
require(path.join(ROOT, 'assets/bio005-sheet-data.js'));
const S = window.BIO005_SHEET;

const dir = path.join(ROOT, 'tools/prompts');
let weeks = process.argv.slice(2);
if (!weeks.length) {
  weeks = fs.readdirSync(dir).filter(f => /^week\d\d\.json$/.test(f))
            .map(f => String(parseInt(f.slice(4, 6), 10)));
}

let merged = 0, missed = [];
weeks.forEach(w => {
  const file = path.join(dir, 'week' + String(w).padStart(2, '0') + '.json');
  if (!fs.existsSync(file)) { console.log('no file for week ' + w); return; }
  const P = JSON.parse(fs.readFileSync(file, 'utf8'));
  const items = (S[String(w)] || {}).items || [];
  const names = items.map(i => i.name);
  Object.keys(P).forEach(name => {
    const it = items.find(i => i.name === name);
    if (!it) { missed.push('week ' + w + ': prompt for "' + name + '" matches no competency'); return; }
    it.a = P[name].a; it.b = P[name].b; merged++;
  });
  names.forEach(n => { if (!P[n] && !(items.find(i => i.name === n).a || '').trim())
    missed.push('week ' + w + ': competency "' + n + '" still has no prompt'); });
});

const banner = fs.readFileSync(path.join(ROOT, 'assets/bio005-sheet-data.js'), 'utf8')
                 .split('window.BIO005_SHEET')[0];
fs.writeFileSync(path.join(ROOT, 'assets/bio005-sheet-data.js'),
  banner + 'window.BIO005_SHEET = ' + JSON.stringify(S, null, 1) + ';\n');

console.log('merged ' + merged + ' competencies');
if (missed.length) { console.log('OUTSTANDING:'); missed.forEach(m => console.log('  ' + m)); }
