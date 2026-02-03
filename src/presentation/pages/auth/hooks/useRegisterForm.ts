import { useState } from "react";

export function useRegisterForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Register submitted:", { fullName, email, password });
    // Lógica de registro aquí
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return {
    fullName,
    setFullName,
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    togglePasswordVisibility,
    handleSubmit,
  };
}
