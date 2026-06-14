"use strict";exports.id=1122,exports.ids=[1122],exports.modules={41122:(e,t,i)=>{i.r(t),i.d(t,{gitNotes:()=>r});let r=[{id:"git-rebase",title:"Chapter 1: Git Rebase vs Git Merge",content:"Merging creates a new commit representing the integration of branches. Rebasing moves the commit history onto a new base tip, resulting in a linear, cleaner timeline without merge noise.",codeSnippet:{code:`# 1. To merge:
git checkout main
git merge feature-login

# 2. To rebase (rewrites history):
git checkout feature-login
git rebase main`,language:"bash"},summary:"Never rebase public shared branches like main, as it alters shared repository history timelines and breaks peers workspaces."}]}};