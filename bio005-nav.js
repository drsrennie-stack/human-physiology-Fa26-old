/* ============================================================
   BIO 005 Human Physiology, Yuba College, Fall 2026
   bio005-nav.js

   One job: nobody is ever stranded.

   Every page in this course gets the same two things from this file.

   1. A back bar at the top of the page. It names the page you came
      from by its real name, so "Back to Week 1" instead of "Back",
      and it always offers Course home as a second route. It is a
      breadcrumb, not the browser back button, so it behaves the same
      whether a student arrived from the dock, from Canvas, from a QR
      code, or from a bookmark six weeks later.

   2. A footer on every page carrying the eight links that should
      never be more than one click away.

   The back bar is skipped on pages that already carry the site header
   with its own back control, so those pages do not end up with two
   back buttons. The footer goes on everything.

   Accessibility notes, because this file is part of the Section D
   answer and not just convenience:
     - The back bar is a <nav aria-label="Breadcrumb"> holding an
       ordered list, which is what a screen reader expects.
     - The current page is marked aria-current="page".
     - The footer is a <footer> landmark holding <nav aria-label="Site">.
     - A skip link is added when the page does not already have one,
       so keyboard users are not walked through the nav on every page.
     - Focus is visible, contrast is measured (see the values below),
       and motion respects prefers-reduced-motion.
     - Internal links carry target="_top" so they break out of the
       Canvas iframe instead of nesting the course inside itself.
       The two Canvas links open in a new tab, since they leave here.

   Measured contrast, all AAA:
     back bar text  #0B1530 on #FFFFFF   11.49:1
     back bar link  #8B3A2E on #FFFFFF   10.16:1
     footer link    #FFFFFF on #060A18   18.34:1
     footer muted   #C9CFD6 on #060A18   11.24:1
   ============================================================ */

(function () {
  'use strict';

  if (window.__bio005NavLoaded) return;
  window.__bio005NavLoaded = true;

  var CANVAS_HOME = 'https://yccd.instructure.com/courses/42616';
  var VIRTUAL_OFFICE = 'https://yccd.instructure.com/courses/42616/discussion_topics/711800';

  /* ---------------------------------------------------------
     The page map.
     name   what this page is called when something links back to it
     parent where "Back to ..." goes
     Anything not listed falls back to the course home, so a page
     added later is never stranded, it is just one level flat.
     --------------------------------------------------------- */
  var PAGES = {
    /* Course home moved to course-start.html on Sep 6 2026. welcome.html was the
       root of this map and 40 pages link to it, so retiring it meant swapping the
       root here rather than editing 40 files. welcome.html now redirects. */
    'course-start.html':       { name: 'Course home',            parent: null },
    'welcome-tour.html':       { name: 'Welcome tour',           parent: 'course-start.html' },
    'index.html':              { name: 'Course calendar',        parent: 'course-start.html' },
    'course-entry.html':       { name: 'Start of the course',    parent: null },
    'canvas-home.html':        { name: 'Course entry',           parent: null },
    'start-here.html':         { name: 'Start here',             parent: 'course-start.html' },
    'before-you-start.html':   { name: 'Before you start',       parent: 'course-start.html' },
    'what-you-do.html':        { name: 'What you do and what it is worth', parent: 'course-start.html' },
    'syllabus-fall2026.html':  { name: 'Syllabus',               parent: 'course-start.html' },
    'course-schedule.html':    { name: 'Course schedule',        parent: 'course-start.html' },
    'course-materials.html':   { name: 'Course materials',       parent: 'course-start.html' },
    'sitemap.html':            { name: 'All course pages',       parent: 'course-start.html' },

    /* Weeks */
    'week-01.html':            { name: 'Week 1',  parent: 'course-schedule.html' },
    'week-02.html':            { name: 'Week 2',  parent: 'course-schedule.html' },
    'week-03.html':            { name: 'Week 3',  parent: 'course-schedule.html' },
    'week-04.html':            { name: 'Week 4',  parent: 'course-schedule.html' },
    'week-05.html':            { name: 'Week 5',  parent: 'course-schedule.html' },
    'week-06.html':            { name: 'Week 6',  parent: 'course-schedule.html' },
    'week-07.html':            { name: 'Week 7',  parent: 'course-schedule.html' },
    'week-08.html':            { name: 'Week 8',  parent: 'course-schedule.html' },
    'week-09.html':            { name: 'Week 9',  parent: 'course-schedule.html' },
    'week-10.html':            { name: 'Week 10', parent: 'course-schedule.html' },
    'week-11.html':            { name: 'Week 11', parent: 'course-schedule.html' },
    'week-12.html':            { name: 'Week 12', parent: 'course-schedule.html' },
    'week-13.html':            { name: 'Week 13', parent: 'course-schedule.html' },
    'week-14.html':            { name: 'Week 14', parent: 'course-schedule.html' },
    'week-15.html':            { name: 'Week 15', parent: 'course-schedule.html' },

    /* Week 1 teaching spine */
    'concept-videos-week01.html': { name: 'Week 1 concept videos', parent: 'week-01.html' },
    'braindump-week01.html':      { name: 'Week 1 brain dump',     parent: 'week-01.html' },

    /* Units */
    'unit-01.html': { name: 'Unit 1', parent: 'course-materials.html' },
    'unit-02.html': { name: 'Unit 2', parent: 'course-materials.html' },
    'unit-03.html': { name: 'Unit 3', parent: 'course-materials.html' },
    'unit-04.html': { name: 'Unit 4', parent: 'course-materials.html' },
    'unit-05.html': { name: 'Unit 5', parent: 'course-materials.html' },

    /* Lab */
    'clinical-physiology-lab-manual.html': { name: 'Clinical Physiology Lab manual', parent: 'course-start.html' },
    'osmosis-iv-fluids-lab.html':    { name: 'Osmosis and IV fluids lab', parent: 'clinical-physiology-lab-manual.html' },
    'cbc-pcr-lab.html':              { name: 'CBC and PCR lab',           parent: 'clinical-physiology-lab-manual.html' },
    'pulmonary-function-lab.html':   { name: 'Pulmonary function lab',    parent: 'clinical-physiology-lab-manual.html' },
    'lab-week08-hormone-cycle.html': { name: 'Week 8 hormone cycle lab',  parent: 'clinical-physiology-lab-manual.html' },
    'lab-report-form.html':          { name: 'Lab report form',           parent: 'clinical-physiology-lab-manual.html' },

    /* Assignments */
    'assignment-notesheet.html':    { name: 'Note sheets',      parent: 'what-you-do.html' },
    'assignment-discussion.html':   { name: 'Discussions',      parent: 'what-you-do.html' },
    'assignment-bookproblems.html': { name: 'Book problems',    parent: 'what-you-do.html' },
    'assignment-physioex.html':     { name: 'PhysioEx labs',    parent: 'what-you-do.html' },

    /* Study tools */
    'competency-study-guide.html':   { name: 'Competency study guide', parent: 'course-start.html' },
    'competency-recall.html':        { name: 'Recall cards',           parent: 'course-start.html' },
    'competency-packet-fall2026.html': { name: 'Competency packet',    parent: 'course-start.html' },
    'mastery-canvas.html':           { name: 'Draw it from memory',    parent: 'course-start.html' },
    'BIO005-patient-file.html':      { name: 'Patient file',           parent: 'course-start.html' },
    'label-kit.html':                { name: 'Label kit',              parent: 'course-start.html' },
    'anatomy-review.html':           { name: 'Anatomy review',         parent: 'course-start.html' },

    /* Instructor side. Reachable, but not advertised to students. */
    'build-tracker.html':        { name: 'Build tracker',      parent: 'course-start.html', staff: true },
    'competency-map.html':       { name: 'Competency map',     parent: 'course-start.html', staff: true },
    'ai-work-log.html':          { name: 'AI work log',        parent: 'course-start.html', staff: true },
    'teaching-guide-week01.html':{ name: 'Week 1 teaching guide', parent: 'course-start.html', staff: true }
  };

  /* Whole families, matched by prefix, so new files inherit a parent
     without anyone having to remember to edit this file. */
  var PREFIX = [
    { test: /^slides-P-/i,   parent: 'concept-videos-week01.html', label: 'Week 1 slide deck' },
    { test: /^slides-p-/,    parent: 'course-materials.html',      label: 'Slide deck' },
    { test: /^workbook_week/,parent: 'course-materials.html',      label: 'Workbook' },
    { test: /^week-\d+/,     parent: 'course-schedule.html',       label: 'Week page' },
    { test: /^lab-/,         parent: 'clinical-physiology-lab-manual.html', label: 'Lab' },
    { test: /^assignment-/,  parent: 'what-you-do.html',           label: 'Assignment' }
  ];

  function here() {
    var f = (location.pathname.split('/').pop() || 'course-start.html');
    return f === '' ? 'course-start.html' : f;
  }

  function entry(file) {
    if (PAGES[file]) return PAGES[file];
    for (var i = 0; i < PREFIX.length; i++) {
      if (PREFIX[i].test.test(file)) {
        return { name: PREFIX[i].label, parent: PREFIX[i].parent };
      }
    }
    return { name: null, parent: 'course-start.html' };
  }

  function titleOf(file) {
    var e = PAGES[file];
    return (e && e.name) ? e.name : 'Course home';
  }

  /* Pages that already carry the site header and its own back control.
     They get the footer but not a second back bar. */

  var READABLE = 'h1,h2,h3,h4,p,li,dt,dd,blockquote,figcaption,caption,td,th';

  function shown(n) {
    return !(n.offsetParent === null && n.getClientRects().length === 0);
  }
  function chrome(n) {
    return !!(n.closest && n.closest('.b5nav, .b5foot, .b5play, .b5listen, nav, [aria-hidden="true"], .bd-dock'));
  }
  function readableCount(host) {
    if (!host) return 0;
    var c = 0;
    [].forEach.call(host.querySelectorAll(READABLE), function (n) {
      if (shown(n) && !chrome(n) && (n.textContent || '').trim().length > 1) c++;
    });
    return c;
  }
  /* The course home is three screens in one file and only one is on screen at a
     time, so an element that is the right answer for a returning student is a
     hidden panel for a first time visitor. Pick the container that actually has
     something in it right now, rather than trusting the markup alone. */
  function contentHost() {
    var m = document.querySelector('main, [role="main"]');
    if (readableCount(m) > 0) return m;
    var best = null, bestN = 0;
    [].forEach.call(document.querySelectorAll('main, section, article, .screen, #main, .shell, .wrap'), function (el) {
      if (!shown(el)) return;
      var n = readableCount(el);
      if (n > bestN) { bestN = n; best = el; }
    });
    return bestN > 0 ? best : document.body;
  }

  function hasOwnHeader() {
    return !!document.querySelector('.site-header .hdr-btn, .site-header .site-logo');
  }

  var CSS = ''
  + '.b5nav{background:#fff;border-bottom:1px solid #E3E1DE;font-family:"Plus Jakarta Sans",system-ui,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif}'
  + '.b5nav-in{max-width:1080px;margin:0 auto;padding:10px 20px;display:flex;align-items:center;gap:14px;flex-wrap:wrap}'
  + '.b5nav ol{list-style:none;display:flex;align-items:center;gap:8px;margin:0;padding:0;flex-wrap:wrap}'
  + '.b5nav li{display:flex;align-items:center;gap:8px;font-size:15px;color:#0B1530}'
  + '.b5nav li+li:before{content:"›";color:#8A8A8A;font-size:16px}'
  + '.b5nav a{color:#8B3A2E;text-decoration:none;font-weight:600;border-radius:6px;padding:3px 4px}'
  + '.b5nav a:hover{text-decoration:underline}'
  + '.b5nav a:focus-visible{outline:3px solid #C9A14A;outline-offset:2px}'
  + '.b5nav [aria-current="page"]{color:#0B1530;font-weight:600}'
  + '.b5nav-back{display:inline-flex;align-items:center;gap:7px;border:1px solid #E3E1DE;'
  + 'border-radius:8px;padding:7px 13px;font-size:15px;font-weight:600;color:#8B3A2E;'
  + 'text-decoration:none;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.08);'
  + 'transition:transform 200ms ease,box-shadow 200ms ease}'
  + '.b5nav-back:hover{transform:translateY(-2px);box-shadow:0 8px 16px rgba(0,0,0,.10);text-decoration:none}'
  + '.b5nav-back:focus-visible{outline:3px solid #C9A14A;outline-offset:2px}'
  + '.b5foot{background:#060A18;color:#C9CFD6;margin-top:0;'
  + 'font-family:"Plus Jakarta Sans",system-ui,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif}'
  + '.b5foot-in{max-width:none;margin:0;padding:26px max(40px,5vw) 34px}'
  + '.b5foot ul{list-style:none;margin:0 0 14px;padding:0;display:flex;flex-wrap:wrap;'
  + 'align-items:center;gap:6px 0;font-size:15px}'
  + '.b5foot li{display:flex;align-items:center}'
  + '.b5foot li+li:before{content:"·";margin:0 12px;color:#6B7A88}'
  + '.b5foot a{color:#fff;text-decoration:none;font-weight:600;border-radius:6px;padding:2px 3px}'
  + '.b5foot a:hover{text-decoration:underline}'
  + '.b5foot a:focus-visible{outline:3px solid #C9A14A;outline-offset:2px}'
  + '.b5foot p{margin:0;font-size:14px;line-height:1.6;color:#C9CFD6;max-width:70ch}'
  + '.b5skip{position:absolute;left:-9999px;top:0;background:#060A18;color:#fff;padding:10px 16px;z-index:1000}'
  + '.b5skip:focus{left:8px;top:8px}'
  + '@media (max-width:560px){.b5nav-in{padding:9px 14px}.b5foot-in{padding:22px 14px 26px}}'
  + '@media (prefers-reduced-motion:reduce){.b5nav-back{transition:none}.b5nav-back:hover{transform:none}}'
  + '@media print{.b5nav,.b5foot,.b5skip,.b5listen,.b5play{display:none!important}}'

  /* Listen to this page. Text to speech, which is NOT a screen reader, and is
     labeled that way everywhere it appears. A student who uses a real screen
     reader has a far better tool already configured the way they like it. This
     is for reading fatigue, for a second language, for following along with
     audio, and for the ones studying in the car park before a shift. */
  + '.b5listen{display:inline-flex;align-items:center;gap:9px;background:transparent;'
  + 'border:1px solid rgba(255,255,255,.35);color:#fff;font:inherit;font-size:14.5px;'
  + 'font-weight:600;border-radius:9px;padding:9px 14px;cursor:pointer;margin:2px 0 14px;'
  + 'transition:background 160ms ease,border-color 160ms ease}'
  + '.b5listen:hover{background:rgba(255,255,255,.10);border-color:rgba(255,255,255,.6)}'
  + '.b5listen:focus-visible{outline:3px solid #C9A14A;outline-offset:2px}'
  + '.b5listen svg{width:18px;height:18px;flex:0 0 auto}'
  + '.b5listen .sub{font-weight:400;color:#C9CFD6;font-size:13.5px}'
  + '.b5play{position:fixed;right:18px;bottom:18px;z-index:2147482000;display:none;'
  + 'align-items:center;gap:8px;background:#fff;border:1px solid #E3E1DE;border-radius:12px;'
  + 'padding:9px 11px;box-shadow:0 8px 22px rgba(0,0,0,.18)}'
  + '.b5play.on{display:flex}'
  + '.b5play button{font:inherit;font-size:14px;font-weight:700;cursor:pointer;color:#8B3A2E;'
  + 'background:#fff;border:1px solid #E3E1DE;border-radius:8px;padding:7px 11px;min-height:34px}'
  + '.b5play button:hover{background:#FAFAF9}'
  + '.b5play button:focus-visible{outline:3px solid #C9A14A;outline-offset:2px}'
  + '.b5play .st{font-size:13.5px;color:#4F5663;padding:0 4px;max-width:15ch}'
  + '.b5read{background:#FBF0D8;border-radius:4px;box-shadow:0 0 0 3px #FBF0D8}'
  + '@media (max-width:560px){.b5play{right:10px;bottom:10px;left:10px;justify-content:center}}'
  /* The dock launcher is fixed at bottom left with a very high z-index. The
     slide decks put their pen toolbar in the same corner, so the launcher sat
     on top of the first few controls and the color swatches failed the WCAG
     2.2 target size rule by being partly covered. Lifting the toolbar clears
     it. Harmless on every page that has no toolbar. */
  + '.inkbar{bottom:76px!important}'
  + '@media (max-width:560px){.inkbar{bottom:84px!important}}';

  function inject() {
    var style = document.createElement('style');
    style.setAttribute('data-bio005-nav', '');
    style.appendChild(document.createTextNode(CSS));
    document.head.appendChild(style);

    var file = here();
    var me = entry(file);
    var parent = me.parent;

    /* ---- main landmark ----
       A few pages carry their content in a plain div, so a screen reader user
       has no "jump to the main content" landmark and the skip link lands
       nowhere useful. Promote the element the skip link already points at,
       which is by definition the start of the content, rather than guessing. */
    if (!document.querySelector('main, [role="main"]')) {
      var tgt = contentHost();
      if (tgt && tgt !== document.body) {
        tgt.setAttribute('role', 'main');
        if (!tgt.id) tgt.id = 'b5-main';
      }
    }

    /* If a skip link points at something that is not on screen, it drops a
       keyboard user into a hidden panel. Send it to the content instead. */
    var sk = document.querySelector('a[href^="#"].skip, a[href^="#"].b5skip');
    if (sk) {
      var t = null;
      try { t = document.querySelector(sk.getAttribute('href')); } catch (e) {}
      if (!t || readableCount(t) === 0) {
        var good = contentHost();
        if (good && good !== document.body) {
          if (!good.id) good.id = 'b5-main';
          sk.setAttribute('href', '#' + good.id);
        }
      }
    }

    /* ---- skip link, only if the page has none ---- */
    if (!document.querySelector('a[href^="#"].skip, a[href^="#"].b5skip')) {
      var main = document.querySelector('main, [role="main"], #main')
              || document.querySelector('article, .shell, .wrap, .content, #content')
              || (function () {
                   var h = document.querySelector('h1');
                   return h ? (h.parentNode === document.body ? h : h.parentNode) : null;
                 })();
      if (main) {
        if (!main.id) main.id = 'b5-main';
        var skip = document.createElement('a');
        skip.className = 'b5skip';
        skip.href = '#' + main.id;
        skip.textContent = 'Skip to the main content';
        document.body.insertBefore(skip, document.body.firstChild);
      }
    }

    /* ---- one way back, and it is always the same one ----
       Sep 7 2026. The breadcrumb trail and the "Back to <parent>" button
       are gone. Students got a different back destination on every page,
       which is a thing to read before you can use it. One button, one
       destination, the page the course starts on. */
    /* On every page, unless the page already gives one. Some pages have
       their own "Course home" link in the brand bar or a back link of
       their own; two of the same button is worse than one. */
    var already = document.querySelector('.mm-back, .b5nav-back, a[href="course-start.html"].back');
    if (!already) {
      var nav = document.createElement('nav');
      nav.className = 'b5nav';
      nav.setAttribute('aria-label', 'Course navigation');
      nav.innerHTML = '<div class="b5nav-in">'
        + '<a class="b5nav-back" href="course-start.html" target="_top">'
        + '<span aria-hidden="true">&larr;</span> Course home</a></div>';
      var first = document.querySelector('.b5skip') ? document.querySelector('.b5skip').nextSibling
                                                    : document.body.firstChild;
      document.body.insertBefore(nav, first);
    }

    /* ---- no footer ----
       Sep 7 2026, Scrubs' call: the dark block at the bottom of every page
       is removed. The links it held live in the page chrome and in Canvas,
       and it was repeating itself under content that already ended. The
       Listen widget lived inside it and goes with it. */


    listen();
  }

  /* ---------------------------------------------------------
     Read this page out loud.

     Deliberately not called a screen reader anywhere a student can
     see, because it is not one. It reads the main content in order,
     one block at a time, highlighting as it goes so a student can
     follow along with their eyes and their ears together.

     Chunked by block rather than handed over as one long string,
     because the browser speech engine truncates long utterances and
     because chunking is what makes pause, resume and the highlight
     work at all.
     --------------------------------------------------------- */
  function listen() {
    if (!('speechSynthesis' in window) || !window.SpeechSynthesisUtterance) return;

    var foot = document.querySelector('.b5foot .b5foot-in');
    if (!foot || document.querySelector('.b5listen')) return;

    var blocks = [], idx = 0, playing = false, paused = false, keep = null;
    var rate = 1;
    try { var r = parseFloat(localStorage.getItem('bio005-listen-rate')); if (r >= 0.5 && r <= 2) rate = r; }
    catch (e) {}

    var SPEAKER = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"'
      + ' stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
      + '<path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/>'
      + '<path d="M18.5 5.5a9 9 0 0 1 0 13"/></svg>';

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'b5listen';
    btn.innerHTML = SPEAKER + '<span>Listen to this page<br><span class="sub">Reads the page out loud. This is not a screen reader.</span></span>';
    foot.insertBefore(btn, foot.firstChild);

    var bar = document.createElement('div');
    bar.className = 'b5play';
    bar.innerHTML = '<button type="button" data-a="toggle">Pause</button>'
      + '<button type="button" data-a="rate">1x</button>'
      + '<button type="button" data-a="stop">Stop</button>'
      + '<span class="st" role="status" aria-live="polite"></span>';
    document.body.appendChild(bar);
    var status = bar.querySelector('.st');
    var toggleBtn = bar.querySelector('[data-a="toggle"]');
    var rateBtn = bar.querySelector('[data-a="rate"]');
    rateBtn.textContent = rate + 'x';

    function collect() {
      var host = contentHost();
      var out = [];
      var nodes = host.querySelectorAll(READABLE);
      [].forEach.call(nodes, function (n) {
        if (chrome(n)) return;
        if (!shown(n)) return;
        /* innerText, not textContent. A link whose label and its sub-line are
           separate elements reads as "Course scheduleEvery week" from
           textContent, because nothing separates them. innerText respects the
           rendered layout and puts a break between them. */
        var raw = (typeof n.innerText === 'string' ? n.innerText : n.textContent) || '';
        var t = raw
          .replace(/[\u00B7\u2022\u2219]/g, ', ')      /* separator dots, read as pauses */
          .replace(/[\u2192\u2190\u2191\u2193\u21B5]/g, ' ') /* arrows, decorative */
          .replace(/[\u2713\u2714\u00D7\u2715]/g, ' ')        /* ticks and crosses */
          .replace(/\s+/g, ' ')
          .replace(/\s+,/g, ',')
          .replace(/,\s*,/g, ',')
          /* Section numbers sit in their own span inside the heading, so a
             heading reads as "01Course identification". Put the pause back. */
          .replace(/^(\d{1,2})(?=[A-Z])/, '$1. ')
          .trim();
        if (t.length < 2) return;
        /* Split long paragraphs at sentence ends so pause responds quickly and the
           highlight moves at a readable pace. */
        if (t.length > 240) {
          var parts = t.match(/[^.!?]+[.!?]*\s*/g) || [t];
          var buf = '';
          parts.forEach(function (piece) {
            if ((buf + piece).length > 240 && buf) { out.push({ el: n, text: buf.trim() }); buf = piece; }
            else buf += piece;
          });
          if (buf.trim()) out.push({ el: n, text: buf.trim() });
        } else {
          out.push({ el: n, text: t });
        }
      });
      return out;
    }

    function clearMark() {
      var m = document.querySelector('.b5read');
      if (m) m.classList.remove('b5read');
    }
    function mark(el) {
      clearMark();
      if (!el) return;
      el.classList.add('b5read');
      var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      try { el.scrollIntoView({ block: 'center', behavior: reduce ? 'auto' : 'smooth' }); } catch (e) {}
    }

    function speakNext() {
      if (!playing || idx >= blocks.length) { finish(); return; }
      var b = blocks[idx];
      mark(b.el);
      var u = new SpeechSynthesisUtterance(b.text);
      u.rate = rate;
      u.onend = function () { if (playing) { idx++; speakNext(); } };
      u.onerror = function () { if (playing) { idx++; speakNext(); } };
      window.speechSynthesis.speak(u);
      status.textContent = 'Reading, part ' + (idx + 1) + ' of ' + blocks.length;
    }

    function start() {
      blocks = collect();
      if (!blocks.length) { status.textContent = 'Nothing to read on this page.'; return; }
      idx = 0; playing = true; paused = false;
      bar.classList.add('on');
      toggleBtn.textContent = 'Pause';
      btn.setAttribute('aria-pressed', 'true');
      window.speechSynthesis.cancel();
      speakNext();
      /* Some browsers stop speaking after about fifteen seconds unless nudged. */
      keep = setInterval(function () {
        if (playing && !paused && window.speechSynthesis.speaking) {
          window.speechSynthesis.pause(); window.speechSynthesis.resume();
        }
      }, 10000);
    }

    function finish() {
      playing = false; paused = false;
      clearMark(); clearInterval(keep);
      window.speechSynthesis.cancel();
      bar.classList.remove('on');
      btn.setAttribute('aria-pressed', 'false');
      status.textContent = '';
    }

    btn.addEventListener('click', function () { playing ? finish() : start(); });
    bar.addEventListener('click', function (e) {
      var a = e.target && e.target.getAttribute && e.target.getAttribute('data-a');
      if (a === 'stop') { finish(); btn.focus(); }
      else if (a === 'toggle') {
        if (paused) { window.speechSynthesis.resume(); paused = false;
          toggleBtn.textContent = 'Pause'; status.textContent = 'Reading again.'; }
        else { window.speechSynthesis.pause(); paused = true;
          toggleBtn.textContent = 'Play'; status.textContent = 'Paused.'; }
      } else if (a === 'rate') {
        var steps = [0.75, 1, 1.25, 1.5];
        rate = steps[(steps.indexOf(rate) + 1) % steps.length];
        rateBtn.textContent = rate + 'x';
        try { localStorage.setItem('bio005-listen-rate', String(rate)); } catch (e2) {}
        if (playing) { window.speechSynthesis.cancel(); speakNext(); }
      }
    });
    window.addEventListener('pagehide', function () { try { window.speechSynthesis.cancel(); } catch (e) {} });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
