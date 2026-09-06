# Week 2, Membrane Potential

**Accessibility compliance notes.** BIO 005 Human Physiology.

## 1. Project

**Project:** BIO 005 slide decks, week 2, Membrane Potential
**Course:** BIO 005 Human Physiology
**File covered:** `out/slides-p-membrane-potential.html`, one self contained HTML file
**Built by:** `build-decks.js`, from `engine/ref.css` and `engine/ref.js`, which are the engine of the existing Introduction to Physiology deck, plus `content/slides-p-membrane-potential.js` for this deck's own words and figures
**Body typeface:** Plus Jakarta Sans, falling back to the system sans serif stack. Four faces are inlined in the file as base64 woff2: DM Sans 400 and 700, Plus Jakarta Sans 600 and 800. The stylesheet sets Plus Jakarta Sans as the single family, so the two DM Sans faces are carried in the file and not currently selected by any rule.
**External requests:** none. Verified by loading the file with request interception. No web font request, no CDN, no image, no script fetched from anywhere.
**What this deck covers:** Ion gradients, equilibrium potentials, the Nernst prediction and what a real resting potential does. 34 slides, 38 reveal cards, 4 inline SVG figures, 31 competency lines, 6 lab annotations, 5 slides carrying a suggested time, 3 comparison tables.
**Date built:** August 23, 2026
**Reviewer:** Dr. Sharilyn Rennie

**What is shared and what is new.** Sections 2, 3, 3b, 4, 5, 6 and 7 describe the shared engine, which all five decks in this generation inherit unchanged from the Introduction to Physiology deck. Section 1, section 3c and section 8 are this deck's own. Nothing in the shared sections was carried over on trust: the contrast sweep, the reflow measurement, the keyboard walk, the figure audit and the print check were all re-run against this file.

One finding about the deck this engine came from is recorded in section 3, because it is a contrast finding. A second, about external requests, is recorded in full in `quantitative-skills.compliance.md`.


## 2. WCAG version and level achieved

Target: WCAG 2.2 Level AA minimum, Level AAA where achievable.

| Criterion | Level | Status | Note |
|---|---|---|---|
| 1.1.1 Non text content | A | Pass | The 4 figures in this deck are inline SVG carrying `role="img"` and `aria-labelledby` pointing at a `title` and a `desc` inside the SVG. Automated test confirms every referenced id resolves and that every figure has both elements. The brand mark is the only other graphic; it sits inside a link that carries its own `aria-label`, and the SVG is `aria-hidden="true"` and `focusable="false"` so it is not announced twice. |
| 1.3.1 Info and relationships | A | Pass | Semantic `header`, `main` and `footer`, with one `section` per slide. All three comparison tables use `thead`, `th` and a `caption`. Figures use `figure` and `figcaption`. |
| 1.3.2 Meaningful sequence | A | Pass | Single column reading order. Slides sit in the document in the order they are presented, and Present mode only changes which one is displayed, never the order. A closed reveal body is hidden in place, not moved. |
| 1.4.1 Use of color | A | Pass | A reveal card that has not been opened says "Tap to open". Once opened it shows a tick and the word "opened". The state is in the text as well as in the background, so color never carries it alone. The colored cells in the comparison tables are words already, and read the same in monochrome. |
| 1.4.3 Contrast, minimum | AA | Pass | See section 3. Zero failures across the full sweep, in three interaction states. |
| 1.4.6 Contrast, enhanced | AAA | Pass, no exception | Every text pair reaches 7:1. The lowest is the gold eyebrow on the maroon header at 7.78:1. This is the one place these decks differ from every other document in this folder, all of which report that pair at 5.75:1 and AA only. |
| 1.4.10 Reflow | AA | Pass | Measured at 320, 375, 768, 1024 and 1440 CSS pixels. Document scrollWidth equals viewport width at every one, so the page body never scrolls sideways. Wide tables scroll inside their own container, which is focusable and carries `role="group"` with an accessible name. |
| 1.4.11 Non text contrast | AA | Pass, with a note on method | The focus indicator is a 3px `#8B1D1D` outline at 9.17:1 on white, switching to `#DCB45C` on navy at 9.71:1 in Present mode. Card and table hairlines are `#DCE0E6`, which is decorative separation rather than a control boundary: every card also carries a shadow, and its content is what identifies it. These non text pairs were read from the token set and reasoned about, not swept the way the text pairs in section 3 were. |
| 1.4.12 Text spacing | AA | Pass | No fixed heights on text containers. Line height 1.5 in body copy and 1.6 to 1.75 in cards, lists and tables. Read from the stylesheet. |
| 2.1.1 Keyboard | A | Pass | See section 4. Every one of the 38 reveal cards is a `role="button"` with `tabindex="0"`, reachable in reading order and operable with Enter or Space. Verified by automated test on this file. |
| 2.1.2 No keyboard trap | A | Pass | One deliberate trap, which is what a modal dialog is for: while the zoom dialog is open, Tab cycles inside it. Escape closes it and focus returns to the card that opened it. Nothing else on the page captures focus. |
| 2.4.1 Bypass blocks | A | Pass | "Skip to the slides" is the first focusable element and jumps to `#deck`, which is the `main`. Verified by test. |
| 2.4.3 Focus order | A | Pass | Follows reading order. Opening the zoom dialog moves focus into it; closing it returns focus to the originating card. |
| 2.4.6 Headings and labels | AA | Pass | One `h1`, 34 `h2`, one per slide, and 40 `h3` inside cards and rows. No skipped levels. |
| 2.4.7 Focus visible | AA | Pass | 3px outline with 3px offset on every focusable element, terra on the page and gold in Present mode where terra would sit on navy. |
| 2.5.8 Target size, minimum | AA | Pass | The present bar buttons are at least 44 by 44. The zoom close button is 38px tall and the timer buttons, the smallest controls in the file, are 34px. A reveal card is a full card sized target. Read from the stylesheet rather than measured in the browser. |
| 2.2.1 Timing adjustable | A | Pass | Nothing is timed, capped or locked. The 5 slides that carry a suggested time set the presenter's timer when they are shown. The timer counts, and nothing happens when it reaches zero. |
| 2.3.3 Animation from interaction | AAA | Pass | The card lift, the zoom transition, the reveal fade and the timer pulse are all reduced to effectively zero under `prefers-reduced-motion: reduce`. |
| 3.2.3 Consistent navigation | AA | Pass | All five decks in this generation are written by one script from one engine, so the header, the keyboard hint line, the present bar and the timer are in the same place with the same behavior on every deck. |
| 3.2.4 Consistent identification | AA | Pass | "Tap to open", the tick and "opened", the competency line and the lab annotation mean the same thing on every slide and in every deck, because one generator writes all of them. |
| 4.1.2 Name, role, value | A | Pass | Every reveal card and row is `role="button"` with `tabindex="0"` and an `aria-expanded` that tracks state in both directions. The zoom layer is `role="dialog"` with `aria-modal="true"` and an accessible name. The four icon only controls, previous slide, next slide, take thirty seconds off and add thirty seconds, each carry an `aria-label`. |

## 3. Color contrast audit

Measured on computed styles in Chromium 141 through Playwright, not read off a palette. Translucent surfaces were composited against what sits behind them before measuring, so the present bar and the timer face are measured against the color that actually renders rather than the color that was written. The sweep ran in three interaction states: cards at rest, cards marked opened, and cards open.

**Zero failures at AA. Zero failures at AAA.** Every text pair in the deck, lowest ratio first.

| Use | Foreground on background | Ratio | Result |
|---|---|---|---|
| Header eyebrow and brand subtitle | `#FBEBC8` on `#8B1D1D` | 7.78:1 | AAA |
| Keyboard hint line under the header | `#F2EFEF` on `#8B1D1D` | 8.02:1 | AAA |
| Slide number on a paper slide | `#454E5E` on `#FAFAF9` | 8.03:1 | AAA |
| Table caption written as a sentence | `#3D4860` on `#EDF1F3` | 8.05:1 | AAA |
| Lab annotation label | `#5A4511` on `#EDF1F3` | 8.05:1 | AAA |
| Card label and large stat on an opened card | `#8B1D1D` on `#EDF1F3` | 8.06:1 | AAA |
| Teal card label on an opened card | `#1F4E55` on `#EDF1F3` | 8.11:1 | AAA |
| Slide number on a white slide | `#454E5E` on `#FFFFFF` | 8.39:1 | AAA |
| Clock hint | `#3D4860` on `#FAFAF9` | 8.76:1 | AAA |
| Slide kicker | `#8B1D1D` on `#FAFAF9` | 8.78:1 | AAA |
| Slide number on a dark slide | `#A8B3C6` on `#08101F` | 8.99:1 | AAA |
| Gold term chip | `#5A4511` on `#FFFFFF` | 9.15:1 | AAA |
| Body lede and card body | `#3D4860` on `#FFFFFF` | 9.15:1 | AAA |
| Header title, large and normal | `#FFFFFF` on `#8B1D1D` | 9.17:1 | AAA |
| Type chip and memory hook line | `#8B1D1D` on `#FFFFFF` | 9.17:1 | AAA |
| Teal term chip | `#1F4E55` on `#FFFFFF` | 9.21:1 | AAA |
| Teal hook icon | `#FFFFFF` on `#1F4E55` | 9.21:1 | AAA |
| Skip link | `#08101F` on `#DCB45C` | 9.71:1 | AAA |
| Type chip letter | `#DCB45C` on `#08101F` | 9.71:1 | AAA |
| Present bar slide counter | `#DDE2EA` on `#252C39` | 10.76:1 | AAA |
| Lede on a dark slide | `#DDE2EA` on `#08101F` | 14.62:1 | AAA |
| Timer buttons | `#FFFFFF` on `#16233C` | 15.67:1 | AAA |
| Timer readout | `#FFFFFF` on `#171E2C` | 16.69:1 | AAA |
| Body text on an opened card | `#08101F` on `#EDF1F3` | 16.73:1 | AAA |
| Body text on a paper slide | `#08101F` on `#FAFAF9` | 18.21:1 | AAA |
| Dark slide text and white slide text | `#FFFFFF` on `#08101F`, and `#08101F` on `#FFFFFF` | 19.02:1 | AAA |

**The AAA exception in the index is closed by this deck.** `compliance/index.md` records one shortfall running through every document in the folder: gold eyebrow on maroon at 5.75:1, which meets AA but not AAA. This deck uses `#FBEBC8` on `#8B1D1D`, which measures 7.78:1 and meets AAA. It is the same signal, gold on maroon, at a lighter gold. That is the one thing in this document that differs from every other document in the folder.

**Three defects were found during the build and fixed before release.**

1. **The slide number was `#555F70`, which measured 6.45:1 on white.** It met AA and failed AAA. Darkened to `#454E5E`, now 8.39:1 on white and 8.03:1 on a paper slide.
2. **The gold card label was `#6B5214`.** On a white card that measures 7.39:1 and passes. Once a card is marked opened its background becomes `#EDF1F3`, and the same label drops to 6.50:1 and fails AAA. This is a state dependent failure that a single pass sweep would not catch, which is exactly why the sweep runs in three states. Darkened to `#5A4511`, now 8.05:1 on the opened card and 9.15:1 on white. **The same defect is still present in the existing Introduction to Physiology deck, which still uses `#6B5214`.** It should be corrected there.
3. **The lab annotation label had the same problem and took the same color.** It sits on the same `#EDF1F3` tint at rest, so it was failing AAA in its ordinary state rather than only in an opened one.

## 3b. The reveal cards, Present mode and the zoom dialog

This section describes the shared engine. Every deck in this generation behaves the same way, and all of it was re-tested against this file.

**Reveal cards.** Every card and every icon row is a `role="button"` with `tabindex="0"` and an `aria-expanded` that tracks state in both directions. The card's heading stays visible and only its body hides, so a card reads as a prompt with a hidden payoff rather than as an empty box. The practical consequence for access is that a screen reader user can survey a whole slide, heading by heading, without opening anything, and then open the one that matters.

**State is signaled by text as well as by color.** An unopened card carries the words "Tap to open". An opened one carries a tick and the word "opened". The background also changes, but the background is never the only signal.

**Present mode** is entered from a button in the header or by putting `present` in the URL. It hides the page chrome, shows one slide at a time, and puts a progress bar and a present bar on screen. Exiting restores the scrolling document and returns focus to the Present button.

**The zoom dialog** is what a card opens into in Present mode. It is `role="dialog"` with `aria-modal="true"` and an accessible name. Focus moves into it when it opens, Tab is trapped inside it while it is open, Escape closes it, and focus returns to the card that opened it. Verified by automated test.

**Without JavaScript, the deck is still a deck.** A `noscript` block says in plain words that the slides read and print without scripting, that every box is already open, what is lost (Present mode, click to open, the timer), and where the same material is written out. The block also carries a style rule that forces every reveal body open, so the fallback is a working document rather than a message about one.

## 3c. What is new in this deck

**4 inline SVG figures.** Each carries a `viewBox` and no fixed width or height, so it scales with the column, plus `role="img"` and `aria-labelledby` pointing at a `title` and a `desc` inside the SVG. The `desc` describes the shape and the landmark values rather than repeating the title, so a student using a screen reader gets the numbers rather than only the topic. Automated test confirms that every referenced id resolves, that every figure has both a `title` and a `desc`, and that no text in any figure computes below 13px.

1. Where the four main ions sit across the cell membrane
2. Resting potential against extracellular potassium, measured against the Nernst prediction
3. The four channel types and what opens each one
4. One membrane potential tracing with every phase labeled

**The three comparison tables.**

- Typical ion concentrations in a human cell, in mmol/L
- Equilibrium potentials calculated from those concentrations
- The vocabulary of potential changes, each defined by a direction rather than a number

Each sits in a focusable container carrying `role="group"` and an accessible name taken from its caption, so a wide table scrolls on its own without the page body scrolling and without needing a pointer. The captions in this deck are written as sentences rather than as short labels, which is why they are measured in section 3 as body sized text rather than as a display label.

**31 competency lines.** Each slide that maps to the course competency list ends with a line naming the competencies it covers, each one a link into `competency-study-guide.html`. The links are relative to the deck's own folder, in the same way as the dock script named in section 8. In print they render as plain text with no underline.

**6 lab annotations.** A short block headed "You will do this in lab", tying the slide to the bench work. On screen it sits on the `#EDF1F3` tint with a gold left edge. In print the tint is dropped and it prints with a plain border, so it stays legible in monochrome.

## 4. Keyboard navigation flow verified

Walked end to end with the keyboard only, and confirmed by automated test on this deck rather than assumed.

1. `Tab` from page load reaches the skip link first. `Enter` jumps to `#deck`, the `main`.
2. `Tab` then reaches the brand mark link, then the Present button.
3. Present mode is entered from that button, or by loading the file with `present` in the URL, which is how it is embedded.
4. On any slide, `Tab` moves through the reveal cards in reading order. `Enter` or `Space` opens the focused card and flips its `aria-expanded`; the same keys close it.
5. `Right arrow`, `Space` and `Page Down` each open the next unopened card on the current slide, and once every card on that slide is open they advance to the next slide.
6. `Left arrow` closes an open card first, then goes back a slide.
7. `A` opens or closes everything on the current slide at once.
8. `T` shows and hides the timer, and moves focus to its Start button when it appears.
9. `Escape` closes the zoom dialog if one is open, and exits Present mode if none is.
10. Inside the zoom dialog focus moves to the Close button on open, `Tab` and `Shift Tab` cycle within the dialog, and closing returns focus to the card that opened it.
11. Each comparison table's scroll container is focusable and carries an accessible name, so a wide table can be scrolled from the keyboard.
12. The present bar buttons, previous, next, Timer and Exit, are all in the tab order and all carry a name.

No element is reachable but inoperable, and nothing on the deck is operable by pointer only.

## 5. Screen reader testing

Verified through the accessibility tree in Chromium and by structural audit of the file.

- Landmarks present: `banner`, `main`, `contentinfo`. There is no `navigation` landmark, because the deck is one linear document with no section list to navigate.
- One `h1`, 34 `h2`, one per slide, and 40 `h3`. No skipped levels.
- All three comparison tables expose a caption and column headers.
- All 4 figures expose `role="img"` with a `title` and a `desc`, and the `desc` gives the landmark values rather than repeating the title.
- Every reveal card exposes `role="button"` and an `aria-expanded` that changes when it opens and again when it closes.
- Zero buttons without an accessible name. The four icon only controls carry `aria-label`.
- The zoom dialog exposes `role="dialog"`, `aria-modal="true"` and a name.

Two honest notes on what this does and does not cover. There are no live regions in the deck apart from the timer readout, and a slide change in Present mode is not announced; this is recorded as a known limitation in section 8. And a pass with JAWS and with VoiceOver on a real machine has not been done, on this deck or on any other deliverable in this folder.

## 6. Print behavior

Verified with print media emulation rather than assumed from the stylesheet.

- **Zero reveal bodies remain hidden.** A printed deck is complete. Nothing that is behind a click on screen is missing on paper.
- The page header, the keyboard hint line, the present bar, the progress bar, the timer, the zoom dialog and its backdrop, and the skip link are all hidden.
- One slide per page.
- The competency links print as plain text without underlines, so a printed slide does not carry blue underlined text that cannot be clicked.
- The lab annotation prints with a plain border instead of its tint.
- Shadows are dropped and the footer prints as black on white.

## 7. Privacy

Nothing on this deck is stored or transmitted. No cookies, no local storage, no analytics, no network calls, no form fields. There is nothing to identify a student and nothing that could be sent anywhere if there were. The deck is a file that renders and prints, and that is all it does.

## 8. Known limitations and remediation plan

1. **Screen reader verification is through the Chromium accessibility tree and by structural audit.** No JAWS or VoiceOver pass has been done. This matches every other document in this folder and should happen before release.
2. **Present mode does not announce a slide change.** Moving between slides swaps which section is displayed and rewrites the counter in the present bar. Neither moves focus and neither sits in a live region, so a screen reader user driving Present mode from the keyboard is not told the slide changed. Read as a scrolling document, which is the default and needs no script, the deck has no such gap: every slide is in the page in reading order. This was read from the engine rather than heard, and it belongs in the JAWS and VoiceOver pass above.
3. **The deck loads `bio005-dock.js` by relative path.** Outside the repository root that request fails, harmlessly, and the deck works without it. The competency links are relative in the same way and expect `competency-study-guide.html` beside the file.
4. **The brand mark is a placeholder.** It is the same three figure mark used across the site, reconstructed from the design system rather than from the real file. Cosmetic, and it should be swapped before release.
5. **The keyboard hint line uses arrow glyphs to name the arrow keys.** That is a user interface label for a key rather than prose, and it matches the existing Introduction to Physiology deck. The same keys are named in words in section 4 of this document.
6. **The timer is a teaching aid, not a limit.** Nothing on this deck is timed, capped or locked. The timer counts down for the person presenting, and nothing at all happens when it reaches zero. This is consistent with the standing decision in `compliance/index.md` that nothing in the course is timed or capped.

## 10. Reviewer

Dr. Sharilyn Rennie, Professor of Anatomy and Physiology.
Reviewed August 23, 2026.
