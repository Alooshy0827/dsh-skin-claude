import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import vm from 'node:vm';
import { compile, build } from '../scripts/build.mjs';
import { faces } from '../scripts/fonts.mjs';

const source = readFileSync(new URL('../lib/client.js', import.meta.url), 'utf8');
const manifest = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
const attribute = 'data-dsh-claude-skin';

function environment({ failure, missingHead = false, missingBody = false } = {}) {
  const nodes = new Set(), layers = new Set(), warnings = [], cleanups = [];
  const nativeLayer = { name: 'another-plugin' };
  layers.add(nativeLayer);
  class Element {
    constructor(tag) { this.tag = tag; this.attrs = new Map(); this.children = []; }
    setAttribute(key, value) { this.attrs.set(key, value); }
    getAttribute(key) { return this.attrs.has(key) ? this.attrs.get(key) : null; }
    removeAttribute(key) { this.attrs.delete(key); }
    appendChild(element) {
      if (failure === 'stylesheet') throw new Error('Simulated style insertion failure');
      this.children.push(element); element.parent = this; nodes.add(element); return element;
    }
    remove() {
      if (this.parent) this.parent.children.splice(this.parent.children.indexOf(this), 1);
      this.parent = undefined;
      nodes.delete(this);
    }
  }
  const document = {
    head: missingHead ? null : new Element('head'),
    body: missingBody ? null : new Element('body'),
    createElement: tag => new Element(tag),
    getElementById: id => [...nodes].find(node => node.id === id),
  };
  let definition;
  const window = { __ModuleLoader__: { load: value => { definition = value; } } };
  vm.runInNewContext(source, { window, document, console: { warn: (...args) => warnings.push(args) } });
  const ctx = {
    theme: { overrideTokens(name, tokens) {
      if (failure === 'theme') throw new Error('Simulated unavailable theme service');
      assert.equal(name, 'dsh-skin-claude');
      const layer = { name, tokens }; layers.add(layer);
      return () => layers.delete(layer);
    } },
    effect(effect) { const cleanup = effect(); if (typeof cleanup === 'function') cleanups.push(cleanup); },
  };
  return { document, nodes, layers, warnings, ctx, nativeLayer, definition,
    load: () => definition.factory().apply(ctx),
    dispose: () => { for (const cleanup of cleanups.splice(0).reverse()) cleanup(); },
  };
}

test('built files are byte-identical to source compilation', async () => {
  assert.equal((await build({ check: true })).status, 'verified');
});

test('enable/disable restores host state and preserves unrelated theme layers', () => {
  const e = environment();
  e.document.body.setAttribute(attribute, 'previous-value');
  e.load();
  assert.equal(e.definition.id, 'dsh-skin-claude');
  assert.equal(e.layers.size, 2);
  assert.equal(e.nodes.size, 1);
  assert.equal(e.document.body.getAttribute(attribute), manifest.version);
  assert.ok(e.document.head.children[0].textContent.includes('body[data-dsh-claude-skin]'));
  e.dispose(); e.dispose();
  assert.deepEqual([...e.layers], [e.nativeLayer]);
  assert.equal(e.nodes.size, 0);
  assert.equal(e.document.body.getAttribute(attribute), 'previous-value');
});

test('100 enable/disable cycles and duplicate activation leave no residual styles', () => {
  const e = environment();
  for (let cycle = 0; cycle < 100; cycle++) {
    e.load(); e.load();
    assert.equal(e.layers.size, 2);
    assert.equal(e.document.head.children.length, 1);
    e.dispose();
    assert.deepEqual([...e.layers], [e.nativeLayer]);
    assert.equal(e.nodes.size, 0);
    assert.equal(e.document.body.getAttribute(attribute), null);
  }
});

for (const failure of ['theme', 'stylesheet']) {
  test(`${failure} failure rolls back the plugin without interrupting DSH`, () => {
    const e = environment({ failure });
    assert.doesNotThrow(e.load);
    assert.deepEqual([...e.layers], [e.nativeLayer]);
    assert.equal(e.nodes.size, 0);
    assert.equal(e.document.body.getAttribute(attribute), null);
    assert.equal(e.warnings.length, 1);
    assert.doesNotThrow(e.dispose);
  });
}

test('unavailable DOM or service leaves the application untouched', () => {
  for (const options of [{ missingBody: true }, { missingHead: true }, {}]) {
    const e = environment(options);
    if (!options.missingBody && !options.missingHead) e.ctx.theme = undefined;
    assert.doesNotThrow(e.load);
    assert.deepEqual([...e.layers], [e.nativeLayer]);
    assert.equal(e.nodes.size, 0);
  }
});

test('only verified tokens change; code fonts, text sizes and semantic status colors remain owned by DSH', async () => {
  const { tokens } = await compile();
  const contract = JSON.parse(readFileSync(new URL('../docs/host-contract.json', import.meta.url)));
  assert.deepEqual(Object.keys(tokens).sort(), contract.supported_tokens);
  for (const [name, pair] of Object.entries(tokens)) {
    assert.doesNotMatch(name, /state-(error|success|warn)|(?:code|file)-diff|font-size/);
    assert.notEqual(name, '--ds-font-family-code');
    assert.deepEqual(Object.keys(pair).sort(), ['dark', 'light']);
  }
});

test('skin CSS is scoped, has no layout mutations or external resources, and respects reduced motion', async () => {
  const { css, client } = await compile();
  const text = css.replace(/\/\*[\s\S]*?\*\//g, '');
  for (const [, selector, declarations] of text.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    if (selector.trim() === '@font-face') continue;
    assert.ok(selector.trim().startsWith('body[data-dsh-claude-skin]'), selector);
    assert.doesNotMatch(declarations, /(?:^|;)\s*(?:display|position|width|height|padding|margin|pointer-events|overflow|z-index|font-size)\s*:/);
  }
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.doesNotMatch(client, /\b(?:fetch|XMLHttpRequest|WebSocket|localStorage|sessionStorage|eval)\s*[.(]/);
  assert.doesNotMatch(css, /url\s*\(|@import/);
  assert.equal((css.match(/@font-face/g) || []).length, 4);
});

test('Claude Sans and Serif cover regular/italic faces; distributed build contains references, no font binaries', async () => {
  const { css, tokens, fonts } = await compile();
  assert.equal(faces.length, 4);
  assert.match(tokens['--dsw-font-family'].light, /DSH Claude Sans/);
  assert.match(tokens['--dsw-font-markdown-base-font-family'].light, /DSH Claude Serif/);
  assert.deepEqual(fonts, []);
  assert.doesNotMatch(css, /data:font|https?:/);
  for (const face of faces) {
    assert.ok(css.includes(`font-family: "${face.family}"`));
    for (const name of face.local) assert.ok(css.includes(`local("${name}")`));
  }
});

function luminance(hex) {
  const channels = hex.slice(1).match(/../g).map(channel => parseInt(channel, 16) / 255)
    .map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4);
  return channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722;
}

test('primary, secondary, caption, link, and send text meet 4.5:1 in both modes', async () => {
  const { tokens } = await compile();
  for (const mode of ['light', 'dark']) {
    const pairs = [
      ['--dsw-alias-label-primary', '--dsw-alias-bg-base'],
      ['--dsw-alias-label-secondary', '--dsw-specific-sidebar-fill'],
      ['--dsw-alias-label-caption', '--dsw-specific-input-major'],
      ['--dsw-alias-link', '--dsw-alias-bg-base'],
      ['--dsw-alias-label-primary-foreground', '--dsw-alias-button-info-fill'],
    ];
    for (const [foreground, background] of pairs) {
      const values = [foreground, background].map(name => luminance(tokens[name][mode])).sort((a, b) => b - a);
      const ratio = (values[0] + .05) / (values[1] + .05);
      assert.ok(ratio >= 4.5, `${mode}: ${foreground}/${background} = ${ratio.toFixed(2)}`);
    }
  }
});
