---
title: Git Bisect Process to Debug Issue
---

# Git Bisect Process to Debug Issue

## Steps:

### 1. **Start Git Bisect**
   The `git bisect start` command initiates the bisecting process, which allows you to perform a binary search to find the commit that introduced a bug. This is useful when you know a bug exists but don't know which commit caused it.

   ```bash
   git bisect start
   ```
### 2. **Checkout Version 2.0.54 (Bad Commit)**
    In this step, we checkout the version where the bug was introduced (the "bad" commit). We then mark this version as bad using git bisect bad. This tells Git to start the search for the bad commit from this point.

```bash

git checkout 2.0.54
git bisect bad
```
### 3. **Get the Top-Level Directory**
    `git rev-parse --show-toplevel` is used to print the top-level directory of your Git repository. This helps you understand the root directory where your Git repository is initialized. It's useful if you're unsure of your current working directory within the project.

```bash

git rev-parse --show-toplevel
```
### 4. **Tag Information**
    The git describe --tags command retrieves the most recent tag that is reachable from a given commit. This helps you understand the closest version or release associated with a commit. It's useful when you want to track which tag the current commit belongs to.

```bash

git describe --tags e86d6b276bc4d588575d6ba02716b824686c78cb
```
### 5. **Checkout Version 2.0.25 (Good Commit)**
    After marking the bad commit, we then checkout the last known good version (the "good" commit). This helps to narrow down where the issue occurred. We use git bisect good to indicate that this commit is working correctly.

```bash

git checkout 2.0.25
git bisect good
```
### 6. **Review Commit Log**
    To review changes in the codebase and potentially identify which commit introduced the bug, use git log --oneline -- .. This will display the commit history for the current directory. It's helpful for tracing through changes between the "good" and "bad" commits.

```bash

git log --oneline -- .
```
