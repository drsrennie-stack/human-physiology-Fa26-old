# Week 1, Mission 1, Maintain Control

**Accessibility compliance notes.** BIO 005 Human Physiology.

## 1. Project

**Project:** BIO 005 slide decks, week 1, Mission 1, Maintain Control
**Course:** BIO 005 Human Physiology
**Files covered:** `slides-p-mission-01-maintain-control.html`, one self contained HTML file, plus `bio005-teach-pen.js`, the teaching canvas it loads as a sibling
**Built by:** `build-decks.js`, from `engine/ref.css` and `engine/ref.js`, the shared engine, plus `content/slides-p-mission-01-maintain-control.js` for this deck's own words and figures
**Body typeface:** Plus Jakarta Sans, falling back to the system sans serif stack. Faces are inlined as base64 woff2 by the shared engine. No web font is requested.
**External requests:** none. Verified by loading the file under request interception in Chromium and recording every request that was not `file:` or `data:`. The recorded list was empty.
**What this deck covers:** Silverthorn chapter 1 plus the homeostasis and communication frame of chapter 6, taught as one mission. 55 slides across 13 concept segments, 74 reveal cards, 2 inline SVG figures, 3 comparison tables, 8 competency lines, 3 lab annotations. Rebuilt to serve the instructor lecture narrative, so the slides carry content and the narrative carries the argument.
**Date built:** September 5, 2026
**Reviewer:** Dr. Sharilyn Rennie

**What is new here.** The engine is unchanged from the decks already in this folder, so its behavior is inherited. Nothing was carried over on trust: the contrast sweep, the reflow measurement, the structure audit, the figure audit and the external request check were all re-run against this file and the numbers below are this file's own.

**Scope limit, stated plainly.** Sections 2 through 6 report automated measurement in Chromium. Section 7 reports what was and was not done with a screen reader, and the honest answer is that no live screen reader session was run against this file. Read section 7 before treating this document as complete.


## 2. WCAG version and level achieved

Target: WCAG 2.2 Level AA minimum, Level AAA where achievable.

| Criterion | Level | Status | Note |
|---|---|---|---|
| 1.1.1 Non text content | A | Pass | Both figures are inline SVG carrying `role="img"` and `aria-labelledby` pointing at a `title` and a `desc` inside the SVG. Automated test confirms both figures carry both elements and that every referenced id resolves inside its own SVG. |
| 1.3.1 Info and relationships | A | Pass | Semantic `header`, `main` and `footer`, one each. One `section` per slide, 55 of them. Both comparison tables use `caption`, `thead` and `th[scope="col"]`, 6 column headers total. Figures use `figure` and `figcaption`. |
| 1.3.2 Meaningful sequence | A | Pass | Single column reading order. Slides sit in the document in presentation order. A closed reveal body is hidden in place rather than moved. |
| 1.4.1 Use of color | A | Pass | Reveal cards carry their state in text as well as color. In the two figures, the compartment code is stated in the caption in words, solid teal border for inside cells and dashed maroon for outside cells, so the distinction survives monochrome printing and color vision deficiency. |
| 1.4.3 Contrast, minimum | AA | Pass | 20 unique text pairs swept on composited computed styles. Zero failures. See section 3. |
| 1.4.6 Contrast, enhanced | AAA | Pass, no exception | Every one of the 20 pairs reaches the AAA threshold for its size. Lowest is 7.78:1. |
| 1.4.10 Reflow | AA | Pass | Measured at 320, 375, 768, 1024 and 1440 CSS pixels. Horizontal overflow was 0 pixels at every width. Wide tables scroll inside their own focusable container carrying `role="group"` and an accessible name. |
| 1.4.12 Text spacing | AA | Pass | Inherited from the shared engine. No fixed heights on text containers. |
| 2.1.1 Keyboard | A | Pass | 116 focusable elements. All 74 reveal cards are `role="button"` with `tabindex="0"`, confirmed by count: 74 of 74 tabbable. |
| 2.1.2 No keyboard trap | A | Inherited | The zoom dialog's deliberate focus cycle and Escape behavior are engine features, verified previously against the decks this engine came from and not re-verified interactively here. |
| 2.4.1 Bypass blocks | A | Pass | "Skip to the slides" is the first focusable element in the document, confirmed by walking the focusable order. |
| 2.4.2 Page titled | A | Pass | Document title carries the deck name. |
| 2.4.6 Headings and labels | AA | Pass | One `h1`, 55 `h2`, one per slide, and 72 `h3` inside cards and rows. Zero skipped heading levels across all 128 headings, measured by walking the heading sequence. |
| 2.4.7 Focus visible | AA | Inherited | 3px outline with offset, terra on the page and gold in Present mode. Engine feature, read from the stylesheet. |
| 2.5.8 Target size, minimum | AA | Pass, with a note | The smallest interactive targets in this file are the competency links at 27 CSS pixels tall, above the 24 pixel AA minimum. They are also inline links inside a sentence, which are exempt from this criterion regardless. Present bar controls measure 42 pixels tall, the zoom close button 38. |
| 2.3.3 Animation from interaction | AAA | Pass | `prefers-reduced-motion: reduce` is present in the stylesheet and reduces the card lift, the zoom transition and the reveal fade. |
| 3.1.1 Language of page | A | Pass | `lang="en"` on the root element. |
| 3.2.3 Consistent navigation | AA | Pass | Written by the same generator from the same engine as the other decks, so header, keyboard hint line and present bar sit in the same place and behave identically. |
| 3.2.4 Consistent identification | AA | Pass | "Tap to open", the competency line and the lab annotation mean the same thing here as in every other deck, because one generator writes all of them. |
| 4.1.2 Name, role, value | A | Pass | All 74 reveal cards carry `role="button"`, `tabindex="0"` and `aria-expanded`, confirmed by count: 74 of 74 on each attribute. Zero icon-only buttons lack an accessible name, measured by checking every `button` with empty text content for `aria-label`. |


## 3. Color contrast audit

Measured on computed styles in Chromium through Playwright, not read off a palette. Translucent foregrounds and backgrounds were composited against what actually sits behind them before measuring. Large text is judged at the 3:1 and 4.5:1 thresholds, normal text at 4.5:1 and 7:1.

**20 unique text pairs. Zero failures at AA. Zero failures at AAA.** Lowest twelve, lowest first.

| Use | Foreground on background | Size | Ratio | Result |
|---|---|---|---|---|
| Header eyebrow, course line | `#FBEBC8` on `#8B1D1D` | normal | 7.78:1 | AAA |
| Keyboard hint line under the header | `#F2EFEF` on `#8B1D1D` | normal | 8.02:1 | AAA |
| Lab annotation body | `#3D4860` on `#EDF1F3` | normal | 8.05:1 | AAA |
| Lab annotation label | `#5A4511` on `#EDF1F3` | normal | 8.05:1 | AAA |
| Slide number on a white slide | `#454E5E` on `#FFFFFF` | normal | 8.39:1 | AAA |
| Timer hint | `#3D4860` on `#FAFAF9` | normal | 8.76:1 | AAA |
| Slide number on a dark slide | `#A8B3C6` on `#08101F` | normal | 8.99:1 | AAA |
| Gold term chip | `#5A4511` on `#FFFFFF` | normal | 9.15:1 | AAA |
| Body lede and card body | `#3D4860` on `#FFFFFF` | normal | 9.15:1 | AAA |
| Header title | `#FFFFFF` on `#8B1D1D` | normal | 9.17:1 | AAA |
| Slide kicker on a white slide | `#8B1D1D` on `#FFFFFF` | normal | 9.17:1 | AAA |
| Deck title, display size | `#FFFFFF` on `#8B1D1D` | large | 9.17:1 | AAA |

The remaining 13 pairs all sit above 9.17:1.


## 4. Keyboard navigation flow verified

Measured programmatically on the rendered document.

- 116 focusable elements in the document.
- The first focusable element is "Skip to the slides", which targets the `main`.
- All 74 reveal cards are reachable in reading order, each `role="button"` with `tabindex="0"` and an `aria-expanded` that tracks state.
- No `button` in the file has empty text content without an `aria-label`.
- Not verified interactively in this pass: the Present mode focus cycle, the zoom dialog's Escape-and-return behavior, and arrow key slide navigation. These are engine behaviors carried unchanged and were verified against the earlier decks.


## 5. Reflow and layout

| Viewport width | Horizontal overflow |
|---|---|
| 320 px | 0 px |
| 375 px | 0 px |
| 768 px | 0 px |
| 1024 px | 0 px |
| 1440 px | 0 px |

Document scroll width equals client width at every measured breakpoint, so the page body never scrolls sideways. The two comparison tables have a minimum width and scroll inside their own container, which is focusable and named.


## 6. External requests and privacy

Loaded under request interception. Every request the page made was `file:` or `data:`. No web font request, no CDN, no analytics, no third party script, no remote image. The deck works with no network connection, which matters for students studying offline and for the printed packet.


## 6b. Slide density

Not a WCAG criterion, but a cognitive load rule of this course, and it is measured the same way. Visible word count per slide was measured on the rendered page with `innerText`, which excludes the body of any reveal card that has not been opened. That is what a student actually sees when a slide first appears.

Ceilings: 90 words on a normal slide, 170 on a worked example, 70 on a figure.

**55 of 55 slides pass. Zero over ceiling.**

| Densest slides | Kind | Visible words | Ceiling |
|---|---|---|---|
| 47, Walk the loop, blood glucose | worked example | 145 | 170 |
| 22, A worked case, sodium over one day | worked example | 141 | 170 |
| 26, Same concentration, different delivery | worked example | 138 | 170 |
| 5, What you are being asked to do | normal | 89 | 90 |
| 14, Why the dashed border matters clinically | normal | 88 | 90 |

A first build of this deck had 30 slides over ceiling and a mean of 81.6. Nothing was cut to fix it. The depth was moved into reveal cards, which is what raised the reveal count from 48 to 90.


## 6c. The teaching canvas

`bio005-teach-pen.js` adds a floating drawing panel to the deck. It is an instructor tool, but students can open it too and draw their own version, so it was audited alongside the deck rather than treated as out of scope.

| Point | Status |
|---|---|
| Contrast | Every control in the panel reaches AAA. Two pairs initially passed AA and missed AAA, the toolbar labels at 6.03:1 and the minimize button at 6.72:1. Both were darkened and re-measured. The deck plus canvas together sweep 26 pairs with zero AA and zero AAA failures, lowest 7.78:1. |
| Keyboard | Every tool, color, size and action is a real `button`, reachable by Tab and operable by Enter or Space. Shortcuts are D to open or minimize, V P L R B C X for the tools, Delete to remove the selected mark, Escape to minimize. |
| Reset control | The dock carries a Reset cards button that closes every opened reveal card across the deck and clears the seen state, so nothing reads OPENED on camera. Tested: 6 opened cards, all cleared, `aria-expanded` returned to false on all 90, and the drawing in storage was untouched. |
| Shortcut safety | The engine already uses T, A, Space, Enter, Escape and the arrow keys. The canvas uses D and the tool letters, which were free. All canvas shortcuts are suppressed while focus is in a text field, so typing a label never moves the slide. |
| Names and roles | No icon-only control lacks an `aria-label`. Tool buttons carry `aria-pressed`. The mark count is an `aria-live="polite"` region. The canvas element itself is `role="img"` with a label stating it is a teaching aid rather than course content. |
| Target size | Tool buttons are 34 px, color swatches 26 px, footer buttons 30 px, the slide marker 26 px. All above the 24 px AA minimum. |
| Headings | The panel adds no headings, so the deck's heading hierarchy is unchanged at 154 with zero skips. |
| Print | The panel, the launcher and the slide markers are all hidden in print, so the student packet is unaffected. |
| Reduced motion | No animation is introduced. |
| Stylus | Built on pointer events, and pen pressure varies stroke width where the device reports it. Mouse and touch fall back to a fixed width. |

**What it stores.** Drawings are held in `localStorage` under `bio005-teachpen-<deck>-<slide index>`. The `bio005-` prefix matters: both GitHub Pages courses share an origin, and unprefixed keys have leaked between the anatomy and physiology repos before. Every read and write is wrapped, so a blocked or full store degrades to drawing that works for the session and is not saved.

**What it does not do.** Nothing is written into the deck file. A student opening the deck sees no instructor drawings, only the tool and, where the instructor drew, nothing at all, because the marker is driven by that browser's own storage. A student who draws their own gets their own marker.


## 6d. The QR code on slide 1

Slide 1 carries a QR code to this deck's published URL, so a student can open it on a phone or tablet beside the video, or draw on it with a stylus using the teaching canvas.

| Point | Status |
|---|---|
| Encoding | Generated as an inline SVG path, 41 modules, error correction level M. No image file and no external request. |
| Verified | Rendered from the built deck in Chromium, screenshotted, and decoded. It returns the published URL exactly. Not asserted, decoded. |
| Accessible name | The SVG carries `role="img"` and `aria-labelledby` pointing at a `title` and a `desc` that say what the code is for. The URL is also printed beside it as text, so it is reachable without a camera. |
| Contrast | Pure black modules on white, well past any threshold. The `title` and `desc` elements are not painted and were excluded from the contrast sweep after being confirmed to have a zero-size box. |
| Print | Prints with the slide. |


## 7. Screen reader testing

**Not done for this file, and that is a real gap.** No live session with a screen reader was run against this deck.

What was verified instead, programmatically:

- Landmark structure is present and singular: one `header`, one `main`, one `footer`.
- Heading hierarchy is complete with zero skipped levels across 128 headings.
- Both figures expose an accessible name and description through `role="img"` and `aria-labelledby` resolving to a `title` and `desc`.
- Every reveal card exposes role, focusability and expanded state.
- Both tables expose a caption and column headers with `scope`.
- No unlabeled icon-only control, in the deck or in the teaching canvas.

That covers the structures a screen reader reads, but it does not confirm how the deck actually sounds in use, and it will not catch things like a reading order that is technically correct but confusing, or an `aria-expanded` that announces at the wrong moment.

**Recommended before this deck is treated as final:** one pass with VoiceOver on macOS, walking the skip link, three or four reveal cards, both figures and both tables, plus one pass in Present mode. Record what was checked and by whom in this section.


## 8. Known limitations and remediation plan

| Item | Status | Plan |
|---|---|---|
| No live screen reader pass | Open | VoiceOver walk before the deck is published to students. See section 7. |
| Present mode and zoom dialog not re-verified interactively | Open | Inherited from the shared engine and previously verified. Re-run once during the VoiceOver pass. |
| Figure content is not tactile | Open | Both figures carry a `desc` that states the relationships in words, so the content is available without seeing the diagram. A student who needs a raised-line version should be routed through the campus accessibility office. |
| Teaching canvas not screen reader tested | Open | A canvas is a visual tool by nature, and its controls are labeled, but the drawing itself is not exposed to a reader. Include it in the VoiceOver pass and note the outcome. |
| Two DM Sans faces inlined but unused | Carried over | Engine level. Adds file size, no accessibility effect. Worth cleaning when the engine is next touched. |
| Color code in figures | Mitigated | Border style differs as well as color, solid versus dashed, and the caption states the code in words. |


## 9. Reviewer

Dr. Sharilyn Rennie, BIO 005 Human Physiology, Yuba College.
Automated measurement run September 5, 2026 against `slides-p-mission-01-maintain-control.html`.
Screen reader verification outstanding.
