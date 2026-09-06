# BIO 005 handoff, September 2 2026

Five files plus this note. Everything drops into the repo root. Built against
HEAD ea4b05e, which is unchanged as of tonight.

## What is in the drop

| File | What it is |
|---|---|
| `syllabus-fall2026.html` | The Fall 2026 syllabus, on the BIO 004 document architecture: cover, contents, 16 numbered sections, signed final word. MedMasters tokens, light hero, flat hairline boxes, no em or en dashes anywhere. Two "not posted yet" flags remain: the midterm windows (Sections 07, 09, 14) and nothing else. |
| `competency-packet-fall2026.html` | The regenerated Competency Packet. Three parts at the real seams: Midterm 1, Weeks 1 to 5, 99 competencies. Midterm 2, Weeks 6 to 10, 75. Midterm 3, Weeks 11 to 15, 94. All 268 present exactly once, grouped by week in teaching order, entry expectations retagged by midterm block. Replaces `competency-packet.html` and the PDF. |
| `bio005-competencies-3midterms.csv` | Machine-readable retag: new display number, midterm, week, week title, unchanged id, old number. Everything keyed to `w1-*` ids or old numbering migrates with a lookup, not a rewrite. |
| `physioex-lab-map-fall2026.md` | The lab decision of record. PhysioEx 10.0 assigned weekly, all 12 exercises used, four split across two weeks each. Resolves PLACEHOLDERS Group 1 item 1. Custom builds remaining: Week 5 sensory and reflex home lab, plus three one-page worksheets. |
| `stanford25-video-map-fall2026.md` | Clinical Correlations: 19 Stanford Medicine 25 exams across 8 weeks with observation questions, copyright and caption rules, the answerable-from-text accessibility rule, and the standing exclusion of the pelvic, rectal and breast exams. |

## Decisions of record made September 2

1. **Grade model.** Note sheets 20 (five graded for accuracy, rest for completion),
   three draw-and-teach midterms 50, PhysioEx lab 15, book problems 15.
   Supersedes the Aug 23 BIO005_GRADING weights.
2. **Three midterms, not five unit exams.** Blocks at weeks 5, 10, 15.
3. **Everything due Sunday night.** 0 to 24 hours late is an automatic 50 percent,
   after 24 hours a zero, no exceptions including emergencies. The cushion is
   the weeks-ahead posting, in front of the deadline rather than behind it.
4. **Labs run on PhysioEx**, purchased through Access Pearson in Canvas with the
   Silverthorn 9e eText included. Lab skills are verified on the midterm
   teach-backs, not in the auto-graded lab category.
5. **Workload framing.** 14 hours a week is stated as the Carnegie floor.
   The syllabus tells students to plan 16 to 20, and 20 to 30 for the A or B
   that health programs require, more if anatomy is missing or concurrent.
6. **Office hours** Wednesdays 9:00 to 10:00 am on Zoom.
7. **Clinical Correlation** is the official name of the bedside-video element.
8. **Excluded by decision:** pelvic, rectal and breast exams, never assigned
   or linked.
9. **No Scholar Points in BIO 005.** The syllabus carries no Scholar Points
   section and the no-extra-credit policy has no carve-out. Scholar Points
   remain a BIO 004 feature only.

## The ripple list, nothing here blocks Monday

- `competency-packet.html` and `BIO005-Fall2026-Competency-Packet.pdf` come
  down when the new packet goes up.
- The Mastery OS and `unit-0*.html` pages still group by the five modules.
  Cards and ids are untouched, so this is presentation only. Migrate with the
  CSV lookup when there is time.
- `bio005-schedule-fall2026.js` still carries `BIO005_GRADING` from Aug 23 and
  the pre-LANGUAGE week title for Week 9. Regenerate.
- `silverthorn-chapter-map.md` weeks 3 to 8 do not match the schedule of
  record. Redistribute the chapter halves before those week pages are built.
- `start-here.html` says 14 hours a week and defaults its slider to 14.
  Move it to the floor-versus-realistic framing so it stops arguing with the
  syllabus.
- `tools/language-audit.py` currently flags `course-schedule.html` for
  "Asynchronous online". One string.
- `bio005-credit-model.js` still describes Scholar Points as sitting on top
  of the suggested weights. Strip them when the credit model is regenerated
  to the adopted 20/50/15/15.

## Compliance notes, for the two student-facing pages

Audited September 2, in-session, results below. Late in the session the
tokens were realigned to the live medmasterscollaborative.com values pulled
from the medmasters-site repo: navy #0B1530 (the course card CSS had deepened
this to #040711; the site itself never did, and these two documents now follow
the site, worth standardizing one way across the repo), gold #C9A14A, cream
#F5F1E8 as the dark-band text tone, Plus Jakarta Sans as the only family.
Following the precedent in medmasters-cards.css, one derived value was
adjusted to hold the floor: muted text is rgba(11,21,48,.75), the lightest
alpha on the #0B1530 base that clears 7:1. Full pair table recomputed on the
new tokens: worst ratio anywhere 7.33:1, every pair AAA. Repeat with `hard-audit.js`
against the live pages after upload, same as everything else, and log it.

**axe-core 4.13.0, WCAG 2.0/2.1 A and AA rule set: 0 violations on both
pages.** Run under jsdom, which cannot execute the visual rules, so color
contrast was verified separately by computation (below) and the two
"incomplete" items it reports (landmark-one-main, page-has-heading-one) are
jsdom layout limitations, both satisfied in the markup: one main landmark, one
h1 per page.

**Contrast, computed from the tokens, every pair in both documents.** Lowest
ratio anywhere: 7.33:1 (terra on offwhite). Every pair clears the 7:1 AAA
floor this course holds, not just AA. Highlights: body navy on white 20.12:1,
muted navy-70 on offwhite 7.71:1, terra eyebrows 7.66:1, links 10.26:1, every
grade-bar segment 7.66:1 or better, gold segment carries navy text at
10.28:1, table headers 17.18:1, exam and not-posted-yet rows 17.54:1.

**Hardening applied during the audit:** the syllabus cover is a header
landmark, so all content sits in landmarks; the 34 key cells in the data
tables are true row headers (th scope="row"); lists styled with
list-style:none carry role="list" so VoiceOver keeps announcing them as
lists; the grade bar is a single labeled image so its segments never rely on
color alone; forced-colors rules give every box a real border; focus is the
navy outline with the gold ring on every interactive element; both pages have
a skip link, print cleanly with no ink blocks, and reflow at narrow widths.

**Tagged PDFs, generated September 2.** `syllabus-fall2026.pdf` (18 pages) and
`competency-packet-fall2026.pdf` (34 pages), rendered from the audited HTML
with WeasyPrint as PDF/UA-1. Verified with pikepdf: Marked true,
StructTreeRoot present, document language en, DisplayDocTitle on, real
document titles, and full semantic tag trees (the syllabus carries 1,274
structure elements including H1/H2/H3 heading levels, 7 tables with TH cells,
15 lists, and tagged links; the packet carries 4,116). Both use the brand
fonts embedded, the BIO 004 running footer (course line left, college and
Page N of N right, none on the cover), and a live contents page whose entries
carry real page numbers. The HTML pages remain the online version; the PDFs
are the print and download version, one source for both.


## The welcome experience, ported September 2

`welcome.html` is the BIO 004 welcome, ported whole to BIO 005: the
multilingual greeting that lands on Welcome, the rising three-figure mark, the
guided tour, the progress checkmarks, the returning-student screen with the
week gate, and Hootie. Per the anatomy repo's course-design-system.md, which
is hereby adopted as the BIO 005 design authority.

What changed inside: one section (Sutter Internet, no picker), the eight tour
cards are now Course tools, Syllabus, Competency Packet, Mastery OS, This
week's videos, Course schedule, Labs in PhysioEx, and Anatomy refresher. The
week gate runs three Parts on the Sep 8 calendar with Midterms at weeks 5, 10
and 15. Hootie's whole answer engine was rewritten: grading now answers
20/50/15/15, exams answer draw-and-teach, TBL became note sheets, contacts are
Yuba (srennie@yccd.edu, DSPS, tutoring), and his intent keywords match the new
course. Zero anatomy-course residue remains, verified by scrub.

Tour link targets, all verified against the repo root or this drop:
home.html, mastery-physio-os-standalone.html, concept-videos-week01.html,
course-schedule.html, anatomy-review.html exist in the repo;
syllabus-fall2026.html and competency-packet-fall2026.html ship in this
bundle. The page needs a live browser for its animation and tour; the intro
was visually verified in a static render.

Experience chain as it now stands: Canvas card, canvas-home.html,
welcome.html (this port), home.html dashboard, with the dock on every page.
Next fixes in the walk: bring canvas-home and home.html up to the
design-system doc, and align start-here.html's hours framing.

## Wired and organized for cognitive load, September 2, late

Weeks 2 to 15 regenerated. Every already-built asset is now hooked into its
week: the osmosis and IV fluids lab (Week 3), the membranes and membrane
potential workbooks (Weeks 3 and 4, mapped by content, their filenames carry
the old week numbers), the CBC and PCR lab (Week 11), the pulmonary function
lab (Week 13), and the patient case file (Week 15). Six dead wires in
existing pages fixed (three in the Mastery OS, three in index.html), and
start-here now tells the same hours story as the syllabus.

The load design: every week page carries its orientation in the eyebrow
(Part, week N of 15), and knows its own open date. Before a week opens, a
student who clicks ahead sees one calm line, this week opens on its Monday
and nothing is due, with zero warning chips. After it opens, the chips appear
only where content is genuinely still pending. The five steps read as bare
rust numerals on hairline rows, one action per row, one link per action.

Final crawl: 31 pages, zero dead wires. The wiring map (wiring-map.html) is
the review surface; the gold content flags on it are the build list, which is
note sheets, weekly videos and problem numbers, the Week 5 home lab, the
hormone cycle worksheet, and the ECG strip packet.

## Week 1 split for cognitive load, September 5

week-01.html is now the one to do page: the same five step hub as every other
week, the Week 1 dates (everything due Sunday September 13 at 10:00 pm, the
introduce yourself post by Friday the 11th), and nothing else. The 232KB
notes page moved whole to week-01-notes.html, reachable from step 2, with the
dock removed so it is only the notes and their own contents list. Every week
hub footer trimmed to three links: Course home, Schedule, Syllabus. The
Mastery OS link lives inline in the Practice step where it is used. Note: the
version of week-01 with the at a glance card grid in the screenshot is local
and not in the repo; this split was rebuilt from the repo page plus the dates
visible in the screenshot. Crawl after the split: zero dead links.
