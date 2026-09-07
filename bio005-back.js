/* ============================================================
   BIO 005 Human Physiology, Yuba College, Fall 2026
   bio005-back.js

   THE BACK BAR. One script, every content page.

   THE PROBLEM
   -----------
   Students do not arrive at these pages from the top of the site.
   They click a link inside a Canvas assignment, land three levels
   in, finish reading, and then have nowhere obvious to go. A plain
   browser Back button is not enough: inside a Canvas iframe it can
   walk them out of the course entirely, and on a page opened in a
   fresh tab there is no history to go back to at all.

   WHAT THIS DOES
   --------------
   Works out where the student actually came from and offers the
   right way back, in this order:

     1. Came from another page on this site  -> back to that page,
        named. "Back to the lab report instructions", not "Back".
     2. Came from Canvas                     -> back to Canvas.
     3. Came from nowhere we recognize, or a
        fresh tab with no history            -> the course tools hub,
        which is the one page everything else hangs off.

   So the link always says where it goes, and it never dead-ends.

   FRAME AWARENESS
   ---------------
   Internal destinations use target="_top" so the student breaks
   out of the Canvas iframe rather than loading a course inside a
   course. Canvas destinations are left to load normally.

   ACCESSIBILITY
   -------------
   It is a real link in a <nav> with an accessible name, first in
   the tab order after the skip link, and it reads as "Back to X"
   rather than as a bare arrow. The arrow is decorative and hidden
   from screen readers.

   USAGE
   -----
   Put this one line before </body> on any content page:
     <script src="bio005-back.js"></script>
   Nothing else. It injects itself at the top of <main>, or at the
   top of <body> if there is no <main>.
   ============================================================ */
(function () {
  "use strict";

  var HUB = "course-materials.html";
  var CANVAS = "https://yccd.instructure.com/courses/42616";

  /* Pages we can name. Anything not listed still works, it just
     falls back to a generic label rather than a specific one. */
  var NAMES = {
    "course-materials.html":        "course tools",
    "course-start.html":            "course home",
    "welcome-tour.html":            "the welcome tour",
    "home.html":                    "course home",
    "syllabus-fall2026.html":       "the syllabus",
    "course-schedule.html":         "the schedule",
    "competency-study-guide.html":  "the competency list",
    "concept-videos-week01.html":   "the concept videos",
    "clinical-physiology-lab-manual.html": "the lab manual",
    "mastery-canvas.html":          "the drawing canvas",
    "lab-report-form.html":         "the lab report form",
    "lab-week08-hormone-cycle.html":  "the week 8 hormone cycle lab",
    "assignment-notesheet.html":    "the note sheet assignment",
    "assignment-physioex.html":     "the lab report instructions",
    "assignment-bookproblems.html": "the book problems",
    "assignment-discussion.html":   "the discussion"
  };

  function fileOf(url) {
    try {
      var path = new URL(url, window.location.href).pathname;
      return path.slice(path.lastIndexOf("/") + 1) || "";
    } catch (e) { return ""; }
  }

  function label(file) {
    if (NAMES[file]) { return NAMES[file]; }
    var wk = file.match(/^week-(\d{1,2})\.html$/);
    if (wk) { return "week " + parseInt(wk[1], 10); }
    return "";
  }

  /* ---------- work out the destination ---------- */
  var ref = document.referrer || "";
  var here = fileOf(window.location.href);
  var dest, text, external = false;

  var sameSite = false;
  try {
    sameSite = ref && new URL(ref).origin === window.location.origin;
  } catch (e) { sameSite = false; }

  if (sameSite) {
    var from = fileOf(ref);
    var name = label(from);
    /* Ignore a referrer that is this same page, which happens on a
       reload and would otherwise offer to send them nowhere. */
    if (from && from !== here) {
      dest = from;
      text = name ? "Back to " + name : "Back to where you were";
    }
  } else if (ref.indexOf("instructure.com") > -1) {
    dest = CANVAS;
    text = "Back to Canvas";
    external = true;
  }

  if (!dest) {
    /* No usable referrer: a fresh tab, a bookmark, a QR code, or a
       browser that strips it. The hub is always a safe landing. */
    if (here === HUB) { return; }          /* already there, no bar */
    dest = HUB;
    text = "Back to course tools";
  }

  /* ---------- build it ---------- */
  var css = document.createElement("style");
  css.textContent =
    ".b005-back{border-bottom:.5px solid rgba(11,21,48,.15);background:#fff}" +
    ".b005-back .in{max-width:1080px;margin:0 auto;padding:11px 24px}" +
    ".b005-back a{display:inline-flex;align-items:center;gap:9px;text-decoration:none;" +
      "font-family:'Plus Jakarta Sans',system-ui,sans-serif;font-size:11px;font-weight:800;" +
      "letter-spacing:.2em;text-transform:uppercase;color:#6E2D24}" +
    ".b005-back a:hover{color:#8B3A2E;text-decoration:underline}" +
    ".b005-back a:focus-visible{outline:3px solid #8B3A2E;outline-offset:3px;border-radius:3px}" +
    ".b005-back svg{flex:none}" +
    "@media print{.b005-back{display:none}}";
  document.head.appendChild(css);

  var nav = document.createElement("nav");
  nav.className = "b005-back";
  nav.setAttribute("aria-label", "Go back");

  var a = document.createElement("a");
  a.href = dest;
  if (!external) { a.target = "_top"; }
  a.innerHTML =
    '<svg width="15" height="13" viewBox="0 0 15 13" fill="none" stroke="currentColor" ' +
    'stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ' +
    'focusable="false"><path d="M14 6.5H2M7 1.5l-5 5 5 5"/></svg>';
  a.appendChild(document.createTextNode(text));

  var inner = document.createElement("div");
  inner.className = "in";
  inner.appendChild(a);
  nav.appendChild(inner);

  var main = document.querySelector("main");
  if (main) { main.parentNode.insertBefore(nav, main); }
  else { document.body.insertBefore(nav, document.body.firstChild); }
})();
