/* ============================================================
   BIO 005 Human Physiology, Fall 2026
   bio005-back.js

   A WAY BACK, ON EVERY PAGE.

   THE PROBLEM THIS FIXES
   ----------------------
   Every internal link on this site carries target="_top". That is
   the right choice for a page embedded on its own in Canvas: a
   link should break out of the frame rather than nest a course
   inside a course. The cost is that once a student follows one,
   they are on github.io with the Canvas chrome gone. In the Canvas
   mobile app, and in a Canvas page opened from a link, there is no
   browser back arrow to bring them home. Scrubs hit this on the
   Mastery OS, on the recall cards, and again on the competency
   sheet. Three reports of the same trap is a site problem, not
   three page problems.

   THE FIX
   -------
   One floating Back control, bottom left, on every page. It goes
   back through the history when there is history to go back
   through, which is the behavior a student expects and the one the
   missing browser button would have given them. When there is no
   history, because the page was opened cold from a Canvas module
   link or a bookmark, it goes to the course home page instead, so
   it is never a button that does nothing.

   WHY BOTTOM LEFT
   ---------------
   Hootie owns bottom right. Course tools used to own bottom left
   and is switched off, so that corner is free. Two floating
   controls in one corner overlap on a phone.

   WHY FLOATING AND NOT A BAR AT THE TOP
   -------------------------------------
   Inside Canvas these pages are rendered at their full height and
   the parent page does the scrolling, so a bar at the top of the
   document is only reachable by scrolling the whole Canvas page
   back up. A floating control stays where the student is looking.

   WHY IT DOES NOT DEFER TO A PAGE'S OWN BACK LINK
   -----------------------------------------------
   A few pages carry their own "Back to the schedule" link in a
   header. That was tried as a reason to skip, and it is the wrong
   rule. Those headers are sticky, and sticky does not stick inside
   a Canvas embed: the page is rendered at its full height and the
   parent does the scrolling, so the header sits at the top of a
   very long document and a student a thousand competencies down
   is nowhere near it. That is exactly how being stuck happens. One
   control, same corner, every page, is worth an occasional
   duplicate.

   TURNING IT OFF
   --------------
   A page that is already a hub, or that is loaded inside one of
   the in place panels, does not need it:

       <body data-back="off">

   Panel mode is detected on its own, because every page loaded in
   a panel carries ?embed=1 and the panel has its own X.

   ACCESSIBILITY
   -------------
   A real button with a real accessible name, reachable by keyboard,
   with a visible focus ring and a 44px minimum target. The arrow is
   aria-hidden so a screen reader announces the word rather than a
   character. Contrast is white on navy, 16.2:1.
   ============================================================ */
(function () {
  'use strict';
  if (window.__BIO005_BACK__) return;
  window.__BIO005_BACK__ = true;

  var HOME = 'course-start.html';

  /* Pages that are themselves a place to go back TO. Sending a student
     from the course home page back to the course home page is a button
     that appears to be broken. */
  var HUBS = ['course-start.html', 'index.html', 'physiology-course-home.html',
              'course-materials.html', 'welcome-to-physiology.html'];

  function fileName() {
    var p = location.pathname;
    var i = p.lastIndexOf('/');
    return (i < 0 ? p : p.slice(i + 1)) || 'index.html';
  }

  function skip() {
    if (/[?&]embed=/.test(location.search)) return true;      /* in a panel */
    if (document.body.getAttribute('data-back') === 'off') return true;
    if (HUBS.indexOf(fileName()) > -1) return true;
    return false;
  }

  /* Inside a frame, history.length counts the frame's own history. One
     entry means this page is the only thing that has been in the frame,
     so there is nothing to go back to and the course home is the honest
     destination. */
  function canGoBack() {
    try { return window.history.length > 1; } catch (e) { return false; }
  }

  var CSS = [
    '.b5-back{position:fixed;left:18px;bottom:18px;z-index:60;',
    '  display:inline-flex;align-items:center;gap:8px;',
    '  font-family:inherit;font-size:.85rem;font-weight:700;cursor:pointer;',
    '  min-height:44px;padding:11px 17px;border-radius:999px;',
    '  background:#0B1530;color:#fff;border:1px solid #0B1530;',
    '  box-shadow:0 8px 16px rgba(0,0,0,.18);',
    '  transition:transform 180ms ease,box-shadow 180ms ease}',
    '.b5-back:hover{transform:translateY(-2px);box-shadow:0 12px 22px rgba(0,0,0,.22);color:#fff}',
    '.b5-back:focus-visible{outline:3px solid #C9A14A;outline-offset:3px}',
    '.b5-back svg{flex:0 0 auto}',
    '@media print{.b5-back{display:none!important}}',
    '@media (prefers-reduced-motion:reduce){',
    '  .b5-back{transition:none}.b5-back:hover{transform:none}}'
  ].join('');

  var ARROW = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" ' +
    'stroke="currentColor" stroke-width="2.6" stroke-linecap="round" ' +
    'stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5"/>' +
    '<path d="M12 19l-7-7 7-7"/></svg>';

  function mount() {
    if (skip()) return;

    var st = document.createElement('style');
    st.setAttribute('data-bio005-back', '');
    st.textContent = CSS;
    document.head.appendChild(st);

    var back = canGoBack();
    var el = document.createElement(back ? 'button' : 'a');
    el.className = 'b5-back';
    if (back) {
      el.type = 'button';
      el.innerHTML = ARROW + '<span>Back</span>';
      el.setAttribute('aria-label', 'Back to the page you came from');
      el.addEventListener('click', function () { window.history.back(); });
    } else {
      el.href = HOME;
      el.target = '_top';
      el.innerHTML = ARROW + '<span>Course home</span>';
      el.setAttribute('aria-label', 'Go to the course home page');
    }
    document.body.appendChild(el);

    /* DO NOT LAND ON TOP OF SOMETHING ELSE.

       Two pages keep their own navy "Back to the schedule" button in a
       pinned sidebar, in this exact corner, and the two pills stacked.
       Ask the browser what is actually at the spot just above this
       button; if the page already put something there, step up out of
       its way. This is measured rather than hard coded, so it also
       covers any page that grows a corner control later. */
    (function () {
      for (var lift = 0; lift < 4; lift++) {
        var r = el.getBoundingClientRect();
        var under = document.elementFromPoint(r.left + r.width / 2, r.top - 8);
        if (!under || under === document.body || under === document.documentElement
            || el.contains(under) || under.contains(el)) break;
        var box = under.getBoundingClientRect();
        if (box.height > 200 || box.width > 400) break;   /* a panel, not a control */
        el.style.bottom = (18 + (lift + 1) * (box.height + 12)) + 'px';
      }
    }());

    /* Keep the last line of the page clear of the floating controls. */
    var pad = document.createElement('style');
    pad.textContent = 'body{padding-bottom:76px}';
    document.head.appendChild(pad);
  }

  /* MOUNT LATE, ON PURPOSE.

     Several pages build their own navigation from data after the document
     is parsed, so a check that runs at DOMContentLoaded sees a page with no
     Back control and adds a second one a moment before the page adds its
     own. Waiting for load, plus a beat for anything that renders from a
     data file, means the check reads the page a student actually sees. */
  function start() { setTimeout(mount, 250); }
  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start);
}());
