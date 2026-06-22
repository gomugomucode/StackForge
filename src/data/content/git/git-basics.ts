export const topic = {
  title: "Git Basics & Installation",
  slug: "git-basics",
  difficulty: "beginner",
  readTime: "45 min",
  xpReward: 400,

  overview: "Git is more than just a tool for saving versions of your code; it is a distributed version control system (DVCS) that allows multiple developers to collaborate on a project without stepping on each other's toes. Unlike older systems that tracked changes by comparing files (diffs), Git thinks of its data as a series of snapshots of a miniature filesystem. Every time you commit, Git takes a picture of what all your files look like at that moment and stores a reference to that snapshot.",
  whyItMatters: "In a professional environment, you will never work on a project alone in a single branch. You will face merge conflicts, need to roll back breaking changes, and collaborate across time zones. Without a deep understanding of Git basics—not just the commands, but the underlying model of the 'staging area' and 'repository'—you will spend more time fighting your tools than writing code. Mastering Git is the difference between a junior who 'just pushes code' and a senior who manages a codebase's history with precision.",

  content: [
    {
      section: "What is Version Control?",
      text: "Version control is the practice of tracking and managing changes to software code. Imagine you are writing a complex piece of software. You make a change that breaks everything, but you don't remember exactly what you changed. Without version control, you'd be manually undoing changes or hoping you had a backup folder named 'project_final_v2_fixed_REALLY_FINAL'.\n\nThere are two main types of version control systems:\n\n1. **Centralized Version Control Systems (CVCS):** Systems like Subversion (SVN) or Perforce. These have a single central server that contains all the versioned files. If the server goes down, nobody can collaborate or save versions of their work.\n\n2. **Distributed Version Control Systems (DVCS):** This is where Git shines. In Git, every developer has a full copy of the entire project history on their local machine. You don't need a connection to a server to commit changes, view history, or create branches. The server (like GitHub or GitLab) is simply a common point of exchange."
    },
    {
      section: "The Three States of Git",
      text: "To understand Git, you must understand the three main areas where your files can reside. This is the most common point of confusion for beginners.\n\n1. **The Working Directory:** This is where you are currently editing your files. It's the actual folder on your disk. Changes here are 'untracked' or 'modified' and are not yet part of the Git history.\n\n2. **The Staging Area (The Index):** This is a unique Git concept. Think of it as a 'draft' for your next commit. When you run `git add`, you are telling Git: 'I want this specific change to be part of my next snapshot.' This allows you to selectively commit changes. For example, if you fixed a bug and added a new feature in the same file, you can stage only the bug fix and commit it separately for a cleaner history.\n\n3. **The Git Directory (Repository):** When you run `git commit`, Git takes everything in the staging area and permanently stores it as a snapshot in the `.git` folder. This is your source of truth."
    },
    {
      section: "The Git Snapshot Model",
      text: "Most other version control systems store data as a list of changes (deltas) from the first version. Git does things differently. Every time you commit, Git creates a snapshot of your files. If a file has not changed, Git doesn't store it again; it simply stores a link to the previous identical file. This makes Git incredibly fast for branching and merging because it's just moving pointers between snapshots rather than calculating complex diffs across thousands of lines of code."
    }
  ],

  syntax: [
    {
      command: "git init",
      description: "Initializes a new Git repository in the current directory. Creates the hidden .git folder.",
      example: "mkdir my-project && cd my-project && git init"
    },
    {
      command: "git clone <url>",
      description: "Copies an existing repository from a remote server (like GitHub) to your local machine.",
      example: "git clone https://github.com/user/repo.git"
    },
    {
      command: "git add <file>",
      description: "Adds a specific file to the staging area.",
      example: "git add index.html"
    },
    {
      command: "git add .",
      description: "Adds all modified and new files in the current directory to the staging area.",
      example: "git add ."
    },
    {
      command: "git commit -m \"message\"",
      description: "Saves the staged snapshot to the repository with a descriptive message.",
      example: "git commit -m \"feat: implement user authentication\""
    },
    {
      command: "git status",
      description: "Shows the state of the working directory and staging area.",
      example: "git status"
    },
    {
      command: "git log",
      description: "Shows the commit history for the current branch.",
      example: "git log --oneline"
    }
  ],

  examples: [
    {
      title: "The Basic Workflow Cycle",
      code: `// 1. Start a project
git init

// 2. Create a file
echo \"# My Project\" > README.md

// 3. Check status (File is untracked)
git status

// 4. Stage the file (Move to Staging Area)
git add README.md

// 5. Commit the change (Move to Repository)
git commit -m \"Initial commit: add readme\"

// 6. Modify the file
echo \"Version 1.0\" >> README.md

// 7. Stage and Commit again
git add .
git commit -m \"docs: update version in readme\"`,
      output: "Commits are now stored in the .git folder as snapshots.",
      explanation: "This sequence demonstrates the flow: Working Directory $\\rightarrow$ Staging Area $\\rightarrow$ Local Repository."
    }
  ],

  mistakes: [
    {
      error: "Committing everything with 'git add .'",
      solution: "Be intentional. Use 'git add <file>' to stage only what belongs in that specific commit. This makes your history easier to read and 'git revert' safer.",
      impact: "Pollutes the commit history with unrelated changes, making debugging harder."
    },
    {
      error: "Writing vague commit messages like 'fixed bug' or 'updates'",
      solution: "Use a convention like Conventional Commits (e.g., 'feat: add login', 'fix: resolve memory leak'). Describe the 'why' not the 'what'.",
      impact: "Future developers (and your future self) will have no idea why a change was made."
    },
    {
      error: "Forgetting to configure user name and email",
      solution: "Run 'git config --global user.name \"Your Name\"' and 'git config --global user.email \"email@example.com\"' immediately after installation.",
      impact: "Commits will be attributed to generic system users or fail during the commit process."
    }
  ],

  bestPractices: [
    "Atomic Commits: Each commit should do one thing. If you're fixing a bug and refactoring a function, do them in two separate commits.",
    "Commit Early, Commit Often: Small commits are easier to review, test, and revert than one giant commit containing 50 changes.",
    "Use .gitignore: Never commit node_modules, .env files, or build artifacts. Create a .gitignore file to exclude these automatically.",
    "Read the Log: Regularly use 'git log --oneline --graph' to understand the shape of your project's history."
  ],

  challenges: [
    {
      title: "The Snapshot Simulation",
      description: "Create a directory, initialize git, and create three files (A, B, C). Stage only A and B, then commit. Create a change in B and a new file D. Stage only B and commit. Now use 'git log' and 'git checkout' to see how Git preserves the different snapshots of file B.",
      difficulty: "beginner",
      hints: ["Use 'git checkout <commit-hash> -- <file>' to restore a specific file from a past commit"],
      solution: "1. git init\\n2. touch A B C\\n3. git add A B && git commit -m 'first'\\n4. echo 'change' >> B && touch D\\n5. git add B && git commit -m 'second'\\n6. git checkout <hash1> B",
      expectedOutput: "File B should revert to its original state from the first commit."
    }
  ],

  quiz: [
    {
      question: "Which of the following is the correct order of the Git workflow?",
      options: ["Repository $\\rightarrow$ Staging $\\rightarrow$ Working Directory", "Working Directory $\\rightarrow$ Repository $\\rightarrow$ Staging", "Working Directory $\\rightarrow$ Staging $\\rightarrow$ Repository", "Staging $\\rightarrow$ Working Directory $\\rightarrow$ Repository"],
      answer: "Working Directory $\\rightarrow$ Staging $\\rightarrow$ Repository",
      explanation: "You edit files in the working directory, add them to the staging area (index), and then commit them to the repository history.",
      difficulty: "beginner"
    },
    {
      question: "What does 'git init' actually do?",
      options: ["Creates a new folder on GitHub", "Initializes a local .git directory to track changes", "Clones a remote repository", "Sets up the global user configuration"],
      answer: "Initializes a local .git directory to track changes",
      explanation: "git init creates the hidden .git folder in your project root, which stores all metadata, object databases, and history.",
      difficulty: "beginner"
    },
    {
      question: "How does Git differ from Centralized Version Control (CVCS)?",
      options: ["Git is faster", "Git requires a constant internet connection", "Git provides every developer with a full copy of the repository", "Git cannot handle binary files"],
      answer: "Git provides every developer with a full copy of the repository",
      explanation: "Git is a Distributed VCS. Every local clone is a full backup of the project history, unlike CVCS where the server holds the only history.",
      difficulty: "intermediate"
    },
    {
      question: "What is the purpose of the 'Staging Area'?",
      options: ["To backup files to the cloud", "To allow selective committing of changes", "To speed up the commit process", "To store deleted files"],
      answer: "To allow selective committing of changes",
      explanation: "The staging area (index) allows you to carefully curate what goes into the next commit, separating unrelated changes into different commits.",
      difficulty: "beginner"
    },
    {
      question: "If you run 'git add .', what happens?",
      options: ["The entire project is committed to the database", "All modified and untracked files are moved to the staging area", "The current branch is merged into main", "The .git folder is deleted"],
      answer: "All modified and untracked files are moved to the staging area",
      explanation: "The dot (.) represents the current directory and all subdirectories. 'git add .' stages everything in that path.",
      difficulty: "beginner"
    },
    {
      question: "Which command would you use to see a simplified, one-line history of commits?",
      options: ["git status", "git show", "git log --oneline", "git diff"],
      answer: "git log --oneline",
      explanation: "The --oneline flag compresses the commit hash and message into a single line for a quick overview.",
      difficulty: "beginner"
    },
    {
      question: "What is a 'snapshot' in Git?",
      options: ["A compressed zip file of the project", "A record of only the changes made to a file", "A reference to the state of all files at a specific point in time", "A backup of the .git folder"],
      answer: "A reference to the state of all files at a specific point in time",
      explanation: "Instead of storing diffs, Git stores snapshots. If a file hasn't changed, it just points to the previous version.",
      difficulty: "intermediate"
    },
    {
      question: "What happens if you try to commit without adding any files to the staging area?",
      options: ["Git commits all files automatically", "Git throws an error saying there is nothing to commit", "Git creates an empty commit", "Git deletes the last commit"],
      answer: "Git throws an error saying there is nothing to commit",
      explanation: "You must 'add' changes to the index before they can be 'committed' to the repository.",
      difficulty: "beginner"
    },
    {
      question: "How do you identify which files are currently tracked but modified?",
      options: ["git commit", "git log", "git status", "git add"],
      answer: "git status",
      explanation: "git status lists untracked files, modified files (not yet staged), and staged changes.",
      difficulty: "beginner"
    },
    {
      question: "What is the correct command to copy a remote repository to your local machine?",
      options: ["git init", "git pull", "git push", "git clone"],
      answer: "git clone",
      explanation: "git clone downloads the entire repository and its history from a remote URL to your local disk.",
      difficulty: "beginner"
    },
    {
      question: "True or False: Git requires an internet connection to perform a commit.",
      options: ["True", "False"],
      answer: "False",
      explanation: "Since Git is distributed, commits are local operations. You only need the internet to push to or pull from a remote server.",
      difficulty: "intermediate"
    },
    {
      question: "What does the '-m' flag in 'git commit -m' stand for?",
      options: ["Main", "Move", "Message", "Modify"],
      answer: "Message",
      explanation: "The -m flag allows you to provide the commit message directly in the command line instead of opening a text editor.",
      difficulty: "beginner"
    },
    {
      question: "What is the hidden directory where Git stores all its metadata?",
      options: [".git", ".svn", ".hg", ".config"],
      answer: ".git",
      explanation: "The .git folder contains the object database, refs, and configuration for the repository.",
      difficulty: "beginner"
    },
    {
      question: "Which of these is a Distributed Version Control System?",
      options: ["SVN", "Perforce", "Git", "CVS"],
      answer: "Git",
      explanation: "Git is the most popular DVCS, where every user has a full copy of the repository.",
      difficulty: "beginner"
    },
    {
      question: "If you make a mistake in a file and want to see exactly what changed before staging, which command is best?",
      options: ["git status", "git log", "git diff", "git commit"],
      answer: "git diff",
      explanation: "git diff shows the differences between the working directory and the staging area.",
      difficulty: "intermediate"
    }
  ],

  interview: [
    {
      question: "Can you explain the difference between Git and GitHub?",
      answer: "Git is the tool—the actual version control software that runs locally on your computer. It manages the history of your files. GitHub is a hosting service for Git repositories. It provides a web-based interface, collaboration tools (like Pull Requests), and a central place to store your code in the cloud. You can use Git without GitHub, but you cannot use GitHub without Git.",
      difficulty: "beginner",
      tags: ["git", "github", "concepts"],
      companyFrequency: 90
    },
    {
      question: "What is the staging area and why is it useful?",
      answer: "The staging area (or index) is an intermediate area between the working directory and the repository. It allows a developer to selectively group changes into a single commit. This is useful for keeping commits 'atomic'. For example, if I fixed three different bugs in one session, I can stage and commit them one by one so that the project history is clean and easier to revert if one specific fix causes a regression.",
      difficulty: "intermediate",
      tags: ["staging", "workflow", "commits"],
      companyFrequency: 80
    },
    {
      question: "Explain how Git handles snapshots versus deltas.",
      answer: "Traditional VCS like SVN store the difference (delta) between versions of a file. Git stores a snapshot of the entire project state at every commit. While this sounds like it would take more space, Git optimizes this by using a content-addressable storage system. If a file doesn't change between commits, Git simply stores a pointer to the previous version of that file. This makes operations like switching branches or checking out old versions nearly instantaneous because Git doesn't have to 'reconstruct' the file by applying a series of deltas.",
      difficulty: "advanced",
      tags: ["internals", "snapshots", "performance"],
      companyFrequency: 60
    },
    {
      question: "What happens if you delete the .git folder in your project?",
      answer: "The .git folder contains the entire history, all branches, and all configuration for that repository. If you delete it, the directory becomes a plain folder again. You lose all versioning capability, you can no longer go back to previous commits, and you lose the link to any remote repositories. The actual files in your working directory remain, but the 'memory' of how they evolved is gone.",
      difficulty: "intermediate",
      tags: ["internals", ".git", "recovery"],
      companyFrequency으로: 50
    },
    {
      question: "Why is it considered bad practice to commit 'node_modules' or '.env' files?",
      answer: "1. node_modules: These are dependencies that can be easily re-installed via 'npm install' using the package.json file. Committing thousands of external library files bloats the repository, makes clones slow and clutters the diffs. 2. .env: These files contain sensitive secrets (API keys, DB passwords). Committing them to a repository (especially a public one) exposes your infrastructure to security breaches. These should be kept local and ignored using .gitignore.",
      difficulty: "beginner",
      tags: ["best-practices", ".gitignore", "security"],
      companyFrequency: 95
    }
  ],

  project: {
    title: "The First Repository Milestone",
    requirements: [
      "Initialize a new local git repository",
      "Create a project structure with a README.md and a /src folder",
      "Perform at least 3 atomic commits with professional messages",
      "Use a .gitignore file to exclude a dummy 'secrets.txt' file",
      "Demonstrate a file restoration using a previous commit hash"
    ],
    architecture: "Local Disk $\\rightarrow$ .git Object Store $\\rightarrow$ HEAD pointer",
    folderStructure: "my-first-git-project/\\n├── .git/\\n├── .gitignore\\n├── README.md\\n└── src/\\n    └── index.js",
    implementationGuide: "1. Run 'git init'. 2. Create .gitignore and add 'secrets.txt'. 3. Create a file and run 'git add' followed by 'git commit'. 4. Repeat for other files. 5. Intentionally modify a file and use 'git checkout <hash> -- <file>' to restore it.",
    challenges: [
      "Try to commit a file that is listed in .gitignore and see what happens.",
      "Use 'git log' to find the hash of your first commit and restore your project to that state."
    ],
    interviewDiscussion: "Discuss why the staging area is a better design than 'committing everything' in one go. Explain how the .git folder size grows as you add more unique files."
  },

  cheatsheet: {
    setup: [
      { command: "git config --global user.name \"Name\"", description: "Set global username" },
      { command: "git config --global user.email \"email@example.com\"", description: "Set global email" },
      { command: "git init", description: "Initialize new repo" },
      { command: "git clone <url>", description: "Clone remote repo" }
    ],
    basic_workflow: [
      { command: "git status", description: "Check current state" },
      { command: "git add <file>", description: "Stage specific file" },
      { command: "git add .", description: "Stage all changes" },
      { command: "git commit -m \"msg\"", description: "Commit staged changes" },
      { command: "git log --oneline", description: "View commit history" }
    ],
    recovery: [
      { command: "git checkout -- <file>", description: "Discard changes in working directory" },
      { command: "git reset HEAD <file>", description: "Unstage a file" },
      { command: "git checkout <hash> -- <file>", description: "Restore file from commit" }
    ]
  }
}
