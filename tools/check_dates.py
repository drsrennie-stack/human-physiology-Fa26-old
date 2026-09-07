#!/usr/bin/env python3
"""
tools/check_dates.py

Checks every "weekday, month day" pair in the student facing pages against
the real 2026 calendar. The syllabus said "Mon Sep 8" for a term that starts
on a Tuesday, and nothing in the build would have caught it.

Run: python3 tools/check_dates.py
"""
import pathlib, datetime, re, glob, sys

MON = {m: i+1 for i, m in enumerate(
    ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'])}
FULL = {'January':1,'February':2,'March':3,'April':4,'May':5,'June':6,'July':7,
        'August':8,'September':9,'October':10,'November':11,'December':12}
DAY = {'Mon':0,'Tue':1,'Tues':1,'Wed':2,'Thu':3,'Thur':3,'Thurs':3,'Fri':4,'Sat':5,'Sun':6,
       'Monday':0,'Tuesday':1,'Wednesday':2,'Thursday':3,'Friday':4,'Saturday':5,'Sunday':6}

PAT = re.compile(
    r'\b(Mon|Tues?|Wed|Thur?s?|Fri|Sat|Sun|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)'
    r',?\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|January|February|March|April|June|July|'
    r'August|September|October|November|December)\.?\s+(\d{1,2})\b')

YEAR = 2026
bad, checked = [], 0
for f in sorted(x for x in glob.glob('*.html') + glob.glob('*.js') if not x.startswith('_')):
    try: s = pathlib.Path(f).read_text()
    except Exception: continue
    for m in PAT.finditer(s):
        dname, mname, day = m.group(1), m.group(2), int(m.group(3))
        mo = MON.get(mname[:3]) if mname[:3] in MON else FULL.get(mname)
        want = DAY.get(dname)
        if not mo or want is None: continue
        try: real = datetime.date(YEAR, mo, day)
        except ValueError:
            bad.append((f, m.group(0), 'not a real date')); continue
        checked += 1
        if real.weekday() != want:
            bad.append((f, m.group(0), 'is a ' + real.strftime('%A')))

for f, txt, why in bad:
    print(f'{f}: "{txt}" {why}')
print(f'\n{checked} weekday and date pairs checked, {len(bad)} wrong')
sys.exit(1 if bad else 0)
