import { useState } from "react";
import { useAuth } from "@application/context/AuthContext";
import { useNavigate } from "react-router-dom";

/**
 * Hook para el formulario de registro.
 *
 * Validaciones de frontend:
 * - Correos deben coincidir
 * - Contraseñas deben coincidir (mínimo 8 caracteres)
 * - Todos los campos requeridos
 *
 * Después de registrarse:
 * - Si necesita confirmación de email → muestra mensaje de éxito
 * - Si no → redirige a Home
 */
export function useRegisterForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmationEmail, setConfirmationEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  // Mensaje de éxito cuando se necesita confirmación de email
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    // --- Validaciones de frontend ---

    // Validar que los correos coincidan
    if (email.trim().toLowerCase() !== confirmationEmail.trim().toLowerCase()) {
      setError("Los correos electrónicos no coinciden.");
      return;
    }

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    // Validar longitud mínima de contraseña
    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    // --- Enviar al backend ---
    setLoading(true);

    try {
      const result = await signUp(email, password, fullName, phone);

      if (result.needsConfirmation) {
        // Mostrar mensaje de éxito — el usuario debe revisar su correo
        setSuccessMessage(
          "¡Cuenta creada! Revisa tu correo electrónico para confirmar tu cuenta antes de iniciar sesión.",
        );
      } else {
        // Login automático — redirigir al inicio
        navigate("/");
      }
    } catch (err) {
      const mensaje =
        err instanceof Error ? err.message : "Error al registrarse.";
      setError(mensaje);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
    togglePasswordVisibility,
    handleSubmit,
    error,
    loading,
    successMessage,
  };
}
