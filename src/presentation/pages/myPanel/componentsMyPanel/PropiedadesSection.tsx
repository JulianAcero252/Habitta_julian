/**
 * PropiedadesSection - Sección de Mis Propiedades
 *
 * Muestra las propiedades publicadas por el usuario
 */

import React from "react";
import "./sections.css";

/**
 * Componente que muestra la lista de propiedades del usuario
 */
const PropiedadesSection: React.FC = () => {
  // Datos de ejemplo - Aquí se integraría con el backend
  const propiedades = [
    {
      id: 1,
      titulo: "Apartamento Moderno Centro",
      ubicacion: "Centro, Ciudad",
      tipo: "Apartamento",
      precio: "$2.600.000.000 COP",
      visualizaciones: 145,
      contactos: 8,
      fecha: "2024-01-15",
      estado: "Activo",
    },
    {
      id: 2,
      titulo: "Casa Familiar Suburbios",
      ubicacion: "Suburbios Norte",
      tipo: "Casa",
      precio: "$3.560.000.000 COP",
      visualizaciones: 67,
      contactos: 3,
      fecha: "2024-01-10",
      estado: "Pendiente",
    },
    {
      id: 3,
      titulo: "Loft Industrial Moderno",
      ubicacion: "Zona Industrial",
      tipo: "Loft",
      precio: "$1.900.000.000 COP",
      visualizaciones: 98,
      contactos: 12,
      fecha: "2024-02-01",
      estado: "Activo",
    },
  ];

  return (
    <div className="section-content">
      <div className="section-header-row">
        <h2 className="section-title">Mis Propiedades</h2>
        <button className="btn-primary">+ Publicar Propiedad</button>
      </div>

      <div className="propiedades-list">
        {propiedades.map((propiedad) => (
          <div key={propiedad.id} className="propiedad-card">
            <div className="propiedad-card__info">
              <div className="propiedad-card__header">
                <h3 className="propiedad-card__title">{propiedad.titulo}</h3>
                <span
                  className={`estado-badge estado-badge--${propiedad.estado.toLowerCase()}`}
                >
                  {propiedad.estado}
                </span>
              </div>

              <div className="propiedad-card__details">
                <span className="detail-item">
                  <svg
                    className="icon"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path d="M8 0C5.243 0 3 2.243 3 5c0 4.5 5 11 5 11s5-6.5 5-11c0-2.757-2.243-5-5-5zm0 7.5c-1.381 0-2.5-1.119-2.5-2.5S6.619 2.5 8 2.5s2.5 1.119 2.5 2.5S9.381 7.5 8 7.5z" />
                  </svg>
                  {propiedad.ubicacion}
                </span>
                <span className="detail-item">
                  <svg
                    className="icon"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path d="M2 2h4v4H2V2zm6 0h6v4H8V2zM2 8h4v6H2V8zm6 0h6v6H8V8z" />
                  </svg>
                  {propiedad.tipo}
                </span>
              </div>

              <div className="propiedad-card__price">{propiedad.precio}</div>

              <div className="propiedad-card__stats">
                <span className="stat-item">
                  <svg
                    className="icon"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path d="M8 3.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9zM8 10a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                  {propiedad.visualizaciones} visualizaciones
                </span>
                <span className="stat-item">
                  <svg
                    className="icon"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path d="M2 2h3v3H2V2zm5 0h7v1H7V2zm0 2h5v1H7V4zM2 7h3v3H2V7zm5 0h7v1H7V7zm0 2h5v1H7V9zm-5 3h3v3H2v-3zm5 0h7v1H7v-1zm0 2h5v1H7v-1z" />
                  </svg>
                  {propiedad.contactos} contactos
                </span>
                <span className="stat-item">
                  <svg
                    className="icon"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path d="M3 2h10v12H3V2zm2 2v8h6V4H5z" />
                  </svg>
                  {propiedad.fecha}
                </span>
              </div>
            </div>

            <div className="propiedad-card__actions">
              <button className="action-btn action-btn--edit" title="Editar">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path d="M12.146.854a.5.5 0 0 1 .708 0l2.292 2.292a.5.5 0 0 1 0 .708l-9 9a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l9-9z" />
                </svg>
              </button>
              <button className="action-btn action-btn--view" title="Ver">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path d="M8 3.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9zM8 10a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </button>
              <button
                className="action-btn action-btn--delete"
                title="Eliminar"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path d="M5.5 1a.5.5 0 0 1 .5.5V2h4v-.5a.5.5 0 0 1 1 0V2h1.5a.5.5 0 0 1 0 1H13v10.5a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 13.5V3H1.5a.5.5 0 0 1 0-1H3v-.5a.5.5 0 0 1 .5-.5h2zM5 3v10.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V3H5z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropiedadesSection;
