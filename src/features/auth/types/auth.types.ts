export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  /**
   * Raw Supabase user metadata. Exposed for components that need to read
   * arbitrary fields set during sign-up or by OAuth providers (e.g. the
   * GitHub `login` claim, Google `name`, etc.).
   */
  user_metadata?: Record<string, any> | null;
  app_metadata?: Record<string, any> | null;
}

export interface AuthResponse {
  user: AuthUser | null;
  error?: string;
}

export interface SignupRequest {
  email: string;
  name: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
