import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@application/context/AuthContext";
import "./premiumPromoModal.css";
// Reutilizamos promoción CSS para no duplicar clases de las tarjetas si es posible,
// o traemos unas clases dedicadas. Mejor usar estilos dedicados para el modal para que encaje bien.

interface PremiumPromoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  fromAction?: "register" | "create_property" | "limit_reached";
}

const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/test_fZu9AVexa1v3dAW5DxdIA00";

const PremiumPromoModal: React.FC<PremiumPromoModalProps> = ({
  isOpen,
  onClose,
  title = "¡Mejora tu experiencia en Habitta!",
  subtitle = "Elige el plan que mejor se adapte a tus necesidades.",
  fromAction
}) => {
  const { usuario } = useAuth();
  const navigate = useNavigate();

  // Bloquear scroll cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePremium = () => {
    const clientRef = usuario?.idusuario ?? "guest";
    window.location.href = `${STRIPE_PAYMENT_LINK}?client_reference_id=${clientRef}`;
  };

  const handleContinueFree = () => {
    onClose();
    if (fromAction === "register") {
      navigate("/mypanel"); // Ir al panel después del registro
    }
  };

  return createPortal(
    <div className="premium-modal-overlay">
      <div className="premium-modal-content">
        <button className="premium-modal-close" onClick={handleContinueFree} aria-label="Cerrar modal">
          ×
        </button>

        <div className="premium-modal-header">
          <p className="premium-modal-eyebrow">Planes de Habitta</p>
          <h2 className="premium-modal-title">{title}</h2>
          <p className="premium-modal-subtitle">{subtitle}</p>
        </div>

        <div className="premium-modal-cards">
          {/* Plan Gratis */}
          <div className="premium-modal-card">
            <div className="premium-modal-card-header">
              <div className="premium-icon-container">
                <svg width="22" height="22" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 20 C52 40 60 48 80 50 C60 52 52 60 50 80 C48 60 40 52 20 50 C40 48 48 40 50 20 Z" stroke="#35d2db" strokeWidth="8" strokeLinejoin="round" />
                </svg>
              </div>
              <h3>Gratis</h3>
            </div>
            <div className="premium-modal-price">
              <span className="currency">$</span>0 <span className="period">Para siempre</span>
            </div>
            <ul className="premium-modal-features">
              <li><span className="check yes">✓</span> 3 Publicaciones activas</li>
              <li><span className="check yes">✓</span> 5 Fotos por propiedad</li>
              <li><span className="check no">✕</span> Sin destacar en búsquedas</li>
            </ul>
            <button className="premium-modal-btn free" onClick={handleContinueFree}>
              {fromAction === "limit_reached" ? "Cancelar" : "Continuar Gratis"}
            </button>
          </div>

          {/* Plan Premium */}
          <div className="premium-modal-card featured">
            <span className="premium-badge">⚡ Popular</span>
            <div className="premium-modal-card-header">
              <div className="premium-icon-container premium-bg">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 2L6 12H11L10 22L18 11H13L14 2.5" stroke="#35d2db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3>Premium</h3>
            </div>
            <div className="premium-modal-price">
              <span className="currency">$</span>29.900 <span className="period">COP / mes</span>
            </div>
            <ul className="premium-modal-features">
              <li><span className="check yes">✓</span> Publicaciones ilimitadas</li>
              <li><span className="check yes">✓</span> 25 Fotos por propiedad</li>
              <li><span className="check yes">✓</span> Destacado top en búsquedas</li>
            </ul>
            <button className="premium-modal-btn premium-btn" onClick={handlePremium}>
              Obtener Premium
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default PremiumPromoModal;
