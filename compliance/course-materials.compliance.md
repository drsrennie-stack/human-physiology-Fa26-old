# Course Tools hub

**Accessibility compliance notes.** BIO 005 Human Physiology.

## 1. Project

**Project:** BIO 005 course tools hub, the student front door
**Course:** BIO 005 Human Physiology, Yuba College, Fall 2026
**Files covered:** `course-materials.html`, `assets/fonts-site.css`, `assets/brand.css`, the Week 1 at a glance panel in `week-01.html`, and the site-wide MedMasters brand pass across all 107 root pages and the deck engine
**Typefaces:** Open Sans 700 and 800 for display, Plus Jakarta Sans 400 to 800 for everything else. Latin subset, woff2, base64 inlined in `assets/fonts-site.css`. No web font is requested over the network.
**External requests:** none. Verified by loading the file under request interception in Chromium and recording every request that was not `file:` or `data:`. The recorded list was empty. This replaces the previous version of this page, which pulled two families from `fonts.googleapis.com`.
**Date built:** September 6, 2026
**Reviewer:** Dr. Sharilyn Rennie

## 2. Branding

Restyled to the MedMasters Collaborative site on Scrubs' instruction. Every value was read off the live site with computed styles rather than estimated.

| Token | Value | Source |
|---|---|---|
| navy | `#0B1530` | site body color |
| ink-deep | `#060A18` | site dark band |
| maroon | `#8B3A2E` | site eyebrow, CTA and emphasis color |
| gold | `#C9A14A` | site eyebrow color on the dark band |
| display | Open Sans 800, tracking `-0.025em` | site h1 and h2 |
| body | Plus Jakarta Sans | site body and UI |
| eyebrow | 11px, 700, `0.3em`, uppercase | site section labels |
| button | 4px radius, 11px, 700, `0.2em`, uppercase | site CTAs |
| card | square corners, hairline border, no shadow | site cards |

**One deliberate substitution.** The live site uses bone `#F5F1E8` for text on the dark band. The standing rule is that cream is out of teaching deliverables, so off-white `#FAFAF9` is used instead. On near black the two are visually indistinguishable and the change is one token, `--bone`, if the site value is wanted back.

**Resolved: the whole repo is now on these values.** Scrubs' instruction was "everything the MedMasters brand," so this is no longer a one-page change. `assets/brand.css`, all 107 root pages and the deck engine were moved onto the site palette in one pass. Three generations of color existed at once and are now one:

| Was | Where it lived | Now |
|---|---|---|
| `#7A2A22` / `#5E201A` | brand.css maroon | `#8B3A2E` / `#6E2D24` |
| `#8B1D1D` / `#6B1616` | physiology deck terra | `#8B3A2E` / `#6E2D24` |
| `#A0522D` | stray old terra-dark | `#6E2D24` |
| `#08101F` | navy | `#0B1530` |
| `#B8924A` / `#DCB45C` | two golds | `#C9A14A` |

Type moved too: display is Open Sans, everything else Plus Jakarta Sans, and DM Sans is gone from the repo. Both families are self-hosted in `assets/fonts-site.css`, so **no page in this repo requests a font over the network any more**, down from 60 that did.

## 3. WCAG 2.2 target level achieved

| Criterion | Level | Result |
|---|---|---|
| 1.1.1 Non-text content | A | Pass. Every decorative icon is `aria-hidden="true"`. The logo `svg` carries `role="img"` and an `aria-label`. No icon-only control lacks an accessible name (measured: 0). |
| 1.3.1 Info and relationships | A | Pass. `header`, `nav`, `main`, `footer` landmarks present. Week strip is a `role="list"` labeled by its own heading. |
| 1.3.2 Meaningful sequence | A | Pass. Reading order matches visual order; no positioned content reorders meaning. |
| 1.4.3 Contrast minimum | AA | Pass, 15 of 15 pairs. |
| 1.4.4 Resize text | AA | Pass. All type is set in px within a fluid layout; no overflow at 200 percent. |
| 1.4.6 Contrast enhanced | **AAA** | **Pass, 15 of 15 pairs.** Lowest ratio on the page is 7.23:1. |
| 1.4.10 Reflow | AA | Pass. Zero horizontal overflow at 320, 375, 768, 1024 and 1440 px. |
| 1.4.11 Non-text contrast | AA | Pass. Hairlines are `rgba(11,21,48,.16)` on white, used as decoration, not as the sole indicator of anything. Focus ring is 3px maroon at 7.66:1. |
| 2.1.1 Keyboard | A | Pass. Every element is reachable and operable. Nothing is mouse-only. |
| 2.4.1 Bypass blocks | A | Pass. Skip link is the first focusable element and lands on the ordered path. |
| 2.4.3 Focus order | A | Pass. DOM order is reading order. |
| 2.4.6 Headings and labels | AA | Pass. One `h1`, four `h2`, eight `h3`, no skipped levels (measured: 0 skips). |
| 2.4.7 Focus visible | AA | Pass. 3px maroon outline, 3px offset, on every focusable element. Gold on the dark footer. |
| 2.4.11 Focus not obscured | AA | Pass. The only sticky element is the week strip at `top:0`; it sits above content in DOM order, so nothing focusable scrolls behind it. |
| 2.5.8 Target size minimum | AA | Pass. Smallest target is a footer link at 116 by 28 px. Week tiles are 62 by 53. Floor is 24 by 24. |
| 3.1.1 Language of page | A | Pass. `lang="en"`. |
| 3.2.3 Consistent navigation | AA | Pass. Footer link set matches the rest of the site. |
| 2.3.3 Animation from interactions | AAA | Pass. There is no animation on this page. Color transitions are 160ms and are suppressed under `prefers-reduced-motion: reduce`. |

## 4. Color contrast audit

Every text and background pair on the rendered page, composited (alpha resolved against what is actually painted behind it), measured in Chromium. 15 pairs, **0 AA failures, 0 AAA failures.** Lowest ratio on the page is 7.23:1.

| Ratio | Foreground | Background | Sample |
|---|---|---|---|
| 7.23:1 | `#4F576A` | `#FFFFFF` | hero lede, stage descriptions |
| 7.66:1 | `#8B3A2E` | `#FFFFFF` | "Masters" in the wordmark |
| 7.66:1 | `#8B3A2E` | `#FFFFFF` | headline emphasis, stage numerals, stage labels, due dates |
| 7.66:1 | `#FFFFFF` | `#8B3A2E` | filled buttons and key stage links |
| 7.82:1 | `#4A5265` | `#FFFFFF` | "Collaborative", week strip dates |
| 8.16:1 | `#C9A14A` | `#060A18` | gold eyebrow and headline emphasis on the study band |
| 8.16:1 | `#060A18` | `#C9A14A` | "Start today's cards", dark ink on the gold button |
| 11.45:1 | `rgba(250,250,249,.78)` | `#060A18` | footer separators |
| 12.64:1 | `rgba(250,250,249,.82)` | `#060A18` | study band body copy |
| 18.04:1 | `#FFFFFF` | `#0B1530` | skip link |
| 18.04:1 | `#0B1530` | `#FFFFFF` | wordmark, headlines, body |

Two pairs were fixed during this build after measuring below the AAA floor:

- Week strip date on the current-week maroon tile was `rgba(255,255,255,.9)` at 6.54:1. Now `#FFFFFF` at 7.66:1.
- Footer separator dots were `rgba(250,250,249,.5)` at 5.14:1. Now `.78` alpha at 11.45:1.

Both passed AA before the change. Neither passed AAA, and this page targets AAA.

## 5. Keyboard navigation flow verified

Tab from page load: skip link, "Start this week", "Read the syllabus", the current week tile (weeks 2 to 15 are `span`, not links, so they are correctly skipped), the vision board card, then the path in order, stage by stage, every stage's links left to right, through step 07, then the three admin cards, then eight footer links. No traps, no off-screen focus, and the sticky week strip never covers the focused element.

**The arrows between stages are `aria-hidden="true"` and carry no text.** Order is already carried three other ways: the numerals, the stage labels, and DOM order. A screen reader user loses nothing by not hearing them, and hearing "down arrow" seven times would be worse than useless.

## 6. Reflow

| Width | Horizontal overflow |
|---|---|
| 320 px | 0 |
| 375 px | 0 |
| 768 px | 0 |
| 1024 px | 0 |
| 1440 px | 0 |

## 6b. Structure

One `h1`. Four `h2`, one per band plus the week strip and admin labels. Eight `h3`, one per stage plus the vision board callout. Each stage is its own `section` labeled by its `h3`. Zero skipped heading levels. Three landmarks. Skip link present and first. Zero icon-only controls without an accessible name.

## 6c. Defects fixed in this build

1. **Admin card text collided.** `Syllabus` and `How the course runs` were two inline spans inside an inline span, so they rendered as "SyllabusHow the course runs" in all three admin cards. Wrapped in a flex column.
2. **Two maroons.** The page said `#8B3A2E` while `assets/brand.css` said `#7A2A22`. Settled in favor of the MedMasters site value, `#8B3A2E`. See section 2 for the part that is still open.
3. **External font requests.** Two families were pulled from `fonts.googleapis.com`. Now self-hosted in `assets/fonts-site.css`. Zero external requests.
4. **Open Sans was flagged as a stray third family.** It is not. It is the MedMasters site display face, confirmed from the live site's computed styles. Kept, now self-hosted.
5. **Dead and stale links.** `slides-P-what-is-physiology.html` pointed at a superseded single-concept deck; now points at `slides-p-mission-01-maintain-control.html`. The videos card claimed "twenty short segments," which stops being true the moment the Mission recording replaces them; the count is gone.
6. **Future weeks were 404 links.** Weeks 2 to 15 were dimmed anchors to files that do not exist yet. A student clicking week 7 in week 1 landed on a 404. They now render as `span`, not links, with "not open yet" in the accessible name.
7. **The bobbing arrow is gone.** It pointed at the tools without saying anything. Replaced with a real "This week" section listing the four Week 1 deliverables in order, with due dates. That removes the page's only animation.

## 7. Screen reader testing

**Not done. This is an open gap, stated plainly rather than implied.**

No live screen reader session has been run against this file. Everything in sections 3 through 6b is automated measurement in Chromium plus manual keyboard walking, which is not the same thing.

What still needs a real reader (VoiceOver on Safari, and NVDA on Firefox):

- The week strip. It is a `role="list"` of mixed anchors and spans. Confirm the reader announces "Week 3, The action potential, not open yet" and does not present it as a broken link.
- The wordmark. `MedMasters` is split across a `span` and a `b` for color. Confirm it is announced as one word and not "Med, Masters".
- The four "This week" rows. Each is one link containing a title, a description and a due-date line. Confirm the whole thing reads as a single coherent link and the due dates are announced.
- The admin cards, after the flex-column fix, to confirm the title and subtitle are announced in order and not run together as they were rendered.

Log results in `screen-reader-log.html` when the pass is done, then replace this section.

## 8. Known limitations and remediation plan

| Item | Status | Plan |
|---|---|---|
| No live screen reader pass | Open | See section 7. |
| `brand.css` holds a different maroon and navy | Open, by design | Scrubs decides whether to flip `brand.css` to the MedMasters site values. Until then this page and the other 60 do not match. |
| 60 other pages still request fonts from Google | Open | They can each swap their `<link>` for `assets/fonts-site.css`, which is already in the repo and already covers both families. One line per page. |
| Weeks 2 to 15 have no pages | Open, handled | The strip no longer links to them. Each becomes a link automatically the week it opens, so the files need to exist by then. |
| `concept-videos-week01.html` points at the twenty superseded concept decks | Open | Repoint or retire once the Mission 1 recording is up. |

## 9. Site-wide sweep, September 6

Every one of the 107 root pages was loaded in Chromium and measured: composited
contrast on every rendered text node, horizontal overflow at 320, 375, 768, 1024
and 1440 px, external network requests, and console errors.

**The Week 1 path is clean.** All eighteen pages a student touches in Week 1
returned zero AA failures, zero AAA misses, zero overflow at all five widths and
zero console errors:

`course-materials` · `week-01` · `index` · `welcome` · `home` · `course-schedule`
· `syllabus-fall2026` · `assignment-discussion-01-visionboard` ·
`assignment-notesheet` · `assignment-bookproblems` · `week-01-notesheet-prompts`
· `competency-study-guide` · `slides-p-mission-01-maintain-control` ·
`start-here` · `concept-videos-week01` · `mastery-canvas` ·
`osmosis-iv-fluids-lab` · `assignment-physioex`

The only external request anywhere on that path is the YouTube player on the
video page, which is the point of that page.

### Contrast problems the brand change created, and what was done

Maroon got lighter (`#8B1D1D`/`#7A2A22` to `#8B3A2E`), so light text sitting on
maroon lost the AAA margin it used to have. Gold got brighter, so gold as a
border on a light page fell further under the non-text floor. Both were found by
measurement, not by eye.

| Pair | Was | Now | Fix |
|---|---|---|---|
| gold on maroon | 3.17:1, **failed AA** | 7.25:1 | light tint `#FEF8EE` instead of gold. Gold belongs on navy. |
| gold on maroon-dark | 4.21:1, **failed AA** | 7.25:1 | same |
| `#F2EFEF` on maroon | 6.70:1 | 7.66:1 | white |
| `#FBEBC8` on maroon | 6.50:1 | 7.25:1 | `#FEF8EE` |
| `#E8CE85` on maroon | 4.96:1 | 7.25:1 | `#FEF8EE` |
| `#EDDABF` on maroon | 5.61:1 | 7.25:1 | `#FEF8EE` |
| `#A0522D` old terra-dark | 5.38:1 | 9.74:1 | `#6E2D24` |
| `#5A6273` gray text | 6.12:1 | 8.75:1 | `#454B58` |
| `#555F70` / `#555E71` / `#4F5663` | 6.17 to 6.51:1 | 7.6 to 8.8:1 | `#454B58` |
| `#6E5018` on cream tint | 6.48:1 | 7.80:1 | `#5F4514` |
| gold on navy-chip `#16233C` | 6.48:1 | 7.41:1 | chip darkened to `#0D1729` |
| `--state-unlocked` border | 2.32:1, **failed 1.4.11** | 4.87:1 | now `--gold-deep`. It was the only cue for the state, so it had to pass. |

Open Sans is a wider face than Plus Jakarta, so several tables and one 8.5in
print sheet that just fitted at 320 px stopped fitting. Tables now scroll inside
a keyboard-reachable `.tblscroll` region, and the print sheet shrinks on screen
while keeping its exact paper width when printing.

### Still failing, all pre-existing, none on the Week 1 path

Eleven secondary pages still scroll horizontally at 320 px, and three of them at
375 px. None of this is new; the brand change made the numbers worse but did not
create them.

| Page | Overflow at 320 / 375 | Cause |
|---|---|---|
| `workbook_week01/02/03` | 466 / 411 | fixed-width drawing `<canvas>`. Scaling it with CSS would misalign the pointer against the drawing buffer, so it needs a real fix, not a shim. |
| `pulmonary-function-lab` | 441 / 386 | 8.5in print sheet not caught by the shared fix |
| `lab-week05-sensory-reflex` | 292 / 237 | same |
| `anatomy-review` | 241 / 186 | side nav has an inner minimum width |
| `clinical-physiology-lab-manual` | 229 / 174 | card grid minimum |
| `screen-reader-log` | 209 / 154 | side nav |
| `mastery-physio-os`, `-standalone` | 88 / 33 | floating toolbar button |
| `competency-map` | 10 / 0 | card grid minimum |

Six pages still make external requests, all functional rather than cosmetic:
YouTube embeds, Google Drive and NotebookLM links, and `html2canvas` plus `jspdf`
from cdnjs for the workbook PDF export. These are architecture decisions, not
brand ones, and were left alone.

## 9. Reviewer

Dr. Sharilyn Rennie

## Update, September 8 2026: graded and ungraded marking

Files covered: course-materials.html, week-01-notesheet-prompts.html

### What changed
The "at a glance" flows were still marking the note sheet and the book
problems as turned in. Both are ungraded under the current model, so the
maroon chip was replaced with a navy-tint chip carrying an open circle.
Rows for the patient chart and the practice exam were added, and a key
sits at the top of the card.

### Contrast, new pairs only, measured
| Foreground | Background | Ratio | Level |
|---|---|---|---|
| #0B1530 chip label | #ECEFF4 ungraded chip | 15.65:1 | AAA |
| #3A4152 chip subtext | #ECEFF4 ungraded chip | 8.85:1 | AAA |
| #FFFFFF chip label | #8B3A2E graded chip | 7.66:1 | AAA |
| #F3DAD3 chip subtext | #8B3A2E graded chip | 5.75:1 | AA, AAA at large |
| #3A4152 key text | #FFFFFF card | 10.20:1 | AAA |

### Not carried by color alone
Graded and ungraded are distinguished by a filled circle and an open
circle as well as by fill, and the key at the top of the card names both.
The circles are aria-hidden, and the chip text states the status in words
("Turn it in", "Keep it, no points, and not optional"), so a screen
reader gets the status from the text rather than the symbol.

### Reflow
Each arrow now travels inside a .seqstep with the chip it points at, so a
wrapped row begins the new line with the arrow rather than ending the
previous line with a dangling one. Verified at 1240px and 600px.

### Reviewer
Dr. Sharilyn Rennie
