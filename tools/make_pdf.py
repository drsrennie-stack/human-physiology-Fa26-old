#!/usr/bin/env python3
"""
tools/make_pdf.py

Builds TAGGED, PDF/UA-1 PDFs from the course pages.

Why not Chrome. Playwright's page.pdf() is Chrome's print-to-PDF, and Chrome
does not write a structure tree. The result opens fine and reads as a wall of
unstructured text to a screen reader: no headings to jump between, no list
semantics, no table headers, no alt text, no reading order guarantee. Every
PDF this course shipped before today was built that way.

WeasyPrint writes a real structure tree and can target PDF/UA-1. It does not
run JavaScript, and several of these pages build themselves in JS, so the page
is rendered in a headless browser first and the settled DOM is handed over.

Run:  python3 tools/make_pdf.py            builds everything in JOBS
      python3 tools/make_pdf.py <name>     builds one job by output name
"""
import asyncio, sys, os, re, pathlib
from playwright.async_api import async_playwright
from weasyprint import HTML
import pikepdf

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT  = pathlib.Path('/mnt/user-data/outputs')

# output name -> (source page with query, PDF title, one-line description,
#                  optional CSS selector: the printed artifact is ONLY this)
JOBS = {
 'BIO005-Week1-NoteSheet.pdf':
   ('note-sheet.html?week=1&per=2', 'BIO 005 Week 1 note sheet',
    'One open drawing box per competency, Week 1',
    # the printed sheet is the sheet pages. The instructions, the worked
    # template and the on screen h1 are the web page around it, and leaving
    # them in gave the PDF a second H1.
    '.sheetpage'),
 'BIO005-Week1-NoteSheet-Tall.pdf':
   ('note-sheet.html?week=1&per=1', 'BIO 005 Week 1 note sheet, one per page',
    'One competency to a page, so the drawing box is taller than it is wide',
    '.sheetpage'),
 'BIO005-Week1-Patient-Sheet.pdf':
   ('patient-sheet.html?week=1', 'BIO 005 Week 1 patient sheet',
    'The Use It walkthrough for Week 1, with room to answer'),
 'BIO005-Week1-Ungraded-Work.pdf':
   ('ungraded-sheet.html?week=1', 'BIO 005 Week 1 ungraded work',
    'Everything ungraded in Week 1: retrieval target, brain dumps, drawing prompts, book problems'),
 'BIO005-Week1-Competencies.pdf':
   ('week-01-competencies.html', 'BIO 005 Week 1 competencies',
    'Week 1 competencies with both brain dump prompts'),
 # The desk sheet, added Sep 7 2026. Names and tags only, no "can"
 # statements: the packet below is the version with those, and it runs
 # eleven pages, which is not something anybody keeps beside them.
 # `keep` is the sheet itself, so the on screen buttons and the warning
 # about statement length stay out of the structure tree.
 'BIO005-Fall2026-Competency-Sheet.pdf':
   ('competency-sheet-print.html', 'BIO 005 competency sheet, Fall 2026',
    'All 268 competencies by week, tagged lecture or lab, for printing',
    '#sheet'),
 'BIO005-Fall2026-Competency-Packet.pdf':
   ('competency-packet.html', 'BIO 005 competency packet, Fall 2026',
    'All 268 competencies for the term'),
 'BIO005-Fall2026-Competencies-by-Week.pdf':
   ('competencies-by-week.html', 'BIO 005 competencies by week, Fall 2026',
    'Every competency grouped by the week it is taught'),
 'BIO005-Fall2026-Syllabus.pdf':
   ('syllabus-fall2026.html', 'BIO 005 syllabus, Fall 2026',
    'Course syllabus, Yuba College, Fall 2026'),
 'BIO005-Week2-Graphing-Worksheet.pdf':
   ('worksheet-week02-graphing.html', 'BIO 005 Week 2 graphing worksheet',
    'Three figures to read and answer by hand'),
}

async def render(page_url: str, keep: str = None, title: str = '') -> str:
    """Load the page in Chromium, let its JS settle, return the printable DOM."""
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        p = await b.new_page()
        await p.emulate_media(media='print')
        await p.goto('file://' + str(ROOT) + '/' + page_url)
        await p.wait_for_timeout(1800)
        if keep:
            await p.evaluate("""(sel) => {
              const keepers = [].slice.call(document.querySelectorAll(sel));
              if (!keepers.length) return;
              const holder = document.createElement('div');
              keepers.forEach(k => holder.appendChild(k));
              document.body.innerHTML = '';
              document.body.appendChild(holder);
            }""", keep)
        # A cropped artifact can end up with no H1, because the page's own H1 is
        # chrome that print hides. A PDF whose top-level headings are H2 has a
        # broken outline for anyone navigating by heading, so give the crop a
        # real H1 carrying the PDF's own title. It is positioned off screen, so
        # it costs no space on paper and still lands in the structure tree.
        if keep:
            await p.evaluate("""(t) => {
              if (document.querySelector('h1')) return;
              const h = document.createElement('h1');
              h.textContent = t;
              h.setAttribute('style',
                'position:absolute;left:-9999px;top:0;width:1px;height:1px;overflow:hidden');
              document.body.insertBefore(h, document.body.firstChild);
            }""", title)
        html = await p.evaluate("""() => {
          /* Anything the page's own print stylesheet hides is not part of the
             printed document. Playwright is in print emulation here, so this
             is the page's real print view. Dropping these nodes rather than
             leaving them hidden keeps them out of the structure tree, which is
             what stopped the note sheet shipping two H1s: the on screen intro
             heading is display:none on paper but was still being tagged. */
          [].slice.call(document.body.querySelectorAll('*')).forEach(n => {
            if (!n.isConnected) return;
            const cs = getComputedStyle(n);
            if (cs.display === 'none' || cs.visibility === 'hidden') n.remove();
          });

          /* strip the interactive chrome that has no meaning on paper */
          document.querySelectorAll(
            '.mm-brandbar,.mm-jumpwrap,.homebar,.skip,.b5nav,.b5foot,.b5play,'
            + '.b5listen,script,.pwrap,.controls,.noprint'
          ).forEach(n => n.remove());
          /* a checkbox is a form control on screen and a printed tick box on
             paper; give it a name either way */
          document.querySelectorAll('input[type=checkbox]').forEach(i => {
            const l = document.querySelector('label[for="' + CSS.escape(i.id) + '"]');
            if (l && !i.getAttribute('aria-label')) i.setAttribute('aria-label', l.textContent.trim().slice(0,120));
          });
          /* every img and svg must carry alt or be marked decorative, PDF/UA
             has no third option */
          document.querySelectorAll('img').forEach(i => { if (!i.hasAttribute('alt')) i.setAttribute('alt',''); });

          /* INLINE SVG DOES NOT REACH THE TAG TREE.
             An <svg role="img" aria-label="..."> is a picture with a perfectly
             good description on screen, and WeasyPrint emits it as bare marked
             content with no /Figure and no /Alt, so in the PDF it is a picture
             a screen reader cannot describe. Converting it to an <img> with the
             same text in alt is what puts /Figure with /Alt in the structure
             tree. It also lets the figure take the full column width, which
             inline SVG did not. */
          document.querySelectorAll('svg').forEach(s => {
            const alt = s.getAttribute('aria-label')
                     || (s.querySelector('title') ? s.querySelector('title').textContent.trim() : '')
                     || (s.querySelector('desc')  ? s.querySelector('desc').textContent.trim()  : '');
            if (!alt) { s.setAttribute('aria-hidden','true'); return; }
            const clone = s.cloneNode(true);
            if (!clone.getAttribute('xmlns')) clone.setAttribute('xmlns','http://www.w3.org/2000/svg');
            const vb = (clone.getAttribute('viewBox') || '').split(/[\s,]+/).map(Number);
            const img = document.createElement('img');
            img.src = 'data:image/svg+xml;base64,' +
                      btoa(unescape(encodeURIComponent(new XMLSerializer().serializeToString(clone))));
            img.alt = alt;
            const w = s.getAttribute('width'), h = s.getAttribute('height');
            if (w && h) { img.setAttribute('width', w); img.setAttribute('height', h); }
            else if (vb.length === 4 && vb[2]) {
              img.style.width = '100%';
              img.style.maxWidth = vb[2] + 'px';
              img.style.height = 'auto';
            }
            s.replaceWith(img);
          });

          /* WeasyPrint gives an EMPTY inline-block no line box, so the printed
             tick squares and the colour rules collapsed to a pair of vertical
             strokes. A zero width character gives the box something to sit on. */
          document.querySelectorAll('.cl, .ln, .swatch').forEach(e => {
            if (!e.textContent.trim()) e.textContent = '\u200B';
          });
          /* the tick square is drawn with a border on an empty element, which
             WeasyPrint collapses. A real box drawing character always renders
             and reads as an empty checkbox. */
          document.querySelectorAll('.tick').forEach(e => {
            e.textContent = '\u25A1';
            e.setAttribute('style','border:0;font-size:15px;line-height:1;vertical-align:-1px');
          });
          return '<!DOCTYPE html>' + document.documentElement.outerHTML;
        }""")
        await b.close()
        return html

def stamp(path: pathlib.Path, title: str, subject: str):
    """PDF/UA requires the title in the catalog and the viewer told to show it."""
    with pikepdf.open(path, allow_overwriting_input=True) as pdf:
        with pdf.open_metadata() as m:
            m['dc:title'] = title
            m['dc:description'] = subject
            m['dc:language'] = 'en-US'
            m['pdf:Producer'] = 'WeasyPrint, PDF/UA-1'
        pdf.Root['/Lang'] = pikepdf.String('en-US')
        vp = pdf.Root.get('/ViewerPreferences')
        if vp is None:
            pdf.Root['/ViewerPreferences'] = pdf.make_indirect(pikepdf.Dictionary())
            vp = pdf.Root['/ViewerPreferences']
        vp['/DisplayDocTitle'] = True
        relabel_list_bodies(pdf)
        pdf.save(path.with_suffix('.tmp.pdf'))
    os.replace(path.with_suffix('.tmp.pdf'), path)

def relabel_list_bodies(pdf) -> int:
    """Retype the /Div inside a list item to /LBody.

    PDF/UA wants a list item to be a label plus a body: /LI containing
    /Lbl and /LBody. WeasyPrint emits /Lbl for the marker but tags the
    wrapper element as a plain /Div, so the LBody is missing and a
    screen reader gets the item text as a loose group rather than as the
    body of item N.

    Wrapping the content in a div in the HTML is what creates a single
    child to retype; this pass renames it. Only a /Div that is a direct
    child of an /LI is touched, so nothing else in the tree moves.
    """
    n = 0
    for obj in pdf.objects:
        try:
            if not isinstance(obj, pikepdf.Dictionary):
                continue
            if obj.get('/Type', None) != '/StructElem':
                continue
            if str(obj.get('/S', '')) != '/LI':
                continue
            kids = obj.get('/K', None)
            if kids is None:
                continue
            if not isinstance(kids, pikepdf.Array):
                kids = [kids]
            for k in kids:
                if (isinstance(k, pikepdf.Dictionary)
                        and k.get('/Type', None) == '/StructElem'
                        and str(k.get('/S', '')) == '/Div'):
                    k['/S'] = pikepdf.Name('/LBody')
                    n += 1
        except Exception:
            continue
    return n


def audit(path: pathlib.Path) -> str:
    with pikepdf.open(path) as p:
        r = p.Root
        mi = r.get('/MarkInfo')
        tagged = bool(mi and mi.get('/Marked', False))
        tree   = '/StructTreeRoot' in r
        lang   = str(r.get('/Lang', '')) or 'MISSING'
        vp     = r.get('/ViewerPreferences')
        disp   = bool(vp and vp.get('/DisplayDocTitle'))
        pages  = len(p.pages)
    bits = []
    bits.append('tagged' if tagged else 'NOT TAGGED')
    bits.append('struct tree' if tree else 'NO STRUCT TREE')
    bits.append('lang ' + lang)
    bits.append('title shown' if disp else 'TITLE NOT SHOWN')
    return f"{pages}pp  " + ', '.join(bits)

def main():
    OUT.mkdir(parents=True, exist_ok=True)
    want = sys.argv[1:] or list(JOBS)
    for name in want:
        if name not in JOBS:
            print('unknown job ' + name); continue
        job = JOBS[name]
        src, title, desc = job[0], job[1], job[2]
        keep = job[3] if len(job) > 3 else None
        if not (ROOT / src.split('?')[0]).exists():
            print(f"skip {name}: {src.split('?')[0]} not in repo"); continue
        print(f"building {name} from {src}")
        html = asyncio.run(render(src, keep, title))
        target = OUT / name
        HTML(string=html, base_url=str(ROOT) + '/').write_pdf(
            target, pdf_variant='pdf/ua-1', uncompressed_pdf=False)
        stamp(target, title, desc)
        print(f"   {audit(target)}")

if __name__ == '__main__':
    main()
