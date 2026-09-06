/* bio005-teach-pen.js
   Teaching canvas for BIO 005 slide decks. Dr. Sharilyn Rennie.

   A small floating panel you can draw on while recording. Object based, so every
   mark can be picked back up and moved. Pen, line, arrow, box, circle and text.
   Pressure sensitive where the device reports it, so a stylus behaves like a pen,
   including inside a Loom recording.

   Minimize and the panel collapses to a small square marker on that slide, so the
   slide shows a drawing belongs there. Drawings are saved in this browser only,
   under bio005- prefixed keys. Nothing is written into the deck file, so a student
   opening the deck sees no drawings, only the tool, and draws their own.

   Loads with no dependencies. Press D to open. */

(function () {
  "use strict";

  if (window.__bio005TeachPen) return;
  window.__bio005TeachPen = true;

  /* ---------- constants ---------- */

  var SPACE = 1000;                 /* logical drawing space, keeps marks proportional on resize */
  var PREFIX = "bio005-teachpen-";  /* prefixed so it cannot collide with the anatomy repo */
  var DECK = (location.pathname.split("/").pop() || "deck").replace(/\.html?$/i, "");

  var COLORS = [
    { name: "Navy", hex: "#0B1530" },
    { name: "Maroon", hex: "#8B3A2E" },
    { name: "Teal", hex: "#1F4E55" },
    { name: "Gold", hex: "#B8862B" },
    { name: "Slate", hex: "#414B5C" }
  ];
  var SIZES = [2, 3, 5, 8, 12];

  var TOOLS = [
    { id: "select", label: "Select and move", key: "V", icon: "arrow" },
    { id: "pen", label: "Pen", key: "P", icon: "pen" },
    { id: "line", label: "Line", key: "L", icon: "line" },
    { id: "arrow", label: "Arrow", key: "R", icon: "arrowhead" },
    { id: "rect", label: "Box", key: "B", icon: "rect" },
    { id: "ellipse", label: "Circle", key: "C", icon: "ellipse" },
    { id: "text", label: "Text", key: "X", icon: "text" }
  ];

  /* ---------- state ---------- */

  var state = {
    tool: "pen",
    color: COLORS[1].hex,
    size: 3,
    objects: [],        /* current slide's objects */
    slideKey: null,
    selected: -1,
    open: false
  };

  var panel, canvas, ctx, chipHost, textInput, statusEl;
  var drawing = null, dragging = null, dpr = 1;

  /* ---------- storage ---------- */

  function keyFor(idx) { return PREFIX + DECK + "-" + idx; }

  function load(idx) {
    try {
      var raw = localStorage.getItem(keyFor(idx));
      return raw ? JSON.parse(raw) : [];
    } catch (e) { return []; }
  }

  function save(idx, objs) {
    try {
      if (!objs || !objs.length) localStorage.removeItem(keyFor(idx));
      else localStorage.setItem(keyFor(idx), JSON.stringify(objs));
    } catch (e) { /* private mode, or full. Drawing still works this session. */ }
  }

  function hasDrawing(idx) {
    try { return !!localStorage.getItem(keyFor(idx)); } catch (e) { return false; }
  }

  /* ---------- slides ---------- */

  function slides() { return [].slice.call(document.querySelectorAll("section.slide, main section")); }

  function currentIndex() {
    var all = slides();
    var cur = document.querySelector(".slide.is-current");
    if (cur) { var i = all.indexOf(cur); if (i >= 0) return i; }
    /* not in present mode: whichever slide is nearest the middle of the viewport */
    var mid = window.innerHeight / 2, best = 0, bestD = Infinity;
    all.forEach(function (s, i) {
      var r = s.getBoundingClientRect();
      var d = Math.abs((r.top + r.height / 2) - mid);
      if (d < bestD) { bestD = d; best = i; }
    });
    return best;
  }

  /* ---------- style ---------- */

  function injectCSS() {
    var css = [
      '.tp-panel{position:fixed;z-index:9000;width:420px;background:#FFFFFF;border:1px solid #C9CFD8;',
      'border-radius:10px;box-shadow:0 10px 30px rgba(11,21,48,.28);display:flex;flex-direction:column;',
      'font-family:system-ui,-apple-system,"Segoe UI",sans-serif;color:#0B1530;overflow:hidden}',
      '.tp-panel[hidden]{display:none!important}',
      '.tp-bar{display:flex;align-items:center;gap:8px;padding:7px 8px;background:#8B3A2E;color:#fff;cursor:move;touch-action:none}',
      '.tp-title{font-size:12px;font-weight:700;letter-spacing:.6px;text-transform:uppercase;flex:1;',
      'white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
      '.tp-bar button{background:rgba(0,0,0,.18);color:#fff;border:0;border-radius:6px;width:30px;height:30px;',
      'font-size:15px;line-height:1;cursor:pointer;display:grid;place-items:center}',
      '.tp-bar button:hover{background:rgba(0,0,0,.34)}',
      '.tp-tools{display:flex;flex-wrap:wrap;gap:5px;padding:8px;border-bottom:1px solid #E3E7EC;background:#FAFAF9}',
      '.tp-tools button,.tp-sw{border:1px solid #C9CFD8;background:#fff;border-radius:6px;cursor:pointer;',
      'min-width:34px;height:34px;display:grid;place-items:center;padding:0 6px;font-size:12px;color:#0B1530}',
      '.tp-tools button[aria-pressed="true"]{background:#0B1530;border-color:#0B1530}',
      '.tp-tools button[aria-pressed="true"] svg{stroke:#fff;fill:none}',
      '.tp-tools svg{width:17px;height:17px;stroke:#0B1530;fill:none;stroke-width:1.9;stroke-linecap:round;stroke-linejoin:round}',
      '.tp-row{display:flex;flex-wrap:wrap;gap:5px;padding:7px 8px;border-bottom:1px solid #E3E7EC;align-items:center}',
      '.tp-sw{width:26px;height:26px;min-width:26px;border-radius:50%;padding:0}',
      '.tp-sw[aria-pressed="true"]{outline:2px solid #0B1530;outline-offset:2px}',
      '.tp-sz{width:30px;height:26px;min-width:30px}',
      '.tp-sz span{display:block;background:#0B1530;border-radius:99px}',
      '.tp-sz[aria-pressed="true"]{background:#ECEFF4;border-color:#0B1530}',
      '.tp-lab{font-size:11px;font-weight:700;letter-spacing:.5px;text-transform:uppercase;color:#414B5C;margin-right:2px}',
      '.tp-wrap{position:relative;background:#fff}',
      '.tp-canvas{display:block;width:100%;height:340px;touch-action:none;cursor:crosshair;background:#fff}',
      '.tp-panel[data-tool="select"] .tp-canvas{cursor:default}',
      '.tp-ti{position:absolute;font:600 16px system-ui,sans-serif;border:1px solid #8B3A2E;border-radius:4px;',
      'padding:2px 5px;background:#fff;color:#0B1530;min-width:120px;z-index:2}',
      '.tp-ti[hidden]{display:none}',
      '.tp-foot{display:flex;gap:6px;align-items:center;padding:7px 8px;border-top:1px solid #E3E7EC;background:#FAFAF9}',
      '.tp-foot button{border:1px solid #C9CFD8;background:#fff;border-radius:6px;height:30px;padding:0 10px;',
      'font-size:12px;font-weight:600;cursor:pointer;color:#0B1530}',
      '.tp-foot button:hover{background:#ECEFF4}',
      '.tp-status{flex:1;font-size:11px;color:#414B5C;text-align:right}',
      '.tp-grip{position:absolute;right:2px;bottom:2px;width:16px;height:16px;cursor:nwse-resize;touch-action:none;',
      'background:linear-gradient(135deg,transparent 48%,#B4BCC8 48%,#B4BCC8 62%,transparent 62%)}',
      /* the small square left on a slide */
      '.tp-chip{display:inline-grid;place-items:center;width:26px;height:26px;margin-top:14px;padding:0;',
      'border:1px solid #8B3A2E;border-radius:5px;background:#fff;cursor:pointer;vertical-align:middle}',
      '.tp-chip svg{width:14px;height:14px;stroke:#8B3A2E;fill:none;stroke-width:2;stroke-linecap:round}',
      '.tp-chip:hover{background:#F6EDED}',
      '.tp-dock{position:fixed;right:14px;bottom:14px;z-index:8999;display:flex;gap:8px}',
      '.tp-dock button{border:1px solid #C9CFD8;background:#fff;',
      'color:#0B1530;border-radius:8px;height:34px;padding:0 12px;font:600 12px system-ui,sans-serif;cursor:pointer;',
      'box-shadow:0 3px 10px rgba(11,21,48,.16)}',
      '.tp-dock button:hover{background:#ECEFF4}',
      '.tp-dock button[hidden]{display:none!important}',
      '.tp-panel :focus-visible,.tp-chip:focus-visible,.tp-open:focus-visible{outline:3px solid #B8862B;outline-offset:2px}',
      '@media print{.tp-panel,.tp-dock,.tp-chip{display:none!important}}',
      '@media (prefers-reduced-motion: reduce){.tp-panel{transition:none}}'
    ].join("");
    var s = document.createElement("style");
    s.setAttribute("data-teach-pen", "");
    s.textContent = css;
    document.head.appendChild(s);
  }

  /* ---------- icons ---------- */

  function icon(kind) {
    var p = {
      arrow: '<path d="M4 2l9 7-4 1 2.5 5-2 1-2.5-5-3 2z"/>',
      pen: '<path d="M3 14l1-3.5L11 3.5l2.5 2.5L7 13z"/><path d="M10 4.5l2.5 2.5"/>',
      line: '<path d="M3 14L14 3"/>',
      arrowhead: '<path d="M3 14L14 3"/><path d="M9 3h5v5"/>',
      rect: '<rect x="3" y="4" width="11" height="9" rx="1"/>',
      ellipse: '<ellipse cx="8.5" cy="8.5" rx="6" ry="4.6"/>',
      text: '<path d="M3 4h11"/><path d="M8.5 4v10"/>',
      mark: '<path d="M3 11l3-5 3 3 2-3 2 5"/>'
    }[kind] || "";
    return '<svg viewBox="0 0 17 17" aria-hidden="true" focusable="false">' + p + "</svg>";
  }

  /* ---------- geometry ---------- */

  function toLogical(e) {
    var r = canvas.getBoundingClientRect();
    return {
      x: ((e.clientX - r.left) / r.width) * SPACE,
      y: ((e.clientY - r.top) / r.height) * SPACE
    };
  }

  function bounds(o) {
    if (o.type === "pen") {
      var xs = o.pts.map(function (p) { return p.x; }), ys = o.pts.map(function (p) { return p.y; });
      return { x1: Math.min.apply(null, xs), y1: Math.min.apply(null, ys), x2: Math.max.apply(null, xs), y2: Math.max.apply(null, ys) };
    }
    if (o.type === "text") return { x1: o.x - 4, y1: o.y - 22, x2: o.x + (o.text.length * 9) + 4, y2: o.y + 8 };
    return { x1: Math.min(o.x1, o.x2), y1: Math.min(o.y1, o.y2), x2: Math.max(o.x1, o.x2), y2: Math.max(o.y1, o.y2) };
  }

  function hit(o, p) {
    var b = bounds(o), pad = 14;
    return p.x >= b.x1 - pad && p.x <= b.x2 + pad && p.y >= b.y1 - pad && p.y <= b.y2 + pad;
  }

  function move(o, dx, dy) {
    if (o.type === "pen") { o.pts.forEach(function (q) { q.x += dx; q.y += dy; }); }
    else if (o.type === "text") { o.x += dx; o.y += dy; }
    else { o.x1 += dx; o.x2 += dx; o.y1 += dy; o.y2 += dy; }
  }

  /* ---------- rendering ---------- */

  function sizeCanvas() {
    var r = canvas.getBoundingClientRect();
    dpr = window.devicePixelRatio || 1;
    canvas.width = Math.max(1, Math.round(r.width * dpr));
    canvas.height = Math.max(1, Math.round(r.height * dpr));
    render();
  }

  function sx(v) { return (v / SPACE) * canvas.width; }
  function sy(v) { return (v / SPACE) * canvas.height; }
  function sw(v) { return (v / SPACE) * canvas.width; }

  function drawObj(o, isSel) {
    ctx.strokeStyle = o.color;
    ctx.fillStyle = o.color;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (o.type === "pen") {
      for (var i = 1; i < o.pts.length; i++) {
        ctx.beginPath();
        ctx.lineWidth = Math.max(1, sw(o.pts[i].w));
        ctx.moveTo(sx(o.pts[i - 1].x), sy(o.pts[i - 1].y));
        ctx.lineTo(sx(o.pts[i].x), sy(o.pts[i].y));
        ctx.stroke();
      }
      if (o.pts.length === 1) {
        ctx.beginPath();
        ctx.arc(sx(o.pts[0].x), sy(o.pts[0].y), Math.max(1, sw(o.pts[0].w) / 2), 0, 6.284);
        ctx.fill();
      }
    } else if (o.type === "line" || o.type === "arrow") {
      ctx.lineWidth = Math.max(1, sw(o.w));
      ctx.beginPath();
      ctx.moveTo(sx(o.x1), sy(o.y1));
      ctx.lineTo(sx(o.x2), sy(o.y2));
      ctx.stroke();
      if (o.type === "arrow") {
        var a = Math.atan2(sy(o.y2) - sy(o.y1), sx(o.x2) - sx(o.x1));
        var h = Math.max(8, sw(o.w) * 3.4);
        ctx.beginPath();
        ctx.moveTo(sx(o.x2), sy(o.y2));
        ctx.lineTo(sx(o.x2) - h * Math.cos(a - 0.42), sy(o.y2) - h * Math.sin(a - 0.42));
        ctx.lineTo(sx(o.x2) - h * Math.cos(a + 0.42), sy(o.y2) - h * Math.sin(a + 0.42));
        ctx.closePath();
        ctx.fill();
      }
    } else if (o.type === "rect") {
      ctx.lineWidth = Math.max(1, sw(o.w));
      ctx.strokeRect(sx(Math.min(o.x1, o.x2)), sy(Math.min(o.y1, o.y2)),
        sx(Math.abs(o.x2 - o.x1)), sy(Math.abs(o.y2 - o.y1)));
    } else if (o.type === "ellipse") {
      ctx.lineWidth = Math.max(1, sw(o.w));
      ctx.beginPath();
      ctx.ellipse(sx((o.x1 + o.x2) / 2), sy((o.y1 + o.y2) / 2),
        Math.abs(sx(o.x2 - o.x1)) / 2, Math.abs(sy(o.y2 - o.y1)) / 2, 0, 0, 6.284);
      ctx.stroke();
    } else if (o.type === "text") {
      var fs = Math.max(10, sw(o.w * 5));
      ctx.font = "600 " + fs + "px system-ui, sans-serif";
      ctx.textBaseline = "alphabetic";
      ctx.fillText(o.text, sx(o.x), sy(o.y));
    }

    if (isSel) {
      var b = bounds(o);
      ctx.save();
      ctx.strokeStyle = "#B8862B";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([5, 4]);
      ctx.strokeRect(sx(b.x1) - 5, sy(b.y1) - 5, sx(b.x2 - b.x1) + 10, sy(b.y2 - b.y1) + 10);
      ctx.restore();
    }
  }

  function render() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    state.objects.forEach(function (o, i) { drawObj(o, i === state.selected); });
    if (drawing) drawObj(drawing, false);
    if (statusEl) {
      statusEl.textContent = state.objects.length
        ? state.objects.length + (state.objects.length === 1 ? " mark" : " marks")
        : "Empty";
    }
  }

  /* ---------- pointer ---------- */

  function widthFor(e) {
    var base = state.size;
    if (e.pointerType === "pen" && typeof e.pressure === "number" && e.pressure > 0) {
      return base * (0.45 + e.pressure * 1.25);
    }
    return base;
  }

  function onDown(e) {
    if (e.button != null && e.button !== 0 && e.pointerType === "mouse") return;
    canvas.setPointerCapture && canvas.setPointerCapture(e.pointerId);
    var p = toLogical(e);

    if (state.tool === "select") {
      state.selected = -1;
      for (var i = state.objects.length - 1; i >= 0; i--) {
        if (hit(state.objects[i], p)) { state.selected = i; break; }
      }
      if (state.selected >= 0) dragging = { last: p };
      render();
      return;
    }

    if (state.tool === "text") {
      openTextInput(p, e);
      return;
    }

    if (state.tool === "pen") {
      drawing = { type: "pen", color: state.color, pts: [{ x: p.x, y: p.y, w: widthFor(e) }] };
    } else {
      drawing = { type: state.tool, color: state.color, w: state.size, x1: p.x, y1: p.y, x2: p.x, y2: p.y };
    }
    render();
  }

  function onMove(e) {
    var p = toLogical(e);
    if (dragging && state.selected >= 0) {
      move(state.objects[state.selected], p.x - dragging.last.x, p.y - dragging.last.y);
      dragging.last = p;
      render();
      return;
    }
    if (!drawing) return;
    if (drawing.type === "pen") drawing.pts.push({ x: p.x, y: p.y, w: widthFor(e) });
    else { drawing.x2 = p.x; drawing.y2 = p.y; }
    render();
  }

  function onUp() {
    if (dragging) { dragging = null; commit(); return; }
    if (!drawing) return;
    var d = drawing; drawing = null;
    var b = bounds(d);
    var tiny = (b.x2 - b.x1) < 3 && (b.y2 - b.y1) < 3;
    if (d.type !== "pen" && tiny) { render(); return; }
    state.objects.push(d);
    commit();
  }

  /* ---------- text ---------- */

  function openTextInput(p, e) {
    var r = canvas.getBoundingClientRect();
    textInput.hidden = false;
    textInput.value = "";
    textInput.style.left = (e.clientX - r.left) + "px";
    textInput.style.top = (e.clientY - r.top - 18) + "px";
    textInput.style.color = state.color;
    textInput.dataset.x = p.x;
    textInput.dataset.y = p.y;
    setTimeout(function () { textInput.focus(); }, 0);
  }

  function commitText() {
    if (textInput.hidden) return;
    var v = textInput.value.trim();
    textInput.hidden = true;
    if (!v) return;
    state.objects.push({
      type: "text", color: state.color, w: state.size,
      x: +textInput.dataset.x, y: +textInput.dataset.y, text: v
    });
    commit();
  }

  /* ---------- persistence and chips ---------- */

  function commit() {
    save(state.slideKey, state.objects);
    refreshChip(state.slideKey);
    render();
  }

  function chipFor(idx) {
    var all = slides();
    var s = all[idx];
    if (!s) return null;
    return s.querySelector(".tp-chip");
  }

  function refreshChip(idx) {
    var all = slides(), s = all[idx];
    if (!s) return;
    var existing = s.querySelector(".tp-chip");
    if (hasDrawing(idx)) {
      if (!existing) {
        var b = document.createElement("button");
        b.className = "tp-chip";
        b.type = "button";
        b.innerHTML = icon("mark");
        b.setAttribute("aria-label", "A drawing belongs on this slide. Open the teaching canvas to draw your own.");
        b.title = "Drawing on this slide. Click to open the canvas.";
        b.addEventListener("click", function () { openPanel(idx); });
        s.appendChild(b);
      }
    } else if (existing) {
      existing.remove();
    }
  }

  function refreshAllChips() {
    slides().forEach(function (s, i) { refreshChip(i); });
  }

  /* ---------- reset the reveal cards ---------- */

  /* Clears every opened and seen reveal card across the whole deck, so nothing
     reads OPENED on camera. Drawings are untouched. */
  function resetReveals() {
    try { if (window.__zoomOpen && window.__zoomOpen()) window.__zoomClose(true); } catch (e) {}
    var n = 0;
    [].forEach.call(document.querySelectorAll(".rv"), function (el) {
      if (el.classList.contains("seen") || el.classList.contains("open")) n++;
      el.classList.remove("seen", "open");
      el.setAttribute("aria-expanded", "false");
    });
    [].forEach.call(document.querySelectorAll(".slide"), function (s) {
      s.classList.remove("has-open");
    });
    var btn = document.querySelector(".tp-reset");
    if (btn) {
      btn.textContent = n ? "Reset, " + n + " closed" : "All closed";
      setTimeout(function () { btn.textContent = "Reset cards"; }, 1800);
    }
    return n;
  }
  window.__bio005ResetReveals = resetReveals;

  /* ---------- panel ---------- */

  function loadSlide(idx) {
    commitText();
    state.slideKey = idx;
    state.objects = load(idx);
    state.selected = -1;
    var t = panel.querySelector(".tp-title");
    if (t) t.textContent = "Teaching canvas . slide " + (idx + 1);
    render();
  }

  function openPanel(idx) {
    if (typeof idx !== "number") idx = currentIndex();
    panel.hidden = false;
    state.open = true;
    document.querySelector(".tp-open").hidden = true;
    loadSlide(idx);
    sizeCanvas();
  }

  function closePanel() {
    commitText();
    panel.hidden = true;
    state.open = false;
    document.querySelector(".tp-open").hidden = false;
    refreshAllChips();
  }

  function build() {
    panel = document.createElement("section");
    panel.className = "tp-panel";
    panel.hidden = true;
    panel.setAttribute("aria-label", "Teaching canvas");
    panel.dataset.tool = state.tool;
    panel.style.right = "16px";
    panel.style.bottom = "16px";

    var bar = document.createElement("div");
    bar.className = "tp-bar";
    bar.innerHTML = '<span class="tp-title">Teaching canvas</span>';
    var mini = document.createElement("button");
    mini.type = "button";
    mini.innerHTML = "&minus;";
    mini.setAttribute("aria-label", "Minimize the canvas and leave a marker on this slide");
    mini.addEventListener("click", closePanel);
    bar.appendChild(mini);
    panel.appendChild(bar);

    /* tools */
    var tools = document.createElement("div");
    tools.className = "tp-tools";
    tools.setAttribute("role", "group");
    tools.setAttribute("aria-label", "Drawing tools");
    TOOLS.forEach(function (t) {
      var b = document.createElement("button");
      b.type = "button";
      b.dataset.tool = t.id;
      b.innerHTML = icon(t.icon);
      b.setAttribute("aria-label", t.label + ", shortcut " + t.key);
      b.title = t.label + " (" + t.key + ")";
      b.setAttribute("aria-pressed", String(t.id === state.tool));
      b.addEventListener("click", function () { setTool(t.id); });
      tools.appendChild(b);
    });
    panel.appendChild(tools);

    /* colors and sizes */
    var row = document.createElement("div");
    row.className = "tp-row";
    var cl = document.createElement("span"); cl.className = "tp-lab"; cl.textContent = "Color"; row.appendChild(cl);
    COLORS.forEach(function (c) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "tp-sw";
      b.style.background = c.hex;
      b.setAttribute("aria-label", c.name);
      b.title = c.name;
      b.setAttribute("aria-pressed", String(c.hex === state.color));
      b.addEventListener("click", function () {
        state.color = c.hex;
        [].forEach.call(row.querySelectorAll(".tp-sw"), function (x) {
          x.setAttribute("aria-pressed", String(x.style.background === b.style.background));
        });
        if (state.selected >= 0) { state.objects[state.selected].color = c.hex; commit(); }
      });
      row.appendChild(b);
    });
    var sl = document.createElement("span"); sl.className = "tp-lab"; sl.style.marginLeft = "6px"; sl.textContent = "Size"; row.appendChild(sl);
    SIZES.forEach(function (n) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "tp-sz";
      b.innerHTML = '<span style="width:16px;height:' + Math.max(2, Math.round(n * 0.9)) + 'px"></span>';
      b.setAttribute("aria-label", "Pen size " + n);
      b.title = "Size " + n;
      b.setAttribute("aria-pressed", String(n === state.size));
      b.addEventListener("click", function () {
        state.size = n;
        [].forEach.call(row.querySelectorAll(".tp-sz"), function (x) { x.setAttribute("aria-pressed", "false"); });
        b.setAttribute("aria-pressed", "true");
      });
      row.appendChild(b);
    });
    panel.appendChild(row);

    /* canvas */
    var wrap = document.createElement("div");
    wrap.className = "tp-wrap";
    canvas = document.createElement("canvas");
    canvas.className = "tp-canvas";
    canvas.setAttribute("role", "img");
    canvas.setAttribute("aria-label", "Drawing area. This canvas is a teaching aid, not course content.");
    wrap.appendChild(canvas);
    textInput = document.createElement("input");
    textInput.className = "tp-ti";
    textInput.hidden = true;
    textInput.setAttribute("aria-label", "Type the label, then press Enter");
    wrap.appendChild(textInput);
    var grip = document.createElement("div");
    grip.className = "tp-grip";
    wrap.appendChild(grip);
    panel.appendChild(wrap);

    /* footer */
    var foot = document.createElement("div");
    foot.className = "tp-foot";
    foot.appendChild(mkBtn("Undo", "Undo the last mark", function () {
      commitText();
      state.objects.pop();
      state.selected = -1;
      commit();
    }));
    foot.appendChild(mkBtn("Delete", "Delete the selected mark", function () {
      if (state.selected >= 0) { state.objects.splice(state.selected, 1); state.selected = -1; commit(); }
    }));
    foot.appendChild(mkBtn("Clear", "Clear this slide's drawing", function () {
      if (!state.objects.length) return;
      if (!window.confirm("Clear the drawing on this slide?")) return;
      state.objects = [];
      state.selected = -1;
      commit();
    }));
    statusEl = document.createElement("span");
    statusEl.className = "tp-status";
    statusEl.setAttribute("aria-live", "polite");
    foot.appendChild(statusEl);
    panel.appendChild(foot);

    document.body.appendChild(panel);

    /* the dock: open the canvas, and reset the reveal cards before recording */
    var dock = document.createElement("div");
    dock.className = "tp-dock";

    var reset = document.createElement("button");
    reset.type = "button";
    reset.className = "tp-reset";
    reset.textContent = "Reset cards";
    reset.setAttribute("aria-label", "Close every opened reveal card in this deck, so none read opened while you record");
    reset.title = "Close every opened card in the deck. Drawings are not affected.";
    reset.addEventListener("click", resetReveals);
    dock.appendChild(reset);

    var open = document.createElement("button");
    open.type = "button";
    open.className = "tp-open";
    open.textContent = "Canvas (D)";
    open.setAttribute("aria-label", "Open the teaching canvas for this slide, shortcut D");
    open.addEventListener("click", function () { openPanel(); });
    dock.appendChild(open);

    document.body.appendChild(dock);

    ctx = canvas.getContext("2d");

    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    canvas.addEventListener("pointerleave", function () { if (drawing) onUp(); });

    textInput.addEventListener("keydown", function (e) {
      e.stopPropagation();
      if (e.key === "Enter") { e.preventDefault(); commitText(); }
      else if (e.key === "Escape") { e.preventDefault(); textInput.hidden = true; }
    });
    textInput.addEventListener("blur", commitText);

    dragBar(bar);
    resizeGrip(grip);
    window.addEventListener("resize", function () { if (state.open) sizeCanvas(); });
  }

  function mkBtn(label, aria, fn) {
    var b = document.createElement("button");
    b.type = "button";
    b.textContent = label;
    b.setAttribute("aria-label", aria);
    b.addEventListener("click", fn);
    return b;
  }

  function setTool(id) {
    commitText();
    state.tool = id;
    panel.dataset.tool = id;
    [].forEach.call(panel.querySelectorAll(".tp-tools button"), function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.tool === id));
    });
    if (id !== "select") { state.selected = -1; render(); }
  }

  /* ---------- panel drag and resize ---------- */

  function dragBar(bar) {
    var st = null;
    bar.addEventListener("pointerdown", function (e) {
      if (e.target.closest("button")) return;
      var r = panel.getBoundingClientRect();
      st = { dx: e.clientX - r.left, dy: e.clientY - r.top };
      panel.style.left = r.left + "px";
      panel.style.top = r.top + "px";
      panel.style.right = "auto";
      panel.style.bottom = "auto";
      bar.setPointerCapture(e.pointerId);
    });
    bar.addEventListener("pointermove", function (e) {
      if (!st) return;
      panel.style.left = Math.max(0, Math.min(window.innerWidth - 80, e.clientX - st.dx)) + "px";
      panel.style.top = Math.max(0, Math.min(window.innerHeight - 40, e.clientY - st.dy)) + "px";
    });
    bar.addEventListener("pointerup", function () { st = null; });
    bar.addEventListener("pointercancel", function () { st = null; });
  }

  function resizeGrip(grip) {
    var st = null;
    grip.addEventListener("pointerdown", function (e) {
      e.preventDefault();
      var r = panel.getBoundingClientRect();
      var c = canvas.getBoundingClientRect();
      st = { x: e.clientX, y: e.clientY, w: r.width, h: c.height };
      grip.setPointerCapture(e.pointerId);
    });
    grip.addEventListener("pointermove", function (e) {
      if (!st) return;
      panel.style.width = Math.max(300, Math.min(900, st.w + (e.clientX - st.x))) + "px";
      canvas.style.height = Math.max(220, Math.min(700, st.h + (e.clientY - st.y))) + "px";
      sizeCanvas();
    });
    grip.addEventListener("pointerup", function () { st = null; sizeCanvas(); });
  }

  /* ---------- keyboard ---------- */

  function typing(e) {
    var t = e.target;
    if (!t) return false;
    var tag = (t.tagName || "").toLowerCase();
    return tag === "input" || tag === "textarea" || t.isContentEditable;
  }

  document.addEventListener("keydown", function (e) {
    if (typing(e) || e.metaKey || e.ctrlKey || e.altKey) return;

    if (e.key === "d" || e.key === "D") {
      e.preventDefault();
      e.stopPropagation();
      if (state.open) closePanel(); else openPanel();
      return;
    }
    if (!state.open) return;

    var t = TOOLS.filter(function (x) { return x.key.toLowerCase() === e.key.toLowerCase(); })[0];
    if (t) { e.preventDefault(); e.stopPropagation(); setTool(t.id); return; }

    if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); closePanel(); return; }

    if ((e.key === "Delete" || e.key === "Backspace") && state.selected >= 0) {
      e.preventDefault();
      e.stopPropagation();
      state.objects.splice(state.selected, 1);
      state.selected = -1;
      commit();
    }
  }, true);

  /* follow the deck when the slide changes in Present mode */
  function watchSlides() {
    var last = -1;
    setInterval(function () {
      if (!state.open) return;
      var i = currentIndex();
      if (i !== last && i !== state.slideKey) { last = i; loadSlide(i); }
    }, 400);
  }

  /* ---------- start ---------- */

  function init() {
    injectCSS();
    build();
    refreshAllChips();
    watchSlides();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
