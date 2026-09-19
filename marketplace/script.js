"use strict";
// Validación en tiempo real del formulario de registro de MarketPlace.
const registerForm = document.querySelector("#register-form");
if (registerForm) {
    const fullName = document.querySelector("#full-name");
    const email = document.querySelector("#register-email");
    const phone = document.querySelector("#phone");
    const password = document.querySelector("#password");
    const confirmPassword = document.querySelector("#confirm-password");
    const terms = document.querySelector("#terms");
    const formStatus = document.querySelector("#form-status");
    function setError(field, errorId, message) {
        field.setAttribute("aria-invalid", "true");
        const error = document.getElementById(errorId);
        if (error)
            error.textContent = message;
        return false;
    }
    function clearError(field, errorId) {
        field.removeAttribute("aria-invalid");
        const error = document.getElementById(errorId);
        if (error)
            error.textContent = "";
        return true;
    }
    function validateName() {
        if (!fullName)
            return false;
        const value = fullName.value.trim();
        if (!value)
            return setError(fullName, "full-name-error", "Ingresa tu nombre completo.");
        if (value.length < 3)
            return setError(fullName, "full-name-error", "El nombre debe tener al menos 3 caracteres.");
        return clearError(fullName, "full-name-error");
    }
    function validateEmail() {
        if (!email)
            return false;
        const value = email.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value)
            return setError(email, "register-email-error", "Ingresa tu correo electrónico.");
        if (!emailPattern.test(value))
            return setError(email, "register-email-error", "Ingresa un correo electrónico válido.");
        return clearError(email, "register-email-error");
    }
    function validatePhone() {
        if (!phone)
            return false;
        const value = phone.value.trim();
        const digits = value.replace(/\D/g, "");
        if (!digits)
            return setError(phone, "phone-error", "Ingresa tu número de teléfono.");
        if (digits.length !== 10)
            return setError(phone, "phone-error", "Ingresa un teléfono válido de 10 dígitos.");
        return clearError(phone, "phone-error");
    }
    function validatePassword() {
        if (!password)
            return false;
        if (!password.value)
            return setError(password, "password-error", "Ingresa una contraseña.");
        if (password.value.length < 8)
            return setError(password, "password-error", "La contraseña debe tener al menos 8 caracteres.");
        return clearError(password, "password-error");
    }
    function validateConfirmPassword() {
        if (!confirmPassword || !password)
            return false;
        if (!confirmPassword.value)
            return setError(confirmPassword, "confirm-password-error", "Confirma tu contraseña.");
        if (confirmPassword.value !== password.value)
            return setError(confirmPassword, "confirm-password-error", "Las contraseñas no coinciden.");
        return clearError(confirmPassword, "confirm-password-error");
    }
    function validateTerms() {
        if (!terms)
            return false;
        if (!terms.checked)
            return setError(terms, "terms-error", "Debes aceptar los términos para continuar.");
        return clearError(terms, "terms-error");
    }
    fullName?.addEventListener("input", validateName);
    email?.addEventListener("input", validateEmail);
    phone?.addEventListener("input", validatePhone);
    password?.addEventListener("input", () => {
        validatePassword();
        if (confirmPassword?.value)
            validateConfirmPassword();
    });
    confirmPassword?.addEventListener("input", validateConfirmPassword);
    terms?.addEventListener("change", validateTerms);
    registerForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const isValid = [
            validateName(),
            validateEmail(),
            validatePhone(),
            validatePassword(),
            validateConfirmPassword(),
            validateTerms()
        ].every(Boolean);
        if (!isValid) {
            if (formStatus)
                formStatus.textContent = "Revisa los campos marcados antes de continuar.";
            registerForm.querySelector('[aria-invalid="true"]')?.focus();
            return;
        }
        if (formStatus) {
            formStatus.textContent = "Cuenta creada. Ya iniciaste sesión.";
        }
        try {
            localStorage.setItem("marketplace_logged_in", "true");
            localStorage.setItem("marketplace_user_name", fullName.value.trim());
            localStorage.setItem("marketplace_user_email", email.value.trim());
        } catch { /* ignore */ }
        if (typeof renderSessionState === "function") renderSessionState();
    });
}
// ---------- Favoritos (persistidos en extras.js) ----------
function productImageByName(name) {
    if (typeof PRODUCTS_DETAIL === "undefined" || !name)
        return "";
    const found = PRODUCTS_DETAIL.find((product) => product.name === name);
    return found && found.image ? found.image : "";
}
// ---------- Carrito (persistente entre páginas con localStorage) ----------
const CART_COUNT_KEY = "marketplace_cart_count";
const CART_ITEMS_KEY = "marketplace_cart_items";
const cartBadge = document.getElementById("cart-badge");
function readCartItems() {
    try {
        const raw = localStorage.getItem(CART_ITEMS_KEY);
        if (!raw)
            return [];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    }
    catch {
        return [];
    }
}
function writeCartItems(items) {
    try {
        localStorage.setItem(CART_ITEMS_KEY, JSON.stringify(items));
        const qty = items.reduce((sum, item) => sum + item.qty, 0);
        localStorage.setItem(CART_COUNT_KEY, String(qty));
    }
    catch {
        /* localStorage no disponible */
    }
}
function cartQuantity(items = readCartItems()) {
    return items.reduce((sum, item) => sum + item.qty, 0);
}
let cartCount = cartQuantity();
function renderCartBadge() {
    cartCount = cartQuantity();
    if (!cartBadge)
        return;
    cartBadge.textContent = String(cartCount);
    cartBadge.hidden = cartCount === 0;
}
renderCartBadge();
function addToCart(product) {
    const items = readCartItems();
    const name = (product && product.name ? product.name.trim() : "") || "Producto";
    const id = (product && product.id) || name;
    const existing = items.find((item) => item.id === id);
    if (existing) {
        existing.qty += 1;
        if (!existing.image) {
            existing.image = (product && product.image) || productImageByName(name);
        }
    }
    else {
        items.push({
            id,
            name,
            price: (product && product.price) || "",
            image: (product && product.image) || productImageByName(name) || "",
            qty: 1,
        });
    }
    writeCartItems(items);
    renderCartBadge();
}
// ---------- Navegación al detalle de producto ----------
function goToProductDetail(index) {
    window.location.href = `producto.html?id=${index}`;
}
function duplicateProductMarquees() {
    document.querySelectorAll(".products-marquee .products-track").forEach((track) => {
        if (track.dataset.cloned === "1")
            return;
        Array.from(track.children).forEach((node) => {
            const clone = node.cloneNode(true);
            clone.classList.add("is-clone");
            clone.setAttribute("aria-hidden", "true");
            clone.querySelectorAll("button, a").forEach((el) => el.setAttribute("tabindex", "-1"));
            track.appendChild(clone);
        });
        track.dataset.cloned = "1";
    });
}
duplicateProductMarquees();
function cardProductIndex(card, fallbackIndex) {
    const attr = card.getAttribute("data-product-index");
    if (attr != null && attr !== "") {
        const n = Number(attr);
        if (Number.isFinite(n))
            return n;
    }
    return fallbackIndex;
}
const productCards = Array.from(document.querySelectorAll(".product-card:not(.is-clone)"));
productCards.forEach((card, index) => {
    const productIndex = cardProductIndex(card, index);
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    const cardName = card.querySelector(".product-name");
    card.setAttribute("aria-label", `Ver detalle de ${cardName?.textContent ?? "producto"}`);
    if (!card.closest(".products-marquee")) {
        card.addEventListener("click", () => goToProductDetail(productIndex));
        card.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                goToProductDetail(productIndex);
            }
        });
    }
    else {
        card.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                goToProductDetail(productIndex);
            }
        });
    }
});
document.querySelectorAll(".products-marquee").forEach((wrap) => {
    wrap.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof Element))
            return;
        if (target.closest(".favorite-btn"))
            return;
        const card = target.closest(".product-card");
        if (!card)
            return;
        goToProductDetail(cardProductIndex(card, 0));
    });
});
// ---------- Menú de cuenta ----------
const accountToggle = document.getElementById("account-menu-toggle");
const accountMenu = document.getElementById("account-menu");
function closeAccountMenu() {
    if (!accountMenu || !accountToggle)
        return;
    accountMenu.setAttribute("hidden", "");
    accountToggle.setAttribute("aria-expanded", "false");
}
if (accountToggle && accountMenu) {
    accountToggle.addEventListener("click", (event) => {
        event.stopPropagation();
        const isOpen = !accountMenu.hasAttribute("hidden");
        if (isOpen) {
            closeAccountMenu();
        }
        else {
            accountMenu.removeAttribute("hidden");
            accountToggle.setAttribute("aria-expanded", "true");
        }
    });
    document.addEventListener("click", closeAccountMenu);
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape")
            closeAccountMenu();
    });
}
// ---------- Búsqueda con sugerencias ----------
const searchInput = document.getElementById("search-input");
const searchSuggestions = document.getElementById("search-suggestions");
const productEntries = productCards.map((card, index) => ({
    card,
    index: cardProductIndex(card, index),
    name: card.querySelector(".product-name")?.textContent?.trim() ?? "",
}));
function renderSuggestions(query) {
    if (!searchSuggestions)
        return;
    searchSuggestions.innerHTML = "";
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
        searchSuggestions.setAttribute("hidden", "");
        return;
    }
    const matches = productEntries.filter((entry) => entry.name.toLowerCase().includes(trimmed));
    if (matches.length === 0) {
        searchSuggestions.setAttribute("hidden", "");
        return;
    }
    matches.forEach((entry) => {
        const item = document.createElement("button");
        item.type = "button";
        item.className = "search-suggestion-item";
        item.textContent = entry.name;
        item.addEventListener("click", () => {
            searchSuggestions.setAttribute("hidden", "");
            if (searchInput instanceof HTMLInputElement)
                searchInput.value = entry.name;
            goToProductDetail(entry.index);
        });
        searchSuggestions.appendChild(item);
    });
    searchSuggestions.removeAttribute("hidden");
}
if (searchInput instanceof HTMLInputElement && searchSuggestions) {
    searchInput.addEventListener("input", () => renderSuggestions(searchInput.value));
    document.addEventListener("click", (event) => {
        if (!(event.target instanceof Node))
            return;
        if (!searchInput.contains(event.target) && !searchSuggestions.contains(event.target)) {
            searchSuggestions.setAttribute("hidden", "");
        }
    });
}
// ---------- Notificación flotante (toast) ----------
function showToast(message) {
    let toast = document.getElementById("site-toast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "site-toast";
        toast.className = "site-toast";
        toast.setAttribute("role", "status");
        toast.setAttribute("aria-live", "polite");
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(Number(toast.dataset.timeoutId));
    const timeoutId = window.setTimeout(() => {
        toast?.classList.remove("is-visible");
    }, 2500);
    toast.dataset.timeoutId = String(timeoutId);
}
// ---------- Favoritos, Mensajes y Carrito (barra de navegación) ----------
const favoritesLink = document.getElementById("favorites-link");
if (favoritesLink instanceof HTMLAnchorElement) {
    favoritesLink.href = "favoritos.html";
}
const messagesLink = document.getElementById("messages-link");
messagesLink?.addEventListener("click", (event) => {
    event.preventDefault();
    showToast("No tienes mensajes nuevos.");
});
const cartLink = document.getElementById("cart-link");
if (cartLink instanceof HTMLAnchorElement) {
    cartLink.href = "carrito.html";
}
// ---------- Carrusel del hero ----------
const heroImage = document.getElementById("hero-carousel-image");
const heroPrev = document.getElementById("hero-prev");
const heroNext = document.getElementById("hero-next");
const heroDots = document.querySelectorAll("#hero-dots span");
const HERO_SLIDES = [
    {
        src: "img/hero/zapato.png",
        alt: "Zapatillas deportivas en MarketPlace",
    },
    {
        src: "img/hero/reloj.png",
        alt: "Reloj en MarketPlace",
    },
    {
        src: "img/hero/iphone.png",
        alt: "iPhone en MarketPlace",
    },
];
let heroIndex = 0;
let heroTimer;
function paintHeroDots() {
    heroDots.forEach((dot, i) => {
        const active = i === heroIndex;
        dot.style.background = active ? "var(--color-blue)" : "var(--color-border)";
        dot.style.width = active ? "20px" : "8px";
        dot.style.borderRadius = active ? "4px" : "50%";
    });
}
function renderHeroSlide() {
    if (!(heroImage instanceof HTMLImageElement)) {
        paintHeroDots();
        return;
    }
    heroImage.classList.add("is-fading");
    window.setTimeout(() => {
        if (!(heroImage instanceof HTMLImageElement)) return;
        heroImage.src = HERO_SLIDES[heroIndex].src;
        heroImage.alt = HERO_SLIDES[heroIndex].alt;
        heroImage.classList.remove("is-fading");
    }, 280);
    paintHeroDots();
}
function goHeroSlide(step) {
    heroIndex = (heroIndex + step + HERO_SLIDES.length) % HERO_SLIDES.length;
    renderHeroSlide();
}
function startHeroAutoplay() {
    window.clearInterval(heroTimer);
    heroTimer = window.setInterval(() => {
        goHeroSlide(1);
    }, 4500);
}
heroPrev?.addEventListener("click", () => {
    goHeroSlide(-1);
    startHeroAutoplay();
});
heroNext?.addEventListener("click", () => {
    goHeroSlide(1);
    startHeroAutoplay();
});
const heroFigure = document.querySelector(".hero-figure");
heroFigure?.addEventListener("mouseenter", () => window.clearInterval(heroTimer));
heroFigure?.addEventListener("mouseleave", () => startHeroAutoplay());
startHeroAutoplay();
// ---------- Sesión (simulada con localStorage) ----------
const LOGIN_KEY = "marketplace_logged_in";
const navLoginItem = document.getElementById("nav-login-item");
const navAccountItem = document.getElementById("nav-account-item");
const loginToggle = document.getElementById("login-toggle");
const loginDialog = document.getElementById("login-dialog");
const loginDialogClose = document.getElementById("login-dialog-close");
const loginForm = document.getElementById("login-form");
const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");
const loginConfirmPassword = document.getElementById("login-confirm-password");
const loginStatus = document.getElementById("login-status");
const logoutLink = document.getElementById("logout-link");
function isLoggedIn() {
    try {
        return localStorage.getItem(LOGIN_KEY) === "true";
    }
    catch {
        return false;
    }
}
function renderSessionState() {
    const loggedIn = isLoggedIn();
    if (navLoginItem instanceof HTMLElement)
        navLoginItem.hidden = loggedIn;
    if (navAccountItem instanceof HTMLElement)
        navAccountItem.hidden = true;
}
renderSessionState();
loginToggle?.addEventListener("click", () => {
    if (loginStatus)
        loginStatus.textContent = "";
    if (loginForm instanceof HTMLFormElement)
        loginForm.reset();
    if (loginDialog instanceof HTMLDialogElement)
        loginDialog.showModal();
});
loginDialogClose?.addEventListener("click", () => {
    if (loginDialog instanceof HTMLDialogElement)
        loginDialog.close();
});
loginForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const emailValue = loginEmail instanceof HTMLInputElement ? loginEmail.value.trim() : "";
    const passwordValue = loginPassword instanceof HTMLInputElement ? loginPassword.value : "";
    const confirmValue = loginConfirmPassword instanceof HTMLInputElement ? loginConfirmPassword.value : "";
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailError = document.getElementById("login-email-error");
    const passwordError = document.getElementById("login-password-error");
    const confirmError = document.getElementById("login-confirm-password-error");
    let valid = true;
    if (!emailPattern.test(emailValue)) {
        if (emailError)
            emailError.textContent = "Ingresa un correo electrónico válido.";
        valid = false;
    }
    else if (emailError) {
        emailError.textContent = "";
    }
    if (passwordValue.length < 8) {
        if (passwordError)
            passwordError.textContent = "La contraseña debe tener al menos 8 caracteres.";
        valid = false;
    }
    else if (passwordError) {
        passwordError.textContent = "";
    }
    if (!confirmValue || confirmValue !== passwordValue) {
        if (confirmError)
            confirmError.textContent = "Las contraseñas no coinciden.";
        valid = false;
    }
    else if (confirmError) {
        confirmError.textContent = "";
    }
    if (!valid)
        return;
    try {
        localStorage.setItem(LOGIN_KEY, "true");
        localStorage.setItem("marketplace_user_email", emailValue);
        const existingName = localStorage.getItem("marketplace_user_name") || "";
        if (!existingName.trim()) {
            const local = emailValue.split("@")[0] || "";
            localStorage.setItem("marketplace_user_name", local.split(/[._-]/)[0] || local);
        }
    }
    catch {
        /* localStorage no disponible: la sesión no persiste, pero la página sigue funcionando */
    }
    renderSessionState();
    if (loginDialog instanceof HTMLDialogElement)
        loginDialog.close();
    showToast("Sesión iniciada ✓");
});
logoutLink?.addEventListener("click", (event) => {
    event.preventDefault();
    try {
        localStorage.removeItem(LOGIN_KEY);
    }
    catch {
        /* localStorage no disponible */
    }
    renderSessionState();
    closeAccountMenu();
    showToast("Sesión cerrada");
});
