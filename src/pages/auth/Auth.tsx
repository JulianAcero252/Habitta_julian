import { useState, useEffect } from "react";
import Login from "./Login";
import Register from "./Register";
import "./Auth.css";

import img1 from "../../assets/images/auth/dream_home_1.png";
import img2 from "../../assets/images/auth/dream_home_2.png";
import img3 from "../../assets/images/auth/dream_home_3.png";

// Images generated and placeholders
const backgroundImages = [
  img1,
  img2,
  img3,
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80", // Luxury Penthouse
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80", // Modern Villa
];

function Auth() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % backgroundImages.length,
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="auth-container">
      {/* Background Carousel */}
      <div className="auth-carousel">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`carousel-slide ${index === currentImageIndex ? "active" : ""}`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
        <div className="carousel-overlay"></div>
      </div>

      <div className="auth-card">
        <div className="auth-header">
          <div className="home-link">
            <span className="home-icon">🏠</span>
            <a href="/">Volver al inicio</a>
          </div>
          <h1>Bienvenido a Habitta</h1>
          <p>Encuentra tu hogar ideal</p>
        </div>

        <div className="auth-tabs">
          <button
            className={`tab-button ${activeTab === "login" ? "active" : ""}`}
            onClick={() => setActiveTab("login")}
          >
            Iniciar Sesión
          </button>
          <button
            className={`tab-button ${activeTab === "register" ? "active" : ""}`}
            onClick={() => setActiveTab("register")}
          >
            Registrarse
          </button>
        </div>

        <div className="auth-content">
          {activeTab === "login" ? <Login /> : <Register />}
        </div>
      </div>
    </div>
  );
}

export default Auth;
