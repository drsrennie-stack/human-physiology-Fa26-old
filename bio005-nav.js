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
     back bar text  #1E3D4C on #FFFFFF   11.49:1
     back bar link  #7A2A22 on #FFFFFF   10.16:1
     footer link    #FFFFFF on #08101F   18.34:1
     footer muted   #C9CFD6 on #08101F   11.24:1
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
    'welcome.html':            { name: 'Course home',            parent: null },
    'index.html':              { name: 'Course calendar',        parent: 'welcome.html' },
    'course-entry.html':       { name: 'Start of the course',    parent: null },
    'canvas-home.html':        { name: 'Course entry',           parent: null },
    'start-here.html':         { name: 'Start here',             parent: 'welcome.html' },
    'before-you-start.html':   { name: 'Before you start',       parent: 'welcome.html' },
    'what-you-do.html':        { name: 'What you do and what it is worth', parent: 'welcome.html' },
    'syllabus-fall2026.html':  { name: 'Syllabus',               parent: 'welcome.html' },
    'course-schedule.html':    { name: 'Course schedule',        parent: 'welcome.html' },
    'course-materials.html':   { name: 'Course materials',       parent: 'welcome.html' },
    'sitemap.html':            { name: 'All course pages',       parent: 'welcome.html' },

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

    /* Mission lectures. Slides and notes are one pair per mission, and the
       mission belongs to the week it is taught in. */
    'biol005-m01-maintain-control-slides.html':  { name: 'Mission 1 slides', parent: 'week-01.html' },
    'biol005-m01-maintain-control-notes.html':   { name: 'Mission 1 notes',  parent: 'week-01.html' },
    'biol005-m02-molecular-toolkit-slides.html': { name: 'Mission 2 slides', parent: 'week-02.html' },
    'biol005-m02-molecular-toolkit-notes.html':  { name: 'Mission 2 notes',  parent: 'week-02.html' },
    'competency-brain-dump.html':                { name: 'The competency brain dump', parent: 'welcome.html' },

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
    'clinical-physiology-lab-manual.html': { name: 'Clinical Physiology Lab manual', parent: 'welcome.html' },
    'osmosis-iv-fluids-lab.html':    { name: 'Osmosis and IV fluids lab', parent: 'clinical-physiology-lab-manual.html' },
    'cbc-pcr-lab.html':              { name: 'CBC and PCR lab',           parent: 'clinical-physiology-lab-manual.html' },
    'pulmonary-function-lab.html':   { name: 'Pulmonary function lab',    parent: 'clinical-physiology-lab-manual.html' },
    'lab-week05-sensory-reflex.html':{ name: 'Week 5 sensory and reflex lab', parent: 'clinical-physiology-lab-manual.html' },
    'lab-week08-hormone-cycle.html': { name: 'Week 8 hormone cycle lab',  parent: 'clinical-physiology-lab-manual.html' },
    'lab-report-form.html':          { name: 'Lab report form',           parent: 'clinical-physiology-lab-manual.html' },

    /* Assignments */
    'assignment-notesheet.html':    { name: 'Note sheets',      parent: 'what-you-do.html' },
    'assignment-discussion.html':   { name: 'Discussions',      parent: 'what-you-do.html' },
    'assignment-bookproblems.html': { name: 'Book problems',    parent: 'what-you-do.html' },
    'assignment-physioex.html':     { name: 'PhysioEx labs',    parent: 'what-you-do.html' },

    /* Study tools */
    'competency-study-guide.html':   { name: 'Competency study guide', parent: 'welcome.html' },
    'competency-recall.html':        { name: 'Recall cards',           parent: 'welcome.html' },
    'competency-packet-fall2026.html': { name: 'Competency packet',    parent: 'welcome.html' },
    'mastery-canvas.html':           { name: 'Draw it from memory',    parent: 'welcome.html' },
    'BIO005-patient-file.html':      { name: 'Patient file',           parent: 'welcome.html' },
    'label-kit.html':                { name: 'Label kit',              parent: 'welcome.html' },
    'anatomy-review.html':           { name: 'Anatomy review',         parent: 'welcome.html' },

    /* Instructor side. Reachable, but not advertised to students. */
    'build-tracker.html':        { name: 'Build tracker',      parent: 'welcome.html', staff: true },
    'competency-map.html':       { name: 'Competency map',     parent: 'welcome.html', staff: true },
    'ai-work-log.html':          { name: 'AI work log',        parent: 'welcome.html', staff: true },
    'teaching-guide-week01.html':{ name: 'Week 1 teaching guide', parent: 'welcome.html', staff: true }
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
    var f = (location.pathname.split('/').pop() || 'welcome.html');
    return f === '' ? 'welcome.html' : f;
  }

  function entry(file) {
    if (PAGES[file]) return PAGES[file];
    /* The per-week competency lists and note sheets belong to their own week,
       and there will eventually be fifteen of each. Derive the parent from the
       number in the filename rather than listing thirty entries above. */
    var wk = /^(competencies|notesheet)-week-(\d{2})\.html$/.exec(file);
    if (wk) {
      return {
        name: (wk[1] === 'notesheet' ? 'Week ' + (+wk[2]) + ' note sheet'
                                     : 'Week ' + (+wk[2]) + ' competency list'),
        parent: 'week-' + wk[2] + '.html'
      };
    }
    for (var i = 0; i < PREFIX.length; i++) {
      if (PREFIX[i].test.test(file)) {
        return { name: PREFIX[i].label, parent: PREFIX[i].parent };
      }
    }
    return { name: null, parent: 'welcome.html' };
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
    return !!(n.closest && n.closest('.b5nav, .b5foot, nav, [aria-hidden="true"], .bd-dock'));
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
  + '.b5nav{background:#fff;border-bottom:1px solid #E3E1DE;font-family:"Plus Jakarta Sans","DM Sans",system-ui,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif}'
  + '.b5nav-in{max-width:1080px;margin:0 auto;padding:10px 20px;display:flex;align-items:center;gap:14px;flex-wrap:wrap}'
  + '.b5nav-in ol{margin-right:auto}'
  + '.b5nav ol{list-style:none;display:flex;align-items:center;gap:8px;margin:0;padding:0;flex-wrap:wrap}'
  + '.b5nav li{display:flex;align-items:center;gap:8px;font-size:15px;color:#1E3D4C}'
  + '.b5nav li+li:before{content:"›";color:#8A8A8A;font-size:16px}'
  + '.b5nav a{color:#7A2A22;text-decoration:none;font-weight:600;border-radius:6px;padding:3px 4px}'
  + '.b5nav a:hover{text-decoration:underline}'
  + '.b5nav a:focus-visible{outline:3px solid #B8924A;outline-offset:2px}'
  + '.b5nav [aria-current="page"]{color:#1E3D4C;font-weight:600}'
  + '.b5nav-back{display:inline-flex;align-items:center;gap:7px;border:1px solid #E3E1DE;'
  + 'border-radius:8px;padding:7px 13px;font-size:15px;font-weight:600;color:#7A2A22;'
  + 'text-decoration:none;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.08);'
  + 'transition:transform 200ms ease,box-shadow 200ms ease}'
  + '.b5nav-back:hover{transform:translateY(-2px);box-shadow:0 8px 16px rgba(0,0,0,.10);text-decoration:none}'
  + '.b5nav-back:focus-visible{outline:3px solid #B8924A;outline-offset:2px}'
  /* A quiet strip, not a slab. The first version stood 297px tall on the
     course home with its links wrapping onto three centred lines, and on a
     wide screen it got caught in the hero's layout and sat beside the
     headline. It is now one left aligned row that clears everything above it
     and cannot become a column of somebody else's grid. */
  + '.b5foot{background:#08101F;color:#C9CFD6;margin-top:48px;width:100%;clear:both;'
  + 'position:static;float:none;grid-column:1/-1;flex:0 0 100%;box-sizing:border-box;'
  + 'text-align:left;'
  + 'font-family:"Plus Jakarta Sans","DM Sans",system-ui,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif}'
  + '.b5foot-in{max-width:1080px;margin:0 auto;padding:15px 20px 17px}'
  + '.b5foot ul{list-style:none;margin:0 0 7px;padding:0;display:flex;flex-wrap:wrap;'
  + 'align-items:center;gap:2px 0;font-size:13px;justify-content:flex-start;text-align:left}'
  /* Every page brings its own list styles, and on the week pages they were
     capping the row's width and adding 5px above and below every item, which
     wrapped eight links onto three lines. Reset them inside the footer only. */
  + '.b5foot nav ul{width:100%;max-width:none}'
  + '.b5foot nav ul li{display:flex;align-items:center;margin:0;padding:0;list-style:none}'
  + '.b5foot nav ul li:before{margin-top:0}'
  + '.b5foot li+li:before{content:"·";margin:0 8px;color:#7FA2B4}'
  + '.b5foot a{color:#fff;text-decoration:none;font-weight:600;border-radius:5px;padding:2px 2px}'
  + '.b5foot a:hover{text-decoration:underline}'
  + '.b5foot a:focus-visible{outline:3px solid #B8924A;outline-offset:2px}'
  + '.b5foot p{margin:0;font-size:12.5px;line-height:1.5;color:#9BA6B2;max-width:92ch;text-align:left}'
  + '.b5skip{position:absolute;left:-9999px;top:0;background:#08101F;color:#fff;padding:10px 16px;z-index:1000}'
  + '.b5skip:focus{left:8px;top:8px}'
  + '@media (max-width:560px){.b5nav-in{padding:9px 14px}.b5foot-in{padding:22px 14px 26px}}'
  + '@media (prefers-reduced-motion:reduce){.b5nav-back{transition:none}.b5nav-back:hover{transform:none}}'
  + 'body.present .b5foot,body.present .b5nav,body.wb-on .b5foot,body.wb-on .b5nav{display:none!important}'
  + '@media print{.b5nav,.b5foot,.b5skip{display:none!important}}'


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

    /* ---- back bar ---- */
    if (parent && !hasOwnHeader()) {
      var nav = document.createElement('nav');
      nav.className = 'b5nav';
      nav.setAttribute('aria-label', 'Breadcrumb');

      var trail = [];
      var walk = parent, guard = 0;
      while (walk && guard++ < 6) {
        trail.unshift(walk);
        var pe = PAGES[walk];
        walk = pe ? pe.parent : null;
      }
      if (trail.indexOf('welcome.html') === -1) trail.unshift('welcome.html');

      var crumbs = '';
      for (var i = 0; i < trail.length; i++) {
        crumbs += '<li><a href="' + trail[i] + '" target="_top">' + titleOf(trail[i]) + '</a></li>';
      }
      crumbs += '<li><span aria-current="page">' + (me.name || document.title.split('·')[0].trim()) + '</span></li>';

      nav.innerHTML = '<div class="b5nav-in">'
        + '<a class="b5nav-back" href="' + parent + '" target="_top">'
        + '<span aria-hidden="true">&larr;</span> Back to ' + titleOf(parent) + '</a>'
        + '<ol>' + crumbs + '</ol></div>';

      var first = document.querySelector('.b5skip') ? document.querySelector('.b5skip').nextSibling
                                                    : document.body.firstChild;
      document.body.insertBefore(nav, first);
    }

    /* ---- footer, on everything ---- */
    if (!document.querySelector('.b5foot')) {
      var links = [
        ['welcome.html', 'Course home', 0],
        ['syllabus-fall2026.html', 'Syllabus', 0],
        ['course-schedule.html', 'Schedule', 0],
        ['clinical-physiology-lab-manual.html', 'Lab manual', 0],
        ['sitemap.html', 'All pages', 0],
        ['accessibility.html', 'Accessibility', 0],
        [CANVAS_HOME, 'Canvas', 1],
        [VIRTUAL_OFFICE, 'Virtual Office', 1]
      ];
      var items = '';
      for (var j = 0; j < links.length; j++) {
        var ext = links[j][2]
          ? ' target="_blank" rel="noopener"'
          : ' target="_top"';
        items += '<li><a href="' + links[j][0] + '"' + ext + '>' + links[j][1] + '</a></li>';
      }
      var foot = document.createElement('footer');
      foot.className = 'b5foot';
      foot.innerHTML = '<div class="b5foot-in">'
        + '<nav aria-label="Site"><ul>' + items + '</ul></nav>'
        + '<p>BIO 005 Human Physiology, Yuba College, Fall 2026. Dr. Sharilyn Rennie. '
        + 'If a page does not work for you, tell me in the Virtual Office.</p></div>';
      document.body.appendChild(foot);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
