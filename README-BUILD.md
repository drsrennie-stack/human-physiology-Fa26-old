# BIO 005 navigation, schedule and date gating
September 5 2026. Upload to drsrennie-stack/human-physiology-Fa26.

This replaces the two earlier bundles from today. If you have not uploaded them, skip them.
Everything is in here.

## How to upload

1. Drag everything except the `os` folder into the repo root.
2. Open `os` in GitHub and drag in the three files from this bundle's `os` folder.

Do not drag README-BUILD.md.

---

## 1. Nobody gets stranded

Thirty-three of your eighty-two pages were dead ends. A student who landed on one had no
link to anything: not back, not home, not to Canvas. That list included the syllabus, the
course schedule, the Week 1 concept videos page, all four labs, the lab manual, the patient
file, start-here and the course entry page. The cause was that only 18 pages loaded
`bio005-dock.js`; the other 64 had whatever their own HTML happened to include, and most
included nothing.

**`bio005-nav.js`**, now on all 98 pages, puts two things on every one.

A **back bar** that names where it goes: "Back to Week 1", "Back to the Clinical Physiology
Lab manual", never a bare "Back". Beside it is a breadcrumb so a student can jump two levels
instead of clicking back three times. It is built from a page map, not from browser history,
so it reads the same whether they arrived from the dock, from Canvas, from a QR code, or
from a bookmark in November. Pages that already carry your site header with its own back
control do not get a second one.

A **footer** on every page with the eight links you asked for: Course home, Syllabus, Course
schedule, Course materials, Lab manual, All course pages, Canvas, and Dr. Rennie's Virtual
Office. Internal links carry target="_top" so they break out of the Canvas iframe. The two
Canvas links open in a new tab with rel="noopener".

Pages added later inherit a parent by prefix, so a future `week-16.html` or `lab-anything.html`
gets correct navigation with no edit.

**`404.html`** is the one that closes the hole for good. GitHub Pages serves it for any
address that does not exist, so a typo, an old bookmark, or a link to something you have not
built yet now lands on a course page in your branding that says nothing is wrong with their
computer and gives six ways onward. It also asks them to report which page sent them there,
which turns your students into your broken-link report.

**`sitemap.html`** lists all 77 student pages in six groups. This is the fallback you asked
about. It says plainly that Canvas holds grades and submissions while the course site holds
everything they read and practice with, that neither depends on the other, and that if
Canvas is down they should do the work and email you. Tell them to bookmark it. Duplicates
and the four instructor-only pages are deliberately left off.

---

## 2. The schedule now matches the calendar, everywhere

You chose the calendar version, the one that fixes the Week 5 overload. Three files
disagreed with each other. They now all say the same thing.

| Wk | Title | Was |
|---|---|---|
| 4 | How cells talk, and the electrical signal | The action potential |
| 5 | Synapses and central integration | The nervous system, from sensing to moving |
| 6 | Sensing the world, and the responses you do not control | How muscle makes force |
| 7 | Muscle, and how movement gets commanded | Hormones, the slow control system |
| 8 | Hormones and reproduction, the slow control system | Reproduction, and positive feedback |

Weeks 9 to 15 keep their content and four titles were tidied to match the calendar wording.

**75 competencies moved week**, and the `week` field in `bio005-competencies.js` and the
week lists in `bio005-schedule-fall2026.js` were both rewritten so they still agree. No
competency id changed, none were added or removed, the count is still 268.

Where they went: membrane potential, neurons and neuroglia and electrical signaling to Week
4. Synaptic transmission and central integration to Week 5. General sensory, special senses
and autonomic to Week 6. Skeletal muscle, cardiac and smooth muscle, and motor control to
Week 7, which is why that week is now called "and how movement gets commanded". Cell
signaling, endocrine principles and reproductive physiology together in Week 8.

**The overload is gone.**

| | Before | After |
|---|---|---|
| Heaviest week | Week 5 at 17.5 hours | Week 13 at 10.2 hours |
| Weeks 4 to 8 | 7.4, 17.5, 8.3, 7.6, 2.8 | 7.4, 5.8, 9.8, 9.9, 10.0 |
| Term average | 7.2 hours | 7.2 hours |

The syllabus table in `syllabus-fall2026.html` was updated to match, all fifteen rows. The
midterm blocks still close on Weeks 5, 10 and 15, so that language is unchanged and still
true.

---

## 3. Weeks open on a date, and early on Saturday night

**Week gating.** `bio005-gate.js` was deleted on September 7, 2026: nothing loaded it, and
it described a rule the course does not use. The live rule lives in `week-navigator.html`
(`unlockAt`) and `welcome.html` (`hgUnlock`), and the two must stay identical. Two weeks are
open at any time. A week unlocks at noon on the day the previous week opens, so the moment
Week 2 opens, Week 3 unlocks. Week 1 is the exception and opens at noon on the Saturday
before the term starts. Weeks a student has finished stay open for the rest of the term.

A locked week does not show a wall. It says which day it opens, names the exact Saturday
evening early access begins, says plainly that the material is still being written rather
than being withheld, and gives six things that are open every day of the term: the Mastery
OS, the competency study guide, the lab manual, the course schedule, the course home and the
site map.

Times are shown as Pacific and labeled Pacific, not translated into the student's device
timezone, so everyone in the class is reading the same clock Canvas uses.

Nothing else is gated. The recall cards, the OS, the study guide, the syllabus, the schedule
and the labs are open from day one, as you said.

Week pages 2 through 15 are in this bundle already wired to the gate. When you write the
real page for a week, keep the `data-b5-week="N"` attribute on `<main>` and the
`data-b5-gate` wrapper around the content, and the gating keeps working with no other edit.

### The dock now says when, not "soon"

Tiles can carry an opening date and will read "Opens Sat Oct 10" instead of "Soon", then
become live links by themselves the moment that time passes.

Ten tiles still say "Soon" because I do not have dates for them, and inventing dates for
your course is not mine to do. There is a block near the top of `bio005-dock.js` called
`BIO005_PLANNED` with all ten already written out and commented off. Delete the `/*` and
`*/` around a line, set the date, and that tile starts announcing it:

    'review-chemistry.html': '2026-09-19T20:00:00-07:00',

Use `-07:00` through November 1 and `-08:00` after that. Send me the ten dates and I will
fill them in.

Seven other tiles that said "Soon" now work, because the pages already existed and were
misnamed: course materials in five places, the lab manual, the drawing canvas, the anatomy
review, brain dump practice, the syllabus, and Virtual Office, which now goes to your Canvas
discussion.

---

## Verified, not asserted

Headless Chromium across every page type. All 98 pages render the back bar, except the
course home which is the top of the tree and correctly has none, and all 98 render the
eight-link footer. No JavaScript errors.

The gate was tested against a moved clock. Week 2 at 7 pm Pacific on Saturday September 12
is locked. At 8:30 pm the same evening it is open. Week 5 on October 4 is open. Today all
fourteen are locked, as they should be.

axe-core against WCAG 2.0 A and AA, 2.1 A and AA and 2.2 AA on eleven pages including the
locked week pages, the site map and the 404: **zero violations**.

Contrast, all AAA: back bar text 11.49:1, back bar link 10.16:1, footer link 18.34:1,
footer body 11.24:1, white on maroon 9.63:1, eyebrow on maroon 7.05:1.

The breadcrumb is a `nav` labeled Breadcrumb holding an ordered list with the current page
marked `aria-current="page"`. The footer is a `footer` landmark holding a `nav` labeled
Site. A skip link is added to any page that lacked one. Focus is visible at 3px gold. Motion
respects prefers-reduced-motion. Navigation is hidden in print.

---

## For the POCR review

Section A is 14 elements about navigation and whether a student can find things. Consistent
navigation on every page, a breadcrumb that names its destination, one page that lists
everything, a real 404, and dates rather than "coming soon" are five separate things a
reviewer looks for, and they were the weakest part of an otherwise strong course.

## Still open, none of it blocks Monday

`accessibility.html` and a getting-help page do not exist yet, so they are not in the footer.
Both are worth having before a review.

`week-01.html` is titled "Homeostasis: how your body holds itself steady" while the calendar
and the syllabus both call Week 1 "How physiology works and what keeps you steady". One of
the two should change. I left it alone because the page is yours and the h1 is part of the
teaching, not just a label.

Four duplicates are worth deleting by hand in the GitHub UI once you are past Monday:
`canvas-start.html`, which is still titled BIO 004, `physiology-course-map.html`,
`physiology-course-home.html`, and `schedule.html`. They carry the new navigation meanwhile,
so nobody gets stranded on them in the interim.
