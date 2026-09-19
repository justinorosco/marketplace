"use strict";
(function () {
  const form = document.getElementById("publish-form");
  const imageInput = document.getElementById("publish-image");
  const preview = document.getElementById("publish-preview");
  const dropCopy = document.getElementById("publish-drop-copy");
  const drop = document.getElementById("publish-drop");
  const live = document.getElementById("publish-live-preview");
  function fillLive() {
    if (!live) return;
    const title = document.getElementById("publish-title");
    const price = document.getElementById("publish-price");
    const condition = document.getElementById("publish-condition");
    const category = document.getElementById("publish-category");
    const desc = document.getElementById("publish-desc");
    live.hidden = false;
    document.getElementById("publish-live-title").textContent = title instanceof HTMLInputElement ? title.value || "Título" : "";
    document.getElementById("publish-live-price").textContent = price instanceof HTMLInputElement && price.value ? "$" + price.value : "$0";
    document.getElementById("publish-live-meta").textContent =
      (condition instanceof HTMLSelectElement ? condition.value : "") + " · " + (category instanceof HTMLSelectElement ? category.value : "");
    document.getElementById("publish-live-desc").textContent = desc instanceof HTMLTextAreaElement ? desc.value : "";
    const liveImg = document.getElementById("publish-live-img");
    if (liveImg instanceof HTMLImageElement && preview instanceof HTMLImageElement && !preview.hidden) {
      liveImg.src = preview.src;
      liveImg.hidden = false;
    }
  }
  document.getElementById("publish-preview-btn")?.addEventListener("click", fillLive);

  function showPreview(file) {
    if (!file || !(preview instanceof HTMLImageElement)) return;
    const url = URL.createObjectURL(file);
    preview.src = url;
    preview.hidden = false;
    if (dropCopy) dropCopy.hidden = true;
  }

  imageInput?.addEventListener("change", () => {
    if (imageInput instanceof HTMLInputElement && imageInput.files && imageInput.files[0]) {
      showPreview(imageInput.files[0]);
    }
  });

  drop?.addEventListener("dragover", (event) => {
    event.preventDefault();
    drop.classList.add("is-over");
  });
  drop?.addEventListener("dragleave", () => drop.classList.remove("is-over"));
  drop?.addEventListener("drop", (event) => {
    event.preventDefault();
    drop.classList.remove("is-over");
    const file = event.dataTransfer && event.dataTransfer.files[0];
    if (!file) return;
    if (imageInput instanceof HTMLInputElement) {
      const dt = new DataTransfer();
      dt.items.add(file);
      imageInput.files = dt.files;
    }
    showPreview(file);
  });

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = document.getElementById("publish-title");
    const price = document.getElementById("publish-price");
    const condition = document.getElementById("publish-condition");
    if (!(title instanceof HTMLInputElement) || !(price instanceof HTMLInputElement) || !(condition instanceof HTMLSelectElement)) {
      return;
    }
    if (!title.value.trim() || !price.value || !condition.value) {
      if (statusEl) statusEl.textContent = "Completá título, precio y estado.";
      return;
    }
    if (statusEl) statusEl.textContent = "Producto publicado. Ya pueden verlo los compradores (simulado).";
    if (window.mixpanel) {
      window.mixpanel.track("Product Published", { title: title.value.trim(), condition: condition.value });
    }
    form.reset();
    if (preview) preview.hidden = true;
    if (dropCopy) dropCopy.hidden = false;
  });
})();
