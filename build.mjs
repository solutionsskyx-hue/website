import { cp, mkdir, rm } from 'node:fs/promises';

await rm('dist', { recursive: true, force: true });
await Promise.all([
  mkdir('dist/get-started', { recursive: true }),
  mkdir('dist/public/assets', { recursive: true }),
  mkdir('dist/public/fonts', { recursive: true }),
]);
await Promise.all([
  cp('index.html', 'dist/index.html'),
  cp('styles.css', 'dist/styles.css'),
  cp('script.js', 'dist/script.js'),
  cp('get-started/index.html', 'dist/get-started/index.html'),
  cp('public/favicon.png', 'dist/public/favicon.png'),
  cp('public/og.png', 'dist/public/og.png'),
  cp('public/fonts/GeneralSans-Regular.otf', 'dist/public/fonts/GeneralSans-Regular.otf'),
  cp('public/fonts/GeneralSans-Medium.otf', 'dist/public/fonts/GeneralSans-Medium.otf'),
  cp('public/fonts/GeneralSans-Semibold.otf', 'dist/public/fonts/GeneralSans-Semibold.otf'),
  cp('public/assets/skyx-logo.png', 'dist/public/assets/skyx-logo.png'),
  cp('public/assets/hero-left.webp', 'dist/public/assets/hero-left.webp'),
  cp('public/assets/hero-right.webp', 'dist/public/assets/hero-right.webp'),
  cp('public/assets/product-ai.webp', 'dist/public/assets/product-ai.webp'),
  cp('public/assets/product-digital.webp', 'dist/public/assets/product-digital.webp'),
  cp('public/assets/product-it.webp', 'dist/public/assets/product-it.webp'),
]);

console.log('Static SkyX site built in dist/');
