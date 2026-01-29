import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { Outlet, Link, useLocation } from "react-router-dom";
import "./Layout.css";

export default function Layout() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/auth";

  return (
    <>
      {!isAuthPage && <Navbar />}
      <main style={{ width: "100%", boxSizing: "border-box" }}>
        {/* Aquí se renderizan las rutas hijas */}
        <Outlet />
      </main>
      {!isAuthPage && <Footer />}

      {/* Floating Auth Button - Only show when not on auth page */}
      {!isAuthPage && (
        <Link to="/auth" className="floating-auth-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </Link>
      )}
    </>
  );
}
