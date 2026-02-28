import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { AuthProvider } from "@application/context/AuthContext";
import { ToastProvider } from "@application/context/ToastContext";
import ToastStack from "@presentation/components/alerts/toast/ToastStack";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
      <ToastStack />
    </ToastProvider>
  </StrictMode>,
);
