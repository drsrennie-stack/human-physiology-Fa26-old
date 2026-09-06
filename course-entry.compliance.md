# Course entry, course-entry.html

**Accessibility compliance notes.** BIO 005 Human Physiology.

## 1. Project, files, date

- **Project:** BIO 005 Human Physiology, Yuba College, Fall 2026
- **File covered:** `course-entry.html`, the Canvas front door
- **Date:** August 22, 2026
- **Live URL once pushed:** https://drsrennie-stack.github.io/human-physiology-Fa26/course-entry.html
- **Surface:** the dark application surface, the same one documented for `os/` in `BRAND-MIGRATION.md`, not the white-cards-on-off-white document surface. This page is a fork of the BIO 004 `canvas-enter.html` card, so the two courses read as the same hand.

---

## 2. WCAG version and level achieved

Target: WCAG 2.2 Level AA as the floor, Level AAA where it was reachable.

| Criterion | Level | Status | Where it shows up on this page |
|---|---|---|---|
| 1.1.1 Non-text content | A | Pass | The three-figure mark and every status icon are `aria-hidden`, with the meaning carried in real text beside them. The drawing canvas has an accessible name and fallback text inside the element. |
| 1.3.1 Info and relationships | A | Pass | One `h1`, `h2` on the rail, `h3` on each dialog. Real `main` and `aside` with `aria-labelledby`. The three steps are a list of buttons, the checks are a list, the four agreement boxes are a `fieldset`. |
| 1.3.2 Meaningful sequence | A | Pass | Reading order matches visual order. The rail follows the card in the source, so a screen reader reaches the welcome before the steps. |
| 1.3.4 Orientation | AA | Pass | No orientation lock. Verified at 390px and 1280px wide. |
| 1.3.5 Identify input purpose | AA | N/A | The four checkboxes collect nothing about the student and are never submitted or stored. No autocomplete purpose applies. |
| 1.4.1 Use of color | A | Pass | Every state carries three signals: a drawn icon (clock, check, triangle), a text tag (Not checked, Ready, Needs attention), and a border treatment (dashed, solid, solid). The rail rows add a spelled-out state line. Color is never the only cue. |
| 1.4.3 Contrast, minimum | AA | Pass | See section 3. |
| 1.4.6 Contrast, enhanced | **AAA** | **Pass** | Every text pair is at or above 7:1, on all four surfaces. The one exception is the h1 accent word at 5.58:1, which is large text at 30px and up, where the AAA threshold is 4.5:1. |
| 1.4.10 Reflow | AA | Pass | Zero horizontal overflow at 390px, measured. Single column below 1040px. |
| 1.4.11 Non-text contrast | AA | Pass | Locked dashed border 10.30:1, done solid border 6.89:1, attention border 4.90:1, focus ring 7.86:1. All above the 3:1 floor. |
| 1.4.12 Text spacing | AA | Pass | No fixed heights on text containers. Line height 1.55, nothing clips when spacing is overridden. |
| 2.1.1 Keyboard | A | Pass | Every control is reachable and operable by keyboard. See section 4. |
| 2.1.2 No keyboard trap | A | Pass | The three dialogs use the native `dialog` element, so focus containment and Escape are the browser's, not a hand-rolled trap. |
| 2.4.1 Bypass blocks | A | Pass | Skip link as the first focusable element, visible on focus. |
| 2.4.3 Focus order | A | Pass | Verified programmatically, listed in section 4. Closing a dialog returns focus to the rail row that opened it. |
| 2.4.4 Link purpose | A | Pass | Every link reads on its own. No "click here". |
| 2.4.6 Headings and labels | AA | Pass | Each dialog is titled by its own `h3` through `aria-labelledby`. Button text says what the button does. |
| 2.4.7 Focus visible | AA | Pass | 3px gold outline with 4px offset, 7.86:1 against the page and 6.89:1 against the panel. |
| 2.4.11 Focus not obscured | AA | Pass | Nothing is sticky or fixed. A dialog covers the page, but focus is inside it while it is open. |
| 2.5.3 Label in name | A | Pass | Visible text is the accessible name in every case. |
| 2.5.8 Target size, minimum | AA | Pass | Measured. Enter Course 229 by 66px. Rail rows 306 by 113px and up. Dialog close buttons 36 by 36px. Checkboxes 24 by 24px with the whole label row as the target. The one 21px-tall target is the Skip the setup text link, which qualifies under the equivalent-control exception: Enter Course goes to the same page. |
| 3.1.1 Language of page | A | Pass | `lang="en"` on the html element. |
| 3.2.1 On focus | A | Pass | Focus never changes context. |
| 3.2.2 On input | A | Pass | Checking a box updates the rail state and the line under the button. It never moves focus and never navigates. |
| 3.3.1 Error identification | A | Pass | A failed check names the problem in text and gives the fix in text, both inside the same list item. |
| 3.3.2 Labels or instructions | A | Pass | The checkboxes sit in a `fieldset` whose `legend` carries the instruction. Each box has a `label` wired with `for` and `id`. |
| 4.1.2 Name, role, value | A | Pass | Enter Course uses `aria-disabled`, not `disabled`, so it stays focusable and announces why it is not active. Rail rows carry `aria-haspopup="dialog"`. |
| 4.1.3 Status messages | AA | Pass | One `role="status"` `aria-live="polite"` region announces every result and every step change without moving focus. |
| 2.3.1 Three flashes | A | Pass | No flashing. |
| 2.2.1 Timing adjustable | A | Pass | No time limits. The one timer closes the pop-up test window after six seconds and affects nothing on the page. |
| 2.3.3 Animation from interactions | AAA | Pass | `prefers-reduced-motion` turns off every transition and the button lift. |

Automated audit: axe-core 4.x, full WCAG 2.0 A/AA, 2.1 A/AA, 2.2 AA and best-practice rule sets. Run four times: the page at rest, and again with each of the three dialogs open and exercised. **0 violations and 0 incomplete results on all four runs.**

---

## 3. Color contrast audit

Four surfaces, because a tinted state background is a different surface from the panel it sits on. Every value below is measured against the composited background, not the nominal one.

| Surface | Value |
|---|---|
| Page | `#08101F` |
| Panel, rail and dialogs | `#121E33` |
| Done state, gold at 12 percent over panel | `#282E36` |
| Needs attention, accent at 12 percent over panel | `#292838` |

### Text on the page

| Foreground | Ratio | AA | AAA |
|---|---|---|---|
| White `#FFFFFF`, headline and lede | 19.02:1 | Pass | Pass |
| Gold-light `#F2E2B8`, the skip-setup link | 14.80:1 | Pass | Pass |
| Slate `#C3CCDA`, the notes under the button | 11.75:1 | Pass | Pass |
| Gold-ink `#D2A954`, eyebrow and signature | 8.64:1 | Pass | Pass |
| Accent `#D0705F`, the h1 word Physiology | 5.58:1 | Pass | Pass as large text |

### Text on the panel

| Foreground | Ratio | AA | AAA |
|---|---|---|---|
| White, step titles and dialog headings | 16.68:1 | Pass | Pass |
| Gold-light | 12.98:1 | Pass | Pass |
| Slate, descriptions and body | 10.30:1 | Pass | Pass |
| Gold-ink, Before you enter and the step eyebrows | 7.58:1 | Pass | Pass |

### Text on the two state tints

| Foreground | Surface | Ratio | AA | AAA |
|---|---|---|---|---|
| White, step title when done | Gold tint | 13.69:1 | Pass | Pass |
| Gold-light, the Done and Ready labels | Gold tint | 10.65:1 | Pass | Pass |
| Slate, description when done | Gold tint | 8.45:1 | Pass | Pass |
| Accent-ink `#EDB0A4`, the Needs attention tag | Accent tint | 7.80:1 | Pass | Pass |
| Gold-light, the fix line | Accent tint | 11.24:1 | Pass | Pass |
| Slate, detail when flagged | Accent tint | 8.91:1 | Pass | Pass |

### Buttons and chips

| Foreground | Background | Ratio | AA | AAA |
|---|---|---|---|---|
| White | Maroon `#7A2A22`, Enter Course | 9.63:1 | Pass | Pass |
| White | Maroon-lift `#93382D`, hover | 7.38:1 | Pass | Pass |
| Navy | Gold `#C9A14A`, the section pill and the Run the check button | 7.86:1 | Pass | Pass |
| Navy | Gold-light `#F2E2B8`, button hover | 14.80:1 | Pass | Pass |
| Slate | Panel, the locked Enter Course | 10.30:1 | Pass | Pass |
| White | `#384254`, the step number chip | 10.12:1 | Pass | Pass |

### Non-text, 3:1 floor

| Element | Ratio | Result |
|---|---|---|
| Locked step, dashed slate border on panel | 10.30:1 | Pass |
| Done step, solid gold border on panel | 6.89:1 | Pass |
| Needs attention, solid accent border on panel | 4.90:1 | Pass |
| Focus ring on the page | 7.86:1 | Pass |
| Focus ring on the panel | 6.89:1 | Pass |

Two palette decisions worth recording, because both look like drift and are not:

1. **Gold splits into two tokens on a dark surface.** Bright gold `#C9A14A` is 7.86:1 on the page but only 6.89:1 on the panel, which is AA and not AAA. It stays as a fill and a border, where the 3:1 rule applies, and `#D2A954` at 7.58:1 carries gold text instead.
2. **The accent splits the same way.** `#D0705F` is right for the 30px-plus headline word and for state borders. As a 10px tag it was 4.24:1 on its own tint, under even the AA floor, so the tag and the warning icon use `#EDB0A4` at 7.80:1.

Nothing on this page uses white at reduced opacity. Opacity cannot be audited against a stated ratio, so every secondary text color is a solid value.

---

## 4. Keyboard navigation flow, verified

Focus order on the page:

1. Skip to the welcome card (visible on focus)
2. Enter Course
3. Skip the setup and go straight in
4. Step 1, Check your device
5. Step 2, Try what a browser will not test for you
6. Step 3, Read what this class asks of you

Inside each dialog the native `dialog` element contains focus. Order is the close button, then the controls in reading order, then the Close button in the footer. Escape closes. On close, focus returns to the rail row that opened the dialog.

Verified behaviors:

- Enter Course uses `aria-disabled`, not `disabled`. It stays focusable while locked, and activating it announces which steps are still outstanding and then sends focus to the first unfinished rail row.
- The rail rows are `button` elements, not clickable divs, so Space and Enter both open them and each announces `aria-haspopup="dialog"`.
- The drawing canvas is deliberately not in the tab order, because there is nothing a keyboard user can do inside it. The Mark drawing as handled button beside it is the keyboard and screen reader path, and it also opens the door to an alternative arrangement for a student who cannot draw with a pointer at all.
- The four checkboxes are real `input type="checkbox"` elements, operable with Space, each announcing its own checked state.
- No focus trap outside the dialogs, no sticky element that can cover a focused control.

---

## 5. Screen reader testing

**What has been verified, and by what:** the semantic structure, accessible names, roles, dialog labeling, and the live region were verified with axe-core against the rendered DOM in all four states, plus a manual read of the accessibility tree. Landmarks resolve as `main` and `complementary`. The heading outline is a single `h1`, then `h2` on the rail, then one `h3` per dialog, with no skipped levels.

**What has not been done yet:** no run through NVDA, JAWS, or VoiceOver with a live voice. That is a human pass and it should happen before students land on this page, ideally on the live GitHub Pages URL and again inside the Canvas iframe. Five things to listen for:

1. That the result announcement after Run the check is read once and in full, not clipped and not repeated per item.
2. That Enter Course announces its disabled state and its describedby line before the steps are done.
3. That opening a rail row moves the reader into the dialog and Escape brings it back to the same row.
4. That the drawing item makes sense read aloud, given that its canvas is skipped.
5. That the fieldset legend in step 3 is read before the first checkbox, so the instruction arrives before the choices.

Update this section with the reader, the version, and the date once that pass is done.

---

## 6. Known limitations and remediation plan

| Limitation | Effect | Plan |
|---|---|---|
| No live screen reader pass yet | Structure is verified, spoken experience is not | Run NVDA on Windows and VoiceOver on macOS against the live URL, then fill in section 5 |
| Saved progress check can fail inside the Canvas iframe | Some browsers block storage for a cross-site frame, so a student may see Needs attention on a device that is actually fine | Already handled in the page: when it detects it is framed it says so, and points out that the course itself opens in its own tab where storage works normally |
| Canvas strips script tags from page content | The height sender in this page has nothing listening on the Canvas side, so the frame keeps the height you set on the iframe | Accepted. The card is built to fit a 900px frame at desktop width. If Canvas theme JavaScript ever becomes available, a listener there makes the frame auto-size and the sender is already waiting for it |
| The gate is a self-check, not a record | Nothing a student checks is stored or reported, and the page says so | If a record of agreement is needed, that belongs in a Canvas syllabus quiz. The four lines can be turned into quiz items without changing this page |
| Fonts load from Google Fonts | If the network blocks that host, type falls back | Fallback stack is system UI fonts. Nothing about layout or contrast depends on Plus Jakarta Sans loading |
| The page commits to a dark surface | It does not follow a viewer's light mode preference | Deliberate, and it matches the BIO 004 front door. The contrast floor is met in both directions, and `prefers-contrast` and `forced-colors` are both respected |

---

## 7. Reviewer

Built and audited for Dr. Sharilyn Rennie, August 22, 2026. Automated audit: axe-core, 0 violations and 0 incomplete across four page states. Human screen reader pass outstanding, see section 5.
