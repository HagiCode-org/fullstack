> **Draft:** this lesson is an outline and will be expanded.

Your project starts with one main line of work, usually called `main`. It should always hold a version that works. A **branch** is a separate copy of that line where you can try something new, so a mistake never touches `main`. This is the safest way to work with an AI helper: let it change a branch, check the result, and only then bring the change into `main`. In this lesson you will create a branch, work on it and switch between branches.

## What you will do

1. In GitHub Desktop, find the name of the current branch. It should be `main`.
2. Create a new branch from `main`. Give it a name that says what you plan to do, such as `add-about-page`.
3. Ask your AI helper to make a change that you can see, for example "Add a section called About to the README."
4. Look at the changed files and commit the change on your branch, with a message of its own.
5. Switch back to `main` in the app and open the README. The new section is not there. Switch to your branch again and it returns. This shows that the work is kept apart.
6. Push the branch, so it also exists on GitHub.

**Rule for the whole course:** never change `main` directly. Start a branch for each piece of work, even a small one.

**Safety note:** if you switch branches while you have changes that are not committed, the app asks what to do with them. If you are unsure, commit them first.

## Check yourself

- You have a branch with a clear name and at least one commit on it.
- You saw the README differ between `main` and your branch.
- The branch is visible on GitHub.
