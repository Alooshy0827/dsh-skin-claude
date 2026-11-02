import { mkdir, readFile, writeFile, copyFile } from 'node:fs/promises';
import path from 'node:path';
import { compile, root, sha256 } from './build.mjs';

const args = process.argv.slice(2);
if (args.length > 1) throw new Error('Usage: npm run build:local -- [Claude font directory]');
const fontDirectory = path.resolve(args[0] || '/Applications/Claude.app/Contents/Resources/fonts');
const result = await compile({ fontDirectory });
const { client, host, manifest, css, fonts } = result;
const destination = path.join(root, 'local-installations', `${manifest.name}-${manifest.version}`);
const report = { name: manifest.name, version: manifest.version, dsh: manifest.engines.dsh,
  font_source: fontDirectory, distribution: 'local personal installation only; do not upload font binaries',
  client_sha256: sha256(client), css_sha256: sha256(css), fonts };
try {
  const previous = await readFile(path.join(destination, 'lib/client.js'), 'utf8');
  if (previous !== client) throw new Error('Different same-version local package exists; increment package.json version.');
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}
await mkdir(path.join(destination, 'lib'), { recursive: true });
await writeFile(path.join(destination, 'package.json'), JSON.stringify(manifest, null, 2) + '\n');
await writeFile(path.join(destination, 'lib/client.js'), client);
await writeFile(path.join(destination, 'lib/index.js'), host);
for (const file of ['cordis.patch.yml', 'icon.svg', 'LICENSE', 'INSTALL.md']) {
  await copyFile(path.join(root, file), path.join(destination, file));
}
await writeFile(path.join(destination, 'local-build.json'), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({ destination, ...report }, null, 2));
