import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { AuthProvider } from "@application/context/AuthContext";
import { ToastProvider } from "@application/context/ToastContext";
import App from "../App";

/**
 * Test de ejemplo para verificar que Vitest funciona correctamente.
 * Renderiza el componente App dentro de los proveedores necesarios.
 * Nota: App ya crea su propio BrowserRouter, no se envuelve en MemoryRouter.
 */
describe("App", () => {
  it("debería renderizar sin errores", () => {
    render(
      <ToastProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ToastProvider>,
    );

    // Si llega aquí sin errores, el componente se renderizó correctamente
    expect(document.body).toBeTruthy();
  });
});
