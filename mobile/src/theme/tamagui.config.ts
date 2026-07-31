import { createTamagui, createTokens } from '@tamagui/core'
import { config } from '@tamagui/config/v3'

// 8pt Grid Tokens System
export const tokens = createTokens({
  size: {
    $0: 0,
    $1: 4,
    $2: 8,
    $3: 12,
    $4: 16,
    $5: 20,
    $6: 24,
    $7: 28,
    $8: 32,
    $9: 36,
    $10: 40,
    $12: 48,
    $16: 64,
    true: 16,
  },
  space: {
    $0: 0,
    $1: 4,
    $2: 8,
    $3: 12,
    $4: 16,
    $5: 20,
    $6: 24,
    $7: 28,
    $8: 32,
    $9: 36,
    $10: 40,
    $12: 48,
    $16: 64,
    true: 16,
  },
  radius: {
    $0: 0,
    $1: 4,
    $2: 8,
    $3: 12,
    $4: 16,
    $5: 20,
    $6: 24,
    $full: 9999,
    true: 12,
  },
  zIndex: {
    $0: 0,
    $1: 100,
    $2: 200,
    $3: 300,
    $4: 400,
    $5: 500,
    true: 100,
  },
  color: {
    // Level 0: Canvas Backgrounds
    canvasDark: '#090D16',
    canvasLight: '#F8FAFC',
    
    // Level 1: Cards & Containers
    cardDark: '#121826',
    cardLight: '#FFFFFF',
    cardBorderDark: '#1E293B',
    cardBorderLight: '#E2E8F0',

    // Level 2: Floating Elements & Elevate
    floatingDark: '#1E293B',
    floatingLight: '#F1F5F9',

    // Level 3: Modals & Overlays
    modalDark: '#0F172A',
    overlayBackdrop: 'rgba(0, 0, 0, 0.75)',

    // Primary Accents (Linear & Stripe Developer Theme)
    brandPrimary: '#6366F1', // Indigo
    brandPrimaryHover: '#4F46E5',
    brandEmerald: '#10B981', // Success / XP
    brandAmber: '#F59E0B',   // Streak / Alert
    brandRose: '#F43F5E',    // Weak Skill / Error
    brandCyan: '#06B6D4',    // Info / AI

    // Typography Colors
    textPrimaryDark: '#F8FAFC',
    textSecondaryDark: '#94A3B8',
    textMutedDark: '#64748B',
    
    textPrimaryLight: '#0F172A',
    textSecondaryLight: '#475569',
    textMutedLight: '#94A3B8',
  },
})

export const tamaguiConfig = createTamagui({
  ...config,
  tokens,
  themes: {
    dark: {
      bg: tokens.color.canvasDark,
      color: tokens.color.textPrimaryDark,
      colorSecondary: tokens.color.textSecondaryDark,
      colorMuted: tokens.color.textMutedDark,
      cardBg: tokens.color.cardDark,
      cardBorder: tokens.color.cardBorderDark,
      floatingBg: tokens.color.floatingDark,
      modalBg: tokens.color.modalDark,
      primary: tokens.color.brandPrimary,
      emerald: tokens.color.brandEmerald,
      amber: tokens.color.brandAmber,
      rose: tokens.color.brandRose,
      cyan: tokens.color.brandCyan,
    },
    light: {
      bg: tokens.color.canvasLight,
      color: tokens.color.textPrimaryLight,
      colorSecondary: tokens.color.textSecondaryLight,
      colorMuted: tokens.color.textMutedLight,
      cardBg: tokens.color.cardLight,
      cardBorder: tokens.color.cardBorderLight,
      floatingBg: tokens.color.floatingLight,
      modalBg: '#FFFFFF',
      primary: tokens.color.brandPrimary,
      emerald: tokens.color.brandEmerald,
      amber: tokens.color.brandAmber,
      rose: tokens.color.brandRose,
      cyan: tokens.color.brandCyan,
    },
  },
  defaultTheme: 'dark',
})

export type AppConfig = typeof tamaguiConfig
declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default tamaguiConfig
