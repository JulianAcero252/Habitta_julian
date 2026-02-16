/**
 * FavoritosSection - Sección de Propiedades Favoritas
 *
 * Muestra las propiedades que el usuario ha marcado como favoritas
 */

import React from "react";
import "./sections.css";

/**
 * Componente que muestra las propiedades favoritas del usuario
 */
const FavoritosSection: React.FC = () => {
  // Contador de favoritos - Se integraría con el backend
  const cantidadFavoritos = 12;

  return (
    <div className="section-content">
      <h2 className="section-title">Propiedades Favoritas</h2>

      <div className="favoritos-info">
        <p className="favoritos-info__text">
          Tienes {cantidadFavoritos} propiedades marcadas como favoritas.
        </p>
        <button className="btn-secondary">Ver Todos los Favoritos</button>
      </div>

      <div className="empty-state">
        <svg
          className="empty-state__icon"
          width="120"
          height="120"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        <h3 className="empty-state__title">
          Tus propiedades favoritas aparecerán aquí
        </h3>
        <p className="empty-state__description">
          Explora nuestro catálogo y marca las propiedades que más te gusten con
          el ícono de corazón
        </p>
        <button className="btn-primary">Explorar Propiedades</button>
      </div>
    </div>
  );
};

export default FavoritosSection;
