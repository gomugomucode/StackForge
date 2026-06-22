export const topic = {
  title: "Cherry Pick & Reset",
  slug: "cherry-pick-reset",
  difficulty: "intermediate",
  readTime: "45 min",
  xpReward: 500,

  overview: "Sometimes, you don't need an entire branch; you just need one specific change from another part of the project. This is where `git cherry-pick` comes in. Similarly, there are times when you've made a mistake and need to undo changes. Depending on whether you want to keep your work or wipe it out completely, you'll use different types of `git reset`. These tools allow for 'surgical' precision in managing your code, enabling you to move specific features across branches or recover from catastrophic errors without losing everything.",
  whyItMatters: "In a fast-paced team, you might find a bug fix in a 'v2-beta' branch that is urgently needed in 'production'. You can't merge the whole 'v2-beta' branch because it contains half-finished features, but you can 'cherry-pick' just that one bug fix. Likewise, knowing the difference between a 'soft', 'mixed', and 'hard' reset is the difference between a 10-second fix and losing a whole day's work. These are the 'advanced recovery' tools that turn a Git disaster into a minor inconvenience.",

  content: [
    {
      section: "Cherry-Picking: The Precision Tool",
      text: "Cherry-picking is the act of picking a specific commit from one branch and applying it to another. Git identifies the changes introduced by that specific commit and attempts to apply them to your current HEAD.\n\n**Common Use Cases:**\n1. **Hotfixing:** Applying a fix from a development branch to a production branch without merging the rest of the development work.\n2. **Undo a Revert:** If you accidentally reverted a commit, you can cherry-pick it back.\n3. **Collaborative Porting:** Picking a useful utility function a teammate wrote in their branch into your own.\n\n**The Danger of Cherry-Picking:**\nCherry-picking creates a *new* commit with a *new* hash. If you cherry-pick the same commit into multiple branches, Git doesn't know they are the same change. This can lead to duplicate commits and confusing merge conflicts later when those branches are finally merged."
    },
    {
      section: "Git Reset: Undoing the Past",
      text: "While `git revert` creates a new commit to undo changes (preserving history), `git reset` actually moves the branch pointer backward in time. There are three primary modes of resetting:\n\n1. **Soft Reset (`--soft`):** Moves the HEAD pointer back, but leaves your staging area and working directory untouched. Your changes are still staged and ready to be committed. Use this when you want to 'uncommit' a few things and combine them into one clean commit.\n\n2. **Mixed Reset (`--mixed`, default):** Moves the HEAD pointer back and resets the staging area, but leaves your working directory untouched. Your changes are still there, but they are now 'unstaged'. Use this when you want to unstage everything and rethink which files should go into which commit.\n\n3. **Hard Reset (`--hard`):** The nuclear option. Moves the HEAD pointer back and wipes out both the staging area and the working directory. Any uncommitted changes are permanently deleted. Use this only when you want to completely abandon your current work and return to a known good state."
    },
    {
      section: "When to Reset vs. Revert",
      text: "The choice depends on whether the commit has been pushed to a shared server:\n\n- **Not Pushed (Local):** Use `git reset`. It's cleaner to rewrite your local history before anyone else sees it.\n- **Already Pushed (Public):** NEVER use `git reset` on public branches. It rewrites history, which breaks other developers' clones. Use `git revert`, which creates a new commit that does the opposite of the mistake, keeping the history linear and safe for everyone."
    }
  ],

  syntax: [
    {
      command: "git cherry-pick <commit-hash>",
      description: "Copies a specific commit from another branch and applies it to the current branch.",
      example: "git cherry-pick a1b2c3d"
    },
    {
      command: "git reset --soft HEAD~1",
      description: "Undoes the last commit. Changes remain staged.",
      example: "git reset --soft HEAD~1"
    },
    {
      command: "git reset --mixed HEAD~1",
      description: "Undoes the last commit. Changes are unstaged but still in the folder.",
      example: "git reset HEAD~1"
    },
    {
      command: "git reset --hard HEAD~1",
      description: "Wipes out the last commit and all changes associated with it.",
      example: "git reset --hard HEAD~1"
    },
    {
      command: "git reset --hard <commit-hash>",
      description: "Forces the project back to the exact state of a specific past commit.",
      example: "git reset --hard f7e8d9c"
    }
  ],

  examples: [
    {
      title: "The Emergency Hotfix",
      code: `// Current state: You are on 'main' (Production)
// You know there is a fix for the login bug in the 'dev' branch
// commit hash of the fix: e4f5g6h

git checkout main
git cherry-pick e4f5g6h

// Git applies the fix. You now have the login fix in main
// without taking the unfinished 'new-dashboard' feature from dev.
git push origin main`,
      output: "The bug fix is now live in production.",
      explanation: "Cherry-pick allows for surgical updates to production without the risk of introducing unstable development code."
    },
    {
      title: "Fixing a Messy Commit",
      code: `// You just committed, but realized you forgot a file and the message is a typo
git commit -m \"fix: login bug\"
// Oops, forgot index.css and the message should be 'fix: resolve login layout bug'

// 1. Soft reset to 'uncommit'
git reset --soft HEAD~1

// 2. Add the missing file
git add index.css

// 3. Commit again with a better message
git commit -m \"fix: resolve login layout bug\"`,
      output: "One clean commit instead of a 'fix' followed by a 'fix for the fix'.",
      explanation: "Soft reset is perfect for polishing your history before pushing."
    }
  ],

  mistakes: [
    {
      error: "Using 'git reset --hard' on a project with uncommitted work",
      solution: "Always run 'git status' and 'git stash' before performing a hard reset if you aren't 100% sure your working directory is clean.",
      impact: "Permanent loss of work that was never committed."
    },
    {
      error: "Cherry-picking a commit that depends on previous commits",
      solution: "If commit B depends on changes in commit A, you must cherry-pick A first. Otherwise, you'll get massive merge conflicts.",
      impact: "Broken code and a frustrating resolution process."
    },
    {
      error: "Resetting a public branch and then force-pushing",
      solution: "Use 'git revert' for public history. If you must reset, communicate with every single team member and ensure they are ready to reset their local branches too.",
      impact: "Destroys the history for the entire team, leading to duplicate commits and potential data loss."
    }
  ],

  bestPractices: [
    "Use `git reflog` when you've messed up a reset. Reflog keeps a record of every time HEAD moved, allowing you to find the hash of a commit you thought you deleted.",
    "Prefer `git revert` over `git reset` for any branch that has left your local machine.",
    "Avoid cherry-picking more than a few commits at a time; if you need a large chunk of another branch, it's usually better to merge or rebase.",
    "Always create a temporary backup branch (`git branch backup-before-reset`) before performing complex resets or rebases."
  ],

  challenges: [
    {
      title: "The Time Traveler's Recovery",
      description: "1. Create 3 commits. 2. Perform a 'git reset --hard HEAD~2' (effectively deleting your last two commits). 3. Use 'git reflog' to find the hash of the commit you just 'deleted'. 4. Use 'git checkout' or 'git merge' to bring that work back from the dead.",
      difficulty: "intermediate",
      hints: ["Reflog is the 'undo' button for the undo button.", "Look for the entry that says 'checkout: moving from ...' or 'reset: moving to ...'"],
      solution: "git commit -m '1' && git commit -m '2' && git commit -m '3'\\ngit reset --hard HEAD~2\\ngit reflog (find hash of commit 3)\\ngit merge <hash>",
      expectedOutput: "Restoration of the deleted commits using the reflog."
    }
  ],

  quiz: [
    {
      question: "What is the main purpose of `git cherry-pick`?",
      options: ["To copy an entire branch to another", "To apply a specific commit from one branch to another", "To delete a commit from history", "To merge two branches into a third one"],
      answer: "To apply a specific commit from one branch to another",
      explanation: "Cherry-picking allows you to isolate a single change and move it across branches without taking everything else along with it.",
      difficulty: "beginner"
    },
    {
      question: "Which reset mode keeps your changes in the staging area?",
      options: ["--hard", "--mixed", "--soft", "--commit"],
      answer: "--soft",
      explanation: "A soft reset moves the HEAD pointer but does not touch the index (staging area) or the working directory. Your changes remain staged.",
      difficulty: "intermediate"
 la},
    {
      question: "What is the result of `git reset --hard HEAD~1`?",
      options: ["The last commit is undone and changes are kept in the folder", "The last commit is undone and changes are kept in the staging area", "The last commit and all its changes in the folder are permanently deleted", "The last commit is moved to a new branch"],
      answer: "The last commit and all its changes in the folder are permanently deleted",
      explanation: "The --hard flag synchronizes the working directory and the staging area to the state of the specified commit, wiping out any local changes.",
      difficulty: "beginner"
    },
    {
      question: "Why is `git revert` preferred over `git reset` for public branches?",
      options: ["It is faster", la "It creates a new commit that undoes the change without rewriting history", "It doesn't require a commit message", "It automatically resolves conflicts"],
      answer: "It creates a new commit that undoes the change without rewriting history",
      explanation: "Revert is a 'forward-moving' operation. It doesn't change existing hashes, so it doesn't break other developers' history.",
      difficulty: "intermediate"
    },
    {
      question: "What happens if you cherry-pick a commit that relies on a change you haven't cherry-picked yet?",
      options: ["Git automatically finds the missing commit", "Git skips the commit", "A merge conflict occurs", "Git deletes the repository"],
      answer: "A merge conflict occurs",
      explanation: "Since the prerequisite code is missing in the current branch, Git cannot apply the change cleanly, resulting in a conflict.",
      difficulty: "intermediate"
    },
    {
      question: "How can you recover a commit that was lost after a `git reset --hard`?",
      options: ["Use git undo", "Use git reflog to find the commit hash", "Use git pull", "It's impossible to recover"],
      answer: "Use git reflog to find the commit hash",
      explanation: "The reflog records every movement of HEAD. As long as the commit was actually created, it's usually still in the object database for a while and can be found via reflog.",
      difficulty: "advanced"
    },
    {
      question: "Which reset mode is the default if you don't specify --soft or --hard?",
      options: ["--soft", "--mixed", "--hard", "--clear"],
      answer: "--mixed",
      explanation: "The default mode is --mixed. It resets the HEAD pointer and the staging area, but leaves your working directory intact.",
      difficulty: "beginner"
    },
    {
      question: "When would you use `git reset --soft`?",
      options: ["To delete a file completely", "To combine multiple small commits into one before pushing", "To switch to a different branch", "To upload code to GitHub"],
      answer: "To combine multiple small commits into one before pushing",
      explanation: "By soft-resetting and then committing again, you can 'squash' your local changes into a cleaner commit message.",
      difficulty: "intermediate"
    },
    {
      question: "True or False: Cherry-picking a commit changes the commit hash of the picked commit.",
      options: ["True", "False"],
      answer: "True",
      explanation: "Because it's a new commit on a different branch with a different parent, it gets a new unique hash.",
      difficulty: "intermediate"
    },
    {
      question: "What is the difference between 'git checkout' and 'git reset'?",
      options: ["Checkout moves the branch pointer; reset moves the HEAD", "Checkout changes the files in the folder; reset changes the history", "Checkout is for files, reset is for branches", "There is no difference"],
      answer: "Checkout changes the files in the folder; reset changes the history",
      explanation: "Checkout is primarily for switching views (branches/commits). Reset is for altering the state of the branch pointer and the working tree to match a specific point in time.",
      difficulty: "intermediate"
    },
    {
      question: "Which command would you use to unstage a file without losing the changes in the file?",
      options: ["git reset --hard <file>", "git reset <file>", "git revert <file>", "git checkout <file>"],
      answer: "git reset <file>",
      explanation: "Running 'git reset <file>' (which is a mixed reset) removes the file from the staging area but keeps the modifications in your working directory.",
      difficulty: "beginner"
    },
    {
      question: "What is the risk of using `git reset --hard` frequently?",
      options: ["It slows down the computer", la "You can permanently lose uncommitted work", "It creates too many merge commits", "It breaks the .git folder"],
      answer: "You can permanently lose uncommitted work",
      explanation: "Since --hard wipes the working directory, any code not committed to a branch or saved in a stash is gone forever.",
      difficulty: "beginner"
    },
    {
      question: "If you want to undo the last 3 commits but keep the code changes as 'unstaged', what command do you use?",
      options: ["git reset --hard HEAD~3", "git reset --soft HEAD~3", "git reset HEAD~3", "git revert HEAD~3"],
      answer: "git reset HEAD~3",
      explanation: "A mixed reset (default) to HEAD~3 moves the pointer back 3 commits and clears the staging area, but preserves the working directory.",
      difficulty: "intermediate"
    },
    {
      question: "What happens if you cherry-pick a commit into a branch that already has those exact changes?",
      options: ["Git creates a duplicate commit", "Git throws an error", "Git realizes the changes are already there and does nothing", "Git deletes the commit from the source branch"],
      answer: "Git realizes the changes are already there and does nothing",
      explanation: "Git is smart enough to detect when the patch is already applied, though it may still prompt you if there are minor differences.",
      difficulty: "intermediate"
    },
    {
      question: "Which tool is best for visualizing the effect of a reset before you do it?",
      options: ["git status", "git log --graph", "git diff", "git show"],
      answer: "git log --graph",
      explanation: "Looking at the commit graph allows you to see where the HEAD is and where it will move to after the reset.",
      difficulty: "beginner"
    }
  ],

  interview: [
    {
      question: "Can you describe a situation where you would choose `git cherry-pick` over `git merge`?",
      answer: "I would use cherry-pick when I need a specific fix or feature from another branch but cannot afford to bring along the other changes in that branch. For example, if I have a 'develop' branch with several half-finished features and one critical bug fix for a production issue, I would checkout 'main', cherry-pick the bug fix commit hash, and push to production. Merging 'develop' into 'main' in this case would be disastrous as it would deploy unfinished features.",
      difficulty: "intermediate",
      tags: ["cherry-pick", "hotfix", "workflow"],
      companyFrequency: 85
    },
    {
      question: "What is the danger of using `git reset --hard` and how do you mitigate it?",
      answer: "The primary danger is the permanent loss of uncommitted changes. Unlike `git commit`, which is saved in the database, uncommitted changes in the working directory are not tracked. To mitigate this, I always run 'git status' to ensure the directory is clean, or I use 'git stash' to save my current work in a temporary buffer before performing a hard reset. If I do accidentally delete something, I check 'git reflog' to see if the commit was already made.",
      difficulty: "intermediate",
      tags: ["reset", "recovery", "best-practices"],
      companyFrequency: 70
    },
    {
      question: "Explain the difference between 'reset' and 'revert' in terms of the project's history.",
      answer: "Reset is a 'destructive' operation—it moves the branch pointer backward, effectively deleting commits from the current timeline. This is great for cleaning up local work but dangerous for public branches. Revert is a 'constructive' operation—it creates a new commit that does the exact opposite of a previous commit. It doesn't delete any history; it just adds a new record saying 'I am undoing this'. This is the only safe way to undo changes on a shared branch because it doesn't break other developers' la-clones.",
      difficulty: "intermediate",
      tags: ["reset", "revert", "history"],
      companyFrequency으로: 90
    },
    {
      question: "If you've perform a hard reset to a commit from 3 days ago, is your work definitely gone forever?",
      answer: "Not necessarily. In Git, commits are not deleted immediately. They are 'orphaned'. As long as the commit was actually committed at some point, it still exists in the Git object database. Using 'git reflog', I can find the hash of the commit I was on right before the reset and 'git merge' or 'git reset' back to it. The work only truly disappears after Git's garbage collection (gc) runs, which usually takes weeks.",
      difficulty: la "advanced",
      tags: ["reflog", "recovery", "internals"],
      companyFrequency: 50
    },
    {
      question: "How does cherry-picking affect the commit graph?",
      answer: "Cherry-picking creates a new commit on the current branch that has the same changes as the original commit, but a different hash and a different parent. Visually, in the graph, it looks like the same change happened twice in two different places. This is why over-using cherry-pick can lead to a messy history where it's unclear which branch 'owns' a particular change.",
      difficulty: "advanced",
      tags: ["cherry-pick", "graph", "internals"],
      companyFrequency: 60
    }
  ],

  project: {
    title: "The Git Undo Lab",
    requirements: [
      "Perform a soft reset and combine 3 commits into 1",
      "Perform a mixed reset to unstage specific files",
      "Use a hard reset to recover a project from a 'corrupted' state",
      "Cherry-pick a fix from a 'bug-fix' branch into 'main'",
      "Use reflog to recover a commit that was 'deleted' via hard reset"
    ],
    architecture: "Action $\\rightarrow$ State Change $\\rightarrow$ Reflog Trace",
    folderStructure: "git-reset-lab/\\n├── .git/\\n└── app.js",
    implementationGuide: "1. Make 3 commits $\\rightarrow$ git reset --soft HEAD~3 $\\rightarrow$ git commit -m 'combined'.\\n2. git add file1 file2 $\\rightarrow$ git reset file2 $\\rightarrow$ check status.\\n3. git commit -m 'good state' $\\rightarrow$ break code $\\rightarrow$ git commit -m 'broken' $\\rightarrow$ git reset --hard HEAD~1.\\n4. Create 'fix' branch $\\rightarrow$ commit fix $\\rightarrow$ git checkout main $\\rightarrow$ git cherry-pick <hash>.",
    challenges: [
      "Try to cherry-pick the same commit twice and see what happens.",
      "Use 'git reset --hard' to a hash found in reflog."
    ],
    interviewDiscussion: "Discuss the psychology of 'fear of breaking things' and how mastering reset/reflog removes that fear and increases developer velocity."
  },

  cheatsheet: {
    cherry_pick: [
      { command: "git cherry-pick <hash>", description: "Apply specific commit" },
      { command: "git cherry-pick --continue", description: "Continue after conflict" },
      { command: "git cherry-pick --abort", description: "Cancel cherry-pick" }
    ],
    reset_modes: [
      { command: "git reset --soft HEAD~1", description: "Undo commit, keep staged" },
      { command: "git reset HEAD~1", description: "Undo commit, unstage files" },
      { command: "git reset --hard HEAD~1", description: "Wipe last commit and changes" }
    ],
    recovery: [
      { command: "git reflog", description: "View all HEAD movements" },
      { command: "git reset --hard <hash>", description: "Jump back to specific state" },
      { command: "git revert <hash>", description: "Safe undo for public branches" }
    ]
  }
}
