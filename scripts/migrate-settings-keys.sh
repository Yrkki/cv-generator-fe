#!/usr/bin/env bash
# Migrate saved settings files from retired persistence keys to the current ones.
# The migration itself is in migrate-settings-keys.mjs, which edits the parsed JSON: the garbled keys it drops have
# escaped JSON values (escaped twice inside the contexts string), which text substitution cannot match safely.
#
# Usage: scripts/migrate-settings-keys.sh [--apply] [--drop-garbled] [--drop-expand-badges] [directory]
#   default: dry run, writes nothing, keeps the garbled keys and ExpandBadges
#   --apply               rewrites the files, after backing them up
#   --drop-garbled        also drops the garbled keys
#   --drop-expand-badges  also drops ExpandBadges
set -euo pipefail

exec node "$(dirname "$0")/migrate-settings-keys.mjs" "$@"
