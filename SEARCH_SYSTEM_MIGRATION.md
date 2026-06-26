# SEARCH SYSTEM MIGRATION

## 1. Current State Analysis

- **Existing Search**: `src/components/layout/CommandMenu.tsx` provides a command palette search
- **Search Index**: `src/utils/search-index.ts` aggregates roadmaps, cheatsheets, projects, and interviews
- **Search Coverage**: Currently limited to 4 content types
- **UI Pattern**: Uses cmd+k shortcut, framer-motion animations, and command palette interface

## 2. Whoami Search Patterns

- **Command Palette**: Similar to whoami's menu system with keyboard shortcuts
- **Search Integration**: whoami's Menu component includes search functionality
- **Mobile Navigation**: whoami's mobile menu includes search capabilities
- **Language Toggle**: whoami's language switcher demonstrates search-like interaction patterns

## 3. Migration Requirements

- **Expand Search Coverage**: Add topics, lessons, quizzes, interview questions to search results
- **Mega Menu Integration**: Search should work with the Resources mega menu
- **Learning Asset Navigation**: Users should be able to open any learning asset directly from search
- **Enhanced UI**: Use whoami's animation patterns and command palette design

## 4. Implementation Plan

1. **Update Search Index**: Add new content types to `src/utils/search-index.ts`
2. **Enhance CommandMenu**: Incorporate whoami's menu animation patterns
3. **Mega Menu Search**: Integrate search with Resources mega menu
4. **Learning Asset Navigation**: Ensure all learning assets are searchable and directly accessible
5. **Mobile Search**: Adapt search for mobile navigation

## 5. Components to Modify

- `src/utils/search-index.ts`: Add new content types
- `src/components/layout/CommandMenu.tsx`: Enhance with whoami patterns
- `src/components/layout/Navbar.tsx`: Integrate search with mega menu
- `src/components/ui/SearchInput.tsx`: Update search input component

## 6. Success Criteria

- Users can search all learning assets (roadmaps, topics, lessons, cheatsheets, quizzes, projects, interview questions)
- Search results include direct navigation to learning assets
- Search works with keyboard shortcuts (cmd+k)
- Search integrates with Resources mega menu
- Mobile search functionality matches desktop experience

## 7. Technical Considerations

- **Performance**: Search should be fast and efficient
- **Accessibility**: Search should be fully accessible
- **SEO**: Search should support SEO for learning assets
- **Analytics**: Search should track user behavior for insights

---

_This plan outlines how to transform StackForge's search system using patterns from whoami's menu and navigation components. The next step is to audit content consistency across the platform._
