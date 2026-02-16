import { useState } from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { Outlet, useLocation } from "react-router-dom";
import "./Layout.css";
import ModalN from "@presentation/pages/notification/Modal/ModalN";

// Layout Component
export default function Layout() {
  const location = useLocation();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  // Check if current page is Auth to conditionally render Navbar/Footer
  const isAuthPage = location.pathname === "/auth";

  return (
    <>
      {!isAuthPage && <Navbar />}

      {/* Main Content */}
      <main style={{ width: "100%", boxSizing: "border-box" }}>
        <Outlet />
      </main>

      {!isAuthPage && <Footer />}

      {!isAuthPage && (
        <ModalN isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
      )}
    </>
  );
}
