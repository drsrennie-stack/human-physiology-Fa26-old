# Accessibility Compliance Notes

**Project:** BIO 005 Human Physiology, Week 1 Concept Videos
**Files covered:** concept-videos-week01.html
**Date:** August 31, 2026
**Reviewer:** Dr. Sharilyn Rennie

---

## 1. WCAG version and level achieved

Target: WCAG 2.2 Level AA minimum, Level AAA where achievable.
Result: AA met on every applicable criterion. AAA met for contrast on all text except two low-priority pairs noted in section 6.

| Criterion | Level | Status | How it is met |
|---|---|---|---|
| 1.1.1 Non-text Content | A | Pass | Every decorative SVG carries `aria-hidden="true"`. The course mark has `role="img"` and a label. Icon-bearing controls all have visible text labels. |
| 1.3.1 Info and Relationships | A | Pass | Semantic `header`, `main`, `section`, `footer`, `ol`/`li` for the concept list, `label` bound to the autoplay checkbox by `for`/`id`. |
| 1.3.2 Meaningful Sequence | A | Pass | DOM order matches visual order in both the one-column and two-column layouts. |
| 1.4.3 Contrast (Minimum) | AA | Pass | See section 3. Lowest measured pair is 6.27:1 against a 4.5:1 requirement. |
| 1.4.4 Resize Text | AA | Pass | All type in `rem`/`px` with fluid `clamp()` headings; layout reflows to one column at 940px and holds at 200% zoom. |
| 1.4.6 Contrast (Enhanced) | AAA | Partial | All body and heading text clears 7:1. Two secondary status labels on the tinted watched card sit at 6.27:1 and 6.64:1. |
| 1.4.10 Reflow | AA | Pass | No horizontal scrolling at 320px width. |
| 1.4.11 Non-text Contrast | AA | Pass | Focus ring is terra `#8B3A2E` at 7.66:1 on white. The current-concept border is 1.5px terra. The progress bar fill is terra on `#ECEFF4` at 6.64:1. |
| 1.4.12 Text Spacing | AA | Pass | No fixed heights on text containers. |
| 2.1.1 Keyboard | A | Pass | Every control is a native `button`, `a`, or `input`. No custom widgets, no keyboard traps. |
| 2.2.2 Pause, Stop, Hide | A | Pass | Nothing auto-plays on page load. The first video only starts on a user action. Continuous play is a checkbox the student can switch off, and the setting persists. |
| 2.4.1 Bypass Blocks | A | Pass | Skip link to the concept list, visible on focus. |
| 2.4.3 Focus Order | A | Pass | Follows DOM order. |
| 2.4.6 Headings and Labels | AA | Pass | Single `h1`, `h2` for the player and the index, `h3` for the four concept groupings. No level skipped. |
| 2.4.7 Focus Visible | AA | Pass | 3px terra outline with 2px offset on all focusable elements. |
| 2.4.11 Focus Not Obscured | AA | Pass | The sticky player column is the only sticky element and it does not overlay the focusable list beside it. |
| 2.5.8 Target Size (Minimum) | AA | Pass | Smallest interactive target is the concept row at full column width by 48px tall. Buttons are 38px tall by 100px or wider. |
| 3.2.2 On Input | A | Pass | Changing the autoplay checkbox changes no context. |
| 3.3.2 Labels or Instructions | A | Pass | The autoplay checkbox has a visible bound label. |
| 4.1.2 Name, Role, Value | A | Pass | `aria-current="true"` on the playing concept, `aria-pressed` reserved for the toggle chips, `aria-label` on the notes link naming the concept and warning of the new tab. |
| 4.1.3 Status Messages | AA | Pass | A visually hidden `role="status"` region announces each concept change and the end of the set. |
| 2.3.3 Animation from Interactions | AAA | Pass | `prefers-reduced-motion` reduces all transitions to effectively zero. |

---

## 2. Third-party content note

The video player is a YouTube embed. Captions are requested on load with `cc_load_policy: 1`, but caption accuracy and the accessibility of YouTube's own player chrome are outside this file's control. Action item: confirm each of the 20 videos has a reviewed caption track in YouTube Studio rather than auto-captions only.

---

## 3. Color contrast audit

| Foreground | Background | Ratio | Requirement | Result |
|---|---|---|---|---|
| Navy `#0B1530` | White `#FFFFFF` | 18.04:1 | 4.5:1 | AAA |
| White `#FFFFFF` | Navy `#0B1530` | 18.04:1 | 4.5:1 | AAA |
| Terra `#8B3A2E` | White `#FFFFFF` | 7.66:1 | 4.5:1 | AAA |
| White `#FFFFFF` | Terra `#8B3A2E` | 7.66:1 | 4.5:1 | AAA |
| Muted `#4F576A` | White `#FFFFFF` | 7.23:1 | 4.5:1 | AAA |
| Muted `#4F576A` | Off-white `#FAFAF9` | 6.92:1 | 4.5:1 | AA |
| Terra `#8B3A2E` | Off-white `#FAFAF9` | 7.33:1 | 4.5:1 | AAA |
| Navy `#0B1530` | Navy-tint `#ECEFF4` | 15.65:1 | 4.5:1 | AAA |
| Footer `#C9CEDA` | Navy `#0B1530` | 11.45:1 | 4.5:1 | AAA |
| Terra `#8B3A2E` | Navy-tint `#ECEFF4` | 6.64:1 | 3:1 (progress bar, non-text) | Pass |

The muted gray `#4F576A` is the corrected value for the design system's `--navy-55`, which flattened to `#797E8D` at 4.05:1 and failed the AA floor.

---

## 4. Keyboard navigation flow verified

1. Tab 1 reveals the skip link, which jumps to the concept list.
2. Tab moves through the three header chips: play the whole week, pick up where I left off, clear my checkmarks.
3. Tab enters the YouTube player, where the embedded player handles its own key commands.
4. Tab continues to Previous, Next concept, Notes PDF, and the continuous-play checkbox.
5. Tab then walks all 20 concept buttons in order, followed by the podcast link.
6. Enter or Space activates any concept and starts it playing. Focus stays on the activated button, and the hidden status region announces the change.
7. Shift+Tab reverses cleanly. No trap anywhere in the page.

---

## 5. Screen reader testing

Reader: VoiceOver on macOS with Safari, plus NVDA with Firefox on Windows.
Verified:

- Landmarks announce as banner, main, and contentinfo, with the concept list reachable by landmark navigation.
- Heading navigation reaches the page title, the two section headings, and the four concept-group headings in order.
- The playing concept is announced as "current item".
- Watched concepts announce the word "Watched" from the status column, not from color alone.
- Switching concepts fires a polite announcement naming the concept and its position, without interrupting the reader mid-sentence.
- The notes link announces that it opens in a new tab.

---

## 6. Known limitations and remediation plan

1. Two secondary status labels sit at 6.27:1 and 6.64:1, which clears AA but not AAA. These are supporting labels only, never the sole carrier of meaning. Remediation is optional and would mean darkening the tint behind them.
2. Caption quality depends on YouTube. Remediation: review captions for all 20 videos in YouTube Studio before the course opens.
3. The notes PDFs live on Google Drive. Their internal tagging and reading order have not been audited here. Remediation: run each PDF through an accessibility check and add tags where missing.
4. Watched checkmarks are stored in browser storage on one device, so they do not follow a student to a different computer. This is by design, since no student data leaves the device. It is stated on the page as "Watched concepts stay marked on this device."
5. Storage keys are prefixed `bio005-` so they cannot collide with the anatomy repo, which shares the same GitHub Pages origin.

---

## 7. Privacy

No student names, IDs, emails, or any other identifying data are collected, transmitted, or stored. The only stored values are which video IDs have been watched, the last concept opened, and the continuous-play preference, all held in local browser storage on the student's own device.

---

## 8. Reviewer

Dr. Sharilyn Rennie

---

# Addendum: the 20 Week 1 slide decks

**Files covered:** slides-P-what-is-physiology.html through slides-P-experimental-design.html, 20 files
**Date:** August 31, 2026

## Same-as-above criteria

The decks share the page shell, palette, focus styling, reduced-motion handling, status region and iframe height-sender described above, so sections 1, 3 and 7 apply unchanged. Contrast pairs are identical, with one addition: white on terra for the title slide and the header band, measured at 7.66:1, AAA.

## Criteria specific to the decks

| Criterion | Level | Status | How it is met |
|---|---|---|---|
| 1.3.1 Info and Relationships | A | Pass | Each slide is a `section` with an accessible name. Inactive slides carry both `hidden` and `aria-hidden="true"` so they leave the accessibility tree entirely. |
| 2.1.1 Keyboard | A | Pass | Arrow keys, Page Up, Page Down, Home and End step the deck. Every box is a native button. Arrow stepping is suspended while the pen is on so drawing is not interrupted. |
| 2.2.2 Pause, Stop, Hide | A | Pass | Nothing advances on its own. There is no timer and no auto-advance. |
| 4.1.2 Name, Role, Value | A | Pass | Each box button carries `aria-expanded`. Pen color and size buttons carry `aria-pressed` and `aria-label`. The pen toolbar is a labeled `group`. |
| 4.1.3 Status Messages | AA | Pass | Slide changes, the reset action, pen on and off, and ink clearing all announce through a polite status region. |
| 1.4.10 Reflow | AA | Pass | The 1280 by 720 stage is scaled by transform to fit the available box, so the deck never forces horizontal scrolling and never crops content. |
| 2.5.8 Target Size | AA | Pass | Box buttons run the full column width at 62px tall. Pen swatches are 26px with generous spacing; the size buttons are 30 by 26. Both exceed the 24 by 24 minimum. |
| 1.4.11 Non-text Contrast | AA | Pass | The open box is marked by a 1.5px terra border at 7.66:1, and the arrow cue rotates, so open state is never signaled by color alone. |

## The pen layer

The pen draws on a canvas sized to the slide stage and scaled with it, so a mark made in edit view lands in the same place in Present mode. It uses pointer events, which means mouse, trackpad, pen and finger all work, at three widths and five colors. Undo removes the last stroke and Clear ink removes all of them. Ink is not saved between sessions by design, so nothing from one class carries into the next.

Screen reader note: the canvas is decorative annotation over content that is already in text, so nothing is lost when it is not announced.

## Print behavior

Print output is single ink. Every palette hue is redefined to a dark value, the terra title slide loses its fill so it does not photocopy as a solid block, all boxes open so the full content prints, colored key phrases become underlined rather than colored, and box borders drop to a single hairline rule beneath each label. Each slide breaks to its own page, and boxes are set not to split across a page turn.

## Known limitations

1. Present mode opens a new browser window. A popup blocker can stop it, in which case the deck still steps full width in place.
2. Ink is not persisted, so closing the window loses annotations. This is deliberate.
3. The decks reuse the source content from the Week 1 notes PDFs. Where a source PDF had a layout artifact, the corrected version is used and the change is listed in the delivery notes.

---

# Addendum: the Canvas home card

**File covered:** canvas-home.html
**Date:** August 31, 2026

White ground version. Palette, focus styling, reduced-motion handling and the iframe height-sender match the pages above.

| Criterion | Level | Status | How it is met |
|---|---|---|---|
| 1.4.3 / 1.4.6 Contrast | AA / AAA | Pass | Navy `#0B1530` headline 18.04:1, terra `#8B3A2E` eyebrow and accent 7.66:1, muted `#4F576A` body 7.23:1, white on terra button 7.66:1 resting and 10.18:1 on hover. Every pair clears AAA. |
| 1.1.1 Non-text Content | A | Pass | The three-figure mark is `aria-hidden` and decorative. Both buttons carry visible text. |
| 2.4.1 Bypass Blocks | A | Pass | Skip link to the buttons, visible on focus. |
| 2.4.4 Link Purpose | A | Pass | Enter Course, Read the Syllabus, and the setup-check link each state their destination in their own text. |
| 2.4.7 Focus Visible | AA | Pass | 3px terra outline, 3px offset. |
| 2.5.8 Target Size | AA | Pass | Buttons are 56px tall and 180px or wider, stacking full width below 560px. |
| 1.4.10 Reflow | AA | Pass | No horizontal scrolling at 320px. Content height peaks at 767px on a phone, which the 780px iframe covers. |

## Known limitations

1. Canvas strips `<script>` from page content, so the iframe height is fixed at 780 rather than self-sizing. The height-sender is retained for Kajabi and any other host that listens.
2. All three links open in a new tab, which is deliberate so Canvas keeps its place. This is announced in the visible note rather than only in an aria-label.

---

# Addendum: the Week 1 teaching guide

**Files covered:** teaching-guide-week01.html, teaching-guide-week01.docx
**Date:** August 31, 2026

Instructor copy, not linked from any student-facing page. Same palette, focus styling and print discipline as the student pages, so it is covered by the contrast audit in section 3.

- Semantic `nav`, `section`, `article` and a `dl` for the three note types per slide, so a screen reader reads term and definition rather than loose runs of text.
- Heading order is h1 for the guide, h2 per deck, h3 per slide. No level skipped across 20 decks and 85 slides.
- Print gives one deck per page, single ink, 10pt equivalent, with each slide note set not to break across a page turn.
- The DOCX uses real heading styles, so it carries a navigable outline in Word and converts cleanly to a tagged PDF.

## Content integrity

The guide is generated from the same data structure the decks are built from, and the build fails if any deck's note count does not match its slide count. A note cannot drift away from the slide it belongs to.

---

# Fix log

**August 31, 2026, slide overflow.** Slides with several boxes open ran past the bottom of the fixed 1280 by 720 stage and were clipped, since the stage carries `overflow: hidden`. Rather than clip the content, cap how many boxes can be open, or shorten the writing, the slide content is now measured after every open, close, reset, resize and font load, and scaled down just enough to fit. Verified across all 20 decks, 85 slides, every box open, at two viewport sizes: no overflow anywhere, with the largest shrink applied being 0.748 on the five-box biological rhythms slide. The transform is cleared before printing so the packet is unaffected.
