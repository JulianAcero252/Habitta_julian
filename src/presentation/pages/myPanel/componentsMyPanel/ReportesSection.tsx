/**
 * ReportesSection - Sección de Reportes y Estadísticas
 *
 * Muestra los diferentes tipos de reportes disponibles para el usuario
 */

import React from "react";
import "./sections.css";

/**
 * Componente que muestra las opciones de reportes y estadísticas
 */
const ReportesSection: React.FC = () => {
  // Opciones de reportes disponibles
  const reportes = [
    {
      id: 1,
      titulo: "Reporte de Actividad",
      descripcion: "Visualiza la actividad de tus publicaciones",
      icono: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    {
      id: 2,
      titulo: "Estadísticas de Visualizaciones",
      descripcion: "Análisis detallado de las vistas a tus propiedades",
      icono: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      id: 3,
      titulo: "Reporte de Contactos",
      descripcion: "Historial de personas interesadas en tus inmuebles",
      icono: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
    {
      id: 4,
      titulo: "Historial de Mensajes",
      descripcion: "Conversaciones con potenciales compradores",
      icono: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="section-content">
      <h2 className="section-title">Reportes y Estadísticas</h2>

      <div className="reportes-grid">
        {reportes.map((reporte) => (
          <div key={reporte.id} className="reporte-card">
            <div className="reporte-card__icon">{reporte.icono}</div>
            <h3 className="reporte-card__title">{reporte.titulo}</h3>
            <p className="reporte-card__description">{reporte.descripcion}</p>
            <button className="btn-outline">Ver Reporte</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportesSection;
