/* Validate one authored exam item file: node tools/validate_exam_items.js cards/exam/week-03.json */
const fs = require('fs');
global.window = {};
require('../bio005-competencies.js');
const COMP = {};
window.BIO005_COMPETENCIES.forEach(c => COMP[c.id] = c);

const file = process.argv[2];
const items = JSON.parse(fs.readFileSync(file, 'utf8'));
const errs = [];
const ids = new Set();
const bad = /[—–]|<[a-z]|\*\*|_[a-z]/i;   // em dash, en dash, html, markdown
function txt(v, where) {
  if (typeof v !== 'string' || !v.trim()) errs.push(where + ': empty text');
  else if (bad.test(v)) errs.push(where + ': em dash, en dash, HTML or markdown found: ' + v.slice(0, 80));
}
const counts = {};
items.forEach((it, i) => {
  const w = 'item ' + i + ' (' + (it.id || '?') + ')';
  if (!it.id) errs.push(w + ': missing id');
  if (ids.has(it.id)) errs.push(w + ': duplicate id'); ids.add(it.id);
  if (!COMP[it.competencyId]) errs.push(w + ': unknown competencyId ' + it.competencyId);
  if (![1, 2, 3].includes(it.dok)) errs.push(w + ': dok must be 1, 2 or 3');
  counts[it.type] = (counts[it.type] || 0) + 1;
  switch (it.type) {
    case 'ma':
      txt(it.stem, w + ' stem');
      if (!Array.isArray(it.options) || it.options.length < 4 || it.options.length > 6) errs.push(w + ': ma needs 4 to 6 options');
      else it.options.forEach((o, k) => txt(o, w + ' option ' + k));
      if (!Array.isArray(it.correct) || it.correct.length < 2 || it.correct.length >= (it.options || []).length) errs.push(w + ': ma correct must list 2 or more indices and not all options');
      else it.correct.forEach(k => { if (!Number.isInteger(k) || k < 0 || k >= it.options.length) errs.push(w + ': ma correct index out of range'); });
      txt(it.why, w + ' why');
      if (!Array.isArray(it.whyNot) || it.whyNot.length !== (it.options || []).length) errs.push(w + ': ma whyNot must have one entry per option');
      else it.whyNot.forEach((o, k) => txt(o, w + ' whyNot ' + k));
      break;
    case 'tf':
      txt(it.statement, w + ' statement');
      if (typeof it.truth !== 'boolean') errs.push(w + ': tf truth must be true or false');
      txt(it.correction, w + ' correction');
      txt(it.why, w + ' why');
      if (it.dok === 3) errs.push(w + ': tf items are DOK 1 or 2');
      break;
    case 'bd':
      txt(it.prompt, w + ' prompt');
      if (!Array.isArray(it.rubric) || it.rubric.length < 4 || it.rubric.length > 7) errs.push(w + ': bd rubric needs 4 to 7 lines');
      else it.rubric.forEach((o, k) => txt(o, w + ' rubric ' + k));
      if (it.dok !== 3) errs.push(w + ': bd items are DOK 3');
      break;
    case 'app':
      txt(it.case, w + ' case'); txt(it.stem, w + ' stem');
      if (!Array.isArray(it.options) || it.options.length !== 4) errs.push(w + ': app needs exactly 4 options');
      else it.options.forEach((o, k) => txt(o, w + ' option ' + k));
      if (!Number.isInteger(it.correct) || it.correct < 0 || it.correct > 3) errs.push(w + ': app correct must be 0 to 3');
      txt(it.why, w + ' why');
      if (!Array.isArray(it.whyNot) || it.whyNot.length !== 4) errs.push(w + ': app whyNot must have 4 entries');
      else it.whyNot.forEach((o, k) => txt(o, w + ' whyNot ' + k));
      if (it.dok !== 3) errs.push(w + ': app items are DOK 3');
      break;
    default:
      errs.push(w + ': unknown type ' + it.type);
  }
});
console.log(file + ': ' + items.length + ' items', JSON.stringify(counts));
if (errs.length) { console.log(errs.join('\n')); process.exit(1); }
console.log('OK');
