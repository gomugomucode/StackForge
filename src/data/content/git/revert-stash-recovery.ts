export const topic = {
  title: "Revert, Stash & Recovery",
  slug: "revert-stash-recovery",
  difficulty: "intermediate",
  readTime: "45 min",
  xpReward: 500,

  overview: "In the real world, developers often find themselves in the middle of a complex task when an urgent bug report comes in, or they realize the last three hours of work were a mistake. This is where the 'Safety Net' tools of Git come in. `git revert` allows you to undo changes safely on public branches, `git stash` lets you 'pause' your current work to switch contexts, and advanced recovery techniques (using `reflog` and `fsck`) ensure that as long as you committed your code, it is almost impossible to lose. Together, these tools provide the confidence to experiment boldly, knowing you can always return to a stable state.",
  whyItMatters: "The difference between a junior and a senior developer is often how they handle mistakes. A junior might panic and delete the project folder or start a new repository. A senior uses `stash` to switch tasks in seconds and `revert` to undo a production bug without breaking the team's history. Mastering these recovery tools reduces stress and prevents 'catastrophic' data loss, making you a more reliable and efficient teammate.",

  content: [
    {
      section: "Git Revert: The Safe Undo",
      text: "Unlike `git reset`, which deletes commits from history, `git revert` creates a new commit that does the exact opposite of the commit you want to undo. If you added a line of code in the target commit, the revert commit deletes it. If you deleted a file, the revert commit restores it.\n\n**Why Revert is the Standard for Public Branches:**\nImagine you pushed a commit to the `main` branch and three teammates already pulled it. If you use `git reset` and force-push, you change the history they already have. Their Git will think the la-history has diverged, leading to massive conflicts. By using `git revert`, you add a new commit to the timeline. Your teammates simply pull the new commit, and the bug is gone, with no history disruption."
    },
    {
      section: "Git Stash: The Developer's Pause Button",
      text: "You're halfway through a complex feature, and your code is currently broken—it doesn't even compile. Suddenly, your boss asks for a one-line fix in a different file. You can't commit your current work because it's broken, and you can't switch branches because Git won't let you move with uncommitted changes that would be overwritten.\n\n`git stash` takes all your current uncommitted changes (both staged and unstaged) and saves them in a temporary internal stack. Your working directory becomes clean, allowing you to switch branches, fix the bug, and then 'pop' your stash back to resume exactly where you left off."
    },
    {
      section: "The Art of Recovery: Beyond Reset",
      text: "Many developers believe that once they run `git reset --hard` or delete a branch, the code is gone. In reality, Git is very reluctant to actually delete data. \n\n1. **The Reflog:** `git reflog` is a local record of every single time the HEAD pointer moved. Even if you deleted a branch or reset your history, the commit hashes are still recorded in the reflog for 30-90 days. You can find the hash of your 'lost' work and merge it back into a new branch.\n\n2. **Dangling Blobs:** When you `git add` a file, Git creates a 'blob' in the object database immediately, even before you commit. If you never committed the file but it was staged, you can sometimes find it using `git fsck --lost-found`."
    }
  ],

  syntax: [
    {
      command: "git revert <commit-hash>",
      description: "Creates a new commit that undoes the changes of the specified commit.",
      example: "git revert a1b2c3d"
    },
    {
      command: "git stash",
      description: "Saves all current uncommitted changes to the stash stack and cleans the working directory.",
      example: "git stash"
    },
    {
      command: "git stash save \"message\"",
      description: "Saves a stash with a custom name for easier identification.",
      example: "git stash save \"half-done-login-form\""
    },
    {
      command: "git stash list",
      description: "Lists all currently saved stashes.",
      example: "git stash list"
    },
    {
      command: "git stash pop",
      description: "Restores the most recent stash and removes it from the stack.",
      example: "git stash pop"
    },
    {
      command: "git stash apply",
      description: "Restores the most recent stash but keeps it in the stack.",
      example: "git stash apply"
    },
    {
      command: "git stash drop",
      description: "Deletes the most recent stash without applying it.",
      example: "git stash drop"
    },
    {
      command: "git reflog",
      description: "Shows the log of where HEAD has been throughout the session.",
      example: "git reflog"
    }
  ],

  examples: [
    {
      title: "The 'Panic' Workflow (Stash & Recover)",
      code: `// 1. You are working on a feature, code is a mess
echo \"half-finished logic...\" > app.js
git status // Modified: app.js

// 2. Urgent fix needed on main
git stash save \"work-in-progress-feature\"
git checkout main
echo \"fix: actual bug fix\" > fix.txt
git add . && git commit -m \"fix: resolve critical bug\"

// 3. Return to feature and restore work
git checkout feature-branch
git stash list // stash@{0}: On feature-branch: work-in-progress-feature
git stash pop

// 4. Continue working
echo \"finished logic!\" >> app.js`,
      output: "Smooth transition between tasks without polluting history with 'wip' commits.",
      explanation: "Stashing is the professional way to handle context switching. It keeps your commit history clean and your workflow fluid."
    }
  ],

  mistakes: [
    {
      error: "Using 'git reset' to undo a pushed commit",
      solution: "Use 'git revert'. It creates a new commit that undoes the change, which is the only safe way to handle public history.",
      impact: "Causes 'diverged history' for everyone else on the team, requiring forced resets and manual recovery."
    },
    {
      error: "Forgetting what is in the stash",
      solution: "Always use 'git stash save \"message\"' instead of just 'git stash'. When you have 10 stashes, 'stash@{0}' means nothing, but 'fix-header-layout' means everything.",
      impact: "Losing hours of work because you couldn't remember which stash contained the 'good' version of a function."
    },
    {
      error: "Applying a stash to a branch that has diverged too much",
      solution: "If 'git stash pop' causes massive conflicts, use 'git stash apply'. This keeps the stash in the list so you can try applying it to a different branch or manually merge the changes.",
      impact: "Accidentally deleting a stash (via pop) that you couldn't actually integrate, losing the only copy of those changes."
    }
  ],

  bestPractices: [
    "Stash vs WIP Commits: Use stash for very short breaks (minutes). For longer breaks (hours/days), create a 'WIP' commit and then squash it later. Stashes are local and not backed up to the server.",
    "Clean the Stash: Regularly run 'git stash clear' or 'git stash drop' to remove old, irrelevant snapshots.",
    "Revert carefully: When reverting a merge commit, you must specify the parent side you want to keep using the `-m` flag (e.g., `git revert -m 1 <hash>`).",
    "Reflog as a Safety Net: Whenever you're about to do something dangerous (like a hard reset), run `git reflog` first to note your current position."
  ],

  challenges: [
    {
      title: "The Multi-Tasking Master",
      description: "1. Create a file 'work.txt' and add some text. 2. Stash it with a name. 3. Create a second file 'work2.txt', add text, and stash it with a different name. 4. Switch to a new branch. 5. Apply ONLY the second stash. 6. Switch back to the first branch and pop the first stash.",
      difficulty: "intermediate",
      hints: ["Use 'git stash list' to see the indices ({0}, {1})", "Use 'git stash apply stash@{1}' to apply a specific stash by index"],
      solution: "git stash save 'one' && git stash save 'two'\\ngit checkout -b other-branch\\ngit stash apply stash@{1}\\ngit checkout main\\ngit stash pop stash@{0}",
      expectedOutput: "Files correctly distributed across branches based on their specific stashes."
    }
  ],

  quiz: [
    {
      question: "What is the primary difference between `git reset` and `git revert`?",
      options: ["Reset is faster", "Revert deletes the commit; reset keeps it", "Reset rewrites history; revert adds a new commit to undo the change", "Reset only works on local branches; revert only works on remote branches"],
      answer: "Reset rewrites history; revert adds a new commit to undo the change",
      explanation: "Reset moves the pointer back, effectively erasing the commit from the current timeline. Revert creates a 'counter-commit' that preserves the historical record of both the mistake and the fix.",
      difficulty: "intermediate"
    },
    {
      question: "When you run `git stash`, where does the code go?",
      options: ["To the remote GitHub server", "To a hidden temporary stack in the .git directory", "It is deleted and must be re-written", "To the staging area"],
      answer: "To a hidden temporary stack in the .git directory",
      explanation: "Stashes are stored locally in the .git folder. They are not pushed to the server, meaning you can't share a stash with a teammate.",
      difficulty: "beginner"
    },
    {
      question: "Which command would you use to restore your work from a stash without removing it from the stash list?",
      options: ["git stash pop", "git stash apply", "git stash restore", "git stash checkout"],
      answer: "git stash apply",
      explanation: "'pop' applies the stash and deletes it from the stack. 'apply' applies the stash but keeps it saved for later use.",
      difficulty: "beginner"
    },
    {
      question: "What happens if you perform a `git revert` on a merge commit?",
      options: ["It's not allowed", "It automatically reverts all branches involved", "You must specify which parent side of the merge to keep using -m", "It deletes the merged branch entirely"],
      answer: "You must specify which parent side of the merge to keep using -m",
      explanation: "A merge commit has two parents. Git needs to know which 'side' of the history should be considered the main line to revert back to.",
      difficulty: "advanced"
    },
    {
      question: "If you accidentally deleted a branch containing important work, which command can help you find the last commit hash?",
      options: ["git log", "git status", "git reflog", "git fsck"],
      answer: "git reflog",
      explanation: "Reflog records every movement of the HEAD pointer, including branch deletions and resets, making it the ultimate recovery tool for local changes.",
      difficulty: "intermediate"
    },
    {
      question: "True or False: `git stash` only saves tracked files by default.",
      options: ["True", "False"],
      answer: "True",
      explanation: "By default, stash ignores untracked files (new files not yet added to git). Use 'git stash -u' (or --include-untracked) to save them as well.",
      difficulty: "intermediate"
    },
    {
      question: "What is the effect of running git stash drop on an empty stack?",
      options: ["It deletes the repository", "It throws an error saying no stash entries found", "It resets the entire project", "It clears all local branches"],
      answer: "It throws an error saying no stash entries found",
      explanation: "If there are no stashes, git simply notifies you that there is nothing to drop.",
      difficulty: "beginner"
    },
    {
      question: "In what scenario would you prefer git revert over git reset --hard on a local branch?",
      options: ["When you want to keep a record of the mistake for educational purposes", "When you want to speed up the process", "When you have no internet connection", "When you want to delete the file entirely"],
      answer: "When you want to keep a record of the mistake for educational purposes",
      explanation: "Even locally, some teams prefer a complete audit trail where every error and fix is documented as a commit.",
      difficulty: "intermediate"
    },
    {
      question: "What does git stash pop do internally compared to apply?",
      options: ["It compresses the code more", "It applies the changes and then immediately runs git commit", "It applies the changes and deletes the stash entry from the stack", "It only works on the main branch"],
      answer: "It applies the changes and deletes the stash entry from the stack",
      explanation: "Pop is essentially a combination of 'apply' and 'drop'.",
      difficulty: "beginner"
    },
    {
      question: "If you have multiple stashes, how do you apply the third one from the top of the stack?",
      options: ["git stash apply 3", "git stash apply stash@{2}", "git stash pop 3", "git stash restore 3"],
      answer: "git stash apply stash@{2}",
      explanation: "Stashes are 0-indexed. The first is stash@{0}, second is stash@{1}, and third is stash@{2}.",
      difficulty: "intermediate"
    },
    {
      question: "What is the difference between git revert and git reset in terms of the commit graph visual?",
      options: ["Revert makes the graph shorter", "Reset makes a new branch pointer", "Revert adds a new node to the graph; reset removes nodes from the current path", "There is no visual difference"],
      answer: "Revert adds a new node to the graph; reset removes nodes from the current path",
      explanation: "Revert moves the graph forward. Reset moves the graph backward.",
      difficulty: "intermediate"
    },
    {
      question: "What happens if you run git stash pop and it causes a conflict?",
      options: ["The stash is deleted anyway", "The stash remains in the stack until the conflict is resolved and manually dropped", "Git automatically deletes the conflicting files", "The entire repository is reset to the last commit"],
      answer: "The stash remains in the stack until the conflict is resolved and manually dropped",
      explanation: "To prevent data loss, git keeps the stash in the list if the pop operation fails due to conflicts.",
      difficulty: "intermediate"
    },
    {
      question: "Which command allows you to see all the stashes currently available with their messages and indices?",
      options: ["git stash show", "git stash list", "git stash view", "git stash dump"],
      answer: "git stash list",
      explanation: "git stash list provides a clean overview of all saved states in the stash stack.",
      difficulty: "beginner"
    },
    {
      question: "True or False: you can stash changes to a specific file only.",
      options: ["True", "False"],
      answer: "True",
      explanation: "While standard stash takes everything, you can use git stash push with a path to stash only specific files.",
      difficulty: "advanced"
    },
    {
      question: "What is the most reliable way to recover a deleted branch that was recently merged and then deleted?",
      options: ["git pull origin main", "git reflog followed by git checkout to the last commit of that branch", "git undo-branch", "git recover --branch"],
      answer: "git reflog followed by git checkout to the last commit of that branch",
      explanation: "Reflog tracks the exact commit where the branch was before it was deleted.",
      difficulty: "intermediate"
    }
  ],

  interview: [
    {
      question: "Explain a scenario where you would use git revert instead of git reset even for a local branch.",
      answer: "I would use `git revert` if I wanted to keep a permanent audit trail of the mistake and its resolution. In highly regulated industries like finance or healthcare, it is often required to document every single change that ever occurred in the codebase, including the errors. Using revert ensures that the history is never rewritten and every action is traceable.",
      difficulty: "advanced",
      tags: ["audit", "revert", "compliance"],
      companyFrequency: 40
    },
    {
      question: "What is the difference between git stash pop and git stash apply?",
      answer: "Both commands restore the changes from a stash to the working directory. The key difference is that pop also deletes the stash entry from the stack after successful application. Apply keeps the stash saved, which is useful if you want to apply the same set of changes to multiple branches without losing the original snapshot.",
      difficulty: "beginner",
      tags: ["stash", "workflow"],
      companyFrequency: 80
    },
    {
      question: "How does git handle stashes when you switch branches?",
      answer: "Stashes are global to the local repository, not tied to a specific branch. This means you can stash changes on branch-A, switch to branch-B, and then pop that stash into branch-B. However, this often leads to merge conflicts if the two branches have diverged significantly in the files being restored.",
      difficulty: "intermediate",
      tags: ["stash", "branches", "conflicts"],
      companyFrequency: 60
    },
    {
      question: "What is the most advanced way to recover a file that was never committed but was staged with 'git add'?",
      answer: "I would use git fsck with the option `--lost-found`. When you run git add, git immediately creates a blob in the object database. Even if the commit fails or you perform a hard reset, that blob remains until the garbage collector (gc) runs. `git fsck` identifies these 'dangling' blobs, and I can then inspect them using git cat-file to find the lost content.",
      difficulty: "advanced",
      tags: ["recovery", "fsck", "blobs", "internals"],
      companyFrequency: 30
    },
    {
      question: "Explain the concept of a 'stashing branch'. Why would you do this instead of using git stash?",
      answer: "A 'stashing branch' is simply a temporary branch where you commit your wip work. I would do this instead of using git stash if the work is substantial and needs to be backed up to the remote server. Since stashes are only local, they can be lost if the machine crashes. By creating a temporary branch and pushing it, the work is safe and can be collaborated on by other developers if necessary.",
      difficulty: "intermediate",
      tags: ["stash", "branches", "backup"],
      companyFrequency: 50
    }
  ],

  project: {
    title: "The Disaster Recovery Drill",
    requirements: [
      "Simulate a production bug by committing a breaking change to 'main'",
      "Use git revert to undo the bug while preserving the history",
      "Work on a feature, then use git stash to clear the deck for a quick fix",
      "Surgically recover a deleted branch using git reflog",
      "Restore a file that was staged but never committed using advanced recovery tools"
    ],
    architecture: "Error State Sectors -> Recovery Path Mapping",
    folderStructure: "git-recovery-lab/\\n├── .git/\\n└── app.js",
    implementationGuide: "1. git commit -m 'broken' -> git revert <hash>.\\n2. echo 'wip' into file -> git stash save name -> git checkout other branch.\\n3. git branch -D temp-branch -> git reflog find hash of temp branch tip -> git checkout -b recovered-branch <hash>.",
    challenges: [
      "Try to revert a merge commit and experience the need for the parent flag (-m).",
      "Compare the output of 'git log' vs 'git reflog' after a hard reset."
    ],
    interviewDiscussion: "Discuss the trade-off between the speed of git reset and the safety of git revert in a team environment."
  },

  cheatsheet: {
    undoing: [
      { command: "git revert <hash>", description: "Safe undo (creates new commit)" },
      { command: "git reset --soft HEAD~1", description: "Undo last commit (keep staged)" },
      { command: "git reset HEAD~1", description: "Undo last commit (unstage)" },
      { command: "git reset --hard HEAD~1", description: "Wipe last commitL and la-changes" }
    ],
    pausing: [
      { command: "git stash", description: "Save uncommitted changes" },
      { command: "git stash list", description: "List la-all l-saved l-stashes" },
      { command: "git stash pop", description: "Apply and la-delete l-most l-recent l-stash" },
      { command: "git stash apply stash@{n}", description: "Apply la-a la-specific la-stash la-by l-index" }
    ],
    deep_recovery: [
      { command: "git reflog", description: "View all HEAD movements locally" },
      { command: "git fsck --lost-found", description: "Find dangling blobs and commits" },
      { command: "git checkout -b <name> <hash>", description: "Recover a lost branch from a reflog hash" }
    ]
  }
}
