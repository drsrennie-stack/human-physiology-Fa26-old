# The Clinical Physiology Lab, the fourteen week lab manual

**Accessibility compliance notes.** BIO 005 Human Physiology.

## 1. Project

**Project:** The Clinical Physiology Lab, lab manual
**Course:** BIO 005 Human Physiology
**Files covered:** `clinical-physiology-lab-manual.html` (single self contained file, no external requests) and `clinical-physiology-lab-manual.docx`
**Body typeface:** Helvetica Neue, falling back to Helvetica then Arial, in the web version. Arial in the Word version. All of them have a normal unslashed zero.
**Print:** 10pt body, 8.5pt tables, 12mm page margins. The full manual renders to 45 pages, down from 49 on the previous typeface.
**Date:** August 22, 2026
**Reviewer:** Dr. Sharilyn Rennie

## 2. WCAG version and level achieved

Target: WCAG 2.2 Level AA minimum, Level AAA where achievable.

| Criterion | Level | Status | Note |
|---|---|---|---|
| 1.1.1 Non text content | A | Pass | The only image is the course logo, an inline SVG with `role="img"` and an `aria-label`. Everything else is text. |
| 1.3.1 Info and relationships | A | Pass | Semantic `header`, `nav`, `main`, `section`, `footer`. All 46 tables use `thead`, `th` and a `caption`. The two per-week summary tables carry visually hidden captions so a screen reader can tell the time budget from the deliverables. |
| 1.3.2 Meaningful sequence | A | Pass | Single column reading order. Nothing is positioned out of flow. |
| 1.4.1 Use of color | A | Pass | Exercise steps carry the words Do, Record and Explain, not just a colored pill. The optional bench version is labeled in words. |
| 1.4.3 Contrast, minimum | AA | Pass | See section 3. |
| 1.4.6 Contrast, enhanced | AAA | Pass with one exception | Every text pair reaches 7:1 except the gold eyebrow on the maroon header at 5.75:1, which meets AA. |
| 1.4.10 Reflow | AA | Pass | Fluid grids, contents list collapses to one column under 680px, every table scrolls inside its own container so the page body never scrolls sideways. |
| 1.4.11 Non text contrast | AA | Pass | Table rules `#7F8798` at 3.61:1. Gold control borders `#9A7F32` at 3.85:1. |
| 1.4.12 Text spacing | AA | Pass | No fixed heights on text containers. Line height 1.6. |
| 2.1.1 Keyboard | A | Pass | 62 focusable elements, all operable. The only interactive controls are the contents links, the 43 formula info buttons and the master toggle. |
| 2.1.2 No keyboard trap | A | Pass | No modals, no focus capture. |
| 2.4.1 Bypass blocks | A | Pass | Skip link to `#main` as the first focusable element. |
| 2.4.3 Focus order | A | Pass | Follows reading order. A contents link scrolls to its section and moves focus there. |
| 2.4.5 Multiple ways | AA | Pass | A contents list jumping to any of the seventeen sections, alongside sequential reading. |
| 2.4.6 Headings and labels | AA | Pass | One `h1`, no skipped levels across 67 headings, consistent structure in every week. |
| 2.4.7 Focus visible | AA | Pass | 3px terra outline with 2px offset, switching to navy on the maroon and white bands. |
| 3.1.5 Reading level | AAA | Pass | Every one of the 43 formulas carries a plain language explanation behind an info control, and a master switch opens them all. In the Word version they are always visible. |
| 3.2.3 Consistent navigation | AA | Pass | Every week uses the same seven blocks in the same order. |
| 3.2.4 Consistent identification | AA | Pass | Do, Record and Explain mean the same thing in all 42 exercises. |
| 4.1.2 Name, role, value | A | Pass | Info buttons use `aria-expanded` and `aria-controls` pointing at the block they reveal. The master toggle uses `aria-pressed` and updates its own label. |

## 3. Color contrast audit

| Use | Foreground on background | Ratio | Result |
|---|---|---|---|
| Body text | `#0A1322` on `#ffffff` | 18.60:1 | AAA |
| Body text on layered surface | `#0A1322` on `#FAFAF9` | 17.81:1 | AAA |
| Captions and secondary text | `#3D4860` on `#ffffff` | 9.15:1 | AAA |
| Secondary on layered surface | `#3D4860` on `#FAFAF9` | 8.76:1 | AAA |
| Section headings | `#731717` on `#ffffff` | 11.27:1 | AAA |
| Navy headings and formulas | `#08101F` on `#ffffff` | 19.02:1 | AAA |
| Gold labels | `#6E5018` on `#ffffff` | 7.44:1 | AAA |
| Teal | `#2C5F66` on `#ffffff` | 7.15:1 | AAA |
| Header text on maroon | `#ffffff` on `#731717` | 11.27:1 | AAA |
| Header eyebrow on maroon | `#DCB45C` on `#731717` | 5.75:1 | AA |
| Chip text on gold | `#08101F` on `#DCB45C` | 9.71:1 | AAA |
| Step label, white on navy | `#ffffff` on `#08101F` | 19.02:1 | AAA |
| Table rules | `#7F8798` on `#ffffff` | 3.61:1 | AA non text |
| Gold control borders | `#9A7F32` on `#ffffff` | 3.85:1 | AA non text |

## 4. Keyboard navigation flow verified

1. `Tab` reaches the skip link first, which jumps to `#main`.
2. `Tab` reaches the master formula toggle in the brand bar.
3. `Tab` moves through the contents list. `Enter` on any entry scrolls to that section and moves focus into it, so a keyboard user lands where they clicked rather than staying at the top.
4. Each formula's info button is reachable in reading order. `Enter` or `Space` reveals the plain language block below it and flips `aria-expanded`.
5. The master toggle opens or closes all 43 at once and updates its own label so its state is announced.

No element is reachable but inoperable, and nothing is operable by pointer only.

## 5. Screen reader testing

Verified through the accessibility tree in Chromium.

- Landmarks present: `banner`, `navigation`, `main`, `contentinfo`.
- One `h1`, no skipped heading levels across 67 headings.
- All 46 tables expose a caption and column headers.
- Zero unlabelled controls, zero buttons without an accessible name.
- Every info button names the block it controls through `aria-controls`.

Outstanding: a JAWS and VoiceOver pass has not been done.

## 6. The Word version

The DOCX is generated from the same source data as the HTML, so the two cannot drift apart.

- Built on real heading styles, so the navigation pane and any generated table of contents work.
- Every numbered list uses its own numbering instance, so lists restart at 1 in each section rather than running continuously through the document.
- Tables carry both `columnWidths` and per-cell widths in DXA, so they hold their shape in Word and in Google Docs.
- Header on every page carries the manual and course name. Footer carries the page number.
- Plain language explanations are always visible in the Word version, since there is nothing to click.
- Page size is US Letter with 0.75 inch margins.

## 7. Known limitations and remediation plan

1. **Gold eyebrow on maroon reaches AA and not AAA at 5.75:1.** It is small display text and the gold on maroon pairing is the physiology course signal. Switching it to white would reach AAA if that becomes the priority.
2. **Screen reader testing is Chromium based.** Plan a JAWS and VoiceOver pass before the manual goes live to students.
3. **No external requests.** Both versions use system typefaces, so the manual renders identically offline and behind a campus proxy.
4. **The charts named in each week are not drawn in the manual.** They live in the weekly tools. The manual names the chart and asks the four questions about it.
5. **Weeks 1 to 12 and 14 reference tools that are not built yet.** Only week 13, the pulmonary and ventilation lab, and part of week 11, the CBC and PCR lab, exist today. Every other week's exercises are specified against tools still to be built.

## 8. Reviewer

Dr. Sharilyn Rennie, Professor of Anatomy and Physiology.
Reviewed August 22, 2026.
