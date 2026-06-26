# DESIGN SYSTEM MIGRATION

## 1. Typography
- **Heading Scale**: 
  - H1: 2.5rem (40px) 
  - H2: 1.75rem (28px) 
  - H3: 1.5rem (24px) 
  - H4: 1.25rem (20px) 
  - H5: 1rem (16px) 
  - H6: 0.875rem (14px)
- **Paragraph Scale**: 
  - Base: 1rem (16px) 
  - Large: 1.125rem (18px) 
  - Small: 0.875rem (14px)
- **Line Height**: 
  - Tight: 1.2 
  - Normal: 1.4 
  - Loose: 1.6
- **Letter Spacing**: 
  - Tight: -0.025em 
  - Normal: 0em 
  - Wide: 0.05em

## 2. Spacing System
- **Base Unit**: 8px
- **Multiples**: 
  - 0: 0px 
  - 1: 0.5rem (8px) 
  - 2: 1rem (16px) 
  - 3: 1.5rem (24px) 
  - 4: 2rem (32px) 
  - 5: 2.5rem (40px) 
  - 6: 3rem (48px)
- **Utility Classes**: 
  - `space-x-1` (8px horizontal) 
  - `space-y-2` (16px vertical) 
  - `p-4` (1rem padding) 
  - `m-2` (0.5rem margin)

## 3. Color Theme
- **Primary**: `text-[#1BBDF9]` / `bg-[#1BBDF9]`
- **Secondary**: `text-[#64748B]` / `bg-[#F1F5F9]`
- **Background**: `bg-[#F8FAFC]` (light) / `bg-[#1E293B]` (dark)
- **Surface**: `bg-[#FFFFFF]` (light) / `bg-[#111827]` (dark)
- **Border**: `border-[#D1D5DB]`

## 4. Components

### Buttons
- **Base**: `rounded-md` (0.5rem border radius), `font-medium`, `transition-colors`, `duration-300`
- **Variants**: 
  - Primary: `bg-[#1BBDF9] text-white hover:bg-[#1A86C3]`
  - Secondary: `bg-[#F1F5F9] text-[#111827] hover:bg-[#E5E7EB]`
  - Outline: `border-2 border-[#1BBDF9] text-[#1BBDF9] hover:bg-[#F0F9FF]`

### Cards
- **Structure**: `rounded-lg`, `shadow-md`, `bg-[#FFFFFF]` (light) / `bg-[#111827]` (dark), `p-6`, `space-y-4`
- **Header**: `font-semibold text-[#111827]` (light) / `text-[#F8FAFC]` (dark)
- **Footer**: `border-t`, `pt-4`, `text-[#64748B]`

### Inputs
- **Base**: `w-full`, `rounded-md`, `border`, `focus:border-[#1BBDF9]`, `focus:ring-[#1BBDF9]`
- **Size Variants**: 
  - `text-sm` (0.875rem) 
  - `text-base` (1rem)

### Badges
- **Style**: `rounded-full`, `px-2.5 py-0.5`, `text-xs`, `font-medium`, `bg-[#D97706]` (accent) or `bg-[#1BBDF9]` (primary)

### Dropdowns
- **Menu**: `absolute`, `right-0`, `mt-2`, `w-48`, `bg-[#FFFFFF]`, `shadow-lg`, `rounded-md`, `z-10`
- **Item**: `py-2 px-3`, `text-sm`, `hover:bg-[#F1F5F9]`

### Modals
- **Overlay**: `fixed`, `inset-0`, `bg-[#000000] opacity-50`, `z-50`
- **Content**: `bg-[#FFFFFF]`, `rounded-lg`, `shadow-xl`, `max-w-2xl`, `w-full`, `p-6`

### Tabs
- **Indicator**: `h-px`, `bg-[#1BBDF9]`, `absolute`, `bottom-0`, `left-0`
- **Tab Item**: `px-4 py-2`, `text-base`, `font-medium`, `border-b-2`, `border-transparent`, `hover:border-[#1BBDF9]`

## 5. Navigation
- **Desktop Navbar**: 
  - Layout: `flex`, `items-center`, `justify-between`, `space-x-4`
  - Logo: `text-2xl`, `font-bold`, `text-[#1BBDF9]`
  - Menu Items: `text-gray-600`, `hover:text-[#1BBDF9]`, `font-medium`
  - CTA: `rounded-md`, `bg-[#1BBDF9]`, `text-white`
- **Mobile Navbar**: 
  - Toggle Button: `lg:hidden`, `p-2`, `rounded-md`, `bg-[#F1F5F9]`, `hover:bg-[#E5E7EB]`
  - Drawer: `fixed`, `top-0`, `right-0`, `h-full`, `w-64`, `bg-[#FFFFFF]`, `transform`, `transition-transform`
- **Command Palette**: 
  - Input: `w-full`, `rounded-md`, `border`, `focus:border-[#1BBDF9]`, `focus:ring-[#1BBDF9]`, `p-2.5`

## 6. Design Tokens
- **Color Palette**: 
  - Primary: `#1BBDF9` 
  - Secondary: `#64748B` 
  - Accent: `#D97706` 
  - Background: `#F8FAFC` / `#1E293B` 
  - Surface: `#FFFFFF` / `#111827` 
  - Border: `#D1D5DB`
- **Spacing Scale**: 0, 0.5, 1, 1.5, 2, 2.5, 3 (rem)
- **Border Radius**: `0.25rem`, `0.5rem`, `0.75rem`, `1rem`
- **Box Shadow**: `shadow-sm`, `shadow-md`, `shadow-xl`

---

*This design system extracts the visual and interaction patterns from the whoami repository and prepares them for integration into StackForge. The next step is to plan the navbar redesign using these elements.*