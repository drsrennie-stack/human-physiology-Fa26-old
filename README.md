# BIO 004 front door, in your card system

Drop `home.html`, `canvas-start.html` and `compliance-notes-front-doors.md`
into the root of `new-build-bio4-solano`.

## The design is yours

Not a new one. It is the `.cat` cards from this repo's own `index.html`, value
for value: radius 18, padding 28 by 26, min-height 214, the 54px translucent
icon tile, the 24px title, the uppercase go line, and the lift.

```
rest    0 14px 30px rgba(11,21,48,.18)
hover   translateY(-6px), 0 26px 50px rgba(11,21,48,.28)
```

Colors are yours too: `#0B1530` ink, `#8B3A2E` rust, `#C9A14A` gold,
`#1F2D44` slate, on white.

## One door, then four

Level one is one gold card. Opening it swaps to the four.

| Card | Color | Goes to |
|---|---|---|
| Lab | ink | `lab-sprints.html` |
| Lecture | rust | `course-materials.html` |
| Study | gold | `mastery-os-fall-2026.html` |
| Syllabus and schedule | slate | the student's own section syllabus |

`welcome.html` is the quiet pill under the deck.

## Two things your card system had wrong, that mattered here

**The grid overflowed a 320px phone.** `.cats` is
`repeat(auto-fit, minmax(340px, 1fr))`, and a column that can never be narrower
than 340px makes the whole page scroll sideways on a 320px screen. That is
1.4.10 Reflow at Level AA. Fixed here with `minmax(min(100%, 340px), 1fr)`,
which keeps your 340 everywhere it fits. **`index.html` still has this**, worth
the same one-line fix if students ever land there.

**Windows High Contrast erased the cards.** These carry `border:none` and say
everything with a solid background. In forced-colors mode backgrounds are
replaced and shadows dropped, so all five cards become the page and vanish as
objects. A `forced-colors` block using system colors gives every card and icon
tile a real border. Checked on every run by `hard-audit.js`.

## Numbers

Lowest text contrast anywhere on either page: **7.46:1**. Every pair clears AAA
for normal text, not just large. Every icon glyph clears 3:1 against its tile
composited over its card. Every target 44px. No sideways scroll at 320px or at
400 percent zoom. 0 axe violations on both levels at the full tag set.

## The Canvas snippet

```html
<p><iframe src="https://drsrennie-stack.github.io/new-build-bio4-solano/canvas-start.html?sec=mw"
  width="100%" height="1490" style="border:0;width:100%"
  title="BIO 004 Human Anatomy"></iframe></p>
```

`sec=` is `mw`, `tr-am` or `tr-eve`. Bake it in. 1490 is measured across both
levels at eleven widths. The embed runs a tighter version of the same cards so
one frame height suits a phone and a laptop; at full size it wanted 1915.

## Rebuilding and checking

```
python3 build-bio4-front.py
node canvas-height.js                             # re-measure, then rebuild
node a11y-report.js home.html canvas-start.html   # level one
node level2-audit.js home.html canvas-start.html  # behind the door
node hard-audit.js                                # High Contrast, zoom, icon tiles
```

Dr. Sharilyn Rennie
