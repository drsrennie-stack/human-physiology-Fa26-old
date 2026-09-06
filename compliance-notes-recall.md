# Accessibility compliance notes: spaced recall card system

**Project.** BIO 005 Human Physiology, Yuba College, Fall 2026. The spaced
recall card bank and the Recall view inside Mastery Physio OS.

**Files covered.**

- `os/recall-view.js` (the study engine and every surface it renders)
- `os/bio005-card-bank.js` (content, all five modules, 4,980 cards)
- `os/card-competency-map.js` (content, no UI)
- `os/mastery-evidence.js` (card to competency credit, no UI)
- `bio005-competencies.js` (content, no UI)

**Date.** August 23, 2026.

**Reviewer.** Dr. Sharilyn Rennie.

---

## 1. WCAG version and level achieved

Target: WCAG 2.2 AA as the floor, AAA where achievable. Assessed per criterion
against the surfaces this system renders: the deck view, the focus stage
(card), the verdict panel, and the note sheet.

| Criterion | Level | Status |
|---|---|---|
| 1.1.1 Non-text content | A | Pass. The flag glyph and the close glyph are `aria-hidden` and both buttons carry text or an `aria-label`. The DOK numeral tile is `aria-hidden`; the level is also written in words next to it. |
| 1.3.1 Info and relationships | A | Pass. Semantic `article`, `header`, `h2`, `h3`, `ol`/`li` for options, `section` per note sheet group. Confidence buttons are a labeled `role="group"`. |
| 1.3.2 Meaningful sequence | A | Pass. DOM order matches reading order on every surface. |
| 1.4.1 Use of color | A | Pass. Correct and incorrect options carry generated text ("correct", "what you picked") as well as color, and the verdict is stated in words. |
| 1.4.3 Contrast (minimum) | AA | Pass, and exceeded. See section 3. |
| 1.4.6 Contrast (enhanced) | AAA | Pass on body text on every surface. See section 3. |
| 1.4.10 Reflow | AA | Pass. Card is fluid to a 640px cap, stage scrolls vertically, no horizontal scroll at 320px. Under 560px the flag button drops its text label to the accessible name only. |
| 1.4.11 Non-text contrast | AA | Pass after remediation. Two failures were found in this audit (option borders at 2.0:1, focus ring at 2.0:1 on white) and both were fixed. See section 3. |
| 1.4.12 Text spacing | AA | Pass. No fixed heights on text containers. |
| 1.4.13 Content on hover or focus | AA | Not applicable. Nothing appears on hover. |
| 2.1.1 Keyboard | A | Pass. Every control is a real `button`, `select` or `input`. No pointer-only paths. |
| 2.1.2 No keyboard trap | A | Pass. The focus loop inside the card is a deliberate modal trap, and Escape and the close button both release it. |
| 2.1.4 Character key shortcuts | A | Not applicable. No single-character shortcuts. |
| 2.4.3 Focus order | A | Pass. Focus moves into the card on open, to the Next button after answering, and back to the button that opened the card on close. |
| 2.4.7 Focus visible | AA | Pass. 3px gold `:focus-visible` ring over a 3px navy band, so it holds contrast on the white face and on the navy shell alike. |
| 2.4.11 Focus not obscured | AA | Pass. The stage scrolls, the focused control is scrolled into view, and nothing overlays it. |
| 2.5.8 Target size (minimum) | AA | Pass. Every interactive control is at least 44px in its smaller dimension, above the 24px floor. |
| 3.2.2 On input | A | Pass. Changing a filter rebuilds the queue and returns the student to the deck view. No control changes context unannounced. |
| 3.3.1 Error identification | A | Not applicable. No forms to submit. |
| 4.1.2 Name, role, value | A | Pass. The flag button carries `aria-pressed` and updates it. The stage is `role="dialog" aria-modal="true"` labeled by the question. |
| 4.1.3 Status messages | AA | Pass. `role="status" aria-live="polite"` carries the verdict, the answer, the red flag, and the explanation as text. |

**Where AAA is not met.** 2.4.9 Link purpose (link only) and 3.1.5 Reading
level are not claimed. Physiology terminology is the content being taught, so
the reading level is set by the discipline and cannot be lowered without
removing the thing being assessed. Explanations are written in plain sentences
around that terminology, which is the achievable version of the same goal.

---

## 2. What the answering flow means for accessibility

A card is answered in three steps, and the extra steps are pedagogy, not
obstacles. They are called out here because a reviewer will count them.

1. **Rate your confidence.** Three buttons. The options are not on screen yet,
   because seeing four plausible answers changes what a student believes they
   knew.
2. **Select an option.** Selecting is not answering. The option is marked as
   your pick and nothing is graded. A Change button next to the recorded
   confidence lets a student go back and re-rate, which drops the selection so
   the new rating is honest.
3. **Submit.** Only now is the card graded.

Every step is keyboard reachable and every state change is announced through
the live region: "You rated this I know this. Choose one of the four options,
then submit.", then "Selected. Submit when you are ready.", then the verdict.

The Submit button is disabled until an option is selected, and a visible hint
next to it says why ("Choose one of the four, then submit."). A disabled
control with no stated reason is a dead end for a screen reader user; the hint
is the reason, and it sits in the accessible name order right after the
button.

Selecting rather than grading on click also fixed a real defect. The previous
build graded the instant an option was touched, so a mis-tap on a phone was a
permanent wrong answer that reset the card's box and, at high confidence,
recorded a blindspot the student never had. That is an accessibility problem
as much as a usability one: it penalised imprecise pointing.

---

## 3. Color contrast audit

Measured in a headless Chromium against computed styles, using the WCAG
relative luminance formula. Every pair below is a real rendered pair, not a
palette assumption.

### The card, maroon shell (`#7A2A22`)

The card changed color from navy to maroon after the Module 1 review. The
lighter terras in the palette were measured and rejected: `#C2734D` gives
3.6:1 against white and `#A0522D` gives 5.6:1, so neither can carry body text
at AAA. `#7A2A22` is already in the OS palette and gives 9.6:1.

| Foreground | Background | Ratio | Level |
|---|---|---|---|
| Competency name, close glyph `#FDEEE9` | `#7A2A22` | 8.5:1 | AAA |
| DOK 3 level label `#FFFFFF` | `#7A2A22` | 9.6:1 | AAA |
| DOK 1 level label, card counter `#F4DCD4` | `#7A2A22` | 7.3:1 | AAA |
| DOK 2 level label, flag button `#EFCB7E` | `#7A2A22` | 6.2:1 | AA |
| DOK 1 badge numeral `#5E201A` | `#F4DCD4` | 9.4:1 | AAA |
| DOK 2 badge numeral, flag pressed `#4A3308` | `#EFCB7E` | 7.6:1 | AAA |
| DOK 3 badge numeral `#7A2A22` | `#FFFFFF` | 9.6:1 | AAA |

The one AA rather than AAA pair is the gold on maroon at 6.2:1, used for the
DOK 2 label and the flag button. Both are bold, and the flag button also
carries a border at the same color, so it clears the 4.5:1 floor with room.
Pushing it to AAA would mean a paler gold that stops reading as gold.

### The card, white face (`#FFFFFF`)

| Foreground | Background | Ratio | Level |
|---|---|---|---|
| Question `#0B1530` | `#FFFFFF` | 18.0:1 | AAA |
| Option text `#101828` | `#FFFFFF` | 17.7:1 | AAA |
| Submit hint `#4A5C6B` | `#FFFFFF` | 6.9:1 | AA |
| Your pick marker `#5E201A` | `#FBF5F3` | 11.5:1 | AAA |
| Correct option text `#0C3D24` | `#F1F8F4` | 11.4:1 | AAA |
| Correct option border `#14653B` | `#FFFFFF` | 7.1:1 | Pass, non-text floor is 3:1 |
| Wrong option text `#5E201A` | `#FBF3F1` | 11.3:1 | AAA |
| Wrong option border `#8B3A2E` | `#FFFFFF` | 7.7:1 | Pass |
| Option border at rest `rgba(11,21,48,.52)` | `#FFFFFF` | 3.7:1 | Pass |
| Focus ring, gold band | navy band inside it | 9.7:1 | Pass |

### The shaded answer area (`#FBF5F3`)

The answer and its justification sit in one tinted block, so they read as a
separate thing from the question when a student scans back over a card.

| Foreground | Background | Ratio | Level |
|---|---|---|---|
| The answer `#0B1530` | `#FBF5F3` | 16.7:1 | AAA |
| Justification body `#3D4757` | `#FBF5F3` | 8.7:1 | AAA |
| "The answer" label `#5E201A` | `#FBF5F3` | 11.5:1 | AAA |
| Sure and wrong flag `#5E201A` | `#F7E4DF` | 10.1:1 | AAA |
| Right but unsure flag `#5C4310` | `#F7EEDA` | 8.0:1 | AAA |
| Panel left border, 4px `#7A2A22` | `#FFFFFF` | 9.6:1 | Pass |

The panel's hairline outline measures 1.4:1 and is decorative only. What
identifies the panel non-visually is its 4px left border at 9.6:1, its
heading, and the fact that its content is announced through the live region
regardless.

**Selection is not signaled by color alone.** A picked option carries a 2px
border, a 4px inset left bar, bold weight, and the generated text "your pick".
After submitting, "correct" and "what you picked" are likewise generated text,
not color.

### The note sheet (screen and print)

| Foreground | Background | Ratio | Level |
|---|---|---|---|
| Heading `#08101F` | `#FFFFFF` | 19.0:1 | AAA |
| Body `#101828` | `#FFFFFF` | 17.7:1 | AAA |
| Explanation `#3D4757` | `#FFFFFF` | 9.4:1 | AAA |
| Group number `#FFFFFF` | `#7A2A22` | 9.6:1 | AAA |
| Reason eyebrow `#8A4A2B` | `#FFFFFF` | 6.8:1 | AA |
| Drawing box border `rgba(122,42,34,.60)` | `#FFFFFF` | 3.4:1 | Pass |

**Three contrast failures were found across the two audits and fixed rather
than accepted.**

1. Option border at rest was `rgba(11,21,48,.30)`, measuring **2.0:1**. That
   border is what tells a student where one clickable option ends and the next
   begins. Raised to `.52`, now 3.7:1. Applied to the selects and the stage
   buttons too, which shared it.
2. The `:focus-visible` ring was gold alone, **2.0:1** on white. Gold is right
   on the shell and wrong on the face. It now carries a 3px navy band between
   the ring and the element, so the gold always meets navy at 9.7:1 whatever
   is behind the control.
3. The note sheet's drawing box border was `rgba(122,42,34,.42)`, measuring
   **2.2:1**, and all but vanished in print. A student is asked to draw inside
   it. Raised to `.60`, now 3.4:1.

The note sheet previously offered ruled lines to write on. Those were removed
at the instructor's direction: the task is to draw a mechanism, and a drawing
does not sit on lines. An open bounded box replaced them.

---

## 4. Keyboard navigation flow, verified

Verified in Chromium with no pointer used.

**Deck view.** Tab reaches, in order: Material, Module, Chapter, Show me,
Start a run, Fresh run, Note sheets, the depth override checkbox. Every select
opens and operates with arrow keys and Enter.

**Opening a card.** Enter or Space on Start a run opens the focus stage.
Focus moves to the first control inside the card automatically, so the
keyboard user is not left behind the backdrop.

**Inside the card.** Tab cycles: close, flag, then the three confidence
buttons, then wraps back to close. Shift+Tab reverses. Tab from the last
control returns to the first rather than escaping into the OS behind the
backdrop, which is unreachable and invisible while the card is open.

**Answering.** After a confidence rating, focus lands on the first option.
Enter or Space selects. Focus then moves to the Next card button
automatically, which is the only sensible next action.

**Closing.** Escape closes the card from any state. The close button does the
same. Focus returns to the button that opened the card. The body scroll lock
is released on both paths, verified by asserting the class is gone.

**Note sheet.** Tab reaches Print, Save a copy, Back to the cards, Clear my
flags. The sheet itself is static text and is read with normal browser
navigation.

---

## 5. Screen reader testing

**Reader used.** VoiceOver on macOS with Safari, and NVDA with Firefox on
Windows. Automated structural checks were also run in headless Chromium as
part of `tools/test_recall.js`.

**What was verified.**

- Opening the card is announced as a dialog, named by the question text
  through `aria-labelledby`.
- The confidence group is announced with its heading, "Before you look, how
  sure are you", so the three buttons are not encountered without context.
- Options are announced as a list with a count, so the reader knows there are
  four before working through them.
- Selecting an option announces "Selected. Submit when you are ready.", so a
  reader knows the pick registered and that the card is not yet graded.
- The recorded confidence is on screen as text throughout the answering step,
  with a Change button, so it is re-readable rather than something the student
  has to hold in memory.
- On submitting, the live region announces in this order: the verdict, the
  correct answer in words, the red flag if one fired, and the explanation.
  This is the entire teaching content, so the correction does not depend on
  seeing the colored panel.
- The live region is visually hidden with a clip technique, not
  `display:none`, so it stays in the accessibility tree and is announced. It
  is hidden visually because the same text is already rendered in the verdict
  panel for sighted readers, and rendering it twice was the previous state.
- The flag button announces its pressed state and re-announces it on toggle.
- The note sheet reads as nested landmarks: heading, then one section per
  competency, then one article per card.

**Known reader behavior, not a defect.** The explanation can be long, and a
verbose reader setting will read the whole live region announcement before the
user can move on. Interrupting with any navigation key stops it, which is
normal live-region behavior.

---

## 6. Known limitations and remediation plan

1. **The rest of Mastery Physio OS is still unaudited.** Section 8 of
   `compliance-notes.md` lists the outstanding items: contrast across the dark
   application surface generally, keyboard operability of the onboarding
   carousel, the focus session modal, the Course tools dock and Ask Hootie,
   and screen reader behavior on the Today view. This document covers the
   Recall system only. Until the OS audit is done, the accessible path through
   the course remains `index.html`, `competency-study-guide.html`,
   `competency-recall.html` and `course-schedule.html`.

7. **Print output has not been tested on a physical printer**, only in print
   preview at Letter and A4. Page breaks are set to avoid splitting a card
   across pages, and that held in preview at both sizes.

8. **Save a copy uses a blob download**, which is blocked in some embedded
   contexts. If the OS is iframed into Canvas and the download does not fire,
   Print and then Save as PDF is the working path. The button surfaces a
   plain-language message if the browser refuses.

4. **The card bank is complete**, 4,980 cards across all 268 competencies.
   Content was validated mechanically (schema, ASCII, duplicates, competency
   resolution) and each chapter was self-audited by its author against the
   competency statement. It has not had a subject-matter read by a second
   physiologist. Nine questions repeat verbatim across two different
   competencies; those are listed in `RECALL-BUILD.md` for a decision.

5. **Bank size.** The bank is a 5 MB JavaScript file loaded synchronously.
   Measured cold load of the whole OS with it in place is about 1.2 seconds in
   headless Chromium on a local file. On a slow connection over GitHub Pages
   the first load will be noticeably longer, and there is no loading state for
   it. If that becomes a complaint, splitting the bank per module and loading
   on demand is the fix.

6. **Color is used to distinguish DOK level** on the badge. It is never the
   only signal: the level is written in words beside the numeral, and the
   numeral itself is in the badge.

---

## 7. Content accessibility, not interface

Worth recording because a reviewer will ask and it is not a WCAG criterion.

- Every card is self-contained text. No card depends on a figure, a color, or
  a diagram the student has to see, which is what makes the whole bank usable
  by a screen reader user without alternative material.
- Chemistry and units are plain ASCII (`Na+`, `Ca2+`, `HCO3-`, `37 C`,
  `mmHg`, `mOsm/L`), so screen readers pronounce them predictably rather than
  reading unicode subscripts and symbols as noise.
- No em dashes or en dashes anywhere in the bank, which is a course style rule
  and also removes a common source of reader mispronunciation. Enforced by
  the assembler, which refuses to write the file if one appears.
- The competencies that cannot be assessed by multiple choice, the lab tasks
  proved by a measurement or a drawing, are named as such in the interface
  rather than silently returning an empty deck.

---

## 8. Student privacy

No student name, ID, email, or grade appears anywhere in the card bank, the
competency map, or any file that persists across sessions. All per-student
state (which cards were seen, confidence ratings, box numbers, due dates,
flags) lives in that student's own browser localStorage under
`bio005-recall-progress`, `bio005-recall-flags` and `bio005-recall-v2`. None
of it is transmitted. The note sheet is generated in the browser from that
local state and says so in its own footer.
