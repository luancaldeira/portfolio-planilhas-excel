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
