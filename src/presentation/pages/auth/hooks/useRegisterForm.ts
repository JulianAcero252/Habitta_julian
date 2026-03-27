import { useState, useEffect } from "react";
import { useAuth } from "@application/context/AuthContext";
import { authApi } from "@infrastructure/api/auth.api";
import { validatePassword, isPasswordValid } from "@application/utils/validation.utils";

/** Hook del formulario de registro — validaciones frontend + signUp */
export function useRegisterForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmationEmail, setConfirmationEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Modal promocional pos-registro
  const [showPromoModal, setShowPromoModal] = useState(false);
  const [registeredUserId, setRegisteredUserId] = useState<string | null>(null);

  // Validación de contraseña en tiempo real
  const passwordValidation = validatePassword(password);
  const isPasswordValidField = isPasswordValid(passwordValidation);
  const passwordsMatch = password.length > 0 && confirmPassword.length > 0 && password === confirmPassword;
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // RF02 — Estados para validación de email en tiempo real
  const [emailDisponible, setEmailDisponible] = useState<boolean | null>(null);
  const [checkingEmail, setCheckingEmail] = useState(false);

  const { signUp } = useAuth();

  // RF02 — Lógica de validación con debounce (500ms)
  useEffect(() => {
    if (!email.trim() || !email.includes("@")) {
      setEmailDisponible(null);
      return;
    }

    const timer = setTimeout(async () => {
      setCheckingEmail(true);
      try {
        const disponible = await authApi.checkEmailDisponible(email);
        setEmailDisponible(disponible);
      } catch {
        setEmailDisponible(null);
      } finally {
        setCheckingEmail(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    // Validaciones frontend
    if (emailDisponible === false) {
      setError("Este correo ya está registrado.");
      return;
    }
    if (email.trim().toLowerCase() !== confirmationEmail.trim().toLowerCase()) {
      setError("Los correos electrónicos no coinciden.");
      return;
    }
    if (!isPasswordValidField) {
      setError("La contraseña no cumple con los requisitos de seguridad.");
      return;
    }
    if (!passwordsMatch) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);
    try {
      const result = await signUp(email, password, fullName, phone);

      // Guardamos el ID del usuario recién creado
      if (result.userId) {
        setRegisteredUserId(result.userId);
      }

      // Mostrar el modal siempre al registrarse con éxito
      setShowPromoModal(true);

      if (result.needsConfirmation) {
        setSuccessMessage(
          "Revisa tu correo para confirmar tu cuenta y empezar a disfrutar de Habitta.",
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al registrarse.");
    } finally {
      setLoading(false);
    }
  };

  return {
    fullName,
    setFullName,
    email,
    setEmail,
    confirmationEmail,
    setConfirmationEmail,
    phone,
    setPhone,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    showPassword,
    togglePasswordVisibility: () => setShowPassword(!showPassword),
    handleSubmit,
    error,
    loading,
    successMessage,
    emailDisponible,
    checkingEmail,
    passwordValidation,
    isPasswordValid: isPasswordValidField,
    passwordsMatch,
    showPromoModal,
    setShowPromoModal,
    registeredUserId,
  };
}
