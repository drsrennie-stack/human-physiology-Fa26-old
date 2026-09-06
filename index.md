# BIO 005 Human Physiology, accessibility compliance

**Course:** BIO 005 Human Physiology, Fall 2026. Fully online, asynchronous, fourteen weeks.
**Standard:** WCAG 2.2 Level AA minimum, Level AAA where achievable.
**Reviewer:** Dr. Sharilyn Rennie, Professor of Anatomy and Physiology.
**Last updated:** August 23, 2026.

One document per deliverable, all in this folder, all named for the thing they cover. This page is the one to hand to anyone who asks about the course as a whole: a disability services office, an accreditation review, a department chair, or a student who wants to know before they enroll.

## What exists, and where it stands

| Deliverable | Document | Verified | Status |
|---|---|---|---|
| Course entry page | `course-entry.compliance.md` | Aug 2026 | AA met |
| Lab manual, all fourteen weeks | `manual.compliance.md` | Aug 23, 2026 | AA met, AAA but one pair |
| Week 1, Foundations and whole body control | `week-01-foundations.compliance.md` | Aug 23, 2026 | AA met, AAA but one pair |
| Week 13, Pulmonary function and ventilation | `week-13-pulmonary.compliance.md` | Aug 22, 2026 | AA met, AAA but one pair |
| CBC and PCR pattern lab | `cbc-pcr-lab.compliance.md` | Aug 2026 | AA met |
| Osmosis and IV fluids lab | `osmosis-iv-fluids.compliance.md` | Aug 2026 | AA met |
| Drawing canvas, mastery canvas replacement | `mastery-canvas.compliance.md` | Aug 2026 | AA met |
| Spaced recall card system | `spaced-recall.compliance.md` | Aug 2026 | AA met |
| Weeks 2 to 12, and week 14 | not built | — | Specified in the manual, tools outstanding |

A deliverable is not finished until its document exists **and** appears in this table. A document that exists but is not listed here is a document nobody will find.

## Naming

`<artifact>.compliance.md`, in this folder. Nothing else.

This was consolidated on August 23, 2026 from two conventions that had grown up side by side: five documents named `compliance-notes-<thing>.md` at the repo root, and three named `<thing>.compliance.md` in this folder. One of the five was called plain `compliance-notes.md` while actually covering only the CBC and PCR lab, and another carried an instruction to append itself into that file. Following that instruction would have merged two unrelated artifacts into one document and left neither citable on its own.

The rule that stops it recurring: **a compliance document is named for exactly one artifact, and is never appended to another.** When a deliverable ships it gets its own file and its own row above.

## Standing decisions that apply to everything here

Decided once, and they hold across every deliverable. Each document restates the ones that bear on it so any single document stands alone, but this is where they are reasoned about.

**Dragging is never the only way.** Every matching task has three independent input paths: drag, click-then-click, and keyboard. WCAG 2.2 criterion 2.5.7 asks for an alternative to dragging; this treats the keyboard path as equal rather than as a fallback.

**Copy blocking was considered and rejected.** It obstructs a student using a screen reader, a magnifier, or a translation tool far more than it obstructs anyone determined to route around the work. Academic integrity rests instead on per-student seeded data, on answers never appearing in the page, and on gating that requires the intermediate working.

**Color never carries meaning alone.** Correct and incorrect change their wording. Chart flags read the words below range, within range, above range, not obtained. A filled drop box shows its label.

**Nothing is timed and nothing is capped.** No attempt limits, no lockouts, no countdowns anywhere in the course. This matters for students who work slowly and students using assistive technology, and it means an accommodation does not have to be engineered around after the fact.

**Every page works offline.** No web fonts, no CDN, no external requests. A student behind a campus proxy or on a phone hotspot gets the identical page.

**Nothing is stored or transmitted.** No cookies, no analytics, no network calls. Name and section fields exist only to stamp a printed PDF and are gone when the tab closes. No student identifier ever persists.

## Known limitations across the course

1. **Screen reader testing is Chromium based.** Every document reports verification through the Chromium accessibility tree. A JAWS and VoiceOver pass has not been done on any deliverable and should happen before the course goes live.
2. **The interactive pages require JavaScript.** Each carries a `noscript` block pointing to the lab manual, which covers the same material and reads and prints with no scripting. That is a genuine equivalent path, not a courtesy message.
3. **One AAA shortfall runs through every page built on the teaching palette.** The gold eyebrow on the maroon header reaches 5.75:1, which meets AA but not the 7:1 AAA threshold. It is small display text and the gold on maroon pairing is the course's visual signal. Switching it to white would reach AAA. Recorded identically in every document so the decision cannot be quietly lost.
4. **The logo is a placeholder** on the pages built in August 2026, constructed from the design system description rather than the real file.
5. **Eleven weeks are unbuilt.** Weeks 2 to 12 and week 14 are specified in the manual against tools that do not exist yet.

## Adding a document when something new ships

Copy the shape of `week-01-foundations.compliance.md`. Ten sections, and the order matters because it is the order a reviewer reads in: what the thing is, which criteria it meets, the contrast audit, anything unusual about its components, keyboard flow, screen reader pass, print behavior, privacy, known limitations, reviewer.

Most of that document describes the **shared engine** in `src/engine/`, which every week page inherits unchanged. When a new week ships, what genuinely needs rewriting is the project header, anything unique to that week, and its own known limitations. The rest carries over, but it has to be re-verified rather than assumed. A claim that was true in week 1 and went stale by week 6 is worse than no claim at all.

Then add a row to the table above.
