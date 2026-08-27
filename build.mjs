import { cp, mkdir, rm } from 'node:fs/promises';

await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
await Promise.all([
  cp('index.html', 'dist/index.html'),
  cp('styles.css', 'dist/styles.css'),
  cp('script.js', 'dist/script.js'),
  cp('get-started', 'dist/get-started', { recursive: true }),
  cp('public', 'dist/public', { recursive: true }),
]);

console.log('Static SkyX site built in dist/');
