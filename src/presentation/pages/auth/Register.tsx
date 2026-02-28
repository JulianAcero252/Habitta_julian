import { useEffect } from "react";
import { useRegisterForm } from "./hooks/useRegisterForm";
import { useToast } from "@application/context/ToastContext";
import { useWarnIfUnsavedChanges } from "@application/hooks/useWarnIfUnsavedChanges";
import "./Register.css";

// Componente de Formulario de Registro
function Register() {
  const {
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
    emailDisponible,
    checkingEmail,
  } = useRegisterForm();

  const { showToast } = useToast();

  useEffect(() => {
    if (error) showToast(error, "error");
  }, [error]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (successMessage) showToast(successMessage, "success");
  }, [successMessage]); // eslint-disable-line react-hooks/exhaustive-deps

  const hasUnsavedChanges = Boolean(
    fullName ||
    email ||
    confirmationEmail ||
    phone ||
    password ||
    confirmPassword,
  );
  useWarnIfUnsavedChanges(hasUnsavedChanges && !successMessage);

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      {/* Nombre Completo */}
      <div className="form-group">
        <label htmlFor="fullName">Nombre Completo</label>
        <input
          type="text"
          id="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Juan Pérez"
          required
          disabled={loading}
        />
      </div>

      {/* Correo Electrónico */}
      <div className="form-group email-group">
        <label htmlFor="email">
          Correo Electrónico
          {checkingEmail && <span className="email-status info"> 🔄</span>}
          {!checkingEmail && emailDisponible === true && (
            <span className="email-status success"> ✅</span>
          )}
          {!checkingEmail && emailDisponible === false && (
            <span className="email-status error"> ❌ (Ya registrado)</span>
          )}
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          required
          disabled={loading}
        />
      </div>

      {/* Confirmar Correo Electrónico */}
      <div className="form-group">
        <label htmlFor="confirmationEmail">Confirmar Correo Electrónico</label>
        <input
          type="email"
          id="confirmationEmail"
          value={confirmationEmail}
          onChange={(e) => setConfirmationEmail(e.target.value)}
          placeholder="tu@email.com"
          required
          disabled={loading}
        />
      </div>

      {/* Teléfono */}
      <div className="form-group">
        <label htmlFor="phone">Teléfono</label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="3001234567"
          required
          disabled={loading}
        />
      </div>

      {/* Contraseña */}
      <div className="form-group">
        <label htmlFor="password">Contraseña</label>
        <div className="password-input">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            minLength={8}
            required
            disabled={loading}
          />
          <button
            type="button"
            className="toggle-password"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? "👁️" : "👁️‍🗨️"}
          </button>
        </div>
        <small className="password-hint">Mínimo 8 caracteres</small>
      </div>

      {/* Confirmar Contraseña */}
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirmar Contraseña</label>
        <div className="password-input">
          <input
            type={showPassword ? "text" : "password"}
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            minLength={8}
            required
            disabled={loading}
          />
          <button
            type="button"
            className="toggle-password"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? "👁️" : "👁️‍🗨️"}
          </button>
        </div>
        <small className="password-hint">Mínimo 8 caracteres</small>
      </div>

      {/* Botón de Envío */}
      <button type="submit" className="submit-button" disabled={loading}>
        {loading ? "Creando cuenta..." : "Crear Cuenta"}
      </button>
    </form>
  );
}

export default Register;
