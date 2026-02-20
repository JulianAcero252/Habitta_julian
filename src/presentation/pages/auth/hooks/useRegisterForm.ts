import { useState } from "react";
import { useAuth } from "@application/context/AuthContext";
import { useNavigate } from "react-router-dom";

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
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    // Validaciones frontend
    if (email.trim().toLowerCase() !== confirmationEmail.trim().toLowerCase()) {
      setError("Los correos electrónicos no coinciden.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    setLoading(true);
    try {
      const result = await signUp(email, password, fullName, phone);

      if (result.needsConfirmation) {
        setSuccessMessage(
          "¡Cuenta creada! Revisa tu correo para confirmar tu cuenta.",
        );
      } else {
        navigate("/");
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
  };
}
