import { supabase } from "@infrastructure/supabase/client";

/** API de usuarios — operaciones sobre la tabla `usuarios` */
export const usuariosApi = {
    /** Cambiar el plan del usuario (gratuito ↔ premium) */
    cambiarPlan: async (
        idusuario: number,
        nuevoPlan: "gratuito" | "premium",
    ): Promise<void> => {
        const { error } = await supabase
            .from("usuarios")
            .update({ plan: nuevoPlan })
            .eq("idusuario", idusuario);

        if (error) throw new Error(`Error cambiando plan: ${error.message}`);
    },

    /** Obtener el plan actual del usuario */
    obtenerPlan: async (
        idusuario: number,
    ): Promise<"gratuito" | "premium"> => {
        const { data, error } = await supabase
            .from("usuarios")
            .select("plan")
            .eq("idusuario", idusuario)
            .single();

        if (error) throw new Error(`Error obteniendo plan: ${error.message}`);
        return data.plan ?? "gratuito";
    },
};
