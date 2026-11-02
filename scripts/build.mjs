import { createHash } from 'node:crypto';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

export const root = fileURLToPath(new URL('../', import.meta.url));
export const sha256 = value => createHash('sha256').update(value).digest('hex');
const read = file => readFile(path.join(root, file), 'utf8');

export async function compile() {
  const [packageText, tokenText, css, template, host] = await Promise.all(
    ['package.json', 'src/tokens.json', 'src/claude.css', 'src/client.template.js', 'src/host.js'].map(read),
  );
  const manifest = JSON.parse(packageText);
  const tokens = JSON.parse(tokenText);
  for (const [name, pair] of Object.entries(tokens)) {
    if (!/^--[a-z][\w-]+$/.test(name) || !pair || Object.keys(pair).sort().join() !== 'dark,light' ||
        Object.values(pair).some(value => typeof value !== 'string' || !value.trim())) {
      throw new Error(`Invalid paired theme token: ${name}`);
    }
  }
  let client = template;
  for (const [marker, replacement] of [
    ['/* TOKEN_OVERRIDES */ {}', JSON.stringify(tokens, null, 2)],
    ['/* SKIN_CSS */ ""', JSON.stringify(css)],
    ['__SKIN_VERSION__', manifest.version],
  ]) {
    if (client.split(marker).length !== 2) throw new Error(`Expected one template marker: ${marker}`);
    client = client.replace(marker, () => replacement);
  }
  return { client, host, manifest, tokens, css };
}

export async function build({ check = false } = {}) {
  const { client, host, manifest, tokens, css } = await compile();
  const outputs = { 'lib/client.js': client, 'lib/index.js': host };
  if (check) {
    for (const [file, expected] of Object.entries(outputs)) {
      if (await read(file) !== expected) throw new Error(`${file} is out of date. Run npm run build.`);
    }
  } else {
    await mkdir(path.join(root, 'lib'), { recursive: true });
    for (const [file, content] of Object.entries(outputs)) await writeFile(path.join(root, file), content);
  }
  return { name: manifest.name, version: manifest.version, dsh: manifest.engines.dsh,
    tokens: Object.keys(tokens).length, css_sha256: sha256(css), client_sha256: sha256(client),
    client_bytes: Buffer.byteLength(client), status: check ? 'verified' : 'built' };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  console.log(JSON.stringify(await build({ check: process.argv.includes('--check') }), null, 2));
}
