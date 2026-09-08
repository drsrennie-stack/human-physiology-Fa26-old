# Files to delete after you upload

Uploading through the GitHub web interface overwrites files. It cannot delete
them. So the duplicates have to be removed by hand, and this is the list.

I checked inbound links on every one of these before putting it here. Each file
below has **zero pages linking to it**, so deleting it cannot 404 anything.

## Delete these five

| Path | Why |
|---|---|
| `schedule.html` | Static page carrying the OLD week order (Week 9 Digestion, Week 10 Cardiac Function and Blood). Nothing links to it. `course-schedule.html` is data driven and now renders the adopted order on its own. |
| `bio005-schedule_2/` (whole folder) | The other static schedule page. Right week order, but textbook noun-phrase titles, which lost to the student-language titles on Aug 24. Unwired, nothing links to it. |
| `course-calendar.html` | Third schedule page. Nothing links to it. |
| ~~`physiology-course-home.html`~~ | **DO NOT DELETE. Sep 6 2026:** this is the page the Canvas "Enter Human Physiology Course" item embeds, so it is live and student facing. It was repainted onto the MedMasters brand on Sep 6. |
| ~~`physiology-course-map.html`~~ | **DO NOT DELETE.** It is linked from `physiology-course-home.html`, which is staying. |
| `index.md` | Stray. Nothing reads it. |
| `loop-switcher.html` | Anatomy Loops leftover. Loops are retired for physiology. |

**On the two static schedule pages.** Both go. Neither is linked from anything,
and keeping a hand-maintained copy of the schedule beside the data-driven one is
how the two versions drifted apart in the first place. `course-schedule.html`
reads `bio005-schedule-fall2026.js`, so the schedule has exactly one source.

If you want the richer per-week detail those static pages had (topic lists and
"what you do this week" lists), that belongs in the schedule data file as new
fields, where one edit updates the page. Say the word and I will add it.

## Do NOT delete these, even though they look like duplicates

I nearly put each of these on the list. Checking saved them.

| Path | Why it stays |
|---|---|
| `anatomy-review.html` + `anatomy-review/` | **Not anatomy leakage.** This is one of the three standalone review pages you asked for, chemistry, math, anatomy. Five pages link to it, including `welcome.html`. It is deliberate. |
| `course-entry.html` | Zero inbound links **by design**. It is the Canvas front door that gets iframed. Deleting it removes the way in. |
| `competency-recall.html` | Superseded by the OS Recall view now the card bank is real, but `os/recall-view.js` still points at it. Repoint that first, then retire. Three inbound links. |
| `week-01.html` | `welcome.html` links to it. See the open question below. |
| `mastery-physio-os-standalone.html`, `unit-05-standalone.html` | Generated exports from `tools/build-standalone.py`, for sending a single page outside the repo. Regenerate them after this migration. |
| `competency-packet.html`, `build-tracker.html`, `label-kit.html`, `which-way-demo.html` | Instructor tools and demos, not duplicates. |

## One decision I did not make for you

**Two Week 1 pages exist and neither title matches the adopted schedule.**

| File | Size | Title | Inbound |
|---|---|---|---|
| `week-01.html` | 232 KB | "Week 1. Homeostasis: how your body holds itself steady" | `welcome.html` |
| `week-01-foundations.html` | 294 KB | "Week 1, Foundations and Whole Body Control" | none |

`week-01-foundations.html` is larger and has its own audited compliance file
(`week-01-foundations.compliance.md`), which suggests it is the newer one. But
`welcome.html` links to the other. The adopted Week 1 title is
**Foundations of Physiology**, and neither page uses it.

Pick one, retitle it to match the schedule, point `welcome.html` at it, and
delete the other. I did not guess, because you would have inherited the guess
silently and it is 250 KB of your teaching either way.
