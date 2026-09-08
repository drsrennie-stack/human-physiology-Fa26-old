# Push this, then do the two Canvas steps at the bottom

Repo: `drsrennie-stack/human-physiology-Fa26`. Drop these files in at the same
paths, keeping the folder structure. Nothing here renames or deletes anything
you already have.

---

## What changed and why

### 1. The note sheet is now a sheet, not instructions for a sheet

**New: `note-sheet.html`**, plus 18 ready-made PDFs in `sheets/`.

Four blank boxes per competency:

| Box | Label |
|---|---|
| 1 | Draw it (the big one, full height on the left) |
| 2 | Label every part |
| 3 | What happens, in order |
| 4 | What breaks if this fails |

**No rule lines anywhere.** Blank white, because ruled boxes invite paragraphs.
Printed at the top of every sheet:

> Every one of these boxes is **drawn**. If you need words, they go inside
> little boxes with arrows between them, in the order things happen. Sentences
> running across the page do not count.

Each competency carries its number pre-printed in a box, the concept name, the
full "You should be able to" text, prompt A/B tick boxes, and two blanks for
their pass 1 and pass 2 pen colors. Name and date on the top right of the
sheet.

**Nobody has to print 18 pages.** There is a 1 / 2 / 3 control at the top and
it **opens on 2**. Week 1 costs:

| Setting | Week 1 | Heaviest week (5) | Lightest weeks |
|---|---|---|---|
| 1 per page | 18 sheets | 35 | 7 |
| **2 per page, the default** | **9 sheets** | **18** | **4** |
| 3 per page | 6 sheets | 12 | 3 |

Two per page keeps the drawing box about 2.4in tall, which is still a real
drawing. Three per page drops it to about 1.6in. It fits, it is measured, but
it is the economy setting and the page does not pretend otherwise.

`sheets/` has every week at two per page, plus Week 1 at 1up and 3up so you can
see the difference, plus the blank variant.

**And printing is optional.** A new section on the page, *"Not printing? Rule
this onto your own paper"*, is a drawn template: the four boxes with their
labels, filled in with a worked **anatomy** example (long bone structure, from
BIO 004, so there is nothing on it a physiology student can copy). It shows the
picture in box 1, the labels on leader lines in box 2, the three-box arrow
chain in box 3, and the same chain in box 4 with the failed box crossed out and
an arrow to what stops. Both pen colors are in it. That section is screen
only, so it never costs a printed page, and the sheet says plainly that a hand
ruled sheet is graded exactly the same as a printed one.

### 2. Those three buttons

- **How to build the sheet** is gone. It is **Print your Week 1 sheet** now,
  pointing at the sheet itself.
- **Week 1 reading** landed on the top of `week-01.html`, which opens with
  about 190 lines of to-do list before any reading starts. It is **Read the
  notes** now and jumps straight to `#w1-orientation`, past all of it. The
  page itself still has the to-do list up top. Say the word and I will move
  that block below the reading, or fold it into a collapsed panel.
- **Full 268 list** is gone from both places it appeared. It is a PDF now.

### 3. Two PDFs for Canvas

**`BIO005-Fall2026-Competencies-by-Week.pdf`** (32 pages). All 268, grouped
into the week they are taught, inside their midterm block, with the exam
window printed at the top of each block. This is the one students use to
answer "what is on this week".

You already have `BIO005-Fall2026-Competency-Packet.pdf`, which is the same
268 grouped by unit with the entry expectations in front. Keep both. That one
is for transfer and equivalency review, this one is for finding your week.

**`BIO005-Fall2026-Syllabus-and-Schedule.pdf`** (20 pages). The whole syllabus
including the week-by-week schedule, with the exam dates now in it.

### 4. course-start.html shows each week once

There was a dark "Right now" panel pinned above the week list holding the
current week, expanded, with all seven of its links. The list below it then
showed the same week again, marked "This week". Two copies of one week in two
color schemes.

The dark panel is gone. The current week is simply open where it belongs,
first in the light list, still marked "This week". The nineteen CSS rules that
only styled the dark panel went with it. One list, one color scheme.

### 5. The course home moved properly this time

`welcome.html` was never scrapped, but it had been given a "this page has
moved" banner without anything being repointed at the new page. It was the root
of `bio005-nav.js` and **40 pages linked to it**, mostly through the shared nav
bar as "Course home", "This week" and "All weeks". So the most linked page in
the site was telling students they were in the wrong place while the navigation
kept sending them back to it. That was my mistake, and it is fixed.

- `bio005-nav.js` root is now `course-start.html`, and every entry that hung
  off `welcome.html` now hangs off it. One line instead of 40 files.
- Five scripts were injecting the old link at runtime, which is why searching
  the HTML did not find them: `bio005-gate.js`, `bio005-back.js`,
  `readiness-check-view.js`, and both copies of `bio005-reading-mode.js`.
- The 8 pages that hardcoded it (six decks, `course-materials.html`,
  `instructor/teaching-notes.html`) were repointed directly.
- The "this page has moved" banner is gone from `home.html`, `index.html` and
  `start-here.html`.
- **`welcome.html` is now a redirect** to `course-start.html`. Old bookmarks,
  old Canvas embeds and anything you printed still land somewhere correct. It
  redirects the frame, not the top window, so a Canvas embed of the old URL
  keeps working inside Canvas rather than throwing the student out of it.
- **Nothing was deleted.** The greeting hero, Hootie and the eight part tour
  are intact at **`welcome-tour.html`** and still reachable from the nav as
  "Welcome tour". If you want that page back as the front door, say so and it
  is the same one line in reverse.

Verified on 20 representative pages: no links left to `welcome.html`, no moved
banners, no console errors.

### 6. The Canvas door now opens with the hello screen

`course-door.html` plays the greeting from the old welcome page, then lands on
the four cards. It is **one file and one Canvas embed**, not a second page
load: the greeting is an overlay inside the door, so there is nothing to click
through and nothing extra to load.

Same ten greetings and the same 320ms step as the old page, so it looks like
what students saw before. About 3.2 seconds, then it fades to the cards.

What it will not do:

- **Change the iframe height.** Measured at 961px before, during and after.
  Your Canvas iframe height stays **1010**, unchanged.
- **Make anyone wait.** The four cards are live underneath the whole time.
  Two tabs lands on the Lecture card, and any keypress or click skips the
  greeting instantly.
- **Play twice.** Once per browser per day. Students open this door a lot.
- **Play at all** for anyone with reduced motion turned on.

Also on the door:

- **Discussions is a button now**, not Discussion 1. It goes to the Canvas
  discussions index, so it is still right in Week 12. The Discussion 1 due date
  rides along in the subtitle.
- **Study card leads with the Mastery OS.**
- **Course tools is not on this flow.** It never was: that button is the dock,
  and the door does not load the dock script. It is still on the week pages and
  the rest of the site, where it is the only way to reach some tools. If you
  want it gone site-wide that is a separate call, say the word.

### 7. The four Learning Labs are wired in, with their iframes

`learning-lab.html` was built and tested but never connected to anything. It is
connected now, and **`CANVAS-IFRAME.txt`** in the root has every snippet ready
to paste.

The labs sit in the **discussion slot** of Weeks 2 to 5 on `course-start.html`,
because each lab carries its own paired discussion at the bottom, sealed until
the lab work is saved.

Measured heights, at 820px wide:

| Week | Lab | Sealed at load | Fully open | Use this height |
|---|---|---|---|---|
| 2 | Reading a physiology figure or graph | 4,383 | 6,629 | **6700** |
| 3 | Previewing an unfamiliar chapter | 3,015 | 5,999 | **6050** |
| 4 | Spaced recall and the gap finder | 2,928 | 5,867 | **5900** |
| 5 | Auditing AI on cell transport | 4,637 | 7,824 | **7900** |

The gap between those two columns is the thing to notice. The page grows as
students save each part and the next one opens, so a height set from the
first screen would cut the discussion off at exactly the moment they reach it.
The snippets use the fully open number.

Gating re-verified on all four: sealed at load, every part saves, the
discussion opens only after the last one, no console errors.

Two contrast misses turned up in the sealed part boxes, 6.74:1 and 6.88:1.
Both clear AA, both miss AAA, and everything else in this build holds AAA, so
inside a sealed box the maroon and the gray now step down to 8.95:1 and 7.70:1.

**Week 2's discussion is wired in.** The lab shows a **Post in the Week 2
discussion** button once the student finishes it, pointing at
`/courses/42616/discussion_topics/712810`.

Weeks 3, 4 and 5 have no link yet, so those labs show one short line saying it
is coming rather than a button that goes nowhere. Send the three URLs and they
become buttons. The map is one object near the top of the script, `DISC_URL`.

**`CANVAS-IFRAME.txt` is now the whole semester**, 79 measured snippets: every
week, every page type, plus the door, the week page and the competency list.

### 8. Naming, fixed

Two numbering systems were running at once and they disagreed. The lab page
labeled itself by week, but `course-start.html` and the iframe file labeled
the same thing "Learning Lab 1" on Week 2 and "Learning Lab 3" on Week 4. A
student on the Week 4 page saw a 3.

The lab sequence number is gone everywhere. **Every assignment in this course
is "Week N <thing>"**, labs included, because the week is the only index
students navigate by and each week holds different assignments.

| Where | Now reads |
|---|---|
| Browser tab | Week 2 Learning Lab, Reading a Physiology Figure or Graph |
| Page eyebrow | BIO 005 &middot; Week 2 &middot; Learning Lab |
| Page heading | Reading a Physiology Figure or Graph |
| Week list slot | Week 2 Learning Lab, reading a physiology figure or graph |

Suggested Canvas titles, so the gradebook sorts the way the course runs:

    Week 2 Learning Lab: Reading a Physiology Figure or Graph
    Week 2 Discussion: Reading a Physiology Figure or Graph
    Week 3 Learning Lab: Previewing an Unfamiliar Chapter
    Week 3 Discussion: Previewing an Unfamiliar Chapter
    Week 4 Learning Lab: Spaced Recall and the Gap Finder
    Week 4 Discussion: Spaced Recall and the Gap Finder
    Week 5 Learning Lab: Auditing AI on Cell Transport
    Week 5 Discussion: Auditing AI on Cell Transport

`canvas-week02-discussion.html` in this folder is the Week 2 discussion body,
inline styled so Canvas will not strip it. Paste it into the discussion in the
HTML editor.

### 9. Exam dates, set

| Exam | Covers | Opens | Closes |
|---|---|---|---|
| Midterm 1 | Weeks 1 to 5 | Mon Oct 12, 8:00 am | **Sun Oct 18, 10:00 pm** |
| Midterm 2 | Weeks 6 to 10 | Mon Nov 16, 8:00 am | **Sun Nov 22, 10:00 pm** |
| Midterm 3 | Weeks 11 to 15 | Mon Dec 14, 8:00 am | **Wed Dec 16, 10:00 pm** |

Why these:

- **A window, not an hour.** Monday 8 am to Sunday 10 pm, matching your
  existing Sunday 10 pm rhythm. They record and upload whenever suits them.
- Each one runs **in the week after its block closes**, so the last week of
  content has time to settle before they have to teach it back.
- **Midterm 1 sits after census** (Sep 27), so the roster is stable, and lands
  a real graded reality check in mid October, well before the W deadline.
- **Midterm 2 clears Thanksgiving.** It closes Nov 22, the Sunday before
  Thanksgiving week opens.
- **Midterm 3 closes with the term**, Dec 16. Week 15 is only three days long,
  so Week 15 *is* the exam week and nothing else is due.

**The one thing to look at.** Midterm 2 closes Sunday Nov 22 and the last day
to drop with a W is Saturday Nov 21. There is no arrangement of a five-week
block that fixes that, so I handled it instead of hiding it: the syllabus now
says every grade posts **Wednesday November 18**, with ten weeks of work plus
Midterm 1 already in the gradebook, and that is the number students use for
the drop decision. If you would rather move Midterm 2 a week earlier and have
it cover Weeks 6 to 9, tell me and it is a one-line change in three places.

**Two things I wrote that are policy, not dates.** Strike either if you
disagree:

1. In a midterm week (6, 11, 15) that week's book problems and lab move to the
   following Sunday. The note sheet still comes first.
2. Midterm 3 is explicitly not cumulative.

The dates are now in: the syllabus Section 07 (new "When the midterms are"
table), Section 09 (schedule), Section 14 (important dates), and as a gold
**Midterm** row on Weeks 6, 11 and 15 of `course-start.html`.

---

## Two things you should know about, not bugs

### The 268 stayed 268, but six competencies moved

Week 1 now teaches Silverthorn chapter 6 alongside chapter 1. Six competencies
that the Aug 24 CSV still files under later weeks are taught in Week 1:

- from Week 3: Body fluid compartments, Compartment separation and clinical volume shifts
- from Week 7: Signal types and range, Receptor location and ligand solubility, Signal amplification, Receptor modulation

Week 1 wins and the later week drops its copy. Without that, students meet the
same competency twice and the course total reads 274. Nothing was deleted,
only re-filed. Week 3 goes 16 to 14, Week 7 goes 18 to 14, the total is 268.

### Your week titles disagree with each other in Weeks 4 to 8

`WEEK-REASSIGNMENT-REPORT.md` and the competency CSV, both dated Aug 24 and
marked decision of record, order Weeks 4 to 8 as: action potential, whole
nervous system, muscle, hormones, reproduction.

`course-start.html` and the syllabus schedule order the same weeks as: cell
signaling and the electrical signal, synapses and integration, sensory and
autonomic, muscle, hormones and reproduction together.

Weeks 1 to 3 and 9 to 15 agree. Weeks 4 to 8 do not. Every student-facing page
I built prints the **site** titles, because that is what Canvas shows, but the
**competencies** under those titles come from the CSV. So the Week 6 sheet is
headed "Sensing the world" and carries the CSV's muscle competencies.

**I did not guess which one is right.** Tell me which wins and I will fix it in
one place, `assets/bio005-sheet-data.js`, and everything downstream follows.

---

## Accessibility

`compliance/note-sheet.compliance.md` covers all of it. Every ratio in there
was measured on a rendered page, not read off a stylesheet.

WCAG 2.2 AA is met on every file in this push. AAA contrast (7:1 / 4.5:1) is
met on every measured pair on every file in this push. Zero horizontal scroll
at 320, 375, 768, 1024 and 1440. Zero external requests. Zero console errors.

**Three real defects turned up and are fixed:**

1. `--terra` and `--terra-dark` were **undefined on eleven pages**, left behind
   by the rebrand. Every rule reading them fell back to nothing. On
   `assignment-notesheet.html` the primary button was white text on a
   transparent background, 1.04:1, effectively invisible. Both tokens are now
   defined as the MedMasters maroon. That is why eleven files you did not ask
   me to touch are in this push.
2. The dim dock tile subtitle was 5.95:1, under AA. Now 7.57:1. Fixed in all
   four copies of `bio005-dock.js`.
3. Box hints collided with their labels in the narrow column and clipped
   mid word. Moved to the bottom of each box.

Still open: no live screen reader pass on anything.

---

## After the push, two Canvas steps

1. **Upload the two PDFs** to Canvas Files and link them wherever you want
   them. They are in the root of this folder.

2. **Nothing to re-point.** Every iframe you already have keeps working. If
   you want the sheet embedded on its own Canvas page:

   ```html
   <p><iframe title="Week 1 note sheet"
     src="https://drsrennie-stack.github.io/human-physiology-Fa26/note-sheet.html?week=1&amp;per=2"
     width="100%" height="1600"
     style="width:100%;height:1600px;border:0"></iframe></p>
   ```

   Change the `?week=` number for other weeks, and `&per=` for the density.
   Embedding it rather than attaching the PDF is worth it here, because the
   embedded page is the only place the hand ruling template lives.

Dr. Sharilyn Rennie
