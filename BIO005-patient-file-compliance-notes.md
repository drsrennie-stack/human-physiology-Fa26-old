# BIO 005 Patient File, accessibility compliance notes

**Deliverable:** The Patient File (progressive simulated patient)
**Annotation:** `BIO005-patient-file`

## 1. Project

**Course:** BIO 005 Human Physiology, Yuba College, section BIOL-5-D9286
**Files covered:** `BIO005-patient-file.html` (single self contained file, 110 KB, no external dependencies except the Google Fonts stylesheet, which degrades to a system stack)
**Build source:** `sim-data.js` and `template.html` via `build-sim.js`
**Date:** August 22, 2026
**Reviewer:** Dr. Sharilyn Rennie

---

## 2. WCAG version and level achieved

Target: WCAG 2.2 Level AA minimum, Level AAA where achievable.
**Result: AA met on all applicable criteria. AAA met for contrast (1.4.6) on every text and background pair in the interface.**

| Criterion | Level | Status | Evidence |
|---|---|---|---|
| 1.1.1 Non text content | A | Met | Drawing canvas carries `role="img"` and an `aria-label`, and a written description of the figure is a required field, not an optional one. The token meter carries `role="img"` with a text label giving the count. |
| 1.3.1 Info and relationships | A | Met | Semantic `main`, `nav`, `section`, `footer`. Every input has a `label` bound by `for` and `id`. Submitted answers render as `dl`, `dt`, `dd`. Order results use a definition list, not layout tables. |
| 1.3.2 Meaningful sequence | A | Met | Single column DOM order matches visual order at every breakpoint. |
| 1.3.5 Identify input purpose | AA | Met | `autocomplete="off"` on the name and code fields, which are not personal data fields in the autofill taxonomy. |
| 1.4.1 Use of color | A | Met | Week states are signaled by border style and text, not color alone: locked is a dashed border, open is a solid border, submitted carries a text badge reading "Submitted". Order availability is signaled by button text ("Order", "Ordered", "Too costly"). |
| 1.4.3 Contrast minimum | AA | Met | See section 3. Lowest measured ratio in the interface is 7.39:1 against a 4.5:1 requirement. |
| 1.4.4 Resize text | AA | Met | All sizing in rem and relative units. Verified legible and non overlapping at 200 percent zoom. |
| 1.4.6 Contrast enhanced | AAA | Met | Every pair is at or above 7:1 for normal text and 4.5:1 for large text. |
| 1.4.10 Reflow | AA | Met | No horizontal scrolling at 320, 375, 768, 1024 or 1440 CSS pixels. Measured `scrollWidth` equals viewport width at every one. |
| 1.4.11 Non text contrast | AA | Met | Control borders use `#3D4860` on white (9.15:1) and `#454E5E` for the locked state (8.39:1). Focus indicator is a 3 px `#6B5214` outline on light surfaces and `#DCB45C` on dark, both above 3:1 against their backgrounds. |
| 1.4.12 Text spacing | AA | Met | Line height 1.55, no fixed heights on text containers. |
| 2.1.1 Keyboard | A | Met | Every interactive element is reachable and operable from the keyboard. The one exception is the freehand drawing surface, which is inherently a pointer gesture; the required written description is the keyboard equivalent and carries the same marks. See section 6. |
| 2.1.2 No keyboard trap | A | Met | The order dialog is a native `dialog` with `showModal`. Tab cycles within it and Escape closes it. Verified. |
| 2.4.1 Bypass blocks | A | Met | Skip link is the first tab stop and moves focus to `main`. |
| 2.4.3 Focus order | A | Met | Focus enters the dialog on the first field and returns to the originating Order button on close. Verified by test. |
| 2.4.6 Headings and labels | AA | Met | Numbered step headings describe the step. No heading level is skipped anywhere in the application. |
| 2.4.7 Focus visible | AA | Met | `:focus-visible` outline, 3 px, 2 px offset, on every focusable element. Never suppressed. |
| 2.4.11 Focus not obscured | AA | Met | No sticky headers or overlays. The modal dims the page behind it and holds focus. |
| 2.5.3 Label in name | A | Met | Every `aria-label` begins with the visible text, for example "Order Chief concern in the patient's own words, costs 1". |
| 2.5.7 Dragging movements | AA | Met with exception | Drawing is a dragging movement with no single pointer alternative. The written description is the non dragging path to the same credit. Documented in section 6. |
| 2.5.8 Target size minimum | AA | Met | Smallest interactive target is the Order button at 32 px high by 74 px wide. |
| 3.2.2 On input | A | Met | No control changes context on input. Validation is advisory text in an `aria-live` region and never moves focus. |
| 3.3.1 Error identification | A | Met | Errors render as text next to the control that caused them and state what is wrong and by how much, for example "Write at least 120 characters. You have 47." |
| 3.3.2 Labels or instructions | A | Met | Every field carries a persistent hint describing what is expected, including the minimum length. |
| 3.3.3 Error suggestion | AA | Met | Errors name the remedy, not just the fault. |
| 3.3.7 Redundant entry | AA | Met | The name is entered once and reused. Prior work is restored from browser storage on return. |
| 4.1.2 Name role value | A | Met | Collapsible sections use `aria-expanded` and `aria-controls`. Week buttons use `aria-current`. No control lacks an accessible name. Verified by test. |
| 4.1.3 Status messages | AA | Met | The blocker list before "Close the week", the token counters, and the copy confirmation are `aria-live="polite"`. |

Not applicable: 1.2.x (no audio or video), 1.4.2 (no audio), 2.2.x (no time limits, nothing moves or auto updates), 2.3.x (nothing flashes), 3.1.2 (single language).

---

## 3. Color contrast audit

Every distinct foreground and background pair rendered by the interface, measured on computed styles in Chromium against the first opaque ancestor background. Sweep covers the gate, the week rail in all three states, the order menu expanded, the commit dialog, a revealed result, the drawing panel, and a submitted week.

| Foreground | Background | Where | Size | Ratio | AA | AAA |
|---|---|---|---|---|---|---|
| `#6B5214` gold ink | `#FFFFFF` | Unlocked week button | normal | 7.39:1 | Pass | Pass |
| `#FBEBC8` gold lite | `#8B1D1D` terra | Header eyebrow | normal | 7.78:1 | Pass | Pass |
| `#3D4860` muted | `#EDF1F3` navy tint | Note panels, result meta | normal | 8.05:1 | Pass | Pass |
| `#454E5E` lock | `#FFFFFF` | Locked week button | normal | 8.39:1 | Pass | Pass |
| `#3D4860` muted | `#FAFAF9` off white | Legend, page level hints | normal | 8.76:1 | Pass | Pass |
| `#3D4860` muted | `#FFFFFF` | Field hints, test costs | normal | 9.15:1 | Pass | Pass |
| `#FFFFFF` | `#8B1D1D` terra | Header title and subtitle | large and normal | 9.17:1 | Pass | Pass |
| `#333C4D` | `#EEF0F3` | Disabled button text | normal | 9.71:1 | Pass | Pass |
| `#DCB45C` gold | `#08101F` navy | Patient strip labels | normal | 9.71:1 | Pass | Pass |
| `#7A1414` | `#FFFFFF` | Error text | normal | 10.84:1 | Pass | Pass |
| `#08101F` navy | `#F6F7F9` | Read only and submitted answers | normal | 17.74:1 | Pass | Pass |
| `#DDE2EA` light | `#08101F` navy | Dialog subtitle | normal | 14.62:1 | Pass | Pass |
| `#08101F` navy | `#EDF1F3` navy tint | Result values, note emphasis | normal | 16.73:1 | Pass | Pass |
| `#08101F` navy | `#FAFAF9` off white | Body text on page | normal | 18.21:1 | Pass | Pass |
| `#08101F` navy | `#FFFFFF` | Card body and headings | normal | 19.02:1 | Pass | Pass |
| `#FFFFFF` | `#08101F` navy | Skip link, submitted badge | normal | 19.02:1 | Pass | Pass |

**Zero failures at AA. Zero failures at AAA.** Lowest ratio in the interface is 7.39:1.

Two contrast defects were found during the sweep and fixed before release:

1. The locked week button used `#5A6474`, which measured 5.98:1 on white. It passed AA and failed AAA. Darkened to `#454E5E`, now 8.39:1.
2. Submitted weeks originally rendered the student's answers inside `disabled` form controls. Chromium overrides `color` on `option` elements in a disabled `select` and rendered them at 3.55:1, an AA failure, and disabled controls are also skipped by keyboard navigation, which made a submitted week unreadable to a keyboard user. Submitted weeks now render the answers as static `dl` content, which fixed both problems at once. The prediction field uses `readonly` rather than `disabled` for the same reason.

---

## 4. Keyboard navigation flow, verified

Verified end to end in Chromium with the pointer unused except where noted.

1. Tab 1 reaches the skip link. Enter moves focus to `main`.
2. Gate: name field, section field, Open, Restore. Restore toggles an inline panel and moves focus into it. No browser prompt dialogs are used anywhere in the file.
3. Week rail: each week is a button with `aria-current` on the active one and an `aria-label` that states the week number, the title, and the state.
4. Unlock: code field, then Unlock. A wrong code writes an error next to the field and does not move focus.
5. Prediction: textarea, then Lock. After locking, the textarea is `readonly` and remains focusable and readable.
6. Order menu: category headers are buttons with `aria-expanded` and `aria-controls`. Enter toggles. Each test row ends in an Order button whose accessible name includes the test name and the cost.
7. Commit dialog: opens with focus on the first textarea. Tab cycles within the dialog and does not escape to the page behind it. Escape closes it. Focus returns to the originating Order button. Character counters update in an `aria-live` region as the student types.
8. Result: the "what did this change" textarea follows each result in DOM order. The order menu re opens as soon as the note passes 60 characters, live, without needing a blur.
9. Drawing: tool buttons use `aria-pressed`. The description textarea follows the canvas.
10. Synthesis: labeled select and textarea controls in visual order.
11. Close the week: the blocker list is `aria-live="polite"` and the Close button enables live as the last blocker clears.
12. Save and hand in: Export PDF, Show save code, Copy code, Clear this browser. The two destructive actions require a second confirming click on the same button rather than a browser confirm dialog.

**A click stealing defect was found and fixed here.** The panel containing the Close button was rebuilt whenever a field fired `change`. Because `change` fires on blur, clicking Close after typing replaced the button underneath the pointer and swallowed the click, so the first attempt did nothing. Validation now runs on `input` and updates the panel in place without replacing any node.

---

## 5. Screen reader testing

Tested with the accessibility tree as exposed by Chromium, and by structural audit against the criteria above. Verified:

- Landmarks: one `main`, a labeled `nav` for the weeks, a `footer`.
- Heading hierarchy: h1 to h2 to h3 with no skipped level anywhere in any week or state.
- Every form control resolves to an accessible name, checked programmatically across the gate, an open week, an expanded order menu, the commit dialog and a submitted week. Zero unnamed controls.
- The canvas is announced as an image with a label that tells the user a written description is required below it.
- The token meter announces "N of M order tokens remaining" rather than exposing decorative squares.
- Live regions announce validation state, remaining blockers, and copy confirmation without stealing focus.

**Outstanding:** a pass with NVDA and with VoiceOver on real hardware before the file is released to students. I can do the structural work; the listening pass should be done by a person using the software as their primary means of access.

---

## 6. Known limitations and remediation plan

**1. Freehand drawing requires a pointer.** Drawing on a canvas is a dragging gesture with no keyboard or single tap equivalent, which is a partial exception to 2.5.7.

*Mitigation, already in place:* the written description of the figure is a required field for every student, not an accommodation, and it is graded alongside the drawing. A student may also draw on paper and upload a photograph. No student is graded on their ability to operate a drawing surface.

*Remediation if a student needs more:* accept the described figure alone for full credit. This needs no change to the file.

**2. The exported PDF depends on the browser print pipeline.** Print styling is verified in Chromium. Safari and Firefox will paginate slightly differently.

*Mitigation:* the print layout uses `break-inside: avoid` on each order block rather than on whole sections, so pagination differences move blocks rather than splitting them. Tested output for a three order week is four pages.

**3. Work persists in `localStorage`, which is not durable.** A private window, a shared machine that resets, or cleared site data loses the browser copy.

*Mitigation:* every write is wrapped so that a blocked or full store never breaks the page, and the student is told in plain text when the store refuses a write. The save code and the weekly PDF are the recovery path, and both are named in the student instructions.

**4. The result data is obfuscated, not encrypted.** A determined student who opens the source can recover the value table with effort.

*Mitigation:* this is an academic integrity limit, not an accessibility one, and it is documented honestly in the instructor guide rather than overstated. The grading weight sits on the reasoning trail for exactly this reason.

**5. Google Fonts is the one external request.** If the network blocks it, the file falls back to a system sans stack and nothing else changes. Verified by loading the file with no network available.

---

## 7. Reviewer

Dr. Sharilyn Rennie
Automated sweep and functional tests run August 22, 2026 in Chromium 141 via Playwright, covering computed contrast in every interaction state, reflow at five viewport widths, heading order, accessible names, focus order and trapping, and full keyboard operation of the weekly workflow.
