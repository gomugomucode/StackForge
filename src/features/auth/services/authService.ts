import { signIn, signOut } from "next-auth/react";
import { AuthUser } from "../types/auth.types";

export const authService = {
  async loginWithGoogle() {
    await signIn("google", { callbackUrl: "/dashboard" });
  },

  async loginWithGithub() {
    await signIn("github", { callbackUrl: "/dashboard" });
  },

  async logout() {
    await signOut({ callbackUrl: "/" });
  },

  async checkSession() {
    // This is usually handled by useSession hook from next-auth
  }
};
