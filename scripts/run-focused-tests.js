#!/usr/bin/env node
const { spawnSync } = require('child_process');
const { readdirSync, readFileSync, statSync } = require('fs');
const { resolve, join } = require('path');

function findFiles(dir, pattern) {
  const entries = readdirSync(dir);
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      files.push(...findFiles(full, pattern));
    } else if (stat.isFile()) {
      try {
        const content = readFileSync(full, 'utf8');
        if (pattern.test(content)) files.push(full);
      } catch (e) {
        // ignore read errors
      }
    }
  }
  return files;
}

const repoRoot = resolve(__dirname, '..');
const srcPath = join(repoRoot, 'src');
const focusPattern = /\.(only)\s*\(/;

const files = findFiles(srcPath, focusPattern).filter((f) => f.endsWith('.spec.ts') || f.endsWith('.test.ts'));

if (!files.length) {
  console.log('No focused test files (no .only found).');
  process.exit(1);
}

console.log('Focused test files:');
files.forEach((f) => console.log(' -', f));

// Build include args for ng test: --include accepts globs relative to workspace
const includeArgs = files.flatMap((f) => ['--include', f.replace(repoRoot + require('path').sep, '')]);

const args = ['ng', 'test', '--watch=false', '--coverage=false', ...includeArgs];

console.log('\nRunning:', 'npx', args.join(' '));

const res = spawnSync('npx', args, { stdio: 'inherit', shell: true });
process.exit(res.status);
