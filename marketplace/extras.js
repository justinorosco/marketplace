"use strict";
(function () {
  const K = {
    theme: "marketplace_theme",
    user: "marketplace_user_name",
    email: "marketplace_user_email",
    favs: "marketplace_fav_ids",
    recent: "marketplace_recent_ids",
    later: "marketplace_later",
    history: "marketplace_history",
    alerts: "marketplace_alerts",
    ratings: "marketplace_ratings",
    coupon: "marketplace_coupon",
    following: "marketplace_following",
  };

  function readJson(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return fallback;
      const parsed = JSON.parse(raw);
      return parsed == null ? fallback : parsed;
    } catch {
      return fallback;
    }
  }
  function writeJson(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* ignore */
    }
  }
  function catalog() {
    return typeof PRODUCTS_DETAIL !== "undefined" ? PRODUCTS_DETAIL : [];
  }
  function productAt(id) {
    const n = Number(id);
    return catalog()[n] ? Object.assign({ id: n }, catalog()[n]) : null;
  }
  function priceOf(product) {
    const n = Number(String(product && product.price ? product.price : "").replace(/[^0-9]/g, ""));
    return Number.isFinite(n) ? n : 0;
  }
  function toast(msg) {
    if (typeof showToast === "function") showToast(msg);
  }

  const SUN = "☀️";
  const MOON = "🌙";
  function applyTheme() {
    const theme = localStorage.getItem(K.theme) === "dark" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    const btn = document.getElementById("theme-toggle");
    if (btn) {
      btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
      btn.setAttribute("aria-label", theme === "dark" ? "Modo oscuro. Cambiar a claro" : "Modo claro. Cambiar a oscuro");
      btn.title = theme === "dark" ? "Modo oscuro" : "Modo claro";
      btn.textContent = theme === "dark" ? MOON : SUN;
    }
  }
  applyTheme();

  const headerInner = document.querySelector(".header-inner");
  if (headerInner && !document.getElementById("header-tools")) {
    const tools = document.createElement("div");
    tools.className = "header-tools";
    tools.id = "header-tools";
    tools.innerHTML =
      '<button class="icon-tool-btn" id="theme-toggle" type="button">☀️</button>' +
      '<span class="notif-item"><button class="icon-tool-btn" id="notif-toggle" type="button" aria-expanded="false" aria-haspopup="true" aria-label="Notificaciones"><svg aria-hidden="true" class="icon" fill="none" focusable="false" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9" stroke-linejoin="round"></path><path d="M10 21a2 2 0 0 0 4 0" stroke-linecap="round"></path></svg><span class="notif-dot" id="notif-dot" hidden></span></button><div class="notif-panel" id="notif-panel" hidden></div></span>';
    headerInner.appendChild(tools);
  }
  applyTheme();

  document.getElementById("theme-toggle")?.addEventListener("click", () => {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    localStorage.setItem(K.theme, next);
    applyTheme();
  });

  if (!document.getElementById("back-to-top")) {
    const topBtn = document.createElement("button");
    topBtn.id = "back-to-top";
    topBtn.className = "back-to-top";
    topBtn.type = "button";
    topBtn.hidden = true;
    topBtn.textContent = "↑ Arriba";
    document.body.appendChild(topBtn);
    topBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    window.addEventListener("scroll", () => {
      topBtn.hidden = window.scrollY < 420;
    });
  }

  const favLink = document.getElementById("favorites-link");
  if (favLink instanceof HTMLAnchorElement) {
    favLink.href = "favoritos.html";
  }

  document.getElementById("login-form")?.addEventListener("submit", () => {
    const email = document.getElementById("login-email");
    if (email instanceof HTMLInputElement && email.value.includes("@")) {
      localStorage.setItem(K.email, email.value.trim());
      const existing = (localStorage.getItem(K.user) || "").trim();
      if (!existing) {
        const local = email.value.trim().split("@")[0] || "";
        localStorage.setItem(K.user, local.split(/[._-]/)[0] || local);
      }
    }
    window.setTimeout(paintAccountChip, 0);
  });

  function profileFromSession() {
    const email = (localStorage.getItem(K.email) || "").trim();
    const raw = (localStorage.getItem(K.user) || "").trim();
    const local = email.split("@")[0] || "";
    const source = raw || local || "Cuenta";
    const first = source.split(/[\s._-]+/).filter(Boolean)[0] || "Cuenta";
    const display = first.charAt(0).toUpperCase() + first.slice(1);
    const letter = (display.charAt(0) || "U").toUpperCase();
    return { display: display, letter: letter };
  }

  function ensureBrandAccount() {
    const brand = document.querySelector(".brand");
    if (!brand || document.getElementById("brand-account")) return;
    const inner = brand.closest(".header-inner") || brand.parentNode;
    const wrap = document.createElement("div");
    wrap.className = "brand-cluster";
    const box = document.createElement("div");
    box.id = "brand-account";
    box.className = "brand-account";
    box.hidden = true;
    box.innerHTML =
      '<button type="button" class="account-menu-toggle" id="brand-account-toggle" aria-expanded="false" aria-haspopup="menu" aria-label="Mi cuenta"><span class="account-avatar" id="brand-avatar">J</span></button>' +
      '<div class="account-menu-card" id="brand-account-menu" hidden>' +
      '<div class="account-menu-head"><span class="account-avatar" id="brand-menu-letter">J</span><div><strong id="brand-menu-name"></strong><small id="brand-menu-email"></small></div></div>' +
      '<ul role="menu">' +
      '<li role="none"><a href="perfil.html" role="menuitem"><svg aria-hidden="true" class="icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.5"></circle><path d="M4.5 20c1.5-3.5 5-5 7.5-5s6 1.5 7.5 5" stroke-linecap="round"></path></svg>Mi perfil</a></li>' +
      '<li role="none"><a href="historial.html" role="menuitem"><svg aria-hidden="true" class="icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h10" stroke-linecap="round"></path></svg>Mis compras</a></li>' +
      '<li role="none"><a href="ajustes.html" role="menuitem"><svg aria-hidden="true" class="icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"></circle><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4" stroke-linecap="round"></path></svg>Ajustes</a></li>' +
      '<li role="none" class="account-menu-sep"><a href="#" id="brand-logout" role="menuitem"><svg aria-hidden="true" class="icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M10 7V5a2 2 0 0 1 2-2h7v18h-7a2 2 0 0 1-2-2v-2M4 12h12M8 8l-4 4 4 4" stroke-linecap="round" stroke-linejoin="round"></path></svg>Cerrar sesión</a></li>' +
      "</ul></div>";
    wrap.appendChild(box);
    wrap.appendChild(brand);
    inner.insertBefore(wrap, inner.firstChild);
    const btn = document.getElementById("brand-account-toggle");
    const menu = document.getElementById("brand-account-menu");
    function closeBrand() {
      if (!menu || !btn) return;
      menu.setAttribute("hidden", "");
      btn.setAttribute("aria-expanded", "false");
    }
    btn?.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      const open = !menu.hasAttribute("hidden");
      if (open) closeBrand();
      else {
        menu.removeAttribute("hidden");
        btn.setAttribute("aria-expanded", "true");
      }
    });
    menu?.addEventListener("click", function (event) {
      event.stopPropagation();
    });
    document.addEventListener("click", closeBrand);
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeBrand();
    });
    document.getElementById("brand-logout")?.addEventListener("click", function (event) {
      event.preventDefault();
      try {
        localStorage.removeItem("marketplace_logged_in");
      } catch {
        /* ignore */
      }
      closeBrand();
      if (typeof window.renderSessionState === "function") window.renderSessionState();
      else paintAccountChip();
    });
  }

  function paintAccountChip() {
    ensureBrandAccount();
    const logged = localStorage.getItem("marketplace_logged_in") === "true";
    const navAcc = document.getElementById("nav-account-item");
    if (navAcc) navAcc.hidden = true;
    const box = document.getElementById("brand-account");
    if (box) box.hidden = !logged;
    if (!logged) return;
    const profile = profileFromSession();
    const avatar = document.getElementById("brand-avatar");
    if (avatar) avatar.textContent = profile.letter;
    const menuLetter = document.getElementById("brand-menu-letter");
    if (menuLetter) menuLetter.textContent = profile.letter;
    const menuName = document.getElementById("brand-menu-name");
    if (menuName) menuName.textContent = profile.display;
    const menuEmail = document.getElementById("brand-menu-email");
    if (menuEmail) {
      const mail = localStorage.getItem(K.email) || "";
      menuEmail.textContent = mail;
      menuEmail.hidden = !mail;
    }
    const btn = document.getElementById("brand-account-toggle");
    if (btn) btn.setAttribute("aria-label", "Cuenta de " + profile.display);
  }
  paintAccountChip();
  const prevSession = window.renderSessionState;
  window.renderSessionState = function () {
    if (typeof prevSession === "function") prevSession();
    paintAccountChip();
  };

  function favIds() {
    return readJson(K.favs, []).map(Number);
  }
  function setFavs(ids) {
    writeJson(K.favs, ids);
  }
  function isFav(id) {
    return favIds().includes(Number(id));
  }
  function toggleFav(id) {
    const n = Number(id);
    const ids = favIds();
    const next = ids.includes(n) ? ids.filter((x) => x !== n) : ids.concat(n);
    setFavs(next);
    return next.includes(n);
  }

  document.querySelectorAll(".product-card[data-product-index]").forEach((card) => {
    const id = card.getAttribute("data-product-index");
    const btn = card.querySelector(".favorite-btn");
    if (btn && isFav(id)) {
      btn.classList.add("is-active");
      btn.setAttribute("aria-pressed", "true");
    }
  });

  document.addEventListener("click", (event) => {
    const t = event.target;
    if (!(t instanceof Element)) return;
    const btn = t.closest(".favorite-btn");
    if (!btn) return;
    const card = btn.closest(".product-card");
    const id = card && card.getAttribute("data-product-index");
    if (id == null) return;
    event.preventDefault();
    event.stopPropagation();
    const on = toggleFav(id);
    btn.classList.toggle("is-active", on);
    btn.setAttribute("aria-pressed", on ? "true" : "false");
    toast(on ? "Guardado en favoritos" : "Quitado de favoritos");
  });

  function pushRecent(id) {
    if (!Number.isFinite(Number(id))) return;
    const ids = readJson(K.recent, []).filter((x) => Number(x) !== Number(id));
    ids.unshift(Number(id));
    writeJson(K.recent, ids.slice(0, 10));
  }

  function renderRail(hostId, title, ids) {
    const host = document.getElementById(hostId);
    if (!host) return;
    const seen = new Set();
    const items = [];
    (ids || []).forEach(function (id) {
      const n = Number(id);
      if (seen.has(n)) return;
      const p = productAt(n);
      if (!p) return;
      seen.add(n);
      items.push(p);
    });
    const unique = items.slice(0, 10);
    if (!unique.length) {
      host.innerHTML = "";
      return;
    }
    const moving = unique.length >= 2;
    host.innerHTML =
      "<h2>" +
      title +
      "</h2><div class=\"" +
      (moving ? "products-marquee" : "rail-static") +
      "\"><div class=\"products-track rail-track\"></div></div>";
    const track = host.querySelector(".rail-track");
    unique.forEach(function (p) {
      const article = document.createElement("article");
      article.className = "product-card";
      article.setAttribute("data-product-index", String(p.id));
      article.tabIndex = 0;
      article.setAttribute("role", "button");
      article.setAttribute("aria-label", "Ver detalle de " + p.name);
      article.innerHTML =
        '<div class="product-media"><img alt="" loading="lazy"/></div>' +
        '<div class="product-body"><p class="price"></p><h3 class="product-name"></h3><p class="product-location"></p></div>';
      const img = article.querySelector("img");
      if (img) {
        img.src = p.image;
        img.alt = p.name;
      }
      article.querySelector(".price").textContent = p.price;
      article.querySelector(".product-name").textContent = p.name;
      article.querySelector(".product-location").textContent = p.location;
      article.addEventListener("click", function () {
        window.location.href = "producto.html?id=" + p.id;
      });
      article.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          window.location.href = "producto.html?id=" + p.id;
        }
      });
      track.appendChild(article);
    });
    if (!moving) return;
    Array.from(track.children).forEach(function (node) {
      const clone = node.cloneNode(true);
      clone.classList.add("is-clone");
      clone.setAttribute("aria-hidden", "true");
      clone.tabIndex = -1;
      clone.querySelectorAll("button, a").forEach(function (el) {
        el.setAttribute("tabindex", "-1");
      });
      track.appendChild(clone);
    });
  }

  const main = document.getElementById("main");
  if (main && document.getElementById("productos-destacados") && !document.getElementById("vistos-recientes")) {
    const rec = document.createElement("section");
    rec.className = "container rail-section";
    rec.id = "vistos-recientes";
    const rec2 = document.createElement("section");
    rec2.className = "container rail-section";
    rec2.id = "te-puede-interesar";
    const dest = document.getElementById("productos-destacados");
    dest.parentNode.insertBefore(rec, dest);
    dest.parentNode.insertBefore(rec2, dest);
    const followSec = document.createElement("section");
    followSec.className = "container rail-section";
    followSec.id = "siguiendo-rail";
    dest.parentNode.insertBefore(followSec, dest);
  }

  const followed = readJson(K.following, []);
  if (followed.length && document.getElementById("siguiendo-rail")) {
    const ids = catalog()
      .map((p, i) => Object.assign({ id: i }, p))
      .filter((p) => p.seller && followed.includes(p.seller.name))
      .slice(0, 10)
      .map((p) => p.id);
    renderRail("siguiendo-rail", "Novedades de quienes seguís", ids);
  }

  function photoId(url) {
    const m = String(url || "").match(/photo-[\w-]+/);
    return m ? m[0] : String(url || "");
  }

  function blockedFromHome() {
    const ids = new Set();
    const photos = new Set();
    document
      .querySelectorAll("#productos-destacados [data-product-index], #ofertas-del-dia [data-product-index], #novedades-semana [data-product-index]")
      .forEach(function (el) {
        ids.add(Number(el.getAttribute("data-product-index")));
        const img = el.querySelector("img");
        if (img) photos.add(photoId(img.getAttribute("src") || img.src));
      });
    return { ids: ids, photos: photos };
  }

  function pickFresh(count, extraIds) {
    const block = blockedFromHome();
    (extraIds || []).forEach(function (id) {
      block.ids.add(Number(id));
    });
    const byCat = {};
    catalog().forEach(function (p, i) {
      if (block.ids.has(i)) return;
      if (block.photos.has(photoId(p.image))) return;
      const cat = p.category || "Otros";
      if (!byCat[cat]) byCat[cat] = [];
      byCat[cat].push(Object.assign({ id: i }, p));
    });
    const cats = Object.keys(byCat);
    const picks = [];
    let n = 0;
    while (picks.length < count && cats.length) {
      const cat = cats[n % cats.length];
      const next = byCat[cat].shift();
      if (next) picks.push(next);
      if (!byCat[cat].length) {
        cats.splice(cats.indexOf(cat), 1);
      } else {
        n += 1;
      }
    }
    return picks;
  }

  function fillNovedades() {
    const track = document.querySelector("#novedades-semana .products-track");
    if (!track) return;
    const picks = pickFresh(8, []);
    if (!picks.length) return;
    track.innerHTML = "";
    picks.forEach(function (p) {
      const article = document.createElement("article");
      article.className = "product-card";
      article.setAttribute("data-product-index", String(p.id));
      article.innerHTML =
        '<div class="product-media"><img alt="" loading="lazy"/></div>' +
        '<div class="product-body"><p class="price"></p><h3 class="product-name"></h3><p class="product-location"></p></div>';
      const img = article.querySelector("img");
      if (img) {
        img.src = p.image;
        img.alt = p.name;
      }
      article.querySelector(".price").textContent = p.price;
      article.querySelector(".product-name").textContent = p.name;
      article.querySelector(".product-location").textContent = p.location;
      track.appendChild(article);
    });
    Array.from(track.children).forEach(function (node) {
      const clone = node.cloneNode(true);
      clone.classList.add("is-clone");
      clone.setAttribute("aria-hidden", "true");
      clone.querySelectorAll("button, a").forEach(function (el) {
        el.setAttribute("tabindex", "-1");
      });
      track.appendChild(clone);
    });
    track.dataset.cloned = "1";
  }
  fillNovedades();

  const recentIds = readJson(K.recent, []);
  renderRail("vistos-recientes", "Vistos recientemente", recentIds);
  const last = productAt(recentIds[0]);
  if (last) {
    const recs = pickFresh(8, [last.id]).map(function (p) {
      return p.id;
    });
    renderRail("te-puede-interesar", "Te puede interesar", recs);
  }

  function notifItems() {
    const items = [];
    const cart = readJson("marketplace_cart_items", []);
    if (Array.isArray(cart) && cart.length) {
      items.push({ id: "cart", text: "Dejaste " + cart.length + " producto(s) en el carrito." });
    }
    const alerts = readJson(K.alerts, []);
    alerts.forEach((a) => items.push({ id: "alert-" + a.id, text: "Alerta de precio activa: " + a.name }));
    return items;
  }
  function paintNotifs() {
    const panel = document.getElementById("notif-panel");
    const dot = document.getElementById("notif-dot");
    if (!panel) return;
    const list = notifItems();
    panel.innerHTML = list.length
      ? list.map((n) => "<p>" + n.text + "</p>").join("")
      : "<p>No hay notificaciones nuevas.</p>";
    const seen = readJson(K.notif, []);
    const unread = list.some((n) => !seen.includes(n.id));
    if (dot) dot.hidden = !unread;
  }
  paintNotifs();
  document.getElementById("notif-toggle")?.addEventListener("click", (event) => {
    event.stopPropagation();
    const panel = document.getElementById("notif-panel");
    const btn = document.getElementById("notif-toggle");
    if (!panel) return;
    const open = panel.hidden;
    panel.hidden = !open;
    btn?.setAttribute("aria-expanded", open ? "true" : "false");
    if (open) {
      writeJson(K.notif, notifItems().map((n) => n.id));
      paintNotifs();
      const d = document.getElementById("notif-dot");
      if (d) d.hidden = true;
    }
  });
  document.addEventListener("click", () => {
    const panel = document.getElementById("notif-panel");
    if (panel) panel.hidden = true;
  });

  const catsLink = document.querySelector('a[aria-label="Categorías"]');
  if (catsLink && catsLink.parentElement && !document.getElementById("cats-menu-toggle")) {
    const li = catsLink.parentElement;
    li.classList.add("nav-cats-item");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "cats-menu-toggle";
    btn.id = "cats-menu-toggle";
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-haspopup", "menu");
    btn.setAttribute("aria-label", "Categorías");
    btn.innerHTML = catsLink.innerHTML;
    const menu = document.createElement("ul");
    menu.className = "account-dropdown cats-dropdown";
    menu.id = "cats-menu";
    menu.setAttribute("hidden", "");
    menu.setAttribute("role", "menu");
    [
      ["Tecnología", "productos.html?cat=" + encodeURIComponent("Tecnología")],
      ["Vehículos", "productos.html?cat=" + encodeURIComponent("Vehículos")],
      ["Hogar", "productos.html?cat=" + encodeURIComponent("Hogar")],
      ["Moda", "productos.html?cat=" + encodeURIComponent("Moda")],
      ["Deportes", "productos.html?cat=" + encodeURIComponent("Deportes")],
      ["Mascotas", "productos.html?cat=" + encodeURIComponent("Mascotas")],
      ["Inmuebles", "productos.html?cat=" + encodeURIComponent("Inmuebles")],
      ["Otros", "productos.html?cat=" + encodeURIComponent("Otros")],
      ["Todos los productos", "productos.html"],
    ].forEach(function (row) {
      const item = document.createElement("li");
      item.setAttribute("role", "none");
      const a = document.createElement("a");
      a.href = row[1];
      a.setAttribute("role", "menuitem");
      a.textContent = row[0];
      item.appendChild(a);
      menu.appendChild(item);
    });
    li.innerHTML = "";
    li.appendChild(btn);
    li.appendChild(menu);
    function closeCats() {
      menu.setAttribute("hidden", "");
      btn.setAttribute("aria-expanded", "false");
    }
    btn.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      const open = !menu.hasAttribute("hidden");
      if (open) closeCats();
      else {
        menu.removeAttribute("hidden");
        btn.setAttribute("aria-expanded", "true");
      }
    });
    menu.addEventListener("click", function (event) {
      event.stopPropagation();
    });
    document.addEventListener("click", closeCats);
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeCats();
    });
  }

  const FALLBACK_IMG = "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=700&q=80";
  document.addEventListener(
    "error",
    function (event) {
      const el = event.target;
      if (!(el instanceof HTMLImageElement)) return;
      if (el.dataset.imgFallback === "1") return;
      if (!el.closest("main, .product-card, .product-media, .cart-item")) return;
      el.dataset.imgFallback = "1";
      el.src = FALLBACK_IMG;
    },
    true
  );

  window.MP = {
    K: K,
    readJson: readJson,
    writeJson: writeJson,
    catalog: catalog,
    productAt: productAt,
    priceOf: priceOf,
    toast: toast,
    renderRail: renderRail,
    favIds: favIds,
    isFav: isFav,
    toggleFav: toggleFav,
    pushRecent: pushRecent,
    later: function () {
      return readJson(K.later, []);
    },
    setLater: function (items) {
      writeJson(K.later, items);
    },
    history: function () {
      return readJson(K.history, []);
    },
    addHistory: function (order) {
      const all = readJson(K.history, []);
      all.unshift(order);
      writeJson(K.history, all.slice(0, 20));
    },
    ratings: function () {
      return readJson(K.ratings, {});
    },
    setRating: function (id, stars) {
      const all = readJson(K.ratings, {});
      all[String(id)] = stars;
      writeJson(K.ratings, all);
    },
    alerts: function () {
      return readJson(K.alerts, []);
    },
    addAlert: function (row) {
      const all = readJson(K.alerts, []);
      if (!all.some((a) => Number(a.id) === Number(row.id))) all.push(row);
      writeJson(K.alerts, all);
    },
    following: function () {
      return readJson(K.following, []);
    },
    isFollowing: function (name) {
      return readJson(K.following, []).includes(String(name));
    },
    toggleFollow: function (name) {
      const n = String(name || "").trim();
      if (!n) return false;
      const all = readJson(K.following, []);
      const next = all.includes(n) ? all.filter((x) => x !== n) : all.concat(n);
      writeJson(K.following, next);
      return next.includes(n);
    },
    productsBySeller: function (name) {
      return catalog()
        .map((p, i) => Object.assign({ id: i }, p))
        .filter((p) => p.seller && p.seller.name === name);
    },
  };
})();
