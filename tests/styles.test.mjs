import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("styles include reduced-motion and keyboard-focus support", async () => {
  const css = await readFile(new URL("../styles.css", import.meta.url), "utf8");

  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /@media \(max-width: 700px\)/);
});

test("styles define the approved workbook palette and selected states", async () => {
  const css = await readFile(new URL("../styles.css", import.meta.url), "utf8");

  for (const color of ["#F3F7F9", "#17324D", "#1F6E8C", "#2C9C95", "#FFF2CC", "#D9E2EA"]) {
    assert.match(css, new RegExp(color));
  }
  assert.match(css, /\[aria-selected="true"\]/);
  assert.match(css, /\.workspace-picker button\[aria-pressed="true"\]/);
});

test("motion is limited to model-selection feedback", async () => {
  const css = await readFile(new URL("../styles.css", import.meta.url), "utf8");

  assert.doesNotMatch(css, /\.button\s*\{[^}]*transition/s);
  assert.doesNotMatch(css, /\.model-tabs button\s*\{[^}]*transition/s);
  assert.doesNotMatch(css, /\.catalog-card\s*\{[^}]*transition/s);
  assert.match(css, /\.showcase\.is-updating/);
  assert.match(css, /\.preview-chart span::before/);
  assert.match(css, /\.preview-chart span:not\(:last-child\)::after/);
});

test("model selection restarts the showcase feedback", async () => {
  const app = await readFile(new URL("../app.js", import.meta.url), "utf8");

  assert.match(app, /function restartShowcaseMotion\(\)/);
  assert.match(app, /showcase\.classList\.remove\("is-updating"\)/);
  assert.match(app, /showcase\.classList\.add\("is-updating"\)/);
  assert.match(app, /event\.animationName === "showcase-update"/);
  assert.match(app, /style\.setProperty\("--point", value\)/);
});
