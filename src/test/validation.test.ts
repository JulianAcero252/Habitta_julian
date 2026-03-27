import { describe, it, expect } from "vitest";
import { validatePassword, isPasswordValid, isValidEmailFormat } from "@application/utils/validation.utils";

describe("validation.utils", () => {
  describe("validatePassword", () => {
    it("debería detectar longitud insuficiente", () => {
      const result = validatePassword("Short1!");
      expect(result.hasLength).toBe(false);
    });

    it("debería detectar falta de mayúscula", () => {
      const result = validatePassword("lowercase123!");
      expect(result.hasUpper).toBe(false);
    });

    it("debería detectar falta de minúscula", () => {
      const result = validatePassword("UPPERCASE123!");
      expect(result.hasLower).toBe(false);
    });

    it("debería detectar falta de números", () => {
      const result = validatePassword("NoNumberSpecial!");
      expect(result.hasNumberAndSafe).toBe(false);
    });

    it("debería detectar números repetidos (ej: 222)", () => {
      const result = validatePassword("Pass222!");
      expect(result.hasNumberAndSafe).toBe(false);
    });

    it("debería detectar secuencias numéricas (ej: 123)", () => {
      const result = validatePassword("Pass123!");
      expect(result.hasNumberAndSafe).toBe(false);
      
      const result2 = validatePassword("Pass321!");
      expect(result2.hasNumberAndSafe).toBe(false);
    });

    it("debería detectar falta de carácter especial", () => {
      const result = validatePassword("Password123");
      expect(result.hasSpecial).toBe(false);
    });

    it("debería validar una contraseña fuerte correctamente", () => {
      const result = validatePassword("Habitta.2026!");
      expect(isPasswordValid(result)).toBe(true);
    });
  });

  describe("isValidEmailFormat", () => {
    it("debería validar correos correctos", () => {
      expect(isValidEmailFormat("test@example.com")).toBe(true);
      expect(isValidEmailFormat("user.name@domain.co")).toBe(true);
    });

    it("debería invalidar correos incorrectos", () => {
      expect(isValidEmailFormat("invalid-email")).toBe(false);
      expect(isValidEmailFormat("test@domain")).toBe(false); // falta TLD
      expect(isValidEmailFormat("@domain.com")).toBe(false);
    });
  });
});
