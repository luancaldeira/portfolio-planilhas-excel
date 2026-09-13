import { getModel, modelIds } from "./models.js?v=588151c";

const tabs = [...document.querySelectorAll("[data-model-tab]")];
const fields = [...document.querySelectorAll("[data-model-field]")];
const workbookLink = document.querySelector("#open-workbook");
const showcase = document.querySelector("#showcase");

function getFieldValue(model, path) {
  return path.split(".").reduce((value, key) => value?.[key], model);
}

function renderField(field, value, model) {
  if (value === undefined || value === null) return;
  if (field.dataset.modelField.startsWith("visual.bars.")) {
    const pointIndex = Number(field.dataset.modelField.split(".").at(-1));
    const nextValue = model.visual.bars[pointIndex + 1];
    field.style.setProperty("--point", value);
    if (nextValue !== undefined) {
      const rise = ((nextValue - value) / 100) * field.parentElement.clientHeight;
      const run = Math.max(field.offsetWidth, 1);
      const angle = Math.atan2(-rise, run) * (180 / Math.PI);
      const length = Math.hypot(run, rise);
      field.style.setProperty("--segment-angle", String(angle) + "deg");
      field.style.setProperty("--segment-length", String(length) + "px");
    }
    return;
  }
  if (field.hasAttribute("aria-label")) {
    field.setAttribute("aria-label", value);
    return;
  }
  field.textContent = value;
}

function restartShowcaseMotion() {
  if (!showcase) return;
  showcase.classList.remove("is-updating");
  void showcase.offsetWidth;
  showcase.classList.add("is-updating");
}

function selectModel(id, { focus = false, animate = false } = {}) {
  const selectedId = modelIds.includes(id) ? id : "financial";
  const model = getModel(selectedId);
  document.body.dataset.activeModel = selectedId;
  if (workbookLink) workbookLink.href = model.file;
  fields.forEach((field) => {
    renderField(field, getFieldValue(model, field.dataset.modelField), model);
  });

  tabs.forEach((tab) => {
    const isSelected = tab.dataset.modelTab === selectedId;
    tab.setAttribute("aria-selected", String(isSelected));
    tab.tabIndex = isSelected ? 0 : -1;
    if (isSelected && focus) tab.focus();
  });
  const selectedTab = tabs.find((tab) => tab.dataset.modelTab === selectedId);
  if (showcase && selectedTab?.id) showcase.setAttribute("aria-labelledby", selectedTab.id);
  if (animate) restartShowcaseMotion();
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => selectModel(tab.dataset.modelTab, { focus: true, animate: true }));
  tab.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const currentIndex = tabs.indexOf(tab);
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (currentIndex + direction + tabs.length) % tabs.length;
    selectModel(tabs[nextIndex].dataset.modelTab, { focus: true, animate: true });
  });
});

showcase?.addEventListener("animationend", (event) => {
  if (event.target === showcase && event.animationName === "showcase-update") showcase.classList.remove("is-updating");
});

selectModel(document.body.dataset.activeModel || "financial");
