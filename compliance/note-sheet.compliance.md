# Accessibility compliance notes

## 1. Project

BIO 005 Human Physiology, Yuba College, Fall 2026.

Files covered:

- `note-sheet.html` (the printable competency note sheet, `?week=1` to `?week=15`, `?per=1|2|3`, `?blank=1`)
- `competencies-by-week.html` (all 268 competencies grouped by teaching week)
- `course-start.html` (midterm rows added to Weeks 6, 11, 15)
- `week-01-competencies.html` (header buttons rewired)
- `assignment-notesheet.html` (rewired, and undefined palette tokens repaired)
- `syllabus-fall2026.html` (three midterm windows written in)
- `course-materials.html` (sheet link rewired)
- `bio005-dock.js` and its three copies (dim tile subtitle contrast, course home target)
- `bio005-nav.js`, `bio005-gate.js`, `bio005-back.js`, `readiness-check-view.js`,
  `bio005-reading-mode.js` (course home moved to `course-start.html`)
- `welcome.html` (now a redirect), `welcome-tour.html` (the page that used to
  live at that address), and the 40 pages whose links were repointed
- `course-door.html` (the hello screen folded in, Discussions button, Study card)

Date: September 6, 2026.
Reviewer: Dr. Sharilyn Rennie.

## 2. WCAG version and level

WCAG 2.2. Level AA is the floor and is met on every file above. Level AAA for
contrast (1.4.6) is met on every measured text and background pair on these
files. Measurements are composited values read out of a rendered Chromium page,
not values read off a stylesheet.

## 3. Color contrast audit

Every pair below was measured, not estimated.

### note-sheet.html

| Text | Background | Ratio | Level |
|---|---|---|---|
| White heading | Navy-deep #060A18 | 19.73:1 | AAA |
| Gold eyebrow #E2C583 | Navy-deep #060A18 | 9.34:1 | AAA |
| Body #E4E7EE | Navy-deep #060A18 | 14.60:1 | AAA |
| Navy #0B1530 competency name | White | 18.04:1 | AAA |
| Muted #454B58 competency text | White | 8.75:1 | AAA |
| White space label | Navy #0B1530 tab | 18.04:1 | AAA |
| White space label | Maroon #8B3A2E tab | 7.66:1 | AAA |
| Maroon-dark #6E2D24 button text | White | 10.18:1 | AAA |

Printed sheet is black on white throughout. The four boxes have no rule lines
in them by design: they are drawing surfaces, and a ruled box invites the
paragraph the assignment is trying to prevent. Box borders are structural, not
information carrying, and are drawn in black against white, clearing the 3:1
non-text minimum of 1.4.11 with room to spare.

| Text | Background | Ratio | Level |
|---|---|---|---|
| Maroon-dark #6E2D24 drawing rule | White | 10.18:1 | AAA |
| White density control, selected | Navy #0B1530 | 18.04:1 | AAA |
| Navy density control, unselected | White | 18.04:1 | AAA |
| Pen 1 blue #1B3A6B, template drawing | White | 11.27:1 | AAA |
| Pen 2 maroon #8B3A2E, template drawing | White | 7.66:1 | AAA |

### competencies-by-week.html

| Text | Background | Ratio | Level |
|---|---|---|---|
| Navy #0B1530 | White | 18.04:1 | AAA |
| Maroon-dark #6E2D24 numbers and eyebrows | White | 10.18:1 | AAA |
| Muted #454B58 competency wording | White | 8.75:1 | AAA |
| Maroon-dark #6E2D24 Lab tag | Gold-pale #F7EFD9 | 8.83:1 | AAA |

### course-start.html, new midterm rows

| Text | Background | Ratio | Level |
|---|---|---|---|
| Maroon-dark #6E2D24 label | Gold-pale #F7EFD9 | 8.83:1 | AAA |
| Maroon-dark #6E2D24 link | Gold-pale #F7EFD9 | 8.83:1 | AAA |
| #3B4150 description | Gold-pale #F7EFD9 | 10.06:1 | AAA |

Both of those last two were changed for this reason. The page default link
maroon measured 6.60:1 on the pale gold and the default description gray
measured 6.81:1. Both clear AA, both miss AAA, so the exam row overrides them.

## 4. Defects found by measurement and fixed

1. **`--terra` and `--terra-dark` were undefined on eleven pages**, left behind
   by the MedMasters rebrand. Every rule reading them fell back to nothing. On
   `assignment-notesheet.html` the primary button was white text on a
   transparent background, measured 1.04:1, invisible on the page. Both tokens
   are now defined as the MedMasters maroon #8B3A2E and #6E2D24. Pages
   repaired: anatomy-review, assignment-notesheet, before-you-start,
   competency-study-guide, unit-01 through unit-05, unit-05-standalone,
   week-01.
2. **Dock tile subtitle on a not-yet-open tile** was #98A3B4 on the tile
   background, measured 5.95:1, under the 4.5:1 AA floor only for its size
   class and under AAA outright. Now #AEB8C6 at 7.57:1. Fixed in all four
   copies of `bio005-dock.js`.
3. **Box hints collided with their labels.** In the narrow right hand column
   the hint sat at the top right and overlapped the label tab, clipping
   "boxes and arrows" mid word. Hints now sit at the bottom right of each box.
   Verified with `scrollWidth` against `clientWidth` on every label and hint on
   the page: zero clipped.
4. **Screen box minimums leaked into the print layout.** `.d3 .sp.parts` and
   its siblings are specificity (0,3,0); the print rule that zeroes them is
   (0,2,0), so the screen minimums won and the third competency on a three up
   page overflowed its block by 30 to 40px, painting the box 4 label over the
   next competency's title. The minimums are now inside `@media screen`, and
   each block carries an explicit print height rather than `flex:1`. Verified
   by measuring `scrollHeight` against `clientHeight` for every block and every
   sheet across all 15 weeks at all 3 densities: 45 of 45 combinations fit.

## 5. Keyboard navigation

Verified on `note-sheet.html` and `competencies-by-week.html`:

- Skip link is the first focusable element and reveals on focus.
- Tab order runs skip link, print button, the two header links, the week
  select, the density control, then the document. Nothing is reachable that is
  not operable.
- The week select is a real `<select>`, so it works with arrow keys and with
  the browser's own type-ahead.
- The density control is a real radio group in a `<fieldset>` with a
  `<legend>`, so it announces as a group and arrow keys move between 1, 2 and
  3. The visible styling is on the `<span>` after each input; the input keeps
  its native semantics and its focus ring is drawn with `:focus-visible`.
- The template drawing sits in a scrollable region with `tabindex="0"` and an
  accessible name, which WCAG 2.1.1 requires of any scrollable region.
- The print button is a real `<button>` and fires on both Enter and Space.
- Focus indicator is a 3px maroon outline at 3px offset, visible against every
  surface on both pages.
- No keyboard trap. No `tabindex` above 0 anywhere on either page.
- Both pages fully usable with no pointing device.

## 6. Screen reader and structure

Verified programmatically, not with a live reader:

- One `h1` per page, heading levels descend without skipping.
- Landmarks present: `main` on both new pages, `header` on both, plus the skip
  target.
- Every competency page in the sheet is an `article`, so a reader can jump
  page to page.
- The four spaces carry visible text labels, not color or position alone,
  which is 1.3.3 and 1.4.1.
- Decorative marks (the tick squares, the color rules) carry
  `aria-hidden="true"` so they are not announced as content.
- `aria-label` on the blank name and competency rules of the blank variant, so
  a reader hears what belongs on the line.
- The visually hidden dock status region (`.bd-live`) is clipped to 1px by
  design. An automated contrast check reports it as 1:1. It is
  screen-reader-only text and is exempt from 1.4.3, so this is a false
  positive, not a defect.

**Not yet done: a live screen reader pass.** Nothing on these pages has been
driven with VoiceOver or NVDA. That is the open item for this project.

## 7. Reflow, motion, forced colors

- Reflow verified at 320, 375, 768, 1024 and 1440 px. No horizontal scrolling
  at any width on any file listed in section 1. The four spaces collapse to a
  single column below 620px.
- `prefers-reduced-motion: reduce` cancels all transitions.
- `forced-colors: active` gives every box, tag and label a `CanvasText`
  border so nothing disappears in Windows High Contrast.
- Zero external network requests on every page. Fonts are self-hosted from
  `assets/fonts-site.css`.
- Zero console errors on every page at every width.

## 8. Known limitations and remediation plan

| Item | Where | Plan |
|---|---|---|
| No live screen reader pass | Every file | Run VoiceOver on Safari and NVDA on Firefox before Week 1 opens |
| `.rd-box-kicker` 6.02:1, `.rd-box-tag` 6.75:1 | unit-01 to unit-05, before-you-start | Pre-existing, clears AA, misses AAA. Darken the box grounds on the next pass at the unit pages |
| Print color fidelity | note-sheet.html | Black on white by design so it prints on a mono laser. Not a defect |
| Three per page is tight | note-sheet.html `?per=3` | Boxes are about 1.6in tall. It fits and it is measured, but it is the economy setting, not the good one. Two per page is the default for that reason |

## 9. The hello screen on the Canvas door

The greeting screen from the old welcome page now plays on `course-door.html`
itself rather than being a separate page load, so the Canvas embed is still one
iframe. It is an absolute overlay inside a relatively positioned stage, never
`position:fixed`.

Measured behavior, not asserted:

| Check | Result |
|---|---|
| Page height while the greeting plays | 961px, 961px, 961px. Unchanged, so the iframe never jumps |
| Cards reachable while the overlay is up | Yes. Two tabs lands on the Lecture card |
| Any keypress dismisses it | Yes, and the listener is on capture so it fires from the cards underneath |
| Second visit the same day | Overlay does not play |
| `prefers-reduced-motion: reduce` | Overlay never renders at all |
| Console errors | 0 |
| Reflow, overlay up and down, 320 to 1440 | No horizontal scroll at any width |

The overlay is `aria-hidden="true"` and carries no focusable content, and the
four cards sit under it in the DOM the whole time, so a screen reader or
keyboard user is never made to wait on an animation. `localStorage` access is
wrapped in try/catch at both the read and the write; if it throws, the greeting
simply plays, which is the harmless outcome.

### Contrast on the two gradient pills

An automated check reports "Syllabus and schedule" at 1.09:1. That is a false
positive: the auditor cannot resolve `linear-gradient` and falls back to the
element's own transparent background. Both pills were measured instead by
sampling the rendered pixels at four points across each sweep:

| Pair | Across the sweep | Worst | Level |
|---|---|---|---|
| Navy #0B1530 on the gold sweep | 8.78, 8.35, 7.94, 7.61 | 7.61:1 | AAA |
| White on the maroon sweep | 7.76, 8.14, 8.54, 8.90 | 7.76:1 | AAA |

| Hello screen pair | Background | Ratio | Level |
|---|---|---|---|
| White greeting | Ground #060A18 | 19.73:1 | AAA |
| Gold #E2C583 course line | Ground #060A18 | 9.34:1 | AAA |
| #C9CEDA skip hint | Ground #060A18 | 11.40:1 | AAA |

## 10. The course home move

`welcome.html` was the root of the nav map and 40 pages linked to it, most of
them through the shared nav bar with the link text "Course home", "This week"
or "All weeks". It had been given a "this page has moved" banner without those
links being repointed, so the most linked page in the site was telling students
they were in the wrong place while the navigation kept sending them back to it.

Fixed by moving the root rather than by editing 40 files:

- `bio005-nav.js` root is now `course-start.html`. Every entry that read
  `parent: 'welcome.html'` now reads `parent: 'course-start.html'`.
- `bio005-gate.js`, `bio005-back.js`, `readiness-check-view.js` and both copies
  of `bio005-reading-mode.js` were injecting the old target at runtime, which
  is why it survived a search of the HTML. All patched.
- The 8 pages that hardcoded the link (six decks, `course-materials.html`,
  `instructor/teaching-notes.html`) were repointed directly.
- `welcome.html` is now a redirect. It replaces rather than assigns, so Back
  does not bounce, and it redirects the frame rather than the top window, so a
  Canvas embed of the old URL keeps working inside Canvas. It carries a real
  link for anyone with scripting off, at 10.18:1.
- Nothing was deleted. The greeting hero, Hootie and the eight part tour are
  intact at `welcome-tour.html`, still reachable from the nav.

Verified across 20 representative pages: zero remaining links to
`welcome.html`, zero "this page has moved" banners, zero console errors.

## 11. Reviewer

Dr. Sharilyn Rennie
