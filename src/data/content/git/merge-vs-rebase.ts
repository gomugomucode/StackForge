export const topic = {
  title: "Merge vs Rebase",
  slug: "merge-vs-rebase",
  difficulty: "intermediate",
  readTime: "50 min",
  xpReward: 600,

  overview: "When you have two divergent paths of development (e.g., a feature branch and the main branch), you eventually need to integrate them. Git provides two primary ways to do this: Merge and Rebase. While both achieve the same end goal—integrating changes—they do so in fundamentally different ways. Merge preserves the exact historical record of when branches diverged and converged, while Rebase 'rewrites' history to create a perfectly linear sequence of commits. Choosing the wrong one can lead to 'merge hell' or the accidental deletion of critical history.",
  whyItMatters: "In a professional team, the 'Merge vs Rebase' debate is constant. If you only use Merge, your project history becomes a 'train map' of criss-crossing lines that is hard to read. If you only use Rebase, you risk losing the context of when a feature was actually developed. Mastering both allows you to maintain a clean, readable commit history while still preserving the integrity of the project's evolution. This is the hallmark of a senior engineer who cares about the 'forensics' of their codebase.",

  content: [
    {
      section: "The Git Merge: Preserving History",
      text: "A merge is a non-destructive operation. When you merge a feature branch into main, Git looks for the 'common ancestor' of the two branches and performs a 'three-way merge'. This creates a new 'Merge Commit' that has two parents: the tip of the main branch and the tip of the feature branch.\n\n**Pros of Merge:**\n- **Complete Traceability:** You can see exactly when a feature was started and when it was integrated.\n- **Safe:** It doesn't change existing commits, so it's safe for public branches.\n- **Context:** The merge commit serves as a clear marker of a feature's completion.\n\n**Cons of Merge:**\n- **Polluted History:** In large teams, the commit log becomes cluttered with 'Merge branch X into main' commits, making it hard to find where a specific change was introduced."
    },
    {
      section: "The Git Rebase: Linearizing History",
      text: "Rebasing is the process of moving or combining a sequence of commits to a new base commit. Instead of creating a merge commit, Git takes the commits from your feature branch and 're-plays' them one by one on top of the current main branch. This effectively moves the start of your feature branch to the very tip of main.\n\n**Pros of Rebase:**\n- **Clean History:** The commit log is a straight line. No criss-crossing, no redundant merge commits.\n- **Easier Debugging:** Tools like `git bisect` work much better on linear histories.\n- **Professionalism:** Your PRs look cleaner because they appear to have been written on the latest version of the code.\n\n**Cons of Rebase:**\n- **Destructive:** Rebase rewrites history. It creates entirely new commits with different hashes, even if the code is the same.\n- **Dangerous for Public Branches:** If you rebase a branch that others are working on, you will break their history, forcing them to perform complex manual recoveries (the 'Golden Rule of Rebasing')."
    },
    {
      section: "The Golden Rule of Rebasing",
      text: "NEVER rebase a branch that has been pushed to a public repository. \n\nIf you rebase a public branch, you are changing the history that other developers have already based their work on. When they pull the rebased branch, Git will try to merge the old history with the new rewritten history, resulting in massive duplicate commits and confusing conflicts. Only rebase your local, private feature branches before merging them into the main shared line."
    }
  ],

  syntax: [
    {
      command: "git merge <branch>",
      description: "Integrates the specified branch into the current branch using a merge commit.",
      example: "git checkout main && git merge feat/login"
    },
    {
      command: "git rebase <branch>",
      description: "Re-applies the current branch's commits on top of the specified branch.",
      example: "git checkout feat/login && git rebase main"
    },
    {
      command: "git rebase -i <commit-hash>",
      description: "Interactive rebase: Allows you to squash, edit, or drop commits before merging.",
      example: "git rebase -i HEAD~3"
    },
    {
      command: "git rebase --continue",
      description: "Continues the rebasing process after resolving a conflict.",
      example: "git add . && git rebase --continue"
    },
    {
      command: "git rebase --abort",
      description: "Completely stops the rebase process and returns the branch to its original state.",
      example: "git rebase --abort"
    }
  ],

  examples: [
    {
      title: "Scenario: Cleaning Up a Messy Local Feature",
      code: `// You have 5 messy commits on your local feature branch
// 'fix typo', 'still debugging', 'almost there', 'fixed it!', 'final version'

// Use Interactive Rebase to squash them into one professional commit
git rebase -i HEAD~5

// In the editor, change 'pick' to 'squash' for the last 4 commits:
// pick a1b2c3d Initial feature implementation
// squash e4f5g6h fix typo
// squash i7j8k9l still debugging...

// Save and close. Git will now ask for a new combined commit message:
// 'feat: implement user authentication system'

// Now the history is clean!`,
      output: "A single, clean commit instead of 5 fragmented ones.",
      explanation: "Interactive rebasing is the 'secret weapon' of senior developers. It allows you to clean up your local history before anyone else sees it, ensuring your PRs are a pleasure to review."
    }
  ],

  mistakes: [
    {
      error: "Rebasing a shared main branch",
      solution: "Only rebase private feature branches. If you accidentally rebase main, you'll have to use 'git push --force', which can destroy your teammates' work.",
      impact: "Desynchronization of history across the entire team."
    },
    {
      error: "Solving the same conflict multiple times during rebase",
      solution: "Use 'git rerere' (Reuse Recorded Resolution). It remembers how you solved a conflict and applies the same fix automatically next time.",
      impact: "Frustration and wasted time during long rebases."
    },
    {
      error: "Thinking 'merge' is always better because it's 'safer'",
      solution: "Use merge for the final integration into main, but use rebase locally to keep your feature updated with the latest main changes.",
      impact: "A 'spaghetti' history that makes it impossible to track when a bug was actually introduced."
    }
  ],

  bestPractices: [
    "Local Rebase, Public Merge: Rebase your local branch against main to keep it fresh, then perform a merge commit into main to mark the feature completion.",
    "Squash Before You Merge: Use interactive rebase to combine 'fixup' commits into logical blocks of work.",
    "Use --no-ff for important features: This forces Git to create a merge commit even if a fast-forward is possible, preserving the visual evidence that a feature branch existed.",
    "Always check 'git status' during a rebase to see which commit is currently being applied."
  ],

  challenges: [
    {
      title: "The History Architect Challenge",
      description: "1. Create a project with 3 commits on main. 2. Create a branch 'feat-1' and add 2 commits. 3. Go back to main and add 1 more commit. 4. Rebase 'feat-1' onto main. 5. Compare the result using 'git log --graph --oneline' before and after the rebase.",
      difficulty: "intermediate",
      hints: ["Before rebase: The graph will show a fork.", "After rebase: The graph will be a perfectly straight line."],
      solution: "git checkout main && echo '1' > f.txt && git add . && git commit -m 'm1' // ... repeat for 3 commits\\ngit checkout -b feat-1 && echo 'a' >> f.txt && git add . && git commit -m 'a1' // ... repeat for 2 commits\\ngit checkout main && echo '2' >> f.txt && git add . && git commit -m 'm4'\\ngit checkout feat-1 && git rebase main",
      expectedOutput: "A linear history where feat-1 commits appear after the latest main commit."
    }
  ],

  quiz: [
    {
      question: "Which operation is considered 'destructive' because it rewrites commit hashes?",
      options: ["git merge", "git rebase", "git checkout", "git add"],
      answer: "git rebase",
      explanation: "Rebase creates new commits for every re-applied change. Even if the code is identical, the parent commit and timestamp change, resulting in a new hash.",
      difficulty: "intermediate"
    },
    {
      question: "What is the 'Golden Rule' of rebasing?",
      options: ["Always rebase before pushing", "Never rebase a public/shared branch", "Only rebase the main branch", "Rebase only when there are conflicts"],
      answer: "Never rebase a public/shared branch",
      explanation: "Rebasing shared history creates duplicate commits for everyone else on the team, leading to a chaotic repository state.",
      difficulty: "intermediate"
    },
    {
      question: "What is a 'merge commit'?",
      options: ["A commit that deletes a branch", "A commit with two parent commits, combining two lines of history", "A commit that only contains metadata", "The first commit of a repository"],
      answer: "A commit with two parent commits, combining two lines of history",
      explanation: "A merge commit is created when two divergent histories are joined. It serves as a permanent record of the merge event.",
      difficulty: "beginner"
    },
    {
      question: "In which scenario is 'git rebase' generally preferred over 'git merge'?",
      options: ["When merging a feature into the production main branch", "When updating a local feature branch with the latest changes from main", "When collaborating with 10 other people on the same branch", "When you want to preserve the exact time of each commit"],
      answer: "When updating a local feature lanch with the latest changes from main",
      explanation: "Rebasing a local feature branch keeps the history linear and clean, avoiding unnecessary 'merge' commits every time you pull from main.",
      difficulty: "intermediate"
    },
    {
      question: "What does 'git rebase -i' allow you to do?",
      options: ["Ignore conflicts", "Interactively modify, squash, or delete commits", "Merge multiple branches at once", "Revert to the first commit of the project"],
      answer: "Interactively modify, squash, or delete commits",
      explanation: "Interactive rebase opens a list of commits where you can change the action (pick, squash, edit, drop) for each one.",
      difficulty: "advanced"
    },
    {
      question: "If a rebase is going poorly and you've made a mess of the conflicts, how do you stop it and go back?",
      options: ["git reset --hard", "git rebase --abort", "git checkout main", "git merge --cancel"],
      answer: "git rebase --abort",
      explanation: "git rebase --abort immediately stops the rebase process and returns your branch to the state it was in before the rebase started.",
      difficulty: "beginner"
    },
    {
      question: "What is a 'fast-forward' merge?",
      options: ["A merge that happens in under one second", "A merge where the target branch is a direct ancestor of the source branch", "A merge that skips the staging area", "A merge that only happens on the main branch"],
      answer: "A merge where the target branch is a direct ancestor of the source branch",
      explanation: "In a fast-forward, Git just moves the pointer forward because there is no divergence to resolve.",
      difficulty: "intermediate"
    },
    {
      question: "Why would a senior developer use 'git merge --no-ff'?",
      options: ["To speed up the merge process", "To force the creation of a merge commit even if a fast-forward is possible", "To avoid resolving conflicts", "To delete the feature branch automatically"],
      answer: "To force the creation of a merge commit even if a fast-forward is possible",
      explanation: "This preserves the historical evidence that a feature branch existed, which is useful for auditing and grouping related commits.",
      difficulty: "advanced"
    },
    {
      question: "Which tool is most effective for finding a bug in a linear (rebased) history?",
      options: ["git log", "git bisect", "git checkout", "git diff"],
      answer: "git bisect",
      explanation: "git bisect uses a binary search to find the exact commit that introduced a bug. This is much easier on a linear history than a complex merge web.",
      difficulty: "intermediate"
    },
    {
      question: "What is the result of 'squashing' commits during an interactive rebase?",
      options: ["It deletes all but the first commit", "It combines multiple commits into one", "It reverts the changes of a commit", "It changes the author of the commit"],
      answer: "It combines multiple commits into one",
      explanation: "Squashing allows you to take 'work-in-progress' commits and merge them into a single, clean, professional commit.",
      difficulty: "intermediate"
    },
    {
      question: "True or False: Rebase changes the commit hash of the commits it moves.",
      options: ["True", "False"],
      answer: "True",
      explanation: "Because the parent commit changes, the hash of the commit (which is a SHA-1 of its contents, parent, and timestamp) also changes.",
      difficulty: "intermediate"
    },
    {
      question: "When should you use 'git rebase --continue'?",
      options: ["When you want to stop a rebase", la "After resolving merge conflicts during a rebase", "When you want to switch branches", "Before starting a rebase"],
      answer: "After resolving merge conflicts during a rebase",
      explanation: "During a rebase, if Git hits a conflict, it stops. You fix the conflict, 'git add' the file, and then run 'git rebase --continue' to move to the next commit.",
      difficulty: "beginner"
    },
    {
      question: "What is a 'three-way merge'?",
      options: ["A merge involving three different branches", "A merge using the two branch tips and their common ancestor", "A merge that takes three times longer than usual", "A merge that requires three developers to approve"],
      answer: "A merge using the two branch tips and their common ancestor",
      explanation: "Git uses the common ancestor to determine which changes were made in each branch and integrates them together.",
      difficulty: "intermediate"
    },
    {
      question: "Which of these is a downside of a strictly linear history created by rebasing?",
      options: ["It's harder to read", "It loses the exact chronological sequence of when branches diverged", "It takes more disk space", "It prevents you from using GitHub"],
      answer: "It loses the exact chronological sequence of when branches diverged",
      explanation: "While a linear history is cleaner, you lose the visual 'fork' that shows exactly when a developer started a feature relative to others.",
      difficulty: "advanced"
    },
    {
      question: "What is the danger of 'git push --force' after a rebase?",
      options: ["It deletes the local repository", "It can overwrite the remote history, erasing commits made by teammates", "It causes the server to crash", "It disables the .gitignore file"],
      answer: "It can overwrite the remote history, erasing commits made by teammates",
      explanation: "Because rebase rewrites history, you must force push. If a teammate pushed changes to that branch in the meantime, those changes will be wiped out.",
      difficulty: "intermediate"
    }
  ],

  interview: [
    {
      question: "If you had to explain the difference between Merge and Rebase to a junior developer, what analogy would you use?",
      answer: "I'd use the 'Book' analogy. A Merge is like adding an Appendix to a book; you keep the original story exactly as it was and just add a section at the end that connects the two. A Rebase is like rewriting the original story to incorporate the new chapters as if they had always been there from the start. The Merge keeps the history of 'how we got here', while the Rebase creates a 'perfect story' of what the final result is.",
      difficulty: "beginner",
      tags: ["communication", "concepts", "merge", "rebase"],
      companyFrequency: 70
    },
    {
      question: "Walk me through the process of solving a conflict during a rebase.",
      answer: "1. Git stops and notifies me of the conflict. 2. I open the affected files and look for the conflict markers (<<<<< HEAD). 3. I decide which code to keep or combine both. 4. I save the file and run 'git add <file>' to mark it as resolved. 5. I run 'git rebase --continue'. If there are multiple commits being re-applied, I may have to repeat this for each commit. If it becomes too chaotic, I use 'git rebase --abort' to reset to safety.",
      difficulty: "intermediate",
      tags: ["conflicts", "rebase", "workflow"],
      companyFrequency: 80
    },
    {
      question: "What is the 'Surgical' approach to Git history, and how does interactive rebase fit in?",
      answer: "Surgical history means treating the commit log as a piece of documentation rather than a raw dump of a developer's activity. Instead of having commits like 'fixed bug' 10 times, a surgical approach uses interactive rebase (`git rebase -i`) to squash those into one clear 'fix: resolve race condition in auth flow' commit. This makes the history meaningful for future audits and makes using tools like `git bisect` significantly more efficient.",
      difficulty: "advanced",
      tags: ["interactive-rebase", "best-practices", "history"],
      companyFrequency: 50
    },
    {
      question: "When would a merge commit be preferable over a linear history?",
      answer: "A merge commit is preferable when you want to preserve the 'identity' of a feature. For example, in a large-scale project, seeing a merge commit 'Merge feature/payment-gateway' tells you exactly when that entire module was integrated. If you rebase and squash, you get a linear list of commits, but you lose the explicit marker of when the feature was 'closed'. Many teams use a hybrid: rebase locally for cleanliness, but use merge commits for the final integration into main to keep the 'big picture' architecture of the history.",
      difficulty: "advanced",
      tags: ["workflow", "strategy", "merge"],
      companyFrequency: 60
    },
    {
      question: "How do you handle a situation where you rebased a shared branch and someone else already pulled it?",
      L: "The most professional way to handle this is to admit the mistake immediately and coordinate with the team. The affected developers should use 'git fetch' and then 'git reset --hard origin/<branch>' to align their local history with the new rewritten remote history. However, this will wipe any local commits they had on that branch, so they must first back up their work as patches or temporary branches. This is precisely why we never rebase shared branches.",
      difficulty: "advanced",
      tags: ["recovery", "shared-branches", "collaboration"],
      companyFrequency: 40
    }
  ],

  project: {
    title: "The History Surgeon",
    requirements: [
      "Create a project with 5 fragmented, poorly-named commits",
      "Use interactive rebase to squash them into 2 logical commits",
      "Rename the commits to follow Conventional Commits standard",
      "Simulate a divergence between a feature branch and main",
      "Perform a rebase of the feature branch onto main",
      "Resolve at least one conflict during the rebase process"
    ],
    architecture: "Divergent History $\\rightarrow$ Rebase $\\rightarrow$ Linear History",
    folderStructure: "git-history-lab/\\n├── .git/\\n└── app.js",
    implementationGuide: "1. Create 5 commits with messages like 'save', 'fixed', '...', 'now ok', 'final'.\\n2. git rebase -i HEAD~5 $\\rightarrow$ change 'pick' to 'squash'.\\n3. Create a new branch, modify line 1. Switch to main, modify line 1. Try to merge/rebase.",
    challenges: [
      "Try to 'edit' a commit from 3 positions back using interactive rebase.",
      "Use 'git reflog' to recover a commit that was deleted during a rebase."
    ],
    interviewDiscussion: "Discuss the difference between 'rebase' and 'merge' in terms of how they change the project's 'story'. Which one is 'truthful' and which one is 'curated'?"
  },

  cheatsheet: {
    merge_basics: [
      { command: "git merge <branch>", description: "Merge into current branch" },
      { command: "git merge --no-ff", description: "Force merge commit (no fast-forward)" },
      { command: "git merge --abort", description: "Cancel a conflicted merge" }
    ],
    rebase_basics: [
      { command: "git rebase <branch>", description: "Move current branch on top of <branch>" },
      { command: "git rebase -i <hash>", description: "Interactive rebase" },
      { command: "git rebase --continue", description: "Next step after conflict fix" },
      { command: "git rebase --abort", description: "Cancel rebase" }
    ],
    history_cleanup: [
      { command: "git commit --amend", description: "Change the last commit message/content" },
      { command: "git reflog", description: "View all head movements (recovery tool)" }
    ]
  }
}
