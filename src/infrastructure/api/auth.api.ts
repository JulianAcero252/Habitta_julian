import { supabase } from "@infrastructure/supabase/client";
import type { Usuario } from "@domain/entities/Usuario";

/**
 * Traduce los mensajes de error de Supabase Auth de inglés a español.
 * Supabase retorna errores en inglés, pero la app está en español.
 */
function traducirError(mensajeIngles: string): string {
  const traducciones: Record<string, string> = {
    "user already registered":
      "Este correo ya está registrado. Intenta iniciar sesión.",
    "invalid login credentials": "Correo o contraseña incorrectos.",
    "email not confirmed":
      "Debes confirmar tu correo electrónico antes de iniciar sesión. Revisa tu bandeja de entrada.",
    "password should be at least 6 characters":
      "La contraseña debe tener al menos 6 caracteres.",
    "unable to validate email address: invalid format":
      "El formato del correo electrónico no es válido.",
    "signup requires a valid password": "Debes ingresar una contraseña válida.",
    "to signup, please provide your email":
      "Debes ingresar un correo electrónico.",
    "email rate limit exceeded":
      "Has excedido el límite de envío de correos. Espera unos minutos e intenta de nuevo.",
    "for security purposes, you can only request this once every 60 seconds":
      "Por seguridad, solo puedes intentar una vez cada 60 segundos.",
    over_email_send_rate_limit:
      "Has excedido el límite de envío de correos. Espera unos minutos e intenta de nuevo.",
    "error sending confirmation email":
      "Error al enviar el correo de confirmación. Verifica la configuración SMTP en Supabase.",
  };

  // Comparar en minúsculas para evitar problemas de capitalización
  const mensajeLower = mensajeIngles.toLowerCase().trim();
  return traducciones[mensajeLower] ?? mensajeIngles;
}

/**
 * Resultado del registro.
 * - needsConfirmation: true → el usuario debe confirmar su email
 */
export interface SignUpResult {
  needsConfirmation: boolean;
}

/**
 * API de autenticación — Supabase Auth + tabla `usuarios`.
 *
 * FLUJO IMPORTANTE (con confirmación de email habilitada):
 *
 * 1. signUp:
 *    - Crea usuario en auth.users con metadata (nombre, teléfono)
 *    - NO inserta en tabla `usuarios` (aún no hay sesión = RLS lo bloquea)
 *    - Retorna needsConfirmation: true
 *
 * 2. Usuario confirma su email (link en correo)
 *
 * 3. signIn:
 *    - Autentica con Supabase Auth
 *    - Si NO existe en tabla `usuarios` → lo crea usando la metadata de Auth
 *    - Retorna el objeto Usuario completo
 *
 * 4. signOut:
 *    - Elimina la sesión JWT
 */
export const authApi = {
  /**
   * Registra un nuevo usuario en Supabase Auth.
   *
   * NOTA: NO inserta en la tabla `usuarios` porque con confirmación
   * de email habilitada, no hay sesión activa después del signUp,
   * y RLS bloquea el INSERT. La fila en `usuarios` se crea
   * automáticamente en el primer signIn.
   *
   * Los datos extra (nombre, teléfono) se guardan como user_metadata
   * en Supabase Auth para luego usarlos al crear el registro en `usuarios`.
   */
  signUp: async (
    email: string,
    password: string,
    nombre: string,
    telefono: string,
  ): Promise<SignUpResult> => {
    // Crear usuario en Supabase Auth con metadata
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nombre: nombre,
          telefono: telefono,
        },
      },
    });

    if (authError) {
      console.error("Error al registrar en Supabase Auth:", authError.message);
      throw new Error(traducirError(authError.message));
    }

    if (!authData.user) {
      throw new Error("No se pudo crear el usuario.");
    }

    // Detectar "éxito falso" — Supabase retorna user con identities vacío
    // si el email ya existe (con confirmación de email desactivada)
    if (authData.user.identities && authData.user.identities.length === 0) {
      throw new Error(
        "Este correo ya está registrado. Intenta iniciar sesión.",
      );
    }

    // Determinar si necesita confirmación de email
    const tieneSession = authData.session !== null;

    // Si NO necesita confirmación (sesión creada inmediatamente),
    // podemos intentar crear el registro en `usuarios` ahora
    if (tieneSession) {
      await crearRegistroUsuario(email, nombre, telefono);
    }

    return {
      needsConfirmation: !tieneSession,
    };
  },

  /**
   * Inicia sesión con correo y contraseña.
   * Si el usuario no existe en tabla `usuarios`, lo crea automáticamente
   * usando la metadata guardada en Supabase Auth durante el registro.
   */
  signIn: async (email: string, password: string): Promise<Usuario> => {
    // 1. Autenticar con Supabase Auth
    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (authError) {
      console.error("Error al iniciar sesión:", authError.message);
      throw new Error(traducirError(authError.message));
    }

    // 2. Actualizar fechalogin (no crítico, no bloquea el login)
    await supabase
      .from("usuarios")
      .update({ fechalogin: new Date().toISOString() })
      .eq("correo", email);

    // 3. Obtener datos del usuario de la tabla `usuarios`
    const { data: usuario, error: dbError } = await supabase
      .from("usuarios")
      .select("*")
      .eq("correo", email)
      .maybeSingle();

    if (dbError) {
      console.error("Error al obtener usuario:", dbError.message);
      throw new Error(
        "Sesión iniciada, pero no se pudo cargar tu perfil. " +
          "Verifica las políticas RLS de la tabla 'usuarios'.",
      );
    }

    if (!usuario) {
      // El usuario NO existe en `usuarios` → es su primer login después
      // de confirmar email. Crear la fila usando metadata de Auth.
      console.log("Primer login después de confirmar email. Creando perfil...");

      // Extraer nombre y teléfono de la metadata de Auth
      const metadata = authData.user?.user_metadata;
      const nombre = metadata?.nombre || email.split("@")[0];
      const telefono = metadata?.telefono || null;

      const { data: nuevoUsuario, error: insertError } = await supabase
        .from("usuarios")
        .insert({
          correo: email,
          nombre: nombre,
          telefono: telefono,
          contrasena: "managed_by_supabase_auth",
          fotoperfil: null,
          descripcion: null,
        })
        .select()
        .maybeSingle();

      if (insertError || !nuevoUsuario) {
        console.error("Error al crear perfil:", insertError?.message);
        throw new Error(
          "Sesión iniciada, pero no se pudo crear tu perfil. " +
            "Verifica las políticas RLS de la tabla 'usuarios'.",
        );
      }

      return nuevoUsuario;
    }

    return usuario;
  },

  /**
   * Cierra la sesión del usuario actual.
   */
  signOut: async (): Promise<void> => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error al cerrar sesión:", error.message);
      throw new Error(traducirError(error.message));
    }
  },

  /**
   * Obtiene la sesión activa (si existe).
   * Se usa al cargar la app para restaurar el usuario.
   */
  getSession: async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.error("Error al obtener sesión:", error.message);
      return null;
    }
    return data.session;
  },

  /**
   * Busca un usuario en la tabla `usuarios` por correo.
   * Retorna null si no existe (no lanza error).
   */
  getUsuarioByCorreo: async (correo: string): Promise<Usuario | null> => {
    const { data, error } = await supabase
      .from("usuarios")
      .select("*")
      .eq("correo", correo)
      .maybeSingle();

    if (error) {
      console.error("Error al buscar usuario:", error.message);
      return null;
    }

    return data;
  },
};

/**
 * Función auxiliar para crear un registro en la tabla `usuarios`.
 * Se usa cuando el usuario tiene una sesión activa (signUp sin confirmación,
 * o primer signIn después de confirmar).
 */
async function crearRegistroUsuario(
  correo: string,
  nombre: string,
  telefono: string,
) {
  // Verificar si ya existe
  const { data: existente } = await supabase
    .from("usuarios")
    .select("idusuario")
    .eq("correo", correo)
    .maybeSingle();

  if (existente) return;

  const { error } = await supabase.from("usuarios").insert({
    correo,
    nombre,
    telefono: telefono || null,
    contrasena: "managed_by_supabase_auth",
    fotoperfil: null,
    descripcion: null,
  });

  if (error) {
    console.error("Error al crear registro en usuarios:", error.message);
  }
}
