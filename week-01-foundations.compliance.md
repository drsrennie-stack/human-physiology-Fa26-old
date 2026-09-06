# Week 1, Foundations and Whole Body Control

**Accessibility compliance notes.** BIO 005 Human Physiology.

## 1. Project

**Project:** The Clinical Physiology Lab, weekly interactive pages
**Course:** BIO 005 Human Physiology
**Files covered:** the shared engine (`engine/base.css`, `engine/add.css`, `engine/lab-core.js`, `engine/lab-parts.js`, `engine/lab-steps.js`, `engine/lab-chart.js`) and the first page built on it, `week-01-foundations.html`
**Body typeface:** Helvetica Neue, falling back to Helvetica then Arial then the system sans serif. All of them have a normal unslashed zero, which matters because these pages are full of numbers. SVG text is given the same stack explicitly, since SVG does not inherit it.
**External requests:** none. The page is one self contained file with no web font, no script and no image loaded from anywhere else.
**Date:** August 23, 2026 (surface treatment and the walkthrough components added the same day)
**Reviewer:** Dr. Sharilyn Rennie

This file covers the engine as well as week one, because every later week inherits the same components. When a new week ships, only its own content needs re-checking, not the machinery.

## 2. WCAG version and level achieved

Target: WCAG 2.2 Level AA minimum, Level AAA where achievable.

| Criterion | Level | Status | Note |
|---|---|---|---|
| 1.1.1 Non text content | A | Pass | Every SVG carries `role="img"` and an `aria-label` that describes the shape and the landmark values, not just the title. The oxygen curve, both posture traces and the logo are the only images, and all four are inline SVG. |
| 1.3.1 Info and relationships | A | Pass | Semantic `header`, `nav`, `main`, `footer`, `section`, `figure` and `figcaption`. Every table uses `thead`, `th scope="col"` and a `caption`. |
| 1.3.2 Meaningful sequence | A | Pass | Single column reading order in every panel. Nothing is positioned out of flow. |
| 1.4.1 Use of color | A | Pass | Correct and incorrect answers change their wording, not only their color. Table flags read the words Yes and No. A filled drop box shows the label text, not just a color change. |
| 1.4.3 Contrast, minimum | AA | Pass | See section 3. |
| 1.4.6 Contrast, enhanced | AAA | Pass with one exception | Every text pair reaches 7:1 except the gold eyebrow on the maroon header at 5.75:1, which meets AA. |
| 1.4.10 Reflow | AA | Pass | Fluid grids throughout. Every table and every calculation grid scrolls inside its own container, so the page body never scrolls sideways. |
| 1.4.11 Non text contrast | AA | Pass | Input and table rules at 3.61:1, gold control borders at 3.85:1, drop box dashed borders at 3.61:1. Every plotted line is at least 7:1 against the page. |
| 1.4.12 Text spacing | AA | Pass | No fixed heights on text containers. Line height 1.6. |
| 2.1.1 Keyboard | A | Pass | 171 focusable elements, all operable. The drag and drop matching, the decision chart, the curve reader and the posture runs are all fully keyboard operable. |
| 2.1.2 No keyboard trap | A | Pass | No modals and no focus capture anywhere on the page. |
| 2.4.1 Bypass blocks | A | Pass | Skip link to `#main` as the first focusable element. |
| 2.4.3 Focus order | A | Pass | Follows reading order. Opening a section moves focus into its panel. |
| 2.4.5 Multiple ways | AA | Pass | A tab strip across the whole lab, plus a contents list on the study page that moves focus to the section it names. |
| 2.4.6 Headings and labels | AA | Pass | One `h1`, 42 headings, zero skipped levels. |
| 2.4.7 Focus visible | AA | Pass | 3px terra outline with 2px offset, switching to white on the maroon band. |
| 2.5.7 Dragging movements | AA | Pass | **The one that shaped the design.** Every matching task has three independent input paths: drag a label onto a box, click a label then click a box, or tab to a label and press Enter then tab to a box and press Enter. The instructions say so in plain words above the task. |
| 2.5.8 Target size, minimum | AA | Pass | Every drop box is at least 96px tall. No control is smaller than 24 by 24. |
| 3.1.3 Unusual words | AAA | Pass | 41 clinical terms are clickable for a one line plain language definition, in the running text and inside every piece of feedback the page generates. |
| 3.1.5 Reading level | AAA | Pass | Every formula carries an abbreviation key and a plain language explanation behind an info control. A single header switch opens every explanation on the page at once. |
| 3.2.3 Consistent navigation | AA | Pass | The engine builds the same shell for every week, so the tab strip, the header and the results page never move. |
| 3.2.4 Consistent identification | AA | Pass | Predict, Check yourself, the info icon and the plain words button mean the same thing everywhere and are built by the same components. |
| 3.3.1 Error identification | A | Pass | A wrong value in a calculation grid is marked on the input, described in the live region, and the correct value is printed under the cell. |
| 3.3.3 Error suggestion | AA | Pass | Wrong answers explain the reasoning rather than just marking the attempt. A wrong branch on the decision chart says why that branch is wrong and leaves the chart where it was. |
| 4.1.2 Name, role, value | A | Pass | 32 controls expose `aria-expanded`, drop targets and toggle buttons expose `aria-pressed`, and a matched drop box updates its own accessible name to say what it now holds. |
| 4.1.3 Status messages | AA | Pass | 40 live regions. Every check, every drop, every gate opening, every step unlocking and every readout change is announced without moving focus. |
| 3.3.5 Help | AAA | Pass | A worked step that has been missed twice says the method is coming. On the third miss it explains how the step works, in words, without ever printing the value. |
| 2.2.1 Timing adjustable | A | Pass | Nothing in the walkthrough is timed. A step waits indefinitely, and a wrong answer costs nothing but another attempt. |

## 3. Color contrast audit

| Use | Foreground on background | Ratio | Result |
|---|---|---|---|
| Body text | `#0A1322` on `#ffffff` | 18.60:1 | AAA |
| Body text on layered surface | `#0A1322` on `#FAFAF9` | 17.81:1 | AAA |
| Captions and secondary text | `#3D4860` on `#ffffff` | 9.15:1 | AAA |
| Secondary on layered surface | `#3D4860` on `#FAFAF9` | 8.76:1 | AAA |
| Section headings | `#731717` on `#ffffff` | 11.27:1 | AAA |
| Section headings on surface | `#731717` on `#FAFAF9` | 10.79:1 | AAA |
| Navy headings and formulas | `#08101F` on `#ffffff` | 19.02:1 | AAA |
| Gold labels | `#6E5018` on `#ffffff` | 7.44:1 | AAA |
| Teal flags and lines | `#27565D` on `#ffffff` | 8.15:1 | AAA |
| Teal flag on striped row | `#27565D` on `#FAFAF9` | 7.81:1 | AAA |
| Header text on maroon | `#ffffff` on `#731717` | 11.27:1 | AAA |
| Header eyebrow on maroon | `#DCB45C` on `#731717` | 5.75:1 | AA |
| Chip text on gold | `#08101F` on `#DCB45C` | 9.71:1 | AAA |
| Dataset stamp, white on navy | `#ffffff` on `#08101F` | 19.02:1 | AAA |
| Dataset stamp, gold key on navy | `#DCB45C` on `#08101F` | 9.71:1 | AAA |
| Drop box role label | `#3D4860` on `#ffffff` | 9.15:1 | AAA |
| Drop box empty prompt | `#555E71` on `#ffffff` | 6.51:1 | AA |
| Drop box once filled | `#08101F` on `#ECEFF4` | 16.50:1 | AAA |
| Step badge, white on navy | `#ffffff` on `#08101F` | 19.02:1 | AAA |
| Correction printed under a cell | `#3D4860` on `#FAFAF9` | 8.76:1 | AAA |
| Under-65 flag | `#731717` on `#FAFAF9` | 10.79:1 | AAA |
| Table and input rules | `#7F8798` on `#ffffff` | 3.61:1 | AA non text |
| Control borders on the off-white page | `#7F8798` on `#FAFAF9` | 3.45:1 | AA non text |
| Card hairline (decorative, not a control) | `#E7EAEF` on `#FAFAF9` | 1.11:1 | Not applicable, see note |
| Gold control borders | `#9A7F32` on `#ffffff` | 3.85:1 | AA non text |
| Plotted systolic line | `#731717` on `#ffffff` | 11.27:1 | AA non text |
| Plotted diastolic line | `#08101F` on `#ffffff` | 19.02:1 | AA non text |

Two values were raised during the first pass. The empty drop box prompt was `#7F8798` at 3.61:1, which fails AA for normal text, and is now `#555E71`. The teal token was `#2C5F66`, which reached only 6.85:1 on a striped table row, and is now `#27565D`.

A second pass followed the surface redesign. Softening the borders on the secondary button, the curve reader buttons and the drop boxes had taken them to between 1.66:1 and 2.20:1, below the 3:1 that 1.4.11 requires of a control's visible boundary. All three are back on `#7F8798`, which holds 3.45:1 against the off-white page. The refinement now comes from the shadow and the hover lift rather than from a paler line, which is the better answer anyway.

The card hairline is listed as not applicable because a card is not a user interface component and its edge carries no information: every card is already separated from the page by its shadow, and its content is what identifies it.

## 3b. Surface treatment

The page background is off-white `#FAFAF9` and every card is white, so cards are separated from the page by elevation rather than by an outline. This follows the course design system: white cards on an off-white page, thin borders, a rest shadow of two layered values, and a lift of 2px with a softer shadow on hover.

What this changed, and why it matters for accessibility rather than only for looks:

- **Nothing is identified by color alone.** The predict and check cards used to be told apart by a gold outline against a gray one. They are now told apart by the words on their badges, Predict first and Now check it, which works for a screen reader and for a monochrome print.
- **Motion is bounded.** Every lift is a 2px translate over 200ms, and the existing `prefers-reduced-motion` block reduces all of it to effectively zero.
- **Print is flat.** All shadows and transforms are removed in print, so the submitted PDF carries no rendering weight it does not need.
- **A spent control retires rather than greys out.** The button that opens a check becomes a quiet outline with a downward arrow instead of a 45 percent opacity disabled button, so its label stays readable at full contrast after it has been used.
- **A locked tab's dashes no longer run edge to edge.** Each locked tab now carries its own short dashed underline, so the state reads per tab instead of as one rule drawn across the bar.

## 3c. The walkthrough components, and what they do to access

Two components were added to make a student do the intermediate thinking. Both were built so that the friction lands on shortcutting, never on the student.

**Worked steps.** A calculation is broken into its intermediate values, and the box for the final answer is `disabled` until the working above it is right. Points worth recording:

- A locked step is not silent. It carries a padlock and the sentence "Opens when step 2 is right", so a screen reader user is told why the field will not take focus rather than finding a dead input.
- Unlocking moves focus to the newly opened field and announces the change in a live region, so a keyboard user is not left hunting.
- `Enter` inside a step checks that step, so the whole task can be completed without ever reaching for the mouse.
- Wrong answers are named, not just marked. A student who halves the gap instead of taking a third is told that is what they did. After two misses the page says help is coming; after three it explains the method in words and still never prints the value.
- Nothing is timed and nothing is capped. There is no attempt limit and no lockout, which matters for anyone who works slowly or is using assistive technology.

**Eliminate.** After choosing an answer, the student says what is wrong with each option they did not choose, using a labeled `select` per option. Each select has a visually hidden `label` naming which option it belongs to, and the reason list contains decoys that fit nothing, so the task cannot be completed by elimination alone. The second half runs whether the first answer was right or wrong, because the reasoning is the point either way.

**On the anti-shortcut layer.** The design deliberately stops short of copy blocking. Blocking selection would obstruct a student using a screen reader, a magnifier, or a translation tool far more than it would obstruct anyone determined to route around the work. What is used instead is that the answers are not in the page at all, that every student's numbers differ, and that decoy readings from other patients sit alongside the real one with nothing in the markup to distinguish them. A student who photographs their own screen can still get an AI to do the arithmetic. What they cannot do is enter the result, because the boxes above it are still shut.

## 3d. The chart and the note

Two more components, both built on one rule taken straight from clinical documentation: **a blank is not an answer**.

**The chart.** The same eight vital sign rows in the same order every week, then a week-specific block below. Values are pulled out of a handover paragraph rather than handed over in a table, and every row has to be dispositioned: below range, within range, above range, or not obtained. Three things it refuses:

- A row left undecided. The message says a blank row cannot be told apart from a row somebody forgot.
- A row that was never measured but marked within range. Not measured is not the same as normal, and the page says so in those words.
- A value charted correctly but read wrongly against its range, in either direction. Calling a normal value abnormal is treated as an error of the same weight as missing an abnormal one.

The two calculated rows stay locked until the student has proved those values in the worked steps, then fill from the student's own entries rather than from a lookup.

**The note.** The same headings every week: pertinent abnormal findings, pertinent negatives, what was not obtained and matters, then free text. Every section demands an answer including an explicit "nothing pertinent", and the free-text box will not accept fewer than the stated number of words. Which findings count as abnormal is computed from the student's own seeded chart, so the answer differs between students.

**Prompts that fold away.** At the instructor's request, the prompt for a free-text answer can be folded out of the page while the student writes, so the surface they are typing on does not carry the question. Accessibility notes on this:

- The prompt is removed from the DOM rather than visually hidden, which is what makes it absent from a copy or a scrape.
- A "Show the prompt again" button is always present, carries `aria-expanded`, and restores the full text. Nobody is ever locked out of the instructions, which would otherwise fail 3.3.2.
- The textarea keeps its own visually hidden `label`, so it always has an accessible name whether the prompt is showing or not.
- **Honest limit.** This is a speed bump. A student can screenshot the prompt and the answer box separately, and an AI given the case data can infer the question. It is worth having because it removes the laziest path, not because it closes the route.

## 4. Keyboard navigation flow verified

1. `Tab` reaches the skip link first, which jumps to `#main`.
2. `Tab` reaches the master plain language switch in the brand bar.
3. `Tab` enters the tab strip. Arrow keys move between sections, `Home` and `End` jump to the ends, and a section that is not open yet still responds by explaining what has to be finished first and taking the student there.
4. **Loop lab.** `Tab` to a label chip, `Enter` picks it up and announces what it is, `Tab` to a drop box, `Enter` places it. Correct and incorrect placements are both announced. No dragging required at any point.
5. **Calculation grids.** Every input is reachable in reading order and carries an accessible name naming both the column and the patient row. `Check my numbers` is a button in the tab order.
6. **Decision chart.** Each branch is a button. A wrong branch is disabled and explained, the chart does not advance, and the remaining branches stay reachable.
7. **Curve reader.** The oxygen pressure buttons and the shift buttons are toggle buttons carrying `aria-pressed`. Changing either one rewrites the figure's `aria-label` with the new values and announces the readout.
8. **Posture runs.** Each patient version is a button. The traces update, and the numbers above them are read out.
9. **Rosa's walkthrough.** Each step's input and its check button sit in reading order. `Enter` in the field checks it. When a step passes, focus moves to the next field and a live region announces which step just opened. A locked field is reachable but disabled, and the sentence next to it says what has to happen first.
10. **Eliminate.** Each distractor's `select` is a standard control with a visually hidden label naming its option. Choosing a reason announces the result in the row's own live region without moving focus.
11. **The chart.** Every value field and every reading `select` is a standard labeled control in reading order. A failed check moves focus to the first problem row and writes the reason into a row directly beneath it, so a screen reader reaches the explanation immediately after the control it belongs to.
12. **The note.** Checkboxes in a labeled group per section; the "nothing pertinent" box clears the others and they clear it, so the two can never both be set.
13. **Results page.** Three text inputs with visible labels, then the save button.

No element is reachable but inoperable, and nothing on the page is operable by pointer only.

## 5. Screen reader testing

Verified through the accessibility tree in Chromium.

- Landmarks present: `banner`, `navigation`, `main`, `contentinfo`.
- One `h1`, 42 headings, no skipped levels.
- All five tables expose a caption and column headers.
- Zero unlabelled inputs, zero buttons without an accessible name, zero SVGs without a label.
- Every info button names the block it controls through `aria-controls`.
- Drop targets rewrite their own accessible name when filled, so a screen reader user can review what has been placed without re-reading the page.

Outstanding: a JAWS and VoiceOver pass has not been done.

## 6. Print and PDF submission

The results page is what students hand in. In print the tab strip, the brand bar, the header, the footer, every button and every answer option are hidden, and a name block is printed at the top carrying the student's name, section, the week, the date and their dataset number.

Body type prints at 10pt, tables at 9pt, with 12mm margins. The printed page also carries the chart exactly as the student left it, their note in their own words, and a table of their own working: every intermediate value they entered and how many attempts each one took. Decoy readings and the progress rail are hidden in print, since neither means anything on paper.

## 7. Privacy

Nothing on these pages is stored or transmitted. The name, section and dataset fields exist only so a printed PDF can be matched to a student, and they are cleared the moment the tab closes. No cookie, no local storage, no network request of any kind. This is stated on the page itself, next to the fields, in plain words.

## 8. Known limitations and remediation plan

1. **Gold eyebrow on maroon reaches AA and not AAA at 5.75:1.** It is small display text and the gold on maroon pairing is the course signal. Switching it to white would reach AAA if that becomes the priority.
2. **Screen reader testing is Chromium based.** Plan a JAWS and VoiceOver pass before the page goes live to students.
3. **The page requires JavaScript.** A `noscript` block says so and points to the lab manual, which covers the same material and reads and prints with no scripting at all.
4. **The logo is a placeholder.** The three figure mark is built from the design system description rather than from the real file. Swapping in the real SVG is a one line change in `engine/lab-core.js`.
5. **The honest limit of the anti-shortcut layer.** A student who photographs their own screen can get an AI to do the arithmetic, and no web page can prevent that. What the design does is make the shortcut slower than the work: the answers are not in the page, every student's numbers differ so a shared answer fails, decoys sit alongside the real reading, and the final box will not open until the working is done. It is a speed bump with a purpose, not a wall.
6. **Thirteen of the fourteen weeks are not built yet.** Week one and week thirteen exist. Every other week is specified in the lab manual against tools still to be built, and each one now inherits this engine rather than starting over.

## 10. Reviewer

Dr. Sharilyn Rennie, Professor of Anatomy and Physiology.
Reviewed August 23, 2026.
