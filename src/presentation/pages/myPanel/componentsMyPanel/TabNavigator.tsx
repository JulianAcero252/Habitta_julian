/**
 * TabNavigator - Componente de navegación por pestañas
 *
 * Este componente maneja la navegación entre las diferentes secciones
 * del panel de usuario: Mis Propiedades, Favoritos, Reportes y Perfil
 */

import React from "react";
import "./tabNavigator.css";

interface TabNavigatorProps {
  /** Pestaña activa actualmente */
  activeTab: string;
  /** Función para cambiar de pestaña */
  onTabChange: (tab: string) => void;
}

/**
 * Componente que renderiza la barra de navegación con pestañas
 */
const TabNavigator: React.FC<TabNavigatorProps> = ({
  activeTab,
  onTabChange,
}) => {
  // Definición de las pestañas disponibles
  const tabs = [
    { id: "propiedades", label: "Mis Propiedades" },
    { id: "favoritos", label: "Favoritos" },
    { id: "reportes", label: "Reportes" },
    { id: "perfil", label: "Perfil" },
  ];

  return (
    <nav className="tab-navigator">
      <div className="tab-navigator__container">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-navigator__button ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => onTabChange(tab.id)}
            aria-current={activeTab === tab.id ? "page" : undefined}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default TabNavigator;
