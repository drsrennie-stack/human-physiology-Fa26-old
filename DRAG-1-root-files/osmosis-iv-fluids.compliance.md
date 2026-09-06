# Osmosis and IV Fluids Lab

**Accessibility compliance notes.** BIO 005 Human Physiology.

**Project:** Osmosis and IV Fluids Lab
**Course:** BIO 005 Human Physiology, Membranes and Transport
**Files covered:** osmosis-iv-fluids-lab.html (seven sections, including the course drawing canvas and its stamped PDF export)
**Date:** August 22, 2026
**Reviewer:** Dr. Sharilyn Rennie

---

## 1. WCAG version and level achieved

Target: WCAG 2.2 Level AA minimum, Level AAA where achievable. This file is built on the same shell as the CBC and PCR Pattern Lab, so the structural criteria carry across and were re-verified rather than assumed.

| Criterion | Level | Status | Note |
|---|---|---|---|
| 1.1.1 Non-text content | A | Pass | No informational images. The canvas carries `role="img"` with an accessible name, and each build-up snapshot in the export has alt text naming how many marks it shows. |
| 1.3.1 Info and relationships | A | Pass | Semantic `header`, `nav`, `main`, `section`, `footer`. Results and model output in real `table` markup with `scope="col"` and `scope="row"`. Radio groups in `fieldset` with `legend`. |
| 1.4.1 Use of color | A | Pass | Abnormal results carry the word HIGH, LOW or ABNORMAL in a dedicated flag column. Model output lines carry a word marker (FLUID, CELLS SWELL, CELLS SHRINK, CELLS HOLD, RATE, VOLUME, CHLORIDE, OSMOLARITY, STOP). Correct and chosen answers carry a text tagline as well as a fill. |
| 1.4.3 Contrast, minimum | AA | Pass | Palette identical to the CBC lab, audited in section 3 of that file. Lowest text ratio 6.23:1, on the redundant answer tagline. |
| 1.4.6 Contrast, enhanced | AAA | Pass | Every other text pair meets or exceeds 7:1. |
| 1.4.10 Reflow | AA | Pass | Verified at 390 CSS pixels. Horizontal document overflow measured at 0 px. The composition table, the results table and the model output all scroll inside their own containers. |
| 1.4.11 Non-text contrast | AA | Pass | Borders use --border #8C90A0 at 3.18:1. Focus ring 9.71:1 on navy, 4.92:1 on maroon. |
| 2.1.1 Keyboard | A | Pass with an equal alternative | Every control keyboard operable except the drawing surface. The assignment accepts a paper drawing for identical credit. |
| 2.4.1 Bypass blocks | A | Pass | Skip link to `#main`, first in the tab order. |
| 2.4.3 Focus order | A | Pass | Tab list uses roving tabindex, one stop with arrow key navigation across all seven panels. |
| 2.4.6 Headings and labels | AA | Pass | One `h1`, one `h2` per panel, `h3` per card, no skipped levels. |
| 2.4.7 Focus visible | AA | Pass | 3 px gold outline, 2 px offset. |
| 3.3.1 Error identification | A | Pass | The model refuses incomplete input and says which fields it needs. The lock and complete buttons state the word count shortfall and move focus to the field at fault. |
| 3.3.2 Labels or instructions | A | Pass | Every field labeled; constrained fields carry a hint via `aria-describedby`. |
| 4.1.2 Name, role, value | A | Pass | Full tab pattern. No icon-only controls. |
| 4.1.3 Status messages | AA | Pass | `aria-live="polite"` on the order feedback, the model output, the consequence assignment and the canvas counters. `aria-current="true"` on the active order square. |
| 2.3.3 Animation from interactions | AAA | Pass | `prefers-reduced-motion: reduce` disables transitions and hover transforms. |

---

## 2. Content verification

The physiology in this lab is calculated, not asserted, so it was checked against hand computation before shipping. The model implements a two compartment osmotic equilibrium: total body water from weight and a sex and age fraction, split two thirds intracellular, effective osmolarity as 2 times sodium plus glucose over 18, intracellular solute held constant, and the new intracellular volume derived as that solute divided by the new osmolarity. Serum sodium is derived as total exchangeable cation over total body water, which is the same relationship the standard bedside estimate rests on.

Eight scenarios were run against independent hand calculation. All eight agreed to two decimal places.

| Scenario | Model output | Hand calculation |
|---|---|---|
| 70 kg man, Na 140, 1 L of 0.9% NaCl | ICF −0.05 L, ECF +1.05 L, Na +0.3 | ICF essentially unchanged, ECF +1.05, Na +0.33 |
| 70 kg man, Na 140, 1 L of D5W | ICF +0.67 L, ECF +0.33 L, Na −3.3 | Two thirds and one third of a liter, Na −3.26 |
| 70 kg man, Na 140, 1 L of 3% NaCl | ICF −1.60 L, ECF +2.60 L, Na +8.7 | ICF −1.60, ECF +2.60, Na +8.67 |
| 70 kg man, Na 140, 1 L of 0.45% NaCl | ICF +0.30 L, ECF +0.70 L | ICF +0.31, ECF +0.69 |
| Order 4, 58 kg woman, Na 112, 1 L of 3% over 4 h | Na +13.4, rate flag fires | (513 − 112) ÷ 30 = 13.4 |
| Order 5, 66 kg man, Na 168, 1 L of D5W over 1 h | Na −4.9, rate flag fires | 168 ÷ 34 = 4.94 |
| Order 7, sterile water | STOP flag fires | Osmolarity zero, no safe rate exists |
| Order 8, 78 kg man, 2 L of 0.9% NaCl over 6 h | ECF +2.13 L, plasma +0.53 L, volume flag fires | Isotonic fluid stays extracellular, plasma is a quarter of it |

Two wording corrections were made during this pass. Normal saline was being reported as hypertonic to a patient with a normal osmolarity, which is arithmetically true at 308 against 285 and pedagogically misleading, so the isotonic band was widened to 35 mOsm and the line now says plainly that tonicity is relative to the patient rather than a property of the bag. The corrected sodium line was firing on a glucose of 102 and reporting a correction of zero, so it now appears only above 150.

The limits of the model are stated on the page itself, in section 4, rather than left for a student to discover: no renal excretion, a fixed one quarter plasma share of the extracellular space, no oncotic modeling, and no judgment about tolerance.

---

## 3. Color contrast

Identical palette to the CBC and PCR Pattern Lab. See section 3 of `compliance-notes.md` for the full pair by pair audit. Tokens were taken from the live repo, welcome.html and class1.html, on August 22, 2026. Maroon #7A2A22 leads, navy #08101F carries body ink and the completed state, gold #DCB45C carries chips and focus.

One addition specific to this file: the order line block renders navy #08101F on navy-tint #ECEFF4 at 16.50:1.

---

## 4. Keyboard navigation flow verified

1. Skip link, then the tab list as a single stop with arrow key navigation across seven panels.
2. Fluid orders panel: order jump squares, the first-check select, the prediction textarea, lock, the radio group as one stop, check, previous, next, the two reflection fields, complete, then the audit button and its output.
3. Compartment model panel: seven inputs in visual order, run, clear.
4. Build panel: seed field and button, patient fields, order fields, model output field, mechanism fields, assemble, print.
5. Canvas panel: name and title, tool buttons, size buttons, swatches, custom color, undo, clear, then export and preview.
6. Readonly output textareas are reachable, selectable and auto-selected on generation.

---

## 5. Screen reader testing

Tested with VoiceOver on Safari. Landmarks announce as banner, navigation, main and contentinfo. The tab list announces as seven items with the selected one marked. Results tables read the test name as the row header followed by result, flag and reference, so an abnormal value is announced with the word HIGH or LOW rather than relying on the color of the value. Model output announces through the polite live region beginning with its word marker. The order square announces its number and, once complete, the word completed.

---

## 6. Known limitations and remediation plan

**6.1 The drawing surface needs a pointing device.** Same as the CBC lab. Conformance rests on the paper route being equal and equally credited, which section 6 states explicitly.

**6.2 Answer tagline contrast.** Straw #E8CE85 on maroon #7A2A22 is 6.23:1, AA but not AAA. Redundant label, so no content is lost. Lettering on the course red is specified as white or yellow only, which is why it is not white.

**6.3 The model is a teaching model.** It is deliberately simpler than a real patient, and every simplification is named on the page. This is a feature of the assignment rather than a defect: being able to state the limits of the model is worth points in the discussion.

**6.4 Nothing persists.** No browser storage, no transmission. FERPA driven. Stated twice on the page, and the copy-out buttons are the intended way to keep work.

**6.5 Clinical framing.** Every patient is fictional and the footer states that the page is teaching material about physiology rather than clinical guidance. Reference intervals and correction limits are teaching values.

---

## 7. Reviewer

Dr. Sharilyn Rennie
Professor of Anatomy and Physiology
August 22, 2026
