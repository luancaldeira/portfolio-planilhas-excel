import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

test("landing page has the five client-facing model selectors", async () => {
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
  assert.match(html, /<main/);
  assert.match(html, /id="showcase"/);
  assert.match(html, /id="open-workbook"/);
  assert.equal((html.match(/data-model-tab/g) ?? []).length, 5);
  assert.doesNotMatch(html, /cold email|Autor|autoria/i);
});

test("landing page keeps an optional workbook action with public files available", async () => {
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
  const filenames = [
    "01_financial-forecast.xlsx",
    "02_sales-pipeline.xlsx",
    "03_marketing-performance.xlsx",
    "04_inventory-planning.xlsx",
    "05_project-budget.xlsx",
  ];

  assert.match(html, /id="open-workbook"/);

  for (const filename of filenames) {
    await access(new URL(`../${filename}`, import.meta.url));
  }
});

test("model tabs label the active showcase panel", async () => {
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
  const modelIds = ["financial", "sales", "marketing", "inventory", "projects"];

  for (const id of modelIds) {
    assert.match(
      html,
      new RegExp(`<button id="model-tab-${id}" data-model-tab="${id}" role="tab"[^>]*aria-controls="showcase"`),
    );
  }

  assert.match(
    html,
    /<section class="showcase" id="showcase" role="tabpanel"[^>]*aria-labelledby="model-tab-financial"/,
  );
});

test("page removes the redundant explorer after the main showcase", async () => {
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");

  assert.doesNotMatch(html, /class="hero-grid"/);
  assert.doesNotMatch(html, /class="model-workspace"/);
  assert.doesNotMatch(html, /data-workspace-model/);
  assert.doesNotMatch(html, /href="#catalog"/);
  assert.doesNotMatch(html, /id="catalog"/);
});

test("page loads a versioned interactive module for fresh public deployments", async () => {
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
  const app = await readFile(new URL("../app.js", import.meta.url), "utf8");

  assert.match(html, /<link rel="stylesheet" href="styles\.css\?v=[a-z0-9]+">/);
  assert.match(html, /<script type="module" src="app\.js\?v=[a-z0-9]+">/);
  assert.match(app, /from "\.\/models\.js\?v=[a-z0-9]+"/);
});
