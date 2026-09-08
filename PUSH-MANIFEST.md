# BIO 005 filename fixes and week stubs
September 5 2026. Upload to drsrennie-stack/human-physiology-Fa26.

Twenty-three files. Everything overwrites by name except the fourteen week pages, which are new.

## How to upload

Two uploads, because one file lives in a subfolder.

1. Drag everything EXCEPT the `os` folder into the repo root.
2. Open the `os` folder in GitHub, then drag `os/bio005-dock.js` and `os/hootie.js` in there.

Do not drag PUSH-MANIFEST.md.

## What was wrong and what these fix

### The syllabus existed but nothing could reach it
Your syllabus is `syllabus-fall2026.html`. The dock asked for `syllabus.html`, and the
fallback asked for `fall-2026-syllabus.html`. Three names, one file. Fixed in
`bio005-dock.js`, `os/bio005-dock.js`, `hootie.js` and `os/hootie.js`, and the Syllabus
tile is now live instead of grayed out.

### Finished tools were sitting behind "coming soon"
These tiles pointed at pages that already exist, but were flagged as not built yet, so
students saw a gray square they could not click:

| Tile | Now points at |
|---|---|
| Notes, Concept videos, Slide decks, Pre-work, All course materials | course-materials.html |
| Draw it from memory | mastery-canvas.html |
| Lab manual | clinical-physiology-lab-manual.html |
| Anatomy review | anatomy-review.html |
| Brain dump practice | braindump-week01.html |
| Syllabus | syllabus-fall2026.html |
| Virtual Office | your Canvas discussion, 42616/discussion_topics/711800 |

Ten tiles are still marked coming soon on purpose, because those pages genuinely do not
exist yet: Study With Me, Lab sprints, Lab skills checklist, Clinical test bank, Reading
charts and data, Practice exam, What I got done today, Chemistry review, Math review,
How-to videos.

### The main button on the course home was dead
`welcome.html` has one primary button, "What do I do today?", and it pointed at
`today.html`, which does not exist. It now goes to `week-01.html`. The JS that rewrites
that button per section was pointing at the same missing file and is fixed too.

### The recall page could not open the Mastery OS
`competency-recall.html` asked for `mastery-physio-os.html` at the repo root. The OS lives
at `os/mastery-physio-os.html`. Fixed. `course-materials.html` was already correct and is
not in this bundle.

### The workbooks linked to the wrong course
All three workbooks linked to `biol304_syllabus.html` and `biol304_accessibility.html`,
which belong to BIO 304. Both now point at `syllabus-fall2026.html`. The accessibility one
is a placeholder until `accessibility.html` exists, so change it when you build that page.

## The fourteen new week pages

`index.html` is your calendar and every day links to its week. Weeks 2 through 15 had no
pages, so any student clicking a future date got a 404, and so would a reviewer.

week-02.html through week-15.html are placeholders that carry the real chrome, the real
week title and the real dates, say plainly when the week opens and when the work is due,
and give six working links out. Replace each one as you build the real week page.

Titles and dates were taken from index.html so the calendar and the pages agree.

Each stub carries the iframe height sender, target="_top" on every internal link, a skip
link, semantic landmarks, visible focus, and prefers-reduced-motion. Measured contrast,
all AAA: white on maroon 9.63:1, eyebrow on maroon 7.05:1, body text on card 11.49:1,
headings 12.37:1, links 9.22:1.

## What this does to the link graph

References pointing at files that do not exist: 54 before, 36 after.
All fourteen week links are now live.

The 36 that remain are genuinely unbuilt pages, and they come almost entirely from four
files you are already planning to retire: `canvas-start.html` (still titled BIO 004),
`physiology-course-map.html`, `physiology-course-home.html`, and the ten dock tiles
correctly marked coming soon.

One thing I did not touch: the long list in `bio005-reading-mode.js` that looks like dead
links is a deny list, not a set of links. It names pages that must never be collapsed into
reading mode, including the signed device policy form. Leave it alone.

## Two things to look at, neither blocks Monday

**Week 1 has two pages and neither title matches the calendar.** `week-01.html` is the one
linked from welcome.html. `week-01-foundations.html` is larger, has its own compliance
file, and nothing links to it. The calendar calls Week 1 "How physiology works and what
keeps you steady" and `week-01.html` is titled "Homeostasis: how your body holds itself
steady."

**Your calendar week map is not the schedule of record.** index.html runs sensory at
Week 6, muscle at Week 7, and hormones with reproduction together at Week 8. The adopted
schedule ran muscle at 6, endocrine at 7, reproductive at 8. The calendar version fixes the
Week 5 overload we found, so it may well be the later and better call. I built the stubs to
match index.html because that is what students click. Worth confirming which one is real
before the schedule page and the syllabus get read side by side.
