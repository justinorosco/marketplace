"use strict";
(function () {
  const params = new URLSearchParams(window.location.search);
  const cat = params.get("cat");
  const tipo = params.get("tipo");

  const all = typeof PRODUCTS_DETAIL !== "undefined" ? PRODUCTS_DETAIL : [];
  let filtered = all.map((product, index) => Object.assign({}, product, { id: index }));
  let title = "Todos los productos";

  if (cat) {
    filtered = filtered.filter((product) => product.category === cat);
    title = `Categoría: ${cat}`;
  } else if (tipo === "ofertas") {
    filtered = filtered.filter((product) => product.section === "ofertas");
    title = "Ofertas del día";
  } else if (tipo === "destacados") {
    filtered = filtered.filter((product) => product.section === "destacados");
    title = "Productos destacados";
  }

  document.title = `${title} — MarketPlace`;

  const titleEl = document.getElementById("productos-page-title");
  if (titleEl) titleEl.textContent = title;

  const countEl = document.getElementById("productos-page-count");
  if (countEl) {
    countEl.textContent = `${filtered.length} producto${filtered.length === 1 ? "" : "s"} encontrado${filtered.length === 1 ? "" : "s"}`;
  }

  const gridEl = document.getElementById("productos-grid");
  const emptyEl = document.getElementById("productos-empty");

  if (filtered.length === 0) {
    if (emptyEl) emptyEl.hidden = false;
    return;
  }

  if (!gridEl) return;

  filtered.forEach((product) => {
    const article = document.createElement("article");
    article.className = "product-card";
    article.tabIndex = 0;
    article.setAttribute("role", "button");
    article.setAttribute("aria-label", `Ver detalle de ${product.name}`);

    const media = document.createElement("div");
    media.className = "product-media";
    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.imgAlt || product.name;
    img.loading = "lazy";
    media.appendChild(img);

    const body = document.createElement("div");
    body.className = "product-body";

    const price = document.createElement("p");
    price.className = "price";
    price.textContent = product.price;

    const name = document.createElement("h3");
    name.className = "product-name";
    name.textContent = product.name;

    const location = document.createElement("p");
    location.className = "product-location";
    location.textContent = product.location;

    body.appendChild(price);
    body.appendChild(name);
    body.appendChild(location);

    article.appendChild(media);
    article.appendChild(body);

    const goToDetail = () => {
      window.location.href = `producto.html?id=${product.id}`;
    };
    article.addEventListener("click", goToDetail);
    article.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        goToDetail();
      }
    });

    gridEl.appendChild(article);
  });
})();
