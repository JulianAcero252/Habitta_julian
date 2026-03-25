import "./footer.css";
import { Link } from "react-router-dom";
import {
  footerSections,
  countries,
  socialMedia,
  contactInfo,
} from "./footerData";
// import logoHabitta from "../../assets/images/logoCF.png";
const logoHabitta = "/images/logoCF.png";


// Footer Component
function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Logo & Info */}
        <div className="footer__left">
          <div className="footer__logo-section">
            <img
              src={logoHabitta}
              alt="Logo de Habitta"
              className="footer__logo"
            />
            <h2 className="footer__title">Habitta</h2>
          </div>

          <p className="footer__description">{contactInfo.description}</p>

          {/* Contact Info */}
          <div className="footer__contact">
            <div className="footer__contact-item">
              <span className="footer__icon">✉️</span>
              <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
            </div>
            <div className="footer__contact-item">
              <span className="footer__icon">📞</span>
              <a href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}>
                {contactInfo.phone}
              </a>
            </div>
            <div className="footer__contact-item">
              <span className="footer__icon">📍</span>
              <span>{contactInfo.location}</span>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="footer__center">
          {footerSections.map((section) => (
            <div key={section.title} className="footer__section">
              <h3 className="footer__section-title">{section.title}</h3>
              <ul className="footer__links">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="footer__link">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Operation Countries */}
      <div className="footer__countries-section">
        <p className="footer__countries-label">Operamos en:</p>
        <div className="footer__countries">
          {countries.map((country) => (
            <button key={country} className="footer__country-btn">
              {country}
            </button>
          ))}
        </div>
      </div>

      {/* Social & Legal */}
      <div className="footer__bottom">
        <div className="footer__social">
          <p className="footer__social-label">Síguenos en:</p>
          <div className="footer__social-icons">
            {socialMedia.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-icon"
                aria-label={social.name}
              >
                {getSocialIcon(social.name)}
              </a>
            ))}
          </div>
        </div>

        <div className="footer__legal">
          <Link to="/privacy" className="footer__legal-link">
            Política de privacidad
          </Link>
          <span className="footer__legal-separator">|</span>
          <Link to="/terms" className="footer__legal-link">
            Términos de uso
          </Link>
          <span className="footer__legal-separator">|</span>
          <a href="#" className="footer__legal-link">
            Cookies
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer__copyright">
        <p>
          © 2024 Habitta. Todos los derechos reservados. Hecho con ❤️ para
          Latinoamérica.
        </p>
      </div>
    </footer>
  );
}

// Helper to get social icons
function getSocialIcon(name: string) {
  switch (name) {
    case "facebook":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
          <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.325-.593 1.325-1.325V1.325C24 .593 23.407 0 22.675 0z" />
        </svg>
      );
    case "instagram":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="url(#instaGradient)" strokeWidth="0">
          <defs>
            <radialGradient id="instaGradient" cx="30%" cy="100%" r="150%">
              <stop offset="0%" stopColor="#fdf497" />
              <stop offset="5%" stopColor="#fdf497" />
              <stop offset="45%" stopColor="#fd5949" />
              <stop offset="60%" stopColor="#d6249f" />
              <stop offset="90%" stopColor="#285AEB" />
            </radialGradient>
          </defs>
          <path fill="url(#instaGradient)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.981 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.981-6.98.058-1.28.072-1.689.072-4.948 0-3.259-.014-3.668-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      );
    case "youtube":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#FF0000">
          <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505a3.017 3.017 0 00-2.122 2.136C0 8.055 0 12 0 12s0 3.945.501 5.814a3.015 3.015 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.945 24 12 24 12s0-3.945-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    default:
      return "🔗";
  }
}

export default Footer;
