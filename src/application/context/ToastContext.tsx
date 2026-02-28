import { createContext, useContext, useState, useCallback } from "react";
import type { ReactNode } from "react";

// ─── Tipos ───────────────────────────────────────────────────────────

export type ToastType = "success" | "error" | "warning";

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toasts: Toast[];
  showToast: (message: string, type?: ToastType) => void;
  removeToast: (id: string) => void;
}

const TOAST_DURATION_MS = 7000;
const MAX_TOASTS = 3;

// ─── Contexto ────────────────────────────────────────────────────────

const ToastContext = createContext<ToastContextType | null>(null);

export function useToast(): ToastContextType {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast debe usarse dentro de <ToastProvider>");
  return ctx;
}

// ─── Provider ────────────────────────────────────────────────────────

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, type: ToastType = "success") => {
      setToasts((prev) => {
        // Ignorar si ya existe un toast con el mismo mensaje
        if (prev.some((t) => t.message === message)) return prev;

        const id = Date.now().toString() + Math.random().toString(36).slice(2);
        const newToast: Toast = { id, message, type };
        let next = [...prev, newToast];

        // Mantener máximo MAX_TOASTS (eliminar los más antiguos)
        if (next.length > MAX_TOASTS) {
          next = next.slice(next.length - MAX_TOASTS);
        }

        // Auto-remove después de TOAST_DURATION_MS
        setTimeout(() => {
          setToasts((current) => current.filter((t) => t.id !== id));
        }, TOAST_DURATION_MS);

        return next;
      });
    },
    [],
  );

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
}
