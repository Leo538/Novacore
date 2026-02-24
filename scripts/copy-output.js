const fs = require('fs');
const path = require('path');

const candidates = [
  path.join(__dirname, '..', 'dist', 'novacore', 'browser'),
  path.join(__dirname, '..', 'dist', 'novacore')
];

const outDir = path.join(__dirname, '..', 'browser');

for (const src of candidates) {
  if (fs.existsSync(src)) {
    fs.cpSync(src, outDir, { recursive: true });
    console.log('Copied', src, '-> browser');
    process.exit(0);
  }
}

console.error('No build output found at dist/novacore/browser or dist/novacore');
process.exit(1);
