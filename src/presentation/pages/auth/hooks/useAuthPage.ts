import { useState, useEffect } from "react";

/** Imágenes de fondo del carrusel */
const bgImages = [
  "/images/example/dream_home_1.png",
  "/images/example/dream_home_2.png",
  "/images/example/dream_home_3.png",
];

/** Hook de la página de autenticación — carrusel de fondo + tabs */
export function useAuthPage() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Rotar imagen cada 5 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((i) => (i + 1) % bgImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return {
    activeTab,
    setActiveTab,
    currentImageIndex,
    backgroundImages: bgImages,
  };
}
