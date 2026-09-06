# Week 13, Pulmonary Function and Mechanical Ventilation

**Accessibility compliance notes.** BIO 005 Human Physiology.

## 1. Project

**Project:** Pulmonary Function and Mechanical Ventilation Lab
**Course:** BIO 005 Human Physiology
**Body typeface:** Helvetica Neue, falling back to Helvetica then Arial then the system sans serif. All three have a normal unslashed zero, which matters because the lab is full of numbers. Atkinson Hyperlegible was dropped earlier for a slashed zero baked into the glyph.
**Files covered:** `pulmonary-function-lab.html` (single self contained file, no external assets and no web font request)
**Print:** the print stylesheet sets 10pt body type, 9pt tables, tightened card padding and a 12mm page margin, so the submitted PDF stays compact.
**Date:** August 22, 2026 (revised same day: guided sequence, drag and drop matching, decision charts, plain language layer, PDF submission)
**Reviewer:** Dr. Sharilyn Rennie

## 2. WCAG version and level achieved

Target: WCAG 2.2 Level AA minimum, Level AAA where achievable.

| Criterion | Level | Status | Note |
|---|---|---|---|
| 1.1.1 Non text content | A | Pass | Every generated SVG carries `role="img"` and a descriptive `aria-label`. Numeric results are also present as text in the tables beside each figure, so no information exists only in a graphic. |
| 1.3.1 Info and relationships | A | Pass | Semantic `header`, `nav`, `main`, `section`, `footer`, `figure` and `figcaption`. All 15 data tables use `thead`, `th` and a `caption`. Every form control has an accessible name. Standalone fields use a `label` bound by `for` and `id`. The four blanks inside the lung volume report table carry an `aria-label` naming the value in full, because a visible label would duplicate the row header beside them. |
| 1.3.2 Meaningful sequence | A | Pass | DOM order matches visual order. Panels are hidden with the `hidden` attribute, not by position. |
| 1.3.5 Identify input purpose | AA | Pass | Numeric fields carry `type="number"` and `inputmode="decimal"`. |
| 1.4.1 Use of color | A | Pass | Result flags carry text ("Below LLN", "Above normal", "Normal") alongside color. Correct and incorrect quiz answers are announced in text through the feedback region, not signaled by fill alone. |
| 1.4.3 Contrast, minimum | AA | Pass | See section 3. All text pairs meet or exceed 4.5:1. |
| 1.4.6 Contrast, enhanced | AAA | Pass with one exception | Every text pair reaches 7:1 except the gold eyebrow on the maroon header at 5.75:1, which meets AA. The maroon was darkened to `#731717` in the August 22 revision, which raised that pair from 4.68:1. |
| 1.4.10 Reflow | AA | Pass | Fluid grids with `minmax` tracks. Wide tables and the tab strip scroll inside their own containers, so the page body never scrolls sideways at 320 CSS pixels. |
| 1.4.11 Non text contrast | AA | Pass | Form field and option borders raised to `#7F8798` (3.61:1). Gold outline button border raised to `#9A7F32` (3.85:1). Focus indicator is `#8B1D1D` (9.17:1). |
| 1.4.12 Text spacing | AA | Pass | No fixed heights on text containers. Line height 1.62 in body copy. |
| 2.1.1 Keyboard | A | Pass | See section 4. |
| 2.1.2 No keyboard trap | A | Pass | No modal layers or focus capture anywhere in the file. |
| 2.4.1 Bypass blocks | A | Pass | Skip link to `#main` as the first focusable element. |
| 2.4.3 Focus order | A | Pass | Tab order follows reading order. Selecting a tab moves focus to the panel, which carries `tabindex="-1"`. |
| 2.4.6 Headings and labels | AA | Pass | One `h1`, no skipped heading levels, descriptive labels throughout. |
| 2.4.7 Focus visible | AA | Pass | 3px terra outline with 2px offset on every focusable element. White outline on the red header where terra would be invisible. |
| 2.4.11 Focus not obscured | AA | Pass | The sticky tab bar is 52px tall and no focusable content sits underneath it, because panels begin below it in flow. |
| 2.5.3 Label in name | A | Pass | Visible label text is the start of every accessible name. |
| 2.5.7 Dragging movements | AA | Pass | The label matching task can be completed three ways: drag and drop, click a label then click a bracket, or tab to a label and press Enter then tab to a bracket and press Enter. No task anywhere in the file requires dragging. |
| 2.5.8 Target size, minimum | AA | Pass | All buttons are at least 38px tall. Label chips are 40px tall. SVG bracket targets carry a 46px wide hit rectangle with `pointer-events="all"`. |
| 3.2.2 On input | A | Pass | Changing a select or slider updates the readout in place and never moves focus or navigates. Selecting a section that is not open yet is the one navigation, and it is announced in a live region first, with a button offering the move rather than it happening silently. |
| 3.3.1 Error identification | A | Pass | The capacity calculator reports per field which answers were wrong and what the correct value was, in text, inside an `aria-live` region. |
| 3.3.2 Labels or instructions | A | Pass | Each field carries a hint line giving the formula it expects. |
| 3.1.3 Unusual words | AAA | Pass | Hard terms are marked up as clickable red words. Selecting one reveals a one line plain language definition in place, from a shared glossary, so the surrounding sentence can stay short. |
| 2.4.5 Multiple ways | AA | Pass | The Learn tab carries a contents list that jumps to any of its eleven sections, alongside sequential scrolling. |
| 3.1.5 Reading level | AAA | Pass | Every concept and every formula carries a plain language explanation, reachable one at a time through an info control or all at once from the page header. |
| 4.1.2 Name, role, value | A | Pass | Tabs implement the ARIA tab pattern with `role="tab"`, `aria-selected`, `aria-controls` and roving `tabindex`. Collapsibles and the plain language toggles use `aria-expanded`. Label chips use `aria-pressed` for the picked up state. SVG brackets use `role="button"` with `tabindex="0"`. Sections that are not open yet are deliberately **not** marked `aria-disabled`, because selecting one still does something useful: it explains what has to be finished first and offers to take you there. They carry a visually hidden suffix saying so. |
| 4.1.3 Status messages | AA | Pass | 21 `aria-live="polite"` regions cover quiz feedback, the matching task, the decision chart branches, the gate messages, ventilator safety flags, the target checker and the test counter. |
| 2.3.3 Animation from interaction | AAA | Pass | The flow volume loop draw animation and all card transitions are disabled under `prefers-reduced-motion: reduce`. |

## 3. Color contrast audit

Every pair measured against WCAG 2.x relative luminance.

| Use | Foreground on background | Ratio | Result |
|---|---|---|---|
| Body text | `#0A1322` on `#ffffff` | 18.60:1 | AAA |
| Body text on layered surface | `#0A1322` on `#FAFAF9` | 17.81:1 | AAA |
| Secondary and caption text | `#3D4860` on `#ffffff` | 9.15:1 | AAA |
| Secondary text on layered surface | `#3D4860` on `#FAFAF9` | 8.76:1 | AAA |
| Section headings, low flags | `#731717` on `#ffffff` | 11.27:1 | AAA |
| Navy headings | `#08101F` on `#ffffff` | 19.02:1 | AAA |
| High flags, gold labels | `#6E5018` on `#ffffff` | 7.44:1 | AAA |
| Physiology teal labels | `#2C5F66` on `#ffffff` | 7.15:1 | AAA |
| Header title and lede | `#ffffff` on `#731717` | 11.27:1 | AAA |
| Header eyebrow | `#DCB45C` on `#731717` | 5.75:1 | AA |
| Header chip text | `#08101F` on `#DCB45C` | 9.71:1 | AAA |
| Primary button | `#ffffff` on `#08101F` | 19.02:1 | AAA |
| Correct answer highlight | `#ffffff` on `#731717` | 11.27:1 | AAA |
| Chosen incorrect answer | `#0A1322` on `#ECEFF4` | 16.14:1 | AAA |
| Chart axis labels | `#3D4860` on `#ffffff` | 9.15:1 | AAA |
| Form field and option border | `#7F8798` on `#ffffff` | 3.61:1 | AA non text |
| Gold outline button border | `#9A7F32` on `#ffffff` | 3.85:1 | AA non text |
| Focus indicator | `#731717` on `#ffffff` | 11.27:1 | AA non text, exceeds 3:1 |

Chart strokes: data lines are terra `#731717` and teal `#2C5F66` on white, both above 7:1. Reference curves are drawn as dashed gray and are always accompanied by a text legend or caption naming them, so line identity never depends on color alone.

## 4. Keyboard navigation flow verified

Tested end to end with keyboard only, no pointer.

1. `Tab` from page load reaches the skip link first, which jumps to `#main`.
2. `Tab` reaches the tab strip. Left and right arrows move between the seven sections, `Home` and `End` jump to first and last, and selection moves focus into the panel.
3. Learn panel: it is a study page of eleven sections rather than a set of collapsibles. The contents list at the top jumps to any section and moves focus there. Predict-first cards are two steps by design: a button reveals the question, and focus lands on the first option so a keyboard user is not left hunting for it.
4. Lung volumes lab: all eight SVG brackets are reachable in order and answer on `Enter` or `Space`. The prompt and the feedback are both live regions, so a screen reader hears the result without moving focus.
5. Spirometry simulator: sex, age, height, condition and case number are all reachable and operable. Buttons run the test, add a bronchodilator, and reveal the interpretation.
6. Ventilator lab: every slider is operable with arrow keys, `Page Up` and `Page Down`, `Home` and `End`. Each slider's current value is bound through `aria-describedby` so the value is announced on change.
7. Decision charts: each branch is a button inside a labeled box. A wrong branch is announced in a live region and the chart does not advance, so focus never jumps somewhere unexpected.
8. Label matching: chips are buttons carrying `aria-pressed`. Enter picks a label up and announces it with its definition, Enter on a bracket drops it. Nothing here needs a pointer.
9. Test and results: options are buttons, the next button receives focus automatically after each answer is committed, and the submission fields and PDF control are reachable.

Total focusable elements on load: 164. No element is reachable but inoperable, and nothing is operable by pointer only.

## 5. Screen reader testing

Verified structure programmatically and by walking the accessibility tree in Chromium.

- Landmarks present: `banner`, `navigation`, `main`, `contentinfo`.
- One `h1`, no skipped heading levels across 57 headings.
- All 15 tables expose a caption and column headers.
- All 14 SVG figures expose `role="img"` with a text alternative that states what the tracing shows and, in the ventilator lab, the current peak, plateau and auto PEEP values.
- Zero unlabelled form controls and zero buttons without an accessible name.
- 21 live regions announce results without stealing focus, covering quiz feedback, the matching task, the decision charts, the gate messages, ventilator flags and the submission form.
- 45 elements expose `aria-expanded`, covering every collapsible section and every plain language toggle.

Outstanding: a pass with JAWS and with VoiceOver on a real machine has not been done. NVDA and Chromium behavior was verified through the accessibility tree rather than by listening.

## 6. Known limitations and remediation plan

1. **Gold eyebrow on the maroon header reaches AA and not AAA (5.75:1).** The gold on red pairing is the physiology course signal, and the eyebrow is small text. Remediation option if AAA is wanted everywhere: shift the eyebrow to white and keep gold for the chips, which already sit at 9.71:1.
2. **Card and panel borders are `#DCE0E6` at 1.33:1.** These are decorative separators, not control boundaries, and every card also carries a shadow, so they fall outside 1.4.11. No change planned.
3. **Screen reader testing is Chromium based.** Plan a JAWS and VoiceOver pass before the file goes live to students.
4. **No external requests.** The page uses system typefaces only, so it renders identically offline, behind a campus proxy, and inside a Canvas or Kajabi iframe.
5. **Plain language layer.** Every concept carries an "Explain it to me like I am 10" control, and a master switch in the page header opens all of them at once. This is a comprehension aid rather than a WCAG requirement, but it does the work of SC 3.1.5 Reading Level, which is a AAA criterion the clinical wording alone would not meet.
6. **The guided sequence.** The lung volumes lab has to be worked through before the spirometry simulator opens, and one full read of a simulator report opens the rest. Gating is completion based, never score based, so a student is never locked out by getting answers wrong. Once a section opens it stays open for the session.
7. **Results are session only by design.** Student work clears when the tab closes, which is intentional under FERPA. The submission form takes a name, a section and a case number purely so the printed PDF can be identified. Those fields are never stored, never written to browser storage, and never transmitted. Students should be told the session does not persist, so nobody loses a session's work by accident.
8. **The simulators are teaching models.** The lung is modeled as a single compartment with fixed carbon dioxide production and a fixed arterial to venous oxygen content difference. Relationships between settings behave correctly. Absolute values should not be quoted as clinical reference data, and this is stated in the page footer and beneath the ventilator simulator.

## 6a. Anti sharing measures

Not an accessibility item, recorded here because it affects how the file is assigned.

- The spirometry simulator opens on an unknown case with a randomly generated case number, so students in the same room are dealt different patients with different diagnoses and different numbers.
- The eight guided cases keep their condition and their teaching point, but the patient's sex, age and height are regenerated per session, so the tables of numbers differ between students while the reasoning stays the same.
- Both decision charts generate a fresh patient or a fresh alarm on every deal.
- Test questions are served in random order.
- Case numbers are reproducible: the same number always rebuilds the same patient, so a student can return to their own case and an instructor can reproduce it.

## 7. Reviewer

Dr. Sharilyn Rennie, Professor of Anatomy and Physiology.
Reviewed August 22, 2026.
