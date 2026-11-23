---
minutes: 25
outcome: "You can open a pull request from your branch, review every changed file on GitHub, merge it into main and bring main up to date on your computer."
terms: [pull-request, merge, base-branch]
---

A [pull request](../../../glossary/#github-collaboration-pull-request) asks to bring the work from your [branch](../../../glossary/#github-collaboration-branch) into `main`. Before anything is merged, the page shows exactly what changed, which gives you one calm place to review the work. This is the most important habit in this course: you do not need to understand every line, but you must look at what an AI helper changed before you accept it. In this lesson you will open a pull request for the branch from the last lesson, read the changes and [merge](../../../glossary/#github-collaboration-merge) it when you are satisfied.

## Publish and open the pull request

A pull request can only be opened when the branch exists on GitHub. Check that your branch is committed, pushed and published first. The previous lesson covered these steps.

1. In GitHub Desktop, click **Current Branch** and make sure `add-about-page` is selected.
2. Click **Preview Pull Request**. The app shows the difference between your branch and the branch you want to merge into, which is the [base branch](../../../glossary/#github-collaboration-base-branch).
3. Check that the base branch is `main`. GitHub Desktop also reports whether the branch can be merged automatically.
4. Click **Create Pull Request**. Your browser opens the page for the new pull request on GitHub.

The official guide to creating a pull request from the desktop app is [Creating an issue or pull request from GitHub Desktop](https://docs.github.com/en/desktop/working-with-your-remote-repository-on-github-or-github-enterprise/creating-an-issue-or-pull-request-from-github-desktop). You can also open a pull request on the GitHub website, which has the same steps: choose the base branch and the branch with your commits, then click **Create pull request**. See [Creating a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request).

## Write a clear description

1. Type a title, such as "Add an About section to the README".
2. In the description, write what you changed and why. Ask your AI helper to help you word it, then check that every sentence is true.
3. Click **Create pull request**.

If the work is not ready for review, use the drop-down menu next to the button and create a draft instead. The official guide says a draft cannot be merged, and code owners are not asked to review it until you mark it ready for review. See [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests).

## Review the changes one file at a time

Open the **Files changed** tab. A pull request page has several tabs, including Conversation, Commits, Checks and Files changed. Files changed shows the difference that a reviewer reads.

1. Look at one file at a time.
2. Read each change and ask yourself whether you expected it. If something looks surprising, ask your AI helper: "Why was this line changed, and is it needed?"
3. Click **Viewed** on each file when you have finished it, so it collapses and the progress bar in the header moves on.
4. Look for anything that should never be shared, such as a password, a key or personal information. If you find one, do not merge.

When you have read everything, submit a review. You can approve the pull request or request changes, with a summary comment. The steps are in [Reviewing proposed changes in a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/reviewing-proposed-changes-in-a-pull-request). GitHub Desktop can show a pull request's commits and checks, but you cannot write comments there, so do the review on GitHub.

## Merge when the review is done

1. Scroll to the bottom of the pull request and click **Merge pull request**. If that option is not shown, use the merge menu and choose one of the merge methods your repository allows.
2. If GitHub asks for a [commit](../../../glossary/#github-collaboration-commit) message, accept the default or write a clear one.
3. Confirm the merge.

The official guide explains the merge methods and the requirements that repository rules can add, such as reviews or passing checks. See [Merging a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/merging-a-pull-request).

## Bring main up to date on your computer

The merge happened on GitHub, so your computer's copy of `main` is still old until you fetch and pull it.

1. In GitHub Desktop, click **Current Branch** and select `main`.
2. Click **Fetch origin** to check GitHub for new commits.
3. Click **Pull origin** to bring them down.

Now `main` on your computer and on GitHub both contain your work. The steps are described in [Syncing your branch in GitHub Desktop](https://docs.github.com/en/desktop/working-with-your-remote-repository-on-github-or-github-enterprise/syncing-your-branch-in-github-desktop).

**Safety note:** the more files an AI changes in one go, the harder the review. Prefer small pull requests that change one thing. If a pull request is too big to read, split the work into several branches.

## Check yourself

- You opened a pull request and wrote a clear title and description.
- You read every file in the Files changed tab before you merged.
- You can explain why a draft pull request cannot be merged.
- `main` on GitHub and on your computer both contain your work.

## What comes next

Next, you will learn how people improve projects they do not own, using issues and forks. Continue with **Issues, forks and open source**.
