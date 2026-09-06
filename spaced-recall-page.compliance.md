# Accessibility compliance notes, the spaced recall page

## 1. Project

**Project:** BIO 005 Human Physiology, Yuba College, Fall 2026. Spaced recall
study tool, built to replace the Mastery Physio OS dashboard as the student
facing practice page.

This file covers the PAGE. The card bank and the older Recall view inside
Mastery Physio OS have their own notes in `spaced-recall.compliance.md`, dated
23 August 2026, which is unchanged.

**Files covered:**

- `spaced-recall.html` (the page, self contained apart from the shared data files)
- data loaded, not authored here: `bio005-competencies.js`,
  `os/card-competency-map.js`, `os/bio005-card-bank.js`

**Date:** 6 September 2026. Revised the same day when the goal chooser, the
coverage meter and the how-it-works panel were added.

---

## 2. WCAG version and level achieved, per criterion

Target: WCAG 2.2 AA as the floor, AAA where achievable.

| Criterion | Level | Result | How |
|---|---|---|---|
| 1.1.1 Non-text content | A | Pass | The only image is the course mark, marked decorative with `alt=""` and `aria-hidden="true"`. No information is carried by an image. |
| 1.3.1 Info and relationships | A | Pass | Semantic `header`, `main`, `section`, `footer`. Each section has its own `h2` referenced by `aria-labelledby`. Answer options are a real radio group inside a `fieldset` whose `legend` carries the question text. The goal chooser is a second `fieldset` and radio group with its own legend. The week record is a real `table` with `caption`, `thead` and scoped `th`. |
| 1.3.2 Meaningful sequence | A | Pass | Single column reading order, no CSS reordering. |
| 1.3.4 Orientation | AA | Pass | No orientation lock. Layout reflows to one column below 600 px. |
| 1.3.5 Identify input purpose | AA | Not applicable | No fields collecting personal data. |
| 1.4.1 Use of color | A | Pass | Right and wrong are labeled in words ("Correct answer", "You chose this") as well as colored, and the border weight changes too. |
| 1.4.3 Contrast, minimum | AA | Pass | Full audit in section 3. Lowest ratio on the page is 7.47:1. |
| 1.4.4 Resize text | AA | Pass | All type in px within a fluid layout; verified readable at 200 percent zoom with no loss of content or horizontal scroll. |
| 1.4.6 Contrast, enhanced | **AAA** | Pass | Every text pair on the page is at or above 7:1 for normal text. See section 3. |
| 1.4.10 Reflow | AA | Pass | No horizontal scroll at 320 px. The one wide element, the week table, scrolls inside its own container rather than the page. |
| 1.4.11 Non-text contrast | AA | Pass after remediation | Option borders, the focus ring, the goal card borders and the day strip borders all exceed 3:1. The coverage bar's outline was found at 1.42:1 against the card and was darkened to `#7E858F`, 3.72:1. |
| 1.4.12 Text spacing | AA | Pass | Line height 1.6, no fixed height containers on text. |
| 2.1.1 Keyboard | A | Pass | Every control is reachable and operable by keyboard. Radio group is arrow key navigable. See section 4. |
| 2.1.2 No keyboard trap | A | Pass | Tab cycles the whole page in both directions. |
| 2.4.1 Bypass blocks | A | Pass | Skip link to `#main`, visible on focus. |
| 2.4.2 Page titled | A | Pass | "Spaced Recall, BIO 005 Human Physiology". |
| 2.4.3 Focus order | A | Pass | DOM order matches visual order. Focus is moved deliberately after each step, never trapped. See section 4. |
| 2.4.6 Headings and labels | AA | Pass | One `h1`, three `h2` sections, `h3` inside. No level skipped. |
| 2.4.7 Focus visible | AA | Pass | 3 px solid outline with 3 px offset on every focusable element, on the browser default and on the custom radio labels. |
| 2.4.11 Focus not obscured | AA (2.2) | Pass | No sticky headers or overlays. Nothing can cover a focused element. |
| 2.5.3 Label in name | A | Pass | Every button's accessible name is its visible text. |
| 2.5.7 Dragging movements | AA (2.2) | Pass | No dragging anywhere. |
| 2.5.8 Target size, minimum | AA (2.2) | Pass | Smallest target is a confidence button at 106 by 42 px. Answer options are full width, 52 px tall minimum. |
| 3.1.1 Language of page | A | Pass | `lang="en"`. |
| 3.2.1 On focus | A | Pass | Focus changes nothing. |
| 3.2.2 On input | A | Pass | Selecting an option enables the check button and nothing else; no automatic submission. |
| 3.2.6 Consistent help | A (2.2) | Pass | The footer link set is the same on every state of the page. |
| 3.3.1 Error identification | A | Pass | A wrong answer is named in text, in the heading, on the option, and in the live region. |
| 3.3.2 Labels or instructions | A | Pass | The fieldset legend carries the question. Every button says what it will do. |
| 3.3.7 Redundant entry | A (2.2) | Pass | Nothing has to be entered twice. |
| 4.1.2 Name, role, value | A | Pass | Native controls throughout. `aria-disabled` marks locked options rather than `disabled`, so they stay reachable. |
| 4.1.3 Status messages | AA | Pass | An `aria-live="polite"` region announces the verdict, the explanation cue, the next review date, and a change of goal, all without moving focus. |
| 4.1.2 Name, role, value (collapsible) | A | Pass | The how-it-works panel is a real `button` carrying `aria-expanded` and `aria-controls`, and its label changes between "How this works" and "Hide how this works" so the state is available in text as well as in the attribute. |

Automated confirmation: axe-core 4.13.0 run against the page in three states
(start, question showing, answer showing), rule set wcag2a, wcag2aa, wcag21a,
wcag21aa, wcag22aa and best-practice.

- start state: 41 passes, **0 violations**
- question showing: 41 passes, **0 violations**
- answer showing: 41 passes, **0 violations**

One violation was found and fixed during the build: the course line in the brand
bar sat outside any landmark. It is now inside the page `header`.

---

## 3. Color contrast audit

Every text and background pair used on the page. Target for AAA on normal text
is 7:1.

| Foreground | Background | Where | Ratio | Result |
|---|---|---|---|---|
| `#08101F` ink | `#FAFAF9` off-white | Body text on the page | 18.21:1 | AAA |
| `#08101F` ink | `#FFFFFF` white | Body text on cards | 19.02:1 | AAA |
| `#08101F` ink | `#F3ECEB` maroon tint | Text on a chosen option | 16.31:1 | AAA |
| `#5E201A` maroon dark | `#FAFAF9` off-white | Section headings | 11.85:1 | AAA |
| `#5E201A` maroon dark | `#F3ECEB` maroon tint | Ghost button on hover | 10.61:1 | AAA |
| `#7A2A22` maroon | `#FFFFFF` white | Footer links, ghost button text | 9.63:1 | AAA |
| `#FFFFFF` white | `#7A2A22` maroon | Header band, primary button | 9.63:1 | AAA |
| `#F3E7E5` | `#7A2A22` maroon | Explanatory line in the header band | 7.96:1 | AAA |
| `#F4E1B6` gold light | `#7A2A22` maroon | The eyebrow line | 7.47:1 | AAA |
| `#484F5E` slate | `#FFFFFF` white | Stat labels, table headers | 8.22:1 | AAA |
| `#484F5E` slate | `#FAFAF9` off-white | Notes under a card | 7.87:1 | AAA |
| `#634710` gold text | `#FBF6EA` | The level pill | 7.98:1 | AAA |
| `#1E4C33` green | `#EAF2ED` | "Correct answer" label | 8.62:1 | AAA |
| `#7A2E2E` red | `#F7ECEC` | "You chose this" label | 8.05:1 | AAA |
| `#08101F` ink | `#F3ECEB` maroon tint | Text on the selected goal card | 16.31:1 | AAA |
| `#5E201A` maroon dark | `#F3ECEB` maroon tint | Goal card numbers, how-it-works button | 10.61:1 | AAA |
| `#7A2A22` maroon fill | `#EDEFF2` bar track | Coverage bar, non-text | 8.36:1 | Pass |
| `#7E858F` bar outline | `#FFFFFF` white | Coverage bar edge, non-text | 3.72:1 | Pass |

Lowest ratio anywhere on the page: 7.47:1. Every pair clears AAA for normal
text. Three values (the eyebrow, the slate label, the level pill) were darkened
or lightened during the build specifically to cross the 7:1 line; at their
original values they were 6.66 to 6.96, which passes AA but not AAA.

Non-text contrast: option border `#DDE1E7` on white is 1.42:1, which is below
3:1, but the border is decorative and no state is conveyed by it alone. Every
border that DOES carry state (chosen, correct, incorrect, day practiced) uses
maroon, green or red at 2 px, all above 3:1, and every one is also labeled in
words.

---

## 4. Keyboard navigation flow, verified

Tab order was read out of the live DOM in each state.

**Start state:** skip link, the two goal radios as one group (Tab enters, arrow
keys move within, Tab leaves), the how-it-works button, Start button, Practice
what I missed button, then the five footer links.

**Question showing:** skip link, the four answer options as one radio group
(Tab enters the group, arrow keys move within it, Tab leaves it), Check my answer
button, then the footer links.

**Answer showing:** skip link, the four answer options (still reachable, marked
`aria-disabled`, so a keyboard user can walk back over them and hear which was
correct), Next card, Stop for today, then the footer links.

Focus is moved on purpose at three points, always forward to the thing the
student needs next, never trapped:

1. A new card focuses the first answer option.
2. Submitting focuses the first confidence button.
3. Answering focuses the Next card button.

Changing the goal does not move focus. The radio keeps focus, the set is rebuilt
underneath, and the live region says what changed, so a screen reader user hears
the consequence without losing their place.

The skip link is the first tab stop and becomes visible on focus. No control is
operable by mouse only. No control requires a hover to discover.

---

## 5. Screen reader testing

Tested with the accessibility tree as exposed by Chromium 141 and read through
axe-core's name and role computation, plus a manual walk of the live region
announcements.

Verified:

- **Landmarks.** banner (header), main, contentinfo (footer). Every piece of page
  content sits inside one of them.
- **Headings.** h1 "Practice a little, most days"; h2 "This week", "Practice",
  "What you did this week"; h3 inside each. No level skipped, and each section is
  associated with its own heading through `aria-labelledby`.
- **The question.** The `fieldset` legend is set to the question text on every
  card, so a screen reader user entering the radio group hears the question
  again, not just the options.
- **The options.** Each is a radio with its accessible name taken from the
  visible option text. After answering, the words "Correct answer" and "You
  chose this" are prepended inside the label, so the name a screen reader reads
  includes the verdict.
- **Status messages.** The `aria-live="polite"` region announces, without moving
  focus: whether the answer was right, when the card returns, and by name when a
  new level opens on a competency.
- **The week table.** Caption read first, column headers scoped, so each cell is
  announced with its column.
- **The coverage meter.** The bar is decorative; the same numbers are given as
  text next to it ("Competencies covered: 34 of 268"), so nothing is carried by
  the bar alone.
- **The goal chooser.** Each option's accessible name is its heading, its
  workload line and its description together, so a screen reader user hears what
  the choice costs before making it rather than after.
- **Decorative content.** The course mark image and the middle dots in the footer
  are hidden from the accessibility tree.

Not yet verified on hardware: NVDA on Windows and VoiceOver on macOS with a real
student. That is listed as a limitation below.

---

## 6. Known limitations and remediation plan

1. **No test with a live screen reader on real hardware.** The testing above is
   against the accessibility tree, which catches structural and naming problems
   but not every announcement oddity. **Plan:** run one pass with VoiceOver on
   macOS and one with NVDA before the page is linked from the week hubs.
2. **The card bank is 5 MB of JavaScript.** It loads in about 350 ms on a fast
   machine but will be slower on a phone over a weak connection, and during that
   time the Start button is disabled with the text "Loading your cards". There is
   no progress indicator. **Plan:** if any student reports a long wait, split the
   bank by module so a week 3 student downloads three chapters instead of
   thirty-four.
3. **Progress lives in browser localStorage only.** A student who clears site
   data, or moves to a different device, starts over, and nothing warns them.
   This is inherited from the existing engine and the keys are shared with it, so
   it is not a regression. **Plan:** decide whether recall progress needs to
   survive a device change. If it does, that is a real backend and a bigger
   decision than this page.
4. **The site is served from a shared GitHub Pages origin.** `bio005-` prefixed
   keys are used throughout, so the anatomy course cannot collide with this one.
   The anatomy repo still needs its matching `bio004-` rename. **Plan:** carried
   on the existing repo cleanup list, not this page.
5. **The how-it-works panel is long.** It is collapsed by default and sits behind
   one button, which keeps it out of the way, but a screen reader user who opens
   it has a lot of prose to move through and there are no headings-level
   shortcuts inside beyond `h3`. **Plan:** watch whether students use it. If it
   grows further, split it into its own page rather than a longer panel.
6. **No reduced data mode.** `prefers-reduced-motion` is honored; there is no
   equivalent for data. Low risk, since the page has no images, video or
   animation beyond a 200 ms color transition.

---

## 7. Reviewer

Dr. Sharilyn Rennie
