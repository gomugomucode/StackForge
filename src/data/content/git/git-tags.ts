export const topic = {
  title: "Git Tags & Release Management",
  slug: "git-tags",
  difficulty: "beginner",
  readTime: "30 min",
  xpReward: 300,

  overview: "While branches are used for active development and are expected to change, Tags are used to mark specific points in history as being important. In a professional software lifecycle, tags are primarily used to mark 'Release Points' (e.g., v1.0, v2.1.4). A tag is essentially a permanent pointer to a commit that does not move as you add new commits. This allows developers and DevOps engineers to instantly jump back to the exact state of the code that was deployed to production on a specific date.",
  whyItMatters: "Imagine you have a production bug in version 1.2.0, but your 'main' branch has already moved forward to version 1.3.0 with dozens of new, potentially unstable features. You cannot simply use the main branch to fix the bug because you'd be deploying half-finished features to production. By using tags, you can checkout the exact snapshot of v1.2.0, create a hotfix branch from that tag, fix the bug, and release v1.2.1. Without tagging, managing versioned releases in a complex project is nearly impossible.",

  content: [
    {
      section: "Lightweight vs. Annotated Tags",
      text: "Git provides two types of tags, and choosing the right one depends on whether the tag is for personal use or for a formal release.\n\n1. **Lightweight Tags:** A lightweight tag is just a pointer to a commit—much like a branch that never moves. It contains no extra information other than the commit hash. These are ideal for temporary markers or personal bookmarks ('here is where I stopped working on the refactor').\n\n2. **Annotated Tags:** These are stored as full objects in the Git database. They contain a tag name, the tagger's name, email, date, and a tagging message. Most importantly, annotated tags can be GPG-signed for security, proving that the release was officially authorized by a lead engineer. These are the industry standard for versioning releases (Semantic Versioning)."
    },
    {
      section: "Semantic Versioning (SemVer)",
      text: "Tags are usually named following the Semantic Versioning (SemVer) standard: `MAJOR.MINOR.PATCH` (e.g., `v2.3.1`).\n\n- **MAJOR version:** Incremented when you make incompatible API changes (breaking changes).\n- **MINOR version:** Incremented when you add functionality in a backwards-compatible manner.\n- **PATCH version:** Incremented when you make backwards-compatible bug fixes.\n\nFollowing SemVer allows users of your software to know at a glance if updating to a new version will break their existing integration."
    },
    {
      section: "The Release Workflow",
      text: "A typical release process looks like this:\n\n1. **Stabilize:** The 'release' branch is branched off 'develop'. Only bug fixes are allowed here.\n\n2. **Tag:** Once the release is stable, the commit is merged into 'main' and an annotated tag is created: `git tag -a v1.0.0 -m \"Initial Production Release\"`.\n\n3. **Push:** The tag is pushed to the remote server: `git push origin v1.0.0`.\n\n4. **Archive:** The release branch is deleted, and the tag remains as the permanent record of that version."
    }
  ],

  syntax: [
    {
      command: "git tag <name>",
      description: "Creates a lightweight tag at the current HEAD.",
      example: "git tag v1.0-beta"
    },
    {
      command: "git tag -a <name> -m \"message\"",
      description: "Creates an annotated tag with a message.",
      example: "git tag -a v1.0.0 -m \"First stable release\""
    },
    {
      command: "git tag <name> <commit-hash>",
      description: "Tags a past commit that is not the current HEAD.",
      example: "git tag v1.0.0 a1b2c3d"
    },
    {
      command: "git tag",
      description: "Lists all tags in the repository.",
      example: "git tag"
    },
    {
      command: "git show <tag-name>",
      description: "Shows the tag data and the commit it points to.",
      example: "git show v1.0.0"
    },
    {
      command: "git checkout <tag-name>",
      description: "Moves HEAD to the tagged commit (puts you in 'detached HEAD' state).",
      example: "git checkout v1.0.0"
    },
    {
      command: "git push origin <tag-name>",
      description: "Pushes a specific tag to the remote server.",
      example: "git push origin v1.0.0"
    },
    {
      command: "git push origin --tags",
      description: "Pushes all local tags to the remote server.",
      example: "git push origin --tags"
    },
    {
      command: "git tag -d <tag-name>",
      description: "Deletes a local tag.",
      example: "git tag -d v1.0.0"
    }
  ],

  examples: [
    {
      title: "Creating a Production Release",
      code: `// 1. Ensure we are on the latest main branch
git checkout main
git pull origin main

// 2. Create an annotated tag for the release
git tag -a v1.1.0 -m \"Release v1.1.0: Added OAuth2 support and fixed memory leak in logger\"

// 3. Verify the tag exists
git tag

// 4. Push the tag to GitHub
git push origin v1.1.0

// 5. How to go back to this version if something breaks
git checkout v1.1.0`,
      output: "A permanent marker v1.1.0 is now in the project history.",
      explanation: "Annotated tags are preferred for releases because they store the author's identity and the reason for the tag, making the release history auditable."
    }
  ],

  mistakes: [
    {
      error: "Assuming 'git push' automatically pushes tags",
      solution: "Tags are not pushed by default. You must explicitly use 'git push origin <tagname>' or 'git push origin --tags'.",
      impact: "The release is tagged locally, but teammates and CI/CD pipelines cannot see the tag on the server."
    },
    {
      error: "Using tags for active development",
      solution: "Use branches for work-in-progress. Tags are for immutable snapshots. If you need to change the code, create a branch from the tag.",
      impact: "Confuses the team about what is a 'stable release' vs what is 'current work'."
    },
    {
      error: "Deleting a remote tag using 'git tag -d'",
      solution: "Local deletion doesn't affect the server. Use 'git push origin --delete <tagname>' to remove a tag from the remote.",
      impact: "The tag remains visible on GitHub/GitLab even after you've deleted it locally."
    }
  ],

  bestPractices: [
    "Strictly follow SemVer: Don't just increment numbers randomly; use the Major.Minor.Patch logic.",
    "Always use annotated tags for public releases.",
    "Tag the commit *before* you merge it into main, or immediately after the merge commit.",
    "Use tags to trigger CI/CD pipelines: Configure your server to automatically deploy to production when a tag matching 'v*' is pushed."
  ],

  challenges: [
    {
      title: "The Release Manager Challenge",
      description: "1. Create a project and make 5 commits. 2. Tag the 3rd commit as 'v1.0-alpha'. 3. Create a new branch from 'v1.0-alpha' called 'hotfix-alpha'. 4. Add a fix and commit it. 5. Tag this new commit as 'v1.0-beta'. 6. List all tags and their associated commit hashes.",
      difficulty: "beginner",
      hints: ["Use 'git tag <name> <hash>' for the 3rd commit.", "Use 'git checkout v1.0-alpha' to start the hotfix branch."],
      solution: "git commit -m '1' && git commit -m '2' && git commit -m '3' && git tag v1.0-alpha HEAD && git commit -m '4' && git commit -m '5'\\ngit checkout v1.0-alpha && git checkout -b hotfix-alpha && echo 'fix' > fix.txt && git add . && git commit -m 'fix' && git tag v1.0-beta",
      expectedOutput: "Two tags (v1.0-alpha, v1.0-beta) pointing to different commits in the history."
    }
  ],

  quiz: [
    {
      question: "What is the primary difference between a branch and a tag?",
      options: ["Branches are for files; tags are for folders", "Branches move as you commit; tags are permanent pointers", "Tags are only used on GitHub", "Branches are immutable; tags are mutable"],
      answer: "Branches move as you commit; tags are permanent pointers",
      explanation: "A branch is a moving pointer to the latest commit in a line of development. A tag is a static marker for a specific, unchanging commit.",
      difficulty: "beginner"
    },
    {
      question: "Which type of tag should you use for a formal production release?",
      options: ["Lightweight tag", "Annotated tag", "Feature tag", "Branch tag"],
      answer: "Annotated tag",
      explanation: "Annotated tags store a message, the tagger's identity, and date, making them suitable for official releases.",
      difficulty: "beginner"
    },
    {
      question: "In Semantic Versioning (v2.3.1), what does the '3' represent?",
      options: ["Major version", "Minor version", "Patch version", "Build number"],
      answer: "Minor version",
      explanation: "The format is MAJOR.MINOR.PATCH. The middle number is the minor version, incremented for new, backwards-compatible features.",
      difficulty: "beginner"
    },
    {
      question: "How do you push a specific tag named 'v1.0' to a remote server?",
      options: ["git push origin", "git push origin --tags", "git push origin v1.0", "git tag push v1.0"],
      answer: "git push origin v1.0",
      explanation: "To push a specific tag, use 'git push <remote> <tagname>'. To push all tags, use 'git push origin --tags'.",
      difficulty: "intermediate"
    },
    {
      question: "What happens when you 'git checkout v1.0' (a tag)?",
      options: ["You switch to the v1.0 branch", "You enter 'detached HEAD' state", "The tag is deleted", "The repository is reset to v1.0"],
      answer: "You enter 'detached HEAD' state",
      explanation: "Since a tag is a commit, not a branch, checking it out puts you in a state where you are not on any branch. Any commits made here will not belong to a branch unless you create one.",
      difficulty: "intermediate"
    },
    {
      question: "Which command allows you to see the message and metadata associated with an annotated tag?",
      options: ["git log", "git show", "git tag -v", "git status"],
      answer: "git show",
      explanation: "git show <tagname> displays the tagger's info, the date, the message, and the commit details.",
      difficulty: "beginner"
    },
    {
      question: "True or False: You can change which commit a tag points to after it has been created.",
      options: ["True", "False"],
      answer: "True",
      explanation: "While tags are intended to be permanent, you can delete and recreate them, or use the -f (force) flag to move them.",
      difficulty: "intermediate"
    },
    {
      question: "How do you delete a tag from a remote server named 'origin'?",
      options: ["git tag -d <name>", "git push origin --delete <name>", "git remote remove <name>", "git checkout -d <name>"],
      answer: "git push origin --delete <name>",
      explanation: "Since tags are references on the server, you must push a deletion request to the remote.",
      difficulty: "intermediate"
    },
    {
      question: "Which tag is best for a temporary personal marker like 'checkpoint-before-refactor'?",
      options: ["Annotated tag", "Lightweight tag", "Release tag", "Signed tag"],
      answer: "Lightweight tag",
      explanation: "Lightweight tags are just pointers and don't require a message, making them perfect for quick, personal markers.",
      difficulty: "beginner"
    },
    {
      question: "What is the benefit of GPG-signing an annotated tag?",
      options: ["It makes the tag smaller", "It allows the tag to be pushed faster", "It proves the authenticity and integrity of the release", "It automatically deploys the code"],
      answer: "It proves the authenticity and integrity of the release",
      explanation: "Signing tags allows users to verify that the release was actually created by the trusted maintainer and hasn't been tampered with.",
      difficulty: "advanced"
    },
    {
      question: "In SemVer, if you introduce a change that breaks existing API contracts, which number must be incremented?",
      options: ["Patch", "Minor", "Major", "Build"],
      answer: "Major",
      explanation: "Breaking changes require a MAJOR version bump to warn users that they may need to change their own code to upgrade.",
      difficulty: "beginner"
    },
    {
      question: "Which command lists all tags and sorts them by version number (using version sort)?",
      options: ["git tag", "git tag -l", "git tag --sort=v:refname", "git log --tags"],
      answer: "git tag --sort=v:refname",
      explanation: "The --sort=v:refname flag tells Git to use natural version sorting instead of simple alphabetical sorting.",
      difficulty: "intermediate"
    },
    {
      question: "True or False: a tag is a branch that cannot be committed to.",
      options: ["True", "False"],
      answer: "True",
      explanation: "A simplified way to think of it: A tag is a fixed pointer to a specific commit. To add changes, you must create a branch from the tag.",
      difficulty: "intermediate"
    },
    {
      question: "How do you create a tag for a commit that is not the current HEAD?",
      options: ["git checkout <hash> && git tag <name>", "git tag <name> <hash>", "git merge <hash> && git tag <name>", "It is not possible"],
      answer: "git tag <name> <hash>",
      explanation: "Git allows you to attach a tag to any valid commit hash in the history without switching to it.",
      difficulty: "beginner"
    },
    {
      question: "What is the output of `git tag` if there are no tags in the repository?",
      options: ["An error message", "A list of all commits", "Nothing (empty output)", "A list of all branches"],
      answer: "Nothing (empty output)",
      explanation: "If no tags exist, the command simply returns an empty string.",
      difficulty: "beginner"
    }
  ],

  interview: [
    {
      question: "Why is it dangerous to move a tag that has already been pushed to a remote server?",
      answer: "Tags are expected to be immutable. If you move a tag (e.g., v1.0) to a different commit and force-push it, any developer who has already pulled v1.0 will have a local tag that points to a different commit than the server. This leads to 'tag drift', where different team members are testing against different versions of the 'same' release. It can cause erratic bug reports and failed deployments.",
      difficulty: "intermediate",
      tags: ["tags", "remote", "immutability"],
      companyFrequency: 60
    },
    {
      question: "Explain the difference between a 'release' on GitHub and a 'tag' in Git.",
      answer: "A Git tag is a purely technical pointer in the version control system. A GitHub Release is a high-level wrapper around a tag. A GitHub Release includes the Git tag, but also adds a UI for release notes, a place to upload binary assets (like .exe or .dmg files), and integration with GitHub's release lifecycle. You create a tag first, and then you 'turn that tag into a release' via the GitHub interface.",
      difficulty: "beginner",
      tags: ["github", "tags", "releases"],
      companyFrequency: 70
    },
    {
      question: "Walk me through how you would handle a critical bug found in a tagged release (v1.0) while you are currently developing v2.0.",
      answer: "1. I would checkout the tag v1.0: `git checkout v1.0`. 2. Since this puts me in detached HEAD, I would create a hotfix branch: `git checkout -b hotfix/v1.0.1`. 3. I would apply the fix, test it, and commit. 4. I would merge this hotfix into the main branch and also into the current develop branch to ensure the bug doesn't reappear in v2.0. 5. I would tag the new commit as `v1.0.1` and push to the remote.",
      difficulty: "intermediate",
      tags: ["hotfix", "tags", "workflow"],
      companyFrequency: 80
    },
    {
      question: "What is the significance of the message in an annotated tag?",
      answer: "The message acts as a formal release note. It allows the engineer to summarize the key changes, security patches, and dependencies of that particular version. Because this is stored in the Git database itself, the release documentation stays perfectly synced with the code, even if the project is moved to a different hosting provider like GitLab or Bitbucket.",
      difficulty: "intermediate",
      tags: ["documentation", "annotated-tags", "releases"],
      companyFrequency: 40
    },
    {
      question: "How would you find all commits that occurred between two tags (e.g., v1.0 and v1.1)?",
      answer: "I would use the range operator in the log command: `git log v1.0..v1.1`. This shows all commits that are reachable from the v1.1 tag but are not reachable from the v1.0 tag. This is the standard way to generate a changelog for a specific release period.",
      difficulty: "advanced",
      tags: ["log", "tags", "range"],
      companyFrequency: 30
    }
  ],

  project: {
    title: "The Versioning Masterclass",
    requirements: [
      "Initialize a project and create a series of development commits",
      "Create a lightweight tag for a feature preview",
      "Create an annotated tag for a stable v1.0 release",
      "Simulate a bug in v1.0 by creating a hotfix branch from that tag",
      "Apply the fix and create a v1.0.1 tag",
      "Properly push both tags to a remote server"
    ],
    architecture: "Timeline: Commits $\\rightarrow$ v1.0 (Tag) $\\rightarrow$ v2.0-dev (Branch) $\\rightarrow$ v1.0.1 (Hotfix Tag)",
    folderStructure: "git-tagging-lab/\\n├── .git/\\n└── release-notes.txt",
    implementationGuide: "1. git init && touch a.txt && git add . && git commit -m 'v1.0 core'\\n2. git tag -a v1.0 -m 'Stable release'\\n3. git checkout -b dev-v2 && touch b.txt && git add . && git commit -m 'v2 work'\\n4. git checkout v1.0 && git checkout -b hotfix v1.0.1\\n5. echo 'fix' >> a.txt && git add . && git commit -m 'fixing bug'\\n6. git tag -a v1.0.1 -m 'Hotfix release'",
    challenges: [
      "Try to delete a tag locally and then try to checkout that tag again.", "Use 'git log --decorate' to see the visual mapping of branches and tags on the same timeline."
    ],
    interviewDiscussion: "Discuss the trade-off between using a branch for releases vs using tags. Why are tags considered more stable for deployment?"
  },

  cheatsheet: {
    creation: [
      { command: "git tag <name>", description: "Lightweight tag" },
      { command: "git tag -a <name> -m \"msg\"", description: "Annotated tag" },
      { command: "git tag <name> <hash>", description: "Tag a past commit" }
    ],
    management: [
      { command: "git tag", description: "List all tags" },
      { command: "git show <name>", description: "View tag metadata" },
      { command: "git tag -d <name>", description: "Delete a local tag" }
    ],
    syncing: [
      { command: "git push origin <name>", description: "Push a single tag" },
      { command: "git push origin --tags", description: "Push all local tags" },
      { command: "git push origin --delete <name>", description: "Delete a remote tag" }
    ],
    navigation: [
      { command: "git checkout <name>", description: "Switch to a tagged snapshot" },
      { command: "git log v1.0..v2.0", description: "Commits between two tags" }
    ]
  }
}
