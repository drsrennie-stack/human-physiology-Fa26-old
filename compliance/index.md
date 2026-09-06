# BIO 005 Human Physiology, accessibility compliance

**Course:** BIO 005 Human Physiology, Yuba College. Fully online, asynchronous, fourteen weeks.
**Standard:** WCAG 2.2 Level AA minimum, Level AAA where achievable.
**Reviewer:** Dr. Sharilyn Rennie, Professor of Anatomy and Physiology.
**Last updated:** August 23, 2026.

This folder holds one compliance document per deliverable. This page is the one to hand to anyone who asks about the course as a whole: a disability services office, an accreditation review, a department chair, or a student who wants to know before they enroll.

## What exists, and where it stands

| Deliverable | Document | Built | Verified | Status |
|---|---|---|---|---|
| Lab manual, all fourteen weeks | `manual.compliance.md` | Aug 22, 2026 | Aug 23, 2026 | AA met, AAA on every text pair but one |
| Week 1, Foundations and whole body control | `week-01-foundations.compliance.md` | Aug 23, 2026 | Aug 23, 2026 | AA met, AAA on every text pair but one |
| Week 13, Pulmonary function and ventilation | `week-13-pulmonary.compliance.md` | Aug 22, 2026 | Aug 22, 2026 | AA met, AAA on every text pair but one |
| Weeks 2 to 12, and week 14 | not built | — | — | Specified in the manual, tools outstanding |

Week 11's CBC and PCR lab is partly built and has no document yet. It is not in the table above because nothing has been verified.

## The one exception that runs through all of them

Every document in this folder reports the same single AAA shortfall: **the gold eyebrow text on the maroon header reaches 5.75:1**, which meets AA but not the 7:1 AAA threshold. It is small display text and the gold on maroon pairing is the course's visual signal. Switching it to white would reach AAA. That is a live decision, not an oversight, and it is recorded the same way in every document so it cannot be quietly lost.

## Standing decisions that apply to everything here

These were decided once and hold across every deliverable. They are repeated inside each document so that any one document stands alone, but this is the place they are reasoned about.

**Dragging is never the only way.** Every matching task has three independent input paths: drag, click-then-click, and keyboard. WCAG 2.2 criterion 2.5.7 asks for an alternative to dragging; this goes further and treats the keyboard path as equal rather than as a fallback.

**Copy blocking was considered and rejected.** It would obstruct a student using a screen reader, a magnifier, or a translation tool far more than it would obstruct anyone determined to route around the work. The academic integrity design relies instead on per-student seeded data, on answers never appearing in the page, and on gating that requires the intermediate working.

**Color never carries meaning alone.** Correct and incorrect change their wording. Chart flags read the words below range, within range, above range, not obtained. A filled drop box shows its label.

**Nothing is timed and nothing is capped.** No attempt limits, no lockouts, no countdowns anywhere in the course. This matters for students who work slowly, students using assistive technology, and students with accommodations, and it means those accommodations do not need to be engineered around.

**Every page works offline.** No web fonts, no CDN, no external requests of any kind. A student on a poor connection, behind a campus proxy, or working from a phone hotspot gets the identical page.

**Nothing is stored or transmitted.** No cookies, no local storage, no analytics, no network calls. Name and section fields exist only to stamp a printed PDF and are gone when the tab closes. No student identifier ever persists.

## Known limitations across the course

1. **Screen reader testing is Chromium based.** Every document reports verification through the Chromium accessibility tree. A JAWS and VoiceOver pass has not been done on any deliverable and should happen before the course goes live to students.
2. **The interactive pages require JavaScript.** Each carries a `noscript` block pointing to the lab manual, which covers the same material and reads and prints with no scripting at all. That is a genuine equivalent path, not a courtesy message.
3. **The logo is a placeholder** on every page. The three figure mark was constructed from the design system description rather than from the real file. Cosmetic, but it should be swapped before release.
4. **Eleven weeks are unbuilt.** Weeks 2 to 12 and week 14 are specified in the manual against tools that do not exist yet. Each will need its own document in this folder when built.

## How to add a document when a new week ships

Copy the shape of `week-01-foundations.compliance.md`. It has ten sections and the order matters, because it is the order a reviewer reads in: what the thing is, which criteria it meets, the contrast audit, anything unusual about its components, the keyboard flow, the screen reader pass, print behavior, privacy, known limitations, reviewer.

Most of that document describes the **shared engine**, which every week inherits unchanged. When a new week ships, the sections that genuinely need rewriting are the project header, anything unique to that week's own components, and the known limitations. The rest can be carried over, but it has to be re-verified rather than assumed: a claim that was true in week 1 and went stale by week 6 is worse than no claim at all.

Then add a row to the table at the top of this page. A document that exists but is not in that table is a document nobody will find.
