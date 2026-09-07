#!/usr/bin/env python3
"""
tools/us_spelling.py

This is a US course and Silverthorn is a US textbook. I had been writing
British spellings into student facing copy: recognise, integrating centre,
colour, defence, labelled. Scrubs caught it.

Word boundary replacements only, and only on words that are unambiguous.
CSS and JS identifiers are unaffected because the American form is what
those already use (background-color, text-align), so nothing here can
match a property name.

Run: python3 tools/us_spelling.py [--check]
NOTE ON FALSE POSITIVES: match on whole words only, and never on a stem.
"organism", "organic", "analysis" and "analyst" are correct US spellings and
a stem pattern like organis\\w* flags all of them.
"""
import re, sys, pathlib, glob

PAIRS = [
    # -ise / -isation
    ('recognise','recognize'), ('recognised','recognized'), ('recognising','recognizing'),
    ('recognises','recognizes'), ('recognition','recognition'),
    ('organise','organize'), ('organised','organized'), ('organising','organizing'),
    ('organisation','organization'), ('organisations','organizations'),
    ('summarise','summarize'), ('summarised','summarized'), ('summarising','summarizing'),
    ('analyse','analyze'), ('analysed','analyzed'), ('analysing','analyzing'), ('analyses','analyzes'),
    ('memorise','memorize'), ('memorised','memorized'), ('memorising','memorizing'),
    ('normalise','normalize'), ('normalised','normalized'),
    ('specialise','specialize'), ('specialised','specialized'),
    ('prioritise','prioritize'), ('prioritised','prioritized'),
    ('realise','realize'), ('realised','realized'),
    ('apologise','apologize'), ('apologised','apologized'),
    ('utilise','utilize'), ('utilised','utilized'),
    ('emphasise','emphasize'), ('emphasised','emphasized'),
    ('minimise','minimize'), ('minimised','minimized'),
    ('maximise','maximize'), ('maximised','maximized'),
    ('polarise','polarize'), ('polarised','polarized'), ('polarisation','polarization'),
    ('depolarise','depolarize'), ('depolarised','depolarized'), ('depolarisation','depolarization'),
    ('repolarise','repolarize'), ('repolarisation','repolarization'),
    ('hyperpolarise','hyperpolarize'), ('hyperpolarisation','hyperpolarization'),
    ('ionise','ionize'), ('ionised','ionized'), ('ionisation','ionization'),
    ('oxidise','oxidize'), ('oxidised','oxidized'), ('oxidisation','oxidation'),
    ('catalyse','catalyze'), ('catalysed','catalyzed'),
    ('hydrolyse','hydrolyze'), ('hydrolysed','hydrolyzed'),
    ('equalise','equalize'), ('equalised','equalized'),
    ('stabilise','stabilize'), ('stabilised','stabilized'),
    ('visualise','visualize'), ('visualised','visualizing'),
    # -re
    ('centre','center'), ('centres','centers'), ('centred','centered'), ('centring','centering'),
    ('litre','liter'), ('litres','liters'),
    ('millilitre','milliliter'), ('millilitres','milliliters'),
    ('metre','meter'), ('metres','meters'),
    ('fibre','fiber'), ('fibres','fibers'),
    # -our
    ('colour','color'), ('colours','colors'), ('coloured','colored'), ('colouring','coloring'),
    ('behaviour','behavior'), ('behaviours','behaviors'), ('behavioural','behavioral'),
    ('favour','favor'), ('favours','favors'), ('favourite','favorite'),
    ('honour','honor'), ('honours','honors'),
    ('neighbour','neighbor'), ('neighbours','neighbors'), ('neighbouring','neighboring'),
    ('vapour','vapor'), ('vapours','vapors'),
    ('rigour','rigor'), ('rigours','rigors'),
    ('endeavour','endeavor'),
    # -ce / -se
    ('defence','defense'), ('defences','defenses'),
    ('offence','offense'), ('practise','practice'), ('practised','practiced'),
    ('practising','practicing'), ('licence','license'),
    # doubled l
    ('labelled','labeled'), ('labelling','labeling'),
    ('travelled','traveled'), ('travelling','traveling'),
    ('modelling','modeling'), ('modelled','modeled'),
    ('cancelled','canceled'), ('cancelling','canceling'),
    ('fuelled','fueled'), ('signalling','signaling'), ('signalled','signaled'),
    ('totalled','totaled'), ('marvellous','marvelous'),
    # misc
    ('judgement','judgment'), ('judgements','judgments'),
    ('acknowledgement','acknowledgment'),
    ('grey','gray'), ('greyed','grayed'),
    ('haemoglobin','hemoglobin'), ('haematocrit','hematocrit'),
    ('haemorrhage','hemorrhage'), ('haematology','hematology'),
    ('oedema','edema'), ('oesophagus','esophagus'), ('oestrogen','estrogen'),
    ('anaemia','anemia'), ('anaemic','anemic'), ('ischaemia','ischemia'),
    ('leucocyte','leukocyte'), ('leucocytes','leukocytes'),
    ('paediatric','pediatric'), ('foetal','fetal'), ('foetus','fetus'),
    ('diarrhoea','diarrhea'), ('caesarean','cesarean'),
    ('aetiology','etiology'), ('anaesthesia','anesthesia'), ('anaesthetic','anesthetic'),
]

def cap(rep, orig):
    if orig.isupper(): return rep.upper()
    if orig[0].isupper(): return rep[0].upper() + rep[1:]
    return rep

SKIP_DIRS = {'_superseded','DRAG-1-root-files','DRAG-2-folders','3-into-the-os-folder',
             '3-drag-this-folder-itself','nav-patch','site','node_modules','.git'}

def main():
    check = '--check' in sys.argv
    files = set()
    for pat in ['*.html','*.js','*.md','*.css','*/*.html','*/*.js','*/*.css','*/*.md',
                '*/*/*.html','*/*/*.js']:
        files.update(glob.glob(pat))
    files = {f for f in files if f.split('/')[0] not in SKIP_DIRS}

    total, touched = 0, {}
    for f in sorted(files):
        p = pathlib.Path(f)
        try: s = p.read_text()
        except Exception: continue
        o, n = s, 0
        for br, us in PAIRS:
            if br == us: continue
            rx = re.compile(r'\b' + br + r'\b', re.IGNORECASE)
            def sub(m):
                nonlocal n
                n += 1
                return cap(us, m.group(0))
            s = rx.sub(sub, s)
        if s != o:
            total += n
            touched[f] = n
            if not check: p.write_text(s)

    for f in sorted(touched, key=lambda x: -touched[x])[:18]:
        print(f'{touched[f]:5d}  {f}')
    print(f'\n{total} replacements across {len(touched)} files' + (' (check only)' if check else ''))

main()
