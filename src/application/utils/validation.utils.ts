/**
 * Utilidades para validación de datos en Habitta.
 */

export interface PasswordValidationResult {
  hasLength: boolean;
  hasUpper: boolean;
  hasLower: boolean;
  hasNumberAndSafe: boolean;
  hasSpecial: boolean;
}

/**
 * Valida una contraseña según los requisitos de seguridad.
 * - Mínimo 8 caracteres.
 * - Al menos una mayúscula.
 * - Al menos una minúscula.
 * - Al menos un número (sin secuencias ni repeticiones de 3 dígitos).
 * - Al menos un carácter especial.
 */
export function validatePassword(password: string): PasswordValidationResult {
  return {
    hasLength: password.length >= 8,
    hasUpper: /[A-Z]/.test(password),
    hasLower: /[a-z]/.test(password),
    hasNumberAndSafe: (() => {
      if (!/[0-9]/.test(password)) return false;
      if (/(\d)\1{2,}/.test(password)) return false; // Repetidos como 222

      // Secuenciales como 123 o 321
      for (let i = 0; i < password.length - 2; i++) {
        const c1 = password.charCodeAt(i);
        const c2 = password.charCodeAt(i + 1);
        const c3 = password.charCodeAt(i + 2);

        if (c1 >= 48 && c1 <= 57 && c2 >= 48 && c2 <= 57 && c3 >= 48 && c3 <= 57) {
          if ((c2 === c1 + 1 && c3 === c2 + 1) || (c2 === c1 - 1 && c3 === c2 - 1)) {
            return false;
          }
        }
      }
      return true;
    })(),
    hasSpecial: /[^A-Za-z0-9]/.test(password),
  };
}

/**
 * Valida si todos los requisitos de contraseña se cumplen.
 */
export function isPasswordValid(validation: PasswordValidationResult): boolean {
  return Object.values(validation).every(Boolean);
}

/**
 * Valida el formato de un correo electrónico.
 */
export function isValidEmailFormat(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
