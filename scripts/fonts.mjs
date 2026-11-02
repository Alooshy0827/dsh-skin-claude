import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';

// Names and variable axes read from the fonts supplied by the installed Claude app.
// The repository stores references only, never the proprietary font binaries.
export const faces = [
  { family: 'DSH Claude Sans', style: 'normal', file: 'AnthropicSans-Romans-Variable-25x258.ttf',
    local: ['AnthropicSansVariable-TextLight', 'Anthropic Sans Text Light'] },
  { family: 'DSH Claude Sans', style: 'italic', file: 'AnthropicSans-Italics-Variable-25x258.ttf',
    local: ['AnthropicSansVariable-TextLightItalic', 'Anthropic Sans Text Light Italic'] },
  { family: 'DSH Claude Serif', style: 'normal', file: 'AnthropicSerif-Romans-Variable-25x258.ttf',
    local: ['AnthropicSerifVariable-TextLight', 'Anthropic Serif Text Light'] },
  { family: 'DSH Claude Serif', style: 'italic', file: 'AnthropicSerif-Italics-Variable-25x258.ttf',
    local: ['AnthropicSerifVariable-TextLightItalic', 'Anthropic Serif Text Light Italic'] },
];

export async function fontStyles(directory) {
  const files = [];
  const rules = [];
  for (const face of faces) {
    let source = face.local.map(name => `local(${JSON.stringify(name)})`).join(', ');
    if (directory) {
      const data = await readFile(path.join(directory, face.file));
      if (data.length < 12 || data.readUInt32BE(0) !== 0x00010000) {
        throw new Error(`Invalid TrueType font: ${face.file}`);
      }
      source = `url("data:font/ttf;base64,${data.toString('base64')}") format("truetype")`;
      files.push({ name: face.file, family: face.family, style: face.style,
        bytes: data.length, sha256: createHash('sha256').update(data).digest('hex') });
    }
    rules.push(`@font-face {\n  font-family: "${face.family}";\n  src: ${source};\n` +
      `  font-weight: 300 800;\n  font-style: ${face.style};\n  font-display: swap;\n}`);
  }
  return { css: rules.join('\n\n') + '\n', files };
}
