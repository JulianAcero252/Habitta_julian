import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./promotion.css";

export default function PaymentSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    // Si llega a esta pantalla y hay usuario, podríamos hacer un fetch silencioso
    // usando getUserById o similar para forzar la actualización del context
    // si el webhook fue súper rápido.
    const timer = setTimeout(() => {
      navigate("/mypanel", { replace: true });
    }, 6000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="promo-page-container" style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="promo-card premium" style={{ textAlign: "center", padding: "4rem 2rem", maxWidth: "600px", margin: "0 auto" }}>
        
        <svg stroke="#2dd4bf" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="80px" width="80px" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: "1.5rem" }}>
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>

        <div className="promo-header">
          <span className="promo-badge">¡Pago Exitoso!</span>
          <h2 className="promo-title">¡Bienvenido a Premium!</h2>
        </div>
        
        <p className="promo-subtitle" style={{ color: "#374151" }}>
          Muchísimas gracias por confiar en Habitta. Tu pago se ha procesado con éxito y pronto verás reflejados todos tus beneficios.
        </p>

        <p className="promo-subtitle" style={{ fontSize: "0.9rem", color: "#6b7280", marginTop: "1rem" }}>
          <br/>
          Si tu cuenta no aparece como Premium de inmediato, espera uno o dos minutos y recarga la página.
        </p>

        <button 
          className="promo-btn premium-btn" 
          onClick={() => navigate("/mypanel", { replace: true })}
          style={{ marginTop: "2rem", width: "100%", maxWidth: "300px" }}
        >
          Ir a tu Panel
        </button>
      </div>
    </div>
  );
}
