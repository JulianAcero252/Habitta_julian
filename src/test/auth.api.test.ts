import { describe, it, expect, vi, beforeEach } from "vitest";
import { authApi } from "@infrastructure/api/auth.api";
import { supabase } from "@infrastructure/supabase/client";

// Mock de Supabase
vi.mock("@infrastructure/supabase/client", () => ({
  supabase: {
    auth: {
      signInWithPassword: vi.fn(),
      signUp: vi.fn(),
      signOut: vi.fn(),
      resetPasswordForEmail: vi.fn(),
      updateUser: vi.fn(),
    },
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn(),
      maybeSingle: vi.fn(),
    })),
  },
}));

describe("authApi", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockSupabaseChain = (data: any, error: any = null) => {
    const chain = {
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data, error }),
      maybeSingle: vi.fn().mockResolvedValue({ data, error }),
    };
    return chain;
  };

  it("signIn debería llamar a Supabase y devolver el perfil del usuario", async () => {
    const mockUser = { id: "123", email: "test@example.com" };
    const mockProfile = { idusuario: 1, correo: "test@example.com", nombre: "Test User" };

    vi.mocked(supabase.auth.signInWithPassword).mockResolvedValue({
      data: { user: mockUser, session: {} },
      error: null,
    } as any);

    vi.mocked(supabase.from).mockReturnValue(mockSupabaseChain(mockProfile) as any);

    const result = await authApi.signIn("test@example.com", "password123");

    expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
    });
    expect(result).toEqual(mockProfile);
  });

  it("signIn debería lanzar error si la autenticación falla", async () => {
    vi.mocked(supabase.auth.signInWithPassword).mockResolvedValue({
      data: { user: null, session: null },
      error: { message: "Invalid credentials" },
    } as any);

    await expect(authApi.signIn("test@example.com", "wrong")).rejects.toThrow("Invalid credentials");
  });

  it("signOut debería llamar a Supabase", async () => {
    vi.mocked(supabase.auth.signOut).mockResolvedValue({ error: null });

    await authApi.signOut();

    expect(supabase.auth.signOut).toHaveBeenCalled();
  });

  it("signUp debería registrar al usuario en Auth y DB", async () => {
    vi.mocked(supabase.auth.signUp).mockResolvedValue({
      data: { user: { id: "new-uid", identities: [{}] } },
      error: null,
    } as any);

    vi.mocked(supabase.from).mockReturnValue(mockSupabaseChain({ idusuario: 789 }) as any);

    const result = await authApi.signUp("new@ex.com", "pass", "Name", "123");

    expect(supabase.auth.signUp).toHaveBeenCalled();
    expect(result.userId).toBeDefined();
  });
});
