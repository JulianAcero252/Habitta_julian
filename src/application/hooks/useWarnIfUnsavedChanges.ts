import { useEffect } from "react";
import { useBlocker } from "react-router-dom";

/**
 * Hook para mostrar una alerta del navegador si el usuario intenta salirse o recargar la página
 * cuando hay cambios sin guardar en un formulario.
 *
 * Intercepta recargas/cierre de pestaña (con beforeunload) y navegaciones internas SPA (con useBlocker).
 *
 * @param isDirty boolean - true si hay cambios sin guardar
 * @param message string - El mensaje a mostrar (la mayoría de navegadores modernos ignoran este texto y usan el propio)
 */
export function useWarnIfUnsavedChanges(
  isDirty: boolean,
  message: string = "¿Seguro que quieres salir? Perderás los datos ingresados.",
) {
  // 1. Bloquear navegaciones internas (SPA)
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      isDirty && currentLocation.pathname !== nextLocation.pathname,
  );

  useEffect(() => {
    if (blocker.state === "blocked") {
      const confirmLeave = window.confirm(message);
      if (confirmLeave) {
        blocker.proceed();
      } else {
        blocker.reset();
      }
    }
  }, [blocker, message]);

  // 2. Bloquear recargas o cierre de la pestaña
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        // Required for Chrome
        e.returnValue = message;
        return message;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty, message]);
}
