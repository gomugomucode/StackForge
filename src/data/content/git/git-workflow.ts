export const topic = {
  title: "Git Workflow & Feature Branching",
  slug: "git-workflow",
  difficulty: "beginner",
  readTime: "60 min",
  xpReward: 500,

  overview: "In a professional setting, you never commit directly to the 'main' or 'master' branch. Doing so is a recipe for disaster, as a single breaking change can halt the entire team's progress. Instead, developers use a 'Feature Branching' workflow. This involves creating a temporary branch for every new feature or bug fix, developing it in isolation, and only merging it back into the main codebase once it has been tested and reviewed. This ensures that the main branch always remains in a deployable state.",
  whyItMatters: "Branching is what allows a team of 100 developers to work on a single project simultaneously. Without it, you would constantly be overwriting each other's changes. Understanding how to create, switch, and delete branches, and how to handle the 'main' line of development, is critical for any developer. Whether you use Git Flow, GitHub Flow, or Trunk-Based Development, the core mechanic is the same: isolate your work, verify it, and merge it.",

  content: [
    {
      section: "What is a Branch?",
      text: "At its core, a Git branch is nothing more than a lightweight, movable pointer to a commit. When you initialize a repository, Git creates a default branch (usually called `main` or `master`). This branch represents the primary line of development.\n\nWhen you create a new branch, Git doesn't copy the entire project. Instead, it creates a new pointer that refers to the same commit as the current branch. As you make new commits on the feature branch, the pointer moves forward, while the `main` branch pointer remains where it was. This allows you to diverge from the main line of development, experiment freely, and then bring those changes back later."
    },
    {
      section: "The Feature Branching Workflow",
      text: "A typical professional workflow looks like this:\n\n1. **Update Main:** Always start by pulling the latest changes from the remote server to ensure you're branching from the most recent version.\n2. **Create a Branch:** Give your branch a descriptive name, such as `feat/user-auth` or `fix/header-overflow`.\n3. **Develop and Commit:** Make your changes in isolation. Commit frequently with clear messages.\n4. **Push and Pull Request:** Push your local branch to the server and open a Pull Request (PR). This is where other developers review your code and suggest improvements.\n5. **Merge:** Once approved, the feature branch is merged into the `main` branch.\n6. **Cleanup:** Delete the local and remote feature branches to keep the repository clean."
    },
    {
      section: "Branching Strategies",
      text: "Depending on the team size and release cycle, different strategies are used:\n\n- **GitHub Flow:** The simplest approach. All work happens in feature branches, which are merged into `main` and deployed immediately. Ideal for CI/CD environments.\n- **Git Flow:** A more rigid structure. It uses `main` for production-ready code, `develop` for integration, and separate `feature/`, `release/`, and `hotfix/` branches. Ideal for scheduled releases (e.g., v1.0, v1.1).\n- **Trunk-Based Development:** Developers merge small, frequent updates to a single 'trunk' (main) branch. This requires high automation and the use of 'feature flags' to hide incomplete features from users."
    }
  ],

  syntax: [
    {
      command: "git branch <name>",
      description: "Creates a new branch pointer at the current commit.",
      example: "git branch feat/dark-mode"
    },
    {
      command: "git checkout <name>",
      description: "Switches the HEAD pointer to the specified branch, updating the working directory to match that snapshot.",
      example: "git checkout feat/dark-mode"
    },
    {
      command: "git checkout -b <name>",
      description: "Shortcut to create a new branch and switch to it immediately.",
      example: "git checkout -b feat/api-integration"
    },
    {
      command: "git merge <branch>",
      description: "Merges the specified branch into the current branch.",
      example: "git checkout main && git merge feat/dark-mode"
    },
    {
      command: "git branch -d <name>",
      description: "Deletes a branch that has been merged. Use -D for a forced delete.",
      example: "git branch -d feat/dark-mode"
    },
    {
      command: "git switch <name>",
      description: "Modern alternative to checkout for switching branches (introduced in Git 2.23).",
      example: "git switch main"
    }
  ],

  examples: [
    {
      title: "Complete Feature Cycle",
      code: `// 1. Ensure we are on main and updated
git checkout main
git pull origin main

// 2. Create and switch to a feature branch
git checkout -b feat/add-logger

// 3. Work on the feature (create a file)
echo \"console.log('Log initialized')\" > logger.js
git add logger.js
git commit -m \"feat: add basic logging utility\"

// 4. Switch back to main to handle an urgent bug
git checkout main
git checkout -b fix/critical-bug
echo \"// fix bug\" > bugfix.txt
git add .
git commit -m \"fix: resolve critical crash\"
git checkout main
git merge fix/critical-bug

// 5. Return to the feature branch and finish
git checkout feat/add-logger
echo \"// add more logs\" >> logger.js
git add .
git commit -m \"feat: expand logger capabilities\"

// 6. Merge feature into main
git checkout main
git merge feat/add-logger`,
      output: "Main branch now contains both the critical bug fix and the logger feature.",
      explanation: "This example shows 'context switching'—how Git allows you to jump between a long-term feature and a short-term urgent fix without mixing the code."
    }
  ],

  mistakes: [
    {
      error: "Merging a feature branch into the wrong branch",
      solution: "Always run 'git branch' or look at your terminal prompt to verify you are on 'main' before running 'git merge <feature-branch>'.",
      impact: "Creates a mess of commits in the wrong branch, potentially requiring a complex 'git reset' or 'git revert' to fix."
    },
    {
      error: "Working directly on the main branch",
      solution: "Enforce 'protected branches' in GitHub/GitLab settings. This prevents anyone from pushing directly to main, forcing them to use PRs.",
      impact: "Risk of pushing breaking changes to production and making it difficult to isolate a single bug for revert."
    },
    {
      error: "Forgetting to pull before branching",
      solution: "Always 'git pull origin main' before 'git checkout -b'.",
      impact: "You start your feature on an outdated version of the code, leading to more merge conflicts later."
    }
  ],

  bestPractices: [
    "Descriptive Branch Naming: Use prefixes like 'feat/', 'fix/', 'docs/', 'refactor/', and 'test/'. Example: 'feat/user-profile-upload'.",
    "Keep Branches Short-Lived: The longer a branch exists, the harder it is to merge. Merge small chunks of work frequently.",
    "Rebase vs Merge: Use merge for public history (PRs) and rebase for cleaning up local commits before pushing to the server.",
    "Delete Merged Branches: Once a feature is merged, delete the branch locally and remotely. A repository with 200 dead branches is a nightmare to navigate."
  ],

  challenges: [
    {
      title: "The Parallel Universe Challenge",
      description: "1. Create two branches from main: 'feature-a' and 'feature-b'. 2. In 'feature-a', modify line 1 of file.txt. 3. In 'feature-b', modify line 1 of the same file.txt with different content. 4. Merge 'feature-a' into main. 5. Try to merge 'feature-b' into main. Resolve the resulting merge conflict manually and commit the fix.",
      difficulty: "intermediate",
      hints: ["Git will mark the conflict in the file with <<<<<< HEAD and >>>>>> branch-name", "Open the file in an editor, choose the final version, and run 'git add' to mark it as resolved"],
      solution: "1. git checkout -b feature-a && echo 'A' > file.txt && git add . && git commit -m 'a'\\n2. git checkout main && git checkout -b feature-b && echo 'B' > file.txt && git add . && git commit -m 'b'\\n3. git checkout main && git merge feature-a\\n4. git merge feature-b\\n5. Edit file.txt to 'A and B', git add file.txt, git commit",
      expectedOutput: "A merged file containing both changes and a merge commit in the log."
    }
  ],

  quiz: [
    {
      question: "What is a Git branch, technically speaking?",
      options: ["A complete copy of the project folder", "A pointer to a specific commit", "A separate database of changes", "A hidden folder in the .git directory"],
      answer: "A pointer to a specific commit",
      explanation: "Branches are just labels (pointers) that move forward as you add new commits. They are incredibly lightweight.",
      difficulty: "beginner"
    },
    {
      question: "Which command is used to create a branch and switch to it in one step?",
      options: ["git branch -b <name>", "git checkout <name>", "git checkout -b <name>", "git switch -c <name>"],
      answer: "git checkout -b <name>",
      explanation: "The -b flag tells git to create the branch if it doesn't exist and then switch to it.",
      difficulty: "beginner"
    },
    {
      question: "What is 'HEAD' in Git?",
      options: ["The most recent commit on the main branch", "A pointer to the current branch you are working on", "The first commit in the repository", "The remote server's latest state"],
      answer: "A pointer to the current branch you are working on",
      explanation: "HEAD is a special pointer that tells Git which branch is currently checked out. When you 'git checkout', you are moving the HEAD pointer.",
      difficulty: "intermediate"
    },
    {
      question: "What happens during a 'fast-forward' merge?",
      options: ["Git creates a new merge commit", "Git simply moves the pointer forward to the latest commit of the feature branch", "Git deletes the feature branch immediately", "Git forces the developer to resolve conflicts manually"],
      answer: "Git simply moves the pointer forward to the latest commit of the feature branch",
      explanation: "If the main branch hasn't diverged (no new commits since the feature branch was created), Git just slides the main pointer forward. No merge commit is needed.",
      difficulty: "intermediate"
    },
    {
      question: "Which branching strategy is best for teams doing continuous delivery (CD) of small changes?",
      options: ["Git Flow", "Trunk-Based Development", "Centralized Workflow", "Manual Branching"],
      answer: "Trunk-Based Development",
      explanation: "Trunk-based development focuses on merging small, frequent updates to the main branch, reducing the risk of large, painful merge conflicts.",
      difficulty: "intermediate"
    },
    {
      question: "How do you delete a local branch after merging it?",
      options: ["git remove <name>", "git branch -d <name>", "git checkout -d <name>", "git merge --delete <name>"],
      answer: "git branch -d <name>",
      explanation: "The -d flag safely deletes the branch only if it has been merged into the current HEAD.",
      difficulty: "beginner"
    },
    {
      question: "What is the risk of committing directly to the 'main' branch in a team?",
      options: ["It takes too long", "It requires more disk space", "It can introduce breaking changes that block other developers", "It is not possible in modern Git"],
      answer: "It can introduce breaking changes that block other developers",
      explanation: "If you push a bug to main, every other developer who pulls from main will inherit that bug, potentially stopping their work.",
      difficulty: "beginner"
    },
    {
      question: "When using 'git merge feature-a' while on 'main', where do the changes from 'feature-a' go?",
      options: ["They stay in feature-a", "They are moved to the staging area", "They are integrated into the 'main' branch", "They are deleted from feature-a"],
      answer: "They are integrated into the 'main' branch",
      explanation: "Merge takes the contents of a source branch and integrates them into the target branch (the one currently checked out).",
      difficulty: "beginner"
    },
    {
      question: "What is the difference between 'git checkout' and 'git switch'?",
      options: ["No difference", "git switch is only for branches, checkout is for files and branches", "git checkout is deprecated", "git switch only works with remote branches"],
      answer: "git switch is only for branches, checkout is for files and branches",
      explanation: "git checkout was overloaded (used for both branches and restoring files), so git switch was introduced to provide a dedicated, clearer command for branch management.",
      difficulty: "intermediate"
    },
    {
      question: "What is a 'Merge Conflict'?",
      options: ["When two people try to push to the server at once", "When Git cannot automatically decide which version of a line of code to keep", "When the branch name is already taken", "When the .git folder is corrupted"],
      answer: "When Git cannot automatically decide which version of a line of code to keep",
      explanation: "A conflict occurs when the same line in the same file was modified differently in two branches being merged.",
      difficulty: "beginner"
    },
    {
      question: "True or False: Creating a branch in Git copies all your project files into a new folder.",
      options: ["True", "False"],
      answer: "False",
      explanation: "Git branches are just pointers to commits. No files are copied; Git simply updates your working directory to match the snapshot the pointer refers to.",
      difficulty: "intermediate"
    },
    {
      question: "What is the best way to name a branch for a new feature called 'User Profiles'?",
      options: ["profile-stuff", "user-profiles-final", "feat/user-profiles", "main-version-2"],
      answer: "feat/user-profiles",
      explanation: "Using a prefix like 'feat/' helps categorize branches and makes the repository easier to manage for the whole team.",
      difficulty: "beginner"
    },
    {
      question: "Which command is used to see a list of all local branches?",
      options: ["git branch", "git list", "git show-branches", "git status"],
      answer: "git branch",
      explanation: "Running 'git branch' without arguments lists all local branches, with the current one marked by an asterisk.",
      difficulty: "beginner"
    },
    {
      question: "Why should you pull from main before creating a feature branch?",
      options: ["To clear the staging area", "To ensure you are building on the latest code and reduce future conflicts", "To backup your local work to the server", "To delete old branches"],
      answer: "To ensure you are building on the latest code and reduce future conflicts",
      explanation: "Branching from an outdated version of main means you will have to resolve conflicts with all the changes that happened since that version.",
      difficulty: "intermediate"
    },
    {
      question: "In a 'GitHub Flow' workflow, what is the purpose of a Pull Request (PR)?",
      options: ["To pull code from the server", "To request the server to delete a branch", "To propose changes and allow team review before merging", "To bypass the merge process"],
      answer: "To propose changes and allow team review before merging",
      explanation: "A PR is a request to 'pull' changes from a feature branch into the main branch, serving as a forum for code review and quality assurance.",
      difficulty: "beginner"
    }
  ],

  interview: [
    {
      question: "Explain the concept of 'Context Switching' in Git using branches.",
      answer: "Context switching is the ability to stop working on one task (e.g., a large new feature) and immediately switch to another (e.g., an urgent production bug fix) without losing progress. By committing the current work on a 'feature' branch and switching to a new 'hotfix' branch (or back to 'main'), the developer can maintain a clean separation of concerns. Once the fix is deployed, they can switch back to the 'feature' branch and resume exactly where they left off, as Git restores the entire working directory to the state of that branch's latest commit.",
      difficulty: "intermediate",
      tags: ["branches", "workflow", "productivity"],
      companyFrequency: 80
    },
    {
      question: "What is the difference between a Fast-Forward merge and a Three-Way merge?",
      answer: "A fast-forward merge occurs when the target branch has no new commits since the source branch was created; Git simply 'slides' the pointer forward. A three-way merge occurs when the target branch has diverged (has new commits). Git must create a new 'merge commit' that has two parents, combining the history of both branches. Three-way merges are necessary when parallel development happens on the same line of code.",
      difficulty: "intermediate",
      tags: ["merge", "history", "internals"],
      companyFrequency으로: 70
    },
    {
      question: "Why is 'Atomic Committing' important in a feature branch workflow?",
      answer: "Atomic commits mean each commit contains only one logical change. This is critical because if a feature consists of 10 changes and one of them introduces a bug, an atomic history allows the developer to use 'git revert' on just that one commit without losing the other 9 working parts of the feature. It also makes code reviews significantly easier, as the reviewer can follow the evolution of the feature step-by-step.",
      difficulty: "intermediate",
      tags: ["best-practices", "commits", "revert"],
      companyFrequency: 85
    },
    {
      question: "Compare 'Git Flow' and 'Trunk-Based Development'. When would you use which?",
      answer: "Git Flow is a structured, multi-branch model (Main, Develop, Feature, Release, Hotfix) suitable for projects with scheduled release cycles (e.g., a mobile app updated every 2 weeks). It provides high stability but is slower. Trunk-Based Development involves all developers merging small changes into a single 'trunk' (main) frequently, often multiple times a day. It is designed for high-velocity teams using CI/CD, where automated tests replace the need for long-lived release branches. It is faster but requires much higher test coverage to prevent breaking the main branch.",
      difficulty: "advanced",
      tags: ["strategy", "workflow", "CI-CD"],
      companyFrequency: 60
    },
    {
      question: "What is 'detached HEAD' state and how do you fix it?",
      answer: "A 'detached HEAD' happens when you check out a specific commit hash instead of a branch name. In this state, you are not on any branch. If you make commits here, they aren't associated with any branch pointer and can be easily lost (garbage collected) once you switch away. To fix it, you can simply create a new branch from your current position using 'git checkout -b <new-branch-name>', which attaches the HEAD to a new pointer and saves your work.",
      difficulty: "advanced",
      tags: ["HEAD", "branches", "checkout"],
      companyFrequency: 50
    }
  ],

  project: {
    title: "The Feature-Sprints Simulation",
    requirements: [
      "Create a main project with a basic index.html",
      "Implement a 'feature/ui-update' branch: Add a CSS file and link it",
      "Implement a 'feature/content-add' branch: Add two new paragraphs to index.html",
      "Simulate a conflict: Modify the same line in both branches",
      "Perform a successful merge of both branches into main",
      "Delete all feature branches after merging"
    ],
    architecture: "Branch Topology: Main $\\rightarrow$ (Feature A, Feature B) $\\rightarrow$ Main (Merge Commit)",
    folderStructure: "git-workflow-lab/\\n├── .git/\\n├── index.html\\n└── style.css",
    implementationGuide: "1. git init && touch index.html && git add . && git commit -m 'initial'\\n2. git checkout -b feat-ui && echo 'body {color:red}' > style.css && git add . && git commit -m 'ui update'\\n3. git checkout main && git checkout -b feat-content && echo 'Hello' > index.html && git add . && git commit -m 'content'\\n4. git checkout main && git merge feat-ui\\n5. git merge feat-content (handle conflict if occurs) $\\rightarrow$ edit file $\\rightarrow$ git add $\\rightarrow$ git commit",
    challenges: [
      "Try to merge a branch that has not been committed yet (see what happens).",
      "Use 'git branch -a' to see both local and remote tracking branches."
    ],
    interviewDiscussion: "Discuss the trade-offs between 'fast-forward' merges and 'merge commits' (maintaining a linear vs. non-linear history)."
  },

  cheatsheet: {
    branching: [
      { command: "git branch", description: "List branches" },
      { command: "git branch <name>", description: "Create branch" },
      { command: "git checkout <name>", description: "Switch branch" },
      { command: "git checkout -b <name>", description: "Create & Switch" },
      { command: "git switch <name>", description: "Modern switch" }
    ],
    merging: [
      { command: "git merge <branch>", description: "Merge <branch> into current" },
      { command: "git merge --abort", description: "Stop a conflicted merge" },
      { command: "git branch -d <name>", description: "Delete merged branch" },
      { command: "git branch -D <name>", description: "Force delete branch" }
    ],
    remote_workflow: [
      { command: "git pull origin main", description: "Update local main from server" },
      { command: "git push origin <branch>", description: "Upload branch to server" }
    ]
  }
}
