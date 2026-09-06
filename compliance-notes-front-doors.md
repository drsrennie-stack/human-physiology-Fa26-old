# Accessibility compliance notes, BIO 004 front door

| | |
|---|---|
| Project | BIO 004 Human Anatomy, Fall 2026, Solano Community College |
| Files | `home.html`, `canvas-start.html` |
| Built by | `build-bio4-front.py`, one source for both |
| Design | the `.cat` card system from this repo's `index.html`, unchanged |
| Date | August 31, 2026 |
| Standard | WCAG 2.2, AA required, AAA targeted |
| Reviewer | Dr. Sharilyn Rennie |

Generated from real browser runs: `a11y-report.js`, `level2-audit.js` and
`hard-audit.js`.

---

## 1. Result

| | Level one | Level two |
|---|---|---|
| axe violations, full tag set | **0** | **0** |
| axe checks passed | 35 | 35 |
| Targets under 44px | 0 | 0 |
| Horizontal scroll at 320px | none | none |
| Lowest text contrast | **7.46:1** | 7.46:1 |
| Color pairs below AAA | 0 | 0 |
| Icon tiles below 3:1 | 0 | 0 |
| Windows High Contrast | passes | passes |
| Text-only zoom to 200% | no scroll, nothing clipped | same |

Tags: `wcag2a`, `wcag2aa`, `wcag2aaa`, `wcag21a`, `wcag21aa`, `wcag22aa`,
`best-practice`.

---

## 2. Two defects this design brought with it

Both came from `index.html`, where they never mattered, because that is a
desktop page for one person. On a student front door they matter.

### 2a. The grid overflowed a 320px screen

`.cats` is `repeat(auto-fit, minmax(340px, 1fr))`. A column can never be
narrower than 340px, so on a 320px phone the row is wider than the screen and
the whole page scrolls sideways. That is **1.4.10 Reflow, Level AA**, and it
is the kind of failure that makes a page unusable rather than merely awkward.

Fixed to `minmax(min(100%, 340px), 1fr)`. Her 340 is kept everywhere it fits;
the column is allowed to shrink below it only when the screen is smaller.
Nothing changes above 340px.

**`index.html` still has this.** Worth the same one-line fix if students ever
see it.

### 2b. Body text at reduced opacity

An older copy of this card system set `.cat p { opacity: .86 }`, which puts
body text at 6.11:1 on rust and 5.99:1 on gold, under the 7:1 AAA needs. The
version in `index.html` has no opacity and is correct. There is none here.

---

## 3. Color contrast, measured on the rendered page

| Foreground | Background | Size / weight | Ratio | Size class | Level |
|---|---|---|---|---|---|
| `#0B1530` | `#C9A14A` | 24px / 800 | **7.46:1** | large | AAA |
| `#0B1530` | `#C9A14A` | 15px / 400 | **7.46:1** | normal | AAA |
| `#4E5464` | `#FFFFFF` | 13px / 600 | **7.56:1** | normal | AAA |
| `#8B3A2E` | `#FFFFFF` | 27px / 800 | **7.66:1** | large | AAA |
| `#8B3A2E` | `#FFFFFF` | 12px / 700 | **7.66:1** | normal | AAA |
| `#FFFFFF` | `#0B1530` | 14px / 700 | **18.04:1** | normal | AAA |
| `#0B1530` | `#FFFFFF` | 27px / 800 | **18.04:1** | large | AAA |
| `#0B1530` | `#FFFFFF` | 11.5px / 700 | **18.04:1** | normal | AAA |

Lowest anything on either page: **7.46:1**, ink on gold. Everything clears AAA
for normal text, not just for large.

### The icon tiles, composited

Each tile is a translucent wash over its card color, so its real color is not
a value anyone wrote down. `hard-audit.js` composites the alpha down and
measures the glyph against the result:

| Card | Card color | Tile, composited | Glyph | Body | Go line |
|---|---|---|---|---|---|
| Enter the course | `#C9A14A` | `#B29047` | 5.99:1 | 7.46:1 | 7.46:1 |
| Lab | `#0B1530` | `#373F55` | 10.48:1 | 18.04:1 | 18.04:1 |
| Lecture | `#8B3A2E` | `#A05D54` | 5.01:1 | 7.66:1 | 7.66:1 |
| Study | `#C9A14A` | `#B29047` | 5.99:1 | 7.46:1 | 7.46:1 |
| Syllabus and schedule | `#1F2D44` | `#475366` | 7.79:1 | 13.84:1 | 13.84:1 |

Every glyph clears the 3:1 in 1.4.11 with room, and the glyph color is never
hard-coded: `.cat .ic svg * { stroke: var(--fg) }` ties it to the card's own
text color, so it cannot drift if a card is recoloured.

---

## 4. Windows High Contrast

These cards carry `border:none` and say everything with a solid background. In
`forced-colors: active` the background is replaced, so all five would become
the color of the page and stop existing as objects. The shadow goes too, since
shadows are dropped, so the lift that separates them from the page goes with
it.

A `@media (forced-colors: active)` block gives every card a 2px `ButtonBorder`,
every icon tile a border, and every label `ButtonText`, with `Highlight` on
hover and focus. System colors only: a hex here is either ignored or honoured,
and honoured is worse, because it fights the scheme the reader chose.

Verified by rendering with forced colors on, at both levels. `hard-audit.js`
checks it on every run and fails the build if a card loses its border.

---

## 5. Keyboard and the two levels

- Tab 1 is the skip link, off screen until focused.
- Tab 2 at level one is the Enter card, a real `<button>` with `aria-expanded`
  and `aria-controls`.
- **Opening moves focus** to the level-two heading, which carries
  `tabindex="-1"` for it. Without that, a keyboard or screen reader user
  presses Enter and nothing seems to happen. Verified: focus lands on
  `doors-h`.
- **Back returns focus** to the Enter card. **Escape** goes back a level.
- No positive `tabindex`, nothing removed from the tab order, no trap.
- The whole card is the target, so nothing is under 44px.

---

## 6. With JavaScript off

Both panels render and all five cards have working `href`s. Verified with
scripting disabled. The script only hides level two and turns the first card
into a control.

---

## 7. Screen reader

- **Landmarks**: one `banner`, one `main`, one `contentinfo`.
- **Headings**: one `h1` (the course lockup), `h2` per panel, `h3` per card.
  Correct nesting on both levels and with scripting off.
- **Accessible names**: every card announces its name, its line of
  description, and where it goes.
- **Decoration hidden**: the lockup, every icon, and every arrow are
  `aria-hidden`, so a card is announced once.
- **State announced**: `aria-expanded` on the Enter card.

**A human pass has not been run.** Ten minutes with NVDA and Firefox, or
VoiceOver and Safari: open the door, confirm the new heading is announced, tab
the four, confirm Back returns you.

---

## 8. The Canvas frame

Height is **1490px, measured across both levels** by `node canvas-height.js` at
eleven widths: 1485px at 320px on level two, against 553px for level one on a
laptop.

The embed copy runs a tighter version of the same design (smaller hero, cards
without their 214px floor, grid two-up sooner) purely to close that gap. At
full size it wanted 1915px on a phone. Nothing is removed; it is the same five
cards.

It also centers itself in the frame with `safe` centering, so spare height is
even padding rather than a gap, and a narrow device is top-aligned rather than
pushed off the top. Verified at 320, 390, 560, 900 and 1200px on both levels:
no scrollbar inside the frame.

Every link there opens in a new tab, `target="_blank"` with `rel="noopener"`,
for the reasons documented in `canvas-enter.html`. `home.html` uses
`target="_top"`.

---

## 9. Known limitations

1. **No human screen reader pass yet.** Section 7 has the script.
2. **The reveal is a reveal.** Enter the course is a disclosure button, not a
   link, so a student interacts once before any course link is on screen. It is
   implemented properly and passes, but if that is not wanted, drop the panel
   swap and show the four cards on load.
3. **`index.html` still overflows at 320px.** Section 2a. Same one-line fix.
4. **These two pages only.** `a11y-report.js` audits others, but it does not
   check High Contrast, composited icon tiles, or level two. Use
   `hard-audit.js` and `level2-audit.js` for those.
5. **Three sections, in person.** The syllabus card routes by section. The
   online course is BIO 005 physiology, a different site.

---

Dr. Sharilyn Rennie
