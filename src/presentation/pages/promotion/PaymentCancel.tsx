import { useNavigate } from "react-router-dom";
import "./promotion.css";

export default function PaymentCancel() {
  const navigate = useNavigate();

  return (
    <div className="promo-page-container" style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="promo-card free" style={{ textAlign: "center", padding: "4rem 2rem", maxWidth: "600px", margin: "0 auto", borderTop: "4px solid #ef4444" }}>
        
        <svg stroke="#ef4444" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="80px" width="80px" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: "1.5rem", opacity: 0.8 }}>
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="15" y1="9" x2="9" y2="15"></line>
          <line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>

        <div className="promo-header">
          <span className="promo-badge" style={{ background: "#fee2e2", color: "#b91c1c" }}>Pago Cancelado</span>
          <h2 className="promo-title" style={{ color: "#1f2937" }}>No se completó tu suscripción</h2>
        </div>
        
        <p className="promo-subtitle" style={{ color: "#4b5563" }}>
          El proceso de pago fue cancelado o no pudo completarse. Tu cuenta seguirá estando en el plan gratuito y no se te ha cobrado nada.
        </p>

        <p className="promo-subtitle" style={{ fontSize: "0.95rem", color: "#6b7280", marginTop: "1rem" }}>
          Si tuviste algún problema con el método de pago, puedes volver a intentarlo cuando quieras.
        </p>

        <div style={{ display: "flex", gap: "1rem", marginTop: "2rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button 
            className="promo-btn secondary-btn" 
            onClick={() => navigate("/promotions")}
            style={{ width: "200px" }}
          >
            Volver a Promociones
          </button>
          
          <button 
            className="promo-btn" 
            onClick={() => navigate("/")}
            style={{ background: "#f3f4f6", color: "#374151", width: "200px" }}
          >
            Ir al Inicio
          </button>
        </div>
      </div>
    </div>
  );
}
