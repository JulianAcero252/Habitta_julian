-- ==============================================================================
-- PARCHE HABITTA: PERMISOS DE ADMINISTRADOR Y NOTIFICACIONES
-- EJECUTA ESTO EN EL SQL EDITOR DE TU DASHBOARD DE SUPABASE
-- ==============================================================================

-- 1. Permitir a los Administradores ACTUALIZAR la tabla de Usuarios (Plan y Estado)
-- (Si ya existe, esto añadirá la regla o la reemplazará si la borras primero)
DROP POLICY IF EXISTS "Los administradores pueden actualizar usuarios" ON public.usuarios;
CREATE POLICY "Los administradores pueden actualizar usuarios"
ON public.usuarios
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.usuarios 
    WHERE idusuario = (SELECT idusuario FROM public.usuarios WHERE correo = auth.email() LIMIT 1) 
    AND rol = 'admin'
  )
);

-- 2. Permitir a los Administradores INSERTAR notificaciones para otros usuarios
-- (Para cuando un admin aprueba/rechaza una propiedad y notifica al dueño)
DROP POLICY IF EXISTS "Los administradores pueden insertar notificaciones" ON public.notificaciones;
CREATE POLICY "Los administradores pueden insertar notificaciones"
ON public.notificaciones
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.usuarios 
    WHERE idusuario = (SELECT idusuario FROM public.usuarios WHERE correo = auth.email() LIMIT 1) 
    AND rol = 'admin'
  )
);

-- 3. (OPCIONAL) Si quieres que cualquier usuario logueado o anónimo pueda insertar notificaciones
-- del sistema, descomenta esto:
-- CREATE POLICY "Permitir insertar notificaciones a usuarios autenticados"
-- ON public.notificaciones FOR INSERT WITH CHECK (true);

-- ==============================================================================
-- NOTA IMPORTANTE SOBRE "LA CUENTA NO SE DEJA ACTIVAR":
-- ==============================================================================
-- Si el admin panel dice "Activa" pero aún no puedes iniciar sesión con ella,
-- es porque Supabase exige que el usuario confirme su Email con el link que
-- le llegó al correo.
--
-- Para quitar esa restricción:
-- Ve a tu Dashboard Supabase -> Authentication -> Providers -> Email
-- Y DESACTIVA la opción "Confirm email".
-- Así las cuentas nuevas podrán iniciar sesión de inmediato sin verificar el correo.
