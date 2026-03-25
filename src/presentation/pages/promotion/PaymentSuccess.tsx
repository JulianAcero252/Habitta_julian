import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@application/context/AuthContext";
import { supabase } from "@infrastructure/supabase/client";
import "./promotion.css";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const { usuario, updatePerfil } = useAuth();
  const [upgrading, setUpgrading] = useState(true);
  const [upgraded, setUpgraded] = useState(false);

  useEffect(() => {
    const upgradeToPremium = async () => {
      if (!usuario) {
        setUpgrading(false);
        return;
      }

      // Si ya es premium, no hacer nada
      if (usuario.plan === "premium") {
        setUpgraded(true);
        setUpgrading(false);
        return;
      }

      try {
        // Actualizar directamente en Supabase
        const { error } = await supabase
          .from("usuarios")
          .update({ plan: "premium", rol: "premium" })
          .eq("idusuario", usuario.idusuario);

        if (error) {
          console.error("Error al actualizar a premium:", error);
        } else {
          // Refrescar el contexto de auth para que toda la app refleje el cambio
          await updatePerfil({ plan: "premium" });
          setUpgraded(true);

          // Insertar notificación de bienvenida
          await supabase.from("notificaciones").insert({
            idusuario: usuario.idusuario,
            titulo: "¡Bienvenido a Premium! 🚀",
            descripcion:
              "Gracias por confiar en Habitta. Tu plan Premium ya está activo. ¡Disfruta de todos los beneficios!",
            tipo: "cuenta",
            leido: false,
            fechaEnvio: new Date().toISOString(),
          });
        }
      } catch (err) {
        console.error("Error en upgrade:", err);
      } finally {
        setUpgrading(false);
      }
    };

    upgradeToPremium();
  }, [usuario]); // eslint-disable-line react-hooks/exhaustive-deps

  // Redirigir automáticamente al panel después de 5 segundos
  useEffect(() => {
    if (!upgrading) {
      const timer = setTimeout(() => {
        navigate("/mypanel", { replace: true });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [upgrading, navigate]);

  return (
    <div className="promotion-container" style={{ minHeight: "80vh", justifyContent: "center" }}>
      <div className="promotion-card featured" style={{ textAlign: "center", padding: "48px 32px", maxWidth: "560px", width: "100%" }}>

        {upgrading ? (
          <>
            <div
              style={{
                width: 48, height: 48,
                border: "4px solid #e5e7eb", borderTop: "4px solid #35d2db",
                borderRadius: "50%", animation: "spin 0.8s linear infinite",
                margin: "0 auto 1.5rem",
              }}
            />
            <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#1a2a35", marginBottom: "0.5rem" }}>
              Activando tu plan Premium...
            </h2>
            <p style={{ color: "#6b7684", fontSize: "0.95rem" }}>
              Estamos procesando tu pago. No cierres esta ventana.
            </p>
          </>
        ) : (
          <>
            <svg
              stroke="#35d2db" fill="none" strokeWidth="2"
              viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"
              height="72px" width="72px" xmlns="http://www.w3.org/2000/svg"
              style={{ marginBottom: "1.5rem" }}
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>

            <p className="promotion-eyebrow">¡Pago Exitoso!</p>
            <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#1a2a35", margin: "0 0 16px" }}>
              ¡Bienvenido a Premium!
            </h2>

            <p style={{ color: "#374151", fontSize: "1rem", lineHeight: 1.6, marginBottom: "8px" }}>
              {upgraded
                ? "Muchísimas gracias por confiar en Habitta. Tu cuenta ha sido actualizada a Premium exitosamente. ¡Ya puedes disfrutar de todos los beneficios!"
                : "Tu pago se ha registrado. Si tu cuenta no aparece como Premium de inmediato, espera unos minutos y recarga la página."}
            </p>

            <p style={{ fontSize: "0.85rem", color: "#9ca3af", marginTop: "12px", marginBottom: "24px" }}>
              Serás redirigido a tu panel en 5 segundos...
            </p>

            <button
              className="select-button premium-btn"
              onClick={() => navigate("/mypanel", { replace: true })}
              style={{ maxWidth: "300px", margin: "0 auto" }}
            >
              Ir a tu Panel →
            </button>
          </>
        )}
      </div>
    </div>
  );
}
