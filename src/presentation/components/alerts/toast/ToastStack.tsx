import { type FC } from "react";
import { useToast } from "@application/context/ToastContext";
import type { ToastType } from "@application/context/ToastContext";
import "./toastStack.css";

const iconMap: Record<ToastType, string> = {
  success: "✓",
  error: "✕",
  warning: "!",
};

const ToastStack: FC = () => {
  const { toasts } = useToast();

  return (
    <div className="toast-stack-container">
      {toasts.map((toast, index) => (
        <div
          key={toast.id}
          className={`toast-item toast-item--${toast.type}`}
          style={{ top: `${index * 70}px` }}
        >
          <span className={`toast-icon toast-icon--${toast.type}`}>
            {iconMap[toast.type]}
          </span>
          <p className="toast-message">{toast.message}</p>
        </div>
      ))}
    </div>
  );
};

export default ToastStack;
