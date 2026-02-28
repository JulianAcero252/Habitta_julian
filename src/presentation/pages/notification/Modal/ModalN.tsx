import "./modal.css";
import { type FC, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface ModalNProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Notification {
  id: number;
  title: string;
  description: string;
  time: string;
  type: "property" | "message" | "promotion";
}

const ModalN: FC<ModalNProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      // Ignorar si hace click en el botón de notificaciones, Navbar se encarga
      const btn = document.getElementById("notificationButton");
      if (btn && btn.contains(e.target as Node)) {
        return;
      }
      // Cerrar si hace click fuera del modal
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleViewAll = () => {
    onClose();
    navigate("/notification");
  };

  const notifications: Notification[] = [
    {
      id: 1,
      title: "Nueva Propiedad disponible",
      description:
        "se ha publicado una nueva propiedad que coincide con tus búsquedas",
      time: "Hace 29 minutos",
      type: "property",
    },
    {
      id: 2,
      title: "Mensaje Recibido",
      description: "tienes un nueva mensaje sobre tu propiedad",
      time: "Hace 1 horas",
      type: "message",
    },
  ];

  const getNotificationTypeClass = (type: string) => {
    switch (type) {
      case "property":
        return "notification-card--property";
      case "message":
        return "notification-card--message";
      default:
        return "";
    }
  };

  return (
    <div className="modal-content" ref={modalRef}>
      <header className="modal-header">
        <h2 className="modal-title">Notificaciones</h2>
      </header>

      <section className="modal-body">
        <div className="notifications-list">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`notification-card ${getNotificationTypeClass(notif.type)}`}
            >
              <h3 className="notification-title">{notif.title}</h3>
              <p className="notification-description">{notif.description}</p>
              <p className="notification-time">{notif.time}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="modal-footer">
        <button className="modal-view-all-btn" onClick={handleViewAll}>
          Ver todas las notificaciones
        </button>
      </footer>
    </div>
  );
};

export default ModalN;
