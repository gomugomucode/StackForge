const fs = require('fs');
const path = require('path');

const templates = {
  tutorial: `---
title: ${title}
slug: ${slug}
category: ${category}
difficulty: ${difficulty}
tags:
  - tag1
  - tag2
estimatedTime: ${time}
author: StackForge
featured: false
lastUpdated: ${new Date().toISOString().split('T')[0]}
description: Enter a brief description of this tutorial.
---

# ${title}

## Introduction
Start your tutorial here...

<Callout type="tip">
  Pro tip: add helpful hints here!
</Callout>

## Step 1: Basics
Content goes here.

\`\`\`typescript
console.log("Hello World");
\`\`\`

<Quiz 
  question="Question here?" 
  options={[
    { text: "Option A", isCorrect: true },
    { text: "Option B", isCorrect: false }
  ]}
  explanation="Explain why Option A is correct."
/>
`,
  project: `---
title: ${title}
slug: ${slug}
category: ${category}
difficulty: ${difficulty}
tags:
  - project
estimatedTime: ${time}
author: StackForge
featured: false
lastUpdated: ${new Date().toISOString().split('T')[0]}
description: Build a real-world project.
---

# ${title}

## Overview
Project overview...

<ProjectCard 
  title="${title}"
  description="Build this project to learn ${category}"
  techStack={["React", "Tailwind"]}
  level="${difficulty}"
  estimatedTime="${time}h"
/>

## Requirements
- [ ] Req 1
- [ ] Req 2

## Learning Outcomes
- Understanding X
- Implementing Y
`,
  roadmap: `---
title: ${title}
slug: ${slug}
category: ${category}
difficulty: ${difficulty}
tags:
  - roadmap
estimatedTime: ${time}
author: StackForge
featured: false
lastUpdated: ${new Date().toISOString().split('T')[0]}
description: Guided path to mastery.
---

# ${title} Roadmap

<RoadmapStep 
  title="Getting Started" 
  description="Learn the basics of ${category}" 
  isCompleted={false}
  resources={["Guide A", "Doc B"]}
/>
`,
  cheatsheet: `---
title: ${title}
slug: ${slug}
category: ${category}
difficulty: ${difficulty}
tags:
  - cheatsheet
estimatedTime: ${time}
author: StackForge
featured: false
lastUpdated: ${new Date().toISOString().split('T')[0]}
description: Quick reference guide.
---

# ${title} Cheatsheet

## Key Concepts
- **Concept 1**: Description
- **Concept 2**: Description
`
};

const args = process.argv.slice(2);
if (args.length < 2) {
  console.log('Usage: node create-content.js <type> <slug> [title]');
  process.exit(1);
}

const [type, slug, title = 'Untitled Content'] = args;
const template = templates[type];

if (!template) {
  console.error(`Invalid type. Available types: ${Object.keys(templates).join(', ')}`);
  process.exit(1);
}

const category = 'General';
const difficulty = 'Beginner';
const time = '15';

const content = template
  .replace(/\${title}/g, title)
  .replace(/\${slug}/g, slug)
  .replace(/\${category}/g, category)
  .replace(/\${difficulty}/g, difficulty)
  .replace(/\${time}/g, time);

const filePath = path.join(__dirname, `../src/content/${type}s/${slug}.mdx`);
fs.mkdirSync(path.dirname(filePath), { recursive: true });
fs.writeFileSync(filePath, content);

console.log(`Successfully created ${type} at ${filePath}`);
