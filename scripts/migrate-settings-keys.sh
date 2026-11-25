#!/usr/bin/env bash
# Migrate saved settings files from the short tag cloud emphasis and focus threshold keys to the long ones.
#
#   CV tag cloud emphasis -> Curriculum Vitae tag cloud emphasis   (and PS, PP)
#   CvFocusThreshold      -> Curriculum Vitae focus threshold      (and Ps, Pp)
#
# Keys are matched only as JSON keys, both at the top level ("key":) and inside the escaped
# contexts string (\"key\":), so values such as search history are never touched.
#
# Usage:
#   scripts/migrate-settings-keys.sh [directory]          dry run: shows counts and validates the result
#   scripts/migrate-settings-keys.sh --apply [directory]  rewrites the files, after backing them up
#
# The default directory is the user's settings directory.
set -euo pipefail

apply=false
if [ "${1:-}" = "--apply" ]; then apply=true; shift; fi
dir="${1:-/c/Users/Jorich/Dropbox/Career/CVs/Artefacts/state}"

# old key | new key
renames=(
  'CV tag cloud emphasis|Curriculum Vitae tag cloud emphasis'
  'PS tag cloud emphasis|Project Summary tag cloud emphasis'
  'PP tag cloud emphasis|Project Portfolio tag cloud emphasis'
  'CvFocusThreshold|Curriculum Vitae focus threshold'
  'PsFocusThreshold|Project Summary focus threshold'
  'PpFocusThreshold|Project Portfolio focus threshold'
)

sed_args=()
for rename in "${renames[@]}"; do
  sed_args+=(-e "s/(\\\\?\")${rename%%|*}(\\\\?\":)/\\1${rename##*|}\\2/g")
done

# Checks that a file is valid JSON and that its contexts string, if any, is valid JSON too.
validate() {
  node -e '
    const settings = JSON.parse(require("fs").readFileSync(process.argv[1], "utf8"));
    if (typeof settings.contexts === "string") { JSON.parse(settings.contexts); }
  ' "$(cygpath -w "$1" 2>/dev/null || echo "$1")"
}

backup="$dir/.backup-$(date +%Y%m%d-%H%M%S)"
shopt -s nullglob
for file in "$dir"/*.json "$dir"/*.json.txt; do
  name="$(basename "$file")"
  before="$( (grep -oE '(\\?")(CV|PS|PP) tag cloud emphasis(\\?":)|(\\?")(Cv|Ps|Pp)FocusThreshold(\\?":)' "$file" || true) | wc -l)"
  tmp="$(mktemp)"
  sed -E "${sed_args[@]}" "$file" > "$tmp"
  old_left="$( (grep -oE '(\\?")(CV|PS|PP) tag cloud emphasis(\\?":)|(\\?")(Cv|Ps|Pp)FocusThreshold(\\?":)' "$tmp" || true) | wc -l)"
  new_keys="$( (grep -oE '(Curriculum Vitae|Project Summary|Project Portfolio) (tag cloud emphasis|focus threshold)(\\?":)' "$tmp" || true) | wc -l)"
  if ! validate "$tmp"; then
    echo "SKIP $name: the result is not valid JSON" >&2
    rm -f "$tmp"; continue
  fi
  if cmp -s "$file" "$tmp"; then
    printf '%-32s unchanged\n' "$name"; rm -f "$tmp"; continue
  fi
  printf '%-32s %3s old keys -> %3s new keys, %s old keys left\n' "$name" "$before" "$new_keys" "$old_left"
  if $apply; then
    mkdir -p "$backup"
    cp -p "$file" "$backup/"
    cat "$tmp" > "$file"
  fi
  rm -f "$tmp"
done

if $apply; then echo "Applied. Originals backed up in: $backup"; else echo "Dry run only. Re-run with --apply to rewrite the files."; fi
