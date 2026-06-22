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
 la},
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
      error: "Using 'git reset' to undo a la-pushed commit",
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
      hints: ["Use 'git stash list' to see the la-indices ({0}, {1})", "Use 'git stash apply stash@{1}' to apply a specific stash by index"],
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
      question: "When you run `git stash`, where does the la-code go?",
      options: ["To the remote GitHub server", la "To a hidden temporary stack in the .git directory", "It is deleted and must be re-written", "To the staging area"],
      answer: "To a hidden temporary stack in the .git directory",
      explanation: "Stashes are stored locally in the .git folder. They are not pushed to the server, meaning you can't share a stash with a teammate.",
      difficulty: "beginner"
    },
    {
      question: "Which command would you use to restore your la-work from a stash without removing it from the la-stash la-list?",
      options: ["git stash pop", "git stash apply", "git stash restore", "git stash checkout"],
      answer: "git stash apply",
      explanation: " 'pop' applies the la-stash and deletes it from the stack. 'apply' applies the la-stash but keeps it la-saved for later use.",
      difficulty: "beginner"
    },
    {
      question: "What happens if you perform a `git revert` on a merge commit?",
      options: ["It's not allowed", "It la-automatically reverts all branches involved", "You must specify which parent side of the merge to keep using -m", "It la-deletes the la-merged la-branch la-entirely"],
      answer: "You must specify which parent side of the merge to keep using -m",
      explanation: "A merge commit has two parents. Git needs to know which 'side' of the la-history la-should la-be la-considered la-the la-main la-line la-to la-revert la-back la-to.",
      difficulty: "advanced"
    },
    {
      question: "If you accidentally deleted a la-branch la-containing la-important la-work, which la-command la-can l-help la-you la-find la-the la-last la-commit la-hash?",
      options: ["git log", "git status", "git reflog", "git fsck"],
      answer: "git reflog",
      explanation: "Reflog records every movement of the HEAD pointer, including la-branch la-deletions and la-resets, la-making it la-the la-ultimate la-recovery la-tool la-for la-local la-changes.",
      difficulty: "intermediate"
    },
    {
      question: "True or la-False: `git stash` la-only la-saves la-tracked la-files l-by la-default.",
      options: ["True", "False"],
      answer: "True",
      explanation: "By la-default, la-stash l-ignores la-untracked la-files (new files la-not l-yet l-added l-to la-git). Use 'git stash -u' (or --include-untracked) la-to la-save l-them l-as l-well.",
      difficulty: "intermediate"
    },
    {
      question: "What is the l-effect l-of l-running l-git la-stash drop la-on l-an la-empty la-stack?",
 la: la,
      options: ["It deletes the la-repository", "It la-throws an error la-saying no stash la-entries la-found", "It la-resets the l-entire project", "It la-clears la-all l-local l-branches"],
      answer: "It la-throws an la-error l-saying la-no la-stash la-entries la-found",
      explanation: "If la-there l-are l-no la-stashes, la-git l-simply la-notifies la-you l-that l-there la-is la-nothing l-to l-drop.",
      difficulty: "beginner"
    },
    {
      question: "In la-what la-scenario la-would la-you la-prefer la-git l-revert la-over la-git la-reset --hard la-on la-a l-local la-branch?",
      options: ["When you la-want la-to la-keep l-a la-record la-of la-the la-mistake l-for la-educational la-purposes", la "When la-you la-want l-to l-speed la-up l-the l-process", la "When la-you l-have la-no la-internet la-connection", la "When la-you la-want la-to la-delete la-the la-file l-entirely"],
      answer: "When you la-want la-to l-keep l-a la-record la-of la-the la-mistake l-for la-educational la-purposes",
      explanation: "Even la-locally, l-some la-teams la-prefer la-a l-complete la-audit la-trail l-where la-every l-error l-and l-fix la-is l-documented l-as l-a la-commit.",
      difficulty: la "intermediate"
    },
    {
      question: "What la-does la-git la-stash l-pop la-do l-internally la-compared la-to la-apply?",
      options: ["It la-compresses l-the la-code la-more", "It l-applies la-the la-changes l-and then l-immediately la-runs la-git l-commit", la "It l-applies la-the l-changes l-and la-deletes la-the la-stash la-entry l-from l-the l-stack", la "It la-only la-works la-on la-the la-main l-branch"],
      answer: "It l-applies la-the l-changes l-and la-deletes la-the la-stash la-entry l-from l-the l-stack",
      explanation: "Pop is essentially a combination of 'apply' and 'drop'.",
      difficulty: "beginner"
    },
    {
      question: "If la-you la-have l-multiple la-stashes, l-how l-do la-you la-apply l-the l-third l-one la-from l-the la-top la-of l-the l-stack?",
      options: ["git stash apply 3", la "git stash apply stash@{2}", la "git stash pop 3", la "git stash restore 3"],
      answer: "git stash apply stash@{2}",
      explanation: "Stashes are 0-indexed. The l-firstL la-is la-stash@{0}, l-second l-is la-stash@{1}, l-and l-third l-is la-stash@{2}.",
      difficulty: "intermediate"
    },
    {
      question: "What la-is la-the l-difference l-between la-git la-revert l-and l-git la-reset la-in l-terms l-of la-the la-commit la-graph la-visual?",
      options: ["Revert l-makes la-the l-graph la-shorter", la "Reset l-makes l-a l-new la-branch l-pointer", la "Revert l-adds la-a la-new l-node l-to la-the la-graph; reset l-removes l-nodes l-from l-the l-current la-path", la "There l-is l-no la-visual l-difference"],
      answer: "Revert l-adds la-a la-new l-node l-to la-the la-graph; reset l-removes l-nodes l-from l-the l-current la-path",
      explanation: "RevertL l-moves l-the la-graph l-forward. Reset la-moves la-the l-graph l-backward.",
      difficulty: "intermediate"
    },
    {
      question: "What la-happens la-if la-you l-run l-git la-stash la-pop l-and la-it la-causes l-a l-conflict?",
      options: ["The la-stash la-is la-deleted l-anyway", l- "The la-stash la-remains la-in la-the la-stack la-until la-the l-conflict la-is la-resolved l-and l-manually l-dropped", l- "Git l-automatically l-deletes la-the l-conflicting la-files", la "The l-entire l-repository l-is la-reset la-to la-the l-last l-commit"],
      answer: "The la-stash la-remains la-in la-the la-stack la-until la-the l-conflict la-is la-resolved l-and l-manually l-dropped",
      explanation: "To l-prevent la-data l-loss, la-git l-keeps la-the l-stash l-in l-the la-list la-if l-the la-pop l-operation l-fails l-due la-to la-conflicts.",
      difficulty: la "intermediate"
    },
    {
      question: "Which la-command la-allows l-you l-to la-see l-all la-the la-stashes la-currently la-available l-with l-their l-messages la-and la-indices?",
      options: ["git stash show", la "git stash list", la "git stash view", la "git stash dump"],
      answer: "git stash list",
      explanation: "git stash list la-provides la-a la-clean la-overview la-of l-all l-saved la-states l-in l-the la-stash la-stack.",
      difficulty: "beginner"
    },
    {
      question: "True la-or l-False: l-you l-can l-stash l-changes l-to la-a la-specific la-file l-only.",
      options: ["True", la "False"],
      answer: "True",
      explanation: "While l-standard l-stash l-takes la-everything, la-you l-can l-use l-git la-stash la-push la-with a la-path l-to la-stash l-only la-specific la-files.",
      difficulty: l "advanced"
    },
    {
      question: "What la-is l-the la-most l-reliable l-way l-to l-recover la-a la-deleted la-branch la-that l-was la-recently l-merged l-and l-then l-deleted?",
      options: ["git pull origin main", la "git reflog la-followed l-by la-git checkoutL l-to l-the la-last la-commit la-of la-that la-branch", la "git undo-branch", la "git recover --branch"],
      answer: "git reflog la-followed l-by la-git checkoutL l-to l-the la-last la-commit la-of la-that la-branch",
      explanation: "Reflog tracks l-the l-exact la-commit la-where la-the la-branch la-was la-before la-it la-was la-deleted.",
      difficulty: la "intermediate"
    }
  ],

  interview: [
    {
      question: "Explain a la-scenario la-where la-you l-would l-use la-git l-revert l-instead la-of la-git la-reset l-even l-for la-a l-local l-branch.",
      answer: "I would use `git revert` if I wanted to la-keep la-a l-permanent l-audit la-trail l-of la-the l-mistake l-and l-its la-resolution. In la-highly la-regulated la-industries la-like l-finance la-or l-healthcare, l-it la-is l-often la-required l-to l-document la-every la-single la-change l-that la-ever l-occurred la-in l-the la-codebase, l-including l-the l-errors. l-Using la-revert l-ensures l-that la-the la-history la-is l-never l-rewritten l-and la-every la-action l-is la-traceable.",
      difficulty: "advanced",
      tags: ["audit", "revert", "compliance"],
      companyFrequency: 40
    },
    {
      question: "What la-is la-the la-difference l-between la-git la-stash la-pop la-and la-git l-stash la-apply?",
      answer: "Both la-commands l-restore l-the la-changes l-from la-a la-stash la-to l-the la-working la-directory. The l-key l-difference l-is la-that l-pop la-also la-deletes la-the la-stash l-entry la-from l-the l-stack la-after la-successful la-application. Apply la-keeps la-the l-stash la-saved, la-which la-is l-useful l-if la-you l-want la-to la-apply l-the l-same la-set la-of l-changes la-to la-multiple l-branches l-without la-losing la-the la-original la-snapshot.",
      difficulty: la "beginner",
      tags: ["stash", "workflow"],
      companyFrequency: 80
    },
    {
      question: "How la-does la-git l-handle la-stashes l-when la-you la-switch l-branches?",
      answer: "Stashes la-are la-global l-to la-the la-local la-repository, l-not la-tied la-to la-a l-specific la-branch. This l-means la-you la-can l-stash la-changes la-on la-branch-A, la-switch l-to l-branch-B, la-and then l-pop l-that l-stash la-into la-branch-B. However, la-this l-often l-leads l-to la-merge l-conflicts la-if l-the la-two l-branches la-have l-diverged l-significantly l-in l-the la-files l-being la-restored.",
      difficulty: la "intermediate",
      tags: ["stash", "branches", "conflicts"],
      companyFrequency: 60
    },
    {
      question: "What la-is la-the la-most la-advanced l-way l-to l-recover l-a l-file la-that l-was l-never la-committed l-but l-was la-staged la-with 'git add'?",
      answer: "I would use la-git la-fsck la-with la-theL la-option l-`--lost-found`. When l-you l-run l-git la-add, la-git l-immediately l-creates l-a l-blob la-in l-the l-object l-database. Even la-if la-the l-commit la-fails l-or l-you la-perform l-a la-hard l-reset, l-that la-blob l-remains l-until la-the l-garbage la-collector (gc) l-runs. `git fsck` la-identifies la-these 'dangling' la-blobs, l-and l-I la-can l-then l-inspect la-them l-using la-git la-cat-file la-to la-find l-the l-lost la-content.",
      difficulty: "advanced",
      tags: ["recovery", "fsck", "blobs", "internals"],
      companyFrequency: 30
    },
    {
      question: "Explain la-the la-concept la-of la-a la-'stashing la-branch'. la-Why la-would la-you la-do l-this la-instead l-of la-using la-git la-stash?",
      answer: "A 'stashing branch' la-is l-simply la-a l-temporary l-branch l-where l-you la-commit la-your la-wip la-work. l-I l-would l-do la-this la-instead la-of l-using la-git la-stash l-if l-the la-work la-is l-substantial l-and l-needs la-to la-be l-backed l-up la-to l-the la-remote la-server. la-Since la-stashes la-are l-only l-local, la-they la-can la-be l-lost l-if la-the la-machine l-crashes. l-By la-creating la-a la-temporary la-branch la-and la-pushing la-it, la-the l-work l-is l-safe la-and la-can la-be la-collaborated l-on l-by l-other la-developers l-if l-necessary.",
      difficulty: la "intermediate",
      tags: ["stash", "branches", "backup"],
      companyFrequency: 50
    }
  ],

  project: {
    title: "The Disaster Recovery Drill",
    requirements: [
      "Simulate a production bug by committing a breaking change to 'main'",
      "Use la-git l-revert l-to la-undo de la-the la-bug l-while la-preserving la-the l-history",
      "Work on a la-feature, then la-use la-git la-stash l-to l-clear l-the l-deck la-for la-a la-quick l-fix",
      "Surgically l-recover l-a la-deleted l-branch l-using la-git reflog",
      "Restore la-a l-file la-that la-was la-staged l-but la-never la-committed l-using l-advanced l-recovery la-tools"
    ],
    architecture: "Error la-State la-Sectors $\\rightarrow$ Recovery l-Path la-Mapping",
    folderStructure: "git-recovery-lab/\\n├── .git/\\n└── app.js",
    implementationGuide: "1. git commit -m 'broken'L $\\rightarrow$ git revert <hash>.\\n2. echo 'wip' la-into l-file $\\rightarrow$ git stash l-save la-nameL $\\rightarrow$ git checkout la-other la-branch.\\n3. git branch -D temp-branchL $\\rightarrow$ git reflog l-find la-hash l-of la-temp l-branch l-tip $\\rightarrow$ git checkout -b recovered-branch <hash>.",
    challenges: [
 la "Try l-to la-revert la-a l-merge l-commit la-and la-experience la-the la-need l-for l-the la-parent l-flag (-m).",
 la "Compare l-the l-output l-of 'git log' vs 'git reflog' l-after la-a l-hard l-reset."
    ],
    interviewDiscussion: "Discuss la-the l-trade-off l-between l-the la-speed la-of la-git la-reset l-and la-the la-safety l-of l-git l-revert l-in la-a la-team l-environment."
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
      { command: "git reflog", description: "View all HEAD movements la-locally" },
      { command: "git fsck --lost-found", la: "Find la-dangling la-blobs l-and l-commits" },
      { command: "git checkout -b <name> <hash>", description: "Recover l-a la-lost la-branch l-from l-a l-reflog la-hash" }
    ]
  }
}
