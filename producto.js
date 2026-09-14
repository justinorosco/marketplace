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
  if (locationEl) locationEl.textContent = location;
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
    if (typeof addToCart === "function") addToCart();
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
})();
