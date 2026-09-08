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
#
# ---------------------------------------------------------------------
# CHANGED ONLY BY DEFAULT, Sep 7 2026.
#
# Scrubs asked for drops that carry only what changed since the last one,
# not the whole 237 file repo. The full zip was 5.8 MB and she had to hunt
# for the three files that were actually new.
#
# The marker is the git tag `last-drop`. Every successful drop moves it to
# HEAD, so the next run diffs against the previous delivery automatically.
# If the tag does not exist yet, the first run builds a full zip and sets
# it, which is the right behavior for a machine that has never had one.
#
#   tools/make_drop.sh                 changed since the last drop
#   tools/make_drop.sh --full          everything, for a fresh machine
#   tools/make_drop.sh --since <ref>   changed since any commit or tag
#   tools/make_drop.sh --no-mark       build without moving the marker
#
# An output path can follow any of those.
#
# NEVER PUSH. Her repos are hers to push; this script exists so she can
# unzip over her working copy and push by hand.
# ---------------------------------------------------------------------
set -e

MODE=auto
SINCE=""
MARK=yes
OUT=""

while [ $# -gt 0 ]; do
  case "$1" in
    --full)     MODE=full; shift ;;
    --since)    MODE=since; SINCE="$2"; shift 2 ;;
    --no-mark)  MARK=no; shift ;;
    -*)         echo "make_drop.sh: unknown option $1" >&2; exit 2 ;;
    *)          OUT="$1"; shift ;;
  esac
done

[ -n "$OUT" ] || OUT=/mnt/user-data/outputs/BIO005-drop.zip
rm -f "$OUT"

# Paths that never belong in a drop, whichever mode is running.
excluded () {
  case "$1" in
    _*|DRAG-*|3-*|nav-patch/*|site/*|data-swap/*) return 0 ;;
    *) return 1 ;;
  esac
}

# In a full drop these are the roots. img/ was added Sep 7 2026: slide 23 of
# the introduction deck is the first page in the repo to reference a raster
# file, so a zip without img/ ships that slide with two broken images.
# CANVAS-*.txt was added the same day; it had been handed over separately,
# which is how a snippet file drifts out of step with the pages it points at.
full_drop () {
  zip -qr "$OUT" \
    assets \
    img \
    *.html *.js \
    tools \
    BIO005-*.pdf \
    CANVAS-*.txt \
    compliance-notes.md \
    -x '_*' -x 'DRAG-*' -x '3-*' -x 'nav-patch/*' -x 'site/*' -x 'data-swap/*' \
    -x '_deck-source/*' -x '_holding/*' -x '_superseded/*'
}

if [ "$MODE" = auto ]; then
  if git rev-parse -q --verify refs/tags/last-drop >/dev/null 2>&1; then
    MODE=since; SINCE=last-drop
  else
    echo "make_drop.sh: no last-drop tag yet, building a full drop." >&2
    MODE=full
  fi
fi

if [ "$MODE" = full ]; then
  full_drop
else
  git rev-parse -q --verify "$SINCE" >/dev/null 2>&1 || {
    echo "make_drop.sh: '$SINCE' is not a commit or tag." >&2; exit 2; }

  LIST=$(mktemp)
  # Committed changes since the marker, plus anything still uncommitted, so a
  # drop taken mid edit is not silently missing the edit. Deletions are
  # dropped from the list: a zip cannot express one, and feeding zip a path
  # that no longer exists makes it fail the whole archive.
  { git diff --name-only --diff-filter=d "$SINCE" HEAD
    git diff --name-only --diff-filter=d HEAD
    git ls-files --others --exclude-standard
  } | sort -u > "$LIST"

  KEEP=$(mktemp)
  while IFS= read -r f; do
    [ -n "$f" ] || continue
    excluded "$f" && continue
    [ -f "$f" ] || continue
    printf '%s\n' "$f" >> "$KEEP"
  done < "$LIST"

  if [ ! -s "$KEEP" ]; then
    echo "make_drop.sh: nothing has changed since $SINCE. No zip written." >&2
    rm -f "$LIST" "$KEEP"
    exit 1
  fi

  zip -q "$OUT" -@ < "$KEEP"

  echo "changed since $SINCE:"
  sed 's/^/  /' "$KEEP"
  rm -f "$LIST" "$KEEP"
fi

# Move the marker only after the zip is on disk, so a failed build does not
# advance it and quietly drop a file out of the next delivery.
if [ "$MARK" = yes ]; then
  git tag -f last-drop >/dev/null 2>&1 || true
fi

echo "$OUT"
unzip -l "$OUT" | tail -1
