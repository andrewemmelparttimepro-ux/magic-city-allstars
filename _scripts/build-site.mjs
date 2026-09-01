import { build } from 'esbuild';
import { cp, copyFile, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'public');

await rm(output, { recursive: true, force: true });
await mkdir(path.join(output, 'app'), { recursive: true });

await Promise.all([
  copyFile(path.join(root, 'index.html'), path.join(output, 'index.html')),
  copyFile(path.join(root, 'analytics.js'), path.join(output, 'analytics.js')),
  copyFile(path.join(root, 'app/api.js'), path.join(output, 'app/api.js')),
  copyFile(path.join(root, 'app/theme.js'), path.join(output, 'app/theme.js')),
  copyFile(path.join(root, 'mca-all-star-welcome-packet.pdf'), path.join(output, 'mca-all-star-welcome-packet.pdf')),
  copyFile(path.join(root, 'mca-cheer-combine-evaluations-form.pdf'), path.join(output, 'mca-cheer-combine-evaluations-form.pdf')),
  copyFile(path.join(root, 'mca-magic-merch-order-form.pdf'), path.join(output, 'mca-magic-merch-order-form.pdf')),
  cp(path.join(root, 'assets'), path.join(output, 'assets'), { recursive: true }),
  cp(path.join(root, 'styles'), path.join(output, 'styles'), { recursive: true }),
  ...['Primitives.jsx', 'Home.jsx', 'Programs.jsx', 'Teams.jsx', 'Calendar.jsx', 'Coaches.jsx', 'FAQContact.jsx', 'App.jsx'].map((file) =>
    copyFile(path.join(root, 'app', file), path.join(output, 'app', file))
  ),
]);

await build({
  entryPoints: [
    'app/Primitives.jsx',
    'app/Home.jsx',
    'app/Programs.jsx',
    'app/Teams.jsx',
    'app/Calendar.jsx',
    'app/Coaches.jsx',
    'app/FAQContact.jsx',
    'app/App.jsx',
  ].map((file) => path.join(root, file)),
  outdir: path.join(output, 'dist'),
  format: 'iife',
  platform: 'browser',
  jsx: 'transform',
  minify: true,
  logLevel: 'warning',
});

console.log(`Built ${output}`);
