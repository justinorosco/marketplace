"use strict";
// Comportamiento del playground de backoffice: alerts, dialogs, menús y toasts.
// ---------- Alerts: botón de cerrar ----------
document.querySelectorAll(".c-alert-close").forEach((closeBtn) => {
    closeBtn.addEventListener("click", () => {
        const alert = closeBtn.closest(".c-alert");
        alert?.setAttribute("hidden", "");
    });
});
// ---------- Dialogs ----------
document.querySelectorAll("[data-dialog-open]").forEach((openBtn) => {
    const dialogId = openBtn.dataset.dialogOpen;
    if (!dialogId)
        return;
    const dialog = document.getElementById(dialogId);
    if (!(dialog instanceof HTMLDialogElement))
        return;
    openBtn.addEventListener("click", () => {
        dialog.showModal();
    });
    dialog.addEventListener("close", () => {
        openBtn.focus();
    });
    dialog.querySelectorAll("[data-dialog-close]").forEach((closeBtn) => {
        closeBtn.addEventListener("click", () => {
            dialog.close();
        });
    });
});
// ---------- Menús ----------
const menuToggles = document.querySelectorAll(".c-menu-account-toggle");
function closeAllMenus(except) {
    document.querySelectorAll(".c-menu-account").forEach((menu) => {
        if (menu === except)
            return;
        menu.setAttribute("hidden", "");
        const targetId = menu.dataset.menu;
        const toggle = document.querySelector(`[data-menu-target="${targetId}"]`);
        toggle?.setAttribute("aria-expanded", "false");
    });
}
menuToggles.forEach((toggle) => {
    const menuId = toggle.dataset.menuTarget;
    if (!menuId)
        return;
    const menu = document.querySelector(`[data-menu="${menuId}"]`);
    if (!menu)
        return;
    toggle.addEventListener("click", (event) => {
        event.stopPropagation();
        const isOpen = !menu.hasAttribute("hidden");
        closeAllMenus();
        if (isOpen)
            return;
        menu.removeAttribute("hidden");
        toggle.setAttribute("aria-expanded", "true");
        const firstItem = menu.querySelector('[role="menuitem"]');
        firstItem?.focus();
    });
    menu.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeAllMenus();
            toggle.focus();
        }
    });
});
document.addEventListener("click", () => closeAllMenus());
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape")
        closeAllMenus();
});
// ---------- Toasts ----------
const toastContainer = document.getElementById("toast-container");
const MAX_TOASTS = 3;
const TOAST_LIFETIME_MS = 4000;
function showToast(kind, message) {
    if (!toastContainer)
        return;
    while (toastContainer.children.length >= MAX_TOASTS) {
        toastContainer.firstElementChild?.remove();
    }
    const toast = document.createElement("div");
    toast.className = `c-toast c-toast--${kind}`;
    toast.textContent = message;
    toastContainer.appendChild(toast);
    window.setTimeout(() => {
        toast.remove();
    }, TOAST_LIFETIME_MS);
}
document.querySelectorAll("[data-toast-demo]").forEach((btn) => {
    btn.addEventListener("click", () => {
        const kind = btn.dataset.toastDemo;
        if (kind === "success") {
            showToast("success", "Producto guardado correctamente.");
        }
        else if (kind === "error") {
            showToast("error", "No se pudo guardar el producto.");
        }
    });
});
