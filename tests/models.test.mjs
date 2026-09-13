import assert from "node:assert/strict";
import test from "node:test";
import { getModel, modelIds } from "../models.js";

test("each workbook has a complete showcase record", () => {
  assert.deepEqual(modelIds, ["financial", "sales", "marketing", "inventory", "projects"]);

  for (const id of modelIds) {
    const model = getModel(id);
    assert.equal(model.steps.length, 3);
    assert.match(model.file, /^0[1-5]_.*\.xlsx$/);
    assert.ok(model.metrics.every(({ value }) => value.length > 0));
  }
});

test("each model can be explored through an in-page worksheet preview", () => {
  for (const id of modelIds) {
    const model = getModel(id);

    assert.match(model.workspace.sheet, /.+/);
    assert.equal(model.workspace.headers.length, 3);
    assert.equal(model.workspace.rows.length, 3);
    assert.equal(model.workspace.rows.every((row) => row.length === 3), true);
  }
});
