import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { supabase } from "@infrastructure/supabase/client";
import { authApi, type SignUpResult } from "@infrastructure/api/auth.api";
import type { Usuario } from "@domain/entities/Usuario";

/**
 * Interfaz del contexto de autenticación.
 * Expone el usuario actual, estados de carga, y funciones de auth.
 */
interface AuthContextType {
  usuario: Usuario | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    nombre: string,
    telefono: string,
  ) => Promise<SignUpResult>;
  signOut: () => Promise<void>;
}

// Contexto con valor por defecto null
const AuthContext = createContext<AuthContextType | null>(null);

/**
 * Hook para acceder al contexto de autenticación.
 * Debe usarse dentro de un <AuthProvider>.
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un <AuthProvider>");
  }
  return context;
}

/**
 * Proveedor de autenticación.
 * Envuelve la app y escucha cambios de sesión en Supabase Auth.
 *
 * Usa `isManualAction` para evitar que onAuthStateChange
 * interfiera cuando signIn/signUp se ejecutan manualmente.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  // Bandera para evitar condiciones de carrera con onAuthStateChange
  const isManualAction = useRef(false);

  // Al montar: verificar si hay sesión activa
  useEffect(() => {
    const initAuth = async () => {
      try {
        const session = await authApi.getSession();
        if (session?.user?.email) {
          const user = await authApi.getUsuarioByCorreo(session.user.email);
          setUsuario(user);
        }
      } catch (err) {
        console.error("Error al inicializar auth:", err);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    // Escuchar cambios de sesión (solo cuando NO es una acción manual)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (isManualAction.current) return;

      if (event === "SIGNED_IN" && session?.user?.email) {
        const user = await authApi.getUsuarioByCorreo(session.user.email);
        setUsuario(user);
      } else if (event === "SIGNED_OUT") {
        setUsuario(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Inicio de sesión
  const signIn = async (email: string, password: string) => {
    isManualAction.current = true;
    try {
      const user = await authApi.signIn(email, password);
      setUsuario(user);
    } finally {
      isManualAction.current = false;
    }
  };

  // Registro — retorna SignUpResult para que el hook maneje la confirmación
  const signUp = async (
    email: string,
    password: string,
    nombre: string,
    telefono: string,
  ): Promise<SignUpResult> => {
    isManualAction.current = true;
    try {
      const result = await authApi.signUp(email, password, nombre, telefono);
      // Si NO necesita confirmación, obtener el usuario de la tabla
      if (!result.needsConfirmation) {
        const user = await authApi.getUsuarioByCorreo(email);
        setUsuario(user);
      }
      return result;
    } finally {
      isManualAction.current = false;
    }
  };

  // Cierre de sesión
  const signOut = async () => {
    isManualAction.current = true;
    try {
      await authApi.signOut();
      setUsuario(null);
    } finally {
      isManualAction.current = false;
    }
  };

  return (
    <AuthContext.Provider value={{ usuario, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
