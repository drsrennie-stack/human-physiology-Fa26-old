#!/usr/bin/env python3
"""Re-inline hootie.js and bio005-question-bank.js into the standalone pages.

Sep 7 2026. Two pages carry their own frozen copy of the assistant, pasted
in at some point and never refreshed:

    mastery-physio-os-standalone.html
    unit-05-standalone.html

They are standalone by design, meaning a student can open one with nothing
else present, so they cannot use a script tag. The cost of that is silent:
every fix to hootie.js reached every other page and not these two, and the
copies had drifted far enough that they still carried the crash guard's
absence, the retired Scholar Points answer, and the 'loop' keyword that
answered "how do feedback loops work" with a note about lab practice
questions.

This script rewrites the block between the two markers from the file on
disk, so hootie.js stays the single source of truth. Run it after any
change to hootie.js or the question bank.

    python3 tools/reinline_hootie.py
"""
import io, re, sys, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
# Each entry is (marker comment, source file). The dock is inlined on the
# same two pages and drifts for exactly the same reason.
BLOCKS = [
    ('/* ===== inlined ahead of the dock: hootie.js ===== */', 'hootie.js'),
    ('/* ===== inlined: bio005-dock.js ===== */',              'bio005-dock.js'),
]
PAGES = ['mastery-physio-os-standalone.html', 'unit-05-standalone.html']

def script_block_end(text, start_idx):
    """Index of the </script> that closes the block the marker sits in."""
    end = text.find('\n</script>', start_idx)
    if end == -1:
        raise SystemExit('no closing script tag after the marker')
    return end

def main():
    changed = []
    for name in PAGES:
        p = ROOT / name
        if not p.exists():
            print('skip, missing: ' + name); continue
        t = p.read_text(encoding='utf-8')
        before = t
        for marker, srcname in BLOCKS:
            src = (ROOT / srcname).read_text(encoding='utf-8')
            # A literal </script> inside inlined JS would close the tag early.
            src_safe = src.replace('</script>', '<\\/script>')
            i = t.find(marker)
            if i == -1:
                print('  no ' + srcname + ' marker in ' + name); continue
            end = script_block_end(t, i)
            t = t[:i] + marker + '\n' + src_safe.rstrip('\n') + t[end:]
        if t != before:
            p.write_text(t, encoding='utf-8')
            changed.append(name)
        else:
            print('already current: ' + name)
    for c in changed:
        print('re-inlined: ' + c)
    return 0

if __name__ == '__main__':
    sys.exit(main())
