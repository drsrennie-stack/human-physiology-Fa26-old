/* ============================================================
   BIO 005 Human Physiology, Fall 2026
   hootie.js

   Hootie the Knowfish, on the week pages.

   WHAT THIS IS, AND WHAT IT IS NOT
   --------------------------------
   This is NOT an AI. There is no model behind it and no network
   call. It is a grounded answerer: it reads the course data
   already loaded on the page and answers questions it can answer
   from that data with certainty.

   It knows, because the data says so:
     - what is happening this week, today, and next class
     - which module the course is in, and which weeks it covers
     - when the student's next exam is, and how many days away
     - what a given exam covers
     - the pre-work sequence and how to study for this course

   It does NOT know physiology content, and it says so plainly rather
   than guessing. A student asking "what is the difference between
   compact and spongy bone" gets pointed at the notes packet, the
   week's material and the competency list. Guessing at physiology would be
   worse than useless in a course where the answer gets examined.

   The whole answering surface is one function, hootieAnswer(),
   which takes a question and a context object and returns a
   reply. Everything it depends on is in that context. If a real
   model is ever wired in behind a proxy, that one function is the
   only thing that changes, and the 17 pages stay untouched.

   HOW TO MOUNT
   ------------
       <script src="schedule-fall2026.js"></script>
       <script src="section-sync.js"></script>
       <script src="hootie.js"></script>

   It mounts a launcher button in the bottom corner by itself. To
   scope it to a week, the page's nav already carries the week
   number and Hootie reads it:

       <div data-module-nav data-week="5"></div>

   Suppress it on a page with:

       <body data-hootie="off">

   ACCESSIBILITY
   -------------
   The panel is a labeled dialog. The launcher is a real button
   with aria-expanded. The transcript is an aria-live polite log
   so replies are announced. Focus moves into the input on open
   and back to the launcher on close. Escape closes. Nothing here
   depends on color alone.
   ============================================================ */

(function () {
  'use strict';

  var DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
             'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  function parseISO(iso) {
    var p = String(iso).split('-');
    return new Date(+p[0], +p[1] - 1, +p[2]);
  }
  function fmt(iso) {
    var d = parseISO(iso);
    return DOW[d.getDay()] + ' ' + MON[d.getMonth()] + ' ' + d.getDate();
  }
  function todayISO() {
    try {
      var m = location.search.match(/[?&]today=(\d{4}-\d{2}-\d{2})/);
      if (m) return m[1];
    } catch (e) {}
    var d = new Date();
    function p(n) { return (n < 10 ? '0' : '') + n; }
    return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate());
  }
  function daysBetween(a, b) {
    return Math.round((parseISO(b) - parseISO(a)) / 86400000);
  }
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  /* Session text carries trusted markup AND HTML entities from the
     schedule file (<strong>, &middot;, &amp;). Strip the tags and
     DECODE the entities, otherwise esc() re-escapes the ampersand
     and students read "Week 7 checkpoint". */
  var _dec = document.createElement('textarea');
  function plain(s) {
    _dec.innerHTML = String(s).replace(/<[^>]+>/g, '');
    return _dec.value.replace(/\s+/g, ' ').trim();
  }

  /* ----------------------------------------------------------
     CONTEXT. Everything Hootie is allowed to know.
     ---------------------------------------------------------- */
  function buildContext() {
    var S = window.BIO005_SESSIONS;
    var M = window.BIO005_MODULES;
    var X = window.BIO005_SECTIONS;
    if (!S || !M) return null;

    var sec = null;
    try { sec = window.BIO005_SECTION && window.BIO005_SECTION.get(); } catch (e) {}
    var track = sec === 'tr-am' || sec === 'tr-eve' ? 'tr' : 'mw';
    var secKey = sec === 'tr-am' ? 'class2' : sec === 'tr-eve' ? 'class3' : 'class1';

    var rows = S[track] || [];
    var today = todayISO();

    var nav = document.querySelector('[data-module-nav][data-week]');
    var viewWk = nav ? parseInt(nav.getAttribute('data-week'), 10) : null;

    /* Where the course actually is. */
    var curWk = rows.length ? rows[0].wk : 1, state = 'during';
    if (rows.length) {
      if (today < rows[0].date) { state = 'before'; curWk = rows[0].wk; }
      else if (today > rows[rows.length - 1].date) { state = 'after'; curWk = rows[rows.length - 1].wk; }
      else {
        for (var i = 0; i < rows.length; i++) {
          if (rows[i].date <= today) curWk = rows[i].wk; else break;
        }
      }
    }

    var next = null;
    for (var j = 0; j < rows.length; j++) {
      if (rows[j].date >= today) { next = rows[j]; break; }
    }
    var todayRow = rows.filter(function (r) { return r.date === today; })[0] || null;

    var exams = (X && X.sections && X.sections[secKey] && X.sections[secKey].exams) || [];
    var nextExam = null;
    for (var k = 0; k < exams.length; k++) {
      if (exams[k].lecture >= today) { nextExam = exams[k]; break; }
    }

    var secName = (X && X.sections && X.sections[secKey]) || null;

    return {
      sessions: rows, track: track, section: sec, sectionName: secName,
      modules: M, exams: exams,
      today: today, curWk: curWk, state: state, viewWk: viewWk,
      next: next, todayRow: todayRow, nextExam: nextExam,
      weekOf: function (wk) { return rows.filter(function (r) { return r.wk === wk; }); },
      moduleOf: function (wk) {
        return M.filter(function (m) { return m.weeks.indexOf(wk) > -1; });
      },
      links: window.BIO005_WEEK_LINKS || {}
    };
  }

  /* ----------------------------------------------------------
     FORMATTERS
     ---------------------------------------------------------- */
  function describeDay(r) {
    if (!r) return '';
    if (r.kind === 'off')  return fmt(r.date) + ': no class. ' + plain([].concat(r.text).join(' '));
    if (r.kind === 'exam') return fmt(r.date) + ': ' + plain([].concat(r.text).join(' '));
    return fmt(r.date) + ': ' + (r.lines || []).map(function (l) {
      return l[0] + ' ' + plain(l[1]);
    }).join('. ');
  }

  function weekLine(ctx, wk, skipDate) {
    var days = ctx.weekOf(wk).filter(function (d) { return d.date !== skipDate; });
    if (!days.length) {
      return ctx.weekOf(wk).length ? '' : 'I do not have week ' + wk + ' in the schedule.';
    }
    var mods = ctx.moduleOf(wk).map(function (m) { return 'Module ' + m.n; }).join(' into ');
    return '<b>Week ' + wk + '</b>, ' + mods + '.<br>'
      + days.map(function (d) { return esc(describeDay(d)); }).join('<br>');
  }

  function examLine(ctx, ex) {
    if (!ex) return 'You have no exams left in the schedule.';
    var mod = ctx.modules.filter(function (m) { return m.exam === ex.n; })[0];
    var d = daysBetween(ctx.today, ex.lecture);
    var when = d === 0 ? 'today' : d === 1 ? 'tomorrow' : 'in ' + d + ' days';
    var s = '<b>Exam ' + ex.n + ' is ' + fmt(ex.lecture) + '</b>, ' + when + '. '
      + 'Lecture exam and lab practical on the same day.';
    if (ex.note) s += '<br>' + esc(plain(ex.note));
    if (mod) {
      s += '<br>It closes <b>Module ' + mod.n + ', ' + esc(mod.title) + '</b>, '
        + 'which covers weeks ' + mod.weeks.join(', ') + '.<br>' + esc(mod.detail);
    }
    if (ex.practicalCovers) s += '<br>The practical covers ' + esc(ex.practicalCovers) + '.';
    return s;
  }

  /* Links for a week, only if the week-links file has been filled in. */
  function weekResources(ctx, wk) {
    var L = ctx.links[wk] || {};
    var out = [];
    if (L.lecture)   out.push('<a href="' + esc(L.lecture) + '" target="_top">the concept walkthrough for week ' + wk + '</a>');
    if (L.worksheet) out.push('<a href="' + esc(L.worksheet) + '" target="_top">the guided worksheet</a>');
    return out;
  }

  /* ----------------------------------------------------------
     THE ANSWERING SURFACE

     Merged from two Hooties that both already existed:

     - welcome.html knew the COURSE. Grading weights, how checkpoints
       work, who to contact, where to go when you are drowning.
       It had no idea what day it was.
     - The week-page version knew the SCHEDULE. Dates, modules,
       exam scope, per-section rooms. It could not answer a single
       question about how the course actually runs.

     Each covered the other's gap exactly, so this is one matcher
     over one answer bank rather than two half-Hooties.

     The intent matcher is welcome.html's: score every intent by
     how many of its keywords appear, highest score wins. Order
     matters on a tie, so the list runs most urgent first. A
     student typing "I am drowning and behind" must reach
     'struggle' before anything else, which is why it sits near
     the top and why 'contact' sits above it: someone asking who
     to email needs the address, not a pep talk.

     Everything anatomical still gets refused. That has not
     changed and should not.
     ---------------------------------------------------------- */

  /* Order is the tie-break. Most urgent first. */
  var INTENTS = [
    {id:'contact',  kw:['contact','email','e-mail','reach','who do i','who should i','talk to','office hour','professor','instructor','teacher','rennie','tutor','tutoring','accommodat','disab','dsp','tech ','technolog','login','log in','canvas help','password','it help']},
    {id:'struggle', kw:['struggl','behind','failing','fail ','so hard','too hard','confus','overwhelm','stress','anxious','burn','falling','fall behind','drowning','give up','quit','really hard','cant keep','can not keep','keep up','lost and','hate this','crying','panic']},
    {id:'ai',       kw:['ai ','a.i','chatgpt','chat gpt','gpt','claude','gemini','copilot','artificial intelligence','use ai','using ai','ai on','cheat','cheating','plagiar','academic integrity','integrity']},
    {id:'grades',   kw:['grade','grading','points','percent','weight','how much is','worth','scholar point','extra credit','curve','my grade','pass the class','passing','gpa']},
    {id:'exams',    kw:['exam','test','midterm','practical','how many test','final']},
    {id:'tbl',      kw:['tbl','team based','team-based','irat','trat','readiness','team quiz']},
    {id:'mastery',  kw:['mastery','recall','flashcard','gap finder','cram','spaced','study tool','study engine']},
    {id:'study',    kw:['study with me','co-study','study session','study group','sign up','study hours','engagement hour']},
    {id:'atlas',    kw:['atlas','3d','model','viewer','explore structure','anatomy review','refresher']},
    /* The 'loops' intent is retired, Sep 7 2026. Its keyword was the bare
       word 'loop', and in a physiology course "how do feedback loops work"
       is close to the most common question a student can type. Every one of
       those got answered with "loops are quick lab-based practice questions",
       which is a BIO 004 tool and not a thing in this course. Practice
       questions now match under 'howstudy' and 'prework'. */
    {id:'practice', kw:['practice question','practice q','practice items','predict commit']},
    {id:'prework',  kw:['pre-work','prework','packet','before class','homework','tonight','what should i do','assignment']},
    {id:'howstudy', kw:['how do i study','how should i study','memor','forget','remember','stick','retain','draw','retrieval','revise','review']},
    {id:'week',     kw:['this week','today','due','coming up','next class','whats due','what is due','what is on','schedule']},
    {id:'module',   kw:['module','unit','where are we','what are we on','what are we doing']},
    {id:'find',     kw:['where are','where do i find','where can i find','how do i find','cant find','can not find',
                     'cannot find','where is the','looking for','how do i get to','how do i open','where would i',
                     'lecture video','concept video','the videos','worksheet','my notes','the notes','lab sprint',
                     'find the','navigate','get around','lost']},
    {id:'room',     kw:['room','what time','when does','which section','my section','crn','building','which room','what room']},
    {id:'start',    kw:['start','begin','where do i','first','brand new','beginning','what do i do','orientation','new here','getting started','get started']}
  ];

  function matchIntent(text) {
    var q = ' ' + text.toLowerCase() + ' ';
    var best = null, bestScore = 0;
    INTENTS.forEach(function (it) {
      var score = 0;
      it.kw.forEach(function (k) { if (q.indexOf(k) !== -1) score++; });
      if (score > bestScore) { bestScore = score; best = it.id; }
    });
    return bestScore > 0 ? best : null;
  }

  /* Links come from course-links.js so a URL lives in one place.
     Everything degrades to plain text if that file is absent. */
  function L() { return window.BIO005_LINKS || null; }
  function a(key, text) {
    var l = L();
    return l && l.a ? l.a(key, text) : (text || key);
  }
  function secL(ctx) {
    var l = L();
    return l && l.forSection ? l.forSection(ctx.section)
                             : {syllabus:'syllabus-fall2026.html', hub:'course-schedule.html'};
  }
  function ilink(url, text) { return '<a href="' + url + '" target="_top">' + text + '</a>'; }

  /* Her pre-work sequence. Load-bearing, and the step students most
     often invert: the video comes AFTER the questions, not before. */
  function prework(ctx, wk) {
    var res = weekResources(ctx, wk);
    return '<b>The order matters more than the pre-work itself.</b> Do it in this order:'
      + '<br>1. Organize the reading and lecture material into your notes.'
      + '<br>2. Study those notes.'
      + '<br>3. Answer the pre-work questions with your notes and book open.'
      + '<br>4. Then watch the video.'
      + '<br>5. Later in the week, cover everything and redraw your mini visuals from memory.'
      + '<br><br>Context before content. Step 5 is retrieval, not rereading, and it is the step that makes it stick. This is not a night-before task.'
      + (res.length ? '<br><br>For this week: ' + res.join(' and ') + '.' : '');
  }

  function answerFor(id, ctx) {
    var wk = ctx.viewWk || ctx.curWk;
    var s = secL(ctx);

    switch (id) {

      case 'start':
        return '<p>Three moves and you are ahead:</p>'
          + '1. Skim your ' + ilink(s.syllabus, 'syllabus') + ' so you know how the course runs.'
          + '<br>2. Do the pre-work for your next class, in order. Ask me about pre-work and I will walk you through it.'
          + '<br>3. Open ' + a('masteryOS') + ' and set up your study plan.'
          + '<br><br>' + weekLine(ctx, wk);

      /* Hers, but now it can actually name the days. */
      case 'week': {
        var parts = [];
        if (ctx.state === 'before') {
          parts.push('The term has not started yet. First class is <b>' + fmt(ctx.sessions[0].date) + '</b>.');
        } else if (ctx.state === 'after') {
          parts.push('The term has ended.');
        }
        if (ctx.todayRow) parts.push('<b>Today.</b> ' + esc(describeDay(ctx.todayRow)));
        else if (ctx.next) parts.push('<b>Next class.</b> ' + esc(describeDay(ctx.next)));
        parts.push(weekLine(ctx, wk, ctx.todayRow ? ctx.todayRow.date : null));
        parts.push('The whole term, every class day, is on your ' + ilink(s.hub, 'course calendar') + '.');
        return parts.filter(Boolean).join('<br><br>');
      }

      /* The one the schedule-only version could not answer at all. */
      case 'struggle':
        return '<p>This is normal and it is fixable. Try this, in order:</p>'
          + '1. Open the ' + a('masteryOS', 'Mastery OS') + ' Gap Finder to see exactly what is weak.'
          + '<br>2. Run a 3-Day Cram before your next exam.'
          + '<br>3. Join a ' + a('study') + ' session.'
          + '<br>4. Come to office hours, 30 minutes before every class, or book free tutoring through the ' + a('astc') + '.'
          + '<br><br>Reach out early. Do not wait for the next exam, and do not wait until you feel you have earned the right to ask.'
          + (ctx.nextExam ? '<br><br>' + examLine(ctx, ctx.nextExam) : '');

      case 'ai':
        return '<p>The short version: AI is open on some things, closed on others, and the line is about whether the work is evidence of <b>your</b> reasoning.</p>'
          + '<p><b>Closed.</b> The exams, the discussions, and anything where the point is that you can do it yourself. Retrieval is closed too, not because you would be caught, but because using AI there defeats the only reason to do it.</p>'
          + '<p><b>Open, with disclosure.</b> Labs and application cases. Say what you used it for. The reasoning still has to be yours, and it is what gets graded.</p>'
          + '<p>The full lists, and how I use AI to build this course, are on <a href="ai-in-this-course.html" target="_blank" rel="noopener">How AI is used in this course</a>.</p>';

      case 'grades':
        return '<p>Four categories:</p>'
          + '<b>35%</b> Show Me What You Know. Two exams, draw and teach on video, 17.5 each.'
          + '<br><b>25%</b> Investigate It. The weekly labs.'
          + '<br><b>25%</b> Use It. Your weekly application case, building into your patient file.'
          + '<br><b>15%</b> Think About It. The weekly discussion.'
          + '<br><br>Your note sheet, the practice items, the Mastery Check and the recall cards carry <b>no points at all</b>, on purpose. They are the route to the four above, not extras. Full detail in your ' + ilink(s.syllabus, 'syllabus') + '.';

      case 'exams':
        return examLine(ctx, ctx.nextExam)
          + '<br><br>Two exams, not five. Midterm 1 covers Weeks 1 to 7 and its window is Oct 26 to 28. Midterm 2 covers Weeks 8 to 14, Dec 14 to 16. Each is a window of three days, not an hour, and each is worth 17.5 percent.'
          + '<br><br>Neither is multiple choice. You draw a physiological pathway and teach it out loud on video with no notes. Every week\'s Retrieve step is that same task in miniature, ungraded, so the format is familiar long before it counts. Dates are on the ' + a('calendar') + ' and in your ' + ilink(s.syllabus, 'syllabus') + '.';

      /* Rewritten Sep 7 2026. This answer used to describe "weekly
         checkpoints" with the words "Weight is still to be set" and
         "Placeholder grade" in it, which is a build note that reached
         students. There are no checkpoints and no placeholder. */
      case 'tbl':
        return '<p>There is no TBL in this course. No teams, no iRAT or tRAT, and nothing that meets at a set time. BIO 005 is fully online and asynchronous.</p>'
          + '<p>What replaces attendance is what you turn in: your Mastery Check, your discussion post, and any lab the week requires. The note sheet and the practice work carry no points, so nothing is measuring whether you showed up, only whether the work is there.</p>'
          + '<br><br>Studying the work across the week is what makes these go well. There is no version of a checkpoint that goes well if you start it Sunday night. More in your ' + ilink(s.syllabus, 'syllabus') + '.';

      case 'mastery':
        return '<p>' + a('masteryOS', 'The Mastery OS') + ' is your study engine: spaced recall across all 268 competencies and a gap finder that shows exactly what is weak.</p>'
          + '<p>It works with the weekly <b>Mastery Check</b>, which is not a quiz. No points, no penalty, and no limit on attempts. It asks two levels on each competency, one to see whether you can retrieve it and one to see whether you can use it, and instead of a score it tells you which competencies are solid, which are partly there, and which are still a gap. Bring the gaps back to the OS.</p>';

      /* Scholar Points are retired, and so is the engagement hours bank
         they fed. Sep 7 2026. */
      case 'study':
        return 'There is no scheduled co-study session and no Scholar Points system in this course; both are retired. If you want to study with people, say so in the discussion thread and set something up. Office hours are Wednesdays 9:00 to 10:00 am on Zoom, drop in, and bringing a study question to those is the closest thing to co-study on the calendar.';

      /* The interactive Atlas is a BIO 004 anatomy tool and is not part of
         this course. What physiology students want when they ask about
         anatomy is the refresher. Sep 7 2026. */
      case 'atlas':
        return 'The interactive Atlas belongs to the anatomy course, not this one. What you want here is the <a href="anatomy-review.html" target="_top">anatomy refresher</a>: the anatomy this course leans on, with self-checks, so you can close a gap in Week 1 rather than find it in Week 6.';

      case 'practice':
        return 'Practice items live inside each week, in the Practice stage: predict, commit, check, correct, explain. They carry no points, and getting them wrong is the entire point of doing them. The book problems sit alongside them and are also ungraded.';

      case 'contact': {
        var c = (L() && L().contact) || {};
        return '<p><b>Anything private: your grade, an extension, something going on in your life.</b> Message Dr. Rennie in '
          + (c.canvasInbox || 'the Canvas Inbox') + ', or email ' + (c.email || 'srennie@yccd.edu')
          + ' (' + (c.turnaround || 'about 48 to 72 hours on weekdays') + ').</p>'
          + '<p><b>Anything about the course itself</b> goes in the <a href="virtual-office.html" target="_top">virtual office</a> instead, where the answer reaches everyone. Say what your question is, what you already tried, and where it stopped answering your question.</p>'
          + '<p><b>Office hours.</b> ' + (c.officeHours || 'Wednesdays 9:00 to 10:00 am on Zoom, drop in, no appointment needed') + '.</p>'
          + '<p><b>Accommodations.</b> Yuba DSPS, ' + (c.ascEmail || 'dspsinfo@yccd.edu')
          + '. Set this up in Week 1, then tell Dr. Rennie your approved accommodations.</p>';
      }

      case 'prework':
        return prework(ctx, wk);

      case 'howstudy':
        return 'Rereading feels productive and does almost nothing. Three things work in this course:'
          + '<br><br><b>Retrieve cold.</b> Blank paper, two minutes, write everything you know before you look at anything.'
          + '<br><b>Draw it.</b> If you cannot draw the structure from memory and label it, you do not know it yet.'
          + '<br><b>Space it.</b> Recall it today, again in two days, then further out.'
          + '<br><br>When you get something wrong, name which kind of wrong it was: could not recall it, recalled it wrong, or knew it but could not apply it. Those three need different repairs.';

      case 'module': {
        var mods = ctx.moduleOf(wk);
        if (!mods.length) return 'I could not place week ' + wk + ' in a module.';
        return mods.map(function (m) {
          return '<b>Module ' + m.n + '. ' + esc(m.title) + '</b><br>' + esc(m.detail)
            + '<br>Weeks ' + m.weeks.join(', ') + ', ends in Exam ' + m.exam + '.';
        }).join('<br><br>');
      }

      /* Before this existed, 'where are the lecture videos' matched the room
         intent on the words 'where is' and answered with a room number and a
         CRN. A confidently wrong answer to the most common question a new
         student asks. */
      case 'find': {
        var fq = (ctx && ctx.q) ? String(ctx.q).toLowerCase() : '';
        var specific = '';
        if (/video|lecture/.test(fq))
          specific = 'Your concept lectures sit on the ' + a('calendar') + ', on the day they are due, which is the night before class.';
        else if (/worksheet|pre-?work|packet|sheet/.test(fq))
          specific = 'The guided worksheet for each day is on the ' + a('calendar') + ', beside that day\'s video.';
        else if (/note/.test(fq))
          specific = 'Your notes pages are listed with each class day on the ' + a('calendar') + '.';
        else if (/lab|sprint|bench|models|dissection|practical/.test(fq))
          specific = 'Lab sprints have a tile in Course tools, down in the corner of every page.';
        else if (/card|recall|flashcard|quiz/.test(fq))
          specific = 'The cards are inside ' + a('masteryOS', 'Mastery OS') + ', under Recall. Every card in the course is in there.';
        else if (/atlas|3d|model/.test(fq))
          specific = 'The ' + a('atlas', 'Digital Atlas') + ' is in Course tools, under Reference.';
        else if (/syllabus|policy|grade/.test(fq))
          specific = 'Your syllabus is in Course tools, under Course.';

        return '<p>Everything is behind one button, so there is only one thing to remember.</p>'
          + '<b>Look at the bottom left corner of any page.</b> There is a button marked '
          + '<b>Course tools</b>. It is on every page in this course, and it holds this week, '
          + 'your pre-work, Mastery OS, lab sprints, Loops, the Digital Atlas, study sessions '
          + 'and your syllabus.'
          + (specific ? '<br><br>' + specific : '')
          + '<br><br>If you would rather be walked through it, open the course home page and press '
          + '<b>Replay the walkthrough</b> at the bottom. It takes a couple of minutes and it starts '
          + 'with that button.';
      }

      case 'room': {
        var sn = ctx.sectionName;
        if (!sn) return 'Pick your section on the ' + a('home', 'course home page') + ' and I can tell you your room and times.';
        return '<b>' + esc(sn.name) + '</b>, ' + esc(sn.days) + ', CRN ' + esc(sn.crn)
          + '<br>Lecture: ' + esc(sn.lecture)
          + '<br>Lab: ' + esc(sn.lab);
      }
    }
    return null;
  }

  /* One function, everything it needs passed in. Swap this for a
     proxied model call if free-form content answers are ever
     wanted, and the 22 pages do not change. */

  /* ----------------------------------------------------------
     THE 248 ANSWERS THAT ARE ALREADY WRITTEN DOWN

     Scrubs, Sep 7 2026: anything a student asks that the course
     questions page already answers should be answered here, not
     shrugged at. bio005-question-bank.js is generated from
     course-questions.html, so the page stays the single source
     and Hootie never drifts from it.

     This runs AFTER the intent matcher, because an intent answer
     knows what week it is and a stored answer does not. It runs
     BEFORE the refusal, because "I do not know" is the wrong
     reply to a question with an answer already on the site.

     Scoring is deliberately dumb and predictable: overlap of
     meaningful words between the question asked and the stored
     question, weighted so a word in the stored question counts
     more than a word buried in its answer. A weak best match is
     no match, because a confidently wrong answer is worse than
     an honest miss.
     ---------------------------------------------------------- */
  var STOP = {' the':1,a:1,an:1,and:1,are:1,as:1,at:1,be:1,but:1,by:1,can:1,do:1,does:1,
    for:1,from:1,get:1,how:1,i:1,if:1,in:1,is:1,it:1,me:1,my:1,of:1,on:1,or:1,should:1,
    that:1,the:1,then:1,this:1,to:1,was:1,what:1,when:1,where:1,which:1,who:1,why:1,
    will:1,with:1,you:1,your:1,am:1,we:1,us:1,so:1,any:1,'':1};

  function words(t) {
    return String(t || '').toLowerCase().replace(/<[^>]+>/g, ' ')
      .split(/[^a-z0-9]+/).filter(function (w) { return w.length > 2 && !STOP[w]; });
  }

  function searchBank(q) {
    var bank = window.BIO005_QUESTIONS;
    if (!bank || !bank.length) return null;
    var asked = words(q);
    if (asked.length < 2) return null;

    var best = null, bestScore = 0, runnerUp = null;
    bank.forEach(function (e) {
      if (!e.__qw) { e.__qw = words(e.q); e.__aw = words(e.a); }
      var score = 0;
      asked.forEach(function (w) {
        if (e.__qw.indexOf(w) > -1) score += 3;
        else if (e.__aw.indexOf(w) > -1) score += 1;
      });
      /* a short stored question matched fully beats a long one matched partly */
      score = score / Math.sqrt(e.__qw.length + 2);
      if (score > bestScore) { runnerUp = best; bestScore = score; best = e; }
    });

    /* Below this the match is noise. Tuned so a two word question with one
       real overlap does not fire. */
    if (!best || bestScore < 1.15) return null;

    var html = '<p>' + esc(best.q) + '</p>' + best.a;
    if (runnerUp) {
      html += '<p class="hoot-more">Not what you meant? The '
        + '<a href="course-questions.html" target="_top">answered questions page</a> has '
        + bank.length + ' of these, and you can filter it by typing a word.</p>';
    }
    return html;
  }

  function hootieAnswer(qRaw, ctx) {
    var q = String(qRaw || '').toLowerCase().trim();
    if (!q) return { html: 'Ask me what is on this week, when your next exam is, how grading works, or what to do tonight.' };

    /* buildContext returns null on any page that does not carry the schedule
       globals. Every date aware branch below then throws, and the student sees
       a dead assistant rather than an answer. The stored answers do not need a
       context at all, so on a null context go straight to them. */
    if (!ctx) {
      var only = searchBank(q);
      if (only) return { html: only, intent: 'bank' };
      return { html: 'I cannot see the schedule from this page. The '
        + '<a href="course-questions.html" target="_top">answered questions page</a> covers most of what students ask, '
        + 'and the <a href="virtual-office.html" target="_top">virtual office</a> is where to put anything it does not.' };
    }

    /* Explicit week number wins over everything. */
    var wkAsk = q.match(/week\s*(\d{1,2})/);
    if (wkAsk) {
      var n = parseInt(wkAsk[1], 10);
      if (n >= 1 && n <= 17) return { html: weekLine(ctx, n) };
      return { html: 'The term runs weeks 1 to 17. There is no week ' + n + '.' };
    }

    /* Explicit exam number. Any digit, so "exam 9" is corrected
       rather than silently answered with the next exam. */
    var exAsk = q.match(/exam\s*(\d+)/);
    if (exAsk) {
      var want = parseInt(exAsk[1], 10);
      var ex = ctx.exams.filter(function (e) { return e.n === want; })[0];
      if (!ex) return { html: 'There are two exams in this course, Midterm 1 and Midterm 2. There is no Exam ' + want + '.' };
      return { html: examLine(ctx, ex) };
    }

    var id = matchIntent(q);
    if (id) {
      ctx.q = q;
      var html = answerFor(id, ctx);
      if (html) return { html: html, intent: id };
    }

    /* Already answered on the course questions page? Say that answer. */
    var stored = searchBank(q);
    if (stored) return { html: stored, intent: 'bank' };

    /* Physiology content, or anything else. Say so; do not guess. */
    var res = weekResources(ctx, ctx.viewWk || ctx.curWk);
    return { html:
      'I did not quite catch that, and I will not guess at physiology when the answer is going to be examined.'
      + '<br><br>I can help with where to start, what is on this week, grading, exams, weekly checkpoints, how to study, and who to contact.'
      + '<br><br>For content, go to your notes packet for this module, '
      + (res.length ? res.join(', ') + ', ' : a('loops', 'the Loops') + ', ')
      + 'or the ' + a('atlas') + '.'
      + '<br><br>Still stuck? Message Dr. Rennie in the Canvas Inbox, or bring it to class. A question you had to fight for is worth asking out loud.',
      unanswered: true };
  }

  /* ----------------------------------------------------------
     UI
     ---------------------------------------------------------- */
  var CSS = [
    '.hoo-btn{position:fixed;right:18px;bottom:18px;z-index:60;display:inline-flex;align-items:center;gap:8px;',
    '  font:inherit;font-size:.85rem;font-weight:700;cursor:pointer;padding:11px 16px;border-radius:999px;',
    '  background:var(--navy,#0B1530);color:#fff;border:1px solid var(--navy,#0B1530);',
    '  box-shadow:0 8px 16px rgba(0,0,0,.18);transition:transform 180ms ease,box-shadow 180ms ease}',
    '.hoo-btn:hover{transform:translateY(-2px);box-shadow:0 12px 22px rgba(0,0,0,.22)}',
    '.hoo-btn .fish{line-height:0;display:inline-flex;background:#fff;border-radius:50%;padding:2px}',
    /* Sits ABOVE the launcher, not beside it. Beside meant guessing
       the pill's width, and the guess was wrong once the label and
       the mark were in place, so the bubble overlapped the button. */
    '.hoo-nudge{position:fixed;right:18px;bottom:82px;z-index:59;',
    '  background:var(--gold,#C9A14A);color:var(--navy,#0B1530);',
    "  font-family:var(--eb,inherit);font-size:12.5px;font-weight:700;white-space:nowrap;",
    '  padding:7px 12px;border-radius:9px;box-shadow:0 6px 14px rgba(0,0,0,.18)}',
    ".hoo-nudge::after{content:'';position:absolute;bottom:-6px;right:22px;border:6px solid transparent;border-top-color:var(--gold,#C9A14A)}",
    '.hoo-nudge[hidden]{display:none}',
    '.hoo-panel{position:fixed;right:18px;bottom:76px;z-index:61;width:min(390px,calc(100vw - 36px));',
    '  max-height:min(560px,calc(100vh - 110px));display:none;flex-direction:column;',
    '  background:#fff;border:1px solid var(--line,rgba(11,21,48,.12));border-radius:var(--radius,16px);',
    '  box-shadow:0 18px 44px rgba(0,0,0,.24);overflow:hidden}',
    '.hoo-panel.on{display:flex}',
    '.hoo-hd{display:flex;align-items:center;gap:9px;padding:12px 14px;background:var(--navy,#0B1530);color:#fff}',
    '.hoo-hd .fish{line-height:0;display:inline-flex;background:#fff;border-radius:50%;padding:2px}',
    '.hoo-hd h2{margin:0;font-size:.95rem;font-weight:700;color:#fff}',
    '.hoo-hd .sub{margin:1px 0 0;font-size:11.5px;color:#fff;opacity:.85}',
    '.hoo-x{margin-left:auto;background:transparent;border:0;color:#fff;cursor:pointer;font-size:1.25rem;line-height:1;padding:3px 6px;border-radius:7px}',
    '.hoo-x:hover{background:rgba(255,255,255,.16)}',
    '.hoo-log{flex:1;overflow-y:auto;padding:13px 14px;display:flex;flex-direction:column;gap:10px;background:var(--offwhite,#F3F5F8)}',
    '.hoo-msg{max-width:92%;padding:10px 12px;border-radius:13px;font-size:13.5px;line-height:1.55}',
    '.hoo-msg.bot{background:#fff;border:1px solid var(--line,rgba(11,21,48,.12));color:var(--navy,#0B1530);align-self:flex-start}',
    '.hoo-msg.you{background:var(--navy,#0B1530);color:#fff;align-self:flex-end}',
    '.hoo-msg a{color:var(--maroon-dark,#8B3A2E);font-weight:700}',
    '.hoo-msg.you a{color:var(--gold,#C9A14A)}',
    '.hoo-name{display:block;font-family:var(--eb,inherit);font-size:10.5px;letter-spacing:.06em;text-transform:uppercase;',
    '  color:var(--maroon-dark,#8B3A2E);font-weight:700;margin-bottom:4px}',
    '.hoo-chips{display:flex;flex-wrap:wrap;gap:6px;padding:10px 14px;border-top:1px solid var(--line,rgba(11,21,48,.12));background:#fff}',
    '.hoo-chip{font:inherit;font-size:11.5px;font-weight:700;cursor:pointer;padding:6px 10px;border-radius:999px;',
    '  background:#fff;color:var(--navy,#0B1530);border:1px solid var(--line,rgba(11,21,48,.12))}',
    '.hoo-chip:hover{border-color:var(--maroon-dark,#8B3A2E)}',
    '.hoo-form{display:flex;gap:7px;padding:10px 14px;border-top:1px solid var(--line,rgba(11,21,48,.12));background:#fff}',
    '.hoo-in{flex:1;font:inherit;font-size:13.5px;padding:9px 11px;border-radius:10px;',
    '  border:1.5px solid var(--line,rgba(11,21,48,.12));background:var(--offwhite,#F3F5F8);color:var(--navy,#0B1530)}',
    '.hoo-send{font:inherit;font-size:12.5px;font-weight:700;cursor:pointer;padding:9px 14px;border-radius:10px;',
    '  background:var(--gold,#C9A14A);color:var(--navy,#0B1530);border:1px solid var(--gold,#C9A14A)}',
    '.hoo-btn:focus-visible,.hoo-x:focus-visible,.hoo-chip:focus-visible,.hoo-in:focus-visible,.hoo-send:focus-visible{',
    '  outline:3px solid var(--gold,#C9A14A);outline-offset:2px}',
    '@media (prefers-reduced-motion:reduce){.hoo-btn{transition:none}.hoo-btn:hover{transform:none}}',
    /* Every fixed element Hootie owns. The nudge was missing from this
       list and printed as a gold pill across the foot of the page. */
    '@media print{.hoo-btn,.hoo-panel,.hoo-nudge{display:none !important}}'
  ].join('');

  /* Six of these are welcome.html's, kept because they are framed
     the way a stuck student actually thinks. "I'm struggling" is
     the one that matters most and the schedule-only version had no
     answer for it at all. */
  var CHIPS = [
    'Where do I start?',
    "What's on this week?",
    "I'm struggling",
    'When is my next exam?',
    'How does grading work?',
    'What should I do tonight?',
    'Who do I contact?'
  ];

  /* The real Hootie. This mark already existed in welcome.html, a
     pufferfish in a mortarboard with round glasses and a maroon bow
     tie, drawn in the Mastery OS palette. Reused here rather than
     redrawn, so there is one Hootie across the site instead of two.
     Source of truth: the hootieBtn svg in welcome.html. */
  function hootieMark(size) {
    return '<svg viewBox="0 0 64 64" width="' + size + '" height="' + size + '" aria-hidden="true" focusable="false">'
      + '<path d="M20 39 L6 28 Q3 39 6 50 Z" fill="#C9A14A"/>'
      + '<ellipse cx="35" cy="40" rx="19" ry="16" fill="#E8CE85"/>'
      + '<ellipse cx="37" cy="44" rx="12" ry="9" fill="#F2E2B0"/>'
      + '<path d="M28 25 Q36 21 44 25 L42 31 Q36 34 30 31 Z" fill="#0B1530"/>'
      + '<path d="M36 11 L55 20 L36 29 L17 20 Z" fill="#0B1530"/>'
      + '<circle cx="36" cy="20" r="1.5" fill="#C9A14A"/>'
      + '<path d="M36 20 L53 21 L53 32" fill="none" stroke="#C9A14A" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>'
      + '<circle cx="53" cy="34" r="2.4" fill="#C9A14A"/>'
      + '<circle cx="31" cy="39" r="7" fill="#FFFFFF" stroke="#0B1530" stroke-width="2.4"/>'
      + '<circle cx="45" cy="39" r="7" fill="#FFFFFF" stroke="#0B1530" stroke-width="2.4"/>'
      + '<path d="M37.6 39 H38.4" stroke="#0B1530" stroke-width="2.2"/>'
      + '<circle cx="32" cy="40" r="3" fill="#0B1530"/>'
      + '<circle cx="44" cy="40" r="3" fill="#0B1530"/>'
      + '<circle cx="33.1" cy="38.8" r="1" fill="#FFFFFF"/>'
      + '<circle cx="45.1" cy="38.8" r="1" fill="#FFFFFF"/>'
      + '<path d="M33 46 Q38 51 43 46 Q38.5 48.5 33 46 Z" fill="#8B3A2E"/>'
      + '<path d="M31 49 L31 55 L36.5 52 Z" fill="#8B3A2E"/>'
      + '<path d="M42 49 L42 55 L36.5 52 Z" fill="#8B3A2E"/>'
      + '<rect x="35" y="50.2" width="3" height="3.6" rx="1" fill="#6E2D24"/>'
      + '</svg>';
  }

  function mount() {
    if (document.body.getAttribute('data-hootie') === 'off') return;
    var ctx = buildContext();
    if (!ctx) return;                       /* no data, no Hootie */

    var st = document.createElement('style');
    st.textContent = CSS;
    document.head.appendChild(st);

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'hoo-btn';
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', 'hoo-panel');
    btn.innerHTML = '<span class="fish" aria-hidden="true">' + hootieMark(26) + '</span>Ask Hootie';

    var panel = document.createElement('div');
    panel.className = 'hoo-panel';
    panel.id = 'hoo-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'false');
    panel.setAttribute('aria-label', 'Ask Hootie the Knowfish about your schedule');

    panel.innerHTML =
      '<div class="hoo-hd">'
      + '<span class="fish" aria-hidden="true">' + hootieMark(30) + '</span>'
      + '<div><h2>Hootie the Knowfish</h2><p class="sub">Your schedule, modules and exams</p></div>'
      + '<button type="button" class="hoo-x" aria-label="Close Hootie">&times;</button>'
      + '</div>'
      + '<div class="hoo-log" id="hoo-log" role="log" aria-live="polite" aria-label="Conversation with Hootie"></div>'
      + '<div class="hoo-chips" id="hoo-chips"></div>'
      + '<form class="hoo-form" id="hoo-form">'
      + '<label class="sr-only" for="hoo-in" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap">Your question</label>'
      + '<input class="hoo-in" id="hoo-in" type="text" autocomplete="off" placeholder="Ask about your schedule...">'
      + '<button type="submit" class="hoo-send">Ask</button>'
      + '</form>';

    /* "Stuck? Ask Hootie." Borrowed from welcome.html, where it is
       the thing that actually gets students to open the panel. It is
       role="status" so it is announced once, and it retires the
       moment Hootie is opened so it does not nag. */
    var nudge = document.createElement('div');
    nudge.className = 'hoo-nudge';
    nudge.setAttribute('role', 'status');
    nudge.textContent = 'Stuck? Ask Hootie.';

    document.body.appendChild(btn);
    document.body.appendChild(nudge);
    document.body.appendChild(panel);

    var log = panel.querySelector('#hoo-log');
    var chips = panel.querySelector('#hoo-chips');
    var form = panel.querySelector('#hoo-form');
    var input = panel.querySelector('#hoo-in');

    function say(who, html) {
      var d = document.createElement('div');
      d.className = 'hoo-msg ' + who;
      d.innerHTML = (who === 'bot' ? '<span class="hoo-name">Hootie</span>' : '') + html;
      log.appendChild(d);
      log.scrollTop = log.scrollHeight;
    }

    function ask(q) {
      say('you', esc(q));
      var a = hootieAnswer(q, buildContext() || ctx);
      say('bot', a.html);
    }

    CHIPS.forEach(function (t) {
      var c = document.createElement('button');
      c.type = 'button';
      c.className = 'hoo-chip';
      c.textContent = t;
      c.addEventListener('click', function () { ask(t); });
      chips.appendChild(c);
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = input.value.trim();
      if (!v) return;
      input.value = '';
      ask(v);
    });

    var greeted = false;
    function open() {
      nudge.hidden = true;
      panel.classList.add('on');
      btn.setAttribute('aria-expanded', 'true');
      if (!greeted) {
        greeted = true;
        var c = buildContext() || ctx;
        var wk = c.viewWk || c.curWk;
        var hi = 'I know your schedule, your modules and your exam dates. I do not know physiology content, and I will tell you when a question is outside what I can answer.';
        if (c.state === 'during') {
          hi += '<br><br>Right now you are in <b>week ' + c.curWk + '</b>';
          var mods = c.moduleOf(c.curWk).map(function (m) { return 'Module ' + m.n; }).join(' into ');
          if (mods) hi += ', ' + mods;
          hi += '.';
        } else if (c.state === 'before') {
          hi += '<br><br>The term starts <b>' + fmt(c.sessions[0].date) + '</b>.';
        }
        if (c.viewWk && c.viewWk !== c.curWk) hi += ' You are looking at week ' + c.viewWk + '.';
        say('bot', hi);
      }
      input.focus();
    }
    function close() {
      panel.classList.remove('on');
      btn.setAttribute('aria-expanded', 'false');
      btn.focus();
    }

    btn.addEventListener('click', function () {
      panel.classList.contains('on') ? close() : open();
    });
    panel.querySelector('.hoo-x').addEventListener('click', close);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel.classList.contains('on')) close();
    });
  }

  /* Exposed for testing and for a future swap of the answer layer. */
  window.BIO005_HOOTIE = { answer: hootieAnswer, context: buildContext };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
