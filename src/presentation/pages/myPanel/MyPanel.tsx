/**
 * Esta página gestiona el panel de control del usuario donde puede ver
 * sus propiedades, favoritos, reportes y configurar su perfil
 */

import React, { useState } from "react";
import TabNavigator from "./componentsMyPanel/TabNavigator";
import PropiedadesSection from "./componentsMyPanel/PropiedadesSection";
import FavoritosSection from "./componentsMyPanel/FavoritosSection";
import ReportesSection from "./componentsMyPanel/ReportesSection";
import PerfilSection from "./componentsMyPanel/PerfilSection";
import "./myPanel.css";

/**
 * Componente principal de la página Mi Panel
 */
const MyPanel: React.FC = () => {
  // Estado para controlar la pestaña activa
  const [activeTab, setActiveTab] = useState<string>("propiedades");

  /**
   * Maneja el cambio de pestaña
   * @param tab - ID de la pestaña seleccionada
   */
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  /**
   * Renderiza el contenido de la sección activa
   * @returns Componente de la sección correspondiente
   */
  const renderActiveSection = () => {
    switch (activeTab) {
      case "propiedades":
        return <PropiedadesSection />;
      case "favoritos":
        return <FavoritosSection />;
      case "reportes":
        return <ReportesSection />;
      case "perfil":
        return <PerfilSection />;
      default:
        return <PropiedadesSection />;
    }
  };

  // Datos de estadísticas - Se integrarían con el backend
  const estadisticas = [
    {
      id: 1,
      numero: "8",
      label: "Propiedades",
      icono: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
      ),
      color: "#35d2db",
    },
    {
      id: 2,
      numero: "6",
      label: "Activas",
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
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
      ),
      color: "#10b981",
    },
    {
      id: 3,
      numero: "12",
      label: "Favoritos",
      icono: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ),
      color: "#ec4899",
    },
    {
      id: 4,
      numero: "1247",
      label: "Visualizaciones",
      icono: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
        </svg>
      ),
      color: "#3b82f6",
    },
    {
      id: 5,
      numero: "23",
      label: "Contactos",
      icono: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 11H7V9h2v2zm4 0h-2V9h2v2zm4 0h-2V9h2v2z" />
        </svg>
      ),
      color: "#8b5cf6",
    },
  ];

  return (
    <div className="my-panel">
      {/* Encabezado del panel */}
      <div className="my-panel__header">
        <div className="my-panel__header-content">
          <h1 className="my-panel__title">Mi Panel</h1>
          <p className="my-panel__subtitle">
            Gestiona tus propiedades y configuración de cuenta
          </p>
        </div>
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="my-panel__stats">
        <div className="stats-container">
          {estadisticas.map((stat) => (
            <div key={stat.id} className="stat-card">
              <div className="stat-card__icon" style={{ color: stat.color }}>
                {stat.icono}
              </div>
              <div className="stat-card__info">
                <span className="stat-card__number">{stat.numero}</span>
                <span className="stat-card__label">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navegación por pestañas */}
      <TabNavigator activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Contenido de la sección activa */}
      <div className="my-panel__content">{renderActiveSection()}</div>
    </div>
  );
};

export default MyPanel;
