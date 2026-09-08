# Accessibility compliance notes, MedMasters brand pass

**Project:** BIO 005 Human Physiology, Fall 2026
**Repo:** drsrennie-stack/human-physiology-Fa26
**Files covered:** every live HTML page in the repo root plus `site/`, `source/`, `instructor/` and `anatomy-review/`, and `assets/brand.css`, `assets/brandbar.css`, `bio005-nav.js`, `bio005-dock.js`, `bio005-back.js`. 128 pages checked.
**Date:** September 6, 2026
**Reviewer:** Dr. Sharilyn Rennie

## 1. What this pass was

Three palette generations and four logo variants existed in this repo at the same time. The brand of record is now the MedMasters system, read off the live medmasterscollaborative.com with computed styles rather than estimated: navy `#0B1530`, maroon `#8B3A2E`, gold `#C9A14A`, headlines in Open Sans 800 and everything else in Plus Jakarta Sans, both self hosted.

Deliberately out of scope, on your instruction: the dark Mastery OS surface (`os/`, `mastery-physio-os.html`, `mastery-physio-os-standalone.html`). It keeps its own application palette.

## 2. WCAG version and level achieved

Target is WCAG 2.2 Level AA as the floor, Level AAA where it can be reached. Every text and background pair in the brand now clears AAA except one, which never carries text.

| Criterion | Level achieved | How |
|---|---|---|
| 1.3.1 Info and relationships | AA | Semantic landmarks, heading order, `for`/`id` on every labeled control |
| 1.4.3 / 1.4.6 Contrast | AAA on every text pair, see section 3 | Measured, not estimated |
| 1.4.11 Non-text contrast | AA | Gold is never a border on a light page; `--gold-deep #8A6D33` is used there instead |
| 1.4.12 Text spacing | AA | No fixed-height text containers introduced |
| 2.1.1 Keyboard | AA | See section 4 |
| 2.4.1 Bypass blocks | AA | Skip link on every page but the four listed in section 6 |
| 2.4.7 Focus visible | AAA | 3px maroon outline with 3px offset, gold on dark surfaces |
| 2.5.8 Target size minimum | AA | Brand bar, footer links and CTA all exceed 24 by 24 CSS pixels |
| 3.2.3 Consistent navigation | AA | One brand bar and one footer, same markup and order on every page |
| 4.1.2 Name, role, value | AA | The mark carries an accessible name where it is a link, and is hidden from assistive tech where the wordmark beside it already names it |

## 3. Color contrast audit

Measured with the WCAG relative luminance formula. Every ratio below is calculated, not estimated.

| Foreground | Background | Ratio | Result |
|---|---|---|---|
| Navy `#0B1530` | White `#FFFFFF` | 18.04:1 | AAA |
| Navy `#0B1530` | Off-white `#FAFAF9` | 17.27:1 | AAA |
| Navy `#0B1530` | Navy-tint `#ECEFF4` | 15.65:1 | AAA |
| Maroon `#8B3A2E` | White `#FFFFFF` | 7.66:1 | AAA |
| Maroon `#8B3A2E` | Off-white `#FAFAF9` | 7.33:1 | AAA |
| White `#FFFFFF` | Maroon `#8B3A2E` | 7.66:1 | AAA |
| White `#FFFFFF` | Maroon-dark `#6E2D24` | 10.18:1 | AAA |
| Ink-soft `#414B5C` | White `#FFFFFF` | 8.80:1 | AAA |
| Ink-soft `#414B5C` | Off-white `#FAFAF9` | 8.43:1 | AAA |
| Gold `#C9A14A` | Navy-deep `#060A18` | 8.16:1 | AAA |
| Navy-deep `#060A18` | Gold `#C9A14A` (numbered pills) | 8.16:1 | AAA |
| Bone `#F5F1E8` | Navy-deep `#060A18` | 17.50:1 | AAA |
| White `#FFFFFF` | Navy-deep `#060A18` | 19.73:1 | AAA |
| Gold-deep `#8A6D33` | White `#FFFFFF` | 4.87:1 | AA |
| Gold `#C9A14A` | White `#FFFFFF` | 2.42:1 | **Fails. Never used for text or borders on light. This is why `--gold-deep` exists.** |

Two rules come straight out of this table and are written into `assets/brand.css` beside the tokens:

- Gold is a dark-surface color. On a light page it is `--gold-deep`, never `--gold`.
- Cream `#F5F1E8` (token `--bone`) is dark-band only. On navy-deep it is 17.50:1. On white it is 1.06:1, which is why the restriction is not a matter of taste.

## 4. Keyboard navigation

Tab order on every page carrying the shared chrome runs: skip link, brand mark (which is a link home), any back link, main content in document order, footer links left to right, ending at the Virtual Office. That order comes from document order, with nothing given a positive `tabindex`, so it is the order the markup produces.

Focus is visible at every stop, maroon on light surfaces and gold on the dark band and footer, both a 3px outline at a 3px offset so the ring never sits on the glyphs. Everything added in this pass is a native link or button, so nothing new is mouse-only and no focus trap was introduced.

Checked programmatically across all 128 pages: skip link present and pointing at an existing `#main`, no positive `tabindex`, no `outline:none` without a replacement focus style, and every interactive element a native control. A hand pass with the keyboard over the entry page, a week page and a lab is still worth doing and is listed as owed in section 5.

## 5. Screen reader readiness, and what has not been tested yet

Be straight about this one. What ran was a programmatic accessibility-tree check across all 128 pages in headless Chromium, not a person listening to a screen reader. That check verifies the structure a screen reader depends on. It does not verify how the page actually sounds.

What the automated pass confirmed:

- Landmarks resolve on every page carrying the shared chrome: banner (the brand bar), main, and contentinfo (the footer). The pages still missing a main landmark are named in section 6.
- The mark exposes an accessible name, "BIO 005 Human Physiology, course home", where it is a link. Where the wordmark text sits beside it, the SVG is `aria-hidden` so the name is not announced twice.
- Decorative arrows, the dot separators in the footer, and the numbers in the gold pills are all `aria-hidden`, so the list reads as five steps rather than "one, one, check whether it is already answered".
- Every `img` carries an `alt` attribute and every icon-only button carries an accessible name.
- Heading order runs h1, h2, h3 with no skipped level on the pages rebuilt in this pass. Four pages carry more than one h1 and are listed in section 6.

**Still owed before this section can claim a level:** one pass with VoiceOver on Safari and one with NVDA on Firefox, over the course entry page, one week page, one lab, and the Virtual Office. Until that happens this file reports structure verified and listening not yet done.

## 6. Known limitations and remediation plan

None of these were introduced by the brand pass. They were found by the audit that ran alongside it and are listed so they do not get lost.

| Page | Issue | Plan |
|---|---|---|
| `start-here.html`, `lab-week05-sensory-reflex.html`, `lab-week08-hormone-cycle.html`, `slides-p-the-cell-and-cell-transport.html` | More than one `h1` | Demote the extras to `h2` when each page is next opened |
| `canvas-week02-discussion.html` | No `h1`, no skip link, no main landmark | This is a Canvas paste snippet, not a standalone page. Either wrap it properly or move it to a `.txt` so it is not served as a page |
| `canvas-kit.html`, `wiring-map.html` | No skip link, no main landmark | Internal build tools, not student facing. Fix when next touched |
| `course-questions.html`, `competency-packet-fall2026.html` | No skip link | Add on next edit |
| `canvas-start.html` (5), `course-materials.html` (1), `week-01-notes.html` (1) | Internal links without `target="_top"` | Will open inside the Canvas iframe instead of breaking out. Fix on next edit |
| `mastery-physio-os-standalone.html` | Requests a font over the network | Point it at `assets/fonts-site.css` when the OS is next opened |
| `os/`, `mastery-physio-os*.html` | Not audited in this pass | Excluded on your instruction. Needs its own contrast pass against the dark application surface |

## 7. Reviewer

Dr. Sharilyn Rennie
