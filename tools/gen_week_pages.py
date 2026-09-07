#!/usr/bin/env python3
"""
Generate the per-week competency and notes pages for weeks 2 to 15.

Source of truth is bio005-competencies.js (the Sep 5 week map) and
bio005-schedule-fall2026.js. Week 1 is hand built and is never touched.

Both page types are real pages, not lorem: the competency list is the
live one, so the page is useful the day it ships. What is deliberately
marked as still to come is the teaching prose and the two brain dump
prompts per competency, which Scrubs writes per week.
"""
import json, re, os, html

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def first_array(s):
    i = s.find('['); d = 0
    for j in range(i, len(s)):
        if s[j] == '[': d += 1
        elif s[j] == ']':
            d -= 1
            if d == 0: return json.loads(s[i:j+1])
    raise ValueError('no array')

comps = first_array(open(os.path.join(ROOT,'bio005-competencies.js'), encoding='utf-8').read())
by_week = {}
for c in comps:
    by_week.setdefault(int(c['week']), []).append(c)

sch = open(os.path.join(ROOT,'bio005-schedule-fall2026.js'), encoding='utf-8').read()
WK = {}
for m in re.finditer(r'\{[^{}]*wk:(\d+)[^{}]*\}', sch, re.S):
    b = m.group(0); n = int(m.group(1))
    g = lambda p, d='': (re.search(p, b).group(1) if re.search(p, b) else d)
    WK[n] = {'title': g(r'title:"([^"]*)"'), 'module': g(r'module:(\d+)', '1'),
             'opens': g(r"opens:'([^']*)'"), 'closes': g(r"closes:'([^']*)'")}

PART = {'1': 'Foundations', '2': 'Control Systems', '3': 'Systems in Action'}
MONTH = ['January','February','March','April','May','June','July',
         'August','September','October','November','December']

def longdate(iso):
    y, m, d = iso.split('-')
    return '%s %d' % (MONTH[int(m)-1], int(d))

def esc(t):
    return html.escape(t, quote=False)

JUMPS = [('N','j-note','note-sheet.html?week=','note sheet'),
         ('P','j-prob','assignment-bookproblems.html?week=','problems'),
         ('L','j-lab','assignment-physioex.html?week=','lab'),
         ('D','j-disc','assignment-discussion.html?week=','discussion'),
         ('S','j-study','mastery-physio-os-standalone.html?week=','study session')]

def chrome(n):
    lis = ''.join(
        '\n    <li><a class="%s" href="%s%d" target="_top" title="Week %d %s">%s'
        '<span class="mm-vh">Week %d %s</span></a></li>'
        % (cls, url, n, n, name, ltr, n, name) for ltr, cls, url, name in JUMPS)
    return '''<div class="mm-brandbar"><div class="mm-wrap">
  <a class="mm-mark" href="course-start.html" target="_top">
    <svg viewBox="40 10 125 148" width="22" height="26" role="img" aria-label="BIO 005 Human Physiology, course home">
      <g transform="translate(0,18)">
        <g transform="translate(60,0) rotate(8 0 130)"><circle cx="0" cy="20" r="10" fill="#0B1530"/><path d="M 0,32 C -10,32 -16,36 -16,42 C -16,55 -13,68 -11,82 C -10,100 -12,118 -14,130 L 14,130 C 12,118 10,100 11,82 C 13,68 16,55 16,42 C 16,36 10,32 0,32 Z" fill="#0B1530"/></g>
        <g transform="translate(100,0)"><circle cx="0" cy="10" r="11" fill="#8B3A2E"/><path d="M 0,22 C -11,22 -17,26 -17,34 C -17,52 -14,70 -12,86 C -11,108 -13,122 -15,132 L 15,132 C 13,122 11,108 12,86 C 14,70 17,52 17,34 C 17,26 11,22 0,22 Z" fill="#8B3A2E"/></g>
        <g transform="translate(140,0) rotate(-8 0 130)"><circle cx="0" cy="20" r="10" fill="#C9A14A"/><path d="M 0,32 C -10,32 -16,36 -16,42 C -16,55 -13,68 -11,82 C -10,100 -12,118 -14,130 L 14,130 C 12,118 10,100 11,82 C 13,68 16,55 16,42 C 16,36 10,32 0,32 Z" fill="#C9A14A"/></g>
      </g>
    </svg>
    <span><span class="mm-wm">BIO <b>005</b></span><span class="mm-wmsub">Human Physiology</span></span>
  </a>
  <span class="mm-course">BIO 005 &middot; Fall 2026</span>
</div></div>

<div class="mm-jumpwrap">
  <span class="lbl">This week</span>
  <ul class="mm-jump" aria-label="Week %d assignments">%s
  </ul>
</div>
''' % (n, lis)

FOOT = '''<footer class="mm-foot"><div class="mm-wrap">
  <nav class="mm-flinks" aria-label="Course links">
    <a href="course-start.html" target="_top">Course home</a><span class="mm-dot" aria-hidden="true">&middot;</span>
    <a href="course-schedule.html" target="_top">Schedule</a><span class="mm-dot" aria-hidden="true">&middot;</span>
    <a href="syllabus-fall2026.html" target="_top">Syllabus</a><span class="mm-dot" aria-hidden="true">&middot;</span>
    <a href="course-questions.html" target="_top">Answered questions</a><span class="mm-dot" aria-hidden="true">&middot;</span>
    <a href="accessibility.html" target="_top">Accessibility</a><span class="mm-dot" aria-hidden="true">&middot;</span>
    <a href="https://yccd.instructure.com/courses/42616" target="_blank" rel="noopener">Canvas</a>
  </nav>
  <p class="mm-fleg">BIO 005 Human Physiology &middot; Fall 2026 &middot; Dr. Sharilyn Rennie<br>
     If a page does not work for you, tell me in the Virtual Office and I will fix it.</p>
</div></footer>
'''

HEIGHT = '''<script>
(function(){var id=document.title.replace(/\\W+/g,'-').toLowerCase();
function post(){try{parent.postMessage({frame:id,height:document.documentElement.scrollHeight},'*');}catch(e){}}
if('ResizeObserver' in window){new ResizeObserver(post).observe(document.documentElement);}
window.addEventListener('load',post);window.addEventListener('resize',post);post();})();
</script>'''

STYLE = '''<style>
/* Page-specific rules only. Palette and the shared chrome live in
   assets/brand.css and assets/brandbar.css. The fallback tokens below
   let the page render on its own if brand.css is not beside it. */
:root{
  --navy:#0B1530; --navy-deep:#060A18; --navy-tint:#ECEFF4;
  --gold:#C9A14A; --gold-ink:#060A18; --gold-deep:#8A6D33;
  --maroon:#8B3A2E; --maroon-dark:#6E2D24;
  --offwhite:#FAFAF9; --bone:#F5F1E8; --ink-soft:#414B5C;
  --line:rgba(11,21,48,0.16);
  --display:'Open Sans',system-ui,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;
  --body:'Plus Jakarta Sans',system-ui,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;
}
*,*::before,*::after{box-sizing:border-box}
html,body{margin:0}
body{font-family:var(--body);background:var(--offwhite);color:var(--navy);
  font-size:16px;line-height:1.65;-webkit-font-smoothing:antialiased}
h1,h2,h3{font-family:var(--display);font-weight:800;letter-spacing:-.022em;margin:0}
em,i,cite,dfn{font-style:normal;color:var(--maroon)}
p{margin:0 0 14px;max-width:68ch}
a{color:var(--maroon);text-underline-offset:3px}
a:hover{color:var(--maroon-dark)}
:focus-visible{outline:3px solid var(--maroon);outline-offset:3px;border-radius:3px}
.wrap{max-width:1000px;margin:0 auto;padding:0 20px}
.skip{position:absolute;left:-9999px;top:0;z-index:90;background:var(--navy);color:#fff;
  padding:12px 18px;font-weight:700;text-decoration:none}
.skip:focus{left:0;top:0}
header.top{background:var(--navy-deep);color:#fff;padding:34px 0 30px;margin-top:16px}
header.top .eyebrow{font-size:11px;font-weight:700;letter-spacing:.26em;text-transform:uppercase;
  color:var(--gold);margin:0 0 10px}
header.top h1{font-size:clamp(26px,4.4vw,38px);line-height:1.14;color:#fff;max-width:22ch}
header.top p{margin:12px 0 0;color:var(--bone);max-width:62ch;font-size:15.5px}
main{padding:30px 0 10px}
section{margin:0 0 30px}
h2{font-size:clamp(20px,3vw,25px);color:var(--maroon-dark);margin:0 0 10px}
.card{background:#fff;border:0;border-radius:12px;padding:20px 22px;margin:0 0 14px;
  box-shadow:0 1px 3px rgba(11,21,48,.08);transition:transform 200ms ease,box-shadow 200ms ease}
.card:hover{transform:translateY(-2px);box-shadow:0 8px 16px rgba(11,21,48,.10)}
.card h3{font-size:16.5px;margin:0 0 6px}
.card .num{font-size:10.5px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;
  color:var(--maroon);margin:0 0 6px}
.card p{margin:0;max-width:64ch}
.pending{display:inline-block;font-size:10.5px;font-weight:700;letter-spacing:.16em;
  text-transform:uppercase;color:var(--navy);background:var(--navy-tint);
  border-radius:99px;padding:5px 12px;margin-top:12px}
.notice{background:#fff;border:0;border-radius:12px;padding:20px 22px;margin:0 0 24px;
  box-shadow:0 1px 3px rgba(11,21,48,.08)}
.notice .t{font-size:10.5px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;
  color:var(--maroon);margin:0 0 8px}
ol.plain{margin:0;padding-left:22px}
ol.plain li{margin:0 0 10px;max-width:66ch}
@media (prefers-reduced-motion:reduce){*{transition:none!important}.card:hover{transform:none}}
@media print{
  .skip,.mm-brandbar,.mm-jumpwrap,.mm-foot{display:none}
  body{background:#fff;font-size:10pt}
  header.top{background:#fff;color:#000;padding:0 0 10pt}
  header.top h1,header.top p,header.top .eyebrow{color:#000}
  .card,.notice{box-shadow:none;border-top:1px solid #000;border-radius:0;padding:8pt 0;
    break-inside:avoid;page-break-inside:avoid}
  h1,h2,h3{break-after:avoid;page-break-after:avoid}
  a{color:#000;text-decoration:none}
}
</style>'''


def page(title, n, eyebrow, h1, lede, body):
    w = WK[n]
    return '''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>%s</title>
<link rel="icon" type="image/svg+xml" href="icon.svg">
<link rel="stylesheet" href="assets/fonts-site.css">
<link rel="stylesheet" href="assets/brandbar.css">
%s
</head>
<body>
<a class="skip" href="#main">Skip to main content</a>
%s
<header class="top"><div class="wrap">
  <p class="eyebrow">%s</p>
  <h1>%s</h1>
  <p>%s</p>
</div></header>

<main id="main"><div class="wrap">
%s
</div></main>

%s
%s
</body>
</html>
''' % (esc(title), STYLE, chrome(n), esc(eyebrow), esc(h1), esc(lede), body, FOOT, HEIGHT)


def competencies_page(n):
    w = WK[n]; items = by_week.get(n, [])
    part = PART.get(w['module'], 'Foundations')
    cards = []
    for i, c in enumerate(items, 1):
        cards.append('''  <div class="card">
    <p class="num">%d of %d</p>
    <h3>%s</h3>
    <p>%s</p>
  </div>''' % (i, len(items), esc(c['name']), esc(c['can'])))
    body = '''<section>
  <div class="notice">
    <p class="t">What is here, and what is coming</p>
    <p>Every competency for this week is listed below, in full, and this list is final. What is not here yet are the two brain dump prompts under each one. Those post when the week opens. Until then you can still build your note sheet from this list: one box per competency, one page each.</p>
  </div>
  <h2>The %d competencies for Week %d</h2>
  <p>Each one is a single thing you will be able to do by Sunday. Print your sheet from the note sheet page and give each competency its own box.</p>
%s
</section>''' % (len(items), n, '\n'.join(cards))
    return page('Week %d competencies · BIO 005 Human Physiology' % n, n,
                'BIO 005 · Week %d · %s' % (n, part),
                'Everything Week %d asks you to be able to do.' % n,
                '%s. %d competencies, each one a single thing you will be able to do by Sunday, %s.'
                % (w['title'], len(items), longdate(w['closes'])),
                body)


def notes_page(n):
    w = WK[n]; items = by_week.get(n, [])
    part = PART.get(w['module'], 'Foundations')
    lis = '\n'.join('    <li><b>%s.</b> %s</li>' % (esc(c['name']), esc(c['can'])) for c in items)
    body = '''<section>
  <div class="notice">
    <p class="t">Being written</p>
    <p>The written notes for this week are still being drafted. They post when the week opens on %s. In the meantime the outline below is real: it is the week's competency list, in teaching order, and it is what the notes will be built around. Your reading in Silverthorn covers the same ground now.</p>
  </div>
  <h2>What this week covers</h2>
  <p>%s. Work through these in order. Each line is one thing you will be able to do by Sunday.</p>
  <ol class="plain">
%s
  </ol>
</section>

<section>
  <h2>What to do while the notes are being written</h2>
  <ol class="plain">
    <li>Print your note sheet and do the first pass from the textbook and your own notes, in your first color. That pass does not need my notes to be useful.</li>
    <li>Run this week's recall cards in the Mastery OS. They are already built for all fifteen weeks.</li>
    <li>Bring whatever will not come together to the Virtual Office. Questions asked while I am writing a week often change what I write.</li>
  </ol>
</section>''' % (longdate(w['opens']), esc(w['title']), lis)
    return page('Week %d notes · BIO 005 Human Physiology' % n, n,
                'BIO 005 · Week %d · %s' % (n, part),
                esc(w['title']),
                'The written notes for this week. Outline is final, the teaching prose posts when the week opens.',
                body)


def main():
    made = []
    for n in range(2, 16):
        for fn, gen in (('week-%02d-competencies.html' % n, competencies_page),
                        ('week-%02d-notes.html' % n, notes_page)):
            p = os.path.join(ROOT, fn)
            open(p, 'w', encoding='utf-8').write(gen(n))
            made.append(fn)
    print('generated %d pages' % len(made))
    for f in made: print('  ', f)

if __name__ == '__main__':
    main()
