# DESIGN_SYSTEM_MIGRATION.md

## Premium Design System Extraction from `whoami`

### 1. Typography & Scale

| Element | Style | Tailwind Classes / CSS |
| :--- | :--- | :--- |
| **H1 (Hero)** | Extra Bold, Gradient Text | `text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent` |
| **H2 (Section)** | Bold, Gradient Text | `text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent` |
| **H3 (Card)** | Semi-Bold, Dark/Contrast | `text-sm font-bold text-gray-800 group-hover:text-gray-900` |
| **Body (Main)** | Medium, Gray-Scale | `text-gray-600 mt-6 text-sm` |
| **Accent Text** | Bold, Primary Color | `text-[#1BBDF9] font-bold` |

### 2. Component Blueprint

#### Premium Cards (Glassmorphism)
- **Base**: `bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl p-3 shadow-xl`
- **Hover State**: `hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 hover:bg-white/30`
- **Overlay**: `absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100`
- **Inner Elements**: Use `backdrop-blur-sm` and `border-white/40` for nested cards.

#### Progress Indicators
- **Track**: `w-full h-1.5 bg-white/40 rounded-full overflow-hidden backdrop-blur-sm`
- **Fill (Dynamic)**:
    - 90%+ : `bg-gradient-to-r from-emerald-500 to-green-500`
    - 80%+ : `bg-gradient-to-r from-blue-500 to-cyan-500`
    - 70%+ : `bg-gradient-to-r from-yellow-500 to-orange-400`
    - Below 70% : `bg-gradient-to-r from-orange-500 to-red-500`

#### Buttons & Interactive Elements
- **Primary**: `bg-[#1BBDF9] p-0.5 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110`
- **Secondary/Ghost**: `bg-gray-50 hover:bg-gray-100 transition-all duration-300 active:scale-95`
- **Interactive Icons**: `transition-transform duration-300 group-hover:scale-110`

### 3. Navigation & Layout

#### Desktop Navbar
- **Behavior**: Fixed top, `transition-all duration-500`, shadow appears on scroll.
- **Links**: `text-gray-500 font-bold hover:text-[#1BBDF9]` with an animated bottom border:
  - `after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#1BBDF9] after:transition-all after:duration-300 hover:after:w-full`

#### Mobile Navbar
- **Overlay**: `fixed lg:hidden inset-0 z-40 transition-all duration-500 ease-in-out transform bg-white/95 backdrop-blur-sm`
- **Animation**: Sliding from right (`translate-x-full` $\rightarrow$ `translate-x-0`).

#### Background Atmosphere
- **Ambient Elements**: Absolute positioned gradient circles with `blur-xl` and `animate-pulse`.
  - Example: `w-64 h-64 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse`

---

### 4. Implementation Checklist for StackForge
- [ ] Update `globals.css` with defined CSS variables for colors.
- [ ] Replace standard `div` cards with Glassmorphism components.
- [ ] Implement the animated underline effect in `Navbar.tsx`.
- [ ] Add ambient gradient circles to Hero and Topic pages.
- [ ] Refactor progress bars to use the dynamic gradient scale.
- [ ] Integrate `framer-motion` for `whileHover` scaling on learning assets.
