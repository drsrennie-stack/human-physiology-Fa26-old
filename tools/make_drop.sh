#!/bin/sh
# Build the delivery zip WITH its paths intact.
#
# Sep 7 2026: every zip before this used `zip -j`, which junks directory
# paths. assets/brandbar.css and assets/fonts-site.css therefore never
# reached her machine, so every page she opened locally rendered with no
# brand bar styling and blue underlined links. That is what looked like
# the branding being wrong on top of the branding actually being wrong.
#
# Never use -j on this repo. The pages link assets/ relatively.
set -e
OUT="${1:-/mnt/user-data/outputs/BIO005-drop.zip}"
rm -f "$OUT"
zip -qr "$OUT" \
  assets \
  *.html *.js \
  tools \
  BIO005-*.pdf \
  compliance-notes.md \
  -x '_*' -x 'DRAG-*' -x '3-*' -x 'nav-patch/*' -x 'site/*' -x 'data-swap/*' \
  -x '_deck-source/*' -x '_holding/*' -x '_superseded/*'
echo "$OUT"
unzip -l "$OUT" | tail -1
