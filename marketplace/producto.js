"use strict";
(function () {
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));
  const fallbackDetail = {
    name: "Producto no encontrado",
    price: "",
    image: "",
    imgAlt: "Producto no encontrado",
    location: "",
    category: "Producto",
    condition: "Usado - Buen estado",
    description: "No pudimos encontrar este producto. Vuelve a MarketPlace e intenta de nuevo.",
    seller: { name: "Vendedor MarketPlace", rating: 4.5, sales: 10, memberSince: "2023" },
    payment: ["Efectivo", "Transferencia bancaria"],
    reviews: [],
  };
  const detail =
    typeof PRODUCTS_DETAIL !== "undefined" && PRODUCTS_DETAIL[id] ? PRODUCTS_DETAIL[id] : fallbackDetail;

  const name = detail.name;
  const price = detail.price;
  const img = detail.image;
  const imgAlt = detail.imgAlt || name;
  const location = detail.location;

  document.title = `${name} — MarketPlace`;

  const imageEl = document.getElementById("product-dialog-image");
  if (imageEl instanceof HTMLImageElement) {
    imageEl.src = img;
    imageEl.alt = imgAlt;
  }
  const categoryEl = document.getElementById("product-dialog-category");
  if (categoryEl) categoryEl.textContent = detail.category;
  const conditionEl = document.getElementById("product-dialog-condition");
  if (conditionEl) conditionEl.textContent = detail.condition;
  const titleEl = document.getElementById("product-dialog-title");
  if (titleEl) titleEl.textContent = name;
  const priceEl = document.getElementById("product-dialog-price");
  if (priceEl) priceEl.textContent = price;
  const locationEl = document.getElementById("product-dialog-location");
  if (locationEl) {
    locationEl.innerHTML = "";
    const locTxt = document.createTextNode((location || "") + " · ");
    const mapLink = document.createElement("a");
    mapLink.href = "mapa.html?city=" + encodeURIComponent(location || "");
    mapLink.textContent = "Ver en mapa";
    locationEl.appendChild(locTxt);
    locationEl.appendChild(mapLink);
  }
  const descriptionEl = document.getElementById("product-dialog-description");
  if (descriptionEl) descriptionEl.textContent = detail.description;
  const sellerNameEl = document.getElementById("product-dialog-seller-name");
  if (sellerNameEl) sellerNameEl.textContent = detail.seller.name;
  const sellerRatingEl = document.getElementById("product-dialog-seller-rating");
  if (sellerRatingEl) {
    sellerRatingEl.textContent = `${detail.seller.rating.toFixed(1)} ★ (${detail.seller.sales} ventas) · Miembro desde ${detail.seller.memberSince}`;
  }
  const paymentEl = document.getElementById("product-dialog-payment");
  if (paymentEl) paymentEl.textContent = detail.payment.join(", ");

  function starString(count) {
    const full = Math.max(0, Math.min(5, Math.round(count)));
    return "★".repeat(full) + "☆".repeat(5 - full);
  }

  const reviews = detail.reviews || [];
  const avg = reviews.length ? reviews.reduce((sum, r) => sum + r.stars, 0) / reviews.length : 0;

  const starsEl = document.getElementById("product-dialog-stars");
  if (starsEl) starsEl.textContent = starString(avg);
  const ratingCountEl = document.getElementById("product-dialog-rating-count");
  if (ratingCountEl) {
    ratingCountEl.textContent = reviews.length
      ? `${avg.toFixed(1)} (${reviews.length} opiniones)`
      : "Sin opiniones todavía";
  }

  const reviewsListEl = document.getElementById("product-reviews-list");
  if (reviewsListEl) {
    if (reviews.length === 0) {
      const empty = document.createElement("p");
      empty.textContent = "Este producto todavía no tiene opiniones.";
      reviewsListEl.appendChild(empty);
    } else {
      reviews.forEach((review) => {
        const item = document.createElement("div");
        item.className = "review-item";

        const header = document.createElement("div");
        header.className = "review-header";

        const author = document.createElement("span");
        author.className = "review-author";
        author.textContent = review.author;

        const stars = document.createElement("span");
        stars.className = "review-stars";
        stars.textContent = starString(review.stars);

        header.appendChild(author);
        header.appendChild(stars);

        const comment = document.createElement("p");
        comment.className = "review-comment";
        comment.textContent = review.comment;

        item.appendChild(header);
        item.appendChild(comment);
        reviewsListEl.appendChild(item);
      });
    }
  }

  const statusEl = document.getElementById("product-dialog-status");

  const addCartBtn = document.getElementById("product-dialog-add-cart");
  addCartBtn?.addEventListener("click", () => {
    if (typeof addToCart === "function") {
      addToCart({ id: String(Number.isFinite(id) ? id : name), name: name, price: price, image: img });
    }
    if (statusEl) statusEl.textContent = "Agregado al carrito ✓";
    if (window.mixpanel) {
      window.mixpanel.track("Add to Cart", { product: name, price: price });
    }
  });

  const contactBtn = document.getElementById("product-dialog-contact");
  contactBtn?.addEventListener("click", () => {
    if (statusEl) statusEl.textContent = "Mensaje enviado al vendedor ✓";
    if (window.mixpanel) {
      window.mixpanel.track("Contact Seller Clicked", { product: name });
    }
  });

  if (window.mixpanel) {
    window.mixpanel.track("Product Detail Viewed", { product: name, price: price });
  }

  if (window.MP) window.MP.pushRecent(id);
  const stockEl = document.getElementById("product-stock");
  if (stockEl) {
    const stock = detail.stock == null ? 4 : detail.stock;
    stockEl.textContent = stock <= 3 ? "Quedan " + stock : "Stock: " + stock;
  }

  const pick = document.getElementById("star-pick");
  const saved = window.MP ? Number(window.MP.ratings()[String(id)] || 0) : 0;
  function paintStars(n) {
    if (!pick) return;
    pick.innerHTML = "";
    for (let i = 1; i <= 5; i += 1) {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = "★";
      b.className = i <= n ? "is-on" : "";
      b.setAttribute("aria-label", i + " estrellas");
      b.addEventListener("click", () => {
        if (window.MP) window.MP.setRating(id, i);
        paintStars(i);
        if (typeof showToast === "function") showToast("Calificaste con " + i + " estrellas");
      });
      pick.appendChild(b);
    }
  }
  paintStars(saved || Math.round(avg));

  document.getElementById("product-share")?.addEventListener("click", async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      if (typeof showToast === "function") showToast("Enlace copiado");
      if (statusEl) statusEl.textContent = "Enlace copiado ✓";
    } catch {
      if (statusEl) statusEl.textContent = url;
    }
  });
  document.getElementById("product-alert")?.addEventListener("click", () => {
    if (window.MP) window.MP.addAlert({ id: id, name: name, price: price });
    if (typeof showToast === "function") showToast("Te avisamos si baja el precio");
  });
  const favBtn = document.getElementById("product-fav");
  function paintFav() {
    if (!favBtn || !window.MP) return;
    favBtn.textContent = window.MP.isFav(id) ? "En favoritos" : "Favorito";
  }
  paintFav();
  favBtn?.addEventListener("click", () => {
    if (window.MP) window.MP.toggleFav(id);
    paintFav();
  });

  const followBtn = document.getElementById("follow-seller");
  const sellerName = detail.seller && detail.seller.name;
  function paintFollow() {
    if (!followBtn || !window.MP || !sellerName) return;
    followBtn.textContent = window.MP.isFollowing(sellerName) ? "Siguiendo" : "Seguir vendedor";
  }
  paintFollow();
  followBtn?.addEventListener("click", () => {
    if (!window.MP || !sellerName) return;
    const on = window.MP.toggleFollow(sellerName);
    paintFollow();
    if (typeof showToast === "function") showToast(on ? "Ahora seguís a " + sellerName : "Dejaste de seguir a " + sellerName);
  });

  if (window.MP && Number.isFinite(id)) {
    const recHost = document.getElementById("te-puede-interesar");
    const recs = window.MP.catalog()
      .map((p, i) => Object.assign({ id: i }, p))
      .filter((p) => p.category === detail.category && p.id !== id)
      .slice(0, 6);
    if (recHost && recs.length) {
      window.MP.renderRail("te-puede-interesar", "Te puede interesar", recs.map((p) => p.id));
    }
  }
})();
