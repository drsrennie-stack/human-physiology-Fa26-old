/* ============================================================
   BIO 005 Human Physiology, Fall 2026
   bio005-ungraded.js

   THE UNGRADED WEEK, IN ONE PLACE.

   Everything a student does in a week that carries no points: the
   retrieval target, the book problems, the brain dumps, the drawings,
   and the teach-it prompt. It carries no points and it is the entire
   route to the four categories that do.

   WHY THIS FILE EXISTS. The book problems used to live as a PROBLEMS
   map inside assignment-bookproblems.html and nowhere else, and the
   retrieval target lived as hand-written HTML inside week-01.html and
   nowhere else. Both are now here, so the assignment page, the week
   page and the printable sheet read the same words.

   The drawing prompts are NOT duplicated here. They live in
   assets/bio005-sheet-data.js, two per competency (a and b), and
   ungraded-sheet.html reads them straight from there.

   BOOK PROBLEMS are written for weeks 1 to 4 only. Silverthorn
   chapter mapping for weeks 5 to 15 has not been done. A week with no
   entry says so plainly rather than inventing a chapter.
   ============================================================ */

window.BIO005_UNGRADED = {

  book: {
    1: 'Silverthorn, Chapter 1: questions 9, 13, 14, 16, 17, 18 and 19. The reasoning set: the body map, the feedback compare and contrast, why-does-blood-flow, and the four data and study design problems.',
    2: 'Silverthorn, Chapter 2: questions 16 to 24, and Chapter 4: questions 17 to 28.',
    3: 'Silverthorn, Chapter 3: questions 16 to 31, and Chapter 5: questions 17 to 35.',
    4: 'Silverthorn, Chapter 6: questions 12 to 22.'
  },
  bookWhere: 'Find them at the end of the chapter in your eText, inside Access Pearson in Canvas.',
  bookNone:  'This week’s problems are listed on the book problems assignment in Canvas, directly above the instructions. They are not printed here because the chapter mapping for this week is not settled yet.',

  /* The two routes through a book problem, which is the part students
     get wrong: they think only the first one counts. */
  bookRoutes: [
    'Work it forwards if you have a way in. Get as far as you can before you look at anything.',
    'If you open one and have no idea how to start, read the worked solution and write beside each line why that step is there. Then close it and reproduce the whole thing from blank paper. That counts every bit as much as the first route.'
  ],

  /* One retrieval target per week: the thing to reconstruct from
     nothing. Written to be doable on one sheet of paper in ten
     minutes. Weeks without one say so. */
  target: {
    1: 'Close everything. Reconstruct a complete negative feedback loop for body temperature on a cold day, from the stimulus all the way to the response, with every component named and the feedback arrow drawn.',
    2: 'Close everything. Draw an enzyme catalyzed reaction and mark the two conditions that can stop it. Then draw the same reaction with the enzyme denatured, and say in one line what changed about the protein.',
    3: 'Close everything. Draw a cell in an isotonic solution, then the same cell after the outside becomes hypertonic. Mark which way water moved, name the force that moved it, and label both compartments.',
    4: 'Close everything. Draw one action potential with the voltage axis labeled, and mark on it: resting potential, threshold, which channel opens at each phase, and where the membrane is refractory.'
  }
};
