"use strict";
(function () {
  const params = new URLSearchParams(window.location.search);
  const cat = params.get("cat");
  const tipo = params.get("tipo");
  const all = typeof PRODUCTS_DETAIL !== "undefined" ? PRODUCTS_DETAIL : [];
  const source = all.map((product, index) => Object.assign({}, product, { id: index }));

  let title = "Todos los productos";
  let base = source.slice();
  if (cat) {
    base = source.filter((product) => product.category === cat);
    title = "Categoría: " + cat;
  } else if (tipo === "ofertas") {
    base = source.filter((product) => product.section === "ofertas");
    title = "Ofertas del día";
  } else if (tipo === "destacados") {
    base = source.filter((product) => product.section === "destacados");
    title = "Productos destacados";
  }

  document.title = title + " — MarketPlace";
  const titleEl = document.getElementById("productos-page-title");
  if (titleEl) titleEl.textContent = title;

  function priceOf(p) {
    return Number(String(p.price).replace(/[^0-9]/g, "")) || 0;
  }

  const cities = Array.from(new Set(base.map((p) => p.location))).sort();
  const conditions = Array.from(new Set(base.map((p) => p.condition))).sort();
  const prices = base.map(priceOf);
  const maxPrice = Math.max.apply(null, prices.concat([50]));
  const sliderMax = maxPrice > 2000 ? 2000 : maxPrice;
  const step = sliderMax > 1000 ? 10 : 1;
  const toolbar = document.getElementById("catalog-toolbar");
  if (toolbar) {
    toolbar.innerHTML =
      '<label class="price-filter">Precio <span class="price-filter-value" id="f-price-label">Todos</span>' +
      '<input id="f-price" type="range" min="0" max="' +
      sliderMax +
      '" step="' +
      step +
      '" value="' +
      sliderMax +
      '"/></label>' +
      '<label>Estado<select id="f-cond"><option value="">Todos</option></select></label>' +
      '<label>Ciudad<select id="f-city"><option value="">Todas</option></select></label>' +
      '<label>Ordenar<select id="f-sort"><option value="new">Más nuevo</option><option value="cheap">De menor a mayor</option><option value="exp">De mayor a menor</option></select></label>';
    const condSel = document.getElementById("f-cond");
    conditions.forEach((c) => {
      const o = document.createElement("option");
      o.value = c;
      o.textContent = c;
      condSel.appendChild(o);
    });
    const citySel = document.getElementById("f-city");
    cities.forEach((c) => {
      const o = document.createElement("option");
      o.value = c;
      o.textContent = c;
      citySel.appendChild(o);
    });
  }

  const gridEl = document.getElementById("productos-grid");
  const emptyEl = document.getElementById("productos-empty");
  const countEl = document.getElementById("productos-page-count");
  const priceLabel = document.getElementById("f-price-label");

  function currentMax() {
    const el = document.getElementById("f-price");
    if (!(el instanceof HTMLInputElement)) return maxPrice;
    const v = Number(el.value) || sliderMax;
    if (v >= sliderMax && maxPrice > sliderMax) return maxPrice;
    return v;
  }

  function updatePriceLabel() {
    if (!priceLabel) return;
    const el = document.getElementById("f-price");
    const v = el instanceof HTMLInputElement ? Number(el.value) : sliderMax;
    if (v >= sliderMax && maxPrice > sliderMax) priceLabel.textContent = "Todos";
    else priceLabel.textContent = "Hasta $" + currentMax();
  }

  function currentList() {
    const max = currentMax();
    const cond = document.getElementById("f-cond") instanceof HTMLSelectElement ? document.getElementById("f-cond").value : "";
    const city = document.getElementById("f-city") instanceof HTMLSelectElement ? document.getElementById("f-city").value : "";
    const sort = document.getElementById("f-sort") instanceof HTMLSelectElement ? document.getElementById("f-sort").value : "new";
    let list = base.filter((p) => {
      if (priceOf(p) > max) return false;
      if (cond && p.condition !== cond) return false;
      if (city && p.location !== city) return false;
      return true;
    });
    if (sort === "cheap") list.sort((a, b) => priceOf(a) - priceOf(b));
    else if (sort === "exp") list.sort((a, b) => priceOf(b) - priceOf(a));
    else list.sort((a, b) => b.id - a.id);
    return list;
  }

  function paint() {
    updatePriceLabel();
    const list = currentList();
    if (countEl) countEl.textContent = list.length + (list.length === 1 ? " producto encontrado" : " productos encontrados");
    if (!gridEl) return;
    gridEl.innerHTML = "";
    if (list.length === 0) {
      if (emptyEl) {
        emptyEl.hidden = false;
        emptyEl.innerHTML = 'No hay productos con esos filtros. <a class="btn btn-primary" href="productos.html">Ver todos</a>';
      }
      return;
    }
    if (emptyEl) emptyEl.hidden = true;
    list.slice(0, 60).forEach((product) => {
      const article = document.createElement("article");
      article.className = "product-card";
      article.tabIndex = 0;
      article.setAttribute("data-product-index", String(product.id));
      article.setAttribute("role", "button");
      article.setAttribute("aria-label", "Ver detalle de " + product.name);
      article.innerHTML =
        '<div class="product-media"><img alt="" loading="lazy"/></div>' +
        '<div class="product-body"><p class="price"></p><h3 class="product-name"></h3><p class="product-location"></p><p class="product-stock"></p></div>';
      const img = article.querySelector("img");
      if (img) {
        img.src = product.image;
        img.alt = product.imgAlt || product.name;
      }
      article.querySelector(".price").textContent = product.price;
      article.querySelector(".product-name").textContent = product.name;
      article.querySelector(".product-location").textContent = product.location;
      article.querySelector(".product-stock").textContent = product.stock <= 3 ? "Quedan " + product.stock : "Stock: " + product.stock;
      const go = () => {
        window.location.href = "producto.html?id=" + product.id;
      };
      article.addEventListener("click", go);
      article.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          go();
        }
      });
      gridEl.appendChild(article);
    });
  }

  document.getElementById("f-price")?.addEventListener("input", paint);
  ["f-cond", "f-city", "f-sort"].forEach((id) => {
    document.getElementById(id)?.addEventListener("change", paint);
  });
  paint();
})();
