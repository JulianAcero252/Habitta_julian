import { Link } from "react-router-dom";
import "./errorPage.css";

interface ErrorPageProps {
  code?: number;
  title?: string;
  description?: string;
}

const errorDefaults: Record<number, { title: string; description: string }> = {
  404: {
    title: "Página no encontrada",
    description:
      "Lo sentimos, la página que buscas no existe o ha sido movida.",
  },
  500: {
    title: "Error del servidor",
    description:
      "Ocurrió un error interno. Estamos trabajando para solucionarlo.",
  },
  503: {
    title: "Servicio no disponible",
    description:
      "El servicio está temporalmente fuera de línea por mantenimiento. Intenta de nuevo más tarde.",
  },
};

function ErrorPage({ code = 404, title, description }: ErrorPageProps) {
  const defaults = errorDefaults[code] || errorDefaults[404];
  const displayTitle = title || defaults.title;
  const displayDesc = description || defaults.description;

  return (
    <div className="error-page">
      <div className="error-page__content">
        <span className="error-page__code">{code}</span>
        <h1 className="error-page__title">{displayTitle}</h1>
        <p className="error-page__description">{displayDesc}</p>
        <Link to="/" className="error-page__button">
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;
