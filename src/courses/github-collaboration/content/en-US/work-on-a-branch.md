---
minutes: 25
outcome: "You can create a branch, make and save a change on it, switch between it and main, and publish it to GitHub so the change is kept apart from the main version."
terms: [branch, commit, push]
---

Your project starts with one main line of work, which GitHub Desktop and GitHub call `main`. It should always hold a version that works. A [branch](../../../glossary/#github-collaboration-branch) is a separate line of work that starts from `main`, so a mistake on it never touches the main version. This is the safest way to work with an AI helper: let it change a branch, check the result, and only then bring the change into `main`. In this lesson you will create a branch, save a [commit](../../../glossary/#github-collaboration-commit) on it, switch between branches and [push](../../../glossary/#github-collaboration-push) it to GitHub.

## Why use a branch

GitHub describes a branch as a space where you can work without affecting the default branch, and it notes that a branch gives collaborators a chance to review your work. The official GitHub flow recommends one branch for each set of unrelated changes, with a short, descriptive name such as `add-about-page`. You can read the full description in [GitHub flow](https://docs.github.com/en/get-started/using-github/github-flow).

In GitHub Desktop, branches isolate your work from the other branches in the repository. You can read more in [Managing branches in GitHub Desktop](https://docs.github.com/en/desktop/making-changes-in-a-branch/managing-branches-in-github-desktop).

**Rule for the whole course:** never change `main` directly. Start a branch for each piece of work, even a small one.

## Create a branch

1. Open the `practice-notes` repository in GitHub Desktop. It is the one you cloned in the desktop course. If you deleted it, clone it again from GitHub.
2. At the top of the app, click **Current Branch**. Check that `main` is selected.
3. Click **New Branch**.
4. In the **Create a Branch** window, type a name under **Name**, such as `add-about-page`.
5. Under **Create branch based on**, keep `main` selected, then click **Create Branch**.

These steps are the same on Windows and macOS. The first new branch is always based on the default branch.

## Make a change and commit it on the branch

1. With your branch selected, ask your AI helper to make a change you can see, for example: "Add a section called About to the README."
2. Open the **Changes** tab and read the changes. Accept them only if they match what you asked for.
3. Write a short message in the **Summary** field, such as "Add an About section to the README".
4. Click the button that now reads **Commit to add-about-page**.

The commit lives on your branch and does not touch `main`.

## Compare `main` with your branch

This step shows that the work is kept apart.

1. Click **Current Branch**, then click `main`. Your commit is now hidden, so the README no longer has the About section.
2. Click **Current Branch** again, then click `add-about-page`. The About section returns.

If you had uncommitted changes when you switched, GitHub Desktop asks what to do with them. You can leave them on the current branch or bring them to the new one. When you are unsure, commit them first, so nothing is left in question.

## Publish the branch to GitHub

A branch exists only on your computer until you publish it.

1. Make sure `add-about-page` is the current branch.
2. Click **Publish branch**. The app then sends the branch to GitHub.
3. For later commits on this branch, click **Push origin** in the repository bar.

After publishing, open the repository on GitHub and use the branch menu to select your branch. The branch appears in the list, and its README shows the About section. The official details are in [Creating a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request), which uses the same branch menu.

**Safety note:** a branch that is not published exists only on your computer. If you lose the computer, you lose that branch. Publish it once you have made a commit you want to keep.

## Check yourself

- You have a branch with a clear name and at least one commit on it.
- You saw the README differ between `main` and your branch.
- You can publish the branch and push later commits.
- The branch is visible on GitHub.

## What comes next

Next, you will ask GitHub to review your branch against `main` in a [pull request](../../../glossary/#github-collaboration-pull-request). Continue with **Open a pull request and read the changes**.
