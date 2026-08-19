// Validación en tiempo real del formulario de registro de MarketPlace.
const registerForm = document.querySelector<HTMLFormElement>("#register-form");

if (registerForm) {
  const fullName = document.querySelector<HTMLInputElement>("#full-name");
  const email = document.querySelector<HTMLInputElement>("#register-email");
  const phone = document.querySelector<HTMLInputElement>("#phone");
  const password = document.querySelector<HTMLInputElement>("#password");
  const confirmPassword = document.querySelector<HTMLInputElement>("#confirm-password");
  const terms = document.querySelector<HTMLInputElement>("#terms");
  const formStatus = document.querySelector<HTMLElement>("#form-status");

  function setError(field: HTMLInputElement, errorId: string, message: string): false {
    field.setAttribute("aria-invalid", "true");
    const error = document.getElementById(errorId);
    if (error) error.textContent = message;
    return false;
  }

  function clearError(field: HTMLInputElement, errorId: string): true {
    field.removeAttribute("aria-invalid");
    const error = document.getElementById(errorId);
    if (error) error.textContent = "";
    return true;
  }

  function validateName(): boolean {
    if (!fullName) return false;
    const value = fullName.value.trim();
    if (!value) return setError(fullName, "full-name-error", "Ingresa tu nombre completo.");
    if (value.length < 3) return setError(fullName, "full-name-error", "El nombre debe tener al menos 3 caracteres.");
    return clearError(fullName, "full-name-error");
  }

  function validateEmail(): boolean {
    if (!email) return false;
    const value = email.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) return setError(email, "register-email-error", "Ingresa tu correo electrónico.");
    if (!emailPattern.test(value)) return setError(email, "register-email-error", "Ingresa un correo electrónico válido.");
    return clearError(email, "register-email-error");
  }

  function validatePhone(): boolean {
    if (!phone) return false;
    const value = phone.value.trim();
    const phonePattern = /^\d{10}$/;
    if (!value) return setError(phone, "phone-error", "Ingresa tu número de teléfono.");
    if (!phonePattern.test(value)) return setError(phone, "phone-error", "Ingresa un teléfono válido de 10 dígitos.");
    return clearError(phone, "phone-error");
  }

  function validatePassword(): boolean {
    if (!password) return false;
    if (!password.value) return setError(password, "password-error", "Ingresa una contraseña.");
    if (password.value.length < 8) return setError(password, "password-error", "La contraseña debe tener al menos 8 caracteres.");
    return clearError(password, "password-error");
  }

  function validateConfirmPassword(): boolean {
    if (!confirmPassword || !password) return false;
    if (!confirmPassword.value) return setError(confirmPassword, "confirm-password-error", "Confirma tu contraseña.");
    if (confirmPassword.value !== password.value) return setError(confirmPassword, "confirm-password-error", "Las contraseñas no coinciden.");
    return clearError(confirmPassword, "confirm-password-error");
  }

  function validateTerms(): boolean {
    if (!terms) return false;
    if (!terms.checked) return setError(terms, "terms-error", "Debes aceptar los términos para continuar.");
    return clearError(terms, "terms-error");
  }

  fullName?.addEventListener("input", validateName);
  email?.addEventListener("input", validateEmail);
  phone?.addEventListener("input", validatePhone);
  password?.addEventListener("input", () => {
    validatePassword();
    if (confirmPassword?.value) validateConfirmPassword();
  });
  confirmPassword?.addEventListener("input", validateConfirmPassword);
  terms?.addEventListener("change", validateTerms);

  registerForm.addEventListener("submit", (event: SubmitEvent) => {
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
      if (formStatus) formStatus.textContent = "Revisa los campos marcados antes de continuar.";
      registerForm.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      return;
    }

    if (formStatus) {
      formStatus.textContent = "Formulario válido. Tus datos están listos para enviarse.";
    }
  });
}
