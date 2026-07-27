"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";

export interface UserAvatarInfo {
  imageUrl: string | null;
  initials: string;
  displayName: string;
  email: string;
}

export function useUserAvatar(): UserAvatarInfo {
  const { user, profile } = useAuth();

  const email = user?.email || profile?.email || "";
  const nameCandidate =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    profile?.name ||
    profile?.user?.name ||
    profile?.username ||
    (email ? email.split("@")[0] : "User");

  const displayName = nameCandidate;

  // Priority 1: Custom uploaded profile image
  const uploadedImage = profile?.avatar || profile?.user?.avatar || (profile as any)?.image_url;

  // Priority 2: OAuth avatar_url (GitHub / Google)
  const oauthImage = user?.user_metadata?.avatar_url || user?.user_metadata?.picture || null;

  const imageUrl = uploadedImage || oauthImage || null;

  // Generate Initials
  let initials = "U";
  if (displayName) {
    const parts = displayName.trim().split(" ");
    if (parts.length >= 2) {
      initials = `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    } else if (parts[0]) {
      initials = parts[0].substring(0, 2).toUpperCase();
    }
  }

  return {
    imageUrl,
    initials,
    displayName,
    email,
  };
}
