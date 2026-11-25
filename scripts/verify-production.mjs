import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { clinic } from '../src/content/clinic.js';

const base = new URL(process.env.SEO_BASE_URL || clinic.origin);
if (base.username || base.password || base.search || base.hash || base.pathname !== '/') {
  throw new Error('SEO_BASE_URL must be an origin without credentials, a path, query or fragment.');
}
if (base.protocol !== 'https:' && !(base.protocol === 'http:' && ['localhost', '127.0.0.1', '[::1]'].includes(base.hostname))) {
  throw new Error('Use HTTPS for live checks, or HTTP for a local preview.');
}

console.log(`Checking the deployed search foundations at ${base.origin}`);
console.log('These read-only checks do not establish indexing, rankings, AI citations or genuine crawler access.');
const child = spawn(process.execPath, ['--test', 'tests/seo-http.test.mjs'], {
  cwd: fileURLToPath(new URL('..', import.meta.url)),
  env: { ...process.env, SEO_BASE_URL: base.origin },
  stdio: 'inherit',
});
child.on('error', error => {
  console.error(error.message);
  process.exitCode = 1;
});
child.on('exit', code => {
  process.exitCode = code ?? 1;
});
