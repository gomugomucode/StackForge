# NAVIGATION ARCHITECTURE V2
Version: 2.0
Goal: Streamline UX, remove redundancy, and reinforce the "Single Product" feel.

## 1. The New Top-Level Structure
The Navbar will be simplified into a focused set of entry points.

| Menu Item | Target Path | Purpose |
| :--- | :--- | :--- |
| **Learn** | `/learn` | The central Knowledge Base (Articles/Guides) |
| **Roadmaps** | `/roadmaps` | Structured paths from Beginner to Expert |
| **Projects** | `/projects` | Portfolio builder and real-world application |
| **Interview** | `/interview` | Career preparation and technical screening |
| **Tutor** | `/tutor` | Interactive AI execution visualizer |
| **Community** | `/community` | Peer-to-peer learning circles |

---

## 2. The "Resources" Power-Dropdown
Instead of top-level clutter, "Resources" becomes the Swiss-Army Knife of the platform.

**Resources Dropdown:**
- 📑 **Cheatsheets** $\rightarrow$ `/cheatsheets`
- 📚 **Articles** $\rightarrow$ `/blog`
- 📝 **Learning Notes** $\rightarrow$ `/learn` (Filter: Notes)
- 📥 **Downloads** $\rightarrow$ `/roadmaps/export` (New feature)
- 🎓 **Certificates** $\rightarrow$ `/cert`

---

## 3. Contextual User Menu
The user's identity is shifted from a simple "Profile" to a "Learning Dashboard."

**User Menu $\rightarrow$ Dashboard:**
- 📈 **My Progress** $\rightarrow$ `/profile/progress`
- 🏆 **Achievements** $\rightarrow$ `/profile/achievements`
- 🔖 **Bookmarks** $\rightarrow$ `/profile/bookmarks`
- ⚙️ **Settings** $\rightarrow$ `/settings`
- 🚪 **Logout**

---

## 4. Search & Utility (The "Power Bar")
The global search (⌘K) remains the primary way for power users to navigate.

- **Primary Action Button:** "Start Learning" (Dynamic: if user has a current roadmap, it leads to the next lesson; otherwise, it leads to `/roadmaps`).
- **Status Badge:** Level, XP, and Streak are kept as a non-intrusive badge next to the User Menu.

---

## 5. Implementation Mapping (Code Changes)
- **File:** `src/data/navigation.ts` $\rightarrow$ Update `navLinks` array.
- **File:** `src/components/layout/Navbar.tsx` $\rightarrow$ Refactor the rendering loop to handle the new structure.
- **File:** `src/app/resources/page.tsx` $\rightarrow$ Ensure the grid mirrors the new dropdown structure.
