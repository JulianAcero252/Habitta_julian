import "./promotion.css";
import { useAuth } from "@application/context/AuthContext";

// Enlace de pago de Stripe (Payment Link)
const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/test_fZu9AVexa1v3dAW5DxdIA00";

const FREE_FEATURES = [
  { label: "Publicaciones activas", value: "3", yes: true },
  { label: "Fotos por propiedad", value: "5", yes: true },
  { label: "Aparece en búsquedas", value: "", yes: true },
  { label: "Destacado en búsquedas", value: "", yes: false },
  { label: "Posición top en resultados", value: "", yes: false },
  { label: "Notificaciones prioritarias", value: "", yes: false },
  { label: "Estadísticas avanzadas", value: "", yes: false },
  { label: "Herramienta financiera", value: "Básica", yes: true },
  { label: "Soporte", value: "Estándar", yes: true },
  { label: "Mapa destacado", value: "", yes: false },
  { label: "Reportes descargables", value: "", yes: false },
];

const PREMIUM_FEATURES = [
  { label: "Publicaciones activas", value: "Ilimitadas", yes: true },
  { label: "Fotos por propiedad", value: "25", yes: true },
  { label: "Aparece en búsquedas", value: "", yes: true },
  { label: "Destacado en búsquedas", value: "7 días", yes: true },
  { label: "Posición top en resultados", value: "", yes: true },
  { label: "Notificaciones prioritarias", value: "", yes: true },
  { label: "Estadísticas avanzadas", value: "", yes: true },
  { label: "Herramienta financiera PRO", value: "Completa", yes: true },
  { label: "Soporte prioritario", value: "24 h", yes: true },
  { label: "Mapa destacado", value: "", yes: true },
  { label: "Reportes descargables", value: "", yes: true },
];

function Promotion() {
  const { usuario } = useAuth();

  const handlePremium = () => {
    // Añadimos el ID del usuario como referencia para identificar el pago en el webhook
    const clientRef = usuario?.idusuario ?? "guest";
    window.location.href = `${STRIPE_PAYMENT_LINK}?client_reference_id=${clientRef}`;
  };

  const isPremium = usuario?.plan === "premium";

  return (
    <div className="promotion-container">
      <p className="promotion-eyebrow">Planes de Habitta</p>
      <h1 className="promotion-title">Elige tu plan</h1>
      <p className="promotion-subtitle">
        Publica tus propiedades y llega a más compradores con el plan que mejor se adapte a ti.
      </p>

      <div className="promotion-cards">
        {/* ── Plan Gratis ──────────────────────── */}
        <div className="promotion-card basic">
          <div className="plan-header">
            <div className="plan-icon-container">
              <svg width="26" height="26" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M50 20 C52 40 60 48 80 50 C60 52 52 60 50 80 C48 60 40 52 20 50 C40 48 48 40 50 20 Z"
                  stroke="#35d2db" strokeWidth="7" strokeLinejoin="round"
                />
                <path d="M70 25 L82 25 M76 19 L76 31" stroke="#35d2db" strokeWidth="7" strokeLinecap="round" />
              </svg>
            </div>
            <h2>Gratis</h2>
          </div>
          <p className="card-subtitle">Para comenzar a publicar tus propiedades</p>

          <div className="price-block">
            <p className="price"><sup>$</sup>0</p>
            <p className="price-label">Para siempre</p>
          </div>

          <hr className="promo-divider" />
          <p className="features-heading">Qué incluye</p>

          <ul className="feature-list">
            {FREE_FEATURES.map((f) => (
              <li key={f.label}>
                <span className={`feat-check ${f.yes ? "yes" : "no"}`}>
                  {f.yes ? "✓" : "✕"}
                </span>
                <span className="feat-label">{f.label}</span>
                {f.value && <span className="feat-value">{f.value}</span>}
              </li>
            ))}
          </ul>

          <button
            className="select-button free"
            disabled={!isPremium && !!usuario}
            onClick={() => {/* plan actual */}}
          >
            {!usuario ? "Crear cuenta gratis" : isPremium ? "Cambiar a Gratis" : "Plan actual"}
          </button>
        </div>

        {/* ── Plan Premium ─────────────────────── */}
        <div className="promotion-card featured">
          <span className="promo-badge">⚡ Popular</span>

          <div className="plan-header">
            <div className="plan-icon-container premium">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M13 2L6 12H11L10 22L18 11H13L14 2.5"
                  stroke="#35d2db" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2>Premium</h2>
          </div>
          <p className="card-subtitle">Máxima visibilidad para vender más rápido</p>

          <div className="price-block">
            <p className="price"><sup>$</sup>29.900</p>
            <p className="price-label">COP / mes · cancela cuando quieras</p>
          </div>

          <hr className="promo-divider" />
          <p className="features-heading">Todo lo de Gratis, más:</p>

          <ul className="feature-list">
            {PREMIUM_FEATURES.map((f) => (
              <li key={f.label}>
                <span className={`feat-check ${f.yes ? "yes" : "no"}`}>
                  {f.yes ? "✓" : "✕"}
                </span>
                <span className="feat-label">{f.label}</span>
                {f.value && <span className="feat-value">{f.value}</span>}
              </li>
            ))}
          </ul>

          <button
            className="select-button premium-btn"
            onClick={handlePremium}
            disabled={isPremium}
          >
            {isPremium ? "✓ Plan activo" : "Obtener Premium"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Promotion;
