/* NOTE, Sep 7 2026: the five unit exams and the cumulative final in this
   file are retired. The model of record is two midterms, weeks 1 to 7 and
   8 to 14, in bio005-schedule-fall2026.js and the published syllabus. */
/* ============================================================
   BIO 005 Human Physiology, Yuba College, Fall 2026
   schedule-fall2026.js

   What the dock and Hootie read for dates and module scope.
   Generated from bio005-schedule-fall2026.js so there is one
   calendar, not two. Edit that file, then regenerate this.

   Every exam window here is a PROPOSAL, not a setting.
   Holiday closures are assumed from the standard California
   community college calendar and are not confirmed against Yuba.
   ============================================================ */

window.BIO005_MODULES_SCHEDULE = [
 {
  "n": 1,
  "weeks": [
   1,
   2,
   3
  ],
  "exam": "Midterm 1",
  "title": "Foundations, membranes and cell signaling",
  "detail": "Assessed on Midterm 1 (opens 2026-10-26, closes 2026-10-28)."
 },
 {
  "n": 2,
  "weeks": [
   4,
   5,
   6
  ],
  "exam": "Midterm 1",
  "title": "Neurophysiology and muscle physiology",
  "detail": "Assessed on Midterm 1 (opens 2026-10-26, closes 2026-10-28)."
 },
 {
  "n": 3,
  "weeks": [
   7,
   8,
   9
  ],
  "exam": "Midterms 1 and 2",
  "title": "Sensory, motor, autonomic and endocrine physiology",
  "detail": "Assessed on Midterms 1 and 2 (opens 2026-10-26, closes 2026-10-28, opens 2026-12-14, closes 2026-12-16)."
 },
 {
  "n": 4,
  "weeks": [
   10,
   11,
   12
  ],
  "exam": "Midterm 2",
  "title": "Cardiovascular and respiratory physiology",
  "detail": "Assessed on Midterm 2 (opens 2026-12-14, closes 2026-12-16)."
 },
 {
  "n": 5,
  "weeks": [
   13,
   14,
   15
  ],
  "exam": "Midterm 2",
  "title": "Renal, digestive, metabolic, immune and reproductive physiology",
  "detail": "Assessed on Midterm 2 (opens 2026-12-14, closes 2026-12-16)."
 }
];

/* The OS reads BIO005_MODULES from bio005-competencies.js. This file
   only adds the calendar view of those modules, under its own name so
   it cannot clobber the competency module list. */
if (!window.BIO005_MODULES) { window.BIO005_MODULES = window.BIO005_MODULES_SCHEDULE; }

window.BIO005_SECTIONS = {
 "course": "BIO 005 Human Physiology",
 "term": "Fall 2026",
 "college": "Yuba College",
 "start": "2026-09-08",
 "end": "2026-12-16",
 "closures": [
  {
   "date": "2026-11-11",
   "name": "Veterans Day, assumed"
  },
  {
   "date": "2026-11-26",
   "name": "Thanksgiving, assumed"
  },
  {
   "date": "2026-11-27",
   "name": "Thanksgiving Friday, assumed"
  }
 ],
 "sections": [
  {
   "key": "net",
   "label": "Yuba College, fully online",
   "crn": "BIOL-5-D9286",
   "detail": "Lecture and lab both asynchronous. Weeks open Monday 12:00 am and close Sunday 11:59 pm."
  }
 ],
 "duties": []
};

window.BIO005_SESSIONS = {
 "net": [
  {
   "wk": 1,
   "opens": "2026-09-08",
   "closes": "2026-09-13",
   "title": "Homeostasis: how your body holds itself steady",
   "exam": null,
   "note": "Short week, term opens on a Tuesday. Front-load orientation, not content."
  },
  {
   "wk": 2,
   "opens": "2026-09-14",
   "closes": "2026-09-20",
   "title": "How things get in and out of a cell",
   "exam": null,
   "note": null
  },
  {
   "wk": 3,
   "opens": "2026-09-21",
   "closes": "2026-09-27",
   "title": "Membrane potential, and how cells send signals",
   "exam": null,
   "note": "Census is Sun Sep 27, the same day this week closes. Week 1 to 3 feedback should be posted before census so students choosing to drop can decide on evidence."
  },
  {
   "wk": 4,
   "opens": "2026-09-28",
   "closes": "2026-10-04",
   "title": "The action potential: how a nerve signal fires",
   "exam": null,
   "note": null
  },
  {
   "wk": 5,
   "opens": "2026-10-05",
   "closes": "2026-10-11",
   "title": "How nerve cells talk to each other, and to muscle",
   "exam": null,
   "note": null
  },
  {
   "wk": 6,
   "opens": "2026-10-12",
   "closes": "2026-10-18",
   "title": "How muscle contracts and makes force",
   "exam": null,
   "note": null
  },
  {
   "wk": 7,
   "opens": "2026-10-19",
   "closes": "2026-10-25",
   "title": "How you see, hear, taste, smell and feel",
   "exam": null,
   "note": null
  },
  {
   "wk": 8,
   "opens": "2026-10-26",
   "closes": "2026-11-01",
   "title": "How you move, and what your body runs automatically",
   "exam": null,
   "note": null
  },
  {
   "wk": 9,
   "opens": "2026-11-02",
   "closes": "2026-11-08",
   "title": "Hormones: your body's slower control system",
   "exam": null,
   "note": "The last day to drop is Nov 21. Midterm 1 closed Oct 28, so students have that grade in hand before the drop decision."
  },
  {
   "wk": 10,
   "opens": "2026-11-09",
   "closes": "2026-11-15",
   "title": "How the heart pumps blood",
   "exam": null,
   "note": "Veterans Day falls Wed Nov 11 inside this week. Nothing graded should be due that day."
  },
  {
   "wk": 11,
   "opens": "2026-11-16",
   "closes": "2026-11-22",
   "title": "Blood pressure and blood flow, and how they stay steady",
   "exam": null,
   "note": "Last day to drop is Sat Nov 21, inside this week."
  },
  {
   "wk": 12,
   "opens": "2026-11-23",
   "closes": "2026-11-29",
   "title": "Breathing, and how oxygen gets to your cells",
   "exam": null,
   "note": "THANKSGIVING WEEK. Thu Nov 26 and Fri Nov 27 are holidays. Nothing graded should be due on either day."
  },
  {
   "wk": 13,
   "opens": "2026-11-30",
   "closes": "2026-12-06",
   "title": "How your kidneys control water and salt",
   "exam": null,
   "note": null
  },
  {
   "wk": 14,
   "opens": "2026-12-07",
   "closes": "2026-12-13",
   "title": "Blood pH, digestion, and how you use food for fuel",
   "exam": null,
   "note": null
  },
  {
   "wk": 15,
   "opens": "2026-12-14",
   "closes": "2026-12-16",
   "title": "Immune defense, reproduction, and putting it all together",
   "exam": null,
   "note": "Three days only. This week carries immune and reproductive physiology plus the integration capstone, and the cumulative final closes it. If the term runs tight, this is the trim: immune and reproductive are the lowest-yield block in the map, and the integration capstone can move to Week 14 as the drawing task."
  }
 ]
};
