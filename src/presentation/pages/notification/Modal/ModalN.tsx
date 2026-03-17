import "./modal.css";
import { type FC, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@application/context/AuthContext";
import { useNotificaciones } from "@application/hooks/useNotificaciones";

interface ModalNProps {
  isOpen: boolean;
  onClose: () => void;
}

/** Mapa de ícono según el tipo de notificación */
const TIPO_ICON: Record<string, string> = {
  propiedad_publicada: "🏠",
  estado_propiedad: "📋",
  nueva_coincidencia: "🔍",
  mensaje: "💬",
  cuenta: "🔒",
};

/** Formato relativo de fecha (hace X min / hace X h) */
function formatRelativo(iso: string | null): string {
  if (!iso) return "";
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "Ahora mismo";
  if (mins < 60) return `Hace ${mins} min`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `Hace ${hrs} h`;
  return `Hace ${Math.floor(hrs / 24)} días`;
}

const ModalN: FC<ModalNProps> = ({ isOpen, onClose }) => {
  const { usuario } = useAuth();
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDivElement>(null);
  const { notificaciones, loading, noLeidasCount, marcarTodasLeidas, eliminar } =
    useNotificaciones(usuario?.idusuario);

  /** Cerrar al hacer clic fuera */
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const btn = document.getElementById("notificationButton");
      if (btn && btn.contains(e.target as Node)) return;
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleVerTodas = () => {
    onClose();
    navigate("/notification");
  };

  // Mostrar solo las 5 más recientes en el modal
  const recientes = notificaciones.slice(0, 5);

  return (
    <div className="modal-content" ref={modalRef}>
      <header className="modal-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h2 className="modal-title">
          Notificaciones
          {noLeidasCount > 0 && (
            <span style={{
              marginLeft: "8px",
              background: "#e74c3c",
              color: "#fff",
              borderRadius: "12px",
              padding: "2px 8px",
              fontSize: "0.75rem",
              fontWeight: 700,
            }}>
              {noLeidasCount}
            </span>
          )}
        </h2>
        {noLeidasCount > 0 && (
          <button
            onClick={marcarTodasLeidas}
            style={{
              background: "none",
              border: "none",
              color: "#35d2db",
              fontSize: "0.8rem",
              cursor: "pointer",
              fontWeight: 600,
              padding: "4px 8px",
            }}
          >
            Marcar todas
          </button>
        )}
      </header>

      <section className="modal-body">
        {loading && (
          <p style={{ textAlign: "center", color: "#aaa", padding: "2rem" }}>
            Cargando...
          </p>
        )}

        {!loading && recientes.length === 0 && (
          <p style={{ textAlign: "center", color: "#aaa", padding: "2rem", fontSize: "0.9rem" }}>
            No tienes notificaciones.
          </p>
        )}

        <div className="notifications-list">
          {recientes.map((n) => (
            <div
              key={n.idnotificacion}
              className={`notification-card ${n.leido ? "" : "notification-card--unread"}`}
              style={{
                background: n.leido ? "#fafafa" : "#f0fbfc",
                borderLeft: n.leido ? "4px solid #ddd" : "4px solid #35d2db",
                cursor: "default",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "8px" }}>
                <div style={{ flex: 1 }}>
                  <h3 className="notification-title" style={{ fontSize: "0.9rem" }}>
                    {TIPO_ICON[n.tipo] ?? "🔔"} {n.titulo}
                  </h3>
                  {n.descripcion && (
                    <p className="notification-description" style={{ fontSize: "0.82rem" }}>
                      {n.descripcion}
                    </p>
                  )}
                  <p className="notification-time">{formatRelativo(n.fechaEnvio)}</p>
                </div>
                <button
                  onClick={() => eliminar(n.idnotificacion)}
                  title="Eliminar"
                  style={{
                    background: "none",
                    border: "none",
                    color: "#ccc",
                    cursor: "pointer",
                    fontSize: "1.1rem",
                    padding: "0 4px",
                    lineHeight: 1,
                    flexShrink: 0,
                  }}
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="modal-footer">
        <button className="modal-view-all-btn" onClick={handleVerTodas}>
          Ver todas las notificaciones {notificaciones.length > 0 && `(${notificaciones.length})`}
        </button>
      </footer>
    </div>
  );
};

export default ModalN;
