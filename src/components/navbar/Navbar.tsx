import "./navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__inner">
        {/* Logo */}
        <div className="navbar__logo">
          <Link to="/">
            <img
              src="/images/logoSF.png"
              alt="Habitta logo"
              className="navbar__logo-img"
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="navbar__links">
          <ul>
            <li>
              <Link className="navbar_link" to="/">
                <img
                  className="navbar_icon"
                  src="/icons/home-1393-svgrepo-com.svg"
                  alt=""
                />
                Inicio
              </Link>
            </li>
            <li>
              <Link className="navbar_link" to="/properties">
                <img
                  className="navbar_icon"
                  src="/icons/glass-magnifier-search-zoom-alert-notification-svgrepo-com.svg"
                  alt=""
                />
                Propiedades
              </Link>
            </li>
            <li>
              <Link className="navbar_link" to="/favorites">
                <img
                  className="navbar_icon"
                  src="/icons/hearth-svgrepo-com.svg"
                  alt=""
                />
                Favoritos
              </Link>
            </li>
            <li>
              <Link className="navbar_link" to="/tools">
                <img
                  className="navbar_icon"
                  src="/icons/calculator-svgrepo-com.svg"
                  alt=""
                />
                Herramientas
              </Link>
            </li>
            <li>
              <Link className="navbar_link" to="/promotion">
                <img
                  className="navbar_icon"
                  src="/icons/star-alt-4-svgrepo-com.svg"
                  alt=""
                />
                Promociones
              </Link>
            </li>
          </ul>
        </nav>

        {/* Notification Icon */}
        <li id="notificationButton">
          <img
            id="notificationIcon"
            src="/icons/notification-9-svgrepo-com.svg"
            alt=""
          />
        </li>

        {/* Publish and User Icons */}
        <div className="navbar__actions">
          <Link to="/registerpropeties" className="navbar__publish-btn">
            + Publicar
          </Link>
          <button className="navbar__user-btn">
            <span>👤</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
