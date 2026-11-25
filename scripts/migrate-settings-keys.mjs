#!/usr/bin/env node
// Migrate saved settings files from retired persistence keys to the current ones.
//
// Renamed:
//   CV tag cloud emphasis -> Curriculum Vitae tag cloud emphasis   (and PS, PP)
//   CvFocusThreshold      -> Curriculum Vitae focus threshold      (and Ps, Pp)
//   InstantSearch         -> instant search
// Dropped only on request (off by default, because the values may still matter):
//   --drop-expand-badges  ExpandBadges: the former single Badges section, split into Pipeline, Service catalog and Version in 2021
//   --drop-garbled        garbled keys: mojibake such as 'ÃÂÃÂ¢...', left by obfuscated backend data or by double-decoded uploads
//
// Keys are migrated in the stored settings (the top level) and in the storage of every saved context
// (the escaped "contexts" string). Values are never changed, and the key order is kept.
// When both an old key and its new key exist, the new key's value wins and the old key is dropped.
//
// Usage:
//   node scripts/migrate-settings-keys.mjs [options] [directory]
// Options (any order):
//   --apply               rewrites the files, after backing them up (default: dry run, writes nothing)
//   --drop-garbled        also drops the garbled keys (default: kept)
//   --drop-expand-badges  also drops ExpandBadges (default: kept)
//
// Running it again is safe: migrated files are unchanged. A file whose JSON is not in the compact form the app
// writes (JSON.stringify of the storage) is skipped, so a migration never reformats a file.
import fs from 'node:fs';
import path from 'node:path';

const renames = new Map([
  ['CV tag cloud emphasis', 'Curriculum Vitae tag cloud emphasis'],
  ['PS tag cloud emphasis', 'Project Summary tag cloud emphasis'],
  ['PP tag cloud emphasis', 'Project Portfolio tag cloud emphasis'],
  ['CvFocusThreshold', 'Curriculum Vitae focus threshold'],
  ['PsFocusThreshold', 'Project Summary focus threshold'],
  ['PpFocusThreshold', 'Project Portfolio focus threshold'],
  ['InstantSearch', 'instant search'],
]);

const dropped = new Set([
  'ExpandBadges',
]);

/** Mojibake: a UTF-8 lead byte (Â or Ã) followed by a continuation byte, both decoded as Latin-1. */
const garbled = /[\u00C2\u00C3][\u0080-\u00BF]/;

const args = process.argv.slice(2);
const flags = new Set(args.filter((arg) => arg.startsWith('--')));
const unknown = [...flags].filter((flag) => !['--apply', '--drop-garbled', '--drop-expand-badges'].includes(flag));
if (unknown.length > 0) { console.error(`Unknown option: ${unknown.join(', ')}`); process.exit(2); }
const apply = flags.has('--apply');
const dropGarbled = flags.has('--drop-garbled');
const dropExpandBadges = flags.has('--drop-expand-badges');
const dir = args.find((arg) => !arg.startsWith('--')) ?? 'C:/Users/Jorich/Dropbox/Career/CVs/Artefacts/state';

/**
 * Migrates the keys of one storage object.
 *
 * @param {Record<string, unknown>} storage The storage to migrate.
 * @param {{ renamed: number, dropped: number, garbled: number }} stats The counters to update.
 *
 * @returns {Record<string, unknown>} The migrated storage.
 */
function migrateStorage(storage, stats) {
  const result = {};
  for (const [key, value] of Object.entries(storage)) {
    if (dropExpandBadges && dropped.has(key)) { stats.dropped++; continue; }
    if (dropGarbled && garbled.test(key)) { stats.garbled++; continue; }
    const newKey = renames.get(key);
    if (newKey === undefined) { result[key] = value; continue; }
    stats.renamed++;
    // the new key wins if both exist
    if (!Object.hasOwn(storage, newKey)) { result[newKey] = value; }
  }
  return result;
}

/**
 * Migrates one settings file's text.
 *
 * @param {string} text The file text.
 *
 * @returns {{ text: string, stats: object } | { error: string }} The migrated text and counts, or why it was skipped.
 */
function migrateText(text) {
  // keep a byte order mark and trailing whitespace (some files end with a newline) as they are
  const bom = text.startsWith('\uFEFF') ? '\uFEFF' : '';
  const trailing = /\s*$/.exec(text)[0];
  const json = text.slice(bom.length, text.length - trailing.length);
  const settings = JSON.parse(json);
  if (JSON.stringify(settings) !== json) { return { error: 'not in the compact form the app writes' }; }

  const stats = { renamed: 0, dropped: 0, garbled: 0 };
  const migrated = migrateStorage(settings, stats);
  if (typeof migrated.contexts === 'string') {
    const contexts = JSON.parse(migrated.contexts);
    if (JSON.stringify(contexts) !== migrated.contexts) { return { error: 'contexts not in the compact form the app writes' }; }
    for (const context of contexts) {
      if (context?.storage && typeof context.storage === 'object') { context.storage = migrateStorage(context.storage, stats); }
    }
    migrated.contexts = JSON.stringify(contexts);
  }
  return { text: bom + JSON.stringify(migrated) + trailing, stats };
}

const files = fs.readdirSync(dir)
  .filter((name) => name.endsWith('.json') || name.endsWith('.json.txt'))
  .sort((a, b) => a.localeCompare(b));
const backup = path.join(dir, `.backup-${new Date().toISOString().replace(/[-:]/g, '').replace('T', '-').slice(0, 15)}`);

for (const name of files) {
  const file = path.join(dir, name);
  const text = fs.readFileSync(file, 'utf8');
  let result;
  try { result = migrateText(text); } catch (error) { result = { error: `invalid JSON: ${error.message}` }; }
  if ('error' in result) { console.error(`SKIP ${name}: ${result.error}`); continue; }
  if (result.text === text) { console.log(`${name.padEnd(32)} unchanged`); continue; }
  const { renamed, dropped: drops, garbled: garbles } = result.stats;
  console.log(`${name.padEnd(32)} ${String(renamed).padStart(3)} renamed, ${String(drops).padStart(3)} dropped, ${String(garbles).padStart(3)} garbled dropped`);
  if (apply) {
    fs.mkdirSync(backup, { recursive: true });
    fs.copyFileSync(file, path.join(backup, name));
    fs.writeFileSync(file, result.text, 'utf8');
  }
}

console.log(apply ? `Applied. Originals backed up in: ${backup}` : 'Dry run only. Re-run with --apply to rewrite the files.');
