import { useLoginForm } from "./hooks/useLoginForm";
import "./Login.css";

// Componente de Formulario de Inicio de Sesión
function Login() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    togglePasswordVisibility,
    handleSubmit,
  } = useLoginForm();

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      {/* Campo de Email */}
      <div className="form-group">
        <label htmlFor="email">Correo Electrónico</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="correo@gmail.com"
          required
        />
      </div>

      {/* Campo de Contraseña */}
      <div className="form-group">
        <label htmlFor="password">Contraseña</label>
        <div className="password-input">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
          <button
            type="button"
            className="toggle-password"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? "👁️" : "👁️‍🗨️"}
          </button>
        </div>
      </div>

      {/* Botón de Envío */}
      <button type="submit" className="submit-button">
        Iniciar Sesión
      </button>
    </form>
  );
}

export default Login;
