import { useState } from "react";
import "./PropertyDetailsPage.css";

const mainImage = "/images/auth/dream_home_1.png";
const thumbnails = [
  "/images/auth/dream_home_1.png",
  "/images/auth/dream_home_2.png",
  "/images/auth/dream_home_3.png",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80",
];

function PropertyDetailsPage() {
  const [selectedImg, setSelectedImg] = useState(mainImage);

  // Tabs
  const [activeTab, setActiveTab] = useState("Descripción");
  const tabNames = ["Descripción", "Características", "Ubicación", "Financiamiento"];
  return (
    <div className="property-details-container">
      <div className="property-details-main">
        <div className="property-details-image-section">
          <img src={selectedImg} alt="Propiedad" className="property-details-main-img" />
          {/* Botones de navegación (simulados) */}
          <button className="property-details-arrow left" aria-label="Anterior">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="32" cy="32" r="32" fill="#fff"/>
              <path d="M40 32H24M24 32l8-8M24 32l8 8" stroke="#10D6C2" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button className="property-details-arrow right" aria-label="Siguiente">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="32" cy="32" r="32" fill="#fff"/>
              <path d="M24 32h16M40 32l-8-8M40 32l-8 8" stroke="#10D6C2" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button className="property-details-expand">&#9633;</button>
          <button className="property-details-share">&#x1f517;</button>
        </div>
        <div className="property-details-thumbnails">
          {thumbnails.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Miniatura ${idx + 1}`}
              className={`property-details-thumbnail${selectedImg === img ? " selected" : ""}`}
              onClick={() => setSelectedImg(img)}
            />
          ))}
        </div>
        <div className="property-details-info">
          <span className="property-details-badge">Venta</span>
          <h2 className="property-details-price">3.200.000.000</h2>
        </div>
        {/* Tabs Section */}
        <div className="property-details-tabs">
          {tabNames.map(tab => (
            <button
              key={tab}
              className={`property-details-tab${activeTab === tab ? " active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="property-details-tab-content">
          {activeTab === "Descripción" && (
            <div className="property-details-description-box">
              <p>
                Esta hermosa casa moderna ubicada en el prestigioso barrio de Polanco ofrece un diseño contemporáneo con acabados de lujo y una ubicación privilegiada.<br />
                La propiedad cuenta con amplios espacios, iluminación natural en todas las habitaciones y un diseño funcional perfecto para familias modernas.
              </p>
              <p>Características destacadas:</p>
              <ul>
                <li>Cocina integral con electrodomésticos de acero inoxidable</li>
                <li>Sala de estar con chimenea y techos altos</li>
                <li>Jardín privado con área de entretenimiento</li>
                <li>Garage para 2 automóviles</li>
                <li>Sistema de seguridad 24/7</li>
                <li>Acabados de mármol en baños principales</li>
              </ul>
            </div>
          )}
          {/* Puedes agregar contenido para los otros tabs aquí */}
        </div>
        {/* Sección de información de propiedad y agente */}
        <div className="property-details-info-box">
          <div className="property-details-info-header">
            <span className="property-details-badge">Venta</span>
            <button className="property-details-fav-btn" aria-label="Favorito">
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="22" cy="22" r="20" fill="#fff"/>
                <path d="M22 33s-8.5-6.7-11.5-10.9C7 17.2 8.5 13.5 12 13.5c2.38 0 3.92 1.56 4.6 3.06C17.68 15.06 19.22 13.5 21.6 13.5c3.5 0 5 3.7 2 8.6C30.5 26.3 22 33 22 33z" fill="#10D6C2"/>
              </svg>
            </button>
            <button className="property-details-share-btn" aria-label="Compartir">
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="22" cy="22" r="20" fill="#fff"/>
                <path d="M29.5 27.5a3.5 3.5 0 0 0-2.77 1.38l-8.46-4.23a3.5 3.5 0 0 0 0-2.3l8.46-4.23A3.5 3.5 0 1 0 27 14.5a3.5 3.5 0 0 0 0 2.3l-8.46 4.23A3.5 3.5 0 1 0 14.5 29.5a3.5 3.5 0 0 0 2.77-1.38l8.46 4.23A3.5 3.5 0 1 0 29.5 27.5z" stroke="#A78BFA" stroke-width="2.5" fill="none"/>
              </svg>
            </button>
          </div>
          <h2 className="property-details-info-price">$3.200.000.000 COP</h2>
          <span className="property-details-info-price-m2">$12.800.000/m²</span>
          <div className="property-details-info-features">
            <div>
              <span className="property-details-info-icon">&#128719;</span>
              <span className="property-details-info-value">4</span>
              <span className="property-details-info-label">Habitaciones</span>
            </div>
            <div>
              <span className="property-details-info-icon">&#128705;</span>
              <span className="property-details-info-value">3</span>
              <span className="property-details-info-label">baños</span>
            </div>
            <div>
              <span className="property-details-info-icon">&#9632;</span>
              <span className="property-details-info-value">250</span>
              <span className="property-details-info-label">m²</span>
            </div>
          </div>
          <button className="property-details-info-call-btn">Llamar ahora</button>
          <button className="property-details-info-msg-btn">Enviar mensaje</button>
        </div>
        <div className="property-details-agent-box">
          <h3>Agente inmobiliario</h3>
          <div className="property-details-agent-profile">
            <div className="property-details-agent-avatar">MG</div>
            <div className="property-details-agent-info">
              <span className="property-details-agent-name">María González</span>
              <span className="property-details-agent-cert">Agente inmobiliario certificado</span>
              <span className="property-details-agent-reviews">&#11088; (127 reseñas)</span>
              <div className="property-details-agent-specialties">
                <span className="property-details-agent-specialty">Venta</span>
                <span className="property-details-agent-specialty">Venta</span>
                <span className="property-details-agent-specialty">Venta</span>
              </div>
            </div>
          </div>
          <button className="property-details-agent-profile-btn">Ver perfil completo</button>
        </div>
        <div className="property-details-meta-box">
          <div className="property-details-meta-row">
            <span>ID de propiedad:</span>
            <span>#HTT-000001</span>
          </div>
          <div className="property-details-meta-row">
            <span>Publicado:</span>
            <span>Hace 3 días</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetailsPage;
