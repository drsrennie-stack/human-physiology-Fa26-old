# Compliance notes: Canvas build, BIO 005 Human Physiology

Files covered: `lecture-week.html` (student-facing, repo root), `canvas-build-guide.html` and `canvas-snippets.txt` (instructor tools), and the Canvas-native page snippets inside them (front page, Start Here pages, Step 1 note sheet page, Step 7 practice round page, midterm assignment text).
Date: September 7, 2026.

## WCAG version and target

WCAG 2.2, Level AA met on every file. AAA contrast met on every text pair in `lecture-week.html` and on body text in the guide. The instructor guide's code blocks (light text on navy) are AA, not AAA, because the snippet text is monospace at 12.5 px and the dark block is what makes it readable as code.

## Colour contrast audit

| Pair | Where | Ratio | Result |
|---|---|---|---|
| Navy #0B1530 on white #FFFFFF | body text, headings, both files | 17.9:1 | AAA |
| Rust #8B3A2E on white #FFFFFF | eyebrows, links, "kind" labels, step numbers | 7.6:1 | AAA |
| Slate #5B6070 on white #FFFFFF | settings lines, meta text in the guide (14 px and 13 px) | 5.9:1 | AA (AAA for large) |
| Gold #C9A14A on navy #0B1530 | guide header eyebrow | 7.5:1 | AAA |
| White on navy #0B1530 | guide header, code blocks (#EAEAF0 on navy) | 16.5:1 | AAA |
| White on rust #8B3A2E | copy buttons, assignment kind chip | 7.6:1 | AAA |
| White on #5A3E85 | discussion kind chip | 8.1:1 | AAA |
| White on #2E5E4E | URL kind chip | 7.4:1 | AAA |
| White on #8A6A1F | quiz kind chip | 5.2:1 | AA (10 px bold uppercase; raise to #6F5418 if AAA is wanted) |
| White on slate #5B6070 | header kind chip | 5.9:1 | AA |

The Canvas-native snippets carry no colour of their own; they inherit Canvas's theme, which Yuba's Canvas admin is responsible for.

## Keyboard navigation

`lecture-week.html`: skip link first in the tab order, then the brand mark, then each card's title link and its "open" link in reading order, then the week navigation, then the footer. Every link is a real anchor. Focus is visible: 3 px rust outline, offset 3 px, on every focusable element. Nothing is a click target without also being a keyboard target. There are no traps.

`canvas-build-guide.html`: skip link, section pills, then each week's `<details>` summary (native disclosure, Enter and Space toggle it), then every copy button and every `<pre>` block (tabindex 0 so the snippet can be selected and read without a mouse). Copy buttons have an `aria-label` naming what they copy. The button reads "Copied" for 1.6 seconds after use; the state change is visible and the button text is the accessible name, so a screen reader announces it on refocus. The clipboard call falls back to a hidden textarea and execCommand where the async clipboard is unavailable.

## Screen reader testing

Verified against the accessibility tree in headless Chromium (Playwright) and by reading the DOM order:

- One `<h1>` per page; headings descend without skipping.
- Landmarks: `header`, `main`, `nav` (labelled "Other weeks" / "Sections"), `footer`.
- `lecture-week.html` main region carries `aria-live="polite"` because its contents are written by script after load.
- The brand mark SVG has `role="img"` and an `aria-label`; all other SVG is inside a labelled link.
- Card titles are links with the full title as link text; the "Open the notes" links repeat the title in an `aria-label` so a links list is not a column of identical "Open" items.
- Iframe snippets all carry a `title` attribute naming the content, and every one is followed by a plain text link to the same URL for students whose network or Canvas mobile app blocks the frame.
- Nothing conveys meaning by colour alone: step numbers, kind labels and requirement text are words.

VoiceOver and NVDA were not run in this session; the checks above are structural. Run one pass with VoiceOver on the published `lecture-week.html` before it is linked from Canvas.

## Motion

Card hover lift and button colour transitions are wrapped in `prefers-reduced-motion: reduce`, where all transitions are disabled.

## Known limitations and remediation

1. The iframe height sender inside every site page does nothing in Canvas because Canvas has no listener. Frames are given fixed heights measured at 960 px wide; at narrow widths some pages will show an inner scrollbar. The fallback link under each frame is the remediation. A Canvas admin could add the listener to the institution theme JavaScript, which would remove the limitation entirely.
2. The syllabus frame is 14,500 px tall. It is accessible (one long page, native scrolling), but on a phone it is a long scroll. The snippet's settings note offers the link-only alternative.
3. Printing the note sheet must happen from a new tab, never from inside a frame; the Step 1 page opens it in a new tab and says why.
4. The `<details>` disclosure in the guide is native HTML and works with every current screen reader, but a reader that does not announce expanded state on a `summary` will still get the content once it is opened.

## Reviewer

Dr. Sharilyn Rennie
