"use strict";
(function () {
  const CART_ITEMS_KEY = "marketplace_cart_items";
  const CART_COUNT_KEY = "marketplace_cart_count";
  const listEl = document.getElementById("cart-list");
  const emptyEl = document.getElementById("cart-empty");
  const layoutEl = document.getElementById("cart-layout");
  const totalEl = document.getElementById("cart-total");
  const subtotalEl = document.getElementById("cart-subtotal");
  const payBtn = document.getElementById("cart-pay");
  const statusEl = document.getElementById("cart-pay-status");
  const countLabel = document.getElementById("cart-count-label");
  const cardBox = document.getElementById("card-box");
  const bankBox = document.getElementById("bank-box");
  const cardNumber = document.getElementById("card-number");
  const couponLine = document.getElementById("coupon-line");
  const couponOff = document.getElementById("coupon-off");
  const couponInput = document.getElementById("coupon-input");
  const laterList = document.getElementById("later-list");
  const laterEmpty = document.getElementById("later-empty");
  let couponOn = false;

  function laterItems() {
    return window.MP ? window.MP.later() : [];
  }
  function setLater(items) {
    if (window.MP) window.MP.setLater(items);
  }

  function imageForItem(item) {
    if (item && item.image) return item.image;
    const name = item && item.name ? String(item.name).trim() : "";
    if (typeof PRODUCTS_DETAIL !== "undefined" && name) {
      const found = PRODUCTS_DETAIL.find((product) => product.name === name);
      if (found && found.image) return found.image;
    }
    return "";
  }

  function readItems() {
    try {
      const raw = localStorage.getItem(CART_ITEMS_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function writeItems(items) {
    localStorage.setItem(CART_ITEMS_KEY, JSON.stringify(items));
    const qty = items.reduce((sum, item) => sum + Number(item.qty || 0), 0);
    localStorage.setItem(CART_COUNT_KEY, String(qty));
    if (typeof renderCartBadge === "function") renderCartBadge();
  }

  function priceNumber(price) {
    const n = Number(String(price).replace(/[^0-9]/g, ""));
    return Number.isFinite(n) ? n : 0;
  }

  function setQty(id, nextQty) {
    const items = readItems();
    const row = items.find((item) => item.id === id);
    if (!row) return;
    if (nextQty < 1) {
      if (!window.confirm("¿Eliminar este producto del carrito?")) return;
      writeItems(items.filter((item) => item.id !== id));
    } else {
      row.qty = nextQty;
      writeItems(items);
    }
    render();
  }

  function render() {
    const items = readItems();
    if (!listEl) return;
    listEl.innerHTML = "";

    if (items.length === 0) {
      if (emptyEl) emptyEl.hidden = false;
      if (layoutEl) layoutEl.hidden = true;
      renderLater();
      return;
    }

    if (emptyEl) emptyEl.hidden = true;
    if (layoutEl) layoutEl.hidden = false;

    let total = 0;
    items.forEach((item) => {
      const qty = Number(item.qty) || 1;
      const unit = priceNumber(item.price);
      const line = unit * qty;
      total += line;

      const li = document.createElement("li");
      li.className = "cart-item";
      li.innerHTML =
        '<img alt="" class="cart-item-img" />' +
        '<div class="cart-item-info"><h2></h2><p class="cart-item-meta"></p>' +
        '<div class="cart-qty"><button type="button" data-act="minus" aria-label="Quitar uno">−</button>' +
        '<span class="cart-qty-n"></span>' +
        '<button type="button" data-act="plus" aria-label="Agregar uno">+</button></div></div>' +
        '<div class="cart-item-side"><p class="cart-item-line"></p>' +
        '<button class="cart-item-remove" type="button">Eliminar</button>' +
        '<button class="btn btn-secondary" data-act="later" type="button">Guardar para después</button></div>';
      const img = li.querySelector("img");
      if (img instanceof HTMLImageElement) {
        img.src = imageForItem(item);
        img.alt = item.name || "Producto";
      }
      const title = li.querySelector("h2");
      if (title) title.textContent = item.name || "Producto";
      const meta = li.querySelector(".cart-item-meta");
      if (meta) meta.textContent = item.price || "";
      const qtyN = li.querySelector(".cart-qty-n");
      if (qtyN) qtyN.textContent = String(qty);
      const lineEl = li.querySelector(".cart-item-line");
      if (lineEl) lineEl.textContent = "$" + line;
      li.querySelector('[data-act="minus"]')?.addEventListener("click", () => setQty(item.id, qty - 1));
      li.querySelector('[data-act="plus"]')?.addEventListener("click", () => setQty(item.id, qty + 1));
      li.querySelector(".cart-item-remove")?.addEventListener("click", () => setQty(item.id, 0));
      li.querySelector('[data-act="later"]')?.addEventListener("click", () => {
        const next = laterItems().concat([item]);
        setLater(next);
        writeItems(readItems().filter((row) => row.id !== item.id));
        render();
      });
      listEl.appendChild(li);
    });

    let payTotal = total;
    if (couponOn) payTotal = Math.round(total * 0.9);
    if (couponLine) couponLine.hidden = !couponOn;
    if (couponOff) couponOff.textContent = couponOn ? "-$" + (total - payTotal) : "$0";
    if (totalEl) totalEl.textContent = "$" + payTotal;
    if (subtotalEl) subtotalEl.textContent = "$" + total;
    if (countLabel) {
      const n = items.reduce((sum, item) => sum + (Number(item.qty) || 1), 0);
      countLabel.textContent = String(n);
    }
    renderLater();
  }

  function renderLater() {
    const rows = laterItems();
    if (laterList) laterList.innerHTML = "";
    if (laterEmpty) laterEmpty.hidden = rows.length > 0;
    rows.forEach((item) => {
      const li = document.createElement("li");
      li.className = "cart-item";
      li.innerHTML = "<img class=\"cart-item-img\" alt=\"\"/><div class=\"cart-item-info\"><h2></h2></div><button class=\"btn btn-secondary\" type=\"button\">Volver al carrito</button>";
      const img = li.querySelector("img");
      if (img) {
        img.src = imageForItem(item);
        img.alt = item.name;
      }
      li.querySelector("h2").textContent = item.name;
      li.querySelector("button")?.addEventListener("click", () => {
        const items = readItems();
        items.push(item);
        writeItems(items);
        setLater(laterItems().filter((row) => row.id !== item.id));
        render();
      });
      laterList.appendChild(li);
    });
  }

  function selectedPay() {
    const checked = document.querySelector('input[name="pay"]:checked');
    return checked instanceof HTMLInputElement ? checked.value : "transfer";
  }

  function togglePayPanels() {
    const method = selectedPay();
    if (cardBox) cardBox.hidden = method !== "card";
    if (bankBox) bankBox.hidden = method !== "transfer";
  }

  document.querySelectorAll('input[name="pay"]').forEach((el) => {
    el.addEventListener("change", togglePayPanels);
  });

  cardNumber?.addEventListener("input", () => {
    if (!(cardNumber instanceof HTMLInputElement)) return;
    const digits = cardNumber.value.replace(/\D/g, "").slice(0, 16);
    cardNumber.value = digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
  });

  const cardExp = document.getElementById("card-exp");
  cardExp?.addEventListener("input", () => {
    if (!(cardExp instanceof HTMLInputElement)) return;
    let v = cardExp.value.replace(/\D/g, "").slice(0, 4);
    if (v.length >= 3) v = v.slice(0, 2) + "/" + v.slice(2);
    cardExp.value = v;
  });

  payBtn?.addEventListener("click", () => {
    const items = readItems();
    if (items.length === 0) return;
    const method = selectedPay();
    if (method === "card") {
      const number = cardNumber instanceof HTMLInputElement ? cardNumber.value.replace(/\s/g, "") : "";
      const name = document.getElementById("card-name");
      const exp = document.getElementById("card-exp");
      const cvv = document.getElementById("card-cvv");
      const nameOk = name instanceof HTMLInputElement && name.value.trim().length > 3;
      const expOk = exp instanceof HTMLInputElement && /^\d{2}\/\d{2}$/.test(exp.value);
      const cvvOk = cvv instanceof HTMLInputElement && /^\d{3,4}$/.test(cvv.value);
      if (number.length < 16 || !nameOk || !expOk || !cvvOk) {
        if (statusEl) statusEl.textContent = "Completá los datos de la tarjeta para pagar.";
        return;
      }
    }
    const label = method === "card" ? "tarjeta" : method === "cash" ? "efectivo contra entrega" : "transferencia bancaria";
    if (window.MP) {
      window.MP.addHistory({
        at: new Date().toISOString(),
        method: label,
        total: document.getElementById("cart-total") ? document.getElementById("cart-total").textContent : "",
        items: items.map((row) => ({ id: row.id, name: row.name, qty: row.qty, price: row.price, image: row.image })),
      });
    }
    if (statusEl) {
      statusEl.textContent = "Compra confirmada. Pago con " + label + ".";
    }
    if (window.mixpanel) {
      window.mixpanel.track("Checkout Pay Clicked", { items: items.length, method: method });
    }
    writeItems([]);
    window.setTimeout(render, 1200);
  });

  document.getElementById("coupon-apply")?.addEventListener("click", () => {
    const v = couponInput instanceof HTMLInputElement ? couponInput.value.trim().toUpperCase() : "";
    couponOn = v === "DENNY10";
    if (statusEl) statusEl.textContent = couponOn ? "Cupón DENNY10 aplicado (−10%)." : "Cupón no válido.";
    render();
  });
  document.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const val = btn.getAttribute("data-copy") || "";
      try {
        await navigator.clipboard.writeText(val);
        if (typeof showToast === "function") showToast("Cuenta copiada");
      } catch {
        if (statusEl) statusEl.textContent = val;
      }
    });
  });
  togglePayPanels();
  render();
})();
