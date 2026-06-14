"use strict";exports.id=8407,exports.ids=[8407],exports.modules={18407:(e,t,s)=>{s.r(t),s.d(t,{reactProjects:()=>a});let a=[{title:"Recipe Search Application",difficulty:"Beginner",description:"An interactive cookbook searching dishes by typing names, rendering grids, and filtering by tags.",skillsLearned:["JSX layouts","Props configuration","State variables","Controlled search inputs"],technologies:["React 19","CSS Modules"],sourceCodeStructure:`recipe-app/
├── src/
│   ├── App.jsx
│   ├── components/
│   │   ├── RecipeCard.jsx
│   │   └── SearchBar.jsx
│   └── data.js`,developmentRoadmap:["Define raw static recipe array containing titles, directions, and tags.","Build reusable RecipeCard layout mapping component inputs.","Configure search bar tracking values inside React state.","Render filtered items lists based on title inclusions."]},{title:"Kanban Task Manager",difficulty:"Intermediate",description:"A structural board with drag-and-drop support, sub-checklists, progress bars, and board status swimlanes.",skillsLearned:["Complex state objects","Immutability updates","Context layout configurations","LocalStorage persistence"],technologies:["React 19","TailwindCSS","lucide-react"],sourceCodeStructure:`kanban-board/
├── src/
│   ├── App.jsx
│   ├── components/
│   │   ├── Board.jsx
│   │   ├── Column.jsx
│   │   └── TaskCard.jsx
│   └── hooks/
│       └── useLocalStorage.js`,developmentRoadmap:["Design nested board state: columns containing collections of task objects.","Construct CRUD controls to append, update descriptions, and remove tasks.","Implement column-shifting functions modifying item indexes.","Integrate dragover and drop handlers on column containers."]},{title:"Headless CMS blog client",difficulty:"Advanced",description:"A static-rendered blogging engine with full Markdown parsing, syntax highlighting, search, and instant caching.",skillsLearned:["Static Site Generation (Next.js)","Markdown Parsing","Client-side query caching","SEO configuration"],technologies:["Next.js 15","React 19","MDX","TailwindCSS"],sourceCodeStructure:`headless-blog/
├── src/
│   ├── app/
│   │   ├── page.jsx
│   │   └── posts/
│   │       └── [slug]/
│   └── posts/
│       ├── first-post.mdx
│       └── second-post.mdx`,developmentRoadmap:["Initialize Next.js app directory structure and paths.","Integrate MDX package loader to parse markdown posts.","Generate static metadata for each post using front-matter.","Build client search indexing page parsing all post summaries."]}]}};