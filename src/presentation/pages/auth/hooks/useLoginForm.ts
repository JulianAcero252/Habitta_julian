import { useState } from "react";
import { useAuth } from "@application/context/AuthContext";
import { useNavigate } from "react-router-dom";

/** Hook del formulario de login — con timeout de 15s */
export function useLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Timeout de 15s para evitar carga infinita (cold start de Supabase)
      const timeout = new Promise<never>((_, reject) =>
        setTimeout(
          () =>
            reject(new Error("El servidor tardó demasiado. Intenta de nuevo.")),
          15000,
        ),
      );

      await Promise.race([signIn(email, password), timeout]);
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    togglePasswordVisibility: () => setShowPassword(!showPassword),
    handleSubmit,
    error,
    loading,
  };
}
