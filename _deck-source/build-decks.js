/* BIO 005 slide deck generator.
   Reads content/<id>.js, emits out/<id>.html as one self contained file.
   Engine CSS and JS come from the existing Introduction to Physiology deck
   so every deck behaves identically. Fonts are inlined, no external requests.
   Dr. Sharilyn Rennie */

const fs = require("fs");
const path = require("path");

const HERE = __dirname;
const COMP = JSON.parse(fs.readFileSync(path.join(HERE, "comp.json"), "utf8"));
const REF_CSS = fs.readFileSync(path.join(HERE, "engine", "ref.css"), "utf8");
const REF_JS  = fs.readFileSync(path.join(HERE, "engine", "ref.js"), "utf8");
const FONTS   = fs.readFileSync(path.join(HERE, "engine", "fonts.css"), "utf8");

/* ---------- helpers ---------- */
const esc = s => String(s == null ? "" : s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/* Inline markup allowed in prose: **bold** becomes <b>. Nothing else. */
function rich(s){
  return esc(s).replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>");
}

const HOUSE = [
  [/—/g, ","],            // em dash, banned
  [/–/g, " to "],          // en dash, banned
  [/[""]/g, '"'],
  [/['']/g, "'"],
  [/→/g, " to "],
  [/°/g, " "]
];
function house(s){
  let t = String(s == null ? "" : s);
  HOUSE.forEach(([re, to]) => { t = t.replace(re, to); });
  return t;
}

/* ---------- fragments ---------- */
function covers(ids, week){
  if (!ids || !ids.length) return "";
  const links = ids.map(id => {
    const c = COMP[id];
    if (!c) throw new Error("unknown competency id: " + id);
    return `<a href="competency-study-guide.html#c-${id}" target="_top">${c.n}. ${esc(c.name)}</a>`;
  }).join(" ");
  return `\n      <p class="covers-line"><span class="cv-l">On the course list</span> ${links}</p>`;
}

function labnote(t){
  if (!t) return "";
  return `\n      <p class="labnote"><span class="lb">You will do this in lab</span> ${rich(house(t))}</p>`;
}

function terms(list){
  if (!list || !list.length) return "";
  const items = list.map(t => {
    const cls = typeof t === "string" ? "" : (t.c ? " " + t.c : "");
    const txt = typeof t === "string" ? t : t.t;
    return `<span class="term${cls}">${rich(house(txt))}</span>`;
  }).join("");
  return `\n      <p class="terms">${items}</p>`;
}

function paras(list, cls){
  if (!list || !list.length) return "";
  return list.map(p => `\n      <p class="${cls || "lede"}">${rich(house(p))}</p>`).join("");
}

function bigline(s, variant){
  if (!s) return "";
  return `\n      <p class="bigline${variant ? " " + variant : ""}">${rich(house(s))}</p>`;
}

function head(sl){
  let h = "";
  if (sl.kicker) h += `\n      <p class="kicker">${rich(house(sl.kicker))}</p>`;
  if (sl.h) h += `\n      <h2 class="stitle">${rich(house(sl.h))}</h2>`;
  if (sl.lede) h += `\n      <p class="lede">${rich(house(sl.lede))}</p>`;
  return h;
}

function cardHTML(c){
  const cls = "card" + (c.dark ? " darkpanel" : "");
  let s = `\n        <div class="${c.dark ? "darkpanel" : "card"}">`;
  if (c.label) s += `\n          <p class="label${c.labelClass ? " " + c.labelClass : ""}">${rich(house(c.label))}</p>`;
  if (c.big) s += `\n          <p class="big">${rich(house(c.big))}</p>`;
  if (c.h) s += `\n          <h3>${rich(house(c.h))}</h3>`;
  (Array.isArray(c.p) ? c.p : (c.p ? [c.p] : [])).forEach(p => {
    s += `\n          <p>${rich(house(p))}</p>`;
  });
  if (c.list && c.list.length){
    s += `\n          <ul class="plain">` + c.list.map(li => `<li>${rich(house(li))}</li>`).join("") + `</ul>`;
  }
  if (c.note) s += `\n          <p class="srcnote">${rich(house(c.note))}</p>`;
  s += `\n        </div>`;
  return s;
}

function qrblock(q){
  if (!q) return "";
  let s = `\n      <div class="qrblock">`;
  s += `\n        <div class="qrcode">\n` + q.svg.trim().split("\n").map(l => "          " + l).join("\n") + `\n        </div>`;
  s += `\n        <div class="qrtext">`;
  if (q.h) s += `\n          <p class="qrh">${rich(house(q.h))}</p>`;
  (q.p || []).forEach(t => { s += `\n          <p>${rich(house(t))}</p>`; });
  s += `\n        </div>\n      </div>`;
  return s;
}

/* ---------- slide kinds ---------- */
const KIND = {

  title(sl){
    return head(sl) + terms(sl.terms) + qrblock(sl.qr) + bigline(sl.big, "");
  },

  text(sl){
    return head(sl) + paras(sl.body, "lede") + (sl.list ? list(sl.list) : "") + bigline(sl.big, sl.bigVariant);
  },

  cards(sl){
    const cols = sl.cols || 3;
    let s = head(sl);
    s += `\n      <div class="grid${cols}">` + sl.cards.map(cardHTML).join("") + `\n      </div>`;
    s += bigline(sl.big, sl.bigVariant);
    return s;
  },

  rows(sl){
    let s = head(sl);
    s += `\n      <div class="rows">`;
    sl.rows.forEach(r => {
      s += `\n        <div class="row">`;
      s += `\n          <span class="dot${r.dotClass ? " " + r.dotClass : ""}" aria-hidden="true">${esc(house(r.dot || ""))}</span>`;
      s += `\n          <div>`;
      if (r.h) s += `\n            <h3>${rich(house(r.h))}</h3>`;
      (Array.isArray(r.p) ? r.p : (r.p ? [r.p] : [])).forEach(p => {
        s += `\n            <p>${rich(house(p))}</p>`;
      });
      if (r.list && r.list.length){
        s += `\n            <ul class="plain">` + r.list.map(li => `<li>${rich(house(li))}</li>`).join("") + `</ul>`;
      }
      s += `\n          </div>\n        </div>`;
    });
    s += `\n      </div>`;
    s += bigline(sl.big, sl.bigVariant);
    return s;
  },

  fig(sl){
    let s = head(sl);
    s += `\n      <figure class="fig">\n${sl.svg.trim().split("\n").map(l => "        " + l).join("\n")}`;
    if (sl.cap) s += `\n        <figcaption>${rich(house(sl.cap))}</figcaption>`;
    s += `\n      </figure>`;
    s += bigline(sl.big, sl.bigVariant);
    return s;
  },

  formula(sl){
    let s = head(sl);
    s += `\n      <div class="formula">\n        <p class="eq">${rich(house(sl.eq))}</p>`;
    if (sl.note) s += `\n        <p class="note">${rich(house(sl.note))}</p>`;
    s += `\n      </div>`;
    if (sl.after) s += paras(sl.after, "lede");
    s += bigline(sl.big, sl.bigVariant);
    return s;
  },

  work(sl){
    let s = head(sl);
    if (sl.badges) s += badges(sl.badges);
    s += `\n      <div class="work">`;
    if (sl.given) s += `\n        <p class="kw">${rich(house(sl.given))}</p>`;
    s += `\n        <ol>` + sl.steps.map(x => `\n          <li>${rich(house(x))}</li>`).join("") + `\n        </ol>`;
    if (sl.ans) s += `\n        <p class="ans">${rich(house(sl.ans))}</p>`;
    s += `\n      </div>`;
    s += bigline(sl.big, sl.bigVariant);
    return s;
  },

  table(sl){
    let s = head(sl);
    s += `\n      <div class="tablewrap" tabindex="0" role="group" aria-label="${esc(house(sl.caption || sl.h || "Comparison table"))}">`;
    s += `\n        <table class="cmp">`;
    if (sl.caption){
      const long = house(sl.caption).length > 46;
      s += `\n          <caption${long ? ' class="long"' : ''}>${esc(house(sl.caption))}</caption>`;
    }
    s += `\n          <thead><tr>` + sl.cols.map(c => `<th scope="col">${rich(house(c))}</th>`).join("") + `</tr></thead>`;
    s += `\n          <tbody>`;
    sl.rows.forEach(r => {
      s += `\n            <tr><th scope="row">${rich(house(r[0]))}</th>` +
           r.slice(1).map(c => `<td>${rich(house(c))}</td>`).join("") + `</tr>`;
    });
    s += `\n          </tbody>\n        </table>\n      </div>`;
    s += bigline(sl.big, sl.bigVariant);
    return s;
  },

  hook(sl){
    let s = head(sl);
    const hk = sl.hook;
    s += `\n      <div class="hook">`;
    s += `\n        <span class="hicon${hk.iconClass ? " " + hk.iconClass : ""}" aria-hidden="true">${esc(house(hk.icon || "?"))}</span>`;
    s += `\n        <div>`;
    if (hk.label) s += `\n          <p class="label${hk.labelClass ? " " + hk.labelClass : ""}">${rich(house(hk.label))}</p>`;
    if (hk.h) s += `\n          <h3>${rich(house(hk.h))}</h3>`;
    if (hk.say) s += `\n          <p class="say">${rich(house(hk.say))}</p>`;
    (hk.p || []).forEach(p => { s += `\n          <p>${rich(house(p))}</p>`; });
    s += `\n        </div>\n      </div>`;
    s += bigline(sl.big, sl.bigVariant);
    return s;
  },

  activity(sl){
    let s = "";
    if (sl.badges) s += badges(sl.badges);
    s += head(sl);
    if (sl.list) s += `\n      <div class="card checkcard">` +
      (sl.listLabel ? `\n        <p class="label">${rich(house(sl.listLabel))}</p>` : "") +
      `\n        <ul>` + sl.list.map(x => `<li>${rich(house(x))}</li>`).join("") + `</ul>\n      </div>`;
    s += bigline(sl.big, sl.bigVariant);
    return s;
  },

  close(sl){
    let s = head(sl);
    if (sl.list) s += list(sl.list);
    s += bigline(sl.big, sl.bigVariant);
    return s;
  }
};

function list(items){
  return `\n      <ul class="plain">` + items.map(x => `<li>${rich(house(x))}</li>`).join("") + `</ul>`;
}
function badges(list){
  return `\n      <p class="badges">` + list.map(b => {
    const cls = typeof b === "string" ? "" : (b.cls ? " " + b.cls : "");
    const t = typeof b === "string" ? b : b.t;
    return `<span class="badge${cls}">${esc(house(t))}</span>`;
  }).join("") + `</p>`;
}

/* ---------- extra CSS this generation adds ---------- */
const ADD_CSS = `
/* QR block on a title slide, so a student can open the deck on a phone or tablet */
.qrblock{display:flex;gap:18px;align-items:center;margin-top:22px;background:#FFFFFF;
  border:1px solid var(--rule);border-radius:10px;box-shadow:0 1px 3px rgba(0,0,0,.08);
  padding:16px 18px;max-width:34em}
.qrcode{flex:0 0 auto;width:104px;height:104px;display:grid;place-items:center}
.qrcode svg{width:104px;height:104px;display:block}
.qrtext{min-width:0}
.qrtext p{margin:0 0 4px;font-size:14px;line-height:1.6;color:var(--muted)}
.qrtext p:last-child{margin-bottom:0}
.qrtext .qrh{font-weight:700;color:var(--navy);font-size:15px}
.slide.dark .qrblock{background:#101A2E;border-color:var(--navy-line)}
.slide.dark .qrtext p{color:var(--light)}
.slide.dark .qrtext .qrh{color:#FFFFFF}
@media (max-width:520px){.qrblock{flex-direction:column;align-items:flex-start}}
/* a table caption written as a sentence rather than a short label */
.cmp caption.long{text-transform:none;letter-spacing:normal;font-size:14.5px;font-weight:400;
  color:var(--muted);line-height:1.65;max-width:64em;padding-bottom:14px}
.slide.dark .cmp caption.long{color:var(--light)}

/* competency line, matching week-01.html */
.covers-line{font-family:var(--font);font-size:12.5px;line-height:1.9;margin:18px 0 0;padding-top:14px;border-top:1px solid var(--rule)}
.covers-line .cv-l{display:block;font-size:10px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:var(--terra);margin-bottom:5px}
.covers-line a{display:inline-block;color:var(--navy);text-decoration:none;font-weight:600;border-bottom:1px solid var(--rule);padding:1px 0;margin:0 12px 3px 0}
.covers-line a:hover{border-color:var(--terra);background:var(--offwhite)}
.slide.dark .covers-line{border-top-color:var(--navy-line)}
.slide.dark .covers-line .cv-l{color:var(--gold)}
.slide.dark .covers-line a{color:var(--white);border-bottom-color:var(--navy-line)}
.slide.terra .covers-line{border-top-color:#A83A3A}
.slide.terra .covers-line .cv-l{color:var(--gold-lite)}
.slide.terra .covers-line a{color:var(--white);border-bottom-color:#A83A3A}

/* lab annotation */
.labnote{background:var(--navy-tint);border:1px solid var(--rule);border-left:4px solid var(--gold);border-radius:var(--radius);
  padding:14px 16px;margin:18px 0 0;font-size:14px;color:var(--muted);line-height:1.7}
.labnote .lb{display:block;font-size:10px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:#5A4511;margin-bottom:5px}
.labnote b{color:var(--navy)}
.slide.dark .labnote{background:var(--navy-chip);border-color:var(--navy-line);border-left-color:var(--gold);color:var(--light)}
.slide.dark .labnote .lb{color:var(--gold)}
.slide.dark .labnote b{color:var(--white)}
.slide.terra .labnote{background:var(--terra-dark);border-color:#A83A3A;border-left-color:var(--gold);color:var(--onred)}
.slide.terra .labnote .lb{color:var(--gold-lite)}
.slide.terra .labnote b{color:var(--white)}

/* brand mark in the deck header */
.site-header .wrap.top{align-items:flex-start}
.brandmark{display:flex;align-items:center;gap:12px;text-decoration:none;color:inherit;margin:0 0 16px}
.brandmark svg{width:34px;height:40px;flex:0 0 auto}
.brandmark .bt{display:flex;flex-direction:column;line-height:1.15}
.brandmark .b1{font-size:14px;font-weight:800;color:var(--white)}
.brandmark .b2{font-size:11px;font-weight:600;color:var(--gold-lite);letter-spacing:.06em}

.noscript-note{max-width:1060px;margin:0 auto;padding:20px;background:var(--gold-lite);color:var(--navy);
  border:1px solid var(--gold);border-radius:var(--radius);font-size:15px;line-height:1.7}
.noscript-note b{font-weight:800}

@media print{
  .covers-line a{border:none;padding:0;margin:0 10pt 0 0;color:#414B5C;text-decoration:none}
  .labnote{background:#fff;border:1px solid #999;border-left:4px solid #6B5214;color:#000}
  .brandmark{display:none}
  .page-footer{background:#fff;color:#000;border-top:1px solid #999}
  .page-footer b,.page-footer p{color:#000}
}
`;

const LOGO = `<svg viewBox="40 10 125 148" role="img" aria-hidden="true" focusable="false"><g transform="translate(0, 18)"><g transform="translate(60, 0) rotate(8 0 130)"><circle cx="0" cy="20" r="10" fill="#FFFFFF"/><path d="M 0,32 C -10,32 -16,36 -16,42 C -16,55 -13,68 -11,82 C -10,100 -12,118 -14,130 L 14,130 C 12,118 10,100 11,82 C 13,68 16,55 16,42 C 16,36 10,32 0,32 Z" fill="#FFFFFF"/></g><g transform="translate(100, 0)"><circle cx="0" cy="10" r="11" fill="#FBEBC8"/><path d="M 0,22 C -11,22 -17,26 -17,34 C -17,52 -14,70 -12,86 C -11,108 -13,122 -15,132 L 15,132 C 13,122 11,108 12,86 C 14,70 17,52 17,34 C 17,26 11,22 0,22 Z" fill="#FBEBC8"/></g><g transform="translate(140, 0) rotate(-8 0 130)"><circle cx="0" cy="20" r="10" fill="#C9A14A"/><path d="M 0,32 C -10,32 -16,36 -16,42 C -16,55 -13,68 -11,82 C -10,100 -12,118 -14,130 L 14,130 C 12,118 10,100 11,82 C 13,68 16,55 16,42 C 16,36 10,32 0,32 Z" fill="#C9A14A"/></g></g></svg>`;

/* ---------- page ---------- */
function page(deck){
  const slides = deck.slides.map((sl, i) => {
    const fn = KIND[sl.k];
    if (!fn) throw new Error("unknown slide kind: " + sl.k);
    const variant = sl.variant ? " " + sl.variant : "";
    const timer = sl.timer ? ` data-timer="${sl.timer}"` : "";
    let inner = fn(sl);
    inner += labnote(sl.lab);
    inner += covers(sl.covers, deck.week);
    return `    <section class="slide${variant}"${timer}><span class="snum">${i + 1}</span>${inner}\n    </section>`;
  }).join("\n\n");

  const title = house(`BIO 005 ${deck.letter} ${deck.topic}`);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(house(deck.subtitle || deck.title))}">
<link rel="icon" type="image/svg+xml" href="icon.svg">
<style>
${FONTS}
${REF_CSS}
${ADD_CSS}
</style>
</head>
<body>

<a class="skip" href="#deck">Skip to the slides</a>
<div class="progress" id="progress" role="presentation"></div>

<header class="site-header">
  <div class="wrap top">
    <div>
      <a class="brandmark" href="welcome.html" target="_top" aria-label="BIO 005 Human Physiology, course home">
        ${LOGO}
        <span class="bt"><span class="b1">Human Physiology</span><span class="b2">BIO 005 &middot; Yuba College</span></span>
      </a>
      <p class="typechip"><b aria-hidden="true">${esc(deck.letter)}</b> ${esc(house(deck.type))} &middot; Week ${deck.week}</p>
      <p class="eyebrow">Unit ${deck.unit} &middot; ${esc(house(deck.topic))}</p>
      <h1>${esc(house(deck.title))}</h1>
    </div>
    <button type="button" class="presentbtn" id="presentBtn">Present</button>
  </div>
  <p class="keys"><kbd>T</kbd> clock &nbsp; <kbd>&rarr;</kbd> or <kbd>Space</kbd> opens the next box, then advances &nbsp; <kbd>&larr;</kbd> back &nbsp; <kbd>A</kbd> open everything on this slide &nbsp; <kbd>Esc</kbd> exit &nbsp;&middot;&nbsp; On a phone, just scroll.</p>
</header>

<noscript>
  <div class="noscript-note">
    <p><b>These slides read and print without JavaScript.</b> Every box below is already open, so nothing is hidden from you. What you lose is Present mode, the click to open behavior and the timer. The same material is written out in full on the Week ${deck.week} notes page and in the course lab manual, both of which read and print with no scripting at all.</p>
  </div>
  <style>.rv .rv-body{display:block !important}.rv:not(.open)::after{display:none}</style>
</noscript>

<main class="deck" id="deck">

${slides}

</main>

<footer class="page-footer">
  <div class="wrap">
    <b>Dr. Sharilyn Rennie</b>
    <p>BIO 005 Human Physiology &nbsp;&middot;&nbsp; Week ${deck.week}, ${esc(house(deck.topic))} &nbsp;&middot;&nbsp; Slide type: ${esc(deck.letter)}, ${esc(house(deck.type))}</p>
  </div>
</footer>

<div class="clock" id="clock">
  <div class="clock-face" id="clockFace">
    <span class="clock-time" id="clockTime" aria-live="polite">5:00</span>
    <span class="clock-btns">
      <button type="button" class="cbtn go" id="cStart">Start</button>
      <button type="button" class="cbtn" id="cReset">Reset</button>
      <button type="button" class="cbtn" id="cMinus" aria-label="Take thirty seconds off">&minus;30</button>
      <button type="button" class="cbtn" id="cPlus" aria-label="Add thirty seconds">+30</button>
    </span>
  </div>
  <span class="clock-done-msg">Time</span>
  <span class="clock-hint">Drag to move. Press T to hide.</span>
</div>

<div class="zoom-back" id="zoomBack"></div>
<div class="zoom" id="zoom" role="dialog" aria-modal="true" aria-label="Expanded card">
  <button type="button" class="zoom-close" id="zoomClose">Close</button>
  <div class="zoom-inner" id="zoomInner"></div>
</div>

<p class="rvhint">Right arrow opens the next box on this slide, then moves on.</p>

<div class="present-bar">
  <button type="button" class="pbtn ghost" id="prevBtn" aria-label="Previous slide">&larr;</button>
  <span class="pcount" id="pcount">1 / ${deck.slides.length}</span>
  <button type="button" class="pbtn" id="nextBtn" aria-label="Next slide">&rarr;</button>
  <button type="button" class="pbtn ghost" id="clockBtn">Timer</button>
  <button type="button" class="pbtn ghost" id="exitBtn">Exit</button>
</div>

<script>
${REF_JS.replace("var ID = 'slides-p-introduction-to-physiology';", "var ID = '" + deck.id + "';")}
</script>

<script src="bio005-dock.js"></script>
<script src="bio005-teach-pen.js"></script>
</body>
</html>
`;
}

/* ---------- run ---------- */
const files = fs.readdirSync(path.join(HERE, "content")).filter(f => f.endsWith(".js")).sort();
if (!files.length){ console.log("No content files yet."); process.exit(0); }

let bad = 0;
files.forEach(f => {
  const deck = require(path.join(HERE, "content", f));
  let html = page(deck);

  const em = (html.match(/[—–]/g) || []).length;
  if (em){ console.log("  ! " + deck.id + ": " + em + " dash character(s) survived, replacing"); html = html.replace(/—/g, ",").replace(/–/g, " to "); bad++; }

  const out = path.join(HERE, "out", deck.id + ".html");
  fs.writeFileSync(out, html, "utf8");
  console.log(`${deck.id}.html  ${deck.slides.length} slides  ${Math.round(fs.statSync(out).size/1024)} KB`);
});
console.log(bad ? "\nDash replacements happened. Fix them in the content file." : "\nClean.");
